(this.webpackJsonpSNSClientForEngineersAndProgrammers=this.webpackJsonpSNSClientForEngineersAndProgrammers||[]).push([[0],{27:function(e,t,n){},49:function(e,t,n){"use strict";n.r(t);var c,r,a,i,o,u,s,l,d,f,b,j,O,p,x,h,v,m,g,_=n(0),y=n.n(_),k=n(32),w=n.n(k),T=(n(27),n(36)),E=n(8),S=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,50)).then((function(t){var n=t.getCLS,c=t.getFID,r=t.getFCP,a=t.getLCP,i=t.getTTFB;n(e),c(e),r(e),a(e),i(e)}))},C=n(4),I=n(7),N=n.n(I),M=n(10),L=n(15),A=n(14),F=n(3),D=n(5),P=n(17),R=n(16),U=n(6),z=n(1),$=function(e){var t=e.onDropFile,n=Object(_.useState)(!1),c=Object(D.a)(n,2),r=c[0],a=c[1],i=Object(_.useState)(),o=Object(D.a)(i,2),u=o[0],s=o[1];return Object(_.useEffect)((function(){u&&(t(u),s(void 0))}),[u,t]),Object(_.useEffect)((function(){document.addEventListener("drop",(function(e){if(a(!1),e.preventDefault(),e.dataTransfer.items){for(var t=0;t<e.dataTransfer.items.length;t++)if("file"===e.dataTransfer.items[t].kind){var n=e.dataTransfer.items[t].getAsFile();s(n)}}else for(var c=0;c<e.dataTransfer.files.length;c++)console.log("... file["+c+"].name = "+e.dataTransfer.files[c].name)})),document.addEventListener("dragenter",(function(e){e.preventDefault(),a(!0)})),document.addEventListener("dragover",(function(e){return e.preventDefault()})),document.addEventListener("dragleave",(function(e){e.preventDefault(),console.log("leave",e),e.fromElement||a(!1)}))}),[]),Object(z.jsx)(q,{enabled:r})},q=U.a.div(c||(c=Object(C.a)(["\n  position: absolute;\n  width: calc(100vw - ","px);\n  height: calc(100vh - ","px);\n  top: 0px;\n  margin: ","px;\n  border-radius: 32px;\n  background: gray;\n  border: ","px dashed black;\n  opacity: 0.5;\n  display:   ",";\n"])),40,40,16,4,(function(e){return e.enabled?"block":"none"})),V=function(e){var t,n=e.value,c=e.onChange,r=e.onSubmit,a=e.userList,i=Object(_.useState)(!1),o=Object(D.a)(i,2),u=o[0],s=o[1],l=Object(_.useRef)(null),d=Object(_.useCallback)((function(e){e.ctrlKey&&"Enter"===e.key&&!u&&s(!0)}),[]);Object(_.useEffect)((function(){Object(M.a)(N.a.mark((function e(){return N.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:u&&n.text.trim()&&(s(!1),r(n),c(be));case 1:case"end":return e.stop()}}),e)})))()}),[u,n,c,r]),Object(_.useEffect)((function(){l.current&&(console.log("effect"),l.current.removeEventListener("keyup",d,!1),l.current.addEventListener("keyup",d,!1))}),[l.current]);var f=function(e){c(Object(F.a)(Object(F.a)({},n),{},Object(A.a)({},e.target.name,e.target.value)))};return Object(z.jsxs)(J,{children:[Object(z.jsxs)("form",{children:[Object(z.jsxs)("div",{className:"flex",children:[Object(z.jsx)("input",{type:"text",name:"replyToTextId",placeholder:"\u30c4\u30a4\u30fc\u30c8\u3078\u306e\u8fd4\u4fe1",value:n.replyToTextId,onChange:f}),Object(z.jsxs)("select",{name:"replyToUserId",value:n.replyToUserId,onChange:f,children:[Object(z.jsx)("option",{value:"",children:"-"}),a.map((function(e){return Object(z.jsx)("option",{value:e.id,children:e.name||"\u533f\u540d(".concat(e._user_id.slice(0,2),")")},e.id)}))]}),Object(z.jsx)(B,{error:n.text.trim().length>280,children:"".concat(n.text.trim().length,"/280")})]}),Object(z.jsxs)("div",{className:"flex",children:[Object(z.jsx)("textarea",{name:"text",ref:l,placeholder:"\u4eca\u306a\u306b\u3057\u3066\u308b\uff1f",rows:4,cols:50,value:n.text,onChange:function(e){return c(Object(F.a)(Object(F.a)({},n),{},{text:e.target.value}))}}),Object(z.jsx)(R.a,{className:"clickable",icon:P.c,title:"post",onClick:function(e){e.preventDefault(),s(!0)}}),Object(z.jsx)("div",{children:null===(t=n.files)||void 0===t?void 0:t.map((function(e,t){return Object(z.jsxs)("div",{children:[e.name,Object(z.jsx)(R.a,{className:"clickable ml1",icon:P.e,onClick:function(){var e;return c(Object(F.a)(Object(F.a)({},n),{},{files:null===(e=n.files)||void 0===e?void 0:e.filter((function(e,n){return n!==t}))}))}})]})}))})]})]}),Object(z.jsx)($,{onDropFile:function(e){c(Object(F.a)(Object(F.a)({},n),{},{files:[].concat(Object(L.a)(n.files||[]),[e])}))}})]})},J=U.a.div(r||(r=Object(C.a)(["\n  height: ","px;\n"])),100),B=U.a.div(a||(a=Object(C.a)(["\n  color: ",";\n"])),(function(e){return e.error?"red":"black"})),G="https://versatileapi.herokuapp.com/api",H=function(){var e=Object(M.a)(N.a.mark((function e(t){var n,c,r;return N.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.files,c=t.bindTextId,r=function(){var e=Object(M.a)(N.a.mark((function e(t){var n,r,a;return N.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=new Promise((function(e){var n=new FileReader;n.onload=function(t){var n;e(null===(n=t.target)||void 0===n?void 0:n.result)},n.readAsDataURL(t)})),e.next=3,n;case 3:return(r=e.sent).length>1e5&&console.error("base64 size is ".concat(r.length)),a={base64:r,bind_text_id:c},e.next=8,fetch("".concat(G,"/image"),{method:"POST",headers:{Authorization:"evolution"},body:JSON.stringify(a)}).then((function(e){return e.json()})).then((function(e){return console.log(e)}));case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),e.next=4,Promise.all(Array.from(n).map(r));case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),W=function e(t){var n,c,r,a=t.text,i=t.userMap,o=t.onClose,u=Object(_.useState)(Number.MIN_SAFE_INTEGER),s=Object(D.a)(u,2),l=s[0],d=s[1],f=Object(_.useState)({open:!1}),b=Object(D.a)(f,2),j=b[0],O=b[1],p=Object(_.useContext)(je),x=p.composeValue,h=p.setComposeValue,v=Object(_.useContext)(Oe),m=v.imageMap,g=v.likeMap,y=Object(_.useContext)(pe),k=Object(_.useContext)(xe),w=Object(_.useMemo)((function(){var e=new Date,t=new Date(a._created_at),n=(e.getTime()-t.getTime())/1e3;return{timeDiff:n<60?"".concat(Math.floor(n),"\u79d2\u524d"):n/60<60?"".concat(Math.floor(n/60),"\u5206\u524d"):n/60/60<24?"".concat(Math.floor(n/60/60),"\u6642\u9593\u524d"):"".concat(Math.floor(n/60/60/24),"\u65e5\u524d"),time:a._created_at,localizedTime:t.toLocaleString("ja-JP")}}),[a,i,l]);Object(_.useEffect)((function(){setInterval((function(){return d((function(e){return e+1}))}),5e3)}),[]);var T=function(e){var t;return(null===(t=i[e])||void 0===t?void 0:t.name)||"\u533f\u540d(".concat(e.slice(0,2),")")},E=function(){var e=Object(M.a)(N.a.mark((function e(t){var n,c,r;return N.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.textId,e.next=3,fetch("".concat(G,"/like/").concat(n)).then((function(e){return e.json()})).catch((function(e){var t;404===(null===e||void 0===e||null===(t=e.response)||void 0===t?void 0:t.status)&&console.log("404")}));case 3:return c=e.sent,r={like_count:((null===c||void 0===c?void 0:c.like_count)||0)+1},e.next=7,fetch("".concat(G,"/like/").concat(n),{method:"PUT",headers:{Authorization:"LOVE"},body:JSON.stringify(r)}).then((function(e){return e.json()}));case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),S=function(){var e=Object(M.a)(N.a.mark((function e(t){return N.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.target.files){e.next=2;break}return e.abrupt("return");case 2:return e.next=4,H({files:t.target.files,bindTextId:a.id});case 4:y();case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),C=function(){var e=Object(M.a)(N.a.mark((function e(){return N.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(a.in_reply_to_text_id){e.next=2;break}return e.abrupt("return");case 2:if(!j.text){e.next=5;break}return O((function(e){return Object(F.a)(Object(F.a)({},e),{},{open:!0})})),e.abrupt("return");case 5:return e.next=7,fetch("".concat(G,"/text/").concat(a.in_reply_to_text_id)).then((function(e){return e.json()})).then((function(e){O({text:e,open:!0})}));case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(z.jsxs)(K,{children:[Object(z.jsxs)(X,{children:[Object(z.jsx)("div",{title:(null===(n=i[a._user_id])||void 0===n?void 0:n.description)||a._user_id,children:T(a._user_id)}),Object(z.jsxs)("div",{children:[Object(z.jsx)("time",{dateTime:w.time,title:w.localizedTime,children:w.timeDiff}),o?Object(z.jsx)(R.a,{className:"clickable ml1",icon:P.e,onClick:o}):null]})]}),Object(z.jsxs)("div",{children:[Object(z.jsx)(Q,{onClick:C,children:a.in_reply_to_text_id?"To: ".concat(a.in_reply_to_text_id," "):""}),Object(z.jsx)("div",{children:a.in_reply_to_user_id?"@".concat(T(a.in_reply_to_user_id)," "):""}),Object(z.jsx)(Y,{children:a.text})]}),(null===(c=m[a.id])||void 0===c?void 0:c.length)?m[a.id].map((function(e,t){return Object(z.jsx)("div",{children:Object(z.jsx)(Z,{className:"clickable",src:e.base64,alt:"".concat(T(a._user_id),"\u3055\u3093\u304c\u8cbc\u308a\u4ed8\u3051\u305f\u753b\u50cf"),title:"".concat(T(e._user_id),"\u3055\u3093\u304c\u8cbc\u308a\u4ed8\u3051\u305f\u753b\u50cf"),onClick:function(){return k({images:m[a.id].map((function(e){return e.base64})),index:t})}})})})):null,Object(z.jsxs)("div",{className:"flex mt1",children:[Object(z.jsx)(R.a,{className:"clickable",icon:P.d,title:"reply",onClick:function(){return e={textId:a.id,userId:a._user_id},void h(Object(F.a)(Object(F.a)({},x),{},{replyToTextId:e.textId,replyToUserId:e.userId}));var e}}),Object(z.jsx)(R.a,{className:"clickable ml2",icon:P.a,title:"favorite",onClick:function(){return E({textId:a.id})}}),(null===(r=g[a.id])||void 0===r?void 0:r.like_count)||0,Object(z.jsxs)("label",{htmlFor:"image_upload_".concat(a.id),children:[Object(z.jsx)(R.a,{className:"clickable ml2",icon:P.b,title:"images"}),Object(z.jsx)("input",{id:"image_upload_".concat(a.id),type:"file",accept:"image/*",multiple:!0,hidden:!0,onChange:S})]})]}),j.open&&j.text?Object(z.jsx)(ee,{x:o?0:8,y:16,children:Object(z.jsx)(e,{text:j.text,userMap:i,onClose:function(){return O((function(e){return Object(F.a)(Object(F.a)({},e),{},{open:!1})}))}})}):null]})},K=U.a.div(i||(i=Object(C.a)(["\n  border: 1px solid #ccc;\n  padding: 8px;\n"]))),X=U.a.div(o||(o=Object(C.a)(["\n  display: flex;\n  justify-content: space-between;\n"]))),Q=U.a.div(u||(u=Object(C.a)(["\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  overflow: hidden;\n"]))),Y=U.a.div(s||(s=Object(C.a)(["\n  word-wrap: break-word;\n  white-space: pre-wrap;\n  padding-top: 2px;\n"]))),Z=U.a.img(l||(l=Object(C.a)(["\n  width: 100%;\n"]))),ee=U.a.div(d||(d=Object(C.a)(["\n  margin-left: ","px;\n  margin-top: ","px;\n"])),(function(e){return e.x}),(function(e){return e.y})),te=function(e){var t=e.name,n=e.query,c=e.userMap,r=e.loadLogTrigger,a=Object(_.useState)([]),i=Object(D.a)(a,2),o=i[0],u=i[1],s=Object(_.useState)(20),l=Object(D.a)(s,2),d=l[0],f=l[1],b=Object(_.useState)(Number.MIN_SAFE_INTEGER),j=Object(D.a)(b,2),O=j[0],p=j[1];return Object(_.useEffect)((function(){setInterval((function(){return p((function(e){return e+1}))}),1e4)}),[]),Object(_.useEffect)((function(){fetch("".concat(G,"/text/all?").concat(n,"&$limit=").concat(d)).then((function(e){return e.json()})).then(u)}),[r,O,d]),Object(z.jsxs)(ne,{children:[Object(z.jsx)(ce,{children:t}),Object(z.jsxs)(re,{children:[o.map((function(e){return Object(z.jsx)(W,{text:e,userMap:c},e.id)})),Object(z.jsx)("div",{className:"clickable",onClick:function(){f((function(e){return e+20}))},children:"load more"})]})]})},ne=U.a.div(f||(f=Object(C.a)(["\n  width: 320px;\n"]))),ce=U.a.div(b||(b=Object(C.a)(["\n  height: ","px;\n"])),22),re=U.a.div(j||(j=Object(C.a)(["\n  height: calc(100vh - ","px);\n  overflow-y: auto;\n"])),122),ae=300,ie=200,oe=function(e){var t,n=e.open,c=e.onClose,r=e.images,a=e.index,i=Object(_.useState)(a),o=Object(D.a)(i,2),u=o[0],s=o[1],l=Object(_.useState)(),d=Object(D.a)(l,2),f=d[0],b=d[1],j=Object(_.useState)(),O=Object(D.a)(j,2),p=O[0],x=O[1],h=Object(_.useState)(0),v=Object(D.a)(h,2),m=v[0],g=v[1],y=Object(_.useRef)(null);Object(_.useEffect)((function(){s(a)}),[a]),Object(_.useEffect)((function(){"Escape"===p?c():"ArrowLeft"===p?s((function(e){return Math.max(e-1,0)})):"ArrowRight"===p&&s((function(e){return Math.min(e+1,r.length-1)}))}),[p,s]),Object(_.useEffect)((function(){document.addEventListener("keyup",(function(e){e.preventDefault(),x(e.key)}),!1)}),[]);var k=r[u];return Object(_.useEffect)((function(){y.current&&y.current.complete?b({width:y.current.naturalWidth,height:y.current.naturalHeight}):b(void 0)}),[k,null===(t=y.current)||void 0===t?void 0:t.complete]),Object(_.useEffect)((function(){document.getElementsByTagName("body")[0].style.overflow=n?"hidden":"initial",n&&g(window.pageXOffset)}),[n]),Object(z.jsx)(z.Fragment,{children:n?Object(z.jsxs)(ue,{left:m,children:[Object(z.jsx)(se,{onClick:function(){return c()}}),Object(z.jsxs)(le,{children:[Object(z.jsx)("img",Object(F.a)(Object(F.a)({ref:y,src:k},f),{},{alt:"\u753b\u50cf"})),r.length>0&&Object(z.jsx)(de,{children:Object(L.a)(Array(r.length)).map((function(e,t){return Object(z.jsx)(fe,{current:t===u},t)}))})]})]}):null})},ue=U.a.div(O||(O=Object(C.a)(["\n  position: absolute;\n  top: 0px;\n  z-index: 300;\n  width: 100vw;\n  display: flex;\n  justify-content: center;\n  height: 100vh;\n  align-items: center;\n  left: ","px;\n"])),(function(e){return e.left})),se=U.a.div(p||(p=Object(C.a)(["\n  position: absolute;\n  width: 100vw;\n  height: 100vh;\n  z-index: ",";\n  top: 0px;\n  background: gray;\n  opacity: 0.5;\n"])),ie),le=U.a.div(x||(x=Object(C.a)(["\n  z-index: ",";\n"])),ae),de=U.a.div(h||(h=Object(C.a)(["\n  display: flex;\n  justify-content: center;\n"]))),fe=U.a.div(v||(v=Object(C.a)(["\n  height: 30px;\n  width: 12px;\n  color: ",";\n  ::after {\n    content: '\u25cf';\n  }\n"])),(function(e){return e.current?"black":"#ccc"})),be={text:"",replyToTextId:"",replyToUserId:""},je=Object(_.createContext)({composeValue:be,setComposeValue:function(e){}}),Oe=Object(_.createContext)({imageMap:{},likeMap:{}}),pe=Object(_.createContext)((function(){})),xe=Object(_.createContext)((function(){})),he=[{name:"All",query:encodeURI("$filter=_user_id ne 'd9ecf9245defb6b07cb86fe92a6fde9e735fc9f9'&$orderby=_created_at desc")},{name:"To me",query:encodeURI("$filter=in_reply_to_user_id eq '57039384a74e1fed39b1663b460b7e7f51f99bee'&$orderby=_created_at desc")},{name:"Self",query:encodeURI("$filter=_user_id eq '57039384a74e1fed39b1663b460b7e7f51f99bee'&$orderby=_created_at desc")}],ve=function(){var e=Object(_.useState)([]),t=Object(D.a)(e,2),n=t[0],c=t[1],r=Object(_.useState)([]),a=Object(D.a)(r,2),i=a[0],o=a[1],u=Object(_.useState)([]),s=Object(D.a)(u,2),l=s[0],d=s[1],f=Object(_.useState)(be),b=Object(D.a)(f,2),j=b[0],O=b[1],p=Object(_.useState)(Number.MIN_SAFE_INTEGER),x=Object(D.a)(p,2),h=x[0],v=x[1],g=Object(_.useState)({images:[],index:0}),y=Object(D.a)(g,2),k=y[0],w=y[1],T=Object(_.useState)(!1),E=Object(D.a)(T,2),S=E[0],I=E[1],P=Object(_.useMemo)((function(){return n.reduce((function(e,t){return Object(F.a)(Object(F.a)({},e),{},Object(A.a)({},t.id,t))}),{})}),[n]),R=Object(_.useMemo)((function(){return i.reduce((function(e,t){return Object(F.a)(Object(F.a)({},e),{},Object(A.a)({},t.bind_text_id,[].concat(Object(L.a)(e[t.bind_text_id]||[]),[t])))}),{})}),[i]),U=Object(_.useMemo)((function(){return l.reduce((function(e,t){return Object(F.a)(Object(F.a)({},e),{},Object(A.a)({},t.id,t))}),{})}),[l]),$=function(){fetch("".concat(G,"/user/all")).then((function(e){return e.json()})).then(c)},q=function(){var e=Object(M.a)(N.a.mark((function e(){var t;return N.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=function(){var e=Object(M.a)(N.a.mark((function e(n){var c,r;return N.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat(G,"/image/all?$orderby=_created_at desc&$limit=").concat(n)).then((function(e){return e.json()}));case 2:if(c=e.sent,0!==i.length){e.next=6;break}return o(c),e.abrupt("return");case 6:if(-1===(r=c.findIndex((function(e){var t;return e.id===(null===(t=i[0])||void 0===t?void 0:t.id)})))){e.next=10;break}return o((function(e){return[].concat(Object(L.a)(c.slice(0,r)),Object(L.a)(e))})),e.abrupt("return");case 10:return e.next=12,t(n+100);case 12:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),e.next=3,t(20);case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),J=function(){fetch("".concat(G,"/like/all")).then((function(e){return e.json()})).then(d)},B=function(){var e=Object(M.a)(N.a.mark((function e(t){var n,c,r,a,i,o;return N.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.text,c=t.replyToUserId,r=t.replyToTextId,a=t.files,i=Object(F.a)(Object(F.a)({text:n},c?{in_reply_to_user_id:c}:{}),r?{in_reply_to_text_id:r}:{}),e.next=4,fetch("".concat(G,"/text"),{method:"POST",headers:{Authorization:"HelloWorld"},body:JSON.stringify(i).replaceAll("'",String.raw(m||(m=Object(C.a)(["'"],["\\'"]))))}).then((function(e){return e.json()}));case 4:if(o=e.sent,e.t0=a,!e.t0){e.next=9;break}return e.next=9,H({files:a,bindTextId:o.id});case 9:q(),v((function(e){return e+1}));case 11:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(_.useEffect)((function(){$(),setInterval($,6e5),q(),setInterval(q,1e4),J(),setInterval(J,6e4)}),[]),Object(_.useEffect)((function(){k.images.length&&I(!0)}),[k]),Object(z.jsxs)(me,{children:[Object(z.jsx)(V,{value:j,onChange:O,onSubmit:B,userList:n}),Object(z.jsx)(xe.Provider,{value:w,children:Object(z.jsx)(pe.Provider,{value:q,children:Object(z.jsx)(Oe.Provider,{value:{imageMap:R,likeMap:U},children:Object(z.jsx)(je.Provider,{value:{composeValue:j,setComposeValue:O},children:Object(z.jsx)("div",{className:"flex",children:he.map((function(e){return Object(z.jsx)(te,{name:e.name,query:e.query,userMap:P,loadLogTrigger:h},e.name)}))})})})})}),Object(z.jsx)(oe,{open:S,onClose:function(){return I(!1)},images:k.images,index:k.index})]})},me=U.a.div(g||(g=Object(C.a)(["\n  ::-webkit-scrollbar {\n    display:none;\n  }\n"])));w.a.render(Object(z.jsx)(y.a.StrictMode,{children:Object(z.jsx)(T.a,{children:Object(z.jsx)(E.c,{children:Object(z.jsx)(E.a,{exact:!0,path:"/",children:Object(z.jsx)(ve,{})})})})}),document.getElementById("root")),S()}},[[49,1,2]]]);
//# sourceMappingURL=main.b835f273.chunk.js.map