'use client';

import { useEffect, useState } from 'react';
import SpotlightBackground from './SpotlightBackground';

export default function ClientSpotlight() {
  // Initialize with null to avoid hydration mismatch
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if screen is mobile (max-width: 768px)
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(max-width: 768px)').matches);
    };
    
    // Set initial value
    checkMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkMobile);
    
    // Clean up
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Only render on client-side after hydration
  if (isMobile === null) return null;
  
  // Don't render SpotlightBackground on mobile devices
  if (isMobile) return null;
  
  return <SpotlightBackground />;
}