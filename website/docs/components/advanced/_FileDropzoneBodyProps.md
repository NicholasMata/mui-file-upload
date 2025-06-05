#### title <sup>ReactNode</sup>

> The default title of the zone
>
> Default: **"Drag the file here to start uploading" | "Drag the files here to start uploading"** <br/>
> <sub>The pluralization is based on if used FileDropzone allowsMultiple is set to true.</sub>

#### openFileSelectorTitle <sup>ReactNode</sup>

> The title of the button that will open the file selector dialog
>
> Default: **"Click to upload" | "Browse files"**

#### dropTitle <sup>ReactNode</sup>

> The title of the zone that will be displayed when something can be dropped on it
>
> Default: **"Drop the file to start uploading" | "Drop the files to start uploading"** <br/>
> <sub>The pluralization is based on if used FileDropzone allowsMultiple is set to true.</sub>

#### disabledTitle <sup>ReactNode | ((dragActive: boolean) => ReactNode)</sup>

> The title when the dropzone is disabled
>
> Default: **"File uploading is currently disabled"**

#### dragRejectedTitle <sup>ReactNode</sup>

> The title when invalid file types are being dragged over the zone
>
> Default: **"Dragged files have invalid file type"**

#### fileOverloadTitle <sup>ReactNode</sup>

> The title when the there are not many files in the dropzone
>
> Default: **"Too many files have been dragged"**

