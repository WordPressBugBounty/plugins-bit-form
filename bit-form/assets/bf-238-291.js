import{r as e,bi as h,w as x,v as y,j as t,S as k}from"./main-365.js";import"./bf-239-69.js";import{t as i}from"./bf-802-185.js";import{S as j,T as v,W as f}from"./bf-618-119.js";import{b as g}from"./bf-891-74.js";import"./bf-621-72.js";const S=e.lazy(()=>h(()=>import("./bf-637-189.js"),["./bf-637-189.js","./main-365.js","./main-365.css","./bf-239-69.js","./bf-621-72.js","./bf-214-410.css","./bf-717-409.css","./bf-331-359.js"],import.meta.url));function E({formFields:r,setIntegration:n,integrations:l,allIntegURL:b}){const p=x(),{formID:c}=y(),[s,m]=e.useState(1),[d,a]=e.useState({show:!1}),[o,u]=e.useState({name:"Pabbly WebHooks",type:"Pabbly",method:"POST",url:"",apiConsole:"https://connect.pabbly.com/dashboard"});return t.jsxs("div",{children:[t.jsx(k,{snack:d,setSnackbar:a}),t.jsx("div",{className:"txt-center w-9 mt-2 cal-width",children:t.jsx(j,{step:2,active:s})}),t.jsx(v,{title:i.pabbly.title,youTubeLink:i.pabbly.link}),t.jsx("div",{className:"btcd-stp-page",style:{width:s===1&&900,height:s===1&&"100%"},children:t.jsx(S,{formID:c,formFields:r,webHooks:o,setWebHooks:u,step:s,setstep:m,setSnackbar:a,create:!0})}),t.jsx("div",{className:"btcd-stp-page",style:{width:s===2&&900,minHeight:s===2&&"900px"},children:t.jsx(f,{step:s,saveConfig:()=>g(l,n,b,o,p)})})]})}export{E as default};