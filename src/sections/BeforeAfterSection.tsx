import { useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Lightbox } from '../components/Lightbox';
import { SectionHeading } from '../components/SectionHeading';
import { galleryFilters, galleryItems } from '../data/site';
import { useScrollReveal } from '../hooks/useScrollReveal';
import afterLashesImage from '../assets/image/AFTER.png';
import beforeLashesImage from '../assets/image/BEFORE.png';
import transformationPortraitImage from '../assets/image/brows_lashes_transformation.png';
import luxuryStudioImage from '../assets/image/luxury_treatmen_tstudio_atmosphere.png';
import skinCareImage from '../assets/image/skin_treatment_calm_premium_care.png';

type ImageSpec = {
  src: string;
  position?: string;
};

type GalleryMediaConfig = {
  mdSpan: number;
  lgSpan: number;
  card: ImageSpec;
  before: ImageSpec;
  after: ImageSpec;
};

const galleryImageMap: Record<string, GalleryMediaConfig> = {
  airLashes: {
    mdSpan: 4,
    lgSpan: 4,
    card: { src: transformationPortraitImage, position: 'center 28%' },
    before: { src: beforeLashesImage, position: 'center center' },
    after: { src: afterLashesImage, position: 'center center' },
  },
  softBrows: {
    mdSpan: 2,
    lgSpan: 2,
    card: { src: beforeLashesImage, position: 'center 38%' },
    before: { src: beforeLashesImage, position: 'center 40%' },
    after: { src: transformationPortraitImage, position: 'center 30%' },
  },
  glassSkin: {
    mdSpan: 3,
    lgSpan: 3,
    card: { src: skinCareImage, position: 'center 42%' },
    before: { src: luxuryStudioImage, position: 'center 45%' },
    after: { src: skinCareImage, position: 'center 42%' },
  },
  lipBlush: {
    mdSpan: 3,
    lgSpan: 3,
    card: { src: afterLashesImage, position: 'center 30%' },
    before: { src: luxuryStudioImage, position: 'center 48%' },
    after: { src: afterLashesImage, position: 'center 30%' },
  },
  bridalGlow: {
    mdSpan: 4,
    lgSpan: 4,
    card: { src: luxuryStudioImage, position: 'center 42%' },
    before: { src: luxuryStudioImage, position: 'center 46%' },
    after: { src: afterLashesImage, position: 'center 34%' },
  },
  browLift: {
    mdSpan: 2,
    lgSpan: 2,
    card: { src: transformationPortraitImage, position: 'center 40%' },
    before: { src: beforeLashesImage, position: 'center 42%' },
    after: { src: transformationPortraitImage, position: 'center 30%' },
  },
};

const Section = styled.section`
  position: relative;
  isolation: isolate;
  padding: 6rem 1rem;

  &::after {
    content: '';
    position: absolute;
    inset: auto -15% -12rem;
    height: 14rem;
    background: radial-gradient(circle at center, rgba(231, 200, 161, 0.12), transparent 72%);
    filter: blur(24px);
    z-index: -1;
  }

  @media (min-width: 768px) {
    padding: 8rem 2rem;
  }
`;

const Container = styled.div`
  margin: 0 auto;
  max-width: 80rem;
`;

const FilterRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 2.5rem;
`;

const FilterButton = styled.button<{ $active: boolean }>`
  border: 1px solid ${({ $active }) => ($active ? 'rgba(17, 17, 17, 0.9)' : 'rgba(17, 17, 17, 0.1)')};
  border-radius: 999px;
  background: ${({ $active }) => ($active ? '#111111' : 'rgba(255, 255, 255, 0.74)')};
  color: ${({ $active }) => ($active ? '#ffffff' : 'rgba(17, 17, 17, 0.68)')};
  padding: 0.82rem 1.15rem;
  font-size: 0.875rem;
  font-weight: 600;
  transition:
    transform 260ms ease-out,
    border-color 260ms ease-out,
    background-color 260ms ease-out,
    color 260ms ease-out,
    box-shadow 260ms ease-out;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 22px rgba(109, 82, 59, 0.08);
  }
