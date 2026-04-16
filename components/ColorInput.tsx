import React, { useEffect, useState } from "react";
import { isValidHex, generateRandomHex, normalizeHex } from "@/utils/colorUtils";
import { useLang } from "@/contexts/LanguageContext";

interface Props {
  value: string;
  onChange: (hex: string) => void;
  onSubmit: () => void;
  loading?: boolean;
}

export default function ColorInput({ value, onChange, onSubmit, loading }: Props) {
  const { t } = useLang();
  const [raw, setRaw] = useState(value);
  const [invalid, setInvalid] = useState(false);

  useEffect(() => { setRaw(value); setInvalid(false); }, [value]);

  const handleText = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setRaw(input);
    const n = normalizeHex(input);
    if (isValidHex(n)) { setInvalid(false); onChange(n); }
    else setInvalid(true);
  };

  const handlePicker = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hex = e.target.value.toUpperCase();
    setRaw(hex); setInvalid(false); onChange(hex);
  };

  const handleRandom = () => {
    const hex = generateRandomHex();
    setRaw(hex); setInvalid(false); onChange(hex);
  };

  const displayColor = isValidHex(raw) ? raw : isValidHex(normalizeHex(raw)) ? normalizeHex(raw) : "#947FB4";

  return (
    <div className="flex items-center gap-2 p-2 bg-white/85 dark:bg-slate-800/85 backdrop-blur-md rounded-2xl shadow-lg border border-white/60 dark:border-slate-700 w-full max-w-lg">

      {/* Color picker swatch */}
      <label className="relative flex-shrink-0 cursor-pointer group/picker">
        <div
          className="w-11 h-11 rounded-xl shadow-md border-2 border-white dark:border-slate-600 transition-all duration-200 group-hover/picker:scale-105 group-hover/picker:shadow-lg"
          style={{ backgroundColor: displayColor }}
        />
        <input
          type="color"
          value={displayColor}
          onChange={handlePicker}
          className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
          tabIndex={-1}
        />
      </label>

      {/* Hex text input */}
      <input
        type="text"
        value={raw}
        onChange={handleText}
        onKeyDown={(e) => e.key === "Enter" && !invalid && onSubmit()}
        placeholder="#947FB4"
        spellCheck={false}
        className={`flex-1 min-w-0 font-mono text-sm font-semibold bg-transparent outline-none transition-colors duration-150 ${
          invalid ? "text-red-500 dark:text-red-400" : "text-gray-800 dark:text-gray-100"
        } placeholder-gray-300 dark:placeholder-gray-600`}
      />

      {/* Random button */}
      <button
        onClick={handleRandom}
        title={t.randomColor}
        className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 bg-gray-100 hover:bg-gray-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-gray-600 dark:text-gray-300 transition-all duration-300 hover:scale-105"
        style={{ transition: "transform 0.4s cubic-bezier(0.34,1.56,0.64,1), background 0.2s" }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.1) rotate(180deg)"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(1) rotate(0deg)"; }}
      >
        <ShuffleIcon />
      </button>

      {/* Generate button */}
      <button
        onClick={() => !invalid && !loading && onSubmit()}
        disabled={invalid || loading}
        className="flex-shrink-0 flex items-center gap-1.5 px-5 py-2.5 bg-violet-600 hover:bg-violet-700 active:bg-violet-800 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 shadow-violet-glow whitespace-nowrap"
      >
        {loading ? <><SpinnerIcon />{t.loading}</> : <><SparkleIcon />{t.generate}</>}
      </button>
    </div>
  );
}

function ShuffleIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 3 21 3 21 8"/>
      <line x1="4" y1="20" x2="21" y2="3"/>
      <polyline points="21 16 21 21 16 21"/>
      <line x1="15" y1="15" x2="21" y2="21"/>
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <path d="M12 2l2.09 6.42H21l-5.73 4.16 2.18 6.73L12 15.5l-5.45 3.81 2.18-6.73L3 8.42h6.91z"/>
    </svg>
  );
}

function SpinnerIcon() {
  return (
    <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
    </svg>
  );
}
