var k=Object.defineProperty,T=Object.defineProperties;var $=Object.getOwnPropertyDescriptors;var w=Object.getOwnPropertySymbols;var q=Object.prototype.hasOwnProperty,O=Object.prototype.propertyIsEnumerable;var y=(t,i,e)=>i in t?k(t,i,{enumerable:!0,configurable:!0,writable:!0,value:e}):t[i]=e,h=(t,i)=>{for(var e in i||(i={}))q.call(i,e)&&y(t,e,i[e]);if(w)for(var e of w(i))O.call(i,e)&&y(t,e,i[e]);return t},N=(t,i)=>T(t,$(i));import{c as f,_ as c,j as s,T as R,u as I,z as V,$ as E,f as L}from"./main-471.js";import{S as A,M as D,u as H}from"./bf-685-72.js";import{d as S}from"./bf-458-77.js";const z=(t,i,e,a,n)=>{a(!0),f({},"bitforms_refresh_fluent_crm_lists").then(d=>{if(d&&d.success){const o=h({},i);o.default||(o.default={}),d.data.fluentCrmList&&(o.default.fluentCrmList=d.data.fluentCrmList),d.data.fluentCrmTags&&(o.default.fluentCrmTags=d.data.fluentCrmTags),n({show:!0,msg:c("FluentCRM list refreshed")}),P(o,e,a,n)}else d&&d.data&&d.data.data||!d.success&&typeof d.data=="string"?n({show:!0,msg:`${c("FluentCRM list refresh failed Cause:")}${d.data.data||d.data}. ${c("please try again")}`}):n({show:!0,msg:c("FluentCRM list refresh failed. please try again")});a(!1)}).catch(()=>a(!1))},P=(t,i,e,a)=>{f({},"bitforms_fluent_crm_headers").then(n=>{if(n&&n.success){const d=h({},t);n.data.fluentCrmFlelds?(d.default.fields=n.data.fluentCrmFlelds,d.field_map=B(t),a({show:!0,msg:c("Fluent CRM fields refreshed")})):a({show:!0,msg:c("No Fluent CRM fields found. Try changing the header row number or try again")}),i(h({},d))}else a({show:!0,msg:c("Fluent CRM fields refresh failed. please try again")});e(!1)}).catch(()=>e(!1))},B=t=>{const{field_map:i}=t,{fields:e}=t.default,n=Object.values(e).filter(p=>p.required).map(p=>({formField:"",fluentCRMField:p.key,required:!0})).filter(p=>!i.find(u=>u.fluentCRMField===p.fluentCRMField)),o=i.filter(p=>p.fluentCRMField||p.formField).map(p=>{const u=e[p.fluentCRMField];return u?N(h({},p),{formField:u.label}):p});return[...n,...o]},X=(t,i,e)=>{const a=h({},i);a.name=t.target.value,e(h({},a))},Y=t=>!((t!=null&&t.field_map?t.field_map.filter(e=>!e.formField&&e.fluentCRMField&&e.required):[]).length>0);function G({fluentCrmConf:t,setFluentCrmConf:i,formFields:e}){var n,d;const a=(o,p)=>{const u=h({},t);p==="exists"&&(o.target.checked?u.actions.skip_if_exists=!0:delete u.actions.skip_if_exists),p==="doubleOpIn"&&(o.target.checked?u.actions.double_opt_in=!0:delete u.actions.double_opt_in),i(h({},u))};return s.jsxs("div",{className:"pos-rel d-flx w-8",children:[s.jsx(R,{checked:((n=t.actions)==null?void 0:n.skip_if_exists)||!1,onChange:o=>a(o,"exists"),className:"wdt-200 mt-4 mr-2",value:"skip_if_exists",title:c("Skip exist Contact"),subTitle:c("Skip if contact already exist in FluentCRM")}),s.jsx(R,{checked:((d=t.actions)==null?void 0:d.double_opt_in)||!1,onChange:o=>a(o,"doubleOpIn"),className:"wdt-200 mt-4 mr-2",value:"double_opt_in",title:c("Double Opt-in"),subTitle:c("Enable Double Option for new contacts")})]})}function J({i:t,formFields:i,field:e,fluentCrmConf:a,setFluentCrmConf:n}){var g,_,v,M;const d=e.required,o=((g=a==null?void 0:a.default)==null?void 0:g.fields)&&Object.values((_=a==null?void 0:a.default)==null?void 0:_.fields).filter(l=>!l.required),p=I(E),{isPro:u}=p,j=l=>{const x=h({},a);x.field_map.splice(l,0,{}),n(x)},F=l=>{const x=h({},a);x.field_map.length>1&&x.field_map.splice(l,1),n(x)},r=(l,x)=>{const b=h({},a);b.field_map[x][l.target.name]=l.target.value,l.target.value==="custom"&&(b.field_map[x].customValue=""),n(b)},m=(l,x)=>{const b=h({},a);b.field_map[x].customValue=l.target.value,n(b)};return s.jsxs("div",{className:"flx mt-2 mr-1",children:[s.jsxs("div",{className:"flx integ-fld-wrp",children:[s.jsxs("select",{className:"btcd-paper-inp mr-2",name:"formField",value:e.formField||"",onChange:l=>r(l,t),children:[s.jsx("option",{value:"",children:c("Select Field")}),s.jsx("optgroup",{label:"Form Fields",children:i.map(l=>l.type!=="file-up"&&s.jsx("option",{value:l.key,children:l.name},`ff-zhcrm-${l.key}`))}),s.jsx("option",{value:"custom",children:c("Custom...")}),s.jsx("optgroup",{label:`General Smart Codes ${u?"":"(PRO)"}`,children:u&&((v=A)==null?void 0:v.map(l=>s.jsx("option",{value:l.name,children:l.label},`ff-rm-${l.name}`)))})]}),e.formField==="custom"&&s.jsx(D,{onChange:l=>m(l,t),label:c("Custom Value"),className:"mr-2",type:"text",value:e.customValue,placeholder:c("Custom Value")}),s.jsxs("select",{className:"btcd-paper-inp",name:"fluentCRMField",value:e.fluentCRMField,onChange:l=>r(l,t),disabled:d,children:[s.jsx("option",{value:"",children:c("Select Field")}),d?((M=a==null?void 0:a.default)==null?void 0:M.fields)&&Object.values(a.default.fields).map(l=>s.jsx("option",{value:l.key,children:l.label},`${l.key}-1`)):o&&o.map(l=>s.jsx("option",{value:l.key,children:l.label},`${l.key}-1`))]})]}),!d&&s.jsxs(s.Fragment,{children:[s.jsx("button",{onClick:()=>j(t),className:"icn-btn sh-sm ml-2 mr-1",type:"button",children:"+"}),s.jsx("button",{onClick:()=>F(t),className:"icn-btn sh-sm ml-2",type:"button","aria-label":"btn",children:s.jsx(V,{})})]})]})}function Z({formID:t,formFields:i,fluentCrmConf:e,setFluentCrmConf:a,isLoading:n,setisLoading:d,setSnackbar:o}){var j,F;const p=r=>{const m=h({},e);r?m.tags=r?r.split(","):[]:delete m.tags,a(h({},m))},u=r=>{const m=h({},e);m.list_id=r.target.value,a(h({},m))};return s.jsxs(s.Fragment,{children:[s.jsx("br",{}),s.jsxs("div",{className:"flx",children:[s.jsx("b",{className:"wdt-200 d-in-b",children:c("Fluent CRM List:")}),s.jsxs("select",{onChange:r=>u(r),name:"list_id",value:e.list_id,className:"btcd-paper-inp w-5",children:[s.jsx("option",{value:"",children:c("Select Fluent CRM list")}),((j=e==null?void 0:e.default)==null?void 0:j.fluentCrmList)&&Object.keys(e.default.fluentCrmList).map(r=>s.jsx("option",{value:e.default.fluentCrmList[r].id,children:e.default.fluentCrmList[r].title},r))]}),s.jsx("button",{onClick:()=>z(t,e,a,d,o),className:"icn-btn sh-sm ml-2 mr-2 tooltip",style:{"--tooltip-txt":`'${c("Refresh Fluent CRM List")}'`},type:"button",disabled:n,children:"↻"})]}),s.jsxs("div",{className:"flx mt-5",children:[s.jsx("b",{className:"wdt-200 d-in-b",children:c("Fluent CRM Tags: ")}),s.jsx(H,{defaultValue:e==null?void 0:e.tags,className:"btcd-paper-drpdwn w-5",options:((F=e==null?void 0:e.default)==null?void 0:F.fluentCrmTags)&&Object.keys(e.default.fluentCrmTags).map(r=>({label:e.default.fluentCrmTags[r].title,value:e.default.fluentCrmTags[r].id.toString()})),onChange:r=>p(r)})]}),n&&s.jsx(L,{style:{display:"flex",justifyContent:"center",alignItems:"center",height:100,transform:"scale(0.7)"}}),s.jsx("div",{className:"mt-4",children:s.jsx("b",{className:"wdt-100",children:c("Map Fields")})}),s.jsx("div",{className:"btcd-hr mt-1"}),s.jsxs("div",{className:"flx flx-around mt-2 mb-1",children:[s.jsx("div",{className:"txt-dp",children:s.jsx("b",{children:c("Form Fields")})}),s.jsx("div",{className:"txt-dp",children:s.jsx("b",{children:c("Fluent CRM Fields")})})]}),e.field_map.map((r,m)=>s.jsx(J,{i:m,field:r,fluentCrmConf:e,formFields:i,setFluentCrmConf:a},`fluentcrm-m-${m+9}`)),s.jsx("div",{className:"txt-center  mt-2",style:{marginRight:85},children:s.jsx("button",{onClick:()=>S(e.field_map.length,e,a),className:"icn-btn sh-sm",type:"button",children:"+"})}),s.jsx("br",{}),s.jsx("div",{className:"mt-4",children:s.jsx("b",{className:"wdt-100",children:c("Actions")})}),s.jsx("div",{className:"btcd-hr mt-1"}),s.jsx(G,{fluentCrmConf:e,setFluentCrmConf:a,setisLoading:d,setSnackbar:o})]})}export{Z as F,Y as c,X as h,z as r};