export const getDefaultBodyTitle = (allowsMultiple: boolean) =>
  `Drag the file${allowsMultiple ? "s" : ""} here to start uploading`;

export const getDefaultDropBodyTitle = (allowsMultiple: boolean) =>
  `Drop the file${allowsMultiple ? "s" : ""} to start uploading`;

export const DEFAULT_FILE_OVERLOAD_TITLE = "Too many files have been dragged";

export const DEFAULT_FILE_DRAG_REJECTED_TITLE =
  "Dragged files have invalid file type";

export const DEFAULT_FILE_REJECT_SUFFIX = "is not a valid file type";
