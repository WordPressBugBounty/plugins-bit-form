import{j as s,v as I,a6 as u,aF as v,w as z,aQ as w,bV as g,_ as f,cV as b,cK as F,cL as m,cl as N,cM as C,cR as k,a as y}from"./main-347.js";import{q as L,r as M,T as R,a as S,C as D,R as $,N as P,D as T,c as B,U as G,d as U,e as W,M as O,W as E,f as H,g as V,G as _,B as q,o as A,k as Q,m as J,n as X,l as Y,b as Z,P as K,F as ss,p as es,i as is,j as ts,I as ns,h as as,S as cs}from"./bf-203-136.js";import{C as rs}from"./bf-11-82.js";import{D as os}from"./bf-733-137.js";import{R as ls}from"./bf-907-81.js";import{U as ds}from"./bf-822-132.js";function xs({w:i}){return s.jsxs("svg",{className:"btc-line-icn",viewBox:"0 0 172.3 163.8",width:i,children:[s.jsx("path",{className:"line-icn",d:`M146.6,150.5h-118c-11.4,0-20.7-9.3-20.7-20.7V28.7C8,17.3,17.3,8,28.7,8h118c11.4,0,20.7,9.3,20.7,20.7v101.1
          C167.3,141.2,158.1,150.5,146.6,150.5z`}),s.jsx("path",{className:"line-icn",strokeWidth:"12",d:"M31.5,106.2l34-47.6c2.1-3,6.5-3.1,8.8-0.2l31.4,39.5"}),s.jsx("path",{className:"line-icn",strokeWidth:"12",d:"M93.2,86l12.8-15.1c2.1-3,6.5-3.1,8.8-0.2l31.4,39.5"}),s.jsx("path",{className:"line-icn",strokeWidth:"9",d:`M126,38.3L126,38.3c-2.1,0-3.8-1.7-3.8-3.8v0c0-2.1,1.7-3.8,3.8-3.8h0c2.1,0,3.8,1.7,3.8,3.8v0
          C129.8,36.6,128.1,38.3,126,38.3z`})]})}function js({icn:i,title:n,subTitle:a,fieldKey:e}){const{formType:t,formID:o}=I(),r=u(v),l=z(),c=w(`.${e}-fld-wrp.drag`),h=()=>{r(e),c&&c.classList.remove("drag-hover"),l(`/form/builder/${t}/${o}/field-settings/${e}`)},x=p=>{if(!c)return;const{type:j}=p;j==="mouseenter"?c.classList.add("drag-hover"):j==="mouseleave"&&c.classList.remove("drag-hover")};return s.jsx("button",{type:"button","data-testid":`fld-lst-itm-${i}-${e}`,onClick:h,onMouseEnter:x,onMouseLeave:x,className:"btc-s-l mt-2",children:s.jsxs("div",{className:"flx flx-between ",children:[s.jsxs("div",{className:"flx w-9",children:[s.jsx("span",{className:"lft-icn mr-2 flx br-50",children:typeof i=="string"?ms(i):i}),s.jsxs("div",{className:"w-nwrp o-h",children:[s.jsx("div",{className:"txt-o o-h mb-1",children:g(n)}),a&&s.jsxs("small",{children:[f("Key:"),` ${a}`]})]})]}),s.jsx(b,{size:18})]})})}const ms=i=>({title:s.jsx(L,{w:"14"}),divider:s.jsx(M,{w:"14"}),image:s.jsx(xs,{w:"14"}),text:s.jsx(R,{size:"14"}),username:s.jsx(ds,{size:"14"}),textarea:s.jsx(S,{size:"14"}),check:s.jsx(D,{w:"14"}),radio:s.jsx($,{size:"14"}),number:s.jsx(P,{w:"14"}),"html-select":s.jsx(rs,{size:"14"}),select:s.jsx(T,{w:"14"}),password:s.jsx(B,{size:"14"}),email:s.jsx(F,{size:"14"}),url:s.jsx(G,{w:"14"}),"file-up":s.jsx(m,{w:"14"}),date:s.jsx(os,{w:"14"}),time:s.jsx(U,{size:"14"}),"datetime-local":s.jsx(W,{w:"14"}),month:s.jsx(O,{w:"14"}),week:s.jsx(E,{size:"14"}),color:s.jsx(H,{w:"14"}),recaptcha:s.jsx(ls,{size:"14"}),"decision-box":s.jsx(V,{size:"14"}),gdpr:s.jsx(_,{size:"14"}),button:s.jsx(q,{size:"14"}),html:s.jsx(N,{size:"14"}),shortcode:s.jsx(A,{size:"14"}),paypal:s.jsx(Q,{w:"14"}),stripe:s.jsx(J,{size:"18"}),mollie:s.jsx(X,{size:"18"}),razorpay:s.jsx(Y,{w:"14",h:"19"}),"advanced-file-up":s.jsx(m,{w:"14"}),currency:s.jsx(Z,{size:"15"}),"phone-number":s.jsx(K,{size:"15"}),country:s.jsx(ss,{size:"14"}),section:s.jsx(es,{size:"14"}),repeater:s.jsx(is,{size:"14"}),rating:s.jsx(C,{size:"18"}),signature:s.jsx(ts,{size:"18"}),"image-select":s.jsx(ns,{size:"16"}),turnstile:s.jsx(as,{size:"16"}),range:s.jsx(cs,{size:"16"})})[i];function d(){const i=k(),n=Object.entries(i).filter(([,e])=>{var t;return(t=e==null?void 0:e.valid)==null?void 0:t.hide}),a=Object.entries(i).filter(([,e])=>{var t;return!((t=e==null?void 0:e.valid)!=null&&t.hide)});return s.jsxs(s.Fragment,{children:[s.jsx(d.Group,{title:`Hidden Fields (${n.length})`,filteredFields:n}),s.jsx(d.Group,{title:`Fields (${a.length})`,filteredFields:a})]})}const hs=({title:i,filteredFields:n})=>{const{css:a}=y();return n.length?s.jsxs("div",{children:[s.jsx("div",{className:a(ps.title),children:i}),n.map(([e,t])=>{let{lbl:o}=t;const{typ:r,adminLbl:l,txt:c}=t;return["decision-box","gdpr"].includes(r)?o=l:r==="button"&&(o=c),s.jsx(js,{fieldKey:e,icn:r,title:o||l||r,subTitle:e},e)})]}):s.jsx(s.Fragment,{children:" "})};d.Group=hs;const ps={title:{fw:500,fs:16,mx:8,pn:"sticky",pt:14,tp:0,bd:"var(--white)",h:40}};export{d as default};