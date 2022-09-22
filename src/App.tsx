import { createTheme, ThemeProvider } from '@mui/material';
import { StoreProvider } from 'easy-peasy';
import './App.css';
import AppWrapper from './AppWrapper';
import { Player } from './shared/player/Player';
import { store } from './shared/store';
import { themeOptions } from './shared/theme';

declare global {
  interface Window {
    player: Player | null;
    playerLoaded: boolean;
  }
}

const StoreProviderOverride = StoreProvider as any;

function App() {
  return (
    <StoreProviderOverride store={store}>
      <ThemeProvider theme={createTheme(themeOptions)}>
        <AppWrapper />
      </ThemeProvider>
    </StoreProviderOverride>
  );
}

export default App;
