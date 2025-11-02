"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Spotlight } from "../ui/spotlight";

const SpotlightBackground = () => {
  return (
    <div className="fixed inset-0 z-[-1] w-full h-auto overflow-hidden bg-[#202636]/[0.96] antialiased">
      <div
        className={cn(
          "pointer-events-none absolute inset-0 [background-size:40px_40px] select-none",
          "[background-image:linear-gradient(to_right,#171717_1px,transparent_1px),linear-gradient(to_bottom,#171717_1px,transparent_1px)]",
        )}
      />

      <Spotlight
        className="-top-40 left-0 md:-top-20 md:left-60"
        fill="white"
      />
      
      <Spotlight
        className="top-40 right-0 md:top-20 md:right-60"
        fill="white"
      />
    </div>
  );
};

export default SpotlightBackground;
