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
        <IconButton onClick={onPlay}>
          <PlayArrow />
        </IconButton>
      );
    }
    return (
      <IconButton onClick={onPause}>
        <Pause />
      </IconButton>
    );
  };

  return (
    <Box>
      <IconButton onClick={onSkipBack}>
        <SkipPrevious />
      </IconButton>
      {renderPlayPause()}
      <IconButton onClick={onSkipForward}>
        <SkipNext />
      </IconButton>
    </Box>
  );
};
