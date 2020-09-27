!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e="undefined"!=typeof globalThis?globalThis:e||self).typedObject=t()}(this,(function(){"use strict";function e(t){return(e=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(t)}function t(e,n){return(t=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,n)}function n(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}function r(e,o,i){return(r=n()?Reflect.construct:function(e,n,r){var o=[null];o.push.apply(o,n);var i=new(Function.bind.apply(e,o));return r&&t(i,r.prototype),i}).apply(null,arguments)}function o(n){var i="function"==typeof Map?new Map:void 0;return(o=function(n){if(null===n||(o=n,-1===Function.toString.call(o).indexOf("[native code]")))return n;var o;if("function"!=typeof n)throw new TypeError("Super expression must either be null or a function");if(void 0!==i){if(i.has(n))return i.get(n);i.set(n,c)}function c(){return r(n,arguments,e(this).constructor)}return c.prototype=Object.create(n.prototype,{constructor:{value:c,enumerable:!1,writable:!0,configurable:!0}}),t(c,n)})(n)}function i(e,t){return!t||"object"!=typeof t&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}var c=function(r){!function(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(n&&n.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),n&&t(e,n)}(a,r);var o,c,u=(o=a,c=n(),function(){var t,n=e(o);if(c){var r=e(this).constructor;t=Reflect.construct(n,arguments,r)}else t=n.apply(this,arguments);return i(this,t)});function a(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a);var t="[TypeValidationError] ".concat(e);return u.call(this,t)}return a}(o(Error)),u=["string","number","boolean"];function a(e){return e.replace(/(\W|\d)/g,"")}function f(e){return Object.prototype.toString.call(e).slice(8,-1).trim().toLowerCase()}function l(e){var t=a(e);if(!u.includes(t))throw new c('"'.concat(e,'" is not a valid type definition'))}function s(e,t,n){var r=f(t);if(("undefined"!==r||!n)&&a(e.type)!==r)throw new TypeError('Type "'.concat(r,'" is not assignable to type "').concat(e.type,'"'))}var p=function(e){return"$$$".concat(e)};function y(e,t,n){var r=t.includes("[]");return r?r?function(e,t,n){var r=p(t),o="?"===n[0];Object.defineProperty(e,t,{get:function(){return this[r].value},set:function(e){if(o&&void 0===e)this[r].value=void 0;else{var t=this[r],n=t.type,i=t.cleanType;(0,t.$$setChecker)(e,f(e),i,n),this[r].value=new Proxy(e,{set:function(e,t,n){return this[r].$$checker(n),e[t]=n,!0}})}},enumerable:!0})}(e,n,t):void 0:function(e,t,n){var r=p(t),o="?"===n[0];Object.defineProperty(e,t,{get:function(){return this[r].value},set:function(e){s(this[r],e,o),this[r].value=e},enumerable:!0})}(e,n,t)}function v(e,t,n,r){var o=t.includes("[]");return o?o?function(e,t,n,r){var o="?"===t[0],i=a(t),c=f(n),u=o&&void 0===n,l=function(e,t,n,r){if(!Array.isArray(e))throw new TypeError('Type "'.concat(t,'" is not assignable to type "').concat(r,'"'));e.forEach((function(e){var t=f(e);if(t!==n)throw new TypeError('Value "'.concat(e,'" (').concat(t,") cannot be placed in array of ").concat(n))}))};u||l(n,c,i,t);var s={type:t,cleanType:i,$$setChecker:l,value:u?void 0:new Proxy(n,{type:t,cleanType:i,$$checker:function(e){var t=f(e);if(t!==this.cleanType)throw new TypeError('Value "'.concat(e,'" (').concat(t,") cannot be placed in array of ").concat(this.cleanType))},set:function(e,t,n){return this.$$checker(n),e[t]=n,!0}})};Object.defineProperty(e,r,{writable:!1,configurable:!1,value:s})}(e,t,n,r):void 0:function(e,t,n,r){var o={type:t,value:n};s(o,n,"?"===t[0]),Object.defineProperty(e,r,{writable:!1,configurable:!1,value:o})}(e,t,n,r)}return{createInterface:function(e,t){var n={name:t,fields:{}};for(var r in e)if(e.hasOwnProperty(r)){var o=e[r];l(o),Object.defineProperty(n.fields,r,{writable:!1,configurable:!1,enumerable:!0,value:o})}return Object.freeze(n)},createWithInterface:function(e,t){var n={};if(!e.fields)throw new ReferenceError('ObjectInterface missing "fields" property. You should define your interface via createInterface function.');for(var r in e.fields){var o;if(e.fields[r]){var i=e.fields[r],c=p(r);v(n,i,null!==(o=null==t?void 0:t[r])&&void 0!==o?o:void 0,c),y(n,i,r)}}return function(e,t){Object.defineProperties(e,{getType:{writable:!1,configurable:!1,enumerable:!1,value:function(t){var n=p(t);return e[n].type}},interface:{get:function(){return t.name}}})}(n,e),Object.preventExtensions(n),Object.seal(n),n}}}));
