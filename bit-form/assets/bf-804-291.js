import{r as s,bf as x,w as b,v as k,j as t,S as f}from"./main-65.js";import"./bf-874-72.js";import{t as o}from"./bf-821-189.js";import{S as j,T as v,W as g}from"./bf-49-123.js";import{b as S}from"./bf-364-77.js";import"./bf-872-75.js";const w=s.lazy(()=>x(()=>import("./bf-694-193.js"),["./bf-694-193.js","./main-65.js","./main-65.css","./bf-874-72.js","./bf-872-75.js","./bf-994-414.css","./bf-134-413.css","./bf-788-363.js"],import.meta.url));function E({formFields:r,setIntegration:p,integrations:n,allIntegURL:c}){const m=b(),{formID:l}=k(),[e,d]=s.useState(1),[u,a]=s.useState({show:!1}),[i,h]=s.useState({name:"Zapier Web Hooks",type:"Zapier",method:"POST",url:"",apiConsole:"https://zapier.com/app/dashboard"});return t.jsxs("div",{children:[t.jsx(f,{snack:u,setSnackbar:a}),t.jsx("div",{className:"txt-center w-9 mt-2 cal-width",children:t.jsx(j,{step:2,active:e})}),t.jsx(v,{title:o.zapier.title,youTubeLink:o.zapier.link}),t.jsx("div",{className:"btcd-stp-page",style:{width:e===1&&900,height:e===1&&"100%"},children:t.jsx(w,{formID:l,formFields:r,webHooks:i,setWebHooks:h,step:e,setstep:d,setSnackbar:a,create:!0})}),t.jsx("div",{className:"btcd-stp-page",style:{width:e===2&&900,minHeight:e===2&&"900px"},children:t.jsx(g,{step:e,saveConfig:()=>S(n,p,c,i,m)})})]})}export{E as default};