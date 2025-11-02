"use client";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SparklesIcon } from "@heroicons/react/24/solid";
import { CanvasRevealEffect } from "./ui/CanvasRevealEffect";
import { Svg } from "@react-three/drei";
import AnimatedHeading from "../ui/animated-heading";

const Approach = () => {
  return (
    <section id="Approach" className="max-w-6xl mx-auto mt-8 px-2 bg-[#202636] py-20">
     <div className="font-bold text-4xl pb-5 md:text-5xl text-center mt-20">
        <div className="Welcome-box py-[8px] px-[7px] sm:py-2 sm:px2 border border-[#7042f88b] opacity-[0.9] text-center mx-auto ">
          <SparklesIcon className="text-[#b49bff] mr-[10px] sm:mr-1 h-5 w-5" />
          <AnimatedHeading as="h1" className="Welcome-text text-[13px] text-xs">
            Hover To Unreveal
          </AnimatedHeading>
        </div>
        <AnimatedHeading as="h1" className="text-4xl md:text-5xl">
          Our Approach
        </AnimatedHeading>
        <p
        className="mt-4 text-lg font-normal
          text-neutral-300 max-w-lg
          text-center mx-auto"
      >
        With precision and passion, we bring your project to fruition, ensuring excellence every step of the way.
      </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12  ">
        <Card
          title="Planning & Strategy"
          icon={<AceternityIcon order="Phase 1" />}
          des="We'll collaborate to map out your website's goals, target audience,
          and key functionalities. We'll discuss things like site structure,
          navigation, and content requirements."
        >
          <CanvasRevealEffect
            animationSpeed={3}
            containerClassName="bg-gray-600 rounded-3xl overflow-hidden"
            colors={[
              [192, 192, 192],
              [230, 230, 230],
            ]}
            dotSize={2}
          />
        </Card>
        <Card
  title="Development & Progress Update"
  icon={<AceternityIcon order="Phase 2" />}
  des="Once we agree on the plan, I cue my lofi playlist and dive into coding. From initial sketches to polished code, I keep you updated every step of the way."
  isDefaultHovered={true} // Set isDefaultHovered prop to true for the second card
>
  <CanvasRevealEffect
    animationSpeed={3}
    containerClassName="bg-gray-600 rounded-3xl overflow-hidden"
    colors={[
      [192, 192, 192],
      [230, 230, 230],
    ]}
    dotSize={2}
  />
</Card>

        <Card
          title="Development & Launch"
          icon={<AceternityIcon order="Phase 3" />}
          des="This is where the magic happens! Based on the approved design,
          I'll translate everything into functional code, building your website
          from the ground up."
        >
          <CanvasRevealEffect
            animationSpeed={3}
            containerClassName="bg-gray-600 rounded-3xl overflow-hidden"
            colors={[
              [192, 192, 192],
              [230, 230, 230],
            ]}
            dotSize={2}
          />
        </Card>
      </div>
    </section>
  );
};

export default Approach;


const Card = ({
  title,
  icon,
  children,
  des,
  isDefaultHovered, // Add isDefaultHovered prop
}: {
  title: string;
  icon: React.ReactNode;
  children?: React.ReactNode;
  des: string;
  isDefaultHovered?: boolean; // Define isDefaultHovered prop
}) => {
  const [hovered, setHovered] = React.useState(isDefaultHovered || false); // Set initial hover state based on isDefaultHovered prop

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className=" border border-black/[0.2] group/canvas-card flex items-center justify-center dark:border-gray-500  max-w-sm w-full mx-auto p-4 relative lg:h-[35rem] rounded-3xl"
      style={{
        background: "rgb(4,7,29)",
        backgroundColor: "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
      }}
    >
      <AnimatePresence>
        {(hovered || isDefaultHovered) && ( // Conditionally render details based on hover state and isDefaultHovered prop
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-full w-full absolute inset-0"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-20 px-10">
        <div className="text-center group-hover/canvas-card:-translate-y-4 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] group-hover/canvas-card:opacity-0 transition duration-200 min-w-40 mx-auto flex items-center justify-center">
          {icon}
        </div>
        <AnimatedHeading as="h2" className="text-center text-3xl opacity-0 group-hover/canvas-card:opacity-100 relative z-10 mt-4 font-bold group-hover/canvas-card:-translate-y-2 transition duration-200">
          {title}
        </AnimatedHeading>
        <p className="text-sm opacity-0 group-hover/canvas-card:opacity-100 relative z-10 mt-4 group-hover/canvas-card:text-white text-center group-hover/canvas-card:-translate-y-2 transition duration-200" style={{ color: "#E4ECFF" }}>
          {des}
        </p>
      </div>
    </div>
  );
};

// add order prop for the Phase number change
const AceternityIcon = ({ order }: { order: string }) => {
  return (
    <button className="relative inline-flex overflow-hidden rounded-full p-[1px]">
      <span
        className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite]
         bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]"
      />
      <span
        className="inline-flex h-full w-full cursor-pointer items-center
        justify-center rounded-full bg-slate-950 text-purple backdrop-blur-3xl font-bold text-2xl py-[8px] px-[7px] sm:py-2 sm:px2 mx-auto"
        style={{ color: "#c0c0c0" }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-6 w-6 mr-2"
        >
          <path
            d="M9 18l6-6-6-6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {order}
      </span>
    </button>
  );
};


export const Icon = ({ className, ...rest }: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={className}
      {...rest}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    </svg>
  );
};

