import{r as s,ba as x,w as h,v as k,j as t,S as b}from"./main-348.js";import"./bf-628-71.js";import{t as i}from"./bf-336-188.js";import{S as j,T as v,W as w}from"./bf-467-122.js";import{b as f}from"./bf-568-76.js";import"./bf-115-74.js";const S=s.lazy(()=>x(()=>import("./bf-287-194.js"),["./bf-287-194.js","./main-348.js","./main-348.css","./bf-628-71.js","./bf-115-74.js","./bf-475-413.css","./bf-237-412.css","./bf-303-362.js"],import.meta.url));function E({formFields:r,setIntegration:n,integrations:m,allIntegURL:c}){const p=h(),{formID:l}=k(),[e,g]=s.useState(1),[d,a]=s.useState({show:!1}),[o,u]=s.useState({name:"Integromat Web Hooks",type:"Integromat",method:"POST",url:"",apiConsole:"https://www.integromat.com/"});return t.jsxs("div",{children:[t.jsx(b,{snack:d,setSnackbar:a}),t.jsx("div",{className:"txt-center w-9 mt-2 cal-width",children:t.jsx(j,{step:2,active:e})}),t.jsx(v,{title:i.integromat.title,youTubeLink:i.integromat.link}),t.jsx("div",{className:"btcd-stp-page",style:{width:e===1&&900,height:e===1&&"100%"},children:t.jsx(S,{formID:l,formFields:r,webHooks:o,setWebHooks:u,step:e,setstep:g,setSnackbar:a,create:!0})}),t.jsx("div",{className:"btcd-stp-page",style:{width:e===2&&900,minHeight:e===2&&"900px"},children:t.jsx(w,{step:e,saveConfig:()=>f(m,n,c,o,p)})})]})}export{E as default};