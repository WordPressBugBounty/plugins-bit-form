import{v as j,w as S,r as e,j as t,S as v}from"./main-803.js";import"./bf-45-72.js";import{S as M}from"./bf-936-121.js";import{s as w,b as I}from"./bf-179-77.js";import{I as b}from"./bf-514-332.js";import{N as Z}from"./bf-880-402.js";import y from"./bf-987-251.js";import{Z as N}from"./bf-969-347.js";import"./bf-928-75.js";import"./bf-741-188.js";import"./bf-553-401.js";import"./bf-271-346.js";function H({formFields:r,setIntegration:c,integrations:m,allIntegURL:p}){const l=j(),{formID:f}=S(),[h,x]=e.useState(!1),[s,a]=e.useState(1),[d,i]=e.useState({show:!1}),[o,n]=e.useState({name:"Zoho Mail API",type:"Zoho Mail",clientId:"",clientSecret:"",actions:{},to:"",cc:"",bcc:"",subject:"",body:""});e.useEffect(()=>{window.opener&&w("zohoMail")},[]);const u=g=>{a(g)};return t.jsxs("div",{children:[t.jsx(v,{snack:d,setSnackbar:i}),t.jsx("div",{className:"txt-center w-9 mt-2 cal-width",children:t.jsx(M,{step:3,active:s})}),t.jsx(y,{formID:f,mailConf:o,setMailConf:n,step:s,setstep:a,isLoading:h,setisLoading:x,setSnackbar:i}),t.jsxs("div",{className:"btcd-stp-page",style:{width:s===2&&900,height:s===2&&"100%"},children:[t.jsx(N,{formFields:r,mailConf:o,setMailConf:n}),t.jsx(Z,{nextPageHandler:()=>u(3)})]}),t.jsx(b,{step:s,saveConfig:()=>I(m,c,p,o,l)})]})}export{H as default};