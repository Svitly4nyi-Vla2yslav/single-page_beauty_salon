import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useReducedMotionPreference } from '../hooks/useReducedMotionPreference';

const CursorAura = styled.div.attrs({
  className:
    'pointer-events-none fixed left-0 top-0 z-[70] hidden h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(110,198,255,0.22),rgba(212,175,55,0.16),transparent_72%)] blur-2xl mix-blend-screen md:block',
})`
  transition:
    opacity 180ms ease,
    transform 280ms cubic-bezier(0.22, 1, 0.36, 1);
`;

const CursorDot = styled.div.attrs({
  className:
    'pointer-events-none fixed left-0 top-0 z-[71] hidden h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/90 bg-black/80 md:block',
})`
  transition: opacity 150ms ease;
`;

export const PremiumCursor = () => {
  const reducedMotion = useReducedMotionPreference();
  const dotRef = useRef<HTMLDivElement | null>(null);
  const auraRef = useRef<HTMLDivElement | null>(null);
  const visibleRef = useRef(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (reducedMotion || window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const show = () => {
      if (!visibleRef.current) {
        visibleRef.current = true;
        setVisible(true);
      }
    };

    const update = (event: MouseEvent) => {
      const x = event.clientX;
      const y = event.clientY;

      show();

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }

      if (auraRef.current) {
        auraRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }
    };

    const hide = () => {
      visibleRef.current = false;
      setVisible(false);
    };

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
      <CursorAura ref={auraRef} style={{ opacity: visible ? 1 : 0 }} />
      <CursorDot ref={dotRef} style={{ opacity: visible ? 1 : 0 }} />
    </>
  );
};
