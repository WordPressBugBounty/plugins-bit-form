import{v as g,h as u,a as _,j as i,_ as v,I as F,g as R,bk as O,ag as h}from"./main-348.js";import{F as s}from"./bf-251-145.js";import{t as x}from"./bf-803-181.js";import{a as S}from"./bf-814-113.js";function H({cls:d}){const{fieldKey:e}=g(),[t,n]=u(h),r=t[e].valid.readonly||!1,{css:f}=_(),c=y=>{if(!F)return;const{checked:a}=y.target,l=R(t,m=>{const o=m[e];a?o.valid.readonly=!0:delete o.valid.readonly}),p=a?"on":"off";n(l),O({event:`Read only field ${p}`,type:"read_only_field_on_off",state:{fields:l,fldKey:e}})};return i.jsx("div",{className:`${f(s.fieldSection,s.singleOption,s.hover_tip)} ${d}`,children:i.jsx(S,{id:"rdonly-stng",tip:x.readonly,title:v("Read-only"),action:c,isChecked:r,isPro:!0,proProperty:"readOnly"})})}export{H as F};