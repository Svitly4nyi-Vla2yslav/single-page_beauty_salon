import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { SectionHeading } from '../components/SectionHeading';
import { serviceCards } from '../data/site';
import { useScrollReveal } from '../hooks/useScrollReveal';

const serviceImages = import.meta.glob('../assets/service/*.{png,jpg,jpeg,webp,avif}', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

const normalizeImageKey = (value: string) =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '');

const serviceImageEntries = Object.entries(serviceImages).map(([path, source]) => {
  const fileName = path.split('/').pop()?.replace(/\.[^.]+$/, '') ?? path;

  return {
    source,
    normalizedName: normalizeImageKey(fileName),
  };
});

const serviceImageHints: Record<string, string[]> = {
  lashes: ['lash extensions', 'lashes'],
  brows: ['brow styling', 'brows'],
  facial: ['facial treatment', 'facial'],
  pmu: ['permanent make-up', 'permanent makeup', 'pmu'],
  headSpa: ['head spa'],
  antiAging: ['anti-aging treatment', 'anti aging treatment'],
  makeup: ['make-up', 'makeup'],
  consulting: ['skincare consultation', 'consultation'],
};

const serviceSpanConfig: Record<
  string,
  {
    md: number;
    lg: number;
  }
> = {
  lashes: { md: 4, lg: 4 },
  brows: { md: 2, lg: 2 },
  facial: { md: 2, lg: 3 },
  pmu: { md: 4, lg: 3 },
  headSpa: { md: 3, lg: 3 },
  antiAging: { md: 3, lg: 3 },
  makeup: { md: 3, lg: 2 },
  consulting: { md: 3, lg: 4 },
};

const resolveServiceImage = (serviceId: string, title: string) => {
  const candidates = [title, serviceId, ...(serviceImageHints[serviceId] ?? [])]
    .map(normalizeImageKey)
    .filter(Boolean);

  for (const candidate of candidates) {
    const exactMatch = serviceImageEntries.find((entry) => entry.normalizedName === candidate);

    if (exactMatch) {
      return exactMatch.source;
    }

    const partialMatch = serviceImageEntries.find(
      (entry) => entry.normalizedName.includes(candidate) || candidate.includes(entry.normalizedName),
    );

    if (partialMatch) {
      return partialMatch.source;
    }
  }

  return serviceImageEntries[0]?.source ?? '';
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
    background: radial-gradient(circle at center, rgba(212, 175, 55, 0.1), transparent 70%);
    filter: blur(18px);
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

const EditorialGrid = styled.div`
  position: relative;
  margin-top: 3.5rem;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 2.6rem;
  padding: 1rem;
  background-image:
    linear-gradient(rgba(17, 17, 17, 0.03) 1px, transparent 0),
    linear-gradient(90deg, rgba(17, 17, 17, 0.03) 1px, transparent 0);
  background-size: 52px 52px;

  @media (min-width: 768px) {
    padding: 1.5rem;
  }
`;

const BlueGlow = styled.div`
  position: absolute;
  top: 2rem;
  left: -5rem;
  height: 12rem;
  width: 12rem;
  border-radius: 999px;
  background: rgba(110, 198, 255, 0.15);
  filter: blur(64px);
`;

const GoldGlow = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  height: 14rem;
  width: 14rem;
  border-radius: 999px;
  background: rgba(212, 175, 55, 0.12);
  filter: blur(64px);
`;

const ServicesGrid = styled.div`
  position: relative;
  display: grid;
  gap: 1.25rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(6, minmax(0, 1fr));
  }
`;

const ServiceCard = styled.article<{ $mdSpan: number; $lgSpan: number }>`
  --service-card-radius: 2rem;
  position: relative;
  isolation: isolate;
  overflow: hidden;
  min-height: 17rem;
  border: 1px solid rgba(220, 196, 170, 0.72);
  border-radius: var(--service-card-radius);
  background: linear-gradient(180deg, rgba(255, 248, 241, 0.82), rgba(252, 242, 233, 0.64));
  box-shadow:
    0 24px 55px rgba(88, 65, 46, 0.09),
    0 0 0 1px rgba(255, 255, 255, 0.44),
    0 18px 42px rgba(255, 247, 239, 0.42);
  transition:
    transform 650ms cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 650ms cubic-bezier(0.22, 1, 0.36, 1),
    border-color 650ms ease;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    padding: 1px;
    background: linear-gradient(
      135deg,
      rgba(244, 221, 193, 0.92),
      rgba(255, 246, 236, 0.74),
      rgba(234, 201, 182, 0.85)
    );
    -webkit-mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    mask-composite: exclude;
    pointer-events: none;
  }

  &:hover {
    transform: translateY(-10px);
    border-color: rgba(232, 210, 183, 0.96);
    box-shadow:
      0 36px 80px rgba(88, 65, 46, 0.14),
      0 0 0 1px rgba(255, 255, 255, 0.52),
      0 22px 54px rgba(255, 245, 235, 0.5);
  }

  @media (min-width: 768px) {
    grid-column: span ${({ $mdSpan }) => $mdSpan};
  }

  @media (min-width: 1024px) {
    grid-column: span ${({ $lgSpan }) => $lgSpan};
  }
