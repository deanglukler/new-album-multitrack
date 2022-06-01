import React, { useEffect, useState } from 'react';
import './App.css';
import { Commentary, Genre, TrackData } from './types';
import { Transport } from './Transport';
import { Player } from './Player';
import {
  FormControlLabel,
  Radio,
  RadioGroup,
  Slider,
  Stack,
  Typography,
} from '@mui/material';
import { VolumeDown, VolumeUp } from '@mui/icons-material';

function PlayerView({ player }: { player: Player }) {
  const [currentTrack, setCurrentTrack] = useState<TrackData>(
    player.firstTrack
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [masterVolume, setMasterVolume] = useState(50);
  const [commentary, setCommentary] = useState<Commentary>('commentary');
  const [genre, setGenre] = useState<Genre>('acoustic');

  useEffect(() => {
    if (isPlaying) {
      player.play();
    } else {
      player.pause();
    }
  }, [currentTrack, isPlaying, player]);

  useEffect(() => {
    player.setVolumes({ genre, commentary, masterVolume });
  }, [genre, commentary, masterVolume, player, player.loading]);

  const handleOnPlay = () => {
    setIsPlaying(true);
  };

  const handleSkipForward = () => {
    player.playNextTrack();
    setCurrentTrack(player.currentTrack);
  };

  const handleSkipBack = () => {
    player.playPreviousTrack();
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

  return (
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
          value="commentary"
          control={<Radio />}
          label="Commentary"
        />
        <FormControlLabel
          value="no-commentary"
          control={<Radio />}
          label="No Commentary"
        />
      </RadioGroup>
      <RadioGroup
        aria-labelledby="electronic-on-off"
        name="electronic-acoustic-select"
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
          value="electronic"
          control={<Radio />}
          label="Electronic"
        />
      </RadioGroup>
    </Stack>
  );
}

export default PlayerView;
