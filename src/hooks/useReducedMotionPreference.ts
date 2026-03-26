import { useEffect, useState } from 'react';

const getReducedMotionOverride = () => {
  if (typeof window === 'undefined') {
    return null;
  }

  const motionParam = new URLSearchParams(window.location.search).get('motion');

  if (motionParam === 'on') {
    return false;
  }

  if (motionParam === 'off') {
    return true;
  }

  if (import.meta.env.DEV) {
    return false;
  }

  return null;
};

const getReducedMotionValue = () => {
  const override = getReducedMotionOverride();

  if (override !== null) {
    return override;
  }

  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return false;
  }

  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

export const useReducedMotionPreference = () => {
  const [reducedMotion, setReducedMotion] = useState(getReducedMotionValue);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      setReducedMotion(false);
      return;
    }

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(getReducedMotionValue());

    update();

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', update);

      return () => mediaQuery.removeEventListener('change', update);
    }

    if (typeof mediaQuery.addListener === 'function') {
      mediaQuery.addListener(update);

      return () => mediaQuery.removeListener(update);
    }

    return;
  }, []);

  return reducedMotion;
};
