"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { builderData } from "@/Data/builder";

export default function Process() {
    const { processData } = builderData;

    const [active, setActive] = useState(0);
    const [direction, setDirection] = useState("down"); // 🔥 for animation
    const sectionRef = useRef(null);
    const isScrolling = useRef(false);

    const current = processData.steps[active];

    // 🔥 SMOOTH SCROLL (GLIDE EFFECT)
    useEffect(() => {
        const el = sectionRef.current;

        const handleWheel = (e) => {
            if (isScrolling.current) return;

            isScrolling.current = true;

            if (e.deltaY > 0) {
                setDirection("down");
                setActive((prev) =>
                    prev < processData.steps.length - 1 ? prev + 1 : prev
                );
            } else {
                setDirection("up");
                setActive((prev) => (prev > 0 ? prev - 1 : prev));
            }

            setTimeout(() => {
                isScrolling.current = false;
            }, 700);
        };

        el?.addEventListener("wheel", handleWheel);

        return () => el?.removeEventListener("wheel", handleWheel);
    }, []);

    return (
        <section
            ref={sectionRef}
            className="w-full px-s16 sm:px-s24 lg:px-s32 py-s40"
        >
            <div className="max-w-5xl mx-auto space-y-s40 sm:space-y-s56">

                {/* 🔥 HEADER */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-s16 text-center sm:text-right">

                    <div className="relative w-[140px] sm:w-[200px] lg:w-[260px]">
                        <Image
                            src={processData.header.image}
                            alt="design"
                            width={260}
                            height={140}
                            className="object-contain"
                        />
                    </div>

                    <p className="heading-h6 text-secondary max-w-xs sm:max-w-sm lg:max-w-md">
                        {processData.header.description}
                    </p>
                </div>

                {/* 🔥 MAIN */}
                <div className="flex flex-col lg:flex-row items-center gap-s32 lg:gap-s24">

                    {/* LEFT */}
                    <div className="flex-1 space-y-s24 text-center lg:text-left">

                        {/* BIG TEXT */}
                        <div>
                            <div className="flex items-center justify-center lg:justify-start gap-s8">

                                {/* NUMBER */}
                                <div className="w-[60px] h-[60px] sm:w-[90px] sm:h-[90px] md:w-[120px] md:h-[120px] lg:w-[150px] lg:h-[150px] bg-black text-white flex items-center justify-center rounded-r16 sm:rounded-r24 lg:rounded-r32 text-2xl sm:text-3xl lg:text-4xl font-bold">
                                    {current.id}
                                </div>

                                {/* PRO */}
                                <h2 className="text-[80px] sm:text-[120px] md:text-[180px] lg:text-[220px] xl:text-[250px] font-medium leading-none">
                                    PRO
                                </h2>

                            </div>

                            {/* CESS */}
                            <h2 className="text-[80px] sm:text-[120px] md:text-[180px] lg:text-[220px] xl:text-[250px] font-medium leading-[0.85]">
                                CESS
                            </h2>

                        </div>

                        {/* BAR */}
                        <div className="bg-primary-main text-white px-s24 py-s8 rounded-full w-full mx-auto lg:mx-0">
                            {current.subtitle}
                        </div>
                    </div>

                    {/* RIGHT */}
                  <div className="flex flex-col lg:flex-row items-center gap-s24 sm:gap-s40">

  {/* IMAGE */}
  <div className="order-1 lg:order-2 relative w-[270px] sm:w-[310px] lg:w-[400px] h-[450px] sm:h-[500px] lg:h-[740px] rounded-[200px] overflow-hidden border-[8px] border-[#EDEDED]">
    <Image
      key={current.image}
      src={current.image}
      alt=""
      fill
      priority
      className="object-cover transition-all duration-700 ease-in-out scale-105"
    />
  </div>

  {/* DOTS */}
  <div className="order-2 lg:order-1 flex lg:flex-col gap-[12px] items-center mt-s16 lg:mt-0">
    {processData.steps.map((_, i) => (
      <button
        key={i}
        onClick={() => setActive(i)}
        className={`
          w-s8 h-s8 rounded-full transition-all duration-300
          ${
            active === i
              ? "bg-main scale-125"
              : "bg-gray-300"
          }
        `}
      />
    ))}
  </div>

</div>
                </div>
            </div>

        </section>
    );
}