import{p as _,q as l,l as w,b as m}from"./utils.DRp8il40.js";const a=[];function x(t,s){return{subscribe:z(t,s).subscribe}}function z(t,s=l){let n=null;const o=new Set;function i(r){if(m(t,r)&&(t=r,n)){const u=!a.length;for(const e of o)e[1](),a.push(e,t);if(u){for(let e=0;e<a.length;e+=2)a[e][0](a[e+1]);a.length=0}}}function f(r){i(r(t))}function b(r,u=l){const e=[r,u];return o.add(e),o.size===1&&(n=s(i,f)||l),r(t),()=>{o.delete(e),o.size===0&&n&&(n(),n=null)}}return{set:i,update:f,subscribe:b}}function v(t,s,n){const o=!Array.isArray(t),i=o?[t]:t;if(!i.every(Boolean))throw new Error("derived() expects stores as input, got a falsy value");const f=s.length<2;return x(n,(b,r)=>{let u=!1;const e=[];let p=0,d=l;const y=()=>{if(p)return;d();const c=s(o?e[0]:e,b,r);f?b(c):d=typeof c=="function"?c:l},h=i.map((c,g)=>_(c,q=>{e[g]=q,p&=~(1<<g),u&&y()},()=>{p|=1<<g}));return u=!0,y(),function(){w(h),d(),u=!1}})}function B(t){let s;return _(t,n=>s=n)(),s}export{v as d,B as g,z as w};