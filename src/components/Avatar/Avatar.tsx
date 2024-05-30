import clsx from 'clsx';
import styles from './Avatar.module.scss';
import { Tooltip } from '../Tooltip/Tooltip';
import { memo, useMemo } from 'react';
import { getLevelColor } from '@/utils/level.utils';
import { AvatarLevelProgressCircle } from './components/AvatarLevelProgressCircle';

export type TShadowConfig = {
  bgShadow: string;
  shadow: string;
};

export type TAvatarProps = {
  src?: string;
  className?: string;
  rounded?: boolean | number | string;
  size?: string | number;
  alt?: string;
  bordered?: boolean;
  shadowConfig?: TShadowConfig | undefined;
  fallback?: React.ReactNode;
  level?: number;
  showLevel?: boolean;
  levelProgress?: number;
  style?: React.CSSProperties;
  onClick?: () => void;
};

export const Avatar = memo(
  ({
    src,
    className,
    rounded = true,
    size = 36,
    bordered,
    shadowConfig,
    fallback,
    level,
    style,
    showLevel,
    levelProgress,
    ...rest
  }: TAvatarProps) => {
    // const borderRadius = typeof rounded === 'boolean' ? 'var(--avatar-border-radius)' : rounded;
    const borderRadius = '50%';
    const levelColor = useMemo(() => {
      return getLevelColor(level);
    }, [level]);

    const _style = {
      width: size,
      height: size,
      borderRadius,
      borderColor: typeof levelProgress === 'number' ? 'transparent' : levelColor,
      ...style,
    };

    return (
      <Tooltip
        title={level ? `Level ${level}` : ''}
        variant="minimal"
        bg="var(--grey-900)"
      >
        <div
          className={clsx(styles.container, className, {
            [styles.withShadow]: Boolean(shadowConfig),
          })}
          style={
            {
              '--avatar-color': levelColor,
            } as any
          }
        // style={{ boxShadow: shadowConfig?.shadow }}
        >
          {/* {shadowConfig && (
          <div
            className={styles.bgShadow}
            style={{ background: shadowConfig?.bgShadow }}
          />
        )} */}
          {src && (
            <img
              src={src}
              style={_style}
              className={clsx(styles.image, {
                [styles.bordered]: bordered,
                [styles.clickable]: rest.onClick,
              })}
              {...rest}
            />
          )}
          {!src && (
            <div style={_style} className={styles.fallbackContainer}>
              {fallback}
            </div>
          )}

          {showLevel && typeof level === 'number' && (
            <span className={styles.level}>{level}</span>
          )}

          {levelProgress && (
            <AvatarLevelProgressCircle size={size} progress={levelProgress} />
          )}
        </div>
      </Tooltip>
    );
  }
);
