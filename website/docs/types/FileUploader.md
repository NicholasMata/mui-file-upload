# FileUploader

#### upload <sup>(fileOrFileUpload: File | File[] | [FileUpload\<Response\>](./FileUpload)) => void</sup>
> A function which can be called to start the uploading of a File or multiple File or a [FileUpload](./FileUpload).
>
> Note: The reason it can take in a [FileUpload](./FileUpload) is so failed uploads can be retried *(aka re-uploaded)*.
