import React from "react";
import Link from "next/link";

function Button({
  variant = "primary",
  children,
  href,
  as = "button",
  className = "",
  ...props
}) {
  const baseClass =
    "inline-flex items-center justify-center px-s24 py-s8 h-fit rounded-r40 hover:cursor-pointer";

  const variants = {
    primary:"bg-primary-main text-on-primary font-medium hover:bg-primary-light",
    builder:
  "text-on-primary font-medium bg-gradient-to-r from-[var(--primary-main)] to-[#88510F] hover:from-[var(--primary-main)] hover:to-[var(--primary-light)] transition-all duration-300 shadow-md hover:shadow-lg"
  };

  const allClasses = `${baseClass} ${
    variants[variant] || variants.primary
  } ${className}`;

  if (as === "link" && href) {
    return (
      <Link href={href} className={allClasses} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button className={allClasses} {...props}>
      {children}
    </button>
  );
}

export default Button;