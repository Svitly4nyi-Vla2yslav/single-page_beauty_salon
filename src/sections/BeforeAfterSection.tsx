import { useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Lightbox } from '../components/Lightbox';
import { SectionHeading } from '../components/SectionHeading';
import { galleryFilters, galleryItems } from '../data/site';
import { useScrollReveal } from '../hooks/useScrollReveal';

const ArtShell = styled.div.attrs<{ $accent: string }>(({ $accent }) => ({
  className: `absolute inset-0 rounded-[1.6rem] bg-gradient-to-br ${$accent} p-5`,
  'aria-hidden': 'true',
}))``;

const ArtInner = styled.div.attrs({
  className:
    'flex h-full flex-col justify-between rounded-[1.3rem] border border-white/20 bg-[linear-gradient(140deg,rgba(255,255,255,0.2),rgba(255,255,255,0.03))] p-4 text-white',
})``;

const ArtMode = styled.span.attrs({
  className: 'text-xs font-semibold uppercase tracking-[0.24em] text-white/75',
})``;

const ArtLabel = styled.span.attrs({
  className: 'max-w-[10ch] font-display text-3xl leading-none',
})``;

const Section = styled.section.attrs({
  className: 'section-shell px-4 py-24 md:px-8 md:py-32',
})``;

const Container = styled.div.attrs({
  className: 'mx-auto max-w-7xl',
})``;

const FilterRow = styled.div.attrs({
  className: 'mt-10 flex flex-wrap gap-3',
})``;

const FilterButton = styled.button.attrs<{ $active: boolean }>(({ $active }) => ({
  className: `rounded-full px-5 py-3 text-sm font-semibold transition ${
    $active ? 'bg-ink text-white' : 'border border-black/10 bg-white/75 text-black/65'
  }`,
}))``;

const MainGrid = styled.div.attrs({
  className: 'mt-12 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]',
})``;

const FeaturedCard = styled.div.attrs({
  className:
    'luxury-border relative overflow-hidden rounded-[2.6rem] bg-[#111111] p-5 text-white shadow-[0_35px_90px_rgba(17,17,17,0.18)] md:p-8',
  'data-reveal': 'blur',
})``;

const FeaturedHeader = styled.div.attrs({
  className: 'flex flex-wrap items-center justify-between gap-4',
})``;

const FeaturedEyebrow = styled.p.attrs({
  className: 'text-xs uppercase tracking-[0.24em] text-white/55',
})``;

const FeaturedTitle = styled.h3.attrs({
  className: 'mt-2 font-display text-4xl',
})``;

const FeaturedTag = styled.span.attrs({
  className: 'rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white/70',
})``;

const FeaturedDescription = styled.p.attrs({
  className: 'mt-5 max-w-2xl text-sm leading-7 text-white/70',
})``;

const CompareWrap = styled.div.attrs({
  className: 'mt-8',
})``;

const CompareStage = styled.div.attrs({
  className: 'relative h-[24rem] overflow-hidden rounded-[2rem] border border-white/10 bg-black/20',
})``;

const CompareAfterWrap = styled.div.attrs<{ $width: number }>(({ $width }) => ({
  className: 'absolute inset-y-0 left-0 overflow-hidden',
  style: { width: `${$width}%` },
}))``;

const CompareHandle = styled.div.attrs<{ $left: number }>(({ $left }) => ({
  className: 'absolute inset-y-0',
  style: { left: `calc(${$left}% - 1px)` },
}))``;

const CompareLine = styled.div.attrs({
  className: 'h-full w-0.5 bg-white',
})``;

const CompareKnob = styled.div.attrs({
  className:
    'absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/15 text-xs font-semibold backdrop-blur',
})``;

const CompareRange = styled.input.attrs({
  className: 'mt-6 w-full accent-gold',
})``;

const ThumbsGrid = styled.div.attrs({
  className: 'grid gap-5 md:grid-cols-6',
})``;

const ThumbButton = styled.button.attrs<{ $grid: string; $reveal: string }>(({ $grid, $reveal }) => ({
  className: `${$grid} group overflow-hidden rounded-[2rem] border border-black/8 bg-white/75 p-4 text-left shadow-[0_18px_45px_rgba(17,17,17,0.05)] backdrop-blur`,
  'data-reveal': $reveal,
}))``;

const ThumbVisual = styled.div.attrs({
  className: 'relative h-56 overflow-hidden rounded-[1.6rem]',
})``;

const ThumbAfterWrap = styled.div.attrs({
  className: 'absolute inset-y-0 right-0 w-1/2 overflow-hidden',
})``;

const ThumbHeader = styled.div.attrs({
  className: 'mt-5 flex items-center justify-between gap-4',
})``;

const ThumbEyebrow = styled.p.attrs({
  className: 'text-xs uppercase tracking-[0.22em] text-black/45',
})``;

const ThumbTitle = styled.h3.attrs({
  className: 'mt-2 font-display text-3xl text-ink',
})``;

const ThumbTag = styled.span.attrs({
  className: 'rounded-full bg-black/[0.04] px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-black/55',
})``;

