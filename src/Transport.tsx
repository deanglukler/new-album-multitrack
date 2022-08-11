import { Pause, PlayArrow, SkipNext, SkipPrevious } from '@mui/icons-material';
import { IconButton, Slider, Stack, Typography } from '@mui/material';
import { TrackData } from './types';

type ClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => void;

interface TransportProps {
  currentTrack: TrackData;
  isPlaying: boolean;
  onPlay: ClickHandler;
  onPause: ClickHandler;
  onSkipForward: ClickHandler;
  onSkipBack: ClickHandler;
  masterVolume: number;
  onChange: (event: Event, value: number | number[]) => void;
}

export const Transport = ({
  currentTrack,
  isPlaying,
  onSkipForward,
  onSkipBack,
  onPlay,
  onPause,
  masterVolume,
  onChange,
}: TransportProps) => {
  const renderPlayPause = () => {
    if (!isPlaying) {
      return (
        <IconButton aria-label="play" onClick={onPlay}>
          <PlayArrow />
        </IconButton>
      );
    }
    return (
      <IconButton aria-label="pause" onClick={onPause}>
        <Pause />
      </IconButton>
    );
  };

  return (
    <Stack>
      <Stack direction="row" alignItems="center">
        {renderPlayPause()}
        <Typography align="center">{currentTrack.title}</Typography>
      </Stack>
      <Stack direction="row" alignItems="center">
        <IconButton aria-label="skip previous" onClick={onSkipBack}>
          <SkipPrevious />
        </IconButton>
        <Typography align="center">Skip</Typography>
        <IconButton aria-label="skip next" onClick={onSkipForward}>
          <SkipNext />
        </IconButton>
        <Slider
          sx={{ width: '60px' }}
          aria-label="Volume"
          value={masterVolume}
          onChange={onChange}
        />
      </Stack>
    </Stack>
  );
};
