import { Box, Stack } from '@mui/material';
import desktopLoadingGif from './assets/Desktop_Loading.gif';
import desktopPlayGif from './assets/Desktop_PlayPrompt.gif';
import desktopNamePic from './assets/Desktop_Name.png';
import { usePlayer } from '../shared/hooks';
import { HeaderLink } from './HeaderLink';
import { SocialIcons } from '../shared/components/SocialIcons';

export function Header(): JSX.Element {
  const { loaded, handleOnPlay } = usePlayer();
  const height = '43px';

  return (
    <Stack spacing={2}>
      <Stack alignItems={'center'} spacing={2} direction="row">
        <HeaderLink>Solo Work</HeaderLink>
        <HeaderLink>Production</HeaderLink>
        <HeaderLink>Blog</HeaderLink>
        <SocialIcons spacing={2} height="20px" width="20px" />
      </Stack>
      <Stack spacing={2} direction="row">
        <Box
          sx={{ height }}
          component="img"
          src={desktopNamePic}
          alt="loading"
        />
        {!loaded && (
          <Box
            sx={{ height }}
            component="img"
            src={desktopLoadingGif}
            alt="loading"
          />
        )}
        {loaded && (
          <Box
            sx={{ height, cursor: 'pointer' }}
            component="img"
            src={desktopPlayGif}
            alt="play"
            onClick={handleOnPlay}
          />
        )}
      </Stack>
    </Stack>
  );
}
