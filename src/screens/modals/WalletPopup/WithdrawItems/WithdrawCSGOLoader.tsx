import CircularProgress from '../../../../components/CircularProgress/CircularProgress';
import { Flex } from '../../../../components/Flex/Flex';
import Loader from '../../../../components/Loader/Loader';

type TProps = {
  loading: boolean;
  position?: 'absolute' | 'fixed'
};

export const WithdrawCSGOLoader = ({
  loading,
  position = 'absolute'
}: TProps) => {
  return (
    <Loader
      loading={loading}
      position={position}
      zIndex={100}
      backdrop
      renderProgress={() => {
        return (
          <Flex container flexDirection="column" alignItems="center" gap={10}>
            <CircularProgress />
            {/* <Title1>
              Buying items: {itemsDone}/{itemsTotal}
            </Title1> */}
          </Flex>
        );
      }}
    />
  );
};
