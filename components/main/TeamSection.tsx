"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence, useInView } from "framer-motion";
import AnimatedHeading from "../ui/animated-heading";
import { FaLinkedinIn, FaTwitter, FaInstagram } from "react-icons/fa";
import { SparklesIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import { useMotionValue, useSpring } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const TeamSection = () => {
  const { t } = useLanguage();
  // State for active team member
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });

  // Mouse position for 3D effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring animation for mouse movement
  const rotateX = useSpring(mouseY, { stiffness: 100, damping: 30 });
  const rotateY = useSpring(mouseX, { stiffness: 100, damping: 30 });

  // Handle mouse move for 3D card effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const offsetX = (e.clientX - centerX) / 25;
    const offsetY = (e.clientY - centerY) / 25;

    mouseX.set(offsetX);
    mouseY.set(-offsetY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const teamMembers = [
    {
      name: "Shaun Cere",
      role: "Founder",
      bio: "Founder of Noryon, focused on building AI-driven solutions that deliver measurable business impact.",
      image: "/team/Rohan.jpg",
      social: {
        linkedin: "#",
        twitter: "#",
        instagram: "#"
      },
      color: "from-blue-500 to-indigo-600",
      accent: "#4f46e5",
      skills: ["Leadership", "AI Strategy", "Growth"]
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 80, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15
      }
    }
  };

  const cardVariants = {
    initial: { scale: 0.9, opacity: 0, y: 50 },
    animate: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 200,
        damping: 20,
        duration: 0.5
      }
    },
    exit: {
      scale: 0.9,
      opacity: 0,
      y: -50,
      transition: {
        duration: 0.3
      }
    },
    hover: {
      y: -10,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)",
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 20
      }
    }
  };

  const imageVariants = {
    initial: { scale: 1.2, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 20,
        delay: 0.1
      }
    }
  };

  const socialIconVariants = {
    initial: { opacity: 0, y: 20 },
    animate: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.3 + custom * 0.1,
        duration: 0.5,
        ease: [0.43, 0.13, 0.23, 0.96] as const
      }
    }),
    hover: {
      y: -5,
      scale: 1.1,
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 10
      }
    }
  };

  const skillVariants = {
    initial: { opacity: 0, x: -20 },
    animate: (custom: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.5 + custom * 0.1,
        duration: 0.4
      }
    })
  };

  return (
    <section id="TeamSection" className="bg-transparent text-white px-8 py-24 md:px-20 overflow-hidden" ref={sectionRef}>
      <div className="container mx-auto">
        {/* Section Header with Animation */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center justify-center mb-3">
                          <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-gray-500 mr-4"></div>
            <motion.span
                              className="text-gray-500 uppercase tracking-wider text-sm font-medium flex items-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <motion.div
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
              >
                <SparklesIcon className="h-5 w-5 mr-2 text-gray-500" />
              </motion.div>
              {t("team.leadership")}
            </motion.span>
                          <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-gray-500 ml-4"></div>
          </div>

          <AnimatedHeading as="h2" className="text-4xl md:text-5xl font-bold mb-4">
            {t("team.meetFounder")}
          </AnimatedHeading>

          
        </motion.div>

        {/* Team Member Selector */}
        <div className="mb-16">
          <motion.div
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {teamMembers.map((member, index) => (
              <motion.button
                key={index}
                className={`px-6 py-3 rounded-full text-sm md:text-base font-medium transition-all duration-300 ${activeIndex === index
                  ? `bg-gradient-to-r ${member.color} text-white shadow-lg`
                  : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'}`}
                onClick={() => setActiveIndex(index)}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.97 }}
              >
                {member.name.split(' ')[0]}
              </motion.button>
            ))}
          </motion.div>
        </div>

        {/* Featured Team Member Card with 3D Effect */}
        <div className="max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              className="relative"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={cardVariants}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                perspective: 1000,
                transformStyle: "preserve-3d"
              }}
            >
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-8 rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-lg border border-gray-700/50 p-6 md:p-8 shadow-xl"
                style={{
                  rotateX: rotateX,
                  rotateY: rotateY,
                  transformStyle: "preserve-3d"
                }}
              >
                {/* Image Column */}
                <div className="relative aspect-[4/5] md:aspect-auto overflow-hidden rounded-xl">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-black/20 to-black/60 z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  />

                  <motion.div
                    className="relative h-full w-full"
                    variants={imageVariants}
                    style={{ z: 20 }}
                  >
                    <Image
                      src={teamMembers[activeIndex].image}
                      alt={teamMembers[activeIndex].name}
                      fill
                      className="object-cover"
                      priority
                    />
                  </motion.div>

                  {/* Glowing accent */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-1/3 z-20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    style={{
                      background: `linear-gradient(to top, ${teamMembers[activeIndex].accent}40, transparent)`
                    }}
                  />

                  {/* Social Icons */}
                  <div className="absolute bottom-6 left-6 z-30 flex space-x-4">
                    <motion.a
                      href={teamMembers[activeIndex].social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 border border-white/20"
                      variants={socialIconVariants}
                      custom={0}
                      whileHover="hover"
                    >
                      <FaLinkedinIn size={18} />
                    </motion.a>
                    <motion.a
                      href={teamMembers[activeIndex].social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 border border-white/20"
                      variants={socialIconVariants}
                      custom={1}
                      whileHover="hover"
                    >
                      <FaTwitter size={18} />
                    </motion.a>
                    <motion.a
                      href={teamMembers[activeIndex].social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 border border-white/20"
                      variants={socialIconVariants}
                      custom={2}
                      whileHover="hover"
                    >
                      <FaInstagram size={18} />
                    </motion.a>
                  </div>
                </div>

                {/* Content Column */}
                <div className="flex flex-col justify-center relative z-10">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    <div className="mb-6">
                      <motion.div
                        className="h-1 w-16 rounded-full mb-6"
                        initial={{ width: 0 }}
                        animate={{ width: 64 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        style={{ background: `linear-gradient(to right, ${teamMembers[activeIndex].accent}, ${teamMembers[activeIndex].accent}80)` }}
                      />

                      <motion.h3
                        className="text-3xl md:text-4xl font-bold mb-2 text-white font-helvetica-neue"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                      >
                        {teamMembers[activeIndex].name}
                      </motion.h3>

                      <motion.p
                        className="text-lg font-medium mb-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        style={{ color: teamMembers[activeIndex].accent }}
                      >
                        {teamMembers[activeIndex].role}
                      </motion.p>

                      <motion.p
                        className="text-gray-300 mb-8 text-base md:text-lg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                      >
                        {teamMembers[activeIndex].bio}
                      </motion.p>
                    </div>

                    <div className="mb-8">
                      <h4 className="text-white text-lg font-medium mb-4 font-helvetica-neue">{t("team.expertise")}</h4>
                      <div className="flex flex-wrap gap-2">
                        {teamMembers[activeIndex].skills.map((skill, i) => (
                          <motion.span
                            key={i}
                            className="px-4 py-2 rounded-full text-sm bg-white/10 backdrop-blur-md border border-white/10"
                            variants={skillVariants}
                            custom={i}
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    <div className="flex space-x-3">
                      <motion.button
                        className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-white transition-all duration-300"
                        style={{
                          background: `linear-gradient(to right, ${teamMembers[activeIndex].accent}, ${teamMembers[activeIndex].accent}80)`,
                          boxShadow: `0 8px 20px -8px ${teamMembers[activeIndex].accent}80`
                        }}
                        whileHover={{ y: -3, boxShadow: `0 12px 20px -6px ${teamMembers[activeIndex].accent}80` }}
                        whileTap={{ scale: 0.97 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                      >
                        {t("team.connect")}
                        <ArrowRightIcon className="h-4 w-4" />
                      </motion.button>

                      
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* 3D floating elements */}
              <motion.div
                className="absolute -top-8 -right-8 w-24 h-24 rounded-full opacity-30 blur-xl z-0"
                animate={{
                  y: [0, 15, 0],
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.3, 0.2]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
                style={{
                  background: `radial-gradient(circle, ${teamMembers[activeIndex].accent}, transparent)`,
                  transformStyle: "preserve-3d",
                  transform: "translateZ(20px)"
                }}
              />

              <motion.div
                className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full opacity-20 blur-xl z-0"
                animate={{
                  y: [0, -20, 0],
                  scale: [1, 1.1, 1],
                  opacity: [0.1, 0.2, 0.1]
                }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
                style={{
                  background: `radial-gradient(circle, ${teamMembers[activeIndex].accent}, transparent)`,
                  transformStyle: "preserve-3d",
                  transform: "translateZ(10px)"
                }}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
