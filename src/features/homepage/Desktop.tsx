import { Box } from '@mui/material';
import { usePlayer } from '../../libs/player';
import Background from './components/Background';
import { DesktopFooter } from './components/DesktopFooter';
import { DesktopHeader } from './components/DesktopHeader';
import { DesktopTransport } from './components/DesktopTransport';
import { LoadingBar } from './components/LoadingBar';

const desktopStyles = { margin: '27px 0 0 35px' };

function Desktop(): JSX.Element {
  const { currentTrackLoaded, currentTrackName } = usePlayer();
  return (
    <Box sx={desktopStyles}>
      <Box sx={{ ml: '-20px' }}>
        <LoadingBar
          finished={currentTrackLoaded}
          resetIfChanged={currentTrackName}
        />
      </Box>
      <Background />
      <DesktopHeader />
      <DesktopTransport />
      <DesktopFooter />
    </Box>
  );
}

export default Desktop;
