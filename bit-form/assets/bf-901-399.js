var M=Object.defineProperty;var w=Object.getOwnPropertySymbols;var f=Object.prototype.hasOwnProperty,I=Object.prototype.propertyIsEnumerable;var y=(e,t,a)=>t in e?M(e,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):e[t]=a,p=(e,t)=>{for(var a in t||(t={}))f.call(t,a)&&y(e,a,t[a]);if(w)for(var a of w(t))I.call(t,a)&&y(e,a,t[a]);return e};import{r as v,j as s,T as _,_ as n,e as k,f as N,u as R,z as $,$ as G}from"./main-232.js";import{u as T}from"./bf-646-127.js";/* empty css          */import{g as S,a as O,m as q}from"./bf-408-398.js";import{M as z}from"./bf-156-130.js";import{S as U}from"./bf-80-121.js";const V=(e,t,a)=>{const l=p({},t);l.field_map.splice(e,0,{}),a(p({},l))},E=(e,t,a)=>{const l=p({},t);l.field_map.length>1&&l.field_map.splice(e,1),a(p({},l))},A=(e,t,a,l)=>{const o=p({},a);o.field_map[t][e.target.name]=e.target.value,e.target.value==="custom"&&(o.field_map[t].customValue=""),l(p({},o))},B=(e,t,a,l)=>{const o=p({},a);o.field_map[t].customValue=e.target.value,l(p({},o))};function D({mailerLiteConf:e,setMailerLiteConf:t,formFields:a}){var c,g,F;const[l,o]=v.useState({show:!1,action:()=>{}}),[r,j]=v.useState(!1),m=(d,i)=>{const u=p({},e);i==="group"&&(S(e,t,j),d.target.checked?u.actions.group=!0:delete u.actions.group,o({show:i})),i==="mailer_lite_type"&&(d.target.checked?u.actions.mailer_lite_type=!0:delete u.actions.mailer_lite_type,o({show:i})),i==="update"&&(d.target.checked?u.actions.update=!0:delete u.actions.update),i==="double_opt_in"&&(d.target.checked?u.actions.double_opt_in=!0:delete u.actions.double_opt_in),t(p({},u))},h=()=>{o({show:!1})},b=(d,i)=>{const u=p({},e);i==="group_ids"&&d.length?(u.actions.group=!0,u.actions.update=!0):i==="group_ids"&&d.length<1&&delete u.actions.group,i==="mailer_lite_type"&&d.length?u.actions.mailer_lite_type=!0:i==="mailer_lite_type"&&d.length<1&&delete u.actions.mailer_lite_type,u[i]=d,t(p({},u))},x=[{label:"Active",value:"active"},{label:"Unsubscribed",value:"unsubscribed"},{label:"Bounced",value:"bounced"},{label:"Spam Complaints",value:"junk"},{label:"Unconfirmed",value:"unconfirmed"}];return s.jsxs(s.Fragment,{children:[s.jsxs("div",{className:"pos-rel d-flx w-8",children:[s.jsx(_,{checked:(e==null?void 0:e.group_ids.length)||!1,onChange:d=>m(d,"group"),className:"wdt-200 mt-4 mr-2",value:"group",title:n("Groups"),subTitle:n("Add Groups")}),s.jsx(_,{checked:(e==null?void 0:e.mailer_lite_type)||!1,onChange:d=>m(d,"mailer_lite_type"),className:"wdt-200 mt-4 mr-2",value:"type",title:n("Type"),subTitle:n("Add Type")}),s.jsx(_,{checked:((c=e.actions)==null?void 0:c.double_opt_in)||!1,onChange:d=>m(d,"double_opt_in"),className:"wdt-200 mt-4 mr-2",value:"double_opt_in",title:n("Double Opt-in"),subTitle:n("Add Double Opt-in")}),s.jsx(_,{checked:((g=e.actions)==null?void 0:g.update)||!1,isInfo:e==null?void 0:e.group_ids.length,onChange:d=>m(d,"update"),className:"wdt-200 mt-4 mr-2",value:"user_share",title:n("Update Subscriber"),subTitle:n("Update Responses with MailerLite exist Subscriber?")})]}),s.jsxs(k,{className:"custom-conf-mdl",mainMdlCls:"o-v",btnClass:"blue",btnTxt:n("Ok"),show:l.show==="group",close:h,action:h,title:n("Groups"),children:[s.jsx("div",{className:"btcd-hr mt-2 mb-2"}),r?s.jsx(N,{style:{display:"flex",justifyContent:"center",alignItems:"center",height:45,transform:"scale(0.5)"}}):s.jsxs("div",{className:"flx flx-between mt-2",children:[s.jsx(T,{className:"msl-wrp-options",defaultValue:e==null?void 0:e.group_ids,options:(F=e==null?void 0:e.groups)==null?void 0:F.map(d=>({label:d.name,value:d.group_id})),onChange:d=>b(d,"group_ids"),customValue:!0}),s.jsx("button",{onClick:()=>S(e,t,j),className:"icn-btn sh-sm ml-2 mr-2 tooltip",style:{"--tooltip-txt":`${n("Refresh Groups")}'`},type:"button",disabled:r,children:"↻"})]})]}),s.jsxs(k,{className:"custom-conf-mdl",mainMdlCls:"o-v",btnClass:"blue",btnTxt:n("Ok"),show:l.show==="mailer_lite_type",close:h,action:h,title:n("Type"),children:[s.jsx("div",{className:"btcd-hr mt-2 mb-2"}),r?s.jsx(N,{style:{display:"flex",justifyContent:"center",alignItems:"center",height:45,transform:"scale(0.5)"}}):s.jsx("div",{className:"flx flx-between mt-2",children:s.jsx(T,{className:"msl-wrp-options",defaultValue:e==null?void 0:e.mailer_lite_type,options:x.map(d=>({label:d.label,value:d.value})),onChange:d=>b(d,"mailer_lite_type"),customValue:!0,singleSelect:!0})})]})]})}function P({i:e,formFields:t,field:a,mailerLiteConf:l,setMailerLiteConf:o}){var b,x;if(((b=l==null?void 0:l.field_map)==null?void 0:b.length)===1&&a.mailerLiteFormField===""){const c=p({},l),g=O(c);c.field_map=g,o(c)}const r=(l==null?void 0:l.mailerLiteFields.filter(c=>c.required===!0))||[],j=(l==null?void 0:l.mailerLiteFields.filter(c=>c.required===!1))||[],m=R(G),{isPro:h}=m;return s.jsx("div",{className:"flx mt-2 mb-2 btcbi-field-map",children:s.jsxs("div",{className:"pos-rel flx",children:[s.jsxs("div",{className:"flx integ-fld-wrp",children:[s.jsxs("select",{className:"btcd-paper-inp mr-2",name:"formField",value:a.formField||"",onChange:c=>A(c,e,l,o),children:[s.jsx("option",{value:"",children:n("Select Field")}),s.jsx("optgroup",{label:"Form Fields",children:t==null?void 0:t.map(c=>s.jsx("option",{value:c.key,children:c.name},`ff-rm-${c.key}`))}),s.jsx("option",{value:"custom",children:n("Custom...")}),s.jsx("optgroup",{label:`General Smart Codes ${h?"":"(PRO)"}`,children:h&&((x=U)==null?void 0:x.map(c=>s.jsx("option",{value:c.name,children:c.label},`ff-rm-${c.name}`)))})]}),a.formField==="custom"&&s.jsx(z,{onChange:c=>B(c,e,l,o),label:n("Custom Value"),className:"mr-2",type:"text",value:a.customValue,placeholder:n("Custom Value")}),s.jsxs("select",{className:"btcd-paper-inp",disabled:e<r.length,name:"mailerLiteFormField",value:e<r?r[e].label||"":a.mailerLiteFormField||"",onChange:c=>A(c,e,l,o),children:[s.jsx("option",{value:"",children:n("Select Field")}),e<r.length?s.jsx("option",{value:r[e].key,children:r[e].label},r[e].key):j.map(({key:c,label:g})=>s.jsx("option",{value:c,children:g},c))]})]}),e>=r.length&&s.jsxs(s.Fragment,{children:[s.jsx("button",{onClick:()=>V(e,l,o),className:"icn-btn sh-sm ml-2 mr-1",type:"button",children:"+"}),s.jsx("button",{onClick:()=>E(e,l,o),className:"icn-btn sh-sm ml-1",type:"button","aria-label":"btn",children:s.jsx($,{size:"15"})})]})]})})}function Z({formFields:e,mailerLiteConf:t,setMailerLiteConf:a,isLoading:l,setIsLoading:o,setSnackbar:r}){const[j,m]=v.useState(!1),[h,b]=v.useState({name:"",auth_token:""});return s.jsxs(s.Fragment,{children:[s.jsx("br",{}),s.jsx("div",{className:"mt-5",children:s.jsxs("b",{className:"wdt-100",children:[n("Field Map"),s.jsx("button",{onClick:()=>q(t,a,b,m,o,"refreshFields"),className:"icn-btn sh-sm ml-2 mr-2 tooltip",style:{"--tooltip-txt":'"Refresh Fields"'},type:"button",disabled:l,children:"↻"})]})}),s.jsx("br",{}),l&&s.jsx(N,{style:{display:"flex",justifyContent:"center",alignItems:"center",height:100,transform:"scale(0.7)"}}),s.jsx("div",{className:"btcd-hr mt-1"}),s.jsxs("div",{className:"flx flx-around mt-2 mb-2 btcbi-field-map-label",children:[s.jsx("div",{className:"txt-dp",children:s.jsx("b",{children:n("Form Fields")})}),s.jsx("div",{className:"txt-dp",children:s.jsx("b",{children:n("MailerLite Fields")})})]}),t==null?void 0:t.field_map.map((x,c)=>s.jsx(P,{i:c,field:x,mailerLiteConf:t,formFields:e,setMailerLiteConf:a,setSnackbar:r},`rp-m-${c+9}`)),s.jsx("div",{className:"txt-center btcbi-field-map-button mt-2",children:s.jsx("button",{onClick:()=>V(t.field_map.length,t,a),className:"icn-btn sh-sm",type:"button",children:"+"})}),s.jsx("br",{}),s.jsx("br",{}),s.jsx("div",{className:"mt-4",children:s.jsx("b",{className:"wdt-100",children:n("Actions")})}),s.jsx("div",{className:"btcd-hr mt-1"}),s.jsx(D,{mailerLiteConf:t,setMailerLiteConf:a,formFields:e})]})}export{Z as M};