var o=Object.defineProperty;var m=Object.getOwnPropertySymbols;var F=Object.prototype.hasOwnProperty,k=Object.prototype.propertyIsEnumerable;var f=(e,t,a)=>t in e?o(e,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):e[t]=a,d=(e,t)=>{for(var a in t||(t={}))F.call(t,a)&&f(e,a,t[a]);if(m)for(var a of m(t))k.call(t,a)&&f(e,a,t[a]);return e};import{_ as c,c as _,d as n}from"./main-700.js";const y=(e,t,a)=>{const l=d({},t),{name:i}=e.target;e.target.value!==""?l[i]=e.target.value:delete l[i],a(d({},l))},M=e=>{const t=e==null?void 0:e.contactsFields.filter(a=>a.required===!0);return t.length>0?t.map(a=>({formField:"",GroundhoggMapField:a.key})):[{formField:"",GroundhoggMapField:""}]},N=e=>!((e.field_map?e.field_map.find(l=>!l.formField||!l.GroundhoggMapField):!1)||(e.field_map?e.field_map.filter(l=>!l.formField&&!l.GroundhoggMapField):[]).length>0),G=e=>!((e.field_map_meta?e.field_map_meta.find(l=>!l.formField||!l.GroundhoggMetaMapField):!1)||(e.field_map_meta?e.field_map_meta.filter(l=>!l.formField&&!l.GroundhoggMetaMapField):[]).length>0),S=(e,t,a,l,i,u)=>{if(!e.public_key){a({public_key:e.public_key?"":c("Public Key can't be empty")});return}if(!e.token){a({token:e.token?"":c("token can't be empty")});return}if(!e.domainName){a({domainName:e.domainName?"":c("Domain Name can't be empty")});return}a({}),i(!0);const r={public_key:e.public_key,token:e.token,domainName:e.domainName};_(r,"bitforms_groundhogg_authorization_and_fetch_contacts").then(s=>{if(s&&s.success){const p=d({},e);t(p),l(!0),i(!1),n.success(c("Authorization Successful"));return}i(!1),n.error(c("Authorization Failed"))})},v=(e,t,a,l,i)=>{l(!0);const u={public_key:t.public_key,token:t.token,domainName:t.domainName};_(u,"bitforms_groundhogg_fetch_all_tags").then(r=>{if(r&&r.success){const s=d({},t);s.default||(s.default={}),r.data.tags&&(s.default.tags=r.data.tags),a(d({},s)),l(!1),n.success(c("Groundhogg all tag fetched successfully"));return}l(!1),n.error(c("Failed to fetch groundhoggtag"))}).catch(()=>l(!1))};export{S as a,G as b,N as c,v as f,M as g,y as h};