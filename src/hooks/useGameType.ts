import { useLocalStorage } from 'react-use';
import { LS_SELECTED_GAME_TYPE } from '../constants';
import { GAME_TYPE } from '../types/caseTypes';
import { useState } from 'react';

export const useGameType = ({
  localStorage = false,
  defaultGame = GAME_TYPE.ALL,
}: {
  localStorage?: boolean;
  defaultGame?: GAME_TYPE;
}) => {
  const [lsGameType = GAME_TYPE.ALL, setLsGameType] = useLocalStorage(
    LS_SELECTED_GAME_TYPE,
    GAME_TYPE.ALL
  );
  const [sGameType, setSGameType] = useState(defaultGame);

  const gameType = localStorage ? lsGameType : sGameType;
  const setGameType = localStorage ? setLsGameType : setSGameType;

  return {
    gameType,
    setGameType,
  };
};
