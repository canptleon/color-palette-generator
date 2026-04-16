import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./layouts/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./contexts/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        violet: {
          50: "#f5f3ff", 100: "#ede9fe", 200: "#ddd6fe",
          300: "#c4b5fd", 400: "#a78bfa", 500: "#8b5cf6",
          600: "#7c3aed", 700: "#6d28d9", 800: "#5b21b6",
          900: "#4c1d95", 950: "#2e1065",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "Menlo", "Monaco", "Consolas", "monospace"],
      },
      animation: {
        // Entrance
        "fade-in":    "fadeIn 0.28s ease-out both",
        "slide-up":   "slideUp 0.32s ease-out both",
        "slide-down": "slideDown 0.32s ease-out both",
        "scale-in":   "scaleIn 0.22s ease-out both",
        "pop-in":     "popIn 0.25s cubic-bezier(0.34,1.56,0.64,1) both",

        // Toast
        "toast-in":  "toastIn 0.3s ease-out both",
        "toast-out": "toastOut 0.25s ease-in forwards",

        // Looping
        "shimmer":    "shimmer 1.8s ease-in-out infinite",
        "float":      "float 6s ease-in-out infinite",
        "float-slow": "float 9s ease-in-out infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4,0,0.6,1) infinite",
        "spin-slow":  "spin 3s linear infinite",
      },
      keyframes: {
        fadeIn:    { from: { opacity: "0" },                                   to: { opacity: "1" } },
        slideUp:   { from: { opacity: "0", transform: "translateY(14px)" },    to: { opacity: "1", transform: "translateY(0)" } },
        slideDown: { from: { opacity: "0", transform: "translateY(-14px)" },   to: { opacity: "1", transform: "translateY(0)" } },
        scaleIn:   { from: { opacity: "0", transform: "scale(0.90)" },         to: { opacity: "1", transform: "scale(1)" } },
        popIn:     { from: { opacity: "0", transform: "scale(0.80)" },         to: { opacity: "1", transform: "scale(1)" } },
        toastIn:   { from: { opacity: "0", transform: "translateX(110%) scale(0.88)" }, to: { opacity: "1", transform: "translateX(0) scale(1)" } },
        toastOut:  { from: { opacity: "1", transform: "translateX(0) scale(1)" }, to: { opacity: "0", transform: "translateX(110%) scale(0.88)" } },
        shimmer:   { "0%": { backgroundPosition: "-200% 0" }, "100%": { backgroundPosition: "200% 0" } },
        float:     { "0%,100%": { transform: "translateY(0px)" }, "50%": { transform: "translateY(-18px)" } },
      },
      boxShadow: {
        "glass":       "0 4px 24px -4px rgba(0,0,0,0.08), 0 0 0 1px rgba(255,255,255,0.4) inset",
        "glass-dark":  "0 4px 24px -4px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.06) inset",
        "color-card":  "0 2px 16px -4px rgba(0,0,0,0.10)",
        "violet-glow": "0 4px 20px -4px rgba(124,58,237,0.45)",
        "xl-colored":  "0 20px 40px -12px rgba(0,0,0,0.25)",
      },
      backdropBlur: {
        xs: "2px",
      },
      transitionTimingFunction: {
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
      screens: {
        xsfull:  { max: "576px" },
        smfull:  { max: "768px" },
        mdfull:  { max: "992px" },
        lgfull:  { max: "1200px" },
        xlfull:  { max: "1440px" },
        xxsfull: { max: "390px" },
        sm:      { max: "768px",  min: "576px" },
        md:      { max: "992px",  min: "768px" },
        lg:      { max: "1200px", min: "993px" },
        xl:      { max: "1440px", min: "1201px" },
      },
    },
  },
  plugins: [],
};

export default config;
