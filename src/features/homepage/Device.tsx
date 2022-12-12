import { useIsMobile } from '../../libs/device/hooks';
import Desktop from './Desktop';
import Mobile from './Mobile';

function Device(): JSX.Element {
  const isMobile = useIsMobile();
  if (isMobile) {
    return <Mobile />;
  } else {
    return <Desktop />;
  }
}

export default Device;
