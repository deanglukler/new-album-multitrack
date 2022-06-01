import { Howl } from 'howler';
import { Howls, TrackData, TrackDatas, TrackHowls, TRACKS } from './types';

const TRACKDATAS: TrackDatas = {
  [TRACKS.TRACK1]: {
    title: 'Arrows Track Title',
    ACOUSTIC: { path: '1ArrowsAcoustic.mp3' },
    ACOUSTIC_COM: { path: '1ArrowsAcousticCommentary.mp3' },
    SYNTHETIC: { path: '1ArrowsSynthetic.mp3' },
    SYNTHETIC_COM: { path: '1ArrowsSyntheticCommentary.mp3' },
  },
};

const defaultHowl = ({ src }: { src: string }) => new Howl({ src });

export class Player {
  private howls: TrackHowls = {};
  private currentTrackPriv: string = TRACKS.TRACK1;

  public get firstTrack(): TrackData {
    return TRACKDATAS[TRACKS.TRACK1];
  }

  public get currentTrack(): string {
    return this.currentTrackPriv;
  }

  constructor() {
    const howls = this.howls;

    Object.keys(TRACKDATAS).forEach((key) => {
      if (!howls[key]) howls[key] = {} as Howls;
      howls[key].ACOUSTIC = defaultHowl({ src: TRACKDATAS[key].ACOUSTIC.path });
      howls[key].ACOUSTIC_COM = defaultHowl({
        src: TRACKDATAS[key].ACOUSTIC_COM.path,
      });
      howls[key].SYNTHETIC = defaultHowl({
        src: TRACKDATAS[key].SYNTHETIC.path,
      });
      howls[key].SYNTHETIC_COM = defaultHowl({
        src: TRACKDATAS[key].SYNTHETIC_COM.path,
      });
    });
  }

  private getTrackHowls(track: string) {
    return [
      this.howls[track].ACOUSTIC,
      this.howls[track].ACOUSTIC_COM,
      this.howls[track].SYNTHETIC,
      this.howls[track].SYNTHETIC_COM,
    ];
  }

  /**
   * play
   */
  public play() {
    this.getTrackHowls(this.currentTrack).forEach((howl) => {
      howl.play();
      howl.volume(0.1);
    });
  }

  /**
   * pause
   */
  public pause() {
    this.getTrackHowls(this.currentTrack).forEach((howl) => {
      howl.pause();
    });
  }
}
