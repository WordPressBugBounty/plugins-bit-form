var f=Object.defineProperty;var b=Object.getOwnPropertySymbols;var I=Object.prototype.hasOwnProperty,R=Object.prototype.propertyIsEnumerable;var g=(l,t,i)=>t in l?f(l,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):l[t]=i,m=(l,t)=>{for(var i in t||(t={}))I.call(t,i)&&g(l,i,t[i]);if(b)for(var i of b(t))R.call(t,i)&&g(l,i,t[i]);return l};import{u as S,r as N,j as e,_ as a,C as y,$ as L}from"./main-232.js";import{t as v}from"./bf-917-198.js";import{T as P}from"./bf-173-135.js";import{A as _}from"./bf-918-402.js";import{N as $}from"./bf-446-403.js";import{b as B,r as M}from"./bf-489-365.js";/* empty css          */import"./bf-670-125.js";import"./bf-348-75.js";import"./bf-106-80.js";import"./bf-678-70.js";function X({formID:l,sheetConf:t,setSheetConf:i,step:d,setstep:C,isLoading:A,setisLoading:o,setSnackbar:p,redirectLocation:w,isInfo:r}){const z=S(L),{siteURL:k}=z,[h,T]=N.useState(!1),[s,x]=N.useState({dataCenter:"",clientId:"",clientSecret:""}),E=()=>{setTimeout(()=>{document.getElementById("btcd-settings-wrp").scrollTop=0},300),C(2),M(l,t,i,o,p)},n=c=>{const u=m({},t),j=m({},s);j[c.target.name]="",u[c.target.name]=c.target.value,x(j),i(u)};return e.jsxs(e.Fragment,{children:[e.jsx(P,{title:v.mailChimp.title,youTubeLink:v.mailChimp.link}),e.jsxs("div",{className:"btcd-stp-page",style:{width:d===1&&900,height:d===1&&"100%"},children:[e.jsx("div",{className:"mt-3",children:e.jsx("b",{children:a("Integration Name:")})}),e.jsx("input",{className:"btcd-paper-inp w-6 mt-1",onChange:n,name:"name",value:t.name,type:"text",placeholder:a("Integration Name..."),disabled:r}),e.jsx("div",{className:"mt-3",children:e.jsx("b",{children:a("Homepage URL:")})}),e.jsx(y,{value:k,className:"field-key-cpy w-6 ml-0",readOnly:r}),e.jsx("div",{className:"mt-3",children:e.jsx("b",{children:a("Authorized Redirect URIs:")})}),e.jsx(y,{value:w||`${window.location.href}`,className:"field-key-cpy w-6 ml-0",readOnly:r}),e.jsxs("small",{className:"d-blk mt-5",children:[a("To get Client ID and SECRET , Please Visit")," ",e.jsx("a",{className:"btcd-link",href:"https://us7.admin.mailchimp.com/account/oauth2/",target:"_blank",rel:"noreferrer",children:a("Mail Chimp API Console")})]}),e.jsx("div",{className:"mt-3",children:e.jsx("b",{children:a("Client id:")})}),e.jsx("input",{className:"btcd-paper-inp w-6 mt-1",onChange:n,name:"clientId",value:t.clientId,type:"text",placeholder:a("Client id..."),disabled:r}),e.jsx("div",{style:{color:"red",fontSize:"15px"},children:s.clientId}),e.jsx("div",{className:"mt-3",children:e.jsx("b",{children:a("Client secret:")})}),e.jsx("input",{className:"btcd-paper-inp w-6 mt-1",onChange:n,name:"clientSecret",value:t.clientSecret,type:"text",placeholder:a("Client secret..."),disabled:r}),e.jsx("div",{style:{color:"red",fontSize:"15px"},children:s.clientSecret}),!r&&e.jsxs(e.Fragment,{children:[e.jsx(_,{isAuthorized:h,isLoading:A,handleAuthorize:()=>B("mailChimp","mChimp",t,i,x,T,o,p)}),e.jsx("br",{}),e.jsx($,{nextPageHandler:()=>E(),disabled:!h})]})]})]})}export{X as default};