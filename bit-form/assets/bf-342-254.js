var E=Object.defineProperty;var v=Object.getOwnPropertySymbols;var S=Object.prototype.hasOwnProperty,I=Object.prototype.propertyIsEnumerable;var g=(l,t,a)=>t in l?E(l,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):l[t]=a,o=(l,t)=>{for(var a in t||(t={}))S.call(t,a)&&g(l,a,t[a]);if(v)for(var a of v(t))I.call(t,a)&&g(l,a,t[a]);return l};import{u as L,r as N,j as e,_ as s,C as y,$}from"./main-803.js";import{t as z}from"./bf-741-188.js";import{T as P}from"./bf-936-121.js";import{A as U}from"./bf-553-401.js";import{N as _}from"./bf-880-402.js";import{e as B,d as D}from"./bf-933-352.js";import"./bf-45-72.js";import"./bf-928-75.js";import"./bf-179-77.js";function Q({formID:l,recruitConf:t,setRecruitConf:a,step:c,setstep:A,isLoading:w,setisLoading:m,setSnackbar:h,redirectLocation:R,isInfo:n}){const p=L($),{siteURL:k}=p,[x,T]=N.useState(!1),[i,j]=N.useState({dataCenter:"",clientId:"",clientSecret:""}),C=()=>{setTimeout(()=>{document.getElementById("btcd-settings-wrp").scrollTop=0},300),A(2),D(l,t,a,m,h)},r=d=>{const u=o({},t),b=o({},i);b[d.target.name]="",u[d.target.name]=d.target.value,j(b),a(u)};return e.jsxs(e.Fragment,{children:[e.jsx(P,{title:z.zohoRecruit.title,youTubeLink:z.zohoRecruit.link}),e.jsxs("div",{className:"btcd-stp-page",style:{width:c===1&&900,height:c===1&&"100%"},children:[e.jsx("div",{className:"mt-3",children:e.jsx("b",{children:s("Integration Name:")})}),e.jsx("input",{className:"btcd-paper-inp w-6 mt-1",onChange:r,name:"name",value:t.name,type:"text",placeholder:s("Integration Name..."),disabled:n}),e.jsx("div",{className:"mt-3",children:e.jsx("b",{children:s("Data Center:")})}),e.jsxs("select",{onChange:r,name:"dataCenter",value:t.dataCenter,className:"btcd-paper-inp w-6 mt-1",disabled:n,children:[e.jsx("option",{value:"",children:s("--Select a data center--")}),e.jsx("option",{value:"com",children:"zoho.com"}),e.jsx("option",{value:"eu",children:"zoho.eu"}),e.jsx("option",{value:"com.cn",children:"zoho.com.cn"}),e.jsx("option",{value:"in",children:"zoho.in"}),e.jsx("option",{value:"com.au",children:"zoho.com.au"})]}),e.jsx("div",{style:{color:"red"},children:i.dataCenter}),e.jsx("div",{className:"mt-3",children:e.jsx("b",{children:s("Homepage URL:")})}),e.jsx(y,{value:k,className:"field-key-cpy w-6 ml-0",readOnly:n}),e.jsx("div",{className:"mt-3",children:e.jsx("b",{children:s("Authorized Redirect URIs:")})}),e.jsx(y,{value:R||`${p.zohoRedirectURL}`,className:"field-key-cpy w-6 ml-0",readOnly:n}),e.jsxs("small",{className:"d-blk mt-5",children:[s("To get Client ID and SECRET , Please Visit")," ",e.jsx("a",{className:"btcd-link",href:`https://api-console.zoho.${(t==null?void 0:t.dataCenter)||"com"}/`,target:"_blank",rel:"noreferrer",children:s("Zoho API Console")})]}),e.jsx("div",{className:"mt-3",children:e.jsx("b",{children:s("Client id:")})}),e.jsx("input",{className:"btcd-paper-inp w-6 mt-1",onChange:r,name:"clientId",value:t.clientId,type:"text",placeholder:s("Client id..."),disabled:n}),e.jsx("div",{style:{color:"red"},children:i.clientId}),e.jsx("div",{className:"mt-3",children:e.jsx("b",{children:s("Client secret:")})}),e.jsx("input",{className:"btcd-paper-inp w-6 mt-1",onChange:r,name:"clientSecret",value:t.clientSecret,type:"text",placeholder:s("Client secret..."),disabled:n}),e.jsx("div",{style:{color:"red"},children:i.clientSecret}),!n&&e.jsxs(e.Fragment,{children:[e.jsx(U,{isAuthorized:x,isloading:w,handleAuthorize:()=>B(t,a,j,T,m,h)}),e.jsx("br",{}),e.jsx(_,{nextPageHandler:()=>C(),disabled:!x})]})]})]})}export{Q as default};