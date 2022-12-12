import { Link, Stack, Typography } from '@mui/material';
import {
  ACOUSTIC,
  COMMENTARY,
  SYNTHETIC,
  usePlayer,
} from '../../../libs/player';
import { LINKS } from '../utils/constants';

export function VersionSetter({
  fontSize,
  spacing,
}: {
  fontSize: string;
  spacing: number;
}): JSX.Element {
  const { version, setVersion } = usePlayer();

  const vibeText = {
    cursor: 'pointer',
    fontSize,
    color: 'black',
    textDecoration: 'none',
    '&:hover': { lg: { textDecoration: 'underline' } },
  };

  return (
    <Stack spacing={spacing} alignItems="center" direction={'row'}>
      <Typography
        sx={vibeText}
        onClick={() => {
          if (version === ACOUSTIC) {
            setVersion(SYNTHETIC);
          }
          if (version === SYNTHETIC) {
            setVersion(ACOUSTIC);
          }
        }}
      >
        Change Lifestyle
      </Typography>
      <Typography
        sx={{
          ...vibeText,
          textDecoration: version === COMMENTARY ? 'underline' : 'none',
        }}
        onClick={() => {
          setVersion(version === COMMENTARY ? ACOUSTIC : COMMENTARY);
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
