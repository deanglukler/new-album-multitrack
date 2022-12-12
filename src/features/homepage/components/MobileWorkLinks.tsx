import { Link, Stack } from '@mui/material';
import { LINKS } from '../utils/constants';

const WorkLink = (props: any): JSX.Element => {
  const { sx, ...restOfProps } = props;
  return (
    <Link
      sx={{
        fontSize: '18px',
        fontWeight: 600,
        color: 'black',
        textDecoration: 'none',
        cursor: 'pointer',
        '&:hover': { textDecoration: 'underline' },
        ...sx,
      }}
      {...restOfProps}
    />
  );
};

export function MobileWorkLinks() {
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
    </Stack>
  );
}
