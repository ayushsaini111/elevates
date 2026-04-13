"use client";

export default function Accordion({
  question,
  answer,
  isLast,
  isOpen,
  onToggle,
}) {
  return (
    <div className={`${!isLast ? "border-b border-secondary-main/30" : ""}`}>

      {/* HEADER */}
      <button
        onClick={onToggle}
        className="
          w-full flex justify-between items-center
          pb-s16 text-left
        "
      >
        <span className="heading-h5 text-main max-w-[250px] sm:max-w-full">
          {question}
        </span>

        {/* PLUS → CROSS ICON */}
        <div
          className={`
            relative w-6 h-6 flex items-center justify-center
            transition-transform duration-300 ease-in-out
            ${isOpen ? "rotate-45" : ""}
          `}
        >
          <span className="absolute w-4 h-0.5 bg-primary-main" />
          <span className="absolute w-4 h-0.5 bg-primary-main rotate-90" />
        </div>
      </button>

      {/* CONTENT */}
      <div
        className={`
          overflow-hidden transition-all duration-300 ease-in-out
          ${isOpen ? "max-h-[300px] py-s8" : "max-h-0 py-0"}
        `}
      >
        <p className="heading-h6  text-secondary leading-relaxed">
          {answer}
        </p>
      </div>
    </div>
  );
}