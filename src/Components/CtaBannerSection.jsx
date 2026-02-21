"use client";

import Image from "next/image";
import Button from "./ui/Button";
import { homePage } from "../Data/homePage";

export default function CtaBannerSection() {
  const { ctaBannerSection } = homePage;

  return (
    <section className="py-s80 px-s32 md:px-s64  xl:px-0 md:py-s160 ">

      <div className="max-w-7xl mx-auto ">

        <div
          className="
            relative rounded-r32 overflow-hidden
            min-h-[500px]
            flex flex-col justify-between
          "
        >
          {/* Background Image */}
          <Image
            src={ctaBannerSection.backgroundImage}
            alt="CTA Background"
            fill
            className="object-cover scale-x-[-1]"
            priority
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/30" />

          {/* Content */}
          <div className="relative z-10 p-s40 text-white">

            <div className="grid md:grid-cols-2 gap-s32">

              {/* LEFT TEXT */}
              <div>
                <h2 className="heading-h1 leading-tight mb-s24">
                  {ctaBannerSection.heading.map((line, index) => (
                    <span key={index} className="block">
                      {line}
                    </span>
                  ))}
                </h2>

                <p className="body-default opacity-90 max-w-md">
                  {ctaBannerSection.description}
                </p>
              </div>

              {/* RIGHT SMALL TEXT */}
              <div className="hidden md:flex flex-col justify-center items-end text-right gap-2 opacity-90">
                {ctaBannerSection.sideText.map((line, index) => (
                  <p key={index} className="body-default">
                    {line}
                  </p>
                ))}
              </div>

            </div>

          </div>

          {/* Bottom CTA Bar */}
          <div className="
            relative z-10
            bg-secondary-main
            rounded-r32
            px-s24 md:px-s32 py-s24 md:py-s32 m-s32 md:m-s40
            flex flex-col md:flex-row
            justify-between items-center
            gap-s16
          ">

            <p className="text-white body-default max-w-[200px]">
              {ctaBannerSection.bottomText}
            </p>

            <Button variant="secondary" >
              {ctaBannerSection.buttonText}
            </Button>

          </div>

        </div>

      </div>

    </section>
  );
}
