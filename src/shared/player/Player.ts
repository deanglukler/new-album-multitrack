import { PlayerTrack, Volume } from '../types';
import { Track } from './Track';
import { TRACKDATAS } from './TRACKDATAS';

export class Player {
  public onSongFinished: (() => void) | null = null;
  public isPlaying: boolean = false;

  private isLoadingFirstSong: boolean = true;
  private tracks: PlayerTrack[] = [];
  private currentTrack: PlayerTrack;
  private firstTrack: PlayerTrack;
  private volume: Volume | null = null;

  constructor(private loadedFirstSongCallback: () => void) {
    this.tracks = TRACKDATAS.map((trackData, index) => {
      return { isLoaded: false, track: null, trackData, index };
    });
    this.firstTrack = this.tracks[0];
    this.currentTrack = this.firstTrack;
    this.loadCurrentTrack();
    this.loadNextTrack();
    // this.loadTrack(this.currentTrack).then(() => {
    //   this.loadSurroundingTracks().then(() => {
    //     this.loadNextUnloadedTrack();
    //   });
    // });
    // this.loadNextUnloadedTrack();
  }

  private loadNextUnloadedTrack() {
    const nextUnloadedTrackIndex = this.tracks.findIndex(
      ({ track }) => track === null
    );
    if (nextUnloadedTrackIndex === -1) {
      console.log('Player found no more tracks to load');
      return;
    }
    const nextTrackToLoad = this.tracks[nextUnloadedTrackIndex];

    this.loadTrack(nextTrackToLoad).then(() => {
      this.loadNextUnloadedTrack();
    });
  }

  private loadTrack(trackToLoad: PlayerTrack) {
    console.log(`Loading track ${trackToLoad.trackData.title}`);
    const track = new Track(trackToLoad.trackData, {
      handleOnEnd: () => {
        this.onTrackEnd();
      },
    });
    trackToLoad.track = track;
    return track.trackLoad
      .then(() => {
        if (this.isLoadingFirstSong) {
          this.isLoadingFirstSong = false;
          this.loadedFirstSongCallback();
        }
        trackToLoad.isLoaded = true;
        console.log(`loaded track ${trackToLoad.trackData.title}`);
      })
      .catch(() => {
        console.log(`ERROR loading track ${track.trackData.title}`);
        console.log(`ATTEMPTING RELOAD track ${track.trackData.title}`);
        this.loadTrack(trackToLoad);
      });
  }

  private unloadAllUnplayingTracks() {
    this.tracks.forEach((track) => {
      if (track.index !== this.getCurrentTrackIndex()) {
        if (track.track) {
          track.track.unloadHowls();
          track.track = null;
        }
      }
    });
    console.log('unloaded all tracks');
  }

  private unloadAllTracks() {
    this.tracks.forEach((track) => {
      if (track.track) {
        track.track.unloadHowls();
        track.track = null;
      }
    });
    console.log('unloaded all tracks');
  }

  private loadSurroundingTracks() {
    return Promise.all([
      this.loadTrack(this.tracks[this.getPreviousTrackIndex()]),
      this.loadTrack(this.tracks[this.getNextTrackIndex()]),
    ]);
  }

  private loadNextTrack() {
    return this.loadTrack(this.getNextTrack());
  }

  private loadCurrentTrack() {
    return this.loadTrack(this.tracks[this.getCurrentTrackIndex()]);
  }

  private getCurrentTrackIndex() {
    return this.tracks.findIndex(
      ({ trackData }) =>
        trackData.ACOUSTIC.path === this.currentTrack.trackData.ACOUSTIC.path
    );
  }

  public getCurrentTrack() {
    return this.currentTrack;
  }

  private getNextTrack() {
    return this.tracks[this.getNextTrackIndex()];
  }

  private getNextTrackIndex() {
    if (this.getCurrentTrackIndex() === this.tracks.length - 1) {
      return 0;
    } else {
      return this.getCurrentTrackIndex() + 1;
    }
  }

  private getPreviousTrackIndex() {
    if (this.getCurrentTrackIndex() === 0) {
      return this.tracks.length - 1;
    } else {
      return this.getCurrentTrackIndex() - 1;
    }
  }

  private loadCurrentTrackIfNotLoaded() {
    if (!this.currentTrack.isLoaded) {
      this.loadCurrentTrack();
    }
  }
  private loadNextTrackIfNotLoaded() {
    if (!this.getNextTrack().isLoaded) {
      this.loadNextTrack();
    }
  }

  private setCurrentTrackToNext() {
    this.currentTrack = this.tracks[this.getNextTrackIndex()];
    this.loadCurrentTrackIfNotLoaded();
    this.loadNextTrack();
  }

  private setCurrentTrackToPrevious() {
    this.currentTrack = this.tracks[this.getPreviousTrackIndex()];
    this.loadCurrentTrackIfNotLoaded();
    this.loadNextTrack();
  }

  private onTrackEnd() {
    if (!this.onSongFinished) {
      return console.error('no onSongFinished function defined');
    }
    this.onSongFinished();
  }

  /**
   * play
   */
  public play() {
    this.pause();
    if (!this.currentTrack.track)
      throw new Error('should not be attempting to play yet');

    if (this.currentTrack.track && this.currentTrack.isLoaded) {
      this.setVolumes();
      this.currentTrack.track.play();
      this.isPlaying = true;
    } else if (this.currentTrack.track && !this.currentTrack.isLoaded) {
      console.log(
        'Attempting to play track that is not loaded.. loading track..'
      );
      this.loadCurrentTrack();
    } else {
      console.warn('Attempted to play track but couldnt..');
      this.isPlaying = false;
    }
    // this.isPlaying = this.currentTrack.track.isPlaying();
  }

  /**
   * pause
   */
  public pause() {
    this.tracks.forEach((track) => {
      if (track.track) {
        track.track.pause();
        this.isPlaying = false;
      }
    });
  }

  /**
   * restartPlayHead
   */
  public restartPlayHead() {
    if (!this.currentTrack.track) {
      return console.error('cant restart playhead on null track');
    }
    this.currentTrack.track.restartPlayhead();
  }

  /**
   * prepareNextTrack
   */
  public prepareNextTrack() {
    this.pause();
    this.setCurrentTrackToNext();
    this.restartPlayHead();
  }

  /**
   * playNextTrack
   */
  public playNextTrack() {
    this.prepareNextTrack();
    this.play();
  }

  /**
   * preparePreviousTrack
   */
  public preparePreviousTrack() {
    const currentSeek = this.currentTrack.track?.getCurrentSeek() || 0;
    if (currentSeek > 2) {
      this.restartPlayHead();
    } else {
      this.pause();
      this.setCurrentTrackToPrevious();
      this.restartPlayHead();
    }
  }

  /**
   * playPreviousTrack
   */
  public playPreviousTrack() {
    this.preparePreviousTrack();
    this.play();
  }

  public syncTrackSeek() {
    if (!this.volume) {
      return console.warn('attempting to sync tracks without volume set');
    }
    if (!this.currentTrack.track) {
      return console.error('cant sync track, track is null');
    }
    this.currentTrack.track?.sync(this.volume);
  }

  /**
   * setVolumes
   */
  public setVolumes(volume?: Volume) {
    if (volume) this.volume = volume;
    this.tracks.forEach((playerTrack) => {
      if (!this.volume) throw new Error('must set volume at least once');
      if (playerTrack.track) {
        playerTrack.track.setVolumes(this.volume);
      }
    });
  }
}
