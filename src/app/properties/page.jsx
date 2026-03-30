"use client";
import { useEffect, useState, useMemo, useCallback } from "react";
import PropertyCard from "@/Components/ui/PropertyCard";
import { Search, SlidersHorizontal, X, ChevronDown, Building2 } from "lucide-react";

const CMS_API = process.env.NEXT_PUBLIC_CMS_URL || "";

const TYPES = [
  { value: "all", label: "All Types" },
  { value: "apartment", label: "Apartment" },
  { value: "villa", label: "Villa" },
  { value: "house", label: "House" },
  { value: "plot", label: "Plot" },
  { value: "commercial", label: "Commercial" },
  { value: "penthouse", label: "Penthouse" },
];

const PRICES = [
  { value: "all", label: "Any Price" },
  { value: "0-2500000", label: "Under ₹25 Lac" },
  { value: "2500000-5000000", label: "₹25 – ₹50 Lac" },
  { value: "5000000-10000000", label: "₹50 Lac – ₹1 Cr" },
  { value: "10000000-50000000", label: "₹1 – ₹5 Cr" },
  { value: "50000000-999999999", label: "₹5 Cr+" },
];

const SORTS = [
  { value: "newest", label: "Newest" },
  { value: "price-low", label: "Price ↑" },
  { value: "price-high", label: "Price ↓" },
];

