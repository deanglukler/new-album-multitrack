import { Box } from '@mui/material';
import Background from './components/Background';
import { MobileFooter } from './components/MobileFooter';
import MobileHeader from './components/MobileHeader';
import { MobileTransport } from './components/MobileTransport';
import { MobileWorkLinks } from './components/MobileWorkLinks';

function Mobile(): JSX.Element {
  return (
    <Box sx={{ margin: '20px' }}>
      <MobileHeader />
      <MobileTransport />
      <Background />
      <MobileWorkLinks />
      <MobileFooter />
    </Box>
  );
}

export default Mobile;
