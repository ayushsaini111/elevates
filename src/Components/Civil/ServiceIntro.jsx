// components/ServiceIntro.jsx

"use client";

import { civilData } from "@/Data/civil";

export default function ServiceIntro() {
  const { note1, note2, note, headingLight, highlight } = civilData.serviceIntro;

  const parts = headingLight.split(highlight);

  return (
    <section className="w-full bg-secondary-light rounded-b-r32 md:rounded-b-r40 py-s64 md:py-s104 lg:py-s160">
      <div className="max-w-[98%] mx-auto px-s24 xl:px-s80 ">

        {/* Top Right Note */}
        {/* 📱 Mobile */}
        <div className="flex flex-col items-end w-full md:hidden">

          <p className="
    civil-h4 
    text-main 
    text-right max-w-lg
  ">
            {note}
          </p>

        </div>

        {/* 💻 Tablet + Desktop */}
        <div className="hidden md:flex flex-col items-end w-full">

          <p className="
    civil-h4 
    text-main 
    max-w-lg
    text-right
  ">
            {note1}
          </p>

          <p className="
    civil-h4 
    text-main 
    max-w-xl
    text-right
  ">
            {note2}
          </p>

        </div>

        {/* Main Text */}
        <div className="mt-s40 ">
          <h2 className="  text-2xl
            md:text-5xl 
            lg:text-7xl
            text-main 
            leading-tight font-light
           
          ">
            <span className="text-neutral-light">We offer professional construction services</span> with material   <span className="text-primary-main font-tertiary">or</span>   without material <span className="text-neutral-light" >designed to suit different project needs, budgets, and control preferences.</span>
          </h2>
        </div>

      </div>
    </section>
  );
}