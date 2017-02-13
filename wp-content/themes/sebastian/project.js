/*jshint -W117 */
/*jshint -W082 */

jQuery(document).ready(function(){

	//HOME PAGE - Dragend Image Gallery
	if ( jQuery('html').data('page-slug') == 'home' ){
        homeResize();
        jQuery(window).resize(function(){
            homeResize();
        });
		function homeResize(){
	        console.log("project.js/home:resize");
            if(jQuery('#homeGallery').height() == jQuery(window).height()){
                jQuery('#pageTitle').appendTo('#homeGallery');
                jQuery('#homeGallery').css('position','relative');
                jQuery('#pageTitle').addClass('galleryBottom');
            }
            else{
                jQuery('#pageTitle').insertAfter('#homeGallery');
                jQuery('#pageTitle').removeClass('galleryBottom');
            }

		}

	}//home page

	//PROJECTS PAGE - Dragend Image Gallery
	if ( jQuery('html').data('page-slug') == 'projects' || jQuery('html').data('page-slug') == 'portfolio'){
		jQuery(window).on('resize', projectsResize() );
		jQuery(window).on('resize', applyIso() );

		function projectsResize(){
			console.log("project.js/projects:resize H: " + viewHeight + " W: " + viewWidth);
		}

        // Portfolio Masonary

	}//projects page

    //CONTACT PAGE -
    if ( jQuery('html').data('page-slug') == 'contact'){

    }//contact page
});

'use strict';
/* jshint -W097 */
/* jshint -W117 */

//Settings
var mobileNavOnly 		= true;
var pageLoader 			= true;
var devTesting 			= false;
var mobilePortrait 		= 414;
var mobileLandscape 	= 767;
var tabletLandscape 	= 1024;

//Elements
var html 		= document.documentElement;
var body 		= document.body;
var wrapper 	= get('wrapper');
var footer      = get('footer');
var pageLoader  = get('pageLoader');
var navOpenBtn  = get('navOpenBtn');
var navCloseBtn = get('navCloseBtn');

var viewWidth 	= window.innerWidth;
var viewHeight 	= window.innerHeight;
var viewAsp 	= (window.innerWidth/window.innerHeight).toFixed(2);
var docWidth 	= html.clientWidth;
var docHeight 	= "";
var breakPoint  = "";
var aspText 	= "";
var deviceType 	= jQuery('html').data('device-type');

function velcroReady(){
    pageLoader.style = ("visibility: hidden");
    removeClass(html, "no-js");
    addClass(html, "js-ready");
    velcroResize();
}

function velcroResize(){
    //Reset base values
	docWidth 	= html.clientWidth;
    docHeight 	= getDocHeight();
	viewWidth 	= window.innerWidth;
	viewHeight 	= window.innerHeight; //console.log(viewHeight);
	viewAsp		= ( viewWidth / viewHeight ).toFixed(2);
    breakPoint 	= getBreakpoint(mobileLandscape, tabletLandscape);
	aspText 	= getOrientationClass();

    //Check if the menu class should change
    navClasses();

    //Set min-height to the viewportSize on structural elements
    minHeight(wrapper, viewHeight);
    var wrapHeight = jQuery('#wrapper').height();
    minHeight(html, wrapHeight);
    minHeight(body, wrapHeight);

    //Vertical Align Hack
    var vAlignHeight = 0;
    jQuery('.vAlignWrap').height('auto');
    jQuery('h2.vAlignMiddle').each(function() {
        if (jQuery(this).height() > vAlignHeight) {
            vAlignHeight = jQuery(this).height();
        }
    });
    jQuery('.vAlignWrap').height(vAlignHeight);

    //Set height of mobile menu
    //menuHeight(docHeight);

    //Adjust footer possition on mismatched screen / document sizes
    fixToBottom(footer);

    //If devTesting TRUE init testPanel
    if (devTesting === true){
		testPanel();
	}

	//Log current device info
	console.log('velcro.js/velcroResize dH:' + docHeight + ' - vH:' + viewHeight +  ' x vW:' + viewWidth + ' Asp:' + viewAsp + ' ' + aspText + ' - ' + deviceType + ' aka ' + breakPoint);

}// velcroResize

//FIX: make it work
//also adjust on "document" resize - as dynamic content changes
function checkDocHeight(){
    var bodyMinH = toInt(jQuery('body').css('min-height'));
    var wrapHeight = jQuery('#wrapper').height();
    if (bodyMinH !== wrapHeight){
        console.log('document height changed. Body min-h' + bodyMinH);
        minHeight(html, wrapHeight);
        minHeight(body, wrapHeight);
        //fixToBottom(footer);
    }
    setTimeout(checkDocHeight, 200);
}
//FIX: reintegrate 'debounce style' promises

//Scroll Menu
jQuery(window).scroll(function() {
    var scrollMenuOffset = jQuery('#header').height() + 25;
    var scrollMenuTimer;

	if(scrollMenuTimer) {
		window.clearTimeout(scrollMenuTimer);
	}
	scrollMenuTimer = window.setTimeout(function() {
        if (jQuery(this).scrollTop() > scrollMenuOffset) {
            jQuery(html).addClass('scrollMenu');
        }
        else {
            jQuery(html).removeClass('scrollMenu');

        }
    }, 100);
});
//Event Listeners
document.addEventListener("DOMContentLoaded", function() {
    velcroReady();

    //FIX: vanilla
    jQuery('#navOpenBtn, #navOpenBtnSticky').click(function() {
        addMenuOpenClass();
    });
    jQuery('#navCloseBtn').click(function() {
        removeMenuOpenClass();
    });

    window.addEventListener('resize', function() {
        velcroResize();
    });

});

//Mouse Events
var mouseDown = false;
document.addEventListener('mousedown', function() {
    mouseDown = true;
});

document.addEventListener('mouseup', function() {
    mouseDown = false;
});

/*!
 * Isotope PACKAGED v3.0.1
 *
 * Licensed GPLv3 for open source use
 * or Isotope Commercial License for commercial use
 *
 * http://isotope.metafizzy.co
 * Copyright 2016 Metafizzy
 */

!function(t,e){"use strict";"function"==typeof define&&define.amd?define("jquery-bridget/jquery-bridget",["jquery"],function(i){e(t,i)}):"object"==typeof module&&module.exports?module.exports=e(t,require("jquery")):t.jQueryBridget=e(t,t.jQuery)}(window,function(t,e){"use strict";function i(i,s,a){function u(t,e,n){var o,s="$()."+i+'("'+e+'")';return t.each(function(t,u){var h=a.data(u,i);if(!h)return void r(i+" not initialized. Cannot call methods, i.e. "+s);var d=h[e];if(!d||"_"==e.charAt(0))return void r(s+" is not a valid method");var l=d.apply(h,n);o=void 0===o?l:o}),void 0!==o?o:t}function h(t,e){t.each(function(t,n){var o=a.data(n,i);o?(o.option(e),o._init()):(o=new s(n,e),a.data(n,i,o))})}a=a||e||t.jQuery,a&&(s.prototype.option||(s.prototype.option=function(t){a.isPlainObject(t)&&(this.options=a.extend(!0,this.options,t))}),a.fn[i]=function(t){if("string"==typeof t){var e=o.call(arguments,1);return u(this,t,e)}return h(this,t),this},n(a))}function n(t){!t||t&&t.bridget||(t.bridget=i)}var o=Array.prototype.slice,s=t.console,r="undefined"==typeof s?function(){}:function(t){s.error(t)};return n(e||t.jQuery),i}),function(t,e){"function"==typeof define&&define.amd?define("ev-emitter/ev-emitter",e):"object"==typeof module&&module.exports?module.exports=e():t.EvEmitter=e()}("undefined"!=typeof window?window:this,function(){function t(){}var e=t.prototype;return e.on=function(t,e){if(t&&e){var i=this._events=this._events||{},n=i[t]=i[t]||[];return-1==n.indexOf(e)&&n.push(e),this}},e.once=function(t,e){if(t&&e){this.on(t,e);var i=this._onceEvents=this._onceEvents||{},n=i[t]=i[t]||{};return n[e]=!0,this}},e.off=function(t,e){var i=this._events&&this._events[t];if(i&&i.length){var n=i.indexOf(e);return-1!=n&&i.splice(n,1),this}},e.emitEvent=function(t,e){var i=this._events&&this._events[t];if(i&&i.length){var n=0,o=i[n];e=e||[];for(var s=this._onceEvents&&this._onceEvents[t];o;){var r=s&&s[o];r&&(this.off(t,o),delete s[o]),o.apply(this,e),n+=r?0:1,o=i[n]}return this}},t}),function(t,e){"use strict";"function"==typeof define&&define.amd?define("get-size/get-size",[],function(){return e()}):"object"==typeof module&&module.exports?module.exports=e():t.getSize=e()}(window,function(){"use strict";function t(t){var e=parseFloat(t),i=-1==t.indexOf("%")&&!isNaN(e);return i&&e}function e(){}function i(){for(var t={width:0,height:0,innerWidth:0,innerHeight:0,outerWidth:0,outerHeight:0},e=0;h>e;e++){var i=u[e];t[i]=0}return t}function n(t){var e=getComputedStyle(t);return e||a("Style returned "+e+". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"),e}function o(){if(!d){d=!0;var e=document.createElement("div");e.style.width="200px",e.style.padding="1px 2px 3px 4px",e.style.borderStyle="solid",e.style.borderWidth="1px 2px 3px 4px",e.style.boxSizing="border-box";var i=document.body||document.documentElement;i.appendChild(e);var o=n(e);s.isBoxSizeOuter=r=200==t(o.width),i.removeChild(e)}}function s(e){if(o(),"string"==typeof e&&(e=document.querySelector(e)),e&&"object"==typeof e&&e.nodeType){var s=n(e);if("none"==s.display)return i();var a={};a.width=e.offsetWidth,a.height=e.offsetHeight;for(var d=a.isBorderBox="border-box"==s.boxSizing,l=0;h>l;l++){var f=u[l],c=s[f],m=parseFloat(c);a[f]=isNaN(m)?0:m}var p=a.paddingLeft+a.paddingRight,y=a.paddingTop+a.paddingBottom,g=a.marginLeft+a.marginRight,v=a.marginTop+a.marginBottom,_=a.borderLeftWidth+a.borderRightWidth,I=a.borderTopWidth+a.borderBottomWidth,z=d&&r,x=t(s.width);x!==!1&&(a.width=x+(z?0:p+_));var S=t(s.height);return S!==!1&&(a.height=S+(z?0:y+I)),a.innerWidth=a.width-(p+_),a.innerHeight=a.height-(y+I),a.outerWidth=a.width+g,a.outerHeight=a.height+v,a}}var r,a="undefined"==typeof console?e:function(t){console.error(t)},u=["paddingLeft","paddingRight","paddingTop","paddingBottom","marginLeft","marginRight","marginTop","marginBottom","borderLeftWidth","borderRightWidth","borderTopWidth","borderBottomWidth"],h=u.length,d=!1;return s}),function(t,e){"use strict";"function"==typeof define&&define.amd?define("desandro-matches-selector/matches-selector",e):"object"==typeof module&&module.exports?module.exports=e():t.matchesSelector=e()}(window,function(){"use strict";var t=function(){var t=Element.prototype;if(t.matches)return"matches";if(t.matchesSelector)return"matchesSelector";for(var e=["webkit","moz","ms","o"],i=0;i<e.length;i++){var n=e[i],o=n+"MatchesSelector";if(t[o])return o}}();return function(e,i){return e[t](i)}}),function(t,e){"function"==typeof define&&define.amd?define("fizzy-ui-utils/utils",["desandro-matches-selector/matches-selector"],function(i){return e(t,i)}):"object"==typeof module&&module.exports?module.exports=e(t,require("desandro-matches-selector")):t.fizzyUIUtils=e(t,t.matchesSelector)}(window,function(t,e){var i={};i.extend=function(t,e){for(var i in e)t[i]=e[i];return t},i.modulo=function(t,e){return(t%e+e)%e},i.makeArray=function(t){var e=[];if(Array.isArray(t))e=t;else if(t&&"number"==typeof t.length)for(var i=0;i<t.length;i++)e.push(t[i]);else e.push(t);return e},i.removeFrom=function(t,e){var i=t.indexOf(e);-1!=i&&t.splice(i,1)},i.getParent=function(t,i){for(;t!=document.body;)if(t=t.parentNode,e(t,i))return t},i.getQueryElement=function(t){return"string"==typeof t?document.querySelector(t):t},i.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},i.filterFindElements=function(t,n){t=i.makeArray(t);var o=[];return t.forEach(function(t){if(t instanceof HTMLElement){if(!n)return void o.push(t);e(t,n)&&o.push(t);for(var i=t.querySelectorAll(n),s=0;s<i.length;s++)o.push(i[s])}}),o},i.debounceMethod=function(t,e,i){var n=t.prototype[e],o=e+"Timeout";t.prototype[e]=function(){var t=this[o];t&&clearTimeout(t);var e=arguments,s=this;this[o]=setTimeout(function(){n.apply(s,e),delete s[o]},i||100)}},i.docReady=function(t){var e=document.readyState;"complete"==e||"interactive"==e?t():document.addEventListener("DOMContentLoaded",t)},i.toDashed=function(t){return t.replace(/(.)([A-Z])/g,function(t,e,i){return e+"-"+i}).toLowerCase()};var n=t.console;return i.htmlInit=function(e,o){i.docReady(function(){var s=i.toDashed(o),r="data-"+s,a=document.querySelectorAll("["+r+"]"),u=document.querySelectorAll(".js-"+s),h=i.makeArray(a).concat(i.makeArray(u)),d=r+"-options",l=t.jQuery;h.forEach(function(t){var i,s=t.getAttribute(r)||t.getAttribute(d);try{i=s&&JSON.parse(s)}catch(a){return void(n&&n.error("Error parsing "+r+" on "+t.className+": "+a))}var u=new e(t,i);l&&l.data(t,o,u)})})},i}),function(t,e){"function"==typeof define&&define.amd?define("outlayer/item",["ev-emitter/ev-emitter","get-size/get-size"],e):"object"==typeof module&&module.exports?module.exports=e(require("ev-emitter"),require("get-size")):(t.Outlayer={},t.Outlayer.Item=e(t.EvEmitter,t.getSize))}(window,function(t,e){"use strict";function i(t){for(var e in t)return!1;return e=null,!0}function n(t,e){t&&(this.element=t,this.layout=e,this.position={x:0,y:0},this._create())}function o(t){return t.replace(/([A-Z])/g,function(t){return"-"+t.toLowerCase()})}var s=document.documentElement.style,r="string"==typeof s.transition?"transition":"WebkitTransition",a="string"==typeof s.transform?"transform":"WebkitTransform",u={WebkitTransition:"webkitTransitionEnd",transition:"transitionend"}[r],h={transform:a,transition:r,transitionDuration:r+"Duration",transitionProperty:r+"Property",transitionDelay:r+"Delay"},d=n.prototype=Object.create(t.prototype);d.constructor=n,d._create=function(){this._transn={ingProperties:{},clean:{},onEnd:{}},this.css({position:"absolute"})},d.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},d.getSize=function(){this.size=e(this.element)},d.css=function(t){var e=this.element.style;for(var i in t){var n=h[i]||i;e[n]=t[i]}},d.getPosition=function(){var t=getComputedStyle(this.element),e=this.layout._getOption("originLeft"),i=this.layout._getOption("originTop"),n=t[e?"left":"right"],o=t[i?"top":"bottom"],s=this.layout.size,r=-1!=n.indexOf("%")?parseFloat(n)/100*s.width:parseInt(n,10),a=-1!=o.indexOf("%")?parseFloat(o)/100*s.height:parseInt(o,10);r=isNaN(r)?0:r,a=isNaN(a)?0:a,r-=e?s.paddingLeft:s.paddingRight,a-=i?s.paddingTop:s.paddingBottom,this.position.x=r,this.position.y=a},d.layoutPosition=function(){var t=this.layout.size,e={},i=this.layout._getOption("originLeft"),n=this.layout._getOption("originTop"),o=i?"paddingLeft":"paddingRight",s=i?"left":"right",r=i?"right":"left",a=this.position.x+t[o];e[s]=this.getXValue(a),e[r]="";var u=n?"paddingTop":"paddingBottom",h=n?"top":"bottom",d=n?"bottom":"top",l=this.position.y+t[u];e[h]=this.getYValue(l),e[d]="",this.css(e),this.emitEvent("layout",[this])},d.getXValue=function(t){var e=this.layout._getOption("horizontal");return this.layout.options.percentPosition&&!e?t/this.layout.size.width*100+"%":t+"px"},d.getYValue=function(t){var e=this.layout._getOption("horizontal");return this.layout.options.percentPosition&&e?t/this.layout.size.height*100+"%":t+"px"},d._transitionTo=function(t,e){this.getPosition();var i=this.position.x,n=this.position.y,o=parseInt(t,10),s=parseInt(e,10),r=o===this.position.x&&s===this.position.y;if(this.setPosition(t,e),r&&!this.isTransitioning)return void this.layoutPosition();var a=t-i,u=e-n,h={};h.transform=this.getTranslate(a,u),this.transition({to:h,onTransitionEnd:{transform:this.layoutPosition},isCleaning:!0})},d.getTranslate=function(t,e){var i=this.layout._getOption("originLeft"),n=this.layout._getOption("originTop");return t=i?t:-t,e=n?e:-e,"translate3d("+t+"px, "+e+"px, 0)"},d.goTo=function(t,e){this.setPosition(t,e),this.layoutPosition()},d.moveTo=d._transitionTo,d.setPosition=function(t,e){this.position.x=parseInt(t,10),this.position.y=parseInt(e,10)},d._nonTransition=function(t){this.css(t.to),t.isCleaning&&this._removeStyles(t.to);for(var e in t.onTransitionEnd)t.onTransitionEnd[e].call(this)},d.transition=function(t){if(!parseFloat(this.layout.options.transitionDuration))return void this._nonTransition(t);var e=this._transn;for(var i in t.onTransitionEnd)e.onEnd[i]=t.onTransitionEnd[i];for(i in t.to)e.ingProperties[i]=!0,t.isCleaning&&(e.clean[i]=!0);if(t.from){this.css(t.from);var n=this.element.offsetHeight;n=null}this.enableTransition(t.to),this.css(t.to),this.isTransitioning=!0};var l="opacity,"+o(a);d.enableTransition=function(){if(!this.isTransitioning){var t=this.layout.options.transitionDuration;t="number"==typeof t?t+"ms":t,this.css({transitionProperty:l,transitionDuration:t,transitionDelay:this.staggerDelay||0}),this.element.addEventListener(u,this,!1)}},d.onwebkitTransitionEnd=function(t){this.ontransitionend(t)},d.onotransitionend=function(t){this.ontransitionend(t)};var f={"-webkit-transform":"transform"};d.ontransitionend=function(t){if(t.target===this.element){var e=this._transn,n=f[t.propertyName]||t.propertyName;if(delete e.ingProperties[n],i(e.ingProperties)&&this.disableTransition(),n in e.clean&&(this.element.style[t.propertyName]="",delete e.clean[n]),n in e.onEnd){var o=e.onEnd[n];o.call(this),delete e.onEnd[n]}this.emitEvent("transitionEnd",[this])}},d.disableTransition=function(){this.removeTransitionStyles(),this.element.removeEventListener(u,this,!1),this.isTransitioning=!1},d._removeStyles=function(t){var e={};for(var i in t)e[i]="";this.css(e)};var c={transitionProperty:"",transitionDuration:"",transitionDelay:""};return d.removeTransitionStyles=function(){this.css(c)},d.stagger=function(t){t=isNaN(t)?0:t,this.staggerDelay=t+"ms"},d.removeElem=function(){this.element.parentNode.removeChild(this.element),this.css({display:""}),this.emitEvent("remove",[this])},d.remove=function(){return r&&parseFloat(this.layout.options.transitionDuration)?(this.once("transitionEnd",function(){this.removeElem()}),void this.hide()):void this.removeElem()},d.reveal=function(){delete this.isHidden,this.css({display:""});var t=this.layout.options,e={},i=this.getHideRevealTransitionEndProperty("visibleStyle");e[i]=this.onRevealTransitionEnd,this.transition({from:t.hiddenStyle,to:t.visibleStyle,isCleaning:!0,onTransitionEnd:e})},d.onRevealTransitionEnd=function(){this.isHidden||this.emitEvent("reveal")},d.getHideRevealTransitionEndProperty=function(t){var e=this.layout.options[t];if(e.opacity)return"opacity";for(var i in e)return i},d.hide=function(){this.isHidden=!0,this.css({display:""});var t=this.layout.options,e={},i=this.getHideRevealTransitionEndProperty("hiddenStyle");e[i]=this.onHideTransitionEnd,this.transition({from:t.visibleStyle,to:t.hiddenStyle,isCleaning:!0,onTransitionEnd:e})},d.onHideTransitionEnd=function(){this.isHidden&&(this.css({display:"none"}),this.emitEvent("hide"))},d.destroy=function(){this.css({position:"",left:"",right:"",top:"",bottom:"",transition:"",transform:""})},n}),function(t,e){"use strict";"function"==typeof define&&define.amd?define("outlayer/outlayer",["ev-emitter/ev-emitter","get-size/get-size","fizzy-ui-utils/utils","./item"],function(i,n,o,s){return e(t,i,n,o,s)}):"object"==typeof module&&module.exports?module.exports=e(t,require("ev-emitter"),require("get-size"),require("fizzy-ui-utils"),require("./item")):t.Outlayer=e(t,t.EvEmitter,t.getSize,t.fizzyUIUtils,t.Outlayer.Item)}(window,function(t,e,i,n,o){"use strict";function s(t,e){var i=n.getQueryElement(t);if(!i)return void(u&&u.error("Bad element for "+this.constructor.namespace+": "+(i||t)));this.element=i,h&&(this.$element=h(this.element)),this.options=n.extend({},this.constructor.defaults),this.option(e);var o=++l;this.element.outlayerGUID=o,f[o]=this,this._create();var s=this._getOption("initLayout");s&&this.layout()}function r(t){function e(){t.apply(this,arguments)}return e.prototype=Object.create(t.prototype),e.prototype.constructor=e,e}function a(t){if("number"==typeof t)return t;var e=t.match(/(^\d*\.?\d*)(\w*)/),i=e&&e[1],n=e&&e[2];if(!i.length)return 0;i=parseFloat(i);var o=m[n]||1;return i*o}var u=t.console,h=t.jQuery,d=function(){},l=0,f={};s.namespace="outlayer",s.Item=o,s.defaults={containerStyle:{position:"relative"},initLayout:!0,originLeft:!0,originTop:!0,resize:!0,resizeContainer:!0,transitionDuration:"0.4s",hiddenStyle:{opacity:0,transform:"scale(0.001)"},visibleStyle:{opacity:1,transform:"scale(1)"}};var c=s.prototype;n.extend(c,e.prototype),c.option=function(t){n.extend(this.options,t)},c._getOption=function(t){var e=this.constructor.compatOptions[t];return e&&void 0!==this.options[e]?this.options[e]:this.options[t]},s.compatOptions={initLayout:"isInitLayout",horizontal:"isHorizontal",layoutInstant:"isLayoutInstant",originLeft:"isOriginLeft",originTop:"isOriginTop",resize:"isResizeBound",resizeContainer:"isResizingContainer"},c._create=function(){this.reloadItems(),this.stamps=[],this.stamp(this.options.stamp),n.extend(this.element.style,this.options.containerStyle);var t=this._getOption("resize");t&&this.bindResize()},c.reloadItems=function(){this.items=this._itemize(this.element.children)},c._itemize=function(t){for(var e=this._filterFindItemElements(t),i=this.constructor.Item,n=[],o=0;o<e.length;o++){var s=e[o],r=new i(s,this);n.push(r)}return n},c._filterFindItemElements=function(t){return n.filterFindElements(t,this.options.itemSelector)},c.getItemElements=function(){return this.items.map(function(t){return t.element})},c.layout=function(){this._resetLayout(),this._manageStamps();var t=this._getOption("layoutInstant"),e=void 0!==t?t:!this._isLayoutInited;this.layoutItems(this.items,e),this._isLayoutInited=!0},c._init=c.layout,c._resetLayout=function(){this.getSize()},c.getSize=function(){this.size=i(this.element)},c._getMeasurement=function(t,e){var n,o=this.options[t];o?("string"==typeof o?n=this.element.querySelector(o):o instanceof HTMLElement&&(n=o),this[t]=n?i(n)[e]:o):this[t]=0},c.layoutItems=function(t,e){t=this._getItemsForLayout(t),this._layoutItems(t,e),this._postLayout()},c._getItemsForLayout=function(t){return t.filter(function(t){return!t.isIgnored})},c._layoutItems=function(t,e){if(this._emitCompleteOnItems("layout",t),t&&t.length){var i=[];t.forEach(function(t){var n=this._getItemLayoutPosition(t);n.item=t,n.isInstant=e||t.isLayoutInstant,i.push(n)},this),this._processLayoutQueue(i)}},c._getItemLayoutPosition=function(){return{x:0,y:0}},c._processLayoutQueue=function(t){this.updateStagger(),t.forEach(function(t,e){this._positionItem(t.item,t.x,t.y,t.isInstant,e)},this)},c.updateStagger=function(){var t=this.options.stagger;return null===t||void 0===t?void(this.stagger=0):(this.stagger=a(t),this.stagger)},c._positionItem=function(t,e,i,n,o){n?t.goTo(e,i):(t.stagger(o*this.stagger),t.moveTo(e,i))},c._postLayout=function(){this.resizeContainer()},c.resizeContainer=function(){var t=this._getOption("resizeContainer");if(t){var e=this._getContainerSize();e&&(this._setContainerMeasure(e.width,!0),this._setContainerMeasure(e.height,!1))}},c._getContainerSize=d,c._setContainerMeasure=function(t,e){if(void 0!==t){var i=this.size;i.isBorderBox&&(t+=e?i.paddingLeft+i.paddingRight+i.borderLeftWidth+i.borderRightWidth:i.paddingBottom+i.paddingTop+i.borderTopWidth+i.borderBottomWidth),t=Math.max(t,0),this.element.style[e?"width":"height"]=t+"px"}},c._emitCompleteOnItems=function(t,e){function i(){o.dispatchEvent(t+"Complete",null,[e])}function n(){r++,r==s&&i()}var o=this,s=e.length;if(!e||!s)return void i();var r=0;e.forEach(function(e){e.once(t,n)})},c.dispatchEvent=function(t,e,i){var n=e?[e].concat(i):i;if(this.emitEvent(t,n),h)if(this.$element=this.$element||h(this.element),e){var o=h.Event(e);o.type=t,this.$element.trigger(o,i)}else this.$element.trigger(t,i)},c.ignore=function(t){var e=this.getItem(t);e&&(e.isIgnored=!0)},c.unignore=function(t){var e=this.getItem(t);e&&delete e.isIgnored},c.stamp=function(t){t=this._find(t),t&&(this.stamps=this.stamps.concat(t),t.forEach(this.ignore,this))},c.unstamp=function(t){t=this._find(t),t&&t.forEach(function(t){n.removeFrom(this.stamps,t),this.unignore(t)},this)},c._find=function(t){return t?("string"==typeof t&&(t=this.element.querySelectorAll(t)),t=n.makeArray(t)):void 0},c._manageStamps=function(){this.stamps&&this.stamps.length&&(this._getBoundingRect(),this.stamps.forEach(this._manageStamp,this))},c._getBoundingRect=function(){var t=this.element.getBoundingClientRect(),e=this.size;this._boundingRect={left:t.left+e.paddingLeft+e.borderLeftWidth,top:t.top+e.paddingTop+e.borderTopWidth,right:t.right-(e.paddingRight+e.borderRightWidth),bottom:t.bottom-(e.paddingBottom+e.borderBottomWidth)}},c._manageStamp=d,c._getElementOffset=function(t){var e=t.getBoundingClientRect(),n=this._boundingRect,o=i(t),s={left:e.left-n.left-o.marginLeft,top:e.top-n.top-o.marginTop,right:n.right-e.right-o.marginRight,bottom:n.bottom-e.bottom-o.marginBottom};return s},c.handleEvent=n.handleEvent,c.bindResize=function(){t.addEventListener("resize",this),this.isResizeBound=!0},c.unbindResize=function(){t.removeEventListener("resize",this),this.isResizeBound=!1},c.onresize=function(){this.resize()},n.debounceMethod(s,"onresize",100),c.resize=function(){this.isResizeBound&&this.needsResizeLayout()&&this.layout()},c.needsResizeLayout=function(){var t=i(this.element),e=this.size&&t;return e&&t.innerWidth!==this.size.innerWidth},c.addItems=function(t){var e=this._itemize(t);return e.length&&(this.items=this.items.concat(e)),e},c.appended=function(t){var e=this.addItems(t);e.length&&(this.layoutItems(e,!0),this.reveal(e))},c.prepended=function(t){var e=this._itemize(t);if(e.length){var i=this.items.slice(0);this.items=e.concat(i),this._resetLayout(),this._manageStamps(),this.layoutItems(e,!0),this.reveal(e),this.layoutItems(i)}},c.reveal=function(t){if(this._emitCompleteOnItems("reveal",t),t&&t.length){var e=this.updateStagger();t.forEach(function(t,i){t.stagger(i*e),t.reveal()})}},c.hide=function(t){if(this._emitCompleteOnItems("hide",t),t&&t.length){var e=this.updateStagger();t.forEach(function(t,i){t.stagger(i*e),t.hide()})}},c.revealItemElements=function(t){var e=this.getItems(t);this.reveal(e)},c.hideItemElements=function(t){var e=this.getItems(t);this.hide(e)},c.getItem=function(t){for(var e=0;e<this.items.length;e++){var i=this.items[e];if(i.element==t)return i}},c.getItems=function(t){t=n.makeArray(t);var e=[];return t.forEach(function(t){var i=this.getItem(t);i&&e.push(i)},this),e},c.remove=function(t){var e=this.getItems(t);this._emitCompleteOnItems("remove",e),e&&e.length&&e.forEach(function(t){t.remove(),n.removeFrom(this.items,t)},this)},c.destroy=function(){var t=this.element.style;t.height="",t.position="",t.width="",this.items.forEach(function(t){t.destroy()}),this.unbindResize();var e=this.element.outlayerGUID;delete f[e],delete this.element.outlayerGUID,h&&h.removeData(this.element,this.constructor.namespace)},s.data=function(t){t=n.getQueryElement(t);var e=t&&t.outlayerGUID;return e&&f[e]},s.create=function(t,e){var i=r(s);return i.defaults=n.extend({},s.defaults),n.extend(i.defaults,e),i.compatOptions=n.extend({},s.compatOptions),i.namespace=t,i.data=s.data,i.Item=r(o),n.htmlInit(i,t),h&&h.bridget&&h.bridget(t,i),i};var m={ms:1,s:1e3};return s.Item=o,s}),function(t,e){"function"==typeof define&&define.amd?define("isotope/js/item",["outlayer/outlayer"],e):"object"==typeof module&&module.exports?module.exports=e(require("outlayer")):(t.Isotope=t.Isotope||{},t.Isotope.Item=e(t.Outlayer))}(window,function(t){"use strict";function e(){t.Item.apply(this,arguments)}var i=e.prototype=Object.create(t.Item.prototype),n=i._create;i._create=function(){this.id=this.layout.itemGUID++,n.call(this),this.sortData={}},i.updateSortData=function(){if(!this.isIgnored){this.sortData.id=this.id,this.sortData["original-order"]=this.id,this.sortData.random=Math.random();var t=this.layout.options.getSortData,e=this.layout._sorters;for(var i in t){var n=e[i];this.sortData[i]=n(this.element,this)}}};var o=i.destroy;return i.destroy=function(){o.apply(this,arguments),this.css({display:""})},e}),function(t,e){"function"==typeof define&&define.amd?define("isotope/js/layout-mode",["get-size/get-size","outlayer/outlayer"],e):"object"==typeof module&&module.exports?module.exports=e(require("get-size"),require("outlayer")):(t.Isotope=t.Isotope||{},t.Isotope.LayoutMode=e(t.getSize,t.Outlayer))}(window,function(t,e){"use strict";function i(t){this.isotope=t,t&&(this.options=t.options[this.namespace],this.element=t.element,this.items=t.filteredItems,this.size=t.size)}var n=i.prototype,o=["_resetLayout","_getItemLayoutPosition","_manageStamp","_getContainerSize","_getElementOffset","needsResizeLayout","_getOption"];return o.forEach(function(t){n[t]=function(){return e.prototype[t].apply(this.isotope,arguments)}}),n.needsVerticalResizeLayout=function(){var e=t(this.isotope.element),i=this.isotope.size&&e;return i&&e.innerHeight!=this.isotope.size.innerHeight},n._getMeasurement=function(){this.isotope._getMeasurement.apply(this,arguments)},n.getColumnWidth=function(){this.getSegmentSize("column","Width")},n.getRowHeight=function(){this.getSegmentSize("row","Height")},n.getSegmentSize=function(t,e){var i=t+e,n="outer"+e;if(this._getMeasurement(i,n),!this[i]){var o=this.getFirstItemSize();this[i]=o&&o[n]||this.isotope.size["inner"+e]}},n.getFirstItemSize=function(){var e=this.isotope.filteredItems[0];return e&&e.element&&t(e.element)},n.layout=function(){this.isotope.layout.apply(this.isotope,arguments)},n.getSize=function(){this.isotope.getSize(),this.size=this.isotope.size},i.modes={},i.create=function(t,e){function o(){i.apply(this,arguments)}return o.prototype=Object.create(n),o.prototype.constructor=o,e&&(o.options=e),o.prototype.namespace=t,i.modes[t]=o,o},i}),function(t,e){"function"==typeof define&&define.amd?define("masonry/masonry",["outlayer/outlayer","get-size/get-size"],e):"object"==typeof module&&module.exports?module.exports=e(require("outlayer"),require("get-size")):t.Masonry=e(t.Outlayer,t.getSize)}(window,function(t,e){var i=t.create("masonry");return i.compatOptions.fitWidth="isFitWidth",i.prototype._resetLayout=function(){this.getSize(),this._getMeasurement("columnWidth","outerWidth"),this._getMeasurement("gutter","outerWidth"),this.measureColumns(),this.colYs=[];for(var t=0;t<this.cols;t++)this.colYs.push(0);this.maxY=0},i.prototype.measureColumns=function(){if(this.getContainerWidth(),!this.columnWidth){var t=this.items[0],i=t&&t.element;this.columnWidth=i&&e(i).outerWidth||this.containerWidth}var n=this.columnWidth+=this.gutter,o=this.containerWidth+this.gutter,s=o/n,r=n-o%n,a=r&&1>r?"round":"floor";s=Math[a](s),this.cols=Math.max(s,1)},i.prototype.getContainerWidth=function(){var t=this._getOption("fitWidth"),i=t?this.element.parentNode:this.element,n=e(i);this.containerWidth=n&&n.innerWidth},i.prototype._getItemLayoutPosition=function(t){t.getSize();var e=t.size.outerWidth%this.columnWidth,i=e&&1>e?"round":"ceil",n=Math[i](t.size.outerWidth/this.columnWidth);n=Math.min(n,this.cols);for(var o=this._getColGroup(n),s=Math.min.apply(Math,o),r=o.indexOf(s),a={x:this.columnWidth*r,y:s},u=s+t.size.outerHeight,h=this.cols+1-o.length,d=0;h>d;d++)this.colYs[r+d]=u;return a},i.prototype._getColGroup=function(t){if(2>t)return this.colYs;for(var e=[],i=this.cols+1-t,n=0;i>n;n++){var o=this.colYs.slice(n,n+t);e[n]=Math.max.apply(Math,o)}return e},i.prototype._manageStamp=function(t){var i=e(t),n=this._getElementOffset(t),o=this._getOption("originLeft"),s=o?n.left:n.right,r=s+i.outerWidth,a=Math.floor(s/this.columnWidth);a=Math.max(0,a);var u=Math.floor(r/this.columnWidth);u-=r%this.columnWidth?0:1,u=Math.min(this.cols-1,u);for(var h=this._getOption("originTop"),d=(h?n.top:n.bottom)+i.outerHeight,l=a;u>=l;l++)this.colYs[l]=Math.max(d,this.colYs[l])},i.prototype._getContainerSize=function(){this.maxY=Math.max.apply(Math,this.colYs);var t={height:this.maxY};return this._getOption("fitWidth")&&(t.width=this._getContainerFitWidth()),t},i.prototype._getContainerFitWidth=function(){for(var t=0,e=this.cols;--e&&0===this.colYs[e];)t++;return(this.cols-t)*this.columnWidth-this.gutter},i.prototype.needsResizeLayout=function(){var t=this.containerWidth;return this.getContainerWidth(),t!=this.containerWidth},i}),function(t,e){"function"==typeof define&&define.amd?define("isotope/js/layout-modes/masonry",["../layout-mode","masonry/masonry"],e):"object"==typeof module&&module.exports?module.exports=e(require("../layout-mode"),require("masonry-layout")):e(t.Isotope.LayoutMode,t.Masonry)}(window,function(t,e){"use strict";var i=t.create("masonry"),n=i.prototype,o={_getElementOffset:!0,layout:!0,_getMeasurement:!0};for(var s in e.prototype)o[s]||(n[s]=e.prototype[s]);var r=n.measureColumns;n.measureColumns=function(){this.items=this.isotope.filteredItems,r.call(this)};var a=n._getOption;return n._getOption=function(t){return"fitWidth"==t?void 0!==this.options.isFitWidth?this.options.isFitWidth:this.options.fitWidth:a.apply(this.isotope,arguments)},i}),function(t,e){"function"==typeof define&&define.amd?define("isotope/js/layout-modes/fit-rows",["../layout-mode"],e):"object"==typeof exports?module.exports=e(require("../layout-mode")):e(t.Isotope.LayoutMode)}(window,function(t){"use strict";var e=t.create("fitRows"),i=e.prototype;return i._resetLayout=function(){this.x=0,this.y=0,this.maxY=0,this._getMeasurement("gutter","outerWidth")},i._getItemLayoutPosition=function(t){t.getSize();var e=t.size.outerWidth+this.gutter,i=this.isotope.size.innerWidth+this.gutter;0!==this.x&&e+this.x>i&&(this.x=0,this.y=this.maxY);var n={x:this.x,y:this.y};return this.maxY=Math.max(this.maxY,this.y+t.size.outerHeight),this.x+=e,n},i._getContainerSize=function(){return{height:this.maxY}},e}),function(t,e){"function"==typeof define&&define.amd?define("isotope/js/layout-modes/vertical",["../layout-mode"],e):"object"==typeof module&&module.exports?module.exports=e(require("../layout-mode")):e(t.Isotope.LayoutMode)}(window,function(t){"use strict";var e=t.create("vertical",{horizontalAlignment:0}),i=e.prototype;return i._resetLayout=function(){this.y=0},i._getItemLayoutPosition=function(t){t.getSize();var e=(this.isotope.size.innerWidth-t.size.outerWidth)*this.options.horizontalAlignment,i=this.y;return this.y+=t.size.outerHeight,{x:e,y:i}},i._getContainerSize=function(){return{height:this.y}},e}),function(t,e){"function"==typeof define&&define.amd?define(["outlayer/outlayer","get-size/get-size","desandro-matches-selector/matches-selector","fizzy-ui-utils/utils","isotope/js/item","isotope/js/layout-mode","isotope/js/layout-modes/masonry","isotope/js/layout-modes/fit-rows","isotope/js/layout-modes/vertical"],function(i,n,o,s,r,a){return e(t,i,n,o,s,r,a)}):"object"==typeof module&&module.exports?module.exports=e(t,require("outlayer"),require("get-size"),require("desandro-matches-selector"),require("fizzy-ui-utils"),require("isotope/js/item"),require("isotope/js/layout-mode"),require("isotope/js/layout-modes/masonry"),require("isotope/js/layout-modes/fit-rows"),require("isotope/js/layout-modes/vertical")):t.Isotope=e(t,t.Outlayer,t.getSize,t.matchesSelector,t.fizzyUIUtils,t.Isotope.Item,t.Isotope.LayoutMode)}(window,function(t,e,i,n,o,s,r){function a(t,e){return function(i,n){for(var o=0;o<t.length;o++){var s=t[o],r=i.sortData[s],a=n.sortData[s];if(r>a||a>r){var u=void 0!==e[s]?e[s]:e,h=u?1:-1;return(r>a?1:-1)*h}}return 0}}var u=t.jQuery,h=String.prototype.trim?function(t){return t.trim()}:function(t){return t.replace(/^\s+|\s+$/g,"")},d=e.create("isotope",{layoutMode:"masonry",isJQueryFiltering:!0,sortAscending:!0});d.Item=s,d.LayoutMode=r;var l=d.prototype;l._create=function(){this.itemGUID=0,this._sorters={},this._getSorters(),e.prototype._create.call(this),this.modes={},this.filteredItems=this.items,this.sortHistory=["original-order"];for(var t in r.modes)this._initLayoutMode(t)},l.reloadItems=function(){this.itemGUID=0,e.prototype.reloadItems.call(this)},l._itemize=function(){for(var t=e.prototype._itemize.apply(this,arguments),i=0;i<t.length;i++){var n=t[i];n.id=this.itemGUID++}return this._updateItemsSortData(t),t},l._initLayoutMode=function(t){var e=r.modes[t],i=this.options[t]||{};this.options[t]=e.options?o.extend(e.options,i):i,this.modes[t]=new e(this)},l.layout=function(){return!this._isLayoutInited&&this._getOption("initLayout")?void this.arrange():void this._layout()},l._layout=function(){var t=this._getIsInstant();this._resetLayout(),this._manageStamps(),this.layoutItems(this.filteredItems,t),this._isLayoutInited=!0},l.arrange=function(t){this.option(t),this._getIsInstant();var e=this._filter(this.items);this.filteredItems=e.matches,this._bindArrangeComplete(),this._isInstant?this._noTransition(this._hideReveal,[e]):this._hideReveal(e),this._sort(),this._layout()},l._init=l.arrange,l._hideReveal=function(t){this.reveal(t.needReveal),this.hide(t.needHide)},l._getIsInstant=function(){var t=this._getOption("layoutInstant"),e=void 0!==t?t:!this._isLayoutInited;return this._isInstant=e,e},l._bindArrangeComplete=function(){function t(){e&&i&&n&&o.dispatchEvent("arrangeComplete",null,[o.filteredItems])}var e,i,n,o=this;this.once("layoutComplete",function(){e=!0,t()}),this.once("hideComplete",function(){i=!0,t()}),this.once("revealComplete",function(){n=!0,t()})},l._filter=function(t){var e=this.options.filter;e=e||"*";for(var i=[],n=[],o=[],s=this._getFilterTest(e),r=0;r<t.length;r++){var a=t[r];if(!a.isIgnored){var u=s(a);u&&i.push(a),u&&a.isHidden?n.push(a):u||a.isHidden||o.push(a)}}return{matches:i,needReveal:n,needHide:o}},l._getFilterTest=function(t){return u&&this.options.isJQueryFiltering?function(e){return u(e.element).is(t)}:"function"==typeof t?function(e){return t(e.element)}:function(e){return n(e.element,t)}},l.updateSortData=function(t){var e;t?(t=o.makeArray(t),e=this.getItems(t)):e=this.items,this._getSorters(),this._updateItemsSortData(e)},l._getSorters=function(){var t=this.options.getSortData;for(var e in t){var i=t[e];this._sorters[e]=f(i)}},l._updateItemsSortData=function(t){for(var e=t&&t.length,i=0;e&&e>i;i++){var n=t[i];n.updateSortData()}};var f=function(){function t(t){if("string"!=typeof t)return t;var i=h(t).split(" "),n=i[0],o=n.match(/^\[(.+)\]$/),s=o&&o[1],r=e(s,n),a=d.sortDataParsers[i[1]];
return t=a?function(t){return t&&a(r(t))}:function(t){return t&&r(t)}}function e(t,e){return t?function(e){return e.getAttribute(t)}:function(t){var i=t.querySelector(e);return i&&i.textContent}}return t}();d.sortDataParsers={parseInt:function(t){return parseInt(t,10)},parseFloat:function(t){return parseFloat(t)}},l._sort=function(){var t=this.options.sortBy;if(t){var e=[].concat.apply(t,this.sortHistory),i=a(e,this.options.sortAscending);this.filteredItems.sort(i),t!=this.sortHistory[0]&&this.sortHistory.unshift(t)}},l._mode=function(){var t=this.options.layoutMode,e=this.modes[t];if(!e)throw new Error("No layout mode: "+t);return e.options=this.options[t],e},l._resetLayout=function(){e.prototype._resetLayout.call(this),this._mode()._resetLayout()},l._getItemLayoutPosition=function(t){return this._mode()._getItemLayoutPosition(t)},l._manageStamp=function(t){this._mode()._manageStamp(t)},l._getContainerSize=function(){return this._mode()._getContainerSize()},l.needsResizeLayout=function(){return this._mode().needsResizeLayout()},l.appended=function(t){var e=this.addItems(t);if(e.length){var i=this._filterRevealAdded(e);this.filteredItems=this.filteredItems.concat(i)}},l.prepended=function(t){var e=this._itemize(t);if(e.length){this._resetLayout(),this._manageStamps();var i=this._filterRevealAdded(e);this.layoutItems(this.filteredItems),this.filteredItems=i.concat(this.filteredItems),this.items=e.concat(this.items)}},l._filterRevealAdded=function(t){var e=this._filter(t);return this.hide(e.needHide),this.reveal(e.matches),this.layoutItems(e.matches,!0),e.matches},l.insert=function(t){var e=this.addItems(t);if(e.length){var i,n,o=e.length;for(i=0;o>i;i++)n=e[i],this.element.appendChild(n.element);var s=this._filter(e).matches;for(i=0;o>i;i++)e[i].isLayoutInstant=!0;for(this.arrange(),i=0;o>i;i++)delete e[i].isLayoutInstant;this.reveal(s)}};var c=l.remove;return l.remove=function(t){t=o.makeArray(t);var e=this.getItems(t);c.call(this,t);for(var i=e&&e.length,n=0;i&&i>n;n++){var s=e[n];o.removeFrom(this.filteredItems,s)}},l.shuffle=function(){for(var t=0;t<this.items.length;t++){var e=this.items[t];e.sortData.random=Math.random()}this.options.sortBy="random",this._sort(),this._layout()},l._noTransition=function(t,e){var i=this.options.transitionDuration;this.options.transitionDuration=0;var n=t.apply(this,e);return this.options.transitionDuration=i,n},l.getFilteredItemElements=function(){return this.filteredItems.map(function(t){return t.element})},d});
/**
 * Lodash (Custom Build)
 *
 * @license
 * lodash.com/license | Underscore.js 1.8.3 underscorejs.org/LICENSE
 * Build: `lodash core -o ./dist/lodash.core.js`
 *
 */
;(function(){function n(n){return K(n)&&pn.call(n,"callee")&&!bn.call(n,"callee")}function t(n,t){return n.push.apply(n,t),n}function r(n){return function(t){return null==t?nn:t[n]}}function e(n,t,r,e,u){return u(n,function(n,u,o){r=e?(e=false,n):t(r,n,u,o)}),r}function u(n,t){return d(t,function(t){return n[t]})}function o(n){return n instanceof i?n:new i(n)}function i(n,t){this.__wrapped__=n,this.__actions__=[],this.__chain__=!!t}function c(n,t,r,e){return n===nn||M(n,ln[r])&&!pn.call(e,r)?t:n}function f(n,t,r){
if(typeof n!="function")throw new TypeError("Expected a function");return setTimeout(function(){n.apply(nn,r)},t)}function a(n,t){var r=true;return mn(n,function(n,e,u){return r=!!t(n,e,u)}),r}function l(n,t,r){for(var e=-1,u=n.length;++e<u;){var o=n[e],i=t(o);if(null!=i&&(c===nn?i===i:r(i,c)))var c=i,f=o}return f}function p(n,t){var r=[];return mn(n,function(n,e,u){t(n,e,u)&&r.push(n)}),r}function s(n,r,e,u,o){var i=-1,c=n.length;for(e||(e=D),o||(o=[]);++i<c;){var f=n[i];0<r&&e(f)?1<r?s(f,r-1,e,u,o):t(o,f):u||(o[o.length]=f);
}return o}function h(n,t){return n&&On(n,t,In)}function v(n,t){return p(t,function(t){return V(n[t])})}function y(n,t){return n>t}function b(n,t,r,e,u){return n===t||(null==n||null==t||!H(n)&&!K(t)?n!==n&&t!==t:g(n,t,r,e,b,u))}function g(n,t,r,e,u,o){var i=Nn(n),c=Nn(t),f="[object Array]",a="[object Array]";i||(f=hn.call(n),f="[object Arguments]"==f?"[object Object]":f),c||(a=hn.call(t),a="[object Arguments]"==a?"[object Object]":a);var l="[object Object]"==f,c="[object Object]"==a,a=f==a;o||(o=[]);
var p=An(o,function(t){return t[0]==n}),s=An(o,function(n){return n[0]==t});if(p&&s)return p[1]==t;if(o.push([n,t]),o.push([t,n]),a&&!l){if(i)r=B(n,t,r,e,u,o);else n:{switch(f){case"[object Boolean]":case"[object Date]":case"[object Number]":r=M(+n,+t);break n;case"[object Error]":r=n.name==t.name&&n.message==t.message;break n;case"[object RegExp]":case"[object String]":r=n==t+"";break n}r=false}return o.pop(),r}return 1&r||(i=l&&pn.call(n,"__wrapped__"),f=c&&pn.call(t,"__wrapped__"),!i&&!f)?!!a&&(r=R(n,t,r,e,u,o),
o.pop(),r):(i=i?n.value():n,f=f?t.value():t,r=u(i,f,r,e,o),o.pop(),r)}function _(n){return typeof n=="function"?n:null==n?Y:(typeof n=="object"?m:r)(n)}function j(n,t){return n<t}function d(n,t){var r=-1,e=U(n)?Array(n.length):[];return mn(n,function(n,u,o){e[++r]=t(n,u,o)}),e}function m(n){var t=_n(n);return function(r){var e=t.length;if(null==r)return!e;for(r=Object(r);e--;){var u=t[e];if(!(u in r&&b(n[u],r[u],3)))return false}return true}}function O(n,t){return n=Object(n),G(t,function(t,r){return r in n&&(t[r]=n[r]),
t},{})}function x(n){return xn(q(n,void 0,Y),n+"")}function A(n,t,r){var e=-1,u=n.length;for(0>t&&(t=-t>u?0:u+t),r=r>u?u:r,0>r&&(r+=u),u=t>r?0:r-t>>>0,t>>>=0,r=Array(u);++e<u;)r[e]=n[e+t];return r}function E(n){return A(n,0,n.length)}function w(n,t){var r;return mn(n,function(n,e,u){return r=t(n,e,u),!r}),!!r}function k(n,r){return G(r,function(n,r){return r.func.apply(r.thisArg,t([n],r.args))},n)}function N(n,t,r,e){var u=!r;r||(r={});for(var o=-1,i=t.length;++o<i;){var c=t[o],f=e?e(r[c],n[c],c,r,n):nn;
if(f===nn&&(f=n[c]),u)r[c]=f;else{var a=r,l=a[c];pn.call(a,c)&&M(l,f)&&(f!==nn||c in a)||(a[c]=f)}}return r}function F(n){return x(function(t,r){var e=-1,u=r.length,o=1<u?r[u-1]:nn,o=3<n.length&&typeof o=="function"?(u--,o):nn;for(t=Object(t);++e<u;){var i=r[e];i&&n(t,i,e,o)}return t})}function S(n){return function(){var t=arguments,r=dn(n.prototype),t=n.apply(r,t);return H(t)?t:r}}function T(n,t,r){function e(){for(var o=-1,i=arguments.length,c=-1,f=r.length,a=Array(f+i),l=this&&this!==on&&this instanceof e?u:n;++c<f;)a[c]=r[c];
for(;i--;)a[c++]=arguments[++o];return l.apply(t,a)}if(typeof n!="function")throw new TypeError("Expected a function");var u=S(n);return e}function B(n,t,r,e,u,o){var i=n.length,c=t.length;if(i!=c&&!(1&r&&c>i))return false;for(var c=-1,f=true,a=2&r?[]:nn;++c<i;){var l=n[c],p=t[c];if(void 0!==nn){f=false;break}if(a){if(!w(t,function(n,t){if(!z(a,t)&&(l===n||u(l,n,r,e,o)))return a.push(t)})){f=false;break}}else if(l!==p&&!u(l,p,r,e,o)){f=false;break}}return f}function R(n,t,r,e,u,o){var i=1&r,c=In(n),f=c.length,a=In(t).length;
if(f!=a&&!i)return false;for(var l=f;l--;){var p=c[l];if(!(i?p in t:pn.call(t,p)))return false}for(a=true;++l<f;){var p=c[l],s=n[p],h=t[p];if(void 0!==nn||s!==h&&!u(s,h,r,e,o)){a=false;break}i||(i="constructor"==p)}return a&&!i&&(r=n.constructor,e=t.constructor,r!=e&&"constructor"in n&&"constructor"in t&&!(typeof r=="function"&&r instanceof r&&typeof e=="function"&&e instanceof e)&&(a=false)),a}function D(t){return Nn(t)||n(t)}function I(n){var t=[];if(null!=n)for(var r in Object(n))t.push(r);return t}function q(n,t,r){
return t=jn(t===nn?n.length-1:t,0),function(){for(var e=arguments,u=-1,o=jn(e.length-t,0),i=Array(o);++u<o;)i[u]=e[t+u];for(u=-1,o=Array(t+1);++u<t;)o[u]=e[u];return o[t]=r(i),n.apply(this,o)}}function $(n){return(null==n?0:n.length)?s(n,1):[]}function P(n){return n&&n.length?n[0]:nn}function z(n,t,r){var e=null==n?0:n.length;r=typeof r=="number"?0>r?jn(e+r,0):r:0,r=(r||0)-1;for(var u=t===t;++r<e;){var o=n[r];if(u?o===t:o!==o)return r}return-1}function C(n,t){return mn(n,_(t))}function G(n,t,r){return e(n,_(t),r,3>arguments.length,mn);
}function J(n,t){var r;if(typeof t!="function")throw new TypeError("Expected a function");return n=Fn(n),function(){return 0<--n&&(r=t.apply(this,arguments)),1>=n&&(t=nn),r}}function M(n,t){return n===t||n!==n&&t!==t}function U(n){var t;return(t=null!=n)&&(t=n.length,t=typeof t=="number"&&-1<t&&0==t%1&&9007199254740991>=t),t&&!V(n)}function V(n){return!!H(n)&&(n=hn.call(n),"[object Function]"==n||"[object GeneratorFunction]"==n||"[object AsyncFunction]"==n||"[object Proxy]"==n)}function H(n){var t=typeof n;
return null!=n&&("object"==t||"function"==t)}function K(n){return null!=n&&typeof n=="object"}function L(n){return typeof n=="number"||K(n)&&"[object Number]"==hn.call(n)}function Q(n){return typeof n=="string"||!Nn(n)&&K(n)&&"[object String]"==hn.call(n)}function W(n){return typeof n=="string"?n:null==n?"":n+""}function X(n){return null==n?[]:u(n,In(n))}function Y(n){return n}function Z(n,r,e){var u=In(r),o=v(r,u);null!=e||H(r)&&(o.length||!u.length)||(e=r,r=n,n=this,o=v(r,In(r)));var i=!(H(e)&&"chain"in e&&!e.chain),c=V(n);
return mn(o,function(e){var u=r[e];n[e]=u,c&&(n.prototype[e]=function(){var r=this.__chain__;if(i||r){var e=n(this.__wrapped__);return(e.__actions__=E(this.__actions__)).push({func:u,args:arguments,thisArg:n}),e.__chain__=r,e}return u.apply(n,t([this.value()],arguments))})}),n}var nn,tn=1/0,rn=/[&<>"']/g,en=RegExp(rn.source),un=typeof self=="object"&&self&&self.Object===Object&&self,on=typeof global=="object"&&global&&global.Object===Object&&global||un||Function("return this")(),cn=(un=typeof exports=="object"&&exports&&!exports.nodeType&&exports)&&typeof module=="object"&&module&&!module.nodeType&&module,fn=function(n){
return function(t){return null==n?nn:n[t]}}({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}),an=Array.prototype,ln=Object.prototype,pn=ln.hasOwnProperty,sn=0,hn=ln.toString,vn=on._,yn=Object.create,bn=ln.propertyIsEnumerable,gn=on.isFinite,_n=function(n,t){return function(r){return n(t(r))}}(Object.keys,Object),jn=Math.max,dn=function(){function n(){}return function(t){return H(t)?yn?yn(t):(n.prototype=t,t=new n,n.prototype=nn,t):{}}}();i.prototype=dn(o.prototype),i.prototype.constructor=i;
var mn=function(n,t){return function(r,e){if(null==r)return r;if(!U(r))return n(r,e);for(var u=r.length,o=t?u:-1,i=Object(r);(t?o--:++o<u)&&false!==e(i[o],o,i););return r}}(h),On=function(n){return function(t,r,e){var u=-1,o=Object(t);e=e(t);for(var i=e.length;i--;){var c=e[n?i:++u];if(false===r(o[c],c,o))break}return t}}(),xn=Y,An=function(n){return function(t,r,e){var u=Object(t);if(!U(t)){var o=_(r);t=In(t),r=function(n){return o(u[n],n,u)}}return r=n(t,r,e),-1<r?u[o?t[r]:r]:nn}}(function(n,t,r){var e=null==n?0:n.length;
if(!e)return-1;r=null==r?0:Fn(r),0>r&&(r=jn(e+r,0));n:{for(t=_(t),e=n.length,r+=-1;++r<e;)if(t(n[r],r,n)){n=r;break n}n=-1}return n}),En=x(function(n,t,r){return T(n,t,r)}),wn=x(function(n,t){return f(n,1,t)}),kn=x(function(n,t,r){return f(n,Sn(t)||0,r)}),Nn=Array.isArray,Fn=Number,Sn=Number,Tn=F(function(n,t){N(t,_n(t),n)}),Bn=F(function(n,t){N(t,I(t),n)}),Rn=F(function(n,t,r,e){N(t,qn(t),n,e)}),Dn=x(function(n){return n.push(nn,c),Rn.apply(nn,n)}),In=_n,qn=I,$n=function(n){return xn(q(n,nn,$),n+"");
}(function(n,t){return null==n?{}:O(n,t)});o.assignIn=Bn,o.before=J,o.bind=En,o.chain=function(n){return n=o(n),n.__chain__=true,n},o.compact=function(n){return p(n,Boolean)},o.concat=function(){var n=arguments.length;if(!n)return[];for(var r=Array(n-1),e=arguments[0];n--;)r[n-1]=arguments[n];return t(Nn(e)?E(e):[e],s(r,1))},o.create=function(n,t){var r=dn(n);return null==t?r:Tn(r,t)},o.defaults=Dn,o.defer=wn,o.delay=kn,o.filter=function(n,t){return p(n,_(t))},o.flatten=$,o.flattenDeep=function(n){
return(null==n?0:n.length)?s(n,tn):[]},o.iteratee=_,o.keys=In,o.map=function(n,t){return d(n,_(t))},o.matches=function(n){return m(Tn({},n))},o.mixin=Z,o.negate=function(n){if(typeof n!="function")throw new TypeError("Expected a function");return function(){return!n.apply(this,arguments)}},o.once=function(n){return J(2,n)},o.pick=$n,o.slice=function(n,t,r){var e=null==n?0:n.length;return r=r===nn?e:+r,e?A(n,null==t?0:+t,r):[]},o.sortBy=function(n,t){var e=0;return t=_(t),d(d(n,function(n,r,u){return{
value:n,index:e++,criteria:t(n,r,u)}}).sort(function(n,t){var r;n:{r=n.criteria;var e=t.criteria;if(r!==e){var u=r!==nn,o=null===r,i=r===r,c=e!==nn,f=null===e,a=e===e;if(!f&&r>e||o&&c&&a||!u&&a||!i){r=1;break n}if(!o&&r<e||f&&u&&i||!c&&i||!a){r=-1;break n}}r=0}return r||n.index-t.index}),r("value"))},o.tap=function(n,t){return t(n),n},o.thru=function(n,t){return t(n)},o.toArray=function(n){return U(n)?n.length?E(n):[]:X(n)},o.values=X,o.extend=Bn,Z(o,o),o.clone=function(n){return H(n)?Nn(n)?E(n):N(n,_n(n)):n;
},o.escape=function(n){return(n=W(n))&&en.test(n)?n.replace(rn,fn):n},o.every=function(n,t,r){return t=r?nn:t,a(n,_(t))},o.find=An,o.forEach=C,o.has=function(n,t){return null!=n&&pn.call(n,t)},o.head=P,o.identity=Y,o.indexOf=z,o.isArguments=n,o.isArray=Nn,o.isBoolean=function(n){return true===n||false===n||K(n)&&"[object Boolean]"==hn.call(n)},o.isDate=function(n){return K(n)&&"[object Date]"==hn.call(n)},o.isEmpty=function(t){return U(t)&&(Nn(t)||Q(t)||V(t.splice)||n(t))?!t.length:!_n(t).length},o.isEqual=function(n,t){
return b(n,t)},o.isFinite=function(n){return typeof n=="number"&&gn(n)},o.isFunction=V,o.isNaN=function(n){return L(n)&&n!=+n},o.isNull=function(n){return null===n},o.isNumber=L,o.isObject=H,o.isRegExp=function(n){return K(n)&&"[object RegExp]"==hn.call(n)},o.isString=Q,o.isUndefined=function(n){return n===nn},o.last=function(n){var t=null==n?0:n.length;return t?n[t-1]:nn},o.max=function(n){return n&&n.length?l(n,Y,y):nn},o.min=function(n){return n&&n.length?l(n,Y,j):nn},o.noConflict=function(){return on._===this&&(on._=vn),
this},o.noop=function(){},o.reduce=G,o.result=function(n,t,r){return t=null==n?nn:n[t],t===nn&&(t=r),V(t)?t.call(n):t},o.size=function(n){return null==n?0:(n=U(n)?n:_n(n),n.length)},o.some=function(n,t,r){return t=r?nn:t,w(n,_(t))},o.uniqueId=function(n){var t=++sn;return W(n)+t},o.each=C,o.first=P,Z(o,function(){var n={};return h(o,function(t,r){pn.call(o.prototype,r)||(n[r]=t)}),n}(),{chain:false}),o.VERSION="4.17.2",mn("pop join replace reverse split push shift sort splice unshift".split(" "),function(n){
var t=(/^(?:replace|split)$/.test(n)?String.prototype:an)[n],r=/^(?:push|sort|unshift)$/.test(n)?"tap":"thru",e=/^(?:pop|join|replace|shift)$/.test(n);o.prototype[n]=function(){var n=arguments;if(e&&!this.__chain__){var u=this.value();return t.apply(Nn(u)?u:[],n)}return this[r](function(r){return t.apply(Nn(r)?r:[],n)})}}),o.prototype.toJSON=o.prototype.valueOf=o.prototype.value=function(){return k(this.__wrapped__,this.__actions__)},typeof define=="function"&&typeof define.amd=="object"&&define.amd?(on._=o,
define(function(){return o})):cn?((cn.exports=o)._=o,un._=o):on._=o}).call(this);

/*
     _ _      _       _
 ___| (_) ___| | __  (_)___
/ __| | |/ __| |/ /  | / __|
\__ \ | | (__|   < _ | \__ \
|___/_|_|\___|_|\_(_)/ |___/
                   |__/

 Version: 1.6.0
  Author: Ken Wheeler
 Website: http://kenwheeler.github.io
    Docs: http://kenwheeler.github.io/slick
    Repo: http://github.com/kenwheeler/slick
  Issues: http://github.com/kenwheeler/slick/issues

 */
!function(a){"use strict";"function"==typeof define&&define.amd?define(["jquery"],a):"undefined"!=typeof exports?module.exports=a(require("jquery")):a(jQuery)}(function(a){"use strict";var b=window.Slick||{};b=function(){function c(c,d){var f,e=this;e.defaults={accessibility:!0,adaptiveHeight:!1,appendArrows:a(c),appendDots:a(c),arrows:!0,asNavFor:null,prevArrow:'<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>',nextArrow:'<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next</button>',autoplay:!1,autoplaySpeed:3e3,centerMode:!1,centerPadding:"50px",cssEase:"ease",customPaging:function(b,c){return a('<button type="button" data-role="none" role="button" tabindex="0" />').text(c+1)},dots:!1,dotsClass:"slick-dots",draggable:!0,easing:"linear",edgeFriction:.35,fade:!1,focusOnSelect:!1,infinite:!0,initialSlide:0,lazyLoad:"ondemand",mobileFirst:!1,pauseOnHover:!0,pauseOnFocus:!0,pauseOnDotsHover:!1,respondTo:"window",responsive:null,rows:1,rtl:!1,slide:"",slidesPerRow:1,slidesToShow:1,slidesToScroll:1,speed:500,swipe:!0,swipeToSlide:!1,touchMove:!0,touchThreshold:5,useCSS:!0,useTransform:!0,variableWidth:!1,vertical:!1,verticalSwiping:!1,waitForAnimate:!0,zIndex:1e3},e.initials={animating:!1,dragging:!1,autoPlayTimer:null,currentDirection:0,currentLeft:null,currentSlide:0,direction:1,$dots:null,listWidth:null,listHeight:null,loadIndex:0,$nextArrow:null,$prevArrow:null,slideCount:null,slideWidth:null,$slideTrack:null,$slides:null,sliding:!1,slideOffset:0,swipeLeft:null,$list:null,touchObject:{},transformsEnabled:!1,unslicked:!1},a.extend(e,e.initials),e.activeBreakpoint=null,e.animType=null,e.animProp=null,e.breakpoints=[],e.breakpointSettings=[],e.cssTransitions=!1,e.focussed=!1,e.interrupted=!1,e.hidden="hidden",e.paused=!0,e.positionProp=null,e.respondTo=null,e.rowCount=1,e.shouldClick=!0,e.$slider=a(c),e.$slidesCache=null,e.transformType=null,e.transitionType=null,e.visibilityChange="visibilitychange",e.windowWidth=0,e.windowTimer=null,f=a(c).data("slick")||{},e.options=a.extend({},e.defaults,d,f),e.currentSlide=e.options.initialSlide,e.originalSettings=e.options,"undefined"!=typeof document.mozHidden?(e.hidden="mozHidden",e.visibilityChange="mozvisibilitychange"):"undefined"!=typeof document.webkitHidden&&(e.hidden="webkitHidden",e.visibilityChange="webkitvisibilitychange"),e.autoPlay=a.proxy(e.autoPlay,e),e.autoPlayClear=a.proxy(e.autoPlayClear,e),e.autoPlayIterator=a.proxy(e.autoPlayIterator,e),e.changeSlide=a.proxy(e.changeSlide,e),e.clickHandler=a.proxy(e.clickHandler,e),e.selectHandler=a.proxy(e.selectHandler,e),e.setPosition=a.proxy(e.setPosition,e),e.swipeHandler=a.proxy(e.swipeHandler,e),e.dragHandler=a.proxy(e.dragHandler,e),e.keyHandler=a.proxy(e.keyHandler,e),e.instanceUid=b++,e.htmlExpr=/^(?:\s*(<[\w\W]+>)[^>]*)$/,e.registerBreakpoints(),e.init(!0)}var b=0;return c}(),b.prototype.activateADA=function(){var a=this;a.$slideTrack.find(".slick-active").attr({"aria-hidden":"false"}).find("a, input, button, select").attr({tabindex:"0"})},b.prototype.addSlide=b.prototype.slickAdd=function(b,c,d){var e=this;if("boolean"==typeof c)d=c,c=null;else if(0>c||c>=e.slideCount)return!1;e.unload(),"number"==typeof c?0===c&&0===e.$slides.length?a(b).appendTo(e.$slideTrack):d?a(b).insertBefore(e.$slides.eq(c)):a(b).insertAfter(e.$slides.eq(c)):d===!0?a(b).prependTo(e.$slideTrack):a(b).appendTo(e.$slideTrack),e.$slides=e.$slideTrack.children(this.options.slide),e.$slideTrack.children(this.options.slide).detach(),e.$slideTrack.append(e.$slides),e.$slides.each(function(b,c){a(c).attr("data-slick-index",b)}),e.$slidesCache=e.$slides,e.reinit()},b.prototype.animateHeight=function(){var a=this;if(1===a.options.slidesToShow&&a.options.adaptiveHeight===!0&&a.options.vertical===!1){var b=a.$slides.eq(a.currentSlide).outerHeight(!0);a.$list.animate({height:b},a.options.speed)}},b.prototype.animateSlide=function(b,c){var d={},e=this;e.animateHeight(),e.options.rtl===!0&&e.options.vertical===!1&&(b=-b),e.transformsEnabled===!1?e.options.vertical===!1?e.$slideTrack.animate({left:b},e.options.speed,e.options.easing,c):e.$slideTrack.animate({top:b},e.options.speed,e.options.easing,c):e.cssTransitions===!1?(e.options.rtl===!0&&(e.currentLeft=-e.currentLeft),a({animStart:e.currentLeft}).animate({animStart:b},{duration:e.options.speed,easing:e.options.easing,step:function(a){a=Math.ceil(a),e.options.vertical===!1?(d[e.animType]="translate("+a+"px, 0px)",e.$slideTrack.css(d)):(d[e.animType]="translate(0px,"+a+"px)",e.$slideTrack.css(d))},complete:function(){c&&c.call()}})):(e.applyTransition(),b=Math.ceil(b),e.options.vertical===!1?d[e.animType]="translate3d("+b+"px, 0px, 0px)":d[e.animType]="translate3d(0px,"+b+"px, 0px)",e.$slideTrack.css(d),c&&setTimeout(function(){e.disableTransition(),c.call()},e.options.speed))},b.prototype.getNavTarget=function(){var b=this,c=b.options.asNavFor;return c&&null!==c&&(c=a(c).not(b.$slider)),c},b.prototype.asNavFor=function(b){var c=this,d=c.getNavTarget();null!==d&&"object"==typeof d&&d.each(function(){var c=a(this).slick("getSlick");c.unslicked||c.slideHandler(b,!0)})},b.prototype.applyTransition=function(a){var b=this,c={};b.options.fade===!1?c[b.transitionType]=b.transformType+" "+b.options.speed+"ms "+b.options.cssEase:c[b.transitionType]="opacity "+b.options.speed+"ms "+b.options.cssEase,b.options.fade===!1?b.$slideTrack.css(c):b.$slides.eq(a).css(c)},b.prototype.autoPlay=function(){var a=this;a.autoPlayClear(),a.slideCount>a.options.slidesToShow&&(a.autoPlayTimer=setInterval(a.autoPlayIterator,a.options.autoplaySpeed))},b.prototype.autoPlayClear=function(){var a=this;a.autoPlayTimer&&clearInterval(a.autoPlayTimer)},b.prototype.autoPlayIterator=function(){var a=this,b=a.currentSlide+a.options.slidesToScroll;a.paused||a.interrupted||a.focussed||(a.options.infinite===!1&&(1===a.direction&&a.currentSlide+1===a.slideCount-1?a.direction=0:0===a.direction&&(b=a.currentSlide-a.options.slidesToScroll,a.currentSlide-1===0&&(a.direction=1))),a.slideHandler(b))},b.prototype.buildArrows=function(){var b=this;b.options.arrows===!0&&(b.$prevArrow=a(b.options.prevArrow).addClass("slick-arrow"),b.$nextArrow=a(b.options.nextArrow).addClass("slick-arrow"),b.slideCount>b.options.slidesToShow?(b.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),b.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),b.htmlExpr.test(b.options.prevArrow)&&b.$prevArrow.prependTo(b.options.appendArrows),b.htmlExpr.test(b.options.nextArrow)&&b.$nextArrow.appendTo(b.options.appendArrows),b.options.infinite!==!0&&b.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true")):b.$prevArrow.add(b.$nextArrow).addClass("slick-hidden").attr({"aria-disabled":"true",tabindex:"-1"}))},b.prototype.buildDots=function(){var c,d,b=this;if(b.options.dots===!0&&b.slideCount>b.options.slidesToShow){for(b.$slider.addClass("slick-dotted"),d=a("<ul />").addClass(b.options.dotsClass),c=0;c<=b.getDotCount();c+=1)d.append(a("<li />").append(b.options.customPaging.call(this,b,c)));b.$dots=d.appendTo(b.options.appendDots),b.$dots.find("li").first().addClass("slick-active").attr("aria-hidden","false")}},b.prototype.buildOut=function(){var b=this;b.$slides=b.$slider.children(b.options.slide+":not(.slick-cloned)").addClass("slick-slide"),b.slideCount=b.$slides.length,b.$slides.each(function(b,c){a(c).attr("data-slick-index",b).data("originalStyling",a(c).attr("style")||"")}),b.$slider.addClass("slick-slider"),b.$slideTrack=0===b.slideCount?a('<div class="slick-track"/>').appendTo(b.$slider):b.$slides.wrapAll('<div class="slick-track"/>').parent(),b.$list=b.$slideTrack.wrap('<div aria-live="polite" class="slick-list"/>').parent(),b.$slideTrack.css("opacity",0),(b.options.centerMode===!0||b.options.swipeToSlide===!0)&&(b.options.slidesToScroll=1),a("img[data-lazy]",b.$slider).not("[src]").addClass("slick-loading"),b.setupInfinite(),b.buildArrows(),b.buildDots(),b.updateDots(),b.setSlideClasses("number"==typeof b.currentSlide?b.currentSlide:0),b.options.draggable===!0&&b.$list.addClass("draggable")},b.prototype.buildRows=function(){var b,c,d,e,f,g,h,a=this;if(e=document.createDocumentFragment(),g=a.$slider.children(),a.options.rows>1){for(h=a.options.slidesPerRow*a.options.rows,f=Math.ceil(g.length/h),b=0;f>b;b++){var i=document.createElement("div");for(c=0;c<a.options.rows;c++){var j=document.createElement("div");for(d=0;d<a.options.slidesPerRow;d++){var k=b*h+(c*a.options.slidesPerRow+d);g.get(k)&&j.appendChild(g.get(k))}i.appendChild(j)}e.appendChild(i)}a.$slider.empty().append(e),a.$slider.children().children().children().css({width:100/a.options.slidesPerRow+"%",display:"inline-block"})}},b.prototype.checkResponsive=function(b,c){var e,f,g,d=this,h=!1,i=d.$slider.width(),j=window.innerWidth||a(window).width();if("window"===d.respondTo?g=j:"slider"===d.respondTo?g=i:"min"===d.respondTo&&(g=Math.min(j,i)),d.options.responsive&&d.options.responsive.length&&null!==d.options.responsive){f=null;for(e in d.breakpoints)d.breakpoints.hasOwnProperty(e)&&(d.originalSettings.mobileFirst===!1?g<d.breakpoints[e]&&(f=d.breakpoints[e]):g>d.breakpoints[e]&&(f=d.breakpoints[e]));null!==f?null!==d.activeBreakpoint?(f!==d.activeBreakpoint||c)&&(d.activeBreakpoint=f,"unslick"===d.breakpointSettings[f]?d.unslick(f):(d.options=a.extend({},d.originalSettings,d.breakpointSettings[f]),b===!0&&(d.currentSlide=d.options.initialSlide),d.refresh(b)),h=f):(d.activeBreakpoint=f,"unslick"===d.breakpointSettings[f]?d.unslick(f):(d.options=a.extend({},d.originalSettings,d.breakpointSettings[f]),b===!0&&(d.currentSlide=d.options.initialSlide),d.refresh(b)),h=f):null!==d.activeBreakpoint&&(d.activeBreakpoint=null,d.options=d.originalSettings,b===!0&&(d.currentSlide=d.options.initialSlide),d.refresh(b),h=f),b||h===!1||d.$slider.trigger("breakpoint",[d,h])}},b.prototype.changeSlide=function(b,c){var f,g,h,d=this,e=a(b.currentTarget);switch(e.is("a")&&b.preventDefault(),e.is("li")||(e=e.closest("li")),h=d.slideCount%d.options.slidesToScroll!==0,f=h?0:(d.slideCount-d.currentSlide)%d.options.slidesToScroll,b.data.message){case"previous":g=0===f?d.options.slidesToScroll:d.options.slidesToShow-f,d.slideCount>d.options.slidesToShow&&d.slideHandler(d.currentSlide-g,!1,c);break;case"next":g=0===f?d.options.slidesToScroll:f,d.slideCount>d.options.slidesToShow&&d.slideHandler(d.currentSlide+g,!1,c);break;case"index":var i=0===b.data.index?0:b.data.index||e.index()*d.options.slidesToScroll;d.slideHandler(d.checkNavigable(i),!1,c),e.children().trigger("focus");break;default:return}},b.prototype.checkNavigable=function(a){var c,d,b=this;if(c=b.getNavigableIndexes(),d=0,a>c[c.length-1])a=c[c.length-1];else for(var e in c){if(a<c[e]){a=d;break}d=c[e]}return a},b.prototype.cleanUpEvents=function(){var b=this;b.options.dots&&null!==b.$dots&&a("li",b.$dots).off("click.slick",b.changeSlide).off("mouseenter.slick",a.proxy(b.interrupt,b,!0)).off("mouseleave.slick",a.proxy(b.interrupt,b,!1)),b.$slider.off("focus.slick blur.slick"),b.options.arrows===!0&&b.slideCount>b.options.slidesToShow&&(b.$prevArrow&&b.$prevArrow.off("click.slick",b.changeSlide),b.$nextArrow&&b.$nextArrow.off("click.slick",b.changeSlide)),b.$list.off("touchstart.slick mousedown.slick",b.swipeHandler),b.$list.off("touchmove.slick mousemove.slick",b.swipeHandler),b.$list.off("touchend.slick mouseup.slick",b.swipeHandler),b.$list.off("touchcancel.slick mouseleave.slick",b.swipeHandler),b.$list.off("click.slick",b.clickHandler),a(document).off(b.visibilityChange,b.visibility),b.cleanUpSlideEvents(),b.options.accessibility===!0&&b.$list.off("keydown.slick",b.keyHandler),b.options.focusOnSelect===!0&&a(b.$slideTrack).children().off("click.slick",b.selectHandler),a(window).off("orientationchange.slick.slick-"+b.instanceUid,b.orientationChange),a(window).off("resize.slick.slick-"+b.instanceUid,b.resize),a("[draggable!=true]",b.$slideTrack).off("dragstart",b.preventDefault),a(window).off("load.slick.slick-"+b.instanceUid,b.setPosition),a(document).off("ready.slick.slick-"+b.instanceUid,b.setPosition)},b.prototype.cleanUpSlideEvents=function(){var b=this;b.$list.off("mouseenter.slick",a.proxy(b.interrupt,b,!0)),b.$list.off("mouseleave.slick",a.proxy(b.interrupt,b,!1))},b.prototype.cleanUpRows=function(){var b,a=this;a.options.rows>1&&(b=a.$slides.children().children(),b.removeAttr("style"),a.$slider.empty().append(b))},b.prototype.clickHandler=function(a){var b=this;b.shouldClick===!1&&(a.stopImmediatePropagation(),a.stopPropagation(),a.preventDefault())},b.prototype.destroy=function(b){var c=this;c.autoPlayClear(),c.touchObject={},c.cleanUpEvents(),a(".slick-cloned",c.$slider).detach(),c.$dots&&c.$dots.remove(),c.$prevArrow&&c.$prevArrow.length&&(c.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),c.htmlExpr.test(c.options.prevArrow)&&c.$prevArrow.remove()),c.$nextArrow&&c.$nextArrow.length&&(c.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),c.htmlExpr.test(c.options.nextArrow)&&c.$nextArrow.remove()),c.$slides&&(c.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function(){a(this).attr("style",a(this).data("originalStyling"))}),c.$slideTrack.children(this.options.slide).detach(),c.$slideTrack.detach(),c.$list.detach(),c.$slider.append(c.$slides)),c.cleanUpRows(),c.$slider.removeClass("slick-slider"),c.$slider.removeClass("slick-initialized"),c.$slider.removeClass("slick-dotted"),c.unslicked=!0,b||c.$slider.trigger("destroy",[c])},b.prototype.disableTransition=function(a){var b=this,c={};c[b.transitionType]="",b.options.fade===!1?b.$slideTrack.css(c):b.$slides.eq(a).css(c)},b.prototype.fadeSlide=function(a,b){var c=this;c.cssTransitions===!1?(c.$slides.eq(a).css({zIndex:c.options.zIndex}),c.$slides.eq(a).animate({opacity:1},c.options.speed,c.options.easing,b)):(c.applyTransition(a),c.$slides.eq(a).css({opacity:1,zIndex:c.options.zIndex}),b&&setTimeout(function(){c.disableTransition(a),b.call()},c.options.speed))},b.prototype.fadeSlideOut=function(a){var b=this;b.cssTransitions===!1?b.$slides.eq(a).animate({opacity:0,zIndex:b.options.zIndex-2},b.options.speed,b.options.easing):(b.applyTransition(a),b.$slides.eq(a).css({opacity:0,zIndex:b.options.zIndex-2}))},b.prototype.filterSlides=b.prototype.slickFilter=function(a){var b=this;null!==a&&(b.$slidesCache=b.$slides,b.unload(),b.$slideTrack.children(this.options.slide).detach(),b.$slidesCache.filter(a).appendTo(b.$slideTrack),b.reinit())},b.prototype.focusHandler=function(){var b=this;b.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick","*:not(.slick-arrow)",function(c){c.stopImmediatePropagation();var d=a(this);setTimeout(function(){b.options.pauseOnFocus&&(b.focussed=d.is(":focus"),b.autoPlay())},0)})},b.prototype.getCurrent=b.prototype.slickCurrentSlide=function(){var a=this;return a.currentSlide},b.prototype.getDotCount=function(){var a=this,b=0,c=0,d=0;if(a.options.infinite===!0)for(;b<a.slideCount;)++d,b=c+a.options.slidesToScroll,c+=a.options.slidesToScroll<=a.options.slidesToShow?a.options.slidesToScroll:a.options.slidesToShow;else if(a.options.centerMode===!0)d=a.slideCount;else if(a.options.asNavFor)for(;b<a.slideCount;)++d,b=c+a.options.slidesToScroll,c+=a.options.slidesToScroll<=a.options.slidesToShow?a.options.slidesToScroll:a.options.slidesToShow;else d=1+Math.ceil((a.slideCount-a.options.slidesToShow)/a.options.slidesToScroll);return d-1},b.prototype.getLeft=function(a){var c,d,f,b=this,e=0;return b.slideOffset=0,d=b.$slides.first().outerHeight(!0),b.options.infinite===!0?(b.slideCount>b.options.slidesToShow&&(b.slideOffset=b.slideWidth*b.options.slidesToShow*-1,e=d*b.options.slidesToShow*-1),b.slideCount%b.options.slidesToScroll!==0&&a+b.options.slidesToScroll>b.slideCount&&b.slideCount>b.options.slidesToShow&&(a>b.slideCount?(b.slideOffset=(b.options.slidesToShow-(a-b.slideCount))*b.slideWidth*-1,e=(b.options.slidesToShow-(a-b.slideCount))*d*-1):(b.slideOffset=b.slideCount%b.options.slidesToScroll*b.slideWidth*-1,e=b.slideCount%b.options.slidesToScroll*d*-1))):a+b.options.slidesToShow>b.slideCount&&(b.slideOffset=(a+b.options.slidesToShow-b.slideCount)*b.slideWidth,e=(a+b.options.slidesToShow-b.slideCount)*d),b.slideCount<=b.options.slidesToShow&&(b.slideOffset=0,e=0),b.options.centerMode===!0&&b.options.infinite===!0?b.slideOffset+=b.slideWidth*Math.floor(b.options.slidesToShow/2)-b.slideWidth:b.options.centerMode===!0&&(b.slideOffset=0,b.slideOffset+=b.slideWidth*Math.floor(b.options.slidesToShow/2)),c=b.options.vertical===!1?a*b.slideWidth*-1+b.slideOffset:a*d*-1+e,b.options.variableWidth===!0&&(f=b.slideCount<=b.options.slidesToShow||b.options.infinite===!1?b.$slideTrack.children(".slick-slide").eq(a):b.$slideTrack.children(".slick-slide").eq(a+b.options.slidesToShow),c=b.options.rtl===!0?f[0]?-1*(b.$slideTrack.width()-f[0].offsetLeft-f.width()):0:f[0]?-1*f[0].offsetLeft:0,b.options.centerMode===!0&&(f=b.slideCount<=b.options.slidesToShow||b.options.infinite===!1?b.$slideTrack.children(".slick-slide").eq(a):b.$slideTrack.children(".slick-slide").eq(a+b.options.slidesToShow+1),c=b.options.rtl===!0?f[0]?-1*(b.$slideTrack.width()-f[0].offsetLeft-f.width()):0:f[0]?-1*f[0].offsetLeft:0,c+=(b.$list.width()-f.outerWidth())/2)),c},b.prototype.getOption=b.prototype.slickGetOption=function(a){var b=this;return b.options[a]},b.prototype.getNavigableIndexes=function(){var e,a=this,b=0,c=0,d=[];for(a.options.infinite===!1?e=a.slideCount:(b=-1*a.options.slidesToScroll,c=-1*a.options.slidesToScroll,e=2*a.slideCount);e>b;)d.push(b),b=c+a.options.slidesToScroll,c+=a.options.slidesToScroll<=a.options.slidesToShow?a.options.slidesToScroll:a.options.slidesToShow;return d},b.prototype.getSlick=function(){return this},b.prototype.getSlideCount=function(){var c,d,e,b=this;return e=b.options.centerMode===!0?b.slideWidth*Math.floor(b.options.slidesToShow/2):0,b.options.swipeToSlide===!0?(b.$slideTrack.find(".slick-slide").each(function(c,f){return f.offsetLeft-e+a(f).outerWidth()/2>-1*b.swipeLeft?(d=f,!1):void 0}),c=Math.abs(a(d).attr("data-slick-index")-b.currentSlide)||1):b.options.slidesToScroll},b.prototype.goTo=b.prototype.slickGoTo=function(a,b){var c=this;c.changeSlide({data:{message:"index",index:parseInt(a)}},b)},b.prototype.init=function(b){var c=this;a(c.$slider).hasClass("slick-initialized")||(a(c.$slider).addClass("slick-initialized"),c.buildRows(),c.buildOut(),c.setProps(),c.startLoad(),c.loadSlider(),c.initializeEvents(),c.updateArrows(),c.updateDots(),c.checkResponsive(!0),c.focusHandler()),b&&c.$slider.trigger("init",[c]),c.options.accessibility===!0&&c.initADA(),c.options.autoplay&&(c.paused=!1,c.autoPlay())},b.prototype.initADA=function(){var b=this;b.$slides.add(b.$slideTrack.find(".slick-cloned")).attr({"aria-hidden":"true",tabindex:"-1"}).find("a, input, button, select").attr({tabindex:"-1"}),b.$slideTrack.attr("role","listbox"),b.$slides.not(b.$slideTrack.find(".slick-cloned")).each(function(c){a(this).attr({role:"option","aria-describedby":"slick-slide"+b.instanceUid+c})}),null!==b.$dots&&b.$dots.attr("role","tablist").find("li").each(function(c){a(this).attr({role:"presentation","aria-selected":"false","aria-controls":"navigation"+b.instanceUid+c,id:"slick-slide"+b.instanceUid+c})}).first().attr("aria-selected","true").end().find("button").attr("role","button").end().closest("div").attr("role","toolbar"),b.activateADA()},b.prototype.initArrowEvents=function(){var a=this;a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&(a.$prevArrow.off("click.slick").on("click.slick",{message:"previous"},a.changeSlide),a.$nextArrow.off("click.slick").on("click.slick",{message:"next"},a.changeSlide))},b.prototype.initDotEvents=function(){var b=this;b.options.dots===!0&&b.slideCount>b.options.slidesToShow&&a("li",b.$dots).on("click.slick",{message:"index"},b.changeSlide),b.options.dots===!0&&b.options.pauseOnDotsHover===!0&&a("li",b.$dots).on("mouseenter.slick",a.proxy(b.interrupt,b,!0)).on("mouseleave.slick",a.proxy(b.interrupt,b,!1))},b.prototype.initSlideEvents=function(){var b=this;b.options.pauseOnHover&&(b.$list.on("mouseenter.slick",a.proxy(b.interrupt,b,!0)),b.$list.on("mouseleave.slick",a.proxy(b.interrupt,b,!1)))},b.prototype.initializeEvents=function(){var b=this;b.initArrowEvents(),b.initDotEvents(),b.initSlideEvents(),b.$list.on("touchstart.slick mousedown.slick",{action:"start"},b.swipeHandler),b.$list.on("touchmove.slick mousemove.slick",{action:"move"},b.swipeHandler),b.$list.on("touchend.slick mouseup.slick",{action:"end"},b.swipeHandler),b.$list.on("touchcancel.slick mouseleave.slick",{action:"end"},b.swipeHandler),b.$list.on("click.slick",b.clickHandler),a(document).on(b.visibilityChange,a.proxy(b.visibility,b)),b.options.accessibility===!0&&b.$list.on("keydown.slick",b.keyHandler),b.options.focusOnSelect===!0&&a(b.$slideTrack).children().on("click.slick",b.selectHandler),a(window).on("orientationchange.slick.slick-"+b.instanceUid,a.proxy(b.orientationChange,b)),a(window).on("resize.slick.slick-"+b.instanceUid,a.proxy(b.resize,b)),a("[draggable!=true]",b.$slideTrack).on("dragstart",b.preventDefault),a(window).on("load.slick.slick-"+b.instanceUid,b.setPosition),a(document).on("ready.slick.slick-"+b.instanceUid,b.setPosition)},b.prototype.initUI=function(){var a=this;a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&(a.$prevArrow.show(),a.$nextArrow.show()),a.options.dots===!0&&a.slideCount>a.options.slidesToShow&&a.$dots.show()},b.prototype.keyHandler=function(a){var b=this;a.target.tagName.match("TEXTAREA|INPUT|SELECT")||(37===a.keyCode&&b.options.accessibility===!0?b.changeSlide({data:{message:b.options.rtl===!0?"next":"previous"}}):39===a.keyCode&&b.options.accessibility===!0&&b.changeSlide({data:{message:b.options.rtl===!0?"previous":"next"}}))},b.prototype.lazyLoad=function(){function g(c){a("img[data-lazy]",c).each(function(){var c=a(this),d=a(this).attr("data-lazy"),e=document.createElement("img");e.onload=function(){c.animate({opacity:0},100,function(){c.attr("src",d).animate({opacity:1},200,function(){c.removeAttr("data-lazy").removeClass("slick-loading")}),b.$slider.trigger("lazyLoaded",[b,c,d])})},e.onerror=function(){c.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),b.$slider.trigger("lazyLoadError",[b,c,d])},e.src=d})}var c,d,e,f,b=this;b.options.centerMode===!0?b.options.infinite===!0?(e=b.currentSlide+(b.options.slidesToShow/2+1),f=e+b.options.slidesToShow+2):(e=Math.max(0,b.currentSlide-(b.options.slidesToShow/2+1)),f=2+(b.options.slidesToShow/2+1)+b.currentSlide):(e=b.options.infinite?b.options.slidesToShow+b.currentSlide:b.currentSlide,f=Math.ceil(e+b.options.slidesToShow),b.options.fade===!0&&(e>0&&e--,f<=b.slideCount&&f++)),c=b.$slider.find(".slick-slide").slice(e,f),g(c),b.slideCount<=b.options.slidesToShow?(d=b.$slider.find(".slick-slide"),g(d)):b.currentSlide>=b.slideCount-b.options.slidesToShow?(d=b.$slider.find(".slick-cloned").slice(0,b.options.slidesToShow),g(d)):0===b.currentSlide&&(d=b.$slider.find(".slick-cloned").slice(-1*b.options.slidesToShow),g(d))},b.prototype.loadSlider=function(){var a=this;a.setPosition(),a.$slideTrack.css({opacity:1}),a.$slider.removeClass("slick-loading"),a.initUI(),"progressive"===a.options.lazyLoad&&a.progressiveLazyLoad()},b.prototype.next=b.prototype.slickNext=function(){var a=this;a.changeSlide({data:{message:"next"}})},b.prototype.orientationChange=function(){var a=this;a.checkResponsive(),a.setPosition()},b.prototype.pause=b.prototype.slickPause=function(){var a=this;a.autoPlayClear(),a.paused=!0},b.prototype.play=b.prototype.slickPlay=function(){var a=this;a.autoPlay(),a.options.autoplay=!0,a.paused=!1,a.focussed=!1,a.interrupted=!1},b.prototype.postSlide=function(a){var b=this;b.unslicked||(b.$slider.trigger("afterChange",[b,a]),b.animating=!1,b.setPosition(),b.swipeLeft=null,b.options.autoplay&&b.autoPlay(),b.options.accessibility===!0&&b.initADA())},b.prototype.prev=b.prototype.slickPrev=function(){var a=this;a.changeSlide({data:{message:"previous"}})},b.prototype.preventDefault=function(a){a.preventDefault()},b.prototype.progressiveLazyLoad=function(b){b=b||1;var e,f,g,c=this,d=a("img[data-lazy]",c.$slider);d.length?(e=d.first(),f=e.attr("data-lazy"),g=document.createElement("img"),g.onload=function(){e.attr("src",f).removeAttr("data-lazy").removeClass("slick-loading"),c.options.adaptiveHeight===!0&&c.setPosition(),c.$slider.trigger("lazyLoaded",[c,e,f]),c.progressiveLazyLoad()},g.onerror=function(){3>b?setTimeout(function(){c.progressiveLazyLoad(b+1)},500):(e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),c.$slider.trigger("lazyLoadError",[c,e,f]),c.progressiveLazyLoad())},g.src=f):c.$slider.trigger("allImagesLoaded",[c])},b.prototype.refresh=function(b){var d,e,c=this;e=c.slideCount-c.options.slidesToShow,!c.options.infinite&&c.currentSlide>e&&(c.currentSlide=e),c.slideCount<=c.options.slidesToShow&&(c.currentSlide=0),d=c.currentSlide,c.destroy(!0),a.extend(c,c.initials,{currentSlide:d}),c.init(),b||c.changeSlide({data:{message:"index",index:d}},!1)},b.prototype.registerBreakpoints=function(){var c,d,e,b=this,f=b.options.responsive||null;if("array"===a.type(f)&&f.length){b.respondTo=b.options.respondTo||"window";for(c in f)if(e=b.breakpoints.length-1,d=f[c].breakpoint,f.hasOwnProperty(c)){for(;e>=0;)b.breakpoints[e]&&b.breakpoints[e]===d&&b.breakpoints.splice(e,1),e--;b.breakpoints.push(d),b.breakpointSettings[d]=f[c].settings}b.breakpoints.sort(function(a,c){return b.options.mobileFirst?a-c:c-a})}},b.prototype.reinit=function(){var b=this;b.$slides=b.$slideTrack.children(b.options.slide).addClass("slick-slide"),b.slideCount=b.$slides.length,b.currentSlide>=b.slideCount&&0!==b.currentSlide&&(b.currentSlide=b.currentSlide-b.options.slidesToScroll),b.slideCount<=b.options.slidesToShow&&(b.currentSlide=0),b.registerBreakpoints(),b.setProps(),b.setupInfinite(),b.buildArrows(),b.updateArrows(),b.initArrowEvents(),b.buildDots(),b.updateDots(),b.initDotEvents(),b.cleanUpSlideEvents(),b.initSlideEvents(),b.checkResponsive(!1,!0),b.options.focusOnSelect===!0&&a(b.$slideTrack).children().on("click.slick",b.selectHandler),b.setSlideClasses("number"==typeof b.currentSlide?b.currentSlide:0),b.setPosition(),b.focusHandler(),b.paused=!b.options.autoplay,b.autoPlay(),b.$slider.trigger("reInit",[b])},b.prototype.resize=function(){var b=this;a(window).width()!==b.windowWidth&&(clearTimeout(b.windowDelay),b.windowDelay=window.setTimeout(function(){b.windowWidth=a(window).width(),b.checkResponsive(),b.unslicked||b.setPosition()},50))},b.prototype.removeSlide=b.prototype.slickRemove=function(a,b,c){var d=this;return"boolean"==typeof a?(b=a,a=b===!0?0:d.slideCount-1):a=b===!0?--a:a,d.slideCount<1||0>a||a>d.slideCount-1?!1:(d.unload(),c===!0?d.$slideTrack.children().remove():d.$slideTrack.children(this.options.slide).eq(a).remove(),d.$slides=d.$slideTrack.children(this.options.slide),d.$slideTrack.children(this.options.slide).detach(),d.$slideTrack.append(d.$slides),d.$slidesCache=d.$slides,void d.reinit())},b.prototype.setCSS=function(a){var d,e,b=this,c={};b.options.rtl===!0&&(a=-a),d="left"==b.positionProp?Math.ceil(a)+"px":"0px",e="top"==b.positionProp?Math.ceil(a)+"px":"0px",c[b.positionProp]=a,b.transformsEnabled===!1?b.$slideTrack.css(c):(c={},b.cssTransitions===!1?(c[b.animType]="translate("+d+", "+e+")",b.$slideTrack.css(c)):(c[b.animType]="translate3d("+d+", "+e+", 0px)",b.$slideTrack.css(c)))},b.prototype.setDimensions=function(){var a=this;a.options.vertical===!1?a.options.centerMode===!0&&a.$list.css({padding:"0px "+a.options.centerPadding}):(a.$list.height(a.$slides.first().outerHeight(!0)*a.options.slidesToShow),a.options.centerMode===!0&&a.$list.css({padding:a.options.centerPadding+" 0px"})),a.listWidth=a.$list.width(),a.listHeight=a.$list.height(),a.options.vertical===!1&&a.options.variableWidth===!1?(a.slideWidth=Math.ceil(a.listWidth/a.options.slidesToShow),a.$slideTrack.width(Math.ceil(a.slideWidth*a.$slideTrack.children(".slick-slide").length))):a.options.variableWidth===!0?a.$slideTrack.width(5e3*a.slideCount):(a.slideWidth=Math.ceil(a.listWidth),a.$slideTrack.height(Math.ceil(a.$slides.first().outerHeight(!0)*a.$slideTrack.children(".slick-slide").length)));var b=a.$slides.first().outerWidth(!0)-a.$slides.first().width();a.options.variableWidth===!1&&a.$slideTrack.children(".slick-slide").width(a.slideWidth-b)},b.prototype.setFade=function(){var c,b=this;b.$slides.each(function(d,e){c=b.slideWidth*d*-1,b.options.rtl===!0?a(e).css({position:"relative",right:c,top:0,zIndex:b.options.zIndex-2,opacity:0}):a(e).css({position:"relative",left:c,top:0,zIndex:b.options.zIndex-2,opacity:0})}),b.$slides.eq(b.currentSlide).css({zIndex:b.options.zIndex-1,opacity:1})},b.prototype.setHeight=function(){var a=this;if(1===a.options.slidesToShow&&a.options.adaptiveHeight===!0&&a.options.vertical===!1){var b=a.$slides.eq(a.currentSlide).outerHeight(!0);a.$list.css("height",b)}},b.prototype.setOption=b.prototype.slickSetOption=function(){var c,d,e,f,h,b=this,g=!1;if("object"===a.type(arguments[0])?(e=arguments[0],g=arguments[1],h="multiple"):"string"===a.type(arguments[0])&&(e=arguments[0],f=arguments[1],g=arguments[2],"responsive"===arguments[0]&&"array"===a.type(arguments[1])?h="responsive":"undefined"!=typeof arguments[1]&&(h="single")),"single"===h)b.options[e]=f;else if("multiple"===h)a.each(e,function(a,c){b.options[a]=c});else if("responsive"===h)for(d in f)if("array"!==a.type(b.options.responsive))b.options.responsive=[f[d]];else{for(c=b.options.responsive.length-1;c>=0;)b.options.responsive[c].breakpoint===f[d].breakpoint&&b.options.responsive.splice(c,1),c--;b.options.responsive.push(f[d])}g&&(b.unload(),b.reinit())},b.prototype.setPosition=function(){var a=this;a.setDimensions(),a.setHeight(),a.options.fade===!1?a.setCSS(a.getLeft(a.currentSlide)):a.setFade(),a.$slider.trigger("setPosition",[a])},b.prototype.setProps=function(){var a=this,b=document.body.style;a.positionProp=a.options.vertical===!0?"top":"left","top"===a.positionProp?a.$slider.addClass("slick-vertical"):a.$slider.removeClass("slick-vertical"),(void 0!==b.WebkitTransition||void 0!==b.MozTransition||void 0!==b.msTransition)&&a.options.useCSS===!0&&(a.cssTransitions=!0),a.options.fade&&("number"==typeof a.options.zIndex?a.options.zIndex<3&&(a.options.zIndex=3):a.options.zIndex=a.defaults.zIndex),void 0!==b.OTransform&&(a.animType="OTransform",a.transformType="-o-transform",a.transitionType="OTransition",void 0===b.perspectiveProperty&&void 0===b.webkitPerspective&&(a.animType=!1)),void 0!==b.MozTransform&&(a.animType="MozTransform",a.transformType="-moz-transform",a.transitionType="MozTransition",void 0===b.perspectiveProperty&&void 0===b.MozPerspective&&(a.animType=!1)),void 0!==b.webkitTransform&&(a.animType="webkitTransform",a.transformType="-webkit-transform",a.transitionType="webkitTransition",void 0===b.perspectiveProperty&&void 0===b.webkitPerspective&&(a.animType=!1)),void 0!==b.msTransform&&(a.animType="msTransform",a.transformType="-ms-transform",a.transitionType="msTransition",void 0===b.msTransform&&(a.animType=!1)),void 0!==b.transform&&a.animType!==!1&&(a.animType="transform",a.transformType="transform",a.transitionType="transition"),a.transformsEnabled=a.options.useTransform&&null!==a.animType&&a.animType!==!1},b.prototype.setSlideClasses=function(a){var c,d,e,f,b=this;d=b.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden","true"),b.$slides.eq(a).addClass("slick-current"),b.options.centerMode===!0?(c=Math.floor(b.options.slidesToShow/2),b.options.infinite===!0&&(a>=c&&a<=b.slideCount-1-c?b.$slides.slice(a-c,a+c+1).addClass("slick-active").attr("aria-hidden","false"):(e=b.options.slidesToShow+a,
d.slice(e-c+1,e+c+2).addClass("slick-active").attr("aria-hidden","false")),0===a?d.eq(d.length-1-b.options.slidesToShow).addClass("slick-center"):a===b.slideCount-1&&d.eq(b.options.slidesToShow).addClass("slick-center")),b.$slides.eq(a).addClass("slick-center")):a>=0&&a<=b.slideCount-b.options.slidesToShow?b.$slides.slice(a,a+b.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false"):d.length<=b.options.slidesToShow?d.addClass("slick-active").attr("aria-hidden","false"):(f=b.slideCount%b.options.slidesToShow,e=b.options.infinite===!0?b.options.slidesToShow+a:a,b.options.slidesToShow==b.options.slidesToScroll&&b.slideCount-a<b.options.slidesToShow?d.slice(e-(b.options.slidesToShow-f),e+f).addClass("slick-active").attr("aria-hidden","false"):d.slice(e,e+b.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false")),"ondemand"===b.options.lazyLoad&&b.lazyLoad()},b.prototype.setupInfinite=function(){var c,d,e,b=this;if(b.options.fade===!0&&(b.options.centerMode=!1),b.options.infinite===!0&&b.options.fade===!1&&(d=null,b.slideCount>b.options.slidesToShow)){for(e=b.options.centerMode===!0?b.options.slidesToShow+1:b.options.slidesToShow,c=b.slideCount;c>b.slideCount-e;c-=1)d=c-1,a(b.$slides[d]).clone(!0).attr("id","").attr("data-slick-index",d-b.slideCount).prependTo(b.$slideTrack).addClass("slick-cloned");for(c=0;e>c;c+=1)d=c,a(b.$slides[d]).clone(!0).attr("id","").attr("data-slick-index",d+b.slideCount).appendTo(b.$slideTrack).addClass("slick-cloned");b.$slideTrack.find(".slick-cloned").find("[id]").each(function(){a(this).attr("id","")})}},b.prototype.interrupt=function(a){var b=this;a||b.autoPlay(),b.interrupted=a},b.prototype.selectHandler=function(b){var c=this,d=a(b.target).is(".slick-slide")?a(b.target):a(b.target).parents(".slick-slide"),e=parseInt(d.attr("data-slick-index"));return e||(e=0),c.slideCount<=c.options.slidesToShow?(c.setSlideClasses(e),void c.asNavFor(e)):void c.slideHandler(e)},b.prototype.slideHandler=function(a,b,c){var d,e,f,g,j,h=null,i=this;return b=b||!1,i.animating===!0&&i.options.waitForAnimate===!0||i.options.fade===!0&&i.currentSlide===a||i.slideCount<=i.options.slidesToShow?void 0:(b===!1&&i.asNavFor(a),d=a,h=i.getLeft(d),g=i.getLeft(i.currentSlide),i.currentLeft=null===i.swipeLeft?g:i.swipeLeft,i.options.infinite===!1&&i.options.centerMode===!1&&(0>a||a>i.getDotCount()*i.options.slidesToScroll)?void(i.options.fade===!1&&(d=i.currentSlide,c!==!0?i.animateSlide(g,function(){i.postSlide(d)}):i.postSlide(d))):i.options.infinite===!1&&i.options.centerMode===!0&&(0>a||a>i.slideCount-i.options.slidesToScroll)?void(i.options.fade===!1&&(d=i.currentSlide,c!==!0?i.animateSlide(g,function(){i.postSlide(d)}):i.postSlide(d))):(i.options.autoplay&&clearInterval(i.autoPlayTimer),e=0>d?i.slideCount%i.options.slidesToScroll!==0?i.slideCount-i.slideCount%i.options.slidesToScroll:i.slideCount+d:d>=i.slideCount?i.slideCount%i.options.slidesToScroll!==0?0:d-i.slideCount:d,i.animating=!0,i.$slider.trigger("beforeChange",[i,i.currentSlide,e]),f=i.currentSlide,i.currentSlide=e,i.setSlideClasses(i.currentSlide),i.options.asNavFor&&(j=i.getNavTarget(),j=j.slick("getSlick"),j.slideCount<=j.options.slidesToShow&&j.setSlideClasses(i.currentSlide)),i.updateDots(),i.updateArrows(),i.options.fade===!0?(c!==!0?(i.fadeSlideOut(f),i.fadeSlide(e,function(){i.postSlide(e)})):i.postSlide(e),void i.animateHeight()):void(c!==!0?i.animateSlide(h,function(){i.postSlide(e)}):i.postSlide(e))))},b.prototype.startLoad=function(){var a=this;a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&(a.$prevArrow.hide(),a.$nextArrow.hide()),a.options.dots===!0&&a.slideCount>a.options.slidesToShow&&a.$dots.hide(),a.$slider.addClass("slick-loading")},b.prototype.swipeDirection=function(){var a,b,c,d,e=this;return a=e.touchObject.startX-e.touchObject.curX,b=e.touchObject.startY-e.touchObject.curY,c=Math.atan2(b,a),d=Math.round(180*c/Math.PI),0>d&&(d=360-Math.abs(d)),45>=d&&d>=0?e.options.rtl===!1?"left":"right":360>=d&&d>=315?e.options.rtl===!1?"left":"right":d>=135&&225>=d?e.options.rtl===!1?"right":"left":e.options.verticalSwiping===!0?d>=35&&135>=d?"down":"up":"vertical"},b.prototype.swipeEnd=function(a){var c,d,b=this;if(b.dragging=!1,b.interrupted=!1,b.shouldClick=b.touchObject.swipeLength>10?!1:!0,void 0===b.touchObject.curX)return!1;if(b.touchObject.edgeHit===!0&&b.$slider.trigger("edge",[b,b.swipeDirection()]),b.touchObject.swipeLength>=b.touchObject.minSwipe){switch(d=b.swipeDirection()){case"left":case"down":c=b.options.swipeToSlide?b.checkNavigable(b.currentSlide+b.getSlideCount()):b.currentSlide+b.getSlideCount(),b.currentDirection=0;break;case"right":case"up":c=b.options.swipeToSlide?b.checkNavigable(b.currentSlide-b.getSlideCount()):b.currentSlide-b.getSlideCount(),b.currentDirection=1}"vertical"!=d&&(b.slideHandler(c),b.touchObject={},b.$slider.trigger("swipe",[b,d]))}else b.touchObject.startX!==b.touchObject.curX&&(b.slideHandler(b.currentSlide),b.touchObject={})},b.prototype.swipeHandler=function(a){var b=this;if(!(b.options.swipe===!1||"ontouchend"in document&&b.options.swipe===!1||b.options.draggable===!1&&-1!==a.type.indexOf("mouse")))switch(b.touchObject.fingerCount=a.originalEvent&&void 0!==a.originalEvent.touches?a.originalEvent.touches.length:1,b.touchObject.minSwipe=b.listWidth/b.options.touchThreshold,b.options.verticalSwiping===!0&&(b.touchObject.minSwipe=b.listHeight/b.options.touchThreshold),a.data.action){case"start":b.swipeStart(a);break;case"move":b.swipeMove(a);break;case"end":b.swipeEnd(a)}},b.prototype.swipeMove=function(a){var d,e,f,g,h,b=this;return h=void 0!==a.originalEvent?a.originalEvent.touches:null,!b.dragging||h&&1!==h.length?!1:(d=b.getLeft(b.currentSlide),b.touchObject.curX=void 0!==h?h[0].pageX:a.clientX,b.touchObject.curY=void 0!==h?h[0].pageY:a.clientY,b.touchObject.swipeLength=Math.round(Math.sqrt(Math.pow(b.touchObject.curX-b.touchObject.startX,2))),b.options.verticalSwiping===!0&&(b.touchObject.swipeLength=Math.round(Math.sqrt(Math.pow(b.touchObject.curY-b.touchObject.startY,2)))),e=b.swipeDirection(),"vertical"!==e?(void 0!==a.originalEvent&&b.touchObject.swipeLength>4&&a.preventDefault(),g=(b.options.rtl===!1?1:-1)*(b.touchObject.curX>b.touchObject.startX?1:-1),b.options.verticalSwiping===!0&&(g=b.touchObject.curY>b.touchObject.startY?1:-1),f=b.touchObject.swipeLength,b.touchObject.edgeHit=!1,b.options.infinite===!1&&(0===b.currentSlide&&"right"===e||b.currentSlide>=b.getDotCount()&&"left"===e)&&(f=b.touchObject.swipeLength*b.options.edgeFriction,b.touchObject.edgeHit=!0),b.options.vertical===!1?b.swipeLeft=d+f*g:b.swipeLeft=d+f*(b.$list.height()/b.listWidth)*g,b.options.verticalSwiping===!0&&(b.swipeLeft=d+f*g),b.options.fade===!0||b.options.touchMove===!1?!1:b.animating===!0?(b.swipeLeft=null,!1):void b.setCSS(b.swipeLeft)):void 0)},b.prototype.swipeStart=function(a){var c,b=this;return b.interrupted=!0,1!==b.touchObject.fingerCount||b.slideCount<=b.options.slidesToShow?(b.touchObject={},!1):(void 0!==a.originalEvent&&void 0!==a.originalEvent.touches&&(c=a.originalEvent.touches[0]),b.touchObject.startX=b.touchObject.curX=void 0!==c?c.pageX:a.clientX,b.touchObject.startY=b.touchObject.curY=void 0!==c?c.pageY:a.clientY,void(b.dragging=!0))},b.prototype.unfilterSlides=b.prototype.slickUnfilter=function(){var a=this;null!==a.$slidesCache&&(a.unload(),a.$slideTrack.children(this.options.slide).detach(),a.$slidesCache.appendTo(a.$slideTrack),a.reinit())},b.prototype.unload=function(){var b=this;a(".slick-cloned",b.$slider).remove(),b.$dots&&b.$dots.remove(),b.$prevArrow&&b.htmlExpr.test(b.options.prevArrow)&&b.$prevArrow.remove(),b.$nextArrow&&b.htmlExpr.test(b.options.nextArrow)&&b.$nextArrow.remove(),b.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden","true").css("width","")},b.prototype.unslick=function(a){var b=this;b.$slider.trigger("unslick",[b,a]),b.destroy()},b.prototype.updateArrows=function(){var b,a=this;b=Math.floor(a.options.slidesToShow/2),a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&!a.options.infinite&&(a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false"),a.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false"),0===a.currentSlide?(a.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true"),a.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false")):a.currentSlide>=a.slideCount-a.options.slidesToShow&&a.options.centerMode===!1?(a.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")):a.currentSlide>=a.slideCount-1&&a.options.centerMode===!0&&(a.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")))},b.prototype.updateDots=function(){var a=this;null!==a.$dots&&(a.$dots.find("li").removeClass("slick-active").attr("aria-hidden","true"),a.$dots.find("li").eq(Math.floor(a.currentSlide/a.options.slidesToScroll)).addClass("slick-active").attr("aria-hidden","false"))},b.prototype.visibility=function(){var a=this;a.options.autoplay&&(document[a.hidden]?a.interrupted=!0:a.interrupted=!1)},a.fn.slick=function(){var f,g,a=this,c=arguments[0],d=Array.prototype.slice.call(arguments,1),e=a.length;for(f=0;e>f;f++)if("object"==typeof c||"undefined"==typeof c?a[f].slick=new b(a[f],c):g=a[f].slick[c].apply(a[f].slick,d),"undefined"!=typeof g)return g;return a}});
/*
 * Swipe 2.0
 *
 * Brad Birdsall
 * Copyright 2013, MIT License
 *
*/

function Swipe(container, options) {

  "use strict";

  // utilities
  var noop = function() {}; // simple no operation function
  var offloadFn = function(fn) { setTimeout(fn || noop, 0) }; // offload a functions execution

  var touch = ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch;
  // check browser capabilities
  var browser = {
    addEventListener: !!window.addEventListener,
    touch: touch,
    touchstart : touch ? 'touchstart' : 'mousedown',
    touchmove : touch ? 'touchmove' : 'mousemove',
    touchend : touch ? 'touchend' : 'mouseup',
    transitions: (function(temp) {
      var props = ['transitionProperty', 'WebkitTransition', 'MozTransition', 'OTransition', 'msTransition'];
      for ( var i in props ) if (temp.style[ props[i] ] !== undefined) return true;
      return false;
    })(document.createElement('swipe'))
  };

  // quit if no root element
  if (!container) return;
  var element = container.children[0];
  var slides, slidePos, width, length;
  options = options || {};
  var index = parseInt(options.startSlide, 10) || 0;
  var speed = options.speed || 500;
  options.continuous = options.continuous !== undefined ? options.continuous : true;

  function setup() {

    // cache slides
    slides = element.children;
    length = slides.length;

    // set continuous to false if only one slide
    if (slides.length < 2) options.continuous = false;

    //special case if two slides
    if (browser.transitions && options.continuous && slides.length < 3) {
      element.appendChild(slides[0].cloneNode(true));
      element.appendChild(element.children[1].cloneNode(true));
      slides = element.children;
    }

    // create an array to store current positions of each slide
    slidePos = new Array(slides.length);

    // determine width of each slide
    width = container.getBoundingClientRect().width || container.offsetWidth;

    element.style.width = (slides.length * width) + 'px';

    // stack elements
    var pos = slides.length;
    while(pos--) {

      var slide = slides[pos];

      slide.style.width = width + 'px';
      slide.setAttribute('data-index', pos);

      if (browser.transitions) {
        slide.style.left = (pos * -width) + 'px';
        move(pos, index > pos ? -width : (index < pos ? width : 0), 0);
      }

    }

    // reposition elements before and after index
    if (options.continuous && browser.transitions) {
      move(circle(index-1), -width, 0);
      move(circle(index+1), width, 0);
    }

    if (!browser.transitions) element.style.left = (index * -width) + 'px';

    container.style.visibility = 'visible';

  }

  function prev() {

    if (options.continuous) slide(index-1);
    else if (index) slide(index-1);

  }

  function next() {

    if (options.continuous) slide(index+1);
    else if (index < slides.length - 1) slide(index+1);

  }

  function circle(index) {

    // a simple positive modulo using slides.length
    return (slides.length + (index % slides.length)) % slides.length;

  }

  function slide(to, slideSpeed) {

    // do nothing if already on requested slide
    if (index == to) return;

    if (browser.transitions) {

      var direction = Math.abs(index-to) / (index-to); // 1: backward, -1: forward

      // get the actual position of the slide
      if (options.continuous) {
        var natural_direction = direction;
        direction = -slidePos[circle(to)] / width;

        // if going forward but to < index, use to = slides.length + to
        // if going backward but to > index, use to = -slides.length + to
        if (direction !== natural_direction) to =  -direction * slides.length + to;

      }

      var diff = Math.abs(index-to) - 1;

      // move all the slides between index and to in the right direction
      while (diff--) move( circle((to > index ? to : index) - diff - 1), width * direction, 0);

      to = circle(to);

      move(index, width * direction, slideSpeed || speed);
      move(to, 0, slideSpeed || speed);

      if (options.continuous) move(circle(to - direction), -(width * direction), 0); // we need to get the next in place

    } else {

      to = circle(to);
      animate(index * -width, to * -width, slideSpeed || speed);
      //no fallback for a circular continuous if the browser does not accept transitions
    }

    index = to;
    offloadFn(options.callback && options.callback(index, slides[index]));
  }

  function move(index, dist, speed) {

    translate(index, dist, speed);
    slidePos[index] = dist;

  }

  function translate(index, dist, speed) {

    var slide = slides[index];
    var style = slide && slide.style;

    if (!style) return;

    style.webkitTransitionDuration =
    style.MozTransitionDuration =
    style.msTransitionDuration =
    style.OTransitionDuration =
    style.transitionDuration = speed + 'ms';

    style.webkitTransform = 'translate(' + dist + 'px,0)' + 'translateZ(0)';
    style.msTransform =
    style.MozTransform =
    style.OTransform = 'translateX(' + dist + 'px)';

  }

  function animate(from, to, speed) {

    // if not an animation, just reposition
    if (!speed) {

      element.style.left = to + 'px';
      return;

    }

    var start = +new Date;

    var timer = setInterval(function() {

      var timeElap = +new Date - start;

      if (timeElap > speed) {

        element.style.left = to + 'px';

        if (delay) begin();

        options.transitionEnd && options.transitionEnd.call(event, index, slides[index]);

        clearInterval(timer);
        return;

      }

      element.style.left = (( (to - from) * (Math.floor((timeElap / speed) * 100) / 100) ) + from) + 'px';

    }, 4);

  }

  // setup auto slideshow
  var delay = options.auto || 0;
  var interval;

  function begin() {

    interval = setTimeout(next, delay);

  }

  function stop() {

    delay = 0;
    clearTimeout(interval);

  }


  // setup initial vars
  var start = {};
  var delta = {};
  var isScrolling;

  // setup event capturing
  var events = {

    handleEvent: function(event) {

      switch (event.type) {
        case browser.touchstart: this.start(event); break;
        case browser.touchmove: this.move(event); break;
        case browser.touchend: offloadFn(this.end(event)); break;
        case 'webkitTransitionEnd':
        case 'msTransitionEnd':
        case 'oTransitionEnd':
        case 'otransitionend':
        case 'transitionend': offloadFn(this.transitionEnd(event)); break;
        case 'resize': offloadFn(setup); break;
      }

      if (options.stopPropagation) event.stopPropagation();

    },
    start: function(event) {

      var touches;
      if (browser.touch) {
        touches = event.touches[0];
      } else {
        touches = {
          pageX : event.pageX ? event.pageX : event.clientX,
          pageY : event.pageY ? event.pageY : event.clientY
        };
      }

      // measure start values
      start = {

        // get initial touch coords
        x: touches.pageX,
        y: touches.pageY,

        // store time to determine touch duration
        time: +new Date

      };

      // used for testing first move event
      isScrolling = undefined;

      // reset delta and end measurements
      delta = {};

      // attach touchmove and touchend listeners
      element.addEventListener(browser.touchmove, this, false);
      if (browser.touch) {
        element.addEventListener(browser.touchend, this, false);
      } else {
        window.addEventListener(browser.touchend, this, false);
      }
    },
    move: function(event) {

      var touches;
      if  (browser.touch) {
        // ensure swiping with one touch and not pinching
        if ( event.touches.length > 1 || event.scale && event.scale !== 1) return

        touches = event.touches[0];
      } else {
        touches = {
          pageX : event.pageX ? event.pageX : event.clientX,
          pageY : event.pageY ? event.pageY : event.clientY
        };
      }

      if (options.disableScroll) event.preventDefault();



      // measure change in x and y
      delta = {
        x: touches.pageX - start.x,
        y: touches.pageY - start.y
      }

      // determine if scrolling test has run - one time test
      if ( typeof isScrolling == 'undefined') {
        isScrolling = !!( isScrolling || Math.abs(delta.x) < Math.abs(delta.y) );
      }

      // if user is not trying to scroll vertically
      if (!isScrolling) {

        // prevent native scrolling
        event.preventDefault();

        // stop slideshow
        stop();

        // increase resistance if first or last slide
        if (options.continuous) { // we don't add resistance at the end

          translate(circle(index-1), delta.x + slidePos[circle(index-1)], 0);
          translate(index, delta.x + slidePos[index], 0);
          translate(circle(index+1), delta.x + slidePos[circle(index+1)], 0);

        } else {

          delta.x =
            delta.x /
              ( (!index && delta.x > 0               // if first slide and sliding left
                || index == slides.length - 1        // or if last slide and sliding right
                && delta.x < 0                       // and if sliding at all
              ) ?
              ( Math.abs(delta.x) / width + 1 )      // determine resistance level
              : 1 );                                 // no resistance if false

          // translate 1:1
          translate(index-1, delta.x + slidePos[index-1], 0);
          translate(index, delta.x + slidePos[index], 0);
          translate(index+1, delta.x + slidePos[index+1], 0);
        }

      }

    },
    end: function(event) {

      // measure duration
      var duration = +new Date - start.time;

      // determine if slide attempt triggers next/prev slide
      var isValidSlide =
            Number(duration) < 250               // if slide duration is less than 250ms
            && Math.abs(delta.x) > 20            // and if slide amt is greater than 20px
            || Math.abs(delta.x) > width/2;      // or if slide amt is greater than half the width

      // determine if slide attempt is past start and end
      var isPastBounds =
            !index && delta.x > 0                            // if first slide and slide amt is greater than 0
            || index == slides.length - 1 && delta.x < 0;    // or if last slide and slide amt is less than 0

      if (options.continuous) isPastBounds = false;

      // determine direction of swipe (true:right, false:left)
      var direction = delta.x < 0;

      // if not scrolling vertically
      if (!isScrolling) {

        if (isValidSlide && !isPastBounds) {

          if (direction) {

            if (options.continuous) { // we need to get the next in this direction in place

              move(circle(index-1), -width, 0);
              move(circle(index+2), width, 0);

            } else {
              move(index-1, -width, 0);
            }

            move(index, slidePos[index]-width, speed);
            move(circle(index+1), slidePos[circle(index+1)]-width, speed);
            index = circle(index+1);

          } else {
            if (options.continuous) { // we need to get the next in this direction in place

              move(circle(index+1), width, 0);
              move(circle(index-2), -width, 0);

            } else {
              move(index+1, width, 0);
            }

            move(index, slidePos[index]+width, speed);
            move(circle(index-1), slidePos[circle(index-1)]+width, speed);
            index = circle(index-1);

          }

          options.callback && options.callback(index, slides[index]);

        } else {

          if (options.continuous) {

            move(circle(index-1), -width, speed);
            move(index, 0, speed);
            move(circle(index+1), width, speed);

          } else {

            move(index-1, -width, speed);
            move(index, 0, speed);
            move(index+1, width, speed);
          }

        }

      }

      // kill touchmove and touchend event listeners until touchstart called again
      element.removeEventListener(browser.touchmove, events, false)
      if (browser.touch) {
        element.removeEventListener(browser.touchend, this, false)
      } else {
        window.removeEventListener(browser.touchend, this, false)
      }

    },
    transitionEnd: function(event) {

      if (parseInt(event.target.getAttribute('data-index'), 10) == index) {

        if (delay) begin();

        options.transitionEnd && options.transitionEnd.call(event, index, slides[index]);

      }

    }

  }

  // trigger setup
  setup();

  // start auto slideshow if applicable
  if (delay) begin();


  // add event listeners
  if (browser.addEventListener) {

    // set touchstart event on element
    element.addEventListener(browser.touchstart, events, false);

    if (browser.transitions) {
      element.addEventListener('webkitTransitionEnd', events, false);
      element.addEventListener('msTransitionEnd', events, false);
      element.addEventListener('oTransitionEnd', events, false);
      element.addEventListener('otransitionend', events, false);
      element.addEventListener('transitionend', events, false);
    }

    // set resize event on window
    window.addEventListener('resize', events, false);

  } else {

    window.onresize = function () { setup() }; // to play nice with old IE

  }

  // expose the Swipe API
  return {
    setup: function() {

      setup();

    },
    slide: function(to, speed) {

      // cancel slideshow
      stop();

      slide(to, speed);

    },
    prev: function() {

      // cancel slideshow
      stop();

      prev();

    },
    next: function() {

      // cancel slideshow
      stop();

      next();

    },
    stop: function() {

      // cancel slideshow
      stop();

    },
    getPos: function() {

      // return current index position
      return index;

    },
    getNumSlides: function() {

      // return total number of slides
      return length;
    },
    kill: function() {

      // cancel slideshow
      stop();

      // reset element
      element.style.width = '';
      element.style.left = '';

      // reset slides
      var pos = slides.length;
      while(pos--) {

        var slide = slides[pos];
        slide.style.width = '';
        slide.style.left = '';

        if (browser.transitions) translate(pos, 0, 0);

      }

      // removed event listeners
      if (browser.addEventListener) {

        // remove current event listeners
        element.removeEventListener(browser.touchstart, events, false);
        element.removeEventListener('webkitTransitionEnd', events, false);
        element.removeEventListener('msTransitionEnd', events, false);
        element.removeEventListener('oTransitionEnd', events, false);
        element.removeEventListener('otransitionend', events, false);
        element.removeEventListener('transitionend', events, false);
        window.removeEventListener('resize', events, false);

      }
      else {

        window.onresize = null;

      }

    }
  }

}


if ( window.jQuery || window.Zepto ) {
  (function($) {
    $.fn.Swipe = function(params) {
      return this.each(function() {
        $(this).data('Swipe', new Swipe($(this)[0], params));
      });
    }
  })( window.jQuery || window.Zepto )
}

function setThumbsPerPage(){
    //Show as many thumbs as will fit on the screen
    var itemsInPage = viewWidth / jQuery( ".dragend-thumb").width();
    jQuery("#thumbsContainer").dragend({
        itemsInPage: itemsInPage,
        onSwipeEnd: function() {
            //stopThumbsOverscroll();
        }
    });
}

//Prevent scrolling into whitespace after the last thumbnail
function stopThumbsOverscroll(){
    var lastThumb = jQuery('#thumbsContainer .dragend-thumb:last-child');
    var lastThumbWidth = width(lastThumb);
    var lastThumbOffsetLeft = lastThumb.position().left;
    var lastThumbOffsetRight = lastThumb.position().left + lastThumbWidth;
    var thumbsContainer = jQuery("#thumbsContainer div:first-child");
    var thumbsContainerWidth = width(thumbsContainer);
    var thumbsContainerBiggerBy =  thumbsContainerWidth - viewWidth;
    if ( thumbsContainerWidth > viewWidth){
        if( lastThumbOffsetRight < viewWidth){
            thumbsContainer.css('transform', 'translateX(-' + thumbsContainerBiggerBy + 'px)');
        }
        if( thumbsContainer.position().left > 0){
            thumbsContainer.css('transform', 'translateX(0px)');
        }
    }

}

/*
    jQuery.when(
        matchHeight(target, targetHeight)
    )
    .then(
        maxSizeByAsp(target, aspRange)
    );
 */

/**
 * get JSON from URL.  Primary usage WordPress REST Endpoints.
 */
function getJson(url) {
	//FIX: Move to different include file
	console.log("getJson() request for: " + url);

	return new Promise(function(successHandler, errorHandler) {
	var xhr = new XMLHttpRequest();
	xhr.onload = function() {
		if (xhr.status >= 200 && xhr.status < 400) {
			// Success!
			var data = JSON.parse(xhr.responseText);
			//console.log("json data: " + JSON.stringify(data) );
			successHandler(data);
		} else {
			// Error !
			errorHandler({
			  status: this.status,
			  statusText: xhr.statusText
			});
		}
	};
	xhr.onerror = function () {
		errorHandler({
			status: this.status,
			statusText: xhr.statusText
		});
	};
	xhr.open('GET', url);
	xhr.send();
	});

}

/**
 * Check if DOM element exists || 'has loaded'
 * Use for dynamic content required before doc.ready()
 * Requires callback() - 'what happens once the element is ready'
 */
function elementReady( element, callback ){
	(function checkForElement(){
	    setTimeout(function(){
			if( document.getElementById(element) ){
				console.log(element + " loaded.");
	        	callback();
	        }else{
	        	checkForElement(element);
	        }
	    },150);
	 })()
};


/**
 * Insert HTML Template for content: "images"
 */
//************************ REMOVE JQUERY  ********************************/
function createDragendSlides(parentContainer, slidesContent, slideType){
	//console.log("createDragendSlides() - parentContainer: " + parentContainer);
	var thisParentContainer = document.getElementById(parentContainer);
	var thisSlidesContainer = thisParentContainer.querySelector('.image-gallery');

	_.forEach(slidesContent, function(thisSlideContent) {
		var thisSlide = document.createElement('div');
		thisSlide.classList.add('dragend-page');

		if ( slideType == 'background-image' ){
			//console.log("slideType: background-image");
			//console.log("thisSlide: " + thisSlide);
			//console.log("thisSlideContent: " + typeof thisSlideContent);
			setBgImg(thisSlide, thisSlideContent);
		}
		//FIX: Add support for other element types

		thisParentContainer.appendChild(thisSlide);
	});
}
	/**
	 * Accepts target element and data object {url, original image height, original image width}
	 */

	function setBgImg(target, imageData){
		target.classList.add('backgroundImage');

		var thisImgUrl 		= imageData[0];
		var thisImgHeight 	= imageData[1];
		var thisImgWidth 	= imageData[2];

		target.style.backgroundImage = 'url(' + thisImgUrl + ')';

		//if original image HEIGHT passed in array
		if(thisImgHeight){
			target.setAttribute('data-height', thisImgHeight);
		}

		//if original image WIDTH passed in array
		if(thisImgWidth){
			target.setAttribute('data-width',  thisImgWidth);
		}

	}

function getImagesByScreenSize(imagesArray, firstBreak, secondBreak){
    //select the larger of viewport height - width (device can rotate after loading images)
    var windowMaxSize = Math.max(viewHeight, viewWidth);

    if ( windowMaxSize <= firstBreak ){
        return imagesArray[1];//medium;
    }
    else if( windowMaxSize >= firstBreak && windowMaxSize <= secondBreak) {
        return imagesArray[2];//large;
    }
    else{
        return imagesArray[3];//1920 max;
    }
}

function menuHeight(docHeight){
    /*
    var nav = get('nav');
    height(nav, "auto");
    if (hasClass(body, 'mobileMenuOpen') ){
        //console.log("menuHeight - docH: " + docHeight);
        height(nav, docHeight);
        minHeight(nav, viewHeight);
    }
    */
}

//Fix Footer position for short pages - triggered on .resize
//NOTE - FIX POSITION ABSOLUTE FROM 'absoluteAfter' on resize
function fixToBottom(target){
    //reset any classes from previous function call
    if ( hasClass(target, 'appendToViewport') ){
        removeClass(target, 'appendToViewport');
    }
    if ( hasClass(target, 'movedAfterPrev') ){
        removeClass(target, 'movedAfterPrev');
        setStyle(target, {
            'top' : 'auto'
        });
    }

    //get new values
    var targetBottom = jQuery('#footer').offset().top + jQuery('#footer').outerHeight(true);
    //if the target isn't already at the bottom
    //console.log(targetBottom);
    viewHeight = jQuery(window).height();
    if(targetBottom < viewHeight) {
        //check if there is enough space to fit the target
        //get previous sibling position
        //var eleAbove = getFamily(target, 'prev');
        //var eleAboveBottom = getOffset(eleAbove).bottom;

        var ele = jQuery('#footer');
        var eleAbove = ele.prev();
        var eleAboveBottom = eleAbove.offset().top + eleAbove.outerHeight(true);
        var availableSpace = viewHeight - eleAboveBottom;
        var targetHeight = getHeight(target);
        if ( availableSpace > targetHeight ){
            addClass(target, 'appendToViewport');
        }
        else{
            var eleAbovePosition = getPosition(eleAbove);
            //see if previous content is in the document flow position at bottom of prev sibling
            if(eleAbovePosition === "absolute"){
                //FIX: rename positionAfter();
                moveAfter(target, eleAbove);
            }
        }
    }
    var wrapHeight = jQuery('#wrapper').height();
    jQuery(body).css('min-height', wrapHeight);
}

function navClasses() {
	if (mobileNavOnly === false){
		if (viewWidth >= 1024){
			addClass(html, 'desktopMenu');
			removeClass(html, 'mobileMenu');
		}
		else{
			removeClass(html, 'desktopMenu');
			addClass(html,'mobileMenu');
		}
	}
}

/*Add mobileMenu class to html */
function addMenuOpenClass(){
    removeClass(html, 'desktopMenu');
	removeClass(html, 'mobileMenuClosed');
	addClass(html, 'mobileMenuOpen');
    menuHeight();
}

/*Remove mobileMenu class from body */
function removeMenuOpenClass(){
	removeClass(html, 'mobileMenuOpen');
	addClass(html, 'mobileMenuClosed');
    navClasses();//check if we need to put back 'desktopMenu' or 'mobileMenu'
    menuHeight();
}

//set portrait / landscape class
function getOrientationClass(){
	if (viewHeight > viewWidth) {
		addClass(html, 'portrait');
		removeClass(html, 'landscape');
		return "portrait";
	}
	else{
		addClass(html, 'landscape');
		removeClass(html, 'portrait');
		return "landscape";
	}
}

function setDimensions(target, targetHeight, aspRange){
    jQuery.when(
        matchHeight(target, targetHeight)
    )
    .then(
        maxSizeByAsp(target, aspRange)
    );
}

function moveOnOrientation(target, destination, landscape, portrait){
	//LANDSCAPE
	if(viewWidth>viewHeight){
		if(landscape == "prepend"){
			jQuery(target).prependTo(destination);
		}
		if(landscape == "append"){
			jQuery(target).appendTo(destination);
		}
		if(landscape == "after"){
			jQuery(target).insertAfter(destination);
		}
		if(landscape == "before"){
			jQuery(target).insertBefore(destination);
		}
	}
	//PORTRAIT
	else{
		if(portrait == "prepend") {
			jQuery(target).prependTo(destination);
		}
		if(portrait == "append"){
			jQuery(target).appendTo(destination);
		}
		if(portrait == "after"){
			jQuery(target).insertAfter(destination);
		}
		if(portrait == "before"){
			jQuery(target).insertBefore(destination);
		}
	}
}

/* function getJson(url) {
  return new Promise(function(successHandler, errorHandler) {
	var xhr = new XMLHttpRequest();
	xhr.onload = function() {
		if (xhr.status >= 200 && xhr.status < 400) {
			// Success!
			var data = JSON.parse(xhr.responseText);
			//console.log("json data: " + JSON.stringify(data) );
			successHandler(data);
		} else {
			// Error !
			errorHandler({
			  status: this.status,
			  statusText: xhr.statusText
			});
		}
	};
	xhr.onerror = function () {
		errorHandler({
			status: this.status,
			statusText: xhr.statusText
		});
	};
	xhr.open('GET', url);
	xhr.send();
  });
}
*/

/*
USAGE: **with php URL

	getJson(' <?php echo ($json_url); ?> ').then(function(result) {
		// Code depending on result

	}).catch(function (err) {
		console.error('Augh, there was an error!', err.statusText);
	});

 */
function hasClass(ele,cls) {
	return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|jQuery)'));
}

function addClass(ele,cls) {
	if (!hasClass(ele,cls)) {ele.className += " "+cls;}
}

function removeClass(ele,cls) {
	if (hasClass(ele,cls)) {
		var reg = new RegExp('(\\s|^)'+cls+'(\\s|jQuery)');
		ele.className=ele.className.replace(reg,' ');
	}
}

function maxH(target, value){
	jQuery(target).css('max-height', value);
}

function maxW(target, value){
	jQuery(target).css('max-width', value);
}

function minH(target, value){
	jQuery(target).css('min-height', value);
}

function minW(target, value){
	jQuery(target).css('min-width', value);
}

function matchHeight(target, targetHeight){
    //console.log('matchHeight() - viewHeight ' + window.innerHeight);
    targetHeight = targetHeight ? targetHeight : window.innerHeight;
	return jQuery(target).height(targetHeight);
}

function maxSizeByAsp(target, minAsp, maxAsp){
    minAsp = minAsp ? minAsp : 1.7;
    maxAsp = maxAsp ? maxAsp : 2.1;

	jQuery(target).css('max-height', 'none');
	jQuery(target).css('min-height', 0);

    var viewWidth = jQuery(window).width();
    var viewHeight = jQuery(window).height();
	var targetAsp = viewWidth / viewHeight;

    //if WIDE / SHORT
	if (targetAsp > maxAsp){
		minH(target, viewWidth / maxAsp);
	}

	//if TALL / SKINNY
	if (targetAsp < minAsp){
		maxH(target, viewWidth / minAsp );
	}
}

function aspLabel(width, height){
	if ( width / height > 1.75 ){
		return "landscape shortWide";
	}

	else if ( width > height ){
		return "landscape";
	}

	else if ( width / height < 0.75 ){
		return "portrait tallSkinny";
	}

	else if ( width < height ){
		return "portrait";
	}

	else{
		return "square";
	}
}

//FIX: why am I using this?
/*
function widerThan(min, max, target){
    var isWider;
    if(!target){
		target = jQuery(window);
	}

	if (max){
		if( (max > width(target) ) && ( min < width(target) ) ){
			isWider = true;
		}
	}
	else if( min < width(target) ){
		isWider = true;
	}
	else{
		isWider =  false;
	}
    return isWider;
}*/

'use strict';
/*jshint -W117 */

//Combine 2 arrays
//Returns a non-destructive result containing both arrays
function joinArrays(firstArray, secondArray){
    var mergedArray = firstArray.concat(secondArray);
    return mergedArray;
}

//Find the number of elements in this array
function getArrayLength(thisArray){
    return thisArray.length;
}


//Find the index position of an item in an array
function getArrayPosition(thisArray, thisItem){
    return thisArray.indexOf(thisItem);
}


//Pop, Push, Shift, and Unshift
function removeFromArray(thisArray, thisPosition){
    switch (thisPosition) {
        case "last":
            //remove from end of array
            return thisArray.pop;
        case "first":
            //remove from start of array
            return thisArray.shift;
        default:
            //remove specific index
            return delete array[thisPosition];
    }
}

function addToArray( thisArray, thisPosition, thisValue ){
    switch (thisPosition) {
        case "last":
            //add to end of array
            return thisArray.push(thisValue);
        case "first":
            //add to start of array
            return thisArray.unshift(thisPosition);
        default:
            //add value to index position
            thisArray[thisPosition] = thisValue;
            return thisArray;
    }
}

function convertArrayToString(thisArray, separator){
    return thisArray.join(separator);
}
//box() is a convenient reference function for getting int values for boxModel properties
function box(element){
    var thisHeight      = getHeight(element);
    //console.log("box() - thisHeight: " + thisHeight);
    var thisWidth       = getWidth(element);
    var thisMargin      = getMargin(element);
    var thisPadding     = getPadding(element);
    var thisPosition    = getPosition(element);
    var thisOuterHeight = getOuterHeight(element, thisHeight, thisMargin, thisPadding);
    var thisOuterWidth  = getOuterWidth(element, thisWidth, thisMargin, thisPadding);
    var thisOffset      = getOffset(element, thisOuterHeight, thisOuterWidth);
    //console.log("box() - thisOuterHeight: " + thisOuterHeight);

    return {
        height: thisHeight,
        width: thisWidth,
        margin: {
            'top'   : thisMargin.top,
            'right' : thisMargin.right,
            'bottom': thisMargin.bottom,
            'left'  : thisMargin.left
        },
        padding: {
            'top'   : thisPadding.top,
            'right' : thisPadding.right,
            'bottom': thisPadding.bottom,
            'left'  : thisPadding.left
        },
        position: thisPosition,
        offset:{
            'top'   : thisOffset.top,
            'right' : thisOffset.right,
            'bottom': thisOffset.bottom,
            'left'  : thisOffset.left
        },
        outerHeight: thisOuterHeight,
        outerWidth: thisOuterWidth
    };
}

function height(element, height){
    if (height){
        setHeight(element, height);
    }
    else{
        getHeight(element);
    }
}

    //get the computed style height
    function getHeight(element){
        var thisHeight = window.getComputedStyle(element).getPropertyValue("height");
        return toInt(thisHeight);
    }

    //set height as string px value,
    function setHeight(element, height){
        var thisHeight = toPix(height);
        //console.log("setHeight - " + element.id + " - " + height);
        element.style.height = thisHeight;
    }

//set width to thisWidth as string px value, or get the computed style width
function width(element, width){
    if (width){
        setWidth(element, width);
    }
    else{
        getWidth(element);
    }
}

    //get the computed style width
    function getWidth(element){
        var thisWidth = window.getComputedStyle(element).getPropertyValue("width");
        //console.log("getWidth - " + element.id);
        return toInt(thisWidth);
    }

    //set width as string px value,
    function setWidth(element, width){
        var thisWidth = toPix(width);
        //console.log("setWidth - " + element.id + " - " + thisWidth);
        element.style.width = thisWidth;
    }


//MIN HEIGHT
function minHeight(element, minHeight){
    if (minHeight){
        setMinHeight(element, minHeight);
    }
    else{
        getMinHeight(element);
    }
}
    //get the computed style of min-height
    function getMinHeight(element){
        var thisMinHeight = getStyle(element, "minHeight");
        return toInt(thisMinHeight);
    }

    //set minHeight as px value,
    function setMinHeight(element, minHeight){
        var thisMinHeight = toPix(minHeight);
        setStyle(element, {"minHeight"  : thisMinHeight});
    }

    //set width as px value, or get the computed style width
    function minWidth(element, minWidth){
        if (minWidth){
            setMinWidth(element, minWidth);
        }
        else{
            getMinWidth(element);
        }
    }
        //get min-width from the computed style
        function getMinWidth(element){
            var thisMinWidth = getStyle(element, "minWidth");
            return toInt(thisMinWidth);
        }

        //set min-width as string px value,
        function setMinWidth(element, minWidth){
            var thisMinWidth = toPix(thisMinWidth);
            return setStyle(element, {"minWidth"  : thisMinWidth});
        }

function getMargin(element){
    var thisMarginTop =     toInt( getStyle(element, "marginTop") );
    var thisMarginRight =   toInt( getStyle(element, "marginRight") );
    var thisMarginBottom =  toInt( getStyle(element, "marginBottom") );
    var thisMarginLeft =    toInt( getStyle(element, "marginLeft") );

    return {
        top: thisMarginTop,
        right: thisMarginRight,
        bottom: thisMarginBottom,
        left: thisMarginLeft
    };
}

function getPadding(element){
    //console.log("getPadding for: " + element.id);
    var thisPaddingTop =    toInt( getStyle(element, "paddingTop") );
    var thisPaddingRight =  toInt( getStyle(element, "paddingRight") );
    var thisPaddingBottom = toInt( getStyle(element, "paddingBottom") );
    var thisPaddingLeft =   toInt( getStyle(element, "paddingLeft") );
    //console.log("getPadding() - top: " + thisPaddingTop);

    return {
        top: thisPaddingTop,
        right: thisPaddingRight,
        bottom: thisPaddingBottom,
        left: thisPaddingLeft
    };
}

function getPosition(element) {
    var thisPosition = getStyle(element, "position");
    //console.log("getPosition() for " + element.id + " : " + thisPosition);
    return thisPosition;
}

function getOffset(element, outerHeight, outerWidth){
    //console.log("getOffset() - outerHeight: " + outerHeight );
    outerHeight = outerHeight ? outerHeight : getOuterHeight(element);
    outerWidth  = outerWidth  ? outerWidth  : getOuterWidth(element);
    var thisTop = getOffsetTop(element);
    var thisRight = getOffsetRight(element, outerWidth);
    var thisBottom = getOffsetBottom(element, outerHeight);
    var thisLeft = getOffsetLeft(element);

    var theseOffsets = {
        top: thisTop,
        right: thisRight,
        bottom: thisBottom,
        left: thisLeft
    };
    //console.log("getOffset() : " + theseOffsets);
    return theseOffsets;
}

function getOffsetTop(element){
    var thisTop = 0;
    while(element){
        thisTop += (element.offsetTop - element.scrollTop + element.clientTop);
        element = element.offsetParent;
    }

    return thisTop;
}

function getOffsetBottom(element, outerHeight){
    outerHeight = outerHeight ? outerHeight : getOuterHeight(element);
    var thisElementTop = getOffsetTop(element);

    //console.log("getOffsetBottom() - elementTop: " + thisElementTop );
    //console.log("getOffsetBottom() - outerHeight: " + outerHeight );

    var thisOffsetBottom = thisElementTop + outerHeight;

    return thisOffsetBottom;
}

function getOffsetLeft(element){
    var thisLeft = 0;
    while(element) {
        thisLeft += (element.offsetTop - element.scrollTop + element.clientTop);
        element = element.offsetParent;
    }

    return thisLeft;
}

function getOffsetRight(element, outerWidth){
    outerWidth = outerWidth ? outerWidth : getOuterWidth(element);
    var thisOffsetLeft = getOffsetLeft(element);
    var thisOffsetBottom = thisOffsetLeft + outerWidth;

    return thisOffsetBottom;
}


//outerHeight + outerWidth calculations
function getOuterHeight(element, height, margin, padding){
     height = height ? height : getHeight(element);
     margin = margin ? margin : getMargin(element);
     padding = padding ? padding : getPadding(element);
    //console.log(padding);

    //get/add vertical margin and padding values to height
    var thisVertMargin = margin.top + margin.bottom;
    var thisVertPadding = padding.top + padding.bottom;
    var thisOuterHeight = height + thisVertMargin + thisVertPadding;

    return thisOuterHeight;
}

function getOuterWidth(element, width, margin, padding){
    width = width ? width : getWidth(element);
    margin = margin ? margin : getMargin(element);
    padding = padding ? padding : getPadding(element);

    //get/add horizontal margin and padding values to width
    var thisHorzMargin = margin.left + margin.right;
    var thisHorzPadding = padding.left + padding.right;
    var thisOuterWidth = width + thisHorzMargin + thisHorzPadding;

    return thisOuterWidth;
}

// get element by Id > class > selector
function get(selector, family){
    var thisTarget; //contains resulting element(s) from get()

    if (family){
        thisTarget = getFamily(selector, family);
    }
    else {
        if( document.getElementById(selector) ){
            thisTarget =  getById(selector);
        }
        else if (document.getElementsByClassName(selector)){
            thisTarget =  getByClass(selector);
        }
        else{
            thisTarget = getBySelector(selector);
        }
    }
    //console.log("get() called on: " + selector + " returned: " + thisTarget);
    return thisTarget;
}

    function getById(id){
        var thisTarget = document.getElementById(id);
        return thisTarget;
    }

    function getByClass(className){
        var thisTarget = document.getElementsByClassName(className);
        return thisTarget;
    }

    function getBySelector(selector){
        var thisTarget = document.querySelectorAll(thisSelector);
        return thisTarget;
    }

    function getFamily(element, family){
        var thisFamily;
        switch (family){
            case "prev":
                thisFamily = getPrev(element);
                break;
            case "next":
                thisFamily = getNext(element);
                break;
            case "parent":
                thisFamily = getParent(element);
                break;
            /* FIX: Add child and children
            case "child":
                var thisTarget = getNext(element);
                break;
            case "children":
                var thisTarget = getNext(element);
                break;
            */
        }
        return thisFamily;
    }

        function getPrev(element){
            var thisSibling = element.previousElementSibling;
            return thisSibling;
        }

        function getNext(element){
            var thisSibling = element.nextElementSibling;
            return thisSibling;
        }

        function getParent(element){
            var thisParent = element.parentElement;
            //console.log("getParent - " + element.id + " - " + thisParent);
            return thisParent;
        }

function moveAfter(element, target){
    var thisTop = getOffsetBottom(target);
    addClass(target, "movedAfter");
    style(element, {
        //'position':'absolute', //set with css class
        'top': toPix(thisTop)
        }
    );
}

'use strict';
/*jshint -W117 */
/*
function addEvent(thisTarget, eventType, fucntion){
    get(thisTarget);
    if(document.addEventListener){
        thisTarget.addEventListener(eventType, fucntion, false);
    } else if(document.attachEvent){
        thisTarget.attachEvent('on'+eventType, fucntion);
    } else {
        thisTarget['on'+eventType] = fucntion;
    }
}

*/
/*

//Sample Usage

addEvent(window, 'load', function(){
    //all our code that runs after the page is ready goes here
});

addEvent(ourForm, 'submit', checkForm);

// */

function getDocHeight(){
    //Standardize height to heighest value
    var docHeight = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );
    return docHeight;
}

// get element by Id > class > selector
function get(selector, family){
    var thisTarget; //contains resulting element(s) from get()

    if (family){
        thisTarget = getFamily(selector, family);
    }
    else {
        if( document.getElementById(selector) ){
            thisTarget =  getById(selector);
        }
        else if ( document.getElementsByClassName(selector) ){
            thisTarget =  getByClass(selector);
        }
        else{
            thisTarget = getBySelector(selector);
        }
    }
    //console.log("get() called on: " + selector + " returned: " + thisTarget);
    return thisTarget;
}

    function getById(id){
        var thisTarget = document.getElementById(id);
        return thisTarget;
    }

    function getByClass(className){
        var thisTarget = document.getElementsByClassName(className);
        return thisTarget;
    }

    function getBySelector(selector){
        var thisTarget = document.querySelectorAll(thisSelector);
        return thisTarget;
    }

    function getFamily(element, family){
        var thisFamily;
        switch (family){
            case "prev":
                thisFamily = getPrev(element);
                break;
            case "next":
                thisFamily = getNext(element);
                break;
            case "parent":
                thisFamily = getParent(element);
                break;
            /* FIX: Add child and children
            case "child":
                var thisTarget = getNext(element);
                break;
            case "children":
                var thisTarget = getNext(element);
                break;
            */
        }
        return thisFamily;
    }

        function getPrev(element){
            var thisSibling = element.previousElementSibling;
            return thisSibling;
        }

        function getNext(element){
            var thisSibling = element.nextElementSibling;
            return thisSibling;
        }

        function getParent(element){
            var thisParent = element.parentElement;
            //console.log("getParent - " + element.id + " - " + thisParent);
            return thisParent;
        }

function getStyle(element, property){
    var thisStyle = window.getComputedStyle(element).getPropertyValue(property);
    return thisStyle;
}

function setStyle(element, styles){
    var property, value;
    for ( property in styles ) {
        value = styles[property];
        element.style[property] = value;
    }
}

//FIX: check for other string values
function toPix(thisValue){
    if(thisValue){
        if ( typeof(thisValue) === "string" ){
            //parse to base 10 + also removing trailing "px"
            thisValue = parseInt(thisValue, 10);
        }
    }
    //this is undefined, null, '' (empty string), 0 or NaN
    else{
        thisValue = 0;
    }

    thisValue = thisValue += "px";
    return thisValue;
}

function toInt(thisValue){ //check for 'none', 'inherit' etc.
    //check for valid value
    if(thisValue){
        if ( typeof(thisValue) === "string" ){
            //parse to base 10 + also removing trailing "px"
            thisValue = parseInt(thisValue, 10);
        }
    }
    //this is undefined, null, '' (empty string), 0 or NaN
    else{
        thisValue = 0;
    }
    return thisValue;
}

function addClass(element, thisClass){
    element.classList.add(thisClass);
}

function removeClass(element, thisClass){
    element.classList.remove(thisClass);
}

function toggleClass(element, thisClass){
    element.classList.toggle(thisClass);
}

function hasClass(element, thisClass){
    var hasClass = element.classList.contains(thisClass);
    return hasClass;
}

function getScrollValue(element){
    if (element){
        var thisElement = get(element);
        var thisScrollTop = thisElement.scrollY;
        //console.log(thisScrollTop);
        return thisScrollTop;
    }
    else{
        var windowScrollTop = window.scrollY;
        return windowScrollTop;
    }
}

//get attribute - ie. href, class, charset etc.
function getAttribute(thisTarget, thisAttribute){
    thisTarget = get(thisTarget);
    var thisValue = thisTarget.getAttribute(thisAttribute);
    return thisValue;
}

'use strict';
/*jshint -W117 */

function jsonToJs(thisJson){
    return JSON.parse(thisJson);
}

function jsToJson(thisJsObject){
    return JSON.stringify(thisJsObject);
}

//String Manipulation
function getCharAt(thisTarget, thisPosition){
    return thisTarget.charAt(thisPosition);
}

function getCharIndex(thisTarget, thisCharacter){
    return thisTarget.indexOf(thisCharacter);
}

function trimThis(thisTarget){
    return thisTarget.trim();
}
function styles(element, styles ) {
    if(styles){
        setStyle(element, styles);
    }
    else{
        getStyle(element);
    }}

    function getStyle(element, property){
        var thisStyle = window.getComputedStyle(element).getPropertyValue(property);
        //console.log("getStyles() - " + propery + " for: " + element.id + " returned: " + thisStyle);
        return thisStyle;
    }

    function setStyle(element, styles){
        var property, value;
        for ( property in styles ) {
            value = styles[property];
            element.style[property] = value;
        }
        return element;
    }

jQuery('#windowSize').click(function() {
    jQuery('#windowSize').fadeOut('medium');
});

function testPanel() {
    jQuery('#windowSize').css('display','block');
    jQuery('#windowSize').empty();

    jQuery('#windowSize').append("<div>W: "     + viewWidth     + "px </div>");
    jQuery('#windowSize').append("<div>H: "     + viewHeight    + "px </div>");
    jQuery('#windowSize').append("<div>"        + aspText       + "</div>");
    jQuery('#windowSize').append("<div>Bp: "    + breakPoint    + "</div>");
    jQuery('#windowSize').append("<div>Device:" + deviceType    + "</div>");

    setTimeout(function(){
        jQuery("#windowSize").fadeOut(400);
    }, 3500);
}

jQuery('.scrollMenu #header').addClass('scrolled')

function newSwipeThumbs(target, slideSpeed){
    window[target] = new Swipe(document.getElementById(target), {
        startSlide: 0,
        speed: 1000,
        auto: 4000,
        continuous: true,
        fade: { crossFade: true },
        virtualTranslate: true,
        effect: 'fade'
    });

    function thumbClick() {
        //console.log('thumbClicked');
        event.preventDefault();

        thumbIndex = jQuery('.swipe-thumb').index( this );
        //console.log('thumbClicked - this: ' + thumbIndex);

        window[target].slide(thumbIndex);
        return false;
    }

    var thumbsContainer = jQuery('.swipe-thumbs-wrap');

    //Get the thumbnails
    var thumbs = thumbsContainer.find('.swipe-thumb');
    for (var i = 0; i < thumbs.length; i++) {
        thumbs[i].addEventListener('click', thumbClick);
    }

    var nextControl = jQuery('.sliderControls .next-slide');
    nextControl.click(function() {
        console.log('nextControl clicked');
        window[target].next();
    });

    var prevControl = jQuery('.sliderControls .prev-slide');
    prevControl.click(function() {
        console.log('prevControl clicked');
        window[target].prev();
    });

    //after the gallery is ready, set the dimensions
    setDimensions(document.getElementById(target));
}

function newSwipeBasic(target, slideSpeed){
    window[target] = new Swipe(document.getElementById(target), {
            startSlide: 0,
            speed: 800,
            auto: slideSpeed,
            continuous: true,
            fade: { crossFade: true },
            virtualTranslate: true,
            effect: 'fade'
    });

    var nextControl = jQuery('.sliderControls .next-slide');
    nextControl.click(function() {
        console.log('nextControl clicked');
        window[target].next();
    });

    var prevControl = jQuery('.sliderControls .prev-slide');
    prevControl.click(function() {
        console.log('prevControl clicked');
        window[target].prev();
    });

    setDimensions(document.getElementById(target));
    console.log("newSwipeBasic: " + window[target]);

}

/**
 * Open && Close Slide Panels
 *
 * FIX: Add comments
 */

function openSlider(slidePanel, slideDirection){
    slideDirection = slideDirection ? slideDirection : "left";

    var slideDistance = slidePanel.width();
    if(slideDirection === "right"){
        slideDistance = slideDistance * (-1);
    }

    var friends = slidePanel.data('also-slide').split(" ");
    jQuery.each( friends, function( index, friend ) {
        jQuery(friend).animate({"left" : slideDistance}, 350);
    });

    var sliderAnimation = {};
    sliderAnimation[slideDirection] = 0;
    slidePanel.animate(sliderAnimation, 350);
}

function closeSlider(slidePanel, slideDirection){
    slideDirection = slideDirection ? slideDirection : "left";

    var slideDistance = slidePanel.width();
    if(slideDirection === "right"){
        slideDistance = slideDistance * (-1);
    }

    var friends = slidePanel.data('also-slide').split(" ");
    jQuery.each( friends, function( index, friend ) {
        jQuery(friend).animate({"left" : 0 }, 350);
    });

    if(slideDirection === "right"){
        slidePanel.animate({"right" : slideDistance}, 350);
    }else{
        slideDistance = slideDistance * (-1);
        slidePanel.animate({"left" : slideDistance}, 350);
    }
}

function moveThumbsContainer(){
    //reset function specific styles
    jQuery('.swipe-thumb').css('max-width', "");
    jQuery('.swipe-thumb').css('max-height', "");
    jQuery('.horScrollContent').removeAttr('style');
    jQuery('.swipe-thumbs-wrap').removeAttr('style');

    galleryHeight = jQuery('.image-gallery').height();
    galleryWidth = jQuery('.image-gallery').width();

    thumbsCount =  jQuery('.swipe-thumb').length;
    console.log("thumbsCount: " + thumbsCount);

    thumbWidth = jQuery('.swipe-thumb').width();
    console.log("eachThumbWidth: " + thumbWidth);

    thumbsWrapWidth = thumbsCount * thumbWidth;

    //APPEND THUMBS ON LANDSCAPE
    if( galleryHeight >= viewHeight - thumbWidth ){
        //if (jQuery(window).width() > tabletLandscape){
            if( jQuery(html).hasClass('landscape') ){
                jQuery('.swipe-thumbs-wrap').appendTo('.swipe');
                jQuery('.swipe-thumbs-wrap').css('position', 'absolute');
                jQuery('.swipe-thumbs-wrap').css('bottom', 0);
            }
        //}
    }
    else{
        jQuery('.swipe-thumbs-wrap').insertAfter('.swipe');
        jQuery('.swipe-thumbs-wrap').css('position', 'static');
        jQuery('.swipe-thumbs-wrap').css('bottom', "auto");
    }

    //CENTER THUMBS CONTAINER
    console.log("thumbsWrapWidth: " + thumbsWrapWidth);
    console.log("gallerWidth: " + galleryWidth);

    if (thumbsWrapWidth < galleryWidth){
        thumbsWrapMargin = (galleryWidth - thumbsWrapWidth) / 2;
        jQuery('.swipe-thumbs-wrap').css('margin-left', thumbsWrapMargin);
    }

    if (thumbsWrapWidth > galleryWidth){
        jQuery('.swipe-thumbs-wrap').addClass('horScrollWrap');
        jQuery('.horScrollContent').width(thumbsWrapWidth);
        console.log("thumbs bigger");
        //thumbMaxWidth = galleryWidth / thumbsCount;
        //jQuery('.swipe-thumb').css('max-width', thumbMaxWidth);
        //jQuery('.swipe-thumb').css('max-height', thumbMaxWidth);
        //jQuery('.swipe-thumbs-container').css('max-height', thumbMaxWidth);
    }
}

//returns the caller function name
/*
    var callerName;
    try { throw new Error(); }
    catch (e) {
        var re = /(\w+)@|at (\w+) \(/g, st = e.stack, m;
        re.exec(st), m = re.exec(st);
        callerName = m[1] || m[2];
    }
    console.log("function() called by: " + callerName);
*/

// JSON.stringify() turns a Javascript object into JSON text and stores that JSON text in a string.
// JSON.parse() turns a string of JSON text into a Javascript object.


function dumpComputedStyles(elem,prop) {

  var cs = window.getComputedStyle(elem,null);
  if (prop) {
    console.log(prop+" : "+cs.getPropertyValue(prop));
    return;
  }
  var len = cs.length;
  for (var i=0;i<len;i++) {

    var style = cs[i];
    console.log(style+" : "+cs.getPropertyValue(style));
  }

}

function applyIso(){
    var projectsIso = jQuery('.iso-grid').isotope({
        itemSelector: '.iso-grid-item',
        resizable: false, // disable normal resizing
        percentPosition: true,
        animationEngine: 'best-available',
        animationOptions: {
            duration: 3000,
            easing: 'linear',
            queue: false
        },
        layoutMode: 'fitRows',
        masonry:{
            columnWidth:    'iso-grid-item',
            isAnimated:     true
            //isFitWidth:   true
        }
    });
}

/**
 * getBreakpoint()
 *
 * Determines string value of breakpoint based on the current viewport size.
 *
 * @global viewWidth (int) is calculated on doc.ready and each doc.resize
 *
 * @global mobilePortrait (int),
 * @global mobileLandscape (int),
 * @global tabletLandscape (int) settings are defined in velcro/coreFramework.js
 *
 * @return thisBreakpoint (string)
 */

function getBreakpoint(smallBp, largeBp){
    var thisBpLabel;
    if( viewWidth <= smallBp ){
        thisBpLabel = "small";
    }
    else if ( viewWidth > smallBp && viewWidth < largeBp ){
        thisBpLabel = "medium";
    }
    else{
        thisBpLabel = "large";
    }
    //console.log("Breakpoint: " + thisBpLabel);
    return thisBpLabel;
}

/**
 * filterByViewport(allViewportsContent, firstBreak, secondBreak);
 *
 * Filters all available content by current viewport size.  Returns medium, large or xlarge array.
 *
 * @allViewportsContent (array) structured by size:
    *  allViewportsContent[0]: small or thumbnail specific content
    *  allViewportsContent[1]: medium specific content
    *  allViewportsContent[2]: large specific content
    *  allViewportsContent[3]: xlarge specific content
    *
* @firstBreak (int),
* @secondBreak (int) set in /velcro/coreFramework.js
*
* @thisViewportSize considered the larger of viewHeight or viewWidth, as the user may turn the device.
*
* @return thisViewportContent (array)
*
*/

//FIX: Add condition check: allViewportsContent for correct data structure
function filterByViewport(allViewportsContent, firstBreak, secondBreak){

    //select the larger of viewport height - width (device can rotate after loading content)
    var thisViewportSize = Math.max(viewHeight, viewWidth);
    var thisViewportContent;

    //medium;
    if ( thisViewportSize <= firstBreak ){
        thisViewportContent = allViewportsContent[1];
    }

    //large;
    else if( thisViewportSize >= firstBreak && thisViewportSize <= secondBreak) {
        thisViewportContent = allViewportsContent[2];
    }

    //xlarge
    else{
        thisViewportContent = allViewportsContent[3];
    }

    return thisViewportContent;
}

function applyIso(){
    var projectsIso = jQuery('.iso-grid').isotope({
        itemSelector: '.iso-grid-item',
        resizable: true, // disable normal resizing
        percentPosition: true,

        animationEngine: 'best-available',
        animationOptions: {
            duration: 3000,
            easing: 'linear',
            queue: false
        },
        layoutMode: 'fitRows',
        masonry:{
            columnWidth:    'iso-grid-item',
            isAnimated:     true
            //isFitWidth:     true
        }
    });
}


function lazyLoadResource(file, type){
	var cb = function() {
    var link;
    if (type === "css"){
		link = document.createElement('link'); link.rel = 'stylesheet';
	}
	else if (type === "js"){
		link = document.createElement('script'); link.type = 'text/javascript';
	}

	link.href = file;
	var h = document.getElementsByTagName('head')[0]; h.parentNode.insertBefore(l, h);
	};
	var raf = requestAnimationFrame || mozRequestAnimationFrame ||
	webkitRequestAnimationFrame || msRequestAnimationFrame;
	if (raf) raf(cb);
	else window.addEventListener('load', cb);
}

'use strict';
/*jshint -W117 */

function load(where, what, callback){
	console.log("Loaded: " + what + " INTO " + where);
	jQuery( where ).load( what, function() {
	  jQuery(window).resize();
	  window.scrollTo(0,0);
      callback();
	});
}


function doRecursively(thisFn, interval, timeout) {
    setTimeout(function(){
	    interval = interval ||  3000;
	    timeout =  timeout  || 30000;
	    var startTime = (new Date()).getTime();


	    (function rinceRepeat() {
	        var thisFnResult = thisFn();

	        if ( (Date.now() - startTime ) <= timeout )  {
	            setTimeout(rinceRepeat, interval, thisFnResult);
	        }
	    })();

    }, interval * 0.75);
}

function resetHeights(target){
    jQuery(target).css('min-height', 'none');
    jQuery(target).css('max-height', 'none');
    jQuery(target).css('height', 'auto');
}

function resetWidths(target){
    jQuery(target).css('min-width', 'none');
    jQuery(target).css('max-width', 'none');
    jQuery(target).css('width', 'auto');
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2plY3QuanMiLCJ2ZWxjcm8uanMiLCJpc290b3BlLnBrZ2QubWluLmpzIiwibG9kYXNoLmNvcmUubWluLmpzIiwic2xpY2subWluLmpzIiwic3dpcGUuanMiLCIjZHJhZ2VuZEV4dHJhLmpzIiwiI3doZW5UaGVuLmpzIiwiYUludGVncmF0ZUJhY2suanMiLCJjb3JlRnJhbWV3b3JrLmpzIiwiY29yZUdldEpzb24uanMiLCJjb3JlSGVscGVycy5qcyIsImNvcmVWYW5pbGxhQXJyYXlzLmpzIiwiY29yZVZhbmlsbGFCb3hNb2RlbC5qcyIsImNvcmVWYW5pbGxhRG9tLmpzIiwiY29yZVZhbmlsbGFFdmVudHMuanMiLCJjb3JlVmFuaWxsYUhlbHBlcnMuanMiLCJjb3JlVmFuaWxsYUpzb24uanMiLCJjb3JlVmFuaWxsYVN0cmluZ3MuanMiLCJjb3JlVmFuaWxsYVN0eWxlcy5qcyIsIm1vZGFsc1Rlc3RpbmcuanMiLCJzdGlja3lNZW51LmpzIiwic3dpcGVIZWxwZXJzLmpzIiwic3dpcGVTbGlkZVBhbmVsLmpzIiwic3dpcGVUaHVtYnNXcmFwLmpzIiwidHJvdWJsZXNob290aW5nRXhhbXBsZXMuanMiLCJ2ZWxjcm9BcHBseUlzby5qcyIsInZlbGNyb0JyZWFrUG9pbnRzLmpzIiwidmVsY3JvRmlsdGVyQ29udGVudC5qcyIsInZlbGNyb0lzby5qcyIsInZlbGNyb0xhenlMb2FkLmpzIiwidmVsY3JvTG9hZC5qcyIsInZlbGNyb1JlY3Vyc2l2ZS5qcyIsInZlbGNyb1Jlc2V0VmFsdWVzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDN0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM5SUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN2bEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDOUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDckhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM5SUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN2Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN0R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN0REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM1UEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNwS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNsQkE7QUFDQTtBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN6RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDNUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDL0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM1Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6InByb2plY3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKmpzaGludCAtVzExNyAqL1xuLypqc2hpbnQgLVcwODIgKi9cblxualF1ZXJ5KGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpe1xuXG5cdC8vSE9NRSBQQUdFIC0gRHJhZ2VuZCBJbWFnZSBHYWxsZXJ5XG5cdGlmICggalF1ZXJ5KCdodG1sJykuZGF0YSgncGFnZS1zbHVnJykgPT0gJ2hvbWUnICl7XG4gICAgICAgIGhvbWVSZXNpemUoKTtcbiAgICAgICAgalF1ZXJ5KHdpbmRvdykucmVzaXplKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBob21lUmVzaXplKCk7XG4gICAgICAgIH0pO1xuXHRcdGZ1bmN0aW9uIGhvbWVSZXNpemUoKXtcblx0ICAgICAgICBjb25zb2xlLmxvZyhcInByb2plY3QuanMvaG9tZTpyZXNpemVcIik7XG4gICAgICAgICAgICBpZihqUXVlcnkoJyNob21lR2FsbGVyeScpLmhlaWdodCgpID09IGpRdWVyeSh3aW5kb3cpLmhlaWdodCgpKXtcbiAgICAgICAgICAgICAgICBqUXVlcnkoJyNwYWdlVGl0bGUnKS5hcHBlbmRUbygnI2hvbWVHYWxsZXJ5Jyk7XG4gICAgICAgICAgICAgICAgalF1ZXJ5KCcjaG9tZUdhbGxlcnknKS5jc3MoJ3Bvc2l0aW9uJywncmVsYXRpdmUnKTtcbiAgICAgICAgICAgICAgICBqUXVlcnkoJyNwYWdlVGl0bGUnKS5hZGRDbGFzcygnZ2FsbGVyeUJvdHRvbScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBqUXVlcnkoJyNwYWdlVGl0bGUnKS5pbnNlcnRBZnRlcignI2hvbWVHYWxsZXJ5Jyk7XG4gICAgICAgICAgICAgICAgalF1ZXJ5KCcjcGFnZVRpdGxlJykucmVtb3ZlQ2xhc3MoJ2dhbGxlcnlCb3R0b20nKTtcbiAgICAgICAgICAgIH1cblxuXHRcdH1cblxuXHR9Ly9ob21lIHBhZ2VcblxuXHQvL1BST0pFQ1RTIFBBR0UgLSBEcmFnZW5kIEltYWdlIEdhbGxlcnlcblx0aWYgKCBqUXVlcnkoJ2h0bWwnKS5kYXRhKCdwYWdlLXNsdWcnKSA9PSAncHJvamVjdHMnIHx8IGpRdWVyeSgnaHRtbCcpLmRhdGEoJ3BhZ2Utc2x1ZycpID09ICdwb3J0Zm9saW8nKXtcblx0XHRqUXVlcnkod2luZG93KS5vbigncmVzaXplJywgcHJvamVjdHNSZXNpemUoKSApO1xuXHRcdGpRdWVyeSh3aW5kb3cpLm9uKCdyZXNpemUnLCBhcHBseUlzbygpICk7XG5cblx0XHRmdW5jdGlvbiBwcm9qZWN0c1Jlc2l6ZSgpe1xuXHRcdFx0Y29uc29sZS5sb2coXCJwcm9qZWN0LmpzL3Byb2plY3RzOnJlc2l6ZSBIOiBcIiArIHZpZXdIZWlnaHQgKyBcIiBXOiBcIiArIHZpZXdXaWR0aCk7XG5cdFx0fVxuXG4gICAgICAgIC8vIFBvcnRmb2xpbyBNYXNvbmFyeVxuXG5cdH0vL3Byb2plY3RzIHBhZ2VcblxuICAgIC8vQ09OVEFDVCBQQUdFIC1cbiAgICBpZiAoIGpRdWVyeSgnaHRtbCcpLmRhdGEoJ3BhZ2Utc2x1ZycpID09ICdjb250YWN0Jyl7XG5cbiAgICB9Ly9jb250YWN0IHBhZ2Vcbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuLyoganNoaW50IC1XMDk3ICovXG4vKiBqc2hpbnQgLVcxMTcgKi9cblxuLy9TZXR0aW5nc1xudmFyIG1vYmlsZU5hdk9ubHkgXHRcdD0gdHJ1ZTtcbnZhciBwYWdlTG9hZGVyIFx0XHRcdD0gdHJ1ZTtcbnZhciBkZXZUZXN0aW5nIFx0XHRcdD0gZmFsc2U7XG52YXIgbW9iaWxlUG9ydHJhaXQgXHRcdD0gNDE0O1xudmFyIG1vYmlsZUxhbmRzY2FwZSBcdD0gNzY3O1xudmFyIHRhYmxldExhbmRzY2FwZSBcdD0gMTAyNDtcblxuLy9FbGVtZW50c1xudmFyIGh0bWwgXHRcdD0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xudmFyIGJvZHkgXHRcdD0gZG9jdW1lbnQuYm9keTtcbnZhciB3cmFwcGVyIFx0PSBnZXQoJ3dyYXBwZXInKTtcbnZhciBmb290ZXIgICAgICA9IGdldCgnZm9vdGVyJyk7XG52YXIgcGFnZUxvYWRlciAgPSBnZXQoJ3BhZ2VMb2FkZXInKTtcbnZhciBuYXZPcGVuQnRuICA9IGdldCgnbmF2T3BlbkJ0bicpO1xudmFyIG5hdkNsb3NlQnRuID0gZ2V0KCduYXZDbG9zZUJ0bicpO1xuXG52YXIgdmlld1dpZHRoIFx0PSB3aW5kb3cuaW5uZXJXaWR0aDtcbnZhciB2aWV3SGVpZ2h0IFx0PSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG52YXIgdmlld0FzcCBcdD0gKHdpbmRvdy5pbm5lcldpZHRoL3dpbmRvdy5pbm5lckhlaWdodCkudG9GaXhlZCgyKTtcbnZhciBkb2NXaWR0aCBcdD0gaHRtbC5jbGllbnRXaWR0aDtcbnZhciBkb2NIZWlnaHQgXHQ9IFwiXCI7XG52YXIgYnJlYWtQb2ludCAgPSBcIlwiO1xudmFyIGFzcFRleHQgXHQ9IFwiXCI7XG52YXIgZGV2aWNlVHlwZSBcdD0galF1ZXJ5KCdodG1sJykuZGF0YSgnZGV2aWNlLXR5cGUnKTtcblxuZnVuY3Rpb24gdmVsY3JvUmVhZHkoKXtcbiAgICBwYWdlTG9hZGVyLnN0eWxlID0gKFwidmlzaWJpbGl0eTogaGlkZGVuXCIpO1xuICAgIHJlbW92ZUNsYXNzKGh0bWwsIFwibm8tanNcIik7XG4gICAgYWRkQ2xhc3MoaHRtbCwgXCJqcy1yZWFkeVwiKTtcbiAgICB2ZWxjcm9SZXNpemUoKTtcbn1cblxuZnVuY3Rpb24gdmVsY3JvUmVzaXplKCl7XG4gICAgLy9SZXNldCBiYXNlIHZhbHVlc1xuXHRkb2NXaWR0aCBcdD0gaHRtbC5jbGllbnRXaWR0aDtcbiAgICBkb2NIZWlnaHQgXHQ9IGdldERvY0hlaWdodCgpO1xuXHR2aWV3V2lkdGggXHQ9IHdpbmRvdy5pbm5lcldpZHRoO1xuXHR2aWV3SGVpZ2h0IFx0PSB3aW5kb3cuaW5uZXJIZWlnaHQ7IC8vY29uc29sZS5sb2codmlld0hlaWdodCk7XG5cdHZpZXdBc3BcdFx0PSAoIHZpZXdXaWR0aCAvIHZpZXdIZWlnaHQgKS50b0ZpeGVkKDIpO1xuICAgIGJyZWFrUG9pbnQgXHQ9IGdldEJyZWFrcG9pbnQobW9iaWxlTGFuZHNjYXBlLCB0YWJsZXRMYW5kc2NhcGUpO1xuXHRhc3BUZXh0IFx0PSBnZXRPcmllbnRhdGlvbkNsYXNzKCk7XG5cbiAgICAvL0NoZWNrIGlmIHRoZSBtZW51IGNsYXNzIHNob3VsZCBjaGFuZ2VcbiAgICBuYXZDbGFzc2VzKCk7XG5cbiAgICAvL1NldCBtaW4taGVpZ2h0IHRvIHRoZSB2aWV3cG9ydFNpemUgb24gc3RydWN0dXJhbCBlbGVtZW50c1xuICAgIG1pbkhlaWdodCh3cmFwcGVyLCB2aWV3SGVpZ2h0KTtcbiAgICB2YXIgd3JhcEhlaWdodCA9IGpRdWVyeSgnI3dyYXBwZXInKS5oZWlnaHQoKTtcbiAgICBtaW5IZWlnaHQoaHRtbCwgd3JhcEhlaWdodCk7XG4gICAgbWluSGVpZ2h0KGJvZHksIHdyYXBIZWlnaHQpO1xuXG4gICAgLy9WZXJ0aWNhbCBBbGlnbiBIYWNrXG4gICAgdmFyIHZBbGlnbkhlaWdodCA9IDA7XG4gICAgalF1ZXJ5KCcudkFsaWduV3JhcCcpLmhlaWdodCgnYXV0bycpO1xuICAgIGpRdWVyeSgnaDIudkFsaWduTWlkZGxlJykuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKGpRdWVyeSh0aGlzKS5oZWlnaHQoKSA+IHZBbGlnbkhlaWdodCkge1xuICAgICAgICAgICAgdkFsaWduSGVpZ2h0ID0galF1ZXJ5KHRoaXMpLmhlaWdodCgpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgalF1ZXJ5KCcudkFsaWduV3JhcCcpLmhlaWdodCh2QWxpZ25IZWlnaHQpO1xuXG4gICAgLy9TZXQgaGVpZ2h0IG9mIG1vYmlsZSBtZW51XG4gICAgLy9tZW51SGVpZ2h0KGRvY0hlaWdodCk7XG5cbiAgICAvL0FkanVzdCBmb290ZXIgcG9zc2l0aW9uIG9uIG1pc21hdGNoZWQgc2NyZWVuIC8gZG9jdW1lbnQgc2l6ZXNcbiAgICBmaXhUb0JvdHRvbShmb290ZXIpO1xuXG4gICAgLy9JZiBkZXZUZXN0aW5nIFRSVUUgaW5pdCB0ZXN0UGFuZWxcbiAgICBpZiAoZGV2VGVzdGluZyA9PT0gdHJ1ZSl7XG5cdFx0dGVzdFBhbmVsKCk7XG5cdH1cblxuXHQvL0xvZyBjdXJyZW50IGRldmljZSBpbmZvXG5cdGNvbnNvbGUubG9nKCd2ZWxjcm8uanMvdmVsY3JvUmVzaXplIGRIOicgKyBkb2NIZWlnaHQgKyAnIC0gdkg6JyArIHZpZXdIZWlnaHQgKyAgJyB4IHZXOicgKyB2aWV3V2lkdGggKyAnIEFzcDonICsgdmlld0FzcCArICcgJyArIGFzcFRleHQgKyAnIC0gJyArIGRldmljZVR5cGUgKyAnIGFrYSAnICsgYnJlYWtQb2ludCk7XG5cbn0vLyB2ZWxjcm9SZXNpemVcblxuLy9GSVg6IG1ha2UgaXQgd29ya1xuLy9hbHNvIGFkanVzdCBvbiBcImRvY3VtZW50XCIgcmVzaXplIC0gYXMgZHluYW1pYyBjb250ZW50IGNoYW5nZXNcbmZ1bmN0aW9uIGNoZWNrRG9jSGVpZ2h0KCl7XG4gICAgdmFyIGJvZHlNaW5IID0gdG9JbnQoalF1ZXJ5KCdib2R5JykuY3NzKCdtaW4taGVpZ2h0JykpO1xuICAgIHZhciB3cmFwSGVpZ2h0ID0galF1ZXJ5KCcjd3JhcHBlcicpLmhlaWdodCgpO1xuICAgIGlmIChib2R5TWluSCAhPT0gd3JhcEhlaWdodCl7XG4gICAgICAgIGNvbnNvbGUubG9nKCdkb2N1bWVudCBoZWlnaHQgY2hhbmdlZC4gQm9keSBtaW4taCcgKyBib2R5TWluSCk7XG4gICAgICAgIG1pbkhlaWdodChodG1sLCB3cmFwSGVpZ2h0KTtcbiAgICAgICAgbWluSGVpZ2h0KGJvZHksIHdyYXBIZWlnaHQpO1xuICAgICAgICAvL2ZpeFRvQm90dG9tKGZvb3Rlcik7XG4gICAgfVxuICAgIHNldFRpbWVvdXQoY2hlY2tEb2NIZWlnaHQsIDIwMCk7XG59XG4vL0ZJWDogcmVpbnRlZ3JhdGUgJ2RlYm91bmNlIHN0eWxlJyBwcm9taXNlc1xuXG4vL1Njcm9sbCBNZW51XG5qUXVlcnkod2luZG93KS5zY3JvbGwoZnVuY3Rpb24oKSB7XG4gICAgdmFyIHNjcm9sbE1lbnVPZmZzZXQgPSBqUXVlcnkoJyNoZWFkZXInKS5oZWlnaHQoKSArIDI1O1xuICAgIHZhciBzY3JvbGxNZW51VGltZXI7XG5cblx0aWYoc2Nyb2xsTWVudVRpbWVyKSB7XG5cdFx0d2luZG93LmNsZWFyVGltZW91dChzY3JvbGxNZW51VGltZXIpO1xuXHR9XG5cdHNjcm9sbE1lbnVUaW1lciA9IHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoalF1ZXJ5KHRoaXMpLnNjcm9sbFRvcCgpID4gc2Nyb2xsTWVudU9mZnNldCkge1xuICAgICAgICAgICAgalF1ZXJ5KGh0bWwpLmFkZENsYXNzKCdzY3JvbGxNZW51Jyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBqUXVlcnkoaHRtbCkucmVtb3ZlQ2xhc3MoJ3Njcm9sbE1lbnUnKTtcblxuICAgICAgICB9XG4gICAgfSwgMTAwKTtcbn0pO1xuLy9FdmVudCBMaXN0ZW5lcnNcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGZ1bmN0aW9uKCkge1xuICAgIHZlbGNyb1JlYWR5KCk7XG5cbiAgICAvL0ZJWDogdmFuaWxsYVxuICAgIGpRdWVyeSgnI25hdk9wZW5CdG4sICNuYXZPcGVuQnRuU3RpY2t5JykuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgIGFkZE1lbnVPcGVuQ2xhc3MoKTtcbiAgICB9KTtcbiAgICBqUXVlcnkoJyNuYXZDbG9zZUJ0bicpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICByZW1vdmVNZW51T3BlbkNsYXNzKCk7XG4gICAgfSk7XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZlbGNyb1Jlc2l6ZSgpO1xuICAgIH0pO1xuXG59KTtcblxuLy9Nb3VzZSBFdmVudHNcbnZhciBtb3VzZURvd24gPSBmYWxzZTtcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIGZ1bmN0aW9uKCkge1xuICAgIG1vdXNlRG93biA9IHRydWU7XG59KTtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIGZ1bmN0aW9uKCkge1xuICAgIG1vdXNlRG93biA9IGZhbHNlO1xufSk7XG4iLCIvKiFcbiAqIElzb3RvcGUgUEFDS0FHRUQgdjMuMC4xXG4gKlxuICogTGljZW5zZWQgR1BMdjMgZm9yIG9wZW4gc291cmNlIHVzZVxuICogb3IgSXNvdG9wZSBDb21tZXJjaWFsIExpY2Vuc2UgZm9yIGNvbW1lcmNpYWwgdXNlXG4gKlxuICogaHR0cDovL2lzb3RvcGUubWV0YWZpenp5LmNvXG4gKiBDb3B5cmlnaHQgMjAxNiBNZXRhZml6enlcbiAqL1xuXG4hZnVuY3Rpb24odCxlKXtcInVzZSBzdHJpY3RcIjtcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQ/ZGVmaW5lKFwianF1ZXJ5LWJyaWRnZXQvanF1ZXJ5LWJyaWRnZXRcIixbXCJqcXVlcnlcIl0sZnVuY3Rpb24oaSl7ZSh0LGkpfSk6XCJvYmplY3RcIj09dHlwZW9mIG1vZHVsZSYmbW9kdWxlLmV4cG9ydHM/bW9kdWxlLmV4cG9ydHM9ZSh0LHJlcXVpcmUoXCJqcXVlcnlcIikpOnQualF1ZXJ5QnJpZGdldD1lKHQsdC5qUXVlcnkpfSh3aW5kb3csZnVuY3Rpb24odCxlKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBpKGkscyxhKXtmdW5jdGlvbiB1KHQsZSxuKXt2YXIgbyxzPVwiJCgpLlwiK2krJyhcIicrZSsnXCIpJztyZXR1cm4gdC5lYWNoKGZ1bmN0aW9uKHQsdSl7dmFyIGg9YS5kYXRhKHUsaSk7aWYoIWgpcmV0dXJuIHZvaWQgcihpK1wiIG5vdCBpbml0aWFsaXplZC4gQ2Fubm90IGNhbGwgbWV0aG9kcywgaS5lLiBcIitzKTt2YXIgZD1oW2VdO2lmKCFkfHxcIl9cIj09ZS5jaGFyQXQoMCkpcmV0dXJuIHZvaWQgcihzK1wiIGlzIG5vdCBhIHZhbGlkIG1ldGhvZFwiKTt2YXIgbD1kLmFwcGx5KGgsbik7bz12b2lkIDA9PT1vP2w6b30pLHZvaWQgMCE9PW8/bzp0fWZ1bmN0aW9uIGgodCxlKXt0LmVhY2goZnVuY3Rpb24odCxuKXt2YXIgbz1hLmRhdGEobixpKTtvPyhvLm9wdGlvbihlKSxvLl9pbml0KCkpOihvPW5ldyBzKG4sZSksYS5kYXRhKG4saSxvKSl9KX1hPWF8fGV8fHQualF1ZXJ5LGEmJihzLnByb3RvdHlwZS5vcHRpb258fChzLnByb3RvdHlwZS5vcHRpb249ZnVuY3Rpb24odCl7YS5pc1BsYWluT2JqZWN0KHQpJiYodGhpcy5vcHRpb25zPWEuZXh0ZW5kKCEwLHRoaXMub3B0aW9ucyx0KSl9KSxhLmZuW2ldPWZ1bmN0aW9uKHQpe2lmKFwic3RyaW5nXCI9PXR5cGVvZiB0KXt2YXIgZT1vLmNhbGwoYXJndW1lbnRzLDEpO3JldHVybiB1KHRoaXMsdCxlKX1yZXR1cm4gaCh0aGlzLHQpLHRoaXN9LG4oYSkpfWZ1bmN0aW9uIG4odCl7IXR8fHQmJnQuYnJpZGdldHx8KHQuYnJpZGdldD1pKX12YXIgbz1BcnJheS5wcm90b3R5cGUuc2xpY2Uscz10LmNvbnNvbGUscj1cInVuZGVmaW5lZFwiPT10eXBlb2Ygcz9mdW5jdGlvbigpe306ZnVuY3Rpb24odCl7cy5lcnJvcih0KX07cmV0dXJuIG4oZXx8dC5qUXVlcnkpLGl9KSxmdW5jdGlvbih0LGUpe1wiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZD9kZWZpbmUoXCJldi1lbWl0dGVyL2V2LWVtaXR0ZXJcIixlKTpcIm9iamVjdFwiPT10eXBlb2YgbW9kdWxlJiZtb2R1bGUuZXhwb3J0cz9tb2R1bGUuZXhwb3J0cz1lKCk6dC5FdkVtaXR0ZXI9ZSgpfShcInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93P3dpbmRvdzp0aGlzLGZ1bmN0aW9uKCl7ZnVuY3Rpb24gdCgpe312YXIgZT10LnByb3RvdHlwZTtyZXR1cm4gZS5vbj1mdW5jdGlvbih0LGUpe2lmKHQmJmUpe3ZhciBpPXRoaXMuX2V2ZW50cz10aGlzLl9ldmVudHN8fHt9LG49aVt0XT1pW3RdfHxbXTtyZXR1cm4tMT09bi5pbmRleE9mKGUpJiZuLnB1c2goZSksdGhpc319LGUub25jZT1mdW5jdGlvbih0LGUpe2lmKHQmJmUpe3RoaXMub24odCxlKTt2YXIgaT10aGlzLl9vbmNlRXZlbnRzPXRoaXMuX29uY2VFdmVudHN8fHt9LG49aVt0XT1pW3RdfHx7fTtyZXR1cm4gbltlXT0hMCx0aGlzfX0sZS5vZmY9ZnVuY3Rpb24odCxlKXt2YXIgaT10aGlzLl9ldmVudHMmJnRoaXMuX2V2ZW50c1t0XTtpZihpJiZpLmxlbmd0aCl7dmFyIG49aS5pbmRleE9mKGUpO3JldHVybi0xIT1uJiZpLnNwbGljZShuLDEpLHRoaXN9fSxlLmVtaXRFdmVudD1mdW5jdGlvbih0LGUpe3ZhciBpPXRoaXMuX2V2ZW50cyYmdGhpcy5fZXZlbnRzW3RdO2lmKGkmJmkubGVuZ3RoKXt2YXIgbj0wLG89aVtuXTtlPWV8fFtdO2Zvcih2YXIgcz10aGlzLl9vbmNlRXZlbnRzJiZ0aGlzLl9vbmNlRXZlbnRzW3RdO287KXt2YXIgcj1zJiZzW29dO3ImJih0aGlzLm9mZih0LG8pLGRlbGV0ZSBzW29dKSxvLmFwcGx5KHRoaXMsZSksbis9cj8wOjEsbz1pW25dfXJldHVybiB0aGlzfX0sdH0pLGZ1bmN0aW9uKHQsZSl7XCJ1c2Ugc3RyaWN0XCI7XCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kP2RlZmluZShcImdldC1zaXplL2dldC1zaXplXCIsW10sZnVuY3Rpb24oKXtyZXR1cm4gZSgpfSk6XCJvYmplY3RcIj09dHlwZW9mIG1vZHVsZSYmbW9kdWxlLmV4cG9ydHM/bW9kdWxlLmV4cG9ydHM9ZSgpOnQuZ2V0U2l6ZT1lKCl9KHdpbmRvdyxmdW5jdGlvbigpe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIHQodCl7dmFyIGU9cGFyc2VGbG9hdCh0KSxpPS0xPT10LmluZGV4T2YoXCIlXCIpJiYhaXNOYU4oZSk7cmV0dXJuIGkmJmV9ZnVuY3Rpb24gZSgpe31mdW5jdGlvbiBpKCl7Zm9yKHZhciB0PXt3aWR0aDowLGhlaWdodDowLGlubmVyV2lkdGg6MCxpbm5lckhlaWdodDowLG91dGVyV2lkdGg6MCxvdXRlckhlaWdodDowfSxlPTA7aD5lO2UrKyl7dmFyIGk9dVtlXTt0W2ldPTB9cmV0dXJuIHR9ZnVuY3Rpb24gbih0KXt2YXIgZT1nZXRDb21wdXRlZFN0eWxlKHQpO3JldHVybiBlfHxhKFwiU3R5bGUgcmV0dXJuZWQgXCIrZStcIi4gQXJlIHlvdSBydW5uaW5nIHRoaXMgY29kZSBpbiBhIGhpZGRlbiBpZnJhbWUgb24gRmlyZWZveD8gU2VlIGh0dHA6Ly9iaXQubHkvZ2V0c2l6ZWJ1ZzFcIiksZX1mdW5jdGlvbiBvKCl7aWYoIWQpe2Q9ITA7dmFyIGU9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtlLnN0eWxlLndpZHRoPVwiMjAwcHhcIixlLnN0eWxlLnBhZGRpbmc9XCIxcHggMnB4IDNweCA0cHhcIixlLnN0eWxlLmJvcmRlclN0eWxlPVwic29saWRcIixlLnN0eWxlLmJvcmRlcldpZHRoPVwiMXB4IDJweCAzcHggNHB4XCIsZS5zdHlsZS5ib3hTaXppbmc9XCJib3JkZXItYm94XCI7dmFyIGk9ZG9jdW1lbnQuYm9keXx8ZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O2kuYXBwZW5kQ2hpbGQoZSk7dmFyIG89bihlKTtzLmlzQm94U2l6ZU91dGVyPXI9MjAwPT10KG8ud2lkdGgpLGkucmVtb3ZlQ2hpbGQoZSl9fWZ1bmN0aW9uIHMoZSl7aWYobygpLFwic3RyaW5nXCI9PXR5cGVvZiBlJiYoZT1kb2N1bWVudC5xdWVyeVNlbGVjdG9yKGUpKSxlJiZcIm9iamVjdFwiPT10eXBlb2YgZSYmZS5ub2RlVHlwZSl7dmFyIHM9bihlKTtpZihcIm5vbmVcIj09cy5kaXNwbGF5KXJldHVybiBpKCk7dmFyIGE9e307YS53aWR0aD1lLm9mZnNldFdpZHRoLGEuaGVpZ2h0PWUub2Zmc2V0SGVpZ2h0O2Zvcih2YXIgZD1hLmlzQm9yZGVyQm94PVwiYm9yZGVyLWJveFwiPT1zLmJveFNpemluZyxsPTA7aD5sO2wrKyl7dmFyIGY9dVtsXSxjPXNbZl0sbT1wYXJzZUZsb2F0KGMpO2FbZl09aXNOYU4obSk/MDptfXZhciBwPWEucGFkZGluZ0xlZnQrYS5wYWRkaW5nUmlnaHQseT1hLnBhZGRpbmdUb3ArYS5wYWRkaW5nQm90dG9tLGc9YS5tYXJnaW5MZWZ0K2EubWFyZ2luUmlnaHQsdj1hLm1hcmdpblRvcCthLm1hcmdpbkJvdHRvbSxfPWEuYm9yZGVyTGVmdFdpZHRoK2EuYm9yZGVyUmlnaHRXaWR0aCxJPWEuYm9yZGVyVG9wV2lkdGgrYS5ib3JkZXJCb3R0b21XaWR0aCx6PWQmJnIseD10KHMud2lkdGgpO3ghPT0hMSYmKGEud2lkdGg9eCsoej8wOnArXykpO3ZhciBTPXQocy5oZWlnaHQpO3JldHVybiBTIT09ITEmJihhLmhlaWdodD1TKyh6PzA6eStJKSksYS5pbm5lcldpZHRoPWEud2lkdGgtKHArXyksYS5pbm5lckhlaWdodD1hLmhlaWdodC0oeStJKSxhLm91dGVyV2lkdGg9YS53aWR0aCtnLGEub3V0ZXJIZWlnaHQ9YS5oZWlnaHQrdixhfX12YXIgcixhPVwidW5kZWZpbmVkXCI9PXR5cGVvZiBjb25zb2xlP2U6ZnVuY3Rpb24odCl7Y29uc29sZS5lcnJvcih0KX0sdT1bXCJwYWRkaW5nTGVmdFwiLFwicGFkZGluZ1JpZ2h0XCIsXCJwYWRkaW5nVG9wXCIsXCJwYWRkaW5nQm90dG9tXCIsXCJtYXJnaW5MZWZ0XCIsXCJtYXJnaW5SaWdodFwiLFwibWFyZ2luVG9wXCIsXCJtYXJnaW5Cb3R0b21cIixcImJvcmRlckxlZnRXaWR0aFwiLFwiYm9yZGVyUmlnaHRXaWR0aFwiLFwiYm9yZGVyVG9wV2lkdGhcIixcImJvcmRlckJvdHRvbVdpZHRoXCJdLGg9dS5sZW5ndGgsZD0hMTtyZXR1cm4gc30pLGZ1bmN0aW9uKHQsZSl7XCJ1c2Ugc3RyaWN0XCI7XCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kP2RlZmluZShcImRlc2FuZHJvLW1hdGNoZXMtc2VsZWN0b3IvbWF0Y2hlcy1zZWxlY3RvclwiLGUpOlwib2JqZWN0XCI9PXR5cGVvZiBtb2R1bGUmJm1vZHVsZS5leHBvcnRzP21vZHVsZS5leHBvcnRzPWUoKTp0Lm1hdGNoZXNTZWxlY3Rvcj1lKCl9KHdpbmRvdyxmdW5jdGlvbigpe1widXNlIHN0cmljdFwiO3ZhciB0PWZ1bmN0aW9uKCl7dmFyIHQ9RWxlbWVudC5wcm90b3R5cGU7aWYodC5tYXRjaGVzKXJldHVyblwibWF0Y2hlc1wiO2lmKHQubWF0Y2hlc1NlbGVjdG9yKXJldHVyblwibWF0Y2hlc1NlbGVjdG9yXCI7Zm9yKHZhciBlPVtcIndlYmtpdFwiLFwibW96XCIsXCJtc1wiLFwib1wiXSxpPTA7aTxlLmxlbmd0aDtpKyspe3ZhciBuPWVbaV0sbz1uK1wiTWF0Y2hlc1NlbGVjdG9yXCI7aWYodFtvXSlyZXR1cm4gb319KCk7cmV0dXJuIGZ1bmN0aW9uKGUsaSl7cmV0dXJuIGVbdF0oaSl9fSksZnVuY3Rpb24odCxlKXtcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQ/ZGVmaW5lKFwiZml6enktdWktdXRpbHMvdXRpbHNcIixbXCJkZXNhbmRyby1tYXRjaGVzLXNlbGVjdG9yL21hdGNoZXMtc2VsZWN0b3JcIl0sZnVuY3Rpb24oaSl7cmV0dXJuIGUodCxpKX0pOlwib2JqZWN0XCI9PXR5cGVvZiBtb2R1bGUmJm1vZHVsZS5leHBvcnRzP21vZHVsZS5leHBvcnRzPWUodCxyZXF1aXJlKFwiZGVzYW5kcm8tbWF0Y2hlcy1zZWxlY3RvclwiKSk6dC5maXp6eVVJVXRpbHM9ZSh0LHQubWF0Y2hlc1NlbGVjdG9yKX0od2luZG93LGZ1bmN0aW9uKHQsZSl7dmFyIGk9e307aS5leHRlbmQ9ZnVuY3Rpb24odCxlKXtmb3IodmFyIGkgaW4gZSl0W2ldPWVbaV07cmV0dXJuIHR9LGkubW9kdWxvPWZ1bmN0aW9uKHQsZSl7cmV0dXJuKHQlZStlKSVlfSxpLm1ha2VBcnJheT1mdW5jdGlvbih0KXt2YXIgZT1bXTtpZihBcnJheS5pc0FycmF5KHQpKWU9dDtlbHNlIGlmKHQmJlwibnVtYmVyXCI9PXR5cGVvZiB0Lmxlbmd0aClmb3IodmFyIGk9MDtpPHQubGVuZ3RoO2krKyllLnB1c2godFtpXSk7ZWxzZSBlLnB1c2godCk7cmV0dXJuIGV9LGkucmVtb3ZlRnJvbT1mdW5jdGlvbih0LGUpe3ZhciBpPXQuaW5kZXhPZihlKTstMSE9aSYmdC5zcGxpY2UoaSwxKX0saS5nZXRQYXJlbnQ9ZnVuY3Rpb24odCxpKXtmb3IoO3QhPWRvY3VtZW50LmJvZHk7KWlmKHQ9dC5wYXJlbnROb2RlLGUodCxpKSlyZXR1cm4gdH0saS5nZXRRdWVyeUVsZW1lbnQ9ZnVuY3Rpb24odCl7cmV0dXJuXCJzdHJpbmdcIj09dHlwZW9mIHQ/ZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0KTp0fSxpLmhhbmRsZUV2ZW50PWZ1bmN0aW9uKHQpe3ZhciBlPVwib25cIit0LnR5cGU7dGhpc1tlXSYmdGhpc1tlXSh0KX0saS5maWx0ZXJGaW5kRWxlbWVudHM9ZnVuY3Rpb24odCxuKXt0PWkubWFrZUFycmF5KHQpO3ZhciBvPVtdO3JldHVybiB0LmZvckVhY2goZnVuY3Rpb24odCl7aWYodCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KXtpZighbilyZXR1cm4gdm9pZCBvLnB1c2godCk7ZSh0LG4pJiZvLnB1c2godCk7Zm9yKHZhciBpPXQucXVlcnlTZWxlY3RvckFsbChuKSxzPTA7czxpLmxlbmd0aDtzKyspby5wdXNoKGlbc10pfX0pLG99LGkuZGVib3VuY2VNZXRob2Q9ZnVuY3Rpb24odCxlLGkpe3ZhciBuPXQucHJvdG90eXBlW2VdLG89ZStcIlRpbWVvdXRcIjt0LnByb3RvdHlwZVtlXT1mdW5jdGlvbigpe3ZhciB0PXRoaXNbb107dCYmY2xlYXJUaW1lb3V0KHQpO3ZhciBlPWFyZ3VtZW50cyxzPXRoaXM7dGhpc1tvXT1zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7bi5hcHBseShzLGUpLGRlbGV0ZSBzW29dfSxpfHwxMDApfX0saS5kb2NSZWFkeT1mdW5jdGlvbih0KXt2YXIgZT1kb2N1bWVudC5yZWFkeVN0YXRlO1wiY29tcGxldGVcIj09ZXx8XCJpbnRlcmFjdGl2ZVwiPT1lP3QoKTpkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLHQpfSxpLnRvRGFzaGVkPWZ1bmN0aW9uKHQpe3JldHVybiB0LnJlcGxhY2UoLyguKShbQS1aXSkvZyxmdW5jdGlvbih0LGUsaSl7cmV0dXJuIGUrXCItXCIraX0pLnRvTG93ZXJDYXNlKCl9O3ZhciBuPXQuY29uc29sZTtyZXR1cm4gaS5odG1sSW5pdD1mdW5jdGlvbihlLG8pe2kuZG9jUmVhZHkoZnVuY3Rpb24oKXt2YXIgcz1pLnRvRGFzaGVkKG8pLHI9XCJkYXRhLVwiK3MsYT1kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiW1wiK3IrXCJdXCIpLHU9ZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5qcy1cIitzKSxoPWkubWFrZUFycmF5KGEpLmNvbmNhdChpLm1ha2VBcnJheSh1KSksZD1yK1wiLW9wdGlvbnNcIixsPXQualF1ZXJ5O2guZm9yRWFjaChmdW5jdGlvbih0KXt2YXIgaSxzPXQuZ2V0QXR0cmlidXRlKHIpfHx0LmdldEF0dHJpYnV0ZShkKTt0cnl7aT1zJiZKU09OLnBhcnNlKHMpfWNhdGNoKGEpe3JldHVybiB2b2lkKG4mJm4uZXJyb3IoXCJFcnJvciBwYXJzaW5nIFwiK3IrXCIgb24gXCIrdC5jbGFzc05hbWUrXCI6IFwiK2EpKX12YXIgdT1uZXcgZSh0LGkpO2wmJmwuZGF0YSh0LG8sdSl9KX0pfSxpfSksZnVuY3Rpb24odCxlKXtcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQ/ZGVmaW5lKFwib3V0bGF5ZXIvaXRlbVwiLFtcImV2LWVtaXR0ZXIvZXYtZW1pdHRlclwiLFwiZ2V0LXNpemUvZ2V0LXNpemVcIl0sZSk6XCJvYmplY3RcIj09dHlwZW9mIG1vZHVsZSYmbW9kdWxlLmV4cG9ydHM/bW9kdWxlLmV4cG9ydHM9ZShyZXF1aXJlKFwiZXYtZW1pdHRlclwiKSxyZXF1aXJlKFwiZ2V0LXNpemVcIikpOih0Lk91dGxheWVyPXt9LHQuT3V0bGF5ZXIuSXRlbT1lKHQuRXZFbWl0dGVyLHQuZ2V0U2l6ZSkpfSh3aW5kb3csZnVuY3Rpb24odCxlKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBpKHQpe2Zvcih2YXIgZSBpbiB0KXJldHVybiExO3JldHVybiBlPW51bGwsITB9ZnVuY3Rpb24gbih0LGUpe3QmJih0aGlzLmVsZW1lbnQ9dCx0aGlzLmxheW91dD1lLHRoaXMucG9zaXRpb249e3g6MCx5OjB9LHRoaXMuX2NyZWF0ZSgpKX1mdW5jdGlvbiBvKHQpe3JldHVybiB0LnJlcGxhY2UoLyhbQS1aXSkvZyxmdW5jdGlvbih0KXtyZXR1cm5cIi1cIit0LnRvTG93ZXJDYXNlKCl9KX12YXIgcz1kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUscj1cInN0cmluZ1wiPT10eXBlb2Ygcy50cmFuc2l0aW9uP1widHJhbnNpdGlvblwiOlwiV2Via2l0VHJhbnNpdGlvblwiLGE9XCJzdHJpbmdcIj09dHlwZW9mIHMudHJhbnNmb3JtP1widHJhbnNmb3JtXCI6XCJXZWJraXRUcmFuc2Zvcm1cIix1PXtXZWJraXRUcmFuc2l0aW9uOlwid2Via2l0VHJhbnNpdGlvbkVuZFwiLHRyYW5zaXRpb246XCJ0cmFuc2l0aW9uZW5kXCJ9W3JdLGg9e3RyYW5zZm9ybTphLHRyYW5zaXRpb246cix0cmFuc2l0aW9uRHVyYXRpb246citcIkR1cmF0aW9uXCIsdHJhbnNpdGlvblByb3BlcnR5OnIrXCJQcm9wZXJ0eVwiLHRyYW5zaXRpb25EZWxheTpyK1wiRGVsYXlcIn0sZD1uLnByb3RvdHlwZT1PYmplY3QuY3JlYXRlKHQucHJvdG90eXBlKTtkLmNvbnN0cnVjdG9yPW4sZC5fY3JlYXRlPWZ1bmN0aW9uKCl7dGhpcy5fdHJhbnNuPXtpbmdQcm9wZXJ0aWVzOnt9LGNsZWFuOnt9LG9uRW5kOnt9fSx0aGlzLmNzcyh7cG9zaXRpb246XCJhYnNvbHV0ZVwifSl9LGQuaGFuZGxlRXZlbnQ9ZnVuY3Rpb24odCl7dmFyIGU9XCJvblwiK3QudHlwZTt0aGlzW2VdJiZ0aGlzW2VdKHQpfSxkLmdldFNpemU9ZnVuY3Rpb24oKXt0aGlzLnNpemU9ZSh0aGlzLmVsZW1lbnQpfSxkLmNzcz1mdW5jdGlvbih0KXt2YXIgZT10aGlzLmVsZW1lbnQuc3R5bGU7Zm9yKHZhciBpIGluIHQpe3ZhciBuPWhbaV18fGk7ZVtuXT10W2ldfX0sZC5nZXRQb3NpdGlvbj1mdW5jdGlvbigpe3ZhciB0PWdldENvbXB1dGVkU3R5bGUodGhpcy5lbGVtZW50KSxlPXRoaXMubGF5b3V0Ll9nZXRPcHRpb24oXCJvcmlnaW5MZWZ0XCIpLGk9dGhpcy5sYXlvdXQuX2dldE9wdGlvbihcIm9yaWdpblRvcFwiKSxuPXRbZT9cImxlZnRcIjpcInJpZ2h0XCJdLG89dFtpP1widG9wXCI6XCJib3R0b21cIl0scz10aGlzLmxheW91dC5zaXplLHI9LTEhPW4uaW5kZXhPZihcIiVcIik/cGFyc2VGbG9hdChuKS8xMDAqcy53aWR0aDpwYXJzZUludChuLDEwKSxhPS0xIT1vLmluZGV4T2YoXCIlXCIpP3BhcnNlRmxvYXQobykvMTAwKnMuaGVpZ2h0OnBhcnNlSW50KG8sMTApO3I9aXNOYU4ocik/MDpyLGE9aXNOYU4oYSk/MDphLHItPWU/cy5wYWRkaW5nTGVmdDpzLnBhZGRpbmdSaWdodCxhLT1pP3MucGFkZGluZ1RvcDpzLnBhZGRpbmdCb3R0b20sdGhpcy5wb3NpdGlvbi54PXIsdGhpcy5wb3NpdGlvbi55PWF9LGQubGF5b3V0UG9zaXRpb249ZnVuY3Rpb24oKXt2YXIgdD10aGlzLmxheW91dC5zaXplLGU9e30saT10aGlzLmxheW91dC5fZ2V0T3B0aW9uKFwib3JpZ2luTGVmdFwiKSxuPXRoaXMubGF5b3V0Ll9nZXRPcHRpb24oXCJvcmlnaW5Ub3BcIiksbz1pP1wicGFkZGluZ0xlZnRcIjpcInBhZGRpbmdSaWdodFwiLHM9aT9cImxlZnRcIjpcInJpZ2h0XCIscj1pP1wicmlnaHRcIjpcImxlZnRcIixhPXRoaXMucG9zaXRpb24ueCt0W29dO2Vbc109dGhpcy5nZXRYVmFsdWUoYSksZVtyXT1cIlwiO3ZhciB1PW4/XCJwYWRkaW5nVG9wXCI6XCJwYWRkaW5nQm90dG9tXCIsaD1uP1widG9wXCI6XCJib3R0b21cIixkPW4/XCJib3R0b21cIjpcInRvcFwiLGw9dGhpcy5wb3NpdGlvbi55K3RbdV07ZVtoXT10aGlzLmdldFlWYWx1ZShsKSxlW2RdPVwiXCIsdGhpcy5jc3MoZSksdGhpcy5lbWl0RXZlbnQoXCJsYXlvdXRcIixbdGhpc10pfSxkLmdldFhWYWx1ZT1mdW5jdGlvbih0KXt2YXIgZT10aGlzLmxheW91dC5fZ2V0T3B0aW9uKFwiaG9yaXpvbnRhbFwiKTtyZXR1cm4gdGhpcy5sYXlvdXQub3B0aW9ucy5wZXJjZW50UG9zaXRpb24mJiFlP3QvdGhpcy5sYXlvdXQuc2l6ZS53aWR0aCoxMDArXCIlXCI6dCtcInB4XCJ9LGQuZ2V0WVZhbHVlPWZ1bmN0aW9uKHQpe3ZhciBlPXRoaXMubGF5b3V0Ll9nZXRPcHRpb24oXCJob3Jpem9udGFsXCIpO3JldHVybiB0aGlzLmxheW91dC5vcHRpb25zLnBlcmNlbnRQb3NpdGlvbiYmZT90L3RoaXMubGF5b3V0LnNpemUuaGVpZ2h0KjEwMCtcIiVcIjp0K1wicHhcIn0sZC5fdHJhbnNpdGlvblRvPWZ1bmN0aW9uKHQsZSl7dGhpcy5nZXRQb3NpdGlvbigpO3ZhciBpPXRoaXMucG9zaXRpb24ueCxuPXRoaXMucG9zaXRpb24ueSxvPXBhcnNlSW50KHQsMTApLHM9cGFyc2VJbnQoZSwxMCkscj1vPT09dGhpcy5wb3NpdGlvbi54JiZzPT09dGhpcy5wb3NpdGlvbi55O2lmKHRoaXMuc2V0UG9zaXRpb24odCxlKSxyJiYhdGhpcy5pc1RyYW5zaXRpb25pbmcpcmV0dXJuIHZvaWQgdGhpcy5sYXlvdXRQb3NpdGlvbigpO3ZhciBhPXQtaSx1PWUtbixoPXt9O2gudHJhbnNmb3JtPXRoaXMuZ2V0VHJhbnNsYXRlKGEsdSksdGhpcy50cmFuc2l0aW9uKHt0bzpoLG9uVHJhbnNpdGlvbkVuZDp7dHJhbnNmb3JtOnRoaXMubGF5b3V0UG9zaXRpb259LGlzQ2xlYW5pbmc6ITB9KX0sZC5nZXRUcmFuc2xhdGU9ZnVuY3Rpb24odCxlKXt2YXIgaT10aGlzLmxheW91dC5fZ2V0T3B0aW9uKFwib3JpZ2luTGVmdFwiKSxuPXRoaXMubGF5b3V0Ll9nZXRPcHRpb24oXCJvcmlnaW5Ub3BcIik7cmV0dXJuIHQ9aT90Oi10LGU9bj9lOi1lLFwidHJhbnNsYXRlM2QoXCIrdCtcInB4LCBcIitlK1wicHgsIDApXCJ9LGQuZ29Ubz1mdW5jdGlvbih0LGUpe3RoaXMuc2V0UG9zaXRpb24odCxlKSx0aGlzLmxheW91dFBvc2l0aW9uKCl9LGQubW92ZVRvPWQuX3RyYW5zaXRpb25UbyxkLnNldFBvc2l0aW9uPWZ1bmN0aW9uKHQsZSl7dGhpcy5wb3NpdGlvbi54PXBhcnNlSW50KHQsMTApLHRoaXMucG9zaXRpb24ueT1wYXJzZUludChlLDEwKX0sZC5fbm9uVHJhbnNpdGlvbj1mdW5jdGlvbih0KXt0aGlzLmNzcyh0LnRvKSx0LmlzQ2xlYW5pbmcmJnRoaXMuX3JlbW92ZVN0eWxlcyh0LnRvKTtmb3IodmFyIGUgaW4gdC5vblRyYW5zaXRpb25FbmQpdC5vblRyYW5zaXRpb25FbmRbZV0uY2FsbCh0aGlzKX0sZC50cmFuc2l0aW9uPWZ1bmN0aW9uKHQpe2lmKCFwYXJzZUZsb2F0KHRoaXMubGF5b3V0Lm9wdGlvbnMudHJhbnNpdGlvbkR1cmF0aW9uKSlyZXR1cm4gdm9pZCB0aGlzLl9ub25UcmFuc2l0aW9uKHQpO3ZhciBlPXRoaXMuX3RyYW5zbjtmb3IodmFyIGkgaW4gdC5vblRyYW5zaXRpb25FbmQpZS5vbkVuZFtpXT10Lm9uVHJhbnNpdGlvbkVuZFtpXTtmb3IoaSBpbiB0LnRvKWUuaW5nUHJvcGVydGllc1tpXT0hMCx0LmlzQ2xlYW5pbmcmJihlLmNsZWFuW2ldPSEwKTtpZih0LmZyb20pe3RoaXMuY3NzKHQuZnJvbSk7dmFyIG49dGhpcy5lbGVtZW50Lm9mZnNldEhlaWdodDtuPW51bGx9dGhpcy5lbmFibGVUcmFuc2l0aW9uKHQudG8pLHRoaXMuY3NzKHQudG8pLHRoaXMuaXNUcmFuc2l0aW9uaW5nPSEwfTt2YXIgbD1cIm9wYWNpdHksXCIrbyhhKTtkLmVuYWJsZVRyYW5zaXRpb249ZnVuY3Rpb24oKXtpZighdGhpcy5pc1RyYW5zaXRpb25pbmcpe3ZhciB0PXRoaXMubGF5b3V0Lm9wdGlvbnMudHJhbnNpdGlvbkR1cmF0aW9uO3Q9XCJudW1iZXJcIj09dHlwZW9mIHQ/dCtcIm1zXCI6dCx0aGlzLmNzcyh7dHJhbnNpdGlvblByb3BlcnR5OmwsdHJhbnNpdGlvbkR1cmF0aW9uOnQsdHJhbnNpdGlvbkRlbGF5OnRoaXMuc3RhZ2dlckRlbGF5fHwwfSksdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIodSx0aGlzLCExKX19LGQub253ZWJraXRUcmFuc2l0aW9uRW5kPWZ1bmN0aW9uKHQpe3RoaXMub250cmFuc2l0aW9uZW5kKHQpfSxkLm9ub3RyYW5zaXRpb25lbmQ9ZnVuY3Rpb24odCl7dGhpcy5vbnRyYW5zaXRpb25lbmQodCl9O3ZhciBmPXtcIi13ZWJraXQtdHJhbnNmb3JtXCI6XCJ0cmFuc2Zvcm1cIn07ZC5vbnRyYW5zaXRpb25lbmQ9ZnVuY3Rpb24odCl7aWYodC50YXJnZXQ9PT10aGlzLmVsZW1lbnQpe3ZhciBlPXRoaXMuX3RyYW5zbixuPWZbdC5wcm9wZXJ0eU5hbWVdfHx0LnByb3BlcnR5TmFtZTtpZihkZWxldGUgZS5pbmdQcm9wZXJ0aWVzW25dLGkoZS5pbmdQcm9wZXJ0aWVzKSYmdGhpcy5kaXNhYmxlVHJhbnNpdGlvbigpLG4gaW4gZS5jbGVhbiYmKHRoaXMuZWxlbWVudC5zdHlsZVt0LnByb3BlcnR5TmFtZV09XCJcIixkZWxldGUgZS5jbGVhbltuXSksbiBpbiBlLm9uRW5kKXt2YXIgbz1lLm9uRW5kW25dO28uY2FsbCh0aGlzKSxkZWxldGUgZS5vbkVuZFtuXX10aGlzLmVtaXRFdmVudChcInRyYW5zaXRpb25FbmRcIixbdGhpc10pfX0sZC5kaXNhYmxlVHJhbnNpdGlvbj1mdW5jdGlvbigpe3RoaXMucmVtb3ZlVHJhbnNpdGlvblN0eWxlcygpLHRoaXMuZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKHUsdGhpcywhMSksdGhpcy5pc1RyYW5zaXRpb25pbmc9ITF9LGQuX3JlbW92ZVN0eWxlcz1mdW5jdGlvbih0KXt2YXIgZT17fTtmb3IodmFyIGkgaW4gdCllW2ldPVwiXCI7dGhpcy5jc3MoZSl9O3ZhciBjPXt0cmFuc2l0aW9uUHJvcGVydHk6XCJcIix0cmFuc2l0aW9uRHVyYXRpb246XCJcIix0cmFuc2l0aW9uRGVsYXk6XCJcIn07cmV0dXJuIGQucmVtb3ZlVHJhbnNpdGlvblN0eWxlcz1mdW5jdGlvbigpe3RoaXMuY3NzKGMpfSxkLnN0YWdnZXI9ZnVuY3Rpb24odCl7dD1pc05hTih0KT8wOnQsdGhpcy5zdGFnZ2VyRGVsYXk9dCtcIm1zXCJ9LGQucmVtb3ZlRWxlbT1mdW5jdGlvbigpe3RoaXMuZWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMuZWxlbWVudCksdGhpcy5jc3Moe2Rpc3BsYXk6XCJcIn0pLHRoaXMuZW1pdEV2ZW50KFwicmVtb3ZlXCIsW3RoaXNdKX0sZC5yZW1vdmU9ZnVuY3Rpb24oKXtyZXR1cm4gciYmcGFyc2VGbG9hdCh0aGlzLmxheW91dC5vcHRpb25zLnRyYW5zaXRpb25EdXJhdGlvbik/KHRoaXMub25jZShcInRyYW5zaXRpb25FbmRcIixmdW5jdGlvbigpe3RoaXMucmVtb3ZlRWxlbSgpfSksdm9pZCB0aGlzLmhpZGUoKSk6dm9pZCB0aGlzLnJlbW92ZUVsZW0oKX0sZC5yZXZlYWw9ZnVuY3Rpb24oKXtkZWxldGUgdGhpcy5pc0hpZGRlbix0aGlzLmNzcyh7ZGlzcGxheTpcIlwifSk7dmFyIHQ9dGhpcy5sYXlvdXQub3B0aW9ucyxlPXt9LGk9dGhpcy5nZXRIaWRlUmV2ZWFsVHJhbnNpdGlvbkVuZFByb3BlcnR5KFwidmlzaWJsZVN0eWxlXCIpO2VbaV09dGhpcy5vblJldmVhbFRyYW5zaXRpb25FbmQsdGhpcy50cmFuc2l0aW9uKHtmcm9tOnQuaGlkZGVuU3R5bGUsdG86dC52aXNpYmxlU3R5bGUsaXNDbGVhbmluZzohMCxvblRyYW5zaXRpb25FbmQ6ZX0pfSxkLm9uUmV2ZWFsVHJhbnNpdGlvbkVuZD1mdW5jdGlvbigpe3RoaXMuaXNIaWRkZW58fHRoaXMuZW1pdEV2ZW50KFwicmV2ZWFsXCIpfSxkLmdldEhpZGVSZXZlYWxUcmFuc2l0aW9uRW5kUHJvcGVydHk9ZnVuY3Rpb24odCl7dmFyIGU9dGhpcy5sYXlvdXQub3B0aW9uc1t0XTtpZihlLm9wYWNpdHkpcmV0dXJuXCJvcGFjaXR5XCI7Zm9yKHZhciBpIGluIGUpcmV0dXJuIGl9LGQuaGlkZT1mdW5jdGlvbigpe3RoaXMuaXNIaWRkZW49ITAsdGhpcy5jc3Moe2Rpc3BsYXk6XCJcIn0pO3ZhciB0PXRoaXMubGF5b3V0Lm9wdGlvbnMsZT17fSxpPXRoaXMuZ2V0SGlkZVJldmVhbFRyYW5zaXRpb25FbmRQcm9wZXJ0eShcImhpZGRlblN0eWxlXCIpO2VbaV09dGhpcy5vbkhpZGVUcmFuc2l0aW9uRW5kLHRoaXMudHJhbnNpdGlvbih7ZnJvbTp0LnZpc2libGVTdHlsZSx0bzp0LmhpZGRlblN0eWxlLGlzQ2xlYW5pbmc6ITAsb25UcmFuc2l0aW9uRW5kOmV9KX0sZC5vbkhpZGVUcmFuc2l0aW9uRW5kPWZ1bmN0aW9uKCl7dGhpcy5pc0hpZGRlbiYmKHRoaXMuY3NzKHtkaXNwbGF5Olwibm9uZVwifSksdGhpcy5lbWl0RXZlbnQoXCJoaWRlXCIpKX0sZC5kZXN0cm95PWZ1bmN0aW9uKCl7dGhpcy5jc3Moe3Bvc2l0aW9uOlwiXCIsbGVmdDpcIlwiLHJpZ2h0OlwiXCIsdG9wOlwiXCIsYm90dG9tOlwiXCIsdHJhbnNpdGlvbjpcIlwiLHRyYW5zZm9ybTpcIlwifSl9LG59KSxmdW5jdGlvbih0LGUpe1widXNlIHN0cmljdFwiO1wiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZD9kZWZpbmUoXCJvdXRsYXllci9vdXRsYXllclwiLFtcImV2LWVtaXR0ZXIvZXYtZW1pdHRlclwiLFwiZ2V0LXNpemUvZ2V0LXNpemVcIixcImZpenp5LXVpLXV0aWxzL3V0aWxzXCIsXCIuL2l0ZW1cIl0sZnVuY3Rpb24oaSxuLG8scyl7cmV0dXJuIGUodCxpLG4sbyxzKX0pOlwib2JqZWN0XCI9PXR5cGVvZiBtb2R1bGUmJm1vZHVsZS5leHBvcnRzP21vZHVsZS5leHBvcnRzPWUodCxyZXF1aXJlKFwiZXYtZW1pdHRlclwiKSxyZXF1aXJlKFwiZ2V0LXNpemVcIikscmVxdWlyZShcImZpenp5LXVpLXV0aWxzXCIpLHJlcXVpcmUoXCIuL2l0ZW1cIikpOnQuT3V0bGF5ZXI9ZSh0LHQuRXZFbWl0dGVyLHQuZ2V0U2l6ZSx0LmZpenp5VUlVdGlscyx0Lk91dGxheWVyLkl0ZW0pfSh3aW5kb3csZnVuY3Rpb24odCxlLGksbixvKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBzKHQsZSl7dmFyIGk9bi5nZXRRdWVyeUVsZW1lbnQodCk7aWYoIWkpcmV0dXJuIHZvaWQodSYmdS5lcnJvcihcIkJhZCBlbGVtZW50IGZvciBcIit0aGlzLmNvbnN0cnVjdG9yLm5hbWVzcGFjZStcIjogXCIrKGl8fHQpKSk7dGhpcy5lbGVtZW50PWksaCYmKHRoaXMuJGVsZW1lbnQ9aCh0aGlzLmVsZW1lbnQpKSx0aGlzLm9wdGlvbnM9bi5leHRlbmQoe30sdGhpcy5jb25zdHJ1Y3Rvci5kZWZhdWx0cyksdGhpcy5vcHRpb24oZSk7dmFyIG89KytsO3RoaXMuZWxlbWVudC5vdXRsYXllckdVSUQ9byxmW29dPXRoaXMsdGhpcy5fY3JlYXRlKCk7dmFyIHM9dGhpcy5fZ2V0T3B0aW9uKFwiaW5pdExheW91dFwiKTtzJiZ0aGlzLmxheW91dCgpfWZ1bmN0aW9uIHIodCl7ZnVuY3Rpb24gZSgpe3QuYXBwbHkodGhpcyxhcmd1bWVudHMpfXJldHVybiBlLnByb3RvdHlwZT1PYmplY3QuY3JlYXRlKHQucHJvdG90eXBlKSxlLnByb3RvdHlwZS5jb25zdHJ1Y3Rvcj1lLGV9ZnVuY3Rpb24gYSh0KXtpZihcIm51bWJlclwiPT10eXBlb2YgdClyZXR1cm4gdDt2YXIgZT10Lm1hdGNoKC8oXlxcZCpcXC4/XFxkKikoXFx3KikvKSxpPWUmJmVbMV0sbj1lJiZlWzJdO2lmKCFpLmxlbmd0aClyZXR1cm4gMDtpPXBhcnNlRmxvYXQoaSk7dmFyIG89bVtuXXx8MTtyZXR1cm4gaSpvfXZhciB1PXQuY29uc29sZSxoPXQualF1ZXJ5LGQ9ZnVuY3Rpb24oKXt9LGw9MCxmPXt9O3MubmFtZXNwYWNlPVwib3V0bGF5ZXJcIixzLkl0ZW09byxzLmRlZmF1bHRzPXtjb250YWluZXJTdHlsZTp7cG9zaXRpb246XCJyZWxhdGl2ZVwifSxpbml0TGF5b3V0OiEwLG9yaWdpbkxlZnQ6ITAsb3JpZ2luVG9wOiEwLHJlc2l6ZTohMCxyZXNpemVDb250YWluZXI6ITAsdHJhbnNpdGlvbkR1cmF0aW9uOlwiMC40c1wiLGhpZGRlblN0eWxlOntvcGFjaXR5OjAsdHJhbnNmb3JtOlwic2NhbGUoMC4wMDEpXCJ9LHZpc2libGVTdHlsZTp7b3BhY2l0eToxLHRyYW5zZm9ybTpcInNjYWxlKDEpXCJ9fTt2YXIgYz1zLnByb3RvdHlwZTtuLmV4dGVuZChjLGUucHJvdG90eXBlKSxjLm9wdGlvbj1mdW5jdGlvbih0KXtuLmV4dGVuZCh0aGlzLm9wdGlvbnMsdCl9LGMuX2dldE9wdGlvbj1mdW5jdGlvbih0KXt2YXIgZT10aGlzLmNvbnN0cnVjdG9yLmNvbXBhdE9wdGlvbnNbdF07cmV0dXJuIGUmJnZvaWQgMCE9PXRoaXMub3B0aW9uc1tlXT90aGlzLm9wdGlvbnNbZV06dGhpcy5vcHRpb25zW3RdfSxzLmNvbXBhdE9wdGlvbnM9e2luaXRMYXlvdXQ6XCJpc0luaXRMYXlvdXRcIixob3Jpem9udGFsOlwiaXNIb3Jpem9udGFsXCIsbGF5b3V0SW5zdGFudDpcImlzTGF5b3V0SW5zdGFudFwiLG9yaWdpbkxlZnQ6XCJpc09yaWdpbkxlZnRcIixvcmlnaW5Ub3A6XCJpc09yaWdpblRvcFwiLHJlc2l6ZTpcImlzUmVzaXplQm91bmRcIixyZXNpemVDb250YWluZXI6XCJpc1Jlc2l6aW5nQ29udGFpbmVyXCJ9LGMuX2NyZWF0ZT1mdW5jdGlvbigpe3RoaXMucmVsb2FkSXRlbXMoKSx0aGlzLnN0YW1wcz1bXSx0aGlzLnN0YW1wKHRoaXMub3B0aW9ucy5zdGFtcCksbi5leHRlbmQodGhpcy5lbGVtZW50LnN0eWxlLHRoaXMub3B0aW9ucy5jb250YWluZXJTdHlsZSk7dmFyIHQ9dGhpcy5fZ2V0T3B0aW9uKFwicmVzaXplXCIpO3QmJnRoaXMuYmluZFJlc2l6ZSgpfSxjLnJlbG9hZEl0ZW1zPWZ1bmN0aW9uKCl7dGhpcy5pdGVtcz10aGlzLl9pdGVtaXplKHRoaXMuZWxlbWVudC5jaGlsZHJlbil9LGMuX2l0ZW1pemU9ZnVuY3Rpb24odCl7Zm9yKHZhciBlPXRoaXMuX2ZpbHRlckZpbmRJdGVtRWxlbWVudHModCksaT10aGlzLmNvbnN0cnVjdG9yLkl0ZW0sbj1bXSxvPTA7bzxlLmxlbmd0aDtvKyspe3ZhciBzPWVbb10scj1uZXcgaShzLHRoaXMpO24ucHVzaChyKX1yZXR1cm4gbn0sYy5fZmlsdGVyRmluZEl0ZW1FbGVtZW50cz1mdW5jdGlvbih0KXtyZXR1cm4gbi5maWx0ZXJGaW5kRWxlbWVudHModCx0aGlzLm9wdGlvbnMuaXRlbVNlbGVjdG9yKX0sYy5nZXRJdGVtRWxlbWVudHM9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5pdGVtcy5tYXAoZnVuY3Rpb24odCl7cmV0dXJuIHQuZWxlbWVudH0pfSxjLmxheW91dD1mdW5jdGlvbigpe3RoaXMuX3Jlc2V0TGF5b3V0KCksdGhpcy5fbWFuYWdlU3RhbXBzKCk7dmFyIHQ9dGhpcy5fZ2V0T3B0aW9uKFwibGF5b3V0SW5zdGFudFwiKSxlPXZvaWQgMCE9PXQ/dDohdGhpcy5faXNMYXlvdXRJbml0ZWQ7dGhpcy5sYXlvdXRJdGVtcyh0aGlzLml0ZW1zLGUpLHRoaXMuX2lzTGF5b3V0SW5pdGVkPSEwfSxjLl9pbml0PWMubGF5b3V0LGMuX3Jlc2V0TGF5b3V0PWZ1bmN0aW9uKCl7dGhpcy5nZXRTaXplKCl9LGMuZ2V0U2l6ZT1mdW5jdGlvbigpe3RoaXMuc2l6ZT1pKHRoaXMuZWxlbWVudCl9LGMuX2dldE1lYXN1cmVtZW50PWZ1bmN0aW9uKHQsZSl7dmFyIG4sbz10aGlzLm9wdGlvbnNbdF07bz8oXCJzdHJpbmdcIj09dHlwZW9mIG8/bj10aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcihvKTpvIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQmJihuPW8pLHRoaXNbdF09bj9pKG4pW2VdOm8pOnRoaXNbdF09MH0sYy5sYXlvdXRJdGVtcz1mdW5jdGlvbih0LGUpe3Q9dGhpcy5fZ2V0SXRlbXNGb3JMYXlvdXQodCksdGhpcy5fbGF5b3V0SXRlbXModCxlKSx0aGlzLl9wb3N0TGF5b3V0KCl9LGMuX2dldEl0ZW1zRm9yTGF5b3V0PWZ1bmN0aW9uKHQpe3JldHVybiB0LmZpbHRlcihmdW5jdGlvbih0KXtyZXR1cm4hdC5pc0lnbm9yZWR9KX0sYy5fbGF5b3V0SXRlbXM9ZnVuY3Rpb24odCxlKXtpZih0aGlzLl9lbWl0Q29tcGxldGVPbkl0ZW1zKFwibGF5b3V0XCIsdCksdCYmdC5sZW5ndGgpe3ZhciBpPVtdO3QuZm9yRWFjaChmdW5jdGlvbih0KXt2YXIgbj10aGlzLl9nZXRJdGVtTGF5b3V0UG9zaXRpb24odCk7bi5pdGVtPXQsbi5pc0luc3RhbnQ9ZXx8dC5pc0xheW91dEluc3RhbnQsaS5wdXNoKG4pfSx0aGlzKSx0aGlzLl9wcm9jZXNzTGF5b3V0UXVldWUoaSl9fSxjLl9nZXRJdGVtTGF5b3V0UG9zaXRpb249ZnVuY3Rpb24oKXtyZXR1cm57eDowLHk6MH19LGMuX3Byb2Nlc3NMYXlvdXRRdWV1ZT1mdW5jdGlvbih0KXt0aGlzLnVwZGF0ZVN0YWdnZXIoKSx0LmZvckVhY2goZnVuY3Rpb24odCxlKXt0aGlzLl9wb3NpdGlvbkl0ZW0odC5pdGVtLHQueCx0LnksdC5pc0luc3RhbnQsZSl9LHRoaXMpfSxjLnVwZGF0ZVN0YWdnZXI9ZnVuY3Rpb24oKXt2YXIgdD10aGlzLm9wdGlvbnMuc3RhZ2dlcjtyZXR1cm4gbnVsbD09PXR8fHZvaWQgMD09PXQ/dm9pZCh0aGlzLnN0YWdnZXI9MCk6KHRoaXMuc3RhZ2dlcj1hKHQpLHRoaXMuc3RhZ2dlcil9LGMuX3Bvc2l0aW9uSXRlbT1mdW5jdGlvbih0LGUsaSxuLG8pe24/dC5nb1RvKGUsaSk6KHQuc3RhZ2dlcihvKnRoaXMuc3RhZ2dlciksdC5tb3ZlVG8oZSxpKSl9LGMuX3Bvc3RMYXlvdXQ9ZnVuY3Rpb24oKXt0aGlzLnJlc2l6ZUNvbnRhaW5lcigpfSxjLnJlc2l6ZUNvbnRhaW5lcj1mdW5jdGlvbigpe3ZhciB0PXRoaXMuX2dldE9wdGlvbihcInJlc2l6ZUNvbnRhaW5lclwiKTtpZih0KXt2YXIgZT10aGlzLl9nZXRDb250YWluZXJTaXplKCk7ZSYmKHRoaXMuX3NldENvbnRhaW5lck1lYXN1cmUoZS53aWR0aCwhMCksdGhpcy5fc2V0Q29udGFpbmVyTWVhc3VyZShlLmhlaWdodCwhMSkpfX0sYy5fZ2V0Q29udGFpbmVyU2l6ZT1kLGMuX3NldENvbnRhaW5lck1lYXN1cmU9ZnVuY3Rpb24odCxlKXtpZih2b2lkIDAhPT10KXt2YXIgaT10aGlzLnNpemU7aS5pc0JvcmRlckJveCYmKHQrPWU/aS5wYWRkaW5nTGVmdCtpLnBhZGRpbmdSaWdodCtpLmJvcmRlckxlZnRXaWR0aCtpLmJvcmRlclJpZ2h0V2lkdGg6aS5wYWRkaW5nQm90dG9tK2kucGFkZGluZ1RvcCtpLmJvcmRlclRvcFdpZHRoK2kuYm9yZGVyQm90dG9tV2lkdGgpLHQ9TWF0aC5tYXgodCwwKSx0aGlzLmVsZW1lbnQuc3R5bGVbZT9cIndpZHRoXCI6XCJoZWlnaHRcIl09dCtcInB4XCJ9fSxjLl9lbWl0Q29tcGxldGVPbkl0ZW1zPWZ1bmN0aW9uKHQsZSl7ZnVuY3Rpb24gaSgpe28uZGlzcGF0Y2hFdmVudCh0K1wiQ29tcGxldGVcIixudWxsLFtlXSl9ZnVuY3Rpb24gbigpe3IrKyxyPT1zJiZpKCl9dmFyIG89dGhpcyxzPWUubGVuZ3RoO2lmKCFlfHwhcylyZXR1cm4gdm9pZCBpKCk7dmFyIHI9MDtlLmZvckVhY2goZnVuY3Rpb24oZSl7ZS5vbmNlKHQsbil9KX0sYy5kaXNwYXRjaEV2ZW50PWZ1bmN0aW9uKHQsZSxpKXt2YXIgbj1lP1tlXS5jb25jYXQoaSk6aTtpZih0aGlzLmVtaXRFdmVudCh0LG4pLGgpaWYodGhpcy4kZWxlbWVudD10aGlzLiRlbGVtZW50fHxoKHRoaXMuZWxlbWVudCksZSl7dmFyIG89aC5FdmVudChlKTtvLnR5cGU9dCx0aGlzLiRlbGVtZW50LnRyaWdnZXIobyxpKX1lbHNlIHRoaXMuJGVsZW1lbnQudHJpZ2dlcih0LGkpfSxjLmlnbm9yZT1mdW5jdGlvbih0KXt2YXIgZT10aGlzLmdldEl0ZW0odCk7ZSYmKGUuaXNJZ25vcmVkPSEwKX0sYy51bmlnbm9yZT1mdW5jdGlvbih0KXt2YXIgZT10aGlzLmdldEl0ZW0odCk7ZSYmZGVsZXRlIGUuaXNJZ25vcmVkfSxjLnN0YW1wPWZ1bmN0aW9uKHQpe3Q9dGhpcy5fZmluZCh0KSx0JiYodGhpcy5zdGFtcHM9dGhpcy5zdGFtcHMuY29uY2F0KHQpLHQuZm9yRWFjaCh0aGlzLmlnbm9yZSx0aGlzKSl9LGMudW5zdGFtcD1mdW5jdGlvbih0KXt0PXRoaXMuX2ZpbmQodCksdCYmdC5mb3JFYWNoKGZ1bmN0aW9uKHQpe24ucmVtb3ZlRnJvbSh0aGlzLnN0YW1wcyx0KSx0aGlzLnVuaWdub3JlKHQpfSx0aGlzKX0sYy5fZmluZD1mdW5jdGlvbih0KXtyZXR1cm4gdD8oXCJzdHJpbmdcIj09dHlwZW9mIHQmJih0PXRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKHQpKSx0PW4ubWFrZUFycmF5KHQpKTp2b2lkIDB9LGMuX21hbmFnZVN0YW1wcz1mdW5jdGlvbigpe3RoaXMuc3RhbXBzJiZ0aGlzLnN0YW1wcy5sZW5ndGgmJih0aGlzLl9nZXRCb3VuZGluZ1JlY3QoKSx0aGlzLnN0YW1wcy5mb3JFYWNoKHRoaXMuX21hbmFnZVN0YW1wLHRoaXMpKX0sYy5fZ2V0Qm91bmRpbmdSZWN0PWZ1bmN0aW9uKCl7dmFyIHQ9dGhpcy5lbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLGU9dGhpcy5zaXplO3RoaXMuX2JvdW5kaW5nUmVjdD17bGVmdDp0LmxlZnQrZS5wYWRkaW5nTGVmdCtlLmJvcmRlckxlZnRXaWR0aCx0b3A6dC50b3ArZS5wYWRkaW5nVG9wK2UuYm9yZGVyVG9wV2lkdGgscmlnaHQ6dC5yaWdodC0oZS5wYWRkaW5nUmlnaHQrZS5ib3JkZXJSaWdodFdpZHRoKSxib3R0b206dC5ib3R0b20tKGUucGFkZGluZ0JvdHRvbStlLmJvcmRlckJvdHRvbVdpZHRoKX19LGMuX21hbmFnZVN0YW1wPWQsYy5fZ2V0RWxlbWVudE9mZnNldD1mdW5jdGlvbih0KXt2YXIgZT10LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLG49dGhpcy5fYm91bmRpbmdSZWN0LG89aSh0KSxzPXtsZWZ0OmUubGVmdC1uLmxlZnQtby5tYXJnaW5MZWZ0LHRvcDplLnRvcC1uLnRvcC1vLm1hcmdpblRvcCxyaWdodDpuLnJpZ2h0LWUucmlnaHQtby5tYXJnaW5SaWdodCxib3R0b206bi5ib3R0b20tZS5ib3R0b20tby5tYXJnaW5Cb3R0b219O3JldHVybiBzfSxjLmhhbmRsZUV2ZW50PW4uaGFuZGxlRXZlbnQsYy5iaW5kUmVzaXplPWZ1bmN0aW9uKCl7dC5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsdGhpcyksdGhpcy5pc1Jlc2l6ZUJvdW5kPSEwfSxjLnVuYmluZFJlc2l6ZT1mdW5jdGlvbigpe3QucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLHRoaXMpLHRoaXMuaXNSZXNpemVCb3VuZD0hMX0sYy5vbnJlc2l6ZT1mdW5jdGlvbigpe3RoaXMucmVzaXplKCl9LG4uZGVib3VuY2VNZXRob2QocyxcIm9ucmVzaXplXCIsMTAwKSxjLnJlc2l6ZT1mdW5jdGlvbigpe3RoaXMuaXNSZXNpemVCb3VuZCYmdGhpcy5uZWVkc1Jlc2l6ZUxheW91dCgpJiZ0aGlzLmxheW91dCgpfSxjLm5lZWRzUmVzaXplTGF5b3V0PWZ1bmN0aW9uKCl7dmFyIHQ9aSh0aGlzLmVsZW1lbnQpLGU9dGhpcy5zaXplJiZ0O3JldHVybiBlJiZ0LmlubmVyV2lkdGghPT10aGlzLnNpemUuaW5uZXJXaWR0aH0sYy5hZGRJdGVtcz1mdW5jdGlvbih0KXt2YXIgZT10aGlzLl9pdGVtaXplKHQpO3JldHVybiBlLmxlbmd0aCYmKHRoaXMuaXRlbXM9dGhpcy5pdGVtcy5jb25jYXQoZSkpLGV9LGMuYXBwZW5kZWQ9ZnVuY3Rpb24odCl7dmFyIGU9dGhpcy5hZGRJdGVtcyh0KTtlLmxlbmd0aCYmKHRoaXMubGF5b3V0SXRlbXMoZSwhMCksdGhpcy5yZXZlYWwoZSkpfSxjLnByZXBlbmRlZD1mdW5jdGlvbih0KXt2YXIgZT10aGlzLl9pdGVtaXplKHQpO2lmKGUubGVuZ3RoKXt2YXIgaT10aGlzLml0ZW1zLnNsaWNlKDApO3RoaXMuaXRlbXM9ZS5jb25jYXQoaSksdGhpcy5fcmVzZXRMYXlvdXQoKSx0aGlzLl9tYW5hZ2VTdGFtcHMoKSx0aGlzLmxheW91dEl0ZW1zKGUsITApLHRoaXMucmV2ZWFsKGUpLHRoaXMubGF5b3V0SXRlbXMoaSl9fSxjLnJldmVhbD1mdW5jdGlvbih0KXtpZih0aGlzLl9lbWl0Q29tcGxldGVPbkl0ZW1zKFwicmV2ZWFsXCIsdCksdCYmdC5sZW5ndGgpe3ZhciBlPXRoaXMudXBkYXRlU3RhZ2dlcigpO3QuZm9yRWFjaChmdW5jdGlvbih0LGkpe3Quc3RhZ2dlcihpKmUpLHQucmV2ZWFsKCl9KX19LGMuaGlkZT1mdW5jdGlvbih0KXtpZih0aGlzLl9lbWl0Q29tcGxldGVPbkl0ZW1zKFwiaGlkZVwiLHQpLHQmJnQubGVuZ3RoKXt2YXIgZT10aGlzLnVwZGF0ZVN0YWdnZXIoKTt0LmZvckVhY2goZnVuY3Rpb24odCxpKXt0LnN0YWdnZXIoaSplKSx0LmhpZGUoKX0pfX0sYy5yZXZlYWxJdGVtRWxlbWVudHM9ZnVuY3Rpb24odCl7dmFyIGU9dGhpcy5nZXRJdGVtcyh0KTt0aGlzLnJldmVhbChlKX0sYy5oaWRlSXRlbUVsZW1lbnRzPWZ1bmN0aW9uKHQpe3ZhciBlPXRoaXMuZ2V0SXRlbXModCk7dGhpcy5oaWRlKGUpfSxjLmdldEl0ZW09ZnVuY3Rpb24odCl7Zm9yKHZhciBlPTA7ZTx0aGlzLml0ZW1zLmxlbmd0aDtlKyspe3ZhciBpPXRoaXMuaXRlbXNbZV07aWYoaS5lbGVtZW50PT10KXJldHVybiBpfX0sYy5nZXRJdGVtcz1mdW5jdGlvbih0KXt0PW4ubWFrZUFycmF5KHQpO3ZhciBlPVtdO3JldHVybiB0LmZvckVhY2goZnVuY3Rpb24odCl7dmFyIGk9dGhpcy5nZXRJdGVtKHQpO2kmJmUucHVzaChpKX0sdGhpcyksZX0sYy5yZW1vdmU9ZnVuY3Rpb24odCl7dmFyIGU9dGhpcy5nZXRJdGVtcyh0KTt0aGlzLl9lbWl0Q29tcGxldGVPbkl0ZW1zKFwicmVtb3ZlXCIsZSksZSYmZS5sZW5ndGgmJmUuZm9yRWFjaChmdW5jdGlvbih0KXt0LnJlbW92ZSgpLG4ucmVtb3ZlRnJvbSh0aGlzLml0ZW1zLHQpfSx0aGlzKX0sYy5kZXN0cm95PWZ1bmN0aW9uKCl7dmFyIHQ9dGhpcy5lbGVtZW50LnN0eWxlO3QuaGVpZ2h0PVwiXCIsdC5wb3NpdGlvbj1cIlwiLHQud2lkdGg9XCJcIix0aGlzLml0ZW1zLmZvckVhY2goZnVuY3Rpb24odCl7dC5kZXN0cm95KCl9KSx0aGlzLnVuYmluZFJlc2l6ZSgpO3ZhciBlPXRoaXMuZWxlbWVudC5vdXRsYXllckdVSUQ7ZGVsZXRlIGZbZV0sZGVsZXRlIHRoaXMuZWxlbWVudC5vdXRsYXllckdVSUQsaCYmaC5yZW1vdmVEYXRhKHRoaXMuZWxlbWVudCx0aGlzLmNvbnN0cnVjdG9yLm5hbWVzcGFjZSl9LHMuZGF0YT1mdW5jdGlvbih0KXt0PW4uZ2V0UXVlcnlFbGVtZW50KHQpO3ZhciBlPXQmJnQub3V0bGF5ZXJHVUlEO3JldHVybiBlJiZmW2VdfSxzLmNyZWF0ZT1mdW5jdGlvbih0LGUpe3ZhciBpPXIocyk7cmV0dXJuIGkuZGVmYXVsdHM9bi5leHRlbmQoe30scy5kZWZhdWx0cyksbi5leHRlbmQoaS5kZWZhdWx0cyxlKSxpLmNvbXBhdE9wdGlvbnM9bi5leHRlbmQoe30scy5jb21wYXRPcHRpb25zKSxpLm5hbWVzcGFjZT10LGkuZGF0YT1zLmRhdGEsaS5JdGVtPXIobyksbi5odG1sSW5pdChpLHQpLGgmJmguYnJpZGdldCYmaC5icmlkZ2V0KHQsaSksaX07dmFyIG09e21zOjEsczoxZTN9O3JldHVybiBzLkl0ZW09byxzfSksZnVuY3Rpb24odCxlKXtcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQ/ZGVmaW5lKFwiaXNvdG9wZS9qcy9pdGVtXCIsW1wib3V0bGF5ZXIvb3V0bGF5ZXJcIl0sZSk6XCJvYmplY3RcIj09dHlwZW9mIG1vZHVsZSYmbW9kdWxlLmV4cG9ydHM/bW9kdWxlLmV4cG9ydHM9ZShyZXF1aXJlKFwib3V0bGF5ZXJcIikpOih0Lklzb3RvcGU9dC5Jc290b3BlfHx7fSx0Lklzb3RvcGUuSXRlbT1lKHQuT3V0bGF5ZXIpKX0od2luZG93LGZ1bmN0aW9uKHQpe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIGUoKXt0Lkl0ZW0uYXBwbHkodGhpcyxhcmd1bWVudHMpfXZhciBpPWUucHJvdG90eXBlPU9iamVjdC5jcmVhdGUodC5JdGVtLnByb3RvdHlwZSksbj1pLl9jcmVhdGU7aS5fY3JlYXRlPWZ1bmN0aW9uKCl7dGhpcy5pZD10aGlzLmxheW91dC5pdGVtR1VJRCsrLG4uY2FsbCh0aGlzKSx0aGlzLnNvcnREYXRhPXt9fSxpLnVwZGF0ZVNvcnREYXRhPWZ1bmN0aW9uKCl7aWYoIXRoaXMuaXNJZ25vcmVkKXt0aGlzLnNvcnREYXRhLmlkPXRoaXMuaWQsdGhpcy5zb3J0RGF0YVtcIm9yaWdpbmFsLW9yZGVyXCJdPXRoaXMuaWQsdGhpcy5zb3J0RGF0YS5yYW5kb209TWF0aC5yYW5kb20oKTt2YXIgdD10aGlzLmxheW91dC5vcHRpb25zLmdldFNvcnREYXRhLGU9dGhpcy5sYXlvdXQuX3NvcnRlcnM7Zm9yKHZhciBpIGluIHQpe3ZhciBuPWVbaV07dGhpcy5zb3J0RGF0YVtpXT1uKHRoaXMuZWxlbWVudCx0aGlzKX19fTt2YXIgbz1pLmRlc3Ryb3k7cmV0dXJuIGkuZGVzdHJveT1mdW5jdGlvbigpe28uYXBwbHkodGhpcyxhcmd1bWVudHMpLHRoaXMuY3NzKHtkaXNwbGF5OlwiXCJ9KX0sZX0pLGZ1bmN0aW9uKHQsZSl7XCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kP2RlZmluZShcImlzb3RvcGUvanMvbGF5b3V0LW1vZGVcIixbXCJnZXQtc2l6ZS9nZXQtc2l6ZVwiLFwib3V0bGF5ZXIvb3V0bGF5ZXJcIl0sZSk6XCJvYmplY3RcIj09dHlwZW9mIG1vZHVsZSYmbW9kdWxlLmV4cG9ydHM/bW9kdWxlLmV4cG9ydHM9ZShyZXF1aXJlKFwiZ2V0LXNpemVcIikscmVxdWlyZShcIm91dGxheWVyXCIpKToodC5Jc290b3BlPXQuSXNvdG9wZXx8e30sdC5Jc290b3BlLkxheW91dE1vZGU9ZSh0LmdldFNpemUsdC5PdXRsYXllcikpfSh3aW5kb3csZnVuY3Rpb24odCxlKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBpKHQpe3RoaXMuaXNvdG9wZT10LHQmJih0aGlzLm9wdGlvbnM9dC5vcHRpb25zW3RoaXMubmFtZXNwYWNlXSx0aGlzLmVsZW1lbnQ9dC5lbGVtZW50LHRoaXMuaXRlbXM9dC5maWx0ZXJlZEl0ZW1zLHRoaXMuc2l6ZT10LnNpemUpfXZhciBuPWkucHJvdG90eXBlLG89W1wiX3Jlc2V0TGF5b3V0XCIsXCJfZ2V0SXRlbUxheW91dFBvc2l0aW9uXCIsXCJfbWFuYWdlU3RhbXBcIixcIl9nZXRDb250YWluZXJTaXplXCIsXCJfZ2V0RWxlbWVudE9mZnNldFwiLFwibmVlZHNSZXNpemVMYXlvdXRcIixcIl9nZXRPcHRpb25cIl07cmV0dXJuIG8uZm9yRWFjaChmdW5jdGlvbih0KXtuW3RdPWZ1bmN0aW9uKCl7cmV0dXJuIGUucHJvdG90eXBlW3RdLmFwcGx5KHRoaXMuaXNvdG9wZSxhcmd1bWVudHMpfX0pLG4ubmVlZHNWZXJ0aWNhbFJlc2l6ZUxheW91dD1mdW5jdGlvbigpe3ZhciBlPXQodGhpcy5pc290b3BlLmVsZW1lbnQpLGk9dGhpcy5pc290b3BlLnNpemUmJmU7cmV0dXJuIGkmJmUuaW5uZXJIZWlnaHQhPXRoaXMuaXNvdG9wZS5zaXplLmlubmVySGVpZ2h0fSxuLl9nZXRNZWFzdXJlbWVudD1mdW5jdGlvbigpe3RoaXMuaXNvdG9wZS5fZ2V0TWVhc3VyZW1lbnQuYXBwbHkodGhpcyxhcmd1bWVudHMpfSxuLmdldENvbHVtbldpZHRoPWZ1bmN0aW9uKCl7dGhpcy5nZXRTZWdtZW50U2l6ZShcImNvbHVtblwiLFwiV2lkdGhcIil9LG4uZ2V0Um93SGVpZ2h0PWZ1bmN0aW9uKCl7dGhpcy5nZXRTZWdtZW50U2l6ZShcInJvd1wiLFwiSGVpZ2h0XCIpfSxuLmdldFNlZ21lbnRTaXplPWZ1bmN0aW9uKHQsZSl7dmFyIGk9dCtlLG49XCJvdXRlclwiK2U7aWYodGhpcy5fZ2V0TWVhc3VyZW1lbnQoaSxuKSwhdGhpc1tpXSl7dmFyIG89dGhpcy5nZXRGaXJzdEl0ZW1TaXplKCk7dGhpc1tpXT1vJiZvW25dfHx0aGlzLmlzb3RvcGUuc2l6ZVtcImlubmVyXCIrZV19fSxuLmdldEZpcnN0SXRlbVNpemU9ZnVuY3Rpb24oKXt2YXIgZT10aGlzLmlzb3RvcGUuZmlsdGVyZWRJdGVtc1swXTtyZXR1cm4gZSYmZS5lbGVtZW50JiZ0KGUuZWxlbWVudCl9LG4ubGF5b3V0PWZ1bmN0aW9uKCl7dGhpcy5pc290b3BlLmxheW91dC5hcHBseSh0aGlzLmlzb3RvcGUsYXJndW1lbnRzKX0sbi5nZXRTaXplPWZ1bmN0aW9uKCl7dGhpcy5pc290b3BlLmdldFNpemUoKSx0aGlzLnNpemU9dGhpcy5pc290b3BlLnNpemV9LGkubW9kZXM9e30saS5jcmVhdGU9ZnVuY3Rpb24odCxlKXtmdW5jdGlvbiBvKCl7aS5hcHBseSh0aGlzLGFyZ3VtZW50cyl9cmV0dXJuIG8ucHJvdG90eXBlPU9iamVjdC5jcmVhdGUobiksby5wcm90b3R5cGUuY29uc3RydWN0b3I9byxlJiYoby5vcHRpb25zPWUpLG8ucHJvdG90eXBlLm5hbWVzcGFjZT10LGkubW9kZXNbdF09byxvfSxpfSksZnVuY3Rpb24odCxlKXtcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQ/ZGVmaW5lKFwibWFzb25yeS9tYXNvbnJ5XCIsW1wib3V0bGF5ZXIvb3V0bGF5ZXJcIixcImdldC1zaXplL2dldC1zaXplXCJdLGUpOlwib2JqZWN0XCI9PXR5cGVvZiBtb2R1bGUmJm1vZHVsZS5leHBvcnRzP21vZHVsZS5leHBvcnRzPWUocmVxdWlyZShcIm91dGxheWVyXCIpLHJlcXVpcmUoXCJnZXQtc2l6ZVwiKSk6dC5NYXNvbnJ5PWUodC5PdXRsYXllcix0LmdldFNpemUpfSh3aW5kb3csZnVuY3Rpb24odCxlKXt2YXIgaT10LmNyZWF0ZShcIm1hc29ucnlcIik7cmV0dXJuIGkuY29tcGF0T3B0aW9ucy5maXRXaWR0aD1cImlzRml0V2lkdGhcIixpLnByb3RvdHlwZS5fcmVzZXRMYXlvdXQ9ZnVuY3Rpb24oKXt0aGlzLmdldFNpemUoKSx0aGlzLl9nZXRNZWFzdXJlbWVudChcImNvbHVtbldpZHRoXCIsXCJvdXRlcldpZHRoXCIpLHRoaXMuX2dldE1lYXN1cmVtZW50KFwiZ3V0dGVyXCIsXCJvdXRlcldpZHRoXCIpLHRoaXMubWVhc3VyZUNvbHVtbnMoKSx0aGlzLmNvbFlzPVtdO2Zvcih2YXIgdD0wO3Q8dGhpcy5jb2xzO3QrKyl0aGlzLmNvbFlzLnB1c2goMCk7dGhpcy5tYXhZPTB9LGkucHJvdG90eXBlLm1lYXN1cmVDb2x1bW5zPWZ1bmN0aW9uKCl7aWYodGhpcy5nZXRDb250YWluZXJXaWR0aCgpLCF0aGlzLmNvbHVtbldpZHRoKXt2YXIgdD10aGlzLml0ZW1zWzBdLGk9dCYmdC5lbGVtZW50O3RoaXMuY29sdW1uV2lkdGg9aSYmZShpKS5vdXRlcldpZHRofHx0aGlzLmNvbnRhaW5lcldpZHRofXZhciBuPXRoaXMuY29sdW1uV2lkdGgrPXRoaXMuZ3V0dGVyLG89dGhpcy5jb250YWluZXJXaWR0aCt0aGlzLmd1dHRlcixzPW8vbixyPW4tbyVuLGE9ciYmMT5yP1wicm91bmRcIjpcImZsb29yXCI7cz1NYXRoW2FdKHMpLHRoaXMuY29scz1NYXRoLm1heChzLDEpfSxpLnByb3RvdHlwZS5nZXRDb250YWluZXJXaWR0aD1mdW5jdGlvbigpe3ZhciB0PXRoaXMuX2dldE9wdGlvbihcImZpdFdpZHRoXCIpLGk9dD90aGlzLmVsZW1lbnQucGFyZW50Tm9kZTp0aGlzLmVsZW1lbnQsbj1lKGkpO3RoaXMuY29udGFpbmVyV2lkdGg9biYmbi5pbm5lcldpZHRofSxpLnByb3RvdHlwZS5fZ2V0SXRlbUxheW91dFBvc2l0aW9uPWZ1bmN0aW9uKHQpe3QuZ2V0U2l6ZSgpO3ZhciBlPXQuc2l6ZS5vdXRlcldpZHRoJXRoaXMuY29sdW1uV2lkdGgsaT1lJiYxPmU/XCJyb3VuZFwiOlwiY2VpbFwiLG49TWF0aFtpXSh0LnNpemUub3V0ZXJXaWR0aC90aGlzLmNvbHVtbldpZHRoKTtuPU1hdGgubWluKG4sdGhpcy5jb2xzKTtmb3IodmFyIG89dGhpcy5fZ2V0Q29sR3JvdXAobikscz1NYXRoLm1pbi5hcHBseShNYXRoLG8pLHI9by5pbmRleE9mKHMpLGE9e3g6dGhpcy5jb2x1bW5XaWR0aCpyLHk6c30sdT1zK3Quc2l6ZS5vdXRlckhlaWdodCxoPXRoaXMuY29scysxLW8ubGVuZ3RoLGQ9MDtoPmQ7ZCsrKXRoaXMuY29sWXNbcitkXT11O3JldHVybiBhfSxpLnByb3RvdHlwZS5fZ2V0Q29sR3JvdXA9ZnVuY3Rpb24odCl7aWYoMj50KXJldHVybiB0aGlzLmNvbFlzO2Zvcih2YXIgZT1bXSxpPXRoaXMuY29scysxLXQsbj0wO2k+bjtuKyspe3ZhciBvPXRoaXMuY29sWXMuc2xpY2UobixuK3QpO2Vbbl09TWF0aC5tYXguYXBwbHkoTWF0aCxvKX1yZXR1cm4gZX0saS5wcm90b3R5cGUuX21hbmFnZVN0YW1wPWZ1bmN0aW9uKHQpe3ZhciBpPWUodCksbj10aGlzLl9nZXRFbGVtZW50T2Zmc2V0KHQpLG89dGhpcy5fZ2V0T3B0aW9uKFwib3JpZ2luTGVmdFwiKSxzPW8/bi5sZWZ0Om4ucmlnaHQscj1zK2kub3V0ZXJXaWR0aCxhPU1hdGguZmxvb3Iocy90aGlzLmNvbHVtbldpZHRoKTthPU1hdGgubWF4KDAsYSk7dmFyIHU9TWF0aC5mbG9vcihyL3RoaXMuY29sdW1uV2lkdGgpO3UtPXIldGhpcy5jb2x1bW5XaWR0aD8wOjEsdT1NYXRoLm1pbih0aGlzLmNvbHMtMSx1KTtmb3IodmFyIGg9dGhpcy5fZ2V0T3B0aW9uKFwib3JpZ2luVG9wXCIpLGQ9KGg/bi50b3A6bi5ib3R0b20pK2kub3V0ZXJIZWlnaHQsbD1hO3U+PWw7bCsrKXRoaXMuY29sWXNbbF09TWF0aC5tYXgoZCx0aGlzLmNvbFlzW2xdKX0saS5wcm90b3R5cGUuX2dldENvbnRhaW5lclNpemU9ZnVuY3Rpb24oKXt0aGlzLm1heFk9TWF0aC5tYXguYXBwbHkoTWF0aCx0aGlzLmNvbFlzKTt2YXIgdD17aGVpZ2h0OnRoaXMubWF4WX07cmV0dXJuIHRoaXMuX2dldE9wdGlvbihcImZpdFdpZHRoXCIpJiYodC53aWR0aD10aGlzLl9nZXRDb250YWluZXJGaXRXaWR0aCgpKSx0fSxpLnByb3RvdHlwZS5fZ2V0Q29udGFpbmVyRml0V2lkdGg9ZnVuY3Rpb24oKXtmb3IodmFyIHQ9MCxlPXRoaXMuY29sczstLWUmJjA9PT10aGlzLmNvbFlzW2VdOyl0Kys7cmV0dXJuKHRoaXMuY29scy10KSp0aGlzLmNvbHVtbldpZHRoLXRoaXMuZ3V0dGVyfSxpLnByb3RvdHlwZS5uZWVkc1Jlc2l6ZUxheW91dD1mdW5jdGlvbigpe3ZhciB0PXRoaXMuY29udGFpbmVyV2lkdGg7cmV0dXJuIHRoaXMuZ2V0Q29udGFpbmVyV2lkdGgoKSx0IT10aGlzLmNvbnRhaW5lcldpZHRofSxpfSksZnVuY3Rpb24odCxlKXtcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQ/ZGVmaW5lKFwiaXNvdG9wZS9qcy9sYXlvdXQtbW9kZXMvbWFzb25yeVwiLFtcIi4uL2xheW91dC1tb2RlXCIsXCJtYXNvbnJ5L21hc29ucnlcIl0sZSk6XCJvYmplY3RcIj09dHlwZW9mIG1vZHVsZSYmbW9kdWxlLmV4cG9ydHM/bW9kdWxlLmV4cG9ydHM9ZShyZXF1aXJlKFwiLi4vbGF5b3V0LW1vZGVcIikscmVxdWlyZShcIm1hc29ucnktbGF5b3V0XCIpKTplKHQuSXNvdG9wZS5MYXlvdXRNb2RlLHQuTWFzb25yeSl9KHdpbmRvdyxmdW5jdGlvbih0LGUpe1widXNlIHN0cmljdFwiO3ZhciBpPXQuY3JlYXRlKFwibWFzb25yeVwiKSxuPWkucHJvdG90eXBlLG89e19nZXRFbGVtZW50T2Zmc2V0OiEwLGxheW91dDohMCxfZ2V0TWVhc3VyZW1lbnQ6ITB9O2Zvcih2YXIgcyBpbiBlLnByb3RvdHlwZSlvW3NdfHwobltzXT1lLnByb3RvdHlwZVtzXSk7dmFyIHI9bi5tZWFzdXJlQ29sdW1ucztuLm1lYXN1cmVDb2x1bW5zPWZ1bmN0aW9uKCl7dGhpcy5pdGVtcz10aGlzLmlzb3RvcGUuZmlsdGVyZWRJdGVtcyxyLmNhbGwodGhpcyl9O3ZhciBhPW4uX2dldE9wdGlvbjtyZXR1cm4gbi5fZ2V0T3B0aW9uPWZ1bmN0aW9uKHQpe3JldHVyblwiZml0V2lkdGhcIj09dD92b2lkIDAhPT10aGlzLm9wdGlvbnMuaXNGaXRXaWR0aD90aGlzLm9wdGlvbnMuaXNGaXRXaWR0aDp0aGlzLm9wdGlvbnMuZml0V2lkdGg6YS5hcHBseSh0aGlzLmlzb3RvcGUsYXJndW1lbnRzKX0saX0pLGZ1bmN0aW9uKHQsZSl7XCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kP2RlZmluZShcImlzb3RvcGUvanMvbGF5b3V0LW1vZGVzL2ZpdC1yb3dzXCIsW1wiLi4vbGF5b3V0LW1vZGVcIl0sZSk6XCJvYmplY3RcIj09dHlwZW9mIGV4cG9ydHM/bW9kdWxlLmV4cG9ydHM9ZShyZXF1aXJlKFwiLi4vbGF5b3V0LW1vZGVcIikpOmUodC5Jc290b3BlLkxheW91dE1vZGUpfSh3aW5kb3csZnVuY3Rpb24odCl7XCJ1c2Ugc3RyaWN0XCI7dmFyIGU9dC5jcmVhdGUoXCJmaXRSb3dzXCIpLGk9ZS5wcm90b3R5cGU7cmV0dXJuIGkuX3Jlc2V0TGF5b3V0PWZ1bmN0aW9uKCl7dGhpcy54PTAsdGhpcy55PTAsdGhpcy5tYXhZPTAsdGhpcy5fZ2V0TWVhc3VyZW1lbnQoXCJndXR0ZXJcIixcIm91dGVyV2lkdGhcIil9LGkuX2dldEl0ZW1MYXlvdXRQb3NpdGlvbj1mdW5jdGlvbih0KXt0LmdldFNpemUoKTt2YXIgZT10LnNpemUub3V0ZXJXaWR0aCt0aGlzLmd1dHRlcixpPXRoaXMuaXNvdG9wZS5zaXplLmlubmVyV2lkdGgrdGhpcy5ndXR0ZXI7MCE9PXRoaXMueCYmZSt0aGlzLng+aSYmKHRoaXMueD0wLHRoaXMueT10aGlzLm1heFkpO3ZhciBuPXt4OnRoaXMueCx5OnRoaXMueX07cmV0dXJuIHRoaXMubWF4WT1NYXRoLm1heCh0aGlzLm1heFksdGhpcy55K3Quc2l6ZS5vdXRlckhlaWdodCksdGhpcy54Kz1lLG59LGkuX2dldENvbnRhaW5lclNpemU9ZnVuY3Rpb24oKXtyZXR1cm57aGVpZ2h0OnRoaXMubWF4WX19LGV9KSxmdW5jdGlvbih0LGUpe1wiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZD9kZWZpbmUoXCJpc290b3BlL2pzL2xheW91dC1tb2Rlcy92ZXJ0aWNhbFwiLFtcIi4uL2xheW91dC1tb2RlXCJdLGUpOlwib2JqZWN0XCI9PXR5cGVvZiBtb2R1bGUmJm1vZHVsZS5leHBvcnRzP21vZHVsZS5leHBvcnRzPWUocmVxdWlyZShcIi4uL2xheW91dC1tb2RlXCIpKTplKHQuSXNvdG9wZS5MYXlvdXRNb2RlKX0od2luZG93LGZ1bmN0aW9uKHQpe1widXNlIHN0cmljdFwiO3ZhciBlPXQuY3JlYXRlKFwidmVydGljYWxcIix7aG9yaXpvbnRhbEFsaWdubWVudDowfSksaT1lLnByb3RvdHlwZTtyZXR1cm4gaS5fcmVzZXRMYXlvdXQ9ZnVuY3Rpb24oKXt0aGlzLnk9MH0saS5fZ2V0SXRlbUxheW91dFBvc2l0aW9uPWZ1bmN0aW9uKHQpe3QuZ2V0U2l6ZSgpO3ZhciBlPSh0aGlzLmlzb3RvcGUuc2l6ZS5pbm5lcldpZHRoLXQuc2l6ZS5vdXRlcldpZHRoKSp0aGlzLm9wdGlvbnMuaG9yaXpvbnRhbEFsaWdubWVudCxpPXRoaXMueTtyZXR1cm4gdGhpcy55Kz10LnNpemUub3V0ZXJIZWlnaHQse3g6ZSx5Oml9fSxpLl9nZXRDb250YWluZXJTaXplPWZ1bmN0aW9uKCl7cmV0dXJue2hlaWdodDp0aGlzLnl9fSxlfSksZnVuY3Rpb24odCxlKXtcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQ/ZGVmaW5lKFtcIm91dGxheWVyL291dGxheWVyXCIsXCJnZXQtc2l6ZS9nZXQtc2l6ZVwiLFwiZGVzYW5kcm8tbWF0Y2hlcy1zZWxlY3Rvci9tYXRjaGVzLXNlbGVjdG9yXCIsXCJmaXp6eS11aS11dGlscy91dGlsc1wiLFwiaXNvdG9wZS9qcy9pdGVtXCIsXCJpc290b3BlL2pzL2xheW91dC1tb2RlXCIsXCJpc290b3BlL2pzL2xheW91dC1tb2Rlcy9tYXNvbnJ5XCIsXCJpc290b3BlL2pzL2xheW91dC1tb2Rlcy9maXQtcm93c1wiLFwiaXNvdG9wZS9qcy9sYXlvdXQtbW9kZXMvdmVydGljYWxcIl0sZnVuY3Rpb24oaSxuLG8scyxyLGEpe3JldHVybiBlKHQsaSxuLG8scyxyLGEpfSk6XCJvYmplY3RcIj09dHlwZW9mIG1vZHVsZSYmbW9kdWxlLmV4cG9ydHM/bW9kdWxlLmV4cG9ydHM9ZSh0LHJlcXVpcmUoXCJvdXRsYXllclwiKSxyZXF1aXJlKFwiZ2V0LXNpemVcIikscmVxdWlyZShcImRlc2FuZHJvLW1hdGNoZXMtc2VsZWN0b3JcIikscmVxdWlyZShcImZpenp5LXVpLXV0aWxzXCIpLHJlcXVpcmUoXCJpc290b3BlL2pzL2l0ZW1cIikscmVxdWlyZShcImlzb3RvcGUvanMvbGF5b3V0LW1vZGVcIikscmVxdWlyZShcImlzb3RvcGUvanMvbGF5b3V0LW1vZGVzL21hc29ucnlcIikscmVxdWlyZShcImlzb3RvcGUvanMvbGF5b3V0LW1vZGVzL2ZpdC1yb3dzXCIpLHJlcXVpcmUoXCJpc290b3BlL2pzL2xheW91dC1tb2Rlcy92ZXJ0aWNhbFwiKSk6dC5Jc290b3BlPWUodCx0Lk91dGxheWVyLHQuZ2V0U2l6ZSx0Lm1hdGNoZXNTZWxlY3Rvcix0LmZpenp5VUlVdGlscyx0Lklzb3RvcGUuSXRlbSx0Lklzb3RvcGUuTGF5b3V0TW9kZSl9KHdpbmRvdyxmdW5jdGlvbih0LGUsaSxuLG8scyxyKXtmdW5jdGlvbiBhKHQsZSl7cmV0dXJuIGZ1bmN0aW9uKGksbil7Zm9yKHZhciBvPTA7bzx0Lmxlbmd0aDtvKyspe3ZhciBzPXRbb10scj1pLnNvcnREYXRhW3NdLGE9bi5zb3J0RGF0YVtzXTtpZihyPmF8fGE+cil7dmFyIHU9dm9pZCAwIT09ZVtzXT9lW3NdOmUsaD11PzE6LTE7cmV0dXJuKHI+YT8xOi0xKSpofX1yZXR1cm4gMH19dmFyIHU9dC5qUXVlcnksaD1TdHJpbmcucHJvdG90eXBlLnRyaW0/ZnVuY3Rpb24odCl7cmV0dXJuIHQudHJpbSgpfTpmdW5jdGlvbih0KXtyZXR1cm4gdC5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLFwiXCIpfSxkPWUuY3JlYXRlKFwiaXNvdG9wZVwiLHtsYXlvdXRNb2RlOlwibWFzb25yeVwiLGlzSlF1ZXJ5RmlsdGVyaW5nOiEwLHNvcnRBc2NlbmRpbmc6ITB9KTtkLkl0ZW09cyxkLkxheW91dE1vZGU9cjt2YXIgbD1kLnByb3RvdHlwZTtsLl9jcmVhdGU9ZnVuY3Rpb24oKXt0aGlzLml0ZW1HVUlEPTAsdGhpcy5fc29ydGVycz17fSx0aGlzLl9nZXRTb3J0ZXJzKCksZS5wcm90b3R5cGUuX2NyZWF0ZS5jYWxsKHRoaXMpLHRoaXMubW9kZXM9e30sdGhpcy5maWx0ZXJlZEl0ZW1zPXRoaXMuaXRlbXMsdGhpcy5zb3J0SGlzdG9yeT1bXCJvcmlnaW5hbC1vcmRlclwiXTtmb3IodmFyIHQgaW4gci5tb2Rlcyl0aGlzLl9pbml0TGF5b3V0TW9kZSh0KX0sbC5yZWxvYWRJdGVtcz1mdW5jdGlvbigpe3RoaXMuaXRlbUdVSUQ9MCxlLnByb3RvdHlwZS5yZWxvYWRJdGVtcy5jYWxsKHRoaXMpfSxsLl9pdGVtaXplPWZ1bmN0aW9uKCl7Zm9yKHZhciB0PWUucHJvdG90eXBlLl9pdGVtaXplLmFwcGx5KHRoaXMsYXJndW1lbnRzKSxpPTA7aTx0Lmxlbmd0aDtpKyspe3ZhciBuPXRbaV07bi5pZD10aGlzLml0ZW1HVUlEKyt9cmV0dXJuIHRoaXMuX3VwZGF0ZUl0ZW1zU29ydERhdGEodCksdH0sbC5faW5pdExheW91dE1vZGU9ZnVuY3Rpb24odCl7dmFyIGU9ci5tb2Rlc1t0XSxpPXRoaXMub3B0aW9uc1t0XXx8e307dGhpcy5vcHRpb25zW3RdPWUub3B0aW9ucz9vLmV4dGVuZChlLm9wdGlvbnMsaSk6aSx0aGlzLm1vZGVzW3RdPW5ldyBlKHRoaXMpfSxsLmxheW91dD1mdW5jdGlvbigpe3JldHVybiF0aGlzLl9pc0xheW91dEluaXRlZCYmdGhpcy5fZ2V0T3B0aW9uKFwiaW5pdExheW91dFwiKT92b2lkIHRoaXMuYXJyYW5nZSgpOnZvaWQgdGhpcy5fbGF5b3V0KCl9LGwuX2xheW91dD1mdW5jdGlvbigpe3ZhciB0PXRoaXMuX2dldElzSW5zdGFudCgpO3RoaXMuX3Jlc2V0TGF5b3V0KCksdGhpcy5fbWFuYWdlU3RhbXBzKCksdGhpcy5sYXlvdXRJdGVtcyh0aGlzLmZpbHRlcmVkSXRlbXMsdCksdGhpcy5faXNMYXlvdXRJbml0ZWQ9ITB9LGwuYXJyYW5nZT1mdW5jdGlvbih0KXt0aGlzLm9wdGlvbih0KSx0aGlzLl9nZXRJc0luc3RhbnQoKTt2YXIgZT10aGlzLl9maWx0ZXIodGhpcy5pdGVtcyk7dGhpcy5maWx0ZXJlZEl0ZW1zPWUubWF0Y2hlcyx0aGlzLl9iaW5kQXJyYW5nZUNvbXBsZXRlKCksdGhpcy5faXNJbnN0YW50P3RoaXMuX25vVHJhbnNpdGlvbih0aGlzLl9oaWRlUmV2ZWFsLFtlXSk6dGhpcy5faGlkZVJldmVhbChlKSx0aGlzLl9zb3J0KCksdGhpcy5fbGF5b3V0KCl9LGwuX2luaXQ9bC5hcnJhbmdlLGwuX2hpZGVSZXZlYWw9ZnVuY3Rpb24odCl7dGhpcy5yZXZlYWwodC5uZWVkUmV2ZWFsKSx0aGlzLmhpZGUodC5uZWVkSGlkZSl9LGwuX2dldElzSW5zdGFudD1mdW5jdGlvbigpe3ZhciB0PXRoaXMuX2dldE9wdGlvbihcImxheW91dEluc3RhbnRcIiksZT12b2lkIDAhPT10P3Q6IXRoaXMuX2lzTGF5b3V0SW5pdGVkO3JldHVybiB0aGlzLl9pc0luc3RhbnQ9ZSxlfSxsLl9iaW5kQXJyYW5nZUNvbXBsZXRlPWZ1bmN0aW9uKCl7ZnVuY3Rpb24gdCgpe2UmJmkmJm4mJm8uZGlzcGF0Y2hFdmVudChcImFycmFuZ2VDb21wbGV0ZVwiLG51bGwsW28uZmlsdGVyZWRJdGVtc10pfXZhciBlLGksbixvPXRoaXM7dGhpcy5vbmNlKFwibGF5b3V0Q29tcGxldGVcIixmdW5jdGlvbigpe2U9ITAsdCgpfSksdGhpcy5vbmNlKFwiaGlkZUNvbXBsZXRlXCIsZnVuY3Rpb24oKXtpPSEwLHQoKX0pLHRoaXMub25jZShcInJldmVhbENvbXBsZXRlXCIsZnVuY3Rpb24oKXtuPSEwLHQoKX0pfSxsLl9maWx0ZXI9ZnVuY3Rpb24odCl7dmFyIGU9dGhpcy5vcHRpb25zLmZpbHRlcjtlPWV8fFwiKlwiO2Zvcih2YXIgaT1bXSxuPVtdLG89W10scz10aGlzLl9nZXRGaWx0ZXJUZXN0KGUpLHI9MDtyPHQubGVuZ3RoO3IrKyl7dmFyIGE9dFtyXTtpZighYS5pc0lnbm9yZWQpe3ZhciB1PXMoYSk7dSYmaS5wdXNoKGEpLHUmJmEuaXNIaWRkZW4/bi5wdXNoKGEpOnV8fGEuaXNIaWRkZW58fG8ucHVzaChhKX19cmV0dXJue21hdGNoZXM6aSxuZWVkUmV2ZWFsOm4sbmVlZEhpZGU6b319LGwuX2dldEZpbHRlclRlc3Q9ZnVuY3Rpb24odCl7cmV0dXJuIHUmJnRoaXMub3B0aW9ucy5pc0pRdWVyeUZpbHRlcmluZz9mdW5jdGlvbihlKXtyZXR1cm4gdShlLmVsZW1lbnQpLmlzKHQpfTpcImZ1bmN0aW9uXCI9PXR5cGVvZiB0P2Z1bmN0aW9uKGUpe3JldHVybiB0KGUuZWxlbWVudCl9OmZ1bmN0aW9uKGUpe3JldHVybiBuKGUuZWxlbWVudCx0KX19LGwudXBkYXRlU29ydERhdGE9ZnVuY3Rpb24odCl7dmFyIGU7dD8odD1vLm1ha2VBcnJheSh0KSxlPXRoaXMuZ2V0SXRlbXModCkpOmU9dGhpcy5pdGVtcyx0aGlzLl9nZXRTb3J0ZXJzKCksdGhpcy5fdXBkYXRlSXRlbXNTb3J0RGF0YShlKX0sbC5fZ2V0U29ydGVycz1mdW5jdGlvbigpe3ZhciB0PXRoaXMub3B0aW9ucy5nZXRTb3J0RGF0YTtmb3IodmFyIGUgaW4gdCl7dmFyIGk9dFtlXTt0aGlzLl9zb3J0ZXJzW2VdPWYoaSl9fSxsLl91cGRhdGVJdGVtc1NvcnREYXRhPWZ1bmN0aW9uKHQpe2Zvcih2YXIgZT10JiZ0Lmxlbmd0aCxpPTA7ZSYmZT5pO2krKyl7dmFyIG49dFtpXTtuLnVwZGF0ZVNvcnREYXRhKCl9fTt2YXIgZj1mdW5jdGlvbigpe2Z1bmN0aW9uIHQodCl7aWYoXCJzdHJpbmdcIiE9dHlwZW9mIHQpcmV0dXJuIHQ7dmFyIGk9aCh0KS5zcGxpdChcIiBcIiksbj1pWzBdLG89bi5tYXRjaCgvXlxcWyguKylcXF0kLykscz1vJiZvWzFdLHI9ZShzLG4pLGE9ZC5zb3J0RGF0YVBhcnNlcnNbaVsxXV07XG5yZXR1cm4gdD1hP2Z1bmN0aW9uKHQpe3JldHVybiB0JiZhKHIodCkpfTpmdW5jdGlvbih0KXtyZXR1cm4gdCYmcih0KX19ZnVuY3Rpb24gZSh0LGUpe3JldHVybiB0P2Z1bmN0aW9uKGUpe3JldHVybiBlLmdldEF0dHJpYnV0ZSh0KX06ZnVuY3Rpb24odCl7dmFyIGk9dC5xdWVyeVNlbGVjdG9yKGUpO3JldHVybiBpJiZpLnRleHRDb250ZW50fX1yZXR1cm4gdH0oKTtkLnNvcnREYXRhUGFyc2Vycz17cGFyc2VJbnQ6ZnVuY3Rpb24odCl7cmV0dXJuIHBhcnNlSW50KHQsMTApfSxwYXJzZUZsb2F0OmZ1bmN0aW9uKHQpe3JldHVybiBwYXJzZUZsb2F0KHQpfX0sbC5fc29ydD1mdW5jdGlvbigpe3ZhciB0PXRoaXMub3B0aW9ucy5zb3J0Qnk7aWYodCl7dmFyIGU9W10uY29uY2F0LmFwcGx5KHQsdGhpcy5zb3J0SGlzdG9yeSksaT1hKGUsdGhpcy5vcHRpb25zLnNvcnRBc2NlbmRpbmcpO3RoaXMuZmlsdGVyZWRJdGVtcy5zb3J0KGkpLHQhPXRoaXMuc29ydEhpc3RvcnlbMF0mJnRoaXMuc29ydEhpc3RvcnkudW5zaGlmdCh0KX19LGwuX21vZGU9ZnVuY3Rpb24oKXt2YXIgdD10aGlzLm9wdGlvbnMubGF5b3V0TW9kZSxlPXRoaXMubW9kZXNbdF07aWYoIWUpdGhyb3cgbmV3IEVycm9yKFwiTm8gbGF5b3V0IG1vZGU6IFwiK3QpO3JldHVybiBlLm9wdGlvbnM9dGhpcy5vcHRpb25zW3RdLGV9LGwuX3Jlc2V0TGF5b3V0PWZ1bmN0aW9uKCl7ZS5wcm90b3R5cGUuX3Jlc2V0TGF5b3V0LmNhbGwodGhpcyksdGhpcy5fbW9kZSgpLl9yZXNldExheW91dCgpfSxsLl9nZXRJdGVtTGF5b3V0UG9zaXRpb249ZnVuY3Rpb24odCl7cmV0dXJuIHRoaXMuX21vZGUoKS5fZ2V0SXRlbUxheW91dFBvc2l0aW9uKHQpfSxsLl9tYW5hZ2VTdGFtcD1mdW5jdGlvbih0KXt0aGlzLl9tb2RlKCkuX21hbmFnZVN0YW1wKHQpfSxsLl9nZXRDb250YWluZXJTaXplPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuX21vZGUoKS5fZ2V0Q29udGFpbmVyU2l6ZSgpfSxsLm5lZWRzUmVzaXplTGF5b3V0PWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuX21vZGUoKS5uZWVkc1Jlc2l6ZUxheW91dCgpfSxsLmFwcGVuZGVkPWZ1bmN0aW9uKHQpe3ZhciBlPXRoaXMuYWRkSXRlbXModCk7aWYoZS5sZW5ndGgpe3ZhciBpPXRoaXMuX2ZpbHRlclJldmVhbEFkZGVkKGUpO3RoaXMuZmlsdGVyZWRJdGVtcz10aGlzLmZpbHRlcmVkSXRlbXMuY29uY2F0KGkpfX0sbC5wcmVwZW5kZWQ9ZnVuY3Rpb24odCl7dmFyIGU9dGhpcy5faXRlbWl6ZSh0KTtpZihlLmxlbmd0aCl7dGhpcy5fcmVzZXRMYXlvdXQoKSx0aGlzLl9tYW5hZ2VTdGFtcHMoKTt2YXIgaT10aGlzLl9maWx0ZXJSZXZlYWxBZGRlZChlKTt0aGlzLmxheW91dEl0ZW1zKHRoaXMuZmlsdGVyZWRJdGVtcyksdGhpcy5maWx0ZXJlZEl0ZW1zPWkuY29uY2F0KHRoaXMuZmlsdGVyZWRJdGVtcyksdGhpcy5pdGVtcz1lLmNvbmNhdCh0aGlzLml0ZW1zKX19LGwuX2ZpbHRlclJldmVhbEFkZGVkPWZ1bmN0aW9uKHQpe3ZhciBlPXRoaXMuX2ZpbHRlcih0KTtyZXR1cm4gdGhpcy5oaWRlKGUubmVlZEhpZGUpLHRoaXMucmV2ZWFsKGUubWF0Y2hlcyksdGhpcy5sYXlvdXRJdGVtcyhlLm1hdGNoZXMsITApLGUubWF0Y2hlc30sbC5pbnNlcnQ9ZnVuY3Rpb24odCl7dmFyIGU9dGhpcy5hZGRJdGVtcyh0KTtpZihlLmxlbmd0aCl7dmFyIGksbixvPWUubGVuZ3RoO2ZvcihpPTA7bz5pO2krKyluPWVbaV0sdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKG4uZWxlbWVudCk7dmFyIHM9dGhpcy5fZmlsdGVyKGUpLm1hdGNoZXM7Zm9yKGk9MDtvPmk7aSsrKWVbaV0uaXNMYXlvdXRJbnN0YW50PSEwO2Zvcih0aGlzLmFycmFuZ2UoKSxpPTA7bz5pO2krKylkZWxldGUgZVtpXS5pc0xheW91dEluc3RhbnQ7dGhpcy5yZXZlYWwocyl9fTt2YXIgYz1sLnJlbW92ZTtyZXR1cm4gbC5yZW1vdmU9ZnVuY3Rpb24odCl7dD1vLm1ha2VBcnJheSh0KTt2YXIgZT10aGlzLmdldEl0ZW1zKHQpO2MuY2FsbCh0aGlzLHQpO2Zvcih2YXIgaT1lJiZlLmxlbmd0aCxuPTA7aSYmaT5uO24rKyl7dmFyIHM9ZVtuXTtvLnJlbW92ZUZyb20odGhpcy5maWx0ZXJlZEl0ZW1zLHMpfX0sbC5zaHVmZmxlPWZ1bmN0aW9uKCl7Zm9yKHZhciB0PTA7dDx0aGlzLml0ZW1zLmxlbmd0aDt0Kyspe3ZhciBlPXRoaXMuaXRlbXNbdF07ZS5zb3J0RGF0YS5yYW5kb209TWF0aC5yYW5kb20oKX10aGlzLm9wdGlvbnMuc29ydEJ5PVwicmFuZG9tXCIsdGhpcy5fc29ydCgpLHRoaXMuX2xheW91dCgpfSxsLl9ub1RyYW5zaXRpb249ZnVuY3Rpb24odCxlKXt2YXIgaT10aGlzLm9wdGlvbnMudHJhbnNpdGlvbkR1cmF0aW9uO3RoaXMub3B0aW9ucy50cmFuc2l0aW9uRHVyYXRpb249MDt2YXIgbj10LmFwcGx5KHRoaXMsZSk7cmV0dXJuIHRoaXMub3B0aW9ucy50cmFuc2l0aW9uRHVyYXRpb249aSxufSxsLmdldEZpbHRlcmVkSXRlbUVsZW1lbnRzPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuZmlsdGVyZWRJdGVtcy5tYXAoZnVuY3Rpb24odCl7cmV0dXJuIHQuZWxlbWVudH0pfSxkfSk7IiwiLyoqXG4gKiBMb2Rhc2ggKEN1c3RvbSBCdWlsZClcbiAqXG4gKiBAbGljZW5zZVxuICogbG9kYXNoLmNvbS9saWNlbnNlIHwgVW5kZXJzY29yZS5qcyAxLjguMyB1bmRlcnNjb3JlanMub3JnL0xJQ0VOU0VcbiAqIEJ1aWxkOiBgbG9kYXNoIGNvcmUgLW8gLi9kaXN0L2xvZGFzaC5jb3JlLmpzYFxuICpcbiAqL1xuOyhmdW5jdGlvbigpe2Z1bmN0aW9uIG4obil7cmV0dXJuIEsobikmJnBuLmNhbGwobixcImNhbGxlZVwiKSYmIWJuLmNhbGwobixcImNhbGxlZVwiKX1mdW5jdGlvbiB0KG4sdCl7cmV0dXJuIG4ucHVzaC5hcHBseShuLHQpLG59ZnVuY3Rpb24gcihuKXtyZXR1cm4gZnVuY3Rpb24odCl7cmV0dXJuIG51bGw9PXQ/bm46dFtuXX19ZnVuY3Rpb24gZShuLHQscixlLHUpe3JldHVybiB1KG4sZnVuY3Rpb24obix1LG8pe3I9ZT8oZT1mYWxzZSxuKTp0KHIsbix1LG8pfSkscn1mdW5jdGlvbiB1KG4sdCl7cmV0dXJuIGQodCxmdW5jdGlvbih0KXtyZXR1cm4gblt0XX0pfWZ1bmN0aW9uIG8obil7cmV0dXJuIG4gaW5zdGFuY2VvZiBpP246bmV3IGkobil9ZnVuY3Rpb24gaShuLHQpe3RoaXMuX193cmFwcGVkX189bix0aGlzLl9fYWN0aW9uc19fPVtdLHRoaXMuX19jaGFpbl9fPSEhdH1mdW5jdGlvbiBjKG4sdCxyLGUpe3JldHVybiBuPT09bm58fE0obixsbltyXSkmJiFwbi5jYWxsKGUscik/dDpufWZ1bmN0aW9uIGYobix0LHIpe1xuaWYodHlwZW9mIG4hPVwiZnVuY3Rpb25cIil0aHJvdyBuZXcgVHlwZUVycm9yKFwiRXhwZWN0ZWQgYSBmdW5jdGlvblwiKTtyZXR1cm4gc2V0VGltZW91dChmdW5jdGlvbigpe24uYXBwbHkobm4scil9LHQpfWZ1bmN0aW9uIGEobix0KXt2YXIgcj10cnVlO3JldHVybiBtbihuLGZ1bmN0aW9uKG4sZSx1KXtyZXR1cm4gcj0hIXQobixlLHUpfSkscn1mdW5jdGlvbiBsKG4sdCxyKXtmb3IodmFyIGU9LTEsdT1uLmxlbmd0aDsrK2U8dTspe3ZhciBvPW5bZV0saT10KG8pO2lmKG51bGwhPWkmJihjPT09bm4/aT09PWk6cihpLGMpKSl2YXIgYz1pLGY9b31yZXR1cm4gZn1mdW5jdGlvbiBwKG4sdCl7dmFyIHI9W107cmV0dXJuIG1uKG4sZnVuY3Rpb24obixlLHUpe3QobixlLHUpJiZyLnB1c2gobil9KSxyfWZ1bmN0aW9uIHMobixyLGUsdSxvKXt2YXIgaT0tMSxjPW4ubGVuZ3RoO2ZvcihlfHwoZT1EKSxvfHwobz1bXSk7KytpPGM7KXt2YXIgZj1uW2ldOzA8ciYmZShmKT8xPHI/cyhmLHItMSxlLHUsbyk6dChvLGYpOnV8fChvW28ubGVuZ3RoXT1mKTtcbn1yZXR1cm4gb31mdW5jdGlvbiBoKG4sdCl7cmV0dXJuIG4mJk9uKG4sdCxJbil9ZnVuY3Rpb24gdihuLHQpe3JldHVybiBwKHQsZnVuY3Rpb24odCl7cmV0dXJuIFYoblt0XSl9KX1mdW5jdGlvbiB5KG4sdCl7cmV0dXJuIG4+dH1mdW5jdGlvbiBiKG4sdCxyLGUsdSl7cmV0dXJuIG49PT10fHwobnVsbD09bnx8bnVsbD09dHx8IUgobikmJiFLKHQpP24hPT1uJiZ0IT09dDpnKG4sdCxyLGUsYix1KSl9ZnVuY3Rpb24gZyhuLHQscixlLHUsbyl7dmFyIGk9Tm4obiksYz1Obih0KSxmPVwiW29iamVjdCBBcnJheV1cIixhPVwiW29iamVjdCBBcnJheV1cIjtpfHwoZj1obi5jYWxsKG4pLGY9XCJbb2JqZWN0IEFyZ3VtZW50c11cIj09Zj9cIltvYmplY3QgT2JqZWN0XVwiOmYpLGN8fChhPWhuLmNhbGwodCksYT1cIltvYmplY3QgQXJndW1lbnRzXVwiPT1hP1wiW29iamVjdCBPYmplY3RdXCI6YSk7dmFyIGw9XCJbb2JqZWN0IE9iamVjdF1cIj09ZixjPVwiW29iamVjdCBPYmplY3RdXCI9PWEsYT1mPT1hO298fChvPVtdKTtcbnZhciBwPUFuKG8sZnVuY3Rpb24odCl7cmV0dXJuIHRbMF09PW59KSxzPUFuKG8sZnVuY3Rpb24obil7cmV0dXJuIG5bMF09PXR9KTtpZihwJiZzKXJldHVybiBwWzFdPT10O2lmKG8ucHVzaChbbix0XSksby5wdXNoKFt0LG5dKSxhJiYhbCl7aWYoaSlyPUIobix0LHIsZSx1LG8pO2Vsc2Ugbjp7c3dpdGNoKGYpe2Nhc2VcIltvYmplY3QgQm9vbGVhbl1cIjpjYXNlXCJbb2JqZWN0IERhdGVdXCI6Y2FzZVwiW29iamVjdCBOdW1iZXJdXCI6cj1NKCtuLCt0KTticmVhayBuO2Nhc2VcIltvYmplY3QgRXJyb3JdXCI6cj1uLm5hbWU9PXQubmFtZSYmbi5tZXNzYWdlPT10Lm1lc3NhZ2U7YnJlYWsgbjtjYXNlXCJbb2JqZWN0IFJlZ0V4cF1cIjpjYXNlXCJbb2JqZWN0IFN0cmluZ11cIjpyPW49PXQrXCJcIjticmVhayBufXI9ZmFsc2V9cmV0dXJuIG8ucG9wKCkscn1yZXR1cm4gMSZyfHwoaT1sJiZwbi5jYWxsKG4sXCJfX3dyYXBwZWRfX1wiKSxmPWMmJnBuLmNhbGwodCxcIl9fd3JhcHBlZF9fXCIpLCFpJiYhZik/ISFhJiYocj1SKG4sdCxyLGUsdSxvKSxcbm8ucG9wKCkscik6KGk9aT9uLnZhbHVlKCk6bixmPWY/dC52YWx1ZSgpOnQscj11KGksZixyLGUsbyksby5wb3AoKSxyKX1mdW5jdGlvbiBfKG4pe3JldHVybiB0eXBlb2Ygbj09XCJmdW5jdGlvblwiP246bnVsbD09bj9ZOih0eXBlb2Ygbj09XCJvYmplY3RcIj9tOnIpKG4pfWZ1bmN0aW9uIGoobix0KXtyZXR1cm4gbjx0fWZ1bmN0aW9uIGQobix0KXt2YXIgcj0tMSxlPVUobik/QXJyYXkobi5sZW5ndGgpOltdO3JldHVybiBtbihuLGZ1bmN0aW9uKG4sdSxvKXtlWysrcl09dChuLHUsbyl9KSxlfWZ1bmN0aW9uIG0obil7dmFyIHQ9X24obik7cmV0dXJuIGZ1bmN0aW9uKHIpe3ZhciBlPXQubGVuZ3RoO2lmKG51bGw9PXIpcmV0dXJuIWU7Zm9yKHI9T2JqZWN0KHIpO2UtLTspe3ZhciB1PXRbZV07aWYoISh1IGluIHImJmIoblt1XSxyW3VdLDMpKSlyZXR1cm4gZmFsc2V9cmV0dXJuIHRydWV9fWZ1bmN0aW9uIE8obix0KXtyZXR1cm4gbj1PYmplY3QobiksRyh0LGZ1bmN0aW9uKHQscil7cmV0dXJuIHIgaW4gbiYmKHRbcl09bltyXSksXG50fSx7fSl9ZnVuY3Rpb24geChuKXtyZXR1cm4geG4ocShuLHZvaWQgMCxZKSxuK1wiXCIpfWZ1bmN0aW9uIEEobix0LHIpe3ZhciBlPS0xLHU9bi5sZW5ndGg7Zm9yKDA+dCYmKHQ9LXQ+dT8wOnUrdCkscj1yPnU/dTpyLDA+ciYmKHIrPXUpLHU9dD5yPzA6ci10Pj4+MCx0Pj4+PTAscj1BcnJheSh1KTsrK2U8dTspcltlXT1uW2UrdF07cmV0dXJuIHJ9ZnVuY3Rpb24gRShuKXtyZXR1cm4gQShuLDAsbi5sZW5ndGgpfWZ1bmN0aW9uIHcobix0KXt2YXIgcjtyZXR1cm4gbW4obixmdW5jdGlvbihuLGUsdSl7cmV0dXJuIHI9dChuLGUsdSksIXJ9KSwhIXJ9ZnVuY3Rpb24gayhuLHIpe3JldHVybiBHKHIsZnVuY3Rpb24obixyKXtyZXR1cm4gci5mdW5jLmFwcGx5KHIudGhpc0FyZyx0KFtuXSxyLmFyZ3MpKX0sbil9ZnVuY3Rpb24gTihuLHQscixlKXt2YXIgdT0hcjtyfHwocj17fSk7Zm9yKHZhciBvPS0xLGk9dC5sZW5ndGg7KytvPGk7KXt2YXIgYz10W29dLGY9ZT9lKHJbY10sbltjXSxjLHIsbik6bm47XG5pZihmPT09bm4mJihmPW5bY10pLHUpcltjXT1mO2Vsc2V7dmFyIGE9cixsPWFbY107cG4uY2FsbChhLGMpJiZNKGwsZikmJihmIT09bm58fGMgaW4gYSl8fChhW2NdPWYpfX1yZXR1cm4gcn1mdW5jdGlvbiBGKG4pe3JldHVybiB4KGZ1bmN0aW9uKHQscil7dmFyIGU9LTEsdT1yLmxlbmd0aCxvPTE8dT9yW3UtMV06bm4sbz0zPG4ubGVuZ3RoJiZ0eXBlb2Ygbz09XCJmdW5jdGlvblwiPyh1LS0sbyk6bm47Zm9yKHQ9T2JqZWN0KHQpOysrZTx1Oyl7dmFyIGk9cltlXTtpJiZuKHQsaSxlLG8pfXJldHVybiB0fSl9ZnVuY3Rpb24gUyhuKXtyZXR1cm4gZnVuY3Rpb24oKXt2YXIgdD1hcmd1bWVudHMscj1kbihuLnByb3RvdHlwZSksdD1uLmFwcGx5KHIsdCk7cmV0dXJuIEgodCk/dDpyfX1mdW5jdGlvbiBUKG4sdCxyKXtmdW5jdGlvbiBlKCl7Zm9yKHZhciBvPS0xLGk9YXJndW1lbnRzLmxlbmd0aCxjPS0xLGY9ci5sZW5ndGgsYT1BcnJheShmK2kpLGw9dGhpcyYmdGhpcyE9PW9uJiZ0aGlzIGluc3RhbmNlb2YgZT91Om47KytjPGY7KWFbY109cltjXTtcbmZvcig7aS0tOylhW2MrK109YXJndW1lbnRzWysrb107cmV0dXJuIGwuYXBwbHkodCxhKX1pZih0eXBlb2YgbiE9XCJmdW5jdGlvblwiKXRocm93IG5ldyBUeXBlRXJyb3IoXCJFeHBlY3RlZCBhIGZ1bmN0aW9uXCIpO3ZhciB1PVMobik7cmV0dXJuIGV9ZnVuY3Rpb24gQihuLHQscixlLHUsbyl7dmFyIGk9bi5sZW5ndGgsYz10Lmxlbmd0aDtpZihpIT1jJiYhKDEmciYmYz5pKSlyZXR1cm4gZmFsc2U7Zm9yKHZhciBjPS0xLGY9dHJ1ZSxhPTImcj9bXTpubjsrK2M8aTspe3ZhciBsPW5bY10scD10W2NdO2lmKHZvaWQgMCE9PW5uKXtmPWZhbHNlO2JyZWFrfWlmKGEpe2lmKCF3KHQsZnVuY3Rpb24obix0KXtpZigheihhLHQpJiYobD09PW58fHUobCxuLHIsZSxvKSkpcmV0dXJuIGEucHVzaCh0KX0pKXtmPWZhbHNlO2JyZWFrfX1lbHNlIGlmKGwhPT1wJiYhdShsLHAscixlLG8pKXtmPWZhbHNlO2JyZWFrfX1yZXR1cm4gZn1mdW5jdGlvbiBSKG4sdCxyLGUsdSxvKXt2YXIgaT0xJnIsYz1JbihuKSxmPWMubGVuZ3RoLGE9SW4odCkubGVuZ3RoO1xuaWYoZiE9YSYmIWkpcmV0dXJuIGZhbHNlO2Zvcih2YXIgbD1mO2wtLTspe3ZhciBwPWNbbF07aWYoIShpP3AgaW4gdDpwbi5jYWxsKHQscCkpKXJldHVybiBmYWxzZX1mb3IoYT10cnVlOysrbDxmOyl7dmFyIHA9Y1tsXSxzPW5bcF0saD10W3BdO2lmKHZvaWQgMCE9PW5ufHxzIT09aCYmIXUocyxoLHIsZSxvKSl7YT1mYWxzZTticmVha31pfHwoaT1cImNvbnN0cnVjdG9yXCI9PXApfXJldHVybiBhJiYhaSYmKHI9bi5jb25zdHJ1Y3RvcixlPXQuY29uc3RydWN0b3IsciE9ZSYmXCJjb25zdHJ1Y3RvclwiaW4gbiYmXCJjb25zdHJ1Y3RvclwiaW4gdCYmISh0eXBlb2Ygcj09XCJmdW5jdGlvblwiJiZyIGluc3RhbmNlb2YgciYmdHlwZW9mIGU9PVwiZnVuY3Rpb25cIiYmZSBpbnN0YW5jZW9mIGUpJiYoYT1mYWxzZSkpLGF9ZnVuY3Rpb24gRCh0KXtyZXR1cm4gTm4odCl8fG4odCl9ZnVuY3Rpb24gSShuKXt2YXIgdD1bXTtpZihudWxsIT1uKWZvcih2YXIgciBpbiBPYmplY3QobikpdC5wdXNoKHIpO3JldHVybiB0fWZ1bmN0aW9uIHEobix0LHIpe1xucmV0dXJuIHQ9am4odD09PW5uP24ubGVuZ3RoLTE6dCwwKSxmdW5jdGlvbigpe2Zvcih2YXIgZT1hcmd1bWVudHMsdT0tMSxvPWpuKGUubGVuZ3RoLXQsMCksaT1BcnJheShvKTsrK3U8bzspaVt1XT1lW3QrdV07Zm9yKHU9LTEsbz1BcnJheSh0KzEpOysrdTx0OylvW3VdPWVbdV07cmV0dXJuIG9bdF09cihpKSxuLmFwcGx5KHRoaXMsbyl9fWZ1bmN0aW9uICQobil7cmV0dXJuKG51bGw9PW4/MDpuLmxlbmd0aCk/cyhuLDEpOltdfWZ1bmN0aW9uIFAobil7cmV0dXJuIG4mJm4ubGVuZ3RoP25bMF06bm59ZnVuY3Rpb24geihuLHQscil7dmFyIGU9bnVsbD09bj8wOm4ubGVuZ3RoO3I9dHlwZW9mIHI9PVwibnVtYmVyXCI/MD5yP2puKGUrciwwKTpyOjAscj0ocnx8MCktMTtmb3IodmFyIHU9dD09PXQ7KytyPGU7KXt2YXIgbz1uW3JdO2lmKHU/bz09PXQ6byE9PW8pcmV0dXJuIHJ9cmV0dXJuLTF9ZnVuY3Rpb24gQyhuLHQpe3JldHVybiBtbihuLF8odCkpfWZ1bmN0aW9uIEcobix0LHIpe3JldHVybiBlKG4sXyh0KSxyLDM+YXJndW1lbnRzLmxlbmd0aCxtbik7XG59ZnVuY3Rpb24gSihuLHQpe3ZhciByO2lmKHR5cGVvZiB0IT1cImZ1bmN0aW9uXCIpdGhyb3cgbmV3IFR5cGVFcnJvcihcIkV4cGVjdGVkIGEgZnVuY3Rpb25cIik7cmV0dXJuIG49Rm4obiksZnVuY3Rpb24oKXtyZXR1cm4gMDwtLW4mJihyPXQuYXBwbHkodGhpcyxhcmd1bWVudHMpKSwxPj1uJiYodD1ubikscn19ZnVuY3Rpb24gTShuLHQpe3JldHVybiBuPT09dHx8biE9PW4mJnQhPT10fWZ1bmN0aW9uIFUobil7dmFyIHQ7cmV0dXJuKHQ9bnVsbCE9bikmJih0PW4ubGVuZ3RoLHQ9dHlwZW9mIHQ9PVwibnVtYmVyXCImJi0xPHQmJjA9PXQlMSYmOTAwNzE5OTI1NDc0MDk5MT49dCksdCYmIVYobil9ZnVuY3Rpb24gVihuKXtyZXR1cm4hIUgobikmJihuPWhuLmNhbGwobiksXCJbb2JqZWN0IEZ1bmN0aW9uXVwiPT1ufHxcIltvYmplY3QgR2VuZXJhdG9yRnVuY3Rpb25dXCI9PW58fFwiW29iamVjdCBBc3luY0Z1bmN0aW9uXVwiPT1ufHxcIltvYmplY3QgUHJveHldXCI9PW4pfWZ1bmN0aW9uIEgobil7dmFyIHQ9dHlwZW9mIG47XG5yZXR1cm4gbnVsbCE9biYmKFwib2JqZWN0XCI9PXR8fFwiZnVuY3Rpb25cIj09dCl9ZnVuY3Rpb24gSyhuKXtyZXR1cm4gbnVsbCE9biYmdHlwZW9mIG49PVwib2JqZWN0XCJ9ZnVuY3Rpb24gTChuKXtyZXR1cm4gdHlwZW9mIG49PVwibnVtYmVyXCJ8fEsobikmJlwiW29iamVjdCBOdW1iZXJdXCI9PWhuLmNhbGwobil9ZnVuY3Rpb24gUShuKXtyZXR1cm4gdHlwZW9mIG49PVwic3RyaW5nXCJ8fCFObihuKSYmSyhuKSYmXCJbb2JqZWN0IFN0cmluZ11cIj09aG4uY2FsbChuKX1mdW5jdGlvbiBXKG4pe3JldHVybiB0eXBlb2Ygbj09XCJzdHJpbmdcIj9uOm51bGw9PW4/XCJcIjpuK1wiXCJ9ZnVuY3Rpb24gWChuKXtyZXR1cm4gbnVsbD09bj9bXTp1KG4sSW4obikpfWZ1bmN0aW9uIFkobil7cmV0dXJuIG59ZnVuY3Rpb24gWihuLHIsZSl7dmFyIHU9SW4ociksbz12KHIsdSk7bnVsbCE9ZXx8SChyKSYmKG8ubGVuZ3RofHwhdS5sZW5ndGgpfHwoZT1yLHI9bixuPXRoaXMsbz12KHIsSW4ocikpKTt2YXIgaT0hKEgoZSkmJlwiY2hhaW5cImluIGUmJiFlLmNoYWluKSxjPVYobik7XG5yZXR1cm4gbW4obyxmdW5jdGlvbihlKXt2YXIgdT1yW2VdO25bZV09dSxjJiYobi5wcm90b3R5cGVbZV09ZnVuY3Rpb24oKXt2YXIgcj10aGlzLl9fY2hhaW5fXztpZihpfHxyKXt2YXIgZT1uKHRoaXMuX193cmFwcGVkX18pO3JldHVybihlLl9fYWN0aW9uc19fPUUodGhpcy5fX2FjdGlvbnNfXykpLnB1c2goe2Z1bmM6dSxhcmdzOmFyZ3VtZW50cyx0aGlzQXJnOm59KSxlLl9fY2hhaW5fXz1yLGV9cmV0dXJuIHUuYXBwbHkobix0KFt0aGlzLnZhbHVlKCldLGFyZ3VtZW50cykpfSl9KSxufXZhciBubix0bj0xLzAscm49L1smPD5cIiddL2csZW49UmVnRXhwKHJuLnNvdXJjZSksdW49dHlwZW9mIHNlbGY9PVwib2JqZWN0XCImJnNlbGYmJnNlbGYuT2JqZWN0PT09T2JqZWN0JiZzZWxmLG9uPXR5cGVvZiBnbG9iYWw9PVwib2JqZWN0XCImJmdsb2JhbCYmZ2xvYmFsLk9iamVjdD09PU9iamVjdCYmZ2xvYmFsfHx1bnx8RnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpLGNuPSh1bj10eXBlb2YgZXhwb3J0cz09XCJvYmplY3RcIiYmZXhwb3J0cyYmIWV4cG9ydHMubm9kZVR5cGUmJmV4cG9ydHMpJiZ0eXBlb2YgbW9kdWxlPT1cIm9iamVjdFwiJiZtb2R1bGUmJiFtb2R1bGUubm9kZVR5cGUmJm1vZHVsZSxmbj1mdW5jdGlvbihuKXtcbnJldHVybiBmdW5jdGlvbih0KXtyZXR1cm4gbnVsbD09bj9ubjpuW3RdfX0oe1wiJlwiOlwiJmFtcDtcIixcIjxcIjpcIiZsdDtcIixcIj5cIjpcIiZndDtcIiwnXCInOlwiJnF1b3Q7XCIsXCInXCI6XCImIzM5O1wifSksYW49QXJyYXkucHJvdG90eXBlLGxuPU9iamVjdC5wcm90b3R5cGUscG49bG4uaGFzT3duUHJvcGVydHksc249MCxobj1sbi50b1N0cmluZyx2bj1vbi5fLHluPU9iamVjdC5jcmVhdGUsYm49bG4ucHJvcGVydHlJc0VudW1lcmFibGUsZ249b24uaXNGaW5pdGUsX249ZnVuY3Rpb24obix0KXtyZXR1cm4gZnVuY3Rpb24ocil7cmV0dXJuIG4odChyKSl9fShPYmplY3Qua2V5cyxPYmplY3QpLGpuPU1hdGgubWF4LGRuPWZ1bmN0aW9uKCl7ZnVuY3Rpb24gbigpe31yZXR1cm4gZnVuY3Rpb24odCl7cmV0dXJuIEgodCk/eW4/eW4odCk6KG4ucHJvdG90eXBlPXQsdD1uZXcgbixuLnByb3RvdHlwZT1ubix0KTp7fX19KCk7aS5wcm90b3R5cGU9ZG4oby5wcm90b3R5cGUpLGkucHJvdG90eXBlLmNvbnN0cnVjdG9yPWk7XG52YXIgbW49ZnVuY3Rpb24obix0KXtyZXR1cm4gZnVuY3Rpb24ocixlKXtpZihudWxsPT1yKXJldHVybiByO2lmKCFVKHIpKXJldHVybiBuKHIsZSk7Zm9yKHZhciB1PXIubGVuZ3RoLG89dD91Oi0xLGk9T2JqZWN0KHIpOyh0P28tLTorK288dSkmJmZhbHNlIT09ZShpW29dLG8saSk7KTtyZXR1cm4gcn19KGgpLE9uPWZ1bmN0aW9uKG4pe3JldHVybiBmdW5jdGlvbih0LHIsZSl7dmFyIHU9LTEsbz1PYmplY3QodCk7ZT1lKHQpO2Zvcih2YXIgaT1lLmxlbmd0aDtpLS07KXt2YXIgYz1lW24/aTorK3VdO2lmKGZhbHNlPT09cihvW2NdLGMsbykpYnJlYWt9cmV0dXJuIHR9fSgpLHhuPVksQW49ZnVuY3Rpb24obil7cmV0dXJuIGZ1bmN0aW9uKHQscixlKXt2YXIgdT1PYmplY3QodCk7aWYoIVUodCkpe3ZhciBvPV8ocik7dD1Jbih0KSxyPWZ1bmN0aW9uKG4pe3JldHVybiBvKHVbbl0sbix1KX19cmV0dXJuIHI9bih0LHIsZSksLTE8cj91W28/dFtyXTpyXTpubn19KGZ1bmN0aW9uKG4sdCxyKXt2YXIgZT1udWxsPT1uPzA6bi5sZW5ndGg7XG5pZighZSlyZXR1cm4tMTtyPW51bGw9PXI/MDpGbihyKSwwPnImJihyPWpuKGUrciwwKSk7bjp7Zm9yKHQ9Xyh0KSxlPW4ubGVuZ3RoLHIrPS0xOysrcjxlOylpZih0KG5bcl0scixuKSl7bj1yO2JyZWFrIG59bj0tMX1yZXR1cm4gbn0pLEVuPXgoZnVuY3Rpb24obix0LHIpe3JldHVybiBUKG4sdCxyKX0pLHduPXgoZnVuY3Rpb24obix0KXtyZXR1cm4gZihuLDEsdCl9KSxrbj14KGZ1bmN0aW9uKG4sdCxyKXtyZXR1cm4gZihuLFNuKHQpfHwwLHIpfSksTm49QXJyYXkuaXNBcnJheSxGbj1OdW1iZXIsU249TnVtYmVyLFRuPUYoZnVuY3Rpb24obix0KXtOKHQsX24odCksbil9KSxCbj1GKGZ1bmN0aW9uKG4sdCl7Tih0LEkodCksbil9KSxSbj1GKGZ1bmN0aW9uKG4sdCxyLGUpe04odCxxbih0KSxuLGUpfSksRG49eChmdW5jdGlvbihuKXtyZXR1cm4gbi5wdXNoKG5uLGMpLFJuLmFwcGx5KG5uLG4pfSksSW49X24scW49SSwkbj1mdW5jdGlvbihuKXtyZXR1cm4geG4ocShuLG5uLCQpLG4rXCJcIik7XG59KGZ1bmN0aW9uKG4sdCl7cmV0dXJuIG51bGw9PW4/e306TyhuLHQpfSk7by5hc3NpZ25Jbj1CbixvLmJlZm9yZT1KLG8uYmluZD1FbixvLmNoYWluPWZ1bmN0aW9uKG4pe3JldHVybiBuPW8obiksbi5fX2NoYWluX189dHJ1ZSxufSxvLmNvbXBhY3Q9ZnVuY3Rpb24obil7cmV0dXJuIHAobixCb29sZWFuKX0sby5jb25jYXQ9ZnVuY3Rpb24oKXt2YXIgbj1hcmd1bWVudHMubGVuZ3RoO2lmKCFuKXJldHVybltdO2Zvcih2YXIgcj1BcnJheShuLTEpLGU9YXJndW1lbnRzWzBdO24tLTspcltuLTFdPWFyZ3VtZW50c1tuXTtyZXR1cm4gdChObihlKT9FKGUpOltlXSxzKHIsMSkpfSxvLmNyZWF0ZT1mdW5jdGlvbihuLHQpe3ZhciByPWRuKG4pO3JldHVybiBudWxsPT10P3I6VG4ocix0KX0sby5kZWZhdWx0cz1EbixvLmRlZmVyPXduLG8uZGVsYXk9a24sby5maWx0ZXI9ZnVuY3Rpb24obix0KXtyZXR1cm4gcChuLF8odCkpfSxvLmZsYXR0ZW49JCxvLmZsYXR0ZW5EZWVwPWZ1bmN0aW9uKG4pe1xucmV0dXJuKG51bGw9PW4/MDpuLmxlbmd0aCk/cyhuLHRuKTpbXX0sby5pdGVyYXRlZT1fLG8ua2V5cz1JbixvLm1hcD1mdW5jdGlvbihuLHQpe3JldHVybiBkKG4sXyh0KSl9LG8ubWF0Y2hlcz1mdW5jdGlvbihuKXtyZXR1cm4gbShUbih7fSxuKSl9LG8ubWl4aW49WixvLm5lZ2F0ZT1mdW5jdGlvbihuKXtpZih0eXBlb2YgbiE9XCJmdW5jdGlvblwiKXRocm93IG5ldyBUeXBlRXJyb3IoXCJFeHBlY3RlZCBhIGZ1bmN0aW9uXCIpO3JldHVybiBmdW5jdGlvbigpe3JldHVybiFuLmFwcGx5KHRoaXMsYXJndW1lbnRzKX19LG8ub25jZT1mdW5jdGlvbihuKXtyZXR1cm4gSigyLG4pfSxvLnBpY2s9JG4sby5zbGljZT1mdW5jdGlvbihuLHQscil7dmFyIGU9bnVsbD09bj8wOm4ubGVuZ3RoO3JldHVybiByPXI9PT1ubj9lOityLGU/QShuLG51bGw9PXQ/MDordCxyKTpbXX0sby5zb3J0Qnk9ZnVuY3Rpb24obix0KXt2YXIgZT0wO3JldHVybiB0PV8odCksZChkKG4sZnVuY3Rpb24obixyLHUpe3JldHVybntcbnZhbHVlOm4saW5kZXg6ZSsrLGNyaXRlcmlhOnQobixyLHUpfX0pLnNvcnQoZnVuY3Rpb24obix0KXt2YXIgcjtuOntyPW4uY3JpdGVyaWE7dmFyIGU9dC5jcml0ZXJpYTtpZihyIT09ZSl7dmFyIHU9ciE9PW5uLG89bnVsbD09PXIsaT1yPT09cixjPWUhPT1ubixmPW51bGw9PT1lLGE9ZT09PWU7aWYoIWYmJnI+ZXx8byYmYyYmYXx8IXUmJmF8fCFpKXtyPTE7YnJlYWsgbn1pZighbyYmcjxlfHxmJiZ1JiZpfHwhYyYmaXx8IWEpe3I9LTE7YnJlYWsgbn19cj0wfXJldHVybiByfHxuLmluZGV4LXQuaW5kZXh9KSxyKFwidmFsdWVcIikpfSxvLnRhcD1mdW5jdGlvbihuLHQpe3JldHVybiB0KG4pLG59LG8udGhydT1mdW5jdGlvbihuLHQpe3JldHVybiB0KG4pfSxvLnRvQXJyYXk9ZnVuY3Rpb24obil7cmV0dXJuIFUobik/bi5sZW5ndGg/RShuKTpbXTpYKG4pfSxvLnZhbHVlcz1YLG8uZXh0ZW5kPUJuLFoobyxvKSxvLmNsb25lPWZ1bmN0aW9uKG4pe3JldHVybiBIKG4pP05uKG4pP0Uobik6TihuLF9uKG4pKTpuO1xufSxvLmVzY2FwZT1mdW5jdGlvbihuKXtyZXR1cm4obj1XKG4pKSYmZW4udGVzdChuKT9uLnJlcGxhY2Uocm4sZm4pOm59LG8uZXZlcnk9ZnVuY3Rpb24obix0LHIpe3JldHVybiB0PXI/bm46dCxhKG4sXyh0KSl9LG8uZmluZD1BbixvLmZvckVhY2g9QyxvLmhhcz1mdW5jdGlvbihuLHQpe3JldHVybiBudWxsIT1uJiZwbi5jYWxsKG4sdCl9LG8uaGVhZD1QLG8uaWRlbnRpdHk9WSxvLmluZGV4T2Y9eixvLmlzQXJndW1lbnRzPW4sby5pc0FycmF5PU5uLG8uaXNCb29sZWFuPWZ1bmN0aW9uKG4pe3JldHVybiB0cnVlPT09bnx8ZmFsc2U9PT1ufHxLKG4pJiZcIltvYmplY3QgQm9vbGVhbl1cIj09aG4uY2FsbChuKX0sby5pc0RhdGU9ZnVuY3Rpb24obil7cmV0dXJuIEsobikmJlwiW29iamVjdCBEYXRlXVwiPT1obi5jYWxsKG4pfSxvLmlzRW1wdHk9ZnVuY3Rpb24odCl7cmV0dXJuIFUodCkmJihObih0KXx8USh0KXx8Vih0LnNwbGljZSl8fG4odCkpPyF0Lmxlbmd0aDohX24odCkubGVuZ3RofSxvLmlzRXF1YWw9ZnVuY3Rpb24obix0KXtcbnJldHVybiBiKG4sdCl9LG8uaXNGaW5pdGU9ZnVuY3Rpb24obil7cmV0dXJuIHR5cGVvZiBuPT1cIm51bWJlclwiJiZnbihuKX0sby5pc0Z1bmN0aW9uPVYsby5pc05hTj1mdW5jdGlvbihuKXtyZXR1cm4gTChuKSYmbiE9K259LG8uaXNOdWxsPWZ1bmN0aW9uKG4pe3JldHVybiBudWxsPT09bn0sby5pc051bWJlcj1MLG8uaXNPYmplY3Q9SCxvLmlzUmVnRXhwPWZ1bmN0aW9uKG4pe3JldHVybiBLKG4pJiZcIltvYmplY3QgUmVnRXhwXVwiPT1obi5jYWxsKG4pfSxvLmlzU3RyaW5nPVEsby5pc1VuZGVmaW5lZD1mdW5jdGlvbihuKXtyZXR1cm4gbj09PW5ufSxvLmxhc3Q9ZnVuY3Rpb24obil7dmFyIHQ9bnVsbD09bj8wOm4ubGVuZ3RoO3JldHVybiB0P25bdC0xXTpubn0sby5tYXg9ZnVuY3Rpb24obil7cmV0dXJuIG4mJm4ubGVuZ3RoP2wobixZLHkpOm5ufSxvLm1pbj1mdW5jdGlvbihuKXtyZXR1cm4gbiYmbi5sZW5ndGg/bChuLFksaik6bm59LG8ubm9Db25mbGljdD1mdW5jdGlvbigpe3JldHVybiBvbi5fPT09dGhpcyYmKG9uLl89dm4pLFxudGhpc30sby5ub29wPWZ1bmN0aW9uKCl7fSxvLnJlZHVjZT1HLG8ucmVzdWx0PWZ1bmN0aW9uKG4sdCxyKXtyZXR1cm4gdD1udWxsPT1uP25uOm5bdF0sdD09PW5uJiYodD1yKSxWKHQpP3QuY2FsbChuKTp0fSxvLnNpemU9ZnVuY3Rpb24obil7cmV0dXJuIG51bGw9PW4/MDoobj1VKG4pP246X24obiksbi5sZW5ndGgpfSxvLnNvbWU9ZnVuY3Rpb24obix0LHIpe3JldHVybiB0PXI/bm46dCx3KG4sXyh0KSl9LG8udW5pcXVlSWQ9ZnVuY3Rpb24obil7dmFyIHQ9KytzbjtyZXR1cm4gVyhuKSt0fSxvLmVhY2g9QyxvLmZpcnN0PVAsWihvLGZ1bmN0aW9uKCl7dmFyIG49e307cmV0dXJuIGgobyxmdW5jdGlvbih0LHIpe3BuLmNhbGwoby5wcm90b3R5cGUscil8fChuW3JdPXQpfSksbn0oKSx7Y2hhaW46ZmFsc2V9KSxvLlZFUlNJT049XCI0LjE3LjJcIixtbihcInBvcCBqb2luIHJlcGxhY2UgcmV2ZXJzZSBzcGxpdCBwdXNoIHNoaWZ0IHNvcnQgc3BsaWNlIHVuc2hpZnRcIi5zcGxpdChcIiBcIiksZnVuY3Rpb24obil7XG52YXIgdD0oL14oPzpyZXBsYWNlfHNwbGl0KSQvLnRlc3Qobik/U3RyaW5nLnByb3RvdHlwZTphbilbbl0scj0vXig/OnB1c2h8c29ydHx1bnNoaWZ0KSQvLnRlc3Qobik/XCJ0YXBcIjpcInRocnVcIixlPS9eKD86cG9wfGpvaW58cmVwbGFjZXxzaGlmdCkkLy50ZXN0KG4pO28ucHJvdG90eXBlW25dPWZ1bmN0aW9uKCl7dmFyIG49YXJndW1lbnRzO2lmKGUmJiF0aGlzLl9fY2hhaW5fXyl7dmFyIHU9dGhpcy52YWx1ZSgpO3JldHVybiB0LmFwcGx5KE5uKHUpP3U6W10sbil9cmV0dXJuIHRoaXNbcl0oZnVuY3Rpb24ocil7cmV0dXJuIHQuYXBwbHkoTm4ocik/cjpbXSxuKX0pfX0pLG8ucHJvdG90eXBlLnRvSlNPTj1vLnByb3RvdHlwZS52YWx1ZU9mPW8ucHJvdG90eXBlLnZhbHVlPWZ1bmN0aW9uKCl7cmV0dXJuIGsodGhpcy5fX3dyYXBwZWRfXyx0aGlzLl9fYWN0aW9uc19fKX0sdHlwZW9mIGRlZmluZT09XCJmdW5jdGlvblwiJiZ0eXBlb2YgZGVmaW5lLmFtZD09XCJvYmplY3RcIiYmZGVmaW5lLmFtZD8ob24uXz1vLFxuZGVmaW5lKGZ1bmN0aW9uKCl7cmV0dXJuIG99KSk6Y24/KChjbi5leHBvcnRzPW8pLl89byx1bi5fPW8pOm9uLl89b30pLmNhbGwodGhpcyk7XG4iLCIvKlxuICAgICBfIF8gICAgICBfICAgICAgIF9cbiBfX198IChfKSBfX198IHwgX18gIChfKV9fX1xuLyBfX3wgfCB8LyBfX3wgfC8gLyAgfCAvIF9ffFxuXFxfXyBcXCB8IHwgKF9ffCAgIDwgXyB8IFxcX18gXFxcbnxfX18vX3xffFxcX19ffF98XFxfKF8pLyB8X19fL1xuICAgICAgICAgICAgICAgICAgIHxfXy9cblxuIFZlcnNpb246IDEuNi4wXG4gIEF1dGhvcjogS2VuIFdoZWVsZXJcbiBXZWJzaXRlOiBodHRwOi8va2Vud2hlZWxlci5naXRodWIuaW9cbiAgICBEb2NzOiBodHRwOi8va2Vud2hlZWxlci5naXRodWIuaW8vc2xpY2tcbiAgICBSZXBvOiBodHRwOi8vZ2l0aHViLmNvbS9rZW53aGVlbGVyL3NsaWNrXG4gIElzc3VlczogaHR0cDovL2dpdGh1Yi5jb20va2Vud2hlZWxlci9zbGljay9pc3N1ZXNcblxuICovXG4hZnVuY3Rpb24oYSl7XCJ1c2Ugc3RyaWN0XCI7XCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kP2RlZmluZShbXCJqcXVlcnlcIl0sYSk6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIGV4cG9ydHM/bW9kdWxlLmV4cG9ydHM9YShyZXF1aXJlKFwianF1ZXJ5XCIpKTphKGpRdWVyeSl9KGZ1bmN0aW9uKGEpe1widXNlIHN0cmljdFwiO3ZhciBiPXdpbmRvdy5TbGlja3x8e307Yj1mdW5jdGlvbigpe2Z1bmN0aW9uIGMoYyxkKXt2YXIgZixlPXRoaXM7ZS5kZWZhdWx0cz17YWNjZXNzaWJpbGl0eTohMCxhZGFwdGl2ZUhlaWdodDohMSxhcHBlbmRBcnJvd3M6YShjKSxhcHBlbmREb3RzOmEoYyksYXJyb3dzOiEwLGFzTmF2Rm9yOm51bGwscHJldkFycm93Oic8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBkYXRhLXJvbGU9XCJub25lXCIgY2xhc3M9XCJzbGljay1wcmV2XCIgYXJpYS1sYWJlbD1cIlByZXZpb3VzXCIgdGFiaW5kZXg9XCIwXCIgcm9sZT1cImJ1dHRvblwiPlByZXZpb3VzPC9idXR0b24+JyxuZXh0QXJyb3c6JzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGRhdGEtcm9sZT1cIm5vbmVcIiBjbGFzcz1cInNsaWNrLW5leHRcIiBhcmlhLWxhYmVsPVwiTmV4dFwiIHRhYmluZGV4PVwiMFwiIHJvbGU9XCJidXR0b25cIj5OZXh0PC9idXR0b24+JyxhdXRvcGxheTohMSxhdXRvcGxheVNwZWVkOjNlMyxjZW50ZXJNb2RlOiExLGNlbnRlclBhZGRpbmc6XCI1MHB4XCIsY3NzRWFzZTpcImVhc2VcIixjdXN0b21QYWdpbmc6ZnVuY3Rpb24oYixjKXtyZXR1cm4gYSgnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgZGF0YS1yb2xlPVwibm9uZVwiIHJvbGU9XCJidXR0b25cIiB0YWJpbmRleD1cIjBcIiAvPicpLnRleHQoYysxKX0sZG90czohMSxkb3RzQ2xhc3M6XCJzbGljay1kb3RzXCIsZHJhZ2dhYmxlOiEwLGVhc2luZzpcImxpbmVhclwiLGVkZ2VGcmljdGlvbjouMzUsZmFkZTohMSxmb2N1c09uU2VsZWN0OiExLGluZmluaXRlOiEwLGluaXRpYWxTbGlkZTowLGxhenlMb2FkOlwib25kZW1hbmRcIixtb2JpbGVGaXJzdDohMSxwYXVzZU9uSG92ZXI6ITAscGF1c2VPbkZvY3VzOiEwLHBhdXNlT25Eb3RzSG92ZXI6ITEscmVzcG9uZFRvOlwid2luZG93XCIscmVzcG9uc2l2ZTpudWxsLHJvd3M6MSxydGw6ITEsc2xpZGU6XCJcIixzbGlkZXNQZXJSb3c6MSxzbGlkZXNUb1Nob3c6MSxzbGlkZXNUb1Njcm9sbDoxLHNwZWVkOjUwMCxzd2lwZTohMCxzd2lwZVRvU2xpZGU6ITEsdG91Y2hNb3ZlOiEwLHRvdWNoVGhyZXNob2xkOjUsdXNlQ1NTOiEwLHVzZVRyYW5zZm9ybTohMCx2YXJpYWJsZVdpZHRoOiExLHZlcnRpY2FsOiExLHZlcnRpY2FsU3dpcGluZzohMSx3YWl0Rm9yQW5pbWF0ZTohMCx6SW5kZXg6MWUzfSxlLmluaXRpYWxzPXthbmltYXRpbmc6ITEsZHJhZ2dpbmc6ITEsYXV0b1BsYXlUaW1lcjpudWxsLGN1cnJlbnREaXJlY3Rpb246MCxjdXJyZW50TGVmdDpudWxsLGN1cnJlbnRTbGlkZTowLGRpcmVjdGlvbjoxLCRkb3RzOm51bGwsbGlzdFdpZHRoOm51bGwsbGlzdEhlaWdodDpudWxsLGxvYWRJbmRleDowLCRuZXh0QXJyb3c6bnVsbCwkcHJldkFycm93Om51bGwsc2xpZGVDb3VudDpudWxsLHNsaWRlV2lkdGg6bnVsbCwkc2xpZGVUcmFjazpudWxsLCRzbGlkZXM6bnVsbCxzbGlkaW5nOiExLHNsaWRlT2Zmc2V0OjAsc3dpcGVMZWZ0Om51bGwsJGxpc3Q6bnVsbCx0b3VjaE9iamVjdDp7fSx0cmFuc2Zvcm1zRW5hYmxlZDohMSx1bnNsaWNrZWQ6ITF9LGEuZXh0ZW5kKGUsZS5pbml0aWFscyksZS5hY3RpdmVCcmVha3BvaW50PW51bGwsZS5hbmltVHlwZT1udWxsLGUuYW5pbVByb3A9bnVsbCxlLmJyZWFrcG9pbnRzPVtdLGUuYnJlYWtwb2ludFNldHRpbmdzPVtdLGUuY3NzVHJhbnNpdGlvbnM9ITEsZS5mb2N1c3NlZD0hMSxlLmludGVycnVwdGVkPSExLGUuaGlkZGVuPVwiaGlkZGVuXCIsZS5wYXVzZWQ9ITAsZS5wb3NpdGlvblByb3A9bnVsbCxlLnJlc3BvbmRUbz1udWxsLGUucm93Q291bnQ9MSxlLnNob3VsZENsaWNrPSEwLGUuJHNsaWRlcj1hKGMpLGUuJHNsaWRlc0NhY2hlPW51bGwsZS50cmFuc2Zvcm1UeXBlPW51bGwsZS50cmFuc2l0aW9uVHlwZT1udWxsLGUudmlzaWJpbGl0eUNoYW5nZT1cInZpc2liaWxpdHljaGFuZ2VcIixlLndpbmRvd1dpZHRoPTAsZS53aW5kb3dUaW1lcj1udWxsLGY9YShjKS5kYXRhKFwic2xpY2tcIil8fHt9LGUub3B0aW9ucz1hLmV4dGVuZCh7fSxlLmRlZmF1bHRzLGQsZiksZS5jdXJyZW50U2xpZGU9ZS5vcHRpb25zLmluaXRpYWxTbGlkZSxlLm9yaWdpbmFsU2V0dGluZ3M9ZS5vcHRpb25zLFwidW5kZWZpbmVkXCIhPXR5cGVvZiBkb2N1bWVudC5tb3pIaWRkZW4/KGUuaGlkZGVuPVwibW96SGlkZGVuXCIsZS52aXNpYmlsaXR5Q2hhbmdlPVwibW96dmlzaWJpbGl0eWNoYW5nZVwiKTpcInVuZGVmaW5lZFwiIT10eXBlb2YgZG9jdW1lbnQud2Via2l0SGlkZGVuJiYoZS5oaWRkZW49XCJ3ZWJraXRIaWRkZW5cIixlLnZpc2liaWxpdHlDaGFuZ2U9XCJ3ZWJraXR2aXNpYmlsaXR5Y2hhbmdlXCIpLGUuYXV0b1BsYXk9YS5wcm94eShlLmF1dG9QbGF5LGUpLGUuYXV0b1BsYXlDbGVhcj1hLnByb3h5KGUuYXV0b1BsYXlDbGVhcixlKSxlLmF1dG9QbGF5SXRlcmF0b3I9YS5wcm94eShlLmF1dG9QbGF5SXRlcmF0b3IsZSksZS5jaGFuZ2VTbGlkZT1hLnByb3h5KGUuY2hhbmdlU2xpZGUsZSksZS5jbGlja0hhbmRsZXI9YS5wcm94eShlLmNsaWNrSGFuZGxlcixlKSxlLnNlbGVjdEhhbmRsZXI9YS5wcm94eShlLnNlbGVjdEhhbmRsZXIsZSksZS5zZXRQb3NpdGlvbj1hLnByb3h5KGUuc2V0UG9zaXRpb24sZSksZS5zd2lwZUhhbmRsZXI9YS5wcm94eShlLnN3aXBlSGFuZGxlcixlKSxlLmRyYWdIYW5kbGVyPWEucHJveHkoZS5kcmFnSGFuZGxlcixlKSxlLmtleUhhbmRsZXI9YS5wcm94eShlLmtleUhhbmRsZXIsZSksZS5pbnN0YW5jZVVpZD1iKyssZS5odG1sRXhwcj0vXig/OlxccyooPFtcXHdcXFddKz4pW14+XSopJC8sZS5yZWdpc3RlckJyZWFrcG9pbnRzKCksZS5pbml0KCEwKX12YXIgYj0wO3JldHVybiBjfSgpLGIucHJvdG90eXBlLmFjdGl2YXRlQURBPWZ1bmN0aW9uKCl7dmFyIGE9dGhpczthLiRzbGlkZVRyYWNrLmZpbmQoXCIuc2xpY2stYWN0aXZlXCIpLmF0dHIoe1wiYXJpYS1oaWRkZW5cIjpcImZhbHNlXCJ9KS5maW5kKFwiYSwgaW5wdXQsIGJ1dHRvbiwgc2VsZWN0XCIpLmF0dHIoe3RhYmluZGV4OlwiMFwifSl9LGIucHJvdG90eXBlLmFkZFNsaWRlPWIucHJvdG90eXBlLnNsaWNrQWRkPWZ1bmN0aW9uKGIsYyxkKXt2YXIgZT10aGlzO2lmKFwiYm9vbGVhblwiPT10eXBlb2YgYylkPWMsYz1udWxsO2Vsc2UgaWYoMD5jfHxjPj1lLnNsaWRlQ291bnQpcmV0dXJuITE7ZS51bmxvYWQoKSxcIm51bWJlclwiPT10eXBlb2YgYz8wPT09YyYmMD09PWUuJHNsaWRlcy5sZW5ndGg/YShiKS5hcHBlbmRUbyhlLiRzbGlkZVRyYWNrKTpkP2EoYikuaW5zZXJ0QmVmb3JlKGUuJHNsaWRlcy5lcShjKSk6YShiKS5pbnNlcnRBZnRlcihlLiRzbGlkZXMuZXEoYykpOmQ9PT0hMD9hKGIpLnByZXBlbmRUbyhlLiRzbGlkZVRyYWNrKTphKGIpLmFwcGVuZFRvKGUuJHNsaWRlVHJhY2spLGUuJHNsaWRlcz1lLiRzbGlkZVRyYWNrLmNoaWxkcmVuKHRoaXMub3B0aW9ucy5zbGlkZSksZS4kc2xpZGVUcmFjay5jaGlsZHJlbih0aGlzLm9wdGlvbnMuc2xpZGUpLmRldGFjaCgpLGUuJHNsaWRlVHJhY2suYXBwZW5kKGUuJHNsaWRlcyksZS4kc2xpZGVzLmVhY2goZnVuY3Rpb24oYixjKXthKGMpLmF0dHIoXCJkYXRhLXNsaWNrLWluZGV4XCIsYil9KSxlLiRzbGlkZXNDYWNoZT1lLiRzbGlkZXMsZS5yZWluaXQoKX0sYi5wcm90b3R5cGUuYW5pbWF0ZUhlaWdodD1mdW5jdGlvbigpe3ZhciBhPXRoaXM7aWYoMT09PWEub3B0aW9ucy5zbGlkZXNUb1Nob3cmJmEub3B0aW9ucy5hZGFwdGl2ZUhlaWdodD09PSEwJiZhLm9wdGlvbnMudmVydGljYWw9PT0hMSl7dmFyIGI9YS4kc2xpZGVzLmVxKGEuY3VycmVudFNsaWRlKS5vdXRlckhlaWdodCghMCk7YS4kbGlzdC5hbmltYXRlKHtoZWlnaHQ6Yn0sYS5vcHRpb25zLnNwZWVkKX19LGIucHJvdG90eXBlLmFuaW1hdGVTbGlkZT1mdW5jdGlvbihiLGMpe3ZhciBkPXt9LGU9dGhpcztlLmFuaW1hdGVIZWlnaHQoKSxlLm9wdGlvbnMucnRsPT09ITAmJmUub3B0aW9ucy52ZXJ0aWNhbD09PSExJiYoYj0tYiksZS50cmFuc2Zvcm1zRW5hYmxlZD09PSExP2Uub3B0aW9ucy52ZXJ0aWNhbD09PSExP2UuJHNsaWRlVHJhY2suYW5pbWF0ZSh7bGVmdDpifSxlLm9wdGlvbnMuc3BlZWQsZS5vcHRpb25zLmVhc2luZyxjKTplLiRzbGlkZVRyYWNrLmFuaW1hdGUoe3RvcDpifSxlLm9wdGlvbnMuc3BlZWQsZS5vcHRpb25zLmVhc2luZyxjKTplLmNzc1RyYW5zaXRpb25zPT09ITE/KGUub3B0aW9ucy5ydGw9PT0hMCYmKGUuY3VycmVudExlZnQ9LWUuY3VycmVudExlZnQpLGEoe2FuaW1TdGFydDplLmN1cnJlbnRMZWZ0fSkuYW5pbWF0ZSh7YW5pbVN0YXJ0OmJ9LHtkdXJhdGlvbjplLm9wdGlvbnMuc3BlZWQsZWFzaW5nOmUub3B0aW9ucy5lYXNpbmcsc3RlcDpmdW5jdGlvbihhKXthPU1hdGguY2VpbChhKSxlLm9wdGlvbnMudmVydGljYWw9PT0hMT8oZFtlLmFuaW1UeXBlXT1cInRyYW5zbGF0ZShcIithK1wicHgsIDBweClcIixlLiRzbGlkZVRyYWNrLmNzcyhkKSk6KGRbZS5hbmltVHlwZV09XCJ0cmFuc2xhdGUoMHB4LFwiK2ErXCJweClcIixlLiRzbGlkZVRyYWNrLmNzcyhkKSl9LGNvbXBsZXRlOmZ1bmN0aW9uKCl7YyYmYy5jYWxsKCl9fSkpOihlLmFwcGx5VHJhbnNpdGlvbigpLGI9TWF0aC5jZWlsKGIpLGUub3B0aW9ucy52ZXJ0aWNhbD09PSExP2RbZS5hbmltVHlwZV09XCJ0cmFuc2xhdGUzZChcIitiK1wicHgsIDBweCwgMHB4KVwiOmRbZS5hbmltVHlwZV09XCJ0cmFuc2xhdGUzZCgwcHgsXCIrYitcInB4LCAwcHgpXCIsZS4kc2xpZGVUcmFjay5jc3MoZCksYyYmc2V0VGltZW91dChmdW5jdGlvbigpe2UuZGlzYWJsZVRyYW5zaXRpb24oKSxjLmNhbGwoKX0sZS5vcHRpb25zLnNwZWVkKSl9LGIucHJvdG90eXBlLmdldE5hdlRhcmdldD1mdW5jdGlvbigpe3ZhciBiPXRoaXMsYz1iLm9wdGlvbnMuYXNOYXZGb3I7cmV0dXJuIGMmJm51bGwhPT1jJiYoYz1hKGMpLm5vdChiLiRzbGlkZXIpKSxjfSxiLnByb3RvdHlwZS5hc05hdkZvcj1mdW5jdGlvbihiKXt2YXIgYz10aGlzLGQ9Yy5nZXROYXZUYXJnZXQoKTtudWxsIT09ZCYmXCJvYmplY3RcIj09dHlwZW9mIGQmJmQuZWFjaChmdW5jdGlvbigpe3ZhciBjPWEodGhpcykuc2xpY2soXCJnZXRTbGlja1wiKTtjLnVuc2xpY2tlZHx8Yy5zbGlkZUhhbmRsZXIoYiwhMCl9KX0sYi5wcm90b3R5cGUuYXBwbHlUcmFuc2l0aW9uPWZ1bmN0aW9uKGEpe3ZhciBiPXRoaXMsYz17fTtiLm9wdGlvbnMuZmFkZT09PSExP2NbYi50cmFuc2l0aW9uVHlwZV09Yi50cmFuc2Zvcm1UeXBlK1wiIFwiK2Iub3B0aW9ucy5zcGVlZCtcIm1zIFwiK2Iub3B0aW9ucy5jc3NFYXNlOmNbYi50cmFuc2l0aW9uVHlwZV09XCJvcGFjaXR5IFwiK2Iub3B0aW9ucy5zcGVlZCtcIm1zIFwiK2Iub3B0aW9ucy5jc3NFYXNlLGIub3B0aW9ucy5mYWRlPT09ITE/Yi4kc2xpZGVUcmFjay5jc3MoYyk6Yi4kc2xpZGVzLmVxKGEpLmNzcyhjKX0sYi5wcm90b3R5cGUuYXV0b1BsYXk9ZnVuY3Rpb24oKXt2YXIgYT10aGlzO2EuYXV0b1BsYXlDbGVhcigpLGEuc2xpZGVDb3VudD5hLm9wdGlvbnMuc2xpZGVzVG9TaG93JiYoYS5hdXRvUGxheVRpbWVyPXNldEludGVydmFsKGEuYXV0b1BsYXlJdGVyYXRvcixhLm9wdGlvbnMuYXV0b3BsYXlTcGVlZCkpfSxiLnByb3RvdHlwZS5hdXRvUGxheUNsZWFyPWZ1bmN0aW9uKCl7dmFyIGE9dGhpczthLmF1dG9QbGF5VGltZXImJmNsZWFySW50ZXJ2YWwoYS5hdXRvUGxheVRpbWVyKX0sYi5wcm90b3R5cGUuYXV0b1BsYXlJdGVyYXRvcj1mdW5jdGlvbigpe3ZhciBhPXRoaXMsYj1hLmN1cnJlbnRTbGlkZSthLm9wdGlvbnMuc2xpZGVzVG9TY3JvbGw7YS5wYXVzZWR8fGEuaW50ZXJydXB0ZWR8fGEuZm9jdXNzZWR8fChhLm9wdGlvbnMuaW5maW5pdGU9PT0hMSYmKDE9PT1hLmRpcmVjdGlvbiYmYS5jdXJyZW50U2xpZGUrMT09PWEuc2xpZGVDb3VudC0xP2EuZGlyZWN0aW9uPTA6MD09PWEuZGlyZWN0aW9uJiYoYj1hLmN1cnJlbnRTbGlkZS1hLm9wdGlvbnMuc2xpZGVzVG9TY3JvbGwsYS5jdXJyZW50U2xpZGUtMT09PTAmJihhLmRpcmVjdGlvbj0xKSkpLGEuc2xpZGVIYW5kbGVyKGIpKX0sYi5wcm90b3R5cGUuYnVpbGRBcnJvd3M9ZnVuY3Rpb24oKXt2YXIgYj10aGlzO2Iub3B0aW9ucy5hcnJvd3M9PT0hMCYmKGIuJHByZXZBcnJvdz1hKGIub3B0aW9ucy5wcmV2QXJyb3cpLmFkZENsYXNzKFwic2xpY2stYXJyb3dcIiksYi4kbmV4dEFycm93PWEoYi5vcHRpb25zLm5leHRBcnJvdykuYWRkQ2xhc3MoXCJzbGljay1hcnJvd1wiKSxiLnNsaWRlQ291bnQ+Yi5vcHRpb25zLnNsaWRlc1RvU2hvdz8oYi4kcHJldkFycm93LnJlbW92ZUNsYXNzKFwic2xpY2staGlkZGVuXCIpLnJlbW92ZUF0dHIoXCJhcmlhLWhpZGRlbiB0YWJpbmRleFwiKSxiLiRuZXh0QXJyb3cucmVtb3ZlQ2xhc3MoXCJzbGljay1oaWRkZW5cIikucmVtb3ZlQXR0cihcImFyaWEtaGlkZGVuIHRhYmluZGV4XCIpLGIuaHRtbEV4cHIudGVzdChiLm9wdGlvbnMucHJldkFycm93KSYmYi4kcHJldkFycm93LnByZXBlbmRUbyhiLm9wdGlvbnMuYXBwZW5kQXJyb3dzKSxiLmh0bWxFeHByLnRlc3QoYi5vcHRpb25zLm5leHRBcnJvdykmJmIuJG5leHRBcnJvdy5hcHBlbmRUbyhiLm9wdGlvbnMuYXBwZW5kQXJyb3dzKSxiLm9wdGlvbnMuaW5maW5pdGUhPT0hMCYmYi4kcHJldkFycm93LmFkZENsYXNzKFwic2xpY2stZGlzYWJsZWRcIikuYXR0cihcImFyaWEtZGlzYWJsZWRcIixcInRydWVcIikpOmIuJHByZXZBcnJvdy5hZGQoYi4kbmV4dEFycm93KS5hZGRDbGFzcyhcInNsaWNrLWhpZGRlblwiKS5hdHRyKHtcImFyaWEtZGlzYWJsZWRcIjpcInRydWVcIix0YWJpbmRleDpcIi0xXCJ9KSl9LGIucHJvdG90eXBlLmJ1aWxkRG90cz1mdW5jdGlvbigpe3ZhciBjLGQsYj10aGlzO2lmKGIub3B0aW9ucy5kb3RzPT09ITAmJmIuc2xpZGVDb3VudD5iLm9wdGlvbnMuc2xpZGVzVG9TaG93KXtmb3IoYi4kc2xpZGVyLmFkZENsYXNzKFwic2xpY2stZG90dGVkXCIpLGQ9YShcIjx1bCAvPlwiKS5hZGRDbGFzcyhiLm9wdGlvbnMuZG90c0NsYXNzKSxjPTA7Yzw9Yi5nZXREb3RDb3VudCgpO2MrPTEpZC5hcHBlbmQoYShcIjxsaSAvPlwiKS5hcHBlbmQoYi5vcHRpb25zLmN1c3RvbVBhZ2luZy5jYWxsKHRoaXMsYixjKSkpO2IuJGRvdHM9ZC5hcHBlbmRUbyhiLm9wdGlvbnMuYXBwZW5kRG90cyksYi4kZG90cy5maW5kKFwibGlcIikuZmlyc3QoKS5hZGRDbGFzcyhcInNsaWNrLWFjdGl2ZVwiKS5hdHRyKFwiYXJpYS1oaWRkZW5cIixcImZhbHNlXCIpfX0sYi5wcm90b3R5cGUuYnVpbGRPdXQ9ZnVuY3Rpb24oKXt2YXIgYj10aGlzO2IuJHNsaWRlcz1iLiRzbGlkZXIuY2hpbGRyZW4oYi5vcHRpb25zLnNsaWRlK1wiOm5vdCguc2xpY2stY2xvbmVkKVwiKS5hZGRDbGFzcyhcInNsaWNrLXNsaWRlXCIpLGIuc2xpZGVDb3VudD1iLiRzbGlkZXMubGVuZ3RoLGIuJHNsaWRlcy5lYWNoKGZ1bmN0aW9uKGIsYyl7YShjKS5hdHRyKFwiZGF0YS1zbGljay1pbmRleFwiLGIpLmRhdGEoXCJvcmlnaW5hbFN0eWxpbmdcIixhKGMpLmF0dHIoXCJzdHlsZVwiKXx8XCJcIil9KSxiLiRzbGlkZXIuYWRkQ2xhc3MoXCJzbGljay1zbGlkZXJcIiksYi4kc2xpZGVUcmFjaz0wPT09Yi5zbGlkZUNvdW50P2EoJzxkaXYgY2xhc3M9XCJzbGljay10cmFja1wiLz4nKS5hcHBlbmRUbyhiLiRzbGlkZXIpOmIuJHNsaWRlcy53cmFwQWxsKCc8ZGl2IGNsYXNzPVwic2xpY2stdHJhY2tcIi8+JykucGFyZW50KCksYi4kbGlzdD1iLiRzbGlkZVRyYWNrLndyYXAoJzxkaXYgYXJpYS1saXZlPVwicG9saXRlXCIgY2xhc3M9XCJzbGljay1saXN0XCIvPicpLnBhcmVudCgpLGIuJHNsaWRlVHJhY2suY3NzKFwib3BhY2l0eVwiLDApLChiLm9wdGlvbnMuY2VudGVyTW9kZT09PSEwfHxiLm9wdGlvbnMuc3dpcGVUb1NsaWRlPT09ITApJiYoYi5vcHRpb25zLnNsaWRlc1RvU2Nyb2xsPTEpLGEoXCJpbWdbZGF0YS1sYXp5XVwiLGIuJHNsaWRlcikubm90KFwiW3NyY11cIikuYWRkQ2xhc3MoXCJzbGljay1sb2FkaW5nXCIpLGIuc2V0dXBJbmZpbml0ZSgpLGIuYnVpbGRBcnJvd3MoKSxiLmJ1aWxkRG90cygpLGIudXBkYXRlRG90cygpLGIuc2V0U2xpZGVDbGFzc2VzKFwibnVtYmVyXCI9PXR5cGVvZiBiLmN1cnJlbnRTbGlkZT9iLmN1cnJlbnRTbGlkZTowKSxiLm9wdGlvbnMuZHJhZ2dhYmxlPT09ITAmJmIuJGxpc3QuYWRkQ2xhc3MoXCJkcmFnZ2FibGVcIil9LGIucHJvdG90eXBlLmJ1aWxkUm93cz1mdW5jdGlvbigpe3ZhciBiLGMsZCxlLGYsZyxoLGE9dGhpcztpZihlPWRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKSxnPWEuJHNsaWRlci5jaGlsZHJlbigpLGEub3B0aW9ucy5yb3dzPjEpe2ZvcihoPWEub3B0aW9ucy5zbGlkZXNQZXJSb3cqYS5vcHRpb25zLnJvd3MsZj1NYXRoLmNlaWwoZy5sZW5ndGgvaCksYj0wO2Y+YjtiKyspe3ZhciBpPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7Zm9yKGM9MDtjPGEub3B0aW9ucy5yb3dzO2MrKyl7dmFyIGo9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtmb3IoZD0wO2Q8YS5vcHRpb25zLnNsaWRlc1BlclJvdztkKyspe3ZhciBrPWIqaCsoYyphLm9wdGlvbnMuc2xpZGVzUGVyUm93K2QpO2cuZ2V0KGspJiZqLmFwcGVuZENoaWxkKGcuZ2V0KGspKX1pLmFwcGVuZENoaWxkKGopfWUuYXBwZW5kQ2hpbGQoaSl9YS4kc2xpZGVyLmVtcHR5KCkuYXBwZW5kKGUpLGEuJHNsaWRlci5jaGlsZHJlbigpLmNoaWxkcmVuKCkuY2hpbGRyZW4oKS5jc3Moe3dpZHRoOjEwMC9hLm9wdGlvbnMuc2xpZGVzUGVyUm93K1wiJVwiLGRpc3BsYXk6XCJpbmxpbmUtYmxvY2tcIn0pfX0sYi5wcm90b3R5cGUuY2hlY2tSZXNwb25zaXZlPWZ1bmN0aW9uKGIsYyl7dmFyIGUsZixnLGQ9dGhpcyxoPSExLGk9ZC4kc2xpZGVyLndpZHRoKCksaj13aW5kb3cuaW5uZXJXaWR0aHx8YSh3aW5kb3cpLndpZHRoKCk7aWYoXCJ3aW5kb3dcIj09PWQucmVzcG9uZFRvP2c9ajpcInNsaWRlclwiPT09ZC5yZXNwb25kVG8/Zz1pOlwibWluXCI9PT1kLnJlc3BvbmRUbyYmKGc9TWF0aC5taW4oaixpKSksZC5vcHRpb25zLnJlc3BvbnNpdmUmJmQub3B0aW9ucy5yZXNwb25zaXZlLmxlbmd0aCYmbnVsbCE9PWQub3B0aW9ucy5yZXNwb25zaXZlKXtmPW51bGw7Zm9yKGUgaW4gZC5icmVha3BvaW50cylkLmJyZWFrcG9pbnRzLmhhc093blByb3BlcnR5KGUpJiYoZC5vcmlnaW5hbFNldHRpbmdzLm1vYmlsZUZpcnN0PT09ITE/ZzxkLmJyZWFrcG9pbnRzW2VdJiYoZj1kLmJyZWFrcG9pbnRzW2VdKTpnPmQuYnJlYWtwb2ludHNbZV0mJihmPWQuYnJlYWtwb2ludHNbZV0pKTtudWxsIT09Zj9udWxsIT09ZC5hY3RpdmVCcmVha3BvaW50PyhmIT09ZC5hY3RpdmVCcmVha3BvaW50fHxjKSYmKGQuYWN0aXZlQnJlYWtwb2ludD1mLFwidW5zbGlja1wiPT09ZC5icmVha3BvaW50U2V0dGluZ3NbZl0/ZC51bnNsaWNrKGYpOihkLm9wdGlvbnM9YS5leHRlbmQoe30sZC5vcmlnaW5hbFNldHRpbmdzLGQuYnJlYWtwb2ludFNldHRpbmdzW2ZdKSxiPT09ITAmJihkLmN1cnJlbnRTbGlkZT1kLm9wdGlvbnMuaW5pdGlhbFNsaWRlKSxkLnJlZnJlc2goYikpLGg9Zik6KGQuYWN0aXZlQnJlYWtwb2ludD1mLFwidW5zbGlja1wiPT09ZC5icmVha3BvaW50U2V0dGluZ3NbZl0/ZC51bnNsaWNrKGYpOihkLm9wdGlvbnM9YS5leHRlbmQoe30sZC5vcmlnaW5hbFNldHRpbmdzLGQuYnJlYWtwb2ludFNldHRpbmdzW2ZdKSxiPT09ITAmJihkLmN1cnJlbnRTbGlkZT1kLm9wdGlvbnMuaW5pdGlhbFNsaWRlKSxkLnJlZnJlc2goYikpLGg9Zik6bnVsbCE9PWQuYWN0aXZlQnJlYWtwb2ludCYmKGQuYWN0aXZlQnJlYWtwb2ludD1udWxsLGQub3B0aW9ucz1kLm9yaWdpbmFsU2V0dGluZ3MsYj09PSEwJiYoZC5jdXJyZW50U2xpZGU9ZC5vcHRpb25zLmluaXRpYWxTbGlkZSksZC5yZWZyZXNoKGIpLGg9ZiksYnx8aD09PSExfHxkLiRzbGlkZXIudHJpZ2dlcihcImJyZWFrcG9pbnRcIixbZCxoXSl9fSxiLnByb3RvdHlwZS5jaGFuZ2VTbGlkZT1mdW5jdGlvbihiLGMpe3ZhciBmLGcsaCxkPXRoaXMsZT1hKGIuY3VycmVudFRhcmdldCk7c3dpdGNoKGUuaXMoXCJhXCIpJiZiLnByZXZlbnREZWZhdWx0KCksZS5pcyhcImxpXCIpfHwoZT1lLmNsb3Nlc3QoXCJsaVwiKSksaD1kLnNsaWRlQ291bnQlZC5vcHRpb25zLnNsaWRlc1RvU2Nyb2xsIT09MCxmPWg/MDooZC5zbGlkZUNvdW50LWQuY3VycmVudFNsaWRlKSVkLm9wdGlvbnMuc2xpZGVzVG9TY3JvbGwsYi5kYXRhLm1lc3NhZ2Upe2Nhc2VcInByZXZpb3VzXCI6Zz0wPT09Zj9kLm9wdGlvbnMuc2xpZGVzVG9TY3JvbGw6ZC5vcHRpb25zLnNsaWRlc1RvU2hvdy1mLGQuc2xpZGVDb3VudD5kLm9wdGlvbnMuc2xpZGVzVG9TaG93JiZkLnNsaWRlSGFuZGxlcihkLmN1cnJlbnRTbGlkZS1nLCExLGMpO2JyZWFrO2Nhc2VcIm5leHRcIjpnPTA9PT1mP2Qub3B0aW9ucy5zbGlkZXNUb1Njcm9sbDpmLGQuc2xpZGVDb3VudD5kLm9wdGlvbnMuc2xpZGVzVG9TaG93JiZkLnNsaWRlSGFuZGxlcihkLmN1cnJlbnRTbGlkZStnLCExLGMpO2JyZWFrO2Nhc2VcImluZGV4XCI6dmFyIGk9MD09PWIuZGF0YS5pbmRleD8wOmIuZGF0YS5pbmRleHx8ZS5pbmRleCgpKmQub3B0aW9ucy5zbGlkZXNUb1Njcm9sbDtkLnNsaWRlSGFuZGxlcihkLmNoZWNrTmF2aWdhYmxlKGkpLCExLGMpLGUuY2hpbGRyZW4oKS50cmlnZ2VyKFwiZm9jdXNcIik7YnJlYWs7ZGVmYXVsdDpyZXR1cm59fSxiLnByb3RvdHlwZS5jaGVja05hdmlnYWJsZT1mdW5jdGlvbihhKXt2YXIgYyxkLGI9dGhpcztpZihjPWIuZ2V0TmF2aWdhYmxlSW5kZXhlcygpLGQ9MCxhPmNbYy5sZW5ndGgtMV0pYT1jW2MubGVuZ3RoLTFdO2Vsc2UgZm9yKHZhciBlIGluIGMpe2lmKGE8Y1tlXSl7YT1kO2JyZWFrfWQ9Y1tlXX1yZXR1cm4gYX0sYi5wcm90b3R5cGUuY2xlYW5VcEV2ZW50cz1mdW5jdGlvbigpe3ZhciBiPXRoaXM7Yi5vcHRpb25zLmRvdHMmJm51bGwhPT1iLiRkb3RzJiZhKFwibGlcIixiLiRkb3RzKS5vZmYoXCJjbGljay5zbGlja1wiLGIuY2hhbmdlU2xpZGUpLm9mZihcIm1vdXNlZW50ZXIuc2xpY2tcIixhLnByb3h5KGIuaW50ZXJydXB0LGIsITApKS5vZmYoXCJtb3VzZWxlYXZlLnNsaWNrXCIsYS5wcm94eShiLmludGVycnVwdCxiLCExKSksYi4kc2xpZGVyLm9mZihcImZvY3VzLnNsaWNrIGJsdXIuc2xpY2tcIiksYi5vcHRpb25zLmFycm93cz09PSEwJiZiLnNsaWRlQ291bnQ+Yi5vcHRpb25zLnNsaWRlc1RvU2hvdyYmKGIuJHByZXZBcnJvdyYmYi4kcHJldkFycm93Lm9mZihcImNsaWNrLnNsaWNrXCIsYi5jaGFuZ2VTbGlkZSksYi4kbmV4dEFycm93JiZiLiRuZXh0QXJyb3cub2ZmKFwiY2xpY2suc2xpY2tcIixiLmNoYW5nZVNsaWRlKSksYi4kbGlzdC5vZmYoXCJ0b3VjaHN0YXJ0LnNsaWNrIG1vdXNlZG93bi5zbGlja1wiLGIuc3dpcGVIYW5kbGVyKSxiLiRsaXN0Lm9mZihcInRvdWNobW92ZS5zbGljayBtb3VzZW1vdmUuc2xpY2tcIixiLnN3aXBlSGFuZGxlciksYi4kbGlzdC5vZmYoXCJ0b3VjaGVuZC5zbGljayBtb3VzZXVwLnNsaWNrXCIsYi5zd2lwZUhhbmRsZXIpLGIuJGxpc3Qub2ZmKFwidG91Y2hjYW5jZWwuc2xpY2sgbW91c2VsZWF2ZS5zbGlja1wiLGIuc3dpcGVIYW5kbGVyKSxiLiRsaXN0Lm9mZihcImNsaWNrLnNsaWNrXCIsYi5jbGlja0hhbmRsZXIpLGEoZG9jdW1lbnQpLm9mZihiLnZpc2liaWxpdHlDaGFuZ2UsYi52aXNpYmlsaXR5KSxiLmNsZWFuVXBTbGlkZUV2ZW50cygpLGIub3B0aW9ucy5hY2Nlc3NpYmlsaXR5PT09ITAmJmIuJGxpc3Qub2ZmKFwia2V5ZG93bi5zbGlja1wiLGIua2V5SGFuZGxlciksYi5vcHRpb25zLmZvY3VzT25TZWxlY3Q9PT0hMCYmYShiLiRzbGlkZVRyYWNrKS5jaGlsZHJlbigpLm9mZihcImNsaWNrLnNsaWNrXCIsYi5zZWxlY3RIYW5kbGVyKSxhKHdpbmRvdykub2ZmKFwib3JpZW50YXRpb25jaGFuZ2Uuc2xpY2suc2xpY2stXCIrYi5pbnN0YW5jZVVpZCxiLm9yaWVudGF0aW9uQ2hhbmdlKSxhKHdpbmRvdykub2ZmKFwicmVzaXplLnNsaWNrLnNsaWNrLVwiK2IuaW5zdGFuY2VVaWQsYi5yZXNpemUpLGEoXCJbZHJhZ2dhYmxlIT10cnVlXVwiLGIuJHNsaWRlVHJhY2spLm9mZihcImRyYWdzdGFydFwiLGIucHJldmVudERlZmF1bHQpLGEod2luZG93KS5vZmYoXCJsb2FkLnNsaWNrLnNsaWNrLVwiK2IuaW5zdGFuY2VVaWQsYi5zZXRQb3NpdGlvbiksYShkb2N1bWVudCkub2ZmKFwicmVhZHkuc2xpY2suc2xpY2stXCIrYi5pbnN0YW5jZVVpZCxiLnNldFBvc2l0aW9uKX0sYi5wcm90b3R5cGUuY2xlYW5VcFNsaWRlRXZlbnRzPWZ1bmN0aW9uKCl7dmFyIGI9dGhpcztiLiRsaXN0Lm9mZihcIm1vdXNlZW50ZXIuc2xpY2tcIixhLnByb3h5KGIuaW50ZXJydXB0LGIsITApKSxiLiRsaXN0Lm9mZihcIm1vdXNlbGVhdmUuc2xpY2tcIixhLnByb3h5KGIuaW50ZXJydXB0LGIsITEpKX0sYi5wcm90b3R5cGUuY2xlYW5VcFJvd3M9ZnVuY3Rpb24oKXt2YXIgYixhPXRoaXM7YS5vcHRpb25zLnJvd3M+MSYmKGI9YS4kc2xpZGVzLmNoaWxkcmVuKCkuY2hpbGRyZW4oKSxiLnJlbW92ZUF0dHIoXCJzdHlsZVwiKSxhLiRzbGlkZXIuZW1wdHkoKS5hcHBlbmQoYikpfSxiLnByb3RvdHlwZS5jbGlja0hhbmRsZXI9ZnVuY3Rpb24oYSl7dmFyIGI9dGhpcztiLnNob3VsZENsaWNrPT09ITEmJihhLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpLGEuc3RvcFByb3BhZ2F0aW9uKCksYS5wcmV2ZW50RGVmYXVsdCgpKX0sYi5wcm90b3R5cGUuZGVzdHJveT1mdW5jdGlvbihiKXt2YXIgYz10aGlzO2MuYXV0b1BsYXlDbGVhcigpLGMudG91Y2hPYmplY3Q9e30sYy5jbGVhblVwRXZlbnRzKCksYShcIi5zbGljay1jbG9uZWRcIixjLiRzbGlkZXIpLmRldGFjaCgpLGMuJGRvdHMmJmMuJGRvdHMucmVtb3ZlKCksYy4kcHJldkFycm93JiZjLiRwcmV2QXJyb3cubGVuZ3RoJiYoYy4kcHJldkFycm93LnJlbW92ZUNsYXNzKFwic2xpY2stZGlzYWJsZWQgc2xpY2stYXJyb3cgc2xpY2staGlkZGVuXCIpLnJlbW92ZUF0dHIoXCJhcmlhLWhpZGRlbiBhcmlhLWRpc2FibGVkIHRhYmluZGV4XCIpLmNzcyhcImRpc3BsYXlcIixcIlwiKSxjLmh0bWxFeHByLnRlc3QoYy5vcHRpb25zLnByZXZBcnJvdykmJmMuJHByZXZBcnJvdy5yZW1vdmUoKSksYy4kbmV4dEFycm93JiZjLiRuZXh0QXJyb3cubGVuZ3RoJiYoYy4kbmV4dEFycm93LnJlbW92ZUNsYXNzKFwic2xpY2stZGlzYWJsZWQgc2xpY2stYXJyb3cgc2xpY2staGlkZGVuXCIpLnJlbW92ZUF0dHIoXCJhcmlhLWhpZGRlbiBhcmlhLWRpc2FibGVkIHRhYmluZGV4XCIpLmNzcyhcImRpc3BsYXlcIixcIlwiKSxjLmh0bWxFeHByLnRlc3QoYy5vcHRpb25zLm5leHRBcnJvdykmJmMuJG5leHRBcnJvdy5yZW1vdmUoKSksYy4kc2xpZGVzJiYoYy4kc2xpZGVzLnJlbW92ZUNsYXNzKFwic2xpY2stc2xpZGUgc2xpY2stYWN0aXZlIHNsaWNrLWNlbnRlciBzbGljay12aXNpYmxlIHNsaWNrLWN1cnJlbnRcIikucmVtb3ZlQXR0cihcImFyaWEtaGlkZGVuXCIpLnJlbW92ZUF0dHIoXCJkYXRhLXNsaWNrLWluZGV4XCIpLmVhY2goZnVuY3Rpb24oKXthKHRoaXMpLmF0dHIoXCJzdHlsZVwiLGEodGhpcykuZGF0YShcIm9yaWdpbmFsU3R5bGluZ1wiKSl9KSxjLiRzbGlkZVRyYWNrLmNoaWxkcmVuKHRoaXMub3B0aW9ucy5zbGlkZSkuZGV0YWNoKCksYy4kc2xpZGVUcmFjay5kZXRhY2goKSxjLiRsaXN0LmRldGFjaCgpLGMuJHNsaWRlci5hcHBlbmQoYy4kc2xpZGVzKSksYy5jbGVhblVwUm93cygpLGMuJHNsaWRlci5yZW1vdmVDbGFzcyhcInNsaWNrLXNsaWRlclwiKSxjLiRzbGlkZXIucmVtb3ZlQ2xhc3MoXCJzbGljay1pbml0aWFsaXplZFwiKSxjLiRzbGlkZXIucmVtb3ZlQ2xhc3MoXCJzbGljay1kb3R0ZWRcIiksYy51bnNsaWNrZWQ9ITAsYnx8Yy4kc2xpZGVyLnRyaWdnZXIoXCJkZXN0cm95XCIsW2NdKX0sYi5wcm90b3R5cGUuZGlzYWJsZVRyYW5zaXRpb249ZnVuY3Rpb24oYSl7dmFyIGI9dGhpcyxjPXt9O2NbYi50cmFuc2l0aW9uVHlwZV09XCJcIixiLm9wdGlvbnMuZmFkZT09PSExP2IuJHNsaWRlVHJhY2suY3NzKGMpOmIuJHNsaWRlcy5lcShhKS5jc3MoYyl9LGIucHJvdG90eXBlLmZhZGVTbGlkZT1mdW5jdGlvbihhLGIpe3ZhciBjPXRoaXM7Yy5jc3NUcmFuc2l0aW9ucz09PSExPyhjLiRzbGlkZXMuZXEoYSkuY3NzKHt6SW5kZXg6Yy5vcHRpb25zLnpJbmRleH0pLGMuJHNsaWRlcy5lcShhKS5hbmltYXRlKHtvcGFjaXR5OjF9LGMub3B0aW9ucy5zcGVlZCxjLm9wdGlvbnMuZWFzaW5nLGIpKTooYy5hcHBseVRyYW5zaXRpb24oYSksYy4kc2xpZGVzLmVxKGEpLmNzcyh7b3BhY2l0eToxLHpJbmRleDpjLm9wdGlvbnMuekluZGV4fSksYiYmc2V0VGltZW91dChmdW5jdGlvbigpe2MuZGlzYWJsZVRyYW5zaXRpb24oYSksYi5jYWxsKCl9LGMub3B0aW9ucy5zcGVlZCkpfSxiLnByb3RvdHlwZS5mYWRlU2xpZGVPdXQ9ZnVuY3Rpb24oYSl7dmFyIGI9dGhpcztiLmNzc1RyYW5zaXRpb25zPT09ITE/Yi4kc2xpZGVzLmVxKGEpLmFuaW1hdGUoe29wYWNpdHk6MCx6SW5kZXg6Yi5vcHRpb25zLnpJbmRleC0yfSxiLm9wdGlvbnMuc3BlZWQsYi5vcHRpb25zLmVhc2luZyk6KGIuYXBwbHlUcmFuc2l0aW9uKGEpLGIuJHNsaWRlcy5lcShhKS5jc3Moe29wYWNpdHk6MCx6SW5kZXg6Yi5vcHRpb25zLnpJbmRleC0yfSkpfSxiLnByb3RvdHlwZS5maWx0ZXJTbGlkZXM9Yi5wcm90b3R5cGUuc2xpY2tGaWx0ZXI9ZnVuY3Rpb24oYSl7dmFyIGI9dGhpcztudWxsIT09YSYmKGIuJHNsaWRlc0NhY2hlPWIuJHNsaWRlcyxiLnVubG9hZCgpLGIuJHNsaWRlVHJhY2suY2hpbGRyZW4odGhpcy5vcHRpb25zLnNsaWRlKS5kZXRhY2goKSxiLiRzbGlkZXNDYWNoZS5maWx0ZXIoYSkuYXBwZW5kVG8oYi4kc2xpZGVUcmFjayksYi5yZWluaXQoKSl9LGIucHJvdG90eXBlLmZvY3VzSGFuZGxlcj1mdW5jdGlvbigpe3ZhciBiPXRoaXM7Yi4kc2xpZGVyLm9mZihcImZvY3VzLnNsaWNrIGJsdXIuc2xpY2tcIikub24oXCJmb2N1cy5zbGljayBibHVyLnNsaWNrXCIsXCIqOm5vdCguc2xpY2stYXJyb3cpXCIsZnVuY3Rpb24oYyl7Yy5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTt2YXIgZD1hKHRoaXMpO3NldFRpbWVvdXQoZnVuY3Rpb24oKXtiLm9wdGlvbnMucGF1c2VPbkZvY3VzJiYoYi5mb2N1c3NlZD1kLmlzKFwiOmZvY3VzXCIpLGIuYXV0b1BsYXkoKSl9LDApfSl9LGIucHJvdG90eXBlLmdldEN1cnJlbnQ9Yi5wcm90b3R5cGUuc2xpY2tDdXJyZW50U2xpZGU9ZnVuY3Rpb24oKXt2YXIgYT10aGlzO3JldHVybiBhLmN1cnJlbnRTbGlkZX0sYi5wcm90b3R5cGUuZ2V0RG90Q291bnQ9ZnVuY3Rpb24oKXt2YXIgYT10aGlzLGI9MCxjPTAsZD0wO2lmKGEub3B0aW9ucy5pbmZpbml0ZT09PSEwKWZvcig7YjxhLnNsaWRlQ291bnQ7KSsrZCxiPWMrYS5vcHRpb25zLnNsaWRlc1RvU2Nyb2xsLGMrPWEub3B0aW9ucy5zbGlkZXNUb1Njcm9sbDw9YS5vcHRpb25zLnNsaWRlc1RvU2hvdz9hLm9wdGlvbnMuc2xpZGVzVG9TY3JvbGw6YS5vcHRpb25zLnNsaWRlc1RvU2hvdztlbHNlIGlmKGEub3B0aW9ucy5jZW50ZXJNb2RlPT09ITApZD1hLnNsaWRlQ291bnQ7ZWxzZSBpZihhLm9wdGlvbnMuYXNOYXZGb3IpZm9yKDtiPGEuc2xpZGVDb3VudDspKytkLGI9YythLm9wdGlvbnMuc2xpZGVzVG9TY3JvbGwsYys9YS5vcHRpb25zLnNsaWRlc1RvU2Nyb2xsPD1hLm9wdGlvbnMuc2xpZGVzVG9TaG93P2Eub3B0aW9ucy5zbGlkZXNUb1Njcm9sbDphLm9wdGlvbnMuc2xpZGVzVG9TaG93O2Vsc2UgZD0xK01hdGguY2VpbCgoYS5zbGlkZUNvdW50LWEub3B0aW9ucy5zbGlkZXNUb1Nob3cpL2Eub3B0aW9ucy5zbGlkZXNUb1Njcm9sbCk7cmV0dXJuIGQtMX0sYi5wcm90b3R5cGUuZ2V0TGVmdD1mdW5jdGlvbihhKXt2YXIgYyxkLGYsYj10aGlzLGU9MDtyZXR1cm4gYi5zbGlkZU9mZnNldD0wLGQ9Yi4kc2xpZGVzLmZpcnN0KCkub3V0ZXJIZWlnaHQoITApLGIub3B0aW9ucy5pbmZpbml0ZT09PSEwPyhiLnNsaWRlQ291bnQ+Yi5vcHRpb25zLnNsaWRlc1RvU2hvdyYmKGIuc2xpZGVPZmZzZXQ9Yi5zbGlkZVdpZHRoKmIub3B0aW9ucy5zbGlkZXNUb1Nob3cqLTEsZT1kKmIub3B0aW9ucy5zbGlkZXNUb1Nob3cqLTEpLGIuc2xpZGVDb3VudCViLm9wdGlvbnMuc2xpZGVzVG9TY3JvbGwhPT0wJiZhK2Iub3B0aW9ucy5zbGlkZXNUb1Njcm9sbD5iLnNsaWRlQ291bnQmJmIuc2xpZGVDb3VudD5iLm9wdGlvbnMuc2xpZGVzVG9TaG93JiYoYT5iLnNsaWRlQ291bnQ/KGIuc2xpZGVPZmZzZXQ9KGIub3B0aW9ucy5zbGlkZXNUb1Nob3ctKGEtYi5zbGlkZUNvdW50KSkqYi5zbGlkZVdpZHRoKi0xLGU9KGIub3B0aW9ucy5zbGlkZXNUb1Nob3ctKGEtYi5zbGlkZUNvdW50KSkqZCotMSk6KGIuc2xpZGVPZmZzZXQ9Yi5zbGlkZUNvdW50JWIub3B0aW9ucy5zbGlkZXNUb1Njcm9sbCpiLnNsaWRlV2lkdGgqLTEsZT1iLnNsaWRlQ291bnQlYi5vcHRpb25zLnNsaWRlc1RvU2Nyb2xsKmQqLTEpKSk6YStiLm9wdGlvbnMuc2xpZGVzVG9TaG93PmIuc2xpZGVDb3VudCYmKGIuc2xpZGVPZmZzZXQ9KGErYi5vcHRpb25zLnNsaWRlc1RvU2hvdy1iLnNsaWRlQ291bnQpKmIuc2xpZGVXaWR0aCxlPShhK2Iub3B0aW9ucy5zbGlkZXNUb1Nob3ctYi5zbGlkZUNvdW50KSpkKSxiLnNsaWRlQ291bnQ8PWIub3B0aW9ucy5zbGlkZXNUb1Nob3cmJihiLnNsaWRlT2Zmc2V0PTAsZT0wKSxiLm9wdGlvbnMuY2VudGVyTW9kZT09PSEwJiZiLm9wdGlvbnMuaW5maW5pdGU9PT0hMD9iLnNsaWRlT2Zmc2V0Kz1iLnNsaWRlV2lkdGgqTWF0aC5mbG9vcihiLm9wdGlvbnMuc2xpZGVzVG9TaG93LzIpLWIuc2xpZGVXaWR0aDpiLm9wdGlvbnMuY2VudGVyTW9kZT09PSEwJiYoYi5zbGlkZU9mZnNldD0wLGIuc2xpZGVPZmZzZXQrPWIuc2xpZGVXaWR0aCpNYXRoLmZsb29yKGIub3B0aW9ucy5zbGlkZXNUb1Nob3cvMikpLGM9Yi5vcHRpb25zLnZlcnRpY2FsPT09ITE/YSpiLnNsaWRlV2lkdGgqLTErYi5zbGlkZU9mZnNldDphKmQqLTErZSxiLm9wdGlvbnMudmFyaWFibGVXaWR0aD09PSEwJiYoZj1iLnNsaWRlQ291bnQ8PWIub3B0aW9ucy5zbGlkZXNUb1Nob3d8fGIub3B0aW9ucy5pbmZpbml0ZT09PSExP2IuJHNsaWRlVHJhY2suY2hpbGRyZW4oXCIuc2xpY2stc2xpZGVcIikuZXEoYSk6Yi4kc2xpZGVUcmFjay5jaGlsZHJlbihcIi5zbGljay1zbGlkZVwiKS5lcShhK2Iub3B0aW9ucy5zbGlkZXNUb1Nob3cpLGM9Yi5vcHRpb25zLnJ0bD09PSEwP2ZbMF0/LTEqKGIuJHNsaWRlVHJhY2sud2lkdGgoKS1mWzBdLm9mZnNldExlZnQtZi53aWR0aCgpKTowOmZbMF0/LTEqZlswXS5vZmZzZXRMZWZ0OjAsYi5vcHRpb25zLmNlbnRlck1vZGU9PT0hMCYmKGY9Yi5zbGlkZUNvdW50PD1iLm9wdGlvbnMuc2xpZGVzVG9TaG93fHxiLm9wdGlvbnMuaW5maW5pdGU9PT0hMT9iLiRzbGlkZVRyYWNrLmNoaWxkcmVuKFwiLnNsaWNrLXNsaWRlXCIpLmVxKGEpOmIuJHNsaWRlVHJhY2suY2hpbGRyZW4oXCIuc2xpY2stc2xpZGVcIikuZXEoYStiLm9wdGlvbnMuc2xpZGVzVG9TaG93KzEpLGM9Yi5vcHRpb25zLnJ0bD09PSEwP2ZbMF0/LTEqKGIuJHNsaWRlVHJhY2sud2lkdGgoKS1mWzBdLm9mZnNldExlZnQtZi53aWR0aCgpKTowOmZbMF0/LTEqZlswXS5vZmZzZXRMZWZ0OjAsYys9KGIuJGxpc3Qud2lkdGgoKS1mLm91dGVyV2lkdGgoKSkvMikpLGN9LGIucHJvdG90eXBlLmdldE9wdGlvbj1iLnByb3RvdHlwZS5zbGlja0dldE9wdGlvbj1mdW5jdGlvbihhKXt2YXIgYj10aGlzO3JldHVybiBiLm9wdGlvbnNbYV19LGIucHJvdG90eXBlLmdldE5hdmlnYWJsZUluZGV4ZXM9ZnVuY3Rpb24oKXt2YXIgZSxhPXRoaXMsYj0wLGM9MCxkPVtdO2ZvcihhLm9wdGlvbnMuaW5maW5pdGU9PT0hMT9lPWEuc2xpZGVDb3VudDooYj0tMSphLm9wdGlvbnMuc2xpZGVzVG9TY3JvbGwsYz0tMSphLm9wdGlvbnMuc2xpZGVzVG9TY3JvbGwsZT0yKmEuc2xpZGVDb3VudCk7ZT5iOylkLnB1c2goYiksYj1jK2Eub3B0aW9ucy5zbGlkZXNUb1Njcm9sbCxjKz1hLm9wdGlvbnMuc2xpZGVzVG9TY3JvbGw8PWEub3B0aW9ucy5zbGlkZXNUb1Nob3c/YS5vcHRpb25zLnNsaWRlc1RvU2Nyb2xsOmEub3B0aW9ucy5zbGlkZXNUb1Nob3c7cmV0dXJuIGR9LGIucHJvdG90eXBlLmdldFNsaWNrPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXN9LGIucHJvdG90eXBlLmdldFNsaWRlQ291bnQ9ZnVuY3Rpb24oKXt2YXIgYyxkLGUsYj10aGlzO3JldHVybiBlPWIub3B0aW9ucy5jZW50ZXJNb2RlPT09ITA/Yi5zbGlkZVdpZHRoKk1hdGguZmxvb3IoYi5vcHRpb25zLnNsaWRlc1RvU2hvdy8yKTowLGIub3B0aW9ucy5zd2lwZVRvU2xpZGU9PT0hMD8oYi4kc2xpZGVUcmFjay5maW5kKFwiLnNsaWNrLXNsaWRlXCIpLmVhY2goZnVuY3Rpb24oYyxmKXtyZXR1cm4gZi5vZmZzZXRMZWZ0LWUrYShmKS5vdXRlcldpZHRoKCkvMj4tMSpiLnN3aXBlTGVmdD8oZD1mLCExKTp2b2lkIDB9KSxjPU1hdGguYWJzKGEoZCkuYXR0cihcImRhdGEtc2xpY2staW5kZXhcIiktYi5jdXJyZW50U2xpZGUpfHwxKTpiLm9wdGlvbnMuc2xpZGVzVG9TY3JvbGx9LGIucHJvdG90eXBlLmdvVG89Yi5wcm90b3R5cGUuc2xpY2tHb1RvPWZ1bmN0aW9uKGEsYil7dmFyIGM9dGhpcztjLmNoYW5nZVNsaWRlKHtkYXRhOnttZXNzYWdlOlwiaW5kZXhcIixpbmRleDpwYXJzZUludChhKX19LGIpfSxiLnByb3RvdHlwZS5pbml0PWZ1bmN0aW9uKGIpe3ZhciBjPXRoaXM7YShjLiRzbGlkZXIpLmhhc0NsYXNzKFwic2xpY2staW5pdGlhbGl6ZWRcIil8fChhKGMuJHNsaWRlcikuYWRkQ2xhc3MoXCJzbGljay1pbml0aWFsaXplZFwiKSxjLmJ1aWxkUm93cygpLGMuYnVpbGRPdXQoKSxjLnNldFByb3BzKCksYy5zdGFydExvYWQoKSxjLmxvYWRTbGlkZXIoKSxjLmluaXRpYWxpemVFdmVudHMoKSxjLnVwZGF0ZUFycm93cygpLGMudXBkYXRlRG90cygpLGMuY2hlY2tSZXNwb25zaXZlKCEwKSxjLmZvY3VzSGFuZGxlcigpKSxiJiZjLiRzbGlkZXIudHJpZ2dlcihcImluaXRcIixbY10pLGMub3B0aW9ucy5hY2Nlc3NpYmlsaXR5PT09ITAmJmMuaW5pdEFEQSgpLGMub3B0aW9ucy5hdXRvcGxheSYmKGMucGF1c2VkPSExLGMuYXV0b1BsYXkoKSl9LGIucHJvdG90eXBlLmluaXRBREE9ZnVuY3Rpb24oKXt2YXIgYj10aGlzO2IuJHNsaWRlcy5hZGQoYi4kc2xpZGVUcmFjay5maW5kKFwiLnNsaWNrLWNsb25lZFwiKSkuYXR0cih7XCJhcmlhLWhpZGRlblwiOlwidHJ1ZVwiLHRhYmluZGV4OlwiLTFcIn0pLmZpbmQoXCJhLCBpbnB1dCwgYnV0dG9uLCBzZWxlY3RcIikuYXR0cih7dGFiaW5kZXg6XCItMVwifSksYi4kc2xpZGVUcmFjay5hdHRyKFwicm9sZVwiLFwibGlzdGJveFwiKSxiLiRzbGlkZXMubm90KGIuJHNsaWRlVHJhY2suZmluZChcIi5zbGljay1jbG9uZWRcIikpLmVhY2goZnVuY3Rpb24oYyl7YSh0aGlzKS5hdHRyKHtyb2xlOlwib3B0aW9uXCIsXCJhcmlhLWRlc2NyaWJlZGJ5XCI6XCJzbGljay1zbGlkZVwiK2IuaW5zdGFuY2VVaWQrY30pfSksbnVsbCE9PWIuJGRvdHMmJmIuJGRvdHMuYXR0cihcInJvbGVcIixcInRhYmxpc3RcIikuZmluZChcImxpXCIpLmVhY2goZnVuY3Rpb24oYyl7YSh0aGlzKS5hdHRyKHtyb2xlOlwicHJlc2VudGF0aW9uXCIsXCJhcmlhLXNlbGVjdGVkXCI6XCJmYWxzZVwiLFwiYXJpYS1jb250cm9sc1wiOlwibmF2aWdhdGlvblwiK2IuaW5zdGFuY2VVaWQrYyxpZDpcInNsaWNrLXNsaWRlXCIrYi5pbnN0YW5jZVVpZCtjfSl9KS5maXJzdCgpLmF0dHIoXCJhcmlhLXNlbGVjdGVkXCIsXCJ0cnVlXCIpLmVuZCgpLmZpbmQoXCJidXR0b25cIikuYXR0cihcInJvbGVcIixcImJ1dHRvblwiKS5lbmQoKS5jbG9zZXN0KFwiZGl2XCIpLmF0dHIoXCJyb2xlXCIsXCJ0b29sYmFyXCIpLGIuYWN0aXZhdGVBREEoKX0sYi5wcm90b3R5cGUuaW5pdEFycm93RXZlbnRzPWZ1bmN0aW9uKCl7dmFyIGE9dGhpczthLm9wdGlvbnMuYXJyb3dzPT09ITAmJmEuc2xpZGVDb3VudD5hLm9wdGlvbnMuc2xpZGVzVG9TaG93JiYoYS4kcHJldkFycm93Lm9mZihcImNsaWNrLnNsaWNrXCIpLm9uKFwiY2xpY2suc2xpY2tcIix7bWVzc2FnZTpcInByZXZpb3VzXCJ9LGEuY2hhbmdlU2xpZGUpLGEuJG5leHRBcnJvdy5vZmYoXCJjbGljay5zbGlja1wiKS5vbihcImNsaWNrLnNsaWNrXCIse21lc3NhZ2U6XCJuZXh0XCJ9LGEuY2hhbmdlU2xpZGUpKX0sYi5wcm90b3R5cGUuaW5pdERvdEV2ZW50cz1mdW5jdGlvbigpe3ZhciBiPXRoaXM7Yi5vcHRpb25zLmRvdHM9PT0hMCYmYi5zbGlkZUNvdW50PmIub3B0aW9ucy5zbGlkZXNUb1Nob3cmJmEoXCJsaVwiLGIuJGRvdHMpLm9uKFwiY2xpY2suc2xpY2tcIix7bWVzc2FnZTpcImluZGV4XCJ9LGIuY2hhbmdlU2xpZGUpLGIub3B0aW9ucy5kb3RzPT09ITAmJmIub3B0aW9ucy5wYXVzZU9uRG90c0hvdmVyPT09ITAmJmEoXCJsaVwiLGIuJGRvdHMpLm9uKFwibW91c2VlbnRlci5zbGlja1wiLGEucHJveHkoYi5pbnRlcnJ1cHQsYiwhMCkpLm9uKFwibW91c2VsZWF2ZS5zbGlja1wiLGEucHJveHkoYi5pbnRlcnJ1cHQsYiwhMSkpfSxiLnByb3RvdHlwZS5pbml0U2xpZGVFdmVudHM9ZnVuY3Rpb24oKXt2YXIgYj10aGlzO2Iub3B0aW9ucy5wYXVzZU9uSG92ZXImJihiLiRsaXN0Lm9uKFwibW91c2VlbnRlci5zbGlja1wiLGEucHJveHkoYi5pbnRlcnJ1cHQsYiwhMCkpLGIuJGxpc3Qub24oXCJtb3VzZWxlYXZlLnNsaWNrXCIsYS5wcm94eShiLmludGVycnVwdCxiLCExKSkpfSxiLnByb3RvdHlwZS5pbml0aWFsaXplRXZlbnRzPWZ1bmN0aW9uKCl7dmFyIGI9dGhpcztiLmluaXRBcnJvd0V2ZW50cygpLGIuaW5pdERvdEV2ZW50cygpLGIuaW5pdFNsaWRlRXZlbnRzKCksYi4kbGlzdC5vbihcInRvdWNoc3RhcnQuc2xpY2sgbW91c2Vkb3duLnNsaWNrXCIse2FjdGlvbjpcInN0YXJ0XCJ9LGIuc3dpcGVIYW5kbGVyKSxiLiRsaXN0Lm9uKFwidG91Y2htb3ZlLnNsaWNrIG1vdXNlbW92ZS5zbGlja1wiLHthY3Rpb246XCJtb3ZlXCJ9LGIuc3dpcGVIYW5kbGVyKSxiLiRsaXN0Lm9uKFwidG91Y2hlbmQuc2xpY2sgbW91c2V1cC5zbGlja1wiLHthY3Rpb246XCJlbmRcIn0sYi5zd2lwZUhhbmRsZXIpLGIuJGxpc3Qub24oXCJ0b3VjaGNhbmNlbC5zbGljayBtb3VzZWxlYXZlLnNsaWNrXCIse2FjdGlvbjpcImVuZFwifSxiLnN3aXBlSGFuZGxlciksYi4kbGlzdC5vbihcImNsaWNrLnNsaWNrXCIsYi5jbGlja0hhbmRsZXIpLGEoZG9jdW1lbnQpLm9uKGIudmlzaWJpbGl0eUNoYW5nZSxhLnByb3h5KGIudmlzaWJpbGl0eSxiKSksYi5vcHRpb25zLmFjY2Vzc2liaWxpdHk9PT0hMCYmYi4kbGlzdC5vbihcImtleWRvd24uc2xpY2tcIixiLmtleUhhbmRsZXIpLGIub3B0aW9ucy5mb2N1c09uU2VsZWN0PT09ITAmJmEoYi4kc2xpZGVUcmFjaykuY2hpbGRyZW4oKS5vbihcImNsaWNrLnNsaWNrXCIsYi5zZWxlY3RIYW5kbGVyKSxhKHdpbmRvdykub24oXCJvcmllbnRhdGlvbmNoYW5nZS5zbGljay5zbGljay1cIitiLmluc3RhbmNlVWlkLGEucHJveHkoYi5vcmllbnRhdGlvbkNoYW5nZSxiKSksYSh3aW5kb3cpLm9uKFwicmVzaXplLnNsaWNrLnNsaWNrLVwiK2IuaW5zdGFuY2VVaWQsYS5wcm94eShiLnJlc2l6ZSxiKSksYShcIltkcmFnZ2FibGUhPXRydWVdXCIsYi4kc2xpZGVUcmFjaykub24oXCJkcmFnc3RhcnRcIixiLnByZXZlbnREZWZhdWx0KSxhKHdpbmRvdykub24oXCJsb2FkLnNsaWNrLnNsaWNrLVwiK2IuaW5zdGFuY2VVaWQsYi5zZXRQb3NpdGlvbiksYShkb2N1bWVudCkub24oXCJyZWFkeS5zbGljay5zbGljay1cIitiLmluc3RhbmNlVWlkLGIuc2V0UG9zaXRpb24pfSxiLnByb3RvdHlwZS5pbml0VUk9ZnVuY3Rpb24oKXt2YXIgYT10aGlzO2Eub3B0aW9ucy5hcnJvd3M9PT0hMCYmYS5zbGlkZUNvdW50PmEub3B0aW9ucy5zbGlkZXNUb1Nob3cmJihhLiRwcmV2QXJyb3cuc2hvdygpLGEuJG5leHRBcnJvdy5zaG93KCkpLGEub3B0aW9ucy5kb3RzPT09ITAmJmEuc2xpZGVDb3VudD5hLm9wdGlvbnMuc2xpZGVzVG9TaG93JiZhLiRkb3RzLnNob3coKX0sYi5wcm90b3R5cGUua2V5SGFuZGxlcj1mdW5jdGlvbihhKXt2YXIgYj10aGlzO2EudGFyZ2V0LnRhZ05hbWUubWF0Y2goXCJURVhUQVJFQXxJTlBVVHxTRUxFQ1RcIil8fCgzNz09PWEua2V5Q29kZSYmYi5vcHRpb25zLmFjY2Vzc2liaWxpdHk9PT0hMD9iLmNoYW5nZVNsaWRlKHtkYXRhOnttZXNzYWdlOmIub3B0aW9ucy5ydGw9PT0hMD9cIm5leHRcIjpcInByZXZpb3VzXCJ9fSk6Mzk9PT1hLmtleUNvZGUmJmIub3B0aW9ucy5hY2Nlc3NpYmlsaXR5PT09ITAmJmIuY2hhbmdlU2xpZGUoe2RhdGE6e21lc3NhZ2U6Yi5vcHRpb25zLnJ0bD09PSEwP1wicHJldmlvdXNcIjpcIm5leHRcIn19KSl9LGIucHJvdG90eXBlLmxhenlMb2FkPWZ1bmN0aW9uKCl7ZnVuY3Rpb24gZyhjKXthKFwiaW1nW2RhdGEtbGF6eV1cIixjKS5lYWNoKGZ1bmN0aW9uKCl7dmFyIGM9YSh0aGlzKSxkPWEodGhpcykuYXR0cihcImRhdGEtbGF6eVwiKSxlPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7ZS5vbmxvYWQ9ZnVuY3Rpb24oKXtjLmFuaW1hdGUoe29wYWNpdHk6MH0sMTAwLGZ1bmN0aW9uKCl7Yy5hdHRyKFwic3JjXCIsZCkuYW5pbWF0ZSh7b3BhY2l0eToxfSwyMDAsZnVuY3Rpb24oKXtjLnJlbW92ZUF0dHIoXCJkYXRhLWxhenlcIikucmVtb3ZlQ2xhc3MoXCJzbGljay1sb2FkaW5nXCIpfSksYi4kc2xpZGVyLnRyaWdnZXIoXCJsYXp5TG9hZGVkXCIsW2IsYyxkXSl9KX0sZS5vbmVycm9yPWZ1bmN0aW9uKCl7Yy5yZW1vdmVBdHRyKFwiZGF0YS1sYXp5XCIpLnJlbW92ZUNsYXNzKFwic2xpY2stbG9hZGluZ1wiKS5hZGRDbGFzcyhcInNsaWNrLWxhenlsb2FkLWVycm9yXCIpLGIuJHNsaWRlci50cmlnZ2VyKFwibGF6eUxvYWRFcnJvclwiLFtiLGMsZF0pfSxlLnNyYz1kfSl9dmFyIGMsZCxlLGYsYj10aGlzO2Iub3B0aW9ucy5jZW50ZXJNb2RlPT09ITA/Yi5vcHRpb25zLmluZmluaXRlPT09ITA/KGU9Yi5jdXJyZW50U2xpZGUrKGIub3B0aW9ucy5zbGlkZXNUb1Nob3cvMisxKSxmPWUrYi5vcHRpb25zLnNsaWRlc1RvU2hvdysyKTooZT1NYXRoLm1heCgwLGIuY3VycmVudFNsaWRlLShiLm9wdGlvbnMuc2xpZGVzVG9TaG93LzIrMSkpLGY9MisoYi5vcHRpb25zLnNsaWRlc1RvU2hvdy8yKzEpK2IuY3VycmVudFNsaWRlKTooZT1iLm9wdGlvbnMuaW5maW5pdGU/Yi5vcHRpb25zLnNsaWRlc1RvU2hvdytiLmN1cnJlbnRTbGlkZTpiLmN1cnJlbnRTbGlkZSxmPU1hdGguY2VpbChlK2Iub3B0aW9ucy5zbGlkZXNUb1Nob3cpLGIub3B0aW9ucy5mYWRlPT09ITAmJihlPjAmJmUtLSxmPD1iLnNsaWRlQ291bnQmJmYrKykpLGM9Yi4kc2xpZGVyLmZpbmQoXCIuc2xpY2stc2xpZGVcIikuc2xpY2UoZSxmKSxnKGMpLGIuc2xpZGVDb3VudDw9Yi5vcHRpb25zLnNsaWRlc1RvU2hvdz8oZD1iLiRzbGlkZXIuZmluZChcIi5zbGljay1zbGlkZVwiKSxnKGQpKTpiLmN1cnJlbnRTbGlkZT49Yi5zbGlkZUNvdW50LWIub3B0aW9ucy5zbGlkZXNUb1Nob3c/KGQ9Yi4kc2xpZGVyLmZpbmQoXCIuc2xpY2stY2xvbmVkXCIpLnNsaWNlKDAsYi5vcHRpb25zLnNsaWRlc1RvU2hvdyksZyhkKSk6MD09PWIuY3VycmVudFNsaWRlJiYoZD1iLiRzbGlkZXIuZmluZChcIi5zbGljay1jbG9uZWRcIikuc2xpY2UoLTEqYi5vcHRpb25zLnNsaWRlc1RvU2hvdyksZyhkKSl9LGIucHJvdG90eXBlLmxvYWRTbGlkZXI9ZnVuY3Rpb24oKXt2YXIgYT10aGlzO2Euc2V0UG9zaXRpb24oKSxhLiRzbGlkZVRyYWNrLmNzcyh7b3BhY2l0eToxfSksYS4kc2xpZGVyLnJlbW92ZUNsYXNzKFwic2xpY2stbG9hZGluZ1wiKSxhLmluaXRVSSgpLFwicHJvZ3Jlc3NpdmVcIj09PWEub3B0aW9ucy5sYXp5TG9hZCYmYS5wcm9ncmVzc2l2ZUxhenlMb2FkKCl9LGIucHJvdG90eXBlLm5leHQ9Yi5wcm90b3R5cGUuc2xpY2tOZXh0PWZ1bmN0aW9uKCl7dmFyIGE9dGhpczthLmNoYW5nZVNsaWRlKHtkYXRhOnttZXNzYWdlOlwibmV4dFwifX0pfSxiLnByb3RvdHlwZS5vcmllbnRhdGlvbkNoYW5nZT1mdW5jdGlvbigpe3ZhciBhPXRoaXM7YS5jaGVja1Jlc3BvbnNpdmUoKSxhLnNldFBvc2l0aW9uKCl9LGIucHJvdG90eXBlLnBhdXNlPWIucHJvdG90eXBlLnNsaWNrUGF1c2U9ZnVuY3Rpb24oKXt2YXIgYT10aGlzO2EuYXV0b1BsYXlDbGVhcigpLGEucGF1c2VkPSEwfSxiLnByb3RvdHlwZS5wbGF5PWIucHJvdG90eXBlLnNsaWNrUGxheT1mdW5jdGlvbigpe3ZhciBhPXRoaXM7YS5hdXRvUGxheSgpLGEub3B0aW9ucy5hdXRvcGxheT0hMCxhLnBhdXNlZD0hMSxhLmZvY3Vzc2VkPSExLGEuaW50ZXJydXB0ZWQ9ITF9LGIucHJvdG90eXBlLnBvc3RTbGlkZT1mdW5jdGlvbihhKXt2YXIgYj10aGlzO2IudW5zbGlja2VkfHwoYi4kc2xpZGVyLnRyaWdnZXIoXCJhZnRlckNoYW5nZVwiLFtiLGFdKSxiLmFuaW1hdGluZz0hMSxiLnNldFBvc2l0aW9uKCksYi5zd2lwZUxlZnQ9bnVsbCxiLm9wdGlvbnMuYXV0b3BsYXkmJmIuYXV0b1BsYXkoKSxiLm9wdGlvbnMuYWNjZXNzaWJpbGl0eT09PSEwJiZiLmluaXRBREEoKSl9LGIucHJvdG90eXBlLnByZXY9Yi5wcm90b3R5cGUuc2xpY2tQcmV2PWZ1bmN0aW9uKCl7dmFyIGE9dGhpczthLmNoYW5nZVNsaWRlKHtkYXRhOnttZXNzYWdlOlwicHJldmlvdXNcIn19KX0sYi5wcm90b3R5cGUucHJldmVudERlZmF1bHQ9ZnVuY3Rpb24oYSl7YS5wcmV2ZW50RGVmYXVsdCgpfSxiLnByb3RvdHlwZS5wcm9ncmVzc2l2ZUxhenlMb2FkPWZ1bmN0aW9uKGIpe2I9Ynx8MTt2YXIgZSxmLGcsYz10aGlzLGQ9YShcImltZ1tkYXRhLWxhenldXCIsYy4kc2xpZGVyKTtkLmxlbmd0aD8oZT1kLmZpcnN0KCksZj1lLmF0dHIoXCJkYXRhLWxhenlcIiksZz1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpLGcub25sb2FkPWZ1bmN0aW9uKCl7ZS5hdHRyKFwic3JjXCIsZikucmVtb3ZlQXR0cihcImRhdGEtbGF6eVwiKS5yZW1vdmVDbGFzcyhcInNsaWNrLWxvYWRpbmdcIiksYy5vcHRpb25zLmFkYXB0aXZlSGVpZ2h0PT09ITAmJmMuc2V0UG9zaXRpb24oKSxjLiRzbGlkZXIudHJpZ2dlcihcImxhenlMb2FkZWRcIixbYyxlLGZdKSxjLnByb2dyZXNzaXZlTGF6eUxvYWQoKX0sZy5vbmVycm9yPWZ1bmN0aW9uKCl7Mz5iP3NldFRpbWVvdXQoZnVuY3Rpb24oKXtjLnByb2dyZXNzaXZlTGF6eUxvYWQoYisxKX0sNTAwKTooZS5yZW1vdmVBdHRyKFwiZGF0YS1sYXp5XCIpLnJlbW92ZUNsYXNzKFwic2xpY2stbG9hZGluZ1wiKS5hZGRDbGFzcyhcInNsaWNrLWxhenlsb2FkLWVycm9yXCIpLGMuJHNsaWRlci50cmlnZ2VyKFwibGF6eUxvYWRFcnJvclwiLFtjLGUsZl0pLGMucHJvZ3Jlc3NpdmVMYXp5TG9hZCgpKX0sZy5zcmM9Zik6Yy4kc2xpZGVyLnRyaWdnZXIoXCJhbGxJbWFnZXNMb2FkZWRcIixbY10pfSxiLnByb3RvdHlwZS5yZWZyZXNoPWZ1bmN0aW9uKGIpe3ZhciBkLGUsYz10aGlzO2U9Yy5zbGlkZUNvdW50LWMub3B0aW9ucy5zbGlkZXNUb1Nob3csIWMub3B0aW9ucy5pbmZpbml0ZSYmYy5jdXJyZW50U2xpZGU+ZSYmKGMuY3VycmVudFNsaWRlPWUpLGMuc2xpZGVDb3VudDw9Yy5vcHRpb25zLnNsaWRlc1RvU2hvdyYmKGMuY3VycmVudFNsaWRlPTApLGQ9Yy5jdXJyZW50U2xpZGUsYy5kZXN0cm95KCEwKSxhLmV4dGVuZChjLGMuaW5pdGlhbHMse2N1cnJlbnRTbGlkZTpkfSksYy5pbml0KCksYnx8Yy5jaGFuZ2VTbGlkZSh7ZGF0YTp7bWVzc2FnZTpcImluZGV4XCIsaW5kZXg6ZH19LCExKX0sYi5wcm90b3R5cGUucmVnaXN0ZXJCcmVha3BvaW50cz1mdW5jdGlvbigpe3ZhciBjLGQsZSxiPXRoaXMsZj1iLm9wdGlvbnMucmVzcG9uc2l2ZXx8bnVsbDtpZihcImFycmF5XCI9PT1hLnR5cGUoZikmJmYubGVuZ3RoKXtiLnJlc3BvbmRUbz1iLm9wdGlvbnMucmVzcG9uZFRvfHxcIndpbmRvd1wiO2ZvcihjIGluIGYpaWYoZT1iLmJyZWFrcG9pbnRzLmxlbmd0aC0xLGQ9ZltjXS5icmVha3BvaW50LGYuaGFzT3duUHJvcGVydHkoYykpe2Zvcig7ZT49MDspYi5icmVha3BvaW50c1tlXSYmYi5icmVha3BvaW50c1tlXT09PWQmJmIuYnJlYWtwb2ludHMuc3BsaWNlKGUsMSksZS0tO2IuYnJlYWtwb2ludHMucHVzaChkKSxiLmJyZWFrcG9pbnRTZXR0aW5nc1tkXT1mW2NdLnNldHRpbmdzfWIuYnJlYWtwb2ludHMuc29ydChmdW5jdGlvbihhLGMpe3JldHVybiBiLm9wdGlvbnMubW9iaWxlRmlyc3Q/YS1jOmMtYX0pfX0sYi5wcm90b3R5cGUucmVpbml0PWZ1bmN0aW9uKCl7dmFyIGI9dGhpcztiLiRzbGlkZXM9Yi4kc2xpZGVUcmFjay5jaGlsZHJlbihiLm9wdGlvbnMuc2xpZGUpLmFkZENsYXNzKFwic2xpY2stc2xpZGVcIiksYi5zbGlkZUNvdW50PWIuJHNsaWRlcy5sZW5ndGgsYi5jdXJyZW50U2xpZGU+PWIuc2xpZGVDb3VudCYmMCE9PWIuY3VycmVudFNsaWRlJiYoYi5jdXJyZW50U2xpZGU9Yi5jdXJyZW50U2xpZGUtYi5vcHRpb25zLnNsaWRlc1RvU2Nyb2xsKSxiLnNsaWRlQ291bnQ8PWIub3B0aW9ucy5zbGlkZXNUb1Nob3cmJihiLmN1cnJlbnRTbGlkZT0wKSxiLnJlZ2lzdGVyQnJlYWtwb2ludHMoKSxiLnNldFByb3BzKCksYi5zZXR1cEluZmluaXRlKCksYi5idWlsZEFycm93cygpLGIudXBkYXRlQXJyb3dzKCksYi5pbml0QXJyb3dFdmVudHMoKSxiLmJ1aWxkRG90cygpLGIudXBkYXRlRG90cygpLGIuaW5pdERvdEV2ZW50cygpLGIuY2xlYW5VcFNsaWRlRXZlbnRzKCksYi5pbml0U2xpZGVFdmVudHMoKSxiLmNoZWNrUmVzcG9uc2l2ZSghMSwhMCksYi5vcHRpb25zLmZvY3VzT25TZWxlY3Q9PT0hMCYmYShiLiRzbGlkZVRyYWNrKS5jaGlsZHJlbigpLm9uKFwiY2xpY2suc2xpY2tcIixiLnNlbGVjdEhhbmRsZXIpLGIuc2V0U2xpZGVDbGFzc2VzKFwibnVtYmVyXCI9PXR5cGVvZiBiLmN1cnJlbnRTbGlkZT9iLmN1cnJlbnRTbGlkZTowKSxiLnNldFBvc2l0aW9uKCksYi5mb2N1c0hhbmRsZXIoKSxiLnBhdXNlZD0hYi5vcHRpb25zLmF1dG9wbGF5LGIuYXV0b1BsYXkoKSxiLiRzbGlkZXIudHJpZ2dlcihcInJlSW5pdFwiLFtiXSl9LGIucHJvdG90eXBlLnJlc2l6ZT1mdW5jdGlvbigpe3ZhciBiPXRoaXM7YSh3aW5kb3cpLndpZHRoKCkhPT1iLndpbmRvd1dpZHRoJiYoY2xlYXJUaW1lb3V0KGIud2luZG93RGVsYXkpLGIud2luZG93RGVsYXk9d2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24oKXtiLndpbmRvd1dpZHRoPWEod2luZG93KS53aWR0aCgpLGIuY2hlY2tSZXNwb25zaXZlKCksYi51bnNsaWNrZWR8fGIuc2V0UG9zaXRpb24oKX0sNTApKX0sYi5wcm90b3R5cGUucmVtb3ZlU2xpZGU9Yi5wcm90b3R5cGUuc2xpY2tSZW1vdmU9ZnVuY3Rpb24oYSxiLGMpe3ZhciBkPXRoaXM7cmV0dXJuXCJib29sZWFuXCI9PXR5cGVvZiBhPyhiPWEsYT1iPT09ITA/MDpkLnNsaWRlQ291bnQtMSk6YT1iPT09ITA/LS1hOmEsZC5zbGlkZUNvdW50PDF8fDA+YXx8YT5kLnNsaWRlQ291bnQtMT8hMTooZC51bmxvYWQoKSxjPT09ITA/ZC4kc2xpZGVUcmFjay5jaGlsZHJlbigpLnJlbW92ZSgpOmQuJHNsaWRlVHJhY2suY2hpbGRyZW4odGhpcy5vcHRpb25zLnNsaWRlKS5lcShhKS5yZW1vdmUoKSxkLiRzbGlkZXM9ZC4kc2xpZGVUcmFjay5jaGlsZHJlbih0aGlzLm9wdGlvbnMuc2xpZGUpLGQuJHNsaWRlVHJhY2suY2hpbGRyZW4odGhpcy5vcHRpb25zLnNsaWRlKS5kZXRhY2goKSxkLiRzbGlkZVRyYWNrLmFwcGVuZChkLiRzbGlkZXMpLGQuJHNsaWRlc0NhY2hlPWQuJHNsaWRlcyx2b2lkIGQucmVpbml0KCkpfSxiLnByb3RvdHlwZS5zZXRDU1M9ZnVuY3Rpb24oYSl7dmFyIGQsZSxiPXRoaXMsYz17fTtiLm9wdGlvbnMucnRsPT09ITAmJihhPS1hKSxkPVwibGVmdFwiPT1iLnBvc2l0aW9uUHJvcD9NYXRoLmNlaWwoYSkrXCJweFwiOlwiMHB4XCIsZT1cInRvcFwiPT1iLnBvc2l0aW9uUHJvcD9NYXRoLmNlaWwoYSkrXCJweFwiOlwiMHB4XCIsY1tiLnBvc2l0aW9uUHJvcF09YSxiLnRyYW5zZm9ybXNFbmFibGVkPT09ITE/Yi4kc2xpZGVUcmFjay5jc3MoYyk6KGM9e30sYi5jc3NUcmFuc2l0aW9ucz09PSExPyhjW2IuYW5pbVR5cGVdPVwidHJhbnNsYXRlKFwiK2QrXCIsIFwiK2UrXCIpXCIsYi4kc2xpZGVUcmFjay5jc3MoYykpOihjW2IuYW5pbVR5cGVdPVwidHJhbnNsYXRlM2QoXCIrZCtcIiwgXCIrZStcIiwgMHB4KVwiLGIuJHNsaWRlVHJhY2suY3NzKGMpKSl9LGIucHJvdG90eXBlLnNldERpbWVuc2lvbnM9ZnVuY3Rpb24oKXt2YXIgYT10aGlzO2Eub3B0aW9ucy52ZXJ0aWNhbD09PSExP2Eub3B0aW9ucy5jZW50ZXJNb2RlPT09ITAmJmEuJGxpc3QuY3NzKHtwYWRkaW5nOlwiMHB4IFwiK2Eub3B0aW9ucy5jZW50ZXJQYWRkaW5nfSk6KGEuJGxpc3QuaGVpZ2h0KGEuJHNsaWRlcy5maXJzdCgpLm91dGVySGVpZ2h0KCEwKSphLm9wdGlvbnMuc2xpZGVzVG9TaG93KSxhLm9wdGlvbnMuY2VudGVyTW9kZT09PSEwJiZhLiRsaXN0LmNzcyh7cGFkZGluZzphLm9wdGlvbnMuY2VudGVyUGFkZGluZytcIiAwcHhcIn0pKSxhLmxpc3RXaWR0aD1hLiRsaXN0LndpZHRoKCksYS5saXN0SGVpZ2h0PWEuJGxpc3QuaGVpZ2h0KCksYS5vcHRpb25zLnZlcnRpY2FsPT09ITEmJmEub3B0aW9ucy52YXJpYWJsZVdpZHRoPT09ITE/KGEuc2xpZGVXaWR0aD1NYXRoLmNlaWwoYS5saXN0V2lkdGgvYS5vcHRpb25zLnNsaWRlc1RvU2hvdyksYS4kc2xpZGVUcmFjay53aWR0aChNYXRoLmNlaWwoYS5zbGlkZVdpZHRoKmEuJHNsaWRlVHJhY2suY2hpbGRyZW4oXCIuc2xpY2stc2xpZGVcIikubGVuZ3RoKSkpOmEub3B0aW9ucy52YXJpYWJsZVdpZHRoPT09ITA/YS4kc2xpZGVUcmFjay53aWR0aCg1ZTMqYS5zbGlkZUNvdW50KTooYS5zbGlkZVdpZHRoPU1hdGguY2VpbChhLmxpc3RXaWR0aCksYS4kc2xpZGVUcmFjay5oZWlnaHQoTWF0aC5jZWlsKGEuJHNsaWRlcy5maXJzdCgpLm91dGVySGVpZ2h0KCEwKSphLiRzbGlkZVRyYWNrLmNoaWxkcmVuKFwiLnNsaWNrLXNsaWRlXCIpLmxlbmd0aCkpKTt2YXIgYj1hLiRzbGlkZXMuZmlyc3QoKS5vdXRlcldpZHRoKCEwKS1hLiRzbGlkZXMuZmlyc3QoKS53aWR0aCgpO2Eub3B0aW9ucy52YXJpYWJsZVdpZHRoPT09ITEmJmEuJHNsaWRlVHJhY2suY2hpbGRyZW4oXCIuc2xpY2stc2xpZGVcIikud2lkdGgoYS5zbGlkZVdpZHRoLWIpfSxiLnByb3RvdHlwZS5zZXRGYWRlPWZ1bmN0aW9uKCl7dmFyIGMsYj10aGlzO2IuJHNsaWRlcy5lYWNoKGZ1bmN0aW9uKGQsZSl7Yz1iLnNsaWRlV2lkdGgqZCotMSxiLm9wdGlvbnMucnRsPT09ITA/YShlKS5jc3Moe3Bvc2l0aW9uOlwicmVsYXRpdmVcIixyaWdodDpjLHRvcDowLHpJbmRleDpiLm9wdGlvbnMuekluZGV4LTIsb3BhY2l0eTowfSk6YShlKS5jc3Moe3Bvc2l0aW9uOlwicmVsYXRpdmVcIixsZWZ0OmMsdG9wOjAsekluZGV4OmIub3B0aW9ucy56SW5kZXgtMixvcGFjaXR5OjB9KX0pLGIuJHNsaWRlcy5lcShiLmN1cnJlbnRTbGlkZSkuY3NzKHt6SW5kZXg6Yi5vcHRpb25zLnpJbmRleC0xLG9wYWNpdHk6MX0pfSxiLnByb3RvdHlwZS5zZXRIZWlnaHQ9ZnVuY3Rpb24oKXt2YXIgYT10aGlzO2lmKDE9PT1hLm9wdGlvbnMuc2xpZGVzVG9TaG93JiZhLm9wdGlvbnMuYWRhcHRpdmVIZWlnaHQ9PT0hMCYmYS5vcHRpb25zLnZlcnRpY2FsPT09ITEpe3ZhciBiPWEuJHNsaWRlcy5lcShhLmN1cnJlbnRTbGlkZSkub3V0ZXJIZWlnaHQoITApO2EuJGxpc3QuY3NzKFwiaGVpZ2h0XCIsYil9fSxiLnByb3RvdHlwZS5zZXRPcHRpb249Yi5wcm90b3R5cGUuc2xpY2tTZXRPcHRpb249ZnVuY3Rpb24oKXt2YXIgYyxkLGUsZixoLGI9dGhpcyxnPSExO2lmKFwib2JqZWN0XCI9PT1hLnR5cGUoYXJndW1lbnRzWzBdKT8oZT1hcmd1bWVudHNbMF0sZz1hcmd1bWVudHNbMV0saD1cIm11bHRpcGxlXCIpOlwic3RyaW5nXCI9PT1hLnR5cGUoYXJndW1lbnRzWzBdKSYmKGU9YXJndW1lbnRzWzBdLGY9YXJndW1lbnRzWzFdLGc9YXJndW1lbnRzWzJdLFwicmVzcG9uc2l2ZVwiPT09YXJndW1lbnRzWzBdJiZcImFycmF5XCI9PT1hLnR5cGUoYXJndW1lbnRzWzFdKT9oPVwicmVzcG9uc2l2ZVwiOlwidW5kZWZpbmVkXCIhPXR5cGVvZiBhcmd1bWVudHNbMV0mJihoPVwic2luZ2xlXCIpKSxcInNpbmdsZVwiPT09aCliLm9wdGlvbnNbZV09ZjtlbHNlIGlmKFwibXVsdGlwbGVcIj09PWgpYS5lYWNoKGUsZnVuY3Rpb24oYSxjKXtiLm9wdGlvbnNbYV09Y30pO2Vsc2UgaWYoXCJyZXNwb25zaXZlXCI9PT1oKWZvcihkIGluIGYpaWYoXCJhcnJheVwiIT09YS50eXBlKGIub3B0aW9ucy5yZXNwb25zaXZlKSliLm9wdGlvbnMucmVzcG9uc2l2ZT1bZltkXV07ZWxzZXtmb3IoYz1iLm9wdGlvbnMucmVzcG9uc2l2ZS5sZW5ndGgtMTtjPj0wOyliLm9wdGlvbnMucmVzcG9uc2l2ZVtjXS5icmVha3BvaW50PT09ZltkXS5icmVha3BvaW50JiZiLm9wdGlvbnMucmVzcG9uc2l2ZS5zcGxpY2UoYywxKSxjLS07Yi5vcHRpb25zLnJlc3BvbnNpdmUucHVzaChmW2RdKX1nJiYoYi51bmxvYWQoKSxiLnJlaW5pdCgpKX0sYi5wcm90b3R5cGUuc2V0UG9zaXRpb249ZnVuY3Rpb24oKXt2YXIgYT10aGlzO2Euc2V0RGltZW5zaW9ucygpLGEuc2V0SGVpZ2h0KCksYS5vcHRpb25zLmZhZGU9PT0hMT9hLnNldENTUyhhLmdldExlZnQoYS5jdXJyZW50U2xpZGUpKTphLnNldEZhZGUoKSxhLiRzbGlkZXIudHJpZ2dlcihcInNldFBvc2l0aW9uXCIsW2FdKX0sYi5wcm90b3R5cGUuc2V0UHJvcHM9ZnVuY3Rpb24oKXt2YXIgYT10aGlzLGI9ZG9jdW1lbnQuYm9keS5zdHlsZTthLnBvc2l0aW9uUHJvcD1hLm9wdGlvbnMudmVydGljYWw9PT0hMD9cInRvcFwiOlwibGVmdFwiLFwidG9wXCI9PT1hLnBvc2l0aW9uUHJvcD9hLiRzbGlkZXIuYWRkQ2xhc3MoXCJzbGljay12ZXJ0aWNhbFwiKTphLiRzbGlkZXIucmVtb3ZlQ2xhc3MoXCJzbGljay12ZXJ0aWNhbFwiKSwodm9pZCAwIT09Yi5XZWJraXRUcmFuc2l0aW9ufHx2b2lkIDAhPT1iLk1velRyYW5zaXRpb258fHZvaWQgMCE9PWIubXNUcmFuc2l0aW9uKSYmYS5vcHRpb25zLnVzZUNTUz09PSEwJiYoYS5jc3NUcmFuc2l0aW9ucz0hMCksYS5vcHRpb25zLmZhZGUmJihcIm51bWJlclwiPT10eXBlb2YgYS5vcHRpb25zLnpJbmRleD9hLm9wdGlvbnMuekluZGV4PDMmJihhLm9wdGlvbnMuekluZGV4PTMpOmEub3B0aW9ucy56SW5kZXg9YS5kZWZhdWx0cy56SW5kZXgpLHZvaWQgMCE9PWIuT1RyYW5zZm9ybSYmKGEuYW5pbVR5cGU9XCJPVHJhbnNmb3JtXCIsYS50cmFuc2Zvcm1UeXBlPVwiLW8tdHJhbnNmb3JtXCIsYS50cmFuc2l0aW9uVHlwZT1cIk9UcmFuc2l0aW9uXCIsdm9pZCAwPT09Yi5wZXJzcGVjdGl2ZVByb3BlcnR5JiZ2b2lkIDA9PT1iLndlYmtpdFBlcnNwZWN0aXZlJiYoYS5hbmltVHlwZT0hMSkpLHZvaWQgMCE9PWIuTW96VHJhbnNmb3JtJiYoYS5hbmltVHlwZT1cIk1velRyYW5zZm9ybVwiLGEudHJhbnNmb3JtVHlwZT1cIi1tb3otdHJhbnNmb3JtXCIsYS50cmFuc2l0aW9uVHlwZT1cIk1velRyYW5zaXRpb25cIix2b2lkIDA9PT1iLnBlcnNwZWN0aXZlUHJvcGVydHkmJnZvaWQgMD09PWIuTW96UGVyc3BlY3RpdmUmJihhLmFuaW1UeXBlPSExKSksdm9pZCAwIT09Yi53ZWJraXRUcmFuc2Zvcm0mJihhLmFuaW1UeXBlPVwid2Via2l0VHJhbnNmb3JtXCIsYS50cmFuc2Zvcm1UeXBlPVwiLXdlYmtpdC10cmFuc2Zvcm1cIixhLnRyYW5zaXRpb25UeXBlPVwid2Via2l0VHJhbnNpdGlvblwiLHZvaWQgMD09PWIucGVyc3BlY3RpdmVQcm9wZXJ0eSYmdm9pZCAwPT09Yi53ZWJraXRQZXJzcGVjdGl2ZSYmKGEuYW5pbVR5cGU9ITEpKSx2b2lkIDAhPT1iLm1zVHJhbnNmb3JtJiYoYS5hbmltVHlwZT1cIm1zVHJhbnNmb3JtXCIsYS50cmFuc2Zvcm1UeXBlPVwiLW1zLXRyYW5zZm9ybVwiLGEudHJhbnNpdGlvblR5cGU9XCJtc1RyYW5zaXRpb25cIix2b2lkIDA9PT1iLm1zVHJhbnNmb3JtJiYoYS5hbmltVHlwZT0hMSkpLHZvaWQgMCE9PWIudHJhbnNmb3JtJiZhLmFuaW1UeXBlIT09ITEmJihhLmFuaW1UeXBlPVwidHJhbnNmb3JtXCIsYS50cmFuc2Zvcm1UeXBlPVwidHJhbnNmb3JtXCIsYS50cmFuc2l0aW9uVHlwZT1cInRyYW5zaXRpb25cIiksYS50cmFuc2Zvcm1zRW5hYmxlZD1hLm9wdGlvbnMudXNlVHJhbnNmb3JtJiZudWxsIT09YS5hbmltVHlwZSYmYS5hbmltVHlwZSE9PSExfSxiLnByb3RvdHlwZS5zZXRTbGlkZUNsYXNzZXM9ZnVuY3Rpb24oYSl7dmFyIGMsZCxlLGYsYj10aGlzO2Q9Yi4kc2xpZGVyLmZpbmQoXCIuc2xpY2stc2xpZGVcIikucmVtb3ZlQ2xhc3MoXCJzbGljay1hY3RpdmUgc2xpY2stY2VudGVyIHNsaWNrLWN1cnJlbnRcIikuYXR0cihcImFyaWEtaGlkZGVuXCIsXCJ0cnVlXCIpLGIuJHNsaWRlcy5lcShhKS5hZGRDbGFzcyhcInNsaWNrLWN1cnJlbnRcIiksYi5vcHRpb25zLmNlbnRlck1vZGU9PT0hMD8oYz1NYXRoLmZsb29yKGIub3B0aW9ucy5zbGlkZXNUb1Nob3cvMiksYi5vcHRpb25zLmluZmluaXRlPT09ITAmJihhPj1jJiZhPD1iLnNsaWRlQ291bnQtMS1jP2IuJHNsaWRlcy5zbGljZShhLWMsYStjKzEpLmFkZENsYXNzKFwic2xpY2stYWN0aXZlXCIpLmF0dHIoXCJhcmlhLWhpZGRlblwiLFwiZmFsc2VcIik6KGU9Yi5vcHRpb25zLnNsaWRlc1RvU2hvdythLFxuZC5zbGljZShlLWMrMSxlK2MrMikuYWRkQ2xhc3MoXCJzbGljay1hY3RpdmVcIikuYXR0cihcImFyaWEtaGlkZGVuXCIsXCJmYWxzZVwiKSksMD09PWE/ZC5lcShkLmxlbmd0aC0xLWIub3B0aW9ucy5zbGlkZXNUb1Nob3cpLmFkZENsYXNzKFwic2xpY2stY2VudGVyXCIpOmE9PT1iLnNsaWRlQ291bnQtMSYmZC5lcShiLm9wdGlvbnMuc2xpZGVzVG9TaG93KS5hZGRDbGFzcyhcInNsaWNrLWNlbnRlclwiKSksYi4kc2xpZGVzLmVxKGEpLmFkZENsYXNzKFwic2xpY2stY2VudGVyXCIpKTphPj0wJiZhPD1iLnNsaWRlQ291bnQtYi5vcHRpb25zLnNsaWRlc1RvU2hvdz9iLiRzbGlkZXMuc2xpY2UoYSxhK2Iub3B0aW9ucy5zbGlkZXNUb1Nob3cpLmFkZENsYXNzKFwic2xpY2stYWN0aXZlXCIpLmF0dHIoXCJhcmlhLWhpZGRlblwiLFwiZmFsc2VcIik6ZC5sZW5ndGg8PWIub3B0aW9ucy5zbGlkZXNUb1Nob3c/ZC5hZGRDbGFzcyhcInNsaWNrLWFjdGl2ZVwiKS5hdHRyKFwiYXJpYS1oaWRkZW5cIixcImZhbHNlXCIpOihmPWIuc2xpZGVDb3VudCViLm9wdGlvbnMuc2xpZGVzVG9TaG93LGU9Yi5vcHRpb25zLmluZmluaXRlPT09ITA/Yi5vcHRpb25zLnNsaWRlc1RvU2hvdythOmEsYi5vcHRpb25zLnNsaWRlc1RvU2hvdz09Yi5vcHRpb25zLnNsaWRlc1RvU2Nyb2xsJiZiLnNsaWRlQ291bnQtYTxiLm9wdGlvbnMuc2xpZGVzVG9TaG93P2Quc2xpY2UoZS0oYi5vcHRpb25zLnNsaWRlc1RvU2hvdy1mKSxlK2YpLmFkZENsYXNzKFwic2xpY2stYWN0aXZlXCIpLmF0dHIoXCJhcmlhLWhpZGRlblwiLFwiZmFsc2VcIik6ZC5zbGljZShlLGUrYi5vcHRpb25zLnNsaWRlc1RvU2hvdykuYWRkQ2xhc3MoXCJzbGljay1hY3RpdmVcIikuYXR0cihcImFyaWEtaGlkZGVuXCIsXCJmYWxzZVwiKSksXCJvbmRlbWFuZFwiPT09Yi5vcHRpb25zLmxhenlMb2FkJiZiLmxhenlMb2FkKCl9LGIucHJvdG90eXBlLnNldHVwSW5maW5pdGU9ZnVuY3Rpb24oKXt2YXIgYyxkLGUsYj10aGlzO2lmKGIub3B0aW9ucy5mYWRlPT09ITAmJihiLm9wdGlvbnMuY2VudGVyTW9kZT0hMSksYi5vcHRpb25zLmluZmluaXRlPT09ITAmJmIub3B0aW9ucy5mYWRlPT09ITEmJihkPW51bGwsYi5zbGlkZUNvdW50PmIub3B0aW9ucy5zbGlkZXNUb1Nob3cpKXtmb3IoZT1iLm9wdGlvbnMuY2VudGVyTW9kZT09PSEwP2Iub3B0aW9ucy5zbGlkZXNUb1Nob3crMTpiLm9wdGlvbnMuc2xpZGVzVG9TaG93LGM9Yi5zbGlkZUNvdW50O2M+Yi5zbGlkZUNvdW50LWU7Yy09MSlkPWMtMSxhKGIuJHNsaWRlc1tkXSkuY2xvbmUoITApLmF0dHIoXCJpZFwiLFwiXCIpLmF0dHIoXCJkYXRhLXNsaWNrLWluZGV4XCIsZC1iLnNsaWRlQ291bnQpLnByZXBlbmRUbyhiLiRzbGlkZVRyYWNrKS5hZGRDbGFzcyhcInNsaWNrLWNsb25lZFwiKTtmb3IoYz0wO2U+YztjKz0xKWQ9YyxhKGIuJHNsaWRlc1tkXSkuY2xvbmUoITApLmF0dHIoXCJpZFwiLFwiXCIpLmF0dHIoXCJkYXRhLXNsaWNrLWluZGV4XCIsZCtiLnNsaWRlQ291bnQpLmFwcGVuZFRvKGIuJHNsaWRlVHJhY2spLmFkZENsYXNzKFwic2xpY2stY2xvbmVkXCIpO2IuJHNsaWRlVHJhY2suZmluZChcIi5zbGljay1jbG9uZWRcIikuZmluZChcIltpZF1cIikuZWFjaChmdW5jdGlvbigpe2EodGhpcykuYXR0cihcImlkXCIsXCJcIil9KX19LGIucHJvdG90eXBlLmludGVycnVwdD1mdW5jdGlvbihhKXt2YXIgYj10aGlzO2F8fGIuYXV0b1BsYXkoKSxiLmludGVycnVwdGVkPWF9LGIucHJvdG90eXBlLnNlbGVjdEhhbmRsZXI9ZnVuY3Rpb24oYil7dmFyIGM9dGhpcyxkPWEoYi50YXJnZXQpLmlzKFwiLnNsaWNrLXNsaWRlXCIpP2EoYi50YXJnZXQpOmEoYi50YXJnZXQpLnBhcmVudHMoXCIuc2xpY2stc2xpZGVcIiksZT1wYXJzZUludChkLmF0dHIoXCJkYXRhLXNsaWNrLWluZGV4XCIpKTtyZXR1cm4gZXx8KGU9MCksYy5zbGlkZUNvdW50PD1jLm9wdGlvbnMuc2xpZGVzVG9TaG93PyhjLnNldFNsaWRlQ2xhc3NlcyhlKSx2b2lkIGMuYXNOYXZGb3IoZSkpOnZvaWQgYy5zbGlkZUhhbmRsZXIoZSl9LGIucHJvdG90eXBlLnNsaWRlSGFuZGxlcj1mdW5jdGlvbihhLGIsYyl7dmFyIGQsZSxmLGcsaixoPW51bGwsaT10aGlzO3JldHVybiBiPWJ8fCExLGkuYW5pbWF0aW5nPT09ITAmJmkub3B0aW9ucy53YWl0Rm9yQW5pbWF0ZT09PSEwfHxpLm9wdGlvbnMuZmFkZT09PSEwJiZpLmN1cnJlbnRTbGlkZT09PWF8fGkuc2xpZGVDb3VudDw9aS5vcHRpb25zLnNsaWRlc1RvU2hvdz92b2lkIDA6KGI9PT0hMSYmaS5hc05hdkZvcihhKSxkPWEsaD1pLmdldExlZnQoZCksZz1pLmdldExlZnQoaS5jdXJyZW50U2xpZGUpLGkuY3VycmVudExlZnQ9bnVsbD09PWkuc3dpcGVMZWZ0P2c6aS5zd2lwZUxlZnQsaS5vcHRpb25zLmluZmluaXRlPT09ITEmJmkub3B0aW9ucy5jZW50ZXJNb2RlPT09ITEmJigwPmF8fGE+aS5nZXREb3RDb3VudCgpKmkub3B0aW9ucy5zbGlkZXNUb1Njcm9sbCk/dm9pZChpLm9wdGlvbnMuZmFkZT09PSExJiYoZD1pLmN1cnJlbnRTbGlkZSxjIT09ITA/aS5hbmltYXRlU2xpZGUoZyxmdW5jdGlvbigpe2kucG9zdFNsaWRlKGQpfSk6aS5wb3N0U2xpZGUoZCkpKTppLm9wdGlvbnMuaW5maW5pdGU9PT0hMSYmaS5vcHRpb25zLmNlbnRlck1vZGU9PT0hMCYmKDA+YXx8YT5pLnNsaWRlQ291bnQtaS5vcHRpb25zLnNsaWRlc1RvU2Nyb2xsKT92b2lkKGkub3B0aW9ucy5mYWRlPT09ITEmJihkPWkuY3VycmVudFNsaWRlLGMhPT0hMD9pLmFuaW1hdGVTbGlkZShnLGZ1bmN0aW9uKCl7aS5wb3N0U2xpZGUoZCl9KTppLnBvc3RTbGlkZShkKSkpOihpLm9wdGlvbnMuYXV0b3BsYXkmJmNsZWFySW50ZXJ2YWwoaS5hdXRvUGxheVRpbWVyKSxlPTA+ZD9pLnNsaWRlQ291bnQlaS5vcHRpb25zLnNsaWRlc1RvU2Nyb2xsIT09MD9pLnNsaWRlQ291bnQtaS5zbGlkZUNvdW50JWkub3B0aW9ucy5zbGlkZXNUb1Njcm9sbDppLnNsaWRlQ291bnQrZDpkPj1pLnNsaWRlQ291bnQ/aS5zbGlkZUNvdW50JWkub3B0aW9ucy5zbGlkZXNUb1Njcm9sbCE9PTA/MDpkLWkuc2xpZGVDb3VudDpkLGkuYW5pbWF0aW5nPSEwLGkuJHNsaWRlci50cmlnZ2VyKFwiYmVmb3JlQ2hhbmdlXCIsW2ksaS5jdXJyZW50U2xpZGUsZV0pLGY9aS5jdXJyZW50U2xpZGUsaS5jdXJyZW50U2xpZGU9ZSxpLnNldFNsaWRlQ2xhc3NlcyhpLmN1cnJlbnRTbGlkZSksaS5vcHRpb25zLmFzTmF2Rm9yJiYoaj1pLmdldE5hdlRhcmdldCgpLGo9ai5zbGljayhcImdldFNsaWNrXCIpLGouc2xpZGVDb3VudDw9ai5vcHRpb25zLnNsaWRlc1RvU2hvdyYmai5zZXRTbGlkZUNsYXNzZXMoaS5jdXJyZW50U2xpZGUpKSxpLnVwZGF0ZURvdHMoKSxpLnVwZGF0ZUFycm93cygpLGkub3B0aW9ucy5mYWRlPT09ITA/KGMhPT0hMD8oaS5mYWRlU2xpZGVPdXQoZiksaS5mYWRlU2xpZGUoZSxmdW5jdGlvbigpe2kucG9zdFNsaWRlKGUpfSkpOmkucG9zdFNsaWRlKGUpLHZvaWQgaS5hbmltYXRlSGVpZ2h0KCkpOnZvaWQoYyE9PSEwP2kuYW5pbWF0ZVNsaWRlKGgsZnVuY3Rpb24oKXtpLnBvc3RTbGlkZShlKX0pOmkucG9zdFNsaWRlKGUpKSkpfSxiLnByb3RvdHlwZS5zdGFydExvYWQ9ZnVuY3Rpb24oKXt2YXIgYT10aGlzO2Eub3B0aW9ucy5hcnJvd3M9PT0hMCYmYS5zbGlkZUNvdW50PmEub3B0aW9ucy5zbGlkZXNUb1Nob3cmJihhLiRwcmV2QXJyb3cuaGlkZSgpLGEuJG5leHRBcnJvdy5oaWRlKCkpLGEub3B0aW9ucy5kb3RzPT09ITAmJmEuc2xpZGVDb3VudD5hLm9wdGlvbnMuc2xpZGVzVG9TaG93JiZhLiRkb3RzLmhpZGUoKSxhLiRzbGlkZXIuYWRkQ2xhc3MoXCJzbGljay1sb2FkaW5nXCIpfSxiLnByb3RvdHlwZS5zd2lwZURpcmVjdGlvbj1mdW5jdGlvbigpe3ZhciBhLGIsYyxkLGU9dGhpcztyZXR1cm4gYT1lLnRvdWNoT2JqZWN0LnN0YXJ0WC1lLnRvdWNoT2JqZWN0LmN1clgsYj1lLnRvdWNoT2JqZWN0LnN0YXJ0WS1lLnRvdWNoT2JqZWN0LmN1clksYz1NYXRoLmF0YW4yKGIsYSksZD1NYXRoLnJvdW5kKDE4MCpjL01hdGguUEkpLDA+ZCYmKGQ9MzYwLU1hdGguYWJzKGQpKSw0NT49ZCYmZD49MD9lLm9wdGlvbnMucnRsPT09ITE/XCJsZWZ0XCI6XCJyaWdodFwiOjM2MD49ZCYmZD49MzE1P2Uub3B0aW9ucy5ydGw9PT0hMT9cImxlZnRcIjpcInJpZ2h0XCI6ZD49MTM1JiYyMjU+PWQ/ZS5vcHRpb25zLnJ0bD09PSExP1wicmlnaHRcIjpcImxlZnRcIjplLm9wdGlvbnMudmVydGljYWxTd2lwaW5nPT09ITA/ZD49MzUmJjEzNT49ZD9cImRvd25cIjpcInVwXCI6XCJ2ZXJ0aWNhbFwifSxiLnByb3RvdHlwZS5zd2lwZUVuZD1mdW5jdGlvbihhKXt2YXIgYyxkLGI9dGhpcztpZihiLmRyYWdnaW5nPSExLGIuaW50ZXJydXB0ZWQ9ITEsYi5zaG91bGRDbGljaz1iLnRvdWNoT2JqZWN0LnN3aXBlTGVuZ3RoPjEwPyExOiEwLHZvaWQgMD09PWIudG91Y2hPYmplY3QuY3VyWClyZXR1cm4hMTtpZihiLnRvdWNoT2JqZWN0LmVkZ2VIaXQ9PT0hMCYmYi4kc2xpZGVyLnRyaWdnZXIoXCJlZGdlXCIsW2IsYi5zd2lwZURpcmVjdGlvbigpXSksYi50b3VjaE9iamVjdC5zd2lwZUxlbmd0aD49Yi50b3VjaE9iamVjdC5taW5Td2lwZSl7c3dpdGNoKGQ9Yi5zd2lwZURpcmVjdGlvbigpKXtjYXNlXCJsZWZ0XCI6Y2FzZVwiZG93blwiOmM9Yi5vcHRpb25zLnN3aXBlVG9TbGlkZT9iLmNoZWNrTmF2aWdhYmxlKGIuY3VycmVudFNsaWRlK2IuZ2V0U2xpZGVDb3VudCgpKTpiLmN1cnJlbnRTbGlkZStiLmdldFNsaWRlQ291bnQoKSxiLmN1cnJlbnREaXJlY3Rpb249MDticmVhaztjYXNlXCJyaWdodFwiOmNhc2VcInVwXCI6Yz1iLm9wdGlvbnMuc3dpcGVUb1NsaWRlP2IuY2hlY2tOYXZpZ2FibGUoYi5jdXJyZW50U2xpZGUtYi5nZXRTbGlkZUNvdW50KCkpOmIuY3VycmVudFNsaWRlLWIuZ2V0U2xpZGVDb3VudCgpLGIuY3VycmVudERpcmVjdGlvbj0xfVwidmVydGljYWxcIiE9ZCYmKGIuc2xpZGVIYW5kbGVyKGMpLGIudG91Y2hPYmplY3Q9e30sYi4kc2xpZGVyLnRyaWdnZXIoXCJzd2lwZVwiLFtiLGRdKSl9ZWxzZSBiLnRvdWNoT2JqZWN0LnN0YXJ0WCE9PWIudG91Y2hPYmplY3QuY3VyWCYmKGIuc2xpZGVIYW5kbGVyKGIuY3VycmVudFNsaWRlKSxiLnRvdWNoT2JqZWN0PXt9KX0sYi5wcm90b3R5cGUuc3dpcGVIYW5kbGVyPWZ1bmN0aW9uKGEpe3ZhciBiPXRoaXM7aWYoIShiLm9wdGlvbnMuc3dpcGU9PT0hMXx8XCJvbnRvdWNoZW5kXCJpbiBkb2N1bWVudCYmYi5vcHRpb25zLnN3aXBlPT09ITF8fGIub3B0aW9ucy5kcmFnZ2FibGU9PT0hMSYmLTEhPT1hLnR5cGUuaW5kZXhPZihcIm1vdXNlXCIpKSlzd2l0Y2goYi50b3VjaE9iamVjdC5maW5nZXJDb3VudD1hLm9yaWdpbmFsRXZlbnQmJnZvaWQgMCE9PWEub3JpZ2luYWxFdmVudC50b3VjaGVzP2Eub3JpZ2luYWxFdmVudC50b3VjaGVzLmxlbmd0aDoxLGIudG91Y2hPYmplY3QubWluU3dpcGU9Yi5saXN0V2lkdGgvYi5vcHRpb25zLnRvdWNoVGhyZXNob2xkLGIub3B0aW9ucy52ZXJ0aWNhbFN3aXBpbmc9PT0hMCYmKGIudG91Y2hPYmplY3QubWluU3dpcGU9Yi5saXN0SGVpZ2h0L2Iub3B0aW9ucy50b3VjaFRocmVzaG9sZCksYS5kYXRhLmFjdGlvbil7Y2FzZVwic3RhcnRcIjpiLnN3aXBlU3RhcnQoYSk7YnJlYWs7Y2FzZVwibW92ZVwiOmIuc3dpcGVNb3ZlKGEpO2JyZWFrO2Nhc2VcImVuZFwiOmIuc3dpcGVFbmQoYSl9fSxiLnByb3RvdHlwZS5zd2lwZU1vdmU9ZnVuY3Rpb24oYSl7dmFyIGQsZSxmLGcsaCxiPXRoaXM7cmV0dXJuIGg9dm9pZCAwIT09YS5vcmlnaW5hbEV2ZW50P2Eub3JpZ2luYWxFdmVudC50b3VjaGVzOm51bGwsIWIuZHJhZ2dpbmd8fGgmJjEhPT1oLmxlbmd0aD8hMTooZD1iLmdldExlZnQoYi5jdXJyZW50U2xpZGUpLGIudG91Y2hPYmplY3QuY3VyWD12b2lkIDAhPT1oP2hbMF0ucGFnZVg6YS5jbGllbnRYLGIudG91Y2hPYmplY3QuY3VyWT12b2lkIDAhPT1oP2hbMF0ucGFnZVk6YS5jbGllbnRZLGIudG91Y2hPYmplY3Quc3dpcGVMZW5ndGg9TWF0aC5yb3VuZChNYXRoLnNxcnQoTWF0aC5wb3coYi50b3VjaE9iamVjdC5jdXJYLWIudG91Y2hPYmplY3Quc3RhcnRYLDIpKSksYi5vcHRpb25zLnZlcnRpY2FsU3dpcGluZz09PSEwJiYoYi50b3VjaE9iamVjdC5zd2lwZUxlbmd0aD1NYXRoLnJvdW5kKE1hdGguc3FydChNYXRoLnBvdyhiLnRvdWNoT2JqZWN0LmN1clktYi50b3VjaE9iamVjdC5zdGFydFksMikpKSksZT1iLnN3aXBlRGlyZWN0aW9uKCksXCJ2ZXJ0aWNhbFwiIT09ZT8odm9pZCAwIT09YS5vcmlnaW5hbEV2ZW50JiZiLnRvdWNoT2JqZWN0LnN3aXBlTGVuZ3RoPjQmJmEucHJldmVudERlZmF1bHQoKSxnPShiLm9wdGlvbnMucnRsPT09ITE/MTotMSkqKGIudG91Y2hPYmplY3QuY3VyWD5iLnRvdWNoT2JqZWN0LnN0YXJ0WD8xOi0xKSxiLm9wdGlvbnMudmVydGljYWxTd2lwaW5nPT09ITAmJihnPWIudG91Y2hPYmplY3QuY3VyWT5iLnRvdWNoT2JqZWN0LnN0YXJ0WT8xOi0xKSxmPWIudG91Y2hPYmplY3Quc3dpcGVMZW5ndGgsYi50b3VjaE9iamVjdC5lZGdlSGl0PSExLGIub3B0aW9ucy5pbmZpbml0ZT09PSExJiYoMD09PWIuY3VycmVudFNsaWRlJiZcInJpZ2h0XCI9PT1lfHxiLmN1cnJlbnRTbGlkZT49Yi5nZXREb3RDb3VudCgpJiZcImxlZnRcIj09PWUpJiYoZj1iLnRvdWNoT2JqZWN0LnN3aXBlTGVuZ3RoKmIub3B0aW9ucy5lZGdlRnJpY3Rpb24sYi50b3VjaE9iamVjdC5lZGdlSGl0PSEwKSxiLm9wdGlvbnMudmVydGljYWw9PT0hMT9iLnN3aXBlTGVmdD1kK2YqZzpiLnN3aXBlTGVmdD1kK2YqKGIuJGxpc3QuaGVpZ2h0KCkvYi5saXN0V2lkdGgpKmcsYi5vcHRpb25zLnZlcnRpY2FsU3dpcGluZz09PSEwJiYoYi5zd2lwZUxlZnQ9ZCtmKmcpLGIub3B0aW9ucy5mYWRlPT09ITB8fGIub3B0aW9ucy50b3VjaE1vdmU9PT0hMT8hMTpiLmFuaW1hdGluZz09PSEwPyhiLnN3aXBlTGVmdD1udWxsLCExKTp2b2lkIGIuc2V0Q1NTKGIuc3dpcGVMZWZ0KSk6dm9pZCAwKX0sYi5wcm90b3R5cGUuc3dpcGVTdGFydD1mdW5jdGlvbihhKXt2YXIgYyxiPXRoaXM7cmV0dXJuIGIuaW50ZXJydXB0ZWQ9ITAsMSE9PWIudG91Y2hPYmplY3QuZmluZ2VyQ291bnR8fGIuc2xpZGVDb3VudDw9Yi5vcHRpb25zLnNsaWRlc1RvU2hvdz8oYi50b3VjaE9iamVjdD17fSwhMSk6KHZvaWQgMCE9PWEub3JpZ2luYWxFdmVudCYmdm9pZCAwIT09YS5vcmlnaW5hbEV2ZW50LnRvdWNoZXMmJihjPWEub3JpZ2luYWxFdmVudC50b3VjaGVzWzBdKSxiLnRvdWNoT2JqZWN0LnN0YXJ0WD1iLnRvdWNoT2JqZWN0LmN1clg9dm9pZCAwIT09Yz9jLnBhZ2VYOmEuY2xpZW50WCxiLnRvdWNoT2JqZWN0LnN0YXJ0WT1iLnRvdWNoT2JqZWN0LmN1clk9dm9pZCAwIT09Yz9jLnBhZ2VZOmEuY2xpZW50WSx2b2lkKGIuZHJhZ2dpbmc9ITApKX0sYi5wcm90b3R5cGUudW5maWx0ZXJTbGlkZXM9Yi5wcm90b3R5cGUuc2xpY2tVbmZpbHRlcj1mdW5jdGlvbigpe3ZhciBhPXRoaXM7bnVsbCE9PWEuJHNsaWRlc0NhY2hlJiYoYS51bmxvYWQoKSxhLiRzbGlkZVRyYWNrLmNoaWxkcmVuKHRoaXMub3B0aW9ucy5zbGlkZSkuZGV0YWNoKCksYS4kc2xpZGVzQ2FjaGUuYXBwZW5kVG8oYS4kc2xpZGVUcmFjayksYS5yZWluaXQoKSl9LGIucHJvdG90eXBlLnVubG9hZD1mdW5jdGlvbigpe3ZhciBiPXRoaXM7YShcIi5zbGljay1jbG9uZWRcIixiLiRzbGlkZXIpLnJlbW92ZSgpLGIuJGRvdHMmJmIuJGRvdHMucmVtb3ZlKCksYi4kcHJldkFycm93JiZiLmh0bWxFeHByLnRlc3QoYi5vcHRpb25zLnByZXZBcnJvdykmJmIuJHByZXZBcnJvdy5yZW1vdmUoKSxiLiRuZXh0QXJyb3cmJmIuaHRtbEV4cHIudGVzdChiLm9wdGlvbnMubmV4dEFycm93KSYmYi4kbmV4dEFycm93LnJlbW92ZSgpLGIuJHNsaWRlcy5yZW1vdmVDbGFzcyhcInNsaWNrLXNsaWRlIHNsaWNrLWFjdGl2ZSBzbGljay12aXNpYmxlIHNsaWNrLWN1cnJlbnRcIikuYXR0cihcImFyaWEtaGlkZGVuXCIsXCJ0cnVlXCIpLmNzcyhcIndpZHRoXCIsXCJcIil9LGIucHJvdG90eXBlLnVuc2xpY2s9ZnVuY3Rpb24oYSl7dmFyIGI9dGhpcztiLiRzbGlkZXIudHJpZ2dlcihcInVuc2xpY2tcIixbYixhXSksYi5kZXN0cm95KCl9LGIucHJvdG90eXBlLnVwZGF0ZUFycm93cz1mdW5jdGlvbigpe3ZhciBiLGE9dGhpcztiPU1hdGguZmxvb3IoYS5vcHRpb25zLnNsaWRlc1RvU2hvdy8yKSxhLm9wdGlvbnMuYXJyb3dzPT09ITAmJmEuc2xpZGVDb3VudD5hLm9wdGlvbnMuc2xpZGVzVG9TaG93JiYhYS5vcHRpb25zLmluZmluaXRlJiYoYS4kcHJldkFycm93LnJlbW92ZUNsYXNzKFwic2xpY2stZGlzYWJsZWRcIikuYXR0cihcImFyaWEtZGlzYWJsZWRcIixcImZhbHNlXCIpLGEuJG5leHRBcnJvdy5yZW1vdmVDbGFzcyhcInNsaWNrLWRpc2FibGVkXCIpLmF0dHIoXCJhcmlhLWRpc2FibGVkXCIsXCJmYWxzZVwiKSwwPT09YS5jdXJyZW50U2xpZGU/KGEuJHByZXZBcnJvdy5hZGRDbGFzcyhcInNsaWNrLWRpc2FibGVkXCIpLmF0dHIoXCJhcmlhLWRpc2FibGVkXCIsXCJ0cnVlXCIpLGEuJG5leHRBcnJvdy5yZW1vdmVDbGFzcyhcInNsaWNrLWRpc2FibGVkXCIpLmF0dHIoXCJhcmlhLWRpc2FibGVkXCIsXCJmYWxzZVwiKSk6YS5jdXJyZW50U2xpZGU+PWEuc2xpZGVDb3VudC1hLm9wdGlvbnMuc2xpZGVzVG9TaG93JiZhLm9wdGlvbnMuY2VudGVyTW9kZT09PSExPyhhLiRuZXh0QXJyb3cuYWRkQ2xhc3MoXCJzbGljay1kaXNhYmxlZFwiKS5hdHRyKFwiYXJpYS1kaXNhYmxlZFwiLFwidHJ1ZVwiKSxhLiRwcmV2QXJyb3cucmVtb3ZlQ2xhc3MoXCJzbGljay1kaXNhYmxlZFwiKS5hdHRyKFwiYXJpYS1kaXNhYmxlZFwiLFwiZmFsc2VcIikpOmEuY3VycmVudFNsaWRlPj1hLnNsaWRlQ291bnQtMSYmYS5vcHRpb25zLmNlbnRlck1vZGU9PT0hMCYmKGEuJG5leHRBcnJvdy5hZGRDbGFzcyhcInNsaWNrLWRpc2FibGVkXCIpLmF0dHIoXCJhcmlhLWRpc2FibGVkXCIsXCJ0cnVlXCIpLGEuJHByZXZBcnJvdy5yZW1vdmVDbGFzcyhcInNsaWNrLWRpc2FibGVkXCIpLmF0dHIoXCJhcmlhLWRpc2FibGVkXCIsXCJmYWxzZVwiKSkpfSxiLnByb3RvdHlwZS51cGRhdGVEb3RzPWZ1bmN0aW9uKCl7dmFyIGE9dGhpcztudWxsIT09YS4kZG90cyYmKGEuJGRvdHMuZmluZChcImxpXCIpLnJlbW92ZUNsYXNzKFwic2xpY2stYWN0aXZlXCIpLmF0dHIoXCJhcmlhLWhpZGRlblwiLFwidHJ1ZVwiKSxhLiRkb3RzLmZpbmQoXCJsaVwiKS5lcShNYXRoLmZsb29yKGEuY3VycmVudFNsaWRlL2Eub3B0aW9ucy5zbGlkZXNUb1Njcm9sbCkpLmFkZENsYXNzKFwic2xpY2stYWN0aXZlXCIpLmF0dHIoXCJhcmlhLWhpZGRlblwiLFwiZmFsc2VcIikpfSxiLnByb3RvdHlwZS52aXNpYmlsaXR5PWZ1bmN0aW9uKCl7dmFyIGE9dGhpczthLm9wdGlvbnMuYXV0b3BsYXkmJihkb2N1bWVudFthLmhpZGRlbl0/YS5pbnRlcnJ1cHRlZD0hMDphLmludGVycnVwdGVkPSExKX0sYS5mbi5zbGljaz1mdW5jdGlvbigpe3ZhciBmLGcsYT10aGlzLGM9YXJndW1lbnRzWzBdLGQ9QXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLDEpLGU9YS5sZW5ndGg7Zm9yKGY9MDtlPmY7ZisrKWlmKFwib2JqZWN0XCI9PXR5cGVvZiBjfHxcInVuZGVmaW5lZFwiPT10eXBlb2YgYz9hW2ZdLnNsaWNrPW5ldyBiKGFbZl0sYyk6Zz1hW2ZdLnNsaWNrW2NdLmFwcGx5KGFbZl0uc2xpY2ssZCksXCJ1bmRlZmluZWRcIiE9dHlwZW9mIGcpcmV0dXJuIGc7cmV0dXJuIGF9fSk7IiwiLypcbiAqIFN3aXBlIDIuMFxuICpcbiAqIEJyYWQgQmlyZHNhbGxcbiAqIENvcHlyaWdodCAyMDEzLCBNSVQgTGljZW5zZVxuICpcbiovXG5cbmZ1bmN0aW9uIFN3aXBlKGNvbnRhaW5lciwgb3B0aW9ucykge1xuXG4gIFwidXNlIHN0cmljdFwiO1xuXG4gIC8vIHV0aWxpdGllc1xuICB2YXIgbm9vcCA9IGZ1bmN0aW9uKCkge307IC8vIHNpbXBsZSBubyBvcGVyYXRpb24gZnVuY3Rpb25cbiAgdmFyIG9mZmxvYWRGbiA9IGZ1bmN0aW9uKGZuKSB7IHNldFRpbWVvdXQoZm4gfHwgbm9vcCwgMCkgfTsgLy8gb2ZmbG9hZCBhIGZ1bmN0aW9ucyBleGVjdXRpb25cblxuICB2YXIgdG91Y2ggPSAoJ29udG91Y2hzdGFydCcgaW4gd2luZG93KSB8fCB3aW5kb3cuRG9jdW1lbnRUb3VjaCAmJiBkb2N1bWVudCBpbnN0YW5jZW9mIERvY3VtZW50VG91Y2g7XG4gIC8vIGNoZWNrIGJyb3dzZXIgY2FwYWJpbGl0aWVzXG4gIHZhciBicm93c2VyID0ge1xuICAgIGFkZEV2ZW50TGlzdGVuZXI6ICEhd2luZG93LmFkZEV2ZW50TGlzdGVuZXIsXG4gICAgdG91Y2g6IHRvdWNoLFxuICAgIHRvdWNoc3RhcnQgOiB0b3VjaCA/ICd0b3VjaHN0YXJ0JyA6ICdtb3VzZWRvd24nLFxuICAgIHRvdWNobW92ZSA6IHRvdWNoID8gJ3RvdWNobW92ZScgOiAnbW91c2Vtb3ZlJyxcbiAgICB0b3VjaGVuZCA6IHRvdWNoID8gJ3RvdWNoZW5kJyA6ICdtb3VzZXVwJyxcbiAgICB0cmFuc2l0aW9uczogKGZ1bmN0aW9uKHRlbXApIHtcbiAgICAgIHZhciBwcm9wcyA9IFsndHJhbnNpdGlvblByb3BlcnR5JywgJ1dlYmtpdFRyYW5zaXRpb24nLCAnTW96VHJhbnNpdGlvbicsICdPVHJhbnNpdGlvbicsICdtc1RyYW5zaXRpb24nXTtcbiAgICAgIGZvciAoIHZhciBpIGluIHByb3BzICkgaWYgKHRlbXAuc3R5bGVbIHByb3BzW2ldIF0gIT09IHVuZGVmaW5lZCkgcmV0dXJuIHRydWU7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSkoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3dpcGUnKSlcbiAgfTtcblxuICAvLyBxdWl0IGlmIG5vIHJvb3QgZWxlbWVudFxuICBpZiAoIWNvbnRhaW5lcikgcmV0dXJuO1xuICB2YXIgZWxlbWVudCA9IGNvbnRhaW5lci5jaGlsZHJlblswXTtcbiAgdmFyIHNsaWRlcywgc2xpZGVQb3MsIHdpZHRoLCBsZW5ndGg7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICB2YXIgaW5kZXggPSBwYXJzZUludChvcHRpb25zLnN0YXJ0U2xpZGUsIDEwKSB8fCAwO1xuICB2YXIgc3BlZWQgPSBvcHRpb25zLnNwZWVkIHx8IDUwMDtcbiAgb3B0aW9ucy5jb250aW51b3VzID0gb3B0aW9ucy5jb250aW51b3VzICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLmNvbnRpbnVvdXMgOiB0cnVlO1xuXG4gIGZ1bmN0aW9uIHNldHVwKCkge1xuXG4gICAgLy8gY2FjaGUgc2xpZGVzXG4gICAgc2xpZGVzID0gZWxlbWVudC5jaGlsZHJlbjtcbiAgICBsZW5ndGggPSBzbGlkZXMubGVuZ3RoO1xuXG4gICAgLy8gc2V0IGNvbnRpbnVvdXMgdG8gZmFsc2UgaWYgb25seSBvbmUgc2xpZGVcbiAgICBpZiAoc2xpZGVzLmxlbmd0aCA8IDIpIG9wdGlvbnMuY29udGludW91cyA9IGZhbHNlO1xuXG4gICAgLy9zcGVjaWFsIGNhc2UgaWYgdHdvIHNsaWRlc1xuICAgIGlmIChicm93c2VyLnRyYW5zaXRpb25zICYmIG9wdGlvbnMuY29udGludW91cyAmJiBzbGlkZXMubGVuZ3RoIDwgMykge1xuICAgICAgZWxlbWVudC5hcHBlbmRDaGlsZChzbGlkZXNbMF0uY2xvbmVOb2RlKHRydWUpKTtcbiAgICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQoZWxlbWVudC5jaGlsZHJlblsxXS5jbG9uZU5vZGUodHJ1ZSkpO1xuICAgICAgc2xpZGVzID0gZWxlbWVudC5jaGlsZHJlbjtcbiAgICB9XG5cbiAgICAvLyBjcmVhdGUgYW4gYXJyYXkgdG8gc3RvcmUgY3VycmVudCBwb3NpdGlvbnMgb2YgZWFjaCBzbGlkZVxuICAgIHNsaWRlUG9zID0gbmV3IEFycmF5KHNsaWRlcy5sZW5ndGgpO1xuXG4gICAgLy8gZGV0ZXJtaW5lIHdpZHRoIG9mIGVhY2ggc2xpZGVcbiAgICB3aWR0aCA9IGNvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aCB8fCBjb250YWluZXIub2Zmc2V0V2lkdGg7XG5cbiAgICBlbGVtZW50LnN0eWxlLndpZHRoID0gKHNsaWRlcy5sZW5ndGggKiB3aWR0aCkgKyAncHgnO1xuXG4gICAgLy8gc3RhY2sgZWxlbWVudHNcbiAgICB2YXIgcG9zID0gc2xpZGVzLmxlbmd0aDtcbiAgICB3aGlsZShwb3MtLSkge1xuXG4gICAgICB2YXIgc2xpZGUgPSBzbGlkZXNbcG9zXTtcblxuICAgICAgc2xpZGUuc3R5bGUud2lkdGggPSB3aWR0aCArICdweCc7XG4gICAgICBzbGlkZS5zZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnLCBwb3MpO1xuXG4gICAgICBpZiAoYnJvd3Nlci50cmFuc2l0aW9ucykge1xuICAgICAgICBzbGlkZS5zdHlsZS5sZWZ0ID0gKHBvcyAqIC13aWR0aCkgKyAncHgnO1xuICAgICAgICBtb3ZlKHBvcywgaW5kZXggPiBwb3MgPyAtd2lkdGggOiAoaW5kZXggPCBwb3MgPyB3aWR0aCA6IDApLCAwKTtcbiAgICAgIH1cblxuICAgIH1cblxuICAgIC8vIHJlcG9zaXRpb24gZWxlbWVudHMgYmVmb3JlIGFuZCBhZnRlciBpbmRleFxuICAgIGlmIChvcHRpb25zLmNvbnRpbnVvdXMgJiYgYnJvd3Nlci50cmFuc2l0aW9ucykge1xuICAgICAgbW92ZShjaXJjbGUoaW5kZXgtMSksIC13aWR0aCwgMCk7XG4gICAgICBtb3ZlKGNpcmNsZShpbmRleCsxKSwgd2lkdGgsIDApO1xuICAgIH1cblxuICAgIGlmICghYnJvd3Nlci50cmFuc2l0aW9ucykgZWxlbWVudC5zdHlsZS5sZWZ0ID0gKGluZGV4ICogLXdpZHRoKSArICdweCc7XG5cbiAgICBjb250YWluZXIuc3R5bGUudmlzaWJpbGl0eSA9ICd2aXNpYmxlJztcblxuICB9XG5cbiAgZnVuY3Rpb24gcHJldigpIHtcblxuICAgIGlmIChvcHRpb25zLmNvbnRpbnVvdXMpIHNsaWRlKGluZGV4LTEpO1xuICAgIGVsc2UgaWYgKGluZGV4KSBzbGlkZShpbmRleC0xKTtcblxuICB9XG5cbiAgZnVuY3Rpb24gbmV4dCgpIHtcblxuICAgIGlmIChvcHRpb25zLmNvbnRpbnVvdXMpIHNsaWRlKGluZGV4KzEpO1xuICAgIGVsc2UgaWYgKGluZGV4IDwgc2xpZGVzLmxlbmd0aCAtIDEpIHNsaWRlKGluZGV4KzEpO1xuXG4gIH1cblxuICBmdW5jdGlvbiBjaXJjbGUoaW5kZXgpIHtcblxuICAgIC8vIGEgc2ltcGxlIHBvc2l0aXZlIG1vZHVsbyB1c2luZyBzbGlkZXMubGVuZ3RoXG4gICAgcmV0dXJuIChzbGlkZXMubGVuZ3RoICsgKGluZGV4ICUgc2xpZGVzLmxlbmd0aCkpICUgc2xpZGVzLmxlbmd0aDtcblxuICB9XG5cbiAgZnVuY3Rpb24gc2xpZGUodG8sIHNsaWRlU3BlZWQpIHtcblxuICAgIC8vIGRvIG5vdGhpbmcgaWYgYWxyZWFkeSBvbiByZXF1ZXN0ZWQgc2xpZGVcbiAgICBpZiAoaW5kZXggPT0gdG8pIHJldHVybjtcblxuICAgIGlmIChicm93c2VyLnRyYW5zaXRpb25zKSB7XG5cbiAgICAgIHZhciBkaXJlY3Rpb24gPSBNYXRoLmFicyhpbmRleC10bykgLyAoaW5kZXgtdG8pOyAvLyAxOiBiYWNrd2FyZCwgLTE6IGZvcndhcmRcblxuICAgICAgLy8gZ2V0IHRoZSBhY3R1YWwgcG9zaXRpb24gb2YgdGhlIHNsaWRlXG4gICAgICBpZiAob3B0aW9ucy5jb250aW51b3VzKSB7XG4gICAgICAgIHZhciBuYXR1cmFsX2RpcmVjdGlvbiA9IGRpcmVjdGlvbjtcbiAgICAgICAgZGlyZWN0aW9uID0gLXNsaWRlUG9zW2NpcmNsZSh0byldIC8gd2lkdGg7XG5cbiAgICAgICAgLy8gaWYgZ29pbmcgZm9yd2FyZCBidXQgdG8gPCBpbmRleCwgdXNlIHRvID0gc2xpZGVzLmxlbmd0aCArIHRvXG4gICAgICAgIC8vIGlmIGdvaW5nIGJhY2t3YXJkIGJ1dCB0byA+IGluZGV4LCB1c2UgdG8gPSAtc2xpZGVzLmxlbmd0aCArIHRvXG4gICAgICAgIGlmIChkaXJlY3Rpb24gIT09IG5hdHVyYWxfZGlyZWN0aW9uKSB0byA9ICAtZGlyZWN0aW9uICogc2xpZGVzLmxlbmd0aCArIHRvO1xuXG4gICAgICB9XG5cbiAgICAgIHZhciBkaWZmID0gTWF0aC5hYnMoaW5kZXgtdG8pIC0gMTtcblxuICAgICAgLy8gbW92ZSBhbGwgdGhlIHNsaWRlcyBiZXR3ZWVuIGluZGV4IGFuZCB0byBpbiB0aGUgcmlnaHQgZGlyZWN0aW9uXG4gICAgICB3aGlsZSAoZGlmZi0tKSBtb3ZlKCBjaXJjbGUoKHRvID4gaW5kZXggPyB0byA6IGluZGV4KSAtIGRpZmYgLSAxKSwgd2lkdGggKiBkaXJlY3Rpb24sIDApO1xuXG4gICAgICB0byA9IGNpcmNsZSh0byk7XG5cbiAgICAgIG1vdmUoaW5kZXgsIHdpZHRoICogZGlyZWN0aW9uLCBzbGlkZVNwZWVkIHx8IHNwZWVkKTtcbiAgICAgIG1vdmUodG8sIDAsIHNsaWRlU3BlZWQgfHwgc3BlZWQpO1xuXG4gICAgICBpZiAob3B0aW9ucy5jb250aW51b3VzKSBtb3ZlKGNpcmNsZSh0byAtIGRpcmVjdGlvbiksIC0od2lkdGggKiBkaXJlY3Rpb24pLCAwKTsgLy8gd2UgbmVlZCB0byBnZXQgdGhlIG5leHQgaW4gcGxhY2VcblxuICAgIH0gZWxzZSB7XG5cbiAgICAgIHRvID0gY2lyY2xlKHRvKTtcbiAgICAgIGFuaW1hdGUoaW5kZXggKiAtd2lkdGgsIHRvICogLXdpZHRoLCBzbGlkZVNwZWVkIHx8IHNwZWVkKTtcbiAgICAgIC8vbm8gZmFsbGJhY2sgZm9yIGEgY2lyY3VsYXIgY29udGludW91cyBpZiB0aGUgYnJvd3NlciBkb2VzIG5vdCBhY2NlcHQgdHJhbnNpdGlvbnNcbiAgICB9XG5cbiAgICBpbmRleCA9IHRvO1xuICAgIG9mZmxvYWRGbihvcHRpb25zLmNhbGxiYWNrICYmIG9wdGlvbnMuY2FsbGJhY2soaW5kZXgsIHNsaWRlc1tpbmRleF0pKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG1vdmUoaW5kZXgsIGRpc3QsIHNwZWVkKSB7XG5cbiAgICB0cmFuc2xhdGUoaW5kZXgsIGRpc3QsIHNwZWVkKTtcbiAgICBzbGlkZVBvc1tpbmRleF0gPSBkaXN0O1xuXG4gIH1cblxuICBmdW5jdGlvbiB0cmFuc2xhdGUoaW5kZXgsIGRpc3QsIHNwZWVkKSB7XG5cbiAgICB2YXIgc2xpZGUgPSBzbGlkZXNbaW5kZXhdO1xuICAgIHZhciBzdHlsZSA9IHNsaWRlICYmIHNsaWRlLnN0eWxlO1xuXG4gICAgaWYgKCFzdHlsZSkgcmV0dXJuO1xuXG4gICAgc3R5bGUud2Via2l0VHJhbnNpdGlvbkR1cmF0aW9uID1cbiAgICBzdHlsZS5Nb3pUcmFuc2l0aW9uRHVyYXRpb24gPVxuICAgIHN0eWxlLm1zVHJhbnNpdGlvbkR1cmF0aW9uID1cbiAgICBzdHlsZS5PVHJhbnNpdGlvbkR1cmF0aW9uID1cbiAgICBzdHlsZS50cmFuc2l0aW9uRHVyYXRpb24gPSBzcGVlZCArICdtcyc7XG5cbiAgICBzdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSAndHJhbnNsYXRlKCcgKyBkaXN0ICsgJ3B4LDApJyArICd0cmFuc2xhdGVaKDApJztcbiAgICBzdHlsZS5tc1RyYW5zZm9ybSA9XG4gICAgc3R5bGUuTW96VHJhbnNmb3JtID1cbiAgICBzdHlsZS5PVHJhbnNmb3JtID0gJ3RyYW5zbGF0ZVgoJyArIGRpc3QgKyAncHgpJztcblxuICB9XG5cbiAgZnVuY3Rpb24gYW5pbWF0ZShmcm9tLCB0bywgc3BlZWQpIHtcblxuICAgIC8vIGlmIG5vdCBhbiBhbmltYXRpb24sIGp1c3QgcmVwb3NpdGlvblxuICAgIGlmICghc3BlZWQpIHtcblxuICAgICAgZWxlbWVudC5zdHlsZS5sZWZ0ID0gdG8gKyAncHgnO1xuICAgICAgcmV0dXJuO1xuXG4gICAgfVxuXG4gICAgdmFyIHN0YXJ0ID0gK25ldyBEYXRlO1xuXG4gICAgdmFyIHRpbWVyID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG5cbiAgICAgIHZhciB0aW1lRWxhcCA9ICtuZXcgRGF0ZSAtIHN0YXJ0O1xuXG4gICAgICBpZiAodGltZUVsYXAgPiBzcGVlZCkge1xuXG4gICAgICAgIGVsZW1lbnQuc3R5bGUubGVmdCA9IHRvICsgJ3B4JztcblxuICAgICAgICBpZiAoZGVsYXkpIGJlZ2luKCk7XG5cbiAgICAgICAgb3B0aW9ucy50cmFuc2l0aW9uRW5kICYmIG9wdGlvbnMudHJhbnNpdGlvbkVuZC5jYWxsKGV2ZW50LCBpbmRleCwgc2xpZGVzW2luZGV4XSk7XG5cbiAgICAgICAgY2xlYXJJbnRlcnZhbCh0aW1lcik7XG4gICAgICAgIHJldHVybjtcblxuICAgICAgfVxuXG4gICAgICBlbGVtZW50LnN0eWxlLmxlZnQgPSAoKCAodG8gLSBmcm9tKSAqIChNYXRoLmZsb29yKCh0aW1lRWxhcCAvIHNwZWVkKSAqIDEwMCkgLyAxMDApICkgKyBmcm9tKSArICdweCc7XG5cbiAgICB9LCA0KTtcblxuICB9XG5cbiAgLy8gc2V0dXAgYXV0byBzbGlkZXNob3dcbiAgdmFyIGRlbGF5ID0gb3B0aW9ucy5hdXRvIHx8IDA7XG4gIHZhciBpbnRlcnZhbDtcblxuICBmdW5jdGlvbiBiZWdpbigpIHtcblxuICAgIGludGVydmFsID0gc2V0VGltZW91dChuZXh0LCBkZWxheSk7XG5cbiAgfVxuXG4gIGZ1bmN0aW9uIHN0b3AoKSB7XG5cbiAgICBkZWxheSA9IDA7XG4gICAgY2xlYXJUaW1lb3V0KGludGVydmFsKTtcblxuICB9XG5cblxuICAvLyBzZXR1cCBpbml0aWFsIHZhcnNcbiAgdmFyIHN0YXJ0ID0ge307XG4gIHZhciBkZWx0YSA9IHt9O1xuICB2YXIgaXNTY3JvbGxpbmc7XG5cbiAgLy8gc2V0dXAgZXZlbnQgY2FwdHVyaW5nXG4gIHZhciBldmVudHMgPSB7XG5cbiAgICBoYW5kbGVFdmVudDogZnVuY3Rpb24oZXZlbnQpIHtcblxuICAgICAgc3dpdGNoIChldmVudC50eXBlKSB7XG4gICAgICAgIGNhc2UgYnJvd3Nlci50b3VjaHN0YXJ0OiB0aGlzLnN0YXJ0KGV2ZW50KTsgYnJlYWs7XG4gICAgICAgIGNhc2UgYnJvd3Nlci50b3VjaG1vdmU6IHRoaXMubW92ZShldmVudCk7IGJyZWFrO1xuICAgICAgICBjYXNlIGJyb3dzZXIudG91Y2hlbmQ6IG9mZmxvYWRGbih0aGlzLmVuZChldmVudCkpOyBicmVhaztcbiAgICAgICAgY2FzZSAnd2Via2l0VHJhbnNpdGlvbkVuZCc6XG4gICAgICAgIGNhc2UgJ21zVHJhbnNpdGlvbkVuZCc6XG4gICAgICAgIGNhc2UgJ29UcmFuc2l0aW9uRW5kJzpcbiAgICAgICAgY2FzZSAnb3RyYW5zaXRpb25lbmQnOlxuICAgICAgICBjYXNlICd0cmFuc2l0aW9uZW5kJzogb2ZmbG9hZEZuKHRoaXMudHJhbnNpdGlvbkVuZChldmVudCkpOyBicmVhaztcbiAgICAgICAgY2FzZSAncmVzaXplJzogb2ZmbG9hZEZuKHNldHVwKTsgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIGlmIChvcHRpb25zLnN0b3BQcm9wYWdhdGlvbikgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICB9LFxuICAgIHN0YXJ0OiBmdW5jdGlvbihldmVudCkge1xuXG4gICAgICB2YXIgdG91Y2hlcztcbiAgICAgIGlmIChicm93c2VyLnRvdWNoKSB7XG4gICAgICAgIHRvdWNoZXMgPSBldmVudC50b3VjaGVzWzBdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdG91Y2hlcyA9IHtcbiAgICAgICAgICBwYWdlWCA6IGV2ZW50LnBhZ2VYID8gZXZlbnQucGFnZVggOiBldmVudC5jbGllbnRYLFxuICAgICAgICAgIHBhZ2VZIDogZXZlbnQucGFnZVkgPyBldmVudC5wYWdlWSA6IGV2ZW50LmNsaWVudFlcbiAgICAgICAgfTtcbiAgICAgIH1cblxuICAgICAgLy8gbWVhc3VyZSBzdGFydCB2YWx1ZXNcbiAgICAgIHN0YXJ0ID0ge1xuXG4gICAgICAgIC8vIGdldCBpbml0aWFsIHRvdWNoIGNvb3Jkc1xuICAgICAgICB4OiB0b3VjaGVzLnBhZ2VYLFxuICAgICAgICB5OiB0b3VjaGVzLnBhZ2VZLFxuXG4gICAgICAgIC8vIHN0b3JlIHRpbWUgdG8gZGV0ZXJtaW5lIHRvdWNoIGR1cmF0aW9uXG4gICAgICAgIHRpbWU6ICtuZXcgRGF0ZVxuXG4gICAgICB9O1xuXG4gICAgICAvLyB1c2VkIGZvciB0ZXN0aW5nIGZpcnN0IG1vdmUgZXZlbnRcbiAgICAgIGlzU2Nyb2xsaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgICAvLyByZXNldCBkZWx0YSBhbmQgZW5kIG1lYXN1cmVtZW50c1xuICAgICAgZGVsdGEgPSB7fTtcblxuICAgICAgLy8gYXR0YWNoIHRvdWNobW92ZSBhbmQgdG91Y2hlbmQgbGlzdGVuZXJzXG4gICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoYnJvd3Nlci50b3VjaG1vdmUsIHRoaXMsIGZhbHNlKTtcbiAgICAgIGlmIChicm93c2VyLnRvdWNoKSB7XG4gICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihicm93c2VyLnRvdWNoZW5kLCB0aGlzLCBmYWxzZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihicm93c2VyLnRvdWNoZW5kLCB0aGlzLCBmYWxzZSk7XG4gICAgICB9XG4gICAgfSxcbiAgICBtb3ZlOiBmdW5jdGlvbihldmVudCkge1xuXG4gICAgICB2YXIgdG91Y2hlcztcbiAgICAgIGlmICAoYnJvd3Nlci50b3VjaCkge1xuICAgICAgICAvLyBlbnN1cmUgc3dpcGluZyB3aXRoIG9uZSB0b3VjaCBhbmQgbm90IHBpbmNoaW5nXG4gICAgICAgIGlmICggZXZlbnQudG91Y2hlcy5sZW5ndGggPiAxIHx8IGV2ZW50LnNjYWxlICYmIGV2ZW50LnNjYWxlICE9PSAxKSByZXR1cm5cblxuICAgICAgICB0b3VjaGVzID0gZXZlbnQudG91Y2hlc1swXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRvdWNoZXMgPSB7XG4gICAgICAgICAgcGFnZVggOiBldmVudC5wYWdlWCA/IGV2ZW50LnBhZ2VYIDogZXZlbnQuY2xpZW50WCxcbiAgICAgICAgICBwYWdlWSA6IGV2ZW50LnBhZ2VZID8gZXZlbnQucGFnZVkgOiBldmVudC5jbGllbnRZXG4gICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIGlmIChvcHRpb25zLmRpc2FibGVTY3JvbGwpIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cblxuXG4gICAgICAvLyBtZWFzdXJlIGNoYW5nZSBpbiB4IGFuZCB5XG4gICAgICBkZWx0YSA9IHtcbiAgICAgICAgeDogdG91Y2hlcy5wYWdlWCAtIHN0YXJ0LngsXG4gICAgICAgIHk6IHRvdWNoZXMucGFnZVkgLSBzdGFydC55XG4gICAgICB9XG5cbiAgICAgIC8vIGRldGVybWluZSBpZiBzY3JvbGxpbmcgdGVzdCBoYXMgcnVuIC0gb25lIHRpbWUgdGVzdFxuICAgICAgaWYgKCB0eXBlb2YgaXNTY3JvbGxpbmcgPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgaXNTY3JvbGxpbmcgPSAhISggaXNTY3JvbGxpbmcgfHwgTWF0aC5hYnMoZGVsdGEueCkgPCBNYXRoLmFicyhkZWx0YS55KSApO1xuICAgICAgfVxuXG4gICAgICAvLyBpZiB1c2VyIGlzIG5vdCB0cnlpbmcgdG8gc2Nyb2xsIHZlcnRpY2FsbHlcbiAgICAgIGlmICghaXNTY3JvbGxpbmcpIHtcblxuICAgICAgICAvLyBwcmV2ZW50IG5hdGl2ZSBzY3JvbGxpbmdcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAvLyBzdG9wIHNsaWRlc2hvd1xuICAgICAgICBzdG9wKCk7XG5cbiAgICAgICAgLy8gaW5jcmVhc2UgcmVzaXN0YW5jZSBpZiBmaXJzdCBvciBsYXN0IHNsaWRlXG4gICAgICAgIGlmIChvcHRpb25zLmNvbnRpbnVvdXMpIHsgLy8gd2UgZG9uJ3QgYWRkIHJlc2lzdGFuY2UgYXQgdGhlIGVuZFxuXG4gICAgICAgICAgdHJhbnNsYXRlKGNpcmNsZShpbmRleC0xKSwgZGVsdGEueCArIHNsaWRlUG9zW2NpcmNsZShpbmRleC0xKV0sIDApO1xuICAgICAgICAgIHRyYW5zbGF0ZShpbmRleCwgZGVsdGEueCArIHNsaWRlUG9zW2luZGV4XSwgMCk7XG4gICAgICAgICAgdHJhbnNsYXRlKGNpcmNsZShpbmRleCsxKSwgZGVsdGEueCArIHNsaWRlUG9zW2NpcmNsZShpbmRleCsxKV0sIDApO1xuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICBkZWx0YS54ID1cbiAgICAgICAgICAgIGRlbHRhLnggL1xuICAgICAgICAgICAgICAoICghaW5kZXggJiYgZGVsdGEueCA+IDAgICAgICAgICAgICAgICAvLyBpZiBmaXJzdCBzbGlkZSBhbmQgc2xpZGluZyBsZWZ0XG4gICAgICAgICAgICAgICAgfHwgaW5kZXggPT0gc2xpZGVzLmxlbmd0aCAtIDEgICAgICAgIC8vIG9yIGlmIGxhc3Qgc2xpZGUgYW5kIHNsaWRpbmcgcmlnaHRcbiAgICAgICAgICAgICAgICAmJiBkZWx0YS54IDwgMCAgICAgICAgICAgICAgICAgICAgICAgLy8gYW5kIGlmIHNsaWRpbmcgYXQgYWxsXG4gICAgICAgICAgICAgICkgP1xuICAgICAgICAgICAgICAoIE1hdGguYWJzKGRlbHRhLngpIC8gd2lkdGggKyAxICkgICAgICAvLyBkZXRlcm1pbmUgcmVzaXN0YW5jZSBsZXZlbFxuICAgICAgICAgICAgICA6IDEgKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBubyByZXNpc3RhbmNlIGlmIGZhbHNlXG5cbiAgICAgICAgICAvLyB0cmFuc2xhdGUgMToxXG4gICAgICAgICAgdHJhbnNsYXRlKGluZGV4LTEsIGRlbHRhLnggKyBzbGlkZVBvc1tpbmRleC0xXSwgMCk7XG4gICAgICAgICAgdHJhbnNsYXRlKGluZGV4LCBkZWx0YS54ICsgc2xpZGVQb3NbaW5kZXhdLCAwKTtcbiAgICAgICAgICB0cmFuc2xhdGUoaW5kZXgrMSwgZGVsdGEueCArIHNsaWRlUG9zW2luZGV4KzFdLCAwKTtcbiAgICAgICAgfVxuXG4gICAgICB9XG5cbiAgICB9LFxuICAgIGVuZDogZnVuY3Rpb24oZXZlbnQpIHtcblxuICAgICAgLy8gbWVhc3VyZSBkdXJhdGlvblxuICAgICAgdmFyIGR1cmF0aW9uID0gK25ldyBEYXRlIC0gc3RhcnQudGltZTtcblxuICAgICAgLy8gZGV0ZXJtaW5lIGlmIHNsaWRlIGF0dGVtcHQgdHJpZ2dlcnMgbmV4dC9wcmV2IHNsaWRlXG4gICAgICB2YXIgaXNWYWxpZFNsaWRlID1cbiAgICAgICAgICAgIE51bWJlcihkdXJhdGlvbikgPCAyNTAgICAgICAgICAgICAgICAvLyBpZiBzbGlkZSBkdXJhdGlvbiBpcyBsZXNzIHRoYW4gMjUwbXNcbiAgICAgICAgICAgICYmIE1hdGguYWJzKGRlbHRhLngpID4gMjAgICAgICAgICAgICAvLyBhbmQgaWYgc2xpZGUgYW10IGlzIGdyZWF0ZXIgdGhhbiAyMHB4XG4gICAgICAgICAgICB8fCBNYXRoLmFicyhkZWx0YS54KSA+IHdpZHRoLzI7ICAgICAgLy8gb3IgaWYgc2xpZGUgYW10IGlzIGdyZWF0ZXIgdGhhbiBoYWxmIHRoZSB3aWR0aFxuXG4gICAgICAvLyBkZXRlcm1pbmUgaWYgc2xpZGUgYXR0ZW1wdCBpcyBwYXN0IHN0YXJ0IGFuZCBlbmRcbiAgICAgIHZhciBpc1Bhc3RCb3VuZHMgPVxuICAgICAgICAgICAgIWluZGV4ICYmIGRlbHRhLnggPiAwICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmIGZpcnN0IHNsaWRlIGFuZCBzbGlkZSBhbXQgaXMgZ3JlYXRlciB0aGFuIDBcbiAgICAgICAgICAgIHx8IGluZGV4ID09IHNsaWRlcy5sZW5ndGggLSAxICYmIGRlbHRhLnggPCAwOyAgICAvLyBvciBpZiBsYXN0IHNsaWRlIGFuZCBzbGlkZSBhbXQgaXMgbGVzcyB0aGFuIDBcblxuICAgICAgaWYgKG9wdGlvbnMuY29udGludW91cykgaXNQYXN0Qm91bmRzID0gZmFsc2U7XG5cbiAgICAgIC8vIGRldGVybWluZSBkaXJlY3Rpb24gb2Ygc3dpcGUgKHRydWU6cmlnaHQsIGZhbHNlOmxlZnQpXG4gICAgICB2YXIgZGlyZWN0aW9uID0gZGVsdGEueCA8IDA7XG5cbiAgICAgIC8vIGlmIG5vdCBzY3JvbGxpbmcgdmVydGljYWxseVxuICAgICAgaWYgKCFpc1Njcm9sbGluZykge1xuXG4gICAgICAgIGlmIChpc1ZhbGlkU2xpZGUgJiYgIWlzUGFzdEJvdW5kcykge1xuXG4gICAgICAgICAgaWYgKGRpcmVjdGlvbikge1xuXG4gICAgICAgICAgICBpZiAob3B0aW9ucy5jb250aW51b3VzKSB7IC8vIHdlIG5lZWQgdG8gZ2V0IHRoZSBuZXh0IGluIHRoaXMgZGlyZWN0aW9uIGluIHBsYWNlXG5cbiAgICAgICAgICAgICAgbW92ZShjaXJjbGUoaW5kZXgtMSksIC13aWR0aCwgMCk7XG4gICAgICAgICAgICAgIG1vdmUoY2lyY2xlKGluZGV4KzIpLCB3aWR0aCwgMCk7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIG1vdmUoaW5kZXgtMSwgLXdpZHRoLCAwKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbW92ZShpbmRleCwgc2xpZGVQb3NbaW5kZXhdLXdpZHRoLCBzcGVlZCk7XG4gICAgICAgICAgICBtb3ZlKGNpcmNsZShpbmRleCsxKSwgc2xpZGVQb3NbY2lyY2xlKGluZGV4KzEpXS13aWR0aCwgc3BlZWQpO1xuICAgICAgICAgICAgaW5kZXggPSBjaXJjbGUoaW5kZXgrMSk7XG5cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKG9wdGlvbnMuY29udGludW91cykgeyAvLyB3ZSBuZWVkIHRvIGdldCB0aGUgbmV4dCBpbiB0aGlzIGRpcmVjdGlvbiBpbiBwbGFjZVxuXG4gICAgICAgICAgICAgIG1vdmUoY2lyY2xlKGluZGV4KzEpLCB3aWR0aCwgMCk7XG4gICAgICAgICAgICAgIG1vdmUoY2lyY2xlKGluZGV4LTIpLCAtd2lkdGgsIDApO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBtb3ZlKGluZGV4KzEsIHdpZHRoLCAwKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbW92ZShpbmRleCwgc2xpZGVQb3NbaW5kZXhdK3dpZHRoLCBzcGVlZCk7XG4gICAgICAgICAgICBtb3ZlKGNpcmNsZShpbmRleC0xKSwgc2xpZGVQb3NbY2lyY2xlKGluZGV4LTEpXSt3aWR0aCwgc3BlZWQpO1xuICAgICAgICAgICAgaW5kZXggPSBjaXJjbGUoaW5kZXgtMSk7XG5cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBvcHRpb25zLmNhbGxiYWNrICYmIG9wdGlvbnMuY2FsbGJhY2soaW5kZXgsIHNsaWRlc1tpbmRleF0pO1xuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICBpZiAob3B0aW9ucy5jb250aW51b3VzKSB7XG5cbiAgICAgICAgICAgIG1vdmUoY2lyY2xlKGluZGV4LTEpLCAtd2lkdGgsIHNwZWVkKTtcbiAgICAgICAgICAgIG1vdmUoaW5kZXgsIDAsIHNwZWVkKTtcbiAgICAgICAgICAgIG1vdmUoY2lyY2xlKGluZGV4KzEpLCB3aWR0aCwgc3BlZWQpO1xuXG4gICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgbW92ZShpbmRleC0xLCAtd2lkdGgsIHNwZWVkKTtcbiAgICAgICAgICAgIG1vdmUoaW5kZXgsIDAsIHNwZWVkKTtcbiAgICAgICAgICAgIG1vdmUoaW5kZXgrMSwgd2lkdGgsIHNwZWVkKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICB9XG5cbiAgICAgIC8vIGtpbGwgdG91Y2htb3ZlIGFuZCB0b3VjaGVuZCBldmVudCBsaXN0ZW5lcnMgdW50aWwgdG91Y2hzdGFydCBjYWxsZWQgYWdhaW5cbiAgICAgIGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihicm93c2VyLnRvdWNobW92ZSwgZXZlbnRzLCBmYWxzZSlcbiAgICAgIGlmIChicm93c2VyLnRvdWNoKSB7XG4gICAgICAgIGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihicm93c2VyLnRvdWNoZW5kLCB0aGlzLCBmYWxzZSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKGJyb3dzZXIudG91Y2hlbmQsIHRoaXMsIGZhbHNlKVxuICAgICAgfVxuXG4gICAgfSxcbiAgICB0cmFuc2l0aW9uRW5kOiBmdW5jdGlvbihldmVudCkge1xuXG4gICAgICBpZiAocGFyc2VJbnQoZXZlbnQudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcpLCAxMCkgPT0gaW5kZXgpIHtcblxuICAgICAgICBpZiAoZGVsYXkpIGJlZ2luKCk7XG5cbiAgICAgICAgb3B0aW9ucy50cmFuc2l0aW9uRW5kICYmIG9wdGlvbnMudHJhbnNpdGlvbkVuZC5jYWxsKGV2ZW50LCBpbmRleCwgc2xpZGVzW2luZGV4XSk7XG5cbiAgICAgIH1cblxuICAgIH1cblxuICB9XG5cbiAgLy8gdHJpZ2dlciBzZXR1cFxuICBzZXR1cCgpO1xuXG4gIC8vIHN0YXJ0IGF1dG8gc2xpZGVzaG93IGlmIGFwcGxpY2FibGVcbiAgaWYgKGRlbGF5KSBiZWdpbigpO1xuXG5cbiAgLy8gYWRkIGV2ZW50IGxpc3RlbmVyc1xuICBpZiAoYnJvd3Nlci5hZGRFdmVudExpc3RlbmVyKSB7XG5cbiAgICAvLyBzZXQgdG91Y2hzdGFydCBldmVudCBvbiBlbGVtZW50XG4gICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGJyb3dzZXIudG91Y2hzdGFydCwgZXZlbnRzLCBmYWxzZSk7XG5cbiAgICBpZiAoYnJvd3Nlci50cmFuc2l0aW9ucykge1xuICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCd3ZWJraXRUcmFuc2l0aW9uRW5kJywgZXZlbnRzLCBmYWxzZSk7XG4gICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21zVHJhbnNpdGlvbkVuZCcsIGV2ZW50cywgZmFsc2UpO1xuICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdvVHJhbnNpdGlvbkVuZCcsIGV2ZW50cywgZmFsc2UpO1xuICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdvdHJhbnNpdGlvbmVuZCcsIGV2ZW50cywgZmFsc2UpO1xuICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgZXZlbnRzLCBmYWxzZSk7XG4gICAgfVxuXG4gICAgLy8gc2V0IHJlc2l6ZSBldmVudCBvbiB3aW5kb3dcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgZXZlbnRzLCBmYWxzZSk7XG5cbiAgfSBlbHNlIHtcblxuICAgIHdpbmRvdy5vbnJlc2l6ZSA9IGZ1bmN0aW9uICgpIHsgc2V0dXAoKSB9OyAvLyB0byBwbGF5IG5pY2Ugd2l0aCBvbGQgSUVcblxuICB9XG5cbiAgLy8gZXhwb3NlIHRoZSBTd2lwZSBBUElcbiAgcmV0dXJuIHtcbiAgICBzZXR1cDogZnVuY3Rpb24oKSB7XG5cbiAgICAgIHNldHVwKCk7XG5cbiAgICB9LFxuICAgIHNsaWRlOiBmdW5jdGlvbih0bywgc3BlZWQpIHtcblxuICAgICAgLy8gY2FuY2VsIHNsaWRlc2hvd1xuICAgICAgc3RvcCgpO1xuXG4gICAgICBzbGlkZSh0bywgc3BlZWQpO1xuXG4gICAgfSxcbiAgICBwcmV2OiBmdW5jdGlvbigpIHtcblxuICAgICAgLy8gY2FuY2VsIHNsaWRlc2hvd1xuICAgICAgc3RvcCgpO1xuXG4gICAgICBwcmV2KCk7XG5cbiAgICB9LFxuICAgIG5leHQ6IGZ1bmN0aW9uKCkge1xuXG4gICAgICAvLyBjYW5jZWwgc2xpZGVzaG93XG4gICAgICBzdG9wKCk7XG5cbiAgICAgIG5leHQoKTtcblxuICAgIH0sXG4gICAgc3RvcDogZnVuY3Rpb24oKSB7XG5cbiAgICAgIC8vIGNhbmNlbCBzbGlkZXNob3dcbiAgICAgIHN0b3AoKTtcblxuICAgIH0sXG4gICAgZ2V0UG9zOiBmdW5jdGlvbigpIHtcblxuICAgICAgLy8gcmV0dXJuIGN1cnJlbnQgaW5kZXggcG9zaXRpb25cbiAgICAgIHJldHVybiBpbmRleDtcblxuICAgIH0sXG4gICAgZ2V0TnVtU2xpZGVzOiBmdW5jdGlvbigpIHtcblxuICAgICAgLy8gcmV0dXJuIHRvdGFsIG51bWJlciBvZiBzbGlkZXNcbiAgICAgIHJldHVybiBsZW5ndGg7XG4gICAgfSxcbiAgICBraWxsOiBmdW5jdGlvbigpIHtcblxuICAgICAgLy8gY2FuY2VsIHNsaWRlc2hvd1xuICAgICAgc3RvcCgpO1xuXG4gICAgICAvLyByZXNldCBlbGVtZW50XG4gICAgICBlbGVtZW50LnN0eWxlLndpZHRoID0gJyc7XG4gICAgICBlbGVtZW50LnN0eWxlLmxlZnQgPSAnJztcblxuICAgICAgLy8gcmVzZXQgc2xpZGVzXG4gICAgICB2YXIgcG9zID0gc2xpZGVzLmxlbmd0aDtcbiAgICAgIHdoaWxlKHBvcy0tKSB7XG5cbiAgICAgICAgdmFyIHNsaWRlID0gc2xpZGVzW3Bvc107XG4gICAgICAgIHNsaWRlLnN0eWxlLndpZHRoID0gJyc7XG4gICAgICAgIHNsaWRlLnN0eWxlLmxlZnQgPSAnJztcblxuICAgICAgICBpZiAoYnJvd3Nlci50cmFuc2l0aW9ucykgdHJhbnNsYXRlKHBvcywgMCwgMCk7XG5cbiAgICAgIH1cblxuICAgICAgLy8gcmVtb3ZlZCBldmVudCBsaXN0ZW5lcnNcbiAgICAgIGlmIChicm93c2VyLmFkZEV2ZW50TGlzdGVuZXIpIHtcblxuICAgICAgICAvLyByZW1vdmUgY3VycmVudCBldmVudCBsaXN0ZW5lcnNcbiAgICAgICAgZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKGJyb3dzZXIudG91Y2hzdGFydCwgZXZlbnRzLCBmYWxzZSk7XG4gICAgICAgIGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignd2Via2l0VHJhbnNpdGlvbkVuZCcsIGV2ZW50cywgZmFsc2UpO1xuICAgICAgICBlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21zVHJhbnNpdGlvbkVuZCcsIGV2ZW50cywgZmFsc2UpO1xuICAgICAgICBlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ29UcmFuc2l0aW9uRW5kJywgZXZlbnRzLCBmYWxzZSk7XG4gICAgICAgIGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignb3RyYW5zaXRpb25lbmQnLCBldmVudHMsIGZhbHNlKTtcbiAgICAgICAgZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgZXZlbnRzLCBmYWxzZSk7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCBldmVudHMsIGZhbHNlKTtcblxuICAgICAgfVxuICAgICAgZWxzZSB7XG5cbiAgICAgICAgd2luZG93Lm9ucmVzaXplID0gbnVsbDtcblxuICAgICAgfVxuXG4gICAgfVxuICB9XG5cbn1cblxuXG5pZiAoIHdpbmRvdy5qUXVlcnkgfHwgd2luZG93LlplcHRvICkge1xuICAoZnVuY3Rpb24oJCkge1xuICAgICQuZm4uU3dpcGUgPSBmdW5jdGlvbihwYXJhbXMpIHtcbiAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICQodGhpcykuZGF0YSgnU3dpcGUnLCBuZXcgU3dpcGUoJCh0aGlzKVswXSwgcGFyYW1zKSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0pKCB3aW5kb3cualF1ZXJ5IHx8IHdpbmRvdy5aZXB0byApXG59XG4iLCJmdW5jdGlvbiBzZXRUaHVtYnNQZXJQYWdlKCl7XG4gICAgLy9TaG93IGFzIG1hbnkgdGh1bWJzIGFzIHdpbGwgZml0IG9uIHRoZSBzY3JlZW5cbiAgICB2YXIgaXRlbXNJblBhZ2UgPSB2aWV3V2lkdGggLyBqUXVlcnkoIFwiLmRyYWdlbmQtdGh1bWJcIikud2lkdGgoKTtcbiAgICBqUXVlcnkoXCIjdGh1bWJzQ29udGFpbmVyXCIpLmRyYWdlbmQoe1xuICAgICAgICBpdGVtc0luUGFnZTogaXRlbXNJblBhZ2UsXG4gICAgICAgIG9uU3dpcGVFbmQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgLy9zdG9wVGh1bWJzT3ZlcnNjcm9sbCgpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5cbi8vUHJldmVudCBzY3JvbGxpbmcgaW50byB3aGl0ZXNwYWNlIGFmdGVyIHRoZSBsYXN0IHRodW1ibmFpbFxuZnVuY3Rpb24gc3RvcFRodW1ic092ZXJzY3JvbGwoKXtcbiAgICB2YXIgbGFzdFRodW1iID0galF1ZXJ5KCcjdGh1bWJzQ29udGFpbmVyIC5kcmFnZW5kLXRodW1iOmxhc3QtY2hpbGQnKTtcbiAgICB2YXIgbGFzdFRodW1iV2lkdGggPSB3aWR0aChsYXN0VGh1bWIpO1xuICAgIHZhciBsYXN0VGh1bWJPZmZzZXRMZWZ0ID0gbGFzdFRodW1iLnBvc2l0aW9uKCkubGVmdDtcbiAgICB2YXIgbGFzdFRodW1iT2Zmc2V0UmlnaHQgPSBsYXN0VGh1bWIucG9zaXRpb24oKS5sZWZ0ICsgbGFzdFRodW1iV2lkdGg7XG4gICAgdmFyIHRodW1ic0NvbnRhaW5lciA9IGpRdWVyeShcIiN0aHVtYnNDb250YWluZXIgZGl2OmZpcnN0LWNoaWxkXCIpO1xuICAgIHZhciB0aHVtYnNDb250YWluZXJXaWR0aCA9IHdpZHRoKHRodW1ic0NvbnRhaW5lcik7XG4gICAgdmFyIHRodW1ic0NvbnRhaW5lckJpZ2dlckJ5ID0gIHRodW1ic0NvbnRhaW5lcldpZHRoIC0gdmlld1dpZHRoO1xuICAgIGlmICggdGh1bWJzQ29udGFpbmVyV2lkdGggPiB2aWV3V2lkdGgpe1xuICAgICAgICBpZiggbGFzdFRodW1iT2Zmc2V0UmlnaHQgPCB2aWV3V2lkdGgpe1xuICAgICAgICAgICAgdGh1bWJzQ29udGFpbmVyLmNzcygndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZVgoLScgKyB0aHVtYnNDb250YWluZXJCaWdnZXJCeSArICdweCknKTtcbiAgICAgICAgfVxuICAgICAgICBpZiggdGh1bWJzQ29udGFpbmVyLnBvc2l0aW9uKCkubGVmdCA+IDApe1xuICAgICAgICAgICAgdGh1bWJzQ29udGFpbmVyLmNzcygndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZVgoMHB4KScpO1xuICAgICAgICB9XG4gICAgfVxuXG59XG4iLCIvKlxuICAgIGpRdWVyeS53aGVuKFxuICAgICAgICBtYXRjaEhlaWdodCh0YXJnZXQsIHRhcmdldEhlaWdodClcbiAgICApXG4gICAgLnRoZW4oXG4gICAgICAgIG1heFNpemVCeUFzcCh0YXJnZXQsIGFzcFJhbmdlKVxuICAgICk7XG4gKi9cbiIsIi8qKlxuICogZ2V0IEpTT04gZnJvbSBVUkwuICBQcmltYXJ5IHVzYWdlIFdvcmRQcmVzcyBSRVNUIEVuZHBvaW50cy5cbiAqL1xuZnVuY3Rpb24gZ2V0SnNvbih1cmwpIHtcblx0Ly9GSVg6IE1vdmUgdG8gZGlmZmVyZW50IGluY2x1ZGUgZmlsZVxuXHRjb25zb2xlLmxvZyhcImdldEpzb24oKSByZXF1ZXN0IGZvcjogXCIgKyB1cmwpO1xuXG5cdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihzdWNjZXNzSGFuZGxlciwgZXJyb3JIYW5kbGVyKSB7XG5cdHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblx0eGhyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuXHRcdGlmICh4aHIuc3RhdHVzID49IDIwMCAmJiB4aHIuc3RhdHVzIDwgNDAwKSB7XG5cdFx0XHQvLyBTdWNjZXNzIVxuXHRcdFx0dmFyIGRhdGEgPSBKU09OLnBhcnNlKHhoci5yZXNwb25zZVRleHQpO1xuXHRcdFx0Ly9jb25zb2xlLmxvZyhcImpzb24gZGF0YTogXCIgKyBKU09OLnN0cmluZ2lmeShkYXRhKSApO1xuXHRcdFx0c3VjY2Vzc0hhbmRsZXIoZGF0YSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vIEVycm9yICFcblx0XHRcdGVycm9ySGFuZGxlcih7XG5cdFx0XHQgIHN0YXR1czogdGhpcy5zdGF0dXMsXG5cdFx0XHQgIHN0YXR1c1RleHQ6IHhoci5zdGF0dXNUZXh0XG5cdFx0XHR9KTtcblx0XHR9XG5cdH07XG5cdHhoci5vbmVycm9yID0gZnVuY3Rpb24gKCkge1xuXHRcdGVycm9ySGFuZGxlcih7XG5cdFx0XHRzdGF0dXM6IHRoaXMuc3RhdHVzLFxuXHRcdFx0c3RhdHVzVGV4dDogeGhyLnN0YXR1c1RleHRcblx0XHR9KTtcblx0fTtcblx0eGhyLm9wZW4oJ0dFVCcsIHVybCk7XG5cdHhoci5zZW5kKCk7XG5cdH0pO1xuXG59XG5cbi8qKlxuICogQ2hlY2sgaWYgRE9NIGVsZW1lbnQgZXhpc3RzIHx8ICdoYXMgbG9hZGVkJ1xuICogVXNlIGZvciBkeW5hbWljIGNvbnRlbnQgcmVxdWlyZWQgYmVmb3JlIGRvYy5yZWFkeSgpXG4gKiBSZXF1aXJlcyBjYWxsYmFjaygpIC0gJ3doYXQgaGFwcGVucyBvbmNlIHRoZSBlbGVtZW50IGlzIHJlYWR5J1xuICovXG5mdW5jdGlvbiBlbGVtZW50UmVhZHkoIGVsZW1lbnQsIGNhbGxiYWNrICl7XG5cdChmdW5jdGlvbiBjaGVja0ZvckVsZW1lbnQoKXtcblx0ICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcblx0XHRcdGlmKCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtZW50KSApe1xuXHRcdFx0XHRjb25zb2xlLmxvZyhlbGVtZW50ICsgXCIgbG9hZGVkLlwiKTtcblx0ICAgICAgICBcdGNhbGxiYWNrKCk7XG5cdCAgICAgICAgfWVsc2V7XG5cdCAgICAgICAgXHRjaGVja0ZvckVsZW1lbnQoZWxlbWVudCk7XG5cdCAgICAgICAgfVxuXHQgICAgfSwxNTApO1xuXHQgfSkoKVxufTtcblxuXG4vKipcbiAqIEluc2VydCBIVE1MIFRlbXBsYXRlIGZvciBjb250ZW50OiBcImltYWdlc1wiXG4gKi9cbi8vKioqKioqKioqKioqKioqKioqKioqKioqIFJFTU9WRSBKUVVFUlkgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuZnVuY3Rpb24gY3JlYXRlRHJhZ2VuZFNsaWRlcyhwYXJlbnRDb250YWluZXIsIHNsaWRlc0NvbnRlbnQsIHNsaWRlVHlwZSl7XG5cdC8vY29uc29sZS5sb2coXCJjcmVhdGVEcmFnZW5kU2xpZGVzKCkgLSBwYXJlbnRDb250YWluZXI6IFwiICsgcGFyZW50Q29udGFpbmVyKTtcblx0dmFyIHRoaXNQYXJlbnRDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChwYXJlbnRDb250YWluZXIpO1xuXHR2YXIgdGhpc1NsaWRlc0NvbnRhaW5lciA9IHRoaXNQYXJlbnRDb250YWluZXIucXVlcnlTZWxlY3RvcignLmltYWdlLWdhbGxlcnknKTtcblxuXHRfLmZvckVhY2goc2xpZGVzQ29udGVudCwgZnVuY3Rpb24odGhpc1NsaWRlQ29udGVudCkge1xuXHRcdHZhciB0aGlzU2xpZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0XHR0aGlzU2xpZGUuY2xhc3NMaXN0LmFkZCgnZHJhZ2VuZC1wYWdlJyk7XG5cblx0XHRpZiAoIHNsaWRlVHlwZSA9PSAnYmFja2dyb3VuZC1pbWFnZScgKXtcblx0XHRcdC8vY29uc29sZS5sb2coXCJzbGlkZVR5cGU6IGJhY2tncm91bmQtaW1hZ2VcIik7XG5cdFx0XHQvL2NvbnNvbGUubG9nKFwidGhpc1NsaWRlOiBcIiArIHRoaXNTbGlkZSk7XG5cdFx0XHQvL2NvbnNvbGUubG9nKFwidGhpc1NsaWRlQ29udGVudDogXCIgKyB0eXBlb2YgdGhpc1NsaWRlQ29udGVudCk7XG5cdFx0XHRzZXRCZ0ltZyh0aGlzU2xpZGUsIHRoaXNTbGlkZUNvbnRlbnQpO1xuXHRcdH1cblx0XHQvL0ZJWDogQWRkIHN1cHBvcnQgZm9yIG90aGVyIGVsZW1lbnQgdHlwZXNcblxuXHRcdHRoaXNQYXJlbnRDb250YWluZXIuYXBwZW5kQ2hpbGQodGhpc1NsaWRlKTtcblx0fSk7XG59XG5cdC8qKlxuXHQgKiBBY2NlcHRzIHRhcmdldCBlbGVtZW50IGFuZCBkYXRhIG9iamVjdCB7dXJsLCBvcmlnaW5hbCBpbWFnZSBoZWlnaHQsIG9yaWdpbmFsIGltYWdlIHdpZHRofVxuXHQgKi9cblxuXHRmdW5jdGlvbiBzZXRCZ0ltZyh0YXJnZXQsIGltYWdlRGF0YSl7XG5cdFx0dGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2JhY2tncm91bmRJbWFnZScpO1xuXG5cdFx0dmFyIHRoaXNJbWdVcmwgXHRcdD0gaW1hZ2VEYXRhWzBdO1xuXHRcdHZhciB0aGlzSW1nSGVpZ2h0IFx0PSBpbWFnZURhdGFbMV07XG5cdFx0dmFyIHRoaXNJbWdXaWR0aCBcdD0gaW1hZ2VEYXRhWzJdO1xuXG5cdFx0dGFyZ2V0LnN0eWxlLmJhY2tncm91bmRJbWFnZSA9ICd1cmwoJyArIHRoaXNJbWdVcmwgKyAnKSc7XG5cblx0XHQvL2lmIG9yaWdpbmFsIGltYWdlIEhFSUdIVCBwYXNzZWQgaW4gYXJyYXlcblx0XHRpZih0aGlzSW1nSGVpZ2h0KXtcblx0XHRcdHRhcmdldC5zZXRBdHRyaWJ1dGUoJ2RhdGEtaGVpZ2h0JywgdGhpc0ltZ0hlaWdodCk7XG5cdFx0fVxuXG5cdFx0Ly9pZiBvcmlnaW5hbCBpbWFnZSBXSURUSCBwYXNzZWQgaW4gYXJyYXlcblx0XHRpZih0aGlzSW1nV2lkdGgpe1xuXHRcdFx0dGFyZ2V0LnNldEF0dHJpYnV0ZSgnZGF0YS13aWR0aCcsICB0aGlzSW1nV2lkdGgpO1xuXHRcdH1cblxuXHR9XG5cbmZ1bmN0aW9uIGdldEltYWdlc0J5U2NyZWVuU2l6ZShpbWFnZXNBcnJheSwgZmlyc3RCcmVhaywgc2Vjb25kQnJlYWspe1xuICAgIC8vc2VsZWN0IHRoZSBsYXJnZXIgb2Ygdmlld3BvcnQgaGVpZ2h0IC0gd2lkdGggKGRldmljZSBjYW4gcm90YXRlIGFmdGVyIGxvYWRpbmcgaW1hZ2VzKVxuICAgIHZhciB3aW5kb3dNYXhTaXplID0gTWF0aC5tYXgodmlld0hlaWdodCwgdmlld1dpZHRoKTtcblxuICAgIGlmICggd2luZG93TWF4U2l6ZSA8PSBmaXJzdEJyZWFrICl7XG4gICAgICAgIHJldHVybiBpbWFnZXNBcnJheVsxXTsvL21lZGl1bTtcbiAgICB9XG4gICAgZWxzZSBpZiggd2luZG93TWF4U2l6ZSA+PSBmaXJzdEJyZWFrICYmIHdpbmRvd01heFNpemUgPD0gc2Vjb25kQnJlYWspIHtcbiAgICAgICAgcmV0dXJuIGltYWdlc0FycmF5WzJdOy8vbGFyZ2U7XG4gICAgfVxuICAgIGVsc2V7XG4gICAgICAgIHJldHVybiBpbWFnZXNBcnJheVszXTsvLzE5MjAgbWF4O1xuICAgIH1cbn1cbiIsImZ1bmN0aW9uIG1lbnVIZWlnaHQoZG9jSGVpZ2h0KXtcbiAgICAvKlxuICAgIHZhciBuYXYgPSBnZXQoJ25hdicpO1xuICAgIGhlaWdodChuYXYsIFwiYXV0b1wiKTtcbiAgICBpZiAoaGFzQ2xhc3MoYm9keSwgJ21vYmlsZU1lbnVPcGVuJykgKXtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIm1lbnVIZWlnaHQgLSBkb2NIOiBcIiArIGRvY0hlaWdodCk7XG4gICAgICAgIGhlaWdodChuYXYsIGRvY0hlaWdodCk7XG4gICAgICAgIG1pbkhlaWdodChuYXYsIHZpZXdIZWlnaHQpO1xuICAgIH1cbiAgICAqL1xufVxuXG4vL0ZpeCBGb290ZXIgcG9zaXRpb24gZm9yIHNob3J0IHBhZ2VzIC0gdHJpZ2dlcmVkIG9uIC5yZXNpemVcbi8vTk9URSAtIEZJWCBQT1NJVElPTiBBQlNPTFVURSBGUk9NICdhYnNvbHV0ZUFmdGVyJyBvbiByZXNpemVcbmZ1bmN0aW9uIGZpeFRvQm90dG9tKHRhcmdldCl7XG4gICAgLy9yZXNldCBhbnkgY2xhc3NlcyBmcm9tIHByZXZpb3VzIGZ1bmN0aW9uIGNhbGxcbiAgICBpZiAoIGhhc0NsYXNzKHRhcmdldCwgJ2FwcGVuZFRvVmlld3BvcnQnKSApe1xuICAgICAgICByZW1vdmVDbGFzcyh0YXJnZXQsICdhcHBlbmRUb1ZpZXdwb3J0Jyk7XG4gICAgfVxuICAgIGlmICggaGFzQ2xhc3ModGFyZ2V0LCAnbW92ZWRBZnRlclByZXYnKSApe1xuICAgICAgICByZW1vdmVDbGFzcyh0YXJnZXQsICdtb3ZlZEFmdGVyUHJldicpO1xuICAgICAgICBzZXRTdHlsZSh0YXJnZXQsIHtcbiAgICAgICAgICAgICd0b3AnIDogJ2F1dG8nXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vZ2V0IG5ldyB2YWx1ZXNcbiAgICB2YXIgdGFyZ2V0Qm90dG9tID0galF1ZXJ5KCcjZm9vdGVyJykub2Zmc2V0KCkudG9wICsgalF1ZXJ5KCcjZm9vdGVyJykub3V0ZXJIZWlnaHQodHJ1ZSk7XG4gICAgLy9pZiB0aGUgdGFyZ2V0IGlzbid0IGFscmVhZHkgYXQgdGhlIGJvdHRvbVxuICAgIC8vY29uc29sZS5sb2codGFyZ2V0Qm90dG9tKTtcbiAgICB2aWV3SGVpZ2h0ID0galF1ZXJ5KHdpbmRvdykuaGVpZ2h0KCk7XG4gICAgaWYodGFyZ2V0Qm90dG9tIDwgdmlld0hlaWdodCkge1xuICAgICAgICAvL2NoZWNrIGlmIHRoZXJlIGlzIGVub3VnaCBzcGFjZSB0byBmaXQgdGhlIHRhcmdldFxuICAgICAgICAvL2dldCBwcmV2aW91cyBzaWJsaW5nIHBvc2l0aW9uXG4gICAgICAgIC8vdmFyIGVsZUFib3ZlID0gZ2V0RmFtaWx5KHRhcmdldCwgJ3ByZXYnKTtcbiAgICAgICAgLy92YXIgZWxlQWJvdmVCb3R0b20gPSBnZXRPZmZzZXQoZWxlQWJvdmUpLmJvdHRvbTtcblxuICAgICAgICB2YXIgZWxlID0galF1ZXJ5KCcjZm9vdGVyJyk7XG4gICAgICAgIHZhciBlbGVBYm92ZSA9IGVsZS5wcmV2KCk7XG4gICAgICAgIHZhciBlbGVBYm92ZUJvdHRvbSA9IGVsZUFib3ZlLm9mZnNldCgpLnRvcCArIGVsZUFib3ZlLm91dGVySGVpZ2h0KHRydWUpO1xuICAgICAgICB2YXIgYXZhaWxhYmxlU3BhY2UgPSB2aWV3SGVpZ2h0IC0gZWxlQWJvdmVCb3R0b207XG4gICAgICAgIHZhciB0YXJnZXRIZWlnaHQgPSBnZXRIZWlnaHQodGFyZ2V0KTtcbiAgICAgICAgaWYgKCBhdmFpbGFibGVTcGFjZSA+IHRhcmdldEhlaWdodCApe1xuICAgICAgICAgICAgYWRkQ2xhc3ModGFyZ2V0LCAnYXBwZW5kVG9WaWV3cG9ydCcpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICB2YXIgZWxlQWJvdmVQb3NpdGlvbiA9IGdldFBvc2l0aW9uKGVsZUFib3ZlKTtcbiAgICAgICAgICAgIC8vc2VlIGlmIHByZXZpb3VzIGNvbnRlbnQgaXMgaW4gdGhlIGRvY3VtZW50IGZsb3cgcG9zaXRpb24gYXQgYm90dG9tIG9mIHByZXYgc2libGluZ1xuICAgICAgICAgICAgaWYoZWxlQWJvdmVQb3NpdGlvbiA9PT0gXCJhYnNvbHV0ZVwiKXtcbiAgICAgICAgICAgICAgICAvL0ZJWDogcmVuYW1lIHBvc2l0aW9uQWZ0ZXIoKTtcbiAgICAgICAgICAgICAgICBtb3ZlQWZ0ZXIodGFyZ2V0LCBlbGVBYm92ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgdmFyIHdyYXBIZWlnaHQgPSBqUXVlcnkoJyN3cmFwcGVyJykuaGVpZ2h0KCk7XG4gICAgalF1ZXJ5KGJvZHkpLmNzcygnbWluLWhlaWdodCcsIHdyYXBIZWlnaHQpO1xufVxuXG5mdW5jdGlvbiBuYXZDbGFzc2VzKCkge1xuXHRpZiAobW9iaWxlTmF2T25seSA9PT0gZmFsc2Upe1xuXHRcdGlmICh2aWV3V2lkdGggPj0gMTAyNCl7XG5cdFx0XHRhZGRDbGFzcyhodG1sLCAnZGVza3RvcE1lbnUnKTtcblx0XHRcdHJlbW92ZUNsYXNzKGh0bWwsICdtb2JpbGVNZW51Jyk7XG5cdFx0fVxuXHRcdGVsc2V7XG5cdFx0XHRyZW1vdmVDbGFzcyhodG1sLCAnZGVza3RvcE1lbnUnKTtcblx0XHRcdGFkZENsYXNzKGh0bWwsJ21vYmlsZU1lbnUnKTtcblx0XHR9XG5cdH1cbn1cblxuLypBZGQgbW9iaWxlTWVudSBjbGFzcyB0byBodG1sICovXG5mdW5jdGlvbiBhZGRNZW51T3BlbkNsYXNzKCl7XG4gICAgcmVtb3ZlQ2xhc3MoaHRtbCwgJ2Rlc2t0b3BNZW51Jyk7XG5cdHJlbW92ZUNsYXNzKGh0bWwsICdtb2JpbGVNZW51Q2xvc2VkJyk7XG5cdGFkZENsYXNzKGh0bWwsICdtb2JpbGVNZW51T3BlbicpO1xuICAgIG1lbnVIZWlnaHQoKTtcbn1cblxuLypSZW1vdmUgbW9iaWxlTWVudSBjbGFzcyBmcm9tIGJvZHkgKi9cbmZ1bmN0aW9uIHJlbW92ZU1lbnVPcGVuQ2xhc3MoKXtcblx0cmVtb3ZlQ2xhc3MoaHRtbCwgJ21vYmlsZU1lbnVPcGVuJyk7XG5cdGFkZENsYXNzKGh0bWwsICdtb2JpbGVNZW51Q2xvc2VkJyk7XG4gICAgbmF2Q2xhc3NlcygpOy8vY2hlY2sgaWYgd2UgbmVlZCB0byBwdXQgYmFjayAnZGVza3RvcE1lbnUnIG9yICdtb2JpbGVNZW51J1xuICAgIG1lbnVIZWlnaHQoKTtcbn1cblxuLy9zZXQgcG9ydHJhaXQgLyBsYW5kc2NhcGUgY2xhc3NcbmZ1bmN0aW9uIGdldE9yaWVudGF0aW9uQ2xhc3MoKXtcblx0aWYgKHZpZXdIZWlnaHQgPiB2aWV3V2lkdGgpIHtcblx0XHRhZGRDbGFzcyhodG1sLCAncG9ydHJhaXQnKTtcblx0XHRyZW1vdmVDbGFzcyhodG1sLCAnbGFuZHNjYXBlJyk7XG5cdFx0cmV0dXJuIFwicG9ydHJhaXRcIjtcblx0fVxuXHRlbHNle1xuXHRcdGFkZENsYXNzKGh0bWwsICdsYW5kc2NhcGUnKTtcblx0XHRyZW1vdmVDbGFzcyhodG1sLCAncG9ydHJhaXQnKTtcblx0XHRyZXR1cm4gXCJsYW5kc2NhcGVcIjtcblx0fVxufVxuXG5mdW5jdGlvbiBzZXREaW1lbnNpb25zKHRhcmdldCwgdGFyZ2V0SGVpZ2h0LCBhc3BSYW5nZSl7XG4gICAgalF1ZXJ5LndoZW4oXG4gICAgICAgIG1hdGNoSGVpZ2h0KHRhcmdldCwgdGFyZ2V0SGVpZ2h0KVxuICAgIClcbiAgICAudGhlbihcbiAgICAgICAgbWF4U2l6ZUJ5QXNwKHRhcmdldCwgYXNwUmFuZ2UpXG4gICAgKTtcbn1cblxuZnVuY3Rpb24gbW92ZU9uT3JpZW50YXRpb24odGFyZ2V0LCBkZXN0aW5hdGlvbiwgbGFuZHNjYXBlLCBwb3J0cmFpdCl7XG5cdC8vTEFORFNDQVBFXG5cdGlmKHZpZXdXaWR0aD52aWV3SGVpZ2h0KXtcblx0XHRpZihsYW5kc2NhcGUgPT0gXCJwcmVwZW5kXCIpe1xuXHRcdFx0alF1ZXJ5KHRhcmdldCkucHJlcGVuZFRvKGRlc3RpbmF0aW9uKTtcblx0XHR9XG5cdFx0aWYobGFuZHNjYXBlID09IFwiYXBwZW5kXCIpe1xuXHRcdFx0alF1ZXJ5KHRhcmdldCkuYXBwZW5kVG8oZGVzdGluYXRpb24pO1xuXHRcdH1cblx0XHRpZihsYW5kc2NhcGUgPT0gXCJhZnRlclwiKXtcblx0XHRcdGpRdWVyeSh0YXJnZXQpLmluc2VydEFmdGVyKGRlc3RpbmF0aW9uKTtcblx0XHR9XG5cdFx0aWYobGFuZHNjYXBlID09IFwiYmVmb3JlXCIpe1xuXHRcdFx0alF1ZXJ5KHRhcmdldCkuaW5zZXJ0QmVmb3JlKGRlc3RpbmF0aW9uKTtcblx0XHR9XG5cdH1cblx0Ly9QT1JUUkFJVFxuXHRlbHNle1xuXHRcdGlmKHBvcnRyYWl0ID09IFwicHJlcGVuZFwiKSB7XG5cdFx0XHRqUXVlcnkodGFyZ2V0KS5wcmVwZW5kVG8oZGVzdGluYXRpb24pO1xuXHRcdH1cblx0XHRpZihwb3J0cmFpdCA9PSBcImFwcGVuZFwiKXtcblx0XHRcdGpRdWVyeSh0YXJnZXQpLmFwcGVuZFRvKGRlc3RpbmF0aW9uKTtcblx0XHR9XG5cdFx0aWYocG9ydHJhaXQgPT0gXCJhZnRlclwiKXtcblx0XHRcdGpRdWVyeSh0YXJnZXQpLmluc2VydEFmdGVyKGRlc3RpbmF0aW9uKTtcblx0XHR9XG5cdFx0aWYocG9ydHJhaXQgPT0gXCJiZWZvcmVcIil7XG5cdFx0XHRqUXVlcnkodGFyZ2V0KS5pbnNlcnRCZWZvcmUoZGVzdGluYXRpb24pO1xuXHRcdH1cblx0fVxufVxuIiwiLyogZnVuY3Rpb24gZ2V0SnNvbih1cmwpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHN1Y2Nlc3NIYW5kbGVyLCBlcnJvckhhbmRsZXIpIHtcblx0dmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXHR4aHIub25sb2FkID0gZnVuY3Rpb24oKSB7XG5cdFx0aWYgKHhoci5zdGF0dXMgPj0gMjAwICYmIHhoci5zdGF0dXMgPCA0MDApIHtcblx0XHRcdC8vIFN1Y2Nlc3MhXG5cdFx0XHR2YXIgZGF0YSA9IEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dCk7XG5cdFx0XHQvL2NvbnNvbGUubG9nKFwianNvbiBkYXRhOiBcIiArIEpTT04uc3RyaW5naWZ5KGRhdGEpICk7XG5cdFx0XHRzdWNjZXNzSGFuZGxlcihkYXRhKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly8gRXJyb3IgIVxuXHRcdFx0ZXJyb3JIYW5kbGVyKHtcblx0XHRcdCAgc3RhdHVzOiB0aGlzLnN0YXR1cyxcblx0XHRcdCAgc3RhdHVzVGV4dDogeGhyLnN0YXR1c1RleHRcblx0XHRcdH0pO1xuXHRcdH1cblx0fTtcblx0eGhyLm9uZXJyb3IgPSBmdW5jdGlvbiAoKSB7XG5cdFx0ZXJyb3JIYW5kbGVyKHtcblx0XHRcdHN0YXR1czogdGhpcy5zdGF0dXMsXG5cdFx0XHRzdGF0dXNUZXh0OiB4aHIuc3RhdHVzVGV4dFxuXHRcdH0pO1xuXHR9O1xuXHR4aHIub3BlbignR0VUJywgdXJsKTtcblx0eGhyLnNlbmQoKTtcbiAgfSk7XG59XG4qL1xuXG4vKlxuVVNBR0U6ICoqd2l0aCBwaHAgVVJMXG5cblx0Z2V0SnNvbignIDw/cGhwIGVjaG8gKCRqc29uX3VybCk7ID8+ICcpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG5cdFx0Ly8gQ29kZSBkZXBlbmRpbmcgb24gcmVzdWx0XG5cblx0fSkuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuXHRcdGNvbnNvbGUuZXJyb3IoJ0F1Z2gsIHRoZXJlIHdhcyBhbiBlcnJvciEnLCBlcnIuc3RhdHVzVGV4dCk7XG5cdH0pO1xuXG4gKi8iLCJmdW5jdGlvbiBoYXNDbGFzcyhlbGUsY2xzKSB7XG5cdHJldHVybiBlbGUuY2xhc3NOYW1lLm1hdGNoKG5ldyBSZWdFeHAoJyhcXFxcc3xeKScrY2xzKycoXFxcXHN8alF1ZXJ5KScpKTtcbn1cblxuZnVuY3Rpb24gYWRkQ2xhc3MoZWxlLGNscykge1xuXHRpZiAoIWhhc0NsYXNzKGVsZSxjbHMpKSB7ZWxlLmNsYXNzTmFtZSArPSBcIiBcIitjbHM7fVxufVxuXG5mdW5jdGlvbiByZW1vdmVDbGFzcyhlbGUsY2xzKSB7XG5cdGlmIChoYXNDbGFzcyhlbGUsY2xzKSkge1xuXHRcdHZhciByZWcgPSBuZXcgUmVnRXhwKCcoXFxcXHN8XiknK2NscysnKFxcXFxzfGpRdWVyeSknKTtcblx0XHRlbGUuY2xhc3NOYW1lPWVsZS5jbGFzc05hbWUucmVwbGFjZShyZWcsJyAnKTtcblx0fVxufVxuXG5mdW5jdGlvbiBtYXhIKHRhcmdldCwgdmFsdWUpe1xuXHRqUXVlcnkodGFyZ2V0KS5jc3MoJ21heC1oZWlnaHQnLCB2YWx1ZSk7XG59XG5cbmZ1bmN0aW9uIG1heFcodGFyZ2V0LCB2YWx1ZSl7XG5cdGpRdWVyeSh0YXJnZXQpLmNzcygnbWF4LXdpZHRoJywgdmFsdWUpO1xufVxuXG5mdW5jdGlvbiBtaW5IKHRhcmdldCwgdmFsdWUpe1xuXHRqUXVlcnkodGFyZ2V0KS5jc3MoJ21pbi1oZWlnaHQnLCB2YWx1ZSk7XG59XG5cbmZ1bmN0aW9uIG1pblcodGFyZ2V0LCB2YWx1ZSl7XG5cdGpRdWVyeSh0YXJnZXQpLmNzcygnbWluLXdpZHRoJywgdmFsdWUpO1xufVxuXG5mdW5jdGlvbiBtYXRjaEhlaWdodCh0YXJnZXQsIHRhcmdldEhlaWdodCl7XG4gICAgLy9jb25zb2xlLmxvZygnbWF0Y2hIZWlnaHQoKSAtIHZpZXdIZWlnaHQgJyArIHdpbmRvdy5pbm5lckhlaWdodCk7XG4gICAgdGFyZ2V0SGVpZ2h0ID0gdGFyZ2V0SGVpZ2h0ID8gdGFyZ2V0SGVpZ2h0IDogd2luZG93LmlubmVySGVpZ2h0O1xuXHRyZXR1cm4galF1ZXJ5KHRhcmdldCkuaGVpZ2h0KHRhcmdldEhlaWdodCk7XG59XG5cbmZ1bmN0aW9uIG1heFNpemVCeUFzcCh0YXJnZXQsIG1pbkFzcCwgbWF4QXNwKXtcbiAgICBtaW5Bc3AgPSBtaW5Bc3AgPyBtaW5Bc3AgOiAxLjc7XG4gICAgbWF4QXNwID0gbWF4QXNwID8gbWF4QXNwIDogMi4xO1xuXG5cdGpRdWVyeSh0YXJnZXQpLmNzcygnbWF4LWhlaWdodCcsICdub25lJyk7XG5cdGpRdWVyeSh0YXJnZXQpLmNzcygnbWluLWhlaWdodCcsIDApO1xuXG4gICAgdmFyIHZpZXdXaWR0aCA9IGpRdWVyeSh3aW5kb3cpLndpZHRoKCk7XG4gICAgdmFyIHZpZXdIZWlnaHQgPSBqUXVlcnkod2luZG93KS5oZWlnaHQoKTtcblx0dmFyIHRhcmdldEFzcCA9IHZpZXdXaWR0aCAvIHZpZXdIZWlnaHQ7XG5cbiAgICAvL2lmIFdJREUgLyBTSE9SVFxuXHRpZiAodGFyZ2V0QXNwID4gbWF4QXNwKXtcblx0XHRtaW5IKHRhcmdldCwgdmlld1dpZHRoIC8gbWF4QXNwKTtcblx0fVxuXG5cdC8vaWYgVEFMTCAvIFNLSU5OWVxuXHRpZiAodGFyZ2V0QXNwIDwgbWluQXNwKXtcblx0XHRtYXhIKHRhcmdldCwgdmlld1dpZHRoIC8gbWluQXNwICk7XG5cdH1cbn1cblxuZnVuY3Rpb24gYXNwTGFiZWwod2lkdGgsIGhlaWdodCl7XG5cdGlmICggd2lkdGggLyBoZWlnaHQgPiAxLjc1ICl7XG5cdFx0cmV0dXJuIFwibGFuZHNjYXBlIHNob3J0V2lkZVwiO1xuXHR9XG5cblx0ZWxzZSBpZiAoIHdpZHRoID4gaGVpZ2h0ICl7XG5cdFx0cmV0dXJuIFwibGFuZHNjYXBlXCI7XG5cdH1cblxuXHRlbHNlIGlmICggd2lkdGggLyBoZWlnaHQgPCAwLjc1ICl7XG5cdFx0cmV0dXJuIFwicG9ydHJhaXQgdGFsbFNraW5ueVwiO1xuXHR9XG5cblx0ZWxzZSBpZiAoIHdpZHRoIDwgaGVpZ2h0ICl7XG5cdFx0cmV0dXJuIFwicG9ydHJhaXRcIjtcblx0fVxuXG5cdGVsc2V7XG5cdFx0cmV0dXJuIFwic3F1YXJlXCI7XG5cdH1cbn1cblxuLy9GSVg6IHdoeSBhbSBJIHVzaW5nIHRoaXM/XG4vKlxuZnVuY3Rpb24gd2lkZXJUaGFuKG1pbiwgbWF4LCB0YXJnZXQpe1xuICAgIHZhciBpc1dpZGVyO1xuICAgIGlmKCF0YXJnZXQpe1xuXHRcdHRhcmdldCA9IGpRdWVyeSh3aW5kb3cpO1xuXHR9XG5cblx0aWYgKG1heCl7XG5cdFx0aWYoIChtYXggPiB3aWR0aCh0YXJnZXQpICkgJiYgKCBtaW4gPCB3aWR0aCh0YXJnZXQpICkgKXtcblx0XHRcdGlzV2lkZXIgPSB0cnVlO1xuXHRcdH1cblx0fVxuXHRlbHNlIGlmKCBtaW4gPCB3aWR0aCh0YXJnZXQpICl7XG5cdFx0aXNXaWRlciA9IHRydWU7XG5cdH1cblx0ZWxzZXtcblx0XHRpc1dpZGVyID0gIGZhbHNlO1xuXHR9XG4gICAgcmV0dXJuIGlzV2lkZXI7XG59Ki9cbiIsIid1c2Ugc3RyaWN0Jztcbi8qanNoaW50IC1XMTE3ICovXG5cbi8vQ29tYmluZSAyIGFycmF5c1xuLy9SZXR1cm5zIGEgbm9uLWRlc3RydWN0aXZlIHJlc3VsdCBjb250YWluaW5nIGJvdGggYXJyYXlzXG5mdW5jdGlvbiBqb2luQXJyYXlzKGZpcnN0QXJyYXksIHNlY29uZEFycmF5KXtcbiAgICB2YXIgbWVyZ2VkQXJyYXkgPSBmaXJzdEFycmF5LmNvbmNhdChzZWNvbmRBcnJheSk7XG4gICAgcmV0dXJuIG1lcmdlZEFycmF5O1xufVxuXG4vL0ZpbmQgdGhlIG51bWJlciBvZiBlbGVtZW50cyBpbiB0aGlzIGFycmF5XG5mdW5jdGlvbiBnZXRBcnJheUxlbmd0aCh0aGlzQXJyYXkpe1xuICAgIHJldHVybiB0aGlzQXJyYXkubGVuZ3RoO1xufVxuXG5cbi8vRmluZCB0aGUgaW5kZXggcG9zaXRpb24gb2YgYW4gaXRlbSBpbiBhbiBhcnJheVxuZnVuY3Rpb24gZ2V0QXJyYXlQb3NpdGlvbih0aGlzQXJyYXksIHRoaXNJdGVtKXtcbiAgICByZXR1cm4gdGhpc0FycmF5LmluZGV4T2YodGhpc0l0ZW0pO1xufVxuXG5cbi8vUG9wLCBQdXNoLCBTaGlmdCwgYW5kIFVuc2hpZnRcbmZ1bmN0aW9uIHJlbW92ZUZyb21BcnJheSh0aGlzQXJyYXksIHRoaXNQb3NpdGlvbil7XG4gICAgc3dpdGNoICh0aGlzUG9zaXRpb24pIHtcbiAgICAgICAgY2FzZSBcImxhc3RcIjpcbiAgICAgICAgICAgIC8vcmVtb3ZlIGZyb20gZW5kIG9mIGFycmF5XG4gICAgICAgICAgICByZXR1cm4gdGhpc0FycmF5LnBvcDtcbiAgICAgICAgY2FzZSBcImZpcnN0XCI6XG4gICAgICAgICAgICAvL3JlbW92ZSBmcm9tIHN0YXJ0IG9mIGFycmF5XG4gICAgICAgICAgICByZXR1cm4gdGhpc0FycmF5LnNoaWZ0O1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgLy9yZW1vdmUgc3BlY2lmaWMgaW5kZXhcbiAgICAgICAgICAgIHJldHVybiBkZWxldGUgYXJyYXlbdGhpc1Bvc2l0aW9uXTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGFkZFRvQXJyYXkoIHRoaXNBcnJheSwgdGhpc1Bvc2l0aW9uLCB0aGlzVmFsdWUgKXtcbiAgICBzd2l0Y2ggKHRoaXNQb3NpdGlvbikge1xuICAgICAgICBjYXNlIFwibGFzdFwiOlxuICAgICAgICAgICAgLy9hZGQgdG8gZW5kIG9mIGFycmF5XG4gICAgICAgICAgICByZXR1cm4gdGhpc0FycmF5LnB1c2godGhpc1ZhbHVlKTtcbiAgICAgICAgY2FzZSBcImZpcnN0XCI6XG4gICAgICAgICAgICAvL2FkZCB0byBzdGFydCBvZiBhcnJheVxuICAgICAgICAgICAgcmV0dXJuIHRoaXNBcnJheS51bnNoaWZ0KHRoaXNQb3NpdGlvbik7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAvL2FkZCB2YWx1ZSB0byBpbmRleCBwb3NpdGlvblxuICAgICAgICAgICAgdGhpc0FycmF5W3RoaXNQb3NpdGlvbl0gPSB0aGlzVmFsdWU7XG4gICAgICAgICAgICByZXR1cm4gdGhpc0FycmF5O1xuICAgIH1cbn1cblxuZnVuY3Rpb24gY29udmVydEFycmF5VG9TdHJpbmcodGhpc0FycmF5LCBzZXBhcmF0b3Ipe1xuICAgIHJldHVybiB0aGlzQXJyYXkuam9pbihzZXBhcmF0b3IpO1xufSIsIi8vYm94KCkgaXMgYSBjb252ZW5pZW50IHJlZmVyZW5jZSBmdW5jdGlvbiBmb3IgZ2V0dGluZyBpbnQgdmFsdWVzIGZvciBib3hNb2RlbCBwcm9wZXJ0aWVzXG5mdW5jdGlvbiBib3goZWxlbWVudCl7XG4gICAgdmFyIHRoaXNIZWlnaHQgICAgICA9IGdldEhlaWdodChlbGVtZW50KTtcbiAgICAvL2NvbnNvbGUubG9nKFwiYm94KCkgLSB0aGlzSGVpZ2h0OiBcIiArIHRoaXNIZWlnaHQpO1xuICAgIHZhciB0aGlzV2lkdGggICAgICAgPSBnZXRXaWR0aChlbGVtZW50KTtcbiAgICB2YXIgdGhpc01hcmdpbiAgICAgID0gZ2V0TWFyZ2luKGVsZW1lbnQpO1xuICAgIHZhciB0aGlzUGFkZGluZyAgICAgPSBnZXRQYWRkaW5nKGVsZW1lbnQpO1xuICAgIHZhciB0aGlzUG9zaXRpb24gICAgPSBnZXRQb3NpdGlvbihlbGVtZW50KTtcbiAgICB2YXIgdGhpc091dGVySGVpZ2h0ID0gZ2V0T3V0ZXJIZWlnaHQoZWxlbWVudCwgdGhpc0hlaWdodCwgdGhpc01hcmdpbiwgdGhpc1BhZGRpbmcpO1xuICAgIHZhciB0aGlzT3V0ZXJXaWR0aCAgPSBnZXRPdXRlcldpZHRoKGVsZW1lbnQsIHRoaXNXaWR0aCwgdGhpc01hcmdpbiwgdGhpc1BhZGRpbmcpO1xuICAgIHZhciB0aGlzT2Zmc2V0ICAgICAgPSBnZXRPZmZzZXQoZWxlbWVudCwgdGhpc091dGVySGVpZ2h0LCB0aGlzT3V0ZXJXaWR0aCk7XG4gICAgLy9jb25zb2xlLmxvZyhcImJveCgpIC0gdGhpc091dGVySGVpZ2h0OiBcIiArIHRoaXNPdXRlckhlaWdodCk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBoZWlnaHQ6IHRoaXNIZWlnaHQsXG4gICAgICAgIHdpZHRoOiB0aGlzV2lkdGgsXG4gICAgICAgIG1hcmdpbjoge1xuICAgICAgICAgICAgJ3RvcCcgICA6IHRoaXNNYXJnaW4udG9wLFxuICAgICAgICAgICAgJ3JpZ2h0JyA6IHRoaXNNYXJnaW4ucmlnaHQsXG4gICAgICAgICAgICAnYm90dG9tJzogdGhpc01hcmdpbi5ib3R0b20sXG4gICAgICAgICAgICAnbGVmdCcgIDogdGhpc01hcmdpbi5sZWZ0XG4gICAgICAgIH0sXG4gICAgICAgIHBhZGRpbmc6IHtcbiAgICAgICAgICAgICd0b3AnICAgOiB0aGlzUGFkZGluZy50b3AsXG4gICAgICAgICAgICAncmlnaHQnIDogdGhpc1BhZGRpbmcucmlnaHQsXG4gICAgICAgICAgICAnYm90dG9tJzogdGhpc1BhZGRpbmcuYm90dG9tLFxuICAgICAgICAgICAgJ2xlZnQnICA6IHRoaXNQYWRkaW5nLmxlZnRcbiAgICAgICAgfSxcbiAgICAgICAgcG9zaXRpb246IHRoaXNQb3NpdGlvbixcbiAgICAgICAgb2Zmc2V0OntcbiAgICAgICAgICAgICd0b3AnICAgOiB0aGlzT2Zmc2V0LnRvcCxcbiAgICAgICAgICAgICdyaWdodCcgOiB0aGlzT2Zmc2V0LnJpZ2h0LFxuICAgICAgICAgICAgJ2JvdHRvbSc6IHRoaXNPZmZzZXQuYm90dG9tLFxuICAgICAgICAgICAgJ2xlZnQnICA6IHRoaXNPZmZzZXQubGVmdFxuICAgICAgICB9LFxuICAgICAgICBvdXRlckhlaWdodDogdGhpc091dGVySGVpZ2h0LFxuICAgICAgICBvdXRlcldpZHRoOiB0aGlzT3V0ZXJXaWR0aFxuICAgIH07XG59XG5cbmZ1bmN0aW9uIGhlaWdodChlbGVtZW50LCBoZWlnaHQpe1xuICAgIGlmIChoZWlnaHQpe1xuICAgICAgICBzZXRIZWlnaHQoZWxlbWVudCwgaGVpZ2h0KTtcbiAgICB9XG4gICAgZWxzZXtcbiAgICAgICAgZ2V0SGVpZ2h0KGVsZW1lbnQpO1xuICAgIH1cbn1cblxuICAgIC8vZ2V0IHRoZSBjb21wdXRlZCBzdHlsZSBoZWlnaHRcbiAgICBmdW5jdGlvbiBnZXRIZWlnaHQoZWxlbWVudCl7XG4gICAgICAgIHZhciB0aGlzSGVpZ2h0ID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWxlbWVudCkuZ2V0UHJvcGVydHlWYWx1ZShcImhlaWdodFwiKTtcbiAgICAgICAgcmV0dXJuIHRvSW50KHRoaXNIZWlnaHQpO1xuICAgIH1cblxuICAgIC8vc2V0IGhlaWdodCBhcyBzdHJpbmcgcHggdmFsdWUsXG4gICAgZnVuY3Rpb24gc2V0SGVpZ2h0KGVsZW1lbnQsIGhlaWdodCl7XG4gICAgICAgIHZhciB0aGlzSGVpZ2h0ID0gdG9QaXgoaGVpZ2h0KTtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcInNldEhlaWdodCAtIFwiICsgZWxlbWVudC5pZCArIFwiIC0gXCIgKyBoZWlnaHQpO1xuICAgICAgICBlbGVtZW50LnN0eWxlLmhlaWdodCA9IHRoaXNIZWlnaHQ7XG4gICAgfVxuXG4vL3NldCB3aWR0aCB0byB0aGlzV2lkdGggYXMgc3RyaW5nIHB4IHZhbHVlLCBvciBnZXQgdGhlIGNvbXB1dGVkIHN0eWxlIHdpZHRoXG5mdW5jdGlvbiB3aWR0aChlbGVtZW50LCB3aWR0aCl7XG4gICAgaWYgKHdpZHRoKXtcbiAgICAgICAgc2V0V2lkdGgoZWxlbWVudCwgd2lkdGgpO1xuICAgIH1cbiAgICBlbHNle1xuICAgICAgICBnZXRXaWR0aChlbGVtZW50KTtcbiAgICB9XG59XG5cbiAgICAvL2dldCB0aGUgY29tcHV0ZWQgc3R5bGUgd2lkdGhcbiAgICBmdW5jdGlvbiBnZXRXaWR0aChlbGVtZW50KXtcbiAgICAgICAgdmFyIHRoaXNXaWR0aCA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpLmdldFByb3BlcnR5VmFsdWUoXCJ3aWR0aFwiKTtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcImdldFdpZHRoIC0gXCIgKyBlbGVtZW50LmlkKTtcbiAgICAgICAgcmV0dXJuIHRvSW50KHRoaXNXaWR0aCk7XG4gICAgfVxuXG4gICAgLy9zZXQgd2lkdGggYXMgc3RyaW5nIHB4IHZhbHVlLFxuICAgIGZ1bmN0aW9uIHNldFdpZHRoKGVsZW1lbnQsIHdpZHRoKXtcbiAgICAgICAgdmFyIHRoaXNXaWR0aCA9IHRvUGl4KHdpZHRoKTtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcInNldFdpZHRoIC0gXCIgKyBlbGVtZW50LmlkICsgXCIgLSBcIiArIHRoaXNXaWR0aCk7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUud2lkdGggPSB0aGlzV2lkdGg7XG4gICAgfVxuXG5cbi8vTUlOIEhFSUdIVFxuZnVuY3Rpb24gbWluSGVpZ2h0KGVsZW1lbnQsIG1pbkhlaWdodCl7XG4gICAgaWYgKG1pbkhlaWdodCl7XG4gICAgICAgIHNldE1pbkhlaWdodChlbGVtZW50LCBtaW5IZWlnaHQpO1xuICAgIH1cbiAgICBlbHNle1xuICAgICAgICBnZXRNaW5IZWlnaHQoZWxlbWVudCk7XG4gICAgfVxufVxuICAgIC8vZ2V0IHRoZSBjb21wdXRlZCBzdHlsZSBvZiBtaW4taGVpZ2h0XG4gICAgZnVuY3Rpb24gZ2V0TWluSGVpZ2h0KGVsZW1lbnQpe1xuICAgICAgICB2YXIgdGhpc01pbkhlaWdodCA9IGdldFN0eWxlKGVsZW1lbnQsIFwibWluSGVpZ2h0XCIpO1xuICAgICAgICByZXR1cm4gdG9JbnQodGhpc01pbkhlaWdodCk7XG4gICAgfVxuXG4gICAgLy9zZXQgbWluSGVpZ2h0IGFzIHB4IHZhbHVlLFxuICAgIGZ1bmN0aW9uIHNldE1pbkhlaWdodChlbGVtZW50LCBtaW5IZWlnaHQpe1xuICAgICAgICB2YXIgdGhpc01pbkhlaWdodCA9IHRvUGl4KG1pbkhlaWdodCk7XG4gICAgICAgIHNldFN0eWxlKGVsZW1lbnQsIHtcIm1pbkhlaWdodFwiICA6IHRoaXNNaW5IZWlnaHR9KTtcbiAgICB9XG5cbiAgICAvL3NldCB3aWR0aCBhcyBweCB2YWx1ZSwgb3IgZ2V0IHRoZSBjb21wdXRlZCBzdHlsZSB3aWR0aFxuICAgIGZ1bmN0aW9uIG1pbldpZHRoKGVsZW1lbnQsIG1pbldpZHRoKXtcbiAgICAgICAgaWYgKG1pbldpZHRoKXtcbiAgICAgICAgICAgIHNldE1pbldpZHRoKGVsZW1lbnQsIG1pbldpZHRoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgZ2V0TWluV2lkdGgoZWxlbWVudCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgICAgIC8vZ2V0IG1pbi13aWR0aCBmcm9tIHRoZSBjb21wdXRlZCBzdHlsZVxuICAgICAgICBmdW5jdGlvbiBnZXRNaW5XaWR0aChlbGVtZW50KXtcbiAgICAgICAgICAgIHZhciB0aGlzTWluV2lkdGggPSBnZXRTdHlsZShlbGVtZW50LCBcIm1pbldpZHRoXCIpO1xuICAgICAgICAgICAgcmV0dXJuIHRvSW50KHRoaXNNaW5XaWR0aCk7XG4gICAgICAgIH1cblxuICAgICAgICAvL3NldCBtaW4td2lkdGggYXMgc3RyaW5nIHB4IHZhbHVlLFxuICAgICAgICBmdW5jdGlvbiBzZXRNaW5XaWR0aChlbGVtZW50LCBtaW5XaWR0aCl7XG4gICAgICAgICAgICB2YXIgdGhpc01pbldpZHRoID0gdG9QaXgodGhpc01pbldpZHRoKTtcbiAgICAgICAgICAgIHJldHVybiBzZXRTdHlsZShlbGVtZW50LCB7XCJtaW5XaWR0aFwiICA6IHRoaXNNaW5XaWR0aH0pO1xuICAgICAgICB9XG5cbmZ1bmN0aW9uIGdldE1hcmdpbihlbGVtZW50KXtcbiAgICB2YXIgdGhpc01hcmdpblRvcCA9ICAgICB0b0ludCggZ2V0U3R5bGUoZWxlbWVudCwgXCJtYXJnaW5Ub3BcIikgKTtcbiAgICB2YXIgdGhpc01hcmdpblJpZ2h0ID0gICB0b0ludCggZ2V0U3R5bGUoZWxlbWVudCwgXCJtYXJnaW5SaWdodFwiKSApO1xuICAgIHZhciB0aGlzTWFyZ2luQm90dG9tID0gIHRvSW50KCBnZXRTdHlsZShlbGVtZW50LCBcIm1hcmdpbkJvdHRvbVwiKSApO1xuICAgIHZhciB0aGlzTWFyZ2luTGVmdCA9ICAgIHRvSW50KCBnZXRTdHlsZShlbGVtZW50LCBcIm1hcmdpbkxlZnRcIikgKTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIHRvcDogdGhpc01hcmdpblRvcCxcbiAgICAgICAgcmlnaHQ6IHRoaXNNYXJnaW5SaWdodCxcbiAgICAgICAgYm90dG9tOiB0aGlzTWFyZ2luQm90dG9tLFxuICAgICAgICBsZWZ0OiB0aGlzTWFyZ2luTGVmdFxuICAgIH07XG59XG5cbmZ1bmN0aW9uIGdldFBhZGRpbmcoZWxlbWVudCl7XG4gICAgLy9jb25zb2xlLmxvZyhcImdldFBhZGRpbmcgZm9yOiBcIiArIGVsZW1lbnQuaWQpO1xuICAgIHZhciB0aGlzUGFkZGluZ1RvcCA9ICAgIHRvSW50KCBnZXRTdHlsZShlbGVtZW50LCBcInBhZGRpbmdUb3BcIikgKTtcbiAgICB2YXIgdGhpc1BhZGRpbmdSaWdodCA9ICB0b0ludCggZ2V0U3R5bGUoZWxlbWVudCwgXCJwYWRkaW5nUmlnaHRcIikgKTtcbiAgICB2YXIgdGhpc1BhZGRpbmdCb3R0b20gPSB0b0ludCggZ2V0U3R5bGUoZWxlbWVudCwgXCJwYWRkaW5nQm90dG9tXCIpICk7XG4gICAgdmFyIHRoaXNQYWRkaW5nTGVmdCA9ICAgdG9JbnQoIGdldFN0eWxlKGVsZW1lbnQsIFwicGFkZGluZ0xlZnRcIikgKTtcbiAgICAvL2NvbnNvbGUubG9nKFwiZ2V0UGFkZGluZygpIC0gdG9wOiBcIiArIHRoaXNQYWRkaW5nVG9wKTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIHRvcDogdGhpc1BhZGRpbmdUb3AsXG4gICAgICAgIHJpZ2h0OiB0aGlzUGFkZGluZ1JpZ2h0LFxuICAgICAgICBib3R0b206IHRoaXNQYWRkaW5nQm90dG9tLFxuICAgICAgICBsZWZ0OiB0aGlzUGFkZGluZ0xlZnRcbiAgICB9O1xufVxuXG5mdW5jdGlvbiBnZXRQb3NpdGlvbihlbGVtZW50KSB7XG4gICAgdmFyIHRoaXNQb3NpdGlvbiA9IGdldFN0eWxlKGVsZW1lbnQsIFwicG9zaXRpb25cIik7XG4gICAgLy9jb25zb2xlLmxvZyhcImdldFBvc2l0aW9uKCkgZm9yIFwiICsgZWxlbWVudC5pZCArIFwiIDogXCIgKyB0aGlzUG9zaXRpb24pO1xuICAgIHJldHVybiB0aGlzUG9zaXRpb247XG59XG5cbmZ1bmN0aW9uIGdldE9mZnNldChlbGVtZW50LCBvdXRlckhlaWdodCwgb3V0ZXJXaWR0aCl7XG4gICAgLy9jb25zb2xlLmxvZyhcImdldE9mZnNldCgpIC0gb3V0ZXJIZWlnaHQ6IFwiICsgb3V0ZXJIZWlnaHQgKTtcbiAgICBvdXRlckhlaWdodCA9IG91dGVySGVpZ2h0ID8gb3V0ZXJIZWlnaHQgOiBnZXRPdXRlckhlaWdodChlbGVtZW50KTtcbiAgICBvdXRlcldpZHRoICA9IG91dGVyV2lkdGggID8gb3V0ZXJXaWR0aCAgOiBnZXRPdXRlcldpZHRoKGVsZW1lbnQpO1xuICAgIHZhciB0aGlzVG9wID0gZ2V0T2Zmc2V0VG9wKGVsZW1lbnQpO1xuICAgIHZhciB0aGlzUmlnaHQgPSBnZXRPZmZzZXRSaWdodChlbGVtZW50LCBvdXRlcldpZHRoKTtcbiAgICB2YXIgdGhpc0JvdHRvbSA9IGdldE9mZnNldEJvdHRvbShlbGVtZW50LCBvdXRlckhlaWdodCk7XG4gICAgdmFyIHRoaXNMZWZ0ID0gZ2V0T2Zmc2V0TGVmdChlbGVtZW50KTtcblxuICAgIHZhciB0aGVzZU9mZnNldHMgPSB7XG4gICAgICAgIHRvcDogdGhpc1RvcCxcbiAgICAgICAgcmlnaHQ6IHRoaXNSaWdodCxcbiAgICAgICAgYm90dG9tOiB0aGlzQm90dG9tLFxuICAgICAgICBsZWZ0OiB0aGlzTGVmdFxuICAgIH07XG4gICAgLy9jb25zb2xlLmxvZyhcImdldE9mZnNldCgpIDogXCIgKyB0aGVzZU9mZnNldHMpO1xuICAgIHJldHVybiB0aGVzZU9mZnNldHM7XG59XG5cbmZ1bmN0aW9uIGdldE9mZnNldFRvcChlbGVtZW50KXtcbiAgICB2YXIgdGhpc1RvcCA9IDA7XG4gICAgd2hpbGUoZWxlbWVudCl7XG4gICAgICAgIHRoaXNUb3AgKz0gKGVsZW1lbnQub2Zmc2V0VG9wIC0gZWxlbWVudC5zY3JvbGxUb3AgKyBlbGVtZW50LmNsaWVudFRvcCk7XG4gICAgICAgIGVsZW1lbnQgPSBlbGVtZW50Lm9mZnNldFBhcmVudDtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpc1RvcDtcbn1cblxuZnVuY3Rpb24gZ2V0T2Zmc2V0Qm90dG9tKGVsZW1lbnQsIG91dGVySGVpZ2h0KXtcbiAgICBvdXRlckhlaWdodCA9IG91dGVySGVpZ2h0ID8gb3V0ZXJIZWlnaHQgOiBnZXRPdXRlckhlaWdodChlbGVtZW50KTtcbiAgICB2YXIgdGhpc0VsZW1lbnRUb3AgPSBnZXRPZmZzZXRUb3AoZWxlbWVudCk7XG5cbiAgICAvL2NvbnNvbGUubG9nKFwiZ2V0T2Zmc2V0Qm90dG9tKCkgLSBlbGVtZW50VG9wOiBcIiArIHRoaXNFbGVtZW50VG9wICk7XG4gICAgLy9jb25zb2xlLmxvZyhcImdldE9mZnNldEJvdHRvbSgpIC0gb3V0ZXJIZWlnaHQ6IFwiICsgb3V0ZXJIZWlnaHQgKTtcblxuICAgIHZhciB0aGlzT2Zmc2V0Qm90dG9tID0gdGhpc0VsZW1lbnRUb3AgKyBvdXRlckhlaWdodDtcblxuICAgIHJldHVybiB0aGlzT2Zmc2V0Qm90dG9tO1xufVxuXG5mdW5jdGlvbiBnZXRPZmZzZXRMZWZ0KGVsZW1lbnQpe1xuICAgIHZhciB0aGlzTGVmdCA9IDA7XG4gICAgd2hpbGUoZWxlbWVudCkge1xuICAgICAgICB0aGlzTGVmdCArPSAoZWxlbWVudC5vZmZzZXRUb3AgLSBlbGVtZW50LnNjcm9sbFRvcCArIGVsZW1lbnQuY2xpZW50VG9wKTtcbiAgICAgICAgZWxlbWVudCA9IGVsZW1lbnQub2Zmc2V0UGFyZW50O1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzTGVmdDtcbn1cblxuZnVuY3Rpb24gZ2V0T2Zmc2V0UmlnaHQoZWxlbWVudCwgb3V0ZXJXaWR0aCl7XG4gICAgb3V0ZXJXaWR0aCA9IG91dGVyV2lkdGggPyBvdXRlcldpZHRoIDogZ2V0T3V0ZXJXaWR0aChlbGVtZW50KTtcbiAgICB2YXIgdGhpc09mZnNldExlZnQgPSBnZXRPZmZzZXRMZWZ0KGVsZW1lbnQpO1xuICAgIHZhciB0aGlzT2Zmc2V0Qm90dG9tID0gdGhpc09mZnNldExlZnQgKyBvdXRlcldpZHRoO1xuXG4gICAgcmV0dXJuIHRoaXNPZmZzZXRCb3R0b207XG59XG5cblxuLy9vdXRlckhlaWdodCArIG91dGVyV2lkdGggY2FsY3VsYXRpb25zXG5mdW5jdGlvbiBnZXRPdXRlckhlaWdodChlbGVtZW50LCBoZWlnaHQsIG1hcmdpbiwgcGFkZGluZyl7XG4gICAgIGhlaWdodCA9IGhlaWdodCA/IGhlaWdodCA6IGdldEhlaWdodChlbGVtZW50KTtcbiAgICAgbWFyZ2luID0gbWFyZ2luID8gbWFyZ2luIDogZ2V0TWFyZ2luKGVsZW1lbnQpO1xuICAgICBwYWRkaW5nID0gcGFkZGluZyA/IHBhZGRpbmcgOiBnZXRQYWRkaW5nKGVsZW1lbnQpO1xuICAgIC8vY29uc29sZS5sb2cocGFkZGluZyk7XG5cbiAgICAvL2dldC9hZGQgdmVydGljYWwgbWFyZ2luIGFuZCBwYWRkaW5nIHZhbHVlcyB0byBoZWlnaHRcbiAgICB2YXIgdGhpc1ZlcnRNYXJnaW4gPSBtYXJnaW4udG9wICsgbWFyZ2luLmJvdHRvbTtcbiAgICB2YXIgdGhpc1ZlcnRQYWRkaW5nID0gcGFkZGluZy50b3AgKyBwYWRkaW5nLmJvdHRvbTtcbiAgICB2YXIgdGhpc091dGVySGVpZ2h0ID0gaGVpZ2h0ICsgdGhpc1ZlcnRNYXJnaW4gKyB0aGlzVmVydFBhZGRpbmc7XG5cbiAgICByZXR1cm4gdGhpc091dGVySGVpZ2h0O1xufVxuXG5mdW5jdGlvbiBnZXRPdXRlcldpZHRoKGVsZW1lbnQsIHdpZHRoLCBtYXJnaW4sIHBhZGRpbmcpe1xuICAgIHdpZHRoID0gd2lkdGggPyB3aWR0aCA6IGdldFdpZHRoKGVsZW1lbnQpO1xuICAgIG1hcmdpbiA9IG1hcmdpbiA/IG1hcmdpbiA6IGdldE1hcmdpbihlbGVtZW50KTtcbiAgICBwYWRkaW5nID0gcGFkZGluZyA/IHBhZGRpbmcgOiBnZXRQYWRkaW5nKGVsZW1lbnQpO1xuXG4gICAgLy9nZXQvYWRkIGhvcml6b250YWwgbWFyZ2luIGFuZCBwYWRkaW5nIHZhbHVlcyB0byB3aWR0aFxuICAgIHZhciB0aGlzSG9yek1hcmdpbiA9IG1hcmdpbi5sZWZ0ICsgbWFyZ2luLnJpZ2h0O1xuICAgIHZhciB0aGlzSG9yelBhZGRpbmcgPSBwYWRkaW5nLmxlZnQgKyBwYWRkaW5nLnJpZ2h0O1xuICAgIHZhciB0aGlzT3V0ZXJXaWR0aCA9IHdpZHRoICsgdGhpc0hvcnpNYXJnaW4gKyB0aGlzSG9yelBhZGRpbmc7XG5cbiAgICByZXR1cm4gdGhpc091dGVyV2lkdGg7XG59XG4iLCIvLyBnZXQgZWxlbWVudCBieSBJZCA+IGNsYXNzID4gc2VsZWN0b3JcbmZ1bmN0aW9uIGdldChzZWxlY3RvciwgZmFtaWx5KXtcbiAgICB2YXIgdGhpc1RhcmdldDsgLy9jb250YWlucyByZXN1bHRpbmcgZWxlbWVudChzKSBmcm9tIGdldCgpXG5cbiAgICBpZiAoZmFtaWx5KXtcbiAgICAgICAgdGhpc1RhcmdldCA9IGdldEZhbWlseShzZWxlY3RvciwgZmFtaWx5KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGlmKCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChzZWxlY3RvcikgKXtcbiAgICAgICAgICAgIHRoaXNUYXJnZXQgPSAgZ2V0QnlJZChzZWxlY3Rvcik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShzZWxlY3Rvcikpe1xuICAgICAgICAgICAgdGhpc1RhcmdldCA9ICBnZXRCeUNsYXNzKHNlbGVjdG9yKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgdGhpc1RhcmdldCA9IGdldEJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vY29uc29sZS5sb2coXCJnZXQoKSBjYWxsZWQgb246IFwiICsgc2VsZWN0b3IgKyBcIiByZXR1cm5lZDogXCIgKyB0aGlzVGFyZ2V0KTtcbiAgICByZXR1cm4gdGhpc1RhcmdldDtcbn1cblxuICAgIGZ1bmN0aW9uIGdldEJ5SWQoaWQpe1xuICAgICAgICB2YXIgdGhpc1RhcmdldCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcbiAgICAgICAgcmV0dXJuIHRoaXNUYXJnZXQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0QnlDbGFzcyhjbGFzc05hbWUpe1xuICAgICAgICB2YXIgdGhpc1RhcmdldCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoY2xhc3NOYW1lKTtcbiAgICAgICAgcmV0dXJuIHRoaXNUYXJnZXQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0QnlTZWxlY3RvcihzZWxlY3Rvcil7XG4gICAgICAgIHZhciB0aGlzVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCh0aGlzU2VsZWN0b3IpO1xuICAgICAgICByZXR1cm4gdGhpc1RhcmdldDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRGYW1pbHkoZWxlbWVudCwgZmFtaWx5KXtcbiAgICAgICAgdmFyIHRoaXNGYW1pbHk7XG4gICAgICAgIHN3aXRjaCAoZmFtaWx5KXtcbiAgICAgICAgICAgIGNhc2UgXCJwcmV2XCI6XG4gICAgICAgICAgICAgICAgdGhpc0ZhbWlseSA9IGdldFByZXYoZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwibmV4dFwiOlxuICAgICAgICAgICAgICAgIHRoaXNGYW1pbHkgPSBnZXROZXh0KGVsZW1lbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcInBhcmVudFwiOlxuICAgICAgICAgICAgICAgIHRoaXNGYW1pbHkgPSBnZXRQYXJlbnQoZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAvKiBGSVg6IEFkZCBjaGlsZCBhbmQgY2hpbGRyZW5cbiAgICAgICAgICAgIGNhc2UgXCJjaGlsZFwiOlxuICAgICAgICAgICAgICAgIHZhciB0aGlzVGFyZ2V0ID0gZ2V0TmV4dChlbGVtZW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJjaGlsZHJlblwiOlxuICAgICAgICAgICAgICAgIHZhciB0aGlzVGFyZ2V0ID0gZ2V0TmV4dChlbGVtZW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICovXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXNGYW1pbHk7XG4gICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGdldFByZXYoZWxlbWVudCl7XG4gICAgICAgICAgICB2YXIgdGhpc1NpYmxpbmcgPSBlbGVtZW50LnByZXZpb3VzRWxlbWVudFNpYmxpbmc7XG4gICAgICAgICAgICByZXR1cm4gdGhpc1NpYmxpbmc7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBnZXROZXh0KGVsZW1lbnQpe1xuICAgICAgICAgICAgdmFyIHRoaXNTaWJsaW5nID0gZWxlbWVudC5uZXh0RWxlbWVudFNpYmxpbmc7XG4gICAgICAgICAgICByZXR1cm4gdGhpc1NpYmxpbmc7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBnZXRQYXJlbnQoZWxlbWVudCl7XG4gICAgICAgICAgICB2YXIgdGhpc1BhcmVudCA9IGVsZW1lbnQucGFyZW50RWxlbWVudDtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJnZXRQYXJlbnQgLSBcIiArIGVsZW1lbnQuaWQgKyBcIiAtIFwiICsgdGhpc1BhcmVudCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpc1BhcmVudDtcbiAgICAgICAgfVxuXG5mdW5jdGlvbiBtb3ZlQWZ0ZXIoZWxlbWVudCwgdGFyZ2V0KXtcbiAgICB2YXIgdGhpc1RvcCA9IGdldE9mZnNldEJvdHRvbSh0YXJnZXQpO1xuICAgIGFkZENsYXNzKHRhcmdldCwgXCJtb3ZlZEFmdGVyXCIpO1xuICAgIHN0eWxlKGVsZW1lbnQsIHtcbiAgICAgICAgLy8ncG9zaXRpb24nOidhYnNvbHV0ZScsIC8vc2V0IHdpdGggY3NzIGNsYXNzXG4gICAgICAgICd0b3AnOiB0b1BpeCh0aGlzVG9wKVxuICAgICAgICB9XG4gICAgKTtcbn1cbiIsIid1c2Ugc3RyaWN0Jztcbi8qanNoaW50IC1XMTE3ICovXG4vKlxuZnVuY3Rpb24gYWRkRXZlbnQodGhpc1RhcmdldCwgZXZlbnRUeXBlLCBmdWNudGlvbil7XG4gICAgZ2V0KHRoaXNUYXJnZXQpO1xuICAgIGlmKGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIpe1xuICAgICAgICB0aGlzVGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnRUeXBlLCBmdWNudGlvbiwgZmFsc2UpO1xuICAgIH0gZWxzZSBpZihkb2N1bWVudC5hdHRhY2hFdmVudCl7XG4gICAgICAgIHRoaXNUYXJnZXQuYXR0YWNoRXZlbnQoJ29uJytldmVudFR5cGUsIGZ1Y250aW9uKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzVGFyZ2V0WydvbicrZXZlbnRUeXBlXSA9IGZ1Y250aW9uO1xuICAgIH1cbn1cblxuKi9cbi8qXG5cbi8vU2FtcGxlIFVzYWdlXG5cbmFkZEV2ZW50KHdpbmRvdywgJ2xvYWQnLCBmdW5jdGlvbigpe1xuICAgIC8vYWxsIG91ciBjb2RlIHRoYXQgcnVucyBhZnRlciB0aGUgcGFnZSBpcyByZWFkeSBnb2VzIGhlcmVcbn0pO1xuXG5hZGRFdmVudChvdXJGb3JtLCAnc3VibWl0JywgY2hlY2tGb3JtKTtcblxuLy8gKi9cbiIsImZ1bmN0aW9uIGdldERvY0hlaWdodCgpe1xuICAgIC8vU3RhbmRhcmRpemUgaGVpZ2h0IHRvIGhlaWdoZXN0IHZhbHVlXG4gICAgdmFyIGRvY0hlaWdodCA9IE1hdGgubWF4KCBib2R5LnNjcm9sbEhlaWdodCwgYm9keS5vZmZzZXRIZWlnaHQsIGh0bWwuY2xpZW50SGVpZ2h0LCBodG1sLnNjcm9sbEhlaWdodCwgaHRtbC5vZmZzZXRIZWlnaHQgKTtcbiAgICByZXR1cm4gZG9jSGVpZ2h0O1xufVxuXG4vLyBnZXQgZWxlbWVudCBieSBJZCA+IGNsYXNzID4gc2VsZWN0b3JcbmZ1bmN0aW9uIGdldChzZWxlY3RvciwgZmFtaWx5KXtcbiAgICB2YXIgdGhpc1RhcmdldDsgLy9jb250YWlucyByZXN1bHRpbmcgZWxlbWVudChzKSBmcm9tIGdldCgpXG5cbiAgICBpZiAoZmFtaWx5KXtcbiAgICAgICAgdGhpc1RhcmdldCA9IGdldEZhbWlseShzZWxlY3RvciwgZmFtaWx5KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGlmKCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChzZWxlY3RvcikgKXtcbiAgICAgICAgICAgIHRoaXNUYXJnZXQgPSAgZ2V0QnlJZChzZWxlY3Rvcik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoc2VsZWN0b3IpICl7XG4gICAgICAgICAgICB0aGlzVGFyZ2V0ID0gIGdldEJ5Q2xhc3Moc2VsZWN0b3IpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICB0aGlzVGFyZ2V0ID0gZ2V0QnlTZWxlY3RvcihzZWxlY3Rvcik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy9jb25zb2xlLmxvZyhcImdldCgpIGNhbGxlZCBvbjogXCIgKyBzZWxlY3RvciArIFwiIHJldHVybmVkOiBcIiArIHRoaXNUYXJnZXQpO1xuICAgIHJldHVybiB0aGlzVGFyZ2V0O1xufVxuXG4gICAgZnVuY3Rpb24gZ2V0QnlJZChpZCl7XG4gICAgICAgIHZhciB0aGlzVGFyZ2V0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xuICAgICAgICByZXR1cm4gdGhpc1RhcmdldDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRCeUNsYXNzKGNsYXNzTmFtZSl7XG4gICAgICAgIHZhciB0aGlzVGFyZ2V0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShjbGFzc05hbWUpO1xuICAgICAgICByZXR1cm4gdGhpc1RhcmdldDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRCeVNlbGVjdG9yKHNlbGVjdG9yKXtcbiAgICAgICAgdmFyIHRoaXNUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHRoaXNTZWxlY3Rvcik7XG4gICAgICAgIHJldHVybiB0aGlzVGFyZ2V0O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldEZhbWlseShlbGVtZW50LCBmYW1pbHkpe1xuICAgICAgICB2YXIgdGhpc0ZhbWlseTtcbiAgICAgICAgc3dpdGNoIChmYW1pbHkpe1xuICAgICAgICAgICAgY2FzZSBcInByZXZcIjpcbiAgICAgICAgICAgICAgICB0aGlzRmFtaWx5ID0gZ2V0UHJldihlbGVtZW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJuZXh0XCI6XG4gICAgICAgICAgICAgICAgdGhpc0ZhbWlseSA9IGdldE5leHQoZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwicGFyZW50XCI6XG4gICAgICAgICAgICAgICAgdGhpc0ZhbWlseSA9IGdldFBhcmVudChlbGVtZW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIC8qIEZJWDogQWRkIGNoaWxkIGFuZCBjaGlsZHJlblxuICAgICAgICAgICAgY2FzZSBcImNoaWxkXCI6XG4gICAgICAgICAgICAgICAgdmFyIHRoaXNUYXJnZXQgPSBnZXROZXh0KGVsZW1lbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImNoaWxkcmVuXCI6XG4gICAgICAgICAgICAgICAgdmFyIHRoaXNUYXJnZXQgPSBnZXROZXh0KGVsZW1lbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgKi9cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpc0ZhbWlseTtcbiAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gZ2V0UHJldihlbGVtZW50KXtcbiAgICAgICAgICAgIHZhciB0aGlzU2libGluZyA9IGVsZW1lbnQucHJldmlvdXNFbGVtZW50U2libGluZztcbiAgICAgICAgICAgIHJldHVybiB0aGlzU2libGluZztcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGdldE5leHQoZWxlbWVudCl7XG4gICAgICAgICAgICB2YXIgdGhpc1NpYmxpbmcgPSBlbGVtZW50Lm5leHRFbGVtZW50U2libGluZztcbiAgICAgICAgICAgIHJldHVybiB0aGlzU2libGluZztcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGdldFBhcmVudChlbGVtZW50KXtcbiAgICAgICAgICAgIHZhciB0aGlzUGFyZW50ID0gZWxlbWVudC5wYXJlbnRFbGVtZW50O1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcImdldFBhcmVudCAtIFwiICsgZWxlbWVudC5pZCArIFwiIC0gXCIgKyB0aGlzUGFyZW50KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzUGFyZW50O1xuICAgICAgICB9XG5cbmZ1bmN0aW9uIGdldFN0eWxlKGVsZW1lbnQsIHByb3BlcnR5KXtcbiAgICB2YXIgdGhpc1N0eWxlID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWxlbWVudCkuZ2V0UHJvcGVydHlWYWx1ZShwcm9wZXJ0eSk7XG4gICAgcmV0dXJuIHRoaXNTdHlsZTtcbn1cblxuZnVuY3Rpb24gc2V0U3R5bGUoZWxlbWVudCwgc3R5bGVzKXtcbiAgICB2YXIgcHJvcGVydHksIHZhbHVlO1xuICAgIGZvciAoIHByb3BlcnR5IGluIHN0eWxlcyApIHtcbiAgICAgICAgdmFsdWUgPSBzdHlsZXNbcHJvcGVydHldO1xuICAgICAgICBlbGVtZW50LnN0eWxlW3Byb3BlcnR5XSA9IHZhbHVlO1xuICAgIH1cbn1cblxuLy9GSVg6IGNoZWNrIGZvciBvdGhlciBzdHJpbmcgdmFsdWVzXG5mdW5jdGlvbiB0b1BpeCh0aGlzVmFsdWUpe1xuICAgIGlmKHRoaXNWYWx1ZSl7XG4gICAgICAgIGlmICggdHlwZW9mKHRoaXNWYWx1ZSkgPT09IFwic3RyaW5nXCIgKXtcbiAgICAgICAgICAgIC8vcGFyc2UgdG8gYmFzZSAxMCArIGFsc28gcmVtb3ZpbmcgdHJhaWxpbmcgXCJweFwiXG4gICAgICAgICAgICB0aGlzVmFsdWUgPSBwYXJzZUludCh0aGlzVmFsdWUsIDEwKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvL3RoaXMgaXMgdW5kZWZpbmVkLCBudWxsLCAnJyAoZW1wdHkgc3RyaW5nKSwgMCBvciBOYU5cbiAgICBlbHNle1xuICAgICAgICB0aGlzVmFsdWUgPSAwO1xuICAgIH1cblxuICAgIHRoaXNWYWx1ZSA9IHRoaXNWYWx1ZSArPSBcInB4XCI7XG4gICAgcmV0dXJuIHRoaXNWYWx1ZTtcbn1cblxuZnVuY3Rpb24gdG9JbnQodGhpc1ZhbHVlKXsgLy9jaGVjayBmb3IgJ25vbmUnLCAnaW5oZXJpdCcgZXRjLlxuICAgIC8vY2hlY2sgZm9yIHZhbGlkIHZhbHVlXG4gICAgaWYodGhpc1ZhbHVlKXtcbiAgICAgICAgaWYgKCB0eXBlb2YodGhpc1ZhbHVlKSA9PT0gXCJzdHJpbmdcIiApe1xuICAgICAgICAgICAgLy9wYXJzZSB0byBiYXNlIDEwICsgYWxzbyByZW1vdmluZyB0cmFpbGluZyBcInB4XCJcbiAgICAgICAgICAgIHRoaXNWYWx1ZSA9IHBhcnNlSW50KHRoaXNWYWx1ZSwgMTApO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vdGhpcyBpcyB1bmRlZmluZWQsIG51bGwsICcnIChlbXB0eSBzdHJpbmcpLCAwIG9yIE5hTlxuICAgIGVsc2V7XG4gICAgICAgIHRoaXNWYWx1ZSA9IDA7XG4gICAgfVxuICAgIHJldHVybiB0aGlzVmFsdWU7XG59XG5cbmZ1bmN0aW9uIGFkZENsYXNzKGVsZW1lbnQsIHRoaXNDbGFzcyl7XG4gICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKHRoaXNDbGFzcyk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZUNsYXNzKGVsZW1lbnQsIHRoaXNDbGFzcyl7XG4gICAgZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKHRoaXNDbGFzcyk7XG59XG5cbmZ1bmN0aW9uIHRvZ2dsZUNsYXNzKGVsZW1lbnQsIHRoaXNDbGFzcyl7XG4gICAgZWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKHRoaXNDbGFzcyk7XG59XG5cbmZ1bmN0aW9uIGhhc0NsYXNzKGVsZW1lbnQsIHRoaXNDbGFzcyl7XG4gICAgdmFyIGhhc0NsYXNzID0gZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnModGhpc0NsYXNzKTtcbiAgICByZXR1cm4gaGFzQ2xhc3M7XG59XG5cbmZ1bmN0aW9uIGdldFNjcm9sbFZhbHVlKGVsZW1lbnQpe1xuICAgIGlmIChlbGVtZW50KXtcbiAgICAgICAgdmFyIHRoaXNFbGVtZW50ID0gZ2V0KGVsZW1lbnQpO1xuICAgICAgICB2YXIgdGhpc1Njcm9sbFRvcCA9IHRoaXNFbGVtZW50LnNjcm9sbFk7XG4gICAgICAgIC8vY29uc29sZS5sb2codGhpc1Njcm9sbFRvcCk7XG4gICAgICAgIHJldHVybiB0aGlzU2Nyb2xsVG9wO1xuICAgIH1cbiAgICBlbHNle1xuICAgICAgICB2YXIgd2luZG93U2Nyb2xsVG9wID0gd2luZG93LnNjcm9sbFk7XG4gICAgICAgIHJldHVybiB3aW5kb3dTY3JvbGxUb3A7XG4gICAgfVxufVxuXG4vL2dldCBhdHRyaWJ1dGUgLSBpZS4gaHJlZiwgY2xhc3MsIGNoYXJzZXQgZXRjLlxuZnVuY3Rpb24gZ2V0QXR0cmlidXRlKHRoaXNUYXJnZXQsIHRoaXNBdHRyaWJ1dGUpe1xuICAgIHRoaXNUYXJnZXQgPSBnZXQodGhpc1RhcmdldCk7XG4gICAgdmFyIHRoaXNWYWx1ZSA9IHRoaXNUYXJnZXQuZ2V0QXR0cmlidXRlKHRoaXNBdHRyaWJ1dGUpO1xuICAgIHJldHVybiB0aGlzVmFsdWU7XG59XG4iLCIndXNlIHN0cmljdCc7XG4vKmpzaGludCAtVzExNyAqL1xuXG5mdW5jdGlvbiBqc29uVG9Kcyh0aGlzSnNvbil7XG4gICAgcmV0dXJuIEpTT04ucGFyc2UodGhpc0pzb24pO1xufVxuXG5mdW5jdGlvbiBqc1RvSnNvbih0aGlzSnNPYmplY3Qpe1xuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh0aGlzSnNPYmplY3QpO1xufVxuIiwiLy9TdHJpbmcgTWFuaXB1bGF0aW9uXG5mdW5jdGlvbiBnZXRDaGFyQXQodGhpc1RhcmdldCwgdGhpc1Bvc2l0aW9uKXtcbiAgICByZXR1cm4gdGhpc1RhcmdldC5jaGFyQXQodGhpc1Bvc2l0aW9uKTtcbn1cblxuZnVuY3Rpb24gZ2V0Q2hhckluZGV4KHRoaXNUYXJnZXQsIHRoaXNDaGFyYWN0ZXIpe1xuICAgIHJldHVybiB0aGlzVGFyZ2V0LmluZGV4T2YodGhpc0NoYXJhY3Rlcik7XG59XG5cbmZ1bmN0aW9uIHRyaW1UaGlzKHRoaXNUYXJnZXQpe1xuICAgIHJldHVybiB0aGlzVGFyZ2V0LnRyaW0oKTtcbn0iLCJmdW5jdGlvbiBzdHlsZXMoZWxlbWVudCwgc3R5bGVzICkge1xuICAgIGlmKHN0eWxlcyl7XG4gICAgICAgIHNldFN0eWxlKGVsZW1lbnQsIHN0eWxlcyk7XG4gICAgfVxuICAgIGVsc2V7XG4gICAgICAgIGdldFN0eWxlKGVsZW1lbnQpO1xuICAgIH19XG5cbiAgICBmdW5jdGlvbiBnZXRTdHlsZShlbGVtZW50LCBwcm9wZXJ0eSl7XG4gICAgICAgIHZhciB0aGlzU3R5bGUgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KS5nZXRQcm9wZXJ0eVZhbHVlKHByb3BlcnR5KTtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcImdldFN0eWxlcygpIC0gXCIgKyBwcm9wZXJ5ICsgXCIgZm9yOiBcIiArIGVsZW1lbnQuaWQgKyBcIiByZXR1cm5lZDogXCIgKyB0aGlzU3R5bGUpO1xuICAgICAgICByZXR1cm4gdGhpc1N0eWxlO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldFN0eWxlKGVsZW1lbnQsIHN0eWxlcyl7XG4gICAgICAgIHZhciBwcm9wZXJ0eSwgdmFsdWU7XG4gICAgICAgIGZvciAoIHByb3BlcnR5IGluIHN0eWxlcyApIHtcbiAgICAgICAgICAgIHZhbHVlID0gc3R5bGVzW3Byb3BlcnR5XTtcbiAgICAgICAgICAgIGVsZW1lbnQuc3R5bGVbcHJvcGVydHldID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgfVxuIiwialF1ZXJ5KCcjd2luZG93U2l6ZScpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgIGpRdWVyeSgnI3dpbmRvd1NpemUnKS5mYWRlT3V0KCdtZWRpdW0nKTtcbn0pO1xuXG5mdW5jdGlvbiB0ZXN0UGFuZWwoKSB7XG4gICAgalF1ZXJ5KCcjd2luZG93U2l6ZScpLmNzcygnZGlzcGxheScsJ2Jsb2NrJyk7XG4gICAgalF1ZXJ5KCcjd2luZG93U2l6ZScpLmVtcHR5KCk7XG5cbiAgICBqUXVlcnkoJyN3aW5kb3dTaXplJykuYXBwZW5kKFwiPGRpdj5XOiBcIiAgICAgKyB2aWV3V2lkdGggICAgICsgXCJweCA8L2Rpdj5cIik7XG4gICAgalF1ZXJ5KCcjd2luZG93U2l6ZScpLmFwcGVuZChcIjxkaXY+SDogXCIgICAgICsgdmlld0hlaWdodCAgICArIFwicHggPC9kaXY+XCIpO1xuICAgIGpRdWVyeSgnI3dpbmRvd1NpemUnKS5hcHBlbmQoXCI8ZGl2PlwiICAgICAgICArIGFzcFRleHQgICAgICAgKyBcIjwvZGl2PlwiKTtcbiAgICBqUXVlcnkoJyN3aW5kb3dTaXplJykuYXBwZW5kKFwiPGRpdj5CcDogXCIgICAgKyBicmVha1BvaW50ICAgICsgXCI8L2Rpdj5cIik7XG4gICAgalF1ZXJ5KCcjd2luZG93U2l6ZScpLmFwcGVuZChcIjxkaXY+RGV2aWNlOlwiICsgZGV2aWNlVHlwZSAgICArIFwiPC9kaXY+XCIpO1xuXG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICBqUXVlcnkoXCIjd2luZG93U2l6ZVwiKS5mYWRlT3V0KDQwMCk7XG4gICAgfSwgMzUwMCk7XG59XG4iLCJqUXVlcnkoJy5zY3JvbGxNZW51ICNoZWFkZXInKS5hZGRDbGFzcygnc2Nyb2xsZWQnKVxuIiwiZnVuY3Rpb24gbmV3U3dpcGVUaHVtYnModGFyZ2V0LCBzbGlkZVNwZWVkKXtcbiAgICB3aW5kb3dbdGFyZ2V0XSA9IG5ldyBTd2lwZShkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0YXJnZXQpLCB7XG4gICAgICAgIHN0YXJ0U2xpZGU6IDAsXG4gICAgICAgIHNwZWVkOiAxMDAwLFxuICAgICAgICBhdXRvOiA0MDAwLFxuICAgICAgICBjb250aW51b3VzOiB0cnVlLFxuICAgICAgICBmYWRlOiB7IGNyb3NzRmFkZTogdHJ1ZSB9LFxuICAgICAgICB2aXJ0dWFsVHJhbnNsYXRlOiB0cnVlLFxuICAgICAgICBlZmZlY3Q6ICdmYWRlJ1xuICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gdGh1bWJDbGljaygpIHtcbiAgICAgICAgLy9jb25zb2xlLmxvZygndGh1bWJDbGlja2VkJyk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgdGh1bWJJbmRleCA9IGpRdWVyeSgnLnN3aXBlLXRodW1iJykuaW5kZXgoIHRoaXMgKTtcbiAgICAgICAgLy9jb25zb2xlLmxvZygndGh1bWJDbGlja2VkIC0gdGhpczogJyArIHRodW1iSW5kZXgpO1xuXG4gICAgICAgIHdpbmRvd1t0YXJnZXRdLnNsaWRlKHRodW1iSW5kZXgpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgdmFyIHRodW1ic0NvbnRhaW5lciA9IGpRdWVyeSgnLnN3aXBlLXRodW1icy13cmFwJyk7XG5cbiAgICAvL0dldCB0aGUgdGh1bWJuYWlsc1xuICAgIHZhciB0aHVtYnMgPSB0aHVtYnNDb250YWluZXIuZmluZCgnLnN3aXBlLXRodW1iJyk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aHVtYnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdGh1bWJzW2ldLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGh1bWJDbGljayk7XG4gICAgfVxuXG4gICAgdmFyIG5leHRDb250cm9sID0galF1ZXJ5KCcuc2xpZGVyQ29udHJvbHMgLm5leHQtc2xpZGUnKTtcbiAgICBuZXh0Q29udHJvbC5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ25leHRDb250cm9sIGNsaWNrZWQnKTtcbiAgICAgICAgd2luZG93W3RhcmdldF0ubmV4dCgpO1xuICAgIH0pO1xuXG4gICAgdmFyIHByZXZDb250cm9sID0galF1ZXJ5KCcuc2xpZGVyQ29udHJvbHMgLnByZXYtc2xpZGUnKTtcbiAgICBwcmV2Q29udHJvbC5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ3ByZXZDb250cm9sIGNsaWNrZWQnKTtcbiAgICAgICAgd2luZG93W3RhcmdldF0ucHJldigpO1xuICAgIH0pO1xuXG4gICAgLy9hZnRlciB0aGUgZ2FsbGVyeSBpcyByZWFkeSwgc2V0IHRoZSBkaW1lbnNpb25zXG4gICAgc2V0RGltZW5zaW9ucyhkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0YXJnZXQpKTtcbn1cblxuZnVuY3Rpb24gbmV3U3dpcGVCYXNpYyh0YXJnZXQsIHNsaWRlU3BlZWQpe1xuICAgIHdpbmRvd1t0YXJnZXRdID0gbmV3IFN3aXBlKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRhcmdldCksIHtcbiAgICAgICAgICAgIHN0YXJ0U2xpZGU6IDAsXG4gICAgICAgICAgICBzcGVlZDogODAwLFxuICAgICAgICAgICAgYXV0bzogc2xpZGVTcGVlZCxcbiAgICAgICAgICAgIGNvbnRpbnVvdXM6IHRydWUsXG4gICAgICAgICAgICBmYWRlOiB7IGNyb3NzRmFkZTogdHJ1ZSB9LFxuICAgICAgICAgICAgdmlydHVhbFRyYW5zbGF0ZTogdHJ1ZSxcbiAgICAgICAgICAgIGVmZmVjdDogJ2ZhZGUnXG4gICAgfSk7XG5cbiAgICB2YXIgbmV4dENvbnRyb2wgPSBqUXVlcnkoJy5zbGlkZXJDb250cm9scyAubmV4dC1zbGlkZScpO1xuICAgIG5leHRDb250cm9sLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICBjb25zb2xlLmxvZygnbmV4dENvbnRyb2wgY2xpY2tlZCcpO1xuICAgICAgICB3aW5kb3dbdGFyZ2V0XS5uZXh0KCk7XG4gICAgfSk7XG5cbiAgICB2YXIgcHJldkNvbnRyb2wgPSBqUXVlcnkoJy5zbGlkZXJDb250cm9scyAucHJldi1zbGlkZScpO1xuICAgIHByZXZDb250cm9sLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICBjb25zb2xlLmxvZygncHJldkNvbnRyb2wgY2xpY2tlZCcpO1xuICAgICAgICB3aW5kb3dbdGFyZ2V0XS5wcmV2KCk7XG4gICAgfSk7XG5cbiAgICBzZXREaW1lbnNpb25zKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRhcmdldCkpO1xuICAgIGNvbnNvbGUubG9nKFwibmV3U3dpcGVCYXNpYzogXCIgKyB3aW5kb3dbdGFyZ2V0XSk7XG5cbn1cbiIsIi8qKlxuICogT3BlbiAmJiBDbG9zZSBTbGlkZSBQYW5lbHNcbiAqXG4gKiBGSVg6IEFkZCBjb21tZW50c1xuICovXG5cbmZ1bmN0aW9uIG9wZW5TbGlkZXIoc2xpZGVQYW5lbCwgc2xpZGVEaXJlY3Rpb24pe1xuICAgIHNsaWRlRGlyZWN0aW9uID0gc2xpZGVEaXJlY3Rpb24gPyBzbGlkZURpcmVjdGlvbiA6IFwibGVmdFwiO1xuXG4gICAgdmFyIHNsaWRlRGlzdGFuY2UgPSBzbGlkZVBhbmVsLndpZHRoKCk7XG4gICAgaWYoc2xpZGVEaXJlY3Rpb24gPT09IFwicmlnaHRcIil7XG4gICAgICAgIHNsaWRlRGlzdGFuY2UgPSBzbGlkZURpc3RhbmNlICogKC0xKTtcbiAgICB9XG5cbiAgICB2YXIgZnJpZW5kcyA9IHNsaWRlUGFuZWwuZGF0YSgnYWxzby1zbGlkZScpLnNwbGl0KFwiIFwiKTtcbiAgICBqUXVlcnkuZWFjaCggZnJpZW5kcywgZnVuY3Rpb24oIGluZGV4LCBmcmllbmQgKSB7XG4gICAgICAgIGpRdWVyeShmcmllbmQpLmFuaW1hdGUoe1wibGVmdFwiIDogc2xpZGVEaXN0YW5jZX0sIDM1MCk7XG4gICAgfSk7XG5cbiAgICB2YXIgc2xpZGVyQW5pbWF0aW9uID0ge307XG4gICAgc2xpZGVyQW5pbWF0aW9uW3NsaWRlRGlyZWN0aW9uXSA9IDA7XG4gICAgc2xpZGVQYW5lbC5hbmltYXRlKHNsaWRlckFuaW1hdGlvbiwgMzUwKTtcbn1cblxuZnVuY3Rpb24gY2xvc2VTbGlkZXIoc2xpZGVQYW5lbCwgc2xpZGVEaXJlY3Rpb24pe1xuICAgIHNsaWRlRGlyZWN0aW9uID0gc2xpZGVEaXJlY3Rpb24gPyBzbGlkZURpcmVjdGlvbiA6IFwibGVmdFwiO1xuXG4gICAgdmFyIHNsaWRlRGlzdGFuY2UgPSBzbGlkZVBhbmVsLndpZHRoKCk7XG4gICAgaWYoc2xpZGVEaXJlY3Rpb24gPT09IFwicmlnaHRcIil7XG4gICAgICAgIHNsaWRlRGlzdGFuY2UgPSBzbGlkZURpc3RhbmNlICogKC0xKTtcbiAgICB9XG5cbiAgICB2YXIgZnJpZW5kcyA9IHNsaWRlUGFuZWwuZGF0YSgnYWxzby1zbGlkZScpLnNwbGl0KFwiIFwiKTtcbiAgICBqUXVlcnkuZWFjaCggZnJpZW5kcywgZnVuY3Rpb24oIGluZGV4LCBmcmllbmQgKSB7XG4gICAgICAgIGpRdWVyeShmcmllbmQpLmFuaW1hdGUoe1wibGVmdFwiIDogMCB9LCAzNTApO1xuICAgIH0pO1xuXG4gICAgaWYoc2xpZGVEaXJlY3Rpb24gPT09IFwicmlnaHRcIil7XG4gICAgICAgIHNsaWRlUGFuZWwuYW5pbWF0ZSh7XCJyaWdodFwiIDogc2xpZGVEaXN0YW5jZX0sIDM1MCk7XG4gICAgfWVsc2V7XG4gICAgICAgIHNsaWRlRGlzdGFuY2UgPSBzbGlkZURpc3RhbmNlICogKC0xKTtcbiAgICAgICAgc2xpZGVQYW5lbC5hbmltYXRlKHtcImxlZnRcIiA6IHNsaWRlRGlzdGFuY2V9LCAzNTApO1xuICAgIH1cbn1cbiIsImZ1bmN0aW9uIG1vdmVUaHVtYnNDb250YWluZXIoKXtcbiAgICAvL3Jlc2V0IGZ1bmN0aW9uIHNwZWNpZmljIHN0eWxlc1xuICAgIGpRdWVyeSgnLnN3aXBlLXRodW1iJykuY3NzKCdtYXgtd2lkdGgnLCBcIlwiKTtcbiAgICBqUXVlcnkoJy5zd2lwZS10aHVtYicpLmNzcygnbWF4LWhlaWdodCcsIFwiXCIpO1xuICAgIGpRdWVyeSgnLmhvclNjcm9sbENvbnRlbnQnKS5yZW1vdmVBdHRyKCdzdHlsZScpO1xuICAgIGpRdWVyeSgnLnN3aXBlLXRodW1icy13cmFwJykucmVtb3ZlQXR0cignc3R5bGUnKTtcblxuICAgIGdhbGxlcnlIZWlnaHQgPSBqUXVlcnkoJy5pbWFnZS1nYWxsZXJ5JykuaGVpZ2h0KCk7XG4gICAgZ2FsbGVyeVdpZHRoID0galF1ZXJ5KCcuaW1hZ2UtZ2FsbGVyeScpLndpZHRoKCk7XG5cbiAgICB0aHVtYnNDb3VudCA9ICBqUXVlcnkoJy5zd2lwZS10aHVtYicpLmxlbmd0aDtcbiAgICBjb25zb2xlLmxvZyhcInRodW1ic0NvdW50OiBcIiArIHRodW1ic0NvdW50KTtcblxuICAgIHRodW1iV2lkdGggPSBqUXVlcnkoJy5zd2lwZS10aHVtYicpLndpZHRoKCk7XG4gICAgY29uc29sZS5sb2coXCJlYWNoVGh1bWJXaWR0aDogXCIgKyB0aHVtYldpZHRoKTtcblxuICAgIHRodW1ic1dyYXBXaWR0aCA9IHRodW1ic0NvdW50ICogdGh1bWJXaWR0aDtcblxuICAgIC8vQVBQRU5EIFRIVU1CUyBPTiBMQU5EU0NBUEVcbiAgICBpZiggZ2FsbGVyeUhlaWdodCA+PSB2aWV3SGVpZ2h0IC0gdGh1bWJXaWR0aCApe1xuICAgICAgICAvL2lmIChqUXVlcnkod2luZG93KS53aWR0aCgpID4gdGFibGV0TGFuZHNjYXBlKXtcbiAgICAgICAgICAgIGlmKCBqUXVlcnkoaHRtbCkuaGFzQ2xhc3MoJ2xhbmRzY2FwZScpICl7XG4gICAgICAgICAgICAgICAgalF1ZXJ5KCcuc3dpcGUtdGh1bWJzLXdyYXAnKS5hcHBlbmRUbygnLnN3aXBlJyk7XG4gICAgICAgICAgICAgICAgalF1ZXJ5KCcuc3dpcGUtdGh1bWJzLXdyYXAnKS5jc3MoJ3Bvc2l0aW9uJywgJ2Fic29sdXRlJyk7XG4gICAgICAgICAgICAgICAgalF1ZXJ5KCcuc3dpcGUtdGh1bWJzLXdyYXAnKS5jc3MoJ2JvdHRvbScsIDApO1xuICAgICAgICAgICAgfVxuICAgICAgICAvL31cbiAgICB9XG4gICAgZWxzZXtcbiAgICAgICAgalF1ZXJ5KCcuc3dpcGUtdGh1bWJzLXdyYXAnKS5pbnNlcnRBZnRlcignLnN3aXBlJyk7XG4gICAgICAgIGpRdWVyeSgnLnN3aXBlLXRodW1icy13cmFwJykuY3NzKCdwb3NpdGlvbicsICdzdGF0aWMnKTtcbiAgICAgICAgalF1ZXJ5KCcuc3dpcGUtdGh1bWJzLXdyYXAnKS5jc3MoJ2JvdHRvbScsIFwiYXV0b1wiKTtcbiAgICB9XG5cbiAgICAvL0NFTlRFUiBUSFVNQlMgQ09OVEFJTkVSXG4gICAgY29uc29sZS5sb2coXCJ0aHVtYnNXcmFwV2lkdGg6IFwiICsgdGh1bWJzV3JhcFdpZHRoKTtcbiAgICBjb25zb2xlLmxvZyhcImdhbGxlcldpZHRoOiBcIiArIGdhbGxlcnlXaWR0aCk7XG5cbiAgICBpZiAodGh1bWJzV3JhcFdpZHRoIDwgZ2FsbGVyeVdpZHRoKXtcbiAgICAgICAgdGh1bWJzV3JhcE1hcmdpbiA9IChnYWxsZXJ5V2lkdGggLSB0aHVtYnNXcmFwV2lkdGgpIC8gMjtcbiAgICAgICAgalF1ZXJ5KCcuc3dpcGUtdGh1bWJzLXdyYXAnKS5jc3MoJ21hcmdpbi1sZWZ0JywgdGh1bWJzV3JhcE1hcmdpbik7XG4gICAgfVxuXG4gICAgaWYgKHRodW1ic1dyYXBXaWR0aCA+IGdhbGxlcnlXaWR0aCl7XG4gICAgICAgIGpRdWVyeSgnLnN3aXBlLXRodW1icy13cmFwJykuYWRkQ2xhc3MoJ2hvclNjcm9sbFdyYXAnKTtcbiAgICAgICAgalF1ZXJ5KCcuaG9yU2Nyb2xsQ29udGVudCcpLndpZHRoKHRodW1ic1dyYXBXaWR0aCk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwidGh1bWJzIGJpZ2dlclwiKTtcbiAgICAgICAgLy90aHVtYk1heFdpZHRoID0gZ2FsbGVyeVdpZHRoIC8gdGh1bWJzQ291bnQ7XG4gICAgICAgIC8valF1ZXJ5KCcuc3dpcGUtdGh1bWInKS5jc3MoJ21heC13aWR0aCcsIHRodW1iTWF4V2lkdGgpO1xuICAgICAgICAvL2pRdWVyeSgnLnN3aXBlLXRodW1iJykuY3NzKCdtYXgtaGVpZ2h0JywgdGh1bWJNYXhXaWR0aCk7XG4gICAgICAgIC8valF1ZXJ5KCcuc3dpcGUtdGh1bWJzLWNvbnRhaW5lcicpLmNzcygnbWF4LWhlaWdodCcsIHRodW1iTWF4V2lkdGgpO1xuICAgIH1cbn1cbiIsIi8vcmV0dXJucyB0aGUgY2FsbGVyIGZ1bmN0aW9uIG5hbWVcbi8qXG4gICAgdmFyIGNhbGxlck5hbWU7XG4gICAgdHJ5IHsgdGhyb3cgbmV3IEVycm9yKCk7IH1cbiAgICBjYXRjaCAoZSkge1xuICAgICAgICB2YXIgcmUgPSAvKFxcdyspQHxhdCAoXFx3KykgXFwoL2csIHN0ID0gZS5zdGFjaywgbTtcbiAgICAgICAgcmUuZXhlYyhzdCksIG0gPSByZS5leGVjKHN0KTtcbiAgICAgICAgY2FsbGVyTmFtZSA9IG1bMV0gfHwgbVsyXTtcbiAgICB9XG4gICAgY29uc29sZS5sb2coXCJmdW5jdGlvbigpIGNhbGxlZCBieTogXCIgKyBjYWxsZXJOYW1lKTtcbiovXG5cbi8vIEpTT04uc3RyaW5naWZ5KCkgdHVybnMgYSBKYXZhc2NyaXB0IG9iamVjdCBpbnRvIEpTT04gdGV4dCBhbmQgc3RvcmVzIHRoYXQgSlNPTiB0ZXh0IGluIGEgc3RyaW5nLlxuLy8gSlNPTi5wYXJzZSgpIHR1cm5zIGEgc3RyaW5nIG9mIEpTT04gdGV4dCBpbnRvIGEgSmF2YXNjcmlwdCBvYmplY3QuXG5cblxuZnVuY3Rpb24gZHVtcENvbXB1dGVkU3R5bGVzKGVsZW0scHJvcCkge1xuXG4gIHZhciBjcyA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsZW0sbnVsbCk7XG4gIGlmIChwcm9wKSB7XG4gICAgY29uc29sZS5sb2cocHJvcCtcIiA6IFwiK2NzLmdldFByb3BlcnR5VmFsdWUocHJvcCkpO1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgbGVuID0gY3MubGVuZ3RoO1xuICBmb3IgKHZhciBpPTA7aTxsZW47aSsrKSB7XG5cbiAgICB2YXIgc3R5bGUgPSBjc1tpXTtcbiAgICBjb25zb2xlLmxvZyhzdHlsZStcIiA6IFwiK2NzLmdldFByb3BlcnR5VmFsdWUoc3R5bGUpKTtcbiAgfVxuXG59XG4iLCJmdW5jdGlvbiBhcHBseUlzbygpe1xuICAgIHZhciBwcm9qZWN0c0lzbyA9IGpRdWVyeSgnLmlzby1ncmlkJykuaXNvdG9wZSh7XG4gICAgICAgIGl0ZW1TZWxlY3RvcjogJy5pc28tZ3JpZC1pdGVtJyxcbiAgICAgICAgcmVzaXphYmxlOiBmYWxzZSwgLy8gZGlzYWJsZSBub3JtYWwgcmVzaXppbmdcbiAgICAgICAgcGVyY2VudFBvc2l0aW9uOiB0cnVlLFxuICAgICAgICBhbmltYXRpb25FbmdpbmU6ICdiZXN0LWF2YWlsYWJsZScsXG4gICAgICAgIGFuaW1hdGlvbk9wdGlvbnM6IHtcbiAgICAgICAgICAgIGR1cmF0aW9uOiAzMDAwLFxuICAgICAgICAgICAgZWFzaW5nOiAnbGluZWFyJyxcbiAgICAgICAgICAgIHF1ZXVlOiBmYWxzZVxuICAgICAgICB9LFxuICAgICAgICBsYXlvdXRNb2RlOiAnZml0Um93cycsXG4gICAgICAgIG1hc29ucnk6e1xuICAgICAgICAgICAgY29sdW1uV2lkdGg6ICAgICdpc28tZ3JpZC1pdGVtJyxcbiAgICAgICAgICAgIGlzQW5pbWF0ZWQ6ICAgICB0cnVlXG4gICAgICAgICAgICAvL2lzRml0V2lkdGg6ICAgdHJ1ZVxuICAgICAgICB9XG4gICAgfSk7XG59XG4iLCIvKipcbiAqIGdldEJyZWFrcG9pbnQoKVxuICpcbiAqIERldGVybWluZXMgc3RyaW5nIHZhbHVlIG9mIGJyZWFrcG9pbnQgYmFzZWQgb24gdGhlIGN1cnJlbnQgdmlld3BvcnQgc2l6ZS5cbiAqXG4gKiBAZ2xvYmFsIHZpZXdXaWR0aCAoaW50KSBpcyBjYWxjdWxhdGVkIG9uIGRvYy5yZWFkeSBhbmQgZWFjaCBkb2MucmVzaXplXG4gKlxuICogQGdsb2JhbCBtb2JpbGVQb3J0cmFpdCAoaW50KSxcbiAqIEBnbG9iYWwgbW9iaWxlTGFuZHNjYXBlIChpbnQpLFxuICogQGdsb2JhbCB0YWJsZXRMYW5kc2NhcGUgKGludCkgc2V0dGluZ3MgYXJlIGRlZmluZWQgaW4gdmVsY3JvL2NvcmVGcmFtZXdvcmsuanNcbiAqXG4gKiBAcmV0dXJuIHRoaXNCcmVha3BvaW50IChzdHJpbmcpXG4gKi9cblxuZnVuY3Rpb24gZ2V0QnJlYWtwb2ludChzbWFsbEJwLCBsYXJnZUJwKXtcbiAgICB2YXIgdGhpc0JwTGFiZWw7XG4gICAgaWYoIHZpZXdXaWR0aCA8PSBzbWFsbEJwICl7XG4gICAgICAgIHRoaXNCcExhYmVsID0gXCJzbWFsbFwiO1xuICAgIH1cbiAgICBlbHNlIGlmICggdmlld1dpZHRoID4gc21hbGxCcCAmJiB2aWV3V2lkdGggPCBsYXJnZUJwICl7XG4gICAgICAgIHRoaXNCcExhYmVsID0gXCJtZWRpdW1cIjtcbiAgICB9XG4gICAgZWxzZXtcbiAgICAgICAgdGhpc0JwTGFiZWwgPSBcImxhcmdlXCI7XG4gICAgfVxuICAgIC8vY29uc29sZS5sb2coXCJCcmVha3BvaW50OiBcIiArIHRoaXNCcExhYmVsKTtcbiAgICByZXR1cm4gdGhpc0JwTGFiZWw7XG59XG4iLCIvKipcbiAqIGZpbHRlckJ5Vmlld3BvcnQoYWxsVmlld3BvcnRzQ29udGVudCwgZmlyc3RCcmVhaywgc2Vjb25kQnJlYWspO1xuICpcbiAqIEZpbHRlcnMgYWxsIGF2YWlsYWJsZSBjb250ZW50IGJ5IGN1cnJlbnQgdmlld3BvcnQgc2l6ZS4gIFJldHVybnMgbWVkaXVtLCBsYXJnZSBvciB4bGFyZ2UgYXJyYXkuXG4gKlxuICogQGFsbFZpZXdwb3J0c0NvbnRlbnQgKGFycmF5KSBzdHJ1Y3R1cmVkIGJ5IHNpemU6XG4gICAgKiAgYWxsVmlld3BvcnRzQ29udGVudFswXTogc21hbGwgb3IgdGh1bWJuYWlsIHNwZWNpZmljIGNvbnRlbnRcbiAgICAqICBhbGxWaWV3cG9ydHNDb250ZW50WzFdOiBtZWRpdW0gc3BlY2lmaWMgY29udGVudFxuICAgICogIGFsbFZpZXdwb3J0c0NvbnRlbnRbMl06IGxhcmdlIHNwZWNpZmljIGNvbnRlbnRcbiAgICAqICBhbGxWaWV3cG9ydHNDb250ZW50WzNdOiB4bGFyZ2Ugc3BlY2lmaWMgY29udGVudFxuICAgICpcbiogQGZpcnN0QnJlYWsgKGludCksXG4qIEBzZWNvbmRCcmVhayAoaW50KSBzZXQgaW4gL3ZlbGNyby9jb3JlRnJhbWV3b3JrLmpzXG4qXG4qIEB0aGlzVmlld3BvcnRTaXplIGNvbnNpZGVyZWQgdGhlIGxhcmdlciBvZiB2aWV3SGVpZ2h0IG9yIHZpZXdXaWR0aCwgYXMgdGhlIHVzZXIgbWF5IHR1cm4gdGhlIGRldmljZS5cbipcbiogQHJldHVybiB0aGlzVmlld3BvcnRDb250ZW50IChhcnJheSlcbipcbiovXG5cbi8vRklYOiBBZGQgY29uZGl0aW9uIGNoZWNrOiBhbGxWaWV3cG9ydHNDb250ZW50IGZvciBjb3JyZWN0IGRhdGEgc3RydWN0dXJlXG5mdW5jdGlvbiBmaWx0ZXJCeVZpZXdwb3J0KGFsbFZpZXdwb3J0c0NvbnRlbnQsIGZpcnN0QnJlYWssIHNlY29uZEJyZWFrKXtcblxuICAgIC8vc2VsZWN0IHRoZSBsYXJnZXIgb2Ygdmlld3BvcnQgaGVpZ2h0IC0gd2lkdGggKGRldmljZSBjYW4gcm90YXRlIGFmdGVyIGxvYWRpbmcgY29udGVudClcbiAgICB2YXIgdGhpc1ZpZXdwb3J0U2l6ZSA9IE1hdGgubWF4KHZpZXdIZWlnaHQsIHZpZXdXaWR0aCk7XG4gICAgdmFyIHRoaXNWaWV3cG9ydENvbnRlbnQ7XG5cbiAgICAvL21lZGl1bTtcbiAgICBpZiAoIHRoaXNWaWV3cG9ydFNpemUgPD0gZmlyc3RCcmVhayApe1xuICAgICAgICB0aGlzVmlld3BvcnRDb250ZW50ID0gYWxsVmlld3BvcnRzQ29udGVudFsxXTtcbiAgICB9XG5cbiAgICAvL2xhcmdlO1xuICAgIGVsc2UgaWYoIHRoaXNWaWV3cG9ydFNpemUgPj0gZmlyc3RCcmVhayAmJiB0aGlzVmlld3BvcnRTaXplIDw9IHNlY29uZEJyZWFrKSB7XG4gICAgICAgIHRoaXNWaWV3cG9ydENvbnRlbnQgPSBhbGxWaWV3cG9ydHNDb250ZW50WzJdO1xuICAgIH1cblxuICAgIC8veGxhcmdlXG4gICAgZWxzZXtcbiAgICAgICAgdGhpc1ZpZXdwb3J0Q29udGVudCA9IGFsbFZpZXdwb3J0c0NvbnRlbnRbM107XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXNWaWV3cG9ydENvbnRlbnQ7XG59XG4iLCJmdW5jdGlvbiBhcHBseUlzbygpe1xyXG4gICAgdmFyIHByb2plY3RzSXNvID0galF1ZXJ5KCcuaXNvLWdyaWQnKS5pc290b3BlKHtcclxuICAgICAgICBpdGVtU2VsZWN0b3I6ICcuaXNvLWdyaWQtaXRlbScsXHJcbiAgICAgICAgcmVzaXphYmxlOiB0cnVlLCAvLyBkaXNhYmxlIG5vcm1hbCByZXNpemluZ1xyXG4gICAgICAgIHBlcmNlbnRQb3NpdGlvbjogdHJ1ZSxcclxuXHJcbiAgICAgICAgYW5pbWF0aW9uRW5naW5lOiAnYmVzdC1hdmFpbGFibGUnLFxyXG4gICAgICAgIGFuaW1hdGlvbk9wdGlvbnM6IHtcclxuICAgICAgICAgICAgZHVyYXRpb246IDMwMDAsXHJcbiAgICAgICAgICAgIGVhc2luZzogJ2xpbmVhcicsXHJcbiAgICAgICAgICAgIHF1ZXVlOiBmYWxzZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbGF5b3V0TW9kZTogJ2ZpdFJvd3MnLFxyXG4gICAgICAgIG1hc29ucnk6e1xyXG4gICAgICAgICAgICBjb2x1bW5XaWR0aDogICAgJ2lzby1ncmlkLWl0ZW0nLFxyXG4gICAgICAgICAgICBpc0FuaW1hdGVkOiAgICAgdHJ1ZVxyXG4gICAgICAgICAgICAvL2lzRml0V2lkdGg6ICAgICB0cnVlXHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuIiwiXG5mdW5jdGlvbiBsYXp5TG9hZFJlc291cmNlKGZpbGUsIHR5cGUpe1xuXHR2YXIgY2IgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgbGluaztcbiAgICBpZiAodHlwZSA9PT0gXCJjc3NcIil7XG5cdFx0bGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpbmsnKTsgbGluay5yZWwgPSAnc3R5bGVzaGVldCc7XG5cdH1cblx0ZWxzZSBpZiAodHlwZSA9PT0gXCJqc1wiKXtcblx0XHRsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7IGxpbmsudHlwZSA9ICd0ZXh0L2phdmFzY3JpcHQnO1xuXHR9XG5cblx0bGluay5ocmVmID0gZmlsZTtcblx0dmFyIGggPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdOyBoLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGwsIGgpO1xuXHR9O1xuXHR2YXIgcmFmID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8IG1velJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuXHR3ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHwgbXNSZXF1ZXN0QW5pbWF0aW9uRnJhbWU7XG5cdGlmIChyYWYpIHJhZihjYik7XG5cdGVsc2Ugd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBjYik7XG59XG4iLCIndXNlIHN0cmljdCc7XG4vKmpzaGludCAtVzExNyAqL1xuXG5mdW5jdGlvbiBsb2FkKHdoZXJlLCB3aGF0LCBjYWxsYmFjayl7XG5cdGNvbnNvbGUubG9nKFwiTG9hZGVkOiBcIiArIHdoYXQgKyBcIiBJTlRPIFwiICsgd2hlcmUpO1xuXHRqUXVlcnkoIHdoZXJlICkubG9hZCggd2hhdCwgZnVuY3Rpb24oKSB7XG5cdCAgalF1ZXJ5KHdpbmRvdykucmVzaXplKCk7XG5cdCAgd2luZG93LnNjcm9sbFRvKDAsMCk7XG4gICAgICBjYWxsYmFjaygpO1xuXHR9KTtcbn1cbiIsIlxyXG5mdW5jdGlvbiBkb1JlY3Vyc2l2ZWx5KHRoaXNGbiwgaW50ZXJ2YWwsIHRpbWVvdXQpIHtcclxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuXHQgICAgaW50ZXJ2YWwgPSBpbnRlcnZhbCB8fCAgMzAwMDtcclxuXHQgICAgdGltZW91dCA9ICB0aW1lb3V0ICB8fCAzMDAwMDtcclxuXHQgICAgdmFyIHN0YXJ0VGltZSA9IChuZXcgRGF0ZSgpKS5nZXRUaW1lKCk7XHJcblxyXG5cclxuXHQgICAgKGZ1bmN0aW9uIHJpbmNlUmVwZWF0KCkge1xyXG5cdCAgICAgICAgdmFyIHRoaXNGblJlc3VsdCA9IHRoaXNGbigpO1xyXG5cclxuXHQgICAgICAgIGlmICggKERhdGUubm93KCkgLSBzdGFydFRpbWUgKSA8PSB0aW1lb3V0ICkgIHtcclxuXHQgICAgICAgICAgICBzZXRUaW1lb3V0KHJpbmNlUmVwZWF0LCBpbnRlcnZhbCwgdGhpc0ZuUmVzdWx0KTtcclxuXHQgICAgICAgIH1cclxuXHQgICAgfSkoKTtcclxuXHJcbiAgICB9LCBpbnRlcnZhbCAqIDAuNzUpO1xyXG59XHJcbiIsImZ1bmN0aW9uIHJlc2V0SGVpZ2h0cyh0YXJnZXQpe1xyXG4gICAgalF1ZXJ5KHRhcmdldCkuY3NzKCdtaW4taGVpZ2h0JywgJ25vbmUnKTtcclxuICAgIGpRdWVyeSh0YXJnZXQpLmNzcygnbWF4LWhlaWdodCcsICdub25lJyk7XHJcbiAgICBqUXVlcnkodGFyZ2V0KS5jc3MoJ2hlaWdodCcsICdhdXRvJyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlc2V0V2lkdGhzKHRhcmdldCl7XHJcbiAgICBqUXVlcnkodGFyZ2V0KS5jc3MoJ21pbi13aWR0aCcsICdub25lJyk7XHJcbiAgICBqUXVlcnkodGFyZ2V0KS5jc3MoJ21heC13aWR0aCcsICdub25lJyk7XHJcbiAgICBqUXVlcnkodGFyZ2V0KS5jc3MoJ3dpZHRoJywgJ2F1dG8nKTtcclxufVxyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
