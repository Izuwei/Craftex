(this["webpackJsonpreact-app"]=this["webpackJsonpreact-app"]||[]).push([[0],{100:function(e,t,a){},101:function(e,t,a){},515:function(e,t,a){},516:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(10),o=a.n(c),l=(a(100),a(61)),i=a(16),s=a(56),m=(a(101),a(556)),u=a(5),d=a(84),p=a(555),h=a(558),b=a(561),g=a(563),f=a(559),E=a(49),v=a(560),O=a(79),x=a.n(O),j=a(562),k=a(564),y=a(565),C=a(566),S=a(83),N=a(557),w=a(57),z=Object(u.a)({paper:{border:"1px solid #212121"}})((function(e){return r.a.createElement(d.a,Object.assign({elevation:0,getContentAnchorEl:null,anchorOrigin:{vertical:"bottom",horizontal:"center"},transformOrigin:{vertical:"top",horizontal:"center"}},e))})),I=Object(u.a)((function(e){return{root:{"&:focus":{backgroundColor:e.palette.primary.main,"& .MuiListItemIcon-root, & .MuiListItemText-primary":{color:e.palette.common.white}}}}}))(p.a),R=Object(S.a)({palette:{primary:{main:w.a[900],light:w.a[200],dark:w.a[900]},type:"dark"}}),T=Object(m.a)((function(e){return{root:{flexGrow:1},appName:{marginLeft:e.spacing(10),flex:1},link:{textDecoration:"none",color:"inherit"}}}));function M(){var e=T(),t=r.a.useState(null),a=Object(i.a)(t,2),n=a[0],c=a[1];return r.a.createElement(N.a,{theme:R},r.a.createElement("div",{className:e.root},r.a.createElement(h.a,{position:"static"},r.a.createElement(f.a,{variant:"dense"},r.a.createElement(E.a,{className:e.appName,variant:"h6",color:"inherit"},"React App"),r.a.createElement(v.a,{edge:"start",color:"inherit","aria-label":"menu",onClick:function(e){c(e.currentTarget)}},r.a.createElement(x.a,null)),r.a.createElement(z,{id:"customized-menu",anchorEl:n,keepMounted:!0,open:Boolean(n),onClose:function(){c(null)}},r.a.createElement("a",{className:e.link,href:"https://github.com/Izuwei/production"},r.a.createElement(I,null,r.a.createElement(b.a,null,r.a.createElement(j.a,{fontSize:"small",className:e.itemIcon})),r.a.createElement(g.a,{primary:"Documentation"}))),r.a.createElement("a",{className:e.link,href:"https://github.com/Izuwei/production"},r.a.createElement(I,null,r.a.createElement(b.a,null,r.a.createElement(k.a,{fontSize:"small",className:e.itemIcon})),r.a.createElement(g.a,{primary:"Video"}))),r.a.createElement("a",{className:e.link,href:"https://github.com/Izuwei/production"},r.a.createElement(I,null,r.a.createElement(b.a,null,r.a.createElement(y.a,{fontSize:"small",className:e.itemIcon})),r.a.createElement(g.a,{primary:"GitHub"}))),r.a.createElement("a",{className:e.link,href:"https://github.com/Izuwei/production"},r.a.createElement(I,null,r.a.createElement(b.a,null,r.a.createElement(C.a,{fontSize:"small",className:e.itemIcon})),r.a.createElement(g.a,{primary:"Credits"}))))))))}var P=a(28),B=a(25),F=a(30),A=a(29),L=a(18),D=a(31),W=a(85),V=a(55),$=a.n(V),_=(a(75),a(76),a(77),function(e){function t(e){var a;return Object(P.a)(this,t),(a=Object(F.a)(this,Object(A.a)(t).call(this,e))).state={},a.onChange=a.onChange.bind(Object(L.a)(a)),a.resize=a.resize.bind(Object(L.a)(a)),a.onSelectionChange=a.onSelectionChange.bind(Object(L.a)(a)),a}return Object(D.a)(t,e),Object(B.a)(t,[{key:"resize",value:function(){this.refs.aceIn.editor.resize()}},{key:"onChange",value:function(e){this.props.edit(e)}},{key:"onSelectionChange",value:function(e,t){var a=this.refs.aceIn.editor.getSelectedText();console.log(a)}},{key:"render",value:function(){return r.a.createElement($.a,{theme:"idle_fingers",fontSize:"20px",onChange:this.onChange,onSelectionChange:this.onSelectionChange,ref:"aceIn",value:this.props.content,mode:"plain_text",name:"EditorIn",height:"100%",width:"100%",placeholder:"Insert your input here",showPrintMargin:!1,hScrollBarAlwaysVisible:!0,editorProps:{$blockScrolling:!0}})}}]),t}(n.Component)),G=function(e){function t(e){var a;return Object(P.a)(this,t),(a=Object(F.a)(this,Object(A.a)(t).call(this,e))).state={},a.resize=a.resize.bind(Object(L.a)(a)),a}return Object(D.a)(t,e),Object(B.a)(t,[{key:"resize",value:function(){this.refs.aceOut.editor.resize()}},{key:"render",value:function(){return r.a.createElement($.a,{theme:"idle_fingers",fontSize:"20px",ref:"aceOut",value:this.props.content,name:"EditorOut",height:"100%",width:"100%",mode:"plain_text",readOnly:!0,placeholder:"Your output will be here",showPrintMargin:!1,hScrollBarAlwaysVisible:!0,editorProps:{$blockScrolling:!0}})}}]),t}(n.Component),H=(a(515),function(e){function t(e){var a;return Object(P.a)(this,t),(a=Object(F.a)(this,Object(A.a)(t).call(this,e))).state={},a.handleResize=a.handleResize.bind(Object(L.a)(a)),a}return Object(D.a)(t,e),Object(B.a)(t,[{key:"handleResize",value:function(){this.aceIn.resize(),this.aceOut.resize()}},{key:"render",value:function(){var e=this;return r.a.createElement(W.a,{className:"SplitEditor",split:"vertical",style:{height:"700px",position:"static"},minSize:200,maxSize:-200,defaultSize:"50%",onChange:function(){return e.handleResize()}},r.a.createElement(_,{ref:function(t){e.aceIn=t},content:this.props.editorContent,edit:this.props.editText}),r.a.createElement(G,{ref:function(t){e.aceOut=t},content:this.props.editorResult}))}}]),t}(n.Component)),J=a(591),Y=a(592),q=a(572),K=a(567),Q=a(573),U=a(574),X=a(575),Z=a(576),ee=a(577),te=a(569),ae=a(87),ne=a(590),re=a(570),ce=a(568),oe=a(571),le=Object(S.a)({palette:{primary:{main:K.a[800],light:K.a[600],dark:K.a[900]},secondary:{main:ce.a[800],light:ce.a[200],dark:ce.a[900]},type:"dark"}}),ie=function(e){function t(e){var a;return Object(P.a)(this,t),(a=Object(F.a)(this,Object(A.a)(t).call(this,e))).state={matchPattern:"",matchError:!1},a.handleMatch=a.handleMatch.bind(Object(L.a)(a)),a}return Object(D.a)(t,e),Object(B.a)(t,[{key:"handleMatch",value:function(){""===this.state.matchPattern?(this.setState({matchError:!0}),this.props.displaySnackbar("error","Error: Match pattern is empty!")):(this.setState({matchError:!1}),this.props.addTool({tool:"Match",pattern:this.state.matchPattern}),this.props.displaySnackbar("success","Success: Match added into the pipeline."),this.setState({matchPattern:""}))}}]),Object(B.a)(t,[{key:"render",value:function(){var e=this,t=this.props.classes;return r.a.createElement(N.a,{theme:le},r.a.createElement(te.a,{container:!0,spacing:2},r.a.createElement(te.a,{item:!0,xs:12},r.a.createElement(ae.a,{className:t.paper},r.a.createElement(E.a,{variant:"h5",className:t.toolName},"Match"),r.a.createElement("div",{className:t.flexContent},r.a.createElement(ne.a,{id:"match-pattern",label:"Pattern",value:this.state.matchPattern,onChange:function(t){return e.setState({matchPattern:t.target.value,matchError:!1})},error:!0===this.state.matchError,helperText:!0===this.state.matchError?"Pattern cannot be empty!":" ",className:t.textField}),r.a.createElement(re.a,{color:"secondary",variant:"contained",className:t.button,onClick:function(){return e.handleMatch()},startIcon:r.a.createElement(oe.a,null)},"Add"))))))}}]),t}(n.Component),se=Object(u.a)((function(e){return{button:{margin:e.spacing(1)},paper:{padding:"10px",backgroundColor:"#333333",borderRadius:"0px"},textField:{flex:1},flexContent:{display:"flex",alignItems:"center"},toolName:{color:"#d9d9d9",fontWeight:"bold"}}}))(ie),me=Object(S.a)({palette:{primary:{main:K.a[800],light:K.a[600],dark:K.a[900]},secondary:{main:ce.a[800],light:ce.a[200],dark:ce.a[900]},type:"dark"}}),ue=Object(m.a)((function(e){return{button:{margin:e.spacing(1)},paper:{padding:"10px",backgroundColor:"#333333",borderRadius:"0px"},textField:{flex:1,marginRight:"5px"},flexContent:{display:"flex",alignItems:"center"},toolName:{color:"#d9d9d9",fontWeight:"bold"}}}));function de(e){var t=ue(),a=Object(n.useState)(""),c=Object(i.a)(a,2),o=c[0],l=c[1],s=Object(n.useState)(!1),m=Object(i.a)(s,2),u=m[0],d=m[1],p=Object(n.useState)(""),h=Object(i.a)(p,2),b=h[0],g=h[1],f=Object(n.useState)(!1),v=Object(i.a)(f,2),O=v[0],x=v[1];return r.a.createElement(N.a,{theme:me},r.a.createElement(te.a,{container:!0,spacing:2},r.a.createElement(te.a,{item:!0,xs:12},r.a.createElement(ae.a,{className:t.paper},r.a.createElement(E.a,{variant:"h5",className:t.toolName},"Replace"),r.a.createElement("div",{className:t.flexContent},r.a.createElement(ne.a,{id:"replace-find",label:"Find",value:o,onChange:function(e){return function(e){l(e.target.value),d(!1)}(e)},className:t.textField,error:!0===u,helperText:!0===u?"Field cannot be empty!":""}),r.a.createElement(ne.a,{id:"replace-replace",label:"Replace",value:b,onChange:function(e){return function(e){g(e.target.value),x(!1)}(e)},className:t.textField,error:!0===O,helperText:!0===O?"Field cannot be empty!":""}),r.a.createElement(re.a,{color:"secondary",variant:"contained",className:t.button,onClick:function(){return""===o&&d(!0),""===b&&x(!0),void(""!==o&&""!==b?(d(!1),x(!1),e.addTool({tool:"Replace",find:o,replace:b}),e.displaySnackbar("success","Success: Replace added into the pipeline."),l(""),g("")):e.displaySnackbar("error","Error: Fields cannot be empty!"))},startIcon:r.a.createElement(oe.a,null)},"Add"))))))}function pe(e){var t=e.children,a=e.value,n=e.index,c=Object(s.a)(e,["children","value","index"]);return r.a.createElement(E.a,Object.assign({component:"div",role:"tabpanel",hidden:a!==n,id:"scrollable-auto-tabpanel-".concat(n),"aria-labelledby":"scrollable-auto-tab-".concat(n)},c),r.a.createElement(J.a,{p:3},t))}function he(e){return{id:"scrollable-auto-tab-".concat(e),"aria-controls":"scrollable-auto-tabpanel-".concat(e)}}var be=Object(S.a)({palette:{primary:{main:K.a[600],light:K.a[300],dark:K.a[900]},type:"dark"}}),ge=Object(m.a)((function(e){return{root:{flexGrow:1,marginTop:"20px",marginBottom:"20px",width:"95%",marginLeft:"auto",marginRight:"auto",backgroundColor:e.palette.background.paper,color:"white"}}}));function fe(e){var t=ge(),a=r.a.useState(0),n=Object(i.a)(a,2),c=n[0],o=n[1];return r.a.createElement(N.a,{theme:be},r.a.createElement("div",{className:t.root},r.a.createElement(h.a,{position:"static",color:"default"},r.a.createElement(Y.a,{value:c,onChange:function(e,t){o(t)},indicatorColor:"primary",textColor:"primary",variant:"fullWidth","aria-label":"tabs",centered:!0},r.a.createElement(q.a,Object.assign({icon:r.a.createElement(Q.a,null),label:"Reverse"},he(0))),r.a.createElement(q.a,Object.assign({icon:r.a.createElement(U.a,null),label:"Replace"},he(1))),r.a.createElement(q.a,Object.assign({icon:r.a.createElement(X.a,null),label:"Rows"},he(2))),r.a.createElement(q.a,Object.assign({icon:r.a.createElement(Z.a,null),label:"Columns"},he(3))),r.a.createElement(q.a,Object.assign({icon:r.a.createElement(ee.a,null),label:"Convert"},he(4))))),r.a.createElement(pe,{theme:be,value:c,index:0},"TBD"),r.a.createElement(pe,{value:c,index:1},r.a.createElement(de,{displaySnackbar:e.displaySnackbar,addTool:e.addTool})),r.a.createElement(pe,{value:c,index:2},r.a.createElement(se,{displaySnackbar:e.displaySnackbar,addTool:e.addTool})),r.a.createElement(pe,{value:c,index:3},"TBD"),r.a.createElement(pe,{value:c,index:4},"TBD")))}var Ee=a(588),ve=a(594),Oe=a(586),xe=a(587),je=a(582),ke=a(583),ye=a(584),Ce=a(585),Se=a(589),Ne=a(4),we=a(517),ze=a(554),Ie=a(578),Re=a(579),Te=a(580),Me=a(581),Pe=a(58),Be=Object(m.a)((function(e){return{root:{height:"250px",width:"95%",marginTop:"20px",marginLeft:"auto",marginRight:"auto",backgroundColor:e.palette.background.paper,color:"white"},title:{height:"48px",textTransform:"uppercase",fontSize:"14px",backgroundColor:w.a[900],textAlign:"center",padding:"10px",color:"rgba(255, 255, 255, 0.7)",letterSpacing:"0.02857em",boxShadow:"0px 4px 4px -1px rgba(0,0,0,0.2)"},titleLabel:{marginTop:"5px"},list:{marginLeft:"10px",marginRight:"10px"},listItem:{paddingTop:"0px",paddingBottom:"0px"},content:{height:"182px",overflow:"auto"},toolName:{color:"#ff6a1a",fontWeight:"bold",marginRight:"10px"},toolText:{paddingTop:"13px",paddingBottom:"13px",height:"100%",width:"100%"},conword:{color:"#b500d1",fontWeight:"bold",marginRight:"10px",marginLeft:"10px"},listIcon:{marginRight:"15px",color:"#e0e0e0"}}}));var Fe=function(e){var t=Be(),a=Object(Pe.c)((function(e){var a=e.tool;return r.a.createElement("div",{className:t.toolText},function(e){switch(e.tool){case"Match":return r.a.createElement(r.a.Fragment,null,r.a.createElement("span",{className:t.toolName},e.tool),e.pattern);case"Replace":return r.a.createElement(r.a.Fragment,null,r.a.createElement("span",{className:t.toolName},e.tool),e.find,r.a.createElement("span",{className:t.conword},"with"),e.replace);default:return}}(a))})),n=Object(Pe.b)((function(n){var c=n.tool;return r.a.createElement(we.a,{key:c.id,ContainerComponent:"li",divider:!0,className:t.listItem},r.a.createElement(v.a,{className:t.listIcon,size:"small",onClick:function(){return e.removeTool(c)}},r.a.createElement(Ie.a,null)),r.a.createElement(v.a,{className:t.listIcon,size:"small",onClick:function(){return e.reactiveTool(c)}},c.active?r.a.createElement(Re.a,null):r.a.createElement(Te.a,null)),r.a.createElement(a,{tool:c}))})),c=Object(Pe.a)((function(e){var a=e.tools;return r.a.createElement(ze.a,{component:"ul",className:t.list},a.map((function(e,t){return r.a.createElement(n,{key:e.id,index:t,tool:e})})))}));return r.a.createElement("div",{className:t.root},r.a.createElement("div",{className:t.title},r.a.createElement(Me.a,null),r.a.createElement("div",{className:t.titleLabel},"Pipeline")),r.a.createElement("div",{className:t.content},r.a.createElement(c,{tools:e.tools,lockAxis:"y",useDragHandle:!0,updateBeforeSortStart:e.beforeSort,onSortEnd:e.sort})))},Ae=a(82),Le=a.n(Ae),De=Object(S.a)({palette:{primary:{main:w.a[50]},type:"dark"}}),We={success:je.a,warning:ke.a,error:ye.a,info:Ce.a},Ve=Object(m.a)((function(e){return{success:{backgroundColor:ce.a[600]},error:{backgroundColor:e.palette.error.dark},info:{backgroundColor:Oe.a[500]},warning:{backgroundColor:xe.a[700]},icon:{fontSize:25},iconVariant:{opacity:.9,marginRight:e.spacing(1)},message:{display:"flex",alignItems:"center"}}}));function $e(e){var t=Ve(),a=e.className,n=e.message,c=e.onClose,o=e.variant,l=Object(s.a)(e,["className","message","onClose","variant"]),i=We[o];return r.a.createElement(Ee.a,Object.assign({className:Object(Ne.a)(t[o],a),message:r.a.createElement("span",{id:"message-id",className:t.message},r.a.createElement(i,{className:Object(Ne.a)(t.icon,t.iconVariant)}),n),action:[r.a.createElement(v.a,{key:"close","aria-label":"close",color:"inherit",onClick:c},r.a.createElement(Se.a,null))]},l))}function _e(e){return e.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&")}var Ge=function(){var e=Object(n.useState)(!1),t=Object(i.a)(e,2),a=t[0],c=t[1],o=Object(n.useState)(void 0),s=Object(i.a)(o,2),m=s[0],u=s[1],d=Object(n.useRef)([]),p=Object(n.useState)([]),h=Object(i.a)(p,2),b=h[0],g=h[1],f=Object(n.useState)(""),E=Object(i.a)(f,2),v=E[0],O=E[1],x=Object(n.useState)(""),j=Object(i.a)(x,2),k=j[0],y=j[1],C=Object(n.useRef)(!1),S=Object(n.useRef)(!0);Object(n.useEffect)((function(){for(var e=0;e<b.length;e++)b[e].id!==e+1&&(b[e].id=e+1);!0===C.current&&(!function(){for(var e=v,t=0;t<b.length;t++)if(!1!==b[t].active)switch(b[t].tool){case"Replace":e=e.replace(new RegExp(_e(b[t].find),"g"),b[t].replace);break;case"Match":e=null===(e=e.match(new RegExp(".*"+_e(b[t].pattern)+".*","g")))?"":e.join("\n")}y(e)}(),C.current=!1),0===d.current.length&&!1===a&&(S.current=!0),console.log(b)}));var w=function(){d.current.length>0&&(u(d.current.shift()),c(!0))},z=function(e,t){"clickaway"!==t&&c(!1)};return r.a.createElement(N.a,{theme:De},r.a.createElement("div",{className:"App"},r.a.createElement(M,null),r.a.createElement(H,{editorContent:v,editText:function(e){O(e),C.current=!0},editorResult:k}),r.a.createElement(Fe,{tools:b,removeTool:function(e){g(b.filter((function(t){return t.id!==e.id}))),C.current=!0},reactiveTool:function(e){var t=Object(l.a)(b);for(var a in t)if(t[a].id===e.id){t[a].active=!t[a].active;break}g(t),C.current=!0},sort:function(e){var t=e.oldIndex,a=e.newIndex;console.log(b),g((function(e){return Le()(e,t,a)})),t!==a&&(C.current=!0)},sortable:S,beforeSort:function(){return new Promise((function(e,t){c(!1),d.current=[],!1===a&&e()}))}}),r.a.createElement(fe,{displaySnackbar:function(e,t){d.current.push({variant:e,message:t,key:(new Date).getTime()}),S.current=!1,a?c(!1):w()},addTool:function(e){e.id=b.length+1,e.active=!0,g([].concat(Object(l.a)(b),[e])),C.current=!0}}),r.a.createElement(ve.a,{key:m?m.key:void 0,anchorOrigin:{vertical:"bottom",horizontal:"left"},open:a,autoHideDuration:2e3,onClose:z,onExited:function(){w()},ContentProps:{"aria-describedby":"message-id"}},r.a.createElement($e,{message:m?m.message:void 0,variant:m?m.variant:void 0,onClose:z}))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(Ge,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},95:function(e,t,a){e.exports=a(516)}},[[95,1,2]]]);
//# sourceMappingURL=main.2cb8a272.chunk.js.map