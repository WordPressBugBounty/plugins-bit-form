import{v as S,w as j,r,j as t,S as C,_ as w}from"./main-478.js";import"./bf-35-72.js";import{S as I}from"./bf-75-121.js";import{s as v,b as y}from"./bf-861-77.js";import{I as Z}from"./bf-569-330.js";import{N as k}from"./bf-618-400.js";import N from"./bf-872-247.js";import{h as P,c as b}from"./bf-146-338.js";import{Z as E}from"./bf-268-339.js";import"./bf-665-75.js";import"./bf-934-187.js";import"./bf-221-399.js";import"./bf-867-82.js";import"./bf-700-333.js";function q({formFields:p,setIntegration:d,integrations:l,allIntegURL:f}){const h=S(),{formID:a}=j(),[m,n]=r.useState(!1),[e,c]=r.useState(1),[u,o]=r.useState({show:!1}),[s,i]=r.useState({name:"Zoho Creator API",type:"Zoho Creator",clientId:"",clientSecret:"",accountOwner:"",field_map:[{formField:"",zohoFormField:""}],actions:{}});r.useEffect(()=>{window.opener&&v("zohoCreator")},[]);const x=()=>{if(setTimeout(()=>{document.getElementById("btcd-settings-wrp").scrollTop=0},300),!b(s)){o({show:!0,msg:w("Please map mandatory fields")});return}c(3)};return t.jsxs("div",{children:[t.jsx(C,{snack:u,setSnackbar:o}),t.jsx("div",{className:"txt-center w-9 mt-2 cal-width",children:t.jsx(I,{step:3,active:e})}),t.jsx(N,{formID:a,creatorConf:s,setCreatorConf:i,step:e,setStep:c,isLoading:m,setisLoading:n,setSnackbar:o}),t.jsxs("div",{className:"btcd-stp-page",style:{width:e===2&&900,height:e===2&&"100%"},children:[t.jsx(E,{formID:a,formFields:p,handleInput:g=>P(g,s,i,a,n,o),creatorConf:s,setCreatorConf:i,isLoading:m,setisLoading:n,setSnackbar:o}),t.jsx(k,{nextPageHandler:()=>x()})]}),t.jsx(Z,{step:e,saveConfig:()=>y(l,d,f,s,h)})]})}export{q as default};