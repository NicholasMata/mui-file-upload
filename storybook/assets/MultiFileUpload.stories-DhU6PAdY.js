import{j as t}from"./jsx-runtime-QvZ8i92b.js";import{r as g}from"./index-uubelm5h.js";import{M as i,u as n,F as C,T as R,D as S,a as _,b as v,c as F,d as f,S as h}from"./MultiFileUpload-2_RBWqab.js";import{a as u}from"./DefaultPropsProvider-GBtPWx79.js";import"./assertThisInitialized-C1_Uj0Qz.js";import"./index-CfOt2XX2.js";const G={component:i,title:"MultiFileUpload",tags:["autodocs"],args:{failureRate:.1},argTypes:{uploadService:{table:{disable:!0}},helperText:{control:"text"},onSuccessfulUpload:{table:{disable:!0}},fileManager:{table:{disable:!0}},body:{table:{disable:!0}},sx:{table:{disable:!0}}}},o={render:({failureRate:e,...r})=>{const a=n({failureRate:e});return t.jsx(i,{...r,uploadService:a})}},s={args:{title:"Custom Title Text",dropTitle:"Custom Drop Text",disabledTitle:"Custom Disabled Text"},render:e=>{const r=n({failureRate:e.failureRate});return t.jsx(i,{disabled:e.disabled,sx:{dragZoneSx:()=>({borderStyle:"solid",borderWidth:3,borderRadius:0})},body:t.jsx(C,{title:e.title,dropTitle:t.jsx(R,{children:e.dropTitle}),disabledTitle:e.disabledTitle}),uploadService:r,acceptsOnly:e.acceptsOnly})}},U=()=>{const{dropzoneState:e}=f(),r=g.useMemo(()=>e.dragActive!=null?e.disabled?"Custom Body Disabled (File Over Me)":"Custom Body Drop Files":e.disabled?"Custom Body Disabled":"Custom Body",[e]);return t.jsx(h,{alignItems:"center",justifyContent:"center",children:r})},d={render:e=>{const r=n({failureRate:e.failureRate});return t.jsx(i,{helperText:e.helperText,error:e.error,disabled:e.disabled,sx:{dragZoneSx:a=>l=>({height:"70vh",borderWidth:3,backgroundColor:u(a.disabled?l.palette.text.disabled:l.palette.secondary.main,a.dragActive!=null?S:_),borderColor:u(a.disabled?l.palette.text.disabled:l.palette.secondary.main,a.dragActive!=null?v:F)})},body:t.jsx(U,{}),uploadService:r,acceptsOnly:e.acceptsOnly})}};var c,p,b;o.parameters={...o.parameters,docs:{...(c=o.parameters)==null?void 0:c.docs,source:{originalSource:`{
  render: ({
    failureRate,
    ...args
  }) => {
    const uploadService = useFakeService({
      failureRate
    });
    return <MultiFileUpload {...args} uploadService={uploadService} />;
  }
}`,...(b=(p=o.parameters)==null?void 0:p.docs)==null?void 0:b.source}}};var m,T,A;s.parameters={...s.parameters,docs:{...(m=s.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    title: 'Custom Title Text',
    dropTitle: 'Custom Drop Text',
    disabledTitle: 'Custom Disabled Text'
  },
  render: args => {
    const uploadService = useFakeService({
      failureRate: args.failureRate
    });
    return <MultiFileUpload disabled={args.disabled} sx={{
      dragZoneSx: () => ({
        borderStyle: 'solid',
        borderWidth: 3,
        borderRadius: 0
      })
    }} body={<FileDropzoneBody title={args.title} dropTitle={<Typography>{args.dropTitle}</Typography>} disabledTitle={args.disabledTitle} />} uploadService={uploadService} acceptsOnly={args.acceptsOnly} />;
  }
}`,...(A=(T=s.parameters)==null?void 0:T.docs)==null?void 0:A.source}}};var x,y,D;d.parameters={...d.parameters,docs:{...(x=d.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: args => {
    const uploadService = useFakeService({
      failureRate: args.failureRate
    });
    return <MultiFileUpload helperText={args.helperText} error={args.error} disabled={args.disabled} sx={{
      dragZoneSx: state => t => ({
        height: '70vh',
        borderWidth: 3,
        backgroundColor: alpha(state.disabled ? t.palette.text.disabled : t.palette.secondary.main, state.dragActive != null ? DEFAULT_DRAG_ACTIVE_BACKGROUND_ALPHA : DEFAULT_BACKGROUND_ALPHA),
        borderColor: alpha(state.disabled ? t.palette.text.disabled : t.palette.secondary.main, state.dragActive != null ? DEFAULT_DRAG_ACTIVE_BORDER_ALPHA : DEFAULT_BORDER_ALPHA)
      })
    }} body={<CustomFileUploadZone />} uploadService={uploadService} acceptsOnly={args.acceptsOnly} />;
  }
}`,...(D=(y=d.parameters)==null?void 0:y.docs)==null?void 0:D.source}}};const H=["Default","CustomTitle","CustomBody"];export{d as CustomBody,s as CustomTitle,o as Default,H as __namedExportsOrder,G as default};
