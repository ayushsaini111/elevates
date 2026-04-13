"use client";
import { useState } from "react";
import Image from "next/image";
import { builderData } from "@/Data/builder";
import Button from "../ui/Button";
import ContactModal from "../ContactModal";

export default function CTASection() {
  const { cta } = builderData;
   const [show, setShow] = useState(false);

  return (
    <section className="w-full px-s16 sm:px-s24 lg:px-s32 py-s80">
      
      <div className="relative  mx-auto rounded-r32 overflow-hidden">

        {/* 🔥 BACKGROUND IMAGE */}
        <div className="relative w-full h-screen ">
          <Image
            src={cta.image}
            alt={cta.alt}
            fill
            priority
            className="object-cover "
          />
        </div>

        {/* 🔥 DARK + GOLD OVERLAY */}
        <div className="absolute inset-0 " />

        {/* 🔥 CONTENT */}
        <div className="absolute inset-x-0 bottom-10 md:bottom-20 flex flex-col items-center justify-center text-center px-s16">

          {/* TITLE */}
          <h2 className="text-white font-semibold">
            <span className="block builder-h2 ">
              {cta.title1}
            </span>
            <span className="blockt builder-h2  ">
              {cta.title2}
            </span>
          </h2>

          {/* SUBTITLE */}
          <p className="text-white/90 mt-s16 text-[clamp(0.9rem,2vw,1.2rem)] max-w-xl">
            {cta.subtitle}
          </p>

          {/* BUTTON */}
          <div className="mt-s24">
            <Button
             onClick={() => setShow(true)}
              className="bg-primary-main text-white px-s24 py-s10 rounded-full text-sm hover:opacity-90 transition-all"
            >
              {cta.ctaText}
            </Button>
          </div>
        </div>
      </div>
            <ContactModal isOpen={show} onClose={() => setShow(false)} />

    </section>
  );
}