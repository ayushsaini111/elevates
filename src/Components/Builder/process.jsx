"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { builderData } from "@/Data/builder";

export default function Process() {
  const { processData } = builderData;
  const total = processData.steps.length;

  const [active, setActive] = useState(0);
  const [prev, setPrev] = useState(null);
  const [direction, setDirection] = useState("down");
  const [animating, setAnimating] = useState(false);
  const sectionRef = useRef(null);
  const isScrolling = useRef(false);
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);

  const current = processData.steps[active];
  const prevStep = prev !== null ? processData.steps[prev] : null;

  const goTo = (next) => {
    // Wrap around for looping
    const wrapped = ((next % total) + total) % total;
    if (wrapped === active || animating) return;

    // Determine direction — account for wrap-around edge cases
    let dir;
    if (next >= total) dir = "down";       // wrapped past end → forward
    else if (next < 0) dir = "up";         // wrapped past start → back
    else dir = next > active ? "down" : "up";

    setDirection(dir);
    setPrev(active);
    setActive(wrapped);
    setAnimating(true);
    setTimeout(() => {
      setPrev(null);
      setAnimating(false);
    }, 600);
  };

  const goPrev = () => goTo(active - 1);
  const goNext = () => goTo(active + 1);

  // Desktop wheel scroll
  useEffect(() => {
    const el = sectionRef.current;
    const handleWheel = (e) => {
      if (isScrolling.current) return;
      isScrolling.current = true;
      e.deltaY > 0 ? goNext() : goPrev();
      setTimeout(() => { isScrolling.current = false; }, 700);
    };
    el?.addEventListener("wheel", handleWheel);
    return () => el?.removeEventListener("wheel", handleWheel);
  }, [active, animating]);

  // Mobile touch swipe
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const dx = touchStartX.current - e.changedTouches[0].clientX;
    const dy = touchStartY.current - e.changedTouches[0].clientY;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
      dx > 0 ? goNext() : goPrev();
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  // Slide directions
  const incoming  = direction === "down" ? "translateY(100%)"  : "translateY(-100%)";
  const outgoing  = direction === "down" ? "translateY(-100%)" : "translateY(100%)";
  const incomingH = direction === "down" ? "translateX(100%)"  : "translateX(-100%)";
  const outgoingH = direction === "down" ? "translateX(-100%)" : "translateX(100%)";

  return (
    <>
      <style>{`
        @keyframes slideInV {
          from { transform: var(--from-v); opacity: 0.4; }
          to   { transform: translateY(0); opacity: 1; }
        }
        @keyframes slideOutV {
          from { transform: translateY(0); opacity: 1; }
          to   { transform: var(--to-v);  opacity: 0.4; }
        }
        @keyframes slideInH {
          from { transform: var(--from-h); opacity: 0.4; }
          to   { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOutH {
          from { transform: translateX(0); opacity: 1; }
          to   { transform: var(--to-h);  opacity: 0.4; }
        }
        .img-enter-v { animation: slideInV  0.55s cubic-bezier(0.4,0,0.2,1) forwards; }
        .img-exit-v  { animation: slideOutV 0.55s cubic-bezier(0.4,0,0.2,1) forwards; }
        .img-enter-h { animation: slideInH  0.55s cubic-bezier(0.4,0,0.2,1) forwards; }
        .img-exit-h  { animation: slideOutH 0.55s cubic-bezier(0.4,0,0.2,1) forwards; }
        .arrow-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1.5px solid rgba(0,0,0,0.15);
          background: rgba(255,255,255,0.85);
          backdrop-filter: blur(4px);
          transition: background 0.2s, border-color 0.2s, transform 0.15s;
          cursor: pointer;
          flex-shrink: 0;
        }
        .arrow-btn:active { transform: scale(0.9); }
      `}</style>

      <section
        ref={sectionRef}
        className="w-full px-s16 sm:px-s24 lg:px-s32 py-s40"
      >
        <div className="max-w-5xl mx-auto space-y-s40 sm:space-y-s56">

          {/* HEADER */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-s16 text-center sm:text-right">
            <div className="relative w-[140px] sm:w-[200px] lg:w-[260px]">
              <Image
                src={processData.header.image}
                alt="design"
                width={260}
                height={140}
                className="object-contain"
              />
            </div>
            <p className="heading-h6 text-secondary max-w-[280px] sm:max-w-sm lg:max-w-md">
              {processData.header.description}
            </p>
          </div>

          {/* MAIN */}
          <div className="flex flex-col lg:flex-row items-center gap-s32 lg:gap-s24">

            {/* LEFT */}
            <div className="flex-1 space-y-s24 text-center lg:text-left">
              <div>
                <div className="flex items-center justify-center lg:justify-start gap-s8">
                  <div className="w-[60px] h-[60px] sm:w-[90px] sm:h-[90px] md:w-[120px] md:h-[120px] lg:w-[150px] lg:h-[150px] bg-black text-white flex items-center justify-center rounded-r16 sm:rounded-r24 lg:rounded-r32 text-3xl sm:text-5xl lg:text-6xl font-bold">
                    {current.id}
                  </div>
                  <h2 className="text-[80px] sm:text-[120px] md:text-[180px] lg:text-[220px] xl:text-[250px] font-medium leading-none">
                    PRO
                  </h2>
                </div>
                <h2 className="text-[80px] sm:text-[120px] md:text-[180px] lg:text-[220px] xl:text-[250px] font-medium leading-[0.85]">
                  CESS
                </h2>
              </div>
              <div className="bg-primary-main text-white px-s24 py-s8 rounded-full w-full mx-auto lg:mx-0">
                {current.subtitle}
              </div>
            </div>

            {/* RIGHT */}
            <div className="flex flex-col lg:flex-row items-center gap-s24 sm:gap-s40">

              {/* IMAGE + mobile controls wrapper */}
              <div className="order-1 lg:order-2 flex flex-col items-center gap-s40">

                {/* IMAGE CONTAINER */}
                <div
                  className="relative w-[270px] sm:w-[310px] lg:w-[400px] h-[450px] sm:h-[500px] lg:h-[740px] rounded-[200px] overflow-hidden border-[8px] border-[#EDEDED]"
                  onTouchStart={handleTouchStart}
                  onTouchEnd={handleTouchEnd}
                >
                  {/* OUTGOING image */}
                  {prevStep && (
                    <>
                      {/* Desktop: vertical exit */}
                      <div
                        key={`exit-v-${prev}`}
                        className="img-exit-v absolute inset-0 hidden lg:block"
                        style={{ "--to-v": outgoing }}
                      >
                        <Image src={prevStep.image} alt="" fill className="object-cover scale-105" />
                      </div>
                      {/* Mobile: horizontal exit */}
                      <div
                        key={`exit-h-${prev}`}
                        className="img-exit-h absolute inset-0 lg:hidden"
                        style={{ "--to-h": outgoingH }}
                      >
                        <Image src={prevStep.image} alt="" fill className="object-cover scale-105" />
                      </div>
                    </>
                  )}

                  {/* INCOMING image */}
                  <>
                    {/* Desktop: vertical enter */}
                    <div
                      key={`enter-v-${active}`}
                      className={`absolute inset-0 hidden lg:block ${animating ? "img-enter-v" : ""}`}
                      style={{ "--from-v": animating ? incoming : "translateY(0)" }}
                    >
                      <Image src={current.image} alt="" fill priority className="object-cover scale-105" />
                    </div>
                    {/* Mobile: horizontal enter */}
                    <div
                      key={`enter-h-${active}`}
                      className={`absolute inset-0 lg:hidden ${animating ? "img-enter-h" : ""}`}
                      style={{ "--from-h": animating ? incomingH : "translateX(0)" }}
                    >
                      <Image src={current.image} alt="" fill priority className="object-cover scale-105" />
                    </div>
                  </>
                </div>

                {/* MOBILE CONTROLS: ‹ dots › — hidden on desktop */}
                <div className="flex items-center gap-s32 lg:hidden">
                  {/* Prev arrow */}
                  <button className="arrow-btn" onClick={goPrev} aria-label="Previous">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>

                  {/* Dots */}
                  <div className="flex gap-[8px] items-center">
                    {processData.steps.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => goTo(i)}
                        className={`rounded-full transition-all duration-300 ${
                          active === i
                            ? "w-[8px] h-[8px] bg-main scale-125"
                            : "w-[6px] h-[6px] bg-gray-300"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Next arrow */}
                  <button className="arrow-btn" onClick={goNext} aria-label="Next">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M5 2L10 7L5 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>

              </div>

              {/* DOTS — desktop only, vertical */}
              <div className="order-2 lg:order-1 hidden lg:flex lg:flex-col gap-[12px] items-center">
                {processData.steps.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    className={`w-s8 h-s8 rounded-full transition-all duration-300 ${
                      active === i ? "bg-main scale-125" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
}