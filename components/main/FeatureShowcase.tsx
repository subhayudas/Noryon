"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SparklesIcon } from "@heroicons/react/24/solid";
import AnimatedHeading from "../ui/animated-heading";
import { slideInFromBottom, slideInFromLeft, slideInFromRight, slideInFromTop } from "@/utils/motion";

const FeatureShowcase = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });

  const features = [
    {
      id: 1,
      title: "AI-Powered Analytics",
      description: "Harness the power of artificial intelligence to gain deep insights into your audience behavior and optimize your marketing strategy.",
      icon: "📊",
      color: "from-blue-500 to-purple-600",
    },
    {
      id: 2,
      title: "Conversion Optimization",
      description: "Transform visitors into customers with our data-driven approach to conversion rate optimization.",
      icon: "🚀",
      color: "from-orange-500 to-red-600",
    },
    {
      id: 3,
      title: "Responsive Design",
      description: "Create seamless experiences across all devices with our mobile-first design approach.",
      icon: "📱",
      color: "from-green-500 to-teal-600",
    },
    {
      id: 4,
      title: "SEO Excellence",
      description: "Climb to the top of search results with our proven SEO strategies and content optimization.",
      icon: "🔍",
      color: "from-yellow-500 to-amber-600",
    },
    {
      id: 5,
      title: "Social Media Management",
      description: "Build a strong social presence with our comprehensive social media management services.",
      icon: "💬",
      color: "from-pink-500 to-rose-600",
    },
    {
      id: 6,
      title: "Email Marketing",
      description: "Nurture leads and drive conversions with personalized email marketing campaigns.",
      icon: "✉️",
      color: "from-cyan-500 to-blue-600",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <div className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8" ref={containerRef}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.div variants={slideInFromTop} className="Welcome-box py-[8px] px-[7px] border border-[#00c8cf8b] opacity-[0.9] text-center mx-auto inline-flex items-center">
            <SparklesIcon className="text-[#00c8cf] mr-[10px] h-5 w-5" />
            <h1 className="Welcome-text text-[13px]">Powerful Features</h1>
          </motion.div>
          
          <AnimatedHeading as="h2" className="mt-4 text-4xl md:text-5xl font-bold">
            Supercharge Your Digital Presence
          </AnimatedHeading>
          
          <motion.p 
            variants={slideInFromBottom(0.3)}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto"
          >
            Discover the cutting-edge features that set our services apart and drive exceptional results for your business.
          </motion.p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                transition: { type: "spring", stiffness: 400, damping: 10 }
              }}
              className="relative overflow-hidden rounded-2xl p-5 sm:p-6 bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-800 hover:border-gray-700 transition-all duration-300"
            >
              <div className="absolute -right-10 -top-10 w-32 h-32 bg-gradient-to-br opacity-20 rounded-full blur-2xl"></div>
              <div className={`text-3xl sm:text-4xl mb-3 sm:mb-4 bg-gradient-to-br ${feature.color} inline-block rounded-xl p-2 sm:p-3`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 text-white font-helvetica-neue">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
              
              <div className="mt-6 flex items-center">
                <div className="h-0.5 w-6 bg-gradient-to-r from-gray-500 to-gray-600 mr-2"></div>
                <span className="text-gray-500 font-medium text-sm">Learn More</span>
              </div>
              
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gray-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default FeatureShowcase;