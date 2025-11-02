"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { SparklesIcon, ChevronDownIcon } from "@heroicons/react/24/solid";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Navigation items
  const navigationItems = [
    { name: "Home", href: "#Hero" },
    { name: "About", href: "#aboutus" },
    { name: "Services", href: "#Services" },
    { name: "Approach", href: "#Approach" },
    { name: "Portfolio", href: "#Portfolio" },
    { name: "Projects", href: "#projects" },
    { name: "Team", href: "#TeamSection" },
    { name: "Process", href: "#ProcessTimeline" },
    { name: "FAQ", href: "#FAQSection" },
    { name: "Contact", href: "#ContactForm" },
    { name: "Book a Call", href: "#BookingForm" },
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const dropdown = document.getElementById('navigation-dropdown');
      const button = document.getElementById('navigation-button');
      if (dropdown && button && !dropdown.contains(event.target as Node) && !button.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close mobile menu when clicking on a link
  const handleLinkClick = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
    setIsDropdownOpen(false);
  };

  // Handle navigation for both hash links and page routes
  const handleNavigation = (href: string) => {
    handleLinkClick();
    
    // If it's a page route (doesn't start with #), use Next.js navigation
    if (!href.startsWith('#')) {
      window.location.href = href;
      return;
    }
    
    // Otherwise, handle smooth scroll for hash links
    const targetId = href.replace('#', '');
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Navbar variants for animation
  const navVariants = {
    hidden: { opacity: 0, y: -20 },
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

  // Link hover animation variants
  const linkVariants = {
    initial: { y: 0, scale: 1, rotateX: 0 },
    hover: {
      y: -5,
      scale: 1.05,
      rotateX: 10,
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 10
      }
    }
  };

  // Enhanced floating animation for navbar
  const floatingNavVariants = {
    initial: { y: 0, rotate: 0, scale: 1, x: 0 },
    animate: {
      y: 0,
      rotate: 0,
      scale: 1,
      x: 0,
      transition: {
        duration: 0,
      }
    }
  };

  // Mobile menu animation variants
  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      y: -10,
      scale: 0.98,
      transition: {
        duration: 0.15,
        ease: "easeOut" as const
      }
    },
    open: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.2,
        ease: "easeOut" as const,
        staggerChildren: 0.05,
        delayChildren: 0.05
      }
    }
  };

  // Mobile menu item animation variants
  const menuItemVariants = {
    closed: {
      opacity: 0,
      y: -5,
      transition: { duration: 0.1 }
    },
    open: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.2 }
    }
  };

  // Dropdown animation variants
  const dropdownVariants = {
    closed: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: {
        duration: 0.15,
        ease: "easeOut" as const
      }
    },
    open: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.2,
        ease: "easeOut" as const,
        staggerChildren: 0.03,
        delayChildren: 0.05
      }
    }
  };

  const dropdownItemVariants = {
    closed: {
      opacity: 0,
      x: -10,
      transition: { duration: 0.1 }
    },
    open: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.15 }
    }
  };

  return (
    <motion.nav
      initial="hidden"
      animate="visible"
      variants={navVariants}
      className={`fixed w-full z-50 top-0 px-3 sm:px-4 md:px-10 transition-all duration-300 ${scrolled ? "py-1 sm:py-2" : "py-2 sm:py-4"}`}
    >
      <div className="max-w-screen-xl mx-auto">
        <div
          className={`${scrolled ? "py-2" : "py-3"}
          px-4 sm:px-4 md:px-6 rounded-2xl
          bg-gradient-to-r from-[#03001417] via-[#03001440] to-[#03001417]
          backdrop-blur-xl border border-[#ffffff30]
          shadow-[inset_0_1px_2px_rgba(255,255,255,0.4),_0_8px_10px_rgba(0,0,0,0.2)]
          transition-all duration-300 ease-in-out
          transform hover:scale-[1.01]
          hover:border-[#ffffff40]
          flex items-center justify-between
          before:content-[''] before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-b before:from-[#ffffff20] before:to-transparent before:opacity-50 before:pointer-events-none
          relative touch-manipulation`}
        >
          {/* Logo Image */}
          <div className="flex items-center" >
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400 }}
              className="cursor-pointer"
            >
              <Link href="#Hero">
                <Image
                  src="/logo-removebg-preview.png"
                  alt="Noryon Logo"
                  width={360}
                  height={120}
                  className="cursor-pointer h-8 sm:h-10 w-auto object-contain"
                />
              </Link>
            </motion.div>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white p-2.5 focus:outline-none focus:ring-2 focus:ring-orange-500/50 rounded-lg touch-manipulation active:scale-95 transition-transform"
              aria-expanded={isMenuOpen}
              aria-label="Toggle navigation"
            >
              <motion.div
                initial={false}
                animate={isMenuOpen ? "open" : "closed"}
                className="w-6 h-6 relative"
              >
                <motion.span
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: 45, y: 8 }
                  }}
                  className="absolute h-0.5 w-6 bg-white rounded-full"
                  style={{ top: "25%" }}
                ></motion.span>
                <motion.span
                  variants={{
                    closed: { opacity: 1 },
                    open: { opacity: 0 }
                  }}
                  className="absolute h-0.5 w-6 bg-white rounded-full"
                  style={{ top: "50%" }}
                ></motion.span>
                <motion.span
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: -45, y: -8 }
                  }}
                  className="absolute h-0.5 w-6 bg-white rounded-full"
                  style={{ top: "75%" }}
                ></motion.span>
              </motion.div>
            </button>
          </div>

          {/* Desktop Navigation with Dropdown */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            {/* Navigation Dropdown */}
            <div className="relative">
              <motion.button
                id="navigation-button"
                onClick={toggleDropdown}
                className="flex items-center space-x-2 text-white hover:text-orange-400 transition-colors duration-300 px-4 py-2 rounded-lg hover:bg-white/10"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="font-medium">Navigate</span>
                <motion.div
                  animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDownIcon className="h-4 w-4" />
                </motion.div>
              </motion.button>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    id="navigation-dropdown"
                    initial="closed"
                    animate="open"
                    exit="closed"
                    variants={dropdownVariants}
                    className="absolute top-full left-0 mt-2 w-56 bg-gradient-to-r from-[#03001450] via-[#03001470] to-[#03001450] backdrop-blur-xl border border-[#ffffff20] rounded-xl shadow-xl overflow-hidden z-50"
                  >
                    <div className="py-2">
                      {navigationItems.map((item, index) => (
                        <motion.button
                          key={item.name}
                          variants={dropdownItemVariants}
                          onClick={() => handleNavigation(item.href)}
                          className="w-full text-left px-4 py-2.5 text-white hover:text-orange-400 hover:bg-white/10 transition-all duration-200 flex items-center group"
                          whileHover={{ x: 5 }}
                        >
                          <span className="font-medium">{item.name}</span>
                          <motion.svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3 w-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </motion.svg>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-5">
              <motion.a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-orange-400 transition-colors duration-300"
                whileHover={{ y: -5, scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </motion.svg>
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/company/Noryonindia"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-orange-400 transition-colors duration-300"
                whileHover={{ y: -5, scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </motion.svg>
              </motion.a>
              <motion.a
                href="https://www.instagram.com/Noryon.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-orange-400 transition-colors duration-300"
                whileHover={{ y: -5, scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </motion.svg>
              </motion.a>
              <motion.a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-orange-400 transition-colors duration-300"
                whileHover={{ y: -5, scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </motion.svg>
              </motion.a>
            </div>

            <a
              href="https://api.whatsapp.com/send?phone=919810724697&text=Hey"
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex h-12 overflow-hidden items-center justify-center rounded-xl px-6 font-medium group"
            >
              <motion.span
                className="absolute inset-0 w-full h-full bg-gradient-to-br from-orange-600 via-orange-500 to-amber-500 opacity-0 group-hover:opacity-100"
                initial={{ opacity: 0 }}
                whileHover={{
                  opacity: 1,
                  backgroundPosition: ["0% 0%", "100% 100%"],
                  transition: { duration: 1.5, ease: "easeInOut" }
                }}
                style={{ backgroundSize: "200% 200%" }}
              ></motion.span>
              <span className="absolute top-0 left-0 w-full bg-gradient-to-b from-white to-transparent opacity-5 h-1/3"></span>
              <span className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-white to-transparent opacity-5"></span>
              <span className="absolute bottom-0 left-0 w-4 h-full bg-gradient-to-r from-white to-transparent opacity-5"></span>
              <span className="absolute bottom-0 right-0 w-4 h-full bg-gradient-to-l from-white to-transparent opacity-5"></span>
              <span className="absolute inset-0 w-full h-full border border-white opacity-10 rounded-xl"></span>
              <motion.span
                className="absolute bg-white rounded-full opacity-5"
                initial={{ width: 0, height: 0, x: "50%", y: "50%" }}
                whileHover={{
                  width: 200,
                  height: 200,
                  x: 0,
                  y: 0,
                  transition: { duration: 0.5, ease: "easeOut" }
                }}
              ></motion.span>
              <motion.span
                className="relative text-white group-hover:text-white z-10 flex items-center text-base font-medium"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                Text Us
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-1.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  initial={{ x: 0, opacity: 0.5 }}
                  animate={{ x: [0, 3, 0], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </motion.svg>
              </motion.span>
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Menu (Overlay) - Now includes navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
            className="fixed top-[calc(4rem)] left-3 right-3 bg-gradient-to-r from-[#03001417] via-[#03001450] to-[#03001417] backdrop-blur-lg border border-[#ffffff20] rounded-xl shadow-xl p-4 z-50 max-h-[calc(100vh-5rem)] overflow-y-auto touch-manipulation"
          >
            <div className="flex flex-col space-y-5">
              {/* Navigation Links for Mobile */}
              <motion.div className="space-y-1" variants={menuItemVariants}>
                <h3 className="text-white font-semibold text-sm uppercase tracking-wider px-3 py-2 text-center font-helvetica-neue">
                  Navigate
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {navigationItems.map((item) => (
                    <motion.button
                      key={item.name}
                      onClick={() => handleSmoothScroll(item.href)}
                      className="text-white hover:text-orange-400 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 hover:bg-white/10 text-left"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {item.name}
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              <motion.div
                className="flex justify-center space-x-6 py-3 border-t border-white/10"
                variants={menuItemVariants}
              >
                <motion.a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-orange-400 transition-colors duration-300"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </motion.a>
                <motion.a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-orange-400 transition-colors duration-300"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </motion.a>
                <motion.a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-orange-400 transition-colors duration-300"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </motion.a>
                <motion.a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-orange-400 transition-colors duration-300"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                  </svg>
                </motion.a>
              </motion.div>

              <motion.div variants={menuItemVariants} className="pt-2">
                <a
                  href="https://api.whatsapp.com/send?phone=919810724697&text=Hey"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleLinkClick}
                  className="block w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-medium py-3 px-4 rounded-xl text-center hover:shadow-lg hover:shadow-orange-500/20 transition-all duration-300"
                >
                  Text Us
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;