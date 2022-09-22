import { Pause, PlayArrow, SkipNext, SkipPrevious } from '@mui/icons-material';
import { IconButton, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { VibeChoice } from '../shared/components/VibeChoice';
import { useCurrentTrackText, usePlayer } from '../shared/hooks';

const iconSX = { height: '25px', width: '25px' };

export const Transport = () => {
  const currentTrackText = useCurrentTrackText();
  const {
    handleOnPlay,
    handlePause,
    handleSkipBack,
    handleSkipForward,
    isPlaying,
    currentTrackLoaded,
  } = usePlayer();
  const renderPlayPause = () => {
    if (!isPlaying) {
      return (
        <IconButton
          sx={{ padding: 0 }}
          aria-label="play"
          onClick={handleOnPlay}
          disabled={!currentTrackLoaded}
        >
          <PlayArrow sx={iconSX} />
        </IconButton>
      );
    }
    return (
      <IconButton sx={{ padding: 0 }} aria-label="pause" onClick={handlePause}>
        <Pause sx={iconSX} />
      </IconButton>
    );
  };

  return (
    <Stack sx={{ ml: '-7px' }}>
      <Stack direction="row" alignItems="center" sx={{ mb: '6px' }}>
        <IconButton
          sx={{ padding: 0 }}
          aria-label="skip previous"
          onClick={handleSkipBack}
        >
          <SkipPrevious sx={iconSX} />
        </IconButton>
        <Typography fontSize={17} align="center">
          Skip
        </Typography>
        <IconButton
          sx={{ padding: 0 }}
          aria-label="skip next"
          onClick={handleSkipForward}
        >
          <SkipNext sx={iconSX} />
        </IconButton>
        <Box sx={{ mr: 3 }} />
        <VibeChoice fontSize="18px" spacing={3} />
      </Stack>
      <Stack direction="row" alignItems="center" sx={{ mb: '6px' }}>
        {renderPlayPause()}
        <Typography fontSize={17} align="center">
          {currentTrackText}
        </Typography>
      </Stack>
    </Stack>
  );
};
