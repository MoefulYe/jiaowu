import{p as d,S as u}from"./installCanvasRenderer-6dfd7943.js";import{bN as c,b$ as f}from"./index-ba18d778.js";function p(a){return{seriesType:a,reset:function(e,t){var r=t.findComponents({mainType:"legend"});if(!(!r||!r.length)){var n=e.getData();n.filterSelf(function(i){for(var s=n.getName(i),o=0;o<r.length;o++)if(!r[o].isSelected(s))return!1;return!0})}}}}function v(a,e,t){e=c(e)&&{coordDimensions:e}||f({encodeDefine:a.getEncode()},e);var r=a.getSource(),n=d(r,e).dimensions,i=new u(n,a);return i.initData(r,t),i}var l=function(){function a(e,t){this._getDataWithEncodedVisual=e,this._getRawData=t}return a.prototype.getAllNames=function(){var e=this._getRawData();return e.mapArray(e.getName)},a.prototype.containName=function(e){var t=this._getRawData();return t.indexOfName(e)>=0},a.prototype.indexOfName=function(e){var t=this._getDataWithEncodedVisual();return t.indexOfName(e)},a.prototype.getItemVisual=function(e,t){var r=this._getDataWithEncodedVisual();return r.getItemVisual(e,t)},a}();const D=l;export{D as L,v as c,p as d};
