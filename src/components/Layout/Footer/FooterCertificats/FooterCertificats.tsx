import { DocumentWithLinesIcon } from '../../../icons/DocumentWithLinesIcon';
import { ShieldCheckIcon } from '../../../icons/ShieldCheckIcon';
import { AgeRestriction } from '../AgeRestriction/AgeRestriction';
import styles from './FooterCertificats.module.scss';

export const FooterCertificats = () => {
  const items = [
    {
      icon: <ShieldCheckIcon color="#41BD4C" />,
      title: 'SSL 256-bit',
      description: 'RSA Encryption',
    },
    {
      icon: <DocumentWithLinesIcon color="#419EBD" />,
      title: 'Provably Fair',
      description: 'Blockchain-powered',
    }
  ];

  return (
    <div className={styles.root}>
      <AgeRestriction className={styles.ageRestriction} />
      {items.map(item => (
        <div key={item.title} className={styles.item}>
          {item.icon}
          <div className={styles.content}>
            <div className={styles.title}>{item.title}</div>
            <div className={styles.description}>{item.description}</div>
          </div>
        </div>
      ))}
    </div>
  );
};