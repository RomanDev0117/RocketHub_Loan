import ReactDOM from 'react-dom/client';
import 'react-popper-tooltip/dist/styles.css';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { App } from './App.tsx';
import './assets/styles/main.scss';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary.tsx';
import { intiSentry } from './config/sentry.config';
import { InternalizationContextProvider } from './context/InternalizationProvider';
import store, { persistor } from './store';

intiSentry();

ReactDOM.createRoot(document.getElementById('root')!).render(
  // react strict mode causes routes are mounted 2 times
  // <React.StrictMode>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <InternalizationContextProvider>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </InternalizationContextProvider>
    </PersistGate>
  </Provider>
  // </React.StrictMode>
);
