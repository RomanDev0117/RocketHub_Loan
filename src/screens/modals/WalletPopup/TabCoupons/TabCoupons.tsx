import coupon from '../../../../assets/images/coupon.svg';
import { Flex } from '../../../../components/Flex/Flex';
import { T } from '../../../../i18n/translate';
import styles from './TabCoupons.module.scss';
import { TextField } from '../../../../components/Form/TextField/TextField';
import useTranslation from '../../../../hooks/useTranslation';
import { Button } from '../../../../components/Button/Button';
import { GroupIcon } from '../../../../components/icons/GroupIcon';
import { DISCORD_CHANNEL_URL } from '../../../../constants';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useClaimCouponMutation } from '@/store/slices/rockethubApi/user.endpoints';
import { useHandleApiError } from '@/hooks/useHandleApiError';
import { Spacer } from '@/components/Spacer/Spacer';

export const TabCoupons = () => {
  const { t } = useTranslation();
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [claimCouponApi, { data, error, isError }] = useClaimCouponMutation();
  useHandleApiError({ error, isError, data: data });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (loading) {
      return;
    }

    if (code.trim() === '') {
      toast.error(
        t({
          id: 'deposit.coupon.error.MissingCouponCode',
          defaultMessage: 'Please enter coupon code',
        })
      );
      return;
    }

    setLoading(true);

    try {
      const result = await claimCouponApi(code).unwrap();
      if (result.success) {
        toast.success(
          result?.msg ||
          t({
            id: 'deposit.coupon.CodeClaimed',
            defaultMessage: 'Code claimed',
          })
        );
        setCode('');
      }
    } catch (e) {
      // error is hanlded by `useHandleApiError`
    }

    setLoading(false);
  };

  return (
    <div >
      <Flex container flexDirection="column" alignItems="center">
        <Spacer y={16} />
        <Flex container flexDirection="column" alignItems="center">
          <img src={coupon} alt="Coupon" className={styles.couponImg} />
          <Spacer y={35} />
          <h4 className={styles.title}>
            <T
              id="coupons.RedeemCouponCode"
              defaultMessage="Redeem Coupon Code"
            />
          </h4>
        </Flex>
        <Spacer y={35} />

        <form className={styles.form} onSubmit={handleSubmit}>
          <TextField
            value={code}
            height={44}
            fullWidth
            label="Coupon code"
            placeholder="Enter coupon code"
            maxLength={16}
            variant="contained"
            onChange={(e) => {
              const code = e.target.value.toUpperCase();
              setCode(code);
            }}
          />

          <Button
            type="submit"
            pressable
            fullWidth
            px={20}
            height={47}
            size="huge"
            prepend={<GroupIcon className={styles.couponIcon} />}
            loading={loading}
            className={styles.button}
          >
            <T id="common.Claim" defaultMessage="Claim" />
          </Button>
        </form>

        <Spacer y={20} />

        <div className={styles.info}>
          <T
            id="coupons.WeRegularlyPlaceOnDiscord"
            defaultMessage="We regularly post these on our <link-to-discord>Discord</link-to-discord>"
            values={{
              'link-to-discord': (...chunks: any) => (
                <a href={DISCORD_CHANNEL_URL} target="_blank">
                  {chunks}
                </a>
              ),
            }}
          />
        </div>
      </Flex>
    </div>
  );
};
