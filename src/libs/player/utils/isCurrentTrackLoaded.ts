import { findTrackByIndex } from './findTrackByIndex';
import { Track } from '../Track';

export function isCurrentTrackLoaded(
  currentTrackIndex: number,
  tracks: Track[]
) {
  return findTrackByIndex(currentTrackIndex, tracks).isLoaded;
}
