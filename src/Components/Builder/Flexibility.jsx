"use client";

import Image from "next/image";
import { useState } from "react";
import { builderData } from "@/Data/builder";
import Button from "../ui/Button";

export default function Flexibility() {
  const { flexibility } = builderData;

  const [active, setActive] = useState(0);

  return (
    <section className="w-full pt-s80 md:py-0 overflow-hidden">
      <div className="w-full mx-auto relative">

        {/* 🔥 BACK TEXT */}
        <h2 className="text-center text-[40px] sm:text-[80px] lg:text-[180px] font-extrabold text-secondary-light opacity-40 pointer-events-none whitespace-nowrap">
          {flexibility.heading.toUpperCase()}
        </h2>

        {/* 🔥 CENTER HEADING */}
        <div className="flex justify-center mb-s16 sm:mt-0">
          <h3 className="builder-h2 text-center">
            {flexibility.subHeading}
          </h3>
        </div>

        {/* MAIN */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-s40 relative z-10">

          {/* LEFT IMAGE */}
          <div className="w-full md:w-[260px] h-[200px] md:h-[600px] rounded-tr-0 rounded-br-r32 rounded-bl-r32 md:rounded-bl-none md:rounded-r-r32 overflow-hidden">
            <Image
              src={flexibility.image}
              alt="left"
              width={260}
              height={600}
              className="object-cover h-full w-full"
            />
          </div>

          {/* CENTER */}
          <div className="flex flex-col items-center text-center space-y-s24 max-w-md">

           

           

            {/* BUTTON LIST */}
            <div className="flex flex-col gap-s16 w-full items-center">

              {flexibility.points.map((item, i) => (
                <div key={i} className="w-full flex flex-col items-center">

                  {/* 🔥 BUTTON USING YOUR COMPONENT */}
                  <button
                    onClick={() => setActive(i)}
                    className={`
                      px-s24 py-s16 rounded-full heading-h6 transition-all max-w-[250px] cursor-pointer
                      ${
                        active === i
                          ? "text-on-primary font-medium bg-gradient-to-r from-[var(--primary-main)] to-[#88510F] hover:from-[var(--primary-main)] hover:to-[var(--primary-light)] transition-all duration-300 shadow-md hover:shadow-lg"
                          : "bg-secondary-light "
                      }
                    `}
                  >
                    {item.title}
                  </button>

                  {/* DESC */}
                  {active === i && (
                    <p className="mt-s16 px-s16 md:px-0 body-default text-secondary max-w-xs animate-fadeIn">
                      {item.desc}
                    </p>
                  )}
                </div>
              ))}

            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="w-full md:w-[260px] h-[200px] md:h-[600px] rounded-br-0 rounded-tr-r32 rounded-tl-r32 md:rounded-tr-none md:rounded-l-r32 overflow-hidden">
            <Image
              src={flexibility.image}
              alt="right"
              width={260}
              height={600}
              className="object-cover h-full w-full scale-x-[-1]"
            />
          </div>
        </div>
      </div>

      {/* ANIMATION */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in-out;
        }
      `}</style>
    </section>
  );
}