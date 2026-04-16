import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { Lang, translations, Translations } from "@/utils/translations";

interface LanguageContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  setLang: () => {},
  t: translations.en,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("lang") as Lang | null;
    const browserLang = navigator.language.startsWith("tr") ? "tr" : "en";
    const resolved: Lang = stored === "tr" || stored === "en" ? stored : browserLang;
    setLangState(resolved);
    setMounted(true);
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    localStorage.setItem("lang", l);
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {/* Avoid language flash — same visibility trick as ThemeProvider */}
      <div style={{ visibility: mounted ? "visible" : "hidden" }}>{children}</div>
    </LanguageContext.Provider>
  );
}

export const useLang = () => useContext(LanguageContext);
