import React from "react";
import Link from "next/link";

export default function DesktopFooter() {
  return (
    <footer className="w-full mt-16 border-t border-gray-100 dark:border-slate-800">
      <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-gradient-to-br from-violet-500 to-indigo-600" />
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">PaletteGen</span>
        </div>
        <p className="text-sm text-gray-400 dark:text-gray-500 text-center">
          &copy; {new Date().getFullYear()}{" "}
          <Link
            href="https://www.ardakeyisoglu.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-gray-600 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
          >
            Arda Keyişoğlu
          </Link>
          {" "}· All rights reserved.
        </p>
        <p className="text-xs text-gray-400 dark:text-gray-600">
          Powered by{" "}
          <Link href="https://www.thecolorapi.com" target="_blank" rel="noopener noreferrer" className="hover:text-violet-500 transition-colors">
            The Color API
          </Link>
        </p>
      </div>
    </footer>
  );
}
