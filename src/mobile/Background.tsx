import { Box } from '@mui/material';
import mobileLoadingPic from './assets/Mobile_LoadingPic.jpg';
import mobileLinerGif from './assets/Mobile_LinerPic.gif';
import mobileQuietGif from './assets/Mobile_QuietPic.gif';
import mobileVioletGif from './assets/Mobile_VioletPic.gif';
import { useBackground } from '../shared/hooks';

export function Background(): JSX.Element {
  const { display } = useBackground();

  const mobileImgStyles = {
    width: 1,
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  };
  return (
    <Box sx={{ position: 'relative' }}>
      <Box
        component="img"
        sx={{ width: 1 }}
        alt="Gavin Bradley"
        src={mobileLoadingPic}
      />
      <Box
        component="img"
        sx={{
          ...mobileImgStyles,
          display: display('liner-notes'),
        }}
        alt="Gavin Bradley"
        src={mobileLinerGif}
      />
      <Box
        component="img"
        sx={{
          ...mobileImgStyles,
          display: display('acoustic'),
        }}
        alt="Gavin Bradley"
        src={mobileQuietGif}
      />
      <Box
        component="img"
        sx={{
          ...mobileImgStyles,
          display: display('synthetic'),
        }}
        alt="Gavin Bradley"
        src={mobileVioletGif}
      />
    </Box>
  );
}
