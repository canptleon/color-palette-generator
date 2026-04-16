export type Lang = "en" | "tr";

// ─── Explicit interface (no literal string types) ────────────────
export interface PaletteMeta { name: string; desc: string; }

export interface Translations {
  appName: string;
  generator: string;
  badge: string;
  headline1: string;
  headline2: string;
  headline3: string;
  description: string;
  generate: string;
  tryColors: string;
  paletteAlgorithms: string;
  copyInstantly: string;
  lockColors: string;
  exportShare: string;
  copyInstantlyDesc: string;
  lockColorsDesc: string;
  exportShareDesc: string;
  randomColor: string;
  loading: string;
  backToGenerator: string;
  baseColor: string;
  paletteTypes: string;
  locked: string;
  share: string;
  exportJSON: string;
  favorite: string;
  saved: string;
  random: string;
  copyAll: string;
  copy: string;
  copied: string;
  lockColor: string;
  unlockColor: string;
  noPalettes: string;
  noPalettesDesc: string;
  copiedHex: (hex: string) => string;
  copiedNColors: (n: number) => string;
  linkCopied: string;
  exportedJSON: string;
  removedFavorite: string;
  savedFavorite: string;
  failedCopy: string;
  failedLink: string;
  failedFavorite: string;
  palettes: Record<string, PaletteMeta>;
}

// ─── English ─────────────────────────────────────────────────────
const en: Translations = {
  appName:     "PaletteGen",
  generator:   "Generator",

  badge:       "24 palette types · Instant generation",
  headline1:   "Generate",
  headline2:   "beautiful",
  headline3:   "color palettes",
  description: "Pick any color and instantly explore 24 harmonious palette styles — from classical theory to mood-based themes.",
  generate:    "Generate",
  tryColors:   "Try:",
  paletteAlgorithms: "Palette algorithms",

  copyInstantly:     "Copy instantly",
  lockColors:        "Lock colors",
  exportShare:       "Export & Share",
  copyInstantlyDesc: "Click any swatch to copy its hex code to clipboard.",
  lockColorsDesc:    "Lock your favourite swatches to keep them while exploring.",
  exportShareDesc:   "Download palettes as JSON or share a direct link.",

  randomColor: "Random color",
  loading:     "Loading…",

  backToGenerator: "Back to generator",
  baseColor:       "Base color",
  paletteTypes:    "palette types",
  locked:          "locked",
  share:           "Share",
  exportJSON:      "Export JSON",
  favorite:        "Favorite",
  saved:           "Saved",
  random:          "Random",
  copyAll:         "Copy all",
  copy:            "Copy",
  copied:          "Copied!",
  lockColor:       "Lock color",
  unlockColor:     "Unlock color",
  noPalettes:      "No palettes available",
  noPalettesDesc:  "Please try a different color.",

  copiedHex:       (hex) => `Copied ${hex}!`,
  copiedNColors:   (n)   => `Copied ${n} colors!`,
  linkCopied:      "Link copied to clipboard!",
  exportedJSON:    "Palette exported as JSON!",
  removedFavorite: "Removed from favorites",
  savedFavorite:   "Saved to favorites!",
  failedCopy:      "Failed to copy",
  failedLink:      "Failed to copy link",
  failedFavorite:  "Couldn't save favorite",

  palettes: {
    complementary:            { name: "Complementary",             desc: "Opposite hues on the wheel — maximum contrast" },
    splitComplementary:       { name: "Split-Complementary",       desc: "A base plus two adjacent complement hues" },
    doubleSplitComplementary: { name: "Double Split-Comp.",        desc: "Two analogous hues flanking each complement" },
    triadic:                  { name: "Triadic",                   desc: "Three evenly-spaced hues — bold and vivid" },
    square:                   { name: "Square (Tetradic)",         desc: "Four hues at 90° intervals on the wheel" },
    rectangular:              { name: "Rectangle (Tetradic)",      desc: "Two complementary pairs 60° apart" },
    pentadic:                 { name: "Pentadic",                  desc: "Five hues evenly spaced at 72° each" },
    hexadic:                  { name: "Hexadic",                   desc: "Six hues evenly spaced at 60° each" },
    analogousNarrow:          { name: "Analogous — Narrow",        desc: "Adjacent hues within ±75° — serene and natural" },
    analogousMedium:          { name: "Analogous — Medium",        desc: "Adjacent hues within ±60° — harmonious balance" },
    analogousWide:            { name: "Analogous — Wide",          desc: "Adjacent hues within ±90° — rich range" },
    analogousComplement:      { name: "Analogous + Complement",    desc: "Three analogous hues paired with their complements" },
    monochromaticLight:       { name: "Monochromatic — Light",     desc: "Same hue across light tones (22–86% lightness)" },
    monochromaticDark:        { name: "Monochromatic — Dark",      desc: "Same hue in deep dark shades (8–65% lightness)" },
    monochromaticNeutral:     { name: "Monochromatic — Full Range",desc: "Complete light-to-dark spread of one hue" },
    monochromaticSaturated:   { name: "Monochromatic — Saturated", desc: "Same hue, saturation from pale to vivid" },
    tints:                    { name: "Tints",                     desc: "Base color progressively mixed with white" },
    shades:                   { name: "Shades",                    desc: "Base color progressively mixed with black" },
    tones:                    { name: "Tones",                     desc: "Base color progressively mixed with grey" },
    pastel:                   { name: "Pastel",                    desc: "Soft, airy tones with high lightness" },
    vibrant:                  { name: "Vibrant",                   desc: "Saturated, energetic hues at full intensity" },
    deep:                     { name: "Deep & Rich",               desc: "Saturated, dark, jewel-toned palette" },
    muted:                    { name: "Muted & Earthy",            desc: "Desaturated, organic, natural feel" },
    goldenRatio:              { name: "Golden Ratio",              desc: "Hue steps at the golden angle (137.5°)" },
  },
};

