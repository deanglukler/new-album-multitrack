import React, { useEffect, useState } from 'react';
import './App.css';
import { Genre, TrackData } from './types';
import { Transport } from './Transport';
import { Player } from './Player';
import { Stack, Typography } from '@mui/material';
import { LinearIndeterminate } from './components/LinearIndeterminate';
import { Header } from './Header';
import { Background } from './Background';

let playerLoaded = false;
const player = new Player(() => {
  playerLoaded = true;
});

function PlayerView() {
  const [loaded, setLoaded] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<TrackData>(
    player.firstTrack
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [masterVolume, setMasterVolume] = useState(50);
  const [commentary, setCommentary] = useState<boolean>(false);
  const [genre, setGenre] = useState<Genre>('acoustic');

  useEffect(() => {
    const loadedWait = setInterval(() => {
      console.log('waiting for load..');
      if (playerLoaded) {
        setLoaded(true);
        clearInterval(loadedWait);
      }
    }, 100);
  }, []);

  useEffect(() => {
    player.onSongFinished = () => {
      player.playNextTrack();
      setCurrentTrack(player.currentTrack);
    };
  }, []);

  useEffect(() => {
    if (isPlaying) {
      player.play();
    } else {
      player.pause();
    }
  }, [currentTrack, isPlaying]);

  useEffect(() => {
    player.setVolumes({ genre, commentary, masterVolume });
  }, [genre, commentary, masterVolume, loaded]);

  const handleOnPlay = () => {
    setIsPlaying(true);
  };

  const handleSkipForward = () => {
    if (isPlaying) {
      player.playNextTrack();
    } else {
      player.pauseNextTrack();
    }
    setCurrentTrack(player.currentTrack);
  };

  const handleSkipBack = () => {
    if (isPlaying) {
      player.playPreviousTrack();
    } else {
      player.pausePreviousTrack();
    }
    setCurrentTrack(player.currentTrack);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  function renderPlayer() {
    if (!isPlaying) return null;
    return (
      <>
        <Transport
          currentTrack={currentTrack}
          isPlaying={isPlaying}
          onPlay={handleOnPlay}
          onPause={handlePause}
          onSkipBack={handleSkipBack}
          onSkipForward={handleSkipForward}
          masterVolume={masterVolume}
          onChange={(...args: unknown[]) => {
            setMasterVolume(args[1] as number);
          }}
        />
        <Typography
          sx={{ cursor: 'pointer' }}
          onClick={() => {
            setCommentary(!commentary);
          }}
        >
          Liner Notes
        </Typography>
        <Typography
          sx={{ cursor: 'pointer' }}
          onClick={() => {
            if (genre === 'acoustic') {
              setGenre('synthetic');
            }
            if (genre === 'synthetic') {
              setGenre('acoustic');
            }
          }}
        >
          Change Lifestyle
        </Typography>
      </>
    );
  }

  return (
    <>
      <Background genre={genre} commentary={commentary} isPlaying={isPlaying} />
      <Stack
        sx={{
          display: 'flex',
        }}
      >
        <Header loaded={loaded} handlePlay={handleOnPlay} />
        {renderPlayer()}
      </Stack>
    </>
  );
}

export default PlayerView;
