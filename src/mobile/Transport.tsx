import { Pause, PlayArrow, SkipNext, SkipPrevious } from '@mui/icons-material';
import { Box, IconButton, Slider, Stack, Typography } from '@mui/material';
import { VibeChoice } from '../shared/components/VibeChoice';
import { useCurrentTrackText, usePlayer } from '../shared/hooks';
import { muiVolumeSxOverrides } from '../shared/muiVolumeSxOverrides';

export const Transport = () => {
  const currentTrackText = useCurrentTrackText();

  const {
    handleOnPlay,
    handlePause,
    handleSkipBack,
    handleSkipForward,
    setMasterVolume,
    isPlaying,
    masterVolume,
    currentTrackLoaded,
  } = usePlayer();

  const renderPlayPause = () => {
    if (!isPlaying) {
      return (
        <IconButton
          sx={{ paddingLeft: 0 }}
          aria-label="play"
          onClick={handleOnPlay}
          disabled={!currentTrackLoaded}
        >
          <PlayArrow />
        </IconButton>
      );
    }
    return (
      <IconButton
        sx={{ paddingLeft: 0 }}
        aria-label="pause"
        onClick={handlePause}
      >
        <Pause />
      </IconButton>
    );
  };

  return (
    <Stack>
      <Stack justifyContent="center" direction="row" alignItems="center">
        {renderPlayPause()}
        <Typography align="center">{currentTrackText}</Typography>
      </Stack>
      <Box sx={{ '& > div': { justifyContent: 'space-between' } }}>
        <VibeChoice fontSize="16px" spacing={0} />
      </Box>
      <Stack justifyContent="center" direction="row" alignItems="center">
        <IconButton
          sx={{ paddingLeft: 0 }}
          aria-label="skip previous"
          onClick={handleSkipBack}
        >
          <SkipPrevious />
        </IconButton>
        <Typography align="center">Skip</Typography>
        <IconButton aria-label="skip next" onClick={handleSkipForward}>
          <SkipNext />
        </IconButton>
        <Slider
          sx={{
            width: '60px',
            ...muiVolumeSxOverrides,
          }}
          aria-label="Volume"
          value={masterVolume}
          onChange={(...args: unknown[]) => {
            setMasterVolume(args[1] as number);
          }}
        />
      </Stack>
    </Stack>
  );
};
