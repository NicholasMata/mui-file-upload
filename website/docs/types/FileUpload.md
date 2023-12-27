# FileUpload

```ts
interface FileUpload<Response = string> {
  id: string;
  file: File;
  progress: number;
  completed: boolean;
  failed?: boolean;
  responseBody?: Response;
}
```

#### id <sup>string</sup>
> The file upload unique identifier.

#### file <sup>File</sup>
> The file which this upload represents.

#### progress <sup>number</sup>
> A number from 0 to 100 representing the percentage of the file which has been uploaded.

#### completed <sup>boolean</sup>
> A boolean indicating whether the file upload is complete. 
>
> Note: A file upload is completed if it was either successfully uploaded or failed to upload.

#### failed <sup>boolean | undefined</sup>
> A boolean indicating if the file upload failed. 
>
> Note: If the file upload is not complete then this is `undefined`.

#### responseBody <sup>Response</sup>
> The result of the completed file upload. By default this generic is a `string`
>
> Note if the file upload was not successful then this is `undefined`.
