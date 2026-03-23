// components/ProjectsCarousel.jsx

"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { civilData } from "@/Data/civil";

export default function ProjectsCarousel() {
  const { title, subtitle, list } = civilData.projects;

  const containerRef = useRef(null);
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true); // control auto scroll

  // 🔁 Auto slide (stops permanently after user scroll)
  useEffect(() => {
    if (!auto) return;

    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % list.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [auto, list.length]);

  // 🎯 Center card
  const centerCard = (index) => {
    const container = containerRef.current;
    if (!container) return;

    const card = container.children[index];
    if (!card) return;

    const containerCenter = container.offsetWidth / 2;
    const cardCenter = card.offsetLeft + card.offsetWidth / 2;

    container.scrollTo({
      left: cardCenter - containerCenter,
      behavior: "smooth",
    });

    setActive(index);
  };

  // 📍 Center first card on load
  useEffect(() => {
    setTimeout(() => {
      centerCard(0);
    }, 100);
  }, []);

  // 🔄 Sync scroll → active index + stop auto
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (auto) setAuto(false); // ❌ stop auto forever

      const center = container.scrollLeft + container.offsetWidth / 2;

      let closest = 0;
      let minDist = Infinity;

      Array.from(container.children).forEach((child, i) => {
        const childCenter =
          child.offsetLeft + child.offsetWidth / 2;

        const dist = Math.abs(center - childCenter);

        if (dist < minDist) {
          minDist = dist;
          closest = i;
        }
      });

      setActive(closest);
    };

    container.addEventListener("scroll", handleScroll);

    return () => container.removeEventListener("scroll", handleScroll);
  }, [auto]);

  // 🎯 Auto center when active changes
  useEffect(() => {
    if (auto) centerCard(active);
  }, [active, auto]);

  return (
    <section className="w-full py-s104 lg:py-s160 bg-white">
      <div className="w-full">

        {/* Heading */}
        <div className="text-center space-y-s32 px-s16 sm:px-s24">
          <h2 className="civil-h1 text-main">{title}</h2>
          <p className="heading-h6 text-secondary  px-s8 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Carousel */}
        <div
          ref={containerRef}
          className="flex gap-s16 lg:gap-s16  overflow-x-auto hide-scrollbar scroll-smooth  pl-s24 md:pl-[10%] lg:pl-[25%] "
        >
          {list.map((item, i) => {
            const isActive = i === active;

            return (
              <div
                key={i}
                className={`
                  flex-shrink-0 transition-all duration-500 pt-s64
                  ${isActive ? "scale-100 opacity-100" : "scale-90 opacity-90"}
                  max-w-[95%] sm:min-w-[65%] lg:min-w-[80%]
                `}
              >
                {/* Image */}
                <div className="relative h-[260px] sm:h-[320px] md:h-[380px] lg:h-[460px] rounded-r24 overflow-hidden shadow-xl">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover "
                  />

                  <div className="absolute bottom-s16 right-s16 bg-black/60 text-white px-s16 py-s8 caption rounded-r8">
                    {item.title}
                  </div>
                </div>

                {/* Text */}
                <div className="mt-s24 px-s6 flex  flex-col md:flex-row md:justify-between md:items-center gap-s16">
                  <h4 className="heading-h5 text-main max-w-xs">
                    {item.title}
                  </h4>

                  <p className="body-default text-secondary max-w-xs">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dots */}
        <div className="flex justify-center mt-s24 gap-s8">
          {list.map((_, i) => (
            <div
              key={i}
              onClick={() => centerCard(i)}
              className={`
                cursor-pointer h-[6px] w-[6px] rounded-full transition-all
                ${i === active ? "bg-primary-main scale-125" : "bg-secondary"}
              `}
            />
          ))}
        </div>

      </div>
    </section>
  );
}