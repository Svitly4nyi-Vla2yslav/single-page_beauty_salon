import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { SectionHeading } from '../components/SectionHeading';
import { teamIds } from '../data/site';
import { useScrollReveal } from '../hooks/useScrollReveal';
import aminaImage from '../assets/team/Amina Kaya.png';
import laraImage from '../assets/team/Lara Muller.png';
import sofiaImage from '../assets/team/Sofia Hnatiuk.png';

const teamImages = {
  lara: {
    src: laraImage,
    position: 'center 24%',
  },
  amina: {
    src: aminaImage,
    position: 'center 20%',
  },
  sofia: {
    src: sofiaImage,
    position: 'center 18%',
  },
} as const;

const Section = styled.section.attrs({
  className: 'section-shell px-4 py-24 md:px-8 md:py-32',
})``;

const MainGrid = styled.div.attrs({
  className: 'mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.92fr_1.08fr]',
})``;

const StoryCard = styled.div.attrs({
  className:
    'mt-10 rounded-[2.2rem] border border-black/8 bg-white/78 p-6 shadow-[0_18px_45px_rgba(17,17,17,0.05)] backdrop-blur',
  'data-reveal': 'blur',
})``;

const StoryTitle = styled.p.attrs({
  className: 'text-xs uppercase tracking-[0.24em] text-black/45',
})``;

const StoryBody = styled.p.attrs({
  className: 'mt-4 text-base leading-8 text-black/68',
})``;

const PointsGrid = styled.div.attrs({
  className: 'mt-8 grid gap-4',
})``;

const PointCard = styled.div.attrs<{ $reveal: string }>(({ $reveal }) => ({
  className: 'rounded-[1.8rem] border border-black/8 bg-white/72 p-5 shadow-[0_14px_35px_rgba(17,17,17,0.04)]',
  'data-reveal': $reveal,
}))``;

const PointTitle = styled.h3.attrs({
  className: 'font-display text-3xl text-ink',
})``;

const PointBody = styled.p.attrs({
  className: 'mt-3 text-sm leading-7 text-black/63',
})``;

const VisualStage = styled.div.attrs({
  className: 'relative min-h-[34rem]',
})``;

const DarkCard = styled.div.attrs({
  className:
    'absolute left-0 top-0 h-[22rem] w-[72%] rounded-[2.4rem] bg-[linear-gradient(160deg,#111111,#2c3546_52%,#D4AF37)] p-5 shadow-[0_28px_70px_rgba(17,17,17,0.18)]',
  'data-parallax': 'slow',
})``;

const DarkInner = styled.div.attrs({
  className:
    'flex h-full flex-col rounded-[1.9rem] border border-white/12 bg-[linear-gradient(145deg,rgba(255,255,255,0.18),rgba(255,255,255,0.04))] p-5 text-white',
})``;

const LightCard = styled.div.attrs({
  className:
    'absolute bottom-0 right-0 h-[18rem] w-[64%] rounded-[2.4rem] bg-[linear-gradient(145deg,#fff1d7,#ffffff_35%,#ddecff)] p-5 shadow-[0_24px_60px_rgba(17,17,17,0.1)]',
  'data-parallax': 'medium',
})``;

const LightInner = styled.div.attrs({
  className:
    'h-full rounded-[1.9rem] border border-black/8 bg-[linear-gradient(145deg,rgba(255,255,255,0.8),rgba(255,255,255,0.45))] p-5',
})``;

const VisualLabelDark = styled.p.attrs({
  className: 'text-xs uppercase tracking-[0.28em] text-white/55',
})``;

const VisualQuote = styled.p.attrs({
  className: 'mt-auto max-w-[12ch] font-display text-5xl leading-none',
})``;

const VisualLabelLight = styled.p.attrs({
  className: 'text-xs uppercase tracking-[0.28em] text-black/45',
})``;

const NotesGrid = styled.div.attrs({
  className: 'mt-6 grid gap-3 text-sm leading-7 text-black/68',
})``;

const TeamWrap = styled.div.attrs({
  className: 'mx-auto mt-16 max-w-7xl',
})``;

const TeamIntro = styled.div.attrs({
  className: 'mb-8',
})``;

const TeamLabel = styled.p.attrs({
  className: 'text-xs font-semibold uppercase tracking-[0.26em] text-black/45',
})``;

