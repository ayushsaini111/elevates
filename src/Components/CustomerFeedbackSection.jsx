"use client";

import { homePage } from "../Data/homePage";
import { useRef, useEffect, useState } from "react";
import TestimonialCard from "@/Components/ui/TestimonialCard";

const CMS_API = process.env.NEXT_PUBLIC_BASE_URL || "";

/* =========================
   Skeleton (same file)
========================= */
function TestimonialSkeleton() {
  return (
    <div
      className="
      min-w-[250px] md:max-w-[280px] :min-h-[200px] sm:min-h-[250px]
      bg-secondary-light
      rounded-r24
      p-s24 mx-s16
      animate-pulse
    "
    >
      <div className="flex items-center gap-s12 mb-s16">
        <div className="w-10 h-10 rounded-full bg-gray-300" />

        <div className="flex flex-col gap-2 w-full">
          <div className="h-3 w-24 bg-gray-300 rounded" />
          <div className="h-2 w-16 bg-gray-200 rounded" />
        </div>
      </div>

      <div className="space-y-2">
        <div className="h-3 bg-gray-300 rounded w-full" />
        <div className="h-3 bg-gray-300 rounded w-5/6" />
        <div className="h-3 bg-gray-300 rounded w-4/6" />
      </div>
    </div>
  );
}

export default function CustomerFeedbackSection() {
  const { customerFeedbackSection } = homePage;
  const scrollRef = useRef(null);

  const [testimonials, setTestimonials] = useState(
    customerFeedbackSection.testimonials
  );
  const [loading, setLoading] = useState(true);

  /* =========================
     Fetch Reviews
  ========================= */
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`/api/reviews`);
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
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  /* =========================
     Scroll Controls
  ========================= */
  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -280, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 280, behavior: "smooth" });
  };

  return (
    <section className="bg-white py-s104 md:py-s160 overflow-hidden">
      {/* ================= HEADER ================= */}
      <div className="max-w-7xl mx-auto px-s24 flex flex-row justify-between items-start gap-s16">

  {/* LEFT TEXT */}
  <div className="max-w-[75%] sm:max-w-xl">
    <p className="text-primary-main body-default mb-s16">
      {customerFeedbackSection.label}
    </p>

    <h2 className="civil-h2 mb-s12">
      {customerFeedbackSection.heading}
    </h2>

    <p className="text-secondary body-default leading-relaxed">
      {customerFeedbackSection.description}
    </p>
  </div>

  {/* RIGHT STAT CIRCLE */}
  <div
    className="
      flex-shrink-0
      w-25 h-25 md:w-36 md:h-36
      rounded-full
      border border-primary-light/50
      flex items-center justify-center flex-col
    "
  >
    <h3 className="heading-h3 font-semibold text-sm sm:text-base md:text-lg">
      {customerFeedbackSection.stats.number}
    </h3>
    <p className="caption text-secondary text-center text-[5px] sm:text-xs">
      {customerFeedbackSection.stats.label}
    </p>
  </div>

</div>

      {/* ================= SLIDER ================= */}
      <div className="mt-s48 relative">
        <div
          ref={scrollRef}
          className="
            flex gap-s8 md:gap-s16 overflow-x-auto 
            scroll-smooth hide-scrollbar
            pl-4 md:pl-[calc((100vw-1280px)/2+24px)]
          "
        >
          {loading
            ? Array.from({ length: 5 }).map((_, i) => (
                <TestimonialSkeleton key={i} />
              ))
            : testimonials.map((item) => (
                <TestimonialCard key={item.id} item={item} />
              ))}
        </div>

        {/* ================= ARROWS ================= */}
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