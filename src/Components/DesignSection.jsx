"use client";

import Image from "next/image";
import Button from "./ui/Button";
import { homePage } from "../Data/homePage";

export default function DesignSection() {
  const { designSection } = homePage;

  return (
    <section className="relative ">

      {/* ================= MOBILE LAYOUT ================= */}
      <div className="xl:hidden flex flex-col items-center text-center px-s24 py-s80 gap-s40">

        {/* Top Image */}
        <div className="w-full relative rotate-90 h-[350px] md:h-[800px]">
          <Image
            src={designSection.image}
            alt="Floor Plan"
            fill
            className="object-contain"
          />
        </div>

        {/* Content */}
        <div className="max-w-xl">
          <h2 className="heading-h2 text-main mb-s24">
            {designSection.heading}
          </h2>

          <p className="body-default text-secondary">
            {designSection.description1}
          </p>
          <p className="body-default text-secondary mb-s32">
            {designSection.description2}
          </p>

          <Button variant="secondary">
            {designSection.buttonText}
          </Button>
        </div>

        {/* Bottom Image (flipped) */}
        <div className="w-full relative rotate-90 h-[350px] md:h-[800px]">
          <Image
            src={designSection.image}
            alt="Floor Plan Flipped"
            fill
            className="object-contain scale-x-[-1]"
          />
        </div>

      </div>

      {/* ================= DESKTOP LAYOUT ================= */}
      <div className="hidden xl:block relative h-screen overflow-hidden px-s32">

        {/* Left Image */}
        <div className="absolute left-10 top-0 h-full w-[25%] opacity-40">
          <Image
            src={designSection.image}
            alt="Floor Plan"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Right Image */}
        <div className="absolute right-10 top-0 h-full w-[25%] opacity-40">
          <Image
            src={designSection.image}
            alt="Floor Plan Flipped"
            fill
            className="object-contain scale-x-[-1]"
          />
        </div>

        {/* Center Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center max-w-2xl mx-auto px-s24">

          <h2 className="heading-h2 text-main mb-s24">
            {designSection.heading}
          </h2>

          <p className="body-default text-secondary">
            {designSection.description1}
          </p>
          <p className="body-default text-secondary mb-s32">
            {designSection.description2}
          </p>

          <Button variant="secondary">
            {designSection.buttonText}
          </Button>

        </div>
      </div>

    </section>
  );
}
