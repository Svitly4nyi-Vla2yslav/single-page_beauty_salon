import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import type { HeroSlide } from './types';

type HeroMediaSliderProps = {
  slides: HeroSlide[];
  activeSlide: number;
  reducedMotion: boolean;
  onActiveSlideChange: (index: number) => void;
};

type SlideVisualState = 'active' | 'previous' | 'idle';

type SlideLayerProps = {
  $state: SlideVisualState;
  $direction: 1 | -1;
  $reducedMotion: boolean;
};

type MediaAssetProps = {
  $state: SlideVisualState;
  $direction: 1 | -1;
  $desktopOnly?: boolean;
  $mobileOnly?: boolean;
  $position: string;
  $reducedMotion: boolean;
};

type GlowLayerProps = {
  $glow: string;
  $state: SlideVisualState;
  $reducedMotion: boolean;
};

const AUTOPLAY_DELAY = 5600;
const FADE_DURATION = 1600;
const IMAGE_MOTION_DURATION = 2200;

const getObjectPosition = (token: string) =>
  token.replace(/^object-\[/, '').replace(/\]$/, '').replace(/_/g, ' ');

const getGlowGradient = (glow: string) => {
  switch (glow) {
    case 'gold-soft-blue':
      return `
        radial-gradient(circle at 18% 24%, rgba(240, 208, 144, 0.18), transparent 22%),
        radial-gradient(circle at 72% 32%, rgba(165, 198, 255, 0.12), transparent 24%),
        radial-gradient(circle at 58% 78%, rgba(227, 176, 160, 0.1), transparent 22%)
      `;
    case 'rose-champagne':
      return `
        radial-gradient(circle at 20% 26%, rgba(242, 216, 173, 0.18), transparent 22%),
        radial-gradient(circle at 76% 36%, rgba(234, 170, 176, 0.1), transparent 24%),
        radial-gradient(circle at 62% 76%, rgba(169, 198, 243, 0.08), transparent 22%)
      `;
    case 'blue-rose-air':
      return `
        radial-gradient(circle at 18% 28%, rgba(242, 219, 173, 0.16), transparent 22%),
        radial-gradient(circle at 76% 34%, rgba(168, 199, 255, 0.14), transparent 24%),
        radial-gradient(circle at 64% 78%, rgba(225, 167, 174, 0.1), transparent 22%)
      `;
    default:
      return `
        radial-gradient(circle at 18% 28%, rgba(243, 220, 175, 0.14), transparent 22%),
        radial-gradient(circle at 78% 34%, rgba(196, 214, 245, 0.1), transparent 24%),
        radial-gradient(circle at 62% 80%, rgba(234, 192, 183, 0.08), transparent 22%)
      `;
  }
};

const MediaStage = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  background: #f8f2ec;
`;

const SlideStack = styled.div`
  position: absolute;
  inset: 0;
`;

const SlideLayer = styled.div<SlideLayerProps>`
  position: absolute;
  inset: 0;
  pointer-events: none;
  will-change: opacity, transform;
  z-index: ${({ $state }) => ($state === 'active' ? 2 : $state === 'previous' ? 1 : 0)};
  opacity: ${({ $state }) => ($state === 'active' ? 1 : 0)};
  transform: ${({ $state, $direction, $reducedMotion }) => {
    if ($reducedMotion) return 'translate3d(0,0,0)';
    if ($state === 'active') return 'translate3d(0,0,0)';
    if ($state === 'previous') return `translate3d(${ $direction > 0 ? '-1.4%' : '1.4%' }, 0, 0)`;
    return `translate3d(${ $direction > 0 ? '1.4%' : '-1.4%' }, 0, 0)`;
  }};
  transition:
    opacity ${({ $reducedMotion }) => ($reducedMotion ? '0ms' : `${FADE_DURATION}ms`)}
      cubic-bezier(0.22, 1, 0.36, 1),
    transform ${({ $reducedMotion }) => ($reducedMotion ? '0ms' : `${FADE_DURATION}ms`)}
      cubic-bezier(0.22, 1, 0.36, 1);
`;

const MediaAsset = styled.img<MediaAssetProps>`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: ${({ $position }) => getObjectPosition($position)};
  backface-visibility: hidden;
  transform-origin: center;
  will-change: transform, filter, opacity;
  filter: ${({ $state, $reducedMotion }) => {
    if ($reducedMotion) return 'brightness(1.02) saturate(1.03) contrast(1.01)';
    if ($state === 'active') return 'brightness(1.02) saturate(1.03) contrast(1.01)';
    if ($state === 'previous') return 'brightness(1) saturate(1.01) contrast(1)';
    return 'brightness(0.98) saturate(1) contrast(0.99)';
  }};
  transform: ${({ $state, $direction, $reducedMotion }) => {
    if ($reducedMotion) return 'translate3d(0,0,0) scale(1)';
    if ($state === 'active') return 'translate3d(0,0,0) scale(1)';
    if ($state === 'previous') {
      return `translate3d(${ $direction > 0 ? '-0.6%' : '0.6%' }, 0, 0) scale(1.02)`;
    }
    return `translate3d(0, 10px, 0) scale(1.055)`;
  }};
  transition:
    transform ${({ $reducedMotion }) => ($reducedMotion ? '0ms' : `${IMAGE_MOTION_DURATION}ms`)}
      cubic-bezier(0.22, 1, 0.36, 1),
    filter ${({ $reducedMotion }) => ($reducedMotion ? '0ms' : `${IMAGE_MOTION_DURATION}ms`)}
      cubic-bezier(0.22, 1, 0.36, 1);

  display: ${({ $mobileOnly, $desktopOnly }) => {
    if ($mobileOnly) return 'block';
    if ($desktopOnly) return 'none';
    return 'block';
  }};

  @media (min-width: 1024px) {
    display: ${({ $mobileOnly, $desktopOnly }) => {
      if ($mobileOnly) return 'none';
      if ($desktopOnly) return 'block';
      return 'block';
    }};
  }
