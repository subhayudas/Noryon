"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SparklesIcon, XMarkIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { createPortal } from "react-dom";

interface ServiceDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  service: {
    icon: React.ReactNode;
    title: string;
    description: string;
    imageUrl: string;
  } | null;
}

const drawerVariants = {
  hidden: {
    y: "100%",
    opacity: 0,
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 30,
    },
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 30,
      mass: 0.8,
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

const overlayVariants = {
  hidden: {
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
};

const itemVariants = {
  hidden: {
    y: 20,
    opacity: 0,
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 30,
    },
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 30,
      mass: 0.8,
    },
  },
};

const serviceFeatures = {
  "Website Design": [
    "Custom responsive design tailored to your brand",
    "Modern, fast-loading, and SEO-optimized websites",
    "User experience focused development",
    "Ongoing maintenance and support",
  ],
  "Social Media Marketing": [
    "Comprehensive social media strategy development",
    "Content creation and curation",
    "Community management and engagement",
    "Performance tracking and analytics",
  ],
  "Graphics Design": [
    "Brand identity and logo design",
    "Marketing materials and collateral",
    "Digital and print design solutions",
    "Style guide and brand consistency",
  ],
  "SEO": [
    "Comprehensive website audit and optimization",
    "Keyword research and content strategy",
    "Technical SEO and site speed optimization",
    "Monthly reporting and performance tracking",
  ],
  "Video Editing": [
    "Professional video editing and post-production",
    "Motion graphics and animation",
    "Color correction and audio enhancement",
    "Multiple format delivery optimization",
  ],
  "Content Writing": [
    "SEO-optimized blog posts and articles",
    "Website copy and sales pages",
    "Social media content creation",
    "Email marketing campaigns",
  ],
};

export function ServiceDrawer({ isOpen, onClose, service }: ServiceDrawerProps) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!mounted || !service) return null;

  const features = serviceFeatures[service.title as keyof typeof serviceFeatures] || [];

  const DrawerContent = (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-[#202636]/80 backdrop-blur-sm"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            className="relative w-full max-w-2xl mx-4 mb-4 rounded-2xl border border-white/10 bg-[#202636]/90 backdrop-blur-md overflow-hidden shadow-2xl"
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {/* Background gradient matching hero */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40" />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 via-transparent to-pink-900/10" />

            {/* Header Image */}
            <motion.div 
              className="relative h-48 overflow-hidden"
              variants={itemVariants}
            >
              <Image
                src={service.imageUrl}
                alt={service.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
              
              {/* Close Button */}
              <motion.button
                className="absolute top-4 right-4 p-2 rounded-full bg-[#202636]/50 border border-white/10 text-white hover:bg-[#202636]/70 transition-colors duration-200"
                onClick={onClose}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                variants={itemVariants}
              >
                <XMarkIcon className="w-5 h-5" />
              </motion.button>
            </motion.div>

            {/* Content */}
            <div className="relative z-10 p-6 space-y-6">
              {/* Header */}
              <motion.div variants={itemVariants} className="flex items-start gap-4">
                {/* Icon */}
                <motion.div
                  className="p-3 rounded-full bg-[#202636]/40 backdrop-blur-sm border border-white/10"
                  whileHover={{ 
                    scale: 1.1,
                    rotate: [0, -5, 5, 0],
                    transition: { duration: 0.5 }
                  }}
                >
                  {service.icon}
                </motion.div>

                <div className="flex-1">
                  <motion.h2 
                    className="text-2xl lg:text-3xl font-medium text-white mb-2 font-helvetica-neue"
                    variants={itemVariants}
                  >
                    {service.title}
                  </motion.h2>
                  <motion.p 
                    className="text-white/70 font-questrial leading-relaxed"
                    variants={itemVariants}
                  >
                    {service.description}
                  </motion.p>
                </div>
              </motion.div>

              {/* Badge */}
              <motion.div
                className="inline-flex items-center py-2 px-4 border border-white/20 bg-[#202636]/20 backdrop-blur-md rounded-full"
                variants={itemVariants}
              >
                <SparklesIcon className="text-amber-400 mr-2 h-4 w-4" />
                <span className="text-xs font-medium tracking-wider text-white/90 uppercase font-questrial">
                  What's Included
                </span>
              </motion.div>

              {/* Features */}
              <motion.div variants={itemVariants} className="space-y-4">
                <ul className="space-y-3">
                  {features.map((feature, index) => (
                    <motion.li
                      key={index}
                      className="flex items-start gap-3"
                      variants={itemVariants}
                      custom={index}
                    >
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-amber-400/20 border border-amber-400/30 flex items-center justify-center mt-0.5">
                        <div className="w-2 h-2 rounded-full bg-amber-400" />
                      </div>
                      <span className="text-white/80 font-questrial leading-relaxed">
                        {feature}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* CTA */}
              <motion.div variants={itemVariants} className="pt-4">
                <motion.a
                  href="#BookingForm"
                  className="w-full inline-flex items-center justify-center py-3 px-6 border border-white/20 bg-[#202636]/20 backdrop-blur-md rounded-full text-white font-medium tracking-wide hover:bg-[#202636]/30 hover:border-amber-400/50 transition-all duration-300 font-questrial"
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 0 20px rgba(251, 191, 36, 0.2)"
                  }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onClose}
                >
                  <SparklesIcon className="text-amber-400 mr-2 h-4 w-4" />
                  Get Started with {service.title}
                </motion.a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return createPortal(DrawerContent, document.body);
} 