import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { HeroContentSlider } from '../components/hero/HeroContentSlider';
import { HeroMediaSlider } from '../components/hero/HeroMediaSlider';
import type { HeroSlide, HeroStat } from '../components/hero/types';
import { heroSlides } from '../data/site';

const Section = styled.section`
  position: relative;
  isolation: isolate;
  min-height: 100dvh;
  height: 100dvh;
  overflow: hidden;
  background: linear-gradient(180deg, #fffaf5 0%, #f9f2eb 100%);
  color: #2f251e;
`;

const ContentLayer = styled.div`
  position: absolute;
  inset: 0;
  z-index: 3;
  width: min(100%, 84rem);
  margin-inline: auto;
  padding-inline: clamp(1rem, 3.5vw, 2.7rem);
  padding-top: calc(env(safe-area-inset-top, 0px) + clamp(7.6rem, 10vw, 9.1rem));
  padding-bottom: clamp(7.8rem, 12vw, 9.4rem);
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  pointer-events: none;

  @media (min-width: 1024px) {
    justify-content: flex-end;
  }
`;

const ContentColumn = styled.div`
  display: contents;
  pointer-events: auto;
`;

/**
 * Визначає напрям анімації між індексами, окремо враховуючи циклічний перехід через межу.
 *
 * @param previous — індекс поточного слайда.
 * @param next — індекс наступного слайда.
 * @param total — загальна кількість слайдів.
 * @returns 1 для руху вперед або -1 для руху назад.
 */
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

/**
 * Розділяє локалізований показник на перше слово-значення та решту тексту-мітку.
 *
 * @param id — стабільний ідентифікатор показника.
 * @param statText — локалізований рядок показника.
 * @returns Нормалізований HeroStat; нероздільний текст використовується і як значення, і як мітка.
 */
const buildStat = (id: string, statText: string): HeroStat => {
  const [value, ...rest] = statText.trim().split(/\s+/);
  return {
    id,
    value,
    label: rest.join(' ') || statText,
  };
};

/**
 * Координує локалізовані дані, активний індекс і напрям hero-слайдера.
 * Параметр motion=off вимикає складні анімації; зовнішніх запитів компонент не виконує.
 *
 * @returns Повноекранну hero-секцію з медіаслайдером.
 */
export const HeroSection = () => {
  const { t } = useTranslation();
  const [activeSlide, setActiveSlide] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const reducedMotion = useMemo(() => {
    if (typeof window === 'undefined') {
      return false;
    }

    return new URLSearchParams(window.location.search).get('motion') === 'off';
  }, []);

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

  /**
   * Оновлює напрям анімації відносно попереднього індексу та активує вибраний слайд.
   *
   * @param nextIndex — індекс слайда, який потрібно показати.
   * @returns Нічого не повертає.
   */
  const handleActiveSlideChange = useCallback(
    (nextIndex: number) => {
      setDirection((current) => getDirection(activeSlide, nextIndex, slides.length) || current);
      setActiveSlide(nextIndex);
    },
    [activeSlide, slides.length],
  );

  return (
    <Section id="hero">
      <HeroMediaSlider
        slides={slides}
        activeSlide={activeSlide}
        direction={direction}
        reducedMotion={reducedMotion}
        onActiveSlideChange={handleActiveSlideChange}
      />

      {/* <ContentLayer>
        <ContentColumn>
          <HeroContentSlider
            slides={slides}
            activeSlide={activeSlide}
            direction={direction}
            reducedMotion={reducedMotion}
          />
        </ContentColumn>
      </ContentLayer> */}
    </Section>
  );
};
