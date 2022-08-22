import { Box } from '@mui/material';
import desktopLoadingPic from './assets/Desktop_LoadingPic.jpg';
import desktopLinerGif from './assets/Desktop_LinerPic.gif';
import desktopQuietGif from './assets/Desktop_QuietPic.gif';
import desktopVioletGif from './assets/Desktop_VioletPic.gif';

import { useBackground, usePlayer } from '../shared/hooks';
import { loadPlayer } from '../shared/player/loadPlayer';

export function Background(): JSX.Element {
  const { display } = useBackground();
  const { setBeganLoadingTrue } = usePlayer();

  const DesktopImgStyles = {
    position: 'absolute',
    right: 0,
    bottom: 0,
    top: 0,
    zIndex: -100,
    marginTop: '60px',
    height: '100%',
  };

  return (
    <>
      <Box
        component="img"
        sx={DesktopImgStyles}
        alt="Gavin Bradley"
        src={desktopLoadingPic}
        onLoad={() => {
          console.log('loading image loaded');
          loadPlayer();
          setBeganLoadingTrue();
        }}
      />
      <Box
        component="img"
        sx={{
          ...DesktopImgStyles,
          display: display('liner-notes'),
        }}
        alt="Gavin Bradley"
        src={desktopLinerGif}
      />
      <Box
        component="img"
        sx={{
          ...DesktopImgStyles,
          display: display('acoustic'),
        }}
        alt="Gavin Bradley"
        src={desktopQuietGif}
      />
      <Box
        component="img"
        sx={{
          ...DesktopImgStyles,
          display: display('synthetic'),
        }}
        alt="Gavin Bradley"
        src={desktopVioletGif}
      />
    </>
  );
}
