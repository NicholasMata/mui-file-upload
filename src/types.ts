export type FileUpload<Response = string> = {
  id: string;
  file: File;
  progress: number;
  completed: boolean;
  failed?: boolean;
  responseBody?: Response;
};
