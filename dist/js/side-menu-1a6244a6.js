import{d,r as p,v as r,a,o as m,c as k,u as b,l as g,_ as f,ad as x}from"./index-b37a15c6.js";import{i as h,r as o,a as n,c as v}from"./user-view-cd82b107.js";import"./index-5e36c2f2.js";import"./Input-ebc85a91.js";import"./Suffix-f44f4662.js";import"./_plugin-vue_export-helper-c27b6911.js";var e=function(l){return l[l.Toggle=0]="Toggle",l[l.Home=1]="Home",l[l.Person=2]="Person",l[l.Profile=3]="Profile",l[l.Education=4]="Education",l[l.Market=5]="Market",l[l.Job=6]="Job",l[l.SkillRequire=7]="SkillRequire",l[l.Trend=8]="Trend",l[l.Guide=9]="Guide",l[l.Plan=10]="Plan",l[l.Material=11]="Material",l[l.Evaluation=12]="Evaluation",l[l.Interest=13]="Interest",l[l.Skill=14]="Skill",l[l.Logout=15]="Logout",l[l.Recommand=16]="Recommand",l}(e||{});const L=d({__name:"side-menu",emits:["toggle"],setup(l,{emit:c}){const i=p(!0),t=r(()=>[{label:i.value?"展开":"收起",key:e.Toggle,show:!h.value,icon:i.value?o(a("span",{class:"icon-[ant-design--menu-unfold-outlined] text-2xl"},null)):o(a("span",{class:"icon-[ant-design--menu-fold-outlined] text-2xl"},null))},{label:n("/welcome","首页"),key:e.Home,icon:o(a("span",{class:"icon-[ant-design--home-outlined] text-2xl"},null))},{label:"个人中心",key:e.Person,icon:o(a("span",{class:"icon-[ph--person-simple] text-2xl"},null)),children:[{label:n("/profile","基本信息"),key:e.Profile,icon:o(a("span",{class:"icon-[ant-design--idcard-outlined]"},null))},{label:n("/academic","学业信息"),key:e.Education,icon:o(a("span",{class:"icon-[fluent-mdl2--education]"},null))}]},{label:"市场行情",key:e.Market,icon:o(a("span",{class:"icon-[clarity--world-line] text-2xl"},null)),children:[{label:n("/job/market","职业行情"),key:e.Job,icon:o(a("span",{class:"icon-[flowbite--bars-from-left-outline]"},null))},{label:n("/job/skill","技能需求"),key:e.SkillRequire,icon:o(a("span",{class:"icon-[carbon--intent-request-active]"},null))},{label:n("/job/trend","趋势分析"),key:e.Trend,icon:o(a("span",{class:"icon-[ph--trend-up]"},null))}]},{label:"职业评估",key:e.Evaluation,icon:o(a("span",{class:"icon-[ph--exam] text-2xl"},null)),children:[{label:n("/interest","兴趣方向"),key:e.Interest,icon:o(a("span",{class:"icon-[ph--heart]"},null))},{label:n("/skill","技能评估"),key:e.Skill,icon:o(a("span",{class:"icon-[la--tools]"},null))},{label:n("/recommand","职业推荐"),key:e.Recommand,icon:o(a("span",{class:"icon-[ph--lightbulb]"},null))}]},{label:"学习指导",key:e.Guide,icon:o(a("span",{class:"icon-[ep--guide] text-2xl"},null)),children:[{label:n("/study/plan","学习规划"),key:e.Plan,icon:o(a("span",{class:"icon-[ph--paper-plane-tilt]"},null))},{label:n("/study/material","资源推荐"),key:e.Material,icon:o(a("span",{class:"icon-[lets-icons--materials]"},null))}]},{label:"退出登录",key:e.Logout,icon:o(a("span",{class:"icon-[iconamoon--exit-light] text-2xl"},null))}]),u=async s=>{switch(s){case e.Toggle:i.value=!i.value,c("toggle",i.value);break;case e.Logout:await v("注销","确定要注销吗？")&&(f().logout(),x());break}};return(s,P)=>(m(),k(b(g.NMenu),{collapsed:i.value,"collapsed-width":64,"collapsed-icon-size":22,options:t.value,onUpdateValue:u},null,8,["collapsed","options"]))}});export{L as default};
