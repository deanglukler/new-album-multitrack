import React, { useEffect, useState } from 'react';
import './App.css';
import { TrackData } from './types';
import { Transport } from './Transport';
import { Player } from './Player';

const player = new Player();

function App() {
  const [currentTrack] = useState<TrackData>(player.firstTrack);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleOnPlay = () => {
    setIsPlaying(true);
  };

  const handleSkipForward = () => {};

  const handleSkipBack = () => {};

  const handlePause = () => {
    setIsPlaying(false);
  };

  useEffect(() => {
    if (isPlaying) {
      player.play();
    } else {
      player.pause();
    }
  }, [currentTrack, isPlaying]);

  return (
    <div className="App">
      <Transport
        isPlaying={isPlaying}
        onPlay={handleOnPlay}
        onPause={handlePause}
        onSkipBack={handleSkipBack}
        onSkipForward={handleSkipForward}
      />
    </div>
  );
}

export default App;
