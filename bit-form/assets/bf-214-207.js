var b=Object.defineProperty;var c=Object.getOwnPropertySymbols;var v=Object.prototype.hasOwnProperty,N=Object.prototype.propertyIsEnumerable;var h=(a,s,e)=>s in a?b(a,s,{enumerable:!0,configurable:!0,writable:!0,value:e}):a[s]=e,u=(a,s)=>{for(var e in s||(s={}))v.call(s,e)&&h(a,e,s[e]);if(c)for(var e of c(s))N.call(s,e)&&h(a,e,s[e]);return a};import{v as w,w as C,r as m,j as t,S as k,_ as x}from"./main-478.js";import{G as y,s as _}from"./bf-697-358.js";import{I as E}from"./bf-569-330.js";import{h as f}from"./bf-517-359.js";import"./bf-35-72.js";import"./bf-665-75.js";import"./bf-901-360.js";function z({formFields:a,setIntegration:s,integrations:e,allIntegURL:g}){const j=w(),{id:d,formID:l}=C(),[n,o]=m.useState(u({},e[d])),[I,p]=m.useState(!1),[S,r]=m.useState({show:!1});return t.jsxs("div",{style:{width:900},children:[t.jsx(k,{snack:S,setSnackbar:r}),t.jsxs("div",{className:"flx mt-3",children:[t.jsx("b",{className:"wdt-150 d-in-b",children:x("Integration Name:")}),t.jsx("input",{className:"btcd-paper-inp w-6",onChange:i=>f(i,n,o),name:"name",value:n.name,type:"text",placeholder:x("Integration Name...")})]}),t.jsx("br",{}),t.jsx("br",{}),t.jsx(y,{formID:l,formFields:a,handleInput:i=>f(i,n,o,l,p,r),sheetConf:n,setSheetConf:o,isLoading:I,setisLoading:p,setSnackbar:r}),t.jsx(E,{edit:!0,saveConfig:()=>_(e,s,g,n,j,d,1),disabled:n.spreadsheetId===""||n.worksheetName===""||n.field_map.length<1}),t.jsx("br",{})]})}export{z as default};