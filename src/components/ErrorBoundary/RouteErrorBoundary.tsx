import { Link, useRouteError } from 'react-router-dom';
import Error from '../Error';
import { Button } from '../Button/Button';
import { useEffect } from 'react';
import { captureException } from '@sentry/react';
import { DISCORD_CHANNEL_URL } from '../../constants';
import { Flex } from '../Flex/Flex';

export const RouteErrorBoundary = () => {
  const error = useRouteError();
  console.error(error);

  useEffect(() => {
    captureException(error);
  }, [error]);


  return (
    <Error
      title="Error"
      subTitle="Uh-Oh... An unexpected error occurred, don't worry, we are on it. In the mean time, please try again..."
      text={
        <Flex container gap={20}>
          <Button
            pressable
            onClick={() => window.location.reload()}
          >
            Refresh
          </Button>
          <Button
            color='secondary-v3'
            Component={Link}
            pressable
            href={DISCORD_CHANNEL_URL}
            target="_blank"
          >
            Support
          </Button>
        </Flex>
      }
    />
  );
};
