import{r as _,a,l as u,ae as V,af as R,d as C,X as I,o as f,Y as k,c as v,ab as E,u as o,ag as y,J as O,ah as P,_ as b,ai as j,w as i,ac as x,a1 as w,b as N,aj as B,ak as D,ad as M,al as $,am as z,an as A,ao as K}from"./index-b37a15c6.js";import{T as U}from"./index-5e36c2f2.js";import{N as W}from"./Input-ebc85a91.js";import{_ as H}from"./_plugin-vue_export-helper-c27b6911.js";const S=640,g=_(window.innerWidth<=S);window.addEventListener("resize",()=>{g.value=window.innerWidth<=S});function L(e){return typeof e=="function"||Object.prototype.toString.call(e)==="[object Object]"&&!V(e)}const h=e=>()=>a(u.NIcon,null,L(e)?e:{default:()=>[e]}),ne=(e,t)=>()=>a(R,{to:e},L(t)?t:{default:()=>[t]}),J={key:1},X=C({__name:"show-or-edit",props:{clearable:{type:Boolean,default:!1},placeholder:{default:void 0},value:{}},emits:["update:value"],setup(e,{emit:t}){const l=e,r=_(),m=I(),d=_(!1),s=async()=>{d.value=!1,t("update:value",r.value)};return(p,n)=>(f(),k("div",{onClick:n[2]||(n[2]=()=>{d.value=!0,r.value=p.value,O(()=>{var c;return(c=m.value)==null?void 0:c.focus()})})},[d.value?(f(),v(o(W),{key:0,ref_key:"inputRef",ref:m,value:r.value,"onUpdate:value":n[0]||(n[0]=c=>r.value=c),clearable:l.clearable,onKeyup:n[1]||(n[1]=E(()=>{var c;return(c=m.value)==null?void 0:c.blur()},["enter"])),onBlur:s,placeholder:l.placeholder},null,8,["value","clearable","placeholder"])):(f(),k("span",J,y(p.value===void 0||p.value.length===0?"null":p.value),1))]))}}),Y=(e,t)=>new Promise(l=>{window.$dialog.info({title:e,content:t,positiveText:"确定",negativeText:"取消",closeOnEsc:!0,onPositiveClick:()=>l(!0),onNegativeClick:()=>l(!1),onMaskClick:()=>l(!1),onClose:()=>l(!1)})}),T=e=>(z("data-v-2eef6f9e"),e=e(),A(),e),q=T(()=>w("span",{class:"icon-[mingcute--menu-line]"},null,-1)),F={class:"ml-2 sm:ml-0"},G=T(()=>w("span",{class:"flex-grow"},null,-1)),Q={class:"flex items-center"},Z=[{label:"个人信息",key:"profile",icon:h(a("span",{class:"icon-[iconamoon--profile]"},null))},{label:"退出登录",key:"logout",icon:h(a("span",{class:"icon-[material-symbols--exit-to-app-rounded]"},null))}],ee=C({__name:"user-view",setup(e){const t=D(()=>K(()=>import("./side-menu-1a6244a6.js"),["js/side-menu-1a6244a6.js","js/index-b37a15c6.js","css/index-6c571043.css","js/index-5e36c2f2.js","js/Input-ebc85a91.js","js/Suffix-f44f4662.js","js/_plugin-vue_export-helper-c27b6911.js"])),{username:l}=P(b()),r=_(!0),m=async d=>{switch(d){case"profile":$();break;case"logout":await Y("注销","确定要注销吗?")&&(b().logout(),M());break}};return(d,s)=>{const p=j("RouterView");return f(),v(o(u.NLayout),{class:"w-full h-full flex","has-sider":""},{default:i(()=>[o(g)?x("",!0):(f(),v(o(u.NLayoutSider),{key:0,id:"menu","collapse-mode":"width","collapsed-width":64,width:180,collapsed:r.value,onCollapse:s[1]||(s[1]=()=>r.value=!0),onExpand:s[2]||(s[2]=()=>r.value=!1)},{default:i(()=>[a(o(t),{onToggle:s[0]||(s[0]=n=>r.value=n)})]),_:1},8,["collapsed"])),a(o(u.NLayout),{class:"grow","content-style":"display: flex; flex-direction: column;"},{default:i(()=>[a(o(u.NLayoutHeader),{class:"flex p-2 sm:p-4 sm:h-12 items-center",bordered:""},{default:i(()=>[o(g)?(f(),v(o(u.NPopover),{key:0,trigger:"click",class:"mr-4"},{trigger:i(()=>[q]),default:i(()=>[a(o(t),{collapsed:!1})]),_:1})):x("",!0),w("span",F,y(o(U)),1),G,a(o(u.NDropdown),{options:Z,trigger:"click",onSelect:m},{default:i(()=>[a(o(u.NAvatar),{size:"small",class:"mr-2",round:""},{default:i(()=>[N(y(o(l).slice(0,1)),1)]),_:1})]),_:1}),w("span",Q,[N(" 你好, "),a(X,{value:o(l),"onUpdate:value":s[3]||(s[3]=n=>B(l)?l.value=n:null)},null,8,["value"])])]),_:1}),a(o(u.NLayoutContent),{class:"grow flex flex-col","content-style":"display: flex; flex-direction: column; flex-grow: 1;"},{default:i(()=>[a(p)]),_:1})]),_:1})]),_:1})}}});const oe=H(ee,[["__scopeId","data-v-2eef6f9e"]]),re=Object.freeze(Object.defineProperty({__proto__:null,default:oe},Symbol.toStringTag,{value:"Module"}));export{ne as a,Y as c,g as i,h as r,re as u};
