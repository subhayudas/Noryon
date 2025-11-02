"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
  slideInFromBottom
} from "@/utils/motion";
import { SparklesIcon } from "@heroicons/react/24/solid";
import { ShimmerButton } from "../ui/shimmer-button";
import { useLanguage } from "@/contexts/LanguageContext";

const HeroContent = () => {
  const { t, language } = useLanguage();
  const [forceUpdate, setForceUpdate] = useState(0);
  
  // Listen for language changes to force re-render
  useEffect(() => {
    const handleLanguageChange = () => {
      setForceUpdate(prev => prev + 1);
    };
    window.addEventListener("languageChanged", handleLanguageChange);
    return () => window.removeEventListener("languageChanged", handleLanguageChange);
  }, []);
  
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
            {t("hero.badge")}
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
            <span className="block mb-2 font-light">{t("hero.heading1")}</span>
            <span className="block">
              <span className="font-medium text-[#04a8ae]">{t("hero.heading2")}</span>
              <span className="font-light"> {t("hero.heading3")}</span>
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
            {t("hero.bookCall")}
          </ShimmerButton>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HeroContent;
