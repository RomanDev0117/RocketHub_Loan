
import * as Sentry from '@sentry/react';
import { APP_ENV, APP_RELEASE } from '../constants';

export const intiSentry = () => {
  Sentry.init({
    dsn: 'https://6ae9c637ecac82e4e2f4c7504cb7467b@o4505520790634496.ingest.sentry.io/4505742339997696',
    enabled: import.meta.env.VITE_SENTRY_ENABLED === 'true',
    environment: APP_ENV,
    release: APP_RELEASE,

    integrations: [
      new Sentry.BrowserTracing({
        // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
        tracePropagationTargets: ['localhost', 'http://65.20.115.69', 'https://rocketbets.gg', 'https://rockethub.gg'],
      }),
      new Sentry.Replay(),
    ],
    // Performance Monitoring
    tracesSampleRate: 1.0, // Capture 100% of the transactions, reduce in production!
    // Session Replay
    replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
    replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.

  });
};
