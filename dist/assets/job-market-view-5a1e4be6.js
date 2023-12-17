import{d as j,s as $,r as s,f as B,g as i,e as h,h as t,a as u,u as c,w as A,n as O,F as P,i as R,o as f,l as p,b,B as U,t as V}from"./index-022ce0f6.js";import{u as z,f as F,a as D,b as E,i as J,c as L,d as M,e as T,g as q,h as G,j as H,k as I}from"./data_analysis-ec2cac5b.js";const K={class:"w-full h-full flex flex-col"},Q=t("h2",{class:"text-2xl font-bold"},"职位行情",-1),W=t("span",{class:"text-lg"},"筛选",-1),X={class:"flex"},Y=t("h2",{class:"text-2xl font-bold"},"薪资待遇",-1),Z={class:"flex"},ee=t("h2",{class:"text-2xl font-bold"},"相关企业",-1),ae=["href"],oe=j({__name:"job-market-view",setup(le){z([J,L,M,T,q,G]);const _=$(null),y=s([]),v=s([]),x=s([]),r=s(),o=s(),d=s([]),n=s([]);B(()=>{F().then(e=>v.value=e),D().then(e=>y.value=e),E().then(e=>x.value=e)});const g=async(e,a)=>{n.value=await Promise.all([H({jobName:a})].concat(e.map(l=>I({city:l,jobName:a}))))},w=i(()=>y.value.map(e=>({label:e,value:e}))),N=i(()=>v.value.map(e=>({label:e,value:e}))),m=i(()=>{let e=[];return o.value!=null&&e.push(o.value),e=e.concat(d.value),e}),S=i(()=>v.value.map(e=>({label:e,value:e,disabled:e===o.value}))),C=i(()=>({xAxis:{},yAxis:{type:"category",data:["全国"].concat(m.value),axisPointer:{type:"shadow",value:o.value,show:!0,handle:{show:!0}}},tooltip:{trigger:"axis",axisPointer:{type:"shadow"}},legend:{},series:[{type:"bar",name:"最少薪资",data:n.value.map(e=>e.minSalary)},{type:"bar",name:"平均薪资",data:n.value.map(e=>e.avgSalary)},{type:"bar",name:"最多薪资",data:n.value.map(e=>e.maxSalary)},{type:"bar",name:"岗位数量",data:n.value.map(e=>e.jobNum)}]}));return(e,a)=>(f(),h("div",K,[Q,W,t("div",X,[u(c(p.NSelect),{value:r.value,"onUpdate:value":a[0]||(a[0]=l=>r.value=l),options:w.value,class:"inline w-24 p-2",placeholder:"职位"},null,8,["value","options"]),u(c(p.NSelect),{value:o.value,"onUpdate:value":a[1]||(a[1]=l=>o.value=l),options:N.value,class:"inline w-24 p-2",placeholder:"城市"},null,8,["value","options"])]),Y,t("div",Z,[u(c(p.NSelect),{value:d.value,"onUpdate:value":a[2]||(a[2]=l=>d.value=l),options:S.value,class:"inline w-96 m-2",placeholder:"对比城市",multiple:""},null,8,["value","options"]),u(c(p.NButton),{class:"inline m-2",onClick:a[3]||(a[3]=()=>{r.value!==void 0&&g(m.value,r.value)})},{default:A(()=>[b("更新")]),_:1})]),u(c(U),{option:C.value,style:O(`height: ${m.value.length*3+18}rem`),autoresize:"",ref_key:"chartRef",ref:_},null,8,["option","style"]),ee,t("div",null,[(f(!0),h(P,null,R(x.value,({name:l,url:k})=>(f(),h("span",null,[t("a",{class:"text-slate-800 hover:text-sky-900 underline",href:k},V(l),9,ae),b("， ")]))),256))])]))}});export{oe as default};