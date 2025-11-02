"use client";

import React from 'react';

const BusinessPersonAvatar = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`relative ${className}`}>
      {/* Professional business person avatar */}
      <svg 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Face */}
        <circle cx="50" cy="36" r="20" fill="#FFD8B9" />
        
        {/* Hair */}
        <path d="M30 28C30 28 32 16 50 16C68 16 70 28 70 28V36C70 36 68 30 50 30C32 30 30 36 30 36V28Z" fill="#4A3C31" />
        
        {/* Suit */}
        <path d="M25 100V60C25 54.4772 29.4772 50 35 50H65C70.5228 50 75 54.4772 75 60V100H25Z" fill="#2A3F65" />
        
        {/* Shirt */}
        <path d="M40 100V55H60V100" fill="#FFFFFF" />
        
        {/* Tie */}
        <path d="M47 55H53L55 65L50 75L45 65L47 55Z" fill="#D04E4E" />
        
        {/* Face features */}
        <ellipse cx="43" cy="34" rx="2" ry="3" fill="#4A3C31" />
        <ellipse cx="57" cy="34" rx="2" ry="3" fill="#4A3C31" />
        <path d="M45 42C45 42 47 44 50 44C53 44 55 42 55 42" stroke="#4A3C31" strokeWidth="1.5" strokeLinecap="round" />
        
        {/* Collar */}
        <path d="M40 55V50H60V55" stroke="#2A3F65" strokeWidth="2" />
        
        {/* Hands */}
        <circle cx="25" cy="70" r="5" fill="#FFD8B9" />
        <circle cx="75" cy="70" r="5" fill="#FFD8B9" />
      </svg>
    </div>
  );
};

export default BusinessPersonAvatar;
