export const CopyIconGreen = ({
  className,
  onClick,
}: {
  className?: string;
  onClick: () => void;
}) => {
  return (
    <img
      src="/images/icons/copy-icon-green.svg"
      alt="Copy"
      className={className}
      onClick={onClick}
    />
  );
};
