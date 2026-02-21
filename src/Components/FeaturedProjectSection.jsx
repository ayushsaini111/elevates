"use client";

import Image from "next/image";
import Button from "./ui/Button";
import { homePage } from "../Data/homePage";


export default function FeaturedProjectSection() {
  const { featuredProjectSection } = homePage;

  return (
    <section className="py-s104 px-s24 md:px-s64  xl:px-0 md:py-s160 bg-secondary-light">

      <div className="max-w-7xl mx-auto ">

        {/* TOP CARD */}
        <div className="
          bg-white rounded-r40 p-s24
          shadow-sm
        ">

          <div className="grid md:grid-cols-3 gap-s24">

            {/* LEFT MAP IMAGE */}
            <div className="md:col-span-2 relative rounded-r24 overflow-hidden">
              <Image
                src={featuredProjectSection.mapImage}
                alt="Project Layout"
                width={1200}
                height={800}
                className="w-full h-full object-cover rounded-r24"
              />

              {/* Project Badge */}
              <div className=" absolute top-0 left-0 bg-primary-main text-white border-b-10 border-r-10 border-white px-s24 py-s16 rounded-br-r40 body-default ">
                {featuredProjectSection.title}
              </div>
            </div>

            {/* RIGHT PRICE CARD */}
            <div className="
    md:col-span-1
    bg-primary-main text-white
    rounded-r24 p-s32
    flex flex-col
  ">


              <h3 className="heading-h4 font-semibold mb-s16">
                Starting Price
              </h3>

              <p className="mb-s64 opacity-90">
                {featuredProjectSection.startingPrice}
              </p>

              <ul className="space-y-s8 body-default opacity-90">
                {featuredProjectSection.features.map((item, index) => (
                  <li className="" key={index}> • {item}</li>
                ))}
              </ul>

            </div>
          </div>

          {/* LOCATION BAR */}
          <div className="
            mt-s32
            bg-secondary-light
            rounded-r24
            p-s24
            flex flex-col 
            justify-between 
            gap-s16
          ">

            <div>
              <h4 className="font-semibold text-main mb-1">
                Location
              </h4>
              <p className="text-secondary text-sm">
                {featuredProjectSection.location}
              </p>
            </div>

            <div className="flex justify-end gap-s16">
              <button className="text-primary-main font-medium">
                Download Brochure
              </button>
              <Button>Schedule Visit</Button>
            </div>
          </div>

        </div>

        {/* BELOW VIDEO FRAME */}
        <div className="
          mt-s80 md:mt-s104
          rounded-r32
          overflow-hidden
          border-8 border-secondary-main
        ">
          <video
            src={featuredProjectSection.overviewVideo}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-[500px] object-cover"
          />
        </div>

      </div>

    </section>
  );
}
