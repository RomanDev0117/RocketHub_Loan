/* eslint-disable no-useless-escape */
import * as yup from 'yup';
import { isEmpty } from 'lodash';
import { CLIENT_SEED_MAX_LENGTH, CLIENT_SEED_MIN_LENGTH } from '../constants';

export const isClientSeedValid = (clientSeed: string | undefined) => {
  if (!clientSeed) return false;
  if (clientSeed.length < CLIENT_SEED_MIN_LENGTH) return false;
  if (clientSeed.length > CLIENT_SEED_MAX_LENGTH) return false;
  return /^[A-Za-z0-9]*$/.test(clientSeed);
};

export const URLRegex =
  // eslint-disable-next-line max-len
  /^((https?|ftp):\/\/)?(www.)?(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;

export const NUMBER_REGEX = new RegExp(
  /^(?:-(?:[1-9](?:\d{0,2}(?:,\d{3})+|\d*))|(?:0|(?:[1-9](?:\d{0,2}(?:,\d{3})+|\d*))))(?:.\d+|)$/
);

export const DIGIT_REGEX = new RegExp(/\d/g);
export const NON_DIGIT_REGEX = new RegExp(/\D/g);

export const parseNumber = (
  strValue: string,
  prevValue: string,
  {
    decimals,
    type,
    max,
  }: { decimals?: number; type?: 'number' | 'digit'; max?: number } = {}
): string => {
  if (type === 'digit') {
    return strValue.replaceAll(NON_DIGIT_REGEX, '');
  }

  if (isEmpty(strValue)) {
    return strValue;
  }

  strValue = strValue.replaceAll('-', ''); // only positive numbers
  strValue = strValue.replaceAll(',', '.');

  if (strValue.startsWith('0') && strValue.length > 1 && strValue[1] !== '.') {
    strValue = strValue.substring(1);
  }

  if (!NUMBER_REGEX.test(strValue)) {
    if (decimals === 0) {
      return prevValue;
    }

    // not valid number
    if (strValue.endsWith('.') && strValue.split('.').length === 2) {
      // but user still wants to add some decimal numbers
      return strValue;
    }
    return prevValue;
  }

  // valid number
  const numericValue = parseFloat(strValue);

  if (typeof max === 'number' && numericValue > max) {
    strValue = `${max}`;
  }

  if (decimals === 0) {
    return `${parseInt(strValue)}`;
  }

  if (decimals) {
    const [intNumber, decimalPart] = strValue.split('.');
    if (decimalPart) {
      strValue = `${intNumber}.${decimalPart.slice(0, decimals)}`;
    }
  }

  return strValue;
};

export const isEmailValid = async (email: any) => {
  const schema = yup.object().shape({
    email: yup.string().email('Not a proper email').required(),
  });

  try {
    const result = await schema.isValid({
      email,
    });
    return result;
  } catch (e) {
    return false;
  }
};
