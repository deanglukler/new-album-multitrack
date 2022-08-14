import { StoreProvider } from 'easy-peasy';
import React from 'react';
import './App.css';
import { DesktopContainer } from './desktop/DesktopContainer';
import { MobileContainer } from './mobile/MobileContainer';
import { useIsMobile } from './shared/hooks';
import { store } from './shared/store';

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
      {renderContainer()}
    </StoreProviderOverride>
  );
}

export default App;
