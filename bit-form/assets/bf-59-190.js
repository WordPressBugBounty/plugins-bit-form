var et=Object.defineProperty,tt=Object.defineProperties;var st=Object.getOwnPropertyDescriptors;var je=Object.getOwnPropertySymbols;var at=Object.prototype.hasOwnProperty,ot=Object.prototype.propertyIsEnumerable;var $e=(u,n,p)=>n in u?et(u,n,{enumerable:!0,configurable:!0,writable:!0,value:p}):u[n]=p,M=(u,n)=>{for(var p in n||(n={}))at.call(n,p)&&$e(u,p,n[p]);if(je)for(var p of je(n))ot.call(n,p)&&$e(u,p,n[p]);return u},W=(u,n)=>tt(u,st(n));import{_ as c,w as ne,h as Se,q as nt,r as h,u as it,a as G,i as lt,c as ee,j as t,x as d,cF as rt,L as te,bg as se,c8 as ct,D as dt,cI as ht,aQ as Be,b as ut,e as pt,ag as mt,az as Ce,ay as ft,g as F,aH as ae,bf as _e,dn as R,A as q,aZ as Ne,dj as Ie,d as bt,v as Le,I as ke,E as gt,a1 as xt,dh as vt}from"./main-232.js";import{S as wt,G as V}from"./bf-131-111.js";import{T as oe}from"./bf-106-80.js";import{B as yt}from"./bf-309-84.js";import{P as jt}from"./bf-770-145.js";import{F as $t}from"./bf-561-157.js";const St={name:c("Name is the unique identifier for the field. It is used to reference the field in the form submission data."),lbl:c("Label is the title of the field that appears above or beside the field. You can show or hide the field label by toggling this option."),autoComplete:c("Autocomplete allows you to specify what type of automated assistance the browser should provide for filling out the field, <a target='_blank' href='https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete'>Learn more</a>"),adminLbl:c("Admin Label is the title of the field that will be used as an alternative reference throughout the dashboard. You can toggle this option to use or disable the admin label."),subtitle:c("Subtitle is an optional description that appears under the Field Label. You can show or hide the field subtitle by toggling this option."),helpText:c("Helper Text is an optional text that appears beneath the field to provide additional information to the user. You can show or hide the helper text by toggling this option."),defaultValue:c("Default Value is the initial value that will appear in the field. You can show or hide the default value by toggling this option."),suggestion:c("Suggestions allows you to add a custom suggestion list that will display suggestions as the user types in the input field."),placeholder:c("Placeholder is the text that appears inside the field before your user enters their own content. You can show or hide the field placeholder by toggling this option."),inputMode:c("This allows browser to display an appropriate virtual keyboard if needed. <a target='_blank' href='https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inputmode'>Learn more</a>"),pattern:c("Set a regular expression pattern that the input value should match for the field."),required:c("This allows to make the field mandatory for users to fill out before submitting the form. You can toggle this option to use or disable the required."),fieldHidden:c("The hide field feature allows you to hide the field from the user on the form. You can toggle this option to show or hide the field."),btnReverse:c("The reverse button feature allows to reverse the clear and undo button. You can toggle this option to reverse clear and undo button."),readonly:c("Readonly feature allows you to set a field as read-only, meaning that users will not be able to edit the content of that field. You can toggle this option to enable or disable the setting."),disabled:c("Disabling a field prevents users from interacting with it or entering data. You can toggle this option to enable or disable the field as needed."),uniqueEntry:c("Enabling this option will check from the submitted entries whether its value is duplicate."),userUnique:c("Enabling this option will check from your WordPress user database whether its value is duplicate."),stripeTheme:c('Stripe provide a variety of themes for the payment form. You can choose the theme that best suits theme your payment form. <a target="_blank" href="https://stripe.com/docs/elements/appearance-api">Learn more</a>'),amountType:c("Stripe provide minimum or maximum amount for different payment method type and currency. <a target='_blank' href='https://stripe.com/docs/currencies#minimum-and-maximum-charge-amounts'>learn more</a>"),mollieLocale:c("Allows you to preset the language to be used in the hosted payment pages shown to the consumer. This option is Optional. <a target='_blank' href='https://docs.mollie.com/reference/v2/payments-api/create-payment#:~:text=locale,OPTIONAL,-Allows%20you%20to'>learn more</a>"),mollieDescription:c("Mollie provide a description for the payment. This option is required. <a target='_blank' href='https://docs.mollie.com/reference/create-payment#:~:text=Body%20Params-,description,required,-The%20description%20of'>learn more</a>. and also you add field value in this description. e.g: This Payment from Name: ${field_key}"),undoBtn:c("You can add or remove Undo button form Signature Field. You can toggle this option to add or remove the Undo button."),clrBtn:c("You can add or remove Clear button form Signature Field. You can toggle this option to add or remove the Clear button."),ratingLbl:c("This allows to show the rating message on hover. You can toggle this option to show or hide the rating message on hover."),ratingSelectTip:c("This allows to show the rating message on rating selected. You can toggle this option to show or hide the rating message on rating selected."),imageMultipleImage:c("By enabling this feature, you will enable to select multiple image."),imageOptLbl:c("By enabling this feature, you will be hide image label."),showHeaderIcon:c("This allows to show the header icon. You can toggle this option to show or hide the header icon."),stemBtnSettings:c("This allows to show the stem button settings. You can toggle this option to show or hide the stem button settings."),stepLbl:c("This allows to show the step label. You can toggle this option to show or hide the step label."),stepSubtitle:c("This allows to show the step subtitle. You can toggle this option to show or hide the step subtitle.")};var Ht=St;function Dt({addPaddingOnSelect:u=!0,iconType:n,setModal:p,selected:I="",uploadLbl:w="",unsplash:j=!1,setIconAction:x,removeIconAction:P}){const{fieldKey:b}=ne(),[T,v]=Se(mt),m=nt(T[b]),[_,ie]=h.useState({parent:I||"Icons"}),[le,E]=h.useState([]),[H,k]=h.useState(!1),[re,ce]=h.useState(!1),[y,K]=h.useState({}),[D,Y]=h.useState([]),[B,Fe]=h.useState(""),[Pe,de]=h.useState(!1),[he,ue]=h.useState(!1),pe=w||"Upload Icon",A=it(Ce),[Te,C]=h.useState(10001),[Ee,Q]=h.useState(!1),[Ye,He]=h.useState(),{css:o}=G(),J="https://raw.githack.com",L=h.useRef(),[N,me]=Se(ft),O="n3pcVfA-CTg4OlOQsM3m6lEWLISyoSbtDqP2CfoukyU",[fe,It]=h.useState(1),[De,U]=h.useState([]),[kt,Ae]=h.useState(""),[Oe,Bt]=h.useState(1);h.useState("");const be=[{label:"Icons",show:["label"]},{label:pe},{label:"Downloaded Icons"}];j&&be.push({label:"Unsplash"});const Ue=[{label:"Font Awesome",value:"t=2_id_fontawesome",id:"font-awesome",status:!1},{label:"Bootstrap",value:"t=2_id_bootstrapicons",id:"bootstrap-icons",status:!1},{label:"Material Design",value:"t=2_id_materialdesign-icons",id:"material-design-icons",status:!1},{label:"Ion",value:"t=2_id_ionicons",id:"ionicons",status:!1},{label:"Octicons",value:"t=2_id_octicons",id:"octicons",status:!1},{label:"CSS.GG",value:"t=2_id_css.gg",id:"css.gg",status:!1},{label:"Feather",value:"t=2_id_feather",id:"feather",status:!1},{label:"Carbon",value:"t=2_id_carbonicons",id:"carbon-icons",status:!1},{label:"Typicons",value:"t=2_id_typicons",id:"typicons",status:!1},{label:"Vscode",value:"t=2_id_vscodecodicons",id:"vscode-codicons",status:!1},{label:"Simple",value:"t=2_id_simpleicons",id:"simple-icons",status:!1}],[$,ze]=h.useState(Ue||[]),[Z,ge]=h.useState([]),X=()=>{if(B)return"nofilter=true";const e=$.find(l=>l.status===!0);let s="";return e&&(s=$.map(l=>l.value).join("&")),s},Me=e=>{de(!0);const s=B!==""?`&t=1_tag_${e}`:"";fetch(`https://icons.bitapps.pro/search?c=0&${X()}${s}`).then(l=>l.json()).then(l=>{var a;if(l){let i=l.results;$.find(f=>f.status)&&(i=i==null?void 0:i.filter(f=>{var g;return(g=$.find(S=>S.id===f.id))==null?void 0:g.status})),Y(i),C(l.total)}(a=L==null?void 0:L.current)==null||a.scrollToTop(0),de(!1)})},We=lt.useAsyncDebounce(Me,500),Re=({target:{value:e}})=>{Fe(e),We(e)},qe=(e,s)=>{s==="parent"?ie({parent:e}):s==="child"&&ie(l=>W(M({},l),{child:e}))},Ve=()=>{if(typeof wp!="undefined"&&wp.media){const e=wp.media({title:"Media",button:{text:"Select picture"},library:{type:"image"},multiple:!1});e.on("select",()=>{const s=e.state().get("selection").first().toJSON();if(x){x(s.url);return}if(n==="opt"){const l=m[n];for(let a=0;a<l.length;a+=1)l[a].img=s.url;m[n]=l}else m[n]=s.url;v(l=>F(l,a=>{a[b]=m})),ae(b),p(!1)}),e.open()}};h.useEffect(()=>{K({}),E([]),Y([]),_.parent==="Icons"&&(k(!0),fetch("https://icons.bitapps.pro/search?c=0&").then(e=>e.json()).then(e=>{e&&(C(e.total),Y(e.results)),k(!1)})),_.parent==="Downloaded Icons"&&(k(!0),ee({},"bitforms_get_download_icn").then(e=>{e!==void 0&&e.success&&E(e==null?void 0:e.data),k(!1)}))},[_]);const Ge=()=>{ce(!0),ee({id:y.id,src:y.url},"bitforms_icn_save_setting").then(e=>{if(e!==void 0&&e.success){if(x){x(e.data);return}if(n==="opt"){const a=m[n];for(let i=0;i<a.length;i+=1)a[i].img=e.data;m[n]=a}else m[n]=e.data;let s=T,l=N;v(a=>(s=F(a,i=>{i[b]=m}),s)),u&&(l=F(N,a=>{Object.keys(N).forEach(i=>{const f=`${i}->fields->${A}->classes->.${A}-fld->padding`,g=_e(N,f)||"",S=R(g,"left",!0),z=R(g,"",!0);n==="prefixIcn"&&q(a,f,S),n==="suffixIcn"&&q(a,f,z)})}),me(l)),ae(b),Ne({event:`${Ie[n]} Icon Added`,type:`add_${n}`,state:{fldKey:b,fields:s,styles:l}})}ce(!1),p(!1)})},Ke=e=>{var l;E(a=>a.filter(i=>i!==e));const s=new RegExp(e,"gi");(l=m[n])!=null&&l.match(s)&&(delete m[n],v(a=>F(a,i=>{i[b]=m}))),ee({file:e},"bitforms_icon_remove").then(a=>{a!==void 0&&a.success&&E(a.data)}),bt.success("Icon Removed Successfully"),Q(!1),P&&P(e)},xe=e=>{e.target.parentNode.style.display="none"},ve=e=>{const s=e.target.scrollHeight-e.target.scrollTop-e.target.clientHeight-100,l=B!==""?`&t=1_tag_${B}`:"";s<=0&&D.length<Te&&(ue(!0),fetch(`https://icons.bitapps.pro/search?c=${D.length}&${X()}${l}`).then(a=>a.json()).then(a=>{a&&Y(D.concat(a.results)),ue(!1)}))},Qe=(e,s,l)=>{const a=[...$];l===!1?(a[e].value=`t=1_id_${s.replace("t=2_id_","")}`,a[e].status=!0):(a[e].value=`t=2_id_${s.replace("t=1_id_","")}`,a[e].status=!1),ze(a);const i=B!==""?`&t=1_tag_${B}`:"";$.length&&fetch(`https://icons.bitapps.pro/search?c=0&${X()}${i}`).then(f=>f.json()).then(f=>{if(f){let g=f.results;$.find(S=>S.status)&&(g=g==null?void 0:g.filter(S=>{var z;return(z=$.find(Xe=>Xe.id===S.id))==null?void 0:z.status})),Y(g),C(f.total)}})},we=()=>{if(x){x(y.url);return}m[n]=y.url;const e=F(T,l=>{l[b]=m});v(e);let s=N;u&&(s=F(N,l=>{Object.keys(N).forEach(a=>{const i=`${a}->fields->${A}->classes->.${A}-fld->padding`,f=_e(N,i)||"",g=R(f,"left",!0),S=R(f,"",!0);n==="prefixIcn"&&q(l,i,g),n==="suffixIcn"&&q(l,i,S)})}),me(s)),p(!1),Ne({event:`${Ie[n]} Icon Added`,type:`add_${n}`,state:{fldKey:b,fields:e,styles:s}}),ae(b)},ye=(e,s)=>{K({id:e,url:s})};h.useEffect(()=>{Ae(""),E([]),U([]),k(!0),fetch(`https://api.unsplash.com/photos/?client_id=${O}&per_page=30&page=${fe}`).then(e=>e.json()).then(e=>{e&&(C(e.length),U(e)),k(!1)}),fetch(`https://api.unsplash.com/collections/?client_id=${O}&page=${Oe}`).then(e=>e.json()).then(e=>{e&&ge(e),k(!1)})},[]);const Je=(e,s,l)=>{const a=[...Z];a.map(i=>{i.status=!1}),l?a[e].status=!1:a[e].status=!0,ge(a),Z.length&&!l?fetch(`https://api.unsplash.com/collections/${s}/photos?client_id=${O}&per_page=30`).then(i=>i.json()).then(i=>{i&&(U(i),C(i.length))}):fetch(`https://api.unsplash.com/photos/?client_id=${O}&per_page=30&page=${fe}`).then(i=>i.json()).then(i=>{i&&(U(i),C(i.length))})},Ze=e=>{K({id:e.id,url:e.urls.regular})};return t.jsxs("div",{children:[t.jsx(wt,{options:be,onChange:e=>qe(e,"parent"),defaultActive:_.parent,defaultItmWidth:220,wideTab:!0,className:o(d.mt1)}),t.jsxs(V,{open:_.parent==="Icons",children:[t.jsx("div",{className:o(d.mt2,d.flxc,{flxp:1,jc:"center"}),children:$.map((e,s)=>t.jsx("button",{"data-testid":"icn-pck-btn",title:e.label,onClick:()=>Qe(s,e.value,e.status),type:"button",className:`${o(r.chip,d.mr2)} ${e.status&&o(r.active)}`,children:e.label},e.label))}),t.jsxs("div",{className:o(d.flxc,r.searchBar,d.mt2,d.mb2),children:[t.jsxs("div",{className:o(r.fields_search),children:[t.jsx("input",{"data-testid":"icns-mdl-srch-inp",title:"Search Icons","aria-label":"Search Icons",placeholder:"Search in 10,000+ icons by keywords one at a time. e.g., user or login or etc...",id:"search-icon",type:"search",name:"searchIcn",value:B,onChange:Re,className:o(r.search_field)}),t.jsx("span",{title:"search",className:o(r.search_icn),children:t.jsx(rt,{size:"20"})})]}),t.jsx("div",{children:Pe&&t.jsx(te,{size:20,clr:"#13132b"})})]}),t.jsxs(se,{ref:L,style:{minHeight:350},onScroll:ve,children:[H&&t.jsxs("div",{title:"Loading...",children:[t.jsx("div",{className:o(d.mt2)}),Array(26).fill(1).map((e,s)=>t.jsx("div",{title:"Loading...",className:`${o(r.loadingPlaceholder)} loader`},`loading-${s*2}`))]}),t.jsx("div",{className:o(d.flxc,d.mt2,r.icon),children:D.map(e=>t.jsx("button",{"data-testid":`inc-prv-btn-${e.name}`,type:"button",title:`${e.name} (${e.id})`,className:`${o(r.icnBtn)} ${J+e.url===y.url&&o(r.active,r.activeIcn)}`,onClick:()=>ye(e.id,J+e.url),children:t.jsx("img",{src:`${J}${e.url}`,onError:xe,alt:e.name,className:o(r.img)})},`${e.name} (${e.id})`))}),he&&t.jsxs("div",{title:"Loading...",children:[t.jsx("div",{className:o(d.mt2)}),Array(26).fill(1).map((e,s)=>t.jsx("div",{title:"Loading...",className:`${o(r.loadingPlaceholder)} loader`},`loading-2--${s*2}`))]})]}),t.jsxs("button",{"data-testid":"icn-dwnld-n-sav",type:"button",disabled:!y.url,className:o(r.saveBtn,r.btnPosition),onClick:Ge,children:[t.jsx("span",{className:o(d.mr1),children:t.jsx(ct,{size:"19"})}),"Download & save",re&&t.jsx(te,{size:20,clr:"#fff",className:d.ml2})]})]}),t.jsx(V,{open:_.parent==="Unsplash",children:t.jsxs("div",{children:[t.jsx("div",{className:o(d.mt2,d.flxc,{flxp:1,jc:"center"}),children:Z.map((e,s)=>t.jsx("button",{"data-testid":"icn-pck-btn",title:e.title,onClick:()=>Je(s,e.id,e.status),type:"button",className:`${o(r.chip,d.mr2)} ${e.status&&o(r.active)}`,children:e.title},e.title))}),t.jsxs(se,{ref:L,style:{minHeight:350},onScroll:ve,children:[H&&t.jsxs("div",{title:"Loading...",children:[t.jsx("div",{className:o(d.mt2)}),Array(26).fill(1).map((e,s)=>t.jsx("div",{title:"Loading...",className:`${o(r.loadingPlaceholder)} loader`},`loderfnt-${s*2}`))]}),t.jsx("div",{className:o(d.mt2,r.imgWrp),children:De.map(e=>t.jsx("button",{type:"button",title:`(${e.description})`,className:`${o(r.imageBtn)} ${e.urls.regular===y.url&&o(r.activeImg)}`,onClick:()=>Ze(e),children:t.jsx("img",{src:e.urls.thumb,onError:xe,alt:e.id,className:o(r.imgH)})},`(${e.id})`))}),he&&t.jsxs("div",{title:"Loading...",children:[t.jsx("div",{className:o(d.mt2)}),Array(26).fill(1).map((e,s)=>t.jsx("div",{title:"Loading...",className:`${o(r.loadingPlaceholder)} loader`},`loderfnt--${s*2}`))]})]}),t.jsxs("button",{"data-testid":"icn-dwnld-n-sav",type:"button",disabled:!y.url,className:o(r.saveBtn,r.btnPosition),onClick:we,children:[t.jsx("span",{className:o(d.mr1,{dy:"flex"}),children:t.jsx(dt,{size:"20"})}),"Save",re&&t.jsx(te,{size:20,clr:"#fff",className:d.ml2})]})]})}),t.jsx(V,{open:_.parent===pe,children:t.jsxs("button",{type:"button",className:o(r.upBtn),onClick:Ve,children:[t.jsx(ht,{w:"35"})," ","Browse"]})}),t.jsxs(V,{open:_.parent==="Downloaded Icons",children:[H&&t.jsx("div",{className:o({h:300}),children:t.jsx("div",{title:"Loading...",className:o({flxp:"wrap",jc:"center",flx:1}),children:Array(22).fill(1).map((e,s)=>t.jsx("div",{title:"Loading...",className:`${o(r.loadingPlaceholder)} loader`},`loading-3-${s*2}`))})}),!H&&t.jsx(se,{ref:L,style:{minHeight:"300px"},children:t.jsx("div",{className:o(d.flxc,d.mt4,r.icon),children:!!le.length&&le.map((e,s)=>t.jsxs("div",{className:o(d.flxc,d.mt2,r.downloadedBtnWrapper),"data-file":e,style:{display:"inline-block"},children:[t.jsx("button",{"data-testid":`dwnlodd-inc-del-btn-${s}`,type:"button",className:`${o(r.delBtn)} trash`,title:"Delete",onClick:()=>{Q(!0),He(e)},children:t.jsx(Be,{size:10})}),t.jsx("button",{"data-testid":`dwnlodd-inc-prv-btn-${s}`,onClick:()=>ye(e.id,`${bits.iconURL}/${e}`),type:"button",title:e.name,className:`${o(r.icnBtn)} ${`${bits.iconURL}/${e}`===y.url&&o(r.active)}`,children:t.jsx("img",{src:`${bits.iconURL}/${e}`,alt:`icon-${e}`,width:"40",height:"30"})},`download-icn-${s+Math.random()*5}`)]},`download-icn-${s*2}`))})}),t.jsx("button",{"data-testid":"icn-sav-btn",type:"button",disabled:!y.url,className:o(ut.btn,r.saveBtn),onClick:we,children:"Save"})]}),t.jsx(pt,{title:"Warning",action:()=>Ke(Ye),show:Ee,body:"Are you sure you want to delete this icon? This icon will not be available in the forms where it has been used.",btnTxt:"Okay",close:()=>Q(!1)})]})}const r={scrollBar:{scrollBehavior:"auto !important","& *":{scrollBehavior:"auto !important"}},loadingPlaceholder:{w:40,h:40,brs:8,lh:2,my:3,mx:5,dy:"inline-block"},downloadedBtnWrapper:{pn:"relative",dy:"inline-block","&:hover > .trash":{flx:"align-center"}},delBtn:{pn:"absolute",bd:"#ffa1a1",b:"none",brs:20,h:20,dy:"none",w:20,curp:1,rt:-3,tp:-3,":hover":{bd:"#ff7d7d"}},icon:{dy:"inline-block"},chip:{bd:"var(--b-100-48-1)",b:"none",brs:50,p:"6px 16px",cr:"var(--b-37-18)",m:"0px 7px 6px 0px",curp:1,tn:"background .3s",":hover":{bd:"var(--b-90)"}},active:{bd:"var(--b-50) !important",cr:"var(--white-100) !important"},activeIcn:{fr:"invert(100%) sepia(0%) saturate(6403%) hue-rotate(223deg) brightness(126%) contrast(109%)"},icnBtn:{p:"4px",mnw:45,h:45,dy:"inline-grid",placeContent:"center",bd:"transparent",b:"none",brs:8,curp:1,":hover":{bd:"var(--white-0-95)"}},img:{h:25},imgH:{brs:8,h:200},searchBar:{pn:"relative",zx:99},btnColor:{cr:"var(--b-50)"},fields_search:{pn:"relative",ml:7,mr:5,tn:"width .2s",w:"100%"},upBtn:{b:"1px solid var(--b-38-89)",w:"80%",bd:"var(--b-36-96)",fs:20,mx:"auto",h:100,flx:"center",fd:"column",brs:20,mt:10,cr:"var(--b-54-31)",curp:1,":hover":{bd:"var(--b-50-95)"},":focus-visible":{focusShadow:1}},search_icn:{pn:"absolute",tp:"50%",mx:9,lt:0,tm:"translateY(-50%)",cr:"var(--white-0-75)",curp:1,"& svg":{dy:"block"}},search_field:{w:"100%",fw:500,fs:"14px !important",oe:"none",b:"1px solid var(--white-0-75) !important",brs:"20px !important",pl:"35px !important",pr:"5px !important",pb:"5px !important",pt:"5px !important",":focus":{bs:"0px 0px 0px 1.5px var(--b-50) !important",bcr:"var(--b-92-62) !important",pr:"0px !important","& ~ .shortcut":{dy:"none"},"& ~ span svg":{cr:"var(--b-50)"}},"::placeholder":{fs:12},"::-webkit-search-cancel-button":{appearance:"none",w:14,h:14,mr:10,bd:"var(--white-0-83)",curp:1,backgroundPosition:"54% 50% !important",bi:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 24 24' fill='none' stroke='Black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cline x1='18' y1='6' x2='6' y2='18'%3E%3C/line%3E%3Cline x1='6' y1='6' x2='18' y2='18'%3E%3C/line%3E%3C/svg%3E")`,brs:20}},saveBtn:{b:"none",bd:"var(--b-50)",brs:8,fw:500,p:"5px 10px",cr:"var(--white-100)",flxc:1,flx:"center",mt:5,ml:"auto",mr:5,curp:1,tn:"background .3s",":hover:not(:disabled)":{bd:"var(--b-36)"},":disabled":{bd:"var(--b-13-88)",cr:"var(--b-16-35)",cur:"not-allowed"}},imageBtn:{p:0,mxh:200,dy:"block",bd:"none",b:"none",m:5,brs:8,curp:1,":hover":{oe:"4px solid var(--blue)"}},imgWrp:{dy:"flex",flxp:"wrap",jc:"center",w:"100%"},activeImg:{oe:"4px solid var(--blue)"}};function _t({route:u}){const{fieldKey:n,formID:p,formType:I}=ne(),w=Le(),{css:j}=G(),x=()=>{w(`/form/builder/${I}/${p}/field-theme-customize/${u}/${n}`)};return t.jsx("button",{"data-testid":`${u}-styl-btn`,type:"button",onClick:x,className:j(d.icnBtn),children:t.jsx(yt,{height:"18",width:"12"})})}function At({classNames:u,labelClass:n,label:p,alt:I,iconSrc:w,styleRoute:j,setIcon:x,removeIcon:P,isPro:b,proProperty:T}){const{css:v}=G(),m=!b||b&&ke;return t.jsxs("div",{className:`${v(d.flxcb)} ${u} pos-rel`,children:[t.jsxs("div",{className:v({flx:"align-center"}),children:[t.jsx("span",{className:`${v(d.fw500,d.ml2)} ${n}`,children:p}),b&&!ke&&t.jsx(jt,{proProperty:T})]}),t.jsxs("div",{className:v(d.flxcb),children:[w&&t.jsx("img",{src:w,title:"Icon",alt:I||p,width:"22",height:"22"}),t.jsxs("div",{className:v(Nt.flx),children:[t.jsx(oe,{msg:"Change",children:t.jsx("button",W(M({"data-testid":`${j}-edt-btn`,type:"button"},m&&{onClick:x}),{className:v(d.icnBtn),children:t.jsx(gt,{size:18})}))}),w&&t.jsx(oe,{msg:"Style",children:t.jsx(_t,{route:j})}),w&&P&&t.jsx(oe,{msg:"Remove",children:t.jsx("button",W(M({"data-testid":`${j}-rmv-btn`},m&&{onClick:P}),{className:v(d.icnBtn),type:"button",children:t.jsx(Be,{size:"13"})}))})]})]})]})}const Nt={flx:{dy:"flex",bc:"#f7f7f7",brs:"5px"}};function Ot(){const{css:u}=G();return t.jsx("hr",{className:u($t.divider)})}function Ut({className:u,size:n}){const p=xt(Ce),{formType:I,formID:w}=ne(),j=Le(),x=()=>{j(`/form/builder/${I}/${w}/fields-list`),p(null)};return t.jsxs("button",{type:"button",role:"button",tabIndex:"0","data-testid":"back2-fld-lst-btn",className:u,onClick:x,children:[t.jsx(vt,{size:n}),t.jsx("span",{children:c("Back to fields list")})]})}export{Ut as B,At as F,Dt as I,Ot as a,Ht as t};