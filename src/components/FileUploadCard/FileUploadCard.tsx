import { InsertDriveFile } from '@mui/icons-material';
import { Card, CardHeader, Stack, Typography, LinearProgress, Box, type LinearProgressProps } from '@mui/material';
import { type ReactNode } from 'react';
import { FileUploadUtils, FileUtils } from '../../utils';
import { type FileUpload } from '../../types';

export type FileUploadCardProps<FileUploadResponse = string> = {
  /** The icon that will be displayed */
  icon?: ReactNode;
  /** The variant for the card. */
  variant?: 'elevation' | 'outlined';
  /** The FileUpload that will be used to build the card. */
  fileUpload: FileUpload<FileUploadResponse>;
  actions?: ReactNode;
  /**
   * Returns a custom status label for a file upload e.g. "Uploading", "Failed" or "Completed".
   * @param fileUpload File upload for which the status should be formatted
   * @returns Status label for the file upload
   */
  statusFormatter?: (fileUpload: FileUpload<FileUploadResponse>) => string;
};

export const FileUploadCard = <FileUploadResponse = string,>({
  icon = <InsertDriveFile />,
  fileUpload,
  variant = 'outlined',
  actions,
  statusFormatter,
}: FileUploadCardProps<FileUploadResponse>): JSX.Element => {
  const status = (statusFormatter ?? FileUploadUtils.formatStatus)(fileUpload);

  return (
    <Card variant={variant}>
      <CardHeader
        avatar={icon}
        title={fileUpload.file.name}
        subheader={
          <Stack>
            <Typography variant='caption' color={fileUpload.failed === true ? 'error' : 'text.secondary'}>
              {FileUtils.formatFileSize(fileUpload.file.size)} · {status}
            </Typography>
            {!fileUpload.completed ? (
              <LinearProgressWithLabel variant='determinate' value={fileUpload.progress} />
            ) : undefined}
          </Stack>
        }
        action={actions}
      />
    </Card>
  );
};

type LinearProgressWithLabelProps = LinearProgressProps & { value: number };

const LinearProgressWithLabel = (props: LinearProgressWithLabelProps): JSX.Element => (
  <Box sx={{ display: 'flex', alignItems: 'center' }}>
    <Box sx={{ width: '100%', mr: 1 }}>
      <LinearProgress variant='determinate' {...props} />
    </Box>
    <Box sx={{ minWidth: 35 }}>
      <Typography variant='body2' color='text.secondary'>{`${Math.round(props.value)}%`}</Typography>
    </Box>
  </Box>
);
