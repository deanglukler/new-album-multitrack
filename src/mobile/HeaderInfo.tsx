import { Box, Stack } from '@mui/material';
import mobileLoadingGif from './assets/Mobile_Loading.gif';
import mobilePlayGif from './assets/Mobile_PlayPrompt.gif';
import mobileNamePic from './assets/Mobile_Name.png';
import mobileNotesTitle from './assets/Mobile_NotesTitle.png';
import mobileQuietTitle from './assets/Mobile_QuietTitle.png';
import mobileVioletTitle from './assets/Mobile_VioletTitle.png';

import { useInfoDisplay, usePlayer } from '../shared/hooks';

export function HeaderInfo(): JSX.Element {
  const { handleOnPlay } = usePlayer();
  const { loading, play, violetLife, quietLife, linerNotes } = useInfoDisplay();
  return (
    <Stack spacing={2}>
      <Box component="img" src={mobileNamePic} alt="Gavin Bradley" />
      <Box
        sx={{ display: loading }}
        component="img"
        src={mobileLoadingGif}
        alt="loading"
      />

      <Box
        sx={{ display: play }}
        component="img"
        src={mobilePlayGif}
        alt="play"
        onClick={handleOnPlay}
      />

      <Box
        sx={{ display: linerNotes }}
        component="img"
        src={mobileNotesTitle}
        alt="play"
      />

      <Box
        sx={{ display: quietLife }}
        component="img"
        src={mobileQuietTitle}
        alt="play"
      />

      <Box
        sx={{ display: violetLife }}
        component="img"
        src={mobileVioletTitle}
        alt="play"
      />
    </Stack>
  );
}
