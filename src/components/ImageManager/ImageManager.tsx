import { type Ref, forwardRef, useCallback, useMemo, type PropsWithChildren } from 'react';
import { type FileUploadService } from '../../hooks';
import { type BaseMUIFieldProps } from '../types';
import { type FileUpload } from '../../types';
import { Box, InputLabel, Stack } from '@mui/material';
import { type FileUploadSx, MultiFileUpload } from '../FileUpload';
import { ImageManagerPreviewGrid } from './ImageManagerPreviewGrid';
import { ImageManagerContextInner } from './ImageManagerContext';

export type ImageManagerProps = {
  /** The image URLs of the images that can already been uploaded. */
  value: string[];

  /**
   * Called when the image URLs are changed this can occur when a image is uploaded (added), moved, or removed.
   * I would like to have this but I think it better to have individual callbacks and hook which merges them.
   **/
  // onChange?: (imageUrls: string[]) => void;

  /** Called when image was successfully uploaded. */
  onAdd: (imageUrl: string) => void;
  /** Called when an image needs to be moved from one position to another. */
  onMove: (from: number, to: number) => void;
  /** Called when an image needs to be delete. */
  onDelete: (index: number) => void;
} & SharedImageManagerProps;

export type SharedImageManagerProps = {
  /**
   * A service that is responsible for handling file uploads.
   *
   * This is expected to return a string which is the image url of the newly uploaded image.
   **/
  uploadService: FileUploadService<string>;

  /**
   * An accept string which states which file types are allowed to be uploaded.
   *
   * Even though this is an image uploader this string allows for none image mime types.
   *
   * @default
   * 'image/png,image/jpeg'
   **/
  acceptsOnly?: string;
} & BaseMUIFieldProps;

/**
 * A very opinionated image manager.
 *
 * If you need something more configurable it is recommended to build a similar component to this using FileDropzone & FileUpload components.
 */
export const ImageManager = forwardRef(function ImageManager(
  props: PropsWithChildren<ImageManagerProps>,
  ref?: Ref<HTMLDivElement>
): JSX.Element {
  const {
    uploadService,
    value,
    onAdd,
    onDelete,
    onMove,
    acceptsOnly = 'image/png,image/jpeg',
    error = false,
    label,
    required = false,
    disabled = false,
    helperText,
    children,
  } = props;

  const handleSuccessfulUpload = useCallback(
    (fileUpload: FileUpload<string>): void => {
      const tempUrl = fileUpload.responseBody;
      if (tempUrl === undefined) return;
      onAdd(tempUrl);
    },
    [onAdd]
  );

  const sx = useMemo<FileUploadSx>(
    () => ({ dragZoneSx: () => (t) => ({ borderColor: error ? t.palette.error.main : undefined }) }),
    [error]
  );

  const labelComp = useMemo(
    () =>
      label !== null &&
      label !== undefined && (
        <InputLabel error={error} required={required} disabled={disabled}>
          {label}
        </InputLabel>
      ),
    [label, required, error, disabled]
  );

  const body = useMemo(() => children ?? <ImageManagerPreviewGrid disabled={disabled} />, [children]);

  const imageManagerContext = useMemo(
    () => ({
      imageUrls: value,
      delete: onDelete,
      move: onMove,
    }),
    [value, onMove, onDelete]
  );

  return (
    <Stack spacing={1}>
      {labelComp}
      <Stack spacing={1} tabIndex={0} ref={ref}>
        <MultiFileUpload
          disabled={disabled}
          sx={sx}
          acceptsOnly={acceptsOnly}
          uploadService={uploadService}
          onSuccessfulUpload={handleSuccessfulUpload}
          error={error}
          helperText={helperText}
        />
        {value.length > 0 && (
          <ImageManagerContextInner.Provider value={imageManagerContext}>
            <Box>{body}</Box>
          </ImageManagerContextInner.Provider>
        )}
      </Stack>
    </Stack>
  );
});
