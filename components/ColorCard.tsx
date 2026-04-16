import React, { useState } from "react";
import { getBestContrast } from "@/utils/colorUtils";
import { useToast } from "@/contexts/ToastContext";
import { useLang } from "@/contexts/LanguageContext";
import { useFavorites } from "@/contexts/FavoritesContext";

export interface ColorData {
  hex: { value: string; clean: string };
  rgb?: { value: string; r: number; g: number; b: number };
  hsl?: { value: string; h: number; s: number; l: number };
}

interface Props {
  color: ColorData;
  animationDelay?: number;
}

const WCAG_BADGE: Record<string, string> = {
  AAA:  "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  AA:   "bg-sky-100    text-sky-700    dark:bg-sky-900/30    dark:text-sky-400",
  A:    "bg-amber-100  text-amber-700  dark:bg-amber-900/30  dark:text-amber-400",
  Fail: "bg-red-100    text-red-700    dark:bg-red-900/30    dark:text-red-400",
};

export default function ColorCard({ color, animationDelay = 0 }: Props) {
  const { showToast } = useToast();
  const { t } = useLang();
  const { addFavorite, removeFavorite, isFavorited } = useFavorites();
  const [copied, setCopied] = useState(false);

  const hex = color.hex.value;
  const { ratio, level } = getBestContrast(hex);
  const favorited = isFavorited(color.hex.clean);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(hex);
      showToast(t.copiedHex(hex));
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      showToast(t.failedCopy, "error");
    }
  };

  const handleFavorite = () => {
    try {
      if (favorited) {
        removeFavorite(color.hex.clean);
        showToast(t.removedFavorite);
      } else {
        addFavorite(color.hex.clean);
        showToast(t.savedFavorite);
      }
    } catch {
      showToast(t.failedFavorite, "error");
    }
  };

  return (
    <div
      className="color-card group relative flex flex-col rounded-2xl overflow-hidden bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 w-full animate-scale-in
        shadow-[0_2px_16px_-4px_rgba(0,0,0,0.10)] hover:shadow-[0_8px_32px_-6px_rgba(0,0,0,0.18)]
        hover:-translate-y-1 transition-all duration-300 cursor-default"
      style={{ animationDelay: `${animationDelay}ms`, animationFillMode: "both" }}
    >
      {/* ── Color Swatch ─────────────────────────────── */}
      <div
        className="relative h-36 sm:h-44 cursor-pointer select-none"
        style={{ backgroundColor: hex }}
        onClick={handleCopy}
        title={t.copy}
      >
        {/* Pulse ring on copy */}
        {copied && (
          <div className="absolute inset-0 ring-4 ring-white/40 animate-ping pointer-events-none" />
        )}
      </div>

      {/* ── Info Panel ──────────────────────────────── */}
      <div className="p-2.5 sm:p-3.5 flex flex-col gap-1">
        {/* Hex + WCAG */}
        <div className="flex items-center justify-between gap-1">
          <span className="font-mono text-[12px] sm:text-[14px] font-bold text-gray-800 dark:text-gray-100 tracking-tight truncate">
            {hex}
          </span>
          <span className={`text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded-md flex-shrink-0 ${WCAG_BADGE[level]}`}>
            {level}
          </span>
        </div>

        {/* RGB */}
        {color.rgb && (
          <p className="font-mono text-[10px] sm:text-[11px] text-gray-500 dark:text-gray-400 truncate leading-tight">
            {color.rgb.value}
          </p>
        )}

        {/* HSL */}
        {color.hsl && (
          <p className="font-mono text-[9px] sm:text-[10px] text-gray-400 dark:text-gray-500 truncate leading-tight">
            {color.hsl.value}
          </p>
        )}

        {/* Action row */}
        <div className="flex gap-1.5 mt-1 pt-2 border-t border-gray-100 dark:border-slate-700">
          <button
            onClick={handleCopy}
            className="flex-1 flex items-center justify-center gap-1 sm:gap-1.5 text-[10px] sm:text-[11px] font-semibold py-1.5 sm:py-2 rounded-lg bg-gray-50 hover:bg-gray-100 dark:bg-slate-700 dark:hover:bg-slate-600 text-gray-700 dark:text-gray-300 transition-all duration-200 active:scale-95"
          >
            {copied ? <CheckIcon /> : <CopyIcon />}
            {copied ? t.copied : t.copy}
          </button>
          <button
            onClick={handleFavorite}
            title={favorited ? t.removedFavorite : t.savedFavorite}
            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-200 active:scale-95 ${
              favorited
                ? "bg-rose-100 text-rose-500 dark:bg-rose-900/30 dark:text-rose-400"
                : "bg-gray-50 hover:bg-rose-50 dark:bg-slate-700 dark:hover:bg-rose-900/20 text-gray-400 hover:text-rose-400 dark:text-gray-500"
            }`}
          >
            <HeartIcon filled={favorited} />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Inline SVG icons ───────────────────────────────────────── */
function CopyIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2"/>
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  );
}

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  );
}
