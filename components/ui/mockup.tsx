import { cn } from "@/lib/utils";
import { HTMLAttributes, ReactNode } from "react";

interface MockupProps extends HTMLAttributes<HTMLDivElement> {
  type?: "responsive" | "browser" | "device";
  className?: string;
  children: ReactNode;
}

export function Mockup({
  type = "responsive",
  className,
  children,
  ...props
}: MockupProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border bg-background shadow-md",
        className
      )}
      {...props}
    >
      {type === "browser" && (
        <div className="flex items-center gap-1 border-b bg-muted/40 px-4 py-3">
          <div className="h-2 w-2 rounded-full bg-muted" />
          <div className="h-2 w-2 rounded-full bg-muted" />
          <div className="h-2 w-2 rounded-full bg-muted" />
        </div>
      )}
      {type === "device" && (
        <div className="flex items-center justify-center border-b bg-muted/40 py-3">
          <div className="h-2 w-16 rounded-full bg-muted" />
        </div>
      )}
      <div className="p-4">{children}</div>
    </div>
  );
}

interface MockupFrameProps extends HTMLAttributes<HTMLDivElement> {
  size?: "small" | "medium" | "large";
  className?: string;
  children: ReactNode;
}

export function MockupFrame({
  size = "medium",
  className,
  children,
  ...props
}: MockupFrameProps) {
  return (
    <div
      className={cn(
        "relative mx-auto w-full max-w-[1248px]",
        size === "small" && "max-w-[800px]",
        size === "large" && "max-w-[1600px]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
