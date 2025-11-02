"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";

interface MarqueeProps {
  children: React.ReactNode;
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  vertical?: boolean;
}

export const Marquee = ({
  children,
  className,
  reverse,
  pauseOnHover,
  vertical,
}: MarqueeProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    if (!scrollerRef.current || !containerRef.current) return;

    const scrollerContent = Array.from(scrollerRef.current.children);

    // For a seamless loop, duplicate the content multiple times
    if (scrollerContent.length > 0) {
      // Add multiple copies to ensure smooth looping
      for (let i = 0; i < 4; i++) {
        scrollerContent.forEach(item => {
          scrollerRef.current?.appendChild(item.cloneNode(true));
        });
      }
      setStart(true);
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 flex w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]",
        vertical && "flex-col [mask-image:linear-gradient(to_bottom,transparent,white_10%,white_90%,transparent)]",
        className
      )}
    >
      <div
        ref={scrollerRef}
        className={cn(
          "flex min-w-full flex-nowrap gap-4 py-4",
          vertical && "flex-col",
          start && "animate-scroll",
          start && reverse && "animate-scroll-reverse",
          start && pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {children}
      </div>
    </div>
  );
};
