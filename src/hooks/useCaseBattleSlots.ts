import { useMemo } from 'react';
import { BATTLE_TYPE, TDuelPlayer } from '../types/caseTypes';

export const useCaseBattleSlots = ({
  battleType,
  playersInDuel,
}: { 
  battleType: BATTLE_TYPE | undefined
  playersInDuel: TDuelPlayer[] | undefined;
}) => {
  
  const playerSlotList = useMemo(() => {
    if (!battleType || !playersInDuel) return [];
    
    // create slots
    const slotsPlaceholders = battleType === BATTLE_TYPE['4-way'] 
      ? [1, 1, 1, 1] 
      : battleType.split('v').map(item => parseInt(item));
    
    const slots = slotsPlaceholders.map((count) => {
      return [...Array(count)] as TDuelPlayer[];
    });

    // make sure that players are on correct slots
    const positionsMap: Record<string, [number, number]> = {};
    let positionIdx = 0;
    slots.forEach((slot, slotIdx) => {
      slot.forEach((_, playerIdx) => {
        positionsMap[positionIdx] = [slotIdx, playerIdx];
        slots[slotIdx][playerIdx] = { positionIdx } as TDuelPlayer;
        positionIdx++;
      });
    });

    playersInDuel.forEach((player) => {
      const [slotIdx, playerIdx] = positionsMap[player.positionIdx];
      slots[slotIdx][playerIdx] = player;
    });

    return slots;
  }, [battleType, playersInDuel]);

  return {
    playerSlotList
  };
};