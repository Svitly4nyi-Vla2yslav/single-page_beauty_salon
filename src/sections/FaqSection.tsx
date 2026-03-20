import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SectionHeading } from '../components/SectionHeading';
import { faqIds } from '../data/site';
import { useScrollReveal } from '../hooks/useScrollReveal';

export const FaqSection = () => {
  const { t } = useTranslation();
  const [openItem, setOpenItem] = useState<(typeof faqIds)[number]>('bookingChanges');
  const sectionRef = useRef<HTMLElement | null>(null);
  useScrollReveal(sectionRef);

  return (
    <section id="faq" ref={sectionRef} className="section-shell px-4 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow={t('faq.eyebrow')}
          title={t('faq.title')}
          description={t('faq.description')}
          align="center"
        />

        <div className="mt-12 grid gap-4">
          {faqIds.map((faqId, index) => {
            const isOpen = openItem === faqId;
            return (
              <article
                key={faqId}
                data-reveal={index % 2 === 0 ? 'fade-up' : 'fade-right'}
                className="rounded-[2rem] border border-black/8 bg-white/80 p-5 shadow-[0_18px_45px_rgba(17,17,17,0.04)] backdrop-blur"
              >
                <button
                  type="button"
                  onClick={() => setOpenItem(isOpen ? 'bookingChanges' : faqId)}
                  className="flex w-full items-center justify-between gap-6 text-left"
                >
                  <span className="font-display text-3xl text-ink">{t(`faq.items.${faqId}.question`)}</span>
                  <span className="rounded-full border border-black/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-black/45">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>
                {isOpen ? (
                  <p className="mt-5 max-w-3xl text-sm leading-8 text-black/65">{t(`faq.items.${faqId}.answer`)}</p>
                ) : null}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
