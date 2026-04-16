import React from "react";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import FavoritesPanel from "@/components/FavoritesPanel";
import { useLang } from "@/contexts/LanguageContext";

export default function DesktopHeader() {
  const { t } = useLang();

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="glass border-b border-white/50 dark:border-slate-800/80 shadow-sm">
        <div className="max-w-6xl mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-2 min-w-0">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 sm:gap-2.5 group flex-shrink-0 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 shadow-md shadow-violet-500/30 flex items-center justify-center transition-transform duration-200 group-hover:scale-105 flex-shrink-0">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"/>
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
              </svg>
            </div>
            <span className="font-bold text-[14px] sm:text-[17px] text-gray-900 dark:text-white tracking-tight whitespace-nowrap">
              Color Palette<span className="text-violet-600 dark:text-violet-400"> Generator</span>
            </span>
          </Link>

          {/* Actions */}
          <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
            <Link
              href="/"
              className="hidden sm:flex text-sm font-medium px-4 py-2 rounded-xl text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-800 transition-all duration-200"
            >
              {t.generator}
            </Link>
            <FavoritesPanel />
            <LanguageSwitcher />
            <ThemeToggle />
          </div>

        </div>
      </div>
    </header>
  );
}
