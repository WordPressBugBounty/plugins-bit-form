import{a as C,v as B,h as H,q as L,r as T,a6 as M,j as e,_ as c,a3 as n,aR as P,al as z,aB as K,g as p,bp as x,aN as R,A as $}from"./main-65.js";import{F as g}from"./bf-530-146.js";import{d as U}from"./bf-872-75.js";import{F as k,A as D,b as E}from"./bf-439-97.js";import{A as N}from"./bf-626-147.js";import{F as h,I as W}from"./bf-839-183.js";import{S as F}from"./bf-748-115.js";import"./bf-757-88.js";import"./bf-874-72.js";import"./bf-983-111.js";import"./bf-304-112.js";import"./bf-33-114.js";import"./bf-673-82.js";import"./bf-849-84.js";import"./bf-716-85.js";import"./bf-390-113.js";import"./bf-911-116.js";import"./bf-252-117.js";import"./bf-194-118.js";import"./bf-409-83.js";import"./bf-472-119.js";import"./bf-837-74.js";import"./bf-428-182.js";import"./bf-242-134.js";import"./bf-154-145.js";function xe(){var j;const{css:a}=C(),{fieldKey:s}=B(),[m,b]=H(z),t=L(m[s]),[y,u]=T.useState(!1),A=t.alt||"",I=M(K),S=o=>{const{value:l}=o.target;l===""?delete t.alt:t.alt=l.replace(/\\\\/g,"$_bf_$");const i=p(m,r=>{r[s]=t});b(i),x({event:`Field alt Change ${t.alt||s}`,type:"field_alt_change",state:{fields:i,fldKey:s}})},w=o=>{const{value:l}=o.target;l===""?delete t.bg_img:t.bg_img=l.replace(/\\\\/g,"$_bf_$");const i=p(m,r=>{r[s]=t});b(i),x({event:`Field Image Change ${t.bg_img||s}`,type:"field_img_change",state:{fields:i,fldKey:s}})},f=o=>{const{name:l,value:i}=o.target;t[l]=Number(i);const r=p(m,d=>{d[s]=t});b(r);const v=d=>`fields->${s}->classes->.${s}-fld-wrp->${d}`;x({event:`Field ${l} Change ${t.lbl||s}`,type:`field_${l}_change`,state:{fields:r,fldKey:s}}),R(),I(d=>p(d,_=>{$(_,v(l),`${Number(i)}px`),l==="height"&&$(_,v("max-height"),`${Number(i)}px`)}))};return e.jsxs("div",{children:[e.jsx(k,{title:"Field Settings",subtitle:t.typ,fieldKey:s}),e.jsx(D,{}),e.jsx(h,{}),e.jsx(E,{}),e.jsx(h,{}),e.jsxs(F,{id:"nam-stng",title:c("Background Image"),className:a(g.fieldSection),children:[e.jsx("div",{className:a(n.flxc,{jc:"end"}),children:e.jsx(U,{msg:"Change",children:e.jsx("button",{"data-testid":"img-edt-btn",type:"button",onClick:()=>u(!0),className:a(q.browseBtn),children:"Browse"})})}),e.jsx("div",{className:a({w:"97%",mx:5}),children:e.jsx(N,{id:"fld-lbl-stng",ariaLabel:"Label input",changeAction:w,value:(j=t.bg_img)==null?void 0:j.replace(/\$_bf_\$/g,"\\"),placeholder:"e.g: https://ps.w.org/bit-form/assets/icon-256x256.png?rev=2376144"})}),e.jsxs("div",{className:a(n.flxcb,n.ml1),children:[e.jsx("label",{htmlFor:"alt",className:a(n.mr1),children:c("Width")}),e.jsx("input",{type:"number",name:"width","data-testid":"img-width","aria-label":"Image Width",placeholder:"auto",className:a(g.input,n.w4),value:t.width,onChange:f})]}),e.jsxs("div",{className:a(n.flxcb,n.ml1),children:[e.jsx("label",{htmlFor:"alt",className:a(n.mr1),children:c("Height")}),e.jsx("input",{type:"number",name:"height","data-testid":"img-height","aria-label":"Image Height",placeholder:"auto",className:a(g.input,n.w4),value:t.height,onChange:f})]})]}),e.jsx(h,{}),e.jsx(F,{id:"nam-stng",title:c("Image Alt Text"),className:a(g.fieldSection),children:e.jsx("div",{children:e.jsx("div",{className:a({w:"97%",mx:5}),children:e.jsx(N,{id:"fld-lbl-stng",ariaLabel:"Label input",changeAction:S,value:A.replace(/\$_bf_\$/g,"\\"),placeholder:"Alternative Text"})})})}),e.jsx(h,{}),e.jsxs(P,{md:!0,autoHeight:!0,show:y,setModal:u,className:"o-v",title:"Image",children:[e.jsx("div",{className:"pos-rel"}),e.jsx(W,{iconType:"bg_img",selected:"Upload Image",uploadLbl:"Upload Image",setModal:u,unsplash:!0})]})]})}const q={browseBtn:{b:"none",bd:"none",p:"5px 10px",tn:"all ease-in-out 0.2s","&:hover":{bd:"var(--b-79-96)",cr:"var(--b-50)",brs:"8px"}}};export{xe as default};