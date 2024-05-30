import React from 'react';
import { OnErrorFn } from '@formatjs/intl';
import { IntlProvider } from 'react-intl';

import { LOCALE } from './constants';
import messages from './messages';

type TProps = {
  locale: LOCALE;
  children: React.ReactNode;
};

Object.entries(messages).forEach(([_, languageMessages]) => {
  Object.entries(languageMessages).forEach(([key, message]) => {
    (languageMessages as any)[key] = message.message;
  });
});

const Provider: React.FC<TProps> = ({ children, locale = LOCALE.ENGLISH }) => {
  const handleError: OnErrorFn = (_err) => {
    // console.error(_err);
    // if (APP_PROD || APP_STAGE) {
    //   captureException(_err);
    // } else {
    //   // eslint-disable-next-line no-console
    //   console.error(_err);
    // }
  };

  return (
    <IntlProvider
      locale={locale}
      messages={messages[locale] as any}
      onError={handleError}
    >
      {children}
    </IntlProvider>
  );
};

Provider.displayName = 'I18nProvider';

export default Provider;
