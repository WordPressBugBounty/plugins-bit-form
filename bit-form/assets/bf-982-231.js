var N=Object.defineProperty;var c=Object.getOwnPropertySymbols;var k=Object.prototype.hasOwnProperty,y=Object.prototype.propertyIsEnumerable;var p=(s,t,e)=>t in s?N(s,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):s[t]=e,u=(s,t)=>{for(var e in t||(t={}))k.call(t,e)&&p(s,e,t[e]);if(c)for(var e of c(t))y.call(t,e)&&p(s,e,t[e]);return s};import{w as C,v as _,r as n,j as a,S as E,_ as d}from"./main-601.js";import{b as z}from"./bf-92-74.js";import{I as A}from"./bf-242-329.js";import{h as f,c as P}from"./bf-836-394.js";import{M as D}from"./bf-443-395.js";import"./bf-548-69.js";import"./bf-409-72.js";function K({formFields:s,setIntegration:t,integrations:e,allIntegURL:h}){const x=C(),{id:l,formID:g}=_(),[r,i]=n.useState(u({},e[l])),[j,I]=n.useState(!1),[S,o]=n.useState({show:!1}),[b,v]=n.useState(!1),[L,w]=n.useState({name:"",auth_token:""}),M=()=>{if(!P(r)){o({show:!0,msg:d("Please map mandatory fields")});return}z(e,t,h,r,x,l,1)};return a.jsxs("div",{style:{width:900},children:[a.jsx(E,{snack:S,setSnackbar:o}),a.jsxs("div",{className:"flx mt-3",children:[a.jsx("b",{className:"wdt-200 d-in-b",children:d("Integration Name:")}),a.jsx("input",{className:"btcd-paper-inp w-5",onChange:m=>f(m,r,i),name:"name",value:r.name,type:"text",placeholder:d("Integration Name...")})]}),a.jsx("br",{}),a.jsx(D,{formID:g,formFields:s,handleInput:m=>f(m,r,i),mailerLiteConf:r,setMailerLiteConf:i,isLoading:j,setIsLoading:I,setSnackbar:o,isAuthorized:b,setisAuthorized:v,error:L,setError:w}),a.jsx(A,{edit:!0,saveConfig:M,disabled:r.field_map.length<1}),a.jsx("br",{})]})}export{K as default};