import{w as g,j as t,a as S,h as y,r as F,q as b,B as T,_ as x,b2 as v,aM as w,g as c,ag as E}from"./main-471.js";import{F as m}from"./bf-133-145.js";import{F as O,a as q,S as N,A,b as C,H,c as K}from"./bf-142-94.js";import{F as M}from"./bf-939-321.js";import{F as U}from"./bf-617-322.js";import{F as s}from"./bf-98-182.js";import{P as k}from"./bf-629-326.js";import{R as P}from"./bf-635-323.js";import{U as R}from"./bf-87-329.js";import{E as _}from"./bf-192-327.js";import"./bf-433-85.js";import"./bf-685-72.js";import"./bf-230-75.js";import"./bf-486-108.js";import"./bf-960-109.js";import"./bf-457-111.js";import"./bf-101-135.js";import"./bf-783-84.js";import"./bf-568-116.js";import"./bf-42-110.js";import"./bf-865-112.js";import"./bf-352-113.js";import"./bf-929-114.js";import"./bf-666-115.js";import"./bf-561-117.js";import"./bf-16-74.js";import"./bf-203-181.js";import"./bf-3-132.js";import"./bf-94-146.js";import"./bf-596-144.js";import"./bf-885-193.js";import"./bf-934-324.js";import"./bf-842-76.js";import"./bf-370-82.js";import"./bf-99-143.js";function Ft(){const{fieldKey:e}=g();if(!e)return t.jsx(t.Fragment,{children:"No field exist with this field key"});const{css:o}=S(),[j,n]=y(E),[p,d]=F.useState(!1),a=b(j[e]),u=a.opt,f=i=>{n(r=>c(r,l=>{l[e].opt=i}))},h=i=>{n(r=>c(r,l=>{l[e].customType=i}))};return t.jsxs(t.Fragment,{children:[t.jsx(O,{title:"Field Settings",subtitle:a.typ,fieldKey:e}),t.jsx(q,{}),t.jsx(s,{}),t.jsx(N,{}),t.jsx(s,{}),t.jsx(A,{}),t.jsx(s,{}),t.jsx(C,{}),t.jsx(s,{}),t.jsx(k,{}),t.jsx(s,{}),t.jsx(H,{}),t.jsx(s,{}),t.jsx(P,{}),t.jsx(s,{}),t.jsx(K,{}),t.jsx(s,{}),t.jsx(U,{}),t.jsx(s,{}),t.jsx(M,{}),t.jsx(s,{}),t.jsx("div",{className:o(m.fieldSection),children:t.jsxs(T,{dataTestId:"edt-opt-stng",variant:"primary-outline",size:"sm",className:o({mt:10}),onClick:()=>d(!0),children:[x("Add/Edit Options"),t.jsx("span",{className:o({ml:3,mt:3,tm:"rotate(45deg)"}),children:t.jsx(v,{size:"13",stroke:"3"})})]})}),t.jsx(s,{}),t.jsx(R,{type:"entryUnique",title:"Validate as Entry Unique",tipTitle:"Enabling this option will check from the entry database whether its value is duplicate.",className:o(m.fieldSection,m.hover_tip),isUnique:"show"}),t.jsx(s,{}),t.jsx(w,{md:!0,autoHeight:!0,show:p,setModal:()=>d(!1),className:"o-v",title:x("Options"),width:"730px",children:t.jsx(_,{optionMdl:p,options:u,setOptions:i=>f(i),lblKey:"lbl",valKey:"val",type:"radio",hasGroup:!0,customType:a.customType,setCustomType:h})})]})}export{Ft as default};