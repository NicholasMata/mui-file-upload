import { type ReactNode } from 'react';
import { type FileUploadService } from '../../hooks';
import { type FileUploadSx } from '../FileUpload/types';

export type ImageUploadManagerProps = {
  /**
   * A service that is responsible for handling file uploads.
   *
   * This is expected to return a string which is the image url of the newly uploaded image.
   **/
  uploadService: FileUploadService<string>;
  /** The image URLs of the images that can already been uploaded. */
  value: string[];
  /** Called when the image URLs are changed this can occur when a image is uploaded (added), moved, or removed. */
  onChange: (imageUrls: string[]) => void;

  /**
   * A accept string which states which file types are allowed to be uploaded.
   **/
  acceptsOnly?: string;
  /** The FileDropzone body component */
  body?: ReactNode;
  /** sx that will applied to the FileDropzone */
  sx?: FileUploadSx;

  label: ReactNode;

  /**
   * Whether image manager is required.
   *
   * This only adds a * to the label, it does not do any validation.
   * Which is inline with other MUI components.
   *
   * @default false
   */
  required?: boolean;

  /**
   * Whether the image manager contains an error.
   *
   * This only adds a highlighting around the
   * dropzone which is the `error` color.
   * Which is inline with other MUI components.
   *
   * @default false
   **/
  error?: boolean;

  /**
   * Whether the image manager is disabled or not.
   *
   * @default false
   **/
  disabled?: boolean;
};

/**
 * A very opinionated image upload manager.
 *
 * If you need something more configurable it is recommended to build a similar component to this using FileDropzone components.
 */
export const ImageUploadManager = (props: ImageUploadManagerProps): JSX.Element => {
  return <></>;
};
