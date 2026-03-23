"use client";

import Image from "next/image";
import Button from "./ui/Button";
import { homePage } from "../Data/homePage";

export default function PrecisionSection() {
  const { precisionSection } = homePage;

  return (
    <section className="relative py-s80 md:py-0 overflow-hidden">

      {/* ================= MOBILE ================= */}
      <div className="lg:hidden px-s24 flex flex-col items-center text-center ">

        {/* Image */}
        <div className="w-full">
          <Image
            src={precisionSection.image}
            alt="Construction Crane"
            width={1200}
            height={1200}
            className="w-full h-auto object-contain scale-x-[-1]"
            priority
          />
        </div>

        {/* Content */}
        <div className="max-w-md sm:max-w-2xl">
          
          <h2 className="heading-h2 text-main mb-s24 leading-tight">
            {precisionSection.heading.map((line, index) => (
              <span key={index} className="block">
                {line}
              </span>
            ))}
          </h2>

          <p className="body-default text-secondary mb-s32">
            {precisionSection.description}
          </p>

          <Button variant="secondary"  as="link" href={"/civil"}>
            {precisionSection.buttonText}
          </Button>
        </div>

      </div>

      {/* ================= DESKTOP ================= */}
      <div className="hidden  lg:block relative w-full min-h-[700px] px-s40">

        {/* Crane Image */}
        <div className="relative w-[95%]">
          <Image
            src={precisionSection.image}
            alt="Construction Crane"
            width={1600}
            height={1600}
            className="w-full h-auto   object-contain scale-x-[-1] scale-y-120 translate-y-15 "
            priority
          />
        </div>

        {/* Content Positioned Freely */}
        <div className="
          absolute
          right-10
          top-113 2xl:top-1/2
          -translate-y-1/2
          w-[40%]
          max-w-xl
        ">
            <p className="text-primary-main body-default">Construction Services</p>

          <h2 className="heading-h2 text-main mb-s16 lg:mb-s24 leading-tight">

            {precisionSection.heading.map((line, index) => (
              <span key={index} className="block">
                {line}
              </span>
            ))}
          </h2>

          <p className="body-default max-w-xs text-secondary  text-main mb-s16 lg:mb-s32">
            {precisionSection.description}
          </p>

          <Button variant="secondary"  as="link" href={"/civil"}>
            {precisionSection.buttonText}
          </Button>

        </div>

      </div>

    </section>
  );
}
