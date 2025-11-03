"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SparklesIcon } from "@heroicons/react/24/solid";
import AnimatedHeading from "../ui/animated-heading";
import { slideInFromBottom } from "@/utils/motion";
import { useLanguage } from "@/contexts/LanguageContext";
import RadialOrbitalTimeline from "./RadialOrbitalTimeline";
import { Trophy, Award, Star, Target, Rocket, Zap } from "lucide-react";

const AchievementTimeline = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });
  const { t } = useLanguage();

  const timelineData = [
    {
      id: 1,
      title: "First Milestone",
      date: "2024 Q1",
      content: "Achieved our first major client success with 200% growth.",
      category: "Business",
      icon: Trophy,
      relatedIds: [2, 3],
      status: "completed" as const,
      energy: 95,
    },
    {
      id: 2,
      title: "Expansion",
      date: "2024 Q2",
      content: "Expanded our team and opened new service lines.",
      category: "Growth",
      icon: Rocket,
      relatedIds: [1, 4],
      status: "completed" as const,
      energy: 88,
    },
    {
      id: 3,
      title: "Innovation",
      date: "2024 Q3",
      content: "Launched cutting-edge AI solutions platform.",
      category: "Technology",
      icon: Zap,
      relatedIds: [1, 5],
      status: "completed" as const,
      energy: 92,
    },
    {
      id: 4,
      title: "Recognition",
      date: "2024 Q4",
      content: "Received industry awards and recognition.",
      category: "Awards",
      icon: Award,
      relatedIds: [2, 6],
      status: "in-progress" as const,
      energy: 75,
    },
    {
      id: 5,
      title: "Partnership",
      date: "2025 Q1",
      content: "Strategic partnerships with leading tech companies.",
      category: "Business",
      icon: Target,
      relatedIds: [3, 6],
      status: "in-progress" as const,
      energy: 70,
    },
    {
      id: 6,
      title: "Future Goals",
      date: "2025 Q2",
      content: "Expanding global reach and market presence.",
      category: "Growth",
      icon: Star,
      relatedIds: [4, 5],
      status: "pending" as const,
      energy: 60,
    },
  ];

  return (
    <div className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden" ref={containerRef}>
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="Welcome-box py-[8px] px-[7px] border border-[#00c8cf8b] opacity-[0.9] text-center mx-auto inline-flex items-center"
          >
            <SparklesIcon className="text-[#00c8cf] mr-[10px] h-5 w-5" />
            <h1 className="Welcome-text text-[13px]">{t("statistics.badge")}</h1>
          </motion.div>
          
          <AnimatedHeading as="h2" className="mt-4 text-4xl md:text-5xl font-bold">
            Our Journey
          </AnimatedHeading>
          
          <motion.p 
            variants={slideInFromBottom(0.3)}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto"
          >
            Explore our milestones and achievements through time
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <RadialOrbitalTimeline timelineData={timelineData} />
        </motion.div>
      </div>
    </div>
  );
};

export default AchievementTimeline;

