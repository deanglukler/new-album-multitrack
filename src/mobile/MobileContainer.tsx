import { Box } from '@mui/material';
import { usePlayer } from '../shared/hooks';
import { Background } from './Background';
import { Footer } from './Footer';
import { Header } from './Header';
import { Transport } from './Transport';
import { WorkLinks } from './WorkLinks';

export function MobileContainer(): JSX.Element {
  const { beganPlaying } = usePlayer();
  return (
    <Box sx={{ margin: '20px' }}>
      <Header />
      {beganPlaying ? <Transport /> : <Box sx={{ height: '104px' }} />}
      <Background />
      <WorkLinks />
      <Footer />
    </Box>
  );
}
