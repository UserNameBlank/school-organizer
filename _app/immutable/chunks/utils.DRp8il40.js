var Pt=Array.isArray,Lt=Array.from,Ft=Object.defineProperty,cn=Object.getOwnPropertyDescriptor,Qn=Object.getOwnPropertyDescriptors,Mt=Object.prototype,Ht=Array.prototype,nt=Object.getPrototypeOf;function Yt(n){return typeof n=="function"}const tt=()=>{};function jt(n){return n()}function En(n){for(var t=0;t<n.length;t++)n[t]()}const y=2,yn=4,Y=8,sn=16,A=32,W=64,R=128,V=256,p=512,x=1024,D=2048,b=4096,j=8192,rt=16384,wn=32768,Ut=65536,et=1<<18,Tn=1<<19,vn=Symbol("$state"),Bt=Symbol("legacy props"),Vt=Symbol("");function mn(n){return n===this.v}function st(n,t){return n!=n?t==t:n!==t||n!==null&&typeof n=="object"||typeof n=="function"}function Gt(n,t){return n!==t}function An(n){return!st(n,this.v)}function at(n){throw new Error("effect_in_teardown")}function ut(){throw new Error("effect_in_unowned_derived")}function lt(n){throw new Error("effect_orphan")}function ot(){throw new Error("effect_update_depth_exceeded")}function $t(){throw new Error("hydration_failed")}function Kt(n){throw new Error("props_invalid_value")}function Zt(){throw new Error("state_descriptors_fixed")}function Wt(){throw new Error("state_prototype_fixed")}function it(){throw new Error("state_unsafe_local_read")}function ft(){throw new Error("state_unsafe_mutation")}let X=!1;function Xt(){X=!0}function an(n){return{f:0,v:n,reactions:null,equals:mn,version:0}}function zt(n){return gn(an(n))}function _t(n,t=!1){var e;const r=an(n);return t||(r.equals=An),X&&i!==null&&i.l!==null&&((e=i.l).s??(e.s=[])).push(r),r}function Jt(n,t=!1){return gn(_t(n,t))}function gn(n){return o!==null&&o.f&y&&(m===null?Ot([n]):m.push(n)),n}function xn(n,t){return o!==null&&fn()&&o.f&(y|sn)&&(m===null||!m.includes(n))&&ft(),ct(n,t)}function ct(n,t){return n.equals(t)||(n.v=t,n.version=Gn(),In(n,x),fn()&&l!==null&&l.f&p&&!(l.f&A)&&(c!==null&&c.includes(n)?(T(l,x),z(l)):g===null?Rt([n]):g.push(n))),t}function In(n,t){var r=n.reactions;if(r!==null)for(var e=fn(),s=r.length,a=0;a<s;a++){var u=r[a],f=u.f;f&x||!e&&u===l||(T(u,t),f&(p|R)&&(f&y?In(u,D):z(u)))}}const Qt=1,nr=2,tr=4,rr=8,er=16,sr=1,ar=2,ur=4,lr=8,or=16,ir=1,fr=2,_r=4,cr=1,vr=2,vt="[",pt="[!",ht="]",Sn={},pr=Symbol(),hr="http://www.w3.org/2000/svg";function On(n){console.warn("hydration_mismatch")}let O=!1;function dr(n){O=n}let w;function F(n){if(n===null)throw On(),Sn;return w=n}function Er(){return F(k(w))}function yr(n){if(O){if(k(w)!==null)throw On(),Sn;w=n}}function wr(n=1){if(O){for(var t=n,r=w;t--;)r=k(r);w=r}}function Tr(){for(var n=0,t=w;;){if(t.nodeType===8){var r=t.data;if(r===ht){if(n===0)return t;n-=1}else(r===vt||r===pt)&&(n+=1)}var e=k(t);t.remove(),t=e}}var pn,dt,Rn,kn;function mr(){if(pn===void 0){pn=window,dt=document;var n=Element.prototype,t=Node.prototype;Rn=cn(t,"firstChild").get,kn=cn(t,"nextSibling").get,n.__click=void 0,n.__className="",n.__attributes=null,n.__styles=null,n.__e=void 0,Text.prototype.__t=void 0}}function Q(n=""){return document.createTextNode(n)}function nn(n){return Rn.call(n)}function k(n){return kn.call(n)}function Ar(n,t){if(!O)return nn(n);var r=nn(w);if(r===null)r=w.appendChild(Q());else if(t&&r.nodeType!==3){var e=Q();return r==null||r.before(e),F(e),e}return F(r),r}function gr(n,t){if(!O){var r=nn(n);return r instanceof Comment&&r.data===""?k(r):r}return w}function xr(n,t=1,r=!1){let e=O?w:n;for(var s;t--;)s=e,e=k(e);if(!O)return e;var a=e==null?void 0:e.nodeType;if(r&&a!==3){var u=Q();return e===null?s==null||s.after(u):e.before(u),F(u),u}return F(e),e}function Ir(n){n.textContent=""}function Et(n){var t=y|x;l===null?t|=R:l.f|=Tn;var r=o!==null&&o.f&y?o:null;const e={children:null,ctx:i,deps:null,equals:mn,f:t,fn:n,reactions:null,v:null,version:0,parent:r??l};return r!==null&&(r.children??(r.children=[])).push(e),e}function Sr(n){const t=Et(n);return t.equals=An,t}function Nn(n){var t=n.children;if(t!==null){n.children=null;for(var r=0;r<t.length;r+=1){var e=t[r];e.f&y?un(e):P(e)}}}function yt(n){for(var t=n.parent;t!==null;){if(!(t.f&y))return t;t=t.parent}return null}function Cn(n){var t,r=l;Z(yt(n));try{Nn(n),t=$n(n)}finally{Z(r)}return t}function bn(n){var t=Cn(n),r=(S||n.f&R)&&n.deps!==null?D:p;T(n,r),n.equals(t)||(n.v=t,n.version=Gn())}function un(n){Nn(n),H(n,0),T(n,j),n.v=n.children=n.deps=n.ctx=n.reactions=null}function Dn(n){l===null&&o===null&&lt(),o!==null&&o.f&R&&ut(),on&&at()}function wt(n,t){var r=t.last;r===null?t.last=t.first=n:(r.next=n,n.prev=r,t.last=n)}function q(n,t,r,e=!0){var s=(n&W)!==0,a=l,u={ctx:i,deps:null,deriveds:null,nodes_start:null,nodes_end:null,f:n|x,first:null,fn:t,last:null,next:null,parent:s?null:a,prev:null,teardown:null,transitions:null,version:0};if(r){var f=N;try{hn(!0),U(u),u.f|=rt}catch(_){throw P(u),_}finally{hn(f)}}else t!==null&&z(u);var E=r&&u.deps===null&&u.first===null&&u.nodes_start===null&&u.teardown===null&&(u.f&Tn)===0;if(!E&&!s&&e&&(a!==null&&wt(u,a),o!==null&&o.f&y)){var h=o;(h.children??(h.children=[])).push(u)}return u}function Or(){return o===null?!1:!S}function Rr(n){const t=q(Y,null,!1);return T(t,p),t.teardown=n,t}function kr(n){Dn();var t=l!==null&&(l.f&A)!==0&&i!==null&&!i.m;if(t){var r=i;(r.e??(r.e=[])).push({fn:n,effect:l,reaction:o})}else{var e=qn(n);return e}}function Nr(n){return Dn(),ln(n)}function Cr(n){const t=q(W,n,!0);return()=>{P(t)}}function qn(n){return q(yn,n,!1)}function br(n,t){var r=i,e={effect:null,ran:!1};r.l.r1.push(e),e.effect=ln(()=>{n(),!e.ran&&(e.ran=!0,xn(r.l.r2,!0),Jn(t))})}function Dr(){var n=i;ln(()=>{if(zn(n.l.r2)){for(var t of n.l.r1){var r=t.effect;r.f&p&&T(r,D),L(r)&&U(r),t.ran=!1}n.l.r2.v=!1}})}function ln(n){return q(Y,n,!0)}function qr(n){return Tt(n)}function Tt(n,t=0){return q(Y|sn|t,n,!0)}function Pr(n,t=!0){return q(Y|A,n,!0,t)}function Pn(n){var t=n.teardown;if(t!==null){const r=on,e=o;dn(!0),K(null);try{t.call(null)}finally{dn(r),K(e)}}}function Ln(n){var t=n.deriveds;if(t!==null){n.deriveds=null;for(var r=0;r<t.length;r+=1)un(t[r])}}function Fn(n,t=!1){var r=n.first;for(n.first=n.last=null;r!==null;){var e=r.next;P(r,t),r=e}}function mt(n){for(var t=n.first;t!==null;){var r=t.next;t.f&A||P(t),t=r}}function P(n,t=!0){var r=!1;if((t||n.f&et)&&n.nodes_start!==null){for(var e=n.nodes_start,s=n.nodes_end;e!==null;){var a=e===s?null:k(e);e.remove(),e=a}r=!0}Fn(n,t&&!r),Ln(n),H(n,0),T(n,j);var u=n.transitions;if(u!==null)for(const E of u)E.stop();Pn(n);var f=n.parent;f!==null&&f.first!==null&&Mn(n),n.next=n.prev=n.teardown=n.ctx=n.deps=n.parent=n.fn=n.nodes_start=n.nodes_end=null}function Mn(n){var t=n.parent,r=n.prev,e=n.next;r!==null&&(r.next=e),e!==null&&(e.prev=r),t!==null&&(t.first===n&&(t.first=e),t.last===n&&(t.last=r))}function Lr(n,t){var r=[];Hn(n,r,!0),At(r,()=>{P(n),t&&t()})}function At(n,t){var r=n.length;if(r>0){var e=()=>--r||t();for(var s of n)s.out(e)}else t()}function Hn(n,t,r){if(!(n.f&b)){if(n.f^=b,n.transitions!==null)for(const u of n.transitions)(u.is_global||r)&&t.push(u);for(var e=n.first;e!==null;){var s=e.next,a=(e.f&wn)!==0||(e.f&A)!==0;Hn(e,t,a?r:!1),e=s}}}function Fr(n){Yn(n,!0)}function Yn(n,t){if(n.f&b){L(n)&&U(n),n.f^=b;for(var r=n.first;r!==null;){var e=r.next,s=(r.f&wn)!==0||(r.f&A)!==0;Yn(r,s?t:!1),r=e}if(n.transitions!==null)for(const a of n.transitions)(a.is_global||t)&&a.in()}}const gt=typeof requestIdleCallback>"u"?n=>setTimeout(n,1):requestIdleCallback;let G=!1,$=!1,tn=[],rn=[];function jn(){G=!1;const n=tn.slice();tn=[],En(n)}function Un(){$=!1;const n=rn.slice();rn=[],En(n)}function Mr(n){G||(G=!0,queueMicrotask(jn)),tn.push(n)}function Hr(n){$||($=!0,gt(Un)),rn.push(n)}function xt(){G&&jn(),$&&Un()}function It(n){throw new Error("lifecycle_outside_component")}const Bn=0,St=1;let B=Bn,M=!1,N=!1,on=!1;function hn(n){N=n}function dn(n){on=n}let I=[],C=0;let o=null;function K(n){o=n}let l=null;function Z(n){l=n}let m=null;function Ot(n){m=n}let c=null,d=0,g=null;function Rt(n){g=n}let Vn=0,S=!1,i=null;function Gn(){return++Vn}function fn(){return!X||i!==null&&i.l===null}function L(n){var u,f;var t=n.f;if(t&x)return!0;if(t&D){var r=n.deps,e=(t&R)!==0;if(r!==null){var s;if(t&V){for(s=0;s<r.length;s++)((u=r[s]).reactions??(u.reactions=[])).push(n);n.f^=V}for(s=0;s<r.length;s++){var a=r[s];if(L(a)&&bn(a),e&&l!==null&&!S&&!((f=a==null?void 0:a.reactions)!=null&&f.includes(n))&&(a.reactions??(a.reactions=[])).push(n),a.version>n.version)return!0}}e||T(n,p)}return!1}function kt(n,t,r){throw n}function $n(n){var _n;var t=c,r=d,e=g,s=o,a=S,u=m,f=i,E=n.f;c=null,d=0,g=null,o=E&(A|W)?null:n,S=!N&&(E&R)!==0,m=null,i=n.ctx;try{var h=(0,n.fn)(),_=n.deps;if(c!==null){var v;if(H(n,d),_!==null&&d>0)for(_.length=d+c.length,v=0;v<c.length;v++)_[d+v]=c[v];else n.deps=_=c;if(!S)for(v=d;v<_.length;v++)((_n=_[v]).reactions??(_n.reactions=[])).push(n)}else _!==null&&d<_.length&&(H(n,d),_.length=d);return h}finally{c=t,d=r,g=e,o=s,S=a,m=u,i=f}}function Nt(n,t){let r=t.reactions;if(r!==null){var e=r.indexOf(n);if(e!==-1){var s=r.length-1;s===0?r=t.reactions=null:(r[e]=r[s],r.pop())}}r===null&&t.f&y&&(c===null||!c.includes(t))&&(T(t,D),t.f&(R|V)||(t.f^=V),H(t,0))}function H(n,t){var r=n.deps;if(r!==null)for(var e=t;e<r.length;e++)Nt(n,r[e])}function U(n){var t=n.f;if(!(t&j)){T(n,p);var r=l;l=n;try{t&sn?mt(n):Fn(n),Ln(n),Pn(n);var e=$n(n);n.teardown=typeof e=="function"?e:null,n.version=Vn}catch(s){kt(s)}finally{l=r}}}function Kn(){C>1e3&&(C=0,ot()),C++}function Zn(n){var t=n.length;if(t!==0){Kn();var r=N;N=!0;try{for(var e=0;e<t;e++){var s=n[e];s.f&p||(s.f^=p);var a=[];Wn(s,a),Ct(a)}}finally{N=r}}}function Ct(n){var t=n.length;if(t!==0)for(var r=0;r<t;r++){var e=n[r];!(e.f&(j|b))&&L(e)&&(U(e),e.deps===null&&e.first===null&&e.nodes_start===null&&(e.teardown===null?Mn(e):e.fn=null))}}function bt(){if(M=!1,C>1001)return;const n=I;I=[],Zn(n),M||(C=0)}function z(n){B===Bn&&(M||(M=!0,queueMicrotask(bt)));for(var t=n;t.parent!==null;){t=t.parent;var r=t.f;if(r&(W|A)){if(!(r&p))return;t.f^=p}}I.push(t)}function Wn(n,t){var r=n.first,e=[];n:for(;r!==null;){var s=r.f,a=(s&A)!==0,u=a&&(s&p)!==0;if(!u&&!(s&b))if(s&Y){a?r.f^=p:L(r)&&U(r);var f=r.first;if(f!==null){r=f;continue}}else s&yn&&e.push(r);var E=r.next;if(E===null){let v=r.parent;for(;v!==null;){if(n===v)break n;var h=v.next;if(h!==null){r=h;continue n}v=v.parent}}r=E}for(var _=0;_<e.length;_++)f=e[_],t.push(f),Wn(f,t)}function Xn(n){var t=B,r=I;try{Kn();const s=[];B=St,I=s,M=!1,Zn(r);var e=n==null?void 0:n();return xt(),(I.length>0||s.length>0)&&Xn(),C=0,e}finally{B=t,I=r}}async function Yr(){await Promise.resolve(),Xn()}function zn(n){var _;var t=n.f,r=(t&y)!==0;if(r&&t&j){var e=Cn(n);return un(n),e}if(o!==null){m!==null&&m.includes(n)&&it();var s=o.deps;c===null&&s!==null&&s[d]===n?d++:c===null?c=[n]:c.push(n),g!==null&&l!==null&&l.f&p&&!(l.f&A)&&g.includes(n)&&(T(l,x),z(l))}else if(r&&n.deps===null)for(var a=n,u=a.parent,f=a;u!==null;)if(u.f&y){var E=u;f=E,u=E.parent}else{var h=u;(_=h.deriveds)!=null&&_.includes(f)||(h.deriveds??(h.deriveds=[])).push(f);break}return r&&(a=n,L(a)&&bn(a)),n.v}function Jn(n){const t=o;try{return o=null,n()}finally{o=t}}const Dt=~(x|D|p);function T(n,t){n.f=n.f&Dt|t}function jr(n){return J().get(n)}function Ur(n,t){return J().set(n,t),t}function Br(n){return J().has(n)}function Vr(){return J()}function J(n){return i===null&&It(),i.c??(i.c=new Map(qt(i)||void 0))}function qt(n){let t=n.p;for(;t!==null;){const r=t.c;if(r!==null)return r;t=t.p}return null}function Gr(n,t=1){var r=+zn(n);return xn(n,r+t),r}function $r(n,t=!1,r){i={p:i,c:null,e:null,m:!1,s:n,x:null,l:null},X&&!t&&(i.l={s:null,u:null,r1:[],r2:an(!1)})}function Kr(n){const t=i;if(t!==null){n!==void 0&&(t.x=n);const u=t.e;if(u!==null){var r=l,e=o;t.e=null;try{for(var s=0;s<u.length;s++){var a=u[s];Z(a.effect),K(a.reaction),qn(a.fn)}}finally{Z(r),K(e)}}i=t.p,t.m=!0}return n||{}}function Zr(n){if(!(typeof n!="object"||!n||n instanceof EventTarget)){if(vn in n)en(n);else if(!Array.isArray(n))for(let t in n){const r=n[t];typeof r=="object"&&r&&vn in r&&en(r)}}}function en(n,t=new Set){if(typeof n=="object"&&n!==null&&!(n instanceof EventTarget)&&!t.has(n)){t.add(n),n instanceof Date&&n.getTime();for(let e in n)try{en(n[e],t)}catch{}const r=nt(n);if(r!==Object.prototype&&r!==Array.prototype&&r!==Map.prototype&&r!==Set.prototype&&r!==Date.prototype){const e=Qn(r);for(let s in e){const a=e[s].get;if(a)try{a.call(n)}catch{}}}}}function Wr(n,t,r){if(n==null)return t(void 0),r&&r(void 0),tt;const e=Jn(()=>n.subscribe(t,r));return e.unsubscribe?()=>e.unsubscribe():e}export{Gr as $,Lr as A,w as B,Mr as C,It as D,wn as E,X as F,Mt as G,Ht as H,an as I,Zt as J,xn as K,cn as L,l as M,Wt as N,nt as O,Pt as P,Fr as Q,pt as R,vn as S,Tr as T,pr as U,F as V,dr as W,Kt as X,Ut as Y,ur as Z,An as _,ln as a,Vr as a$,Yt as a0,Bt as a1,A as a2,W as a3,Z as a4,sr as a5,ar as a6,lr as a7,Sr as a8,or as a9,br as aA,Dr as aB,dt as aC,sn as aD,rt as aE,ir as aF,fr as aG,_r as aH,fn as aI,Ur as aJ,Br as aK,jr as aL,b as aM,Qt as aN,ct as aO,nr as aP,Hn as aQ,At as aR,tr as aS,rr as aT,er as aU,hr as aV,Hr as aW,Vt as aX,Qn as aY,Gt as aZ,Or as a_,_t as aa,Xn as ab,Ft as ac,Yr as ad,zt as ae,Q as af,nn as ag,cr as ah,vr as ai,Rr as aj,K as ak,o as al,et as am,vt as an,k as ao,mr as ap,Sn as aq,ht as ar,On as as,$t as at,Ir as au,Lt as av,Cr as aw,wr as ax,P as ay,Jt as az,st as b,Ar as c,Zr as d,qn as e,gr as f,Nr as g,O as h,kr as i,i as j,jt as k,En as l,zn as m,Et as n,Xt as o,Wr as p,tt as q,yr as r,xr as s,$r as t,Jn as u,qr as v,Kr as w,Tt as x,Pr as y,Er as z};