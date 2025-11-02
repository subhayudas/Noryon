"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { SparklesIcon } from "@heroicons/react/24/solid";
import AnimatedHeading from "../ui/animated-heading";
import { slideInFromBottom } from "@/utils/motion";

interface CounterProps {
  end: number;
  duration: number;
  suffix?: string;
  prefix?: string;
}

const Counter: React.FC<CounterProps> = ({ end, duration, suffix = "", prefix = "" }) => {
  const [count, setCount] = useState(0);
  const counterRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(counterRef, { once: true, amount: 0.5 });
  
  useEffect(() => {
    if (!isInView) return;
    
    let startTime: number;
    let animationFrame: number;
    
    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateCount);
      }
    };
    
    animationFrame = requestAnimationFrame(updateCount);
    
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration, isInView]);
  
  return (
    <div ref={counterRef} className="font-bold text-4xl sm:text-5xl md:text-6xl text-white">
      {prefix}{count}{suffix}
    </div>
  );
};

const Statistics = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });
  
  const stats = [
    {
      id: 1,
      value: 99,
      suffix: "%",
      label: "Client Satisfaction",
      description: "Our clients love the results we deliver",
      color: "from-blue-600 to-indigo-600",
    },
    {
      id: 2,
      value: 27,
      suffix: "+",
      label: "Projects Completed",
      description: "Successful projects across industries",
              color: "from-gray-500 to-gray-600",
    },
    {
      id: 3,
      value: 15,
      suffix: "x",
      label: "Average ROI",
      description: "Return on investment for our clients",
      color: "from-green-500 to-emerald-500",
    },
    {
      id: 4,
      value: 24,
      suffix: "/7",
      label: "Support Available",
      description: "We're always here when you need us",
      color: "from-purple-500 to-pink-500",
    },
  ];
  
  return (
    <div className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden" ref={containerRef}>
      {/* Background elements removed for performance */}
      
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="Welcome-box py-[8px] px-[7px] border border-[#00c8cf8b] opacity-[0.9] text-center mx-auto inline-flex items-center"
          >
            <SparklesIcon className="text-[#00c8cf] mr-[10px] h-5 w-5" />
            <h1 className="Welcome-text text-[13px]">Our Impact</h1>
          </motion.div>
          
          <AnimatedHeading as="h2" className="mt-4 text-4xl md:text-5xl font-bold">
            Driving Results That Matter
          </AnimatedHeading>
          
          <motion.p 
            variants={slideInFromBottom(0.3)}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto"
          >
            Numbers don't lie. See how our expertise translates into measurable success for our clients.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ 
                duration: 0.5, 
                delay: stat.id * 0.1,
                type: "spring",
                stiffness: 100,
                damping: 15
              }}
              whileHover={{ 
                scale: 1.05,
                transition: { type: "spring", stiffness: 400, damping: 10 }
              }}
              className="relative rounded-2xl p-6 sm:p-8 bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-gray-800 hover:border-gray-700 transition-all duration-300 flex flex-col items-center text-center"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-5 rounded-2xl`}></div>
              
              <Counter end={stat.value} duration={2000} suffix={stat.suffix} />
              
                              <h3 className="text-xl font-bold mt-4 mb-2 text-white font-helvetica-neue">{stat.label}</h3>
              <p className="text-gray-400">{stat.description}</p>
              
              <div className={`h-1 w-16 bg-gradient-to-r ${stat.color} rounded-full mt-6`}></div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Statistics;
