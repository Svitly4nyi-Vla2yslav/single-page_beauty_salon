import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled, { css } from 'styled-components';

type ConsentState = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
};

const storageKey = 'lumina-cookie-consent';

const sharedButtonStyles = css`
  appearance: none;
  border-radius: 999px;
  padding: 0.88rem 1.4rem;
  font-size: 0.95rem;
  font-weight: 600;
  line-height: 1;
  transition:
    transform 0.22s ease,
    background-color 0.22s ease,
    border-color 0.22s ease,
    color 0.22s ease,
    box-shadow 0.22s ease;

  &:hover {
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline: 2px solid rgba(17, 17, 17, 0.35);
    outline-offset: 3px;
  }
`;

const ManageButton = styled.button`
  ${sharedButtonStyles};
  position: fixed;
  bottom: 1.25rem;
  left: 1.25rem;
  z-index: 40;
  border: 1px solid rgba(17, 17, 17, 0.1);
  background: rgba(255, 255, 255, 0.9);
  color: rgba(17, 17, 17, 0.72);
  padding: 0.9rem 1rem;
  font-size: 0.75rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
`;

const Banner = styled.div`
  position: fixed;
  left: 1rem;
  right: 1rem;
  bottom: 1rem;
  z-index: 50;
  width: calc(100% - 2rem);
  max-width: 64rem;
  margin: 0 auto;
  padding: 1.5rem;
  border: 1px solid rgba(17, 17, 17, 0.1);
  border-radius: 2rem;
  background: rgba(255, 255, 255, 0.92);
  box-shadow:
    0 25px 50px -12px rgba(17, 17, 17, 0.18),
    0 10px 30px rgba(17, 17, 17, 0.08);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);

  @media (min-width: 768px) {
    padding: 1.75rem;
  }
`;

const BannerBackdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 40;
  /* background: rgba(255, 255, 255, 0.18); */
  /* backdrop-filter: blur(12px); */
  /* -webkit-backdrop-filter: blur(12px); */
  /* mask-image: linear-gradient(to top, black 0%, black 42%, transparent 98%); */
  /* -webkit-mask-image: linear-gradient(to top, black 0%, black 42%, transparent 98%); */
`;

const BannerLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (min-width: 1024px) {
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
  }
`;

const BannerContent = styled.div`
  max-width: 42rem;
`;

const BannerEyebrow = styled.p`
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: rgba(17, 17, 17, 0.45);
`;

const BannerTitle = styled.h3`
  margin-top: 0.75rem;
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.875rem;
  line-height: 1.05;
  color: #111111;
`;

const BannerDescription = styled.p`
  margin-top: 0.75rem;
  font-size: 0.875rem;
  line-height: 1.75;
  color: rgba(17, 17, 17, 0.65);
`;

const OptionsGrid = styled.div`
  display: grid;
  gap: 0.75rem;
  margin-top: 1.25rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

const OptionCard = styled.label`
  display: block;
  padding: 1rem;
  border: 1px solid rgba(17, 17, 17, 0.08);
  border-radius: 1.5rem;
  background: rgba(0, 0, 0, 0.02);
  color: rgba(17, 17, 17, 0.7);
`;

const OptionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;

const OptionTitle = styled.span`
  font-size: 0.95rem;
  font-weight: 600;
  color: #111111;
`;

const ConsentToggle = styled.input.attrs({ type: 'checkbox' })`
  width: 1.15rem;
  height: 1.15rem;
  accent-color: #111111;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.65;
  }
`;

const OptionBody = styled.p`
  margin-top: 0.75rem;
  font-size: 0.75rem;
  line-height: 1.5;
  color: rgba(17, 17, 17, 0.55);
`;

const Actions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const PrimaryAction = styled.button`
  ${sharedButtonStyles};
  border: 1px solid transparent;
  background: #111111;
  color: #ffffff;

  &:hover {
    background: #1f1f1f;
  }
`;

const SecondaryAction = styled.button`
  ${sharedButtonStyles};
  border: 1px solid rgba(17, 17, 17, 0.12);
  background: transparent;
  color: rgba(17, 17, 17, 0.72);

  &:hover {
    background: rgba(17, 17, 17, 0.05);
    color: #111111;
  }
`;

const AccentAction = styled.button`
  ${sharedButtonStyles};
  border: 1px solid rgba(212, 175, 55, 0.4);
  background: rgba(212, 175, 55, 0.1);
  color: #111111;

  &:hover {
    background: rgba(212, 175, 55, 0.18);
  }
`;

export const CookieConsent = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [customizing, setCustomizing] = useState(false);
  const [consent, setConsent] = useState<ConsentState>({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKey);
    if (saved) {
      setConsent(JSON.parse(saved) as ConsentState);
      setIsOpen(false);
      return;
    }
    setIsOpen(true);
  }, []);

  const saveConsent = (nextState: ConsentState) => {
    setConsent(nextState);
    window.localStorage.setItem(storageKey, JSON.stringify(nextState));
    setIsOpen(false);
    setCustomizing(false);
  };

  if (!isOpen) {
    return (
      <ManageButton type="button" onClick={() => setIsOpen(true)}>
        {t('cookies.manage')}
      </ManageButton>
    );
  }

  return (
    <>
      <BannerBackdrop aria-hidden="true" />
      <Banner>
        <BannerLayout>
          <BannerContent>
            <BannerEyebrow>{t('cookies.title')}</BannerEyebrow>
            <BannerTitle>{t('cookies.title')}</BannerTitle>
            <BannerDescription>{t('cookies.description')}</BannerDescription>

            {customizing ? (
              <OptionsGrid>
                {(['necessary', 'analytics', 'marketing'] as const).map((key) => (
                  <OptionCard key={key}>
                    <OptionHeader>
                      <OptionTitle>{t(`cookies.${key}`)}</OptionTitle>
                      <ConsentToggle
                        checked={consent[key]}
                        disabled={key === 'necessary'}
                        onChange={(event) =>
                          setConsent((current) => ({
                            ...current,
                            [key]: event.target.checked,
                          }))
                        }
                      />
                    </OptionHeader>
                    <OptionBody>{t(`cookies.${key}Desc`)}</OptionBody>
                  </OptionCard>
                ))}
              </OptionsGrid>
            ) : null}
          </BannerContent>

          <Actions>
            <PrimaryAction
              type="button"
              onClick={() => saveConsent({ necessary: true, analytics: true, marketing: true })}
            >
              {t('cookies.acceptAll')}
            </PrimaryAction>
            <SecondaryAction
              type="button"
              onClick={() => saveConsent({ necessary: true, analytics: false, marketing: false })}
            >
              {t('cookies.reject')}
            </SecondaryAction>
            {customizing ? (
              <AccentAction type="button" onClick={() => saveConsent(consent)}>
                {t('cookies.save')}
              </AccentAction>
            ) : (
              <SecondaryAction type="button" onClick={() => setCustomizing(true)}>
                {t('cookies.customize')}
              </SecondaryAction>
            )}
          </Actions>
        </BannerLayout>
      </Banner>
    </>
  );
};
