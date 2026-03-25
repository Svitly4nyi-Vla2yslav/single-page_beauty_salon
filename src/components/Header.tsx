import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { navigationItems } from '../data/site';
import { LanguageSwitcher } from './LanguageSwitcher';

const HeaderShell = styled.header`
  position: fixed;
  inset: 0 0 auto;
  z-index: 50;
  padding: 0.8rem 0.8rem 0;

  @media (min-width: 768px) {
    padding: 0.95rem 1.25rem 0;
  }
`;

const HeaderBar = styled.div<{ $solid: boolean }>`
  width: min(100%, 84rem);
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.82rem 0.95rem;
  border: 1px solid ${({ $solid }) => ($solid ? 'rgba(175, 145, 117, 0.2)' : 'transparent')};
  border-radius: 1.45rem;
  background: ${({ $solid }) =>
    $solid
      ? 'rgba(255, 252, 248, 0.9)'
      : 'transparent'};
  box-shadow: ${({ $solid }) =>
    $solid ? '0 16px 40px rgba(126, 106, 89, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)' : 'none'};
  backdrop-filter: ${({ $solid }) => ($solid ? 'blur(18px)' : 'none')};
  -webkit-backdrop-filter: ${({ $solid }) => ($solid ? 'blur(18px)' : 'none')};
  transition:
    background-color 0.35s ease,
    border-color 0.35s ease,
    box-shadow 0.35s ease,
    backdrop-filter 0.35s ease;

  @media (min-width: 768px) {
    padding: 0.85rem 1.2rem;
  }
`;

const Brand = styled.a`
  display: flex;
  align-items: center;
  gap: 0.85rem;
  min-width: 0;
`;

const BrandMark = styled.div`
  position: relative;
  display: grid;
  place-items: center;
  width: 3rem;
  height: 3rem;
  flex: 0 0 auto;
  border-radius: 1rem;
  border: 1px solid rgba(189, 155, 101, 0.3);
  background:
    radial-gradient(circle at 0% 0%, rgba(255, 255, 255, 0.0), rgba(255, 248, 239, 0.0) 34%, rgba(82, 62, 48, 0.9) 100%),
    linear-gradient(135deg, rgba(212, 175, 55, 0.16), rgba(160, 195, 240, 0.1));
  box-shadow:
    0 12px 28px rgba(126, 106, 89, 0.12),
    inset 0 1px 0 rgba(255, 255, 255, 0.04);
`;

const BrandInnerRing = styled.div`
  position: absolute;
  inset: 0.24rem;
  border: 1px solid rgba(255, 255, 255, 0.22);
  border-radius: 0.8rem;
`;

const BrandLetters = styled.span`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.08rem;
  font-weight: 700;
  line-height: 1;
  color: #000000;
`;

const BrandText = styled.div`
  display: grid;
  gap: 0.08rem;
  min-width: 0;
`;

const BrandTitle = styled.p<{ $solid: boolean }>`
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(1.6rem, 2.35vw, 1.98rem);
  line-height: 0.92;
  color: ${({ $solid }) => ($solid ? '#372821' : '#fff9f4')};
  text-shadow: ${({ $solid }) => ($solid ? 'none' : '0 10px 28px rgba(0, 0, 0, 0.28)')};
`;

const BrandSubtitle = styled.p<{ $solid: boolean }>`
  padding-left: 0.08rem;
  font-size: 0.55rem;
  font-weight: 700;
  letter-spacing: 0.33em;
  text-transform: uppercase;
  color: ${({ $solid }) => ($solid ? 'rgba(99, 75, 57, 0.58)' : 'rgba(255, 244, 234, 0.76)')};
  text-shadow: ${({ $solid }) => ($solid ? 'none' : '0 8px 22px rgba(0, 0, 0, 0.28)')};
`;

const DesktopShell = styled.div`
  display: none;

  @media (min-width: 1024px) {
    display: flex;
    align-items: center;
    min-width: 0;
  }
`;

const DesktopNav = styled.nav`
  display: flex;
  align-items: center;
  gap: 1.35rem;
  padding-right: 1.8rem;
`;

const NavLink = styled.a<{ $solid: boolean }>`
  font-size: 0.9rem;
  font-weight: 600;
  color: ${({ $solid }) => ($solid ? 'rgba(77, 57, 43, 0.8)' : 'rgba(255, 248, 241, 0.88)')};
  text-shadow: ${({ $solid }) => ($solid ? 'none' : '0 8px 24px rgba(0, 0, 0, 0.28)')};
  transition: color 0.2s ease;

  &:hover,
  &:focus-visible {
    color: ${({ $solid }) => ($solid ? '#2f221b' : '#ffffff')};
    outline: none;
  }
`;

const DesktopActions = styled.div<{ $solid: boolean }>`
  margin-left: 1.85rem;
  padding-left: 1.85rem;
  display: flex;
  align-items: center;
  gap: 0.95rem;
  border-left: 1px solid ${({ $solid }) => ($solid ? 'rgba(171, 142, 115, 0.16)' : 'rgba(255, 244, 233, 0.2)')};
`;

