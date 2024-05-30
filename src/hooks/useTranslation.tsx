/* eslint-disable @typescript-eslint/unbound-method */
import { Options } from 'intl-messageformat';
import { MessageDescriptor, useIntl } from 'react-intl';

const useTranslation = () => {
  const { formatMessage } = useIntl();


  // TODO: work on return type
  function t(descriptor: MessageDescriptor, values: Record<string, any>): string;
  function t(descriptor: MessageDescriptor): string;
  function t(descriptor: MessageDescriptor, values: Record<string, any> = {}, opts?: Options | undefined) {
    return formatMessage(
      descriptor,
      {
        br: () => <br />,
        ...values,
      },
      opts
    );
  }
    

  return {
    t,
  };
};

export default useTranslation;
