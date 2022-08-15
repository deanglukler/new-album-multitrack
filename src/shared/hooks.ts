import { useMediaQuery, useTheme } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { Genre, TrackData } from './types';
import { useStoreActions, useStoreState } from './store';

export const useIsMobile = () => {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.down('sm'));
};

export const usePlayer = () => {
  const player = window.player;
  const playerState = useStoreState((store) => store.playerState);
  const { isPlaying, genre, commentary, masterVolume, loaded, beganLoading } =
    playerState;
  const updatePlayerState = useStoreActions(
    (actions) => actions.updatePlayerState
  );
  const setCurrentTrack = useCallback(
    (track: TrackData) => {
      updatePlayerState({ currentTrack: track });
    },
    [updatePlayerState]
  );

  useEffect(() => {
    if (!beganLoading) return;
    const loadedWait = setInterval(() => {
      console.log('waiting for load..');
      if (window.playerLoaded) {
        updatePlayerState({ loaded: true });
        clearInterval(loadedWait);
      }
    }, 100);
  }, [updatePlayerState, beganLoading]);

  useEffect(() => {
    if (!player) return;
    player.onSongFinished = () => {
      player.playNextTrack();
      setCurrentTrack(player.currentTrack);
    };
  }, [setCurrentTrack, player]);

  useEffect(() => {
    if (!player) return;
    player.setVolumes({ genre, commentary, masterVolume });
  }, [genre, commentary, masterVolume, loaded, player]);

  return {
    setBeganLoadingTrue: () => {
      updatePlayerState({ ...playerState, beganLoading: true });
    },
    handleOnPlay: () => {
      if (!player) return;
      player.play();
      updatePlayerState({ isPlaying: true });
    },
    handlePause: () => {
      if (!player) return;
      player.pause();
      updatePlayerState({ isPlaying: false });
    },
    handleSkipForward: () => {
      if (!player) return;
      if (isPlaying) {
        player.playNextTrack();
      } else {
        player.pauseNextTrack();
      }
      setCurrentTrack(player.currentTrack);
    },
    handleSkipBack: () => {
      if (!player) return;
      if (isPlaying) {
        player.playPreviousTrack();
      } else {
        player.pausePreviousTrack();
      }
      setCurrentTrack(player.currentTrack);
    },
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
