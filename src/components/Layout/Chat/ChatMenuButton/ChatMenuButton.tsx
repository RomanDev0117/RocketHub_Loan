import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faHandHoldingDollar } from '@fortawesome/pro-solid-svg-icons';
import styles from './ChatMenuButton.module.scss';
import { TOption } from '../../../Dropdown/Dropdown';
import { DropdownController } from '../../../Dropdown/DropdownController';
import { DropdownListProps } from '../../../Dropdown/DropdownList';
import { useTipPopup } from '../../../../hooks/useTipPopup';

export const ChatMenuButton = () => {
  const { openTipPopup } = useTipPopup();
  const options: TOption[] = [
    {
      value: 'tip',
      label: 'send tip',
      icon: <FontAwesomeIcon icon={faHandHoldingDollar} fontSize={16} />
    },
  ];

  const listProps: DropdownListProps = {
    options,
    onSelect: (option) => {
      if (option.value === 'tip') {
        openTipPopup();
      }
    },
    dropdownStyle: 'chat',
    style: {
      zIndex: 10000,
    },
  };

  return (
    <DropdownController dropdownListProps={listProps}>
      {({ ref, setOpen }) => (
        <button
          className={styles.button}
          ref={ref}
          onClick={() => setOpen(true)}
        >
          <FontAwesomeIcon icon={faEllipsisVertical} fontSize={18} />
        </button>
      )}
    </DropdownController>
  );
};
