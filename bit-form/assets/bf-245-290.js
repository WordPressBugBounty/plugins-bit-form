import{v,w as j,r as a,j as e,S as I}from"./main-471.js";import"./bf-685-72.js";import{S}from"./bf-592-121.js";import{b as A}from"./bf-458-77.js";import{I as w}from"./bf-261-332.js";import{N as y}from"./bf-59-402.js";import P from"./bf-537-238.js";import{c as b}from"./bf-587-380.js";import{A as k}from"./bf-845-381.js";import"./bf-230-75.js";import"./bf-202-188.js";import"./bf-958-401.js";function D({formFields:c,setIntegration:l,integrations:d,allIntegURL:g}){const f=v(),{formID:o}=j(),[r,n]=a.useState(!1),[s,m]=a.useState(1),[u,i]=a.useState({show:!1}),[t,p]=a.useState({name:"Active Campaign API",type:"ActiveCampaign",api_url:"",api_key:"",field_map:[{formField:"",activeCampaignField:""}],actions:{}}),x=h=>{if(setTimeout(()=>{document.getElementById("btcd-settings-wrp").scrollTop=0},300),h===3){if(!b(t)){i({show:!0,msg:"Please map all required fields to continue."});return}if(!(t!=null&&t.listId)){i({show:!0,msg:"Please select list to continue."});return}t.name!==""&&t.field_map.length>0&&m(3)}};return e.jsxs("div",{children:[e.jsx(I,{snack:u,setSnackbar:i}),e.jsx("div",{className:"txt-center w-9 mt-2 cal-width",children:e.jsx(S,{step:3,active:s})}),e.jsx(P,{formID:o,activeCampaingConf:t,setActiveCampaingConf:p,step:s,setstep:m,isLoading:r,setIsLoading:n,setSnackbar:i}),e.jsxs("div",{className:"btcd-stp-page",style:{width:s===2&&900,minHeight:s===2&&"900px"},children:[e.jsx(k,{formID:o,formFields:c,activeCampaingConf:t,setActiveCampaingConf:p,isLoading:r,setIsLoading:n,setSnackbar:i}),e.jsx(y,{nextPageHandler:()=>x(3),disabled:!(t!=null&&t.listId)||t.field_map.length<1})]}),e.jsx(w,{step:s,saveConfig:()=>A(d,l,g,t,f)})]})}export{D as default};