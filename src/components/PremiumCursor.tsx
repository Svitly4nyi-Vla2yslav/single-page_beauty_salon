import { useEffect, useRef, useState } from 'react';
import { useReducedMotionPreference } from '../hooks/useReducedMotionPreference';

export const PremiumCursor = () => {
  const reducedMotion = useReducedMotionPreference();
  const dotRef = useRef<HTMLDivElement | null>(null);
  const auraRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (reducedMotion || window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const update = (event: MouseEvent) => {
      const x = event.clientX;
      const y = event.clientY;
      setVisible(true);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }

      if (auraRef.current) {
        auraRef.current.animate(
          { transform: `translate3d(${x}px, ${y}px, 0)` },
          { duration: 280, fill: 'forwards', easing: 'cubic-bezier(0.22, 1, 0.36, 1)' },
        );
      }
    };

    const hide = () => setVisible(false);

    window.addEventListener('mousemove', update);
    window.addEventListener('mouseleave', hide);

    return () => {
      window.removeEventListener('mousemove', update);
      window.removeEventListener('mouseleave', hide);
    };
  }, [reducedMotion]);

  if (reducedMotion) {
    return null;
  }

  return (
    <>
      <div
        ref={auraRef}
        className="pointer-events-none fixed left-0 top-0 z-[70] hidden h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(110,198,255,0.22),rgba(212,175,55,0.16),transparent_72%)] blur-2xl mix-blend-screen md:block"
        style={{ opacity: visible ? 1 : 0 }}
      />
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[71] hidden h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/90 bg-black/80 md:block"
        style={{ opacity: visible ? 1 : 0 }}
      />
    </>
  );
};
