import { Box, Link, Stack } from '@mui/material';
import { LINKS } from '../utils/constants';
import { SocialIcons } from './SocialIcons';

import desktopLoadingGif from '../assets/desktop/Desktop_Loading.gif';
import desktopPlayGif from '../assets/desktop/Desktop_PlayPrompt.gif';
import desktopNamePic from '../assets/desktop/Desktop_Name.png';
import desktopNotesTitle from '../assets/desktop/Desktop_NotesTitle.png';
import desktopQuietTitle from '../assets/desktop/Desktop_QuietTitle.png';
import desktopVioletTitle from '../assets/desktop/Desktop_VioletTitle.png';
import {
  ACOUSTIC,
  COMMENTARY,
  SYNTHETIC,
  usePlayer,
} from '../../../libs/player';
import { ImageBox } from './ImageBox';

function HeaderLink(props: any): JSX.Element {
  return (
    <Link
      sx={{
        fontSize: '22px',
        color: 'black',
        textDecoration: 'none',
        cursor: 'pointer',
        '&:hover': { textDecoration: 'underline' },
      }}
      {...props}
    />
  );
}

const baseImgSx = { height: '43px' };

function setDisplay(shouldDisplay: boolean) {
  return shouldDisplay ? 'unset' : 'none';
}

export function DesktopHeader(): JSX.Element {
  const { currentTrackLoaded, isPlaying, play, version } = usePlayer();

  return (
    <Stack>
      <Stack
        sx={{ width: 'max-content', mb: '12px' }}
        alignItems={'center'}
        spacing={2}
        direction="row"
      >
        <HeaderLink href={LINKS.GB_SOLO} target="_blank">
          Solo Work
        </HeaderLink>
        <HeaderLink href={LINKS.GB_PRODUCTION} target="_blank">
          Production
        </HeaderLink>
        <HeaderLink href={LINKS.GB_BLOG} target="_blank">
          Blog
        </HeaderLink>
        <SocialIcons />
      </Stack>
      <Box sx={{ display: 'flex', mb: '6px' }}>
        <ImageBox sx={baseImgSx} src={desktopNamePic} alt="Gavin Bradley" />

        <ImageBox
          sx={{
            ...baseImgSx,
            display: setDisplay(!currentTrackLoaded),
          }}
          src={desktopLoadingGif}
          alt="loading"
        />

        <ImageBox
          sx={{
            ...baseImgSx,
            cursor: 'pointer',
            display: setDisplay(currentTrackLoaded && !isPlaying),
          }}
          src={desktopPlayGif}
          alt="play"
          onClick={play}
        />

        <ImageBox
          sx={{
            ...baseImgSx,
            display: setDisplay(isPlaying && version === COMMENTARY),
          }}
          src={desktopNotesTitle}
          alt="commentary"
        />

        <ImageBox
          sx={{
            ...baseImgSx,
            display: setDisplay(isPlaying && version === ACOUSTIC),
          }}
          src={desktopQuietTitle}
          alt="quiet life text"
        />

        <ImageBox
          sx={{
            ...baseImgSx,
            display: setDisplay(isPlaying && version === SYNTHETIC),
          }}
          src={desktopVioletTitle}
          alt="violet life text"
        />
      </Box>
    </Stack>
  );
}
