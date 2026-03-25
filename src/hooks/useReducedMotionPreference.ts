import { useEffect, useState } from 'react';

const getReducedMotionOverride = () => {
  if (!import.meta.env.DEV || typeof window === 'undefined') {
    return null;
  }

  const motionParam = new URLSearchParams(window.location.search).get('motion');

  if (motionParam === 'off') {
    return true;
  }

  return false;
};

const getReducedMotionValue = () => {
  const override = getReducedMotionOverride();

  if (override !== null) {
    return override;
  }

  if (typeof window === 'undefined') {
    return false;
  }

  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

export const useReducedMotionPreference = () => {
  const [reducedMotion, setReducedMotion] = useState(getReducedMotionValue);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(getReducedMotionValue());

    update();
    mediaQuery.addEventListener('change', update);

    return () => mediaQuery.removeEventListener('change', update);
  }, []);

  return reducedMotion;
};
