"use client";

import { infraData } from "@/Data/infra";

export default function Philosophy() {
  const { philosophy } = infraData;

  return (
    <section className="w-full py-s40 md:pt-s80 xl:pt-s160 flex items-center justify-center 

">
      <div className="max-w-5xl mx-auto text-center ">

        {/* Small Tagline */}
        <p className="caption text-secondary mx-auto  max-w-md px-s32 ">
          {philosophy.tagline}
        </p>

        {/* Main Heading */}
        <div className="relative h-[45vh] xl:h-[80vh]  flex items-center justify-center [background-image:radial-gradient(circle_at_center,rgba(0,74,173,0.45)_0%,rgba(0,74,173,0.35)_15%,rgba(0,74,173,0.11)_30%,transparent_55%)]">

          <h1 className="text-2xl md:text-6xl font-primary text-main text-center px-s24">
            {philosophy.heading}
          </h1>

        </div>

      </div>
    </section>
  );
}