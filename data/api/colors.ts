import { API_BASE_URL, load } from ".";

export const getPalettes = (hex: string, mode: string = 'triad', count: number = 5) => load<any>(
  `${API_BASE_URL}/scheme?hex=${hex}&mode=${mode}&count=${count}`,
  "GET",
  undefined,
);