import { Howl } from 'howler';

export interface TrackData {
  title: string;
  ACOUSTIC: { path: string };
  ACOUSTIC_COM: { path: string };
  SYNTHETIC: { path: string };
  SYNTHETIC_COM: { path: string };
}

export type TrackDatas = TrackData[];

export interface RequestHowls {
  ACOUSTIC: Howl;
  ACOUSTIC_COM: Howl;
  SYNTHETIC: Howl;
  SYNTHETIC_COM: Howl;
}

export interface Howls extends RequestHowls {
  TIMELINE: Howl;
}

export type TrackHowls = Howls[];

export type Commentary = 'commentary' | 'no-commentary';
export type Genre = 'acoustic' | 'synthetic';

export interface Volume {
  genre: Genre;
  commentary: Commentary;
  masterVolume: number;
}
