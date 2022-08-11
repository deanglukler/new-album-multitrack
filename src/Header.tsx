import { Box, Stack } from '@mui/material';
import { HeaderLink } from './HeaderLink';
import desktopLoadingGif from './assets/gif/Desktop_Loading.gif';
import desktopPlayGif from './assets/gif/Desktop_PlayPrompt.gif';
import desktopNamePic from './assets/img/Desktop_Name.png';

export function Header({
  loaded,
  handlePlay,
}: {
  loaded: boolean;
  handlePlay: () => void;
}): JSX.Element {
  function renderMainHeader() {
    const height = '43px';
    return (
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
            onClick={handlePlay}
          />
        )}
      </Stack>
    );
  }

  return (
    <Box>
      <Stack spacing={2} direction="row">
        <HeaderLink>Solo Work</HeaderLink>
        <HeaderLink>Production</HeaderLink>
        <HeaderLink>Blog</HeaderLink>
      </Stack>
      {renderMainHeader()}
    </Box>
  );
}
