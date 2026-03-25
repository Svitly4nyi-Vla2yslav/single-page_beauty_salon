import { AnimatePresence, motion } from 'framer-motion';
import styled from 'styled-components';
import { HeroStats } from './HeroStats';
import type { HeroSlide } from './types';

type HeroContentSliderProps = {
  slides: HeroSlide[];
  activeSlide: number;
  direction: 1 | -1;
  reducedMotion: boolean;
};

const Panel = styled.div`
  display: contents;
`;

const PanelInner = styled.div`
  display: grid;
  gap: 0.95rem;
  padding: 0;
  width: min(100%, 34rem);

  @media (min-width: 640px) {
    padding: 0;
  }

  @media (max-width: 1023px) {
    width: min(100%, 36rem);
  }

  @media (max-width: 767px) {
    width: 100%;
  }

  @media (min-width: 1024px) {
    gap: 0.92rem;
    padding: 0;
  }
`;

const MotionBlock = styled(motion.div)`
  display: grid;
  gap: 0.82rem;
`;

const EyebrowPill = styled(motion.span)`
  display: inline-flex;
  width: fit-content;
  align-items: center;
  gap: 0.62rem;
  padding: 0.62rem 0.9rem;
  border: 1px solid rgba(255, 255, 255, 0.46);
  border-radius: 999px;
  background: rgba(255, 253, 249, 0.52);
  color: rgba(102, 78, 59, 0.82);
  font-size: 0.58rem;
  font-weight: 700;
  letter-spacing: 0.27em;
  text-transform: uppercase;
`;

const EyebrowDot = styled.span`
  width: 0.42rem;
  height: 0.42rem;
  border-radius: 999px;
  background: #c8a24c;
  box-shadow: 0 0 12px rgba(212, 175, 55, 0.28);
`;

const Subtitle = styled(motion.p)`
  font-size: 0.58rem;
  font-weight: 700;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: rgba(110, 85, 66, 0.62);
`;

const Title = styled.h1`
  max-width: 10.8ch;
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(2.3rem, 3.65vw, 4rem);
  line-height: 0.92;
  letter-spacing: -0.04em;
  color: #38271e;
  /* text-wrap: balance; */

  @media (max-width: 767px) {
    max-width: 11.4ch;
    font-size: clamp(2rem, 8.6vw, 3rem);
  }
`;

const TitleLine = styled(motion.span)`
  display: block;
`;

const Description = styled(motion.p)`
  max-width: 31rem;
  font-size: 0.9rem;
  line-height: 1.58;
  color: rgba(74, 57, 44, 0.8);

  @media (max-width: 767px) {
    font-size: 0.88rem;
    line-height: 1.54;
  }
`;

const ButtonRow = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  gap: 0.66rem;
`;

const BaseButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 2.85rem;
  padding: 0.78rem 1.18rem;
  border-radius: 999px;
  font-size: 0.88rem;
  font-weight: 700;
  transition:
    transform 0.2s ease,
    background-color 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease,
    box-shadow 0.2s ease;

  &:hover,
  &:focus-visible {
    transform: translateY(-1px);
    outline: none;
  }
`;

const PrimaryButton = styled(BaseButton)`
  background: rgba(58, 44, 35, 0.96);
  color: #fff8f1;
  box-shadow: 0 10px 22px rgba(83, 62, 46, 0.14);

  &:hover,
  &:focus-visible {
    background: rgba(44, 33, 27, 0.98);
  }
`;

const SecondaryButton = styled(BaseButton)`
  border: 1px solid rgba(148, 120, 95, 0.2);
  background: rgba(255, 253, 249, 0.42);
  color: #5f4939;

  &:hover,
  &:focus-visible {
    border-color: rgba(148, 120, 95, 0.3);
    background: rgba(255, 255, 255, 0.6);
  }
`;

const splitHeadline = (title: string) => {
  const commaChunks = title
    .split(/,\s*/)
    .map((chunk) => chunk.trim())
    .filter(Boolean);

  if (commaChunks.length > 1) {
    return commaChunks;
  }

  const words = title.split(' ');
  const lines: string[] = [];
  let current = '';

  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length > 17 && current) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  }

  if (current) {
    lines.push(current);
  }

  return lines;
};

export const HeroContentSlider = ({
  slides,
  activeSlide,
  direction,
  reducedMotion,
}: HeroContentSliderProps) => {
  const slide = slides[activeSlide];
  const lines = splitHeadline(slide.title);
  const primaryLabel = slide.primaryCtaLabel.trim() || 'Termin buchen';
  const secondaryLabel = slide.secondaryCtaLabel.trim() || 'Studio entdecken';

  return (
    <Panel>
      <PanelInner>
        <AnimatePresence custom={direction} mode="wait">
          <MotionBlock
            key={slide.id}
            custom={direction}
            initial={reducedMotion ? false : { opacity: 0, y: direction > 0 ? 14 : -14 }}
            animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: direction > 0 ? -10 : 10 }}
            transition={{ duration: reducedMotion ? 0.2 : 0.42, ease: [0.22, 1, 0.36, 1] }}
          >
            <EyebrowPill
              initial={reducedMotion ? false : { opacity: 0, x: 12 }}
              animate={reducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
              transition={{ duration: 0.28, delay: reducedMotion ? 0 : 0.04 }}
            >
              <EyebrowDot />
              {slide.eyebrow}
            </EyebrowPill>

            <Subtitle
              initial={reducedMotion ? false : { opacity: 0, y: 8 }}
              animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.26, delay: reducedMotion ? 0 : 0.08 }}
            >
              {slide.subtitle}
            </Subtitle>

            <Title>
              {lines.map((line, index) => (
                <TitleLine
                  key={`${slide.id}-${line}`}
                  initial={reducedMotion ? false : { opacity: 0, y: 14 }}
                  animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.34, delay: reducedMotion ? 0 : 0.12 + index * 0.05 }}
                >
                  {line}
                </TitleLine>
              ))}
            </Title>

            <Description
              initial={reducedMotion ? false : { opacity: 0, y: 10 }}
              animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: reducedMotion ? 0 : 0.2 }}
            >
              {slide.description}
            </Description>

            <ButtonRow
              initial={reducedMotion ? false : { opacity: 0, y: 10 }}
              animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: reducedMotion ? 0 : 0.25 }}
            >
              <PrimaryButton href={slide.primaryHref}>{primaryLabel}</PrimaryButton>
              <SecondaryButton href={slide.secondaryHref}>{secondaryLabel}</SecondaryButton>
            </ButtonRow>

            <motion.div
              initial={reducedMotion ? false : { opacity: 0, y: 10 }}
              animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.32, delay: reducedMotion ? 0 : 0.3 }}
            >
              <HeroStats stats={slide.stats} />
            </motion.div>
          </MotionBlock>
        </AnimatePresence>
      </PanelInner>
    </Panel>
  );
};
