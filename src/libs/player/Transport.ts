import { Actions } from 'easy-peasy';
import { store } from '../store';
import { StoreModel } from '../store/types/StoreModel';
import { findTrackByIndex } from './utils/findTrackByIndex';
import { getSurroundingTrackIndex } from './utils/getSurroundingTrackIndex';

export class Transport {
  private storeActions: Actions<StoreModel>;

  static play() {
    const transport = new Transport();
    transport.setVolumeAndPlayTrack();
  }

  static pause() {
    const transport = new Transport();
    transport.pauseTrack();
  }

  static skip(direction: 'next' | 'previous') {
    const transport = new Transport();

    if (direction === 'next') {
      transport.skipForward();
    }
    if (direction === 'previous') {
      transport.skipBackwards();
    }
  }

  static setVolume(volume: number) {
    const transport = new Transport();
    transport.setVolume(volume);
  }

  static setVersion(version: Version) {
    const transport = new Transport();
    transport.setVersion(version);
  }

  constructor() {
    this.storeActions = store.getActions();
  }

  private get playerState() {
    return store.getState().player;
  }

  private get currentTrack() {
    return findTrackByIndex(
      this.playerState.currentTrackIndex,
      this.playerState.tracks
    );
  }

  public setVolumeAndPlayTrack(options?: { restart?: boolean }) {
    this.currentTrack.howlerAdapter.setMasterVolume(this.playerState.volume);
    this.currentTrack.howlerAdapter.setVersion(this.playerState.version);
    if (options?.restart) {
      this.currentTrack.howlerAdapter.restartPlayhead();
    }
    this.currentTrack.howlerAdapter.play();

    this.storeActions.player.setIsPlaying(true);
  }

  public pauseTrack() {
    this.currentTrack.howlerAdapter.pause();

    this.storeActions.player.setIsPlaying(false);
  }

  public skipForward() {
    let shouldPlayAfterSkip = false;
    if (this.playerState.isPlaying) {
      shouldPlayAfterSkip = true;
      this.currentTrack.howlerAdapter.pause();
    }

    const nextTrackIndex = getSurroundingTrackIndex(
      this.playerState.tracks,
      this.playerState.currentTrackIndex,
      'next'
    );
    this.storeActions.player.changeTrackIndex(nextTrackIndex);
    const nextTrack = findTrackByIndex(nextTrackIndex, this.playerState.tracks);

    if (nextTrack.isLoaded) {
      if (shouldPlayAfterSkip) {
        this.setVolumeAndPlayTrack({ restart: true });
      }
    } else {
      this.handleNextTrackNotLoaded();
    }
  }

  public skipBackwards() {
    const RESTART_SONG_TIME_LIMIT = 2;
    let currentSeek = 0;
    let shouldPlayAfterSkip = false;
    if (this.playerState.isPlaying) {
      shouldPlayAfterSkip = true;
      this.currentTrack.howlerAdapter.pause();
      currentSeek = this.currentTrack.howlerAdapter.getCurrentSeek();
    }
    // restart the current track if midway through playing
    if (currentSeek > RESTART_SONG_TIME_LIMIT) {
      if (shouldPlayAfterSkip) {
        this.setVolumeAndPlayTrack({ restart: true });
      }
      return;
    }

    if (this.playerState.isPlaying) {
      shouldPlayAfterSkip = true;
      this.currentTrack.howlerAdapter.pause();
      currentSeek = this.currentTrack.howlerAdapter.getCurrentSeek();
    }

    const previousTrackIndex = getSurroundingTrackIndex(
      this.playerState.tracks,
      this.playerState.currentTrackIndex,
      'previous'
    );
    this.storeActions.player.changeTrackIndex(previousTrackIndex);

    const previousTrack = findTrackByIndex(
      previousTrackIndex,
      this.playerState.tracks
    );

    if (previousTrack.isLoaded) {
      if (shouldPlayAfterSkip) {
        this.setVolumeAndPlayTrack({ restart: true });
      }
    } else {
      this.handleNextTrackNotLoaded();
    }
  }

  public setVolume(volume: number) {
    this.currentTrack.howlerAdapter.setMasterVolume(volume);

    this.storeActions.player.setVolume(volume);
  }

  public setVersion(version: Version) {
    this.currentTrack.howlerAdapter.setVersion(version);

    this.storeActions.player.setVersion(version);
  }

  private handleNextTrackNotLoaded() {
    this.storeActions.player.setIsPlaying(false);
  }
}
