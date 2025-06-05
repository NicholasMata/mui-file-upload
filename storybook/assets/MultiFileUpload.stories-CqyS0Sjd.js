import{j as r}from"./jsx-runtime-QvZ8i92b.js";import{r as D}from"./index-uubelm5h.js";import{M as d,u as n,F,T as g,D as C,a as R,b as _,c as v,d as f,S as h}from"./MultiFileUpload-DJ2PQicy.js";import{a as u}from"./DefaultPropsProvider-GBtPWx79.js";import"./assertThisInitialized-C1_Uj0Qz.js";import"./index-CfOt2XX2.js";const G={component:d,title:"MultiFileUpload",tags:["autodocs"],args:{failureRate:.1},argTypes:{uploadService:{table:{disable:!0}},helperText:{control:"text"},onSuccessfulUpload:{table:{disable:!0}},fileManager:{table:{disable:!0}},body:{table:{disable:!0}},sx:{table:{disable:!0}}}},o={render:({failureRate:e,...t})=>{const a=n({failureRate:e});return r.jsx(d,{...t,uploadService:a})}},s={args:{title:"Custom Title Text",dropTitle:"Custom Drop Text",disabledTitle:"Custom Disabled Text",openFileSelectorTitle:"Custom Browse Files Text"},render:e=>{const t=n({failureRate:e.failureRate});return r.jsx(d,{disabled:e.disabled,sx:{dragZoneSx:()=>({borderStyle:"solid",borderWidth:3,borderRadius:0})},body:r.jsx(F,{title:e.title,dropTitle:r.jsx(g,{children:e.dropTitle}),disabledTitle:e.disabledTitle,openFileSelectorTitle:e.openFileSelectorTitle}),uploadService:t,acceptsOnly:e.acceptsOnly})}},U=()=>{const{dropzoneState:e}=f(),t=D.useMemo(()=>e.dragActive!=null?e.disabled?"Custom Body Disabled (File Over Me)":"Custom Body Drop Files":e.disabled?"Custom Body Disabled":"Custom Body",[e]);return r.jsx(h,{alignItems:"center",justifyContent:"center",children:t})},i={render:e=>{const t=n({failureRate:e.failureRate});return r.jsx(d,{helperText:e.helperText,error:e.error,disabled:e.disabled,sx:{dragZoneSx:a=>l=>({height:"70vh",borderWidth:3,backgroundColor:u(a.disabled?l.palette.text.disabled:l.palette.secondary.main,a.dragActive!=null?C:R),borderColor:u(a.disabled?l.palette.text.disabled:l.palette.secondary.main,a.dragActive!=null?_:v)})},body:r.jsx(U,{}),uploadService:t,acceptsOnly:e.acceptsOnly})}};var c,p,b;o.parameters={...o.parameters,docs:{...(c=o.parameters)==null?void 0:c.docs,source:{originalSource:`{
  render: ({
    failureRate,
    ...args
  }) => {
    const uploadService = useFakeService({
      failureRate
    });
    return <MultiFileUpload {...args} uploadService={uploadService} />;
  }
}`,...(b=(p=o.parameters)==null?void 0:p.docs)==null?void 0:b.source}}};var T,m,A;s.parameters={...s.parameters,docs:{...(T=s.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    title: 'Custom Title Text',
    dropTitle: 'Custom Drop Text',
    disabledTitle: 'Custom Disabled Text',
    openFileSelectorTitle: 'Custom Browse Files Text'
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
    }} body={<FileDropzoneBody title={args.title} dropTitle={<Typography>{args.dropTitle}</Typography>} disabledTitle={args.disabledTitle} openFileSelectorTitle={args.openFileSelectorTitle} />} uploadService={uploadService} acceptsOnly={args.acceptsOnly} />;
  }
}`,...(A=(m=s.parameters)==null?void 0:m.docs)==null?void 0:A.source}}};var x,S,y;i.parameters={...i.parameters,docs:{...(x=i.parameters)==null?void 0:x.docs,source:{originalSource:`{
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
}`,...(y=(S=i.parameters)==null?void 0:S.docs)==null?void 0:y.source}}};const H=["Default","CustomTitle","CustomBody"];export{i as CustomBody,s as CustomTitle,o as Default,H as __namedExportsOrder,G as default};
