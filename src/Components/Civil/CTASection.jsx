"use client";
import { useState } from "react";
import Image from "next/image";
import { civilData } from "@/Data/civil";
import Button from "../ui/Button";
import ContactModal from "../ContactModal";

export default function CTASection() {
   const [show, setShow] = useState(false);
  const { title, subtitle, buttonText, image } = civilData.cta;

  return (
    <section className="relative w-full h-[100vh] min-h-[420px] overflow-hidden rounded-t-r24">
      
      {/* Background */}
      <Image
        src={image}
        alt="construction"
        fill
        className="object-cover "
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Content */}
      <div className="absolute inset-x-0 bottom-[10%] md:bottom-[20%] flex items-center justify-center text-center px-s16 sm:px-s24">
        <div className="max-w-[280px] sm:max-w-lg">

          <h2 className="civil-h1 text-white mb-s24">
            {title}
          </h2>

          <p className="heading-h4 text-white/90 mb-s32">
            {subtitle}
          </p>
           <Button onClick={() => setShow(true)} >
            
               Schedule Construction Consultation →
              </Button>

          

        </div>
      </div>
      <ContactModal isOpen={show} onClose={() => setShow(false)} />

    </section>
  );
}