import{v as ie,h as le,a9 as ne,q as ae,u as K,a as se,r as re,_ as a,j as e,a6 as s,R as L,G as M,dq as oe,c4 as F,ca as f,g,bt as _,d as I,ao as ce,aE as de,x as me,$ as ue}from"./main-365.js";import{u as pe}from"./bf-239-69.js";import{t as $}from"./bf-102-178.js";import{F as d}from"./bf-159-142.js";import{C as U}from"./bf-206-83.js";import{C as E}from"./bf-489-81.js";import{S as he}from"./bf-152-327.js";import{a as ge}from"./bf-258-110.js";import{A as k}from"./bf-862-143.js";import{F as xe,c as fe}from"./bf-752-93.js";import{F as m}from"./bf-637-179.js";import{S as y}from"./bf-22-111.js";import"./bf-621-72.js";import"./bf-337-84.js";import"./bf-604-107.js";import"./bf-97-108.js";import"./bf-539-109.js";import"./bf-736-112.js";import"./bf-213-113.js";import"./bf-987-114.js";import"./bf-531-80.js";import"./bf-900-82.js";import"./bf-549-115.js";import"./bf-562-71.js";import"./bf-769-130.js";import"./bf-127-79.js";import"./bf-797-141.js";const ye={AED:"United Arab Emirates Dirham",AUD:"Australian Dollar",BGN:"Bulgarian Lev",BRL:"Brazilian Real",CAD:"Canadian Dollar",CHF:"Swiss Franc",CZK:"Czech Koruna",DKK:"Danish Krone",EUR:"Euro",GBP:"British Pound Sterling",HKD:"Hong Kong Dollar",HRK:"Croatian Kuna",HUF:"Hungarian Forint",ILS:"Israeli New Sheqel",ISK:"Icelandic Króna",JPY:"Japanese Yen",MXN:"Mexican Peso",MYR:"Malaysian Ringgit",NOK:"Norwegian Krone",NZD:"New Zealand Dollar",PHP:"Philippine Peso",PLN:"Polish Zloty",RON:"Romanian Leu",RUB:"Russian Ruble",SEK:"Swedish Krona",SGD:"Singapore Dollar",THB:"Thai Baht",TWD:"New Taiwan Dollar",USD:"United States Dollar",ZAR:"South African Rand"},je={en_US:"English (United States)(en_US)",en_GB:"English (United Kingdom)(en_GB)",nl_NL:"Dutch (Netherlands)(nl_NL)",nl_BE:"Dutch (Belgium)(nl_BE)",fr_FR:"French (France)(fr_FR)",fr_BE:"French (Belgium)(fr_FR)",de_DE:"German (Germany)(fr_FR)",de_AT:"German (Austria)(fr_FR)",de_CH:"German (Switzerland)(fr_FR)",es_ES:"Spanish (Spain)(fr_FR)",ca_ES:"Catalan (Spain)(fr_FR)",pt_PT:"Portuguese (Portugal)(fr_FR)",it_IT:"Italian (Italy)(fr_FR)",nb_NO:"Norwegian (Bokmål)(fr_FR)",sv_SE:"Swedish (Sweden)(fr_FR)",fi_FI:"Finnish (Finland)(fr_FR)",da_DK:"Danish (Denmark)(fr_FR)",is_IS:"Icelandic (Iceland)(fr_FR)",hu_HU:"Hungarian (Hungary)(fr_FR)",pl_PL:"Polish (Poland)(fr_FR)",lv_LV:"Latvian (Latvia)(fr_FR)",lt_LT:"Lithuanian (Lithuania)(fr_FR)"},be=[{title:"Apple Pay",method:"applepay",min:.01,max:5e4},{title:"Bancontact",method:"bancontact",min:.01,max:5e4},{title:"Bank Transfer",method:"banktransfer",min:.01,max:1e6},{title:"Belfius",method:"belfius",min:.01,max:5e4},{title:"Credit Card",method:"creditcard",min:0,max:1e4},{title:"Direct Debit",method:"directdebit",min:.01,max:1e3},{title:"EPS",method:"eps",min:1,max:1e4},{title:"Gift Card",method:"giftcard",min:.01,max:5e4},{title:"Giropay",method:"giropay",min:1,max:1e4},{title:"iDEAL",method:"ideal",min:.01,max:5e4},{title:"KBC",method:"kbc",min:.01,max:5e4},{title:"MyBank",method:"mybank",min:.01,max:5e4},{title:"PayPal",method:"paypal",min:0,max:1e4},{title:"Paysafecard",method:"paysafecard",min:1,max:999},{title:"Przelewy24",method:"przelewy24",min:.01,max:55e3},{title:"Sofort",method:"sofort",min:.01,max:5e4},{title:"Twint",method:"twint",min:.01,max:5e4}];function Ve(){var w;const{fieldKey:n}=ie(),[p,x]=le(ce),H=ne(de),r=ae(p[n]),G=Object.entries(p),O=K(me),j=((w=r.config)==null?void 0:w.amountType)==="dynamic",{css:l}=se(),{payIntegID:D,config:o,txt:z,btnFulW:v,btnAlign:q,txtAlign:W}=r,{allPages:Z}=K(ue),S=re.useRef(null),T=[{name:a("Left"),value:"start"},{name:a("Center"),value:"center"},{name:a("Right"),value:"end"}],b=(t,i,c)=>{t?f(n,i):F({fieldKey:n,errorKey:i,errorMsg:a(c),errorUrl:`field-settings/${n}`})},u=(t,i)=>{switch(i?M(r,t,i):oe(r,t),t){case"config->amount":Number(i)<.01?F({fieldKey:n,errorKey:"mollieAmountMin",errorMsg:a(`Mollie Minimum Amount is ${.01}`),errorUrl:`field-settings/${n}`}):(f(n,"mollieAmountMin"),f(n,"mollieAmountMissing"));break;case"config->amountFld":b(i,"mollieAmountFldMissing","Mollie Dynamic Amount Field is not Selected");break;case"config->redirect_url":b(i,"mollieRedirectUrlMissing","Mollie Redirect Url is not Selected");break;case"config->currency":b(i,"mollieCurrencyMissing","Mollie Currency is not Selected");break;case"config->description":b(i,"mollieDescriptionMissing","Mollie Description is Required");break;default:console.log("Not matched",i,t)}const c=g(p,h=>{h[n]=r});x(c),_({event:`${Fe[t]} to ${i}: ${r.lbl||n}`,type:`${t}_changed`,state:{fields:c,fldKey:n}})},P=t=>{t.target.value?r.config.amountType=t.target.value:delete r.config.amountType,delete r.config.amount,delete r.config.amountFld,r.config.amountType==="dynamic"?(f(n,"mollieAmountMissing"),F({fieldKey:n,errorKey:"mollieAmountFldMissing",errorMsg:a("Mollie Dynamic Amount Field is not Selected"),errorUrl:`field-settings/${n}`})):(f(n,"mollieAmountFldMissing"),F({fieldKey:n,errorKey:"mollieAmountMissing",errorMsg:a("Mollie Fixed Amount is not valid"),errorUrl:`field-settings/${n}`}));const i=g(p,c=>{c[n]=r});x(i),_({event:`Amount Type Changed to "${t.target.value}": ${r.lbl||n}`,type:"set_amount",state:{fields:i,fldKey:n}})},V=()=>G.filter(i=>i[1].typ.match(/^(radio|number|currency)/)).map(i=>e.jsx("option",{value:i[0],children:i[1].adminLbl||i[1].lbl},i[0])),Y=()=>O.filter(i=>i.type==="Mollie").map(i=>e.jsx("option",{value:i.id,children:i.name},i.id));function J(t){r.txt=t.target.value;const i=g(p,c=>{c[n]=r});x(i),_({event:`Mollie pay button text updated : ${r.txt}`,type:"change_mollie_pay_btn_txt",state:{fields:i,fldKey:n}})}const X=()=>be.map(t=>({value:t.method,label:t.title})),Q=t=>{if(t){const c=t.split(",");M(r,"config->payment_method",c)}else M(r,"config->payment_method",["creditcard"]);const i=g(p,c=>{c[n]=r});x(i)},A=(t,i)=>{let c=null,h=null;H(N=>g(N,C=>{t==="btnFulW"?(C.fields[n].classes[`.${n}-mollie-btn`].width=i?"100%":"auto",c=`Button Full width ${i?"on":"off"}`,h="set_btn_full"):t==="txtAlign"?(C.fields[n].classes[`.${n}-mollie-btn`]["justify-content"]=i,c=`Button Text Align ${i}`,h="set_btn_txt_align"):t==="btnAlign"&&(C.fields[n].classes[`.${n}-mollie-wrp`]["justify-content"]=i,c=`Button Align ${i}`,h="set_btn_align")})),r[t]=i;const B=g(p,N=>{N[n]=r});x(B),_({event:c,type:h,state:{fields:B,fldKey:n}})},ee=t=>navigator.clipboard&&window.isSecureContext?navigator.clipboard.writeText(t):(S.current.setAttribute("value",t),S.current.select(),new Promise((i,c)=>{document.execCommand("copy")?i():c()})),te=()=>{ee("[bitform_payments]").then(()=>I.success(a("Copied on clipboard."))).catch(()=>I.error(a("Failed to Copy, Try Again.")))};return e.jsxs("div",{children:[e.jsx(xe,{title:"Field Settings",subtitle:r.typ,fieldKey:n}),e.jsx(y,{id:"slct-cnfg-stng",title:"Mollie Accounts",className:l(d.fieldSection),open:!0,children:e.jsxs("select",{"data-testid":"slct-cnfg-slct",name:"payIntegID",id:"payIntegID",onChange:t=>u(t.target.name,t.target.value),className:l(d.input),value:D,children:[e.jsx("option",{value:"",children:"Select Account"}),Y()]})}),e.jsx(m,{}),D&&e.jsxs(e.Fragment,{children:[e.jsxs(y,{id:"btn-txt-stng",title:a("Redirect Page Url"),className:l(d.fieldSection),open:!0,children:[e.jsx("div",{className:l(d.placeholder),children:e.jsxs("select",{"data-testid":"prfil-page_url-slct",onChange:t=>u("config->redirect_url",t.target.value),className:l(d.input),value:(o==null?void 0:o.redirect_url)||"",children:[e.jsx("option",{value:"",children:a("Select Page")}),Z.map(t=>e.jsx("option",{value:t.url,children:t.title},t.title))]})}),e.jsxs("div",{className:l(d.placeholder),children:[e.jsx("p",{children:"Page URL"}),e.jsx("input",{"data-testid":"nam-stng-inp","aria-label":"Name for this Field",placeholder:"Name for this Field",className:l(d.input),value:(o==null?void 0:o.redirect_url)||"",onChange:t=>u("config->redirect_url",t.target.value)})]}),e.jsxs("p",{className:l({fw:400,cr:"#5c5959"}),children:[e.jsx("strong",{children:"Note: "}),"Create/Edit a page and insert the shortcode"," ",e.jsx("span",{title:"Click for Copy shortcode",role:"button",tabIndex:"0",onClick:te,className:l({cr:"#44484a",cur:"pointer","&:hover":{cr:"#0056b3",td:"underline"}}),children:e.jsx("strong",{children:"[bitform_payments]"})})," ","into the page content. Once the page is save successfully, copy the page URL and paste it into the"," ",e.jsx("strong",{children:"Page URL"}),"."," ","field. After a successful payment, Mollie will redirect users to this page."]}),e.jsx("input",{className:l({oy:0,h:0,m:0,pn:"absolute",tp:0}),ref:S})]}),e.jsx(m,{}),e.jsx(y,{id:"btn-txt-stng",title:a("Pay Button Text"),className:l(d.fieldSection),open:!0,children:e.jsx("div",{className:l(d.placeholder),children:e.jsx(k,{id:"pay-btn-txt","aria-label":"Mollie pay button text",placeholder:"Type text here...",value:z,changeAction:t=>J(t)})})}),e.jsx(m,{}),e.jsx("div",{className:l(s.ml2,s.mr2,s.p1),children:e.jsxs("label",{htmlFor:"currency",children:[e.jsxs("b",{children:[a("Payment Method")," "]}),e.jsx(pe,{className:"w-10 btcd-paper-drpdwn mt-1 btcd-ttc",options:X(),onChange:t=>Q(t),defaultValue:o.payment_method||[]})]})}),e.jsx(m,{}),e.jsx("div",{className:l(s.ml2,s.mr2,s.p1),children:e.jsxs("label",{htmlFor:"currency",children:[e.jsxs("b",{children:[a("Currency")," "]}),e.jsxs("select",{"data-testid":"prfil-country-slct",onChange:t=>u("config->currency",t.target.value),className:l(d.input),value:(o==null?void 0:o.currency)||"",children:[e.jsx("option",{value:"",children:a("Select Currency")}),Object.entries(ye).map(([t,i])=>e.jsx("option",{value:t,children:i},t))]})]})}),e.jsx(m,{}),e.jsxs("div",{className:l(s.ml2,s.mr2,s.p1),children:[e.jsx("b",{className:l(R.amountType),children:a("Amount Type")}),e.jsx(U,{id:"amnt-typ-fxd",onChange:P,radio:!0,checked:!j,title:a("Fixed")}),e.jsx(U,{id:"amnt-typ-dynmc",onChange:P,radio:!0,checked:j,title:a("Dynamic"),value:"dynamic"})]}),!j&&e.jsx("div",{className:l(s.ml2,s.mr2,s.p1),children:e.jsx(he,{id:"amnt",className:l(s.mt0),cls:l(d.input),inpType:"number",title:a("Amount"),value:(o==null?void 0:o.amount)||"",action:t=>u("config->amount",t.target.value)})}),j&&e.jsxs("div",{className:l(s.ml2,s.mr2,s.p1),children:[e.jsx("b",{children:a("Select Amount Field")}),e.jsxs("select",{"data-testid":"slct-amnt-slct",onChange:t=>u("config->amountFld",t.target.value),name:"amountFld",className:l(d.input),value:o==null?void 0:o.amountFld,children:[e.jsx("option",{value:"",children:a("Select Field")}),V()]})]}),e.jsx(m,{}),e.jsx("div",{className:l(s.ml2,s.mr2,s.p1),children:e.jsxs("label",{htmlFor:"description",children:[e.jsxs("b",{className:l(R.amountType),children:[a("Description"),e.jsx(E,{children:e.jsx("div",{className:"txt-body",children:e.jsx(L,{html:$.mollieDescription})})})]}),e.jsx(k,{id:"description","aria-label":"Mollie description text",placeholder:"Type text here...",value:o==null?void 0:o.description,changeAction:t=>u("config->description",t.target.value)})]})}),e.jsx(m,{}),e.jsx("div",{className:l(s.ml2,s.mr2,s.p1),children:e.jsxs("label",{htmlFor:"locale",children:[e.jsxs("b",{className:l(R.amountType),children:[a("Locale"),e.jsx(E,{children:e.jsx("div",{className:"txt-body",children:e.jsx(L,{html:$.mollieLocale})})})]}),e.jsxs("select",{"data-testid":"prfil-locale-slct",onChange:t=>u("config->locale",t.target.value),className:l(d.input),value:(o==null?void 0:o.locale)||"",children:[e.jsx("option",{value:"",children:a("Select Locale")}),Object.entries(je).map(([t,i])=>e.jsx("option",{value:t,children:i},t))]})]})})]}),e.jsx(m,{}),e.jsx("div",{className:l(s.ml2,s.mr2,s.p1,{pr:"36px"}),children:e.jsx(ge,{id:"ful-wid-btn",tip:"By disabling this option, the button full width will be remove",title:a("Full Width"),action:({target:t})=>A("btnFulW",t.checked),isChecked:v||""})}),e.jsx(m,{}),!v&&e.jsx(y,{id:"mollie-btn-algn",title:a("Button Align"),className:l(d.fieldSection),open:!0,children:e.jsx("div",{className:l(d.placeholder),children:e.jsx("select",{"data-testid":"btn-algn-slct",className:l(d.input),value:q,onChange:({target:t})=>A("btnAlign",t.value),children:T.map(t=>e.jsx("option",{value:t.value,children:t.name},`btcd-k-${t.name}`))})})}),v&&e.jsx(y,{id:"mollie-txt-algn",title:a("Text Align"),className:l(d.fieldSection),open:!0,children:e.jsx("div",{className:l(d.placeholder),children:e.jsx("select",{"data-testid":"mollie-txt-algn",className:l(d.input),value:W||"center",onChange:({target:t})=>A("txtAlign",t.value),children:T.map(t=>e.jsx("option",{value:t.value,children:t.name},`btcd-k-${t.name}`))})})}),e.jsx(m,{}),e.jsx(fe,{}),e.jsx(m,{})]})}const Fe={payIntegID:"Payment Configuration Changed",planId:"Plan Id Changed",locale:"Language Selected",disableFunding:"Disabled Card",amount:"Amount",amountFld:"Amount Field Selected",shipping:"Shipping Cost",shippingFld:"Shipping Amount Field Selected",tax:"Tax changed",taxFld:"Tax Amount Field Selected",currency:"Currency Selected",description:"Other Description",descFld:"Description Field Selected",layout:"Layout Changed"},R={amountType:{dy:"flex !important",fw:600,"& .hover-tip":{oy:0}}};export{Ve as default};