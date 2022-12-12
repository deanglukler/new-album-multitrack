import { Stack } from '@mui/material';
import { SocialIcons } from './SocialIcons';
import mobileLoadingGif from '../assets/mobile/Mobile_Loading.gif';
import mobilePlayGif from '../assets/mobile/Mobile_PlayPrompt.gif';
import mobileNamePic from '../assets/mobile/Mobile_Name.png';
import mobileNotesTitle from '../assets/mobile/Mobile_NotesTitle.png';
import mobileQuietTitle from '../assets/mobile/Mobile_QuietTitle.png';
import mobileVioletTitle from '../assets/mobile/Mobile_VioletTitle.png';
import {
  ACOUSTIC,
  COMMENTARY,
  SYNTHETIC,
  usePlayer,
} from '../../../libs/player';
import { ImageBox } from './ImageBox';

function setDisplay(shouldDisplay: boolean) {
  return shouldDisplay ? 'unset' : 'none';
}

function MobileHeader() {
  const { currentTrackLoaded, isPlaying, play, version } = usePlayer();

  return (
    <Stack spacing={3}>
      <SocialIcons />
      <Stack spacing={2}>
        <ImageBox src={mobileNamePic} alt="Gavin Bradley" />
        <ImageBox
          sx={{ display: setDisplay(!currentTrackLoaded) }}
          src={mobileLoadingGif}
          alt="loading"
        />

        <ImageBox
          sx={{ display: setDisplay(currentTrackLoaded && !isPlaying) }}
          src={mobilePlayGif}
          alt="play"
          onClick={play}
        />

        <ImageBox
          sx={{ display: setDisplay(isPlaying && version === COMMENTARY) }}
          src={mobileNotesTitle}
          alt="play"
        />

        <ImageBox
          sx={{ display: setDisplay(isPlaying && version === ACOUSTIC) }}
          src={mobileQuietTitle}
          alt="play"
        />

        <ImageBox
          sx={{ display: setDisplay(isPlaying && version === SYNTHETIC) }}
          src={mobileVioletTitle}
          alt="play"
        />
      </Stack>
    </Stack>
  );
}

export default MobileHeader;
