import React, { useRef, useState, useEffect } from 'react';

interface MagneticProps {
  children: React.ReactElement;
  range?: number;
  strength?: number;
}

export const Magnetic: React.FC<MagneticProps> = ({ 
  children, 
  range = 70, 
  strength = 0.35 
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;
      
      const { clientX, clientY } = e;
      const { left, top, width, height } = ref.current.getBoundingClientRect();
      
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      
      const distanceX = clientX - centerX;
      const distanceY = clientY - centerY;
      const distance = Math.hypot(distanceX, distanceY);
      
      if (distance < range) {
        // Smooth magnetic pull calculations with non-linear spring attraction
        const pullFactor = (1 - distance / range) * strength;
        setPosition({ 
          x: distanceX * pullFactor, 
          y: distanceY * pullFactor 
        });
      } else {
        setPosition({ x: 0, y: 0 });
      }
    };

    const handleMouseLeave = () => {
      setPosition({ x: 0, y: 0 });
    };

    window.addEventListener('mousemove', handleMouseMove);
    const element = ref.current;
    if (element) {
      element.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (element) {
        element.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [range, strength]);

  // Clone children to inject style without breaking standard layouts
  return (
    <div
      ref={ref}
      className="inline-block"
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        transition: position.x === 0 ? 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)' : 'none'
      }}
    >
      {children}
    </div>
  );
};

export default Magnetic;
