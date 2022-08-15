import { Box } from '@mui/material';
import mobileCredits from './assets/Mobile_Credits.png';

export function Footer(): JSX.Element {
  return (
    <Box
      component="img"
      alt="site credits"
      src={mobileCredits}
      sx={{ width: 1 }}
    />
  );
}
