"use client";

import Image from "next/image";
import { civilData } from "@/Data/civil";

export default function Hero() {
  const { title, subtitle, image, alt } = civilData.hero;

  return (
    <section className="relative w-full bg-background lg:rounded-t-r24  lg:mt-s104 min-h-screen lg:min-h-[95vh] overflow-hidden">
      
      {/* Background Image */}
      <Image
        src={image}
        alt={alt}
        fill
        priority
        className="object-cover "
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="absolute bottom-20 md:bottom-20 md:left-20 flex items-center">
        <div className="max-w-7xl mx-auto px-4 w-full">
          
          <h1 className="text-white font-semibold leading-tight 
                          civil-h1 max-w-2xl">
            {title}
          </h1>

          <p className="mt-4 inline-block bg-yellow-500 text-black 
                        px-4 py-2  heading-h6">
            {subtitle}
          </p>

        </div>
      </div>
    </section>
  );
}