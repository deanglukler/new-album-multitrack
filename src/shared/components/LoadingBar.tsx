import { Fade, LinearProgress } from '@mui/material';
import { useEffect, useState } from 'react';

export function LoadingBar({
  finished,
  currentTrack,
  mobile,
}: {
  finished: boolean;
  currentTrack: any;
  mobile?: boolean;
}) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (finished) {
      return;
    }
    const interval = setInterval(function () {
      if (finished) {
        return;
      }
      let step = 10; // the smaller this is the slower the progress bar

      if (progress >= 70) {
        step = 1;
      }

      if (progress >= 90) {
        step = 0.1;
      }
      const diff = Math.random() * step;
      setProgress(Math.min(progress + diff, 100));
    }, 700);
    return () => {
      clearInterval(interval);
    };
  }, [progress, finished]);

  useEffect(() => {
    if (finished) {
      setProgress(100);
      return;
    }
    setProgress(0);
  }, [finished, currentTrack]);

  return (
    <Fade in={!finished} timeout={{ enter: 1000, exit: 600 }}>
      <LinearProgress
        sx={{
          mt: '0 !important',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
        }}
        variant="determinate"
        value={progress}
      />
    </Fade>
  );
}
