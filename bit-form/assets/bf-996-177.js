import{w as _,h as T,a as w,a1 as J,j as t,_ as d,ag as $,aw as K,I as Q,g as f,bk as F,u as N,r as y,q as A,aM as W,aA as z,dn as H,aI as b,dq as E,cO as V,dr as G}from"./main-396.js";import"./bf-75-72.js";import{F as X,a as Y,S as Z,A as D,b as ee,H as te,c as ne}from"./bf-745-94.js";import{I as q,F as I}from"./bf-34-181.js";import{R as se}from"./bf-11-322.js";import{F as c}from"./bf-108-145.js";import{t as U,F as R}from"./bf-733-180.js";import{a as oe}from"./bf-834-111.js";import{A as O}from"./bf-134-146.js";import{S as L}from"./bf-482-112.js";import"./bf-470-75.js";import"./bf-577-85.js";import"./bf-672-108.js";import"./bf-425-109.js";import"./bf-852-110.js";import"./bf-103-113.js";import"./bf-41-114.js";import"./bf-667-115.js";import"./bf-245-84.js";import"./bf-754-116.js";import"./bf-464-117.js";import"./bf-419-74.js";import"./bf-536-144.js";import"./bf-995-192.js";import"./bf-341-323.js";import"./bf-533-132.js";import"./bf-371-135.js";function ie({cls:i}){const{fieldKey:o}=_(),[n,m]=T($),a=n[o].btnDir||!1,{css:g}=w(),r=J(K),v=({target:j})=>{if(!Q)return;const{checked:x}=j;let e="row";const p=f(n,B=>{const S=B[o];x?(S.btnDir="row-reverse",e="row-reverse"):delete S.btnDir});r(B=>f(B,S=>{S.fields[o].classes[`.${o}-ctrl`]["flex-direction"]=e}));const h=x?"on":"off";m(p),F({event:`Button reverse ${h}`,type:"button_reverse_on_off",state:{fields:p,fldKey:o}})};return t.jsx("div",{className:`${g(c.fieldSection,c.hover_tip,c.singleOption)} ${i}`,children:t.jsx(oe,{id:"fld-hid-stng",tip:U.btnReverse,title:d("Button Reverse"),action:v,isChecked:a,isPro:!0,proProperty:"reverse"})})}function le(){const[i,o]=T($),{fieldKey:n}=_(),m=N(z),a=N(K),[g,r]=y.useState(!1),[v,j]=y.useState(""),{css:x}=w(),e=A(i[n]),p=(e==null?void 0:e.clrBtn)||"",h=e.adminLbl||"",B=({target:{checked:s}})=>{s?(e.clrBtn=d("Clear"),e.clrBtnHide=!1,H(m,"clrBtn")):(delete e.clrBtn,delete e.clrPreIcn,delete e.clrSufIcn,e.clrBtnHide=!0);const l=s?"on":"off",u=f(i,M=>{M[n]=e});o(u),b(n),F({event:`Clear Button ${l}:  ${p||h||n}`,type:`clr_btn_${l}`,state:{fields:u,fldKey:n}})},S=({target:{value:s}})=>{s===""?(delete e.clrBtn,b(n)):e.clrBtn=s;const l=f(i,u=>{u[n]=e});o(l),b(n),F({event:`Clear btn text updated: ${h||p||n}`,type:"change_clr_btn_txt",state:{fields:l,fldKey:n}})},P=s=>{E(a,n,V[s])||H(m,s),G(s,n),j(s),r(!0)},C=s=>{if(e[s]){delete e[s];const l=f(i,u=>{u[n]=e});o(l),b(n)}};return t.jsxs("div",{children:[t.jsxs(L,{id:"clr-button-stng",title:d("Clear Button"),className:x(c.fieldSection,c.hover_tip),switching:!0,tip:U.clrBtn,tipProps:{width:250,icnSize:17},toggleAction:B,toggleChecked:!(e!=null&&e.clrBtnHide),open:!(e!=null&&e.clrBtnHide),disable:e==null?void 0:e.clrBtnHide,children:[t.jsx("div",{className:x(c.placeholder),children:t.jsx(O,{id:"clr-btn-stng",ariaLabel:"Clear Button for this Field",placeholder:"Type clear button txt here...",value:p,changeAction:S})}),t.jsx(R,{label:"Leading Icon",iconSrc:e==null?void 0:e.clrPreIcn,styleRoute:"clr-btn-pre-i",setIcon:()=>P("clrPreIcn"),removeIcon:()=>C("clrPreIcn"),isPro:!0,proProperty:"leadingIcon"}),t.jsx(R,{label:"Trailing Icon",iconSrc:e==null?void 0:e.clrSufIcn,styleRoute:"undo-btn-suf-i",setIcon:()=>P("clrSufIcn"),removeIcon:()=>C("clrSufIcn"),isPro:!0,proProperty:"trailingIcon"})]}),t.jsxs(W,{md:!0,autoHeight:!0,show:g,setModal:r,className:"o-v",title:d("Icons"),children:[t.jsx("div",{className:"pos-rel"}),t.jsx(q,{iconType:v,setModal:r})]})]})}const re=[{name:d("Left"),value:"start"},{name:d("Center"),value:"center"},{name:d("Right"),value:"end"},{name:d("Space Between"),value:"space-between"}];function ce(){const{fieldKey:i}=_(),{css:o}=w(),[n,m]=T(K),[a,g]=T($),r=A(a[i]),[v,j]=y.useState(r.btnAlign);function x(e){const{value:p}=e.target;m(h=>f(h,B=>{B.fields[i].classes[`.${i}-ctrl`]["justify-content"]=p})),r.btnAlign=p,g(f(a,h=>{h[i]=r})),j(p),F({event:`Button Alignment changed to ${p}: ${r.txt}`,type:"set_btn_align",state:{fields:a,fldKey:i}})}return t.jsx(L,{id:"btn-algn",title:d("Button Align"),className:o(c.fieldSection),open:!0,children:t.jsx("div",{className:o(c.placeholder),children:t.jsx("select",{"data-testid":"btn-algn-slct",className:o(c.input),name:"",id:"",value:v,onChange:x,children:re.map(e=>t.jsx("option",{value:e.value,children:e.name},`btcd-k-${e.name}`))})})})}function de(){const[i,o]=T($),{fieldKey:n}=_(),m=N(z),a=N(K),[g,r]=y.useState(!1),[v,j]=y.useState(""),{css:x}=w(),e=A(i[n]),p=(e==null?void 0:e.redoBtn)||"",h=e.adminLbl||"",B=({target:{checked:s}})=>{s?(e.redoBtn=d("Redo"),e.redoBtnHide=!1,H(m,"redoBtn")):(delete e.redoBtn,delete e.redoPreIcn,delete e.redoSufIcn,e.redoBtnHide=!0);const l=s?"on":"off",u=f(i,M=>{M[n]=e});o(u),b(n),F({event:`Redo Button ${l}:  ${p||h||n}`,type:`redo_btn_${l}`,state:{fields:u,fldKey:n}})},S=({target:{value:s}})=>{s===""?(delete e.redoBtn,b(n)):e.redoBtn=s;const l=f(i,u=>{u[n]=e});o(l),b(n),F({event:`Redo btn text updated: ${h||e.redoBtn||n}`,type:"change_redo_btn_txt",state:{fields:l,fldKey:n}})},P=s=>{E(a,n,V[s])||H(m,s),G(s,n),j(s),r(!0)},C=s=>{if(e[s]){delete e[s];const l=f(i,u=>{u[n]=e});o(l),b(n)}};return t.jsxs("div",{children:[t.jsxs(L,{id:"redo-button-stng",title:d("Redo Button"),className:x(c.fieldSection,c.hover_tip),switching:!0,tip:U.redoBtn,tipProps:{width:250,icnSize:17},toggleAction:B,toggleChecked:!(e!=null&&e.redoBtnHide),open:!(e!=null&&e.redoBtnHide),disable:e==null?void 0:e.redoBtnHide,children:[t.jsx("div",{className:x(c.placeholder),children:t.jsx(O,{id:"redo-btn-stng",ariaLabel:"Redo Button for this Field",placeholder:"Type redo button txt here...",value:p,changeAction:S})}),t.jsx(R,{label:"Leading Icon",iconSrc:e==null?void 0:e.redoPreIcn,styleRoute:"redo-btn-pre-i",setIcon:()=>P("redoPreIcn"),removeIcon:()=>C("redoPreIcn"),isPro:!0,proProperty:"leadingIcon"}),t.jsx(R,{label:"Trailing Icon",iconSrc:e==null?void 0:e.redoSufIcn,styleRoute:"redo-btn-suf-i",setIcon:()=>P("redoSufIcn"),removeIcon:()=>C("redoSufIcn"),isPro:!0,proProperty:"trailingIcon"})]}),t.jsxs(W,{md:!0,autoHeight:!0,show:g,setModal:r,className:"o-v",title:d("Icons"),children:[t.jsx("div",{className:"pos-rel"}),t.jsx(q,{iconType:v,setModal:r})]})]})}const ae={penColor:d("Pen Color"),backgroundColor:d("Background Color"),maxWidth:d("Pen Width"),imgTyp:d("Image Type")};function ue(){const{fieldKey:i}=_(),{css:o}=w(),[n,m]=T($),a=A(n[i]);function g(r){const{value:v,name:j}=r.target;a.config[j]=v,m(f(n,x=>{x[i]=a})),F({event:`${ae[j]} changed to ${v}: ${a.txt}`,type:`signature_pad_${j}`,state:{fields:n,fldKey:i}})}return t.jsx(L,{id:"signature-pad",title:d("Signature Pad"),className:o(c.fieldSection),open:!0,children:t.jsxs("div",{className:o(c.placeholder),children:[t.jsxs("div",{className:o(k.inpWrp),children:[t.jsx("label",{htmlFor:"maxWidth",children:"Pen Width"}),t.jsx("input",{className:o(c.input,{w:"30%"}),type:"text",name:"maxWidth",id:"maxWidth",min:"1",max:"10",value:a.config.maxWidth,step:"0.1",onChange:g})]}),t.jsxs("div",{className:o(k.inpWrp),children:[t.jsx("label",{htmlFor:"penColor",children:"Pen Color"}),t.jsx("input",{className:o(c.input,{w:"30%"}),type:"color",name:"penColor",id:"penColor",value:a.config.penColor,onChange:g})]}),t.jsxs("div",{className:o(k.inpWrp),children:[t.jsx("label",{htmlFor:"backgroundColor",children:"Background Color"}),t.jsx("input",{className:o(c.input,{w:"30%"}),type:"color",name:"backgroundColor",id:"backgroundColor",value:a.config.backgroundColor,onChange:g})]}),t.jsxs("div",{className:o(k.inpWrp),children:[t.jsx("label",{htmlFor:"imgTyp",children:"Image Type"}),t.jsxs("select",{className:o(c.input,{w:"30%"}),name:"imgTyp",id:"imgTyp",value:a.config.imgTyp,onChange:g,children:[t.jsx("option",{value:"image/png",children:"PNG"}),t.jsx("option",{value:"image/jpeg",children:"JPEG"}),t.jsx("option",{value:"image/svg+xml",children:"SVG"})]})]})]})})}const k={inpWrp:{flx:"center-between",mx:5}};function pe(){const[i,o]=T($),{fieldKey:n}=_(),m=N(z),a=N(K),[g,r]=y.useState(!1),[v,j]=y.useState(""),{css:x}=w(),e=A(i[n]),p=(e==null?void 0:e.undoBtn)||"",h=e.adminLbl||"",B=({target:{checked:s}})=>{s?(e.undoBtn=d("Undo"),e.undoBtnHide=!1,H(m,"undoBtn")):(delete e.undoBtn,delete e.undoPreIcn,delete e.undoSufIcn,e.undoBtnHide=!0);const l=s?"on":"off",u=f(i,M=>{M[n]=e});o(u),b(n),F({event:`Undo Button ${l}:  ${p||h||n}`,type:`undo_btn_${l}`,state:{fields:u,fldKey:n}})},S=({target:{value:s}})=>{s===""?(delete e.undoBtn,b(n)):e.undoBtn=s;const l=f(i,u=>{u[n]=e});o(l),b(n),F({event:`Undo btn text updated: ${h||e.undoBtn||n}`,type:"change_undo_btn_txt",state:{fields:l,fldKey:n}})},P=s=>{E(a,n,V[s])||H(m,s),G(s,n),j(s),r(!0)},C=s=>{if(e[s]){delete e[s];const l=f(i,u=>{u[n]=e});o(l),b(n)}};return t.jsxs("div",{children:[t.jsxs(L,{id:"undo-button-stng",title:d("Undo Button"),className:x(c.fieldSection,c.hover_tip),switching:!0,tip:U.undoBtn,tipProps:{width:250,icnSize:17},toggleAction:B,toggleChecked:!(e!=null&&e.undoBtnHide),open:!(e!=null&&e.undoBtnHide),disable:e==null?void 0:e.undoBtnHide,children:[t.jsx("div",{className:x(c.placeholder),children:t.jsx(O,{id:"undo-btn-stng",ariaLabel:"Undo Button for this Field",placeholder:"Type undo button txt here...",value:p,changeAction:S})}),t.jsx(R,{label:"Leading Icon",iconSrc:e==null?void 0:e.undoPreIcn,styleRoute:"undo-btn-pre-i",setIcon:()=>P("undoPreIcn"),removeIcon:()=>C("undoPreIcn"),isPro:!0,proProperty:"leadingIcon"}),t.jsx(R,{label:"Trailing Icon",iconSrc:e==null?void 0:e.undoSufIcn,styleRoute:"undo-btn-suf-i",setIcon:()=>P("undoSufIcn"),removeIcon:()=>C("undoSufIcn"),isPro:!0,proProperty:"trailingIcon"})]}),t.jsxs(W,{md:!0,autoHeight:!0,show:g,setModal:r,className:"o-v",title:d("Icons"),children:[t.jsx("div",{className:"pos-rel"}),t.jsx(q,{iconType:v,setModal:r})]})]})}function me(){const{fieldKey:i}=_();if(!i)return t.jsx(t.Fragment,{children:"No field exist with this field key"});const[o,n]=y.useState(!1),[m,a]=y.useState(""),g=N($),r=A(g[i]);return t.jsxs(t.Fragment,{children:[t.jsxs("div",{className:"",children:[t.jsx(X,{title:"Field Settings",subtitle:r.typ,fieldKey:i}),t.jsx(Y,{}),t.jsx(I,{}),t.jsx(Z,{}),t.jsx(I,{}),t.jsx(D,{}),t.jsx(I,{}),t.jsx(ee,{}),t.jsx(I,{}),t.jsx(ue,{}),t.jsx(I,{}),t.jsx(ce,{}),t.jsx(I,{}),t.jsx(ie,{}),t.jsx(I,{}),t.jsx(le,{}),t.jsx(I,{}),t.jsx(pe,{}),t.jsx(I,{}),t.jsx(de,{}),t.jsx(I,{}),t.jsx(te,{}),t.jsx(I,{}),t.jsx(se,{}),t.jsx(I,{}),t.jsx(ne,{}),t.jsx(I,{})]}),t.jsxs(W,{md:!0,autoHeight:!0,show:o,setModal:n,className:"o-v",title:d("Icons"),children:[t.jsx("div",{className:"pos-rel"}),t.jsx(q,{iconType:m,setModal:n})]})]})}var qe=y.memo(me);export{qe as default};