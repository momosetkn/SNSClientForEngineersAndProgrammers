(this.webpackJsonpSNSClientForEngineersAndProgrammers=this.webpackJsonpSNSClientForEngineersAndProgrammers||[]).push([[0],{27:function(e,t,n){},50:function(e,t,n){"use strict";n.r(t);var r,c,a,i,o,s,u,l,d,b,j,f,p,O,x,h,m,v,g,y,_,k,w,S,C,T,E,I,N,L=n(0),F=n.n(L),M=n(32),A=n.n(M),P=(n(27),n(37)),z=n(8),D=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,51)).then((function(t){var n=t.getCLS,r=t.getFID,c=t.getFCP,a=t.getLCP,i=t.getTTFB;n(e),r(e),c(e),a(e),i(e)}))},U=n(4),q=n(33),J=n(7),R=n.n(J),$=n(9),H=n(15),B=n(14),V=n(2),G=n(3),W=n(17),K=n(16),X=n(5),Q=n(1),Y=function(e){var t=e.onDropFile,n=Object(L.useState)(!1),r=Object(G.a)(n,2),c=r[0],a=r[1],i=Object(L.useState)(),o=Object(G.a)(i,2),s=o[0],u=o[1];return Object(L.useEffect)((function(){s&&(t(s),u(void 0))}),[s,t]),Object(L.useEffect)((function(){document.addEventListener("drop",(function(e){if(a(!1),e.preventDefault(),e.dataTransfer.items){for(var t=0;t<e.dataTransfer.items.length;t++)if("file"===e.dataTransfer.items[t].kind){var n=e.dataTransfer.items[t].getAsFile();u(n)}}else for(var r=0;r<e.dataTransfer.files.length;r++)console.log("... file["+r+"].name = "+e.dataTransfer.files[r].name)})),document.addEventListener("dragenter",(function(e){e.preventDefault(),a(!0)})),document.addEventListener("dragover",(function(e){return e.preventDefault()})),document.addEventListener("dragleave",(function(e){e.preventDefault(),console.log("leave",e),e.fromElement||a(!1)}))}),[]),Object(Q.jsx)(Z,{enabled:c})},Z=X.a.div(r||(r=Object(U.a)(["\n  position: absolute;\n  width: calc(100vw - ","px);\n  height: calc(100vh - ","px);\n  top: 0px;\n  margin: ","px;\n  border-radius: 32px;\n  background: gray;\n  border: ","px dashed black;\n  opacity: 0.5;\n  display:   ",";\n"])),40,40,16,4,(function(e){return e.enabled?"block":"none"})),ee=300,te=200,ne=250,re=500,ce="SNSClientForEngineersAndProgrammers",ae={myUser:"".concat(ce,"_myUser"),pains:"".concat(ce,"_pains")},ie="#ccc",oe="#fff",se="#555",ue="https://versatileapi.herokuapp.com/api",le=1e5,de=function(){var e=Object($.a)(R.a.mark((function e(t){var n,r,c;return R.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.base64s,r=t.bindTextId,c=function(){var e=Object($.a)(R.a.mark((function e(t){var n;return R.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(t.length>le)){e.next=2;break}throw new Error;case 2:return n={base64:t,bind_text_id:r},e.next=5,fetch("".concat(ue,"/image"),{method:"POST",headers:{Authorization:"evolution"},body:JSON.stringify(n)}).then((function(e){return e.json()})).then((function(e){return console.log(e)}));case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),e.next=4,Promise.all(Array.from(n).map(c));case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),be=function(e){return e.ok?e.json():e.text()},je=function(e){var t=e.open,n=e.onClose,r=Object(L.useState)({name:"",description:""}),c=Object(G.a)(r,2),a=c[0],i=c[1],o=Object(L.useContext)(Qe).userMap,s=function(){var e=Object($.a)(R.a.mark((function e(t){return R.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat(ue,"/user/create_user"),{method:"POST",headers:{Authorization:"HelloWorld"},body:JSON.stringify(t)}).then(be);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(L.useEffect)((function(){Object($.a)(R.a.mark((function e(){var t,n,r,c;return R.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(Object.entries(o).length){e.next=2;break}return e.abrupt("return");case 2:if(!a.name&&!a.description){e.next=4;break}return e.abrupt("return");case 4:return e.next=6,s({name:"",description:""});case 6:return t=e.sent,e.next=9,fetch("".concat(ue,"/user/").concat(t.id),{headers:{Authorization:"HelloWorld"}}).then(be);case 9:if(n=e.sent,r=o[n._user_id]){e.next=13;break}return e.abrupt("return");case 13:return c={name:r.name,description:r.description},i(c),e.next=17,s(c);case 17:case"end":return e.stop()}}),e)})))()}),[o]),Object(L.useEffect)((function(){document.addEventListener("keyup",(function(e){e.preventDefault(),"Escape"===e.key&&n()}),!1);var e=localStorage.getItem(ae.myUser);e&&i(JSON.parse(e))}),[]),Object(L.useEffect)((function(){a.name&&a.description&&localStorage.setItem(ae.myUser,JSON.stringify(a))}),[a]),Object(Q.jsx)(Q.Fragment,{children:t?Object(Q.jsxs)(fe,{enabled:t,children:[Object(Q.jsx)(pe,{}),Object(Q.jsxs)(Oe,{children:[Object(Q.jsxs)(xe,{children:[Object(Q.jsx)("div",{children:"Settings"}),Object(Q.jsx)(K.a,{className:"clickable ml1",icon:W.f,onClick:function(){s(a),n()}})]}),Object(Q.jsxs)(he,{children:[Object(Q.jsxs)("div",{children:[Object(Q.jsx)("label",{htmlFor:"SettingsOverlay_name",children:"name"}),Object(Q.jsx)("input",{name:"name",id:"SettingsOverlay_name",type:"text",value:a.name,onChange:function(e){i((function(t){return Object(V.a)(Object(V.a)({},t),{},{name:e.target.value})}))}})]}),Object(Q.jsxs)("div",{children:[Object(Q.jsx)("label",{htmlFor:"SettingsOverlay_description",children:"description"}),Object(Q.jsx)("textarea",{name:"description",id:"SettingsOverlay_description",cols:30,rows:5,value:a.description,onChange:function(e){i((function(t){return Object(V.a)(Object(V.a)({},t),{},{description:e.target.value})}))}})]})]})]})]}):null})},fe=X.a.div(c||(c=Object(U.a)(["\n  position: absolute;\n  top: 0px;\n  z-index: 300;\n  width: 100vw;\n  display: flex;\n  justify-content: center;\n  height: 100vh;\n  align-items: center;\n"]))),pe=X.a.div(a||(a=Object(U.a)(["\n  position: absolute;\n  width: 100vw;\n  height: 100vh;\n  z-index: ",";\n  top: 0px;\n  background: gray;\n  opacity: 0.5;\n"])),te),Oe=X.a.div(i||(i=Object(U.a)(["\n  z-index: ",";\n  background: ",";\n  padding: 16px;\n  border-radius: 8px;\n"])),ne,oe),xe=X.a.div(o||(o=Object(U.a)(["\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 16px;\n"]))),he=X.a.div(s||(s=Object(U.a)(["\n  & label {\n    display: block;\n    margin-top: 8px;\n  }\n"]))),me=function(){var e=Object($.a)(R.a.mark((function e(t){var n,r;return R.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=new Promise((function(e){var n=new FileReader;n.onload=function(t){var n;e(null===(n=t.target)||void 0===n?void 0:n.result)},n.readAsDataURL(t)})),e.next=3,n;case 3:if(!((r=e.sent).length>le)){e.next=7;break}return console.error("base64 size is ".concat(r.length)),e.abrupt("return",null);case 7:return e.abrupt("return",r);case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),ve=function e(t,n){if(Object.is(t,n))return!0;if("object"!==typeof t)return!1;if("object"!==typeof n)return!1;var r=Object.entries(t),c=Object.entries(n);return r.length===c.length&&r.every((function(t){var r=Object(G.a)(t,2),c=r[0],a=r[1];return e(a,n[c])}))},ge=function(e){var t,n=e.value,r=e.onChange,c=e.onSubmit,a=e.userList,i=Object(L.useState)("waiting"),o=Object(G.a)(i,2),s=o[0],u=o[1],l=Object(L.useState)(!1),d=Object(G.a)(l,2),b=d[0],j=d[1],f=Object(L.useContext)(Qe).setNotificationContent,p=Object(L.useRef)(null),O=Object(L.useCallback)((function(e){e.ctrlKey&&"Enter"===e.key&&"waiting"===s&&u("send")}),[]),x=function(){var e=Object($.a)(R.a.mark((function e(t){return R.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,me(t);case 2:if(e.sent){e.next=7;break}return console.error("\u753b\u50cf\u304c\u5927\u304d\u3059\u304e\u307e\u3059"),f({text:"\u753b\u50cf\u304c\u5927\u304d\u3059\u304e\u307e\u3059",type:"error"}),e.abrupt("return");case 7:r(Object(V.a)(Object(V.a)({},n),{},{files:[].concat(Object(H.a)(n.files||[]),[t])}));case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();Object(L.useEffect)((function(){Object($.a)(R.a.mark((function e(){return R.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if("send"!==s||!n.text.trim()){e.next=15;break}return u("sending"),e.prev=2,e.next=5,c(n);case 5:r(Ke),e.next=12;break;case 8:e.prev=8,e.t0=e.catch(2),f({text:"\u30a8\u30e9\u30fc\u767a\u751f"}),console.error(e.t0);case 12:return e.prev=12,u("waiting"),e.finish(12);case 15:case"end":return e.stop()}}),e,null,[[2,8,12,15]])})))()}),[s,n,r,c,f]),Object(L.useEffect)((function(){p.current&&(p.current.removeEventListener("keyup",O,!1),p.current.addEventListener("keyup",O,!1))}),[p.current]);var h=function(e){r(Object(V.a)(Object(V.a)({},n),{},Object(B.a)({},e.target.name,e.target.value)))},m="waiting"!==s;return Object(Q.jsxs)(ye,{children:[Object(Q.jsxs)(_e,{children:[Object(Q.jsxs)("div",{className:"flex",children:[Object(Q.jsx)("input",{type:"text",name:"replyToTextId",placeholder:"\u30c4\u30a4\u30fc\u30c8\u3078\u306e\u8fd4\u4fe1",value:n.replyToTextId,onChange:h,disabled:m}),Object(Q.jsxs)("select",{name:"replyToUserId",value:n.replyToUserId,onChange:h,disabled:m,children:[Object(Q.jsx)("option",{value:"",children:"-"}),a.map((function(e){return Object(Q.jsx)("option",{value:e.id,children:e.name||"\u533f\u540d(".concat(e._user_id.slice(0,2),")")},e.id)}))]}),Object(Q.jsx)(ke,{error:n.text.trim().length>280,children:"".concat(n.text.trim().length,"/280")})]}),Object(Q.jsxs)("div",{className:"flex",children:[Object(Q.jsx)("textarea",{name:"text",ref:p,placeholder:"\u4eca\u306a\u306b\u3057\u3066\u308b\uff1f",rows:4,cols:50,value:n.text,onChange:function(e){return r(Object(V.a)(Object(V.a)({},n),{},{text:e.target.value}))},disabled:m}),Object(Q.jsx)(K.a,{className:m?"":"clickable",icon:W.d,title:"post",onClick:function(e){e.preventDefault(),!m&&u("send")}}),Object(Q.jsx)("div",{children:null===(t=n.files)||void 0===t?void 0:t.map((function(e,t){return Object(Q.jsxs)("div",{children:["".concat(e.name,"(").concat(Math.floor(e.size/1024),"kb)"),Object(Q.jsx)(K.a,{className:"clickable ml1",icon:W.f,onClick:function(){var e;return r(Object(V.a)(Object(V.a)({},n),{},{files:null===(e=n.files)||void 0===e?void 0:e.filter((function(e,n){return n!==t}))}))}})]})}))})]})]}),Object(Q.jsx)(K.a,{className:"clickable ml1",icon:W.a,onClick:function(){return j(!0)}}),Object(Q.jsx)(je,{open:b,onClose:function(){return j(!1)}}),Object(Q.jsx)(Y,{onDropFile:x})]})},ye=X.a.div(u||(u=Object(U.a)(["\n  height: ","px;\n  display: flex;\n"])),100),_e=X.a.form(l||(l=Object(U.a)(["\n  width: 500px;\n"]))),ke=X.a.div(d||(d=Object(U.a)(["\n  color: ",";\n"])),(function(e){return e.error?"red":"black"})),we=function e(t){var n,r,c=t.text,a=t.onClose,i=Object(L.useState)(Number.MIN_SAFE_INTEGER),o=Object(G.a)(i,2),s=o[0],u=o[1],l=Object(L.useState)({open:!1}),d=Object(G.a)(l,2),b=d[0],j=d[1],f=Object(L.useState)(0),p=Object(G.a)(f,2),O=p[0],x=p[1],h=Object(L.useContext)(Xe),m=h.composeValue,v=h.setComposeValue,g=Object(L.useContext)(Qe),y=g.imageMap,_=g.likeMap,k=g.userMap,w=g.setNotificationContent,S=Object(L.useContext)(Ye),C=Object(L.useContext)(Ze),T=Object(L.useMemo)((function(){var e=new Date,t=new Date(c._created_at),n=(e.getTime()-t.getTime())/1e3;return{timeDiff:n<60?"".concat(Math.floor(n),"\u79d2\u524d"):n/60<60?"".concat(Math.floor(n/60),"\u5206\u524d"):n/60/60<24?"".concat(Math.floor(n/60/60),"\u6642\u9593\u524d"):"".concat(Math.floor(n/60/60/24),"\u65e5\u524d"),time:c._created_at,localizedTime:t.toLocaleString("ja-JP")}}),[c,k,s]);Object(L.useEffect)((function(){setInterval((function(){return u((function(e){return e+1}))}),5e3)}),[]),Object(L.useEffect)((function(){var e;x((null===(e=_[c.id])||void 0===e?void 0:e.like_count)||0)}),[_,c.id]);var E=function(e){var t;return(null===(t=k[e])||void 0===t?void 0:t.name)||"\u533f\u540d(".concat(e.slice(0,2),")")},I=function(){var e=Object($.a)(R.a.mark((function e(t){var n,r,c,a;return R.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.textId,e.next=3,fetch("".concat(ue,"/like/").concat(n)).then(be).catch((function(e){var t;if(404!==(null===e||void 0===e||null===(t=e.response)||void 0===t?void 0:t.status))throw e}));case 3:return r=e.sent,c=((null===r||void 0===r?void 0:r.like_count)||0)+1,a={like_count:c},e.next=8,fetch("".concat(ue,"/like/").concat(n),{method:"PUT",headers:{Authorization:"LOVE"},body:JSON.stringify(a)}).then((function(e){return e.json()})).then((function(e){x(c)}));case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),N=function(){var e=Object($.a)(R.a.mark((function e(t){var n,r,a,i;return R.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.target.files){e.next=2;break}return e.abrupt("return");case 2:n=0,r=Array.from(t.target.files);case 3:if(!(n<r.length)){e.next=17;break}return a=r[n],e.next=7,me(a);case 7:if(i=e.sent){e.next=12;break}return console.error("\u753b\u50cf\u304c\u5927\u304d\u3059\u304e\u307e\u3059"),w({text:"\u753b\u50cf\u304c\u5927\u304d\u3059\u304e\u307e\u3059",type:"error"}),e.abrupt("continue",14);case 12:return e.next=14,de({base64s:[i],bindTextId:c.id});case 14:n++,e.next=3;break;case 17:S();case 18:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),F=function(){var e=Object($.a)(R.a.mark((function e(){return R.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(c.in_reply_to_text_id){e.next=2;break}return e.abrupt("return");case 2:if(!b.text){e.next=5;break}return j((function(e){return Object(V.a)(Object(V.a)({},e),{},{open:!0})})),e.abrupt("return");case 5:return e.next=7,fetch("".concat(ue,"/text/").concat(c.in_reply_to_text_id)).then((function(e){return e.json()})).then((function(e){j({text:e,open:!0})}));case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(Q.jsxs)(Se,{child:!!a,children:[Object(Q.jsxs)(Ce,{children:[Object(Q.jsx)("div",{title:(null===(n=k[c._user_id])||void 0===n?void 0:n.description)||c._user_id,children:E(c._user_id)}),Object(Q.jsxs)("div",{children:[Object(Q.jsx)("time",{dateTime:T.time,title:T.localizedTime,children:T.timeDiff}),a?Object(Q.jsx)(K.a,{className:"clickable ml1",icon:W.f,onClick:a}):null]})]}),Object(Q.jsxs)("div",{children:[Object(Q.jsx)(Te,{onClick:F,children:c.in_reply_to_text_id?"To: ".concat(c.in_reply_to_text_id," "):""}),Object(Q.jsx)("div",{children:c.in_reply_to_user_id?"@".concat(E(c.in_reply_to_user_id)," "):""}),Object(Q.jsx)(Ee,{children:c.text})]}),(null===(r=y[c.id])||void 0===r?void 0:r.length)?y[c.id].map((function(e,t){return Object(Q.jsx)("div",{children:Object(Q.jsx)(Ne,{className:"clickable",src:e.base64,alt:"".concat(E(c._user_id),"\u3055\u3093\u304c\u8cbc\u308a\u4ed8\u3051\u305f\u753b\u50cf"),title:"".concat(E(e._user_id),"\u3055\u3093\u304c\u8cbc\u308a\u4ed8\u3051\u305f\u753b\u50cf"),onClick:function(){return C({images:y[c.id].map((function(e){return e.base64})),index:t})}})},e.id)})):null,Object(Q.jsxs)(Ie,{children:[Object(Q.jsx)(K.a,{className:"clickable",icon:W.e,title:"Reply",onClick:function(){return e={textId:c.id,userId:c._user_id},void v(Object(V.a)(Object(V.a)({},m),{},{replyToTextId:e.textId,replyToUserId:e.userId}));var e}}),Object(Q.jsxs)("div",{className:"clickable ml2",onClick:function(){return I({textId:c.id})},children:[Object(Q.jsx)(K.a,{icon:W.b,title:"Like"}),Object(Q.jsx)("span",{children:O})]}),Object(Q.jsxs)("label",{htmlFor:"image_upload_".concat(c.id),children:[Object(Q.jsx)(K.a,{className:"clickable ml2",icon:W.c,title:"Images"}),Object(Q.jsx)("input",{id:"image_upload_".concat(c.id),type:"file",accept:"image/*",multiple:!0,hidden:!0,onChange:N})]})]}),b.open&&b.text?Object(Q.jsx)(Le,{x:a?0:8,y:16,children:Object(Q.jsx)(e,{text:b.text,onClose:function(){return j((function(e){return Object(V.a)(Object(V.a)({},e),{},{open:!1})}))}})}):null]})},Se=X.a.div(b||(b=Object(U.a)(["\n  ","\n  padding: 8px;\n"])),(function(e){return e.child?"border-top: 1px solid ".concat(ie,";"):"border-bottom: 1px solid ".concat(ie,";")})),Ce=X.a.div(j||(j=Object(U.a)(["\n  display: flex;\n  justify-content: space-between;\n"]))),Te=X.a.div(f||(f=Object(U.a)(["\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  overflow: hidden;\n"]))),Ee=X.a.div(p||(p=Object(U.a)(["\n  word-wrap: break-word;\n  white-space: pre-wrap;\n  padding-top: 2px;\n"]))),Ie=X.a.div(O||(O=Object(U.a)(["\n  display: flex;\n  margin-top: 8px;\n  color: ",";\n"])),se),Ne=X.a.img(x||(x=Object(U.a)(["\n  width: 100%;\n"]))),Le=X.a.div(h||(h=Object(U.a)(["\n  margin-left: ","px;\n  margin-top: ","px;\n"])),(function(e){return e.x}),(function(e){return e.y})),Fe=function(e){var t=e.value,n=e.onChangePain,r=e.loadLogTrigger,c=Object(L.useState)([]),a=Object(G.a)(c,2),i=a[0],o=a[1],s=Object(L.useState)(t),u=Object(G.a)(s,2),l=u[0],d=u[1],b=Object(L.useState)(Number.MIN_SAFE_INTEGER),j=Object(G.a)(b,2),f=j[0],p=j[1],O=Object(L.useState)(!1),x=Object(G.a)(O,2),h=x[0],m=x[1],v=22+(h?300:0),g=function(){return p((function(e){return e+1}))},y=function(e){d((function(t){return Object(V.a)(Object(V.a)({},t),{},Object(B.a)({},e.target.name,e.target.value))}))},_=function(e){d((function(t){return Object(V.a)(Object(V.a)({},t),{},Object(B.a)({},e.target.name,parseInt(e.target.value)))}))};return Object(L.useEffect)((function(){var e=setInterval((function(){return p((function(e){return e+1}))}),1e3*(l.pollingIntervalTime||1));return function(){return clearInterval(e)}}),[l.pollingIntervalTime]),Object(L.useEffect)((function(){fetch("".concat(ue,"/text/all?").concat(encodeURI(l.query),"&$limit=").concat(l.limit)).then(be).then(o).catch(console.error)}),[r,f]),Object(L.useEffect)((function(){return d(t)}),[t]),Object(Q.jsxs)(Me,{children:[Object(Q.jsxs)(Ae,{titleHeight:v,children:[Object(Q.jsx)(Pe,{className:"clickable",onClick:function(){m((function(e){return!e})),ve(l,t)||n(l)},children:t.name}),Object(Q.jsxs)(ze,{className:"p2",children:[Object(Q.jsxs)("div",{children:[Object(Q.jsx)("label",{htmlFor:"".concat(t.name,"_Logs_name"),children:"name"}),Object(Q.jsx)("input",{name:"name",id:"".concat(t.name,"_Logs_name"),type:"text",value:l.name,onChange:y,onBlur:g})]}),Object(Q.jsxs)("div",{children:[Object(Q.jsx)("label",{htmlFor:"".concat(t.name,"_Logs_query"),children:"query"}),Object(Q.jsx)("textarea",{name:"query",id:"".concat(t.name,"_Logs_query"),cols:30,rows:5,value:l.query,onChange:y,onBlur:g})]}),Object(Q.jsxs)("div",{children:[Object(Q.jsx)("label",{htmlFor:"".concat(t.name,"_Logs_limit"),children:"limit"}),Object(Q.jsx)("input",{name:"limit",id:"".concat(t.name,"_Logs_limit"),type:"number",value:l.limit,onChange:_,onBlur:g})]}),Object(Q.jsxs)("div",{children:[Object(Q.jsx)("label",{htmlFor:"".concat(t.name,"_Logs_pollingIntervalTime"),children:"polling interval time"}),Object(Q.jsx)("input",{name:"pollingIntervalTime",id:"".concat(t.name,"_Logs_pollingIntervalTime"),type:"number",value:l.pollingIntervalTime,onChange:_,onBlur:g})]})]})]}),Object(Q.jsxs)(De,{titleHeight:v,children:[i.map((function(e){return Object(Q.jsx)(we,{text:e},e.id)})),Object(Q.jsx)("div",{className:"clickable",onClick:function(){n(Object(V.a)(Object(V.a)({},t),{},{limit:t.limit+20}))},children:"load more"})]})]})},Me=X.a.div(m||(m=Object(U.a)(["\n  width: 320px;\n  margin: ","px 0 ","px ","px;\n  border: 1px solid ",";\n"])),8,8,8,ie),Ae=X.a.div(v||(v=Object(U.a)(["\n  height: ","px;\n  overflow: hidden;\n  transition: all 300ms 0s ease;\n  border-bottom: 1px solid ",";\n"])),(function(e){return e.titleHeight}),ie),Pe=X.a.div(g||(g=Object(U.a)(["\n  height: ","px;\n"])),22),ze=X.a.div(y||(y=Object(U.a)(["\n  & label {\n    display: block;\n    margin-top: 8px;\n  }\n"]))),De=X.a.div(_||(_=Object(U.a)(["\n  // margin\u4e0a\u4e0b\u3068border1px\u4e0a\u4e0b\n  height: calc(100vh - ","px);\n  overflow-y: auto;\n  ::-webkit-scrollbar{\n    width: 8px;\n  }\n  ::-webkit-scrollbar-track{\n    background: ",";\n    border: none;\n    // box-shadow: inset 0 0 2px #777; \n  }\n  ::-webkit-scrollbar-thumb{\n    background: ",";\n    box-shadow: none;\n  }\n"])),(function(e){return 100+e.titleHeight+18}),oe,ie),Ue=function(e){var t,n=e.open,r=e.onClose,c=e.images,a=e.index,i=Object(L.useState)(a),o=Object(G.a)(i,2),s=o[0],u=o[1],l=Object(L.useState)(),d=Object(G.a)(l,2),b=d[0],j=d[1],f=Object(L.useState)(),p=Object(G.a)(f,2),O=p[0],x=p[1],h=Object(L.useState)(0),m=Object(G.a)(h,2),v=m[0],g=m[1],y=Object(L.useRef)(null);Object(L.useEffect)((function(){u(a)}),[a]),Object(L.useEffect)((function(){"Escape"===O?r():"ArrowLeft"===O?u((function(e){return Math.max(e-1,0)})):"ArrowRight"===O&&u((function(e){return Math.min(e+1,c.length-1)}))}),[O,u]),Object(L.useEffect)((function(){document.addEventListener("keyup",(function(e){e.preventDefault(),x(e.key)}),!1)}),[]);var _=c[s];return Object(L.useEffect)((function(){y.current&&y.current.complete?j({width:y.current.naturalWidth,height:y.current.naturalHeight}):j(void 0)}),[_,null===(t=y.current)||void 0===t?void 0:t.complete]),Object(L.useEffect)((function(){document.getElementsByTagName("body")[0].style.overflow=n?"hidden":"initial",n&&g(window.pageXOffset)}),[n]),Object(Q.jsx)(Q.Fragment,{children:n?Object(Q.jsxs)(qe,{left:v,children:[Object(Q.jsx)(Je,{onClick:function(){return r()}}),Object(Q.jsxs)(Re,{children:[Object(Q.jsx)("img",Object(V.a)(Object(V.a)({ref:y,src:_},b),{},{alt:"\u753b\u50cf"})),c.length>0&&Object(Q.jsx)($e,{children:Object(H.a)(Array(c.length)).map((function(e,t){return Object(Q.jsx)(He,{current:t===s},t)}))})]})]}):null})},qe=X.a.div(k||(k=Object(U.a)(["\n  position: absolute;\n  top: 0px;\n  z-index: 300;\n  width: 100vw;\n  display: flex;\n  justify-content: center;\n  height: 100vh;\n  align-items: center;\n  left: ","px;\n"])),(function(e){return e.left})),Je=X.a.div(w||(w=Object(U.a)(["\n  position: absolute;\n  width: 100vw;\n  height: 100vh;\n  z-index: ",";\n  top: 0px;\n  background: gray;\n  opacity: 0.5;\n"])),te),Re=X.a.div(S||(S=Object(U.a)(["\n  z-index: ",";\n"])),ee),$e=X.a.div(C||(C=Object(U.a)(["\n  display: flex;\n  justify-content: center;\n"]))),He=X.a.div(T||(T=Object(U.a)(["\n  height: 30px;\n  width: 12px;\n  color: ",";\n  ::after {\n    content: '\u25cf';\n  }\n"])),(function(e){return e.current?"black":"#ccc"})),Be={notification:"black",warning:"FFA500",error:"red"},Ve=function(e){var t=e.content,n=Object(L.useState)([]),r=Object(G.a)(n,2),c=r[0],a=r[1],i=Object(L.useState)(Number.MIN_SAFE_INTEGER),o=Object(G.a)(i,2),s=o[0],u=o[1];return Object(L.useEffect)((function(){if(t){var e=s.toString();a((function(n){return[].concat(Object(H.a)(n),[Object(V.a)(Object(V.a)({},{content:t}),{},{id:e})])})),setTimeout((function(){a((function(t){return t.filter((function(t){return t.id!==e}))}))}),5e4),u((function(e){return e+1}))}}),[t]),Object(Q.jsx)(Ge,{children:c.map((function(e,t){var n;return Object(Q.jsx)(We,{type:null===(n=e.content)||void 0===n?void 0:n.type,children:e.content.text},e.id)}))})},Ge=X.a.div(E||(E=Object(U.a)(["\n  position: absolute;\n  bottom: 50px;\n  left: 40px;\n"]))),We=X.a.div(I||(I=Object(U.a)(["\n  z-index: ",";\n  background: ",";\n  color: white;\n  border-radius: 10px;\n  margin-top: 16px;\n  padding: 8px 16px;\n  color: white;\n"])),re,(function(e){return t=e.type,Be[t||"notification"];var t})),Ke={text:"",replyToTextId:"",replyToUserId:""},Xe=Object(L.createContext)({composeValue:Ke,setComposeValue:function(e){}}),Qe=Object(L.createContext)({imageMap:{},likeMap:{},userMap:{},setNotificationContent:function(e){}}),Ye=Object(L.createContext)((function(){})),Ze=Object(L.createContext)((function(){})),et=[{name:"All",query:"$filter=_user_id ne 'd9ecf9245defb6b07cb86fe92a6fde9e735fc9f9'&$orderby=_created_at desc",limit:20,pollingIntervalTime:20},{name:"To me",query:"$filter=in_reply_to_user_id eq '57039384a74e1fed39b1663b460b7e7f51f99bee'&$orderby=_created_at desc",limit:20,pollingIntervalTime:20},{name:"Self",query:"$filter=_user_id eq '57039384a74e1fed39b1663b460b7e7f51f99bee'&$orderby=_created_at desc",limit:20,pollingIntervalTime:20}],tt=function(){var e=Object(L.useState)([]),t=Object(G.a)(e,2),n=t[0],r=t[1],c=Object(L.useState)([]),a=Object(G.a)(c,2),i=a[0],o=a[1],s=Object(L.useState)([]),u=Object(G.a)(s,2),l=u[0],d=u[1],b=Object(L.useState)(Ke),j=Object(G.a)(b,2),f=j[0],p=j[1],O=Object(L.useState)(Number.MIN_SAFE_INTEGER),x=Object(G.a)(O,2),h=x[0],m=x[1],v=Object(L.useState)({images:[],index:0}),g=Object(G.a)(v,2),y=g[0],_=g[1],k=Object(L.useState)(!1),w=Object(G.a)(k,2),S=w[0],C=w[1],T=Object(L.useState)(),E=Object(G.a)(T,2),I=E[0],N=E[1],F=Object(L.useState)([]),M=Object(G.a)(F,2),A=M[0],P=M[1],z=Object(L.useMemo)((function(){return n.reduce((function(e,t){return Object(V.a)(Object(V.a)({},e),{},Object(B.a)({},t._user_id,e[t._user_id]||t))}),{})}),[n]),D=Object(L.useMemo)((function(){return i.reduce((function(e,t){return Object(V.a)(Object(V.a)({},e),{},Object(B.a)({},t.bind_text_id,[].concat(Object(H.a)(e[t.bind_text_id]||[]),[t])))}),{})}),[i]),U=Object(L.useMemo)((function(){return l.reduce((function(e,t){return Object(V.a)(Object(V.a)({},e),{},Object(B.a)({},t.id,t))}),{})}),[l]),J=function(){fetch("".concat(ue,"/user/all?$orderby=_created_at desc")).then(be).then(r)},W=function(){var e=Object($.a)(R.a.mark((function e(){var t;return R.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=function(){var e=Object($.a)(R.a.mark((function e(n){var r,c;return R.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat(ue,"/image/all?$orderby=_created_at desc&$limit=").concat(n)).then(be);case 2:if(r=e.sent,0!==i.length){e.next=6;break}return o(r),e.abrupt("return");case 6:if(-1===(c=r.findIndex((function(e){var t;return e.id===(null===(t=i[0])||void 0===t?void 0:t.id)})))){e.next=10;break}return o((function(e){return[].concat(Object(H.a)(r.slice(0,c)),Object(H.a)(e))})),e.abrupt("return");case 10:return e.next=12,t(n+100);case 12:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),e.next=3,t(20);case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),K=function(){fetch("".concat(ue,"/like/all")).then(be).then(d)},X=function(){var e=Object($.a)(R.a.mark((function e(t){var n,r,c,a,i,o,s,u,l,d;return R.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.text,r=t.replyToUserId,c=t.replyToTextId,a=t.files,i=Object(V.a)(Object(V.a)({text:n},r?{in_reply_to_user_id:r}:{}),c?{in_reply_to_text_id:c}:{}),e.next=4,fetch("".concat(ue,"/text"),{method:"POST",headers:{Authorization:"HelloWorld"},body:JSON.stringify(i)}).then(be);case 4:if(o=e.sent,!a){e.next=32;break}s=Object(q.a)(a),e.prev=7,s.s();case 9:if((u=s.n()).done){e.next=22;break}return l=u.value,e.next=13,me(l);case 13:if(d=e.sent){e.next=18;break}return console.error("\u753b\u50cf\u304c\u5927\u304d\u3059\u304e\u307e\u3059"),N({text:"\u753b\u50cf\u304c\u5927\u304d\u3059\u304e\u307e\u3059",type:"error"}),e.abrupt("continue",20);case 18:return e.next=20,de({base64s:[d],bindTextId:o.id});case 20:e.next=9;break;case 22:e.next=27;break;case 24:e.prev=24,e.t0=e.catch(7),s.e(e.t0);case 27:return e.prev=27,s.f(),e.finish(27);case 30:return e.next=32,W();case 32:m((function(e){return e+1}));case 33:case"end":return e.stop()}}),e,null,[[7,24,27,30]])})));return function(t){return e.apply(this,arguments)}}();return Object(L.useEffect)((function(){J(),setInterval(J,6e5),W(),setInterval(W,1e4),K(),setInterval(K,6e4);var e=localStorage.getItem(ae.pains);P(e?JSON.parse(e):et)}),[]),Object(L.useEffect)((function(){y.images.length&&C(!0)}),[y]),Object(L.useEffect)((function(){localStorage.setItem(ae.pains,JSON.stringify(A))}),[A]),Object(Q.jsxs)(nt,{children:[Object(Q.jsx)(Ze.Provider,{value:_,children:Object(Q.jsx)(Ye.Provider,{value:W,children:Object(Q.jsx)(Qe.Provider,{value:{imageMap:D,likeMap:U,userMap:z,setNotificationContent:N},children:Object(Q.jsxs)(Xe.Provider,{value:{composeValue:f,setComposeValue:p},children:[Object(Q.jsx)(ge,{value:f,onChange:p,onSubmit:X,userList:n}),Object(Q.jsx)("div",{className:"flex",children:A.map((function(e,t){return Object(Q.jsx)(Fe,{value:e,loadLogTrigger:h,onChangePain:function(e){return function(e,t){A.find((function(n,r){return n.name===e.name&&r!==t}))?N({text:"\u540c\u4e00\u306epain\u540d\u306f\u8a2d\u5b9a\u3067\u304d\u307e\u305b\u3093",type:"error"}):P((function(n){var r=Object(H.a)(n);return r[t]=e,r}))}(e,t)}},e.name)}))})]})})})}),Object(Q.jsx)(Ue,{open:S,onClose:function(){return C(!1)},images:y.images,index:y.index}),Object(Q.jsx)(Ve,{content:I})]})},nt=X.a.div(N||(N=Object(U.a)(["\n  ::-webkit-scrollbar {\n    display:none;\n  }\n"])));A.a.render(Object(Q.jsx)(F.a.StrictMode,{children:Object(Q.jsx)(P.a,{children:Object(Q.jsx)(z.c,{children:Object(Q.jsx)(z.a,{exact:!0,path:"/",children:Object(Q.jsx)(tt,{})})})})}),document.getElementById("root")),D()}},[[50,1,2]]]);
//# sourceMappingURL=main.de78183a.chunk.js.map