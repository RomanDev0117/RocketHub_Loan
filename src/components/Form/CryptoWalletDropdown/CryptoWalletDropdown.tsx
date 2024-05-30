/* eslint-disable @typescript-eslint/no-unsafe-return */

import { cloneElement, useEffect, useMemo, useState } from 'react';
import Select, {
  DropdownIndicatorProps,
  MenuProps,
  OptionProps,
  components,
} from 'react-select';
import styles from './CryptoWalletDropdown.module.scss';
import { Button } from '../../Button/Button';
import { PlusIcon } from '../../icons/PlusIcon';
import clsx from 'clsx';
import { CaretDownIcon } from '../../icons/CaretDownIcon';
import {
  useDeleteUserCryptoAddressMutation,
  useGetUserCryptoAddressListQuery,
} from '../../../store/slices/rockethubApi/crypto.endpoints';
import { TUserCryptoAddress } from '../../../types/api/api.types';
import { FieldError, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { TextTitle1 } from '../../Typography/Typography';
import { AddCryptoAddressPopup } from '../../../screens/modals/AddCryptoAddressPopup/AddCryptoAddressPopup';
import { CRYPTO_CURRENCY } from '../../../types/payment.types';
import { cryptoTypeToCrypto, getCryptoIcon } from '../../../utils/crypto.utils';
import { Modal } from '../../Modal/Modal';
import { Flex } from '../../Flex/Flex';
import { DeleteIcon } from '../../icons/DeleteIcon';
import toast from 'react-hot-toast';

const DropdownIndicator = (
  props: DropdownIndicatorProps<TUserCryptoAddress>
) => {
  return (
    components.DropdownIndicator && (
      <components.DropdownIndicator {...props}>
        <CaretDownIcon style={{ width: 24, height: 24 }} />
      </components.DropdownIndicator>
    )
  );
};

const Option = (props: OptionProps<TUserCryptoAddress>) => {
  const icon = getCryptoIcon(cryptoTypeToCrypto(props.data.type));

  return (
    components.Option && (
      <components.Option {...props}>
        {cloneElement(icon, { className: styles.cryptoIcon })}
        <div className={styles.option}>
          <span className={styles.optionLabel}>{props.label}</span>
          <span className={styles.optionAddress}>{props.data.address}</span>
        </div>
        <Button
          pressable
          height={32}
          icon
          color="secondary-v3"
          className={styles.deleteButton}
          onClick={(e) => {
            e.stopPropagation();
            (props.selectProps as any).onItemDelete(props.data.id);
          }}
        >
          <DeleteIcon width="14" height="14" />
        </Button>
      </components.Option>
    )
  );
};

const SingleValue = (props: any) => {
  const icon = getCryptoIcon(cryptoTypeToCrypto(props.data.type));

  return (
    components.SingleValue && (
      <components.SingleValue {...props}>
        {cloneElement(icon, { className: styles.cryptoIcon })}
        <div className={styles.option}>
          <span className={styles.optionLabel}>{props.data.label}</span>
          <span className={styles.optionAddress}>{props.data.address}</span>
        </div>
      </components.SingleValue>
    )
  );
};

const Menu = (props: MenuProps<TUserCryptoAddress, false>) => {
  return (
    <components.Menu
      {...props}
      className={clsx(props.className, {
        [styles.menuTop]: props.placement === 'top',
        [styles.menuBottom]: props.placement === 'bottom',
        [styles.menu]: true,
      })}
    >
      <div className={styles.menuInner}>{props.children}</div>
    </components.Menu>
  );
};

const MenuList = (props: any) => {
  return (
    <components.MenuList {...props} className={styles.menuList}>
      {props.children}
      <div className={styles.menuDivider} />
      <div
        className={styles.menuFooter}
        onClick={() => props.selectProps.onAddClick()}
      >
        <Button icon pressable color="secondary-v3" height={28}>
          <PlusIcon />
        </Button>
        <span>Add a new wallet address</span>
      </div>
    </components.MenuList>
  );
};

type TProps = {
  name: string;
  error: FieldError | undefined;
  watch: UseFormWatch<any>;
  cryptoType: CRYPTO_CURRENCY;
  setValue: UseFormSetValue<any>;
};

const CryptoWalletDropdown = ({
  name,
  watch,
  setValue,
  error,
  cryptoType,
}: TProps) => {
  const { data: wallets, isFetching } = useGetUserCryptoAddressListQuery();
  const [addWalletPopupOpen, setAddWalletPopupOpen] = useState(false);
  const [newWalletAddress, setNewWalletAddress] = useState('');
  const [localValue, setLocalValue] = useState<TUserCryptoAddress | null>(null);
  const [search, setSearch] = useState('');
  const [deleteCryptoAddressApi] = useDeleteUserCryptoAddressMutation();
  const [justAddedWalletName, setJustAddedWalletName] = useState<string | null>(
    null
  );
  const [idToDelete, setIdToDelete] = useState<string | null>(null);
  const hasError = Boolean(error?.message);
  const parentValue = watch(name);

  useEffect(() => {
    // sync with parent
    if (parentValue !== localValue?.address) {
      const newWallet = filteredWallets.find((w) => w.address === parentValue);
      setLocalValue(newWallet || null);
    }
  }, [parentValue]);

  const filteredWallets = useMemo(() => {
    return (wallets?.data?.addresses || []).filter(
      (a) => cryptoTypeToCrypto(a.type) === cryptoType
    );
  }, [wallets, cryptoType]);

  const selectWallet = (cryptoAddress: TUserCryptoAddress | null) => {
    setLocalValue(cryptoAddress);
    setValue(name, cryptoAddress?.address, { shouldValidate: true });
  };

  function handleWalletAdded(name: string, type: CRYPTO_CURRENCY) {
    if (type === cryptoType) {
      setJustAddedWalletName(name);
    }
  }

  async function deleteWallet() {
    if (!idToDelete) return;

    try {
      const result = await deleteCryptoAddressApi(idToDelete).unwrap();
      if (result.success) {
        setIdToDelete(null);
        toast.success('Address deleted successfully');

        if (idToDelete === localValue?.id) {
          selectWallet(null);
        }
      }
    } catch (error: any) {
      const message: string = error?.data?.msg || 'Unexpected error happened';
      toast.error(message);
    }
  }

  useEffect(() => {
    // after wallet was added we wait for update of wallets list and select newly created wallet if there is no wallet selected yet
    if (!justAddedWalletName || localValue || isFetching) {
      return;
    }

    const newWallet = filteredWallets.find(
      (w) => w.label === justAddedWalletName
    );
    selectWallet(newWallet || null);
    setJustAddedWalletName(null);
  }, [justAddedWalletName, filteredWallets]);

  const network =
    cryptoType === CRYPTO_CURRENCY.USDT ? (
      <span className={styles.network}>(TRC-20)</span>
    ) : null;

  return (
    <div>
      <span className={styles.label}>Your address {network}</span>
      <Select
        isLoading={isFetching}
        options={filteredWallets}
        components={{
          DropdownIndicator,
          Option,
          Menu,
          IndicatorSeparator: null,
          MenuList: MenuList,
          SingleValue: SingleValue,
        }}
        placeholder="Enter or choose your address"
        value={localValue}
        isSearchable
        inputValue={search || ''}
        onInputChange={(value, { action }) => {
          if (action === 'input-change' || action === 'set-value') {
            setSearch(value);
          }
        }}
        onChange={(value) => {
          selectWallet(value);
        }}
        // menuIsOpen
        getOptionValue={(option) => option.id}
        menuPlacement="bottom" // Place the menu below the control
        menuPosition="fixed" // Fix the menu position
        menuShouldScrollIntoView={false} // Disable automatic scrolling of the menu
        menuPortalTarget={document.body} // Render the menu in the body element
        noOptionsMessage={() => 'No wallets found'}
        filterOption={(option, rawInput) => {
          return (
            option.data.label.toLowerCase().includes(rawInput.toLowerCase()) ||
            option.data.address.toLowerCase().includes(rawInput.toLowerCase())
          );
        }}
        styles={{
          menuPortal: (base) => ({ ...base, zIndex: 2000 }),
          control: (base, { menuIsOpen }) => {
            return {
              ...base,
              height: 60,
              fontSize: 15,
              fontWeight: 500,
              padding: '6px 12px 6px 0',
              borderRadius: 'var(--border-radius)',
              // background: 'rgba(25, 36, 50, 0.80)',
              background: '#182230',
              // color: 'rgba(255, 255, 255, 0.6)',
              color: '#A3A7AD',
              border: '1px solid transparent',
              outline: 'none !important',
              boxShadow: 'none !important',
              zIndex: 22,

              '&:hover': {
                borderColor: 'transparent',
              },

              ...(menuIsOpen ? { borderColor: '#fff !important' } : {}),
              ...(hasError ? { borderColor: 'var(--error) !important' } : {}),
            };
          },
          input: (base) => ({
            ...base,
            color: '#fff',
            fontSize: '15px',
            fontWeight: 500,
            letterSpacing: '-0.15px',

            '& input': {
              letterSpacing: 'inherit',
            },
          }),
          valueContainer: (base) => ({
            ...base,
            paddingLeft: 16,
          }),
          placeholder: (base) => ({
            ...base,
            color: '#A3A7AD',
          }),
          dropdownIndicator: (base, state) => ({
            ...base,
            color: '#fff !important',
            transform: state.selectProps.menuIsOpen
              ? 'rotate(180deg)'
              : undefined,
          }),
          menu: (base) => ({
            ...base,
            // margin: 0,
          }),
          noOptionsMessage: (base) => ({
            ...base,
            color: 'var(--grey-500)',
            fontSize: 13,
            fontWeight: 500,
            lineHeight: '16px',
            textAlign: 'left',
          }),
          singleValue: (base) => ({
            ...base,
            color: 'var(--white)',
            fontSize: 15,
            fontWeight: 500,
            display: 'flex',
            gap: 14,
            alignItems: 'center',
          }),
          option: (base, state) => ({
            ...base,
            background: 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '14px',
            '&:hover': {
              background: 'var(--grey-900)',
            },
            '&:active': {
              background: 'var(--grey-900)',
            },
            ...(state.isSelected ? { background: 'var(--grey-900)' } : {}),
          }),
        }}
        // custom props
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        onAddClick={() => {
          setNewWalletAddress(search);
          setAddWalletPopupOpen(true);
        }}
        onItemDelete={(id: string) => setIdToDelete(id)}
      />
      {hasError && <span className={styles.error}>{error?.message}</span>}

      <AddCryptoAddressPopup
        defaultCrypto={cryptoType}
        defaultAddress={newWalletAddress}
        open={addWalletPopupOpen}
        onClose={() => {
          setAddWalletPopupOpen(false);
          setNewWalletAddress('');
        }}
        onSuccess={handleWalletAdded}
      />

      <Modal show={Boolean(idToDelete)} onClose={() => setIdToDelete(null)}>
        <TextTitle1 mb={32}>Delete this wallet?</TextTitle1>
        <Flex container gap={16}>
          <Button
            fullWidth
            pressable
            color="secondary-v3"
            onClick={() => {
              setIdToDelete(null);
            }}
          >
            No
          </Button>
          <Button fullWidth pressable onClick={deleteWallet}>
            Yes
          </Button>
        </Flex>
      </Modal>
    </div>
  );
};

export default CryptoWalletDropdown;
