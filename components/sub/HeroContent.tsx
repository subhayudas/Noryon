"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
  slideInFromBottom
} from "@/utils/motion";
import { SparklesIcon } from "@heroicons/react/24/solid";
import { ShimmerButton } from "../ui/shimmer-button";

const HeroContent = () => {
  const handleBookCall = () => {
    // Trigger Calendly popup
    const event = new CustomEvent("openCalendlyPopup");
    window.dispatchEvent(event);
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      className="flex items-center justify-center h-full px-6 py-8 sm:py-16 lg:py-24"
    >
      <div className="w-full max-w-5xl mx-auto text-center">
        {/* Welcome Badge */}
        <motion.div 
          variants={slideInFromTop}
          className="inline-flex items-center py-2 px-4 border border-white/20 bg-[#202636]/20 backdrop-blur-md rounded-full mb-6 shadow-lg"
        >
          <SparklesIcon className="text-amber-400 mr-2 h-4 w-4" />
          <span className="text-xs font-medium tracking-wider text-white/90 uppercase">
            AI Agents & Automation Agency
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.div 
          variants={slideInFromLeft(0.5)} 
          className="mb-8"
        >
          <h1 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-tight tracking-tight text-white mb-4 font-helvetica-neue"
            style={{ 
              letterSpacing: "-0.02em"
            }}
          >
            <span className="block mb-2 font-light">INTELLIGENT</span>
            <span className="block">
              <span className="font-medium text-amber-400">AI-Powered</span>
              <span className="font-light"> SOLUTIONS</span>
            </span>
          </h1>
        </motion.div>

        {/* Empty space to maintain gap */}
        <motion.div 
          variants={slideInFromRight(0.7)} 
          className="mb-10"
        >
          {/* Description text removed but div kept for spacing */}
        </motion.div>

        {/* Call to Action Button */}
        <motion.div 
          variants={slideInFromBottom(0.6)} 
          className="flex justify-center"
        >
          <ShimmerButton
            onClick={handleBookCall}
            background="rgba(0, 0, 0, 0.95)"
            shimmerColor="#ffffff"
            borderRadius="50px"
            shimmerDuration="2s"
            className="text-white font-medium text-sm px-6 py-3 shadow-lg hover:shadow-xl"
          >
            Book A Call
          </ShimmerButton>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HeroContent;
