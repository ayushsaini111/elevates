"use client";

import Image from "next/image";
import { useState } from "react";
import { builderData } from "@/Data/builder";

export default function Services() {
  const { services } = builderData;

  const [activeCategory, setActiveCategory] = useState(0);
  const [activeItem, setActiveItem] = useState(0);

  const category = services.categories[activeCategory];

  const currentImage =
    category.items?.[activeItem]?.image || category.image;

  return (
    <section className="w-full px-s16 sm:px-s24 lg:px-s32 py-s40">
      <div className="max-w-5xl mx-auto space-y-s64">

        {/* Heading */}
        <div className="text-center  mx-auto space-y-s16">
          <h2 className="builder-h2 ">
            {services.title}
          </h2>
          <p className="heading-h5 text-secondary  max-w-lg mx-auto">
            {services.subtitle}
          </p>
        </div>

        {/* Layout */}
       {/* Layout */}
<div className="flex flex-col lg:flex-row gap-s32 md:gap-s80">

  {/* 🔥 IMAGE (TOP ON MOBILE, RIGHT ON DESKTOP) */}
  <div className="order-1 lg:order-2 relative w-full drop-shadow-lg drop-shadow-gray-500 lg:flex-1 h-[320px] sm:h-[420px] lg:h-[520px] rounded-[var(--radius-r24)] overflow-hidden shadow-xl">
    <Image
      key={currentImage}
      src={currentImage}
      alt="service"
      fill
      priority
      className="object-cover transition-all duration-500 ease-in-out"
    />
  </div>

  {/* 🔥 LEFT (BUTTONS) */}
  <div className="order-2 lg:order-1 flex flex-col items-center lg:items-start w-full lg:w-[320px]">

    {/* INTERIOR */}
    <button
      onClick={() => {
        setActiveCategory(0);
        setActiveItem(0);
      }}
      className={`
        max-w-[320px] shadow-xs shadow-gray-500 cursor-pointer
        w-full px-s24 py-s16 rounded-full text-sm transition-all mb-s16
        ${
          activeCategory === 0
            ? "bg-gradient-to-r from-[var(--primary-main)] to-[var(--primary-light)] text-white shadow-lg"
            : "bg-[var(--secondary-light)] text-[var(--text-main)]"
        }
      `}
    >
      {services.categories[0].name}
    </button>

    {/* ITEMS */}
    <div className="flex flex-col gap-s8 w-full items-center lg:items-end">
      {category.items?.map((item, i) => (
        <button
          key={i}
          onClick={() => setActiveItem(i)}
          className={`
            text-xs sm:text-sm 
            max-w-[180px] cursor-pointer
            inline-flex items-center justify-center 
            px-s24 py-s8 
            rounded-[var(--radius-r40)]
            transition-all
            ${
              activeItem === i
                ? "bg-[var(--secondary-main)]"
                : "bg-[var(--secondary-light)] "
            }
          `}
        >
          {item.name}
        </button>
      ))}
    </div>

    {/* EXTERIOR */}
    <button
      onClick={() => {
        setActiveCategory(1);
        setActiveItem(0);
      }}
      className={`
        max-w-[320px] shadow-xs shadow-gray-500 cursor-pointer
        w-full px-s24 py-s16 rounded-full text-sm transition-all mt-s16
        ${
          activeCategory === 1
            ? "bg-gradient-to-r from-[var(--primary-main)] to-[var(--primary-light)] text-white shadow-lg"
            : "bg-[var(--secondary-light)] text-[var(--text-main)]"
        }
      `}
    >
      {services.categories[1].name}
    </button>
  </div>
</div>
      </div>
    </section>
  );
}