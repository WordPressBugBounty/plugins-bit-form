var b=Object.defineProperty;var n=Object.getOwnPropertySymbols;var g=Object.prototype.hasOwnProperty,j=Object.prototype.propertyIsEnumerable;var c=(o,s,t)=>s in o?b(o,s,{enumerable:!0,configurable:!0,writable:!0,value:t}):o[s]=t,p=(o,s)=>{for(var t in s||(s={}))g.call(s,t)&&c(o,t,s[t]);if(n)for(var t of n(s))j.call(s,t)&&c(o,t,s[t]);return o};import{r as a,ba as v,v as k,w as _,j as e,S as I}from"./main-478.js";import{b as S}from"./bf-861-77.js";import{W as h}from"./bf-75-121.js";import"./bf-35-72.js";import"./bf-665-75.js";import"./bf-934-187.js";const w=a.lazy(()=>v(()=>import("./bf-262-193.js"),["./bf-262-193.js","./main-478.js","./main-478.css","./bf-35-72.js","./bf-665-75.js","./bf-761-411.css","./bf-922-410.css","./bf-901-360.js"],import.meta.url));function N({formFields:o,setIntegration:s,integrations:t,allIntegURL:d}){const u=k(),{id:r,formID:x}=_(),[i,f]=a.useState(p({},t[r])),[l,m]=a.useState({show:!1});return e.jsxs("div",{style:{width:900},children:[e.jsx(I,{snack:l,setSnackbar:m}),e.jsx("div",{className:"mt-3",children:e.jsx(w,{formID:x,formFields:o,webHooks:i,setWebHooks:f,setSnackbar:m})}),e.jsx(h,{edit:!0,saveConfig:()=>S(t,s,d,i,u,r,1)}),e.jsx("br",{})]})}export{N as default};