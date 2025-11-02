import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface GlowProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "top" | "bottom" | "left" | "right" | "center";
  className?: string;
}

export default function Glow({
  variant = "center",
  className,
  ...props
}: GlowProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 z-[-1] overflow-hidden",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "absolute aspect-square w-full rounded-full bg-primary/20 blur-[100px]",
          variant === "top" && "-top-1/2 left-1/2 -translate-x-1/2",
          variant === "bottom" && "top-full left-1/2 -translate-x-1/2 -translate-y-1/2",
          variant === "left" && "top-1/2 -left-1/2 -translate-y-1/2",
          variant === "right" && "top-1/2 left-full -translate-x-1/2 -translate-y-1/2",
          variant === "center" && "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        )}
      />
    </div>
  );
}
