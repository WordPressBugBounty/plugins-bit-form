import{w as I,v as B,r as s,j as t,S as v}from"./main-365.js";import"./bf-239-69.js";import{S as w}from"./bf-618-119.js";import{s as b,b as Z}from"./bf-891-74.js";import{I as y}from"./bf-902-329.js";import{N}from"./bf-952-399.js";import k from"./bf-395-241.js";import{h as C}from"./bf-126-333.js";import{Z as E}from"./bf-214-334.js";import"./bf-621-72.js";import"./bf-802-185.js";import"./bf-731-398.js";function $({formFields:d,setIntegration:l,integrations:g,allIntegURL:f}){const h=I(),{formID:n}=B(),[m,a]=s.useState(!1),[o,p]=s.useState(1),[u,i]=s.useState({show:!1}),[c,x]=s.useState(0),[e,r]=s.useState({name:"Zoho Bigin API",type:"Zoho Bigin",clientId:"",clientSecret:"",module:"",field_map:[{formField:"",zohoFormField:""}],relatedlists:[],actions:{}});s.useEffect(()=>{window.opener&&b("zohoBigin")},[]);const S=()=>{setTimeout(()=>{document.getElementById("btcd-settings-wrp").scrollTop=0},300),e.module!==""&&e.field_map.length>0&&p(3)};return t.jsxs("div",{children:[t.jsx(v,{snack:u,setSnackbar:i}),t.jsx("div",{className:"txt-center w-9 mt-2 cal-width",children:t.jsx(w,{step:3,active:o})}),t.jsx(k,{formID:n,biginConf:e,setBiginConf:r,step:o,setstep:p,isLoading:m,setisLoading:a,setSnackbar:i}),t.jsxs("div",{className:"btcd-stp-page",style:{width:o===2&&900,height:o===2&&"100%"},children:[t.jsx(E,{tab:c,settab:x,formID:n,formFields:d,handleInput:j=>C(j,c,e,r,n,a,i),biginConf:e,setBiginConf:r,isLoading:m,setisLoading:a,setSnackbar:i}),t.jsx(N,{nextPageHandler:()=>S()})]}),t.jsx(y,{step:o,saveConfig:()=>Z(g,l,f,e,h)})]})}export{$ as default};