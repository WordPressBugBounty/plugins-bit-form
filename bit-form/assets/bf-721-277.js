import{w as g,v as u,r as s,j as e,S as k}from"./main-347.js";import"./bf-387-72.js";import{S as j}from"./bf-387-123.js";import{s as S,b as w}from"./bf-321-77.js";import{I as D}from"./bf-192-333.js";import{N as I}from"./bf-714-403.js";import W from"./bf-461-256.js";import{Z}from"./bf-35-360.js";import"./bf-353-75.js";import"./bf-534-189.js";import"./bf-586-402.js";import"./bf-185-359.js";import"./bf-672-336.js";function G({formFields:p,setIntegration:d,integrations:f,allIntegURL:l}){const h=g(),{formID:a}=u(),[i,n]=s.useState(!1),[o,m]=s.useState(1),[x,r]=s.useState({show:!1}),[t,c]=s.useState({name:"Zoho WorkDrive API",type:"Zoho WorkDrive",clientId:"",clientSecret:"",team:"",folder:"",folderMap:[],actions:{}});s.useEffect(()=>{window.opener&&S("zohoWorkDrive")},[]);const v=()=>{setTimeout(()=>{document.getElementById("btcd-settings-wrp").scrollTop=0},300),t.team!==""&&t.folder!==""&&m(3)};return e.jsxs("div",{children:[e.jsx(k,{snack:x,setSnackbar:r}),e.jsx("div",{className:"txt-center w-9 mt-2 cal-width",children:e.jsx(j,{step:3,active:o})}),e.jsx(W,{formID:a,workDriveConf:t,setWorkDriveConf:c,step:o,setstep:m,isLoading:i,setisLoading:n,setSnackbar:r}),e.jsxs("div",{className:"btcd-stp-page",style:{width:o===2&&900,height:o===2&&"100%"},children:[e.jsx(Z,{formID:a,formFields:p,workDriveConf:t,setWorkDriveConf:c,isLoading:i,setisLoading:n,setSnackbar:r}),e.jsx(I,{nextPageHandler:()=>v(),disabled:t.team===""||t.folder===""})]}),e.jsx(D,{step:o,saveConfig:()=>w(f,d,l,t,h)})]})}export{G as default};