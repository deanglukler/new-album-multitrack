import { Pause, PlayArrow, SkipNext, SkipPrevious } from '@mui/icons-material';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import { usePlayer } from '../../../libs/player';
import { VersionSetter } from './VersionSetter';

export function MobileTransport() {
  const {
    isPlaying,
    play,
    pause,
    currentTrackLoaded,
    currentTrackName,
    skipBack,
    skipForward,
    beganPlayingFirstTrack,
  } = usePlayer();

  if (!beganPlayingFirstTrack) {
    return <Box sx={{ height: '104px' }} />;
  }

  const renderPlayPause = () => {
    if (!isPlaying) {
      return (
        <IconButton
          aria-label="play"
          onClick={play}
          disabled={!currentTrackLoaded}
        >
          <PlayArrow />
        </IconButton>
      );
    }
    return (
      <IconButton aria-label="pause" onClick={pause}>
        <Pause />
      </IconButton>
    );
  };

  return (
    <Stack>
      <Stack justifyContent="center" direction="row" alignItems="center">
        {renderPlayPause()}
        <Typography align="center">{currentTrackName}</Typography>
      </Stack>
      <Box sx={{ '& > div': { justifyContent: 'space-between' } }}>
        <VersionSetter fontSize="16px" spacing={0} />
      </Box>
      <Stack justifyContent="center" direction="row" alignItems="center">
        <IconButton aria-label="skip previous" onClick={skipBack}>
          <SkipPrevious />
        </IconButton>
        <Typography align="center">Skip</Typography>
        <IconButton aria-label="skip next" onClick={skipForward}>
          <SkipNext />
        </IconButton>
      </Stack>
    </Stack>
  );
}
