"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/Components/Navbar";

export default function ClientLayout({ children }) {
  const pathname = usePathname();

  const getThemeData = () => {
    if (pathname.startsWith("/infra"))
      return { theme: "theme-infra", logo: "/Infra/logo.png" };

    if (pathname.startsWith("/civil"))
      return { theme: "theme-civil", logo: "/Civil/logo.png" };

    if (pathname.startsWith("/builders"))
      return { theme: "theme-builders", logo: "/Builder/logo.png" };

    if (pathname.startsWith("/elevating"))
      return { theme: "theme-elevating", logo: "/logo2.png" };

    return { theme: "theme-default", logo: "/logo2.png" };
  };

  const { theme, logo } = getThemeData();

  return (
    <div className={`${theme}  text-main transition-all duration-300`}>
      <Navbar logo={logo} />
      <main className="min-h-screen">{children}</main>
    </div>
  );
}