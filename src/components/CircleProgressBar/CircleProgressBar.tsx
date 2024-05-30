import clsx from 'clsx';
import styles from './CircleProgressBar.module.scss';
import { CSSProperties, SVGAttributes } from 'react';

export type TCircleProgressBarProps = {
  size?: number;
  progress?: number;
  trackWidth?: number;
  trackColor?: string;
  indicatorWidth?: number;
  indicatorColor?: string;
  indicatorCap?: SVGAttributes<SVGElement>['strokeLinecap'];
  label?: React.ReactNode;
  labelColor?: string;
  spinnerMode?: boolean;
  spinnerSpeed?: number;
  className?: string;
  indicatorStyle?: CSSProperties;
  trackStyle?: CSSProperties;
};

export const CircleProgressBar = (props: TCircleProgressBarProps) => {
  const {
    className,
    size = 150,
    progress = 0,
    trackWidth = 10,
    trackColor = '#ddd',
    indicatorWidth = 10,
    indicatorColor = 'var(--primary-color)',
    indicatorCap = 'round',
    label,
    labelColor = 'var(--white)',
    spinnerMode = false,
    spinnerSpeed = 1,
    indicatorStyle,
    trackStyle,
  } = props;

  const center = size / 2,
    radius =
      center - (trackWidth > indicatorWidth ? trackWidth : indicatorWidth),
    dashArray = 2 * Math.PI * radius,
    dashOffset = dashArray * ((100 - progress) / 100) || 0;

  const hideLabel = !label || spinnerMode ? true : false;
  const animationDuration = spinnerSpeed * 1000;

  return (
    <>
      <div
        className={clsx(styles.container, className)}
        style={{ width: size, height: size }}
      >
        <svg className="svg-pi" style={{ width: size, height: size }}>
          <circle
            className="svg-pi-track"
            cx={center}
            cy={center}
            fill="transparent"
            r={radius}
            stroke={trackColor}
            strokeWidth={trackWidth}
            style={{
              ...trackStyle,
            }}
          />
          <circle
            className={`svg-pi-indicator ${spinnerMode ? 'svg-pi-indicator--spinner' : ''
              }`}
            style={{
              animationDuration: `${animationDuration}ms`,
              ...indicatorStyle,
            }}
            cx={center}
            cy={center}
            fill="transparent"
            r={radius}
            stroke={indicatorColor}
            strokeWidth={indicatorWidth}
            strokeDasharray={dashArray}
            strokeDashoffset={dashOffset}
            strokeLinecap={indicatorCap as any}
          />
        </svg>

        {!hideLabel && (
          <div className="svg-pi-label" style={{ color: labelColor }}>
            <span className="svg-pi-label__loading">{label}</span>

            {/* {!spinnerMode && (
              <span className="svg-pi-label__progress">
                {`${progress > 100 ? 100 : progress}%`}
              </span>
            )} */}
          </div>
        )}
      </div>
    </>
  );
};
