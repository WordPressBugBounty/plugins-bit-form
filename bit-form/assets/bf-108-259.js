var _=Object.defineProperty;var b=Object.getOwnPropertySymbols;var k=Object.prototype.hasOwnProperty,C=Object.prototype.propertyIsEnumerable;var g=(r,t,a)=>t in r?_(r,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):r[t]=a,n=(r,t)=>{for(var a in t||(t={}))k.call(t,a)&&g(r,a,t[a]);if(b)for(var a of b(t))C.call(t,a)&&g(r,a,t[a]);return r};import{r as N,u as E,j as e,_ as s,C as A,$ as O}from"./main-495.js";import{A as P}from"./bf-982-401.js";import{N as U}from"./bf-691-402.js";import{b as $,g as B}from"./bf-659-389.js";import"./bf-566-72.js";import"./bf-516-75.js";function G({flowID:r,oneDriveConf:t,setOneDriveConf:a,step:m,setStep:y,isLoading:v,setIsLoading:o,setSnackbar:S,redirectLocation:z,isInfo:l}){const[p,w]=N.useState(!1),[c,h]=N.useState({clientId:"",clientSecret:""}),x=E(O),{siteURL:R}=x,I=()=>{B(r,t,a,o),y(2),document.querySelector(".btcd-s-wrp").scrollTop=0},i=d=>{const u=n({},t),j=n({},c);j[d.target.name]="",u[d.target.name]=d.target.value,h(j),a(u)};return e.jsxs("div",{className:"btcd-stp-page",style:{width:m===1&&900,height:m===1&&"100%"},children:[e.jsx("div",{className:"mt-3",children:e.jsx("b",{children:s("Integration Name:")})}),e.jsx("input",{className:"btcd-paper-inp w-6 mt-1",onChange:i,name:"name",value:t.name,type:"text",placeholder:s("Integration Name..."),disabled:l}),e.jsx("div",{className:"mt-3",children:e.jsx("b",{children:s("Homepage URL:")})}),e.jsx(A,{value:R,className:"field-key-cpy w-6 ml-0",readOnly:l,setSnackbar:S}),e.jsx("div",{className:"mt-3",children:e.jsx("b",{children:s("Authorized Redirect URIs:")})}),e.jsx(A,{value:z||`${x.oneDriveRedirectURL}`,className:"field-key-cpy w-6 ml-0",readOnly:l}),e.jsxs("small",{className:"d-blk mt-3",children:[s("To Get Client Id & Secret, Please Visit")," ",e.jsx("a",{className:"btcd-link",href:"https://portal.azure.com/#blade/Microsoft_AAD_RegisteredApps/ApplicationsListBlade",target:"_blank",rel:"noreferrer",children:s("Azure Portal")})]}),e.jsx("div",{className:"mt-3",children:e.jsx("b",{children:s("OneDrive Client Id:")})}),e.jsx("input",{className:"btcd-paper-inp w-6 mt-1",onChange:i,name:"clientId",value:t.clientId,type:"text",placeholder:s("Client Id..."),disabled:l}),e.jsx("div",{style:{color:"red"},children:c.clientId}),e.jsx("div",{className:"mt-3",children:e.jsx("b",{children:s("OneDrive Client Secret:")})}),e.jsx("input",{className:"btcd-paper-inp w-6 mt-1",onChange:i,name:"clientSecret",value:t.clientSecret,type:"text",placeholder:s("Client Secret..."),disabled:l}),e.jsx("div",{style:{color:"red"},children:c.clientSecret}),!l&&e.jsxs(e.Fragment,{children:[e.jsx(P,{isAuthorized:p,isLoading:v,handleAuthorize:()=>$(t,a,w,o,h)}),e.jsx("br",{}),e.jsx(U,{nextPageHandler:()=>I(),disabled:!p})]})]})}export{G as default};