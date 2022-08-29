import { Box, Link, Stack, SxProps } from '@mui/material';
import Link1_Share from '../assets/Link1_Share.png';
import Link2_Spotify from '../assets/Link2_Spotify.png';
import Link3_AppleMusic from '../assets/Link3_AppleMusic.png';
import Link4_Instagram from '../assets/Link4_Instagram.png';
import Link5_Twitter from '../assets/Link5_Twitter.png';
import Link6_Facebook from '../assets/Link6_Facebook.png';
import Link7_Email from '../assets/Link7_Email.png';
import { LINKS } from '../constants/links';

interface SocialIconProps {
  spacing?: number;
  height?: string;
  width?: string;
  stackSX?: SxProps;
}

export function SocialIcons({
  spacing,
  height,
  width,
  stackSX = {},
}: SocialIconProps): JSX.Element {
  const imgSx = { height, width };
  return (
    <Stack
      sx={stackSX}
      justifyContent={'space-between'}
      spacing={spacing}
      direction={'row'}
    >
      <Link href={LINKS.GB_SITE}>
        <Box
          sx={imgSx}
          className="social-icon"
          component="img"
          alt="social icon"
          src={Link1_Share}
        />
      </Link>
      <Link href={LINKS.GB_SPOTIFY}>
        <Box
          sx={imgSx}
          className="social-icon"
          component="img"
          alt="social icon"
          src={Link2_Spotify}
        />
      </Link>
      <Link href={LINKS.GB_APPLE}>
        <Box
          sx={imgSx}
          className="social-icon"
          component="img"
          alt="social icon"
          src={Link3_AppleMusic}
        />
      </Link>
      <Link href={LINKS.GB_INSTAGRAM} target="_blank">
        <Box
          sx={imgSx}
          className="social-icon"
          component="img"
          alt="social icon"
          src={Link4_Instagram}
        />
      </Link>
      <Link href={LINKS.GB_TWITTER} target="_blank">
        <Box
          sx={imgSx}
          className="social-icon"
          component="img"
          alt="social icon"
          src={Link5_Twitter}
        />
      </Link>
      <Link href={LINKS.GB_FACEBOOK} target="_blank">
        <Box
          sx={imgSx}
          className="social-icon"
          component="img"
          alt="social icon"
          src={Link6_Facebook}
        />
      </Link>
      <Link href={LINKS.GB_EMAILTO}>
        <Box
          sx={imgSx}
          className="social-icon"
          component="img"
          alt="social icon"
          src={Link7_Email}
        />
      </Link>
    </Stack>
  );
}
