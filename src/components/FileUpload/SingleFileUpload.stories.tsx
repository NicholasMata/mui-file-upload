import { type Meta, type StoryObj } from '@storybook/react';
import { type ComponentProps, useMemo } from 'react';
import { useFakeService } from '../../stories/utils';
import { SingleFileUpload } from '.';
import { useFileUploadManager } from '../../hooks';
import { FileDropzoneInputBody, FileDropzoneStatus, useFileDropzoneContext } from '../FileDropzone';
import { Link, Stack, type Theme, Typography, alpha } from '@mui/material';
import { FileDropzoneStatusUtils, FileDropzoneUtils, type StatusColorOptions } from '../../utils';
import {
  DEFAULT_BACKGROUND_ALPHA,
  DEFAULT_BORDER_ALPHA,
  DEFAULT_DRAG_ACTIVE_BACKGROUND_ALPHA,
  DEFAULT_DRAG_ACTIVE_BORDER_ALPHA,
} from '../FileDropzone/contants';

type StoryProps = {
  failureRate: number;
  title: string;
  dropTitle: string;
  disabledTitle: string;
  openFileSelectorTitle: string;
};

type AllProps = ComponentProps<typeof SingleFileUpload<string>> & StoryProps;

const meta: Meta<AllProps> = {
  component: SingleFileUpload,
  title: 'SingleFileUpload',
  tags: ['autodocs'],
  args: {
    failureRate: 0.1,
  },
  argTypes: {
    uploadService: { table: { disable: true } },
    onSuccessfulUpload: { table: { disable: true } },
    fileManager: { table: { disable: true } },
    body: { table: { disable: true } },
    sx: { table: { disable: true } },
  },
};

export default meta;

type Story = StoryObj<AllProps>;

export const Default: Story = {
  render: (args) => {
    const uploadService = useFakeService({ failureRate: args.failureRate });
    const fileManager = useFileUploadManager<void>();
    return (
      <Stack alignItems='start'>
        <SingleFileUpload
          disabled={args.disabled}
          acceptsOnly={args.acceptsOnly}
          uploadService={uploadService}
          fileManager={fileManager}
        />
      </Stack>
    );
  },
};

export const CustomTitle: Story = {
  args: {
    title: 'Custom Title Text',
    dropTitle: 'Custom Drop Text',
    disabledTitle: 'Custom Disabled Text',
    openFileSelectorTitle: 'Custom Open File Browser',
  },

  render: (args) => {
    const uploadService = useFakeService({ failureRate: args.failureRate });
    const fileManager = useFileUploadManager<void>();
    return (
      <SingleFileUpload
        disabled={args.disabled}
        sx={{ dragZoneSx: () => ({ borderStyle: 'solid', borderWidth: 1, borderRadius: 0 }) }}
        body={
          <FileDropzoneInputBody
            title={args.title}
            dropTitle={args.dropTitle}
            disabledTitle={args.disabledTitle}
            openFileSelectorTitle={args.openFileSelectorTitle}
          />
        }
        acceptsOnly={args.acceptsOnly}
        uploadService={uploadService}
        fileManager={fileManager}
      />
    );
  },
};

const CustomZoneBody = (): JSX.Element => {
  const { dropzoneState, openFileSelector } = useFileDropzoneContext();
  const { disabled } = dropzoneState;
  const { status, isError } = useMemo(() => FileDropzoneStatusUtils.getInfo(dropzoneState), [dropzoneState]);

  return (
    <Typography paddingX={2} paddingY={1} color={isError ? 'error' : 'inherit'} minWidth={'400px'}>
      {status === FileDropzoneStatus.overloaded && 'Custom Overloaded Body'}
      {status === FileDropzoneStatus.dragRejected && 'Custom Drag Rejected'}
      {status === FileDropzoneStatus.disabled && 'Custom Disabled'}
      {!isError && !disabled && (
        <>
          <Link onClick={openFileSelector}>Custom Open File Browser</Link>{' '}
          {status === FileDropzoneStatus.dragActive ? 'Custom Drop Text' : 'Custom Text Here'}
        </>
      )}
    </Typography>
  );
};

export const CustomBody: Story = {
  render: (args) => {
    const uploadService = useFakeService({ failureRate: args.failureRate });
    const fileManager = useFileUploadManager<void>();
    const backgroundColor = (t: Theme): StatusColorOptions => ({
      default: alpha(t.palette.secondary.main, DEFAULT_BACKGROUND_ALPHA),
      disabled: alpha(t.palette.text.disabled, DEFAULT_BACKGROUND_ALPHA),
      dragActive: alpha(t.palette.secondary.main, DEFAULT_DRAG_ACTIVE_BACKGROUND_ALPHA),
    });
    const borderColor = (t: Theme): StatusColorOptions => ({
      default: alpha(t.palette.secondary.main, DEFAULT_BORDER_ALPHA),
      disabled: alpha(t.palette.text.disabled, DEFAULT_BORDER_ALPHA),
      dragActive: alpha(t.palette.secondary.main, DEFAULT_DRAG_ACTIVE_BORDER_ALPHA),
    });
    return (
      <SingleFileUpload
        disabled={args.disabled}
        body={<CustomZoneBody />}
        acceptsOnly={args.acceptsOnly}
        uploadService={uploadService}
        fileManager={fileManager}
        sx={{
          dragZoneSx: (state) => (t) => ({
            backgroundColor: FileDropzoneUtils.selectColor(state, backgroundColor(t)),
            borderColor: FileDropzoneUtils.selectColor(state, borderColor(t)),
          }),
        }}
      />
    );
  },
};