const ThumbMeta = styled.div.attrs({
  className: 'mt-4 flex items-center justify-between text-sm text-black/55',
})``;

const LightboxGrid = styled.div.attrs({
  className: 'grid gap-8 lg:grid-cols-[1.1fr_0.9fr]',
})``;

const LightboxVisual = styled.div.attrs({
  className: 'relative h-[28rem] overflow-hidden rounded-[2rem] bg-[#111111]',
})``;

const LightboxAfterWrap = styled.div.attrs({
  className: 'absolute inset-y-0 right-0 w-1/2 overflow-hidden',
})``;

const LightboxTag = styled.span.attrs({
  className: 'rounded-full border border-black/10 bg-black/[0.03] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-black/55',
})``;

const LightboxNote = styled.p.attrs({
  className: 'mt-6 text-lg leading-8 text-black/65',
})``;

const LightboxMetaGrid = styled.div.attrs({
  className: 'mt-8 grid gap-4 md:grid-cols-2',
})``;

const LightboxMetaCard = styled.div.attrs({
  className: 'rounded-[1.4rem] border border-black/8 bg-black/[0.02] p-5',
})``;

const LightboxMetaLabel = styled.p.attrs({
  className: 'text-xs uppercase tracking-[0.22em] text-black/45',
})``;

const LightboxMetaValue = styled.p.attrs({
  className: 'mt-3 text-xl font-semibold text-black',
})``;

const GalleryArt = ({
  accent,
  label,
  mode,
}: {
  accent: string;
  label: string;
  mode: 'before' | 'after';
}) => (
  <ArtShell $accent={accent}>
    <ArtInner>
      <ArtMode>{mode}</ArtMode>
      <ArtLabel>{label}</ArtLabel>
    </ArtInner>
  </ArtShell>
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
          <FeaturedCard>
            <FeaturedHeader>
              <div>
                <FeaturedEyebrow>{t('gallery.comparisonTitle')}</FeaturedEyebrow>
                <FeaturedTitle>{t(`gallery.items.${featuredItem.id}.title`)}</FeaturedTitle>
              </div>
              <FeaturedTag>{t(`gallery.items.${featuredItem.id}.tag`)}</FeaturedTag>
            </FeaturedHeader>

            <FeaturedDescription>{t('gallery.comparisonDescription')}</FeaturedDescription>

            <CompareWrap>
              <CompareStage>
                <GalleryArt
                  accent={featuredItem.accent}
                  label={t(`gallery.items.${featuredItem.id}.title`)}
                  mode="before"
                />
                <CompareAfterWrap $width={compareValue}>
                  <GalleryArt
                    accent="from-[#ffffff] via-[#ffe4bd] to-[#6EC6FF]"
                    label={t(`gallery.items.${featuredItem.id}.tag`)}
                    mode="after"
                  />
                </CompareAfterWrap>
                <CompareHandle $left={compareValue}>
                  <CompareLine />
                  <CompareKnob>&#8646;</CompareKnob>
                </CompareHandle>
              </CompareStage>
              <CompareRange
                type="range"
                min={15}
                max={85}
                value={compareValue}
                onChange={(event) => setCompareValue(Number(event.target.value))}
                aria-label={t('gallery.dragLabel')}
              />
            </CompareWrap>
          </FeaturedCard>

          <ThumbsGrid>
            {filteredItems.map((item, index) => (
              <ThumbButton
                key={item.id}
                type="button"
                onClick={() => setLightboxId(item.id)}
                $grid={item.grid}
                $reveal={index % 2 === 0 ? 'fade-up' : 'scale-in'}
              >
                <ThumbVisual>
                  <GalleryArt
                    accent={item.accent}
                    label={t(`gallery.items.${item.id}.title`)}
                    mode="before"
                  />
                  <ThumbAfterWrap>
                    <GalleryArt
                      accent="from-[#ffffff] via-[#D4AF37] to-[#FF6B6B]"
                      label={t(`gallery.items.${item.id}.tag`)}
                      mode="after"
                    />
                  </ThumbAfterWrap>
                </ThumbVisual>

                <ThumbHeader>
                  <div>
                    <ThumbEyebrow>{t(`gallery.items.${item.id}.treatment`)}</ThumbEyebrow>
                    <ThumbTitle>{t(`gallery.items.${item.id}.title`)}</ThumbTitle>
                  </div>
                  <ThumbTag>{t(`gallery.items.${item.id}.tag`)}</ThumbTag>
                </ThumbHeader>

                <ThumbMeta>
                  <span>{t(`gallery.items.${item.id}.duration`)}</span>
                  <span>{t(`gallery.items.${item.id}.price`)}</span>
                </ThumbMeta>
              </ThumbButton>
            ))}
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
              <GalleryArt
                accent={activeLightbox.accent}
                label={t(`gallery.items.${activeLightbox.id}.title`)}
                mode="before"
              />
              <LightboxAfterWrap>
                <GalleryArt
                  accent="from-[#ffffff] via-[#D4AF37] to-[#FF6B6B]"
                  label={t(`gallery.items.${activeLightbox.id}.tag`)}
                  mode="after"
                />
              </LightboxAfterWrap>
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
