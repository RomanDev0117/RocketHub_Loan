import { CASE_SORT_BY, GAME_TYPE } from '../types/caseTypes';
import csgoImage from '../assets/images/csgo.png';
import rustImage from '../assets/images/rust.png';
import { TOption } from '../components/Dropdown/Dropdown';
import useTranslation from './useTranslation';
import { TButtonMenuProps } from '../components/ButtonMenu/ButtonMenu';
import { RewardType } from '../types/app.types';

export const useCasesOptions = () => {
  const { t } = useTranslation();

  const gameTypeOptions: TOption[] = [
    {
      value: GAME_TYPE.ALL,
      label: t({ id: 'common.AllGames', defaultMessage: 'All Games' }),
      icon: (
        <img src="/images/game-types/all-games.svg" alt="controller icon" />
      ),
    },
    {
      value: GAME_TYPE.CSGO,
      label: 'CSGO',
      icon: <img src="/images/game-types/csgo-2.png" alt="CSGO Logo" />,
    },
    {
      value: GAME_TYPE.RUST,
      label: 'RUST',
      icon: <img src={rustImage} alt="Rust Logo" />,
    },
  ];

  const gameTypeOptionsOnly = [
    {
      value: GAME_TYPE.CSGO,
      label: 'CSGO',
      icon: <img src={csgoImage} alt="CSGO Logo" />,
    },
    {
      value: GAME_TYPE.RUST,
      label: 'RUST',
      icon: <img src={rustImage} alt="Rust Logo" />,
    },
  ];

  const rewardTypeOptionsOnly = Object.values(RewardType).map((value) => ({
    value,
    label: value,
  }));

  const sortOptions: TOption[] = [
    {
      value: CASE_SORT_BY.PRICE_ASC,
      icon: <img src="/images/icons/sort-min.svg" alt="sort desc icon" />,
      label: (
        <>
          {t({
            id: 'common.Min.',
            defaultMessage: 'Min.',
          })}
        </>
      ),
    },
    {
      value: CASE_SORT_BY.PRICE_DESC,
      icon: <img src="/images/icons/sort-max.svg" alt="sort asc icon" />,
      label: (
        <>
          {t({
            id: 'common.Max.',
            defaultMessage: 'Max.',
          })}
        </>
      ),
    },

  ];

  const tagsList: TButtonMenuProps['items'] = [
    { children: 'LOW RISK' },
    { children: '50 - 50' },
    { children: 'HIGH RISK' },
    { children: 'HIGH RISK' },
    { children: '1%' },
  ];

  const tagOptions = tagsList.map((o) => ({
    value: o.children,
    label: o.children,
  }));

  tagOptions.unshift({
    value: '',
    label: 'All',
  });

  return {
    gameTypeOptions,
    sortOptions,
    tagsList,
    tagOptions,
    gameTypeOptionsOnly,
    rewardTypeOptionsOnly,
  };
};
