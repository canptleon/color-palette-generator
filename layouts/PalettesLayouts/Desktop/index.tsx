import React, { useState, useCallback } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import PaletteSection from "@/components/PaletteSection";
import { ColorData } from "@/components/ColorCard";
import { generateRandomHex } from "@/utils/colorUtils";
import { useToast } from "@/contexts/ToastContext";
import { useLang } from "@/contexts/LanguageContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import { PALETTE_MODES } from "@/utils/paletteGenerator";

type PaletteMap = Record<string, { colors: ColorData[] }>;

interface Props {
  hex: string;
  palettes: PaletteMap;
}

export default function DesktopPalettesLayout({ hex, palettes }: Props) {
  const { showToast } = useToast();
  const { t } = useLang();
  const router = useRouter();
  const { addFavorite, removeFavorite, isFavorited: checkFav } = useFavorites();

  const [lockedColors, setLockedColors] = useState<Set<string>>(new Set());
  const isFavorited = checkFav(hex);

  const baseHex = `#${hex}`;

  const handleToggleLock = useCallback((colorHex: string) => {
    setLockedColors((prev) => {
      const next = new Set(prev);
      next.has(colorHex) ? next.delete(colorHex) : next.add(colorHex);
      return next;
    });
  }, []);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      showToast(t.linkCopied, "info");
    } catch { showToast(t.failedLink, "error"); }
  };

  const handleExportJSON = () => {
    const data: Record<string, string[]> = {};
    PALETTE_MODES.forEach((mode) => {
      if (palettes[mode]?.colors) {
        data[mode] = palettes[mode].colors.map((c) => c.hex.value);
      }
    });
    const blob = new Blob([JSON.stringify({ base: baseHex, palettes: data }, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `palette-${hex}.json`; a.click();
    URL.revokeObjectURL(url);
    showToast(t.exportedJSON);
  };

  const handleFavorite = () => {
    try {
      if (isFavorited) {
        removeFavorite(hex);
        showToast(t.removedFavorite);
      } else {
        addFavorite(hex);
        showToast(t.savedFavorite);
      }
    } catch { showToast(t.failedFavorite, "error"); }
  };

  const handleRandomize = () => {
    router.push(`/palettes?hex=${generateRandomHex().replace("#", "")}`);
  };

  const validModes = PALETTE_MODES.filter((m) => palettes[m]?.colors?.length);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">

      {/* ── Back ─────────────────────────────────────────────────── */}
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-all duration-200 mb-8 group"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-200 group-hover:-translate-x-0.5">
          <polyline points="15 18 9 12 15 6"/>
        </svg>
        {t.backToGenerator}
      </Link>

      {/* ── Base color hero ──────────────────────────────────────── */}
      <div className="glass rounded-3xl p-6 mb-10 flex flex-col sm:flex-row items-center sm:items-start gap-6 animate-slide-down">

        {/* Swatch */}
        <div
          className="w-24 h-24 rounded-2xl shadow-xl flex-shrink-0 ring-4 ring-white dark:ring-slate-700 transition-transform duration-300 hover:scale-105"
          style={{ backgroundColor: baseHex }}
        />

        {/* Info */}
        <div className="flex-1 text-center sm:text-left">
          <p className="text-sm font-medium text-gray-400 dark:text-gray-500 mb-1">{t.baseColor}</p>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white font-mono tracking-tight mb-3">
            {baseHex}
          </h1>
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-xs">
            <span className="px-2.5 py-1 rounded-full bg-gray-100 dark:bg-slate-800 text-gray-500 dark:text-gray-400 font-mono">
              {validModes.length} {t.paletteTypes}
            </span>
            {lockedColors.size > 0 && (
              <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 font-semibold animate-scale-in">
                {lockedColors.size} {t.locked}
              </span>
            )}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-end">
          {[
            { label: t.share,      icon: <ShareIcon />,    action: handleShare,     style: "bg-gray-100 hover:bg-gray-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300" },
            { label: t.exportJSON, icon: <DownloadIcon />, action: handleExportJSON, style: "bg-gray-100 hover:bg-gray-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300" },
            { label: isFavorited ? t.saved : t.favorite, icon: <HeartIcon filled={isFavorited} />, action: handleFavorite, style: isFavorited ? "bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400" : "bg-gray-100 hover:bg-gray-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300" },
            { label: t.random,     icon: <ShuffleIcon />,  action: handleRandomize,  style: "bg-violet-600 hover:bg-violet-700 text-white shadow-violet-glow" },
          ].map((btn) => (
            <button
              key={btn.label}
              onClick={btn.action}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-105 active:scale-95 ${btn.style}`}
            >
              {btn.icon}
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Palette sections ─────────────────────────────────────── */}
      <div className="space-y-6">
        {validModes.length === 0 ? (
          <div className="text-center py-20 text-gray-400 dark:text-gray-600">
            <p className="text-lg font-semibold">{t.noPalettes}</p>
            <p className="text-sm mt-1">{t.noPalettesDesc}</p>
          </div>
        ) : (
          validModes.map((mode, idx) => (
            <div key={mode} className="glass rounded-3xl p-6">
              <PaletteSection
                mode={mode}
                colors={palettes[mode].colors}
                baseHex={baseHex}
                lockedColors={lockedColors}
                onToggleLock={handleToggleLock}
                sectionIndex={idx}
              />
            </div>
          ))
        )}
      </div>

      {/* Decorative orbs */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 -right-48 w-[600px] h-[600px] rounded-full opacity-[0.06] blur-[140px]" style={{ backgroundColor: baseHex }} />
        <div className="absolute bottom-1/4 -left-48 w-[500px] h-[500px] rounded-full opacity-[0.04] blur-[120px]" style={{ backgroundColor: baseHex }} />
      </div>
    </div>
  );
}

/* ── Icons ─────────────────────────────────────────────────────── */
function ShareIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>;
}
function DownloadIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>;
}
function HeartIcon({ filled }: { filled: boolean }) {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>;
}
function ShuffleIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/></svg>;
}
