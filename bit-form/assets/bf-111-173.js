import{a as N,v as L,h as x,q as R,j as e,_ as n,a3 as _,g as j,bq as u,aB as P,al as w}from"./main-347.js";import{S,T as D,a as I,b as K}from"./bf-582-115.js";import{s as y}from"./bf-325-145.js";import{F as l}from"./bf-936-146.js";import{S as k}from"./bf-297-114.js";import{F as m}from"./bf-724-183.js";import{F as q,b as B}from"./bf-166-97.js";import"./bf-11-82.js";import"./bf-203-84.js";import"./bf-353-75.js";import"./bf-84-85.js";import"./bf-381-83.js";import"./bf-387-72.js";import"./bf-762-88.js";import"./bf-432-111.js";import"./bf-684-112.js";import"./bf-63-113.js";import"./bf-721-116.js";import"./bf-978-117.js";import"./bf-799-118.js";import"./bf-13-119.js";import"./bf-801-74.js";import"./bf-531-182.js";import"./bf-584-134.js";import"./bf-719-147.js";function he(){var g;const{css:i}=N(),{fieldKey:s}=L(),[c,b]=x(P),[h,v]=x(w),a=R(h[s]),{theme:C,size:F}=a.config,z=(g=c==null?void 0:c.fields)==null?void 0:g[s],{fieldType:H,classes:T}=z,p=`.${s}-fld-wrp`,{"justify-content":$}=T[p]||"";function f(t,r){a.config[t]=r;const o=j(h,d=>{d[s]=a});v(o),u({event:`${t[0].toUpperCase()+t.slice(1)} changed to ${r} : ${a.adminLbl||s}`,type:`${t}_change`,state:{fields:o,fldKey:s}})}const A=(t,r)=>{const o=j(c,d=>{d.fields[s].classes[p].display="flex",d.fields[s].classes[p][r]=t});b(o),u({event:`Position alignment to "${t}" : ${a.adminLbl||s}`,type:"position_alignment_change",state:{styles:o,fldKey:s}})};return e.jsxs(e.Fragment,{children:[e.jsx(q,{title:"Field Settings",subtitle:a.typ,fieldKey:s}),e.jsx(B,{}),e.jsx(m,{}),e.jsx(S,{id:"thm-stng",title:n("Theme"),className:i(l.fieldSection),open:!0,children:e.jsx("div",{className:i(l.placeholder),children:e.jsxs("select",{"data-testid":"thm-slct",className:i(l.input),"aria-label":"Theme for ReCaptcha Field",placeholder:"Select Theme here...",value:C,onChange:t=>f("theme",t.target.value),children:[e.jsx("option",{value:"dark",children:n("Dark")}),e.jsx("option",{value:"light",children:n("Light")})]})})}),e.jsx(m,{}),e.jsx(S,{id:"siz-stng",title:n("Size"),className:i(l.fieldSection),open:!0,children:e.jsx("div",{className:i(l.placeholder),children:e.jsxs("select",{"data-testid":"siz-slct",className:i(l.input),"aria-label":"Size for ReCaptcha Field",placeholder:"Select Size here...",value:F,onChange:t=>f("size",t.target.value),children:[e.jsx("option",{value:"normal",children:n("Normal")}),e.jsx("option",{value:"compact",children:n("Compact")})]})})}),e.jsx(m,{}),e.jsx("div",{className:i(l.fieldSection),children:e.jsxs("div",{className:i(_.flxcb),children:[e.jsx("span",{className:i(y.label),children:"Position Alignment"}),e.jsx(k,{show:["icn"],tipPlace:"bottom",className:i(y.segment),options:[{icn:e.jsx(D,{size:"17"}),label:"left",tip:"Left"},{icn:e.jsx(I,{size:"17"}),label:"center",tip:"Center"},{icn:e.jsx(K,{size:"17"}),label:"right",tip:"Right"}],onChange:t=>A(t,"justify-content"),defaultActive:$})]})}),e.jsx(m,{})]})}export{he as default};