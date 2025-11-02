"use client";

import React, { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { SparklesIcon } from "@heroicons/react/24/solid";
import AnimatedHeading from "../ui/animated-heading";
import Image from "next/image";
import { Card } from "../ui/card";
import AnimatedButton from "../ui/animated-button";

interface ClientProject {
  id: number;
  name: string;
  logo: string;
  website: string;
  description: string;
  image: string;
  roi: string;
  testimonial: {
    quote: string;
    author: string;
    position: string;
  };
  tags: string[];
}

const Portfolio = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });
  const [activeProject, setActiveProject] = useState<number>(0);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax effect values
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.215, 0.61, 0.355, 1] as const
      }
    }
  };

  // Client projects data
  const clientProjects: ClientProject[] = [
    {
      id: 1,
      name: "TechFlow Solutions",
      logo: "/client-logos/techvision.svg",
      website: "techflow-ai.com",
      description: "Implemented AI-powered chatbot system that handles 80% of customer inquiries automatically, reducing response time by 90%.",
      image: "/portfolio/GaurikLanding.png",
      roi: "340%",
      testimonial: {
        quote: "Noryon's AI chatbot transformed our customer service completely. We now handle 3x more inquiries with half the staff, and customer satisfaction increased by 95%.",
        author: "Sarah Chen",
        position: "CEO, TechFlow Solutions"
      },
      tags: ["AI Chatbot", "Customer Service", "Automation", "24/7 Support"]
    },
    {
      id: 2,
      name: "MediCare Plus",
      logo: "/client-logos/greenleaf.svg",
      website: "medicare-ai.netlify.app",
      description: "Deployed intelligent voice AI system for appointment scheduling and patient inquiries, reducing call center workload by 70%.",
      image: "/portfolio/osso.png",
      roi: "280%",
      testimonial: {
        quote: "The voice AI system from Noryon revolutionized our patient experience. Appointment bookings increased by 150% and our staff can focus on patient care instead of scheduling.",
        author: "Dr. Michael Rodriguez",
        position: "Medical Director, MediCare Plus"
      },
      tags: ["Voice AI", "Healthcare", "Appointment Automation", "Patient Care"]
    }
  ];

  return (
    <motion.section
      id="Portfolio"
      ref={containerRef}
      className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      style={{ opacity }}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      {/* Background elements removed for performance */}

      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center px-4 py-2 rounded-full border border-[#7042f88b] bg-[#7042f80d] backdrop-blur-sm mb-6 shadow-[0_0_15px_rgba(112,66,248,0.15)]"
          >
            <SparklesIcon className="text-[#b49bff] h-5 w-5 mr-2 animate-pulse" />
            <AnimatedHeading as="h3" className="text-sm font-medium animated-gradient-text">
              Client Success Stories
            </AnimatedHeading>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <AnimatedHeading as="h2" className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              Transforming <span className="hero-violet-gradient">Businesses</span> with <span className="animated-gradient-text">AI Solutions</span>
            </AnimatedHeading>
          </motion.div>
          
          <motion.p 
            variants={itemVariants}
            className="text-lg text-white/70 max-w-3xl mx-auto"
          >
            Discover how we've helped businesses achieve remarkable growth through AI-powered automation, chatbots, and intelligent systems. Our client portfolio showcases real results and measurable success.
          </motion.p>
        </div>

        {/* Client logos - Modern Carousel */}
        <motion.div 
          variants={itemVariants}
          className="mb-16 relative"
        >
          <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>
          
          <div className="overflow-x-auto hide-scrollbar py-6 px-4">
            <motion.div 
              className="flex space-x-6 sm:space-x-8 min-w-max mx-auto justify-center"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {clientProjects.map((client, index) => (
                <motion.button
                  key={client.id}
                  onClick={() => setActiveProject(index)}
                  className={`relative group`}
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  animate={{
                    y: [0, activeProject === index ? -3 : -2, 0],
                    transition: {
                      duration: activeProject === index ? 3 : 4,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut",
                      delay: index * 0.2
                    }
                  }}
                >
                  <div 
                    className={`p-5 sm:p-6 backdrop-blur-md rounded-xl border transition-all duration-500 flex flex-col items-center
                      ${activeProject === index 
                        ? 'border-purple-500/50 bg-gradient-to-b from-purple-500/20 to-blue-500/10 shadow-[0_8px_32px_rgba(112,66,248,0.4)]' 
                        : 'border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 hover:shadow-[0_4px_20px_rgba(255,255,255,0.1)]'}`}
                  >
                    {/* Client Logo/Icon with enhanced design */}
                    <div className="w-16 h-16 sm:w-20 sm:h-20 mb-3 sm:mb-4 relative overflow-hidden rounded-lg">
                      {/* Base gradient background */}
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-indigo-600/15 to-blue-600/20 rounded-lg"></div>
                      
                      {/* Animated subtle pattern overlay */}
                      <motion.div 
                        className="absolute inset-0 opacity-30"
                        style={{
                          backgroundImage: 'radial-gradient(circle at 10% 20%, rgba(255,255,255,0.1) 0%, transparent 20%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.1) 0%, transparent 20%)'
                        }}
                        animate={{
                          rotate: [0, 360],
                          transition: { duration: 30, repeat: Infinity, ease: "linear" }
                        }}
                      />
                      
                      {/* Client initials */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-white via-white/90 to-white/70">
                          {client.name.substring(0, 2)}
                        </span>
                      </div>
                      
                      {/* Border highlight */}
                      <div className="absolute inset-0 rounded-lg border border-white/10"></div>
                      
                      {/* Glow effect on hover/active */}
                      <motion.div 
                        className={`absolute inset-0 rounded-lg bg-gradient-to-br from-purple-500/30 via-indigo-500/20 to-blue-500/30 blur-sm transition-opacity duration-500`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: activeProject === index ? 1 : 0 }}
                        whileHover={{ opacity: 0.5 }}
                      />
                    </div>
                    
                    {/* Client Name with animated underline */}
                    <p className="text-sm sm:text-base font-medium text-white/90 relative">
                      {client.name}
                      <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300 ${activeProject === index ? 'w-full' : 'group-hover:w-full'}`}></span>
                    </p>
                    
                    {/* Active indicator dot with pulse animation */}
                    {activeProject === index && (
                      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
                        <motion.div 
                          className="w-1.5 h-1.5 rounded-full bg-purple-500"
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          layoutId="activeProjectIndicator"
                        />
                        <motion.div 
                          className="absolute inset-0 rounded-full bg-purple-500"
                          initial={{ opacity: 0.7, scale: 1 }}
                          animate={{ opacity: 0, scale: 2.5 }}
                          transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
                        />
                      </div>
                    )}
                  </div>
                </motion.button>
              ))}
            </motion.div>
          </div>
          
          {/* Add custom CSS for hiding scrollbar */}
          <style jsx global>{`
            .hide-scrollbar {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
            .hide-scrollbar::-webkit-scrollbar {
              display: none;
            }
          `}</style>
        </motion.div>

        {/* Featured project */}
        <motion.div 
          variants={itemVariants}
          className="mb-20"
        >
          <Card className="overflow-hidden border border-white/10 shadow-[0_0_25px_rgba(0,200,207,0.15)] bg-[#202636]/40 backdrop-blur-md hover:shadow-[0_0_35px_rgba(0,200,207,0.25)] transition-all duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 p-4 sm:p-6 md:p-8 lg:p-10">
              {/* Project image */}
              <div className="relative overflow-hidden rounded-xl order-2 lg:order-1">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0.8 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  key={clientProjects[activeProject].id}
                >
                  <div className="relative aspect-video overflow-hidden rounded-xl border border-white/10 shadow-lg">
                    <Image 
                      src={clientProjects[activeProject].image} 
                      alt={clientProjects[activeProject].name} 
                      width={600} 
                      height={400}
                      className="object-cover w-full h-full transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                      <div>
                        <p className="text-white font-medium text-sm sm:text-base">{clientProjects[activeProject].name}</p>
                        <p className="text-white/70 text-xs sm:text-sm">{clientProjects[activeProject].website}</p>
                      </div>
                      <AnimatedButton 
                        href={`https://${clientProjects[activeProject].website}`}
                        className="text-xs py-1 px-3"
                      >
                        Visit Site
                      </AnimatedButton>
                    </div>
                  </div>
                </motion.div>
              </div>
              
              {/* Project details */}
              <div className="flex flex-col justify-between order-1 lg:order-2">
                <div>
                  <motion.div 
                    key={`details-${clientProjects[activeProject].id}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 font-helvetica-neue">{clientProjects[activeProject].name}</h3>
                    <p className="text-white/70 text-sm sm:text-base mb-4 sm:mb-6">{clientProjects[activeProject].description}</p>
                    
                    {/* ROI indicator */}
                    <div className="mb-4 sm:mb-6 bg-white/5 rounded-xl p-3 sm:p-4 border border-white/10 hover:bg-white/10 transition-colors duration-300">
                      <p className="text-xs sm:text-sm text-white/70 mb-1 sm:mb-2">Return on Investment</p>
                      <div className="flex items-end gap-2">
                        <span className="text-2xl sm:text-3xl font-bold text-green-400 font-helvetica-neue">{clientProjects[activeProject].roi}</span>
                        <span className="text-white/70 text-xs sm:text-sm">increase in revenue</span>
                      </div>
                    </div>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
                      {clientProjects[activeProject].tags.map((tag, i) => (
                        <span key={i} className="px-2 sm:px-3 py-1 bg-white/5 rounded-full text-xs text-white/70 hover:bg-white/10 transition-colors duration-300">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>
                
                {/* Testimonial */}
                <motion.div 
                  key={`testimonial-${clientProjects[activeProject].id}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-white/5 rounded-xl p-4 sm:p-6 border border-white/10 relative hover:bg-white/10 transition-colors duration-300"
                >
                  <div className="absolute -top-3 left-6 text-3xl sm:text-4xl text-white/20">❝</div>
                  <p className="text-white/80 text-sm sm:text-base italic mb-3 sm:mb-4">"{clientProjects[activeProject].testimonial.quote}"</p>
                  <div className="flex items-center">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center mr-3">
                      <span className="text-white text-sm sm:text-base font-bold">
                        {clientProjects[activeProject].testimonial.author.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-sm sm:text-base">{clientProjects[activeProject].testimonial.author}</p>
                      <p className="text-xs sm:text-sm text-white/70">{clientProjects[activeProject].testimonial.position}</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </Card>
        </motion.div>
        
        {/* Call to action */}
        <motion.div 
          variants={itemVariants}
          className="text-center bg-gradient-to-r from-black/40 to-black/40 backdrop-blur-sm p-8 rounded-2xl border border-white/10 shadow-[0_0_25px_rgba(112,66,248,0.15)] max-w-3xl mx-auto"
        >
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-gradient-to-br from-purple-500/30 to-blue-500/30 rounded-full blur-xl"></div>
                        <h3 className="text-2xl sm:text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400 font-helvetica-neue">Ready to Automate Your Business?</h3>
          <p className="text-lg sm:text-xl text-white/80 mb-6">Join our clients who have achieved remarkable growth with our AI-powered solutions</p>
          <AnimatedButton href="#BookingForm" className="mx-auto text-base px-6 py-3">
            Start Your Success Story
          </AnimatedButton>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Portfolio;