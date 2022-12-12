import { TrackHowlerAdapter } from './TrackHowlerAdapter';

export class Track {
  public isLoaded = false;
  private internalHowlerAdapter: null | TrackHowlerAdapter = null;

  constructor(public trackData: TrackData, public index: number) {}

  public get howlerAdapter(): TrackHowlerAdapter {
    if (!this.internalHowlerAdapter) {
      throw new Error('cant access howlerAdapter');
    }
    return this.internalHowlerAdapter;
  }

  public set howlerAdapter(adapter: TrackHowlerAdapter) {
    this.internalHowlerAdapter = adapter;
  }
}
