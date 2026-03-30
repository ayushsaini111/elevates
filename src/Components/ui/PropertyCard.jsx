"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import LeadModal from "@/Components/lead";

const formatPrice = (n) => {
  if (!n) return "—";
  const num = typeof n === "string" ? parseInt(n.replace(/[^\d]/g, "")) : n;
  if (num >= 10000000) return `₹${(num / 10000000).toFixed(2)} Cr`;
  if (num >= 100000) return `₹${(num / 100000).toFixed(1)} Lac`;
  return `₹${num.toLocaleString("en-IN")}`;
};

export default function PropertyCard({ property }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="group bg-white rounded-r24 overflow-hidden hover:shadow-[0_8px_40px_rgba(0,0,0,0.08)] transition-all duration-300">
        {/* Image */}
        <Link href={`/properties/${property.id}`}>
          <div className="relative w-full h-[280px] overflow-hidden">
            <Image
              src={property.image || "/placeholder.jpg"}
              alt={property.location || "Property"}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            {/* Type badge */}
            {property.type && (
              <span className="absolute top-3 left-3 caption px-3 py-1 bg-white/90 backdrop-blur-sm text-main rounded-r8 font-medium">
                {property.type}
              </span>
            )}
            {property.status && property.status !== "available" && property.status !== "AVAILABLE" && (
              <span className="absolute top-3 right-3 caption px-3 py-1 bg-primary-main text-on-primary rounded-r8 font-semibold capitalize">
                {property.status}
              </span>
            )}
          </div>
        </Link>

        {/* Content */}
        <div className="p-s24 space-y-s8">
          <div className="flex items-baseline gap-2">
            <h3 className="heading-h4 font-semibold text-main">
              {formatPrice(property.price)}
            </h3>
            {property.area && (
              <span className="caption text-secondary">
                ({property.area})
              </span>
            )}
          </div>

          <Link href={`/properties/${property.id}`}>
            {property.title && (
              <p className="body-default text-main font-medium line-clamp-1 hover:text-primary-main transition-colors">
                {property.title}
              </p>
            )}
          </Link>

          <p className="caption text-secondary flex items-center gap-1.5">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" className="shrink-0 text-primary-light">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span className="truncate">{property.location}</span>
          </p>

          {/* Specs */}
          {(property.bedrooms > 0 || property.bathrooms > 0) && (
            <div className="flex items-center gap-3 caption text-secondary">
              {property.bedrooms > 0 && (
                <span>{property.bedrooms} Bed</span>
              )}
              {property.bathrooms > 0 && (
                <span>{property.bathrooms} Bath</span>
              )}
              {property.areaNum > 0 && (
                <span>{property.areaNum} sqft</span>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between pt-s16 border-t border-secondary-light">
            <button
              onClick={() => setOpen(true)}
              className="px-s24 py-s8 rounded-full bg-primary-main text-on-primary caption font-semibold hover:opacity-90 transition-opacity"
            >
              Book Call
            </button>
            <Link
              href={`/properties/${property.id}`}
              className="caption text-primary-main font-medium hover:text-primary-light transition-colors"
            >
              View Details →
            </Link>
          </div>
        </div>
      </div>

      <LeadModal
        isOpen={open}
        onClose={() => setOpen(false)}
        property={property}
      />
    </>
  );
}