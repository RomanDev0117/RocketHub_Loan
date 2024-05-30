// import facebook from '../../../../assets/images/socials/facebook.svg';
import twitter from '../../../../assets/images/socials/twitter.svg';
import discord from '../../../../assets/images/socials/discord.svg';
// import instagram from '../../../../assets/images/socials/instagram.svg';
// import twitch from '../../../../assets/images/socials/twitch.svg';

import styles from './FooterSocialLinks.module.scss';

export const FooterSocialLinks = ({ className }: { className?: string }) => {
  const links = [
    // { src: facebook, href: '/' },
    { src: twitter, href: 'https://twitter.com/RockethubGG' },
    { src: discord, href: 'https://discord.com/invite/rockethub' },
    // { src: instagram, href: '/' },
    // { src: twitch, href: '/' },
  ];

  return (
    <div className={className}>
      <h4 className={styles.title}>Socials</h4>
      <div className={styles.list}>
        {links.map((link, idx) => {
          return (
            <a
              href={link.href}
              key={idx}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={link.src} />
            </a>
          );
        })}
      </div>
    </div>
  );
};
