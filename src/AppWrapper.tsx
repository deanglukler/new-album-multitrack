import { useEffect } from 'react';
import { DesktopContainer } from './desktop/DesktopContainer';
import { MobileContainer } from './mobile/MobileContainer';
import { useIsMobile, usePlayer } from './shared/hooks';
import { loadPlayer } from './shared/player/loadPlayer';

let loadedWait = setInterval(() => {}, 100);

function AppWrapper() {
  const { setBeganLoadingTrue, updateCurrentTrackInStore } = usePlayer();
  const isMobile = useIsMobile();

  useEffect(() => {
    window.addEventListener('load', () => {
      console.log('initializing player..');
      setBeganLoadingTrue();
      loadPlayer();
    });
  }, [setBeganLoadingTrue]);

  useEffect(() => {
    clearInterval(loadedWait);
    loadedWait = setInterval(() => {
      console.log('waiting to enable player..');
      if (window.playerEnabled) {
        if (!window.player) throw new Error('wtf no player?'); // the player should NEVER be null here
        console.log('Player Enabled!');
        clearInterval(loadedWait);

        updateCurrentTrackInStore();
        window.player.initLoading();
        window.player.onTrackLoad = updateCurrentTrackInStore;
      }
    }, 100);
    return () => clearInterval(loadedWait);
  }, [updateCurrentTrackInStore]);

  function renderContainer() {
    if (isMobile) {
      return <MobileContainer />;
    }
    return <DesktopContainer />;
  }
  return renderContainer();
}

export default AppWrapper;
