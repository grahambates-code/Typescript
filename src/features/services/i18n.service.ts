import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import englishResource from "../translations/en.translation.json";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: englishResource,
    },
  },
  lng: "en",
  fallbackLng: "en",
  debug: false,

  interpolation: {
    escapeValue: false,
  },
  // react: {
  //   wait: true,
  //   useSuspense: false,
  // },
});

export default i18n;
