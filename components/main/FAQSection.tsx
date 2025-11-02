"use client";
import React, { useState } from "react";
import PropTypes from "prop-types";
import AnimatedHeading from "../ui/animated-heading";

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
  const faqData = [
    {
      "question": "What services does your digital agency offer?",
      "answer": "Our digital agency provides a range of services, including web design, digital marketing, SEO, social media management, and other specialized offerings tailored to meet the unique needs of our clients."
    },
    {
      "question": "How much does your digital agency charge for its services?",
      "answer": "The cost of our services varies based on the specific project requirements. We can provide a detailed pricing structure upon discussion, ensuring transparency and aligning with the value and results you can expect from our digital expertise."
    },
    {
      "question": "What is the typical timeline for completing a project?",
      "answer": "The project timeline depends on factors such as complexity, client responsiveness, and other variables. We aim for efficient delivery and will provide you with a clear timeframe based on your project's unique characteristics."
    },
    {
      "question": "Can you provide examples of your past work or client success stories?",
      "answer": "Certainly! We have a portfolio showcasing our best work, and we're happy to share client testimonials and case studies that highlight the successful outcomes of our digital services. This will give you insights into the quality and effectiveness of our work."
    },
    {
      "question": "How do you approach communication and collaboration with clients?",
      "answer": "We prioritize transparent and effective communication throughout the project. Our approach involves regular updates, collaboration with clients to align with their vision, and the use of project management tools to ensure seamless communication. Your involvement is crucial, and we strive to keep you informed and engaged at every stage."
    }
    // Add more FAQ items as needed
  ];

  return (
    <section id="FAQSection" className="bg-[#202636] py-8">
      <div className="mx-auto max-w-lg text-center">
        <AnimatedHeading as="h2" className="text-[40px] font-semibold py-10">
          Frequently Asked Questions
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

