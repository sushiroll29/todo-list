(()=>{"use strict";function t(t,e){try{localStorage.setItem(`${t}`,JSON.stringify(e))}catch(t){console.warn("Could not save to local storage.")}}function e(t){return JSON.parse(localStorage.getItem(`${t}`))}function n(t){return n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},n(t)}function r(t,e){if(e.length<t)throw new TypeError(t+" argument"+(t>1?"s":"")+" required, but only "+e.length+" present")}function a(t){r(1,arguments);var e=Object.prototype.toString.call(t);return t instanceof Date||"object"===n(t)&&"[object Date]"===e?new Date(t.getTime()):"number"==typeof t||"[object Number]"===e?new Date(t):("string"!=typeof t&&"[object String]"!==e||"undefined"==typeof console||(console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#string-arguments"),console.warn((new Error).stack)),new Date(NaN))}function o(t){if(null===t||!0===t||!1===t)return NaN;var e=Number(t);return isNaN(e)?e:e<0?Math.ceil(e):Math.floor(e)}function i(t){r(1,arguments);var e=a(t),n=e.getUTCDay(),o=(n<1?7:0)+n-1;return e.setUTCDate(e.getUTCDate()-o),e.setUTCHours(0,0,0,0),e}function u(t){r(1,arguments);var e=a(t),n=e.getUTCFullYear(),o=new Date(0);o.setUTCFullYear(n+1,0,4),o.setUTCHours(0,0,0,0);var u=i(o),s=new Date(0);s.setUTCFullYear(n,0,4),s.setUTCHours(0,0,0,0);var c=i(s);return e.getTime()>=u.getTime()?n+1:e.getTime()>=c.getTime()?n:n-1}var s={};function c(){return s}function d(t,e){var n,i,u,s,d,l,m,f;r(1,arguments);var h=c(),g=o(null!==(n=null!==(i=null!==(u=null!==(s=null==e?void 0:e.weekStartsOn)&&void 0!==s?s:null==e||null===(d=e.locale)||void 0===d||null===(l=d.options)||void 0===l?void 0:l.weekStartsOn)&&void 0!==u?u:h.weekStartsOn)&&void 0!==i?i:null===(m=h.locale)||void 0===m||null===(f=m.options)||void 0===f?void 0:f.weekStartsOn)&&void 0!==n?n:0);if(!(g>=0&&g<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");var v=a(t),w=v.getUTCDay(),y=(w<g?7:0)+w-g;return v.setUTCDate(v.getUTCDate()-y),v.setUTCHours(0,0,0,0),v}function l(t,e){var n,i,u,s,l,m,f,h;r(1,arguments);var g=a(t),v=g.getUTCFullYear(),w=c(),y=o(null!==(n=null!==(i=null!==(u=null!==(s=null==e?void 0:e.firstWeekContainsDate)&&void 0!==s?s:null==e||null===(l=e.locale)||void 0===l||null===(m=l.options)||void 0===m?void 0:m.firstWeekContainsDate)&&void 0!==u?u:w.firstWeekContainsDate)&&void 0!==i?i:null===(f=w.locale)||void 0===f||null===(h=f.options)||void 0===h?void 0:h.firstWeekContainsDate)&&void 0!==n?n:1);if(!(y>=1&&y<=7))throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");var b=new Date(0);b.setUTCFullYear(v+1,0,y),b.setUTCHours(0,0,0,0);var p=d(b,e),k=new Date(0);k.setUTCFullYear(v,0,y),k.setUTCHours(0,0,0,0);var T=d(k,e);return g.getTime()>=p.getTime()?v+1:g.getTime()>=T.getTime()?v:v-1}function m(t,e){for(var n=t<0?"-":"",r=Math.abs(t).toString();r.length<e;)r="0"+r;return n+r}const f=function(t,e){var n=t.getUTCFullYear(),r=n>0?n:1-n;return m("yy"===e?r%100:r,e.length)},h=function(t,e){var n=t.getUTCMonth();return"M"===e?String(n+1):m(n+1,2)},g=function(t,e){return m(t.getUTCDate(),e.length)},v=function(t,e){return m(t.getUTCHours()%12||12,e.length)},w=function(t,e){return m(t.getUTCHours(),e.length)},y=function(t,e){return m(t.getUTCMinutes(),e.length)},b=function(t,e){return m(t.getUTCSeconds(),e.length)},p=function(t,e){var n=e.length,r=t.getUTCMilliseconds();return m(Math.floor(r*Math.pow(10,n-3)),e.length)};var k={G:function(t,e,n){var r=t.getUTCFullYear()>0?1:0;switch(e){case"G":case"GG":case"GGG":return n.era(r,{width:"abbreviated"});case"GGGGG":return n.era(r,{width:"narrow"});default:return n.era(r,{width:"wide"})}},y:function(t,e,n){if("yo"===e){var r=t.getUTCFullYear(),a=r>0?r:1-r;return n.ordinalNumber(a,{unit:"year"})}return f(t,e)},Y:function(t,e,n,r){var a=l(t,r),o=a>0?a:1-a;return"YY"===e?m(o%100,2):"Yo"===e?n.ordinalNumber(o,{unit:"year"}):m(o,e.length)},R:function(t,e){return m(u(t),e.length)},u:function(t,e){return m(t.getUTCFullYear(),e.length)},Q:function(t,e,n){var r=Math.ceil((t.getUTCMonth()+1)/3);switch(e){case"Q":return String(r);case"QQ":return m(r,2);case"Qo":return n.ordinalNumber(r,{unit:"quarter"});case"QQQ":return n.quarter(r,{width:"abbreviated",context:"formatting"});case"QQQQQ":return n.quarter(r,{width:"narrow",context:"formatting"});default:return n.quarter(r,{width:"wide",context:"formatting"})}},q:function(t,e,n){var r=Math.ceil((t.getUTCMonth()+1)/3);switch(e){case"q":return String(r);case"qq":return m(r,2);case"qo":return n.ordinalNumber(r,{unit:"quarter"});case"qqq":return n.quarter(r,{width:"abbreviated",context:"standalone"});case"qqqqq":return n.quarter(r,{width:"narrow",context:"standalone"});default:return n.quarter(r,{width:"wide",context:"standalone"})}},M:function(t,e,n){var r=t.getUTCMonth();switch(e){case"M":case"MM":return h(t,e);case"Mo":return n.ordinalNumber(r+1,{unit:"month"});case"MMM":return n.month(r,{width:"abbreviated",context:"formatting"});case"MMMMM":return n.month(r,{width:"narrow",context:"formatting"});default:return n.month(r,{width:"wide",context:"formatting"})}},L:function(t,e,n){var r=t.getUTCMonth();switch(e){case"L":return String(r+1);case"LL":return m(r+1,2);case"Lo":return n.ordinalNumber(r+1,{unit:"month"});case"LLL":return n.month(r,{width:"abbreviated",context:"standalone"});case"LLLLL":return n.month(r,{width:"narrow",context:"standalone"});default:return n.month(r,{width:"wide",context:"standalone"})}},w:function(t,e,n,i){var u=function(t,e){r(1,arguments);var n=a(t),i=d(n,e).getTime()-function(t,e){var n,a,i,u,s,m,f,h;r(1,arguments);var g=c(),v=o(null!==(n=null!==(a=null!==(i=null!==(u=null==e?void 0:e.firstWeekContainsDate)&&void 0!==u?u:null==e||null===(s=e.locale)||void 0===s||null===(m=s.options)||void 0===m?void 0:m.firstWeekContainsDate)&&void 0!==i?i:g.firstWeekContainsDate)&&void 0!==a?a:null===(f=g.locale)||void 0===f||null===(h=f.options)||void 0===h?void 0:h.firstWeekContainsDate)&&void 0!==n?n:1),w=l(t,e),y=new Date(0);return y.setUTCFullYear(w,0,v),y.setUTCHours(0,0,0,0),d(y,e)}(n,e).getTime();return Math.round(i/6048e5)+1}(t,i);return"wo"===e?n.ordinalNumber(u,{unit:"week"}):m(u,e.length)},I:function(t,e,n){var o=function(t){r(1,arguments);var e=a(t),n=i(e).getTime()-function(t){r(1,arguments);var e=u(t),n=new Date(0);return n.setUTCFullYear(e,0,4),n.setUTCHours(0,0,0,0),i(n)}(e).getTime();return Math.round(n/6048e5)+1}(t);return"Io"===e?n.ordinalNumber(o,{unit:"week"}):m(o,e.length)},d:function(t,e,n){return"do"===e?n.ordinalNumber(t.getUTCDate(),{unit:"date"}):g(t,e)},D:function(t,e,n){var o=function(t){r(1,arguments);var e=a(t),n=e.getTime();e.setUTCMonth(0,1),e.setUTCHours(0,0,0,0);var o=n-e.getTime();return Math.floor(o/864e5)+1}(t);return"Do"===e?n.ordinalNumber(o,{unit:"dayOfYear"}):m(o,e.length)},E:function(t,e,n){var r=t.getUTCDay();switch(e){case"E":case"EE":case"EEE":return n.day(r,{width:"abbreviated",context:"formatting"});case"EEEEE":return n.day(r,{width:"narrow",context:"formatting"});case"EEEEEE":return n.day(r,{width:"short",context:"formatting"});default:return n.day(r,{width:"wide",context:"formatting"})}},e:function(t,e,n,r){var a=t.getUTCDay(),o=(a-r.weekStartsOn+8)%7||7;switch(e){case"e":return String(o);case"ee":return m(o,2);case"eo":return n.ordinalNumber(o,{unit:"day"});case"eee":return n.day(a,{width:"abbreviated",context:"formatting"});case"eeeee":return n.day(a,{width:"narrow",context:"formatting"});case"eeeeee":return n.day(a,{width:"short",context:"formatting"});default:return n.day(a,{width:"wide",context:"formatting"})}},c:function(t,e,n,r){var a=t.getUTCDay(),o=(a-r.weekStartsOn+8)%7||7;switch(e){case"c":return String(o);case"cc":return m(o,e.length);case"co":return n.ordinalNumber(o,{unit:"day"});case"ccc":return n.day(a,{width:"abbreviated",context:"standalone"});case"ccccc":return n.day(a,{width:"narrow",context:"standalone"});case"cccccc":return n.day(a,{width:"short",context:"standalone"});default:return n.day(a,{width:"wide",context:"standalone"})}},i:function(t,e,n){var r=t.getUTCDay(),a=0===r?7:r;switch(e){case"i":return String(a);case"ii":return m(a,e.length);case"io":return n.ordinalNumber(a,{unit:"day"});case"iii":return n.day(r,{width:"abbreviated",context:"formatting"});case"iiiii":return n.day(r,{width:"narrow",context:"formatting"});case"iiiiii":return n.day(r,{width:"short",context:"formatting"});default:return n.day(r,{width:"wide",context:"formatting"})}},a:function(t,e,n){var r=t.getUTCHours()/12>=1?"pm":"am";switch(e){case"a":case"aa":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"});case"aaa":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"}).toLowerCase();case"aaaaa":return n.dayPeriod(r,{width:"narrow",context:"formatting"});default:return n.dayPeriod(r,{width:"wide",context:"formatting"})}},b:function(t,e,n){var r,a=t.getUTCHours();switch(r=12===a?"noon":0===a?"midnight":a/12>=1?"pm":"am",e){case"b":case"bb":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"});case"bbb":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"}).toLowerCase();case"bbbbb":return n.dayPeriod(r,{width:"narrow",context:"formatting"});default:return n.dayPeriod(r,{width:"wide",context:"formatting"})}},B:function(t,e,n){var r,a=t.getUTCHours();switch(r=a>=17?"evening":a>=12?"afternoon":a>=4?"morning":"night",e){case"B":case"BB":case"BBB":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"});case"BBBBB":return n.dayPeriod(r,{width:"narrow",context:"formatting"});default:return n.dayPeriod(r,{width:"wide",context:"formatting"})}},h:function(t,e,n){if("ho"===e){var r=t.getUTCHours()%12;return 0===r&&(r=12),n.ordinalNumber(r,{unit:"hour"})}return v(t,e)},H:function(t,e,n){return"Ho"===e?n.ordinalNumber(t.getUTCHours(),{unit:"hour"}):w(t,e)},K:function(t,e,n){var r=t.getUTCHours()%12;return"Ko"===e?n.ordinalNumber(r,{unit:"hour"}):m(r,e.length)},k:function(t,e,n){var r=t.getUTCHours();return 0===r&&(r=24),"ko"===e?n.ordinalNumber(r,{unit:"hour"}):m(r,e.length)},m:function(t,e,n){return"mo"===e?n.ordinalNumber(t.getUTCMinutes(),{unit:"minute"}):y(t,e)},s:function(t,e,n){return"so"===e?n.ordinalNumber(t.getUTCSeconds(),{unit:"second"}):b(t,e)},S:function(t,e){return p(t,e)},X:function(t,e,n,r){var a=(r._originalDate||t).getTimezoneOffset();if(0===a)return"Z";switch(e){case"X":return D(a);case"XXXX":case"XX":return C(a);default:return C(a,":")}},x:function(t,e,n,r){var a=(r._originalDate||t).getTimezoneOffset();switch(e){case"x":return D(a);case"xxxx":case"xx":return C(a);default:return C(a,":")}},O:function(t,e,n,r){var a=(r._originalDate||t).getTimezoneOffset();switch(e){case"O":case"OO":case"OOO":return"GMT"+T(a,":");default:return"GMT"+C(a,":")}},z:function(t,e,n,r){var a=(r._originalDate||t).getTimezoneOffset();switch(e){case"z":case"zz":case"zzz":return"GMT"+T(a,":");default:return"GMT"+C(a,":")}},t:function(t,e,n,r){var a=r._originalDate||t;return m(Math.floor(a.getTime()/1e3),e.length)},T:function(t,e,n,r){return m((r._originalDate||t).getTime(),e.length)}};function T(t,e){var n=t>0?"-":"+",r=Math.abs(t),a=Math.floor(r/60),o=r%60;if(0===o)return n+String(a);var i=e||"";return n+String(a)+i+m(o,2)}function D(t,e){return t%60==0?(t>0?"-":"+")+m(Math.abs(t)/60,2):C(t,e)}function C(t,e){var n=e||"",r=t>0?"-":"+",a=Math.abs(t);return r+m(Math.floor(a/60),2)+n+m(a%60,2)}const S=k;var M=function(t,e){switch(t){case"P":return e.date({width:"short"});case"PP":return e.date({width:"medium"});case"PPP":return e.date({width:"long"});default:return e.date({width:"full"})}},N=function(t,e){switch(t){case"p":return e.time({width:"short"});case"pp":return e.time({width:"medium"});case"ppp":return e.time({width:"long"});default:return e.time({width:"full"})}},x={p:N,P:function(t,e){var n,r=t.match(/(P+)(p+)?/)||[],a=r[1],o=r[2];if(!o)return M(t,e);switch(a){case"P":n=e.dateTime({width:"short"});break;case"PP":n=e.dateTime({width:"medium"});break;case"PPP":n=e.dateTime({width:"long"});break;default:n=e.dateTime({width:"full"})}return n.replace("{{date}}",M(a,e)).replace("{{time}}",N(o,e))}};const U=x;var q=["D","DD"],E=["YY","YYYY"];function P(t,e,n){if("YYYY"===t)throw new RangeError("Use `yyyy` instead of `YYYY` (in `".concat(e,"`) for formatting years to the input `").concat(n,"`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));if("YY"===t)throw new RangeError("Use `yy` instead of `YY` (in `".concat(e,"`) for formatting years to the input `").concat(n,"`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));if("D"===t)throw new RangeError("Use `d` instead of `D` (in `".concat(e,"`) for formatting days of the month to the input `").concat(n,"`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));if("DD"===t)throw new RangeError("Use `dd` instead of `DD` (in `".concat(e,"`) for formatting days of the month to the input `").concat(n,"`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"))}var W={lessThanXSeconds:{one:"less than a second",other:"less than {{count}} seconds"},xSeconds:{one:"1 second",other:"{{count}} seconds"},halfAMinute:"half a minute",lessThanXMinutes:{one:"less than a minute",other:"less than {{count}} minutes"},xMinutes:{one:"1 minute",other:"{{count}} minutes"},aboutXHours:{one:"about 1 hour",other:"about {{count}} hours"},xHours:{one:"1 hour",other:"{{count}} hours"},xDays:{one:"1 day",other:"{{count}} days"},aboutXWeeks:{one:"about 1 week",other:"about {{count}} weeks"},xWeeks:{one:"1 week",other:"{{count}} weeks"},aboutXMonths:{one:"about 1 month",other:"about {{count}} months"},xMonths:{one:"1 month",other:"{{count}} months"},aboutXYears:{one:"about 1 year",other:"about {{count}} years"},xYears:{one:"1 year",other:"{{count}} years"},overXYears:{one:"over 1 year",other:"over {{count}} years"},almostXYears:{one:"almost 1 year",other:"almost {{count}} years"}};function Y(t){return function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=e.width?String(e.width):t.defaultWidth;return t.formats[n]||t.formats[t.defaultWidth]}}var O,L={date:Y({formats:{full:"EEEE, MMMM do, y",long:"MMMM do, y",medium:"MMM d, y",short:"MM/dd/yyyy"},defaultWidth:"full"}),time:Y({formats:{full:"h:mm:ss a zzzz",long:"h:mm:ss a z",medium:"h:mm:ss a",short:"h:mm a"},defaultWidth:"full"}),dateTime:Y({formats:{full:"{{date}} 'at' {{time}}",long:"{{date}} 'at' {{time}}",medium:"{{date}}, {{time}}",short:"{{date}}, {{time}}"},defaultWidth:"full"})},F={lastWeek:"'last' eeee 'at' p",yesterday:"'yesterday at' p",today:"'today at' p",tomorrow:"'tomorrow at' p",nextWeek:"eeee 'at' p",other:"P"};function j(t){return function(e,n){var r;if("formatting"===(null!=n&&n.context?String(n.context):"standalone")&&t.formattingValues){var a=t.defaultFormattingWidth||t.defaultWidth,o=null!=n&&n.width?String(n.width):a;r=t.formattingValues[o]||t.formattingValues[a]}else{var i=t.defaultWidth,u=null!=n&&n.width?String(n.width):t.defaultWidth;r=t.values[u]||t.values[i]}return r[t.argumentCallback?t.argumentCallback(e):e]}}function z(t){return function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=n.width,a=r&&t.matchPatterns[r]||t.matchPatterns[t.defaultMatchWidth],o=e.match(a);if(!o)return null;var i,u=o[0],s=r&&t.parsePatterns[r]||t.parsePatterns[t.defaultParseWidth],c=Array.isArray(s)?function(t,e){for(var n=0;n<t.length;n++)if(t[n].test(u))return n}(s):function(t,e){for(var n in t)if(t.hasOwnProperty(n)&&t[n].test(u))return n}(s);return i=t.valueCallback?t.valueCallback(c):c,{value:i=n.valueCallback?n.valueCallback(i):i,rest:e.slice(u.length)}}}const H={code:"en-US",formatDistance:function(t,e,n){var r,a=W[t];return r="string"==typeof a?a:1===e?a.one:a.other.replace("{{count}}",e.toString()),null!=n&&n.addSuffix?n.comparison&&n.comparison>0?"in "+r:r+" ago":r},formatLong:L,formatRelative:function(t,e,n,r){return F[t]},localize:{ordinalNumber:function(t,e){var n=Number(t),r=n%100;if(r>20||r<10)switch(r%10){case 1:return n+"st";case 2:return n+"nd";case 3:return n+"rd"}return n+"th"},era:j({values:{narrow:["B","A"],abbreviated:["BC","AD"],wide:["Before Christ","Anno Domini"]},defaultWidth:"wide"}),quarter:j({values:{narrow:["1","2","3","4"],abbreviated:["Q1","Q2","Q3","Q4"],wide:["1st quarter","2nd quarter","3rd quarter","4th quarter"]},defaultWidth:"wide",argumentCallback:function(t){return t-1}}),month:j({values:{narrow:["J","F","M","A","M","J","J","A","S","O","N","D"],abbreviated:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],wide:["January","February","March","April","May","June","July","August","September","October","November","December"]},defaultWidth:"wide"}),day:j({values:{narrow:["S","M","T","W","T","F","S"],short:["Su","Mo","Tu","We","Th","Fr","Sa"],abbreviated:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],wide:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},defaultWidth:"wide"}),dayPeriod:j({values:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"}},defaultWidth:"wide",formattingValues:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"}},defaultFormattingWidth:"wide"})},match:{ordinalNumber:(O={matchPattern:/^(\d+)(th|st|nd|rd)?/i,parsePattern:/\d+/i,valueCallback:function(t){return parseInt(t,10)}},function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=t.match(O.matchPattern);if(!n)return null;var r=n[0],a=t.match(O.parsePattern);if(!a)return null;var o=O.valueCallback?O.valueCallback(a[0]):a[0];return{value:o=e.valueCallback?e.valueCallback(o):o,rest:t.slice(r.length)}}),era:z({matchPatterns:{narrow:/^(b|a)/i,abbreviated:/^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,wide:/^(before christ|before common era|anno domini|common era)/i},defaultMatchWidth:"wide",parsePatterns:{any:[/^b/i,/^(a|c)/i]},defaultParseWidth:"any"}),quarter:z({matchPatterns:{narrow:/^[1234]/i,abbreviated:/^q[1234]/i,wide:/^[1234](th|st|nd|rd)? quarter/i},defaultMatchWidth:"wide",parsePatterns:{any:[/1/i,/2/i,/3/i,/4/i]},defaultParseWidth:"any",valueCallback:function(t){return t+1}}),month:z({matchPatterns:{narrow:/^[jfmasond]/i,abbreviated:/^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,wide:/^(january|february|march|april|may|june|july|august|september|october|november|december)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^j/i,/^f/i,/^m/i,/^a/i,/^m/i,/^j/i,/^j/i,/^a/i,/^s/i,/^o/i,/^n/i,/^d/i],any:[/^ja/i,/^f/i,/^mar/i,/^ap/i,/^may/i,/^jun/i,/^jul/i,/^au/i,/^s/i,/^o/i,/^n/i,/^d/i]},defaultParseWidth:"any"}),day:z({matchPatterns:{narrow:/^[smtwf]/i,short:/^(su|mo|tu|we|th|fr|sa)/i,abbreviated:/^(sun|mon|tue|wed|thu|fri|sat)/i,wide:/^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^s/i,/^m/i,/^t/i,/^w/i,/^t/i,/^f/i,/^s/i],any:[/^su/i,/^m/i,/^tu/i,/^w/i,/^th/i,/^f/i,/^sa/i]},defaultParseWidth:"any"}),dayPeriod:z({matchPatterns:{narrow:/^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,any:/^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i},defaultMatchWidth:"any",parsePatterns:{any:{am:/^a/i,pm:/^p/i,midnight:/^mi/i,noon:/^no/i,morning:/morning/i,afternoon:/afternoon/i,evening:/evening/i,night:/night/i}},defaultParseWidth:"any"})},options:{weekStartsOn:0,firstWeekContainsDate:1}};var A=/[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,I=/P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,$=/^'([^]*?)'?$/,Q=/''/g,G=/[a-zA-Z]/;function R(t,e,i){var u,s,d,l,m,f,h,g,v,w,y,b,p,k,T,D,C,M;r(2,arguments);var N=String(e),x=c(),W=null!==(u=null!==(s=null==i?void 0:i.locale)&&void 0!==s?s:x.locale)&&void 0!==u?u:H,Y=o(null!==(d=null!==(l=null!==(m=null!==(f=null==i?void 0:i.firstWeekContainsDate)&&void 0!==f?f:null==i||null===(h=i.locale)||void 0===h||null===(g=h.options)||void 0===g?void 0:g.firstWeekContainsDate)&&void 0!==m?m:x.firstWeekContainsDate)&&void 0!==l?l:null===(v=x.locale)||void 0===v||null===(w=v.options)||void 0===w?void 0:w.firstWeekContainsDate)&&void 0!==d?d:1);if(!(Y>=1&&Y<=7))throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");var O=o(null!==(y=null!==(b=null!==(p=null!==(k=null==i?void 0:i.weekStartsOn)&&void 0!==k?k:null==i||null===(T=i.locale)||void 0===T||null===(D=T.options)||void 0===D?void 0:D.weekStartsOn)&&void 0!==p?p:x.weekStartsOn)&&void 0!==b?b:null===(C=x.locale)||void 0===C||null===(M=C.options)||void 0===M?void 0:M.weekStartsOn)&&void 0!==y?y:0);if(!(O>=0&&O<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");if(!W.localize)throw new RangeError("locale must contain localize property");if(!W.formatLong)throw new RangeError("locale must contain formatLong property");var L=a(t);if(!function(t){if(r(1,arguments),!function(t){return r(1,arguments),t instanceof Date||"object"===n(t)&&"[object Date]"===Object.prototype.toString.call(t)}(t)&&"number"!=typeof t)return!1;var e=a(t);return!isNaN(Number(e))}(L))throw new RangeError("Invalid time value");var F=function(t){var e=new Date(Date.UTC(t.getFullYear(),t.getMonth(),t.getDate(),t.getHours(),t.getMinutes(),t.getSeconds(),t.getMilliseconds()));return e.setUTCFullYear(t.getFullYear()),t.getTime()-e.getTime()}(L),j=function(t,e){return r(2,arguments),function(t,e){r(2,arguments);var n=a(t).getTime(),i=o(e);return new Date(n+i)}(t,-o(e))}(L,F),z={firstWeekContainsDate:Y,weekStartsOn:O,locale:W,_originalDate:L};return N.match(I).map((function(t){var e=t[0];return"p"===e||"P"===e?(0,U[e])(t,W.formatLong):t})).join("").match(A).map((function(n){if("''"===n)return"'";var r,a,o=n[0];if("'"===o)return(a=(r=n).match($))?a[1].replace(Q,"'"):r;var u,s=S[o];if(s)return null!=i&&i.useAdditionalWeekYearTokens||(u=n,-1===E.indexOf(u))||P(n,e,String(t)),null!=i&&i.useAdditionalDayOfYearTokens||!function(t){return-1!==q.indexOf(t)}(n)||P(n,e,String(t)),s(j,n,W.localize,z);if(o.match(G))throw new RangeError("Format string contains an unescaped latin alphabet character `"+o+"`");return n})).join("")}Math.pow(10,8);var X=6e4,B=36e5;var J={dateTimeDelimiter:/[T ]/,timeZoneDelimiter:/[Z ]/i,timezone:/([Z+-].*)$/},Z=/^-?(?:(\d{3})|(\d{2})(?:-?(\d{2}))?|W(\d{2})(?:-?(\d{1}))?|)$/,_=/^(\d{2}(?:[.,]\d*)?)(?::?(\d{2}(?:[.,]\d*)?))?(?::?(\d{2}(?:[.,]\d*)?))?$/,V=/^([+-])(\d{2})(?::?(\d{2}))?$/;function K(t){return t?parseInt(t):1}function tt(t){return t&&parseFloat(t.replace(",","."))||0}var et=[31,null,31,30,31,30,31,31,30,31,30,31];function nt(t){return t%400==0||t%4==0&&t%100!=0}function rt(){const t=document.querySelector(".show-tasks");e("tasks").forEach((e=>{const n=function(t,e){var n;r(1,arguments);var a=o(null!==(n=null==e?void 0:e.additionalDigits)&&void 0!==n?n:2);if(2!==a&&1!==a&&0!==a)throw new RangeError("additionalDigits must be 0, 1 or 2");if("string"!=typeof t&&"[object String]"!==Object.prototype.toString.call(t))return new Date(NaN);var i,u=function(t){var e,n={},r=t.split(J.dateTimeDelimiter);if(r.length>2)return n;if(/:/.test(r[0])?e=r[0]:(n.date=r[0],e=r[1],J.timeZoneDelimiter.test(n.date)&&(n.date=t.split(J.timeZoneDelimiter)[0],e=t.substr(n.date.length,t.length))),e){var a=J.timezone.exec(e);a?(n.time=e.replace(a[1],""),n.timezone=a[1]):n.time=e}return n}(t);if(u.date){var s=function(t,e){var n=new RegExp("^(?:(\\d{4}|[+-]\\d{"+(4+e)+"})|(\\d{2}|[+-]\\d{"+(2+e)+"})$)"),r=t.match(n);if(!r)return{year:NaN,restDateString:""};var a=r[1]?parseInt(r[1]):null,o=r[2]?parseInt(r[2]):null;return{year:null===o?a:100*o,restDateString:t.slice((r[1]||r[2]).length)}}(u.date,a);i=function(t,e){if(null===e)return new Date(NaN);var n=t.match(Z);if(!n)return new Date(NaN);var r=!!n[4],a=K(n[1]),o=K(n[2])-1,i=K(n[3]),u=K(n[4]),s=K(n[5])-1;if(r)return function(t,e,n){return e>=1&&e<=53&&n>=0&&n<=6}(0,u,s)?function(t,e,n){var r=new Date(0);r.setUTCFullYear(t,0,4);var a=7*(e-1)+n+1-(r.getUTCDay()||7);return r.setUTCDate(r.getUTCDate()+a),r}(e,u,s):new Date(NaN);var c=new Date(0);return function(t,e,n){return e>=0&&e<=11&&n>=1&&n<=(et[e]||(nt(t)?29:28))}(e,o,i)&&function(t,e){return e>=1&&e<=(nt(t)?366:365)}(e,a)?(c.setUTCFullYear(e,o,Math.max(a,i)),c):new Date(NaN)}(s.restDateString,s.year)}if(!i||isNaN(i.getTime()))return new Date(NaN);var c,d=i.getTime(),l=0;if(u.time&&(l=function(t){var e=t.match(_);if(!e)return NaN;var n=tt(e[1]),r=tt(e[2]),a=tt(e[3]);return function(t,e,n){return 24===t?0===e&&0===n:n>=0&&n<60&&e>=0&&e<60&&t>=0&&t<25}(n,r,a)?n*B+r*X+1e3*a:NaN}(u.time),isNaN(l)))return new Date(NaN);if(!u.timezone){var m=new Date(d+l),f=new Date(0);return f.setFullYear(m.getUTCFullYear(),m.getUTCMonth(),m.getUTCDate()),f.setHours(m.getUTCHours(),m.getUTCMinutes(),m.getUTCSeconds(),m.getUTCMilliseconds()),f}return c=function(t){if("Z"===t)return 0;var e=t.match(V);if(!e)return 0;var n="+"===e[1]?-1:1,r=parseInt(e[2]),a=e[3]&&parseInt(e[3])||0;return function(t,e){return e>=0&&e<=59}(0,a)?n*(r*B+a*X):NaN}(u.timezone),isNaN(c)?new Date(NaN):new Date(d+l+c)}(e.dueDate);return!(e.completed||!function(t){const e=function(t,e){r(2,arguments);var n=a(t),i=o(e);return isNaN(i)?new Date(NaN):i?(n.setDate(n.getDate()+i),n):n}(new Date,8);return function(t,e){r(2,arguments);var n=a(t).getTime(),o=a(e.start).getTime(),i=a(e.end).getTime();if(!(o<=i))throw new RangeError("Invalid interval");return n>=o&&n<=i}(t,{start:new Date,end:e})}(n)||(t.appendChild(ut(e)),0))}))}function at(t,e){return t.find((t=>t.id==e))}localStorage.getItem("tasks")&&e("tasks");let ot=localStorage.getItem("tasks")?e("tasks"):[],it=Number(localStorage.getItem("taskId"))||0;function ut(t){const e=document.createElement("div");e.classList.add("task-container"),e.id=t.id;const n=document.createElement("p");n.classList.add("task-container-title"),n.textContent=`Task: ${t.title}`;const r=document.createElement("p");r.classList.add("task-container-description"),r.textContent=`Description: ${t.description}`;const a=document.createElement("p");var o;a.classList.add("task-container-date"),a.textContent=`Due date: ${o=t.dueDate,o.slice(0,10).split("-").reverse().join("/")}`;const i=document.createElement("p");if(i.classList.add("task-container-priority"),i.textContent=`Priority: ${t.priority}`,t.completed){const t=document.createElement("button");t.classList.add("unmark-complete-btn"),t.textContent="Unmark completed";const o=document.createElement("button");o.classList.add("delete-btn"),o.textContent="Delete",e.append(n,r,a,i,t,o)}else{const t=document.createElement("button");t.classList.add("complete-btn"),t.textContent="Mark completed";const o=document.createElement("button");o.classList.add("edit-btn"),o.textContent="Edit";const u=document.createElement("button");u.classList.add("delete-btn"),u.textContent="Delete",e.append(n,r,a,i,t,o,u)}return e}function st(e){e.preventDefault();const n=document.querySelector(".show-tasks"),r=it;it++;const a={id:r,title:document.querySelector("#task-title").value,description:document.querySelector("#task-description").value,dueDate:document.querySelector("#task-duedate").value,priority:document.querySelector('input[type="radio"]:checked').value,completed:!1};ot.push(a),vt(),t("tasks",ot),localStorage.setItem("taskId",it),n.appendChild(ut(a)),dt("new-task"),document.querySelector("#new-task-form").reset(),lt()}function ct(t){document.querySelector(`#${t}`).style.display="block"}function dt(t){document.querySelector(`#${t}`).style.display="none"}function lt(){ht(),gt("#time-active");const t=document.querySelector(".show-tasks");ot.forEach((e=>{e.completed||t.appendChild(ut(e))})),function(){const t=document.querySelector("#new-task-btn"),e=document.querySelector("#new-task-form"),n=e.querySelector("#cancel-task-btn");t.addEventListener("click",(()=>{ct("new-task"),n.addEventListener("click",(()=>{dt("new-task")}),{once:!0}),e.addEventListener("submit",st,{once:!0})}))}()}function mt(t){ht(),gt(`#${t}-priority`),function(t){const n=document.querySelector(".show-tasks");e("tasks").forEach((e=>{e.completed||e.priority!==`${t}`||n.appendChild(ut(e))}))}(`${t}`)}function ft(e,n){const r=e.target.parentNode.id;at(ot,r).completed=n,e.target.parentNode.remove(),t("tasks",ot)}function ht(){document.querySelector(".show-tasks").textContent=""}function gt(t){document.querySelector(".active")&&document.querySelector(".active").classList.remove("active"),document.querySelector(`${t}`).classList.add("active")}function vt(){ot.sort((function(t,e){return new Date(t.dueDate)-new Date(e.dueDate)}))}gt("#time-active"),document.querySelector(".container").addEventListener("click",(function(n){const r=n.target.matches(".delete-btn"),a=n.target.matches(".edit-btn"),o=n.target.matches(".complete-btn"),i=n.target.matches(".unmark-complete-btn"),u=n.target.matches("#time-today"),s=n.target.matches("#time-upcoming"),c=n.target.matches("#time-active"),d=n.target.matches("#completed"),l=n.target.matches("#low-priority"),m=n.target.matches("#medium-priority"),f=n.target.matches("#high-priority");if(r)!function(e){const n=document.querySelectorAll(".task-container");let r=Array.from(n);const a=e.target.parentNode.id;let o=at(r,a);e.target.parentNode.remove(),r=r.filter((t=>t!=o)),function(t,e){t.forEach((n=>{if(n.id==e){let e=t.indexOf(n);t.splice(e,1)}}))}(ot,a),t("tasks",ot)}(n);else if(a)!function(e){const n=e.target.parentNode.id;let r=at(ot,n);var a;document.querySelector("#edit-task-form").querySelector("#cancel-edit-btn").addEventListener("click",(()=>{dt("edit-task")}),{once:!0}),ct("edit-task"),function(t){const e=document.querySelector("#edit-task-title"),n=document.querySelector("#edit-task-description"),r=document.querySelector("#edit-task-duedate"),a=document.querySelectorAll('input[type="radio"]');e.value=t.title,n.value=t.description,r.value=t.dueDate,a.forEach((e=>{t.priority==e.value&&(e.checked=!0)}))}(r),a=r,document.querySelector("#edit-task-form").addEventListener("submit",(e=>{e.preventDefault();const n=document.querySelector("#edit-task-title").value,r=document.querySelector("#edit-task-description").value,o=document.querySelector("#edit-task-duedate").value;let i="";document.querySelectorAll('input[type="radio"]').forEach((t=>{t.checked&&(i=t.value)})),a.title=n,a.description=r,a.dueDate=o,a.priority=i,t("tasks",ot),vt(),dt("edit-task"),lt()}),{once:!0})}(n);else if(o)ft(n,!0);else if(i)ft(n,!1);else if(u)ht(),gt("#time-today"),function(){const t=document.querySelector(".show-tasks"),n=Date.parse(R(new Date,"yyyy-MM-dd"));e("tasks").forEach((e=>{const r=Date.parse(e.dueDate);return n===r&&(t.appendChild(ut(e)),!0)}))}();else if(c)lt();else if(s)ht(),gt("#time-upcoming"),rt();else if(d)ht(),gt("#completed"),function(){const t=document.querySelector(".show-tasks");e("tasks").forEach((e=>{e.completed&&t.appendChild(ut(e))}))}();else if(l)mt("low");else if(m)mt("medium");else{if(!f)return;mt("high")}})),lt()})();