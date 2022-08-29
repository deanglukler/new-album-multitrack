import { Howl, HowlOptions } from 'howler';
import { TrackData, Volume } from '../types';

export class Track {
  private controlHowl: Howl;
  private acousticHowl: Howl;
  private syntheticHowl: Howl;
  private commentaryHowl: Howl;
  private allHowls: [Howl, Howl, Howl];

  public trackLoad: Promise<unknown>;

  constructor(public trackData: TrackData, private handleOnEnd?: () => void) {
    const [acousticHowl, acousticLoadPromise] = this.createHowl({
      options: {
        src: trackData.ACOUSTIC.path,
        onend: () => {
          if (this.handleOnEnd) {
            this.handleOnEnd();
          }
        },
      },
    });
    const [commentaryHowl, commentaryLoadPromise] = this.createHowl({
      options: {
        src: trackData.COMMENTARY.path,
      },
    });
    const [syntheticHowl, syntheticLoadPromise] = this.createHowl({
      options: {
        src: trackData.SYNTHETIC.path,
      },
    });
    this.acousticHowl = acousticHowl;
    this.commentaryHowl = commentaryHowl;
    this.syntheticHowl = syntheticHowl;
    this.allHowls = [
      this.acousticHowl,
      this.syntheticHowl,
      this.commentaryHowl,
    ];
    // the acoustic howl will be considered the control howl
    // so include callbacks like onend that need be called only once
    this.controlHowl = this.acousticHowl;

    this.trackLoad = Promise.all([
      acousticLoadPromise,
      commentaryLoadPromise,
      syntheticLoadPromise,
    ]);
  }

  private createHowl({
    options,
  }: {
    options: HowlOptions;
  }): [Howl, Promise<void>] {
    let createdHowl: null | Howl = null;
    const loadPromise = new Promise<void>((resolve, reject) => {
      options.onload = () => resolve();
      options.onloaderror = () => reject();
      createdHowl = new Howl({
        loop: false,
        ...options,
      });
    });
    if (!createdHowl) throw new Error('this must return a Howl object');
    return [createdHowl, loadPromise];
  }

  public play() {
    this.allHowls.forEach((howl) => {
      if (!howl.playing()) {
        howl.play();
      }
    });
  }

  public pause() {
    this.allHowls.forEach((howl) => {
      howl.pause();
    });
  }

  public restartPlayhead() {
    this.allHowls.forEach((howl) => {
      howl.seek(0);
    });
  }

  public getCurrentSeek() {
    return this.controlHowl.seek();
  }

  public setVolumes({ genre, commentary, masterVolume }: Volume) {
    this.acousticHowl.volume(0);
    this.commentaryHowl.volume(0);
    this.syntheticHowl.volume(0);
    if (commentary) {
      this.commentaryHowl.volume(masterVolume / 100);
    } else if (genre === 'acoustic') {
      this.acousticHowl.volume(masterVolume / 100);
    } else if (genre === 'synthetic') {
      this.syntheticHowl.volume(masterVolume / 100);
    }
  }

  public isPlaying() {
    return this.controlHowl.playing();
  }
}