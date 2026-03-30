"use client";

import Image from "next/image";
import { infraData } from "@/Data/infra";

export default function Hero() {
  const { hero } = infraData;

  return (
    <section className="relative w-full h-screen overflow-hidden pt-s80 md:py-s160">

      {/* BACKGROUND IMAGE */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={hero.backgroundImage}
          alt="background"
          fill
          priority
          className="object-cover opacity-40"
        />
      </div>

      {/* CONTENT */}
      <div className="max-w-5xl mx-auto text-center px-s16 space-y-s24 mt-s64 md:mt-s8">

        <h1 className="infra-h1 leading-tight max-w-3xl mx-auto ">
          {hero.title}
        </h1>

        <p className="heading-h4  ">
            <span className="underline infra-h5 p-s6">{hero.subtitle1}</span> <span className="text-primary-main">.</span>    
            <span className="underline infra-h5 p-s6 " >{hero.subtitle2} </span><span className="text-primary-main">.</span>
            <span className="underline infra-h5 p-s6">{hero.subtitle3}</span>
          
        </p>

      </div>

      {/* FOREGROUND IMAGE */}
      <div className="max-w-5xl mx-auto mt-s64 px-s16">
        <div className="relative w-full h-[160px] sm:h-[220px] md:h-[300px] lg:h-[360px]">

          <Image
            src={hero.foregroundImage}
            alt="pattern"
            fill
            className="object-cover "
          />

        </div>
      </div>

    </section>
  );
}