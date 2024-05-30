import { Transition } from 'react-transition-group';
import styles from './ModalAnimation.module.scss';
import clsx from 'clsx';
import { ReactElement, cloneElement } from 'react';

const fadeStyles = {
  entering: styles.show,
  entered: styles.show,
  exiting: '',
  exited: '',
  unmounted: '',
};

const FADE_DURATION = 300;

export const Fade = ({ children, ...props }: { children: ReactElement<HTMLElement> }) => {
  return (
    <Transition {...props} timeout={FADE_DURATION}>
      {(status, innerProps) => {
        return cloneElement(children, {
          ...innerProps,
          className: clsx(
            styles.fade,
            fadeStyles[status],
            children.props.className
          ),
        });
      }}
    </Transition>
  );
};
