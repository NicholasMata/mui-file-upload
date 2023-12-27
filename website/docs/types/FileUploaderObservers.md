# FileUploaderObservers

A set of functions that are used to bridge the gap between 
[FileUploadManager](../types/FileUploadManager) and [FileUploadService](../types/FileUploadService).

[FileUploadManager](../types/FileUploadManager) uses these observers to file uploads sent by [FileUploadService](../types/FileUploadService).


```ts
interface FileUploaderObservers<Response = string> {
  onFileUploadStart: (newFileUpload: FileUpload<Response>, isRetry: boolean) => void;
  onFileProgressUpdate: (updatedFileUpload: FileUpload<Response>) => void;
  onFileUploadComplete: (completedFileUpload: FileUpload<Response>) => void;
}
```


#### onFileUploadStart <sup>(newFileUpload: [FileUpload\<Response\>](./FileUpload), isRetry: boolean) => void</sup>

> Called to indicate that the file upload has started, and whether or not it is a retry.

#### onFileProgressUpdate <sup>(updatedFileUpload: [FileUpload\<Response\>](./FileUpload)) => void</sup>

> Called to indicate that the file upload progress has changed.

#### onFileUploadComplete <sup>(completedFileUpload: [FileUpload\<Response\>](./FileUpload)) => void</sup>

> Called to indicate that the file upload is complete. This means it was either successful or a failure.
