var C=Object.defineProperty;var u=Object.getOwnPropertySymbols;var N=Object.prototype.hasOwnProperty,_=Object.prototype.propertyIsEnumerable;var p=(t,e,s)=>e in t?C(t,e,{enumerable:!0,configurable:!0,writable:!0,value:s}):t[e]=s,f=(t,e)=>{for(var s in e||(e={}))N.call(e,s)&&p(t,s,e[s]);if(u)for(var s of u(e))_.call(e,s)&&p(t,s,e[s]);return t};import{w,v as L,r as n,j as a,S as q}from"./main-365.js";import"./bf-239-69.js";import{S as E}from"./bf-618-119.js";import{b as P}from"./bf-891-74.js";import{I as T}from"./bf-902-329.js";import{N as A}from"./bf-952-399.js";import B from"./bf-700-257.js";import{h as D,i as U}from"./bf-969-392.js";import{S as z}from"./bf-448-393.js";import"./bf-621-72.js";import"./bf-802-185.js";import"./bf-731-398.js";function $({formFields:t,setIntegration:e,integrations:s,allIntegURL:x}){const b=w(),{formID:F}=L(),[m,r]=n.useState(!1),[i,c]=n.useState(1),[S,l]=n.useState({show:!1}),g=[{key:"1",label:"Create List"},{key:"2",label:"Create Contact"},{key:"3",label:"Unsubscribe Contact"}],h=[{key:"email",label:"Email",required:!0},{key:"first_name",label:"First Name",required:!1},{key:"last_name",label:"Last Name",required:!1}],y=[{key:"name",label:"Name",required:!0}],k=[{key:"email",label:"Email",required:!0}],[o,d]=n.useState({name:"SendFox",type:"SendFox",listId:"",access_token:"",field_map:[{formField:"",sendFoxFormField:""}],field_map_list:[{formField:"",sendFoxListFormField:""}],field_map_unsubscribe:[{formField:"",sendFoxUnsubscribeFormField:""}],allActions:g,contactFields:h,unsubscribeFields:k,listFields:y,actions:{}}),j=()=>{setTimeout(()=>{document.getElementById("btcd-settings-wrp").scrollTop=0},300),c(3)},v=()=>{P(s,e,x,o,b)};return a.jsxs("div",{children:[a.jsx(q,{snack:S,setSnackbar:l}),a.jsx("div",{className:"txt-center w-9 mt-2 cal-width",children:a.jsx(E,{step:3,active:i})}),a.jsx(B,{formID:F,sendFoxConf:o,setSendFoxConf:d,step:i,setstep:c,isLoading:m,setIsLoading:r,setSnackbar:l}),a.jsxs("div",{className:"btcd-stp-page",style:f({},i===2&&{width:900,height:"auto",overflow:"visible"}),children:[a.jsx(z,{formFields:t,handleInput:I=>D(I,o,d,r),sendFoxConf:o,setSendFoxConf:d,isLoading:m,setIsLoading:r,setSnackbar:l}),a.jsx(A,{nextPageHandler:()=>j(),disabled:U(o)})]}),a.jsx(T,{step:i,saveConfig:()=>v()})]})}export{$ as default};