const TeamDescription = styled.p.attrs({
  className: 'mt-3 text-sm text-black/60',
})``;

const TeamGrid = styled.div.attrs({
  className: 'grid gap-5 md:grid-cols-3',
})``;

const TeamCard = styled.article.attrs<{ $reveal: string }>(({ $reveal }) => ({
  className:
    'rounded-[2rem] border border-black/8 bg-white/78 p-6 shadow-[0_18px_45px_rgba(17,17,17,0.05)] backdrop-blur',
  'data-reveal': $reveal,
}))``;

const TeamVisual = styled.div<{ $image: string; $position: string }>`
  position: relative;
  height: 10rem;
  overflow: hidden;
  border-radius: 1.6rem;
  background-image:
    linear-gradient(180deg, rgba(10, 10, 10, 0.08) 0%, rgba(10, 10, 10, 0.02) 42%, rgba(10, 10, 10, 0.18) 100%),
    url(${({ $image }) => $image});
  background-position: ${({ $position }) => $position};
  background-repeat: no-repeat;
  background-size: cover;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.26),
    0 16px 32px rgba(17, 17, 17, 0.08);

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: linear-gradient(135deg, rgba(255, 244, 228, 0.14), transparent 44%, rgba(255, 255, 255, 0.08) 100%);
    pointer-events: none;
  }
`;

const TeamName = styled.h3.attrs({
  className: 'mt-5 font-display text-3xl text-ink',
})``;

const TeamRole = styled.p.attrs({
  className: 'mt-2 text-sm font-semibold uppercase tracking-[0.18em] text-black/45',
})``;

const TeamBio = styled.p.attrs({
  className: 'mt-4 text-sm leading-7 text-black/65',
})``;

export const AboutSection = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement | null>(null);
  useScrollReveal(sectionRef);

  return (
    <Section id="about" ref={sectionRef}>
      <MainGrid>
        <div>
          <SectionHeading
            eyebrow={t('about.eyebrow')}
            title={t('about.title')}
            description={t('about.description')}
          />

          <StoryCard>
            <StoryTitle>{t('about.storyTitle')}</StoryTitle>
            <StoryBody>{t('about.storyBody')}</StoryBody>
          </StoryCard>

          <PointsGrid>
            {(['quality', 'aesthetics', 'care'] as const).map((pointId, index) => (
              <PointCard
                key={pointId}
                $reveal={index % 2 === 0 ? 'fade-left' : 'fade-right'}
              >
                <PointTitle>{t(`about.points.${pointId}.title`)}</PointTitle>
                <PointBody>{t(`about.points.${pointId}.body`)}</PointBody>
              </PointCard>
            ))}
          </PointsGrid>
        </div>

        <VisualStage>
          <DarkCard>
            <DarkInner>
              <VisualLabelDark>Studio interior</VisualLabelDark>
              <VisualQuote>Quiet light, clean texture, premium calm.</VisualQuote>
            </DarkInner>
          </DarkCard>

          <LightCard>
            <LightInner>
              <VisualLabelLight>Studio notes</VisualLabelLight>
              <NotesGrid>
                <p>{t('about.studioNotes.ambience')}</p>
                <p>{t('about.studioNotes.technology')}</p>
                <p>{t('about.studioNotes.care')}</p>
              </NotesGrid>
            </LightInner>
          </LightCard>
        </VisualStage>
      </MainGrid>

      <TeamWrap>
        <TeamIntro>
          <TeamLabel>{t('about.team.title')}</TeamLabel>
          <TeamDescription>{t('about.team.description')}</TeamDescription>
        </TeamIntro>

        <TeamGrid>
          {teamIds.map((teamId, index) => {
            const teamImage = teamImages[teamId];

            return (
            <TeamCard
              key={teamId}
              $reveal={index % 2 === 0 ? 'fade-up' : 'blur'}
            >
              <TeamVisual $image={teamImage.src} $position={teamImage.position} />
              <TeamName>{t(`about.team.${teamId}.name`)}</TeamName>
              <TeamRole>{t(`about.team.${teamId}.role`)}</TeamRole>
              <TeamBio>{t(`about.team.${teamId}.bio`)}</TeamBio>
            </TeamCard>
            );
          })}
        </TeamGrid>
      </TeamWrap>
    </Section>
  );
};
