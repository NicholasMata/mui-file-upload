import { Meta, StoryObj } from "@storybook/react";
import React, { PropsWithChildren } from "react";
import { useFakeService } from "../../stories/utils";
import { MultiFileUpload, MultiFileUploadProps } from "./MultiFileUpload";
import { FileDropzoneBody, useFileDropzoneContext } from "../FileDropzone";
import { Stack, Typography, alpha } from "@mui/material";

type StoryArgs = PropsWithChildren<
  MultiFileUploadProps & { failureRate: number }
>;
type StoryType = React.FC<StoryArgs>;
const meta: Meta<StoryType> = {
  component: MultiFileUpload,
  title: "MultiFileUpload",
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<StoryType>;

export const Default: Story = (args: StoryArgs) => {
  const uploadService = useFakeService({ failureRate: args.failureRate });
  return (
    <MultiFileUpload
      uploadService={uploadService}
      acceptsOnly={args.acceptsOnly}
    />
  );
};

Default.parameters = {
  controls: { exclude: /^(?!failureRate$).*$/g }
}

Default.args = {
  failureRate: 0.1,
};

Default.argTypes = {
  failureRate: { control: { type: "number", min: 0, max: 1, step: 0.01 } },
};

export const CustomTitle: Story = (args: StoryArgs) => {
  const uploadService = useFakeService({ failureRate: args.failureRate });
  return <MultiFileUpload
    sx={{ dragZoneSx: () => ({ height: '70vh', borderStyle: 'solid', borderWidth: 3, borderRadius: 0 }) }}
    body={<FileDropzoneBody
      title={'Custom text here'}
      dropTitle={<Typography>Custom drop text here</Typography>}
    />}
    uploadService={uploadService}
    acceptsOnly={args.acceptsOnly}
  />
}

CustomTitle.parameters = {
  controls: { exclude: /^(?!failureRate$).*$/g }
}

CustomTitle.args = {
  failureRate: 0.1,
};

CustomTitle.argTypes = {
  failureRate: { control: { type: "number", min: 0, max: 1, step: 0.01 } },
};


const CustomFileUploadZone = () => {
  const { dropzoneState } = useFileDropzoneContext()
  return <Stack alignItems='center' justifyContent='center'>
    {dropzoneState.dragActive ? 'Custom Body Drop Files' : 'Custom Body'}
  </Stack>
}

export const CustomBody: Story = (args: StoryArgs) => {
  const uploadService = useFakeService({ failureRate: args.failureRate });
  return <MultiFileUpload
    sx={{
      dragZoneSx: (state) => (t) => ({
        height: '70vh',
        borderWidth: 3,
        backgroundColor: alpha(t.palette.secondary.main, state.dragActive ? 0.1 : 0.03),
        borderColor: alpha(t.palette.secondary.main, state.dragActive ? 1 : 0.5)
      }),
    }}
    body={<CustomFileUploadZone />}
    uploadService={uploadService}
    acceptsOnly={args.acceptsOnly}
  />
}

CustomBody.parameters = {
  controls: { exclude: /^(?!failureRate$).*$/g }
}

CustomBody.args = {
  failureRate: 0.1,
};

CustomBody.argTypes = {
  failureRate: { control: { type: "number", min: 0, max: 1, step: 0.01 } },
};

