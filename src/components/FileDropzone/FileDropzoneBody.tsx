import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import {
  AssignmentLate,
  TaskTwoTone,
  UploadFileTwoTone,
} from "@mui/icons-material";
import { AcceptUtils, FileDropzoneStatusUtils } from "../../utils";
import { useFileDropzoneContext } from "./hooks";
import { ReactNode, useMemo } from "react";
import {
  DEFAULT_FILE_DRAG_REJECTED_TITLE,
  DEFAULT_FILE_OVERLOAD_TITLE,
  getDefaultBodyTitle,
  getDefaultDropBodyTitle,
} from "./contants";
import { FileDropzoneStatus } from "./types";

export type FileDropzoneBodyProps = {
  /** The title of the zone. */
  title?: ReactNode;
  /**
   * The title of the zone that will be displayed when something can be dropped on it.
   * */
  dropTitle?: ReactNode;
  /** The title when the there are not many files in the dropzone. */
  fileOverloadTitle?: ReactNode;
  /** The title when invalid file types are being dragged over the zone. */
  dragRejectedTitle?: ReactNode;
};

export const FileDropzoneBody = (props: FileDropzoneBodyProps) => {
  const { dropzoneState, openFileSelector, accept, allowsMultiple } =
    useFileDropzoneContext();

  const {
    title: normalTitle = getDefaultBodyTitle(allowsMultiple),
    dropTitle = getDefaultDropBodyTitle(allowsMultiple),
    fileOverloadTitle = DEFAULT_FILE_OVERLOAD_TITLE,
    dragRejectedTitle = DEFAULT_FILE_DRAG_REJECTED_TITLE,
  } = props;

  const { status } = FileDropzoneStatusUtils.getInfo(dropzoneState);

  const acceptsFile = useMemo(
    () => accept?.toString().toLocaleUpperCase(),
    [accept]
  );
  const { title, icon, titleColor } = useMemo(() => {
    switch (status) {
      case FileDropzoneStatus.normal:
        return {
          title: normalTitle,
          icon: <UploadFileTwoTone fontSize="inherit" color="primary" />,
          titleColor: "text.primary",
        };
      case FileDropzoneStatus.dragActive:
        return {
          title: dropTitle,
          icon: <TaskTwoTone fontSize="inherit" color="primary" />,
          titleColor: "primary",
        };
      case FileDropzoneStatus.overloaded:
        return {
          title: fileOverloadTitle,
          icon: <AssignmentLate fontSize="inherit" color="error" />,
          titleColor: "error",
        };
      case FileDropzoneStatus.dragRejected:
        return {
          title: dragRejectedTitle,
          icon: <AssignmentLate fontSize="inherit" color="error" />,
          titleColor: "error",
        };
    }
  }, [status]);
  return (
    <Stack spacing={2} padding={5} alignItems="center">
      <Stack>
        <Typography variant="h3">{icon}</Typography>
        <Typography color={titleColor}>{title}</Typography>
        {acceptsFile && (
          <Box>
            <Typography
              variant="caption"
              color="text.secondary"
              display="inline-block"
            >
              Supports:
            </Typography>
            <Typography
              variant="caption"
              fontWeight={700}
              color="text.secondary"
              display="inline-block"
              sx={{ mx: 0.5 }}
            >
              {acceptsFile}
            </Typography>
          </Box>
        )}
      </Stack>
      <Divider
        sx={{
          width: "80%",
          [`&::before, &::after`]: {
            border: "0.1px solid gray",
          },
        }}
      >
        <Typography color="text.primary">OR</Typography>
      </Divider>
      <Button
        variant="outlined"
        onClick={openFileSelector}
        className="upload-button"
      >
        Browse files
      </Button>
    </Stack>
  );
};

export default FileDropzoneBody;
