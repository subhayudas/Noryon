"use client";

import React, { useState, useEffect } from "react";
import { AnimatedSpan, Terminal, TypingAnimation } from "@/components/magicui/terminal";
import { SparklesIcon } from "@heroicons/react/24/solid";
import { useLanguage } from "@/contexts/LanguageContext";

const TerminalDemo = () => {
  const { t } = useLanguage();
  
  // Array of messages to display in the terminal
  const messages = [
    t("terminal.message1"),
    t("terminal.message2"),
    t("terminal.message3"),
    t("terminal.message4"),
    t("terminal.message5"),
    t("terminal.message6"),
    t("terminal.message7"),
    t("terminal.message8"),
    t("terminal.message9"),
    t("terminal.message10"),
    t("terminal.message11"),
    t("terminal.message12"),
    t("terminal.message13"),
    t("terminal.message14"),
    t("terminal.message15")
  ];

  // State to track the current message being displayed
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  // State to track visible completed messages
  const [visibleMessages, setVisibleMessages] = useState<number[]>([]);
  // State to track if we're currently typing a message
  const [isTyping, setIsTyping] = useState(true);
  // Fixed number of messages to show to maintain consistent terminal size
  const maxVisibleMessages = 4; // Keep this number fixed to maintain consistent height

  // Effect to handle the typing animation and message cycling
  useEffect(() => {
    if (isTyping) {
      // This simulates the time it takes to type the message
      // The typing animation is handled by the TypingAnimation component
      const typingDuration = messages[currentMessageIndex].length * 80 + 1000; // Estimate typing time based on message length
      
      const typingTimer = setTimeout(() => {
        // Mark typing as complete
        setIsTyping(false);
      }, typingDuration);
      
      return () => clearTimeout(typingTimer);
    } else {
      // After typing is complete, wait before moving to the next message
      const nextMessageTimer = setTimeout(() => {
        // Add current message to visible messages
        setVisibleMessages(prev => {
          // If we've reached the maximum, remove the oldest message
          const newMessages = prev.length >= maxVisibleMessages 
            ? [...prev.slice(1), currentMessageIndex] 
            : [...prev, currentMessageIndex];
          
          return newMessages;
        });
        
        // Move to the next message, loop back to the beginning if needed
        setCurrentMessageIndex((currentMessageIndex + 1) % messages.length);
        // Reset typing state for the next message
        setIsTyping(true);
      }, 2000); // Wait 2 seconds before starting the next message
      
      return () => clearTimeout(nextMessageTimer);
    }
  }, [isTyping, currentMessageIndex, messages]);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-16 md:py-20">
      <div className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl pb-3 sm:pb-5 text-center bg-clip-text text-transparent bg-gradient-to-r from-gray-400 to-gray-300 bg-opacity-50 mb-5 sm:mb-10 font-helvetica-neue">
        <div className="Welcome-box py-[6px] px-[5px] sm:py-[8px] sm:px-[7px] border border-[#7042f88b] opacity-[0.9] text-center mx-auto inline-flex items-center">
          <SparklesIcon className="text-[#b49bff] mr-[6px] sm:mr-[10px] h-4 w-4 sm:h-5 sm:w-5" />
          <h1 className="Welcome-text text-[10px] xs:text-[11px] sm:text-xs">
            {t("terminal.badge")}
          </h1>
        </div>
       
      </div>
      <p className="mt-2 sm:mt-4 text-base sm:text-lg font-normal text-neutral-300 max-w-lg text-center mx-auto mb-6 sm:mb-10">
        {t("terminal.description")}
      </p>
      
      <div className="flex justify-center">
        {/* Responsive terminal with appropriate padding and sizing */}
        <Terminal className="shadow-lg shadow-gray-500/20 border-gray-500/30 w-full max-w-4xl">
          {/* Terminal wrapper with fixed height that adjusts on smaller screens */}
          <div className="h-[200px] sm:h-[240px] md:h-[280px] flex flex-col">
            <AnimatedSpan delay={500} className="text-green-400 text-xs sm:text-sm md:text-base">
              {t("terminal.welcome")}
            </AnimatedSpan>
            
            {/* Fixed size content area */}
            <div className="flex-grow flex flex-col text-xs sm:text-sm md:text-base">
              {/* Display previously completed messages */}
              {visibleMessages.map((messageIndex, index) => (
                <div key={`complete-${messageIndex}-${index}`} className="flex">
                  <span className="text-blue-400">$ </span>
                  <span className="text-white break-words">{messages[messageIndex]}</span>
                </div>
              ))}
              
              {/* Current message being typed */}
              {isTyping && (
                <div className="flex">
                  <span className="text-blue-400">$ </span>
                  <TypingAnimation 
                    delay={500} 
                    duration={80} // Slower typing speed (higher number = slower)
                    className="text-white break-words"
                  >
                    {messages[currentMessageIndex]}
                  </TypingAnimation>
                </div>
              )}
              
              {/* Add empty placeholder divs to maintain height when fewer messages are shown */}
              {Array.from({ length: Math.max(0, maxVisibleMessages - visibleMessages.length - (isTyping ? 1 : 0)) }).map((_, i) => (
                <div key={`placeholder-${i}`} className="h-[18px] sm:h-[20px] md:h-[24px]"></div>
              ))}
            </div>
            
            <AnimatedSpan delay={0} className="text-yellow-400 mt-auto text-xs sm:text-sm md:text-base">
              {t("terminal.ready")}
            </AnimatedSpan>
          </div>
        </Terminal>
      </div>
    </div>
  );
};

export default TerminalDemo;