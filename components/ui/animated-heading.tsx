import React from 'react';

interface AnimatedHeadingProps {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  children: React.ReactNode;
  className?: string;
}

const AnimatedHeading: React.FC<AnimatedHeadingProps> = ({
  as = 'h2',
  children,
  className = '',
}) => {
  const HeadingTag = as;
  
  return (
    <HeadingTag className={`animated-gradient-text font-helvetica-neue ${className}`}>
      {children}
    </HeadingTag>
  );
};

export default AnimatedHeading;
