import { useSelector } from 'react-redux';
import { Modal } from '../../../components/Modal/Modal';
import { UserShortInfo } from '../../../components/UserShortInfo/UserShortInfo';
import { Flex } from '../../../components/Flex/Flex';
import { Button } from '../../../components/Button/Button';
import { CoinIcon } from '../../../components/icons/CoinIcon';
import { T } from '../../../i18n/translate';
import { Box } from '../../../components/Box/Box';
import useTranslation from '../../../hooks/useTranslation';
import { PriceWithCoin } from '../../../components/PriceWithCoin/PriceWithCoin';
import styles from './UserDetailsPopup.module.scss';
import { PieChartIcon } from '../../../components/icons/PieChartIcon';
import { selectUserDetailsPopupOpen, selectUserDetailsPopupUser } from '../../../store/slices/appSlice';
import { useUserDetailsPopup } from '../../../hooks/useUserDetailsPopup';
import { selectIsLoggedIn } from '../../../store/slices/userSlice';
import { useTipPopup } from '../../../hooks/useTipPopup';

export const UserDetailsPopup = () => {
  const { t } = useTranslation();
  const user = useSelector(selectUserDetailsPopupUser);
  const open = useSelector(selectUserDetailsPopupOpen);
  const { close } = useUserDetailsPopup();
  const { openTipPopup } = useTipPopup();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  if (!user) return null;

  const wagerStats = [
    {
      title: t({
        id: 'userDetails.TotalWagered',
        defaultMessage: 'Total Wagered',
      }),
      coins: (user as any).wagered,
      icon: <PieChartIcon />,
    },
    // {
    //   title: t({
    //     id: 'userDetails.TotalWagered',
    //     defaultMessage: 'Total Wagered',
    //   }),
    //   coins: 0,
    //   icon: <BoxIcon />,
    // },
    // {
    //   title: t({
    //     id: 'userDetails.TotalWagered',
    //     defaultMessage: 'Total Wagered',
    //   }),
    //   coins: 0,
    //   icon: <SwordsIcon />,
    // },
    // {
    //   title: t({
    //     id: 'userDetails.TotalWagered',
    //     defaultMessage: 'Total Wagered',
    //   }),
    //   coins: 0,
    //   icon: <RollbackIcon />,
    // },
  ];

  // const freeRewardsStats = [
  //   {
  //     title: t({
  //       id: 'userDetails.RewardsClaimed',
  //       defaultMessage: 'Rewards Claimed',
  //     }),
  //     coins: 0,
  //     icon: <GiftIcon />,
  //   },
  //   {
  //     title: t({
  //       id: 'userDetails.LeaderboardEarnings',
  //       defaultMessage: 'Leaderboard Earnings',
  //     }),
  //     coins: 0,
  //     icon: <PeopleGroupIcon />,
  //   },
  // ];

  return (
    <>
      <Modal show={open} onClose={() => close()} className={styles.modal}>
        <div>
          <header className={styles.header}>
            <Flex container gap={12} justifyContent="space-between">
              <UserShortInfo user={user} withRank />
              {isLoggedIn && (
                <Button
                  color="secondary-v3"
                  pressable
                  prepend={<CoinIcon className={styles.buttonCoin} />}
                  gap={1}
                  onClick={() => openTipPopup({ user })}
                >
                  <T id="common.Tip" defaultMessage="Tip" />
                </Button>
              )}
            </Flex>
          </header>

          <h4 className={styles.title}>
            <T id="userDetailsPopup.WagerStats" defaultMessage="Wager Stats" />
          </h4>

          <Flex container gap={10} flexDirection="column" >
            {wagerStats.map((stats, idx) => {
              return (
                <Box key={idx} direction="row" className={styles.box}>
                  <Flex container gap={8} alignItems="center">
                    <span className={styles.iconContainer}>{stats.icon}</span>
                    <span className={styles.title}>{stats.title}</span>
                  </Flex>
                  <PriceWithCoin>{stats.coins}</PriceWithCoin>
                </Box>
              );
            })}
          </Flex>

          {/* <h4 className={styles.title}>
            <T
              id="userDetailsPopup.FreeRewardsStats"
              defaultMessage="Free Rewards Stats"
            />
          </h4>

          <div className={styles.rewardsStatsContainer}>
            {freeRewardsStats.map((stats, idx) => {
              return (
                <Box key={idx} className={styles.rewardsBox} direction='row'>
                  <div className={styles.rewardIconContainer}>{stats.icon}</div>
                  <div>
                    <PriceWithCoin>{stats.coins}</PriceWithCoin>
                    <span className={styles.rewardsTitle}>{stats.title}</span>
                  </div>
                </Box>
              );
            })}
          </div> */}
        </div>

      </Modal>
    </>
  );
};