`;

const CardVisual = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
  border-radius: var(--service-card-radius);
  clip-path: inset(0 round var(--service-card-radius));
  pointer-events: none;
  transform: translateZ(0);
`;

const CardMedia = styled.div<{ $image: string }>`
  position: absolute;
  inset: 0;
  border-radius: var(--service-card-radius);
  clip-path: inset(0 round var(--service-card-radius));
  background-image: url(${({ $image }) => $image});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  filter: saturate(0.88) brightness(0.92) contrast(0.98);
  transform: scale(1);
  transition:
    transform 1300ms cubic-bezier(0.22, 1, 0.36, 1),
    filter 900ms ease;

  ${ServiceCard}:hover & {
    filter: saturate(0.94) brightness(0.98) contrast(1.02);
    transform: scale(1.065);
  }
`;

const CardOverlay = styled.div`
  position: absolute;
  inset: 0;
  border-radius: var(--service-card-radius);
  clip-path: inset(0 round var(--service-card-radius));
  background:
    linear-gradient(
      180deg,
      rgba(255, 252, 247, 0.34) 0%,
      rgba(250, 239, 230, 0.44) 32%,
      rgba(238, 220, 204, 0.58) 100%
    ),
    linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.44) 0%,
      rgba(255, 245, 235, 0.24) 38%,
      rgba(255, 240, 232, 0.06) 68%,
      rgba(255, 240, 232, 0) 100%
    );
  transition: background 700ms ease;

  ${ServiceCard}:hover & {
    background:
      linear-gradient(
        180deg,
        rgba(255, 252, 247, 0.28) 0%,
        rgba(250, 239, 230, 0.36) 32%,
        rgba(238, 220, 204, 0.48) 100%
      ),
      linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.5) 0%,
        rgba(255, 245, 235, 0.28) 40%,
        rgba(255, 240, 232, 0.08) 74%,
        rgba(255, 240, 232, 0) 100%
      );
  }
`;

const CardLightBlob = styled.div`
  position: absolute;
  top: -16%;
  left: -10%;
  height: 11rem;
  width: 11rem;
  border-radius: 999px;
  background: radial-gradient(
    circle,
    rgba(255, 238, 226, 0.44) 0%,
    rgba(255, 235, 220, 0.14) 45%,
    transparent 72%
  );
  filter: blur(22px);
  opacity: 0.72;
  transform: translate3d(0, 0, 0) scale(0.96);
  transition:
    opacity 800ms ease,
    transform 1200ms cubic-bezier(0.22, 1, 0.36, 1);

  ${ServiceCard}:hover & {
    opacity: 0.95;
    transform: translate3d(10%, 6%, 0) scale(1.08);
  }
`;

const CardSheen = styled.div`
  position: absolute;
  inset: 0;
  border-radius: var(--service-card-radius);
  clip-path: inset(0 round var(--service-card-radius));
  background: linear-gradient(
    105deg,
    transparent 0%,
    transparent 34%,
    rgba(255, 255, 255, 0.08) 45%,
    rgba(255, 244, 232, 0.4) 50%,
    rgba(255, 255, 255, 0.08) 55%,
    transparent 66%,
    transparent 100%
  );
  mix-blend-mode: screen;
  opacity: 0;
  transform: translateX(-115%);
  transition:
    transform 1200ms cubic-bezier(0.22, 1, 0.36, 1),
    opacity 700ms ease;

  ${ServiceCard}:hover & {
    opacity: 0.78;
    transform: translateX(115%);
  }
`;

