import clsx from 'clsx';
import styles from './Box.module.scss';

type TProps = {
  children: React.ReactNode;
  className?: string;
  direction?: 'column' | 'row';
  mb?: string | number;
  py?: number;
};

export const Box = ({
  children,
  className,
  direction = 'column',
  mb,
  py,
  ...rest
}: TProps) => {
  const style: React.CSSProperties =
    direction === 'column'
      ? { flexDirection: 'column' }
      : {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        minHeight: 64,
      };

  return (
    <div
      className={clsx(styles.container, className)}
      {...rest}
      style={{ 
        ...style, 
        marginBottom: mb,
        paddingTop: py,
        paddingBottom: py,
      }}
    >
      {children}
    </div>
  );
};
