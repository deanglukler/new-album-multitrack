import { createTheme, ThemeProvider } from '@mui/material';
import { StoreProvider } from 'easy-peasy';
import './App.css';
import { DesktopContainer } from './desktop/DesktopContainer';
import { MobileContainer } from './mobile/MobileContainer';
import { useIsMobile } from './shared/hooks';
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
  const isMobile = useIsMobile();
  function renderContainer() {
    if (isMobile) {
      return <MobileContainer />;
    }
    return <DesktopContainer />;
  }
  return (
    <StoreProviderOverride store={store}>
      <ThemeProvider theme={createTheme(themeOptions)}>
        {renderContainer()}
      </ThemeProvider>
    </StoreProviderOverride>
  );
}

export default App;
