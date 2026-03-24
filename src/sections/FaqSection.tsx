import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { SectionHeading } from '../components/SectionHeading';
import { faqIds } from '../data/site';
import { useScrollReveal } from '../hooks/useScrollReveal';

const Section = styled.section.attrs({
  className: 'section-shell px-4 py-24 md:px-8 md:py-32',
})``;

const Container = styled.div.attrs({
  className: 'mx-auto max-w-5xl',
})``;

const FaqGrid = styled.div.attrs({
  className: 'mt-12 grid gap-4',
})``;

const FaqCard = styled.article.attrs<{ $reveal: string }>(({ $reveal }) => ({
  className:
    'rounded-[2rem] border border-black/8 bg-white/80 p-5 shadow-[0_18px_45px_rgba(17,17,17,0.04)] backdrop-blur',
  'data-reveal': $reveal,
}))``;

const Trigger = styled.button.attrs({
  className: 'flex w-full items-center justify-between gap-6 text-left',
})``;

const Question = styled.span.attrs({
  className: 'font-display text-3xl text-ink',
})``;

const Status = styled.span.attrs({
  className: 'rounded-full border border-black/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-black/45',
})``;

const Answer = styled.p.attrs({
  className: 'mt-5 max-w-3xl text-sm leading-8 text-black/65',
})``;

export const FaqSection = () => {
  const { t } = useTranslation();
  const [openItem, setOpenItem] = useState<(typeof faqIds)[number]>('bookingChanges');
  const sectionRef = useRef<HTMLElement | null>(null);
  useScrollReveal(sectionRef);

  return (
    <Section id="faq" ref={sectionRef}>
      <Container>
        <SectionHeading
          eyebrow={t('faq.eyebrow')}
          title={t('faq.title')}
          description={t('faq.description')}
          align="center"
        />

        <FaqGrid>
          {faqIds.map((faqId, index) => {
            const isOpen = openItem === faqId;

            return (
              <FaqCard
                key={faqId}
                $reveal={index % 2 === 0 ? 'fade-up' : 'fade-right'}
              >
                <Trigger
                  type="button"
                  onClick={() => setOpenItem(isOpen ? 'bookingChanges' : faqId)}
                >
                  <Question>{t(`faq.items.${faqId}.question`)}</Question>
                  <Status>{isOpen ? '-' : '+'}</Status>
                </Trigger>
                {isOpen ? <Answer>{t(`faq.items.${faqId}.answer`)}</Answer> : null}
              </FaqCard>
            );
          })}
        </FaqGrid>
      </Container>
    </Section>
  );
};
