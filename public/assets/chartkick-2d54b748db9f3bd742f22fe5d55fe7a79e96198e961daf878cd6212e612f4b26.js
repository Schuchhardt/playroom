!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t=t||self).Chartkick=e()}(this,(function(){"use strict";function t(t){return"[object Array]"===Object.prototype.toString.call(t)}function e(t){return t instanceof Function}function n(t){return"[object Object]"===Object.prototype.toString.call(t)&&!e(t)&&t instanceof Object}function r(e,o){var a;for(a in o)"__proto__"!==a&&(n(o[a])||t(o[a])?(n(o[a])&&!n(e[a])&&(e[a]={}),t(o[a])&&!t(e[a])&&(e[a]=[]),r(e[a],o[a])):void 0!==o[a]&&(e[a]=o[a]))}function o(t,e){var n={};return r(n,t),r(n,e),n}function a(t){var e,n,r,o,a,i,s,l,c,p,u;return"[object Date]"===(p=Object.prototype.toString.call(t))?t:"[object String]"===p&&(r=t.match(Z))?(u=parseInt(r[1],10),i=parseInt(r[3],10)-1,e=parseInt(r[5],10),n=parseInt(r[7],10),a=r[9]?parseInt(r[9],10):0,c=r[11]?parseInt(r[11],10):0,o=r[12]?1e3*parseFloat(q+r[12].slice(1)):0,l=Date.UTC(u,i,e,n,a,c,o),r[13]&&r[14]&&(s=60*r[15],r[17]&&(s+=parseInt(r[17],10)),l-=60*(s*="-"===r[14]?-1:1)*1e3),new Date(l)):void 0}function i(t){var e,n,r;for(e=0;e<t.length;e++)for(r=t[e].data,n=0;n<r.length;n++)if(r[n][1]<0)return!0;return!1}function s(t){return""+t}function l(t){return parseFloat(t)}function c(t){var e,n,r,o;if("object"!=typeof t)if("number"==typeof t)t=new Date(1e3*t);else{if(e=(t=s(t)).match(Y))return n=parseInt(e[1],10),r=parseInt(e[3],10)-1,o=parseInt(e[5],10),new Date(n,r,o);var i=t.replace(/ /,"T").replace(" ","").replace("UTC","Z");t=a(i)||new Date(t)}return t}function p(e){if(!t(e)){var n,r=[];for(n in e)e.hasOwnProperty(n)&&r.push([n,e[n]]);e=r}return e}function u(t,e,n,r,a,s,l,c){return function(p,u,d){var h=p.data,f=o({},t);return f=o(f,d||{}),(p.hideLegend||"legend"in u)&&e(f,u.legend,p.hideLegend),u.title&&n(f,u.title),"min"in u?r(f,u.min):i(h)||r(f,0),u.max&&a(f,u.max),"stacked"in u&&s(f,u.stacked),u.colors&&(f.colors=u.colors),u.xtitle&&l(f,u.xtitle),u.ytitle&&c(f,u.ytitle),f=o(f,u.library||{})}}function d(t,e){return t[0].getTime()-e[0].getTime()}function h(t,e){return t[0]-e[0]}function f(t,e){return t-e}function y(t){return 0===t.getMilliseconds()&&0===t.getSeconds()}function m(t){return y(t)&&0===t.getMinutes()}function g(t){return m(t)&&0===t.getHours()}function z(t,e){return g(t)&&t.getDay()===e}function v(t){return g(t)&&1===t.getDate()}function x(t){return v(t)&&0===t.getMonth()}function b(t){return!isNaN(c(t))&&s(t).length>=6}function M(t){return"number"==typeof t}function w(t,e,n,r){t=t||"",n.prefix&&(e<0&&(e*=-1,t+="-"),t+=n.prefix);var o=n.suffix||"",a=n.precision,i=n.round;if(n.byteScale){var l,c=r?n.byteScale:e;c>=0x1000000000000000?(e/=0x1000000000000000,l=6):c>=0x4000000000000?(e/=0x4000000000000,l=5):c>=1099511627776?(e/=1099511627776,l=4):c>=1073741824?(e/=1073741824,l=3):c>=1048576?(e/=1048576,l=2):c>=1024?(e/=1024,l=1):l=0,void 0===a&&void 0===i&&(e>=1023.5&&l<$.length-1&&(e=1,l+=1),a=e>=1e3?4:3),o=" "+$[l]}if(void 0!==a&&void 0!==i)throw Error("Use either round or precision, not both");if(!r&&(void 0!==a&&(e=e.toPrecision(a),n.zeros||(e=parseFloat(e))),void 0!==i))if(i<0){var p=Math.pow(10,-1*i);e=parseInt((1*e/p).toFixed(0))*p}else e=e.toFixed(i),n.zeros||(e=parseFloat(e));if(n.thousands||n.decimal){var u=(e=s(e)).split(".");e=u[0],n.thousands&&(e=e.replace(/\B(?=(\d{3})+(?!\d))/g,n.thousands)),u.length>1&&(e+=(n.decimal||".")+u[1])}return t+e+o}function C(t,e,n){return n in e?e[n]:n in t.options?t.options[n]:null}function A(t){var e,n,r;for(e=0;e<t.length;e++)for(r=t[e].data,n=0;n<r.length;n++)if(0!=r[n][1])return!1;return!0}function _(t,e,n){Ft.push([t,e,n]),k()}function k(){if(Rt<Ht){var t=Ft.shift();t&&(Rt++,T(t[0],t[1],t[2]),k())}}function S(){Rt--,k()}function T(t,e,n){D(t,e,(function(t,e,r){var o="string"==typeof r?r:r.message;n(o)}))}function D(t,e,n){var r=window.jQuery||window.Zepto||window.$;if(r&&r.ajax)r.ajax({dataType:"json",url:t,success:e,error:n,complete:S});else{var o=new XMLHttpRequest;o.open("GET",t,!0),o.setRequestHeader("Content-Type","application/json"),o.onload=function(){S(),200===o.status?e(JSON.parse(o.responseText),o.statusText,o):n(o,"error",o.statusText)},o.send()}}function L(t,e){document.body.innerText?t.innerText=e:t.textContent=e}function O(t,e,n){n||(e="Error Loading Chart: "+e),L(t,e),t.style.color="#ff0000"}function E(t){try{t.__render()}catch(e){throw O(t.element,e.message),e}}function j(t,e){if("string"==typeof e)_(e,(function(e){t.rawData=e,E(t)}),(function(e){O(t.element,e)}));else if("function"==typeof e)try{e((function(e){t.rawData=e,E(t)}),(function(e){O(t.element,e,!0)}))}catch(e){O(t.element,e,!0)}else t.rawData=e,E(t)}function B(t){var e=t.element,n=document.createElement("a"),r=t.options.download;!0===r?r={}:"string"==typeof r&&(r={filename:r}),n.download=r.filename||"chart.png",n.style.position="absolute",n.style.top="20px",n.style.right="20px",n.style.zIndex=1e3,n.style.lineHeight="20px",n.target="_blank";var o=document.createElement("img");o.alt="Download",o.style.border="none",o.src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAABCFBMVEUAAADMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMywEsqxAAAAV3RSTlMAAQIDBggJCgsMDQ4PERQaHB0eISIjJCouLzE0OTo/QUJHSUpLTU5PUllhYmltcHh5foWLjI+SlaCio6atr7S1t7m6vsHHyM7R2tze5Obo7fHz9ff5+/1hlxK2AAAA30lEQVQYGUXBhVYCQQBA0TdYWAt2d3d3YWAHyur7/z9xgD16Lw0DW+XKx+1GgX+FRzM3HWQWrHl5N/oapW5RPe0PkBu+UYeICvozTWZVK23Ao04B79oJrOsJDOoxkZoQPWgX29pHpCZEk7rEvQYiNSFq1UMqvlCjJkRBS1R8hb00Vb/TajtBL7nTHE1X1vyMQF732dQhyF2o6SAwrzP06iUQzvwsArlnzcOdrgBhJyHa1QOgO9U1GsKuvjUTjavliZYQ8nNPapG6sap/3nrIdJ6bOWzmX/fy0XVpfzZP3S8OJT3g9EEiJwAAAABJRU5ErkJggg==",n.appendChild(o),e.style.position="relative",t.__downloadAttached=!0,t.__enterEvent=I(e,"mouseover",(function(o){var a=o.relatedTarget;a&&(a===this||F(this,a))||!t.options.download||(n.href=t.toImage(r),e.appendChild(n))})),t.__leaveEvent=I(e,"mouseout",(function(t){var e=t.relatedTarget;e&&(e===this||F(this,e))||n.parentNode&&n.parentNode.removeChild(n)}))}function I(t,e,n){if(t.addEventListener)return t.addEventListener(e,n,!1),n;var r=function(){return n.call(t,window.event)};return t.attachEvent("on"+e,r),r}function N(t,e,n){t.removeEventListener?t.removeEventListener(e,n,!1):t.detachEvent("on"+e,n)}function F(t,e){if(t===e)return!1;for(;e&&e!==t;)e=e.parentNode;return e===t}function R(t){if(t){if("Highcharts"===t.product)return Ct;if(t.charts)return Nt;if(e(t))return zt}throw new Error("Unknown adapter")}function H(t){var e=new(R(t))(t);-1===Ut.indexOf(e)&&Ut.push(e)}function P(){"Chart"in window&&H(window.Chart),"Highcharts"in window&&H(window.Highcharts),window.google&&window.google.charts&&H(window.google)}function U(t,e){if("PieChart"===e||"GeoChart"===e||"Timeline"===e)return 0===t.length;for(var n=0;n<t.length;n++)if(t[n].data.length>0)return!1;return!0}function W(t,e){e.options.messages&&e.options.messages.empty&&U(e.data,t)?L(e.element,e.options.messages.empty):(Q(t,e),e.options.download&&!e.__downloadAttached&&"chartjs"===e.adapter&&B(e))}function Q(t,n){var r,o,a,i;for(a="render"+t,i=n.options.adapter,P(),r=0;r<Ut.length;r++)if(o=Ut[r],(!i||i===o.name)&&e(o[a]))return n.adapter=o.name,n.__adapterObject=o,o[a](n);throw Ut.length>0?new Error("No charting library found for "+t):new Error("No charting libraries found - be sure to include one before your charts")}function V(t,e,n){return U(t)?!n.xmin&&!n.xmax||n.xmin&&!b(n.xmin)||n.xmax&&!b(n.xmax)?"number":"datetime":J(t,M)?"number":!e&&J(t,b)?"datetime":"string"}function J(t,e){var n,r,o;for(n=0;n<t.length;n++)for(o=p(t[n].data),r=0;r<o.length;r++)if(!e(o[r][0]))return!1;return!0}function G(t){var e,n,r=[];for(e=0;e<t.length;e++){var o={};for(n in t[e])t[e].hasOwnProperty(n)&&(o[n]=t[e][n]);r.push(o)}return r}function K(e,n,r){var o,a=e.options,i=e.rawData;for(!t(i)||"object"!=typeof i[0]||t(i[0])?(i=[{name:a.label,data:i}],e.hideLegend=!0):e.hideLegend=!1,i=G(i),o=0;o<i.length;o++)i[o].data=p(i[o].data);for(e.xtype=n||(a.discrete?"string":V(i,r,a)),o=0;o<i.length;o++)i[o].data=Qt(i[o].data,e.xtype);return i}function X(t){var e,n=p(t.rawData);for(e=0;e<n.length;e++)n[e]=[s(n[e][0]),l(n[e][1])];return n}var Y=/^(\d\d\d\d)(-)?(\d\d)(-)?(\d\d)$/i,Z=/(\d\d\d\d)(-)?(\d\d)(-)?(\d\d)(T)?(\d\d)(:)?(\d\d)?(:)?(\d\d)?([.,]\d+)?($|Z|([+-])(\d\d)(:)?(\d\d)?)/i,q=String(1.5).charAt(1),$=["bytes","KB","MB","GB","TB","PB","EB"],tt={maintainAspectRatio:!1,animation:!1,tooltips:{displayColors:!1,callbacks:{}},legend:{},title:{fontSize:20,fontColor:"#333"}},et={scales:{yAxes:[{ticks:{maxTicksLimit:4},scaleLabel:{fontSize:16,fontColor:"#333"}}],xAxes:[{gridLines:{drawOnChartArea:!1},scaleLabel:{fontSize:16,fontColor:"#333"},time:{},ticks:{}}]}},nt=["#3366CC","#DC3912","#FF9900","#109618","#990099","#3B3EAC","#0099C6","#DD4477","#66AA00","#B82E2E","#316395","#994499","#22AA99","#AAAA11","#6633CC","#E67300","#8B0707","#329262","#5574A6","#651067"],rt=function(t,e,n){void 0!==e?(t.legend.display=!!e,e&&!0!==e&&(t.legend.position=e)):n&&(t.legend.display=!1)},ot=function(t,e){t.title.display=!0,t.title.text=e},at=function(t,e){null!==e&&(t.scales.yAxes[0].ticks.min=l(e))},it=function(t,e){t.scales.yAxes[0].ticks.max=l(e)},st=function(t,e){null!==e&&(t.scales.xAxes[0].ticks.min=l(e))},lt=function(t,e){t.scales.xAxes[0].ticks.max=l(e)},ct=function(t,e){t.scales.xAxes[0].stacked=!!e,t.scales.yAxes[0].stacked=!!e},pt=function(t,e){t.scales.xAxes[0].scaleLabel.display=!0,t.scales.xAxes[0].scaleLabel.labelString=e},ut=function(t,e){t.scales.yAxes[0].scaleLabel.display=!0,t.scales.yAxes[0].scaleLabel.labelString=e},dt=function(t,e){var n=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t);return n?"rgba("+parseInt(n[1],16)+", "+parseInt(n[2],16)+", "+parseInt(n[3],16)+", "+e+")":t},ht=function(t){return null!=t},ft=function(t,e,n){var r=Math.ceil(t.element.offsetWidth/4/e.labels.length);r>25?r=25:r<10&&(r=10),n.scales.xAxes[0].ticks.callback||(n.scales.xAxes[0].ticks.callback=function(t){return(t=s(t)).length>r?t.substring(0,r-2)+"...":t})},yt=function(e,n,r){var o={prefix:e.options.prefix,suffix:e.options.suffix,thousands:e.options.thousands,decimal:e.options.decimal,precision:e.options.precision,round:e.options.round,zeros:e.options.zeros};if(e.options.bytes){var a=e.data;"pie"===r&&(a=[{data:a}]);for(var i=0,s=0;s<a.length;s++)for(var l=a[s],c=0;c<l.data.length;c++)l.data[c][1]>i&&(i=l.data[c][1]);for(var p=1;i>=1024;)p*=1024,i/=1024;o.byteScale=p}if("pie"!==r){var u=n.scales.yAxes;"bar"===r&&(u=n.scales.xAxes),o.byteScale&&(u[0].ticks.stepSize||(u[0].ticks.stepSize=o.byteScale/2),u[0].ticks.maxTicksLimit||(u[0].ticks.maxTicksLimit=4)),u[0].ticks.callback||(u[0].ticks.callback=function(t){return w("",t,o,!0)})}if(!n.tooltips.callbacks.label)if("scatter"===r)n.tooltips.callbacks.label=function(t,e){var n=e.datasets[t.datasetIndex].label||"";return n&&(n+=": "),n+"("+t.xLabel+", "+t.yLabel+")"};else if("bubble"===r)n.tooltips.callbacks.label=function(t,e){var n=e.datasets[t.datasetIndex].label||"";n&&(n+=": ");var r=e.datasets[t.datasetIndex].data[t.index];return n+"("+t.xLabel+", "+t.yLabel+", "+r.v+")"};else if("pie"===r)n.tooltips.callbacks.label=function(e,n){var r=n.labels[e.index],a=": ";return t(r)?(r=r.slice())[0]+=a:r+=a,w(r,n.datasets[e.datasetIndex].data[e.index],o)};else{var d="bar"===r?"xLabel":"yLabel";n.tooltips.callbacks.label=function(t,e){var n=e.datasets[t.datasetIndex].label||"";return n&&(n+=": "),w(n,t[d],o)}}},mt=u(o(tt,et),rt,ot,at,it,ct,pt,ut),gt=function(t,e,n,r){var a,i=[],s=[],p=t.options.colors||nt,u=!0,d=!0,h=!0,b=!0,M=!0,w=!0,A=t.data,_=0;if("bubble"===n)for(var k=0;k<A.length;k++)for(var S=A[k],T=0;T<S.data.length;T++)S.data[T][2]>_&&(_=S.data[T][2]);var D,L,O,E,j,B=[],I=[];if("bar"===n||"column"===n||"number"!==t.xtype&&"bubble"!==t.xtype){var N,F,R=[];for(D=0;D<A.length;D++)for(O=A[D],L=0;L<O.data.length;L++)E=O.data[L],B[j="datetime"==t.xtype?E[0].getTime():E[0]]||(B[j]=new Array(A.length)),B[j][D]=l(E[1]),-1===R.indexOf(j)&&R.push(j);for("datetime"!==t.xtype&&"number"!==t.xtype||R.sort(f),L=0;L<A.length;L++)I.push([]);for(F=0;F<R.length;F++)for(D=R[F],"datetime"===t.xtype?(N=new Date(l(D)),u=u&&g(N),a||(a=N.getDay()),d=d&&z(N,a),h=h&&v(N),b=b&&x(N),M=M&&m(N),w=w&&y(N)):N=D,s.push(N),L=0;L<A.length;L++)I[L].push(void 0===B[D][L]?null:B[D][L])}else for(var H=0;H<A.length;H++){for(var P=A[H],U=[],W=0;W<P.data.length;W++){var Q={x:l(P.data[W][0]),y:l(P.data[W][1])};"bubble"===n&&(Q.r=20*l(P.data[W][2])/_,Q.v=P.data[W][2]),U.push(Q)}I.push(U)}for(D=0;D<A.length;D++){var V=(O=A[D]).color||p[D],J="line"!==n?dt(V,.5):V,G={label:O.name||"",data:I[D],fill:"area"===n,borderColor:V,backgroundColor:J,pointBackgroundColor:V,borderWidth:2,pointHoverBackgroundColor:V};O.stack&&(G.stack=O.stack),!1===C(t,O,"curve")&&(G.lineTension=0),!1===C(t,O,"points")&&(G.pointRadius=0,G.pointHitRadius=5),G=o(G,t.options.dataset||{}),G=o(G,O.library||{}),G=o(G,O.dataset||{}),i.push(G)}var K=t.options.xmin,X=t.options.xmax;if("datetime"===t.xtype){var Y="math"in r.helpers?"ticks":"time";ht(K)&&(e.scales.xAxes[0][Y].min=c(K).getTime()),ht(X)&&(e.scales.xAxes[0][Y].max=c(X).getTime())}else"number"===t.xtype&&(ht(K)&&(e.scales.xAxes[0].ticks.min=K),ht(X)&&(e.scales.xAxes[0].ticks.max=X));if("datetime"===t.xtype&&0===s.length&&(ht(K)&&s.push(c(K)),ht(X)&&s.push(c(X)),u=!1,d=!1,h=!1,b=!1,M=!1,w=!1),"datetime"===t.xtype&&s.length>0){var Z=(ht(K)?c(K):s[0]).getTime(),q=(ht(X)?c(X):s[0]).getTime();for(D=1;D<s.length;D++){var $=s[D].getTime();$<Z&&(Z=$),$>q&&(q=$)}var tt,et=(q-Z)/864e5;if(!e.scales.xAxes[0].time.unit)if(b||et>3650?(e.scales.xAxes[0].time.unit="year",tt=365):h||et>300?(e.scales.xAxes[0].time.unit="month",tt=30):u||et>10?(e.scales.xAxes[0].time.unit="day",tt=1):M||et>.5?(e.scales.xAxes[0].time.displayFormats={hour:"MMM D, h a"},e.scales.xAxes[0].time.unit="hour",tt=1/24):w&&(e.scales.xAxes[0].time.displayFormats={minute:"h:mm a"},e.scales.xAxes[0].time.unit="minute",tt=1/24/60),tt&&et>0){var rt=Math.ceil(et/tt/(t.element.offsetWidth/100));d&&1===tt&&(rt=7*Math.ceil(rt/7)),e.scales.xAxes[0].time.unitStepSize=rt}e.scales.xAxes[0].time.tooltipFormat||(u?e.scales.xAxes[0].time.tooltipFormat="ll":M?e.scales.xAxes[0].time.tooltipFormat="MMM D, h a":w&&(e.scales.xAxes[0].time.tooltipFormat="h:mm a"))}return{labels:s,datasets:i}},zt=function(t){this.name="chartjs",this.library=t};zt.prototype.renderLineChart=function(t,e){var n={};!t.options.max&&A(t.data)&&(n.max=1);var r=mt(t,o(n,t.options));yt(t,r,e);var a=gt(t,r,e||"line",this.library);"number"===t.xtype?(r.scales.xAxes[0].type="linear",r.scales.xAxes[0].position="bottom"):r.scales.xAxes[0].type="string"===t.xtype?"category":"time",this.drawChart(t,"line",a,r)},zt.prototype.renderPieChart=function(t){var e=o({},tt);t.options.donut&&(e.cutoutPercentage=50),"legend"in t.options&&rt(e,t.options.legend),t.options.title&&ot(e,t.options.title),e=o(e,t.options.library||{}),yt(t,e,"pie");for(var n=[],r=[],a=0;a<t.data.length;a++){var i=t.data[a];n.push(i[0]),r.push(i[1])}var s={data:r,backgroundColor:t.options.colors||nt},l={labels:n,datasets:[s=o(s,t.options.dataset||{})]};this.drawChart(t,"pie",l,e)},zt.prototype.renderColumnChart=function(t,e){var n;if("bar"===e){var r=o(tt,et);delete r.scales.yAxes[0].ticks.maxTicksLimit,n=u(r,rt,ot,st,lt,ct,pt,ut)(t,t.options)}else n=mt(t,t.options);yt(t,n,e);var a=gt(t,n,"column",this.library);"bar"!==e&&ft(t,a,n),this.drawChart(t,"bar"===e?"horizontalBar":"bar",a,n)},zt.prototype.renderAreaChart=function(t){this.renderLineChart(t,"area")},zt.prototype.renderBarChart=function(t){this.renderColumnChart(t,"bar")},zt.prototype.renderScatterChart=function(t,e){e=e||"scatter";var n=mt(t,t.options);yt(t,n,e),"showLines"in n||(n.showLines=!1);var r=gt(t,n,e,this.library);n.scales.xAxes[0].type="linear",n.scales.xAxes[0].position="bottom",this.drawChart(t,e,r,n)},zt.prototype.renderBubbleChart=function(t){this.renderScatterChart(t,"bubble")},zt.prototype.destroy=function(t){t.chart&&t.chart.destroy()},zt.prototype.drawChart=function(t,e,n,r){this.destroy(t);var o={type:e,data:n,options:r};t.options.code&&window.console.log("new Chart(ctx, "+JSON.stringify(o)+");"),t.element.innerHTML="<canvas></canvas>";var a=t.element.getElementsByTagName("CANVAS")[0];t.chart=new this.library(a,o)};var vt={chart:{},xAxis:{title:{text:null},labels:{style:{fontSize:"12px"}}},yAxis:{title:{text:null},labels:{style:{fontSize:"12px"}}},title:{text:null},credits:{enabled:!1},legend:{borderWidth:0},tooltip:{style:{fontSize:"12px"}},plotOptions:{areaspline:{},area:{},series:{marker:{}}}},xt=function(t,e,n){void 0!==e?(t.legend.enabled=!!e,e&&!0!==e&&("top"===e||"bottom"===e?t.legend.verticalAlign=e:(t.legend.layout="vertical",t.legend.verticalAlign="middle",t.legend.align=e))):n&&(t.legend.enabled=!1)},bt=function(t,e){t.title.text=e},Mt=u(vt,xt,bt,(function(t,e){t.yAxis.min=e}),(function(t,e){t.yAxis.max=e}),(function(t,e){var n=e?!0===e?"normal":e:null;t.plotOptions.series.stacking=n,t.plotOptions.area.stacking=n,t.plotOptions.areaspline.stacking=n}),(function(t,e){t.xAxis.title.text=e}),(function(t,e){t.yAxis.title.text=e})),wt=function(t,e,n){var r={prefix:t.options.prefix,suffix:t.options.suffix,thousands:t.options.thousands,decimal:t.options.decimal,precision:t.options.precision,round:t.options.round,zeros:t.options.zeros};"pie"===n||e.yAxis.labels.formatter||(e.yAxis.labels.formatter=function(){return w("",this.value,r)}),e.tooltip.pointFormatter||(e.tooltip.pointFormatter=function(){return'<span style="color:'+this.color+'">\u25cf</span> '+w(this.series.name+": <b>",this.y,r)+"</b><br/>"})},Ct=function(t){this.name="highcharts",this.library=t};Ct.prototype.renderLineChart=function(t,e){var n={};"areaspline"===(e=e||"spline")&&(n={plotOptions:{areaspline:{stacking:"normal"},area:{stacking:"normal"},series:{marker:{enabled:!1}}}}),!1===t.options.curve&&("areaspline"===e?e="area":"spline"===e&&(e="line"));var r,o,a,i=Mt(t,t.options,n);i.xAxis.type="string"===t.xtype?"category":"number"===t.xtype?"linear":"datetime",i.chart.type||(i.chart.type=e),wt(t,i,e);var s=t.data;for(o=0;o<s.length;o++){if(s[o].name=s[o].name||"Value",r=s[o].data,"datetime"===t.xtype)for(a=0;a<r.length;a++)r[a][0]=r[a][0].getTime();s[o].marker={symbol:"circle"},!1===t.options.points&&(s[o].marker.enabled=!1)}this.drawChart(t,s,i)},Ct.prototype.renderScatterChart=function(t){var e=Mt(t,t.options,{});e.chart.type="scatter",this.drawChart(t,t.data,e)},Ct.prototype.renderPieChart=function(t){var e=o(vt,{});t.options.colors&&(e.colors=t.options.colors),t.options.donut&&(e.plotOptions={pie:{innerSize:"50%"}}),"legend"in t.options&&xt(e,t.options.legend),t.options.title&&bt(e,t.options.title);var n=o(e,t.options.library||{});wt(t,n,"pie");var r=[{type:"pie",name:t.options.label||"Value",data:t.data}];this.drawChart(t,r,n)},Ct.prototype.renderColumnChart=function(t,e){e=e||"column";var n,r,o,a,i=t.data,s=Mt(t,t.options),l=[],c=[];for(s.chart.type=e,wt(t,s,e),n=0;n<i.length;n++)for(o=i[n],r=0;r<o.data.length;r++)l[(a=o.data[r])[0]]||(l[a[0]]=new Array(i.length),c.push(a[0])),l[a[0]][n]=a[1];"number"===t.xtype&&c.sort(f),s.xAxis.categories=c;var p,u=[];for(n=0;n<i.length;n++){for(a=[],r=0;r<c.length;r++)a.push(l[c[r]][n]||0);p={name:i[n].name||"Value",data:a},i[n].stack&&(p.stack=i[n].stack),u.push(p)}this.drawChart(t,u,s)},Ct.prototype.renderBarChart=function(t){this.renderColumnChart(t,"bar")},Ct.prototype.renderAreaChart=function(t){this.renderLineChart(t,"areaspline")},Ct.prototype.destroy=function(t){t.chart&&t.chart.destroy()},Ct.prototype.drawChart=function(t,e,n){this.destroy(t),n.chart.renderTo=t.element.id,n.series=e,t.options.code&&window.console.log("new Highcharts.Chart("+JSON.stringify(n)+");"),t.chart=new this.library.Chart(n)};var At={},_t=[],kt={chartArea:{},fontName:"'Lucida Grande', 'Lucida Sans Unicode', Verdana, Arial, Helvetica, sans-serif",pointSize:6,legend:{textStyle:{fontSize:12,color:"#444"},alignment:"center",position:"right"},curveType:"function",hAxis:{textStyle:{color:"#666",fontSize:12},titleTextStyle:{},gridlines:{color:"transparent"},baselineColor:"#ccc",viewWindow:{}},vAxis:{textStyle:{color:"#666",fontSize:12},titleTextStyle:{},baselineColor:"#ccc",viewWindow:{}},tooltip:{textStyle:{color:"#666",fontSize:12}}},St=function(t,e,n){var r;void 0!==e?(r=e?!0===e?"right":e:"none",t.legend.position=r):n&&(t.legend.position="none")},Tt=function(t,e){t.title=e,t.titleTextStyle={color:"#333",fontSize:"20px"}},Dt=function(t,e){t.hAxis.viewWindow.min=e},Lt=function(t,e){t.hAxis.viewWindow.max=e},Ot=function(t,e){t.isStacked=e||!1},Et=function(t,e){t.hAxis.title=e,t.hAxis.titleTextStyle.italic=!1},jt=function(t,e){t.vAxis.title=e,t.vAxis.titleTextStyle.italic=!1},Bt=u(kt,St,Tt,(function(t,e){t.vAxis.viewWindow.min=e}),(function(t,e){t.vAxis.viewWindow.max=e}),Ot,Et,jt),It=function(t){window.attachEvent?window.attachEvent("onresize",t):window.addEventListener&&window.addEventListener("resize",t,!0),t()},Nt=function(t){this.name="google",this.library=t};Nt.prototype.renderLineChart=function(t){var e=this;this.waitForLoaded(t,(function(){var n={};!1===t.options.curve&&(n.curveType="none"),!1===t.options.points&&(n.pointSize=0);var r=Bt(t,t.options,n),o=e.createDataTable(t.data,t.xtype);e.drawChart(t,"LineChart",o,r)}))},Nt.prototype.renderPieChart=function(t){var e=this;this.waitForLoaded(t,(function(){var n={chartArea:{top:"10%",height:"80%"},legend:{}};t.options.colors&&(n.colors=t.options.colors),t.options.donut&&(n.pieHole=.5),"legend"in t.options&&St(n,t.options.legend),t.options.title&&Tt(n,t.options.title);var r=o(o(kt,n),t.options.library||{}),a=new e.library.visualization.DataTable;a.addColumn("string",""),a.addColumn("number","Value"),a.addRows(t.data),e.drawChart(t,"PieChart",a,r)}))},Nt.prototype.renderColumnChart=function(t){var e=this;this.waitForLoaded(t,(function(){var n=Bt(t,t.options),r=e.createDataTable(t.data,t.xtype);e.drawChart(t,"ColumnChart",r,n)}))},Nt.prototype.renderBarChart=function(t){var e=this;this.waitForLoaded(t,(function(){var n={hAxis:{gridlines:{color:"#ccc"}}},r=u(kt,St,Tt,Dt,Lt,Ot,Et,jt)(t,t.options,n),o=e.createDataTable(t.data,t.xtype);e.drawChart(t,"BarChart",o,r)}))},Nt.prototype.renderAreaChart=function(t){var e=this;this.waitForLoaded(t,(function(){var n={isStacked:!0,pointSize:0,areaOpacity:.5},r=Bt(t,t.options,n),o=e.createDataTable(t.data,t.xtype);e.drawChart(t,"AreaChart",o,r)}))},Nt.prototype.renderGeoChart=function(t){var e=this;this.waitForLoaded(t,"geochart",(function(){var n={legend:"none",colorAxis:{colors:t.options.colors||["#f6c7b6","#ce502d"]}},r=o(o(kt,n),t.options.library||{}),a=new e.library.visualization.DataTable;a.addColumn("string",""),a.addColumn("number",t.options.label||"Value"),a.addRows(t.data),e.drawChart(t,"GeoChart",a,r)}))},Nt.prototype.renderScatterChart=function(t){var e=this;this.waitForLoaded(t,(function(){var n,r,o,a,i={},s=Bt(t,t.options,i),l=t.data,c=[];for(n=0;n<l.length;n++)for(l[n].name=l[n].name||"Value",a=l[n].data,r=0;r<a.length;r++){var p=new Array(l.length+1);p[0]=a[r][0],p[n+1]=a[r][1],c.push(p)}for((o=new e.library.visualization.DataTable).addColumn("number",""),n=0;n<l.length;n++)o.addColumn("number",l[n].name);o.addRows(c),e.drawChart(t,"ScatterChart",o,s)}))},Nt.prototype.renderTimeline=function(t){var e=this;this.waitForLoaded(t,"timeline",(function(){var n={legend:"none"};t.options.colors&&(n.colors=t.options.colors);var r=o(o(kt,n),t.options.library||{}),a=new e.library.visualization.DataTable;a.addColumn({type:"string",id:"Name"}),a.addColumn({type:"date",id:"Start"}),a.addColumn({type:"date",id:"End"}),a.addRows(t.data),t.element.style.lineHeight="normal",e.drawChart(t,"Timeline",a,r)}))},Nt.prototype.destroy=function(t){t.chart&&t.chart.clearChart()},Nt.prototype.drawChart=function(t,e,n,r){this.destroy(t),t.options.code&&window.console.log("var data = new google.visualization.DataTable("+n.toJSON()+");\nvar chart = new google.visualization."+e+"(element);\nchart.draw(data, "+JSON.stringify(r)+");"),t.chart=new this.library.visualization[e](t.element),It((function(){t.chart.draw(n,r)}))},Nt.prototype.waitForLoaded=function(t,e,n){var r=this;if(n||(n=e,e="corechart"),_t.push({pack:e,callback:n}),At[e])this.runCallbacks();else{At[e]=!0;var o={packages:[e],callback:function(){r.runCallbacks()}},a=t.__config();a.language&&(o.language=a.language),"geochart"===e&&a.mapsApiKey&&(o.mapsApiKey=a.mapsApiKey),this.library.charts.load("current",o)}},Nt.prototype.runCallbacks=function(){for(var t,e=0;e<_t.length;e++)t=_t[e],this.library.visualization&&("corechart"===t.pack&&this.library.visualization.LineChart||"timeline"===t.pack&&this.library.visualization.Timeline||"geochart"===t.pack&&this.library.visualization.GeoChart)&&(t.callback(),_t.splice(e,1),e--)},Nt.prototype.createDataTable=function(t,e){var n,r,o,a,i,c=[],p=[];for(n=0;n<t.length;n++)for(o=t[n],t[n].name=t[n].name||"Value",r=0;r<o.data.length;r++)a=o.data[r],c[i="datetime"===e?a[0].getTime():a[0]]||(c[i]=new Array(t.length),p.push(i)),c[i][n]=l(a[1]);var u,f=[],y=!0;for(r=0;r<p.length;r++)n=p[r],"datetime"===e?(u=new Date(l(n)),y=y&&g(u)):u="number"===e?l(n):n,f.push([u].concat(c[n]));if("datetime"===e)f.sort(d);else if("number"===e){for(f.sort(h),n=0;n<f.length;n++)f[n][0]=s(f[n][0]);e="string"}var m=new this.library.visualization.DataTable;for(e="datetime"===e&&y?"date":e,m.addColumn(e,""),n=0;n<t.length;n++)m.addColumn("number",t[n].name);return m.addRows(f),m};var Ft=[],Rt=0,Ht=4,Pt={},Ut=[],Wt=function(t,e){return t="number"===e?l(t):"datetime"===e?c(t):s(t)},Qt=function(t,e){var n,r,o=[];for(r=0;r<t.length;r++)"bubble"===e?o.push([l(t[r][0]),l(t[r][1]),l(t[r][2])]):(n=Wt(t[r][0],e),o.push([n,l(t[r][1])]));return"datetime"===e?o.sort(d):"number"===e&&o.sort(h),o},Vt=function(t,e,n){var r;if("string"==typeof t&&(r=t,!(t=document.getElementById(t))))throw new Error("No element with id "+r);this.element=t,this.options=o(ee.options,n||{}),this.dataSource=e,ee.charts[t.id]=this,j(this,e),this.options.refresh&&this.startRefresh()};Vt.prototype.getElement=function(){return this.element},Vt.prototype.getDataSource=function(){return this.dataSource},Vt.prototype.getData=function(){return this.data},Vt.prototype.getOptions=function(){return this.options},Vt.prototype.getChartObject=function(){return this.chart},Vt.prototype.getAdapter=function(){return this.adapter},Vt.prototype.updateData=function(t,e){this.dataSource=t,e&&this.__updateOptions(e),j(this,t)},Vt.prototype.setOptions=function(t){this.__updateOptions(t),this.redraw()},Vt.prototype.redraw=function(){j(this,this.rawData)},Vt.prototype.refreshData=function(){if("string"==typeof this.dataSource){var t=-1===this.dataSource.indexOf("?")?"?":"&";j(this,this.dataSource+t+"_="+(new Date).getTime())}else"function"==typeof this.dataSource&&j(this,this.dataSource)},Vt.prototype.startRefresh=function(){var t=this,e=this.options.refresh;if(e&&"string"!=typeof this.dataSource&&"function"!=typeof this.dataSource)throw new Error("Data source must be a URL or callback for refresh");if(!this.intervalId){if(!e)throw new Error("No refresh interval");this.intervalId=setInterval((function(){t.refreshData()}),1e3*e)}},Vt.prototype.stopRefresh=function(){this.intervalId&&(clearInterval(this.intervalId),this.intervalId=null)},Vt.prototype.toImage=function(t){if("chartjs"===this.adapter){if(t&&t.background&&"transparent"!==t.background){var e=this.chart.chart.canvas,n=this.chart.chart.ctx,r=document.createElement("canvas"),o=r.getContext("2d");return r.width=n.canvas.width,r.height=n.canvas.height,o.fillStyle=t.background,o.fillRect(0,0,r.width,r.height),o.drawImage(e,0,0),r.toDataURL("image/png")}return this.chart.toBase64Image()}return null},Vt.prototype.destroy=function(){this.__adapterObject&&this.__adapterObject.destroy(this),this.__enterEvent&&N(this.element,"mouseover",this.__enterEvent),this.__leaveEvent&&N(this.element,"mouseout",this.__leaveEvent)},Vt.prototype.__updateOptions=function(t){var e=t.refresh&&t.refresh!==this.options.refresh;this.options=o(ee.options,t),e&&(this.stopRefresh(),this.startRefresh())},Vt.prototype.__render=function(){this.data=this.__processData(),W(this.__chartName(),this)},Vt.prototype.__config=function(){return Pt};var Jt=function(t){function e(){t.apply(this,arguments)}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.__processData=function(){return K(this)},e.prototype.__chartName=function(){return"LineChart"},e}(Vt),Gt=function(t){function e(){t.apply(this,arguments)}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.__processData=function(){return X(this)},e.prototype.__chartName=function(){return"PieChart"},e}(Vt),Kt=function(t){function e(){t.apply(this,arguments)}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.__processData=function(){return K(this,null,!0)},e.prototype.__chartName=function(){return"ColumnChart"},e}(Vt),Xt=function(t){function e(){t.apply(this,arguments)}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.__processData=function(){return K(this,null,!0)},e.prototype.__chartName=function(){return"BarChart"},e}(Vt),Yt=function(t){function e(){t.apply(this,arguments)}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.__processData=function(){return K(this)},e.prototype.__chartName=function(){return"AreaChart"},e}(Vt),Zt=function(t){function e(){t.apply(this,arguments)}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.__processData=function(){return X(this)},e.prototype.__chartName=function(){return"GeoChart"},e}(Vt),qt=function(t){function e(){t.apply(this,arguments)}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.__processData=function(){return K(this,"number")},e.prototype.__chartName=function(){return"ScatterChart"},e}(Vt),$t=function(t){function e(){t.apply(this,arguments)}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.__processData=function(){return K(this,"bubble")},e.prototype.__chartName=function(){return"BubbleChart"},e}(Vt),te=function(t){function e(){t.apply(this,arguments)}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.__processData=function(){var t,e=this.rawData;for(t=0;t<e.length;t++)e[t][1]=c(e[t][1]),e[t][2]=c(e[t][2]);return e},e.prototype.__chartName=function(){return"Timeline"},e}(Vt),ee={LineChart:Jt,PieChart:Gt,ColumnChart:Kt,BarChart:Xt,AreaChart:Yt,GeoChart:Zt,ScatterChart:qt,BubbleChart:$t,Timeline:te,charts:{},configure:function(t){for(var e in t)t.hasOwnProperty(e)&&(Pt[e]=t[e])},setDefaultOptions:function(t){ee.options=t},eachChart:function(t){for(var e in ee.charts)ee.charts.hasOwnProperty(e)&&t(ee.charts[e])},config:Pt,options:{},adapters:Ut,addAdapter:H,use:function(t){return H(t),ee}};return"undefined"==typeof window||window.Chartkick||(window.Chartkick=ee),ee.default=ee,ee}));