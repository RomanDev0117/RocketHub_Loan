import styles from './StyledTextContent.module.scss';

export const StyledTextContent = (props: any) => {
  return <div {...props} className={styles.content}  />;
};