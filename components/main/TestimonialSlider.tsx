"use client";
import React from "react";
import { SparklesIcon } from "@heroicons/react/24/solid";
import AnimatedHeading from "../ui/animated-heading";
import { Marquee } from "../ui/marquee";
import { cn } from "@/lib/utils";

interface TestimonialProps {
  name: string;
  role: string;
  content: string;
  image: string;
}

const TestimonialCard = ({ name, role, content, image }: TestimonialProps) => {
  return (
    <div
      className={cn(
        "relative w-80 cursor-pointer overflow-hidden rounded-xl border p-6 mx-2",
        // Dark theme styling for Noryon
        "border-gray-800 bg-gray-900/50 hover:bg-gray-900/80 transition-all duration-300",
        "backdrop-blur-sm shadow-lg hover:shadow-xl"
      )}
    >
      <div className="flex flex-row items-center gap-3 mb-4">
        <img 
          className="w-12 h-12 rounded-full border-2 border-gray-700 object-cover" 
          src={image} 
          alt={name} 
        />
        <div className="flex flex-col">
          <AnimatedHeading as="h3" className="text-lg font-semibold text-white">
            {name}
          </AnimatedHeading>
          <p className="text-gray-400 text-sm">{role}</p>
        </div>
      </div>
      <blockquote className="text-gray-300 text-sm leading-relaxed">
        "{content}"
      </blockquote>
    </div>
  );
};

const TestimonialSlider = () => {
  // Testimonial data
  const testimonials = [
    {
      name: "Aryaansh",
      role: "CEO, Matrix",
      content: "The Noryon team has been an unfair advantage for us - they helped us turn our marketing from guesswork into a genuine growth engine for the business. Yuvraj, Shaurya and Rohan have really helped us move the needle and it's great to finally have found a team that 'gets it.'",
      image: "https://ui-avatars.com/api/?name=Aryaansh&background=7042f8&color=fff&size=200"
    },
    {
      name: "Poonam Sharma",
      role: "Asian Development Bank Associate",
      content: "Great work ethic .. these guys are hassle free to work with!",
      image: "https://ui-avatars.com/api/?name=Poonam+Sharma&background=7042f8&color=fff&size=200"
    },
    {
      name: "VKA Team",
      role: "Client",
      content: "I would also like to place on record our appreciation for the Noryon team. They are young, energetic and best of the brains. Some of the reels like on Independence and world malaria day have left a long lasting impression on our stakeholders. We would continue to work with the team and have more structured approach to strive better in future.",
      image: "https://ui-avatars.com/api/?name=VKA&background=7042f8&color=fff&size=200"
    },
    {
      name: "FURR by Peesafe",
      role: "Client",
      content: "I have been associated with Noryon for 3 months now and I love the quality of work. Apart from that what really amazes me is the enthusiasm of the team to make the project work.",
      image: "https://ui-avatars.com/api/?name=FURR&background=7042f8&color=fff&size=200"
    }
  ];

  // Split testimonials into two rows for more dynamic display
  const firstRow = testimonials.slice(0, Math.ceil(testimonials.length / 2));
  const secondRow = testimonials.slice(Math.ceil(testimonials.length / 2));

  return (
    <section id="testimonial" className="bg-[#202636] py-20">
      <div className="max-w-6xl mx-auto py-10 px-4">
        <div className="transition duration-500 ease-in-out transform scale-100 translate-x-0 translate-y-0 opacity-100">
          <div className="mb-12 md:mb-16 text-center">
            <div className="Welcome-box py-[8px] px-[7px] border border-[#7042f88b] opacity-[0.9] text-center mx-auto inline-flex items-center">
              <SparklesIcon className="text-[#b49bff] mr-[10px] h-5 w-5" />
              <AnimatedHeading as="h1" className="Welcome-text text-[13px]">Words from Others</AnimatedHeading>
            </div>
            <AnimatedHeading as="h1" className="mb-5 text-5xl font-semibold text-center md:text-5xl">
              It&apos;s not just us.
            </AnimatedHeading>
            <p className="text-xl text-gray-100 text-center md:text-2xl max-w-3xl mx-auto">
              Here&apos;s what others have to say about us.
            </p>
          </div>
        </div>
      </div>

      {/* Marquee Testimonials */}
      <div className="relative flex flex-col gap-6 overflow-hidden">
        {/* First row - moving right to left */}
        <Marquee 
          pauseOnHover 
          className="[--duration:60s]"
        >
          {firstRow.map((testimonial, index) => (
            <TestimonialCard key={`first-${index}`} {...testimonial} />
          ))}
        </Marquee>
        
        {/* Second row - moving left to right */}
        <Marquee 
          reverse 
          pauseOnHover 
          className="[--duration:50s]"
        >
          {secondRow.map((testimonial, index) => (
            <TestimonialCard key={`second-${index}`} {...testimonial} />
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default TestimonialSlider;
