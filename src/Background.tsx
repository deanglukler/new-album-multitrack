import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import desktopLoadingPic from './assets/img/Desktop_LoadingPic.jpg';
import desktopLinerGif from './assets/gif/Desktop_LinerPic.gif';
import desktopQuietGif from './assets/gif/Desktop_QuietPic.gif';
import desktopVioletGif from './assets/gif/Desktop_VioletPic.gif';
import { Genre } from './types';

interface Props {
  commentary: boolean;
  genre: Genre;
  isPlaying: boolean;
}

type BackgroundKeys = Genre | 'liner-notes';

export function Background({
  commentary,
  genre,
  isPlaying,
}: Props): JSX.Element {
  const [background, setBackground] = useState<BackgroundKeys>('acoustic');

  useEffect(() => {
    if (commentary) {
      setBackground('liner-notes');
      return;
    }
    setBackground(genre);
  }, [commentary, genre]);

  function display(bg: BackgroundKeys) {
    if (!isPlaying) return 'none';
    if (bg === background) return 'unset';
    return 'none';
  }

  const bgImgStyles = {
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
        sx={bgImgStyles}
        alt="Gavin Bradley"
        src={desktopLoadingPic}
      />
      <Box
        component="img"
        sx={{
          ...bgImgStyles,
          display: display('liner-notes'),
        }}
        alt="Gavin Bradley"
        src={desktopLinerGif}
      />
      <Box
        component="img"
        sx={{
          ...bgImgStyles,
          display: display('acoustic'),
        }}
        alt="Gavin Bradley"
        src={desktopQuietGif}
      />
      <Box
        component="img"
        sx={{
          ...bgImgStyles,
          display: display('synthetic'),
        }}
        alt="Gavin Bradley"
        src={desktopVioletGif}
      />
    </>
  );
}
