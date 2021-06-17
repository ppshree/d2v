import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
// import LanguageDetector from 'i18next-browser-languagedetector';
import XHR from 'i18next-xhr-backend';
import translationEN from '../resources/translation-en.json';

i18n
  .use(XHR)
  .use(initReactI18next)

  // .use(LanguageDetector)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    resources: {
      en: { translations: translationEN },
    },
    lng: 'en',
    fallbackLng: 'en',
    ns: ['translations'],
    defaultNS: 'translations',
    // debug: process?.env?.NODE_ENV !== 'production' || false,
  });

// eslint-disable-next-line import/no-default-export
export default i18n;
