import { Spacer } from '@/components/Spacer/Spacer';
import { TTooltipProps, Tooltip } from '@/components/Tooltip/Tooltip';
import { Titleh4 } from '@/components/Typography/Typography';
import styles from './RequiremenetsTooltip.module.scss';

type TProps = {
  children: TTooltipProps['children'];
  requirements: string[];
}

export const RequiremenetsTooltip = ({ children, requirements }: TProps) => {
  const tooltipTitle = (
    <div>
      <Titleh4>REQUIREMENTS TO JOIN:</Titleh4>
      <Spacer y={16} />

      <ul className={styles.list}>
        {requirements.map((r, idx) => {
          return <li key={idx}>{r}</li>;
        })}
      </ul>
    </div>
  );

  return (
    <Tooltip title={tooltipTitle}>
      {children}
    </Tooltip>
  );
};