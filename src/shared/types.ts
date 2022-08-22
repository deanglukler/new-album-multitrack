import { Howl } from 'howler';
import { Track } from './player/Track';

export interface TrackData {
  title: string;
  ACOUSTIC: { path: string };
  SYNTHETIC: { path: string };
  COMMENTARY: { path: string };
}

export type TrackDatas = TrackData[];

export interface RequestHowls {
  ACOUSTIC: Howl;
  COMMENTARY: Howl;
  SYNTHETIC: Howl;
}

export interface Howls extends RequestHowls {
  TIMELINE: Howl;
}

export type TrackHowls = Howls[];

export type Commentary = 'commentary' | 'no-commentary';
export type Genre = 'acoustic' | 'synthetic';

export interface Volume {
  genre: Genre;
  commentary: boolean;
  masterVolume: number;
}

export interface PlayerTrack {
  track: Track | null;
  isLoaded: boolean;
  trackData: TrackData;
}
