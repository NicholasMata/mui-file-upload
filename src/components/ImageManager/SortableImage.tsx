import { useSortable } from '@dnd-kit/sortable';
import { type Ref, forwardRef, useState } from 'react';
import { CSS } from '@dnd-kit/utilities';
import { Box, type BoxProps, Fab, IconButton, Dialog, alpha } from '@mui/material';
import { Delete, Fullscreen } from '@mui/icons-material';

export type SortableMenuImageProps = {
  id: string;
  imageUrl: string;
  ref?: Ref<HTMLDivElement>;
  disabled?: boolean;
  onDelete: () => void;
};

export const ImageDisplay = forwardRef(function ImageDisplay(
  props: Omit<SortableMenuImageProps, 'ref' | 'id'> & BoxProps,
  ref?: Ref<HTMLDivElement>
): JSX.Element {
  const { disabled, imageUrl, onDelete, ...boxProps } = props;

  const [openFullScreenDialog, setOpenFullScreenDialog] = useState(false);

  return (
    <Box {...boxProps} ref={ref} position='relative'>
      <Box
        component='img'
        width='100%'
        sx={{ aspectRatio: '1/1', borderRadius: '8px', objectFit: 'cover' }}
        src={imageUrl}
      />
      <Box sx={{ position: 'absolute', top: -15, right: -15 }}>
        <Fab disabled={disabled} color='error' size='small' onClick={onDelete}>
          <Delete />
        </Fab>
      </Box>
      <Box
        sx={{
          position: 'absolute',
          bottom: 5,
          right: 0,
          background: alpha('#000000', 0.7),
          borderBottomRightRadius: '8px',
          borderTopLeftRadius: '8px',
        }}
      >
        <IconButton
          disabled={disabled}
          color='info'
          size='small'
          onClick={() => {
            setOpenFullScreenDialog(true);
          }}
        >
          <Fullscreen />
        </IconButton>
      </Box>
      <Dialog
        open={openFullScreenDialog}
        onClose={() => {
          setOpenFullScreenDialog(false);
        }}
      >
        <Box component='img' src={imageUrl} />
      </Dialog>
    </Box>
  );
});

export const SortableImageDisplay = (props: SortableMenuImageProps): JSX.Element => {
  const { id, imageUrl, onDelete, disabled } = props;
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id,
  });
  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };
  return (
    <ImageDisplay
      ref={setNodeRef}
      imageUrl={imageUrl}
      onDelete={onDelete}
      disabled={disabled}
      {...listeners}
      {...attributes}
      style={style}
    />
  );
};
