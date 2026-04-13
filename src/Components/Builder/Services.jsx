"use client";

import Image from "next/image";
import { useState } from "react";
import { builderData } from "@/Data/builder";

export default function Services() {
  const { services } = builderData;

  const [activeCategory, setActiveCategory] = useState(0);
  const [activeItem, setActiveItem] = useState(0);

  const category = services.categories[activeCategory];
  const currentImage = category.items?.[activeItem]?.image || category.image;

  return (
    <section className="w-full  pb-s40">
      <div className="max-w-5xl mx-auto space-y-s64">

        {/* Heading */}
        <div className="text-center mx-auto space-y-s16 px-s32">
          <h2 className="builder-h2">{services.title}</h2>
          <p className="heading-h5 text-secondary max-w-lg mx-auto">{services.subtitle}</p>
        </div>

        {/* Layout */}
        <div className="flex flex-col lg:flex-row gap-s40 lg:gap-s104 sm:px-s32">

          {/* IMAGE */}
         
           <div className="order-1  lg:order-2 relative w-[320px] mx-auto sm:w-full lg:flex-1 h-[400px] sm:h-[420px] lg:h-[520px] rounded-[var(--radius-r24)] overflow-hidden"
            style={{ boxShadow: "-4px 4px 4px 0 rgba(0,0,0,0.25)" }}
          >
            <Image
              key={currentImage}
              src={currentImage}
              alt="service"
              fill
              priority
              className="object-cover transition-all duration-500 ease-in-out"
            />
         
         </div>

          {/* BUTTONS */}
          <div className="order-2  lg:order-1  flex flex-col items-center lg:items-start w-full lg:w-[320px] gap-s16">

            {/* MOBILE: sub-items horizontal scroll row — shown only on mobile */}
            <div className="flex pl-s32 lg:hidden w-full overflow-x-auto hide-scrollbar gap-s8 pb-s4">
              {services.categories[activeCategory].items?.map((item, i) => (
                <button
                  key={i}
                  onClick={() => setActiveItem(i)}
                  className={`text-xs shrink-0 cursor-pointer inline-flex items-center justify-center px-s16 py-s16 rounded-[var(--radius-r40)] transition-all
                    ${activeItem === i ? "bg-[var(--secondary-main)]" : "bg-[var(--secondary-light)]"}`}
                >
                  {item.name}
                </button>
              ))}
            </div>

            {/* INTERIOR BUTTON */}
            <button
              onClick={() => { setActiveCategory(0); setActiveItem(0); }}
              className={`max-w-[320px] shadow-xs shadow-gray-500 cursor-pointer w-full px-s24 py-s16 rounded-full text-sm transition-all
                ${activeCategory === 0
                  ? "bg-gradient-to-r from-[var(--primary-main)] to-[var(--primary-light)] text-white shadow-lg"
                  : "bg-[var(--secondary-light)] text-[var(--text-main)]"}`}
            >
              {services.categories[0].name}
            </button>

            {/* INTERIOR ITEMS — desktop only */}
            <div
              className={`hidden lg:flex flex-col gap-s8 w-full items-end overflow-hidden transition-all duration-350 ease-in-out
                ${activeCategory === 0 ? "max-h-[400px] opacity-100 mt-s8 mb-s8" : "max-h-0 opacity-0 mt-0 mb-0"}`}
            >
              {services.categories[0].items?.map((item, i) => (
                <button
                  key={i}
                  onClick={() => setActiveItem(i)}
                  className={`text-xs sm:text-sm max-w-[180px] cursor-pointer inline-flex items-center justify-center px-s24 py-s8 rounded-[var(--radius-r40)] transition-all
                    ${activeItem === i ? "bg-[var(--secondary-main)]" : "bg-[var(--secondary-light)]"}`}
                >
                  {item.name}
                </button>
              ))}
            </div>

            {/* EXTERIOR BUTTON */}
            <button
              onClick={() => { setActiveCategory(1); setActiveItem(0); }}
              className={`max-w-[320px] shadow-xs shadow-gray-500 cursor-pointer w-full px-s24 py-s16 rounded-full text-sm transition-all
                ${activeCategory === 1
                  ? "bg-gradient-to-r from-[var(--primary-main)] to-[var(--primary-light)] text-white shadow-lg"
                  : "bg-[var(--secondary-light)] text-[var(--text-main)]"}`}
            >
              {services.categories[1].name}
            </button>

            {/* EXTERIOR ITEMS — desktop only */}
            <div
              className={`hidden lg:flex flex-col gap-s8 w-full items-end overflow-hidden transition-all duration-350 ease-in-out
                ${activeCategory === 1 ? "max-h-[400px] opacity-100 mt-s8 mb-s8" : "max-h-0 opacity-0 mt-0 mb-0"}`}
            >
              {services.categories[1].items?.map((item, i) => (
                <button
                  key={i}
                  onClick={() => setActiveItem(i)}
                  className={`text-xs sm:text-sm max-w-[180px] cursor-pointer inline-flex items-center justify-center px-s24 py-s8 rounded-[var(--radius-r40)] transition-all
                    ${activeItem === i ? "bg-[var(--secondary-main)]" : "bg-[var(--secondary-light)]"}`}
                >
                  {item.name}
                </button>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}