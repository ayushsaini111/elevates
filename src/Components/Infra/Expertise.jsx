"use client";

import Image from "next/image";
import { infraData } from "@/Data/infra";

export default function Expertise() {
  const { expertise } = infraData;

  return (
    <section className="w-full px-s16 py-s40 ">
      <div className="max-w-7xl mx-auto space-y-s80 md:space-y-s160">

        {/* Top */}
        <div className="flex justify-between gap-s16 ">
          <h2 className="infra-h2 max-w-xs">
            {expertise.title}
          </h2>

          <p className="heading-h6 text-right max-w-xs ">
            {expertise.description}
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 px-s6 lg:grid-cols-4 gap-s40">

          {expertise.items.map((item, i) => {
  const isEven = i % 2 === 0;

  return (
    <div key={i} className="flex flex-col gap-s16">

      {/* Image */}
      <div
        className={`
          h-[459px] rounded-r32 overflow-hidden
          order-1 
          ${!isEven ? "lg:order-2" : "lg:order-1"}
        `}
      >
        <Image
          src={item.image}
          alt={item.title}
          width={400}
          height={400}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Text */}
      <div
        className={`
          order-2 space-y-s8 px-s16
          ${!isEven ? "lg:order-1" : "lg:order-2"}
        `}
      >
        <h3 className="infra-bold-h5  text-main">
          {item.title}
        </h3>
        <p className="body-default text-secondary ">
          {item.description}
        </p>
      </div>

    </div>
  );
})}

        </div>
      </div>
    </section>
  );
}