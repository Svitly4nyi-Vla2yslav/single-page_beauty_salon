import { useEffect, useRef, useState, type ImgHTMLAttributes } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import styled, { keyframes } from 'styled-components';
import type { HeroSlide } from './types';

type HeroMediaSliderProps = {
  slides: HeroSlide[];
  activeSlide: number;
  direction: 1 | -1;
  reducedMotion: boolean;
  onActiveSlideChange: (index: number) => void;
};


type MediaAssetProps = {
  $desktopOnly?: boolean;
  $mobileOnly?: boolean;
  $position: string;
  $isReady?: boolean;
  $isPreview?: boolean;
  $fetchPriority?: 'high' | 'auto';
};

type GlowLayerProps = {
  $glow: string;
};

type TransitionProfile = {
  enterX: string;
  enterY: string;
  exitX: string;
  exitY: string;
  tilt: number;
  origin: string;
};

const AUTOPLAY_DELAY = 6200;
const SLIDE_DURATION = 1.2;
const IMAGE_MOTION_DURATION = 3.2;
const VEIL_DURATION = 1900;

const transitionProfiles: TransitionProfile[] = [
  {
    enterX: '-26%',
    enterY: '-18%',
    exitX: '18%',
    exitY: '16%',
    tilt: -3.6,
    origin: '50% 50%',
  },
  {
    enterX: '28%',
    enterY: '-10%',
    exitX: '-18%',
    exitY: '14%',
    tilt: 3.2,
    origin: '50% 50%',
  },
  {
    enterX: '0%',
    enterY: '24%',
    exitX: '0%',
    exitY: '-18%',
    tilt: -2.4,
    origin: '50% 50%',
  },
  {
    enterX: '-30%',
    enterY: '0%',
    exitX: '22%',
    exitY: '0%',
    tilt: 2.8,
    origin: '50% 50%',
  },
];

const getObjectPosition = (token: string) =>
  token.replace(/^object-\[/, '').replace(/\]$/, '').replace(/_/g, ' ');

const getGlowGradient = (glow: string) => {
  switch (glow) {
    case 'gold-soft-blue':
      return `
        radial-gradient(circle at 18% 24%, rgba(240, 208, 144, 0.16), transparent 24%),
        radial-gradient(circle at 72% 32%, rgba(165, 198, 255, 0.12), transparent 26%),
        radial-gradient(circle at 58% 78%, rgba(227, 176, 160, 0.08), transparent 24%)
      `;
    case 'rose-champagne':
      return `
        radial-gradient(circle at 20% 26%, rgba(242, 216, 173, 0.16), transparent 24%),
        radial-gradient(circle at 76% 36%, rgba(234, 170, 176, 0.1), transparent 26%),
        radial-gradient(circle at 62% 76%, rgba(169, 198, 243, 0.08), transparent 24%)
      `;
    case 'blue-rose-air':
      return `
        radial-gradient(circle at 18% 28%, rgba(242, 219, 173, 0.14), transparent 24%),
        radial-gradient(circle at 76% 34%, rgba(168, 199, 255, 0.14), transparent 26%),
        radial-gradient(circle at 64% 78%, rgba(225, 167, 174, 0.08), transparent 24%)
      `;
    default:
      return `
        radial-gradient(circle at 18% 28%, rgba(243, 220, 175, 0.12), transparent 24%),
        radial-gradient(circle at 78% 34%, rgba(196, 214, 245, 0.1), transparent 26%),
        radial-gradient(circle at 62% 80%, rgba(234, 192, 183, 0.08), transparent 24%)
      `;
  }
};

const veilReveal = keyframes`
  0% {
    opacity: 0.34;
    transform: translate3d(1.5%, 0, 0) scale(1.03);
  }

  38% {
    opacity: 0.16;
    transform: translate3d(0.5%, 0, 0) scale(1.015);
  }

  100% {
    opacity: 0;
    transform: translate3d(0, 0, 0) scale(1);
  }
`;

const MediaStage = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
  background: #f8f2ec;
`;

const SlideStack = styled.div`
  position: absolute;
  inset: 0;
`;

const MotionSlide = styled(motion.div)`
  position: absolute;
  inset: 0;
  pointer-events: none;
  will-change: transform, opacity;
`;

const MotionMediaFrame = styled(motion.div)`
  position: absolute;
  inset: -3%;
  will-change: transform, clip-path, opacity;
