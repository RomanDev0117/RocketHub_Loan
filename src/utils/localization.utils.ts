import { LOCALE } from '../i18n';

type DetectReturnFormat = 'h23' | 'h12' | 'h11' | 'h24' | undefined;

export const detectTimeFormat = (
  locale?: string
): DetectReturnFormat => {
  const calculatedLocale = locale || getBrowserLocale();

  const resolvedOptions  =Intl.DateTimeFormat(calculatedLocale, {
    hour: 'numeric',
  }).resolvedOptions();
  const timeFormat: DetectReturnFormat = (resolvedOptions as any)?.hourCycle;

  return timeFormat || 'h24';
};

export const detectTimeZone = () =>
  Intl?.DateTimeFormat()?.resolvedOptions()?.timeZone;


export const detectInterfaceLocale = () => {
  const language = window.navigator.language.split('-')[0];

  return (
    Object.values(LOCALE).find((name) => name.split('-')[0] === language) ||
    LOCALE.ENGLISH
  );
};

export const getBrowserLocale = () => window.navigator.language;
