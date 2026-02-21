"use client";

import Image from "next/image";
import Button from "./ui/Button";
import { homePage } from "../Data/homePage";

export default function VisionSection() {
  const { visionSection } = homePage;

  return (
    <section className="relative min-h-screen py-s104 md:py-s160 flex items-center justify-center text-center overflow-hidden">

      {/* Background Image */}
      <Image
        src={visionSection.backgroundImage}
        alt="Vision Background"
        fill
        className="object-cover"
        priority
      />

      {/* Overlay (optional light fade) */}

      {/* Content */}
      <div className="relative z-10 px-s24 max-w-4xl space-y-[80px] md:space-y-[250px] mx-auto">

        {/* Heading */}
   <div>
         <h1 className="heading-h3 text-main leading-tight mb-s32 md:mb-s104">
          {visionSection.heading.map((line, index) => (
            <span key={index} className="block">
              {line}
            </span>
          ))}
        </h1>
        <div className="">
          <Button>{visionSection.buttonText}</Button>
        </div>

   </div>
        {/* Button */}

        {/* Subheading */}
        <div>
        <h3 className="heading-h4 max-w-[150px] md:max-w-xl mx-auto text-main my-s40 md:mb-s48 tracking-wide">
          {visionSection.subHeading}
        </h3>

        {/* Stats */}
        <div className="flex flex-col sm:flex-row justify-center gap-s40">

          {visionSection.stats.map((stat) => (
            <div key={stat.id} className="flex flex-col items-center">

              <div className="
                w-28 h-28
                rounded-full
                border border-primary-light
                flex items-center justify-center
                mb-s16
              ">
                <span className="heading-h4 text-main">
                  {stat.value}
                </span>
              </div>

              <p className="body-default text-secondary">
                {stat.label}
              </p>

            </div>
          ))}
</div>
        </div>

      </div>

    </section>
  );
}
