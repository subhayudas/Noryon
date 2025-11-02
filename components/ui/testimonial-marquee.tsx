"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/utils";
import AnimatedHeading from "./animated-heading";
import Image from "next/image";

interface TestimonialProps {
  name: string;
  role: string;
  content: string;
  image: string;
}

export const TestimonialMarquee = ({
  testimonials,
}: {
  testimonials: TestimonialProps[];
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  useEffect(() => {
    if (window && window.innerWidth < 768) {
      setIsMobile(true);
    }
  }, []);

  const translateX = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -1000]
  );

  const rotate = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0, -5, 0]
  );

  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [1, 1.05, 1]
  );

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.6, 1, 1, 0.6]
  );

  return (
    <div
      ref={containerRef}
      className="relative min-h-[150vh] w-full overflow-hidden py-20"
    >
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        <motion.div
          style={{
            x: translateX,
            rotate: rotate,
            scale: scale,
            opacity: opacity,
          }}
          className="flex gap-6 absolute"
        >
          {[...testimonials, ...testimonials].map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

const TestimonialCard = ({ name, role, content, image }: TestimonialProps) => {
  return (
    <div className="relative group w-80 flex-shrink-0">
      <div className="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-amber-500 to-pink-500 blur duration-400 group-hover:opacity-100 group-hover:duration-200"></div>
      <div className="relative p-6 space-y-6 leading-none rounded-lg bg-[#202636] ring-1 ring-gray-900/5">
        <div className="flex items-center space-x-4">
          <img
            src={image}
            className="w-12 h-12 bg-center bg-cover border rounded-full"
            alt={name}
          />
          <div>
            <AnimatedHeading as="h3" className="text-lg font-semibold">
              {name}
            </AnimatedHeading>
            <p className="text-gray-500 text-md">{role}</p>
          </div>
        </div>
        <p className="leading-normal text-gray-300 text-md">{content}</p>
      </div>
    </div>
  );
};

export default TestimonialMarquee;
