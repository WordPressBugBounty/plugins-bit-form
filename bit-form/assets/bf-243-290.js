import{r as e,bf as h,w as u,v as b,j as s,S as v}from"./main-640.js";import"./bf-137-72.js";import{S as f,W as g}from"./bf-952-123.js";import{b as j}from"./bf-534-77.js";import"./bf-662-75.js";import"./bf-520-189.js";const k=e.lazy(()=>h(()=>import("./bf-441-193.js"),["./bf-441-193.js","./main-640.js","./main-640.css","./bf-137-72.js","./bf-662-75.js","./bf-396-414.css","./bf-289-413.css","./bf-307-363.js"],import.meta.url));function E({formFields:r,setIntegration:i,integrations:n,allIntegURL:c}){const m=u(),{formID:p}=b(),[t,d]=e.useState(1),[l,o]=e.useState({show:!1}),[a,x]=e.useState({name:"Web Hooks",type:"Web Hooks",method:"POST",url:""});return s.jsxs("div",{children:[s.jsx(v,{snack:l,setSnackbar:o}),s.jsx("div",{className:"txt-center w-9 mt-2 cal-width",children:s.jsx(f,{step:2,active:t})}),s.jsx("div",{className:"btcd-stp-page",style:{width:t===1&&900,height:t===1&&"100%"},children:s.jsx(k,{formID:p,formFields:r,webHooks:a,setWebHooks:x,step:t,setstep:d,setSnackbar:o,create:!0})}),s.jsx("div",{className:"btcd-stp-page",style:{width:t===2&&900,minHeight:t===2&&"900px"},children:s.jsx(g,{step:t,saveConfig:()=>j(n,i,c,a,m)})})]})}export{E as default};