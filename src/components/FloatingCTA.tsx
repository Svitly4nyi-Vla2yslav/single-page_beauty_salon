import { useTranslation } from 'react-i18next';

export const FloatingCTA = () => {
  const { t } = useTranslation();

  return (
    <a
      href="#booking"
      className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-3 rounded-full bg-ink px-5 py-4 text-sm font-semibold text-white shadow-[0_20px_45px_rgba(17,17,17,0.3)] transition hover:-translate-y-1"
    >
      <span className="h-2.5 w-2.5 rounded-full bg-gold" />
      {t('common.bookNow')}
    </a>
  );
};
