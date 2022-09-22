import { useEffect } from 'react';
import { DesktopContainer } from './desktop/DesktopContainer';
import { MobileContainer } from './mobile/MobileContainer';
import { useIsMobile, usePlayer } from './shared/hooks';
import { loadPlayer } from './shared/player/loadPlayer';

function AppWrapper() {
  const { setBeganLoadingTrue } = usePlayer();
  const isMobile = useIsMobile();

  useEffect(() => {
    window.addEventListener('load', () => {
      console.log('initializing player..');
      setBeganLoadingTrue();
      loadPlayer();
    });
  }, [setBeganLoadingTrue]);

  function renderContainer() {
    if (isMobile) {
      return <MobileContainer />;
    }
    return <DesktopContainer />;
  }
  return renderContainer();
}

export default AppWrapper;
