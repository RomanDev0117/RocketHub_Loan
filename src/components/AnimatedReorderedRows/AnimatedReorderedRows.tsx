// based on the example https://codesandbox.io/s/eloquent-meninsky-rzmc0?file=/src/App.tsx
import { useTransition, animated } from '@react-spring/web';
import styles from './AnimatedReorderedRows.module.scss';

type TProps<T> = {
  items: T[];
  itemHeight: number;
  getKey: (item: T) => string | number;
  renderItem: (item: T) => React.ReactNode;
};

export function AnimatedReorderedRows<T>({
  items,
  itemHeight,
  getKey,
  renderItem,
}: TProps<T>) {
  let height = 0;
  const transitions = useTransition(
    items.map((item) => ({
      ...item,
      y: (height += itemHeight) - itemHeight,
    })),
    {
      key: getKey,
      from: { height: itemHeight, opacity: 0 },
      leave: { height: itemHeight, opacity: 0 },
      enter: ({ y, height }: any) => ({ y, height, opacity: 1 }),
      update: ({ y, height }: any) => ({ y, height }),
    }
  );

  return (
    <div className={styles.list} style={{ height }}>
      {transitions((style, item, _, index) => {
        return (
          <animated.div
            className={styles.listItem}
            style={{
              zIndex: items.length - index,
              ...style,
              transform:
                (style as any).transform === 'none'
                  ? 'translate3d(0px, 0, 0px)'
                  : (style as any).transform,
            }}
          >
            {renderItem(item)}
          </animated.div>
        );
      })}
    </div>
  );
}