const CardBorderGlow = styled.div`
  position: absolute;
  inset: 0;
  border: 1px solid rgba(255, 251, 247, 0.72);
  border-radius: var(--service-card-radius);
  clip-path: inset(0 round var(--service-card-radius));
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.34),
    inset 0 -1px 0 rgba(255, 244, 234, 0.18);
  opacity: 0.82;
  transition:
    opacity 650ms ease,
    box-shadow 650ms ease,
    border-color 650ms ease;

  ${ServiceCard}:hover & {
    opacity: 1;
    border-color: rgba(255, 251, 247, 0.94);
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.42),
      inset 0 -1px 0 rgba(255, 244, 234, 0.24),
      0 0 0 1px rgba(255, 251, 247, 0.36),
      0 0 34px rgba(255, 243, 232, 0.22);
  }
`;

const ServiceIndex = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 2;
  border: 1px solid rgba(255, 255, 255, 0.38);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.18);
  padding: 0.25rem 0.75rem;
  color: rgba(255, 255, 255, 0.96);
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  backdrop-filter: blur(12px);
`;

const CardContent = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  height: 100%;
  flex-direction: column;
  padding: 1.5rem;

  @media (min-width: 768px) {
    padding: 1.75rem;
  }
`;

const Eyebrow = styled.p`
  color: rgba(49, 34, 23, 0.68);
  font-size: 0.75rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
`;

const Title = styled.h3`
  margin-top: 1.25rem;
  max-width: 14ch;
  color: #221714;
  font-family: 'Cormorant Garamond', serif;
  font-size: 3rem;
  line-height: 0.95;
  text-shadow: 0 8px 22px rgba(255, 255, 255, 0.18);
`;

const Description = styled.p`
  margin-top: 1rem;
  max-width: 48ch;
  color: rgba(45, 31, 23, 0.82);
  font-size: 0.875rem;
  line-height: 1.75rem;
`;

const FooterRow = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
  margin-top: auto;
  padding-top: 2rem;
`;

const MetaEyebrow = styled.p`
  color: rgba(51, 37, 29, 0.64);
  font-size: 0.75rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
`;

const Price = styled.p`
  margin-top: 0.5rem;
  color: #191210;
  font-size: 1.5rem;
  font-weight: 600;
  text-shadow: none;
`;

const MiniCta = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.72);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.18);
  padding: 0.75rem 1rem;
  color: rgba(35, 24, 17, 0.9);
  font-size: 0.875rem;
  font-weight: 600;
  text-decoration: none;
  white-space: nowrap;
  backdrop-filter: blur(12px);
  transition:
    transform 500ms cubic-bezier(0.22, 1, 0.36, 1),
    background-color 500ms ease,
    border-color 500ms ease,
    box-shadow 500ms ease,
    color 500ms ease;

  ${ServiceCard}:hover & {
    transform: translateY(-1px);
    border-color: rgba(255, 255, 255, 0.9);
    background: rgba(255, 255, 255, 0.26);
    box-shadow: 0 10px 28px rgba(109, 82, 59, 0.14);
    color: rgba(28, 19, 14, 0.96);
  }
`;

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
          <BlueGlow data-parallax="slow" />
          <GoldGlow data-parallax="medium" />

          <ServicesGrid>
            {serviceCards.map((service, index) => {
              const title = t(`services.items.${service.id}.title`);
              const image = resolveServiceImage(service.id, title);
              const spans = serviceSpanConfig[service.id] ?? { md: 3, lg: 3 };

              return (
                <ServiceCard
                  key={service.id}
                  $mdSpan={spans.md}
                  $lgSpan={spans.lg}
                  data-reveal={service.reveal}
                >
                  <CardVisual>
                    <CardMedia $image={image} />
                    <CardOverlay />
                    <CardLightBlob />
                    <CardSheen />
                    <CardBorderGlow />
                  </CardVisual>

                  <ServiceIndex>{`0${index + 1}`}</ServiceIndex>

                  <CardContent>
                    <Eyebrow>{t('services.eyebrow')}</Eyebrow>
                    <Title>{title}</Title>
                    <Description>{t(`services.items.${service.id}.description`)}</Description>

                    <FooterRow>
                      <div>
                        <MetaEyebrow>{t(`services.items.${service.id}.duration`)}</MetaEyebrow>
                        <Price>{t(`services.items.${service.id}.price`)}</Price>
                      </div>
                      <MiniCta href="#booking">{t('services.miniCta')}</MiniCta>
                    </FooterRow>
                  </CardContent>
                </ServiceCard>
              );
            })}
          </ServicesGrid>
        </EditorialGrid>
      </Container>
    </Section>
  );
};
