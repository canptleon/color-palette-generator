import React, { useState } from "react";
import { useRouter } from "next/router";
import ColorInput from "@/components/ColorInput";
import { isValidHex, normalizeHex } from "@/utils/colorUtils";
import { useLang } from "@/contexts/LanguageContext";

const PRESETS = [
  { hex: "#947FB4", name: "Amethyst" },
  { hex: "#E84393", name: "Pink" },
  { hex: "#3B82F6", name: "Blue" },
  { hex: "#10B981", name: "Emerald" },
  { hex: "#F59E0B", name: "Amber" },
  { hex: "#EF4444", name: "Red" },
  { hex: "#8B5CF6", name: "Violet" },
  { hex: "#06B6D4", name: "Cyan" },
];

const PALETTE_CHIPS = [
  { label: "Complementary",   color: "bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400" },
  { label: "Analogous",       color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" },
  { label: "Triadic",         color: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400" },
  { label: "Monochromatic",   color: "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400" },
  { label: "Tetradic",        color: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400" },
  { label: "Golden Ratio",    color: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" },
  { label: "Tints & Shades",  color: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400" },
  { label: "Pastel / Vivid",  color: "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400" },
];

export default function DesktopHomepageLayout() {
  const [hex, setHex] = useState("#947FB4");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { t } = useLang();

  const handleSubmit = () => {
    const n = normalizeHex(hex);
    if (!isValidHex(n)) return;
    setLoading(true);
    router.push(`/palettes?hex=${n.replace("#", "")}`);
  };

  return (
    <div className="w-full overflow-hidden">

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-6 pt-14 pb-10 text-center">

        {/* Badge with pulse dot */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400 border border-violet-200 dark:border-violet-800 mb-7 animate-fade-in shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500" />
          </span>
          {t.badge}
        </div>

        {/* Headline — 3-line structure */}
        <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight leading-[1.08] mb-5 animate-slide-up">
          <span className="text-gray-900 dark:text-white">{t.headline1}{" "}</span>
          <span className="gradient-text">{t.headline2}</span>
          <br />
          <span className="text-gray-900 dark:text-white">{t.headline3}</span>
        </h1>

        <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed mb-10 max-w-lg mx-auto animate-slide-up" style={{ animationDelay: "60ms", animationFillMode: "both" }}>
          {t.description}
        </p>

        {/* Color input */}
        <div className="flex justify-center mb-8 animate-scale-in" style={{ animationDelay: "120ms", animationFillMode: "both" }}>
          <ColorInput value={hex} onChange={setHex} onSubmit={handleSubmit} loading={loading} />
        </div>

        {/* Preset swatches */}
        <div className="flex flex-wrap items-center justify-center gap-2 animate-fade-in" style={{ animationDelay: "180ms", animationFillMode: "both" }}>
          <span className="text-xs font-semibold text-gray-400 dark:text-gray-500 mr-1">{t.tryColors}</span>
          {PRESETS.map((p) => (
            <button
              key={p.hex}
              onClick={() => setHex(p.hex)}
              title={p.name}
              className={`flex items-center gap-2 pl-1.5 pr-3 py-1 rounded-full border transition-all duration-200 hover:scale-105 hover:shadow-md ${
                hex.toUpperCase() === p.hex
                  ? "border-violet-300 dark:border-violet-700 bg-violet-50 dark:bg-violet-900/20 shadow-sm"
                  : "border-gray-200 dark:border-slate-700 bg-white/80 dark:bg-slate-800 hover:border-violet-200 dark:hover:border-slate-600"
              }`}
            >
              <span className="w-4 h-4 rounded-full shadow-sm flex-shrink-0 ring-1 ring-black/10" style={{ backgroundColor: p.hex }} />
              <span className="text-xs font-medium text-gray-600 dark:text-gray-300">{p.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* ── Palette algorithm chips ───────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-6 pb-8 animate-fade-in" style={{ animationDelay: "240ms", animationFillMode: "both" }}>
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">
          {t.paletteAlgorithms}
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {PALETTE_CHIPS.map((c) => (
            <span key={c.label} className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-all duration-200 hover:scale-105 cursor-default ${c.color}`}>
              {c.label}
            </span>
          ))}
        </div>
      </section>

      {/* ── Feature cards ─────────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-6 pb-16 animate-fade-in" style={{ animationDelay: "300ms", animationFillMode: "both" }}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>,
              title: t.copyInstantly,
              desc:  t.copyInstantlyDesc,
            },
            {
              icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
              title: t.lockColors,
              desc:  t.lockColorsDesc,
            },
            {
              icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
              title: t.exportShare,
              desc:  t.exportShareDesc,
            },
          ].map((f, i) => (
            <div
              key={f.title}
              className="glass rounded-2xl p-5 flex flex-col gap-3 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
              style={{ animationDelay: `${300 + i * 80}ms`, animationFillMode: "both" }}
            >
              <div className="w-10 h-10 rounded-xl bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center text-violet-600 dark:text-violet-400 transition-transform duration-200 group-hover:scale-110 group-hover:rotate-3">
                {f.icon}
              </div>
              <div>
                <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-1">{f.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Decorative floating orbs ─────────────────────────────── */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-[0.07] bg-violet-500 blur-[120px]" />
        <div className="absolute -bottom-40 -left-32 w-[600px] h-[600px] rounded-full opacity-[0.05] bg-indigo-500 blur-[140px]" />
      </div>
    </div>
  );
}
