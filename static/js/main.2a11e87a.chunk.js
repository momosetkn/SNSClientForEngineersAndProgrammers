(this.webpackJsonpSNSClientForEngineersAndProgrammers=this.webpackJsonpSNSClientForEngineersAndProgrammers||[]).push([[0],{24:function(e,t,n){},46:function(e,t,n){"use strict";n.r(t);var c,r,a,i=n(0),o=n.n(i),s=n(29),u=n.n(s),l=(n(24),n(33)),d=n(3),j=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,47)).then((function(t){var n=t.getCLS,c=t.getFID,r=t.getFCP,a=t.getLCP,i=t.getTTFB;n(e),c(e),r(e),a(e),i(e)}))},b=n(10),f=n.n(b),p=n(14),O=n(12),x=n(7),h=n(9),v=n(19),_=n(18),m=n(1),y=function(e){var t=e.value,n=e.onChange,c=e.onSubmit,r=e.userList,a=Object(i.useState)(!1),o=Object(h.a)(a,2),s=o[0],u=o[1],l=Object(i.useRef)(null),d=function(e){e.ctrlKey&&13===e.keyCode&&!s&&u(!0)};Object(i.useEffect)((function(){Object(p.a)(f.a.mark((function e(){return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:s&&t.text.trim()&&(u(!1),c(t),n(E));case 1:case"end":return e.stop()}}),e)})))()}),[s,t,n,c]),Object(i.useEffect)((function(){l.current&&l.current.addEventListener("keydown",d,!1)}),[l.current]);var j=function(e){n(Object(x.a)(Object(x.a)({},t),{},Object(O.a)({},e.target.name,e.target.value)))};return Object(m.jsxs)("form",{children:[Object(m.jsx)("div",{children:Object(m.jsx)("input",{type:"text",name:"replyToTextId",placeholder:"\u30c4\u30a4\u30fc\u30c8\u3078\u306e\u8fd4\u4fe1",value:t.replyToTextId,onChange:j})}),Object(m.jsx)("div",{children:Object(m.jsxs)("select",{name:"replyToUserId",value:t.replyToUserId,onChange:j,children:[Object(m.jsx)("option",{value:"",children:"-"}),r.map((function(e){return Object(m.jsx)("option",{value:e.id,children:e.name||"\u533f\u540d(".concat(e._user_id.slice(0,2),")")},e.id)}))]})}),Object(m.jsx)("textarea",{name:"text",ref:l,placeholder:"\u4eca\u306a\u306b\u3057\u3066\u308b\uff1f",rows:4,value:t.text,onChange:function(e){return n(Object(x.a)(Object(x.a)({},t),{},{text:e.target.value}))}}),Object(m.jsx)(_.a,{className:"clickable",icon:v.a,title:"send",onClick:function(e){e.preventDefault(),u(!0)}})]})},T="https://versatileapi.herokuapp.com/api",g=n(20),I=n(21),w=function(e){var t,n=e.text,c=e.userMap,r=e.onReplyTo,a=Object(i.useState)(Number.MIN_SAFE_INTEGER),o=Object(h.a)(a,2),s=o[0],u=o[1],l=Object(i.useMemo)((function(){var e=new Date,t=new Date(n._created_at),c=(e.getTime()-t.getTime())/1e3;return{timeDiff:c<60?"".concat(Math.floor(c),"\u79d2\u524d"):c/60<60?"".concat(Math.floor(c/60),"\u5206\u524d"):c/60/60<24?"".concat(Math.floor(c/60/60),"\u6642\u9593\u524d"):"".concat(Math.floor(c/60/60/24),"\u65e5\u524d"),time:n._created_at,localizedTime:t.toLocaleString("ja-JP")}}),[n,c,s]);Object(i.useEffect)((function(){setInterval((function(){return u((function(e){return e+1}))}),5e3)}),[]);var d=function(e){var t;return(null===(t=c[e])||void 0===t?void 0:t.name)||"\u533f\u540d(".concat(e.slice(0,2),")")};return Object(m.jsxs)(S,{children:[Object(m.jsxs)(k,{children:[Object(m.jsx)("div",{title:(null===(t=c[n._user_id])||void 0===t?void 0:t.description)||n._user_id,children:d(n._user_id)}),Object(m.jsx)("div",{children:Object(m.jsx)("time",{dateTime:l.time,title:l.localizedTime,children:l.timeDiff})})]}),Object(m.jsxs)("div",{children:[Object(m.jsx)("div",{children:n.in_reply_to_text_id?"ReplyTo: ".concat(n.in_reply_to_text_id," "):""}),Object(m.jsx)("div",{children:n.in_reply_to_user_id?"@".concat(d(n.in_reply_to_user_id)," "):""}),Object(m.jsx)(C,{children:n.text})]}),Object(m.jsx)("div",{className:"flex mt1",children:Object(m.jsx)(_.a,{className:"clickable",icon:v.b,onClick:function(){return r({textId:n.id,userId:n._user_id})}})})]})},S=I.a.div(c||(c=Object(g.a)(["\n  border: 1px solid #ccc;\n  padding: 8px;\n"]))),k=I.a.div(r||(r=Object(g.a)(["\n  display: flex;\n  justify-content: space-between;\n"]))),C=I.a.div(a||(a=Object(g.a)(["\n  word-wrap: break-word;\n  white-space: pre-wrap;\n  padding-top: 2px;\n"]))),E={text:"",replyToTextId:"",replyToUserId:""},M=function(){var e=Object(i.useState)([]),t=Object(h.a)(e,2),n=t[0],c=t[1],r=Object(i.useState)([]),a=Object(h.a)(r,2),o=a[0],s=a[1],u=Object(i.useState)(E),l=Object(h.a)(u,2),d=l[0],j=l[1],b=Object(i.useMemo)((function(){return o.reduce((function(e,t){return Object(x.a)(Object(x.a)({},e),{},Object(O.a)({},t.id,t))}),{})}),[o]),v=function(){fetch("".concat(T,"/text/all?$orderby=_created_at%20desc&$limit=60")).then((function(e){return e.json()})).then(c)},_=function(){var e=Object(p.a)(f.a.mark((function e(t){var n,c,r,a;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.text,c=t.replyToUserId,r=t.replyToTextId,a=Object(x.a)(Object(x.a)({text:n},c?{in_reply_to_user_id:c}:{}),r?{in_reply_to_text_id:r}:{}),e.next=4,fetch("".concat(T,"/text"),{method:"POST",headers:{Authorization:"HelloWorld"},body:JSON.stringify(a)}).then((function(e){return e.json()})).then((function(e){return console.log(e)}));case 4:v();case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(i.useEffect)((function(){v(),setInterval(v,3e4),Object(p.a)(f.a.mark((function e(){return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat(T,"/user/all")).then((function(e){return e.json()})).then(s);case 2:case"end":return e.stop()}}),e)})))()}),[]),Object(m.jsxs)("div",{children:[Object(m.jsx)(y,{value:d,onChange:j,onSubmit:_,userList:o}),n.map((function(e){return Object(m.jsx)(w,{text:e,userMap:b,onReplyTo:function(e){return j(Object(x.a)(Object(x.a)({},d),{},{replyToTextId:e.textId,replyToUserId:e.userId}))}},e.id)}))]})};u.a.render(Object(m.jsx)(o.a.StrictMode,{children:Object(m.jsx)(l.a,{children:Object(m.jsx)(d.c,{children:Object(m.jsx)(d.a,{exact:!0,path:"/",children:Object(m.jsx)(M,{})})})})}),document.getElementById("root")),j()}},[[46,1,2]]]);
//# sourceMappingURL=main.2a11e87a.chunk.js.map