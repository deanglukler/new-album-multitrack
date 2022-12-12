type Version = 'ACOUSTIC' | 'COMMENTARY' | 'SYNTHETIC';

interface TrackData {
  title: string;
  ACOUSTIC: { path: string };
  SYNTHETIC: { path: string };
  COMMENTARY: { path: string };
}

interface VolumeAndVersion {
  version: Version;
  masterVolume: number;
}
