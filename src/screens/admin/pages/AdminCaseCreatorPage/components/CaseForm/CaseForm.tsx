import * as yup from 'yup';
import { useForm, FormProvider } from 'react-hook-form';
import { Flex } from '@components/Flex/Flex';
import { useCasesOptions } from '@hooks/useCasesOptions';
import { CasePreview } from '../CasePreview/CasePreview';
import { GameTypeField } from '../GameTypeField/GameTypeField';
import { TextFieldController } from '@components/Form/TextField/TextField';
import { parseNumber } from '@utils/validation.utils';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useMemo } from 'react';
import { CaseCreatorButtons } from '../CaseCreatorButtons/CaseCreatorButtons';
import { ItemsList } from '../ItemsList/ItemsList';
import styles from './CaseForm.module.scss';
import { GAME_TYPE, TCase } from '../../../../../../types/caseTypes';
import { TAdminCaseItem } from '../../../../../../types/admin.types';
import { SelectedItemsList } from '../SelectedItemsList/SelectedItemsList';
import { isEmpty } from 'lodash';
import { toFixed } from '@utils/number.utils';
import { RewardTypeField } from '../RewardTypeField/RewardTypeField';
import { useMounted } from '@hooks/useMounted';
import {
  useCreateNewCaseMutation,
  useGetAllItemsQuery,
} from '@store/slices/rockethubApi/admin.endpoints';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { ROUTE } from '../../../../../../types/routeTypes';
import { getUploadUrl } from '@utils/url.utils';
import { RewardType } from '../../../../../../types/app.types';
import { TCreateNewCaseItem } from '@/types/api/api.types';

type TFormValues = {
  id: string;
  imgUrl: string;
  title: string;
  price: number;
  gameType: GAME_TYPE;
  imageFile: File;
  isEditing: boolean;
  featured: boolean;
  selectedItems: TCreateNewCaseItem[];
  rewardType: RewardType | null;
};

type TProps = {
  caseData: TCase | null;
};

