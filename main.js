(()=>{"use strict";function t(t,e){try{localStorage.setItem(`${t}`,JSON.stringify(e))}catch(t){console.warn("Could not save to local storage.")}}function e(t){return JSON.parse(localStorage.getItem(`${t}`))}function n(t){return n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},n(t)}function r(t,e){if(e.length<t)throw new TypeError(t+" argument"+(t>1?"s":"")+" required, but only "+e.length+" present")}function a(t){r(1,arguments);var e=Object.prototype.toString.call(t);return t instanceof Date||"object"===n(t)&&"[object Date]"===e?new Date(t.getTime()):"number"==typeof t||"[object Number]"===e?new Date(t):("string"!=typeof t&&"[object String]"!==e||"undefined"==typeof console||(console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#string-arguments"),console.warn((new Error).stack)),new Date(NaN))}function o(t){if(null===t||!0===t||!1===t)return NaN;var e=Number(t);return isNaN(e)?e:e<0?Math.ceil(e):Math.floor(e)}function i(t){r(1,arguments);var e=a(t),n=e.getUTCDay(),o=(n<1?7:0)+n-1;return e.setUTCDate(e.getUTCDate()-o),e.setUTCHours(0,0,0,0),e}function c(t){r(1,arguments);var e=a(t),n=e.getUTCFullYear(),o=new Date(0);o.setUTCFullYear(n+1,0,4),o.setUTCHours(0,0,0,0);var c=i(o),u=new Date(0);u.setUTCFullYear(n,0,4),u.setUTCHours(0,0,0,0);var s=i(u);return e.getTime()>=c.getTime()?n+1:e.getTime()>=s.getTime()?n:n-1}var u={};function s(){return u}function l(t,e){var n,i,c,u,l,d,m,f;r(1,arguments);var h=s(),g=o(null!==(n=null!==(i=null!==(c=null!==(u=null==e?void 0:e.weekStartsOn)&&void 0!==u?u:null==e||null===(l=e.locale)||void 0===l||null===(d=l.options)||void 0===d?void 0:d.weekStartsOn)&&void 0!==c?c:h.weekStartsOn)&&void 0!==i?i:null===(m=h.locale)||void 0===m||null===(f=m.options)||void 0===f?void 0:f.weekStartsOn)&&void 0!==n?n:0);if(!(g>=0&&g<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");var v=a(t),y=v.getUTCDay(),p=(y<g?7:0)+y-g;return v.setUTCDate(v.getUTCDate()-p),v.setUTCHours(0,0,0,0),v}function d(t,e){var n,i,c,u,d,m,f,h;r(1,arguments);var g=a(t),v=g.getUTCFullYear(),y=s(),p=o(null!==(n=null!==(i=null!==(c=null!==(u=null==e?void 0:e.firstWeekContainsDate)&&void 0!==u?u:null==e||null===(d=e.locale)||void 0===d||null===(m=d.options)||void 0===m?void 0:m.firstWeekContainsDate)&&void 0!==c?c:y.firstWeekContainsDate)&&void 0!==i?i:null===(f=y.locale)||void 0===f||null===(h=f.options)||void 0===h?void 0:h.firstWeekContainsDate)&&void 0!==n?n:1);if(!(p>=1&&p<=7))throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");var w=new Date(0);w.setUTCFullYear(v+1,0,p),w.setUTCHours(0,0,0,0);var b=l(w,e),k=new Date(0);k.setUTCFullYear(v,0,p),k.setUTCHours(0,0,0,0);var S=l(k,e);return g.getTime()>=b.getTime()?v+1:g.getTime()>=S.getTime()?v:v-1}function m(t,e){for(var n=t<0?"-":"",r=Math.abs(t).toString();r.length<e;)r="0"+r;return n+r}const f=function(t,e){var n=t.getUTCFullYear(),r=n>0?n:1-n;return m("yy"===e?r%100:r,e.length)},h=function(t,e){var n=t.getUTCMonth();return"M"===e?String(n+1):m(n+1,2)},g=function(t,e){return m(t.getUTCDate(),e.length)},v=function(t,e){return m(t.getUTCHours()%12||12,e.length)},y=function(t,e){return m(t.getUTCHours(),e.length)},p=function(t,e){return m(t.getUTCMinutes(),e.length)},w=function(t,e){return m(t.getUTCSeconds(),e.length)},b=function(t,e){var n=e.length,r=t.getUTCMilliseconds();return m(Math.floor(r*Math.pow(10,n-3)),e.length)};var k={G:function(t,e,n){var r=t.getUTCFullYear()>0?1:0;switch(e){case"G":case"GG":case"GGG":return n.era(r,{width:"abbreviated"});case"GGGGG":return n.era(r,{width:"narrow"});default:return n.era(r,{width:"wide"})}},y:function(t,e,n){if("yo"===e){var r=t.getUTCFullYear(),a=r>0?r:1-r;return n.ordinalNumber(a,{unit:"year"})}return f(t,e)},Y:function(t,e,n,r){var a=d(t,r),o=a>0?a:1-a;return"YY"===e?m(o%100,2):"Yo"===e?n.ordinalNumber(o,{unit:"year"}):m(o,e.length)},R:function(t,e){return m(c(t),e.length)},u:function(t,e){return m(t.getUTCFullYear(),e.length)},Q:function(t,e,n){var r=Math.ceil((t.getUTCMonth()+1)/3);switch(e){case"Q":return String(r);case"QQ":return m(r,2);case"Qo":return n.ordinalNumber(r,{unit:"quarter"});case"QQQ":return n.quarter(r,{width:"abbreviated",context:"formatting"});case"QQQQQ":return n.quarter(r,{width:"narrow",context:"formatting"});default:return n.quarter(r,{width:"wide",context:"formatting"})}},q:function(t,e,n){var r=Math.ceil((t.getUTCMonth()+1)/3);switch(e){case"q":return String(r);case"qq":return m(r,2);case"qo":return n.ordinalNumber(r,{unit:"quarter"});case"qqq":return n.quarter(r,{width:"abbreviated",context:"standalone"});case"qqqqq":return n.quarter(r,{width:"narrow",context:"standalone"});default:return n.quarter(r,{width:"wide",context:"standalone"})}},M:function(t,e,n){var r=t.getUTCMonth();switch(e){case"M":case"MM":return h(t,e);case"Mo":return n.ordinalNumber(r+1,{unit:"month"});case"MMM":return n.month(r,{width:"abbreviated",context:"formatting"});case"MMMMM":return n.month(r,{width:"narrow",context:"formatting"});default:return n.month(r,{width:"wide",context:"formatting"})}},L:function(t,e,n){var r=t.getUTCMonth();switch(e){case"L":return String(r+1);case"LL":return m(r+1,2);case"Lo":return n.ordinalNumber(r+1,{unit:"month"});case"LLL":return n.month(r,{width:"abbreviated",context:"standalone"});case"LLLLL":return n.month(r,{width:"narrow",context:"standalone"});default:return n.month(r,{width:"wide",context:"standalone"})}},w:function(t,e,n,i){var c=function(t,e){r(1,arguments);var n=a(t),i=l(n,e).getTime()-function(t,e){var n,a,i,c,u,m,f,h;r(1,arguments);var g=s(),v=o(null!==(n=null!==(a=null!==(i=null!==(c=null==e?void 0:e.firstWeekContainsDate)&&void 0!==c?c:null==e||null===(u=e.locale)||void 0===u||null===(m=u.options)||void 0===m?void 0:m.firstWeekContainsDate)&&void 0!==i?i:g.firstWeekContainsDate)&&void 0!==a?a:null===(f=g.locale)||void 0===f||null===(h=f.options)||void 0===h?void 0:h.firstWeekContainsDate)&&void 0!==n?n:1),y=d(t,e),p=new Date(0);return p.setUTCFullYear(y,0,v),p.setUTCHours(0,0,0,0),l(p,e)}(n,e).getTime();return Math.round(i/6048e5)+1}(t,i);return"wo"===e?n.ordinalNumber(c,{unit:"week"}):m(c,e.length)},I:function(t,e,n){var o=function(t){r(1,arguments);var e=a(t),n=i(e).getTime()-function(t){r(1,arguments);var e=c(t),n=new Date(0);return n.setUTCFullYear(e,0,4),n.setUTCHours(0,0,0,0),i(n)}(e).getTime();return Math.round(n/6048e5)+1}(t);return"Io"===e?n.ordinalNumber(o,{unit:"week"}):m(o,e.length)},d:function(t,e,n){return"do"===e?n.ordinalNumber(t.getUTCDate(),{unit:"date"}):g(t,e)},D:function(t,e,n){var o=function(t){r(1,arguments);var e=a(t),n=e.getTime();e.setUTCMonth(0,1),e.setUTCHours(0,0,0,0);var o=n-e.getTime();return Math.floor(o/864e5)+1}(t);return"Do"===e?n.ordinalNumber(o,{unit:"dayOfYear"}):m(o,e.length)},E:function(t,e,n){var r=t.getUTCDay();switch(e){case"E":case"EE":case"EEE":return n.day(r,{width:"abbreviated",context:"formatting"});case"EEEEE":return n.day(r,{width:"narrow",context:"formatting"});case"EEEEEE":return n.day(r,{width:"short",context:"formatting"});default:return n.day(r,{width:"wide",context:"formatting"})}},e:function(t,e,n,r){var a=t.getUTCDay(),o=(a-r.weekStartsOn+8)%7||7;switch(e){case"e":return String(o);case"ee":return m(o,2);case"eo":return n.ordinalNumber(o,{unit:"day"});case"eee":return n.day(a,{width:"abbreviated",context:"formatting"});case"eeeee":return n.day(a,{width:"narrow",context:"formatting"});case"eeeeee":return n.day(a,{width:"short",context:"formatting"});default:return n.day(a,{width:"wide",context:"formatting"})}},c:function(t,e,n,r){var a=t.getUTCDay(),o=(a-r.weekStartsOn+8)%7||7;switch(e){case"c":return String(o);case"cc":return m(o,e.length);case"co":return n.ordinalNumber(o,{unit:"day"});case"ccc":return n.day(a,{width:"abbreviated",context:"standalone"});case"ccccc":return n.day(a,{width:"narrow",context:"standalone"});case"cccccc":return n.day(a,{width:"short",context:"standalone"});default:return n.day(a,{width:"wide",context:"standalone"})}},i:function(t,e,n){var r=t.getUTCDay(),a=0===r?7:r;switch(e){case"i":return String(a);case"ii":return m(a,e.length);case"io":return n.ordinalNumber(a,{unit:"day"});case"iii":return n.day(r,{width:"abbreviated",context:"formatting"});case"iiiii":return n.day(r,{width:"narrow",context:"formatting"});case"iiiiii":return n.day(r,{width:"short",context:"formatting"});default:return n.day(r,{width:"wide",context:"formatting"})}},a:function(t,e,n){var r=t.getUTCHours()/12>=1?"pm":"am";switch(e){case"a":case"aa":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"});case"aaa":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"}).toLowerCase();case"aaaaa":return n.dayPeriod(r,{width:"narrow",context:"formatting"});default:return n.dayPeriod(r,{width:"wide",context:"formatting"})}},b:function(t,e,n){var r,a=t.getUTCHours();switch(r=12===a?"noon":0===a?"midnight":a/12>=1?"pm":"am",e){case"b":case"bb":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"});case"bbb":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"}).toLowerCase();case"bbbbb":return n.dayPeriod(r,{width:"narrow",context:"formatting"});default:return n.dayPeriod(r,{width:"wide",context:"formatting"})}},B:function(t,e,n){var r,a=t.getUTCHours();switch(r=a>=17?"evening":a>=12?"afternoon":a>=4?"morning":"night",e){case"B":case"BB":case"BBB":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"});case"BBBBB":return n.dayPeriod(r,{width:"narrow",context:"formatting"});default:return n.dayPeriod(r,{width:"wide",context:"formatting"})}},h:function(t,e,n){if("ho"===e){var r=t.getUTCHours()%12;return 0===r&&(r=12),n.ordinalNumber(r,{unit:"hour"})}return v(t,e)},H:function(t,e,n){return"Ho"===e?n.ordinalNumber(t.getUTCHours(),{unit:"hour"}):y(t,e)},K:function(t,e,n){var r=t.getUTCHours()%12;return"Ko"===e?n.ordinalNumber(r,{unit:"hour"}):m(r,e.length)},k:function(t,e,n){var r=t.getUTCHours();return 0===r&&(r=24),"ko"===e?n.ordinalNumber(r,{unit:"hour"}):m(r,e.length)},m:function(t,e,n){return"mo"===e?n.ordinalNumber(t.getUTCMinutes(),{unit:"minute"}):p(t,e)},s:function(t,e,n){return"so"===e?n.ordinalNumber(t.getUTCSeconds(),{unit:"second"}):w(t,e)},S:function(t,e){return b(t,e)},X:function(t,e,n,r){var a=(r._originalDate||t).getTimezoneOffset();if(0===a)return"Z";switch(e){case"X":return C(a);case"XXXX":case"XX":return D(a);default:return D(a,":")}},x:function(t,e,n,r){var a=(r._originalDate||t).getTimezoneOffset();switch(e){case"x":return C(a);case"xxxx":case"xx":return D(a);default:return D(a,":")}},O:function(t,e,n,r){var a=(r._originalDate||t).getTimezoneOffset();switch(e){case"O":case"OO":case"OOO":return"GMT"+S(a,":");default:return"GMT"+D(a,":")}},z:function(t,e,n,r){var a=(r._originalDate||t).getTimezoneOffset();switch(e){case"z":case"zz":case"zzz":return"GMT"+S(a,":");default:return"GMT"+D(a,":")}},t:function(t,e,n,r){var a=r._originalDate||t;return m(Math.floor(a.getTime()/1e3),e.length)},T:function(t,e,n,r){return m((r._originalDate||t).getTime(),e.length)}};function S(t,e){var n=t>0?"-":"+",r=Math.abs(t),a=Math.floor(r/60),o=r%60;if(0===o)return n+String(a);var i=e||"";return n+String(a)+i+m(o,2)}function C(t,e){return t%60==0?(t>0?"-":"+")+m(Math.abs(t)/60,2):D(t,e)}function D(t,e){var n=e||"",r=t>0?"-":"+",a=Math.abs(t);return r+m(Math.floor(a/60),2)+n+m(a%60,2)}const T=k;var E=function(t,e){switch(t){case"P":return e.date({width:"short"});case"PP":return e.date({width:"medium"});case"PPP":return e.date({width:"long"});default:return e.date({width:"full"})}},q=function(t,e){switch(t){case"p":return e.time({width:"short"});case"pp":return e.time({width:"medium"});case"ppp":return e.time({width:"long"});default:return e.time({width:"full"})}},M={p:q,P:function(t,e){var n,r=t.match(/(P+)(p+)?/)||[],a=r[1],o=r[2];if(!o)return E(t,e);switch(a){case"P":n=e.dateTime({width:"short"});break;case"PP":n=e.dateTime({width:"medium"});break;case"PPP":n=e.dateTime({width:"long"});break;default:n=e.dateTime({width:"full"})}return n.replace("{{date}}",E(a,e)).replace("{{time}}",q(o,e))}};const N=M;var x=["D","DD"],j=["YY","YYYY"];function U(t,e,n){if("YYYY"===t)throw new RangeError("Use `yyyy` instead of `YYYY` (in `".concat(e,"`) for formatting years to the input `").concat(n,"`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));if("YY"===t)throw new RangeError("Use `yy` instead of `YY` (in `".concat(e,"`) for formatting years to the input `").concat(n,"`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));if("D"===t)throw new RangeError("Use `d` instead of `D` (in `".concat(e,"`) for formatting days of the month to the input `").concat(n,"`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));if("DD"===t)throw new RangeError("Use `dd` instead of `DD` (in `".concat(e,"`) for formatting days of the month to the input `").concat(n,"`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"))}var L={lessThanXSeconds:{one:"less than a second",other:"less than {{count}} seconds"},xSeconds:{one:"1 second",other:"{{count}} seconds"},halfAMinute:"half a minute",lessThanXMinutes:{one:"less than a minute",other:"less than {{count}} minutes"},xMinutes:{one:"1 minute",other:"{{count}} minutes"},aboutXHours:{one:"about 1 hour",other:"about {{count}} hours"},xHours:{one:"1 hour",other:"{{count}} hours"},xDays:{one:"1 day",other:"{{count}} days"},aboutXWeeks:{one:"about 1 week",other:"about {{count}} weeks"},xWeeks:{one:"1 week",other:"{{count}} weeks"},aboutXMonths:{one:"about 1 month",other:"about {{count}} months"},xMonths:{one:"1 month",other:"{{count}} months"},aboutXYears:{one:"about 1 year",other:"about {{count}} years"},xYears:{one:"1 year",other:"{{count}} years"},overXYears:{one:"over 1 year",other:"over {{count}} years"},almostXYears:{one:"almost 1 year",other:"almost {{count}} years"}};function P(t){return function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=e.width?String(e.width):t.defaultWidth;return t.formats[n]||t.formats[t.defaultWidth]}}var W,Y={date:P({formats:{full:"EEEE, MMMM do, y",long:"MMMM do, y",medium:"MMM d, y",short:"MM/dd/yyyy"},defaultWidth:"full"}),time:P({formats:{full:"h:mm:ss a zzzz",long:"h:mm:ss a z",medium:"h:mm:ss a",short:"h:mm a"},defaultWidth:"full"}),dateTime:P({formats:{full:"{{date}} 'at' {{time}}",long:"{{date}} 'at' {{time}}",medium:"{{date}}, {{time}}",short:"{{date}}, {{time}}"},defaultWidth:"full"})},O={lastWeek:"'last' eeee 'at' p",yesterday:"'yesterday at' p",today:"'today at' p",tomorrow:"'tomorrow at' p",nextWeek:"eeee 'at' p",other:"P"};function I(t){return function(e,n){var r;if("formatting"===(null!=n&&n.context?String(n.context):"standalone")&&t.formattingValues){var a=t.defaultFormattingWidth||t.defaultWidth,o=null!=n&&n.width?String(n.width):a;r=t.formattingValues[o]||t.formattingValues[a]}else{var i=t.defaultWidth,c=null!=n&&n.width?String(n.width):t.defaultWidth;r=t.values[c]||t.values[i]}return r[t.argumentCallback?t.argumentCallback(e):e]}}function A(t){return function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=n.width,a=r&&t.matchPatterns[r]||t.matchPatterns[t.defaultMatchWidth],o=e.match(a);if(!o)return null;var i,c=o[0],u=r&&t.parsePatterns[r]||t.parsePatterns[t.defaultParseWidth],s=Array.isArray(u)?function(t,e){for(var n=0;n<t.length;n++)if(t[n].test(c))return n}(u):function(t,e){for(var n in t)if(t.hasOwnProperty(n)&&t[n].test(c))return n}(u);return i=t.valueCallback?t.valueCallback(s):s,{value:i=n.valueCallback?n.valueCallback(i):i,rest:e.slice(c.length)}}}const F={code:"en-US",formatDistance:function(t,e,n){var r,a=L[t];return r="string"==typeof a?a:1===e?a.one:a.other.replace("{{count}}",e.toString()),null!=n&&n.addSuffix?n.comparison&&n.comparison>0?"in "+r:r+" ago":r},formatLong:Y,formatRelative:function(t,e,n,r){return O[t]},localize:{ordinalNumber:function(t,e){var n=Number(t),r=n%100;if(r>20||r<10)switch(r%10){case 1:return n+"st";case 2:return n+"nd";case 3:return n+"rd"}return n+"th"},era:I({values:{narrow:["B","A"],abbreviated:["BC","AD"],wide:["Before Christ","Anno Domini"]},defaultWidth:"wide"}),quarter:I({values:{narrow:["1","2","3","4"],abbreviated:["Q1","Q2","Q3","Q4"],wide:["1st quarter","2nd quarter","3rd quarter","4th quarter"]},defaultWidth:"wide",argumentCallback:function(t){return t-1}}),month:I({values:{narrow:["J","F","M","A","M","J","J","A","S","O","N","D"],abbreviated:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],wide:["January","February","March","April","May","June","July","August","September","October","November","December"]},defaultWidth:"wide"}),day:I({values:{narrow:["S","M","T","W","T","F","S"],short:["Su","Mo","Tu","We","Th","Fr","Sa"],abbreviated:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],wide:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},defaultWidth:"wide"}),dayPeriod:I({values:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"}},defaultWidth:"wide",formattingValues:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"}},defaultFormattingWidth:"wide"})},match:{ordinalNumber:(W={matchPattern:/^(\d+)(th|st|nd|rd)?/i,parsePattern:/\d+/i,valueCallback:function(t){return parseInt(t,10)}},function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=t.match(W.matchPattern);if(!n)return null;var r=n[0],a=t.match(W.parsePattern);if(!a)return null;var o=W.valueCallback?W.valueCallback(a[0]):a[0];return{value:o=e.valueCallback?e.valueCallback(o):o,rest:t.slice(r.length)}}),era:A({matchPatterns:{narrow:/^(b|a)/i,abbreviated:/^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,wide:/^(before christ|before common era|anno domini|common era)/i},defaultMatchWidth:"wide",parsePatterns:{any:[/^b/i,/^(a|c)/i]},defaultParseWidth:"any"}),quarter:A({matchPatterns:{narrow:/^[1234]/i,abbreviated:/^q[1234]/i,wide:/^[1234](th|st|nd|rd)? quarter/i},defaultMatchWidth:"wide",parsePatterns:{any:[/1/i,/2/i,/3/i,/4/i]},defaultParseWidth:"any",valueCallback:function(t){return t+1}}),month:A({matchPatterns:{narrow:/^[jfmasond]/i,abbreviated:/^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,wide:/^(january|february|march|april|may|june|july|august|september|october|november|december)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^j/i,/^f/i,/^m/i,/^a/i,/^m/i,/^j/i,/^j/i,/^a/i,/^s/i,/^o/i,/^n/i,/^d/i],any:[/^ja/i,/^f/i,/^mar/i,/^ap/i,/^may/i,/^jun/i,/^jul/i,/^au/i,/^s/i,/^o/i,/^n/i,/^d/i]},defaultParseWidth:"any"}),day:A({matchPatterns:{narrow:/^[smtwf]/i,short:/^(su|mo|tu|we|th|fr|sa)/i,abbreviated:/^(sun|mon|tue|wed|thu|fri|sat)/i,wide:/^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^s/i,/^m/i,/^t/i,/^w/i,/^t/i,/^f/i,/^s/i],any:[/^su/i,/^m/i,/^tu/i,/^w/i,/^th/i,/^f/i,/^sa/i]},defaultParseWidth:"any"}),dayPeriod:A({matchPatterns:{narrow:/^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,any:/^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i},defaultMatchWidth:"any",parsePatterns:{any:{am:/^a/i,pm:/^p/i,midnight:/^mi/i,noon:/^no/i,morning:/morning/i,afternoon:/afternoon/i,evening:/evening/i,night:/night/i}},defaultParseWidth:"any"})},options:{weekStartsOn:0,firstWeekContainsDate:1}};var z=/[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,H=/P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,$=/^'([^]*?)'?$/,B=/''/g,Q=/[a-zA-Z]/;function R(t,e,i){var c,u,l,d,m,f,h,g,v,y,p,w,b,k,S,C,D,E;r(2,arguments);var q=String(e),M=s(),L=null!==(c=null!==(u=null==i?void 0:i.locale)&&void 0!==u?u:M.locale)&&void 0!==c?c:F,P=o(null!==(l=null!==(d=null!==(m=null!==(f=null==i?void 0:i.firstWeekContainsDate)&&void 0!==f?f:null==i||null===(h=i.locale)||void 0===h||null===(g=h.options)||void 0===g?void 0:g.firstWeekContainsDate)&&void 0!==m?m:M.firstWeekContainsDate)&&void 0!==d?d:null===(v=M.locale)||void 0===v||null===(y=v.options)||void 0===y?void 0:y.firstWeekContainsDate)&&void 0!==l?l:1);if(!(P>=1&&P<=7))throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");var W=o(null!==(p=null!==(w=null!==(b=null!==(k=null==i?void 0:i.weekStartsOn)&&void 0!==k?k:null==i||null===(S=i.locale)||void 0===S||null===(C=S.options)||void 0===C?void 0:C.weekStartsOn)&&void 0!==b?b:M.weekStartsOn)&&void 0!==w?w:null===(D=M.locale)||void 0===D||null===(E=D.options)||void 0===E?void 0:E.weekStartsOn)&&void 0!==p?p:0);if(!(W>=0&&W<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");if(!L.localize)throw new RangeError("locale must contain localize property");if(!L.formatLong)throw new RangeError("locale must contain formatLong property");var Y=a(t);if(!function(t){if(r(1,arguments),!function(t){return r(1,arguments),t instanceof Date||"object"===n(t)&&"[object Date]"===Object.prototype.toString.call(t)}(t)&&"number"!=typeof t)return!1;var e=a(t);return!isNaN(Number(e))}(Y))throw new RangeError("Invalid time value");var O=function(t){var e=new Date(Date.UTC(t.getFullYear(),t.getMonth(),t.getDate(),t.getHours(),t.getMinutes(),t.getSeconds(),t.getMilliseconds()));return e.setUTCFullYear(t.getFullYear()),t.getTime()-e.getTime()}(Y),I=function(t,e){return r(2,arguments),function(t,e){r(2,arguments);var n=a(t).getTime(),i=o(e);return new Date(n+i)}(t,-o(e))}(Y,O),A={firstWeekContainsDate:P,weekStartsOn:W,locale:L,_originalDate:Y};return q.match(H).map((function(t){var e=t[0];return"p"===e||"P"===e?(0,N[e])(t,L.formatLong):t})).join("").match(z).map((function(n){if("''"===n)return"'";var r,a,o=n[0];if("'"===o)return(a=(r=n).match($))?a[1].replace(B,"'"):r;var c,u=T[o];if(u)return null!=i&&i.useAdditionalWeekYearTokens||(c=n,-1===j.indexOf(c))||U(n,e,String(t)),null!=i&&i.useAdditionalDayOfYearTokens||!function(t){return-1!==x.indexOf(t)}(n)||U(n,e,String(t)),u(I,n,L.localize,A);if(o.match(Q))throw new RangeError("Format string contains an unescaped latin alphabet character `"+o+"`");return n})).join("")}Math.pow(10,8);var G=6e4,X=36e5;var J={dateTimeDelimiter:/[T ]/,timeZoneDelimiter:/[Z ]/i,timezone:/([Z+-].*)$/},Z=/^-?(?:(\d{3})|(\d{2})(?:-?(\d{2}))?|W(\d{2})(?:-?(\d{1}))?|)$/,_=/^(\d{2}(?:[.,]\d*)?)(?::?(\d{2}(?:[.,]\d*)?))?(?::?(\d{2}(?:[.,]\d*)?))?$/,V=/^([+-])(\d{2})(?::?(\d{2}))?$/;function K(t){return t?parseInt(t):1}function tt(t){return t&&parseFloat(t.replace(",","."))||0}var et=[31,null,31,30,31,30,31,31,30,31,30,31];function nt(t){return t%400==0||t%4==0&&t%100!=0}function rt(){const t=document.querySelector(".show-items");e("tasks").forEach((e=>{const n=function(t,e){var n;r(1,arguments);var a=o(null!==(n=null==e?void 0:e.additionalDigits)&&void 0!==n?n:2);if(2!==a&&1!==a&&0!==a)throw new RangeError("additionalDigits must be 0, 1 or 2");if("string"!=typeof t&&"[object String]"!==Object.prototype.toString.call(t))return new Date(NaN);var i,c=function(t){var e,n={},r=t.split(J.dateTimeDelimiter);if(r.length>2)return n;if(/:/.test(r[0])?e=r[0]:(n.date=r[0],e=r[1],J.timeZoneDelimiter.test(n.date)&&(n.date=t.split(J.timeZoneDelimiter)[0],e=t.substr(n.date.length,t.length))),e){var a=J.timezone.exec(e);a?(n.time=e.replace(a[1],""),n.timezone=a[1]):n.time=e}return n}(t);if(c.date){var u=function(t,e){var n=new RegExp("^(?:(\\d{4}|[+-]\\d{"+(4+e)+"})|(\\d{2}|[+-]\\d{"+(2+e)+"})$)"),r=t.match(n);if(!r)return{year:NaN,restDateString:""};var a=r[1]?parseInt(r[1]):null,o=r[2]?parseInt(r[2]):null;return{year:null===o?a:100*o,restDateString:t.slice((r[1]||r[2]).length)}}(c.date,a);i=function(t,e){if(null===e)return new Date(NaN);var n=t.match(Z);if(!n)return new Date(NaN);var r=!!n[4],a=K(n[1]),o=K(n[2])-1,i=K(n[3]),c=K(n[4]),u=K(n[5])-1;if(r)return function(t,e,n){return e>=1&&e<=53&&n>=0&&n<=6}(0,c,u)?function(t,e,n){var r=new Date(0);r.setUTCFullYear(t,0,4);var a=7*(e-1)+n+1-(r.getUTCDay()||7);return r.setUTCDate(r.getUTCDate()+a),r}(e,c,u):new Date(NaN);var s=new Date(0);return function(t,e,n){return e>=0&&e<=11&&n>=1&&n<=(et[e]||(nt(t)?29:28))}(e,o,i)&&function(t,e){return e>=1&&e<=(nt(t)?366:365)}(e,a)?(s.setUTCFullYear(e,o,Math.max(a,i)),s):new Date(NaN)}(u.restDateString,u.year)}if(!i||isNaN(i.getTime()))return new Date(NaN);var s,l=i.getTime(),d=0;if(c.time&&(d=function(t){var e=t.match(_);if(!e)return NaN;var n=tt(e[1]),r=tt(e[2]),a=tt(e[3]);return function(t,e,n){return 24===t?0===e&&0===n:n>=0&&n<60&&e>=0&&e<60&&t>=0&&t<25}(n,r,a)?n*X+r*G+1e3*a:NaN}(c.time),isNaN(d)))return new Date(NaN);if(!c.timezone){var m=new Date(l+d),f=new Date(0);return f.setFullYear(m.getUTCFullYear(),m.getUTCMonth(),m.getUTCDate()),f.setHours(m.getUTCHours(),m.getUTCMinutes(),m.getUTCSeconds(),m.getUTCMilliseconds()),f}return s=function(t){if("Z"===t)return 0;var e=t.match(V);if(!e)return 0;var n="+"===e[1]?-1:1,r=parseInt(e[2]),a=e[3]&&parseInt(e[3])||0;return function(t,e){return e>=0&&e<=59}(0,a)?n*(r*X+a*G):NaN}(c.timezone),isNaN(s)?new Date(NaN):new Date(l+d+s)}(e.dueDate);return!(e.completed||!function(t){const e=function(t,e){r(2,arguments);var n=a(t),i=o(e);return isNaN(i)?new Date(NaN):i?(n.setDate(n.getDate()+i),n):n}(new Date,8);return function(t,e){r(2,arguments);var n=a(t).getTime(),o=a(e.start).getTime(),i=a(e.end).getTime();if(!(o<=i))throw new RangeError("Invalid interval");return n>=o&&n<=i}(t,{start:new Date,end:e})}(n)||(t.appendChild(yt(e)),0))}))}function at(t,e){t.forEach((n=>{if(n.id==e){let e=t.indexOf(n);t.splice(e,1)}}))}function ot(t,e){return t.find((t=>t.id==e))}localStorage.getItem("tasks")&&e("tasks");let it=localStorage.getItem("projects")?e("projects"):[],ct=Number(localStorage.getItem("projectId"));function ut(t){const e=document.createElement("li");return e.classList.add("project-list-item"),e.id=t.id,e.textContent=t.title,e}function st(t){const e=document.createElement("div");e.classList.add("project-container"),e.id=t.id;const n=document.createElement("p");n.textContent=t.title;const r=document.createElement("button");r.classList.add("edit-project-btn"),r.textContent="Edit";const a=document.createElement("button");return a.classList.add("delete-project-btn"),a.textContent="Delete",e.append(n,r,a),e}function lt(e){e.preventDefault();const n=document.querySelector(".project-content"),r=ct;ct++;const a={id:r,title:document.querySelector("#project-title").value,taskList:[]};it.push(a),t("projects",it),localStorage.setItem("projectId",ct),n.insertBefore(ut(a),n.lastElementChild),jt("new-project"),Ut("new-project-form"),ft(),dt()}function dt(){const t=document.querySelector(".project-content");t.textContent="PROJECTS",it.forEach((e=>{t.appendChild(ut(e))})),document.querySelectorAll(".project-list-item").forEach((t=>{t.addEventListener("click",(()=>{mt(ot(it,t.id),t)}))}))}function mt(t,e){const n=document.querySelector(".show-items");Pt(),Lt("new-task-btn"),Wt(`.project-list-item[id="${e.id}"]`),n.appendChild(st(t)),function(t){const e=document.querySelector(".show-items");ht.forEach((n=>{n.projectId==t.id&&e.appendChild(yt(n))}))}(t)}function ft(){const t=document.querySelector("#new-project-btn");"block"==document.querySelector("#new-project").style.display?t.style.display="none":t.style.display="block"}let ht=localStorage.getItem("tasks")?e("tasks"):[],gt=Number(localStorage.getItem("taskId"))||0,vt=localStorage.getItem("projects")?e("projects"):[];function yt(t){const e=document.createElement("div");e.classList.add("task-container"),e.id=t.id;const n=document.createElement("div");n.classList.add("coll-primary");const r=document.createElement("span");r.classList.add("task-container-title"),r.textContent=`${t.title}`;const a=document.createElement("div");a.classList.add("task-container-right");const o=document.createElement("div");o.classList.add("coll-content");const i=document.createElement("p");i.classList.add("task-container-description","tc-element"),i.textContent=`${t.description}`,o.appendChild(i);const c=document.createElement("p");var u;c.classList.add("task-container-date","tc-element"),t.dueDate?c.textContent=`Due on ${u=t.dueDate,u.slice(0,10).split("-").reverse().join("/")}`:c.textContent="No due date";const s=document.createElement("p");s.classList.add("task-container-priority","tc-element"),s.textContent=`Priority: ${t.priority}`;const l=document.createElement("i");if(l.classList.add("task-container-arrow","tc-element"),t.completed){const t=document.createElement("button");t.classList.add("unmark-complete-btn"),t.textContent="Unmark completed";const i=document.createElement("button");i.classList.add("delete-btn"),i.textContent="Delete",a.append(c,s,i,l),n.append(t,r,a),e.append(n,o)}else{const t=document.createElement("button");t.classList.add("complete-btn","tc-element"),t.textContent="Mark completed";const i=document.createElement("button");i.classList.add("edit-task-btn","tc-element"),i.textContent="Edit";const u=document.createElement("button");u.classList.add("delete-task-btn","tc-element"),u.textContent="Delete",a.append(c,s,i,u,l),n.append(t,r,a),e.append(n,o)}return e}function pt(n){n.preventDefault();const r=document.querySelector(".show-items"),a=gt;gt++;const o=document.querySelector("#task-title").value,i=document.querySelector("#task-description").value,c=document.querySelector("#task-duedate").value,u=document.querySelector('input[type="radio"]:checked').value;let s="",l="";const d=document.getElementsByClassName("project-list-item active");d.length>0&&(s=function(){const t=document.querySelectorAll(".project-list-item");return Array.from(t).filter((t=>t.classList.contains("active")))}()[0],l=ot(JSON.parse(localStorage.getItem("projects")),s.id));const m=function(t,e,n,r,a,o,i){return{id:t,title:e,description:n,dueDate:r,priority:a,completed:!1,projectId:i}}(a,o,i,c,u,0,s.id);d.length>0&&(vt=e("projects"),ot(vt,s.id).taskList.push(m.id),t("projects",vt)),ht.push(m),St(),t("tasks",ht),localStorage.setItem("taskId",gt),r.appendChild(yt(m)),jt("new-task"),Ut("new-task-form"),d.length>0?mt(s,l):wt()}function wt(){Pt(),Lt("new-task-btn"),Wt("#time-active");const t=document.querySelector(".show-items");ht.forEach((e=>{e.completed||t.appendChild(yt(e))})),function(){const t=document.querySelector("#new-task-btn"),e=document.querySelector("#new-task-form"),n=e.querySelector("#cancel-task-btn");t.addEventListener("click",(()=>{xt("new-task"),n.addEventListener("click",(()=>{jt("new-task")}),{once:!0}),e.addEventListener("submit",pt,{once:!0})}))}(),Ct()}function bt(t){Pt(),Wt(`#${t}-priority`),function(t){const n=document.querySelector(".show-items");e("tasks").forEach((e=>{e.completed||e.priority!==`${t}`||n.appendChild(yt(e))}))}(`${t}`)}function kt(e,n){const r=e.target.closest(".task-container").id;ot(ht,r).completed=n,e.target.closest(".task-container").remove(),t("tasks",ht)}function St(){ht.sort((function(t,e){return new Date(t.dueDate)-new Date(e.dueDate)}))}function Ct(){const t=document.getElementsByClassName("task-container");for(let e=0;e<t.length;e++)t[e].addEventListener("click",(function(){this.classList.toggle("coll-active");let t=this.children[1];"block"===t.style.display?t.style.display="none":t.style.display="block"}))}localStorage.getItem("stickies")&&e("stickies");let Dt=localStorage.getItem("stickies")?e("stickies"):[],Tt=Number(localStorage.getItem("stickyId"));function Et(t){const e=document.createElement("div");e.classList.add("sticky-container"),e.id=t.id;const n=document.createElement("p");n.classList.add("sticky-container-title"),n.textContent=`${t.title}`;const r=document.createElement("p");r.classList.add("sticky-container-content"),r.textContent=`${t.content}`;const a=document.createElement("button");a.classList.add("edit-sticky-btn"),a.textContent="Edit";const o=document.createElement("button");return o.classList.add("delete-sticky-btn"),o.textContent="Delete",e.append(n,r,a,o),e}function qt(){Pt(),Wt("#sticky-wall");const t=document.querySelector(".show-items");Dt.forEach((e=>{e.completed||t.appendChild(Et(e))})),function(){const t=document.querySelector("#new-sticky-btn"),e=document.querySelector("#new-sticky-form"),n=e.querySelector("#cancel-sticky-btn");t.addEventListener("click",(()=>{xt("new-sticky"),n.addEventListener("click",(()=>{jt("new-sticky")}),{once:!0}),e.addEventListener("submit",Mt,{once:!0})}))}(),Nt()}function Mt(e){e.preventDefault();const n=document.querySelector(".show-items"),r=Tt;Tt++;const a={id:r,title:document.querySelector("#sticky-title").value,content:document.querySelector("#sticky-content").value};Dt.push(a),t("stickies",Dt),localStorage.setItem("stickyId",Tt),n.appendChild(Et(a)),jt("new-sticky"),Ut("new-sticky-form"),qt()}function Nt(){const t=["#fcf4dd","#ddedea","#fce1e4","#e8dff5","#daeaf6"],e=document.querySelectorAll(".sticky-container");let n=0;e.forEach((e=>{e.style.backgroundColor=t[n],n===t.length-1?n=0:n++}))}function xt(t){document.querySelector(`#${t}`).style.display="block"}function jt(t){document.querySelector(`#${t}`).style.display="none"}function Ut(t){document.querySelector(`#${t}`).reset()}function Lt(t){document.querySelector(".main-screen").querySelectorAll("button").forEach((e=>{e.id===`${t}`?e.style.display="block":e.style.display="none"}))}function Pt(){document.querySelector(".show-items").textContent=""}function Wt(t){document.querySelector(".active")&&document.querySelector(".active").classList.remove("active"),document.querySelector(`${t}`).classList.add("active")}Wt("#time-active"),document.querySelector(".container").addEventListener("click",(function(n){const r=n.target.matches(".delete-task-btn"),a=n.target.matches(".edit-task-btn"),o=n.target.matches(".complete-btn"),i=n.target.matches(".unmark-complete-btn"),c=n.target.matches("#time-today"),u=n.target.matches("#time-upcoming"),s=n.target.matches("#time-active"),l=n.target.matches("#new-project-btn"),d=n.target.matches(".delete-project-btn"),m=n.target.matches(".edit-project-btn"),f=n.target.matches("#sticky-wall"),h=n.target.matches(".delete-sticky-btn"),g=n.target.matches(".edit-sticky-btn"),v=n.target.matches("#completed"),y=n.target.matches("#low-priority"),p=n.target.matches("#medium-priority"),w=n.target.matches("#high-priority");if(r)!function(e){const n=document.querySelectorAll(".task-container");let r=Array.from(n);const a=e.target.closest(".task-container").id;let o=ot(r,a),i=ot(ht,a),c="",u="";e.target.closest(".task-container").remove(),r=r.filter((t=>t!=o)),at(ht,a),t("tasks",ht),i.projectId>=0&&(c=i.projectId,u=ot(vt,c),function(e,n){for(let r=0;r<n.taskList.length;r++)e==n.taskList[r]&&(n.taskList.splice(r,1),t("projects",it))}(a,u))}(n);else if(a)!function(e){const n=e.target.closest(".task-container").id;let r=ot(ht,n);var a;document.querySelector("#edit-task-form").querySelector("#cancel-edit-btn").addEventListener("click",(()=>{jt("edit-task")}),{once:!0}),xt("edit-task"),function(t){const e=document.querySelector("#edit-task-title"),n=document.querySelector("#edit-task-description"),r=document.querySelector("#edit-task-duedate"),a=document.querySelectorAll('input[type="radio"]');e.value=t.title,n.value=t.description,r.value=t.dueDate,a.forEach((e=>{t.priority==e.value&&(e.checked=!0)}))}(r),a=r,document.querySelector("#edit-task-form").addEventListener("submit",(e=>{e.preventDefault();const n=document.querySelector("#edit-task-title").value,r=document.querySelector("#edit-task-description").value,o=document.querySelector("#edit-task-duedate").value;let i="";document.querySelectorAll('input[type="radio"]').forEach((t=>{t.checked&&(i=t.value)})),a.title=n,a.description=r,a.dueDate=o,a.priority=i,t("tasks",ht),St(),jt("edit-task"),wt()}),{once:!0})}(n);else if(o)kt(n,!0);else if(i)kt(n,!1);else if(c)Lt("new-task-btn"),Pt(),Wt("#time-today"),function(){const t=document.querySelector(".show-items"),n=Date.parse(R(new Date,"yyyy-MM-dd"));e("tasks").forEach((e=>{const r=Date.parse(e.dueDate);return n===r&&(t.appendChild(yt(e)),!0)}))}();else if(s)Lt("new-task-btn"),wt();else if(u)Lt("new-task-btn"),Pt(),Wt("#time-upcoming"),rt();else if(v)Lt("new-task-btn"),Pt(),Wt("#completed"),function(){const t=document.querySelector(".show-items");e("tasks").forEach((e=>{e.completed&&t.appendChild(yt(e))}))}(),Ct();else if(y)Lt("new-task-btn"),bt("low");else if(p)Lt("new-task-btn"),bt("medium");else if(w)Lt("new-task-btn"),bt("high");else if(f)Lt("new-sticky-btn"),qt();else if(h)!function(e){const n=document.querySelectorAll(".sticky-container");let r=Array.from(n);const a=e.target.parentNode.id;let o=ot(r,a);e.target.parentNode.remove(),r=r.filter((t=>t!=o)),at(Dt,a),t("stickies",Dt),Nt()}(n);else if(g)!function(e){const n=e.target.parentNode.id;let r=ot(Dt,n);var a;document.querySelector("#edit-sticky-form").querySelector("#cancel-edit-btn").addEventListener("click",(()=>{jt("edit-sticky")}),{once:!0}),xt("edit-sticky"),function(t){const e=document.querySelector("#edit-sticky-title"),n=document.querySelector("#edit-sticky-content");e.value=t.title,n.value=t.content}(r),a=r,document.querySelector("#edit-sticky-form").addEventListener("submit",(e=>{e.preventDefault();const n=document.querySelector("#edit-sticky-title").value,r=document.querySelector("#edit-sticky-content").value;a.title=n,a.content=r,t("stickies",Dt),jt("edit-sticky"),qt()}),{once:!0})}(n);else if(l)!function(){const t=document.querySelector("#new-project-form"),e=t.querySelector("#cancel-project-btn");xt("new-project"),ft(),e.addEventListener("click",(()=>{jt("new-project"),ft()}),{once:!0}),t.addEventListener("submit",lt,{once:!0})}();else if(d)!function(e){const n=document.querySelectorAll(".project-list-item");let r=Array.from(n);const a=e.target.parentNode.id;let o=ot(r,a),i=ot(it,a);e.target.parentNode.remove(),r=r.filter((t=>t!=o)),function(e){ht=ht.filter((t=>t.projectId!=e.id)),t("tasks",ht)}(i),at(it,a),t("projects",it),Pt(),dt(),wt()}(n);else{if(!m)return;!function(e){const n=e.target.parentNode.id;let r=ot(it,n);var a;document.querySelector("#edit-project-form").querySelector("#cancel-edit-btn").addEventListener("click",(()=>{jt("edit-project")}),{once:!0}),xt("edit-project"),a=r,document.querySelector("#edit-project-title").value=a.title,function(e){document.querySelector("#edit-project-form").addEventListener("submit",(n=>{n.preventDefault();const r=document.querySelector("#edit-project-title").value;e.title=r,t("projects",it),jt("edit-project"),function(t){const e=document.querySelector(".show-items");Pt(),e.appendChild(st(t))}(e),dt()}),{once:!0})}(r)}(n)}})),wt(),dt()})();