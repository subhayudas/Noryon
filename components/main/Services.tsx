"use client";

import { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { SparklesIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { ServiceDrawer } from "../ui/service-drawer";
import { aiServicesData, AIService } from "./aiServicesData";

// Transform AI services data to match the component structure
const services = aiServicesData.map(service => ({
  icon: <span className="text-2xl">{service.icon}</span>,
  title: service.title,
  description: service.description,
  imageUrl: service.imageUrl,
  size: service.size,
  tiers: service.tiers,
  id: service.id
}));

const Services = () => {
  const containerRef = useRef(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const isInView = useInView(containerRef, { once: false, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [100, 0, 0, -100]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1] as const,
      },
    },
  };

  const getGridClass = (size: string, index: number) => {
    switch (size) {
      case "large":
        return "col-span-2 row-span-1";
      case "tall":
        return "col-span-1 row-span-2";
      case "medium":
        return "col-span-1 row-span-1";
      case "small":
        return "col-span-1 row-span-1";
      default:
        return "col-span-1 row-span-1";
    }
  };

  const handleServiceClick = (service: typeof services[0]) => {
    setSelectedService(service);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedService(null);
  };

  return (
    <motion.section
      id="Services"
      className="relative py-20 lg:py-32 overflow-hidden"
      ref={containerRef}
      style={{ opacity, y }}
    >
      {/* Background gradient matching hero */}
      <div className="absolute inset-0 bg-[#202636]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          className="text-center mb-16 lg:mb-24"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
        >
          {/* Badge */}
          <motion.div
            className="inline-flex items-center py-2 px-4 border border-white/20 bg-[#202636]/20 backdrop-blur-md rounded-full mb-6 shadow-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <SparklesIcon className="text-amber-400 mr-2 h-4 w-4" />
            <span className="text-xs font-medium tracking-wider text-white/90 uppercase font-questrial">
              Our Services
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h2
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light leading-tight tracking-tight text-white mb-4 font-helvetica-neue"
            style={{ letterSpacing: "-0.02em" }}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <span className="block mb-2 font-light">AI-POWERED</span>
            <span className="block">
              <span className="font-medium text-amber-400">Business</span>
              <span className="font-light"> SOLUTIONS</span>
            </span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            className="text-lg sm:text-xl text-white/70 max-w-3xl mx-auto font-questrial"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Transform your business with intelligent automation, chatbots, voice AI, and advanced analytics
          </motion.p>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8 auto-rows-fr"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-[#202636]/20 backdrop-blur-md transition-all duration-500 hover:border-white/20 hover:bg-[#202636]/30 cursor-pointer ${getGridClass(service.size, index)}`}
              variants={itemVariants}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              onClick={() => handleServiceClick(service)}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
            >
              {/* Background Image */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={service.imageUrl}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20 group-hover:from-black/95 group-hover:via-black/60 transition-all duration-500" />
              </div>

              {/* Content */}
              <div className="relative z-10 p-6 lg:p-8 h-full flex flex-col justify-end">
                {/* Icon */}
                <motion.div
                  className="mb-4 p-3 rounded-full bg-[#202636]/40 backdrop-blur-sm border border-white/10 w-fit group-hover:bg-[#202636]/60 transition-all duration-300"
                  whileHover={{ 
                    scale: 1.1,
                    rotate: [0, -5, 5, 0],
                    transition: { duration: 0.5 }
                  }}
                >
                  {service.icon}
                </motion.div>

                {/* Title */}
                <h3 className="text-xl lg:text-2xl font-medium text-white mb-3 font-helvetica-neue group-hover:text-amber-400 transition-colors duration-300">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-sm lg:text-base text-white/70 leading-relaxed font-questrial group-hover:text-white/90 transition-colors duration-300">
                  {service.description}
                </p>

                {/* Hover Arrow */}
                <motion.div
                  className="mt-4 flex items-center text-sm font-medium text-amber-400 opacity-0 group-hover:opacity-100 transition-all duration-300"
                  initial={{ x: -10 }}
                  whileHover={{ x: 0 }}
                >
                  <span className="font-questrial">Click to learn more</span>
                  <svg 
                    className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.div>
              </div>

              {/* Animated border glow */}
              <motion.div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(251, 191, 36, 0.1), transparent)",
                  backgroundSize: "200% 100%",
                }}
                animate={{
                  backgroundPosition: hoveredIndex === index ? ["0% 0%", "200% 0%"] : "0% 0%",
                }}
                transition={{
                  duration: 2,
                  repeat: hoveredIndex === index ? Infinity : 0,
                  ease: "linear",
                }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16 lg:mt-24"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <motion.a
            href="#BookingForm"
            className="inline-flex items-center py-3 px-8 border border-white/20 bg-[#202636]/20 backdrop-blur-md rounded-full text-white font-medium tracking-wide hover:bg-[#202636]/30 hover:border-amber-400/50 transition-all duration-300 font-questrial"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 0 20px rgba(251, 191, 36, 0.2)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            <SparklesIcon className="text-amber-400 mr-2 h-4 w-4" />
            Get Started
          </motion.a>
        </motion.div>
      </div>

      {/* Service Drawer */}
      <ServiceDrawer
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
        service={selectedService}
      />
    </motion.section>
  );
};

export default Services;
