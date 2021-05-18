import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import XHR from 'i18next-xhr-backend';

i18n
  .use(initReactI18next)
  .use(XHR)
  .use(LanguageDetector)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    fallbackLng: 'en',
    debug: process?.env?.NODE_ENV !== 'production' || false,

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });

// eslint-disable-next-line import/no-default-export
export default i18n;
