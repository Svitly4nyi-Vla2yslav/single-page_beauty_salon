import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import type { HeroSlide } from './types';

type HeroMediaSliderProps = {
  slides: HeroSlide[];
  activeSlide: number;
  reducedMotion: boolean;
  onActiveSlideChange: (index: number) => void;
};

type SlideLayerProps = {
  $active: boolean;
  $reducedMotion: boolean;
};

type MediaAssetProps = {
  $active: boolean;
  $desktopOnly?: boolean;
  $mobileOnly?: boolean;
  $position: string;
  $reducedMotion: boolean;
};

const AUTOPLAY_DELAY = 5600;
const FADE_DURATION = 1800;

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
  opacity: ${({ $active }) => ($active ? 1 : 0)};
  transition: opacity ${({ $reducedMotion }) => ($reducedMotion ? '0ms' : `${FADE_DURATION}ms`)}
    cubic-bezier(0.22, 1, 0.36, 1);
  pointer-events: none;
  will-change: opacity;
`;

const MediaAsset = styled.img<MediaAssetProps>`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: ${({ $position }) => getObjectPosition($position)};
  filter: brightness(1.02) saturate(1.03) contrast(1.01);
  transform: ${({ $active, $reducedMotion }) =>
    $reducedMotion ? 'translate3d(0, 0, 0) scale(1)' : $active ? 'translate3d(0, 0, 0) scale(1)' : 'translate3d(0, 10px, 0) scale(1.035)'};
  transition:
    transform ${({ $reducedMotion }) => ($reducedMotion ? '0ms' : '2600ms')}
      cubic-bezier(0.22, 1, 0.36, 1),
    filter ${({ $reducedMotion }) => ($reducedMotion ? '0ms' : '2600ms')}
      cubic-bezier(0.22, 1, 0.36, 1);
  will-change: transform;
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

const GlowLayer = styled.div<{ $glow: string }>`
  position: absolute;
  inset: 0;
  background: ${({ $glow }) => getGlowGradient($glow)};
  mix-blend-mode: screen;
  opacity: 0.12;
`;

const BottomShade = styled.div`
  position: absolute;
  inset: auto 0 0;
  height: min(28dvh, 15rem);
  background: linear-gradient(180deg, rgba(5, 5, 5, 0) 0%, rgba(5, 5, 5, 0.18) 35%, rgba(5, 5, 5, 0.54) 100%);
  pointer-events: none;
`;

export const HeroMediaSlider = ({
  slides,
  activeSlide,
  reducedMotion,
  onActiveSlideChange,
}: HeroMediaSliderProps) => {
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (slides.length <= 1) {
      return;
    }

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
        {slides.map((slide, index) => (
          <SlideLayer
            key={slide.id}
            $active={index === activeSlide}
            $reducedMotion={reducedMotion}
          >
            <MediaAsset
              src={slide.image}
              alt=""
              $active={index === activeSlide}
              $position={slide.imagePosition}
              $reducedMotion={reducedMotion}
              $desktopOnly
              loading="eager"
            />

            <MediaAsset
              src={slide.mobileImage}
              alt=""
              $active={index === activeSlide}
              $position={slide.mobileImagePosition}
              $mobileOnly
              $reducedMotion={reducedMotion}
              loading="eager"
            />

            <GlowLayer $glow={slide.glowClass} />
          </SlideLayer>
        ))}
      </SlideStack>

      <BottomShade />
    </MediaStage>
  );
};
