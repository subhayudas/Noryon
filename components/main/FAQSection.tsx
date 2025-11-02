"use client";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import AnimatedHeading from "../ui/animated-heading";
import { useLanguage } from "@/contexts/LanguageContext";

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = (event: React.MouseEvent) => {
    event.preventDefault();
    setIsOpen(!isOpen);
  };

  return (
    <details className="group mb-4" open={isOpen}>
      <summary
                        className="flex cursor-pointer items-center justify-between gap-1.5 rounded-lg bg-gray-400 p-4 text-gray-900 focus:outline-none"
        onClick={toggleOpen}
      >
        <AnimatedHeading as="h3" className="font-medium text-lg">{question}</AnimatedHeading>

        <svg
          className={`h-5 w-5 shrink-0 transition duration-300 ${isOpen && "-rotate-180"}`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </summary>

      <div
        className={`mt-4 px-4 leading-relaxed text-white transition-max-height ${
          isOpen ? "max-h-96" : "max-h-0 overflow-hidden"
        }`}
      >
        <p>{answer}</p>
      </div>
    </details>
  );
};

FAQItem.propTypes = {
  question: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
};

const FAQSection = () => {
  const { t } = useLanguage();
  
  const faqData = [
    {
      question: t("faq.q1"),
      answer: t("faq.a1")
    },
    {
      question: t("faq.q2"),
      answer: t("faq.a2")
    },
    {
      question: t("faq.q3"),
      answer: t("faq.a3")
    },
    {
      question: t("faq.q4"),
      answer: t("faq.a4")
    },
    {
      question: t("faq.q5"),
      answer: t("faq.a5")
    }
  ];

  return (
    <section id="FAQSection" className="bg-[#202636] py-8">
      <div className="mx-auto max-w-lg text-center">
        <AnimatedHeading as="h2" className="text-[40px] font-semibold py-10">
          {t("faq.title")}
        </AnimatedHeading>
      </div>

      <div className="max-w-2xl mx-auto p-4">
        {faqData.map((faq, index) => (
          <FAQItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </section>
  );
};

export default FAQSection;

