import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../store/slices/userSlice';
import { STEAM_AUTH_URL } from '../constants';
import { caseApi } from '../insolve-framework';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-hot-toast';
import { captureException } from '@sentry/react';
import useTranslation from './useTranslation';
import { useState } from 'react';

export const useCaseBattleUtils = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [joining, setJoining] = useState(false);
  const { battleId } = useParams();
  const [hasError, setHasError] = useState(false);
  const { t } = useTranslation();

  const joinGame = async ({ isBot, positionIdx }: { isBot?: boolean, positionIdx: number }) => {
    if (!isLoggedIn) {
      window.location.assign(STEAM_AUTH_URL);
      return;
    }

    if (joining) {
      return;
    }

    setJoining(true);

    try {
      await caseApi
        .joinGame(battleId, {
          player: {
            positionIdx,
            ...(isBot && { botId: uuidv4() })
          }
        });
    } catch (e) {
      setHasError(true);

      if (typeof e === 'string') {
        toast.error(e);
      } else {
        toast.error(t({ id: 'error.UnexpectedErrorTryAgain', defaultMessage: 'Unexpected error. Please try again.' }));
        captureException(e);
      }
    }

    setJoining(false);
  };

  const joinPlayer = (positionIdx: number) => joinGame({ positionIdx });
  const joinBot = (positionIdx: number) => joinGame({ isBot: true, positionIdx });


  return {
    joining,
    joinGame,
    joinPlayer,
    joinBot,
    hasError,
  };
};