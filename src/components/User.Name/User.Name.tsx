import { useMemo } from 'react';
import { TGlobalUser } from '../../types/userTypes';
import { getLevelColor } from '../../utils/level.utils';

type TProps = {
  user: TGlobalUser;
  className?: string;
}

export const UserName = ({ user, className }: TProps) => {
  const color = useMemo(() => {
    return getLevelColor(user?.level);
  }, [user]);

  return (
    <span style={{ color }} className={className}>{user.name}</span>
  );
};