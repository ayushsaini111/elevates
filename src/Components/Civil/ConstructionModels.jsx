// components/ConstructionModels.jsx

"use client";

import Image from "next/image";
import { civilData } from "@/Data/civil";

export default function ConstructionModels() {
  const { tag, labour, turnkey } = civilData.models;

  return (
    <section className="w-full bg-white py-s104 md:py-s160">
      <div className="w-full">

        {/* Tag */}
        <div className="mb-s64 md:mb-s80 px-s16 sm:px-s48 lg:pl-s104">
          <span className="bg-foreground text-background px-s16 py-s8 caption ">
            {tag}
          </span>
        </div>

        <div className="space-y-s104 md:space-y-s160">

          {/* Block 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-s40 items-center">
            
            {/* Image FIRST on mobile */}
            <div className="flex justify-end order-1 lg:order-2">
              <div className="relative w-full  lg:w-[90%] h-[200px] sm:h-[320px] md:h-[380px] lg:h-[450px] lg:rounded-l-r24 overflow-hidden">
                <Image
                  src={labour.image}
                  alt="labour"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Text */}
            <div className="px-s16 sm:px-s48 lg:pl-s104 order-2 lg:order-1">
              <h3 className="civil-h2 text-main mb-s24">
                {labour.title}
              </h3>

              <ul className="space-y-s16">
                {labour.points.map((item, i) => (
                  <li key={i} className="body-default text-main">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Block 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-s40 items-center">
            
            {/* Image FIRST on mobile */}
            <div className="flex justify-start order-1">
              <div className="relative w-full lg:w-[90%] h-[200px] sm:h-[320px] md:h-[380px] lg:h-[420px] lg:rounded-r-r24 overflow-hidden">
                <Image
                  src={turnkey.image}
                  alt="turnkey"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Text */}
            <div className="px-s16 sm:px-s48 lg:pr-s80 order-2">
              <h3 className="civil-h2 text-main mb-s24">
                {turnkey.title}
              </h3>

              <ul className="space-y-s8">
                {turnkey.points.map((item, i) => (
                  <li key={i} className="body-default text-main">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}