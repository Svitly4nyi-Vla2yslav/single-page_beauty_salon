import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { SectionHeading } from '../components/SectionHeading';
import { reviewIds, trustBadgeIds } from '../data/site';
import { useScrollReveal } from '../hooks/useScrollReveal';

const Stars = () => (
  <div className="flex gap-1 text-gold">
    {Array.from({ length: 5 }, (_, index) => (
      <span key={index}>★</span>
    ))}
  </div>
);

export const ReviewsSection = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement | null>(null);
  useScrollReveal(sectionRef);

  return (
    <section id="reviews" ref={sectionRef} className="section-shell px-4 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow={t('reviews.eyebrow')}
          title={t('reviews.title')}
          description={t('reviews.description')}
          align="center"
        />

        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {trustBadgeIds.map((badgeId, index) => (
            <div
              key={badgeId}
              data-reveal={index % 2 === 0 ? 'fade-up' : 'blur'}
              className="rounded-[1.8rem] border border-black/8 bg-white/75 px-5 py-6 text-center shadow-[0_16px_35px_rgba(17,17,17,0.04)] backdrop-blur"
            >
              <p className="text-sm font-semibold text-black/70">{t(`reviews.badges.${badgeId}`)}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {reviewIds.map((reviewId, index) => (
            <article
              key={reviewId}
              data-reveal={index % 2 === 0 ? 'fade-right' : 'fade-left'}
              className="rounded-[2rem] border border-black/8 bg-white/78 p-6 shadow-[0_18px_45px_rgba(17,17,17,0.05)] backdrop-blur"
            >
              <Stars />
              <p className="mt-6 text-base leading-8 text-black/70">“{t(`reviews.items.${reviewId}.quote`)}”</p>
              <div className="mt-8 flex items-center justify-between gap-4 border-t border-black/8 pt-5">
                <div>
                  <p className="font-semibold text-black">{t(`reviews.items.${reviewId}.author`)}</p>
                  <p className="text-sm text-black/48">{t(`reviews.items.${reviewId}.service`)}</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-[#D4AF37] via-[#6EC6FF] to-[#FF6B6B]" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
