import { PlayerStoreState } from '../../player';
import { PlayerActions } from '../../player/playerActions';

export interface StoreModel {
  player: PlayerStoreState & PlayerActions;
}
