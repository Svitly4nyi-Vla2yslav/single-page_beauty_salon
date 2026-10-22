import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import de from './translations/de.json';
import en from './translations/en.json';
import uk from './translations/uk.json';
import tr from './translations/tr.json';

// Один ключ localStorage зберігає вибір між DE, EN, UK і TR між візитами;
// за відсутності збереженого значення інтерфейс та fallback використовують німецьку.
const languageStorageKey = 'lumina-language';
const storedLanguage = typeof window !== 'undefined' ? window.localStorage.getItem(languageStorageKey) : null;

void i18n.use(initReactI18next).init({
  resources: {
    de: { translation: de },
    en: { translation: en },
    uk: { translation: uk },
    tr: { translation: tr },
  },
  lng: storedLanguage ?? 'de',
  fallbackLng: 'de',
  interpolation: {
    escapeValue: false,
  },
});

// Після кожної зміни синхронізує локаль зі сховищем і атрибутом lang документа;
// це допомагає наступному запуску, скринридерам і пошуковим системам.
i18n.on('languageChanged', (language) => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(languageStorageKey, language);
    document.documentElement.lang = language;
  }
});

export default i18n;
