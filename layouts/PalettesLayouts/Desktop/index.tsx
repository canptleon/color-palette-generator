import React from "react";

interface Props {
  hex: string;
  palettes: any;
}

function DesktopPalettesLayout(props: Props) {
  const { hex, palettes } = props;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex flex-col items-center justify-center mb-20">
        <h1 className="text-2xl font-bold mb-4">Color Palettes for</h1>
        <div className="w-32 h-32 rounded shadow" style={{ backgroundColor: `#${hex}` }}/>
        <h1 className="text-2xl font-bold mt-4">#{hex}</h1>
      </div>

      {Object.entries(palettes).map(([mode, data]: [string, any], index: number) => (
        <div key={mode} className="mb-8">
          <h2 className="text-xl text-center mb-4 capitalize font-bold">{mode} Palette</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex flex-col items-center justify-center">
              <div
                className="w-32 h-32 rounded-[7px] shadow"
                style={{ backgroundColor: `#${hex}` }}
              >
              </div>
              <p>#{hex}</p>
            </div>
            {data.colors.map((color: any, index: number) => (
              <div key={index} className="flex flex-col items-center justify-center">
                <div
                  className="w-32 h-32 rounded-[7px] shadow"
                  style={{ backgroundColor: color.hex.value }}
                >
                </div>
                <p>{color.hex.value}</p>
              </div>
            ))}
          </div>
          {index < Object.entries(palettes).length - 1 && <hr className="my-8 border-gray-300" />}
        </div>
      ))}
    </div>
  );
}

export default DesktopPalettesLayout;
