var w=Object.defineProperty;var p=Object.getOwnPropertySymbols;var y=Object.prototype.hasOwnProperty,C=Object.prototype.propertyIsEnumerable;var f=(s,e,t)=>e in s?w(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t,b=(s,e)=>{for(var t in e||(e={}))y.call(e,t)&&f(s,t,e[t]);if(p)for(var t of p(e))C.call(e,t)&&f(s,t,e[t]);return s};import{v as F,w as N,r as m,j as a,S as E}from"./main-495.js";import"./bf-566-72.js";import{S as P}from"./bf-113-121.js";import{b as L}from"./bf-27-77.js";import{I as T}from"./bf-671-332.js";import{N as _}from"./bf-691-402.js";import B from"./bf-675-260.js";import{h as D,c as g}from"./bf-387-391.js";import{A as M}from"./bf-107-392.js";import"./bf-516-75.js";import"./bf-922-188.js";import"./bf-982-401.js";import"./bf-925-363.js";function Z({formFields:s,setIntegration:e,integrations:t,allIntegURL:h}){const x=F(),{formID:c}=N(),[d,n]=m.useState(!1),[r,u]=m.useState(1),[S,o]=m.useState({show:!1}),A=[{key:"1",label:"Add/Update Subscriber"},{key:"2",label:"Delete Subscriber"}],j=[{key:"email",label:"Email",required:!0}],[i,l]=m.useState({name:"Acumbamail",type:"Acumbamail",mainAction:"",listId:"",auth_token:"",field_map:[{formField:"",acumbamailFormField:"email"}],addSubsCriberFields:j,allActions:A,address_field:[],actions:{}}),v=()=>{if(setTimeout(()=>{document.getElementById("btcd-settings-wrp").scrollTop=0},300),!g(i)){o({show:!0,msg:"Please map fields to continue."});return}i.listId!==""&&u(3)},I=()=>{L(t,e,h,i,x)};return a.jsxs("div",{children:[a.jsx(E,{snack:S,setSnackbar:o}),a.jsx("div",{className:"txt-center w-9 mt-2 cal-width",children:a.jsx(P,{step:3,active:r})}),a.jsx(B,{formID:c,acumbamailConf:i,setAcumbamailConf:l,step:r,setstep:u,isLoading:d,setIsLoading:n,setSnackbar:o}),a.jsxs("div",{className:"btcd-stp-page",style:b({},r===2&&{width:900,height:"auto",overflow:"visible"}),children:[a.jsx(M,{formFields:s,handleInput:k=>D(k,i,l,n,o,c),acumbamailConf:i,setAcumbamailConf:l,isLoading:d,setIsLoading:n,setSnackbar:o}),a.jsx(_,{nextPageHandler:()=>v(),disabled:!i.mainAction||!g(i)})]}),a.jsx(T,{step:r,saveConfig:()=>I()})]})}export{Z as default};