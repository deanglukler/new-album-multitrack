import { Howl, HowlOptions } from 'howler';
import {
  RequestHowls,
  TrackData,
  TrackDatas,
  TrackHowls,
  Volume,
} from './types';

const isTest = process.env.NODE_ENV === 'test';

const TRACKDATAS: TrackDatas = [
  {
    title: '1. Arrows',
    ACOUSTIC: { path: '1ArrowsAcoustic.mp3' },
    COMMENTARY: { path: '1ArrowsAcousticCommentary.mp3' },
    SYNTHETIC: { path: '1ArrowsSynthetic.mp3' },
  },
  {
    title: '2. The One',
    ACOUSTIC: { path: '2TheOneAcoustic.mp3' },
    COMMENTARY: { path: '2TheOneAcousticCommentary.mp3' },
    SYNTHETIC: { path: '2TheOneSynthetic.mp3' },
  },
  {
    title: '3. Interlude B',
    ACOUSTIC: { path: '3InterludeBAcoustic.mp3' },
    COMMENTARY: { path: '3InterludeBAcousticCommentary.mp3' },
    SYNTHETIC: { path: '3InterludeBSynthetic.mp3' },
  },
  {
    title: '4. Clear Of Night',
    ACOUSTIC: { path: '4ClearOfNightAcoustic.mp3' },
    COMMENTARY: { path: '4ClearOfNightAcoustic.mp3' },
    SYNTHETIC: { path: '4ClearOfNightSynthetic.mp3' },
  },
];

export class Player {
  private requestHowls: RequestHowls[] = [];
  private howls: TrackHowls = [];
  private currentTrackIndex: number = 0;

  private isLoading: boolean = true;
  private loadingMap: { [key: string]: boolean } = {};

  public onSongFinished: () => void = () => {};

  static firstTrack(): TrackData {
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

    this.requestHowls = TRACKDATAS.map((trackData) => ({
      // howls that will be played..
      ACOUSTIC: this.createHowl({
        howlOptions: { src: trackData.ACOUSTIC.path },
      }),
      COMMENTARY: this.createHowl({
        howlOptions: { src: trackData.COMMENTARY.path },
      }),
      SYNTHETIC: this.createHowl({
        howlOptions: { src: trackData.SYNTHETIC.path },
      }),
    }));

    this.loadedCallback = loadedCallback;
  }

  private createHowl({
    isTimeline = false,
    howlOptions,
  }: {
    isTimeline?: boolean;
    howlOptions: HowlOptions;
  }) {
    const { src, ...rest } = howlOptions;
    const loadingMapKey = isTimeline ? `${src}--timeline` : (src as string);
    this.loadingMap[loadingMapKey] = true;

    return new Howl({
      src,
      onload: () => {
        this.loadingMap[loadingMapKey] = false;
        if (Object.values(this.loadingMap).includes(true)) return;
        this.onLoad();
      },
      loop: false,
      ...rest,
    });
  }

  private onLoad() {
    this.createTimelineHowls();
    this.loadedCallback(this);
  }

  private createTimelineHowls() {
    // timeline howls used for utility like onend
    this.howls = this.requestHowls.map((howls, index) => {
      return {
        ...howls,
        TIMELINE: this.createHowl({
          isTimeline: true,
          howlOptions: {
            src: TRACKDATAS[index].ACOUSTIC.path,
            onend: this.callOnSongFinished.bind(this),
            volume: 0,
            onload: () => {}, // overwrite default onload to prevent infinite loop
          },
        }),
      };
    });
  }

  private getCurrentTrackHowls() {
    if (!this.howls[this.currentTrackIndex]) return [];
    return [
      this.howls[this.currentTrackIndex]?.TIMELINE,
      this.howls[this.currentTrackIndex]?.ACOUSTIC,
      this.howls[this.currentTrackIndex]?.SYNTHETIC,
      this.howls[this.currentTrackIndex]?.COMMENTARY,
    ];
  }

  private setCurrentTrackToNext() {
    if (this.currentTrackIndex === TRACKDATAS.length - 1) {
      return (this.currentTrackIndex = 0);
    }
    this.currentTrackIndex++;
  }

  private setCurrentTrackToPrevious() {
    if (this.currentTrackIndex === 0) {
      return (this.currentTrackIndex = TRACKDATAS.length - 1);
    }
    this.currentTrackIndex--;
  }

  private callOnSongFinished() {
    this.onSongFinished();
  }

  /**
   * play
   */
  public play() {
    if (isTest) return;
    this.getCurrentTrackHowls().forEach((howl) => {
      if (!howl.playing()) {
        howl.play();
      }
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
   * restartPlayHead
   */
  public restartPlayHead() {
    if (isTest) return;
    this.getCurrentTrackHowls().forEach((howl) => {
      howl.seek(0);
    });
  }

  /**
   * playNextTrack
   */
  public playNextTrack() {
    if (isTest) return;
    this.pauseNextTrack();
    this.play();
  }

  /**
   * pauseNextTrack
   */
  public pauseNextTrack() {
    if (isTest) return;
    this.pause();
    this.setCurrentTrackToNext();
    this.restartPlayHead();
  }

  /**
   * playPreviousTrack
   */
  public playPreviousTrack() {
    this.pausePreviousTrack();
    this.play();
  }

  /**
   * pausePreviousTrack
   */
  public pausePreviousTrack() {
    const currentSeek = this.getCurrentTrackHowls()[0].seek();
    this.pause();
    if (currentSeek < 2) {
      this.setCurrentTrackToPrevious();
    }
    this.restartPlayHead();
  }

  /**
   * setVolumes
   */
  public setVolumes({ genre, commentary, masterVolume }: Volume) {
    if (isTest) return;
    this.howls.forEach(({ ACOUSTIC, SYNTHETIC, COMMENTARY }) => {
      ACOUSTIC.volume(0);
      COMMENTARY.volume(0);
      SYNTHETIC.volume(0);
      if (commentary) {
        COMMENTARY.volume(masterVolume / 100);
      } else if (genre === 'acoustic') {
        ACOUSTIC.volume(masterVolume / 100);
      } else if (genre === 'synthetic') {
        SYNTHETIC.volume(masterVolume / 100);
      }
    });
  }

  /**
   * isPlaying
   */
  public isPlaying() {
    let isPlaying = false;
    this.getCurrentTrackHowls().forEach((howl) => {
      if (howl.playing()) {
        isPlaying = true;
      }
    });
    return isPlaying;
  }
}
