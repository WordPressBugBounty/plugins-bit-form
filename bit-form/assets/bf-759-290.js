import{r as e,ba as h,v as u,w as b,j as s,S as v}from"./main-478.js";import"./bf-35-72.js";import{S as g,W as j}from"./bf-75-121.js";import{b as k}from"./bf-861-77.js";import"./bf-665-75.js";import"./bf-934-187.js";const S=e.lazy(()=>h(()=>import("./bf-262-193.js"),["./bf-262-193.js","./main-478.js","./main-478.css","./bf-35-72.js","./bf-665-75.js","./bf-761-411.css","./bf-922-410.css","./bf-901-360.js"],import.meta.url));function E({formFields:r,setIntegration:i,integrations:n,allIntegURL:c}){const m=u(),{formID:p}=b(),[t,d]=e.useState(1),[l,o]=e.useState({show:!1}),[a,x]=e.useState({name:"Web Hooks",type:"Web Hooks",method:"POST",url:""});return s.jsxs("div",{children:[s.jsx(v,{snack:l,setSnackbar:o}),s.jsx("div",{className:"txt-center w-9 mt-2 cal-width",children:s.jsx(g,{step:2,active:t})}),s.jsx("div",{className:"btcd-stp-page",style:{width:t===1&&900,height:t===1&&"100%"},children:s.jsx(S,{formID:p,formFields:r,webHooks:a,setWebHooks:x,step:t,setstep:d,setSnackbar:o,create:!0})}),s.jsx("div",{className:"btcd-stp-page",style:{width:t===2&&900,minHeight:t===2&&"900px"},children:s.jsx(j,{step:t,saveConfig:()=>k(n,i,c,a,m)})})]})}export{E as default};