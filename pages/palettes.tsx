import React from "react";
import { GetServerSideProps } from "next";
import { getNativeWebDevice } from "@/utils/formatting/render";
import DesktopPalettesLayout from "@/layouts/PalettesLayouts/Desktop";
import MobilePalettesLayout from "@/layouts/PalettesLayouts/Mobile";
import Layout from "@/layouts/Layout";
import HtmlHead from "@/components/HtmlHead";
import { generateAllPalettes } from "@/utils/paletteGenerator";
import { isValidHex } from "@/utils/colorUtils";

interface Props {
  isMobile: boolean;
  hex: string;
  palettes: ReturnType<typeof generateAllPalettes>;
}

function Palettes({ isMobile, hex, palettes }: Props) {
  return (
    <>
      <HtmlHead title={`#${hex} — Color Palette Generator`} />
      <Layout isMobile={isMobile}>
        {isMobile ? (
          <MobilePalettesLayout hex={hex} palettes={palettes} />
        ) : (
          <DesktopPalettesLayout hex={hex} palettes={palettes} />
        )}
      </Layout>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { hex } = context.query;

  if (typeof hex !== "string" || !isValidHex(`#${hex}`)) {
    return { redirect: { destination: "/", permanent: false } };
  }

  const userAgent = context.req.headers["user-agent"] || "";
  const isMobile = getNativeWebDevice(userAgent) === "Mobile";

  // Generate all 24 palettes locally — no external API needed
  const palettes = generateAllPalettes(`#${hex}`);

  return { props: { isMobile, hex, palettes } };
};

export default Palettes;
