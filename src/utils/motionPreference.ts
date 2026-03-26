export type MotionPreferenceOverride = 'on' | 'off' | 'system';

const MOTION_QUERY_KEY = 'motion';
const MOTION_STORAGE_KEY = 'lumina-motion-preference';

const isMotionOverride = (value: string | null): value is MotionPreferenceOverride =>
  value === 'on' || value === 'off' || value === 'system';

export const getMotionPreferenceOverride = (): MotionPreferenceOverride => {
  if (typeof window === 'undefined') {
    return 'system';
  }

  const queryValue = new URLSearchParams(window.location.search).get(MOTION_QUERY_KEY);
  if (isMotionOverride(queryValue)) {
    return queryValue;
  }

  const storedValue = window.localStorage.getItem(MOTION_STORAGE_KEY);
  return isMotionOverride(storedValue) ? storedValue : 'system';
};

export const persistMotionPreferenceOverride = (override: MotionPreferenceOverride) => {
  if (typeof window === 'undefined') {
    return;
  }

  if (override === 'system') {
    window.localStorage.removeItem(MOTION_STORAGE_KEY);
    return;
  }

  window.localStorage.setItem(MOTION_STORAGE_KEY, override);
};

export const syncMotionPreferenceOverrideFromLocation = () => {
  const override = getMotionPreferenceOverride();
  const queryValue =
    typeof window !== 'undefined'
      ? new URLSearchParams(window.location.search).get(MOTION_QUERY_KEY)
      : null;

  if (!isMotionOverride(queryValue)) {
    return override;
  }

  persistMotionPreferenceOverride(override);
  return override;
};

export const shouldReduceMotion = (override: MotionPreferenceOverride) => {
  if (override === 'on') {
    return false;
  }

  if (override === 'off') {
    return true;
  }

  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return false;
  }

  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};
