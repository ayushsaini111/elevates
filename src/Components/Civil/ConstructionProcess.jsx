// components/ConstructionProcess.jsx

"use client";

import Image from "next/image";
import { civilData } from "@/Data/civil";

export default function ConstructionProcess() {
  const { title, note, steps, image } = civilData.process;

  return (
    <section className="w-full bg-white   lg:px-0 md:pt-s160 overflow-hidden">
      <div className="relative w-full max-w-7xl mx-auto  ">

        {/* Heading */}
        <div className="flex relative flex-col lg:flex-row justify-between px-s32 items-start gap-s16 ">

          <h2 className="civil-h1 text-main leading-tight">
            {title.split(" ").map((word, i) => (
              <span key={i} className="block">
                {word}
              </span>
            ))}
          </h2>

          <div className="flex justify-end w-full">
            <p className="heading-h6    text-secondary  max-w-[260px] sm:max-w-[320px] text-right">
            {note}
          </p>
          </div>
        </div>

        {/* Main */}
        <div className="relative">

          {/* Image */}
          <div className="relative w-full h-[570px] lg:h-[800px]">
            <Image
              src={image}
              alt="construction process"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Steps (FIXED RESPONSIVE) */}
          <div
            className="
    mt-s40
   absolute right-s24 bottom-0 md:bottom-s24

  w-[200px] lg:w-[380px]
    space-y-s8 lg:space-y-s16
  "
          >
            {/* inner wrapper to control alignment */}
            <div className="w-fit text-left">
              {steps.map((step, i) => (
                <div key={i} className="flex items-start gap-s16 space-y-s8">

                  <div className="flex justify-center items-center gap-s8 pb-s8">
                    {/* Number */}
                    <div className="min-w-[32px] h-[32px] rounded-full bg-primary-main text-on-primary flex items-center justify-center caption">
                      {String(i + 1).padStart(2, "0")}
                    </div>

                    {/* Text */}
                    <p className="body-default text-main">
                      {step}
                    </p>
                  </div>

                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}