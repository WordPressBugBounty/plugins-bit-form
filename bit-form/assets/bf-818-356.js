var $=Object.defineProperty,A=Object.defineProperties;var U=Object.getOwnPropertyDescriptors;var I=Object.getOwnPropertySymbols;var w=Object.prototype.hasOwnProperty,S=Object.prototype.propertyIsEnumerable;var R=(s,e,r)=>e in s?$(s,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):s[e]=r,c=(s,e)=>{for(var r in e||(e={}))w.call(e,r)&&R(s,r,e[r]);if(I)for(var r of I(e))S.call(e,r)&&R(s,r,e[r]);return s},F=(s,e)=>A(s,U(e));import{_ as i,P as z,$ as b,c as p,ea as g,dI as E}from"./main-478.js";const T=(s,e,r,l,o,a,t,d,n,f)=>{let m=c({},e);if(d){const h=c({},n);h[s.target.name]="",f(c({},h))}switch(m[s.target.name]=s.target.value,s.target.name){case"team":m=C(m,l,r,o,a);break;case"folder":m.folderMap=m.folderMap.slice(0,t),m=M(m,l,r,o,a);break}r(c({},m))},C=(s,e,r,l,o)=>{var t,d;const a=c({},s);return a.folder="",a.team&&!((d=(t=a==null?void 0:a.default)==null?void 0:t.teamFolders)!=null&&d[a.team])&&W(e,a,r,l,o),a},M=(s,e,r,l,o)=>{var t,d,n,f,m,h;const a=c({},s);return delete a.teamType,a.folder&&!((d=(t=a.default)==null?void 0:t.folders)!=null&&d[a.folder])?(((h=(m=(f=(n=a.default)==null?void 0:n.teamFolders)==null?void 0:f[a.team])==null?void 0:m[a.folder])==null?void 0:h.type)==="private"&&(a.teamType="private"),D(e,a,r,l,o)):a.folder&&a.folder!==a.folderMap[a.folderMap.length-1]&&a.folderMap.push(a.folder),a},N=(s,e,r,l,o)=>{l(!0);const a={formID:s,id:e.id,dataCenter:e.dataCenter,clientId:e.clientId,clientSecret:e.clientSecret,tokenDetails:e.tokenDetails};p(a,"bitforms_zworkdrive_refresh_teams").then(t=>{if(t&&t.success){const d=c({},e);t.data.teams&&(d.default=F(c({},d.default),{teams:t.data.teams})),t.data.tokenDetails&&(d.tokenDetails=t.data.tokenDetails),o({show:!0,msg:i("Teams refreshed")}),r(c({},d))}else t&&t.data&&t.data.data||!t.success&&typeof t.data=="string"?o({show:!0,msg:g(i("Teams refresh failed Cause: %s. please try again"),t.data.data||t.data)}):o({show:!0,msg:i("Teams refresh failed. please try again")});l(!1)}).catch(()=>l(!1))},W=(s,e,r,l,o)=>{l(!0);const a={formID:s,id:e.id,dataCenter:e.dataCenter,clientId:e.clientId,clientSecret:e.clientSecret,tokenDetails:e.tokenDetails,team:e.team};p(a,"bitforms_zworkdrive_refresh_team_folders").then(t=>{if(t&&t.success){const d=c({},e);d.default.teamFolders||(d.default.teamFolders={}),t.data.teamFolders&&(d.default.teamFolders[d.team]=t.data.teamFolders),t.data.tokenDetails&&(d.tokenDetails=t.data.tokenDetails),o({show:!0,msg:i("Folders refreshed")}),r(c({},d))}else t&&t.data&&t.data.data||!t.success&&typeof t.data=="string"?o({show:!0,msg:g(i("Folders refresh failed Cause: %s. please try again"),t.data.data||t.data)}):o({show:!0,msg:i("Folders refresh failed. please try again")});l(!1)}).catch(()=>l(!1))},D=(s,e,r,l,o,a)=>{const t=a?e.folderMap[a]:e.folder;l(!0);const d={formID:s,dataCenter:e.dataCenter,clientId:e.clientId,clientSecret:e.clientSecret,tokenDetails:e.tokenDetails,team:e.team,folder:t,teamType:"teamType"in e?"private":"team"};p(d,"bitforms_zworkdrive_refresh_sub_folders").then(n=>{if(n&&n.success){const f=c({},e);n.data.folders?(f.default.folders||(f.default.folders={}),f.default.folders[t]=E(n.data.folders,"folderName"),f.folderMap.includes(t)||f.folderMap.push(t),o({show:!0,msg:i("Sub Folders refreshed")})):o({show:!0,msg:i("No Sub Folder Found")}),n.data.tokenDetails&&(f.tokenDetails=n.data.tokenDetails),r(c({},f))}else o({show:!0,msg:i("Sub Folders refresh failed. please try again")});l(!1)}).catch(()=>l(!1))},O=(s,e,r,l,o)=>{l(!0);const a={formID:s,id:e.id,dataCenter:e.dataCenter,clientId:e.clientId,clientSecret:e.clientSecret,tokenDetails:e.tokenDetails,team:e.team};p(a,"bitforms_zworkdrive_refresh_users").then(t=>{if(t&&t.success){const d=c({},e);d.default.users||(d.default.users={}),t.data.users&&(d.default.users[e.team]=t.data.users),t.data.tokenDetails&&(d.tokenDetails=t.data.tokenDetails),o({show:!0,msg:i("Users refreshed")}),r(c({},d))}else t&&t.data&&t.data.data||!t.success&&typeof t.data=="string"?o({show:!0,msg:g(i("Users refresh failed Cause: %s. please try again"),t.data.data||t.data)}):o({show:!0,msg:i("Users refresh failed. please try again")});l(!1)}).catch(()=>l(!1))},j=(s,e,r,l,o,a)=>{if(!s.dataCenter||!s.clientId||!s.clientSecret){r({dataCenter:s.dataCenter?"":i("Data center cann't be empty"),clientId:s.clientId?"":i("Client ID cann't be empty"),clientSecret:s.clientSecret?"":i("Secret key cann't be empty")});return}const t=z(b);o(!0);const d="WorkDrive.team.READ,WorkDrive.workspace.READ,WorkDrive.workspace.CREATE,WorkDrive.workspace.UPDATE,WorkDrive.files.READ,WorkDrive.files.CREATE",n=`https://accounts.zoho.${s.dataCenter}/oauth/v2/auth?scope=${d}&response_type=code&client_id=${s.clientId}&prompt=Consent&access_type=offline&state=${encodeURIComponent(window.location.href)}/redirect&redirect_uri=${encodeURIComponent(t.zohoRedirectURL)}`,f=window.open(n,"zohoWorkDrive","width=400,height=609,toolbar=off"),m=setInterval(()=>{if(f.closed){clearInterval(m);let h={},_=!1;const y=localStorage.getItem("__bitforms_zohoWorkDrive");if(y&&(_=!0,h=JSON.parse(y),localStorage.removeItem("__bitforms_zohoWorkDrive")),!h.code||h.error||!h||!_){const u=h.error?`Cause: ${h.error}`:"";a({show:!0,msg:`${i("Authorization failed")} ${u}. ${i("please try again")}`}),o(!1)}else{const u=c({},s);u.accountServer=h["accounts-server"],P(h,u,e,l,o,a)}}},500)},P=(s,e,r,l,o,a)=>{const t=z(b),d=c({},s);d.dataCenter=e.dataCenter,d.clientId=e.clientId,d.clientSecret=e.clientSecret,d.redirectURI=encodeURIComponent(t.zohoRedirectURL),p(d,"bitforms_zworkdrive_generate_token").then(n=>n).then(n=>{if(n&&n.success){const f=c({},e);f.tokenDetails=n.data,r(f),l(!0),a({show:!0,msg:i("Authorized Successfully")})}else n&&n.data&&n.data.data||!n.success&&typeof n.data=="string"?a({show:!0,msg:`${i("Authorization failed Cause:")}${n.data.data||n.data}. ${i("please try again")}`}):a({show:!0,msg:i("Authorization failed. please try again")});o(!1)})};export{N as a,W as b,D as c,j as d,T as h,O as r};