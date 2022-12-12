import { createTheme, ThemeProvider } from '@mui/material';
import { StoreProvider } from 'easy-peasy';
import { themeOptions } from './features/homepage/utils/theme';
import { store } from './libs/store/store';

interface Props {
  children: JSX.Element;
}

const StoreProviderOverride = StoreProvider as any;

function Providers({ children }: Props): JSX.Element {
  return (
    <StoreProviderOverride store={store}>
      <ThemeProvider theme={createTheme(themeOptions)}>
        {children}
      </ThemeProvider>
    </StoreProviderOverride>
  );
}

export default Providers;
