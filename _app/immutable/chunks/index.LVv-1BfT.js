var Je=Object.defineProperty;var Ie=i=>{throw TypeError(i)};var Xe=(i,t,e)=>t in i?Je(i,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):i[t]=e;var a=(i,t,e)=>Xe(i,typeof t!="symbol"?t+"":t,e),Te=(i,t,e)=>t.has(i)||Ie("Cannot "+e);var n=(i,t,e)=>(Te(i,t,"read from private field"),e?e.call(i):t.get(i)),s=(i,t,e)=>t.has(i)?Ie("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(i):t.set(i,e),j=(i,t,e,r)=>(Te(i,t,"write to private field"),r?r.call(i,e):t.set(i,e),e);import{c as x,a as v,t as E,d as Qe}from"./disclose-version.BXtJ1W0_.js";import{ae as D,i as V,m as l,K as A,n as w,u as Ut,g as Ze,t as U,f as S,v as Q,w as B,c as rt,q as G,r as it,s as nt}from"./utils.DRp8il40.js";import{s as $e}from"./render.Bx7icutD.js";import{a as H,p,i as O,s as W,r as L,l as ke}from"./preload-helper.CTy181sv.js";import{b as P,c as Ce,x as gt,u as Bt,A as lt,y as mt,E as Ae,S as He,z as De,B as Oe,C as Re,H as Ee,G as Ke,g as Ve,i as Ue,I as tr,k as er,J as rr,v as ir,w as nr,n as Y,t as or,K as Be,a as vt,s as k,m as tt,h as sr}from"./index.CAlaWtPU.js";import{c as et}from"./index-client.C_rSk1z8.js";import{j as lr,h as ot,e as ar,i as hr,I as Fe,s as ze,f as ft}from"./Icon.UlmRfCyG.js";import{C as dr}from"./check.D4lLeNK6.js";import"./legacy.B_at4KoE.js";import{b as ur,P as cr,c as gr,d as fr,F as vr}from"./button.CoZVfdsq.js";import{g as Le,n as mr,p as pr,f as br,b as _r,V as Sr}from"./visually-hidden.Ce6qQLre.js";function qe(i,t=1e4){let e=null,r=D(H(i));function h(){return setTimeout(()=>{A(r,H(i))},t)}return V(()=>()=>{e&&clearTimeout(e)}),P.with(()=>l(r),o=>{A(r,H(o)),e&&clearTimeout(e),e=h()})}function wr(i){const t=qe("",1e3),e=(i==null?void 0:i.onMatch)??(d=>d.focus()),r=(i==null?void 0:i.getCurrentItem)??(()=>document.activeElement);function h(d,f){var M,y;if(!f.length)return;t.current=t.current+d;const _=r(),c=((y=(M=f.find(m=>m===_))==null?void 0:M.textContent)==null?void 0:y.trim())??"",u=f.map(m=>{var g;return((g=m.textContent)==null?void 0:g.trim())??""}),b=Le(u,t.current,c),C=f.find(m=>{var g;return((g=m.textContent)==null?void 0:g.trim())===b});return C&&e(C),C}function o(){t.current=""}return{search:t,handleTypeaheadSearch:h,resetTypeahead:o}}function yr(i){const t=qe("",1e3);function e(h,o){if(!i.enabled||!o.length)return;t.current=t.current+h;const d=i.getCurrentItem(),f=o.find(b=>b===d)??"",_=o.map(b=>b??""),c=Le(_,t.current,f),u=o.find(b=>b===c);return u&&i.onMatch(u),u}function r(){t.current=""}return{search:t,handleTypeaheadSearch:e,resetTypeahead:r}}const Nr=[mt,Re,Ee],Cr=[lt,Oe,Ke],Pr=[...Nr,...Cr];var pt,bt,_t,St,wt,yt,Nt,zt,Lt,qt,Ct,Pt,xt;class je{constructor(t){a(this,"disabled");a(this,"required");a(this,"name");a(this,"loop");a(this,"open");a(this,"scrollAlignment");a(this,"items");a(this,"allowDeselect");s(this,pt,D(!1));s(this,bt,D(""));s(this,_t,D(null));s(this,St,D(null));s(this,wt,D(null));s(this,yt,D(""));s(this,Nt,D(null));s(this,zt,w(()=>this.highlightedNode?this.highlightedNode.getAttribute("data-value"):null));s(this,Lt,w(()=>{if(this.highlightedNode)return this.highlightedNode.id}));s(this,qt,w(()=>this.highlightedNode?this.highlightedNode.getAttribute("data-label"):null));s(this,Ct,D(!1));s(this,Pt,D(!1));a(this,"bitsAttrs");s(this,xt,D({x:0,y:0}));a(this,"setHighlightedNode",t=>{this.highlightedNode=t,t&&this.isUsingKeyboard&&t.scrollIntoView({block:"nearest"})});a(this,"getCandidateNodes",()=>{const t=this.contentNode;return t?Array.from(t.querySelectorAll(`[${this.bitsAttrs.item}]:not([data-disabled])`)):[]});a(this,"setHighlightedToFirstCandidate",()=>{this.setHighlightedNode(null);const t=this.getCandidateNodes();t.length&&this.setHighlightedNode(t[0])});a(this,"getNodeByValue",t=>this.getCandidateNodes().find(r=>r.dataset.value===t)??null);a(this,"setOpen",t=>{this.open.current=t});a(this,"toggleOpen",()=>{this.open.current=!this.open.current});a(this,"handleOpen",()=>{this.setOpen(!0)});a(this,"handleClose",()=>{this.setHighlightedNode(null),this.setOpen(!1)});a(this,"toggleMenu",()=>{this.toggleOpen()});this.disabled=t.disabled,this.required=t.required,this.name=t.name,this.loop=t.loop,this.open=t.open,this.scrollAlignment=t.scrollAlignment,this.isCombobox=t.isCombobox,this.items=t.items,this.allowDeselect=t.allowDeselect,this.bitsAttrs=Gr(this),Ze(()=>{this.open.current||this.setHighlightedNode(null)})}get touchedInput(){return l(n(this,pt))}set touchedInput(t){A(n(this,pt),H(t))}get inputValue(){return l(n(this,bt))}set inputValue(t){A(n(this,bt),H(t))}get inputNode(){return l(n(this,_t))}set inputNode(t){A(n(this,_t),H(t))}get contentNode(){return l(n(this,St))}set contentNode(t){A(n(this,St),H(t))}get triggerNode(){return l(n(this,wt))}set triggerNode(t){A(n(this,wt),H(t))}get valueId(){return l(n(this,yt))}set valueId(t){A(n(this,yt),H(t))}get highlightedNode(){return l(n(this,Nt))}set highlightedNode(t){A(n(this,Nt),H(t))}get highlightedValue(){return l(n(this,zt))}get highlightedId(){return l(n(this,Lt))}get highlightedLabel(){return l(n(this,qt))}get isUsingKeyboard(){return l(n(this,Ct))}set isUsingKeyboard(t){A(n(this,Ct),H(t))}get isCombobox(){return l(n(this,Pt))}set isCombobox(t){A(n(this,Pt),H(t))}get triggerPointerDownPos(){return l(n(this,xt))}set triggerPointerDownPos(t){A(n(this,xt),t)}}pt=new WeakMap,bt=new WeakMap,_t=new WeakMap,St=new WeakMap,wt=new WeakMap,yt=new WeakMap,Nt=new WeakMap,zt=new WeakMap,Lt=new WeakMap,qt=new WeakMap,Ct=new WeakMap,Pt=new WeakMap,xt=new WeakMap;var jt,Gt,Wt,Yt;class xr extends je{constructor(e){super(e);a(this,"value");a(this,"isMulti",!1);s(this,jt,w(()=>this.value.current!==""));s(this,Gt,w(()=>{var r;return this.items.current.length?((r=this.items.current.find(h=>h.value===this.value.current))==null?void 0:r.label)??"":""}));s(this,Wt,w(()=>this.items.current.length?this.items.current.filter(r=>!r.disabled).map(r=>r.label):[]));s(this,Yt,w(()=>!(this.isMulti||this.items.current.length===0)));a(this,"includesItem",e=>this.value.current===e);a(this,"toggleItem",(e,r=e)=>{this.value.current=this.includesItem(e)?"":e,this.inputValue=r});a(this,"setInitialHighlightedNode",()=>{if(this.highlightedNode&&document.contains(this.highlightedNode))return;if(this.value.current!==""){const r=this.getNodeByValue(this.value.current);if(r){this.setHighlightedNode(r);return}}const e=this.getCandidateNodes()[0];e&&this.setHighlightedNode(e)});this.value=e.value,V(()=>{!this.open.current&&this.highlightedNode&&this.setHighlightedNode(null)}),V(()=>{this.open.current&&gt(()=>{this.setInitialHighlightedNode()})})}get hasValue(){return l(n(this,jt))}get currentLabel(){return l(n(this,Gt))}get candidateLabels(){return l(n(this,Wt))}get dataTypeaheadEnabled(){return l(n(this,Yt))}}jt=new WeakMap,Gt=new WeakMap,Wt=new WeakMap,Yt=new WeakMap;var Jt;class Ir extends je{constructor(e){super(e);a(this,"value");a(this,"isMulti",!0);s(this,Jt,w(()=>this.value.current.length>0));a(this,"includesItem",e=>this.value.current.includes(e));a(this,"toggleItem",(e,r=e)=>{this.includesItem(e)?this.value.current=this.value.current.filter(h=>h!==e):this.value.current=[...this.value.current,e],this.inputValue=r});a(this,"setInitialHighlightedNode",()=>{if(this.highlightedNode)return;if(this.value.current.length&&this.value.current[0]!==""){const r=this.getNodeByValue(this.value.current[0]);if(r){this.setHighlightedNode(r);return}}const e=this.getCandidateNodes()[0];e&&this.setHighlightedNode(e)});this.value=e.value,V(()=>{this.open.current&&gt(()=>{this.highlightedNode||this.setInitialHighlightedNode()})})}get hasValue(){return l(n(this,Jt))}}Jt=new WeakMap;var at,It,ht,dt,Xt,Qt,Tt,Zt,$t,te,ee;class Tr{constructor(t,e){s(this,at);s(this,It);a(this,"root");s(this,ht);s(this,dt);s(this,Xt,t=>{if(this.root.isUsingKeyboard=!0,(t.key===lt||t.key===mt)&&t.preventDefault(),!this.root.open.current){if(t.key===Ae||t.key===He||t.key===mt||t.key===lt)t.preventDefault(),this.root.handleOpen();else if(!this.root.isMulti&&this.root.dataTypeaheadEnabled){n(this,dt).handleTypeaheadSearch(t.key,this.root.candidateLabels);return}gt(()=>{if(this.root.hasValue)return;const o=this.root.getCandidateNodes();if(o.length){if(t.key===mt){const d=o[0];this.root.setHighlightedNode(d)}else if(t.key===lt){const d=o[o.length-1];this.root.setHighlightedNode(d)}}});return}if(t.key===De){this.root.handleClose();return}if((t.key===Ae||t.key===He)&&!t.isComposing){t.preventDefault();const o=this.root.highlightedValue,d=o===this.root.value.current;if(!this.root.allowDeselect.current&&d&&!this.root.isMulti){this.root.handleClose();return}o&&this.root.toggleItem(o,this.root.highlightedLabel??void 0),!this.root.isMulti&&!d&&this.root.handleClose()}if(t.key===lt&&t.altKey&&this.root.handleClose(),Pr.includes(t.key)){t.preventDefault();const o=this.root.getCandidateNodes(),d=this.root.highlightedNode,f=d?o.indexOf(d):-1,_=this.root.loop.current;let c;if(t.key===mt?c=mr(o,f,_):t.key===lt?c=pr(o,f,_):t.key===Oe?c=br(o,f,10,_):t.key===Re?c=_r(o,f,10,_):t.key===Ee?c=o[0]:t.key===Ke&&(c=o[o.length-1]),!c)return;this.root.setHighlightedNode(c);return}const e=t.ctrlKey||t.altKey||t.metaKey,r=t.key.length===1;if(t.code==="Space")return;const h=this.root.getCandidateNodes();if(t.key!==De){if(!e&&r){n(this,ht).handleTypeaheadSearch(t.key,h);return}this.root.highlightedNode||this.root.setHighlightedToFirstCandidate()}});s(this,Qt,()=>{this.root.open.current=!0,n(this,dt).resetTypeahead(),n(this,ht).resetTypeahead()});s(this,Tt,t=>{n(this,Qt).call(this),this.root.triggerPointerDownPos={x:Math.round(t.pageX),y:Math.round(t.pageY)}});s(this,Zt,t=>{t.currentTarget.focus()});s(this,$t,t=>{if(this.root.disabled.current)return;if(t.pointerType==="touch")return t.preventDefault();const e=t.target;e!=null&&e.hasPointerCapture(t.pointerId)&&(e==null||e.releasePointerCapture(t.pointerId)),t.button===0&&t.ctrlKey===!1&&(this.root.open.current===!1?(n(this,Tt).call(this,t),t.preventDefault()):this.root.handleClose())});s(this,te,t=>{t.preventDefault(),t.pointerType==="touch"&&n(this,Tt).call(this,t)});s(this,ee,w(()=>({id:n(this,at).current,disabled:this.root.disabled.current?!0:void 0,"aria-haspopup":"listbox","data-state":Ve(this.root.open.current),"data-disabled":Ue(this.root.disabled.current),"data-placeholder":this.root.hasValue?void 0:"",[this.root.bitsAttrs.trigger]:"",onpointerdown:n(this,$t),onkeydown:n(this,Xt),onclick:n(this,Zt),onpointerup:n(this,te)})));this.root=e,j(this,at,t.id),j(this,It,t.ref),Bt({id:n(this,at),ref:n(this,It),onRefChange:r=>{this.root.triggerNode=r}}),j(this,ht,wr({getCurrentItem:()=>this.root.highlightedNode,onMatch:r=>{this.root.setHighlightedNode(r)}})),j(this,dt,yr({getCurrentItem:()=>this.root.isMulti?"":this.root.currentLabel,onMatch:r=>{if(this.root.isMulti||!this.root.items.current)return;const h=this.root.items.current.find(o=>o.label===r);h&&(this.root.value.current=h.value)},enabled:!this.root.isMulti&&this.root.dataTypeaheadEnabled}))}get props(){return l(n(this,ee))}}at=new WeakMap,It=new WeakMap,ht=new WeakMap,dt=new WeakMap,Xt=new WeakMap,Qt=new WeakMap,Tt=new WeakMap,Zt=new WeakMap,$t=new WeakMap,te=new WeakMap,ee=new WeakMap;var At,Ht,re,ie,ne,oe;class Ar{constructor(t,e){a(this,"id");a(this,"ref");s(this,At,D(null));a(this,"root");s(this,Ht,D(!1));s(this,re,()=>{this.root.isUsingKeyboard=!1});s(this,ie,w(()=>this.root.isCombobox?{"--bits-combobox-content-transform-origin":"var(--bits-floating-transform-origin)","--bits-combobox-content-available-width":"var(--bits-floating-available-width)","--bits-combobox-content-available-height":"var(--bits-floating-available-height)","--bits-combobox-anchor-width":"var(--bits-floating-anchor-width)","--bits-combobox-anchor-height":"var(--bits-floating-anchor-height)"}:{"--bits-select-content-transform-origin":"var(--bits-floating-transform-origin)","--bits-select-content-available-width":"var(--bits-floating-available-width)","--bits-select-content-available-height":"var(--bits-floating-available-height)","--bits-select-anchor-width":"var(--bits-floating-anchor-width)","--bits-select-anchor-height":"var(--bits-floating-anchor-height)"}));a(this,"handleInteractOutside",t=>{(t.target===this.root.triggerNode||t.target===this.root.inputNode)&&t.preventDefault()});s(this,ne,w(()=>({open:this.root.open.current})));s(this,oe,w(()=>({id:this.id.current,role:"listbox","data-state":Ve(this.root.open.current),[this.root.bitsAttrs.content]:"",style:{display:"flex",flexDirection:"column",outline:"none",boxSizing:"border-box",pointerEvents:"auto",...l(n(this,ie))},onpointermove:n(this,re)})));this.root=e,this.id=t.id,this.ref=t.ref,Bt({id:this.id,ref:this.ref,onRefChange:r=>{this.root.contentNode=r},deps:()=>this.root.open.current}),V(()=>()=>{this.root.contentNode=null}),V(()=>{this.root.open.current===!1&&(this.isPositioned=!1)})}get viewportNode(){return l(n(this,At))}set viewportNode(t){A(n(this,At),H(t))}get isPositioned(){return l(n(this,Ht))}set isPositioned(t){A(n(this,Ht),H(t))}get snippetProps(){return l(n(this,ne))}get props(){return l(n(this,oe))}}At=new WeakMap,Ht=new WeakMap,re=new WeakMap,ie=new WeakMap,ne=new WeakMap,oe=new WeakMap;var ut,st,se,le,Dt,Mt,ae,he,de,ue,ce;class Hr{constructor(t,e){s(this,ut);s(this,st);a(this,"root");a(this,"value");a(this,"label");a(this,"onHighlight");a(this,"onUnhighlight");a(this,"disabled");s(this,se,w(()=>this.root.includesItem(this.value.current)));s(this,le,w(()=>this.root.highlightedValue===this.value.current));a(this,"prevHighlighted",new tr(()=>this.isHighlighted));s(this,Dt,D(""));s(this,Mt,D(!1));s(this,ae,w(()=>({selected:this.isSelected,highlighted:this.isHighlighted})));s(this,he,t=>{t.preventDefault()});s(this,de,t=>{if(t.defaultPrevented||(t.preventDefault(),this.disabled.current))return;const e=this.value.current===this.root.value.current;if(!this.root.allowDeselect.current&&e&&!this.root.isMulti){this.root.handleClose();return}this.root.toggleItem(this.value.current,this.label.current),!this.root.isMulti&&!e&&this.root.handleClose()});s(this,ue,t=>{this.root.highlightedNode!==n(this,st).current&&this.root.setHighlightedNode(n(this,st).current)});a(this,"setTextId",t=>{this.textId=t});s(this,ce,w(()=>({id:n(this,ut).current,role:"option","aria-selected":this.root.includesItem(this.value.current)?"true":void 0,"data-value":this.value.current,"data-disabled":Ue(this.disabled.current),"data-highlighted":this.root.highlightedValue===this.value.current?"":void 0,"data-selected":this.root.includesItem(this.value.current)?"":void 0,"data-label":this.label.current,[this.root.bitsAttrs.item]:"",onpointermove:n(this,ue),onpointerdown:n(this,he),onpointerup:n(this,de)})));this.root=e,this.value=t.value,this.disabled=t.disabled,this.label=t.label,this.onHighlight=t.onHighlight,this.onUnhighlight=t.onUnhighlight,j(this,ut,t.id),j(this,st,t.ref),V(()=>{this.isHighlighted?this.onHighlight.current():this.prevHighlighted.current&&this.onUnhighlight.current()}),Bt({id:n(this,ut),ref:n(this,st)}),V(()=>{this.mounted&&Ut(()=>this.root.setInitialHighlightedNode())})}get isSelected(){return l(n(this,se))}get isHighlighted(){return l(n(this,le))}get textId(){return l(n(this,Dt))}set textId(t){A(n(this,Dt),H(t))}get mounted(){return l(n(this,Mt))}set mounted(t){A(n(this,Mt),H(t))}get snippetProps(){return l(n(this,ae))}get props(){return l(n(this,ce))}}ut=new WeakMap,st=new WeakMap,se=new WeakMap,le=new WeakMap,Dt=new WeakMap,Mt=new WeakMap,ae=new WeakMap,he=new WeakMap,de=new WeakMap,ue=new WeakMap,ce=new WeakMap;var kt,ge,fe,ve;class Dr{constructor(t,e){s(this,kt);a(this,"root");s(this,ge,w(()=>this.root.name.current!==""));s(this,fe,t=>{var e,r;t.preventDefault(),this.root.isCombobox?(r=this.root.inputNode)==null||r.focus():(e=this.root.triggerNode)==null||e.focus()});s(this,ve,w(()=>({disabled:er(this.root.disabled.current),required:rr(this.root.required.current),name:this.root.name.current,value:n(this,kt).current,style:ir(nr),tabindex:-1,onfocus:n(this,fe)})));this.root=e,j(this,kt,t.value)}get shouldRender(){return l(n(this,ge))}get props(){return l(n(this,ve))}}kt=new WeakMap,ge=new WeakMap,fe=new WeakMap,ve=new WeakMap;var ct,Ot,Rt,me;class Mr{constructor(t,e){s(this,ct);s(this,Ot);a(this,"root");a(this,"content");s(this,Rt,D(0));s(this,me,w(()=>({id:n(this,ct).current,role:"presentation",[this.root.bitsAttrs.viewport]:"",style:{position:"relative",flex:1,overflow:"auto"}})));j(this,ct,t.id),j(this,Ot,t.ref),this.content=e,this.root=e.root,Bt({id:n(this,ct),ref:n(this,Ot),onRefChange:r=>{this.content.viewportNode=r},deps:()=>this.root.open.current})}get prevScrollTop(){return l(n(this,Rt))}set prevScrollTop(t){A(n(this,Rt),H(t))}get props(){return l(n(this,me))}}ct=new WeakMap,Ot=new WeakMap,Rt=new WeakMap,me=new WeakMap;var Et,pe,be,_e,Se;class Ge{constructor(t,e){a(this,"id");a(this,"ref");a(this,"content");a(this,"root");s(this,Et,D(null));a(this,"onAutoScroll",Y);a(this,"mounted");a(this,"clearAutoScrollTimer",()=>{this.autoScrollTimer!==null&&(window.clearInterval(this.autoScrollTimer),this.autoScrollTimer=null)});s(this,pe,()=>{this.autoScrollTimer===null&&(this.autoScrollTimer=window.setInterval(()=>{this.onAutoScroll()},50))});s(this,be,()=>{this.autoScrollTimer===null&&(this.autoScrollTimer=window.setInterval(()=>{this.onAutoScroll()},50))});s(this,_e,()=>{this.clearAutoScrollTimer()});s(this,Se,w(()=>({id:this.id.current,"aria-hidden":or(!0),style:{flexShrink:0},onpointerdown:n(this,pe),onpointermove:n(this,be),onpointerleave:n(this,_e)})));this.ref=t.ref,this.id=t.id,this.mounted=t.mounted,this.content=e,this.root=e.root,Bt({id:this.id,ref:this.ref,deps:()=>this.mounted.current}),V(()=>{if(!this.mounted.current)return;const r=Ut(()=>this.root.highlightedNode);r==null||r.scrollIntoView({block:"nearest"})})}get autoScrollTimer(){return l(n(this,Et))}set autoScrollTimer(t){A(n(this,Et),H(t))}get props(){return l(n(this,Se))}}Et=new WeakMap,pe=new WeakMap,be=new WeakMap,_e=new WeakMap,Se=new WeakMap;var Kt,we;class kr{constructor(t){a(this,"state");a(this,"content");a(this,"root");s(this,Kt,D(!1));a(this,"handleAutoScroll",()=>{gt(()=>{const t=this.content.viewportNode,e=this.root.highlightedNode;!t||!e||(t.scrollTop=t.scrollTop+e.offsetHeight)})});s(this,we,w(()=>({...this.state.props,[this.root.bitsAttrs["scroll-down-button"]]:""})));this.state=t,this.content=t.content,this.root=t.root,this.state.onAutoScroll=this.handleAutoScroll,V(()=>{const e=this.content.viewportNode,r=this.content.isPositioned;if(!e||!r)return;let h=Y;return Ut(()=>{const o=()=>{gt(()=>{const d=e.scrollHeight-e.clientHeight,f=Number.parseInt(getComputedStyle(e).paddingTop,10);this.canScrollDown=Math.ceil(e.scrollTop)<d-f})};o(),h=Be(e,"scroll",o)}),h}),V(()=>{this.state.mounted.current||this.state.clearAutoScrollTimer()})}get canScrollDown(){return l(n(this,Kt))}set canScrollDown(t){A(n(this,Kt),H(t))}get props(){return l(n(this,we))}}Kt=new WeakMap,we=new WeakMap;var Vt,ye;class Or{constructor(t){a(this,"state");a(this,"content");a(this,"root");s(this,Vt,D(!1));a(this,"handleAutoScroll",()=>{gt(()=>{const t=this.content.viewportNode,e=this.root.highlightedNode;!t||!e||(t.scrollTop=t.scrollTop-e.offsetHeight)})});s(this,ye,w(()=>({...this.state.props,[this.root.bitsAttrs["scroll-up-button"]]:""})));this.state=t,this.content=t.content,this.root=t.root,this.state.onAutoScroll=this.handleAutoScroll,V(()=>{const e=this.content.viewportNode,r=this.content.isPositioned;if(!e||!r)return;let h=Y;return Ut(()=>{const o=()=>{const d=Number.parseInt(getComputedStyle(e).paddingTop,10);this.canScrollUp=e.scrollTop-d>0};o(),h=Be(e,"scroll",o)}),h}),V(()=>{this.state.mounted.current||this.state.clearAutoScrollTimer()})}get canScrollUp(){return l(n(this,Vt))}set canScrollUp(t){A(n(this,Vt),H(t))}get props(){return l(n(this,ye))}}Vt=new WeakMap,ye=new WeakMap;const[Rr,Ne]=Ce(["Select.Root","Combobox.Root"]);Ce(["Select.Group","Combobox.Group"]);const[Er,Pe]=Ce(["Select.Content","Combobox.Content"]);function Kr(i){const{type:t,...e}=i,r=t==="single"?new xr(e):new Ir(e);return Rr(r)}function Vr(i){return Er(new Ar(i,Ne()))}function Ur(i){return new Tr(i,Ne())}function Br(i){return new Hr(i,Ne())}function Fr(i){return new Mr(i,Pe())}function zr(i){return new Or(new Ge(i,Pe()))}function Lr(i){return new kr(new Ge(i,Pe()))}function qr(i){return new Dr(i,Ne())}const jr=["trigger","content","item","viewport","scroll-up-button","scroll-down-button","group","group-label","separator","arrow","input","content-wrapper","item-text","value"];function Gr(i){const t=i.isCombobox,e={};for(const r of jr)e[r]=t?`data-combobox-${r}`:`data-select-${r}`;return e}var Wr=E("<input>");function Me(i,t){U(t,!0);let e=p(t,"value",15,"");const r=qr({value:P.with(()=>e())});Sr(i,{children:(h,o)=>{var d=x(),f=S(d);O(f,()=>r.shouldRender,_=>{var c=Wr();lr(c);let u;Q(()=>u=ot(c,u,{...r.props})),ur(c,e),v(_,c)}),v(h,d)},$$slots:{default:!0}}),B()}var Yr=E("<div><!></div>"),Jr=E("<div><!></div>");function Xr(i,t){U(t,!0);let e=p(t,"id",19,vt),r=p(t,"ref",15,null),h=p(t,"forceMount",3,!1),o=p(t,"side",3,"bottom"),d=p(t,"onInteractOutside",3,Y),f=p(t,"onEscapeKeydown",3,Y),_=p(t,"preventScroll",3,!1),c=L(t,["$$slots","$$events","$$legacy","id","ref","forceMount","side","onInteractOutside","onEscapeKeydown","children","child","preventScroll"]);const u=Vr({id:P.with(()=>e()),ref:P.with(()=>r(),g=>r(g))}),b=w(()=>tt(c,u.props));function C(g){u.handleInteractOutside(g),!g.defaultPrevented&&(d()(g),!g.defaultPrevented&&u.root.handleClose())}function M(g){f()(g),!g.defaultPrevented&&u.root.handleClose()}var y=x(),m=S(y);O(m,h,g=>{gr(g,W(()=>l(b),{get side(){return o()},get enabled(){return u.root.open.current},get id(){return e()},onInteractOutside:C,onEscapeKeydown:M,onOpenAutoFocus:T=>T.preventDefault(),onCloseAutoFocus:T=>T.preventDefault(),trapFocus:!1,loop:!1,get preventScroll(){return _()},onPlaced:()=>u.isPositioned=!0,forceMount:!0,popper:(T,N)=>{let F=()=>N==null?void 0:N().props;var R=x();const z=w(()=>tt(F(),{style:u.props.style}));var Z=S(R);O(Z,()=>t.child,q=>{var K=x(),J=S(K);k(J,()=>t.child,()=>({props:l(z),...u.snippetProps})),v(q,K)},q=>{var K=Yr();let J;var $=rt(K);k($,()=>t.children??G),it(K),Q(()=>J=ot(K,J,{...l(z)})),v(q,K)}),v(T,R)},$$slots:{popper:!0}}))},g=>{var I=x(),T=S(I);O(T,()=>!h(),N=>{cr(N,W(()=>l(b),{get side(){return o()},get present(){return u.root.open.current},get id(){return e()},onInteractOutside:C,onEscapeKeydown:M,onOpenAutoFocus:R=>R.preventDefault(),onCloseAutoFocus:R=>R.preventDefault(),trapFocus:!1,loop:!1,get preventScroll(){return _()},onPlaced:()=>u.isPositioned=!0,forceMount:!1,popper:(R,z)=>{let Z=()=>z==null?void 0:z().props;var q=x();const K=w(()=>tt(Z(),{style:u.props.style}));var J=S(q);O(J,()=>t.child,$=>{var X=x(),Ft=S(X);k(Ft,()=>t.child,()=>({props:l(K),...u.snippetProps})),v($,X)},$=>{var X=Jr();let Ft;var Ye=rt(X);k(Ye,()=>t.children??G),it(X),Q(()=>Ft=ot(X,Ft,{...l(K)})),v($,X)}),v(R,q)},$$slots:{popper:!0}}))},null,!0),v(g,I)}),v(i,y),B()}function xe(i,t){U(t,!0);let e=p(t,"isMounted",15,!1),r=p(t,"onMountedChange",3,Y);V(()=>(Ut(()=>{e(!0),r()(!0)}),()=>{e(!1),r()(!1)})),B()}var Qr=E("<div><!></div>"),Zr=E("<!> <!>",1);function $r(i,t){U(t,!0);let e=p(t,"id",19,vt),r=p(t,"ref",15,null),h=p(t,"label",19,()=>t.value),o=p(t,"disabled",3,!1),d=p(t,"onHighlight",3,Y),f=p(t,"onUnhighlight",3,Y),_=L(t,["$$slots","$$events","$$legacy","id","ref","value","label","disabled","children","child","onHighlight","onUnhighlight"]);const c=Br({id:P.with(()=>e()),ref:P.with(()=>r(),y=>r(y)),value:P.with(()=>t.value),disabled:P.with(()=>o()),label:P.with(()=>h()),onHighlight:P.with(()=>d()),onUnhighlight:P.with(()=>f())}),u=w(()=>tt(_,c.props));var b=Zr(),C=S(b);O(C,()=>t.child,y=>{var m=x(),g=S(m);k(g,()=>t.child,()=>({props:l(u),...c.snippetProps})),v(y,m)},y=>{var m=Qr();let g;var I=rt(m);k(I,()=>t.children??G,()=>c.snippetProps),it(m),Q(()=>g=ot(m,g,{...l(u)})),v(y,m)});var M=nt(C,2);xe(M,{onMountedChange:y=>{c.mounted=y}}),v(i,b),B()}var ti=E("<div><!></div>");function ei(i,t){U(t,!0);let e=p(t,"id",19,vt),r=p(t,"ref",15,null),h=L(t,["$$slots","$$events","$$legacy","id","ref","children","child"]);const o=Fr({id:P.with(()=>e()),ref:P.with(()=>r(),c=>r(c))}),d=w(()=>tt(h,o.props));var f=x(),_=S(f);O(_,()=>t.child,c=>{var u=x(),b=S(u);k(b,()=>t.child,()=>({props:l(d)})),v(c,u)},c=>{var u=ti();let b;var C=rt(u);k(C,()=>t.children??G),it(u),Q(()=>b=ot(u,b,{...l(d)},"svelte-uf90i5")),v(c,u)}),v(i,f),B()}var ri=E("<div><!></div>"),ii=E("<!> <!>",1);function ni(i,t){U(t,!0);let e=p(t,"id",19,vt),r=p(t,"ref",15,null),h=L(t,["$$slots","$$events","$$legacy","id","ref","child","children"]),o=D(!1);const d=Lr({id:P.with(()=>e()),mounted:P.with(()=>l(o)),ref:P.with(()=>r(),u=>r(u))}),f=w(()=>tt(h,d.props));var _=x(),c=S(_);O(c,()=>d.canScrollDown,u=>{var b=ii(),C=S(b);xe(C,{onMountedChange:y=>A(o,H(y))});var M=nt(C,2);O(M,()=>t.child,y=>{var m=x(),g=S(m);k(g,()=>t.child,()=>({props:h})),v(y,m)},y=>{var m=ri();let g;var I=rt(m);k(I,()=>t.children??G),it(m),Q(()=>g=ot(m,g,{...l(f)})),v(y,m)}),v(u,b)}),v(i,_),B()}var oi=E("<div><!></div>"),si=E("<!> <!>",1);function li(i,t){U(t,!0);let e=p(t,"id",19,vt),r=p(t,"ref",15,null),h=L(t,["$$slots","$$events","$$legacy","id","ref","child","children"]),o=D(!1);const d=zr({id:P.with(()=>e()),mounted:P.with(()=>l(o)),ref:P.with(()=>r(),u=>r(u))}),f=w(()=>tt(h,d.props));var _=x(),c=S(_);O(c,()=>d.canScrollUp,u=>{var b=si(),C=S(b);xe(C,{onMountedChange:y=>A(o,H(y))});var M=nt(C,2);O(M,()=>t.child,y=>{var m=x(),g=S(m);k(g,()=>t.child,()=>({props:h})),v(y,m)},y=>{var m=oi();let g;var I=rt(m);k(I,()=>t.children??G),it(m),Q(()=>g=ot(m,g,{...l(f)})),v(y,m)}),v(u,b)}),v(i,_),B()}var ai=E("<!> <!>",1);function hi(i,t){U(t,!0);let e=p(t,"value",15),r=p(t,"onValueChange",3,Y),h=p(t,"name",3,""),o=p(t,"disabled",3,!1),d=p(t,"open",15,!1),f=p(t,"onOpenChange",3,Y),_=p(t,"loop",3,!1),c=p(t,"scrollAlignment",3,"nearest"),u=p(t,"required",3,!1),b=p(t,"controlledOpen",3,!1),C=p(t,"controlledValue",3,!1),M=p(t,"items",19,()=>[]),y=p(t,"allowDeselect",3,!0);if(e()===void 0){const N=t.type==="single"?"":[];C()?r()(N):e(N)}const m=Kr({type:t.type,value:P.with(()=>e(),N=>{C()||e(N),r()(N)}),disabled:P.with(()=>o()),required:P.with(()=>u()),open:P.with(()=>d(),N=>{b()||d(N),f()(N)}),loop:P.with(()=>_()),scrollAlignment:P.with(()=>c()),name:P.with(()=>h()),isCombobox:!1,items:P.with(()=>M()),allowDeselect:P.with(()=>y())});var g=ai(),I=S(g);fr(I,{children:(N,F)=>{var R=x(),z=S(R);k(z,()=>t.children??G),v(N,R)},$$slots:{default:!0}});var T=nt(I,2);O(T,()=>Array.isArray(m.value.current),N=>{var F=x(),R=S(F);O(R,()=>m.value.current.length,z=>{var Z=x(),q=S(Z);ar(q,17,()=>m.value.current,hr,(K,J)=>{Me(K,{get value(){return l(J)}})}),v(z,Z)}),v(N,F)},N=>{Me(N,{get value(){return m.value.current},set value(F){m.value.current=F}})}),v(i,g),B()}var di=E("<button><!></button>");function ui(i,t){U(t,!0);let e=p(t,"id",19,vt),r=p(t,"ref",15,null),h=p(t,"type",3,"button"),o=L(t,["$$slots","$$events","$$legacy","id","ref","child","children","type"]);const d=Ur({id:P.with(()=>e()),ref:P.with(()=>r(),u=>r(u))}),f=w(()=>tt(o,d.props,{type:h()}));var _=x(),c=S(_);et(c,()=>vr,(u,b)=>{b(u,{get id(){return e()},children:(C,M)=>{var y=x(),m=S(y);O(m,()=>t.child,g=>{var I=x(),T=S(I);k(T,()=>t.child,()=>({props:l(f)})),v(g,I)},g=>{var I=di();let T;var N=rt(I);k(N,()=>t.children??G),it(I),Q(()=>T=ot(I,T,{...l(f)})),v(g,I)}),v(C,y)},$$slots:{default:!0}})}),v(i,_),B()}function We(i,t){const e=ke(t,["children","$$slots","$$events","$$legacy"]);Fe(i,W({name:"chevron-down"},()=>e,{iconNode:[["path",{d:"m6 9 6 6 6-6"}]],children:(h,o)=>{var d=x(),f=S(d);ze(f,t,"default",{},null),v(h,d)},$$slots:{default:!0}}))}function ci(i,t){const e=ke(t,["children","$$slots","$$events","$$legacy"]);Fe(i,W({name:"chevron-up"},()=>e,{iconNode:[["path",{d:"m18 15-6-6-6 6"}]],children:(h,o)=>{var d=x(),f=S(d);ze(f,t,"default",{},null),v(h,d)},$$slots:{default:!0}}))}var gi=E('<span class="absolute left-2 flex size-3.5 items-center justify-center"><!></span> <!>',1);function Hi(i,t){U(t,!0);let e=p(t,"ref",15,null),r=L(t,["$$slots","$$events","$$legacy","ref","class","value","label","children"]);var h=x(),o=S(h),d=w(()=>ft("data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50",t.class));et(o,()=>$r,(f,_)=>{_(f,W({get ref(){return e()},set ref(u){e(u)},get value(){return t.value},get class(){return l(d)}},()=>r,{children:(u,b)=>{let C=()=>b==null?void 0:b().selected,M=()=>b==null?void 0:b().highlighted;var y=gi(),m=S(y),g=rt(m);O(g,C,T=>{dr(T,{class:"size-4"})}),it(m);var I=nt(m,2);O(I,()=>t.children,T=>{var N=x(),F=S(N);k(F,()=>t.children,()=>({selected:C(),highlighted:M()})),v(T,N)},T=>{var N=Qe();Q(()=>$e(N,t.label||t.value)),v(T,N)}),v(u,y)},$$slots:{default:!0}}))}),v(i,h),B()}function fi(i,t){U(t,!0);let e=p(t,"ref",15,null),r=L(t,["$$slots","$$events","$$legacy","ref","class"]);var h=x(),o=S(h),d=w(()=>ft("flex cursor-default items-center justify-center py-1",t.class));et(o,()=>li,(f,_)=>{_(f,W({get ref(){return e()},set ref(c){e(c)},get class(){return l(d)}},()=>r,{children:(c,u)=>{ci(c,{class:"size-4"})},$$slots:{default:!0}}))}),v(i,h),B()}function vi(i,t){U(t,!0);let e=p(t,"ref",15,null),r=L(t,["$$slots","$$events","$$legacy","ref","class"]);var h=x(),o=S(h),d=w(()=>ft("flex cursor-default items-center justify-center py-1",t.class));et(o,()=>ni,(f,_)=>{_(f,W({get ref(){return e()},set ref(c){e(c)},get class(){return l(d)}},()=>r,{children:(c,u)=>{We(c,{class:"size-4"})},$$slots:{default:!0}}))}),v(i,h),B()}var mi=E("<!> <!> <!>",1);function Di(i,t){U(t,!0);let e=p(t,"ref",15,null),r=p(t,"sideOffset",3,4),h=L(t,["$$slots","$$events","$$legacy","ref","class","sideOffset","portalProps","children"]);var o=x(),d=S(o);et(d,()=>sr,(f,_)=>{_(f,W(()=>t.portalProps,{children:(c,u)=>{var b=x(),C=S(b),M=w(()=>ft("data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 bg-popover text-popover-foreground relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border shadow-md data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",t.class));et(C,()=>Xr,(y,m)=>{m(y,W({get ref(){return e()},set ref(g){e(g)},get sideOffset(){return r()},get class(){return l(M)}},()=>h,{children:(g,I)=>{var T=mi(),N=S(T);fi(N,{});var F=nt(N,2),R=w(()=>ft("h-[var(--bits-select-anchor-height)] w-full min-w-[var(--bits-select-anchor-width)] p-1"));et(F,()=>ei,(Z,q)=>{q(Z,{get class(){return l(R)},children:(K,J)=>{var $=x(),X=S($);k(X,()=>t.children??G),v(K,$)},$$slots:{default:!0}})});var z=nt(F,2);vi(z,{}),v(g,T)},$$slots:{default:!0}}))}),v(c,b)},$$slots:{default:!0}}))}),v(i,o),B()}var pi=E("<!> <!>",1);function Mi(i,t){U(t,!0);let e=p(t,"ref",15,null),r=L(t,["$$slots","$$events","$$legacy","ref","class","children"]);var h=x(),o=S(h),d=w(()=>ft("border-input bg-background ring-offset-background data-[placeholder]:text-muted-foreground focus:ring-ring flex h-10 w-full items-center justify-between rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",t.class));et(o,()=>ui,(f,_)=>{_(f,W({get ref(){return e()},set ref(c){e(c)},get class(){return l(d)}},()=>r,{children:(c,u)=>{var b=pi(),C=S(b);k(C,()=>t.children??G);var M=nt(C,2);We(M,{class:"size-4 opacity-50"}),v(c,b)},$$slots:{default:!0}}))}),v(i,h),B()}const ki=hi;export{ki as R,Mi as S,Di as a,Hi as b};