var l=Object.defineProperty;var n=Object.getOwnPropertySymbols;var j=Object.prototype.hasOwnProperty,k=Object.prototype.propertyIsEnumerable;var c=(o,t,s)=>t in o?l(o,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):o[t]=s,p=(o,t)=>{for(var s in t||(t={}))j.call(t,s)&&c(o,s,t[s]);if(n)for(var s of n(t))k.call(t,s)&&c(o,s,t[s]);return o};import{r as a,bf as v,w as _,v as S,j as e,S as g}from"./main-347.js";import{b as h}from"./bf-321-77.js";import{W as w}from"./bf-387-123.js";import"./bf-387-72.js";import"./bf-353-75.js";import"./bf-534-189.js";const E=a.lazy(()=>v(()=>import("./bf-674-193.js"),["./bf-674-193.js","./main-347.js","./main-347.css","./bf-387-72.js","./bf-353-75.js","./bf-432-414.css","./bf-218-413.css","./bf-377-363.js"],import.meta.url));function N({formFields:o,setIntegration:t,integrations:s,allIntegURL:d}){const u=_(),{id:r,formID:f}=S(),[i,x]=a.useState(p({},s[r])),[b,m]=a.useState({show:!1});return e.jsxs("div",{style:{width:900},children:[e.jsx(g,{snack:b,setSnackbar:m}),e.jsx("div",{className:"mt-3",children:e.jsx(E,{formID:f,formFields:o,webHooks:i,setWebHooks:x,setSnackbar:m})}),e.jsx(w,{edit:!0,saveConfig:()=>h(s,t,d,i,u,r,1)}),e.jsx("br",{})]})}export{N as default};