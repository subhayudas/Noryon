import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";



export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    icon: React.ReactNode;
    title: string;
    description: string;
  }[];
  className?: string;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [touchedIndex, setTouchedIndex] = useState<number | null>(null);
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  // Memoized handlers to prevent recreating functions on each render
  const handleMouseEnter = useCallback((idx: number) => {
    if (!isMobile) setHoveredIndex(idx);
  }, [isMobile]);
  
  const handleMouseLeave = useCallback(() => {
    if (!isMobile) setHoveredIndex(null);
  }, [isMobile]);
  
  const handleClick = useCallback((idx: number) => {
    if (isMobile) setTouchedIndex(touchedIndex === idx ? null : idx);
  }, [isMobile, touchedIndex]);

  // Reset touched index when component unmounts or when switching to desktop
  useEffect(() => {
    return () => setTouchedIndex(null);
  }, [isMobile]);
  
  // Add passive event listeners for better touch performance
  useEffect(() => {
    if (typeof document !== 'undefined') {
      // Add passive touch events to improve mobile performance
      const opts = { passive: true };
      const noop = () => {};
      document.addEventListener('touchstart', noop, opts);
      document.addEventListener('touchmove', noop, opts);
      
      // Prevent unnecessary hover effects on mobile
      if (isMobile) {
        document.documentElement.classList.add('mobile-device');
      } else {
        document.documentElement.classList.remove('mobile-device');
      }
      
      
    }
  }, [isMobile]);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-10",
        className
      )}
    >
      {items.map((item, idx) => {
        // Only calculate isActive when needed to reduce unnecessary calculations
        const isActive = isMobile ? touchedIndex === idx : hoveredIndex === idx;
        
        return (
          <div
            key={item?.title}
            className={cn(
              "relative group block p-2 h-full w-full touch-manipulation",
              isMobile ? "mobile-card" : "desktop-card"
            )}
            onMouseEnter={isMobile ? undefined : () => handleMouseEnter(idx)}
            onMouseLeave={isMobile ? undefined : handleMouseLeave}
            onClick={() => handleClick(idx)}
            onTouchStart={() => isMobile && handleClick(idx)}
          >
            {/* Only render animation if not on mobile or if specifically touched on mobile */}
            <AnimatePresence mode="wait">
              {isActive && (
                <motion.span
                  className="absolute inset-0 h-full w-full bg-orange-600 dark:bg-orange-600 block rounded-3xl will-change-opacity"
                  layoutId={isMobile ? undefined : "hoverBackground"} // Disable layoutId on mobile for better performance
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 0.9, // Slightly reduced opacity for better performance
                    transition: { duration: 0.1, ease: "linear" }, // Simplified animation
                  }}
                  exit={{
                    opacity: 0,
                    transition: { duration: 0.1, ease: "linear" }, // Simplified exit animation
                  }}
                  style={{ willChange: "opacity", transform: "translateZ(0)" }} // Force hardware acceleration
                />
              )}
            </AnimatePresence>
            <Card>
              <div className="flex items-center">{item.icon}</div>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </Card>
          </div>
        );
      })}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-8 overflow-hidden bg-[#202636] border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20 transform-gpu",
        className
      )}
      style={{
        willChange: "transform",
        transform: "translateZ(0)",
        transition: "border-color 0.1s linear"
      }}
    >
      {children}
    </div>
  );
};

export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4 className={cn("text-zinc-100 font-bold tracking-wide mt-4 font-helvetica-neue", className)}>
      {children}
    </h4>
  );
};

export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "mt-4 text-zinc-400 tracking-wide leading-relaxed text-sm",
        className
      )}
    >
      {children}
    </p>
  );
};