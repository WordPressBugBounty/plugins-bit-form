import{r as s,bi as x,w as h,v as y,j as t,S as k}from"./main-365.js";import"./bf-239-69.js";import{t as i}from"./bf-802-185.js";import{S as b,T as j,W as v}from"./bf-618-119.js";import{b as f}from"./bf-891-74.js";import"./bf-621-72.js";const S=s.lazy(()=>x(()=>import("./bf-637-189.js"),["./bf-637-189.js","./main-365.js","./main-365.css","./bf-239-69.js","./bf-621-72.js","./bf-214-410.css","./bf-717-409.css","./bf-331-359.js"],import.meta.url));function E({formFields:r,setIntegration:n,integrations:l,allIntegURL:p}){const c=h(),{formID:m}=y(),[e,g]=s.useState(1),[d,a]=s.useState({show:!1}),[o,u]=s.useState({name:"Integrately WebHooks",type:"Integrately",method:"POST",url:"",apiConsole:"https://app.integrately.com/"});return t.jsxs("div",{children:[t.jsx(k,{snack:d,setSnackbar:a}),t.jsx("div",{className:"txt-center w-9 mt-2 cal-width",children:t.jsx(b,{step:2,active:e})}),t.jsx(j,{title:i.integrately.title,youTubeLink:i.integrately.link}),t.jsx("div",{className:"btcd-stp-page",style:{width:e===1&&900,height:e===1&&"100%"},children:t.jsx(S,{formID:m,formFields:r,webHooks:o,setWebHooks:u,step:e,setstep:g,setSnackbar:a,create:!0})}),t.jsx("div",{className:"btcd-stp-page",style:{width:e===2&&900,minHeight:e===2&&"900px"},children:t.jsx(v,{step:e,saveConfig:()=>f(l,n,p,o,c)})})]})}export{E as default};