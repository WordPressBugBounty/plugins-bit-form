var y=Object.defineProperty;var w=Object.getOwnPropertySymbols;var M=Object.prototype.hasOwnProperty,T=Object.prototype.propertyIsEnumerable;var g=(l,a,s)=>a in l?y(l,a,{enumerable:!0,configurable:!0,writable:!0,value:s}):l[a]=s,u=(l,a)=>{for(var s in a||(a={}))M.call(a,s)&&g(l,s,a[s]);if(w)for(var s of w(a))T.call(a,s)&&g(l,s,a[s]);return l};import{r as N,j as e,T as F,_ as d,e as k,f as S}from"./main-640.js";import{u as A}from"./bf-137-72.js";import{h as _,g as R,a as E}from"./bf-265-390.js";function L({oneDriveConf:l,setOneDriveConf:a,formFields:s,formID:x,setSnackbar:j}){var p;l.folderMap?l.folderMap[0]:l.folder,N.useState(!1);const[r,i]=N.useState({show:!1}),b=(t,h,o)=>{const n=u({},l);h==="create_folder"?t.target.checked?n.actions.create_folder={name:"",suffix:!1}:(delete n.actions.create_folder,delete n.actions.share.folder):h==="attachments"&&(t!==""?n.actions.attachments=t:(delete n.actions.attachments,delete n.actions.share.file)),a(u({},n))},c=()=>{var t,h,o;(t=l.actions)!=null&&t.share||(l.actions.share={}),(o=(h=l.actions)==null?void 0:h.share)!=null&&o.file||(l.actions.share.file={permissions:[{email:"",access:"34",accessLabel:"View"},{email:"",access:"5",accessLabel:"Edit"},{email:"",access:"4",accessLabel:"Share"},{email:"",access:"6",accessLabel:"View and Comment"}],mail:"false"}),i({show:"attachments"})},m=(t,h)=>{const o=u({},l);h==="deleteFile"&&(t.target.checked?o.actions.delete_from_wp=!0:delete o.actions.delete_from_wp),a(u({},o))},f=()=>s.filter(t=>t.type==="file-up").map(t=>({label:t.lbl,value:t.key}));return e.jsxs("div",{className:"pos-rel d-flx w-5",children:[e.jsxs("div",{className:"pos-rel d-flx flx-col w-8",children:[e.jsx(F,{onChange:c,checked:"attachments"in l.actions,className:"wdt-200 mt-4 mr-2",value:"Attachment",title:d("Upload Files"),subTitle:d("Add attachments from Bit-integration-pro to OneDrive folder.")}),!l.actions.attachments&&e.jsx("small",{style:{marginLeft:30,marginTop:10,color:"red",fontWeight:"bold"},children:d("This action is required.")})]}),e.jsx(k,{className:"custom-conf-mdl",mainMdlCls:"o-v",btnClass:"blue",btnTxt:"Ok",show:r.show==="attachments",close:()=>i({show:!1}),action:()=>i({show:!1}),title:d("Select Attachment"),children:e.jsxs("div",{style:{height:"95%"},children:[e.jsx("div",{className:"mt-2",children:d("Select file upload fields")}),e.jsx(A,{defaultValue:l.actions.attachments,className:"mt-2 w-10 mb-25",options:f(),onChange:t=>b(t,"attachments"),height:300})]})}),e.jsx("div",{className:"pos-rel d-flx flx-col w-8",children:e.jsx(F,{checked:((p=l.actions)==null?void 0:p.delete_from_wp)||!1,onChange:t=>m(t,"deleteFile"),className:"mt-4 mr-2",value:"delete_from_wp",title:d("Delete File From Wordpress"),subTitle:d("Delete file from Wordpress after upload in OneDrive")})})]})}function B({formID:l,formFields:a,oneDriveConf:s,setOneDriveConf:x,isLoading:j,setIsLoading:r,setSnackbar:i}){var b;return e.jsxs(e.Fragment,{children:[e.jsx("br",{}),e.jsx("b",{className:"wdt-150 d-in-b mr-2",children:"Folder:"}),e.jsxs("select",{onChange:c=>_(c,s,x,l,r,i),name:"folder",value:s.folderMap[0]||s.folder,className:"btcd-paper-inp w-7",children:[e.jsx("option",{value:"",children:d("Select Folder")}),((b=s==null?void 0:s.default)==null?void 0:b.rootFolders)&&s.default.rootFolders.map(c=>e.jsx("option",{value:c.id,children:c.name},c.id))]}),e.jsx("button",{onClick:()=>R(l,s,x,r),className:"icn-btn sh-sm ml-2 mr-2 tooltip",style:{"--tooltip-txt":`'${d("Refresh All oneDrive Folders")}'`},type:"button",disabled:j,children:"↻"}),e.jsx("br",{}),s.folderMap.map((c,m)=>{var f,p;return e.jsxs("div",{children:[e.jsx("br",{}),e.jsxs("div",{className:"flx",children:[e.jsx("b",{className:"wdt-150 d-in-b mr-2"}),e.jsx("div",{className:"d-in-b",style:{width:(m+1)*10,marginLeft:1,marginRight:2,height:58,marginTop:-60},children:e.jsx("div",{className:"sub-tree"})}),e.jsxs("div",{className:"flx sub-folder w-7",children:[e.jsxs("select",{onChange:t=>_(t,s,x,l,r,i,m+1),name:"folder",value:s.folderMap[m+1]||s.folder,className:"btcd-paper-inp",children:[e.jsx("option",{value:s.folderMap[m],children:"/ root"}),((p=(f=s==null?void 0:s.default)==null?void 0:f.folders)==null?void 0:p[c])&&s.default.folders[c].map(t=>e.jsx("option",{value:t.id,children:t.name},t.id))]}),e.jsx("div",{className:"tooltip-box",children:e.jsx("button",{onClick:()=>E(l,s,x,r,i,m),className:"d-non icn-btn sh-sm ml-2 mr-2 tooltip",style:{"--tooltip-txt":`'${d("Refresh Sub Folders")}'`},type:"button",disabled:j,children:"↻"})})]})]})]},c)}),e.jsx("br",{}),e.jsx("br",{}),j&&e.jsx(S,{style:{display:"flex",justifyContent:"center",alignItems:"center",height:100,transform:"scale(0.7)"}}),s.folder&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"mt-4",children:e.jsx("b",{className:"wdt-100",children:d("Actions")})}),e.jsx("div",{className:"btcd-hr mt-1"}),e.jsx(L,{oneDriveConf:s,setOneDriveConf:x,formFields:a,formID:l,setisLoading:r,setSnackbar:i})]})]})}export{B as O};