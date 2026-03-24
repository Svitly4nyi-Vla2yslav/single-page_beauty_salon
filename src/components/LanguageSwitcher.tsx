import { useTranslation } from 'react-i18next';
import styled, { css } from 'styled-components';
import { languageOptions } from '../data/site';

type LanguageSwitcherProps = {
  compact?: boolean;
  tone?: 'dark' | 'light';
};

const lightTone = css`
  border-color: rgba(255, 255, 255, 0.42);
  background: rgba(96, 78, 63, 0.24);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.18);
`;

const darkTone = css`
  border-color: rgba(171, 142, 115, 0.18);
  background: rgba(255, 252, 248, 0.82);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.86),
    0 10px 22px rgba(128, 107, 89, 0.08);
`;

const SwitcherShell = styled.div<{ $compact: boolean; $tone: 'dark' | 'light' }>`
  display: inline-flex;
  align-items: center;
  gap: 0.18rem;
  padding: 0.22rem;
  border: 1px solid;
  border-radius: 999px;
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  ${({ $compact }) =>
    $compact
      ? css`
          font-size: 0.6rem;
        `
      : css`
          font-size: 0.72rem;
        `}
  ${({ $tone }) => ($tone === 'light' ? lightTone : darkTone)}
`;

const LanguageButton = styled.button<{ $active: boolean; $tone: 'dark' | 'light' }>`
  min-width: ${({ $active }) => ($active ? '2.4rem' : '2.15rem')};
  padding: 0.54rem 0.72rem;
  border-radius: 999px;
  font-weight: 700;
  letter-spacing: 0.16em;
  transition:
    transform 0.2s ease,
    background-color 0.2s ease,
    color 0.2s ease;

  ${({ $tone, $active }) =>
    $tone === 'light'
      ? css`
          background: ${$active ? 'rgba(255, 250, 244, 0.92)' : 'transparent'};
          color: ${$active ? '#35261d' : 'rgba(255, 249, 242, 0.72)'};
        `
      : css`
          background: ${$active ? '#3a2c23' : 'transparent'};
          color: ${$active ? '#fff8f1' : 'rgba(91, 69, 52, 0.66)'};
        `}

  &:hover,
  &:focus-visible {
    transform: translateY(-1px);
    outline: none;
    background: ${({ $tone, $active }) =>
      $active ? undefined : $tone === 'light' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(91, 69, 52, 0.06)'};
  }
`;

export const LanguageSwitcher = ({ compact = false, tone = 'dark' }: LanguageSwitcherProps) => {
  const { i18n } = useTranslation();

  return (
    <SwitcherShell $compact={compact} $tone={tone}>
      {languageOptions.map((language) => {
        const active = i18n.language === language.code;
        return (
          <LanguageButton
            key={language.code}
            type="button"
            $active={active}
            $tone={tone}
            onClick={() => void i18n.changeLanguage(language.code)}
          >
            {language.label}
          </LanguageButton>
        );
      })}
    </SwitcherShell>
  );
};
