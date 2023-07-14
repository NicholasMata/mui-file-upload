import { useCallback } from "react";
import { FileUploadService } from "./useFileUploader";

export const useXMLHttpService = <Response = string>(
  endpoint: string,
  method: string | undefined = "POST",
  modifyRequest?: (xhr: XMLHttpRequest) => Promise<void> | void,
  responseTransformer?: (responseText: string) => Response
): FileUploadService<Response> => {
  return useCallback<FileUploadService<Response>>(
    (file, onProgress) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, endpoint, true);
      return new Promise<Response>(async (resolve, reject) => {
        await modifyRequest?.(xhr);

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

        const formData = new FormData();
        formData.append("file", file);

        xhr.send(formData);
      });
    },
    [endpoint]
  );
};
