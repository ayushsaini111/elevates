"use client";

import Image from "next/image";
import { builderData } from "@/Data/builder";

export default function Philosophy() {
  const { philosophy } = builderData;

  return (
    <section className="w-full px-s16 sm:px-s24 h-fit lg:px-s32 pt-s40 md:py-s160 ">
      <div className="max-w-7xl  mx-auto text-center flex flex-col items-center">
        
        {/* Heading (desktop split) */}
        <div className="absolute hidden  md:block ">
          <h2 className="builder-h3">{philosophy.title1}</h2>
          <h2 className="builder-h3 mt-s8">
            {philosophy.title2}
          </h2>
          <h2 className="builder-h3 mt-s8">
            {philosophy.title3}
          </h2>
        </div>

        {/* Heading (mobile single line) */}
        <div className="block md:hidden max-w-xs">
          <h2 className="builder-h3">
            {philosophy.title1} {philosophy.title2} {philosophy.title3}
          </h2>
        </div>

        {/* Image */}
        <div className="relative bottom-20 sm:bottom-40 max-h-[780px] w-full max-w-[1280px] sm:mt-s40">
          <Image
            src={philosophy.image}
            alt={philosophy.alt}
            width={600}
            height={400}
            
            className="w-full h-auto object-contain"
          />
        {/* Curved subtitle */}
        <p className="xl:hidden block  text-secondary -translate-y-15 caption px-s24">
          {philosophy.subtitle1}{philosophy.subtitle2}
        </p>
      
        <p className="hidden xl:block lg:absolute lg:-bottom-25 lg:translate-x-45 lg:rotate-9  sm:mt-s32 text-secondary heading-h5">
          {philosophy.subtitle1}
        </p>
        <p className="hidden xl:block lg:absolute lg:-bottom-28 lg:right-38 lg:-rotate-16   sm:mt-s32 text-secondary  heading-h5 ">
          {philosophy.subtitle2}
        </p>
        </div>

      </div>
    </section>
  );
}