var b=Object.defineProperty;var m=Object.getOwnPropertySymbols;var g=Object.prototype.hasOwnProperty,j=Object.prototype.propertyIsEnumerable;var c=(e,s,t)=>s in e?b(e,s,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[s]=t,l=(e,s)=>{for(var t in s||(s={}))g.call(s,t)&&c(e,t,s[t]);if(m)for(var t of m(s))j.call(s,t)&&c(e,t,s[t]);return e};import{r as a,bf as v,w as k,v as _,j as o,S as y}from"./main-640.js";import{b as I}from"./bf-534-77.js";import{W as S}from"./bf-952-123.js";import"./bf-137-72.js";import"./bf-662-75.js";import"./bf-520-189.js";const h=a.lazy(()=>v(()=>import("./bf-441-193.js"),["./bf-441-193.js","./main-640.js","./main-640.css","./bf-137-72.js","./bf-662-75.js","./bf-396-414.css","./bf-289-413.css","./bf-307-363.js"],import.meta.url));function N({formFields:e,setIntegration:s,integrations:t,allIntegURL:p}){const d=k(),{id:r,formID:u}=_(),[i,f]=a.useState(l({},t[r])),[x,n]=a.useState({show:!1});return o.jsxs("div",{style:{width:900},children:[o.jsx(y,{snack:x,setSnackbar:n}),o.jsx("div",{className:"mt-3",children:o.jsx(h,{formID:u,formFields:e,webHooks:i,setWebHooks:f,setSnackbar:n})}),o.jsx(S,{edit:!0,saveConfig:()=>I(t,s,p,i,d,r,1)}),o.jsx("br",{})]})}export{N as default};