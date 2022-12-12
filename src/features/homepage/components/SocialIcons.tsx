import { Box, Link, Stack, SxProps } from '@mui/material';
import { MouseEvent } from 'react';
import { useIsMobile } from '../../../libs/device/hooks';
import Link1_Share from '../assets/Link1_Share.png';
import Link2_Spotify from '../assets/Link2_Spotify.png';
import Link3_AppleMusic from '../assets/Link3_AppleMusic.png';
import Link4_Instagram from '../assets/Link4_Instagram.png';
import Link5_Twitter from '../assets/Link5_Twitter.png';
import Link6_Facebook from '../assets/Link6_Facebook.png';
import Link7_Email from '../assets/Link7_Email.png';
import { LINKS } from '../utils/constants';

const shareEmailBody = `Stream now: https://linktr.ee/gavinbradley
%0D%0A
or listen on the web: https://www.gavinbradley.com/
%0D%0A%0D%0A
For an acoustic experience select ‘Quiet Life’.
%0D%0A
For a synthetic experience, ‘Violet Life’.
%0D%0A%0D%0A
For a discussion of the making of these albums, the Liner Notes podcast series is available on all platforms.
%0D%0A
`;

const shareEmailSubject = `Linking You To: Quiet Life and Violet Life - A Dual Album Project by Gavin Bradley`;

const shareBtnOnClickHandler = (e: MouseEvent) => {
  e.preventDefault();
  e.stopPropagation();
  if (navigator.share) {
    navigator
      .share({
        title: 'Gavin Bradley',
        text: 'Gavin Bradley - Quiet Life/Violet Life',
        url: LINKS.GB_SITE,
      })
      .then(() => console.log('Successful share'))
      .catch((error) => console.log('Error sharing:', error));
  } else {
    window.open(`mailto:?subject=${shareEmailSubject}&body=${shareEmailBody}`);
  }
};

export function SocialIcons(): JSX.Element {
  let imgSx: SxProps = {};
  let stackSX: SxProps = {};
  let spacing: undefined | number = undefined;

  const isMobile = useIsMobile();

  if (isMobile) {
    imgSx = { ...imgSx, height: '25px' };
  } else {
    imgSx = { ...imgSx, height: '20px', width: '20px' };
    spacing = 2;
    stackSX = {
      '& .social-icon': { opacity: '0.5', '&:hover': { opacity: '1' } },
    };
  }

  return (
    <Stack
      sx={stackSX}
      justifyContent={'space-between'}
      spacing={spacing}
      direction={'row'}
    >
      <Link>
        <Box
          onClick={shareBtnOnClickHandler}
          sx={imgSx}
          className="social-icon"
          component="img"
          alt="share social icon"
          src={Link1_Share}
        />
      </Link>
      <Link href={LINKS.GB_SPOTIFY} target="_blank">
        <Box
          sx={imgSx}
          className="social-icon"
          component="img"
          alt="spotify icon"
          src={Link2_Spotify}
        />
      </Link>
      <Link href={LINKS.GB_APPLE} target="_blank">
        <Box
          sx={imgSx}
          className="social-icon"
          component="img"
          alt="apple music icon"
          src={Link3_AppleMusic}
        />
      </Link>
      <Link href={LINKS.GB_INSTAGRAM} target="_blank">
        <Box
          sx={imgSx}
          className="social-icon"
          component="img"
          alt="instagram icon"
          src={Link4_Instagram}
        />
      </Link>
      <Link href={LINKS.GB_TWITTER} target="_blank">
        <Box
          sx={imgSx}
          className="social-icon"
          component="img"
          alt="twitter icon"
          src={Link5_Twitter}
        />
      </Link>
      <Link href={LINKS.GB_FACEBOOK} target="_blank">
        <Box
          sx={imgSx}
          className="social-icon"
          component="img"
          alt="facebook icon"
          src={Link6_Facebook}
        />
      </Link>
      <Link href={LINKS.GB_EMAILTO}>
        <Box
          sx={imgSx}
          className="social-icon"
          component="img"
          alt="email icon"
          src={Link7_Email}
        />
      </Link>
    </Stack>
  );
}
