import { Link, Stack, Typography } from '@mui/material';
import { LINKS } from '../constants/links';
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
    color: 'black',
    textDecoration: 'none',
    '&:hover': { textDecoration: 'underline' },
  };

  return (
    <Stack spacing={spacing} alignItems="center" direction={'row'}>
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
        Toggle Notes
      </Typography>
      <Link sx={{ ...vibeText }} href={LINKS.GB_LYRICS} target="_blank">
        Read Lyrics
      </Link>
    </Stack>
  );
}
