import { createStore, createTypedHooks } from 'easy-peasy';
import { initPlayerState } from '../player/initPlayerState';
import { playerActions } from '../player/playerActions';
import { StoreModel } from './types/StoreModel';

export const store = createStore<StoreModel>({
  player: {
    ...initPlayerState,
    ...playerActions,
  },
});

const typedHooks = createTypedHooks<StoreModel>();

export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;
