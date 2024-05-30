import { TRain } from '@/types/rain.types';
import styles from './RainUI.module.scss';
import { Spacer } from '@/components/Spacer/Spacer';
import clsx from 'clsx';
import { Button } from '@/components/Button/Button';
import { CrossIcon } from '@/components/icons/CrossIcon';
import { useSelector } from 'react-redux';
import { selectRainVisible } from '@/store/slices/appSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMeteor } from '@fortawesome/pro-solid-svg-icons';
import { closeRain, openRainTipPopup } from '@/store/actions/appActions';
import { PriceWithCoin } from '@/components/PriceWithCoin/PriceWithCoin';
import { BoldPeopleIcon } from '@/components/icons/BoldPeopleIcon';
import { Timer } from '../Timer/Timer';
import { RainJoinButton } from '../RainJoinButton/RainJoinButton';

type TProps = {
  rain: TRain;
  onJoin: () => void;
};

export const RainUI = ({ rain, onJoin }: TProps) => {
  const visible = useSelector(selectRainVisible);

  return (
    <div className={clsx(styles.rainOuterContainer, {
      [styles.visible]: visible,
    })}>
      <div
        className={clsx(styles.container, 'v2Variables')}
      >
        <button
          type="button"
          className={styles.closeButton}
          onClick={() => {
            closeRain();
          }}
        >
          <CrossIcon />
        </button>

        <header className={styles.header}>
          <div className={styles.topLine}>
            <h4 className={styles.title}>
              <FontAwesomeIcon icon={faMeteor} fontSize={16} />
              Meteorite Rain
            </h4>

            <div className={clsx(styles.playersCount, styles.text)}>
              <BoldPeopleIcon fill="#FDD134" />
              {rain.players.length}
            </div>
          </div>

        </header>
        <Spacer y={10} />

        <div className={styles.potContainer}>

          <div className={styles.potText}>
            <span className={styles.text}>Juice up!</span>
            <PriceWithCoin coinProps={{ shine: true }} className={styles.potAmount}>
              {rain.totalPot}
            </PriceWithCoin>
          </div>

          <Timer timerEnd={rain.endingAt * 1000} />
        </div>

        <Spacer y={8} />

        <footer className={styles.footer}>
          <RainJoinButton rain={rain} onJoin={onJoin} />

          <Button
            height={36}
            pressable
            color="secondary-v3"
            fullWidth
            onClick={() => openRainTipPopup()}
          >
            Tip Rain
          </Button>
        </footer>

        {/* <RainProgressBar key={rain.id} rain={rain} /> */}

        <img src="/images/rain/astronaut.svg" className={styles.astronaut} />
      </div>
    </div>
  );
};
