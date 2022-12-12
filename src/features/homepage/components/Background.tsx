import { Box, SxProps } from '@mui/material';
import { useIsMobile } from '../../../libs/device/hooks';
import {
  ACOUSTIC,
  COMMENTARY,
  SYNTHETIC,
  usePlayer,
} from '../../../libs/player';

import desktopLinerGif from '../assets/desktop/Desktop_LinerPic.gif';
import desktopQuietGif from '../assets/desktop/Desktop_QuietPic.gif';
import desktopVioletGif from '../assets/desktop/Desktop_VioletPic.gif';

import mobileLinerGif from '../assets/mobile/Mobile_LinerPic.gif';
import mobileQuietGif from '../assets/mobile/Mobile_QuietPic.gif';
import mobileVioletGif from '../assets/mobile/Mobile_VioletPic.gif';
import { ImageBox } from './ImageBox';

const desktopImgStyles = {
  position: 'absolute',
  right: 0,
  bottom: 0,
  top: 0,
  zIndex: -100,
  marginTop: '60px',
  height: '100%',
};

const mobileImgStyles = {
  width: 1,
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
};

function imgProps(isMobile: boolean, version: Version) {
  return {
    [COMMENTARY]: {
      alt: 'Liner notes animation',
      src: isMobile ? mobileLinerGif : desktopLinerGif,
    },
    [ACOUSTIC]: {
      alt: 'Quiet animation',
      src: isMobile ? mobileQuietGif : desktopQuietGif,
    },
    [SYNTHETIC]: {
      alt: 'Violet animation',
      src: isMobile ? mobileVioletGif : desktopVioletGif,
    },
  }[version];
}

function Background(): JSX.Element {
  const { version } = usePlayer();
  const isMobile = useIsMobile();
  const props = imgProps(isMobile, version);
  let sx: SxProps = isMobile ? mobileImgStyles : desktopImgStyles;

  const image = <ImageBox sx={sx} {...props} />;

  if (isMobile) {
    const spaceHolderImg = (
      <ImageBox sx={{ width: 1 }} alt="Gavin Bradley" src={mobileLinerGif} />
    );
    return (
      <Box sx={{ position: 'relative' }}>
        {spaceHolderImg}
        {image}
      </Box>
    );
  }

  return image;
}

export default Background;