`;

const GlowLayer = styled.div<GlowLayerProps>`
  position: absolute;
  inset: 0;
  background: ${({ $glow }) => getGlowGradient($glow)};
  mix-blend-mode: screen;
  will-change: opacity, transform;
  opacity: ${({ $state }) => ($state === 'active' ? 0.12 : $state === 'previous' ? 0.08 : 0.04)};
  transform: ${({ $state, $reducedMotion }) => {
    if ($reducedMotion) return 'scale(1)';
    if ($state === 'active') return 'scale(1)';
    if ($state === 'previous') return 'scale(1.015)';
    return 'scale(1.03)';
  }};
  transition:
    opacity ${({ $reducedMotion }) => ($reducedMotion ? '0ms' : `${FADE_DURATION}ms`)} ease,
    transform ${({ $reducedMotion }) => ($reducedMotion ? '0ms' : `${IMAGE_MOTION_DURATION}ms`)}
      cubic-bezier(0.22, 1, 0.36, 1);
`;

const BottomShade = styled.div`
  position: absolute;
  inset: auto 0 0;
  height: min(28dvh, 15rem);
  background: linear-gradient(180deg, rgba(5, 5, 5, 0) 0%, rgba(5, 5, 5, 0.18) 35%, rgba(5, 5, 5, 0.54) 100%);
  pointer-events: none;
`;

const CaptionRail = styled.div`
  position: absolute;
  inset: auto 0 0;
  z-index: 2;
  display: grid;
  justify-items: center;
  gap: 0.38rem;
  padding:
    clamp(1rem, 2vw, 1.25rem)
    clamp(1rem, 4vw, 2.4rem)
    calc(env(safe-area-inset-bottom, 0px) + clamp(1.4rem, 2.8vw, 2.1rem));
  text-align: center;
  pointer-events: none;
`;

const CaptionLabel = styled.p`
  font-size: 0.66rem;
  font-weight: 700;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: rgba(255, 241, 229, 0.76);
  text-shadow: 0 10px 28px rgba(0, 0, 0, 0.34);
`;

const CaptionText = styled.p`
  max-width: min(40rem, 90vw);
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(1.75rem, 3.3vw, 2.9rem);
  font-weight: 600;
  line-height: 0.98;
  letter-spacing: -0.03em;
  color: #fff6ee;
  text-shadow: 0 14px 36px rgba(0, 0, 0, 0.4);
  text-wrap: balance;
`;

export const HeroMediaSlider = ({
  slides,
  activeSlide,
  reducedMotion,
  onActiveSlideChange,
}: HeroMediaSliderProps) => {
  const timeoutRef = useRef<number | null>(null);
  const currentSlide = slides[activeSlide] ?? slides[0];
  const prevActiveRef = useRef(activeSlide);

  const [previousSlide, setPreviousSlide] = useState<number | null>(null);
  const [direction, setDirection] = useState<1 | -1>(1);

  useEffect(() => {
    if (slides.length <= 1) return;

    const prev = prevActiveRef.current;
    if (prev === activeSlide) return;

    const isForward = activeSlide === (prev + 1) % slides.length;
    const isBackward = activeSlide === (prev - 1 + slides.length) % slides.length;

    setDirection(isForward ? 1 : isBackward ? -1 : activeSlide > prev ? 1 : -1);
    setPreviousSlide(prev);
    prevActiveRef.current = activeSlide;

    const cleanupTimer = window.setTimeout(() => {
      setPreviousSlide(null);
    }, reducedMotion ? 0 : FADE_DURATION);

    return () => {
      window.clearTimeout(cleanupTimer);
    };
  }, [activeSlide, slides.length, reducedMotion]);

  useEffect(() => {
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (slides.length <= 1) return;

    timeoutRef.current = window.setTimeout(() => {
      onActiveSlideChange((activeSlide + 1) % slides.length);
    }, AUTOPLAY_DELAY);

    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [activeSlide, onActiveSlideChange, slides.length]);

  return (
    <MediaStage>
      <SlideStack aria-hidden="true">
        {slides.map((slide, index) => {
          const state: SlideVisualState =
            index === activeSlide ? 'active' : index === previousSlide ? 'previous' : 'idle';

          return (
            <SlideLayer
              key={slide.id}
              $state={state}
              $direction={direction}
              $reducedMotion={reducedMotion}
            >
              <MediaAsset
                src={slide.image}
                alt=""
                $state={state}
                $direction={direction}
                $position={slide.imagePosition}
                $reducedMotion={reducedMotion}
                $desktopOnly
                loading="eager"
              />

              <MediaAsset
                src={slide.mobileImage}
                alt=""
                $state={state}
                $direction={direction}
                $position={slide.mobileImagePosition}
                $mobileOnly
                $reducedMotion={reducedMotion}
                loading="eager"
              />

              <GlowLayer
                $glow={slide.glowClass}
                $state={state}
                $reducedMotion={reducedMotion}
              />
            </SlideLayer>
          );
        })}
      </SlideStack>

      <BottomShade />

      {currentSlide ? (
        <CaptionRail>
          <CaptionLabel>{currentSlide.subtitle}</CaptionLabel>
          <CaptionText>{currentSlide.mediaNote}</CaptionText>
        </CaptionRail>
      ) : null}
    </MediaStage>
  );
};
