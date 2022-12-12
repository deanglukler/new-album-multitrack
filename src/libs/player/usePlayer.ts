import { useStoreState } from '../store';
import { Transport } from './Transport';
import { getCurrentTrackName } from './utils/getCurrentTrackName';
import { isCurrentTrackLoaded } from './utils/isCurrentTrackLoaded';

export function usePlayer() {
  const {
    isPlaying,
    version,
    beganPlayingFirstTrack,
    currentTrackIndex,
    tracks,
  } = useStoreState((store) => store.player);
  const currentTrackLoaded = isCurrentTrackLoaded(currentTrackIndex, tracks);
  const currentTrackName = getCurrentTrackName(currentTrackIndex, tracks);

  return {
    isPlaying,
    beganPlayingFirstTrack,
    version,
    currentTrackLoaded,
    currentTrackName,
    //
    // actions..
    setVersion: Transport.setVersion,
    play: Transport.play,
    pause: Transport.pause,
    skipBack: () => Transport.skip('previous'),
    skipForward: () => Transport.skip('next'),
  };
}
