import{f as D,z,a2 as y,A as g,C as f,d as C,m as E,K as F,v as j,L,q as x,Z as B,r as k,X as P,o as w,Y as I,a as s,w as i,b as h,u as l,l as m,a3 as T,_ as V,T as A,c as _,a4 as W,a0 as b,a1 as v,a5 as q,g as N,N as K}from"./index-3ae6663b.js";import{r as O}from"./account-a74b86f5.js";import{_ as U}from"./basic-info-form.vue_vue_type_script_setup_true_lang-14f0c309.js";import{_ as G}from"./academic-info-form.vue_vue_type_script_setup_true_lang-0a53db29.js";import{N as $}from"./Tooltip-9b0f832b.js";import{N as H}from"./Progress-2bd16a92.js";import"./requests-c7084541.js";import"./profile-4516d0ca.js";import"./FormItem-0cd72974.js";import"./FocusDetector-3d1dedc7.js";import"./Input-e2df7906.js";import"./Suffix-a593eadd.js";import"./get-4c618113.js";import"./Grid-99225d49.js";import"./Add-29c4a229.js";import"./Popover-3489f9b4.js";const M=e=>{const{textColor1:t,dividerColor:r,fontWeightStrong:o}=e;return{textColor:t,color:r,fontWeight:o}},X={name:"Divider",common:D,self:M},Y=X,Z=z("divider",`
 position: relative;
 display: flex;
 width: 100%;
 box-sizing: border-box;
 font-size: 16px;
 color: var(--n-text-color);
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
`,[y("vertical",`
 margin-top: 24px;
 margin-bottom: 24px;
 `,[y("no-title",`
 display: flex;
 align-items: center;
 `)]),g("title",`
 display: flex;
 align-items: center;
 margin-left: 12px;
 margin-right: 12px;
 white-space: nowrap;
 font-weight: var(--n-font-weight);
 `),f("title-position-left",[g("line",[f("left",{width:"28px"})])]),f("title-position-right",[g("line",[f("right",{width:"28px"})])]),f("dashed",[g("line",`
 background-color: #0000;
 height: 0px;
 width: 100%;
 border-style: dashed;
 border-width: 1px 0 0;
 `)]),f("vertical",`
 display: inline-block;
 height: 1em;
 margin: 0 8px;
 vertical-align: middle;
 width: 1px;
 `),g("line",`
 border: none;
 transition: background-color .3s var(--n-bezier), border-color .3s var(--n-bezier);
 height: 1px;
 width: 100%;
 margin: 0;
 `),y("dashed",[g("line",{backgroundColor:"var(--n-color)"})]),f("dashed",[g("line",{borderColor:"var(--n-color)"})]),f("vertical",{backgroundColor:"var(--n-color)"})]),J=Object.assign(Object.assign({},F.props),{titlePlacement:{type:String,default:"center"},dashed:Boolean,vertical:Boolean}),Q=C({name:"Divider",props:J,setup(e){const{mergedClsPrefixRef:t,inlineThemeDisabled:r}=E(e),o=F("Divider","-divider",Z,Y,e,t),c=j(()=>{const{common:{cubicBezierEaseInOut:n},self:{color:a,textColor:p,fontWeight:R}}=o.value;return{"--n-bezier":n,"--n-color":a,"--n-text-color":p,"--n-font-weight":R}}),u=r?L("divider",void 0,c,e):void 0;return{mergedClsPrefix:t,cssVars:r?void 0:c,themeClass:u==null?void 0:u.themeClass,onRender:u==null?void 0:u.onRender}},render(){var e;const{$slots:t,titlePlacement:r,vertical:o,dashed:c,cssVars:u,mergedClsPrefix:n}=this;return(e=this.onRender)===null||e===void 0||e.call(this),x("div",{role:"separator",class:[`${n}-divider`,this.themeClass,{[`${n}-divider--vertical`]:o,[`${n}-divider--no-title`]:!t.default,[`${n}-divider--dashed`]:c,[`${n}-divider--title-position-${r}`]:t.default&&r}],style:u},o?null:x("div",{class:`${n}-divider__line ${n}-divider__line--left`}),!o&&t.default?x(B,null,x("div",{class:`${n}-divider__title`},this.$slots),x("div",{class:`${n}-divider__line ${n}-divider__line--right`})):null)}}),S=C({__name:"register-form",emits:["login","success"],setup(e,{emit:t}){const r=k({phone:"",password:"",password2:""}),o=P(),c=async()=>{try{await o.value.validate();const n=await O(r.value),a=V();a.username=`用户${r.value.phone}`,a.token=n,t("success")}catch{}},u={phone:[{required:!0,message:"请输入手机号码"},{message:"手机号码不合法",trigger:"blur",validator:(n,a)=>a!==""&&!/^\d{11}$/.test(a)?new Error("手机号码必须是 11 位数字"):!0}],password:[{required:!0,message:"请输入密码"},{min:6,max:20,message:"长度在 6 到 20 个字符",trigger:"blur"}],password2:[{required:!0,message:"请再次输入密码"},{min:6,max:20,message:"长度在 6 到 20 个字符",trigger:"blur"},{validator:(n,a)=>a!==r.value.password?new Error("两次输入密码不一致"):!0,trigger:["blur","input"]}]};return(n,a)=>(w(),I(B,null,[s(l(m.NButton),{class:"w-full mt-4",onClick:a[0]||(a[0]=()=>t("login"))},{default:i(()=>[h("登录账号")]),_:1}),s(l(Q),{class:"text-[#4c566a] opacity-90"},{default:i(()=>[h("或者")]),_:1}),s(l(m.NForm),{ref_key:"formRef",ref:o,"label-width":80,model:r.value,rules:u},{default:i(()=>[s(l(m.NFormItem),{label:"手机",path:"phone"},{default:i(()=>[s(l(m.NInput),{value:r.value.phone,"onUpdate:value":a[1]||(a[1]=p=>r.value.phone=p),placeholder:"请输入手机"},null,8,["value"])]),_:1}),s(l(m.NFormItem),{label:"密码",path:"password"},{default:i(()=>[s(l(m.NInput),{value:r.value.password,"onUpdate:value":a[2]||(a[2]=p=>r.value.password=p),placeholder:"请输入密码",type:"password","show-password-on":"click"},null,8,["value"])]),_:1}),s(l(m.NFormItem),{label:"确认密码",path:"password2"},{default:i(()=>[s(l(m.NInput),{value:r.value.password2,"onUpdate:value":a[3]||(a[3]=p=>r.value.password2=p),placeholder:"请再次输入密码",type:"password",onKeydown:T(c,["enter"])},null,8,["value","onKeydown"])]),_:1}),s(l(m.NButton),{type:"primary",class:"w-full mt-4",onClick:c},{default:i(()=>[h("注册")]),_:1})]),_:1},8,["model"])],64))}}),ee={class:"w-full h-full flex flex-col items-center justify-center bg-[url('/img/register-bg.avif')] bg-center bg-cover"},te=v("div",{class:"flex justify-center"},"注册账号",-1),se={class:"flex relative items-center"},oe=v("span",{class:"flex grow justify-center"},"填写基本信息",-1),ie={class:"flex relative items-center"},re=v("span",{class:"flex justify-center"},"填写学业信息",-1),le=v("div",{class:"flex justify-center"},"注册成功",-1);var d=function(e){return e[e.Register=0]="Register",e[e.FillBasicInfo=1]="FillBasicInfo",e[e.FillAcademicInfo=2]="FillAcademicInfo",e[e.Complete=3]="Complete",e}(d||{});const ae=C({name:"GuidetoWelcome",setup:()=>{const e=k(5),t=setInterval(()=>{e.value--,e.value===0&&(clearInterval(t),N())},1e3);return()=>s("div",{class:"flex flex-col items-center gap-4"},[s("div",null,[e.value,h(" 秒后跳转到主页 ")]),s("div",null,[s(K,{onClick:()=>{clearInterval(t),N()}},{default:()=>[h("不想等待? 点此跳转")]})])])}}),ke=C({__name:"register-view",setup(e){const t=k(d.Register);return(r,o)=>(w(),I("div",ee,[s(A,{"enter-from-class":"opacity-0","leave-to-class":"opacity-0","enter-active-class":"transition-opacity ease-in-out","leave-active-class":"transition-opacity ease-in-out"},{default:i(()=>[t.value===d.Register?(w(),_(l(b),{key:0,class:"w-fit h-fit m-12 shadow-sm"},{header:i(()=>[te]),default:i(()=>[s(S,{onLogin:l(W),onSuccess:o[0]||(o[0]=()=>t.value=d.FillBasicInfo)},null,8,["onLogin"])]),_:1})):t.value===d.FillBasicInfo?(w(),_(l(b),{key:1,class:"w-fit h-fit m-12 shadow-sm"},{header:i(()=>[v("div",se,[oe,s(l($),null,{trigger:i(()=>[v("span",{class:"icon-[material-symbols--skip-next-rounded] absolute right-2 hover:text-[#81a1c1] text-[#434c5e]",onClick:o[1]||(o[1]=c=>t.value=d.FillAcademicInfo)})]),default:i(()=>[h(" 不想填写？ 点此跳过 ")]),_:1})])]),default:i(()=>[s(U,{onComplete:o[2]||(o[2]=()=>t.value=d.FillAcademicInfo)})]),_:1})):t.value===d.FillAcademicInfo?(w(),_(l(b),{key:2,class:"w-fit h-fit m-12 shadow-sm"},{header:i(()=>[v("div",ie,[re,s(l($),null,{trigger:i(()=>[v("span",{class:"icon-[material-symbols--skip-next-rounded] absolute right-2 hover:text-[#81a1c1] text-[#434c5e]",onClick:o[3]||(o[3]=c=>t.value=d.Complete)})]),default:i(()=>[h(" 不想填写？ 点此跳过 ")]),_:1})])]),default:i(()=>[s(G,{onComplete:o[4]||(o[4]=()=>t.value=d.Complete)})]),_:1})):t.value===d.Complete?(w(),_(l(b),{key:3,class:"w-fit h-fit m-12 shadow-sm"},{header:i(()=>[le]),default:i(()=>[s(l(ae))]),_:1})):q("",!0)]),_:1}),s(l(H),{class:"fixed bottom-0","show-indicator":!1,percentage:7+t.value*31,height:4,"border-radius":0},null,8,["percentage"])]))}});export{ke as default};
