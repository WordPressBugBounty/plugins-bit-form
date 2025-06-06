import{t as $,j as e,a as A,g as G,r as L,p as M,_ as c,B as E,ba as K,aW as z,aq as R,f as y,bu as u}from"./main-579.js";import{F as i}from"./bf-383-142.js";import{a as h}from"./bf-493-110.js";import{F as q,a as V,S as W,A as J,b as Q,H as U,c as X}from"./bf-722-93.js";import{F as Y}from"./bf-269-318.js";import{F as Z}from"./bf-566-319.js";import{F as o}from"./bf-265-179.js";import{O as ee}from"./bf-887-322.js";import{P as te}from"./bf-584-323.js";import{R as ie}from"./bf-287-320.js";import{E as oe}from"./bf-406-324.js";import{S}from"./bf-603-111.js";import"./bf-831-79.js";import"./bf-762-72.js";import"./bf-652-81.js";import"./bf-370-82.js";import"./bf-879-84.js";import"./bf-559-69.js";import"./bf-167-107.js";import"./bf-268-108.js";import"./bf-677-109.js";import"./bf-957-112.js";import"./bf-160-113.js";import"./bf-271-114.js";import"./bf-254-80.js";import"./bf-16-115.js";import"./bf-934-71.js";import"./bf-40-178.js";import"./bf-274-130.js";import"./bf-651-143.js";import"./bf-672-141.js";import"./bf-636-305.js";import"./bf-607-321.js";import"./bf-420-73.js";import"./bf-244-83.js";import"./bf-805-140.js";const Ke=()=>{const{fieldKey:l}=$();if(!l)return e.jsx(e.Fragment,{children:"No field exist with this field key"});const{css:a}=A(),[g,m]=G(R),[f,j]=L.useState(!1),s=M(g[l]),b=s.adminLbl||"",{options:C}=s,{selectedFlagImage:F,selectedCountryClearable:P,searchClearable:v,optionFlagImage:N,detectCountryByIp:O,detectCountryByGeo:B,showSearchPh:x,searchPlaceholder:k,noCountryFoundText:I,maxHeight:le}=s.config,w=()=>{j(!0)},T=()=>{j(!1)},_=t=>{const r=t.find(d=>d.check),n=y(g,d=>{d[l].options=t,d[l].config.defaultValue=r?r.i:""});m(n),u({event:`Modify Options List: ${s.lbl||l}`,type:"options_modify",state:{fields:n,fldKey:l}})},p=(t,r)=>{s.config[r]=t;const n=y(g,d=>{d[l]=s});m(n),u({event:`${se[r]} '${String(t||"Off").replace("true","On")}': ${s.lbl||l}`,type:`${r}_changed`,state:{fields:n,fldKey:l}})},D=t=>{t.target.checked?(s.config.searchPlaceholder="Search Country Here...",s.config.showSearchPh=!0):(s.config.searchPlaceholder="",s.config.showSearchPh=!1);const r=t.target.checked?"Show":"Hide",n=y(g,d=>{d[l]=s});m(n),u({event:`${r} Search Placeholder: ${s.lbl||b||l}`,type:"toggle_search_placeholder",state:{fields:n,fldKey:l}})};function H(t){s.config.searchPlaceholder=t.target.value;const r=y(g,n=>{n[l]=s});m(r),u({event:`Search Placeholder updated: ${s.lbl||b||l}`,type:"change_placeholder",state:{fields:r,fldKey:l}})}return window.selectedFieldData=s,e.jsxs(e.Fragment,{children:[e.jsx(q,{title:"Field Settings",subtitle:s.typ,fieldKey:l}),e.jsx(V,{}),e.jsx(o,{}),e.jsx(W,{}),e.jsx(o,{}),e.jsx(J,{}),e.jsx(o,{}),e.jsx(Q,{}),e.jsx(o,{}),e.jsx(ie,{}),e.jsx(o,{}),e.jsx(te,{}),e.jsx(o,{}),e.jsx(U,{}),e.jsx(o,{}),e.jsx(Z,{}),e.jsx(o,{}),e.jsx(Y,{}),e.jsx(o,{}),e.jsx(S,{id:"srch-plchldr-stng",title:c("Search Placeholder"),className:a(i.fieldSection,i.hover_tip),switching:!0,tip:"By disabling this option, the search placeholder text will be remove",tipProps:{width:250,icnSize:17},toggleAction:D,toggleChecked:x,open:x,disable:!x,isPro:!0,proProperty:"searchPlaceholder",children:e.jsx("div",{className:a(i.placeholder),children:e.jsx("input",{"data-testid":"srch-plchldr-stng-inp","aria-label":"Placeholer for Country Search",placeholder:"Type Placeholder here...",className:a(i.input),type:"text",value:k,onChange:H})})}),e.jsx(o,{}),e.jsx(S,{id:"cntry-nt-fund-stng",title:c("Country Not Found Text"),className:a(i.fieldSection),isPro:!0,proProperty:"countryNotFoundText",children:e.jsx("div",{className:a(i.placeholder),children:e.jsx("input",{"data-testid":"cntry-nt-fund-inp","aria-label":"Country Not Found Text",placeholder:"Type no country found text here...",className:a(i.input),type:"text",value:I,onChange:t=>p(t.target.value,"noCountryFoundText")})})}),e.jsx(o,{}),e.jsx(h,{id:"shw-slctd-img-stng",tip:"By disabling this option, the show selected flag image will be hidden",className:a(i.fieldSection,i.hover_tip,i.singleOption),title:c("Show Selected Flag Image"),action:t=>p(t.target.checked,"selectedFlagImage"),isChecked:F,isPro:!0,proProperty:"selectedFlagImage"}),e.jsx(o,{}),e.jsx(h,{id:"slctd-clrbl-stng",tip:"By disabling this option, the selected country clearable button will be hidden",className:a(i.fieldSection,i.hover_tip,i.singleOption),title:c("Selected Country Clearable"),action:t=>p(t.target.checked,"selectedCountryClearable"),isChecked:P}),e.jsx(o,{}),e.jsx(h,{id:"srch-clrbl-stng",className:a(i.fieldSection,i.hover_tip,i.singleOption),tip:"By disabling this option, the selected country search clearable button will be hidden",title:c("Search Clearable"),action:t=>p(t.target.checked,"searchClearable"),isChecked:v}),e.jsx(o,{}),e.jsx(h,{id:"opt-icn-stng",className:a(i.fieldSection,i.hover_tip,i.singleOption),tip:"By disabling this option, the option flags image will be hidden",title:c("Option Flag Image"),action:t=>p(t.target.checked,"optionFlagImage"),isChecked:N,isPro:!0,proProperty:"optionIcon"}),e.jsx(o,{}),e.jsx(h,{id:"dtct-cntry-by-ip-stng",className:a(i.fieldSection,i.hover_tip,i.singleOption),tip:"By disabling this option, are not detect county by ip",title:c("Detect Country By IP"),action:t=>p(t.target.checked,"detectCountryByIp"),isChecked:O||!1,isPro:!0,proProperty:"detectCountryByIp"}),e.jsx(o,{}),e.jsx(h,{id:"dtct-cntry-by-geo-stng",className:a(i.fieldSection,i.hover_tip,i.singleOption),tip:"By disabling this option, are not detect county by Geo location",title:c("Detect Country By Geo"),action:t=>p(t.target.checked,"detectCountryByGeo"),isChecked:B||!1,isPro:!0,proProperty:"detectCountryByGeo"}),e.jsx(o,{}),e.jsx(X,{}),e.jsx(o,{}),e.jsx(ee,{}),e.jsx(o,{}),e.jsx("div",{className:a(i.fieldSection),children:e.jsxs(E,{dataTestId:"edt-opt-stng",variant:"primary-outline",size:"sm",className:a({mt:10}),onClick:w,children:[c("Edit Options"),e.jsx("span",{className:a({ml:3,mt:3,tm:"rotate(45deg)"}),children:e.jsx(K,{size:"13",stroke:"3"})})]})}),e.jsx(o,{}),e.jsx(z,{md:!0,autoHeight:!0,show:f,setModal:T,className:"o-v",title:c("Options"),children:e.jsx("div",{className:"pos-rel",children:e.jsx(oe,{optionMdl:f,options:C,setOptions:t=>_(t),lblKey:"lbl",valKey:"val",type:"radio",onlyVisualOptionsTab:!0,hideNDisabledOptions:!0})})})]})},se={noCountryFoundText:"Country Not Found Text",selectedFlagImage:"Selected Flag Image",selectedCountryClearable:"Selected Country Clearable",searchClearable:"Search Clearable",optionFlagImage:"Allow Option Flag Image",detectCountryByIp:"Detect Country By Ip",detectCountryByGeo:"Detect Country By Geo"};export{Ke as default};
