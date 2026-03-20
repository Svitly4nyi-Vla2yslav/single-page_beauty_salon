import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

type ConsentState = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
};

const storageKey = 'lumina-cookie-consent';

export const CookieConsent = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [customizing, setCustomizing] = useState(false);
  const [consent, setConsent] = useState<ConsentState>({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKey);
    if (saved) {
      setConsent(JSON.parse(saved) as ConsentState);
      setIsOpen(false);
      return;
    }
    setIsOpen(true);
  }, []);

  const saveConsent = (nextState: ConsentState) => {
    setConsent(nextState);
    window.localStorage.setItem(storageKey, JSON.stringify(nextState));
    setIsOpen(false);
    setCustomizing(false);
  };

  if (!isOpen) {
    return (
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-5 left-5 z-40 rounded-full border border-black/10 bg-white/90 px-4 py-3 text-xs font-semibold text-black/70 shadow-lg backdrop-blur"
      >
        {t('cookies.manage')}
      </button>
    );
  }

  return (
    <div className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-4xl rounded-[2rem] border border-black/10 bg-white/92 p-6 shadow-2xl shadow-black/10 backdrop-blur-xl">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-black/45">
            {t('cookies.title')}
          </p>
          <h3 className="mt-3 font-display text-3xl text-ink">{t('cookies.title')}</h3>
          <p className="mt-3 text-sm leading-7 text-black/65">{t('cookies.description')}</p>

          {customizing ? (
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {(['necessary', 'analytics', 'marketing'] as const).map((key) => (
                <label
                  key={key}
                  className="rounded-3xl border border-black/8 bg-black/[0.02] p-4 text-sm text-black/70"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-semibold text-black">{t(`cookies.${key}`)}</span>
                    <input
                      type="checkbox"
                      checked={consent[key]}
                      disabled={key === 'necessary'}
                      onChange={(event) =>
                        setConsent((current) => ({
                          ...current,
                          [key]: event.target.checked,
                        }))
                      }
                    />
                  </div>
                  <p className="mt-3 text-xs leading-6 text-black/55">{t(`cookies.${key}Desc`)}</p>
                </label>
              ))}
            </div>
          ) : null}
        </div>

        <div className="flex flex-col gap-3 md:flex-row">
          <button
            type="button"
            onClick={() => saveConsent({ necessary: true, analytics: true, marketing: true })}
            className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white"
          >
            {t('cookies.acceptAll')}
          </button>
          <button
            type="button"
            onClick={() => saveConsent({ necessary: true, analytics: false, marketing: false })}
            className="rounded-full border border-black/12 px-5 py-3 text-sm font-semibold text-black/70"
          >
            {t('cookies.reject')}
          </button>
          {customizing ? (
            <button
              type="button"
              onClick={() => saveConsent(consent)}
              className="rounded-full border border-gold/40 bg-gold/10 px-5 py-3 text-sm font-semibold text-black"
            >
              {t('cookies.save')}
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setCustomizing(true)}
              className="rounded-full border border-black/12 px-5 py-3 text-sm font-semibold text-black/70"
            >
              {t('cookies.customize')}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
