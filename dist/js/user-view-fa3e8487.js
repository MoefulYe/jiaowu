import{r as m,a as l,l as r,R as I,S as C,d as h,H as T,o as f,I as b,c as _,O as E,u as o,U as y,A as O,W as B,K as k,X as P,w as n,P as x,M as w,b as N,Y as j,Z as D,Q as A,_ as M,$,a0 as z,a1 as K}from"./index-73e16628.js";import{T as U}from"./index-5e36c2f2.js";import{N as W}from"./Input-a4469d66.js";import{_ as H}from"./_plugin-vue_export-helper-c27b6911.js";const L=640,g=m(window.innerWidth<=L);window.addEventListener("resize",()=>{g.value=window.innerWidth<=L});function R(e){return typeof e=="function"||Object.prototype.toString.call(e)==="[object Object]"&&!I(e)}const S=e=>()=>l(r.NIcon,null,R(e)?e:{default:()=>[e]}),se=(e,u)=>()=>l(C,{to:e},R(u)?u:{default:()=>[u]}),Q={key:1},X=h({__name:"show-or-edit",props:{clearable:{type:Boolean,default:!1},placeholder:{default:void 0},value:{}},emits:["update:value"],setup(e,{emit:u}){const i=e,s=m(),v=T(),c=m(!1),t=async()=>{c.value=!1,u("update:value",s.value)};return(p,a)=>(f(),b("div",{onClick:a[2]||(a[2]=()=>{c.value=!0,s.value=p.value,O(()=>{var d;return(d=v.value)==null?void 0:d.focus()})})},[c.value?(f(),_(o(W),{key:0,ref_key:"inputRef",ref:v,value:s.value,"onUpdate:value":a[0]||(a[0]=d=>s.value=d),clearable:i.clearable,onKeyup:a[1]||(a[1]=E(()=>{var d;return(d=v.value)==null?void 0:d.blur()},["enter"])),onBlur:t,placeholder:i.placeholder},null,8,["value","clearable","placeholder"])):(f(),b("span",Q,y(p.value===void 0||p.value.length===0?"null":p.value),1))]))}}),V=e=>($("data-v-baedd27c"),e=e(),z(),e),Y=V(()=>w("span",{class:"icon-[mingcute--menu-line]"},null,-1)),Z={class:"ml-2 sm:ml-0"},q=V(()=>w("span",{class:"flex-grow"},null,-1)),F={class:"flex items-center"},G=[{label:"个人信息",key:"profile",icon:S(l("span",{class:"icon-[iconamoon--profile]"},null))},{label:"退出登录",key:"logout",icon:S(l("span",{class:"icon-[material-symbols--exit-to-app-rounded]"},null))}],J=h({__name:"user-view",setup(e){const u=D(()=>K(()=>import("./side-menu-f0bfdc6b.js"),["js/side-menu-f0bfdc6b.js","js/index-73e16628.js","css/index-d0555cb3.css","js/index-5e36c2f2.js","js/Input-a4469d66.js","js/browser-6cda8c93.js","js/light-07aa199c.js","js/is-browser-fc34c9a6.js","js/Suffix-32192c0b.js","js/Icon-9eb33163.js","js/_plugin-vue_export-helper-c27b6911.js"])),{username:i}=B(k()),s=m(!0),v=c=>{switch(c){case"profile":M();break;case"logout":k().logout(),A();break}};return(c,t)=>{const p=P("RouterView");return f(),_(o(r.NLayout),{class:"w-full h-full flex","has-sider":""},{default:n(()=>[o(g)?x("",!0):(f(),_(o(r.NLayoutSider),{key:0,id:"menu","collapse-mode":"width","collapsed-width":64,width:180,collapsed:s.value,onCollapse:t[1]||(t[1]=()=>s.value=!0),onExpand:t[2]||(t[2]=()=>s.value=!1)},{default:n(()=>[l(o(u),{onToggle:t[0]||(t[0]=a=>s.value=a)})]),_:1},8,["collapsed"])),l(o(r.NLayout),{class:"grow","content-style":"display: flex; flex-direction: column;"},{default:n(()=>[l(o(r.NLayoutHeader),{class:"flex p-2 sm:p-4 sm:h-12 items-center",bordered:""},{default:n(()=>[o(g)?(f(),_(o(r.NPopover),{key:0,trigger:"click",class:"mr-4"},{trigger:n(()=>[Y]),default:n(()=>[l(o(u),{collapsed:!1})]),_:1})):x("",!0),w("span",Z,y(o(U)),1),q,l(o(r.NDropdown),{options:G,trigger:"click",onSelect:v},{default:n(()=>[l(o(r.NAvatar),{size:"small",class:"mr-2",round:""},{default:n(()=>[N(y(o(i).slice(0,1)),1)]),_:1})]),_:1}),w("span",F,[N(" 你好, "),l(X,{value:o(i),"onUpdate:value":t[3]||(t[3]=a=>j(i)?i.value=a:null)},null,8,["value"])])]),_:1}),l(o(r.NLayoutContent),{class:"grow flex flex-col","content-style":"display: flex; flex-direction: column; flex-grow: 1;"},{default:n(()=>[l(p)]),_:1})]),_:1})]),_:1})}}});const ee=H(J,[["__scopeId","data-v-baedd27c"]]),ne=Object.freeze(Object.defineProperty({__proto__:null,default:ee},Symbol.toStringTag,{value:"Module"}));export{se as a,g as i,S as r,ne as u};
