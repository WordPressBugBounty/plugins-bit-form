import{v as w,w as S,r,j as t,S as I,_ as f}from"./main-232.js";/* empty css          */import{S as D}from"./bf-173-135.js";import{s as b,b as _}from"./bf-348-75.js";import{I as P}from"./bf-363-334.js";import{N as Z}from"./bf-446-403.js";import v from"./bf-949-258.js";import{h as y,c as N,b as z}from"./bf-633-346.js";import{Z as C}from"./bf-669-347.js";import"./bf-670-125.js";import"./bf-917-198.js";import"./bf-106-80.js";import"./bf-678-70.js";import"./bf-918-402.js";import"./bf-646-127.js";import"./bf-80-121.js";import"./bf-156-130.js";function V({formFields:l,setIntegration:h,integrations:g,allIntegURL:u}){const x=w(),{formID:i}=S(),[d,n]=r.useState(!1),[a,p]=r.useState(1),[k,s]=r.useState({show:!1}),[e,m]=r.useState({name:"Zoho Desk API",type:"Zoho Desk",clientId:"",clientSecret:"",orgId:"",department:"",field_map:[{formField:"",zohoFormField:""}],actions:{}});r.useEffect(()=>{window.opener&&b("zohoDesk")},[]);const j=o=>{var c;if(o===3){if(!N(e)){s({show:!0,msg:f("Please map mandatory fields")});return}if(!((c=e.actions)!=null&&c.ticket_owner)){s({show:!0,msg:f("Please select a ticket owner")});return}e.department!==""&&e.table!==""&&e.field_map.length>0&&p(o)}else p(o),o===2&&!e.department&&z(i,e,m,n,s)};return t.jsxs("div",{children:[t.jsx(I,{snack:k,setSnackbar:s}),t.jsx("div",{className:"txt-center w-9 mt-2 cal-width",children:t.jsx(D,{step:3,active:a})}),t.jsx(v,{formID:i,deskConf:e,setDeskConf:m,step:a,setstep:p,isLoading:d,setisLoading:n,setSnackbar:s}),t.jsxs("div",{className:"btcd-stp-page",style:{width:a===2&&900,height:a===2&&"100%"},children:[t.jsx(C,{formID:i,formFields:l,handleInput:o=>y(o,e,m,i,n,s),deskConf:e,setDeskConf:m,isLoading:d,setisLoading:n,setSnackbar:s}),t.jsx(Z,{nextPageHandler:()=>j(3),disabled:e.department===""||e.table===""||e.field_map.length<1})]}),t.jsx(P,{step:a,saveConfig:()=>_(g,h,u,e,x)})]})}export{V as default};