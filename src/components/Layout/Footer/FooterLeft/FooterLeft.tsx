import visa from '../../../../assets/images/visa.png';
import mastercard from '../../../../assets/images/mastercard.png';
import btc from '../../../../assets/images/btc.png';
import eth from '../../../../assets/images/eth.png';
import ltc from '../../../../assets/images/ltc.png';
import zen from '../../../../assets/images/zen.svg';
import { Copyright } from '../Copyright/Copyright';
import { AgeRestriction } from '../AgeRestriction/AgeRestriction';
import styles from './FooterLeft.module.scss';

export const FooterLeft = () => {
  return (
    <div className={styles.root}>
      <img
        src="/images/logo.svg"
        alt="Rocket.hub logo"
        className={styles.logo}
      />

      <p className={styles.footerText}>
        RocketHub.gg is a brand name of Resim (Cyprus) LTD, REG NO. HE456389,
        Having it's registered address at 77 Strovolou Ave., Strovolos Center,
        4th Floor, Office 401, 2018 Nicosia, Cyprus
        <br />
        <a href="mailto:support@rockethub.gg" className={styles.supoprtLink}>
          support@rockethub.gg
        </a>
      </p>

      <div className={styles.paymentLogos}>
        <img src={visa} alt="Visa logo" />
        <img src={mastercard} alt="Mastercard logo" />
        <img src={zen} alt="Zen logo" />
        <img src={btc} alt="Bitcoin logo" />
        <img src={eth} alt="Ethereum logo" />
        <img src={ltc} alt="Litecoin logo" />
      </div>

      <AgeRestriction className={styles.desktopOnly} />

      <Copyright className={styles.desktopOnly} />
    </div>
  );
};
