/*! For license information please see content.bundle.js.LICENSE.txt */
(()=>{"use strict";var t=['[id^="dclk-studio-creative"]','[id^="ad_unit"]','[id^="google_ads_iframe_"]','[id^="yandex_rtb"]','[id^="aswift_"]','[class^="AdsBanner-module__item"]',".adsbygoogle",".promotedlink",".advertisement-block",".top_banner_yand",".side_banner_yand",".videoAdUiClickElement",".cm-vpaid-iframe","._cm-ad-active",".trc-content-sponsored","._cm-native-ad",".ym-video--player",".content-ad-block",".adv",".ad-header",".bannerAd",".adsonSidebar",".ad--inview",".GoogleActiveViewElement",".adv-slot_adtag",".AdsBanner-module",".SidebarAds_main",".inart-ad",".needsclick","[data-google-query-id]","[data-ad-client]","[data-ad-id]","img[src*='googlesyndication.com']","img[src*='trafmag']","img[src*='cummerata.link']","img[src*='googlesyndication']","img[src*='oritoee']","img[alt='ads']","img[alt='Advertisement']","iframe[src*='googlesyndication.com']","iframe[src*='googleads']","iframe[src*='adtelligent.com']",'iframe[id*="google_ads_iframe_"]','iframe[id*="google_ad"]','iframe[id*="aswift_"]','iframe[id*="phathome_"]','iframe[id*="ad_iframe"]','iframe[title*="advertisement"]','iframe[name*="aswift"]',"iframe[src*='ads']","iframe[src*='mobtrafmag']","a[href*='trafmag.com']","a[href*='redirect.trackerado.com'] .thumbBlock","a[href*='smartadserver']","a[href*='/AVServe/']","a[href*='adclick']","a[id*='aw0']","a[rel*='sponsored'] .thumbBlock","article[class='Advertisement']","aside[aria-label='advertisement']","ins.adsbygoogle","div[data-name='adaptiveConstructorAd']","div[data-name='data-google-av-adk']","div[data-name='data-google-av-flags']","div[data-name='data-google-query-id']","div[data-name='adWrapper']","div[data-freestar-ad]","div[data-name='ad wrapper']","div[data-bidder='direct']","div[data-name='adWrapper']","div[data-name='adaptiveConstructorAd']","div[data-ad-id]","div[data-confiant-id*='CONFIANT_AD']","div[id*='MarketGid']","div[id*='div-mps-ad']","div.adsbygoogle",'div[id*="yandex"]','div[id*="google_ad"]','div[id*="_fs-ad-iframe-container"]','div[id*="sidebar-ad"]','div[id^="yandex_rtb"]','div[class*="AdsBanner-module"]','div[class*="TagAd_main"]','div[id*="div-gpt-ad"]',"div.promo-block"];function e(t,e){var n="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!n){if(Array.isArray(t)||(n=function(t,e){if(t){if("string"==typeof t)return r(t,e);var n={}.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?r(t,e):void 0}}(t))||e&&t&&"number"==typeof t.length){n&&(t=n);var o=0,a=function(){};return{s:a,n:function(){return o>=t.length?{done:!0}:{done:!1,value:t[o++]}},e:function(t){throw t},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,c=!0,l=!1;return{s:function(){n=n.call(t)},n:function(){var t=n.next();return c=t.done,t},e:function(t){l=!0,i=t},f:function(){try{c||null==n.return||n.return()}finally{if(l)throw i}}}}function r(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=Array(e);r<e;r++)n[r]=t[r];return n}function n(t,r){var n,o=t.parentNode;if(o){if(function(t){function r(t,n){if(0===n||!t)return!1;var o,a=e(t.children);try{for(a.s();!(o=a.n()).done;){var i=o.value;if(i.classList.contains("aa-img"))return console.log("Found a node with a replaced ad."),!0;if(r(i,n-1))return!0}}catch(t){a.e(t)}finally{a.f()}return!1}var n=t.parentNode;if(!n)return!1;var o,a=e(n.children);try{for(a.s();!(o=a.n()).done;){var i=o.value;if(i!==t&&r(i,3))return!0}}catch(t){a.e(t)}finally{a.f()}return!1}(o))return console.log("Ad already replaced in a close sibling node. Skipping..."),null;var a=t.offsetWidth>970?970:t.offsetWidth,i=t.offsetHeight>600?600:t.offsetHeight,c=(n=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:4,r=Math.floor(Math.random()*e)+1;return"".concat(t,"_v").concat(r)}(function(t,e){var r=t/e;return 970===t&&90===e?"ratio_10_1":728===t&&90===e?"ratio_8_1":300===t&&250===e?"ratio_4_3":336===t&&280===e?"ratio_6_5":300===t&&600===e?"ratio_2_1":160===t&&600===e?"ratio_1_3":Math.abs(r-1)<.05?"ratio_1_1":Math.abs(r-4/3)<.05?"ratio_4_3":Math.abs(r-1/3)<.05?"ratio_1_3":Math.abs(r-10)<.05?"ratio_10_1":Math.abs(r-2)<.05?"ratio_2_1":"default"}(a,i),4),n),l=o.offsetWidth>970?970:o.offsetWidth;if(o.offsetHeight>600||o.offsetHeight,l<a/2||0==a){console.log("Instead of img should be empty block");var u=function(){var t=document.createElement("div");return t.style.width="0",t.style.height="0",t.style.display="none",t}();return o.appendChild(u),void t.remove()}var s=function(t,e,r,n){var o=document.createElement("img");o.src=function(t,e){var r="images/".concat(e,"/").concat(t,".png");return chrome.runtime.getURL(r)}(t,e),o.alt="".concat(r/n,", ").concat(r,"x").concat(n);var a=r,i=n>0?n:250;return o.style.width="".concat(a,"px"),o.style.height="".concat(i,"px"),o.style.minHeight="90px",o.style.objectFit="contain",o.style.position="relative",o.classList.add("aa-img"),o.onload=function(){o.style.maxHeight="".concat(o.naturalHeight,"px"),o.style.maxWidth="".concat(o.naturalWidth,"px"),o.style.objectFit="contain",o.style.overflow="hidden"},o}(c,r,a,i),d=document.createElement("div");d.style.position="relative",d.style.setProperty("width","fit-content","important"),d.style.height="".concat(s.style.height),d.style.margin="0 auto",d.appendChild(s);var f=function(t,e){var r=document.createElement("span");return r.innerHTML="&#10005;",r.style.position="absolute",r.style.top="10px",r.style.right="10px",r.style.backgroundColor="rgba(0, 0, 0, 0.35)",r.style.color="white",r.style.padding="3px",r.style.cursor="pointer",r.style.zIndex="10",r.addEventListener("click",(function(){"BODY"===t.tagName?e.style.display="none":t.style.display="none"})),r}(o,d);d.appendChild(f),o.appendChild(d),o.style.minHeight="90px",o.style.minWidth="90px",o.style.height="fit-content",t.remove()}}var o=["docs.google.com","adsmanager.facebook.com","ads.google.com"];function a(t){return a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},a(t)}function i(){i=function(){return e};var t,e={},r=Object.prototype,n=r.hasOwnProperty,o=Object.defineProperty||function(t,e,r){t[e]=r.value},c="function"==typeof Symbol?Symbol:{},l=c.iterator||"@@iterator",u=c.asyncIterator||"@@asyncIterator",s=c.toStringTag||"@@toStringTag";function d(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{d({},"")}catch(t){d=function(t,e,r){return t[e]=r}}function f(t,e,r,n){var a=e&&e.prototype instanceof b?e:b,i=Object.create(a.prototype),c=new P(n||[]);return o(i,"_invoke",{value:j(t,r,c)}),i}function h(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}e.wrap=f;var v="suspendedStart",p="suspendedYield",y="executing",m="completed",g={};function b(){}function w(){}function _(){}var x={};d(x,l,(function(){return this}));var E=Object.getPrototypeOf,L=E&&E(E(T([])));L&&L!==r&&n.call(L,l)&&(x=L);var k=_.prototype=b.prototype=Object.create(x);function A(t){["next","throw","return"].forEach((function(e){d(t,e,(function(t){return this._invoke(e,t)}))}))}function S(t,e){function r(o,i,c,l){var u=h(t[o],t,i);if("throw"!==u.type){var s=u.arg,d=s.value;return d&&"object"==a(d)&&n.call(d,"__await")?e.resolve(d.__await).then((function(t){r("next",t,c,l)}),(function(t){r("throw",t,c,l)})):e.resolve(d).then((function(t){s.value=t,c(s)}),(function(t){return r("throw",t,c,l)}))}l(u.arg)}var i;o(this,"_invoke",{value:function(t,n){function o(){return new e((function(e,o){r(t,n,e,o)}))}return i=i?i.then(o,o):o()}})}function j(e,r,n){var o=v;return function(a,i){if(o===y)throw Error("Generator is already running");if(o===m){if("throw"===a)throw i;return{value:t,done:!0}}for(n.method=a,n.arg=i;;){var c=n.delegate;if(c){var l=O(c,n);if(l){if(l===g)continue;return l}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(o===v)throw o=m,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);o=y;var u=h(e,r,n);if("normal"===u.type){if(o=n.done?m:p,u.arg===g)continue;return{value:u.arg,done:n.done}}"throw"===u.type&&(o=m,n.method="throw",n.arg=u.arg)}}}function O(e,r){var n=r.method,o=e.iterator[n];if(o===t)return r.delegate=null,"throw"===n&&e.iterator.return&&(r.method="return",r.arg=t,O(e,r),"throw"===r.method)||"return"!==n&&(r.method="throw",r.arg=new TypeError("The iterator does not provide a '"+n+"' method")),g;var a=h(o,e.iterator,r.arg);if("throw"===a.type)return r.method="throw",r.arg=a.arg,r.delegate=null,g;var i=a.arg;return i?i.done?(r[e.resultName]=i.value,r.next=e.nextLoc,"return"!==r.method&&(r.method="next",r.arg=t),r.delegate=null,g):i:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,g)}function N(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function M(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function P(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(N,this),this.reset(!0)}function T(e){if(e||""===e){var r=e[l];if(r)return r.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var o=-1,i=function r(){for(;++o<e.length;)if(n.call(e,o))return r.value=e[o],r.done=!1,r;return r.value=t,r.done=!0,r};return i.next=i}}throw new TypeError(a(e)+" is not iterable")}return w.prototype=_,o(k,"constructor",{value:_,configurable:!0}),o(_,"constructor",{value:w,configurable:!0}),w.displayName=d(_,s,"GeneratorFunction"),e.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===w||"GeneratorFunction"===(e.displayName||e.name))},e.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,_):(t.__proto__=_,d(t,s,"GeneratorFunction")),t.prototype=Object.create(k),t},e.awrap=function(t){return{__await:t}},A(S.prototype),d(S.prototype,u,(function(){return this})),e.AsyncIterator=S,e.async=function(t,r,n,o,a){void 0===a&&(a=Promise);var i=new S(f(t,r,n,o),a);return e.isGeneratorFunction(r)?i:i.next().then((function(t){return t.done?t.value:i.next()}))},A(k),d(k,s,"Generator"),d(k,l,(function(){return this})),d(k,"toString",(function(){return"[object Generator]"})),e.keys=function(t){var e=Object(t),r=[];for(var n in e)r.push(n);return r.reverse(),function t(){for(;r.length;){var n=r.pop();if(n in e)return t.value=n,t.done=!1,t}return t.done=!0,t}},e.values=T,P.prototype={constructor:P,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=t,this.done=!1,this.delegate=null,this.method="next",this.arg=t,this.tryEntries.forEach(M),!e)for(var r in this)"t"===r.charAt(0)&&n.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=t)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var r=this;function o(n,o){return c.type="throw",c.arg=e,r.next=n,o&&(r.method="next",r.arg=t),!!o}for(var a=this.tryEntries.length-1;a>=0;--a){var i=this.tryEntries[a],c=i.completion;if("root"===i.tryLoc)return o("end");if(i.tryLoc<=this.prev){var l=n.call(i,"catchLoc"),u=n.call(i,"finallyLoc");if(l&&u){if(this.prev<i.catchLoc)return o(i.catchLoc,!0);if(this.prev<i.finallyLoc)return o(i.finallyLoc)}else if(l){if(this.prev<i.catchLoc)return o(i.catchLoc,!0)}else{if(!u)throw Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return o(i.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var o=this.tryEntries[r];if(o.tryLoc<=this.prev&&n.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var a=o;break}}a&&("break"===t||"continue"===t)&&a.tryLoc<=e&&e<=a.finallyLoc&&(a=null);var i=a?a.completion:{};return i.type=t,i.arg=e,a?(this.method="next",this.next=a.finallyLoc,g):this.complete(i)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),g},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),M(r),g}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;M(r)}return o}}throw Error("illegal catch attempt")},delegateYield:function(e,r,n){return this.delegate={iterator:T(e),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=t),g}},e}function c(t,e,r,n,o,a,i){try{var c=t[a](i),l=c.value}catch(t){return void r(t)}c.done?e(l):Promise.resolve(l).then(n,o)}function l(t){return function(){var e=this,r=arguments;return new Promise((function(n,o){var a=t.apply(e,r);function i(t){c(a,n,o,i,l,"next",t)}function l(t){c(a,n,o,i,l,"throw",t)}i(void 0)}))}}function u(t){return s.apply(this,arguments)}function s(){return(s=l(i().mark((function t(e){var r;return i().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!o.some((function(t){return e.includes(t)}))){t.next=3;break}return t.abrupt("return",!0);case 3:return t.next=5,new Promise((function(t){chrome.storage.local.get(["whitelist"],(function(r){var n=r.whitelist||[];t(n.some((function(t){return e.includes(t)})))}))}));case 5:return r=t.sent,t.abrupt("return",r);case 7:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function d(e){new MutationObserver((function(r){r.forEach((function(r){"childList"===r.type&&r.addedNodes.forEach((function(r){1===r.nodeType&&t.forEach((function(o){r.matches(o)?n(r,e):r.shadowRoot?function(e,r){var o=t.join(", ");e.querySelectorAll(o).forEach((function(t){return n(t,r)}))}(r.shadowRoot,e):r.querySelectorAll(o).forEach((function(t){return n(t,e)}))}))}))}))})).observe(document.body,{childList:!0,subtree:!0}),function(e){document.querySelectorAll(t.join(", ")).forEach((function(t){return n(t,e)}))}(e)}chrome.storage.sync.get(["enabled","selectedSet"],function(){var t=l(i().mark((function t(e){var r,n,o,a,c,l;return i().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a=null===(r=window)||void 0===r||null===(r=r.location)||void 0===r?void 0:r.hostname,t.next=3,u(a);case 3:if(!t.sent){t.next=6;break}return t.abrupt("return");case 6:c=null===(n=e.enabled)||void 0===n||n,l=null!==(o=e.selectedSet)&&void 0!==o?o:"set_space",c&&d(l);case 9:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}())})();