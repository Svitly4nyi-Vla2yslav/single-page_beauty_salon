import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { SectionHeading } from '../components/SectionHeading';
import { serviceCards } from '../data/site';
import { useScrollReveal } from '../hooks/useScrollReveal';

const accents: Record<string, string> = {
  lashes: 'from-[#fffaf0] via-white to-[#eef8ff]',
  brows: 'from-[#fff6de] via-white to-[#fff3f5]',
  facial: 'from-[#eef9ff] via-white to-[#f4f2ff]',
  pmu: 'from-[#fff0f0] via-white to-[#fffaf2]',
  headSpa: 'from-[#eff5ff] via-white to-[#fff9ef]',
  antiAging: 'from-[#f7f7f1] via-white to-[#eef9ff]',
  makeup: 'from-[#fff3ef] via-white to-[#fef7ff]',
  consulting: 'from-[#f9f7f0] via-white to-[#f1f8ff]',
};

export const SignatureServicesSection = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement | null>(null);
  useScrollReveal(sectionRef);

  return (
    <section id="services" ref={sectionRef} className="section-shell px-4 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow={t('services.eyebrow')}
          title={t('services.title')}
          description={t('services.description')}
        />

        <div className="editorial-grid relative mt-14 overflow-hidden rounded-[2.6rem] border border-black/8 p-4 md:p-6">
          <div className="absolute -left-20 top-8 h-48 w-48 rounded-full bg-[#6EC6FF]/15 blur-3xl" data-parallax="slow" />
          <div className="absolute bottom-0 right-0 h-56 w-56 rounded-full bg-[#D4AF37]/12 blur-3xl" data-parallax="medium" />

          <div className="relative grid gap-5 md:grid-cols-6 lg:grid-cols-6">
            {serviceCards.map((service, index) => (
              <article
                key={service.id}
                data-reveal={service.reveal}
                className={`${service.size} luxury-border relative overflow-hidden rounded-[2rem] border border-black/8 bg-gradient-to-br ${accents[service.id]} p-6 shadow-[0_25px_50px_rgba(17,17,17,0.06)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_32px_72px_rgba(17,17,17,0.1)]`}
              >
                <div className="absolute right-4 top-4 rounded-full bg-ink px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-white">
                  0{index + 1}
                </div>
                <div className="absolute -right-10 bottom-0 h-32 w-32 rounded-full bg-gradient-to-br from-gold/20 via-transparent to-transparent blur-2xl" />

                <p className="text-xs uppercase tracking-[0.28em] text-black/45">{t('services.eyebrow')}</p>
                <h3 className="mt-5 font-display text-3xl leading-none text-ink">
                  {t(`services.items.${service.id}.title`)}
                </h3>
                <p className="mt-4 text-sm leading-7 text-black/65">
                  {t(`services.items.${service.id}.description`)}
                </p>

                <div className="mt-8 flex items-end justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-black/35">
                      {t(`services.items.${service.id}.duration`)}
                    </p>
                    <p className="mt-2 text-xl font-semibold text-black">
                      {t(`services.items.${service.id}.price`)}
                    </p>
                  </div>
                  <a
                    href="#booking"
                    className="inline-flex items-center gap-2 rounded-full border border-black/10 px-4 py-3 text-sm font-semibold text-black/70 transition hover:bg-black hover:text-white"
                  >
                    {t('services.miniCta')}
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
