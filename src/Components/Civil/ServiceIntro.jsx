// components/ServiceIntro.jsx

"use client";

import { civilData } from "@/Data/civil";

export default function ServiceIntro() {
  const { note, headingLight, highlight } = civilData.serviceIntro;

  const parts = headingLight.split(highlight);

  return (
    <section className="w-full bg-secondary-light py-s104 lg:py-s160">
      <div className="max-w-[98%] mx-auto px-s16 ">
        
        {/* Top Right Note */}
        <div className="flex justify-start md:justify-end ">
          <p className="
            civil-h4 
            text-main 
            max-w-full md:max-w-md 
            text-left md:text-right 
         
          ">
            {note}
          </p>
        </div>

        {/* Main Text */}
        <div className="mt-s40 md:mt-s64 lg:mt-s80">
          <h2 className=" text-3xl
            md:text-7xl 
            text-main 
            leading-tight 
           
          ">
            <span className="text-secondary/60">We offer professional construction services</span> with material   <span className="text-primary-main font-tertiary">or</span>   without material <span className="text-secondary/60" >designed to suit different project needs, budgets, and control preferences.</span>
          </h2>
        </div>

      </div>
    </section>
  );
}