export default function PropertiesPage() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("all");
  const [price, setPrice] = useState("all");
  const [sort, setSort] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        // ✅ Fetch ALL properties (no public filter)
        const res = await fetch(`${CMS_API}/api/properties`);
        const data = await res.json();
        setProperties(
          (Array.isArray(data) ? data : []).map((item) => ({
            id: item._id,
            title: item.title,
            price: item.price,
            priceRaw: item.price,
            location: item.location,
            type: item.propertyType?.toUpperCase(),
            propertyType: item.propertyType,
            area: item.area ? `${item.area} sq.ft` : "",
            areaNum: item.area || 0,
            bedrooms: item.bedrooms || 0,
            bathrooms: item.bathrooms || 0,
            status: item.status,
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

  const activeCount = [type !== "all", price !== "all", !!search].filter(Boolean).length;

  const filtered = useMemo(() => {
    let list = [...properties];

    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.title?.toLowerCase().includes(q) ||
          p.location?.toLowerCase().includes(q) ||
          p.propertyType?.toLowerCase().includes(q)
      );
    }

    if (type !== "all")
      list = list.filter((p) => p.propertyType === type);

    if (price !== "all") {
      const [min, max] = price.split("-").map(Number);
      list = list.filter((p) => p.priceRaw >= min && p.priceRaw <= max);
    }

    if (sort === "price-low") list.sort((a, b) => a.priceRaw - b.priceRaw);
    else if (sort === "price-high") list.sort((a, b) => b.priceRaw - a.priceRaw);

    return list;
  }, [properties, search, type, price, sort]);

  const clearAll = () => {
    setSearch("");
    setType("all");
    setPrice("all");
    setSort("newest");
  };

  return (
    <main className="min-h-screen bg-background">
      {/* ══ HERO ══ */}
      <section className="relative bg-primary-main overflow-hidden">
        <div className="absolute inset-0" style={{
          backgroundImage:
            "radial-gradient(circle at 25% 50%, rgba(255,255,255,0.06) 0%, transparent 50%)",
        }} />
        <div className="relative max-w-7xl mt-s32 mx-auto px-s32 md:px-s64 xl:px-0 pt-s80 pb-s104 sm:pt-s104 sm:pb-[140px]">
          <p className="caption text-primary-light uppercase tracking-[0.3em] mb-s8">
            Our Collection
          </p>
          <h1
            className="text-on-primary"
            style={{
              fontFamily: "var(--font-secondary)",
              fontSize: "clamp(2.2rem, 4vw + 1rem, 3.8rem)",
              fontWeight: 400,
              lineHeight: 1.1,
            }}
          >
            Properties
          </h1>
          <p className="body-large text-primary-light/70 mt-s8 max-w-lg">
            Find your perfect home from our curated listings
          </p>
        </div>
     
      </section>

      {/* ══ SEARCH + FILTERS ══ */}
      <section className="max-w-7xl mx-auto px-s24 md:px-s64 xl:px-0 -mt-8 relative z-10">
        <div className="bg-white rounded-r24 shadow-[0_8px_40px_rgba(0,0,0,0.06)] border border-secondary-light p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="relative flex-1">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-light" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, location..."
                className="w-full pl-12 pr-10 py-3.5 rounded-r16 bg-secondary-light text-main body-default placeholder:text-secondary/40 focus:ring-2 focus:ring-primary-main/15 outline-none transition-all border border-transparent focus:border-primary-main/15"
              />
              {search && (
                <button onClick={() => setSearch("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary hover:text-main">
                  <X size={16} />
                </button>
              )}
            </div>

            <button
              onClick={() => setShowFilters((v) => !v)}
              className={`flex items-center justify-center gap-2 px-6 py-3.5 rounded-r16 caption font-semibold transition-all shrink-0 ${
                showFilters || activeCount > 0
                  ? "bg-primary-main text-on-primary"
                  : "bg-secondary-light text-main hover:bg-secondary-main/15"
              }`}
            >
              <SlidersHorizontal size={15} />
              Filters
              {activeCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-white/20 text-[10px] flex items-center justify-center font-bold">
                  {activeCount}
                </span>
              )}
            </button>
          </div>

          {/* Filter panel */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-secondary-light grid grid-cols-1 sm:grid-cols-3 gap-4">
              <SelectField label="Type" value={type} onChange={setType} options={TYPES} />
              <SelectField label="Price" value={price} onChange={setPrice} options={PRICES} />
              <SelectField label="Sort" value={sort} onChange={setSort} options={SORTS} />

              {activeCount > 0 && (
                <button onClick={clearAll}
                  className="sm:col-span-3 caption text-primary-main font-semibold hover:underline flex items-center gap-1 w-fit">
                  <X size={12} /> Clear all
                </button>
              )}
            </div>
          )}
        </div>

        {/* Active pills */}
        {activeCount > 0 && !showFilters && (
          <div className="flex flex-wrap items-center gap-2 mt-4">
            {type !== "all" && (
              <Pill label={TYPES.find((t) => t.value === type)?.label} onRemove={() => setType("all")} />
            )}
            {price !== "all" && (
              <Pill label={PRICES.find((p) => p.value === price)?.label} onRemove={() => setPrice("all")} />
            )}
            {search && <Pill label={`"${search}"`} onRemove={() => setSearch("")} />}
            <button onClick={clearAll} className="caption text-primary-main font-semibold hover:underline">
              Clear all
            </button>
          </div>
        )}
      </section>

      {/* ══ RESULTS ══ */}
      <section className="max-w-7xl mx-auto px-s32 md:px-s64 xl:px-0 py-s48 sm:py-s80">
        {!loading && (
          <p className="body-default text-secondary mb-s32">
            <span className="text-main font-semibold">{filtered.length}</span>{" "}
            {filtered.length === 1 ? "property" : "properties"} found
          </p>
        )}

        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-s32 md:gap-x-s40 gap-y-s64">
            {[1, 2, 3, 4, 5, 6].map((i) => <SkeletonCard key={i} />)}
          </div>
        )}

        {/* Empty */}
        {!loading && filtered.length === 0 && (
          <div className="text-center py-s104">
            <div className="w-20 h-20 rounded-full bg-secondary-light flex items-center justify-center mx-auto mb-s24">
              <Building2 size={32} className="text-primary-light" />
            </div>
            <h3 className="heading-h4 text-main mb-s8">No properties found</h3>
            <p className="body-default text-secondary mb-s24 max-w-sm mx-auto">
              Try adjusting your search or filters
            </p>
            {activeCount > 0 && (
              <button onClick={clearAll}
                className="px-s24 py-s12 bg-primary-main text-on-primary rounded-r16 caption font-semibold hover:opacity-90 transition-opacity">
                Clear Filters
              </button>
            )}
          </div>
        )}

        {/* Grid */}
        {!loading && filtered.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-s32 md:gap-x-s40 gap-y-s64">
            {filtered.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

/* ── helpers ── */
function SelectField({ label, value, onChange, options }) {
  return (
    <div>
      <label className="caption text-secondary uppercase tracking-wider mb-1.5 block">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none bg-secondary-light rounded-r8 px-4 py-3 body-default text-main pr-10 focus:ring-2 focus:ring-primary-main/15 outline-none cursor-pointer"
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary pointer-events-none" />
      </div>
    </div>
  );
}

function Pill({ label, onRemove }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary-main/5 border border-primary-main/10 rounded-r8 caption text-primary-main font-medium">
      {label}
      <button onClick={onRemove}><X size={12} /></button>
    </span>
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