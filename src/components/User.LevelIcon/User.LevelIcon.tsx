import { useMemo } from 'react';
import { TGlobalUser } from '../../types/userTypes';
import { getLevelIcon } from '../../utils/level.utils';

type TProps = {
  user: TGlobalUser | null;
  size: string | number;
  className?: string;
};

export const UserLevelIcon = ({ user, className, size }: TProps) => {
  const levelIcon = useMemo(() => {
    return getLevelIcon(user?.level);
  }, [user?.level]);

  if (!levelIcon) {
    return null;
  }

  return (
    <img
      src={levelIcon}
      className={className}
      style={{
        width: size,
        height: size,
        flexGrow: 0,
        flexShrink: 0,
        flexBasis: size,
        objectFit: 'contain',
      }}
    />
  );
};
