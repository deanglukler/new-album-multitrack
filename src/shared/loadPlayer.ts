import { Player } from './Player';

export const loadPlayer = () => {
  window.player = new Player(() => {
    window.playerLoaded = true;
  });
};
