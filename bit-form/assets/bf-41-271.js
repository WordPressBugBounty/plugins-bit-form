import{v as j,w as S,r as e,j as t,S as v}from"./main-478.js";import"./bf-35-72.js";import{S as M}from"./bf-75-121.js";import{s as w,b as I}from"./bf-861-77.js";import{I as b}from"./bf-569-330.js";import{N as Z}from"./bf-618-400.js";import y from"./bf-378-250.js";import{Z as N}from"./bf-897-345.js";import"./bf-665-75.js";import"./bf-934-187.js";import"./bf-221-399.js";import"./bf-5-344.js";function H({formFields:r,setIntegration:c,integrations:m,allIntegURL:p}){const l=j(),{formID:f}=S(),[h,x]=e.useState(!1),[s,a]=e.useState(1),[d,i]=e.useState({show:!1}),[o,n]=e.useState({name:"Zoho Mail API",type:"Zoho Mail",clientId:"",clientSecret:"",actions:{},to:"",cc:"",bcc:"",subject:"",body:""});e.useEffect(()=>{window.opener&&w("zohoMail")},[]);const u=g=>{a(g)};return t.jsxs("div",{children:[t.jsx(v,{snack:d,setSnackbar:i}),t.jsx("div",{className:"txt-center w-9 mt-2 cal-width",children:t.jsx(M,{step:3,active:s})}),t.jsx(y,{formID:f,mailConf:o,setMailConf:n,step:s,setstep:a,isLoading:h,setisLoading:x,setSnackbar:i}),t.jsxs("div",{className:"btcd-stp-page",style:{width:s===2&&900,height:s===2&&"100%"},children:[t.jsx(N,{formFields:r,mailConf:o,setMailConf:n}),t.jsx(Z,{nextPageHandler:()=>u(3)})]}),t.jsx(b,{step:s,saveConfig:()=>I(m,c,p,o,l)})]})}export{H as default};