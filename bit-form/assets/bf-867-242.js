var b=Object.defineProperty;var p=Object.getOwnPropertySymbols;var v=Object.prototype.hasOwnProperty,S=Object.prototype.propertyIsEnumerable;var g=(a,s,t)=>s in a?b(a,s,{enumerable:!0,configurable:!0,writable:!0,value:t}):a[s]=t,c=(a,s)=>{for(var t in s||(s={}))v.call(s,t)&&g(a,t,s[t]);if(p)for(var t of p(s))S.call(s,t)&&g(a,t,s[t]);return a};import{v as N,w,r as i,j as e,S as C,_ as u}from"./main-232.js";import{b as y}from"./bf-348-75.js";import{I as G}from"./bf-363-334.js";import{h}from"./bf-795-394.js";import{G as k}from"./bf-687-395.js";import"./bf-646-127.js";import"./bf-80-121.js";/* empty css          */import"./bf-74-337.js";import"./bf-156-130.js";function B({formFields:a,setIntegration:s,integrations:t,allIntegURL:l}){const f=N(),{id:m,formID:E}=w(),[o,n]=i.useState(c({},t[m])),[x,j]=i.useState(!1),[I,d]=i.useState({show:!1});return o.mainAction==="2"&&o.addTagToUser,e.jsxs("div",{style:{width:900},children:[e.jsx(C,{snack:I,setSnackbar:d}),e.jsxs("div",{className:"flx mt-3",children:[e.jsx("b",{className:"wdt-200 d-in-b",children:u("Integration Name:")}),e.jsx("input",{className:"btcd-paper-inp w-5",onChange:r=>h(r,o,n),name:"name",value:o.name,type:"text",placeholder:u("Integration Name...")})]}),e.jsx("br",{}),e.jsx(k,{formFields:a,handleInput:r=>h(r,o,n),groundhoggConf:o,setGroundhoggConf:n,isLoading:x,setIsLoading:j,setSnackbar:d}),e.jsx(G,{edit:!0,saveConfig:()=>y(t,s,l,o,f,m,1)}),e.jsx("br",{})]})}export{B as default};