"use client";
import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import {
  ArrowLeft, MapPin, BedDouble, Bath, Maximize,
  Building2, Car, Compass, Calendar, Sofa,
  ChevronLeft, ChevronRight, Check, X,
} from "lucide-react";
import LeadModal from "@/Components/lead";

const CMS_API = process.env.NEXT_PUBLIC_CMS_URL || "";

const formatPrice = (n) => {
  if (!n) return "—";
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(2)} Cr`;
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)} Lac`;
  return `₹${n.toLocaleString("en-IN")}`;
};

export default function PropertyDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const [p, setP] = useState(null);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(0);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${CMS_API}/api/properties?id=${id}`);
        const data = await res.json();
        if (res.ok) setP(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const imgs = p?.images || [];
  const total = imgs.length;
  const next = useCallback(() => setActive((i) => (i + 1) % total), [total]);
  const prev = useCallback(() => setActive((i) => (i - 1 + total) % total), [total]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [next, prev]);

  const propertyForModal = p
    ? {
        id: p._id,
        title: p.title,
        location: p.location,
        price: formatPrice(p.price),
        type: p.propertyType,
      }
    : {};

  /* ── Loading ── */
  if (loading) {
    return (
      <main className="min-h-screen bg-background">
        <div className="max-w-6xl mx-auto px-s32 md:px-s64 py-s80">
          <div className="animate-pulse space-y-s24">
            <div className="h-5 w-32 bg-secondary-light rounded" />
            <div className="w-full aspect-[16/9] bg-secondary-light rounded-r24" />
            <div className="h-8 w-2/3 bg-secondary-light rounded" />
            <div className="h-5 w-1/3 bg-secondary-light rounded" />
          </div>
        </div>
      </main>
    );
  }

  /* ── Not found ── */
  if (!p) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Building2 size={48} className="mx-auto text-secondary-light mb-s16" />
          <h2 className="heading-h4 text-main mb-s8">Property not found</h2>
          <button onClick={() => router.push("/properties")}
            className="caption text-primary-main font-semibold hover:underline">
            ← Back to properties
          </button>
        </div>
      </main>
    );
  }

  const specs = [
    { icon: BedDouble, label: "Bedrooms", value: p.bedrooms },
    { icon: Bath, label: "Bathrooms", value: p.bathrooms },
    { icon: Maximize, label: "Area", value: p.area, suffix: " sqft" },
    { icon: Car, label: "Parking", value: p.parking, suffix: " spots" },
    { icon: Compass, label: "Facing", value: p.facing },
    { icon: Sofa, label: "Furnishing", value: p.furnishing },
    { icon: Calendar, label: "Year Built", value: p.yearBuilt },
    { icon: Building2, label: "Type", value: p.propertyType },
  ].filter((s) => s.value && s.value !== 0 && s.value !== "");

  return (
    <main className="min-h-screen bg-background">
      {/* ── Back ── */}
      <div className="max-w-6xl mx-auto px-s32 md:px-s64 pt-s104 sm:pt-[120px]">
        <button
          onClick={() => router.push("/properties")}
          className="flex items-center gap-2 caption text-secondary hover:text-primary-main transition-colors font-medium"
        >
          <ArrowLeft size={14} /> All Properties
        </button>
      </div>

      {/* ══ MAIN CAROUSEL ══ */}
      <div className="max-w-6xl mx-auto px-s32 md:px-s64 mt-s16 sm:mt-s32">
        <div className="relative rounded-r24 overflow-hidden bg-secondary-light aspect-[16/10] sm:aspect-[16/8]">
          <Image
            src={imgs[active] || p.featuredImage || "/placeholder.jpg"}
            alt={p.title}
            fill
            className="object-cover transition-opacity duration-500"
            priority
          />

          {/* Arrows */}
          {total > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors shadow-lg"
              >
                <ChevronLeft size={20} className="text-main" />
              </button>
              <button
                onClick={next}
                className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors shadow-lg"
              >
                <ChevronRight size={20} className="text-main" />
              </button>
            </>
          )}

          {/* Counter */}
          {total > 1 && (
            <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-black/50 backdrop-blur-sm rounded-r8 caption text-white font-medium">
              {active + 1} / {total}
            </div>
          )}

          {/* Dots */}
          {total > 1 && total <= 8 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
              {imgs.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === active
                      ? "bg-white w-6"
                      : "bg-white/40 w-2 hover:bg-white/60"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* ── EXTRA IMAGES GRID ── */}
        {total > 1 && (
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 sm:gap-3 mt-3">
            {imgs.map((img, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`relative aspect-square rounded-r8 sm:rounded-r16 overflow-hidden transition-all ${
                  i === active
                    ? "ring-2 ring-primary-main ring-offset-2"
                    : "opacity-60 hover:opacity-100"
                }`}
              >
                <Image
                  src={img}
                  alt={`${p.title} ${i + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ══ CONTENT ══ */}
      <div className="max-w-6xl mx-auto px-s32 md:px-s64 py-s40 sm:py-s64">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-s40 lg:gap-s64">
          {/* ── LEFT ── */}
          <div className="lg:col-span-2 space-y-s40">
            {/* Title */}
            <div>
              {p.propertyType && (
                <span className="caption text-primary-main font-semibold uppercase tracking-[0.15em] mb-s8 block capitalize">
                  {p.propertyType}
                </span>
              )}
              <h1
                className="text-main mb-s8"
                style={{
                  fontFamily: "var(--font-secondary)",
                  fontSize: "clamp(1.5rem, 2vw + 1rem, 2.4rem)",
                  fontWeight: 400,
                  lineHeight: 1.15,
                }}
              >
                {p.title}
              </h1>
              <p className="body-default text-secondary flex items-center gap-2">
                <MapPin size={15} className="shrink-0 text-primary-light" />
                {p.location}
              </p>
            </div>

            {/* Specs */}
            {specs.length > 0 && (
              <div>
                <h3 className="heading-h6 text-main mb-s16">Specifications</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-s8 sm:gap-s16">
                  {specs.map(({ icon: Icon, label, value, suffix }) => (
                    <div key={label} className="p-s16 bg-secondary-light rounded-r16 text-center">
                      <Icon size={18} className="mx-auto text-primary-main mb-s8" />
                      <p className="body-default text-main font-semibold capitalize">
                        {typeof value === "number" ? value.toLocaleString("en-IN") : value}
                        {suffix || ""}
                      </p>
                      <p className="caption text-secondary mt-1">{label}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            <div>
              <h3 className="heading-h6 text-main mb-s12">About</h3>
              <p className="body-default text-secondary leading-[1.8] whitespace-pre-wrap">
                {p.description}
              </p>
            </div>

            {/* Amenities */}
            {p.amenities?.length > 0 && (
              <div>
                <h3 className="heading-h6 text-main mb-s16">Amenities</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-s8">
                  {p.amenities.map((a) => (
                    <div key={a} className="flex items-center gap-s8 body-default text-secondary py-s6">
                      <div className="w-5 h-5 rounded-full bg-primary-main/10 flex items-center justify-center shrink-0">
                        <Check size={10} className="text-primary-main" />
                      </div>
                      {a}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── RIGHT: STICKY CARD ── */}
          <div className="lg:col-span-1">
            <div className="sticky top-s24 bg-white border border-secondary-light rounded-r24 overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.04)]">
              {/* Price header */}
              <div className="bg-primary-main p-s24">
                <p className="caption text-primary-light/70 uppercase tracking-wider mb-1">
                  Price
                </p>
                <p
                  className="text-on-primary"
                  style={{
                    fontFamily: "var(--font-secondary)",
                    fontSize: "clamp(1.4rem, 1vw + 1.2rem, 2rem)",
                  }}
                >
                  {formatPrice(p.price)}
                </p>
              </div>

              <div className="p-s24 space-y-s16">
                {/* Status */}
                <span
                  className={`inline-block caption px-3 py-1 rounded-r8 font-semibold capitalize ${
                    p.status === "available"
                      ? "bg-green-50 text-green-700 border border-green-200"
                      : p.status === "sold"
                      ? "bg-red-50 text-red-600 border border-red-200"
                      : "bg-blue-50 text-blue-600 border border-blue-200"
                  }`}
                >
                  {p.status}
                </span>

                {/* Quick specs */}
                <div className="space-y-s12 pb-s16 border-b border-secondary-light">
                  {p.bedrooms > 0 && (
                    <Row icon={BedDouble} label="Bedrooms" value={p.bedrooms} />
                  )}
                  {p.bathrooms > 0 && (
                    <Row icon={Bath} label="Bathrooms" value={p.bathrooms} />
                  )}
                  {p.area > 0 && (
                    <Row icon={Maximize} label="Area" value={`${p.area.toLocaleString("en-IN")} sqft`} />
                  )}
                </div>

                {/* Book Call */}
                <button
                  onClick={() => setModal(true)}
                  className="w-full py-s16 bg-primary-main text-on-primary rounded-r16 heading-h6 hover:opacity-90 transition-opacity"
                >
                  Book Call
                </button>

                <p className="caption text-secondary text-center">
                  We'll contact you within 30 mins
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── MOBILE STICKY CTA ── */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-secondary-light px-s24 py-s16 z-40 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <div className="flex items-center justify-between max-w-lg mx-auto">
          <div>
            <p className="caption text-secondary">Price</p>
            <p
              className="text-primary-main font-semibold"
              style={{ fontFamily: "var(--font-secondary)", fontSize: "1.2rem" }}
            >
              {formatPrice(p.price)}
            </p>
          </div>
          <button
            onClick={() => setModal(true)}
            className="px-s32 py-s12 bg-primary-main text-on-primary rounded-r16 heading-h6 hover:opacity-90 transition-opacity"
          >
            Book Call
          </button>
        </div>
      </div>

      {/* Add bottom padding for mobile sticky CTA */}
      <div className="lg:hidden h-20" />

      {/* Modal */}
      <LeadModal
        isOpen={modal}
        onClose={() => setModal(false)}
        property={propertyForModal}
      />
    </main>
  );
}

function Row({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center justify-between">
      <span className="caption text-secondary flex items-center gap-s8">
        <Icon size={14} className="text-primary-light" /> {label}
      </span>
      <span className="caption text-main font-semibold capitalize">{value}</span>
    </div>
  );
}