import { Avatar, TAvatarProps } from '../Avatar/Avatar';

type TProps = TAvatarProps & {
  userLevel: number;
}

export const AvatarCircle = ({ userLevel, ...rest }: TProps) => {
  return (
    <Avatar
      size={44}
      rounded="50%"
      level={userLevel}
      // style={{
      //   border: `1.5px solid ${getLevelColor(userLevel)}`,
      // }}
      {...rest}
    />
  );
};