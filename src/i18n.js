import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translations from './translations/translations.json';

i18n
  .use(initReactI18next) 
  .init({
    resources: translations,
    lng: 'ar', // Start with Arabic
    fallbackLng: ['en', 'he'], // Fallback languages
    interpolation: {
      escapeValue: false, // React handles escaping
    },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
    debug: false, // Disable debug mode
    react: {
      useSuspense: false, // Disable suspense to prevent loading issues
    }
  });

// Function to set document direction and language
const setDocumentDirection = (language) => {
  const isRTL = language === "ar" || language === "he";
  document.documentElement.dir = isRTL ? "rtl" : "ltr";
  document.documentElement.lang = language;
};

// Set initial direction
setDocumentDirection(i18n.language);

// Listen for language changes
i18n.on('languageChanged', (lng) => {
  setDocumentDirection(lng);
});

export default i18n;
