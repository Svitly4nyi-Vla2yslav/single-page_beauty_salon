import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { SectionHeading } from '../components/SectionHeading';
import { experienceSteps } from '../data/site';
import { useScrollReveal } from '../hooks/useScrollReveal';

const Section = styled.section.attrs({
  className: 'section-shell px-4 py-24 md:px-8 md:py-32',
})``;

const MainGrid = styled.div.attrs({
  className: 'mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.85fr_1.15fr]',
})``;

const StickyColumn = styled.div.attrs({
  className: 'lg:sticky lg:top-28 lg:self-start',
})``;

const InfoCard = styled.div.attrs({
  className:
    'mt-8 rounded-[2rem] border border-black/8 bg-white/75 p-6 shadow-[0_20px_55px_rgba(17,17,17,0.05)] backdrop-blur',
  'data-reveal': 'blur',
})``;

const Eyebrow = styled.p.attrs({
  className: 'text-xs uppercase tracking-[0.22em] text-black/45',
})``;

const VisitTime = styled.p.attrs({
  className: 'mt-3 font-display text-3xl text-ink',
})``;

const Timeline = styled.div.attrs({
  className: 'relative',
})``;

const TimelineLine = styled.div.attrs({
  className:
    'absolute left-[1.55rem] top-8 hidden h-[calc(100%-4rem)] w-px bg-gradient-to-b from-gold via-[#6EC6FF] to-[#D7263D] lg:block',
})``;

const StepsGrid = styled.div.attrs({
  className: 'grid gap-6',
})``;

const StepCard = styled.article.attrs<{ $reveal: string }>(({ $reveal }) => ({
  className:
    'grid gap-5 rounded-[2rem] border border-black/8 bg-white/72 p-5 shadow-[0_18px_45px_rgba(17,17,17,0.05)] backdrop-blur md:grid-cols-[auto_1fr] md:p-6',
  'data-reveal': $reveal,
}))``;

const StepIconWrap = styled.div.attrs({
  className: 'flex items-start gap-4 md:flex-col md:items-center',
})``;

const StepIcon = styled.div.attrs<{ $accent: string }>(({ $accent }) => ({
  className: `flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${$accent} text-base font-bold text-ink shadow-lg shadow-black/5`,
}))``;

const StepHeader = styled.div.attrs({
  className: 'flex flex-wrap items-center gap-3',
})``;

const StepTitle = styled.h3.attrs({
  className: 'font-display text-3xl text-ink',
})``;

const StepDetail = styled.span.attrs({
  className: 'rounded-full bg-black/[0.04] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-black/45',
})``;

const StepBody = styled.p.attrs({
  className: 'mt-4 max-w-2xl text-sm leading-7 text-black/65',
})``;

export const ExperienceSection = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement | null>(null);
  useScrollReveal(sectionRef);

  return (
    <Section id="experience" ref={sectionRef}>
      <MainGrid>
        <StickyColumn>
          <SectionHeading
            eyebrow={t('experience.eyebrow')}
            title={t('experience.title')}
            description={t('experience.description')}
          />
          <InfoCard>
            <Eyebrow>{t('experience.eyebrow')}</Eyebrow>
            <VisitTime>{t('experience.visitTime')}</VisitTime>
          </InfoCard>
        </StickyColumn>

        <Timeline>
          <TimelineLine />
          <StepsGrid>
            {experienceSteps.map((step, index) => (
              <StepCard
                key={step.id}
                $reveal={index % 2 === 0 ? 'fade-right' : 'fade-left'}
              >
                <StepIconWrap>
                  <StepIcon $accent={step.accent}>{step.icon}</StepIcon>
                </StepIconWrap>
                <div>
                  <StepHeader>
                    <StepTitle>{t(`experience.steps.${step.id}.title`)}</StepTitle>
                    <StepDetail>{t(`experience.steps.${step.id}.detail`)}</StepDetail>
                  </StepHeader>
                  <StepBody>{t(`experience.steps.${step.id}.body`)}</StepBody>
                </div>
              </StepCard>
            ))}
          </StepsGrid>
        </Timeline>
      </MainGrid>
    </Section>
  );
};
