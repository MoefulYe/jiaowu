import{f as b,N as h,a as p,G as r,m as y}from"./profile-4fba4efc.js";import{N as s,a as g,b as B}from"./FormItem-b3ed5420.js";import{N as n}from"./Input-9d263a23.js";import{d as w,X as k,r as V,aj as x,o as F,Y as R,a,w as o,u as e,b as d,a8 as v,a1 as U,N as I,Z as P}from"./index-04563116.js";const Z={class:"flex justify-end"},z={email:[{pattern:/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,message:"请输入正确的邮箱",trigger:"blur"}]},j=w({__name:"basic-info-form",props:{fetchProfile:{type:Boolean,default:!1}},emits:["complete"],setup(c,{emit:N}){const f=c,i=k(),l=V({}),_=async()=>{try{await i.value.validate(),await y(l.value),f.fetchProfile&&window.$message.success("修改成功"),N("complete")}catch{}};return x(()=>{f.fetchProfile&&b().then(m=>l.value=m)}),(m,t)=>(F(),R(P,null,[a(e(B),{ref_key:"formRef",ref:i,model:l.value,rules:z,class:"p-2"},{default:o(()=>[a(e(s),{label:"学号",path:"code"},{default:o(()=>[a(e(n),{value:l.value.code,"onUpdate:value":t[0]||(t[0]=u=>l.value.code=u),placeholder:"输入学号"},null,8,["value"])]),_:1}),a(e(s),{label:"姓名",path:"name"},{default:o(()=>[a(e(n),{value:l.value.name,"onUpdate:value":t[1]||(t[1]=u=>l.value.name=u),placeholder:"输入姓名"},null,8,["value"])]),_:1}),a(e(s),{label:"性别",path:"gender"},{default:o(()=>[a(e(h),{value:l.value.gender,"onUpdate:value":t[2]||(t[2]=u=>l.value.gender=u)},{default:o(()=>[a(e(p),{value:e(r).Female},{default:o(()=>[d(v(e(r).Female),1)]),_:1},8,["value"]),a(e(p),{value:e(r).Male},{default:o(()=>[d(v(e(r).Male),1)]),_:1},8,["value"])]),_:1},8,["value"])]),_:1}),a(e(s),{label:"出生日期",path:"birthday"},{default:o(()=>[a(e(g),{formattedValue:l.value.birthday,"onUpdate:formattedValue":t[3]||(t[3]=u=>l.value.birthday=u)},null,8,["formattedValue"])]),_:1}),a(e(s),{label:"邮箱",path:"email"},{default:o(()=>[a(e(n),{value:l.value.email,"onUpdate:value":t[4]||(t[4]=u=>l.value.email=u),placeholder:"输入邮箱"},null,8,["value"])]),_:1})]),_:1},8,["model"]),U("div",Z,[a(e(I),{onClick:_},{default:o(()=>[d("提交表单")]),_:1})])],64))}});export{j as _};
