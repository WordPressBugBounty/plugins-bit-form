var v=Object.defineProperty;var l=Object.getOwnPropertySymbols;var S=Object.prototype.hasOwnProperty,N=Object.prototype.propertyIsEnumerable;var p=(e,s,a)=>s in e?v(e,s,{enumerable:!0,configurable:!0,writable:!0,value:a}):e[s]=a,u=(e,s)=>{for(var a in s||(s={}))S.call(s,a)&&p(e,a,s[a]);if(l)for(var a of l(s))N.call(s,a)&&p(e,a,s[a]);return e};import{w,v as A,r as m,j as t,S as C,_ as f}from"./main-348.js";import{I as k}from"./bf-944-332.js";import{s as y}from"./bf-630-363.js";import{h as x,c as E}from"./bf-198-391.js";import{A as L}from"./bf-926-392.js";import"./bf-568-76.js";import"./bf-628-71.js";import"./bf-115-74.js";function B({formFields:e,setIntegration:s,integrations:a,allIntegURL:h}){const b=w(),{id:c,formID:g}=A(),[n,i]=m.useState(u({},a[c])),[j,d]=m.useState(!1),[I,o]=m.useState({show:!1});return t.jsxs("div",{style:{width:900},children:[t.jsx(C,{snack:I,setSnackbar:o}),t.jsxs("div",{className:"flx mt-3",children:[t.jsx("b",{className:"wdt-200 d-in-b",children:f("Integration Name:")}),t.jsx("input",{className:"btcd-paper-inp w-5",onChange:r=>x(r,n,i),name:"name",value:n.name,type:"text",placeholder:f("Integration Name...")})]}),t.jsx("br",{}),t.jsx(L,{formFields:e,handleInput:r=>x(r,n,i,d,o,g),acumbamailConf:n,setAcumbamailConf:i,isLoading:j,setIsLoading:d,setSnackbar:o}),t.jsx(k,{edit:!0,saveConfig:()=>y(a,s,h,n,b,c,1),disabled:!n.mainAction||!E(n)}),t.jsx("br",{})]})}export{B as default};