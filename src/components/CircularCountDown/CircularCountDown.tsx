import { memo, useEffect, useRef, useState } from "react";
import {
  CircleProgressBar,
  TCircleProgressBarProps,
} from "../CircleProgressBar/CircleProgressBar";

type TProps = {
  timeLeftMs: number;
  onTimerDone: () => void;
} & TCircleProgressBarProps;

export const CircularCountDown = memo(
  ({ timeLeftMs = 5000, onTimerDone, ...rest }: TProps) => {
    const msTotal = timeLeftMs;
    const [msLeft, setMsLeft] = useState(msTotal);

    const expireRef = useRef(new Date(Date.now() + msTotal));

    useEffect(() => {
      const timerId = setInterval(() => {
        const diff = expireRef.current.getTime() - Date.now();
        const newMsLeft = diff < 0 ? 0 : diff;
        setMsLeft(newMsLeft);

        if (diff < 0) {
          clearInterval(timerId);
          onTimerDone?.();
        }
      }, 20);

      return () => {
        clearInterval(timerId);
      };
    }, [setMsLeft]);

    const progress = 100 - ((msTotal - msLeft) * 100) / msTotal;
    const secondsLeft = Math.ceil(msLeft / 1000);

    return (
      <CircleProgressBar
        size={70}
        trackWidth={2}
        indicatorWidth={2}
        {...rest}
        progress={progress}
        label={secondsLeft || "GO"}
      />
    );
  }
);
