import{a as N,v as L,h as x,q as R,j as e,_ as n,a6 as _,g as j,bt as u,aE as P,ao as w}from"./main-601.js";import{S,T as D,a as I,b as K}from"./bf-275-111.js";import{s as y}from"./bf-587-141.js";import{F as l}from"./bf-990-142.js";import{S as k}from"./bf-184-110.js";import{F as m}from"./bf-494-179.js";import{F as E,b as H}from"./bf-504-93.js";import"./bf-833-79.js";import"./bf-635-81.js";import"./bf-409-72.js";import"./bf-443-82.js";import"./bf-285-80.js";import"./bf-548-69.js";import"./bf-807-84.js";import"./bf-579-107.js";import"./bf-583-108.js";import"./bf-737-109.js";import"./bf-542-112.js";import"./bf-333-113.js";import"./bf-218-114.js";import"./bf-432-115.js";import"./bf-743-71.js";import"./bf-209-178.js";import"./bf-753-130.js";import"./bf-187-143.js";function he(){var g;const{css:i}=N(),{fieldKey:s}=L(),[c,b]=x(P),[h,v]=x(w),a=R(h[s]),{theme:C,size:F}=a.config,z=(g=c==null?void 0:c.fields)==null?void 0:g[s],{fieldType:q,classes:T}=z,p=`.${s}-fld-wrp`,{"justify-content":$}=T[p]||"";function f(t,r){a.config[t]=r;const o=j(h,d=>{d[s]=a});v(o),u({event:`${t[0].toUpperCase()+t.slice(1)} changed to ${r} : ${a.adminLbl||s}`,type:`${t}_change`,state:{fields:o,fldKey:s}})}const A=(t,r)=>{const o=j(c,d=>{d.fields[s].classes[p].display="flex",d.fields[s].classes[p][r]=t});b(o),u({event:`Position alignment to "${t}" : ${a.adminLbl||s}`,type:"position_alignment_change",state:{styles:o,fldKey:s}})};return e.jsxs(e.Fragment,{children:[e.jsx(E,{title:"Field Settings",subtitle:a.typ,fieldKey:s}),e.jsx(H,{}),e.jsx(m,{}),e.jsx(S,{id:"thm-stng",title:n("Theme"),className:i(l.fieldSection),open:!0,children:e.jsx("div",{className:i(l.placeholder),children:e.jsxs("select",{"data-testid":"thm-slct",className:i(l.input),"aria-label":"Theme for ReCaptcha Field",placeholder:"Select Theme here...",value:C,onChange:t=>f("theme",t.target.value),children:[e.jsx("option",{value:"dark",children:n("Dark")}),e.jsx("option",{value:"light",children:n("Light")})]})})}),e.jsx(m,{}),e.jsx(S,{id:"siz-stng",title:n("Size"),className:i(l.fieldSection),open:!0,children:e.jsx("div",{className:i(l.placeholder),children:e.jsxs("select",{"data-testid":"siz-slct",className:i(l.input),"aria-label":"Size for ReCaptcha Field",placeholder:"Select Size here...",value:F,onChange:t=>f("size",t.target.value),children:[e.jsx("option",{value:"normal",children:n("Normal")}),e.jsx("option",{value:"compact",children:n("Compact")})]})})}),e.jsx(m,{}),e.jsx("div",{className:i(l.fieldSection),children:e.jsxs("div",{className:i(_.flxcb),children:[e.jsx("span",{className:i(y.label),children:"Position Alignment"}),e.jsx(k,{show:["icn"],tipPlace:"bottom",className:i(y.segment),options:[{icn:e.jsx(D,{size:"17"}),label:"left",tip:"Left"},{icn:e.jsx(I,{size:"17"}),label:"center",tip:"Center"},{icn:e.jsx(K,{size:"17"}),label:"right",tip:"Right"}],onChange:t=>A(t,"justify-content"),defaultActive:$})]})}),e.jsx(m,{})]})}export{he as default};