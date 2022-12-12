import { TRACK_DATA } from './constants/TRACK_DATA';
import { ACOUSTIC } from './constants/VERSIONS';
import { Track } from './Track';

const initialTracks = TRACK_DATA.map((trackData, index) => {
  return new Track(trackData, index);
});

if (initialTracks.length === 0) {
  console.error('initialTracks length is zero.  It should include tracks');
}

const INIT_VERSION = ACOUSTIC;

export class PlayerStoreState {
  public isPlaying = false;
  public beganPlayingFirstTrack = false;

  public version: Version = INIT_VERSION;
  public tracks: Track[] = initialTracks;
  public currentTrackIndex = 0;
  public volume = 100;
}
