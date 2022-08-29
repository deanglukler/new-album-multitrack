import { Link } from '@mui/material';

export function HeaderLink(props: any): JSX.Element {
  return (
    <Link
      sx={{
        fontSize: '24px',
        color: 'black',
        textDecoration: 'none',
        cursor: 'pointer',
        '&:hover': { textDecoration: 'underline' },
      }}
      {...props}
    />
  );
}