`;

const MainGrid = styled.div`
  display: grid;
  gap: 2rem;
  margin-top: 3rem;

  @media (min-width: 1024px) {
    grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
  }
`;

const FeaturedCard = styled.div`
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(234, 223, 209, 0.6);
  border-radius: 2.6rem;
  background:
    radial-gradient(circle at top right, rgba(241, 219, 192, 0.12), transparent 26%),
    linear-gradient(180deg, #171312 0%, #111111 100%);
  color: #fffaf3;
  padding: 1.5rem;
  box-shadow: 0 35px 90px rgba(17, 17, 17, 0.18);

  @media (min-width: 768px) {
    padding: 2rem;
  }
`;

const FeaturedHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;

const FeaturedEyebrow = styled.p`
  color: rgba(255, 246, 232, 0.56);
  font-size: 0.75rem;
  letter-spacing: 0.24em;
  text-transform: uppercase;
`;

const FeaturedTitle = styled.h3`
  margin-top: 0.5rem;
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(2.5rem, 3vw, 3.2rem);
  line-height: 0.96;
`;

const FeaturedTag = styled.span`
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  padding: 0.7rem 0.95rem;
  color: rgba(255, 247, 236, 0.72);
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  backdrop-filter: blur(14px);
`;

const FeaturedDescription = styled.p`
  max-width: 42rem;
  margin-top: 1.25rem;
  color: rgba(255, 244, 232, 0.68);
  font-size: 0.92rem;
  line-height: 1.8;
`;

const CompareWrap = styled.div`
  margin-top: 2rem;
`;

const CompareStage = styled.div`
  position: relative;
  overflow: hidden;
  height: 24rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 2rem;
  background: rgba(255, 255, 255, 0.04);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05);

  @media (max-width: 767px) {
    height: 19rem;
  }
`;

const CompareSurface = styled.div`
  position: relative;
  height: 100%;
  overflow: hidden;
  border-radius: inherit;

  ${CompareStage}:hover img {
    transform: scale(1.035);
  }
`;

const ComparePanel = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
`;

const CompareAfterWrap = styled.div<{ $width: number }>`
  position: absolute;
  inset: 0 auto 0 0;
  width: ${({ $width }) => `${$width}%`};
  overflow: hidden;
  border-right: 1px solid rgba(255, 255, 255, 0.12);
`;

const CompareImage = styled.img<{ $position?: string }>`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: ${({ $position }) => $position ?? 'center'};
  transition: transform 420ms cubic-bezier(0.22, 1, 0.36, 1);
`;

const CompareTopShade = styled.div`
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, rgba(8, 7, 8, 0.62) 0%, rgba(8, 7, 8, 0.18) 24%, transparent 46%),
    linear-gradient(0deg, rgba(8, 7, 8, 0.48) 0%, rgba(8, 7, 8, 0.16) 26%, transparent 48%);
`;

const CompareTint = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(232, 196, 155, 0.12), transparent 42%, rgba(255, 255, 255, 0.08) 100%);
`;

const CompareLabel = styled.span<{ $align: 'left' | 'right' }>`
  position: absolute;
  top: 1rem;
  ${({ $align }) => ($align === 'left' ? 'left: 1rem;' : 'right: 1rem;')}
  z-index: 2;
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 999px;
  background: rgba(8, 7, 8, 0.32);
  padding: 0.45rem 0.72rem;
  color: rgba(255, 250, 243, 0.86);
  font-size: 0.64rem;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  backdrop-filter: blur(12px);
`;

const CompareTextOverlay = styled.div<{ $align: 'left' | 'right' }>`
  position: absolute;
  right: ${({ $align }) => ($align === 'right' ? '1.2rem' : 'auto')};
  bottom: 1.2rem;
  left: ${({ $align }) => ($align === 'left' ? '1.2rem' : 'auto')};
  z-index: 2;
  max-width: 12rem;
  color: #fff8ef;
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(1.5rem, 2vw, 2rem);
  line-height: 0.95;
  text-shadow: 0 10px 22px rgba(0, 0, 0, 0.38);
