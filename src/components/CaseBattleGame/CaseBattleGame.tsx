import { useMemo } from 'react';
import { FormattedPlural } from 'react-intl';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import useTranslation from '../../hooks/useTranslation';
import { T } from '../../i18n/translate';
import { selectUserSteamId } from '../../store/slices/userSlice';
import { TCaseGame } from '../../types/caseTypes';
import {
  canJoinCaseBattle,
  canJoinLounge,
  getCaseBattleTotalUnboxedValue,
  isAlreadyJoinedCaseBattle,
  isCaseBattleCreator,
  isCaseBattleFinished,
} from '../../utils/caseBattle.utils';
import { getCaseBattlePath } from '../../utils/url.utils';
import { Button } from '../Button/Button';
import { CaseBattleCaseList } from '../CaseBattleCaseList/CaseBattleCaseList';
import { CaseBattlePlayerList } from '../CaseBattlePlayerList/CaseBattlePlayerList';
import { FormattedPrice } from '../FormattedPrice/FormattedPrice';
import { JoinSpectatorLoungeButton } from '../JoinSpectatorLoungeButton/JoinSpectatorLoungeButton';
import { useSpectatorLoungeLog } from '../JoinSpectatorLoungeButton/useSpectatorLoungeLog';
import { PriceWithCoin } from '../PriceWithCoin/PriceWithCoin';
import { CoinIcon } from '../icons/CoinIcon';
import { EyeIcon } from '../icons/EyeIcon';
import { SwordsIconV3 } from '../icons/SwordsIconV3';
import styles from './CaseBattleGame.module.scss';
import { BattleInfo } from './components/BattleInfo/BattleInfo';
import { Winners } from './components/Winners/Winners';

type TProps = {
  game: TCaseGame;
};

export const CaseBattleGame = ({ game }: TProps) => {
  const { t } = useTranslation();
  const battleEnded = isCaseBattleFinished(game);
  const battleInProgress = game.status === 1;
  const userSteamId = useSelector(selectUserSteamId);
  const isCreator = isCaseBattleCreator({
    steamId: userSteamId,
    caseBattle: game,
  });
  const alreadyJoined = isAlreadyJoinedCaseBattle(game, userSteamId);
  const canJoinBattle = canJoinCaseBattle(game, userSteamId);

  const { hasJoined } = useSpectatorLoungeLog();
  const joinLounge = canJoinLounge(game, userSteamId, hasJoined);

  const totalUnboxedValue = useMemo(() => {
    return battleEnded ? getCaseBattleTotalUnboxedValue(game) : 0;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game]);

  return (
    <Link to={getCaseBattlePath(game.id)} className={styles.root}>
      <div className={styles.col1}>
        <BattleInfo caseBattle={game} />
        <CaseBattlePlayerList
          battleType={game.battleType}
          playersInDuel={game.playersInDuel}
          isCursed={game.cursed}
        />
      </div>

      <div className={styles.col2}>
        <CaseBattleCaseList
          battleInProgress={battleInProgress}
          currentRound={game.currentRound}
          cases={game.cases}
          finished={isCaseBattleFinished(game)}
        />
      </div>

      <div className={styles.col3}>
        <div className={styles.roundsContainer}>
          {battleInProgress ? (
            <div className={styles.rounds}>
              <span className={styles.roundCounter}>
                {game.currentRound}/{game.cases.length}{' '}
              </span>
              {t({ id: 'common.round.many', defaultMessage: 'rounds' })}
            </div>
          ) : (
            <div className={styles.rounds}>
              <span className={styles.roundCounter}>{game.cases.length} </span>
              <FormattedPlural
                one={t({ id: 'common.round.one', defaultMessage: 'round' })}
                other={t({ id: 'common.round.many', defaultMessage: 'rounds' })}
                zero={t({ id: 'common.round.zero', defaultMessage: 'rounds' })}
                value={game.cases.length}
              />
            </div>
          )}
          {battleEnded && (
            <PriceWithCoin highlight className={styles.totalWin}>
              {totalUnboxedValue}
            </PriceWithCoin>
          )}
        </div>

        {battleEnded && (
          <div className={styles.winnersContainer}>
            <span className={styles.winnersText}>
              <T id="common.Winners" defaultMessage="Winners" />
            </span>
            <Winners caseBattle={game} />
          </div>
        )}

        {/* Buttons */}
        {joinLounge ? <JoinSpectatorLoungeButton
          caseBattle={game}
          variant="minimal"
          className={styles.joinLoungeButton}
        /> :
          (battleInProgress &&
            <Button
              color="secondary-v3"
              pressable
              className={styles.button}
            >
              <EyeIcon />
              <T id="common.watchBattle" defaultMessage="Watch Battle" />
            </Button>
          )}
        {canJoinBattle && (
          <Button
            pressable
            className={styles.button}
            prepend={<SwordsIconV3 />}
          >
            <T id="common.joinFor" defaultMessage="Join for" />
            <CoinIcon />
            <FormattedPrice value={game.price} fontWeight="inherit" />
          </Button>
        )}
        {(isCreator || alreadyJoined) && !battleInProgress && !battleEnded && (
          <Button
            color="secondary-v3"
            pressable
            className={styles.button}
          >
            Open
          </Button>
        )}
      </div>
    </Link>
  );
};
