var y=Object.defineProperty;var d=Object.getOwnPropertySymbols;var N=Object.prototype.hasOwnProperty,b=Object.prototype.propertyIsEnumerable;var f=(t,s,e)=>s in t?y(t,s,{enumerable:!0,configurable:!0,writable:!0,value:e}):t[s]=e,u=(t,s)=>{for(var e in s||(s={}))N.call(s,e)&&f(t,e,s[e]);if(d)for(var e of d(s))b.call(s,e)&&f(t,e,s[e]);return t};import{w as I,r,a as w,j as a,S as F,B as _,a3 as C,_ as L,d as q}from"./main-65.js";import"./bf-874-72.js";import{B}from"./bf-872-75.js";import{S as M}from"./bf-49-123.js";import{b as P}from"./bf-364-77.js";import{I as R}from"./bf-731-333.js";import T from"./bf-835-241.js";import{h as z,c as A}from"./bf-370-371.js";import{E as D}from"./bf-962-372.js";import"./bf-821-189.js";import"./bf-123-402.js";import"./bf-342-403.js";function ss({formFields:t,setIntegration:s,integrations:e,allIntegURL:E}){const h=I(),[m,n]=r.useState(!1),[l,p]=r.useState(1),[x,g]=r.useState({show:!1}),{css:j}=w(),v=[{key:"Email",label:"Email",required:!0},{key:"FirstName",label:"FirstName",required:!1},{key:"LastName",label:"LastName",required:!1}],[i,o]=r.useState({name:"ElasticEmail",type:"ElasticEmail",api_key:"",field_map:[{formField:"",elasticEmailField:""}],actions:{},elasticEmailFields:v}),S=()=>{P(e,s,E,i,h)},k=c=>{if(!A(i)){q.error("Please map mandatory fields");return}i.field_map.length>0&&p(c)};return document.querySelector(".btcd-s-wrp").scrollTop=0,a.jsxs("div",{children:[a.jsx(F,{snack:x,setSnackbar:g}),a.jsx("div",{className:"txt-center w-9 mt-2 cal-width",children:a.jsx(M,{step:3,active:l})}),a.jsx(T,{elasticEmailConf:i,setElasticEmailConf:o,step:l,setstep:p,isLoading:m,setIsLoading:n}),a.jsxs("div",{className:"btcd-stp-page",style:u({},l===2&&{width:900,height:"auto",overflow:"visible"}),children:[a.jsx(D,{formFields:t,handleInput:c=>z(c,i,o),elasticEmailConf:i,setElasticEmailConf:o,isLoading:m,setIsLoading:n}),a.jsxs(_,{variant:"success",onClick:()=>k(3),className:j(C.ftRight),children:[L("Next"),a.jsx(B,{className:"ml-1 rev-icn"})]})]}),a.jsx(R,{step:l,saveConfig:()=>S()})]})}export{ss as default};