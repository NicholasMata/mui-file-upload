import { Meta, StoryObj } from "@storybook/react";
import React, { PropsWithChildren, useMemo } from "react";
import { useFakeService } from "../../stories/utils";
import { SingleFileUpload, SingleFileUploadProps } from ".";
import { useFileUploaderManager } from "../../hooks";
import { FileDropzoneInputBody, FileDropzoneStatus, useFileDropzoneContext } from "../FileDropzone";
import { Link, Stack, Typography, alpha } from "@mui/material";
import { FileDropzoneStatusUtils } from "../../utils";

type StoryArgs = PropsWithChildren<
  SingleFileUploadProps & { failureRate: number }
>;
type StoryType = React.FC<StoryArgs>;
const meta: Meta<StoryType> = {
  component: SingleFileUpload,
  title: "SingleFileUpload",
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<StoryType>;

export const Default: Story = (args: StoryArgs) => {
  const uploadService = useFakeService({ failureRate: args.failureRate });
  const fileManager = useFileUploaderManager<void>();
  return (
    <SingleFileUpload
      acceptsOnly={args.acceptsOnly}
      uploadService={uploadService}
      fileManager={fileManager}
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
  const fileManager = useFileUploaderManager<void>();
  return (
    <SingleFileUpload
      sx={{ dragZoneSx: () => ({ borderStyle: 'solid', borderWidth: 1, borderRadius: 0 }) }}
      body={<FileDropzoneInputBody title="Custom text here" dropTitle="Custom drop text here" />}
      acceptsOnly={args.acceptsOnly}
      uploadService={uploadService}
      fileManager={fileManager}
    />
  );
};

CustomTitle.parameters = {
  controls: { exclude: /^(?!failureRate$).*$/g }
}

CustomTitle.args = {
  failureRate: 0.1,
};

CustomTitle.argTypes = {
  failureRate: { control: { type: "number", min: 0, max: 1, step: 0.01 } },
};

const CustomZoneBody = () => {
  const { dropzoneState, openFileSelector } = useFileDropzoneContext()

  const { status, isError } = useMemo(
    () => FileDropzoneStatusUtils.getInfo(dropzoneState),
    [dropzoneState]
  );

  return <Typography
    paddingX={2}
    paddingY={1}
    color={isError ? "error" : "inherit"}
    minWidth={"400px"}
  >
    {status == FileDropzoneStatus.overloaded && 'Custom Overloaded Body'}
    {status == FileDropzoneStatus.dragRejected && 'Custom Drag Rejected'}
    {!isError && (
      <>
        <Link onClick={openFileSelector}>Custom Open File Browser</Link>{" "}
        {status == FileDropzoneStatus.dragActive ? 'Custom Drop Text' : 'Custom Text Here'}
      </>
    )}
  </Typography>
}

export const CustomBody: Story = (args: StoryArgs) => {
  const uploadService = useFakeService({ failureRate: args.failureRate });
  const fileManager = useFileUploaderManager<void>();
  return (
    <SingleFileUpload
      body={<CustomZoneBody />}
      acceptsOnly={args.acceptsOnly}
      uploadService={uploadService}
      fileManager={fileManager}
      sx={{
        dragZoneSx: (state) => (t) => ({
          backgroundColor: alpha(t.palette.secondary.main, state.dragActive ? 0.1 : 0.03),
          borderColor: alpha(t.palette.secondary.main, state.dragActive ? 1 : 0.5)
        }),
      }}
    />
  );
};

CustomBody.parameters = {
  controls: { exclude: /^(?!failureRate$).*$/g }
}

CustomBody.args = {
  failureRate: 0.1,
};

CustomBody.argTypes = {
  failureRate: { control: { type: "number", min: 0, max: 1, step: 0.01 } },
};
