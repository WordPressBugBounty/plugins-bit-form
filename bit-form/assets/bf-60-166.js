var Y=Object.defineProperty,Z=Object.defineProperties;var ee=Object.getOwnPropertyDescriptors;var P=Object.getOwnPropertySymbols;var te=Object.prototype.hasOwnProperty,ie=Object.prototype.propertyIsEnumerable;var N=(s,i,r)=>i in s?Y(s,i,{enumerable:!0,configurable:!0,writable:!0,value:r}):s[i]=r,I=(s,i)=>{for(var r in i||(i={}))te.call(i,r)&&N(s,r,i[r]);if(P)for(var r of P(i))ie.call(i,r)&&N(s,r,i[r]);return s},O=(s,i)=>Z(s,ee(i));import{v as le,j as e,a as ae,h as se,r as b,q as oe,_ as c,I as S,B as re,ba as ne,aU as w,ao as de,g,bt as m}from"./main-365.js";import{t as k}from"./bf-102-178.js";import{F as l}from"./bf-159-142.js";import{a as f}from"./bf-258-110.js";import{F as ce,a as pe,S as ue,A as he,b as ge,H as me,c as fe}from"./bf-752-93.js";import{E as ye}from"./bf-188-321.js";import{F as xe}from"./bf-12-318.js";import{F as je}from"./bf-429-319.js";import{F as o,I as be}from"./bf-637-179.js";import{O as Se}from"./bf-565-322.js";import{P as Fe}from"./bf-740-323.js";import{R as Ce}from"./bf-609-320.js";import{U as ve}from"./bf-305-326.js";import{E as Pe}from"./bf-863-324.js";import{S as y}from"./bf-22-111.js";import"./bf-621-72.js";import"./bf-337-84.js";import"./bf-239-69.js";import"./bf-604-107.js";import"./bf-97-108.js";import"./bf-539-109.js";import"./bf-736-112.js";import"./bf-213-113.js";import"./bf-987-114.js";import"./bf-531-80.js";import"./bf-489-81.js";import"./bf-900-82.js";import"./bf-549-115.js";import"./bf-562-71.js";import"./bf-769-130.js";import"./bf-127-79.js";import"./bf-862-143.js";import"./bf-797-141.js";import"./bf-957-305.js";import"./bf-381-73.js";import"./bf-206-83.js";import"./bf-526-140.js";const gt=()=>{const{fieldKey:s}=le();if(!s)return e.jsx(e.Fragment,{children:"No field exist with this field key"});const{css:i}=ae(),[r,h]=se(de),[F,C]=b.useState(!1),[B,v]=b.useState(!1),[T,Ie]=b.useState(""),t=oe(r[s]),x=t.adminLbl||"",{placeholderImage:Oe,options:V}=t,{selectedFlagImage:_,selectedCountryClearable:H,searchClearable:M,optionFlagImage:E,detectCountryByIp:$,detectCountryByGeo:q,showSearchPh:j,searchPlaceholder:L,noCountryFoundText:U,inputFormat:A,valueFormat:D,maxHeight:we}=t.config,G=a=>{a.target.checked?(t.config.searchPlaceholder="Search Country Here...",t.config.showSearchPh=!0):(t.config.searchPlaceholder="",t.config.showSearchPh=!1);const n=a.target.checked?"Show":"Hide",d=g(r,p=>{p[s]=t});h(d),m({event:`${n} Search Placeholder: ${t.lbl||x||s}`,type:"toggle_search_placeholder",state:{fields:d,fldKey:s}})};function K(a){t.config.searchPlaceholder=a.target.value;const n=g(r,d=>{d[s]=t});h(n),m({event:`Search Placeholder updated: ${t.lbl||x||s}`,type:"change_placeholder",state:{fields:n,fldKey:s}})}const z=()=>{C(!0)},R=()=>{C(!1)},J=({target:{value:a}})=>{if(!S)return;a===""?delete t.defaultValue:t.defaultValue=a;const n=g(r,d=>{d[s]=t});h(n),m({event:`Default value updated: ${a||t.lbl||x||s}`,type:"change_defaultValue",state:{fields:n,fldKey:s}})},Q=a=>{if(!S)return;a.target.checked?t.defaultValueHide=!0:(t.defaultValueHide=!1,delete t.defaultValue);const n=a.target.checked?"on":"off",d=g(r,p=>{p[s]=t});h(d),m({event:`Default value ${n}: ${t.lbl||x||s}`,type:`${n.toLowerCase()}_defaultValue`,state:{fields:d,fldKey:s}})},W=a=>{const n=a.find(p=>p.check),d=g(r,p=>{p[s].options=a,p[s].config.defaultCountryKey=n?n.i:""});h(d),m({event:`Modify Options List: ${t.lbl||s}`,type:"options_modify",state:{fields:d,fldKey:s}})},u=(a,n,d)=>{t[d][n]=a;const p=g(r,X=>{X[s]=t});h(p),m({event:`${Ne[n]} '${String(a||"Off").replace("true","On")}': ${t.lbl||s}`,type:`${n}_changed`,state:{fields:p,fldKey:s}})};return window.selectedFieldData=t,e.jsxs(e.Fragment,{children:[e.jsx(ce,{title:"Field Settings",subtitle:t.typ,fieldKey:s}),e.jsx(pe,{}),e.jsx(o,{}),e.jsx(ue,{}),e.jsx(o,{}),e.jsx(he,{}),e.jsx(o,{}),e.jsx(ge,{}),e.jsx(o,{}),e.jsx(Fe,{}),e.jsx(o,{}),e.jsx(me,{}),e.jsx(o,{}),e.jsx(Ce,{}),e.jsx(o,{}),e.jsx(je,{}),e.jsx(o,{}),e.jsx(xe,{}),e.jsx(o,{}),e.jsx(y,O(I({id:"dflt-val-stng",title:c("Default Phone Number"),className:i(l.fieldSection,l.hover_tip),switching:!0,tip:k.defaultValue,tipProps:{width:250,icnSize:17},toggleAction:Q,toggleChecked:t==null?void 0:t.defaultValueHide,open:t==null?void 0:t.defaultValueHide},S&&{disable:!(t!=null&&t.defaultValueHide)}),{isPro:!0,proProperty:"defaultValue",children:e.jsx("div",{className:i(l.placeholder),children:e.jsx("input",{"data-testid":"dflt-val-stng-inp","aria-label":"Default value for this Field",placeholder:"Type a phone number.. (Ex: +01 555 1523)",className:i(l.input),type:t.typ==="textarea"?"text":t.typ,value:(t==null?void 0:t.defaultValue)||"",onChange:J})})})),e.jsx(o,{}),e.jsx(y,{id:"inp-frmt-opt-stng",title:c("Input Format Option"),className:i(l.fieldSection),isPro:!0,proProperty:"inputFormatOptions",children:e.jsx("div",{className:i(l.placeholder),children:e.jsx("input",{"data-testid":"inp-frmt-opt-inp","aria-label":"Input Format Option",placeholder:"Input Format(Ex: +c #### ### ###)",className:i(l.input),type:"text",value:A,onChange:a=>u(a.target.value,"inputFormat","config")})})}),e.jsx(o,{}),e.jsx(y,{id:"val-frmt-opt-stng",title:c("Value Format Option"),className:i(l.fieldSection),isPro:!0,proProperty:"valueFormatOptions",children:e.jsx("div",{className:i(l.placeholder),children:e.jsx("input",{"data-testid":"val-frmt-opt-inp","aria-label":"Value Format Option",placeholder:"Value Format(Ex: +c #### ### ###)",className:i(l.input),type:"text",value:D,onChange:a=>u(a.target.value,"valueFormat","config")})})}),e.jsx(o,{}),e.jsx(y,{id:"nmbr-stng",title:"Invalid Error Message:",className:i(l.fieldSection),children:e.jsx(ye,{id:"invalid-err-msg",type:"invalid",title:"Invalid Error Message",tipTitle:"By enabling this feature, user will see the error message when input value is Invalid"})}),e.jsx(o,{}),e.jsx(y,{id:"srch-plchldr-stng",title:c("Search Placeholder"),className:i(l.fieldSection,l.hover_tip),switching:!0,tip:"By disabling this option, the search placeholder text will be remove",tipProps:{width:250,icnSize:17},toggleAction:G,toggleChecked:j,open:j,disable:!j,isPro:!0,proProperty:"searchPlaceholder",children:e.jsx("div",{className:i(l.placeholder),children:e.jsx("input",{"data-testid":"srch-plchldr-stng-inp","aria-label":"Placeholer for Country Search",placeholder:"Type Placeholder here...",className:i(l.input),type:"text",value:L,onChange:K})})}),e.jsx(o,{}),e.jsx(y,{id:"cntry-nt-fund-stng",title:c("Country Not Found Text"),className:i(l.fieldSection),isPro:!0,proProperty:"countryNotFoundText",children:e.jsx("div",{className:i(l.placeholder),children:e.jsx("input",{"data-testid":"cntry-nt-fund-inp","aria-label":"Country Not Found Text",placeholder:"Type no country found text here...",className:i(l.input),type:"text",value:U,onChange:a=>u(a.target.value,"noCountryFoundText","config")})})}),e.jsx(o,{}),e.jsx(f,{id:"shw-slctd-img-stng",tip:"By disabling this option, the show selected flag image will be hidden",className:i(l.fieldSection,l.hover_tip,l.singleOption),title:c("Show Selected Flag Image"),action:a=>u(a.target.checked,"selectedFlagImage","config"),isChecked:_,isPro:!0,proProperty:"selectedOptImage"}),e.jsx(o,{}),e.jsx(f,{id:"slctd-clrbl-stng",tip:"By disabling this option, the selected country clearable button will be hidden",className:i(l.fieldSection,l.hover_tip,l.singleOption),title:c("Selected Country Clearable"),action:a=>u(a.target.checked,"selectedCountryClearable","config"),isChecked:H}),e.jsx(o,{}),e.jsx(f,{id:"srch-clrbl-stng",className:i(l.fieldSection,l.hover_tip,l.singleOption),tip:"By disabling this option, the selected country search clearable button will be hidden",title:c("Search Clearable"),action:a=>u(a.target.checked,"searchClearable","config"),isChecked:M}),e.jsx(o,{}),e.jsx(f,{id:"opt-icn-stng",className:i(l.fieldSection,l.hover_tip,l.singleOption),tip:"By disabling this option, the option flags image will be hidden",title:c("Option Flag Image"),action:a=>u(a.target.checked,"optionFlagImage","config"),isChecked:E,isPro:!0,proProperty:"optionFlagImage"}),e.jsx(o,{}),e.jsx(f,{id:"dtct-cntry-by-ip-stng",className:i(l.fieldSection,l.hover_tip,l.singleOption),tip:"By disabling this option, are not detect county by ip",title:c("Detect Country By IP"),action:a=>u(a.target.checked,"detectCountryByIp","config"),isChecked:$||!1,isPro:!0,proProperty:"detectCountryByIp"}),e.jsx(o,{}),e.jsx(f,{id:"dtct-cntry-by-geo-stng",className:i(l.fieldSection,l.hover_tip,l.singleOption),tip:"By disabling this option, are not detect county by Geo location",title:c("Detect Country By Geo"),action:a=>u(a.target.checked,"detectCountryByGeo","config"),isChecked:q||!1,isPro:!0,proProperty:"detectCountryByGeo"}),e.jsx(o,{}),e.jsx(fe,{}),e.jsx(o,{}),e.jsx(Se,{}),e.jsx(o,{}),e.jsx(ve,{type:"entryUnique",title:"Unique Entry",tipTitle:k.uniqueEntry,className:i(l.fieldSection,l.hover_tip),isUnique:"show"}),e.jsx(o,{}),e.jsx("div",{className:i(l.fieldSection),children:e.jsxs(re,{dataTestId:"edt-opt-stng",variant:"primary-outline",size:"sm",className:i({mt:10}),onClick:z,children:[c("Edit Options"),e.jsx("span",{className:i({ml:3,mt:3,tm:"rotate(45deg)"}),children:e.jsx(ne,{size:"13",stroke:"3"})})]})}),e.jsx(o,{}),e.jsx(w,{md:!0,autoHeight:!0,show:F,setModal:R,className:"o-v",title:c("Options 2"),width:"730px",children:e.jsx("div",{className:"pos-rel",children:e.jsx(Pe,{optionMdl:F,options:V,setOptions:a=>W(a),lblKey:"lbl",valKey:"val",type:"radio",onlyVisualOptionsTab:!0,hideNDisabledOptions:!0})})}),e.jsxs(w,{md:!0,autoHeight:!0,show:B,setModal:v,className:"o-v",title:"Image",children:[e.jsx("div",{className:"pos-rel"}),e.jsx(be,{iconType:T,selected:"Upload Image",uploadLbl:"Upload Image",setModal:v,addPaddingOnSelect:!1})]})]})},Ne={inputFormat:"Input Formate Changed to",valueFormat:"Value Formate Changed to",noCountryFoundText:"Country Not Found Text",selectedFlagImage:"Selected Flag Image",selectedCountryClearable:"Selected Country Clearable",searchClearable:"Search Clearable",optionFlagImage:"Option Flag Image",detectCountryByIp:"Detect Country By IP",detectCountryByGeo:"Detect Country By Geo"};export{gt as default};