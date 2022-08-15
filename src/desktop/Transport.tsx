import { Pause, PlayArrow, SkipNext, SkipPrevious } from '@mui/icons-material';
import { IconButton, Slider, Stack, Typography } from '@mui/material';
import { usePlayer } from '../shared/hooks';
import { muiVolumeSxOverrides } from '../shared/muiVolumeSxOverrides';

export const Transport = () => {
  const {
    handleOnPlay,
    handlePause,
    handleSkipBack,
    handleSkipForward,
    setMasterVolume,
    isPlaying,
    currentTrack,
    masterVolume,
  } = usePlayer();
  const renderPlayPause = () => {
    if (!isPlaying) {
      return (
        <IconButton
          sx={{ paddingLeft: 0 }}
          aria-label="play"
          onClick={handleOnPlay}
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
      <Stack direction="row" alignItems="center">
        {renderPlayPause()}
        <Typography align="center">{currentTrack.title}</Typography>
      </Stack>
      <Stack direction="row" alignItems="center">
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
          sx={{ width: '60px', ...muiVolumeSxOverrides }}
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
