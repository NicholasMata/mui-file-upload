import { DarkOverlay, DeleteButton, FullscreenImageDialogButton, ImagePreview } from '../ImagePreview';
import { DraggableContainer } from './DraggableContainer';

export type DefaultDraggableImagePreviewProps = {
  index: number;
  imageUrl: string;
  fullSizeImageUrl?: string;
  disabled?: boolean;
  onDelete: () => void;
};

export const DefaultDraggableImagePreview = (props: DefaultDraggableImagePreviewProps): JSX.Element => {
  const { imageUrl, fullSizeImageUrl, disabled, onDelete } = props;
  return (
    <DraggableContainer id={imageUrl}>
      <ImagePreview imageUrl={imageUrl} disabled={disabled}>
        <DeleteButton sx={{ position: 'absolute', top: -20, right: -20 }} onClick={onDelete} disabled={disabled} />
        <DarkOverlay snapTo='bottomRight' openCornerRadius='8px' curveOppositeCorner>
          <FullscreenImageDialogButton imageUrl={fullSizeImageUrl ?? imageUrl} />
        </DarkOverlay>
      </ImagePreview>
    </DraggableContainer>
  );
};
