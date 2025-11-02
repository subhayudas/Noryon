import { HoverEffect } from "@/components/sub/card-hover-effect";
import { PiHeadsetDuotone, PiFlask, PiHandshake   } from "react-icons/pi";

export function CardHoverEffectDemo() {
  return (
    <div className="max-w-5xl mx-auto">
      <HoverEffect items={projects} />
    </div>
  );
}
export const projects = [
  {
    icon: <div className="bg-blue-100 p-4 rounded-full"><PiHandshake  className="w-8 h-8 text-orange-600" /></div>,
    title: "Commitment To Quality",
    description: "We are committed to quality and concrete actions. That means we always deliver solutions in a professional and practical way.",
  },
  {
    icon: <div className="bg-blue-100 p-4 rounded-full"><PiFlask  className="w-8 h-8 text-orange-600" /></div>,
    title: "CREATIVE SOLUTIONS",
    description: "Our goal is to inspire you with new insights and creative solutions. where your business stands out and makes a lasting impact",
  },
  {
    icon: <div className="bg-blue-100 p-4 rounded-full"><PiHeadsetDuotone className="w-8 h-8 text-orange-600" /></div>,
    title: "Quick Support",
    description: "we are committed to your success 24/7. Our dedicated support team is always ready to assist you, ensuring seamless operations and peace of mind.",
  },

  
];