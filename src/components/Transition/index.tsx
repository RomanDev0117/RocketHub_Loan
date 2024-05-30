/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useTransition, config, animated, useSpring } from '@react-spring/web';

type ITransitionProps = {
  children: JSX.Element;
  show: boolean;
  opacity?: boolean;
  maxHeight?: boolean;
  maxHeightValue?: string;
  scale?: boolean;
  disabled?: boolean;
  className?: string;
  removeChildren?: boolean;
  hideOverflow?: boolean;
  onTransitionEnd?: () => void;
  key?: string;
};

const Transition = ({
  children,
  show,
  opacity = true,
  maxHeight = true,
  maxHeightValue,
  scale = false,
  disabled,
  className,
  removeChildren,
  onTransitionEnd,
  hideOverflow,
  key,
}: ITransitionProps): JSX.Element => {
  const properties = {
    opacity: {
      initial: { opacity: 0 },
      final: { opacity: 1 },
    },

    maxHeight: {
      initial: { maxHeight: '0vh' },
      final: { maxHeight: maxHeightValue || '100vh' },
    },

    scale: {
      initial: { transform: 'scale(0.9)' },
      final: { transform: 'scale(1)' },
    },

    overflow: {
      initial: { overflow: 'hidden' },
      final: { overflow: 'visible' },
    },
  };

  const getProperties = (state = 'initial') => {
    let propsConfig = {};

    if (opacity) {
      // @ts-ignore
      propsConfig = { ...propsConfig, ...properties.opacity[state] };
    }

    if (maxHeight) {
      // @ts-ignore
      propsConfig = { ...propsConfig, ...properties.maxHeight[state] };
    }

    if (scale) {
      // @ts-ignore
      propsConfig = { ...propsConfig, ...properties.scale[state] };
    }

    if (hideOverflow) {
      // @ts-ignore
      propsConfig = { ...propsConfig, ...properties.overflow[state] };
    }

    return propsConfig;
  };

  const transitionConfig = {
    config: show ? { ...config.wobbly, duration: 150 } : { ...config.default, duration: 150 },
    from: getProperties(),
    enter: getProperties('final'),
    leave: getProperties(),
    onRest: onTransitionEnd,
  };

  const transitions = useTransition(show, transitionConfig);
  const springTransition = useSpring({
    to: show ? getProperties('final') : getProperties(),
    from: getProperties(),
    onRest: onTransitionEnd,
  });

  if (!removeChildren) {
    return (
      <animated.div key={key} className={className} style={springTransition}>
        {children}
      </animated.div>
    );
  }

  return (
    <>
      {transitions(
        (style, item) =>
          item && (
            <animated.div
              key={key}
              className={className}
              style={!disabled ? style : {}}
            >
              {children}
            </animated.div>
          )
      )}
    </>
  );
};

export default Transition;
