import{w as X,h as P,q as Y,r as g,a as Z,u as tt,_ as d,j as t,aM as et,I as st,g as r,bk as x,dq as nt,dn as lt,dr as at,ag as it,aw as ot,aA as ct,cO as dt,dp as rt}from"./main-700.js";import{F as o}from"./bf-445-146.js";import{a as ut}from"./bf-622-112.js";import{A as bt}from"./bf-282-147.js";import{F as pt}from"./bf-406-322.js";import{F as mt,b as xt,H as ft,c as gt}from"./bf-964-95.js";import{F as b,I as ht}from"./bf-150-183.js";import{F as M}from"./bf-445-182.js";import{S as h}from"./bf-348-113.js";import"./bf-519-136.js";import"./bf-420-76.js";import"./bf-497-85.js";import"./bf-606-117.js";import"./bf-783-86.js";import"./bf-748-73.js";import"./bf-335-109.js";import"./bf-968-110.js";import"./bf-645-111.js";import"./bf-13-114.js";import"./bf-571-115.js";import"./bf-173-116.js";import"./bf-848-118.js";import"./bf-212-75.js";import"./bf-208-145.js";import"./bf-556-133.js";function zt(){const{fieldKey:e}=X(),[c,p]=P(it),n=Y(c[e]),[v,j]=g.useState({}),[R,y]=g.useState(!1),[E,H]=g.useState(""),{txt:W,align:O,txtAlign:K,fulW:S,btnTyp:T}=n,[L,q]=g.useState(O),{css:i}=Z(),[z,f]=P(ot),D=tt(ct),$=[{name:d("Left"),value:"start"},{name:d("Center"),value:"center"},{name:d("Right"),value:"end"}],I=[{name:"Reset",value:"reset",disabled:!1},{name:"Button",value:"button",disabled:!1}];st&&I.push({name:"Save Draft",value:"save-draft",disabled:!1});function V(s){n.txt=s.target.value;const l=r(c,a=>{a[e]=n});p(l),x({event:`Button text updated : ${n.txt}`,type:"change_btn_txt",state:{fields:l,fldKey:e}})}function G(s){const{value:l}=s.target;if(n.btnTyp=l,n.btnTyp==="submit"&&A()){j({btnTyp:d("Already have a submit button")}),setTimeout(()=>{j({btnTyp:""})},3e3);return}v.btnTyp&&j({btnTyp:""});let a="var(--btn-bg)",u="var(--btn-c)",_="var(--btn-bdr-clr)",w="var(--btn-bdr)",k="var(--btn-bdr-width)";l==="reset"&&(a="hsla(240, 12%, 94%, 100)",u="hsla(208, 46%, 25%, 100)"),l==="save-default"&&(a="hsla(0, 0%, 100%, 100)",u="var(--btn-bgc)",_="var(--btn-bgc)",w="solid",k="1px"),f(F=>r(F,m=>{m.fields[e].classes[`.${e}-btn`].background=a,m.fields[e].classes[`.${e}-btn`].color=u,l!=="save-draft"&&(m.fields[e].classes[`.${e}-btn`]["border-color"]=_,m.fields[e].classes[`.${e}-btn`]["border-style"]=w,m.fields[e].classes[`.${e}-btn`]["border-width"]=k,m.fields[e].classes[`.${e}-btn:hover`].color="var(--btn-c)")}));const C=r(c,F=>{F[e]=n});p(C),x({event:`Button Type updated to ${l}: ${n.txt}`,type:"set_btn_typ",state:{fields:C,fldKey:e}})}function J(s){const{value:l}=s.target;f(a=>r(a,u=>{u.fields[e].classes[`.${e}-inp-fld-wrp`]["justify-content"]=l})),n.align=l,p(r(c,a=>{a[e]=n})),q(l),x({event:`Button Alignment changed to ${l}: ${n.txt}`,type:"set_btn_align",state:{fields:c,fldKey:e}})}function Q(s){const{value:l}=s.target;f(a=>r(a,u=>{u.fields[e].classes[`.${e}-btn`]["justify-content"]=l})),n.txtAlign=l,p(r(c,a=>{a[e]=n})),x({event:`Button Text Alignment changed to ${l}: ${n.txt}`,type:"set_btn_text_align",state:{fields:c,fldKey:e}})}const A=()=>Object.values(c).filter(l=>l.typ==="button"&&l.btnTyp==="submit").length>=1;(!A()||T==="submit")&&I.push({name:"Submit",value:"submit",disabled:!0});function U(s){f(a=>r(a,u=>{u.fields[e].classes[`.${e}-btn`].width=s.target.checked?"100%":"auto"})),n.fulW=s.target.checked;const l=r(c,a=>{a[e]=n});p(l),x({event:`Button Full width ${s.target.checked?"on":"off"}`,type:"set_btn_full",state:{fields:l,fldKey:e}})}const B=s=>{nt(z,e,dt[s])||lt(D,s),at(s,e),H(s),y(!0)},N=s=>{if(n[s]){delete n[s];const l=r(c,a=>{a[e]=n});p(l),x({event:`${rt[s]} Icon Deleted`,type:`delete_${s}`,state:{fldKey:e,fields:l}})}};return t.jsxs(t.Fragment,{children:[t.jsxs("div",{className:"",children:[t.jsx(mt,{title:"Field Settings",subtitle:n.typ,fieldKey:e}),t.jsx(xt,{}),t.jsx(b,{}),t.jsxs(h,{id:"btn-txt-stng",title:d("Button Text"),className:i(o.fieldSection),open:!0,children:[t.jsx("div",{className:i(o.placeholder),children:t.jsx(bt,{id:"btn-txt","aria-label":"Button text",placeholder:"Type text here...",value:W,changeAction:V})}),t.jsx(M,{label:"Leading Icon",iconSrc:n==null?void 0:n.btnPreIcn,styleRoute:"btn-pre-i",setIcon:()=>B("btnPreIcn"),removeIcon:()=>N("btnPreIcn"),isPro:!0}),t.jsx(M,{label:"Trailing Icon",iconSrc:n==null?void 0:n.btnSufIcn,styleRoute:"btn-suf-i",setIcon:()=>B("btnSufIcn"),removeIcon:()=>N("btnSufIcn"),isPro:!0})]}),t.jsx(b,{}),t.jsx(ft,{}),t.jsx(b,{}),t.jsx(pt,{}),t.jsx(b,{}),t.jsx("div",{className:i(o.fieldSection,{pr:"36px"}),children:t.jsx(ut,{id:"ful-wid-btn",tip:"By disabling this option, the button full width will be remove",title:d("Full Width"),action:U,isChecked:S||""})}),t.jsx(b,{}),!S&&t.jsx(h,{id:"btn-algn",title:d("Button Align"),className:i(o.fieldSection),open:!0,children:t.jsx("div",{className:i(o.placeholder),children:t.jsx("select",{"data-testid":"btn-algn-slct",className:i(o.input),name:"",id:"",value:L,onChange:J,children:$.map(s=>t.jsx("option",{value:s.value,children:s.name},`btcd-k-${s.name}`))})})}),S&&t.jsx(h,{id:"txt-algn",title:d("Text Align"),className:i(o.fieldSection),open:!0,children:t.jsx("div",{className:i(o.placeholder),children:t.jsx("select",{"data-testid":"txt-algn-slct",className:i(o.input),name:"",id:"",value:K||"center",onChange:Q,children:$.map(s=>t.jsx("option",{value:s.value,children:s.name},`btcd-k-${s.name}`))})})}),t.jsx(b,{}),t.jsxs(h,{id:"btn-typ",title:d("Button Type"),className:i(o.fieldSection),open:!0,children:[t.jsx("div",{className:i(o.placeholder),children:t.jsx("select",{"data-testid":"btn-typ-slct",className:i(o.input),name:"",id:"",value:T,onChange:G,children:I.map(s=>t.jsx("option",{value:s.value,children:s.name},`btcd-k-${s.name}`))})}),v.btnTyp&&t.jsx("span",{className:i({cr:"red",ml:10}),children:v.btnTyp})]}),t.jsx(b,{}),t.jsx(gt,{})]}),t.jsxs(et,{md:!0,autoHeight:!0,show:R,setModal:y,className:"o-v",title:d("Icons"),children:[t.jsx("div",{className:"pos-rel"}),t.jsx(ht,{iconType:E,addPaddingOnSelect:!1,setModal:y})]})]})}export{zt as default};