/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren */
'use strict';


// *** Start of auto-included sw-toolbox code. ***
/* 
 Copyright 2016 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var t;t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,t.toolbox=e()}}(function(){return function e(t,n,r){function o(c,s){if(!n[c]){if(!t[c]){var a="function"==typeof require&&require;if(!s&&a)return a(c,!0);if(i)return i(c,!0);var u=new Error("Cannot find module '"+c+"'");throw u.code="MODULE_NOT_FOUND",u}var f=n[c]={exports:{}};t[c][0].call(f.exports,function(e){var n=t[c][1][e];return o(n?n:e)},f,f.exports,e,t,n,r)}return n[c].exports}for(var i="function"==typeof require&&require,c=0;c<r.length;c++)o(r[c]);return o}({1:[function(e,t,n){"use strict";function r(e,t){t=t||{};var n=t.debug||d.debug;n&&console.log("[sw-toolbox] "+e)}function o(e){var t;return e&&e.cache&&(t=e.cache.name),t=t||d.cache.name,caches.open(t)}function i(e,t){t=t||{};var n=t.successResponses||d.successResponses;return fetch(e.clone()).then(function(r){return"GET"===e.method&&n.test(r.status)&&o(t).then(function(n){n.put(e,r).then(function(){var r=t.cache||d.cache;(r.maxEntries||r.maxAgeSeconds)&&r.name&&c(e,n,r)})}),r.clone()})}function c(e,t,n){var r=s.bind(null,e,t,n);l=l?l.then(r):r()}function s(e,t,n){var o=e.url,i=n.maxAgeSeconds,c=n.maxEntries,s=n.name,a=Date.now();return r("Updating LRU order for "+o+". Max entries is "+c+", max age is "+i),g.getDb(s).then(function(e){return g.setTimestampForUrl(e,o,a)}).then(function(e){return g.expireEntries(e,c,i,a)}).then(function(e){r("Successfully updated IDB.");var n=e.map(function(e){return t.delete(e)});return Promise.all(n).then(function(){r("Done with cache cleanup.")})}).catch(function(e){r(e)})}function a(e,t,n){return r("Renaming cache: ["+e+"] to ["+t+"]",n),caches.delete(t).then(function(){return Promise.all([caches.open(e),caches.open(t)]).then(function(t){var n=t[0],r=t[1];return n.keys().then(function(e){return Promise.all(e.map(function(e){return n.match(e).then(function(t){return r.put(e,t)})}))}).then(function(){return caches.delete(e)})})})}function u(e,t){return o(t).then(function(t){return t.add(e)})}function f(e,t){return o(t).then(function(t){return t.delete(e)})}function h(e){e instanceof Promise||p(e),d.preCacheItems=d.preCacheItems.concat(e)}function p(e){var t=Array.isArray(e);if(t&&e.forEach(function(e){"string"==typeof e||e instanceof Request||(t=!1)}),!t)throw new TypeError("The precache method expects either an array of strings and/or Requests or a Promise that resolves to an array of strings and/or Requests.");return e}var l,d=e("./options"),g=e("./idb-cache-expiration");t.exports={debug:r,fetchAndCache:i,openCache:o,renameCache:a,cache:u,uncache:f,precache:h,validatePrecacheInput:p}},{"./idb-cache-expiration":2,"./options":4}],2:[function(e,t,n){"use strict";function r(e){return new Promise(function(t,n){var r=indexedDB.open(u+e,f);r.onupgradeneeded=function(){var e=r.result.createObjectStore(h,{keyPath:p});e.createIndex(l,l,{unique:!1})},r.onsuccess=function(){t(r.result)},r.onerror=function(){n(r.error)}})}function o(e){return e in d||(d[e]=r(e)),d[e]}function i(e,t,n){return new Promise(function(r,o){var i=e.transaction(h,"readwrite"),c=i.objectStore(h);c.put({url:t,timestamp:n}),i.oncomplete=function(){r(e)},i.onabort=function(){o(i.error)}})}function c(e,t,n){return t?new Promise(function(r,o){var i=1e3*t,c=[],s=e.transaction(h,"readwrite"),a=s.objectStore(h),u=a.index(l);u.openCursor().onsuccess=function(e){var t=e.target.result;if(t&&n-i>t.value[l]){var r=t.value[p];c.push(r),a.delete(r),t.continue()}},s.oncomplete=function(){r(c)},s.onabort=o}):Promise.resolve([])}function s(e,t){return t?new Promise(function(n,r){var o=[],i=e.transaction(h,"readwrite"),c=i.objectStore(h),s=c.index(l),a=s.count();s.count().onsuccess=function(){var e=a.result;e>t&&(s.openCursor().onsuccess=function(n){var r=n.target.result;if(r){var i=r.value[p];o.push(i),c.delete(i),e-o.length>t&&r.continue()}})},i.oncomplete=function(){n(o)},i.onabort=r}):Promise.resolve([])}function a(e,t,n,r){return c(e,n,r).then(function(n){return s(e,t).then(function(e){return n.concat(e)})})}var u="sw-toolbox-",f=1,h="store",p="url",l="timestamp",d={};t.exports={getDb:o,setTimestampForUrl:i,expireEntries:a}},{}],3:[function(e,t,n){"use strict";function r(e){var t=a.match(e.request);t?e.respondWith(t(e.request)):a.default&&"GET"===e.request.method&&0===e.request.url.indexOf("http")&&e.respondWith(a.default(e.request))}function o(e){s.debug("activate event fired");var t=u.cache.name+"$$$inactive$$$";e.waitUntil(s.renameCache(t,u.cache.name))}function i(e){return e.reduce(function(e,t){return e.concat(t)},[])}function c(e){var t=u.cache.name+"$$$inactive$$$";s.debug("install event fired"),s.debug("creating cache ["+t+"]"),e.waitUntil(s.openCache({cache:{name:t}}).then(function(e){return Promise.all(u.preCacheItems).then(i).then(s.validatePrecacheInput).then(function(t){return s.debug("preCache list: "+(t.join(", ")||"(none)")),e.addAll(t)})}))}e("serviceworker-cache-polyfill");var s=e("./helpers"),a=e("./router"),u=e("./options");t.exports={fetchListener:r,activateListener:o,installListener:c}},{"./helpers":1,"./options":4,"./router":6,"serviceworker-cache-polyfill":16}],4:[function(e,t,n){"use strict";var r;r=self.registration?self.registration.scope:self.scope||new URL("./",self.location).href,t.exports={cache:{name:"$$$toolbox-cache$$$"+r+"$$$",maxAgeSeconds:null,maxEntries:null},debug:!1,networkTimeoutSeconds:null,preCacheItems:[],successResponses:/^0|([123]\d\d)|(40[14567])|410$/}},{}],5:[function(e,t,n){"use strict";var r=new URL("./",self.location),o=r.pathname,i=e("path-to-regexp"),c=function(e,t,n,r){t instanceof RegExp?this.fullUrlRegExp=t:(0!==t.indexOf("/")&&(t=o+t),this.keys=[],this.regexp=i(t,this.keys)),this.method=e,this.options=r,this.handler=n};c.prototype.makeHandler=function(e){var t;if(this.regexp){var n=this.regexp.exec(e);t={},this.keys.forEach(function(e,r){t[e.name]=n[r+1]})}return function(e){return this.handler(e,t,this.options)}.bind(this)},t.exports=c},{"path-to-regexp":15}],6:[function(e,t,n){"use strict";function r(e){return e.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")}var o=e("./route"),i=e("./helpers"),c=function(e,t){for(var n=e.entries(),r=n.next(),o=[];!r.done;){var i=new RegExp(r.value[0]);i.test(t)&&o.push(r.value[1]),r=n.next()}return o},s=function(){this.routes=new Map,this.routes.set(RegExp,new Map),this.default=null};["get","post","put","delete","head","any"].forEach(function(e){s.prototype[e]=function(t,n,r){return this.add(e,t,n,r)}}),s.prototype.add=function(e,t,n,c){c=c||{};var s;t instanceof RegExp?s=RegExp:(s=c.origin||self.location.origin,s=s instanceof RegExp?s.source:r(s)),e=e.toLowerCase();var a=new o(e,t,n,c);this.routes.has(s)||this.routes.set(s,new Map);var u=this.routes.get(s);u.has(e)||u.set(e,new Map);var f=u.get(e),h=a.regexp||a.fullUrlRegExp;f.has(h.source)&&i.debug('"'+t+'" resolves to same regex as existing route.'),f.set(h.source,a)},s.prototype.matchMethod=function(e,t){var n=new URL(t),r=n.origin,o=n.pathname;return this._match(e,c(this.routes,r),o)||this._match(e,[this.routes.get(RegExp)],t)},s.prototype._match=function(e,t,n){if(0===t.length)return null;for(var r=0;r<t.length;r++){var o=t[r],i=o&&o.get(e.toLowerCase());if(i){var s=c(i,n);if(s.length>0)return s[0].makeHandler(n)}}return null},s.prototype.match=function(e){return this.matchMethod(e.method,e.url)||this.matchMethod("any",e.url)},t.exports=new s},{"./helpers":1,"./route":5}],7:[function(e,t,n){"use strict";function r(e,t,n){return o.debug("Strategy: cache first ["+e.url+"]",n),o.openCache(n).then(function(t){return t.match(e).then(function(t){return t?t:o.fetchAndCache(e,n)})})}var o=e("../helpers");t.exports=r},{"../helpers":1}],8:[function(e,t,n){"use strict";function r(e,t,n){return o.debug("Strategy: cache only ["+e.url+"]",n),o.openCache(n).then(function(t){return t.match(e)})}var o=e("../helpers");t.exports=r},{"../helpers":1}],9:[function(e,t,n){"use strict";function r(e,t,n){return o.debug("Strategy: fastest ["+e.url+"]",n),new Promise(function(r,c){var s=!1,a=[],u=function(e){a.push(e.toString()),s?c(new Error('Both cache and network failed: "'+a.join('", "')+'"')):s=!0},f=function(e){e instanceof Response?r(e):u("No result returned")};o.fetchAndCache(e.clone(),n).then(f,u),i(e,t,n).then(f,u)})}var o=e("../helpers"),i=e("./cacheOnly");t.exports=r},{"../helpers":1,"./cacheOnly":8}],10:[function(e,t,n){t.exports={networkOnly:e("./networkOnly"),networkFirst:e("./networkFirst"),cacheOnly:e("./cacheOnly"),cacheFirst:e("./cacheFirst"),fastest:e("./fastest")}},{"./cacheFirst":7,"./cacheOnly":8,"./fastest":9,"./networkFirst":11,"./networkOnly":12}],11:[function(e,t,n){"use strict";function r(e,t,n){n=n||{};var r=n.successResponses||o.successResponses,c=n.networkTimeoutSeconds||o.networkTimeoutSeconds;return i.debug("Strategy: network first ["+e.url+"]",n),i.openCache(n).then(function(t){var o,s,a=[];if(c){var u=new Promise(function(n){o=setTimeout(function(){t.match(e).then(function(e){e&&n(e)})},1e3*c)});a.push(u)}var f=i.fetchAndCache(e,n).then(function(e){if(o&&clearTimeout(o),r.test(e.status))return e;throw i.debug("Response was an HTTP error: "+e.statusText,n),s=e,new Error("Bad response")}).catch(function(r){return i.debug("Network or response error, fallback to cache ["+e.url+"]",n),t.match(e).then(function(e){if(e)return e;if(s)return s;throw r})});return a.push(f),Promise.race(a)})}var o=e("../options"),i=e("../helpers");t.exports=r},{"../helpers":1,"../options":4}],12:[function(e,t,n){"use strict";function r(e,t,n){return o.debug("Strategy: network only ["+e.url+"]",n),fetch(e)}var o=e("../helpers");t.exports=r},{"../helpers":1}],13:[function(e,t,n){"use strict";var r=e("./options"),o=e("./router"),i=e("./helpers"),c=e("./strategies"),s=e("./listeners");i.debug("Service Worker Toolbox is loading"),self.addEventListener("install",s.installListener),self.addEventListener("activate",s.activateListener),self.addEventListener("fetch",s.fetchListener),t.exports={networkOnly:c.networkOnly,networkFirst:c.networkFirst,cacheOnly:c.cacheOnly,cacheFirst:c.cacheFirst,fastest:c.fastest,router:o,options:r,cache:i.cache,uncache:i.uncache,precache:i.precache}},{"./helpers":1,"./listeners":3,"./options":4,"./router":6,"./strategies":10}],14:[function(e,t,n){t.exports=Array.isArray||function(e){return"[object Array]"==Object.prototype.toString.call(e)}},{}],15:[function(e,t,n){function r(e){for(var t,n=[],r=0,o=0,i="";null!=(t=x.exec(e));){var c=t[0],s=t[1],a=t.index;if(i+=e.slice(o,a),o=a+c.length,s)i+=s[1];else{var f=e[o],h=t[2],p=t[3],l=t[4],d=t[5],g=t[6],m=t[7];i&&(n.push(i),i="");var v=null!=h&&null!=f&&f!==h,w="+"===g||"*"===g,y="?"===g||"*"===g,b=t[2]||"/",E=l||d||(m?".*":"[^"+b+"]+?");n.push({name:p||r++,prefix:h||"",delimiter:b,optional:y,repeat:w,partial:v,asterisk:!!m,pattern:u(E)})}}return o<e.length&&(i+=e.substr(o)),i&&n.push(i),n}function o(e){return s(r(e))}function i(e){return encodeURI(e).replace(/[\/?#]/g,function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})}function c(e){return encodeURI(e).replace(/[?#]/g,function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})}function s(e){for(var t=new Array(e.length),n=0;n<e.length;n++)"object"==typeof e[n]&&(t[n]=new RegExp("^(?:"+e[n].pattern+")$"));return function(n,r){for(var o="",s=n||{},a=r||{},u=a.pretty?i:encodeURIComponent,f=0;f<e.length;f++){var h=e[f];if("string"!=typeof h){var p,l=s[h.name];if(null==l){if(h.optional){h.partial&&(o+=h.prefix);continue}throw new TypeError('Expected "'+h.name+'" to be defined')}if(v(l)){if(!h.repeat)throw new TypeError('Expected "'+h.name+'" to not repeat, but received `'+JSON.stringify(l)+"`");if(0===l.length){if(h.optional)continue;throw new TypeError('Expected "'+h.name+'" to not be empty')}for(var d=0;d<l.length;d++){if(p=u(l[d]),!t[f].test(p))throw new TypeError('Expected all "'+h.name+'" to match "'+h.pattern+'", but received `'+JSON.stringify(p)+"`");o+=(0===d?h.prefix:h.delimiter)+p}}else{if(p=h.asterisk?c(l):u(l),!t[f].test(p))throw new TypeError('Expected "'+h.name+'" to match "'+h.pattern+'", but received "'+p+'"');o+=h.prefix+p}}else o+=h}return o}}function a(e){return e.replace(/([.+*?=^!:${}()[\]|\/\\])/g,"\\$1")}function u(e){return e.replace(/([=!:$\/()])/g,"\\$1")}function f(e,t){return e.keys=t,e}function h(e){return e.sensitive?"":"i"}function p(e,t){var n=e.source.match(/\((?!\?)/g);if(n)for(var r=0;r<n.length;r++)t.push({name:r,prefix:null,delimiter:null,optional:!1,repeat:!1,partial:!1,asterisk:!1,pattern:null});return f(e,t)}function l(e,t,n){for(var r=[],o=0;o<e.length;o++)r.push(m(e[o],t,n).source);var i=new RegExp("(?:"+r.join("|")+")",h(n));return f(i,t)}function d(e,t,n){for(var o=r(e),i=g(o,n),c=0;c<o.length;c++)"string"!=typeof o[c]&&t.push(o[c]);return f(i,t)}function g(e,t){t=t||{};for(var n=t.strict,r=t.end!==!1,o="",i=e[e.length-1],c="string"==typeof i&&/\/$/.test(i),s=0;s<e.length;s++){var u=e[s];if("string"==typeof u)o+=a(u);else{var f=a(u.prefix),p="(?:"+u.pattern+")";u.repeat&&(p+="(?:"+f+p+")*"),p=u.optional?u.partial?f+"("+p+")?":"(?:"+f+"("+p+"))?":f+"("+p+")",o+=p}}return n||(o=(c?o.slice(0,-2):o)+"(?:\\/(?=$))?"),o+=r?"$":n&&c?"":"(?=\\/|$)",new RegExp("^"+o,h(t))}function m(e,t,n){return t=t||[],v(t)?n||(n={}):(n=t,t=[]),e instanceof RegExp?p(e,t):v(e)?l(e,t,n):d(e,t,n)}var v=e("isarray");t.exports=m,t.exports.parse=r,t.exports.compile=o,t.exports.tokensToFunction=s,t.exports.tokensToRegExp=g;var x=new RegExp(["(\\\\.)","([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))"].join("|"),"g")},{isarray:14}],16:[function(e,t,n){!function(){var e=Cache.prototype.addAll,t=navigator.userAgent.match(/(Firefox|Chrome)\/(\d+\.)/);if(t)var n=t[1],r=parseInt(t[2]);e&&(!t||"Firefox"===n&&r>=46||"Chrome"===n&&r>=50)||(Cache.prototype.addAll=function(e){function t(e){this.name="NetworkError",this.code=19,this.message=e}var n=this;return t.prototype=Object.create(Error.prototype),Promise.resolve().then(function(){if(arguments.length<1)throw new TypeError;return e=e.map(function(e){return e instanceof Request?e:String(e)}),Promise.all(e.map(function(e){"string"==typeof e&&(e=new Request(e));var n=new URL(e.url).protocol;if("http:"!==n&&"https:"!==n)throw new t("Invalid scheme");return fetch(e.clone())}))}).then(function(r){if(r.some(function(e){return!e.ok}))throw new t("Incorrect response status");return Promise.all(r.map(function(t,r){return n.put(e[r],t)}))}).then(function(){})},Cache.prototype.add=function(e){return this.addAll([e])})}()},{}]},{},[13])(13)});
//# sourceMappingURL=sw-toolbox.js.map

// *** End of auto-included sw-toolbox code. ***




/* eslint-disable quotes, comma-spacing */
var PrecacheConfig = [["/bower_components/app-layout/app-drawer/app-drawer.html","687ac17c2c0adca1adc4031ec5d2f335"],["/bower_components/app-layout/app-header/app-header.html","c6e2d544cf93aa6258ef9ca82baaea6d"],["/bower_components/app-layout/app-scroll-effects/app-scroll-effects-behavior.html","3007817ffcb7fd1cf6528305c0fec9ff"],["/bower_components/app-layout/app-scroll-effects/effects/waterfall.html","6cbd757de769cd5af213aaebb8780745"],["/bower_components/app-layout/app-toolbar/app-toolbar.html","bde0a79d3265bef565ee86c699b6bbae"],["/bower_components/app-layout/helpers/helpers.html","95b52c0c05f77b65bc1b5dc0715d2495"],["/bower_components/app-route/app-location.html","0c082f44abb664591f5b99e57a3855e6"],["/bower_components/app-route/app-route-converter-behavior.html","3b85a02b434cbccdcb87396be3554258"],["/bower_components/app-route/app-route.html","ee6897a01647904badcc856c1a4cb6ec"],["/bower_components/app-storage/app-network-status-behavior.html","da5ca8e23c23932448b728ee17c1234e"],["/bower_components/app-storage/app-storage-behavior.html","009d20c8051259c21d6095736d7213ab"],["/bower_components/file-input/file-input.html","de08da845d380c235157ab51469db6c7"],["/bower_components/file-input/file-input.js","02ebfad74af3ecf152fd89d6ec54db91"],["/bower_components/firebase/firebase-app.js","fc71bc4a99b1f9d28b707de5ee65fcc1"],["/bower_components/firebase/firebase-auth.js","5bcd458719bb53a1febb9aa5f1b6be66"],["/bower_components/firebase/firebase-database.js","cb5bcb0202b68a9f6213af150e40e6c0"],["/bower_components/firebase/firebase-messaging.js","47c467ca4b6689ce52cef03a31462f4f"],["/bower_components/firebase/firebase-storage.js","9903420bb7d1e241395f9959612ac071"],["/bower_components/firechat/dist/firechat.min.css","e26fe8fc693256d035d9337c0fe53a41"],["/bower_components/firechat/dist/firechat.min.js","56b768de2f129dbd335349b75d1abb9f"],["/bower_components/font-roboto/roboto.html","09500fd5adfad056ff5aa05e2aae0ec5"],["/bower_components/google-apis/google-maps-api.html","e4eb1641cec251f631cec2f569e8a551"],["/bower_components/google-map/google-map-directions.html","5df6b2a346233028ac286418093f8628"],["/bower_components/google-map/google-map-marker.html","d4432d8c2b75325d455c0f975d76107a"],["/bower_components/google-map/google-map.html","2f0fe724867a99ad81db369c1c234c20"],["/bower_components/iron-a11y-announcer/iron-a11y-announcer.html","a3bd031e39dde38cb8e619f670ee50f7"],["/bower_components/iron-a11y-keys-behavior/iron-a11y-keys-behavior.html","c4c3d44402c9d456c38c14da04d206b9"],["/bower_components/iron-ajax/iron-ajax.html","d606b330d7bd040660a53a5cda7f8acf"],["/bower_components/iron-ajax/iron-request.html","c2d289c4b20653353cff315cf247a45e"],["/bower_components/iron-autogrow-textarea/iron-autogrow-textarea.html","0f7bcdf39aeba2149aaa933178632ee6"],["/bower_components/iron-behaviors/iron-button-state.html","6565a80d1af09299c1201f8286849c3b"],["/bower_components/iron-behaviors/iron-control-state.html","1c12ee539b1dbbd0957ae26b3549cc13"],["/bower_components/iron-dropdown/iron-dropdown-scroll-manager.html","70904f32a519b07ec427d1a9a0c71528"],["/bower_components/iron-dropdown/iron-dropdown.html","0e2352a228fb17f90c345a4ffcca4b30"],["/bower_components/iron-fit-behavior/iron-fit-behavior.html","8d3799ca2f619ed4f31261bb03284671"],["/bower_components/iron-flex-layout/classes/iron-flex-layout.html","97fcf4e52b1c44a78f360d436bd4e1e0"],["/bower_components/iron-flex-layout/classes/iron-shadow-flex-layout.html","8d36ab2f6e4b1d1373be99ac0f3a4980"],["/bower_components/iron-flex-layout/iron-flex-layout.html","3987521c615734e4fe403f9acecfea54"],["/bower_components/iron-form-element-behavior/iron-form-element-behavior.html","a64177311979fc6a6aae454cb85ea2be"],["/bower_components/iron-form/iron-form.html","d567cf610fac57ae3c30af80c5400750"],["/bower_components/iron-icon/iron-icon.html","f2a0dfd0b79864b4f4efb578417a3fef"],["/bower_components/iron-icons/image-icons.html","30ef0224c9cf6acd66c506818396ccf7"],["/bower_components/iron-icons/iron-icons.html","c8f9154ae89b94e658e4a52eee690a16"],["/bower_components/iron-icons/maps-icons.html","071389c5d61ac4ab2f39dc1d784ece94"],["/bower_components/iron-iconset-svg/iron-iconset-svg.html","8d0d7213b8c3325ca7e5a658ca9aaf17"],["/bower_components/iron-image/iron-image.html","72175f3ce2bc8e6bf3436ab8749b470e"],["/bower_components/iron-input/iron-input.html","3e393eda6c241be2817ce0acc512bcf6"],["/bower_components/iron-jsonp-library/iron-jsonp-library.html","2278dab473da8287511ea8f8eb30144d"],["/bower_components/iron-location/iron-location.html","0ca9fd93d23992a9340ce7c433557226"],["/bower_components/iron-location/iron-query-params.html","36db93ae0855b5ba4210d6d22d76d8a7"],["/bower_components/iron-media-query/iron-media-query.html","7436f9608ebd2d31e4b346921651f84b"],["/bower_components/iron-menu-behavior/iron-menu-behavior.html","d3f30152b76f2fa27e02739a99060a29"],["/bower_components/iron-menu-behavior/iron-menubar-behavior.html","a0cc6674fc6d9d7ba0b68ff680b4e56b"],["/bower_components/iron-meta/iron-meta.html","dd4ef14e09c5771e70292d70963f6718"],["/bower_components/iron-overlay-behavior/iron-focusables-helper.html","1607d4d8a7d922ade7894167368ccc31"],["/bower_components/iron-overlay-behavior/iron-overlay-backdrop.html","35013b4b97041ed6b63cf95dbb9fbcb4"],["/bower_components/iron-overlay-behavior/iron-overlay-behavior.html","9e9090df0515a2c8b755bd9c2e944b45"],["/bower_components/iron-overlay-behavior/iron-overlay-manager.html","7f741ba06ffd837bf1697e8778b94731"],["/bower_components/iron-pages/iron-pages.html","5872a2ad58225c94b14ddea747f67cbd"],["/bower_components/iron-range-behavior/iron-range-behavior.html","34f5b83882b6b6c5cfad7543caab080e"],["/bower_components/iron-resizable-behavior/iron-resizable-behavior.html","e93449ccd4312e4e30060c87bd52ed25"],["/bower_components/iron-scroll-target-behavior/iron-scroll-target-behavior.html","ad45cbe59acee470fd6fd225082f1a9d"],["/bower_components/iron-selector/iron-multi-selectable.html","46d6620acd7bad986d81097d9ca91692"],["/bower_components/iron-selector/iron-selectable.html","65b04f3f5f1b551d91a82b36f916f6b6"],["/bower_components/iron-selector/iron-selection.html","83545b7d1eae4020594969e6b9790b65"],["/bower_components/iron-selector/iron-selector.html","4d2657550768bec0788eba5190cddc66"],["/bower_components/iron-validatable-behavior/iron-validatable-behavior.html","02bf0434cc1a0d09e18413dea91dcea1"],["/bower_components/neon-animation/animations/fade-in-animation.html","b814c818dbcffe2bb50563e1406497df"],["/bower_components/neon-animation/animations/fade-out-animation.html","44988226230af0e6d92f0988fc8688e2"],["/bower_components/neon-animation/animations/opaque-animation.html","8e2f63bbc648796f3ed96834a5553d07"],["/bower_components/neon-animation/neon-animatable-behavior.html","270f52231303cae4cb8e3fadb5a805c1"],["/bower_components/neon-animation/neon-animation-behavior.html","eb1cdd9cd9d780a811fd25e882ba1f8e"],["/bower_components/neon-animation/neon-animation-runner-behavior.html","782cac67e6cb5661d36fb32d9129ff03"],["/bower_components/neon-animation/web-animations.html","b310811179297697d51eac3659df7776"],["/bower_components/paper-behaviors/paper-inky-focus-behavior.html","51a1c5ccd2aae4c1a0258680dcb3e1ea"],["/bower_components/paper-behaviors/paper-ripple-behavior.html","b6ee8dd59ffb46ca57e81311abd2eca0"],["/bower_components/paper-chip/paper-chip.html","f86db6bc52f54118a7b429b19cb3ae62"],["/bower_components/paper-dropdown-menu/paper-dropdown-menu-icons.html","d309383cfdcf6733d4e6827c3b877c72"],["/bower_components/paper-dropdown-menu/paper-dropdown-menu-shared-styles.html","c18c68e91e13e2102f577c1c55ce7598"],["/bower_components/paper-dropdown-menu/paper-dropdown-menu.html","976f0cb55bd9810af92f7aa9d20456ae"],["/bower_components/paper-icon-button/paper-icon-button.html","2a75de00f858ae1e894ab21344464787"],["/bower_components/paper-input/paper-input-addon-behavior.html","de7b482dc1fb01847efba9016db16206"],["/bower_components/paper-input/paper-input-behavior.html","3960579058d3ba0a74ae7b67b78f53c2"],["/bower_components/paper-input/paper-input-char-counter.html","94c2003f281325951e3bf5b927a326bb"],["/bower_components/paper-input/paper-input-container.html","794d6d48fd81620a935f7702b56c9853"],["/bower_components/paper-input/paper-input-error.html","b90f3a86d797f1bdbbb4d158aeae06ab"],["/bower_components/paper-input/paper-input.html","3385511052db3467ca6ec155faa619ad"],["/bower_components/paper-input/paper-textarea.html","78d76834edef0df80643268c0c3e6d75"],["/bower_components/paper-item/paper-icon-item.html","17d1540072712073af1a84ae9b0ba06a"],["/bower_components/paper-item/paper-item-behavior.html","82636a7562fd8b0be5b15646ee461588"],["/bower_components/paper-item/paper-item-shared-styles.html","31466267014182098267f1b9303f656e"],["/bower_components/paper-item/paper-item.html","e614731572c425b144aa8a9da24ee3ea"],["/bower_components/paper-material/paper-material-shared-styles.html","d0eeeb696e55702f3a38ef1ad0058f59"],["/bower_components/paper-material/paper-material.html","47301784c93c3d9989abfbab68ec9859"],["/bower_components/paper-menu-button/paper-menu-button-animations.html","a6d6ed67a145ca00d4487c40c4b06273"],["/bower_components/paper-menu-button/paper-menu-button.html","2b2f79e8b3b50e4aabd2dd3ada9b6814"],["/bower_components/paper-menu/paper-menu-shared-styles.html","9b2ae6e8b26011a37194ea3b4bdd043d"],["/bower_components/paper-menu/paper-menu.html","5270d7b4b603d9fdfcfdb079c750a3cd"],["/bower_components/paper-progress/paper-progress.html","5dd0b9f89efdfd4f3cce0a13bd67fe6f"],["/bower_components/paper-ripple/paper-ripple.html","e22bc21b61184cb28125d16f9d80fb59"],["/bower_components/paper-spinner/paper-spinner-behavior.html","82e814c4460e8803f6f57cc457658adf"],["/bower_components/paper-spinner/paper-spinner-lite.html","1f3147475d9a3446bc78cdb44103defa"],["/bower_components/paper-spinner/paper-spinner-styles.html","a2122d2c0f3ac98e6911160d8886d31a"],["/bower_components/paper-styles/color.html","430305db311431da78c0a6e1236f9ebe"],["/bower_components/paper-styles/default-theme.html","c910188e898624eb890898418de20ee0"],["/bower_components/paper-styles/paper-styles.html","3fd71f69f3adc823ef9c03611d296cfc"],["/bower_components/paper-styles/shadow.html","fc449492f51292636b499bc5d7b9b036"],["/bower_components/paper-styles/typography.html","bdd7f31bb85f116ce97061c4135b74c9"],["/bower_components/paper-tabs/paper-tab.html","395fdc6be051eb7218b1c77a94eff726"],["/bower_components/paper-tabs/paper-tabs-icons.html","9fb57777c667562392afe684d85ddbe2"],["/bower_components/paper-tabs/paper-tabs.html","4239831dfe30b1103bafb24acb53162b"],["/bower_components/polymer/polymer-micro.html","a56af7465d1962ddad3e552367e75faf"],["/bower_components/polymer/polymer-mini.html","9e9dfb157eae29a59c98343288d4d120"],["/bower_components/polymer/polymer.html","3f035bd142ad63df499ddb2f4a9b8ae1"],["/bower_components/polymerfire/firebase-app-script.html","df1897d11acb9c75522859d372873358"],["/bower_components/polymerfire/firebase-app.html","29b84490aa6ef31291e6919ca64917fc"],["/bower_components/polymerfire/firebase-auth-script.html","12fe480c116018252246dd4366d1a1ef"],["/bower_components/polymerfire/firebase-auth.html","c72fcac5475f05e67fbb5966c2a02dc8"],["/bower_components/polymerfire/firebase-common-behavior.html","e2a7c923222b664c351c93cf37357911"],["/bower_components/polymerfire/firebase-database-behavior.html","62fc27cc6c4ba3f4734ad855970760e8"],["/bower_components/polymerfire/firebase-database-script.html","b280409885282a43d9b5dd1ee5226fed"],["/bower_components/polymerfire/firebase-document.html","9a91f8f225f1a6087c30e6b8138ed5a5"],["/bower_components/polymerfire/firebase-messaging-script.html","33e0a36b60580c0bcbde7440ce9216e7"],["/bower_components/polymerfire/firebase-messaging.html","04eb990217fb738c442ad0b0a422a841"],["/bower_components/polymerfire/firebase-query.html","829b7be3d3e7ab40941b863aa57549a5"],["/bower_components/polymerfire/firebase-storage-script.html","73903c0e578289a5910eaad341a730ca"],["/bower_components/polymerfire/polymerfire.html","e923a83d78a7fb9ca8d1c6e262c8f018"],["/bower_components/promise-polyfill/Promise-Statics.js","a4fbefd3bdb3ab76e6e7f788a902f7ba"],["/bower_components/promise-polyfill/Promise.js","5afb14fd81497aca81bf25929d65b02d"],["/bower_components/promise-polyfill/promise-polyfill-lite.html","06470312beff013fc54695e0bdda2cb3"],["/bower_components/promise-polyfill/promise-polyfill.html","97dd009429dbc654aa105abcd0dfb927"],["/bower_components/web-animations-js/web-animations-next-lite.min.js","04197e2ccec914fa460eef2ac140c853"],["/bower_components/webcomponentsjs/webcomponents-lite.min.js","02395895d5d08242c6ba93518a6da2c5"],["/images/beer_lover.jpg","b4e5dfc0aff5d34eef897d8f6f845647"],["/images/coffee_lover.jpg","d19b3ebde85a8c803b6214ef520565cf"],["/images/ladies_outerwear.jpg","790e95e6d417ab5447a37d5127b15919"],["/images/ladies_tshirts.jpg","4fee73df809e6363d29c53c4616c89cd"],["/images/love_beer.png","d44815f871aa1351811f0d4ac77c4ec2"],["/images/mars.jpg","39e0770fd52f744e5c6a54feba42fa4a"],["/images/mens_outerwear.jpg","034f3d48b53419e0ee8897e1f1fa5770"],["/images/mens_tshirts.jpg","364adbf5dc1b6247ba58c5e3887bb63c"],["/images/saturn.png","5bc883074411cf4a91e52318075e6db4"],["/images/shop-icon-128.png","7c233b5552b74a53b45f7bb8590f1b54"],["/images/shop-icon-192.png","d2e93b8e0722070229467585fd1221f0"],["/images/shop-icon-32.png","db2a62dbf6f348a8d557cf047956872c"],["/images/shop-icon-384.png","0f3500e24fc5ce5f20f3e3d09740a7a7"],["/images/street_gourmet.jpg","f57bc284604c08344afeaff90f856ccb"],["/images/tkyo_yko_chba.jpg","e0d90147d1a49f11a5cc49b865d434dc"],["/images/what_will_you_have.jpg","76248c910197f49b477929c662d857f1"],["/index.html","160d794564a6f886b59816a7327fb575"],["/manifest.json","dec2b8fe14a7f7889aca12b32879576c"],["/src/lazy-resources.html","ee83cc59775c5240ba65439754ee45f9"],["/src/shop-analytics.html","0b728db4187f1257d1308a10d00a4c71"],["/src/shop-app.html","3ba85d8971090c72b636e6226e812d98"],["/src/shop-base.html","5bc59675e8540261ad11bcf44fde2084"],["/src/shop-button.html","2282b570e97b85932b7ed2965f0607ae"],["/src/shop-category-data.html","71d8fc54f4bb1dcac834d788e17a6da0"],["/src/shop-common-styles.html","447a40d6e237df4a6323643126a2d0ae"],["/src/shop-detail.html","7bb1b090c2c3f571c5a532b76504f0e6"],["/src/shop-gold-data.html","4c9bc846daab66b528d571aade19dbd3"],["/src/shop-home.html","c89d5179b44128b8e5b087fbaf3b5cbb"],["/src/shop-icons.html","21801a26a1f9682c96df4c899c3647cf"],["/src/shop-image.html","85207b7ca80754a5b29c2d00283cdf67"],["/src/shop-item-create.html","a8e6d98d6f16baa4f199c4e4eee24ab4"],["/src/shop-list-item-detail.html","1149d8bab7fac370a36c508808a514d0"],["/src/shop-list-item.html","3b388014a63628803cc0b7cb6c21600e"],["/src/shop-list-menu.html","2b6d8a4e740c93e1f8e3cc076984bc12"],["/src/shop-list.html","5b02c5334f77517dff31b5c48a8f022c"],["/src/shop-network-warning.html","aad41c2dfc72afc39d6b14172dcab8ba"],["/src/shop-ripple-container.html","847ba1aaf3cfd73c55c24ed5487f7200"],["/src/shop-select.html","088f3ac1d26713db0d87c4a56603073e"],["/src/shop-shop-create.html","6988956215be685a65885f0a5e1410aa"],["/src/shop-shop-home.html","b4e435c626aa64e7e6777b5babaf00d9"],["/src/shop-shop-menu.html","e49a93b30f09034e4bc207e5e714ceb4"],["/src/shop-snackbar.html","30cbe3579e738f562fc2cab4644a0515"],["/src/shop-tab.html","1853c2369374520d8aab11507c9b1f98"],["/src/shop-tabs-overlay.html","3638ee245d60b88b40380c9aa7734a38"],["/src/shop-tabs.html","9ade92b756463471f86713c4c06356e3"]];
/* eslint-enable quotes, comma-spacing */
var CacheNamePrefix = 'sw-precache-v1--' + (self.registration ? self.registration.scope : '') + '-';


var IgnoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var getCacheBustedUrl = function (url, param) {
    param = param || Date.now();

    var urlWithCacheBusting = new URL(url);
    urlWithCacheBusting.search += (urlWithCacheBusting.search ? '&' : '') +
      'sw-precache=' + param;

    return urlWithCacheBusting.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var populateCurrentCacheNames = function (precacheConfig,
    cacheNamePrefix, baseUrl) {
    var absoluteUrlToCacheName = {};
    var currentCacheNamesToAbsoluteUrl = {};

    precacheConfig.forEach(function(cacheOption) {
      var absoluteUrl = new URL(cacheOption[0], baseUrl).toString();
      var cacheName = cacheNamePrefix + absoluteUrl + '-' + cacheOption[1];
      currentCacheNamesToAbsoluteUrl[cacheName] = absoluteUrl;
      absoluteUrlToCacheName[absoluteUrl] = cacheName;
    });

    return {
      absoluteUrlToCacheName: absoluteUrlToCacheName,
      currentCacheNamesToAbsoluteUrl: currentCacheNamesToAbsoluteUrl
    };
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var mappings = populateCurrentCacheNames(PrecacheConfig, CacheNamePrefix, self.location);
var AbsoluteUrlToCacheName = mappings.absoluteUrlToCacheName;
var CurrentCacheNamesToAbsoluteUrl = mappings.currentCacheNamesToAbsoluteUrl;

function deleteAllCaches() {
  return caches.keys().then(function(cacheNames) {
    return Promise.all(
      cacheNames.map(function(cacheName) {
        return caches.delete(cacheName);
      })
    );
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    // Take a look at each of the cache names we expect for this version.
    Promise.all(Object.keys(CurrentCacheNamesToAbsoluteUrl).map(function(cacheName) {
      return caches.open(cacheName).then(function(cache) {
        // Get a list of all the entries in the specific named cache.
        // For caches that are already populated for a given version of a
        // resource, there should be 1 entry.
        return cache.keys().then(function(keys) {
          // If there are 0 entries, either because this is a brand new version
          // of a resource or because the install step was interrupted the
          // last time it ran, then we need to populate the cache.
          if (keys.length === 0) {
            // Use the last bit of the cache name, which contains the hash,
            // as the cache-busting parameter.
            // See https://github.com/GoogleChrome/sw-precache/issues/100
            var cacheBustParam = cacheName.split('-').pop();
            var urlWithCacheBusting = getCacheBustedUrl(
              CurrentCacheNamesToAbsoluteUrl[cacheName], cacheBustParam);

            var request = new Request(urlWithCacheBusting,
              {credentials: 'same-origin'});
            return fetch(request).then(function(response) {
              if (response.ok) {
                return cache.put(CurrentCacheNamesToAbsoluteUrl[cacheName],
                  response);
              }

              console.error('Request for %s returned a response status %d, ' +
                'so not attempting to cache it.',
                urlWithCacheBusting, response.status);
              // Get rid of the empty cache if we can't add a successful response to it.
              return caches.delete(cacheName);
            });
          }
        });
      });
    })).then(function() {
      return caches.keys().then(function(allCacheNames) {
        return Promise.all(allCacheNames.filter(function(cacheName) {
          return cacheName.indexOf(CacheNamePrefix) === 0 &&
            !(cacheName in CurrentCacheNamesToAbsoluteUrl);
          }).map(function(cacheName) {
            return caches.delete(cacheName);
          })
        );
      });
    }).then(function() {
      if (typeof self.skipWaiting === 'function') {
        // Force the SW to transition from installing -> active state
        self.skipWaiting();
      }
    })
  );
});

if (self.clients && (typeof self.clients.claim === 'function')) {
  self.addEventListener('activate', function(event) {
    event.waitUntil(self.clients.claim());
  });
}

self.addEventListener('message', function(event) {
  if (event.data.command === 'delete_all') {
    console.log('About to delete all caches...');
    deleteAllCaches().then(function() {
      console.log('Caches deleted.');
      event.ports[0].postMessage({
        error: null
      });
    }).catch(function(error) {
      console.log('Caches not deleted:', error);
      event.ports[0].postMessage({
        error: error
      });
    });
  }
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    var urlWithoutIgnoredParameters = stripIgnoredUrlParameters(event.request.url,
      IgnoreUrlParametersMatching);

    var cacheName = AbsoluteUrlToCacheName[urlWithoutIgnoredParameters];
    var directoryIndex = 'index.html';
    if (!cacheName && directoryIndex) {
      urlWithoutIgnoredParameters = addDirectoryIndex(urlWithoutIgnoredParameters, directoryIndex);
      cacheName = AbsoluteUrlToCacheName[urlWithoutIgnoredParameters];
    }

    var navigateFallback = '/index.html';
    // Ideally, this would check for event.request.mode === 'navigate', but that is not widely
    // supported yet:
    // https://code.google.com/p/chromium/issues/detail?id=540967
    // https://bugzilla.mozilla.org/show_bug.cgi?id=1209081
    if (!cacheName && navigateFallback && event.request.headers.has('accept') &&
        event.request.headers.get('accept').includes('text/html') &&
        /* eslint-disable quotes, comma-spacing */
        isPathWhitelisted(["^(?!\\/__)"], event.request.url)) {
        /* eslint-enable quotes, comma-spacing */
      var navigateFallbackUrl = new URL(navigateFallback, self.location);
      cacheName = AbsoluteUrlToCacheName[navigateFallbackUrl.toString()];
    }

    if (cacheName) {
      event.respondWith(
        // Rely on the fact that each cache we manage should only have one entry, and return that.
        caches.open(cacheName).then(function(cache) {
          return cache.keys().then(function(keys) {
            return cache.match(keys[0]).then(function(response) {
              if (response) {
                return response;
              }
              // If for some reason the response was deleted from the cache,
              // raise and exception and fall back to the fetch() triggered in the catch().
              throw Error('The cache ' + cacheName + ' is empty.');
            });
          });
        }).catch(function(e) {
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});


// Runtime cache configuration, using the sw-toolbox library.

toolbox.router.get(/\/data\/images\/.*/, toolbox.cacheFirst, {"cache":{"maxEntries":200,"name":"items-cache"}});
toolbox.router.get(/\/data\/.*json/, toolbox.fastest, {"cache":{"maxEntries":100,"name":"data-cache"}});



