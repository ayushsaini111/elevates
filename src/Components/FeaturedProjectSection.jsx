"use client";

import Image from "next/image";
import Button from "./ui/Button";
import { useEffect, useState } from "react";
import ContactModal from "./ContactModal";

export default function FeaturedProjectSection() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
 const [show, setShow] = useState(false);
  // ✅ FETCH
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `/api/map`
        );
        const result = await res.json();

        // 👉 take latest (already sorted)
        setData(result[0]);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="py-s104 px-s24 md:px-s64 xl:px-0 md:py-s160 bg-secondary-light">
      <div className="max-w-7xl mx-auto">

        {/* TOP CARD */}
        <div className="bg-white rounded-r40 p-s24 shadow-sm">

          <div className="grid md:grid-cols-3 gap-s24">

            {/* LEFT IMAGE */}
            <div className="md:col-span-2 relative rounded-r24 overflow-hidden">

              {loading ? (
                <div className="w-full h-[400px] bg-gray-200 animate-pulse rounded-r24" />
              ) : (
                <>
                  <Image
                    src={data?.image}
                    alt="Project Layout"
                    width={1200}
                    height={800}
                    className="w-full h-full object-cover rounded-r24"
                  />

                  <div className="absolute top-0 left-0 bg-primary-main text-white border-b-10 border-r-10 border-white px-s24 py-s16 rounded-br-r40 body-default">
                    {data?.title}
                  </div>
                </>
              )}
            </div>

            {/* RIGHT CARD */}
            <div className="md:col-span-1 bg-primary-main text-white rounded-r24 p-s32 flex flex-col">

              <h3 className="heading-h4 font-semibold mb-s16">
                Starting Price
              </h3>

              {loading ? (
                <div className="h-6 w-32 bg-white/30 animate-pulse rounded mb-s64" />
              ) : (
                <p className="mb-s64 opacity-90">
                  {data?.price}
                </p>
              )}

              <ul className="space-y-s8 body-default opacity-90">
                {loading
                  ? Array.from({ length: 3 }).map((_, i) => (
                      <li key={i} className="h-4 bg-white/30 rounded animate-pulse" />
                    ))
                  : data?.points?.map((item, index) => (
                      <li key={index}>• {item}</li>
                    ))}
              </ul>
            </div>
          </div>

          {/* LOCATION BAR */}
          <div className="mt-s32 bg-secondary-light rounded-r24 p-s24 flex flex-col justify-between gap-s16">

            <div>
              <h4 className="font-semibold text-main mb-1">Location</h4>

              {loading ? (
                <div className="h-4 w-40 bg-gray-200 animate-pulse rounded" />
              ) : (
                <p className="text-secondary text-sm">
                  {data?.location || "Kanpur, Uttar Pradesh"}
                </p>
              )}
            </div>

            <div className="flex justify-end gap-s16">
        <a
  href={data?.image?.replace("/upload/", "/upload/fl_attachment/")}
  className="text-primary-main font-medium"
>
  Download Brochure
</a>

              <Button  onClick={() => setShow(true)}>
                Schedule Visit
              </Button>
            </div>
          </div>

        </div>

        {/* VIDEO */}
        <div className="mt-s80 md:mt-s104 rounded-r32 overflow-hidden border-8 border-secondary-main">

          {loading ? (
            <div className="w-full h-[500px] bg-gray-200 animate-pulse" />
          ) : (
            <video
              src={data?.video}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-[500px] object-cover"
            />
          )}

        </div>

      </div>
            <ContactModal isOpen={show} onClose={() => setShow(false)} />
      
    </section>
  );
}