"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { GlobeAltIcon } from "@heroicons/react/24/outline";

const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "fr" : "en");
  };

  return (
    <motion.button
      onClick={toggleLanguage}
      className="relative inline-flex items-center justify-center rounded-lg px-3 py-2 text-sm font-medium text-white hover:text-orange-400 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500/50 hover:bg-white/10"
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${language === "en" ? "French" : "English"}`}
      title={`Switch to ${language === "en" ? "French" : "English"}`}
    >
      <div className="flex items-center space-x-2">
        <GlobeAltIcon className="h-4 w-4" />
        <span className="uppercase font-semibold tracking-wide">
          {language === "en" ? "EN" : "FR"}
        </span>
      </div>
      {/* Active indicator */}
      <motion.div
        className="absolute inset-0 rounded-lg bg-white/5 border border-white/10"
        initial={false}
        animate={{
          opacity: 1,
        }}
        transition={{ duration: 0.2 }}
      />
    </motion.button>
  );
};

export default LanguageToggle;

