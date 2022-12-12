import { findTrackByIndex } from './findTrackByIndex';
import { Track } from '../Track';

export function getCurrentTrackName(
  currentTrackIndex: number,
  tracks: Track[]
) {
  const track = findTrackByIndex(currentTrackIndex, tracks);
  return track.trackData.title;
}
