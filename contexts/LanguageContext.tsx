import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { Lang, translations, Translations } from "@/utils/translations";

interface LanguageContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "tr",
  setLang: () => {},
  t: translations.tr,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("tr");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("lang") as Lang | null;
    const resolved: Lang = stored === "tr" || stored === "en" ? stored : "tr";
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
