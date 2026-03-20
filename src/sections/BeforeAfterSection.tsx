import { useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Lightbox } from '../components/Lightbox';
import { SectionHeading } from '../components/SectionHeading';
import { galleryFilters, galleryItems } from '../data/site';
import { useScrollReveal } from '../hooks/useScrollReveal';

const GalleryArt = ({
  accent,
  label,
  mode,
}: {
  accent: string;
  label: string;
  mode: 'before' | 'after';
}) => (
  <div
    className={`absolute inset-0 rounded-[1.6rem] bg-gradient-to-br ${accent} p-5`}
    aria-hidden="true"
  >
    <div className="flex h-full flex-col justify-between rounded-[1.3rem] border border-white/20 bg-[linear-gradient(140deg,rgba(255,255,255,0.2),rgba(255,255,255,0.03))] p-4 text-white">
      <span className="text-xs font-semibold uppercase tracking-[0.24em] text-white/75">{mode}</span>
      <span className="max-w-[10ch] font-display text-3xl leading-none">{label}</span>
    </div>
  </div>
);

const BeforeAfterSection = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement | null>(null);
  const [activeFilter, setActiveFilter] = useState<(typeof galleryFilters)[number]>('all');
  const [lightboxId, setLightboxId] = useState<string | null>(null);
  const [compareValue, setCompareValue] = useState(54);

  useScrollReveal(sectionRef);

  const filteredItems = useMemo(
    () =>
      galleryItems.filter((item) => activeFilter === 'all' || item.category === activeFilter),
    [activeFilter],
  );

  const featuredItem = filteredItems[0] ?? galleryItems[0];
  const activeLightbox = galleryItems.find((item) => item.id === lightboxId) ?? null;

  return (
    <section id="results" ref={sectionRef} className="section-shell px-4 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow={t('gallery.eyebrow')}
          title={t('gallery.title')}
          description={t('gallery.description')}
        />

        <div className="mt-10 flex flex-wrap gap-3">
          {galleryFilters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={`rounded-full px-5 py-3 text-sm font-semibold transition ${
                activeFilter === filter
                  ? 'bg-ink text-white'
                  : 'border border-black/10 bg-white/75 text-black/65'
              }`}
            >
              {t(`gallery.filters.${filter}`)}
            </button>
          ))}
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div
            data-reveal="blur"
            className="luxury-border relative overflow-hidden rounded-[2.6rem] bg-[#111111] p-5 text-white shadow-[0_35px_90px_rgba(17,17,17,0.18)] md:p-8"
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-white/55">
                  {t('gallery.comparisonTitle')}
                </p>
                <h3 className="mt-2 font-display text-4xl">{t(`gallery.items.${featuredItem.id}.title`)}</h3>
              </div>
              <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white/70">
                {t(`gallery.items.${featuredItem.id}.tag`)}
              </span>
            </div>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-white/70">
              {t('gallery.comparisonDescription')}
            </p>

            <div className="mt-8">
              <div className="relative h-[24rem] overflow-hidden rounded-[2rem] border border-white/10 bg-black/20">
                <GalleryArt
                  accent={featuredItem.accent}
                  label={t(`gallery.items.${featuredItem.id}.title`)}
                  mode="before"
                />
                <div
                  className="absolute inset-y-0 left-0 overflow-hidden"
                  style={{ width: `${compareValue}%` }}
                >
                  <GalleryArt
                    accent="from-[#ffffff] via-[#ffe4bd] to-[#6EC6FF]"
                    label={t(`gallery.items.${featuredItem.id}.tag`)}
                    mode="after"
                  />
                </div>
                <div
                  className="absolute inset-y-0"
                  style={{ left: `calc(${compareValue}% - 1px)` }}
                >
                  <div className="h-full w-0.5 bg-white" />
                  <div className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/15 text-xs font-semibold backdrop-blur">
                    ⇄
                  </div>
                </div>
              </div>
              <input
                type="range"
                min={15}
                max={85}
                value={compareValue}
                onChange={(event) => setCompareValue(Number(event.target.value))}
                className="mt-6 w-full accent-gold"
                aria-label={t('gallery.dragLabel')}
              />
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-6">
            {filteredItems.map((item, index) => (
              <button
                key={item.id}
                type="button"
                data-reveal={index % 2 === 0 ? 'fade-up' : 'scale-in'}
                onClick={() => setLightboxId(item.id)}
                className={`${item.grid} group overflow-hidden rounded-[2rem] border border-black/8 bg-white/75 p-4 text-left shadow-[0_18px_45px_rgba(17,17,17,0.05)] backdrop-blur`}
              >
                <div className="relative h-56 overflow-hidden rounded-[1.6rem]">
                  <GalleryArt accent={item.accent} label={t(`gallery.items.${item.id}.title`)} mode="before" />
                  <div className="absolute inset-y-0 right-0 w-1/2 overflow-hidden">
                    <GalleryArt accent="from-[#ffffff] via-[#D4AF37] to-[#FF6B6B]" label={t(`gallery.items.${item.id}.tag`)} mode="after" />
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-black/45">
                      {t(`gallery.items.${item.id}.treatment`)}
                    </p>
                    <h3 className="mt-2 font-display text-3xl text-ink">{t(`gallery.items.${item.id}.title`)}</h3>
                  </div>
                  <span className="rounded-full bg-black/[0.04] px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-black/55">
                    {t(`gallery.items.${item.id}.tag`)}
                  </span>
                </div>

                <div className="mt-4 flex items-center justify-between text-sm text-black/55">
                  <span>{t(`gallery.items.${item.id}.duration`)}</span>
                  <span>{t(`gallery.items.${item.id}.price`)}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <Lightbox
        open={Boolean(activeLightbox)}
        onClose={() => setLightboxId(null)}
        title={activeLightbox ? t(`gallery.items.${activeLightbox.id}.title`) : ''}
        closeLabel={t('common.close')}
      >
        {activeLightbox ? (
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="relative h-[28rem] overflow-hidden rounded-[2rem] bg-[#111111]">
              <GalleryArt accent={activeLightbox.accent} label={t(`gallery.items.${activeLightbox.id}.title`)} mode="before" />
              <div className="absolute inset-y-0 right-0 w-1/2 overflow-hidden">
                <GalleryArt accent="from-[#ffffff] via-[#D4AF37] to-[#FF6B6B]" label={t(`gallery.items.${activeLightbox.id}.tag`)} mode="after" />
              </div>
            </div>
            <div>
              <span className="rounded-full border border-black/10 bg-black/[0.03] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-black/55">
                {t(`gallery.items.${activeLightbox.id}.tag`)}
              </span>
              <p className="mt-6 text-lg leading-8 text-black/65">
                {t(`gallery.items.${activeLightbox.id}.note`)}
              </p>
              <div className="mt-8 grid gap-4 md:grid-cols-2">
                <div className="rounded-[1.4rem] border border-black/8 bg-black/[0.02] p-5">
                  <p className="text-xs uppercase tracking-[0.22em] text-black/45">
                    {t(`gallery.items.${activeLightbox.id}.treatment`)}
                  </p>
                  <p className="mt-3 text-xl font-semibold text-black">
                    {t(`gallery.items.${activeLightbox.id}.duration`)}
                  </p>
                </div>
                <div className="rounded-[1.4rem] border border-black/8 bg-black/[0.02] p-5">
                  <p className="text-xs uppercase tracking-[0.22em] text-black/45">Price</p>
                  <p className="mt-3 text-xl font-semibold text-black">
                    {t(`gallery.items.${activeLightbox.id}.price`)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </Lightbox>
    </section>
  );
};

export default BeforeAfterSection;
