var app=function(){"use strict";function t(){}function e(t,e){for(const n in e)t[n]=e[n];return t}function n(t){return t()}function o(){return Object.create(null)}function r(t){t.forEach(n)}function s(t){return"function"==typeof t}function a(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function i(e,...n){if(null==e)return t;const o=e.subscribe(...n);return o.unsubscribe?()=>o.unsubscribe():o}function c(t,e,n){t.$$.on_destroy.push(i(e,n))}function l(t,e,n,o){if(t){const r=u(t,e,n,o);return t[0](r)}}function u(t,n,o,r){return t[1]&&r?e(o.ctx.slice(),t[1](r(n))):o.ctx}function m(t,e,n,o){if(t[2]&&o){const r=t[2](o(n));if(void 0===e.dirty)return r;if("object"==typeof r){const t=[],n=Math.max(e.dirty.length,r.length);for(let o=0;o<n;o+=1)t[o]=e.dirty[o]|r[o];return t}return e.dirty|r}return e.dirty}function f(t,e,n,o,r,s){if(r){const a=u(e,n,o,s);t.p(a,r)}}function p(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let t=0;t<n;t++)e[t]=-1;return e}return-1}function d(t){const e={};for(const n in t)"$"!==n[0]&&(e[n]=t[n]);return e}function $(t,e){const n={};e=new Set(e);for(const o in t)e.has(o)||"$"===o[0]||(n[o]=t[o]);return n}function h(t,e){t.appendChild(e)}function g(t,e,n){t.insertBefore(e,n||null)}function v(t){t.parentNode.removeChild(t)}function y(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function _(t){return document.createElement(t)}function b(t){return document.createTextNode(t)}function x(){return b(" ")}function w(){return b("")}function k(t,e,n,o){return t.addEventListener(e,n,o),()=>t.removeEventListener(e,n,o)}function E(t){return function(e){return e.preventDefault(),t.call(this,e)}}function S(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function P(t,e){const n=Object.getOwnPropertyDescriptors(t.__proto__);for(const o in e)null==e[o]?t.removeAttribute(o):"style"===o?t.style.cssText=e[o]:"__value"===o?t.value=t[o]=e[o]:n[o]&&n[o].set?t[o]=e[o]:S(t,o,e[o])}function C(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function M(t,e){t.value=null==e?"":e}let z;function L(t){z=t}function N(){if(!z)throw new Error("Function called outside component initialization");return z}function T(t){N().$$.on_mount.push(t)}function H(){const t=N();return(e,n)=>{const o=t.$$.callbacks[e];if(o){const r=function(t,e,n=!1){const o=document.createEvent("CustomEvent");return o.initCustomEvent(t,n,!1,e),o}(e,n);o.slice().forEach((e=>{e.call(t,r)}))}}}function R(t,e){N().$$.context.set(t,e)}function j(t){return N().$$.context.get(t)}const A=[],V=[],F=[],O=[],B=Promise.resolve();let I=!1;function Q(t){F.push(t)}function U(t){O.push(t)}const D=new Set;let K=0;function q(){const t=z;do{for(;K<A.length;){const t=A[K];K++,L(t),G(t.$$)}for(L(null),A.length=0,K=0;V.length;)V.pop()();for(let t=0;t<F.length;t+=1){const e=F[t];D.has(e)||(D.add(e),e())}F.length=0}while(A.length);for(;O.length;)O.pop()();I=!1,D.clear(),L(t)}function G(t){if(null!==t.fragment){t.update(),r(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(Q)}}const W=new Set;let X;function Y(){X={r:0,c:[],p:X}}function J(){X.r||r(X.c),X=X.p}function Z(t,e){t&&t.i&&(W.delete(t),t.i(e))}function tt(t,e,n,o){if(t&&t.o){if(W.has(t))return;W.add(t),X.c.push((()=>{W.delete(t),o&&(n&&t.d(1),o())})),t.o(e)}}function et(t,e){t.d(1),e.delete(t.key)}function nt(t,e){const n={},o={},r={$$scope:1};let s=t.length;for(;s--;){const a=t[s],i=e[s];if(i){for(const t in a)t in i||(o[t]=1);for(const t in i)r[t]||(n[t]=i[t],r[t]=1);t[s]=i}else for(const t in a)r[t]=1}for(const t in o)t in n||(n[t]=void 0);return n}function ot(t){return"object"==typeof t&&null!==t?t:{}}function rt(t,e,n){const o=t.$$.props[e];void 0!==o&&(t.$$.bound[o]=n,n(t.$$.ctx[o]))}function st(t){t&&t.c()}function at(t,e,o,a){const{fragment:i,on_mount:c,on_destroy:l,after_update:u}=t.$$;i&&i.m(e,o),a||Q((()=>{const e=c.map(n).filter(s);l?l.push(...e):r(e),t.$$.on_mount=[]})),u.forEach(Q)}function it(t,e){const n=t.$$;null!==n.fragment&&(r(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function ct(t,e){-1===t.$$.dirty[0]&&(A.push(t),I||(I=!0,B.then(q)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function lt(e,n,s,a,i,c,l,u=[-1]){const m=z;L(e);const f=e.$$={fragment:null,ctx:null,props:c,update:t,not_equal:i,bound:o(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(n.context||(m?m.$$.context:[])),callbacks:o(),dirty:u,skip_bound:!1,root:n.target||m.$$.root};l&&l(f.root);let p=!1;if(f.ctx=s?s(e,n.props||{},((t,n,...o)=>{const r=o.length?o[0]:n;return f.ctx&&i(f.ctx[t],f.ctx[t]=r)&&(!f.skip_bound&&f.bound[t]&&f.bound[t](r),p&&ct(e,t)),n})):[],f.update(),p=!0,r(f.before_update),f.fragment=!!a&&a(f.ctx),n.target){if(n.hydrate){const t=function(t){return Array.from(t.childNodes)}(n.target);f.fragment&&f.fragment.l(t),t.forEach(v)}else f.fragment&&f.fragment.c();n.intro&&Z(e.$$.fragment),at(e,n.target,n.anchor,n.customElement),q()}L(m)}class ut{$destroy(){it(this,1),this.$destroy=t}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(t){var e;this.$$set&&(e=t,0!==Object.keys(e).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}const mt=[];function ft(e,n=t){let o;const r=new Set;function s(t){if(a(e,t)&&(e=t,o)){const t=!mt.length;for(const t of r)t[1](),mt.push(t,e);if(t){for(let t=0;t<mt.length;t+=2)mt[t][0](mt[t+1]);mt.length=0}}}return{set:s,update:function(t){s(t(e))},subscribe:function(a,i=t){const c=[a,i];return r.add(c),1===r.size&&(o=n(s)||t),a(e),()=>{r.delete(c),0===r.size&&(o(),o=null)}}}}function pt(e,n,o){const a=!Array.isArray(e),c=a?[e]:e,l=n.length<2;return u=e=>{let o=!1;const u=[];let m=0,f=t;const p=()=>{if(m)return;f();const o=n(a?u[0]:u,e);l?e(o):f=s(o)?o:t},d=c.map(((t,e)=>i(t,(t=>{u[e]=t,m&=~(1<<e),o&&p()}),(()=>{m|=1<<e}))));return o=!0,p(),function(){r(d),f()}},{subscribe:ft(o,u).subscribe};var u}const dt={},$t={};function ht(t){return{...t.location,state:t.history.state,key:t.history.state&&t.history.state.key||"initial"}}const gt=function(t,e){const n=[];let o=ht(t);return{get location(){return o},listen(e){n.push(e);const r=()=>{o=ht(t),e({location:o,action:"POP"})};return t.addEventListener("popstate",r),()=>{t.removeEventListener("popstate",r);const o=n.indexOf(e);n.splice(o,1)}},navigate(e,{state:r,replace:s=!1}={}){r={...r,key:Date.now()+""};try{s?t.history.replaceState(r,null,e):t.history.pushState(r,null,e)}catch(n){t.location[s?"replace":"assign"](e)}o=ht(t),n.forEach((t=>t({location:o,action:"PUSH"})))}}}(Boolean("undefined"!=typeof window&&window.document&&window.document.createElement)?window:function(t="/"){let e=0;const n=[{pathname:t,search:""}],o=[];return{get location(){return n[e]},addEventListener(t,e){},removeEventListener(t,e){},history:{get entries(){return n},get index(){return e},get state(){return o[e]},pushState(t,r,s){const[a,i=""]=s.split("?");e++,n.push({pathname:a,search:i}),o.push(t)},replaceState(t,r,s){const[a,i=""]=s.split("?");n[e]={pathname:a,search:i},o[e]=t}}}}()),{navigate:vt}=gt,yt=/^:(.+)/;function _t(t,e){return t.substr(0,e.length)===e}function bt(t){return"*"===t[0]}function xt(t){return t.replace(/(^\/+|\/+$)/g,"").split("/")}function wt(t){return t.replace(/(^\/+|\/+$)/g,"")}function kt(t,e){return{route:t,score:t.default?0:xt(t.path).reduce(((t,e)=>(t+=4,!function(t){return""===t}(e)?!function(t){return yt.test(t)}(e)?bt(e)?t-=5:t+=3:t+=2:t+=1,t)),0),index:e}}function Et(t,e){let n,o;const[r]=e.split("?"),s=xt(r),a=""===s[0],i=function(t){return t.map(kt).sort(((t,e)=>t.score<e.score?1:t.score>e.score?-1:t.index-e.index))}(t);for(let t=0,r=i.length;t<r;t++){const r=i[t].route;let c=!1;if(r.default){o={route:r,params:{},uri:e};continue}const l=xt(r.path),u={},m=Math.max(s.length,l.length);let f=0;for(;f<m;f++){const t=l[f],e=s[f];if(void 0!==t&&bt(t)){u["*"===t?"*":t.slice(1)]=s.slice(f).map(decodeURIComponent).join("/");break}if(void 0===e){c=!0;break}let n=yt.exec(t);if(n&&!a){const t=decodeURIComponent(e);u[n[1]]=t}else if(t!==e){c=!0;break}}if(!c){n={route:r,params:u,uri:"/"+s.slice(0,f).join("/")};break}}return n||o||null}function St(t,e){return t+(e?`?${e}`:"")}function Pt(t,e){return`${wt("/"===e?t:`${wt(t)}/${wt(e)}`)}/`}function Ct(t){let e;const n=t[9].default,o=l(n,t,t[8],null);return{c(){o&&o.c()},m(t,n){o&&o.m(t,n),e=!0},p(t,[r]){o&&o.p&&(!e||256&r)&&f(o,n,t,t[8],e?m(n,t[8],r,null):p(t[8]),null)},i(t){e||(Z(o,t),e=!0)},o(t){tt(o,t),e=!1},d(t){o&&o.d(t)}}}function Mt(t,e,n){let o,r,s,{$$slots:a={},$$scope:i}=e,{basepath:l="/"}=e,{url:u=null}=e;const m=j(dt),f=j($t),p=ft([]);c(t,p,(t=>n(6,r=t)));const d=ft(null);let $=!1;const h=m||ft(u?{pathname:u}:gt.location);c(t,h,(t=>n(5,o=t)));const g=f?f.routerBase:ft({path:l,uri:l});c(t,g,(t=>n(7,s=t)));const v=pt([g,d],(([t,e])=>{if(null===e)return t;const{path:n}=t,{route:o,uri:r}=e;return{path:o.default?n:o.path.replace(/\*.*$/,""),uri:r}}));return m||(T((()=>gt.listen((t=>{h.set(t.location)})))),R(dt,h)),R($t,{activeRoute:d,base:g,routerBase:v,registerRoute:function(t){const{path:e}=s;let{path:n}=t;if(t._path=n,t.path=Pt(e,n),"undefined"==typeof window){if($)return;const e=function(t,e){return Et([t],e)}(t,o.pathname);e&&(d.set(e),$=!0)}else p.update((e=>(e.push(t),e)))},unregisterRoute:function(t){p.update((e=>{const n=e.indexOf(t);return e.splice(n,1),e}))}}),t.$$set=t=>{"basepath"in t&&n(3,l=t.basepath),"url"in t&&n(4,u=t.url),"$$scope"in t&&n(8,i=t.$$scope)},t.$$.update=()=>{if(128&t.$$.dirty){const{path:t}=s;p.update((e=>(e.forEach((e=>e.path=Pt(t,e._path))),e)))}if(96&t.$$.dirty){const t=Et(r,o.pathname);d.set(t)}},[p,h,g,l,u,o,r,s,i,a]}class zt extends ut{constructor(t){super(),lt(this,t,Mt,Ct,a,{basepath:3,url:4})}}const Lt=t=>({params:4&t,location:16&t}),Nt=t=>({params:t[2],location:t[4]});function Tt(t){let e,n,o,r;const s=[Rt,Ht],a=[];function i(t,e){return null!==t[0]?0:1}return e=i(t),n=a[e]=s[e](t),{c(){n.c(),o=w()},m(t,n){a[e].m(t,n),g(t,o,n),r=!0},p(t,r){let c=e;e=i(t),e===c?a[e].p(t,r):(Y(),tt(a[c],1,1,(()=>{a[c]=null})),J(),n=a[e],n?n.p(t,r):(n=a[e]=s[e](t),n.c()),Z(n,1),n.m(o.parentNode,o))},i(t){r||(Z(n),r=!0)},o(t){tt(n),r=!1},d(t){a[e].d(t),t&&v(o)}}}function Ht(t){let e;const n=t[10].default,o=l(n,t,t[9],Nt);return{c(){o&&o.c()},m(t,n){o&&o.m(t,n),e=!0},p(t,r){o&&o.p&&(!e||532&r)&&f(o,n,t,t[9],e?m(n,t[9],r,Lt):p(t[9]),Nt)},i(t){e||(Z(o,t),e=!0)},o(t){tt(o,t),e=!1},d(t){o&&o.d(t)}}}function Rt(t){let n,o,r;const s=[{location:t[4]},t[2],t[3]];var a=t[0];function i(t){let n={};for(let t=0;t<s.length;t+=1)n=e(n,s[t]);return{props:n}}return a&&(n=new a(i())),{c(){n&&st(n.$$.fragment),o=w()},m(t,e){n&&at(n,t,e),g(t,o,e),r=!0},p(t,e){const r=28&e?nt(s,[16&e&&{location:t[4]},4&e&&ot(t[2]),8&e&&ot(t[3])]):{};if(a!==(a=t[0])){if(n){Y();const t=n;tt(t.$$.fragment,1,0,(()=>{it(t,1)})),J()}a?(n=new a(i()),st(n.$$.fragment),Z(n.$$.fragment,1),at(n,o.parentNode,o)):n=null}else a&&n.$set(r)},i(t){r||(n&&Z(n.$$.fragment,t),r=!0)},o(t){n&&tt(n.$$.fragment,t),r=!1},d(t){t&&v(o),n&&it(n,t)}}}function jt(t){let e,n,o=null!==t[1]&&t[1].route===t[7]&&Tt(t);return{c(){o&&o.c(),e=w()},m(t,r){o&&o.m(t,r),g(t,e,r),n=!0},p(t,[n]){null!==t[1]&&t[1].route===t[7]?o?(o.p(t,n),2&n&&Z(o,1)):(o=Tt(t),o.c(),Z(o,1),o.m(e.parentNode,e)):o&&(Y(),tt(o,1,1,(()=>{o=null})),J())},i(t){n||(Z(o),n=!0)},o(t){tt(o),n=!1},d(t){o&&o.d(t),t&&v(e)}}}function At(t,n,o){let r,s,{$$slots:a={},$$scope:i}=n,{path:l=""}=n,{component:u=null}=n;const{registerRoute:m,unregisterRoute:f,activeRoute:p}=j($t);c(t,p,(t=>o(1,r=t)));const $=j(dt);c(t,$,(t=>o(4,s=t)));const h={path:l,default:""===l};let g={},v={};var y;return m(h),"undefined"!=typeof window&&(y=()=>{f(h)},N().$$.on_destroy.push(y)),t.$$set=t=>{o(13,n=e(e({},n),d(t))),"path"in t&&o(8,l=t.path),"component"in t&&o(0,u=t.component),"$$scope"in t&&o(9,i=t.$$scope)},t.$$.update=()=>{2&t.$$.dirty&&r&&r.route===h&&o(2,g=r.params);{const{path:t,component:e,...r}=n;o(3,v=r)}},n=d(n),[u,r,g,v,s,p,$,h,l,i,a]}class Vt extends ut{constructor(t){super(),lt(this,t,At,jt,a,{path:8,component:0})}}function Ft(t){let n,o,r,s;const a=t[16].default,i=l(a,t,t[15],null);let c=[{href:t[0]},{"aria-current":t[2]},t[1],t[6]],u={};for(let t=0;t<c.length;t+=1)u=e(u,c[t]);return{c(){n=_("a"),i&&i.c(),P(n,u)},m(e,a){g(e,n,a),i&&i.m(n,null),o=!0,r||(s=k(n,"click",t[5]),r=!0)},p(t,[e]){i&&i.p&&(!o||32768&e)&&f(i,a,t,t[15],o?m(a,t[15],e,null):p(t[15]),null),P(n,u=nt(c,[(!o||1&e)&&{href:t[0]},(!o||4&e)&&{"aria-current":t[2]},2&e&&t[1],64&e&&t[6]]))},i(t){o||(Z(i,t),o=!0)},o(t){tt(i,t),o=!1},d(t){t&&v(n),i&&i.d(t),r=!1,s()}}}function Ot(t,n,o){let r;const s=["to","replace","state","getProps"];let a,i,l=$(n,s),{$$slots:u={},$$scope:m}=n,{to:f="#"}=n,{replace:p=!1}=n,{state:h={}}=n,{getProps:g=(()=>({}))}=n;const{base:v}=j($t);c(t,v,(t=>o(14,i=t)));const y=j(dt);c(t,y,(t=>o(13,a=t)));const _=H();let b,x,w,k;return t.$$set=t=>{n=e(e({},n),d(t)),o(6,l=$(n,s)),"to"in t&&o(7,f=t.to),"replace"in t&&o(8,p=t.replace),"state"in t&&o(9,h=t.state),"getProps"in t&&o(10,g=t.getProps),"$$scope"in t&&o(15,m=t.$$scope)},t.$$.update=()=>{16512&t.$$.dirty&&o(0,b="/"===f?i.uri:function(t,e){if(_t(t,"/"))return t;const[n,o]=t.split("?"),[r]=e.split("?"),s=xt(n),a=xt(r);if(""===s[0])return St(r,o);if(!_t(s[0],"."))return St(("/"===r?"":"/")+a.concat(s).join("/"),o);const i=a.concat(s),c=[];return i.forEach((t=>{".."===t?c.pop():"."!==t&&c.push(t)})),St("/"+c.join("/"),o)}(f,i.uri)),8193&t.$$.dirty&&o(11,x=_t(a.pathname,b)),8193&t.$$.dirty&&o(12,w=b===a.pathname),4096&t.$$.dirty&&o(2,r=w?"page":void 0),15361&t.$$.dirty&&o(1,k=g({location:a,href:b,isPartiallyCurrent:x,isCurrent:w}))},[b,k,r,v,y,function(t){if(_("click",t),function(t){return!t.defaultPrevented&&0===t.button&&!(t.metaKey||t.altKey||t.ctrlKey||t.shiftKey)}(t)){t.preventDefault();const e=a.pathname===b||p;vt(b,{state:h,replace:e})}},l,f,p,h,g,x,w,a,i,m,u]}class Bt extends ut{constructor(t){super(),lt(this,t,Ot,Ft,a,{to:7,replace:8,state:9,getProps:10})}}const It="",Qt="report",Ut="faqs",Dt="email";function Kt(e){let n;return{c(){var t,e,o,r;n=_("div"),n.innerHTML='<div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true"><div class="toast-header p-3"><i class="fa-solid fa-circle-exclamation px-2 text-danger"></i> \n        \n        <strong class="me-auto">Seach Field Empty</strong> \n        \n        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button></div></div>',S(n,"class","position-fixed bottom-0 end-0 p-3"),t=n,e="z-index",null===(o="11")?t.style.removeProperty(e):t.style.setProperty(e,o,r?"important":"")},m(t,e){g(t,n,e)},p:t,i:t,o:t,d(t){t&&v(n)}}}class qt extends ut{constructor(t){super(),lt(this,t,null,Kt,a,{})}}function Gt(t){let e;return{c(){e=b("Home")},m(t,n){g(t,e,n)},d(t){t&&v(e)}}}function Wt(t){let e;return{c(){e=b("Report")},m(t,n){g(t,e,n)},d(t){t&&v(e)}}}function Xt(t){let e;return{c(){e=b("FAQs")},m(t,n){g(t,e,n)},d(t){t&&v(e)}}}function Yt(t){let e,n,o,s,a,i,c,l,u,m,f,p,d,$,y,w,P,C,z,L,N,T,H,R,j,A,V,F,O,B,I;return p=new Bt({props:{class:"nav-link "+(t[1]===It?"active":""),to:It,replace:!0,state:{search:""},$$slots:{default:[Gt]},$$scope:{ctx:t}}}),p.$on("click",t[4]),y=new Bt({props:{class:"nav-link "+(t[1]===Qt?"active":""),to:Qt,$$slots:{default:[Wt]},$$scope:{ctx:t}}}),y.$on("click",t[5]),C=new Bt({props:{class:"nav-link "+(t[1]===Ut?"active":""),to:Ut,$$slots:{default:[Xt]},$$scope:{ctx:t}}}),C.$on("click",t[6]),A=new qt({}),{c(){e=_("div"),n=_("nav"),o=_("div"),s=_("a"),a=b("Scam Email Finder"),i=x(),c=_("button"),c.innerHTML='<span class="navbar-toggler-icon"></span>',l=x(),u=_("div"),m=_("ul"),f=_("li"),st(p.$$.fragment),d=x(),$=_("li"),st(y.$$.fragment),w=x(),P=_("li"),st(C.$$.fragment),z=x(),L=_("div"),N=_("form"),T=_("input"),H=x(),R=_("button"),R.textContent="Search",j=x(),st(A.$$.fragment),V=x(),F=_("br"),S(s,"class","navbar-brand fs-1 text-decoration-none"),S(s,"href","/"+It),S(c,"class","navbar-toggler"),S(c,"type","button"),S(c,"data-bs-toggle","collapse"),S(c,"data-bs-target","#navbarNav"),S(c,"aria-controls","navbarNav"),S(c,"aria-expanded","false"),S(c,"aria-label","Toggle navigation"),S(f,"class","nav-item"),S($,"class","nav-item"),S(P,"class","nav-item d-flex"),S(m,"class","navbar-nav mb-2 mb-lg-0"),S(u,"class","end-lined collapse navbar-collapse svelte-w7208t"),S(u,"id","navbarNav"),S(o,"class","container-fluid"),S(n,"class","navbar navbar-expand-lg navbar-light "),S(T,"class","form-control me-2"),S(T,"type","search"),S(T,"placeholder","Search Email"),S(T,"aria-label","Search"),S(R,"class","btn btn-outline-success"),S(R,"type","submit"),S(R,"id","liveToastBtn"),S(N,"class","d-flex"),S(L,"class","container-fluid"),S(e,"class","header bg-light svelte-w7208t")},m(r,v){g(r,e,v),h(e,n),h(n,o),h(o,s),h(s,a),h(o,i),h(o,c),h(o,l),h(o,u),h(u,m),h(m,f),at(p,f,null),h(m,d),h(m,$),at(y,$,null),h(m,w),h(m,P),at(C,P,null),h(e,z),h(e,L),h(L,N),h(N,T),M(T,t[0]),h(N,H),h(N,R),h(e,j),at(A,e,null),h(e,V),h(e,F),O=!0,B||(I=[k(s,"click",t[3]),k(T,"input",t[7]),k(R,"click",E(t[2]))],B=!0)},p(t,[e]){const n={};2&e&&(n.class="nav-link "+(t[1]===It?"active":"")),256&e&&(n.$$scope={dirty:e,ctx:t}),p.$set(n);const o={};2&e&&(o.class="nav-link "+(t[1]===Qt?"active":"")),256&e&&(o.$$scope={dirty:e,ctx:t}),y.$set(o);const r={};2&e&&(r.class="nav-link "+(t[1]===Ut?"active":"")),256&e&&(r.$$scope={dirty:e,ctx:t}),C.$set(r),1&e&&M(T,t[0])},i(t){O||(Z(p.$$.fragment,t),Z(y.$$.fragment,t),Z(C.$$.fragment,t),Z(A.$$.fragment,t),O=!0)},o(t){tt(p.$$.fragment,t),tt(y.$$.fragment,t),tt(C.$$.fragment,t),tt(A.$$.fragment,t),O=!1},d(t){t&&v(e),it(p),it(y),it(C),it(A),B=!1,r(I)}}}function Jt(t,e,n){let{search_email:o=""}=e,{current:r=""}=e;return t.$$set=t=>{"search_email"in t&&n(0,o=t.search_email),"current"in t&&n(1,r=t.current)},[o,r,()=>{if(""!==o.trim())r!==It&&vt("/"+It,{replace:!0,state:{search:o}});else{var t=document.getElementById("liveToast");new bootstrap.Toast(t).show()}},()=>n(1,r=It),()=>n(1,r=It),()=>n(1,r=Qt),()=>n(1,r=Ut),function(){o=this.value,n(0,o)}]}class Zt extends ut{constructor(t){super(),lt(this,t,Jt,Yt,a,{search_email:0,current:1})}}const te=[{id:1,email:"fofis15650@arpizol.com",type_of_scam:"Survey",report_count:"100",first:"2005",comments:"100"},{id:2,email:"Beemsee28@jourrapide.com",type_of_scam:"PayPal",report_count:"100",first:"2005",comments:"100"},{id:3,email:"rnewman@yahoo.ca",type_of_scam:"Mystery Shopper",report_count:"100",first:"2005",comments:"100"},{id:4,email:"hermanab@outlook.com",type_of_scam:"Quiz",report_count:"100",first:"2005",comments:"100"},{id:5,email:"stewwy@gmail.com",type_of_scam:"Hidden URL",report_count:"100",first:"2005",comments:"100"},{id:6,email:"cderoove@verizon.net",type_of_scam:"PayPal",report_count:"100",first:"2005",comments:"100"},{id:7,email:"uncled@gmail.com",type_of_scam:"Mystery Shopper",report_count:"100",first:"2005",comments:"100"},{id:8,email:"trygstad@mac.com",type_of_scam:"Quiz",report_count:"100",first:"2005",comments:"100"},{id:9,email:"fake@gmail.com",type_of_scam:"Hidden URL",report_count:"100",first:"2005",comments:"100"},{id:10,email:"mastinfo@me.com",type_of_scam:"Mystery Shopper",report_count:"100",first:"2005",comments:"100"},{id:11,email:"privcan@mac.com",type_of_scam:"Quiz",report_count:"100",first:"2005",comments:"100"},{id:12,email:"seurat@sbcglobal.net",type_of_scam:"Hidden URL",report_count:"100",first:"2005",comments:"100"},{id:13,email:"cderoove@verizon.net",type_of_scam:"PayPal",report_count:"100",first:"2005",comments:"100"},{id:14,email:"campbell@me.com",type_of_scam:"Mystery Shopper",report_count:"100",first:"2005",comments:"100"},{id:15,email:"barjam@aol.com",type_of_scam:"Quiz",report_count:"100",first:"2005",comments:"100"},{id:16,email:"itstatus@gmail.com",type_of_scam:"Hidden URL",report_count:"100",first:"2005",comments:"100"},{id:17,email:"padme@icloud.com",type_of_scam:"PayPal",report_count:"100",first:"2005",comments:"100"},{id:18,email:"intlprog@gmail.com",type_of_scam:"Mystery Shopper",report_count:"100",first:"2005",comments:"100"}];function ee(t,e,n){const o=t.slice();return o[14]=e[n],o[16]=n,o}function ne(t,e,n){const o=t.slice();return o[17]=e[n],o}function oe(t,e,n){const o=t.slice();return o[20]=e[n],o}function re(e){let n,o,r=e[20]+"";return{c(){n=_("th"),o=b(r),S(n,"scope","col")},m(t,e){g(t,n,e),h(n,o)},p:t,d(t){t&&v(n)}}}function se(t,e){let n,o,r,s,a,i,c,l,u,m,f,p,d,$,y,w,E,P,M,z,L,N,T,H=e[17].id+"",R=e[17].email+"",j=e[17].type_of_scam+"",A=e[17].report_count+"",V=e[17].first+"",F=e[17].comments+"";function O(){return e[10](e[17])}return{key:t,first:null,c(){n=_("tr"),o=_("td"),r=b(H),s=x(),a=_("td"),i=b(R),c=x(),l=_("td"),u=b(j),m=x(),f=_("td"),p=b(A),d=x(),$=_("td"),y=b(V),w=x(),E=_("td"),P=b(F),M=x(),z=_("td"),z.innerHTML='<i class="fa-solid fa-angle-right"></i>',L=x(),S(n,"class","svelte-122fdz1"),this.first=n},m(t,e){g(t,n,e),h(n,o),h(o,r),h(n,s),h(n,a),h(a,i),h(n,c),h(n,l),h(l,u),h(n,m),h(n,f),h(f,p),h(n,d),h(n,$),h($,y),h(n,w),h(n,E),h(E,P),h(n,M),h(n,z),h(n,L),N||(T=k(n,"click",O),N=!0)},p(t,n){e=t,4&n&&H!==(H=e[17].id+"")&&C(r,H),4&n&&R!==(R=e[17].email+"")&&C(i,R),4&n&&j!==(j=e[17].type_of_scam+"")&&C(u,j),4&n&&A!==(A=e[17].report_count+"")&&C(p,A),4&n&&V!==(V=e[17].first+"")&&C(y,V),4&n&&F!==(F=e[17].comments+"")&&C(P,F)},d(t){t&&v(n),N=!1,T()}}}function ae(t){let e;return{c(){e=_("h1"),e.textContent="No Email Found",S(e,"class","text-center")},m(t,n){g(t,e,n)},d(t){t&&v(e)}}}function ie(t){let e,n,o,r,s,a,i=t[16]+1+"";function c(){return t[12](t[16])}return{c(){e=_("li"),n=_("span"),o=b(i),S(n,"class","page-link svelte-122fdz1"),S(e,"class",r="page-item "+(t[16]+1==t[0]?"active":""))},m(t,r){g(t,e,r),h(e,n),h(n,o),s||(a=k(n,"click",c),s=!0)},p(n,o){t=n,1&o&&r!==(r="page-item "+(t[16]+1==t[0]?"active":""))&&S(e,"class",r)},d(t){t&&v(e),s=!1,a()}}}function ce(e){let n,o,s,a,i,c,l,u,m,f,p,d,$,b,w,E,P,C,M,z,L=[],N=new Map,T=e[3],H=[];for(let t=0;t<T.length;t+=1)H[t]=re(oe(e,T,t));let R=e[2];const j=t=>t[17].id;for(let t=0;t<R.length;t+=1){let n=ne(e,R,t),o=j(n);N.set(o,L[t]=se(o,n))}let A=0===e[2].length&&ae(),V=Array(e[1]),F=[];for(let t=0;t<V.length;t+=1)F[t]=ie(ee(e,V,t));return{c(){n=_("div"),o=_("table"),s=_("thead"),a=_("tr");for(let t=0;t<H.length;t+=1)H[t].c();i=x(),c=_("tbody");for(let t=0;t<L.length;t+=1)L[t].c();l=x(),A&&A.c(),u=x(),m=_("nav"),f=_("ul"),p=_("li"),d=_("span"),d.textContent="Previous",b=x();for(let t=0;t<F.length;t+=1)F[t].c();w=x(),E=_("li"),P=_("span"),P.textContent="Next",S(a,"class","svelte-122fdz1"),S(o,"class","table table-bordered table-hover table-striped"),S(d,"class","page-link svelte-122fdz1"),S(p,"class",$="page-item "+(e[0]<=1?"disabled":"")),S(P,"class","page-link svelte-122fdz1"),S(E,"class",C="page-item "+(e[0]>=e[1]?"disabled":"")),S(f,"class","pagination pagination-sm"),S(m,"aria-label","Page navigation example"),S(n,"class","body svelte-122fdz1")},m(t,r){g(t,n,r),h(n,o),h(o,s),h(s,a);for(let t=0;t<H.length;t+=1)H[t].m(a,null);h(o,i),h(o,c);for(let t=0;t<L.length;t+=1)L[t].m(c,null);h(n,l),A&&A.m(n,null),h(n,u),h(n,m),h(m,f),h(f,p),h(p,d),h(f,b);for(let t=0;t<F.length;t+=1)F[t].m(f,null);h(f,w),h(f,E),h(E,P),M||(z=[k(d,"click",e[11]),k(P,"click",e[13])],M=!0)},p(t,[e]){if(8&e){let n;for(T=t[3],n=0;n<T.length;n+=1){const o=oe(t,T,n);H[n]?H[n].p(o,e):(H[n]=re(o),H[n].c(),H[n].m(a,null))}for(;n<H.length;n+=1)H[n].d(1);H.length=T.length}if(132&e&&(R=t[2],L=function(t,e,n,o,r,s,a,i,c,l,u,m){let f=t.length,p=s.length,d=f;const $={};for(;d--;)$[t[d].key]=d;const h=[],g=new Map,v=new Map;for(d=p;d--;){const t=m(r,s,d),i=n(t);let c=a.get(i);c?o&&c.p(t,e):(c=l(i,t),c.c()),g.set(i,h[d]=c),i in $&&v.set(i,Math.abs(d-$[i]))}const y=new Set,_=new Set;function b(t){Z(t,1),t.m(i,u),a.set(t.key,t),u=t.first,p--}for(;f&&p;){const e=h[p-1],n=t[f-1],o=e.key,r=n.key;e===n?(u=e.first,f--,p--):g.has(r)?!a.has(o)||y.has(o)?b(e):_.has(r)?f--:v.get(o)>v.get(r)?(_.add(o),b(e)):(y.add(r),f--):(c(n,a),f--)}for(;f--;){const e=t[f];g.has(e.key)||c(e,a)}for(;p;)b(h[p-1]);return h}(L,e,j,1,t,R,N,c,et,se,null,ne)),0===t[2].length?A||(A=ae(),A.c(),A.m(n,u)):A&&(A.d(1),A=null),1&e&&$!==($="page-item "+(t[0]<=1?"disabled":""))&&S(p,"class",$),67&e){let n;for(V=Array(t[1]),n=0;n<V.length;n+=1){const o=ee(t,V,n);F[n]?F[n].p(o,e):(F[n]=ie(o),F[n].c(),F[n].m(f,w))}for(;n<F.length;n+=1)F[n].d(1);F.length=V.length}3&e&&C!==(C="page-item "+(t[0]>=t[1]?"disabled":""))&&S(E,"class",C)},i:t,o:t,d(t){t&&v(n),y(H,t);for(let t=0;t<L.length;t+=1)L[t].d();A&&A.d(),y(F,t),M=!1,r(z)}}}function le(t,e,n){let o,r,s,a,{search_email:i=""}=e;function c(){1!=o&&n(0,o-=1)}function l(){o!=r&&n(0,o+=1)}function u(t){t<1||t>r||n(0,o=t)}function m(t){console.log(t),vt("/"+Dt+"/"+t,{replace:!1,state:{id:t}})}return t.$$set=t=>{"search_email"in t&&n(8,i=t.search_email)},t.$$.update=()=>{256&t.$$.dirty&&n(0,(i.trim(),o=1)),256&t.$$.dirty&&n(9,s=te.filter((t=>t.email.toLowerCase().startsWith(i.trim().toLowerCase())))),512&t.$$.dirty&&n(1,r=Math.round(s.length/10)),513&t.$$.dirty&&n(2,a=s.slice(10*(o-1),10*o))},[o,r,a,["#","Email","Type of Scam","Number of Reports","First Occurance","Comments",""],c,l,u,m,i,s,t=>m(t.id),()=>c(),t=>u(t+1),()=>l()]}class ue extends ut{constructor(t){super(),lt(this,t,le,ce,a,{search_email:8})}}function me(t){let e,n,o,r,s,a,i;function c(e){t[1](e)}let l={};function u(e){t[2](e)}void 0!==t[0]&&(l.search_email=t[0]),n=new Zt({props:l}),V.push((()=>rt(n,"search_email",c)));let m={};return void 0!==t[0]&&(m.search_email=t[0]),s=new ue({props:m}),V.push((()=>rt(s,"search_email",u))),{c(){e=_("main"),st(n.$$.fragment),r=x(),st(s.$$.fragment),S(e,"class","")},m(t,o){g(t,e,o),at(n,e,null),h(e,r),at(s,e,null),i=!0},p(t,[e]){const r={};!o&&1&e&&(o=!0,r.search_email=t[0],U((()=>o=!1))),n.$set(r);const i={};!a&&1&e&&(a=!0,i.search_email=t[0],U((()=>a=!1))),s.$set(i)},i(t){i||(Z(n.$$.fragment,t),Z(s.$$.fragment,t),i=!0)},o(t){tt(n.$$.fragment,t),tt(s.$$.fragment,t),i=!1},d(t){t&&v(e),it(n),it(s)}}}function fe(t,e,n){let{search_email:o=""}=e;return T((async()=>{history.state&&n(0,o=history.state.search?history.state.search:"")})),t.$$set=t=>{"search_email"in t&&n(0,o=t.search_email)},[o,function(t){o=t,n(0,o)},function(t){o=t,n(0,o)}]}class pe extends ut{constructor(t){super(),lt(this,t,fe,me,a,{search_email:0})}}function de(e){let n,o,s,a,i,c,l,u,m,f,p,d,$,y,w,P,z,L,N,T,H,R,j,A,V,F,O,B,I,Q,U,D,K,q,G,W,X,Y,J,Z,tt,et,nt,ot,rt,st,at=e[1].nameVar+"",it=e[1].email+"",ct=e[1].scam_email+"",lt=e[1].type_of_scam+"",ut=e[1].info+"";return{c(){n=_("div"),o=_("h1"),o.textContent="Scam Email Ticket",s=x(),a=_("form"),i=_("p"),i.textContent="Your Information",c=x(),l=_("div"),u=b("Name:\n            "),m=_("input"),f=x(),p=_("div"),d=b(at),$=x(),y=_("div"),w=b("Email:\n            "),P=_("input"),z=x(),L=_("div"),N=b(it),T=x(),H=_("p"),H.textContent="Scam Information:",R=x(),j=_("div"),A=b("Scam Email:\n            "),V=_("input"),F=x(),O=_("div"),B=b(ct),I=x(),Q=_("div"),U=b("Scam type:\n            "),D=_("input"),K=x(),q=_("div"),G=b(lt),W=x(),X=_("div"),Y=b("Information about the event:\n            "),J=_("textarea"),Z=x(),tt=_("div"),et=b(ut),nt=x(),ot=_("button"),ot.textContent="Send",S(o,"id","header"),S(o,"class","svelte-vb6a3i"),S(i,"id","info"),S(i,"class","svelte-vb6a3i"),S(m,"type","text"),S(m,"id","name-input"),S(m,"class","svelte-vb6a3i"),S(l,"id","name"),S(l,"class","svelte-vb6a3i"),S(p,"class","error svelte-vb6a3i"),S(P,"type","text"),S(P,"id","email-input"),S(P,"class","svelte-vb6a3i"),S(y,"id","email"),S(y,"class","svelte-vb6a3i"),S(L,"class","error svelte-vb6a3i"),S(H,"id","scam-info"),S(H,"class","svelte-vb6a3i"),S(V,"type","text"),S(V,"id","scam-email-input"),S(V,"class","svelte-vb6a3i"),S(j,"id","scam-email"),S(j,"class","svelte-vb6a3i"),S(O,"class","error svelte-vb6a3i"),S(D,"type","text"),S(D,"id","scam-type-input"),S(D,"class","svelte-vb6a3i"),S(Q,"id","scam-type"),S(Q,"class","svelte-vb6a3i"),S(q,"class","error svelte-vb6a3i"),S(J,"class","event-info-input svelte-vb6a3i"),S(X,"id","event-info"),S(X,"class","svelte-vb6a3i"),S(tt,"class","error svelte-vb6a3i"),S(ot,"class","btn btn-success svelte-vb6a3i"),S(ot,"type","submit"),S(a,"id","input-area"),S(a,"class","svelte-vb6a3i"),S(n,"class","body svelte-vb6a3i")},m(t,r){g(t,n,r),h(n,o),h(n,s),h(n,a),h(a,i),h(a,c),h(a,l),h(l,u),h(l,m),M(m,e[0].nameVar),h(a,f),h(a,p),h(p,d),h(a,$),h(a,y),h(y,w),h(y,P),M(P,e[0].email),h(a,z),h(a,L),h(L,N),h(a,T),h(a,H),h(a,R),h(a,j),h(j,A),h(j,V),M(V,e[0].scam_email),h(a,F),h(a,O),h(O,B),h(a,I),h(a,Q),h(Q,U),h(Q,D),M(D,e[0].type_of_scam),h(a,K),h(a,q),h(q,G),h(a,W),h(a,X),h(X,Y),h(X,J),M(J,e[0].info),h(a,Z),h(a,tt),h(tt,et),h(a,nt),h(a,ot),rt||(st=[k(m,"input",e[3]),k(P,"input",e[4]),k(V,"input",e[5]),k(D,"input",e[6]),k(J,"input",e[7]),k(a,"submit",E(e[2]))],rt=!0)},p(t,[e]){1&e&&m.value!==t[0].nameVar&&M(m,t[0].nameVar),2&e&&at!==(at=t[1].nameVar+"")&&C(d,at),1&e&&P.value!==t[0].email&&M(P,t[0].email),2&e&&it!==(it=t[1].email+"")&&C(N,it),1&e&&V.value!==t[0].scam_email&&M(V,t[0].scam_email),2&e&&ct!==(ct=t[1].scam_email+"")&&C(B,ct),1&e&&D.value!==t[0].type_of_scam&&M(D,t[0].type_of_scam),2&e&&lt!==(lt=t[1].type_of_scam+"")&&C(G,lt),1&e&&M(J,t[0].info),2&e&&ut!==(ut=t[1].info+"")&&C(et,ut)},i:t,o:t,d(t){t&&v(n),rt=!1,r(st)}}}function $e(t,e,n){let o={nameVar:"",email:"",scam_email:"",type_of_scam:"",info:""},r={nameVar:"",email:"",scam_email:"",type_of_scam:"",info:""},s=!1;return[o,r,()=>{s=!0,0==o.nameVar.trim().length?(s=!1,n(1,r.nameVar="Name cannot be empty!",r)):n(1,r.nameVar="",r),o.email.trim().length<4?(s=!1,n(1,r.email="Email must be at least 4 characters long!",r)):n(1,r.email="",r),o.scam_email.trim().length<4?(s=!1,n(1,r.scam_email="Scam email must be at least 4 characters long!",r)):n(1,r.scam_email="",r),0==o.type_of_scam.trim().length?(s=!1,n(1,r.type_of_scam="Type of scam cannot be empty!",r)):n(1,r.type_of_scam="",r),s&&function(){for(let t=0;t<te.length;t++)if(o.scam_email==te[t].email)return te[t].report_count++,void console.log(te[t].report_count);const t={id:te.length+1,email:o.scam_email,type_of_scam:o.type_of_scam,report_count:"1",first:"2022",comments:"0"};te.push(t)}()},function(){o.nameVar=this.value,n(0,o)},function(){o.email=this.value,n(0,o)},function(){o.scam_email=this.value,n(0,o)},function(){o.type_of_scam=this.value,n(0,o)},function(){o.info=this.value,n(0,o)}]}class he extends ut{constructor(t){super(),lt(this,t,$e,de,a,{})}}function ge(e){let n,o,r,s,a;return o=new Zt({props:{current:Qt}}),s=new he({}),{c(){n=_("div"),st(o.$$.fragment),r=x(),st(s.$$.fragment)},m(t,e){g(t,n,e),at(o,n,null),h(n,r),at(s,n,null),a=!0},p:t,i(t){a||(Z(o.$$.fragment,t),Z(s.$$.fragment,t),a=!0)},o(t){tt(o.$$.fragment,t),tt(s.$$.fragment,t),a=!1},d(t){t&&v(n),it(o),it(s)}}}class ve extends ut{constructor(t){super(),lt(this,t,null,ge,a,{})}}function ye(e){let n,o,r,s,a;return o=new Zt({props:{current:Ut}}),{c(){n=_("div"),st(o.$$.fragment),r=x(),s=_("h1"),s.textContent="FAQs"},m(t,e){g(t,n,e),at(o,n,null),h(n,r),h(n,s),a=!0},p:t,i(t){a||(Z(o.$$.fragment,t),a=!0)},o(t){tt(o.$$.fragment,t),a=!1},d(t){t&&v(n),it(o)}}}class _e extends ut{constructor(t){super(),lt(this,t,null,ye,a,{})}}function be(t){let e,n,o,r,s,a,i,c,l,u=t[1].email+"";return n=new Zt({props:{current:Dt+"/"+t[0]}}),{c(){e=_("div"),st(n.$$.fragment),o=x(),r=_("h1"),s=b("Email Page id: "),a=b(t[0]),i=b(", email: "),c=b(u)},m(t,u){g(t,e,u),at(n,e,null),h(e,o),h(e,r),h(r,s),h(r,a),h(r,i),h(r,c),l=!0},p(t,[e]){const o={};1&e&&(o.current=Dt+"/"+t[0]),n.$set(o),(!l||1&e)&&C(a,t[0])},i(t){l||(Z(n.$$.fragment,t),l=!0)},o(t){tt(n.$$.fragment,t),l=!1},d(t){t&&v(e),it(n)}}}function xe(t,e,n){let{id:o=""}=e,r=te.find((t=>t.id==o));return t.$$set=t=>{"id"in t&&n(0,o=t.id)},[o,r]}class we extends ut{constructor(t){super(),lt(this,t,xe,be,a,{id:0})}}function ke(e){let n,o,r,s,a;return{c(){n=_("h1"),n.textContent="Page Not Found",o=x(),r=_("div"),r.innerHTML='<div style="width:100%;height:0;padding-bottom:84%;position:relative;"><iframe title="404" src="https://giphy.com/embed/H54feNXf6i4eAQubud" width="100%" height="100%" style="position:absolute" frameborder="0" class="giphy-embed" allowfullscreen=""></iframe></div>',s=x(),a=_("div"),a.innerHTML='<button class="btn btn-success btn-lg svelte-16yidm2"><a href="/" class="svelte-16yidm2">Go Home</a></button>',S(n,"class","text-center"),S(r,"class","center svelte-16yidm2")},m(t,e){g(t,n,e),g(t,o,e),g(t,r,e),g(t,s,e),g(t,a,e)},p:t,i:t,o:t,d(t){t&&v(n),t&&v(o),t&&v(r),t&&v(s),t&&v(a)}}}class Ee extends ut{constructor(t){super(),lt(this,t,null,ke,a,{})}}function Se(t){let e,n;return e=new we({props:{id:t[1].id}}),{c(){st(e.$$.fragment)},m(t,o){at(e,t,o),n=!0},p(t,n){const o={};2&n&&(o.id=t[1].id),e.$set(o)},i(t){n||(Z(e.$$.fragment,t),n=!0)},o(t){tt(e.$$.fragment,t),n=!1},d(t){it(e,t)}}}function Pe(e){let n,o;return n=new pe({props:{search_email:""}}),{c(){st(n.$$.fragment)},m(t,e){at(n,t,e),o=!0},p:t,i(t){o||(Z(n.$$.fragment,t),o=!0)},o(t){tt(n.$$.fragment,t),o=!1},d(t){it(n,t)}}}function Ce(t){let e,n,o,r,s,a,i,c,l,u,m;return n=new Vt({props:{path:Dt+"/:id",$$slots:{default:[Se,({params:t})=>({1:t}),({params:t})=>t?2:0]},$$scope:{ctx:t}}}),r=new Vt({props:{path:Ut,component:_e}}),a=new Vt({props:{path:Qt,component:ve}}),c=new Vt({props:{path:"/",$$slots:{default:[Pe]},$$scope:{ctx:t}}}),u=new Vt({props:{component:Ee}}),{c(){e=_("div"),st(n.$$.fragment),o=x(),st(r.$$.fragment),s=x(),st(a.$$.fragment),i=x(),st(c.$$.fragment),l=x(),st(u.$$.fragment)},m(t,f){g(t,e,f),at(n,e,null),h(e,o),at(r,e,null),h(e,s),at(a,e,null),h(e,i),at(c,e,null),h(e,l),at(u,e,null),m=!0},p(t,e){const o={};6&e&&(o.$$scope={dirty:e,ctx:t}),n.$set(o);const r={};4&e&&(r.$$scope={dirty:e,ctx:t}),c.$set(r)},i(t){m||(Z(n.$$.fragment,t),Z(r.$$.fragment,t),Z(a.$$.fragment,t),Z(c.$$.fragment,t),Z(u.$$.fragment,t),m=!0)},o(t){tt(n.$$.fragment,t),tt(r.$$.fragment,t),tt(a.$$.fragment,t),tt(c.$$.fragment,t),tt(u.$$.fragment,t),m=!1},d(t){t&&v(e),it(n),it(r),it(a),it(c),it(u)}}}function Me(t){let e,n;return e=new zt({props:{url:t[0],$$slots:{default:[Ce]},$$scope:{ctx:t}}}),{c(){st(e.$$.fragment)},m(t,o){at(e,t,o),n=!0},p(t,[n]){const o={};1&n&&(o.url=t[0]),4&n&&(o.$$scope={dirty:n,ctx:t}),e.$set(o)},i(t){n||(Z(e.$$.fragment,t),n=!0)},o(t){tt(e.$$.fragment,t),n=!1},d(t){it(e,t)}}}function ze(t,e,n){let{url:o="/"}=e;return t.$$set=t=>{"url"in t&&n(0,o=t.url)},[o]}return new class extends ut{constructor(t){super(),lt(this,t,ze,Me,a,{url:0})}}({target:document.body,props:{name:"HCI-Spam Filter"}})}();
//# sourceMappingURL=bundle.js.map
