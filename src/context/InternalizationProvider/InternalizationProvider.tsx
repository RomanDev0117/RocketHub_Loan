import React, { createContext, useContext } from 'react';

import { setContext as setSentryContext } from '@sentry/react';
import useLocalStorage from 'react-use/lib/useLocalStorage';
// import enUS from 'date-fns/esm/locale/en-US';
// import fr from 'date-fns/esm/locale/fr';
import { I18nPropvider, LOCALE } from '../../i18n';

type TInternalizationContext = {
  locale: LOCALE;
  isEnglish: boolean;
  changeLocale: (locale: LOCALE) => void;
};

// TODO: work on date fns localization
// const formatLocalizationMap = {
//   [LOCALE.ENGLISH]: enUS,
//   [LOCALE.FRENCH]: fr,
// };


const InternalizationContext = createContext({} as TInternalizationContext);

export const InternalizationContextProvider = (props: { children: React.ReactNode }) => {
  const [locale = LOCALE.ENGLISH, setLocale] = useLocalStorage<LOCALE>(
    'language',
    LOCALE.ENGLISH,
  );

  const changeLocale = (newLocale: LOCALE) => {
    setLocale(newLocale);

    setSentryContext('userInfo', {
      userSelectedLocale: newLocale,
    });
  };

  return (
    <InternalizationContext.Provider
      value={{
        locale,
        changeLocale,
        isEnglish: locale.startsWith('en'),
      }}
    >
      <I18nPropvider locale={locale}>{props.children}</I18nPropvider>
    </InternalizationContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useInternalizationContext = () => useContext(InternalizationContext);
