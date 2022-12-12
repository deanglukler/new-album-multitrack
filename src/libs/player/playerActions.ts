import { action } from 'easy-peasy';
import _ from 'lodash';
import { PlayerStoreState } from './PlayerStoreState';
import { Track } from './Track';

export class PlayerActions {
  public setVersion = action<PlayerStoreState, Version>((state, payload) => {
    state.version = payload;
  });

  public setIsPlaying = action<PlayerStoreState, boolean>((state, payload) => {
    if (payload && !state.beganPlayingFirstTrack)
      state.beganPlayingFirstTrack = true;

    state.isPlaying = payload;
  });

  public setVolume = action<PlayerStoreState, number>((state, payload) => {
    state.volume = payload;
  });

  public updateTrack = action<PlayerStoreState, Track>((state, track) => {
    const currentTrack = state.tracks[track.index];
    if (!currentTrack) throw new Error('Cannot find track to update');
    _.merge(currentTrack, track);
    state.tracks = [...state.tracks];
  });

  public changeTrackIndex = action<PlayerStoreState, number>(
    (state, nextIndex) => {
      state.currentTrackIndex = nextIndex;
    }
  );
}

export const playerActions = new PlayerActions();