// ─── Turkish ─────────────────────────────────────────────────────
const tr: Translations = {
  appName:     "PaletteGen",
  generator:   "Oluşturucu",

  badge:       "24 palet türü · Anında oluşturma",
  headline1:   "Güzel",
  headline2:   "renk paletleri",
  headline3:   "oluşturun",
  description: "Herhangi bir rengi seçin ve 24 uyumlu palet stilini anında keşfedin — klasik teoriden duygu temelli temalara.",
  generate:    "Oluştur",
  tryColors:   "Dene:",
  paletteAlgorithms: "Palet algoritmaları",

  copyInstantly:     "Anında kopyala",
  lockColors:        "Renkleri kilitle",
  exportShare:       "Dışa aktar & Paylaş",
  copyInstantlyDesc: "Hex kodunu panoya kopyalamak için herhangi bir renge tıklayın.",
  lockColorsDesc:    "Keşfederken favori renklerinizi sabitlemek için kilitleyin.",
  exportShareDesc:   "Paleti JSON olarak indirin veya doğrudan bağlantı paylaşın.",

  randomColor: "Rastgele renk",
  loading:     "Yükleniyor…",

  backToGenerator: "Oluşturucuya dön",
  baseColor:       "Temel renk",
  paletteTypes:    "palet türü",
  locked:          "kilitli",
  share:           "Paylaş",
  exportJSON:      "JSON İndir",
  favorite:        "Favori",
  saved:           "Kaydedildi",
  random:          "Rastgele",
  copyAll:         "Tümünü kopyala",
  copy:            "Kopyala",
  copied:          "Kopyalandı!",
  lockColor:       "Rengi kilitle",
  unlockColor:     "Kilidi aç",
  noPalettes:      "Palet bulunamadı",
  noPalettesDesc:  "Lütfen farklı bir renk deneyin.",

  copiedHex:       (hex) => `${hex} kopyalandı!`,
  copiedNColors:   (n)   => `${n} renk kopyalandı!`,
  linkCopied:      "Bağlantı panoya kopyalandı!",
  exportedJSON:    "Palet JSON olarak dışa aktarıldı!",
  removedFavorite: "Favorilerden kaldırıldı",
  savedFavorite:   "Favorilere kaydedildi!",
  failedCopy:      "Kopyalanamadı",
  failedLink:      "Bağlantı kopyalanamadı",
  failedFavorite:  "Favori kaydedilemedi",

  palettes: {
    complementary:            { name: "Tamamlayıcı",               desc: "Çarkta karşı tonlar — maksimum kontrast" },
    splitComplementary:       { name: "Bölünmüş Tamamlayıcı",      desc: "Temel renk artı iki yan tamamlayıcı ton" },
    doubleSplitComplementary: { name: "Çift Bölünmüş Tamamlayıcı", desc: "Her tamamlayıcıyı kapsayan analogus tonlar" },
    triadic:                  { name: "Üçgen (Triadik)",           desc: "120° arayla üç ton — cesur ve canlı" },
    square:                   { name: "Kare (Tetradik)",           desc: "Çarkta 90° arayla dört ton" },
    rectangular:              { name: "Dikdörtgen (Tetradik)",     desc: "60° arayla iki tamamlayıcı çift" },
    pentadic:                 { name: "Pentadik",                  desc: "72° arayla eşit beş ton" },
    hexadic:                  { name: "Heksadik",                  desc: "60° arayla eşit altı ton" },
    analogousNarrow:          { name: "Analogus — Dar",            desc: "±75° içindeki komşu tonlar — sakin ve doğal" },
    analogousMedium:          { name: "Analogus — Orta",           desc: "±60° içindeki komşu tonlar — uyumlu denge" },
    analogousWide:            { name: "Analogus — Geniş",          desc: "±90° içindeki komşu tonlar — zengin aralık" },
    analogousComplement:      { name: "Analogus + Tamamlayıcı",    desc: "Üç analogus ton ve tamamlayıcılarıyla" },
    monochromaticLight:       { name: "Monokromatik — Açık",       desc: "Aynı ton, açık aralıkta (22–86% parlaklık)" },
    monochromaticDark:        { name: "Monokromatik — Koyu",       desc: "Aynı ton, derin koyu gölgelerde (8–65%)" },
    monochromaticNeutral:     { name: "Monokromatik — Tam Aralık", desc: "Bir tonun açıktan koyuya tam yelpazesi" },
    monochromaticSaturated:   { name: "Monokromatik — Doygunluk",  desc: "Aynı ton, soluk solgundan canlıya doygunluk" },
    tints:                    { name: "Tintler (Açık Tonlar)",     desc: "Temel renk giderek beyazla karıştırılır" },
    shades:                   { name: "Gölgeler (Koyu Tonlar)",    desc: "Temel renk giderek siyahla karıştırılır" },
    tones:                    { name: "Tonlar (Gri Karışımı)",     desc: "Temel renk giderek griyle karıştırılır" },
    pastel:                   { name: "Pastel",                    desc: "Yüksek parlaklıkta yumuşak, havadar tonlar" },
    vibrant:                  { name: "Canlı (Vibrant)",           desc: "Yüksek doygunlukta, enerjik, tam yoğunlukta" },
    deep:                     { name: "Derin & Zengin",            desc: "Doygun, koyu, mücevher tonlarında palet" },
    muted:                    { name: "Sönük & Toprak Renkleri",   desc: "Az doygun, organik, doğal hisli palet" },
    goldenRatio:              { name: "Altın Oran",                desc: "Altın açıyla (137,5°) ton adımları" },
  },
};

export const translations: Record<Lang, Translations> = { en, tr };
