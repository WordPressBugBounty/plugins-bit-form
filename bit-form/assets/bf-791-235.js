var I=Object.defineProperty;var d=Object.getOwnPropertySymbols;var v=Object.prototype.hasOwnProperty,S=Object.prototype.propertyIsEnumerable;var l=(a,s,e)=>s in a?I(a,s,{enumerable:!0,configurable:!0,writable:!0,value:e}):a[s]=e,p=(a,s)=>{for(var e in s||(s={}))v.call(s,e)&&l(a,e,s[e]);if(d)for(var e of d(s))S.call(s,e)&&l(a,e,s[e]);return a};import{v as N,w,r as n,j as t,S as C,_ as c}from"./main-232.js";import{b as T}from"./bf-348-75.js";import{I as y}from"./bf-363-334.js";import{h as _}from"./bf-925-383.js";import{T as k}from"./bf-595-384.js";import"./bf-646-127.js";import"./bf-893-81.js";import"./bf-800-117.js";import"./bf-80-121.js";function F({formFields:a,setIntegration:s,integrations:e,allIntegURL:x}){const f=N(),{id:o,formID:g}=w(),[r,i]=n.useState(p({},e[o])),[u,h]=n.useState(!1),[j,m]=n.useState({show:!1});return t.jsxs("div",{style:{width:900},children:[t.jsx(C,{snack:j,setSnackbar:m}),t.jsxs("div",{className:"flx mt-3",children:[t.jsx("b",{className:"wdt-200 d-in-b",children:c("Integration Name:")}),t.jsx("input",{className:"btcd-paper-inp w-7",onChange:b=>_(b,r,i),name:"name",value:r.name,type:"text",placeholder:c("Integration Name...")})]}),t.jsx("br",{}),t.jsx("br",{}),t.jsx(k,{formID:g,formFields:a,telegramConf:r,setTelegramConf:i,isLoading:u,setisLoading:h,setSnackbar:m}),t.jsx(y,{edit:!0,saveConfig:()=>T(e,s,x,r,f,o,1),disabled:r.chat_id===""}),t.jsx("br",{})]})}export{F as default};