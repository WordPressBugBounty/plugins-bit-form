var k=Object.defineProperty,A=Object.defineProperties;var I=Object.getOwnPropertyDescriptors;var T=Object.getOwnPropertySymbols;var P=Object.prototype.hasOwnProperty,_=Object.prototype.propertyIsEnumerable;var $=(t,s,l)=>s in t?k(t,s,{enumerable:!0,configurable:!0,writable:!0,value:l}):t[s]=l,d=(t,s)=>{for(var l in s||(s={}))P.call(s,l)&&$(t,l,s[l]);if(T)for(var l of T(s))_.call(s,l)&&$(t,l,s[l]);return t},c=(t,s)=>A(t,I(s));import{r,h as H,u as N,dO as O,w as R,v as D,a as G,j as e,aM as L,_ as n,N as Q,b as g,ap as V,aQ as W,$ as q,g as w}from"./main-478.js";import{B as z,S as J,T as K}from"./bf-35-72.js";import"./bf-665-75.js";function ee(){var y;const[t,s]=r.useState({title:"New Template",sub:"Email Subject",body:"Email Body"}),[l,f]=H(V),p=N(W),[u]=r.useState(()=>p.filter(a=>!O.includes(a.typ))),[v,F]=r.useState(!1),{formType:h,formID:m}=R(),S=D(),{css:b}=G(),M=N(q),{isPro:x}=M,C=a=>{s(i=>w(i,o=>{o.body=a}))},j=({target:{name:a,value:i}})=>{s(o=>c(d({},o),{[a]:i}))},E=()=>{const a=w(l,i=>{i.push(t),i.push({updateTem:1})});f(a),S(`/form/settings/${h}/${m}/email-templates`)},B=({target:{value:a}})=>{s(i=>c(d({},i),{sub:i.sub+a})),setTimeout(()=>{a=""},100)};return e.jsxs("div",{style:{width:900},children:[e.jsx(L,{show:v,setModal:F,title:n("Browse Template"),children:e.jsx("h4",{className:"txt-dp",children:n("Email Templates Coming soon")})}),e.jsxs(Q,{to:`/form/settings/${h}/${m}/email-templates`,className:`${b(g.btn)} btcd-btn-o-gray`,children:[e.jsx(z,{className:"mr-1"}),n("Back")]}),e.jsx("button",{id:"secondary-update-btn",onClick:E,className:`${b(g.btn)} blue f-right`,type:"button",children:n("Save Template")}),e.jsxs("div",{className:"mt-3 flx",children:[e.jsxs("b",{style:{width:103},children:[n("Template Name:")," "]}),e.jsx("input",{onChange:j,name:"title",type:"text",className:"btcd-paper-inp w-9",placeholder:"Name",value:t.title})]}),e.jsxs("div",{className:"mt-3 flx",children:[e.jsx("b",{style:{width:100},children:"Subject:"}),e.jsx("input",{onChange:j,name:"sub",type:"text",className:"btcd-paper-inp w-7",placeholder:"Email Subject Here",value:t.sub}),e.jsxs("select",{onChange:B,className:"btcd-paper-inp ml-2",style:{width:150},children:[e.jsx("option",{value:"",children:n("Add field")}),e.jsx("optgroup",{label:"Form Fields",children:u!==null&&u.map(a=>!a.type.match(/^(file-up|recaptcha)$/)&&e.jsx("option",{value:`\${${a.key}}`,children:a.name},a.key))}),e.jsx("optgroup",{label:`General Smart Codes ${x?"":"(PRO)"}`,children:x&&((y=J)==null?void 0:y.map(a=>e.jsx("option",{value:`\${${a.name}}`,children:a.label},`ff-rm-${a.name}`)))})]})]}),e.jsxs("div",{className:"mt-3",children:[e.jsx("b",{children:n("Body:")}),e.jsx("label",{htmlFor:`mail-tem-${m}`,className:"mt-2 w-10",children:e.jsx(K,{id:`mail-tem-${m}`,formFields:p,value:t.body,onChangeHandler:C,width:"100%",mapAllFieldWithTable:!0,mapAllField:!0})})]})]})}export{ee as default};