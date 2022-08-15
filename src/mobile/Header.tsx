import { Stack } from '@mui/material';

import { SocialIcons } from '../shared/components/SocialIcons';
import { HeaderInfo } from './HeaderInfo';

export function Header(): JSX.Element {
  return (
    <Stack spacing={3}>
      <SocialIcons height="25px" />
      <HeaderInfo />
    </Stack>
  );
}
