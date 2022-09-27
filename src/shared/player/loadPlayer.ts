import { Player } from './Player';

export const loadPlayer = () => {
  if (!window.player) {
    window.player = new Player();
    window.playerEnabled = true;
  }
};
