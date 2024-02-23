import{i as b,p as v,m as c,q as k,f as y,d as u,aD as x,j as o,T as _,v as $}from"./index-73e16628.js";import{d,o as B,a as C,b as n,p as S}from"./light-07aa199c.js";import{i as f}from"./is-browser-fc34c9a6.js";const m=y("n-form-item");function L(e,{defaultSize:r="medium",mergedSize:a,mergedDisabled:s}={}){const t=b(m,null);v(m,null);const i=c(a?()=>a(t):()=>{const{size:l}=e;if(l)return l;if(t){const{mergedSize:g}=t;if(g.value!==void 0)return g.value}return r}),w=c(s?()=>s(t):()=>{const{disabled:l}=e;return l!==void 0?l:t?t.disabled.value:!1}),p=c(()=>{const{status:l}=e;return l||(t==null?void 0:t.mergedValidationStatus.value)});return k(()=>{t&&t.restoreValidation()}),{mergedSizeRef:i,mergedDisabledRef:w,mergedStatusRef:p,nTriggerFormBlur(){t&&t.handleContentBlur()},nTriggerFormChange(){t&&t.handleContentChange()},nTriggerFormFocus(){t&&t.handleContentFocus()},nTriggerFormInput(){t&&t.handleContentInput()}}}const I=u({name:"BaseIconSwitchTransition",setup(e,{slots:r}){const a=x();return()=>o(_,{name:"icon-switch-transition",appear:a.value},r)}}),{cubicBezierEaseInOut:F}=B;function h({originalTransform:e="",left:r=0,top:a=0,transition:s=`all .3s ${F} !important`}={}){return[d("&.icon-switch-transition-enter-from, &.icon-switch-transition-leave-to",{transform:e+" scale(0.75)",left:r,top:a,opacity:0}),d("&.icon-switch-transition-enter-to, &.icon-switch-transition-leave-from",{transform:`scale(1) ${e}`,left:r,top:a,opacity:1}),d("&.icon-switch-transition-enter-active, &.icon-switch-transition-leave-active",{transformOrigin:"center",position:"absolute",left:r,top:a,transition:s})]}const T=d([d("@keyframes loading-container-rotate",`
 to {
 -webkit-transform: rotate(360deg);
 transform: rotate(360deg);
 }
 `),d("@keyframes loading-layer-rotate",`
 12.5% {
 -webkit-transform: rotate(135deg);
 transform: rotate(135deg);
 }
 25% {
 -webkit-transform: rotate(270deg);
 transform: rotate(270deg);
 }
 37.5% {
 -webkit-transform: rotate(405deg);
 transform: rotate(405deg);
 }
 50% {
 -webkit-transform: rotate(540deg);
 transform: rotate(540deg);
 }
 62.5% {
 -webkit-transform: rotate(675deg);
 transform: rotate(675deg);
 }
 75% {
 -webkit-transform: rotate(810deg);
 transform: rotate(810deg);
 }
 87.5% {
 -webkit-transform: rotate(945deg);
 transform: rotate(945deg);
 }
 100% {
 -webkit-transform: rotate(1080deg);
 transform: rotate(1080deg);
 } 
 `),d("@keyframes loading-left-spin",`
 from {
 -webkit-transform: rotate(265deg);
 transform: rotate(265deg);
 }
 50% {
 -webkit-transform: rotate(130deg);
 transform: rotate(130deg);
 }
 to {
 -webkit-transform: rotate(265deg);
 transform: rotate(265deg);
 }
 `),d("@keyframes loading-right-spin",`
 from {
 -webkit-transform: rotate(-265deg);
 transform: rotate(-265deg);
 }
 50% {
 -webkit-transform: rotate(-130deg);
 transform: rotate(-130deg);
 }
 to {
 -webkit-transform: rotate(-265deg);
 transform: rotate(-265deg);
 }
 `),C("base-loading",`
 position: relative;
 line-height: 0;
 width: 1em;
 height: 1em;
 `,[n("transition-wrapper",`
 position: absolute;
 width: 100%;
 height: 100%;
 `,[h()]),n("container",`
 display: inline-flex;
 position: relative;
 direction: ltr;
 line-height: 0;
 animation: loading-container-rotate 1568.2352941176ms linear infinite;
 font-size: 0;
 letter-spacing: 0;
 white-space: nowrap;
 opacity: 1;
 width: 100%;
 height: 100%;
 `,[n("svg",`
 stroke: var(--n-text-color);
 fill: transparent;
 position: absolute;
 height: 100%;
 overflow: hidden;
 `),n("container-layer",`
 position: absolute;
 width: 100%;
 height: 100%;
 animation: loading-layer-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;
 `,[n("container-layer-left",`
 display: inline-flex;
 position: relative;
 width: 50%;
 height: 100%;
 overflow: hidden;
 `,[n("svg",`
 animation: loading-left-spin 1333ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;
 width: 200%;
 `)]),n("container-layer-patch",`
 position: absolute;
 top: 0;
 left: 47.5%;
 box-sizing: border-box;
 width: 5%;
 height: 100%;
 overflow: hidden;
 `,[n("svg",`
 left: -900%;
 width: 2000%;
 transform: rotate(180deg);
 `)]),n("container-layer-right",`
 display: inline-flex;
 position: relative;
 width: 50%;
 height: 100%;
 overflow: hidden;
 `,[n("svg",`
 animation: loading-right-spin 1333ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;
 left: -100%;
 width: 200%;
 `)])])]),n("placeholder",`
 position: absolute;
 left: 50%;
 top: 50%;
 transform: translateX(-50%) translateY(-50%);
 `,[h({left:"50%",top:"50%",originalTransform:"translateX(-50%) translateY(-50%)"})])])]),z={strokeWidth:{type:Number,default:28},stroke:{type:String,default:void 0}},O=u({name:"BaseLoading",props:Object.assign({clsPrefix:{type:String,required:!0},show:{type:Boolean,default:!0},scale:{type:Number,default:1},radius:{type:Number,default:100}},z),setup(e){S("-base-loading",T,$(e,"clsPrefix"))},render(){const{clsPrefix:e,radius:r,strokeWidth:a,stroke:s,scale:t}=this,i=r/t;return o("div",{class:`${e}-base-loading`,role:"img","aria-label":"loading"},o(I,null,{default:()=>this.show?o("div",{key:"icon",class:`${e}-base-loading__transition-wrapper`},o("div",{class:`${e}-base-loading__container`},o("div",{class:`${e}-base-loading__container-layer`},o("div",{class:`${e}-base-loading__container-layer-left`},o("svg",{class:`${e}-base-loading__svg`,viewBox:`0 0 ${2*i} ${2*i}`,xmlns:"http://www.w3.org/2000/svg",style:{color:s}},o("circle",{fill:"none",stroke:"currentColor","stroke-width":a,"stroke-linecap":"round",cx:i,cy:i,r:r-a/2,"stroke-dasharray":4.91*r,"stroke-dashoffset":2.46*r}))),o("div",{class:`${e}-base-loading__container-layer-patch`},o("svg",{class:`${e}-base-loading__svg`,viewBox:`0 0 ${2*i} ${2*i}`,xmlns:"http://www.w3.org/2000/svg",style:{color:s}},o("circle",{fill:"none",stroke:"currentColor","stroke-width":a,"stroke-linecap":"round",cx:i,cy:i,r:r-a/2,"stroke-dasharray":4.91*r,"stroke-dashoffset":2.46*r}))),o("div",{class:`${e}-base-loading__container-layer-right`},o("svg",{class:`${e}-base-loading__svg`,viewBox:`0 0 ${2*i} ${2*i}`,xmlns:"http://www.w3.org/2000/svg",style:{color:s}},o("circle",{fill:"none",stroke:"currentColor","stroke-width":a,"stroke-linecap":"round",cx:i,cy:i,r:r-a/2,"stroke-dasharray":4.91*r,"stroke-dashoffset":2.46*r})))))):o("div",{key:"placeholder",class:`${e}-base-loading__placeholder`},this.$slots)}))}}),N=f&&"chrome"in window;f&&navigator.userAgent.includes("Firefox");const V=f&&navigator.userAgent.includes("Safari")&&!N;export{O as N,h as a,I as b,m as f,V as i,L as u};
