"use client";
import { RotateCcw,Play,Pause  } from 'lucide-react';
import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { civilData } from "@/Data/civil";

const CARD_WIDTH    = 896;
const GAP           = 8;
const AUTO_INTERVAL = 4500;
const RESUME_DELAY  = 4500;

// ── SVG ring constants (computed once, not on every render) ──
const R = 19;
const C = 2 * Math.PI * R; // correct circumference

export default function ProjectsCarousel() {
  const { title, subtitle, list } = civilData.projects;
  const LAST = list.length - 1;

  const sectionRef     = useRef(null);
  const trackRef       = useRef(null);
  const dragStart      = useRef(null);
  const dragScroll     = useRef(0);
  const resumeTimer    = useRef(null);
  const intervalRef    = useRef(null);   // keep interval id stable

  const [active,     setActive]     = useState(0);
  const [isPaused,   setIsPaused]   = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [progress,   setProgress]   = useState(0);   // 0–100
  const [hasStarted, setHasStarted] = useState(false);

  /* ─── derived ─── */
  const isFirst = active === 0;
  const isLast  = active === LAST;

  /* ─── scroll to index ─── */
const scrollToIndex = useCallback((index) => {
  const track = trackRef.current;
  if (!track) return;

  const card = track.children[index];
  if (!card) return;

  const trackCenter = track.offsetWidth / 2;
  const cardCenter = card.offsetLeft + card.offsetWidth / 2;

  track.scrollTo({
    left: cardCenter - trackCenter,
    behavior: "smooth",
  });

  // ❌ REMOVE this:
  // setActive(index);
}, []);
  /* ─── navigation (no loop) ─── */
const goNext = useCallback(() => {
  if (active >= LAST) {
    setIsPaused(true);
    return;
  }

  const next = active + 1;
  scrollToIndex(next); // ✅ ONLY this
}, [active, LAST, scrollToIndex]);

 const goPrev = useCallback(() => {
  if (active <= 0) return;

  const prevIndex = active - 1;
  scrollToIndex(prevIndex); // ✅ ONLY this
}, [active, scrollToIndex]);

  /* ─── IntersectionObserver: start on first view ─── */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
          setIsPaused(false);
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [hasStarted]);
// ⏱ progress animation (smooth fill)
useEffect(() => {
  if (isPaused) return;

  let start = Date.now();

  const tick = () => {
    const elapsed = Date.now() - start;
    const percent = Math.min((elapsed / AUTO_INTERVAL) * 100, 100);

    setProgress(percent);

    if (percent < 100) {
      requestAnimationFrame(tick);
    }
  };

  requestAnimationFrame(tick);

  return () => setProgress(0);
}, [active, isPaused]);
  /* ─── Auto-play + progress tick ─── */
useEffect(() => {
  clearInterval(intervalRef.current);

  if (isPaused) return;

  intervalRef.current = setInterval(() => {
    setActive((prev) => {
      if (prev >= LAST) {
        setIsPaused(true);
        return prev;
      }

      const next = prev + 1;
      scrollToIndex(next); // 🔥 direct scroll
      return next;
    });
  }, AUTO_INTERVAL);

  return () => clearInterval(intervalRef.current);
}, [isPaused, LAST, scrollToIndex]);
  /* ─── Sync active on manual scroll ─── */
