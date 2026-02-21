"use client";
import React from "react";

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden pt-[40px] md:pt-[85px]">

      {/* Video Wrapper */}
      <div className="relative w-full h-[calc(100vh-80px)] ">

        <video
          src="/Images/vid.mp4"
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        />

        {/* Optional Overlay */}
        <div className="absolute inset-0 bg-black/20" />

        {/* Content Example */}
        <div className="relative z-10 flex items-center mx-auto max-w-lg md:max-w-5xl justify-center h-full text-center px-s24">
          <h1 className="heading-h1 text-background">
            A Peaceful Journey from Land <span className="heading-h3 underline pb-2">to</span> Home
          </h1>
        </div>

      </div>
    </section>
  );
}
