import { Stack, Typography } from '@mui/material';
import { usePlayer } from '../hooks';

export function VibeChoice({ fontSize }: { fontSize: string }): JSX.Element {
  const { setCommentary, setGenre, commentary, genre } = usePlayer();
  const vibeText = { cursor: 'pointer', fontSize };

  return (
    <Stack spacing={3} direction={'row'}>
      <Typography
        sx={vibeText}
        onClick={() => {
          setCommentary(!commentary);
        }}
      >
        Liner Notes
      </Typography>
      <Typography
        sx={vibeText}
        onClick={() => {
          if (genre === 'acoustic') {
            setGenre('synthetic');
          }
          if (genre === 'synthetic') {
            setGenre('acoustic');
          }
        }}
      >
        Change Lifestyle
      </Typography>
    </Stack>
  );
}
