"use client";

import Image from "next/image";
import { useState, useRef, useEffect, useCallback } from "react";
import { infraData } from "@/Data/infra";

export default function Projects() {
  const { projects } = infraData;

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showFadeLeft, setShowFadeLeft] = useState(false);
  const [showFadeRight, setShowFadeRight] = useState(true);

  const stripRef = useRef(null);
  const thumbRefs = useRef([]);

  // ── Drag-to-scroll (desktop) ──
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragScrollLeft = useRef(0);

  // ── Swipe (mobile) ──
  const touchStartX = useRef(null);

  const total = images.length;
  const currentImage = images[activeIndex];

  /* ── Fetch exterior designs ── */
  useEffect(() => {
    async function fetchExterior() {
      try {
        const res = await fetch("/api/designs?category=exterior");
        const data = await res.json();
        if (Array.isArray(data)) {
          setImages(data.map((d) => d.image));
        }
      } catch (err) {
        console.error("Failed to fetch exterior designs:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchExterior();
  }, []);

  // Centre the active thumb in the strip
  const scrollToThumb = useCallback((index) => {
    const strip = stripRef.current;
    const thumb = thumbRefs.current[index];
    if (!strip || !thumb) return;
    const target =
      thumb.offsetLeft - strip.clientWidth / 2 + thumb.offsetWidth / 2;
    strip.scrollTo({ left: target, behavior: "smooth" });
  }, []);

  // Update fades based on scroll position
  const updateFades = useCallback(() => {
    const el = stripRef.current;
    if (!el) return;
    setShowFadeLeft(el.scrollLeft > 4);
    setShowFadeRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    scrollToThumb(activeIndex);
  }, [activeIndex, scrollToThumb]);

  // Re-calc fades when images load
  useEffect(() => {
    updateFades();
  }, [images, updateFades]);

  const goTo = (i) => setActiveIndex(i);

  // ── Desktop: drag to scroll strip ──
  const onMouseDown = (e) => {
    isDragging.current = true;
    dragStartX.current = e.pageX - stripRef.current.offsetLeft;
    dragScrollLeft.current = stripRef.current.scrollLeft;
    stripRef.current.style.cursor = "grabbing";
  };

  const onMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - stripRef.current.offsetLeft;
    const walk = (x - dragStartX.current) * 1.2;
    stripRef.current.scrollLeft = dragScrollLeft.current - walk;
  };

  const onMouseUp = () => {
    isDragging.current = false;
    if (stripRef.current) stripRef.current.style.cursor = "grab";
  };

  // ── Mobile: swipe main image → change slide ──
  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const dx = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(dx) > 40) {
      if (dx > 0) goTo(Math.min(activeIndex + 1, total - 1));
      else goTo(Math.max(activeIndex - 1, 0));
    }
    touchStartX.current = null;
  };

  /* ── Loading skeleton ── */
  if (loading) {
    return (
      <section className="w-full py-s80 md:py-s104 xl:py-s160">
        <div className="max-w-5xl mx-auto space-y-s80 text-center px-s16 ms:px-0">
          <div className="space-y-s16 px-s8">
            <h2 className="infra-h2">{projects.title}</h2>
            <p className="heading-h6 max-w-lg mx-auto">{projects.subtitle}</p>
          </div>
          <div className="w-full h-[260px] sm:h-[400px] lg:h-[520px] rounded-r24 md:rounded-r32 bg-gray-100 animate-pulse" />
        </div>
        <div className="flex justify-center gap-2 mt-s56">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-gray-200 animate-pulse"
            />
          ))}
        </div>
        <div className="w-full mt-s16">
          <div className="flex gap-s16 overflow-hidden py-s32 justify-center">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="flex-shrink-0 w-[120px] h-[90px] lg:w-[140px] lg:h-[100px] rounded-r16 bg-gray-100 animate-pulse"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  /* ── No exterior images uploaded ── */
  if (!loading && images.length === 0) return null;

  return (
    <section className="w-full py-s80 md:py-s104 xl:py-s160">
      <div className="max-w-5xl mx-auto space-y-s56 text-center px-s32 ms:px-0">
        {/* Heading */}
        <div className="space-y-s8 px-s8">
          <h2 className="infra-h2 max-w-[280px] mx-auto sm:max-w-2xl">{projects.title}</h2>
          <p className="heading-h6 max-w-lg mx-auto">{projects.subtitle}</p>
        </div>

        {/* MAIN IMAGE */}
        <div
          className="relative w-full h-[400px] lg:h-[520px] rounded-r24 md:rounded-r32 overflow-hidden shadow-xl cursor-grab active:cursor-grabbing"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {currentImage && (
            <Image
              key={currentImage}
              src={currentImage}
              alt="project"
              fill
              priority
              className="object-cover transition-all duration-500"
            />
          )}
        </div>
      </div>

      {/* DOTS */}
      <div className="flex justify-center gap-3 mt-s24 ">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`rounded-full transition-all duration-200 cursor-pointer ${
              activeIndex === i
                ? "w-3.5 h-3.5 bg-primary-main"
                : "w-3 h-3 bg-secondary-light opacity-90"
            }`}
          />
        ))}
      </div>

      {/* THUMBNAILS */}
      <div className="w-full xl:pl-s32 relative">
        {/* Fade — left */}
        <div
          className="pointer-events-none absolute left-0 top-0 h-full w-5 z-10 transition-opacity duration-300"
          style={{
            background:
              "linear-gradient(to right, var(--color-bg, white), transparent)",
            opacity: showFadeLeft ? 1 : 0,
          }}
        />

        {/* Fade — right */}
        <div
          className="pointer-events-none absolute right-0 top-0 h-full w-5 z-10 transition-opacity duration-300"
          style={{
            background:
              "linear-gradient(to left, var(--color-bg, white), transparent)",
            opacity: showFadeRight ? 1 : 0,
          }}
        />

        {/* Scrollable strip */}
        <div
          ref={stripRef}
          onScroll={updateFades}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
          className="flex gap-s16 overflow-x-auto hide-scrollbar items-end py-s24 select-none"
          style={{
            cursor: "grab",
            paddingLeft: "max(16px, calc((100vw - 64rem) / 2))",
            paddingRight: "max(16px, calc((100vw - 64rem) / 2))",
          }}
        >
          {images.map((img, i) => (
            <button
              key={i}
              ref={(el) => (thumbRefs.current[i] = el)}
              onClick={() => goTo(i)}
              className={`
                relative flex-shrink-0
                w-[120px] h-[90px]
                lg:w-[140px] lg:h-[100px]
                rounded-r24 overflow-hidden
                transition-all duration-300 ease-out
                ${
                  activeIndex === i
                    ? "ring-2 ring-primary-main -translate-y-1 scale-105 z-10"
                    : "translate-y-2 scale-[0.96] opacity-70 hover:opacity-100"
                }
              `}
            >
              <Image
                src={img}
                alt={`thumb-${i}`}
                fill
                sizes="140px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}