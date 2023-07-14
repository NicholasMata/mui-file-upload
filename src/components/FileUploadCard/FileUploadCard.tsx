import { InsertDriveFile } from "@mui/icons-material";
import {
  Card,
  CardHeader,
  Stack,
  Typography,
  LinearProgress,
  Box,
  LinearProgressProps,
} from "@mui/material";
import { ReactNode } from "react";
import { FileUploadUtils, FileUtils } from "../../utils";
import { FileUpload } from "../../types";

export type FileUploadCardProps<FileUploadResponse = string> = {
  /** The icon that will be displayed */
  icon?: ReactNode;
  /** The variant for the card. */
  variant?: "elevation" | "outlined";
  /** The FileUpload that will be used to build the card. */
  fileUpload: FileUpload<FileUploadResponse>;
  actions?: ReactNode;
};

export const FileUploadCard = <FileUploadResponse = string,>({
  icon = <InsertDriveFile />,
  fileUpload,
  variant = "outlined",
  actions,
}: FileUploadCardProps<FileUploadResponse>) => {
  const status = FileUploadUtils.formatStatus(fileUpload);
  return (
    <Card variant={variant}>
      <CardHeader
        avatar={icon}
        title={fileUpload.file.name}
        subheader={
          <Stack>
            <Typography
              variant="caption"
              color={status === "Failed" ? "error" : "text.secondary"}
            >
              {FileUtils.formatFileSize(fileUpload.file.size)} · {status}
            </Typography>
            {!fileUpload.completed ? (
              <LinearProgressWithLabel
                variant="determinate"
                value={fileUpload.progress}
              />
            ) : undefined}
          </Stack>
        }
        action={actions}
      />
    </Card>
  );
};

type LinearProgressWithLabelProps = LinearProgressProps & { value: number };

const LinearProgressWithLabel: React.FC<LinearProgressWithLabelProps> = (
  props
) => (
  <Box sx={{ display: "flex", alignItems: "center" }}>
    <Box sx={{ width: "100%", mr: 1 }}>
      <LinearProgress variant="determinate" {...props} />
    </Box>
    <Box sx={{ minWidth: 35 }}>
      <Typography variant="body2" color="text.secondary">{`${Math.round(
        props.value
      )}%`}</Typography>
    </Box>
  </Box>
);
