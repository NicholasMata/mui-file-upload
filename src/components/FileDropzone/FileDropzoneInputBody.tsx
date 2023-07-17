import { Link, Typography } from "@mui/material";
import { ReactNode, useMemo } from "react";
import { useFileDropzoneContext } from "./hooks";
import {
  DEFAULT_FILE_DRAG_REJECTED_TITLE,
  DEFAULT_FILE_OVERLOAD_TITLE,
  getDefaultBodyTitle,
  getDefaultDropBodyTitle,
} from "./contants";
import { FileDropzoneStatus } from "./types";
import { FileDropzoneStatusUtils } from "../../utils";

export type FileDropzoneInputBodyProps = {
  /** The title of the input. Will be prefixed with "Click to upload " */
  title?: ReactNode;
  /**
   * The title of the input that will be displayed when something can be dropped on it.
   * Will be prefixed with "Click to upload "
   * */
  dropTitle?: ReactNode;
  /** The title when the there are not many files in the dropzone. */
  fileOverloadTitle?: ReactNode;
  /** The title when invalid file types are being dragged over the zone. */
  dragRejectedTitle?: ReactNode;
};

export const FileDropzoneInputBody = (props: FileDropzoneInputBodyProps) => {
  const { dropzoneState, openFileSelector, allowsMultiple } =
    useFileDropzoneContext();
  const {
    title = `or ${getDefaultBodyTitle(allowsMultiple).toLowerCase()}`,
    dropTitle = `or ${getDefaultDropBodyTitle(allowsMultiple).toLowerCase()}`,
    fileOverloadTitle = DEFAULT_FILE_OVERLOAD_TITLE,
    dragRejectedTitle = DEFAULT_FILE_DRAG_REJECTED_TITLE,
  } = props;

  const { status, isError } = useMemo(
    () => FileDropzoneStatusUtils.getInfo(dropzoneState),
    [dropzoneState]
  );

  return (
    <Typography
      paddingX={2}
      paddingY={1}
      color={isError ? "error" : "inherit"}
      minWidth={"400px"}
    >
      {status == FileDropzoneStatus.overloaded && fileOverloadTitle}
      {status == FileDropzoneStatus.dragRejected && dragRejectedTitle}
      {!isError && (
        <>
          <Link onClick={openFileSelector}>Click to upload</Link>{" "}
          {status == FileDropzoneStatus.dragActive ? dropTitle : title}
        </>
      )}
    </Typography>
  );
};
