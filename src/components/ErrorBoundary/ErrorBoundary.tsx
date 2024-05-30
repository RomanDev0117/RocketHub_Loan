

import { captureException } from '@sentry/react';
import React from 'react';

import Error from '../Error/Error';
import { Button } from '../Button/Button';
import { Link } from 'react-router-dom';
import { DISCORD_CHANNEL_URL } from '../../constants';

export default class ErrorBoundary extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error: any) {
    // You can also log the error to an error reporting service
    captureException(error);
  }

  render() {
    const { hasError } = this.state;

    if (hasError) {
      // You can render any custom fallback UI
      return (
        <div>
          <div>
            <Error
              title="Error"
              subTitle="Uh-Oh... An unexpected error occurred, don't worry, we are on it. In the mean time, please try again..."
              text={
                <>
                  <Button
                    pressable
                    onClick={() => window.location.reload()}
                  >
                    Refresh
                  </Button>
                  <Button
                    Component={Link}
                    href={DISCORD_CHANNEL_URL}
                  >
                    Support
                  </Button>
                </>
              }
            />
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
