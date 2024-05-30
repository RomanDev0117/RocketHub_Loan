import { Button } from '../../../../components/Button/Button';
import { Modal } from '../../../../components/Modal/Modal';
import { Title1 } from '../../../../components/Typography/Typography';

type TProps = {
  show: boolean;
  url: string;
  onClose: () => void;
}

export const SkinsBackModal = ({ show, url, onClose }: TProps) => {
  return (
    <Modal show={show} onClose={onClose} >
      <div style={{ textAlign: 'center' }}>
        <Title1 mb={24} style={{ justifyContent: 'center' }}>SKINSBACK DEPOSIT</Title1>
        <p>You will be redirected to skinsback.com</p>
        <Button Component="a" href={url} target="_blank" pressable style={{ marginTop: 24 }}>
          Deposit via skinsback.com
        </Button>
      </div>
    </Modal>
  );
};