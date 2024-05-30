import { toast } from 'react-hot-toast';
import { Button } from '../../../components/Button/Button';
import { Logo } from '../../../components/Logo/Logo';
import { Modal } from '../../../components/Modal/Modal';
import { SteamIcon } from '../../../components/icons/SteamIcon';
import { T } from '../../../i18n/translate';
import styles from './LoginPopup.module.scss';
import useTranslation from '../../../hooks/useTranslation';
import { Checkbox } from '../../../components/Form/Checkbox';
import { useState } from 'react';
import { ROUTE } from '../../../types/routeTypes';
import { STEAM_AUTH_URL } from '../../../constants';
import { useSelector } from 'react-redux';
import { selectLoginPopupOpen } from '../../../store/slices/appSlice';
import { useLoginPopup } from '../../../hooks/useLoginPopup';

export const LoginPopup = () => {
  const { t } = useTranslation();
  const isOpen = useSelector(selectLoginPopupOpen);
  const loginPopup = useLoginPopup();

  const [state, setState] = useState({
    age: false,
    legal: false,
    terms: false,
  });

  const onCheckChange = (e: any) => {
    setState({
      ...state,
      [e.target.name]: e.target.checked,
    });
  };

  const handleSignInClick = () => {
    if (!state.age || !state.legal || !state.terms) {
      toast.error(
        t({
          id: 'auth.notification.PleaseAcceptTerms',
          defaultMessage: 'Please accept all terms of service',
        })
      );
      return;
    }

    window.location.assign(STEAM_AUTH_URL);
  };

  return (
    <Modal show={isOpen} onClose={() => loginPopup.close()} className={styles.modal}>
      <div className={styles.container}>
        <Logo className={styles.logo} />

        <div className={styles.text}>
          <p className={styles.title}>
            To login to RocketHub you need to agree to our Terms and{' '}
            <strong>confirm</strong> that:
          </p>

          <div className={styles.checkboxes}>
            <Checkbox
              checked={state.age}
              label="I am of a legal age"
              name="age"
              onChange={onCheckChange}
            />
            <Checkbox
              checked={state.legal}
              label="It is legal in my country to use RocketHub services"
              name="legal"
              onChange={onCheckChange}
            />
            <Checkbox
              checked={state.terms}
              name="terms"
              onChange={onCheckChange}
              label={
                <>
                  <T
                    id="auth.checkbox.IAgreeToTheToC"
                    defaultMessage="I agree to the Terms of Service (<tos-link>ToS</tos-link>)"
                    values={{
                      'tos-link': (...chunks: any) => (
                        <a href={ROUTE.TERMS_OF_USE} target="_blank" className={styles.tosLink}>
                          {chunks}
                        </a>
                      ),
                    }}
                  />
                </>
              }
            />
          </div>
        </div>

        <Button
          pressable
          prepend={<SteamIcon />}
          gap={9}
          px={27}
          className={styles.button}
          onClick={handleSignInClick}
        >
          <T id="auth.SignInWithSteam" defaultMessage="Sign in with Steam" />
        </Button>
      </div>
    </Modal>
  );
};
