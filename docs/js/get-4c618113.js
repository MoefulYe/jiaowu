import{k as f,i as s,fd as h,fc as b,fb as g,r as I,x as E,U as x,y as M,W as T,an as _,eT as d,de as p,eX as m,t as $}from"./index-3ae6663b.js";const C=/^(\d|\.)+$/,l=/(\d|\.)+/;function Z(e,{c:n=1,offset:r=0,attachPx:t=!0}={}){if(typeof e=="number"){const u=(e+r)*n;return u===0?"0":`${u}px`}else if(typeof e=="string")if(C.test(e)){const u=(Number(e)+r)*n;return t?u===0?"0":`${u}px`:`${u}`}else{const u=l.exec(e);return u?e.replace(l,String((Number(u[0])+r)*n)):e}return e}const G=f("n-internal-select-menu"),K=f("n-internal-select-menu-body"),y="__disabled__";function v(e){const n=s(h,null),r=s(b,null),t=s(g,null),u=s(K,null),o=I();if(typeof document<"u"){o.value=document.fullscreenElement;const a=()=>{o.value=document.fullscreenElement};E(()=>{x("fullscreenchange",document,a)}),M(()=>{T("fullscreenchange",document,a)})}return _(()=>{var a;const{to:i}=e;return i!==void 0?i===!1?y:i===!0?o.value||"body":i:n!=null&&n.value?(a=n.value.$el)!==null&&a!==void 0?a:n.value:r!=null&&r.value?r.value:t!=null&&t.value?t.value:u!=null&&u.value?u.value:i??(o.value||"body")})}v.tdkey=y;v.propTo={type:[String,Object,Boolean],default:void 0};var w=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,N=/^\w*$/;function P(e,n){if(d(e))return!1;var r=typeof e;return r=="number"||r=="symbol"||r=="boolean"||e==null||p(e)?!0:N.test(e)||!w.test(e)||n!=null&&e in Object(n)}var S="Expected a function";function c(e,n){if(typeof e!="function"||n!=null&&typeof n!="function")throw new TypeError(S);var r=function(){var t=arguments,u=n?n.apply(this,t):t[0],o=r.cache;if(o.has(u))return o.get(u);var a=e.apply(this,t);return r.cache=o.set(u,a)||o,a};return r.cache=new(c.Cache||m),r}c.Cache=m;var B=500;function R(e){var n=c(e,function(t){return r.size===B&&r.clear(),t}),r=n.cache;return n}var j=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,z=/\\(\\)?/g,A=R(function(e){var n=[];return e.charCodeAt(0)===46&&n.push(""),e.replace(j,function(r,t,u,o){n.push(u?o.replace(z,"$1"):t||r)}),n});const O=A;function k(e,n){return d(e)?e:P(e,n)?[e]:O($(e))}var F=1/0;function U(e){if(typeof e=="string"||p(e))return e;var n=e+"";return n=="0"&&1/e==-F?"-0":n}function X(e,n){n=k(n,e);for(var r=0,t=n.length;e!=null&&r<t;)e=e[U(n[r++])];return r&&r==t?e:void 0}function L(e,n,r){var t=e==null?void 0:X(e,n);return t===void 0?r:t}export{K as a,P as b,k as c,X as d,Z as f,L as g,G as i,U as t,v as u};