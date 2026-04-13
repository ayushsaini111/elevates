// components/QualitySection.jsx

"use client";

import { useRef } from "react";
import { civilData } from "@/Data/civil";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function QualitySection() {
  const { heading, description, items } = civilData.quality;
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -360, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 360, behavior: "smooth" });
  };

  return (
    <section className="w-full bg-white py-s80 md:py-s160 overflow-hidden">
      <div className=" mx-auto space-y-s64 md:space-y-s104">

        {/* Header */}
        <div className="text-center  space-y-s24 px-s32">
          <h2 className="civil-h2 text-main ">{heading}</h2>
          <p className="heading-h6 text-secondary max-w-xl mx-auto">
            {description}
          </p>
        </div>

        {/* Slider */}
        <div className="relative  ">

          <div
            ref={scrollRef}
            className="
              flex  overflow-x-auto
              hide-scrollbar scroll-smooth
              pl-[calc((100vw-1280px)/2+24px)]
            "
          >
            {items.map((item, i) => (
              <div
                key={i}
                className="
                  min-w-[90%] sm:min-w-[45%] mx-[18px] lg:min-w-[25%]
                  bg-secondary-light rounded-r24 p-s24
                  flex flex-col gap-s16
                "
              >
                {/* ✅ SVG from data */}
                <div
                  className="w-12 h-12"
                  dangerouslySetInnerHTML={{ __html: item.icon }}
                />

                <h4 className="heading-h5 text-main">
                  {item.title}
                </h4>

                <p className="caption text-secondary">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Arrows */}
          <div className="absolute -bottom-20 md:-bottom-30 right-s24 flex gap-4">
            <button
              onClick={scrollLeft}
            className="w-12 h-12 cursor-pointer heading-h3  rounded-full bg-primary-main  flex items-center justify-center"

            >
              <ChevronLeft size={24} />
            </button>

            <button
              onClick={scrollRight}
        className="w-12 h-12 cursor-pointer  heading-h3  rounded-full bg-primary-main  flex items-center justify-center"

            >
              <ChevronRight size={24} />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}