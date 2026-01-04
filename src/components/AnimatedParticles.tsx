import { useEffect, useState, useCallback } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  delay: number;
  duration: number;
}

interface MousePosition {
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
  const [mousePos, setMousePos] = useState<MousePosition>({ x: 0, y: 0 });
  const [isMouseInView, setIsMouseInView] = useState(false);

  useEffect(() => {
    const newParticles: Particle[] = [];
    for (let i = 0; i < count; i++) {
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
  }, [count]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
    setIsMouseInView(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsMouseInView(false);
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave]);

  const getParticleOffset = (particleX: number, particleY: number, size: number) => {
    if (!isMouseInView) return { x: 0, y: 0 };

    const particlePxX = (particleX / 100) * window.innerWidth;
    const particlePxY = (particleY / 100) * window.innerHeight;

    const deltaX = mousePos.x - particlePxX;
    const deltaY = mousePos.y - particlePxY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    const maxDistance = 200;
    const maxOffset = 30 + size * 5;

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
            className="absolute rounded-full animate-particle opacity-40 transition-transform duration-300 ease-out"
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
