import React, { useEffect, useState } from 'react';
import './App.css';
import { TrackData } from './types';
import { Transport } from './Transport';
import { Player } from './Player';
import { Box } from '@mui/system';
import { Slider, Stack, Typography } from '@mui/material';
import { VolumeDown, VolumeUp } from '@mui/icons-material';

function PlayerView({ player }: { player: Player }) {
  const [currentTrack, setCurrentTrack] = useState<TrackData>(
    player.firstTrack
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [masterVolume, setMasterVolume] = useState(0.5);

  useEffect(() => {
    if (isPlaying) {
      player.play();
    } else {
      player.pause();
    }
  }, [currentTrack, isPlaying, player]);

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
    </Stack>
  );
}

export default PlayerView;
