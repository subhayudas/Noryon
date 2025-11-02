import { useEffect, useRef } from "react";

interface UseAutoResizeTextareaOptions {
  minHeight?: number;
  maxHeight?: number;
}

export function useAutoResizeTextarea({
  minHeight = 40,
  maxHeight = 200,
}: UseAutoResizeTextareaOptions = {}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = (reset = false) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    if (reset) {
      textarea.style.height = `${minHeight}px`;
      return;
    }

    // Reset height to get accurate scrollHeight
    textarea.style.height = `${minHeight}px`;

    // Calculate new height
    const scrollHeight = textarea.scrollHeight;
    const newHeight = Math.min(Math.max(scrollHeight, minHeight), maxHeight);

    textarea.style.height = `${newHeight}px`;
  };

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    // Initial height adjustment
    adjustHeight();

    // Add resize observer if needed
    const observer = new ResizeObserver(() => {
      adjustHeight();
    });

    observer.observe(textarea);

    return () => {
      observer.disconnect();
    };
  }, []);

  return {
    textareaRef,
    adjustHeight,
  };
}

