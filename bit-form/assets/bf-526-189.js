import{j as e,w as F,h as k,a as O,_ as f,ag as _,g as j,aZ as w,I as M,di as U,aH as P,q as T,d_ as C,r as K,a1 as Z,B as V,aQ as W,bZ as Q,al as Y,av as G,bY as J,K as X,A as ee}from"./main-232.js";import{S as I,A as te}from"./bf-309-84.js";import{t as L,a as p}from"./bf-59-190.js";import{F as r}from"./bf-561-157.js";import{a as q,S as se}from"./bf-131-111.js";import{F as ie,a as le,S as oe,A as ne,b as ae,H as re,c as me}from"./bf-270-94.js";import{R as ce}from"./bf-463-326.js";import{U as de}from"./bf-510-331.js";import{E as pe}from"./bf-925-330.js";import{E as B}from"./bf-276-327.js";import"./bf-106-80.js";import"./bf-800-117.js";import"./bf-678-70.js";import"./bf-771-108.js";import"./bf-114-109.js";import"./bf-928-110.js";import"./bf-274-112.js";import"./bf-811-83.js";import"./bf-847-113.js";import"./bf-493-114.js";import"./bf-139-115.js";import"./bf-29-124.js";import"./bf-823-123.js";import"./bf-300-79.js";import"./bf-283-116.js";import"./bf-326-72.js";import"./bf-770-145.js";/* empty css          */import"./bf-744-156.js";import"./bf-368-193.js";import"./bf-834-74.js";import"./bf-893-81.js";import"./bf-646-127.js";import"./bf-265-155.js";import"./bf-670-125.js";import"./bf-80-121.js";function xe({size:i=32,stroke:t=1.5}){return e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:i,height:i,viewBox:"0 0 24 24",children:e.jsx("path",{className:"svg-icn",strokeWidth:t,d:"M4 4h16v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4Zm6 6v4m0 0h4m-4 0l4-4"})})}function ue({size:i=32,stroke:t=1.5}){return e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:i,height:i,viewBox:"0 0 24 24",children:e.jsx("path",{className:"svg-icn",strokeWidth:t,d:"M4 4h16v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4Zm6 10h4m0 0v-4m0 4l-4-4"})})}function ge({size:i=32,stroke:t=1.5}){return e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:i,height:i,viewBox:"0 0 24 24",children:e.jsx("path",{className:"svg-icn",strokeWidth:t,d:"M4 4h16v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4Zm10 6h-4m0 0v4m0-4l4 4"})})}function fe({size:i=32,stroke:t=1.5}){return e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:i,height:i,viewBox:"0 0 24 24",children:e.jsx("path",{className:"svg-icn",strokeWidth:t,d:"M4 4h16v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4Zm10 10v-4m0 0h-4m4 0l-4 4"})})}function he({cls:i}){const{fieldKey:t}=F(),[a,n]=k(_),l=a[t].inpType==="checkbox",{css:h}=O(),s=({target:g})=>{const{checked:x}=g,m=j(a,c=>{const o=c[t];x?o.inpType="checkbox":(o.inpType="radio",delete o.mn,delete o.mx)}),b=x?"on":"off";n(m),w({event:`Allow multiple image ${b}`,type:"allow_multiple_on_off",state:{fields:m,fldKey:t}})};return e.jsx("div",{className:`${h(r.fieldSection,r.hover_tip,r.singleOption)} ${i}`,children:e.jsx(q,{id:"allow-multiple-stng",tip:L.imageMultipleImage,title:f("Allow Multiple"),action:s,isChecked:l,proProperty:"hidden"})})}function be({cls:i}){const{fieldKey:t}=F(),[a,n]=k(_),l=a[t].optLblHide,{css:h}=O(),s=({target:g})=>{if(!M)return;const{checked:x}=g,m=j(a,c=>{const o=c[t];x?o.optLblHide=!0:(o.optLblHide=!1,U(t,"imageSelectOptLbl"))}),b=x?"on":"off";n(m),w({event:`Hide image ${b}`,type:"Hide_image_label_on_off",state:{fields:m,fldKey:t}}),P(t)};return e.jsx("div",{className:`${h(r.fieldSection,r.hover_tip,r.singleOption)} ${i}`,children:e.jsx(q,{id:"opt-img-lbl-hide-or-show",tip:L.imageOptLbl,title:f("Hide Image Label"),action:s,isChecked:l,isPro:!0,proProperty:"hidden"})})}function je(i){return{"top-left":{top:"10px",left:"10px"},"top-right":{top:"10px",right:"10px"},"bottom-left":{bottom:"10px",left:"10px"},"bottom-right":{bottom:"10px",right:"10px"},center:{top:"50%",left:"50%",transform:"translate(-50%, -50%)"},"top-center":{top:"10px",left:"50%"},"bottom-center":{bottom:"10px",left:"50%"}}[i]}function ve({cls:i,tip:t,checkIsPro:a}){const{fieldKey:n}=F(),[l,h]=k(_),s=T(l[n]),g=s.mn||"",x=s.adminLbl||"",{css:m}=O();function b(c){if(a&&!M)return;Number(c.target.value)?(s.mn=c.target.value,s.err||(s.err={}),s.err.mn||(s.err.mn={}),s.err.mn.dflt=`<p style="margin:0">Minimum ${c.target.value} option${Number(c.target.value)>1?"s":""}<p>`,s.err.mn.show=!0):delete s.mn;const o=j(l,v=>{v[n]=s});h(o),w({event:`Min value updated to ${c.target.value}: ${s.lbl||x||n}`,type:"set_min",state:{fields:o,fldKey:n}}),c.target.value>=1&&!s.req&&C({target:{checked:!0}})}return e.jsxs(I,{id:"mnmm-stng",title:f("Minimum"),className:`${m(r.fieldSection)} ${i}`,tip:t,isPro:!0,proProperty:"mimimumOption",children:[e.jsx("div",{className:m(r.placeholder),children:e.jsx("input",{"data-testid":"mnmm-stng-inp","aria-label":"Minimum number",className:m(r.input),value:g,type:"number",onChange:b,placeholder:"Set minimum number",disabled:a&&!M})}),g&&e.jsx(B,{id:"mnmm-stng",type:"mn",title:"Min Error Message",tipTitle:`By enabling this feature, user will see the error message when selected checkbox is less than ${g}`})]})}function ye({cls:i,tip:t,checkIsPro:a}){const{fieldKey:n}=F(),[l,h]=k(_),s=T(l[n]),g=s.mx||"",x=s.adminLbl||"",{css:m}=O();function b(o){if(a&&!M)return;o.target.value===""?delete s.mx:(s.mx=o.target.value,s.err||(s.err={}),s.err.mx||(s.err.mx={}),s.err.mx.dflt=`<p style="margin:0">Maximum ${o.target.value} option${Number(o.target.value)>1?"s":""}</p>`,s.err.mx.show=!0);const v=j(l,N=>{N[n]=s});h(v),w({event:`Max value updated to ${o.target.value}: ${s.lbl||x||n}`,type:"set_max",state:{fields:v,fldKey:n}})}const c=o=>{if(a&&!M)return;o.target.checked?s.valid.disableOnMax=!0:delete s.valid.disableOnMax;const v=j(l,N=>{N[n]=s});h(v),w({event:`Disable on max selected ${o.target.checked?"on":"off"}: ${s.lbl||x||n}`,type:"set_disable_on_max",state:{fields:v,fldKey:n}})};return e.jsxs(I,{id:"mxmm-stng",title:f("Maximum"),className:`${m(r.fieldSection)} ${i}`,tip:t,isPro:!0,proProperty:"maximumOption",children:[e.jsx("div",{className:m(r.placeholder),children:e.jsx("input",{"data-testid":"mxmm-stng-inp","aria-label":"Maximum number",className:m(r.input),value:g,type:"number",onChange:b,placeholder:"Set maximum number",disabled:a&&!M})}),g&&e.jsxs(e.Fragment,{children:[e.jsx(B,{id:"mxmm-stng",type:"mx",title:"Max Error Message",tipTitle:`By enabling this feature, user will see the error message when selected checkbox is greater than ${g}`}),e.jsx(q,{id:"mxmm-slctd",title:f("Disable if maximum selected:"),action:c,isChecked:s.valid.disableOnMax,disabled:a&&!M,className:"mt-3 mb-2"})]})]})}function Se(){const{css:i}=O(),{fieldKey:t}=F(),[a,n]=k(_),l=T(a[t]),h=T(a[t].opt);Z(Y);const s=l.adminLbl||"",{itemSize:g}=l,[x,m]=k(G),[b,c]=K.useState(!1),o=()=>{c(!0)},v=()=>{c(!1)},N=d=>{const y=d.filter(u=>u.req);y.length&&C({target:{checked:!0}});const $=j(a,u=>{u[t].opt=d,y.length&&u[t].err.req?(u[t].err.req.custom=!0,u[t].err.req.msg=`<p style="margin:0">${y.map(S=>S.lbl).join(",")} is required</p>`):u[t].err.req&&(u[t].err.req.msg='<p style="margin:0">This field is required</p>')});n($),w({event:`Options List Moddified: ${l.lbl||s||t}`,type:"option_list_modify",state:{fields:$,fldKey:t}}),setTimeout(()=>{P(t)},100)};function z({target:{value:d}}){d===""?delete l.itemSize:l.itemSize=d;const y=j(a,u=>{u[t]=l}),$=j(x,u=>{const S=`repeat(auto-fit, minmax(${d}px, 1fr))`;u.fields[t].classes[`.${t}-ic`]["grid-template-columns"]=S});n(y),m($),w({event:`Image Column Update to ${d}: ${l.lbl||s||t}`,type:"image_columns_update",state:{fields:y,styles:$,fldKey:t}}),setTimeout(()=>{P(t)},100)}window.selectedFieldData=l;const E=d=>{const y=j(a,S=>{S[t].tickPosition=d}),$=je(d),u=j(x,S=>{["top","left","right","bottom","transform"].forEach(H=>{x.fields[t].classes[`.${t}-check-box`][H]&&J(S,`fields->${t}->classes->.${t}-check-box->${H}`)});const D=S.fields[t].classes[`.${t}-check-box`],R=X(D,$);ee(S,`fields->${t}->classes->.${t}-check-box`,R)});m(u),n(y),w({event:`Tick Position Update to ${d}: ${l.lbl||s||t}`,type:"tick_position_update",state:{fields:y,fldKey:t}}),P(t)};return e.jsxs("div",{className:"",children:[e.jsx(ie,{title:"Field Settings",subtitle:"Image Select",fieldKey:t}),e.jsx(le,{}),e.jsx(p,{}),e.jsx(oe,{}),e.jsx(p,{}),e.jsx(ne,{}),e.jsx(p,{}),e.jsx(ae,{}),e.jsx(p,{}),e.jsx(re,{}),e.jsx(p,{}),e.jsx(ce,{}),e.jsx(p,{}),e.jsx(me,{}),e.jsx(p,{}),e.jsx(he,{}),e.jsx(p,{}),l.inpType==="checkbox"&&e.jsxs(e.Fragment,{children:[e.jsx(ve,{tip:"Set minimum number to be selected for checkbox option"}),e.jsx(p,{}),e.jsx(ye,{tip:"Set maximum number to be selected for checkbox option"}),e.jsx(p,{})]}),e.jsx(I,{id:"opt-clm-stng",title:f("Item Size"),className:i(r.fieldSection),isPro:!0,tip:f("Specify item's minimum size (in pixels)"),children:e.jsx("div",{className:i(r.placeholder),children:e.jsx("input",{"data-testid":"opt-clm-stng-inp","aria-label":"Item size",className:i(r.input),min:"50",max:"500",step:"50",type:"number",value:g,onChange:z})})}),e.jsx(p,{}),e.jsx(I,{id:"opt-clm-stng",title:f("Check Position"),className:i(r.fieldSection),isPro:!0,tip:f("Specify the check position."),children:e.jsx("div",{className:i(A.tikPosIcn),children:e.jsx(se,{className:i({w:180}),show:["icn"],tipPlace:"right",size:"120",h:"37px",options:[{icn:e.jsx(ge,{size:"30"}),label:"top-left",tip:"Top Left"},{icn:e.jsx(fe,{size:"30"}),label:"top-right",tip:"Top Right"},{icn:e.jsx(te,{size:"30"}),label:"center",tip:"Center"},{icn:e.jsx(xe,{size:"30"}),label:"bottom-left",tip:"Bottom Left"},{icn:e.jsx(ue,{size:"30"}),label:"bottom-right",tip:"Bottom Right"}],onChange:d=>E(d),defaultActive:l.tickPosition})})}),e.jsx(p,{}),e.jsx(be,{}),e.jsx(p,{}),e.jsx(de,{type:"entryUnique",title:"Unique Entry",tipTitle:L.uniqueEntry,className:i(r.fieldSection,r.hover_tip),isUnique:"show"}),e.jsx(p,{}),e.jsx("div",{className:i(r.fieldSection),children:e.jsxs(V,{dataTestId:"edt-opt-stng",variant:"primary-outline",size:"sm",className:i({mt:10}),onClick:o,children:[f("Add/Edit Options"),e.jsx("span",{className:i(A.plsIcn),children:e.jsx(W,{size:"13",stroke:"3"})})]})}),e.jsx(p,{}),e.jsx(Q,{md:!0,autoHeight:!0,show:b,setModal:v,className:"o-v",title:f("Options"),width:"800px",children:e.jsx(pe,{optionMdl:b,options:h,setOptions:d=>N(d),lblKey:"lbl",valKey:"val",imgKey:"img",type:l.typ,showUpload:!0,onlyVisualOptionsTab:!0})})]})}var nt=K.memo(Se);const A={plsIcn:{ml:3,mt:3,tm:"rotate(45deg)"},tikPosIcn:{flx:"align-center",mt:10},icn:{mr:2}};export{nt as default};