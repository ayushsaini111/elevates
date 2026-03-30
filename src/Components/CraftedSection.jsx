"use client";

import Image from "next/image";
import Button from "./ui/Button";
import { homePage } from "../Data/homePage";

export default function CraftedSection() {
  const { craftedSection } = homePage;

  return (
    <section className="relative min-h-screen flex ">

      {/* Background Image */}
      <Image
        src={craftedSection.backgroundImage}
        alt="Crafted Home"
        fill
        priority
        className="object-cover "
      />

      

      {/* Content */}
      <div className="
        relative z-10 top-15 md:top-20 
        max-w-7xl mx-auto
        w-full
        px-s24 md:px-s40
      ">

        <div className="">
<p className="text-primary-main">Interior/Exterior Designing</p>
          {/* Heading */}
          <h1 className="
            heading-h2
            text-main
            mb-s8 md:mb-s24
            leading-tight
          ">
            {craftedSection.heading.map((line, index) => (
              <span key={index} className="block">
                {line}
              </span>
            ))}
          </h1>

          {/* Description */}
          <p className="body-default text-secondary max-w-sm mb-s24 md:mb-s32">
            {craftedSection.description}
          </p>

          {/* Button */}
          <Button variant="secondary"  as="link" href={"/builders"}>
            {craftedSection.buttonText}
          </Button>

        </div>

      </div>

    </section>
  );
}
