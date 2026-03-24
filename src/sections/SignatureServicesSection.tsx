import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { SectionHeading } from '../components/SectionHeading';
import { serviceCards } from '../data/site';
import { useScrollReveal } from '../hooks/useScrollReveal';

const accents: Record<string, string> = {
  lashes: 'from-[#fffaf0] via-white to-[#eef8ff]',
  brows: 'from-[#fff6de] via-white to-[#fff3f5]',
  facial: 'from-[#eef9ff] via-white to-[#f4f2ff]',
  pmu: 'from-[#fff0f0] via-white to-[#fffaf2]',
  headSpa: 'from-[#eff5ff] via-white to-[#fff9ef]',
  antiAging: 'from-[#f7f7f1] via-white to-[#eef9ff]',
  makeup: 'from-[#fff3ef] via-white to-[#fef7ff]',
  consulting: 'from-[#f9f7f0] via-white to-[#f1f8ff]',
};

const Section = styled.section.attrs({
  className: 'section-shell px-4 py-24 md:px-8 md:py-32',
})``;

const Container = styled.div.attrs({
  className: 'mx-auto max-w-7xl',
})``;

const EditorialGrid = styled.div.attrs({
  className: 'editorial-grid relative mt-14 overflow-hidden rounded-[2.6rem] border border-black/8 p-4 md:p-6',
})``;

const BlueGlow = styled.div.attrs({
  className: 'absolute -left-20 top-8 h-48 w-48 rounded-full bg-[#6EC6FF]/15 blur-3xl',
  'data-parallax': 'slow',
})``;

const GoldGlow = styled.div.attrs({
  className: 'absolute bottom-0 right-0 h-56 w-56 rounded-full bg-[#D4AF37]/12 blur-3xl',
  'data-parallax': 'medium',
})``;

const ServicesGrid = styled.div.attrs({
  className: 'relative grid gap-5 md:grid-cols-6 lg:grid-cols-6',
})``;

const ServiceCard = styled.article.attrs<{ $size: string; $accent: string; $reveal: string }>(
  ({ $size, $accent, $reveal }) => ({
    className: `${$size} luxury-border relative overflow-hidden rounded-[2rem] border border-black/8 bg-gradient-to-br ${$accent} p-6 shadow-[0_25px_50px_rgba(17,17,17,0.06)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_32px_72px_rgba(17,17,17,0.1)]`,
    'data-reveal': $reveal,
  }),
)``;

const ServiceIndex = styled.div.attrs({
  className: 'absolute right-4 top-4 rounded-full bg-ink px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-white',
})``;

const ServiceGlow = styled.div.attrs({
  className: 'absolute -right-10 bottom-0 h-32 w-32 rounded-full bg-gradient-to-br from-gold/20 via-transparent to-transparent blur-2xl',
})``;

const Eyebrow = styled.p.attrs({
  className: 'text-xs uppercase tracking-[0.28em] text-black/45',
})``;

const Title = styled.h3.attrs({
  className: 'mt-5 font-display text-3xl leading-none text-ink',
})``;

const Description = styled.p.attrs({
  className: 'mt-4 text-sm leading-7 text-black/65',
})``;

const FooterRow = styled.div.attrs({
  className: 'mt-8 flex items-end justify-between gap-4',
})``;

const MetaEyebrow = styled.p.attrs({
  className: 'text-xs uppercase tracking-[0.22em] text-black/35',
})``;

const Price = styled.p.attrs({
  className: 'mt-2 text-xl font-semibold text-black',
})``;

const MiniCta = styled.a.attrs({
  className:
    'inline-flex items-center gap-2 rounded-full border border-black/10 px-4 py-3 text-sm font-semibold text-black/70 transition hover:bg-black hover:text-white',
})``;

export const SignatureServicesSection = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement | null>(null);
  useScrollReveal(sectionRef);

  return (
    <Section id="services" ref={sectionRef}>
      <Container>
        <SectionHeading
          eyebrow={t('services.eyebrow')}
          title={t('services.title')}
          description={t('services.description')}
        />

        <EditorialGrid>
          <BlueGlow />
          <GoldGlow />

          <ServicesGrid>
            {serviceCards.map((service, index) => (
              <ServiceCard
                key={service.id}
                $size={service.size}
                $accent={accents[service.id]}
                $reveal={service.reveal}
              >
                <ServiceIndex>{`0${index + 1}`}</ServiceIndex>
                <ServiceGlow />

                <Eyebrow>{t('services.eyebrow')}</Eyebrow>
                <Title>{t(`services.items.${service.id}.title`)}</Title>
                <Description>{t(`services.items.${service.id}.description`)}</Description>

                <FooterRow>
                  <div>
                    <MetaEyebrow>{t(`services.items.${service.id}.duration`)}</MetaEyebrow>
                    <Price>{t(`services.items.${service.id}.price`)}</Price>
                  </div>
                  <MiniCta href="#booking">{t('services.miniCta')}</MiniCta>
                </FooterRow>
              </ServiceCard>
            ))}
          </ServicesGrid>
        </EditorialGrid>
      </Container>
    </Section>
  );
};
