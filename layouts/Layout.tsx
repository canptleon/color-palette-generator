import React, { ReactNode, memo, useEffect, useState } from "react";
import { useRouter } from "next/router";
import DesktopHeader from "./GeneralLayouts/Desktop/Header";
import DesktopFooter from "./GeneralLayouts/Desktop/Footer";
import ToastContainer from "@/components/Toast";

interface LayoutProps {
  children: ReactNode;
  isMobile?: boolean;
}

// Thin top progress bar shown during page transitions
function RouteLoadingBar() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    const handleStart = () => {
      setLoading(true);
      setProgress(0);
      // Simulate progress up to 85%
      timer = setTimeout(() => setProgress(85), 150);
    };
    const handleDone = () => {
      setProgress(100);
      timer = setTimeout(() => {
        setLoading(false);
        setProgress(0);
      }, 300);
    };

    router.events.on("routeChangeStart",    handleStart);
    router.events.on("routeChangeComplete", handleDone);
    router.events.on("routeChangeError",    handleDone);

    return () => {
      clearTimeout(timer);
      router.events.off("routeChangeStart",    handleStart);
      router.events.off("routeChangeComplete", handleDone);
      router.events.off("routeChangeError",    handleDone);
    };
  }, [router.events]);

  if (!loading && progress === 0) return null;

  return (
    <div
      className="fixed top-0 left-0 z-[100] h-[3px] bg-gradient-to-r from-violet-500 via-indigo-500 to-sky-500 shadow-[0_0_8px_rgba(124,58,237,0.6)] transition-all duration-300 ease-out"
      style={{ width: `${progress}%`, opacity: loading ? 1 : 0 }}
    />
  );
}

function Layout({ children, isMobile }: LayoutProps) {
  return (
    <>
      <RouteLoadingBar />
      {/* Shared header for both mobile and desktop */}
      <DesktopHeader />
      <main className="min-h-[calc(100vh-4rem-80px)]">
        {children}
      </main>
      <DesktopFooter />
      <ToastContainer />
    </>
  );
}

export default memo(Layout);
