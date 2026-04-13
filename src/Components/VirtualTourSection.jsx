"use client";

import { useEffect, useRef, useState } from "react";
import { homePage } from "../Data/homePage";

export default function VirtualTourSection() {
  const { virtualTourSection } = homePage;

  const scrollRef = useRef(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ NEW

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -280, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 280, behavior: "smooth" });
  };

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch(
         `/api/videos`
        );
        const data = await res.json();

        const formatted = data.map((item) => ({
          id: item._id,
          video: item.url,
        }));

        setVideos(formatted);
      } catch (err) {
        console.error("Video fetch error:", err);
      } finally {
        setLoading(false); // ✅ important
      }
    };

    fetchVideos();
  }, []);

  return (
    <section className=" xl:px-0 pb-s160">

      {/* Heading */}
      <div className="max-w-7xl mx-auto text-center sm:text-left px-s32 sm:px-s40">
        <h2 className="heading-h2 text-main">
          {virtualTourSection.heading1}
        </h2>
        <h2 className="heading-h2 text-main">
          {virtualTourSection.heading2}
        </h2>
        <div className="body-default text-secondary mb-s48">
          {virtualTourSection.description}
        </div>
      </div>

      {/* Slider */}
      <div className="relative">
        <div
          ref={scrollRef}
          className="
            flex  overflow-x-auto 
            scroll-smooth hide-scrollbar px-s32 lg:px-s160
           
          "
        >
          {loading
            ? Array.from({ length: 5 }).map((_, i) => (
                <SkeletonVideo key={i} />
              ))
            : videos.map((tour) => (
                <div
                  key={tour.id}
                  className="
                    min-w-[250px] md:min-w-[340px]
                    md:h-[600px]
                    rounded-r32 overflow-hidden shadow-sm group mx-[12px]
                  "
                >
                  <video
                    src={tour.video}
                    className="w-full  h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                </div>
              ))}
        </div>

        {/* Arrows */}
        <div className="absolute -bottom-30 right-s40 flex gap-4 cursor-pointer">
          <button
            onClick={scrollLeft}
            className="w-12 h-12 heading-h3 pt-1 rounded-full bg-primary-main cursor-pointer text-white flex items-center justify-center"
          >
            ‹
          </button>
          <button
            onClick={scrollRight}
            className="w-12 h-12 heading-h3 pt-1 rounded-full bg-primary-main cursor-pointer text-white flex items-center justify-center"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
}

function SkeletonVideo() {
  return (
    <div className="
      min-w-[250px] md:min-w-[340px]
      md:h-[600px]
      rounded-r32
      mx-[12px]
      bg-secondary-light
      animate-pulse
    " />
  );
}