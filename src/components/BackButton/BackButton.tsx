import { useNavigate } from 'react-router-dom';
import { Button } from '../Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/pro-solid-svg-icons';
import styles from './BackButton.module.scss';
import clsx from 'clsx';

type TProps = {
  className?: string;
  onClick?: () => void;
  children?: React.ReactNode;
}

export const BackButton = ({ onClick, children, className }: TProps) => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };
  return (
    <Button
      color="secondary"
      buttonStyle="flat"
      className={clsx(styles.button, className)}
      onClick={onClick || goBack}
    >
      <FontAwesomeIcon icon={faArrowLeft} fontSize={20} />
      {children}
    </Button>
  );
};
