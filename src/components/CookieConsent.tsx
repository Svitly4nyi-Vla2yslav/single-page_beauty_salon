import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

type ConsentState = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
};

const storageKey = 'lumina-cookie-consent';

const ManageButton = styled.button.attrs({
  className:
    'fixed bottom-5 left-5 z-40 rounded-full border border-black/10 bg-white/90 px-4 py-3 text-xs font-semibold text-black/70 shadow-lg backdrop-blur',
})``;

const Banner = styled.div.attrs({
  className:
    'fixed inset-x-4 bottom-4 z-50 mx-auto max-w-4xl rounded-[2rem] border border-black/10 bg-white/92 p-6 shadow-2xl shadow-black/10 backdrop-blur-xl',
})``;

const BannerLayout = styled.div.attrs({
  className: 'flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between',
})``;

const BannerContent = styled.div.attrs({
  className: 'max-w-2xl',
})``;

const BannerEyebrow = styled.p.attrs({
  className: 'text-xs font-semibold uppercase tracking-[0.28em] text-black/45',
})``;

const BannerTitle = styled.h3.attrs({
  className: 'mt-3 font-display text-3xl text-ink',
})``;

const BannerDescription = styled.p.attrs({
  className: 'mt-3 text-sm leading-7 text-black/65',
})``;

const OptionsGrid = styled.div.attrs({
  className: 'mt-5 grid gap-3 md:grid-cols-3',
})``;

const OptionCard = styled.label.attrs({
  className: 'rounded-3xl border border-black/8 bg-black/[0.02] p-4 text-sm text-black/70',
})``;

const OptionHeader = styled.div.attrs({
  className: 'flex items-center justify-between gap-4',
})``;

const OptionTitle = styled.span.attrs({
  className: 'font-semibold text-black',
})``;

const OptionBody = styled.p.attrs({
  className: 'mt-3 text-xs leading-6 text-black/55',
})``;

const Actions = styled.div.attrs({
  className: 'flex flex-col gap-3 md:flex-row',
})``;

const PrimaryAction = styled.button.attrs({
  className: 'rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white',
})``;

const SecondaryAction = styled.button.attrs({
  className: 'rounded-full border border-black/12 px-5 py-3 text-sm font-semibold text-black/70',
})``;

const AccentAction = styled.button.attrs({
  className: 'rounded-full border border-gold/40 bg-gold/10 px-5 py-3 text-sm font-semibold text-black',
})``;

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
                    <input
                      type="checkbox"
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
  );
};
