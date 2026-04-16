import React from "react";
import ColorCard, { ColorData } from "@/components/ColorCard";
import { useToast } from "@/contexts/ToastContext";
import { useLang } from "@/contexts/LanguageContext";
import { PaletteMode } from "@/utils/paletteGenerator";

// Accent colours for each palette type
const PALETTE_ACCENT: Record<string, string> = {
  complementary:            "text-rose-500 dark:text-rose-400",
  splitComplementary:       "text-orange-500 dark:text-orange-400",
  doubleSplitComplementary: "text-amber-500 dark:text-amber-400",
  triadic:                  "text-yellow-600 dark:text-yellow-400",
  square:                   "text-lime-600 dark:text-lime-400",
  rectangular:              "text-emerald-600 dark:text-emerald-400",
  pentadic:                 "text-teal-600 dark:text-teal-400",
  hexadic:                  "text-cyan-600 dark:text-cyan-400",
  analogousNarrow:          "text-sky-600 dark:text-sky-400",
  analogousMedium:          "text-blue-600 dark:text-blue-400",
  analogousWide:            "text-indigo-600 dark:text-indigo-400",
  analogousComplement:      "text-violet-600 dark:text-violet-400",
  monochromaticLight:       "text-purple-600 dark:text-purple-400",
  monochromaticDark:        "text-fuchsia-600 dark:text-fuchsia-400",
  monochromaticNeutral:     "text-pink-600 dark:text-pink-400",
  monochromaticSaturated:   "text-rose-600 dark:text-rose-400",
  tints:                    "text-slate-500 dark:text-slate-400",
  shades:                   "text-gray-600 dark:text-gray-400",
  tones:                    "text-zinc-600 dark:text-zinc-400",
  pastel:                   "text-pink-500 dark:text-pink-400",
  vibrant:                  "text-orange-600 dark:text-orange-400",
  deep:                     "text-indigo-700 dark:text-indigo-400",
  muted:                    "text-stone-600 dark:text-stone-400",
  goldenRatio:              "text-amber-600 dark:text-amber-400",
};

/** Responsive grid columns based on number of colors */
function gridCols(count: number): string {
  if (count <= 2) return "grid-cols-2";
  if (count === 3) return "grid-cols-3";
  if (count === 4) return "grid-cols-2 sm:grid-cols-4";
  if (count === 5) return "grid-cols-3 sm:grid-cols-5";
  // 6+
  return "grid-cols-3 sm:grid-cols-6";
}

interface Props {
  mode: string;
  colors: ColorData[];
  baseHex: string;
  sectionIndex?: number;
}

export default function PaletteSection({ mode, colors, baseHex, sectionIndex = 0 }: Props) {
  const { showToast } = useToast();
  const { t } = useLang();

  const meta = t.palettes[mode as PaletteMode] ?? { name: mode, desc: "" };
  const accent = PALETTE_ACCENT[mode] ?? "text-violet-600 dark:text-violet-400";

  const handleCopyAll = async () => {
    const hexList = colors.map((c) => c.hex.value).join("  ");
    try {
      await navigator.clipboard.writeText(hexList);
      showToast(t.copiedNColors(colors.length));
    } catch {
      showToast(t.failedCopy, "error");
    }
  };

  return (
    <section
      className="animate-slide-up"
      style={{ animationDelay: `${sectionIndex * 60}ms`, animationFillMode: "both" }}
    >
      {/* Section header */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <h2 className={`text-[17px] font-bold tracking-tight ${accent}`}>
            {meta.name}
          </h2>
          <p className="text-[13px] text-gray-500 dark:text-gray-400 mt-0.5 leading-relaxed">
            {meta.desc}
          </p>
        </div>
        <button
          onClick={handleCopyAll}
          title={t.copyAll}
          className="flex-shrink-0 flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-gray-600 dark:text-gray-300 transition-all duration-200 mt-0.5 active:scale-95"
        >
          <CopyAllIcon />
          {t.copyAll}
        </button>
      </div>

      {/* Color cards — responsive grid, always shows all colors */}
      <div className={`grid gap-2 sm:gap-3 ${gridCols(colors.length)}`}>
        {colors.map((color, i) => (
          <ColorCard
            key={`${mode}-${i}-${color.hex.clean}`}
            color={color}
            animationDelay={i * 55}
          />
        ))}
      </div>
    </section>
  );
}

function CopyAllIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2"/>
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
    </svg>
  );
}
