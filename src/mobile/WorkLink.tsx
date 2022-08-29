import { Link } from '@mui/material';

export const WorkLink = (props: any): JSX.Element => {
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
