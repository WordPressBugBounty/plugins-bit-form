var C=Object.defineProperty;var u=Object.getOwnPropertySymbols;var F=Object.prototype.hasOwnProperty,N=Object.prototype.propertyIsEnumerable;var f=(t,i,s)=>i in t?C(t,i,{enumerable:!0,configurable:!0,writable:!0,value:s}):t[i]=s,j=(t,i)=>{for(var s in i||(i={}))F.call(i,s)&&f(t,s,i[s]);if(u)for(var s of u(i))N.call(i,s)&&f(t,s,i[s]);return t};import{v as D,h as _,q as $,r as w,a as E,j as e,_ as x,E as A,a6 as b,g as v,bt as k,ao as B}from"./main-365.js";import{a as L}from"./bf-188-321.js";import{F as o}from"./bf-159-142.js";import{C as M}from"./bf-489-81.js";import{a as K}from"./bf-258-110.js";import{F as I,A as V,b as z,c as R}from"./bf-752-93.js";import{D as T}from"./bf-249-325.js";import{F as U}from"./bf-12-318.js";import{F as d}from"./bf-637-179.js";import{R as q}from"./bf-609-320.js";import{S as g}from"./bf-22-111.js";import"./bf-957-305.js";import"./bf-102-178.js";import"./bf-621-72.js";import"./bf-337-84.js";import"./bf-239-69.js";import"./bf-604-107.js";import"./bf-97-108.js";import"./bf-539-109.js";import"./bf-736-112.js";import"./bf-213-113.js";import"./bf-987-114.js";import"./bf-531-80.js";import"./bf-900-82.js";import"./bf-549-115.js";import"./bf-562-71.js";import"./bf-769-130.js";import"./bf-127-79.js";import"./bf-862-143.js";import"./bf-797-141.js";function ge(){const{fieldKey:t}=D(),[i,s]=_(B),a=$(i[t]),[y,m]=w.useState(!1),{css:l}=E();function S(c){const{checked:n}=c.target;if(n){const r=j({},a.valid);r.checked=!0,a.valid=r}else delete a.valid.checked;const p=v(i,r=>{r[t]=a});s(p),k({event:`Check by default ${n?"on":"off"} : ${a.adminLbl||t}`,type:"set_check_by_default",state:{fields:p,fldKey:t}})}const h=(c,n)=>{a.msg[n]=c;const p=v(i,r=>{r[t]=a});s(p),k({event:`${n[0].toUpperCase()+n.slice(1)} Value Modified to "${c}"`,type:`${n}_value_modify`,state:{fields:p,fldKey:t}})};return window.selectedFieldData=a,e.jsxs("div",{children:[e.jsx(I,{title:"Field Settings",subtitle:a.typ,fieldKey:t}),e.jsxs("div",{className:l(o.fieldSection),children:[e.jsxs("div",{className:`flx flx-between ${o.hover_tip}`,children:[e.jsxs("div",{className:"flx",children:[e.jsx("b",{children:"Label "}),e.jsx(M,{width:250,icnSize:17,className:"hover-tip",children:e.jsx("div",{className:"txt-body",children:x("Edit your decision box label by clicking on edit icon")})})]}),e.jsx("span",{"data-testid":"lbl-edt-btn",role:"button",tabIndex:"-1",className:"mr-2 cp",onClick:()=>m(!0),onKeyDown:()=>m(!0),children:e.jsx(A,{size:19})})]}),e.jsx("div",{className:`${l(L.errMsgBox)} ${l(b.mt2)}`,tabIndex:"0",role:"button",onClick:()=>m(!0),onKeyDown:()=>m(!0),children:e.jsx("p",{className:l(b.m0),children:"Click to edit decision box label"})})]}),e.jsx(d,{}),e.jsx(T,{labelModal:y,setLabelModal:m,title:x("Edit Decision Box Label")}),e.jsx(V,{}),e.jsx(d,{}),e.jsx(z,{}),e.jsx(d,{}),e.jsx(q,{asteriskIsAllow:!1}),e.jsx(d,{}),e.jsx(U,{}),e.jsx(d,{}),e.jsx(R,{}),e.jsx(d,{}),e.jsx(g,{id:"chek-val-stng",title:x("Checked Value"),className:l(o.fieldSection),open:!0,children:e.jsx("div",{className:l(o.placeholder),children:e.jsx("input",{"data-testid":"chek-val-inp","aria-label":"Checked value",className:l(o.input),type:"text",value:a.msg.checked||"",onChange:c=>h(c.target.value,"checked")})})}),e.jsx(d,{}),e.jsx(g,{id:"unchek-val-stng",title:x("Unchecked Value"),className:l(o.fieldSection),open:!0,children:e.jsx("div",{className:l(o.placeholder),children:e.jsx("input",{"data-testid":"unchek-val-inp","aria-label":"Uncheked value",className:l(o.input),type:"text",value:a.msg.unchecked||"",onChange:c=>h(c.target.value,"unchecked")})})}),e.jsx(d,{}),e.jsx("div",{className:l(o.fieldSection,o.hover_tip,{pr:"36px !important"}),children:e.jsx(K,{id:"chek-by-dflt",tip:"By disabling this option, the field checked by default will be hidden",title:x("Checked by Default"),action:S,isChecked:a.valid.checked})}),e.jsx(d,{})]})}export{ge as default};