`;

const BaseMediaAsset = ({
  $desktopOnly,
  $mobileOnly,
  $position,
  $isReady,
  $isPreview,
  $fetchPriority,
  ...props
}: MediaAssetProps & ImgHTMLAttributes<HTMLImageElement>) => {
  const priorityProps = $fetchPriority
    ? ({ fetchpriority: $fetchPriority } as Record<string, 'high' | 'auto'>)
    : undefined;

  return <img {...props} {...priorityProps} />;
};

const MediaAsset = styled(BaseMediaAsset)<MediaAssetProps>`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: ${({ $position }) => getObjectPosition($position)};
  backface-visibility: hidden;
  transform-origin: center;
  will-change: transform, filter;
  filter: ${({ $isPreview, $isReady }) =>
    $isPreview
      ? 'blur(26px) saturate(1.08) brightness(1.04)'
      : $isReady
        ? 'brightness(1.01) saturate(1.03) contrast(1.01)'
        : 'blur(12px) saturate(1.02) brightness(1.02)'};
  opacity: ${({ $isPreview, $isReady }) => {
    if ($isPreview) return $isReady ? 0 : 1;
    return $isReady ? 1 : 0;
  }};
  transform: ${({ $isPreview, $isReady }) =>
    $isPreview && !$isReady ? 'scale(1.08)' : 'scale(1)'};
  transition:
    opacity 0.42s cubic-bezier(0.22, 1, 0.36, 1),
    filter 0.52s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.62s cubic-bezier(0.22, 1, 0.36, 1);

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

const LoadingVeil = styled.div<{ $visible: boolean }>`
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transition: opacity 0.42s cubic-bezier(0.22, 1, 0.36, 1);
  background:
    radial-gradient(circle at 22% 24%, rgba(255, 248, 241, 0.2), transparent 24%),
    radial-gradient(circle at 78% 26%, rgba(189, 214, 255, 0.14), transparent 28%),
    linear-gradient(180deg, rgba(248, 242, 236, 0.08) 0%, rgba(248, 242, 236, 0.38) 100%);
  backdrop-filter: blur(8px);
`;

const GlowLayer = styled.div<GlowLayerProps>`
  position: absolute;
  inset: 0;
  background: ${({ $glow }) => getGlowGradient($glow)};
  mix-blend-mode: screen;
  opacity: 0.14;
  transform: scale(1.02);
`;

const ActiveVeil = styled.div`
  position: absolute;
  inset: -2%;
  pointer-events: none;
  background:
    linear-gradient(
      108deg,
      rgba(255, 248, 241, 0.34) 0%,
      rgba(255, 250, 244, 0.18) 24%,
      rgba(255, 255, 255, 0.04) 48%,
      rgba(255, 245, 235, 0.12) 100%
    ),
    radial-gradient(
      circle at 18% 20%,
      rgba(255, 248, 240, 0.3) 0%,
      rgba(255, 248, 240, 0.12) 18%,
      transparent 38%
    ),
    radial-gradient(
      circle at 78% 28%,
      rgba(189, 214, 255, 0.14) 0%,
      transparent 34%
    );
  filter: blur(2px);
  animation: ${veilReveal} ${VEIL_DURATION}ms cubic-bezier(0.22, 1, 0.36, 1) both;
`;

const BottomShade = styled.div`
  position: absolute;
  inset: auto 0 0;
  height: min(28dvh, 15rem);
  background: linear-gradient(
    180deg,
    rgba(8, 8, 8, 0) 0%,
    rgba(8, 8, 8, 0.12) 42%,
    rgba(8, 8, 8, 0.42) 100%
  );
  pointer-events: none;
`;