useEffect(() => {
  const track = trackRef.current;
  if (!track) return;

  let raf;

  const onScroll = () => {
    cancelAnimationFrame(raf);

    raf = requestAnimationFrame(() => {
      const center = track.scrollLeft + track.offsetWidth / 2;

      let closest = 0;
      let min = Infinity;

      Array.from(track.children).forEach((child, i) => {
        const childCenter =
          child.offsetLeft + child.offsetWidth / 2;

        const dist = Math.abs(center - childCenter);

        if (dist < min) {
          min = dist;
          closest = i;
        }
      });

      setActive(closest);
    });
  };

  track.addEventListener("scroll", onScroll);

  return () => track.removeEventListener("scroll", onScroll);
}, []);

  /* ─── Temp-pause on user interaction ─── */
  const tempPause = useCallback(() => {
    setIsPaused(true);
    clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => {
      // Only resume if not at last card
      setActive((cur) => {
        if (cur < LAST) setIsPaused(false);
        return cur;
      });
    }, RESUME_DELAY);
  }, [LAST]);

  /* ─── Play / Pause / Restart toggle ─── */
  const togglePlay = useCallback(() => {
    clearTimeout(resumeTimer.current);
    if (isLast && isPaused) {
      // ✅ Restart from beginning
      scrollToIndex(0);
      setProgress(0);
      // small delay so scroll settles before timer kicks in
      setTimeout(() => setIsPaused(false), 350);
    } else {
      setIsPaused((p) => !p);
    }
  }, [isLast, isPaused, scrollToIndex]);

  /* ─── Drag handlers ─── */
  const onMouseDown = (e) => {
    setIsDragging(true);
    dragStart.current = e.pageX;
    dragScroll.current = trackRef.current.scrollLeft;
    tempPause();
  };
  const onMouseMove = (e) => {
    if (!isDragging) return;
    trackRef.current.scrollLeft = dragScroll.current - (e.pageX - dragStart.current);
  };
  const onMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const idx = Math.round(trackRef.current.scrollLeft / (CARD_WIDTH + GAP));
    scrollToIndex(Math.min(Math.max(idx, 0), LAST));
  };

  /* ─── Ring dashoffset ─── */
  const ringOffset = isPaused ? C : ((100 - progress) / 100) * C;

  return (
    <section ref={sectionRef} className="w-full py-s104 lg:py-s160 overflow-hidden">

      {/* Heading */}
      <div className="text-center space-y-s32 px-s16 sm:px-s24 mb-s64">
        <h2 className="civil-h1 text-main">{title}</h2>
        <p className="heading-h6 text-secondary px-s8 max-w-2xl mx-auto">{subtitle}</p>
      </div>

      {/* Image Track */}
      <div
        ref={trackRef}
        className="flex gap-s16 px-s16 overflow-x-auto hide-scrollbar scroll-smooth px-[calc(50%-448px)] select-none"
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        {list.map((item, i) => (
          <div
            key={i}
            onClick={() => { scrollToIndex(i); tempPause(); }}
            className={`
              flex-shrink-0 transition-all duration-500
              w-[90vw] sm:w-[65vw] lg:w-[896px]
              ${i === active ? "opacity-100 scale-100" : "opacity-80 scale-[0.93]"}
            `}
          >
            <div className="relative h-[260px] sm:h-[340px] md:h-[420px] lg:h-[560px] rounded-r24 overflow-hidden">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
                draggable={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              <div className="absolute bottom-s16 right-s16 bg-white/20 backdrop-blur-sm text-white px-s16 py-s8 caption rounded-r16 border border-white/30">
                {item.title}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Text area — fades in-place */}
      <div className="mt-s24 px-s24 max-w-[896px] mx-auto">
        <div className="relative h-[100px]">
          {list.map((item, i) => (
            <div
              key={i}
              aria-hidden={i !== active}
              className={`
                absolute inset-0 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-s16
                transition-all duration-500
                ${i === active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"}
              `}
            >
              <h4 className="heading-h5 text-main max-w-xs">{item.title}</h4>
              <p className="body-default text-secondary max-w-xs">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-s24 mt-s24">

        {/* Prev */}
        <button
          onClick={() => { goPrev(); tempPause(); }}
          disabled={isFirst}
          aria-label="Previous"
          className={`
            w-10 h-10 rounded-full border flex items-center justify-center transition-all
            ${isFirst
              ? "border-secondary/15 text-secondary/25 cursor-not-allowed"
              : "border-secondary/30 text-secondary hover:text-main hover:border-primary-main"}
          `}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Dots */}
        <div className="flex gap-s8 items-center">
          {list.map((_, i) => (
            <button
              key={i}
              onClick={() => { scrollToIndex(i); tempPause(); }}
              aria-label={`Go to slide ${i + 1}`}
              className={`
                rounded-full transition-all duration-300
                ${i === active
                  ? "bg-primary-main w-6 h-[6px]"
                  : "bg-secondary/40 w-[6px] h-[6px] hover:bg-secondary"}
              `}
            />
          ))}
        </div>

        {/* Next */}
        <button
          onClick={() => { goNext(); tempPause(); }}
          disabled={isLast}
          aria-label="Next"
          className={`
            w-10 h-10 rounded-full border flex items-center justify-center transition-all
            ${isLast
              ? "border-secondary/15 text-secondary/25 cursor-not-allowed"
              : "border-secondary/30 text-secondary hover:text-main hover:border-primary-main"}
          `}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Play / Pause / Restart */}
        <button
          onClick={togglePlay}
          aria-label={isLast && isPaused ? "Restart" : isPaused ? "Play" : "Pause"}
          className="relative w-10 h-10 flex items-center justify-center group"
        >
          {/* Progress ring */}
          <svg
            width="40" height="40"
            viewBox="0 0 40 40"
            className="absolute inset-0 -rotate-90"
            aria-hidden
          >
            <circle cx="20" cy="20" r={R} fill="none" stroke="currentColor"
              strokeWidth="2" className="text-secondary/20" />
            <circle cx="20" cy="20" r={R} fill="none" stroke="currentColor"
              strokeWidth="2" strokeLinecap="round"
              strokeDasharray={C}
              strokeDashoffset={ringOffset}
              className="text-primary-main transition-[stroke-dashoffset] duration-[30ms]"
            />
          </svg>

          {/* Icon: Restart / Play / Pause */}
          <span className="relative z-10 text-main group-hover:text-primary-main transition-colors">
            {isLast && isPaused ? (
              // Restart
              <RotateCcw width={"15"}/>
            ) : isPaused ? (
              // Play
              <Play width={"15"} />
            ) : (
              // Pause
           <Pause width={"15"} />
            )}
          </span>
        </button>

      </div>
    </section>
  );
}