`;

const CompareHandle = styled.div<{ $left: number }>`
  position: absolute;
  top: 0;
  bottom: 0;
  left: calc(${({ $left }) => `${$left}%`} - 1px);
  width: 2px;
  pointer-events: none;
`;

const CompareLine = styled.div`
  width: 2px;
  height: 100%;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 248, 232, 0.92) 46%, rgba(255, 255, 255, 0.7) 100%);
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.08),
    0 0 16px rgba(255, 249, 240, 0.18);
`;

const CompareKnob = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  display: grid;
  place-items: center;
  width: 2.75rem;
  height: 2.75rem;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.14);
  color: rgba(255, 249, 240, 0.96);
  font-size: 0.9rem;
  font-weight: 700;
  backdrop-filter: blur(14px);
  transform: translate(-50%, -50%);
  box-shadow:
    0 0 0 10px rgba(255, 244, 230, 0.06),
    0 0 32px rgba(255, 228, 196, 0.16);
`;

const CompareRange = styled.input<{ $value: number }>`
  width: 100%;
  margin-top: 1.2rem;
  appearance: none;
  height: 0.28rem;
  border-radius: 999px;
  background: linear-gradient(
    90deg,
    rgba(224, 188, 111, 1) 0%,
    rgba(224, 188, 111, 1) ${({ $value }) => `${$value}%`},
    rgba(255, 255, 255, 0.22) ${({ $value }) => `${$value}%`},
    rgba(255, 255, 255, 0.22) 100%
  );
  outline: none;

  &::-webkit-slider-thumb {
    appearance: none;
    width: 0.85rem;
    height: 0.85rem;
    border: none;
    border-radius: 999px;
    background: #e0bc6f;
    box-shadow: 0 0 0 6px rgba(224, 188, 111, 0.12);
    cursor: ew-resize;
  }

  &::-moz-range-thumb {
    width: 0.85rem;
    height: 0.85rem;
    border: none;
    border-radius: 999px;
    background: #e0bc6f;
    box-shadow: 0 0 0 6px rgba(224, 188, 111, 0.12);
    cursor: ew-resize;
  }
`;

const ThumbsGrid = styled.div`
  display: grid;
  gap: 1.25rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(6, minmax(0, 1fr));
  }
`;

const ThumbButton = styled.button<{ $mdSpan: number; $lgSpan: number }>`
  position: relative;
  overflow: hidden;
  min-height: 15.5rem;
  border: 1px solid rgba(229, 217, 205, 0.78);
  border-radius: 2rem;
  background: linear-gradient(180deg, rgba(255, 250, 245, 0.88), rgba(252, 244, 236, 0.74));
  box-shadow:
    0 22px 44px rgba(118, 92, 65, 0.08),
    0 0 0 1px rgba(255, 255, 255, 0.32);
  text-align: left;
  transition:
    transform 360ms cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 360ms cubic-bezier(0.22, 1, 0.36, 1),
    border-color 360ms ease;

  &:hover {
    transform: translateY(-5px);
    border-color: rgba(236, 217, 193, 0.96);
    box-shadow:
      0 28px 58px rgba(118, 92, 65, 0.13),
      0 0 0 1px rgba(255, 248, 238, 0.58),
      0 0 32px rgba(241, 219, 192, 0.16);
  }

  @media (min-width: 768px) {
    grid-column: span ${({ $mdSpan }) => $mdSpan};
  }

  @media (min-width: 1024px) {
    grid-column: span ${({ $lgSpan }) => $lgSpan};
  }
`;

