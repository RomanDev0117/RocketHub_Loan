import { LOCALE } from '../constants';
import en from './en-US.json';
import fr from './fr-FR.json';
import defaultTranslations from './translations.json';

const translations = {
  [LOCALE.ENGLISH]: en,
  [LOCALE.FRENCH]: fr,
};

if (
  import.meta.env.MODE === 'development' &&
  import.meta.env.VITE_USE_RAW_TRANSLATIONS === 'true'
) {
  translations[LOCALE.ENGLISH] = defaultTranslations;
  // TODO: replace breaklines here
}

export default translations;
