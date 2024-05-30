import { useFormContext } from 'react-hook-form';
import { AdminCaseItem } from '../AdminCaseItem/AdminCaseItem';
import styles from './SelectedItemsList.module.scss';
import { Fragment } from 'react';
import { ErrorText } from '../../../../../../components/ErrorText/ErrorText';
import { TCreateNewCaseItem } from '@/types/api/api.types';

export const SelectedItemsList = () => {
  const { watch, formState } = useFormContext();
  const selectedItems = watch('selectedItems') as TCreateNewCaseItem[];

  return (
    <div className={styles.container}>
      {formState.errors.selectedItems && (
        <ErrorText style={{ marginBottom: 16 }}>
          {formState.errors.selectedItems.message?.toString()}
        </ErrorText>
      )}

      {selectedItems.map((item) => {
        return (
          <Fragment key={item.name}>
            <AdminCaseItem item={item} />
            <div className={styles.divider} />
          </Fragment>
        );
      })}
    </div>
  );
};
