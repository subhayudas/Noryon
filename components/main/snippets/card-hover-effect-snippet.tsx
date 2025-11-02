import { HoverEffect } from "@/components/sub/card-hover-effect";
import { PiChartLineUp, PiImage, PiVideoCamera, PiMagnifyingGlass, PiCode, PiLightbulb } from "react-icons/pi";

export function CardHoverEffectDemo() {
  return (
    <div className="max-w-5xl mx-auto px-2">
      <HoverEffect items={projects} />
    </div>
  );
}
export const projects = [
  {
    icon: <div className="bg-blue-100 p-4 rounded-full"><PiCode className="w-8 h-8 text-orange-600" /></div>,
    title: "Website Design",
    description: "Crafting visually stunning and highly functional websites tailored to your brand.",
    imageUrl: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  },
  {
    icon: <div className="bg-blue-100 p-4 rounded-full"><PiChartLineUp className="w-8 h-8 text-orange-600" /></div>,
    title: "Social Media Marketing",
    description: "Empower your brand's online presence with our comprehensive social media marketing strategies.",
    imageUrl: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  },
  {
    icon: <div className="bg-blue-100 p-4 rounded-full"><PiImage className="w-8 h-8 text-orange-600" /></div>,
    title: "Graphics Design",
    description: "Elevate your brand identity with captivating graphic designs.",
    imageUrl: "https://images.unsplash.com/photo-1626785774573-4b799315345d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  },
  {
    icon: <div className="bg-blue-100 p-4 rounded-full"><PiMagnifyingGlass className="w-8 h-8 text-orange-600" /></div>,
    title: "SEO",
    description: "Enhance your online visibility and drive organic traffic with our comprehensive SEO solutions.",
    imageUrl: "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  },
  {
    icon: <div className="bg-blue-100 p-4 rounded-full">< PiVideoCamera className="w-8 h-8 text-orange-600" /></div>,
    title: "Video Editing",
    description: "Transform your raw footage into captivating visual narratives with our expert video editing services.",
    imageUrl: "/videoediting.png",
  },
  {
    icon: <div className="bg-blue-100 p-4 rounded-full"><PiLightbulb className="w-8 h-8 text-orange-600" /></div>,
    title: "Content Writing",
    description: "Fuel your brand's growth with compelling content writing.",
    imageUrl: "https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  },
];