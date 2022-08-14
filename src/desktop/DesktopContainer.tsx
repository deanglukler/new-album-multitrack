import { Box } from '@mui/material';
import { usePlayer } from '../shared/hooks';
import { Transport } from './Transport';
import { Background } from './Background';
import { Header } from './Header';
import { VibeChoice } from '../shared/components/VibeChoice';
import { Footer } from './Footer';

export function DesktopContainer(): JSX.Element {
  const { isPlaying } = usePlayer();

  function renderPlayer() {
    if (!isPlaying) return null;
    return (
      <>
        <Transport />
        <VibeChoice fontSize="24px" />
      </>
    );
  }
  return (
    <Box sx={{ margin: '50px 0 0 50px' }}>
      <Background />
      <Header />
      {renderPlayer()}
      <Footer />
    </Box>
  );
}
