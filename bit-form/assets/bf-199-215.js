var v=Object.defineProperty;var m=Object.getOwnPropertySymbols;var S=Object.prototype.hasOwnProperty,w=Object.prototype.propertyIsEnumerable;var d=(a,s,e)=>s in a?v(a,s,{enumerable:!0,configurable:!0,writable:!0,value:e}):a[s]=e,c=(a,s)=>{for(var e in s||(s={}))S.call(s,e)&&d(a,e,s[e]);if(m)for(var e of m(s))w.call(s,e)&&d(a,e,s[e]);return a};import{v as M,w as N,r as o,j as t,S as P,_ as p}from"./main-831.js";import{b as C}from"./bf-36-76.js";import{I as k}from"./bf-714-329.js";import{h as y,M as _,c as E}from"./bf-701-373.js";import"./bf-312-71.js";import"./bf-614-74.js";function A({formFields:a,setIntegration:s,integrations:e,allIntegURL:u}){const f=M(),{id:r,formID:x}=N(),[i,l]=o.useState(c({},e[r])),[h,g]=o.useState(!1),[j,n]=o.useState({show:!1}),b=()=>{if(!E(i)){n({show:!0,msg:"Please map all required fields to continue."});return}C(e,s,u,i,f,r,1)};return t.jsxs("div",{style:{width:900},children:[t.jsx(P,{snack:j,setSnackbar:n}),t.jsxs("div",{className:"flx mt-3",children:[t.jsx("b",{className:"wdt-200 d-in-b",children:p("Integration Name:")}),t.jsx("input",{className:"btcd-paper-inp w-6",onChange:I=>y(I,i,l),name:"name",value:i.name,type:"text",placeholder:p("Integration Name...")})]}),t.jsx("br",{}),t.jsx("br",{}),t.jsx(_,{formID:x,formFields:a,mailPoetConf:i,setMailPoetConf:l,isLoading:h,step:2,setisLoading:g,setSnackbar:n,edit:i.lists}),t.jsx(k,{edit:!0,saveConfig:b,disabled:i.lists===""||i.field_map.length<1}),t.jsx("br",{})]})}export{A as default};