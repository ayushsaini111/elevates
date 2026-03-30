"use client";

import { infraData } from "@/Data/infra";

export default function Philosophy() {
  const { philosophy } = infraData;

  return (
<section className="w-full py-s160 flex items-center justify-center 

[background-image:radial-gradient(circle_at_center,rgba(0,74,173,0.45)_0%,rgba(0,74,173,0.35)_15%,rgba(0,74,173,0.15)_30%,transparent_55%)]">
      <div className="max-w-5xl mx-auto text-center px-s32 space-y-s64 md:space-y-s104">
        
        {/* Small Tagline */}
        <p className="caption text-secondary mx-auto max-w-md ">
          {philosophy.tagline}
        </p>

        {/* Main Heading */}
        <h1 className="text-2xl md:text-6xl font-primary text-main leading-tight">
          {philosophy.heading}
        </h1>

      </div>
    </section>
  );
}