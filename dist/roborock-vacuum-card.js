var Tt=Object.defineProperty;var Bt=Object.getOwnPropertyDescriptor;var B=(n,e,t,r)=>{for(var i=r>1?void 0:r?Bt(e,t):e,a=n.length-1,o;a>=0;a--)(o=n[a])&&(i=(r?o(e,t,i):o(i))||i);return r&&i&&Tt(e,t,i),i};var Y=globalThis,G=Y.ShadowRoot&&(Y.ShadyCSS===void 0||Y.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ue=Symbol(),Re=new WeakMap,O=class{constructor(e,t,r){if(this._$cssResult$=!0,r!==ue)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(G&&e===void 0){let r=t!==void 0&&t.length===1;r&&(e=Re.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),r&&Re.set(t,e))}return e}toString(){return this.cssText}},Pe=n=>new O(typeof n=="string"?n:n+"",void 0,ue),me=(n,...e)=>{let t=n.length===1?n[0]:e.reduce((r,i,a)=>r+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+n[a+1],n[0]);return new O(t,n,ue)},Oe=(n,e)=>{if(G)n.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(let t of e){let r=document.createElement("style"),i=Y.litNonce;i!==void 0&&r.setAttribute("nonce",i),r.textContent=t.cssText,n.appendChild(r)}},he=G?n=>n:n=>n instanceof CSSStyleSheet?(e=>{let t="";for(let r of e.cssRules)t+=r.cssText;return Pe(t)})(n):n;var{is:Nt,defineProperty:Mt,getOwnPropertyDescriptor:Rt,getOwnPropertyNames:Pt,getOwnPropertySymbols:Ot,getPrototypeOf:Ht}=Object,J=globalThis,He=J.trustedTypes,Ft=He?He.emptyScript:"",Dt=J.reactiveElementPolyfillSupport,H=(n,e)=>n,F={toAttribute(n,e){switch(e){case Boolean:n=n?Ft:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,e){let t=n;switch(e){case Boolean:t=n!==null;break;case Number:t=n===null?null:Number(n);break;case Object:case Array:try{t=JSON.parse(n)}catch{t=null}}return t}},X=(n,e)=>!Nt(n,e),Fe={attribute:!0,type:String,converter:F,reflect:!1,useDefault:!1,hasChanged:X};Symbol.metadata??=Symbol("metadata"),J.litPropertyMetadata??=new WeakMap;var v=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=Fe){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let r=Symbol(),i=this.getPropertyDescriptor(e,r,t);i!==void 0&&Mt(this.prototype,e,i)}}static getPropertyDescriptor(e,t,r){let{get:i,set:a}=Rt(this.prototype,e)??{get(){return this[t]},set(o){this[t]=o}};return{get:i,set(o){let d=i?.call(this);a?.call(this,o),this.requestUpdate(e,d,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??Fe}static _$Ei(){if(this.hasOwnProperty(H("elementProperties")))return;let e=Ht(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(H("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(H("properties"))){let t=this.properties,r=[...Pt(t),...Ot(t)];for(let i of r)this.createProperty(i,t[i])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[r,i]of t)this.elementProperties.set(r,i)}this._$Eh=new Map;for(let[t,r]of this.elementProperties){let i=this._$Eu(t,r);i!==void 0&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let r=new Set(e.flat(1/0).reverse());for(let i of r)t.unshift(he(i))}else e!==void 0&&t.push(he(e));return t}static _$Eu(e,t){let r=t.attribute;return r===!1?void 0:typeof r=="string"?r:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let r of t.keys())this.hasOwnProperty(r)&&(e.set(r,this[r]),delete this[r]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Oe(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,r){this._$AK(e,r)}_$ET(e,t){let r=this.constructor.elementProperties.get(e),i=this.constructor._$Eu(e,r);if(i!==void 0&&r.reflect===!0){let a=(r.converter?.toAttribute!==void 0?r.converter:F).toAttribute(t,r.type);this._$Em=e,a==null?this.removeAttribute(i):this.setAttribute(i,a),this._$Em=null}}_$AK(e,t){let r=this.constructor,i=r._$Eh.get(e);if(i!==void 0&&this._$Em!==i){let a=r.getPropertyOptions(i),o=typeof a.converter=="function"?{fromAttribute:a.converter}:a.converter?.fromAttribute!==void 0?a.converter:F;this._$Em=i;let d=o.fromAttribute(t,a.type);this[i]=d??this._$Ej?.get(i)??d,this._$Em=null}}requestUpdate(e,t,r,i=!1,a){if(e!==void 0){let o=this.constructor;if(i===!1&&(a=this[e]),r??=o.getPropertyOptions(e),!((r.hasChanged??X)(a,t)||r.useDefault&&r.reflect&&a===this._$Ej?.get(e)&&!this.hasAttribute(o._$Eu(e,r))))return;this.C(e,t,r)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:r,reflect:i,wrapped:a},o){r&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,o??t??this[e]),a!==!0||o!==void 0)||(this._$AL.has(e)||(this.hasUpdated||r||(t=void 0),this._$AL.set(e,t)),i===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[i,a]of this._$Ep)this[i]=a;this._$Ep=void 0}let r=this.constructor.elementProperties;if(r.size>0)for(let[i,a]of r){let{wrapped:o}=a,d=this[i];o!==!0||this._$AL.has(i)||d===void 0||this.C(i,void 0,a,d)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(r=>r.hostUpdate?.()),this.update(t)):this._$EM()}catch(r){throw e=!1,this._$EM(),r}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(e){}firstUpdated(e){}};v.elementStyles=[],v.shadowRootOptions={mode:"open"},v[H("elementProperties")]=new Map,v[H("finalized")]=new Map,Dt?.({ReactiveElement:v}),(J.reactiveElementVersions??=[]).push("2.1.2");var be=globalThis,De=n=>n,Q=be.trustedTypes,Ue=Q?Q.createPolicy("lit-html",{createHTML:n=>n}):void 0,We="$lit$",_=`lit$${Math.random().toFixed(9).slice(2)}$`,Ve="?"+_,Ut=`<${Ve}>`,S=document,U=()=>S.createComment(""),q=n=>n===null||typeof n!="object"&&typeof n!="function",xe=Array.isArray,qt=n=>xe(n)||typeof n?.[Symbol.iterator]=="function",ge=`[ 	
\f\r]`,D=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,qe=/-->/g,Le=/>/g,A=RegExp(`>|${ge}(?:([^\\s"'>=/]+)(${ge}*=${ge}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ie=/'/g,ze=/"/g,Ke=/^(?:script|style|textarea|title)$/i,we=n=>(e,...t)=>({_$litType$:n,strings:e,values:t}),g=we(1),Ze=we(2),mr=we(3),k=Symbol.for("lit-noChange"),p=Symbol.for("lit-nothing"),je=new WeakMap,E=S.createTreeWalker(S,129);function Ye(n,e){if(!xe(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return Ue!==void 0?Ue.createHTML(e):e}var Lt=(n,e)=>{let t=n.length-1,r=[],i,a=e===2?"<svg>":e===3?"<math>":"",o=D;for(let d=0;d<t;d++){let c=n[d],m,h,u=-1,l=0;for(;l<c.length&&(o.lastIndex=l,h=o.exec(c),h!==null);)l=o.lastIndex,o===D?h[1]==="!--"?o=qe:h[1]!==void 0?o=Le:h[2]!==void 0?(Ke.test(h[2])&&(i=RegExp("</"+h[2],"g")),o=A):h[3]!==void 0&&(o=A):o===A?h[0]===">"?(o=i??D,u=-1):h[1]===void 0?u=-2:(u=o.lastIndex-h[2].length,m=h[1],o=h[3]===void 0?A:h[3]==='"'?ze:Ie):o===ze||o===Ie?o=A:o===qe||o===Le?o=D:(o=A,i=void 0);let y=o===A&&n[d+1].startsWith("/>")?" ":"";a+=o===D?c+Ut:u>=0?(r.push(m),c.slice(0,u)+We+c.slice(u)+_+y):c+_+(u===-2?d:y)}return[Ye(n,a+(n[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),r]},L=class n{constructor({strings:e,_$litType$:t},r){let i;this.parts=[];let a=0,o=0,d=e.length-1,c=this.parts,[m,h]=Lt(e,t);if(this.el=n.createElement(m,r),E.currentNode=this.el.content,t===2||t===3){let u=this.el.content.firstChild;u.replaceWith(...u.childNodes)}for(;(i=E.nextNode())!==null&&c.length<d;){if(i.nodeType===1){if(i.hasAttributes())for(let u of i.getAttributeNames())if(u.endsWith(We)){let l=h[o++],y=i.getAttribute(u).split(_),w=/([.?@])?(.*)/.exec(l);c.push({type:1,index:a,name:w[2],strings:y,ctor:w[1]==="."?ye:w[1]==="?"?ve:w[1]==="@"?ke:M}),i.removeAttribute(u)}else u.startsWith(_)&&(c.push({type:6,index:a}),i.removeAttribute(u));if(Ke.test(i.tagName)){let u=i.textContent.split(_),l=u.length-1;if(l>0){i.textContent=Q?Q.emptyScript:"";for(let y=0;y<l;y++)i.append(u[y],U()),E.nextNode(),c.push({type:2,index:++a});i.append(u[l],U())}}}else if(i.nodeType===8)if(i.data===Ve)c.push({type:2,index:a});else{let u=-1;for(;(u=i.data.indexOf(_,u+1))!==-1;)c.push({type:7,index:a}),u+=_.length-1}a++}}static createElement(e,t){let r=S.createElement("template");return r.innerHTML=e,r}};function N(n,e,t=n,r){if(e===k)return e;let i=r!==void 0?t._$Co?.[r]:t._$Cl,a=q(e)?void 0:e._$litDirective$;return i?.constructor!==a&&(i?._$AO?.(!1),a===void 0?i=void 0:(i=new a(n),i._$AT(n,t,r)),r!==void 0?(t._$Co??=[])[r]=i:t._$Cl=i),i!==void 0&&(e=N(n,i._$AS(n,e.values),i,r)),e}var fe=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:r}=this._$AD,i=(e?.creationScope??S).importNode(t,!0);E.currentNode=i;let a=E.nextNode(),o=0,d=0,c=r[0];for(;c!==void 0;){if(o===c.index){let m;c.type===2?m=new I(a,a.nextSibling,this,e):c.type===1?m=new c.ctor(a,c.name,c.strings,this,e):c.type===6&&(m=new _e(a,this,e)),this._$AV.push(m),c=r[++d]}o!==c?.index&&(a=E.nextNode(),o++)}return E.currentNode=S,i}p(e){let t=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(e,r,t),t+=r.strings.length-2):r._$AI(e[t])),t++}},I=class n{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,r,i){this.type=2,this._$AH=p,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=r,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=N(this,e,t),q(e)?e===p||e==null||e===""?(this._$AH!==p&&this._$AR(),this._$AH=p):e!==this._$AH&&e!==k&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):qt(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==p&&q(this._$AH)?this._$AA.nextSibling.data=e:this.T(S.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:r}=e,i=typeof r=="number"?this._$AC(e):(r.el===void 0&&(r.el=L.createElement(Ye(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===i)this._$AH.p(t);else{let a=new fe(i,this),o=a.u(this.options);a.p(t),this.T(o),this._$AH=a}}_$AC(e){let t=je.get(e.strings);return t===void 0&&je.set(e.strings,t=new L(e)),t}k(e){xe(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,r,i=0;for(let a of e)i===t.length?t.push(r=new n(this.O(U()),this.O(U()),this,this.options)):r=t[i],r._$AI(a),i++;i<t.length&&(this._$AR(r&&r._$AB.nextSibling,i),t.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let r=De(e).nextSibling;De(e).remove(),e=r}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},M=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,r,i,a){this.type=1,this._$AH=p,this._$AN=void 0,this.element=e,this.name=t,this._$AM=i,this.options=a,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=p}_$AI(e,t=this,r,i){let a=this.strings,o=!1;if(a===void 0)e=N(this,e,t,0),o=!q(e)||e!==this._$AH&&e!==k,o&&(this._$AH=e);else{let d=e,c,m;for(e=a[0],c=0;c<a.length-1;c++)m=N(this,d[r+c],t,c),m===k&&(m=this._$AH[c]),o||=!q(m)||m!==this._$AH[c],m===p?e=p:e!==p&&(e+=(m??"")+a[c+1]),this._$AH[c]=m}o&&!i&&this.j(e)}j(e){e===p?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},ye=class extends M{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===p?void 0:e}},ve=class extends M{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==p)}},ke=class extends M{constructor(e,t,r,i,a){super(e,t,r,i,a),this.type=5}_$AI(e,t=this){if((e=N(this,e,t,0)??p)===k)return;let r=this._$AH,i=e===p&&r!==p||e.capture!==r.capture||e.once!==r.once||e.passive!==r.passive,a=e!==p&&(r===p||i);i&&this.element.removeEventListener(this.name,this,r),a&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},_e=class{constructor(e,t,r){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(e){N(this,e)}};var It=be.litHtmlPolyfillSupport;It?.(L,I),(be.litHtmlVersions??=[]).push("3.3.3");var Ge=(n,e,t)=>{let r=t?.renderBefore??e,i=r._$litPart$;if(i===void 0){let a=t?.renderBefore??null;r._$litPart$=i=new I(e.insertBefore(U(),a),a,void 0,t??{})}return i._$AI(n),i};var $e=globalThis,b=class extends v{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Ge(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return k}};b._$litElement$=!0,b.finalized=!0,$e.litElementHydrateSupport?.({LitElement:b});var zt=$e.litElementPolyfillSupport;zt?.({LitElement:b});($e.litElementVersions??=[]).push("4.2.2");var jt={attribute:!0,type:String,converter:F,reflect:!1,hasChanged:X},Wt=(n=jt,e,t)=>{let{kind:r,metadata:i}=t,a=globalThis.litPropertyMetadata.get(i);if(a===void 0&&globalThis.litPropertyMetadata.set(i,a=new Map),r==="setter"&&((n=Object.create(n)).wrapped=!0),a.set(t.name,n),r==="accessor"){let{name:o}=t;return{set(d){let c=e.get.call(this);e.set.call(this,d),this.requestUpdate(o,c,n,!0,d)},init(d){return d!==void 0&&this.C(o,void 0,n,d),d}}}if(r==="setter"){let{name:o}=t;return function(d){let c=this[o];e.call(this,d),this.requestUpdate(o,c,n,!0,d)}}throw Error("Unsupported decorator location: "+r)};function ee(n){return(e,t)=>typeof t=="object"?Wt(n,e,t):((r,i,a)=>{let o=i.hasOwnProperty(a);return i.constructor.createProperty(a,r),o?Object.getOwnPropertyDescriptor(i,a):void 0})(n,e,t)}function z(n){return ee({...n,state:!0,attribute:!1})}var Je={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Xe=n=>(...e)=>({_$litDirective$:n,values:e}),re=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,r){this._$Ct=e,this._$AM=t,this._$Ci=r}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}};var j=class extends re{constructor(e){if(super(e),this.it=p,e.type!==Je.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===p||e==null)return this._t=void 0,this.it=e;if(e===k)return e;if(typeof e!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;let t=[e];return t.raw=t,this._t={_$litType$:this.constructor.resultType,strings:t,values:[]}}};j.directiveName="unsafeHTML",j.resultType=1;var Qe=Xe(j);var et=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" aria-hidden="true">
<rect class="paper" x="112" y="34" width="176" height="96" rx="18" stroke="currentColor" stroke-width="10"></rect><line x1="150" y1="62" x2="250" y2="62" stroke="currentColor" stroke-width="6" stroke-linecap="round"></line><circle class="paper" cx="200" cy="238" r="108" stroke="currentColor" stroke-width="10"></circle><path d="M110,224 A92,92 0 0 1 290,224" fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round"></path><rect x="184" y="290" width="32" height="12" rx="6" fill="none" stroke="currentColor" stroke-width="6"></rect><circle class="paper" cx="200" cy="188" r="26" stroke="currentColor" stroke-width="8"></circle><g><line x1="124" y1="166" x2="124" y2="144" stroke="#55BBF8" stroke-width="5" stroke-linecap="round"></line><line x1="124" y1="166" x2="143" y2="177" stroke="#55BBF8" stroke-width="5" stroke-linecap="round"></line><line x1="124" y1="166" x2="105" y2="177" stroke="#55BBF8" stroke-width="5" stroke-linecap="round"></line></g><path d="M206,70 L190,96 L202,96 L194,118 L214,88 L202,88 Z" fill="#55BBF8" transform="translate(0 -14)"><animate attributeName="opacity" values="1;.25;1" dur="1.6s" repeatCount="indefinite"></animate></path>
</svg>
`;var tt=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" aria-hidden="true">
<circle class="dust" cx="150" cy="372" r="5" opacity="0"><animate attributeName="opacity" values="0;1;0" dur="2s" begin="0s" repeatCount="indefinite"></animate><animateTransform attributeName="transform" type="translate" values="0 0;0 14" dur="2s" begin="0s" repeatCount="indefinite"></animateTransform></circle><circle class="dust" cx="200" cy="380" r="5" opacity="0"><animate attributeName="opacity" values="0;1;0" dur="2s" begin="0.5s" repeatCount="indefinite"></animate><animateTransform attributeName="transform" type="translate" values="0 0;0 14" dur="2s" begin="0.5s" repeatCount="indefinite"></animateTransform></circle><circle class="dust" cx="250" cy="372" r="5" opacity="0"><animate attributeName="opacity" values="0;1;0" dur="2s" begin="1s" repeatCount="indefinite"></animate><animateTransform attributeName="transform" type="translate" values="0 0;0 14" dur="2s" begin="1s" repeatCount="indefinite"></animateTransform></circle><circle class="dust" cx="175" cy="388" r="5" opacity="0"><animate attributeName="opacity" values="0;1;0" dur="2s" begin="1.5s" repeatCount="indefinite"></animate><animateTransform attributeName="transform" type="translate" values="0 0;0 14" dur="2s" begin="1.5s" repeatCount="indefinite"></animateTransform></circle><circle class="dust" cx="228" cy="390" r="5" opacity="0"><animate attributeName="opacity" values="0;1;0" dur="2s" begin="0.8s" repeatCount="indefinite"></animate><animateTransform attributeName="transform" type="translate" values="0 0;0 14" dur="2s" begin="0.8s" repeatCount="indefinite"></animateTransform></circle><g><animateTransform attributeName="transform" type="rotate" values="-22 200 238;22 200 238;-22 200 238" keyTimes="0;.5;1" calcMode="spline" keySplines=".45 0 .55 1;.45 0 .55 1" dur="2.4s" repeatCount="indefinite"></animateTransform><circle class="paper" cx="200" cy="238" r="108" stroke="currentColor" stroke-width="10"></circle><path d="M110,224 A92,92 0 0 1 290,224" fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round"></path><rect x="184" y="290" width="32" height="12" rx="6" fill="none" stroke="currentColor" stroke-width="6"></rect><circle class="paper" cx="200" cy="188" r="26" stroke="currentColor" stroke-width="8"></circle><path d="M200,170 A18,18 0 0 1 218,188" fill="none" stroke="#55BBF8" stroke-width="5" stroke-linecap="round"><animateTransform attributeName="transform" type="rotate" values="0 200 188;360 200 188" dur="1s" repeatCount="indefinite"></animateTransform></path><g><animateTransform attributeName="transform" type="rotate" values="0 124 166;360 124 166" dur=".5s" repeatCount="indefinite"></animateTransform><line x1="124" y1="166" x2="124" y2="144" stroke="#55BBF8" stroke-width="5" stroke-linecap="round"></line><line x1="124" y1="166" x2="143" y2="177" stroke="#55BBF8" stroke-width="5" stroke-linecap="round"></line><line x1="124" y1="166" x2="105" y2="177" stroke="#55BBF8" stroke-width="5" stroke-linecap="round"></line></g></g>
</svg>
`;var rt=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" aria-hidden="true">
<rect class="paper" x="112" y="34" width="176" height="96" rx="18" stroke="currentColor" stroke-width="10"></rect><line x1="150" y1="62" x2="250" y2="62" stroke="currentColor" stroke-width="6" stroke-linecap="round"></line><circle cx="200" cy="96" r="8" fill="#43A047"></circle><circle class="paper" cx="200" cy="238" r="108" stroke="currentColor" stroke-width="10"></circle><path d="M110,224 A92,92 0 0 1 290,224" fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round"></path><rect x="184" y="290" width="32" height="12" rx="6" fill="none" stroke="currentColor" stroke-width="6"></rect><circle class="paper" cx="200" cy="188" r="26" stroke="currentColor" stroke-width="8"></circle><g><line x1="124" y1="166" x2="124" y2="144" stroke="#55BBF8" stroke-width="5" stroke-linecap="round"></line><line x1="124" y1="166" x2="143" y2="177" stroke="#55BBF8" stroke-width="5" stroke-linecap="round"></line><line x1="124" y1="166" x2="105" y2="177" stroke="#55BBF8" stroke-width="5" stroke-linecap="round"></line></g>
</svg>
`;var it=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" aria-hidden="true">
<rect class="paper" x="112" y="34" width="176" height="96" rx="18" stroke="currentColor" stroke-width="10"></rect><line x1="150" y1="62" x2="250" y2="62" stroke="currentColor" stroke-width="6" stroke-linecap="round"></line><circle class="paper" cx="200" cy="238" r="108" stroke="currentColor" stroke-width="10"></circle><path d="M110,224 A92,92 0 0 1 290,224" fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round"></path><rect x="184" y="290" width="32" height="12" rx="6" fill="none" stroke="currentColor" stroke-width="6"></rect><circle class="paper" cx="200" cy="188" r="26" stroke="currentColor" stroke-width="8"></circle><g><line x1="124" y1="166" x2="124" y2="144" stroke="#55BBF8" stroke-width="5" stroke-linecap="round"></line><line x1="124" y1="166" x2="143" y2="177" stroke="#55BBF8" stroke-width="5" stroke-linecap="round"></line><line x1="124" y1="166" x2="105" y2="177" stroke="#55BBF8" stroke-width="5" stroke-linecap="round"></line></g><path d="M74,278 q-10,-12 0,-24 q10,-12 0,-24 q-10,-12 0,-24" fill="none" stroke="#FB8C00" stroke-width="6" stroke-linecap="round" opacity="0"><animateTransform attributeName="transform" type="translate" values="0 12;0 -14" dur="2.6s" begin="0s" repeatCount="indefinite"></animateTransform><animate attributeName="opacity" values="0;1;0" dur="2.6s" begin="0s" repeatCount="indefinite"></animate></path><path d="M326,278 q-10,-12 0,-24 q10,-12 0,-24 q-10,-12 0,-24" fill="none" stroke="#FB8C00" stroke-width="6" stroke-linecap="round" opacity="0"><animateTransform attributeName="transform" type="translate" values="0 12;0 -14" dur="2.6s" begin="1.3s" repeatCount="indefinite"></animateTransform><animate attributeName="opacity" values="0;1;0" dur="2.6s" begin="1.3s" repeatCount="indefinite"></animate></path><path d="M66,278 q-10,-12 0,-24 q10,-12 0,-24 q-10,-12 0,-24" fill="none" stroke="#FB8C00" stroke-width="6" stroke-linecap="round" opacity="0"><animateTransform attributeName="transform" type="translate" values="0 12;0 -14" dur="2.6s" begin="1.9s" repeatCount="indefinite"></animateTransform><animate attributeName="opacity" values="0;1;0" dur="2.6s" begin="1.9s" repeatCount="indefinite"></animate></path><path d="M334,278 q-10,-12 0,-24 q10,-12 0,-24 q-10,-12 0,-24" fill="none" stroke="#FB8C00" stroke-width="6" stroke-linecap="round" opacity="0"><animateTransform attributeName="transform" type="translate" values="0 12;0 -14" dur="2.6s" begin="0.6s" repeatCount="indefinite"></animateTransform><animate attributeName="opacity" values="0;1;0" dur="2.6s" begin="0.6s" repeatCount="indefinite"></animate></path>
</svg>
`;var nt=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" aria-hidden="true">
<g><animateTransform attributeName="transform" type="translate" values="0 0;-2 1;2 -1;0 0" dur=".3s" repeatCount="indefinite"></animateTransform><rect class="paper" x="112" y="34" width="176" height="96" rx="18" stroke="currentColor" stroke-width="10"></rect><line x1="150" y1="62" x2="250" y2="62" stroke="currentColor" stroke-width="6" stroke-linecap="round"></line></g><circle class="paper" cx="200" cy="238" r="108" stroke="currentColor" stroke-width="10"></circle><path d="M110,224 A92,92 0 0 1 290,224" fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round"></path><rect x="184" y="290" width="32" height="12" rx="6" fill="none" stroke="currentColor" stroke-width="6"></rect><circle class="paper" cx="200" cy="188" r="26" stroke="currentColor" stroke-width="8"></circle><g><line x1="124" y1="166" x2="124" y2="144" stroke="#55BBF8" stroke-width="5" stroke-linecap="round"></line><line x1="124" y1="166" x2="143" y2="177" stroke="#55BBF8" stroke-width="5" stroke-linecap="round"></line><line x1="124" y1="166" x2="105" y2="177" stroke="#55BBF8" stroke-width="5" stroke-linecap="round"></line></g><circle class="dust" cx="180" cy="150" r="5" opacity="0"><animateTransform attributeName="transform" type="translate" values="0 0;0 -70" dur="1.2s" begin="0s" repeatCount="indefinite"></animateTransform><animate attributeName="opacity" values="0;1;0" dur="1.2s" begin="0s" repeatCount="indefinite"></animate></circle><circle class="dust" cx="200" cy="150" r="5" opacity="0"><animateTransform attributeName="transform" type="translate" values="0 0;0 -70" dur="1.2s" begin="0.3s" repeatCount="indefinite"></animateTransform><animate attributeName="opacity" values="0;1;0" dur="1.2s" begin="0.3s" repeatCount="indefinite"></animate></circle><circle class="dust" cx="220" cy="150" r="5" opacity="0"><animateTransform attributeName="transform" type="translate" values="0 0;0 -70" dur="1.2s" begin="0.6s" repeatCount="indefinite"></animateTransform><animate attributeName="opacity" values="0;1;0" dur="1.2s" begin="0.6s" repeatCount="indefinite"></animate></circle><circle class="dust" cx="190" cy="150" r="5" opacity="0"><animateTransform attributeName="transform" type="translate" values="0 0;0 -70" dur="1.2s" begin="0.9s" repeatCount="indefinite"></animateTransform><animate attributeName="opacity" values="0;1;0" dur="1.2s" begin="0.9s" repeatCount="indefinite"></animate></circle><circle class="dust" cx="210" cy="150" r="5" opacity="0"><animateTransform attributeName="transform" type="translate" values="0 0;0 -70" dur="1.2s" begin="0.45s" repeatCount="indefinite"></animateTransform><animate attributeName="opacity" values="0;1;0" dur="1.2s" begin="0.45s" repeatCount="indefinite"></animate></circle>
</svg>
`;var at=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" aria-hidden="true">
<g><animateTransform attributeName="transform" type="translate" values="0 0;-5 0;5 0;-4 0;4 0;0 0;0 0" keyTimes="0;.05;.1;.15;.2;.25;1" dur="2s" repeatCount="indefinite"></animateTransform><circle class="paper" cx="200" cy="238" r="108" stroke="currentColor" stroke-width="10"></circle><path d="M110,224 A92,92 0 0 1 290,224" fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round"></path><rect x="184" y="290" width="32" height="12" rx="6" fill="none" stroke="currentColor" stroke-width="6"></rect><circle cx="200" cy="188" r="26" fill="#FB8C00" stroke="currentColor" stroke-width="8"><animate attributeName="r" values="26;29;26" dur="1.2s" repeatCount="indefinite"></animate></circle><line x1="200" y1="178" x2="200" y2="190" stroke="#fff" stroke-width="6" stroke-linecap="round"></line><circle cx="200" cy="200" r="3.5" fill="#fff"></circle><g><line x1="124" y1="166" x2="124" y2="144" stroke="#55BBF8" stroke-width="5" stroke-linecap="round"></line><line x1="124" y1="166" x2="143" y2="177" stroke="#55BBF8" stroke-width="5" stroke-linecap="round"></line><line x1="124" y1="166" x2="105" y2="177" stroke="#55BBF8" stroke-width="5" stroke-linecap="round"></line></g></g>
</svg>
`;var ot=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" aria-hidden="true">
<circle class="paper" cx="200" cy="238" r="108" stroke="currentColor" stroke-width="10"></circle><path d="M110,224 A92,92 0 0 1 290,224" fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round"></path><rect x="184" y="290" width="32" height="12" rx="6" fill="none" stroke="currentColor" stroke-width="6"></rect><circle class="paper" cx="200" cy="188" r="26" stroke="currentColor" stroke-width="8"></circle><g><line x1="124" y1="166" x2="124" y2="144" stroke="#55BBF8" stroke-width="5" stroke-linecap="round"></line><line x1="124" y1="166" x2="143" y2="177" stroke="#55BBF8" stroke-width="5" stroke-linecap="round"></line><line x1="124" y1="166" x2="105" y2="177" stroke="#55BBF8" stroke-width="5" stroke-linecap="round"></line></g>
</svg>
`;var st=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" aria-hidden="true">
<path d="M160,360 q-8,12 0,20 q8,-8 0,-20Z" fill="#55BBF8" opacity="0"><animate attributeName="opacity" values="0;1;0" dur="1.8s" begin="0s" repeatCount="indefinite"></animate><animateTransform attributeName="transform" type="translate" values="0 0;0 18" dur="1.8s" begin="0s" repeatCount="indefinite"></animateTransform></path><path d="M200,360 q-8,12 0,20 q8,-8 0,-20Z" fill="#55BBF8" opacity="0"><animate attributeName="opacity" values="0;1;0" dur="1.8s" begin="0.6s" repeatCount="indefinite"></animate><animateTransform attributeName="transform" type="translate" values="0 0;0 18" dur="1.8s" begin="0.6s" repeatCount="indefinite"></animateTransform></path><path d="M240,360 q-8,12 0,20 q8,-8 0,-20Z" fill="#55BBF8" opacity="0"><animate attributeName="opacity" values="0;1;0" dur="1.8s" begin="1.2s" repeatCount="indefinite"></animate><animateTransform attributeName="transform" type="translate" values="0 0;0 18" dur="1.8s" begin="1.2s" repeatCount="indefinite"></animateTransform></path><path d="M180,360 q-8,12 0,20 q8,-8 0,-20Z" fill="#55BBF8" opacity="0"><animate attributeName="opacity" values="0;1;0" dur="1.8s" begin="0.9s" repeatCount="indefinite"></animate><animateTransform attributeName="transform" type="translate" values="0 0;0 18" dur="1.8s" begin="0.9s" repeatCount="indefinite"></animateTransform></path><path d="M222,360 q-8,12 0,20 q8,-8 0,-20Z" fill="#55BBF8" opacity="0"><animate attributeName="opacity" values="0;1;0" dur="1.8s" begin="0.3s" repeatCount="indefinite"></animate><animateTransform attributeName="transform" type="translate" values="0 0;0 18" dur="1.8s" begin="0.3s" repeatCount="indefinite"></animateTransform></path><g><animateTransform attributeName="transform" type="rotate" values="-22 200 238;22 200 238;-22 200 238" keyTimes="0;.5;1" calcMode="spline" keySplines=".45 0 .55 1;.45 0 .55 1" dur="3s" repeatCount="indefinite"></animateTransform><circle class="paper" cx="200" cy="238" r="108" stroke="currentColor" stroke-width="10"></circle><path d="M110,224 A92,92 0 0 1 290,224" fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round"></path><rect x="184" y="290" width="32" height="12" rx="6" fill="none" stroke="currentColor" stroke-width="6"></rect><circle class="paper" cx="200" cy="188" r="26" stroke="currentColor" stroke-width="8"></circle><path d="M200,170 A18,18 0 0 1 218,188" fill="none" stroke="#55BBF8" stroke-width="5" stroke-linecap="round"><animateTransform attributeName="transform" type="rotate" values="0 200 188;360 200 188" dur="1s" repeatCount="indefinite"></animateTransform></path><g><animateTransform attributeName="transform" type="rotate" values="0 124 166;360 124 166" dur=".5s" repeatCount="indefinite"></animateTransform><line x1="124" y1="166" x2="124" y2="144" stroke="#55BBF8" stroke-width="5" stroke-linecap="round"></line><line x1="124" y1="166" x2="143" y2="177" stroke="#55BBF8" stroke-width="5" stroke-linecap="round"></line><line x1="124" y1="166" x2="105" y2="177" stroke="#55BBF8" stroke-width="5" stroke-linecap="round"></line></g></g>
</svg>
`;var ct=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" aria-hidden="true">
<circle class="paper" cx="200" cy="238" r="108" stroke="currentColor" stroke-width="10"></circle><path d="M110,224 A92,92 0 0 1 290,224" fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round"></path><rect x="184" y="290" width="32" height="12" rx="6" fill="none" stroke="currentColor" stroke-width="6"></rect><circle cx="200" cy="188" r="26" fill="#55BBF8" stroke="currentColor" stroke-width="8"></circle><line x1="193" y1="179" x2="193" y2="197" stroke="#fff" stroke-width="5" stroke-linecap="round"></line><line x1="207" y1="179" x2="207" y2="197" stroke="#fff" stroke-width="5" stroke-linecap="round"></line><g><line x1="124" y1="166" x2="124" y2="144" stroke="#55BBF8" stroke-width="5" stroke-linecap="round"></line><line x1="124" y1="166" x2="143" y2="177" stroke="#55BBF8" stroke-width="5" stroke-linecap="round"></line><line x1="124" y1="166" x2="105" y2="177" stroke="#55BBF8" stroke-width="5" stroke-linecap="round"></line></g>
</svg>
`;var lt=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" aria-hidden="true">
<g opacity=".5"><rect class="paper" x="112" y="34" width="176" height="96" rx="18" stroke="currentColor" stroke-width="10"></rect><line x1="150" y1="62" x2="250" y2="62" stroke="currentColor" stroke-width="6" stroke-linecap="round"></line></g><g><animateTransform attributeName="transform" type="translate" values="0 60;0 0;0 0;0 60" keyTimes="0;.6;.8;1" calcMode="spline" keySplines=".3 0 .4 1;0 0 1 1;0 0 1 1" dur="3s" repeatCount="indefinite"></animateTransform><circle class="paper" cx="200" cy="238" r="108" stroke="currentColor" stroke-width="10"></circle><path d="M110,224 A92,92 0 0 1 290,224" fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round"></path><rect x="184" y="290" width="32" height="12" rx="6" fill="none" stroke="currentColor" stroke-width="6"></rect><circle class="paper" cx="200" cy="188" r="26" stroke="currentColor" stroke-width="8"></circle><path d="M200,170 A18,18 0 0 1 218,188" fill="none" stroke="#55BBF8" stroke-width="5" stroke-linecap="round"><animateTransform attributeName="transform" type="rotate" values="0 200 188;360 200 188" dur="1s" repeatCount="indefinite"></animateTransform></path><g><line x1="124" y1="166" x2="124" y2="144" stroke="#55BBF8" stroke-width="5" stroke-linecap="round"></line><line x1="124" y1="166" x2="143" y2="177" stroke="#55BBF8" stroke-width="5" stroke-linecap="round"></line><line x1="124" y1="166" x2="105" y2="177" stroke="#55BBF8" stroke-width="5" stroke-linecap="round"></line></g></g><path d="M186,378 l14,-12 l14,12" fill="none" stroke="#55BBF8" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" opacity="0"><animate attributeName="opacity" values="0;1;0" dur="1.2s" begin="0s" repeatCount="indefinite"></animate></path><path d="M186,362 l14,-12 l14,12" fill="none" stroke="#55BBF8" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" opacity="0"><animate attributeName="opacity" values="0;1;0" dur="1.2s" begin="0.3s" repeatCount="indefinite"></animate></path>
</svg>
`;var dt=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" aria-hidden="true">
<rect class="paper" x="112" y="34" width="176" height="96" rx="18" stroke="currentColor" stroke-width="10"></rect><line x1="150" y1="62" x2="250" y2="62" stroke="currentColor" stroke-width="6" stroke-linecap="round"></line><circle class="paper" cx="200" cy="238" r="108" stroke="currentColor" stroke-width="10"></circle><path d="M110,224 A92,92 0 0 1 290,224" fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round"></path><rect x="184" y="290" width="32" height="12" rx="6" fill="none" stroke="currentColor" stroke-width="6"></rect><circle class="paper" cx="200" cy="188" r="26" stroke="currentColor" stroke-width="8"></circle><g><line x1="124" y1="166" x2="124" y2="144" stroke="#55BBF8" stroke-width="5" stroke-linecap="round"></line><line x1="124" y1="166" x2="143" y2="177" stroke="#55BBF8" stroke-width="5" stroke-linecap="round"></line><line x1="124" y1="166" x2="105" y2="177" stroke="#55BBF8" stroke-width="5" stroke-linecap="round"></line></g><path d="M150,140 q-6,10 0,16 q6,-6 0,-16Z" fill="#55BBF8" opacity="0"><animate attributeName="opacity" values="0;1;0" dur="1s" begin="0s" repeatCount="indefinite"></animate><animateTransform attributeName="transform" type="translate" values="0 0;0 24" dur="1s" begin="0s" repeatCount="indefinite"></animateTransform></path><path d="M250,140 q-6,10 0,16 q6,-6 0,-16Z" fill="#55BBF8" opacity="0"><animate attributeName="opacity" values="0;1;0" dur="1s" begin="0.5s" repeatCount="indefinite"></animate><animateTransform attributeName="transform" type="translate" values="0 0;0 24" dur="1s" begin="0.5s" repeatCount="indefinite"></animateTransform></path><circle class="paper" cx="78" cy="258" r="8" stroke="#55BBF8" stroke-width="4" opacity="0"><animate attributeName="cy" values="278;168" dur="2s" begin="0s" repeatCount="indefinite"></animate><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.15;.8;1" dur="2s" begin="0s" repeatCount="indefinite"></animate></circle><circle class="paper" cx="70" cy="258" r="5" stroke="#55BBF8" stroke-width="4" opacity="0"><animate attributeName="cy" values="278;168" dur="2s" begin="0.7s" repeatCount="indefinite"></animate><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.15;.8;1" dur="2s" begin="0.7s" repeatCount="indefinite"></animate></circle><circle class="paper" cx="322" cy="258" r="7" stroke="#55BBF8" stroke-width="4" opacity="0"><animate attributeName="cy" values="278;168" dur="2s" begin="0.35s" repeatCount="indefinite"></animate><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.15;.8;1" dur="2s" begin="0.35s" repeatCount="indefinite"></animate></circle><circle class="paper" cx="330" cy="258" r="5" stroke="#55BBF8" stroke-width="4" opacity="0"><animate attributeName="cy" values="278;168" dur="2s" begin="1.1s" repeatCount="indefinite"></animate><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.15;.8;1" dur="2s" begin="1.1s" repeatCount="indefinite"></animate></circle><circle class="paper" cx="84" cy="258" r="6" stroke="#55BBF8" stroke-width="4" opacity="0"><animate attributeName="cy" values="278;168" dur="2s" begin="1.4s" repeatCount="indefinite"></animate><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.15;.8;1" dur="2s" begin="1.4s" repeatCount="indefinite"></animate></circle><circle class="paper" cx="318" cy="258" r="9" stroke="#55BBF8" stroke-width="4" opacity="0"><animate attributeName="cy" values="278;168" dur="2s" begin="1.6s" repeatCount="indefinite"></animate><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.15;.8;1" dur="2s" begin="1.6s" repeatCount="indefinite"></animate></circle>
</svg>
`;var ie={status:{domain:"sensor",keys:["status","q7_status"]},battery:{domain:"sensor",keys:[],match:/_battery$/},vacuum_error:{domain:"sensor",keys:["vacuum_error"]},dock_error:{domain:"sensor",keys:["dock_error"]},current_room:{domain:"sensor",keys:["current_room"]},progress:{domain:"sensor",keys:["clean_percent"]},cleaning_time:{domain:"sensor",keys:["cleaning_time"]},cleaning_area:{domain:"sensor",keys:["cleaning_area"]},last_clean_end:{domain:"sensor",keys:["last_clean_end"]},total_count:{domain:"sensor",keys:["total_cleaning_count"]},total_area:{domain:"sensor",keys:["total_cleaning_area"]},cleaning_mode:{domain:"select",keys:["cleaning_mode"]},selected_map:{domain:"select",keys:["selected_map"]},mop_attached:{domain:"binary_sensor",keys:["mop_attached"]},mop_drying:{domain:"binary_sensor",keys:["mop_drying_status"]},mop_drying_remaining:{domain:"sensor",keys:["mop_drying_remaining_time"]},clean_water:{domain:"binary_sensor",keys:["clean_box_empty"]},dirty_water:{domain:"binary_sensor",keys:["dirty_box_full"]},water_shortage:{domain:"binary_sensor",keys:["water_shortage"]},resolve_dock_error:{domain:"button",keys:["resolve_dock_error"]},empty_bin:{domain:"button",keys:["empty_dustbin"]},map:{domain:"image",keys:[]}},pt=[{key:"main_brush_time_left",soon:10},{key:"side_brush_time_left",soon:10},{key:"filter_time_left",soon:10},{key:"sensor_time_left",soon:3},{key:"strainer_time_left",soon:5},{key:"mop_life_time_left",soon:10},{key:"cleaning_brush_time_left",soon:10}],ir={entity:"Roborock vacuum",name:"Name",hide_controls:"Hide controls",hide_maintenance:"Hide maintenance",status:"Status",battery:"Battery",vacuum_error:"Vacuum error",dock_error:"Dock error",current_room:"Current room",progress:"Cleaning progress",cleaning_time:"Cleaning time",cleaning_area:"Cleaning area",last_clean_end:"Last clean end",total_count:"Total cleaning count",total_area:"Total cleaning area",cleaning_mode:"Cleaning mode",selected_map:"Selected map",mop_attached:"Mop attached",mop_drying:"Mop drying",mop_drying_remaining:"Mop drying remaining time",clean_water:"Clean water box",dirty_water:"Dirty water box",water_shortage:"Water shortage",resolve_dock_error:"Resolve dock error button",empty_bin:"Empty dustbin button",map:"Map image"},nr={idle:ot,cleaning:tt,mopping:st,returning:lt,charging:et,docked:rt,emptying:nt,washing:dt,drying:it,paused:ct,error:at},ar={cleaning:"work",segment_cleaning:"work",zoned_cleaning:"work",spot_cleaning:"work",manual_mode:"work",remote_control_active:"work",going_to_target:"work",mapping:"work",relocating:"work",sweeping:"work",mopping:"mop-work",sweep_and_mop:"mop-work",moping:"mop-work",sweep_moping:"mop-work",sweep_moping_2:"mop-work",returning_home:"returning",docking:"returning",going_to_wash_the_mop:"mop-trip",charging:"charging",charging_complete:"docked",waiting_to_charge:"docked",attaching_the_mop:"docked",detaching_the_mop:"docked",updating:"docked",saving_map:"docked",emptying_the_bin:"emptying",washing_the_mop:"washing",mop_cleaning:"washing",mop_airdrying:"drying",air_drying_stopping:"drying",paused:"paused",working_sleep:"paused",error:"error",charging_problem:"error",idle:"idle",sleeping:"idle",waiting_for_orders:"idle",starting:"idle",charger_disconnected:"idle",shutting_down:"idle",transitioning:"idle",locked:"idle",egg_attack:"idle",device_offline:"idle"},or={cleaning:"work",returning:"returning",docked:"docked",paused:"paused",error:"error",idle:"idle"},Ce=new Set(["unavailable","unknown"]),ut={en:{title:"Robot vacuum",unavailable:"Unavailable",noData:"No data from the vacuum",lastClean:n=>`Last clean ended ${n}`,done:n=>`${n}% done`,cleaningTime:"Cleaning time",area:"Area",suction:"Suction",lastCleanStat:"Last clean",cleans:"Cleans",totalArea:"Total area",dock:"Dock",cleanWaterOk:"Clean water OK",cleanWaterEmpty:"Clean water empty",dirtyWaterOk:"Dirty water OK",dirtyWaterFull:"Dirty water full",waterShortage:"Water shortage",mopDrying:n=>n?`Mop drying \xB7 ${n} left`:"Mop drying",dryingMop:"Drying the mop",error:"Error",emptyBin:"Empty bin",resolve:"Resolve",robot:"Robot",mapTab:"Map",robotError:n=>`Robot: ${n}`,dockError:n=>`Dock: ${n}`,maintenance:"Maintenance",overdue:"Overdue",hoursLeft:n=>`${n} h left`,room:"Room",allRooms:"All rooms",mode:"Mode",start:"Start",resume:"Resume",pause:"Pause",stop:"Stop",home:"Dock",locate:"Locate",duration:n=>n>=60?`${Math.floor(n/60)} h${n%60?` ${n%60} min`:""}`:`${n} min`,missing:"Entity not found"},it:{title:"Robot aspirapolvere",unavailable:"Non disponibile",noData:"Nessun dato dal robot",lastClean:n=>`Ultima pulizia finita alle ${n}`,done:n=>`${n}% fatto`,cleaningTime:"Tempo",area:"Area",suction:"Aspirazione",lastCleanStat:"Ultima pulizia",cleans:"Pulizie",totalArea:"Area totale",dock:"Base",cleanWaterOk:"Acqua pulita OK",cleanWaterEmpty:"Acqua pulita finita",dirtyWaterOk:"Acqua sporca OK",dirtyWaterFull:"Acqua sporca piena",waterShortage:"Manca acqua",mopDrying:n=>n?`Asciugatura mop \xB7 ${n}`:"Asciugatura mop",dryingMop:"Asciuga il mop",error:"Errore",emptyBin:"Svuota contenitore",resolve:"Risolvi",robot:"Robot",mapTab:"Mappa",robotError:n=>`Robot: ${n}`,dockError:n=>`Base: ${n}`,maintenance:"Manutenzione",overdue:"Da sostituire",hoursLeft:n=>`${n} h rimaste`,room:"Stanza",allRooms:"Tutte",mode:"Modalit\xE0",start:"Avvia",resume:"Riprendi",pause:"Pausa",stop:"Ferma",home:"Base",locate:"Trova",duration:n=>n>=60?`${Math.floor(n/60)} h${n%60?` ${n%60} min`:""}`:`${n} min`,missing:"Entit\xE0 non trovata"}},W={play:"M8 5.14v14l11-7-11-7z",pause:"M14 19h4V5h-4M6 19h4V5H6v14z",stop:"M18 18H6V6h12v12z",home:"M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8h5z",locate:"M12 8a4 4 0 0 1 4 4 4 4 0 0 1-4 4 4 4 0 0 1-4-4 4 4 0 0 1 4-4m-8.95 5H1v-2h2.05C3.5 6.83 6.83 3.5 11 3.05V1h2v2.05c4.17.45 7.5 3.78 7.95 7.95H23v2h-2.05c-.45 4.17-3.78 7.5-7.95 7.95V23h-2v-2.05C6.83 20.5 3.5 17.17 3.05 13M12 5a7 7 0 0 0-7 7 7 7 0 0 0 7 7 7 7 0 0 0 7-7 7 7 0 0 0-7-7z"},x=class extends b{constructor(){super(...arguments);this.view="robot";this.room="";this.reducedMotion=window.matchMedia("(prefers-reduced-motion: reduce)");this.onMotionChange=()=>this.requestUpdate()}static getConfigForm(){let t=(r,i)=>({name:r,selector:{entity:{filter:{domain:i}}}});return{schema:[{name:"entity",required:!0,selector:{entity:{filter:{domain:"vacuum",integration:"roborock"}}}},{name:"name",selector:{text:{}}},{name:"hide_controls",selector:{boolean:{}}},{name:"hide_maintenance",selector:{boolean:{}}},{type:"expandable",name:"",title:"Entities (found automatically on the vacuum and its dock)",schema:Object.keys(ie).map(r=>t(r,ie[r].domain))}],computeLabel:r=>ir[r.name]}}static getStubConfig(t){return{entity:Object.values(t.entities).find(i=>i.platform==="roborock"&&i.entity_id.startsWith("vacuum."))?.entity_id??"vacuum.roborock"}}setConfig(t){if(!t.entity)throw new Error("entity is required: the Roborock vacuum entity");this.config=t}getCardSize(){return 12}connectedCallback(){super.connectedCallback(),this.reducedMotion.addEventListener("change",this.onMotionChange)}disconnectedCallback(){super.disconnectedCallback(),this.reducedMotion.removeEventListener("change",this.onMotionChange)}get t(){return(this.hass?.locale.language.split("-")[0]??"en")==="it"?ut.it:ut.en}deviceIds(){let t=this.hass,r=t.entities[this.config.entity]?.device_id,i=new Set;if(!r)return i;i.add(r);let a=t.devices?.[r];if(a?.name)for(let o of Object.values(t.devices))o.name===`${a.name} Dock`&&o.config_entries.some(d=>a.config_entries.includes(d))&&i.add(o.id);return i}onDevices(){let t=this.deviceIds();return Object.values(this.hass.entities).filter(r=>r.platform==="roborock"&&r.device_id!==void 0&&t.has(r.device_id))}entities(){let t=this.hass,r=this.config,i=this.onDevices(),a={};for(let o of Object.keys(ie)){let{domain:d,keys:c,match:m}=ie[o],h=i.filter(l=>l.entity_id.startsWith(`${d}.`)),u=r[o];u||(o==="map"?u=this.mapImage(h.map(l=>l.entity_id),a.selected_map):u=(h.find(l=>l.translation_key&&c.includes(l.translation_key))??(m?h.find(l=>m.test(l.entity_id)):void 0))?.entity_id),u&&t.states[u]&&(a[o]=t.states[u])}return a}mapImage(t,r){let i=r?.state;return(i?t.find(o=>String(this.hass.states[o]?.attributes.friendly_name??"").endsWith(i)):void 0)??t[0]}maintenance(){let t=this.onDevices();return pt.map(({key:r})=>t.find(i=>i.translation_key===r)).filter(r=>!!r).map(r=>this.hass.states[r.entity_id]).filter(r=>!!r)}shouldUpdate(t){if(!t.has("hass")||t.size>1)return!0;let r=t.get("hass");return!r||!this.hass||!this.config||r.locale!==this.hass.locale||r.entities!==this.hass.entities||r.areas!==this.hass.areas?!0:[this.config.entity,...Object.values(this.entities()).map(a=>a.entity_id),...this.maintenance().map(a=>a.entity_id)].some(a=>r.states[a]!==this.hass.states[a])}updated(){this.loadAreas();let t=this.renderRoot.querySelector(".art svg");t&&(this.reducedMotion.matches?(t.pauseAnimations(),t.setCurrentTime(0)):t.unpauseAnimations())}loadAreas(){let t=this.config?.entity;!this.hass||!t||this.areasFor===t||(this.areasFor=t,this.hass.callWS({type:"config/entity_registry/get",entity_id:t}).then(r=>{let i=r.options?.vacuum?.area_mapping??{};this.areaIds=Object.keys(i).filter(a=>(i[a]??[]).length>0)}).catch(()=>{this.areaIds=[]}))}call(t,r,i,a){t.stopPropagation(),Promise.resolve(this.hass.callService(r,i,a)).catch(()=>{})}moreInfo(t,r){t.stopPropagation(),this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:r},bubbles:!0,composed:!0}))}format(t){return t?this.hass.formatEntityState?.(t)??t.state:""}minutes(t){if(!t||Ce.has(t.state))return;let r=Number(t.state);if(Number.isNaN(r))return;let i=String(t.attributes.unit_of_measurement??"s"),a=i==="h"?60:i==="min"?1:i==="d"?1440:1/60;return r*a}time(t){let r=this.hass?.locale.language;return new Date().toDateString()===t.toDateString()?t.toLocaleTimeString(r,{hour:"2-digit",minute:"2-digit"}):t.toLocaleDateString(r,{day:"numeric",month:"short"})}pill(t){return g`<span
      class="pill ${t.kind} ${t.entity?"link":""}"
      @click=${t.entity?r=>this.moreInfo(r,t.entity.entity_id):void 0}
      ><i></i>${t.text}</span
    >`}tool(t,r,i){return g`<button class="tool" @click=${i}>
      <svg viewBox="0 0 24 24" aria-hidden="true">${Ze`<path d=${r}></path>`}</svg>${t}
    </button>`}render(){if(!this.hass||!this.config)return p;let t=this.hass,r=this.t,i=this.config,a=t.states[i.entity];if(!a)return g`<ha-card><div class="missing">${r.missing}: ${i.entity}</div></ha-card>`;let o=this.entities(),d=Ce.has(a.state),c=s=>o[s]?.state==="on",m=s=>{let f=o[s]?.state;return f===void 0||Ce.has(f)?void 0:f},h=s=>{let f=Number(m(s));return m(s)===void 0||Number.isNaN(f)?void 0:f},u=m("status"),l=u&&ar[u]||or[a.state]||"idle";l==="idle"&&a.state==="docked"&&(l="docked"),c("mop_drying")&&(l==="charging"||l==="docked"||l==="idle")&&(l="drying");let y=m("vacuum_error"),w=m("dock_error"),V=y!==void 0&&y!=="none",Ae=w!==void 0&&w!=="ok";V&&(l="error");let R=m("cleaning_mode"),mt={work:[l==="mop-work"||l==="work"&&(R==="mop"||R==="vac_and_mop"||R!=="vacuum"&&c("mop_attached"))?"mopping":"cleaning","blue"],"mop-work":["mopping","blue"],returning:["returning","blue"],"mop-trip":["returning","teal"],charging:["charging","green"],docked:["docked","grey"],emptying:["emptying","teal"],washing:["washing","teal"],drying:["drying","teal"],paused:["paused","amber"],error:["error","orange"],idle:["idle","grey"]},[ht,gt]=d?["idle","grey"]:mt[l],ft=d?r.unavailable:l==="drying"&&u!=="mop_airdrying"?r.dryingMop:l==="error"&&V?r.error:u?this.format(o.status):this.format(a),ne=l==="work"||l==="mop-work"||l==="paused",Ee=m("current_room"),yt=o.cleaning_mode&&R?this.format(o.cleaning_mode):"",K=m("last_clean_end"),vt=d?r.noData:ne||l==="returning"||l==="mop-trip"?[Ee,yt].filter(Boolean).join(" \xB7 ")||this.format(a):K?r.lastClean(this.time(new Date(K))):this.format(a),Z=h("battery")??a.attributes.battery_level,Se=d?"":V?r.robotError(this.format(o.vacuum_error)):Ae?r.dockError(this.format(o.dock_error)):"",Te=!V&&Ae?o.resolve_dock_error:void 0,ae=h("progress"),kt=ne&&ae!==void 0,oe=a.attributes.fan_speed,_t=oe?t.formatEntityAttributeValue?.(a,"fan_speed")??oe:"\u2014",se=this.minutes(o.cleaning_time),bt=ne?[[r.cleaningTime,se===void 0?"\u2014":String(Math.round(se)),se===void 0?"":"min"],[r.area,h("cleaning_area")===void 0?"\u2014":String(h("cleaning_area")),h("cleaning_area")===void 0?"":"m\xB2"],[r.suction,_t,""]]:[[r.lastCleanStat,K?this.time(new Date(K)):"\u2014",""],[r.cleans,m("total_count")??"\u2014",""],[r.totalArea,h("total_area")===void 0?"\u2014":String(Math.round(h("total_area"))),h("total_area")===void 0?"":"m\xB2"]],$=[];if(!d&&(o.clean_water&&$.push({text:c("clean_water")?r.cleanWaterEmpty:r.cleanWaterOk,entity:o.clean_water,kind:c("clean_water")?"bad":"ok"}),o.dirty_water&&$.push({text:c("dirty_water")?r.dirtyWaterFull:r.dirtyWaterOk,entity:o.dirty_water,kind:c("dirty_water")?"bad":"ok"}),c("water_shortage")&&$.push({text:r.waterShortage,entity:o.water_shortage,kind:"bad"}),c("mop_drying"))){let s=this.minutes(o.mop_drying_remaining);$.push({text:r.mopDrying(s?r.duration(Math.round(s)):""),entity:o.mop_drying,kind:"info"})}let ce=o.empty_bin&&o.empty_bin.state!=="unavailable"?o.empty_bin:void 0,Be=i.hide_maintenance?[]:this.maintenance().map((s,f)=>{let P=this.minutes(s),Ct=pt.find(St=>St.key===t.entities[s.entity_id]?.translation_key)?.soon??10,T=P===void 0?void 0:Math.floor(P/60),At=String(s.attributes.friendly_name??"").replace(String(t.devices?.[t.entities[s.entity_id]?.device_id??""]?.name??""),"").replace(/ time left$/i,"").trim(),Et=T===void 0?"":T<=0?"bad":T<=Ct?"soon":"";return{e:s,i:f,name:At,text:T===void 0?"\u2014":T<=0?r.overdue:r.hoursLeft(T),cls:Et}}),xt=l==="work"||l==="mop-work"||l==="returning"||l==="mop-trip",Ne=l==="paused",C={entity_id:i.entity},le=(this.areaIds??[]).filter(s=>t.areas?.[s]),de=a.attributes.fan_speed_list??[],pe=o.cleaning_mode?.attributes.options??[],wt=s=>this.room&&!Ne?this.call(s,"vacuum","clean_area",{...C,cleaning_area_id:[this.room]}):this.call(s,"vacuum","start",C),$t=this.view==="map"&&o.map,Me=o.map?.attributes.entity_picture;return g`
      <ha-card class="tone-${gt}" @click=${s=>this.moreInfo(s,i.entity)}>
        <div class="head">
          <div class="titles">
            <div class="name">${i.name??a.attributes.friendly_name??r.title}</div>
            <div class="muted">${vt}</div>
          </div>
          ${Z!==void 0?g`<span
                class="battery ${Z<=20?"low":""} ${o.battery?"link":""}"
                @click=${o.battery?s=>this.moreInfo(s,o.battery.entity_id):void 0}
              >
                <svg width="22" height="12" viewBox="0 0 22 12" aria-hidden="true">
                  <rect x="1" y="1" width="17" height="10" rx="2" fill="none" stroke="currentColor" stroke-width="1.6"></rect>
                  <rect x="19" y="4" width="2" height="4" rx="1" fill="currentColor"></rect>
                  <rect x="3" y="3" width=${Math.max(1,Math.round(13*Z/100))} height="6" rx="1" fill="currentColor"></rect></svg
                >${Math.round(Z)}%</span
              >`:p}
        </div>
        ${Se?g`<div class="alert">
              <span>${Se}</span>
              ${Te?g`<button class="outline" @click=${s=>this.call(s,"button","press",{entity_id:Te.entity_id})}>
                    ${r.resolve}
                  </button>`:p}
            </div>`:p}
        <div class="hero">
          ${o.map?g`<div class="tabs" role="group">
                <button aria-pressed=${this.view==="robot"} @click=${s=>{s.stopPropagation(),this.view="robot"}}>${r.robot}</button>
                <button aria-pressed=${this.view==="map"} @click=${s=>{s.stopPropagation(),this.view="map"}}>${r.mapTab}</button>
              </div>`:p}
          ${$t&&Me?g`<img class="map" src=${Me} alt=${String(o.map.attributes.friendly_name??r.mapTab)} @click=${s=>this.moreInfo(s,o.map.entity_id)} />`:g`<div class="art">${Qe(nr[ht])}</div>`}
          <span class="chip">${ft}</span>
        </div>
        ${kt?g`<div class="progress">
              <div class="progress-row"><span>${Ee??""}</span><span class="muted">${r.done(ae)}</span></div>
              <div class="bar"><div style="width:${Math.min(100,Math.max(0,ae))}%"></div></div>
            </div>`:p}
        <div class="stats">
          ${bt.map(([s,f,P])=>g`<div class="stat"><span class="v">${f}${P?g`<small> ${P}</small>`:p}</span><span class="muted">${s}</span></div>`)}
        </div>
        ${$.length||ce?g`<div class="section">
              <div class="heading">${r.dock}</div>
              ${$.length?g`<div class="pills">${$.map(s=>this.pill(s))}</div>`:p}
              ${ce&&!i.hide_controls?g`<div class="row"><button class="outline" @click=${s=>this.call(s,"button","press",{entity_id:ce.entity_id})}>${r.emptyBin}</button></div>`:p}
            </div>`:p}
        ${Be.length?g`<div class="section">
              <div class="heading">${r.maintenance}</div>
              <div class="maint">
                ${Be.map(s=>g`<div class="link" @click=${f=>this.moreInfo(f,s.e.entity_id)}><span class="muted">${s.name}</span><span class=${s.cls}>${s.text}</span></div>`)}
              </div>
            </div>`:p}
        ${i.hide_controls||d?p:g`
              ${le.length||de.length||pe.length?g`<div class="selects">
                    ${le.length?g`<label>${r.room}
                          <select @click=${s=>s.stopPropagation()} @change=${s=>this.room=s.target.value}>
                            <option value="" ?selected=${this.room===""}>${r.allRooms}</option>
                            ${le.map(s=>g`<option value=${s} ?selected=${this.room===s}>${t.areas[s].name}</option>`)}
                          </select></label>`:p}
                    ${de.length?g`<label>${r.suction}
                          <select
                            @click=${s=>s.stopPropagation()}
                            @change=${s=>this.call(s,"vacuum","set_fan_speed",{...C,fan_speed:s.target.value})}
                          >
                            ${de.map(s=>g`<option value=${s} ?selected=${s===oe}>${t.formatEntityAttributeValue?.(a,"fan_speed",s)??s}</option>`)}
                          </select></label>`:p}
                    ${pe.length?g`<label>${r.mode}
                          <select
                            @click=${s=>s.stopPropagation()}
                            @change=${s=>this.call(s,"select","select_option",{entity_id:o.cleaning_mode.entity_id,option:s.target.value})}
                          >
                            ${pe.map(s=>g`<option value=${s} ?selected=${s===R}>${t.formatEntityState?.(o.cleaning_mode,s)??s}</option>`)}
                          </select></label>`:p}
                  </div>`:p}
              <div class="tools">
                ${xt?this.tool(r.pause,W.pause,s=>this.call(s,"vacuum","pause",C)):this.tool(Ne?r.resume:r.start,W.play,wt)}
                ${this.tool(r.stop,W.stop,s=>this.call(s,"vacuum","stop",C))}
                ${this.tool(r.home,W.home,s=>this.call(s,"vacuum","return_to_base",C))}
                ${this.tool(r.locate,W.locate,s=>this.call(s,"vacuum","locate",C))}
              </div>
            `}
      </ha-card>`}static{this.styles=me`
    ha-card {
      --rvc-blue: var(--blue-color, #2196f3);
      --rvc-ok: var(--success-color, #43a047);
      --rvc-warn: var(--warning-color, #fb8c00);
      --rvc-amber: var(--amber-color, #ffc107);
      --rvc-tone: var(--secondary-text-color);
      padding: 20px;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
    .tone-blue {
      --rvc-tone: var(--rvc-blue);
    }
    .tone-teal {
      --rvc-tone: var(--teal-color, #009688);
    }
    .tone-green {
      --rvc-tone: var(--rvc-ok);
    }
    .tone-amber {
      --rvc-tone: var(--rvc-amber);
    }
    .tone-orange {
      --rvc-tone: var(--rvc-warn);
    }
    .head {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .titles {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .name {
      font-size: 16px;
      font-weight: 500;
      color: var(--primary-text-color);
    }
    .muted,
    .missing {
      color: var(--secondary-text-color);
      font-size: 13px;
    }
    .battery {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      font-size: 13px;
      font-weight: 500;
      color: var(--primary-text-color);
    }
    .battery.low {
      color: var(--rvc-warn);
    }
    .link {
      cursor: pointer;
    }
    .alert {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 12px;
      border-radius: 8px;
      font-size: 13px;
      color: color-mix(in srgb, var(--rvc-warn) 70%, var(--primary-text-color));
      background: color-mix(in srgb, var(--rvc-warn) 16%, transparent);
    }
    .alert span {
      flex: 1;
    }
    button {
      font: inherit;
      font-size: 13px;
      font-weight: 500;
      cursor: pointer;
    }
    .outline {
      min-height: 32px;
      padding: 0 12px;
      border-radius: 16px;
      border: 1px solid currentColor;
      background: transparent;
      color: inherit;
    }
    .section .outline {
      color: var(--primary-color);
      border-color: var(--divider-color);
    }
    .hero {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
    }
    .tabs {
      display: inline-flex;
      padding: 3px;
      border-radius: 18px;
      background: color-mix(in srgb, var(--primary-text-color) 8%, transparent);
    }
    .tabs button {
      min-height: 30px;
      padding: 0 14px;
      border: none;
      border-radius: 15px;
      background: transparent;
      color: var(--secondary-text-color);
    }
    .tabs button[aria-pressed="true"] {
      background: var(--card-background-color, var(--ha-card-background, #fff));
      color: var(--primary-text-color);
    }
    .art {
      width: 168px;
      height: 168px;
      color: var(--primary-text-color);
    }
    .art svg {
      width: 100%;
      height: 100%;
      display: block;
    }
    .art .paper {
      fill: var(--card-background-color, var(--ha-card-background, #fff));
    }
    .art .paper-stroke {
      stroke: var(--card-background-color, var(--ha-card-background, #fff));
    }
    .art .dust {
      fill: var(--secondary-text-color);
    }
    .map {
      display: block;
      width: 100%;
      max-height: 320px;
      object-fit: contain;
      border-radius: 8px;
    }
    .chip {
      padding: 5px 14px;
      border-radius: 16px;
      font-size: 13px;
      font-weight: 500;
      text-align: center;
      color: color-mix(in srgb, var(--rvc-tone) 65%, var(--primary-text-color));
      background: color-mix(in srgb, var(--rvc-tone) 16%, transparent);
    }
    .progress {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .progress-row {
      display: flex;
      justify-content: space-between;
      font-size: 13px;
      font-weight: 500;
      color: var(--primary-text-color);
    }
    .progress-row .muted {
      font-weight: 400;
    }
    .bar {
      height: 6px;
      border-radius: 3px;
      background: var(--divider-color);
    }
    .bar div {
      height: 6px;
      border-radius: 3px;
      background: var(--primary-color);
    }
    .stats {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      border-top: 1px solid var(--divider-color);
      border-bottom: 1px solid var(--divider-color);
      padding: 10px 0;
    }
    .stat {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;
      min-width: 0;
    }
    .stat + .stat {
      border-left: 1px solid var(--divider-color);
    }
    .stat .v {
      font-size: 18px;
      font-weight: 500;
      color: var(--primary-text-color);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 100%;
    }
    .stat small {
      font-size: 12px;
      font-weight: 400;
      color: var(--secondary-text-color);
    }
    .stat .muted {
      font-size: 12px;
    }
    .section {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .heading {
      font-size: 12px;
      font-weight: 500;
      color: var(--secondary-text-color);
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    .pills,
    .row {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    .pill {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 10px;
      border-radius: 8px;
      font-size: 12px;
      color: var(--primary-text-color);
      background: color-mix(in srgb, var(--primary-text-color) 6%, transparent);
    }
    .pill i {
      width: 8px;
      height: 8px;
      border-radius: 4px;
      background: var(--rvc-ok);
    }
    .pill.bad {
      color: color-mix(in srgb, var(--rvc-warn) 70%, var(--primary-text-color));
      background: color-mix(in srgb, var(--rvc-warn) 16%, transparent);
    }
    .pill.bad i {
      background: var(--rvc-warn);
    }
    .pill.info i {
      background: var(--rvc-blue);
    }
    .maint {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 6px 16px;
    }
    .maint div {
      display: flex;
      justify-content: space-between;
      gap: 8px;
      font-size: 13px;
      color: var(--primary-text-color);
    }
    .maint .soon {
      font-weight: 500;
      color: color-mix(in srgb, var(--rvc-amber) 60%, var(--primary-text-color));
    }
    .maint .bad {
      font-weight: 500;
      color: color-mix(in srgb, var(--rvc-warn) 70%, var(--primary-text-color));
    }
    .selects {
      margin-top: 4px;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
      gap: 8px;
    }
    .selects label {
      display: flex;
      flex-direction: column;
      gap: 4px;
      font-size: 12px;
      color: var(--secondary-text-color);
      min-width: 0;
    }
    .selects select {
      min-height: 36px;
      border-radius: 8px;
      border: 1px solid var(--divider-color);
      background: var(--card-background-color, var(--ha-card-background, #fff));
      color: var(--primary-text-color);
      padding: 0 6px;
      font: inherit;
      font-size: 13px;
      min-width: 0;
    }
    .tools {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 4px;
      border-top: 1px solid var(--divider-color);
      padding-top: 10px;
    }
    .tool {
      min-height: 48px;
      border: none;
      border-radius: 8px;
      background: transparent;
      color: var(--primary-color);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 2px;
    }
    .tool:hover {
      background: color-mix(in srgb, var(--primary-color) 8%, transparent);
    }
    .tool svg {
      width: 20px;
      height: 20px;
      fill: currentColor;
    }
  `}};B([ee({attribute:!1})],x.prototype,"hass",2),B([z()],x.prototype,"config",2),B([z()],x.prototype,"view",2),B([z()],x.prototype,"room",2),B([z()],x.prototype,"areaIds",2);customElements.get("roborock-vacuum-card")||customElements.define("roborock-vacuum-card",x);window.customCards=window.customCards??[];window.customCards.some(n=>n.type==="roborock-vacuum-card")||window.customCards.push({type:"roborock-vacuum-card",name:"Roborock Vacuum Card",description:"Status, map, progress, dock, maintenance and controls for any Roborock vacuum.",preview:!0,documentationURL:"https://github.com/enricodeleo/roborock-vacuum-card"});console.info("%c roborock-vacuum-card 0.1.0 ","background:#55bbf8;color:#111");export{x as RoborockVacuumCard};
