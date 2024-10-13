import { Fullscreen } from '@mui/icons-material';
import { Box, Dialog, IconButton, Tooltip } from '@mui/material';
import { useState } from 'react';
import { DarkOverlay } from './DarkOverlay';
import { DownloadImageButton } from './DownloadButton';

export type FullscreenImageDialogButtonProps = {
  imageUrl: string;
  disabled?: boolean;
};

export const FullscreenImageDialogButton = (props: FullscreenImageDialogButtonProps): JSX.Element => {
  const { imageUrl, disabled } = props;
  const [openFullScreenDialog, setOpenFullScreenDialog] = useState(false);
  return (
    <>
      <IconButton
        disabled={disabled}
        color='info'
        size='small'
        onClick={() => {
          setOpenFullScreenDialog(true);
        }}
      >
        <Tooltip title='Fullscreen'>
          <Fullscreen />
        </Tooltip>
      </IconButton>
      <Dialog
        open={openFullScreenDialog}
        onClose={() => {
          setOpenFullScreenDialog(false);
        }}
      >
        <Box component='img' src={imageUrl} />
        <DarkOverlay snapTo='bottomRight' openCornerRadius='4px'>
          <DownloadImageButton imageUrl={imageUrl} disabled={disabled} />
        </DarkOverlay>
      </Dialog>
    </>
  );
};
