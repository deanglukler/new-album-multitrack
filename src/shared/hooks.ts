import { useMediaQuery, useTheme } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { Genre, TrackData } from './types';
import { Player } from './Player';
import { useStoreActions, useStoreState } from './store';

export const useIsMobile = () => {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.down('sm'));
};

let playerLoaded = false;
export const player = new Player(() => {
  playerLoaded = true;
});

export const usePlayer = () => {
  const playerState = useStoreState((store) => store.playerState);
  const { isPlaying, genre, commentary, masterVolume, loaded } = playerState;
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
    const loadedWait = setInterval(() => {
      console.log('waiting for load..');
      if (playerLoaded) {
        updatePlayerState({ loaded: true });
        clearInterval(loadedWait);
      }
    }, 100);
  }, [updatePlayerState]);

  useEffect(() => {
    player.onSongFinished = () => {
      player.playNextTrack();
      setCurrentTrack(player.currentTrack);
    };
  }, [setCurrentTrack]);

  useEffect(() => {
    player.setVolumes({ genre, commentary, masterVolume });
  }, [genre, commentary, masterVolume, loaded]);

  return {
    handleOnPlay: () => {
      player.play();
      updatePlayerState({ isPlaying: true });
    },
    handlePause: () => {
      player.pause();
      updatePlayerState({ isPlaying: false });
    },
    handleSkipForward: () => {
      if (isPlaying) {
        player.playNextTrack();
      } else {
        player.pauseNextTrack();
      }
      setCurrentTrack(player.currentTrack);
    },
    handleSkipBack: () => {
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

export const useBackground = () => {
  type BackgroundKeys = Genre | 'liner-notes';
  const [background, setBackground] = useState<BackgroundKeys>('acoustic');
  const { isPlaying, commentary, genre } = usePlayer();

  useEffect(() => {
    if (commentary) {
      setBackground('liner-notes');
      return;
    }
    setBackground(genre);
  }, [commentary, genre]);

  return {
    display: (bg: BackgroundKeys) => {
      if (!isPlaying) return 'none';
      if (bg === background) return 'unset';
      return 'none';
    },
  };
};
