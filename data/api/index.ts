import axios, { AxiosRequestConfig } from "axios";

export const API_BASE_URL = "https://www.thecolorapi.com"

export interface ResponseData<T> {
  status: number;
  statusText?: string;
  body?: T;
  error?: string;
  url?: string;
}

export async function load<T>(
  url: string,
  method: string,
  data: any
): Promise<ResponseData<T>> {
  const headers: any = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  try {
    const axiosConfig: AxiosRequestConfig = { method, url, headers, data };
    const response = await axios.request<T>(axiosConfig);

    let error;
    let body;

    if (response.status === 200) {
      try {
        body = response.data;
      } catch (e: any) {
        console.error(url, e);
        error = e.message ?? String(e);
      }
    }

    return {
      status: response.status,
      statusText: response.statusText,
      body,
      error,
      url: axiosConfig.url,
    };
  } catch (e: any) {
    console.error(url, e);

    return {
      status: 0,
      statusText: "",
      body: undefined,
      error: e.message ?? String(e),
    };
  }
}