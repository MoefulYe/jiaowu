import{d as p,r as d,v as m,a,o as r,c as b,u as k,l as g,_ as f,a4 as h}from"./index-04563116.js";import{i as x,r as o,a as s}from"./user-view-85465f62.js";import{c as v}from"./confirm-61b5b0fd.js";import"./index-5e36c2f2.js";import"./Input-9d263a23.js";import"./Suffix-5bd9cf9f.js";import"./_plugin-vue_export-helper-c27b6911.js";var l=function(e){return e[e.Toggle=0]="Toggle",e[e.Home=1]="Home",e[e.Person=2]="Person",e[e.Profile=3]="Profile",e[e.Education=4]="Education",e[e.Market=5]="Market",e[e.Job=6]="Job",e[e.SkillRequire=7]="SkillRequire",e[e.Trend=8]="Trend",e[e.Guide=9]="Guide",e[e.Plan=10]="Plan",e[e.Material=11]="Material",e[e.Evaluation=12]="Evaluation",e[e.Assessment=13]="Assessment",e[e.Interest=14]="Interest",e[e.Logout=15]="Logout",e[e.Recommand=16]="Recommand",e[e.Resume=17]="Resume",e}(l||{});const q=p({__name:"side-menu",emits:["toggle"],setup(e,{emit:c}){const n=d(!0),u=m(()=>[{label:n.value?"展开":"收起",key:l.Toggle,show:!x.value,icon:n.value?o(a("span",{class:"icon-[ant-design--menu-unfold-outlined] text-2xl"},null)):o(a("span",{class:"icon-[ant-design--menu-fold-outlined] text-2xl"},null))},{label:s("/welcome","首页"),key:l.Home,icon:o(a("span",{class:"icon-[ant-design--home-outlined] text-2xl"},null))},{label:"个人中心",key:l.Person,icon:o(a("span",{class:"icon-[ph--person] text-2xl"},null)),children:[{label:s("/profile","基本信息"),key:l.Profile,icon:o(a("span",{class:"icon-[ant-design--idcard-outlined]"},null))},{label:s("/academic","学业信息"),key:l.Education,icon:o(a("span",{class:"icon-[fluent-mdl2--education]"},null))},{label:s("/resume","简历管理"),key:l.Resume,icon:o(a("span",{class:"icon-[ph--read-cv-logo]"},null))}]},{label:"市场行情",key:l.Market,icon:o(a("span",{class:"icon-[solar--global-outline] text-2xl"},null)),children:[{label:s("/job/market","职业行情"),key:l.Job,icon:o(a("span",{class:"icon-[flowbite--bars-from-left-outline]"},null))},{label:s("/job/skill","技能需求"),key:l.SkillRequire,icon:o(a("span",{class:"icon-[carbon--intent-request-active]"},null))},{label:s("/job/trend","趋势分析"),key:l.Trend,icon:o(a("span",{class:"icon-[ph--trend-up]"},null))}]},{label:"职业评估",key:l.Evaluation,icon:o(a("span",{class:"icon-[carbon--cube] text-2xl"},null)),children:[{label:s("/assessment","职业测评"),key:l.Assessment,icon:o(a("span",{class:"icon-[ph--exam]"},null))},{label:s("/interest","兴趣方向"),key:l.Interest,icon:o(a("span",{class:"icon-[ph--heart]"},null))},{label:s("/recommand","职业推荐"),key:l.Recommand,icon:o(a("span",{class:"icon-[ph--lightbulb]"},null))}]},{label:"学习指导",key:l.Guide,icon:o(a("span",{class:"icon-[ep--guide] text-2xl"},null)),children:[{label:s("/study/plan","学习规划"),key:l.Plan,icon:o(a("span",{class:"icon-[ph--paper-plane-tilt]"},null))},{label:s("/study/material","资源推荐"),key:l.Material,icon:o(a("span",{class:"icon-[lets-icons--materials]"},null))}]},{label:"退出登录",key:l.Logout,icon:o(a("span",{class:"icon-[iconamoon--exit-light] text-2xl"},null))}]),t=async i=>{switch(i){case l.Toggle:n.value=!n.value,c("toggle",n.value);break;case l.Logout:await v("注销","确定要注销吗？")&&(f().logout(),h());break}};return(i,R)=>(r(),b(k(g.NMenu),{collapsed:n.value,"collapsed-width":64,"collapsed-icon-size":22,options:u.value,onUpdateValue:t},null,8,["collapsed","options"]))}});export{q as default};
