(function(e){function t(t){for(var r,a,u=t[0],c=t[1],l=t[2],p=0,s=[];p<u.length;p++)a=u[p],Object.prototype.hasOwnProperty.call(i,a)&&i[a]&&s.push(i[a][0]),i[a]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(e[r]=c[r]);f&&f(t);while(s.length)s.shift()();return o.push.apply(o,l||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],r=!0,u=1;u<n.length;u++){var c=n[u];0!==i[c]&&(r=!1)}r&&(o.splice(t--,1),e=a(a.s=n[0]))}return e}var r={},i={app:0},o=[];function a(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.m=e,a.c=r,a.d=function(e,t,n){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},a.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)a.d(n,r,function(t){return e[t]}.bind(null,r));return n},a.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="";var u=window["webpackJsonp"]=window["webpackJsonp"]||[],c=u.push.bind(u);u.push=t,u=u.slice();for(var l=0;l<u.length;l++)t(u[l]);var f=c;o.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"034f":function(e,t,n){"use strict";var r=n("64a9"),i=n.n(r);i.a},"1b9b":function(e,t,n){},"3eb6":function(e,t,n){e.exports=n.p+"img/WechatIMG42.a55cf932.jpeg"},5111:function(e,t,n){"use strict";var r=n("1b9b"),i=n.n(r);i.a},"56d7":function(e,t,n){"use strict";n.r(t);n("cadf"),n("551c"),n("f751"),n("097d");var r=n("2b0e"),i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("HelloWorld")],1)},o=[],a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("button",{attrs:{id:"changeBut"},on:{click:e.changeImg}},[e._v("切换图片")]),n("div",{attrs:{id:"viewer"}})])},u=[],c=(n("5a89"),n("e368")),l=n.n(c),f={name:"HelloWorld",data:function(){return{img:0}},mounted:function(){this.initViewer()},methods:{changeImg:function(){this.img=0==this.img?1:0,this.viewer?this.viewer.setPanorama(this.imagePath,!0,!0):this.initViewer()},initViewer:function(){this.viewer=new l.a({container:document.getElementById("viewer"),panorama:this.imagePath,default_fov:179,toggleDeviceOrientation:!0})}},computed:{imagePath:function(){return 0==this.img?n("9ba7"):n("3eb6")}}},p=f,s=(n("5111"),n("2877")),d=Object(s["a"])(p,a,u,!1,null,"ba423adc",null),h=d.exports,b=(n("0ca4"),{name:"app",components:{HelloWorld:h}}),v=b,g=(n("034f"),Object(s["a"])(v,i,o,!1,null,null,null)),m=g.exports;r["a"].config.productionTip=!0,new r["a"]({render:function(e){return e(m)}}).$mount("#app")},"64a9":function(e,t,n){},"9ba7":function(e,t,n){e.exports=n.p+"img/WechatIMG38.a0bcbdb7.jpeg"}});
//# sourceMappingURL=app.511cc1fa.js.map