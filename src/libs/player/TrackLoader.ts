import _ from 'lodash';
import { store } from '../store/store';
import { Transport } from './Transport';
import { Track } from './Track';
import { TrackHowlerAdapter } from './TrackHowlerAdapter';

export class TrackLoader {
  public start() {
    this.loadNextTrack();
  }

  private isMoreTracksToLoad() {
    const tracks = store.getState().player.tracks;
    for (let track of tracks) {
      if (!track.isLoaded) return true;
    }
    return false;
  }

  private nextTrackToLoad(): Track | null {
    const nextUnloadedTrack = _.first(
      _.filter(store.getState().player.tracks, (t) => !t.isLoaded)
    );
    if (!nextUnloadedTrack) {
      return null;
    }
    return nextUnloadedTrack;
  }

  private loadNextTrack() {
    if (!this.isMoreTracksToLoad) return;
    const nextUnloadedTrack = this.nextTrackToLoad();
    if (nextUnloadedTrack) {
      this.loadTrack(nextUnloadedTrack);
    }
  }

  private loadTrack(trackToLoad: Track) {
    console.log(`Loading track ${trackToLoad.trackData.title}`);

    const howlerAdapter = new TrackHowlerAdapter(trackToLoad.trackData, {
      handleOnEnd: () => {
        Transport.skip('next');
      },
    });

    trackToLoad.howlerAdapter = howlerAdapter;

    return howlerAdapter.trackLoad
      .then(() => {
        trackToLoad.isLoaded = true;
        console.log(`loaded track ${trackToLoad.trackData.title}`);
        this.onTrackLoad(trackToLoad);
      })
      .catch((err) => {
        console.log(
          `ERROR loading track ${howlerAdapter.trackData.title}`,
          err
        );
        console.log(`ATTEMPTING RELOAD track ${howlerAdapter.trackData.title}`);
        setTimeout(() => {
          this.loadTrack(trackToLoad);
        }, 1000);
      });
  }

  private onTrackLoad(track: Track) {
    const updateTrack = store.getActions().player.updateTrack;
    updateTrack(track);
    this.loadNextTrack();
  }
}
