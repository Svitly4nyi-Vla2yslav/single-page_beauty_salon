import { useEffect, useState } from 'react';

/**
 * Читає ручне налаштування анімацій із query-параметра motion без зміни URL.
 * @returns false для motion=on, true для motion=off; у development без параметра також false,
 * а у production без перевизначення — null, щоб дозволити перевірку системного media query.
 */
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

/**
 * Визначає підсумкове reduced-motion: спочатку ручне перевизначення, потім системний media query.
 * @returns true, якщо складні анімації треба вимкнути; у SSR або без matchMedia безпечно повертає false.
 */
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

/**
 * Стежить за системним налаштуванням зменшення руху та повертає його актуальний стан.
 *
 * @returns Ознаку того, що користувач віддає перевагу мінімальним анімаціям.
 * @sideEffects Підписується на зміни prefers-reduced-motion, підтримує сучасний і legacy API та прибирає слухач під час демонтування.
 */
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
