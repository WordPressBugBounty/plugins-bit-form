var S=Object.defineProperty;var v=Object.getOwnPropertySymbols;var I=Object.prototype.hasOwnProperty,L=Object.prototype.propertyIsEnumerable;var g=(r,t,a)=>t in r?S(r,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):r[t]=a,o=(r,t)=>{for(var a in t||(t={}))I.call(t,a)&&g(r,a,t[a]);if(v)for(var a of v(t))L.call(t,a)&&g(r,a,t[a]);return r};import{u as $,r as N,j as e,_ as l,C as z,$ as P}from"./main-495.js";import{t as y}from"./bf-922-188.js";import{T as U}from"./bf-113-121.js";import{A as _}from"./bf-982-401.js";import{N as B}from"./bf-691-402.js";import{f as D,b as O}from"./bf-508-344.js";import"./bf-566-72.js";import"./bf-516-75.js";import"./bf-27-77.js";function W({formID:r,deskConf:t,setDeskConf:a,step:d,setstep:A,isLoading:w,setisLoading:m,setSnackbar:h,redirectLocation:R,isInfo:i}){const p=$(P),{siteURL:T}=p,[x,C]=N.useState(!1),[s,u]=N.useState({dataCenter:"",clientId:"",clientSecret:""}),E=()=>{setTimeout(()=>{document.getElementById("btcd-settings-wrp").scrollTop=0},300),A(2),O(r,t,a,m,h)},n=c=>{const j=o({},t),b=o({},s);b[c.target.name]="",j[c.target.name]=c.target.value,u(b),a(j)};return e.jsxs(e.Fragment,{children:[e.jsx(U,{title:y.zohoDesk.title,youTubeLink:y.zohoDesk.link}),e.jsxs("div",{className:"btcd-stp-page",style:{width:d===1&&900,height:d===1&&"100%"},children:[e.jsx("div",{className:"mt-3",children:e.jsx("b",{children:l("Integration Name:")})}),e.jsx("input",{className:"btcd-paper-inp w-6 mt-1",onChange:n,name:"name",value:t.name,type:"text",placeholder:l("Integration Name..."),disabled:i}),e.jsx("div",{className:"mt-3",children:e.jsx("b",{children:l("Data Center:")})}),e.jsxs("select",{onChange:n,name:"dataCenter",value:t.dataCenter,className:"btcd-paper-inp w-6 mt-1",disabled:i,children:[e.jsx("option",{value:"",children:l("--Select a data center--")}),e.jsx("option",{value:"com",children:"zoho.com"}),e.jsx("option",{value:"eu",children:"zoho.eu"}),e.jsx("option",{value:"com.cn",children:"zoho.com.cn"}),e.jsx("option",{value:"in",children:"zoho.in"}),e.jsx("option",{value:"com.au",children:"zoho.com.au"})]}),e.jsx("div",{style:{color:"red"},children:s.dataCenter}),e.jsx("div",{className:"mt-3",children:e.jsx("b",{children:l("Homepage URL:")})}),e.jsx(z,{value:T,className:"field-key-cpy w-6 ml-0",readOnly:i}),e.jsx("div",{className:"mt-3",children:e.jsx("b",{children:l("Authorized Redirect URIs:")})}),e.jsx(z,{value:R||`${p.zohoRedirectURL}`,className:"field-key-cpy w-6 ml-0",readOnly:i}),e.jsxs("small",{className:"d-blk mt-5",children:[l("To get Client ID and SECRET , Please Visit")," ",e.jsx("a",{className:"btcd-link",href:`https://api-console.zoho.${(t==null?void 0:t.dataCenter)||"com"}/`,target:"_blank",rel:"noreferrer",children:l("Zoho API Console")})]}),e.jsx("div",{className:"mt-3",children:e.jsx("b",{children:l("Client id:")})}),e.jsx("input",{className:"btcd-paper-inp w-6 mt-1",onChange:n,name:"clientId",value:t.clientId,type:"text",placeholder:l("Client id..."),disabled:i}),e.jsx("div",{style:{color:"red"},children:s.clientId}),e.jsx("div",{className:"mt-3",children:e.jsx("b",{children:l("Client secret:")})}),e.jsx("input",{className:"btcd-paper-inp w-6 mt-1",onChange:n,name:"clientSecret",value:t.clientSecret,type:"text",placeholder:l("Client secret..."),disabled:i}),e.jsx("div",{style:{color:"red"},children:s.clientSecret}),!i&&e.jsxs(e.Fragment,{children:[e.jsx(_,{isAuthorized:x,isLoading:w,handleAuthorize:()=>D(t,a,u,C,m,h)}),e.jsx("br",{}),e.jsx(B,{nextPageHandler:()=>E(),disabled:!x})]})]})]})}export{W as default};