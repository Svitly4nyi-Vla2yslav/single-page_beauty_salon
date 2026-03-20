import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { legalKeys, navigationItems } from '../data/site';
import { LanguageSwitcher } from './LanguageSwitcher';

export const Footer = () => {
  const { t } = useTranslation();
  const [activeLegal, setActiveLegal] = useState<(typeof legalKeys)[number]>('imprint');

  return (
    <footer id="footer" className="section-shell px-4 pb-8 pt-12 md:px-8">
      <div className="mx-auto max-w-7xl rounded-[2.5rem] bg-ink px-6 py-10 text-white md:px-10 md:py-14">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <p className="font-display text-4xl">Lumina Atelier</p>
            <p className="mt-3 max-w-xl text-sm leading-7 text-white/68">{t('seo.description')}</p>
            <div className="mt-6">
              <LanguageSwitcher />
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/45">
              {t('footer.quickLinks')}
            </p>
            <div className="mt-5 grid gap-3">
              {navigationItems.slice(1).map((item) => (
                <a key={item.key} href={item.href} className="text-sm text-white/70 transition hover:text-white">
                  {t(`nav.${item.key}`)}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/45">
              {t('footer.legal')}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {legalKeys.map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setActiveLegal(key)}
                  className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                    activeLegal === key ? 'bg-white text-ink' : 'bg-white/10 text-white/70'
                  }`}
                >
                  {t(`footer.legalTexts.${key}.title`)}
                </button>
              ))}
            </div>
            <div className="mt-5 rounded-[1.5rem] border border-white/10 bg-white/5 p-5 text-sm leading-7 text-white/70">
              {t(`footer.legalTexts.${activeLegal}.body`)}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-white/50 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-4">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-white">
              Instagram
            </a>
            <a href="https://wa.me/49305558210" target="_blank" rel="noreferrer" className="hover:text-white">
              WhatsApp
            </a>
          </div>
          <p>{t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  );
};
