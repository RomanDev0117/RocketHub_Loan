import { TUser } from '@/types/userTypes';
import { Avatar, TAvatarProps } from './Avatar';
import { getLevelProgress } from '@/utils/user.utils';
import { memo } from 'react';

type TProps = TAvatarProps & {
  user: TUser | null;
}

export const AvatarWithProgress = memo(({ user, ...rest }: TProps) => {
  const lvl = user?.level ?? 0;
  const progress = getLevelProgress(user);

  return (
    <Avatar {...rest} level={lvl} levelProgress={progress} />
  );
});