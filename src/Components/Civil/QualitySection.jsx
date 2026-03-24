// components/QualitySection.jsx

"use client";

import { useRef } from "react";
import { civilData } from "@/Data/civil";

export default function QualitySection() {
  const { heading, description, items } = civilData.quality;
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <section className="w-full bg-white py-s160 overflow-hidden">
      <div className=" mx-auto ">

        {/* Header */}
        <div className="text-center mb-s48 px-s24">
          <h2 className="civil-h2 text-main mb-s16">{heading}</h2>
          <p className="body-default text-secondary max-w-2xl mx-auto">
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
                  min-w-[85%] sm:min-w-[60%] mx-s16 lg:min-w-[30%]
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

                <p className="body-default text-secondary">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Arrows */}
          <div className="absolute -bottom-20 md:-bottom-30 right-s24 flex gap-4">
            <button
              onClick={scrollLeft}
            className="w-12 h-12 cursor-pointer heading-h3 pt-1 rounded-full bg-primary-main  flex items-center justify-center"

            >
              ‹
            </button>

            <button
              onClick={scrollRight}
        className="w-12 h-12 cursor-pointer  heading-h3 pt-1 rounded-full bg-primary-main  flex items-center justify-center"

            >
              ›
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}