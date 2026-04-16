import React, { useRef, useState, useEffect } from "react";
import { useLang } from "@/contexts/LanguageContext";
import { Lang } from "@/utils/translations";

const LANGS: { code: Lang; label: string; flag: React.ReactNode }[] = [
  {
    code: "en",
    label: "English",
    flag: (
      /* UK flag SVG — simplified Union Jack colours */
      <svg width="18" height="12" viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect width="60" height="40" fill="#012169"/>
        {/* White diagonals */}
        <line x1="0" y1="0" x2="60" y2="40" stroke="#fff" strokeWidth="9"/>
        <line x1="60" y1="0" x2="0" y2="40" stroke="#fff" strokeWidth="9"/>
        {/* Red diagonals */}
        <line x1="0" y1="0" x2="60" y2="40" stroke="#C8102E" strokeWidth="5"/>
        <line x1="60" y1="0" x2="0" y2="40" stroke="#C8102E" strokeWidth="5"/>
        {/* White cross */}
        <rect x="24" y="0" width="12" height="40" fill="#fff"/>
        <rect x="0" y="14" width="60" height="12" fill="#fff"/>
        {/* Red cross */}
        <rect x="26" y="0" width="8" height="40" fill="#C8102E"/>
        <rect x="0" y="16" width="60" height="8" fill="#C8102E"/>
      </svg>
    ),
  },
  {
    code: "tr",
    label: "Türkçe",
    flag: (
      /* Turkish flag */
      <svg width="18" height="12" viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect width="60" height="40" fill="#E30A17"/>
        {/* White star-and-crescent */}
        <circle cx="25" cy="20" r="11" fill="#fff"/>
        <circle cx="28.5" cy="20" r="8.5" fill="#E30A17"/>
        <polygon points="37,20 42,18 40,23 44,20 40,17" fill="#fff"/>
      </svg>
    ),
  },
];

export default function LanguageSwitcher() {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = LANGS.find((l) => l.code === lang) ?? LANGS[0];

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      {/* Trigger button */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="listbox"
        className="flex items-center gap-2 h-10 px-3 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-gray-200 dark:border-slate-700 transition-all duration-200 hover:scale-105"
      >
        <span className="flex-shrink-0 overflow-hidden rounded-sm" style={{ lineHeight: 0 }}>
          {current.flag}
        </span>
        <span className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
          {current.code}
        </span>
        <svg
          width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
          className={`text-gray-500 dark:text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <div
          role="listbox"
          className="absolute right-0 top-12 z-50 w-36 rounded-xl overflow-hidden shadow-xl border border-gray-100 dark:border-slate-700 bg-white dark:bg-slate-800 animate-slide-down"
        >
          {LANGS.map((l) => (
            <button
              key={l.code}
              role="option"
              aria-selected={lang === l.code}
              onClick={() => { setLang(l.code); setOpen(false); }}
              className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 text-sm transition-colors ${
                lang === l.code
                  ? "bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-400 font-semibold"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 font-medium"
              }`}
            >
              <span className="flex-shrink-0 overflow-hidden rounded-sm" style={{ lineHeight: 0 }}>
                {l.flag}
              </span>
              <span>{l.label}</span>
              {lang === l.code && (
                <svg className="ml-auto" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
