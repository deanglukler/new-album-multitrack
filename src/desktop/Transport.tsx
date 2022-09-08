import { Pause, PlayArrow, SkipNext, SkipPrevious } from '@mui/icons-material';
import { IconButton, Slider, Stack, Typography } from '@mui/material';
import { useCurrentTrackText, usePlayer } from '../shared/hooks';
import { muiVolumeSxOverrides } from '../shared/muiVolumeSxOverrides';

const iconSX = { height: '25px', width: '25px' };

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
  } = usePlayer();
  const renderPlayPause = () => {
    if (!isPlaying) {
      return (
        <IconButton
          sx={{ padding: 0 }}
          aria-label="play"
          onClick={handleOnPlay}
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
      <Stack direction="row" alignItems="center">
        {renderPlayPause()}
        <Typography fontSize={14} align="center">
          {currentTrackText}
        </Typography>
      </Stack>
      <Stack direction="row" alignItems="center">
        <IconButton
          sx={{ padding: 0 }}
          aria-label="skip previous"
          onClick={handleSkipBack}
        >
          <SkipPrevious sx={iconSX} />
        </IconButton>
        <Typography fontSize={14} align="center">
          Skip
        </Typography>
        <IconButton
          sx={{ padding: 0 }}
          aria-label="skip next"
          onClick={handleSkipForward}
        >
          <SkipNext sx={iconSX} />
        </IconButton>
        <Slider
          sx={{ ml: '20px', width: '80px', ...muiVolumeSxOverrides }}
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
