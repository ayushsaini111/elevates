"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { builderData } from "@/Data/builder";

export default function Projects() {
  const { projects } = builderData;

  const [activeTab, setActiveTab] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const [tabs, setTabs] = useState([
    { name: "Interior", images: [] },
    { name: "Exterior", images: [] },
  ]);

  // Fade visibility state
  const [showFadeRight, setShowFadeRight] = useState(true);
  const [showFadeLeft, setShowFadeLeft] = useState(false);
  const [showFadeBottom, setShowFadeBottom] = useState(true);
  const [showFadeTop, setShowFadeTop] = useState(false);

  const thumbStripRef = useRef(null);
  const thumbRefs = useRef([]);

  const currentTab = tabs[activeTab];
  const currentImage = currentTab?.images?.[activeIndex];

  /* ── Fetch designs from API ── */
  useEffect(() => {
    async function fetchDesigns() {
      try {
        const res = await fetch("/api/designs");
        const data = await res.json();
        if (Array.isArray(data)) {
          const interior = data
            .filter((d) => d.category === "interior")
            .map((d) => d.image);
          const exterior = data
            .filter((d) => d.category === "exterior")
            .map((d) => d.image);
          setTabs([
            { name: "Interior", images: interior },
            { name: "Exterior", images: exterior },
          ]);
        }
      } catch (err) {
        console.error("Failed to fetch designs:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchDesigns();
  }, []);

  // Recalculate fades whenever tab changes
  useEffect(() => {
    const el = thumbStripRef.current;
    if (!el) return;

    el.scrollLeft = 0;
    el.scrollTop = 0;

    const hasHorizontalOverflow = el.scrollWidth > el.clientWidth + 4;
    const hasVerticalOverflow = el.scrollHeight > el.clientHeight + 4;

    setShowFadeRight(hasHorizontalOverflow);
    setShowFadeLeft(false);
    setShowFadeBottom(hasVerticalOverflow);
    setShowFadeTop(false);
  }, [activeTab, tabs]);

  // Auto-scroll: always keep active thumbnail centred in the strip
  useEffect(() => {
    const strip = thumbStripRef.current;
    const thumb = thumbRefs.current[activeIndex];
    if (!strip || !thumb) return;

    const isDesktop = window.innerWidth >= 1024;

    if (isDesktop) {
      const targetScroll =
        thumb.offsetTop - strip.clientHeight / 2 + thumb.offsetHeight / 2;
      strip.scrollTo({ top: targetScroll, behavior: "smooth" });
    } else {
      const targetScroll =
        thumb.offsetLeft - strip.clientWidth / 2 + thumb.offsetWidth / 2;
      strip.scrollTo({ left: targetScroll, behavior: "smooth" });
    }
  }, [activeIndex]);

  const handleScroll = (e) => {
    const el = e.currentTarget;

    const atRight = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
    const atLeft = el.scrollLeft <= 4;
    setShowFadeRight(!atRight);
    setShowFadeLeft(!atLeft);

    const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 4;
    const atTop = el.scrollTop <= 4;
    setShowFadeBottom(!atBottom);
    setShowFadeTop(!atTop);
  };

  // Don't render the gallery section when still loading or both tabs empty
  const hasImages = tabs.some((t) => t.images.length > 0);

  if (loading) {
    return (
      <section className="w-full py-s80">
        <div className="max-w-5xl mx-auto space-y-s64">
          <div className="text-center mx-auto space-y-s16 px-s24">
            <h2 className="builder-h2 uppercase leading-tight">{projects.title1}</h2>
            <h2 className="builder-h2 uppercase leading-tight">{projects.title2}</h2>
            <h2 className="builder-h2 uppercase leading-tight">{projects.title3}</h2>
            <p className="heading-h5 text-secondary max-w-lg mx-auto mt-s32">
              {projects.subtitle}
            </p>
          </div>

          {/* Skeleton */}
          <div className="flex flex-col lg:flex-row items-center gap-s40">
            <div className="order-3 lg:order-1 flex lg:flex-col gap-s16 p-s8">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex-shrink-0 w-[100px] h-[80px] sm:w-[150px] sm:h-[110px] lg:w-[160px] lg:h-[140px] rounded-r16 md:rounded-r32 bg-gray-100 animate-pulse"
                />
              ))}
            </div>
            <div className="order-2 lg:order-2 flex lg:flex-col gap-s8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-2 h-2 rounded-full bg-gray-200 animate-pulse" />
              ))}
            </div>
            <div className="order-1 lg:order-3 w-[92%] lg:flex-1 h-[280px] sm:h-[400px] lg:h-[520px] mx-s24 rounded-r24 bg-gray-100 animate-pulse" />
          </div>
        </div>
      </section>
    );
  }

  if (!hasImages) return null;

  // Filter to only tabs that have images
  const activeTabs = tabs.filter((t) => t.images.length > 0);

  // Make sure activeTab index is valid after filtering
  const safeTab = activeTabs[activeTab] || activeTabs[0];
  const safeImages = safeTab?.images || [];
  const safeIndex = activeIndex < safeImages.length ? activeIndex : 0;
  const safeCurrentImage = safeImages[safeIndex];

  return (
    <section className="w-full py-s80">
      <div className="max-w-5xl mx-auto space-y-s64">

        {/* Heading */}
        <div className="text-center mx-auto space-y-s16 px-s24">
          <h2 className="builder-h2 uppercase leading-tight">{projects.title1}</h2>
          <h2 className="builder-h2 uppercase leading-tight">{projects.title2}</h2>
          <h2 className="builder-h2 uppercase leading-tight">{projects.title3}</h2>
          <p className="heading-h5 text-secondary max-w-lg mx-auto mt-s32">
            {projects.subtitle}
          </p>
        </div>

        {/* Layout */}
        <div className="flex flex-col lg:flex-row items-center gap-s40">

          {/* LEFT — thumbnails with scroll-fade hint */}
          <div className="order-3 lg:order-1 relative flex-shrink-0 w-full lg:w-auto">

            <div
              ref={thumbStripRef}
              onScroll={handleScroll}
              className="
                flex lg:flex-col gap-s16
                overflow-x-auto lg:overflow-x-visible
                lg:overflow-y-auto lg:max-h-[520px]
                p-s8 hide-scrollbar
              "
            >
              {safeImages.map((img, i) => (
                <button
                  key={i}
                  ref={(el) => (thumbRefs.current[i] = el)}
                  onClick={() => setActiveIndex(i)}
                  className={`
                    relative flex-shrink-0
                    w-[100px] h-[80px]
                    sm:w-[150px] sm:h-[110px]
                    lg:w-[160px] lg:h-[140px]
                    rounded-r16 md:rounded-r32 overflow-hidden border-3 transition-all duration-200
                    ${safeIndex === i
                      ? "border-primary-main scale-105 shadow-md"
                      : "border-transparent opacity-90 hover:opacity-100"
                    }
                  `}
                >
                  <Image
                    src={img}
                    alt={`thumb-${i}`}
                    fill
                    sizes="120px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>

            {/* ── Fade overlays ── */}
            <div
              className="pointer-events-none absolute top-0 right-0 h-full w-16 lg:hidden transition-opacity duration-300"
              style={{
                background: "linear-gradient(to right, transparent, var(--color-bg, white))",
                opacity: showFadeRight ? 1 : 0,
              }}
            />
            <div
              className="pointer-events-none absolute top-0 left-0 h-full w-12 lg:hidden transition-opacity duration-300"
              style={{
                background: "linear-gradient(to left, transparent, var(--color-bg, white))",
                opacity: showFadeLeft ? 1 : 0,
              }}
            />
            <div
              className="pointer-events-none absolute bottom-0 left-0 w-full h-20 hidden lg:block transition-opacity duration-300"
              style={{
                background: "linear-gradient(to bottom, transparent, var(--color-bg, white))",
                opacity: showFadeBottom ? 1 : 0,
              }}
            />
            <div
              className="pointer-events-none absolute top-0 left-0 w-full h-14 hidden lg:block transition-opacity duration-300"
              style={{
                background: "linear-gradient(to top, transparent, var(--color-bg, white))",
                opacity: showFadeTop ? 1 : 0,
              }}
            />
          </div>

          {/* DOTS */}
          <div className="
            order-2 lg:order-2
            flex lg:flex-col flex-row items-center justify-center gap-s8 flex-shrink-0
          ">
            {safeImages.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`
                  rounded-full transition-all duration-200 cursor-pointer
                  ${safeIndex === i
                    ? "w-2.5 h-2.5 bg-primary-main"
                    : "w-2 h-2 bg-secondary-main opacity-40 hover:opacity-70"
                  }
                `}
              />
            ))}
          </div>

          {/* MAIN IMAGE */}
          <div className="
            order-1 lg:order-3
            relative w-[92%] lg:flex-1
            h-[280px] sm:h-[400px] lg:h-[520px] mx-s24
            rounded-r24 overflow-hidden shadow-xl flex-shrink-0
          ">
            {safeCurrentImage && (
              <Image
                key={safeCurrentImage}
                src={safeCurrentImage}
                alt="project"
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover transition-all duration-500"
              />
            )}
          </div>

        </div>

        {/* TAB SWITCH — only show when more than one tab has images */}
        {activeTabs.length > 1 && (
          <div className="flex justify-center">
            <div className="flex bg-secondary-light rounded-full p-s6">
              {activeTabs.map((t, i) => (
                <button
                  key={t.name}
                  onClick={() => {
                    setActiveTab(i);
                    setActiveIndex(0);
                  }}
                  className={`
                    px-s16 py-s8 rounded-full caption transition-all duration-200 cursor-pointer
                    ${activeTab === i
                      ? "bg-gradient-to-r from-primary-main to-primary-light text-white"
                      : "text-secondary hover:text-main"
                    }
                  `}
                >
                  {t.name}
                </button>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}