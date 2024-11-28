import React, { useState } from 'react';
import { useRouter } from 'next/router';

function DesktopHomepageLayout(){
  const [hexCode, setHexCode] = useState<string>('#947fb4');
  const router = useRouter();

  const handleSubmit = () => {
    if (!/^#[0-9A-F]{6}$/i.test(hexCode)) {
      alert('Please enter a valid hex code!');
      return;
    }
    router.push(`/palettes?hex=${hexCode.slice(1)}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Pick Your Color</h1>
      <input
        type="color"
        value={hexCode}
        onChange={(e) => setHexCode(e.target.value)}
        className="w-20 h-20 mb-4"
      />
      <input
        type="text"
        value={hexCode}
        onChange={(e) => setHexCode(e.target.value)}
        placeholder="#947fb4"
        className="p-2 border rounded mb-4 text-center"
      />
      <button
        onClick={handleSubmit}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Get Palettes
      </button>
    </div>
  );
};

export default DesktopHomepageLayout;
