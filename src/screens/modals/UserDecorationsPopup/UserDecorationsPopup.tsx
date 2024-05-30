import { Spacer } from "@/components/Spacer/Spacer";
import { Title28 } from "@/components/Typography/Typography";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Modal } from "../../../components/Modal/Modal";
import styles from "./UserDecorationsPopup.module.scss";
import { UserDecorationsLibrary } from "./components/UserDecorationsLibrary/UserDecorationsLibrary";

type TFormValues = {
  amount: number;
};

const DEFAULT_AMOUNT = 10;

export const UserDecorationsPopup = () => {
  const show = true;

  // const [tipRainApi, tipRainResult] = useTipRainMutation();
  // useHandleApiError({
  //   data: tipRainResult.data,
  //   isError: tipRainResult.isError,
  //   error: tipRainResult.error,
  // });

  // const schema = useMemo(() => {
  //   return yup.object({
  //     amount: yup
  //       .number()
  //       .typeError('Amount is required')
  //       .required('Amount is required')
  //       .min(0.01, 'Amount must be greater than 0.01')
  //       .max(1000, 'Amount must be less than 1000'),
  //   });
  // }, []);

  const { reset } = useForm<TFormValues>({
    mode: "onChange",
    // resolver: yupResolver(schema),
    defaultValues: {},
  });

  useEffect(() => {
    if (show) {
      reset({ amount: DEFAULT_AMOUNT });
    }
  }, [show, reset]);

  return (
    <>
      <Modal
        show={show}
        onClose={() => {
          return;
        }}
        className={styles.modal}
      >
        <Title28>User Decorations</Title28>

        <Spacer y={20} />

        <UserDecorationsLibrary />
      </Modal>
    </>
  );
};
