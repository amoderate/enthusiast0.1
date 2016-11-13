!function(){var e=function(e,t){function n(){}n.prototype=t.prototype,e.prototype=new n;for(var r in t)if(Object.defineProperties){var o=Object.getOwnPropertyDescriptor(t,r);o&&Object.defineProperty(e,r,o)}else e[r]=t[r]},t=this,n=function(e){var t=typeof e;if("object"==t){if(!e)return"null";if(e instanceof Array)return"array";if(e instanceof Object)return t;var n=Object.prototype.toString.call(e);if("[object Window]"==n)return"object";if("[object Array]"==n||"number"==typeof e.length&&"undefined"!=typeof e.splice&&"undefined"!=typeof e.propertyIsEnumerable&&!e.propertyIsEnumerable("splice"))return"array";if("[object Function]"==n||"undefined"!=typeof e.call&&"undefined"!=typeof e.propertyIsEnumerable&&!e.propertyIsEnumerable("call"))return"function"}else if("function"==t&&"undefined"==typeof e.call)return"object";return t},r=function(e,t){function n(){}n.prototype=t.prototype,e.ga=t.prototype,e.prototype=new n,e.ca=function(e,n,r){for(var o=Array(arguments.length-2),i=2;i<arguments.length;i++)o[i-2]=arguments[i];return t.prototype[n].apply(e,o)}},o={c:"only-available-in-window",o:"only-available-in-sw",O:"should-be-overriden",g:"bad-sender-id",C:"incorrect-gcm-sender-id",M:"permission-default",L:"permission-blocked",U:"unsupported-browser",G:"notifications-blocked",w:"failed-serviceworker-registration",h:"sw-registration-expected",B:"get-subscription-failed",F:"invalid-saved-token",l:"sw-reg-redundant",P:"token-subscribe-failed",S:"token-subscribe-no-token",R:"token-subscribe-no-push-set",V:"use-sw-before-get-token",D:"invalid-delete-token",v:"delete-token-not-found",s:"bg-handler-function-expected",K:"no-window-client-to-msg",T:"unable-to-resubscribe",I:"no-fcm-token-for-resubscribe",A:"failed-to-delete-token",J:"no-sw-in-reg"},i={},s=(i[o.c]="This method is available in a Window context.",i[o.o]="This method is available in a service worker context.",i[o.O]="This method should be overriden by extended classes.",i[o.g]="Please ensure that 'messagingSenderId' is set correctly in the options passed into firebase.initializeApp().",i[o.M]="The required permissions were not granted and dismissed instead.",i[o.L]="The required permissions were not granted and blocked instead.",i[o.U]="This browser doesn't support the API's required to use the firebase SDK.",i[o.G]="Notifications have been blocked.",i[o.w]="We are unable to register the default service worker. {$browserErrorMessage}",i[o.h]="A service worker registration was the expected input.",i[o.B]="There was an error when trying to get any existing Push Subscriptions.",i[o.F]="Unable to access details of the saved token.",i[o.l]="The service worker being used for push was made redundant.",i[o.P]="A problem occured while subscribing the user to FCM: {$message}",i[o.S]="FCM returned no token when subscribing the user to push.",i[o.R]="FCM returned an invalid response when getting an FCM token.",i[o.V]="You must call useServiceWorker() before calling getToken() to ensure your service worker is used.",i[o.D]="You must pass a valid token into deleteToken(), i.e. the token from getToken().",i[o.v]="The deletion attempt for token could not be performed as the token was not found.",i[o.s]="The input to setBackgroundMessageHandler() must be a function.",i[o.K]="An attempt was made to message a non-existant window client.",i[o.T]="There was an error while re-subscribing the FCM token for push messaging. Will have to resubscribe the user on next visit. {$message}",i[o.I]="Could not find an FCM token and as a result, unable to resubscribe. Will have to resubscribe the user on next visit.",i[o.A]="Unable to delete the currently saved token.",i[o.J]="Even though the service worker registration was successful, there was a problem accessing the service worker itself.",i[o.C]="Please change your web app manifest's 'gcm_sender_id' value to '103953800507' to use Firebase messaging.",i),a={userVisibleOnly:!0,applicationServerKey:new Uint8Array([4,51,148,247,223,161,235,177,220,3,162,94,21,113,219,72,211,46,237,237,178,52,219,183,71,58,12,143,196,204,225,111,60,140,132,223,171,182,102,62,242,12,212,139,254,227,249,118,47,20,28,99,8,106,111,45,177,26,149,176,206,55,192,156,110])},c={m:"firebase-messaging-msg-type",u:"firebase-messaging-msg-data"},u={N:"push-msg-received",H:"notification-clicked"},f=function(e,t){var n={};return n[c.m]=e,n[c.u]=t,n},p=function(e){if(Error.captureStackTrace)Error.captureStackTrace(this,p);else{var t=Error().stack;t&&(this.stack=t)}e&&(this.message=String(e))};r(p,Error);var h=function(e,t){for(var n=e.split("%s"),r="",o=Array.prototype.slice.call(arguments,1);o.length&&1<n.length;)r+=n.shift()+o.shift();return r+n.join("%s")},l=function(e,t){t.unshift(e),p.call(this,h.apply(null,t)),t.shift()};r(l,p);var d=function(e,t,n){if(!e){var r="Assertion failed";if(t)var r=r+(": "+t),o=Array.prototype.slice.call(arguments,2);throw new l(""+r,o||[])}},g=null,b=function(e){e=new Uint8Array(e);var t=n(e);if(d("array"==t||"object"==t&&"number"==typeof e.length,"encodeByteArray takes an array as a parameter"),!g)for(g={},t=0;65>t;t++)g[t]="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(t);for(var t=g,r=[],o=0;o<e.length;o+=3){var i=e[o],s=o+1<e.length,a=s?e[o+1]:0,c=o+2<e.length,u=c?e[o+2]:0,f=i>>2,i=(3&i)<<4|a>>4,a=(15&a)<<2|u>>6,u=63&u;c||(u=64,s||(a=64)),r.push(t[f],t[i],t[a],t[u])}return r.join("").replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")},v=new firebase.INTERNAL.ErrorFactory("messaging","Messaging",s),y=function(){this.a=null},m=function(e){return e.a?e.a:(e.a=new Promise(function(e,n){var r=t.indexedDB.open("fcm_token_details_db",1);r.onerror=function(e){n(e.target.error)},r.onsuccess=function(t){e(t.target.result)},r.onupgradeneeded=function(e){e=e.target.result.createObjectStore("fcm_token_object_Store",{keyPath:"swScope"}),e.createIndex("fcmSenderId","fcmSenderId",{unique:!1}),e.createIndex("fcmToken","fcmToken",{unique:!0})}}),e.a)},w=function(e){e.a?e.a.then(function(t){t.close(),e.a=null}):Promise.resolve()},k=function(e,t){return m(e).then(function(e){return new Promise(function(n,r){var o=e.transaction(["fcm_token_object_Store"]).objectStore("fcm_token_object_Store").index("fcmToken").get(t);o.onerror=function(e){r(e.target.error)},o.onsuccess=function(e){n(e.target.result)}})})},S=function(e,t){return m(e).then(function(e){return new Promise(function(n,r){var o=[],i=e.transaction(["fcm_token_object_Store"]).objectStore("fcm_token_object_Store").openCursor();i.onerror=function(e){r(e.target.error)},i.onsuccess=function(e){(e=e.target.result)?(e.value.fcmSenderId===t&&o.push(e.value),e.continue()):n(o)}})})},T=function(e,t,n){var r=b(t.getKey("p256dh")),i=b(t.getKey("auth"));return e="authorized_entity="+e+"&"+("endpoint="+t.endpoint+"&")+("encryption_key="+r+"&")+("encryption_auth="+i),n&&(e+="&pushSet="+n),n=new Headers,n.append("Content-Type","application/x-www-form-urlencoded"),fetch("https://fcm.googleapis.com/fcm/connect/subscribe",{method:"POST",headers:n,body:e}).then(function(e){return e.json()}).then(function(e){if(e.error)throw v.create(o.P,{message:e.error.message});if(!e.token)throw v.create(o.S);if(!e.pushSet)throw v.create(o.R);return{token:e.token,pushSet:e.pushSet}})},j=function(e,t,n,r,o,i){var s={swScope:n.scope,endpoint:r.endpoint,auth:b(r.getKey("auth")),p256dh:b(r.getKey("p256dh")),fcmToken:o,fcmPushSet:i,fcmSenderId:t};return m(e).then(function(e){return new Promise(function(t,n){var r=e.transaction(["fcm_token_object_Store"],"readwrite").objectStore("fcm_token_object_Store").put(s);r.onerror=function(e){n(e.target.error)},r.onsuccess=function(){t()}})})};y.prototype.X=function(e,t){return t instanceof ServiceWorkerRegistration?"string"!=typeof e||0===e.length?Promise.reject(v.create(o.g)):S(this,e).then(function(n){if(0!==n.length){var r=n.findIndex(function(n){return t.scope===n.swScope&&e===n.fcmSenderId});if(-1!==r)return n[r]}}).then(function(e){if(e)return t.pushManager.getSubscription().catch(function(){throw v.create(o.B)}).then(function(t){var n;if((n=t)&&(n=t.endpoint===e.endpoint&&b(t.getKey("auth"))===e.auth&&b(t.getKey("p256dh"))===e.p256dh),n)return e.fcmToken})}):Promise.reject(v.create(o.h))},y.prototype.getSavedToken=y.prototype.X,y.prototype.W=function(e,t){var n=this;return"string"!=typeof e||0===e.length?Promise.reject(v.create(o.g)):t instanceof ServiceWorkerRegistration?t.pushManager.getSubscription().then(function(e){return e?e:t.pushManager.subscribe(a)}).then(function(r){return T(e,r).then(function(o){return j(n,e,t,r,o.token,o.pushSet).then(function(){return o.token})})}):Promise.reject(v.create(o.h))},y.prototype.createToken=y.prototype.W,y.prototype.deleteToken=function(e){var t=this;return"string"!=typeof e||0===e.length?Promise.reject(v.create(o.D)):k(this,e).then(function(e){if(!e)throw v.create(o.v);return m(t).then(function(t){return new Promise(function(n,r){var i=t.transaction(["fcm_token_object_Store"],"readwrite").objectStore("fcm_token_object_Store").delete(e.swScope);i.onerror=function(e){r(e.target.error)},i.onsuccess=function(t){0===t.target.result?r(v.create(o.A)):n(e)}})})})};var P=function(e){var t=this;if(this.a=new firebase.INTERNAL.ErrorFactory("messaging","Messaging",s),!e.options.messagingSenderId||"string"!=typeof e.options.messagingSenderId)throw this.a.create(o.g);this.Z=e.options.messagingSenderId,this.f=new y,this.app=e,this.INTERNAL={},this.INTERNAL.delete=function(){return t.delete}};P.prototype.getToken=function(){var e=this,t=Notification.permission;return"granted"!==t?"denied"===t?Promise.reject(this.a.create(o.G)):Promise.resolve(null):this.i().then(function(t){return e.f.X(e.Z,t).then(function(n){return n?n:e.f.W(e.Z,t)})})},P.prototype.getToken=P.prototype.getToken,P.prototype.deleteToken=function(e){var t=this;return this.f.deleteToken(e).then(function(){return t.i()}).then(function(e){return e?e.pushManager.getSubscription():null}).then(function(e){if(e)return e.unsubscribe()})},P.prototype.deleteToken=P.prototype.deleteToken,P.prototype.i=function(){throw this.a.create(o.O)},P.prototype.requestPermission=function(){throw this.a.create(o.c)},P.prototype.useServiceWorker=function(){throw this.a.create(o.c)},P.prototype.useServiceWorker=P.prototype.useServiceWorker,P.prototype.onMessage=function(){throw this.a.create(o.c)},P.prototype.onMessage=P.prototype.onMessage,P.prototype.onTokenRefresh=function(){throw this.a.create(o.c)},P.prototype.onTokenRefresh=P.prototype.onTokenRefresh,P.prototype.setBackgroundMessageHandler=function(){throw this.a.create(o.o)},P.prototype.setBackgroundMessageHandler=P.prototype.setBackgroundMessageHandler,P.prototype.delete=function(){w(this.f)};var _=self,M=function(e){var t=this;P.call(this,e),this.a=new firebase.INTERNAL.ErrorFactory("messaging","Messaging",s),_.addEventListener("push",function(e){return A(t,e)},!1),_.addEventListener("pushsubscriptionchange",function(e){return E(t,e)},!1),_.addEventListener("notificationclick",function(e){return I(t,e)},!1),this.b=null};e(M,P);var A=function(e,t){var n;try{n=t.data.json()}catch(e){return}var r=W().then(function(t){if(t){if(n.notification||e.b)return L(e,n)}else{if((t=n)&&"object"==typeof t.notification){var r=Object.assign({},t.notification),o={};r.data=(o.FCM_MSG=t,o),t=r}else t=void 0;if(t)return _.registration.showNotification(t.title||"",t);if(e.b)return e.b(n)}});t.waitUntil(r)},E=function(e,t){var n=e.getToken().then(function(t){if(!t)throw e.a.create(o.I);var n=e.f;return k(n,t).then(function(t){if(!t)throw e.a.create(o.F);return _.registration.pushManager.subscribe(a).then(function(e){return T(t.ea,e,t.da)}).catch(function(r){return n.deleteToken(t.fa).then(function(){throw e.a.create(o.T,{message:r})})})})});t.waitUntil(n)},I=function(e,t){if(t.notification&&t.notification.data&&t.notification.data.FCM_MSG){t.stopImmediatePropagation(),t.notification.close();var n=t.notification.data.FCM_MSG,r=n.notification.click_action;if(r){var o=N(r).then(function(e){return e?e:_.clients.openWindow(r)}).then(function(t){if(t)return delete n.notification,R(e,t,f(u.H,n))});t.waitUntil(o)}}};M.prototype.setBackgroundMessageHandler=function(e){if(e&&"function"!=typeof e)throw this.a.create(o.s);this.b=e},M.prototype.setBackgroundMessageHandler=M.prototype.setBackgroundMessageHandler;var N=function(e){var t=new URL(e).href;return _.clients.matchAll({type:"window",includeUncontrolled:!0}).then(function(e){for(var n=null,r=0;r<e.length;r++)if(new URL(e[r].url).href===t){n=e[r];break}if(n)return n.focus(),n})},R=function(e,t,n){return new Promise(function(r,i){return t?(t.postMessage(n),void r()):i(e.a.create(o.K))})},W=function(){return _.clients.matchAll({type:"window",includeUncontrolled:!0}).then(function(e){return e.some(function(e){return"visible"===e.visibilityState})})},L=function(e,t){return _.clients.matchAll({type:"window",includeUncontrolled:!0}).then(function(n){var r=f(u.N,t);return Promise.all(n.map(function(t){return R(e,t,r)}))})};M.prototype.i=function(){return Promise.resolve(_.registration)};var F=function(e){var t=this;P.call(this,e),this.Y=null,this.$=firebase.INTERNAL.createSubscribe(function(e){t.Y=e}),this.ba=null,this.aa=firebase.INTERNAL.createSubscribe(function(e){t.ba=e}),O(this)};e(F,P),F.prototype.getToken=function(){var e=this;return"serviceWorker"in navigator&&"PushManager"in window&&"Notification"in window&&ServiceWorkerRegistration.prototype.hasOwnProperty("showNotification")&&PushSubscription.prototype.hasOwnProperty("getKey")?x(this).then(function(){return P.prototype.getToken.call(e)}):Promise.reject(this.a.create(o.U))},F.prototype.getToken=F.prototype.getToken;var x=function(e){if(e.j)return e.j;var t=document.querySelector('link[rel="manifest"]');return t?e.j=fetch(t.href).then(function(e){return e.json()}).catch(function(){return Promise.resolve()}).then(function(t){if(t&&t.gcm_sender_id&&"103953800507"!==t.gcm_sender_id)throw e.a.create(o.C)}):e.j=Promise.resolve(),e.j};F.prototype.requestPermission=function(){var e=this;return"granted"===Notification.permission?Promise.resolve():new Promise(function(t,n){var r=function(r){return"granted"===r?t():n("denied"===r?e.a.create(o.L):e.a.create(o.M))},i=Notification.requestPermission(function(e){i||r(e)});i&&i.then(r)})},F.prototype.requestPermission=F.prototype.requestPermission,F.prototype.useServiceWorker=function(e){if(!(e instanceof ServiceWorkerRegistration))throw this.a.create(o.h);if("undefined"!=typeof this.b)throw this.a.create(o.V);this.b=e},F.prototype.useServiceWorker=F.prototype.useServiceWorker,F.prototype.onMessage=function(e,t,n){return this.$(e,t,n)},F.prototype.onMessage=F.prototype.onMessage,F.prototype.onTokenRefresh=function(e,t,n){return this.aa(e,t,n)},F.prototype.onTokenRefresh=F.prototype.onTokenRefresh;var C=function(e,t){var n=t.installing||t.waiting||t.active;return new Promise(function(r,i){if(n)if("activated"===n.state)r(t);else if("redundant"===n.state)i(e.a.create(o.l));else{var s=function(){if("activated"===n.state)r(t);else{if("redundant"!==n.state)return;i(e.a.create(o.l))}n.removeEventListener("statechange",s)};n.addEventListener("statechange",s)}else i(e.a.create(o.J))})};F.prototype.i=function(){var e=this;return this.b?C(this,this.b):(this.b=null,navigator.serviceWorker.register("/firebase-messaging-sw.js",{scope:"/firebase-cloud-messaging-push-scope"}).catch(function(t){throw e.a.create(o.w,{browserErrorMessage:t.message})}).then(function(t){return C(e,t).then(function(){return e.b=t,t.update(),t})}))};var O=function(e){"serviceWorker"in navigator&&navigator.serviceWorker.addEventListener("message",function(t){if(t.data&&t.data[c.m])switch(t=t.data,t[c.m]){case u.N:case u.H:e.Y.next(t[c.u])}},!1)};if(!(firebase&&firebase.INTERNAL&&firebase.INTERNAL.registerService))throw Error("Cannot install Firebase Messaging - be sure to load firebase-app.js first.");firebase.INTERNAL.registerService("messaging",function(e){return self&&"ServiceWorkerGlobalScope"in self?new M(e):new F(e)},{Messaging:F})}();