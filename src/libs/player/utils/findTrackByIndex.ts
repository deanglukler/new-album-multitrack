import _ from 'lodash';
import { Track } from '../Track';

export function findTrackByIndex(index: number, tracks: Track[]): Track {
  const currentTrack = _.find(tracks, (track) => track.index === index);
  if (!currentTrack) throw new Error('Couldnt find current track :S');
  return currentTrack;
}
