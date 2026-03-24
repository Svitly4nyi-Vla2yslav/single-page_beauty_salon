import { motion } from 'framer-motion';
import type { Swiper as SwiperType } from 'swiper';
import { A11y, EffectFade, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import styled from 'styled-components';
import type { HeroSlide } from './types';

type HeroMediaSliderProps = {
  slides: HeroSlide[];
  activeSlide: number;
  reducedMotion: boolean;
  onActiveSlideChange: (index: number) => void;
  onSwiperReady: (swiper: SwiperType) => void;
};

type MediaImageProps = {
  $desktopOnly?: boolean;
  $mobileOnly?: boolean;
  $position: string;
};

const getObjectPosition = (token: string) =>
  token.replace(/^object-\[/, '').replace(/\]$/, '').replace(/_/g, ' ');

const getOverlayGradient = (ambient: string) => {
  switch (ambient) {
    case 'champagne-studio':
      return `
        linear-gradient(90deg, rgba(255, 250, 243, 0.82) 0%, rgba(255, 247, 238, 0.36) 30%, rgba(255, 244, 236, 0.12) 58%, rgba(255, 248, 242, 0.34) 100%),
        linear-gradient(180deg, rgba(255, 255, 255, 0.12) 0%, rgba(248, 238, 231, 0.06) 100%)
      `;
    case 'ivory-portrait':
      return `
        linear-gradient(90deg, rgba(255, 251, 246, 0.78) 0%, rgba(255, 244, 239, 0.3) 34%, rgba(255, 238, 235, 0.08) 58%, rgba(255, 247, 244, 0.28) 100%),
        linear-gradient(180deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 246, 241, 0.04) 100%)
      `;
    case 'linen-editorial':
      return `
        linear-gradient(90deg, rgba(254, 251, 246, 0.76) 0%, rgba(248, 242, 239, 0.26) 33%, rgba(239, 245, 255, 0.08) 58%, rgba(254, 250, 245, 0.3) 100%),
        linear-gradient(180deg, rgba(255, 255, 255, 0.08) 0%, rgba(243, 238, 236, 0.03) 100%)
      `;
    default:
      return `
        linear-gradient(90deg, rgba(255, 251, 245, 0.8) 0%, rgba(248, 244, 238, 0.28) 32%, rgba(247, 241, 238, 0.08) 58%, rgba(255, 248, 243, 0.32) 100%),
        linear-gradient(180deg, rgba(255, 255, 255, 0.08) 0%, rgba(245, 240, 236, 0.04) 100%)
      `;
  }
};

const getGlowGradient = (glow: string) => {
  switch (glow) {
    case 'gold-soft-blue':
      return `
        radial-gradient(circle at 18% 24%, rgba(240, 208, 144, 0.22), transparent 22%),
        radial-gradient(circle at 72% 32%, rgba(165, 198, 255, 0.16), transparent 24%),
        radial-gradient(circle at 58% 78%, rgba(227, 176, 160, 0.14), transparent 22%)
      `;
    case 'rose-champagne':
      return `
        radial-gradient(circle at 20% 26%, rgba(242, 216, 173, 0.22), transparent 22%),
        radial-gradient(circle at 76% 36%, rgba(234, 170, 176, 0.14), transparent 24%),
        radial-gradient(circle at 62% 76%, rgba(169, 198, 243, 0.12), transparent 22%)
      `;
    case 'blue-rose-air':
      return `
        radial-gradient(circle at 18% 28%, rgba(242, 219, 173, 0.2), transparent 22%),
        radial-gradient(circle at 76% 34%, rgba(168, 199, 255, 0.18), transparent 24%),
        radial-gradient(circle at 64% 78%, rgba(225, 167, 174, 0.14), transparent 22%)
      `;
    default:
      return `
        radial-gradient(circle at 18% 28%, rgba(243, 220, 175, 0.18), transparent 22%),
        radial-gradient(circle at 78% 34%, rgba(196, 214, 245, 0.14), transparent 24%),
        radial-gradient(circle at 62% 80%, rgba(234, 192, 183, 0.12), transparent 22%)
      `;
  }
};

const MediaStage = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
`;

const MediaSwiper = styled(Swiper)`
  width: 100%;
  height: 100%;

  .swiper-pagination {
    left: clamp(1rem, 3vw, 2.2rem);
    bottom: clamp(1rem, 2.8vw, 2rem);
    width: auto;
    display: inline-flex;
    gap: 0.42rem;
    padding: 0.45rem 0.6rem;
    border: 1px solid rgba(119, 96, 75, 0.12);
    border-radius: 999px;
    background: rgba(255, 251, 245, 0.72);
    backdrop-filter: blur(12px);
    box-shadow: 0 12px 30px rgba(110, 94, 83, 0.1);
  }

  .swiper-pagination-bullet {
    width: 0.48rem;
    height: 0.48rem;
    margin: 0;
    background: rgba(85, 63, 47, 0.22);
    opacity: 1;
  }

  .swiper-pagination-bullet-active {
    background: #b88f42;
    box-shadow: 0 0 0 4px rgba(212, 175, 55, 0.16);
  }

  &.swiper-fade .swiper-slide {
    pointer-events: none;
  }

  &.swiper-fade .swiper-slide-active {
    pointer-events: auto;
  }

  @media (max-width: 767px) {
    .swiper-pagination {
      left: 0.9rem;
      bottom: auto;
      top: calc(100dvh - 5.2rem);
      transform: translateY(-100%);
    }
  }
`;

const MediaSlide = styled(SwiperSlide)`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #f8f2ec;
`;

const MediaImage = styled(motion.img)<MediaImageProps>`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: ${({ $position }) => getObjectPosition($position)};
  filter: brightness(1.02) saturate(1.03) contrast(1.01);
  transform-origin: center;
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

const LightWash = styled.div<{ $ambient: string }>`
  position: absolute;
  inset: 0;
  background: ${({ $ambient }) => getOverlayGradient($ambient)};
`;

const GlowLayer = styled(motion.div)<{ $glow: string }>`
  position: absolute;
  inset: -2%;
  background: ${({ $glow }) => getGlowGradient($glow)};
  mix-blend-mode: screen;
  opacity: 0.92;
`;

const TopShade = styled.div`
  position: absolute;
  inset: 0 0 auto;
  height: clamp(7rem, 16vw, 10rem);
  background: linear-gradient(180deg, rgba(255, 251, 245, 0.5), rgba(255, 251, 245, 0.08), transparent);
`;

const BottomShade = styled.div`
  position: absolute;
  inset: auto 0 0;
  height: min(22dvh, 12rem);
  background: linear-gradient(180deg, transparent, rgba(247, 240, 234, 0.16), rgba(246, 238, 232, 0.34));
`;

const DetailBadge = styled(motion.div)`
  position: absolute;
  top: clamp(6.8rem, 9vw, 8rem);
  left: clamp(1.1rem, 4vw, 3.4rem);
  z-index: 2;
  display: none;
  gap: 0.16rem;
  width: fit-content;
  padding: 0.95rem 1.15rem;
  border: 1px solid rgba(255, 255, 255, 0.42);
  border-radius: 1.45rem;
  background: rgba(255, 251, 245, 0.56);
  box-shadow: 0 14px 38px rgba(126, 106, 89, 0.1);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);

  @media (min-width: 768px) {
    display: grid;
  }
`;

const DetailLabel = styled.p`
  font-size: 0.58rem;
  font-weight: 700;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: rgba(117, 92, 70, 0.7);
`;

const DetailValue = styled.p`
  margin-top: 0.34rem;
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(1.7rem, 2.35vw, 2.65rem);
  line-height: 0.95;
  color: #473327;
`;

export const HeroMediaSlider = ({
  slides,
  activeSlide,
  reducedMotion,
  onActiveSlideChange,
  onSwiperReady,
}: HeroMediaSliderProps) => (
  <MediaStage>
    <MediaSwiper
      modules={[A11y, EffectFade, Navigation, Pagination]}
      effect="fade"
      fadeEffect={{ crossFade: true }}
      speed={reducedMotion ? 0 : 980}
      loop={slides.length > 1}
      allowTouchMove={slides.length > 1}
      grabCursor={slides.length > 1}
      pagination={{ clickable: true }}
      navigation={false}
      onSwiper={(swiper) => {
        onSwiperReady(swiper);
      }}
      onSlideChange={(swiper) => {
        onActiveSlideChange(swiper.realIndex);
      }}
    >
      {slides.map((slide, index) => {
        const imageMotion = reducedMotion
          ? undefined
          : index === activeSlide
            ? { scale: 1.018, x: 0, y: -4 }
            : { scale: 1.055, x: 10, y: 3 };

        return (
          <MediaSlide key={slide.id}>
            <MediaImage
              src={slide.image}
              alt={slide.title}
              $position={slide.imagePosition}
              $desktopOnly
              loading={index === 0 ? 'eager' : 'lazy'}
              initial={false}
              animate={imageMotion}
              transition={{ duration: reducedMotion ? 0 : 5.6, ease: 'easeOut' }}
            />

            <MediaImage
              src={slide.mobileImage}
              alt={slide.title}
              $position={slide.mobileImagePosition}
              $mobileOnly
              loading={index === 0 ? 'eager' : 'lazy'}
              initial={false}
              animate={imageMotion}
              transition={{ duration: reducedMotion ? 0 : 5.6, ease: 'easeOut' }}
            />

            <LightWash $ambient={slide.ambientClass} />
            <GlowLayer
              $glow={slide.glowClass}
              animate={reducedMotion ? undefined : { scale: index === activeSlide ? [1, 1.02, 1] : 1 }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            />
            <TopShade />
            <BottomShade />

            <DetailBadge
              initial={reducedMotion ? false : { opacity: 0, y: 12 }}
              animate={reducedMotion ? { opacity: 1 } : { opacity: index === activeSlide ? 1 : 0.5, y: 0 }}
              transition={{ duration: 0.45 }}
            >
              <DetailLabel>{slide.detailLabel}</DetailLabel>
              <DetailValue>{slide.detailValue}</DetailValue>
            </DetailBadge>
          </MediaSlide>
        );
      })}
    </MediaSwiper>
  </MediaStage>
);
