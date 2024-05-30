
type TProps = {
  y?: number;
}

export const Spacer = ({ y = 0 }: TProps) => {
  return (
    <div
      style={{
        height: y,
        width: 0,
      }}
    />
  );
};