import React from "react";
import { getNativeWebDevice } from "@/utils/formatting/render";
import DesktopPalettesLayout from "@/layouts/PalettesLayouts/Desktop";
import MobilePalettesLayout from "@/layouts/PalettesLayouts/Mobile";
import Layout from "@/layouts/Layout";
import HtmlHead from "@/components/HtmlHead";
import { getPalettes } from "@/data/api/colors";

interface Props {
  isMobile: boolean;
  hex: any;
  palettes: any;
}

function Palettes(props: Props) {
  const {
    isMobile,
    hex,
    palettes
  } = props;

  return (
    <>
      <HtmlHead 
        title="Color Palette Generator"
      />
      <Layout isMobile={isMobile}>
        {isMobile ? (
          <MobilePalettesLayout />
        ) : (
          <DesktopPalettesLayout 
            hex={hex}
            palettes={palettes}
          />
        )}
      </Layout>
    </>
  );
}

export async function getServerSideProps(context: any) {
  const { hex } = context.query;

  const isValidHex = typeof hex === 'string' && /^#[0-9A-Fa-f]{6}$/.test(`#${hex}`);
  if (!isValidHex) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const userAgent = context.req.headers["user-agent"] || "";
  const deviceType = getNativeWebDevice(userAgent);

  const [triad, analogic, complement, analogicComplement, monochrome, monochromeDark, monochromeLight, quad] = await Promise.all([
    getPalettes(hex, 'triad'),
    getPalettes(hex, 'analogic'),
    getPalettes(hex, 'complement'),
    getPalettes(hex, 'analogic-complement'),
    getPalettes(hex, 'monochrome'),
    getPalettes(hex, 'monochrome-dark'),
    getPalettes(hex, 'monochrome-light'),
    getPalettes(hex, 'quad'),
  ]);

  const props: Props = {
    isMobile: deviceType === "Mobile",
    hex,
    palettes: {
      triad: triad?.body,
      analogic: analogic?.body,
      complement: complement?.body,
      analogicComplement: analogicComplement?.body,
      monochrome: monochrome?.body,
      monochromeDark: monochromeDark?.body,
      monochromeLight: monochromeLight?.body,
      quad: quad?.body,
    },
  };

  return { props };
}

export default Palettes;
