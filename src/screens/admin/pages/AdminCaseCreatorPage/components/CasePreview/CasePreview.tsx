import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useFormContext } from 'react-hook-form';
import { CaseListItem } from '../../../../../../components/CaseListItem/CaseListItem';
import { GAME_TYPE, TCase } from '../../../../../../types/caseTypes';
import styles from './CasePreview.module.scss';
import { faUpload } from '@fortawesome/pro-solid-svg-icons';
import { useEffect, useState } from 'react';

export const CasePreview = () => {
  const { watch, setValue, formState } = useFormContext();
  const [imageUrl, setImageUrl] = useState<string>('');

  const title = watch('title');
  const price = watch('price');
  const imageFile = watch('imageFile') as Blob;
  const currentCaseImageUrl: string = watch('imgUrl');


  useEffect(() => {
    if (imageFile) {
      const url = URL.createObjectURL(imageFile);
      setImageUrl(() => url);

      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [imageFile]);

  const caseData: TCase = {
    featured: true,
    id: 'placeholder',
    image: '',
    items: [],
    price: parseFloat(price as string) || ('---' as any),
    time: 1683021573,
    title: title || '---',
    amount: 1,
    type: GAME_TYPE.CSGO,
  };
  const placeholderImage = imageUrl || currentCaseImageUrl;

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    setValue('imageFile', file, { shouldValidate: true, shouldDirty: true });
  };

  return (
    <div className={styles.container}>
      <div className={styles.caseContainer}>
        <label className={styles.fileDrop} htmlFor="file-input">
          <input
            type="file"
            accept=".png, .jpg, .webp"
            style={{ display: 'none' }}
            onChange={handleFileChange}
            id="file-input"
          />
          <FontAwesomeIcon icon={faUpload} fontSize={24} />
        </label>
        <CaseListItem caseData={caseData} placeholderImage={placeholderImage} />
      </div>
      {formState.errors.imageFile && (
        <span className={styles.error}>{formState.errors.imageFile.message?.toString()}</span>
      )}
    </div>
  );
};
