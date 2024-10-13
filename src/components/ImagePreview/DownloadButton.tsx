import { Download } from '@mui/icons-material';
import { CircularProgress, IconButton, Tooltip } from '@mui/material';
import { useMemo, useState } from 'react';

export const DownloadImageButton = ({ imageUrl, disabled }: { imageUrl: string; disabled?: boolean }): JSX.Element => {
  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  const props = useMemo(() => {
    const isSameDomain = window.location.hostname === new URL(imageUrl).hostname;

    if (isSameDomain) {
      return {
        component: 'a',
        href: imageUrl,
        download: '',
        target: '_blank',
      };
    }

    return {
      onClick: async () => {
        setIsDownloading(true);
        const response = await fetch(imageUrl);
        const url = new URL(imageUrl);
        const blob = await response.blob();
        const href = URL.createObjectURL(blob);

        const anchorElement = document.createElement('a');
        anchorElement.href = href;

        const filename = url.pathname.split('/').pop();
        if (filename !== undefined) {
          anchorElement.download = filename;
        }

        document.body.appendChild(anchorElement);
        anchorElement.click();

        document.body.removeChild(anchorElement);
        window.URL.revokeObjectURL(href);
        setIsDownloading(false);
      },
    };
  }, [imageUrl]);

  return (
    <IconButton disabled={disabled} color='info' size='small' sx={{ minWidth: '32px', minHeight: '32px' }} {...props}>
      {isDownloading ? (
        <CircularProgress size={18} />
      ) : (
        <Tooltip title='Download'>
          <Download fontSize='small' />
        </Tooltip>
      )}
    </IconButton>
  );
};
