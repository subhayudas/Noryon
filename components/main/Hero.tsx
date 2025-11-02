"use client";
import React, { useEffect, useRef } from "react";
import HeroContent from "../sub/HeroContent";

const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => {
      // Force play on all devices
      video.play().catch((error) => {
        console.log('Autoplay prevented:', error);
        // Fallback: try to play after user interaction
        const playOnInteraction = () => {
          video.play().catch(() => {});
          document.removeEventListener('touchstart', playOnInteraction);
          document.removeEventListener('click', playOnInteraction);
        };
        document.addEventListener('touchstart', playOnInteraction, { once: true });
        document.addEventListener('click', playOnInteraction, { once: true });
      });
    };

    const handleLoadedData = () => {
      video.play().catch((error) => {
        console.log('Autoplay prevented on load:', error);
      });
    };

    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('loadeddata', handleLoadedData);

    // Ensure video plays when it becomes visible
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        }
      });
    });

    observer.observe(video);

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('loadeddata', handleLoadedData);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden" id="Hero">
      {/* Full-width background video */}
      <video
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        style={{
          filter: 'brightness(0.8) contrast(1.1)',
        }}
      >
        <source 
          src="/herobackgroundvideo.mp4" 
          type="video/mp4" 
        />
        Your browser does not support the video tag.
      </video>
      
      {/* Gradient overlay for better text readability and aesthetic appeal */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/30 via-black/20 to-black/40 z-10"></div>
      
      {/* Additional subtle overlay for depth */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-900/10 via-transparent to-pink-900/10 z-15"></div>
      
      {/* Content overlay */}
      <div className="relative z-20 h-full">
        <HeroContent />
      </div>
    </div>
  );
};

export default Hero;
