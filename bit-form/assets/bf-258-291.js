import{r as e,ba as h,v as u,w as b,j as s,S as v}from"./main-471.js";import"./bf-685-72.js";import{S as g,W as j}from"./bf-592-121.js";import{b as k}from"./bf-458-77.js";import"./bf-230-75.js";import"./bf-202-188.js";const S=e.lazy(()=>h(()=>import("./bf-643-194.js"),["./bf-643-194.js","./main-471.js","./main-471.css","./bf-685-72.js","./bf-230-75.js","./bf-330-413.css","./bf-946-412.css","./bf-716-362.js"],import.meta.url));function E({formFields:r,setIntegration:i,integrations:n,allIntegURL:c}){const m=u(),{formID:p}=b(),[t,d]=e.useState(1),[l,o]=e.useState({show:!1}),[a,x]=e.useState({name:"Web Hooks",type:"Web Hooks",method:"POST",url:""});return s.jsxs("div",{children:[s.jsx(v,{snack:l,setSnackbar:o}),s.jsx("div",{className:"txt-center w-9 mt-2 cal-width",children:s.jsx(g,{step:2,active:t})}),s.jsx("div",{className:"btcd-stp-page",style:{width:t===1&&900,height:t===1&&"100%"},children:s.jsx(S,{formID:p,formFields:r,webHooks:a,setWebHooks:x,step:t,setstep:d,setSnackbar:o,create:!0})}),s.jsx("div",{className:"btcd-stp-page",style:{width:t===2&&900,minHeight:t===2&&"900px"},children:s.jsx(j,{step:t,saveConfig:()=>k(n,i,c,a,m)})})]})}export{E as default};