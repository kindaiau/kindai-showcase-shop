import { useEffect, useState, useCallback } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  delay: number;
  duration: number;
}

interface Position {
  x: number;
  y: number;
}

const KINDAI_COLORS = [
  "hsl(var(--kindai-pink))",
  "hsl(var(--kindai-orange))",
  "hsl(var(--kindai-green))",
  "hsl(var(--kindai-blue))",
  "hsl(var(--kindai-purple))",
];

const AnimatedParticles = ({ count = 30 }: { count?: number }) => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [interactionPos, setInteractionPos] = useState<Position>({ x: 0, y: 0 });
  const [isInteracting, setIsInteracting] = useState(false);
  const isMobile = useIsMobile();

  // Reduce particle count on mobile for performance
  const actualCount = isMobile ? Math.min(count, 15) : count;

  useEffect(() => {
    const newParticles: Particle[] = [];
    for (let i = 0; i < actualCount; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        color: KINDAI_COLORS[Math.floor(Math.random() * KINDAI_COLORS.length)],
        delay: Math.random() * 5,
        duration: Math.random() * 10 + 10,
      });
    }
    setParticles(newParticles);
  }, [actualCount]);

  // Mouse interaction for desktop
  const handleMouseMove = useCallback((e: MouseEvent) => {
    setInteractionPos({ x: e.clientX, y: e.clientY });
    setIsInteracting(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsInteracting(false);
  }, []);

  // Device orientation for mobile (tilt effect)
  const handleDeviceOrientation = useCallback((e: DeviceOrientationEvent) => {
    if (e.gamma === null || e.beta === null) return;
    
    // Map device tilt to screen position (-90 to 90 degrees -> 0 to window size)
    const x = ((e.gamma + 45) / 90) * window.innerWidth;
    const y = ((e.beta + 45) / 90) * window.innerHeight;
    
    setInteractionPos({ x, y });
    setIsInteracting(true);
  }, []);

  useEffect(() => {
    if (isMobile) {
      // Request permission for iOS 13+
      if (typeof (DeviceOrientationEvent as any).requestPermission === "function") {
        // We'll enable on first touch instead
        const enableOrientation = async () => {
          try {
            const permission = await (DeviceOrientationEvent as any).requestPermission();
            if (permission === "granted") {
              window.addEventListener("deviceorientation", handleDeviceOrientation);
            }
          } catch {
            // Permission denied or not available
          }
        };
        
        window.addEventListener("touchstart", enableOrientation, { once: true });
        return () => window.removeEventListener("touchstart", enableOrientation);
      } else {
        // Android and other devices
        window.addEventListener("deviceorientation", handleDeviceOrientation);
        return () => window.removeEventListener("deviceorientation", handleDeviceOrientation);
      }
    } else {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseleave", handleMouseLeave);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, [isMobile, handleMouseMove, handleMouseLeave, handleDeviceOrientation]);

  const getParticleOffset = (particleX: number, particleY: number, size: number) => {
    if (!isInteracting) return { x: 0, y: 0 };

    const particlePxX = (particleX / 100) * window.innerWidth;
    const particlePxY = (particleY / 100) * window.innerHeight;

    const deltaX = interactionPos.x - particlePxX;
    const deltaY = interactionPos.y - particlePxY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    // Larger interaction radius on mobile, but gentler effect
    const maxDistance = isMobile ? 300 : 200;
    const maxOffset = isMobile ? 15 + size * 2 : 30 + size * 5;

    if (distance < maxDistance) {
      const force = (1 - distance / maxDistance) * maxOffset;
      const angle = Math.atan2(deltaY, deltaX);
      return {
        x: Math.cos(angle) * force,
        y: Math.sin(angle) * force,
      };
    }

    return { x: 0, y: 0 };
  };

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((particle) => {
        const offset = getParticleOffset(particle.x, particle.y, particle.size);
        return (
          <div
            key={particle.id}
            className="absolute rounded-full animate-particle opacity-40 transition-transform duration-500 ease-out"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: particle.color,
              boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`,
              transform: `translate(${offset.x}px, ${offset.y}px)`,
            }}
          />
        );
      })}
    </div>
  );
};

export default AnimatedParticles;