export const CaseForm = ({ caseData }: TProps) => {
  const navigate = useNavigate();
  const { gameTypeOptionsOnly } = useCasesOptions();
  const mounted = useMounted();
  const [creteNewCaseApi] = useCreateNewCaseMutation();
  const { currentData: csGoData } = useGetAllItemsQuery('getCsgoItems');
  const { currentData: rustData } = useGetAllItemsQuery('getCsgoItems');

  const allItems = useMemo(() => {
    const csGoItems = csGoData?.success ? csGoData?.items || [] : [];
    const rustItems = rustData?.success ? rustData?.items || [] : [];

    return [...csGoItems, ...rustItems];
  }, [csGoData, rustData]);

  const schema = useMemo(() => {
    return yup.object({
      id: yup.string(),
      imgUrl: yup.string(),
      title: yup.string().required('Title is required'),
      price: yup
        .number()
        .typeError('Price is required')
        .required('Price is required')
        .min(0.01, 'Min price is 0.01')
        .max(100000, 'Max price is 100000'),
      gameType: yup.string().required('Game type is required'),
      imageFile: yup.mixed().test((file, { createError, parent }) => {
        if (parent.isEditing && parent.imgUrl && !file) {
          return true;
        }

        if (!file) {
          return createError({ message: 'Image is required' });
        }

        return true;
      }),
      isEditing: yup.bool().required(),
      featured: yup.bool().required(),
      rewardType: yup.mixed().nullable().oneOf(Object.values(RewardType)),
      selectedItems: yup.array().test((items, { createError }) => {
        if (isEmpty(items)) {
          return createError({ message: 'Items are required' });
        }

        if (items && items.length < 2) {
          return createError({ message: 'Min items is 2' });
        }

        return true;
      }), // TODO: work on validation
    });
  }, []);

  const formMethods = useForm<TFormValues>({
    resolver: yupResolver(schema) as any,
    defaultValues: {
      id: '',
      title: '',
      imgUrl: '',
      gameType: gameTypeOptionsOnly[0].value,
      isEditing: false,
      featured: false,
      selectedItems: [],
      rewardType: null,
    },
  });

  const { control, handleSubmit, watch, setValue, formState, reset } =
    formMethods;

  useEffect(() => {
    // set values from caseData
    if (!caseData) return;

    reset({
      id: caseData.id,
      title: caseData.title,
      gameType: caseData.type,
      isEditing: true,
      featured: caseData.featured || false,
      rewardType: caseData.rewardType,
      price: caseData.price,
      selectedItems: [], // items will be reset in different hook
      imgUrl: getUploadUrl(caseData.image),
    });
  }, [caseData, reset]);

  useEffect(() => {
    if (!caseData || !rustData?.success || !csGoData?.success) {
      return;
    }

    setValue(
      'selectedItems',
      caseData.items as unknown as TCreateNewCaseItem[]
    );
  }, [caseData, allItems, setValue]);

  const convertItem = (item: TAdminCaseItem): TCreateNewCaseItem => {
    return {
      name: item.market_hash_name,
      image: item.image,
      price: toFixed(item.prices.safe),
      percentage: 0,
      color: item.border_color,
    };
  };

  const onSubmit = async (formValues: TFormValues) => {
    let totalPercent = 0;

    for (let i = 0; i < formValues.selectedItems.length; i++) {
      const item = formValues.selectedItems[i];
      totalPercent += toFixed(item.percentage);

      if (toFixed(item.percentage) <= 0) {
        toast.error("Items can't have a 0% chance.");
        return;
      }
    }

    if (totalPercent !== 100) {
      toast.error('Items must have a total of 100% chance.');
      return;
    }

    // prepare data
    const data = {
      id: formValues.id,
      isEdit: formValues.isEditing,
      title: formValues.title,
      price: formValues.price,
      type: formValues.gameType,
      featured: formValues.featured,
      rewardType: formValues.rewardType,
      image: formValues.imageFile,
      items: formValues.selectedItems.map((item) => ({
        ...item,
        percentage: toFixed(item.percentage),
      })),
    };

    try {
      const result = await creteNewCaseApi(data).unwrap();
      if (result.success) {
        toast.success(`Case  ${caseData ? 'updated' : 'created'} successfully`);
        if (!caseData) {
          navigate(ROUTE.ADMIN_CASES);
        }
      } else {
        toast.error(result.msg);
      }
    } catch (e: any) {
      const message: string =
        e?.data?.msg || e?.data?.error || typeof e?.data === 'string'
          ? e?.data
          : 'Something went wrong';
      toast.error(message);
    }

    return;
  };

  function handleItemSelect(item: TAdminCaseItem) {
    const items = watch('selectedItems');
    const isItemAlreadySelected = items.some(
      (i) => i.name.toLowerCase() === item.market_hash_name.toLowerCase()
    );

    if (isItemAlreadySelected) {
      setValue(
        'selectedItems',
        items.filter(
          (i) => i.name.toLowerCase() !== item.market_hash_name.toLowerCase()
        ),
        { shouldValidate: true, shouldDirty: true }
      );
    } else {
      setValue(
        'selectedItems',
        [
          ...items,
          {
            ...convertItem(item),
            percentage: isEmpty(items) ? 100 : 0,
          },
        ],
        { shouldValidate: true, shouldDirty: true }
      );
    }
  }

  const selectedItems = watch('selectedItems');

  const names = selectedItems.map((item) => item.name.toLowerCase());
  const memoNames = useMemo(() => names, [JSON.stringify(names)]);

  useEffect(() => {
    if (!formState.isDirty) {
      return;
    }

    // recalculate item price
    let price = 0;

    selectedItems.forEach((item) => {
      price += item.price * (item.percentage / 100);
    });

    setValue('price', toFixed(price, 2), { shouldValidate: true });
  }, [selectedItems, setValue, mounted]);

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex container justifyContent="space-between">
          <Flex container gap={12}>
            <CasePreview />

            <Flex
              container
              flexDirection="column"
              gap={24}
              style={{ minWidth: 300 }}
            >
              <TextFieldController
                name="title"
                control={control}
                placeholder="Title"
                height={40}
                label="Title"
              />

              <TextFieldController
                name="price"
                control={control}
                placeholder="Price"
                height={40}
                label="Price"
                format={(value, prev) => {
                  return parseNumber(value, prev, { decimals: 2 });
                }}
              />
            </Flex>

            <Flex
              container
              flexDirection="column"
              gap={24}
              style={{ flex: '0 0 300px' }}
            >
              <GameTypeField />
              <RewardTypeField />
            </Flex>
          </Flex>

          <CaseCreatorButtons />
        </Flex>

        <div className={styles.itemsContainer}>
          <ItemsList
            selectedNames={memoNames}
            onSelect={handleItemSelect}
            type={watch('gameType')}
          />
          <SelectedItemsList />
        </div>
      </form>
    </FormProvider>
  );
};
