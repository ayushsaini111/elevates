"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { navLinks } from "../Data/Navlinks";
import AnimatedIcon from "./ui/AnimatedGavelIcon";
import Button from "./ui/Button";
import { useState, useEffect, useRef } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [clickedPath, setClickedPath] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);


const [navHeight, setNavHeight] = useState(50);
const navBarRef = useRef(null);

useEffect(() => {
  if (navBarRef.current) {
    setNavHeight(navBarRef.current.offsetHeight);
  }
}, []);
  /* =============================
     FIXED ACTIVE LOGIC
  ============================= */
  const isActive = (href) => {
    if (clickedPath) return clickedPath === href;
    return pathname === href;
  };

  /* =============================
     NAVIGATION WITH ANIMATION
  ============================= */
  const handleNavigation = (e, href) => {
    e.preventDefault();
    setClickedPath(href);

    setTimeout(() => {
      window.location.href = href;
    }, 300);
  };

  /* =============================
     BODY LOCK ON MOBILE
  ============================= */
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [isMenuOpen]);

  return (
    <div className="flex items-center justify-center ">

    <nav className="fixed top-0 w-full z-50 ">
      <div ref={navBarRef}  className="flex bg-primary-main items-center justify-between px-s16 md:px-s40 py-s16 md:py-s8">

        {/* LEFT LOGO */}
        {/* LEFT LOGO */}
<div className="flex items-center ">

  {/* logo2 first in mobile */}
  <div onClick={(e) => handleNavigation(e, "/")} className="lg:hidden   bg-primary-main  flex items-center justify-center  ">
    <Image
      src="/logo3.svg"
      alt="Center Logo"
      width={155}
      height={94}
    />
  </div>

  <Link
    href="/"
    onClick={(e) => handleNavigation(e, "/")}
    className="hidden lg:flex items-center"
  >
    <Image
      src="/logo1.svg"
      alt="Ayansh Logo"
      width={90}
      height={30}
      className="lg:w-[130px]"
      priority
    />
  </Link>

</div>

        {/* DESKTOP NAV */}
        <ul className="hidden lg:flex items-center justify-around flex-1 max-w-4xl">

          {navLinks.map((item, index) => {

            if (item.type === "logo") {
              return (
                <li key={index} className="flex items-center justify-center">
                  <div onClick={(e) => handleNavigation(e, "/")} className="w-[70px] h-[70px] bg-primary-main rounded-full flex items-center  cursor-pointer justify-center border-3 border-white">
                    <Image
                    
                      src="/logo2.png"
                      alt="Center Logo"
                      width={50}
                      height={40}
                    />
                  </div>
                </li>
              );
            }

            return (
              <li key={item.href} className="relative">
                <Link
                  href={item.href}
                  onClick={(e) => handleNavigation(e, item.href)}
                  className={`
                    relative flex flex-col items-center
                    transition-colors duration-300
                    ${isActive(item.href)
                      ? "text-secondary-main"
                      : "text-background hover:text-secondary-light/80"}
                  `}
                >
                 <div className="text-center w-[115px]">
  <p className="text-xs  whitespace-nowrap">
    {item.title}
  </p>
  <p className="text-xs  whitespace-nowrap">
    {item.subtitle}
  </p>
</div>

<span
  className={`
    absolute left-1/2 -translate-x-1/2 -bottom-2
    h-[2px]
    bg-secondary-main rounded-full
    origin-center transform-gpu
    transition-transform duration-300 ease-out
    ${isActive(item.href)
      ? "scale-x-100 w-full"
      : "scale-x-0 w-full"}
  `}
/>

                </Link>
              </li>
            );
          })}
        </ul>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-s24">

          {/* Desktop Button */}
          <div className="hidden lg:block">
            <Button children="Book a visit"/>
            
          </div>

          {/* Mobile Hamburger */}
          <div className="lg:hidden">
            <AnimatedIcon
              isOpen={isMenuOpen}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            />
          </div>

        </div>
      </div>

      {/* MOBILE MENU */}
<div
  style={{ top: `${navHeight}px`, height: `calc(100vh - ${navHeight}px)` }}
  className={`
    fixed right-0
    w-[75%] max-w-sm
    bg-primary-light
    transform transition-transform duration-300 ease-in-out
    ${isMenuOpen ? "translate-x-0" : "translate-x-full"}
    z-40
    lg:hidden
  `}
>


  <div className="flex flex-col h-full px-s24 pb-s56 pt-s32">

    {navLinks
      .filter((item) => item.type !== "logo")
      .map((item) => (
        <Link
          key={item.href}
          href={item.href}
          onClick={(e) => {
            setIsMenuOpen(false);
            handleNavigation(e, item.href);
          }}
          className={`py-s16 border-b border-primary-main/40
            ${isActive(item.href)
              ? "text-primary-main"
              : "text-background"}
          `}
        >
          <p className="">{item.title}</p>
          <p className="">{item.subtitle}</p>
        </Link>
      ))}

    <div className="mt-auto pt-s32">
      <Button children="Book a visit" />
    </div>

  </div>
</div>

{isMenuOpen && (
  <div
    style={{ top: `${navHeight}px` }}
    className="fixed inset-x-0 bottom-0 bg-black/30 backdrop-blur-sm z-30 lg:hidden"
    onClick={() => setIsMenuOpen(false)}
  />
)}


    </nav>
    <div className="text-red-500 bg-primary-main p-s56 rounded-b-full top-1 hidden lg:block fixed z-[40]">

    </div>
    </div>
    
  );
}
