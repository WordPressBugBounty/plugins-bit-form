var v=Object.defineProperty;var d=Object.getOwnPropertySymbols;var S=Object.prototype.hasOwnProperty,w=Object.prototype.propertyIsEnumerable;var p=(e,a,s)=>a in e?v(e,a,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[a]=s,f=(e,a)=>{for(var s in a||(a={}))S.call(a,s)&&p(e,s,a[s]);if(d)for(var s of d(a))w.call(a,s)&&p(e,s,a[s]);return e};import{w as N,v as y,r as m,j as t,S as C,_ as l}from"./main-917.js";import{b as k}from"./bf-38-77.js";import{I as _}from"./bf-221-333.js";import{h as u,c as L}from"./bf-763-371.js";import{E as M}from"./bf-327-372.js";import"./bf-961-72.js";import"./bf-173-75.js";function B({formFields:e,setIntegration:a,integrations:s,allIntegURL:h}){const x=N(),{id:c,formID:g}=y(),[n,i]=m.useState(f({},s[c])),[j,E]=m.useState(!1),[I,o]=m.useState({show:!1}),b=()=>{if(!L(n)){o({show:!0,msg:l("Please map mandatory fields")});return}k(s,a,h,n,x,c,1)};return t.jsxs("div",{style:{width:900},children:[t.jsx(C,{snack:I,setSnackbar:o}),t.jsxs("div",{className:"flx mt-3",children:[t.jsx("b",{className:"wdt-200 d-in-b",children:l("Integration Name:")}),t.jsx("input",{className:"btcd-paper-inp w-5",onChange:r=>u(r,n,i),name:"name",value:n.name,type:"text",placeholder:l("Integration Name...")})]}),t.jsx("br",{}),t.jsx(M,{formID:g,formFields:e,handleInput:r=>u(r,n,i),elasticEmailConf:n,setElasticEmailConf:i,isLoading:j,setIsLoading:E,setSnackbar:o}),t.jsx(_,{edit:!0,saveConfig:b,disabled:n.field_map.length<1}),t.jsx("br",{})]})}export{B as default};