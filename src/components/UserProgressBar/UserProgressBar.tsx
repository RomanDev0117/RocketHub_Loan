import { getLevelColor, getLvlDetails } from '@/utils/level.utils';
import { ProgressBar, TProgressBarProps } from '../ProgressBar/ProgressBar';
import { useMemo } from 'react';
import { positiveOrZero } from '@/utils/number.utils';

type TProps = {
  wagered: number;
  userLevel?: number;
} & Omit<TProgressBarProps, 'value' | 'maxValue'>

export const UserProgressBar = ({ wagered, userLevel, color, ...rest }: TProps) => {
  const levelColor = getLevelColor(userLevel);

  const lvlInfo = useMemo(() => {
    return getLvlDetails(userLevel || 0);
  }, [userLevel]);


  const value = positiveOrZero(wagered - lvlInfo.minWager);
  const maxValue = (lvlInfo.maxWager - lvlInfo.minWager) || 999999999;

  return <ProgressBar
    {...rest}
    value={value}
    maxValue={maxValue}
    color={color || levelColor}
  />;
};