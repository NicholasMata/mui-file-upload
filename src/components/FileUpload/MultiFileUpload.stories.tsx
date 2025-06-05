import { type Meta, type StoryObj } from '@storybook/react';
import { type ComponentProps, useMemo } from 'react';
import { useFakeService } from '../../stories/utils';
import { MultiFileUpload } from './MultiFileUpload';
import { FileDropzoneBody, useFileDropzoneContext } from '../FileDropzone';
import { Stack, Typography, alpha } from '@mui/material';
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

type AllProps = ComponentProps<typeof MultiFileUpload<void>> & StoryProps;

const meta: Meta<AllProps> = {
  component: MultiFileUpload,
  title: 'MultiFileUpload',
  tags: ['autodocs'],
  args: {
    failureRate: 0.1,
  },
  argTypes: {
    uploadService: { table: { disable: true } },
    helperText: {
      control: 'text',
    },
    onSuccessfulUpload: { table: { disable: true } },
    fileManager: { table: { disable: true } },
    body: { table: { disable: true } },
    sx: { table: { disable: true } },
  },
};

export default meta;

type Story = StoryObj<AllProps>;

export const Default: Story = {
  render: ({ failureRate, ...args }) => {
    const uploadService = useFakeService({ failureRate });
    return <MultiFileUpload {...args} uploadService={uploadService} />;
  },
};

export const CustomTitle: Story = {
  args: {
    title: 'Custom Title Text',
    dropTitle: 'Custom Drop Text',
    disabledTitle: 'Custom Disabled Text',
    openFileSelectorTitle: 'Custom Browse Files Text',
  },
  render: (args) => {
    const uploadService = useFakeService({ failureRate: args.failureRate });
    return (
      <MultiFileUpload
        disabled={args.disabled}
        sx={{ dragZoneSx: () => ({ borderStyle: 'solid', borderWidth: 3, borderRadius: 0 }) }}
        body={
          <FileDropzoneBody
            title={args.title}
            dropTitle={<Typography>{args.dropTitle}</Typography>}
            disabledTitle={args.disabledTitle}
            openFileSelectorTitle={args.openFileSelectorTitle}
          />
        }
        uploadService={uploadService}
        acceptsOnly={args.acceptsOnly}
      />
    );
  },
};

const CustomFileUploadZone = (): JSX.Element => {
  const { dropzoneState } = useFileDropzoneContext();
  const title = useMemo(() => {
    if (dropzoneState.dragActive != null) {
      if (dropzoneState.disabled) return 'Custom Body Disabled (File Over Me)';
      return 'Custom Body Drop Files';
    } else {
      if (dropzoneState.disabled) return 'Custom Body Disabled';
      return 'Custom Body';
    }
  }, [dropzoneState]);
  return (
    <Stack alignItems='center' justifyContent='center'>
      {title}
    </Stack>
  );
};

export const CustomBody: Story = {
  render: (args) => {
    const uploadService = useFakeService({ failureRate: args.failureRate });
    return (
      <MultiFileUpload
        helperText={args.helperText}
        error={args.error}
        disabled={args.disabled}
        sx={{
          dragZoneSx: (state) => (t) => ({
            height: '70vh',
            borderWidth: 3,
            backgroundColor: alpha(
              state.disabled ? t.palette.text.disabled : t.palette.secondary.main,
              state.dragActive != null ? DEFAULT_DRAG_ACTIVE_BACKGROUND_ALPHA : DEFAULT_BACKGROUND_ALPHA
            ),
            borderColor: alpha(
              state.disabled ? t.palette.text.disabled : t.palette.secondary.main,
              state.dragActive != null ? DEFAULT_DRAG_ACTIVE_BORDER_ALPHA : DEFAULT_BORDER_ALPHA
            ),
          }),
        }}
        body={<CustomFileUploadZone />}
        uploadService={uploadService}
        acceptsOnly={args.acceptsOnly}
      />
    );
  },
};
