import { RefObject, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotionPreference } from './useReducedMotionPreference';

gsap.registerPlugin(ScrollTrigger);

const revealVariants: Record<string, gsap.TweenVars> = {
  'fade-up': { opacity: 0, y: 56 },
  'fade-left': { opacity: 0, x: -56 },
  'fade-right': { opacity: 0, x: 56 },
  'scale-in': { opacity: 0, scale: 0.88 },
  blur: { opacity: 0, y: 28, filter: 'blur(18px)' },
  mask: { clipPath: 'inset(0 0 100% 0)', opacity: 1 },
  rotate: { opacity: 0, y: 30, rotate: -5 },
};

const parallaxSpeeds: Record<string, number> = {
  slow: 10,
  medium: 16,
  fast: 22,
};

export const useScrollReveal = (ref: RefObject<HTMLElement | null>) => {
  const reducedMotion = useReducedMotionPreference();

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    if (reducedMotion) {
      gsap.set(element.querySelectorAll('[data-reveal], [data-parallax], [data-zoom]'), {
        clearProps: 'all',
      });
      return;
    }

    const context = gsap.context(() => {
      const revealNodes = gsap.utils.toArray<HTMLElement>('[data-reveal]', element);
      revealNodes.forEach((node, index) => {
        const variantName = node.dataset.reveal ?? 'fade-up';
        const fromVars = revealVariants[variantName] ?? revealVariants['fade-up'];
        gsap.fromTo(
          node,
          fromVars,
          {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            rotate: 0,
            filter: 'blur(0px)',
            clipPath: 'inset(0 0 0 0)',
            duration: 1,
            delay: index * 0.05,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: node,
              start: 'top 86%',
              once: true,
            },
          },
        );
      });

      const parallaxNodes = gsap.utils.toArray<HTMLElement>('[data-parallax]', element);
      parallaxNodes.forEach((node) => {
        const speedKey = node.dataset.parallax ?? 'slow';
        gsap.fromTo(
          node,
          { yPercent: -parallaxSpeeds[speedKey] / 2 },
          {
            yPercent: parallaxSpeeds[speedKey],
            ease: 'none',
            scrollTrigger: {
              trigger: node,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          },
        );
      });

      const zoomNodes = gsap.utils.toArray<HTMLElement>('[data-zoom]', element);
      zoomNodes.forEach((node) => {
        gsap.fromTo(
          node,
          { scale: 1.12 },
          {
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: node,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          },
        );
      });
    }, element);

    return () => context.revert();
  }, [reducedMotion, ref]);
};
