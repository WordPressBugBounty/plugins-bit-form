import{r as s,ba as x,v as h,w as y,j as t,S as k}from"./main-495.js";import"./bf-566-72.js";import{t as i}from"./bf-922-188.js";import{S as b,T as j,W as v}from"./bf-113-121.js";import{b as f}from"./bf-27-77.js";import"./bf-516-75.js";const S=s.lazy(()=>x(()=>import("./bf-343-194.js"),["./bf-343-194.js","./main-495.js","./main-495.css","./bf-566-72.js","./bf-516-75.js","./bf-829-413.css","./bf-570-412.css","./bf-340-362.js"],import.meta.url));function E({formFields:r,setIntegration:n,integrations:l,allIntegURL:p}){const c=h(),{formID:m}=y(),[e,g]=s.useState(1),[d,a]=s.useState({show:!1}),[o,u]=s.useState({name:"Integrately WebHooks",type:"Integrately",method:"POST",url:"",apiConsole:"https://app.integrately.com/"});return t.jsxs("div",{children:[t.jsx(k,{snack:d,setSnackbar:a}),t.jsx("div",{className:"txt-center w-9 mt-2 cal-width",children:t.jsx(b,{step:2,active:e})}),t.jsx(j,{title:i.integrately.title,youTubeLink:i.integrately.link}),t.jsx("div",{className:"btcd-stp-page",style:{width:e===1&&900,height:e===1&&"100%"},children:t.jsx(S,{formID:m,formFields:r,webHooks:o,setWebHooks:u,step:e,setstep:g,setSnackbar:a,create:!0})}),t.jsx("div",{className:"btcd-stp-page",style:{width:e===2&&900,minHeight:e===2&&"900px"},children:t.jsx(v,{step:e,saveConfig:()=>f(l,n,p,o,c)})})]})}export{E as default};