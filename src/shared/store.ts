import { Action, action, createStore, createTypedHooks } from 'easy-peasy';
import { Genre, PlayerTrack } from './types';

interface PlayerState {
  isPlaying: boolean;
  beganLoading: boolean;
  loaded: boolean;
  beganPlaying: boolean;
  currentTrackLoaded: boolean;
  currentTrack: PlayerTrack | null;
  masterVolume: number;
  commentary: boolean;
  genre: Genre;
}

interface PlayerStateUpdates {
  isPlaying?: boolean;
  beganLoading?: boolean;
  loaded?: boolean;
  beganPlaying?: boolean;
  currentTrackLoaded?: boolean;
  currentTrack?: PlayerTrack | null;
  masterVolume?: number;
  commentary?: boolean;
  genre?: Genre;
}

interface StoreModel {
  playerState: PlayerState;
  updatePlayerState: Action<StoreModel, PlayerStateUpdates>;
}

export const store = createStore<StoreModel>({
  playerState: {
    isPlaying: false,
    loaded: false,
    beganLoading: false,
    beganPlaying: false,
    currentTrackLoaded: false,
    currentTrack: null,
    masterVolume: 75,
    commentary: false,
    genre: 'acoustic',
  },
  updatePlayerState: action((state, payload) => {
    state.playerState = {
      ...state.playerState,
      ...payload,
    };
  }),
});

const typedHooks = createTypedHooks<StoreModel>();

export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;
