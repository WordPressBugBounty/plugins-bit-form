import{r as e,bf as h,w as x,v as y,j as t,S as k}from"./main-347.js";import"./bf-387-72.js";import{t as i}from"./bf-534-189.js";import{S as f,T as j,W as v}from"./bf-387-123.js";import{b as g}from"./bf-321-77.js";import"./bf-353-75.js";const S=e.lazy(()=>h(()=>import("./bf-674-193.js"),["./bf-674-193.js","./main-347.js","./main-347.css","./bf-387-72.js","./bf-353-75.js","./bf-432-414.css","./bf-218-413.css","./bf-377-363.js"],import.meta.url));function E({formFields:r,setIntegration:n,integrations:l,allIntegURL:b}){const p=x(),{formID:c}=y(),[s,m]=e.useState(1),[d,a]=e.useState({show:!1}),[o,u]=e.useState({name:"Pabbly WebHooks",type:"Pabbly",method:"POST",url:"",apiConsole:"https://connect.pabbly.com/dashboard"});return t.jsxs("div",{children:[t.jsx(k,{snack:d,setSnackbar:a}),t.jsx("div",{className:"txt-center w-9 mt-2 cal-width",children:t.jsx(f,{step:2,active:s})}),t.jsx(j,{title:i.pabbly.title,youTubeLink:i.pabbly.link}),t.jsx("div",{className:"btcd-stp-page",style:{width:s===1&&900,height:s===1&&"100%"},children:t.jsx(S,{formID:c,formFields:r,webHooks:o,setWebHooks:u,step:s,setstep:m,setSnackbar:a,create:!0})}),t.jsx("div",{className:"btcd-stp-page",style:{width:s===2&&900,minHeight:s===2&&"900px"},children:t.jsx(v,{step:s,saveConfig:()=>g(l,n,b,o,p)})})]})}export{E as default};