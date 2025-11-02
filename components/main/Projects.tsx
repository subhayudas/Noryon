
"use client";
import React, { useState } from "react";
import ProjectCard from "../sub/ProjectCard";
import AnimatedHeading from "../ui/animated-heading";

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [displayedProjects, setDisplayedProjects] = useState(6); // Initial number of projects to display
  const [showLoadMore, setShowLoadMore] = useState(true);

  const projectsData = [
    {
      src: "https://blue-official-newt-770.mypinata.cloud/ipfs/QmZwF1cKsFNe1x8p86qAjpgwdogPT3RYp1dngCj7y6Xq99/slider5.png",
      title: "Gym Website Showcase",
      description:
        "Check out this sleek gym website example designed to inspire fitness enthusiasts. It features modern design elements and interactive features to engage users and promote a healthy lifestyle.",
      categories: ["Graphics Design", "SMM"],
    },
    {
      src: "https://blue-official-newt-770.mypinata.cloud/ipfs/QmZwF1cKsFNe1x8p86qAjpgwdogPT3RYp1dngCj7y6Xq99/slider2.png",
      title: "Real Estate Website Demo",
      description:
        "Explore this sophisticated real estate website example, showcasing stunning properties and intuitive search functionalities. It offers a seamless user experience for property buyers and sellers alike.",
      categories: ["Graphics Design"],
    },
    {
      src: "https://blue-official-newt-770.mypinata.cloud/ipfs/QmZwF1cKsFNe1x8p86qAjpgwdogPT3RYp1dngCj7y6Xq99/slider1.png",
      title: "Crypto Website Preview",
      description:
        "Dive into this dynamic crypto website example, highlighting the latest trends and insights in the cryptocurrency world. It provides valuable resources and tools for both novice and experienced traders.",
      categories: ["Graphics Design"],
    },
    {
      src: "https://blue-official-newt-770.mypinata.cloud/ipfs/QmZwF1cKsFNe1x8p86qAjpgwdogPT3RYp1dngCj7y6Xq99/slider6.png",
      title: "Car Detailing Website",
      description:
        "Experience this professional car detailing website example, featuring high-resolution images and informative content to showcase the quality of services offered. It's designed to attract car enthusiasts and detail-oriented customers.",
      categories: ["Web Development"],
    },
    {
      src: "https://blue-official-newt-770.mypinata.cloud/ipfs/QmZwF1cKsFNe1x8p86qAjpgwdogPT3RYp1dngCj7y6Xq99/slider7.png",
      title: "Consultancy Website",
      description:
        "Embark on a journey with this captivating travel website example, offering enticing destinations and travel tips. It's designed to inspire wanderlust and facilitate seamless trip planning for adventurers.",
      categories: ["Web Development"],
    },
    
{
  src: "https://blue-official-newt-770.mypinata.cloud/ipfs/QmZwF1cKsFNe1x8p86qAjpgwdogPT3RYp1dngCj7y6Xq99/slider9.png",
  title: "Restaurant Website",
  description:
  "Indulge in a culinary journey with this enticing restaurant website example, showcasing delectable cuisines and elegant ambiance. It's designed to tantalize taste buds and create unforgettable dining experiences.",
  categories: ["Web Development"],
  },
  {
  src: "https://blue-official-newt-770.mypinata.cloud/ipfs/QmZwF1cKsFNe1x8p86qAjpgwdogPT3RYp1dngCj7y6Xq99/slider3.png",
  title: "Adventure Travel Website ",
  description:
  "Embark on a thrilling escapade with this dynamic adventure travel website example, offering exhilarating experiences and breathtaking destinations. It's tailored for adventurers seeking adrenaline-fueled excitement.",
  categories: ["Web Development"],
  },
  {
  src: "https://blue-official-newt-770.mypinata.cloud/ipfs/QmZwF1cKsFNe1x8p86qAjpgwdogPT3RYp1dngCj7y6Xq99/slider4.png",
  title: "Dental Website",
  description:
  "Brighten your smile with this comprehensive dental website example, providing expert dental care and personalized treatment plans. It's dedicated to enhancing oral health and restoring confidence.",
  categories: ["Web Development"],
  },
  {
  src: "https://blue-official-newt-770.mypinata.cloud/ipfs/QmZwF1cKsFNe1x8p86qAjpgwdogPT3RYp1dngCj7y6Xq99/slider8.png",
  title: "Cleaning Company Website",
  description:
  "Experience cleanliness like never before with this professional cleaning company website example, offering top-notch services and meticulous attention to detail. It's your partner in maintaining pristine spaces.",
  categories: ["Web Development"],
  }
    
    
  // Add more projects with categories as needed
  ];

  const filteredProjects =
    selectedCategory === "ALL"
      ? projectsData
      : projectsData.filter((project) =>
          project.categories.includes(selectedCategory)
        );

  const loadMoreProjects = () => {
    const newDisplayedProjects = displayedProjects + 3;
    setDisplayedProjects(newDisplayedProjects);

    // Check if there are more projects to show
    setShowLoadMore(newDisplayedProjects < filteredProjects.length);
  };

  return (
    <div className="flex flex-col items-center justify-center py-20" id="projects">
      <AnimatedHeading as="h1" className="text-5xl font-semibold text-center py-20">
        Our Recent Works
      </AnimatedHeading>
      <div className="filter-buttons flex flex-wrap justify-center gap-2">
        {["ALL", "Web Development", "SMM", "Graphics Design", "Video Editing"].map((category, index) => (
          <button
            key={index}
            onClick={() => setSelectedCategory(category)}
            className={`filter-btn ${selectedCategory === category && "active"}`}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 px-10">
        {filteredProjects.slice(0, displayedProjects).map((project, index) => (
          <ProjectCard
            key={index}
            src={project.src}
            title={project.title}
            description={project.description}
          />
        ))}
      </div>
      {showLoadMore && (
        <div className="mt-4">
          <button
            className="bg-gray-800 text-white px-4 py-2 rounded"
            onClick={loadMoreProjects}
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default Projects;