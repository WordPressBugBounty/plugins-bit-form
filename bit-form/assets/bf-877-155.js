import{v as X,h as P,q as Y,r as g,a as Z,u as tt,_ as r,j as t,aM as et,I as st,g as d,bk as x,dr as nt,dp as lt,ds as at,ag as it,aw as ot,aA as ct,cP as rt,dq as dt}from"./main-348.js";import{F as o}from"./bf-251-145.js";import{a as ut}from"./bf-814-113.js";import{A as bt}from"./bf-547-146.js";import{F as pt}from"./bf-135-321.js";import{F as mt,b as xt,H as ft,c as gt}from"./bf-337-96.js";import{F as b,I as ht}from"./bf-442-182.js";import{F as M}from"./bf-803-181.js";import{S as h}from"./bf-545-114.js";import"./bf-495-81.js";import"./bf-115-74.js";import"./bf-628-83.js";import"./bf-514-84.js";import"./bf-971-87.js";import"./bf-628-71.js";import"./bf-419-110.js";import"./bf-649-111.js";import"./bf-492-112.js";import"./bf-245-115.js";import"./bf-814-116.js";import"./bf-465-117.js";import"./bf-288-82.js";import"./bf-733-118.js";import"./bf-636-73.js";import"./bf-99-144.js";import"./bf-132-133.js";function Dt(){const{fieldKey:e}=X(),[c,p]=P(it),n=Y(c[e]),[v,j]=g.useState({}),[R,y]=g.useState(!1),[E,H]=g.useState(""),{txt:W,align:K,txtAlign:L,fulW:S,btnTyp:T}=n,[O,q]=g.useState(K),{css:i}=Z(),[z,f]=P(ot),D=tt(ct),$=[{name:r("Left"),value:"start"},{name:r("Center"),value:"center"},{name:r("Right"),value:"end"}],I=[{name:"Reset",value:"reset",disabled:!1},{name:"Button",value:"button",disabled:!1}];st&&I.push({name:"Save Draft",value:"save-draft",disabled:!1});function V(s){n.txt=s.target.value;const l=d(c,a=>{a[e]=n});p(l),x({event:`Button text updated : ${n.txt}`,type:"change_btn_txt",state:{fields:l,fldKey:e}})}function G(s){const{value:l}=s.target;if(n.btnTyp=l,n.btnTyp==="submit"&&A()){j({btnTyp:r("Already have a submit button")}),setTimeout(()=>{j({btnTyp:""})},3e3);return}v.btnTyp&&j({btnTyp:""});let a="var(--btn-bg)",u="var(--btn-c)",_="var(--btn-bdr-clr)",k="var(--btn-bdr)",w="var(--btn-bdr-width)";l==="reset"&&(a="hsla(240, 12%, 94%, 100)",u="hsla(208, 46%, 25%, 100)"),l==="save-default"&&(a="hsla(0, 0%, 100%, 100)",u="var(--btn-bgc)",_="var(--btn-bgc)",k="solid",w="1px"),f(F=>d(F,m=>{m.fields[e].classes[`.${e}-btn`].background=a,m.fields[e].classes[`.${e}-btn`].color=u,l!=="save-draft"&&(m.fields[e].classes[`.${e}-btn`]["border-color"]=_,m.fields[e].classes[`.${e}-btn`]["border-style"]=k,m.fields[e].classes[`.${e}-btn`]["border-width"]=w,m.fields[e].classes[`.${e}-btn:hover`].color="var(--btn-c)")}));const C=d(c,F=>{F[e]=n});p(C),x({event:`Button Type updated to ${l}: ${n.txt}`,type:"set_btn_typ",state:{fields:C,fldKey:e}})}function J(s){const{value:l}=s.target;f(a=>d(a,u=>{u.fields[e].classes[`.${e}-inp-fld-wrp`]["justify-content"]=l})),n.align=l,p(d(c,a=>{a[e]=n})),q(l),x({event:`Button Alignment changed to ${l}: ${n.txt}`,type:"set_btn_align",state:{fields:c,fldKey:e}})}function Q(s){const{value:l}=s.target;f(a=>d(a,u=>{u.fields[e].classes[`.${e}-btn`]["justify-content"]=l})),n.txtAlign=l,p(d(c,a=>{a[e]=n})),x({event:`Button Text Alignment changed to ${l}: ${n.txt}`,type:"set_btn_text_align",state:{fields:c,fldKey:e}})}const A=()=>Object.values(c).filter(l=>l.typ==="button"&&l.btnTyp==="submit").length>=1;(!A()||T==="submit")&&I.push({name:"Submit",value:"submit",disabled:!0});function U(s){f(a=>d(a,u=>{u.fields[e].classes[`.${e}-btn`].width=s.target.checked?"100%":"auto"})),n.fulW=s.target.checked;const l=d(c,a=>{a[e]=n});p(l),x({event:`Button Full width ${s.target.checked?"on":"off"}`,type:"set_btn_full",state:{fields:l,fldKey:e}})}const B=s=>{nt(z,e,rt[s])||lt(D,s),at(s,e),H(s),y(!0)},N=s=>{if(n[s]){delete n[s];const l=d(c,a=>{a[e]=n});p(l),x({event:`${dt[s]} Icon Deleted`,type:`delete_${s}`,state:{fldKey:e,fields:l}})}};return t.jsxs(t.Fragment,{children:[t.jsxs("div",{className:"",children:[t.jsx(mt,{title:"Field Settings",subtitle:n.typ,fieldKey:e}),t.jsx(xt,{}),t.jsx(b,{}),t.jsxs(h,{id:"btn-txt-stng",title:r("Button Text"),className:i(o.fieldSection),open:!0,children:[t.jsx("div",{className:i(o.placeholder),children:t.jsx(bt,{id:"btn-txt","aria-label":"Button text",placeholder:"Type text here...",value:W,changeAction:V})}),t.jsx(M,{label:"Leading Icon",iconSrc:n==null?void 0:n.btnPreIcn,styleRoute:"btn-pre-i",setIcon:()=>B("btnPreIcn"),removeIcon:()=>N("btnPreIcn"),isPro:!0}),t.jsx(M,{label:"Trailing Icon",iconSrc:n==null?void 0:n.btnSufIcn,styleRoute:"btn-suf-i",setIcon:()=>B("btnSufIcn"),removeIcon:()=>N("btnSufIcn"),isPro:!0})]}),t.jsx(b,{}),t.jsx(ft,{}),t.jsx(b,{}),t.jsx(pt,{}),t.jsx(b,{}),t.jsx("div",{className:i(o.fieldSection,{pr:"36px"}),children:t.jsx(ut,{id:"ful-wid-btn",tip:"By disabling this option, the button full width will be remove",title:r("Full Width"),action:U,isChecked:S||""})}),t.jsx(b,{}),!S&&t.jsx(h,{id:"btn-algn",title:r("Button Align"),className:i(o.fieldSection),open:!0,children:t.jsx("div",{className:i(o.placeholder),children:t.jsx("select",{"data-testid":"btn-algn-slct",className:i(o.input),name:"",id:"",value:O,onChange:J,children:$.map(s=>t.jsx("option",{value:s.value,children:s.name},`btcd-k-${s.name}`))})})}),S&&t.jsx(h,{id:"txt-algn",title:r("Text Align"),className:i(o.fieldSection),open:!0,children:t.jsx("div",{className:i(o.placeholder),children:t.jsx("select",{"data-testid":"txt-algn-slct",className:i(o.input),name:"",id:"",value:L||"center",onChange:Q,children:$.map(s=>t.jsx("option",{value:s.value,children:s.name},`btcd-k-${s.name}`))})})}),t.jsx(b,{}),t.jsxs(h,{id:"btn-typ",title:r("Button Type"),className:i(o.fieldSection),open:!0,children:[t.jsx("div",{className:i(o.placeholder),children:t.jsx("select",{"data-testid":"btn-typ-slct",className:i(o.input),name:"",id:"",value:T,onChange:G,children:I.map(s=>t.jsx("option",{value:s.value,children:s.name},`btcd-k-${s.name}`))})}),v.btnTyp&&t.jsx("span",{className:i({cr:"red",ml:10}),children:v.btnTyp})]}),t.jsx(b,{}),t.jsx(gt,{})]}),t.jsxs(et,{md:!0,autoHeight:!0,show:R,setModal:y,className:"o-v",title:r("Icons"),children:[t.jsx("div",{className:"pos-rel"}),t.jsx(ht,{iconType:E,addPaddingOnSelect:!1,setModal:y})]})]})}export{Dt as default};