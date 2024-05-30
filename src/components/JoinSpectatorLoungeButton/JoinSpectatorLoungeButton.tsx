import { Button, TButtonProps } from '@/components/Button/Button';
import { useLoginPopup } from '@/hooks/useLoginPopup';
import { useSm } from '@/hooks/useMediaHooks';
import { selectJoinSpectatorLoungeModalOpen } from '@/store/slices/caseBattleSlice';
import { selectUserSteamId } from '@/store/slices/userSlice';
import { TCaseGame } from '@/types/caseTypes';
import {
  canJoinLounge
} from '@/utils/caseBattle.utils';
import clsx from 'clsx';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { RequiremenetsTooltip } from '../RequiremenetsTooltip/RequiremenetsTooltip';
import { SofaIcon } from '../icons/SofaIcon';
import styles from './JoinSpectatorLoungeButton.module.scss';
import { useSpectatorLoungeLog } from './useSpectatorLoungeLog';

type TProps = {
  caseBattle: TCaseGame | null;
  variant?: 'minimal' | 'default';
  className?: string;
  withRequirements?: boolean;
  size?: TButtonProps['size'];
  height?: TButtonProps['height'];
  onClick?: () => void;
};

export const JoinSpectatorLoungeButton = memo(
  ({
    caseBattle,
    className,
    withRequirements,
    size,
    height,
    variant = 'default',
    onClick,
  }: TProps) => {
    const steamId = useSelector(selectUserSteamId);
    const loginPopup = useLoginPopup();
    const isSm = useSm();
    const { hasJoined } = useSpectatorLoungeLog();
    useSelector(selectJoinSpectatorLoungeModalOpen); // just to trigger rerender when user joins the lounge. Lounge modal is closed after user joins and we will rerender this component

    if (!canJoinLounge(caseBattle, steamId, hasJoined)) {
      return null;
    }

    const requirements = [
      'Put rockethub.gg in your Steam name and re-log',
      'Join our Discord',
      'Level 10+ on Rockethub',
      'Steam profile & inventory set to public',
      'Level 5+ on Steam',
    ];

    const minimal = variant === 'minimal';

    const button = (
      <Button
        className={clsx(styles.button, className, {
          [styles.minimal]: minimal,
        })}
        size={size}
        height={height}
        pressable
        onClick={loginPopup.openIfNeeded(() => onClick?.())}
        prepend={<SofaIcon />}
        color="purple"
        gap={6}
      >
        {minimal || isSm ? null : 'Lounge'}
      </Button>
    );

    if (!withRequirements) {
      return button;
    }

    return (
      <RequiremenetsTooltip requirements={requirements}>
        {button}
      </RequiremenetsTooltip>
    );
  }
);
