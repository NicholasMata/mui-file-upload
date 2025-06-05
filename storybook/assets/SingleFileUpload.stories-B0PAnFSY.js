import{j as t}from"./jsx-runtime-QvZ8i92b.js";import{r as U}from"./index-uubelm5h.js";import{u as b,e as m,S as v,f as E,g as S,d as L,h as B,T as h,i as n,L as M,a as T,D as k,c as A,b as j}from"./MultiFileUpload-DJ2PQicy.js";import{S as u}from"./SingleFileUpload-D7zkTU8o.js";import{a as s}from"./DefaultPropsProvider-GBtPWx79.js";import"./assertThisInitialized-C1_Uj0Qz.js";import"./index-CfOt2XX2.js";const V={component:u,title:"SingleFileUpload",tags:["autodocs"],args:{failureRate:.1},argTypes:{uploadService:{table:{disable:!0}},onSuccessfulUpload:{table:{disable:!0}},fileManager:{table:{disable:!0}},body:{table:{disable:!0}},sx:{table:{disable:!0}}}},d={render:e=>{const r=b({failureRate:e.failureRate}),o=m();return t.jsx(v,{alignItems:"start",children:t.jsx(u,{disabled:e.disabled,acceptsOnly:e.acceptsOnly,uploadService:r,fileManager:o})})}},c={args:{title:"Custom Title Text",dropTitle:"Custom Drop Text",disabledTitle:"Custom Disabled Text",openFileSelectorTitle:"Custom Open File Browser"},render:e=>{const r=b({failureRate:e.failureRate}),o=m();return t.jsx(u,{disabled:e.disabled,sx:{dragZoneSx:()=>({borderStyle:"solid",borderWidth:1,borderRadius:0})},body:t.jsx(E,{title:e.title,dropTitle:e.dropTitle,disabledTitle:e.disabledTitle,openFileSelectorTitle:e.openFileSelectorTitle}),acceptsOnly:e.acceptsOnly,uploadService:r,fileManager:o})}},H=()=>{const{dropzoneState:e,openFileSelector:r}=L(),{disabled:o}=e,{status:l,isError:i}=U.useMemo(()=>B.getInfo(e),[e]);return t.jsxs(h,{paddingX:2,paddingY:1,color:i?"error":"inherit",minWidth:"400px",children:[l===n.overloaded&&"Custom Overloaded Body",l===n.dragRejected&&"Custom Drag Rejected",l===n.disabled&&"Custom Disabled",!i&&!o&&t.jsxs(t.Fragment,{children:[t.jsx(M,{onClick:r,children:"Custom Open File Browser"})," ",l===n.dragActive?"Custom Drop Text":"Custom Text Here"]})]})},p={render:e=>{const r=b({failureRate:e.failureRate}),o=m(),l=a=>({default:s(a.palette.secondary.main,T),disabled:s(a.palette.text.disabled,T),dragActive:s(a.palette.secondary.main,k)}),i=a=>({default:s(a.palette.secondary.main,A),disabled:s(a.palette.text.disabled,A),dragActive:s(a.palette.secondary.main,j)});return t.jsx(u,{disabled:e.disabled,body:t.jsx(H,{}),acceptsOnly:e.acceptsOnly,uploadService:r,fileManager:o,sx:{dragZoneSx:a=>g=>({backgroundColor:S.selectColor(a,l(g)),borderColor:S.selectColor(a,i(g))})}})}};var C,D,F;d.parameters={...d.parameters,docs:{...(C=d.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: args => {
    const uploadService = useFakeService({
      failureRate: args.failureRate
    });
    const fileManager = useFileUploadManager<void>();
    return <Stack alignItems='start'>
        <SingleFileUpload disabled={args.disabled} acceptsOnly={args.acceptsOnly} uploadService={uploadService} fileManager={fileManager} />
      </Stack>;
  }
}`,...(F=(D=d.parameters)==null?void 0:D.docs)==null?void 0:F.source}}};var f,x,y;c.parameters={...c.parameters,docs:{...(f=c.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    title: 'Custom Title Text',
    dropTitle: 'Custom Drop Text',
    disabledTitle: 'Custom Disabled Text',
    openFileSelectorTitle: 'Custom Open File Browser'
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
    }} body={<FileDropzoneInputBody title={args.title} dropTitle={args.dropTitle} disabledTitle={args.disabledTitle} openFileSelectorTitle={args.openFileSelectorTitle} />} acceptsOnly={args.acceptsOnly} uploadService={uploadService} fileManager={fileManager} />;
  }
}`,...(y=(x=c.parameters)==null?void 0:x.docs)==null?void 0:y.source}}};var R,_,O;p.parameters={...p.parameters,docs:{...(R=p.parameters)==null?void 0:R.docs,source:{originalSource:`{
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
}`,...(O=(_=p.parameters)==null?void 0:_.docs)==null?void 0:O.source}}};const w=["Default","CustomTitle","CustomBody"];export{p as CustomBody,c as CustomTitle,d as Default,w as __namedExportsOrder,V as default};
