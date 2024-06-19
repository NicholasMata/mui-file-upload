import{M as i,u as n,j as t,F as R,T as C,a as c,D as S,b as _,c as v,d as F,e as f,S as x}from"./MultiFileUpload-830552c5.js";import{r as O}from"./index-f1286426.js";import"./_commonjsHelpers-de833af9.js";import"./assertThisInitialized-25388baf.js";const M={component:i,title:"MultiFileUpload",tags:["autodocs"],args:{failureRate:.1},argTypes:{uploadService:{table:{disable:!0}},onSuccessfulUpload:{table:{disable:!0}},fileManager:{table:{disable:!0}},body:{table:{disable:!0}},sx:{table:{disable:!0}}}},s={render:e=>{const a=n({failureRate:e.failureRate});return t(i,{disabled:e.disabled,uploadService:a,acceptsOnly:e.acceptsOnly})}},d={args:{title:"Custom Title Text",dropTitle:"Custom Drop Text",disabledTitle:"Custom Disabled Text"},render:e=>{const a=n({failureRate:e.failureRate});return t(i,{disabled:e.disabled,sx:{dragZoneSx:()=>({borderStyle:"solid",borderWidth:3,borderRadius:0})},body:t(R,{title:e.title,dropTitle:t(C,{children:e.dropTitle}),disabledTitle:e.disabledTitle}),uploadService:a,acceptsOnly:e.acceptsOnly})}},U=()=>{const{dropzoneState:e}=f(),a=O.useMemo(()=>e.dragActive!=null?e.disabled?"Custom Body Disabled (File Over Me)":"Custom Body Drop Files":e.disabled?"Custom Body Disabled":"Custom Body",[e]);return t(x,{alignItems:"center",justifyContent:"center",children:a})},o={render:e=>{const a=n({failureRate:e.failureRate});return t(i,{disabled:e.disabled,sx:{dragZoneSx:r=>l=>({height:"70vh",borderWidth:3,backgroundColor:c(r.disabled?l.palette.text.disabled:l.palette.secondary.main,r.dragActive!=null?S:_),borderColor:c(r.disabled?l.palette.text.disabled:l.palette.secondary.main,r.dragActive!=null?v:F)})},body:t(U,{}),uploadService:a,acceptsOnly:e.acceptsOnly})}};var u,p,b;s.parameters={...s.parameters,docs:{...(u=s.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: args => {
    const uploadService = useFakeService({
      failureRate: args.failureRate
    });
    return <MultiFileUpload disabled={args.disabled} uploadService={uploadService} acceptsOnly={args.acceptsOnly} />;
  }
}`,...(b=(p=s.parameters)==null?void 0:p.docs)==null?void 0:b.source}}};var m,A,y;d.parameters={...d.parameters,docs:{...(m=d.parameters)==null?void 0:m.docs,source:{originalSource:`{
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
}`,...(y=(A=d.parameters)==null?void 0:A.docs)==null?void 0:y.source}}};var T,D,g;o.parameters={...o.parameters,docs:{...(T=o.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: args => {
    const uploadService = useFakeService({
      failureRate: args.failureRate
    });
    return <MultiFileUpload disabled={args.disabled} sx={{
      dragZoneSx: state => t => ({
        height: '70vh',
        borderWidth: 3,
        backgroundColor: alpha(state.disabled ? t.palette.text.disabled : t.palette.secondary.main, state.dragActive != null ? DEFAULT_DRAG_ACTIVE_BACKGROUND_ALPHA : DEFAULT_BACKGROUND_ALPHA),
        borderColor: alpha(state.disabled ? t.palette.text.disabled : t.palette.secondary.main, state.dragActive != null ? DEFAULT_DRAG_ACTIVE_BORDER_ALPHA : DEFAULT_BORDER_ALPHA)
      })
    }} body={<CustomFileUploadZone />} uploadService={uploadService} acceptsOnly={args.acceptsOnly} />;
  }
}`,...(g=(D=o.parameters)==null?void 0:D.docs)==null?void 0:g.source}}};const G=["Default","CustomTitle","CustomBody"];export{o as CustomBody,d as CustomTitle,s as Default,G as __namedExportsOrder,M as default};
//# sourceMappingURL=MultiFileUpload.stories-7b17cf03.js.map
