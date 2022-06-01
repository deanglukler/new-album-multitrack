import { Howl } from 'howler';

export interface TrackData {
  title: string;
  ACOUSTIC: { path: string };
  ACOUSTIC_COM: { path: string };
  SYNTHETIC: { path: string };
  SYNTHETIC_COM: { path: string };
}

export interface TrackDatas {
  [key: string]: TrackData;
}

export interface Howls {
  ACOUSTIC: Howl;
  ACOUSTIC_COM: Howl;
  SYNTHETIC: Howl;
  SYNTHETIC_COM: Howl;
}

export interface TrackHowls {
  [key: string]: Howls;
}
