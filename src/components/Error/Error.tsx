import React from 'react';


import styles from './Error.module.scss';

type TProps = {
  icon?: React.ReactNode;
  title?: React.ReactNode;
  subTitle?: React.ReactNode;
  text?: React.ReactNode;
};

const Error = ({ icon, title, subTitle, text }: TProps) => (
  <div className={styles.root}>

    <h1 className={styles.text404}>
      {icon}
      {title}
    </h1>
    {subTitle}
    {text}
  </div>
);

export default Error;
