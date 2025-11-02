import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface SectionProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function Section({ className, ...props }: SectionProps) {
  return (
    <section
      className={cn(
        "relative w-full py-12 md:py-16 lg:py-20",
        className
      )}
      {...props}
    />
  );
}
