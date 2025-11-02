import Image from "next/image";
import React from "react";

interface Props {
  src: string;
  title: string;
  description: string;
}

const ProjectCard = ({ src, title, description }: Props) => {
  return (
      <div className=" shadow-xl  hover:border-pink-500/40 hover:shadow-pink-500/40 relative overflow-hidden rounded-lg border border-[#2A0E61] hover:scale-105 transition-transform">
      <Image
        src={src}
        alt={title}
        width={1000}
        height={1000}
        className=" object-contain "
      />
      <div className="relative p-4">
        <h1 className="text-2xl font-semibold text-white font-helvetica-neue">{title}</h1>
        <p className="mt-2 text-gray-300">{description}</p>
      </div>
    </div>  
  );
};

export default ProjectCard;

