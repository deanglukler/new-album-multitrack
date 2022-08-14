import { Box, Stack } from '@mui/material';
import { SocialIcons } from '../shared/components/SocialIcons';
import { usePlayer } from '../shared/hooks';
import { Background } from './Background';
import { Header } from './Header';
import { Transport } from './Transport';
import { WorkLink } from './WorkLink';

export function MobileContainer(): JSX.Element {
  const { isPlaying } = usePlayer();
  return (
    <Box sx={{ margin: '20px' }}>
      <Header />
      {isPlaying && <Transport />}
      <Background />
      <Stack
        justifyContent="center"
        alignItems="center"
        spacing={2}
        direction="row"
        sx={{ my: 3 }}
      >
        <WorkLink>Solo Work</WorkLink>
        <WorkLink>Production</WorkLink>
        <WorkLink>Blog</WorkLink>
      </Stack>
    </Box>
  );
}
