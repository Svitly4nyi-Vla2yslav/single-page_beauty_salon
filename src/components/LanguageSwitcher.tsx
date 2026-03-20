import { useTranslation } from 'react-i18next';
import { languageOptions } from '../data/site';
import { cn } from '../lib/utils';

type LanguageSwitcherProps = {
  compact?: boolean;
};

export const LanguageSwitcher = ({ compact = false }: LanguageSwitcherProps) => {
  const { i18n } = useTranslation();

  return (
    <div
      className={cn(
        'glass-panel luxury-border inline-flex items-center gap-1 rounded-full p-1',
        compact ? 'text-[10px]' : 'text-xs',
      )}
    >
      {languageOptions.map((language) => {
        const active = i18n.language === language.code;
        return (
          <button
            key={language.code}
            type="button"
            onClick={() => void i18n.changeLanguage(language.code)}
            className={cn(
              'rounded-full px-3 py-2 font-semibold tracking-[0.18em] transition',
              active ? 'bg-ink text-white' : 'text-black/65 hover:bg-black/5',
            )}
          >
            {language.label}
          </button>
        );
      })}
    </div>
  );
};
