import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { SectionHeading } from '../components/SectionHeading';
import { useScrollReveal } from '../hooks/useScrollReveal';

const Section = styled.section.attrs({
  className: 'section-shell px-4 py-24 md:px-8 md:py-32',
})``;

const Card = styled.div.attrs({
  className: 'mx-auto max-w-7xl rounded-[2.8rem] bg-ink px-6 py-10 text-white md:px-10 md:py-14',
})``;

const HeadingWrap = styled.div.attrs({
  className: 'max-w-4xl',
})``;

const MainGrid = styled.div.attrs({
  className: 'mt-14 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]',
})``;

const InfoGrid = styled.div.attrs({
  className: 'grid gap-5',
})``;

const InfoCard = styled.article.attrs<{ $reveal: string }>(({ $reveal }) => ({
  className: 'rounded-[2rem] border border-white/10 bg-white/6 p-6',
  'data-reveal': $reveal,
}))``;

const Label = styled.p.attrs({
  className: 'text-xs uppercase tracking-[0.24em] text-white/50',
})``;

const Title = styled.p.attrs({
  className: 'mt-4 font-display text-3xl text-white',
})``;

const Body = styled.p.attrs({
  className: 'mt-2 text-sm leading-7 text-white/70',
})``;

const HoursGrid = styled.div.attrs({
  className: 'mt-4 grid gap-2 text-sm leading-7 text-white/72',
})``;

const ContactLinks = styled.div.attrs({
  className: 'mt-4 grid gap-3 text-sm leading-7 text-white/72',
})``;

const ContactLink = styled.a.attrs({
  className: 'hover:text-white',
})``;

const CtaRow = styled.div.attrs({
  className: 'mt-6 flex flex-wrap gap-3',
})``;

const PrimaryLink = styled.a.attrs({
  className: 'rounded-full bg-white px-5 py-3 text-sm font-semibold text-ink',
})``;

const SecondaryLink = styled.a.attrs({
  className: 'rounded-full border border-white/12 px-5 py-3 text-sm font-semibold text-white/80',
})``;

const MapCard = styled.div.attrs({
  className: 'rounded-[2.4rem] border border-white/10 bg-white/6 p-5',
  'data-reveal': 'fade-left',
})``;

const MapInner = styled.div.attrs({
  className: 'h-full min-h-[28rem] rounded-[2rem] bg-[linear-gradient(145deg,#1b2638,#253652_45%,#111111)] p-6',
})``;

const MapHeader = styled.div.attrs({
  className: 'flex items-center justify-between',
})``;

const MapTitle = styled.h3.attrs({
  className: 'mt-2 font-display text-4xl text-white',
})``;

const MapBadge = styled.div.attrs({
  className: 'rounded-full border border-white/12 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/65',
})``;

const MapArea = styled.div.attrs({
  className:
    'relative mt-8 h-[20rem] overflow-hidden rounded-[1.8rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(110,198,255,0.22),transparent_18%),radial-gradient(circle_at_bottom_right,rgba(255,107,107,0.2),transparent_18%),linear-gradient(145deg,#0f1722,#152338,#0d1117)]',
})``;

const MapGrid = styled.div.attrs({
  className: 'absolute inset-0 opacity-30',
  style: {
    backgroundImage:
      'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)',
    backgroundSize: '48px 48px',
  },
})``;

const PinShell = styled.div.attrs({
  className:
    'absolute left-[58%] top-[42%] flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/12 backdrop-blur',
})``;

const PinDot = styled.div.attrs({
  className: 'h-5 w-5 rounded-full bg-gold',
})``;

const MapNote = styled.div.attrs({
  className: 'absolute inset-x-6 bottom-6 rounded-[1.4rem] border border-white/10 bg-black/20 p-5',
})``;

const MapBody = styled.p.attrs({
  className: 'text-sm leading-7 text-white/72',
})``;

const Parking = styled.p.attrs({
  className: 'mt-3 text-sm font-medium text-white/85',
})``;

export const ContactSection = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement | null>(null);
  useScrollReveal(sectionRef);

  return (
    <Section id="contact" ref={sectionRef}>
      <Card>
        <HeadingWrap>
          <SectionHeading
            eyebrow={t('contact.eyebrow')}
            title={t('contact.title')}
            description={t('contact.description')}
          />
        </HeadingWrap>

        <MainGrid>
          <InfoGrid>
            <InfoCard $reveal="fade-right">
              <Label>{t('contact.addressTitle')}</Label>
              <Title>{t('contact.addressLineOne')}</Title>
              <Body>{t('contact.addressLineTwo')}</Body>
            </InfoCard>

            <InfoCard $reveal="blur">
              <Label>{t('contact.hoursTitle')}</Label>
              <HoursGrid>
                <p>{t('contact.hours.monFri')}</p>
                <p>{t('contact.hours.sat')}</p>
                <p>{t('contact.hours.sun')}</p>
              </HoursGrid>
            </InfoCard>

            <InfoCard $reveal="fade-right">
              <Label>{t('contact.contactTitle')}</Label>
              <ContactLinks>
                <ContactLink href={`tel:${t('contact.phone')}`}>{t('contact.phone')}</ContactLink>
                <ContactLink href={`mailto:${t('contact.email')}`}>{t('contact.email')}</ContactLink>
              </ContactLinks>
              <CtaRow>
                <PrimaryLink href="https://wa.me/49305558210" target="_blank" rel="noreferrer">
                  {t('contact.whatsapp')}
                </PrimaryLink>
                <SecondaryLink href="https://instagram.com" target="_blank" rel="noreferrer">
                  {t('contact.instagram')}
                </SecondaryLink>
              </CtaRow>
            </InfoCard>
          </InfoGrid>

          <MapCard>
            <MapInner>
              <MapHeader>
                <div>
                  <Label>{t('contact.mapTitle')}</Label>
                  <MapTitle>Berlin West</MapTitle>
                </div>
                <MapBadge>Savignyplatz</MapBadge>
              </MapHeader>

              <MapArea>
                <MapGrid />
                <PinShell>
                  <PinDot />
                </PinShell>
                <MapNote>
                  <MapBody>{t('contact.mapNote')}</MapBody>
                  <Parking>{t('contact.parking')}</Parking>
                </MapNote>
              </MapArea>
            </MapInner>
          </MapCard>
        </MainGrid>
      </Card>
    </Section>
  );
};
