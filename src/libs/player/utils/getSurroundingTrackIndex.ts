import { Track } from '../Track';

export function getSurroundingTrackIndex(
  tracks: Track[],
  currentTrackIndex: number,
  direction: 'next' | 'previous'
) {
  const lastSongIndex = tracks.length - 1;
  let nextIndex = 0;
  if (direction === 'next') {
    nextIndex = currentTrackIndex + (1 % lastSongIndex);
  }
  if (direction === 'previous') {
    nextIndex = currentTrackIndex - 1;
    if (nextIndex < 0) nextIndex = lastSongIndex;
  }
  return nextIndex;
}
