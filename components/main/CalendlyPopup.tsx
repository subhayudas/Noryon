"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

declare global {
  interface Window {
    Calendly: {
      initPopupWidget: (config: { url: string }) => void;
      showPopupWidget: (url: string) => void;
      closePopupWidget: () => void;
    };
  }
}

const CalendlyPopup = () => {
  const [isCalendlyLoaded, setIsCalendlyLoaded] = useState(false);

  useEffect(() => {
    // Listen for open calendar events
    const handleOpenCalendar = () => {
      if (window.Calendly && isCalendlyLoaded) {
        window.Calendly.showPopupWidget("https://calendly.com/subhayudas49/30min?hide_gdpr_banner=1");
      } else {
        // If Calendly isn't loaded yet, wait for it
        const checkInterval = setInterval(() => {
          if (window.Calendly) {
            setIsCalendlyLoaded(true);
            window.Calendly.showPopupWidget("https://calendly.com/subhayudas49/30min?hide_gdpr_banner=1");
            clearInterval(checkInterval);
          }
        }, 100);
        
        // Clear interval after 10 seconds
        setTimeout(() => clearInterval(checkInterval), 10000);
      }
    };

    // Custom event listener for opening Calendly popup
    window.addEventListener("openCalendlyPopup", handleOpenCalendar);

    return () => {
      window.removeEventListener("openCalendlyPopup", handleOpenCalendar);
    };
  }, [isCalendlyLoaded]);

  return (
    <Script
      src="https://assets.calendly.com/assets/external/widget.js"
      strategy="lazyOnload"
      onLoad={() => {
        setIsCalendlyLoaded(true);
        // Don't initialize popup widget automatically - only show when explicitly triggered
        // The showPopupWidget method will handle initialization if needed
      }}
    />
  );
};

export default CalendlyPopup;
