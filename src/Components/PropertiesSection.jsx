"use client";
import { useEffect, useState } from "react";
import { homePage } from "../Data/homePage";
import PropertyCard from "@/Components/ui/PropertyCard";
import Button from "./ui/Button";

const CMS_API = process.env.NEXT_PUBLIC_BASE_URL || "";

export default function PropertiesSection() {
  const { propertiesSection } = homePage;
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        // ✅ Homepage: only showOnFrontend=true
        const res = await fetch(`/api/properties?public=true`);
        const data = await res.json();
        setProperties(
          (Array.isArray(data) ? data : []).map((item) => ({
            id: item._id,
            title: item.title,
            price: item.price,
            location: item.location,
            type: item.propertyType?.toUpperCase(),
            propertyType: item.propertyType,
            area: item.area ? `${item.area} sq.ft` : "",
            areaNum: item.area || 0,
            bedrooms: item.bedrooms || 0,
            bathrooms: item.bathrooms || 0,
            image: item.featuredImage || item.images?.[0],
          }))
        );
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <section className="py-s80 md:py-s160 px-s32 md:px-s64 xl:px-0">
      <div className="max-w-7xl mx-auto">
        <div className="mb-s80">
          <h2 className="heading-h2 text-main">{propertiesSection.headingTop}</h2>
          <h3 className="heading-h2 text-main uppercase">
            <span className="heading-h3 text-primary-main">{propertiesSection.highlight}</span>
            {propertiesSection.headingBottom}
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-s32 md:gap-x-s40 gap-y-s64 md:gap-y-s80">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
            : properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
        </div>

        <div className="mt-s64 text-center">
          <Button as="link" href="/properties">View All Properties</Button>
        </div>
      </div>
    </section>
  );
}

function SkeletonCard() {
  return (
    <div className="animate-pulse">
      <div className="w-full h-[280px] bg-secondary-light rounded-r24" />
      <div className="pt-s24 px-s16 space-y-s8">
        <div className="h-5 w-1/3 bg-secondary-light rounded" />
        <div className="h-4 w-3/4 bg-secondary-light rounded" />
        <div className="h-4 w-1/2 bg-secondary-light rounded" />
        <div className="flex justify-between pt-s16">
          <div className="h-9 w-24 bg-secondary-light rounded-full" />
          <div className="h-4 w-20 bg-secondary-light rounded" />
        </div>
      </div>
    </div>
  );
}