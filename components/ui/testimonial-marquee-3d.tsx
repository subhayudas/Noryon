"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { Marquee } from "@/registry/magicui/marquee";
import AnimatedHeading from "./animated-heading";

interface TestimonialProps {
  name: string;
  role: string;
  content: string;
  image: string;
}

const TestimonialCard = ({ name, role, content, image }: TestimonialProps) => {
  return (
    <figure
      className={cn(
        "relative h-full w-fit sm:w-80 cursor-pointer overflow-hidden rounded-xl border p-4 mb-4",
        // dark styles for Noryon's dark theme
        "border-gray-50/[.1]  ring-1 ring-gray-900/5 hover:bg-gray-950/[.2]",
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="w-12 h-12 bg-center bg-cover border rounded-full" src={image} alt={name} />
        <div className="flex flex-col">
          <AnimatedHeading as="h3" className="text-lg font-semibold">
            {name}
          </AnimatedHeading>
          <p className="text-gray-500 text-md">{role}</p>
        </div>
      </div>
      <blockquote className="mt-4 leading-normal text-gray-300 text-md">{content}</blockquote>
    </figure>
  );
};

export function TestimonialMarquee3D({
  testimonials,
}: {
  testimonials: TestimonialProps[];
}) {
  // Divide testimonials into four groups for the different columns
  const firstColumn = testimonials.slice(0, Math.ceil(testimonials.length / 4));
  const secondColumn = testimonials.slice(Math.ceil(testimonials.length / 4), Math.ceil(testimonials.length / 2));
  const thirdColumn = testimonials.slice(Math.ceil(testimonials.length / 2), Math.ceil(testimonials.length * 3 / 4));
  const fourthColumn = testimonials.slice(Math.ceil(testimonials.length * 3 / 4));

  return (
    <div className="relative flex h-[80vh] w-full flex-row items-center justify-center gap-1 overflow-hidden [perspective:200px]">
      {/* Main 3D container with fade mask */}
      <div
        className="flex flex-row items-center gap-4 relative w-full h-full"
        style={{
          transform:
            "translateX(-50px) translateY(0px) translateZ(-50px) rotateX(20deg) rotateY(-10deg) rotateZ(20deg)",
          maskImage: "linear-gradient(to bottom, transparent, black 10%, black 55%, transparent)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent, black 10%, black 55%, transparent)"
        }}
      >
        <Marquee pauseOnHover vertical className="[--duration:30s]">
          {firstColumn.map((testimonial, index) => (
            <TestimonialCard key={`first-${index}`} {...testimonial} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:25s]" vertical>
          {secondColumn.map((testimonial, index) => (
            <TestimonialCard key={`second-${index}`} {...testimonial} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:35s]" vertical>
          {thirdColumn.map((testimonial, index) => (
            <TestimonialCard key={`third-${index}`} {...testimonial} />
          ))}
        </Marquee>
        <Marquee pauseOnHover className="[--duration:28s]" vertical>
          {fourthColumn.map((testimonial, index) => (
            <TestimonialCard key={`fourth-${index}`} {...testimonial} />
          ))}
        </Marquee>
      </div>
    </div>
  );
}
