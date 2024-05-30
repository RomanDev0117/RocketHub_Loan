import { FormattedMessage } from 'react-intl';
import { Props } from 'react-intl/lib/src/components//message';

export const T = ({ values, ...rest }: Props<any>) => (
  <FormattedMessage
    {...rest}
    values={{
      br: () => <br />,
      ...values,
    }}
  />
);
