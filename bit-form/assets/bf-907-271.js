var T=Object.defineProperty;var x=Object.getOwnPropertySymbols;var P=Object.prototype.hasOwnProperty,f=Object.prototype.propertyIsEnumerable;var b=(t,s,a)=>s in t?T(t,s,{enumerable:!0,configurable:!0,writable:!0,value:a}):t[s]=a,l=(t,s)=>{for(var a in s||(s={}))P.call(s,a)&&b(t,a,s[a]);if(x)for(var a of x(s))f.call(s,a)&&b(t,a,s[a]);return t};import{r as j,j as e,_ as r}from"./main-232.js";import{t as v}from"./bf-917-198.js";import{N as z}from"./bf-755-404.js";import{T as I}from"./bf-173-135.js";import{A as _}from"./bf-918-402.js";import{N as M}from"./bf-446-403.js";import{m as S}from"./bf-408-398.js";import"./bf-85-192.js";/* empty css          */import"./bf-670-125.js";import"./bf-348-75.js";import"./bf-106-80.js";import"./bf-678-70.js";function U({mailerLiteConf:t,setMailerLiteConf:s,step:a,setstep:k,isLoading:N,setIsLoading:g,isInfo:n}){const[d,A]=j.useState(!1),[c,m]=j.useState({name:"",auth_token:""}),y=()=>{t!=null&&t.default,k(2),document.querySelector(".btcd-s-wrp").scrollTop=0},i=o=>{const p=l({},t),u=l({},c);u[o.target.name]="",p[o.target.name]=o.target.value,m(u),s(p)},h=t.version==="v2"?"https://dashboard.mailerlite.com/integrations/api":"https://app.mailerlite.com/integrations/api/",w=`
    <h4> Step of generate API token:</h4>
    <ul>
      <li>Goto <a href=${h}>Generate API Token</a></li>
      <li>Copy the <b>Token</b> and paste into <b>API Token</b> field of your authorization form.</li>
      <li>Finally, click <b>Authorize</b> button.</li>
  </ul>
  `;return e.jsxs("div",{className:"btcd-stp-page",style:{width:a===1&&900,height:a===1&&"auto"},children:[e.jsx(I,{title:v.mailerlite.title,youTubeLink:v.mailerlite.link}),e.jsx("div",{className:"mt-3",children:e.jsx("b",{children:r("Integration Name:")})}),e.jsx("input",{className:"btcd-paper-inp w-6 mt-1",onChange:i,name:"name",value:t.name,type:"text",placeholder:r("Integration Name..."),disabled:n}),e.jsx("div",{className:"mt-3",children:e.jsx("b",{children:r("Select Version:")})}),e.jsxs("div",{className:"flex items-center w-6 mt-3",children:[e.jsx("input",{id:"MailerLiteClassic",type:"radio",name:"version",value:"v1",className:"hidden",checked:t.version==="v1",onChange:i}),e.jsxs("label",{for:"MailerLiteClassic",children:[e.jsx("span",{className:"w-4 h-4 inline-block mr-1 border border-grey"}),"MailerLite Classic"]})]}),e.jsxs("div",{className:"flex items-center mr-4 mt-2 mb-4",children:[e.jsx("input",{id:"MailerLiteNew",type:"radio",name:"version",value:"v2",className:"hidden",checked:t.version==="v2",onChange:i}),e.jsxs("label",{for:"MailerLiteNew",children:[e.jsx("span",{className:"w-4 h-4 inline-block mr-1 border border-grey"}),"MailerLite New"]})]}),e.jsxs("small",{className:"d-blk mt-3",children:[r("To Get API token, Please Visit")," ",e.jsx("a",{className:"btcd-link",href:h,target:"_blank",rel:"noreferrer",children:r("MailerLite API Token")})]}),e.jsx("div",{className:"mt-3",children:e.jsx("b",{children:r("API Token:")})}),e.jsx("input",{className:"btcd-paper-inp w-6 mt-1",onChange:i,name:"auth_token",value:t.auth_token,type:"text",placeholder:r("API Token..."),disabled:n}),e.jsx("div",{style:{color:"red",fontSize:"15px"},children:c.auth_token}),!n&&e.jsxs("div",{children:[e.jsx(_,{isAuthorized:d,isLoading:N,disabled:t.version===void 0||t.version==="",handleAuthorize:()=>S(t,s,m,A,g,"authorization")}),e.jsx("br",{}),e.jsx(M,{nextPageHandler:()=>y(),disabled:!d})]}),e.jsx(z,{note:w})]})}export{U as default};