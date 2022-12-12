import { Box } from '@mui/material';
import mobileCredits from '../assets/mobile/Mobile_Credits.png';

export function MobileFooter(): JSX.Element {
  return (
    <Box
      component="img"
      alt="site credits"
      src={mobileCredits}
      sx={{ width: 1 }}
    />
  );
}
