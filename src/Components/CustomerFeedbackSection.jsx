"use client";

import { homePage } from "../Data/homePage";
import { useRef, useEffect, useState } from "react";
import TestimonialCard from "@/Components/ui/TestimonialCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CMS_API = process.env.NEXT_PUBLIC_BASE_URL || "";

function TestimonialSkeleton() {
  return (
    <div className="
      min-w-[250px] md:max-w-[280px] min-h-[200px] sm:min-h-[250px]
      bg-secondary-light
      rounded-r24
      p-s24 mx-s16
      animate-pulse
    ">
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

export default function CustomerFeedbackSection({ font = "heading-h2" }) {
  const { customerFeedbackSection } = homePage;
  const scrollRef = useRef(null);

  const [testimonials, setTestimonials] = useState(
    customerFeedbackSection.testimonials
  );
  const [loading, setLoading] = useState(true);

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

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -280, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 280, behavior: "smooth" });
  };

  return (
    <section className="bg-white py-s104 md:py-s160 space-y-s24 md:space-y-s40 overflow-hidden">
      {/* HEADER */}
      <div className="max-w-7xl mx-auto px-s32 flex flex-col sm:flex-row justify-between items-start gap-s24">

        <div className="max-w-xl">
          <p className="text-primary-main body-default">
            {customerFeedbackSection.label}
          </p>
          <h2 className={`${font}`}>
            {customerFeedbackSection.heading}
          </h2>
          <p className="text-secondary body-default leading-relaxed">
            {customerFeedbackSection.description}
          </p>
        </div>

        <div className="
          flex-shrink-0 hidden
          w-26 h-25 md:w-36 md:h-36
          rounded-full
          border border-primary-light/50
          md:flex items-center justify-center flex-col
        ">
          <h3 className="heading-h3 font-semibold text-sm sm:text-base md:text-lg">
            {customerFeedbackSection.stats.number}
          </h3>
          <p className="caption text-secondary text-center text-[5px] sm:text-xs ">
            {customerFeedbackSection.stats.label}
          </p>
        </div>

     <div className=" sm:hidden flex justify-between gap-s16 items-center px-s8 ">
         <div className="
          flex-shrink-0 
          w-44 
          rounded-r40
          border border-primary-light/50
          flex items-center justify-center 
        ">
          <h3 className="heading-h3   py-s16 ">
            {customerFeedbackSection.stats.number}
          </h3>
        </div>
<span className="caption text-secondary"> {customerFeedbackSection.stats.label} </span>
     </div>

      </div>

      {/* SLIDER */}
      <div className=" relative">
        <div
          ref={scrollRef}
          className="
            flex gap-s8 md:gap-s16 overflow-x-auto
            scroll-smooth hide-scrollbar
            snap-x snap-mandatory
            pl-s16 xl:pl-[calc((100vw-1280px)/2+24px)]
          "
        >
          {loading
            ? Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="snap-center">
                  <TestimonialSkeleton />
                </div>
              ))
            : testimonials.map((item) => (
                <TestimonialCard key={item.id} item={item} />
              ))}
        </div>

        {/* ARROWS */}
        <div className="absolute -bottom-20 md:-bottom-30 right-s40 text-on-primary flex gap-4">
          <button
            onClick={scrollLeft}
            className="w-12 h-12 cursor-pointer heading-h3 rounded-full bg-primary-main flex items-center justify-center"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={scrollRight}
            className="w-12 h-12 cursor-pointer heading-h3 rounded-full bg-primary-main flex items-center justify-center"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
}