(this.webpackJsonpSNSClientForEngineersAndProgrammers=this.webpackJsonpSNSClientForEngineersAndProgrammers||[]).push([[0],{26:function(e,t,n){},34:function(e,t,n){"use strict";n.r(t);var c=n(0),r=n.n(c),i=n(19),a=n.n(i),o=(n(26),n(20)),u=n(2),s=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,35)).then((function(t){var n=t.getCLS,c=t.getFID,r=t.getFCP,i=t.getLCP,a=t.getTTFB;n(e),c(e),r(e),i(e),a(e)}))},j=n(8),l=n.n(j),d=n(13),f=n(11),b=n(7),O=n(9),h=n(1),x={text:"",replyToUserId:""},p=function(e){var t=e.onSubmit,n=e.userList,r=Object(c.useState)(x),i=Object(O.a)(r,2),a=i[0],o=i[1],u=Object(c.useState)(!1),s=Object(O.a)(u,2),j=s[0],p=s[1],m=Object(c.useRef)(null),v=function(e){e.ctrlKey&&13===e.keyCode&&!j&&p(!0)};Object(c.useEffect)((function(){Object(d.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:j&&a.text.trim()&&(p(!1),t(a),o(x));case 1:case"end":return e.stop()}}),e)})))()}),[j,a,t]),Object(c.useEffect)((function(){m.current&&m.current.addEventListener("keydown",v,!1)}),[m.current]);return Object(h.jsxs)("form",{children:[Object(h.jsxs)("select",{name:"replyToUserId",value:a.replyToUserId,onChange:function(e){o((function(t){return Object(b.a)(Object(b.a)({},t),{},Object(f.a)({},e.target.name,e.target.value))}))},children:[Object(h.jsx)("option",{value:"",children:"-"}),n.map((function(e){return Object(h.jsx)("option",{value:e.id,children:e.name||"\u533f\u540d(".concat(e._user_id.slice(0,2),")")},e.id)}))]}),Object(h.jsx)("textarea",{name:"text",ref:m,placeholder:"\u4eca\u306a\u306b\u3057\u3066\u308b\uff1f",rows:4,value:a.text,onChange:function(e){return o((function(t){return Object(b.a)(Object(b.a)({},t),{},{text:e.target.value})}))}}),Object(h.jsx)("input",{type:"submit",onClick:function(e){e.preventDefault(),p(!0)},value:"send"})]})},m="https://versatileapi.herokuapp.com/api",v=function(){var e=Object(c.useState)([]),t=Object(O.a)(e,2),n=t[0],r=t[1],i=Object(c.useState)(!1),a=Object(O.a)(i,2),o=a[0],u=a[1],s=Object(c.useState)([]),j=Object(O.a)(s,2),x=j[0],v=j[1],g=Object(c.useMemo)((function(){return x.reduce((function(e,t){return Object(b.a)(Object(b.a)({},e),{},Object(f.a)({},t.id,t))}),{})}),[x]),y=function(){fetch("".concat(m,"/text/all?$orderby=_created_at%20desc&$limit=60")).then((function(e){return e.json()})).then(r)},S=function(){var e=Object(d.a)(l.a.mark((function e(t){var n,c,r,i;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.text,c=t.replyToUserId,r=t.replyToTextId,i=Object(b.a)(Object(b.a)({text:n},c?{in_reply_to_user_id:c}:{}),r?{in_reply_to_text_id:r}:{}),e.next=4,fetch("".concat(m,"/text"),{method:"POST",headers:{Authorization:"HelloWorld"},body:JSON.stringify(i)}).then((function(e){return e.json()})).then((function(e){return console.log(e)}));case 4:y();case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(c.useEffect)((function(){y(),setInterval(y,3e4),Object(d.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat(m,"/user/all")).then((function(e){return e.json()})).then(v);case 2:case"end":return e.stop()}}),e)})))()}),[]),Object(h.jsx)(h.Fragment,{children:o?Object(h.jsxs)("div",{children:[Object(h.jsx)(p,{onSubmit:S,userList:x}),n.map((function(e){return Object(h.jsx)(_,{text:e,userMap:g},e.id)}))]}):Object(h.jsxs)("div",{children:["\u3042\u306a\u305f\u306f\u30a8\u30f3\u30b8\u30cb\u30a2\u30fb\u30d7\u30ed\u30b0\u30e9\u30de\u3067\u3059\u304b\uff1f",Object(h.jsx)("button",{onClick:function(){return u(!0)},children:"\u306f\u3044"})]})})},_=function(e){var t,n=e.text,r=e.userMap,i=Object(c.useState)(Number.MIN_SAFE_INTEGER),a=Object(O.a)(i,2),o=a[0],u=a[1],s=Object(c.useMemo)((function(){var e=new Date,t=new Date(n._created_at),c=(e.getTime()-t.getTime())/1e3;return{timeDiff:c<60?"".concat(Math.floor(c),"\u79d2\u524d"):c/60<60?"".concat(Math.floor(c/60),"\u5206\u524d"):c/60/60<24?"".concat(Math.floor(c/60/60),"\u6642\u9593\u524d"):"".concat(Math.floor(c/60/60/24),"\u65e5\u524d"),time:n._created_at,localizedTime:t.toLocaleString("ja-JP")}}),[n,r,o]);Object(c.useEffect)((function(){setInterval((function(){return u((function(e){return e+1}))}),5e3)}),[]);var j=function(e){var t;return(null===(t=r[e])||void 0===t?void 0:t.name)||"\u533f\u540d(".concat(e.slice(0,2),")")};return Object(h.jsxs)("div",{children:[Object(h.jsx)("div",{children:Object(h.jsx)("time",{dateTime:s.time,title:s.localizedTime,children:s.timeDiff})}),Object(h.jsx)("div",{title:(null===(t=r[n._user_id])||void 0===t?void 0:t.description)||n._user_id,children:j(n._user_id)}),Object(h.jsx)("div",{children:Object(h.jsxs)("pre",{children:[n.in_reply_to_user_id?"@".concat(j(n.in_reply_to_user_id)," "):"",n.text]})})]})};a.a.render(Object(h.jsx)(r.a.StrictMode,{children:Object(h.jsx)(o.a,{children:Object(h.jsx)(u.c,{children:Object(h.jsx)(u.a,{exact:!0,path:"/",children:Object(h.jsx)(v,{})})})})}),document.getElementById("root")),s()}},[[34,1,2]]]);
//# sourceMappingURL=main.f3270796.chunk.js.map