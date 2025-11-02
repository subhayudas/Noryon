"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { FaTwitter, FaFacebook, FaInstagram, FaLinkedin, FaGithub, FaArrowUp, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { IoIosArrowUp } from "react-icons/io";

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const controls = useAnimation();
  
  // Handle scroll to top button visibility
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  // Animation for footer elements
  useEffect(() => {
    controls.start({
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1
      }
    });
  }, [controls]);

  // Social icon hover animation
  const socialIconVariants = {
    initial: { scale: 1, rotate: 0 },
    hover: { 
      scale: 1.2, 
      rotate: 12,
      filter: "drop-shadow(0 0 10px rgba(249, 115, 22, 0.8))",
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 8
      }
    }
  };

  // Footer link hover animation
  const linkVariants = {
    initial: { x: 0, opacity: 0.9 },
    hover: { 
      x: 5, 
      opacity: 1,
      color: "#00c8cf",
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 10
      }
    }
  };

  // Scroll to top button animation
  const scrollButtonVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 15
      }
    },
    exit: { 
      scale: 0, 
      opacity: 0,
      transition: {
        duration: 0.3
      }
    },
    hover: {
      scale: 1.1,
      y: -5,
      boxShadow: "0 0 20px rgba(249, 115, 22, 0.8)",
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 10
      }
    }
  };
  
  // Text reveal animation
  const textRevealVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <footer className="relative bg-gradient-to-b from-[#202636] via-[#1a1f2e] to-[#151a26] pt-24 pb-8 overflow-hidden">
      {/* Background elements removed for performance */}

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 relative z-10">
        {/* Footer Top - Logo and Newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={controls}
          className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-16 border-b border-gray-800/50 pb-16"
        >
          {/* Logo and Tagline */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={controls}
            className="flex flex-col items-center lg:items-start space-y-4 w-full lg:w-1/2"
          >
            <div className="flex items-center space-x-3">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="relative"
              >
                <motion.div
                  animate={{
                    boxShadow: [
                      '0 0 0 0 rgba(249, 115, 22, 0)',
                      '0 0 0 8px rgba(249, 115, 22, 0.2)',
                      '0 0 0 0 rgba(249, 115, 22, 0)'
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 rounded-full"
                />
                <Image
                  src="/logo.png"
                  alt="Noryon Logo"
                  width={60}
                  height={60}
                  className="rounded-full border-2 border-orange-400/30"
                />
              </motion.div>
              <motion.h2 
                className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-amber-300"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                style={{ backgroundSize: "200% 100%" }}
              >
                Noryon
              </motion.h2>
            </div>
            <p className="text-gray-300 text-center lg:text-left max-w-md leading-relaxed">
              Transforming businesses with AI-powered automation, intelligent chatbots, and smart solutions that drive growth and efficiency.
            </p>
            
            {/* Social Icons */}
            <div className="flex items-center justify-center lg:justify-start space-x-5 mt-2">
              <motion.a 
                href="https://twitter.com/noryon" 
                target="_blank" 
                rel="noopener noreferrer"
                variants={socialIconVariants}
                initial="initial"
                whileHover="hover"
                className="text-gray-300 hover:text-orange-500 transition-colors"
              >
                <FaTwitter size={22} />
              </motion.a>
              <motion.a 
                href="https://facebook.com/noryon" 
                target="_blank" 
                rel="noopener noreferrer"
                variants={socialIconVariants}
                initial="initial"
                whileHover="hover"
                className="text-gray-300 hover:text-orange-500 transition-colors"
              >
                <FaFacebook size={22} />
              </motion.a>
              <motion.a 
                href="https://www.instagram.com/noryon.ai/" 
                target="_blank" 
                rel="noopener noreferrer"
                variants={socialIconVariants}
                initial="initial"
                whileHover="hover"
                className="text-gray-300 hover:text-orange-500 transition-colors"
              >
                <FaInstagram size={22} />
              </motion.a>
              <motion.a 
                href="https://www.linkedin.com/company/noryon" 
                target="_blank" 
                rel="noopener noreferrer"
                variants={socialIconVariants}
                initial="initial"
                whileHover="hover"
                className="text-gray-300 hover:text-orange-500 transition-colors"
              >
                <FaLinkedin size={22} />
              </motion.a>
              
            </div>
          </motion.div>
          
          {/* Newsletter */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={controls}
            className="w-full lg:w-1/2 bg-gradient-to-br from-[#202636]/80 to-[#1a1f2e]/80 p-8 rounded-2xl border border-[#00c8cf]/30 backdrop-blur-sm shadow-xl relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#00c8cf]/5 to-[#04a8ae]/5 pointer-events-none"></div>
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center font-helvetica-neue">
                <motion.span 
                  initial={{ rotate: 0 }}
                  animate={{ rotate: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 5 }}
                  className="mr-2 text-orange-500"
                >
                  ✉️
                </motion.span>
                Stay Connected
              </h3>
              <p className="text-gray-300 mb-6">Get exclusive updates, insights, and special offers directly to your inbox.</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="flex-grow px-4 py-3 bg-white/10 border border-purple-900/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/50 text-white"
                />
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-medium rounded-lg shadow-lg hover:shadow-orange-500/30 transition-all duration-300 whitespace-nowrap"
                >
                  Subscribe
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Footer Links Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={controls}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 mb-16"
        >
          {/* Navigation Links - Column 1 */}
          <motion.div 
            variants={textRevealVariants}
            initial="hidden"
            animate="visible"
            className="col-span-1"
          >
            <h3 className="text-xl font-semibold text-white mb-6 relative inline-block font-helvetica-neue">
              Navigation
              <motion.span 
                className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-orange-500 to-amber-500"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
            </h3>
            <ul className="space-y-4">
              <li>
                <motion.div variants={linkVariants} initial="initial" whileHover="hover">
                  <Link href="#Hero" className="text-gray-300 hover:text-orange-500 transition-all flex items-center">
                    <span className="text-orange-500 mr-2">›</span> Home
                  </Link>
                </motion.div>
              </li>
              <li>
                <motion.div variants={linkVariants} initial="initial" whileHover="hover">
                  <Link href="#Services" className="text-gray-300 hover:text-orange-500 transition-all flex items-center">
                    <span className="text-orange-500 mr-2">›</span> Services
                  </Link>
                </motion.div>
              </li>
              <li>
                <motion.div variants={linkVariants} initial="initial" whileHover="hover">
                  <Link href="#Approach" className="text-gray-300 hover:text-orange-500 transition-all flex items-center">
                    <span className="text-orange-500 mr-2">›</span> Our Approach
                  </Link>
                </motion.div>
              </li>
              <li>
                <motion.div variants={linkVariants} initial="initial" whileHover="hover">
                  <Link href="#ProcessTimeline" className="text-gray-300 hover:text-orange-500 transition-all flex items-center">
                    <span className="text-orange-500 mr-2">›</span> Process
                  </Link>
                </motion.div>
              </li>
              <li>
                <motion.div variants={linkVariants} initial="initial" whileHover="hover">
                  <Link href="#TeamSection" className="text-gray-300 hover:text-orange-500 transition-all flex items-center">
                    <span className="text-orange-500 mr-2">›</span> Our Team
                  </Link>
                </motion.div>
              </li>
            </ul>
          </motion.div>

          {/* Services Links */}
          <motion.div 
            variants={textRevealVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
            className="col-span-1"
          >
            <h3 className="text-xl font-semibold text-white mb-6 relative inline-block font-helvetica-neue">
              Our Services
              <motion.span 
                className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-orange-500 to-amber-500"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
            </h3>
            <ul className="space-y-4">
              <li>
                <motion.div variants={linkVariants} initial="initial" whileHover="hover">
                  <Link href="#Services" className="text-gray-300 hover:text-orange-500 transition-all flex items-center">
                    <span className="text-orange-500 mr-2">›</span> AI Chatbots
                  </Link>
                </motion.div>
              </li>
              <li>
                <motion.div variants={linkVariants} initial="initial" whileHover="hover">
                  <Link href="#Services" className="text-gray-300 hover:text-orange-500 transition-all flex items-center">
                    <span className="text-orange-500 mr-2">›</span> Voice AI
                  </Link>
                </motion.div>
              </li>
              <li>
                <motion.div variants={linkVariants} initial="initial" whileHover="hover">
                  <Link href="#Services" className="text-gray-300 hover:text-orange-500 transition-all flex items-center">
                    <span className="text-orange-500 mr-2">›</span> Business Automation
                  </Link>
                </motion.div>
              </li>
              <li>
                <motion.div variants={linkVariants} initial="initial" whileHover="hover">
                  <Link href="#Services" className="text-gray-300 hover:text-orange-500 transition-all flex items-center">
                    <span className="text-orange-500 mr-2">›</span> Review Management
                  </Link>
                </motion.div>
              </li>
              <li>
                <motion.div variants={linkVariants} initial="initial" whileHover="hover">
                  <Link href="#Services" className="text-gray-300 hover:text-orange-500 transition-all flex items-center">
                    <span className="text-orange-500 mr-2">›</span> AI Analytics
                  </Link>
                </motion.div>
              </li>
            </ul>
          </motion.div>

          

          {/* Contact Info */}
          <motion.div 
            variants={textRevealVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.3 }}
            className="col-span-1"
          >
            <h3 className="text-xl font-semibold text-white mb-6 relative inline-block font-helvetica-neue">
              Contact Us
              <motion.span 
                className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-orange-500 to-amber-500"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.8, delay: 0.5 }}
              />
            </h3>
            <div className="space-y-5">
              <motion.div 
                className="flex items-start space-x-3 group"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="mt-1 text-orange-500 group-hover:text-orange-400 transition-colors">
                  <FaMapMarkerAlt className="h-5 w-5" />
                </div>
                <p className="text-gray-300 group-hover:text-white transition-colors">Gurgaon, Haryana</p>
              </motion.div>
              <motion.div 
                className="flex items-start space-x-3 group"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="mt-1 text-orange-500 group-hover:text-orange-400 transition-colors">
                  <FaPhoneAlt className="h-4 w-4" />
                </div>
                <p className="text-gray-300 group-hover:text-white transition-colors">+91 9810724697</p>
              </motion.div>
              <motion.div 
                className="flex items-start space-x-3 group"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="mt-1 text-orange-500 group-hover:text-orange-400 transition-colors">
                  <HiOutlineMail className="h-5 w-5" />
                </div>
                <p className="text-gray-300 group-hover:text-white transition-colors">hello@noryon.ai</p>
              </motion.div>
              <motion.div 
                className="mt-6"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Link 
                  href="#BookingForm" 
                  className="inline-block px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-medium rounded-lg shadow-lg hover:shadow-orange-500/40 transition-all duration-300"
                >
                  <span className="flex items-center justify-center">
                    <span className="mr-2">Book a Consultation</span>
                    <motion.span 
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                    >
                      →
                    </motion.span>
                  </span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Divider */}
        <div className="relative h-px w-full my-12 overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute h-px w-full bg-gradient-to-r from-transparent via-orange-500/50 to-transparent"
          />
          <motion.div 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-gradient-to-br from-orange-500/20 to-amber-500/20 backdrop-blur-sm flex items-center justify-center"
          >
            <motion.div 
              animate={{ 
                rotate: 360,
                boxShadow: [
                  "0 0 0 0px rgba(249, 115, 22, 0.3)",
                  "0 0 0 4px rgba(249, 115, 22, 0.1)",
                  "0 0 0 0px rgba(249, 115, 22, 0.3)"
                ]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="w-6 h-6 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 flex items-center justify-center text-white text-xs font-bold"
            >
              <span>NY</span>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Footer */}
        <div className="pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-center mb-4 md:mb-0"
            >
              <motion.span 
                className="text-gray-400 text-sm"
                whileHover={{ color: "#00c8cf" }}
                transition={{ duration: 0.2 }}
              >
                © {new Date().getFullYear()} Noryon. All rights reserved.
              </motion.span>
              
            </motion.div>
           
          </div>
        </div>
      </div>

      {/* Scroll to top button */}
      <AnimatePresence>
        {isVisible && (
          <motion.button
            onClick={scrollToTop}
            variants={scrollButtonVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            whileHover="hover"
            className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white flex items-center justify-center shadow-xl z-50 border border-orange-400/30 backdrop-blur-sm"
            aria-label="Scroll to top"
          >
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="flex items-center justify-center"
            >
              <FaArrowUp size={20} />
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
};

export default Footer;