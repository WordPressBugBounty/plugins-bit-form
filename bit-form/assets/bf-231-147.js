import{a as p,r as e,j as w}from"./main-917.js";import{F as b}from"./bf-558-146.js";const x=({id:u,name:n,className:o,ariaLabel:c,placeholder:i,changeAction:a,value:r,rows:h=1,maxRow:l=3})=>{const{css:f}=p(),t=e.useRef(null),s=()=>{for(;t.current.getAttribute("rows")<l&&t.current.offsetHeight<t.current.scrollHeight;)t.current.setAttribute("rows",Number(t.current.getAttribute("rows"))+1)},g=()=>{for(t.current.style.height=`${t.current.offsetHeight-1}px`;t.current.offsetHeight>=t.current.scrollHeight&&t.current.getAttribute("rows")>1;)t.current.setAttribute("rows",Number(t.current.getAttribute("rows"))-1),t.current.style.height="unset",t.current.style.height=`${t.current.offsetHeight-1}px`;t.current.style.height="unset"};return e.useEffect(()=>{s()},[]),e.useEffect(()=>{g(),s()},[r]),w.jsx("textarea",{"data-testid":`${u}-ato-siz-inp`,"aria-label":c,ref:t,name:n,className:`${f(b.input,{ow:"auto",re:"height"})} ${o}`,placeholder:i,value:r,rows:h,onChange:a})};var H=x;export{H as A};