"use client";
import { useState } from "react";
import ContactModal from "@/Components/ContactModal";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Button from "@/Components/ui/Button";
import { navItems } from "@/Data/Navlinks";
import Image from "next/image";

export default function Navbar({ logo }) {
  const pathname = usePathname();
  const [show, setShow] = useState(false);   // ← contact modal
  const [open, setOpen] = useState(false);   // ← mobile drawer

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* ══ NAVBAR ══ */}
      <header className="fixed top-4 md:top-5 left-0 w-full z-[100]">
        <div className="mx-auto max-w-7xl px-s16 xl:px-0">
          <div className="flex items-center justify-between bg-secondary-light rounded-r40 px-s16 py-s8">
            {/* LOGO */}
            <Link href="/">
              <div className="w-10 h-10 rounded-full overflow-hidden border-3 border-white bg-white flex items-center justify-center">
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
                  className={`px-s16 py-s8 rounded-r40 text-sm font-medium transition-all duration-300 ${
                    isActive(item.href)
                      ? pathname.startsWith("/civil")
                        ? "bg-primary-main text-black"
                        : "bg-primary-main text-white"
                      : "text-secondary hover:bg-secondary-light"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* ✅ FIX: Desktop CTA — removed as="link", no href */}
            <div className="hidden lg:block">
              <Button onClick={() => setShow(true)}>
                Book a visit
              </Button>
            </div>

            {/* MOBILE BUTTON */}
        <button
  onClick={() => setOpen(!open)}
  className="lg:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1"
>
  <span
    className={`block h-1 w-6 bg-primary-main border border-primary-main rounded-full transition-all duration-300 ${
      open ? "rotate-45 translate-y-2" : ""
    }`}
  />
  <span
    className={`block h-1 w-6 bg-primary-main border border-primary-main rounded-full transition-all duration-300 ${
      open ? "opacity-0" : ""
    }`}
  />
  <span
    className={`block h-1 w-6 bg-primary-main border border-primary-main rounded-full transition-all duration-300 ${
      open ? "-rotate-45 -translate-y-2" : ""
    }`}
  />
</button>
          </div>
        </div>
      </header>

      {/* ══ MOBILE DRAWER ══ */}
      <div
        className={`fixed top-0 left-0 h-screen w-full bg-background z-[90] transform transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-s16 pt-[100px] flex flex-col h-full shadow-xl border-r border-secondary-light">
          {/* LINKS */}
          <div className="flex flex-col space-y-s8 gap-s12">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`px-s16 py-s16 rounded-r24 text-sm font-medium transition ${
                  isActive(item.href)
                    ? pathname.startsWith("/civil")
                      ? "bg-primary-main text-black"
                      : "bg-primary-main text-white"
                    : "text-secondary hover:bg-secondary-light"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* ✅ FIX: Mobile CTA — close drawer first, then open modal */}
          <div className="mt-auto pb-s16">
            <Button
              onClick={() => {
                setOpen(false);       // close drawer
                setTimeout(() => setShow(true), 300); // open modal after drawer animation
              }}
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

      {/* ✅ FIX: ContactModal uses `show` state, not `open` */}
      <ContactModal isOpen={show} onClose={() => setShow(false)} />
    </>
  );
}