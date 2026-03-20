import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { SectionHeading } from '../components/SectionHeading';
import { teamIds } from '../data/site';
import { useScrollReveal } from '../hooks/useScrollReveal';

export const AboutSection = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement | null>(null);
  useScrollReveal(sectionRef);

  return (
    <section id="about" ref={sectionRef} className="section-shell px-4 py-24 md:px-8 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.92fr_1.08fr]">
        <div>
          <SectionHeading
            eyebrow={t('about.eyebrow')}
            title={t('about.title')}
            description={t('about.description')}
          />

          <div
            data-reveal="blur"
            className="mt-10 rounded-[2.2rem] border border-black/8 bg-white/78 p-6 shadow-[0_18px_45px_rgba(17,17,17,0.05)] backdrop-blur"
          >
            <p className="text-xs uppercase tracking-[0.24em] text-black/45">{t('about.storyTitle')}</p>
            <p className="mt-4 text-base leading-8 text-black/68">{t('about.storyBody')}</p>
          </div>

          <div className="mt-8 grid gap-4">
            {(['quality', 'aesthetics', 'care'] as const).map((pointId, index) => (
              <div
                key={pointId}
                data-reveal={index % 2 === 0 ? 'fade-left' : 'fade-right'}
                className="rounded-[1.8rem] border border-black/8 bg-white/72 p-5 shadow-[0_14px_35px_rgba(17,17,17,0.04)]"
              >
                <h3 className="font-display text-3xl text-ink">{t(`about.points.${pointId}.title`)}</h3>
                <p className="mt-3 text-sm leading-7 text-black/63">{t(`about.points.${pointId}.body`)}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative min-h-[34rem]">
          <div data-parallax="slow" className="absolute left-0 top-0 h-[22rem] w-[72%] rounded-[2.4rem] bg-[linear-gradient(160deg,#111111,#2c3546_52%,#D4AF37)] p-5 shadow-[0_28px_70px_rgba(17,17,17,0.18)]">
            <div className="h-full rounded-[1.9rem] border border-white/12 bg-[linear-gradient(145deg,rgba(255,255,255,0.18),rgba(255,255,255,0.04))] p-5 text-white">
              <p className="text-xs uppercase tracking-[0.28em] text-white/55">Studio interior</p>
              <p className="mt-auto max-w-[12ch] font-display text-5xl leading-none">Quiet light, clean texture, premium calm.</p>
            </div>
          </div>
          <div data-parallax="medium" className="absolute bottom-0 right-0 h-[18rem] w-[64%] rounded-[2.4rem] bg-[linear-gradient(145deg,#fff1d7,#ffffff_35%,#ddecff)] p-5 shadow-[0_24px_60px_rgba(17,17,17,0.1)]">
            <div className="h-full rounded-[1.9rem] border border-black/8 bg-[linear-gradient(145deg,rgba(255,255,255,0.8),rgba(255,255,255,0.45))] p-5">
              <p className="text-xs uppercase tracking-[0.28em] text-black/45">Studio notes</p>
              <div className="mt-6 grid gap-3 text-sm leading-7 text-black/68">
                <p>{t('about.studioNotes.ambience')}</p>
                <p>{t('about.studioNotes.technology')}</p>
                <p>{t('about.studioNotes.care')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-7xl">
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-black/45">{t('about.team.title')}</p>
          <p className="mt-3 text-sm text-black/60">{t('about.team.description')}</p>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {teamIds.map((teamId, index) => (
            <article
              key={teamId}
              data-reveal={index % 2 === 0 ? 'fade-up' : 'blur'}
              className="rounded-[2rem] border border-black/8 bg-white/78 p-6 shadow-[0_18px_45px_rgba(17,17,17,0.05)] backdrop-blur"
            >
              <div className="h-40 rounded-[1.6rem] bg-[linear-gradient(145deg,#111111,#2F80ED_45%,#D4AF37)]" />
              <h3 className="mt-5 font-display text-3xl text-ink">{t(`about.team.${teamId}.name`)}</h3>
              <p className="mt-2 text-sm font-semibold uppercase tracking-[0.18em] text-black/45">
                {t(`about.team.${teamId}.role`)}
              </p>
              <p className="mt-4 text-sm leading-7 text-black/65">{t(`about.team.${teamId}.bio`)}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
