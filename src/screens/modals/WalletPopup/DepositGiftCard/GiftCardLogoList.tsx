import googlepay from './images/googlepay.svg';
import mastercard from './images/mastercard.svg';
import paypal from './images/paypal.svg';
import paysafe from './images/paysafe.svg';
import skrill from './images/skrill.svg';
import trustly from './images/trustly.svg';
import visa from './images/visa.svg';
import webmoney from './images/webmoney.svg';
import styles from './GiftCardLogoList.module.scss';
import { T } from '../../../../i18n/translate';

export const GiftCardLogoList = () => {
  const logos = [
    visa,
    mastercard,
    paypal,
    trustly,
    skrill,
    webmoney,
    paysafe,
    googlepay,
  ];

  return <div className={styles.grid}>
    {logos.map((logo, idx) => {
      return <div className={styles.logo} key={idx}>
        <img src={logo} alt="Payment system logo" />
      </div>;
    })}
    <div className={styles.andMore}>
      <T id="giftCardLogos.AndMore" defaultMessage="And more..." />
    </div>
  </div>;
};