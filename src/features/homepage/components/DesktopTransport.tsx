import { Pause, PlayArrow, SkipNext, SkipPrevious } from '@mui/icons-material';
import { IconButton, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { usePlayer } from '../../../libs/player';
import { VersionSetter } from './VersionSetter';

const iconSX = { height: '21px', width: '21px' };

export function DesktopTransport(): JSX.Element | null {
  const {
    isPlaying,
    beganPlayingFirstTrack,
    play,
    pause,
    currentTrackLoaded,
    currentTrackName,
    skipBack,
    skipForward,
  } = usePlayer();

  if (!beganPlayingFirstTrack) {
    return null;
  }

  const renderPlayPause = () => {
    if (!isPlaying) {
      return (
        <IconButton
          sx={{ padding: 0 }}
          aria-label="play"
          onClick={play}
          disabled={!currentTrackLoaded}
        >
          <PlayArrow sx={iconSX} />
        </IconButton>
      );
    }
    return (
      <IconButton sx={{ padding: 0 }} aria-label="pause" onClick={pause}>
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
          onClick={skipBack}
        >
          <SkipPrevious sx={iconSX} />
        </IconButton>
        <Typography fontSize={17} align="center">
          Skip
        </Typography>
        <IconButton
          sx={{ padding: 0 }}
          aria-label="skip next"
          onClick={skipForward}
        >
          <SkipNext sx={iconSX} />
        </IconButton>
        <Box sx={{ mr: 3 }} />
        <VersionSetter fontSize="18px" spacing={3} />
      </Stack>
      <Stack direction="row" alignItems="center" sx={{ mb: '6px' }}>
        {renderPlayPause()}
        <Typography fontSize={17} sx={{ ml: '3px' }} align="center">
          {currentTrackName}
        </Typography>
      </Stack>
    </Stack>
  );
}
