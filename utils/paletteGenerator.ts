// ─── Types ───────────────────────────────────────────────────────
export interface GeneratedColor {
  hex: { value: string; clean: string };
  rgb: { value: string; r: number; g: number; b: number };
  hsl: { value: string; h: number; s: number; l: number };
}

export interface PaletteResult {
  colors: GeneratedColor[];
}

// ─── Low-level color math ────────────────────────────────────────
function cl(v: number, min = 5, max = 95): number {
  return Math.max(min, Math.min(max, Math.round(v)));
}

function wh(h: number): number {
  return ((h % 360) + 360) % 360;
}

export function hexToHsl(hex: string): { h: number; s: number; l: number } {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;
  const l = (max + min) / 2;

  let h = 0;
  let s = 0;

  if (delta !== 0) {
    s = delta / (1 - Math.abs(2 * l - 1));
    switch (max) {
      case r: h = ((g - b) / delta) % 6; break;
      case g: h = (b - r) / delta + 2; break;
      case b: h = (r - g) / delta + 4; break;
    }
    h = Math.round(h * 60);
    if (h < 0) h += 360;
  }

  return { h: wh(h), s: cl(Math.round(s * 100), 0, 100), l: cl(Math.round(l * 100), 0, 100) };
}

function hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
  h = wh(h);
  s = cl(s, 0, 100) / 100;
  l = cl(l, 0, 100) / 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = l - c / 2;

  let r = 0, g = 0, b = 0;
  if      (h < 60)  { r = c; g = x; }
  else if (h < 120) { r = x; g = c; }
  else if (h < 180) { g = c; b = x; }
  else if (h < 240) { g = x; b = c; }
  else if (h < 300) { r = x; b = c; }
  else              { r = c; b = x; }

  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255),
  };
}

