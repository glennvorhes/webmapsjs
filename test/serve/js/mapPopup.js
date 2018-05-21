!function(e){function t(n){if(o[n])return o[n].exports;var r=o[n]={i:n,l:!1,exports:{}};return e[n].call(r.exports,r,r.exports,t),r.l=!0,r.exports}var o={};t.m=e,t.c=o,t.i=function(e){return e},t.d=function(e,o,n){t.o(e,o)||Object.defineProperty(e,o,{configurable:!1,enumerable:!0,get:n})},t.n=function(e){var o=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(o,"a",o),o},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=73)}({0:function(e,t,o){"use strict";function n(e){void 0===window.gv&&(window.gv={});for(var t=e.split("."),o=window.gv,n=0;n<t.length;n++){void 0===o[t[n]]&&(o[t[n]]={}),o=o[t[n]]}return o}Object.defineProperty(t,"__esModule",{value:!0}),n("util"),window.gv.util.provide=n,t.default=n},1:function(e,t){e.exports=$},10:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=o(17),r=o(0),i=o(3),a=o(1),p=r.default("layers"),s=function(){function e(e,t){if(void 0===t&&(t={}),t=t||{},"string"!=typeof e)throw"Invalid URL";this._url=e,this._params="object"==typeof t.params?t.params:{},this._legendCollapse="boolean"==typeof t.legendCollapse&&t.legendCollapse,this._legendCheckbox="boolean"!=typeof t.legendCheckbox||t.legendCheckbox,this.id=t.id||i.default(),this._name=t.name||"Unnamed Layer",this.animate=!1,this._opacity="number"==typeof t.opacity?t.opacity:1,this._opacity>1?this._opacity=1:this._opacity<0&&(this._opacity=0),this._visible="boolean"!=typeof t.visible||t.visible,this._source=void 0,this._olLayer=void 0,this._loaded=!1,this._maxResolution=n.zoomToResolution(t.minZoom),void 0!==this._maxResolution&&(this._maxResolution+=1e-5),this._minResolution=n.zoomToResolution(t.maxZoom),this._minZoom="number"==typeof t.minZoom?t.minZoom:void 0,this._maxZoom="number"==typeof t.maxZoom?t.maxZoom:void 0,this._zIndex="number"==typeof t.zIndex?t.zIndex:0,this.loadCallback="function"==typeof t.loadCallback?t.loadCallback:function(){},this._legendContent="",this._legendCheckbox?(this._legendContent+='<input type="checkbox" '+(this.visible?"checked":"")+' class="legend-check" id="'+this.id+'-legend-layer-check"><span></span>',this._legendContent+='<label for="'+this.id+'-legend-layer-check" class="legend-layer-name">'+this.name+"</label>"):this._legendContent+='<label class="legend-layer-name">'+this.name+"</label>",this._$legendDiv=null,this._applyCollapseCalled=!1,this._addLegendContent("string"==typeof t.legendContent?t.legendContent:void 0)}return e.prototype._load=function(){return 1==this.loaded||(this._loaded=!0,!1)},e.prototype.getLegendDiv=function(){return'<div class="legend-layer-div" id="'+this.id+'-legend-layer-div">'+this._legendContent+"</div>"},e.prototype._addLegendContent=function(e){void 0===e&&(e=""),e.indexOf("<ul>")>-1&&(e='<span class="legend-items-expander" title="Expand/Collapse">&#9660;</span>'+e),this._legendContent+=e,this._$legendDiv=a("#"+this.id+"-legend-layer-div"),this._$legendDiv.length>0&&(this._$legendDiv.append(e),this.applyCollapse())},e.prototype.addLegendContent=function(e){this._addLegendContent(e)},e.prototype.applyCollapse=function(){if(this._applyCollapseCalled)return void console.log("collapse already applied");if(this._$legendDiv=a("#"+this.id+"-legend-layer-div"),this._$legendDiv.length>0){var e=this._$legendDiv.find(".legend-items-expander");e.length>0&&(this._applyCollapseCalled=!0,e.click(function(){var e=a(this);e.siblings("ul").slideToggle(),e.hasClass("legend-layer-group-collapsed")?(e.removeClass("legend-layer-group-collapsed"),e.html("&#9660;")):(e.addClass("legend-layer-group-collapsed"),e.html("&#9654;"))}),this._legendCollapse&&e.trigger("click"))}},e.prototype.refresh=function(){this.source&&this.source.refresh()},Object.defineProperty(e.prototype,"id",{get:function(){return this._id},set:function(e){this._id=e},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"animate",{get:function(){return this._animate},set:function(e){this._animate=e},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"legendContent",{get:function(){return this._legendContent},set:function(e){this._legendContent=e},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"params",{get:function(){return this._params},set:function(e){this._params=e},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"minResolution",{get:function(){return this._minResolution},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"maxResolution",{get:function(){return this._maxResolution},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"minZoom",{get:function(){return this._minZoom},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"maxZoom",{get:function(){return this._maxZoom},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"url",{get:function(){return this._url},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"visible",{get:function(){return this._visible},set:function(e){this.setVisible(e)},enumerable:!0,configurable:!0}),e.prototype.setVisible=function(e){this._visible=e,this.olLayer&&(this.olLayer.setVisible(this._visible),e&&!this._loaded&&this._load())},Object.defineProperty(e.prototype,"opacity",{get:function(){return this._opacity},set:function(e){this._opacity=e,this.olLayer&&this.olLayer.setOpacity(this._opacity)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"name",{get:function(){return this._name},set:function(e){this._name=e},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"loaded",{get:function(){return this._loaded},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"source",{get:function(){return this.getSource()},enumerable:!0,configurable:!0}),e.prototype.getSource=function(){return this._source},Object.defineProperty(e.prototype,"zIndex",{get:function(){return this._zIndex},set:function(e){this._zIndex=e},enumerable:!0,configurable:!0}),e.prototype.setZIndex=function(e){},Object.defineProperty(e.prototype,"olLayer",{get:function(){return this.getOlLayer()},enumerable:!0,configurable:!0}),e.prototype.getOlLayer=function(){return this._olLayer},e}();t.LayerBase=s,p.LayerBase=s,t.default=s},11:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=o(1),r=o(3),i=o(2),a=o(8),p="geocoder-invalid",s="geocoder-loading",l=function(){function e(e,t){var o=this,l=r.makeGuid(),u=r.makeGuid();this.map=t,this.indicationLayer=new i.layer.Vector({source:new i.source.Vector,style:new i.style.Style({image:new i.style.Circle({radius:12,fill:new i.style.Fill({color:"rgba(255,0,0,0.5)"}),stroke:new i.style.Stroke({color:"red",width:1})})})}),this.map.addLayer(this.indicationLayer),n(e).append('<div class="geocoder-el"><input type="text" id="'+l+'"><button id="'+u+'">Search</button></div>'),this.theButton=document.getElementById(u),this.theInput=document.getElementById(l),this.reset();var c=n(this.theButton),d=n(this.theInput);c.click(function(e){e.preventDefault(),c.addClass(s),o.theButton.disabled=!0,o.indicationLayer.getSource().clear(),n.get("https://geocode.xyz/"+o.theInput.value+"?geoit=json",{},function(e){var t=parseFloat(e.latt),n=parseFloat(e.longt);if(0==t&&0==n||e.error)d.addClass(p),o.theInput.title="Specified Location Invalid",o.theButton.title="Specified Location Invalid";else{var r=o.map.getView(),l=new i.geom.Point([n,t]),u=new i.Feature(l);o.indicationLayer.getSource().addFeature(u),l.transform(a.proj4326,a.proj3857),r.setCenter(l.getCoordinates()),r.setZoom(13)}c.removeClass(s),o.theButton.disabled=!1},"json")}),n(this.theInput).keyup(function(e){e.preventDefault(),o.theButton.disabled=0==o.theInput.value.length,d.removeClass(p),o.theInput.title="",o.theButton.title="",o.theButton.disabled||13!=e.keyCode||c.click()})}return e.prototype.reset=function(){this.theButton.disabled=!0,this.theInput.value=""},e}();t.Geocode=l},12:function(e,t,o){"use strict";var n=this&&this.__extends||function(){var e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var o in t)t.hasOwnProperty(o)&&(e[o]=t[o])};return function(t,o){function n(){this.constructor=t}e(t,o),t.prototype=null===o?Object.create(o):(n.prototype=o.prototype,new n)}}();Object.defineProperty(t,"__esModule",{value:!0});var r=o(5),i=o(9),a=o(0),p=o(3),s=o(1),l=a.default("olHelpers"),u=function(e){function t(){var t=e.call(this,"map move")||this;return t._arrLyrRequest=[],t._arrLyrTimeout=[],t._arrLayer=[],t._lookupLayer={},t._mapMoveCallbacks=[],t._mapMoveCallbacksLookup={},t._mapMoveCallbackDelays=[],t._mapMoveCallbackContext=[],t._mapMoveCallbackTimeout=[],t._mapExtent=void 0,t._zoomLevel=void 0,t}return n(t,e),t.prototype.init=function(t){var o=this;e.prototype.init.call(this,t),this.map.getView().on(["change:center","change:resolution"],function(e){o._updateMapExtent();for(var t=0;t<o._arrLayer.length;t++)o.triggerLyrLoad(o._arrLayer[t],t,e.type);for(var t=0;t<o._mapMoveCallbacks.length;t++)o.triggerMoveCallback(t,e.type)})},t.prototype._updateMapExtent=function(){var e=this.map.getView();this._zoomLevel=e.getZoom();var t=e.calculateExtent(this.map.getSize());this._mapExtent={minX:t[0],minY:t[1],maxX:t[2],maxY:t[3]}},Object.defineProperty(t.prototype,"mapExtent",{get:function(){return this._mapExtent||this._updateMapExtent(),this._mapExtent},enumerable:!0,configurable:!0}),t.prototype.triggerLyrLoad=function(e,t,o){if(i.undefinedOrNull(e)&&i.undefinedOrNull(t))throw"need to define lyr or index";i.definedAndNotNull(e)&&i.undefinedOrNull(t)?t=this._arrLayer.indexOf(e):i.undefinedOrNull(e)&&i.definedAndNotNull(t)&&(e=this._arrLayer[t]),null!=this._arrLyrTimeout[t]&&(clearTimeout(this._arrLyrTimeout[t]),this._arrLyrTimeout[t]=null),null!=this._arrLyrRequest[t]&&4!=this._arrLyrRequest[t]&&(this._arrLyrRequest[t].abort(),this._arrLyrRequest[t]=null);var n=function(){};if(e.mapMoveBefore(this._zoomLevel,o)){e.mapMoveMakeGetParams(this._mapExtent,this._zoomLevel);var r=this;n=function(){function o(e,t){var o=this;this._arrLyrRequest[t]=s.get(e.url,e.mapMoveParams,function(t){e.mapMoveCallback(t),e.loadCallback()},"json").fail(function(t){"abort"!=t.statusText&&(console.log("failed"),console.log(e.url),console.log(e.mapMoveParams))}).always(function(){o._arrLyrTimeout[t]=null,o._arrLyrRequest[t]=null})}o.call(r,e,t)}}else e.clear();this._arrLyrTimeout[t]=setTimeout(n,e.onDemandDelay)},t.prototype.triggerMoveCallback=function(e,t,o){if(void 0===e&&void 0===o)throw"either the function index or the id must be defined";if("number"!=typeof e&&(e=this._mapMoveCallbacks.indexOf(this._mapMoveCallbacksLookup[o])),e<0)return void console.log("function not found");null!=this._mapMoveCallbackTimeout[e]&&(clearTimeout(this._mapMoveCallbackTimeout[e]),this._mapMoveCallbackTimeout[e]=null);var n=this._mapMoveCallbackContext[e],r=this._mapMoveCallbacks[e],i=this,a=function(){null!==n?r.call(n,i._mapExtent,i._zoomLevel,t):r(i._mapExtent,i._zoomLevel,t)};this._mapMoveCallbackTimeout[e]=setTimeout(a,this._mapMoveCallbackDelays[e])},t.prototype.addVectorLayer=function(e,t){if(void 0===t&&(t=!0),this._arrLayer.indexOf(e)>-1)return void console.log("already added "+e.name+" to map move");this._checkInit(),this._arrLyrRequest.push(null),this._arrLyrTimeout.push(null),this._arrLayer.push(e),this._lookupLayer[e.id]=e,(t="boolean"!=typeof t||t)&&(void 0===this._mapExtent&&this._updateMapExtent(),this.triggerLyrLoad(e,this._arrLayer.length-1))},t.prototype.addCallback=function(e,t,o,n,r){if(this._mapMoveCallbacks.indexOf(e)>-1)return void console.log("this function already added to map move");this._checkInit(),r||(r=p.default()),this._mapMoveCallbacks.push(e),this._mapMoveCallbacksLookup[r]=e,this._mapMoveCallbackDelays.push("number"==typeof o?o:50),this._mapMoveCallbackContext.push(i.definedAndNotNull(t)?t:null),this._mapMoveCallbackTimeout.push(null),(n="boolean"!=typeof n||n)&&(void 0===this._mapExtent&&this._updateMapExtent(),this.triggerMoveCallback(this._mapMoveCallbacks.length-1))},t}(r.default);t.MapMoveCls=u,l.MapMoveCls=u,t.default=u},13:function(e,t,o){"use strict";var n=this&&this.__extends||function(){var e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var o in t)t.hasOwnProperty(o)&&(e[o]=t[o])};return function(t,o){function n(){this.constructor=t}e(t,o),t.prototype=null===o?Object.create(o):(n.prototype=o.prototype,new n)}}();Object.defineProperty(t,"__esModule",{value:!0});var r=o(5),i=o(0),a=o(2),p=o(1),s=i.default("olHelpers"),l=function(){function e(e,t,o,n,r){this.feature=e,this.layer=t,this.layerIndex=o,this.selectionLayer=n,this.popupContent="",this.esriLayerName="string"==typeof r?r:void 0}return Object.defineProperty(e.prototype,"layerName",{get:function(){return"string"==typeof this.esriLayerName?this.esriLayerName:this.layer.name},enumerable:!0,configurable:!0}),e}();t.FeatureLayerProperties=l;var u=function(e){function t(){var t=e.call(this,"map popup")||this;return t._arrPopupLayerIds=[],t._arrPopupLayers=[],t._arrPopupContentFunction=[],t._$popupContainer=void 0,t._$popupContent=void 0,t._$popupCloser=void 0,t._popupOverlay=void 0,t._selectionLayers=[],t._selectionLayerLookup={},t._mapClickFunctions=[],t._popupChangedFunctions=[],t._esriMapServiceLayers=[],t._popupOpen=!1,t._popupCoordinate=null,t._passThroughLayerFeatureArray=[],t._currentPopupIndex=-1,t._popupContentLength=0,t}return n(t,e),t.prototype.init=function(t){var o=this;e.prototype.init.call(this,t);var n,r=this.map.getTarget();n=p("string"==typeof r?"#"+r:r),n.append('<div class="ol-popup"><span class="ol-popup-closer">X</span><div class="popup-content"></div></div>'),this._$popupContainer=n.find(".ol-popup"),this._$popupContent=n.find(".popup-content"),this._$popupCloser=n.find(".ol-popup-closer");var i=function(e){return a.easing.inAndOut(e)};this._popupOverlay=new a.Overlay({element:this._$popupContainer[0],autoPan:!0,autoPanAnimation:{duration:250,source:t.getView().getCenter(),easing:i}}),this._map.addOverlay(this._popupOverlay),this._$popupCloser.click(function(e){o.closePopup()}),this._map.on("singleclick",function(e){if(o.closePopup(),o._popupCoordinate=e.coordinate,o._esriMapServiceLayers.length>0)for(var t={geometry:e.coordinate.join(","),geometryType:"esriGeometryPoint",layers:"all",sr:o._map.getView().getProjection().getCode().split(":")[1],mapExtent:o._map.getView().calculateExtent(o._map.getSize()).join(","),imageDisplay:o._map.getSize().join(",")+",96",returnGeometry:!0,tolerance:15,f:"pjson"},n=0,r=o._esriMapServiceLayers;n<r.length;n++){var i=r[n];i.getPopupInfo(t)}var a=o._featuresAtPixel(e.pixel);o._passThroughLayerFeatureArray=[],o._currentPopupIndex=-1;for(var p=0;p<a.length;p++){var s=a[p],l=s.feature.getProperties(),u=o._arrPopupContentFunction[s.layerIndex](l,o._$popupContent);u===!1||("string"==typeof u?(s.popupContent=u,o._passThroughLayerFeatureArray.push(s)):s.selectionLayer.getSource().addFeature(s.feature))}o._popupContentLength=o._passThroughLayerFeatureArray.length,o._currentPopupIndex=-1;var c='<div class="ol-popup-nav">';c+='<span class="previous-popup ol-popup-nav-arrow">&#9664;</span>',c+='<span class="next-popup ol-popup-nav-arrow">&#9654;</span>',c+='<span class="current-popup-item-number" style="font-weight: bold;"></span>',c+="<span>&nbsp;of&nbsp;</span>",c+='<span class="popup-content-length" style="font-weight: bold;">'+o._popupContentLength+"</span>",c+="<span>&nbsp;&nbsp;-&nbsp;&nbsp;</span>",c+='<span class="current-popup-layer-name"></span>',c+="</div>",c+='<div class="ol-popup-inner">',c+="</div>",o._$popupContent.html(c),o._$popupContent.find(".previous-popup").click(function(){1!=o._popupContentLength&&(0==o._currentPopupIndex?o._currentPopupIndex=o._popupContentLength-1:o._currentPopupIndex--,o._triggerFeatSelect())});var d=o._$popupContent.find(".next-popup");d.click(function(){1==o._popupContentLength&&o._currentPopupIndex>-1||(o._currentPopupIndex==o._popupContentLength-1?o._currentPopupIndex=0:o._currentPopupIndex++,o._triggerFeatSelect())}),o._popupContentLength>0&&(d.trigger("click"),o._popupOverlay.setPosition(o._popupCoordinate),o._$popupContent.scrollTop(0),o._popupOpen=!0)}),this._map.on("pointermove",function(e){if(!e.dragging){var t=o.map.getEventPixel(e.originalEvent),n=!1;o.map.forEachFeatureAtPixel(t,function(e,t){if(!n)for(var r=0,i=o._arrPopupLayers;r<i.length;r++){var a=i[r];if(a.olLayer==t){n=!0;break}}});o.map.getTargetElement().style.cursor=n?"pointer":""}})},t.prototype._triggerFeatSelect=function(){var e=this._$popupContent.find(".current-popup-item-number"),t=this._$popupContent.find(".ol-popup-inner"),o=this._$popupContent.find(".current-popup-layer-name");this.clearSelection();var n=this._passThroughLayerFeatureArray[this._currentPopupIndex];e.html((this._currentPopupIndex+1).toFixed()),o.html(n.layerName),t.html(n.popupContent),n.selectionLayer.getSource().addFeature(n.feature);for(var r=0,i=this._popupChangedFunctions;r<i.length;r++){(0,i[r])(this._$popupContent)}},t.prototype.addMapServicePopupContent=function(e,t,o,n){var r=new l(e,t,this._popupContentLength,this._selectionLayerLookup[t.id],n);r.popupContent=o,this._passThroughLayerFeatureArray.push(r),this._popupContentLength++,p(".popup-content-length").html(this._popupContentLength.toFixed()),this._popupOpen||(this._$popupContent.find(".next-popup").trigger("click"),this._popupOverlay.setPosition(this._popupCoordinate),this._$popupContent.scrollTop(0),this._popupOpen=!0)},t.prototype._featuresAtPixel=function(e){var t=this,o=[];return this.map.forEachFeatureAtPixel(e,function(e,n){var r,i=!1,a=null;for(r=0;r<t._arrPopupLayers.length;r++)if(a=t._arrPopupLayers[r],a.olLayer===n){i=!0;break}i&&o.push(new l(e,a,r,t._selectionLayers[r]))}),o},t.prototype.closePopup=function(){return this._checkInit(),this._popupOpen=!1,this._popupOverlay.setPosition(void 0),this._$popupCloser[0].blur(),this.clearSelection(),this._$popupContent.html(""),!1},t.prototype.addPopupChangedFunction=function(e){this._popupChangedFunctions.push(e)},t.prototype._addPopupLayer=function(e,t){this._checkInit(),t=t||{},t.color=t.color||"rgba(255,170,0,0.5)",t.width=t.width||10;var o;o=t.olStyle?t.olStyle:new a.style.Style({stroke:new a.style.Stroke({color:t.color,width:t.width}),image:new a.style.Circle({radius:7,fill:new a.style.Fill({color:t.color}),stroke:new a.style.Stroke({color:t.color,width:1})}),fill:new a.style.Fill({color:t.color})});var n=new a.layer.Vector({source:new a.source.Vector,style:o});return n.setZIndex(100),this._selectionLayers.push(n),this._selectionLayerLookup[e.id]=n,this.map.addLayer(n),n},t.prototype.addVectorPopup=function(e,t,o){var n=this._addPopupLayer(e,o);return this._arrPopupLayerIds.push(e.id),this._arrPopupLayers.push(e),this._arrPopupContentFunction.push(t),n},t.prototype.removeVectorPopup=function(e){var t=this._arrPopupLayerIds.indexOf(e.id);t>-1&&(this._arrPopupLayerIds.splice(t,1),this._arrPopupLayers.splice(t,1),this._arrPopupContentFunction.splice(t,1),this._selectionLayers.splice(t,1),delete this._selectionLayerLookup[e.id])},t.prototype.addMapServicePopup=function(e,t){var o=this._addPopupLayer(e,t);return this._esriMapServiceLayers.push(e),o},t.prototype.clearSelection=function(){this._checkInit();for(var e=0;e<this._selectionLayers.length;e++)this._selectionLayers[e].getSource().clear();for(var t=0,o=this._mapClickFunctions;t<o.length;t++){(0,o[t])()}},t.prototype.addMapClickFunction=function(e){this._mapClickFunctions.push(e)},t}(r.default);t.MapPopupCls=u,s.MapPopupCls=u,t.default=u},14:function(e,t,o){"use strict";function n(e){void 0===e&&(e={}),e.divId=e.divId||"map",e.center=e.center||{x:-10018378,y:5574910},e.zoom="number"==typeof e.zoom?e.zoom:7,e.baseSwitcher="boolean"!=typeof e.baseSwitcher||e.baseSwitcher,e.fullScreen="boolean"==typeof e.fullScreen&&e.fullScreen,e.addGeocode=e.addGeocode||!1,a("#"+e.divId).css("position","relative");var t=new i.layer.Tile({source:new i.source.OSM});if(e.baseSwitcher,e.zoom<0||e.zoom>28)throw"zoom out of range";if(e.center.x>=-180&&e.center.x<=180&&e.center.y>=-90&&e.center.y<=90){var o=new i.geom.Point([e.center.x,e.center.y]);new i.proj.Projection({code:"EPSG:4326"}),o.transform(new i.proj.Projection({code:"EPSG:4326"}),new i.proj.Projection({code:"EPSG:3857"}));var n=o.getCoordinates();e.center.x=n[0],e.center.y=n[1]}var r=i.control.defaults({attributionOptions:{collapsible:!1}}),s=new i.View({center:[e.center.x,e.center.y],zoom:e.zoom,minZoom:e.minZoom,maxZoom:e.maxZoom}),l=new i.Map({layers:[t],target:e.divId,controls:r,view:s});return e.fullScreen&&l.addControl(new i.control.FullScreen({})),e.addGeocode&&new p.Geocode(document.getElementById(e.divId),l),l}Object.defineProperty(t,"__esModule",{value:!0});var r=o(0),i=o(2),a=o(1),p=o(11),s=r.default("olHelpers");t.quickMapBase=n,s.quickMapBase=n,t.default=n},17:function(e,t,o){"use strict";function n(e){return"number"==typeof e?e%1==0&&e>=0&&e<=28?p[e]:void console.log("invalid zoom level provided: "+e):void 0}function r(e){for(var t=0;t<p.length;t++)if(e>=p[t])return t;return 0}Object.defineProperty(t,"__esModule",{value:!0});var i=o(0),a=i.default("olHelpers.zoomResolutionConvert"),p=[156543.03392804097,78271.51696402048,39135.75848201024,19567.87924100512,9783.93962050256,4891.96981025128,2445.98490512564,1222.99245256282,611.49622628141,305.748113140705,152.8740565703525,76.43702828517625,38.21851414258813,19.109257071294063,9.554628535647032,4.777314267823516,2.388657133911758,1.194328566955879,.5971642834779395,.29858214173896974,.14929107086948487,.07464553543474244,.03732276771737122,.01866138385868561,.009330691929342804,.004665345964671402,.002332672982335701,.0011663364911678506,.0005831682455839253];t.zoomToResolution=n,a.zoomToResolution=n,t.resolutionToZoom=r,a.resolutionToZoom=r},2:function(e,t){e.exports=ol},3:function(e,t,o){"use strict";function n(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(e){var t=16*Math.random()|0;return("x"==e?t:3&t|8).toString(16)})}Object.defineProperty(t,"__esModule",{value:!0});var r=o(0),i=r.default("util");t.makeGuid=n,i.makeGuid=n,t.default=n},4:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=o(13);t.mapPopup=new n.default,t.default=t.mapPopup},44:function(e,t,o){"use strict";var n=this&&this.__extends||function(){var e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var o in t)t.hasOwnProperty(o)&&(e[o]=t[o])};return function(t,o){function n(){this.constructor=t}e(t,o),t.prototype=null===o?Object.create(o):(n.prototype=o.prototype,new n)}}();Object.defineProperty(t,"__esModule",{value:!0});var r=o(10),i=o(7),a=o(0),p=o(2),s=o(1),l=a.default("layers"),u=function(e){function t(t,o){void 0===o&&(o={});var n=e.call(this,t,o)||this;return o=o,""==n.url.trim()&&(n._loaded=!0),n._style=void 0===o.style?void 0:o.style,n.visible?n._autoLoad=!0:n._autoLoad="boolean"==typeof o.autoLoad&&o.autoLoad,n._onDemand="boolean"==typeof o.onDemand&&o.onDemand,n._onDemandDelay="number"==typeof o.onDemandDelay?o.onDemandDelay:300,o.mapMoveObj?n._mapMove=o.mapMoveObj:n._mapMove=n._onDemand?i.default:void 0,n._mapMoveMakeGetParams="function"==typeof o.mapMoveMakeGetParams?o.mapMoveMakeGetParams:function(){return{}},n._onDemand&&(n._loaded=!0,n._mapMoveParams={},n._mapMove.checkInit(),n._mapMove.addVectorLayer(n)),n._source=new p.source.Vector,n._olLayer=new p.layer.Vector({source:n._source,visible:n.visible,style:n.style,minResolution:n._minResolution,maxResolution:n._maxResolution,renderOrder:o.renderOrder}),n.olLayer.setZIndex(n._zIndex),n._projectionMap=null,n._projection4326=new p.proj.Projection({code:"EPSG:4326"}),n._olLayer.setOpacity(n.opacity),n}return n(t,e),t.prototype.addFeatures=function(e){console.log("Layer vector base addFeatures is a placeholder and does nothing")},t.prototype.mapMoveBefore=function(e,t){return!(void 0!==this.minZoom&&e<this.minZoom)&&(!(void 0!==this.maxZoom&&e>this.maxZoom)&&this.visible)},t.prototype.mapMoveMakeGetParams=function(e,t){this._mapMoveParams={},s.extend(this._mapMoveParams,this.params),s.extend(this._mapMoveParams,this._mapMoveMakeGetParams(this,e,t))},t.prototype.mapMoveCallback=function(e){this.source&&this._source.clear()},t.prototype.clear=function(){this._source&&this._source.clear()},Object.defineProperty(t.prototype,"onDemandDelay",{get:function(){return this._onDemandDelay},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"autoLoad",{get:function(){return this._autoLoad},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"style",{get:function(){return this._style},set:function(e){this._style=e,this.olLayer.setStyle(this._style)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"mapCrs",{get:function(){return null==this.mapProj?null:this.mapProj.getCode()},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"mapProj",{get:function(){return null!=this._projectionMap?this._projectionMap:this._mapMove?(this._projectionMap=this._mapMove.map.getView().getProjection(),this._projectionMap):null},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"mapMove",{get:function(){return this._mapMove},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"mapMoveParams",{get:function(){return this._mapMoveParams},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"visible",{get:function(){return this._visible},set:function(t){e.prototype.setVisible.call(this,t),this._onDemand&&this.mapMove.triggerLyrLoad(this)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"source",{get:function(){return this.getSource()},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"features",{get:function(){return this.source.getFeatures()},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"olLayer",{get:function(){return e.prototype.getOlLayer.call(this)},enumerable:!0,configurable:!0}),t.prototype.setZIndex=function(e){this.olLayer.setZIndex(e)},t}(r.LayerBase);t.LayerBaseVector=u,l.LayerBaseVector=u,t.default=u},48:function(e,t,o){"use strict";var n=this&&this.__extends||function(){var e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var o in t)t.hasOwnProperty(o)&&(e[o]=t[o])};return function(t,o){function n(){this.constructor=t}e(t,o),t.prototype=null===o?Object.create(o):(n.prototype=o.prototype,new n)}}();Object.defineProperty(t,"__esModule",{value:!0});var r=o(44),i=o(0),a=o(2),p=o(1),s=o(8),l=o(8),u=i.default("layers"),c=function(e){function t(t,o){void 0===o&&(o={});var n=this;return t="string"==typeof t?t:"",n=e.call(this,t,o)||this,n._geoJsonFormat=new a.format.GeoJSON,n._transform=o.transform||{},n._transform.dataProjection=n._transform.dataProjection||s.proj4326,n._transform.featureProjection=n._transform.featureProjection||l.proj3857,(n.autoLoad||n.visible)&&n._load(),n}return n(t,e),t.prototype.addFeatures=function(e){this.source.addFeatures(this._geoJsonFormat.readFeatures(e,{dataProjection:this._transform.dataProjection,featureProjection:this._transform.featureProjection}))},t.prototype._load=function(){var t=this;return!!e.prototype._load.call(this)||(p.get(this._url,this._params,function(e){t.addFeatures(e),t.loadCallback(t)},"json").fail(function(){this._loaded=!1}),!1)},t.prototype.mapMoveCallback=function(t){e.prototype.mapMoveCallback.call(this,t),this._source.addFeatures(this._geoJsonFormat.readFeatures(t,{featureProjection:this._transform.featureProjection,dataProjection:this._transform.dataProjection}))},t}(r.LayerBaseVector);t.LayerBaseVectorGeoJson=c,u.LayerBaseVectorGeoJson=c,t.default=c},5:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=o(0),r=n.default("olHelpers"),i=function(){function e(e){this._map=null,this._initialized=!1,this._subtype=e}return e.prototype.init=function(e){this._initialized||(this._map=e,this._initialized=!0)},Object.defineProperty(e.prototype,"map",{get:function(){return this._map},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"initialized",{get:function(){return this._initialized},enumerable:!0,configurable:!0}),e.prototype._checkInit=function(){if(!this.initialized){var e=this._subtype+" object not initialized";throw alert(e),console.log(e),e}},e.prototype.checkInit=function(){this._checkInit()},e}();t.MapInteractionBase=i,r.MapInteractionBase=i,t.default=i},6:function(e,t,o){"use strict";function n(e){void 0===e&&(e={});var t=r.quickMapBase(e);return a.default.init(t),p.default.init(t),t}Object.defineProperty(t,"__esModule",{value:!0});var r=o(14),i=o(0),a=o(7),p=o(4),s=i.default("olHelpers");t.quickMap=n,s.quickMap=n,t.default=n},7:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=o(12);t.mapMove=new n.default,t.default=t.mapMove},73:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=o(6),r=o(48),i=o(2),a=o(4),p={type:"FeatureCollection",crs:{type:"name",properties:{name:"urn:ogc:def:crs:OGC:1.3:CRS84"}},features:[{type:"Feature",properties:{},geometry:{type:"Polygon",coordinates:[[[-91.4232,43.9834],[-91.3246,43.9834],[-91.3465,44.0162],[-91.3082,44.0655],[-91.2205,44.0546],[-91.1767,44.0874],[-91.1493,44.0819],[-90.9741,44.071],[-90.9741,44.071],[-90.9796,44.1312],[-90.9084,44.1586],[-90.4921,44.1586],[-90.3114,44.1531],[-90.3114,44.2463],[-90.0813,44.2463],[-89.9006,44.2517],[-89.928,44.197],[-89.9061,44.1805],[-89.928,44.1531],[-89.9718,44.1696],[-90.0266,44.071],[-89.9608,43.9779],[-89.9499,43.9231],[-89.9828,43.9122],[-89.9608,43.8629],[-89.8513,43.7698],[-89.7856,43.6383],[-89.5994,43.6438],[-89.2434,43.6438],[-89.0079,43.6328],[-88.8874,43.6328],[-88.3999,43.6328],[-88.3999,43.5452],[-88.4163,43.1947],[-88.5368,43.1947],[-88.5423,42.8442],[-88.5478,42.8442],[-88.7778,42.8442],[-88.7778,42.4936],[-88.9421,42.4936],[-89.3639,42.4991],[-89.4022,42.4991],[-89.8404,42.5046],[-89.928,42.5046],[-90.4264,42.5046],[-90.64,42.5101],[-90.7112,42.636],[-90.8974,42.6744],[-91.0672,42.7511],[-91.1548,42.9866],[-91.1767,43.0797],[-91.1767,43.1344],[-91.0562,43.2549],[-91.1055,43.3152],[-91.2041,43.3535],[-91.2041,43.4247],[-91.2315,43.4576],[-91.2151,43.5014],[-91.2698,43.6164],[-91.2589,43.7259],[-91.2424,43.7752],[-91.2863,43.8464]]]}}]},s={type:"FeatureCollection",crs:{type:"name",properties:{name:"urn:ogc:def:crs:OGC:1.3:CRS84"}},features:[{type:"Feature",properties:{},geometry:{type:"Polygon",coordinates:[[[-93,45],[-94,45],[-94,46],[-93,46],[-93,45]]]}}]},l=n.default({addGeocode:!0}),u=new r.LayerBaseVectorGeoJson("",{minZoom:6,maxZoom:12,name:"WisDOT Regions",style:new i.style.Style({fill:new i.style.Fill({color:"blue"}),stroke:new i.style.Stroke({color:"yellow",width:5})})}),c=new r.LayerBaseVectorGeoJson("",{minZoom:6,maxZoom:12,name:"WisDOT Regions",style:new i.style.Style({fill:new i.style.Fill({color:"red"}),stroke:new i.style.Stroke({color:"yellow",width:5})})});u.addFeatures(p),c.addFeatures(s),l.addLayer(u.olLayer),l.addLayer(c.olLayer),a.mapPopup.addVectorPopup(c,function(e){return"cats"}),window.map=l,console.log("it works")},8:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=o(2);t.proj4326=new n.proj.Projection({code:"EPSG:4326"}),t.proj3857=new n.proj.Projection({code:"EPSG:3857"}),t.proj3070=new n.proj.Projection({code:"EPSG:3070"})},9:function(e,t,o){"use strict";function n(e){return void 0===e||null===e}function r(e){return!n(e)}Object.defineProperty(t,"__esModule",{value:!0});var i=o(0),a=i.default("util.checkDefined");t.undefinedOrNull=n,a.undefinedOrNull=n,t.definedAndNotNull=r,a.definedAndNotNull=r}});
//# sourceMappingURL=mapPopup.js.map