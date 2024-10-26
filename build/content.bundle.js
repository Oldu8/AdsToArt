/*! For license information please see content.bundle.js.LICENSE.txt */
(()=>{"use strict";var t=["img[src*='googlesyndication.com']","iframe[src*='googlesyndication.com']",".adsbygoogle",".promotedlink ",".advertisement-block",".top_banner_yand",".side_banner_yand",".videoAdUiClickElement",".cm-vpaid-iframe","._cm-ad-active",".trc-content-sponsored","._cm-native-ad",".content-ad-block",".adv",".ad-header",".ad--inview",".adv-slot_adtag","[data-ad-client]","iframe[src*='adtelligent.com']",'iframe[id*="google_ads_iframe_"]','iframe[id*="google_ad"]','iframe[id*="aswift_"]','iframe[id*="phathome_"]','iframe[id*="ad_iframe"]','iframe[title*="advertisement"]','iframe[name*="aswift"]',"ins.adsbygoogle","div.adsbygoogle",'div[id*="yandex"]','div[id*="google_ad"]','div[id*="sidebar-ad"]','div[id*="yandex_rtb*"]','div[id="yandex_rtb*"]','div[id*="div-gpt-ad"]',"div.promo-block","iframe[src*='mobtrafmag']","a[href*='trafmag.com']","img[src*='trafmag']","div[id*='MarketGid']","div[id*='div-mps-ad*']","[data-google-query-id]","div[data-name='ad wrapper']","div[data-bidder='direct']","div[data-name='adWrapper']","div[data-name='adaptiveConstructorAd']","div[data-ad-id]","div[data-confiant-id='CONFIANT_AD*']","aside[aria-label='advertisement']","a[href*='redirect.trackerado.com'] .thumbBlock","a[href*='smartadserver']","a[id*='aw0']","a[rel*='sponsored'] .thumbBlock","iframe[src*='ads']","img[src*='cummerata.link*']","img[src*='oritoee*']","img[alt='ads']","img[alt='Advertisement']","article[class='Advertisement']","div[data-name='adaptiveConstructorAd']","div[data-google-query-id='']"];function e(t,e){console.log(t);var r,n,o,a,i,c=t.parentNode;if(c){var u=t.offsetWidth,s=t.offsetHeight,l=(i=(o=u)/(a=s),970===o&&90===a?"ratio_10_1":728===o&&90===a?"ratio_8_1":300===o&&250===a?"ratio_4_3":336===o&&280===a?"ratio_6_5":300===o&&600===a?"ratio_2_1":160===o&&600===a?"ratio_1_3":320===o&&100===a?"ratio_3_1":Math.abs(i-1)<.05?"ratio_1_1":Math.abs(i-4/3)<.05?"ratio_4_3":Math.abs(i-16/9)<.05?"ratio_16_9":Math.abs(i-1/3)<.05?"ratio_1_3":Math.abs(i-4)<.05?"ratio_4_1":Math.abs(i-10)<.05?"ratio_10_1":Math.abs(i-1.5)<.05?"ratio_3_2":Math.abs(i-2/3)<.05?"ratio_2_3":Math.abs(i-2)<.05?"ratio_2_1":Math.abs(i-3)<.05?"ratio_3_1":"default");"default"===l&&(r=l,n=Math.floor(4*Math.random())+1,l="".concat(r,"_").concat(n));var d=c.offsetWidth,f=c.offsetHeight;if(d<u/2||0==u)return void console.log("Skipping image replacement due to small size.");var h=function(t,e,r,n,o,a){var i=document.createElement("img");i.src=function(t,e){var r="images/".concat(e,"/").concat(t,".png");return chrome.runtime.getURL(r)}(t,e),i.alt="".concat(r/n,", ").concat(r,"x").concat(n);var c=r,u=n>0?n:250;return(o>=2*c||a>=2*u)&&(c=o,u=a),i.style.width="".concat(c,"px"),i.style.height="".concat(u,"px"),i.style.objectFit="contain",i.style.maxWidth="100%",i.style.position="relative",i.onload=function(){var t=i.naturalHeight,e=i.naturalWidth;i.style.maxHeight="".concat(Math.min(t,a),"px"),i.style.maxWidth="".concat(Math.min(e,o),"px"),i.style.overflow="hidden"},i}(l,e,u,s,d,f),p=document.createElement("div");p.style.position="relative",p.style.setProperty("width","fit-content","important"),p.style.height="".concat(h.style.height),p.style.margin="0 auto",p.appendChild(h);var v=function(t,e){var r=document.createElement("span");return r.innerHTML="&#10005;",r.style.position="absolute",r.style.top="10px",r.style.right="10px",r.style.backgroundColor="rgba(0, 0, 0, 0.35)",r.style.color="white",r.style.padding="3px",r.style.cursor="pointer",r.style.zIndex="10",r.addEventListener("click",(function(){"BODY"===t.tagName?e.style.display="none":t.style.display="none"})),r}(c,p);p.appendChild(v),c.appendChild(p),t.remove()}}var r=["docs.google.com"];function n(t){return n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},n(t)}function o(){o=function(){return e};var t,e={},r=Object.prototype,a=r.hasOwnProperty,i=Object.defineProperty||function(t,e,r){t[e]=r.value},c="function"==typeof Symbol?Symbol:{},u=c.iterator||"@@iterator",s=c.asyncIterator||"@@asyncIterator",l=c.toStringTag||"@@toStringTag";function d(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{d({},"")}catch(t){d=function(t,e,r){return t[e]=r}}function f(t,e,r,n){var o=e&&e.prototype instanceof b?e:b,a=Object.create(o.prototype),c=new P(n||[]);return i(a,"_invoke",{value:S(t,r,c)}),a}function h(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}e.wrap=f;var p="suspendedStart",v="suspendedYield",y="executing",m="completed",g={};function b(){}function _(){}function w(){}var x={};d(x,u,(function(){return this}));var E=Object.getPrototypeOf,L=E&&E(E(G([])));L&&L!==r&&a.call(L,u)&&(x=L);var k=w.prototype=b.prototype=Object.create(x);function M(t){["next","throw","return"].forEach((function(e){d(t,e,(function(t){return this._invoke(e,t)}))}))}function O(t,e){function r(o,i,c,u){var s=h(t[o],t,i);if("throw"!==s.type){var l=s.arg,d=l.value;return d&&"object"==n(d)&&a.call(d,"__await")?e.resolve(d.__await).then((function(t){r("next",t,c,u)}),(function(t){r("throw",t,c,u)})):e.resolve(d).then((function(t){l.value=t,c(l)}),(function(t){return r("throw",t,c,u)}))}u(s.arg)}var o;i(this,"_invoke",{value:function(t,n){function a(){return new e((function(e,o){r(t,n,e,o)}))}return o=o?o.then(a,a):a()}})}function S(e,r,n){var o=p;return function(a,i){if(o===y)throw Error("Generator is already running");if(o===m){if("throw"===a)throw i;return{value:t,done:!0}}for(n.method=a,n.arg=i;;){var c=n.delegate;if(c){var u=j(c,n);if(u){if(u===g)continue;return u}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(o===p)throw o=m,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);o=y;var s=h(e,r,n);if("normal"===s.type){if(o=n.done?m:v,s.arg===g)continue;return{value:s.arg,done:n.done}}"throw"===s.type&&(o=m,n.method="throw",n.arg=s.arg)}}}function j(e,r){var n=r.method,o=e.iterator[n];if(o===t)return r.delegate=null,"throw"===n&&e.iterator.return&&(r.method="return",r.arg=t,j(e,r),"throw"===r.method)||"return"!==n&&(r.method="throw",r.arg=new TypeError("The iterator does not provide a '"+n+"' method")),g;var a=h(o,e.iterator,r.arg);if("throw"===a.type)return r.method="throw",r.arg=a.arg,r.delegate=null,g;var i=a.arg;return i?i.done?(r[e.resultName]=i.value,r.next=e.nextLoc,"return"!==r.method&&(r.method="next",r.arg=t),r.delegate=null,g):i:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,g)}function N(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function A(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function P(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(N,this),this.reset(!0)}function G(e){if(e||""===e){var r=e[u];if(r)return r.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var o=-1,i=function r(){for(;++o<e.length;)if(a.call(e,o))return r.value=e[o],r.done=!1,r;return r.value=t,r.done=!0,r};return i.next=i}}throw new TypeError(n(e)+" is not iterable")}return _.prototype=w,i(k,"constructor",{value:w,configurable:!0}),i(w,"constructor",{value:_,configurable:!0}),_.displayName=d(w,l,"GeneratorFunction"),e.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===_||"GeneratorFunction"===(e.displayName||e.name))},e.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,w):(t.__proto__=w,d(t,l,"GeneratorFunction")),t.prototype=Object.create(k),t},e.awrap=function(t){return{__await:t}},M(O.prototype),d(O.prototype,s,(function(){return this})),e.AsyncIterator=O,e.async=function(t,r,n,o,a){void 0===a&&(a=Promise);var i=new O(f(t,r,n,o),a);return e.isGeneratorFunction(r)?i:i.next().then((function(t){return t.done?t.value:i.next()}))},M(k),d(k,l,"Generator"),d(k,u,(function(){return this})),d(k,"toString",(function(){return"[object Generator]"})),e.keys=function(t){var e=Object(t),r=[];for(var n in e)r.push(n);return r.reverse(),function t(){for(;r.length;){var n=r.pop();if(n in e)return t.value=n,t.done=!1,t}return t.done=!0,t}},e.values=G,P.prototype={constructor:P,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=t,this.done=!1,this.delegate=null,this.method="next",this.arg=t,this.tryEntries.forEach(A),!e)for(var r in this)"t"===r.charAt(0)&&a.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=t)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var r=this;function n(n,o){return c.type="throw",c.arg=e,r.next=n,o&&(r.method="next",r.arg=t),!!o}for(var o=this.tryEntries.length-1;o>=0;--o){var i=this.tryEntries[o],c=i.completion;if("root"===i.tryLoc)return n("end");if(i.tryLoc<=this.prev){var u=a.call(i,"catchLoc"),s=a.call(i,"finallyLoc");if(u&&s){if(this.prev<i.catchLoc)return n(i.catchLoc,!0);if(this.prev<i.finallyLoc)return n(i.finallyLoc)}else if(u){if(this.prev<i.catchLoc)return n(i.catchLoc,!0)}else{if(!s)throw Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return n(i.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var n=this.tryEntries[r];if(n.tryLoc<=this.prev&&a.call(n,"finallyLoc")&&this.prev<n.finallyLoc){var o=n;break}}o&&("break"===t||"continue"===t)&&o.tryLoc<=e&&e<=o.finallyLoc&&(o=null);var i=o?o.completion:{};return i.type=t,i.arg=e,o?(this.method="next",this.next=o.finallyLoc,g):this.complete(i)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),g},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),A(r),g}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;A(r)}return o}}throw Error("illegal catch attempt")},delegateYield:function(e,r,n){return this.delegate={iterator:G(e),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=t),g}},e}function a(t,e,r,n,o,a,i){try{var c=t[a](i),u=c.value}catch(t){return void r(t)}c.done?e(u):Promise.resolve(u).then(n,o)}function i(t){return function(){var e=this,r=arguments;return new Promise((function(n,o){var i=t.apply(e,r);function c(t){a(i,n,o,c,u,"next",t)}function u(t){a(i,n,o,c,u,"throw",t)}c(void 0)}))}}function c(t){return u.apply(this,arguments)}function u(){return(u=i(o().mark((function t(e){var n;return o().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!r.some((function(t){return e.includes(t)}))){t.next=3;break}return t.abrupt("return",!0);case 3:return t.next=5,new Promise((function(t){chrome.storage.local.get(["whitelist"],(function(r){var n=r.whitelist||[];console.log("Whitelisted websites:",n),t(n.some((function(t){return e.includes(t)})))}))}));case 5:return n=t.sent,t.abrupt("return",n);case 7:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function s(r){new MutationObserver((function(n){n.forEach((function(n){"childList"===n.type&&n.addedNodes.forEach((function(n){1===n.nodeType&&t.forEach((function(o){n.matches(o)?e(n,r):n.shadowRoot?function(r,n){var o=t.join(", ");r.querySelectorAll(o).forEach((function(t){return e(t,n)}))}(n.shadowRoot,r):n.querySelectorAll(o).forEach((function(t){return e(t,r)}))}))}))}))})).observe(document.body,{childList:!0,subtree:!0}),function(r){document.querySelectorAll(t.join(", ")).forEach((function(t){return e(t,r)}))}(r)}chrome.storage.sync.get(["enabled","selectedSet"],function(){var t=i(o().mark((function t(e){var r,n,a,i,u;return o().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a=null===(r=window)||void 0===r||null===(r=r.location)||void 0===r?void 0:r.hostname,t.next=3,c(a);case 3:if(!t.sent){t.next=6;break}return t.abrupt("return");case 6:i=null===(n=e.enabled)||void 0===n||n,u=e.selectedSet||"set_space",i&&s(u);case 9:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}())})();