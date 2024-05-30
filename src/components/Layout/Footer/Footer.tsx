import clsx from 'clsx';
import { ContentContainer } from '../ContentContainer/ContentContainer';
import { FooterCertificats } from './FooterCertificats/FooterCertificats';
import { FooterLeft } from './FooterLeft/FooterLeft';
import { FooterNav } from './FooterNav/FooterNav';
import { FooterSocialLinks } from './FooterSocialLinks/FooterSocialLinks';
import { Copyright } from './Copyright/Copyright';
import styles from './Footer.module.scss';

export const Footer = () => {

  return (
    <footer
      className={clsx(styles.footer)}
    >
      <ContentContainer>
        <div className={styles.content}>
          <FooterLeft />
          <FooterNav />

          <div className={styles.right}>
            <FooterSocialLinks className={styles.hideOnMobile} />
            <FooterCertificats />
          </div>
          <Copyright className={styles.copyright} />
        </div>
      </ContentContainer>
    </footer>
  );
};
