"use client";
import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Button from "@/Components/ui/Button";
import { navItems } from "@/Data/Navlinks";
import Image from "next/image";

export default function Navbar({ logo }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href) => {
    if (href === "/") return pathname === "/"; // exact match for home
    return pathname.startsWith(href);
  };
// 👇 ADD THIS inside component

  return (
    <>
      {/* NAVBAR */}
      <header className="fixed top-4 md:top-5 left-0 w-full z-[100]">
        <div className="mx-auto max-w-7xl px-s16 ">
          <div
            className={`
          flex items-center justify-between 
          bg-secondary-light/90 rounded-r40 px-s16 py-s8
        `}
          >
            {/* LOGO */}
            <Link
              href={"/"}>
              <div className="w-10 h-10 rounded-full overflow-hidden bg-white flex items-center justify-center">
                <Image
                  src={logo}
                  alt="logo"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
            </Link>


            {/* DESKTOP NAV */}
            <div className="hidden lg:flex items-center gap-s8 bg-white rounded-r40 p-s6">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                px-s16 py-s8 rounded-r40 text-sm font-medium transition-all duration-300
                ${isActive(item.href)
                      ? pathname.startsWith("/civil")
                        ? "bg-primary-main text-black"
                        : "bg-primary-main text-white"
                      : "text-secondary hover:bg-secondary-light"
                    }
              `}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* CTA */}
            <div className="hidden lg:block">
              <Button as="link" href="/comingsoon">
                Book a visit
              </Button>
            </div>

            {/* MOBILE BUTTON */}
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden text-xl"
            >
              {open ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE DRAWER (NOW TRULY BEHIND) */}
      <div
        className={`
      fixed top-0 left-0 h-screen w-[100%] bg-background z-[90]
      transform transition-transform duration-300 ease-in-out
      ${open ? "translate-x-0" : "-translate-x-full"}
    `}
      >
        <div className="p-s16 pt-[100px] flex flex-col h-full shadow-xl border-r border-secondary-light">

          {/* LINKS */}
          <div className="flex flex-col space-y-s8 gap-s12">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`
              px-s16 py-s16 rounded-r24 text-sm font-medium transition
                 ${isActive(item.href)
                      ? pathname.startsWith("/civil")
                        ? "bg-primary-main text-black"
                        : "bg-primary-main text-white"
                      : "text-secondary hover:bg-secondary-light"
                    }
            `}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-auto pb-s16">
            <Button
              as="link"
              href="/comingsoon"
              className="w-full justify-center"
            >
              Book a visit
            </Button>
          </div>
        </div>
      </div>

      {/* OVERLAY */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/30 z-[80]"
        />
      )}
    </>
  );
}