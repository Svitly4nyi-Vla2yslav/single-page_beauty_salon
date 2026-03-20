import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { navigationItems } from '../data/site';
import { cn } from '../lib/utils';
import { LanguageSwitcher } from './LanguageSwitcher';

export const Header = () => {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen);
    return () => document.body.classList.remove('menu-open');
  }, [menuOpen]);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500',
        scrolled ? 'px-3 pt-3 md:px-6' : 'px-0 pt-0',
      )}
    >
      <div
        className={cn(
          'mx-auto flex max-w-7xl items-center justify-between rounded-[1.6rem] border px-4 py-3 transition-all md:px-6',
          scrolled
            ? 'glass-panel border-black/10 shadow-lg shadow-black/5'
            : 'border-transparent bg-transparent',
        )}
      >
        <a href="#hero" className="flex items-center gap-3" data-cursor="hover">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-ink text-sm font-bold tracking-[0.3em] text-white">
            LA
          </div>
          <div>
            <p className="font-display text-2xl text-ink">Lumina Atelier</p>
            <p className="text-xs uppercase tracking-[0.22em] text-black/45">Berlin</p>
          </div>
        </a>

        <nav className="hidden items-center gap-6 lg:flex">
          {navigationItems.map((item) => (
            <a
              key={item.key}
              href={item.href}
              className="text-sm font-semibold text-black/65 transition hover:text-black"
            >
              {t(`nav.${item.key}`)}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitcher compact />
          <a
            href="#booking"
            className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5"
          >
            {t('common.bookNow')}
          </a>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((current) => !current)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white/85 lg:hidden"
          aria-label="Toggle navigation"
        >
          <span className="space-y-1.5">
            <span className="block h-0.5 w-5 bg-black" />
            <span className="block h-0.5 w-5 bg-black" />
          </span>
        </button>
      </div>

      {menuOpen ? (
        <div className="mx-3 mt-3 rounded-[1.8rem] border border-black/10 bg-white/95 p-6 shadow-2xl shadow-black/10 backdrop-blur-xl lg:hidden">
          <div className="mb-5 flex justify-end">
            <LanguageSwitcher />
          </div>
          <div className="grid gap-4">
            {navigationItems.map((item) => (
              <a
                key={item.key}
                href={item.href}
                className="rounded-2xl border border-black/8 px-4 py-3 font-semibold text-black/70"
                onClick={() => setMenuOpen(false)}
              >
                {t(`nav.${item.key}`)}
              </a>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
};
