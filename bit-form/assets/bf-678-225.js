var f=Object.defineProperty;var n=Object.getOwnPropertySymbols;var j=Object.prototype.hasOwnProperty,v=Object.prototype.propertyIsEnumerable;var b=(o,t,s)=>t in o?f(o,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):o[t]=s,c=(o,t)=>{for(var s in t||(t={}))j.call(t,s)&&b(o,s,t[s]);if(n)for(var s of n(t))v.call(t,s)&&b(o,s,t[s]);return o};import{r as a,ba as k,v as _,w as y,j as e,S}from"./main-478.js";import{b as g}from"./bf-861-77.js";import{W as h}from"./bf-75-121.js";import"./bf-35-72.js";import"./bf-665-75.js";import"./bf-934-187.js";const w=a.lazy(()=>k(()=>import("./bf-262-193.js"),["./bf-262-193.js","./main-478.js","./main-478.css","./bf-35-72.js","./bf-665-75.js","./bf-761-411.css","./bf-922-410.css","./bf-901-360.js"],import.meta.url));function N({formFields:o,setIntegration:t,integrations:s,allIntegURL:p}){const l=_(),{id:r,formID:d}=y(),[i,u]=a.useState(c({},s[r])),[x,m]=a.useState({show:!1});return e.jsxs("div",{style:{width:900},children:[e.jsx(S,{snack:x,setSnackbar:m}),e.jsx("div",{className:"mt-3",children:e.jsx(w,{formID:d,formFields:o,webHooks:i,setWebHooks:u,setSnackbar:m})}),e.jsx(h,{edit:!0,saveConfig:()=>g(s,t,p,i,l,r,1)}),e.jsx("br",{})]})}export{N as default};