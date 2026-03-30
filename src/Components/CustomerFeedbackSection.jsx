"use client";

import { homePage } from "../Data/homePage";
import { useRef, useEffect, useState } from "react";
import TestimonialCard from "@/Components/ui/TestimonialCard";

const CMS_API = process.env.NEXT_PUBLIC_CMS_URL || "";

export default function CustomerFeedbackSection() {
  const { customerFeedbackSection } = homePage;
  const scrollRef = useRef(null);

  const [testimonials, setTestimonials] = useState(
    customerFeedbackSection.testimonials
  );

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${CMS_API}/api/reviews`);
        const data = await res.json();

        if (Array.isArray(data) && data.length > 0) {
          setTestimonials(
            data.map((item, i) => ({
              id: item._id || i,
              name: item.name,
              role: item.designation,
              message: item.reviewText,
              image: item.profileImage,
            }))
          );
        }
      } catch (e) {
        console.error("Review fetch error:", e);
      }
    })();
  }, []);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -280, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 280, behavior: "smooth" });
  };

  return (
    <section className="bg-white py-s104 md:py-s160 overflow-hidden">
      {/* HEADER ROW */}
      <div className="max-w-7xl mx-auto px-s24 flex justify-between items-start">
        <div className="max-w-xl">
          <p className="text-primary-main body-default mb-s24">
            {customerFeedbackSection.label}
          </p>

          <h2 className="civil-h2 mb-s16">
            {customerFeedbackSection.heading}
          </h2>

          <p className="text-secondary body-default leading-relaxed">
            {customerFeedbackSection.description}
          </p>
        </div>

        {/* STAT CIRCLE */}
        <div
          className="
            hidden md:flex
            w-36 h-36
            rounded-full
            border border-primary-light/50
            items-center justify-center
            flex-col
          "
        >
          <h3 className="heading-h3 font-semibold">
            {customerFeedbackSection.stats.number}
          </h3>
          <p className="caption text-secondary">
            {customerFeedbackSection.stats.label}
          </p>
        </div>
      </div>

      {/* FULL WIDTH TESTIMONIAL SLIDER */}
      <div className="mt-s48 relative">
        <div
          ref={scrollRef}
          className="
            flex gap-s8 md:gap-s16 overflow-x-auto 
            scroll-smooth hide-scrollbar
            pl-[calc((100vw-1280px)/2+24px)]
          "
        >
          {testimonials.map((item) => (
            <TestimonialCard key={item.id} item={item} />
          ))}
        </div>

        {/* ARROWS */}
        <div className="absolute -bottom-20 md:-bottom-30 right-s40 text-on-primary flex gap-4">
          <button
            onClick={scrollLeft}
            className="w-12 h-12 cursor-pointer heading-h3 pt-1 rounded-full bg-primary-main flex items-center justify-center"
          >
            ‹
          </button>

          <button
            onClick={scrollRight}
            className="w-12 h-12 cursor-pointer heading-h3 pt-1 rounded-full bg-primary-main flex items-center justify-center"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
}