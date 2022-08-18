import { Howl } from 'howler';

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