const ThumbMedia = styled.div<{ $image: string; $position?: string }>`
  position: absolute;
  inset: 0;
  background-image: url(${({ $image }) => $image});
  background-repeat: no-repeat;
  background-position: ${({ $position }) => $position ?? 'center'};
  background-size: cover;
  transform: scale(1);
  transition: transform 420ms cubic-bezier(0.22, 1, 0.36, 1);

  ${ThumbButton}:hover & {
    transform: scale(1.05);
  }
`;

const ThumbOverlay = styled.div`
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, rgba(11, 10, 9, 0.22) 0%, rgba(11, 10, 9, 0.12) 22%, rgba(11, 10, 9, 0.56) 100%),
    linear-gradient(135deg, rgba(243, 218, 192, 0.11) 0%, rgba(243, 218, 192, 0) 44%, rgba(255, 255, 255, 0.06) 100%);
  transition: background 360ms ease;

  ${ThumbButton}:hover & {
    background:
      linear-gradient(180deg, rgba(11, 10, 9, 0.28) 0%, rgba(11, 10, 9, 0.16) 24%, rgba(11, 10, 9, 0.62) 100%),
      linear-gradient(135deg, rgba(243, 218, 192, 0.15) 0%, rgba(243, 218, 192, 0) 44%, rgba(255, 255, 255, 0.08) 100%);
  }
`;

const ThumbBottomShade = styled.div`
  position: absolute;
  inset: auto 0 0;
  height: 62%;
  background: linear-gradient(180deg, transparent 0%, rgba(10, 10, 10, 0.14) 28%, rgba(10, 10, 10, 0.78) 100%);
`;

const ThumbTint = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(228, 194, 162, 0.08) 0%, rgba(255, 255, 255, 0) 42%, rgba(243, 215, 189, 0.08) 100%);
`;

const ThumbContent = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 15.5rem;
  padding: 1.15rem;
`;

const ThumbTopRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
`;

const ThumbEyebrow = styled.p`
  color: rgba(255, 248, 239, 0.66);
  font-size: 0.62rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
`;

const ThumbTag = styled.span`
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.14);
  padding: 0.46rem 0.72rem;
  color: rgba(255, 251, 246, 0.9);
  font-size: 0.58rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  backdrop-filter: blur(10px);
`;

const ThumbBottom = styled.div`
  transform: translateY(0);
  transition: transform 320ms ease-out;

  ${ThumbButton}:hover & {
    transform: translateY(-3px);
  }
`;

const ThumbTitle = styled.h3`
  max-width: 11ch;
  color: #fff8ef;
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(2rem, 2.5vw, 2.45rem);
  line-height: 0.95;
  text-shadow: 0 12px 22px rgba(0, 0, 0, 0.3);
  transition: color 320ms ease-out;

  ${ThumbButton}:hover & {
    color: #ffffff;
  }
`;

const ThumbMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 0.95rem;
  color: rgba(255, 245, 234, 0.84);
  font-size: 0.83rem;
`;

const LightboxGrid = styled.div`
  display: grid;
  gap: 2rem;

  @media (min-width: 1024px) {
    grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
  }
`;

const LightboxVisual = styled.div`
  position: relative;
`;

const LightboxTag = styled.span`
  display: inline-flex;
  align-items: center;
  border: 1px solid rgba(17, 17, 17, 0.1);
  border-radius: 999px;
  background: rgba(17, 17, 17, 0.03);
  padding: 0.7rem 0.95rem;
  color: rgba(17, 17, 17, 0.56);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
`;

const LightboxNote = styled.p`
  margin-top: 1.5rem;
  color: rgba(17, 17, 17, 0.66);
  font-size: 1.1rem;
  line-height: 1.8;
`;

const LightboxMetaGrid = styled.div`
  display: grid;
  gap: 1rem;
  margin-top: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const LightboxMetaCard = styled.div`
  border: 1px solid rgba(17, 17, 17, 0.08);
  border-radius: 1.4rem;
  background: rgba(17, 17, 17, 0.02);
  padding: 1.25rem;
`;

const LightboxMetaLabel = styled.p`
  color: rgba(17, 17, 17, 0.45);
  font-size: 0.72rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
