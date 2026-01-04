import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

export const useParallax = (speed: number = 0.5) => {
  const [offset, setOffset] = useState(0);
  const isMobile = useIsMobile();

  // Reduce parallax intensity on mobile for smoother scrolling
  const actualSpeed = isMobile ? speed * 0.3 : speed;

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return offset * actualSpeed;
};

export const useElementParallax = (ref: React.RefObject<HTMLElement>, speed: number = 0.5) => {
  const [offset, setOffset] = useState(0);
  const isMobile = useIsMobile();

  // Reduce parallax intensity on mobile
  const actualSpeed = isMobile ? speed * 0.3 : speed;

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const elementTop = rect.top + window.scrollY;
      const scrollPosition = window.scrollY - elementTop;
      setOffset(scrollPosition * actualSpeed);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [ref, actualSpeed]);

  return offset;
};
