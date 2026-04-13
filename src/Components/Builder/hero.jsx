"use client";
import { useState } from "react";
import Image from "next/image";
import { builderData } from "@/Data/builder";
import Button from "../ui/Button";
import ContactModal from "../ContactModal";

export default function BuilderHero() {
  const { hero } = builderData;
   const [show, setShow] = useState(false);

  return (
    <section className="w-full px-s16 sm:px-s24 lg:px-s40   py-s24 md:py-0  mt-s64 md:mt-s104">
      <div className="relative w-full mx-auto rounded-[var(--radius-r24)] overflow-hidden">
        
        {/* Background */}
        <div className="relative w-full h-[85vh] md:h-[100vh]">
          {hero.image && (
            <Image
              src={hero.image}
              alt={hero.alt || "builder hero"}
              fill
              priority
              className="object-cover"
            />
          )}
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 flex flex-col items-center text-center px-s16 sm:px-s24 pt-s32 sm:pt-s48 md:pt-s80">
          
          {/* Title */}
       <div className="hidden md:block max-w-4xl">
           <h1 className="builder-h1  ">
            {hero.title1}
          </h1>
          <h1 className="builder-h1 ">
            {hero.title2}
          </h1>
       </div>
       <div className="bloack md:hidden max-w-3xl">
           <h1 className="builder-h1  ">
            {hero.title1}{hero.title2}
          </h1>
          
       </div>

          {/* Subtitle */}
          <p className="heading-h5 mt-s16 sm:mt-s24  max-w-xs md:max-w-lg">
            {hero.subtitle}
          </p>

          {/* CTA */}
          <div className="mt-s24 sm:mt-s32">
            <Button children={hero.cta} onClick={() => setShow(true)}variant="builder" />
          </div>
        </div>
      </div>
            <ContactModal isOpen={show} onClose={() => setShow(false)} />

    </section>
  );
}