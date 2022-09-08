import { Stack } from '@mui/material';
import { LoadingBar } from '../shared/components/LoadingBar';

import { SocialIcons } from '../shared/components/SocialIcons';
import { usePlayer } from '../shared/hooks';
import { HeaderInfo } from './HeaderInfo';

export function Header(): JSX.Element {
  const { currentTrack, currentTrackLoaded } = usePlayer();
  return (
    <Stack spacing={3}>
      <SocialIcons height="25px" />
      <HeaderInfo />
      <LoadingBar
        mobile
        currentTrack={currentTrack}
        finished={currentTrackLoaded}
      />
    </Stack>
  );
}
