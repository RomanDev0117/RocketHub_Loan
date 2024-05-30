import blik from './images/blik.svg';
import mastercard from './images/mastercard.svg';
import neosurf from './images/neosurf.svg';
import visa from './images/visa.svg';
import zen from './images/zen.svg';
import styles from './DepositCreditCardLogoList.module.scss';



export const DepositCreditCardLogoList = () => {
  const logos = [
    mastercard,
    visa,
    zen,
    neosurf,
    blik,
  ];

  return <div className={styles.grid}>
    {logos.map((logo, idx) => {
      return <div className={styles.logo} key={idx}>
        <img src={logo} alt="Payment system logo" />
      </div>;
    })}
  </div>;
};