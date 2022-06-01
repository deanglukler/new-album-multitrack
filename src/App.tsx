import React, { useEffect, useState } from 'react';
import './App.css';
import { Howl } from 'howler';
import { TrackHowls, TrackDatas, Howls } from './types';
import { Transport } from './Transport';

enum TRACKS {
  TRACK1 = 'TRACK1',
}

const TRACKDATAS: TrackDatas = {
  [TRACKS.TRACK1]: {
    title: 'Arrows Track Title',
    ACOUSTIC: { path: 'nextEpisode.mp3' },
    ACOUSTIC_COM: { path: 'nextEpisode.mp3' },
    SYNTHETIC: { path: 'nextEpisode.mp3' },
    SYNTHETIC_COM: { path: 'nextEpisode.mp3' },
  },
  // [TRACKS.TRACK1]: {
  //   title: 'Arrows Track Title',
  //   ACOUSTIC: { path: '1ArrowsAcoustic.mp3' },
  //   ACOUSTIC_COM: { path: '1ArrowsAcousticCommentary.mp3' },
  //   SYNTHETIC: { path: '1ArrowsSynthetic.mp3' },
  //   SYNTHETIC_COM: { path: '1ArrowsSyntheticCommentary.mp3' },
  // },
};

const defaultHowl = ({ src }: { src: string }) => new Howl({ src });

const howls: TrackHowls = {};
Object.keys(TRACKDATAS).forEach((key) => {
  if (!howls[key]) howls[key] = {} as Howls;
  howls[key].ACOUSTIC = defaultHowl({ src: TRACKDATAS[key].ACOUSTIC.path });
  howls[key].ACOUSTIC_COM = defaultHowl({
    src: TRACKDATAS[key].ACOUSTIC_COM.path,
  });
  howls[key].SYNTHETIC = defaultHowl({ src: TRACKDATAS[key].SYNTHETIC.path });
  howls[key].SYNTHETIC_COM = defaultHowl({
    src: TRACKDATAS[key].SYNTHETIC_COM.path,
  });
});

const getTrackHowls = (track: string) => {
  return [
    howls[track].ACOUSTIC,
    howls[track].ACOUSTIC_COM,
    howls[track].SYNTHETIC,
    howls[track].SYNTHETIC_COM,
  ];
};

function App() {
  const [currentTrack, setCurrentTrack] = useState<TRACKS>(TRACKS.TRACK1);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleOnPlay = () => {
    setIsPlaying(true);
  };

  const handleSkipForward = () => {};

  const handleSkipBack = () => {};

  const handlePause = () => {};

  useEffect(() => {
    if (isPlaying) {
      const [acousticHowl, acousticComHowl, syntheticHowl, syntheticComHowl] =
        getTrackHowls(currentTrack);

      acousticHowl.play();
      acousticComHowl.play();
      syntheticHowl.play();
      syntheticComHowl.play();
      acousticHowl.volume(0.1);
      acousticComHowl.volume(0.1);
      syntheticHowl.volume(0.1);
      syntheticComHowl.volume(0.1);
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
