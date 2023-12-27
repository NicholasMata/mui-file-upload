# FileDropzoneState

The state used by [FileDropzone](../components/advanced/FileDropzone) which is available through
[useFileDropzoneContext](../hooks/useFileDropzoneContext).

#### disabled <sup>boolean</sup>
> Whether the FileDropzone is disabled or not.

#### dragActive <sup>FileDropzoneDragActive | undefined</sup>
> A value which is defined when a file is dragged over the FileDropzone and undefined otherwise.
>
> `FileDropzoneDragActive` currently only contains a single property. `hasRejectedFiles` which is a boolean indicating
> if the files currently being dragged over the FileDropzone would be rejected. Not this does not supported by all browser.

#### hasTooManyFiles <sup>boolean</sup>
> A boolean indicating if too many files are dragged over the FileDropzone. 
