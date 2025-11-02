"use client";
import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useMediaQuery from "@/hooks/useMediaQuery";

const LoadingAnimation = () => {
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isMobile = useMediaQuery('(max-width: 767px)'); // md breakpoint is 768px

  useEffect(() => {
    // Start the video when component mounts
    if (videoRef.current) {
      // Set video source based on device type
      const video = videoRef.current;
      video.src = isMobile ? "/Mobile_ratio_video.mp4" : "/loadinganimation.mp4";
      video.load(); // Reload the video with new source
      
      video.play().catch(console.error);
    }

    // Set a timeout to hide the loading animation after video duration
    // You can adjust this timing based on your video length
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000); // Adjust this time based on your video duration

    return () => {
      clearTimeout(timer);
    };
  }, [isMobile]); // Re-run when mobile state changes

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: [1, 0.98, 0.9],
            y: -60,
            filter: "blur(10px)",
            transition: {
              duration: 0.8,
              ease: [0.4, 0, 0.2, 1],
              scale: {
                times: [0, 0.3, 1],
                ease: "easeInOut"
              }
            }
          }}
          className="fixed top-0 left-0 w-full h-full z-50 bg-[#202636] flex items-center justify-center overflow-hidden"
        >
          <video
            ref={videoRef}
            className={`w-full h-full ${isMobile ? 'object-contain' : 'object-contain md:object-cover'}`}
            autoPlay
            muted
            playsInline
            onEnded={() => setIsLoading(false)}
            style={{
              minHeight: '100vh',
              minWidth: '100vw',
              ...(isMobile && {
                objectFit: 'contain',
                objectPosition: 'center'
              })
            }}
          >
            Your browser does not support the video tag.
          </video>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingAnimation;
