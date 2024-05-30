import clsx from 'clsx';
import styles from './Typography.module.scss';

const createComponent = (DefaultComponent: any, cls: string) => {
  return ({
    mb,
    Component,
    style,
    uppercase,
    ...rest
  }: {
    mb?: number;
    Component?: any;
    className?: string;
    children?: React.ReactNode;
    style?: any;
    uppercase?: boolean;
  }) => {
    const C = Component || DefaultComponent;
    return (
      <C
        {...rest}
        className={clsx(cls, rest.className)}
        style={{
          marginBottom: mb, ...style, ...(uppercase ? { textTransform: 'uppercase' } : {})
        }}
      />
    );
  };
};

export const Title1 = createComponent('h1', styles.title1);
export const TextTitle1 = createComponent('div', styles.title1);
export const Title28 = createComponent('div', styles.title28);
export const Titleh4 = createComponent('h4', styles.title4);

export const SemiBoldText = createComponent('p', styles.semiBoldText);

export const NoDataMessage = createComponent('p', styles.noDataMessage);

export const Label = createComponent('label', styles.label);

export const BlockTitleSmall = createComponent('p', styles.blockTitleSmall);