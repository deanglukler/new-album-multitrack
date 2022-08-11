import { Box } from '@mui/material';
import desktopCredits from './assets/img/Desktop_Credits.png';

export function Footer(): JSX.Element {
  return (
    <Box
      sx={{ position: 'fixed', bottom: 0, margin: '0 0 25px 25px' }}
      component={'img'}
      src={desktopCredits}
      alt="production credits"
    />
  );
}
