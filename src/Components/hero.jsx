"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

export default function Hero() {
  const [hero, setHero] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/hero")
      .then((res) => res.json())
      .then((data) => {
        setHero(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="relative w-full h-[90vh] lg:h-screen bg-gray-100 animate-pulse rounded-r32 lg:rounded-r40 my-[90px] overflow-hidden" />
    );
  }

  if (!hero) {
    return null; // or fallback hero
  }

  return (
    <section className="relative h-[90vh] lg:h-screen  xl:mx-s40 overflow-hidden mt-[90px] md:mt-s104  rounded-r32 lg:rounded-r40 ">
      {/* ── BACKGROUND MEDIA ── */}
      {hero.mediaType === "video" ? (
        <video
          src={hero.media}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          poster="/fallback-hero.jpg" // optional fallback image while video loads
        />
      ) : (
        <Image
          src={hero.media}
          alt="Hero Banner"
          fill
          priority
          quality={95}
          className="object-cover"
          sizes="100vw"
        />
      )}

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/30" />

      {/* ── CONTENT ── */}
      <div className="relative z-10 flex items-center justify-center h-full text-center px-s24">
        <div className="max-w-lg md:max-w-5xl">
          <h1 className="heading-h1 text-white drop-shadow-2xl">
            A Peaceful Journey from Land{" "}
            <span className="heading-h3 underline decoration-white/70 underline-offset-8 pb-2 block md:inline">
              to
            </span>{" "}
            Home
          </h1>
        </div>
      </div>

      {/* Optional bottom fade */}
    </section>
  );
}