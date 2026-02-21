"use client";

import { useState } from "react";
import Accordion from "@/Components/ui/Acordian";

export default function FAQSection({ faqs }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
      <div className="max-w-7xl px-s32 md:px-s64  xl:px-0 mx-auto  py-s80 md:py-s160">
      <h1 className="heading-h2">FAQ</h1>
      {faqs.map((faq, index) => (
        <Accordion
          key={index}
          question={faq.question}
          answer={faq.answer}
          isLast={index === faqs.length - 1}
          isOpen={activeIndex === index}
          onToggle={() => handleToggle(index)}
        />
      ))}
    </div>
  );
}