"use client";
import React from "react";
import { motion } from "framer-motion";
import { slideInFromLeft, slideInFromRight, slideInFromTop } from "@/utils/motion";
import { SparklesIcon } from "@heroicons/react/24/solid";
import ImageCursorTrail from "../ui/image-cursortrail";

const ImageTrailSection = () => {
  const imageTrailItems = [
    { src: "/imagetrail1.jpeg", alt: "Creative Project 1" },
    { src: "/imagetrail2.jpeg", alt: "Creative Project 2" },
    { src: "/imagetrail3.jpeg", alt: "Creative Project 3" },
    { src: "/imagetrail4.jpeg", alt: "Creative Project 4" },
    { src: "/imagetrail5.jpeg", alt: "Creative Project 5" },
    { src: "/imagetrail6.jpeg", alt: "Creative Project 6" },
    { src: "/imagetrail7.jpeg", alt: "Creative Project 7" },
  ];

  return (
    <ImageCursorTrail
      items={imageTrailItems}
      className="relative w-full min-h-screen bg-[#202636]"
      imgClass="w-48 h-60 sm:w-52 sm:h-64 md:w-56 md:h-72"
      distance={15}
      maxNumberOfImages={6}
      fadeAnimation={true}
    >
      {/* Subtle overlay for depth */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-900/10 via-transparent to-pink-900/10 z-15 pointer-events-none"></div>
      
      {/* Content overlay */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-6 py-16 pointer-events-none">
        <div className="w-full max-w-5xl mx-auto text-center">
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center py-2 px-4 border border-white/20 bg-[#202636]/20 backdrop-blur-md rounded-full mb-6 shadow-lg pointer-events-auto"
          >
            <SparklesIcon className="text-amber-400 mr-2 h-4 w-4" />
            <span className="text-xs font-medium tracking-wider text-white/90 uppercase">
              Creative Showcase (MOVE YOUR CURSOR)
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h2 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-tight tracking-tight text-white mb-4 font-helvetica-neue"
              style={{ 
                letterSpacing: "-0.02em"
              }}
            >
              <span className="block mb-2 font-light">EXPLORE</span>
              <span className="block">
                <span className="font-medium text-[#04a8ae]">Visual</span>
                <span className="font-light"> EXCELLENCE</span>
              </span>
            </h2>
          </motion.div>

          
        </div>
      </div>
    </ImageCursorTrail>
  );
};

export default ImageTrailSection; 