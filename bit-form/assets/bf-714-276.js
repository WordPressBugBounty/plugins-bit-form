import{w as j,v,r as o,j as t,S as w}from"./main-640.js";import"./bf-137-72.js";import{S as I}from"./bf-952-123.js";import{b as Z}from"./bf-534-77.js";import{I as N}from"./bf-311-333.js";import{N as b}from"./bf-985-403.js";import k from"./bf-501-255.js";import{s as y,r as P}from"./bf-287-357.js";import{Z as E}from"./bf-951-358.js";import"./bf-662-75.js";import"./bf-520-189.js";import"./bf-508-402.js";import"./bf-102-80.js";function F({formFields:g,setIntegration:d,integrations:h,allIntegURL:S}){const l=j(),{formID:i}=v(),[m,r]=o.useState(!1),[s,p]=o.useState(1),[x,a]=o.useState({show:!1}),[e,n]=o.useState({name:"Zoho Sign API",type:"Zoho Sign",clientId:"",clientSecret:""});o.useEffect(()=>{window.opener&&y("zohoSign")},[]);const u=c=>{var f;c===2&&((f=e==null?void 0:e.default)!=null&&f.templates||P(i,e,n,r,a)),p(c)};return t.jsxs("div",{children:[t.jsx(w,{snack:x,setSnackbar:a}),t.jsx("div",{className:"txt-center w-9 mt-2 cal-width",children:t.jsx(I,{step:3,active:s})}),t.jsx(k,{formID:i,signConf:e,setSignConf:n,step:s,setstep:p,isLoading:m,setisLoading:r,setSnackbar:a}),t.jsxs("div",{className:"btcd-stp-page",style:{width:s===2&&900,height:s===2&&"100%"},children:[t.jsx(E,{formID:i,formFields:g,signConf:e,setSignConf:n,isLoading:m,setisLoading:r,setSnackbar:a}),t.jsx(b,{nextPageHandler:()=>u(3),disabled:e.template===""})]}),t.jsx(N,{step:s,saveConfig:()=>Z(h,d,S,e,l)})]})}export{F as default};