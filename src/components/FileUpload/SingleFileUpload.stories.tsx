import { Meta, StoryObj } from "@storybook/react";
import React, { PropsWithChildren } from "react";
import { useFakeService } from "../../stories/utils";
import { SingleFileUpload, SingleFileUploadProps } from ".";
import { useFileUploaderManager } from "../../hooks";

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

export const Input: Story = (args: StoryArgs) => {
  const uploadService = useFakeService({ failureRate: args.failureRate });
  const fileManager = useFileUploaderManager();
  return (
    <SingleFileUpload
      acceptsOnly={args.acceptsOnly}
      uploadService={uploadService}
      fileManager={fileManager}
    />
  );
};

Input.args = {
  failureRate: 0.1,
};

Input.argTypes = {
  failureRate: { control: { type: "number", min: 0, max: 1, step: 0.01 } },
};
