import { useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { SectionHeading } from '../components/SectionHeading';
import { priceGroups } from '../data/site';
import { useScrollReveal } from '../hooks/useScrollReveal';

const Section = styled.section.attrs({
  className: 'section-shell px-4 py-24 md:px-8 md:py-32',
})``;

const Container = styled.div.attrs({
  className: 'mx-auto max-w-7xl',
})``;

const Note = styled.div.attrs({
  className: 'mt-8 rounded-[2rem] border border-gold/25 bg-gold/10 px-6 py-4 text-sm font-medium text-black/70',
})``;

const FilterRow = styled.div.attrs({
  className: 'mt-10 flex flex-wrap gap-3',
})``;

const FilterButton = styled.button.attrs<{ $active: boolean }>(({ $active }) => ({
  className: `rounded-full px-5 py-3 text-sm font-semibold transition ${
    $active ? 'bg-ink text-white' : 'border border-black/10 bg-white/80 text-black/65'
  }`,
}))``;

const CardsGrid = styled.div.attrs({
  className: 'mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3',
})``;

const PriceCard = styled.article.attrs<{ $featured: boolean; $reveal: string }>(
  ({ $featured, $reveal }) => ({
    className: `luxury-border rounded-[2rem] border p-6 shadow-[0_18px_45px_rgba(17,17,17,0.05)] backdrop-blur ${
      $featured ? 'border-gold/30 bg-white' : 'border-black/8 bg-white/75'
    }`,
    'data-reveal': $reveal,
  }),
)``;

const CardHeader = styled.div.attrs({
  className: 'flex items-start justify-between gap-4',
})``;

const CardEyebrow = styled.p.attrs({
  className: 'text-xs uppercase tracking-[0.22em] text-black/45',
})``;

const CardTitle = styled.h3.attrs({
  className: 'mt-3 font-display text-3xl text-ink',
})``;

const Badge = styled.span.attrs({
  className: 'rounded-full bg-gold/12 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-black/70',
})``;

const CardFooter = styled.div.attrs({
  className: 'mt-10 flex items-end justify-between gap-4',
})``;

const Duration = styled.p.attrs({
  className: 'text-sm text-black/50',
})``;

const Price = styled.p.attrs({
  className: 'mt-3 text-3xl font-semibold text-black',
})``;

const BookLink = styled.a.attrs({
  className:
    'rounded-full border border-black/12 px-4 py-3 text-sm font-semibold text-black/70 transition hover:bg-black hover:text-white',
})``;

export const PricesSection = () => {
  const { t } = useTranslation();
  const [activeGroup, setActiveGroup] = useState<(typeof priceGroups)[number]['id']>('signature');
  const sectionRef = useRef<HTMLElement | null>(null);

  useScrollReveal(sectionRef);

  const activeItems = useMemo(
    () => priceGroups.find((group) => group.id === activeGroup)?.itemIds ?? priceGroups[0].itemIds,
    [activeGroup],
  );

  return (
    <Section id="prices" ref={sectionRef}>
      <Container>
        <SectionHeading
          eyebrow={t('prices.eyebrow')}
          title={t('prices.title')}
          description={t('prices.description')}
        />

        <Note>{t('prices.note')}</Note>

        <FilterRow>
          {priceGroups.map((group) => (
            <FilterButton
              key={group.id}
              type="button"
              onClick={() => setActiveGroup(group.id)}
              $active={activeGroup === group.id}
            >
              {t(`prices.filters.${group.id}`)}
            </FilterButton>
          ))}
        </FilterRow>

        <CardsGrid>
          {activeItems.map((itemId, index) => {
            const badge = t(`prices.items.${itemId}.badge`, { defaultValue: '' });

            return (
              <PriceCard
                key={itemId}
                $featured={Boolean(badge)}
                $reveal={index % 2 === 0 ? 'fade-up' : 'scale-in'}
              >
                <CardHeader>
                  <div>
                    <CardEyebrow>{t(`prices.filters.${activeGroup}`)}</CardEyebrow>
                    <CardTitle>{t(`prices.items.${itemId}.title`)}</CardTitle>
                  </div>
                  {badge ? <Badge>{badge}</Badge> : null}
                </CardHeader>

                <CardFooter>
                  <div>
                    <Duration>{t(`prices.items.${itemId}.duration`)}</Duration>
                    <Price>{t(`prices.items.${itemId}.price`)}</Price>
                  </div>
                  <BookLink href="#booking">{t('common.bookNow')}</BookLink>
                </CardFooter>
              </PriceCard>
            );
          })}
        </CardsGrid>
      </Container>
    </Section>
  );
};
