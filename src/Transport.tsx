import { Pause, PlayArrow, SkipNext, SkipPrevious } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';

type ClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => void;

interface TransportProps {
  isPlaying: boolean;
  onPlay: ClickHandler;
  onPause: ClickHandler;
  onSkipForward: ClickHandler;
  onSkipBack: ClickHandler;
}

export const Transport = ({
  isPlaying,
  onSkipForward,
  onSkipBack,
  onPlay,
  onPause,
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
    <Box>
      <IconButton aria-label="skip previous" onClick={onSkipBack}>
        <SkipPrevious />
      </IconButton>
      {renderPlayPause()}
      <IconButton aria-label="skip next" onClick={onSkipForward}>
        <SkipNext />
      </IconButton>
    </Box>
  );
};
