import { useSelector } from 'react-redux';
import InfoDialogUI from './InfoDialogUI';
import { infoDialogSelector } from '../../redux/slicers/infoDialogSlicer';

const InfoDialog = () => {
  const config = useSelector(infoDialogSelector).config;

  return <InfoDialogUI {...config} />;
};

export default InfoDialog;
