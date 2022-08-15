import { Stack } from '@mui/material';
import { HeaderLink } from './HeaderLink';
import { SocialIcons } from '../shared/components/SocialIcons';
import { HeaderInfo } from './HeaderInfo';
import { LINKS } from '../shared/constants/links';

export function Header(): JSX.Element {
  return (
    <Stack spacing={2}>
      <Stack alignItems={'center'} spacing={2} direction="row">
        <HeaderLink href={LINKS.GB_SOLO}>Solo Work</HeaderLink>
        <HeaderLink href={LINKS.GB_PRODUCTION}>Production</HeaderLink>
        <HeaderLink href={LINKS.GB_BLOG}>Blog</HeaderLink>
        <SocialIcons spacing={2} height="20px" width="20px" />
      </Stack>
      <HeaderInfo />
    </Stack>
  );
}
