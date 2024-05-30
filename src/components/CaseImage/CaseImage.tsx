import clsx from 'clsx';
import { getUploadUrl } from '../../utils/url.utils';
import { usePopperTooltip } from 'react-popper-tooltip';
import { CaseTooltip } from '../CaseTooltip/CaseTooltip';
import { TCase } from '../../types/caseTypes';

type TProps = {
  src?: string;
  className?: string;
  alt?: string;
  caseData?: TCase;
};

export const CaseImage = ({ src, className, alt, caseData }: TProps) => {
  const popperTooltip = usePopperTooltip(
    {
      placement: 'top',
    },
    { strategy: 'fixed', }
  );

  return (
    <>
      <img
        ref={popperTooltip.setTriggerRef}
        className={clsx(className)}
        src={getUploadUrl(src)}
        alt={alt}
        onMouseEnter={() => {
          // void popperTooltip.update?.()
        }}
      />
      {caseData && (
        <CaseTooltip popperTooltip={popperTooltip} caseData={caseData} />
      )}
    </>
  );
};
