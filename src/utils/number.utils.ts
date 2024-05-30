import numeral from 'numeral';
import { numericFormatter } from 'react-number-format';

export const toFixed = (num: number | string, count: number = 2) => {
  if (typeof num === 'string') {
    num = parseFloat(num);
  }

  return parseFloat(num.toFixed(count));
};

export const formatCoins = (number: number): string => {
  return numericFormatter(`${number}`, {
    decimalScale: 2,
    thousandSeparator: ' ',
    decimalSeparator: '.',
  });
};

export const formatPrice = (number: number): string => {
  return numericFormatter(`${number}`, {
    decimalScale: 2,
    thousandSeparator: ' ',
    decimalSeparator: '.',
  });
};


export const positiveOrZero = (num: number) => Math.max(num, 0);


const getFormat = (number: number): string =>
  number > 999 && number % 1000 > 0 ? '0.0a' : '0a';
// Format to 1k or 1m
export const friendlyFormat = (number: number, customFormat?: string): string => {
  return numeral(number).format(customFormat ? customFormat : getFormat(number));
};
