import{v as j,w as S,r as a,j as t,S as T}from"./main-803.js";import"./bf-45-72.js";import{S as b}from"./bf-936-121.js";import{b as v}from"./bf-179-77.js";import{I as y}from"./bf-514-332.js";import{N as w}from"./bf-880-402.js";import I from"./bf-827-244.js";import{T as _}from"./bf-795-383.js";import"./bf-928-75.js";import"./bf-741-188.js";import"./bf-553-401.js";import"./bf-792-382.js";import"./bf-153-82.js";function R({formFields:d,setIntegration:g,integrations:l,allIntegURL:x}){const f=j(),{formID:r}=S(),[i,m]=a.useState(!1),[e,n]=a.useState(1),[h,o]=a.useState({show:!1}),[s,p]=a.useState({name:"Telegram",type:"Telegram",parse_mode:"HTML",bot_api_key:"",chat_id:"",body:"",actions:{}}),u=c=>{setTimeout(()=>{document.getElementById("btcd-settings-wrp").scrollTop=0},300),c===3&&s.name!==""&&s.chat_id&&n(c)};return t.jsxs("div",{children:[t.jsx(T,{snack:h,setSnackbar:o}),t.jsx("div",{className:"txt-center w-9 mt-2 cal-width",children:t.jsx(b,{step:3,active:e})}),t.jsx(I,{formID:r,telegramConf:s,setTelegramConf:p,step:e,setstep:n,isLoading:i,setisLoading:m,setSnackbar:o}),t.jsxs("div",{className:"btcd-stp-page",style:{width:e===2&&900,height:e===2&&"100%",minHeight:e===2&&"200px"},children:[t.jsx(_,{formID:r,formFields:d,telegramConf:s,setTelegramConf:p,isLoading:i,setisLoading:m,setSnackbar:o}),t.jsx("br",{}),t.jsx("br",{}),t.jsx(w,{nextPageHandler:()=>u(3),disabled:s.chat_id===""})]}),t.jsx(y,{step:e,saveConfig:()=>v(l,g,x,s,f)})]})}export{R as default};