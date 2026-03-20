import { useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SectionHeading } from '../components/SectionHeading';
import { priceGroups } from '../data/site';
import { useScrollReveal } from '../hooks/useScrollReveal';

export const PricesSection = () => {
  const { t } = useTranslation();
  const [activeGroup, setActiveGroup] = useState<(typeof priceGroups)[number]['id']>('signature');
  const sectionRef = useRef<HTMLElement | null>(null);

  useScrollReveal(sectionRef);

  const activeItems = useMemo(
    () => priceGroups.find((group) => group.id === activeGroup)?.itemIds ?? priceGroups[0].itemIds,
    [activeGroup],
  );

  return (
    <section id="prices" ref={sectionRef} className="section-shell px-4 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow={t('prices.eyebrow')}
          title={t('prices.title')}
          description={t('prices.description')}
        />

        <div className="mt-8 rounded-[2rem] border border-gold/25 bg-gold/10 px-6 py-4 text-sm font-medium text-black/70">
          {t('prices.note')}
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          {priceGroups.map((group) => (
            <button
              key={group.id}
              type="button"
              onClick={() => setActiveGroup(group.id)}
              className={`rounded-full px-5 py-3 text-sm font-semibold transition ${
                activeGroup === group.id
                  ? 'bg-ink text-white'
                  : 'border border-black/10 bg-white/80 text-black/65'
              }`}
            >
              {t(`prices.filters.${group.id}`)}
            </button>
          ))}
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {activeItems.map((itemId, index) => {
            const badge = t(`prices.items.${itemId}.badge`, { defaultValue: '' });
            return (
              <article
                key={itemId}
                data-reveal={index % 2 === 0 ? 'fade-up' : 'scale-in'}
                className={`luxury-border rounded-[2rem] border p-6 shadow-[0_18px_45px_rgba(17,17,17,0.05)] backdrop-blur ${
                  badge ? 'border-gold/30 bg-white' : 'border-black/8 bg-white/75'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-black/45">{t(`prices.filters.${activeGroup}`)}</p>
                    <h3 className="mt-3 font-display text-3xl text-ink">{t(`prices.items.${itemId}.title`)}</h3>
                  </div>
                  {badge ? (
                    <span className="rounded-full bg-gold/12 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-black/70">
                      {badge}
                    </span>
                  ) : null}
                </div>

                <div className="mt-10 flex items-end justify-between gap-4">
                  <div>
                    <p className="text-sm text-black/50">{t(`prices.items.${itemId}.duration`)}</p>
                    <p className="mt-3 text-3xl font-semibold text-black">{t(`prices.items.${itemId}.price`)}</p>
                  </div>
                  <a
                    href="#booking"
                    className="rounded-full border border-black/12 px-4 py-3 text-sm font-semibold text-black/70 transition hover:bg-black hover:text-white"
                  >
                    {t('common.bookNow')}
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
