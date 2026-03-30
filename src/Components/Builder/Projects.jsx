"use client";

import Image from "next/image";
import { useState } from "react";
import { builderData } from "@/Data/builder";

export default function Projects() {
  const { projects } = builderData;

  const [activeTab, setActiveTab] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const currentTab = projects.tabs[activeTab];
  const currentImage = currentTab.images[activeIndex];

  return (
    <section className="w-full px-s16 sm:px-s24 lg:px-s32 py-s80">
      <div className="max-w-5xl mx-auto space-y-s64">

        {/* Heading */}
        <div className="text-center mx-auto space-y-s16">
          <h2 className="builder-h2 uppercase leading-tight">{projects.title1}</h2>
          <h2 className="builder-h2 uppercase leading-tight">{projects.title2}</h2>
          <h2 className="builder-h2 uppercase leading-tight">{projects.title3}</h2>
          <p className="heading-h5 text-secondary max-w-lg mx-auto mt-s32">
            {projects.subtitle}
          </p>
        </div>

        {/* Layout */}
        <div className="flex flex-col lg:flex-row items-center gap-s40">

          {/* LEFT — thumbnails */}
          <div className="
            order-3 lg:order-1
            flex lg:flex-col gap-s16 w-full lg:w-auto 
            overflow-x-auto lg:overflow-x-visible lg:overflow-y-auto 
            lg:max-h-[520px] p-s8 hide-scrollbar flex-shrink-0
          ">
            {currentTab.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`
                  relative flex-shrink-0
                  w-[100px] h-[80px]
                  sm:w-[150px] sm:h-[110px]
                  lg:w-[160px] lg:h-[140px]
                  rounded-r16 md:rounded-r32 overflow-hidden border-3 transition-all duration-200
                  ${activeIndex === i
                    ? "border-primary-main scale-105 shadow-md"
                    : "border-transparent opacity-90 hover:opacity-100"
                  }
                `}
              >
                <Image
                  src={img}
                  alt={`thumb-${i}`}
                  fill
                  sizes="120px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>

          {/* DOTS — now visible on mobile */}
          <div className="
            order-2 lg:order-2
            flex lg:flex-col flex-row items-center justify-center gap-s8 flex-shrink-0
          ">
            {currentTab.images.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`
                  rounded-full transition-all duration-200
                  ${activeIndex === i
                    ? "w-2.5 h-2.5 bg-primary-main"
                    : "w-2 h-2 bg-secondary-main opacity-40 hover:opacity-70"
                  }
                `}
              />
            ))}
          </div>

          {/* MAIN IMAGE */}
          <div className="
            order-1 lg:order-3
            relative w-full lg:flex-1 
            h-[280px] sm:h-[400px] lg:h-[520px] 
            rounded-r24 overflow-hidden shadow-xl flex-shrink-0
          ">
            <Image
              key={currentImage}
              src={currentImage}
              alt="project"
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover transition-all duration-500"
            />
          </div>

        </div>

        {/* TAB SWITCH */}
        <div className="flex justify-center">
          <div className="flex bg-secondary-light rounded-full p-s6">
            {projects.tabs.map((tab, i) => (
              <button
                key={i}
                onClick={() => {
                  setActiveTab(i);
                  setActiveIndex(0);
                }}
                className={`
                  px-s16 py-s8 rounded-full caption transition-all duration-200
                  ${activeTab === i
                    ? "bg-gradient-to-r from-primary-main to-primary-light text-white"
                    : "text-secondary hover:text-main"
                  }
                `}
              >
                {tab.name}
              </button>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}