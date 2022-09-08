import { Stack } from '@mui/material';
import { HeaderLink } from './HeaderLink';
import { SocialIcons } from '../shared/components/SocialIcons';
import { HeaderInfo } from './HeaderInfo';
import { LINKS } from '../shared/constants/links';

export function Header(): JSX.Element {
  return (
    <Stack>
      <Stack
        sx={{ width: 'max-content', mb: '12px' }}
        alignItems={'center'}
        spacing={2}
        direction="row"
      >
        <HeaderLink href={LINKS.GB_SOLO} target="_blank">
          Solo Work
        </HeaderLink>
        <HeaderLink href={LINKS.GB_PRODUCTION} target="_blank">
          Production
        </HeaderLink>
        <HeaderLink href={LINKS.GB_BLOG} target="_blank">
          Blog
        </HeaderLink>
        <SocialIcons
          stackSX={{
            '& .social-icon': { opacity: '0.5', '&:hover': { opacity: '1' } },
          }}
          spacing={2}
          height="20px"
          width="20px"
        />
      </Stack>
      <HeaderInfo />
    </Stack>
  );
}
