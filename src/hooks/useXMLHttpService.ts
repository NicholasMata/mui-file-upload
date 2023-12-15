import { useCallback } from 'react';
import { type FileUploadService } from './useFileUploader';

export const useXMLHttpService = <Response = string>(
  endpoint: string,
  method: string | undefined = 'POST',
  modifyRequest?: (xhr: XMLHttpRequest) => Promise<void> | void,
  responseTransformer?: (responseText: string) => Response
): FileUploadService<Response> => {
  return useCallback<FileUploadService<Response>>(
    async (file, onProgress) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, endpoint, true);
      await modifyRequest?.(xhr);
      return await new Promise<Response>((resolve, reject) => {
        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const progress = Math.round((event.loaded / event.total) * 100);
            onProgress(progress);
          }
        };

        xhr.onload = () => {
          if (xhr.status === 200) {
            const responseText = xhr.responseText;
            resolve(responseTransformer != null ? responseTransformer(responseText) : (xhr.responseText as Response));
          } else {
            reject(new Error(`${method}: ${endpoint} responded with bad status code ${xhr.status}`));
          }
        };

        xhr.onerror = (e) => {
          reject(e);
        };

        const formData = new FormData();
        formData.append('file', file);

        xhr.send(formData);
      });
    },
    [endpoint]
  );
};
