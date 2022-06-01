import React, { useEffect, useState } from 'react';
import './App.css';
import { LinearIndeterminate } from './components/LinearIndeterminate';
import { Player } from './Player';
import PlayerView from './PlayerView';

function App() {
  const [player, setPlayer] = useState<Player | null>(null);

  useEffect(() => {
    new Player((player) => {
      setPlayer(player);
    });
  }, []);

  if (!player) {
    return (
      <div className="App">
        <LinearIndeterminate />
      </div>
    );
  }

  return <PlayerView player={player} />;
}

export default App;
