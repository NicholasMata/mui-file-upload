import { Box, Skeleton, type BoxProps } from '@mui/material';
import { type Ref, forwardRef, useState } from 'react';
import { mergeSx } from '../../utils';

export type ImagePreviewProps = {
  imageUrl: string;
  disabled?: boolean;
} & BoxProps;

export const ImagePreview = forwardRef(function ImagePreview(
  props: ImagePreviewProps,
  ref?: Ref<HTMLDivElement>
): JSX.Element {
  const { disabled, imageUrl, children, ...boxProps } = props;

  const [isLoading, setIsLoading] = useState<boolean>(true);

  return (
    <Box
      {...boxProps}
      ref={ref}
      display={'flex'}
      flex={'row'}
      sx={mergeSx({ maxHeight: '300px', aspectRatio: '1/1' }, boxProps.sx)}
      position='relative'
    >
      <Box
        component='img'
        onLoad={() => {
          setIsLoading(false);
        }}
        sx={{
          flexGrow: 1,
          width: '100%',
          borderRadius: '8px',
          objectFit: 'cover',
        }}
        src={imageUrl}
      />
      {isLoading && (
        <Skeleton
          variant='rectangular'
          sx={{
            zIndex: 10,
            borderRadius: '8px',
            position: 'absolute',
            width: '100%',
            height: '100%',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          }}
        />
      )}
      {children}
    </Box>
  );
});
