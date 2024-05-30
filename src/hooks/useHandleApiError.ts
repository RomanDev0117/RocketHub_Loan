/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useState } from 'react';
import { TCreateSuccessResponse, TErrorResponse, TSuccessResponse } from '../types/api/api.types';
import { toast as hotToast } from 'react-hot-toast';
import useTranslation from './useTranslation';

type TArgs<T> = {
  data?: T;
  isError: boolean;
  error: any;
  defaultError?: string;
};

export const useHandleApiError = <
  T extends TSuccessResponse<any> | TCreateSuccessResponse | TErrorResponse
>(
  { data, isError, error, defaultError }: TArgs<T>,
  { toast = true }: { toast?: boolean } = {}
) => {
  const { t } = useTranslation();
  const [errorMessage, setErrorMessage] = useState('');

  const defaultErrorMessage = useMemo(() => {
    return defaultError || t({
      id: 'common.api.error',
      defaultMessage: 'Unexpected error happened while fetching data',
    });
  }, [defaultError]);

  const handleError = (error: string) => {
    if (toast) {
      hotToast.error(error);
    } else {
      setErrorMessage(error);
    }
  };

  useEffect(() => {
    if (!isError) return;

    if (!error) {
      handleError(defaultErrorMessage);
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      handleError(error?.data?.msg || error?.message || defaultErrorMessage);
    }
  }, [isError, defaultErrorMessage]);

  useEffect(() => {
    if (!data) return;

    if (!data?.success) {
      const message = data.msg ?? defaultErrorMessage;
      handleError(message);
    }
  }, [data?.success]);

  return {
    errorMessage,
  };
};
