import styles from './SidebarTitle.module.scss';

type TProps = {
  title: React.ReactNode;
  helperText?: React.ReactNode;
  mb?: string;
}

export const SidebarTitle = ({ title, helperText, mb }: TProps) => {
  return (
    <div className={styles.title} style={{ marginBottom: mb }}>
      <span className={styles.titleText}>{title}</span>
      <span className={styles.helperText}>{helperText}</span>
    </div>
  );
};