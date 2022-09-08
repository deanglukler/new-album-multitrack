import { Box } from '@mui/material';
import { usePlayer } from '../shared/hooks';
import { Transport } from './Transport';
import { Background } from './Background';
import { Header } from './Header';
import { VibeChoice } from '../shared/components/VibeChoice';
import { Footer } from './Footer';

export function DesktopContainer(): JSX.Element {
  const { beganPlaying } = usePlayer();
  return (
    <Box sx={{ margin: '27px 0 0 35px' }}>
      <Background />
      <Header />
      {beganPlaying && (
        <>
          <Transport />
          <VibeChoice fontSize="15px" spacing={3} />
        </>
      )}
      <Footer />
    </Box>
  );
}
