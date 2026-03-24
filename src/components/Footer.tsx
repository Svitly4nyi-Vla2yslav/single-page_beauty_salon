import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { legalKeys, navigationItems } from '../data/site';
import { LanguageSwitcher } from './LanguageSwitcher';

const FooterShell = styled.footer.attrs({
  className: 'section-shell px-4 pb-8 pt-12 md:px-8',
})``;

const FooterCard = styled.div.attrs({
  className: 'mx-auto max-w-7xl rounded-[2.5rem] bg-ink px-6 py-10 text-white md:px-10 md:py-14',
})``;

const FooterGrid = styled.div.attrs({
  className: 'grid gap-10 lg:grid-cols-[1.5fr_1fr_1fr]',
})``;

const BrandTitle = styled.p.attrs({
  className: 'font-display text-4xl',
})``;

const BrandDescription = styled.p.attrs({
  className: 'mt-3 max-w-xl text-sm leading-7 text-white/68',
})``;

const LanguageRow = styled.div.attrs({
  className: 'mt-6',
})``;

const ColumnTitle = styled.p.attrs({
  className: 'text-sm font-semibold uppercase tracking-[0.2em] text-white/45',
})``;

const LinkGrid = styled.div.attrs({
  className: 'mt-5 grid gap-3',
})``;

const FooterLink = styled.a.attrs({
  className: 'text-sm text-white/70 transition hover:text-white',
})``;

const LegalButtons = styled.div.attrs({
  className: 'mt-5 flex flex-wrap gap-2',
})``;

const LegalButton = styled.button.attrs<{ $active: boolean }>(({ $active }) => ({
  className: `rounded-full px-4 py-2 text-xs font-semibold transition ${
    $active ? 'bg-white text-ink' : 'bg-white/10 text-white/70'
  }`,
}))``;

const LegalBody = styled.div.attrs({
  className: 'mt-5 rounded-[1.5rem] border border-white/10 bg-white/5 p-5 text-sm leading-7 text-white/70',
})``;

const FooterBottom = styled.div.attrs({
  className: 'mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-white/50 md:flex-row md:items-center md:justify-between',
})``;

const SocialLinks = styled.div.attrs({
  className: 'flex flex-wrap gap-4',
})``;

const SocialLink = styled.a.attrs({
  className: 'hover:text-white',
})``;

export const Footer = () => {
  const { t } = useTranslation();
  const [activeLegal, setActiveLegal] = useState<(typeof legalKeys)[number]>('imprint');

  return (
    <FooterShell id="footer">
      <FooterCard>
        <FooterGrid>
          <div>
            <BrandTitle>Lumina Atelier</BrandTitle>
            <BrandDescription>{t('seo.description')}</BrandDescription>
            <LanguageRow>
              <LanguageSwitcher />
            </LanguageRow>
          </div>

          <div>
            <ColumnTitle>{t('footer.quickLinks')}</ColumnTitle>
            <LinkGrid>
              {navigationItems.slice(1).map((item) => (
                <FooterLink key={item.key} href={item.href}>
                  {t(`nav.${item.key}`)}
                </FooterLink>
              ))}
            </LinkGrid>
          </div>

          <div>
            <ColumnTitle>{t('footer.legal')}</ColumnTitle>
            <LegalButtons>
              {legalKeys.map((key) => (
                <LegalButton
                  key={key}
                  type="button"
                  $active={activeLegal === key}
                  onClick={() => setActiveLegal(key)}
                >
                  {t(`footer.legalTexts.${key}.title`)}
                </LegalButton>
              ))}
            </LegalButtons>
            <LegalBody>{t(`footer.legalTexts.${activeLegal}.body`)}</LegalBody>
          </div>
        </FooterGrid>

        <FooterBottom>
          <SocialLinks>
            <SocialLink href="https://instagram.com" target="_blank" rel="noreferrer">
              Instagram
            </SocialLink>
            <SocialLink href="https://wa.me/49305558210" target="_blank" rel="noreferrer">
              WhatsApp
            </SocialLink>
          </SocialLinks>
          <p>{t('footer.copyright')}</p>
        </FooterBottom>
      </FooterCard>
    </FooterShell>
  );
};
