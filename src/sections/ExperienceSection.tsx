import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { SectionHeading } from '../components/SectionHeading';
import { experienceSteps } from '../data/site';
import { useScrollReveal } from '../hooks/useScrollReveal';

export const ExperienceSection = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement | null>(null);
  useScrollReveal(sectionRef);

  return (
    <section id="experience" ref={sectionRef} className="section-shell px-4 py-24 md:px-8 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            eyebrow={t('experience.eyebrow')}
            title={t('experience.title')}
            description={t('experience.description')}
          />
          <div
            data-reveal="blur"
            className="mt-8 rounded-[2rem] border border-black/8 bg-white/75 p-6 shadow-[0_20px_55px_rgba(17,17,17,0.05)] backdrop-blur"
          >
            <p className="text-xs uppercase tracking-[0.22em] text-black/45">{t('experience.eyebrow')}</p>
            <p className="mt-3 font-display text-3xl text-ink">{t('experience.visitTime')}</p>
          </div>
        </div>

        <div className="relative">
          <div className="absolute left-[1.55rem] top-8 hidden h-[calc(100%-4rem)] w-px bg-gradient-to-b from-gold via-[#6EC6FF] to-[#D7263D] lg:block" />
          <div className="grid gap-6">
            {experienceSteps.map((step, index) => (
              <article
                key={step.id}
                data-reveal={index % 2 === 0 ? 'fade-right' : 'fade-left'}
                className="grid gap-5 rounded-[2rem] border border-black/8 bg-white/72 p-5 shadow-[0_18px_45px_rgba(17,17,17,0.05)] backdrop-blur md:grid-cols-[auto_1fr] md:p-6"
              >
                <div className="flex items-start gap-4 md:flex-col md:items-center">
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${step.accent} text-base font-bold text-ink shadow-lg shadow-black/5`}
                  >
                    {step.icon}
                  </div>
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="font-display text-3xl text-ink">{t(`experience.steps.${step.id}.title`)}</h3>
                    <span className="rounded-full bg-black/[0.04] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-black/45">
                      {t(`experience.steps.${step.id}.detail`)}
                    </span>
                  </div>
                  <p className="mt-4 max-w-2xl text-sm leading-7 text-black/65">
                    {t(`experience.steps.${step.id}.body`)}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
