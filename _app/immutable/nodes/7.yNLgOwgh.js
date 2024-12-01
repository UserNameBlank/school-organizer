var ft=Object.defineProperty;var Je=s=>{throw TypeError(s)};var vt=(s,e,r)=>e in s?ft(s,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):s[e]=r;var Ke=(s,e,r)=>vt(s,typeof e!="symbol"?e+"":e,r),Fe=(s,e,r)=>e.has(s)||Je("Cannot "+r);var R=(s,e,r)=>(Fe(s,e,"read from private field"),r?r.call(s):e.get(s)),le=(s,e,r)=>e.has(s)?Je("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(s):e.set(s,r),xe=(s,e,r,n)=>(Fe(s,e,"write to private field"),n?n.call(s,r):e.set(s,r),r);import{c as v,a as t,t as p,s as pt,d as B,b as Ge}from"../chunks/disclose-version.BXtJ1W0_.js";import{n as fe,m as a,t as ze,f as o,v as m,w as je,c as S,q as gt,r as w,i as _t,K as H,ae as $e,s as y,ax as Q}from"../chunks/utils.DRp8il40.js";import{d as mt,s as x}from"../chunks/render.Bx7icutD.js";import{p as k,i as te,r as Be,l as rt,s as Te,a as Oe}from"../chunks/preload-helper.CTy181sv.js";import{h as bt,I as at,s as ot,f as nt,g as xt,e as he,i as Pe,t as ye,c as He,$ as $t,D as Qe,b as Ue,l as ht}from"../chunks/Icon.Or52Z2gw.js";import{c as i}from"../chunks/index-client.C_rSk1z8.js";import{B as We,t as Pt,s as yt}from"../chunks/button.Dwhqgdok.js";import{e as wt,D as St,P as kt,a as Dt,b as Xe,c as Ye,d as Ze,C as et}from"../chunks/index.C6vi1jOl.js";import{R as zt,S as jt,a as Tt,b as Rt}from"../chunks/index.wRWGiU-J.js";import{u as Ct,i as It,j as Nt,k as Ot,a as Bt,n as Vt,b as we,s as tt,m as qt,l as At}from"../chunks/index.Benk73TA.js";import"../chunks/legacy.B_at4KoE.js";const Lt="data-toggle-root";var ue,pe,se,Se,ke,De;class Mt{constructor(e){le(this,ue);le(this,pe);le(this,se);Ke(this,"pressed");le(this,Se,()=>{R(this,se).current||(this.pressed.current=!this.pressed.current)});le(this,ke,()=>{R(this,se).current||R(this,Se).call(this)});le(this,De,fe(()=>({[Lt]:"",id:R(this,ue).current,"data-disabled":It(R(this,se).current),"aria-pressed":Nt(this.pressed.current),"data-state":Jt(this.pressed.current),disabled:Ot(R(this,se).current),onclick:R(this,ke)})));xe(this,se,e.disabled),this.pressed=e.pressed,xe(this,ue,e.id),xe(this,pe,e.ref),Ct({id:R(this,ue),ref:R(this,pe)})}get props(){return a(R(this,De))}}ue=new WeakMap,pe=new WeakMap,se=new WeakMap,Se=new WeakMap,ke=new WeakMap,De=new WeakMap;function Et(s){return new Mt(s)}function Jt(s){return s?"on":"off"}var Kt=p("<button><!></button>");function Ft(s,e){ze(e,!0);let r=k(e,"ref",15,null),n=k(e,"id",19,Bt),$=k(e,"pressed",15,!1),b=k(e,"onPressedChange",3,Vt),l=k(e,"disabled",3,!1),c=k(e,"type",3,"button"),h=k(e,"controlledPressed",3,!1),V=Be(e,["$$slots","$$events","$$legacy","ref","id","pressed","onPressedChange","disabled","type","controlledPressed","children","child"]);const re=Et({pressed:we.with(()=>$(),D=>{h()||$(D),b()(D)}),disabled:we.with(()=>l()??!1),id:we.with(()=>n()),ref:we.with(()=>r(),D=>r(D))}),de=fe(()=>qt(V,re.props,{type:c()}));var U=v(),Re=o(U);te(Re,()=>e.child,D=>{var q=v(),ae=o(q);tt(ae,()=>e.child,()=>({props:a(de),pressed:re.pressed.current})),t(D,q)},D=>{var q=Kt();let ae;var ge=S(q);tt(ge,()=>e.children??gt,()=>({pressed:re.pressed.current})),w(q),m(()=>ae=bt(q,ae,{...a(de)})),t(D,q)}),t(s,U),je()}function Gt(s,e){const r=rt(e,["children","$$slots","$$events","$$legacy"]);at(s,Te({name:"pencil-off"},()=>r,{iconNode:[["path",{d:"m10 10-6.157 6.162a2 2 0 0 0-.5.833l-1.322 4.36a.5.5 0 0 0 .622.624l4.358-1.323a2 2 0 0 0 .83-.5L14 13.982"}],["path",{d:"m12.829 7.172 4.359-4.346a1 1 0 1 1 3.986 3.986l-4.353 4.353"}],["path",{d:"m15 5 4 4"}],["path",{d:"m2 2 20 20"}]],children:($,b)=>{var l=v(),c=o(l);ot(c,e,"default",{},null),t($,l)},$$slots:{default:!0}}))}function Ht(s,e){const r=rt(e,["children","$$slots","$$events","$$legacy"]);at(s,Te({name:"pencil"},()=>r,{iconNode:[["path",{d:"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"}],["path",{d:"m15 5 4 4"}]],children:($,b)=>{var l=v(),c=o(l);ot(c,e,"default",{},null),t($,l)},$$slots:{default:!0}}))}function st(s,e){ze(e,!0);let r=k(e,"ref",15,null),n=Be(e,["$$slots","$$events","$$legacy","ref","class"]);var $=v(),b=o($),l=fe(()=>nt("text-muted-foreground text-sm",e.class));i(b,()=>wt,(c,h)=>{h(c,Te({get ref(){return r()},set ref(V){r(V)},get class(){return a(l)}},()=>n))}),t(s,$),je()}const Qt=At({base:"ring-offset-background hover:bg-muted hover:text-muted-foreground focus-visible:ring-ring data-[state=on]:bg-accent data-[state=on]:text-accent-foreground inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",variants:{variant:{default:"bg-transparent",outline:"border-input hover:bg-accent hover:text-accent-foreground border bg-transparent"},size:{default:"h-10 min-w-10 px-3",sm:"h-9 min-w-9 px-2.5",lg:"h-11 min-w-11 px-5"}},defaultVariants:{variant:"default",size:"default"}});function Ut(s,e){ze(e,!0);let r=k(e,"ref",15,null),n=k(e,"pressed",15,!1),$=k(e,"size",3,"default"),b=k(e,"variant",3,"default"),l=Be(e,["$$slots","$$events","$$legacy","ref","pressed","class","size","variant"]);var c=v(),h=o(c),V=fe(()=>nt(Qt({variant:b(),size:$(),className:e.class})));i(h,()=>Ft,(re,de)=>{de(re,Te({get ref(){return r()},set ref(U){r(U)},get pressed(){return n()},set pressed(U){n(U)},get class(){return a(V)}},()=>l))}),t(s,c),je()}var Wt=p("<p> </p>"),Xt=p('<button class="flex items-center justify-center rounded-md bg-gray-500 text-xl font-semibold active:bg-accent"> </button>'),Yt=p('<button class="dotted-outline flex items-center justify-center rounded-md active:bg-accent svelte-r4gedx"><!></button>'),Zt=p('<div class="flex items-center justify-center rounded-md bg-blue-500 p-4 text-xl font-semibold"> </div>'),es=p("<div></div>"),ts=p("<!> <!>",1),ss=p("<!> <!>",1),rs=p("<!> <!>",1),as=p("<!> <!>",1),os=p("<span> </span>"),ns=p("<!> <!>",1),ls=p('<!> <div class="p-4"><!></div> <!> <!>',1),ds=p('<div class="flex h-[1800px] min-w-[1200px] flex-col"><div class="sticky top-0 z-10 h-min w-full border-b-[1px] border-accent bg-background pl-20"><div class="flex flex-row justify-around p-4"></div></div> <div class="flex flex-1"><div class="sticky start-0 flex w-20 flex-col items-center justify-around border-r-[1px] border-accent bg-background"><p class="text-sm text-accent-foreground"><span class="text-lg font-bold">1</span> 7:50</p> <p class="text-sm text-accent-foreground"><span class="text-lg font-bold">2</span> 8:40</p> <p class="text-sm text-accent-foreground"><span class="text-lg font-bold">3</span> 9:40</p> <p class="text-sm text-accent-foreground"><span class="text-lg font-bold">4</span> 10:30</p> <p class="text-sm text-accent-foreground"><span class="text-lg font-bold">5</span> 11:30</p> <p class="text-sm text-accent-foreground"><span class="text-lg font-bold">6</span> 12:20</p> <p class="text-sm text-accent-foreground"><span class="text-lg font-bold">7</span> 13:10</p> <p class="text-sm text-accent-foreground"><span class="text-lg font-bold">8</span> 14:00</p> <p class="text-sm text-accent-foreground"><span class="text-lg font-bold">9</span> 14:45</p> <p class="text-sm text-accent-foreground"><span class="text-lg font-bold">10</span> 15:30</p> <p class="text-sm text-accent-foreground"><span class="text-lg font-bold">11</span> 16:15</p> <p class="text-sm text-accent-foreground"><span class="text-lg font-bold">12</span> 17:00</p></div>             <div class="grid flex-1 grid-cols-5 grid-rows-12 gap-4 p-4"><!></div></div></div> <!>',1),is=p('<div class="fixed bottom-0 left-0 right-0 bg-black/60 py-4 text-center text-xl font-semibold"> </div>'),cs=p("<!> <!> <!>",1);function ws(s,e){ze(e,!0);const r=pt(),n=()=>Ge($t,"$t",r),$=()=>Ge(ht,"$json",r);_t(()=>{xt.currentTab=n()("titles.timetable")});let b=$e(!1),l=$e(!1),c=null,h=$e(null),V=$e(!1);function re(P){c=P,H(V,!1),H(l,!0)}function de(P){c=P,H(V,!0),H(l,!0)}function U(){H(l,!1),ye[c]=null,Qe.clearTimetableSlot({id:c})}async function Re(){a(h)&&(H(l,!1),ye[c]=a(h),Qe.setTimetableSlot({id:c,subjectId:a(h).id}))}function D(P){const A=He.get(parseInt(P));H(h,Oe(A))}let q=fe(()=>$()("timetable.days"));var ae=cs(),ge=o(ae);i(ge,()=>St,(P,A)=>{A(P,{get open(){return a(l)},set open(W){H(l,Oe(W))},children:(W,qe)=>{var ie=ds(),Ce=o(ie),Ie=S(Ce),Ae=S(Ie);he(Ae,21,()=>a(q),Pe,(oe,L)=>{var M=Wt(),ce=S(M,!0);w(M),m(()=>x(ce,a(L))),t(oe,M)}),w(Ae),w(Ie);var Le=y(Ie,2),Me=y(S(Le),2),dt=S(Me);te(dt,()=>a(b),oe=>{var L=v(),M=o(L);he(M,17,()=>ye,Pe,(ce,E,ne)=>{var X=v(),z=o(X);te(z,()=>a(E),g=>{var _=Xt();_.__click=()=>de(ne);var J=S(_,!0);w(_),m(()=>x(J,a(E).name)),t(g,_)},g=>{var _=Yt();_.__click=()=>re(ne);var J=S(_);kt(J,{}),w(_),t(g,_)}),t(ce,X)}),t(oe,L)},oe=>{var L=v(),M=o(L);he(M,17,()=>ye,Pe,(ce,E)=>{var ne=v(),X=o(ne);te(X,()=>a(E),z=>{var g=Zt(),_=S(g,!0);w(g),m(()=>{Ue(g,"style",`background-color: ${a(E).color??""}`),x(_,a(E).name)}),t(z,g)},z=>{var g=es();t(z,g)}),t(ce,ne)}),t(oe,L)}),w(Me),w(Le),w(Ce);var it=y(Ce,2);i(it,()=>Dt,(oe,L)=>{L(oe,{children:(M,ce)=>{var E=v(),ne=o(E);te(ne,()=>a(V),X=>{var z=rs(),g=o(z);i(g,()=>Xe,(J,Y)=>{Y(J,{children:(_e,me)=>{var Z=ts(),K=o(Z);i(K,()=>Ye,(C,ee)=>{ee(C,{children:(u,I)=>{Q();var f=B();m(()=>x(f,n()("timetable.drawer.reset-slot.title"))),t(u,f)},$$slots:{default:!0}})});var ve=y(K,2);i(ve,()=>st,(C,ee)=>{ee(C,{children:(u,I)=>{Q();var f=B();m(()=>x(f,n()("timetable.drawer.reset-slot.subtitle"))),t(u,f)},$$slots:{default:!0}})}),t(_e,Z)},$$slots:{default:!0}})});var _=y(g,2);i(_,()=>Ze,(J,Y)=>{Y(J,{children:(_e,me)=>{var Z=ss(),K=o(Z);We(K,{variant:"destructive",onclick:U,children:(C,ee)=>{Q();var u=B();m(()=>x(u,n()("timetable.drawer.reset-slot.button"))),t(C,u)},$$slots:{default:!0}});var ve=y(K,2);i(ve,()=>et,(C,ee)=>{ee(C,{children:(u,I)=>{Q();var f=B();m(()=>x(f,n()("ui.cancel"))),t(u,f)},$$slots:{default:!0}})}),t(_e,Z)},$$slots:{default:!0}})}),t(X,z)},X=>{var z=v(),g=o(z);i(g,()=>zt,(_,J)=>{J(_,{type:"single",onValueChange:Y=>Y&&D(Y),children:(Y,_e)=>{var me=ls(),Z=o(me);i(Z,()=>Xe,(u,I)=>{I(u,{children:(f,Ne)=>{var j=as(),F=o(j);i(F,()=>Ye,(d,T)=>{T(d,{children:(N,be)=>{Q();var O=B();m(()=>x(O,n()("timetable.drawer.set-slot.title"))),t(N,O)},$$slots:{default:!0}})});var G=y(F,2);i(G,()=>st,(d,T)=>{T(d,{children:(N,be)=>{Q();var O=B();m(()=>x(O,n()("timetable.drawer.set-slot.subtitle"))),t(N,O)},$$slots:{default:!0}})}),t(f,j)},$$slots:{default:!0}})});var K=y(Z,2),ve=S(K);i(ve,()=>jt,(u,I)=>{I(u,{children:(f,Ne)=>{var j=v(),F=o(j);te(F,()=>a(h)==null,G=>{var d=B("Slot");t(G,d)},G=>{var d=os(),T=S(d,!0);w(d),m(()=>{Ue(d,"style",`color: ${a(h).color??""}`),x(T,a(h).name)}),t(G,d)}),t(f,j)},$$slots:{default:!0}})}),w(K);var C=y(K,2);i(C,()=>Ze,(u,I)=>{I(u,{children:(f,Ne)=>{var j=ns(),F=o(j);We(F,{onclick:Re,children:(d,T)=>{Q();var N=B();m(()=>x(N,n()("timetable.drawer.set-slot.button"))),t(d,N)},$$slots:{default:!0}});var G=y(F,2);i(G,()=>et,(d,T)=>{T(d,{children:(N,be)=>{Q();var O=B();m(()=>x(O,n()("ui.cancel"))),t(N,O)},$$slots:{default:!0}})}),t(f,j)},$$slots:{default:!0}})});var ee=y(C,2);i(ee,()=>Tt,(u,I)=>{I(u,{children:(f,Ne)=>{var j=v(),F=o(j);he(F,17,()=>He.subjects,Pe,(G,d)=>{var T=v(),N=o(T),be=fe(()=>a(d).id.toString());i(N,()=>Rt,(O,ct)=>{ct(O,{get value(){return a(be)},class:"flex flex-row",get style(){return`color: ${a(d).color??""}`},children:(ut,us)=>{Q();var Ee=B();m(()=>x(Ee,a(d).name)),t(ut,Ee)},$$slots:{default:!0}})}),t(G,T)}),t(f,j)},$$slots:{default:!0}})}),t(Y,me)},$$slots:{default:!0}})}),t(X,z)}),t(M,E)},$$slots:{default:!0}})}),t(W,ie)},$$slots:{default:!0}})});var Ve=y(ge,2);Ut(Ve,{get pressed(){return a(b)},set pressed(P){H(b,Oe(P))},class:"fixed bottom-8 right-8 z-30 aspect-square rounded-full bg-background p-6 shadow-md",variant:"outline",children:(P,A)=>{var W=v(),qe=o(W);te(qe,()=>a(b),ie=>{Gt(ie,{})},ie=>{Ht(ie,{})}),t(P,W)},$$slots:{default:!0}});var lt=y(Ve,2);te(lt,()=>a(b),P=>{var A=is(),W=S(A,!0);m(()=>x(W,n()("timetable.edit-label"))),w(A),Pt(3,A,()=>yt,()=>({axis:"y"})),t(P,A)}),t(s,ae),je()}mt(["click"]);export{ws as component};
