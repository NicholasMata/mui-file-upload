import{f as w,g as f,h as q,i as y,B as h,j as a,k as D,l as N,m as K,n as z,u as F,S as W,o as R,e as X,p as Y,T as J,q as u,r as Q,L as $,a as d,b as U,D as ee,d as T,c as ae}from"./MultiFileUpload-830552c5.js";import{r as j}from"./index-f1286426.js";import"./_commonjsHelpers-de833af9.js";import"./assertThisInitialized-25388baf.js";const i=e=>{const{uploadService:o,acceptsOnly:s,onSuccessfulUpload:l,fileManager:n,body:t=a(z,{}),sx:r,disabled:H}=e,{rejectedFiles:S,addRejected:I,removeRejected:V}=w(),{fileUploads:c,removeFileUpload:G,handlers:p}=n??f(),Z=j.useMemo(()=>({onFileUploadStart:p.onFileUploadStart,onFileProgressUpdate:p.onFileProgressUpdate,onFileUploadComplete:A=>{l==null||l(A),p.onFileUploadComplete(A)}}),[p,l]),{upload:C}=q(o,Z),x=S.length+c.length>0;return y(h,{display:"flex",flexDirection:"column",children:[a(D,{appear:!1,unmountOnExit:!0,in:!x,timeout:{appear:0,enter:500,exit:200},children:a(h,{flexGrow:1,children:a(N,{disabled:H,sx:r==null?void 0:r.sx,allowsMultiple:!1,dragZoneSx:r!=null?r.dragZoneSx:()=>({borderRadius:"5px"}),dropZoneSx:r!=null?r.dropZoneSx:{borderRadius:"5px"},onFilesAccepted:C,onFilesRejected:I,acceptsOnly:s,children:t})})}),a(D,{in:x,style:{transitionDelay:"200ms"},children:a(K,{rejected:S,failed:c.failed,inProgress:c.inProgress,successful:l!=null?[]:c.successful,onRetry:C,onDismissRejected:V,onRemoveFileUpload:G})})]})};try{i.displayName="SingleFileUpload",i.__docgenInfo={description:"",displayName:"SingleFileUpload",props:{uploadService:{defaultValue:null,description:"A service that is responsible for handling file uploads.",name:"uploadService",required:!0,type:{name:"FileUploadService<Response>"}},onSuccessfulUpload:{defaultValue:null,description:"Called when a upload was successful. If this is provided then successful file uploads need to be rendered externally.",name:"onSuccessfulUpload",required:!1,type:{name:"((fileUpload: FileUpload<Response>) => void)"}},fileManager:{defaultValue:null,description:"A file manager responsible for handling different states.",name:"fileManager",required:!1,type:{name:"FileUploadManager<Response>"}},acceptsOnly:{defaultValue:null,description:"A accept string which states which file types are allowed to be uploaded.",name:"acceptsOnly",required:!1,type:{name:"string"}},body:{defaultValue:null,description:"The FileDropzone body component",name:"body",required:!1,type:{name:"ReactNode"}},sx:{defaultValue:null,description:"sx that will applied to the FileDropzone",name:"sx",required:!1,type:{name:"FileUploadSx"}},disabled:{defaultValue:null,description:"Whether the FileDropzone is disabled or not. Default: false",name:"disabled",required:!1,type:{name:"boolean"}}}}}catch{}const ne={component:i,title:"SingleFileUpload",tags:["autodocs"],args:{failureRate:.1},argTypes:{uploadService:{table:{disable:!0}},onSuccessfulUpload:{table:{disable:!0}},fileManager:{table:{disable:!0}},body:{table:{disable:!0}},sx:{table:{disable:!0}}}},m={render:e=>{const o=F({failureRate:e.failureRate}),s=f();return a(W,{alignItems:"start",children:a(i,{disabled:e.disabled,acceptsOnly:e.acceptsOnly,uploadService:o,fileManager:s})})}},g={args:{title:"Custom Title Text",dropTitle:"Custom Drop Text",disabledTitle:"Custom Disabled Text"},render:e=>{const o=F({failureRate:e.failureRate}),s=f();return a(i,{disabled:e.disabled,sx:{dragZoneSx:()=>({borderStyle:"solid",borderWidth:1,borderRadius:0})},body:a(z,{title:"Custom text here",dropTitle:"Custom drop text here",disabledTitle:"Custom disabled text here"}),acceptsOnly:e.acceptsOnly,uploadService:o,fileManager:s})}},le=()=>{const{dropzoneState:e,openFileSelector:o}=X(),{disabled:s}=e,{status:l,isError:n}=j.useMemo(()=>Y.getInfo(e),[e]);return y(J,{paddingX:2,paddingY:1,color:n?"error":"inherit",minWidth:"400px",children:[l===u.overloaded&&"Custom Overloaded Body",l===u.dragRejected&&"Custom Drag Rejected",l===u.disabled&&"Custom Disabled",!n&&!s&&y(Q,{children:[a($,{onClick:o,children:"Custom Open File Browser"})," ",l===u.dragActive?"Custom Drop Text":"Custom Text Here"]})]})},b={render:e=>{const o=F({failureRate:e.failureRate}),s=f(),l=t=>({default:d(t.palette.secondary.main,U),disabled:d(t.palette.text.disabled,U),dragActive:d(t.palette.secondary.main,ee)}),n=t=>({default:d(t.palette.secondary.main,T),disabled:d(t.palette.text.disabled,T),dragActive:d(t.palette.secondary.main,ae)});return a(i,{disabled:e.disabled,body:a(le,{}),acceptsOnly:e.acceptsOnly,uploadService:o,fileManager:s,sx:{dragZoneSx:t=>r=>({backgroundColor:R.selectColor(t,l(r)),borderColor:R.selectColor(t,n(r))})}})}};var v,_,O;m.parameters={...m.parameters,docs:{...(v=m.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render: args => {
    const uploadService = useFakeService({
      failureRate: args.failureRate
    });
    const fileManager = useFileUploadManager<void>();
    return <Stack alignItems='start'>
        <SingleFileUpload disabled={args.disabled} acceptsOnly={args.acceptsOnly} uploadService={uploadService} fileManager={fileManager} />
      </Stack>;
  }
}`,...(O=(_=m.parameters)==null?void 0:_.docs)==null?void 0:O.source}}};var M,E,L;g.parameters={...g.parameters,docs:{...(M=g.parameters)==null?void 0:M.docs,source:{originalSource:`{
  args: {
    title: 'Custom Title Text',
    dropTitle: 'Custom Drop Text',
    disabledTitle: 'Custom Disabled Text'
  },
  render: args => {
    const uploadService = useFakeService({
      failureRate: args.failureRate
    });
    const fileManager = useFileUploadManager<void>();
    return <SingleFileUpload disabled={args.disabled} sx={{
      dragZoneSx: () => ({
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 0
      })
    }} body={<FileDropzoneInputBody title='Custom text here' dropTitle='Custom drop text here' disabledTitle='Custom disabled text here' />} acceptsOnly={args.acceptsOnly} uploadService={uploadService} fileManager={fileManager} />;
  }
}`,...(L=(E=g.parameters)==null?void 0:E.docs)==null?void 0:L.source}}};var B,k,P;b.parameters={...b.parameters,docs:{...(B=b.parameters)==null?void 0:B.docs,source:{originalSource:`{
  render: args => {
    const uploadService = useFakeService({
      failureRate: args.failureRate
    });
    const fileManager = useFileUploadManager<void>();
    const backgroundColor = (t: Theme): StatusColorOptions => ({
      default: alpha(t.palette.secondary.main, DEFAULT_BACKGROUND_ALPHA),
      disabled: alpha(t.palette.text.disabled, DEFAULT_BACKGROUND_ALPHA),
      dragActive: alpha(t.palette.secondary.main, DEFAULT_DRAG_ACTIVE_BACKGROUND_ALPHA)
    });
    const borderColor = (t: Theme): StatusColorOptions => ({
      default: alpha(t.palette.secondary.main, DEFAULT_BORDER_ALPHA),
      disabled: alpha(t.palette.text.disabled, DEFAULT_BORDER_ALPHA),
      dragActive: alpha(t.palette.secondary.main, DEFAULT_DRAG_ACTIVE_BORDER_ALPHA)
    });
    return <SingleFileUpload disabled={args.disabled} body={<CustomZoneBody />} acceptsOnly={args.acceptsOnly} uploadService={uploadService} fileManager={fileManager} sx={{
      dragZoneSx: state => t => ({
        backgroundColor: FileDropzoneUtils.selectColor(state, backgroundColor(t)),
        borderColor: FileDropzoneUtils.selectColor(state, borderColor(t))
      })
    }} />;
  }
}`,...(P=(k=b.parameters)==null?void 0:k.docs)==null?void 0:P.source}}};const de=["Default","CustomTitle","CustomBody"];export{b as CustomBody,g as CustomTitle,m as Default,de as __namedExportsOrder,ne as default};
//# sourceMappingURL=SingleFileUpload.stories-80891889.js.map
