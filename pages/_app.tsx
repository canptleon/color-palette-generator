import type { AppContext, AppProps } from "next/app";
import App from "next/app";
import "@/public/globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { ToastProvider } from "@/contexts/ToastContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { FavoritesProvider } from "@/contexts/FavoritesContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <FavoritesProvider>
          <ToastProvider>
            <Component {...pageProps} />
          </ToastProvider>
        </FavoritesProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

MyApp.getInitialProps = async (ctx: AppContext) => {
  const appProps = await App.getInitialProps(ctx);
  return { ...appProps };
};

export default MyApp;
