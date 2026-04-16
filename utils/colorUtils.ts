// ─── Hex helpers ────────────────────────────────────────────────
export function isValidHex(hex: string): boolean {
  return /^#[0-9A-Fa-f]{6}$/.test(hex);
}

export function normalizeHex(raw: string): string {
  const cleaned = raw.startsWith("#") ? raw : `#${raw}`;
  return cleaned.toUpperCase();
}

export function generateRandomHex(): string {
  const n = Math.floor(Math.random() * 0xffffff);
  return `#${n.toString(16).padStart(6, "0").toUpperCase()}`;
}

// ─── Color conversion ────────────────────────────────────────────
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const clean = hex.replace("#", "");
  if (!/^[0-9A-Fa-f]{6}$/.test(clean)) return null;
  return {
    r: parseInt(clean.slice(0, 2), 16),
    g: parseInt(clean.slice(2, 4), 16),
    b: parseInt(clean.slice(4, 6), 16),
  };
}

// ─── WCAG contrast ──────────────────────────────────────────────
function linearize(channel: number): number {
  const c = channel / 255;
  return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

export function getLuminance(hex: string): number {
  const rgb = hexToRgb(hex);
  if (!rgb) return 0;
  return (
    0.2126 * linearize(rgb.r) +
    0.7152 * linearize(rgb.g) +
    0.0722 * linearize(rgb.b)
  );
}

export function getContrastRatio(hex1: string, hex2: string): number {
  const l1 = getLuminance(hex1);
  const l2 = getLuminance(hex2);
  const [lighter, darker] = l1 > l2 ? [l1, l2] : [l2, l1];
  return (lighter + 0.05) / (darker + 0.05);
}

export type WcagLevel = "AAA" | "AA" | "A" | "Fail";

export function getWcagLevel(ratio: number): WcagLevel {
  if (ratio >= 7) return "AAA";
  if (ratio >= 4.5) return "AA";
  if (ratio >= 3) return "A";
  return "Fail";
}

/**
 * Returns black or white — whichever gives higher contrast on `bgHex`.
 */
export function getReadableTextColor(bgHex: string): "#000000" | "#ffffff" {
  return getContrastRatio(bgHex, "#ffffff") >= getContrastRatio(bgHex, "#000000")
    ? "#ffffff"
    : "#000000";
}

/**
 * Returns the best WCAG level achievable on this background (black or white text).
 */
export function getBestContrast(bgHex: string): { textColor: string; ratio: number; level: WcagLevel } {
  const white = getContrastRatio(bgHex, "#ffffff");
  const black = getContrastRatio(bgHex, "#000000");
  const better = white >= black;
  const ratio = better ? white : black;
  return {
    textColor: better ? "#ffffff" : "#000000",
    ratio: Math.round(ratio * 10) / 10,
    level: getWcagLevel(ratio),
  };
}