export const HeroMediaSlider = ({
  slides,
  activeSlide,
  direction,
  reducedMotion,
  onActiveSlideChange,
}: HeroMediaSliderProps) => {
  const timeoutRef = useRef<number | null>(null);
  const [loadedAssets, setLoadedAssets] = useState<Record<string, boolean>>({});
  const currentSlide = slides[activeSlide] ?? slides[0];
  const baseProfile = transitionProfiles[activeSlide % transitionProfiles.length];
  const transitionProfile =
    direction > 0
      ? baseProfile
      : {
        ...baseProfile,
        enterX: baseProfile.exitX,
        enterY: baseProfile.exitY,
        exitX: baseProfile.enterX,
        exitY: baseProfile.enterY,
        tilt: baseProfile.tilt * -1,
      };
  const isDesktopAssetReady = currentSlide ? Boolean(loadedAssets[currentSlide.image]) : false;
  const isMobileAssetReady = currentSlide ? Boolean(loadedAssets[currentSlide.mobileImage]) : false;

  const markAssetAsLoaded = (src: string) => {
    setLoadedAssets((current) => (current[src] ? current : { ...current, [src]: true }));
  };

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
  }, [activeSlide, slides.length, onActiveSlideChange]);

  useEffect(() => {
    if (slides.length === 0 || typeof window === 'undefined') {
      return;
    }

    const queueIndexes = [
      activeSlide,
      (activeSlide + 1) % slides.length,
      (activeSlide + 2) % slides.length,
      (activeSlide - 1 + slides.length) % slides.length,
    ];

    const uniqueSources = Array.from(
      new Set(
        queueIndexes.flatMap((index) => {
          const slide = slides[index];
          return slide ? [slide.image, slide.mobileImage] : [];
        }),
      ),
    );

    const preloaders: HTMLImageElement[] = [];
    const startPreload = window.setTimeout(() => {
      uniqueSources.forEach((src) => {
        if (!src || loadedAssets[src]) {
          return;
        }

        const image = new Image();
        image.decoding = 'async';

        image.onload = () => markAssetAsLoaded(src);
        image.onerror = () => undefined;
        image.src = src;

        if (image.complete) {
          markAssetAsLoaded(src);
        }

        preloaders.push(image);
      });
    }, activeSlide === 0 ? 0 : 180);

    return () => {
      window.clearTimeout(startPreload);
      preloaders.forEach((image) => {
        image.onload = null;
        image.onerror = null;
      });
    };
  }, [activeSlide, loadedAssets, slides]);

  if (!currentSlide) {
    return null;
  }

  return (
    <MediaStage>
      <SlideStack aria-hidden="true">
        <AnimatePresence initial={false} mode="sync">
          <MotionSlide
            key={currentSlide.id}
            initial={
              reducedMotion
                ? { opacity: 1 }
                : {
                  opacity: 1,
                  x: transitionProfile.enterX,
                  y: transitionProfile.enterY,
                  rotate: transitionProfile.tilt,
                  scale: 0.94,
                }
            }
            animate={
              reducedMotion
                ? { opacity: 1 }
                : {
                  opacity: 1,
                  x: '0%',
                  y: '0%',
                  rotate: 0,
                  scale: 1,
                }
            }
            exit={
              reducedMotion
                ? { opacity: 0 }
                : {
                  opacity: 1,
                  x: transitionProfile.exitX,
                  y: transitionProfile.exitY,
                  rotate: transitionProfile.tilt * -0.7,
                  scale: 1.03,
                }
            }
            transition={{
              duration: reducedMotion ? 0.18 : SLIDE_DURATION,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <MotionMediaFrame
              initial={
                reducedMotion
                  ? { opacity: 1 }
                  : {
                    opacity: 0.84,
                    scale: 0.78,
                    clipPath: 'circle(14% at 50% 50%)',
                  }
              }
              animate={
                reducedMotion
                  ? { opacity: 1 }
                  : {
                    opacity: 1,
                    scale: 1,
                    clipPath: 'circle(150% at 50% 50%)',
                  }
              }
              exit={
                reducedMotion
                  ? { opacity: 0 }
                  : {
                    opacity: 0.9,
                    scale: 1.08,
                    clipPath: 'circle(58% at 50% 50%)',
                  }
              }
              transition={{
                duration: reducedMotion ? 0.18 : IMAGE_MOTION_DURATION * 0.34,
                ease: [0.19, 1, 0.22, 1],
              }}
              style={{ transformOrigin: transitionProfile.origin }}
            >
              <MediaAsset
                src={currentSlide.image}
                alt=""
                $position={currentSlide.imagePosition}
                $desktopOnly
                $isReady={isDesktopAssetReady}
                $isPreview
                loading="eager"
                decoding="async"
                aria-hidden="true"
              />

              <MediaAsset
                src={currentSlide.image}
                alt=""
                $position={currentSlide.imagePosition}
                $desktopOnly
                $isReady={isDesktopAssetReady}
                loading="eager"
                decoding="async"
                $fetchPriority={activeSlide === 0 ? 'high' : 'auto'}
                onLoad={() => markAssetAsLoaded(currentSlide.image)}
              />

              <MediaAsset
                src={currentSlide.mobileImage}
                alt=""
                $position={currentSlide.mobileImagePosition}
                $mobileOnly
                $isReady={isMobileAssetReady}
                $isPreview
                loading="eager"
                decoding="async"
                aria-hidden="true"
              />

              <MediaAsset
                src={currentSlide.mobileImage}
                alt=""
                $position={currentSlide.mobileImagePosition}
                $mobileOnly
                $isReady={isMobileAssetReady}
                loading="eager"
                decoding="async"
                $fetchPriority={activeSlide === 0 ? 'high' : 'auto'}
                onLoad={() => markAssetAsLoaded(currentSlide.mobileImage)}
              />

              <LoadingVeil $visible={!(isDesktopAssetReady || isMobileAssetReady)} />
              <GlowLayer $glow={currentSlide.glowClass} />
            </MotionMediaFrame>

            {!reducedMotion ? (
              <ActiveVeil key={`veil-${currentSlide.id}-${activeSlide}`} />
            ) : null}
          </MotionSlide>
        </AnimatePresence>
      </SlideStack>

      <BottomShade />
    </MediaStage>
  );
};
