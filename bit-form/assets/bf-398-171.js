import{a as N,w,h as x,q as L,j as e,_ as n,x as R,g as j,bk as u,aw as _,ag as P}from"./main-396.js";import{S,T as D,a as k,b as I}from"./bf-482-112.js";import{s as y}from"./bf-536-144.js";import{F as l}from"./bf-108-145.js";import{S as K}from"./bf-834-111.js";import{F as m}from"./bf-34-181.js";import{F as H,b as q}from"./bf-745-94.js";import"./bf-371-135.js";import"./bf-245-84.js";import"./bf-470-75.js";import"./bf-754-116.js";import"./bf-75-72.js";import"./bf-577-85.js";import"./bf-672-108.js";import"./bf-425-109.js";import"./bf-852-110.js";import"./bf-103-113.js";import"./bf-41-114.js";import"./bf-667-115.js";import"./bf-464-117.js";import"./bf-419-74.js";import"./bf-733-180.js";import"./bf-533-132.js";import"./bf-134-146.js";function pe(){var g;const{css:i}=N(),{fieldKey:s}=w(),[c,b]=x(_),[h,v]=x(P),a=L(h[s]),{theme:C,size:F}=a.config,z=(g=c==null?void 0:c.fields)==null?void 0:g[s],{fieldType:B,classes:T}=z,p=`.${s}-fld-wrp`,{"justify-content":$}=T[p]||"";function f(t,r){a.config[t]=r;const o=j(h,d=>{d[s]=a});v(o),u({event:`${t[0].toUpperCase()+t.slice(1)} changed to ${r} : ${a.adminLbl||s}`,type:`${t}_change`,state:{fields:o,fldKey:s}})}const A=(t,r)=>{const o=j(c,d=>{d.fields[s].classes[p].display="flex",d.fields[s].classes[p][r]=t});b(o),u({event:`Position alignment to "${t}" : ${a.adminLbl||s}`,type:"position_alignment_change",state:{styles:o,fldKey:s}})};return e.jsxs(e.Fragment,{children:[e.jsx(H,{title:"Field Settings",subtitle:a.typ,fieldKey:s}),e.jsx(q,{}),e.jsx(m,{}),e.jsx(S,{id:"thm-stng",title:n("Theme"),className:i(l.fieldSection),open:!0,children:e.jsx("div",{className:i(l.placeholder),children:e.jsxs("select",{"data-testid":"thm-slct",className:i(l.input),"aria-label":"Theme for ReCaptcha Field",placeholder:"Select Theme here...",value:C,onChange:t=>f("theme",t.target.value),children:[e.jsx("option",{value:"dark",children:n("Dark")}),e.jsx("option",{value:"light",children:n("Light")})]})})}),e.jsx(m,{}),e.jsx(S,{id:"siz-stng",title:n("Size"),className:i(l.fieldSection),open:!0,children:e.jsx("div",{className:i(l.placeholder),children:e.jsxs("select",{"data-testid":"siz-slct",className:i(l.input),"aria-label":"Size for ReCaptcha Field",placeholder:"Select Size here...",value:F,onChange:t=>f("size",t.target.value),children:[e.jsx("option",{value:"normal",children:n("Normal")}),e.jsx("option",{value:"compact",children:n("Compact")})]})})}),e.jsx(m,{}),e.jsx("div",{className:i(l.fieldSection),children:e.jsxs("div",{className:i(R.flxcb),children:[e.jsx("span",{className:i(y.label),children:"Position Alignment"}),e.jsx(K,{show:["icn"],tipPlace:"bottom",className:i(y.segment),options:[{icn:e.jsx(D,{size:"17"}),label:"left",tip:"Left"},{icn:e.jsx(k,{size:"17"}),label:"center",tip:"Center"},{icn:e.jsx(I,{size:"17"}),label:"right",tip:"Right"}],onChange:t=>A(t,"justify-content"),defaultActive:$})]})}),e.jsx(m,{})]})}export{pe as default};