import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { Swiper as SwiperType } from 'swiper';
import styled from 'styled-components';
import { HeroContentSlider } from '../components/hero/HeroContentSlider';
import { HeroMediaSlider } from '../components/hero/HeroMediaSlider';
import type { HeroSlide, HeroStat } from '../components/hero/types';
import { heroSlides } from '../data/site';
import { useReducedMotionPreference } from '../hooks/useReducedMotionPreference';

type HeroAutoplayController = SwiperType & {
  autoplay?: {
    start?: () => void;
    stop?: () => void;
    pause?: () => void;
    resume?: () => void;
    running?: boolean;
  };
};

const Section = styled.section`
  position: relative;
  isolation: isolate;
  min-height: 100dvh;
  height: 100dvh;
  overflow: hidden;
  background: linear-gradient(180deg, #fffaf5 0%, #f9f2eb 100%);
  color: #2f251e;
`;

const TopVeil = styled.div`
  pointer-events: none;
  position: absolute;
  inset: 0 0 auto;
  z-index: 2;
  height: clamp(6.6rem, 14vw, 9rem);
  background: linear-gradient(180deg, rgba(255, 250, 245, 0.76), rgba(255, 250, 245, 0.14), transparent);
`;

const Overlay = styled.div`
  position: relative;
  z-index: 3;
  display: grid;
  height: 100%;
  width: min(100%, 84rem);
  margin: 0 auto;
  padding:
    clamp(5.3rem, 7.8vw, 6.9rem)
    clamp(1rem, 3.5vw, 2.7rem)
    clamp(0.9rem, 2.4vw, 1.8rem);
  align-items: end;

  @media (min-width: 1024px) {
    grid-template-columns: minmax(0, 1.2fr) minmax(21rem, 34rem);
    align-items: center;
  }
`;

const Spacer = styled.div`
  display: none;

  @media (min-width: 1024px) {
    display: block;
    min-height: 0;
  }
`;

const ContentColumn = styled.div`
  display: flex;
  align-items: end;
  min-height: 0;

  @media (min-width: 1024px) {
    justify-content: end;
    align-items: center;
    grid-column: 2;
  }
`;

const getDirection = (previous: number, next: number, total: number): 1 | -1 => {
  if (previous === next) {
    return 1;
  }

  if (previous === total - 1 && next === 0) {
    return 1;
  }

  if (previous === 0 && next === total - 1) {
    return -1;
  }

  return next > previous ? 1 : -1;
};

const buildStat = (id: string, statText: string): HeroStat => {
  const [value, ...rest] = statText.trim().split(/\s+/);
  return {
    id,
    value,
    label: rest.join(' ') || statText,
  };
};

export const HeroSection = () => {
  const { t } = useTranslation();
  const reducedMotion = useReducedMotionPreference();
  const mediaSwiperRef = useRef<HeroAutoplayController | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(reducedMotion);

  const slides = useMemo<HeroSlide[]>(
    () =>
      heroSlides.map((slide) => ({
        id: slide.id,
        eyebrow: t('hero.eyebrow'),
        subtitle: t(slide.labelKey),
        title: t(`hero.slides.${slide.id}.title`),
        description: t(`hero.slides.${slide.id}.description`),
        primaryCtaLabel: t(`hero.slides.${slide.id}.primary`),
        primaryHref: slide.primaryHref,
        secondaryCtaLabel: t(`hero.slides.${slide.id}.secondary`),
        secondaryHref: slide.secondaryHref,
        stats: [
          buildStat('clients', t('hero.stats.clients')),
          buildStat('rating', t('hero.stats.rating')),
          buildStat('quality', t('hero.stats.quality')),
        ],
        image: slide.image,
        mobileImage: slide.mobileImage,
        imagePosition: slide.imagePosition,
        mobileImagePosition: slide.mobileImagePosition,
        ambientClass: slide.ambientClass,
        glowClass: slide.glowClass,
        detailLabel: slide.detailLabel,
        detailValue: slide.detailValue,
        mediaNote: slide.mediaNote,
      })),
    [t],
  );

  useEffect(() => {
    if (reducedMotion) {
      setIsPaused(true);
      setProgress(0);
      mediaSwiperRef.current?.autoplay?.stop?.();
      return;
    }

    setIsPaused(false);
  }, [reducedMotion]);

  useEffect(() => {
    if (slides.length <= 1 || reducedMotion) {
      return;
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        mediaSwiperRef.current?.autoplay?.resume?.();
        mediaSwiperRef.current?.autoplay?.start?.();
        setIsPaused(false);
      } else {
        mediaSwiperRef.current?.autoplay?.pause?.();
        setIsPaused(true);
      }
    };

    const handleResize = () => {
      mediaSwiperRef.current?.update?.();
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('resize', handleResize);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('resize', handleResize);
    };
  }, [reducedMotion, slides.length]);

  const handleProgressChange = (nextProgress: number) => {
    setProgress((current) => {
      const rounded = Math.round(nextProgress * 100) / 100;
      return Math.abs(current - rounded) >= 0.02 ? rounded : current;
    });
  };

  const restartAutoplay = () => {
    if (reducedMotion || slides.length <= 1) {
      return;
    }

    mediaSwiperRef.current?.autoplay?.resume?.();
    mediaSwiperRef.current?.autoplay?.start?.();
    setIsPaused(false);
  };

  const handleActiveSlideChange = (nextIndex: number) => {
    setDirection((current) => getDirection(activeSlide, nextIndex, slides.length) || current);
    setActiveSlide(nextIndex);
  };

  const handlePrev = () => {
    mediaSwiperRef.current?.slidePrev();
    restartAutoplay();
  };

  const handleNext = () => {
    mediaSwiperRef.current?.slideNext();
    restartAutoplay();
  };

  const handleSelect = (index: number) => {
    mediaSwiperRef.current?.slideToLoop(index);
    restartAutoplay();
  };

  return (
    <Section id="hero">
      <HeroMediaSlider
        slides={slides}
        activeSlide={activeSlide}
        reducedMotion={reducedMotion}
        onActiveSlideChange={handleActiveSlideChange}
        onSwiperReady={(swiper) => {
          mediaSwiperRef.current = swiper as HeroAutoplayController;
        }}
      />
      <TopVeil />

      <Overlay>
        <Spacer />
        <ContentColumn>
          <HeroContentSlider
            slides={slides}
            activeSlide={activeSlide}
            direction={direction}
            progress={progress}
            reducedMotion={reducedMotion}
            isPaused={isPaused}
            onPrev={handlePrev}
            onNext={handleNext}
            onSelect={handleSelect}
          />
        </ContentColumn>
      </Overlay>
    </Section>
  );
};
