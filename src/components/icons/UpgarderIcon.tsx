import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronsUp,
} from '@fortawesome/pro-solid-svg-icons';

export const UpgraderIcon = ({ className }: { className?: string }) => {
  return <FontAwesomeIcon icon={faChevronsUp} className={className} />;
};