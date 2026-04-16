import React, { useRef, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useLang } from "@/contexts/LanguageContext";

function timeAgo(timestamp: number): string {
  const diff = Math.floor((Date.now() - timestamp) / 1000);
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

export default function FavoritesPanel() {
  const { favorites, removeFavorite, clearAll } = useFavorites();
  const { t } = useLang();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const count = favorites.length;

  return (
    <div ref={containerRef} className="relative">
      {/* Trigger button */}
      <button
        onClick={() => setOpen((v) => !v)}
        title={t.favorites}
        className={`relative w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-105 ${
          open
            ? "bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400"
            : "bg-gray-100 hover:bg-gray-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-gray-600 dark:text-gray-300"
        }`}
        aria-label={t.favorites}
        aria-expanded={open}
      >
        <HeartIcon filled={count > 0} />
        {count > 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center animate-scale-in">
            {count > 9 ? "9+" : count}
          </span>
        )}
      </button>

      {/* Dropdown panel */}
      {open && (
        <div className="absolute right-0 top-full mt-2 w-80 glass rounded-2xl shadow-xl border border-white/50 dark:border-slate-700/80 overflow-hidden animate-slide-down z-50">

          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/30 dark:border-slate-700/60">
            <span className="font-semibold text-sm text-gray-800 dark:text-gray-100">
              {t.favorites}
              {count > 0 && (
                <span className="ml-1.5 text-xs font-normal text-gray-400 dark:text-gray-500">
                  ({count})
                </span>
              )}
            </span>
            {count > 0 && (
              <button
                onClick={clearAll}
                className="text-xs text-gray-400 hover:text-rose-500 dark:hover:text-rose-400 transition-colors duration-150"
              >
                {t.clearAll}
              </button>
            )}
          </div>

          {/* List */}
          {count === 0 ? (
            <div className="px-4 py-8 text-center">
              <div className="w-10 h-10 rounded-2xl bg-gray-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-3 text-gray-300 dark:text-gray-600">
                <HeartIcon filled={false} size={18} />
              </div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{t.noFavorites}</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{t.noFavoritesDesc}</p>
            </div>
          ) : (
            <ul className="max-h-72 overflow-y-auto py-1.5">
              {favorites.map((fav) => (
                <li
                  key={fav.hex}
                  className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 dark:hover:bg-slate-800/60 transition-colors duration-150 group"
                >
                  {/* Swatch */}
                  <div
                    className="w-9 h-9 rounded-xl flex-shrink-0 shadow-sm ring-2 ring-white dark:ring-slate-700"
                    style={{ backgroundColor: `#${fav.hex}` }}
                  />

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-mono font-semibold text-gray-800 dark:text-gray-100 truncate">
                      #{fav.hex}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      {timeAgo(fav.timestamp)}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                    <button
                      onClick={() => { router.push(`/palettes?hex=${fav.hex}`); setOpen(false); }}
                      className="px-2.5 py-1 rounded-lg bg-violet-600 hover:bg-violet-700 text-white text-xs font-semibold transition-all duration-150 hover:scale-105"
                    >
                      {t.open}
                    </button>
                    <button
                      onClick={() => removeFavorite(fav.hex)}
                      className="w-6 h-6 rounded-lg flex items-center justify-center text-gray-400 hover:text-rose-500 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-all duration-150"
                      aria-label="Remove"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                      </svg>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

function HeartIcon({ filled, size = 15 }: { filled: boolean; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  );
}
