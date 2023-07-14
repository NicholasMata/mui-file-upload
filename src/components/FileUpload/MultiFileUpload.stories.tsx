import { Meta, StoryObj } from "@storybook/react";
import React, { PropsWithChildren } from "react";
import { useFakeService } from "../../stories/utils";
import { MultiFileUpload, MultiFileUploadProps } from "./MultiFileUpload";

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

export const Zone: Story = (args: StoryArgs) => {
  const uploadService = useFakeService({ failureRate: args.failureRate });
  return (
    <MultiFileUpload
      uploadService={uploadService}
      acceptsOnly={args.acceptsOnly}
    />
  );
};

Zone.args = {
  failureRate: 0.1,
};

Zone.argTypes = {
  failureRate: { control: { type: "number", min: 0, max: 1, step: 0.01 } },
};
