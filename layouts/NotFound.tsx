import React from "react";

function NotFound(){

  return (
    <div className="max-w-[1440px] align-center mx-auto w-full xlfull:px-[16px] px-[120px]">
      <div className="w-full">
        <div className="flex flex-col items-center justify-center mx-auto my-[32px]">
          <h5 className="font-OSBold text-[24px] leading-[32px] tracking-[-0.01em] text-darkGreen mb-[12px]">Sayfa Bulunamadı</h5>
          <p className="text-[20px] leading-[28px] tracking-[-0.01em] text-[#475467] font-OSRegular mb-[12px]">Aradığınız sayfa bulunamadı.</p>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
