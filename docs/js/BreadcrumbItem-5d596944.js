import{f as P,z as m,B as s,C as T,A as u,d as g,m as y,K as C,p as H,F as j,v as p,L as S,q as v,k as $,r as E,x as I,eh as _,ay as A,i as O,ar as w}from"./index-a8223b55.js";const N={fontWeightActive:"400"},V=e=>{const{fontSize:o,textColor3:r,textColor2:a,borderRadius:n,buttonColor2Hover:t,buttonColor2Pressed:c}=e;return Object.assign(Object.assign({},N),{fontSize:o,itemLineHeight:"1.25",itemTextColor:r,itemTextColorHover:a,itemTextColorPressed:a,itemTextColorActive:a,itemBorderRadius:n,itemColorHover:t,itemColorPressed:c,separatorColor:r})},K={name:"Breadcrumb",common:P,self:V},F=K,M=m("breadcrumb",`
 white-space: nowrap;
 cursor: default;
 line-height: var(--n-item-line-height);
`,[s("ul",`
 list-style: none;
 padding: 0;
 margin: 0;
 `),s("a",`
 color: inherit;
 text-decoration: inherit;
 `),m("breadcrumb-item",`
 font-size: var(--n-font-size);
 transition: color .3s var(--n-bezier);
 display: inline-flex;
 align-items: center;
 `,[m("icon",`
 font-size: 18px;
 vertical-align: -.2em;
 transition: color .3s var(--n-bezier);
 color: var(--n-item-text-color);
 `),s("&:not(:last-child)",[T("clickable",[u("link",`
 cursor: pointer;
 `,[s("&:hover",`
 background-color: var(--n-item-color-hover);
 `),s("&:active",`
 background-color: var(--n-item-color-pressed); 
 `)])])]),u("link",`
 padding: 4px;
 border-radius: var(--n-item-border-radius);
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 color: var(--n-item-text-color);
 position: relative;
 `,[s("&:hover",`
 color: var(--n-item-text-color-hover);
 `,[m("icon",`
 color: var(--n-item-text-color-hover);
 `)]),s("&:active",`
 color: var(--n-item-text-color-pressed);
 `,[m("icon",`
 color: var(--n-item-text-color-pressed);
 `)])]),u("separator",`
 margin: 0 8px;
 color: var(--n-separator-color);
 transition: color .3s var(--n-bezier);
 user-select: none;
 -webkit-user-select: none;
 `),s("&:last-child",[u("link",`
 font-weight: var(--n-font-weight-active);
 cursor: unset;
 color: var(--n-item-text-color-active);
 `,[m("icon",`
 color: var(--n-item-text-color-active);
 `)]),u("separator",`
 display: none;
 `)])])]),x=$("n-breadcrumb"),q=Object.assign(Object.assign({},C.props),{separator:{type:String,default:"/"}}),J=g({name:"Breadcrumb",props:q,setup(e){const{mergedClsPrefixRef:o,inlineThemeDisabled:r}=y(e),a=C("Breadcrumb","-breadcrumb",M,F,e,o);H(x,{separatorRef:j(e,"separator"),mergedClsPrefixRef:o});const n=p(()=>{const{common:{cubicBezierEaseInOut:c},self:{separatorColor:d,itemTextColor:i,itemTextColorHover:l,itemTextColorPressed:b,itemTextColorActive:h,fontSize:f,fontWeightActive:k,itemBorderRadius:B,itemColorHover:R,itemColorPressed:z,itemLineHeight:L}}=a.value;return{"--n-font-size":f,"--n-bezier":c,"--n-item-text-color":i,"--n-item-text-color-hover":l,"--n-item-text-color-pressed":b,"--n-item-text-color-active":h,"--n-separator-color":d,"--n-item-color-hover":R,"--n-item-color-pressed":z,"--n-item-border-radius":B,"--n-font-weight-active":k,"--n-item-line-height":L}}),t=r?S("breadcrumb",void 0,n,e):void 0;return{mergedClsPrefix:o,cssVars:r?void 0:n,themeClass:t==null?void 0:t.themeClass,onRender:t==null?void 0:t.onRender}},render(){var e;return(e=this.onRender)===null||e===void 0||e.call(this),v("nav",{class:[`${this.mergedClsPrefix}-breadcrumb`,this.themeClass],style:this.cssVars,"aria-label":"Breadcrumb"},v("ul",null,this.$slots))}}),D=(e=A?window:null)=>{const o=()=>{const{hash:n,host:t,hostname:c,href:d,origin:i,pathname:l,port:b,protocol:h,search:f}=(e==null?void 0:e.location)||{};return{hash:n,host:t,hostname:c,href:d,origin:i,pathname:l,port:b,protocol:h,search:f}},r=()=>{a.value=o()},a=E(o());return I(()=>{e&&(e.addEventListener("popstate",r),e.addEventListener("hashchange",r))}),_(()=>{e&&(e.removeEventListener("popstate",r),e.removeEventListener("hashchange",r))}),a},U={separator:String,href:String,clickable:{type:Boolean,default:!0},onClick:Function},Q=g({name:"BreadcrumbItem",props:U,setup(e,{slots:o}){const r=O(x,null);if(!r)return()=>null;const{separatorRef:a,mergedClsPrefixRef:n}=r,t=D(),c=p(()=>e.href?"a":"span"),d=p(()=>t.value.href===e.href?"location":null);return()=>{const{value:i}=n;return v("li",{class:[`${i}-breadcrumb-item`,e.clickable&&`${i}-breadcrumb-item--clickable`]},v(c.value,{class:`${i}-breadcrumb-item__link`,"aria-current":d.value,href:e.href,onClick:e.onClick},o),v("span",{class:`${i}-breadcrumb-item__separator`,"aria-hidden":"true"},w(o.separator,()=>{var l;return[(l=e.separator)!==null&&l!==void 0?l:a.value]})))}}});export{J as N,Q as a};
