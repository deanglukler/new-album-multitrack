import { TrackLoader } from '..';

export const onDOMContentLoaded = () =>
  document.addEventListener('DOMContentLoaded', () => {
    const trackLoader = new TrackLoader();
    trackLoader.start();
  });
