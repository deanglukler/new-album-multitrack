import { Box } from '@mui/material';
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
    return <LinearIndeterminate />;
  }

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <PlayerView player={player} />
    </Box>
  );
}

export default App;
