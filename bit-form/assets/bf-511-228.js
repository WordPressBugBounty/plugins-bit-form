var b=Object.defineProperty;var p=Object.getOwnPropertySymbols;var C=Object.prototype.hasOwnProperty,I=Object.prototype.propertyIsEnumerable;var c=(s,t,a)=>t in s?b(s,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):s[t]=a,d=(s,t)=>{for(var a in t||(t={}))C.call(t,a)&&c(s,a,t[a]);if(p)for(var a of p(t))I.call(t,a)&&c(s,a,t[a]);return s};import{v as S,w as N,r as i,j as e,S as w,dx as l}from"./main-232.js";import{b as y}from"./bf-348-75.js";import{I as A}from"./bf-363-334.js";import{h as k}from"./bf-804-381.js";import{A as E}from"./bf-818-382.js";import"./bf-646-127.js";import"./bf-80-121.js";import"./bf-156-130.js";function B({formFields:s,setIntegration:t,integrations:a,allIntegURL:x}){const f=S(),{id:o,formID:g}=N(),[n,r]=i.useState(d({},a[o])),[u,h]=i.useState(!1),[j,m]=i.useState({show:!1});return e.jsxs("div",{style:{width:900},children:[e.jsx(w,{snack:j,setSnackbar:m}),e.jsxs("div",{className:"flx mt-3",children:[e.jsx("b",{className:"wdt-200 d-in-b",children:l("Integration Name:")}),e.jsx("input",{className:"btcd-paper-inp w-5",onChange:v=>k(v,n,r),name:"name",value:n.name,type:"text",placeholder:l("Integration Name...")})]}),e.jsx("br",{}),e.jsx("br",{}),e.jsx(E,{formID:g,formFields:s,activeCampaingConf:n,setActiveCampaingConf:r,isLoading:u,setisLoading:h,setSnackbar:m}),e.jsx(A,{edit:!0,saveConfig:()=>y(a,t,x,n,f,o,1),disabled:n.field_map.length<1}),e.jsx("br",{})]})}export{B as default};