import referral from '../../../../assets/images/referral.png';
import { Flex } from '../../../../components/Flex/Flex';
import { T } from '../../../../i18n/translate';
import styles from '../TabCoupons/TabCoupons.module.scss';
import { TextField } from '../../../../components/Form/TextField/TextField';
import { Button } from '../../../../components/Button/Button';
import { PlusCircleIcon } from '../../../../components/icons/PlusCircleIcon';
import { useState } from 'react';
import { userApi } from '../../../../insolve-framework';
import { toast } from 'react-hot-toast';
import useTranslation from '../../../../hooks/useTranslation';
import { captureException } from '@sentry/react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../../store/slices/userSlice';
import { useGetUserDataBySteamIdQuery } from '../../../../store/slices/rockethubApi/user.endpoints';
import { Avatar } from '../../../../components/Avatar/Avatar';
import { Spacer } from '@/components/Spacer/Spacer';

export const TabReferrals = () => {
  const { t } = useTranslation();
  const [code, setCode] = useState('');
  const [couponLoading, setCouponLoading] = useState(false);
  const currentUser = useSelector(selectUser);

  const { data } = useGetUserDataBySteamIdQuery(
    currentUser?.referredBy as string,
    {
      skip: !currentUser?.referredBy,
    }
  );

  const useCode = async () => {
    const _code = code.trim();
    if (!_code) {
      toast.error(
        t({
          id: 'referral.CodeIsMissing',
          defaultMessage: 'Please provide referral code!',
        })
      );
      return;
    }

    setCouponLoading(true);

    try {
      await userApi.useRefCode(code);
      toast.success(
        t({
          id: 'coupons.claimCouponSuccessMessage',
          defaultMessage: 'Code claimed!',
        })
      );
    } catch (e: any) {
      captureException(e);
      const message: string = e.toString();
      toast.error(message);
    }

    setCouponLoading(false);
  };

  const alreadyReferred = Boolean(currentUser?.referredBy);

  return (
    <Flex container flexDirection="column" alignItems="center">
      <Spacer y={16} />
      <Flex container flexDirection="column" alignItems="center">
        <img
          src={referral}
          alt="Coupon"
          className={styles.couponImg}
        />
        <Spacer y={35} />
        <h4 className={styles.title}>
          <T
            id="referral.ApplyReferralCode"
            defaultMessage="Apply Referral Code"
          />
        </h4>
      </Flex>

      <Spacer y={35} />

      {alreadyReferred && (
        <Flex container flexDirection="column" mb={16} gap={8} alignItems="center">
          Referred by{' '}
          {data?.success ? (
            <>
              <Avatar
                src={data.user.avatar}
                size={32}
                bordered
                level={data.user.level}
              />
              {data.user.name}
            </>
          ) : (
            ''
          )}
        </Flex>
      )}

      <div className={styles.form}>
        <TextField
          value={code}
          onChange={(e) => setCode(e.target.value)}
          height={44}
          fullWidth
          variant='contained'
          label="Referral code"
          placeholder="FREE"
        />
        <Button
          pressable
          px={20}
          fullWidth
          size="huge"
          prepend={<PlusCircleIcon width={20} height={20} />}
          loading={couponLoading}
          onClick={useCode}
          height={47}
          type="button"
          className={styles.button}
        >
          <T id="common.Apply" defaultMessage="Apply" />
        </Button>
      </div>

      <Spacer y={20} />

      <div className={styles.info}>
        <T
          id="referral.DoNotHaveAReferralCode"
          defaultMessage={'Don\'t have a referral code? Enter "FREE"'}
        />
      </div>
    </Flex>
  );
};
