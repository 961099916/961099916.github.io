import{I as _,f as te,J as ae,K as M,L as se,P as le,M as re,l as ue,g as S,i as C,N as ie,j as Y,h as a,O as Ee,R as T,Q as oe,S as ne,T as ce,U as ve,V as Be,W as he,n as Ae,X as pe,u as de,Y as ye,Z as me,$,a0 as I,a1 as ge,a2 as H,a3 as Fe}from"./app-BxH8qXLp.js";const De=["/","/java/cglib.html","/java/collection.html","/java/jvm.html","/java/string.html","/java/%E5%B0%BC%E6%81%A9%E9%9D%A2%E8%AF%95.html","/java/%E5%B9%B6%E5%8F%91.html","/java/%E9%9D%A2%E8%AF%95%E9%A2%98.html","/%E4%B8%AD%E9%97%B4%E4%BB%B6/mysql.html","/%E6%A1%86%E6%9E%B6/mybatis.html","/%E6%A1%86%E6%9E%B6/spring.html","/%E6%AF%8F%E6%97%A5%E5%A4%8D%E7%9B%98/2024-02-27.html","/%E6%AF%8F%E6%97%A5%E5%A4%8D%E7%9B%98/2024-03-22.html","/%E6%AF%8F%E6%97%A5%E5%A4%8D%E7%9B%98/2024-03-25.html","/%E6%AF%8F%E6%97%A5%E5%A4%8D%E7%9B%98/2024-03-26.html","/%E7%90%86%E8%B4%A2/%E5%8C%97%E4%BA%AC%E7%82%92%E5%AE%B6.html","/%E7%90%86%E8%B4%A2/%E5%BC%B1%E8%BD%AC%E5%BC%BA.html","/%E7%90%86%E8%B4%A2/%E6%80%BB%E7%BB%93.html","/%E7%90%86%E8%B4%A2/%E6%B6%85%E6%A7%83%E9%87%8D%E5%8D%87.html","/%E7%90%86%E8%B4%A2/%E7%9C%8B%E7%9B%98.html","/%E7%90%86%E8%B4%A2/%E8%81%8C%E4%B8%9A%E7%82%92%E6%89%8B.html","/%E8%AF%BB%E4%B9%A6/%E3%80%8ARocketMQ%E6%8A%80%E6%9C%AF%E5%86%85%E5%B9%95%E3%80%8B.html","/%E8%AF%BB%E4%B9%A6/%E3%80%8A%E4%BB%8E%E9%9B%B6%E5%BC%80%E5%A7%8B%E5%AD%A6%E6%9E%B6%E6%9E%84%EF%BC%9A%E7%85%A7%E7%9D%80%E5%81%9A%EF%BC%8C%E4%BD%A0%E4%B9%9F%E8%83%BD%E6%88%90%E4%B8%BA%E6%9E%B6%E6%9E%84%E5%B8%88%E3%80%8B.html","/%E8%AF%BB%E4%B9%A6/%E3%80%8A%E6%83%85%E7%BB%AA%E9%BE%99%E5%A4%B4%E6%88%98%E6%B3%95%E3%80%8B.html","/%E8%BF%90%E7%BB%B4/%E4%BA%91%E5%B9%B3%E5%8F%B0%E6%90%AD%E5%BB%BA.html","/404.html","/java/","/%E4%B8%AD%E9%97%B4%E4%BB%B6/","/%E6%A1%86%E6%9E%B6/","/%E6%AF%8F%E6%97%A5%E5%A4%8D%E7%9B%98/","/%E7%90%86%E8%B4%A2/","/%E8%AF%BB%E4%B9%A6/","/%E8%BF%90%E7%BB%B4/","/category/","/category/%E9%9D%A2%E8%AF%95/","/category/%E8%82%A1%E7%A5%A8/","/tag/","/tag/%E9%9D%A2%E8%AF%95%E9%A2%98/","/tag/%E7%82%92%E8%82%A1%E5%A4%8D%E7%9B%98/","/tag/%E8%AE%A1%E7%AE%97%E6%9C%BA/","/tag/%E9%87%91%E8%9E%8D/","/article/","/star/","/timeline/"],fe="SEARCH_PRO_QUERY_HISTORY",d=_(fe,[]),Ce=()=>{const{queryHistoryCount:s}=H,l=s>0;return{enabled:l,queryHistory:d,addQueryHistory:r=>{l&&(d.value=Array.from(new Set([r,...d.value.slice(0,s-1)])))},removeQueryHistory:r=>{d.value=[...d.value.slice(0,r),...d.value.slice(r+1)]}}},L=s=>De[s.id]+("anchor"in s?`#${s.anchor}`:""),He="SEARCH_PRO_RESULT_HISTORY",{resultHistoryCount:U}=H,y=_(He,[]),Re=()=>{const s=U>0;return{enabled:s,resultHistory:y,addResultHistory:l=>{if(s){const r={link:L(l),display:l.display};"header"in l&&(r.header=l.header),y.value=[r,...y.value.slice(0,U-1)]}},removeResultHistory:l=>{y.value=[...y.value.slice(0,l),...y.value.slice(l+1)]}}},ke=s=>{const l=ve(),r=M(),R=Be(),i=S(0),F=C(()=>i.value>0),h=he([]);return Ae(()=>{const{search:A,terminate:k}=pe(),m=ge(n=>{const g=n.join(" "),{searchFilter:Q=B=>B,splitWord:w,suggestionsFilter:b,...p}=l.value;g?(i.value+=1,A(n.join(" "),r.value,p).then(B=>Q(B,g,r.value,R.value)).then(B=>{i.value-=1,h.value=B}).catch(B=>{console.warn(B),i.value-=1,i.value||(h.value=[])})):h.value=[]},H.searchDelay-H.suggestDelay);Y([s,r],([n])=>m(n),{immediate:!0}),de(()=>{k()})}),{isSearching:F,results:h}};var we=te({name:"SearchResult",props:{queries:{type:Array,required:!0},isFocusing:Boolean},emits:["close","updateQuery"],setup(s,{emit:l}){const r=ae(),R=M(),i=se(le),{enabled:F,addQueryHistory:h,queryHistory:A,removeQueryHistory:k}=Ce(),{enabled:m,resultHistory:n,addResultHistory:g,removeResultHistory:Q}=Re(),w=F||m,b=re(s,"queries"),{results:p,isSearching:B}=ke(b),u=ue({isQuery:!0,index:0}),c=S(0),v=S(0),O=C(()=>w&&(A.value.length>0||n.value.length>0)),q=C(()=>p.value.length>0),j=C(()=>p.value[c.value]||null),V=()=>{const{isQuery:e,index:t}=u;t===0?(u.isQuery=!e,u.index=e?n.value.length-1:A.value.length-1):u.index=t-1},J=()=>{const{isQuery:e,index:t}=u;t===(e?A.value.length-1:n.value.length-1)?(u.isQuery=!e,u.index=0):u.index=t+1},K=()=>{c.value=c.value>0?c.value-1:p.value.length-1,v.value=j.value.contents.length-1},N=()=>{c.value=c.value<p.value.length-1?c.value+1:0,v.value=0},W=()=>{v.value<j.value.contents.length-1?v.value+=1:N()},X=()=>{v.value>0?v.value-=1:K()},x=e=>e.map(t=>Fe(t)?t:a(t[0],t[1])),Z=e=>{if(e.type==="customField"){const t=ye[e.index]||"$content",[E,f=""]=me(t)?t[R.value].split("$content"):t.split("$content");return e.display.map(o=>a("div",x([E,...o,f])))}return e.display.map(t=>a("div",x(t)))},D=()=>{c.value=0,v.value=0,l("updateQuery",""),l("close")},z=()=>F?a("ul",{class:"search-pro-result-list"},a("li",{class:"search-pro-result-list-item"},[a("div",{class:"search-pro-result-title"},i.value.queryHistory),A.value.map((e,t)=>a("div",{class:["search-pro-result-item",{active:u.isQuery&&u.index===t}],onClick:()=>{l("updateQuery",e)}},[a($,{class:"search-pro-result-type"}),a("div",{class:"search-pro-result-content"},e),a("button",{class:"search-pro-remove-icon",innerHTML:I,onClick:E=>{E.preventDefault(),E.stopPropagation(),k(t)}})]))])):null,G=()=>m?a("ul",{class:"search-pro-result-list"},a("li",{class:"search-pro-result-list-item"},[a("div",{class:"search-pro-result-title"},i.value.resultHistory),n.value.map((e,t)=>a(T,{to:e.link,class:["search-pro-result-item",{active:!u.isQuery&&u.index===t}],onClick:()=>{D()}},()=>[a($,{class:"search-pro-result-type"}),a("div",{class:"search-pro-result-content"},[e.header?a("div",{class:"content-header"},e.header):null,a("div",e.display.map(E=>x(E)).flat())]),a("button",{class:"search-pro-remove-icon",innerHTML:I,onClick:E=>{E.preventDefault(),E.stopPropagation(),Q(t)}})]))])):null;return ie("keydown",e=>{if(s.isFocusing){if(q.value){if(e.key==="ArrowUp")X();else if(e.key==="ArrowDown")W();else if(e.key==="Enter"){const t=j.value.contents[v.value];h(s.queries.join(" ")),g(t),r.push(L(t)),D()}}else if(m){if(e.key==="ArrowUp")V();else if(e.key==="ArrowDown")J();else if(e.key==="Enter"){const{index:t}=u;u.isQuery?(l("updateQuery",A.value[t]),e.preventDefault()):(r.push(n.value[t].link),D())}}}}),Y([c,v],()=>{var e;(e=document.querySelector(".search-pro-result-list-item.active .search-pro-result-item.active"))==null||e.scrollIntoView(!1)},{flush:"post"}),()=>a("div",{class:["search-pro-result-wrapper",{empty:s.queries.length?!q.value:!O.value}],id:"search-pro-results"},s.queries.length?B.value?a(Ee,{hint:i.value.searching}):q.value?a("ul",{class:"search-pro-result-list"},p.value.map(({title:e,contents:t},E)=>{const f=c.value===E;return a("li",{class:["search-pro-result-list-item",{active:f}]},[a("div",{class:"search-pro-result-title"},e||i.value.defaultTitle),t.map((o,ee)=>{const P=f&&v.value===ee;return a(T,{to:L(o),class:["search-pro-result-item",{active:P,"aria-selected":P}],onClick:()=>{h(s.queries.join(" ")),g(o),D()}},()=>[o.type==="text"?null:a(o.type==="title"?oe:o.type==="heading"?ne:ce,{class:"search-pro-result-type"}),a("div",{class:"search-pro-result-content"},[o.type==="text"&&o.header?a("div",{class:"content-header"},o.header):null,a("div",Z(o))])])})])})):i.value.emptyResult:w?O.value?[z(),G()]:i.value.emptyHistory:i.value.emptyResult)}});export{we as default};