const BookingLink = styled.a<{ $solid: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 2.95rem;
  padding: 0.8rem 1.22rem;
  border-radius: 999px;
  background: ${({ $solid }) => ($solid ? '#3a2c23' : 'rgba(255, 250, 244, 0.14)')};
  color: ${({ $solid }) => ($solid ? '#fff8f1' : '#fff9f3')};
  border: 1px solid ${({ $solid }) => ($solid ? 'transparent' : 'rgba(255, 243, 231, 0.3)')};
  font-size: 0.9rem;
  font-weight: 700;
  box-shadow: ${({ $solid }) => ($solid ? '0 12px 24px rgba(83, 62, 46, 0.14)' : '0 12px 30px rgba(0, 0, 0, 0.18)')};
  text-shadow: ${({ $solid }) => ($solid ? 'none' : '0 8px 22px rgba(0, 0, 0, 0.28)')};
  transition:
    transform 0.2s ease,
    background-color 0.2s ease,
    border-color 0.2s ease;

  &:hover,
  &:focus-visible {
    transform: translateY(-1px);
    background: ${({ $solid }) => ($solid ? '#2f231c' : 'rgba(255, 250, 244, 0.22)')};
    outline: none;
  }
`;

const MobileToggle = styled.button<{ $solid: boolean }>`
  display: inline-flex;
  width: 2.8rem;
  height: 2.8rem;
  align-items: center;
  justify-content: center;
  border: 1px solid ${({ $solid }) => ($solid ? 'rgba(171, 142, 115, 0.18)' : 'rgba(255, 245, 235, 0.24)')};
  border-radius: 999px;
  background: ${({ $solid }) => ($solid ? 'rgba(255, 252, 248, 0.76)' : 'rgba(255, 250, 244, 0.08)')};
  backdrop-filter: ${({ $solid }) => ($solid ? 'blur(10px)' : 'none')};
  -webkit-backdrop-filter: ${({ $solid }) => ($solid ? 'blur(10px)' : 'none')};

  @media (min-width: 1024px) {
    display: none;
  }
`;

const ToggleLines = styled.span`
  display: grid;
  gap: 0.26rem;
`;

const ToggleLine = styled.span<{ $solid: boolean }>`
  display: block;
  width: 1.1rem;
  height: 0.12rem;
  border-radius: 999px;
  background: ${({ $solid }) => ($solid ? '#4a382c' : '#fff7f0')};
`;

const MobileMenu = styled.div`
  width: min(100%, 84rem);
  margin: 0.72rem auto 0;
  padding: 1rem;
  border: 1px solid rgba(171, 142, 115, 0.16);
  border-radius: 1.35rem;
  background: rgba(255, 252, 248, 0.92);
  box-shadow: 0 18px 44px rgba(126, 106, 89, 0.12);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);

  @media (min-width: 1024px) {
    display: none;
  }
`;

const MobileLanguageRow = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 0.88rem;
`;

const MobileNav = styled.div`
  display: grid;
  gap: 0.62rem;
`;

const MobileNavLink = styled.a`
  display: block;
  padding: 0.86rem 0.96rem;
  border: 1px solid rgba(171, 142, 115, 0.14);
  border-radius: 0.95rem;
  background: rgba(255, 255, 255, 0.6);
  color: #4a382c;
  font-weight: 600;
`;

export const Header = () => {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const solidHeader = scrolled || menuOpen;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen);
    return () => document.body.classList.remove('menu-open');
  }, [menuOpen]);

  return (
    <HeaderShell>
      <HeaderBar $solid={solidHeader}>
        <Brand href="#hero" data-cursor="hover" data-cursor-label={t('nav.home')}>
          <BrandMark>
            <BrandInnerRing />
            <BrandLetters>LA</BrandLetters>
          </BrandMark>
          <BrandText>
            <BrandTitle $solid={solidHeader}>Lumina Atelier</BrandTitle>
            <BrandSubtitle $solid={solidHeader}>Hildesheim Beauty House</BrandSubtitle>
          </BrandText>
        </Brand>

        <DesktopShell>
          <DesktopNav>
            {navigationItems.map((item) => (
              <NavLink key={item.key} href={item.href} $solid={solidHeader}>
                {t(`nav.${item.key}`)}
              </NavLink>
            ))}
          </DesktopNav>

          <DesktopActions $solid={solidHeader}>
            <LanguageSwitcher compact tone={solidHeader ? 'dark' : 'light'} />
            <BookingLink href="#booking" $solid={solidHeader} data-cursor-label={t('common.bookNow')}>
              {t('common.bookNow') || 'Termin buchen'}
            </BookingLink>
          </DesktopActions>
        </DesktopShell>

        <MobileToggle
          $solid={solidHeader}
          type="button"
          onClick={() => setMenuOpen((current) => !current)}
          aria-label="Toggle navigation"
        >
          <ToggleLines>
            <ToggleLine $solid={solidHeader} />
            <ToggleLine $solid={solidHeader} />
          </ToggleLines>
        </MobileToggle>
      </HeaderBar>

      {menuOpen ? (
        <MobileMenu>
          <MobileLanguageRow>
            <LanguageSwitcher tone="dark" />
          </MobileLanguageRow>
          <MobileNav>
            {navigationItems.map((item) => (
              <MobileNavLink key={item.key} href={item.href} onClick={() => setMenuOpen(false)}>
                {t(`nav.${item.key}`)}
              </MobileNavLink>
            ))}
          </MobileNav>
        </MobileMenu>
      ) : null}
    </HeaderShell>
  );
};
