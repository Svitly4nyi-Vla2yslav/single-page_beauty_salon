import { useEffect, useState } from 'react';
import {
  shouldReduceMotion,
  syncMotionPreferenceOverrideFromLocation,
} from '../utils/motionPreference';

const getReducedMotionValue = () => {
  return shouldReduceMotion(syncMotionPreferenceOverrideFromLocation());
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
