import{h as $,w as k,u as G,r as M,a as z,q as K,j as e,_ as f,bZ as J,ag as D,az as Q,av as Z,g as u,aH as b,aZ as g,I as p,dk as W,cM as X,di as Y,dl as ee}from"./main-232.js";/* empty css          */import{F as i,A as te}from"./bf-561-157.js";import{F as se,a as ne,S as ae,A as ie,b as le,H as oe,c as re}from"./bf-270-94.js";import{E as L}from"./bf-276-327.js";import{F as T,I as de,a as c}from"./bf-59-190.js";import{S as A}from"./bf-309-84.js";import"./bf-131-111.js";import"./bf-274-112.js";import"./bf-106-80.js";import"./bf-811-83.js";import"./bf-847-113.js";import"./bf-744-156.js";import"./bf-678-70.js";import"./bf-368-193.js";import"./bf-800-117.js";import"./bf-80-121.js";import"./bf-770-145.js";import"./bf-771-108.js";import"./bf-114-109.js";import"./bf-928-110.js";import"./bf-493-114.js";import"./bf-139-115.js";import"./bf-29-124.js";import"./bf-823-123.js";import"./bf-300-79.js";import"./bf-283-116.js";import"./bf-326-72.js";function I({btnType:t,btnName:d,switching:x,handleButtonAlignment:_,btnAlignmentList:h}){const[l,s]=$(D),{fieldKey:r}=k(),y=G(Q),[S,P]=$(Z),[B,j]=M.useState(!1),[N,F]=M.useState(""),{css:n}=z(),a=K(l[r]),o=a.adminLbl||"",R=`This ${d} is use to add/remove a repeatative Section. you can show or hide this ${d} by toggling this option.`,q=({target:{checked:m}})=>{a[t].show=m;const w=m?"Show":"Hide",v=u(l,U=>{U[r]=a});s(v),b(r),g({event:`${w} Repeater ${d}:  ${a[t].txt||o||r}`,type:`${w}_repeater_${t}`,state:{fields:v,fldKey:r}})},O=({target:{value:m}})=>{if(!p)return;a[t].txt=m;const w=u(l,v=>{v[r]=a});s(w),b(r),g({event:`${d} Text Update: ${o||a[t].txt||r}`,type:`${t}_txt_change`,state:{fields:w,fldKey:r}})},E=m=>{p&&(W(S,r,X[m])||Y(y,m),ee(m,r),F(m),j(!0))},C=m=>{if(p&&a[m]){delete a[m];const w=u(l,v=>{v[r]=a});s(w),b(r)}};return e.jsxs("div",{children:[e.jsxs(A,{id:`${t}-rpt-btn-stng`,title:f(d),className:n(i.fieldSection,i.hover_tip),switching:x,tip:R,tipProps:{width:250,icnSize:17},toggleAction:q,toggleChecked:a==null?void 0:a[t].show,isPro:!0,children:[e.jsx("div",{className:n(i.placeholder),children:e.jsx(te,{id:`${t}-rpt-btn-stng`,ariaLabel:`${d} Repeater Button Text`,placeholder:"Type Button Text here...",value:a==null?void 0:a[t].txt,changeAction:O})}),e.jsx(T,{label:"Leading Icon",iconSrc:a==null?void 0:a[`${t}PreIcn`],styleRoute:`${H[t]}-pre-i`,setIcon:()=>E(`${t}PreIcn`),removeIcon:()=>C(`${t}PreIcn`),proProperty:"leadingIcon"}),e.jsx(T,{label:"Trailing Icon",iconSrc:a==null?void 0:a[`${t}SufIcn`],styleRoute:`${H[t]}-suf-i`,setIcon:()=>E(`${t}SufIcn`),removeIcon:()=>C(`${t}SufIcn`),proProperty:"trailingIcon"}),t==="addToEndBtn"&&e.jsxs("div",{className:n(i.fieldNumber,{py:"0px !important",mx:5}),children:[e.jsx("span",{children:f("Button Alignment:")}),e.jsx("select",{"data-testid":"btn-algn-slct",className:n(i.input,i.w140),name:"",id:"",value:a[t].btnAlignment,onChange:_,children:h.map(m=>e.jsx("option",{value:m.value,children:m.name},`btcd-k-${m.name}`))})]})]}),e.jsxs(J,{md:!0,autoHeight:!0,show:B,setModal:j,className:"o-v",title:f("Icons"),children:[e.jsx("div",{className:"pos-rel"}),e.jsx(de,{iconType:N,setModal:j})]})]})}const H={addBtn:"rpt-add-btn",removeBtn:"rpt-rmv-btn",addToEndBtn:"add-to-end-btn"};function me(){const{fieldKey:t}=k();if(!t)return e.jsx(e.Fragment,{children:"No field exist with this field key"});const[d,x]=$(D),[_,h]=$(Z),{css:l}=z(),s=K(d[t]),r=s.adminLbl||"";function y(n){if(!p)return;n.target.value===""?delete s.defaultRow:s.defaultRow=n.target.value;const a=u(d,o=>{o[t]=s});x(a),g({event:`Default Row updated to ${n.target.value}: ${s.lbl||r||t}`,type:"set_min",state:{fields:a,fldKey:t}})}function S(n){if(!p)return;n.target.value===""?delete s.minRow:(s.minRow=n.target.value,s.err||(s.err={}),s.err.minRow||(s.err.minRow={}),s.err.minRow.dflt=`<p style="margin:0">Minimum Repeatable Row is ${n.target.value}<p>`,s.err.minRow.show=!0);const a=u(d,o=>{o[t]=s});x(a),g({event:`Minimum Row updated to ${n.target.value}: ${s.lbl||r||t}`,type:"set_min",state:{fields:a,fldKey:t}})}function P(n){if(!p)return;n.target.value===""?delete s.maxRow:(s.maxRow=n.target.value,s.err||(s.err={}),s.err.maxRow||(s.err.maxRow={}),s.err.maxRow.dflt=`<p style="margin:0">Maximum Repeatable Row is ${n.target.value}</p>`,s.err.maxRow.show=!0);const a=u(d,o=>{o[t]=s});x(a),g({event:`Maximum Row updated to ${n.target.value}: ${s.lbl||r||t}`,type:"set_max",state:{fields:a,fldKey:t}})}function B({target:{value:n}}){p&&(h(a=>u(a,o=>{o.fields[t].classes[`.${t}-rpt-wrp`]["flex-direction"]=n})),s.btnPosition=n,x(u(d,a=>{a[t]=s})),g({event:`Button Position changed to ${n}: ${s.txt}`,type:"set_btn_posn",state:{fields:d,fldKey:t}}),b(t))}function j({target:{value:n}}){if(!p)return;h(o=>u(o,R=>{R.fields[t].classes[`.${t}-pair-btn-wrp`]["align-self"]=n})),s.btnAlignment=n;const a=u(d,o=>{o[t]=s});x(a),g({event:`Button Alignment updated to ${n}: ${s.lbl||r||t}`,type:"set_btn_align",state:{fields:a,fldKey:t}})}function N({target:{value:n}}){if(!p)return;h(o=>u(o,R=>{R.fields[t].classes[`.${t}-add-to-end-btn-wrp`]["align-self"]=n})),s.addToEndBtn||(s.addToEndBtn={}),s.addToEndBtn.btnAlignment=n;const a=u(d,o=>{o[t]=s});x(a),g({event:`Button Alignment updated to ${n}: ${s.lbl||r||t}`,type:"set_to_end_btn_align",state:{fields:a,fldKey:t}}),b(t)}function F({target:{value:n}}){p&&(h(a=>u(a,o=>{o.fields[t].classes[`.${t}-pair-btn-wrp`]["flex-direction"]=n})),s.btnView=n,x(u(d,a=>{a[t]=s})),g({event:`Button View to ${n}: ${s.txt}`,type:"set_btn_posn",state:{fields:d,fldKey:t}}),b(t))}return e.jsxs("div",{className:"",children:[e.jsx(se,{title:"Field Settings",subtitle:s.typ,fieldKey:t}),e.jsx(ne,{}),e.jsx(c,{}),e.jsx(ae,{}),e.jsx(c,{}),e.jsx(ie,{}),e.jsx(c,{}),e.jsx(le,{}),e.jsx(c,{}),e.jsx(oe,{}),e.jsx(c,{}),e.jsx(re,{}),e.jsx(c,{}),e.jsx(A,{id:"rpt-count-stng",title:"Repeatable Row Count(Min/Max):",className:l(i.fieldSection),isPro:!0,children:e.jsxs("div",{className:l({mx:5}),children:[e.jsxs("div",{className:l(i.fieldNumber,{py:"0px !important"}),children:[e.jsx("span",{children:f("Default Row:")}),e.jsx("input",{"data-testid":"nmbr-stng-min-inp",title:"Default Repeatable Row","aria-label":"Default Repeatable Row",placeholder:"Type Default Row...",className:l(i.input,i.w140),type:"number",value:s.defaultRow,onChange:y,min:0})]}),e.jsxs("div",{className:l(i.fieldNumber,{py:"0px !important"}),children:[e.jsx("span",{children:f("Minimum Row:")}),e.jsx("input",{"data-testid":"nmbr-stng-min-inp",title:"Minimum Repeatable Row","aria-label":"Minimum Repeatable Row",placeholder:"Type minimum row..",className:l(i.input,i.w140),type:"number",value:s.minRow,onChange:S,min:0})]}),!!Number(s.minRow)&&e.jsx(L,{id:"nmbr-stng-min",type:"minRow",title:"Min Error Message",tipTitle:`By enabling this feature, user will see the error message when repeatable row is less than ${s.minRow}`}),e.jsxs("div",{className:l(i.fieldNumber,{py:"0px !important"}),children:[e.jsx("span",{children:f("Maximum Row:")}),e.jsx("input",{"data-testid":"nmbr-stng-max-inp",title:"Maximum Repeatable Row","aria-label":"Maximum Repeatable Row",placeholder:"Type maximun row..",className:l(i.input,i.w140),type:"number",value:s.maxRow,onChange:P,min:0})]}),!!Number(s.maxRow)&&e.jsx(L,{id:"nmbr-stng-max",type:"maxRow",title:"Max Error Message",tipTitle:`By enabling this feature, user will see the error message when repeatable row is greater than ${s.maxRow}`})]})}),e.jsx(c,{}),e.jsx(A,{id:"rpt-count-stng",title:"Button Layout and Position:",className:l(i.fieldSection),isPro:!0,children:e.jsxs("div",{className:l({mx:5}),children:[e.jsxs("div",{className:l(i.fieldNumber,{py:"0px !important"}),children:[e.jsx("span",{children:f("Button Position:")}),e.jsx("select",{"data-testid":"btn-posn-slct",className:l(i.input,i.w140),name:"",id:"",value:s.btnPosition,onChange:B,children:ue.map(n=>e.jsx("option",{value:n.value,children:n.name},`btcd-k-${n.name}`))})]}),e.jsxs("div",{className:l(i.fieldNumber,{py:"0px !important"}),children:[e.jsx("span",{children:f("Button Alignment:")}),e.jsx("select",{"data-testid":"btn-algn-slct",className:l(i.input,i.w140),name:"",id:"",value:s.btnAlignment,onChange:j,children:V.map(n=>e.jsx("option",{value:n.value,children:n.name},`btcd-k-${n.name}`))})]}),e.jsxs("div",{className:l(i.fieldNumber,{py:"0px !important"}),children:[e.jsx("span",{children:f("Button View:")}),e.jsx("select",{"data-testid":"btn-view-slct",className:l(i.input,i.w140),name:"",id:"",value:s.btnView,onChange:F,children:ce.map(n=>e.jsx("option",{value:n.value,children:n.name},`btcd-k-${n.name}`))})]})]})}),e.jsx(c,{}),e.jsx(I,{btnType:"addBtn",btnName:"Add Button",switching:!0}),e.jsx(c,{}),e.jsx(I,{btnType:"removeBtn",btnName:"Remove Button"}),e.jsx(c,{}),e.jsx(I,{btnType:"addToEndBtn",btnName:"Add To End Button",switching:!0,handleButtonAlignment:N,btnAlignmentList:V}),e.jsx(c,{})]})}const ue=[{name:"Top",value:"column-reverse"},{name:"Bottom",value:"column"},{name:"Left",value:"row-reverse"},{name:"Right",value:"row"}],V=[{name:"Start",value:"start"},{name:"Center",value:"center"},{name:"End",value:"end"}],ce=[{name:"Vertical",value:"column"},{name:"Vertical-reverse",value:"column-reverse"},{name:"Horizontal",value:"row"},{name:"Horizontal-Reverse",value:"row-reverse"}];var ze=M.memo(me);export{ze as default};