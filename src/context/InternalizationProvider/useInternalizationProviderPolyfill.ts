// docs https://formatjs.io/docs/polyfills/intl-pluralrules

import { shouldPolyfill } from '@formatjs/intl-pluralrules/should-polyfill';
import { LOCALE } from '../../i18n';

const useInternalizationProviderPolyfill = () => {
  async function polyfillLocale(locale: LOCALE) {
    const language = locale.split('-')[0];

    const unsupportedLocale = shouldPolyfill(language) as string;
    // This locale is supported
    if (!unsupportedLocale) {
      return;
    }
    // Load the polyfill 1st BEFORE loading data
    await import('@formatjs/intl-pluralrules/polyfill-force');
    await import(`@formatjs/intl-pluralrules/locale-data/${unsupportedLocale}`);
  }

  return polyfillLocale;
};

export default useInternalizationProviderPolyfill;
