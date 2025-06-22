import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
en: {
  translation: {
    "Scan History": "Scan History",
    "No scan history found.": "No scan history found.",
    "Unknown URL": "Unknown URL",
    "Safe": "Safe",
    "Not Safe": "Not Safe"
  }
},
es: {
  translation: {
    "Scan History": "Historial de Escaneos",
    "No scan history found.": "No se encontró historial de escaneos.",
    "Unknown URL": "URL desconocida",
    "Safe": "Seguro",
    "Not Safe": "No seguro"
  }
}
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;