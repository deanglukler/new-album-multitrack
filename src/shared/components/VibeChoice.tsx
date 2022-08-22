import { Stack, Typography } from '@mui/material';
import { usePlayer } from '../hooks';

export function VibeChoice({
  fontSize,
  spacing,
}: {
  fontSize: string;
  spacing: number;
}): JSX.Element {
  const { setCommentary, setGenre, commentary, genre } = usePlayer();
  const vibeText = {
    cursor: 'pointer',
    fontSize,
    '&:hover': { textDecoration: 'underline' },
  };

  return (
    <Stack spacing={spacing} direction={'row'}>
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
      <Typography
        sx={{ ...vibeText, textDecoration: commentary ? 'underline' : 'none' }}
        onClick={() => {
          setCommentary(!commentary);
        }}
      >
        Toggle Liner Notes
      </Typography>
    </Stack>
  );
}
