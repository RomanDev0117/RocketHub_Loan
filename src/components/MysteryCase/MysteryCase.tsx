import { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import styles from './MysteryCase.module.scss';
import  { Button } from '../Button/Button';
import { SwordsIconV3 } from '../icons/SwordsIconV3';
import { CoinIcon } from '../icons/CoinIcon';
import { FormattedPrice } from '../FormattedPrice/FormattedPrice';
import { T } from '../../i18n/translate';
import { useNavigate } from 'react-router-dom';
import { captureException } from '@sentry/react';
import { caseApi } from '../../../src/insolve-framework/index';
import { useSounds } from '../../hooks/useSounds'; 
import { useLoginPopup } from '../../hooks/useLoginPopup'; 
import useTranslation from '../../hooks/useTranslation';
import { selectIsLoggedIn, selectUser } from '../../../src/store/slices/userSlice';
import { getCaseBattlePath } from '../../../src/utils/url.utils';
import { usePopperTooltip } from 'react-popper-tooltip';
import { InfoTooltip } from '../InfoTooltip/InfoTooltip';

const caseData = [
  {
    src: "/images/Silver.svg"
  },
  {
    src: "/images/Silver.svg"
  },
  {
    src: "/images/Silver.svg"
  },
  {
    src: "/images/Silver.svg"
  },
  {
    src: "/images/Silver.svg"
  },
  {
    src: "/images/Silver.svg"
  }
];

const coins = [10, 25, 50, 100, 150];

export const MysteryCase = () => {
  const [selectAmount, setSelectAmount] = useState(10);
  const { t } = useTranslation();

  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [playSound] = useSounds();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const loginPopup = useLoginPopup();
  const [creating, setCreating] = useState(false);
  const popperTooltip = usePopperTooltip(
    {
      placement: 'top',
    },
    { strategy: 'fixed'}
  );

  const createMysteryBattle = async () => {
    playSound('createBattleButtonClick');
    if (!isLoggedIn) {
      loginPopup.open();
      return;
    }
    if (creating) return;
    if (!user) return;
    setCreating(true);
    try {
      const mysteryBattleId: any = await caseApi.createMysteryGame(selectAmount);
      console.log(mysteryBattleId.id, 'mysteryBattleId');
      navigate(getCaseBattlePath(mysteryBattleId.id));
    }catch(e : any) {
      captureException(e);

      let error = t({
        id: 'createCaseBattle.createError',
        defaultMessage: 'Unable to create case battle, please try again',
      });

      if (typeof e.error === 'string') {
        error = e.error;
      }

      toast.error(error);
      setCreating(false);
    }
  }
  return (
    <div className={styles.root}>
       <div ref={popperTooltip.setTriggerRef} className={styles.infoIcon}>
          <img
            src="/images/Info_icon.svg"
            alt="info icon"
          />
        </div>
        <InfoTooltip popperTooltip={popperTooltip} />
      <div className={styles.col1}>
       
        <img
          src="/images/mystery-box.svg"
          alt="mystery icon"
          style={{width: "163px"}}
        />
        <div className={styles.mysticTitle}>Mystery battles</div>
      </div>
      <div className={styles.col2}>
        <div className={styles.caseContainer}>
          { caseData.map((data, index) => {
            return  <div className={styles.imgContainer} key={index}>
                 <img
                    className={styles.caseImg}
                    src={data.src}
                    alt="CaseImage"
                  />
              </div>
          } )}
        </div>
      </div>
      <div className={styles.col3}>
        <div className={styles.coinContainer}>
          <CoinIcon /> <span style={{marginLeft: "4px"}}>Amount:</span>
          <div className={styles.amountContainer}>
            {coins.map((coin, index) => {
              return (
                <div className={selectAmount == coin ? styles.selectedAmountBox : styles.amountBox} key={index} onClick={() => setSelectAmount(coin)}>
                    {coin}
                </div>
              )
            })}
          </div>
        </div>
        <Button
          pressable
          className={styles.button}
          prepend={<SwordsIconV3 />}
          onClick={createMysteryBattle}
        >
          <T id="common.play" defaultMessage="PLAY" />
          <CoinIcon />
          <FormattedPrice value={selectAmount} fontWeight="inherit" />
        </Button>
      </div>
    </div>
  )
};