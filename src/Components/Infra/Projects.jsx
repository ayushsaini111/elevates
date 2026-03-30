"use client";

import Image from "next/image";
import { useState } from "react";
import { infraData } from "@/Data/infra";

export default function Projects() {
  const { projects } = infraData;

  const [activeIndex, setActiveIndex] = useState(0);
  const currentImage = projects.images[activeIndex];

  return (
    <section className="w-full py-s80 ">
      <div className="max-w-5xl mx-auto space-y-s80 text-center px-s16 ms:px-0">

        {/* Heading */}
        <div className="space-y-s16 px-s8">
          <h2 className="infra-h2">
            {projects.title}
          </h2>

          <p className="heading-h6  max-w-lg mx-auto">
            {projects.subtitle}
          </p>
        </div>

        {/* MAIN IMAGE */}
        <div className="relative w-full h-[260px] sm:h-[400px] lg:h-[520px]  rounded-r24 md:rounded-r32 overflow-hidden shadow-xl">
          <Image
            key={currentImage}
            src={currentImage}
            alt="project"
            fill
            priority
            className="object-cover transition-all duration-500 "
          />
        </div>



      </div>
        {/* DOTS */}
        <div className="flex justify-center gap-2 mt-s56">
          {projects.images.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`rounded-full transition-all duration-200 ${
                activeIndex === i
                  ? "w-2.5 h-2.5 bg-primary-main"
                  : "w-2 h-2 bg-secondary-main opacity-40"
              }`}
            />
          ))}
        </div>
{/* THUMBNAILS */}
<div className="w-full mt-s16 ">
 
  <div
  className="
    flex gap-s16 overflow-x-auto hide-scrollbar
    pl-[max(16px,calc((100vw-64rem)/2))]
    pr-s16 py-s32
    items-end
  "
>
  
    {projects.images.map((img, i) => (
      <button
        key={i}
        onClick={() => setActiveIndex(i)}
      className={`
  relative flex-shrink-0
  w-[120px] h-[90px]
  lg:w-[140px] lg:h-[100px]
  rounded-r16 overflow-hidden
  transition-all duration-300 ease-out
  snap-start

  ${
    activeIndex === i
      ? "ring-2 ring-primary-main -translate-y-1 scale-105 z-10"
      : "translate-y-2 scale-[0.96] opacity-80 hover:opacity-100"
  }
`}
      >
        <Image
          src={img}
          alt={`thumb-${i}`}
          fill
          sizes="120px"
          className="object-cover"
        />
      </button>
    ))}
  </div>
</div>
    </section>
  );
}