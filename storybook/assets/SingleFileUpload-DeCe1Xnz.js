import{j as r}from"./jsx-runtime-QvZ8i92b.js";import{j as q,e as k,k as w,B as d,l as u,m as R,n as U,f as x}from"./MultiFileUpload-2_RBWqab.js";import{r as S}from"./index-uubelm5h.js";const j=p=>{const{uploadService:m,acceptsOnly:y,onSuccessfulUpload:n,fileManager:g,body:c=r.jsx(x,{}),sx:e,disabled:f}=p,{rejectedFiles:s,addRejected:v,removeRejected:b}=q(),{fileUploads:a,removeFileUpload:F,handlers:o}=g??k(),h=S.useMemo(()=>({onFileUploadStart:o.onFileUploadStart,onFileProgressUpdate:o.onFileProgressUpdate,onFileUploadComplete:t=>{n==null||n(t),o.onFileUploadComplete(t)}}),[o,n]),{upload:i}=w(m,h),l=s.length+a.length>0;return r.jsxs(d,{display:"flex",flexDirection:"column",children:[r.jsx(u,{appear:!1,unmountOnExit:!0,in:!l,timeout:{appear:0,enter:500,exit:200},children:r.jsx(d,{flexGrow:1,children:r.jsx(R,{disabled:f,sx:e==null?void 0:e.sx,allowsMultiple:!1,dragZoneSx:e!=null?e.dragZoneSx:()=>({borderRadius:"5px"}),dropZoneSx:e!=null?e.dropZoneSx:{borderRadius:"5px"},onFilesAccepted:i,onFilesRejected:v,acceptsOnly:y,children:c})})}),r.jsx(u,{in:l,style:{transitionDelay:"200ms"},children:r.jsx(U,{rejected:s,failed:a.failed,inProgress:a.inProgress,successful:n!=null?[]:a.successful,onRetry:i,onDismissRejected:b,onRemoveFileUpload:F})})]})};j.__docgenInfo={description:"",methods:[],displayName:"SingleFileUpload",props:{uploadService:{required:!0,tsType:{name:"signature",type:"function",raw:`(
  file: File,
  onProgress: (progress: number) => void
) => Promise<Response>`,signature:{arguments:[{type:{name:"File"},name:"file"},{type:{name:"signature",type:"function",raw:"(progress: number) => void",signature:{arguments:[{type:{name:"number"},name:"progress"}],return:{name:"void"}}},name:"onProgress"}],return:{name:"Promise",elements:[{name:"Response"}],raw:"Promise<Response>"}}},description:"A service that is responsible for handling file uploads."},onSuccessfulUpload:{required:!1,tsType:{name:"signature",type:"function",raw:"(fileUpload: FileUpload<Response>) => void",signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
  id: string;
  file: File;
  progress: number;
  completed: boolean;
  failed?: boolean;
  responseBody?: Response;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"progress",value:{name:"number",required:!0}},{key:"completed",value:{name:"boolean",required:!0}},{key:"failed",value:{name:"boolean",required:!1}},{key:"responseBody",value:{name:"Response",required:!1}}]}},name:"fileUpload"}],return:{name:"void"}}},description:"Called when a upload was successful. If this is provided then successful file uploads need to be rendered externally."},fileManager:{required:!1,tsType:{name:"signature",type:"object",raw:`{
  fileUploads: {
    inProgress: Array<FileUpload<Response>>;
    successful: Array<FileUpload<Response>>;
    failed: Array<FileUpload<Response>>;
    length: number;
  };
  removeFileUpload: (fileUploadToRemove: FileUpload<Response>) => void;
  handlers: FileUploaderObservers<Response>;
}`,signature:{properties:[{key:"fileUploads",value:{name:"signature",type:"object",raw:`{
  inProgress: Array<FileUpload<Response>>;
  successful: Array<FileUpload<Response>>;
  failed: Array<FileUpload<Response>>;
  length: number;
}`,signature:{properties:[{key:"inProgress",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
  id: string;
  file: File;
  progress: number;
  completed: boolean;
  failed?: boolean;
  responseBody?: Response;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"progress",value:{name:"number",required:!0}},{key:"completed",value:{name:"boolean",required:!0}},{key:"failed",value:{name:"boolean",required:!1}},{key:"responseBody",value:{name:"Response",required:!1}}]}}],raw:"Array<FileUpload<Response>>",required:!0}},{key:"successful",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
  id: string;
  file: File;
  progress: number;
  completed: boolean;
  failed?: boolean;
  responseBody?: Response;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"progress",value:{name:"number",required:!0}},{key:"completed",value:{name:"boolean",required:!0}},{key:"failed",value:{name:"boolean",required:!1}},{key:"responseBody",value:{name:"Response",required:!1}}]}}],raw:"Array<FileUpload<Response>>",required:!0}},{key:"failed",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
  id: string;
  file: File;
  progress: number;
  completed: boolean;
  failed?: boolean;
  responseBody?: Response;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"progress",value:{name:"number",required:!0}},{key:"completed",value:{name:"boolean",required:!0}},{key:"failed",value:{name:"boolean",required:!1}},{key:"responseBody",value:{name:"Response",required:!1}}]}}],raw:"Array<FileUpload<Response>>",required:!0}},{key:"length",value:{name:"number",required:!0}}]},required:!0}},{key:"removeFileUpload",value:{name:"signature",type:"function",raw:"(fileUploadToRemove: FileUpload<Response>) => void",signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
  id: string;
  file: File;
  progress: number;
  completed: boolean;
  failed?: boolean;
  responseBody?: Response;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"progress",value:{name:"number",required:!0}},{key:"completed",value:{name:"boolean",required:!0}},{key:"failed",value:{name:"boolean",required:!1}},{key:"responseBody",value:{name:"Response",required:!1}}]}},name:"fileUploadToRemove"}],return:{name:"void"}},required:!0}},{key:"handlers",value:{name:"signature",type:"object",raw:`{
  onFileUploadStart: (newFileUpload: FileUpload<Response>, isRetry: boolean) => void;
  onFileProgressUpdate: (updatedFileUpload: FileUpload<Response>) => void;
  onFileUploadComplete: (completedFileUpload: FileUpload<Response>) => void;
}`,signature:{properties:[{key:"onFileUploadStart",value:{name:"signature",type:"function",raw:"(newFileUpload: FileUpload<Response>, isRetry: boolean) => void",signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
  id: string;
  file: File;
  progress: number;
  completed: boolean;
  failed?: boolean;
  responseBody?: Response;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"progress",value:{name:"number",required:!0}},{key:"completed",value:{name:"boolean",required:!0}},{key:"failed",value:{name:"boolean",required:!1}},{key:"responseBody",value:{name:"Response",required:!1}}]}},name:"newFileUpload"},{type:{name:"boolean"},name:"isRetry"}],return:{name:"void"}},required:!0}},{key:"onFileProgressUpdate",value:{name:"signature",type:"function",raw:"(updatedFileUpload: FileUpload<Response>) => void",signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
  id: string;
  file: File;
  progress: number;
  completed: boolean;
  failed?: boolean;
  responseBody?: Response;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"progress",value:{name:"number",required:!0}},{key:"completed",value:{name:"boolean",required:!0}},{key:"failed",value:{name:"boolean",required:!1}},{key:"responseBody",value:{name:"Response",required:!1}}]}},name:"updatedFileUpload"}],return:{name:"void"}},required:!0}},{key:"onFileUploadComplete",value:{name:"signature",type:"function",raw:"(completedFileUpload: FileUpload<Response>) => void",signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
  id: string;
  file: File;
  progress: number;
  completed: boolean;
  failed?: boolean;
  responseBody?: Response;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"progress",value:{name:"number",required:!0}},{key:"completed",value:{name:"boolean",required:!0}},{key:"failed",value:{name:"boolean",required:!1}},{key:"responseBody",value:{name:"Response",required:!1}}]}},name:"completedFileUpload"}],return:{name:"void"}},required:!0}}]},required:!0}}]}},description:"A file manager responsible for handling different states."},acceptsOnly:{required:!1,tsType:{name:"string"},description:"A accept string which states which file types are allowed to be uploaded."},body:{required:!1,tsType:{name:"ReactNode"},description:"The FileDropzone body component"},sx:{required:!1,tsType:{name:"signature",type:"object",raw:`{
  /** Allows defining system overrides as well as additional CSS styles for the root container. **/
  sx?: SxProps<Theme>;
  /** Allows defining system overrides as well as additional CSS styles for the drag zone container. **/
  dragZoneSx?: (state: FileDropzoneState) => SxProps<Theme>;
  /** Allows defining system overrides as well as additional CSS styles for the drop zone container. **/
  dropZoneSx?: SxProps<Theme>;
}`,signature:{properties:[{key:"sx",value:{name:"SxProps",elements:[{name:"Theme"}],raw:"SxProps<Theme>",required:!1},description:"Allows defining system overrides as well as additional CSS styles for the root container. *"},{key:"dragZoneSx",value:{name:"signature",type:"function",raw:"(state: FileDropzoneState) => SxProps<Theme>",signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
  /** Whether the FileDropzone is disabled or not. */
  disabled: boolean;
  /** A value which is defined when a file is dragged over the FileDropzone and undefined otherwise. */
  dragActive?: FileDropzoneDragActive;
  /** A boolean indicating if too many files are dragged over the FileDropzone. */
  hasTooManyFiles: boolean;
}`,signature:{properties:[{key:"disabled",value:{name:"boolean",required:!0},description:"Whether the FileDropzone is disabled or not."},{key:"dragActive",value:{name:"signature",type:"object",raw:`{
  /** A boolean indicating if the files currently being dragged over the FileDropzone would be rejected. */
  hasRejectedFiles: boolean;
}`,signature:{properties:[{key:"hasRejectedFiles",value:{name:"boolean",required:!0},description:"A boolean indicating if the files currently being dragged over the FileDropzone would be rejected."}]},required:!1},description:"A value which is defined when a file is dragged over the FileDropzone and undefined otherwise."},{key:"hasTooManyFiles",value:{name:"boolean",required:!0},description:"A boolean indicating if too many files are dragged over the FileDropzone."}]}},name:"state"}],return:{name:"SxProps",elements:[{name:"Theme"}],raw:"SxProps<Theme>"}},required:!1},description:"Allows defining system overrides as well as additional CSS styles for the drag zone container. *"},{key:"dropZoneSx",value:{name:"SxProps",elements:[{name:"Theme"}],raw:"SxProps<Theme>",required:!1},description:"Allows defining system overrides as well as additional CSS styles for the drop zone container. *"}]}},description:"sx that will applied to the FileDropzone"},disabled:{required:!1,tsType:{name:"boolean"},description:"Whether the component is disabled, aka can't be interacted with."},helperText:{required:!1,tsType:{name:"ReactNode"},description:"Helper text for this component\n\nIf `error` is true then this should be an error message as it will be colored using `error` color in theme palette."},error:{required:!1,tsType:{name:"boolean"},description:"Whether the component contains an error, this is just for styling.\nAlong with `helperText` this will allow for custom validation."}}};export{j as S};
