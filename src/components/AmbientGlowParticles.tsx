import React, { useEffect, useState, useRef } from 'react';

interface Particle {
  id: number;
  x: number; // percentage
  y: number; // percentage
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  maxOpacity: number;
}

interface AmbientGlowParticlesProps {
  color: string; // Theme glow highlight color (e.g. #D4AF37)
  isLight?: boolean;
}

export const AmbientGlowParticles: React.FC<AmbientGlowParticlesProps> = ({ color, isLight = false }) => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize and update particles
  useEffect(() => {
    // Generate 25 subtle floating particles
    const initialParticles: Particle[] = Array.from({ length: 28 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1.5,
      speedY: -(Math.random() * 0.12 + 0.04), // float upwards
      speedX: (Math.random() * 0.08 - 0.04), // slight drift left/right
      opacity: Math.random() * 0.2,
      maxOpacity: Math.random() * 0.35 + 0.05
    }));
    setParticles(initialParticles);

    let animationFrameId: number;
    const updateTick = () => {
      setParticles((prevParticles) =>
        prevParticles.map((p) => {
          let newY = p.y + p.speedY;
          let newX = p.x + p.speedX;

          // Wrap around edges
          if (newY < -10) {
            newY = 110;
            newX = Math.random() * 100;
          }
          if (newX < -10 || newX > 110) {
            newX = p.x < 0 ? 100 : 0;
          }

          return {
            ...p,
            x: newX,
            y: newY
          };
        })
      );
      animationFrameId = requestAnimationFrame(updateTick);
    };

    animationFrameId = requestAnimationFrame(updateTick);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // Track mouse movement for spotlight flare
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    };

    const handleMouseLeave = () => {
      setMousePos({ x: -1000, y: -1000 });
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  if (isLight) {
    // For light mode, make particles extremely subtle soft orbs or skip them to keep it clean
    return null;
  }

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 overflow-hidden pointer-events-none z-0"
    >
      {/* Real-time mouse-tracking interactive spotlight glow */}
      <div 
        className="absolute w-[450px] h-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 mix-blend-screen pointer-events-none filter blur-[90px] transition-opacity duration-500"
        style={{
          left: mousePos.x,
          top: mousePos.y,
          background: `radial-gradient(circle, ${color}12 0%, ${color}03 50%, transparent 100%)`
        }}
      />

      {/* Floating particles background rendering */}
      <svg className="w-full h-full opacity-70">
        {particles.map((p) => (
          <circle 
            key={p.id}
            cx={`${p.x}%`}
            cy={`${p.y}%`}
            r={p.size}
            fill={color}
            opacity={p.opacity}
            style={{
              filter: p.size > 2 ? `blur(0.5px)` : 'none',
              transition: 'opacity 0.4s ease-in-out'
            }}
          />
        ))}
      </svg>
    </div>
  );
};

export default AmbientGlowParticles;
