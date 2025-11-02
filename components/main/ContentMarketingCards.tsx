'use client';
import { ReactLenis } from 'lenis/react';
import { useTransform, motion, useScroll, MotionValue } from 'framer-motion';
import { useRef, forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { contentMarketingData, ContentMarketingData } from './contentMarketingData';

interface CardProps {
  i: number;
  title: string;
  description: string;
  image: string;
  color: string;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}

export const Card = ({
  i,
  title,
  description,
  image,
  color,
  progress,
  range,
  targetScale,
}: CardProps) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start'],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={container}
      className='h-screen flex items-center justify-center sticky top-0 px-4 sm:px-6 lg:px-8'
    >
      <motion.div
        style={{
          background: '#202636',
          scale,
          top: `calc(-5vh + ${i * 25}px)`,
        }}
        className={cn(
          "flex flex-col relative -top-[25%] rounded-md origin-top border-2 border-white content-marketing-card",
          // Mobile responsive dimensions
          "w-[95%] h-[500px] p-4 sm:p-6 md:p-8 lg:p-10",
          // Height adjustments for different screens
          "sm:h-[450px] md:h-[400px] lg:h-[450px]",
          // Width adjustments for different screens
          "sm:w-[85%] md:w-[80%] lg:w-[70%]"
        )}
      >
        <h2 className={cn(
          "text-center font-semibold text-white font-helvetica-neue",
          // Responsive text sizing
          "text-lg sm:text-xl md:text-2xl lg:text-2xl",
          // Mobile spacing
          "mb-3 sm:mb-4 md:mb-5"
        )}>
          {title.split(' ').map((word, index, array) => (
            <span key={index}>
              {index === array.length - 1 ? (
                <span className="line-through">{word}</span>
              ) : (
                <>
                  {word}
                  {index < array.length - 1 && ' '}
                </>
              )}
            </span>
          ))}
        </h2>
        <div className={cn(
          "flex h-full",
          // Mobile: stack vertically, Desktop: side by side
          "flex-col gap-4 sm:flex-col md:flex-row lg:flex-row",
          // Responsive gaps
          "sm:gap-6 md:gap-8 lg:gap-10",
          // Mobile margin top
          "mt-2 sm:mt-3 md:mt-4 lg:mt-5"
        )}>
          <div className={cn(
            "relative",
            // Mobile: full width, Desktop: 40% width
            "w-full sm:w-full md:w-[40%] lg:w-[40%]",
            // Mobile: no top offset, Desktop: 10% top offset
            "sm:top-0 md:top-[10%] lg:top-[10%]"
          )}>
            <p className={cn(
              "text-white/90 leading-relaxed",
              // Responsive text sizing
              "text-xs sm:text-sm md:text-sm lg:text-sm"
            )}>
              {description}
            </p>
          </div>

          <div
            className={cn(
              "relative rounded-lg overflow-hidden border-2 border-white",
              // Mobile: full width, Desktop: 60% width
              "w-full sm:w-full md:w-[60%] lg:w-[60%]",
              // Mobile: fixed height, Desktop: full height
              "h-[200px] sm:h-[250px] md:h-full lg:h-full"
            )}
          >
            <motion.div
              className="w-full h-full"
              style={{ scale: imageScale }}
            >
              <img 
                src={image} 
                alt={title} 
                className='absolute inset-0 w-full h-full object-cover'
                onError={(e) => {
                  // Fallback to a default image if the main image fails to load
                  const target = e.target as HTMLImageElement;
                  target.src = '/logo.png';
                }}
              />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const ContentMarketingCards = forwardRef<HTMLElement>((props, ref) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  return (
    <ReactLenis root>
      <main className='bg-[#202636]' ref={container}>
        <section className='text-white w-full bg-[#202636]'>
          {contentMarketingData.map((item, i) => {
            const targetScale = 1 - (contentMarketingData.length - i) * 0.05;
            return (
              <Card
                key={`cm_${i}`}
                i={i}
                image={item.image}
                title={item.title}
                color={item.color}
                description={item.description}
                progress={scrollYProgress}
                range={[i * 0.25, 1]}
                targetScale={targetScale}
              />
            );
          })}
        </section>
      </main>
    </ReactLenis>
  );
});

ContentMarketingCards.displayName = 'ContentMarketingCards';

export default ContentMarketingCards;
