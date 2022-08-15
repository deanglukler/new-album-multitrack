import { Action, action, createStore, createTypedHooks } from 'easy-peasy';
import { Player } from './Player';
import { Genre, TrackData } from './types';

interface StoreModel {
  playerState: {
    isPlaying: boolean;
    beganLoading: boolean;
    loaded: boolean;
    currentTrack: TrackData;
    masterVolume: number;
    commentary: boolean;
    genre: Genre;
  };
  updatePlayerState: Action<StoreModel, any>;
}

export const store = createStore<StoreModel>({
  playerState: {
    isPlaying: false,
    loaded: false,
    beganLoading: false,
    currentTrack: Player.firstTrack(),
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
