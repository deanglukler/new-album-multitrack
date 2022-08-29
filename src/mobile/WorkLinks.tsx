import { Stack } from '@mui/material';
import { LINKS } from '../shared/constants/links';
import { WorkLink } from './WorkLink';

export function WorkLinks() {
  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      spacing={2}
      direction="row"
      flexWrap="wrap"
      sx={{ my: 2 }}
    >
      <WorkLink sx={{ my: 1 }} href={LINKS.GB_SOLO} target="_blank">
        Solo Work
      </WorkLink>
      <WorkLink sx={{ my: 1 }} href={LINKS.GB_PRODUCTION} target="_blank">
        Production
      </WorkLink>
      <WorkLink sx={{ my: 1 }} href={LINKS.GB_BLOG} target="_blank">
        Blog
      </WorkLink>
      <WorkLink sx={{ my: 1 }} href={LINKS.GB_LYRICS} target="_blank">
        Read Lyrics
      </WorkLink>
    </Stack>
  );
}
