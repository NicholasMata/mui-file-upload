import { useCallback } from "react";
import { FileUploadService } from "./useFileUploader";

export const useXMLHttpService = <Response = string>(
  endpoint: string,
  responseTransformer?: (responseText: string) => Response
): FileUploadService<Response> => {
  return useCallback<FileUploadService<Response>>(
    (file, onProgress) => {
      return new Promise<Response>((resolve, reject) => {
        const formData = new FormData();
        formData.append("file", file);

        const xhr = new XMLHttpRequest();
        xhr.open("POST", endpoint, true);

        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const progress = Math.round((event.loaded / event.total) * 100);
            onProgress(progress);
          }
        };

        xhr.onload = () => {
          if (xhr.status === 200) {
            const responseText = xhr.responseText;
            resolve(
              responseTransformer
                ? responseTransformer(responseText)
                : (xhr.responseText as Response)
            );
          } else {
            reject();
          }
        };

        xhr.onerror = () => {
          reject();
        };

        xhr.send(formData);
      });
    },
    [endpoint]
  );
};
