All the following props are optional meaning they can be undefined.

#### acceptsOnly <sup>string</sup>

> An accept string indicating the file type / extensions which the component considers valid.<br/>
> This can be a comma separated string of wildcarded mime type or file extensions.
> 
> Default: **undefined**<br/>
> <sub>(This means all file types / extensions are accepted)</sub> 
> 
> <sub>
> **Examples**<br/>
> PDFs Only - `application/pdf` or `.pdf`<br/>
> Any Image - `image/*`
> </sub>

#### disabled <sup>boolean</sup>
> A boolean indicating whether the component is disabled. 
> When the component is disabled it does not allow dragging, dropping or browsing of files.
>
> Default: **false**

#### fileUploadManager <sup>[FileUploadManager\<Response\>](../../types/FileUploadManager)</sup>
> A file upload manager responsible for handling different file upload states.<br/>
> _While you are free to create your own fileUploadManager you can use [useFileUploadManager](../../hooks/useFileUploadManager) to save time._
> 
> Default: **[useFileUploadManager()](../../hooks/useFileUploadManager)**

#### sx <sup>[FileUploadSx](../../types/FileUploadSx)</sup>
> This is very similiar to sx used in MUI library. The only difference is since this component is built from many others applying sx to specific inner components also needs to be possible.
> Review type definition above for more specifics.
>
> Default: **undefined**<br/>

#### body <sup>ReactNode</sup>
> A custom body to render inside the dropzone. It is highly recommended you use the following hook to get FileDropZoneContext [useFileDropzoneContext](../../hooks/useFileDropzoneContext).
>
> Default: [\<FileDropZoneBody /\>](../advanced/FileDropzoneBody)

#### onSuccessfulUpload <sup>(fileUpload: FileUpload\<Response\>) => void</sup>
> Called when a upload was successful. If this is provided then successful file uploads need to be rendered externally.
>
> Default: **undefined**<br/>

#### statusFormatter <sup>(fileUpload: FileUpload\<Response\>) => string</sup>
> Returns a custom status label for a file upload e.g. "Uploading", "Failed" or "Completed".
>
> Default: **undefined**<br/>