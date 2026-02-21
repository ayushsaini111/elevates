import React from "react";
import Link from "next/link";

function Button({ variant = "primary", children, href, as = "button", className = "", ...props }) {
    const baseClass = "inline-flex items-center justify-center px-s24 py-s8 h-fit rounded-r40 hover:cursor-pointer";

    const variants = {
        primary: "bg-secondary-main text-base font-medium text-background hover:bg-primary-light hover:text-backgorund",
        secondary: "bg-primary-main text-base font-medium text-background hover:bg-primary-light hover:text-bachground",
    };

    // ✅ Merge variant + base + extra custom classes
    const allClasses = `${baseClass} ${variants[variant] || variants.primary} ${className}`;

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
