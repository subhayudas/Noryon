'use client';
import { useEffect } from 'react';

import useFluidCursor from '@/hooks/use-FluidCursor';

const FluidCursor = () => {
  const { initFluidCursor } = useFluidCursor();

  useEffect(() => {
    initFluidCursor();
  }, [initFluidCursor]);

  return (
    <div className='fixed top-0 left-0 z-[1] pointer-events-none'>
      <canvas id='fluid' className='w-screen h-screen pointer-events-none' />
    </div>
  );
};
export default FluidCursor;
