import { useEffect, useState } from 'react';

/**
 * Читає ручне налаштування анімацій із query-параметра motion.
 *
 * @returns false для motion=on, true для motion=off або null, якщо перевизначення немає.
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
 * Визначає підсумкове значення reduced-motion з ручного параметра або системного media query.
 *
 * @returns true, якщо складні анімації потрібно вимкнути.
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
 * @sideEffects Підписується на зміни prefers-reduced-motion і прибирає слухач під час демонтування.
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
