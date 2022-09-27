import { createTheme, ThemeProvider } from '@mui/material';
import { StoreProvider } from 'easy-peasy';
import './App.css';
import AppWrapper from './AppWrapper';
import { Player } from './shared/player/Player';
import { store } from './shared/store';
import { themeOptions } from './shared/theme';
import React from 'react';
import Bugsnag from '@bugsnag/js';
import BugsnagPluginReact from '@bugsnag/plugin-react';

Bugsnag.start({
  apiKey: '4826834f6e4b2061547a57d476f0e15c',
  plugins: [new BugsnagPluginReact()],
});

declare global {
  interface Window {
    player: Player | null;
    playerEnabled: boolean;
  }
}

const ErrorBoundary = Bugsnag.getPlugin('react')?.createErrorBoundary(React);

const StoreProviderOverride = StoreProvider as any;

function App() {
  if (!ErrorBoundary) {
    console.error('ErrorBoundary is null');
    return <></>;
  }
  return (
    <ErrorBoundary>
      <StoreProviderOverride store={store}>
        <ThemeProvider theme={createTheme(themeOptions)}>
          <AppWrapper />
        </ThemeProvider>
      </StoreProviderOverride>
    </ErrorBoundary>
  );
}

export default App;