`;

const LightboxMetaValue = styled.p`
  margin-top: 0.75rem;
  color: #111111;
  font-size: 1.2rem;
  font-weight: 600;
`;

type ComparisonPreviewProps = {
  beforeSrc: string;
  afterSrc: string;
  beforePosition?: string;
  afterPosition?: string;
  beforeText: string;
  afterText: string;
  compareValue: number;
  onCompareChange: (value: number) => void;
  rangeLabel: string;
};

const ComparisonPreview = ({
  beforeSrc,
  afterSrc,
  beforePosition,
  afterPosition,
  beforeText,
  afterText,
  compareValue,
  onCompareChange,
  rangeLabel,
}: ComparisonPreviewProps) => (
  <CompareWrap>
    <CompareStage>
      <CompareSurface>
        <ComparePanel>
          <CompareImage src={beforeSrc} alt={beforeText} $position={beforePosition} loading="eager" />
          <CompareTopShade />
          <CompareTint />
          <CompareLabel $align="left">Before</CompareLabel>
          <CompareTextOverlay $align="left">{beforeText}</CompareTextOverlay>
        </ComparePanel>

        <CompareAfterWrap $width={compareValue}>
          <ComparePanel>
            <CompareImage src={afterSrc} alt={afterText} $position={afterPosition} loading="eager" />
            <CompareTopShade />
            <CompareTint />
            <CompareLabel $align="right">After</CompareLabel>
            <CompareTextOverlay $align="right">{afterText}</CompareTextOverlay>
          </ComparePanel>
        </CompareAfterWrap>

        <CompareHandle $left={compareValue}>
          <CompareLine />
          <CompareKnob>&#8646;</CompareKnob>
        </CompareHandle>
      </CompareSurface>
    </CompareStage>

    <CompareRange
      type="range"
      min={15}
      max={85}
      value={compareValue}
      onChange={(event) => onCompareChange(Number(event.target.value))}
      aria-label={rangeLabel}
      $value={compareValue}
    />
  </CompareWrap>
);

const BeforeAfterSection = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement | null>(null);
  const [activeFilter, setActiveFilter] = useState<(typeof galleryFilters)[number]>('all');
  const [lightboxId, setLightboxId] = useState<string | null>(null);
  const [compareValue, setCompareValue] = useState(54);

  useScrollReveal(sectionRef);

  const filteredItems = useMemo(
    () => galleryItems.filter((item) => activeFilter === 'all' || item.category === activeFilter),
    [activeFilter],
  );

  const featuredItem = filteredItems[0] ?? galleryItems[0];
  const activeLightbox = galleryItems.find((item) => item.id === lightboxId) ?? null;

  const featuredMedia = galleryImageMap[featuredItem.id] ?? galleryImageMap.airLashes;
  const featuredBefore = featuredMedia.before.src;
  const featuredAfter = featuredMedia.after.src;

  return (
    <Section id="results" ref={sectionRef}>
      <Container>
        <SectionHeading
          eyebrow={t('gallery.eyebrow')}
          title={t('gallery.title')}
          description={t('gallery.description')}
        />

        <FilterRow>
          {galleryFilters.map((filter) => (
            <FilterButton
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              $active={activeFilter === filter}
            >
              {t(`gallery.filters.${filter}`)}
            </FilterButton>
          ))}
        </FilterRow>

        <MainGrid>
          <FeaturedCard data-reveal="blur">
            <FeaturedHeader>
              <div>
                <FeaturedEyebrow>{t('gallery.comparisonTitle')}</FeaturedEyebrow>
                <FeaturedTitle>{t(`gallery.items.${featuredItem.id}.title`)}</FeaturedTitle>
              </div>
              <FeaturedTag>{t(`gallery.items.${featuredItem.id}.tag`)}</FeaturedTag>
            </FeaturedHeader>

            <FeaturedDescription>{t('gallery.comparisonDescription')}</FeaturedDescription>

            <ComparisonPreview
              beforeSrc={featuredBefore}
              afterSrc={featuredAfter}
              beforePosition={featuredMedia.before.position}
              afterPosition={featuredMedia.after.position}
              beforeText="Before"
              afterText="After"
              compareValue={compareValue}
              onCompareChange={setCompareValue}
              rangeLabel={t('gallery.dragLabel')}
            />
          </FeaturedCard>

          <ThumbsGrid>
            {filteredItems.map((item, index) => {
              const media = galleryImageMap[item.id] ?? galleryImageMap.airLashes;
              const cardImage = media.card.src;

              return (
                <ThumbButton
                  key={item.id}
                  type="button"
                  onClick={() => setLightboxId(item.id)}
                  $mdSpan={media.mdSpan}
                  $lgSpan={media.lgSpan}
                  data-reveal={index % 2 === 0 ? 'fade-up' : 'scale-in'}
                >
                  <ThumbMedia $image={cardImage} $position={media.card.position} />
                  <ThumbOverlay />
                  <ThumbBottomShade />
                  <ThumbTint />

                  <ThumbContent>
                    <ThumbTopRow>
                      <ThumbEyebrow>{t(`gallery.items.${item.id}.treatment`)}</ThumbEyebrow>
                      <ThumbTag>{t(`gallery.items.${item.id}.tag`)}</ThumbTag>
                    </ThumbTopRow>

                    <ThumbBottom>
                      <ThumbTitle>{t(`gallery.items.${item.id}.title`)}</ThumbTitle>
                      <ThumbMeta>
                        <span>{t(`gallery.items.${item.id}.duration`)}</span>
                        <span>{t(`gallery.items.${item.id}.price`)}</span>
                      </ThumbMeta>
                    </ThumbBottom>
                  </ThumbContent>
                </ThumbButton>
              );
            })}
          </ThumbsGrid>
        </MainGrid>
      </Container>

      <Lightbox
        open={Boolean(activeLightbox)}
        onClose={() => setLightboxId(null)}
        title={activeLightbox ? t(`gallery.items.${activeLightbox.id}.title`) : ''}
        closeLabel={t('common.close')}
      >
        {activeLightbox ? (
          <LightboxGrid>
            <LightboxVisual>
              <ComparisonPreview
                beforeSrc={(galleryImageMap[activeLightbox.id] ?? galleryImageMap.airLashes).before.src}
                afterSrc={(galleryImageMap[activeLightbox.id] ?? galleryImageMap.airLashes).after.src}
                beforePosition={(galleryImageMap[activeLightbox.id] ?? galleryImageMap.airLashes).before.position}
                afterPosition={(galleryImageMap[activeLightbox.id] ?? galleryImageMap.airLashes).after.position}
                beforeText="Before"
                afterText="After"
                compareValue={compareValue}
                onCompareChange={setCompareValue}
                rangeLabel={t('gallery.dragLabel')}
              />
            </LightboxVisual>

            <div>
              <LightboxTag>{t(`gallery.items.${activeLightbox.id}.tag`)}</LightboxTag>
              <LightboxNote>{t(`gallery.items.${activeLightbox.id}.note`)}</LightboxNote>

              <LightboxMetaGrid>
                <LightboxMetaCard>
                  <LightboxMetaLabel>{t(`gallery.items.${activeLightbox.id}.treatment`)}</LightboxMetaLabel>
                  <LightboxMetaValue>{t(`gallery.items.${activeLightbox.id}.duration`)}</LightboxMetaValue>
                </LightboxMetaCard>
                <LightboxMetaCard>
                  <LightboxMetaLabel>Price</LightboxMetaLabel>
                  <LightboxMetaValue>{t(`gallery.items.${activeLightbox.id}.price`)}</LightboxMetaValue>
                </LightboxMetaCard>
              </LightboxMetaGrid>
            </div>
          </LightboxGrid>
        ) : null}
      </Lightbox>
    </Section>
  );
};

export default BeforeAfterSection;
