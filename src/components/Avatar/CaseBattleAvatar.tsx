import { Avatar, TAvatarProps, TShadowConfig } from './Avatar';

type TProps = Omit<TAvatarProps, 'shadowConfig'> & {
  teamIdx?: number;
  isDuel?: boolean;
};

export const CaseBattleAvatar = ({ isDuel, teamIdx, ...rest }: TProps) => {

  const shadowConfigs: TShadowConfig[] = [
    { bgShadow: '#31F21E', shadow: '2px 2px 16px 0px rgba(29, 112, 21, 0.28)' },
    { bgShadow: '#A006FE', shadow: '2px 2px 16px 0px rgba(160, 6, 254, 0.28)' },
    { bgShadow: '#FFF200', shadow: '2px 2px 16px 0px rgba(183, 145, 11, 0.18)' },
    { bgShadow: '#FB2E2E', shadow: '2px 2px 16px 0px rgba(193, 44, 44, 0.28)' },
  ];

  let config = typeof teamIdx === 'number' ? shadowConfigs[teamIdx] : undefined;

  if (isDuel) {
    if (teamIdx === 0) {
      config = shadowConfigs[0];
    } else {
      config = shadowConfigs[3];
    }
  }

  return <Avatar rounded="var(--case-battle-avatar-radius)" {...rest} shadowConfig={config} />;
};
