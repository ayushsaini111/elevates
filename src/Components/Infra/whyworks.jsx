"use client";

import { infraData } from "@/Data/infra";

export default function WhyWorkSection() {
  const { headingTop, headingBottom, description, points } =
    infraData.whyWorkSection;

  return (
    <section className=" bg-white space-y-s64 md:space-y-s104 overflow-hidden">

      {/* 🔵 TOP L */}
      <div className="mx-auto px-s32 xl:px-0 w-full max-w-4xl pointer-events-none">

        {/* vertical */}
        <div className="w-[40px] h-[120px] md:w-[60px] md:h-[180px] xl:w-[80px] xl:h-[220px] 
        bg-gradient-to-t from-primary-main to-transparent" />

        {/* horizontal */}
        <div className="h-[40px] md:h-[60px] xl:h-[80px] w-full 
        bg-gradient-to-r from-primary-main via-primary-light to-transparent" />

      </div>

      {/* CONTENT */}
      <div className="max-w-4xl mx-auto text-center ">

<div className="px-s32 xl:px-0">
          <h2 className="infra-h2 text-main uppercase">
          {headingTop}
        </h2>

        <h3 className="infra-h2 text-main uppercase">
          {headingBottom}
        </h3>

        <p className="heading-h6 mb-s64  mt-s24 md:mb-s80 max-w-xs md:max-w-md mx-auto">
          {description}
        </p>
</div>

        {/* ✅ RESPONSIVE GRID (important fix) */}
        <div className=" pl-s32 sm:px-s32 
  flex overflow-x-auto gap-s16 px-s16
  sm:grid sm:grid-cols-2 md:grid-cols-4
  scroll-smooth hide-scrollbar
">

          {points.map((item, index) => (
            <div
              key={index}
              className="
    flex-shrink-0
    w-[220px] sm:w-full max-w-[260px]
    
    p-s24
    bg-secondary-light 
    rounded-r40 
    body-default 
    text-center
  "
            >
              {item}
            </div>
          ))}

        </div>

      </div>

      {/* 🔵 BOTTOM L */}
      <div className="mx-auto w-full max-w-4xl pointer-events-none flex flex-col px-s32 xl:px-0 items-end">

        {/* horizontal */}
        <div className="h-[40px] md:h-[60px] xl:h-[80px] w-full 
        bg-gradient-to-l from-primary-main via-primary-light to-transparent" />

        {/* vertical */}
        <div className="w-[40px] h-[120px] md:w-[60px] md:h-[180px] xl:w-[80px] xl:h-[220px] 
        bg-gradient-to-b from-primary-main to-transparent" />

      </div>

    </section>
  );
}