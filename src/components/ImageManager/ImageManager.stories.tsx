import { type StoryObj, type Meta } from '@storybook/react/*';
import { useState, type ComponentProps } from 'react';
import { ImageManager } from './ImageManager';
import { useImageManagerState } from './useImageManagerState';
import { useFakeImageService } from '../../stories/utils';
import { type RequiredImagePreviewProps } from './SortableImageGrid';
import { ImageManagerPreviewGrid } from './ImageManagerPreviewGrid';
import { DarkOverlay, DeleteButton, ImagePreview } from '../ImagePreview';
import { DraggableContainer } from './DraggableContainer';
import { OptionsButton } from '../ImagePreview/OptionsButton';
import { Star } from '@mui/icons-material';
import { Typography } from '@mui/material';

type StoryProps = {
  failureRate: number;
};

type AllProps = ComponentProps<typeof ImageManager> & StoryProps;

const meta: Meta<AllProps> = {
  component: ImageManager,
  title: 'ImageManager',
  tags: ['autodocs'],
  args: {
    failureRate: 0.1,
  },
  argTypes: {
    uploadService: { table: { disable: true } },
    helperText: {
      control: 'text',
    },
    onAdd: { table: { disable: true } },
    onMove: { table: { disable: true } },
    onDelete: { table: { disable: true } },
  },
};

export default meta;

type Story = StoryObj<AllProps>;

const DefaultStory = ({ failureRate, value, ...props }: AllProps): JSX.Element => {
  const fakeImageService = useFakeImageService({ failureRate });
  const state = useImageManagerState(value);

  return <ImageManager {...props} uploadService={fakeImageService} {...state} />;
};

export const Default: Story = {
  args: {
    label: 'Image',
  },
  render: (args) => <DefaultStory {...args} />,
};

type MyCustomImagePreviewProps = {
  coverImage?: string;
  onSetCoverImage: (imageUrl: string) => void;
} & RequiredImagePreviewProps;

const MyCustomImagePreview = ({
  index,
  coverImage,
  onSetCoverImage,
  onDelete,
  ...props
}: MyCustomImagePreviewProps): JSX.Element => {
  const isCoverImage = coverImage === props.imageUrl;
  return (
    <DraggableContainer id={props.imageUrl}>
      <ImagePreview {...props}>
        <DeleteButton sx={{ position: 'absolute', top: -20, right: -20 }} onClick={onDelete} />
        <DarkOverlay snapTo='topLeft' openCornerRadius='8px' curveOppositeCorner p={1} lineHeight={1}>
          <Typography color='white' fontWeight={500}>
            {index + 1}
          </Typography>
        </DarkOverlay>
        {isCoverImage && (
          <DarkOverlay snapTo='bottomRight' openCornerRadius='8px' curveOppositeCorner p={1} lineHeight={1}>
            <Star color='warning' fontSize='small' />
          </DarkOverlay>
        )}
        {!isCoverImage && (
          <DarkOverlay snapTo='bottomRight' openCornerRadius='8px' curveOppositeCorner>
            <OptionsButton
              color='primary'
              options={[
                {
                  label: 'Set as Cover',
                  action: () => {
                    onSetCoverImage(props.imageUrl);
                    return true;
                  },
                },
              ]}
            />
          </DarkOverlay>
        )}
      </ImagePreview>
    </DraggableContainer>
  );
};

const CustomImagePreviewStory = ({ failureRate, value, ...props }: AllProps): JSX.Element => {
  const fakeImageService = useFakeImageService({ failureRate });
  const state = useImageManagerState(value);
  const [coverImage, setCoverImage] = useState<string>();

  return (
    <ImageManager {...props} uploadService={fakeImageService} {...state}>
      <ImageManagerPreviewGrid
        disabled={props.disabled}
        slots={{ imagePreview: MyCustomImagePreview }}
        slotProps={{
          imagePreview: {
            coverImage,
            onSetCoverImage: (imageUrl: string) => {
              setCoverImage(imageUrl);
            },
          },
        }}
      />
    </ImageManager>
  );
};

export const CustomImagePreview: Story = {
  args: {
    label: 'Image',
  },
  render: (args) => <CustomImagePreviewStory {...args} />,
};
