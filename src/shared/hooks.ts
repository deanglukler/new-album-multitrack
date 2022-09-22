import { useMediaQuery, useTheme } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { Genre } from './types';
import { useStoreActions, useStoreState } from './store';
import { Player } from './player/Player';

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
    player.setVolumes({ genre, commentary, masterVolume });
  }, [genre, commentary, masterVolume, loaded, player]);

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
  const { isPlaying, commentary, genre } = usePlayer();

  useEffect(() => {
    if (commentary) {
      setBackground('liner-notes');
      return;
    }
    setBackground(genre);
  }, [commentary, genre]);

  return {
    display: (bg: Vibe) => {
      if (!isPlaying) return 'none';
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
  const { isPlaying, commentary, genre, loaded } = usePlayer();
  const [displayState, setDisplayState] = useState({ ...displayNoneState });
  useEffect(() => {
    if (!loaded) {
      setDisplayState({ ...displayNoneState, loading: 'unset' });
      return;
    }
    if (!isPlaying) {
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
  }, [isPlaying, commentary, genre, loaded]);

  return displayState;
};

export const useCurrentTrackText = () => {
  const { currentTrack } = usePlayer();
  return `${currentTrack?.trackData?.title}`;
};
