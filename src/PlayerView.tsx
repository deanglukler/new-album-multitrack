import React, { useEffect, useState } from 'react';
import './App.css';
import { TrackData } from './types';
import { Transport } from './Transport';
import { Player } from './Player';

function PlayerView({ player }: { player: Player }) {
  const [currentTrack] = useState<TrackData>(player.firstTrack);
  const [isPlaying, setIsPlaying] = useState(false);

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
  };

  const handleSkipBack = () => {};

  const handlePause = () => {
    setIsPlaying(false);
  };

  return (
    <Transport
      isPlaying={isPlaying}
      onPlay={handleOnPlay}
      onPause={handlePause}
      onSkipBack={handleSkipBack}
      onSkipForward={handleSkipForward}
    />
  );
}

export default PlayerView;
