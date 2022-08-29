import { PlayerTrack, TrackDatas, Volume } from '../types';
import { Track } from './Track';

const TRACKDATAS: TrackDatas = [
  // {
  //   title: 'short dev song 1',
  //   ACOUSTIC: { path: 'short-dev-song.wav' },
  //   COMMENTARY: { path: 'short-dev-song.wav' },
  //   SYNTHETIC: { path: 'short-dev-song.wav' },
  // },
  // {
  //   title: 'short dev song 2',
  //   ACOUSTIC: { path: 'short-dev-song2.wav' },
  //   COMMENTARY: { path: 'short-dev-song2.wav' },
  //   SYNTHETIC: { path: 'short-dev-song2.wav' },
  // },
  // {
  //   title: 'short dev song 3',
  //   ACOUSTIC: { path: 'short-dev-song3.wav' },
  //   COMMENTARY: { path: 'short-dev-song3.wav' },
  //   SYNTHETIC: { path: 'short-dev-song3.wav' },
  // },
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
  public onSongFinished: (() => void) | null = null;
  public isPlaying: boolean = false;

  private isLoadingFirstSong: boolean = true;
  private tracks: PlayerTrack[] = [];
  private currentTrack: PlayerTrack;
  private firstTrack: PlayerTrack;
  private volume: Volume | null = null;

  constructor(private loadedFirstSongCallback: () => void) {
    this.tracks = TRACKDATAS.map((trackData) => {
      return { isLoaded: false, track: null, trackData };
    });
    this.firstTrack = this.tracks[0];
    this.currentTrack = this.firstTrack;
    this.loadNextTrack();
  }

  private loadNextTrack() {
    const nextUnloadedTrackIndex = this.tracks.findIndex(
      ({ track }) => track === null
    );
    if (nextUnloadedTrackIndex === -1) {
      console.log('Player found no more tracks to load');
      return;
    }
    const nextTrackToLoad = this.tracks[nextUnloadedTrackIndex];
    console.log(`Loading track ${nextTrackToLoad.trackData.title}`);
    const track = new Track(
      this.tracks[nextUnloadedTrackIndex].trackData,
      () => {
        this.onTrackEnd();
      }
    );
    nextTrackToLoad.track = track;
    track.trackLoad
      .then(() => {
        if (this.isLoadingFirstSong) {
          this.isLoadingFirstSong = false;
          this.loadedFirstSongCallback();
        }
        this.loadNextTrack();
        nextTrackToLoad.isLoaded = true;
      })
      .catch(() => {
        console.log(`ERROR loading track ${track.trackData.title}`);
      });
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

  private setCurrentTrackToNext() {
    const currentTrackIndex = this.getCurrentTrackIndex();
    if (currentTrackIndex === this.tracks.length - 1) {
      this.currentTrack = this.tracks[0];
    } else {
      this.currentTrack = this.tracks[currentTrackIndex + 1];
    }
  }

  private setCurrentTrackToPrevious() {
    const currentTrackIndex = this.getCurrentTrackIndex();
    if (currentTrackIndex === 0) {
      this.currentTrack = this.tracks[this.tracks.length - 1];
    } else {
      this.currentTrack = this.tracks[currentTrackIndex - 1];
    }
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
    if (!this.currentTrack.track)
      throw new Error('should not be attempting to play yet');
    if (this.currentTrack.track && this.currentTrack.isLoaded) {
      this.setVolumes();
      this.currentTrack.track.play();
    }
    this.isPlaying = this.currentTrack.track.isPlaying();
  }

  /**
   * pause
   */
  public pause() {
    if (this.currentTrack.track && this.currentTrack.isLoaded) {
      this.currentTrack.track.pause();
    }
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
