import { type StoryObj, type Meta } from '@storybook/react/*';
import { ImageManager, type ImageManagerProps } from './ImageManager';
import { useFakeImageService } from '../../stories/utils';
import { useImageManagerState } from './useImageManagerState';

const meta: Meta<typeof ImageManager> = {
  component: ImageManager,
  argTypes: {
    helperText: {
      control: 'text',
    },
  },
};

export default meta;

type Story = StoryObj<typeof ImageManager>;

const DefaultStory = (props: ImageManagerProps): JSX.Element => {
  const fakeImageService = useFakeImageService({});
  const state = useImageManagerState();

  return <ImageManager {...props} uploadService={fakeImageService} {...state} />;
};

export const Default: Story = {
  args: {
    label: 'Image',
  },
  render: DefaultStory,
};
