"use client";
import { useState } from "react";
import Image from "next/image";
import Button from "@/Components/ui/Button";
import { infraData } from "@/Data/infra";
import ContactModal from "../ContactModal";

export default function CTASection() {
  const { cta } = infraData;
   const [show, setShow] = useState(false);

  return (
    <section className="w-full h-[95vh] relative overflow-hidden">

      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={cta.image}
          alt="cta"
          fill
          priority
          className="object-cover lg:object-[center_60%]"
        />
        
    
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto text-center px-s16 py-s104 md:py-s160 space-y-s24">

        <h2 className="infra-h1 leading-tight">
          {cta.title}
        </h2>

        <p className="heading-h5 ">
          {cta.subtitle}
        </p>

        {/* Button Component */}
        <div className="pt-s16 ">
          <Button onClick={() => setShow(true)}  className="max-w-[280] md:max-w-2xl">
            {cta.buttonText}
          </Button>
        </div>

      </div>
            <ContactModal isOpen={show} onClose={() => setShow(false)} />

    </section>
  );
}