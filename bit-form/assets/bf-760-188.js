import{r as u,w as C,a1 as E,j as e,a as K,h as q,q as S,_ as d,B,aQ as z,bZ as b,av as Z,ag as Q,I as U,g as h,aZ as x}from"./main-232.js";/* empty css          */import{a as n,F as V,t as y,I as G}from"./bf-59-190.js";import{F as l}from"./bf-561-157.js";import{a as R}from"./bf-131-111.js";import{F as J,a as W,S as X,A as Y,b as D,H as ee,c as te}from"./bf-270-94.js";import{R as se}from"./bf-463-326.js";import{E as ie}from"./bf-925-330.js";import{S as oe}from"./bf-309-84.js";import"./bf-106-80.js";import"./bf-770-145.js";import"./bf-847-113.js";import"./bf-274-112.js";import"./bf-811-83.js";import"./bf-744-156.js";import"./bf-678-70.js";import"./bf-368-193.js";import"./bf-276-327.js";import"./bf-800-117.js";import"./bf-80-121.js";import"./bf-834-74.js";import"./bf-893-81.js";import"./bf-646-127.js";import"./bf-139-115.js";import"./bf-29-124.js";import"./bf-823-123.js";import"./bf-265-155.js";import"./bf-670-125.js";import"./bf-771-108.js";import"./bf-114-109.js";import"./bf-928-110.js";import"./bf-493-114.js";import"./bf-300-79.js";import"./bf-283-116.js";import"./bf-326-72.js";function le(){const{fieldKey:t}=C(),O=E(Z),[F,f]=u.useState(!1);if(!t)return e.jsx(e.Fragment,{children:"No field exist with this field key"});const{css:r}=K(),[m,v]=q(Q),[j,w]=u.useState(!1),s=S(m[t]),L=S(m[t].opt),_=(s==null?void 0:s.showReviewLblOnHover)||!1,P=(s==null?void 0:s.showReviewLblOnSelect)||!1,M=s.adminLbl||"",N=(s==null?void 0:s.ratingPos)||"start",I=[{name:d("Left"),value:"start"},{name:d("Center"),value:"center"},{name:d("Right"),value:"end"}],H=()=>{w(!0)},$=i=>{if(!U)return;const o=h(m,a=>{a[t].opt=i});v(o),x({event:`Modify Option: ${s.lbl||M||t}`,type:"modify_options_list",state:{fields:o,fldKey:t}})},k=({target:i})=>{const{checked:o}=i,a=h(m,p=>{const c=p[t];o?c.showReviewLblOnHover=!0:c.showReviewLblOnHover=!1}),g=o?"show":"hide";v(a),x({event:`Review Label ${g}`,type:"review_lbl_show_hide",state:{fields:a,fldKey:t}})},T=({target:i})=>{const{checked:o}=i,a=h(m,p=>{const c=p[t];o?c.showReviewLblOnSelect=!0:c.showReviewLblOnSelect=!1}),g=o?"show":"hide";v(a),x({event:`Review Label ${g}`,type:"review_lbl_show_hovsr_hide",state:{fields:a,fldKey:t}})},A=({target:i})=>{const{value:o}=i,a=h(m,p=>{p[t].ratingPos=o});O(p=>h(p,c=>{c.fields[t].classes[`.${t}-inp-fld-wrp`]["justify-content"]=o,o==="end"?c.fields[t].classes[`.${t}-inp-fld-wrp`]["flex-direction"]="row-reverse":delete c.fields[t].classes[`.${t}-inp-fld-wrp`]["flex-direction"]}));const g=o;v(a),x({event:`Review start position change to ${g}`,type:"review_start_pos",state:{fields:a,fldKey:t}})};return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"",children:[e.jsx(J,{title:"Field Settings",subtitle:s.typ,fieldKey:t}),e.jsx(W,{}),e.jsx(n,{}),e.jsx(X,{}),e.jsx(n,{}),e.jsx(Y,{}),e.jsx(n,{}),e.jsx(D,{}),e.jsx(n,{}),e.jsx(oe,{id:"rating-algn",title:d("Rating Position"),className:r(l.fieldSection),isPro:!0,children:e.jsx("div",{className:r(l.placeholder),children:e.jsx("select",{"data-testid":"rating-algn-slct",className:r(l.input),name:"",id:"",value:N,onChange:A,children:I.map(i=>e.jsx("option",{value:i.value,children:i.name},`btcd-k-${i.name}`))})})}),e.jsx(n,{}),e.jsx("div",{className:r(l.fieldSection,l.hover_tip,l.singleOption,{fw:700}),children:e.jsx(V,{label:"Rating Icon",iconSrc:s.opt[0].img,styleRoute:"rating-img",setIcon:()=>f(!0),isPro:!0,proProperty:"ratingIcon"})}),e.jsx(n,{}),e.jsx("div",{className:r(l.fieldSection),children:e.jsxs(B,{dataTestId:"edt-opt-stng",variant:"primary-outline",size:"sm",className:r({mt:10}),onClick:H,children:[d("Add/Edit Rating Options"),e.jsx("span",{className:r(ne.plsIcn),children:e.jsx(z,{size:"13",stroke:"3"})})]})}),e.jsx(n,{}),e.jsx("div",{className:r(l.fieldSection,l.hover_tip,l.singleOption),children:e.jsx(R,{id:"fld-rating-lbl-hover",tip:y.ratingLbl,title:d("Show Rating Message On hover"),action:k,isChecked:_,isPro:!0,proProperty:"ratingMsgOnHover"})}),e.jsx(n,{}),e.jsx("div",{className:r(l.fieldSection,l.hover_tip,l.singleOption),children:e.jsx(R,{id:"fld-rating-lbl-select",tip:y.ratingSelectTip,title:d("Show Rating Message On Selected"),action:T,isChecked:P,isPro:!0,proProperty:"ratingMsgOnSelect"})}),e.jsx(n,{}),e.jsx(ee,{}),e.jsx(n,{}),e.jsx(se,{}),e.jsx(n,{}),e.jsx(te,{}),e.jsx(n,{})]}),e.jsx(b,{md:!0,autoHeight:!0,show:j,setModal:()=>w(!1),className:"o-v ",title:d("Options"),width:"740px",children:e.jsx("div",{className:"pos-rel",children:e.jsx(ie,{optionMdl:j,options:L,setOptions:i=>$(i),lblKey:"lbl",valKey:"val",imgKey:"img",isRating:s.typ,type:"rating",showUpload:!0,onlyVisualOptionsTab:!0,isPro:!0})})}),e.jsxs(b,{md:!0,autoHeight:!0,show:F,setModal:f,className:"o-v",title:d("Icons"),children:[e.jsx("div",{className:"pos-rel"}),e.jsx(G,{iconType:"opt",setModal:f})]})]})}var Be=u.memo(le);const ne={dotBtn:{b:0,brs:5,mr:15,curp:1},button:{dy:"block",w:"100%",ta:"left",b:0,bd:"none",p:3,curp:1,"&:hover":{bd:"var(--white-0-95)",cr:"var(--black-0)",brs:8},fs:11},plsIcn:{ml:8,mt:3,tm:"rotate(45deg)"}};export{Be as default};