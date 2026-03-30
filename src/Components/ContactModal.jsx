"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  X,
  User,
  Phone,
  Building2,
  MessageSquare,
  Loader2,
  CheckCircle2,
} from "lucide-react";

const CMS_API = process.env.NEXT_PUBLIC_BASE_URL || "";

const COMPANIES = [
  {
    value: "elevating",
    label: "Elevating Lives",
    desc: "Premium Real Estate",
    color: "border-blue-500 bg-blue-50 text-blue-700",
    active: "ring-blue-500/30 border-blue-500",
  },
  {
    value: "builders",
    label: "Builders & Developers",
    desc: "Construction & Development",
    color: "border-amber-600 bg-amber-50 text-amber-700",
    active: "ring-amber-500/30 border-amber-600",
  },
  {
    value: "civil",
    label: "Civil Solutions",
    desc: "Civil Engineering & Contracting",
    color: "border-yellow-500 bg-yellow-50 text-yellow-700",
    active: "ring-yellow-500/30 border-yellow-500",
  },
  {
    value: "infra",
    label: "Infra Build",
    desc: "Infrastructure & Projects",
    color: "border-sky-500 bg-sky-50 text-sky-700",
    active: "ring-sky-500/30 border-sky-500",
  },
];

export default function ContactModal({ isOpen, onClose }) {
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      phone: "",
      company: "",
      description: "",
    },
  });

  const selectedCompany = watch("company");

  if (!isOpen) return null;

  const handleClose = () => {
    setSuccess(false);
    reset();
    onClose();
  };

  const onSubmit = async (data) => {
    try {
      const res = await fetch(`${CMS_API}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name.trim(),
          phone: data.phone,
          company: data.company,
          description: data.description.trim(),
        }),
      });

      if (!res.ok) throw new Error("Failed");

      setSuccess(true);
      setTimeout(() => handleClose(), 3500);
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[200] p-4"
      onClick={handleClose}
    >
      <div
        className="bg-white w-full max-w-lg rounded-r24 overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.15)] max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ══ SUCCESS ══ */}
        {success ? (
          <div className="p-s48 text-center">
            <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-s24">
              <CheckCircle2 size={32} className="text-green-600" />
            </div>
            <h3
              className="text-main mb-s8"
              style={{
                fontFamily: "var(--font-secondary)",
                fontSize: "clamp(1.2rem, 1vw + 1rem, 1.5rem)",
              }}
            >
              Message Sent!
            </h3>
            <p className="body-default text-secondary mb-s24">
              Thank you for reaching out.
              <br />
              We will get back to you within 24 hours.
            </p>
            <button
              onClick={handleClose}
              className="px-s32 py-s12 bg-primary-main text-on-primary rounded-r16 caption font-semibold hover:opacity-90 transition-opacity"
            >
              Done
            </button>
          </div>
        ) : (
          <>
            {/* ══ HEADER ══ */}
            <div className="bg-primary-main p-s24 sm:p-s32 relative">
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-all"
              >
                <X size={16} />
              </button>

              <div className="flex items-center gap-s12 mb-s8">
                <div>
                  <p className="caption text-primary-light/90 uppercase tracking-[0.2em]">
                    Get in Touch
                  </p>
                  <h3
                    className="text-on-primary"
                    style={{
                      fontFamily: "var(--font-secondary)",
                      fontSize: "clamp(1.2rem, 1vw + 1rem, 1.6rem)",
                    }}
                  >
                    Contact Us
                  </h3>
                </div>
              </div>

              <p className="caption text-primary-light">
                Fill in the details and we'll reach out to you
              </p>
            </div>

            {/* ══ FORM ══ */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="p-s24 sm:p-s32 space-y-s24"
            >
              {/* ── NAME ── */}
              <div>
                <label className="caption text-secondary uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <User size={12} /> Full Name
                  <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  placeholder="YOUR NAME"
                  className={`w-full px-s16 py-3.5 border rounded-r16 body-default text-main bg-secondary-light/20 uppercase placeholder:text-secondary/30 outline-none transition-all ${
                    errors.name
                      ? "border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100"
                      : "border-secondary-light focus:border-primary-main focus:ring-2 focus:ring-primary-main/10"
                  }`}
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
                {errors.name && (
                  <p className="caption text-red-500 mt-1.5 flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-red-500" />
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* ── PHONE ── */}
              <div>
                <label className="caption text-secondary uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Phone size={12} /> Phone Number
                  <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-s16 top-1/2 -translate-y-1/2 body-default text-secondary/60 select-none">
                    +91
                  </span>
                  <input
                    type="tel"
                    placeholder="9876543210"
                    maxLength={10}
                    inputMode="numeric"
                    autoComplete="tel"
                    className={`w-full pl-[3.5rem] pr-s16 py-3.5 border rounded-r16 body-default text-main bg-secondary-light/20 placeholder:text-secondary/30 outline-none transition-all ${
                      errors.phone
                        ? "border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100"
                        : "border-secondary-light focus:border-primary-main focus:ring-2 focus:ring-primary-main/10"
                    }`}
                    {...register("phone", {
                      required: "Phone number is required",
                      pattern: {
                        value: /^[6-9]\d{9}$/,
                        message: "Enter a valid 10-digit number",
                      },
                    })}
                    onInput={(e) => {
                      e.target.value = e.target.value.replace(/\D/g, "");
                    }}
                  />
                </div>
                {errors.phone && (
                  <p className="caption text-red-500 mt-1.5 flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-red-500" />
                    {errors.phone.message}
                  </p>
                )}
              </div>

              {/* ── COMPANY RADIO ── */}
              <div>
                <label className="caption text-secondary uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <Building2 size={12} /> Select Company
                  <span className="text-red-400">*</span>
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {COMPANIES.map((company) => {
                    const isSelected = selectedCompany === company.value;

                    return (
                      <label
                        key={company.value}
                        className={`relative flex items-start gap-3 p-s16 rounded-r16 border-2 cursor-pointer transition-all duration-200 ${
                          isSelected
                            ? `${company.active} ring-2 bg-white`
                            : "border-secondary-light hover:border-secondary-main bg-secondary-light/20 hover:bg-secondary-light/40"
                        }`}
                      >
                        <input
                          type="radio"
                          value={company.value}
                          className="sr-only"
                          {...register("company", {
                            required: "Please select a company",
                          })}
                        />

                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                            isSelected
                              ? "border-primary-main"
                              : "border-secondary-main/50"
                          }`}
                        >
                          {isSelected && (
                            <div className="w-2.5 h-2.5 rounded-full bg-primary-main" />
                          )}
                        </div>

                        <div className="min-w-0">
                          <p
                            className={`body-default font-semibold leading-tight ${
                              isSelected ? "text-main" : "text-secondary"
                            }`}
                          >
                            {company.label}
                          </p>
                          <p className="caption text-secondary/60 mt-0.5">
                            {company.desc}
                          </p>
                        </div>

                        {isSelected && (
                          <div
                            className={`absolute top-2 right-2 w-2 h-2 rounded-full ${company.color
                              .split(" ")
                              .find((c) => c.startsWith("bg-"))}`}
                          />
                        )}
                      </label>
                    );
                  })}
                </div>

                {errors.company && (
                  <p className="caption text-red-500 mt-2 flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-red-500" />
                    {errors.company.message}
                  </p>
                )}
              </div>

              {/* ── DESCRIPTION ── */}
              <div>
                <label className="caption text-secondary uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <MessageSquare size={12} /> Message
                  <span className="text-secondary/40 normal-case tracking-normal ml-1">
                    (optional)
                  </span>
                </label>
                <textarea
                  placeholder="Tell us about your requirement..."
                  rows={3}
                  className={`w-full px-s16 py-3.5 border rounded-r16 body-default text-main bg-secondary-light/20 placeholder:text-secondary/30 outline-none transition-all resize-none ${
                    errors.description
                      ? "border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100"
                      : "border-secondary-light focus:border-primary-main focus:ring-2 focus:ring-primary-main/10"
                  }`}
                  {...register("description", {
                    maxLength: {
                      value: 500,
                      message: "Max 500 characters",
                    },
                  })}
                />
                {errors.description && (
                  <p className="caption text-red-500 mt-1.5 flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-red-500" />
                    {errors.description.message}
                  </p>
                )}
              </div>

              {/* ── SUBMIT ── */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 py-4 bg-primary-main text-on-primary rounded-r16 heading-h6 hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </button>

              <p className="caption text-secondary/50 text-center">
                We respect your privacy. No spam, ever.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}