function makeColor(h: number, s: number, l: number): GeneratedColor {
  h = wh(h);
  s = cl(s, 0, 100);
  l = cl(l, 0, 100);

  const rgb = hslToRgb(h, s, l);
  const hex = `#${rgb.r.toString(16).padStart(2, "0")}${rgb.g.toString(16).padStart(2, "0")}${rgb.b.toString(16).padStart(2, "0")}`.toUpperCase();

  return {
    hex: { value: hex, clean: hex.slice(1) },
    rgb: { value: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`, ...rgb },
    hsl: { value: `hsl(${h}, ${s}%, ${l}%)`, h, s, l },
  };
}

// ─── Palette Generators ─────────────────────────────────────────
// Each returns exactly 6 [h, s, l] tuples
type HSLTuple = [number, number, number];

const generators: Record<string, (h: number, s: number, l: number) => HSLTuple[]> = {

  // ── Classical Harmony ────────────────────────────────────────

  complementary: (h, s, l) => {
    const L = cl(l, 28, 68); const S = cl(s, 40, 90);
    return [
      [h,       S,        L     ],
      [h,       S,        cl(L - 22)],
      [h,       cl(S-15), cl(L + 22)],
      [h + 180, S,        L     ],
      [h + 180, S,        cl(L - 22)],
      [h + 180, cl(S-15), cl(L + 22)],
    ];
  },

  splitComplementary: (h, s, l) => {
    const L = cl(l, 28, 68); const S = cl(s, 40, 90);
    return [
      [h,       S,        L     ],
      [h,       cl(S-12), cl(L + 20)],
      [h + 150, S,        L     ],
      [h + 150, cl(S-12), cl(L - 18)],
      [h + 210, S,        L     ],
      [h + 210, cl(S-12), cl(L - 18)],
    ];
  },

  doubleSplitComplementary: (h, s, l) => {
    const L = cl(l, 28, 68); const S = cl(s, 40, 90);
    return [
      [h - 30,  S, L],
      [h,       S, L],
      [h + 30,  S, L],
      [h + 150, S, L],
      [h + 180, S, L],
      [h + 210, S, L],
    ];
  },

  triadic: (h, s, l) => {
    const L = cl(l, 28, 68); const S = cl(s, 40, 90);
    return [
      [h,       S,        L     ],
      [h,       cl(S-18), cl(L + 20)],
      [h + 120, S,        L     ],
      [h + 120, cl(S-18), cl(L - 18)],
      [h + 240, S,        L     ],
      [h + 240, cl(S-18), cl(L - 18)],
    ];
  },

  square: (h, s, l) => {
    const L = cl(l, 28, 68); const S = cl(s, 40, 90);
    return [
      [h,       S, L     ],
      [h + 90,  S, L     ],
      [h + 180, S, L     ],
      [h + 270, S, L     ],
      [h,       S, cl(L + 24)],
      [h + 180, S, cl(L - 24)],
    ];
  },

  rectangular: (h, s, l) => {
    const L = cl(l, 28, 68); const S = cl(s, 40, 90);
    return [
      [h,       S, L],
      [h + 60,  S, L],
      [h + 180, S, L],
      [h + 240, S, L],
      [h,       S, cl(L + 22)],
      [h + 180, S, cl(L + 22)],
    ];
  },

  pentadic: (h, s, l) => {
    const L = cl(l, 28, 68); const S = cl(s, 40, 90);
    return [
      [h,       S, L],
      [h + 72,  S, L],
      [h + 144, S, L],
      [h + 216, S, L],
      [h + 288, S, L],
      [h,       S, cl(L + 22)],
    ];
  },

  hexadic: (h, s, l) => {
    const L = cl(l, 30, 65); const S = cl(s, 40, 88);
    return [
      [h,       S, L],
      [h + 60,  S, L],
      [h + 120, S, L],
      [h + 180, S, L],
      [h + 240, S, L],
      [h + 300, S, L],
    ];
  },

  // ── Analogous ────────────────────────────────────────────────

  analogousNarrow: (h, s, l) => {
    const L = cl(l, 28, 68); const S = cl(s, 38, 88);
    return [
      [h - 75, S, L],
      [h - 45, S, L],
      [h - 15, S, L],
      [h + 15, S, L],
      [h + 45, S, L],
      [h + 75, S, L],
    ];
  },

  analogousMedium: (h, s, l) => {
    const L = cl(l, 28, 68); const S = cl(s, 38, 88);
    return [
      [h - 60, S, L],
      [h - 36, S, L],
      [h - 12, S, L],
      [h + 12, S, L],
      [h + 36, S, L],
      [h + 60, S, L],
    ];
  },

  analogousWide: (h, s, l) => {
    const L = cl(l, 28, 68); const S = cl(s, 38, 88);
    return [
      [h - 90, S, L],
      [h - 54, S, L],
      [h - 18, S, L],
      [h + 18, S, L],
      [h + 54, S, L],
      [h + 90, S, L],
    ];
  },

  analogousComplement: (h, s, l) => {
    const L = cl(l, 28, 68); const S = cl(s, 40, 88);
    return [
      [h - 30,  S, L],
      [h,       S, L],
      [h + 30,  S, L],
      [h + 150, S, L],
      [h + 180, S, L],
      [h + 210, S, L],
    ];
  },

  // ── Monochromatic ────────────────────────────────────────────

  monochromaticLight: (h, s) => [
    [h, s, 22],
    [h, s, 36],
    [h, s, 50],
    [h, s, 62],
    [h, s, 74],
    [h, s, 86],
  ],

  monochromaticDark: (h, s) => [
    [h, s, 8 ],
    [h, s, 18],
    [h, s, 29],
    [h, s, 41],
    [h, s, 53],
    [h, s, 65],
  ],

  monochromaticNeutral: (h, s) => [
    [h, s, 14],
    [h, s, 28],
    [h, s, 43],
    [h, s, 57],
    [h, s, 72],
    [h, s, 87],
  ],

  monochromaticSaturated: (h, _s, l) => {
    const L = cl(l, 35, 65);
    return [
      [h, 12, L],
      [h, 26, L],
      [h, 42, L],
      [h, 58, L],
      [h, 74, L],
      [h, 90, L],
    ];
  },

  // ── Tonal ────────────────────────────────────────────────────

  tints: (h, s, l) => {
    const step = (95 - l) / 5;
    return Array.from({ length: 6 }, (_, i) => [
      h,
      cl(s - i * 6, 0, 100),
      cl(l + i * step, 0, 95),
    ] as HSLTuple);
  },

  shades: (h, s, l) => {
    const step = (l - 8) / 5;
    return Array.from({ length: 6 }, (_, i) => [
      h,
      cl(s + i * 4, 0, 100),
      cl(l - i * step, 8, 95),
    ] as HSLTuple);
  },

  tones: (h, s, l) => {
    const lStep = (l + 15 - l) / 5;
    return Array.from({ length: 6 }, (_, i) => [
      h,
      cl(s * (1 - i * 0.17), 0, 100),
      cl(l + i * 3, 0, 95),
    ] as HSLTuple);
  },

  // ── Style / Mood ─────────────────────────────────────────────

  pastel: (h) => [
    [h,       42, 84],
    [h + 60,  40, 83],
    [h + 120, 44, 85],
    [h + 180, 42, 84],
    [h + 240, 40, 83],
    [h + 300, 44, 85],
  ],

  vibrant: (h) => [
    [h,       90, 52],
    [h + 60,  88, 50],
    [h + 120, 92, 52],
    [h + 180, 90, 50],
    [h + 240, 88, 52],
    [h + 300, 92, 50],
  ],

  deep: (h) => [
    [h,       72, 26],
    [h + 51,  68, 30],
    [h + 102, 74, 24],
    [h + 153, 72, 28],
    [h + 204, 68, 32],
    [h + 255, 74, 26],
  ],

  muted: (h, _s, l) => {
    const L = cl(l, 32, 62);
    return [
      [h,       24, L     ],
      [h + 51,  20, cl(L + 6)],
      [h + 102, 26, cl(L - 6)],
      [h + 153, 24, L     ],
      [h + 204, 20, cl(L + 6)],
      [h + 255, 26, cl(L - 6)],
    ];
  },

  goldenRatio: (h, s, l) => {
    const G = 137.508;
    const L = cl(l, 28, 68); const S = cl(s, 40, 88);
    return [
      [h,         S, L          ],
      [h + G,     S, cl(L + 10) ],
      [h + G * 2, S, cl(L - 10) ],
      [h + G * 3, S, L          ],
      [h + G * 4, S, cl(L + 10) ],
      [h + G * 5, S, cl(L - 10) ],
    ];
  },
};

// ─── Public API ─────────────────────────────────────────────────
export type PaletteMode = keyof typeof generators;

export const PALETTE_MODES = Object.keys(generators) as PaletteMode[];

export function generatePalette(hex: string, mode: PaletteMode): PaletteResult {
  const { h, s, l } = hexToHsl(hex);
  const tuples = generators[mode](h, s, l);
  return { colors: tuples.map(([th, ts, tl]) => makeColor(th, ts, tl)) };
}

export function generateAllPalettes(hex: string): Record<string, PaletteResult> {
  const result: Record<string, PaletteResult> = {};
  for (const mode of PALETTE_MODES) {
    result[mode] = generatePalette(hex, mode);
  }
  return result;
}
