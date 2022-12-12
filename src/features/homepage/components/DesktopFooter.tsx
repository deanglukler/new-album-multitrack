import { Box } from '@mui/material';
import desktopCredits from '../assets/desktop/Desktop_Credits.png';

export function DesktopFooter(): JSX.Element {
  return (
    <Box
      sx={{ position: 'fixed', bottom: 0, mb: '27px', width: 375 }}
      component={'img'}
      src={desktopCredits}
      alt="production credits"
    />
  );
}
