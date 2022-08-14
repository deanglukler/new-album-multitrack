import { Box, Stack } from '@mui/material';
import { usePlayer } from '../shared/hooks';
import mobileLoadingGif from './assets/Mobile_Loading.gif';
import mobilePlayGif from './assets/Mobile_PlayPrompt.gif';
import mobileNamePic from './assets/Mobile_Name.png';
import { SocialIcons } from '../shared/components/SocialIcons';

export function Header(): JSX.Element {
  const { handleOnPlay, loaded } = usePlayer();
  const sx = { width: 1 };

  return (
    <Stack spacing={3}>
      <SocialIcons height="25px" />
      <Box sx={sx} component="img" src={mobileNamePic} alt="loading" />
      {!loaded && (
        <Box sx={sx} component="img" src={mobileLoadingGif} alt="loading" />
      )}
      {loaded && (
        <Box
          sx={sx}
          component="img"
          src={mobilePlayGif}
          alt="play"
          onClick={handleOnPlay}
        />
      )}
    </Stack>
  );
}
