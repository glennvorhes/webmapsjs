!function(e){function t(n){if(o[n])return o[n].exports;var r=o[n]={i:n,l:!1,exports:{}};return e[n].call(r.exports,r,r.exports,t),r.l=!0,r.exports}var o={};t.m=e,t.c=o,t.i=function(e){return e},t.d=function(e,o,n){t.o(e,o)||Object.defineProperty(e,o,{configurable:!1,enumerable:!0,get:n})},t.n=function(e){var o=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(o,"a",o),o},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=70)}({0:function(e,t,o){"use strict";function n(e){void 0===window.gv&&(window.gv={});for(var t=e.split("."),o=window.gv,n=0;n<t.length;n++){void 0===o[t[n]]&&(o[t[n]]={}),o=o[t[n]]}return o}Object.defineProperty(t,"__esModule",{value:!0}),n("util"),window.gv.util.provide=n,t.default=n},1:function(e,t){e.exports=$},10:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=o(17),r=o(0),i=o(3),a=o(1),l=r.default("layers"),s=function(){function e(e,t){if(void 0===t&&(t={}),t=t||{},"string"!=typeof e)throw"Invalid URL";this._url=e,this._params="object"==typeof t.params?t.params:{},this._legendCollapse="boolean"==typeof t.legendCollapse&&t.legendCollapse,this._legendCheckbox="boolean"!=typeof t.legendCheckbox||t.legendCheckbox,this.id=t.id||i.default(),this._name=t.name||"Unnamed Layer",this.animate=!1,this._opacity="number"==typeof t.opacity?t.opacity:1,this._opacity>1?this._opacity=1:this._opacity<0&&(this._opacity=0),this._visible="boolean"!=typeof t.visible||t.visible,this._source=void 0,this._olLayer=void 0,this._loaded=!1,this._maxResolution=n.zoomToResolution(t.minZoom),void 0!==this._maxResolution&&(this._maxResolution+=1e-5),this._minResolution=n.zoomToResolution(t.maxZoom),this._minZoom="number"==typeof t.minZoom?t.minZoom:void 0,this._maxZoom="number"==typeof t.maxZoom?t.maxZoom:void 0,this._zIndex="number"==typeof t.zIndex?t.zIndex:0,this.loadCallback="function"==typeof t.loadCallback?t.loadCallback:function(){},this._legendContent="",this._legendCheckbox?(this._legendContent+='<input type="checkbox" '+(this.visible?"checked":"")+' class="legend-check" id="'+this.id+'-legend-layer-check"><span></span>',this._legendContent+='<label for="'+this.id+'-legend-layer-check" class="legend-layer-name">'+this.name+"</label>"):this._legendContent+='<label class="legend-layer-name">'+this.name+"</label>",this._$legendDiv=null,this._applyCollapseCalled=!1,this._addLegendContent("string"==typeof t.legendContent?t.legendContent:void 0)}return e.prototype._load=function(){return 1==this.loaded||(this._loaded=!0,!1)},e.prototype.getLegendDiv=function(){return'<div class="legend-layer-div" id="'+this.id+'-legend-layer-div">'+this._legendContent+"</div>"},e.prototype._addLegendContent=function(e){void 0===e&&(e=""),e.indexOf("<ul>")>-1&&(e='<span class="legend-items-expander" title="Expand/Collapse">&#9660;</span>'+e),this._legendContent+=e,this._$legendDiv=a("#"+this.id+"-legend-layer-div"),this._$legendDiv.length>0&&(this._$legendDiv.append(e),this.applyCollapse())},e.prototype.addLegendContent=function(e){this._addLegendContent(e)},e.prototype.applyCollapse=function(){if(this._applyCollapseCalled)return void console.log("collapse already applied");if(this._$legendDiv=a("#"+this.id+"-legend-layer-div"),this._$legendDiv.length>0){var e=this._$legendDiv.find(".legend-items-expander");e.length>0&&(this._applyCollapseCalled=!0,e.click(function(){var e=a(this);e.siblings("ul").slideToggle(),e.hasClass("legend-layer-group-collapsed")?(e.removeClass("legend-layer-group-collapsed"),e.html("&#9660;")):(e.addClass("legend-layer-group-collapsed"),e.html("&#9654;"))}),this._legendCollapse&&e.trigger("click"))}},e.prototype.refresh=function(){this.source&&this.source.refresh()},Object.defineProperty(e.prototype,"id",{get:function(){return this._id},set:function(e){this._id=e},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"animate",{get:function(){return this._animate},set:function(e){this._animate=e},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"legendContent",{get:function(){return this._legendContent},set:function(e){this._legendContent=e},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"params",{get:function(){return this._params},set:function(e){this._params=e},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"minResolution",{get:function(){return this._minResolution},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"maxResolution",{get:function(){return this._maxResolution},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"minZoom",{get:function(){return this._minZoom},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"maxZoom",{get:function(){return this._maxZoom},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"url",{get:function(){return this._url},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"visible",{get:function(){return this._visible},set:function(e){this.setVisible(e)},enumerable:!0,configurable:!0}),e.prototype.setVisible=function(e){this._visible=e,this.olLayer&&(this.olLayer.setVisible(this._visible),e&&!this._loaded&&this._load())},Object.defineProperty(e.prototype,"opacity",{get:function(){return this._opacity},set:function(e){this._opacity=e,this.olLayer&&this.olLayer.setOpacity(this._opacity)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"name",{get:function(){return this._name},set:function(e){this._name=e},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"loaded",{get:function(){return this._loaded},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"source",{get:function(){return this.getSource()},enumerable:!0,configurable:!0}),e.prototype.getSource=function(){return this._source},Object.defineProperty(e.prototype,"zIndex",{get:function(){return this._zIndex},set:function(e){this._zIndex=e},enumerable:!0,configurable:!0}),e.prototype.setZIndex=function(e){},Object.defineProperty(e.prototype,"olLayer",{get:function(){return this.getOlLayer()},enumerable:!0,configurable:!0}),e.prototype.getOlLayer=function(){return this._olLayer},e}();t.LayerBase=s,l.LayerBase=s,t.default=s},11:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=o(1),r=o(3),i=o(2),a=o(8),l="geocoder-invalid",s="geocoder-loading",p=function(){function e(e,t){var o=this,p=r.makeGuid(),u=r.makeGuid();this.map=t,this.indicationLayer=new i.layer.Vector({source:new i.source.Vector,style:new i.style.Style({image:new i.style.Circle({radius:12,fill:new i.style.Fill({color:"rgba(255,0,0,0.5)"}),stroke:new i.style.Stroke({color:"red",width:1})})})}),this.map.addLayer(this.indicationLayer),n(e).append('<div class="geocoder-el"><input type="text" id="'+p+'"><button id="'+u+'">Search</button></div>'),this.theButton=document.getElementById(u),this.theInput=document.getElementById(p),this.reset();var c=n(this.theButton),d=n(this.theInput);c.click(function(e){e.preventDefault(),c.addClass(s),o.theButton.disabled=!0,o.indicationLayer.getSource().clear(),n.get("https://geocode.xyz/"+o.theInput.value+"?geoit=json",{},function(e){var t=parseFloat(e.latt),n=parseFloat(e.longt);if(0==t&&0==n||e.error)d.addClass(l),o.theInput.title="Specified Location Invalid",o.theButton.title="Specified Location Invalid";else{var r=o.map.getView(),p=new i.geom.Point([n,t]),u=new i.Feature(p);o.indicationLayer.getSource().addFeature(u),p.transform(a.proj4326,a.proj3857),r.setCenter(p.getCoordinates()),r.setZoom(13)}c.removeClass(s),o.theButton.disabled=!1},"json")}),n(this.theInput).keyup(function(e){e.preventDefault(),o.theButton.disabled=0==o.theInput.value.length,d.removeClass(l),o.theInput.title="",o.theButton.title="",o.theButton.disabled||13!=e.keyCode||c.click()})}return e.prototype.reset=function(){this.theButton.disabled=!0,this.theInput.value=""},e}();t.Geocode=p},12:function(e,t,o){"use strict";var n=this&&this.__extends||function(){var e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var o in t)t.hasOwnProperty(o)&&(e[o]=t[o])};return function(t,o){function n(){this.constructor=t}e(t,o),t.prototype=null===o?Object.create(o):(n.prototype=o.prototype,new n)}}();Object.defineProperty(t,"__esModule",{value:!0});var r=o(5),i=o(9),a=o(0),l=o(3),s=o(1),p=a.default("olHelpers"),u=function(e){function t(){var t=e.call(this,"map move")||this;return t._arrLyrRequest=[],t._arrLyrTimeout=[],t._arrLayer=[],t._lookupLayer={},t._mapMoveCallbacks=[],t._mapMoveCallbacksLookup={},t._mapMoveCallbackDelays=[],t._mapMoveCallbackContext=[],t._mapMoveCallbackTimeout=[],t._mapExtent=void 0,t._zoomLevel=void 0,t}return n(t,e),t.prototype.init=function(t){var o=this;e.prototype.init.call(this,t),this.map.getView().on(["change:center","change:resolution"],function(e){o._updateMapExtent();for(var t=0;t<o._arrLayer.length;t++)o.triggerLyrLoad(o._arrLayer[t],t,e.type);for(var t=0;t<o._mapMoveCallbacks.length;t++)o.triggerMoveCallback(t,e.type)})},t.prototype._updateMapExtent=function(){var e=this.map.getView();this._zoomLevel=e.getZoom();var t=e.calculateExtent(this.map.getSize());this._mapExtent={minX:t[0],minY:t[1],maxX:t[2],maxY:t[3]}},Object.defineProperty(t.prototype,"mapExtent",{get:function(){return this._mapExtent||this._updateMapExtent(),this._mapExtent},enumerable:!0,configurable:!0}),t.prototype.triggerLyrLoad=function(e,t,o){if(i.undefinedOrNull(e)&&i.undefinedOrNull(t))throw"need to define lyr or index";i.definedAndNotNull(e)&&i.undefinedOrNull(t)?t=this._arrLayer.indexOf(e):i.undefinedOrNull(e)&&i.definedAndNotNull(t)&&(e=this._arrLayer[t]),null!=this._arrLyrTimeout[t]&&(clearTimeout(this._arrLyrTimeout[t]),this._arrLyrTimeout[t]=null),null!=this._arrLyrRequest[t]&&4!=this._arrLyrRequest[t]&&(this._arrLyrRequest[t].abort(),this._arrLyrRequest[t]=null);var n=function(){};if(e.mapMoveBefore(this._zoomLevel,o)){e.mapMoveMakeGetParams(this._mapExtent,this._zoomLevel);var r=this;n=function(){function o(e,t){var o=this;this._arrLyrRequest[t]=s.get(e.url,e.mapMoveParams,function(t){e.mapMoveCallback(t),e.loadCallback()},"json").fail(function(t){"abort"!=t.statusText&&(console.log("failed"),console.log(e.url),console.log(e.mapMoveParams))}).always(function(){o._arrLyrTimeout[t]=null,o._arrLyrRequest[t]=null})}o.call(r,e,t)}}else e.clear();this._arrLyrTimeout[t]=setTimeout(n,e.onDemandDelay)},t.prototype.triggerMoveCallback=function(e,t,o){if(void 0===e&&void 0===o)throw"either the function index or the id must be defined";if("number"!=typeof e&&(e=this._mapMoveCallbacks.indexOf(this._mapMoveCallbacksLookup[o])),e<0)return void console.log("function not found");null!=this._mapMoveCallbackTimeout[e]&&(clearTimeout(this._mapMoveCallbackTimeout[e]),this._mapMoveCallbackTimeout[e]=null);var n=this._mapMoveCallbackContext[e],r=this._mapMoveCallbacks[e],i=this,a=function(){null!==n?r.call(n,i._mapExtent,i._zoomLevel,t):r(i._mapExtent,i._zoomLevel,t)};this._mapMoveCallbackTimeout[e]=setTimeout(a,this._mapMoveCallbackDelays[e])},t.prototype.addVectorLayer=function(e,t){if(void 0===t&&(t=!0),this._arrLayer.indexOf(e)>-1)return void console.log("already added "+e.name+" to map move");this._checkInit(),this._arrLyrRequest.push(null),this._arrLyrTimeout.push(null),this._arrLayer.push(e),this._lookupLayer[e.id]=e,(t="boolean"!=typeof t||t)&&(void 0===this._mapExtent&&this._updateMapExtent(),this.triggerLyrLoad(e,this._arrLayer.length-1))},t.prototype.addCallback=function(e,t,o,n,r){if(this._mapMoveCallbacks.indexOf(e)>-1)return void console.log("this function already added to map move");this._checkInit(),r||(r=l.default()),this._mapMoveCallbacks.push(e),this._mapMoveCallbacksLookup[r]=e,this._mapMoveCallbackDelays.push("number"==typeof o?o:50),this._mapMoveCallbackContext.push(i.definedAndNotNull(t)?t:null),this._mapMoveCallbackTimeout.push(null),(n="boolean"!=typeof n||n)&&(void 0===this._mapExtent&&this._updateMapExtent(),this.triggerMoveCallback(this._mapMoveCallbacks.length-1))},t}(r.default);t.MapMoveCls=u,p.MapMoveCls=u,t.default=u},13:function(e,t,o){"use strict";var n=this&&this.__extends||function(){var e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var o in t)t.hasOwnProperty(o)&&(e[o]=t[o])};return function(t,o){function n(){this.constructor=t}e(t,o),t.prototype=null===o?Object.create(o):(n.prototype=o.prototype,new n)}}();Object.defineProperty(t,"__esModule",{value:!0});var r=o(5),i=o(0),a=o(2),l=o(1),s=i.default("olHelpers"),p=function(){function e(e,t,o,n,r){this.feature=e,this.layer=t,this.layerIndex=o,this.selectionLayer=n,this.popupContent="",this.esriLayerName="string"==typeof r?r:void 0}return Object.defineProperty(e.prototype,"layerName",{get:function(){return"string"==typeof this.esriLayerName?this.esriLayerName:this.layer.name},enumerable:!0,configurable:!0}),e}();t.FeatureLayerProperties=p;var u=function(e){function t(){var t=e.call(this,"map popup")||this;return t._arrPopupLayerIds=[],t._arrPopupLayers=[],t._arrPopupContentFunction=[],t._$popupContainer=void 0,t._$popupContent=void 0,t._$popupCloser=void 0,t._popupOverlay=void 0,t._selectionLayers=[],t._selectionLayerLookup={},t._mapClickFunctions=[],t._popupChangedFunctions=[],t._esriMapServiceLayers=[],t._popupOpen=!1,t._popupCoordinate=null,t._passThroughLayerFeatureArray=[],t._currentPopupIndex=-1,t._popupContentLength=0,t}return n(t,e),t.prototype.init=function(t){var o=this;e.prototype.init.call(this,t);var n,r=this.map.getTarget();n=l("string"==typeof r?"#"+r:r),n.append('<div class="ol-popup"><span class="ol-popup-closer">X</span><div class="popup-content"></div></div>'),this._$popupContainer=n.find(".ol-popup"),this._$popupContent=n.find(".popup-content"),this._$popupCloser=n.find(".ol-popup-closer");var i=function(e){return a.easing.inAndOut(e)};this._popupOverlay=new a.Overlay({element:this._$popupContainer[0],autoPan:!0,autoPanAnimation:{duration:250,source:t.getView().getCenter(),easing:i}}),this._map.addOverlay(this._popupOverlay),this._$popupCloser.click(function(e){o.closePopup()}),this._map.on("singleclick",function(e){if(o.closePopup(),o._popupCoordinate=e.coordinate,o._esriMapServiceLayers.length>0)for(var t={geometry:e.coordinate.join(","),geometryType:"esriGeometryPoint",layers:"all",sr:o._map.getView().getProjection().getCode().split(":")[1],mapExtent:o._map.getView().calculateExtent(o._map.getSize()).join(","),imageDisplay:o._map.getSize().join(",")+",96",returnGeometry:!0,tolerance:15,f:"pjson"},n=0,r=o._esriMapServiceLayers;n<r.length;n++){var i=r[n];i.getPopupInfo(t)}var a=o._featuresAtPixel(e.pixel);o._passThroughLayerFeatureArray=[],o._currentPopupIndex=-1;for(var l=0;l<a.length;l++){var s=a[l],p=s.feature.getProperties(),u=o._arrPopupContentFunction[s.layerIndex](p,o._$popupContent);u===!1||("string"==typeof u?(s.popupContent=u,o._passThroughLayerFeatureArray.push(s)):s.selectionLayer.getSource().addFeature(s.feature))}o._popupContentLength=o._passThroughLayerFeatureArray.length,o._currentPopupIndex=-1;var c='<div class="ol-popup-nav">';c+='<span class="previous-popup ol-popup-nav-arrow">&#9664;</span>',c+='<span class="next-popup ol-popup-nav-arrow">&#9654;</span>',c+='<span class="current-popup-item-number" style="font-weight: bold;"></span>',c+="<span>&nbsp;of&nbsp;</span>",c+='<span class="popup-content-length" style="font-weight: bold;">'+o._popupContentLength+"</span>",c+="<span>&nbsp;&nbsp;-&nbsp;&nbsp;</span>",c+='<span class="current-popup-layer-name"></span>',c+="</div>",c+='<div class="ol-popup-inner">',c+="</div>",o._$popupContent.html(c),o._$popupContent.find(".previous-popup").click(function(){1!=o._popupContentLength&&(0==o._currentPopupIndex?o._currentPopupIndex=o._popupContentLength-1:o._currentPopupIndex--,o._triggerFeatSelect())});var d=o._$popupContent.find(".next-popup");d.click(function(){1==o._popupContentLength&&o._currentPopupIndex>-1||(o._currentPopupIndex==o._popupContentLength-1?o._currentPopupIndex=0:o._currentPopupIndex++,o._triggerFeatSelect())}),o._popupContentLength>0&&(d.trigger("click"),o._popupOverlay.setPosition(o._popupCoordinate),o._$popupContent.scrollTop(0),o._popupOpen=!0)}),this._map.on("pointermove",function(e){if(!e.dragging){var t=o.map.getEventPixel(e.originalEvent),n=!1;o.map.forEachFeatureAtPixel(t,function(e,t){if(!n)for(var r=0,i=o._arrPopupLayers;r<i.length;r++){var a=i[r];if(a.olLayer==t){n=!0;break}}});o.map.getTargetElement().style.cursor=n?"pointer":""}})},t.prototype._triggerFeatSelect=function(){var e=this._$popupContent.find(".current-popup-item-number"),t=this._$popupContent.find(".ol-popup-inner"),o=this._$popupContent.find(".current-popup-layer-name");this.clearSelection();var n=this._passThroughLayerFeatureArray[this._currentPopupIndex];e.html((this._currentPopupIndex+1).toFixed()),o.html(n.layerName),t.html(n.popupContent),n.selectionLayer.getSource().addFeature(n.feature);for(var r=0,i=this._popupChangedFunctions;r<i.length;r++){(0,i[r])(this._$popupContent)}},t.prototype.addMapServicePopupContent=function(e,t,o,n){var r=new p(e,t,this._popupContentLength,this._selectionLayerLookup[t.id],n);r.popupContent=o,this._passThroughLayerFeatureArray.push(r),this._popupContentLength++,l(".popup-content-length").html(this._popupContentLength.toFixed()),this._popupOpen||(this._$popupContent.find(".next-popup").trigger("click"),this._popupOverlay.setPosition(this._popupCoordinate),this._$popupContent.scrollTop(0),this._popupOpen=!0)},t.prototype._featuresAtPixel=function(e){var t=this,o=[];return this.map.forEachFeatureAtPixel(e,function(e,n){var r,i=!1,a=null;for(r=0;r<t._arrPopupLayers.length;r++)if(a=t._arrPopupLayers[r],a.olLayer===n){i=!0;break}i&&o.push(new p(e,a,r,t._selectionLayers[r]))}),o},t.prototype.closePopup=function(){return this._checkInit(),this._popupOpen=!1,this._popupOverlay.setPosition(void 0),this._$popupCloser[0].blur(),this.clearSelection(),this._$popupContent.html(""),!1},t.prototype.addPopupChangedFunction=function(e){this._popupChangedFunctions.push(e)},t.prototype._addPopupLayer=function(e,t){this._checkInit(),t=t||{},t.color=t.color||"rgba(255,170,0,0.5)",t.width=t.width||10;var o;o=t.olStyle?t.olStyle:new a.style.Style({stroke:new a.style.Stroke({color:t.color,width:t.width}),image:new a.style.Circle({radius:7,fill:new a.style.Fill({color:t.color}),stroke:new a.style.Stroke({color:t.color,width:1})}),fill:new a.style.Fill({color:t.color})});var n=new a.layer.Vector({source:new a.source.Vector,style:o});return n.setZIndex(100),this._selectionLayers.push(n),this._selectionLayerLookup[e.id]=n,this.map.addLayer(n),n},t.prototype.addVectorPopup=function(e,t,o){var n=this._addPopupLayer(e,o);return this._arrPopupLayerIds.push(e.id),this._arrPopupLayers.push(e),this._arrPopupContentFunction.push(t),n},t.prototype.removeVectorPopup=function(e){var t=this._arrPopupLayerIds.indexOf(e.id);t>-1&&(this._arrPopupLayerIds.splice(t,1),this._arrPopupLayers.splice(t,1),this._arrPopupContentFunction.splice(t,1),this._selectionLayers.splice(t,1),delete this._selectionLayerLookup[e.id])},t.prototype.addMapServicePopup=function(e,t){var o=this._addPopupLayer(e,t);return this._esriMapServiceLayers.push(e),o},t.prototype.clearSelection=function(){this._checkInit();for(var e=0;e<this._selectionLayers.length;e++)this._selectionLayers[e].getSource().clear();for(var t=0,o=this._mapClickFunctions;t<o.length;t++){(0,o[t])()}},t.prototype.addMapClickFunction=function(e){this._mapClickFunctions.push(e)},t}(r.default);t.MapPopupCls=u,s.MapPopupCls=u,t.default=u},14:function(e,t,o){"use strict";function n(e){void 0===e&&(e={}),e.divId=e.divId||"map",e.center=e.center||{x:-10018378,y:5574910},e.zoom="number"==typeof e.zoom?e.zoom:7,e.baseSwitcher="boolean"!=typeof e.baseSwitcher||e.baseSwitcher,e.fullScreen="boolean"==typeof e.fullScreen&&e.fullScreen,e.addGeocode=e.addGeocode||!1,a("#"+e.divId).css("position","relative");var t=new i.layer.Tile({source:new i.source.OSM});if(e.baseSwitcher,e.zoom<0||e.zoom>28)throw"zoom out of range";if(e.center.x>=-180&&e.center.x<=180&&e.center.y>=-90&&e.center.y<=90){var o=new i.geom.Point([e.center.x,e.center.y]);new i.proj.Projection({code:"EPSG:4326"}),o.transform(new i.proj.Projection({code:"EPSG:4326"}),new i.proj.Projection({code:"EPSG:3857"}));var n=o.getCoordinates();e.center.x=n[0],e.center.y=n[1]}var r=i.control.defaults({attributionOptions:{collapsible:!1}}),s=new i.View({center:[e.center.x,e.center.y],zoom:e.zoom,minZoom:e.minZoom,maxZoom:e.maxZoom}),p=new i.Map({layers:[t],target:e.divId,controls:r,view:s});return e.fullScreen&&p.addControl(new i.control.FullScreen({})),e.addGeocode&&new l.Geocode(document.getElementById(e.divId),p),p}Object.defineProperty(t,"__esModule",{value:!0});var r=o(0),i=o(2),a=o(1),l=o(11),s=r.default("olHelpers");t.quickMapBase=n,s.quickMapBase=n,t.default=n},17:function(e,t,o){"use strict";function n(e){return"number"==typeof e?e%1==0&&e>=0&&e<=28?l[e]:void console.log("invalid zoom level provided: "+e):void 0}function r(e){for(var t=0;t<l.length;t++)if(e>=l[t])return t;return 0}Object.defineProperty(t,"__esModule",{value:!0});var i=o(0),a=i.default("olHelpers.zoomResolutionConvert"),l=[156543.03392804097,78271.51696402048,39135.75848201024,19567.87924100512,9783.93962050256,4891.96981025128,2445.98490512564,1222.99245256282,611.49622628141,305.748113140705,152.8740565703525,76.43702828517625,38.21851414258813,19.109257071294063,9.554628535647032,4.777314267823516,2.388657133911758,1.194328566955879,.5971642834779395,.29858214173896974,.14929107086948487,.07464553543474244,.03732276771737122,.01866138385868561,.009330691929342804,.004665345964671402,.002332672982335701,.0011663364911678506,.0005831682455839253];t.zoomToResolution=n,a.zoomToResolution=n,t.resolutionToZoom=r,a.resolutionToZoom=r},2:function(e,t){e.exports=ol},25:function(e,t,o){"use strict";function n(e,t){return"https://transportal.cee.wisc.edu/applications/arcgis2/rest/services/"+e+"/"+t+"/MapServer"}function r(e,t){var o=window.location.href,n="/mapserver/"+e+"/"+t;return o.indexOf("transportal.cee.wisc.edu")>-1&&(n=o.toLowerCase().indexOf("webmapsstage")>-1?"https://transportal.cee.wisc.edu/gis/webmapsstage"+n:"https://transportal.cee.wisc.edu/gis/webmaps"+n),n}var i=this&&this.__extends||function(){var e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var o in t)t.hasOwnProperty(o)&&(e[o]=t[o])};return function(t,o){function n(){this.constructor=t}e(t,o),t.prototype=null===o?Object.create(o):(n.prototype=o.prototype,new n)}}();Object.defineProperty(t,"__esModule",{value:!0});var a=o(10),l=o(27),s=o(4),p=o(0),u=o(2),c=o(1),d=p.default("layers");t.makeServiceUrl=n,t.localCacheUrl=r;var h=function(e){function t(t,o){void 0===o&&(o={});var n=e.call(this,t,o)||this;return n._source=new u.source.TileArcGISRest({url:""==n.url?void 0:n.url,params:void 0===o.showLayers?void 0:{layers:"show:"+o.showLayers.join(",")}}),n._showLayers=o.showLayers||[],n._olLayer=new u.layer.Tile({source:n._source,visible:n.visible,opacity:n.opacity,minResolution:n._minResolution,maxResolution:n._maxResolution}),n._olLayer.setZIndex(n._zIndex),o.addPopup="boolean"==typeof o.addPopup&&o.addPopup,n._esriFormat=new u.format.EsriJSON,n._popupRequest=null,o.getLegend="boolean"!=typeof o.getLegend||o.getLegend,o.getLegend&&n.addLegendContent(),o.addPopup&&s.default.addMapServicePopup(n),n}return i(t,e),t.prototype.addLegendContent=function(t){var o=this,n=this.url;"/"!==n[n.length-1]&&(n+="/"),n+="legend?f=pjson&callback=?",c.get(n,{},function(t){var n=l.makeMapServiceLegend(t,o._showLayers);e.prototype.addLegendContent.call(o,n)},"json")},t.prototype.getPopupInfo=function(e){if(this.visible){var t=this.url;"/"!=t[t.length-1]&&(t+="/"),t+="identify?callback=?";var o=this;null!=this._popupRequest&&this._popupRequest.abort(),this._popupRequest=c.get(t,e,function(e){for(var t=0,n=e.results;t<n.length;t++){var r=n[t],i='<table class="esri-popup-table">';for(var a in r.attributes)if(r.attributes.hasOwnProperty(a)){var l=r.attributes[a];if(null==l||"null"==l.toString().toLowerCase())continue;var p=a;p.length>14&&(p=p.slice(0,11)+"..."),i+="<tr><td>"+p+"</td><td>"+l+"</td></tr>"}i+="</table>",s.default.addMapServicePopupContent(o._esriFormat.readFeature(r),o,i,r.layerName)}},"json"),this._popupRequest.always(function(){o._popupRequest=null})}},Object.defineProperty(t.prototype,"source",{get:function(){return e.prototype.getSource.call(this)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"olLayer",{get:function(){return e.prototype.getOlLayer.call(this)},enumerable:!0,configurable:!0}),t}(a.LayerBase);t.LayerEsriMapServer=h,d.LayerEsriMapServer=h,t.default=h},27:function(e,t,o){"use strict";function n(e,t){return"rgba("+e[0]+","+e[1]+","+e[2]+","+t+")"}function r(e){return String(e).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function i(e){var t=e.drawingInfo.renderer,o=null;switch(t.type){case"simple":switch(e.geometryType){case"esriGeometryPoint":o=new g(e,h);break;case"esriGeometryPolyline":o=new g(e,y);break;case"esriGeometryPolygon":o=new g(e,f);break;default:console.log(e),alert(e.geometryType+" not handled")}break;case"uniqueValue":switch(e.geometryType){case"esriGeometryPoint":o=new _(e,h);break;case"esriGeometryPolyline":o=new _(e,y);break;case"esriGeometryPolygon":o=new _(e,f);break;default:console.log(e),alert(e.geometryType+" not handled")}break;default:alert("not handled renderer type: "+t.type)}return null==o?{style:void 0,legend:""}:{style:o.olStyle,legend:o.legendHtml}}function a(e,t){void 0===t&&(t=!1),t="boolean"==typeof t&&t;var o=e.layerName,n=e.legend,i="";if(t||(i+='<span class="legend-layer-subitem">'+o+"</span>"),1==n.length)i='<img class="legend-layer-icon" height="17" src="data:image/png;base64,'+n[0].imageData+'">';else{t||(i+='<span class="legend-items-expander" title="Expand/Collapse">&#9660;</span>'),i+="<ul>";for(var a=0;a<n.length;a++)i+="<li>",i+='<span class="legend-layer-subitem">'+r(n[a].label)+"</span>",i+='<img class="legend-layer-icon" height="17" src="data:image/png;base64,'+n[a].imageData+'">',i+="</li>";i+="</ul>"}return t||(i='<span class="legend-layer-subitem">'+o+"</span>"+i),i}function l(e,t){void 0===t&&(t=[]);var o="",n=e.layers;if(1==n.length)o+=a(n[0],!0);else{o+="<ul>";for(var r=0;r<n.length;r++)t.length>0&&t.indexOf(r)<0||(o+="<li>"+a(n[r])+"</li>");o+="</ul>"}return o}var s=this&&this.__extends||function(){var e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var o in t)t.hasOwnProperty(o)&&(e[o]=t[o])};return function(t,o){function n(){this.constructor=t}e(t,o),t.prototype=null===o?Object.create(o):(n.prototype=o.prototype,new n)}}();Object.defineProperty(t,"__esModule",{value:!0});var p=o(0),u=o(2),c=p.default("olHelpers.esriToOlStyle");c.htmlEscape=r;var d=function(){function e(e,t){this.symbolObj=e,this.opacity=t,this.olStyle=void 0,this.legendHtml=""}return e}(),h=function(e){function t(t,o){var r=e.call(this,t,o)||this;switch(r.symbolObj.type){case"esriSMS":var i=n(r.symbolObj.color,r.opacity),a=n(r.symbolObj.outline.color,r.opacity),l=r.symbolObj.outline.width,s=r.symbolObj.size;r.olStyle=new u.style.Style({image:new u.style.Circle({radius:s,fill:new u.style.Fill({color:i}),stroke:new u.style.Stroke({color:a,width:l})})}),r.legendHtml='<span class="legend-layer-icon" style="color: '+i+'">&#9679;</span>';break;case"esriPMS":r.olStyle=new u.style.Style({image:new u.style.Icon({src:"data:image/png;base64,"+r.symbolObj.imageData})}),r.legendHtml='<img class="legend-layer-icon" height="17" src="data:image/png;base64,'+r.symbolObj.imageData+'">';break;default:console.log(r.symbolObj),alert("Point symbol does not handle symbol type: "+r.symbolObj.type)}return r}return s(t,e),t}(d),y=function(e){function t(t,o){var r=e.call(this,t,o)||this;switch(r.symbolObj.type){case"esriSLS":var i=n(r.symbolObj.color,r.opacity),a=r.symbolObj.width;r.olStyle=new u.style.Style({stroke:new u.style.Stroke({color:i,width:a})}),r.legendHtml='<span class="legend-layer-icon" ',r.legendHtml+='style="',r.legendHtml+="background-color: "+i+";",r.legendHtml+="width: 40px;",r.legendHtml+="height: 4px;",r.legendHtml+="position: relative;",r.legendHtml+="display: inline-block;",r.legendHtml+="top: -1px;",r.legendHtml+='"></span>';break;default:console.log(r.symbolObj),alert("Line symbol does not handle symbol type: "+r.symbolObj.type)}return r}return s(t,e),t}(d),f=function(e){function t(t,o){var r=e.call(this,t,o)||this;switch(r.symbolObj.type){case"esriSFS":var i=n(r.symbolObj.color,r.opacity),a=n(r.symbolObj.outline.color,r.opacity),l=r.symbolObj.outline.width;r.olStyle=new u.style.Style({stroke:new u.style.Stroke({color:a,width:l}),fill:new u.style.Fill({color:i})}),r.legendHtml='<span class="legend-layer-icon" ',r.legendHtml+='style="',r.legendHtml+="background-color: "+i+";",r.legendHtml+="border: solid "+a+" 1px;",r.legendHtml+="width: 40px;",r.legendHtml+="height: 9px;",r.legendHtml+="position: relative;",r.legendHtml+="display: inline-block;",r.legendHtml+="top: 2px;",r.legendHtml+='"></span>';break;default:console.log(r.symbolObj),alert("Polygon symbol does handle symbol type: "+r.symbolObj.type)}return r}return s(t,e),t}(d),m=function(){function e(e){this.opacity=(100-(e.drawingInfo.transparency||0))/100,this.renderer=e.drawingInfo.renderer,this.olStyle=void 0,this.legendHtml=""}return e}(),g=function(e){function t(t,o){var n=e.call(this,t)||this;n.symbol=n.renderer.symbol;var r=new o(n.symbol,n.opacity);return n.olStyle=r.olStyle,n.legendHtml=r.legendHtml,n}return s(t,e),t}(m),_=function(e){function t(t,o){var n=e.call(this,t)||this;if(n.uniqueValueInfos=n.renderer.uniqueValueInfos,n.propertyName=n.renderer.field1,n.defaultSymbol=n.renderer.defaultSymbol,n.defaultSymbol){var i=new o(n.defaultSymbol,n.opacity);n.defaultStyle=i.olStyle,n.defaultLabelHtml='<span class="legend-layer-subitem">'+r(n.renderer.defaultLabel)+"</span>"+i.legendHtml}else n.defaultStyle=void 0,n.defaultLabelHtml="other";n.valueArray=[],n.labelArray=[],n.legendArray=[],n.propertyStyleLookup={};for(var a=0,l=n.uniqueValueInfos;a<l.length;a++){var s=l[a];n.labelArray.push(s.label),n.valueArray.push(s.value);var p=new o(s.symbol,n.opacity);n.legendArray.push('<span class="legend-layer-subitem">'+r(s.label)+"</span>"+p.legendHtml),n.propertyStyleLookup[s.value]=p.olStyle}n.olStyle=function(e){var t=e.getProperties(),o=t[n.propertyName];return void 0!==n.propertyStyleLookup[o]?[n.propertyStyleLookup[o]]:[n.defaultStyle]},null!==n.defaultLabelHtml&&n.legendArray.push(n.defaultLabelHtml),n.legendHtml="<ul>";for(var u=0,c=n.legendArray;u<c.length;u++){var d=c[u];n.legendHtml+="<li>"+d+"</li>"}return n.legendHtml+="</ul>",n}return s(t,e),t}(m);t.makeFeatureServiceLegendAndSymbol=i,c.makeFeatureServiceLegendAndSymbol=i,t.makeMapServiceLegend=l,c.makeMapServiceLegend=l},3:function(e,t,o){"use strict";function n(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(e){var t=16*Math.random()|0;return("x"==e?t:3&t|8).toString(16)})}Object.defineProperty(t,"__esModule",{value:!0});var r=o(0),i=r.default("util");t.makeGuid=n,i.makeGuid=n,t.default=n},4:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=o(13);t.mapPopup=new n.default,t.default=t.mapPopup},5:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=o(0),r=n.default("olHelpers"),i=function(){function e(e){this._map=null,this._initialized=!1,this._subtype=e}return e.prototype.init=function(e){this._initialized||(this._map=e,this._initialized=!0)},Object.defineProperty(e.prototype,"map",{get:function(){return this._map},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"initialized",{get:function(){return this._initialized},enumerable:!0,configurable:!0}),e.prototype._checkInit=function(){if(!this.initialized){var e=this._subtype+" object not initialized";throw alert(e),console.log(e),e}},e.prototype.checkInit=function(){this._checkInit()},e}();t.MapInteractionBase=i,r.MapInteractionBase=i,t.default=i},6:function(e,t,o){"use strict";function n(e){void 0===e&&(e={});var t=r.quickMapBase(e);return a.default.init(t),l.default.init(t),t}Object.defineProperty(t,"__esModule",{value:!0});var r=o(14),i=o(0),a=o(7),l=o(4),s=i.default("olHelpers");t.quickMap=n,s.quickMap=n,t.default=n},60:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=o(0),r=o(1),i=n.default("collections.layerSwipe"),a=function(){function e(e,t){void 0===t&&(t="");var o=this;t=t||"",this.leftLayers=[],this.rightLayers=[],this._percentRight=50,this.offset=null,this._map=e,this.$mapElement=r(e.getTargetElement()),this.$mapElement.append('<div class="layer-swiper">'+t+"</div>"),this.$swiper=this.$mapElement.find(".layer-swiper"),this.percentRight=this.percentRight,this.dragging=!1,this.$mapElement.mouseleave(function(){o.dragging=!1}),this.$swiper.bind("mousewheel DOMMouseScroll",function(e){e.preventDefault()}),this.$swiper.mousedown(function(e){o.dragging=!0,o.offset=e.offsetX}),r(window).mouseup(function(){o.dragging=!1}),this.$mapElement.mousemove(function(e){if(o.dragging){var t=o.$mapElement.position().left,n=o.$mapElement.width();o.percentRight=100*(e.pageX-o.offset-t)/n}})}return e.prototype.addLeftLayer=function(e){var t=this;this.leftLayers.indexOf(e)==-1&&(e.olLayer.on("precompose",function(e){var o=e.context,n=o.canvas.width*(t.percentRight/100);o.save(),o.beginPath(),o.rect(0,0,n,o.canvas.height),o.clip()}),e.olLayer.on("postcompose",function(e){e.context.restore()}),this.leftLayers.push(e))},e.prototype.addRightLayer=function(e){var t=this;this.rightLayers.indexOf(e)==-1&&(e.olLayer.on("precompose",function(e){var o=e.context,n=o.canvas.width*(t.percentRight/100);o.save(),o.beginPath(),o.rect(n,0,o.canvas.width-n,o.canvas.height),o.clip()}),e.olLayer.on("postcompose",function(e){e.context.restore()}),this.rightLayers.push(e))},Object.defineProperty(e.prototype,"percentRight",{get:function(){return this._percentRight},set:function(e){var t=this.$swiper.position().left+this.$swiper.width()>this.$mapElement.width();e<0||t&&e>this.percentRight||(this._percentRight=e,this.$swiper.css("left",this._percentRight.toFixed(2)+"%"),this._map.render())},enumerable:!0,configurable:!0}),e}();i.LayerSwipe=a,t.default=a},7:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=o(12);t.mapMove=new n.default,t.default=t.mapMove},70:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=o(6),r=o(60),i=o(25),a=n.quickMap(),l=new r.default(a),s=new i.LayerEsriMapServer("https://transportal.cee.wisc.edu/applications/arcgis2/rest/services/MetaManager/Metamanager_regions/MapServer",{minZoom:6,maxZoom:12,name:"WisDOT Regions"}),p=new i.LayerEsriMapServer("https://transportal.cee.wisc.edu/applications/arcgis2/rest/services/MetaManager/MM_All_Segments/MapServer",{minZoom:7,visible:!0,name:"Metamanager Segments"}),u=new i.LayerEsriMapServer("https://transportal.cee.wisc.edu/applications/arcgis2/rest/services/NPMRDS/compareDynamic/MapServer",{minZoom:7,visible:!0,name:"truck2014",showLayers:[8]}),c=new i.LayerEsriMapServer("https://transportal.cee.wisc.edu/applications/arcgis2/rest/services/NPMRDS/compareDynamic/MapServer",{minZoom:7,visible:!0,name:"truck2015",showLayers:[9]});a.addLayer(s.olLayer),a.addLayer(u.olLayer),a.addLayer(c.olLayer),a.addLayer(p.olLayer),l.addLeftLayer(s),l.addRightLayer(p),l.addLeftLayer(u),l.addRightLayer(c),setTimeout(function(){},5e3)},8:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=o(2);t.proj4326=new n.proj.Projection({code:"EPSG:4326"}),t.proj3857=new n.proj.Projection({code:"EPSG:3857"}),t.proj3070=new n.proj.Projection({code:"EPSG:3070"})},9:function(e,t,o){"use strict";function n(e){return void 0===e||null===e}function r(e){return!n(e)}Object.defineProperty(t,"__esModule",{value:!0});var i=o(0),a=i.default("util.checkDefined");t.undefinedOrNull=n,a.undefinedOrNull=n,t.definedAndNotNull=r,a.definedAndNotNull=r}});
//# sourceMappingURL=compare-test.js.map