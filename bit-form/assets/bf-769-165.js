import{w as U,h as P,q as X,r as g,a as Y,u as tt,_ as d,j as t,bZ as et,I as st,g as r,aZ as x,dk as nt,di as lt,dl as at,ag as it,av as ot,az as ct,cM as dt,dj as rt}from"./main-232.js";import{F as o,A as ut}from"./bf-561-157.js";import{a as bt}from"./bf-131-111.js";import{F as pt}from"./bf-425-324.js";import{F as mt,b as xt,H as ft,c as gt}from"./bf-270-94.js";import{a as b,F as M,I as ht}from"./bf-59-190.js";import{S as h}from"./bf-309-84.js";import"./bf-274-112.js";import"./bf-106-80.js";import"./bf-811-83.js";import"./bf-847-113.js";/* empty css          */import"./bf-744-156.js";import"./bf-678-70.js";import"./bf-770-145.js";import"./bf-771-108.js";import"./bf-114-109.js";import"./bf-928-110.js";import"./bf-493-114.js";import"./bf-139-115.js";import"./bf-29-124.js";import"./bf-823-123.js";import"./bf-300-79.js";import"./bf-283-116.js";import"./bf-326-72.js";function Dt(){const{fieldKey:e}=U(),[c,p]=P(it),n=X(c[e]),[v,j]=g.useState({}),[R,y]=g.useState(!1),[E,H]=g.useState(""),{txt:W,align:z,txtAlign:K,fulW:S,btnTyp:$}=n,[L,O]=g.useState(z),{css:i}=Y(),[D,f]=P(ot),V=tt(ct),F=[{name:d("Left"),value:"start"},{name:d("Center"),value:"center"},{name:d("Right"),value:"end"}],I=[{name:"Reset",value:"reset",disabled:!1},{name:"Button",value:"button",disabled:!1}];st&&I.push({name:"Save Draft",value:"save-draft",disabled:!1});function Z(s){n.txt=s.target.value;const l=r(c,a=>{a[e]=n});p(l),x({event:`Button text updated : ${n.txt}`,type:"change_btn_txt",state:{fields:l,fldKey:e}})}function q(s){const{value:l}=s.target;if(n.btnTyp=l,n.btnTyp==="submit"&&B()){j({btnTyp:d("Already have a submit button")}),setTimeout(()=>{j({btnTyp:""})},3e3);return}v.btnTyp&&j({btnTyp:""});let a="var(--btn-bg)",u="var(--btn-c)",_="var(--btn-bdr-clr)",k="var(--btn-bdr)",w="var(--btn-bdr-width)";l==="reset"&&(a="hsla(240, 12%, 94%, 100)",u="hsla(208, 46%, 25%, 100)"),l==="save-default"&&(a="hsla(0, 0%, 100%, 100)",u="var(--btn-bgc)",_="var(--btn-bgc)",k="solid",w="1px"),f(T=>r(T,m=>{m.fields[e].classes[`.${e}-btn`].background=a,m.fields[e].classes[`.${e}-btn`].color=u,l!=="save-draft"&&(m.fields[e].classes[`.${e}-btn`]["border-color"]=_,m.fields[e].classes[`.${e}-btn`]["border-style"]=k,m.fields[e].classes[`.${e}-btn`]["border-width"]=w,m.fields[e].classes[`.${e}-btn:hover`].color="var(--btn-c)")}));const C=r(c,T=>{T[e]=n});p(C),x({event:`Button Type updated to ${l}: ${n.txt}`,type:"set_btn_typ",state:{fields:C,fldKey:e}})}function G(s){const{value:l}=s.target;f(a=>r(a,u=>{u.fields[e].classes[`.${e}-inp-fld-wrp`]["justify-content"]=l})),n.align=l,p(r(c,a=>{a[e]=n})),O(l),x({event:`Button Alignment changed to ${l}: ${n.txt}`,type:"set_btn_align",state:{fields:c,fldKey:e}})}function J(s){const{value:l}=s.target;f(a=>r(a,u=>{u.fields[e].classes[`.${e}-btn`]["justify-content"]=l})),n.txtAlign=l,p(r(c,a=>{a[e]=n})),x({event:`Button Text Alignment changed to ${l}: ${n.txt}`,type:"set_btn_text_align",state:{fields:c,fldKey:e}})}const B=()=>Object.values(c).filter(l=>l.typ==="button"&&l.btnTyp==="submit").length>=1;(!B()||$==="submit")&&I.push({name:"Submit",value:"submit",disabled:!0});function Q(s){f(a=>r(a,u=>{u.fields[e].classes[`.${e}-btn`].width=s.target.checked?"100%":"auto"})),n.fulW=s.target.checked;const l=r(c,a=>{a[e]=n});p(l),x({event:`Button Full width ${s.target.checked?"on":"off"}`,type:"set_btn_full",state:{fields:l,fldKey:e}})}const A=s=>{nt(D,e,dt[s])||lt(V,s),at(s,e),H(s),y(!0)},N=s=>{if(n[s]){delete n[s];const l=r(c,a=>{a[e]=n});p(l),x({event:`${rt[s]} Icon Deleted`,type:`delete_${s}`,state:{fldKey:e,fields:l}})}};return t.jsxs(t.Fragment,{children:[t.jsxs("div",{className:"",children:[t.jsx(mt,{title:"Field Settings",subtitle:n.typ,fieldKey:e}),t.jsx(xt,{}),t.jsx(b,{}),t.jsxs(h,{id:"btn-txt-stng",title:d("Button Text"),className:i(o.fieldSection),open:!0,children:[t.jsx("div",{className:i(o.placeholder),children:t.jsx(ut,{id:"btn-txt","aria-label":"Button text",placeholder:"Type text here...",value:W,changeAction:Z})}),t.jsx(M,{label:"Leading Icon",iconSrc:n==null?void 0:n.btnPreIcn,styleRoute:"btn-pre-i",setIcon:()=>A("btnPreIcn"),removeIcon:()=>N("btnPreIcn"),isPro:!0}),t.jsx(M,{label:"Trailing Icon",iconSrc:n==null?void 0:n.btnSufIcn,styleRoute:"btn-suf-i",setIcon:()=>A("btnSufIcn"),removeIcon:()=>N("btnSufIcn"),isPro:!0})]}),t.jsx(b,{}),t.jsx(ft,{}),t.jsx(b,{}),t.jsx(pt,{}),t.jsx(b,{}),t.jsx("div",{className:i(o.fieldSection,{pr:"36px"}),children:t.jsx(bt,{id:"ful-wid-btn",tip:"By disabling this option, the button full width will be remove",title:d("Full Width"),action:Q,isChecked:S||""})}),t.jsx(b,{}),!S&&t.jsx(h,{id:"btn-algn",title:d("Button Align"),className:i(o.fieldSection),open:!0,children:t.jsx("div",{className:i(o.placeholder),children:t.jsx("select",{"data-testid":"btn-algn-slct",className:i(o.input),name:"",id:"",value:L,onChange:G,children:F.map(s=>t.jsx("option",{value:s.value,children:s.name},`btcd-k-${s.name}`))})})}),S&&t.jsx(h,{id:"txt-algn",title:d("Text Align"),className:i(o.fieldSection),open:!0,children:t.jsx("div",{className:i(o.placeholder),children:t.jsx("select",{"data-testid":"txt-algn-slct",className:i(o.input),name:"",id:"",value:K||"center",onChange:J,children:F.map(s=>t.jsx("option",{value:s.value,children:s.name},`btcd-k-${s.name}`))})})}),t.jsx(b,{}),t.jsxs(h,{id:"btn-typ",title:d("Button Type"),className:i(o.fieldSection),open:!0,children:[t.jsx("div",{className:i(o.placeholder),children:t.jsx("select",{"data-testid":"btn-typ-slct",className:i(o.input),name:"",id:"",value:$,onChange:q,children:I.map(s=>t.jsx("option",{value:s.value,children:s.name},`btcd-k-${s.name}`))})}),v.btnTyp&&t.jsx("span",{className:i({cr:"red",ml:10}),children:v.btnTyp})]}),t.jsx(b,{}),t.jsx(gt,{})]}),t.jsxs(et,{md:!0,autoHeight:!0,show:R,setModal:y,className:"o-v",title:d("Icons"),children:[t.jsx("div",{className:"pos-rel"}),t.jsx(ht,{iconType:E,addPaddingOnSelect:!1,setModal:y})]})]})}export{Dt as default};