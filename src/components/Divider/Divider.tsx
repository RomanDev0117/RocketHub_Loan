type TProps = {
  my?: number;
}

export const Divider = ({ my = 20 }: TProps) => {
  return (
    <div
      style={{
        height: 1,
        width: '100%',
        backgroundColor: 'var(--grey-750)',
        marginTop: my,
        marginBottom: my,
      }}
    />
  );
};