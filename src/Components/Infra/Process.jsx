"use client";

import Image from "next/image";
import { infraData } from "@/Data/infra";

export default function Process() {
  const { process } = infraData;

  return (
    <section className="w-full  ">
      <div className=" absolute z-40 w-full mx-auto text-center mt-s80 md:px-0 space-y-s24">

        {/* Heading */}
        <h2 className="infra-h2  md:mb-s24">
          {process.title}
        </h2>

        <p className="heading-h6  max-w-md mx-auto mb-s40 md:mb-s64">
          {process.description}
        </p>

      </div>
        {/* Image Wrapper */}
        <div className="relative w-full overflow-hidden">

          {/* Image */}
          <Image
            src={process.image}
            alt="process"
            width={1400}
            height={800}
            className="
              w-full 
              h-[620px] sm:h-[700px] md:h-[800px] lg:h-screen 
              object-cover
            "
          />

          {/* Overlay Cards */}
          <div
            className="
              absolute 
              bottom-12  
              left-1/2 -translate-x-1/2 
              w-full
            "
          >
            <div
              className="
                flex sm:gap-s32  md:gap-s24 
                overflow-x-auto md:overflow-visible 
                hide-scrollbar 
                md:justify-center 
              "
            >

              {process.steps.map((step, i) => (
                <div
                  key={i}
                  className="
                    min-w-[200px] sm:min-w-[220px] md:min-w-[216px]
                    max-w-[220px]
                    bg-background/90 backdrop-blur-md 
                    rounded-r32 
                    p-s16 text-left shadow-lg
                    shrink-0 mx-s16 sm:mx-s16
                  "
                >
                  <p className="heading-h6 px-s8">
                    {step.id}
                  </p>

                  <p className={`heading-h6 mt-1 px-s8 ${step.color}`}>
                    {step.title}
                  </p>

                  <p className="caption text-secondary mt-2 px-s8 leading-relaxed">
                    <span className="body-default">
                      {step.prefix}
                    </span>{" "}
                    <span className={`${step.color} font-medium`}>
                      <span className="heading-h6">
                        {step.highlight}
                      </span>
                    </span>{" "}
                    <span className="body-default">
                      {step.suffix}
                    </span>
                  </p>
                </div>
              ))}

            </div>
          </div>

        </div>
    </section>
  );
}