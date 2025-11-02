'use client'

import { Suspense, useState, useEffect } from 'react'
import Spline from '@splinetool/react-spline'

interface SplineSceneProps {
  scene: string
  className?: string
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  
  // Add a timeout to detect potential loading issues
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isLoading) {
        console.warn('Spline scene loading timeout - fallback to placeholder')
        setHasError(true)
      }
    }, 8000) // 8 second timeout
    
    return () => clearTimeout(timeout)
  }, [isLoading])

  const handleLoad = () => {
    setIsLoading(false)
  }

  const handleError = (err: any) => {
    console.error('Spline loading error:', err)
    setHasError(true)
    setIsLoading(false)
  }

  if (hasError) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-[#202636]/20 rounded-lg">
        <div className="text-center p-6">
          <div className="mb-3 text-violet-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-base font-medium font-helvetica-neue">3D Experience</h3>
        </div>
      </div>
    )
  }

  return (
    <Suspense 
      fallback={
        <div className="w-full h-full flex items-center justify-center">
          <div className="animate-pulse flex space-x-2">
            <div className="h-3 w-3 bg-violet-400 rounded-full"></div>
            <div className="h-3 w-3 bg-violet-400 rounded-full"></div>
            <div className="h-3 w-3 bg-violet-400 rounded-full"></div>
          </div>
        </div>
      }
    >
      <div className={className} style={{ position: 'relative' }}>
        <Spline
          scene={scene}
          className={className}
          onLoad={handleLoad}
          onError={handleError}
        />
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#202636]/20 backdrop-blur-sm">
            <div className="animate-pulse flex space-x-2">
              <div className="h-3 w-3 bg-violet-400 rounded-full"></div>
              <div className="h-3 w-3 bg-violet-400 rounded-full"></div>
              <div className="h-3 w-3 bg-violet-400 rounded-full"></div>
            </div>
          </div>
        )}
      </div>
    </Suspense>
  )
}