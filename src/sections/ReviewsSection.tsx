import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { SectionHeading } from '../components/SectionHeading';
import { reviewIds, trustBadgeIds } from '../data/site';
import { useScrollReveal } from '../hooks/useScrollReveal';

const StarsRow = styled.div.attrs({
  className: 'flex gap-1 text-gold',
})``;

const Section = styled.section.attrs({
  className: 'section-shell px-4 py-24 md:px-8 md:py-32',
})``;

const Container = styled.div.attrs({
  className: 'mx-auto max-w-7xl',
})``;

const BadgesGrid = styled.div.attrs({
  className: 'mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4',
})``;

const BadgeCard = styled.div.attrs<{ $reveal: string }>(({ $reveal }) => ({
  className:
    'rounded-[1.8rem] border border-black/8 bg-white/75 px-5 py-6 text-center shadow-[0_16px_35px_rgba(17,17,17,0.04)] backdrop-blur',
  'data-reveal': $reveal,
}))``;

const BadgeText = styled.p.attrs({
  className: 'text-sm font-semibold text-black/70',
})``;

const ReviewsGrid = styled.div.attrs({
  className: 'mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3',
})``;

const ReviewCard = styled.article.attrs<{ $reveal: string }>(({ $reveal }) => ({
  className:
    'rounded-[2rem] border border-black/8 bg-white/78 p-6 shadow-[0_18px_45px_rgba(17,17,17,0.05)] backdrop-blur',
  'data-reveal': $reveal,
}))``;

const Quote = styled.p.attrs({
  className: 'mt-6 text-base leading-8 text-black/70',
})``;

const ReviewFooter = styled.div.attrs({
  className: 'mt-8 flex items-center justify-between gap-4 border-t border-black/8 pt-5',
})``;

const Author = styled.p.attrs({
  className: 'font-semibold text-black',
})``;

const Service = styled.p.attrs({
  className: 'text-sm text-black/48',
})``;

const Avatar = styled.div.attrs({
  className: 'h-12 w-12 rounded-full bg-gradient-to-br from-[#D4AF37] via-[#6EC6FF] to-[#FF6B6B]',
})``;

const Stars = () => (
  <StarsRow>
    {Array.from({ length: 5 }, (_, index) => (
      <span key={index}>&#9733;</span>
    ))}
  </StarsRow>
);

export const ReviewsSection = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement | null>(null);
  useScrollReveal(sectionRef);

  return (
    <Section id="reviews" ref={sectionRef}>
      <Container>
        <SectionHeading
          eyebrow={t('reviews.eyebrow')}
          title={t('reviews.title')}
          description={t('reviews.description')}
          align="center"
        />

        <BadgesGrid>
          {trustBadgeIds.map((badgeId, index) => (
            <BadgeCard
              key={badgeId}
              $reveal={index % 2 === 0 ? 'fade-up' : 'blur'}
            >
              <BadgeText>{t(`reviews.badges.${badgeId}`)}</BadgeText>
            </BadgeCard>
          ))}
        </BadgesGrid>

        <ReviewsGrid>
          {reviewIds.map((reviewId, index) => (
            <ReviewCard
              key={reviewId}
              $reveal={index % 2 === 0 ? 'fade-right' : 'fade-left'}
            >
              <Stars />
              <Quote>&ldquo;{t(`reviews.items.${reviewId}.quote`)}&rdquo;</Quote>
              <ReviewFooter>
                <div>
                  <Author>{t(`reviews.items.${reviewId}.author`)}</Author>
                  <Service>{t(`reviews.items.${reviewId}.service`)}</Service>
                </div>
                <Avatar />
              </ReviewFooter>
            </ReviewCard>
          ))}
        </ReviewsGrid>
      </Container>
    </Section>
  );
};
