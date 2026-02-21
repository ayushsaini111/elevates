"use client";

import { homePage } from "../Data/homePage";
import { useRef } from "react";

export default function VirtualTourSection() {
  const { virtualTourSection } = homePage;
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -280, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 280, behavior: "smooth" });
  };

  return (
    <section className=" pl-s32 md:pl-s64  xl:px-0 py-s160 bg-secondary-light">

      {/* Constrained Heading */}
      <div className="max-w-7xl mx-auto pr-s24">
        <h2 className="heading-h2 text-main  ">
          {virtualTourSection.heading1}
        </h2>
        <h2 className="heading-h2 text-main  ">
          {virtualTourSection.heading2}
        </h2>
      <div className="body-default text-secondary mb-s48">{virtualTourSection.description}</div>
      </div>

      {/* FULL WIDTH SLIDER */}
      <div className="relative">

        <div
          ref={scrollRef}
          className="
            flex gap-s32 overflow-x-auto 
            scroll-smooth hide-scrollbar
            pl-[calc((100vw-1280px)/2+24px)]
          "
        >
          {virtualTourSection.tours.map((tour) => (
            <div
              key={tour.id}
              className="
                min-w-[250px] md:min-w-[340px]
                md:h-[600px]
                rounded-r32
                overflow-hidden
                shadow-sm
                group
              "
            >
              <video
                src={tour.video}
                poster={tour.thumbnail}
                className="
                  w-full h-full object-cover
                  transition-transform duration-500
                  group-hover:scale-105
                "
                autoPlay
                muted
                loop
                playsInline
              />
            </div>
          ))}
        </div>

        {/* Arrows */}
        <div className="absolute -bottom-30 right-s40 flex gap-4">
          <button
            onClick={scrollLeft}
            className="w-12 h-12 heading-h3 pt-1 rounded-full bg-primary-light text-white flex items-center justify-center"
          >
            ‹
          </button>
          <button
            onClick={scrollRight}
            className="w-12 h-12 heading-h3 pt-1 rounded-full bg-primary-light text-white flex items-center justify-center"
          >
            ›
          </button>
        </div>

      </div>
    </section>
  );
}
