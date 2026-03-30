"use client";
import { useForm } from "react-hook-form";
import { X, Phone, User, Loader2 } from "lucide-react";

// ✅ CONFIGURE
const CMS_API = process.env.NEXT_PUBLIC_CMS_URL || "";
const WHATSAPP_NO = "9105787349"; // ← replace with admin number

export default function LeadModal({ isOpen, onClose, property }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  if (!isOpen) return null;

  const onSubmit = async (data) => {
    const payload = {
      name: data.name,
      phone: data.phone,
      propertyId: property?.id || property?._id,
      location: property?.location,
      price: String(property?.price || ""),
      type: property?.type || property?.propertyType,
    };

    try {
      // ✅ Send to backend
      const res = await fetch(`${CMS_API}/api/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed");

      // ✅ Send to WhatsApp
      const msg = [
        `🏠 *New Property Enquiry*`,
        ``,
        ` *Name:* ${data.name}`,
        ` *Phone:* ${data.phone}`,
        property?.title ? `🏢 *Property:* ${property.title}` : "",
        property?.location ? ` *Location:* ${property.location}` : "",
        property?.price ? ` *Price:* ${property.price}` : "",
        property?.type ? `*Type:* ${property.type}` : "",
      ]
        .filter(Boolean)
        .join("\n");

      window.open(
        `https://wa.me/${WHATSAPP_NO}?text=${encodeURIComponent(msg)}`,
        "_blank"
      );

      reset();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-md rounded-r24 overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.15)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-primary-main p-s24 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
          <p className="caption text-primary-light uppercase tracking-[0.2em] mb-1">
            Schedule a Call
          </p>
          <h3
            className="text-on-primary"
            style={{
              fontFamily: "var(--font-secondary)",
              fontSize: "clamp(1.2rem, 1vw + 1rem, 1.6rem)",
            }}
          >
            Book a Call Back
          </h3>
          {property?.title && (
            <p className="caption text-primary-light/80 mt-2 line-clamp-1">
              {property.title} · {property.location}
            </p>
          )}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-s24 space-y-s16">
          {/* Name */}
          <div>
            <label className="caption text-secondary uppercase tracking-wider mb-1.5 block">
              Full Name
            </label>
            <div className="relative">
              <User
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-primary-light"
              />
              <input
                type="text"
                placeholder="YOUR NAME"
                className="w-full pl-10 pr-4 py-3.5 border border-secondary-light rounded-r16 body-default text-main bg-secondary-light/30 focus:border-primary-main focus:ring-2 focus:ring-primary-main/10 outline-none transition-all uppercase placeholder:text-secondary/40"
                {...register("name", {
                  required: "Name is required",
                  minLength: { value: 2, message: "Min 2 characters" },
                  maxLength: { value: 30, message: "Max 30 characters" },
                  pattern: {
                    value: /^[A-Z ]+$/,
                    message: "Only letters allowed",
                  },
                })}
                onInput={(e) => {
                  e.target.value = e.target.value
                    .toUpperCase()
                    .replace(/[^A-Z ]/g, "");
                }}
              />
            </div>
            {errors.name && (
              <p className="caption text-red-500 mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="caption text-secondary uppercase tracking-wider mb-1.5 block">
              Phone Number
            </label>
            <div className="relative">
              <Phone
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-primary-light"
              />
              <span className="absolute left-10 top-1/2 -translate-y-1/2 body-default text-secondary">
                +91
              </span>
              <input
                type="tel"
                placeholder="9876543210"
                maxLength={10}
                inputMode="numeric"
                autoComplete="tel"
                className="w-full pl-[4.5rem] pr-4 py-3.5 border border-secondary-light rounded-r16 body-default text-main bg-secondary-light/30 focus:border-primary-main focus:ring-2 focus:ring-primary-main/10 outline-none transition-all placeholder:text-secondary/40"
                {...register("phone", {
                  required: "Phone is required",
                  pattern: {
                    value: /^[6-9]\d{9}$/,
                    message: "Enter valid 10-digit number",
                  },
                })}
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/\D/g, "");
                }}
              />
            </div>
            {errors.phone && (
              <p className="caption text-red-500 mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 py-4 bg-primary-main text-on-primary rounded-r16 heading-h6 hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={18} className="animate-spin" /> Sending...
              </>
            ) : (
              "Book Call"
            )}
          </button>

          <p className="caption text-secondary text-center">
            Our agent will call you within 30 minutes
          </p>
        </form>
      </div>
    </div>
  );
}