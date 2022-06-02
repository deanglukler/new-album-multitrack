import React, { useEffect, useState } from 'react';
import './App.css';
import { Commentary, Genre, TrackData } from './types';
import { Transport } from './Transport';
import { Player } from './Player';
import {
  Box,
  FormControlLabel,
  Radio,
  RadioGroup,
  Slider,
  Stack,
  Typography,
} from '@mui/material';
import { VolumeDown, VolumeUp } from '@mui/icons-material';
import { LinearIndeterminate } from './components/LinearIndeterminate';

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
  const [commentary, setCommentary] = useState<Commentary>('no-commentary');
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

  const renderVolumeSlider = () => (
    <Stack
      spacing={2}
      direction="row"
      sx={{ mb: 1 }}
      alignItems="center"
      minWidth={150}
    >
      <VolumeDown />
      <Slider
        aria-label="Volume"
        value={masterVolume}
        onChange={(...args) => {
          setMasterVolume(args[1] as number);
        }}
      />
      <VolumeUp />
    </Stack>
  );

  if (!loaded) {
    return <LinearIndeterminate />;
  }

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Stack minWidth={250} alignItems="center">
        <Typography align="center">{currentTrack.title}</Typography>
        <Transport
          isPlaying={isPlaying}
          onPlay={handleOnPlay}
          onPause={handlePause}
          onSkipBack={handleSkipBack}
          onSkipForward={handleSkipForward}
        />
        {renderVolumeSlider()}
        <RadioGroup
          aria-labelledby="commentary-on-off"
          name="commentary"
          value={commentary}
          onChange={(...args) => {
            setCommentary(args[1] as Commentary);
          }}
        >
          <FormControlLabel
            value="no-commentary"
            control={<Radio />}
            label="No Commentary"
          />
          <FormControlLabel
            value="commentary"
            control={<Radio />}
            label="Commentary"
          />
        </RadioGroup>
        <RadioGroup
          aria-labelledby="synthetic-on-off"
          name="synthetic-acoustic-select"
          value={genre}
          onChange={(...args) => {
            setGenre(args[1] as Genre);
          }}
        >
          <FormControlLabel
            value="acoustic"
            control={<Radio />}
            label="Acoustic"
          />
          <FormControlLabel
            value="synthetic"
            control={<Radio />}
            label="Synthetic"
          />
        </RadioGroup>
      </Stack>
    </Box>
  );
}

export default PlayerView;
