var N=Object.defineProperty;var f=Object.getOwnPropertySymbols;var y=Object.prototype.hasOwnProperty,C=Object.prototype.propertyIsEnumerable;var h=(a,t,e)=>t in a?N(a,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):a[t]=e,x=(a,t)=>{for(var e in t||(t={}))y.call(t,e)&&h(a,e,t[e]);if(f)for(var e of f(t))C.call(t,e)&&h(a,e,t[e]);return a};import{w as k,v as R,r,j as s,S as _,_ as d}from"./main-365.js";import{b as E}from"./bf-891-74.js";import{I as L}from"./bf-902-329.js";import{h as g,c as Z}from"./bf-907-349.js";import{Z as M}from"./bf-720-350.js";import"./bf-621-72.js";import"./bf-239-69.js";function G({formFields:a,setIntegration:t,integrations:e,allIntegURL:j}){const b=k(),{id:l,formID:p}=R(),[n,i]=r.useState(x({},e[l])),[I,u]=r.useState(!1),[S,o]=r.useState({show:!1}),[m,v]=r.useState(0),w=()=>{if(!Z(n)){o({show:!0,msg:d("Please map mandatory fields")});return}E(e,t,j,n,b,l,1)};return s.jsxs("div",{style:{width:900},children:[s.jsx(_,{snack:S,setSnackbar:o}),s.jsxs("div",{className:"flx mt-3",children:[s.jsx("b",{className:"wdt-100 d-in-b",children:d("Integration Name:")}),s.jsx("input",{className:"btcd-paper-inp w-7",onChange:c=>g(c,m,n,i),name:"name",value:n.name,type:"text",placeholder:d("Integration Name...")})]}),s.jsx("br",{}),s.jsx("br",{}),s.jsx(M,{tab:m,settab:v,formID:p,formFields:a,handleInput:c=>g(c,m,n,i,p,u,o),recruitConf:n,setRecruitConf:i,isLoading:I,setisLoading:u,setSnackbar:o}),s.jsx(L,{edit:!0,saveConfig:w,disabled:n.module===""||n.field_map.length<1}),s.jsx("br",{})]})}export{G as default};