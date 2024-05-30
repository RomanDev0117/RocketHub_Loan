import { usePopperTooltip } from 'react-popper-tooltip';
import { TooltipBody } from './TooltipBody';
import { JSXElementConstructor, ReactElement, cloneElement } from 'react';

export type TTooltipProps = {
  children: ReactElement<any, string | JSXElementConstructor<any>>;
  title?: React.ReactNode;
  variant?: 'default' | 'minimal';
  bg?: string;
};

export const Tooltip = ({ children, title, variant = 'default', bg }: TTooltipProps) => {
  const popperTooltip = usePopperTooltip(
    { placement: 'top', visible: title ? undefined : false },
    { strategy: 'fixed' }
  );

  return (
    <>
      {cloneElement(children, { ref: popperTooltip.setTriggerRef })}
      <TooltipBody popperTooltip={popperTooltip} bg={bg} variant={variant}>
        {title}
      </TooltipBody>
    </>
  );
};
