import { useMediaQuery, useTheme } from '@mui/material';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Genre } from './types';
import { useStoreActions, useStoreState } from './store';
import { Player } from './player/Player';

function usePrevious<T>(value: T) {
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  const ref = useRef<T>();

  // Store current value in ref
  useEffect(() => {
    ref.current = value;
  }, [value]); // Only re-run if value changes

  // Return previous value (happens before update in useEffect above)
  return ref.current;
}

export const useIsMobile = () => {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.down('sm'));
};

export default function useDeviceDetect() {
  const [isMobile, setMobile] = useState(false);

  useEffect(() => {
    const userAgent =
      typeof window.navigator === 'undefined' ? '' : navigator.userAgent;
    const mobile = Boolean(
      userAgent.match(
        /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
      )
    );
    setMobile(mobile);
  }, []);

  return { isMobile };
}

export const usePlayer = () => {
  const player = window.player;
  const playerState = useStoreState((store) => store.playerState);
  const {
    isPlaying,
    genre,
    commentary,
    masterVolume,
    loaded,
    beganLoading,
    beganPlaying,
  } = playerState;

  const previousGenre = usePrevious<Genre>(genre);

  const updatePlayerState = useStoreActions(
    (actions) => actions.updatePlayerState
  );

  const updateCurrentTrackInStore = useCallback(() => {
    if (!player) throw new Error('cannot update without player');
    const track = player.getCurrentTrack();
    updatePlayerState({
      currentTrack: track,
      loaded: track.isLoaded,
      currentTrackLoaded: track.isLoaded,
      isPlaying: player.isPlaying,
    });
    if (!track.isLoaded) {
      track.track?.trackLoad.then(() => {
        updateCurrentTrackInStore();
      });
    }
  }, [updatePlayerState, player]);

  useEffect(() => {
    if (!beganLoading) return;
    const loadedWait = setInterval(() => {
      console.log('waiting for first track to load..');
      if (window.playerLoaded) {
        if (!player) throw new Error('wtf no player?');
        updatePlayerState({
          loaded: true,
        });
        updateCurrentTrackInStore();
        clearInterval(loadedWait);
      }
    }, 100);
    return () => clearInterval(loadedWait);
  }, [updatePlayerState, beganLoading, player, updateCurrentTrackInStore]);

  useEffect(() => {
    if (!player) return;
    player.onSongFinished = () => {
      player.playNextTrack();
      updateCurrentTrackInStore();
    };
  }, [updateCurrentTrackInStore, player]);

  useEffect(() => {
    if (!player) return;
    let nextGenre = genre;
    nextGenre = commentary ? 'commentary' : nextGenre;
    player.setVolumes({
      nextGenre,
      previousGenre: previousGenre || nextGenre, // this may be undefined on first render
      masterVolume,
    });
  }, [genre, commentary, masterVolume, loaded, player, previousGenre]);

  const doIfPlayerExists = useCallback(
    (cb: (p: Player) => void) => () => {
      if (player) {
        cb(player);
      }
    },
    [player]
  );
  return {
    setBeganLoadingTrue: () => {
      updatePlayerState({ ...playerState, beganLoading: true });
    },
    handleOnPlay: doIfPlayerExists((p) => {
      p.play();
      if (!beganPlaying) {
        updatePlayerState({ ...playerState, beganPlaying: true });
      }
      updatePlayerState({ isPlaying: true });
    }),
    handlePause: doIfPlayerExists((p) => {
      p.pause();
      updatePlayerState({ isPlaying: false });
    }),
    handleSkipForward: doIfPlayerExists((p) => {
      if (isPlaying) {
        p.playNextTrack();
      } else {
        p.prepareNextTrack();
      }
      updateCurrentTrackInStore();
    }),
    handleSkipBack: doIfPlayerExists((p) => {
      if (isPlaying) {
        p.playPreviousTrack();
      } else {
        p.preparePreviousTrack();
      }
      updateCurrentTrackInStore();
    }),
    setMasterVolume: (vol: number) => {
      updatePlayerState({ masterVolume: vol });
    },
    setCommentary: (commentary: boolean) => {
      updatePlayerState({ commentary });
    },
    setGenre: (genre: Genre) => {
      updatePlayerState({ genre });
    },
    ...playerState,
  };
};

type Vibe = Genre | 'liner-notes';

export const useBackground = () => {
  const [background, setBackground] = useState<Vibe>('acoustic');
  const { isPlaying, commentary, genre, beganPlaying } = usePlayer();

  useEffect(() => {
    if (commentary) {
      setBackground('liner-notes');
      return;
    }
    setBackground(genre);
  }, [commentary, genre]);

  return {
    display: (bg: Vibe) => {
      if (!isPlaying && !beganPlaying) return 'none';
      if (bg === background) return 'unset';
      return 'none';
    },
  };
};

const displayNoneState = {
  loading: 'none',
  play: 'none',
  violetLife: 'none',
  quietLife: 'none',
  linerNotes: 'none',
};
export const useInfoDisplay = () => {
  const { isPlaying, commentary, genre, loaded, beganPlaying } = usePlayer();
  const [displayState, setDisplayState] = useState({ ...displayNoneState });
  useEffect(() => {
    if (!loaded) {
      setDisplayState({ ...displayNoneState, loading: 'unset' });
      return;
    }
    if (!isPlaying && !beganPlaying) {
      setDisplayState({ ...displayNoneState, play: 'unset' });
      return;
    }
    if (commentary) {
      setDisplayState({ ...displayNoneState, linerNotes: 'unset' });
      return;
    }
    if (genre === 'acoustic') {
      setDisplayState({ ...displayNoneState, quietLife: 'unset' });
      return;
    }
    if (genre === 'synthetic') {
      setDisplayState({ ...displayNoneState, violetLife: 'unset' });
    }
  }, [isPlaying, commentary, genre, loaded, beganPlaying]);

  return displayState;
};

export const useCurrentTrackText = () => {
  const { currentTrack } = usePlayer();
  return `${currentTrack?.trackData?.title}`;
};
