import useSound from 'use-sound';
import { useDispatch, useSelector } from 'react-redux';
import BezierEasing from 'bezier-easing';
import {
  appActions,
  selectIsPossibleToPlaySound,
  selectSoundEnabled,
} from '../store/slices/appSlice';
import { useEffect, useRef } from 'react';
import { getAppState } from '@/store';

export const useSounds = () => {
  const isPossibleToPlaySound = useSelector(selectIsPossibleToPlaySound);

  const config = { volume: 0.3 };
  const [playCreateButtonSound] = useSound(
    '/sounds/create-battle-button.wav',
    config
  );

  const [playCoinSound] = useSound('/sounds/coin.wav', config);

  const play = (soundName: 'createBattleButtonClick' | 'coin' | 'spin') => {
    const soundEnabled = selectSoundEnabled(getAppState());

    if (!soundEnabled) return;
    if (!isPossibleToPlaySound) {
      return;
    }

    switch (soundName) {
      case 'createBattleButtonClick':
        playCreateButtonSound();
        break;
      // case 'spin':
      //   playSpinSound();
      //   break;
      case 'coin':
        playCoinSound();
        break;
      default:
        throw new Error('Unknown sound name');
    }
  };

  return [play];
};

const spinState = {
  playing: false,
};
export const useSpinSound = () => {
  const soundEnabled = useSelector(selectSoundEnabled);
  const isPossibleToPlaySound = useSelector(selectIsPossibleToPlaySound);
  const ticksRef = useRef<number[]>([]);

  const [playTickSound, tikSound] = useSound('/sounds/tick.wav', {
    volume: 1,
  });

  const [playLandSound, landSound] = useSound('/sounds/spin-land-2.wav', {
    volume: 1,
  });


  const stopSound = () => {
    ticksRef.current.forEach(clearTimeout);
  };

  useEffect(() => {
    tikSound.sound?.mute?.(!soundEnabled);
    landSound.sound?.mute?.(!soundEnabled);
  }, [soundEnabled]);

  useEffect(() => {
    return () => {
      spinState.playing = false;
      stopSound();
    };
  }, []);

  const play = (duration: number, itemsCount: number, delta = 0) => {
    if (!duration) {
      throw new Error('duration is missing');
    }

    if (!itemsCount) {
      throw new Error('itemsCount is missing');
    }

    const soundEnabled = selectSoundEnabled(getAppState());

    if (!soundEnabled) {
      return;
    }

    // if (Date.now() > 0) return;
    if (spinState.playing) return;
    if (!isPossibleToPlaySound) return;
    spinState.playing = true;

    // BezierEasing accepts arguments in opposite way than in css
    // const spline = new KeySpline(0.49, 0.95, 0.24, 1);
    // const easing = BezierEasing(0.24, 0.95, 0.49, 1); // cubic-bezier(0.24, 0.95, 0.49, 1);
    // const easing = BezierEasing(1 - 0.24, 1 - 0.95, 1 - 0.49, 1 - 1);
    const easing = BezierEasing(0.95, 0.24, 1, 0.49);
    const total = itemsCount - 1;
    // delta = 0;
    for (let i = 0; i <= total; i++) {
      const value = Math.min(i + delta, total);
      const percentage = value / total;
      const timeout = easing(percentage) * duration;

      const timerId = setTimeout(() => {
        if (i === itemsCount - 1) {
          spinState.playing = false;
          setTimeout(() => {
            playLandSound();
          }, 300);
        } else {
          playTickSound();
        }
      }, timeout);

      ticksRef.current.push(timerId);
    }
  };

  return [
    play,
    {
      stopSound,
    },
  ] as const;
};

export const useSoundSwitcher = () => {
  const dispatch = useDispatch();
  const soundEnabled = useSelector(selectSoundEnabled);

  const toggleSound = () => {
    dispatch(appActions.toggleSoundEnabled());
  };

  return {
    soundEnabled,
    toggleSound,
  };
};

// function KeySpline(mX1, mY1, mX2, mY2) {

//   this.get = function (aX) {
//     if (mX1 == mY1 && mX2 == mY2) return aX; // linear
//     return CalcBezier(GetTForX(aX), mY1, mY2);
//   };

//   function A(aA1, aA2) { return 1.0 - 3.0 * aA2 + 3.0 * aA1; }
//   function B(aA1, aA2) { return 3.0 * aA2 - 6.0 * aA1; }
//   function C(aA1) { return 3.0 * aA1; }

//   // Returns x(t) given t, x1, and x2, or y(t) given t, y1, and y2.
//   function CalcBezier(aT, aA1, aA2) {
//     return ((A(aA1, aA2) * aT + B(aA1, aA2)) * aT + C(aA1)) * aT;
//   }

//   // Returns dx/dt given t, x1, and x2, or dy/dt given t, y1, and y2.
//   function GetSlope(aT, aA1, aA2) {
//     return 3.0 * A(aA1, aA2) * aT * aT + 2.0 * B(aA1, aA2) * aT + C(aA1);
//   }

//   function GetTForX(aX) {
//     // Newton raphson iteration
//     let aGuessT = aX;
//     for (let i = 0; i < 4; ++i) {
//       const currentSlope = GetSlope(aGuessT, mX1, mX2);
//       if (currentSlope == 0.0) return aGuessT;
//       const currentX = CalcBezier(aGuessT, mX1, mX2) - aX;
//       aGuessT -= currentX / currentSlope;
//     }
//     return aGuessT;
//   }
// }
