"use client"

import Link from "next/link"
import Image from "next/image"
import { footerData } from "@/Data/footerLinks"

export default function Footer() {
  return (
    <footer className="bg-primary-main text-white">

      {/* ================= TOP SECTION ================= */}
      <div className="px-6 md:px-12 lg:px-20 py-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-10">

          {/* Logo */}
          <div className="md:col-span-1">
            <Image
              src="/Images/footer.svg"
              alt="Ayansh Logo"
              width={200}
              height={200}
            />
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 body-default text-gray-200">
              {footerData.services.map((item, index) => (
                <li key={index}>
                  <Link href={item.href} className="hover:text-white transition">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 body-default text-gray-200">
              {footerData.company.map((item, index) => (
                <li key={index}>
                  <Link href={item.href} className="hover:text-white transition">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-semibold mb-4">Social Links</h4>
            <ul className="space-y-2 body-default text-gray-200">
              {footerData.social.map((item, index) => (
                <li key={index}>
                  <Link href={item.href} className="hover:text-white transition">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <p className="body-default text-gray-200 leading-relaxed">
              Location: {footerData.contact.address}
            </p>
          </div>

        </div>
      </div>

      {/* ================= BOTTOM BAR ================= */}
      <div className="border-t border-secondary-main py-6 px-s6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm text-gray-200 gap-4">
          <p>© 2026 Ayansh Elevating Lives. All rights reserved.</p>

          <div className="flex gap-6">
            <Link href="#" className="hover:text-white transition">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-white transition">
              Terms & Condition
            </Link>
          </div>
        </div>
      </div>

    </footer>
  )
}
