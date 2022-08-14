import { Box, Link, Stack } from '@mui/material';
import Link1_Share from '../assets/Link1_Share.png';
import Link2_Spotify from '../assets/Link2_Spotify.png';
import Link3_AppleMusic from '../assets/Link3_AppleMusic.png';
import Link4_Instagram from '../assets/Link4_Instagram.png';
import Link5_Twitter from '../assets/Link5_Twitter.png';
import Link6_Facebook from '../assets/Link6_Facebook.png';
import Link7_Email from '../assets/Link7_Email.png';

export function SocialIcons({ spacing, height, width }: any): JSX.Element {
  const imgSx = { height, width };
  return (
    <Stack justifyContent={'space-between'} spacing={spacing} direction={'row'}>
      <Link href="http://google.com">
        <Box sx={imgSx} component="img" alt="social icon" src={Link1_Share} />
      </Link>
      <Link href="http://google.com">
        <Box sx={imgSx} component="img" alt="social icon" src={Link2_Spotify} />
      </Link>
      <Link href="http://google.com">
        <Box
          sx={imgSx}
          component="img"
          alt="social icon"
          src={Link3_AppleMusic}
        />
      </Link>
      <Link href="http://google.com">
        <Box
          sx={imgSx}
          component="img"
          alt="social icon"
          src={Link4_Instagram}
        />
      </Link>
      <Link href="http://google.com">
        <Box sx={imgSx} component="img" alt="social icon" src={Link5_Twitter} />
      </Link>
      <Link href="http://google.com">
        <Box
          sx={imgSx}
          component="img"
          alt="social icon"
          src={Link6_Facebook}
        />
      </Link>
      <Link href="http://google.com">
        <Box sx={imgSx} component="img" alt="social icon" src={Link7_Email} />
      </Link>
    </Stack>
  );
}
