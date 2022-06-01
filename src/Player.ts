import { Howl } from 'howler';
import { TrackData, TrackDatas, TrackHowls } from './types';

const isTest = process.env.NODE_ENV === 'test';

const TRACKDATAS: TrackDatas = [
  {
    title: 'Arrows Track Title',
    ACOUSTIC: { path: '1ArrowsAcoustic.mp3' },
    ACOUSTIC_COM: { path: '1ArrowsAcousticCommentary.mp3' },
    SYNTHETIC: { path: '1ArrowsSynthetic.mp3' },
    SYNTHETIC_COM: { path: '1ArrowsSyntheticCommentary.mp3' },
  },
  {
    title: 'Arrows Track Title',
    ACOUSTIC: { path: '2TheOneAcoustic.mp3' },
    ACOUSTIC_COM: { path: '2TheOneAcousticCommentary.mp3' },
    SYNTHETIC: { path: '2TheOneSynthetic.mp3' },
    SYNTHETIC_COM: { path: '2TheOneSyntheticCommentary.mp3' },
  },
  {
    title: 'Arrows Track Title',
    ACOUSTIC: { path: '3InterludeBAcoustic.mp3' },
    ACOUSTIC_COM: { path: '3InterludeBAcousticCommentary.mp3' },
    SYNTHETIC: { path: '3InterludeBSynthetic.mp3' },
    SYNTHETIC_COM: { path: '3InterludeBSyntheticCommentary.mp3' },
  },
  {
    title: 'Arrows Track Title',
    ACOUSTIC: { path: '4ClearOfNightAcoustic.mp3' },
    ACOUSTIC_COM: { path: '4ClearOfNightAcoustic.mp3' },
    SYNTHETIC: { path: '4ClearOfNightSynthetic.mp3' },
    SYNTHETIC_COM: { path: '4ClearOfNightSyntheticCommentary.mp3' },
  },
];

export class Player {
  private howls: TrackHowls = [];
  private currentTrackIndex: number = 0;

  private isLoading: boolean = true;
  private loadingMap: { [key: string]: boolean } = {};

  public get firstTrack(): TrackData {
    return TRACKDATAS[0];
  }

  public get currentTrack(): TrackData {
    return TRACKDATAS[this.currentTrackIndex];
  }

  public get loading(): boolean {
    return this.isLoading;
  }

  constructor(private loadedCallback: (player: Player) => void) {
    if (isTest) return;

    this.isLoading = true;

    this.howls = TRACKDATAS.map((trackData) => ({
      ACOUSTIC: this.defaultHowl({ src: trackData.ACOUSTIC.path }),
      ACOUSTIC_COM: this.defaultHowl({
        src: trackData.ACOUSTIC_COM.path,
      }),
      SYNTHETIC: this.defaultHowl({
        src: trackData.SYNTHETIC.path,
      }),
      SYNTHETIC_COM: this.defaultHowl({
        src: trackData.SYNTHETIC_COM.path,
      }),
    }));

    this.loadedCallback = loadedCallback;
  }

  private defaultHowl({ src }: { src: string }) {
    this.loadingMap[src] = true;
    return new Howl({
      src,
      onload: () => {
        this.loadingMap[src] = false;
        if (Object.values(this.loadingMap).includes(true)) return;
        this.loadedCallback(this);
      },
    });
  }

  private getCurrentTrackHowls() {
    return [
      this.howls[this.currentTrackIndex].ACOUSTIC,
      this.howls[this.currentTrackIndex].ACOUSTIC_COM,
      this.howls[this.currentTrackIndex].SYNTHETIC,
      this.howls[this.currentTrackIndex].SYNTHETIC_COM,
    ];
  }

  private setCurrentTrackToNext() {
    if (this.currentTrackIndex === TRACKDATAS.length - 1) {
      return (this.currentTrackIndex = 0);
    }
    this.currentTrackIndex++;
  }

  /**
   * play
   */
  public play() {
    if (isTest) return;
    this.getCurrentTrackHowls().forEach((howl) => {
      howl.play();
      howl.volume(0.1);
    });
  }

  /**
   * pause
   */
  public pause() {
    if (isTest) return;
    this.getCurrentTrackHowls().forEach((howl) => {
      howl.pause();
    });
  }

  /**
   * playNextTrack
   */
  public playNextTrack() {
    if (isTest) return;
    this.pause();
    this.setCurrentTrackToNext();
    this.play();
  }
}
