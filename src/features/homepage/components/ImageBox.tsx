import { Box, BoxProps } from '@mui/material';

export function ImageBox(props: BoxProps<'img'>) {
  return <Box component="img" {...props} />;
}
