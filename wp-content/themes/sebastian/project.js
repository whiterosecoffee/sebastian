/*jshint -W117 */
/*jshint -W082 */

jQuery(document).ready(function(){


	//HOME PAGE - Dragend Image Gallery
	if ( jQuery('html').data('page-slug') == 'home' ){

        jQuery(window).on('resize', homeResize());

		function homeResize(){
	        console.log("project.js/home:resize H: " + viewHeight + " W: " + viewWidth);

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
        //New Dragend Class
		jQuery("#quoteRotator").dragend({});

        //AutoPlay Quotes
        doRecursively( function(){
            if (mouseDown === false){
                autoPlaySlides("#quoteRotator");
            }
        }, 2750, 33000);
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
    var wrapHeight = getHeight(wrapper);
    minHeight(html, wrapHeight);
    minHeight(body, wrapHeight);

    //Set height of mobile menu
    //menuHeight(docHeight);

    //Adjust footer possition on mismatched screen / document sizes
    fixToBottom(footer);

    //If devTesting TRUE init testPanel
    if (devTesting === true){
		testPanel();
	}

	//Log current device info
	console.log('velcro.js/velcroResize dH:' + docHeight + ' - vH:' + viewHeight +  ' x vW:' + viewWidth + ' Asp:' + viewAsp + ' ' + aspText + ' ' + deviceType);

}// coreResize

//FIX: reintegrate 'debounce style' promises

//Scroll Menu
jQuery(window).scroll(function() {
    var scrollMenuOffset = 50;
    var scrollMenuTimer;
	if(scrollMenuTimer) {
		window.clearTimeout(scrollMenuTimer);
	}
	scrollMenuTimer = window.setTimeout(function() {
        if (jQuery(this).scrollTop() > scrollMenuOffset) {
            jQuery(html).addClass('scrollMenu');
        } else {
            jQuery(html).removeClass('scrollMenu');
        }
    }, 100);
});

//Event Listeners
document.addEventListener("DOMContentLoaded", function() {
    velcroReady();

    //FIX: vanilla
    jQuery('#navOpenBtn').click(function() {
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
  var offloadFn = function(fn) { setTimeout(fn || noop, 0); }; // offload a functions execution

  // check browser capabilities
  var browser = {
    addEventListener: !!window.addEventListener,
    touch: ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch,
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
  var speed = options.speed || 300;
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
        case 'touchstart': this.start(event); break;
        case 'touchmove': this.move(event); break;
        case 'touchend': offloadFn(this.end(event)); break;
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

      var touches = event.touches[0];

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
      element.addEventListener('touchmove', this, false);
      element.addEventListener('touchend', this, false);

    },
    move: function(event) {

      // ensure swiping with one touch and not pinching
      if ( event.touches.length > 1 || event.scale && event.scale !== 1) return

      if (options.disableScroll) event.preventDefault();

      var touches = event.touches[0];

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
      element.removeEventListener('touchmove', events, false)
      element.removeEventListener('touchend', events, false)

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
    if (browser.touch) element.addEventListener('touchstart', events, false);

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
        element.removeEventListener('touchstart', events, false);
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
})( window.jQuery || window.Zepto );
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
    var targetBottom = getOffsetBottom(target);
    //if the target isn't already at the bottom
    //console.log(targetBottom);
    if(targetBottom < viewHeight) {
        //check if there is enough space to fit the target
        //get previous sibling position
        var eleAbove = getFamily(target, 'prev');
        var eleAboveBottom = getOffset(eleAbove).bottom;
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
    minAsp = minAsp ? minAsp : 1.6;
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
function styles( element, styles ) {
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

var mySwipe = "newSwipe";

function newSwipeThumbs(target, slideSpeed){
    window.mySwipe = new Swipe(document.getElementById(target), {
        startSlide: 0,
        speed: 300,
        auto: slideSpeed,
        continuous: true,
        disableScroll: false,
        stopPropagation: false,
        callback: function(index, elem) {
            //console.log('slide changed');
            //console.log(index, elem);
        },
        slideMove: function(index, elem) {
            //console.log('slide started moving');
            //console.log(index, elem);
        },
        transitionEnd: function(index, elem) {
            //console.log('slide finished changing');
            //console.log(index, elem);
        }
    });

    function thumbClick() {
        console.log('thumbClicked');
        event.preventDefault();

        thumbIndex = jQuery('.swipe-thumb').index( this );
        //console.log('thumbClicked - this: ' + thumbIndex);

        window.mySwipe.slide(thumbIndex);
        return false;
    }

    var thumbsContainer = jQuery('.swipe-thumbs-wrap');

    //Get the thumbnails
    var thumbs = thumbsContainer.children('.swipe-thumb');
    for (var i = 0; i < thumbs.length; i++) {
        thumbs[i].addEventListener('click', thumbClick);
    }

    //after the gallery is ready, set the dimensions
    setDimensions(document.getElementById(target));
}

function newSwipeBasic(target, slideSpeed){
    window[target] = new Swipe(document.getElementById(target), {
        startSlide: 0,
        auto: slideSpeed,
        continuous: true,
        disableScroll: false,
        stopPropagation: false,
        callback: function(index, elem) {
            //console.log('slide changed');
            //console.log(index, elem);
        },
        slideMove: function(index, elem) {
            //console.log('slide started moving');
            //console.log(index, elem);
        },
        transitionEnd: function(index, elem) {
            //console.log('slide finished changing');
            //console.log(index, elem);
        }
    });
    setDimensions(document.getElementById(target));
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
        console.log("thumbs bigger");
        thumbMaxWidth = galleryWidth / thumbsCount;
        jQuery('.swipe-thumb').css('max-width', thumbMaxWidth);
        jQuery('.swipe-thumb').css('max-height', thumbMaxWidth);
        jQuery('.swipe-thumbs-container').css('max-height', thumbMaxWidth);
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
    console.log("Breakpoint: " + thisBpLabel);
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

function load(where, what){
	console.log("Loaded: " + what + " INTO " + where);
	jQuery( where ).load( what, function() {
	  jQuery(window).resize();
	  window.scrollTo(0,0);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2plY3QuanMiLCJ2ZWxjcm8uanMiLCJpc290b3BlLnBrZ2QubWluLmpzIiwibG9kYXNoLmNvcmUubWluLmpzIiwic3dpcGUuanMiLCIjZHJhZ2VuZEV4dHJhLmpzIiwiI3doZW5UaGVuLmpzIiwiYUludGVncmF0ZUJhY2suanMiLCJjb3JlRnJhbWV3b3JrLmpzIiwiY29yZUdldEpzb24uanMiLCJjb3JlSGVscGVycy5qcyIsImNvcmVWYW5pbGxhQXJyYXlzLmpzIiwiY29yZVZhbmlsbGFCb3hNb2RlbC5qcyIsImNvcmVWYW5pbGxhRG9tLmpzIiwiY29yZVZhbmlsbGFFdmVudHMuanMiLCJjb3JlVmFuaWxsYUhlbHBlcnMuanMiLCJjb3JlVmFuaWxsYUpzb24uanMiLCJjb3JlVmFuaWxsYVN0cmluZ3MuanMiLCJjb3JlVmFuaWxsYVN0eWxlcy5qcyIsIm1vZGFsc1Rlc3RpbmcuanMiLCJzd2lwZUhlbHBlcnMuanMiLCJzd2lwZVNsaWRlUGFuZWwuanMiLCJzd2lwZVRodW1ic1dyYXAuanMiLCJ0cm91Ymxlc2hvb3RpbmdFeGFtcGxlcy5qcyIsInZlbGNyb0FwcGx5SXNvLmpzIiwidmVsY3JvQnJlYWtQb2ludHMuanMiLCJ2ZWxjcm9GaWx0ZXJDb250ZW50LmpzIiwidmVsY3JvSXNvLmpzIiwidmVsY3JvTGF6eUxvYWQuanMiLCJ2ZWxjcm9Mb2FkLmpzIiwidmVsY3JvUmVjdXJzaXZlLmpzIiwidmVsY3JvUmVzZXRWYWx1ZXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDNUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN0SEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3pqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM5QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNySEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN2SUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN2Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN0R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN0REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM1UEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNwS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDckVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzVDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ25EQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDL0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM1Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoicHJvamVjdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qanNoaW50IC1XMTE3ICovXG4vKmpzaGludCAtVzA4MiAqL1xuXG5qUXVlcnkoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCl7XG5cblxuXHQvL0hPTUUgUEFHRSAtIERyYWdlbmQgSW1hZ2UgR2FsbGVyeVxuXHRpZiAoIGpRdWVyeSgnaHRtbCcpLmRhdGEoJ3BhZ2Utc2x1ZycpID09ICdob21lJyApe1xuXG4gICAgICAgIGpRdWVyeSh3aW5kb3cpLm9uKCdyZXNpemUnLCBob21lUmVzaXplKCkpO1xuXG5cdFx0ZnVuY3Rpb24gaG9tZVJlc2l6ZSgpe1xuXHQgICAgICAgIGNvbnNvbGUubG9nKFwicHJvamVjdC5qcy9ob21lOnJlc2l6ZSBIOiBcIiArIHZpZXdIZWlnaHQgKyBcIiBXOiBcIiArIHZpZXdXaWR0aCk7XG5cblx0XHR9XG5cblx0fS8vaG9tZSBwYWdlXG5cblx0Ly9QUk9KRUNUUyBQQUdFIC0gRHJhZ2VuZCBJbWFnZSBHYWxsZXJ5XG5cdGlmICggalF1ZXJ5KCdodG1sJykuZGF0YSgncGFnZS1zbHVnJykgPT0gJ3Byb2plY3RzJyB8fCBqUXVlcnkoJ2h0bWwnKS5kYXRhKCdwYWdlLXNsdWcnKSA9PSAncG9ydGZvbGlvJyl7XG5cdFx0alF1ZXJ5KHdpbmRvdykub24oJ3Jlc2l6ZScsIHByb2plY3RzUmVzaXplKCkgKTtcblx0XHRqUXVlcnkod2luZG93KS5vbigncmVzaXplJywgYXBwbHlJc28oKSApO1xuXG5cdFx0ZnVuY3Rpb24gcHJvamVjdHNSZXNpemUoKXtcblx0XHRcdGNvbnNvbGUubG9nKFwicHJvamVjdC5qcy9wcm9qZWN0czpyZXNpemUgSDogXCIgKyB2aWV3SGVpZ2h0ICsgXCIgVzogXCIgKyB2aWV3V2lkdGgpO1xuXHRcdH1cblxuICAgICAgICAvLyBQb3J0Zm9saW8gTWFzb25hcnlcblxuXHR9Ly9wcm9qZWN0cyBwYWdlXG5cbiAgICAvL0NPTlRBQ1QgUEFHRSAtXG4gICAgaWYgKCBqUXVlcnkoJ2h0bWwnKS5kYXRhKCdwYWdlLXNsdWcnKSA9PSAnY29udGFjdCcpe1xuICAgICAgICAvL05ldyBEcmFnZW5kIENsYXNzXG5cdFx0alF1ZXJ5KFwiI3F1b3RlUm90YXRvclwiKS5kcmFnZW5kKHt9KTtcblxuICAgICAgICAvL0F1dG9QbGF5IFF1b3Rlc1xuICAgICAgICBkb1JlY3Vyc2l2ZWx5KCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgaWYgKG1vdXNlRG93biA9PT0gZmFsc2Upe1xuICAgICAgICAgICAgICAgIGF1dG9QbGF5U2xpZGVzKFwiI3F1b3RlUm90YXRvclwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgMjc1MCwgMzMwMDApO1xuICAgIH0vL2NvbnRhY3QgcGFnZVxufSk7XG4iLCIndXNlIHN0cmljdCc7XG4vKiBqc2hpbnQgLVcwOTcgKi9cbi8qIGpzaGludCAtVzExNyAqL1xuXG4vL1NldHRpbmdzXG52YXIgbW9iaWxlTmF2T25seSBcdFx0PSB0cnVlO1xudmFyIHBhZ2VMb2FkZXIgXHRcdFx0PSB0cnVlO1xudmFyIGRldlRlc3RpbmcgXHRcdFx0PSBmYWxzZTtcbnZhciBtb2JpbGVQb3J0cmFpdCBcdFx0PSA0MTQ7XG52YXIgbW9iaWxlTGFuZHNjYXBlIFx0PSA3Njc7XG52YXIgdGFibGV0TGFuZHNjYXBlIFx0PSAxMDI0O1xuXG4vL0VsZW1lbnRzXG52YXIgaHRtbCBcdFx0PSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG52YXIgYm9keSBcdFx0PSBkb2N1bWVudC5ib2R5O1xudmFyIHdyYXBwZXIgXHQ9IGdldCgnd3JhcHBlcicpO1xudmFyIGZvb3RlciAgICAgID0gZ2V0KCdmb290ZXInKTtcbnZhciBwYWdlTG9hZGVyICA9IGdldCgncGFnZUxvYWRlcicpO1xudmFyIG5hdk9wZW5CdG4gID0gZ2V0KCduYXZPcGVuQnRuJyk7XG52YXIgbmF2Q2xvc2VCdG4gPSBnZXQoJ25hdkNsb3NlQnRuJyk7XG5cbnZhciB2aWV3V2lkdGggXHQ9IHdpbmRvdy5pbm5lcldpZHRoO1xudmFyIHZpZXdIZWlnaHQgXHQ9IHdpbmRvdy5pbm5lckhlaWdodDtcbnZhciB2aWV3QXNwIFx0PSAod2luZG93LmlubmVyV2lkdGgvd2luZG93LmlubmVySGVpZ2h0KS50b0ZpeGVkKDIpO1xudmFyIGRvY1dpZHRoIFx0PSBodG1sLmNsaWVudFdpZHRoO1xudmFyIGRvY0hlaWdodCBcdD0gXCJcIjtcbnZhciBicmVha1BvaW50ICA9IFwiXCI7XG52YXIgYXNwVGV4dCBcdD0gXCJcIjtcblxudmFyIGRldmljZVR5cGUgXHQ9IGpRdWVyeSgnaHRtbCcpLmRhdGEoJ2RldmljZS10eXBlJyk7XG5cbmZ1bmN0aW9uIHZlbGNyb1JlYWR5KCl7XG4gICAgcGFnZUxvYWRlci5zdHlsZSA9IChcInZpc2liaWxpdHk6IGhpZGRlblwiKTtcbiAgICByZW1vdmVDbGFzcyhodG1sLCBcIm5vLWpzXCIpO1xuICAgIGFkZENsYXNzKGh0bWwsIFwianMtcmVhZHlcIik7XG4gICAgdmVsY3JvUmVzaXplKCk7XG59XG5cbmZ1bmN0aW9uIHZlbGNyb1Jlc2l6ZSgpe1xuICAgIC8vUmVzZXQgYmFzZSB2YWx1ZXNcblx0ZG9jV2lkdGggXHQ9IGh0bWwuY2xpZW50V2lkdGg7XG4gICAgZG9jSGVpZ2h0IFx0PSBnZXREb2NIZWlnaHQoKTtcblx0dmlld1dpZHRoIFx0PSB3aW5kb3cuaW5uZXJXaWR0aDtcblx0dmlld0hlaWdodCBcdD0gd2luZG93LmlubmVySGVpZ2h0OyAvL2NvbnNvbGUubG9nKHZpZXdIZWlnaHQpO1xuXHR2aWV3QXNwXHRcdD0gKCB2aWV3V2lkdGggLyB2aWV3SGVpZ2h0ICkudG9GaXhlZCgyKTtcbiAgICBicmVha1BvaW50IFx0PSBnZXRCcmVha3BvaW50KG1vYmlsZUxhbmRzY2FwZSwgdGFibGV0TGFuZHNjYXBlKTtcblx0YXNwVGV4dCBcdD0gZ2V0T3JpZW50YXRpb25DbGFzcygpO1xuXG4gICAgLy9DaGVjayBpZiB0aGUgbWVudSBjbGFzcyBzaG91bGQgY2hhbmdlXG4gICAgbmF2Q2xhc3NlcygpO1xuXG4gICAgLy9TZXQgbWluLWhlaWdodCB0byB0aGUgdmlld3BvcnRTaXplIG9uIHN0cnVjdHVyYWwgZWxlbWVudHNcbiAgICBtaW5IZWlnaHQod3JhcHBlciwgdmlld0hlaWdodCk7XG4gICAgdmFyIHdyYXBIZWlnaHQgPSBnZXRIZWlnaHQod3JhcHBlcik7XG4gICAgbWluSGVpZ2h0KGh0bWwsIHdyYXBIZWlnaHQpO1xuICAgIG1pbkhlaWdodChib2R5LCB3cmFwSGVpZ2h0KTtcblxuICAgIC8vU2V0IGhlaWdodCBvZiBtb2JpbGUgbWVudVxuICAgIC8vbWVudUhlaWdodChkb2NIZWlnaHQpO1xuXG4gICAgLy9BZGp1c3QgZm9vdGVyIHBvc3NpdGlvbiBvbiBtaXNtYXRjaGVkIHNjcmVlbiAvIGRvY3VtZW50IHNpemVzXG4gICAgZml4VG9Cb3R0b20oZm9vdGVyKTtcblxuICAgIC8vSWYgZGV2VGVzdGluZyBUUlVFIGluaXQgdGVzdFBhbmVsXG4gICAgaWYgKGRldlRlc3RpbmcgPT09IHRydWUpe1xuXHRcdHRlc3RQYW5lbCgpO1xuXHR9XG5cblx0Ly9Mb2cgY3VycmVudCBkZXZpY2UgaW5mb1xuXHRjb25zb2xlLmxvZygndmVsY3JvLmpzL3ZlbGNyb1Jlc2l6ZSBkSDonICsgZG9jSGVpZ2h0ICsgJyAtIHZIOicgKyB2aWV3SGVpZ2h0ICsgICcgeCB2VzonICsgdmlld1dpZHRoICsgJyBBc3A6JyArIHZpZXdBc3AgKyAnICcgKyBhc3BUZXh0ICsgJyAnICsgZGV2aWNlVHlwZSk7XG5cbn0vLyBjb3JlUmVzaXplXG5cbi8vRklYOiByZWludGVncmF0ZSAnZGVib3VuY2Ugc3R5bGUnIHByb21pc2VzXG5cbi8vU2Nyb2xsIE1lbnVcbmpRdWVyeSh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbigpIHtcbiAgICB2YXIgc2Nyb2xsTWVudU9mZnNldCA9IDUwO1xuICAgIHZhciBzY3JvbGxNZW51VGltZXI7XG5cdGlmKHNjcm9sbE1lbnVUaW1lcikge1xuXHRcdHdpbmRvdy5jbGVhclRpbWVvdXQoc2Nyb2xsTWVudVRpbWVyKTtcblx0fVxuXHRzY3JvbGxNZW51VGltZXIgPSB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKGpRdWVyeSh0aGlzKS5zY3JvbGxUb3AoKSA+IHNjcm9sbE1lbnVPZmZzZXQpIHtcbiAgICAgICAgICAgIGpRdWVyeShodG1sKS5hZGRDbGFzcygnc2Nyb2xsTWVudScpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgalF1ZXJ5KGh0bWwpLnJlbW92ZUNsYXNzKCdzY3JvbGxNZW51Jyk7XG4gICAgICAgIH1cbiAgICB9LCAxMDApO1xufSk7XG5cbi8vRXZlbnQgTGlzdGVuZXJzXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBmdW5jdGlvbigpIHtcbiAgICB2ZWxjcm9SZWFkeSgpO1xuXG4gICAgLy9GSVg6IHZhbmlsbGFcbiAgICBqUXVlcnkoJyNuYXZPcGVuQnRuJykuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgIGFkZE1lbnVPcGVuQ2xhc3MoKTtcbiAgICB9KTtcbiAgICBqUXVlcnkoJyNuYXZDbG9zZUJ0bicpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICByZW1vdmVNZW51T3BlbkNsYXNzKCk7XG4gICAgfSk7XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZlbGNyb1Jlc2l6ZSgpO1xuICAgIH0pO1xuXG59KTtcblxuLy9Nb3VzZSBFdmVudHNcbnZhciBtb3VzZURvd24gPSBmYWxzZTtcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIGZ1bmN0aW9uKCkge1xuICAgIG1vdXNlRG93biA9IHRydWU7XG59KTtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIGZ1bmN0aW9uKCkge1xuICAgIG1vdXNlRG93biA9IGZhbHNlO1xufSk7XG4iLCIvKiFcbiAqIElzb3RvcGUgUEFDS0FHRUQgdjMuMC4xXG4gKlxuICogTGljZW5zZWQgR1BMdjMgZm9yIG9wZW4gc291cmNlIHVzZVxuICogb3IgSXNvdG9wZSBDb21tZXJjaWFsIExpY2Vuc2UgZm9yIGNvbW1lcmNpYWwgdXNlXG4gKlxuICogaHR0cDovL2lzb3RvcGUubWV0YWZpenp5LmNvXG4gKiBDb3B5cmlnaHQgMjAxNiBNZXRhZml6enlcbiAqL1xuXG4hZnVuY3Rpb24odCxlKXtcInVzZSBzdHJpY3RcIjtcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQ/ZGVmaW5lKFwianF1ZXJ5LWJyaWRnZXQvanF1ZXJ5LWJyaWRnZXRcIixbXCJqcXVlcnlcIl0sZnVuY3Rpb24oaSl7ZSh0LGkpfSk6XCJvYmplY3RcIj09dHlwZW9mIG1vZHVsZSYmbW9kdWxlLmV4cG9ydHM/bW9kdWxlLmV4cG9ydHM9ZSh0LHJlcXVpcmUoXCJqcXVlcnlcIikpOnQualF1ZXJ5QnJpZGdldD1lKHQsdC5qUXVlcnkpfSh3aW5kb3csZnVuY3Rpb24odCxlKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBpKGkscyxhKXtmdW5jdGlvbiB1KHQsZSxuKXt2YXIgbyxzPVwiJCgpLlwiK2krJyhcIicrZSsnXCIpJztyZXR1cm4gdC5lYWNoKGZ1bmN0aW9uKHQsdSl7dmFyIGg9YS5kYXRhKHUsaSk7aWYoIWgpcmV0dXJuIHZvaWQgcihpK1wiIG5vdCBpbml0aWFsaXplZC4gQ2Fubm90IGNhbGwgbWV0aG9kcywgaS5lLiBcIitzKTt2YXIgZD1oW2VdO2lmKCFkfHxcIl9cIj09ZS5jaGFyQXQoMCkpcmV0dXJuIHZvaWQgcihzK1wiIGlzIG5vdCBhIHZhbGlkIG1ldGhvZFwiKTt2YXIgbD1kLmFwcGx5KGgsbik7bz12b2lkIDA9PT1vP2w6b30pLHZvaWQgMCE9PW8/bzp0fWZ1bmN0aW9uIGgodCxlKXt0LmVhY2goZnVuY3Rpb24odCxuKXt2YXIgbz1hLmRhdGEobixpKTtvPyhvLm9wdGlvbihlKSxvLl9pbml0KCkpOihvPW5ldyBzKG4sZSksYS5kYXRhKG4saSxvKSl9KX1hPWF8fGV8fHQualF1ZXJ5LGEmJihzLnByb3RvdHlwZS5vcHRpb258fChzLnByb3RvdHlwZS5vcHRpb249ZnVuY3Rpb24odCl7YS5pc1BsYWluT2JqZWN0KHQpJiYodGhpcy5vcHRpb25zPWEuZXh0ZW5kKCEwLHRoaXMub3B0aW9ucyx0KSl9KSxhLmZuW2ldPWZ1bmN0aW9uKHQpe2lmKFwic3RyaW5nXCI9PXR5cGVvZiB0KXt2YXIgZT1vLmNhbGwoYXJndW1lbnRzLDEpO3JldHVybiB1KHRoaXMsdCxlKX1yZXR1cm4gaCh0aGlzLHQpLHRoaXN9LG4oYSkpfWZ1bmN0aW9uIG4odCl7IXR8fHQmJnQuYnJpZGdldHx8KHQuYnJpZGdldD1pKX12YXIgbz1BcnJheS5wcm90b3R5cGUuc2xpY2Uscz10LmNvbnNvbGUscj1cInVuZGVmaW5lZFwiPT10eXBlb2Ygcz9mdW5jdGlvbigpe306ZnVuY3Rpb24odCl7cy5lcnJvcih0KX07cmV0dXJuIG4oZXx8dC5qUXVlcnkpLGl9KSxmdW5jdGlvbih0LGUpe1wiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZD9kZWZpbmUoXCJldi1lbWl0dGVyL2V2LWVtaXR0ZXJcIixlKTpcIm9iamVjdFwiPT10eXBlb2YgbW9kdWxlJiZtb2R1bGUuZXhwb3J0cz9tb2R1bGUuZXhwb3J0cz1lKCk6dC5FdkVtaXR0ZXI9ZSgpfShcInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93P3dpbmRvdzp0aGlzLGZ1bmN0aW9uKCl7ZnVuY3Rpb24gdCgpe312YXIgZT10LnByb3RvdHlwZTtyZXR1cm4gZS5vbj1mdW5jdGlvbih0LGUpe2lmKHQmJmUpe3ZhciBpPXRoaXMuX2V2ZW50cz10aGlzLl9ldmVudHN8fHt9LG49aVt0XT1pW3RdfHxbXTtyZXR1cm4tMT09bi5pbmRleE9mKGUpJiZuLnB1c2goZSksdGhpc319LGUub25jZT1mdW5jdGlvbih0LGUpe2lmKHQmJmUpe3RoaXMub24odCxlKTt2YXIgaT10aGlzLl9vbmNlRXZlbnRzPXRoaXMuX29uY2VFdmVudHN8fHt9LG49aVt0XT1pW3RdfHx7fTtyZXR1cm4gbltlXT0hMCx0aGlzfX0sZS5vZmY9ZnVuY3Rpb24odCxlKXt2YXIgaT10aGlzLl9ldmVudHMmJnRoaXMuX2V2ZW50c1t0XTtpZihpJiZpLmxlbmd0aCl7dmFyIG49aS5pbmRleE9mKGUpO3JldHVybi0xIT1uJiZpLnNwbGljZShuLDEpLHRoaXN9fSxlLmVtaXRFdmVudD1mdW5jdGlvbih0LGUpe3ZhciBpPXRoaXMuX2V2ZW50cyYmdGhpcy5fZXZlbnRzW3RdO2lmKGkmJmkubGVuZ3RoKXt2YXIgbj0wLG89aVtuXTtlPWV8fFtdO2Zvcih2YXIgcz10aGlzLl9vbmNlRXZlbnRzJiZ0aGlzLl9vbmNlRXZlbnRzW3RdO287KXt2YXIgcj1zJiZzW29dO3ImJih0aGlzLm9mZih0LG8pLGRlbGV0ZSBzW29dKSxvLmFwcGx5KHRoaXMsZSksbis9cj8wOjEsbz1pW25dfXJldHVybiB0aGlzfX0sdH0pLGZ1bmN0aW9uKHQsZSl7XCJ1c2Ugc3RyaWN0XCI7XCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kP2RlZmluZShcImdldC1zaXplL2dldC1zaXplXCIsW10sZnVuY3Rpb24oKXtyZXR1cm4gZSgpfSk6XCJvYmplY3RcIj09dHlwZW9mIG1vZHVsZSYmbW9kdWxlLmV4cG9ydHM/bW9kdWxlLmV4cG9ydHM9ZSgpOnQuZ2V0U2l6ZT1lKCl9KHdpbmRvdyxmdW5jdGlvbigpe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIHQodCl7dmFyIGU9cGFyc2VGbG9hdCh0KSxpPS0xPT10LmluZGV4T2YoXCIlXCIpJiYhaXNOYU4oZSk7cmV0dXJuIGkmJmV9ZnVuY3Rpb24gZSgpe31mdW5jdGlvbiBpKCl7Zm9yKHZhciB0PXt3aWR0aDowLGhlaWdodDowLGlubmVyV2lkdGg6MCxpbm5lckhlaWdodDowLG91dGVyV2lkdGg6MCxvdXRlckhlaWdodDowfSxlPTA7aD5lO2UrKyl7dmFyIGk9dVtlXTt0W2ldPTB9cmV0dXJuIHR9ZnVuY3Rpb24gbih0KXt2YXIgZT1nZXRDb21wdXRlZFN0eWxlKHQpO3JldHVybiBlfHxhKFwiU3R5bGUgcmV0dXJuZWQgXCIrZStcIi4gQXJlIHlvdSBydW5uaW5nIHRoaXMgY29kZSBpbiBhIGhpZGRlbiBpZnJhbWUgb24gRmlyZWZveD8gU2VlIGh0dHA6Ly9iaXQubHkvZ2V0c2l6ZWJ1ZzFcIiksZX1mdW5jdGlvbiBvKCl7aWYoIWQpe2Q9ITA7dmFyIGU9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtlLnN0eWxlLndpZHRoPVwiMjAwcHhcIixlLnN0eWxlLnBhZGRpbmc9XCIxcHggMnB4IDNweCA0cHhcIixlLnN0eWxlLmJvcmRlclN0eWxlPVwic29saWRcIixlLnN0eWxlLmJvcmRlcldpZHRoPVwiMXB4IDJweCAzcHggNHB4XCIsZS5zdHlsZS5ib3hTaXppbmc9XCJib3JkZXItYm94XCI7dmFyIGk9ZG9jdW1lbnQuYm9keXx8ZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O2kuYXBwZW5kQ2hpbGQoZSk7dmFyIG89bihlKTtzLmlzQm94U2l6ZU91dGVyPXI9MjAwPT10KG8ud2lkdGgpLGkucmVtb3ZlQ2hpbGQoZSl9fWZ1bmN0aW9uIHMoZSl7aWYobygpLFwic3RyaW5nXCI9PXR5cGVvZiBlJiYoZT1kb2N1bWVudC5xdWVyeVNlbGVjdG9yKGUpKSxlJiZcIm9iamVjdFwiPT10eXBlb2YgZSYmZS5ub2RlVHlwZSl7dmFyIHM9bihlKTtpZihcIm5vbmVcIj09cy5kaXNwbGF5KXJldHVybiBpKCk7dmFyIGE9e307YS53aWR0aD1lLm9mZnNldFdpZHRoLGEuaGVpZ2h0PWUub2Zmc2V0SGVpZ2h0O2Zvcih2YXIgZD1hLmlzQm9yZGVyQm94PVwiYm9yZGVyLWJveFwiPT1zLmJveFNpemluZyxsPTA7aD5sO2wrKyl7dmFyIGY9dVtsXSxjPXNbZl0sbT1wYXJzZUZsb2F0KGMpO2FbZl09aXNOYU4obSk/MDptfXZhciBwPWEucGFkZGluZ0xlZnQrYS5wYWRkaW5nUmlnaHQseT1hLnBhZGRpbmdUb3ArYS5wYWRkaW5nQm90dG9tLGc9YS5tYXJnaW5MZWZ0K2EubWFyZ2luUmlnaHQsdj1hLm1hcmdpblRvcCthLm1hcmdpbkJvdHRvbSxfPWEuYm9yZGVyTGVmdFdpZHRoK2EuYm9yZGVyUmlnaHRXaWR0aCxJPWEuYm9yZGVyVG9wV2lkdGgrYS5ib3JkZXJCb3R0b21XaWR0aCx6PWQmJnIseD10KHMud2lkdGgpO3ghPT0hMSYmKGEud2lkdGg9eCsoej8wOnArXykpO3ZhciBTPXQocy5oZWlnaHQpO3JldHVybiBTIT09ITEmJihhLmhlaWdodD1TKyh6PzA6eStJKSksYS5pbm5lcldpZHRoPWEud2lkdGgtKHArXyksYS5pbm5lckhlaWdodD1hLmhlaWdodC0oeStJKSxhLm91dGVyV2lkdGg9YS53aWR0aCtnLGEub3V0ZXJIZWlnaHQ9YS5oZWlnaHQrdixhfX12YXIgcixhPVwidW5kZWZpbmVkXCI9PXR5cGVvZiBjb25zb2xlP2U6ZnVuY3Rpb24odCl7Y29uc29sZS5lcnJvcih0KX0sdT1bXCJwYWRkaW5nTGVmdFwiLFwicGFkZGluZ1JpZ2h0XCIsXCJwYWRkaW5nVG9wXCIsXCJwYWRkaW5nQm90dG9tXCIsXCJtYXJnaW5MZWZ0XCIsXCJtYXJnaW5SaWdodFwiLFwibWFyZ2luVG9wXCIsXCJtYXJnaW5Cb3R0b21cIixcImJvcmRlckxlZnRXaWR0aFwiLFwiYm9yZGVyUmlnaHRXaWR0aFwiLFwiYm9yZGVyVG9wV2lkdGhcIixcImJvcmRlckJvdHRvbVdpZHRoXCJdLGg9dS5sZW5ndGgsZD0hMTtyZXR1cm4gc30pLGZ1bmN0aW9uKHQsZSl7XCJ1c2Ugc3RyaWN0XCI7XCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kP2RlZmluZShcImRlc2FuZHJvLW1hdGNoZXMtc2VsZWN0b3IvbWF0Y2hlcy1zZWxlY3RvclwiLGUpOlwib2JqZWN0XCI9PXR5cGVvZiBtb2R1bGUmJm1vZHVsZS5leHBvcnRzP21vZHVsZS5leHBvcnRzPWUoKTp0Lm1hdGNoZXNTZWxlY3Rvcj1lKCl9KHdpbmRvdyxmdW5jdGlvbigpe1widXNlIHN0cmljdFwiO3ZhciB0PWZ1bmN0aW9uKCl7dmFyIHQ9RWxlbWVudC5wcm90b3R5cGU7aWYodC5tYXRjaGVzKXJldHVyblwibWF0Y2hlc1wiO2lmKHQubWF0Y2hlc1NlbGVjdG9yKXJldHVyblwibWF0Y2hlc1NlbGVjdG9yXCI7Zm9yKHZhciBlPVtcIndlYmtpdFwiLFwibW96XCIsXCJtc1wiLFwib1wiXSxpPTA7aTxlLmxlbmd0aDtpKyspe3ZhciBuPWVbaV0sbz1uK1wiTWF0Y2hlc1NlbGVjdG9yXCI7aWYodFtvXSlyZXR1cm4gb319KCk7cmV0dXJuIGZ1bmN0aW9uKGUsaSl7cmV0dXJuIGVbdF0oaSl9fSksZnVuY3Rpb24odCxlKXtcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQ/ZGVmaW5lKFwiZml6enktdWktdXRpbHMvdXRpbHNcIixbXCJkZXNhbmRyby1tYXRjaGVzLXNlbGVjdG9yL21hdGNoZXMtc2VsZWN0b3JcIl0sZnVuY3Rpb24oaSl7cmV0dXJuIGUodCxpKX0pOlwib2JqZWN0XCI9PXR5cGVvZiBtb2R1bGUmJm1vZHVsZS5leHBvcnRzP21vZHVsZS5leHBvcnRzPWUodCxyZXF1aXJlKFwiZGVzYW5kcm8tbWF0Y2hlcy1zZWxlY3RvclwiKSk6dC5maXp6eVVJVXRpbHM9ZSh0LHQubWF0Y2hlc1NlbGVjdG9yKX0od2luZG93LGZ1bmN0aW9uKHQsZSl7dmFyIGk9e307aS5leHRlbmQ9ZnVuY3Rpb24odCxlKXtmb3IodmFyIGkgaW4gZSl0W2ldPWVbaV07cmV0dXJuIHR9LGkubW9kdWxvPWZ1bmN0aW9uKHQsZSl7cmV0dXJuKHQlZStlKSVlfSxpLm1ha2VBcnJheT1mdW5jdGlvbih0KXt2YXIgZT1bXTtpZihBcnJheS5pc0FycmF5KHQpKWU9dDtlbHNlIGlmKHQmJlwibnVtYmVyXCI9PXR5cGVvZiB0Lmxlbmd0aClmb3IodmFyIGk9MDtpPHQubGVuZ3RoO2krKyllLnB1c2godFtpXSk7ZWxzZSBlLnB1c2godCk7cmV0dXJuIGV9LGkucmVtb3ZlRnJvbT1mdW5jdGlvbih0LGUpe3ZhciBpPXQuaW5kZXhPZihlKTstMSE9aSYmdC5zcGxpY2UoaSwxKX0saS5nZXRQYXJlbnQ9ZnVuY3Rpb24odCxpKXtmb3IoO3QhPWRvY3VtZW50LmJvZHk7KWlmKHQ9dC5wYXJlbnROb2RlLGUodCxpKSlyZXR1cm4gdH0saS5nZXRRdWVyeUVsZW1lbnQ9ZnVuY3Rpb24odCl7cmV0dXJuXCJzdHJpbmdcIj09dHlwZW9mIHQ/ZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0KTp0fSxpLmhhbmRsZUV2ZW50PWZ1bmN0aW9uKHQpe3ZhciBlPVwib25cIit0LnR5cGU7dGhpc1tlXSYmdGhpc1tlXSh0KX0saS5maWx0ZXJGaW5kRWxlbWVudHM9ZnVuY3Rpb24odCxuKXt0PWkubWFrZUFycmF5KHQpO3ZhciBvPVtdO3JldHVybiB0LmZvckVhY2goZnVuY3Rpb24odCl7aWYodCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KXtpZighbilyZXR1cm4gdm9pZCBvLnB1c2godCk7ZSh0LG4pJiZvLnB1c2godCk7Zm9yKHZhciBpPXQucXVlcnlTZWxlY3RvckFsbChuKSxzPTA7czxpLmxlbmd0aDtzKyspby5wdXNoKGlbc10pfX0pLG99LGkuZGVib3VuY2VNZXRob2Q9ZnVuY3Rpb24odCxlLGkpe3ZhciBuPXQucHJvdG90eXBlW2VdLG89ZStcIlRpbWVvdXRcIjt0LnByb3RvdHlwZVtlXT1mdW5jdGlvbigpe3ZhciB0PXRoaXNbb107dCYmY2xlYXJUaW1lb3V0KHQpO3ZhciBlPWFyZ3VtZW50cyxzPXRoaXM7dGhpc1tvXT1zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7bi5hcHBseShzLGUpLGRlbGV0ZSBzW29dfSxpfHwxMDApfX0saS5kb2NSZWFkeT1mdW5jdGlvbih0KXt2YXIgZT1kb2N1bWVudC5yZWFkeVN0YXRlO1wiY29tcGxldGVcIj09ZXx8XCJpbnRlcmFjdGl2ZVwiPT1lP3QoKTpkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLHQpfSxpLnRvRGFzaGVkPWZ1bmN0aW9uKHQpe3JldHVybiB0LnJlcGxhY2UoLyguKShbQS1aXSkvZyxmdW5jdGlvbih0LGUsaSl7cmV0dXJuIGUrXCItXCIraX0pLnRvTG93ZXJDYXNlKCl9O3ZhciBuPXQuY29uc29sZTtyZXR1cm4gaS5odG1sSW5pdD1mdW5jdGlvbihlLG8pe2kuZG9jUmVhZHkoZnVuY3Rpb24oKXt2YXIgcz1pLnRvRGFzaGVkKG8pLHI9XCJkYXRhLVwiK3MsYT1kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiW1wiK3IrXCJdXCIpLHU9ZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5qcy1cIitzKSxoPWkubWFrZUFycmF5KGEpLmNvbmNhdChpLm1ha2VBcnJheSh1KSksZD1yK1wiLW9wdGlvbnNcIixsPXQualF1ZXJ5O2guZm9yRWFjaChmdW5jdGlvbih0KXt2YXIgaSxzPXQuZ2V0QXR0cmlidXRlKHIpfHx0LmdldEF0dHJpYnV0ZShkKTt0cnl7aT1zJiZKU09OLnBhcnNlKHMpfWNhdGNoKGEpe3JldHVybiB2b2lkKG4mJm4uZXJyb3IoXCJFcnJvciBwYXJzaW5nIFwiK3IrXCIgb24gXCIrdC5jbGFzc05hbWUrXCI6IFwiK2EpKX12YXIgdT1uZXcgZSh0LGkpO2wmJmwuZGF0YSh0LG8sdSl9KX0pfSxpfSksZnVuY3Rpb24odCxlKXtcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQ/ZGVmaW5lKFwib3V0bGF5ZXIvaXRlbVwiLFtcImV2LWVtaXR0ZXIvZXYtZW1pdHRlclwiLFwiZ2V0LXNpemUvZ2V0LXNpemVcIl0sZSk6XCJvYmplY3RcIj09dHlwZW9mIG1vZHVsZSYmbW9kdWxlLmV4cG9ydHM/bW9kdWxlLmV4cG9ydHM9ZShyZXF1aXJlKFwiZXYtZW1pdHRlclwiKSxyZXF1aXJlKFwiZ2V0LXNpemVcIikpOih0Lk91dGxheWVyPXt9LHQuT3V0bGF5ZXIuSXRlbT1lKHQuRXZFbWl0dGVyLHQuZ2V0U2l6ZSkpfSh3aW5kb3csZnVuY3Rpb24odCxlKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBpKHQpe2Zvcih2YXIgZSBpbiB0KXJldHVybiExO3JldHVybiBlPW51bGwsITB9ZnVuY3Rpb24gbih0LGUpe3QmJih0aGlzLmVsZW1lbnQ9dCx0aGlzLmxheW91dD1lLHRoaXMucG9zaXRpb249e3g6MCx5OjB9LHRoaXMuX2NyZWF0ZSgpKX1mdW5jdGlvbiBvKHQpe3JldHVybiB0LnJlcGxhY2UoLyhbQS1aXSkvZyxmdW5jdGlvbih0KXtyZXR1cm5cIi1cIit0LnRvTG93ZXJDYXNlKCl9KX12YXIgcz1kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUscj1cInN0cmluZ1wiPT10eXBlb2Ygcy50cmFuc2l0aW9uP1widHJhbnNpdGlvblwiOlwiV2Via2l0VHJhbnNpdGlvblwiLGE9XCJzdHJpbmdcIj09dHlwZW9mIHMudHJhbnNmb3JtP1widHJhbnNmb3JtXCI6XCJXZWJraXRUcmFuc2Zvcm1cIix1PXtXZWJraXRUcmFuc2l0aW9uOlwid2Via2l0VHJhbnNpdGlvbkVuZFwiLHRyYW5zaXRpb246XCJ0cmFuc2l0aW9uZW5kXCJ9W3JdLGg9e3RyYW5zZm9ybTphLHRyYW5zaXRpb246cix0cmFuc2l0aW9uRHVyYXRpb246citcIkR1cmF0aW9uXCIsdHJhbnNpdGlvblByb3BlcnR5OnIrXCJQcm9wZXJ0eVwiLHRyYW5zaXRpb25EZWxheTpyK1wiRGVsYXlcIn0sZD1uLnByb3RvdHlwZT1PYmplY3QuY3JlYXRlKHQucHJvdG90eXBlKTtkLmNvbnN0cnVjdG9yPW4sZC5fY3JlYXRlPWZ1bmN0aW9uKCl7dGhpcy5fdHJhbnNuPXtpbmdQcm9wZXJ0aWVzOnt9LGNsZWFuOnt9LG9uRW5kOnt9fSx0aGlzLmNzcyh7cG9zaXRpb246XCJhYnNvbHV0ZVwifSl9LGQuaGFuZGxlRXZlbnQ9ZnVuY3Rpb24odCl7dmFyIGU9XCJvblwiK3QudHlwZTt0aGlzW2VdJiZ0aGlzW2VdKHQpfSxkLmdldFNpemU9ZnVuY3Rpb24oKXt0aGlzLnNpemU9ZSh0aGlzLmVsZW1lbnQpfSxkLmNzcz1mdW5jdGlvbih0KXt2YXIgZT10aGlzLmVsZW1lbnQuc3R5bGU7Zm9yKHZhciBpIGluIHQpe3ZhciBuPWhbaV18fGk7ZVtuXT10W2ldfX0sZC5nZXRQb3NpdGlvbj1mdW5jdGlvbigpe3ZhciB0PWdldENvbXB1dGVkU3R5bGUodGhpcy5lbGVtZW50KSxlPXRoaXMubGF5b3V0Ll9nZXRPcHRpb24oXCJvcmlnaW5MZWZ0XCIpLGk9dGhpcy5sYXlvdXQuX2dldE9wdGlvbihcIm9yaWdpblRvcFwiKSxuPXRbZT9cImxlZnRcIjpcInJpZ2h0XCJdLG89dFtpP1widG9wXCI6XCJib3R0b21cIl0scz10aGlzLmxheW91dC5zaXplLHI9LTEhPW4uaW5kZXhPZihcIiVcIik/cGFyc2VGbG9hdChuKS8xMDAqcy53aWR0aDpwYXJzZUludChuLDEwKSxhPS0xIT1vLmluZGV4T2YoXCIlXCIpP3BhcnNlRmxvYXQobykvMTAwKnMuaGVpZ2h0OnBhcnNlSW50KG8sMTApO3I9aXNOYU4ocik/MDpyLGE9aXNOYU4oYSk/MDphLHItPWU/cy5wYWRkaW5nTGVmdDpzLnBhZGRpbmdSaWdodCxhLT1pP3MucGFkZGluZ1RvcDpzLnBhZGRpbmdCb3R0b20sdGhpcy5wb3NpdGlvbi54PXIsdGhpcy5wb3NpdGlvbi55PWF9LGQubGF5b3V0UG9zaXRpb249ZnVuY3Rpb24oKXt2YXIgdD10aGlzLmxheW91dC5zaXplLGU9e30saT10aGlzLmxheW91dC5fZ2V0T3B0aW9uKFwib3JpZ2luTGVmdFwiKSxuPXRoaXMubGF5b3V0Ll9nZXRPcHRpb24oXCJvcmlnaW5Ub3BcIiksbz1pP1wicGFkZGluZ0xlZnRcIjpcInBhZGRpbmdSaWdodFwiLHM9aT9cImxlZnRcIjpcInJpZ2h0XCIscj1pP1wicmlnaHRcIjpcImxlZnRcIixhPXRoaXMucG9zaXRpb24ueCt0W29dO2Vbc109dGhpcy5nZXRYVmFsdWUoYSksZVtyXT1cIlwiO3ZhciB1PW4/XCJwYWRkaW5nVG9wXCI6XCJwYWRkaW5nQm90dG9tXCIsaD1uP1widG9wXCI6XCJib3R0b21cIixkPW4/XCJib3R0b21cIjpcInRvcFwiLGw9dGhpcy5wb3NpdGlvbi55K3RbdV07ZVtoXT10aGlzLmdldFlWYWx1ZShsKSxlW2RdPVwiXCIsdGhpcy5jc3MoZSksdGhpcy5lbWl0RXZlbnQoXCJsYXlvdXRcIixbdGhpc10pfSxkLmdldFhWYWx1ZT1mdW5jdGlvbih0KXt2YXIgZT10aGlzLmxheW91dC5fZ2V0T3B0aW9uKFwiaG9yaXpvbnRhbFwiKTtyZXR1cm4gdGhpcy5sYXlvdXQub3B0aW9ucy5wZXJjZW50UG9zaXRpb24mJiFlP3QvdGhpcy5sYXlvdXQuc2l6ZS53aWR0aCoxMDArXCIlXCI6dCtcInB4XCJ9LGQuZ2V0WVZhbHVlPWZ1bmN0aW9uKHQpe3ZhciBlPXRoaXMubGF5b3V0Ll9nZXRPcHRpb24oXCJob3Jpem9udGFsXCIpO3JldHVybiB0aGlzLmxheW91dC5vcHRpb25zLnBlcmNlbnRQb3NpdGlvbiYmZT90L3RoaXMubGF5b3V0LnNpemUuaGVpZ2h0KjEwMCtcIiVcIjp0K1wicHhcIn0sZC5fdHJhbnNpdGlvblRvPWZ1bmN0aW9uKHQsZSl7dGhpcy5nZXRQb3NpdGlvbigpO3ZhciBpPXRoaXMucG9zaXRpb24ueCxuPXRoaXMucG9zaXRpb24ueSxvPXBhcnNlSW50KHQsMTApLHM9cGFyc2VJbnQoZSwxMCkscj1vPT09dGhpcy5wb3NpdGlvbi54JiZzPT09dGhpcy5wb3NpdGlvbi55O2lmKHRoaXMuc2V0UG9zaXRpb24odCxlKSxyJiYhdGhpcy5pc1RyYW5zaXRpb25pbmcpcmV0dXJuIHZvaWQgdGhpcy5sYXlvdXRQb3NpdGlvbigpO3ZhciBhPXQtaSx1PWUtbixoPXt9O2gudHJhbnNmb3JtPXRoaXMuZ2V0VHJhbnNsYXRlKGEsdSksdGhpcy50cmFuc2l0aW9uKHt0bzpoLG9uVHJhbnNpdGlvbkVuZDp7dHJhbnNmb3JtOnRoaXMubGF5b3V0UG9zaXRpb259LGlzQ2xlYW5pbmc6ITB9KX0sZC5nZXRUcmFuc2xhdGU9ZnVuY3Rpb24odCxlKXt2YXIgaT10aGlzLmxheW91dC5fZ2V0T3B0aW9uKFwib3JpZ2luTGVmdFwiKSxuPXRoaXMubGF5b3V0Ll9nZXRPcHRpb24oXCJvcmlnaW5Ub3BcIik7cmV0dXJuIHQ9aT90Oi10LGU9bj9lOi1lLFwidHJhbnNsYXRlM2QoXCIrdCtcInB4LCBcIitlK1wicHgsIDApXCJ9LGQuZ29Ubz1mdW5jdGlvbih0LGUpe3RoaXMuc2V0UG9zaXRpb24odCxlKSx0aGlzLmxheW91dFBvc2l0aW9uKCl9LGQubW92ZVRvPWQuX3RyYW5zaXRpb25UbyxkLnNldFBvc2l0aW9uPWZ1bmN0aW9uKHQsZSl7dGhpcy5wb3NpdGlvbi54PXBhcnNlSW50KHQsMTApLHRoaXMucG9zaXRpb24ueT1wYXJzZUludChlLDEwKX0sZC5fbm9uVHJhbnNpdGlvbj1mdW5jdGlvbih0KXt0aGlzLmNzcyh0LnRvKSx0LmlzQ2xlYW5pbmcmJnRoaXMuX3JlbW92ZVN0eWxlcyh0LnRvKTtmb3IodmFyIGUgaW4gdC5vblRyYW5zaXRpb25FbmQpdC5vblRyYW5zaXRpb25FbmRbZV0uY2FsbCh0aGlzKX0sZC50cmFuc2l0aW9uPWZ1bmN0aW9uKHQpe2lmKCFwYXJzZUZsb2F0KHRoaXMubGF5b3V0Lm9wdGlvbnMudHJhbnNpdGlvbkR1cmF0aW9uKSlyZXR1cm4gdm9pZCB0aGlzLl9ub25UcmFuc2l0aW9uKHQpO3ZhciBlPXRoaXMuX3RyYW5zbjtmb3IodmFyIGkgaW4gdC5vblRyYW5zaXRpb25FbmQpZS5vbkVuZFtpXT10Lm9uVHJhbnNpdGlvbkVuZFtpXTtmb3IoaSBpbiB0LnRvKWUuaW5nUHJvcGVydGllc1tpXT0hMCx0LmlzQ2xlYW5pbmcmJihlLmNsZWFuW2ldPSEwKTtpZih0LmZyb20pe3RoaXMuY3NzKHQuZnJvbSk7dmFyIG49dGhpcy5lbGVtZW50Lm9mZnNldEhlaWdodDtuPW51bGx9dGhpcy5lbmFibGVUcmFuc2l0aW9uKHQudG8pLHRoaXMuY3NzKHQudG8pLHRoaXMuaXNUcmFuc2l0aW9uaW5nPSEwfTt2YXIgbD1cIm9wYWNpdHksXCIrbyhhKTtkLmVuYWJsZVRyYW5zaXRpb249ZnVuY3Rpb24oKXtpZighdGhpcy5pc1RyYW5zaXRpb25pbmcpe3ZhciB0PXRoaXMubGF5b3V0Lm9wdGlvbnMudHJhbnNpdGlvbkR1cmF0aW9uO3Q9XCJudW1iZXJcIj09dHlwZW9mIHQ/dCtcIm1zXCI6dCx0aGlzLmNzcyh7dHJhbnNpdGlvblByb3BlcnR5OmwsdHJhbnNpdGlvbkR1cmF0aW9uOnQsdHJhbnNpdGlvbkRlbGF5OnRoaXMuc3RhZ2dlckRlbGF5fHwwfSksdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIodSx0aGlzLCExKX19LGQub253ZWJraXRUcmFuc2l0aW9uRW5kPWZ1bmN0aW9uKHQpe3RoaXMub250cmFuc2l0aW9uZW5kKHQpfSxkLm9ub3RyYW5zaXRpb25lbmQ9ZnVuY3Rpb24odCl7dGhpcy5vbnRyYW5zaXRpb25lbmQodCl9O3ZhciBmPXtcIi13ZWJraXQtdHJhbnNmb3JtXCI6XCJ0cmFuc2Zvcm1cIn07ZC5vbnRyYW5zaXRpb25lbmQ9ZnVuY3Rpb24odCl7aWYodC50YXJnZXQ9PT10aGlzLmVsZW1lbnQpe3ZhciBlPXRoaXMuX3RyYW5zbixuPWZbdC5wcm9wZXJ0eU5hbWVdfHx0LnByb3BlcnR5TmFtZTtpZihkZWxldGUgZS5pbmdQcm9wZXJ0aWVzW25dLGkoZS5pbmdQcm9wZXJ0aWVzKSYmdGhpcy5kaXNhYmxlVHJhbnNpdGlvbigpLG4gaW4gZS5jbGVhbiYmKHRoaXMuZWxlbWVudC5zdHlsZVt0LnByb3BlcnR5TmFtZV09XCJcIixkZWxldGUgZS5jbGVhbltuXSksbiBpbiBlLm9uRW5kKXt2YXIgbz1lLm9uRW5kW25dO28uY2FsbCh0aGlzKSxkZWxldGUgZS5vbkVuZFtuXX10aGlzLmVtaXRFdmVudChcInRyYW5zaXRpb25FbmRcIixbdGhpc10pfX0sZC5kaXNhYmxlVHJhbnNpdGlvbj1mdW5jdGlvbigpe3RoaXMucmVtb3ZlVHJhbnNpdGlvblN0eWxlcygpLHRoaXMuZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKHUsdGhpcywhMSksdGhpcy5pc1RyYW5zaXRpb25pbmc9ITF9LGQuX3JlbW92ZVN0eWxlcz1mdW5jdGlvbih0KXt2YXIgZT17fTtmb3IodmFyIGkgaW4gdCllW2ldPVwiXCI7dGhpcy5jc3MoZSl9O3ZhciBjPXt0cmFuc2l0aW9uUHJvcGVydHk6XCJcIix0cmFuc2l0aW9uRHVyYXRpb246XCJcIix0cmFuc2l0aW9uRGVsYXk6XCJcIn07cmV0dXJuIGQucmVtb3ZlVHJhbnNpdGlvblN0eWxlcz1mdW5jdGlvbigpe3RoaXMuY3NzKGMpfSxkLnN0YWdnZXI9ZnVuY3Rpb24odCl7dD1pc05hTih0KT8wOnQsdGhpcy5zdGFnZ2VyRGVsYXk9dCtcIm1zXCJ9LGQucmVtb3ZlRWxlbT1mdW5jdGlvbigpe3RoaXMuZWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMuZWxlbWVudCksdGhpcy5jc3Moe2Rpc3BsYXk6XCJcIn0pLHRoaXMuZW1pdEV2ZW50KFwicmVtb3ZlXCIsW3RoaXNdKX0sZC5yZW1vdmU9ZnVuY3Rpb24oKXtyZXR1cm4gciYmcGFyc2VGbG9hdCh0aGlzLmxheW91dC5vcHRpb25zLnRyYW5zaXRpb25EdXJhdGlvbik/KHRoaXMub25jZShcInRyYW5zaXRpb25FbmRcIixmdW5jdGlvbigpe3RoaXMucmVtb3ZlRWxlbSgpfSksdm9pZCB0aGlzLmhpZGUoKSk6dm9pZCB0aGlzLnJlbW92ZUVsZW0oKX0sZC5yZXZlYWw9ZnVuY3Rpb24oKXtkZWxldGUgdGhpcy5pc0hpZGRlbix0aGlzLmNzcyh7ZGlzcGxheTpcIlwifSk7dmFyIHQ9dGhpcy5sYXlvdXQub3B0aW9ucyxlPXt9LGk9dGhpcy5nZXRIaWRlUmV2ZWFsVHJhbnNpdGlvbkVuZFByb3BlcnR5KFwidmlzaWJsZVN0eWxlXCIpO2VbaV09dGhpcy5vblJldmVhbFRyYW5zaXRpb25FbmQsdGhpcy50cmFuc2l0aW9uKHtmcm9tOnQuaGlkZGVuU3R5bGUsdG86dC52aXNpYmxlU3R5bGUsaXNDbGVhbmluZzohMCxvblRyYW5zaXRpb25FbmQ6ZX0pfSxkLm9uUmV2ZWFsVHJhbnNpdGlvbkVuZD1mdW5jdGlvbigpe3RoaXMuaXNIaWRkZW58fHRoaXMuZW1pdEV2ZW50KFwicmV2ZWFsXCIpfSxkLmdldEhpZGVSZXZlYWxUcmFuc2l0aW9uRW5kUHJvcGVydHk9ZnVuY3Rpb24odCl7dmFyIGU9dGhpcy5sYXlvdXQub3B0aW9uc1t0XTtpZihlLm9wYWNpdHkpcmV0dXJuXCJvcGFjaXR5XCI7Zm9yKHZhciBpIGluIGUpcmV0dXJuIGl9LGQuaGlkZT1mdW5jdGlvbigpe3RoaXMuaXNIaWRkZW49ITAsdGhpcy5jc3Moe2Rpc3BsYXk6XCJcIn0pO3ZhciB0PXRoaXMubGF5b3V0Lm9wdGlvbnMsZT17fSxpPXRoaXMuZ2V0SGlkZVJldmVhbFRyYW5zaXRpb25FbmRQcm9wZXJ0eShcImhpZGRlblN0eWxlXCIpO2VbaV09dGhpcy5vbkhpZGVUcmFuc2l0aW9uRW5kLHRoaXMudHJhbnNpdGlvbih7ZnJvbTp0LnZpc2libGVTdHlsZSx0bzp0LmhpZGRlblN0eWxlLGlzQ2xlYW5pbmc6ITAsb25UcmFuc2l0aW9uRW5kOmV9KX0sZC5vbkhpZGVUcmFuc2l0aW9uRW5kPWZ1bmN0aW9uKCl7dGhpcy5pc0hpZGRlbiYmKHRoaXMuY3NzKHtkaXNwbGF5Olwibm9uZVwifSksdGhpcy5lbWl0RXZlbnQoXCJoaWRlXCIpKX0sZC5kZXN0cm95PWZ1bmN0aW9uKCl7dGhpcy5jc3Moe3Bvc2l0aW9uOlwiXCIsbGVmdDpcIlwiLHJpZ2h0OlwiXCIsdG9wOlwiXCIsYm90dG9tOlwiXCIsdHJhbnNpdGlvbjpcIlwiLHRyYW5zZm9ybTpcIlwifSl9LG59KSxmdW5jdGlvbih0LGUpe1widXNlIHN0cmljdFwiO1wiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZD9kZWZpbmUoXCJvdXRsYXllci9vdXRsYXllclwiLFtcImV2LWVtaXR0ZXIvZXYtZW1pdHRlclwiLFwiZ2V0LXNpemUvZ2V0LXNpemVcIixcImZpenp5LXVpLXV0aWxzL3V0aWxzXCIsXCIuL2l0ZW1cIl0sZnVuY3Rpb24oaSxuLG8scyl7cmV0dXJuIGUodCxpLG4sbyxzKX0pOlwib2JqZWN0XCI9PXR5cGVvZiBtb2R1bGUmJm1vZHVsZS5leHBvcnRzP21vZHVsZS5leHBvcnRzPWUodCxyZXF1aXJlKFwiZXYtZW1pdHRlclwiKSxyZXF1aXJlKFwiZ2V0LXNpemVcIikscmVxdWlyZShcImZpenp5LXVpLXV0aWxzXCIpLHJlcXVpcmUoXCIuL2l0ZW1cIikpOnQuT3V0bGF5ZXI9ZSh0LHQuRXZFbWl0dGVyLHQuZ2V0U2l6ZSx0LmZpenp5VUlVdGlscyx0Lk91dGxheWVyLkl0ZW0pfSh3aW5kb3csZnVuY3Rpb24odCxlLGksbixvKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBzKHQsZSl7dmFyIGk9bi5nZXRRdWVyeUVsZW1lbnQodCk7aWYoIWkpcmV0dXJuIHZvaWQodSYmdS5lcnJvcihcIkJhZCBlbGVtZW50IGZvciBcIit0aGlzLmNvbnN0cnVjdG9yLm5hbWVzcGFjZStcIjogXCIrKGl8fHQpKSk7dGhpcy5lbGVtZW50PWksaCYmKHRoaXMuJGVsZW1lbnQ9aCh0aGlzLmVsZW1lbnQpKSx0aGlzLm9wdGlvbnM9bi5leHRlbmQoe30sdGhpcy5jb25zdHJ1Y3Rvci5kZWZhdWx0cyksdGhpcy5vcHRpb24oZSk7dmFyIG89KytsO3RoaXMuZWxlbWVudC5vdXRsYXllckdVSUQ9byxmW29dPXRoaXMsdGhpcy5fY3JlYXRlKCk7dmFyIHM9dGhpcy5fZ2V0T3B0aW9uKFwiaW5pdExheW91dFwiKTtzJiZ0aGlzLmxheW91dCgpfWZ1bmN0aW9uIHIodCl7ZnVuY3Rpb24gZSgpe3QuYXBwbHkodGhpcyxhcmd1bWVudHMpfXJldHVybiBlLnByb3RvdHlwZT1PYmplY3QuY3JlYXRlKHQucHJvdG90eXBlKSxlLnByb3RvdHlwZS5jb25zdHJ1Y3Rvcj1lLGV9ZnVuY3Rpb24gYSh0KXtpZihcIm51bWJlclwiPT10eXBlb2YgdClyZXR1cm4gdDt2YXIgZT10Lm1hdGNoKC8oXlxcZCpcXC4/XFxkKikoXFx3KikvKSxpPWUmJmVbMV0sbj1lJiZlWzJdO2lmKCFpLmxlbmd0aClyZXR1cm4gMDtpPXBhcnNlRmxvYXQoaSk7dmFyIG89bVtuXXx8MTtyZXR1cm4gaSpvfXZhciB1PXQuY29uc29sZSxoPXQualF1ZXJ5LGQ9ZnVuY3Rpb24oKXt9LGw9MCxmPXt9O3MubmFtZXNwYWNlPVwib3V0bGF5ZXJcIixzLkl0ZW09byxzLmRlZmF1bHRzPXtjb250YWluZXJTdHlsZTp7cG9zaXRpb246XCJyZWxhdGl2ZVwifSxpbml0TGF5b3V0OiEwLG9yaWdpbkxlZnQ6ITAsb3JpZ2luVG9wOiEwLHJlc2l6ZTohMCxyZXNpemVDb250YWluZXI6ITAsdHJhbnNpdGlvbkR1cmF0aW9uOlwiMC40c1wiLGhpZGRlblN0eWxlOntvcGFjaXR5OjAsdHJhbnNmb3JtOlwic2NhbGUoMC4wMDEpXCJ9LHZpc2libGVTdHlsZTp7b3BhY2l0eToxLHRyYW5zZm9ybTpcInNjYWxlKDEpXCJ9fTt2YXIgYz1zLnByb3RvdHlwZTtuLmV4dGVuZChjLGUucHJvdG90eXBlKSxjLm9wdGlvbj1mdW5jdGlvbih0KXtuLmV4dGVuZCh0aGlzLm9wdGlvbnMsdCl9LGMuX2dldE9wdGlvbj1mdW5jdGlvbih0KXt2YXIgZT10aGlzLmNvbnN0cnVjdG9yLmNvbXBhdE9wdGlvbnNbdF07cmV0dXJuIGUmJnZvaWQgMCE9PXRoaXMub3B0aW9uc1tlXT90aGlzLm9wdGlvbnNbZV06dGhpcy5vcHRpb25zW3RdfSxzLmNvbXBhdE9wdGlvbnM9e2luaXRMYXlvdXQ6XCJpc0luaXRMYXlvdXRcIixob3Jpem9udGFsOlwiaXNIb3Jpem9udGFsXCIsbGF5b3V0SW5zdGFudDpcImlzTGF5b3V0SW5zdGFudFwiLG9yaWdpbkxlZnQ6XCJpc09yaWdpbkxlZnRcIixvcmlnaW5Ub3A6XCJpc09yaWdpblRvcFwiLHJlc2l6ZTpcImlzUmVzaXplQm91bmRcIixyZXNpemVDb250YWluZXI6XCJpc1Jlc2l6aW5nQ29udGFpbmVyXCJ9LGMuX2NyZWF0ZT1mdW5jdGlvbigpe3RoaXMucmVsb2FkSXRlbXMoKSx0aGlzLnN0YW1wcz1bXSx0aGlzLnN0YW1wKHRoaXMub3B0aW9ucy5zdGFtcCksbi5leHRlbmQodGhpcy5lbGVtZW50LnN0eWxlLHRoaXMub3B0aW9ucy5jb250YWluZXJTdHlsZSk7dmFyIHQ9dGhpcy5fZ2V0T3B0aW9uKFwicmVzaXplXCIpO3QmJnRoaXMuYmluZFJlc2l6ZSgpfSxjLnJlbG9hZEl0ZW1zPWZ1bmN0aW9uKCl7dGhpcy5pdGVtcz10aGlzLl9pdGVtaXplKHRoaXMuZWxlbWVudC5jaGlsZHJlbil9LGMuX2l0ZW1pemU9ZnVuY3Rpb24odCl7Zm9yKHZhciBlPXRoaXMuX2ZpbHRlckZpbmRJdGVtRWxlbWVudHModCksaT10aGlzLmNvbnN0cnVjdG9yLkl0ZW0sbj1bXSxvPTA7bzxlLmxlbmd0aDtvKyspe3ZhciBzPWVbb10scj1uZXcgaShzLHRoaXMpO24ucHVzaChyKX1yZXR1cm4gbn0sYy5fZmlsdGVyRmluZEl0ZW1FbGVtZW50cz1mdW5jdGlvbih0KXtyZXR1cm4gbi5maWx0ZXJGaW5kRWxlbWVudHModCx0aGlzLm9wdGlvbnMuaXRlbVNlbGVjdG9yKX0sYy5nZXRJdGVtRWxlbWVudHM9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5pdGVtcy5tYXAoZnVuY3Rpb24odCl7cmV0dXJuIHQuZWxlbWVudH0pfSxjLmxheW91dD1mdW5jdGlvbigpe3RoaXMuX3Jlc2V0TGF5b3V0KCksdGhpcy5fbWFuYWdlU3RhbXBzKCk7dmFyIHQ9dGhpcy5fZ2V0T3B0aW9uKFwibGF5b3V0SW5zdGFudFwiKSxlPXZvaWQgMCE9PXQ/dDohdGhpcy5faXNMYXlvdXRJbml0ZWQ7dGhpcy5sYXlvdXRJdGVtcyh0aGlzLml0ZW1zLGUpLHRoaXMuX2lzTGF5b3V0SW5pdGVkPSEwfSxjLl9pbml0PWMubGF5b3V0LGMuX3Jlc2V0TGF5b3V0PWZ1bmN0aW9uKCl7dGhpcy5nZXRTaXplKCl9LGMuZ2V0U2l6ZT1mdW5jdGlvbigpe3RoaXMuc2l6ZT1pKHRoaXMuZWxlbWVudCl9LGMuX2dldE1lYXN1cmVtZW50PWZ1bmN0aW9uKHQsZSl7dmFyIG4sbz10aGlzLm9wdGlvbnNbdF07bz8oXCJzdHJpbmdcIj09dHlwZW9mIG8/bj10aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcihvKTpvIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQmJihuPW8pLHRoaXNbdF09bj9pKG4pW2VdOm8pOnRoaXNbdF09MH0sYy5sYXlvdXRJdGVtcz1mdW5jdGlvbih0LGUpe3Q9dGhpcy5fZ2V0SXRlbXNGb3JMYXlvdXQodCksdGhpcy5fbGF5b3V0SXRlbXModCxlKSx0aGlzLl9wb3N0TGF5b3V0KCl9LGMuX2dldEl0ZW1zRm9yTGF5b3V0PWZ1bmN0aW9uKHQpe3JldHVybiB0LmZpbHRlcihmdW5jdGlvbih0KXtyZXR1cm4hdC5pc0lnbm9yZWR9KX0sYy5fbGF5b3V0SXRlbXM9ZnVuY3Rpb24odCxlKXtpZih0aGlzLl9lbWl0Q29tcGxldGVPbkl0ZW1zKFwibGF5b3V0XCIsdCksdCYmdC5sZW5ndGgpe3ZhciBpPVtdO3QuZm9yRWFjaChmdW5jdGlvbih0KXt2YXIgbj10aGlzLl9nZXRJdGVtTGF5b3V0UG9zaXRpb24odCk7bi5pdGVtPXQsbi5pc0luc3RhbnQ9ZXx8dC5pc0xheW91dEluc3RhbnQsaS5wdXNoKG4pfSx0aGlzKSx0aGlzLl9wcm9jZXNzTGF5b3V0UXVldWUoaSl9fSxjLl9nZXRJdGVtTGF5b3V0UG9zaXRpb249ZnVuY3Rpb24oKXtyZXR1cm57eDowLHk6MH19LGMuX3Byb2Nlc3NMYXlvdXRRdWV1ZT1mdW5jdGlvbih0KXt0aGlzLnVwZGF0ZVN0YWdnZXIoKSx0LmZvckVhY2goZnVuY3Rpb24odCxlKXt0aGlzLl9wb3NpdGlvbkl0ZW0odC5pdGVtLHQueCx0LnksdC5pc0luc3RhbnQsZSl9LHRoaXMpfSxjLnVwZGF0ZVN0YWdnZXI9ZnVuY3Rpb24oKXt2YXIgdD10aGlzLm9wdGlvbnMuc3RhZ2dlcjtyZXR1cm4gbnVsbD09PXR8fHZvaWQgMD09PXQ/dm9pZCh0aGlzLnN0YWdnZXI9MCk6KHRoaXMuc3RhZ2dlcj1hKHQpLHRoaXMuc3RhZ2dlcil9LGMuX3Bvc2l0aW9uSXRlbT1mdW5jdGlvbih0LGUsaSxuLG8pe24/dC5nb1RvKGUsaSk6KHQuc3RhZ2dlcihvKnRoaXMuc3RhZ2dlciksdC5tb3ZlVG8oZSxpKSl9LGMuX3Bvc3RMYXlvdXQ9ZnVuY3Rpb24oKXt0aGlzLnJlc2l6ZUNvbnRhaW5lcigpfSxjLnJlc2l6ZUNvbnRhaW5lcj1mdW5jdGlvbigpe3ZhciB0PXRoaXMuX2dldE9wdGlvbihcInJlc2l6ZUNvbnRhaW5lclwiKTtpZih0KXt2YXIgZT10aGlzLl9nZXRDb250YWluZXJTaXplKCk7ZSYmKHRoaXMuX3NldENvbnRhaW5lck1lYXN1cmUoZS53aWR0aCwhMCksdGhpcy5fc2V0Q29udGFpbmVyTWVhc3VyZShlLmhlaWdodCwhMSkpfX0sYy5fZ2V0Q29udGFpbmVyU2l6ZT1kLGMuX3NldENvbnRhaW5lck1lYXN1cmU9ZnVuY3Rpb24odCxlKXtpZih2b2lkIDAhPT10KXt2YXIgaT10aGlzLnNpemU7aS5pc0JvcmRlckJveCYmKHQrPWU/aS5wYWRkaW5nTGVmdCtpLnBhZGRpbmdSaWdodCtpLmJvcmRlckxlZnRXaWR0aCtpLmJvcmRlclJpZ2h0V2lkdGg6aS5wYWRkaW5nQm90dG9tK2kucGFkZGluZ1RvcCtpLmJvcmRlclRvcFdpZHRoK2kuYm9yZGVyQm90dG9tV2lkdGgpLHQ9TWF0aC5tYXgodCwwKSx0aGlzLmVsZW1lbnQuc3R5bGVbZT9cIndpZHRoXCI6XCJoZWlnaHRcIl09dCtcInB4XCJ9fSxjLl9lbWl0Q29tcGxldGVPbkl0ZW1zPWZ1bmN0aW9uKHQsZSl7ZnVuY3Rpb24gaSgpe28uZGlzcGF0Y2hFdmVudCh0K1wiQ29tcGxldGVcIixudWxsLFtlXSl9ZnVuY3Rpb24gbigpe3IrKyxyPT1zJiZpKCl9dmFyIG89dGhpcyxzPWUubGVuZ3RoO2lmKCFlfHwhcylyZXR1cm4gdm9pZCBpKCk7dmFyIHI9MDtlLmZvckVhY2goZnVuY3Rpb24oZSl7ZS5vbmNlKHQsbil9KX0sYy5kaXNwYXRjaEV2ZW50PWZ1bmN0aW9uKHQsZSxpKXt2YXIgbj1lP1tlXS5jb25jYXQoaSk6aTtpZih0aGlzLmVtaXRFdmVudCh0LG4pLGgpaWYodGhpcy4kZWxlbWVudD10aGlzLiRlbGVtZW50fHxoKHRoaXMuZWxlbWVudCksZSl7dmFyIG89aC5FdmVudChlKTtvLnR5cGU9dCx0aGlzLiRlbGVtZW50LnRyaWdnZXIobyxpKX1lbHNlIHRoaXMuJGVsZW1lbnQudHJpZ2dlcih0LGkpfSxjLmlnbm9yZT1mdW5jdGlvbih0KXt2YXIgZT10aGlzLmdldEl0ZW0odCk7ZSYmKGUuaXNJZ25vcmVkPSEwKX0sYy51bmlnbm9yZT1mdW5jdGlvbih0KXt2YXIgZT10aGlzLmdldEl0ZW0odCk7ZSYmZGVsZXRlIGUuaXNJZ25vcmVkfSxjLnN0YW1wPWZ1bmN0aW9uKHQpe3Q9dGhpcy5fZmluZCh0KSx0JiYodGhpcy5zdGFtcHM9dGhpcy5zdGFtcHMuY29uY2F0KHQpLHQuZm9yRWFjaCh0aGlzLmlnbm9yZSx0aGlzKSl9LGMudW5zdGFtcD1mdW5jdGlvbih0KXt0PXRoaXMuX2ZpbmQodCksdCYmdC5mb3JFYWNoKGZ1bmN0aW9uKHQpe24ucmVtb3ZlRnJvbSh0aGlzLnN0YW1wcyx0KSx0aGlzLnVuaWdub3JlKHQpfSx0aGlzKX0sYy5fZmluZD1mdW5jdGlvbih0KXtyZXR1cm4gdD8oXCJzdHJpbmdcIj09dHlwZW9mIHQmJih0PXRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKHQpKSx0PW4ubWFrZUFycmF5KHQpKTp2b2lkIDB9LGMuX21hbmFnZVN0YW1wcz1mdW5jdGlvbigpe3RoaXMuc3RhbXBzJiZ0aGlzLnN0YW1wcy5sZW5ndGgmJih0aGlzLl9nZXRCb3VuZGluZ1JlY3QoKSx0aGlzLnN0YW1wcy5mb3JFYWNoKHRoaXMuX21hbmFnZVN0YW1wLHRoaXMpKX0sYy5fZ2V0Qm91bmRpbmdSZWN0PWZ1bmN0aW9uKCl7dmFyIHQ9dGhpcy5lbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLGU9dGhpcy5zaXplO3RoaXMuX2JvdW5kaW5nUmVjdD17bGVmdDp0LmxlZnQrZS5wYWRkaW5nTGVmdCtlLmJvcmRlckxlZnRXaWR0aCx0b3A6dC50b3ArZS5wYWRkaW5nVG9wK2UuYm9yZGVyVG9wV2lkdGgscmlnaHQ6dC5yaWdodC0oZS5wYWRkaW5nUmlnaHQrZS5ib3JkZXJSaWdodFdpZHRoKSxib3R0b206dC5ib3R0b20tKGUucGFkZGluZ0JvdHRvbStlLmJvcmRlckJvdHRvbVdpZHRoKX19LGMuX21hbmFnZVN0YW1wPWQsYy5fZ2V0RWxlbWVudE9mZnNldD1mdW5jdGlvbih0KXt2YXIgZT10LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLG49dGhpcy5fYm91bmRpbmdSZWN0LG89aSh0KSxzPXtsZWZ0OmUubGVmdC1uLmxlZnQtby5tYXJnaW5MZWZ0LHRvcDplLnRvcC1uLnRvcC1vLm1hcmdpblRvcCxyaWdodDpuLnJpZ2h0LWUucmlnaHQtby5tYXJnaW5SaWdodCxib3R0b206bi5ib3R0b20tZS5ib3R0b20tby5tYXJnaW5Cb3R0b219O3JldHVybiBzfSxjLmhhbmRsZUV2ZW50PW4uaGFuZGxlRXZlbnQsYy5iaW5kUmVzaXplPWZ1bmN0aW9uKCl7dC5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsdGhpcyksdGhpcy5pc1Jlc2l6ZUJvdW5kPSEwfSxjLnVuYmluZFJlc2l6ZT1mdW5jdGlvbigpe3QucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLHRoaXMpLHRoaXMuaXNSZXNpemVCb3VuZD0hMX0sYy5vbnJlc2l6ZT1mdW5jdGlvbigpe3RoaXMucmVzaXplKCl9LG4uZGVib3VuY2VNZXRob2QocyxcIm9ucmVzaXplXCIsMTAwKSxjLnJlc2l6ZT1mdW5jdGlvbigpe3RoaXMuaXNSZXNpemVCb3VuZCYmdGhpcy5uZWVkc1Jlc2l6ZUxheW91dCgpJiZ0aGlzLmxheW91dCgpfSxjLm5lZWRzUmVzaXplTGF5b3V0PWZ1bmN0aW9uKCl7dmFyIHQ9aSh0aGlzLmVsZW1lbnQpLGU9dGhpcy5zaXplJiZ0O3JldHVybiBlJiZ0LmlubmVyV2lkdGghPT10aGlzLnNpemUuaW5uZXJXaWR0aH0sYy5hZGRJdGVtcz1mdW5jdGlvbih0KXt2YXIgZT10aGlzLl9pdGVtaXplKHQpO3JldHVybiBlLmxlbmd0aCYmKHRoaXMuaXRlbXM9dGhpcy5pdGVtcy5jb25jYXQoZSkpLGV9LGMuYXBwZW5kZWQ9ZnVuY3Rpb24odCl7dmFyIGU9dGhpcy5hZGRJdGVtcyh0KTtlLmxlbmd0aCYmKHRoaXMubGF5b3V0SXRlbXMoZSwhMCksdGhpcy5yZXZlYWwoZSkpfSxjLnByZXBlbmRlZD1mdW5jdGlvbih0KXt2YXIgZT10aGlzLl9pdGVtaXplKHQpO2lmKGUubGVuZ3RoKXt2YXIgaT10aGlzLml0ZW1zLnNsaWNlKDApO3RoaXMuaXRlbXM9ZS5jb25jYXQoaSksdGhpcy5fcmVzZXRMYXlvdXQoKSx0aGlzLl9tYW5hZ2VTdGFtcHMoKSx0aGlzLmxheW91dEl0ZW1zKGUsITApLHRoaXMucmV2ZWFsKGUpLHRoaXMubGF5b3V0SXRlbXMoaSl9fSxjLnJldmVhbD1mdW5jdGlvbih0KXtpZih0aGlzLl9lbWl0Q29tcGxldGVPbkl0ZW1zKFwicmV2ZWFsXCIsdCksdCYmdC5sZW5ndGgpe3ZhciBlPXRoaXMudXBkYXRlU3RhZ2dlcigpO3QuZm9yRWFjaChmdW5jdGlvbih0LGkpe3Quc3RhZ2dlcihpKmUpLHQucmV2ZWFsKCl9KX19LGMuaGlkZT1mdW5jdGlvbih0KXtpZih0aGlzLl9lbWl0Q29tcGxldGVPbkl0ZW1zKFwiaGlkZVwiLHQpLHQmJnQubGVuZ3RoKXt2YXIgZT10aGlzLnVwZGF0ZVN0YWdnZXIoKTt0LmZvckVhY2goZnVuY3Rpb24odCxpKXt0LnN0YWdnZXIoaSplKSx0LmhpZGUoKX0pfX0sYy5yZXZlYWxJdGVtRWxlbWVudHM9ZnVuY3Rpb24odCl7dmFyIGU9dGhpcy5nZXRJdGVtcyh0KTt0aGlzLnJldmVhbChlKX0sYy5oaWRlSXRlbUVsZW1lbnRzPWZ1bmN0aW9uKHQpe3ZhciBlPXRoaXMuZ2V0SXRlbXModCk7dGhpcy5oaWRlKGUpfSxjLmdldEl0ZW09ZnVuY3Rpb24odCl7Zm9yKHZhciBlPTA7ZTx0aGlzLml0ZW1zLmxlbmd0aDtlKyspe3ZhciBpPXRoaXMuaXRlbXNbZV07aWYoaS5lbGVtZW50PT10KXJldHVybiBpfX0sYy5nZXRJdGVtcz1mdW5jdGlvbih0KXt0PW4ubWFrZUFycmF5KHQpO3ZhciBlPVtdO3JldHVybiB0LmZvckVhY2goZnVuY3Rpb24odCl7dmFyIGk9dGhpcy5nZXRJdGVtKHQpO2kmJmUucHVzaChpKX0sdGhpcyksZX0sYy5yZW1vdmU9ZnVuY3Rpb24odCl7dmFyIGU9dGhpcy5nZXRJdGVtcyh0KTt0aGlzLl9lbWl0Q29tcGxldGVPbkl0ZW1zKFwicmVtb3ZlXCIsZSksZSYmZS5sZW5ndGgmJmUuZm9yRWFjaChmdW5jdGlvbih0KXt0LnJlbW92ZSgpLG4ucmVtb3ZlRnJvbSh0aGlzLml0ZW1zLHQpfSx0aGlzKX0sYy5kZXN0cm95PWZ1bmN0aW9uKCl7dmFyIHQ9dGhpcy5lbGVtZW50LnN0eWxlO3QuaGVpZ2h0PVwiXCIsdC5wb3NpdGlvbj1cIlwiLHQud2lkdGg9XCJcIix0aGlzLml0ZW1zLmZvckVhY2goZnVuY3Rpb24odCl7dC5kZXN0cm95KCl9KSx0aGlzLnVuYmluZFJlc2l6ZSgpO3ZhciBlPXRoaXMuZWxlbWVudC5vdXRsYXllckdVSUQ7ZGVsZXRlIGZbZV0sZGVsZXRlIHRoaXMuZWxlbWVudC5vdXRsYXllckdVSUQsaCYmaC5yZW1vdmVEYXRhKHRoaXMuZWxlbWVudCx0aGlzLmNvbnN0cnVjdG9yLm5hbWVzcGFjZSl9LHMuZGF0YT1mdW5jdGlvbih0KXt0PW4uZ2V0UXVlcnlFbGVtZW50KHQpO3ZhciBlPXQmJnQub3V0bGF5ZXJHVUlEO3JldHVybiBlJiZmW2VdfSxzLmNyZWF0ZT1mdW5jdGlvbih0LGUpe3ZhciBpPXIocyk7cmV0dXJuIGkuZGVmYXVsdHM9bi5leHRlbmQoe30scy5kZWZhdWx0cyksbi5leHRlbmQoaS5kZWZhdWx0cyxlKSxpLmNvbXBhdE9wdGlvbnM9bi5leHRlbmQoe30scy5jb21wYXRPcHRpb25zKSxpLm5hbWVzcGFjZT10LGkuZGF0YT1zLmRhdGEsaS5JdGVtPXIobyksbi5odG1sSW5pdChpLHQpLGgmJmguYnJpZGdldCYmaC5icmlkZ2V0KHQsaSksaX07dmFyIG09e21zOjEsczoxZTN9O3JldHVybiBzLkl0ZW09byxzfSksZnVuY3Rpb24odCxlKXtcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQ/ZGVmaW5lKFwiaXNvdG9wZS9qcy9pdGVtXCIsW1wib3V0bGF5ZXIvb3V0bGF5ZXJcIl0sZSk6XCJvYmplY3RcIj09dHlwZW9mIG1vZHVsZSYmbW9kdWxlLmV4cG9ydHM/bW9kdWxlLmV4cG9ydHM9ZShyZXF1aXJlKFwib3V0bGF5ZXJcIikpOih0Lklzb3RvcGU9dC5Jc290b3BlfHx7fSx0Lklzb3RvcGUuSXRlbT1lKHQuT3V0bGF5ZXIpKX0od2luZG93LGZ1bmN0aW9uKHQpe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIGUoKXt0Lkl0ZW0uYXBwbHkodGhpcyxhcmd1bWVudHMpfXZhciBpPWUucHJvdG90eXBlPU9iamVjdC5jcmVhdGUodC5JdGVtLnByb3RvdHlwZSksbj1pLl9jcmVhdGU7aS5fY3JlYXRlPWZ1bmN0aW9uKCl7dGhpcy5pZD10aGlzLmxheW91dC5pdGVtR1VJRCsrLG4uY2FsbCh0aGlzKSx0aGlzLnNvcnREYXRhPXt9fSxpLnVwZGF0ZVNvcnREYXRhPWZ1bmN0aW9uKCl7aWYoIXRoaXMuaXNJZ25vcmVkKXt0aGlzLnNvcnREYXRhLmlkPXRoaXMuaWQsdGhpcy5zb3J0RGF0YVtcIm9yaWdpbmFsLW9yZGVyXCJdPXRoaXMuaWQsdGhpcy5zb3J0RGF0YS5yYW5kb209TWF0aC5yYW5kb20oKTt2YXIgdD10aGlzLmxheW91dC5vcHRpb25zLmdldFNvcnREYXRhLGU9dGhpcy5sYXlvdXQuX3NvcnRlcnM7Zm9yKHZhciBpIGluIHQpe3ZhciBuPWVbaV07dGhpcy5zb3J0RGF0YVtpXT1uKHRoaXMuZWxlbWVudCx0aGlzKX19fTt2YXIgbz1pLmRlc3Ryb3k7cmV0dXJuIGkuZGVzdHJveT1mdW5jdGlvbigpe28uYXBwbHkodGhpcyxhcmd1bWVudHMpLHRoaXMuY3NzKHtkaXNwbGF5OlwiXCJ9KX0sZX0pLGZ1bmN0aW9uKHQsZSl7XCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kP2RlZmluZShcImlzb3RvcGUvanMvbGF5b3V0LW1vZGVcIixbXCJnZXQtc2l6ZS9nZXQtc2l6ZVwiLFwib3V0bGF5ZXIvb3V0bGF5ZXJcIl0sZSk6XCJvYmplY3RcIj09dHlwZW9mIG1vZHVsZSYmbW9kdWxlLmV4cG9ydHM/bW9kdWxlLmV4cG9ydHM9ZShyZXF1aXJlKFwiZ2V0LXNpemVcIikscmVxdWlyZShcIm91dGxheWVyXCIpKToodC5Jc290b3BlPXQuSXNvdG9wZXx8e30sdC5Jc290b3BlLkxheW91dE1vZGU9ZSh0LmdldFNpemUsdC5PdXRsYXllcikpfSh3aW5kb3csZnVuY3Rpb24odCxlKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBpKHQpe3RoaXMuaXNvdG9wZT10LHQmJih0aGlzLm9wdGlvbnM9dC5vcHRpb25zW3RoaXMubmFtZXNwYWNlXSx0aGlzLmVsZW1lbnQ9dC5lbGVtZW50LHRoaXMuaXRlbXM9dC5maWx0ZXJlZEl0ZW1zLHRoaXMuc2l6ZT10LnNpemUpfXZhciBuPWkucHJvdG90eXBlLG89W1wiX3Jlc2V0TGF5b3V0XCIsXCJfZ2V0SXRlbUxheW91dFBvc2l0aW9uXCIsXCJfbWFuYWdlU3RhbXBcIixcIl9nZXRDb250YWluZXJTaXplXCIsXCJfZ2V0RWxlbWVudE9mZnNldFwiLFwibmVlZHNSZXNpemVMYXlvdXRcIixcIl9nZXRPcHRpb25cIl07cmV0dXJuIG8uZm9yRWFjaChmdW5jdGlvbih0KXtuW3RdPWZ1bmN0aW9uKCl7cmV0dXJuIGUucHJvdG90eXBlW3RdLmFwcGx5KHRoaXMuaXNvdG9wZSxhcmd1bWVudHMpfX0pLG4ubmVlZHNWZXJ0aWNhbFJlc2l6ZUxheW91dD1mdW5jdGlvbigpe3ZhciBlPXQodGhpcy5pc290b3BlLmVsZW1lbnQpLGk9dGhpcy5pc290b3BlLnNpemUmJmU7cmV0dXJuIGkmJmUuaW5uZXJIZWlnaHQhPXRoaXMuaXNvdG9wZS5zaXplLmlubmVySGVpZ2h0fSxuLl9nZXRNZWFzdXJlbWVudD1mdW5jdGlvbigpe3RoaXMuaXNvdG9wZS5fZ2V0TWVhc3VyZW1lbnQuYXBwbHkodGhpcyxhcmd1bWVudHMpfSxuLmdldENvbHVtbldpZHRoPWZ1bmN0aW9uKCl7dGhpcy5nZXRTZWdtZW50U2l6ZShcImNvbHVtblwiLFwiV2lkdGhcIil9LG4uZ2V0Um93SGVpZ2h0PWZ1bmN0aW9uKCl7dGhpcy5nZXRTZWdtZW50U2l6ZShcInJvd1wiLFwiSGVpZ2h0XCIpfSxuLmdldFNlZ21lbnRTaXplPWZ1bmN0aW9uKHQsZSl7dmFyIGk9dCtlLG49XCJvdXRlclwiK2U7aWYodGhpcy5fZ2V0TWVhc3VyZW1lbnQoaSxuKSwhdGhpc1tpXSl7dmFyIG89dGhpcy5nZXRGaXJzdEl0ZW1TaXplKCk7dGhpc1tpXT1vJiZvW25dfHx0aGlzLmlzb3RvcGUuc2l6ZVtcImlubmVyXCIrZV19fSxuLmdldEZpcnN0SXRlbVNpemU9ZnVuY3Rpb24oKXt2YXIgZT10aGlzLmlzb3RvcGUuZmlsdGVyZWRJdGVtc1swXTtyZXR1cm4gZSYmZS5lbGVtZW50JiZ0KGUuZWxlbWVudCl9LG4ubGF5b3V0PWZ1bmN0aW9uKCl7dGhpcy5pc290b3BlLmxheW91dC5hcHBseSh0aGlzLmlzb3RvcGUsYXJndW1lbnRzKX0sbi5nZXRTaXplPWZ1bmN0aW9uKCl7dGhpcy5pc290b3BlLmdldFNpemUoKSx0aGlzLnNpemU9dGhpcy5pc290b3BlLnNpemV9LGkubW9kZXM9e30saS5jcmVhdGU9ZnVuY3Rpb24odCxlKXtmdW5jdGlvbiBvKCl7aS5hcHBseSh0aGlzLGFyZ3VtZW50cyl9cmV0dXJuIG8ucHJvdG90eXBlPU9iamVjdC5jcmVhdGUobiksby5wcm90b3R5cGUuY29uc3RydWN0b3I9byxlJiYoby5vcHRpb25zPWUpLG8ucHJvdG90eXBlLm5hbWVzcGFjZT10LGkubW9kZXNbdF09byxvfSxpfSksZnVuY3Rpb24odCxlKXtcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQ/ZGVmaW5lKFwibWFzb25yeS9tYXNvbnJ5XCIsW1wib3V0bGF5ZXIvb3V0bGF5ZXJcIixcImdldC1zaXplL2dldC1zaXplXCJdLGUpOlwib2JqZWN0XCI9PXR5cGVvZiBtb2R1bGUmJm1vZHVsZS5leHBvcnRzP21vZHVsZS5leHBvcnRzPWUocmVxdWlyZShcIm91dGxheWVyXCIpLHJlcXVpcmUoXCJnZXQtc2l6ZVwiKSk6dC5NYXNvbnJ5PWUodC5PdXRsYXllcix0LmdldFNpemUpfSh3aW5kb3csZnVuY3Rpb24odCxlKXt2YXIgaT10LmNyZWF0ZShcIm1hc29ucnlcIik7cmV0dXJuIGkuY29tcGF0T3B0aW9ucy5maXRXaWR0aD1cImlzRml0V2lkdGhcIixpLnByb3RvdHlwZS5fcmVzZXRMYXlvdXQ9ZnVuY3Rpb24oKXt0aGlzLmdldFNpemUoKSx0aGlzLl9nZXRNZWFzdXJlbWVudChcImNvbHVtbldpZHRoXCIsXCJvdXRlcldpZHRoXCIpLHRoaXMuX2dldE1lYXN1cmVtZW50KFwiZ3V0dGVyXCIsXCJvdXRlcldpZHRoXCIpLHRoaXMubWVhc3VyZUNvbHVtbnMoKSx0aGlzLmNvbFlzPVtdO2Zvcih2YXIgdD0wO3Q8dGhpcy5jb2xzO3QrKyl0aGlzLmNvbFlzLnB1c2goMCk7dGhpcy5tYXhZPTB9LGkucHJvdG90eXBlLm1lYXN1cmVDb2x1bW5zPWZ1bmN0aW9uKCl7aWYodGhpcy5nZXRDb250YWluZXJXaWR0aCgpLCF0aGlzLmNvbHVtbldpZHRoKXt2YXIgdD10aGlzLml0ZW1zWzBdLGk9dCYmdC5lbGVtZW50O3RoaXMuY29sdW1uV2lkdGg9aSYmZShpKS5vdXRlcldpZHRofHx0aGlzLmNvbnRhaW5lcldpZHRofXZhciBuPXRoaXMuY29sdW1uV2lkdGgrPXRoaXMuZ3V0dGVyLG89dGhpcy5jb250YWluZXJXaWR0aCt0aGlzLmd1dHRlcixzPW8vbixyPW4tbyVuLGE9ciYmMT5yP1wicm91bmRcIjpcImZsb29yXCI7cz1NYXRoW2FdKHMpLHRoaXMuY29scz1NYXRoLm1heChzLDEpfSxpLnByb3RvdHlwZS5nZXRDb250YWluZXJXaWR0aD1mdW5jdGlvbigpe3ZhciB0PXRoaXMuX2dldE9wdGlvbihcImZpdFdpZHRoXCIpLGk9dD90aGlzLmVsZW1lbnQucGFyZW50Tm9kZTp0aGlzLmVsZW1lbnQsbj1lKGkpO3RoaXMuY29udGFpbmVyV2lkdGg9biYmbi5pbm5lcldpZHRofSxpLnByb3RvdHlwZS5fZ2V0SXRlbUxheW91dFBvc2l0aW9uPWZ1bmN0aW9uKHQpe3QuZ2V0U2l6ZSgpO3ZhciBlPXQuc2l6ZS5vdXRlcldpZHRoJXRoaXMuY29sdW1uV2lkdGgsaT1lJiYxPmU/XCJyb3VuZFwiOlwiY2VpbFwiLG49TWF0aFtpXSh0LnNpemUub3V0ZXJXaWR0aC90aGlzLmNvbHVtbldpZHRoKTtuPU1hdGgubWluKG4sdGhpcy5jb2xzKTtmb3IodmFyIG89dGhpcy5fZ2V0Q29sR3JvdXAobikscz1NYXRoLm1pbi5hcHBseShNYXRoLG8pLHI9by5pbmRleE9mKHMpLGE9e3g6dGhpcy5jb2x1bW5XaWR0aCpyLHk6c30sdT1zK3Quc2l6ZS5vdXRlckhlaWdodCxoPXRoaXMuY29scysxLW8ubGVuZ3RoLGQ9MDtoPmQ7ZCsrKXRoaXMuY29sWXNbcitkXT11O3JldHVybiBhfSxpLnByb3RvdHlwZS5fZ2V0Q29sR3JvdXA9ZnVuY3Rpb24odCl7aWYoMj50KXJldHVybiB0aGlzLmNvbFlzO2Zvcih2YXIgZT1bXSxpPXRoaXMuY29scysxLXQsbj0wO2k+bjtuKyspe3ZhciBvPXRoaXMuY29sWXMuc2xpY2UobixuK3QpO2Vbbl09TWF0aC5tYXguYXBwbHkoTWF0aCxvKX1yZXR1cm4gZX0saS5wcm90b3R5cGUuX21hbmFnZVN0YW1wPWZ1bmN0aW9uKHQpe3ZhciBpPWUodCksbj10aGlzLl9nZXRFbGVtZW50T2Zmc2V0KHQpLG89dGhpcy5fZ2V0T3B0aW9uKFwib3JpZ2luTGVmdFwiKSxzPW8/bi5sZWZ0Om4ucmlnaHQscj1zK2kub3V0ZXJXaWR0aCxhPU1hdGguZmxvb3Iocy90aGlzLmNvbHVtbldpZHRoKTthPU1hdGgubWF4KDAsYSk7dmFyIHU9TWF0aC5mbG9vcihyL3RoaXMuY29sdW1uV2lkdGgpO3UtPXIldGhpcy5jb2x1bW5XaWR0aD8wOjEsdT1NYXRoLm1pbih0aGlzLmNvbHMtMSx1KTtmb3IodmFyIGg9dGhpcy5fZ2V0T3B0aW9uKFwib3JpZ2luVG9wXCIpLGQ9KGg/bi50b3A6bi5ib3R0b20pK2kub3V0ZXJIZWlnaHQsbD1hO3U+PWw7bCsrKXRoaXMuY29sWXNbbF09TWF0aC5tYXgoZCx0aGlzLmNvbFlzW2xdKX0saS5wcm90b3R5cGUuX2dldENvbnRhaW5lclNpemU9ZnVuY3Rpb24oKXt0aGlzLm1heFk9TWF0aC5tYXguYXBwbHkoTWF0aCx0aGlzLmNvbFlzKTt2YXIgdD17aGVpZ2h0OnRoaXMubWF4WX07cmV0dXJuIHRoaXMuX2dldE9wdGlvbihcImZpdFdpZHRoXCIpJiYodC53aWR0aD10aGlzLl9nZXRDb250YWluZXJGaXRXaWR0aCgpKSx0fSxpLnByb3RvdHlwZS5fZ2V0Q29udGFpbmVyRml0V2lkdGg9ZnVuY3Rpb24oKXtmb3IodmFyIHQ9MCxlPXRoaXMuY29sczstLWUmJjA9PT10aGlzLmNvbFlzW2VdOyl0Kys7cmV0dXJuKHRoaXMuY29scy10KSp0aGlzLmNvbHVtbldpZHRoLXRoaXMuZ3V0dGVyfSxpLnByb3RvdHlwZS5uZWVkc1Jlc2l6ZUxheW91dD1mdW5jdGlvbigpe3ZhciB0PXRoaXMuY29udGFpbmVyV2lkdGg7cmV0dXJuIHRoaXMuZ2V0Q29udGFpbmVyV2lkdGgoKSx0IT10aGlzLmNvbnRhaW5lcldpZHRofSxpfSksZnVuY3Rpb24odCxlKXtcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQ/ZGVmaW5lKFwiaXNvdG9wZS9qcy9sYXlvdXQtbW9kZXMvbWFzb25yeVwiLFtcIi4uL2xheW91dC1tb2RlXCIsXCJtYXNvbnJ5L21hc29ucnlcIl0sZSk6XCJvYmplY3RcIj09dHlwZW9mIG1vZHVsZSYmbW9kdWxlLmV4cG9ydHM/bW9kdWxlLmV4cG9ydHM9ZShyZXF1aXJlKFwiLi4vbGF5b3V0LW1vZGVcIikscmVxdWlyZShcIm1hc29ucnktbGF5b3V0XCIpKTplKHQuSXNvdG9wZS5MYXlvdXRNb2RlLHQuTWFzb25yeSl9KHdpbmRvdyxmdW5jdGlvbih0LGUpe1widXNlIHN0cmljdFwiO3ZhciBpPXQuY3JlYXRlKFwibWFzb25yeVwiKSxuPWkucHJvdG90eXBlLG89e19nZXRFbGVtZW50T2Zmc2V0OiEwLGxheW91dDohMCxfZ2V0TWVhc3VyZW1lbnQ6ITB9O2Zvcih2YXIgcyBpbiBlLnByb3RvdHlwZSlvW3NdfHwobltzXT1lLnByb3RvdHlwZVtzXSk7dmFyIHI9bi5tZWFzdXJlQ29sdW1ucztuLm1lYXN1cmVDb2x1bW5zPWZ1bmN0aW9uKCl7dGhpcy5pdGVtcz10aGlzLmlzb3RvcGUuZmlsdGVyZWRJdGVtcyxyLmNhbGwodGhpcyl9O3ZhciBhPW4uX2dldE9wdGlvbjtyZXR1cm4gbi5fZ2V0T3B0aW9uPWZ1bmN0aW9uKHQpe3JldHVyblwiZml0V2lkdGhcIj09dD92b2lkIDAhPT10aGlzLm9wdGlvbnMuaXNGaXRXaWR0aD90aGlzLm9wdGlvbnMuaXNGaXRXaWR0aDp0aGlzLm9wdGlvbnMuZml0V2lkdGg6YS5hcHBseSh0aGlzLmlzb3RvcGUsYXJndW1lbnRzKX0saX0pLGZ1bmN0aW9uKHQsZSl7XCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kP2RlZmluZShcImlzb3RvcGUvanMvbGF5b3V0LW1vZGVzL2ZpdC1yb3dzXCIsW1wiLi4vbGF5b3V0LW1vZGVcIl0sZSk6XCJvYmplY3RcIj09dHlwZW9mIGV4cG9ydHM/bW9kdWxlLmV4cG9ydHM9ZShyZXF1aXJlKFwiLi4vbGF5b3V0LW1vZGVcIikpOmUodC5Jc290b3BlLkxheW91dE1vZGUpfSh3aW5kb3csZnVuY3Rpb24odCl7XCJ1c2Ugc3RyaWN0XCI7dmFyIGU9dC5jcmVhdGUoXCJmaXRSb3dzXCIpLGk9ZS5wcm90b3R5cGU7cmV0dXJuIGkuX3Jlc2V0TGF5b3V0PWZ1bmN0aW9uKCl7dGhpcy54PTAsdGhpcy55PTAsdGhpcy5tYXhZPTAsdGhpcy5fZ2V0TWVhc3VyZW1lbnQoXCJndXR0ZXJcIixcIm91dGVyV2lkdGhcIil9LGkuX2dldEl0ZW1MYXlvdXRQb3NpdGlvbj1mdW5jdGlvbih0KXt0LmdldFNpemUoKTt2YXIgZT10LnNpemUub3V0ZXJXaWR0aCt0aGlzLmd1dHRlcixpPXRoaXMuaXNvdG9wZS5zaXplLmlubmVyV2lkdGgrdGhpcy5ndXR0ZXI7MCE9PXRoaXMueCYmZSt0aGlzLng+aSYmKHRoaXMueD0wLHRoaXMueT10aGlzLm1heFkpO3ZhciBuPXt4OnRoaXMueCx5OnRoaXMueX07cmV0dXJuIHRoaXMubWF4WT1NYXRoLm1heCh0aGlzLm1heFksdGhpcy55K3Quc2l6ZS5vdXRlckhlaWdodCksdGhpcy54Kz1lLG59LGkuX2dldENvbnRhaW5lclNpemU9ZnVuY3Rpb24oKXtyZXR1cm57aGVpZ2h0OnRoaXMubWF4WX19LGV9KSxmdW5jdGlvbih0LGUpe1wiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZD9kZWZpbmUoXCJpc290b3BlL2pzL2xheW91dC1tb2Rlcy92ZXJ0aWNhbFwiLFtcIi4uL2xheW91dC1tb2RlXCJdLGUpOlwib2JqZWN0XCI9PXR5cGVvZiBtb2R1bGUmJm1vZHVsZS5leHBvcnRzP21vZHVsZS5leHBvcnRzPWUocmVxdWlyZShcIi4uL2xheW91dC1tb2RlXCIpKTplKHQuSXNvdG9wZS5MYXlvdXRNb2RlKX0od2luZG93LGZ1bmN0aW9uKHQpe1widXNlIHN0cmljdFwiO3ZhciBlPXQuY3JlYXRlKFwidmVydGljYWxcIix7aG9yaXpvbnRhbEFsaWdubWVudDowfSksaT1lLnByb3RvdHlwZTtyZXR1cm4gaS5fcmVzZXRMYXlvdXQ9ZnVuY3Rpb24oKXt0aGlzLnk9MH0saS5fZ2V0SXRlbUxheW91dFBvc2l0aW9uPWZ1bmN0aW9uKHQpe3QuZ2V0U2l6ZSgpO3ZhciBlPSh0aGlzLmlzb3RvcGUuc2l6ZS5pbm5lcldpZHRoLXQuc2l6ZS5vdXRlcldpZHRoKSp0aGlzLm9wdGlvbnMuaG9yaXpvbnRhbEFsaWdubWVudCxpPXRoaXMueTtyZXR1cm4gdGhpcy55Kz10LnNpemUub3V0ZXJIZWlnaHQse3g6ZSx5Oml9fSxpLl9nZXRDb250YWluZXJTaXplPWZ1bmN0aW9uKCl7cmV0dXJue2hlaWdodDp0aGlzLnl9fSxlfSksZnVuY3Rpb24odCxlKXtcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQ/ZGVmaW5lKFtcIm91dGxheWVyL291dGxheWVyXCIsXCJnZXQtc2l6ZS9nZXQtc2l6ZVwiLFwiZGVzYW5kcm8tbWF0Y2hlcy1zZWxlY3Rvci9tYXRjaGVzLXNlbGVjdG9yXCIsXCJmaXp6eS11aS11dGlscy91dGlsc1wiLFwiaXNvdG9wZS9qcy9pdGVtXCIsXCJpc290b3BlL2pzL2xheW91dC1tb2RlXCIsXCJpc290b3BlL2pzL2xheW91dC1tb2Rlcy9tYXNvbnJ5XCIsXCJpc290b3BlL2pzL2xheW91dC1tb2Rlcy9maXQtcm93c1wiLFwiaXNvdG9wZS9qcy9sYXlvdXQtbW9kZXMvdmVydGljYWxcIl0sZnVuY3Rpb24oaSxuLG8scyxyLGEpe3JldHVybiBlKHQsaSxuLG8scyxyLGEpfSk6XCJvYmplY3RcIj09dHlwZW9mIG1vZHVsZSYmbW9kdWxlLmV4cG9ydHM/bW9kdWxlLmV4cG9ydHM9ZSh0LHJlcXVpcmUoXCJvdXRsYXllclwiKSxyZXF1aXJlKFwiZ2V0LXNpemVcIikscmVxdWlyZShcImRlc2FuZHJvLW1hdGNoZXMtc2VsZWN0b3JcIikscmVxdWlyZShcImZpenp5LXVpLXV0aWxzXCIpLHJlcXVpcmUoXCJpc290b3BlL2pzL2l0ZW1cIikscmVxdWlyZShcImlzb3RvcGUvanMvbGF5b3V0LW1vZGVcIikscmVxdWlyZShcImlzb3RvcGUvanMvbGF5b3V0LW1vZGVzL21hc29ucnlcIikscmVxdWlyZShcImlzb3RvcGUvanMvbGF5b3V0LW1vZGVzL2ZpdC1yb3dzXCIpLHJlcXVpcmUoXCJpc290b3BlL2pzL2xheW91dC1tb2Rlcy92ZXJ0aWNhbFwiKSk6dC5Jc290b3BlPWUodCx0Lk91dGxheWVyLHQuZ2V0U2l6ZSx0Lm1hdGNoZXNTZWxlY3Rvcix0LmZpenp5VUlVdGlscyx0Lklzb3RvcGUuSXRlbSx0Lklzb3RvcGUuTGF5b3V0TW9kZSl9KHdpbmRvdyxmdW5jdGlvbih0LGUsaSxuLG8scyxyKXtmdW5jdGlvbiBhKHQsZSl7cmV0dXJuIGZ1bmN0aW9uKGksbil7Zm9yKHZhciBvPTA7bzx0Lmxlbmd0aDtvKyspe3ZhciBzPXRbb10scj1pLnNvcnREYXRhW3NdLGE9bi5zb3J0RGF0YVtzXTtpZihyPmF8fGE+cil7dmFyIHU9dm9pZCAwIT09ZVtzXT9lW3NdOmUsaD11PzE6LTE7cmV0dXJuKHI+YT8xOi0xKSpofX1yZXR1cm4gMH19dmFyIHU9dC5qUXVlcnksaD1TdHJpbmcucHJvdG90eXBlLnRyaW0/ZnVuY3Rpb24odCl7cmV0dXJuIHQudHJpbSgpfTpmdW5jdGlvbih0KXtyZXR1cm4gdC5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLFwiXCIpfSxkPWUuY3JlYXRlKFwiaXNvdG9wZVwiLHtsYXlvdXRNb2RlOlwibWFzb25yeVwiLGlzSlF1ZXJ5RmlsdGVyaW5nOiEwLHNvcnRBc2NlbmRpbmc6ITB9KTtkLkl0ZW09cyxkLkxheW91dE1vZGU9cjt2YXIgbD1kLnByb3RvdHlwZTtsLl9jcmVhdGU9ZnVuY3Rpb24oKXt0aGlzLml0ZW1HVUlEPTAsdGhpcy5fc29ydGVycz17fSx0aGlzLl9nZXRTb3J0ZXJzKCksZS5wcm90b3R5cGUuX2NyZWF0ZS5jYWxsKHRoaXMpLHRoaXMubW9kZXM9e30sdGhpcy5maWx0ZXJlZEl0ZW1zPXRoaXMuaXRlbXMsdGhpcy5zb3J0SGlzdG9yeT1bXCJvcmlnaW5hbC1vcmRlclwiXTtmb3IodmFyIHQgaW4gci5tb2Rlcyl0aGlzLl9pbml0TGF5b3V0TW9kZSh0KX0sbC5yZWxvYWRJdGVtcz1mdW5jdGlvbigpe3RoaXMuaXRlbUdVSUQ9MCxlLnByb3RvdHlwZS5yZWxvYWRJdGVtcy5jYWxsKHRoaXMpfSxsLl9pdGVtaXplPWZ1bmN0aW9uKCl7Zm9yKHZhciB0PWUucHJvdG90eXBlLl9pdGVtaXplLmFwcGx5KHRoaXMsYXJndW1lbnRzKSxpPTA7aTx0Lmxlbmd0aDtpKyspe3ZhciBuPXRbaV07bi5pZD10aGlzLml0ZW1HVUlEKyt9cmV0dXJuIHRoaXMuX3VwZGF0ZUl0ZW1zU29ydERhdGEodCksdH0sbC5faW5pdExheW91dE1vZGU9ZnVuY3Rpb24odCl7dmFyIGU9ci5tb2Rlc1t0XSxpPXRoaXMub3B0aW9uc1t0XXx8e307dGhpcy5vcHRpb25zW3RdPWUub3B0aW9ucz9vLmV4dGVuZChlLm9wdGlvbnMsaSk6aSx0aGlzLm1vZGVzW3RdPW5ldyBlKHRoaXMpfSxsLmxheW91dD1mdW5jdGlvbigpe3JldHVybiF0aGlzLl9pc0xheW91dEluaXRlZCYmdGhpcy5fZ2V0T3B0aW9uKFwiaW5pdExheW91dFwiKT92b2lkIHRoaXMuYXJyYW5nZSgpOnZvaWQgdGhpcy5fbGF5b3V0KCl9LGwuX2xheW91dD1mdW5jdGlvbigpe3ZhciB0PXRoaXMuX2dldElzSW5zdGFudCgpO3RoaXMuX3Jlc2V0TGF5b3V0KCksdGhpcy5fbWFuYWdlU3RhbXBzKCksdGhpcy5sYXlvdXRJdGVtcyh0aGlzLmZpbHRlcmVkSXRlbXMsdCksdGhpcy5faXNMYXlvdXRJbml0ZWQ9ITB9LGwuYXJyYW5nZT1mdW5jdGlvbih0KXt0aGlzLm9wdGlvbih0KSx0aGlzLl9nZXRJc0luc3RhbnQoKTt2YXIgZT10aGlzLl9maWx0ZXIodGhpcy5pdGVtcyk7dGhpcy5maWx0ZXJlZEl0ZW1zPWUubWF0Y2hlcyx0aGlzLl9iaW5kQXJyYW5nZUNvbXBsZXRlKCksdGhpcy5faXNJbnN0YW50P3RoaXMuX25vVHJhbnNpdGlvbih0aGlzLl9oaWRlUmV2ZWFsLFtlXSk6dGhpcy5faGlkZVJldmVhbChlKSx0aGlzLl9zb3J0KCksdGhpcy5fbGF5b3V0KCl9LGwuX2luaXQ9bC5hcnJhbmdlLGwuX2hpZGVSZXZlYWw9ZnVuY3Rpb24odCl7dGhpcy5yZXZlYWwodC5uZWVkUmV2ZWFsKSx0aGlzLmhpZGUodC5uZWVkSGlkZSl9LGwuX2dldElzSW5zdGFudD1mdW5jdGlvbigpe3ZhciB0PXRoaXMuX2dldE9wdGlvbihcImxheW91dEluc3RhbnRcIiksZT12b2lkIDAhPT10P3Q6IXRoaXMuX2lzTGF5b3V0SW5pdGVkO3JldHVybiB0aGlzLl9pc0luc3RhbnQ9ZSxlfSxsLl9iaW5kQXJyYW5nZUNvbXBsZXRlPWZ1bmN0aW9uKCl7ZnVuY3Rpb24gdCgpe2UmJmkmJm4mJm8uZGlzcGF0Y2hFdmVudChcImFycmFuZ2VDb21wbGV0ZVwiLG51bGwsW28uZmlsdGVyZWRJdGVtc10pfXZhciBlLGksbixvPXRoaXM7dGhpcy5vbmNlKFwibGF5b3V0Q29tcGxldGVcIixmdW5jdGlvbigpe2U9ITAsdCgpfSksdGhpcy5vbmNlKFwiaGlkZUNvbXBsZXRlXCIsZnVuY3Rpb24oKXtpPSEwLHQoKX0pLHRoaXMub25jZShcInJldmVhbENvbXBsZXRlXCIsZnVuY3Rpb24oKXtuPSEwLHQoKX0pfSxsLl9maWx0ZXI9ZnVuY3Rpb24odCl7dmFyIGU9dGhpcy5vcHRpb25zLmZpbHRlcjtlPWV8fFwiKlwiO2Zvcih2YXIgaT1bXSxuPVtdLG89W10scz10aGlzLl9nZXRGaWx0ZXJUZXN0KGUpLHI9MDtyPHQubGVuZ3RoO3IrKyl7dmFyIGE9dFtyXTtpZighYS5pc0lnbm9yZWQpe3ZhciB1PXMoYSk7dSYmaS5wdXNoKGEpLHUmJmEuaXNIaWRkZW4/bi5wdXNoKGEpOnV8fGEuaXNIaWRkZW58fG8ucHVzaChhKX19cmV0dXJue21hdGNoZXM6aSxuZWVkUmV2ZWFsOm4sbmVlZEhpZGU6b319LGwuX2dldEZpbHRlclRlc3Q9ZnVuY3Rpb24odCl7cmV0dXJuIHUmJnRoaXMub3B0aW9ucy5pc0pRdWVyeUZpbHRlcmluZz9mdW5jdGlvbihlKXtyZXR1cm4gdShlLmVsZW1lbnQpLmlzKHQpfTpcImZ1bmN0aW9uXCI9PXR5cGVvZiB0P2Z1bmN0aW9uKGUpe3JldHVybiB0KGUuZWxlbWVudCl9OmZ1bmN0aW9uKGUpe3JldHVybiBuKGUuZWxlbWVudCx0KX19LGwudXBkYXRlU29ydERhdGE9ZnVuY3Rpb24odCl7dmFyIGU7dD8odD1vLm1ha2VBcnJheSh0KSxlPXRoaXMuZ2V0SXRlbXModCkpOmU9dGhpcy5pdGVtcyx0aGlzLl9nZXRTb3J0ZXJzKCksdGhpcy5fdXBkYXRlSXRlbXNTb3J0RGF0YShlKX0sbC5fZ2V0U29ydGVycz1mdW5jdGlvbigpe3ZhciB0PXRoaXMub3B0aW9ucy5nZXRTb3J0RGF0YTtmb3IodmFyIGUgaW4gdCl7dmFyIGk9dFtlXTt0aGlzLl9zb3J0ZXJzW2VdPWYoaSl9fSxsLl91cGRhdGVJdGVtc1NvcnREYXRhPWZ1bmN0aW9uKHQpe2Zvcih2YXIgZT10JiZ0Lmxlbmd0aCxpPTA7ZSYmZT5pO2krKyl7dmFyIG49dFtpXTtuLnVwZGF0ZVNvcnREYXRhKCl9fTt2YXIgZj1mdW5jdGlvbigpe2Z1bmN0aW9uIHQodCl7aWYoXCJzdHJpbmdcIiE9dHlwZW9mIHQpcmV0dXJuIHQ7dmFyIGk9aCh0KS5zcGxpdChcIiBcIiksbj1pWzBdLG89bi5tYXRjaCgvXlxcWyguKylcXF0kLykscz1vJiZvWzFdLHI9ZShzLG4pLGE9ZC5zb3J0RGF0YVBhcnNlcnNbaVsxXV07XG5yZXR1cm4gdD1hP2Z1bmN0aW9uKHQpe3JldHVybiB0JiZhKHIodCkpfTpmdW5jdGlvbih0KXtyZXR1cm4gdCYmcih0KX19ZnVuY3Rpb24gZSh0LGUpe3JldHVybiB0P2Z1bmN0aW9uKGUpe3JldHVybiBlLmdldEF0dHJpYnV0ZSh0KX06ZnVuY3Rpb24odCl7dmFyIGk9dC5xdWVyeVNlbGVjdG9yKGUpO3JldHVybiBpJiZpLnRleHRDb250ZW50fX1yZXR1cm4gdH0oKTtkLnNvcnREYXRhUGFyc2Vycz17cGFyc2VJbnQ6ZnVuY3Rpb24odCl7cmV0dXJuIHBhcnNlSW50KHQsMTApfSxwYXJzZUZsb2F0OmZ1bmN0aW9uKHQpe3JldHVybiBwYXJzZUZsb2F0KHQpfX0sbC5fc29ydD1mdW5jdGlvbigpe3ZhciB0PXRoaXMub3B0aW9ucy5zb3J0Qnk7aWYodCl7dmFyIGU9W10uY29uY2F0LmFwcGx5KHQsdGhpcy5zb3J0SGlzdG9yeSksaT1hKGUsdGhpcy5vcHRpb25zLnNvcnRBc2NlbmRpbmcpO3RoaXMuZmlsdGVyZWRJdGVtcy5zb3J0KGkpLHQhPXRoaXMuc29ydEhpc3RvcnlbMF0mJnRoaXMuc29ydEhpc3RvcnkudW5zaGlmdCh0KX19LGwuX21vZGU9ZnVuY3Rpb24oKXt2YXIgdD10aGlzLm9wdGlvbnMubGF5b3V0TW9kZSxlPXRoaXMubW9kZXNbdF07aWYoIWUpdGhyb3cgbmV3IEVycm9yKFwiTm8gbGF5b3V0IG1vZGU6IFwiK3QpO3JldHVybiBlLm9wdGlvbnM9dGhpcy5vcHRpb25zW3RdLGV9LGwuX3Jlc2V0TGF5b3V0PWZ1bmN0aW9uKCl7ZS5wcm90b3R5cGUuX3Jlc2V0TGF5b3V0LmNhbGwodGhpcyksdGhpcy5fbW9kZSgpLl9yZXNldExheW91dCgpfSxsLl9nZXRJdGVtTGF5b3V0UG9zaXRpb249ZnVuY3Rpb24odCl7cmV0dXJuIHRoaXMuX21vZGUoKS5fZ2V0SXRlbUxheW91dFBvc2l0aW9uKHQpfSxsLl9tYW5hZ2VTdGFtcD1mdW5jdGlvbih0KXt0aGlzLl9tb2RlKCkuX21hbmFnZVN0YW1wKHQpfSxsLl9nZXRDb250YWluZXJTaXplPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuX21vZGUoKS5fZ2V0Q29udGFpbmVyU2l6ZSgpfSxsLm5lZWRzUmVzaXplTGF5b3V0PWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuX21vZGUoKS5uZWVkc1Jlc2l6ZUxheW91dCgpfSxsLmFwcGVuZGVkPWZ1bmN0aW9uKHQpe3ZhciBlPXRoaXMuYWRkSXRlbXModCk7aWYoZS5sZW5ndGgpe3ZhciBpPXRoaXMuX2ZpbHRlclJldmVhbEFkZGVkKGUpO3RoaXMuZmlsdGVyZWRJdGVtcz10aGlzLmZpbHRlcmVkSXRlbXMuY29uY2F0KGkpfX0sbC5wcmVwZW5kZWQ9ZnVuY3Rpb24odCl7dmFyIGU9dGhpcy5faXRlbWl6ZSh0KTtpZihlLmxlbmd0aCl7dGhpcy5fcmVzZXRMYXlvdXQoKSx0aGlzLl9tYW5hZ2VTdGFtcHMoKTt2YXIgaT10aGlzLl9maWx0ZXJSZXZlYWxBZGRlZChlKTt0aGlzLmxheW91dEl0ZW1zKHRoaXMuZmlsdGVyZWRJdGVtcyksdGhpcy5maWx0ZXJlZEl0ZW1zPWkuY29uY2F0KHRoaXMuZmlsdGVyZWRJdGVtcyksdGhpcy5pdGVtcz1lLmNvbmNhdCh0aGlzLml0ZW1zKX19LGwuX2ZpbHRlclJldmVhbEFkZGVkPWZ1bmN0aW9uKHQpe3ZhciBlPXRoaXMuX2ZpbHRlcih0KTtyZXR1cm4gdGhpcy5oaWRlKGUubmVlZEhpZGUpLHRoaXMucmV2ZWFsKGUubWF0Y2hlcyksdGhpcy5sYXlvdXRJdGVtcyhlLm1hdGNoZXMsITApLGUubWF0Y2hlc30sbC5pbnNlcnQ9ZnVuY3Rpb24odCl7dmFyIGU9dGhpcy5hZGRJdGVtcyh0KTtpZihlLmxlbmd0aCl7dmFyIGksbixvPWUubGVuZ3RoO2ZvcihpPTA7bz5pO2krKyluPWVbaV0sdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKG4uZWxlbWVudCk7dmFyIHM9dGhpcy5fZmlsdGVyKGUpLm1hdGNoZXM7Zm9yKGk9MDtvPmk7aSsrKWVbaV0uaXNMYXlvdXRJbnN0YW50PSEwO2Zvcih0aGlzLmFycmFuZ2UoKSxpPTA7bz5pO2krKylkZWxldGUgZVtpXS5pc0xheW91dEluc3RhbnQ7dGhpcy5yZXZlYWwocyl9fTt2YXIgYz1sLnJlbW92ZTtyZXR1cm4gbC5yZW1vdmU9ZnVuY3Rpb24odCl7dD1vLm1ha2VBcnJheSh0KTt2YXIgZT10aGlzLmdldEl0ZW1zKHQpO2MuY2FsbCh0aGlzLHQpO2Zvcih2YXIgaT1lJiZlLmxlbmd0aCxuPTA7aSYmaT5uO24rKyl7dmFyIHM9ZVtuXTtvLnJlbW92ZUZyb20odGhpcy5maWx0ZXJlZEl0ZW1zLHMpfX0sbC5zaHVmZmxlPWZ1bmN0aW9uKCl7Zm9yKHZhciB0PTA7dDx0aGlzLml0ZW1zLmxlbmd0aDt0Kyspe3ZhciBlPXRoaXMuaXRlbXNbdF07ZS5zb3J0RGF0YS5yYW5kb209TWF0aC5yYW5kb20oKX10aGlzLm9wdGlvbnMuc29ydEJ5PVwicmFuZG9tXCIsdGhpcy5fc29ydCgpLHRoaXMuX2xheW91dCgpfSxsLl9ub1RyYW5zaXRpb249ZnVuY3Rpb24odCxlKXt2YXIgaT10aGlzLm9wdGlvbnMudHJhbnNpdGlvbkR1cmF0aW9uO3RoaXMub3B0aW9ucy50cmFuc2l0aW9uRHVyYXRpb249MDt2YXIgbj10LmFwcGx5KHRoaXMsZSk7cmV0dXJuIHRoaXMub3B0aW9ucy50cmFuc2l0aW9uRHVyYXRpb249aSxufSxsLmdldEZpbHRlcmVkSXRlbUVsZW1lbnRzPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuZmlsdGVyZWRJdGVtcy5tYXAoZnVuY3Rpb24odCl7cmV0dXJuIHQuZWxlbWVudH0pfSxkfSk7IiwiLyoqXG4gKiBMb2Rhc2ggKEN1c3RvbSBCdWlsZClcbiAqXG4gKiBAbGljZW5zZVxuICogbG9kYXNoLmNvbS9saWNlbnNlIHwgVW5kZXJzY29yZS5qcyAxLjguMyB1bmRlcnNjb3JlanMub3JnL0xJQ0VOU0VcbiAqIEJ1aWxkOiBgbG9kYXNoIGNvcmUgLW8gLi9kaXN0L2xvZGFzaC5jb3JlLmpzYFxuICpcbiAqL1xuOyhmdW5jdGlvbigpe2Z1bmN0aW9uIG4obil7cmV0dXJuIEsobikmJnBuLmNhbGwobixcImNhbGxlZVwiKSYmIWJuLmNhbGwobixcImNhbGxlZVwiKX1mdW5jdGlvbiB0KG4sdCl7cmV0dXJuIG4ucHVzaC5hcHBseShuLHQpLG59ZnVuY3Rpb24gcihuKXtyZXR1cm4gZnVuY3Rpb24odCl7cmV0dXJuIG51bGw9PXQ/bm46dFtuXX19ZnVuY3Rpb24gZShuLHQscixlLHUpe3JldHVybiB1KG4sZnVuY3Rpb24obix1LG8pe3I9ZT8oZT1mYWxzZSxuKTp0KHIsbix1LG8pfSkscn1mdW5jdGlvbiB1KG4sdCl7cmV0dXJuIGQodCxmdW5jdGlvbih0KXtyZXR1cm4gblt0XX0pfWZ1bmN0aW9uIG8obil7cmV0dXJuIG4gaW5zdGFuY2VvZiBpP246bmV3IGkobil9ZnVuY3Rpb24gaShuLHQpe3RoaXMuX193cmFwcGVkX189bix0aGlzLl9fYWN0aW9uc19fPVtdLHRoaXMuX19jaGFpbl9fPSEhdH1mdW5jdGlvbiBjKG4sdCxyLGUpe3JldHVybiBuPT09bm58fE0obixsbltyXSkmJiFwbi5jYWxsKGUscik/dDpufWZ1bmN0aW9uIGYobix0LHIpe1xuaWYodHlwZW9mIG4hPVwiZnVuY3Rpb25cIil0aHJvdyBuZXcgVHlwZUVycm9yKFwiRXhwZWN0ZWQgYSBmdW5jdGlvblwiKTtyZXR1cm4gc2V0VGltZW91dChmdW5jdGlvbigpe24uYXBwbHkobm4scil9LHQpfWZ1bmN0aW9uIGEobix0KXt2YXIgcj10cnVlO3JldHVybiBtbihuLGZ1bmN0aW9uKG4sZSx1KXtyZXR1cm4gcj0hIXQobixlLHUpfSkscn1mdW5jdGlvbiBsKG4sdCxyKXtmb3IodmFyIGU9LTEsdT1uLmxlbmd0aDsrK2U8dTspe3ZhciBvPW5bZV0saT10KG8pO2lmKG51bGwhPWkmJihjPT09bm4/aT09PWk6cihpLGMpKSl2YXIgYz1pLGY9b31yZXR1cm4gZn1mdW5jdGlvbiBwKG4sdCl7dmFyIHI9W107cmV0dXJuIG1uKG4sZnVuY3Rpb24obixlLHUpe3QobixlLHUpJiZyLnB1c2gobil9KSxyfWZ1bmN0aW9uIHMobixyLGUsdSxvKXt2YXIgaT0tMSxjPW4ubGVuZ3RoO2ZvcihlfHwoZT1EKSxvfHwobz1bXSk7KytpPGM7KXt2YXIgZj1uW2ldOzA8ciYmZShmKT8xPHI/cyhmLHItMSxlLHUsbyk6dChvLGYpOnV8fChvW28ubGVuZ3RoXT1mKTtcbn1yZXR1cm4gb31mdW5jdGlvbiBoKG4sdCl7cmV0dXJuIG4mJk9uKG4sdCxJbil9ZnVuY3Rpb24gdihuLHQpe3JldHVybiBwKHQsZnVuY3Rpb24odCl7cmV0dXJuIFYoblt0XSl9KX1mdW5jdGlvbiB5KG4sdCl7cmV0dXJuIG4+dH1mdW5jdGlvbiBiKG4sdCxyLGUsdSl7cmV0dXJuIG49PT10fHwobnVsbD09bnx8bnVsbD09dHx8IUgobikmJiFLKHQpP24hPT1uJiZ0IT09dDpnKG4sdCxyLGUsYix1KSl9ZnVuY3Rpb24gZyhuLHQscixlLHUsbyl7dmFyIGk9Tm4obiksYz1Obih0KSxmPVwiW29iamVjdCBBcnJheV1cIixhPVwiW29iamVjdCBBcnJheV1cIjtpfHwoZj1obi5jYWxsKG4pLGY9XCJbb2JqZWN0IEFyZ3VtZW50c11cIj09Zj9cIltvYmplY3QgT2JqZWN0XVwiOmYpLGN8fChhPWhuLmNhbGwodCksYT1cIltvYmplY3QgQXJndW1lbnRzXVwiPT1hP1wiW29iamVjdCBPYmplY3RdXCI6YSk7dmFyIGw9XCJbb2JqZWN0IE9iamVjdF1cIj09ZixjPVwiW29iamVjdCBPYmplY3RdXCI9PWEsYT1mPT1hO298fChvPVtdKTtcbnZhciBwPUFuKG8sZnVuY3Rpb24odCl7cmV0dXJuIHRbMF09PW59KSxzPUFuKG8sZnVuY3Rpb24obil7cmV0dXJuIG5bMF09PXR9KTtpZihwJiZzKXJldHVybiBwWzFdPT10O2lmKG8ucHVzaChbbix0XSksby5wdXNoKFt0LG5dKSxhJiYhbCl7aWYoaSlyPUIobix0LHIsZSx1LG8pO2Vsc2Ugbjp7c3dpdGNoKGYpe2Nhc2VcIltvYmplY3QgQm9vbGVhbl1cIjpjYXNlXCJbb2JqZWN0IERhdGVdXCI6Y2FzZVwiW29iamVjdCBOdW1iZXJdXCI6cj1NKCtuLCt0KTticmVhayBuO2Nhc2VcIltvYmplY3QgRXJyb3JdXCI6cj1uLm5hbWU9PXQubmFtZSYmbi5tZXNzYWdlPT10Lm1lc3NhZ2U7YnJlYWsgbjtjYXNlXCJbb2JqZWN0IFJlZ0V4cF1cIjpjYXNlXCJbb2JqZWN0IFN0cmluZ11cIjpyPW49PXQrXCJcIjticmVhayBufXI9ZmFsc2V9cmV0dXJuIG8ucG9wKCkscn1yZXR1cm4gMSZyfHwoaT1sJiZwbi5jYWxsKG4sXCJfX3dyYXBwZWRfX1wiKSxmPWMmJnBuLmNhbGwodCxcIl9fd3JhcHBlZF9fXCIpLCFpJiYhZik/ISFhJiYocj1SKG4sdCxyLGUsdSxvKSxcbm8ucG9wKCkscik6KGk9aT9uLnZhbHVlKCk6bixmPWY/dC52YWx1ZSgpOnQscj11KGksZixyLGUsbyksby5wb3AoKSxyKX1mdW5jdGlvbiBfKG4pe3JldHVybiB0eXBlb2Ygbj09XCJmdW5jdGlvblwiP246bnVsbD09bj9ZOih0eXBlb2Ygbj09XCJvYmplY3RcIj9tOnIpKG4pfWZ1bmN0aW9uIGoobix0KXtyZXR1cm4gbjx0fWZ1bmN0aW9uIGQobix0KXt2YXIgcj0tMSxlPVUobik/QXJyYXkobi5sZW5ndGgpOltdO3JldHVybiBtbihuLGZ1bmN0aW9uKG4sdSxvKXtlWysrcl09dChuLHUsbyl9KSxlfWZ1bmN0aW9uIG0obil7dmFyIHQ9X24obik7cmV0dXJuIGZ1bmN0aW9uKHIpe3ZhciBlPXQubGVuZ3RoO2lmKG51bGw9PXIpcmV0dXJuIWU7Zm9yKHI9T2JqZWN0KHIpO2UtLTspe3ZhciB1PXRbZV07aWYoISh1IGluIHImJmIoblt1XSxyW3VdLDMpKSlyZXR1cm4gZmFsc2V9cmV0dXJuIHRydWV9fWZ1bmN0aW9uIE8obix0KXtyZXR1cm4gbj1PYmplY3QobiksRyh0LGZ1bmN0aW9uKHQscil7cmV0dXJuIHIgaW4gbiYmKHRbcl09bltyXSksXG50fSx7fSl9ZnVuY3Rpb24geChuKXtyZXR1cm4geG4ocShuLHZvaWQgMCxZKSxuK1wiXCIpfWZ1bmN0aW9uIEEobix0LHIpe3ZhciBlPS0xLHU9bi5sZW5ndGg7Zm9yKDA+dCYmKHQ9LXQ+dT8wOnUrdCkscj1yPnU/dTpyLDA+ciYmKHIrPXUpLHU9dD5yPzA6ci10Pj4+MCx0Pj4+PTAscj1BcnJheSh1KTsrK2U8dTspcltlXT1uW2UrdF07cmV0dXJuIHJ9ZnVuY3Rpb24gRShuKXtyZXR1cm4gQShuLDAsbi5sZW5ndGgpfWZ1bmN0aW9uIHcobix0KXt2YXIgcjtyZXR1cm4gbW4obixmdW5jdGlvbihuLGUsdSl7cmV0dXJuIHI9dChuLGUsdSksIXJ9KSwhIXJ9ZnVuY3Rpb24gayhuLHIpe3JldHVybiBHKHIsZnVuY3Rpb24obixyKXtyZXR1cm4gci5mdW5jLmFwcGx5KHIudGhpc0FyZyx0KFtuXSxyLmFyZ3MpKX0sbil9ZnVuY3Rpb24gTihuLHQscixlKXt2YXIgdT0hcjtyfHwocj17fSk7Zm9yKHZhciBvPS0xLGk9dC5sZW5ndGg7KytvPGk7KXt2YXIgYz10W29dLGY9ZT9lKHJbY10sbltjXSxjLHIsbik6bm47XG5pZihmPT09bm4mJihmPW5bY10pLHUpcltjXT1mO2Vsc2V7dmFyIGE9cixsPWFbY107cG4uY2FsbChhLGMpJiZNKGwsZikmJihmIT09bm58fGMgaW4gYSl8fChhW2NdPWYpfX1yZXR1cm4gcn1mdW5jdGlvbiBGKG4pe3JldHVybiB4KGZ1bmN0aW9uKHQscil7dmFyIGU9LTEsdT1yLmxlbmd0aCxvPTE8dT9yW3UtMV06bm4sbz0zPG4ubGVuZ3RoJiZ0eXBlb2Ygbz09XCJmdW5jdGlvblwiPyh1LS0sbyk6bm47Zm9yKHQ9T2JqZWN0KHQpOysrZTx1Oyl7dmFyIGk9cltlXTtpJiZuKHQsaSxlLG8pfXJldHVybiB0fSl9ZnVuY3Rpb24gUyhuKXtyZXR1cm4gZnVuY3Rpb24oKXt2YXIgdD1hcmd1bWVudHMscj1kbihuLnByb3RvdHlwZSksdD1uLmFwcGx5KHIsdCk7cmV0dXJuIEgodCk/dDpyfX1mdW5jdGlvbiBUKG4sdCxyKXtmdW5jdGlvbiBlKCl7Zm9yKHZhciBvPS0xLGk9YXJndW1lbnRzLmxlbmd0aCxjPS0xLGY9ci5sZW5ndGgsYT1BcnJheShmK2kpLGw9dGhpcyYmdGhpcyE9PW9uJiZ0aGlzIGluc3RhbmNlb2YgZT91Om47KytjPGY7KWFbY109cltjXTtcbmZvcig7aS0tOylhW2MrK109YXJndW1lbnRzWysrb107cmV0dXJuIGwuYXBwbHkodCxhKX1pZih0eXBlb2YgbiE9XCJmdW5jdGlvblwiKXRocm93IG5ldyBUeXBlRXJyb3IoXCJFeHBlY3RlZCBhIGZ1bmN0aW9uXCIpO3ZhciB1PVMobik7cmV0dXJuIGV9ZnVuY3Rpb24gQihuLHQscixlLHUsbyl7dmFyIGk9bi5sZW5ndGgsYz10Lmxlbmd0aDtpZihpIT1jJiYhKDEmciYmYz5pKSlyZXR1cm4gZmFsc2U7Zm9yKHZhciBjPS0xLGY9dHJ1ZSxhPTImcj9bXTpubjsrK2M8aTspe3ZhciBsPW5bY10scD10W2NdO2lmKHZvaWQgMCE9PW5uKXtmPWZhbHNlO2JyZWFrfWlmKGEpe2lmKCF3KHQsZnVuY3Rpb24obix0KXtpZigheihhLHQpJiYobD09PW58fHUobCxuLHIsZSxvKSkpcmV0dXJuIGEucHVzaCh0KX0pKXtmPWZhbHNlO2JyZWFrfX1lbHNlIGlmKGwhPT1wJiYhdShsLHAscixlLG8pKXtmPWZhbHNlO2JyZWFrfX1yZXR1cm4gZn1mdW5jdGlvbiBSKG4sdCxyLGUsdSxvKXt2YXIgaT0xJnIsYz1JbihuKSxmPWMubGVuZ3RoLGE9SW4odCkubGVuZ3RoO1xuaWYoZiE9YSYmIWkpcmV0dXJuIGZhbHNlO2Zvcih2YXIgbD1mO2wtLTspe3ZhciBwPWNbbF07aWYoIShpP3AgaW4gdDpwbi5jYWxsKHQscCkpKXJldHVybiBmYWxzZX1mb3IoYT10cnVlOysrbDxmOyl7dmFyIHA9Y1tsXSxzPW5bcF0saD10W3BdO2lmKHZvaWQgMCE9PW5ufHxzIT09aCYmIXUocyxoLHIsZSxvKSl7YT1mYWxzZTticmVha31pfHwoaT1cImNvbnN0cnVjdG9yXCI9PXApfXJldHVybiBhJiYhaSYmKHI9bi5jb25zdHJ1Y3RvcixlPXQuY29uc3RydWN0b3IsciE9ZSYmXCJjb25zdHJ1Y3RvclwiaW4gbiYmXCJjb25zdHJ1Y3RvclwiaW4gdCYmISh0eXBlb2Ygcj09XCJmdW5jdGlvblwiJiZyIGluc3RhbmNlb2YgciYmdHlwZW9mIGU9PVwiZnVuY3Rpb25cIiYmZSBpbnN0YW5jZW9mIGUpJiYoYT1mYWxzZSkpLGF9ZnVuY3Rpb24gRCh0KXtyZXR1cm4gTm4odCl8fG4odCl9ZnVuY3Rpb24gSShuKXt2YXIgdD1bXTtpZihudWxsIT1uKWZvcih2YXIgciBpbiBPYmplY3QobikpdC5wdXNoKHIpO3JldHVybiB0fWZ1bmN0aW9uIHEobix0LHIpe1xucmV0dXJuIHQ9am4odD09PW5uP24ubGVuZ3RoLTE6dCwwKSxmdW5jdGlvbigpe2Zvcih2YXIgZT1hcmd1bWVudHMsdT0tMSxvPWpuKGUubGVuZ3RoLXQsMCksaT1BcnJheShvKTsrK3U8bzspaVt1XT1lW3QrdV07Zm9yKHU9LTEsbz1BcnJheSh0KzEpOysrdTx0OylvW3VdPWVbdV07cmV0dXJuIG9bdF09cihpKSxuLmFwcGx5KHRoaXMsbyl9fWZ1bmN0aW9uICQobil7cmV0dXJuKG51bGw9PW4/MDpuLmxlbmd0aCk/cyhuLDEpOltdfWZ1bmN0aW9uIFAobil7cmV0dXJuIG4mJm4ubGVuZ3RoP25bMF06bm59ZnVuY3Rpb24geihuLHQscil7dmFyIGU9bnVsbD09bj8wOm4ubGVuZ3RoO3I9dHlwZW9mIHI9PVwibnVtYmVyXCI/MD5yP2puKGUrciwwKTpyOjAscj0ocnx8MCktMTtmb3IodmFyIHU9dD09PXQ7KytyPGU7KXt2YXIgbz1uW3JdO2lmKHU/bz09PXQ6byE9PW8pcmV0dXJuIHJ9cmV0dXJuLTF9ZnVuY3Rpb24gQyhuLHQpe3JldHVybiBtbihuLF8odCkpfWZ1bmN0aW9uIEcobix0LHIpe3JldHVybiBlKG4sXyh0KSxyLDM+YXJndW1lbnRzLmxlbmd0aCxtbik7XG59ZnVuY3Rpb24gSihuLHQpe3ZhciByO2lmKHR5cGVvZiB0IT1cImZ1bmN0aW9uXCIpdGhyb3cgbmV3IFR5cGVFcnJvcihcIkV4cGVjdGVkIGEgZnVuY3Rpb25cIik7cmV0dXJuIG49Rm4obiksZnVuY3Rpb24oKXtyZXR1cm4gMDwtLW4mJihyPXQuYXBwbHkodGhpcyxhcmd1bWVudHMpKSwxPj1uJiYodD1ubikscn19ZnVuY3Rpb24gTShuLHQpe3JldHVybiBuPT09dHx8biE9PW4mJnQhPT10fWZ1bmN0aW9uIFUobil7dmFyIHQ7cmV0dXJuKHQ9bnVsbCE9bikmJih0PW4ubGVuZ3RoLHQ9dHlwZW9mIHQ9PVwibnVtYmVyXCImJi0xPHQmJjA9PXQlMSYmOTAwNzE5OTI1NDc0MDk5MT49dCksdCYmIVYobil9ZnVuY3Rpb24gVihuKXtyZXR1cm4hIUgobikmJihuPWhuLmNhbGwobiksXCJbb2JqZWN0IEZ1bmN0aW9uXVwiPT1ufHxcIltvYmplY3QgR2VuZXJhdG9yRnVuY3Rpb25dXCI9PW58fFwiW29iamVjdCBBc3luY0Z1bmN0aW9uXVwiPT1ufHxcIltvYmplY3QgUHJveHldXCI9PW4pfWZ1bmN0aW9uIEgobil7dmFyIHQ9dHlwZW9mIG47XG5yZXR1cm4gbnVsbCE9biYmKFwib2JqZWN0XCI9PXR8fFwiZnVuY3Rpb25cIj09dCl9ZnVuY3Rpb24gSyhuKXtyZXR1cm4gbnVsbCE9biYmdHlwZW9mIG49PVwib2JqZWN0XCJ9ZnVuY3Rpb24gTChuKXtyZXR1cm4gdHlwZW9mIG49PVwibnVtYmVyXCJ8fEsobikmJlwiW29iamVjdCBOdW1iZXJdXCI9PWhuLmNhbGwobil9ZnVuY3Rpb24gUShuKXtyZXR1cm4gdHlwZW9mIG49PVwic3RyaW5nXCJ8fCFObihuKSYmSyhuKSYmXCJbb2JqZWN0IFN0cmluZ11cIj09aG4uY2FsbChuKX1mdW5jdGlvbiBXKG4pe3JldHVybiB0eXBlb2Ygbj09XCJzdHJpbmdcIj9uOm51bGw9PW4/XCJcIjpuK1wiXCJ9ZnVuY3Rpb24gWChuKXtyZXR1cm4gbnVsbD09bj9bXTp1KG4sSW4obikpfWZ1bmN0aW9uIFkobil7cmV0dXJuIG59ZnVuY3Rpb24gWihuLHIsZSl7dmFyIHU9SW4ociksbz12KHIsdSk7bnVsbCE9ZXx8SChyKSYmKG8ubGVuZ3RofHwhdS5sZW5ndGgpfHwoZT1yLHI9bixuPXRoaXMsbz12KHIsSW4ocikpKTt2YXIgaT0hKEgoZSkmJlwiY2hhaW5cImluIGUmJiFlLmNoYWluKSxjPVYobik7XG5yZXR1cm4gbW4obyxmdW5jdGlvbihlKXt2YXIgdT1yW2VdO25bZV09dSxjJiYobi5wcm90b3R5cGVbZV09ZnVuY3Rpb24oKXt2YXIgcj10aGlzLl9fY2hhaW5fXztpZihpfHxyKXt2YXIgZT1uKHRoaXMuX193cmFwcGVkX18pO3JldHVybihlLl9fYWN0aW9uc19fPUUodGhpcy5fX2FjdGlvbnNfXykpLnB1c2goe2Z1bmM6dSxhcmdzOmFyZ3VtZW50cyx0aGlzQXJnOm59KSxlLl9fY2hhaW5fXz1yLGV9cmV0dXJuIHUuYXBwbHkobix0KFt0aGlzLnZhbHVlKCldLGFyZ3VtZW50cykpfSl9KSxufXZhciBubix0bj0xLzAscm49L1smPD5cIiddL2csZW49UmVnRXhwKHJuLnNvdXJjZSksdW49dHlwZW9mIHNlbGY9PVwib2JqZWN0XCImJnNlbGYmJnNlbGYuT2JqZWN0PT09T2JqZWN0JiZzZWxmLG9uPXR5cGVvZiBnbG9iYWw9PVwib2JqZWN0XCImJmdsb2JhbCYmZ2xvYmFsLk9iamVjdD09PU9iamVjdCYmZ2xvYmFsfHx1bnx8RnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpLGNuPSh1bj10eXBlb2YgZXhwb3J0cz09XCJvYmplY3RcIiYmZXhwb3J0cyYmIWV4cG9ydHMubm9kZVR5cGUmJmV4cG9ydHMpJiZ0eXBlb2YgbW9kdWxlPT1cIm9iamVjdFwiJiZtb2R1bGUmJiFtb2R1bGUubm9kZVR5cGUmJm1vZHVsZSxmbj1mdW5jdGlvbihuKXtcbnJldHVybiBmdW5jdGlvbih0KXtyZXR1cm4gbnVsbD09bj9ubjpuW3RdfX0oe1wiJlwiOlwiJmFtcDtcIixcIjxcIjpcIiZsdDtcIixcIj5cIjpcIiZndDtcIiwnXCInOlwiJnF1b3Q7XCIsXCInXCI6XCImIzM5O1wifSksYW49QXJyYXkucHJvdG90eXBlLGxuPU9iamVjdC5wcm90b3R5cGUscG49bG4uaGFzT3duUHJvcGVydHksc249MCxobj1sbi50b1N0cmluZyx2bj1vbi5fLHluPU9iamVjdC5jcmVhdGUsYm49bG4ucHJvcGVydHlJc0VudW1lcmFibGUsZ249b24uaXNGaW5pdGUsX249ZnVuY3Rpb24obix0KXtyZXR1cm4gZnVuY3Rpb24ocil7cmV0dXJuIG4odChyKSl9fShPYmplY3Qua2V5cyxPYmplY3QpLGpuPU1hdGgubWF4LGRuPWZ1bmN0aW9uKCl7ZnVuY3Rpb24gbigpe31yZXR1cm4gZnVuY3Rpb24odCl7cmV0dXJuIEgodCk/eW4/eW4odCk6KG4ucHJvdG90eXBlPXQsdD1uZXcgbixuLnByb3RvdHlwZT1ubix0KTp7fX19KCk7aS5wcm90b3R5cGU9ZG4oby5wcm90b3R5cGUpLGkucHJvdG90eXBlLmNvbnN0cnVjdG9yPWk7XG52YXIgbW49ZnVuY3Rpb24obix0KXtyZXR1cm4gZnVuY3Rpb24ocixlKXtpZihudWxsPT1yKXJldHVybiByO2lmKCFVKHIpKXJldHVybiBuKHIsZSk7Zm9yKHZhciB1PXIubGVuZ3RoLG89dD91Oi0xLGk9T2JqZWN0KHIpOyh0P28tLTorK288dSkmJmZhbHNlIT09ZShpW29dLG8saSk7KTtyZXR1cm4gcn19KGgpLE9uPWZ1bmN0aW9uKG4pe3JldHVybiBmdW5jdGlvbih0LHIsZSl7dmFyIHU9LTEsbz1PYmplY3QodCk7ZT1lKHQpO2Zvcih2YXIgaT1lLmxlbmd0aDtpLS07KXt2YXIgYz1lW24/aTorK3VdO2lmKGZhbHNlPT09cihvW2NdLGMsbykpYnJlYWt9cmV0dXJuIHR9fSgpLHhuPVksQW49ZnVuY3Rpb24obil7cmV0dXJuIGZ1bmN0aW9uKHQscixlKXt2YXIgdT1PYmplY3QodCk7aWYoIVUodCkpe3ZhciBvPV8ocik7dD1Jbih0KSxyPWZ1bmN0aW9uKG4pe3JldHVybiBvKHVbbl0sbix1KX19cmV0dXJuIHI9bih0LHIsZSksLTE8cj91W28/dFtyXTpyXTpubn19KGZ1bmN0aW9uKG4sdCxyKXt2YXIgZT1udWxsPT1uPzA6bi5sZW5ndGg7XG5pZighZSlyZXR1cm4tMTtyPW51bGw9PXI/MDpGbihyKSwwPnImJihyPWpuKGUrciwwKSk7bjp7Zm9yKHQ9Xyh0KSxlPW4ubGVuZ3RoLHIrPS0xOysrcjxlOylpZih0KG5bcl0scixuKSl7bj1yO2JyZWFrIG59bj0tMX1yZXR1cm4gbn0pLEVuPXgoZnVuY3Rpb24obix0LHIpe3JldHVybiBUKG4sdCxyKX0pLHduPXgoZnVuY3Rpb24obix0KXtyZXR1cm4gZihuLDEsdCl9KSxrbj14KGZ1bmN0aW9uKG4sdCxyKXtyZXR1cm4gZihuLFNuKHQpfHwwLHIpfSksTm49QXJyYXkuaXNBcnJheSxGbj1OdW1iZXIsU249TnVtYmVyLFRuPUYoZnVuY3Rpb24obix0KXtOKHQsX24odCksbil9KSxCbj1GKGZ1bmN0aW9uKG4sdCl7Tih0LEkodCksbil9KSxSbj1GKGZ1bmN0aW9uKG4sdCxyLGUpe04odCxxbih0KSxuLGUpfSksRG49eChmdW5jdGlvbihuKXtyZXR1cm4gbi5wdXNoKG5uLGMpLFJuLmFwcGx5KG5uLG4pfSksSW49X24scW49SSwkbj1mdW5jdGlvbihuKXtyZXR1cm4geG4ocShuLG5uLCQpLG4rXCJcIik7XG59KGZ1bmN0aW9uKG4sdCl7cmV0dXJuIG51bGw9PW4/e306TyhuLHQpfSk7by5hc3NpZ25Jbj1CbixvLmJlZm9yZT1KLG8uYmluZD1FbixvLmNoYWluPWZ1bmN0aW9uKG4pe3JldHVybiBuPW8obiksbi5fX2NoYWluX189dHJ1ZSxufSxvLmNvbXBhY3Q9ZnVuY3Rpb24obil7cmV0dXJuIHAobixCb29sZWFuKX0sby5jb25jYXQ9ZnVuY3Rpb24oKXt2YXIgbj1hcmd1bWVudHMubGVuZ3RoO2lmKCFuKXJldHVybltdO2Zvcih2YXIgcj1BcnJheShuLTEpLGU9YXJndW1lbnRzWzBdO24tLTspcltuLTFdPWFyZ3VtZW50c1tuXTtyZXR1cm4gdChObihlKT9FKGUpOltlXSxzKHIsMSkpfSxvLmNyZWF0ZT1mdW5jdGlvbihuLHQpe3ZhciByPWRuKG4pO3JldHVybiBudWxsPT10P3I6VG4ocix0KX0sby5kZWZhdWx0cz1EbixvLmRlZmVyPXduLG8uZGVsYXk9a24sby5maWx0ZXI9ZnVuY3Rpb24obix0KXtyZXR1cm4gcChuLF8odCkpfSxvLmZsYXR0ZW49JCxvLmZsYXR0ZW5EZWVwPWZ1bmN0aW9uKG4pe1xucmV0dXJuKG51bGw9PW4/MDpuLmxlbmd0aCk/cyhuLHRuKTpbXX0sby5pdGVyYXRlZT1fLG8ua2V5cz1JbixvLm1hcD1mdW5jdGlvbihuLHQpe3JldHVybiBkKG4sXyh0KSl9LG8ubWF0Y2hlcz1mdW5jdGlvbihuKXtyZXR1cm4gbShUbih7fSxuKSl9LG8ubWl4aW49WixvLm5lZ2F0ZT1mdW5jdGlvbihuKXtpZih0eXBlb2YgbiE9XCJmdW5jdGlvblwiKXRocm93IG5ldyBUeXBlRXJyb3IoXCJFeHBlY3RlZCBhIGZ1bmN0aW9uXCIpO3JldHVybiBmdW5jdGlvbigpe3JldHVybiFuLmFwcGx5KHRoaXMsYXJndW1lbnRzKX19LG8ub25jZT1mdW5jdGlvbihuKXtyZXR1cm4gSigyLG4pfSxvLnBpY2s9JG4sby5zbGljZT1mdW5jdGlvbihuLHQscil7dmFyIGU9bnVsbD09bj8wOm4ubGVuZ3RoO3JldHVybiByPXI9PT1ubj9lOityLGU/QShuLG51bGw9PXQ/MDordCxyKTpbXX0sby5zb3J0Qnk9ZnVuY3Rpb24obix0KXt2YXIgZT0wO3JldHVybiB0PV8odCksZChkKG4sZnVuY3Rpb24obixyLHUpe3JldHVybntcbnZhbHVlOm4saW5kZXg6ZSsrLGNyaXRlcmlhOnQobixyLHUpfX0pLnNvcnQoZnVuY3Rpb24obix0KXt2YXIgcjtuOntyPW4uY3JpdGVyaWE7dmFyIGU9dC5jcml0ZXJpYTtpZihyIT09ZSl7dmFyIHU9ciE9PW5uLG89bnVsbD09PXIsaT1yPT09cixjPWUhPT1ubixmPW51bGw9PT1lLGE9ZT09PWU7aWYoIWYmJnI+ZXx8byYmYyYmYXx8IXUmJmF8fCFpKXtyPTE7YnJlYWsgbn1pZighbyYmcjxlfHxmJiZ1JiZpfHwhYyYmaXx8IWEpe3I9LTE7YnJlYWsgbn19cj0wfXJldHVybiByfHxuLmluZGV4LXQuaW5kZXh9KSxyKFwidmFsdWVcIikpfSxvLnRhcD1mdW5jdGlvbihuLHQpe3JldHVybiB0KG4pLG59LG8udGhydT1mdW5jdGlvbihuLHQpe3JldHVybiB0KG4pfSxvLnRvQXJyYXk9ZnVuY3Rpb24obil7cmV0dXJuIFUobik/bi5sZW5ndGg/RShuKTpbXTpYKG4pfSxvLnZhbHVlcz1YLG8uZXh0ZW5kPUJuLFoobyxvKSxvLmNsb25lPWZ1bmN0aW9uKG4pe3JldHVybiBIKG4pP05uKG4pP0Uobik6TihuLF9uKG4pKTpuO1xufSxvLmVzY2FwZT1mdW5jdGlvbihuKXtyZXR1cm4obj1XKG4pKSYmZW4udGVzdChuKT9uLnJlcGxhY2Uocm4sZm4pOm59LG8uZXZlcnk9ZnVuY3Rpb24obix0LHIpe3JldHVybiB0PXI/bm46dCxhKG4sXyh0KSl9LG8uZmluZD1BbixvLmZvckVhY2g9QyxvLmhhcz1mdW5jdGlvbihuLHQpe3JldHVybiBudWxsIT1uJiZwbi5jYWxsKG4sdCl9LG8uaGVhZD1QLG8uaWRlbnRpdHk9WSxvLmluZGV4T2Y9eixvLmlzQXJndW1lbnRzPW4sby5pc0FycmF5PU5uLG8uaXNCb29sZWFuPWZ1bmN0aW9uKG4pe3JldHVybiB0cnVlPT09bnx8ZmFsc2U9PT1ufHxLKG4pJiZcIltvYmplY3QgQm9vbGVhbl1cIj09aG4uY2FsbChuKX0sby5pc0RhdGU9ZnVuY3Rpb24obil7cmV0dXJuIEsobikmJlwiW29iamVjdCBEYXRlXVwiPT1obi5jYWxsKG4pfSxvLmlzRW1wdHk9ZnVuY3Rpb24odCl7cmV0dXJuIFUodCkmJihObih0KXx8USh0KXx8Vih0LnNwbGljZSl8fG4odCkpPyF0Lmxlbmd0aDohX24odCkubGVuZ3RofSxvLmlzRXF1YWw9ZnVuY3Rpb24obix0KXtcbnJldHVybiBiKG4sdCl9LG8uaXNGaW5pdGU9ZnVuY3Rpb24obil7cmV0dXJuIHR5cGVvZiBuPT1cIm51bWJlclwiJiZnbihuKX0sby5pc0Z1bmN0aW9uPVYsby5pc05hTj1mdW5jdGlvbihuKXtyZXR1cm4gTChuKSYmbiE9K259LG8uaXNOdWxsPWZ1bmN0aW9uKG4pe3JldHVybiBudWxsPT09bn0sby5pc051bWJlcj1MLG8uaXNPYmplY3Q9SCxvLmlzUmVnRXhwPWZ1bmN0aW9uKG4pe3JldHVybiBLKG4pJiZcIltvYmplY3QgUmVnRXhwXVwiPT1obi5jYWxsKG4pfSxvLmlzU3RyaW5nPVEsby5pc1VuZGVmaW5lZD1mdW5jdGlvbihuKXtyZXR1cm4gbj09PW5ufSxvLmxhc3Q9ZnVuY3Rpb24obil7dmFyIHQ9bnVsbD09bj8wOm4ubGVuZ3RoO3JldHVybiB0P25bdC0xXTpubn0sby5tYXg9ZnVuY3Rpb24obil7cmV0dXJuIG4mJm4ubGVuZ3RoP2wobixZLHkpOm5ufSxvLm1pbj1mdW5jdGlvbihuKXtyZXR1cm4gbiYmbi5sZW5ndGg/bChuLFksaik6bm59LG8ubm9Db25mbGljdD1mdW5jdGlvbigpe3JldHVybiBvbi5fPT09dGhpcyYmKG9uLl89dm4pLFxudGhpc30sby5ub29wPWZ1bmN0aW9uKCl7fSxvLnJlZHVjZT1HLG8ucmVzdWx0PWZ1bmN0aW9uKG4sdCxyKXtyZXR1cm4gdD1udWxsPT1uP25uOm5bdF0sdD09PW5uJiYodD1yKSxWKHQpP3QuY2FsbChuKTp0fSxvLnNpemU9ZnVuY3Rpb24obil7cmV0dXJuIG51bGw9PW4/MDoobj1VKG4pP246X24obiksbi5sZW5ndGgpfSxvLnNvbWU9ZnVuY3Rpb24obix0LHIpe3JldHVybiB0PXI/bm46dCx3KG4sXyh0KSl9LG8udW5pcXVlSWQ9ZnVuY3Rpb24obil7dmFyIHQ9KytzbjtyZXR1cm4gVyhuKSt0fSxvLmVhY2g9QyxvLmZpcnN0PVAsWihvLGZ1bmN0aW9uKCl7dmFyIG49e307cmV0dXJuIGgobyxmdW5jdGlvbih0LHIpe3BuLmNhbGwoby5wcm90b3R5cGUscil8fChuW3JdPXQpfSksbn0oKSx7Y2hhaW46ZmFsc2V9KSxvLlZFUlNJT049XCI0LjE3LjJcIixtbihcInBvcCBqb2luIHJlcGxhY2UgcmV2ZXJzZSBzcGxpdCBwdXNoIHNoaWZ0IHNvcnQgc3BsaWNlIHVuc2hpZnRcIi5zcGxpdChcIiBcIiksZnVuY3Rpb24obil7XG52YXIgdD0oL14oPzpyZXBsYWNlfHNwbGl0KSQvLnRlc3Qobik/U3RyaW5nLnByb3RvdHlwZTphbilbbl0scj0vXig/OnB1c2h8c29ydHx1bnNoaWZ0KSQvLnRlc3Qobik/XCJ0YXBcIjpcInRocnVcIixlPS9eKD86cG9wfGpvaW58cmVwbGFjZXxzaGlmdCkkLy50ZXN0KG4pO28ucHJvdG90eXBlW25dPWZ1bmN0aW9uKCl7dmFyIG49YXJndW1lbnRzO2lmKGUmJiF0aGlzLl9fY2hhaW5fXyl7dmFyIHU9dGhpcy52YWx1ZSgpO3JldHVybiB0LmFwcGx5KE5uKHUpP3U6W10sbil9cmV0dXJuIHRoaXNbcl0oZnVuY3Rpb24ocil7cmV0dXJuIHQuYXBwbHkoTm4ocik/cjpbXSxuKX0pfX0pLG8ucHJvdG90eXBlLnRvSlNPTj1vLnByb3RvdHlwZS52YWx1ZU9mPW8ucHJvdG90eXBlLnZhbHVlPWZ1bmN0aW9uKCl7cmV0dXJuIGsodGhpcy5fX3dyYXBwZWRfXyx0aGlzLl9fYWN0aW9uc19fKX0sdHlwZW9mIGRlZmluZT09XCJmdW5jdGlvblwiJiZ0eXBlb2YgZGVmaW5lLmFtZD09XCJvYmplY3RcIiYmZGVmaW5lLmFtZD8ob24uXz1vLFxuZGVmaW5lKGZ1bmN0aW9uKCl7cmV0dXJuIG99KSk6Y24/KChjbi5leHBvcnRzPW8pLl89byx1bi5fPW8pOm9uLl89b30pLmNhbGwodGhpcyk7XG4iLCIvKlxuICogU3dpcGUgMi4wXG4gKlxuICogQnJhZCBCaXJkc2FsbFxuICogQ29weXJpZ2h0IDIwMTMsIE1JVCBMaWNlbnNlXG4gKlxuKi9cblxuZnVuY3Rpb24gU3dpcGUoY29udGFpbmVyLCBvcHRpb25zKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuXG4gIC8vIHV0aWxpdGllc1xuICB2YXIgbm9vcCA9IGZ1bmN0aW9uKCkge307IC8vIHNpbXBsZSBubyBvcGVyYXRpb24gZnVuY3Rpb25cbiAgdmFyIG9mZmxvYWRGbiA9IGZ1bmN0aW9uKGZuKSB7IHNldFRpbWVvdXQoZm4gfHwgbm9vcCwgMCk7IH07IC8vIG9mZmxvYWQgYSBmdW5jdGlvbnMgZXhlY3V0aW9uXG5cbiAgLy8gY2hlY2sgYnJvd3NlciBjYXBhYmlsaXRpZXNcbiAgdmFyIGJyb3dzZXIgPSB7XG4gICAgYWRkRXZlbnRMaXN0ZW5lcjogISF3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcixcbiAgICB0b3VjaDogKCdvbnRvdWNoc3RhcnQnIGluIHdpbmRvdykgfHwgd2luZG93LkRvY3VtZW50VG91Y2ggJiYgZG9jdW1lbnQgaW5zdGFuY2VvZiBEb2N1bWVudFRvdWNoLFxuICAgIHRyYW5zaXRpb25zOiAoZnVuY3Rpb24odGVtcCkge1xuICAgICAgdmFyIHByb3BzID0gWyd0cmFuc2l0aW9uUHJvcGVydHknLCAnV2Via2l0VHJhbnNpdGlvbicsICdNb3pUcmFuc2l0aW9uJywgJ09UcmFuc2l0aW9uJywgJ21zVHJhbnNpdGlvbiddO1xuICAgICAgZm9yICggdmFyIGkgaW4gcHJvcHMgKSBpZiAodGVtcC5zdHlsZVsgcHJvcHNbaV0gXSAhPT0gdW5kZWZpbmVkKSByZXR1cm4gdHJ1ZTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KShkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzd2lwZScpKVxuICB9O1xuXG4gIC8vIHF1aXQgaWYgbm8gcm9vdCBlbGVtZW50XG4gIGlmICghY29udGFpbmVyKSByZXR1cm47XG4gIHZhciBlbGVtZW50ID0gY29udGFpbmVyLmNoaWxkcmVuWzBdO1xuICB2YXIgc2xpZGVzLCBzbGlkZVBvcywgd2lkdGgsIGxlbmd0aDtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIHZhciBpbmRleCA9IHBhcnNlSW50KG9wdGlvbnMuc3RhcnRTbGlkZSwgMTApIHx8IDA7XG4gIHZhciBzcGVlZCA9IG9wdGlvbnMuc3BlZWQgfHwgMzAwO1xuICBvcHRpb25zLmNvbnRpbnVvdXMgPSBvcHRpb25zLmNvbnRpbnVvdXMgIT09IHVuZGVmaW5lZCA/IG9wdGlvbnMuY29udGludW91cyA6IHRydWU7XG5cbiAgZnVuY3Rpb24gc2V0dXAoKSB7XG5cbiAgICAvLyBjYWNoZSBzbGlkZXNcbiAgICBzbGlkZXMgPSBlbGVtZW50LmNoaWxkcmVuO1xuICAgIGxlbmd0aCA9IHNsaWRlcy5sZW5ndGg7XG5cbiAgICAvLyBzZXQgY29udGludW91cyB0byBmYWxzZSBpZiBvbmx5IG9uZSBzbGlkZVxuICAgIGlmIChzbGlkZXMubGVuZ3RoIDwgMikgb3B0aW9ucy5jb250aW51b3VzID0gZmFsc2U7XG5cbiAgICAvL3NwZWNpYWwgY2FzZSBpZiB0d28gc2xpZGVzXG4gICAgaWYgKGJyb3dzZXIudHJhbnNpdGlvbnMgJiYgb3B0aW9ucy5jb250aW51b3VzICYmIHNsaWRlcy5sZW5ndGggPCAzKSB7XG4gICAgICBlbGVtZW50LmFwcGVuZENoaWxkKHNsaWRlc1swXS5jbG9uZU5vZGUodHJ1ZSkpO1xuICAgICAgZWxlbWVudC5hcHBlbmRDaGlsZChlbGVtZW50LmNoaWxkcmVuWzFdLmNsb25lTm9kZSh0cnVlKSk7XG4gICAgICBzbGlkZXMgPSBlbGVtZW50LmNoaWxkcmVuO1xuICAgIH1cblxuICAgIC8vIGNyZWF0ZSBhbiBhcnJheSB0byBzdG9yZSBjdXJyZW50IHBvc2l0aW9ucyBvZiBlYWNoIHNsaWRlXG4gICAgc2xpZGVQb3MgPSBuZXcgQXJyYXkoc2xpZGVzLmxlbmd0aCk7XG5cbiAgICAvLyBkZXRlcm1pbmUgd2lkdGggb2YgZWFjaCBzbGlkZVxuICAgIHdpZHRoID0gY29udGFpbmVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoIHx8IGNvbnRhaW5lci5vZmZzZXRXaWR0aDtcblxuICAgIGVsZW1lbnQuc3R5bGUud2lkdGggPSAoc2xpZGVzLmxlbmd0aCAqIHdpZHRoKSArICdweCc7XG5cbiAgICAvLyBzdGFjayBlbGVtZW50c1xuICAgIHZhciBwb3MgPSBzbGlkZXMubGVuZ3RoO1xuICAgIHdoaWxlKHBvcy0tKSB7XG5cbiAgICAgIHZhciBzbGlkZSA9IHNsaWRlc1twb3NdO1xuXG4gICAgICBzbGlkZS5zdHlsZS53aWR0aCA9IHdpZHRoICsgJ3B4JztcbiAgICAgIHNsaWRlLnNldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcsIHBvcyk7XG5cbiAgICAgIGlmIChicm93c2VyLnRyYW5zaXRpb25zKSB7XG4gICAgICAgIHNsaWRlLnN0eWxlLmxlZnQgPSAocG9zICogLXdpZHRoKSArICdweCc7XG4gICAgICAgIG1vdmUocG9zLCBpbmRleCA+IHBvcyA/IC13aWR0aCA6IChpbmRleCA8IHBvcyA/IHdpZHRoIDogMCksIDApO1xuICAgICAgfVxuXG4gICAgfVxuXG4gICAgLy8gcmVwb3NpdGlvbiBlbGVtZW50cyBiZWZvcmUgYW5kIGFmdGVyIGluZGV4XG4gICAgaWYgKG9wdGlvbnMuY29udGludW91cyAmJiBicm93c2VyLnRyYW5zaXRpb25zKSB7XG4gICAgICBtb3ZlKGNpcmNsZShpbmRleC0xKSwgLXdpZHRoLCAwKTtcbiAgICAgIG1vdmUoY2lyY2xlKGluZGV4KzEpLCB3aWR0aCwgMCk7XG4gICAgfVxuXG4gICAgaWYgKCFicm93c2VyLnRyYW5zaXRpb25zKSBlbGVtZW50LnN0eWxlLmxlZnQgPSAoaW5kZXggKiAtd2lkdGgpICsgJ3B4JztcblxuICAgIGNvbnRhaW5lci5zdHlsZS52aXNpYmlsaXR5ID0gJ3Zpc2libGUnO1xuXG4gIH1cblxuICBmdW5jdGlvbiBwcmV2KCkge1xuXG4gICAgaWYgKG9wdGlvbnMuY29udGludW91cykgc2xpZGUoaW5kZXgtMSk7XG4gICAgZWxzZSBpZiAoaW5kZXgpIHNsaWRlKGluZGV4LTEpO1xuXG4gIH1cblxuICBmdW5jdGlvbiBuZXh0KCkge1xuXG4gICAgaWYgKG9wdGlvbnMuY29udGludW91cykgc2xpZGUoaW5kZXgrMSk7XG4gICAgZWxzZSBpZiAoaW5kZXggPCBzbGlkZXMubGVuZ3RoIC0gMSkgc2xpZGUoaW5kZXgrMSk7XG5cbiAgfVxuXG4gIGZ1bmN0aW9uIGNpcmNsZShpbmRleCkge1xuXG4gICAgLy8gYSBzaW1wbGUgcG9zaXRpdmUgbW9kdWxvIHVzaW5nIHNsaWRlcy5sZW5ndGhcbiAgICByZXR1cm4gKHNsaWRlcy5sZW5ndGggKyAoaW5kZXggJSBzbGlkZXMubGVuZ3RoKSkgJSBzbGlkZXMubGVuZ3RoO1xuXG4gIH1cblxuICBmdW5jdGlvbiBzbGlkZSh0bywgc2xpZGVTcGVlZCkge1xuXG4gICAgLy8gZG8gbm90aGluZyBpZiBhbHJlYWR5IG9uIHJlcXVlc3RlZCBzbGlkZVxuICAgIGlmIChpbmRleCA9PSB0bykgcmV0dXJuO1xuXG4gICAgaWYgKGJyb3dzZXIudHJhbnNpdGlvbnMpIHtcblxuICAgICAgdmFyIGRpcmVjdGlvbiA9IE1hdGguYWJzKGluZGV4LXRvKSAvIChpbmRleC10byk7IC8vIDE6IGJhY2t3YXJkLCAtMTogZm9yd2FyZFxuXG4gICAgICAvLyBnZXQgdGhlIGFjdHVhbCBwb3NpdGlvbiBvZiB0aGUgc2xpZGVcbiAgICAgIGlmIChvcHRpb25zLmNvbnRpbnVvdXMpIHtcbiAgICAgICAgdmFyIG5hdHVyYWxfZGlyZWN0aW9uID0gZGlyZWN0aW9uO1xuICAgICAgICBkaXJlY3Rpb24gPSAtc2xpZGVQb3NbY2lyY2xlKHRvKV0gLyB3aWR0aDtcblxuICAgICAgICAvLyBpZiBnb2luZyBmb3J3YXJkIGJ1dCB0byA8IGluZGV4LCB1c2UgdG8gPSBzbGlkZXMubGVuZ3RoICsgdG9cbiAgICAgICAgLy8gaWYgZ29pbmcgYmFja3dhcmQgYnV0IHRvID4gaW5kZXgsIHVzZSB0byA9IC1zbGlkZXMubGVuZ3RoICsgdG9cbiAgICAgICAgaWYgKGRpcmVjdGlvbiAhPT0gbmF0dXJhbF9kaXJlY3Rpb24pIHRvID0gIC1kaXJlY3Rpb24gKiBzbGlkZXMubGVuZ3RoICsgdG87XG5cbiAgICAgIH1cblxuICAgICAgdmFyIGRpZmYgPSBNYXRoLmFicyhpbmRleC10bykgLSAxO1xuXG4gICAgICAvLyBtb3ZlIGFsbCB0aGUgc2xpZGVzIGJldHdlZW4gaW5kZXggYW5kIHRvIGluIHRoZSByaWdodCBkaXJlY3Rpb25cbiAgICAgIHdoaWxlIChkaWZmLS0pIG1vdmUoIGNpcmNsZSgodG8gPiBpbmRleCA/IHRvIDogaW5kZXgpIC0gZGlmZiAtIDEpLCB3aWR0aCAqIGRpcmVjdGlvbiwgMCk7XG5cbiAgICAgIHRvID0gY2lyY2xlKHRvKTtcblxuICAgICAgbW92ZShpbmRleCwgd2lkdGggKiBkaXJlY3Rpb24sIHNsaWRlU3BlZWQgfHwgc3BlZWQpO1xuICAgICAgbW92ZSh0bywgMCwgc2xpZGVTcGVlZCB8fCBzcGVlZCk7XG5cbiAgICAgIGlmIChvcHRpb25zLmNvbnRpbnVvdXMpIG1vdmUoY2lyY2xlKHRvIC0gZGlyZWN0aW9uKSwgLSh3aWR0aCAqIGRpcmVjdGlvbiksIDApOyAvLyB3ZSBuZWVkIHRvIGdldCB0aGUgbmV4dCBpbiBwbGFjZVxuXG4gICAgfSBlbHNlIHtcblxuICAgICAgdG8gPSBjaXJjbGUodG8pO1xuICAgICAgYW5pbWF0ZShpbmRleCAqIC13aWR0aCwgdG8gKiAtd2lkdGgsIHNsaWRlU3BlZWQgfHwgc3BlZWQpO1xuICAgICAgLy9ubyBmYWxsYmFjayBmb3IgYSBjaXJjdWxhciBjb250aW51b3VzIGlmIHRoZSBicm93c2VyIGRvZXMgbm90IGFjY2VwdCB0cmFuc2l0aW9uc1xuICAgIH1cblxuICAgIGluZGV4ID0gdG87XG4gICAgb2ZmbG9hZEZuKG9wdGlvbnMuY2FsbGJhY2sgJiYgb3B0aW9ucy5jYWxsYmFjayhpbmRleCwgc2xpZGVzW2luZGV4XSkpO1xuICB9XG5cbiAgZnVuY3Rpb24gbW92ZShpbmRleCwgZGlzdCwgc3BlZWQpIHtcblxuICAgIHRyYW5zbGF0ZShpbmRleCwgZGlzdCwgc3BlZWQpO1xuICAgIHNsaWRlUG9zW2luZGV4XSA9IGRpc3Q7XG5cbiAgfVxuXG4gIGZ1bmN0aW9uIHRyYW5zbGF0ZShpbmRleCwgZGlzdCwgc3BlZWQpIHtcblxuICAgIHZhciBzbGlkZSA9IHNsaWRlc1tpbmRleF07XG4gICAgdmFyIHN0eWxlID0gc2xpZGUgJiYgc2xpZGUuc3R5bGU7XG5cbiAgICBpZiAoIXN0eWxlKSByZXR1cm47XG5cbiAgICBzdHlsZS53ZWJraXRUcmFuc2l0aW9uRHVyYXRpb24gPVxuICAgIHN0eWxlLk1velRyYW5zaXRpb25EdXJhdGlvbiA9XG4gICAgc3R5bGUubXNUcmFuc2l0aW9uRHVyYXRpb24gPVxuICAgIHN0eWxlLk9UcmFuc2l0aW9uRHVyYXRpb24gPVxuICAgIHN0eWxlLnRyYW5zaXRpb25EdXJhdGlvbiA9IHNwZWVkICsgJ21zJztcblxuICAgIHN0eWxlLndlYmtpdFRyYW5zZm9ybSA9ICd0cmFuc2xhdGUoJyArIGRpc3QgKyAncHgsMCknICsgJ3RyYW5zbGF0ZVooMCknO1xuICAgIHN0eWxlLm1zVHJhbnNmb3JtID1cbiAgICBzdHlsZS5Nb3pUcmFuc2Zvcm0gPVxuICAgIHN0eWxlLk9UcmFuc2Zvcm0gPSAndHJhbnNsYXRlWCgnICsgZGlzdCArICdweCknO1xuXG4gIH1cblxuICBmdW5jdGlvbiBhbmltYXRlKGZyb20sIHRvLCBzcGVlZCkge1xuXG4gICAgLy8gaWYgbm90IGFuIGFuaW1hdGlvbiwganVzdCByZXBvc2l0aW9uXG4gICAgaWYgKCFzcGVlZCkge1xuXG4gICAgICBlbGVtZW50LnN0eWxlLmxlZnQgPSB0byArICdweCc7XG4gICAgICByZXR1cm47XG5cbiAgICB9XG5cbiAgICB2YXIgc3RhcnQgPSArbmV3IERhdGU7XG5cbiAgICB2YXIgdGltZXIgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcblxuICAgICAgdmFyIHRpbWVFbGFwID0gK25ldyBEYXRlIC0gc3RhcnQ7XG5cbiAgICAgIGlmICh0aW1lRWxhcCA+IHNwZWVkKSB7XG5cbiAgICAgICAgZWxlbWVudC5zdHlsZS5sZWZ0ID0gdG8gKyAncHgnO1xuXG4gICAgICAgIGlmIChkZWxheSkgYmVnaW4oKTtcblxuICAgICAgICBvcHRpb25zLnRyYW5zaXRpb25FbmQgJiYgb3B0aW9ucy50cmFuc2l0aW9uRW5kLmNhbGwoZXZlbnQsIGluZGV4LCBzbGlkZXNbaW5kZXhdKTtcblxuICAgICAgICBjbGVhckludGVydmFsKHRpbWVyKTtcbiAgICAgICAgcmV0dXJuO1xuXG4gICAgICB9XG5cbiAgICAgIGVsZW1lbnQuc3R5bGUubGVmdCA9ICgoICh0byAtIGZyb20pICogKE1hdGguZmxvb3IoKHRpbWVFbGFwIC8gc3BlZWQpICogMTAwKSAvIDEwMCkgKSArIGZyb20pICsgJ3B4JztcblxuICAgIH0sIDQpO1xuXG4gIH1cblxuICAvLyBzZXR1cCBhdXRvIHNsaWRlc2hvd1xuICB2YXIgZGVsYXkgPSBvcHRpb25zLmF1dG8gfHwgMDtcbiAgdmFyIGludGVydmFsO1xuXG4gIGZ1bmN0aW9uIGJlZ2luKCkge1xuXG4gICAgaW50ZXJ2YWwgPSBzZXRUaW1lb3V0KG5leHQsIGRlbGF5KTtcblxuICB9XG5cbiAgZnVuY3Rpb24gc3RvcCgpIHtcblxuICAgIGRlbGF5ID0gMDtcbiAgICBjbGVhclRpbWVvdXQoaW50ZXJ2YWwpO1xuXG4gIH1cblxuXG4gIC8vIHNldHVwIGluaXRpYWwgdmFyc1xuICB2YXIgc3RhcnQgPSB7fTtcbiAgdmFyIGRlbHRhID0ge307XG4gIHZhciBpc1Njcm9sbGluZztcblxuICAvLyBzZXR1cCBldmVudCBjYXB0dXJpbmdcbiAgdmFyIGV2ZW50cyA9IHtcblxuICAgIGhhbmRsZUV2ZW50OiBmdW5jdGlvbihldmVudCkge1xuXG4gICAgICBzd2l0Y2ggKGV2ZW50LnR5cGUpIHtcbiAgICAgICAgY2FzZSAndG91Y2hzdGFydCc6IHRoaXMuc3RhcnQoZXZlbnQpOyBicmVhaztcbiAgICAgICAgY2FzZSAndG91Y2htb3ZlJzogdGhpcy5tb3ZlKGV2ZW50KTsgYnJlYWs7XG4gICAgICAgIGNhc2UgJ3RvdWNoZW5kJzogb2ZmbG9hZEZuKHRoaXMuZW5kKGV2ZW50KSk7IGJyZWFrO1xuICAgICAgICBjYXNlICd3ZWJraXRUcmFuc2l0aW9uRW5kJzpcbiAgICAgICAgY2FzZSAnbXNUcmFuc2l0aW9uRW5kJzpcbiAgICAgICAgY2FzZSAnb1RyYW5zaXRpb25FbmQnOlxuICAgICAgICBjYXNlICdvdHJhbnNpdGlvbmVuZCc6XG4gICAgICAgIGNhc2UgJ3RyYW5zaXRpb25lbmQnOiBvZmZsb2FkRm4odGhpcy50cmFuc2l0aW9uRW5kKGV2ZW50KSk7IGJyZWFrO1xuICAgICAgICBjYXNlICdyZXNpemUnOiBvZmZsb2FkRm4oc2V0dXApOyBicmVhaztcbiAgICAgIH1cblxuICAgICAgaWYgKG9wdGlvbnMuc3RvcFByb3BhZ2F0aW9uKSBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgIH0sXG4gICAgc3RhcnQ6IGZ1bmN0aW9uKGV2ZW50KSB7XG5cbiAgICAgIHZhciB0b3VjaGVzID0gZXZlbnQudG91Y2hlc1swXTtcblxuICAgICAgLy8gbWVhc3VyZSBzdGFydCB2YWx1ZXNcbiAgICAgIHN0YXJ0ID0ge1xuXG4gICAgICAgIC8vIGdldCBpbml0aWFsIHRvdWNoIGNvb3Jkc1xuICAgICAgICB4OiB0b3VjaGVzLnBhZ2VYLFxuICAgICAgICB5OiB0b3VjaGVzLnBhZ2VZLFxuXG4gICAgICAgIC8vIHN0b3JlIHRpbWUgdG8gZGV0ZXJtaW5lIHRvdWNoIGR1cmF0aW9uXG4gICAgICAgIHRpbWU6ICtuZXcgRGF0ZVxuXG4gICAgICB9O1xuXG4gICAgICAvLyB1c2VkIGZvciB0ZXN0aW5nIGZpcnN0IG1vdmUgZXZlbnRcbiAgICAgIGlzU2Nyb2xsaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgICAvLyByZXNldCBkZWx0YSBhbmQgZW5kIG1lYXN1cmVtZW50c1xuICAgICAgZGVsdGEgPSB7fTtcblxuICAgICAgLy8gYXR0YWNoIHRvdWNobW92ZSBhbmQgdG91Y2hlbmQgbGlzdGVuZXJzXG4gICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRoaXMsIGZhbHNlKTtcbiAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0aGlzLCBmYWxzZSk7XG5cbiAgICB9LFxuICAgIG1vdmU6IGZ1bmN0aW9uKGV2ZW50KSB7XG5cbiAgICAgIC8vIGVuc3VyZSBzd2lwaW5nIHdpdGggb25lIHRvdWNoIGFuZCBub3QgcGluY2hpbmdcbiAgICAgIGlmICggZXZlbnQudG91Y2hlcy5sZW5ndGggPiAxIHx8IGV2ZW50LnNjYWxlICYmIGV2ZW50LnNjYWxlICE9PSAxKSByZXR1cm5cblxuICAgICAgaWYgKG9wdGlvbnMuZGlzYWJsZVNjcm9sbCkgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgdmFyIHRvdWNoZXMgPSBldmVudC50b3VjaGVzWzBdO1xuXG4gICAgICAvLyBtZWFzdXJlIGNoYW5nZSBpbiB4IGFuZCB5XG4gICAgICBkZWx0YSA9IHtcbiAgICAgICAgeDogdG91Y2hlcy5wYWdlWCAtIHN0YXJ0LngsXG4gICAgICAgIHk6IHRvdWNoZXMucGFnZVkgLSBzdGFydC55XG4gICAgICB9XG5cbiAgICAgIC8vIGRldGVybWluZSBpZiBzY3JvbGxpbmcgdGVzdCBoYXMgcnVuIC0gb25lIHRpbWUgdGVzdFxuICAgICAgaWYgKCB0eXBlb2YgaXNTY3JvbGxpbmcgPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgaXNTY3JvbGxpbmcgPSAhISggaXNTY3JvbGxpbmcgfHwgTWF0aC5hYnMoZGVsdGEueCkgPCBNYXRoLmFicyhkZWx0YS55KSApO1xuICAgICAgfVxuXG4gICAgICAvLyBpZiB1c2VyIGlzIG5vdCB0cnlpbmcgdG8gc2Nyb2xsIHZlcnRpY2FsbHlcbiAgICAgIGlmICghaXNTY3JvbGxpbmcpIHtcblxuICAgICAgICAvLyBwcmV2ZW50IG5hdGl2ZSBzY3JvbGxpbmdcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAvLyBzdG9wIHNsaWRlc2hvd1xuICAgICAgICBzdG9wKCk7XG5cbiAgICAgICAgLy8gaW5jcmVhc2UgcmVzaXN0YW5jZSBpZiBmaXJzdCBvciBsYXN0IHNsaWRlXG4gICAgICAgIGlmIChvcHRpb25zLmNvbnRpbnVvdXMpIHsgLy8gd2UgZG9uJ3QgYWRkIHJlc2lzdGFuY2UgYXQgdGhlIGVuZFxuXG4gICAgICAgICAgdHJhbnNsYXRlKGNpcmNsZShpbmRleC0xKSwgZGVsdGEueCArIHNsaWRlUG9zW2NpcmNsZShpbmRleC0xKV0sIDApO1xuICAgICAgICAgIHRyYW5zbGF0ZShpbmRleCwgZGVsdGEueCArIHNsaWRlUG9zW2luZGV4XSwgMCk7XG4gICAgICAgICAgdHJhbnNsYXRlKGNpcmNsZShpbmRleCsxKSwgZGVsdGEueCArIHNsaWRlUG9zW2NpcmNsZShpbmRleCsxKV0sIDApO1xuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICBkZWx0YS54ID1cbiAgICAgICAgICAgIGRlbHRhLnggL1xuICAgICAgICAgICAgICAoICghaW5kZXggJiYgZGVsdGEueCA+IDAgICAgICAgICAgICAgICAvLyBpZiBmaXJzdCBzbGlkZSBhbmQgc2xpZGluZyBsZWZ0XG4gICAgICAgICAgICAgICAgfHwgaW5kZXggPT0gc2xpZGVzLmxlbmd0aCAtIDEgICAgICAgIC8vIG9yIGlmIGxhc3Qgc2xpZGUgYW5kIHNsaWRpbmcgcmlnaHRcbiAgICAgICAgICAgICAgICAmJiBkZWx0YS54IDwgMCAgICAgICAgICAgICAgICAgICAgICAgLy8gYW5kIGlmIHNsaWRpbmcgYXQgYWxsXG4gICAgICAgICAgICAgICkgP1xuICAgICAgICAgICAgICAoIE1hdGguYWJzKGRlbHRhLngpIC8gd2lkdGggKyAxICkgICAgICAvLyBkZXRlcm1pbmUgcmVzaXN0YW5jZSBsZXZlbFxuICAgICAgICAgICAgICA6IDEgKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBubyByZXNpc3RhbmNlIGlmIGZhbHNlXG5cbiAgICAgICAgICAvLyB0cmFuc2xhdGUgMToxXG4gICAgICAgICAgdHJhbnNsYXRlKGluZGV4LTEsIGRlbHRhLnggKyBzbGlkZVBvc1tpbmRleC0xXSwgMCk7XG4gICAgICAgICAgdHJhbnNsYXRlKGluZGV4LCBkZWx0YS54ICsgc2xpZGVQb3NbaW5kZXhdLCAwKTtcbiAgICAgICAgICB0cmFuc2xhdGUoaW5kZXgrMSwgZGVsdGEueCArIHNsaWRlUG9zW2luZGV4KzFdLCAwKTtcbiAgICAgICAgfVxuXG4gICAgICB9XG5cbiAgICB9LFxuICAgIGVuZDogZnVuY3Rpb24oZXZlbnQpIHtcblxuICAgICAgLy8gbWVhc3VyZSBkdXJhdGlvblxuICAgICAgdmFyIGR1cmF0aW9uID0gK25ldyBEYXRlIC0gc3RhcnQudGltZTtcblxuICAgICAgLy8gZGV0ZXJtaW5lIGlmIHNsaWRlIGF0dGVtcHQgdHJpZ2dlcnMgbmV4dC9wcmV2IHNsaWRlXG4gICAgICB2YXIgaXNWYWxpZFNsaWRlID1cbiAgICAgICAgICAgIE51bWJlcihkdXJhdGlvbikgPCAyNTAgICAgICAgICAgICAgICAvLyBpZiBzbGlkZSBkdXJhdGlvbiBpcyBsZXNzIHRoYW4gMjUwbXNcbiAgICAgICAgICAgICYmIE1hdGguYWJzKGRlbHRhLngpID4gMjAgICAgICAgICAgICAvLyBhbmQgaWYgc2xpZGUgYW10IGlzIGdyZWF0ZXIgdGhhbiAyMHB4XG4gICAgICAgICAgICB8fCBNYXRoLmFicyhkZWx0YS54KSA+IHdpZHRoLzI7ICAgICAgLy8gb3IgaWYgc2xpZGUgYW10IGlzIGdyZWF0ZXIgdGhhbiBoYWxmIHRoZSB3aWR0aFxuXG4gICAgICAvLyBkZXRlcm1pbmUgaWYgc2xpZGUgYXR0ZW1wdCBpcyBwYXN0IHN0YXJ0IGFuZCBlbmRcbiAgICAgIHZhciBpc1Bhc3RCb3VuZHMgPVxuICAgICAgICAgICAgIWluZGV4ICYmIGRlbHRhLnggPiAwICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmIGZpcnN0IHNsaWRlIGFuZCBzbGlkZSBhbXQgaXMgZ3JlYXRlciB0aGFuIDBcbiAgICAgICAgICAgIHx8IGluZGV4ID09IHNsaWRlcy5sZW5ndGggLSAxICYmIGRlbHRhLnggPCAwOyAgICAvLyBvciBpZiBsYXN0IHNsaWRlIGFuZCBzbGlkZSBhbXQgaXMgbGVzcyB0aGFuIDBcblxuICAgICAgaWYgKG9wdGlvbnMuY29udGludW91cykgaXNQYXN0Qm91bmRzID0gZmFsc2U7XG5cbiAgICAgIC8vIGRldGVybWluZSBkaXJlY3Rpb24gb2Ygc3dpcGUgKHRydWU6cmlnaHQsIGZhbHNlOmxlZnQpXG4gICAgICB2YXIgZGlyZWN0aW9uID0gZGVsdGEueCA8IDA7XG5cbiAgICAgIC8vIGlmIG5vdCBzY3JvbGxpbmcgdmVydGljYWxseVxuICAgICAgaWYgKCFpc1Njcm9sbGluZykge1xuXG4gICAgICAgIGlmIChpc1ZhbGlkU2xpZGUgJiYgIWlzUGFzdEJvdW5kcykge1xuXG4gICAgICAgICAgaWYgKGRpcmVjdGlvbikge1xuXG4gICAgICAgICAgICBpZiAob3B0aW9ucy5jb250aW51b3VzKSB7IC8vIHdlIG5lZWQgdG8gZ2V0IHRoZSBuZXh0IGluIHRoaXMgZGlyZWN0aW9uIGluIHBsYWNlXG5cbiAgICAgICAgICAgICAgbW92ZShjaXJjbGUoaW5kZXgtMSksIC13aWR0aCwgMCk7XG4gICAgICAgICAgICAgIG1vdmUoY2lyY2xlKGluZGV4KzIpLCB3aWR0aCwgMCk7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIG1vdmUoaW5kZXgtMSwgLXdpZHRoLCAwKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbW92ZShpbmRleCwgc2xpZGVQb3NbaW5kZXhdLXdpZHRoLCBzcGVlZCk7XG4gICAgICAgICAgICBtb3ZlKGNpcmNsZShpbmRleCsxKSwgc2xpZGVQb3NbY2lyY2xlKGluZGV4KzEpXS13aWR0aCwgc3BlZWQpO1xuICAgICAgICAgICAgaW5kZXggPSBjaXJjbGUoaW5kZXgrMSk7XG5cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKG9wdGlvbnMuY29udGludW91cykgeyAvLyB3ZSBuZWVkIHRvIGdldCB0aGUgbmV4dCBpbiB0aGlzIGRpcmVjdGlvbiBpbiBwbGFjZVxuXG4gICAgICAgICAgICAgIG1vdmUoY2lyY2xlKGluZGV4KzEpLCB3aWR0aCwgMCk7XG4gICAgICAgICAgICAgIG1vdmUoY2lyY2xlKGluZGV4LTIpLCAtd2lkdGgsIDApO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBtb3ZlKGluZGV4KzEsIHdpZHRoLCAwKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbW92ZShpbmRleCwgc2xpZGVQb3NbaW5kZXhdK3dpZHRoLCBzcGVlZCk7XG4gICAgICAgICAgICBtb3ZlKGNpcmNsZShpbmRleC0xKSwgc2xpZGVQb3NbY2lyY2xlKGluZGV4LTEpXSt3aWR0aCwgc3BlZWQpO1xuICAgICAgICAgICAgaW5kZXggPSBjaXJjbGUoaW5kZXgtMSk7XG5cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBvcHRpb25zLmNhbGxiYWNrICYmIG9wdGlvbnMuY2FsbGJhY2soaW5kZXgsIHNsaWRlc1tpbmRleF0pO1xuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICBpZiAob3B0aW9ucy5jb250aW51b3VzKSB7XG5cbiAgICAgICAgICAgIG1vdmUoY2lyY2xlKGluZGV4LTEpLCAtd2lkdGgsIHNwZWVkKTtcbiAgICAgICAgICAgIG1vdmUoaW5kZXgsIDAsIHNwZWVkKTtcbiAgICAgICAgICAgIG1vdmUoY2lyY2xlKGluZGV4KzEpLCB3aWR0aCwgc3BlZWQpO1xuXG4gICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgbW92ZShpbmRleC0xLCAtd2lkdGgsIHNwZWVkKTtcbiAgICAgICAgICAgIG1vdmUoaW5kZXgsIDAsIHNwZWVkKTtcbiAgICAgICAgICAgIG1vdmUoaW5kZXgrMSwgd2lkdGgsIHNwZWVkKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICB9XG5cbiAgICAgIC8vIGtpbGwgdG91Y2htb3ZlIGFuZCB0b3VjaGVuZCBldmVudCBsaXN0ZW5lcnMgdW50aWwgdG91Y2hzdGFydCBjYWxsZWQgYWdhaW5cbiAgICAgIGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgZXZlbnRzLCBmYWxzZSlcbiAgICAgIGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCBldmVudHMsIGZhbHNlKVxuXG4gICAgfSxcbiAgICB0cmFuc2l0aW9uRW5kOiBmdW5jdGlvbihldmVudCkge1xuXG4gICAgICBpZiAocGFyc2VJbnQoZXZlbnQudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcpLCAxMCkgPT0gaW5kZXgpIHtcblxuICAgICAgICBpZiAoZGVsYXkpIGJlZ2luKCk7XG5cbiAgICAgICAgb3B0aW9ucy50cmFuc2l0aW9uRW5kICYmIG9wdGlvbnMudHJhbnNpdGlvbkVuZC5jYWxsKGV2ZW50LCBpbmRleCwgc2xpZGVzW2luZGV4XSk7XG5cbiAgICAgIH1cblxuICAgIH1cblxuICB9XG5cbiAgLy8gdHJpZ2dlciBzZXR1cFxuICBzZXR1cCgpO1xuXG4gIC8vIHN0YXJ0IGF1dG8gc2xpZGVzaG93IGlmIGFwcGxpY2FibGVcbiAgaWYgKGRlbGF5KSBiZWdpbigpO1xuXG5cbiAgLy8gYWRkIGV2ZW50IGxpc3RlbmVyc1xuICBpZiAoYnJvd3Nlci5hZGRFdmVudExpc3RlbmVyKSB7XG5cbiAgICAvLyBzZXQgdG91Y2hzdGFydCBldmVudCBvbiBlbGVtZW50XG4gICAgaWYgKGJyb3dzZXIudG91Y2gpIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIGV2ZW50cywgZmFsc2UpO1xuXG4gICAgaWYgKGJyb3dzZXIudHJhbnNpdGlvbnMpIHtcbiAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignd2Via2l0VHJhbnNpdGlvbkVuZCcsIGV2ZW50cywgZmFsc2UpO1xuICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtc1RyYW5zaXRpb25FbmQnLCBldmVudHMsIGZhbHNlKTtcbiAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignb1RyYW5zaXRpb25FbmQnLCBldmVudHMsIGZhbHNlKTtcbiAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignb3RyYW5zaXRpb25lbmQnLCBldmVudHMsIGZhbHNlKTtcbiAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsIGV2ZW50cywgZmFsc2UpO1xuICAgIH1cblxuICAgIC8vIHNldCByZXNpemUgZXZlbnQgb24gd2luZG93XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGV2ZW50cywgZmFsc2UpO1xuXG4gIH0gZWxzZSB7XG5cbiAgICB3aW5kb3cub25yZXNpemUgPSBmdW5jdGlvbiAoKSB7IHNldHVwKCkgfTsgLy8gdG8gcGxheSBuaWNlIHdpdGggb2xkIElFXG5cbiAgfVxuXG4gIC8vIGV4cG9zZSB0aGUgU3dpcGUgQVBJXG4gIHJldHVybiB7XG4gICAgc2V0dXA6IGZ1bmN0aW9uKCkge1xuXG4gICAgICBzZXR1cCgpO1xuXG4gICAgfSxcbiAgICBzbGlkZTogZnVuY3Rpb24odG8sIHNwZWVkKSB7XG5cbiAgICAgIC8vIGNhbmNlbCBzbGlkZXNob3dcbiAgICAgIHN0b3AoKTtcblxuICAgICAgc2xpZGUodG8sIHNwZWVkKTtcblxuICAgIH0sXG4gICAgcHJldjogZnVuY3Rpb24oKSB7XG5cbiAgICAgIC8vIGNhbmNlbCBzbGlkZXNob3dcbiAgICAgIHN0b3AoKTtcblxuICAgICAgcHJldigpO1xuXG4gICAgfSxcbiAgICBuZXh0OiBmdW5jdGlvbigpIHtcblxuICAgICAgLy8gY2FuY2VsIHNsaWRlc2hvd1xuICAgICAgc3RvcCgpO1xuXG4gICAgICBuZXh0KCk7XG5cbiAgICB9LFxuICAgIHN0b3A6IGZ1bmN0aW9uKCkge1xuXG4gICAgICAvLyBjYW5jZWwgc2xpZGVzaG93XG4gICAgICBzdG9wKCk7XG5cbiAgICB9LFxuICAgIGdldFBvczogZnVuY3Rpb24oKSB7XG5cbiAgICAgIC8vIHJldHVybiBjdXJyZW50IGluZGV4IHBvc2l0aW9uXG4gICAgICByZXR1cm4gaW5kZXg7XG5cbiAgICB9LFxuICAgIGdldE51bVNsaWRlczogZnVuY3Rpb24oKSB7XG5cbiAgICAgIC8vIHJldHVybiB0b3RhbCBudW1iZXIgb2Ygc2xpZGVzXG4gICAgICByZXR1cm4gbGVuZ3RoO1xuICAgIH0sXG4gICAga2lsbDogZnVuY3Rpb24oKSB7XG5cbiAgICAgIC8vIGNhbmNlbCBzbGlkZXNob3dcbiAgICAgIHN0b3AoKTtcblxuICAgICAgLy8gcmVzZXQgZWxlbWVudFxuICAgICAgZWxlbWVudC5zdHlsZS53aWR0aCA9ICcnO1xuICAgICAgZWxlbWVudC5zdHlsZS5sZWZ0ID0gJyc7XG5cbiAgICAgIC8vIHJlc2V0IHNsaWRlc1xuICAgICAgdmFyIHBvcyA9IHNsaWRlcy5sZW5ndGg7XG4gICAgICB3aGlsZShwb3MtLSkge1xuXG4gICAgICAgIHZhciBzbGlkZSA9IHNsaWRlc1twb3NdO1xuICAgICAgICBzbGlkZS5zdHlsZS53aWR0aCA9ICcnO1xuICAgICAgICBzbGlkZS5zdHlsZS5sZWZ0ID0gJyc7XG5cbiAgICAgICAgaWYgKGJyb3dzZXIudHJhbnNpdGlvbnMpIHRyYW5zbGF0ZShwb3MsIDAsIDApO1xuXG4gICAgICB9XG5cbiAgICAgIC8vIHJlbW92ZWQgZXZlbnQgbGlzdGVuZXJzXG4gICAgICBpZiAoYnJvd3Nlci5hZGRFdmVudExpc3RlbmVyKSB7XG5cbiAgICAgICAgLy8gcmVtb3ZlIGN1cnJlbnQgZXZlbnQgbGlzdGVuZXJzXG4gICAgICAgIGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIGV2ZW50cywgZmFsc2UpO1xuICAgICAgICBlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3dlYmtpdFRyYW5zaXRpb25FbmQnLCBldmVudHMsIGZhbHNlKTtcbiAgICAgICAgZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtc1RyYW5zaXRpb25FbmQnLCBldmVudHMsIGZhbHNlKTtcbiAgICAgICAgZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdvVHJhbnNpdGlvbkVuZCcsIGV2ZW50cywgZmFsc2UpO1xuICAgICAgICBlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ290cmFuc2l0aW9uZW5kJywgZXZlbnRzLCBmYWxzZSk7XG4gICAgICAgIGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsIGV2ZW50cywgZmFsc2UpO1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgZXZlbnRzLCBmYWxzZSk7XG5cbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuXG4gICAgICAgIHdpbmRvdy5vbnJlc2l6ZSA9IG51bGw7XG5cbiAgICAgIH1cblxuICAgIH1cbiAgfVxuXG59XG5cblxuaWYgKCB3aW5kb3cualF1ZXJ5IHx8IHdpbmRvdy5aZXB0byApIHtcbiAgKGZ1bmN0aW9uKCQpIHtcbiAgICAkLmZuLlN3aXBlID0gZnVuY3Rpb24ocGFyYW1zKSB7XG4gICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAkKHRoaXMpLmRhdGEoJ1N3aXBlJywgbmV3IFN3aXBlKCQodGhpcylbMF0sIHBhcmFtcykpO1xuICAgICAgfSk7XG4gICAgfVxufSkoIHdpbmRvdy5qUXVlcnkgfHwgd2luZG93LlplcHRvICk7XG59XG4iLCJmdW5jdGlvbiBzZXRUaHVtYnNQZXJQYWdlKCl7XG4gICAgLy9TaG93IGFzIG1hbnkgdGh1bWJzIGFzIHdpbGwgZml0IG9uIHRoZSBzY3JlZW5cbiAgICB2YXIgaXRlbXNJblBhZ2UgPSB2aWV3V2lkdGggLyBqUXVlcnkoIFwiLmRyYWdlbmQtdGh1bWJcIikud2lkdGgoKTtcbiAgICBqUXVlcnkoXCIjdGh1bWJzQ29udGFpbmVyXCIpLmRyYWdlbmQoe1xuICAgICAgICBpdGVtc0luUGFnZTogaXRlbXNJblBhZ2UsXG4gICAgICAgIG9uU3dpcGVFbmQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgLy9zdG9wVGh1bWJzT3ZlcnNjcm9sbCgpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5cbi8vUHJldmVudCBzY3JvbGxpbmcgaW50byB3aGl0ZXNwYWNlIGFmdGVyIHRoZSBsYXN0IHRodW1ibmFpbFxuZnVuY3Rpb24gc3RvcFRodW1ic092ZXJzY3JvbGwoKXtcbiAgICB2YXIgbGFzdFRodW1iID0galF1ZXJ5KCcjdGh1bWJzQ29udGFpbmVyIC5kcmFnZW5kLXRodW1iOmxhc3QtY2hpbGQnKTtcbiAgICB2YXIgbGFzdFRodW1iV2lkdGggPSB3aWR0aChsYXN0VGh1bWIpO1xuICAgIHZhciBsYXN0VGh1bWJPZmZzZXRMZWZ0ID0gbGFzdFRodW1iLnBvc2l0aW9uKCkubGVmdDtcbiAgICB2YXIgbGFzdFRodW1iT2Zmc2V0UmlnaHQgPSBsYXN0VGh1bWIucG9zaXRpb24oKS5sZWZ0ICsgbGFzdFRodW1iV2lkdGg7XG4gICAgdmFyIHRodW1ic0NvbnRhaW5lciA9IGpRdWVyeShcIiN0aHVtYnNDb250YWluZXIgZGl2OmZpcnN0LWNoaWxkXCIpO1xuICAgIHZhciB0aHVtYnNDb250YWluZXJXaWR0aCA9IHdpZHRoKHRodW1ic0NvbnRhaW5lcik7XG4gICAgdmFyIHRodW1ic0NvbnRhaW5lckJpZ2dlckJ5ID0gIHRodW1ic0NvbnRhaW5lcldpZHRoIC0gdmlld1dpZHRoO1xuICAgIGlmICggdGh1bWJzQ29udGFpbmVyV2lkdGggPiB2aWV3V2lkdGgpe1xuICAgICAgICBpZiggbGFzdFRodW1iT2Zmc2V0UmlnaHQgPCB2aWV3V2lkdGgpe1xuICAgICAgICAgICAgdGh1bWJzQ29udGFpbmVyLmNzcygndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZVgoLScgKyB0aHVtYnNDb250YWluZXJCaWdnZXJCeSArICdweCknKTtcbiAgICAgICAgfVxuICAgICAgICBpZiggdGh1bWJzQ29udGFpbmVyLnBvc2l0aW9uKCkubGVmdCA+IDApe1xuICAgICAgICAgICAgdGh1bWJzQ29udGFpbmVyLmNzcygndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZVgoMHB4KScpO1xuICAgICAgICB9XG4gICAgfVxuXG59XG4iLCIvKlxuICAgIGpRdWVyeS53aGVuKFxuICAgICAgICBtYXRjaEhlaWdodCh0YXJnZXQsIHRhcmdldEhlaWdodClcbiAgICApXG4gICAgLnRoZW4oXG4gICAgICAgIG1heFNpemVCeUFzcCh0YXJnZXQsIGFzcFJhbmdlKVxuICAgICk7XG4gKi9cbiIsIi8qKlxuICogZ2V0IEpTT04gZnJvbSBVUkwuICBQcmltYXJ5IHVzYWdlIFdvcmRQcmVzcyBSRVNUIEVuZHBvaW50cy5cbiAqL1xuZnVuY3Rpb24gZ2V0SnNvbih1cmwpIHtcblx0Ly9GSVg6IE1vdmUgdG8gZGlmZmVyZW50IGluY2x1ZGUgZmlsZVxuXHRjb25zb2xlLmxvZyhcImdldEpzb24oKSByZXF1ZXN0IGZvcjogXCIgKyB1cmwpO1xuXG5cdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihzdWNjZXNzSGFuZGxlciwgZXJyb3JIYW5kbGVyKSB7XG5cdHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblx0eGhyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuXHRcdGlmICh4aHIuc3RhdHVzID49IDIwMCAmJiB4aHIuc3RhdHVzIDwgNDAwKSB7XG5cdFx0XHQvLyBTdWNjZXNzIVxuXHRcdFx0dmFyIGRhdGEgPSBKU09OLnBhcnNlKHhoci5yZXNwb25zZVRleHQpO1xuXHRcdFx0Ly9jb25zb2xlLmxvZyhcImpzb24gZGF0YTogXCIgKyBKU09OLnN0cmluZ2lmeShkYXRhKSApO1xuXHRcdFx0c3VjY2Vzc0hhbmRsZXIoZGF0YSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vIEVycm9yICFcblx0XHRcdGVycm9ySGFuZGxlcih7XG5cdFx0XHQgIHN0YXR1czogdGhpcy5zdGF0dXMsXG5cdFx0XHQgIHN0YXR1c1RleHQ6IHhoci5zdGF0dXNUZXh0XG5cdFx0XHR9KTtcblx0XHR9XG5cdH07XG5cdHhoci5vbmVycm9yID0gZnVuY3Rpb24gKCkge1xuXHRcdGVycm9ySGFuZGxlcih7XG5cdFx0XHRzdGF0dXM6IHRoaXMuc3RhdHVzLFxuXHRcdFx0c3RhdHVzVGV4dDogeGhyLnN0YXR1c1RleHRcblx0XHR9KTtcblx0fTtcblx0eGhyLm9wZW4oJ0dFVCcsIHVybCk7XG5cdHhoci5zZW5kKCk7XG5cdH0pO1xuXG59XG5cbi8qKlxuICogQ2hlY2sgaWYgRE9NIGVsZW1lbnQgZXhpc3RzIHx8ICdoYXMgbG9hZGVkJ1xuICogVXNlIGZvciBkeW5hbWljIGNvbnRlbnQgcmVxdWlyZWQgYmVmb3JlIGRvYy5yZWFkeSgpXG4gKiBSZXF1aXJlcyBjYWxsYmFjaygpIC0gJ3doYXQgaGFwcGVucyBvbmNlIHRoZSBlbGVtZW50IGlzIHJlYWR5J1xuICovXG5mdW5jdGlvbiBlbGVtZW50UmVhZHkoIGVsZW1lbnQsIGNhbGxiYWNrICl7XG5cdChmdW5jdGlvbiBjaGVja0ZvckVsZW1lbnQoKXtcblx0ICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcblx0XHRcdGlmKCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtZW50KSApe1xuXHRcdFx0XHRjb25zb2xlLmxvZyhlbGVtZW50ICsgXCIgbG9hZGVkLlwiKTtcblx0ICAgICAgICBcdGNhbGxiYWNrKCk7XG5cdCAgICAgICAgfWVsc2V7XG5cdCAgICAgICAgXHRjaGVja0ZvckVsZW1lbnQoZWxlbWVudCk7XG5cdCAgICAgICAgfVxuXHQgICAgfSwxNTApO1xuXHQgfSkoKVxufTtcblxuXG4vKipcbiAqIEluc2VydCBIVE1MIFRlbXBsYXRlIGZvciBjb250ZW50OiBcImltYWdlc1wiXG4gKi9cbi8vKioqKioqKioqKioqKioqKioqKioqKioqIFJFTU9WRSBKUVVFUlkgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuZnVuY3Rpb24gY3JlYXRlRHJhZ2VuZFNsaWRlcyhwYXJlbnRDb250YWluZXIsIHNsaWRlc0NvbnRlbnQsIHNsaWRlVHlwZSl7XG5cdC8vY29uc29sZS5sb2coXCJjcmVhdGVEcmFnZW5kU2xpZGVzKCkgLSBwYXJlbnRDb250YWluZXI6IFwiICsgcGFyZW50Q29udGFpbmVyKTtcblx0dmFyIHRoaXNQYXJlbnRDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChwYXJlbnRDb250YWluZXIpO1xuXHR2YXIgdGhpc1NsaWRlc0NvbnRhaW5lciA9IHRoaXNQYXJlbnRDb250YWluZXIucXVlcnlTZWxlY3RvcignLmltYWdlLWdhbGxlcnknKTtcblxuXHRfLmZvckVhY2goc2xpZGVzQ29udGVudCwgZnVuY3Rpb24odGhpc1NsaWRlQ29udGVudCkge1xuXHRcdHZhciB0aGlzU2xpZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0XHR0aGlzU2xpZGUuY2xhc3NMaXN0LmFkZCgnZHJhZ2VuZC1wYWdlJyk7XG5cblx0XHRpZiAoIHNsaWRlVHlwZSA9PSAnYmFja2dyb3VuZC1pbWFnZScgKXtcblx0XHRcdC8vY29uc29sZS5sb2coXCJzbGlkZVR5cGU6IGJhY2tncm91bmQtaW1hZ2VcIik7XG5cdFx0XHQvL2NvbnNvbGUubG9nKFwidGhpc1NsaWRlOiBcIiArIHRoaXNTbGlkZSk7XG5cdFx0XHQvL2NvbnNvbGUubG9nKFwidGhpc1NsaWRlQ29udGVudDogXCIgKyB0eXBlb2YgdGhpc1NsaWRlQ29udGVudCk7XG5cdFx0XHRzZXRCZ0ltZyh0aGlzU2xpZGUsIHRoaXNTbGlkZUNvbnRlbnQpO1xuXHRcdH1cblx0XHQvL0ZJWDogQWRkIHN1cHBvcnQgZm9yIG90aGVyIGVsZW1lbnQgdHlwZXNcblxuXHRcdHRoaXNQYXJlbnRDb250YWluZXIuYXBwZW5kQ2hpbGQodGhpc1NsaWRlKTtcblx0fSk7XG59XG5cdC8qKlxuXHQgKiBBY2NlcHRzIHRhcmdldCBlbGVtZW50IGFuZCBkYXRhIG9iamVjdCB7dXJsLCBvcmlnaW5hbCBpbWFnZSBoZWlnaHQsIG9yaWdpbmFsIGltYWdlIHdpZHRofVxuXHQgKi9cblxuXHRmdW5jdGlvbiBzZXRCZ0ltZyh0YXJnZXQsIGltYWdlRGF0YSl7XG5cdFx0dGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2JhY2tncm91bmRJbWFnZScpO1xuXG5cdFx0dmFyIHRoaXNJbWdVcmwgXHRcdD0gaW1hZ2VEYXRhWzBdO1xuXHRcdHZhciB0aGlzSW1nSGVpZ2h0IFx0PSBpbWFnZURhdGFbMV07XG5cdFx0dmFyIHRoaXNJbWdXaWR0aCBcdD0gaW1hZ2VEYXRhWzJdO1xuXG5cdFx0dGFyZ2V0LnN0eWxlLmJhY2tncm91bmRJbWFnZSA9ICd1cmwoJyArIHRoaXNJbWdVcmwgKyAnKSc7XG5cblx0XHQvL2lmIG9yaWdpbmFsIGltYWdlIEhFSUdIVCBwYXNzZWQgaW4gYXJyYXlcblx0XHRpZih0aGlzSW1nSGVpZ2h0KXtcblx0XHRcdHRhcmdldC5zZXRBdHRyaWJ1dGUoJ2RhdGEtaGVpZ2h0JywgdGhpc0ltZ0hlaWdodCk7XG5cdFx0fVxuXG5cdFx0Ly9pZiBvcmlnaW5hbCBpbWFnZSBXSURUSCBwYXNzZWQgaW4gYXJyYXlcblx0XHRpZih0aGlzSW1nV2lkdGgpe1xuXHRcdFx0dGFyZ2V0LnNldEF0dHJpYnV0ZSgnZGF0YS13aWR0aCcsICB0aGlzSW1nV2lkdGgpO1xuXHRcdH1cblxuXHR9XG5cbmZ1bmN0aW9uIGdldEltYWdlc0J5U2NyZWVuU2l6ZShpbWFnZXNBcnJheSwgZmlyc3RCcmVhaywgc2Vjb25kQnJlYWspe1xuICAgIC8vc2VsZWN0IHRoZSBsYXJnZXIgb2Ygdmlld3BvcnQgaGVpZ2h0IC0gd2lkdGggKGRldmljZSBjYW4gcm90YXRlIGFmdGVyIGxvYWRpbmcgaW1hZ2VzKVxuICAgIHZhciB3aW5kb3dNYXhTaXplID0gTWF0aC5tYXgodmlld0hlaWdodCwgdmlld1dpZHRoKTtcblxuICAgIGlmICggd2luZG93TWF4U2l6ZSA8PSBmaXJzdEJyZWFrICl7XG4gICAgICAgIHJldHVybiBpbWFnZXNBcnJheVsxXTsvL21lZGl1bTtcbiAgICB9XG4gICAgZWxzZSBpZiggd2luZG93TWF4U2l6ZSA+PSBmaXJzdEJyZWFrICYmIHdpbmRvd01heFNpemUgPD0gc2Vjb25kQnJlYWspIHtcbiAgICAgICAgcmV0dXJuIGltYWdlc0FycmF5WzJdOy8vbGFyZ2U7XG4gICAgfVxuICAgIGVsc2V7XG4gICAgICAgIHJldHVybiBpbWFnZXNBcnJheVszXTsvLzE5MjAgbWF4O1xuICAgIH1cbn1cbiIsImZ1bmN0aW9uIG1lbnVIZWlnaHQoZG9jSGVpZ2h0KXtcbiAgICAvKlxuICAgIHZhciBuYXYgPSBnZXQoJ25hdicpO1xuICAgIGhlaWdodChuYXYsIFwiYXV0b1wiKTtcbiAgICBpZiAoaGFzQ2xhc3MoYm9keSwgJ21vYmlsZU1lbnVPcGVuJykgKXtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIm1lbnVIZWlnaHQgLSBkb2NIOiBcIiArIGRvY0hlaWdodCk7XG4gICAgICAgIGhlaWdodChuYXYsIGRvY0hlaWdodCk7XG4gICAgICAgIG1pbkhlaWdodChuYXYsIHZpZXdIZWlnaHQpO1xuICAgIH1cbiAgICAqL1xufVxuXG4vL0ZpeCBGb290ZXIgcG9zaXRpb24gZm9yIHNob3J0IHBhZ2VzIC0gdHJpZ2dlcmVkIG9uIC5yZXNpemVcbi8vTk9URSAtIEZJWCBQT1NJVElPTiBBQlNPTFVURSBGUk9NICdhYnNvbHV0ZUFmdGVyJyBvbiByZXNpemVcbmZ1bmN0aW9uIGZpeFRvQm90dG9tKHRhcmdldCl7XG4gICAgLy9yZXNldCBhbnkgY2xhc3NlcyBmcm9tIHByZXZpb3VzIGZ1bmN0aW9uIGNhbGxcbiAgICBpZiAoIGhhc0NsYXNzKHRhcmdldCwgJ2FwcGVuZFRvVmlld3BvcnQnKSApe1xuICAgICAgICByZW1vdmVDbGFzcyh0YXJnZXQsICdhcHBlbmRUb1ZpZXdwb3J0Jyk7XG4gICAgfVxuICAgIGlmICggaGFzQ2xhc3ModGFyZ2V0LCAnbW92ZWRBZnRlclByZXYnKSApe1xuICAgICAgICByZW1vdmVDbGFzcyh0YXJnZXQsICdtb3ZlZEFmdGVyUHJldicpO1xuICAgICAgICBzZXRTdHlsZSh0YXJnZXQsIHtcbiAgICAgICAgICAgICd0b3AnIDogJ2F1dG8nXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vZ2V0IG5ldyB2YWx1ZXNcbiAgICB2YXIgdGFyZ2V0Qm90dG9tID0gZ2V0T2Zmc2V0Qm90dG9tKHRhcmdldCk7XG4gICAgLy9pZiB0aGUgdGFyZ2V0IGlzbid0IGFscmVhZHkgYXQgdGhlIGJvdHRvbVxuICAgIC8vY29uc29sZS5sb2codGFyZ2V0Qm90dG9tKTtcbiAgICBpZih0YXJnZXRCb3R0b20gPCB2aWV3SGVpZ2h0KSB7XG4gICAgICAgIC8vY2hlY2sgaWYgdGhlcmUgaXMgZW5vdWdoIHNwYWNlIHRvIGZpdCB0aGUgdGFyZ2V0XG4gICAgICAgIC8vZ2V0IHByZXZpb3VzIHNpYmxpbmcgcG9zaXRpb25cbiAgICAgICAgdmFyIGVsZUFib3ZlID0gZ2V0RmFtaWx5KHRhcmdldCwgJ3ByZXYnKTtcbiAgICAgICAgdmFyIGVsZUFib3ZlQm90dG9tID0gZ2V0T2Zmc2V0KGVsZUFib3ZlKS5ib3R0b207XG4gICAgICAgIHZhciBhdmFpbGFibGVTcGFjZSA9IHZpZXdIZWlnaHQgLSBlbGVBYm92ZUJvdHRvbTtcbiAgICAgICAgdmFyIHRhcmdldEhlaWdodCA9IGdldEhlaWdodCh0YXJnZXQpO1xuICAgICAgICBpZiAoIGF2YWlsYWJsZVNwYWNlID4gdGFyZ2V0SGVpZ2h0ICl7XG4gICAgICAgICAgICBhZGRDbGFzcyh0YXJnZXQsICdhcHBlbmRUb1ZpZXdwb3J0Jyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHZhciBlbGVBYm92ZVBvc2l0aW9uID0gZ2V0UG9zaXRpb24oZWxlQWJvdmUpO1xuICAgICAgICAgICAgLy9zZWUgaWYgcHJldmlvdXMgY29udGVudCBpcyBpbiB0aGUgZG9jdW1lbnQgZmxvdyBwb3NpdGlvbiBhdCBib3R0b20gb2YgcHJldiBzaWJsaW5nXG4gICAgICAgICAgICBpZihlbGVBYm92ZVBvc2l0aW9uID09PSBcImFic29sdXRlXCIpe1xuICAgICAgICAgICAgICAgIC8vRklYOiByZW5hbWUgcG9zaXRpb25BZnRlcigpO1xuICAgICAgICAgICAgICAgIG1vdmVBZnRlcih0YXJnZXQsIGVsZUFib3ZlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gbmF2Q2xhc3NlcygpIHtcblx0aWYgKG1vYmlsZU5hdk9ubHkgPT09IGZhbHNlKXtcblx0XHRpZiAodmlld1dpZHRoID49IDEwMjQpe1xuXHRcdFx0YWRkQ2xhc3MoaHRtbCwgJ2Rlc2t0b3BNZW51Jyk7XG5cdFx0XHRyZW1vdmVDbGFzcyhodG1sLCAnbW9iaWxlTWVudScpO1xuXHRcdH1cblx0XHRlbHNle1xuXHRcdFx0cmVtb3ZlQ2xhc3MoaHRtbCwgJ2Rlc2t0b3BNZW51Jyk7XG5cdFx0XHRhZGRDbGFzcyhodG1sLCdtb2JpbGVNZW51Jyk7XG5cdFx0fVxuXHR9XG59XG5cbi8qQWRkIG1vYmlsZU1lbnUgY2xhc3MgdG8gaHRtbCAqL1xuZnVuY3Rpb24gYWRkTWVudU9wZW5DbGFzcygpe1xuICAgIHJlbW92ZUNsYXNzKGh0bWwsICdkZXNrdG9wTWVudScpO1xuXHRyZW1vdmVDbGFzcyhodG1sLCAnbW9iaWxlTWVudUNsb3NlZCcpO1xuXHRhZGRDbGFzcyhodG1sLCAnbW9iaWxlTWVudU9wZW4nKTtcbiAgICBtZW51SGVpZ2h0KCk7XG59XG5cbi8qUmVtb3ZlIG1vYmlsZU1lbnUgY2xhc3MgZnJvbSBib2R5ICovXG5mdW5jdGlvbiByZW1vdmVNZW51T3BlbkNsYXNzKCl7XG5cdHJlbW92ZUNsYXNzKGh0bWwsICdtb2JpbGVNZW51T3BlbicpO1xuXHRhZGRDbGFzcyhodG1sLCAnbW9iaWxlTWVudUNsb3NlZCcpO1xuICAgIG5hdkNsYXNzZXMoKTsvL2NoZWNrIGlmIHdlIG5lZWQgdG8gcHV0IGJhY2sgJ2Rlc2t0b3BNZW51JyBvciAnbW9iaWxlTWVudSdcbiAgICBtZW51SGVpZ2h0KCk7XG59XG5cbi8vc2V0IHBvcnRyYWl0IC8gbGFuZHNjYXBlIGNsYXNzXG5mdW5jdGlvbiBnZXRPcmllbnRhdGlvbkNsYXNzKCl7XG5cdGlmICh2aWV3SGVpZ2h0ID4gdmlld1dpZHRoKSB7XG5cdFx0YWRkQ2xhc3MoaHRtbCwgJ3BvcnRyYWl0Jyk7XG5cdFx0cmVtb3ZlQ2xhc3MoaHRtbCwgJ2xhbmRzY2FwZScpO1xuXHRcdHJldHVybiBcInBvcnRyYWl0XCI7XG5cdH1cblx0ZWxzZXtcblx0XHRhZGRDbGFzcyhodG1sLCAnbGFuZHNjYXBlJyk7XG5cdFx0cmVtb3ZlQ2xhc3MoaHRtbCwgJ3BvcnRyYWl0Jyk7XG5cdFx0cmV0dXJuIFwibGFuZHNjYXBlXCI7XG5cdH1cbn1cblxuZnVuY3Rpb24gc2V0RGltZW5zaW9ucyh0YXJnZXQsIHRhcmdldEhlaWdodCwgYXNwUmFuZ2Upe1xuICAgIGpRdWVyeS53aGVuKFxuICAgICAgICBtYXRjaEhlaWdodCh0YXJnZXQsIHRhcmdldEhlaWdodClcbiAgICApXG4gICAgLnRoZW4oXG4gICAgICAgIG1heFNpemVCeUFzcCh0YXJnZXQsIGFzcFJhbmdlKVxuICAgICk7XG59XG5cbmZ1bmN0aW9uIG1vdmVPbk9yaWVudGF0aW9uKHRhcmdldCwgZGVzdGluYXRpb24sIGxhbmRzY2FwZSwgcG9ydHJhaXQpe1xuXHQvL0xBTkRTQ0FQRVxuXHRpZih2aWV3V2lkdGg+dmlld0hlaWdodCl7XG5cdFx0aWYobGFuZHNjYXBlID09IFwicHJlcGVuZFwiKXtcblx0XHRcdGpRdWVyeSh0YXJnZXQpLnByZXBlbmRUbyhkZXN0aW5hdGlvbik7XG5cdFx0fVxuXHRcdGlmKGxhbmRzY2FwZSA9PSBcImFwcGVuZFwiKXtcblx0XHRcdGpRdWVyeSh0YXJnZXQpLmFwcGVuZFRvKGRlc3RpbmF0aW9uKTtcblx0XHR9XG5cdFx0aWYobGFuZHNjYXBlID09IFwiYWZ0ZXJcIil7XG5cdFx0XHRqUXVlcnkodGFyZ2V0KS5pbnNlcnRBZnRlcihkZXN0aW5hdGlvbik7XG5cdFx0fVxuXHRcdGlmKGxhbmRzY2FwZSA9PSBcImJlZm9yZVwiKXtcblx0XHRcdGpRdWVyeSh0YXJnZXQpLmluc2VydEJlZm9yZShkZXN0aW5hdGlvbik7XG5cdFx0fVxuXHR9XG5cdC8vUE9SVFJBSVRcblx0ZWxzZXtcblx0XHRpZihwb3J0cmFpdCA9PSBcInByZXBlbmRcIikge1xuXHRcdFx0alF1ZXJ5KHRhcmdldCkucHJlcGVuZFRvKGRlc3RpbmF0aW9uKTtcblx0XHR9XG5cdFx0aWYocG9ydHJhaXQgPT0gXCJhcHBlbmRcIil7XG5cdFx0XHRqUXVlcnkodGFyZ2V0KS5hcHBlbmRUbyhkZXN0aW5hdGlvbik7XG5cdFx0fVxuXHRcdGlmKHBvcnRyYWl0ID09IFwiYWZ0ZXJcIil7XG5cdFx0XHRqUXVlcnkodGFyZ2V0KS5pbnNlcnRBZnRlcihkZXN0aW5hdGlvbik7XG5cdFx0fVxuXHRcdGlmKHBvcnRyYWl0ID09IFwiYmVmb3JlXCIpe1xuXHRcdFx0alF1ZXJ5KHRhcmdldCkuaW5zZXJ0QmVmb3JlKGRlc3RpbmF0aW9uKTtcblx0XHR9XG5cdH1cbn1cbiIsIi8qIGZ1bmN0aW9uIGdldEpzb24odXJsKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihzdWNjZXNzSGFuZGxlciwgZXJyb3JIYW5kbGVyKSB7XG5cdHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblx0eGhyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuXHRcdGlmICh4aHIuc3RhdHVzID49IDIwMCAmJiB4aHIuc3RhdHVzIDwgNDAwKSB7XG5cdFx0XHQvLyBTdWNjZXNzIVxuXHRcdFx0dmFyIGRhdGEgPSBKU09OLnBhcnNlKHhoci5yZXNwb25zZVRleHQpO1xuXHRcdFx0Ly9jb25zb2xlLmxvZyhcImpzb24gZGF0YTogXCIgKyBKU09OLnN0cmluZ2lmeShkYXRhKSApO1xuXHRcdFx0c3VjY2Vzc0hhbmRsZXIoZGF0YSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vIEVycm9yICFcblx0XHRcdGVycm9ySGFuZGxlcih7XG5cdFx0XHQgIHN0YXR1czogdGhpcy5zdGF0dXMsXG5cdFx0XHQgIHN0YXR1c1RleHQ6IHhoci5zdGF0dXNUZXh0XG5cdFx0XHR9KTtcblx0XHR9XG5cdH07XG5cdHhoci5vbmVycm9yID0gZnVuY3Rpb24gKCkge1xuXHRcdGVycm9ySGFuZGxlcih7XG5cdFx0XHRzdGF0dXM6IHRoaXMuc3RhdHVzLFxuXHRcdFx0c3RhdHVzVGV4dDogeGhyLnN0YXR1c1RleHRcblx0XHR9KTtcblx0fTtcblx0eGhyLm9wZW4oJ0dFVCcsIHVybCk7XG5cdHhoci5zZW5kKCk7XG4gIH0pO1xufVxuKi9cblxuLypcblVTQUdFOiAqKndpdGggcGhwIFVSTFxuXG5cdGdldEpzb24oJyA8P3BocCBlY2hvICgkanNvbl91cmwpOyA/PiAnKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuXHRcdC8vIENvZGUgZGVwZW5kaW5nIG9uIHJlc3VsdFxuXG5cdH0pLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcblx0XHRjb25zb2xlLmVycm9yKCdBdWdoLCB0aGVyZSB3YXMgYW4gZXJyb3IhJywgZXJyLnN0YXR1c1RleHQpO1xuXHR9KTtcblxuICovIiwiZnVuY3Rpb24gaGFzQ2xhc3MoZWxlLGNscykge1xuXHRyZXR1cm4gZWxlLmNsYXNzTmFtZS5tYXRjaChuZXcgUmVnRXhwKCcoXFxcXHN8XiknK2NscysnKFxcXFxzfGpRdWVyeSknKSk7XG59XG5cbmZ1bmN0aW9uIGFkZENsYXNzKGVsZSxjbHMpIHtcblx0aWYgKCFoYXNDbGFzcyhlbGUsY2xzKSkge2VsZS5jbGFzc05hbWUgKz0gXCIgXCIrY2xzO31cbn1cblxuZnVuY3Rpb24gcmVtb3ZlQ2xhc3MoZWxlLGNscykge1xuXHRpZiAoaGFzQ2xhc3MoZWxlLGNscykpIHtcblx0XHR2YXIgcmVnID0gbmV3IFJlZ0V4cCgnKFxcXFxzfF4pJytjbHMrJyhcXFxcc3xqUXVlcnkpJyk7XG5cdFx0ZWxlLmNsYXNzTmFtZT1lbGUuY2xhc3NOYW1lLnJlcGxhY2UocmVnLCcgJyk7XG5cdH1cbn1cblxuZnVuY3Rpb24gbWF4SCh0YXJnZXQsIHZhbHVlKXtcblx0alF1ZXJ5KHRhcmdldCkuY3NzKCdtYXgtaGVpZ2h0JywgdmFsdWUpO1xufVxuXG5mdW5jdGlvbiBtYXhXKHRhcmdldCwgdmFsdWUpe1xuXHRqUXVlcnkodGFyZ2V0KS5jc3MoJ21heC13aWR0aCcsIHZhbHVlKTtcbn1cblxuZnVuY3Rpb24gbWluSCh0YXJnZXQsIHZhbHVlKXtcblx0alF1ZXJ5KHRhcmdldCkuY3NzKCdtaW4taGVpZ2h0JywgdmFsdWUpO1xufVxuXG5mdW5jdGlvbiBtaW5XKHRhcmdldCwgdmFsdWUpe1xuXHRqUXVlcnkodGFyZ2V0KS5jc3MoJ21pbi13aWR0aCcsIHZhbHVlKTtcbn1cblxuZnVuY3Rpb24gbWF0Y2hIZWlnaHQodGFyZ2V0LCB0YXJnZXRIZWlnaHQpe1xuICAgIC8vY29uc29sZS5sb2coJ21hdGNoSGVpZ2h0KCkgLSB2aWV3SGVpZ2h0ICcgKyB3aW5kb3cuaW5uZXJIZWlnaHQpO1xuICAgIHRhcmdldEhlaWdodCA9IHRhcmdldEhlaWdodCA/IHRhcmdldEhlaWdodCA6IHdpbmRvdy5pbm5lckhlaWdodDtcblx0cmV0dXJuIGpRdWVyeSh0YXJnZXQpLmhlaWdodCh0YXJnZXRIZWlnaHQpO1xufVxuXG5mdW5jdGlvbiBtYXhTaXplQnlBc3AodGFyZ2V0LCBtaW5Bc3AsIG1heEFzcCl7XG4gICAgbWluQXNwID0gbWluQXNwID8gbWluQXNwIDogMS42O1xuICAgIG1heEFzcCA9IG1heEFzcCA/IG1heEFzcCA6IDIuMTtcblxuXHRqUXVlcnkodGFyZ2V0KS5jc3MoJ21heC1oZWlnaHQnLCAnbm9uZScpO1xuXHRqUXVlcnkodGFyZ2V0KS5jc3MoJ21pbi1oZWlnaHQnLCAwKTtcblxuICAgIHZhciB2aWV3V2lkdGggPSBqUXVlcnkod2luZG93KS53aWR0aCgpO1xuICAgIHZhciB2aWV3SGVpZ2h0ID0galF1ZXJ5KHdpbmRvdykuaGVpZ2h0KCk7XG5cdHZhciB0YXJnZXRBc3AgPSB2aWV3V2lkdGggLyB2aWV3SGVpZ2h0O1xuXG4gICAgLy9pZiBXSURFIC8gU0hPUlRcblx0aWYgKHRhcmdldEFzcCA+IG1heEFzcCl7XG5cdFx0bWluSCh0YXJnZXQsIHZpZXdXaWR0aCAvIG1heEFzcCk7XG5cdH1cblxuXHQvL2lmIFRBTEwgLyBTS0lOTllcblx0aWYgKHRhcmdldEFzcCA8IG1pbkFzcCl7XG5cdFx0bWF4SCh0YXJnZXQsIHZpZXdXaWR0aCAvIG1pbkFzcCApO1xuXHR9XG59XG5cbmZ1bmN0aW9uIGFzcExhYmVsKHdpZHRoLCBoZWlnaHQpe1xuXHRpZiAoIHdpZHRoIC8gaGVpZ2h0ID4gMS43NSApe1xuXHRcdHJldHVybiBcImxhbmRzY2FwZSBzaG9ydFdpZGVcIjtcblx0fVxuXG5cdGVsc2UgaWYgKCB3aWR0aCA+IGhlaWdodCApe1xuXHRcdHJldHVybiBcImxhbmRzY2FwZVwiO1xuXHR9XG5cblx0ZWxzZSBpZiAoIHdpZHRoIC8gaGVpZ2h0IDwgMC43NSApe1xuXHRcdHJldHVybiBcInBvcnRyYWl0IHRhbGxTa2lubnlcIjtcblx0fVxuXG5cdGVsc2UgaWYgKCB3aWR0aCA8IGhlaWdodCApe1xuXHRcdHJldHVybiBcInBvcnRyYWl0XCI7XG5cdH1cblxuXHRlbHNle1xuXHRcdHJldHVybiBcInNxdWFyZVwiO1xuXHR9XG59XG5cbi8vRklYOiB3aHkgYW0gSSB1c2luZyB0aGlzP1xuLypcbmZ1bmN0aW9uIHdpZGVyVGhhbihtaW4sIG1heCwgdGFyZ2V0KXtcbiAgICB2YXIgaXNXaWRlcjtcbiAgICBpZighdGFyZ2V0KXtcblx0XHR0YXJnZXQgPSBqUXVlcnkod2luZG93KTtcblx0fVxuXG5cdGlmIChtYXgpe1xuXHRcdGlmKCAobWF4ID4gd2lkdGgodGFyZ2V0KSApICYmICggbWluIDwgd2lkdGgodGFyZ2V0KSApICl7XG5cdFx0XHRpc1dpZGVyID0gdHJ1ZTtcblx0XHR9XG5cdH1cblx0ZWxzZSBpZiggbWluIDwgd2lkdGgodGFyZ2V0KSApe1xuXHRcdGlzV2lkZXIgPSB0cnVlO1xuXHR9XG5cdGVsc2V7XG5cdFx0aXNXaWRlciA9ICBmYWxzZTtcblx0fVxuICAgIHJldHVybiBpc1dpZGVyO1xufSovXG4iLCIndXNlIHN0cmljdCc7XG4vKmpzaGludCAtVzExNyAqL1xuXG4vL0NvbWJpbmUgMiBhcnJheXNcbi8vUmV0dXJucyBhIG5vbi1kZXN0cnVjdGl2ZSByZXN1bHQgY29udGFpbmluZyBib3RoIGFycmF5c1xuZnVuY3Rpb24gam9pbkFycmF5cyhmaXJzdEFycmF5LCBzZWNvbmRBcnJheSl7XG4gICAgdmFyIG1lcmdlZEFycmF5ID0gZmlyc3RBcnJheS5jb25jYXQoc2Vjb25kQXJyYXkpO1xuICAgIHJldHVybiBtZXJnZWRBcnJheTtcbn1cblxuLy9GaW5kIHRoZSBudW1iZXIgb2YgZWxlbWVudHMgaW4gdGhpcyBhcnJheVxuZnVuY3Rpb24gZ2V0QXJyYXlMZW5ndGgodGhpc0FycmF5KXtcbiAgICByZXR1cm4gdGhpc0FycmF5Lmxlbmd0aDtcbn1cblxuXG4vL0ZpbmQgdGhlIGluZGV4IHBvc2l0aW9uIG9mIGFuIGl0ZW0gaW4gYW4gYXJyYXlcbmZ1bmN0aW9uIGdldEFycmF5UG9zaXRpb24odGhpc0FycmF5LCB0aGlzSXRlbSl7XG4gICAgcmV0dXJuIHRoaXNBcnJheS5pbmRleE9mKHRoaXNJdGVtKTtcbn1cblxuXG4vL1BvcCwgUHVzaCwgU2hpZnQsIGFuZCBVbnNoaWZ0XG5mdW5jdGlvbiByZW1vdmVGcm9tQXJyYXkodGhpc0FycmF5LCB0aGlzUG9zaXRpb24pe1xuICAgIHN3aXRjaCAodGhpc1Bvc2l0aW9uKSB7XG4gICAgICAgIGNhc2UgXCJsYXN0XCI6XG4gICAgICAgICAgICAvL3JlbW92ZSBmcm9tIGVuZCBvZiBhcnJheVxuICAgICAgICAgICAgcmV0dXJuIHRoaXNBcnJheS5wb3A7XG4gICAgICAgIGNhc2UgXCJmaXJzdFwiOlxuICAgICAgICAgICAgLy9yZW1vdmUgZnJvbSBzdGFydCBvZiBhcnJheVxuICAgICAgICAgICAgcmV0dXJuIHRoaXNBcnJheS5zaGlmdDtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIC8vcmVtb3ZlIHNwZWNpZmljIGluZGV4XG4gICAgICAgICAgICByZXR1cm4gZGVsZXRlIGFycmF5W3RoaXNQb3NpdGlvbl07XG4gICAgfVxufVxuXG5mdW5jdGlvbiBhZGRUb0FycmF5KCB0aGlzQXJyYXksIHRoaXNQb3NpdGlvbiwgdGhpc1ZhbHVlICl7XG4gICAgc3dpdGNoICh0aGlzUG9zaXRpb24pIHtcbiAgICAgICAgY2FzZSBcImxhc3RcIjpcbiAgICAgICAgICAgIC8vYWRkIHRvIGVuZCBvZiBhcnJheVxuICAgICAgICAgICAgcmV0dXJuIHRoaXNBcnJheS5wdXNoKHRoaXNWYWx1ZSk7XG4gICAgICAgIGNhc2UgXCJmaXJzdFwiOlxuICAgICAgICAgICAgLy9hZGQgdG8gc3RhcnQgb2YgYXJyYXlcbiAgICAgICAgICAgIHJldHVybiB0aGlzQXJyYXkudW5zaGlmdCh0aGlzUG9zaXRpb24pO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgLy9hZGQgdmFsdWUgdG8gaW5kZXggcG9zaXRpb25cbiAgICAgICAgICAgIHRoaXNBcnJheVt0aGlzUG9zaXRpb25dID0gdGhpc1ZhbHVlO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXNBcnJheTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGNvbnZlcnRBcnJheVRvU3RyaW5nKHRoaXNBcnJheSwgc2VwYXJhdG9yKXtcbiAgICByZXR1cm4gdGhpc0FycmF5LmpvaW4oc2VwYXJhdG9yKTtcbn0iLCIvL2JveCgpIGlzIGEgY29udmVuaWVudCByZWZlcmVuY2UgZnVuY3Rpb24gZm9yIGdldHRpbmcgaW50IHZhbHVlcyBmb3IgYm94TW9kZWwgcHJvcGVydGllc1xuZnVuY3Rpb24gYm94KGVsZW1lbnQpe1xuICAgIHZhciB0aGlzSGVpZ2h0ICAgICAgPSBnZXRIZWlnaHQoZWxlbWVudCk7XG4gICAgLy9jb25zb2xlLmxvZyhcImJveCgpIC0gdGhpc0hlaWdodDogXCIgKyB0aGlzSGVpZ2h0KTtcbiAgICB2YXIgdGhpc1dpZHRoICAgICAgID0gZ2V0V2lkdGgoZWxlbWVudCk7XG4gICAgdmFyIHRoaXNNYXJnaW4gICAgICA9IGdldE1hcmdpbihlbGVtZW50KTtcbiAgICB2YXIgdGhpc1BhZGRpbmcgICAgID0gZ2V0UGFkZGluZyhlbGVtZW50KTtcbiAgICB2YXIgdGhpc1Bvc2l0aW9uICAgID0gZ2V0UG9zaXRpb24oZWxlbWVudCk7XG4gICAgdmFyIHRoaXNPdXRlckhlaWdodCA9IGdldE91dGVySGVpZ2h0KGVsZW1lbnQsIHRoaXNIZWlnaHQsIHRoaXNNYXJnaW4sIHRoaXNQYWRkaW5nKTtcbiAgICB2YXIgdGhpc091dGVyV2lkdGggID0gZ2V0T3V0ZXJXaWR0aChlbGVtZW50LCB0aGlzV2lkdGgsIHRoaXNNYXJnaW4sIHRoaXNQYWRkaW5nKTtcbiAgICB2YXIgdGhpc09mZnNldCAgICAgID0gZ2V0T2Zmc2V0KGVsZW1lbnQsIHRoaXNPdXRlckhlaWdodCwgdGhpc091dGVyV2lkdGgpO1xuICAgIC8vY29uc29sZS5sb2coXCJib3goKSAtIHRoaXNPdXRlckhlaWdodDogXCIgKyB0aGlzT3V0ZXJIZWlnaHQpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgaGVpZ2h0OiB0aGlzSGVpZ2h0LFxuICAgICAgICB3aWR0aDogdGhpc1dpZHRoLFxuICAgICAgICBtYXJnaW46IHtcbiAgICAgICAgICAgICd0b3AnICAgOiB0aGlzTWFyZ2luLnRvcCxcbiAgICAgICAgICAgICdyaWdodCcgOiB0aGlzTWFyZ2luLnJpZ2h0LFxuICAgICAgICAgICAgJ2JvdHRvbSc6IHRoaXNNYXJnaW4uYm90dG9tLFxuICAgICAgICAgICAgJ2xlZnQnICA6IHRoaXNNYXJnaW4ubGVmdFxuICAgICAgICB9LFxuICAgICAgICBwYWRkaW5nOiB7XG4gICAgICAgICAgICAndG9wJyAgIDogdGhpc1BhZGRpbmcudG9wLFxuICAgICAgICAgICAgJ3JpZ2h0JyA6IHRoaXNQYWRkaW5nLnJpZ2h0LFxuICAgICAgICAgICAgJ2JvdHRvbSc6IHRoaXNQYWRkaW5nLmJvdHRvbSxcbiAgICAgICAgICAgICdsZWZ0JyAgOiB0aGlzUGFkZGluZy5sZWZ0XG4gICAgICAgIH0sXG4gICAgICAgIHBvc2l0aW9uOiB0aGlzUG9zaXRpb24sXG4gICAgICAgIG9mZnNldDp7XG4gICAgICAgICAgICAndG9wJyAgIDogdGhpc09mZnNldC50b3AsXG4gICAgICAgICAgICAncmlnaHQnIDogdGhpc09mZnNldC5yaWdodCxcbiAgICAgICAgICAgICdib3R0b20nOiB0aGlzT2Zmc2V0LmJvdHRvbSxcbiAgICAgICAgICAgICdsZWZ0JyAgOiB0aGlzT2Zmc2V0LmxlZnRcbiAgICAgICAgfSxcbiAgICAgICAgb3V0ZXJIZWlnaHQ6IHRoaXNPdXRlckhlaWdodCxcbiAgICAgICAgb3V0ZXJXaWR0aDogdGhpc091dGVyV2lkdGhcbiAgICB9O1xufVxuXG5mdW5jdGlvbiBoZWlnaHQoZWxlbWVudCwgaGVpZ2h0KXtcbiAgICBpZiAoaGVpZ2h0KXtcbiAgICAgICAgc2V0SGVpZ2h0KGVsZW1lbnQsIGhlaWdodCk7XG4gICAgfVxuICAgIGVsc2V7XG4gICAgICAgIGdldEhlaWdodChlbGVtZW50KTtcbiAgICB9XG59XG5cbiAgICAvL2dldCB0aGUgY29tcHV0ZWQgc3R5bGUgaGVpZ2h0XG4gICAgZnVuY3Rpb24gZ2V0SGVpZ2h0KGVsZW1lbnQpe1xuICAgICAgICB2YXIgdGhpc0hlaWdodCA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpLmdldFByb3BlcnR5VmFsdWUoXCJoZWlnaHRcIik7XG4gICAgICAgIHJldHVybiB0b0ludCh0aGlzSGVpZ2h0KTtcbiAgICB9XG5cbiAgICAvL3NldCBoZWlnaHQgYXMgc3RyaW5nIHB4IHZhbHVlLFxuICAgIGZ1bmN0aW9uIHNldEhlaWdodChlbGVtZW50LCBoZWlnaHQpe1xuICAgICAgICB2YXIgdGhpc0hlaWdodCA9IHRvUGl4KGhlaWdodCk7XG4gICAgICAgIC8vY29uc29sZS5sb2coXCJzZXRIZWlnaHQgLSBcIiArIGVsZW1lbnQuaWQgKyBcIiAtIFwiICsgaGVpZ2h0KTtcbiAgICAgICAgZWxlbWVudC5zdHlsZS5oZWlnaHQgPSB0aGlzSGVpZ2h0O1xuICAgIH1cblxuLy9zZXQgd2lkdGggdG8gdGhpc1dpZHRoIGFzIHN0cmluZyBweCB2YWx1ZSwgb3IgZ2V0IHRoZSBjb21wdXRlZCBzdHlsZSB3aWR0aFxuZnVuY3Rpb24gd2lkdGgoZWxlbWVudCwgd2lkdGgpe1xuICAgIGlmICh3aWR0aCl7XG4gICAgICAgIHNldFdpZHRoKGVsZW1lbnQsIHdpZHRoKTtcbiAgICB9XG4gICAgZWxzZXtcbiAgICAgICAgZ2V0V2lkdGgoZWxlbWVudCk7XG4gICAgfVxufVxuXG4gICAgLy9nZXQgdGhlIGNvbXB1dGVkIHN0eWxlIHdpZHRoXG4gICAgZnVuY3Rpb24gZ2V0V2lkdGgoZWxlbWVudCl7XG4gICAgICAgIHZhciB0aGlzV2lkdGggPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KS5nZXRQcm9wZXJ0eVZhbHVlKFwid2lkdGhcIik7XG4gICAgICAgIC8vY29uc29sZS5sb2coXCJnZXRXaWR0aCAtIFwiICsgZWxlbWVudC5pZCk7XG4gICAgICAgIHJldHVybiB0b0ludCh0aGlzV2lkdGgpO1xuICAgIH1cblxuICAgIC8vc2V0IHdpZHRoIGFzIHN0cmluZyBweCB2YWx1ZSxcbiAgICBmdW5jdGlvbiBzZXRXaWR0aChlbGVtZW50LCB3aWR0aCl7XG4gICAgICAgIHZhciB0aGlzV2lkdGggPSB0b1BpeCh3aWR0aCk7XG4gICAgICAgIC8vY29uc29sZS5sb2coXCJzZXRXaWR0aCAtIFwiICsgZWxlbWVudC5pZCArIFwiIC0gXCIgKyB0aGlzV2lkdGgpO1xuICAgICAgICBlbGVtZW50LnN0eWxlLndpZHRoID0gdGhpc1dpZHRoO1xuICAgIH1cblxuXG4vL01JTiBIRUlHSFRcbmZ1bmN0aW9uIG1pbkhlaWdodChlbGVtZW50LCBtaW5IZWlnaHQpe1xuICAgIGlmIChtaW5IZWlnaHQpe1xuICAgICAgICBzZXRNaW5IZWlnaHQoZWxlbWVudCwgbWluSGVpZ2h0KTtcbiAgICB9XG4gICAgZWxzZXtcbiAgICAgICAgZ2V0TWluSGVpZ2h0KGVsZW1lbnQpO1xuICAgIH1cbn1cbiAgICAvL2dldCB0aGUgY29tcHV0ZWQgc3R5bGUgb2YgbWluLWhlaWdodFxuICAgIGZ1bmN0aW9uIGdldE1pbkhlaWdodChlbGVtZW50KXtcbiAgICAgICAgdmFyIHRoaXNNaW5IZWlnaHQgPSBnZXRTdHlsZShlbGVtZW50LCBcIm1pbkhlaWdodFwiKTtcbiAgICAgICAgcmV0dXJuIHRvSW50KHRoaXNNaW5IZWlnaHQpO1xuICAgIH1cblxuICAgIC8vc2V0IG1pbkhlaWdodCBhcyBweCB2YWx1ZSxcbiAgICBmdW5jdGlvbiBzZXRNaW5IZWlnaHQoZWxlbWVudCwgbWluSGVpZ2h0KXtcbiAgICAgICAgdmFyIHRoaXNNaW5IZWlnaHQgPSB0b1BpeChtaW5IZWlnaHQpO1xuICAgICAgICBzZXRTdHlsZShlbGVtZW50LCB7XCJtaW5IZWlnaHRcIiAgOiB0aGlzTWluSGVpZ2h0fSk7XG4gICAgfVxuXG4gICAgLy9zZXQgd2lkdGggYXMgcHggdmFsdWUsIG9yIGdldCB0aGUgY29tcHV0ZWQgc3R5bGUgd2lkdGhcbiAgICBmdW5jdGlvbiBtaW5XaWR0aChlbGVtZW50LCBtaW5XaWR0aCl7XG4gICAgICAgIGlmIChtaW5XaWR0aCl7XG4gICAgICAgICAgICBzZXRNaW5XaWR0aChlbGVtZW50LCBtaW5XaWR0aCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIGdldE1pbldpZHRoKGVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgfVxuICAgICAgICAvL2dldCBtaW4td2lkdGggZnJvbSB0aGUgY29tcHV0ZWQgc3R5bGVcbiAgICAgICAgZnVuY3Rpb24gZ2V0TWluV2lkdGgoZWxlbWVudCl7XG4gICAgICAgICAgICB2YXIgdGhpc01pbldpZHRoID0gZ2V0U3R5bGUoZWxlbWVudCwgXCJtaW5XaWR0aFwiKTtcbiAgICAgICAgICAgIHJldHVybiB0b0ludCh0aGlzTWluV2lkdGgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9zZXQgbWluLXdpZHRoIGFzIHN0cmluZyBweCB2YWx1ZSxcbiAgICAgICAgZnVuY3Rpb24gc2V0TWluV2lkdGgoZWxlbWVudCwgbWluV2lkdGgpe1xuICAgICAgICAgICAgdmFyIHRoaXNNaW5XaWR0aCA9IHRvUGl4KHRoaXNNaW5XaWR0aCk7XG4gICAgICAgICAgICByZXR1cm4gc2V0U3R5bGUoZWxlbWVudCwge1wibWluV2lkdGhcIiAgOiB0aGlzTWluV2lkdGh9KTtcbiAgICAgICAgfVxuXG5mdW5jdGlvbiBnZXRNYXJnaW4oZWxlbWVudCl7XG4gICAgdmFyIHRoaXNNYXJnaW5Ub3AgPSAgICAgdG9JbnQoIGdldFN0eWxlKGVsZW1lbnQsIFwibWFyZ2luVG9wXCIpICk7XG4gICAgdmFyIHRoaXNNYXJnaW5SaWdodCA9ICAgdG9JbnQoIGdldFN0eWxlKGVsZW1lbnQsIFwibWFyZ2luUmlnaHRcIikgKTtcbiAgICB2YXIgdGhpc01hcmdpbkJvdHRvbSA9ICB0b0ludCggZ2V0U3R5bGUoZWxlbWVudCwgXCJtYXJnaW5Cb3R0b21cIikgKTtcbiAgICB2YXIgdGhpc01hcmdpbkxlZnQgPSAgICB0b0ludCggZ2V0U3R5bGUoZWxlbWVudCwgXCJtYXJnaW5MZWZ0XCIpICk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICB0b3A6IHRoaXNNYXJnaW5Ub3AsXG4gICAgICAgIHJpZ2h0OiB0aGlzTWFyZ2luUmlnaHQsXG4gICAgICAgIGJvdHRvbTogdGhpc01hcmdpbkJvdHRvbSxcbiAgICAgICAgbGVmdDogdGhpc01hcmdpbkxlZnRcbiAgICB9O1xufVxuXG5mdW5jdGlvbiBnZXRQYWRkaW5nKGVsZW1lbnQpe1xuICAgIC8vY29uc29sZS5sb2coXCJnZXRQYWRkaW5nIGZvcjogXCIgKyBlbGVtZW50LmlkKTtcbiAgICB2YXIgdGhpc1BhZGRpbmdUb3AgPSAgICB0b0ludCggZ2V0U3R5bGUoZWxlbWVudCwgXCJwYWRkaW5nVG9wXCIpICk7XG4gICAgdmFyIHRoaXNQYWRkaW5nUmlnaHQgPSAgdG9JbnQoIGdldFN0eWxlKGVsZW1lbnQsIFwicGFkZGluZ1JpZ2h0XCIpICk7XG4gICAgdmFyIHRoaXNQYWRkaW5nQm90dG9tID0gdG9JbnQoIGdldFN0eWxlKGVsZW1lbnQsIFwicGFkZGluZ0JvdHRvbVwiKSApO1xuICAgIHZhciB0aGlzUGFkZGluZ0xlZnQgPSAgIHRvSW50KCBnZXRTdHlsZShlbGVtZW50LCBcInBhZGRpbmdMZWZ0XCIpICk7XG4gICAgLy9jb25zb2xlLmxvZyhcImdldFBhZGRpbmcoKSAtIHRvcDogXCIgKyB0aGlzUGFkZGluZ1RvcCk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICB0b3A6IHRoaXNQYWRkaW5nVG9wLFxuICAgICAgICByaWdodDogdGhpc1BhZGRpbmdSaWdodCxcbiAgICAgICAgYm90dG9tOiB0aGlzUGFkZGluZ0JvdHRvbSxcbiAgICAgICAgbGVmdDogdGhpc1BhZGRpbmdMZWZ0XG4gICAgfTtcbn1cblxuZnVuY3Rpb24gZ2V0UG9zaXRpb24oZWxlbWVudCkge1xuICAgIHZhciB0aGlzUG9zaXRpb24gPSBnZXRTdHlsZShlbGVtZW50LCBcInBvc2l0aW9uXCIpO1xuICAgIC8vY29uc29sZS5sb2coXCJnZXRQb3NpdGlvbigpIGZvciBcIiArIGVsZW1lbnQuaWQgKyBcIiA6IFwiICsgdGhpc1Bvc2l0aW9uKTtcbiAgICByZXR1cm4gdGhpc1Bvc2l0aW9uO1xufVxuXG5mdW5jdGlvbiBnZXRPZmZzZXQoZWxlbWVudCwgb3V0ZXJIZWlnaHQsIG91dGVyV2lkdGgpe1xuICAgIC8vY29uc29sZS5sb2coXCJnZXRPZmZzZXQoKSAtIG91dGVySGVpZ2h0OiBcIiArIG91dGVySGVpZ2h0ICk7XG4gICAgb3V0ZXJIZWlnaHQgPSBvdXRlckhlaWdodCA/IG91dGVySGVpZ2h0IDogZ2V0T3V0ZXJIZWlnaHQoZWxlbWVudCk7XG4gICAgb3V0ZXJXaWR0aCAgPSBvdXRlcldpZHRoICA/IG91dGVyV2lkdGggIDogZ2V0T3V0ZXJXaWR0aChlbGVtZW50KTtcbiAgICB2YXIgdGhpc1RvcCA9IGdldE9mZnNldFRvcChlbGVtZW50KTtcbiAgICB2YXIgdGhpc1JpZ2h0ID0gZ2V0T2Zmc2V0UmlnaHQoZWxlbWVudCwgb3V0ZXJXaWR0aCk7XG4gICAgdmFyIHRoaXNCb3R0b20gPSBnZXRPZmZzZXRCb3R0b20oZWxlbWVudCwgb3V0ZXJIZWlnaHQpO1xuICAgIHZhciB0aGlzTGVmdCA9IGdldE9mZnNldExlZnQoZWxlbWVudCk7XG5cbiAgICB2YXIgdGhlc2VPZmZzZXRzID0ge1xuICAgICAgICB0b3A6IHRoaXNUb3AsXG4gICAgICAgIHJpZ2h0OiB0aGlzUmlnaHQsXG4gICAgICAgIGJvdHRvbTogdGhpc0JvdHRvbSxcbiAgICAgICAgbGVmdDogdGhpc0xlZnRcbiAgICB9O1xuICAgIC8vY29uc29sZS5sb2coXCJnZXRPZmZzZXQoKSA6IFwiICsgdGhlc2VPZmZzZXRzKTtcbiAgICByZXR1cm4gdGhlc2VPZmZzZXRzO1xufVxuXG5mdW5jdGlvbiBnZXRPZmZzZXRUb3AoZWxlbWVudCl7XG4gICAgdmFyIHRoaXNUb3AgPSAwO1xuICAgIHdoaWxlKGVsZW1lbnQpe1xuICAgICAgICB0aGlzVG9wICs9IChlbGVtZW50Lm9mZnNldFRvcCAtIGVsZW1lbnQuc2Nyb2xsVG9wICsgZWxlbWVudC5jbGllbnRUb3ApO1xuICAgICAgICBlbGVtZW50ID0gZWxlbWVudC5vZmZzZXRQYXJlbnQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXNUb3A7XG59XG5cbmZ1bmN0aW9uIGdldE9mZnNldEJvdHRvbShlbGVtZW50LCBvdXRlckhlaWdodCl7XG4gICAgb3V0ZXJIZWlnaHQgPSBvdXRlckhlaWdodCA/IG91dGVySGVpZ2h0IDogZ2V0T3V0ZXJIZWlnaHQoZWxlbWVudCk7XG4gICAgdmFyIHRoaXNFbGVtZW50VG9wID0gZ2V0T2Zmc2V0VG9wKGVsZW1lbnQpO1xuXG4gICAgLy9jb25zb2xlLmxvZyhcImdldE9mZnNldEJvdHRvbSgpIC0gZWxlbWVudFRvcDogXCIgKyB0aGlzRWxlbWVudFRvcCApO1xuICAgIC8vY29uc29sZS5sb2coXCJnZXRPZmZzZXRCb3R0b20oKSAtIG91dGVySGVpZ2h0OiBcIiArIG91dGVySGVpZ2h0ICk7XG5cbiAgICB2YXIgdGhpc09mZnNldEJvdHRvbSA9IHRoaXNFbGVtZW50VG9wICsgb3V0ZXJIZWlnaHQ7XG5cbiAgICByZXR1cm4gdGhpc09mZnNldEJvdHRvbTtcbn1cblxuZnVuY3Rpb24gZ2V0T2Zmc2V0TGVmdChlbGVtZW50KXtcbiAgICB2YXIgdGhpc0xlZnQgPSAwO1xuICAgIHdoaWxlKGVsZW1lbnQpIHtcbiAgICAgICAgdGhpc0xlZnQgKz0gKGVsZW1lbnQub2Zmc2V0VG9wIC0gZWxlbWVudC5zY3JvbGxUb3AgKyBlbGVtZW50LmNsaWVudFRvcCk7XG4gICAgICAgIGVsZW1lbnQgPSBlbGVtZW50Lm9mZnNldFBhcmVudDtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpc0xlZnQ7XG59XG5cbmZ1bmN0aW9uIGdldE9mZnNldFJpZ2h0KGVsZW1lbnQsIG91dGVyV2lkdGgpe1xuICAgIG91dGVyV2lkdGggPSBvdXRlcldpZHRoID8gb3V0ZXJXaWR0aCA6IGdldE91dGVyV2lkdGgoZWxlbWVudCk7XG4gICAgdmFyIHRoaXNPZmZzZXRMZWZ0ID0gZ2V0T2Zmc2V0TGVmdChlbGVtZW50KTtcbiAgICB2YXIgdGhpc09mZnNldEJvdHRvbSA9IHRoaXNPZmZzZXRMZWZ0ICsgb3V0ZXJXaWR0aDtcblxuICAgIHJldHVybiB0aGlzT2Zmc2V0Qm90dG9tO1xufVxuXG5cbi8vb3V0ZXJIZWlnaHQgKyBvdXRlcldpZHRoIGNhbGN1bGF0aW9uc1xuZnVuY3Rpb24gZ2V0T3V0ZXJIZWlnaHQoZWxlbWVudCwgaGVpZ2h0LCBtYXJnaW4sIHBhZGRpbmcpe1xuICAgICBoZWlnaHQgPSBoZWlnaHQgPyBoZWlnaHQgOiBnZXRIZWlnaHQoZWxlbWVudCk7XG4gICAgIG1hcmdpbiA9IG1hcmdpbiA/IG1hcmdpbiA6IGdldE1hcmdpbihlbGVtZW50KTtcbiAgICAgcGFkZGluZyA9IHBhZGRpbmcgPyBwYWRkaW5nIDogZ2V0UGFkZGluZyhlbGVtZW50KTtcbiAgICAvL2NvbnNvbGUubG9nKHBhZGRpbmcpO1xuXG4gICAgLy9nZXQvYWRkIHZlcnRpY2FsIG1hcmdpbiBhbmQgcGFkZGluZyB2YWx1ZXMgdG8gaGVpZ2h0XG4gICAgdmFyIHRoaXNWZXJ0TWFyZ2luID0gbWFyZ2luLnRvcCArIG1hcmdpbi5ib3R0b207XG4gICAgdmFyIHRoaXNWZXJ0UGFkZGluZyA9IHBhZGRpbmcudG9wICsgcGFkZGluZy5ib3R0b207XG4gICAgdmFyIHRoaXNPdXRlckhlaWdodCA9IGhlaWdodCArIHRoaXNWZXJ0TWFyZ2luICsgdGhpc1ZlcnRQYWRkaW5nO1xuXG4gICAgcmV0dXJuIHRoaXNPdXRlckhlaWdodDtcbn1cblxuZnVuY3Rpb24gZ2V0T3V0ZXJXaWR0aChlbGVtZW50LCB3aWR0aCwgbWFyZ2luLCBwYWRkaW5nKXtcbiAgICB3aWR0aCA9IHdpZHRoID8gd2lkdGggOiBnZXRXaWR0aChlbGVtZW50KTtcbiAgICBtYXJnaW4gPSBtYXJnaW4gPyBtYXJnaW4gOiBnZXRNYXJnaW4oZWxlbWVudCk7XG4gICAgcGFkZGluZyA9IHBhZGRpbmcgPyBwYWRkaW5nIDogZ2V0UGFkZGluZyhlbGVtZW50KTtcblxuICAgIC8vZ2V0L2FkZCBob3Jpem9udGFsIG1hcmdpbiBhbmQgcGFkZGluZyB2YWx1ZXMgdG8gd2lkdGhcbiAgICB2YXIgdGhpc0hvcnpNYXJnaW4gPSBtYXJnaW4ubGVmdCArIG1hcmdpbi5yaWdodDtcbiAgICB2YXIgdGhpc0hvcnpQYWRkaW5nID0gcGFkZGluZy5sZWZ0ICsgcGFkZGluZy5yaWdodDtcbiAgICB2YXIgdGhpc091dGVyV2lkdGggPSB3aWR0aCArIHRoaXNIb3J6TWFyZ2luICsgdGhpc0hvcnpQYWRkaW5nO1xuXG4gICAgcmV0dXJuIHRoaXNPdXRlcldpZHRoO1xufVxuIiwiLy8gZ2V0IGVsZW1lbnQgYnkgSWQgPiBjbGFzcyA+IHNlbGVjdG9yXG5mdW5jdGlvbiBnZXQoc2VsZWN0b3IsIGZhbWlseSl7XG4gICAgdmFyIHRoaXNUYXJnZXQ7IC8vY29udGFpbnMgcmVzdWx0aW5nIGVsZW1lbnQocykgZnJvbSBnZXQoKVxuXG4gICAgaWYgKGZhbWlseSl7XG4gICAgICAgIHRoaXNUYXJnZXQgPSBnZXRGYW1pbHkoc2VsZWN0b3IsIGZhbWlseSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBpZiggZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoc2VsZWN0b3IpICl7XG4gICAgICAgICAgICB0aGlzVGFyZ2V0ID0gIGdldEJ5SWQoc2VsZWN0b3IpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoc2VsZWN0b3IpKXtcbiAgICAgICAgICAgIHRoaXNUYXJnZXQgPSAgZ2V0QnlDbGFzcyhzZWxlY3Rvcik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHRoaXNUYXJnZXQgPSBnZXRCeVNlbGVjdG9yKHNlbGVjdG9yKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvL2NvbnNvbGUubG9nKFwiZ2V0KCkgY2FsbGVkIG9uOiBcIiArIHNlbGVjdG9yICsgXCIgcmV0dXJuZWQ6IFwiICsgdGhpc1RhcmdldCk7XG4gICAgcmV0dXJuIHRoaXNUYXJnZXQ7XG59XG5cbiAgICBmdW5jdGlvbiBnZXRCeUlkKGlkKXtcbiAgICAgICAgdmFyIHRoaXNUYXJnZXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7XG4gICAgICAgIHJldHVybiB0aGlzVGFyZ2V0O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldEJ5Q2xhc3MoY2xhc3NOYW1lKXtcbiAgICAgICAgdmFyIHRoaXNUYXJnZXQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGNsYXNzTmFtZSk7XG4gICAgICAgIHJldHVybiB0aGlzVGFyZ2V0O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldEJ5U2VsZWN0b3Ioc2VsZWN0b3Ipe1xuICAgICAgICB2YXIgdGhpc1RhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwodGhpc1NlbGVjdG9yKTtcbiAgICAgICAgcmV0dXJuIHRoaXNUYXJnZXQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0RmFtaWx5KGVsZW1lbnQsIGZhbWlseSl7XG4gICAgICAgIHZhciB0aGlzRmFtaWx5O1xuICAgICAgICBzd2l0Y2ggKGZhbWlseSl7XG4gICAgICAgICAgICBjYXNlIFwicHJldlwiOlxuICAgICAgICAgICAgICAgIHRoaXNGYW1pbHkgPSBnZXRQcmV2KGVsZW1lbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIm5leHRcIjpcbiAgICAgICAgICAgICAgICB0aGlzRmFtaWx5ID0gZ2V0TmV4dChlbGVtZW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJwYXJlbnRcIjpcbiAgICAgICAgICAgICAgICB0aGlzRmFtaWx5ID0gZ2V0UGFyZW50KGVsZW1lbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgLyogRklYOiBBZGQgY2hpbGQgYW5kIGNoaWxkcmVuXG4gICAgICAgICAgICBjYXNlIFwiY2hpbGRcIjpcbiAgICAgICAgICAgICAgICB2YXIgdGhpc1RhcmdldCA9IGdldE5leHQoZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiY2hpbGRyZW5cIjpcbiAgICAgICAgICAgICAgICB2YXIgdGhpc1RhcmdldCA9IGdldE5leHQoZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAqL1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzRmFtaWx5O1xuICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBnZXRQcmV2KGVsZW1lbnQpe1xuICAgICAgICAgICAgdmFyIHRoaXNTaWJsaW5nID0gZWxlbWVudC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXNTaWJsaW5nO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gZ2V0TmV4dChlbGVtZW50KXtcbiAgICAgICAgICAgIHZhciB0aGlzU2libGluZyA9IGVsZW1lbnQubmV4dEVsZW1lbnRTaWJsaW5nO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXNTaWJsaW5nO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gZ2V0UGFyZW50KGVsZW1lbnQpe1xuICAgICAgICAgICAgdmFyIHRoaXNQYXJlbnQgPSBlbGVtZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiZ2V0UGFyZW50IC0gXCIgKyBlbGVtZW50LmlkICsgXCIgLSBcIiArIHRoaXNQYXJlbnQpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXNQYXJlbnQ7XG4gICAgICAgIH1cblxuZnVuY3Rpb24gbW92ZUFmdGVyKGVsZW1lbnQsIHRhcmdldCl7XG4gICAgdmFyIHRoaXNUb3AgPSBnZXRPZmZzZXRCb3R0b20odGFyZ2V0KTtcbiAgICBhZGRDbGFzcyh0YXJnZXQsIFwibW92ZWRBZnRlclwiKTtcbiAgICBzdHlsZShlbGVtZW50LCB7XG4gICAgICAgIC8vJ3Bvc2l0aW9uJzonYWJzb2x1dGUnLCAvL3NldCB3aXRoIGNzcyBjbGFzc1xuICAgICAgICAndG9wJzogdG9QaXgodGhpc1RvcClcbiAgICAgICAgfVxuICAgICk7XG59XG4iLCIndXNlIHN0cmljdCc7XG4vKmpzaGludCAtVzExNyAqL1xuLypcbmZ1bmN0aW9uIGFkZEV2ZW50KHRoaXNUYXJnZXQsIGV2ZW50VHlwZSwgZnVjbnRpb24pe1xuICAgIGdldCh0aGlzVGFyZ2V0KTtcbiAgICBpZihkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKXtcbiAgICAgICAgdGhpc1RhcmdldC5hZGRFdmVudExpc3RlbmVyKGV2ZW50VHlwZSwgZnVjbnRpb24sIGZhbHNlKTtcbiAgICB9IGVsc2UgaWYoZG9jdW1lbnQuYXR0YWNoRXZlbnQpe1xuICAgICAgICB0aGlzVGFyZ2V0LmF0dGFjaEV2ZW50KCdvbicrZXZlbnRUeXBlLCBmdWNudGlvbik7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGhpc1RhcmdldFsnb24nK2V2ZW50VHlwZV0gPSBmdWNudGlvbjtcbiAgICB9XG59XG5cbiovXG4vKlxuXG4vL1NhbXBsZSBVc2FnZVxuXG5hZGRFdmVudCh3aW5kb3csICdsb2FkJywgZnVuY3Rpb24oKXtcbiAgICAvL2FsbCBvdXIgY29kZSB0aGF0IHJ1bnMgYWZ0ZXIgdGhlIHBhZ2UgaXMgcmVhZHkgZ29lcyBoZXJlXG59KTtcblxuYWRkRXZlbnQob3VyRm9ybSwgJ3N1Ym1pdCcsIGNoZWNrRm9ybSk7XG5cbi8vICovXG4iLCJmdW5jdGlvbiBnZXREb2NIZWlnaHQoKXtcbiAgICAvL1N0YW5kYXJkaXplIGhlaWdodCB0byBoZWlnaGVzdCB2YWx1ZVxuICAgIHZhciBkb2NIZWlnaHQgPSBNYXRoLm1heCggYm9keS5zY3JvbGxIZWlnaHQsIGJvZHkub2Zmc2V0SGVpZ2h0LCBodG1sLmNsaWVudEhlaWdodCwgaHRtbC5zY3JvbGxIZWlnaHQsIGh0bWwub2Zmc2V0SGVpZ2h0ICk7XG4gICAgcmV0dXJuIGRvY0hlaWdodDtcbn1cblxuLy8gZ2V0IGVsZW1lbnQgYnkgSWQgPiBjbGFzcyA+IHNlbGVjdG9yXG5mdW5jdGlvbiBnZXQoc2VsZWN0b3IsIGZhbWlseSl7XG4gICAgdmFyIHRoaXNUYXJnZXQ7IC8vY29udGFpbnMgcmVzdWx0aW5nIGVsZW1lbnQocykgZnJvbSBnZXQoKVxuXG4gICAgaWYgKGZhbWlseSl7XG4gICAgICAgIHRoaXNUYXJnZXQgPSBnZXRGYW1pbHkoc2VsZWN0b3IsIGZhbWlseSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBpZiggZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoc2VsZWN0b3IpICl7XG4gICAgICAgICAgICB0aGlzVGFyZ2V0ID0gIGdldEJ5SWQoc2VsZWN0b3IpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKCBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKHNlbGVjdG9yKSApe1xuICAgICAgICAgICAgdGhpc1RhcmdldCA9ICBnZXRCeUNsYXNzKHNlbGVjdG9yKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgdGhpc1RhcmdldCA9IGdldEJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vY29uc29sZS5sb2coXCJnZXQoKSBjYWxsZWQgb246IFwiICsgc2VsZWN0b3IgKyBcIiByZXR1cm5lZDogXCIgKyB0aGlzVGFyZ2V0KTtcbiAgICByZXR1cm4gdGhpc1RhcmdldDtcbn1cblxuICAgIGZ1bmN0aW9uIGdldEJ5SWQoaWQpe1xuICAgICAgICB2YXIgdGhpc1RhcmdldCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcbiAgICAgICAgcmV0dXJuIHRoaXNUYXJnZXQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0QnlDbGFzcyhjbGFzc05hbWUpe1xuICAgICAgICB2YXIgdGhpc1RhcmdldCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoY2xhc3NOYW1lKTtcbiAgICAgICAgcmV0dXJuIHRoaXNUYXJnZXQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0QnlTZWxlY3RvcihzZWxlY3Rvcil7XG4gICAgICAgIHZhciB0aGlzVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCh0aGlzU2VsZWN0b3IpO1xuICAgICAgICByZXR1cm4gdGhpc1RhcmdldDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRGYW1pbHkoZWxlbWVudCwgZmFtaWx5KXtcbiAgICAgICAgdmFyIHRoaXNGYW1pbHk7XG4gICAgICAgIHN3aXRjaCAoZmFtaWx5KXtcbiAgICAgICAgICAgIGNhc2UgXCJwcmV2XCI6XG4gICAgICAgICAgICAgICAgdGhpc0ZhbWlseSA9IGdldFByZXYoZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwibmV4dFwiOlxuICAgICAgICAgICAgICAgIHRoaXNGYW1pbHkgPSBnZXROZXh0KGVsZW1lbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcInBhcmVudFwiOlxuICAgICAgICAgICAgICAgIHRoaXNGYW1pbHkgPSBnZXRQYXJlbnQoZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAvKiBGSVg6IEFkZCBjaGlsZCBhbmQgY2hpbGRyZW5cbiAgICAgICAgICAgIGNhc2UgXCJjaGlsZFwiOlxuICAgICAgICAgICAgICAgIHZhciB0aGlzVGFyZ2V0ID0gZ2V0TmV4dChlbGVtZW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJjaGlsZHJlblwiOlxuICAgICAgICAgICAgICAgIHZhciB0aGlzVGFyZ2V0ID0gZ2V0TmV4dChlbGVtZW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICovXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXNGYW1pbHk7XG4gICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGdldFByZXYoZWxlbWVudCl7XG4gICAgICAgICAgICB2YXIgdGhpc1NpYmxpbmcgPSBlbGVtZW50LnByZXZpb3VzRWxlbWVudFNpYmxpbmc7XG4gICAgICAgICAgICByZXR1cm4gdGhpc1NpYmxpbmc7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBnZXROZXh0KGVsZW1lbnQpe1xuICAgICAgICAgICAgdmFyIHRoaXNTaWJsaW5nID0gZWxlbWVudC5uZXh0RWxlbWVudFNpYmxpbmc7XG4gICAgICAgICAgICByZXR1cm4gdGhpc1NpYmxpbmc7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBnZXRQYXJlbnQoZWxlbWVudCl7XG4gICAgICAgICAgICB2YXIgdGhpc1BhcmVudCA9IGVsZW1lbnQucGFyZW50RWxlbWVudDtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJnZXRQYXJlbnQgLSBcIiArIGVsZW1lbnQuaWQgKyBcIiAtIFwiICsgdGhpc1BhcmVudCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpc1BhcmVudDtcbiAgICAgICAgfVxuXG5mdW5jdGlvbiBnZXRTdHlsZShlbGVtZW50LCBwcm9wZXJ0eSl7XG4gICAgdmFyIHRoaXNTdHlsZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpLmdldFByb3BlcnR5VmFsdWUocHJvcGVydHkpO1xuICAgIHJldHVybiB0aGlzU3R5bGU7XG59XG5cbmZ1bmN0aW9uIHNldFN0eWxlKGVsZW1lbnQsIHN0eWxlcyl7XG4gICAgdmFyIHByb3BlcnR5LCB2YWx1ZTtcbiAgICBmb3IgKCBwcm9wZXJ0eSBpbiBzdHlsZXMgKSB7XG4gICAgICAgIHZhbHVlID0gc3R5bGVzW3Byb3BlcnR5XTtcbiAgICAgICAgZWxlbWVudC5zdHlsZVtwcm9wZXJ0eV0gPSB2YWx1ZTtcbiAgICB9XG59XG5cbi8vRklYOiBjaGVjayBmb3Igb3RoZXIgc3RyaW5nIHZhbHVlc1xuZnVuY3Rpb24gdG9QaXgodGhpc1ZhbHVlKXtcbiAgICBpZih0aGlzVmFsdWUpe1xuICAgICAgICBpZiAoIHR5cGVvZih0aGlzVmFsdWUpID09PSBcInN0cmluZ1wiICl7XG4gICAgICAgICAgICAvL3BhcnNlIHRvIGJhc2UgMTAgKyBhbHNvIHJlbW92aW5nIHRyYWlsaW5nIFwicHhcIlxuICAgICAgICAgICAgdGhpc1ZhbHVlID0gcGFyc2VJbnQodGhpc1ZhbHVlLCAxMCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy90aGlzIGlzIHVuZGVmaW5lZCwgbnVsbCwgJycgKGVtcHR5IHN0cmluZyksIDAgb3IgTmFOXG4gICAgZWxzZXtcbiAgICAgICAgdGhpc1ZhbHVlID0gMDtcbiAgICB9XG5cbiAgICB0aGlzVmFsdWUgPSB0aGlzVmFsdWUgKz0gXCJweFwiO1xuICAgIHJldHVybiB0aGlzVmFsdWU7XG59XG5cbmZ1bmN0aW9uIHRvSW50KHRoaXNWYWx1ZSl7IC8vY2hlY2sgZm9yICdub25lJywgJ2luaGVyaXQnIGV0Yy5cbiAgICAvL2NoZWNrIGZvciB2YWxpZCB2YWx1ZVxuICAgIGlmKHRoaXNWYWx1ZSl7XG4gICAgICAgIGlmICggdHlwZW9mKHRoaXNWYWx1ZSkgPT09IFwic3RyaW5nXCIgKXtcbiAgICAgICAgICAgIC8vcGFyc2UgdG8gYmFzZSAxMCArIGFsc28gcmVtb3ZpbmcgdHJhaWxpbmcgXCJweFwiXG4gICAgICAgICAgICB0aGlzVmFsdWUgPSBwYXJzZUludCh0aGlzVmFsdWUsIDEwKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvL3RoaXMgaXMgdW5kZWZpbmVkLCBudWxsLCAnJyAoZW1wdHkgc3RyaW5nKSwgMCBvciBOYU5cbiAgICBlbHNle1xuICAgICAgICB0aGlzVmFsdWUgPSAwO1xuICAgIH1cbiAgICByZXR1cm4gdGhpc1ZhbHVlO1xufVxuXG5mdW5jdGlvbiBhZGRDbGFzcyhlbGVtZW50LCB0aGlzQ2xhc3Mpe1xuICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCh0aGlzQ2xhc3MpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVDbGFzcyhlbGVtZW50LCB0aGlzQ2xhc3Mpe1xuICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSh0aGlzQ2xhc3MpO1xufVxuXG5mdW5jdGlvbiB0b2dnbGVDbGFzcyhlbGVtZW50LCB0aGlzQ2xhc3Mpe1xuICAgIGVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZSh0aGlzQ2xhc3MpO1xufVxuXG5mdW5jdGlvbiBoYXNDbGFzcyhlbGVtZW50LCB0aGlzQ2xhc3Mpe1xuICAgIHZhciBoYXNDbGFzcyA9IGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKHRoaXNDbGFzcyk7XG4gICAgcmV0dXJuIGhhc0NsYXNzO1xufVxuXG5mdW5jdGlvbiBnZXRTY3JvbGxWYWx1ZShlbGVtZW50KXtcbiAgICBpZiAoZWxlbWVudCl7XG4gICAgICAgIHZhciB0aGlzRWxlbWVudCA9IGdldChlbGVtZW50KTtcbiAgICAgICAgdmFyIHRoaXNTY3JvbGxUb3AgPSB0aGlzRWxlbWVudC5zY3JvbGxZO1xuICAgICAgICAvL2NvbnNvbGUubG9nKHRoaXNTY3JvbGxUb3ApO1xuICAgICAgICByZXR1cm4gdGhpc1Njcm9sbFRvcDtcbiAgICB9XG4gICAgZWxzZXtcbiAgICAgICAgdmFyIHdpbmRvd1Njcm9sbFRvcCA9IHdpbmRvdy5zY3JvbGxZO1xuICAgICAgICByZXR1cm4gd2luZG93U2Nyb2xsVG9wO1xuICAgIH1cbn1cblxuLy9nZXQgYXR0cmlidXRlIC0gaWUuIGhyZWYsIGNsYXNzLCBjaGFyc2V0IGV0Yy5cbmZ1bmN0aW9uIGdldEF0dHJpYnV0ZSh0aGlzVGFyZ2V0LCB0aGlzQXR0cmlidXRlKXtcbiAgICB0aGlzVGFyZ2V0ID0gZ2V0KHRoaXNUYXJnZXQpO1xuICAgIHZhciB0aGlzVmFsdWUgPSB0aGlzVGFyZ2V0LmdldEF0dHJpYnV0ZSh0aGlzQXR0cmlidXRlKTtcbiAgICByZXR1cm4gdGhpc1ZhbHVlO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuLypqc2hpbnQgLVcxMTcgKi9cblxuZnVuY3Rpb24ganNvblRvSnModGhpc0pzb24pe1xuICAgIHJldHVybiBKU09OLnBhcnNlKHRoaXNKc29uKTtcbn1cblxuZnVuY3Rpb24ganNUb0pzb24odGhpc0pzT2JqZWN0KXtcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodGhpc0pzT2JqZWN0KTtcbn1cbiIsIi8vU3RyaW5nIE1hbmlwdWxhdGlvblxuZnVuY3Rpb24gZ2V0Q2hhckF0KHRoaXNUYXJnZXQsIHRoaXNQb3NpdGlvbil7XG4gICAgcmV0dXJuIHRoaXNUYXJnZXQuY2hhckF0KHRoaXNQb3NpdGlvbik7XG59XG5cbmZ1bmN0aW9uIGdldENoYXJJbmRleCh0aGlzVGFyZ2V0LCB0aGlzQ2hhcmFjdGVyKXtcbiAgICByZXR1cm4gdGhpc1RhcmdldC5pbmRleE9mKHRoaXNDaGFyYWN0ZXIpO1xufVxuXG5mdW5jdGlvbiB0cmltVGhpcyh0aGlzVGFyZ2V0KXtcbiAgICByZXR1cm4gdGhpc1RhcmdldC50cmltKCk7XG59IiwiZnVuY3Rpb24gc3R5bGVzKCBlbGVtZW50LCBzdHlsZXMgKSB7XG4gICAgaWYoc3R5bGVzKXtcbiAgICAgICAgc2V0U3R5bGUoZWxlbWVudCwgc3R5bGVzKTtcbiAgICB9XG4gICAgZWxzZXtcbiAgICAgICAgZ2V0U3R5bGUoZWxlbWVudCk7XG4gICAgfX1cblxuICAgIGZ1bmN0aW9uIGdldFN0eWxlKGVsZW1lbnQsIHByb3BlcnR5KXtcbiAgICAgICAgdmFyIHRoaXNTdHlsZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpLmdldFByb3BlcnR5VmFsdWUocHJvcGVydHkpO1xuICAgICAgICAvL2NvbnNvbGUubG9nKFwiZ2V0U3R5bGVzKCkgLSBcIiArIHByb3BlcnkgKyBcIiBmb3I6IFwiICsgZWxlbWVudC5pZCArIFwiIHJldHVybmVkOiBcIiArIHRoaXNTdHlsZSk7XG4gICAgICAgIHJldHVybiB0aGlzU3R5bGU7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2V0U3R5bGUoZWxlbWVudCwgc3R5bGVzKXtcbiAgICAgICAgdmFyIHByb3BlcnR5LCB2YWx1ZTtcbiAgICAgICAgZm9yICggcHJvcGVydHkgaW4gc3R5bGVzICkge1xuICAgICAgICAgICAgdmFsdWUgPSBzdHlsZXNbcHJvcGVydHldO1xuICAgICAgICAgICAgZWxlbWVudC5zdHlsZVtwcm9wZXJ0eV0gPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZWxlbWVudDtcbiAgICB9IiwialF1ZXJ5KCcjd2luZG93U2l6ZScpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgIGpRdWVyeSgnI3dpbmRvd1NpemUnKS5mYWRlT3V0KCdtZWRpdW0nKTtcbn0pO1xuXG5mdW5jdGlvbiB0ZXN0UGFuZWwoKSB7XG4gICAgalF1ZXJ5KCcjd2luZG93U2l6ZScpLmNzcygnZGlzcGxheScsJ2Jsb2NrJyk7XG4gICAgalF1ZXJ5KCcjd2luZG93U2l6ZScpLmVtcHR5KCk7XG5cbiAgICBqUXVlcnkoJyN3aW5kb3dTaXplJykuYXBwZW5kKFwiPGRpdj5XOiBcIiAgICAgKyB2aWV3V2lkdGggICAgICsgXCJweCA8L2Rpdj5cIik7XG4gICAgalF1ZXJ5KCcjd2luZG93U2l6ZScpLmFwcGVuZChcIjxkaXY+SDogXCIgICAgICsgdmlld0hlaWdodCAgICArIFwicHggPC9kaXY+XCIpO1xuICAgIGpRdWVyeSgnI3dpbmRvd1NpemUnKS5hcHBlbmQoXCI8ZGl2PlwiICAgICAgICArIGFzcFRleHQgICAgICAgKyBcIjwvZGl2PlwiKTtcbiAgICBqUXVlcnkoJyN3aW5kb3dTaXplJykuYXBwZW5kKFwiPGRpdj5CcDogXCIgICAgKyBicmVha1BvaW50ICAgICsgXCI8L2Rpdj5cIik7XG4gICAgalF1ZXJ5KCcjd2luZG93U2l6ZScpLmFwcGVuZChcIjxkaXY+RGV2aWNlOlwiICsgZGV2aWNlVHlwZSAgICArIFwiPC9kaXY+XCIpO1xuXG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICBqUXVlcnkoXCIjd2luZG93U2l6ZVwiKS5mYWRlT3V0KDQwMCk7XG4gICAgfSwgMzUwMCk7XG59XG4iLCJ2YXIgbXlTd2lwZSA9IFwibmV3U3dpcGVcIjtcblxuZnVuY3Rpb24gbmV3U3dpcGVUaHVtYnModGFyZ2V0LCBzbGlkZVNwZWVkKXtcbiAgICB3aW5kb3cubXlTd2lwZSA9IG5ldyBTd2lwZShkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0YXJnZXQpLCB7XG4gICAgICAgIHN0YXJ0U2xpZGU6IDAsXG4gICAgICAgIHNwZWVkOiAzMDAsXG4gICAgICAgIGF1dG86IHNsaWRlU3BlZWQsXG4gICAgICAgIGNvbnRpbnVvdXM6IHRydWUsXG4gICAgICAgIGRpc2FibGVTY3JvbGw6IGZhbHNlLFxuICAgICAgICBzdG9wUHJvcGFnYXRpb246IGZhbHNlLFxuICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24oaW5kZXgsIGVsZW0pIHtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ3NsaWRlIGNoYW5nZWQnKTtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coaW5kZXgsIGVsZW0pO1xuICAgICAgICB9LFxuICAgICAgICBzbGlkZU1vdmU6IGZ1bmN0aW9uKGluZGV4LCBlbGVtKSB7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdzbGlkZSBzdGFydGVkIG1vdmluZycpO1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhpbmRleCwgZWxlbSk7XG4gICAgICAgIH0sXG4gICAgICAgIHRyYW5zaXRpb25FbmQ6IGZ1bmN0aW9uKGluZGV4LCBlbGVtKSB7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdzbGlkZSBmaW5pc2hlZCBjaGFuZ2luZycpO1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhpbmRleCwgZWxlbSk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIHRodW1iQ2xpY2soKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCd0aHVtYkNsaWNrZWQnKTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICB0aHVtYkluZGV4ID0galF1ZXJ5KCcuc3dpcGUtdGh1bWInKS5pbmRleCggdGhpcyApO1xuICAgICAgICAvL2NvbnNvbGUubG9nKCd0aHVtYkNsaWNrZWQgLSB0aGlzOiAnICsgdGh1bWJJbmRleCk7XG5cbiAgICAgICAgd2luZG93Lm15U3dpcGUuc2xpZGUodGh1bWJJbmRleCk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICB2YXIgdGh1bWJzQ29udGFpbmVyID0galF1ZXJ5KCcuc3dpcGUtdGh1bWJzLXdyYXAnKTtcblxuICAgIC8vR2V0IHRoZSB0aHVtYm5haWxzXG4gICAgdmFyIHRodW1icyA9IHRodW1ic0NvbnRhaW5lci5jaGlsZHJlbignLnN3aXBlLXRodW1iJyk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aHVtYnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdGh1bWJzW2ldLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGh1bWJDbGljayk7XG4gICAgfVxuXG4gICAgLy9hZnRlciB0aGUgZ2FsbGVyeSBpcyByZWFkeSwgc2V0IHRoZSBkaW1lbnNpb25zXG4gICAgc2V0RGltZW5zaW9ucyhkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0YXJnZXQpKTtcbn1cblxuZnVuY3Rpb24gbmV3U3dpcGVCYXNpYyh0YXJnZXQsIHNsaWRlU3BlZWQpe1xuICAgIHdpbmRvd1t0YXJnZXRdID0gbmV3IFN3aXBlKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRhcmdldCksIHtcbiAgICAgICAgc3RhcnRTbGlkZTogMCxcbiAgICAgICAgYXV0bzogc2xpZGVTcGVlZCxcbiAgICAgICAgY29udGludW91czogdHJ1ZSxcbiAgICAgICAgZGlzYWJsZVNjcm9sbDogZmFsc2UsXG4gICAgICAgIHN0b3BQcm9wYWdhdGlvbjogZmFsc2UsXG4gICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbihpbmRleCwgZWxlbSkge1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnc2xpZGUgY2hhbmdlZCcpO1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhpbmRleCwgZWxlbSk7XG4gICAgICAgIH0sXG4gICAgICAgIHNsaWRlTW92ZTogZnVuY3Rpb24oaW5kZXgsIGVsZW0pIHtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ3NsaWRlIHN0YXJ0ZWQgbW92aW5nJyk7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKGluZGV4LCBlbGVtKTtcbiAgICAgICAgfSxcbiAgICAgICAgdHJhbnNpdGlvbkVuZDogZnVuY3Rpb24oaW5kZXgsIGVsZW0pIHtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ3NsaWRlIGZpbmlzaGVkIGNoYW5naW5nJyk7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKGluZGV4LCBlbGVtKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHNldERpbWVuc2lvbnMoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGFyZ2V0KSk7XG59XG4iLCIvKipcbiAqIE9wZW4gJiYgQ2xvc2UgU2xpZGUgUGFuZWxzXG4gKlxuICogRklYOiBBZGQgY29tbWVudHNcbiAqL1xuXG5mdW5jdGlvbiBvcGVuU2xpZGVyKHNsaWRlUGFuZWwsIHNsaWRlRGlyZWN0aW9uKXtcbiAgICBzbGlkZURpcmVjdGlvbiA9IHNsaWRlRGlyZWN0aW9uID8gc2xpZGVEaXJlY3Rpb24gOiBcImxlZnRcIjtcblxuICAgIHZhciBzbGlkZURpc3RhbmNlID0gc2xpZGVQYW5lbC53aWR0aCgpO1xuICAgIGlmKHNsaWRlRGlyZWN0aW9uID09PSBcInJpZ2h0XCIpe1xuICAgICAgICBzbGlkZURpc3RhbmNlID0gc2xpZGVEaXN0YW5jZSAqICgtMSk7XG4gICAgfVxuXG4gICAgdmFyIGZyaWVuZHMgPSBzbGlkZVBhbmVsLmRhdGEoJ2Fsc28tc2xpZGUnKS5zcGxpdChcIiBcIik7XG4gICAgalF1ZXJ5LmVhY2goIGZyaWVuZHMsIGZ1bmN0aW9uKCBpbmRleCwgZnJpZW5kICkge1xuICAgICAgICBqUXVlcnkoZnJpZW5kKS5hbmltYXRlKHtcImxlZnRcIiA6IHNsaWRlRGlzdGFuY2V9LCAzNTApO1xuICAgIH0pO1xuXG4gICAgdmFyIHNsaWRlckFuaW1hdGlvbiA9IHt9O1xuICAgIHNsaWRlckFuaW1hdGlvbltzbGlkZURpcmVjdGlvbl0gPSAwO1xuICAgIHNsaWRlUGFuZWwuYW5pbWF0ZShzbGlkZXJBbmltYXRpb24sIDM1MCk7XG59XG5cbmZ1bmN0aW9uIGNsb3NlU2xpZGVyKHNsaWRlUGFuZWwsIHNsaWRlRGlyZWN0aW9uKXtcbiAgICBzbGlkZURpcmVjdGlvbiA9IHNsaWRlRGlyZWN0aW9uID8gc2xpZGVEaXJlY3Rpb24gOiBcImxlZnRcIjtcblxuICAgIHZhciBzbGlkZURpc3RhbmNlID0gc2xpZGVQYW5lbC53aWR0aCgpO1xuICAgIGlmKHNsaWRlRGlyZWN0aW9uID09PSBcInJpZ2h0XCIpe1xuICAgICAgICBzbGlkZURpc3RhbmNlID0gc2xpZGVEaXN0YW5jZSAqICgtMSk7XG4gICAgfVxuXG4gICAgdmFyIGZyaWVuZHMgPSBzbGlkZVBhbmVsLmRhdGEoJ2Fsc28tc2xpZGUnKS5zcGxpdChcIiBcIik7XG4gICAgalF1ZXJ5LmVhY2goIGZyaWVuZHMsIGZ1bmN0aW9uKCBpbmRleCwgZnJpZW5kICkge1xuICAgICAgICBqUXVlcnkoZnJpZW5kKS5hbmltYXRlKHtcImxlZnRcIiA6IDAgfSwgMzUwKTtcbiAgICB9KTtcblxuICAgIGlmKHNsaWRlRGlyZWN0aW9uID09PSBcInJpZ2h0XCIpe1xuICAgICAgICBzbGlkZVBhbmVsLmFuaW1hdGUoe1wicmlnaHRcIiA6IHNsaWRlRGlzdGFuY2V9LCAzNTApO1xuICAgIH1lbHNle1xuICAgICAgICBzbGlkZURpc3RhbmNlID0gc2xpZGVEaXN0YW5jZSAqICgtMSk7XG4gICAgICAgIHNsaWRlUGFuZWwuYW5pbWF0ZSh7XCJsZWZ0XCIgOiBzbGlkZURpc3RhbmNlfSwgMzUwKTtcbiAgICB9XG59XG4iLCJmdW5jdGlvbiBtb3ZlVGh1bWJzQ29udGFpbmVyKCl7XG4gICAgLy9yZXNldCBmdW5jdGlvbiBzcGVjaWZpYyBzdHlsZXNcbiAgICBqUXVlcnkoJy5zd2lwZS10aHVtYicpLmNzcygnbWF4LXdpZHRoJywgXCJcIik7XG4gICAgalF1ZXJ5KCcuc3dpcGUtdGh1bWInKS5jc3MoJ21heC1oZWlnaHQnLCBcIlwiKTtcbiAgICBqUXVlcnkoJy5zd2lwZS10aHVtYnMtd3JhcCcpLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XG5cbiAgICBnYWxsZXJ5SGVpZ2h0ID0galF1ZXJ5KCcuaW1hZ2UtZ2FsbGVyeScpLmhlaWdodCgpO1xuICAgIGdhbGxlcnlXaWR0aCA9IGpRdWVyeSgnLmltYWdlLWdhbGxlcnknKS53aWR0aCgpO1xuXG4gICAgdGh1bWJzQ291bnQgPSAgalF1ZXJ5KCcuc3dpcGUtdGh1bWInKS5sZW5ndGg7XG4gICAgY29uc29sZS5sb2coXCJ0aHVtYnNDb3VudDogXCIgKyB0aHVtYnNDb3VudCk7XG5cbiAgICB0aHVtYldpZHRoID0galF1ZXJ5KCcuc3dpcGUtdGh1bWInKS53aWR0aCgpO1xuICAgIGNvbnNvbGUubG9nKFwiZWFjaFRodW1iV2lkdGg6IFwiICsgdGh1bWJXaWR0aCk7XG5cbiAgICB0aHVtYnNXcmFwV2lkdGggPSB0aHVtYnNDb3VudCAqIHRodW1iV2lkdGg7XG5cbiAgICAvL0FQUEVORCBUSFVNQlMgT04gTEFORFNDQVBFXG4gICAgaWYoIGdhbGxlcnlIZWlnaHQgPj0gdmlld0hlaWdodCAtIHRodW1iV2lkdGggKXtcbiAgICAgICAgLy9pZiAoalF1ZXJ5KHdpbmRvdykud2lkdGgoKSA+IHRhYmxldExhbmRzY2FwZSl7XG4gICAgICAgICAgICBpZiggalF1ZXJ5KGh0bWwpLmhhc0NsYXNzKCdsYW5kc2NhcGUnKSApe1xuICAgICAgICAgICAgICAgIGpRdWVyeSgnLnN3aXBlLXRodW1icy13cmFwJykuYXBwZW5kVG8oJy5zd2lwZScpO1xuICAgICAgICAgICAgICAgIGpRdWVyeSgnLnN3aXBlLXRodW1icy13cmFwJykuY3NzKCdwb3NpdGlvbicsICdhYnNvbHV0ZScpO1xuICAgICAgICAgICAgICAgIGpRdWVyeSgnLnN3aXBlLXRodW1icy13cmFwJykuY3NzKCdib3R0b20nLCAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgLy99XG4gICAgfVxuICAgIGVsc2V7XG4gICAgICAgIGpRdWVyeSgnLnN3aXBlLXRodW1icy13cmFwJykuaW5zZXJ0QWZ0ZXIoJy5zd2lwZScpO1xuICAgICAgICBqUXVlcnkoJy5zd2lwZS10aHVtYnMtd3JhcCcpLmNzcygncG9zaXRpb24nLCAnc3RhdGljJyk7XG4gICAgICAgIGpRdWVyeSgnLnN3aXBlLXRodW1icy13cmFwJykuY3NzKCdib3R0b20nLCBcImF1dG9cIik7XG4gICAgfVxuXG4gICAgLy9DRU5URVIgVEhVTUJTIENPTlRBSU5FUlxuXG4gICAgY29uc29sZS5sb2coXCJ0aHVtYnNXcmFwV2lkdGg6IFwiICsgdGh1bWJzV3JhcFdpZHRoKTtcbiAgICBjb25zb2xlLmxvZyhcImdhbGxlcldpZHRoOiBcIiArIGdhbGxlcnlXaWR0aCk7XG5cbiAgICBpZiAodGh1bWJzV3JhcFdpZHRoIDwgZ2FsbGVyeVdpZHRoKXtcbiAgICAgICAgdGh1bWJzV3JhcE1hcmdpbiA9IChnYWxsZXJ5V2lkdGggLSB0aHVtYnNXcmFwV2lkdGgpIC8gMjtcbiAgICAgICAgalF1ZXJ5KCcuc3dpcGUtdGh1bWJzLXdyYXAnKS5jc3MoJ21hcmdpbi1sZWZ0JywgdGh1bWJzV3JhcE1hcmdpbik7XG4gICAgfVxuXG4gICAgaWYgKHRodW1ic1dyYXBXaWR0aCA+IGdhbGxlcnlXaWR0aCl7XG4gICAgICAgIGNvbnNvbGUubG9nKFwidGh1bWJzIGJpZ2dlclwiKTtcbiAgICAgICAgdGh1bWJNYXhXaWR0aCA9IGdhbGxlcnlXaWR0aCAvIHRodW1ic0NvdW50O1xuICAgICAgICBqUXVlcnkoJy5zd2lwZS10aHVtYicpLmNzcygnbWF4LXdpZHRoJywgdGh1bWJNYXhXaWR0aCk7XG4gICAgICAgIGpRdWVyeSgnLnN3aXBlLXRodW1iJykuY3NzKCdtYXgtaGVpZ2h0JywgdGh1bWJNYXhXaWR0aCk7XG4gICAgICAgIGpRdWVyeSgnLnN3aXBlLXRodW1icy1jb250YWluZXInKS5jc3MoJ21heC1oZWlnaHQnLCB0aHVtYk1heFdpZHRoKTtcbiAgICB9XG59XG4iLCIvL3JldHVybnMgdGhlIGNhbGxlciBmdW5jdGlvbiBuYW1lXG4vKlxuICAgIHZhciBjYWxsZXJOYW1lO1xuICAgIHRyeSB7IHRocm93IG5ldyBFcnJvcigpOyB9XG4gICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgdmFyIHJlID0gLyhcXHcrKUB8YXQgKFxcdyspIFxcKC9nLCBzdCA9IGUuc3RhY2ssIG07XG4gICAgICAgIHJlLmV4ZWMoc3QpLCBtID0gcmUuZXhlYyhzdCk7XG4gICAgICAgIGNhbGxlck5hbWUgPSBtWzFdIHx8IG1bMl07XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKFwiZnVuY3Rpb24oKSBjYWxsZWQgYnk6IFwiICsgY2FsbGVyTmFtZSk7XG4qL1xuXG4vLyBKU09OLnN0cmluZ2lmeSgpIHR1cm5zIGEgSmF2YXNjcmlwdCBvYmplY3QgaW50byBKU09OIHRleHQgYW5kIHN0b3JlcyB0aGF0IEpTT04gdGV4dCBpbiBhIHN0cmluZy5cbi8vIEpTT04ucGFyc2UoKSB0dXJucyBhIHN0cmluZyBvZiBKU09OIHRleHQgaW50byBhIEphdmFzY3JpcHQgb2JqZWN0LlxuXG5cbmZ1bmN0aW9uIGR1bXBDb21wdXRlZFN0eWxlcyhlbGVtLHByb3ApIHtcblxuICB2YXIgY3MgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbGVtLG51bGwpO1xuICBpZiAocHJvcCkge1xuICAgIGNvbnNvbGUubG9nKHByb3ArXCIgOiBcIitjcy5nZXRQcm9wZXJ0eVZhbHVlKHByb3ApKTtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIGxlbiA9IGNzLmxlbmd0aDtcbiAgZm9yICh2YXIgaT0wO2k8bGVuO2krKykge1xuXG4gICAgdmFyIHN0eWxlID0gY3NbaV07XG4gICAgY29uc29sZS5sb2coc3R5bGUrXCIgOiBcIitjcy5nZXRQcm9wZXJ0eVZhbHVlKHN0eWxlKSk7XG4gIH1cblxufVxuIiwiZnVuY3Rpb24gYXBwbHlJc28oKXtcbiAgICB2YXIgcHJvamVjdHNJc28gPSBqUXVlcnkoJy5pc28tZ3JpZCcpLmlzb3RvcGUoe1xuICAgICAgICBpdGVtU2VsZWN0b3I6ICcuaXNvLWdyaWQtaXRlbScsXG4gICAgICAgIHJlc2l6YWJsZTogZmFsc2UsIC8vIGRpc2FibGUgbm9ybWFsIHJlc2l6aW5nXG4gICAgICAgIHBlcmNlbnRQb3NpdGlvbjogdHJ1ZSxcbiAgICAgICAgYW5pbWF0aW9uRW5naW5lOiAnYmVzdC1hdmFpbGFibGUnLFxuICAgICAgICBhbmltYXRpb25PcHRpb25zOiB7XG4gICAgICAgICAgICBkdXJhdGlvbjogMzAwMCxcbiAgICAgICAgICAgIGVhc2luZzogJ2xpbmVhcicsXG4gICAgICAgICAgICBxdWV1ZTogZmFsc2VcbiAgICAgICAgfSxcbiAgICAgICAgbGF5b3V0TW9kZTogJ2ZpdFJvd3MnLFxuICAgICAgICBtYXNvbnJ5OntcbiAgICAgICAgICAgIGNvbHVtbldpZHRoOiAgICAnaXNvLWdyaWQtaXRlbScsXG4gICAgICAgICAgICBpc0FuaW1hdGVkOiAgICAgdHJ1ZVxuICAgICAgICAgICAgLy9pc0ZpdFdpZHRoOiAgIHRydWVcbiAgICAgICAgfVxuICAgIH0pO1xufVxuIiwiLyoqXG4gKiBnZXRCcmVha3BvaW50KClcbiAqXG4gKiBEZXRlcm1pbmVzIHN0cmluZyB2YWx1ZSBvZiBicmVha3BvaW50IGJhc2VkIG9uIHRoZSBjdXJyZW50IHZpZXdwb3J0IHNpemUuXG4gKlxuICogQGdsb2JhbCB2aWV3V2lkdGggKGludCkgaXMgY2FsY3VsYXRlZCBvbiBkb2MucmVhZHkgYW5kIGVhY2ggZG9jLnJlc2l6ZVxuICpcbiAqIEBnbG9iYWwgbW9iaWxlUG9ydHJhaXQgKGludCksXG4gKiBAZ2xvYmFsIG1vYmlsZUxhbmRzY2FwZSAoaW50KSxcbiAqIEBnbG9iYWwgdGFibGV0TGFuZHNjYXBlIChpbnQpIHNldHRpbmdzIGFyZSBkZWZpbmVkIGluIHZlbGNyby9jb3JlRnJhbWV3b3JrLmpzXG4gKlxuICogQHJldHVybiB0aGlzQnJlYWtwb2ludCAoc3RyaW5nKVxuICovXG5cbmZ1bmN0aW9uIGdldEJyZWFrcG9pbnQoc21hbGxCcCwgbGFyZ2VCcCl7XG4gICAgdmFyIHRoaXNCcExhYmVsO1xuICAgIGlmKCB2aWV3V2lkdGggPD0gc21hbGxCcCApe1xuICAgICAgICB0aGlzQnBMYWJlbCA9IFwic21hbGxcIjtcbiAgICB9XG4gICAgZWxzZSBpZiAoIHZpZXdXaWR0aCA+IHNtYWxsQnAgJiYgdmlld1dpZHRoIDwgbGFyZ2VCcCApe1xuICAgICAgICB0aGlzQnBMYWJlbCA9IFwibWVkaXVtXCI7XG4gICAgfVxuICAgIGVsc2V7XG4gICAgICAgIHRoaXNCcExhYmVsID0gXCJsYXJnZVwiO1xuICAgIH1cbiAgICBjb25zb2xlLmxvZyhcIkJyZWFrcG9pbnQ6IFwiICsgdGhpc0JwTGFiZWwpO1xuICAgIHJldHVybiB0aGlzQnBMYWJlbDtcbn1cbiIsIi8qKlxuICogZmlsdGVyQnlWaWV3cG9ydChhbGxWaWV3cG9ydHNDb250ZW50LCBmaXJzdEJyZWFrLCBzZWNvbmRCcmVhayk7XG4gKlxuICogRmlsdGVycyBhbGwgYXZhaWxhYmxlIGNvbnRlbnQgYnkgY3VycmVudCB2aWV3cG9ydCBzaXplLiAgUmV0dXJucyBtZWRpdW0sIGxhcmdlIG9yIHhsYXJnZSBhcnJheS5cbiAqXG4gKiBAYWxsVmlld3BvcnRzQ29udGVudCAoYXJyYXkpIHN0cnVjdHVyZWQgYnkgc2l6ZTpcbiAgICAqICBhbGxWaWV3cG9ydHNDb250ZW50WzBdOiBzbWFsbCBvciB0aHVtYm5haWwgc3BlY2lmaWMgY29udGVudFxuICAgICogIGFsbFZpZXdwb3J0c0NvbnRlbnRbMV06IG1lZGl1bSBzcGVjaWZpYyBjb250ZW50XG4gICAgKiAgYWxsVmlld3BvcnRzQ29udGVudFsyXTogbGFyZ2Ugc3BlY2lmaWMgY29udGVudFxuICAgICogIGFsbFZpZXdwb3J0c0NvbnRlbnRbM106IHhsYXJnZSBzcGVjaWZpYyBjb250ZW50XG4gICAgKlxuKiBAZmlyc3RCcmVhayAoaW50KSxcbiogQHNlY29uZEJyZWFrIChpbnQpIHNldCBpbiAvdmVsY3JvL2NvcmVGcmFtZXdvcmsuanNcbipcbiogQHRoaXNWaWV3cG9ydFNpemUgY29uc2lkZXJlZCB0aGUgbGFyZ2VyIG9mIHZpZXdIZWlnaHQgb3Igdmlld1dpZHRoLCBhcyB0aGUgdXNlciBtYXkgdHVybiB0aGUgZGV2aWNlLlxuKlxuKiBAcmV0dXJuIHRoaXNWaWV3cG9ydENvbnRlbnQgKGFycmF5KVxuKlxuKi9cblxuLy9GSVg6IEFkZCBjb25kaXRpb24gY2hlY2s6IGFsbFZpZXdwb3J0c0NvbnRlbnQgZm9yIGNvcnJlY3QgZGF0YSBzdHJ1Y3R1cmVcbmZ1bmN0aW9uIGZpbHRlckJ5Vmlld3BvcnQoYWxsVmlld3BvcnRzQ29udGVudCwgZmlyc3RCcmVhaywgc2Vjb25kQnJlYWspe1xuXG4gICAgLy9zZWxlY3QgdGhlIGxhcmdlciBvZiB2aWV3cG9ydCBoZWlnaHQgLSB3aWR0aCAoZGV2aWNlIGNhbiByb3RhdGUgYWZ0ZXIgbG9hZGluZyBjb250ZW50KVxuICAgIHZhciB0aGlzVmlld3BvcnRTaXplID0gTWF0aC5tYXgodmlld0hlaWdodCwgdmlld1dpZHRoKTtcbiAgICB2YXIgdGhpc1ZpZXdwb3J0Q29udGVudDtcblxuICAgIC8vbWVkaXVtO1xuICAgIGlmICggdGhpc1ZpZXdwb3J0U2l6ZSA8PSBmaXJzdEJyZWFrICl7XG4gICAgICAgIHRoaXNWaWV3cG9ydENvbnRlbnQgPSBhbGxWaWV3cG9ydHNDb250ZW50WzFdO1xuICAgIH1cblxuICAgIC8vbGFyZ2U7XG4gICAgZWxzZSBpZiggdGhpc1ZpZXdwb3J0U2l6ZSA+PSBmaXJzdEJyZWFrICYmIHRoaXNWaWV3cG9ydFNpemUgPD0gc2Vjb25kQnJlYWspIHtcbiAgICAgICAgdGhpc1ZpZXdwb3J0Q29udGVudCA9IGFsbFZpZXdwb3J0c0NvbnRlbnRbMl07XG4gICAgfVxuXG4gICAgLy94bGFyZ2VcbiAgICBlbHNle1xuICAgICAgICB0aGlzVmlld3BvcnRDb250ZW50ID0gYWxsVmlld3BvcnRzQ29udGVudFszXTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpc1ZpZXdwb3J0Q29udGVudDtcbn1cbiIsImZ1bmN0aW9uIGFwcGx5SXNvKCl7XHJcbiAgICB2YXIgcHJvamVjdHNJc28gPSBqUXVlcnkoJy5pc28tZ3JpZCcpLmlzb3RvcGUoe1xyXG4gICAgICAgIGl0ZW1TZWxlY3RvcjogJy5pc28tZ3JpZC1pdGVtJyxcclxuICAgICAgICByZXNpemFibGU6IHRydWUsIC8vIGRpc2FibGUgbm9ybWFsIHJlc2l6aW5nXHJcbiAgICAgICAgcGVyY2VudFBvc2l0aW9uOiB0cnVlLFxyXG5cclxuICAgICAgICBhbmltYXRpb25FbmdpbmU6ICdiZXN0LWF2YWlsYWJsZScsXHJcbiAgICAgICAgYW5pbWF0aW9uT3B0aW9uczoge1xyXG4gICAgICAgICAgICBkdXJhdGlvbjogMzAwMCxcclxuICAgICAgICAgICAgZWFzaW5nOiAnbGluZWFyJyxcclxuICAgICAgICAgICAgcXVldWU6IGZhbHNlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBsYXlvdXRNb2RlOiAnZml0Um93cycsXHJcbiAgICAgICAgbWFzb25yeTp7XHJcbiAgICAgICAgICAgIGNvbHVtbldpZHRoOiAgICAnaXNvLWdyaWQtaXRlbScsXHJcbiAgICAgICAgICAgIGlzQW5pbWF0ZWQ6ICAgICB0cnVlXHJcbiAgICAgICAgICAgIC8vaXNGaXRXaWR0aDogICAgIHRydWVcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG4iLCJcbmZ1bmN0aW9uIGxhenlMb2FkUmVzb3VyY2UoZmlsZSwgdHlwZSl7XG5cdHZhciBjYiA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBsaW5rO1xuICAgIGlmICh0eXBlID09PSBcImNzc1wiKXtcblx0XHRsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGluaycpOyBsaW5rLnJlbCA9ICdzdHlsZXNoZWV0Jztcblx0fVxuXHRlbHNlIGlmICh0eXBlID09PSBcImpzXCIpe1xuXHRcdGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTsgbGluay50eXBlID0gJ3RleHQvamF2YXNjcmlwdCc7XG5cdH1cblxuXHRsaW5rLmhyZWYgPSBmaWxlO1xuXHR2YXIgaCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF07IGgucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUobCwgaCk7XG5cdH07XG5cdHZhciByYWYgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHwgbW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG5cdHdlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSB8fCBtc1JlcXVlc3RBbmltYXRpb25GcmFtZTtcblx0aWYgKHJhZikgcmFmKGNiKTtcblx0ZWxzZSB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGNiKTtcbn1cbiIsIid1c2Ugc3RyaWN0Jztcbi8qanNoaW50IC1XMTE3ICovXG5cbmZ1bmN0aW9uIGxvYWQod2hlcmUsIHdoYXQpe1xuXHRjb25zb2xlLmxvZyhcIkxvYWRlZDogXCIgKyB3aGF0ICsgXCIgSU5UTyBcIiArIHdoZXJlKTtcblx0alF1ZXJ5KCB3aGVyZSApLmxvYWQoIHdoYXQsIGZ1bmN0aW9uKCkge1xuXHQgIGpRdWVyeSh3aW5kb3cpLnJlc2l6ZSgpO1xuXHQgIHdpbmRvdy5zY3JvbGxUbygwLDApO1xuXHR9KTtcbn0iLCJcclxuZnVuY3Rpb24gZG9SZWN1cnNpdmVseSh0aGlzRm4sIGludGVydmFsLCB0aW1lb3V0KSB7XHJcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcblx0ICAgIGludGVydmFsID0gaW50ZXJ2YWwgfHwgIDMwMDA7XHJcblx0ICAgIHRpbWVvdXQgPSAgdGltZW91dCAgfHwgMzAwMDA7XHJcblx0ICAgIHZhciBzdGFydFRpbWUgPSAobmV3IERhdGUoKSkuZ2V0VGltZSgpO1xyXG5cclxuXHJcblx0ICAgIChmdW5jdGlvbiByaW5jZVJlcGVhdCgpIHtcclxuXHQgICAgICAgIHZhciB0aGlzRm5SZXN1bHQgPSB0aGlzRm4oKTtcclxuXHJcblx0ICAgICAgICBpZiAoIChEYXRlLm5vdygpIC0gc3RhcnRUaW1lICkgPD0gdGltZW91dCApICB7XHJcblx0ICAgICAgICAgICAgc2V0VGltZW91dChyaW5jZVJlcGVhdCwgaW50ZXJ2YWwsIHRoaXNGblJlc3VsdCk7XHJcblx0ICAgICAgICB9XHJcblx0ICAgIH0pKCk7XHJcblxyXG4gICAgfSwgaW50ZXJ2YWwgKiAwLjc1KTtcclxufVxyXG4iLCJmdW5jdGlvbiByZXNldEhlaWdodHModGFyZ2V0KXtcclxuICAgIGpRdWVyeSh0YXJnZXQpLmNzcygnbWluLWhlaWdodCcsICdub25lJyk7XHJcbiAgICBqUXVlcnkodGFyZ2V0KS5jc3MoJ21heC1oZWlnaHQnLCAnbm9uZScpO1xyXG4gICAgalF1ZXJ5KHRhcmdldCkuY3NzKCdoZWlnaHQnLCAnYXV0bycpO1xyXG59XHJcblxyXG5mdW5jdGlvbiByZXNldFdpZHRocyh0YXJnZXQpe1xyXG4gICAgalF1ZXJ5KHRhcmdldCkuY3NzKCdtaW4td2lkdGgnLCAnbm9uZScpO1xyXG4gICAgalF1ZXJ5KHRhcmdldCkuY3NzKCdtYXgtd2lkdGgnLCAnbm9uZScpO1xyXG4gICAgalF1ZXJ5KHRhcmdldCkuY3NzKCd3aWR0aCcsICdhdXRvJyk7XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
