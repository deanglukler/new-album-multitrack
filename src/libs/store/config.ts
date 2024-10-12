import { createStore, createTypedHooks } from 'easy-peasy';
import { StoreModel } from './types/StoreModel';

export const store = createStore<StoreModel>({});

// typed hooks
const typedHooks = createTypedHooks<StoreModel>();
export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;
