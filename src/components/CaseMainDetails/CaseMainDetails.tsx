import { capitalize } from 'lodash';
import { TCase } from '../../types/caseTypes';
import styles from './CaseMainDetails.module.scss';
import { getUploadUrl } from '../../utils/url.utils';
import clsx from 'clsx';
import { Truncate } from '../Truncate/Truncate';

type TProps = {
  caseData?: TCase | null;
  imgSize?: number;
  gap?: number;
  reverse?: boolean;
  children?: React.ReactNode;
};

export const CaseMainDetails = ({
  caseData,
  imgSize = 120,
  gap = 12,
  reverse,
  children,
}: TProps) => {
  const src = getUploadUrl(caseData?.image);

  return (
    <div
      className={clsx(styles.titleContainer, {
        [styles.reverse]: reverse,
      })}
      style={{ gap }}
    >
      {src && (
        <img
          src={getUploadUrl(caseData?.image)}
          className={styles.caseImage}
          // alt="Case thumbnail"
          style={{
            width: imgSize,
            height: imgSize,
          }}
        />
      )}
      <h2 className={styles.title}>
        <Truncate>{capitalize(caseData?.title)}</Truncate>
      </h2>
      {children}
    </div>
  );
};
