// components/ConstructionProcess.jsx

"use client";

import Image from "next/image";
import { civilData } from "@/Data/civil";

export default function ConstructionProcess() {
  const { title, note, steps, image } = civilData.process;

  return (
    <section className="w-full bg-white  pt-s104 md:px-s32 lg:px-0 md:pt-s160 overflow-hidden">
      <div className="relative w-full max-w-7xl mx-auto px-s16 sm:px-s24">

        {/* Heading */}
        <div className="flex relative flex-col lg:flex-row justify-between px-s16 items-start gap-s24 mb-s40">
          
          <h2 className="civil-h1 text-main leading-tight">
            {title.split(" ").map((word, i) => (
              <span key={i} className="block">
                {word}
              </span>
            ))}
          </h2>

          <p className="body-default sm:absolute bottom-0 right-0 text-secondary max-w-sm text-left lg:text-right">
            {note}
          </p>
        </div>

        {/* Main */}
        <div className="relative">

          {/* Image */}
          <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[800px]">
            <Image
              src={image}
              alt="construction process"
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Steps (FIXED RESPONSIVE) */}
         <div
  className="
    mt-s40
    flex flex-col items-center   /* center whole block */
    
    md:absolute md:right-s24 md:bottom-s24

    w-full md:w-[320px] lg:w-[380px]
    space-y-s8 lg:space-y-s16
  "
>
  {/* inner wrapper to control alignment */}
  <div className="w-fit text-left">
    {steps.map((step, i) => (
      <div key={i} className="flex items-start gap-s16 space-y-s8">
        
        {/* Number */}
        <div className="min-w-[32px] h-[32px] rounded-full bg-primary-main text-on-primary flex items-center justify-center caption">
          {String(i + 1).padStart(2, "0")}
        </div>

        {/* Text */}
        <p className="body-default text-main">
          {step}
        </p>

      </div>
    ))}
  </div>
</div>

        </div>

      </div>
    </section>
  );
}