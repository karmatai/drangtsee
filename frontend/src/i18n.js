// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import eng from './locales/eng.json';
import tib from './locales/tib.json';

i18n.use(initReactI18next).init({
  resources: {
    eng: {
      translation: eng
    },
    tib: {
      translation: tib
    }
  },
  lng: "tib", // default language
  fallbackLng: "tib",
  interpolation: {
    escapeValue: false // react already safes from xss
  }
});

export default i18n;
