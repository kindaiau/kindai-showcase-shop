import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useIsMobile } from "@/hooks/use-mobile";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  animation?: "fade-up" | "fade-down" | "fade-left" | "fade-right" | "scale" | "blur";
  delay?: number;
  duration?: number;
  threshold?: number;
}

const ScrollReveal = ({
  children,
  className,
  animation = "fade-up",
  delay = 0,
  duration = 600,
  threshold = 0.1,
}: ScrollRevealProps) => {
  const { ref, isVisible } = useScrollAnimation({ threshold });
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();

  // Reduce translate distance on mobile for smoother animations
  const mobileOffset = isMobile ? "4" : "8";
  
  const animations = {
    "fade-up": {
      hidden: `opacity-0 translate-y-${mobileOffset}`,
      visible: "opacity-100 translate-y-0",
    },
    "fade-down": {
      hidden: `opacity-0 -translate-y-${mobileOffset}`,
      visible: "opacity-100 translate-y-0",
    },
    "fade-left": {
      hidden: `opacity-0 translate-x-${mobileOffset}`,
      visible: "opacity-100 translate-x-0",
    },
    "fade-right": {
      hidden: `opacity-0 -translate-x-${mobileOffset}`,
      visible: "opacity-100 translate-x-0",
    },
    scale: {
      hidden: "opacity-0 scale-95",
      visible: "opacity-100 scale-100",
    },
    blur: {
      hidden: "opacity-0 blur-sm",
      visible: "opacity-100 blur-0",
    },
  };

  const { hidden, visible } = animations[animation];

  // If user prefers reduced motion, show content immediately without animation
  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  // Slightly faster animations on mobile
  const actualDuration = isMobile ? Math.min(duration, 400) : duration;

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all ease-out",
        isVisible ? visible : hidden,
        className
      )}
      style={{
        transitionDuration: `${actualDuration}ms`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
