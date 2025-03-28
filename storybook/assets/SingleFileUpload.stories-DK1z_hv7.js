import{j as t}from"./jsx-runtime-QvZ8i92b.js";import{r as v}from"./index-uubelm5h.js";import{u as m,e as b,S as O,f as h,g as C,d as E,h as L,T as B,i as d,L as M,a as A,D as k,c as x,b as j}from"./MultiFileUpload-2_RBWqab.js";import{S as u}from"./SingleFileUpload-DeCe1Xnz.js";import{a as l}from"./DefaultPropsProvider-GBtPWx79.js";import"./assertThisInitialized-C1_Uj0Qz.js";import"./index-CfOt2XX2.js";const V={component:u,title:"SingleFileUpload",tags:["autodocs"],args:{failureRate:.1},argTypes:{uploadService:{table:{disable:!0}},onSuccessfulUpload:{table:{disable:!0}},fileManager:{table:{disable:!0}},body:{table:{disable:!0}},sx:{table:{disable:!0}}}},i={render:e=>{const r=m({failureRate:e.failureRate}),o=b();return t.jsx(O,{alignItems:"start",children:t.jsx(u,{disabled:e.disabled,acceptsOnly:e.acceptsOnly,uploadService:r,fileManager:o})})}},c={args:{title:"Custom Title Text",dropTitle:"Custom Drop Text",disabledTitle:"Custom Disabled Text"},render:e=>{const r=m({failureRate:e.failureRate}),o=b();return t.jsx(u,{disabled:e.disabled,sx:{dragZoneSx:()=>({borderStyle:"solid",borderWidth:1,borderRadius:0})},body:t.jsx(h,{title:"Custom text here",dropTitle:"Custom drop text here",disabledTitle:"Custom disabled text here"}),acceptsOnly:e.acceptsOnly,uploadService:r,fileManager:o})}},H=()=>{const{dropzoneState:e,openFileSelector:r}=E(),{disabled:o}=e,{status:s,isError:n}=v.useMemo(()=>L.getInfo(e),[e]);return t.jsxs(B,{paddingX:2,paddingY:1,color:n?"error":"inherit",minWidth:"400px",children:[s===d.overloaded&&"Custom Overloaded Body",s===d.dragRejected&&"Custom Drag Rejected",s===d.disabled&&"Custom Disabled",!n&&!o&&t.jsxs(t.Fragment,{children:[t.jsx(M,{onClick:r,children:"Custom Open File Browser"})," ",s===d.dragActive?"Custom Drop Text":"Custom Text Here"]})]})},p={render:e=>{const r=m({failureRate:e.failureRate}),o=b(),s=a=>({default:l(a.palette.secondary.main,A),disabled:l(a.palette.text.disabled,A),dragActive:l(a.palette.secondary.main,k)}),n=a=>({default:l(a.palette.secondary.main,x),disabled:l(a.palette.text.disabled,x),dragActive:l(a.palette.secondary.main,j)});return t.jsx(u,{disabled:e.disabled,body:t.jsx(H,{}),acceptsOnly:e.acceptsOnly,uploadService:r,fileManager:o,sx:{dragZoneSx:a=>g=>({backgroundColor:C.selectColor(a,s(g)),borderColor:C.selectColor(a,n(g))})}})}};var S,D,f;i.parameters={...i.parameters,docs:{...(S=i.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: args => {
    const uploadService = useFakeService({
      failureRate: args.failureRate
    });
    const fileManager = useFileUploadManager<void>();
    return <Stack alignItems='start'>
        <SingleFileUpload disabled={args.disabled} acceptsOnly={args.acceptsOnly} uploadService={uploadService} fileManager={fileManager} />
      </Stack>;
  }
}`,...(f=(D=i.parameters)==null?void 0:D.docs)==null?void 0:f.source}}};var T,y,R;c.parameters={...c.parameters,docs:{...(T=c.parameters)==null?void 0:T.docs,source:{originalSource:`{
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
}`,...(R=(y=c.parameters)==null?void 0:y.docs)==null?void 0:R.source}}};var F,_,U;p.parameters={...p.parameters,docs:{...(F=p.parameters)==null?void 0:F.docs,source:{originalSource:`{
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
}`,...(U=(_=p.parameters)==null?void 0:_.docs)==null?void 0:U.source}}};const W=["Default","CustomTitle","CustomBody"];export{p as CustomBody,c as CustomTitle,i as Default,W as __namedExportsOrder,V as default};
