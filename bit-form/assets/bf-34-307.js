var _=Object.defineProperty;var j=Object.getOwnPropertySymbols;var I=Object.prototype.hasOwnProperty,b=Object.prototype.propertyIsEnumerable;var v=(s,e,t)=>e in s?_(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t,L=(s,e)=>{for(var t in e||(e={}))I.call(e,t)&&v(s,t,e[t]);if(j)for(var t of j(e))b.call(e,t)&&v(s,t,e[t]);return s};import{v as k,r as m,j as a,S as C,d}from"./main-803.js";import"./bf-45-72.js";import{S as F}from"./bf-936-121.js";import{b as N}from"./bf-179-77.js";import{I as w}from"./bf-514-332.js";import{N as P}from"./bf-880-402.js";import E from"./bf-200-263.js";import{h as T,c as q}from"./bf-334-397.js";import{M as z}from"./bf-558-398.js";import"./bf-928-75.js";import"./bf-741-188.js";import"./bf-152-403.js";import"./bf-553-401.js";import"./bf-199-192.js";function $({formFields:s,setIntegration:e,integrations:t,allIntegURL:f}){const u=k(),[g,p]=m.useState(!1),[r,h]=m.useState(1),[S,l]=m.useState({show:!1}),[i,c]=m.useState({name:"MailerLite",type:"MailerLite",auth_token:"",field_map:[{formField:"",mailerLiteFormField:"email"}],mailer_lite_type:"",mailerLiteFields:[],groups:[],group_ids:[],actions:{}}),M=()=>{p(!0),N(t,e,f,i,u,"","").then(n=>{var x;n.success?(d.success((x=n.data)==null?void 0:x.msg),u(f)):d.error(n.data||n)})},y=o=>{if(!q(i)){d.error("Please map mandatory fields");return}i.field_map.length>0&&h(o),document.querySelector(".btcd-s-wrp").scrollTop=0};return a.jsxs("div",{children:[a.jsx(C,{snack:S,setSnackbar:l}),a.jsx("div",{className:"txt-center mt-2",children:a.jsx(F,{step:3,active:r})}),a.jsx(E,{mailerLiteConf:i,setMailerLiteConf:c,step:r,setstep:h,isLoading:g,setIsLoading:p,setSnackbar:l}),a.jsxs("div",{className:"btcd-stp-page",style:L({},r===2&&{width:900,height:"auto",overintegrations:"visible"}),children:[a.jsx(z,{formFields:s,handleInput:o=>T(o,i,c),mailerLiteConf:i,setMailerLiteConf:c,isLoading:g,setIsLoading:p,setSnackbar:l}),a.jsx(P,{nextPageHandler:()=>y(3)})]}),a.jsx(w,{step:r,saveConfig:()=>M()})]})}export{$ as default};