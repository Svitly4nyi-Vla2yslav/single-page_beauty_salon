import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { SectionHeading } from '../components/SectionHeading';
import { useScrollReveal } from '../hooks/useScrollReveal';

export const ContactSection = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement | null>(null);
  useScrollReveal(sectionRef);

  return (
    <section id="contact" ref={sectionRef} className="section-shell px-4 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-7xl rounded-[2.8rem] bg-ink px-6 py-10 text-white md:px-10 md:py-14">
        <SectionHeading
          eyebrow={t('contact.eyebrow')}
          title={t('contact.title')}
          description={t('contact.description')}
          className="max-w-4xl"
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="grid gap-5">
            <article data-reveal="fade-right" className="rounded-[2rem] border border-white/10 bg-white/6 p-6">
              <p className="text-xs uppercase tracking-[0.24em] text-white/50">{t('contact.addressTitle')}</p>
              <p className="mt-4 font-display text-3xl text-white">{t('contact.addressLineOne')}</p>
              <p className="mt-2 text-sm leading-7 text-white/70">{t('contact.addressLineTwo')}</p>
            </article>

            <article data-reveal="blur" className="rounded-[2rem] border border-white/10 bg-white/6 p-6">
              <p className="text-xs uppercase tracking-[0.24em] text-white/50">{t('contact.hoursTitle')}</p>
              <div className="mt-4 grid gap-2 text-sm leading-7 text-white/72">
                <p>{t('contact.hours.monFri')}</p>
                <p>{t('contact.hours.sat')}</p>
                <p>{t('contact.hours.sun')}</p>
              </div>
            </article>

            <article data-reveal="fade-right" className="rounded-[2rem] border border-white/10 bg-white/6 p-6">
              <p className="text-xs uppercase tracking-[0.24em] text-white/50">{t('contact.contactTitle')}</p>
              <div className="mt-4 grid gap-3 text-sm leading-7 text-white/72">
                <a href={`tel:${t('contact.phone')}`} className="hover:text-white">
                  {t('contact.phone')}
                </a>
                <a href={`mailto:${t('contact.email')}`} className="hover:text-white">
                  {t('contact.email')}
                </a>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="https://wa.me/49305558210"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-ink"
                >
                  {t('contact.whatsapp')}
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-white/12 px-5 py-3 text-sm font-semibold text-white/80"
                >
                  {t('contact.instagram')}
                </a>
              </div>
            </article>
          </div>

          <div data-reveal="fade-left" className="rounded-[2.4rem] border border-white/10 bg-white/6 p-5">
            <div className="h-full min-h-[28rem] rounded-[2rem] bg-[linear-gradient(145deg,#1b2638,#253652_45%,#111111)] p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-white/50">{t('contact.mapTitle')}</p>
                  <h3 className="mt-2 font-display text-4xl text-white">Berlin West</h3>
                </div>
                <div className="rounded-full border border-white/12 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/65">
                  Savignyplatz
                </div>
              </div>

              <div className="relative mt-8 h-[20rem] overflow-hidden rounded-[1.8rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(110,198,255,0.22),transparent_18%),radial-gradient(circle_at_bottom_right,rgba(255,107,107,0.2),transparent_18%),linear-gradient(145deg,#0f1722,#152338,#0d1117)]">
                <div
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage:
                      'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)',
                    backgroundSize: '48px 48px',
                  }}
                />
                <div className="absolute left-[58%] top-[42%] flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/12 backdrop-blur">
                  <div className="h-5 w-5 rounded-full bg-gold" />
                </div>
                <div className="absolute inset-x-6 bottom-6 rounded-[1.4rem] border border-white/10 bg-black/20 p-5">
                  <p className="text-sm leading-7 text-white/72">{t('contact.mapNote')}</p>
                  <p className="mt-3 text-sm font-medium text-white/85">{t('contact.parking')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
