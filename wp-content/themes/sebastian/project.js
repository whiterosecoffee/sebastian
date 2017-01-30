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

    // /window.onresize = function () { setup() }; // to play nice with old IE

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

function newSwipeThumbs(target, slideSpeed){
    window.mySwipe = new Swipe(document.getElementById(target), {
        startSlide: 0,
        speed: 300,
        auto: slideSpeed,
        continuous: true
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
    var thumbs = thumbsContainer.find('.swipe-thumb');
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
        continuous: true
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2plY3QuanMiLCJ2ZWxjcm8uanMiLCJpc290b3BlLnBrZ2QubWluLmpzIiwibG9kYXNoLmNvcmUubWluLmpzIiwic3dpcGUuanMiLCIjZHJhZ2VuZEV4dHJhLmpzIiwiI3doZW5UaGVuLmpzIiwiYUludGVncmF0ZUJhY2suanMiLCJjb3JlRnJhbWV3b3JrLmpzIiwiY29yZUdldEpzb24uanMiLCJjb3JlSGVscGVycy5qcyIsImNvcmVWYW5pbGxhQXJyYXlzLmpzIiwiY29yZVZhbmlsbGFCb3hNb2RlbC5qcyIsImNvcmVWYW5pbGxhRG9tLmpzIiwiY29yZVZhbmlsbGFFdmVudHMuanMiLCJjb3JlVmFuaWxsYUhlbHBlcnMuanMiLCJjb3JlVmFuaWxsYUpzb24uanMiLCJjb3JlVmFuaWxsYVN0cmluZ3MuanMiLCJjb3JlVmFuaWxsYVN0eWxlcy5qcyIsIm1vZGFsc1Rlc3RpbmcuanMiLCJzd2lwZUhlbHBlcnMuanMiLCJzd2lwZVNsaWRlUGFuZWwuanMiLCJzd2lwZVRodW1ic1dyYXAuanMiLCJ0cm91Ymxlc2hvb3RpbmdFeGFtcGxlcy5qcyIsInZlbGNyb0FwcGx5SXNvLmpzIiwidmVsY3JvQnJlYWtQb2ludHMuanMiLCJ2ZWxjcm9GaWx0ZXJDb250ZW50LmpzIiwidmVsY3JvSXNvLmpzIiwidmVsY3JvTGF6eUxvYWQuanMiLCJ2ZWxjcm9Mb2FkLmpzIiwidmVsY3JvUmVjdXJzaXZlLmpzIiwidmVsY3JvUmVzZXRWYWx1ZXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDNUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDckhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN6akJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDOUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDckhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdklBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdEdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDNVBBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3RGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcEtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN6Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDNUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDL0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM1Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6InByb2plY3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKmpzaGludCAtVzExNyAqL1xuLypqc2hpbnQgLVcwODIgKi9cblxualF1ZXJ5KGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpe1xuXG5cblx0Ly9IT01FIFBBR0UgLSBEcmFnZW5kIEltYWdlIEdhbGxlcnlcblx0aWYgKCBqUXVlcnkoJ2h0bWwnKS5kYXRhKCdwYWdlLXNsdWcnKSA9PSAnaG9tZScgKXtcblxuICAgICAgICBqUXVlcnkod2luZG93KS5vbigncmVzaXplJywgaG9tZVJlc2l6ZSgpKTtcblxuXHRcdGZ1bmN0aW9uIGhvbWVSZXNpemUoKXtcblx0ICAgICAgICBjb25zb2xlLmxvZyhcInByb2plY3QuanMvaG9tZTpyZXNpemUgSDogXCIgKyB2aWV3SGVpZ2h0ICsgXCIgVzogXCIgKyB2aWV3V2lkdGgpO1xuXG5cdFx0fVxuXG5cdH0vL2hvbWUgcGFnZVxuXG5cdC8vUFJPSkVDVFMgUEFHRSAtIERyYWdlbmQgSW1hZ2UgR2FsbGVyeVxuXHRpZiAoIGpRdWVyeSgnaHRtbCcpLmRhdGEoJ3BhZ2Utc2x1ZycpID09ICdwcm9qZWN0cycgfHwgalF1ZXJ5KCdodG1sJykuZGF0YSgncGFnZS1zbHVnJykgPT0gJ3BvcnRmb2xpbycpe1xuXHRcdGpRdWVyeSh3aW5kb3cpLm9uKCdyZXNpemUnLCBwcm9qZWN0c1Jlc2l6ZSgpICk7XG5cdFx0alF1ZXJ5KHdpbmRvdykub24oJ3Jlc2l6ZScsIGFwcGx5SXNvKCkgKTtcblxuXHRcdGZ1bmN0aW9uIHByb2plY3RzUmVzaXplKCl7XG5cdFx0XHRjb25zb2xlLmxvZyhcInByb2plY3QuanMvcHJvamVjdHM6cmVzaXplIEg6IFwiICsgdmlld0hlaWdodCArIFwiIFc6IFwiICsgdmlld1dpZHRoKTtcblx0XHR9XG5cbiAgICAgICAgLy8gUG9ydGZvbGlvIE1hc29uYXJ5XG5cblx0fS8vcHJvamVjdHMgcGFnZVxuXG4gICAgLy9DT05UQUNUIFBBR0UgLVxuICAgIGlmICggalF1ZXJ5KCdodG1sJykuZGF0YSgncGFnZS1zbHVnJykgPT0gJ2NvbnRhY3QnKXtcbiAgICAgICAgLy9OZXcgRHJhZ2VuZCBDbGFzc1xuXHRcdGpRdWVyeShcIiNxdW90ZVJvdGF0b3JcIikuZHJhZ2VuZCh7fSk7XG5cbiAgICAgICAgLy9BdXRvUGxheSBRdW90ZXNcbiAgICAgICAgZG9SZWN1cnNpdmVseSggZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGlmIChtb3VzZURvd24gPT09IGZhbHNlKXtcbiAgICAgICAgICAgICAgICBhdXRvUGxheVNsaWRlcyhcIiNxdW90ZVJvdGF0b3JcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIDI3NTAsIDMzMDAwKTtcbiAgICB9Ly9jb250YWN0IHBhZ2Vcbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuLyoganNoaW50IC1XMDk3ICovXG4vKiBqc2hpbnQgLVcxMTcgKi9cblxuLy9TZXR0aW5nc1xudmFyIG1vYmlsZU5hdk9ubHkgXHRcdD0gdHJ1ZTtcbnZhciBwYWdlTG9hZGVyIFx0XHRcdD0gdHJ1ZTtcbnZhciBkZXZUZXN0aW5nIFx0XHRcdD0gZmFsc2U7XG52YXIgbW9iaWxlUG9ydHJhaXQgXHRcdD0gNDE0O1xudmFyIG1vYmlsZUxhbmRzY2FwZSBcdD0gNzY3O1xudmFyIHRhYmxldExhbmRzY2FwZSBcdD0gMTAyNDtcblxuLy9FbGVtZW50c1xudmFyIGh0bWwgXHRcdD0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xudmFyIGJvZHkgXHRcdD0gZG9jdW1lbnQuYm9keTtcbnZhciB3cmFwcGVyIFx0PSBnZXQoJ3dyYXBwZXInKTtcbnZhciBmb290ZXIgICAgICA9IGdldCgnZm9vdGVyJyk7XG52YXIgcGFnZUxvYWRlciAgPSBnZXQoJ3BhZ2VMb2FkZXInKTtcbnZhciBuYXZPcGVuQnRuICA9IGdldCgnbmF2T3BlbkJ0bicpO1xudmFyIG5hdkNsb3NlQnRuID0gZ2V0KCduYXZDbG9zZUJ0bicpO1xuXG52YXIgdmlld1dpZHRoIFx0PSB3aW5kb3cuaW5uZXJXaWR0aDtcbnZhciB2aWV3SGVpZ2h0IFx0PSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG52YXIgdmlld0FzcCBcdD0gKHdpbmRvdy5pbm5lcldpZHRoL3dpbmRvdy5pbm5lckhlaWdodCkudG9GaXhlZCgyKTtcbnZhciBkb2NXaWR0aCBcdD0gaHRtbC5jbGllbnRXaWR0aDtcbnZhciBkb2NIZWlnaHQgXHQ9IFwiXCI7XG52YXIgYnJlYWtQb2ludCAgPSBcIlwiO1xudmFyIGFzcFRleHQgXHQ9IFwiXCI7XG52YXIgZGV2aWNlVHlwZSBcdD0galF1ZXJ5KCdodG1sJykuZGF0YSgnZGV2aWNlLXR5cGUnKTtcblxuZnVuY3Rpb24gdmVsY3JvUmVhZHkoKXtcbiAgICBwYWdlTG9hZGVyLnN0eWxlID0gKFwidmlzaWJpbGl0eTogaGlkZGVuXCIpO1xuICAgIHJlbW92ZUNsYXNzKGh0bWwsIFwibm8tanNcIik7XG4gICAgYWRkQ2xhc3MoaHRtbCwgXCJqcy1yZWFkeVwiKTtcbiAgICB2ZWxjcm9SZXNpemUoKTtcbn1cblxuZnVuY3Rpb24gdmVsY3JvUmVzaXplKCl7XG4gICAgLy9SZXNldCBiYXNlIHZhbHVlc1xuXHRkb2NXaWR0aCBcdD0gaHRtbC5jbGllbnRXaWR0aDtcbiAgICBkb2NIZWlnaHQgXHQ9IGdldERvY0hlaWdodCgpO1xuXHR2aWV3V2lkdGggXHQ9IHdpbmRvdy5pbm5lcldpZHRoO1xuXHR2aWV3SGVpZ2h0IFx0PSB3aW5kb3cuaW5uZXJIZWlnaHQ7IC8vY29uc29sZS5sb2codmlld0hlaWdodCk7XG5cdHZpZXdBc3BcdFx0PSAoIHZpZXdXaWR0aCAvIHZpZXdIZWlnaHQgKS50b0ZpeGVkKDIpO1xuICAgIGJyZWFrUG9pbnQgXHQ9IGdldEJyZWFrcG9pbnQobW9iaWxlTGFuZHNjYXBlLCB0YWJsZXRMYW5kc2NhcGUpO1xuXHRhc3BUZXh0IFx0PSBnZXRPcmllbnRhdGlvbkNsYXNzKCk7XG5cbiAgICAvL0NoZWNrIGlmIHRoZSBtZW51IGNsYXNzIHNob3VsZCBjaGFuZ2VcbiAgICBuYXZDbGFzc2VzKCk7XG5cbiAgICAvL1NldCBtaW4taGVpZ2h0IHRvIHRoZSB2aWV3cG9ydFNpemUgb24gc3RydWN0dXJhbCBlbGVtZW50c1xuICAgIG1pbkhlaWdodCh3cmFwcGVyLCB2aWV3SGVpZ2h0KTtcbiAgICB2YXIgd3JhcEhlaWdodCA9IGdldEhlaWdodCh3cmFwcGVyKTtcbiAgICBtaW5IZWlnaHQoaHRtbCwgd3JhcEhlaWdodCk7XG4gICAgbWluSGVpZ2h0KGJvZHksIHdyYXBIZWlnaHQpO1xuXG4gICAgLy9TZXQgaGVpZ2h0IG9mIG1vYmlsZSBtZW51XG4gICAgLy9tZW51SGVpZ2h0KGRvY0hlaWdodCk7XG5cbiAgICAvL0FkanVzdCBmb290ZXIgcG9zc2l0aW9uIG9uIG1pc21hdGNoZWQgc2NyZWVuIC8gZG9jdW1lbnQgc2l6ZXNcbiAgICBmaXhUb0JvdHRvbShmb290ZXIpO1xuXG4gICAgLy9JZiBkZXZUZXN0aW5nIFRSVUUgaW5pdCB0ZXN0UGFuZWxcbiAgICBpZiAoZGV2VGVzdGluZyA9PT0gdHJ1ZSl7XG5cdFx0dGVzdFBhbmVsKCk7XG5cdH1cblxuXHQvL0xvZyBjdXJyZW50IGRldmljZSBpbmZvXG5cdGNvbnNvbGUubG9nKCd2ZWxjcm8uanMvdmVsY3JvUmVzaXplIGRIOicgKyBkb2NIZWlnaHQgKyAnIC0gdkg6JyArIHZpZXdIZWlnaHQgKyAgJyB4IHZXOicgKyB2aWV3V2lkdGggKyAnIEFzcDonICsgdmlld0FzcCArICcgJyArIGFzcFRleHQgKyAnICcgKyBkZXZpY2VUeXBlKTtcblxufS8vIGNvcmVSZXNpemVcblxuLy9GSVg6IHJlaW50ZWdyYXRlICdkZWJvdW5jZSBzdHlsZScgcHJvbWlzZXNcblxuLy9TY3JvbGwgTWVudVxualF1ZXJ5KHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uKCkge1xuICAgIHZhciBzY3JvbGxNZW51T2Zmc2V0ID0gNTA7XG4gICAgdmFyIHNjcm9sbE1lbnVUaW1lcjtcblx0aWYoc2Nyb2xsTWVudVRpbWVyKSB7XG5cdFx0d2luZG93LmNsZWFyVGltZW91dChzY3JvbGxNZW51VGltZXIpO1xuXHR9XG5cdHNjcm9sbE1lbnVUaW1lciA9IHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoalF1ZXJ5KHRoaXMpLnNjcm9sbFRvcCgpID4gc2Nyb2xsTWVudU9mZnNldCkge1xuICAgICAgICAgICAgalF1ZXJ5KGh0bWwpLmFkZENsYXNzKCdzY3JvbGxNZW51Jyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBqUXVlcnkoaHRtbCkucmVtb3ZlQ2xhc3MoJ3Njcm9sbE1lbnUnKTtcbiAgICAgICAgfVxuICAgIH0sIDEwMCk7XG59KTtcblxuLy9FdmVudCBMaXN0ZW5lcnNcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGZ1bmN0aW9uKCkge1xuICAgIHZlbGNyb1JlYWR5KCk7XG5cbiAgICAvL0ZJWDogdmFuaWxsYVxuICAgIGpRdWVyeSgnI25hdk9wZW5CdG4nKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgICAgYWRkTWVudU9wZW5DbGFzcygpO1xuICAgIH0pO1xuICAgIGpRdWVyeSgnI25hdkNsb3NlQnRuJykuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgIHJlbW92ZU1lbnVPcGVuQ2xhc3MoKTtcbiAgICB9KTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmVsY3JvUmVzaXplKCk7XG4gICAgfSk7XG5cbn0pO1xuXG4vL01vdXNlIEV2ZW50c1xudmFyIG1vdXNlRG93biA9IGZhbHNlO1xuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgZnVuY3Rpb24oKSB7XG4gICAgbW91c2VEb3duID0gdHJ1ZTtcbn0pO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgZnVuY3Rpb24oKSB7XG4gICAgbW91c2VEb3duID0gZmFsc2U7XG59KTtcbiIsIi8qIVxuICogSXNvdG9wZSBQQUNLQUdFRCB2My4wLjFcbiAqXG4gKiBMaWNlbnNlZCBHUEx2MyBmb3Igb3BlbiBzb3VyY2UgdXNlXG4gKiBvciBJc290b3BlIENvbW1lcmNpYWwgTGljZW5zZSBmb3IgY29tbWVyY2lhbCB1c2VcbiAqXG4gKiBodHRwOi8vaXNvdG9wZS5tZXRhZml6enkuY29cbiAqIENvcHlyaWdodCAyMDE2IE1ldGFmaXp6eVxuICovXG5cbiFmdW5jdGlvbih0LGUpe1widXNlIHN0cmljdFwiO1wiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZD9kZWZpbmUoXCJqcXVlcnktYnJpZGdldC9qcXVlcnktYnJpZGdldFwiLFtcImpxdWVyeVwiXSxmdW5jdGlvbihpKXtlKHQsaSl9KTpcIm9iamVjdFwiPT10eXBlb2YgbW9kdWxlJiZtb2R1bGUuZXhwb3J0cz9tb2R1bGUuZXhwb3J0cz1lKHQscmVxdWlyZShcImpxdWVyeVwiKSk6dC5qUXVlcnlCcmlkZ2V0PWUodCx0LmpRdWVyeSl9KHdpbmRvdyxmdW5jdGlvbih0LGUpe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIGkoaSxzLGEpe2Z1bmN0aW9uIHUodCxlLG4pe3ZhciBvLHM9XCIkKCkuXCIraSsnKFwiJytlKydcIiknO3JldHVybiB0LmVhY2goZnVuY3Rpb24odCx1KXt2YXIgaD1hLmRhdGEodSxpKTtpZighaClyZXR1cm4gdm9pZCByKGkrXCIgbm90IGluaXRpYWxpemVkLiBDYW5ub3QgY2FsbCBtZXRob2RzLCBpLmUuIFwiK3MpO3ZhciBkPWhbZV07aWYoIWR8fFwiX1wiPT1lLmNoYXJBdCgwKSlyZXR1cm4gdm9pZCByKHMrXCIgaXMgbm90IGEgdmFsaWQgbWV0aG9kXCIpO3ZhciBsPWQuYXBwbHkoaCxuKTtvPXZvaWQgMD09PW8/bDpvfSksdm9pZCAwIT09bz9vOnR9ZnVuY3Rpb24gaCh0LGUpe3QuZWFjaChmdW5jdGlvbih0LG4pe3ZhciBvPWEuZGF0YShuLGkpO28/KG8ub3B0aW9uKGUpLG8uX2luaXQoKSk6KG89bmV3IHMobixlKSxhLmRhdGEobixpLG8pKX0pfWE9YXx8ZXx8dC5qUXVlcnksYSYmKHMucHJvdG90eXBlLm9wdGlvbnx8KHMucHJvdG90eXBlLm9wdGlvbj1mdW5jdGlvbih0KXthLmlzUGxhaW5PYmplY3QodCkmJih0aGlzLm9wdGlvbnM9YS5leHRlbmQoITAsdGhpcy5vcHRpb25zLHQpKX0pLGEuZm5baV09ZnVuY3Rpb24odCl7aWYoXCJzdHJpbmdcIj09dHlwZW9mIHQpe3ZhciBlPW8uY2FsbChhcmd1bWVudHMsMSk7cmV0dXJuIHUodGhpcyx0LGUpfXJldHVybiBoKHRoaXMsdCksdGhpc30sbihhKSl9ZnVuY3Rpb24gbih0KXshdHx8dCYmdC5icmlkZ2V0fHwodC5icmlkZ2V0PWkpfXZhciBvPUFycmF5LnByb3RvdHlwZS5zbGljZSxzPXQuY29uc29sZSxyPVwidW5kZWZpbmVkXCI9PXR5cGVvZiBzP2Z1bmN0aW9uKCl7fTpmdW5jdGlvbih0KXtzLmVycm9yKHQpfTtyZXR1cm4gbihlfHx0LmpRdWVyeSksaX0pLGZ1bmN0aW9uKHQsZSl7XCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kP2RlZmluZShcImV2LWVtaXR0ZXIvZXYtZW1pdHRlclwiLGUpOlwib2JqZWN0XCI9PXR5cGVvZiBtb2R1bGUmJm1vZHVsZS5leHBvcnRzP21vZHVsZS5leHBvcnRzPWUoKTp0LkV2RW1pdHRlcj1lKCl9KFwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3c/d2luZG93OnRoaXMsZnVuY3Rpb24oKXtmdW5jdGlvbiB0KCl7fXZhciBlPXQucHJvdG90eXBlO3JldHVybiBlLm9uPWZ1bmN0aW9uKHQsZSl7aWYodCYmZSl7dmFyIGk9dGhpcy5fZXZlbnRzPXRoaXMuX2V2ZW50c3x8e30sbj1pW3RdPWlbdF18fFtdO3JldHVybi0xPT1uLmluZGV4T2YoZSkmJm4ucHVzaChlKSx0aGlzfX0sZS5vbmNlPWZ1bmN0aW9uKHQsZSl7aWYodCYmZSl7dGhpcy5vbih0LGUpO3ZhciBpPXRoaXMuX29uY2VFdmVudHM9dGhpcy5fb25jZUV2ZW50c3x8e30sbj1pW3RdPWlbdF18fHt9O3JldHVybiBuW2VdPSEwLHRoaXN9fSxlLm9mZj1mdW5jdGlvbih0LGUpe3ZhciBpPXRoaXMuX2V2ZW50cyYmdGhpcy5fZXZlbnRzW3RdO2lmKGkmJmkubGVuZ3RoKXt2YXIgbj1pLmluZGV4T2YoZSk7cmV0dXJuLTEhPW4mJmkuc3BsaWNlKG4sMSksdGhpc319LGUuZW1pdEV2ZW50PWZ1bmN0aW9uKHQsZSl7dmFyIGk9dGhpcy5fZXZlbnRzJiZ0aGlzLl9ldmVudHNbdF07aWYoaSYmaS5sZW5ndGgpe3ZhciBuPTAsbz1pW25dO2U9ZXx8W107Zm9yKHZhciBzPXRoaXMuX29uY2VFdmVudHMmJnRoaXMuX29uY2VFdmVudHNbdF07bzspe3ZhciByPXMmJnNbb107ciYmKHRoaXMub2ZmKHQsbyksZGVsZXRlIHNbb10pLG8uYXBwbHkodGhpcyxlKSxuKz1yPzA6MSxvPWlbbl19cmV0dXJuIHRoaXN9fSx0fSksZnVuY3Rpb24odCxlKXtcInVzZSBzdHJpY3RcIjtcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQ/ZGVmaW5lKFwiZ2V0LXNpemUvZ2V0LXNpemVcIixbXSxmdW5jdGlvbigpe3JldHVybiBlKCl9KTpcIm9iamVjdFwiPT10eXBlb2YgbW9kdWxlJiZtb2R1bGUuZXhwb3J0cz9tb2R1bGUuZXhwb3J0cz1lKCk6dC5nZXRTaXplPWUoKX0od2luZG93LGZ1bmN0aW9uKCl7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gdCh0KXt2YXIgZT1wYXJzZUZsb2F0KHQpLGk9LTE9PXQuaW5kZXhPZihcIiVcIikmJiFpc05hTihlKTtyZXR1cm4gaSYmZX1mdW5jdGlvbiBlKCl7fWZ1bmN0aW9uIGkoKXtmb3IodmFyIHQ9e3dpZHRoOjAsaGVpZ2h0OjAsaW5uZXJXaWR0aDowLGlubmVySGVpZ2h0OjAsb3V0ZXJXaWR0aDowLG91dGVySGVpZ2h0OjB9LGU9MDtoPmU7ZSsrKXt2YXIgaT11W2VdO3RbaV09MH1yZXR1cm4gdH1mdW5jdGlvbiBuKHQpe3ZhciBlPWdldENvbXB1dGVkU3R5bGUodCk7cmV0dXJuIGV8fGEoXCJTdHlsZSByZXR1cm5lZCBcIitlK1wiLiBBcmUgeW91IHJ1bm5pbmcgdGhpcyBjb2RlIGluIGEgaGlkZGVuIGlmcmFtZSBvbiBGaXJlZm94PyBTZWUgaHR0cDovL2JpdC5seS9nZXRzaXplYnVnMVwiKSxlfWZ1bmN0aW9uIG8oKXtpZighZCl7ZD0hMDt2YXIgZT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO2Uuc3R5bGUud2lkdGg9XCIyMDBweFwiLGUuc3R5bGUucGFkZGluZz1cIjFweCAycHggM3B4IDRweFwiLGUuc3R5bGUuYm9yZGVyU3R5bGU9XCJzb2xpZFwiLGUuc3R5bGUuYm9yZGVyV2lkdGg9XCIxcHggMnB4IDNweCA0cHhcIixlLnN0eWxlLmJveFNpemluZz1cImJvcmRlci1ib3hcIjt2YXIgaT1kb2N1bWVudC5ib2R5fHxkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7aS5hcHBlbmRDaGlsZChlKTt2YXIgbz1uKGUpO3MuaXNCb3hTaXplT3V0ZXI9cj0yMDA9PXQoby53aWR0aCksaS5yZW1vdmVDaGlsZChlKX19ZnVuY3Rpb24gcyhlKXtpZihvKCksXCJzdHJpbmdcIj09dHlwZW9mIGUmJihlPWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZSkpLGUmJlwib2JqZWN0XCI9PXR5cGVvZiBlJiZlLm5vZGVUeXBlKXt2YXIgcz1uKGUpO2lmKFwibm9uZVwiPT1zLmRpc3BsYXkpcmV0dXJuIGkoKTt2YXIgYT17fTthLndpZHRoPWUub2Zmc2V0V2lkdGgsYS5oZWlnaHQ9ZS5vZmZzZXRIZWlnaHQ7Zm9yKHZhciBkPWEuaXNCb3JkZXJCb3g9XCJib3JkZXItYm94XCI9PXMuYm94U2l6aW5nLGw9MDtoPmw7bCsrKXt2YXIgZj11W2xdLGM9c1tmXSxtPXBhcnNlRmxvYXQoYyk7YVtmXT1pc05hTihtKT8wOm19dmFyIHA9YS5wYWRkaW5nTGVmdCthLnBhZGRpbmdSaWdodCx5PWEucGFkZGluZ1RvcCthLnBhZGRpbmdCb3R0b20sZz1hLm1hcmdpbkxlZnQrYS5tYXJnaW5SaWdodCx2PWEubWFyZ2luVG9wK2EubWFyZ2luQm90dG9tLF89YS5ib3JkZXJMZWZ0V2lkdGgrYS5ib3JkZXJSaWdodFdpZHRoLEk9YS5ib3JkZXJUb3BXaWR0aCthLmJvcmRlckJvdHRvbVdpZHRoLHo9ZCYmcix4PXQocy53aWR0aCk7eCE9PSExJiYoYS53aWR0aD14Kyh6PzA6cCtfKSk7dmFyIFM9dChzLmhlaWdodCk7cmV0dXJuIFMhPT0hMSYmKGEuaGVpZ2h0PVMrKHo/MDp5K0kpKSxhLmlubmVyV2lkdGg9YS53aWR0aC0ocCtfKSxhLmlubmVySGVpZ2h0PWEuaGVpZ2h0LSh5K0kpLGEub3V0ZXJXaWR0aD1hLndpZHRoK2csYS5vdXRlckhlaWdodD1hLmhlaWdodCt2LGF9fXZhciByLGE9XCJ1bmRlZmluZWRcIj09dHlwZW9mIGNvbnNvbGU/ZTpmdW5jdGlvbih0KXtjb25zb2xlLmVycm9yKHQpfSx1PVtcInBhZGRpbmdMZWZ0XCIsXCJwYWRkaW5nUmlnaHRcIixcInBhZGRpbmdUb3BcIixcInBhZGRpbmdCb3R0b21cIixcIm1hcmdpbkxlZnRcIixcIm1hcmdpblJpZ2h0XCIsXCJtYXJnaW5Ub3BcIixcIm1hcmdpbkJvdHRvbVwiLFwiYm9yZGVyTGVmdFdpZHRoXCIsXCJib3JkZXJSaWdodFdpZHRoXCIsXCJib3JkZXJUb3BXaWR0aFwiLFwiYm9yZGVyQm90dG9tV2lkdGhcIl0saD11Lmxlbmd0aCxkPSExO3JldHVybiBzfSksZnVuY3Rpb24odCxlKXtcInVzZSBzdHJpY3RcIjtcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQ/ZGVmaW5lKFwiZGVzYW5kcm8tbWF0Y2hlcy1zZWxlY3Rvci9tYXRjaGVzLXNlbGVjdG9yXCIsZSk6XCJvYmplY3RcIj09dHlwZW9mIG1vZHVsZSYmbW9kdWxlLmV4cG9ydHM/bW9kdWxlLmV4cG9ydHM9ZSgpOnQubWF0Y2hlc1NlbGVjdG9yPWUoKX0od2luZG93LGZ1bmN0aW9uKCl7XCJ1c2Ugc3RyaWN0XCI7dmFyIHQ9ZnVuY3Rpb24oKXt2YXIgdD1FbGVtZW50LnByb3RvdHlwZTtpZih0Lm1hdGNoZXMpcmV0dXJuXCJtYXRjaGVzXCI7aWYodC5tYXRjaGVzU2VsZWN0b3IpcmV0dXJuXCJtYXRjaGVzU2VsZWN0b3JcIjtmb3IodmFyIGU9W1wid2Via2l0XCIsXCJtb3pcIixcIm1zXCIsXCJvXCJdLGk9MDtpPGUubGVuZ3RoO2krKyl7dmFyIG49ZVtpXSxvPW4rXCJNYXRjaGVzU2VsZWN0b3JcIjtpZih0W29dKXJldHVybiBvfX0oKTtyZXR1cm4gZnVuY3Rpb24oZSxpKXtyZXR1cm4gZVt0XShpKX19KSxmdW5jdGlvbih0LGUpe1wiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZD9kZWZpbmUoXCJmaXp6eS11aS11dGlscy91dGlsc1wiLFtcImRlc2FuZHJvLW1hdGNoZXMtc2VsZWN0b3IvbWF0Y2hlcy1zZWxlY3RvclwiXSxmdW5jdGlvbihpKXtyZXR1cm4gZSh0LGkpfSk6XCJvYmplY3RcIj09dHlwZW9mIG1vZHVsZSYmbW9kdWxlLmV4cG9ydHM/bW9kdWxlLmV4cG9ydHM9ZSh0LHJlcXVpcmUoXCJkZXNhbmRyby1tYXRjaGVzLXNlbGVjdG9yXCIpKTp0LmZpenp5VUlVdGlscz1lKHQsdC5tYXRjaGVzU2VsZWN0b3IpfSh3aW5kb3csZnVuY3Rpb24odCxlKXt2YXIgaT17fTtpLmV4dGVuZD1mdW5jdGlvbih0LGUpe2Zvcih2YXIgaSBpbiBlKXRbaV09ZVtpXTtyZXR1cm4gdH0saS5tb2R1bG89ZnVuY3Rpb24odCxlKXtyZXR1cm4odCVlK2UpJWV9LGkubWFrZUFycmF5PWZ1bmN0aW9uKHQpe3ZhciBlPVtdO2lmKEFycmF5LmlzQXJyYXkodCkpZT10O2Vsc2UgaWYodCYmXCJudW1iZXJcIj09dHlwZW9mIHQubGVuZ3RoKWZvcih2YXIgaT0wO2k8dC5sZW5ndGg7aSsrKWUucHVzaCh0W2ldKTtlbHNlIGUucHVzaCh0KTtyZXR1cm4gZX0saS5yZW1vdmVGcm9tPWZ1bmN0aW9uKHQsZSl7dmFyIGk9dC5pbmRleE9mKGUpOy0xIT1pJiZ0LnNwbGljZShpLDEpfSxpLmdldFBhcmVudD1mdW5jdGlvbih0LGkpe2Zvcig7dCE9ZG9jdW1lbnQuYm9keTspaWYodD10LnBhcmVudE5vZGUsZSh0LGkpKXJldHVybiB0fSxpLmdldFF1ZXJ5RWxlbWVudD1mdW5jdGlvbih0KXtyZXR1cm5cInN0cmluZ1wiPT10eXBlb2YgdD9kb2N1bWVudC5xdWVyeVNlbGVjdG9yKHQpOnR9LGkuaGFuZGxlRXZlbnQ9ZnVuY3Rpb24odCl7dmFyIGU9XCJvblwiK3QudHlwZTt0aGlzW2VdJiZ0aGlzW2VdKHQpfSxpLmZpbHRlckZpbmRFbGVtZW50cz1mdW5jdGlvbih0LG4pe3Q9aS5tYWtlQXJyYXkodCk7dmFyIG89W107cmV0dXJuIHQuZm9yRWFjaChmdW5jdGlvbih0KXtpZih0IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpe2lmKCFuKXJldHVybiB2b2lkIG8ucHVzaCh0KTtlKHQsbikmJm8ucHVzaCh0KTtmb3IodmFyIGk9dC5xdWVyeVNlbGVjdG9yQWxsKG4pLHM9MDtzPGkubGVuZ3RoO3MrKylvLnB1c2goaVtzXSl9fSksb30saS5kZWJvdW5jZU1ldGhvZD1mdW5jdGlvbih0LGUsaSl7dmFyIG49dC5wcm90b3R5cGVbZV0sbz1lK1wiVGltZW91dFwiO3QucHJvdG90eXBlW2VdPWZ1bmN0aW9uKCl7dmFyIHQ9dGhpc1tvXTt0JiZjbGVhclRpbWVvdXQodCk7dmFyIGU9YXJndW1lbnRzLHM9dGhpczt0aGlzW29dPXNldFRpbWVvdXQoZnVuY3Rpb24oKXtuLmFwcGx5KHMsZSksZGVsZXRlIHNbb119LGl8fDEwMCl9fSxpLmRvY1JlYWR5PWZ1bmN0aW9uKHQpe3ZhciBlPWRvY3VtZW50LnJlYWR5U3RhdGU7XCJjb21wbGV0ZVwiPT1lfHxcImludGVyYWN0aXZlXCI9PWU/dCgpOmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsdCl9LGkudG9EYXNoZWQ9ZnVuY3Rpb24odCl7cmV0dXJuIHQucmVwbGFjZSgvKC4pKFtBLVpdKS9nLGZ1bmN0aW9uKHQsZSxpKXtyZXR1cm4gZStcIi1cIitpfSkudG9Mb3dlckNhc2UoKX07dmFyIG49dC5jb25zb2xlO3JldHVybiBpLmh0bWxJbml0PWZ1bmN0aW9uKGUsbyl7aS5kb2NSZWFkeShmdW5jdGlvbigpe3ZhciBzPWkudG9EYXNoZWQobykscj1cImRhdGEtXCIrcyxhPWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJbXCIrcitcIl1cIiksdT1kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmpzLVwiK3MpLGg9aS5tYWtlQXJyYXkoYSkuY29uY2F0KGkubWFrZUFycmF5KHUpKSxkPXIrXCItb3B0aW9uc1wiLGw9dC5qUXVlcnk7aC5mb3JFYWNoKGZ1bmN0aW9uKHQpe3ZhciBpLHM9dC5nZXRBdHRyaWJ1dGUocil8fHQuZ2V0QXR0cmlidXRlKGQpO3RyeXtpPXMmJkpTT04ucGFyc2Uocyl9Y2F0Y2goYSl7cmV0dXJuIHZvaWQobiYmbi5lcnJvcihcIkVycm9yIHBhcnNpbmcgXCIrcitcIiBvbiBcIit0LmNsYXNzTmFtZStcIjogXCIrYSkpfXZhciB1PW5ldyBlKHQsaSk7bCYmbC5kYXRhKHQsbyx1KX0pfSl9LGl9KSxmdW5jdGlvbih0LGUpe1wiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZD9kZWZpbmUoXCJvdXRsYXllci9pdGVtXCIsW1wiZXYtZW1pdHRlci9ldi1lbWl0dGVyXCIsXCJnZXQtc2l6ZS9nZXQtc2l6ZVwiXSxlKTpcIm9iamVjdFwiPT10eXBlb2YgbW9kdWxlJiZtb2R1bGUuZXhwb3J0cz9tb2R1bGUuZXhwb3J0cz1lKHJlcXVpcmUoXCJldi1lbWl0dGVyXCIpLHJlcXVpcmUoXCJnZXQtc2l6ZVwiKSk6KHQuT3V0bGF5ZXI9e30sdC5PdXRsYXllci5JdGVtPWUodC5FdkVtaXR0ZXIsdC5nZXRTaXplKSl9KHdpbmRvdyxmdW5jdGlvbih0LGUpe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIGkodCl7Zm9yKHZhciBlIGluIHQpcmV0dXJuITE7cmV0dXJuIGU9bnVsbCwhMH1mdW5jdGlvbiBuKHQsZSl7dCYmKHRoaXMuZWxlbWVudD10LHRoaXMubGF5b3V0PWUsdGhpcy5wb3NpdGlvbj17eDowLHk6MH0sdGhpcy5fY3JlYXRlKCkpfWZ1bmN0aW9uIG8odCl7cmV0dXJuIHQucmVwbGFjZSgvKFtBLVpdKS9nLGZ1bmN0aW9uKHQpe3JldHVyblwiLVwiK3QudG9Mb3dlckNhc2UoKX0pfXZhciBzPWRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZSxyPVwic3RyaW5nXCI9PXR5cGVvZiBzLnRyYW5zaXRpb24/XCJ0cmFuc2l0aW9uXCI6XCJXZWJraXRUcmFuc2l0aW9uXCIsYT1cInN0cmluZ1wiPT10eXBlb2Ygcy50cmFuc2Zvcm0/XCJ0cmFuc2Zvcm1cIjpcIldlYmtpdFRyYW5zZm9ybVwiLHU9e1dlYmtpdFRyYW5zaXRpb246XCJ3ZWJraXRUcmFuc2l0aW9uRW5kXCIsdHJhbnNpdGlvbjpcInRyYW5zaXRpb25lbmRcIn1bcl0saD17dHJhbnNmb3JtOmEsdHJhbnNpdGlvbjpyLHRyYW5zaXRpb25EdXJhdGlvbjpyK1wiRHVyYXRpb25cIix0cmFuc2l0aW9uUHJvcGVydHk6citcIlByb3BlcnR5XCIsdHJhbnNpdGlvbkRlbGF5OnIrXCJEZWxheVwifSxkPW4ucHJvdG90eXBlPU9iamVjdC5jcmVhdGUodC5wcm90b3R5cGUpO2QuY29uc3RydWN0b3I9bixkLl9jcmVhdGU9ZnVuY3Rpb24oKXt0aGlzLl90cmFuc249e2luZ1Byb3BlcnRpZXM6e30sY2xlYW46e30sb25FbmQ6e319LHRoaXMuY3NzKHtwb3NpdGlvbjpcImFic29sdXRlXCJ9KX0sZC5oYW5kbGVFdmVudD1mdW5jdGlvbih0KXt2YXIgZT1cIm9uXCIrdC50eXBlO3RoaXNbZV0mJnRoaXNbZV0odCl9LGQuZ2V0U2l6ZT1mdW5jdGlvbigpe3RoaXMuc2l6ZT1lKHRoaXMuZWxlbWVudCl9LGQuY3NzPWZ1bmN0aW9uKHQpe3ZhciBlPXRoaXMuZWxlbWVudC5zdHlsZTtmb3IodmFyIGkgaW4gdCl7dmFyIG49aFtpXXx8aTtlW25dPXRbaV19fSxkLmdldFBvc2l0aW9uPWZ1bmN0aW9uKCl7dmFyIHQ9Z2V0Q29tcHV0ZWRTdHlsZSh0aGlzLmVsZW1lbnQpLGU9dGhpcy5sYXlvdXQuX2dldE9wdGlvbihcIm9yaWdpbkxlZnRcIiksaT10aGlzLmxheW91dC5fZ2V0T3B0aW9uKFwib3JpZ2luVG9wXCIpLG49dFtlP1wibGVmdFwiOlwicmlnaHRcIl0sbz10W2k/XCJ0b3BcIjpcImJvdHRvbVwiXSxzPXRoaXMubGF5b3V0LnNpemUscj0tMSE9bi5pbmRleE9mKFwiJVwiKT9wYXJzZUZsb2F0KG4pLzEwMCpzLndpZHRoOnBhcnNlSW50KG4sMTApLGE9LTEhPW8uaW5kZXhPZihcIiVcIik/cGFyc2VGbG9hdChvKS8xMDAqcy5oZWlnaHQ6cGFyc2VJbnQobywxMCk7cj1pc05hTihyKT8wOnIsYT1pc05hTihhKT8wOmEsci09ZT9zLnBhZGRpbmdMZWZ0OnMucGFkZGluZ1JpZ2h0LGEtPWk/cy5wYWRkaW5nVG9wOnMucGFkZGluZ0JvdHRvbSx0aGlzLnBvc2l0aW9uLng9cix0aGlzLnBvc2l0aW9uLnk9YX0sZC5sYXlvdXRQb3NpdGlvbj1mdW5jdGlvbigpe3ZhciB0PXRoaXMubGF5b3V0LnNpemUsZT17fSxpPXRoaXMubGF5b3V0Ll9nZXRPcHRpb24oXCJvcmlnaW5MZWZ0XCIpLG49dGhpcy5sYXlvdXQuX2dldE9wdGlvbihcIm9yaWdpblRvcFwiKSxvPWk/XCJwYWRkaW5nTGVmdFwiOlwicGFkZGluZ1JpZ2h0XCIscz1pP1wibGVmdFwiOlwicmlnaHRcIixyPWk/XCJyaWdodFwiOlwibGVmdFwiLGE9dGhpcy5wb3NpdGlvbi54K3Rbb107ZVtzXT10aGlzLmdldFhWYWx1ZShhKSxlW3JdPVwiXCI7dmFyIHU9bj9cInBhZGRpbmdUb3BcIjpcInBhZGRpbmdCb3R0b21cIixoPW4/XCJ0b3BcIjpcImJvdHRvbVwiLGQ9bj9cImJvdHRvbVwiOlwidG9wXCIsbD10aGlzLnBvc2l0aW9uLnkrdFt1XTtlW2hdPXRoaXMuZ2V0WVZhbHVlKGwpLGVbZF09XCJcIix0aGlzLmNzcyhlKSx0aGlzLmVtaXRFdmVudChcImxheW91dFwiLFt0aGlzXSl9LGQuZ2V0WFZhbHVlPWZ1bmN0aW9uKHQpe3ZhciBlPXRoaXMubGF5b3V0Ll9nZXRPcHRpb24oXCJob3Jpem9udGFsXCIpO3JldHVybiB0aGlzLmxheW91dC5vcHRpb25zLnBlcmNlbnRQb3NpdGlvbiYmIWU/dC90aGlzLmxheW91dC5zaXplLndpZHRoKjEwMCtcIiVcIjp0K1wicHhcIn0sZC5nZXRZVmFsdWU9ZnVuY3Rpb24odCl7dmFyIGU9dGhpcy5sYXlvdXQuX2dldE9wdGlvbihcImhvcml6b250YWxcIik7cmV0dXJuIHRoaXMubGF5b3V0Lm9wdGlvbnMucGVyY2VudFBvc2l0aW9uJiZlP3QvdGhpcy5sYXlvdXQuc2l6ZS5oZWlnaHQqMTAwK1wiJVwiOnQrXCJweFwifSxkLl90cmFuc2l0aW9uVG89ZnVuY3Rpb24odCxlKXt0aGlzLmdldFBvc2l0aW9uKCk7dmFyIGk9dGhpcy5wb3NpdGlvbi54LG49dGhpcy5wb3NpdGlvbi55LG89cGFyc2VJbnQodCwxMCkscz1wYXJzZUludChlLDEwKSxyPW89PT10aGlzLnBvc2l0aW9uLngmJnM9PT10aGlzLnBvc2l0aW9uLnk7aWYodGhpcy5zZXRQb3NpdGlvbih0LGUpLHImJiF0aGlzLmlzVHJhbnNpdGlvbmluZylyZXR1cm4gdm9pZCB0aGlzLmxheW91dFBvc2l0aW9uKCk7dmFyIGE9dC1pLHU9ZS1uLGg9e307aC50cmFuc2Zvcm09dGhpcy5nZXRUcmFuc2xhdGUoYSx1KSx0aGlzLnRyYW5zaXRpb24oe3RvOmgsb25UcmFuc2l0aW9uRW5kOnt0cmFuc2Zvcm06dGhpcy5sYXlvdXRQb3NpdGlvbn0saXNDbGVhbmluZzohMH0pfSxkLmdldFRyYW5zbGF0ZT1mdW5jdGlvbih0LGUpe3ZhciBpPXRoaXMubGF5b3V0Ll9nZXRPcHRpb24oXCJvcmlnaW5MZWZ0XCIpLG49dGhpcy5sYXlvdXQuX2dldE9wdGlvbihcIm9yaWdpblRvcFwiKTtyZXR1cm4gdD1pP3Q6LXQsZT1uP2U6LWUsXCJ0cmFuc2xhdGUzZChcIit0K1wicHgsIFwiK2UrXCJweCwgMClcIn0sZC5nb1RvPWZ1bmN0aW9uKHQsZSl7dGhpcy5zZXRQb3NpdGlvbih0LGUpLHRoaXMubGF5b3V0UG9zaXRpb24oKX0sZC5tb3ZlVG89ZC5fdHJhbnNpdGlvblRvLGQuc2V0UG9zaXRpb249ZnVuY3Rpb24odCxlKXt0aGlzLnBvc2l0aW9uLng9cGFyc2VJbnQodCwxMCksdGhpcy5wb3NpdGlvbi55PXBhcnNlSW50KGUsMTApfSxkLl9ub25UcmFuc2l0aW9uPWZ1bmN0aW9uKHQpe3RoaXMuY3NzKHQudG8pLHQuaXNDbGVhbmluZyYmdGhpcy5fcmVtb3ZlU3R5bGVzKHQudG8pO2Zvcih2YXIgZSBpbiB0Lm9uVHJhbnNpdGlvbkVuZCl0Lm9uVHJhbnNpdGlvbkVuZFtlXS5jYWxsKHRoaXMpfSxkLnRyYW5zaXRpb249ZnVuY3Rpb24odCl7aWYoIXBhcnNlRmxvYXQodGhpcy5sYXlvdXQub3B0aW9ucy50cmFuc2l0aW9uRHVyYXRpb24pKXJldHVybiB2b2lkIHRoaXMuX25vblRyYW5zaXRpb24odCk7dmFyIGU9dGhpcy5fdHJhbnNuO2Zvcih2YXIgaSBpbiB0Lm9uVHJhbnNpdGlvbkVuZCllLm9uRW5kW2ldPXQub25UcmFuc2l0aW9uRW5kW2ldO2ZvcihpIGluIHQudG8pZS5pbmdQcm9wZXJ0aWVzW2ldPSEwLHQuaXNDbGVhbmluZyYmKGUuY2xlYW5baV09ITApO2lmKHQuZnJvbSl7dGhpcy5jc3ModC5mcm9tKTt2YXIgbj10aGlzLmVsZW1lbnQub2Zmc2V0SGVpZ2h0O249bnVsbH10aGlzLmVuYWJsZVRyYW5zaXRpb24odC50byksdGhpcy5jc3ModC50byksdGhpcy5pc1RyYW5zaXRpb25pbmc9ITB9O3ZhciBsPVwib3BhY2l0eSxcIitvKGEpO2QuZW5hYmxlVHJhbnNpdGlvbj1mdW5jdGlvbigpe2lmKCF0aGlzLmlzVHJhbnNpdGlvbmluZyl7dmFyIHQ9dGhpcy5sYXlvdXQub3B0aW9ucy50cmFuc2l0aW9uRHVyYXRpb247dD1cIm51bWJlclwiPT10eXBlb2YgdD90K1wibXNcIjp0LHRoaXMuY3NzKHt0cmFuc2l0aW9uUHJvcGVydHk6bCx0cmFuc2l0aW9uRHVyYXRpb246dCx0cmFuc2l0aW9uRGVsYXk6dGhpcy5zdGFnZ2VyRGVsYXl8fDB9KSx0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcih1LHRoaXMsITEpfX0sZC5vbndlYmtpdFRyYW5zaXRpb25FbmQ9ZnVuY3Rpb24odCl7dGhpcy5vbnRyYW5zaXRpb25lbmQodCl9LGQub25vdHJhbnNpdGlvbmVuZD1mdW5jdGlvbih0KXt0aGlzLm9udHJhbnNpdGlvbmVuZCh0KX07dmFyIGY9e1wiLXdlYmtpdC10cmFuc2Zvcm1cIjpcInRyYW5zZm9ybVwifTtkLm9udHJhbnNpdGlvbmVuZD1mdW5jdGlvbih0KXtpZih0LnRhcmdldD09PXRoaXMuZWxlbWVudCl7dmFyIGU9dGhpcy5fdHJhbnNuLG49Zlt0LnByb3BlcnR5TmFtZV18fHQucHJvcGVydHlOYW1lO2lmKGRlbGV0ZSBlLmluZ1Byb3BlcnRpZXNbbl0saShlLmluZ1Byb3BlcnRpZXMpJiZ0aGlzLmRpc2FibGVUcmFuc2l0aW9uKCksbiBpbiBlLmNsZWFuJiYodGhpcy5lbGVtZW50LnN0eWxlW3QucHJvcGVydHlOYW1lXT1cIlwiLGRlbGV0ZSBlLmNsZWFuW25dKSxuIGluIGUub25FbmQpe3ZhciBvPWUub25FbmRbbl07by5jYWxsKHRoaXMpLGRlbGV0ZSBlLm9uRW5kW25dfXRoaXMuZW1pdEV2ZW50KFwidHJhbnNpdGlvbkVuZFwiLFt0aGlzXSl9fSxkLmRpc2FibGVUcmFuc2l0aW9uPWZ1bmN0aW9uKCl7dGhpcy5yZW1vdmVUcmFuc2l0aW9uU3R5bGVzKCksdGhpcy5lbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIodSx0aGlzLCExKSx0aGlzLmlzVHJhbnNpdGlvbmluZz0hMX0sZC5fcmVtb3ZlU3R5bGVzPWZ1bmN0aW9uKHQpe3ZhciBlPXt9O2Zvcih2YXIgaSBpbiB0KWVbaV09XCJcIjt0aGlzLmNzcyhlKX07dmFyIGM9e3RyYW5zaXRpb25Qcm9wZXJ0eTpcIlwiLHRyYW5zaXRpb25EdXJhdGlvbjpcIlwiLHRyYW5zaXRpb25EZWxheTpcIlwifTtyZXR1cm4gZC5yZW1vdmVUcmFuc2l0aW9uU3R5bGVzPWZ1bmN0aW9uKCl7dGhpcy5jc3MoYyl9LGQuc3RhZ2dlcj1mdW5jdGlvbih0KXt0PWlzTmFOKHQpPzA6dCx0aGlzLnN0YWdnZXJEZWxheT10K1wibXNcIn0sZC5yZW1vdmVFbGVtPWZ1bmN0aW9uKCl7dGhpcy5lbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5lbGVtZW50KSx0aGlzLmNzcyh7ZGlzcGxheTpcIlwifSksdGhpcy5lbWl0RXZlbnQoXCJyZW1vdmVcIixbdGhpc10pfSxkLnJlbW92ZT1mdW5jdGlvbigpe3JldHVybiByJiZwYXJzZUZsb2F0KHRoaXMubGF5b3V0Lm9wdGlvbnMudHJhbnNpdGlvbkR1cmF0aW9uKT8odGhpcy5vbmNlKFwidHJhbnNpdGlvbkVuZFwiLGZ1bmN0aW9uKCl7dGhpcy5yZW1vdmVFbGVtKCl9KSx2b2lkIHRoaXMuaGlkZSgpKTp2b2lkIHRoaXMucmVtb3ZlRWxlbSgpfSxkLnJldmVhbD1mdW5jdGlvbigpe2RlbGV0ZSB0aGlzLmlzSGlkZGVuLHRoaXMuY3NzKHtkaXNwbGF5OlwiXCJ9KTt2YXIgdD10aGlzLmxheW91dC5vcHRpb25zLGU9e30saT10aGlzLmdldEhpZGVSZXZlYWxUcmFuc2l0aW9uRW5kUHJvcGVydHkoXCJ2aXNpYmxlU3R5bGVcIik7ZVtpXT10aGlzLm9uUmV2ZWFsVHJhbnNpdGlvbkVuZCx0aGlzLnRyYW5zaXRpb24oe2Zyb206dC5oaWRkZW5TdHlsZSx0bzp0LnZpc2libGVTdHlsZSxpc0NsZWFuaW5nOiEwLG9uVHJhbnNpdGlvbkVuZDplfSl9LGQub25SZXZlYWxUcmFuc2l0aW9uRW5kPWZ1bmN0aW9uKCl7dGhpcy5pc0hpZGRlbnx8dGhpcy5lbWl0RXZlbnQoXCJyZXZlYWxcIil9LGQuZ2V0SGlkZVJldmVhbFRyYW5zaXRpb25FbmRQcm9wZXJ0eT1mdW5jdGlvbih0KXt2YXIgZT10aGlzLmxheW91dC5vcHRpb25zW3RdO2lmKGUub3BhY2l0eSlyZXR1cm5cIm9wYWNpdHlcIjtmb3IodmFyIGkgaW4gZSlyZXR1cm4gaX0sZC5oaWRlPWZ1bmN0aW9uKCl7dGhpcy5pc0hpZGRlbj0hMCx0aGlzLmNzcyh7ZGlzcGxheTpcIlwifSk7dmFyIHQ9dGhpcy5sYXlvdXQub3B0aW9ucyxlPXt9LGk9dGhpcy5nZXRIaWRlUmV2ZWFsVHJhbnNpdGlvbkVuZFByb3BlcnR5KFwiaGlkZGVuU3R5bGVcIik7ZVtpXT10aGlzLm9uSGlkZVRyYW5zaXRpb25FbmQsdGhpcy50cmFuc2l0aW9uKHtmcm9tOnQudmlzaWJsZVN0eWxlLHRvOnQuaGlkZGVuU3R5bGUsaXNDbGVhbmluZzohMCxvblRyYW5zaXRpb25FbmQ6ZX0pfSxkLm9uSGlkZVRyYW5zaXRpb25FbmQ9ZnVuY3Rpb24oKXt0aGlzLmlzSGlkZGVuJiYodGhpcy5jc3Moe2Rpc3BsYXk6XCJub25lXCJ9KSx0aGlzLmVtaXRFdmVudChcImhpZGVcIikpfSxkLmRlc3Ryb3k9ZnVuY3Rpb24oKXt0aGlzLmNzcyh7cG9zaXRpb246XCJcIixsZWZ0OlwiXCIscmlnaHQ6XCJcIix0b3A6XCJcIixib3R0b206XCJcIix0cmFuc2l0aW9uOlwiXCIsdHJhbnNmb3JtOlwiXCJ9KX0sbn0pLGZ1bmN0aW9uKHQsZSl7XCJ1c2Ugc3RyaWN0XCI7XCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kP2RlZmluZShcIm91dGxheWVyL291dGxheWVyXCIsW1wiZXYtZW1pdHRlci9ldi1lbWl0dGVyXCIsXCJnZXQtc2l6ZS9nZXQtc2l6ZVwiLFwiZml6enktdWktdXRpbHMvdXRpbHNcIixcIi4vaXRlbVwiXSxmdW5jdGlvbihpLG4sbyxzKXtyZXR1cm4gZSh0LGksbixvLHMpfSk6XCJvYmplY3RcIj09dHlwZW9mIG1vZHVsZSYmbW9kdWxlLmV4cG9ydHM/bW9kdWxlLmV4cG9ydHM9ZSh0LHJlcXVpcmUoXCJldi1lbWl0dGVyXCIpLHJlcXVpcmUoXCJnZXQtc2l6ZVwiKSxyZXF1aXJlKFwiZml6enktdWktdXRpbHNcIikscmVxdWlyZShcIi4vaXRlbVwiKSk6dC5PdXRsYXllcj1lKHQsdC5FdkVtaXR0ZXIsdC5nZXRTaXplLHQuZml6enlVSVV0aWxzLHQuT3V0bGF5ZXIuSXRlbSl9KHdpbmRvdyxmdW5jdGlvbih0LGUsaSxuLG8pe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIHModCxlKXt2YXIgaT1uLmdldFF1ZXJ5RWxlbWVudCh0KTtpZighaSlyZXR1cm4gdm9pZCh1JiZ1LmVycm9yKFwiQmFkIGVsZW1lbnQgZm9yIFwiK3RoaXMuY29uc3RydWN0b3IubmFtZXNwYWNlK1wiOiBcIisoaXx8dCkpKTt0aGlzLmVsZW1lbnQ9aSxoJiYodGhpcy4kZWxlbWVudD1oKHRoaXMuZWxlbWVudCkpLHRoaXMub3B0aW9ucz1uLmV4dGVuZCh7fSx0aGlzLmNvbnN0cnVjdG9yLmRlZmF1bHRzKSx0aGlzLm9wdGlvbihlKTt2YXIgbz0rK2w7dGhpcy5lbGVtZW50Lm91dGxheWVyR1VJRD1vLGZbb109dGhpcyx0aGlzLl9jcmVhdGUoKTt2YXIgcz10aGlzLl9nZXRPcHRpb24oXCJpbml0TGF5b3V0XCIpO3MmJnRoaXMubGF5b3V0KCl9ZnVuY3Rpb24gcih0KXtmdW5jdGlvbiBlKCl7dC5hcHBseSh0aGlzLGFyZ3VtZW50cyl9cmV0dXJuIGUucHJvdG90eXBlPU9iamVjdC5jcmVhdGUodC5wcm90b3R5cGUpLGUucHJvdG90eXBlLmNvbnN0cnVjdG9yPWUsZX1mdW5jdGlvbiBhKHQpe2lmKFwibnVtYmVyXCI9PXR5cGVvZiB0KXJldHVybiB0O3ZhciBlPXQubWF0Y2goLyheXFxkKlxcLj9cXGQqKShcXHcqKS8pLGk9ZSYmZVsxXSxuPWUmJmVbMl07aWYoIWkubGVuZ3RoKXJldHVybiAwO2k9cGFyc2VGbG9hdChpKTt2YXIgbz1tW25dfHwxO3JldHVybiBpKm99dmFyIHU9dC5jb25zb2xlLGg9dC5qUXVlcnksZD1mdW5jdGlvbigpe30sbD0wLGY9e307cy5uYW1lc3BhY2U9XCJvdXRsYXllclwiLHMuSXRlbT1vLHMuZGVmYXVsdHM9e2NvbnRhaW5lclN0eWxlOntwb3NpdGlvbjpcInJlbGF0aXZlXCJ9LGluaXRMYXlvdXQ6ITAsb3JpZ2luTGVmdDohMCxvcmlnaW5Ub3A6ITAscmVzaXplOiEwLHJlc2l6ZUNvbnRhaW5lcjohMCx0cmFuc2l0aW9uRHVyYXRpb246XCIwLjRzXCIsaGlkZGVuU3R5bGU6e29wYWNpdHk6MCx0cmFuc2Zvcm06XCJzY2FsZSgwLjAwMSlcIn0sdmlzaWJsZVN0eWxlOntvcGFjaXR5OjEsdHJhbnNmb3JtOlwic2NhbGUoMSlcIn19O3ZhciBjPXMucHJvdG90eXBlO24uZXh0ZW5kKGMsZS5wcm90b3R5cGUpLGMub3B0aW9uPWZ1bmN0aW9uKHQpe24uZXh0ZW5kKHRoaXMub3B0aW9ucyx0KX0sYy5fZ2V0T3B0aW9uPWZ1bmN0aW9uKHQpe3ZhciBlPXRoaXMuY29uc3RydWN0b3IuY29tcGF0T3B0aW9uc1t0XTtyZXR1cm4gZSYmdm9pZCAwIT09dGhpcy5vcHRpb25zW2VdP3RoaXMub3B0aW9uc1tlXTp0aGlzLm9wdGlvbnNbdF19LHMuY29tcGF0T3B0aW9ucz17aW5pdExheW91dDpcImlzSW5pdExheW91dFwiLGhvcml6b250YWw6XCJpc0hvcml6b250YWxcIixsYXlvdXRJbnN0YW50OlwiaXNMYXlvdXRJbnN0YW50XCIsb3JpZ2luTGVmdDpcImlzT3JpZ2luTGVmdFwiLG9yaWdpblRvcDpcImlzT3JpZ2luVG9wXCIscmVzaXplOlwiaXNSZXNpemVCb3VuZFwiLHJlc2l6ZUNvbnRhaW5lcjpcImlzUmVzaXppbmdDb250YWluZXJcIn0sYy5fY3JlYXRlPWZ1bmN0aW9uKCl7dGhpcy5yZWxvYWRJdGVtcygpLHRoaXMuc3RhbXBzPVtdLHRoaXMuc3RhbXAodGhpcy5vcHRpb25zLnN0YW1wKSxuLmV4dGVuZCh0aGlzLmVsZW1lbnQuc3R5bGUsdGhpcy5vcHRpb25zLmNvbnRhaW5lclN0eWxlKTt2YXIgdD10aGlzLl9nZXRPcHRpb24oXCJyZXNpemVcIik7dCYmdGhpcy5iaW5kUmVzaXplKCl9LGMucmVsb2FkSXRlbXM9ZnVuY3Rpb24oKXt0aGlzLml0ZW1zPXRoaXMuX2l0ZW1pemUodGhpcy5lbGVtZW50LmNoaWxkcmVuKX0sYy5faXRlbWl6ZT1mdW5jdGlvbih0KXtmb3IodmFyIGU9dGhpcy5fZmlsdGVyRmluZEl0ZW1FbGVtZW50cyh0KSxpPXRoaXMuY29uc3RydWN0b3IuSXRlbSxuPVtdLG89MDtvPGUubGVuZ3RoO28rKyl7dmFyIHM9ZVtvXSxyPW5ldyBpKHMsdGhpcyk7bi5wdXNoKHIpfXJldHVybiBufSxjLl9maWx0ZXJGaW5kSXRlbUVsZW1lbnRzPWZ1bmN0aW9uKHQpe3JldHVybiBuLmZpbHRlckZpbmRFbGVtZW50cyh0LHRoaXMub3B0aW9ucy5pdGVtU2VsZWN0b3IpfSxjLmdldEl0ZW1FbGVtZW50cz1mdW5jdGlvbigpe3JldHVybiB0aGlzLml0ZW1zLm1hcChmdW5jdGlvbih0KXtyZXR1cm4gdC5lbGVtZW50fSl9LGMubGF5b3V0PWZ1bmN0aW9uKCl7dGhpcy5fcmVzZXRMYXlvdXQoKSx0aGlzLl9tYW5hZ2VTdGFtcHMoKTt2YXIgdD10aGlzLl9nZXRPcHRpb24oXCJsYXlvdXRJbnN0YW50XCIpLGU9dm9pZCAwIT09dD90OiF0aGlzLl9pc0xheW91dEluaXRlZDt0aGlzLmxheW91dEl0ZW1zKHRoaXMuaXRlbXMsZSksdGhpcy5faXNMYXlvdXRJbml0ZWQ9ITB9LGMuX2luaXQ9Yy5sYXlvdXQsYy5fcmVzZXRMYXlvdXQ9ZnVuY3Rpb24oKXt0aGlzLmdldFNpemUoKX0sYy5nZXRTaXplPWZ1bmN0aW9uKCl7dGhpcy5zaXplPWkodGhpcy5lbGVtZW50KX0sYy5fZ2V0TWVhc3VyZW1lbnQ9ZnVuY3Rpb24odCxlKXt2YXIgbixvPXRoaXMub3B0aW9uc1t0XTtvPyhcInN0cmluZ1wiPT10eXBlb2Ygbz9uPXRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKG8pOm8gaW5zdGFuY2VvZiBIVE1MRWxlbWVudCYmKG49byksdGhpc1t0XT1uP2kobilbZV06byk6dGhpc1t0XT0wfSxjLmxheW91dEl0ZW1zPWZ1bmN0aW9uKHQsZSl7dD10aGlzLl9nZXRJdGVtc0ZvckxheW91dCh0KSx0aGlzLl9sYXlvdXRJdGVtcyh0LGUpLHRoaXMuX3Bvc3RMYXlvdXQoKX0sYy5fZ2V0SXRlbXNGb3JMYXlvdXQ9ZnVuY3Rpb24odCl7cmV0dXJuIHQuZmlsdGVyKGZ1bmN0aW9uKHQpe3JldHVybiF0LmlzSWdub3JlZH0pfSxjLl9sYXlvdXRJdGVtcz1mdW5jdGlvbih0LGUpe2lmKHRoaXMuX2VtaXRDb21wbGV0ZU9uSXRlbXMoXCJsYXlvdXRcIix0KSx0JiZ0Lmxlbmd0aCl7dmFyIGk9W107dC5mb3JFYWNoKGZ1bmN0aW9uKHQpe3ZhciBuPXRoaXMuX2dldEl0ZW1MYXlvdXRQb3NpdGlvbih0KTtuLml0ZW09dCxuLmlzSW5zdGFudD1lfHx0LmlzTGF5b3V0SW5zdGFudCxpLnB1c2gobil9LHRoaXMpLHRoaXMuX3Byb2Nlc3NMYXlvdXRRdWV1ZShpKX19LGMuX2dldEl0ZW1MYXlvdXRQb3NpdGlvbj1mdW5jdGlvbigpe3JldHVybnt4OjAseTowfX0sYy5fcHJvY2Vzc0xheW91dFF1ZXVlPWZ1bmN0aW9uKHQpe3RoaXMudXBkYXRlU3RhZ2dlcigpLHQuZm9yRWFjaChmdW5jdGlvbih0LGUpe3RoaXMuX3Bvc2l0aW9uSXRlbSh0Lml0ZW0sdC54LHQueSx0LmlzSW5zdGFudCxlKX0sdGhpcyl9LGMudXBkYXRlU3RhZ2dlcj1mdW5jdGlvbigpe3ZhciB0PXRoaXMub3B0aW9ucy5zdGFnZ2VyO3JldHVybiBudWxsPT09dHx8dm9pZCAwPT09dD92b2lkKHRoaXMuc3RhZ2dlcj0wKToodGhpcy5zdGFnZ2VyPWEodCksdGhpcy5zdGFnZ2VyKX0sYy5fcG9zaXRpb25JdGVtPWZ1bmN0aW9uKHQsZSxpLG4sbyl7bj90LmdvVG8oZSxpKToodC5zdGFnZ2VyKG8qdGhpcy5zdGFnZ2VyKSx0Lm1vdmVUbyhlLGkpKX0sYy5fcG9zdExheW91dD1mdW5jdGlvbigpe3RoaXMucmVzaXplQ29udGFpbmVyKCl9LGMucmVzaXplQ29udGFpbmVyPWZ1bmN0aW9uKCl7dmFyIHQ9dGhpcy5fZ2V0T3B0aW9uKFwicmVzaXplQ29udGFpbmVyXCIpO2lmKHQpe3ZhciBlPXRoaXMuX2dldENvbnRhaW5lclNpemUoKTtlJiYodGhpcy5fc2V0Q29udGFpbmVyTWVhc3VyZShlLndpZHRoLCEwKSx0aGlzLl9zZXRDb250YWluZXJNZWFzdXJlKGUuaGVpZ2h0LCExKSl9fSxjLl9nZXRDb250YWluZXJTaXplPWQsYy5fc2V0Q29udGFpbmVyTWVhc3VyZT1mdW5jdGlvbih0LGUpe2lmKHZvaWQgMCE9PXQpe3ZhciBpPXRoaXMuc2l6ZTtpLmlzQm9yZGVyQm94JiYodCs9ZT9pLnBhZGRpbmdMZWZ0K2kucGFkZGluZ1JpZ2h0K2kuYm9yZGVyTGVmdFdpZHRoK2kuYm9yZGVyUmlnaHRXaWR0aDppLnBhZGRpbmdCb3R0b20raS5wYWRkaW5nVG9wK2kuYm9yZGVyVG9wV2lkdGgraS5ib3JkZXJCb3R0b21XaWR0aCksdD1NYXRoLm1heCh0LDApLHRoaXMuZWxlbWVudC5zdHlsZVtlP1wid2lkdGhcIjpcImhlaWdodFwiXT10K1wicHhcIn19LGMuX2VtaXRDb21wbGV0ZU9uSXRlbXM9ZnVuY3Rpb24odCxlKXtmdW5jdGlvbiBpKCl7by5kaXNwYXRjaEV2ZW50KHQrXCJDb21wbGV0ZVwiLG51bGwsW2VdKX1mdW5jdGlvbiBuKCl7cisrLHI9PXMmJmkoKX12YXIgbz10aGlzLHM9ZS5sZW5ndGg7aWYoIWV8fCFzKXJldHVybiB2b2lkIGkoKTt2YXIgcj0wO2UuZm9yRWFjaChmdW5jdGlvbihlKXtlLm9uY2UodCxuKX0pfSxjLmRpc3BhdGNoRXZlbnQ9ZnVuY3Rpb24odCxlLGkpe3ZhciBuPWU/W2VdLmNvbmNhdChpKTppO2lmKHRoaXMuZW1pdEV2ZW50KHQsbiksaClpZih0aGlzLiRlbGVtZW50PXRoaXMuJGVsZW1lbnR8fGgodGhpcy5lbGVtZW50KSxlKXt2YXIgbz1oLkV2ZW50KGUpO28udHlwZT10LHRoaXMuJGVsZW1lbnQudHJpZ2dlcihvLGkpfWVsc2UgdGhpcy4kZWxlbWVudC50cmlnZ2VyKHQsaSl9LGMuaWdub3JlPWZ1bmN0aW9uKHQpe3ZhciBlPXRoaXMuZ2V0SXRlbSh0KTtlJiYoZS5pc0lnbm9yZWQ9ITApfSxjLnVuaWdub3JlPWZ1bmN0aW9uKHQpe3ZhciBlPXRoaXMuZ2V0SXRlbSh0KTtlJiZkZWxldGUgZS5pc0lnbm9yZWR9LGMuc3RhbXA9ZnVuY3Rpb24odCl7dD10aGlzLl9maW5kKHQpLHQmJih0aGlzLnN0YW1wcz10aGlzLnN0YW1wcy5jb25jYXQodCksdC5mb3JFYWNoKHRoaXMuaWdub3JlLHRoaXMpKX0sYy51bnN0YW1wPWZ1bmN0aW9uKHQpe3Q9dGhpcy5fZmluZCh0KSx0JiZ0LmZvckVhY2goZnVuY3Rpb24odCl7bi5yZW1vdmVGcm9tKHRoaXMuc3RhbXBzLHQpLHRoaXMudW5pZ25vcmUodCl9LHRoaXMpfSxjLl9maW5kPWZ1bmN0aW9uKHQpe3JldHVybiB0PyhcInN0cmluZ1wiPT10eXBlb2YgdCYmKHQ9dGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwodCkpLHQ9bi5tYWtlQXJyYXkodCkpOnZvaWQgMH0sYy5fbWFuYWdlU3RhbXBzPWZ1bmN0aW9uKCl7dGhpcy5zdGFtcHMmJnRoaXMuc3RhbXBzLmxlbmd0aCYmKHRoaXMuX2dldEJvdW5kaW5nUmVjdCgpLHRoaXMuc3RhbXBzLmZvckVhY2godGhpcy5fbWFuYWdlU3RhbXAsdGhpcykpfSxjLl9nZXRCb3VuZGluZ1JlY3Q9ZnVuY3Rpb24oKXt2YXIgdD10aGlzLmVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksZT10aGlzLnNpemU7dGhpcy5fYm91bmRpbmdSZWN0PXtsZWZ0OnQubGVmdCtlLnBhZGRpbmdMZWZ0K2UuYm9yZGVyTGVmdFdpZHRoLHRvcDp0LnRvcCtlLnBhZGRpbmdUb3ArZS5ib3JkZXJUb3BXaWR0aCxyaWdodDp0LnJpZ2h0LShlLnBhZGRpbmdSaWdodCtlLmJvcmRlclJpZ2h0V2lkdGgpLGJvdHRvbTp0LmJvdHRvbS0oZS5wYWRkaW5nQm90dG9tK2UuYm9yZGVyQm90dG9tV2lkdGgpfX0sYy5fbWFuYWdlU3RhbXA9ZCxjLl9nZXRFbGVtZW50T2Zmc2V0PWZ1bmN0aW9uKHQpe3ZhciBlPXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksbj10aGlzLl9ib3VuZGluZ1JlY3Qsbz1pKHQpLHM9e2xlZnQ6ZS5sZWZ0LW4ubGVmdC1vLm1hcmdpbkxlZnQsdG9wOmUudG9wLW4udG9wLW8ubWFyZ2luVG9wLHJpZ2h0Om4ucmlnaHQtZS5yaWdodC1vLm1hcmdpblJpZ2h0LGJvdHRvbTpuLmJvdHRvbS1lLmJvdHRvbS1vLm1hcmdpbkJvdHRvbX07cmV0dXJuIHN9LGMuaGFuZGxlRXZlbnQ9bi5oYW5kbGVFdmVudCxjLmJpbmRSZXNpemU9ZnVuY3Rpb24oKXt0LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIix0aGlzKSx0aGlzLmlzUmVzaXplQm91bmQ9ITB9LGMudW5iaW5kUmVzaXplPWZ1bmN0aW9uKCl7dC5yZW1vdmVFdmVudExpc3RlbmVyKFwicmVzaXplXCIsdGhpcyksdGhpcy5pc1Jlc2l6ZUJvdW5kPSExfSxjLm9ucmVzaXplPWZ1bmN0aW9uKCl7dGhpcy5yZXNpemUoKX0sbi5kZWJvdW5jZU1ldGhvZChzLFwib25yZXNpemVcIiwxMDApLGMucmVzaXplPWZ1bmN0aW9uKCl7dGhpcy5pc1Jlc2l6ZUJvdW5kJiZ0aGlzLm5lZWRzUmVzaXplTGF5b3V0KCkmJnRoaXMubGF5b3V0KCl9LGMubmVlZHNSZXNpemVMYXlvdXQ9ZnVuY3Rpb24oKXt2YXIgdD1pKHRoaXMuZWxlbWVudCksZT10aGlzLnNpemUmJnQ7cmV0dXJuIGUmJnQuaW5uZXJXaWR0aCE9PXRoaXMuc2l6ZS5pbm5lcldpZHRofSxjLmFkZEl0ZW1zPWZ1bmN0aW9uKHQpe3ZhciBlPXRoaXMuX2l0ZW1pemUodCk7cmV0dXJuIGUubGVuZ3RoJiYodGhpcy5pdGVtcz10aGlzLml0ZW1zLmNvbmNhdChlKSksZX0sYy5hcHBlbmRlZD1mdW5jdGlvbih0KXt2YXIgZT10aGlzLmFkZEl0ZW1zKHQpO2UubGVuZ3RoJiYodGhpcy5sYXlvdXRJdGVtcyhlLCEwKSx0aGlzLnJldmVhbChlKSl9LGMucHJlcGVuZGVkPWZ1bmN0aW9uKHQpe3ZhciBlPXRoaXMuX2l0ZW1pemUodCk7aWYoZS5sZW5ndGgpe3ZhciBpPXRoaXMuaXRlbXMuc2xpY2UoMCk7dGhpcy5pdGVtcz1lLmNvbmNhdChpKSx0aGlzLl9yZXNldExheW91dCgpLHRoaXMuX21hbmFnZVN0YW1wcygpLHRoaXMubGF5b3V0SXRlbXMoZSwhMCksdGhpcy5yZXZlYWwoZSksdGhpcy5sYXlvdXRJdGVtcyhpKX19LGMucmV2ZWFsPWZ1bmN0aW9uKHQpe2lmKHRoaXMuX2VtaXRDb21wbGV0ZU9uSXRlbXMoXCJyZXZlYWxcIix0KSx0JiZ0Lmxlbmd0aCl7dmFyIGU9dGhpcy51cGRhdGVTdGFnZ2VyKCk7dC5mb3JFYWNoKGZ1bmN0aW9uKHQsaSl7dC5zdGFnZ2VyKGkqZSksdC5yZXZlYWwoKX0pfX0sYy5oaWRlPWZ1bmN0aW9uKHQpe2lmKHRoaXMuX2VtaXRDb21wbGV0ZU9uSXRlbXMoXCJoaWRlXCIsdCksdCYmdC5sZW5ndGgpe3ZhciBlPXRoaXMudXBkYXRlU3RhZ2dlcigpO3QuZm9yRWFjaChmdW5jdGlvbih0LGkpe3Quc3RhZ2dlcihpKmUpLHQuaGlkZSgpfSl9fSxjLnJldmVhbEl0ZW1FbGVtZW50cz1mdW5jdGlvbih0KXt2YXIgZT10aGlzLmdldEl0ZW1zKHQpO3RoaXMucmV2ZWFsKGUpfSxjLmhpZGVJdGVtRWxlbWVudHM9ZnVuY3Rpb24odCl7dmFyIGU9dGhpcy5nZXRJdGVtcyh0KTt0aGlzLmhpZGUoZSl9LGMuZ2V0SXRlbT1mdW5jdGlvbih0KXtmb3IodmFyIGU9MDtlPHRoaXMuaXRlbXMubGVuZ3RoO2UrKyl7dmFyIGk9dGhpcy5pdGVtc1tlXTtpZihpLmVsZW1lbnQ9PXQpcmV0dXJuIGl9fSxjLmdldEl0ZW1zPWZ1bmN0aW9uKHQpe3Q9bi5tYWtlQXJyYXkodCk7dmFyIGU9W107cmV0dXJuIHQuZm9yRWFjaChmdW5jdGlvbih0KXt2YXIgaT10aGlzLmdldEl0ZW0odCk7aSYmZS5wdXNoKGkpfSx0aGlzKSxlfSxjLnJlbW92ZT1mdW5jdGlvbih0KXt2YXIgZT10aGlzLmdldEl0ZW1zKHQpO3RoaXMuX2VtaXRDb21wbGV0ZU9uSXRlbXMoXCJyZW1vdmVcIixlKSxlJiZlLmxlbmd0aCYmZS5mb3JFYWNoKGZ1bmN0aW9uKHQpe3QucmVtb3ZlKCksbi5yZW1vdmVGcm9tKHRoaXMuaXRlbXMsdCl9LHRoaXMpfSxjLmRlc3Ryb3k9ZnVuY3Rpb24oKXt2YXIgdD10aGlzLmVsZW1lbnQuc3R5bGU7dC5oZWlnaHQ9XCJcIix0LnBvc2l0aW9uPVwiXCIsdC53aWR0aD1cIlwiLHRoaXMuaXRlbXMuZm9yRWFjaChmdW5jdGlvbih0KXt0LmRlc3Ryb3koKX0pLHRoaXMudW5iaW5kUmVzaXplKCk7dmFyIGU9dGhpcy5lbGVtZW50Lm91dGxheWVyR1VJRDtkZWxldGUgZltlXSxkZWxldGUgdGhpcy5lbGVtZW50Lm91dGxheWVyR1VJRCxoJiZoLnJlbW92ZURhdGEodGhpcy5lbGVtZW50LHRoaXMuY29uc3RydWN0b3IubmFtZXNwYWNlKX0scy5kYXRhPWZ1bmN0aW9uKHQpe3Q9bi5nZXRRdWVyeUVsZW1lbnQodCk7dmFyIGU9dCYmdC5vdXRsYXllckdVSUQ7cmV0dXJuIGUmJmZbZV19LHMuY3JlYXRlPWZ1bmN0aW9uKHQsZSl7dmFyIGk9cihzKTtyZXR1cm4gaS5kZWZhdWx0cz1uLmV4dGVuZCh7fSxzLmRlZmF1bHRzKSxuLmV4dGVuZChpLmRlZmF1bHRzLGUpLGkuY29tcGF0T3B0aW9ucz1uLmV4dGVuZCh7fSxzLmNvbXBhdE9wdGlvbnMpLGkubmFtZXNwYWNlPXQsaS5kYXRhPXMuZGF0YSxpLkl0ZW09cihvKSxuLmh0bWxJbml0KGksdCksaCYmaC5icmlkZ2V0JiZoLmJyaWRnZXQodCxpKSxpfTt2YXIgbT17bXM6MSxzOjFlM307cmV0dXJuIHMuSXRlbT1vLHN9KSxmdW5jdGlvbih0LGUpe1wiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZD9kZWZpbmUoXCJpc290b3BlL2pzL2l0ZW1cIixbXCJvdXRsYXllci9vdXRsYXllclwiXSxlKTpcIm9iamVjdFwiPT10eXBlb2YgbW9kdWxlJiZtb2R1bGUuZXhwb3J0cz9tb2R1bGUuZXhwb3J0cz1lKHJlcXVpcmUoXCJvdXRsYXllclwiKSk6KHQuSXNvdG9wZT10Lklzb3RvcGV8fHt9LHQuSXNvdG9wZS5JdGVtPWUodC5PdXRsYXllcikpfSh3aW5kb3csZnVuY3Rpb24odCl7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gZSgpe3QuSXRlbS5hcHBseSh0aGlzLGFyZ3VtZW50cyl9dmFyIGk9ZS5wcm90b3R5cGU9T2JqZWN0LmNyZWF0ZSh0Lkl0ZW0ucHJvdG90eXBlKSxuPWkuX2NyZWF0ZTtpLl9jcmVhdGU9ZnVuY3Rpb24oKXt0aGlzLmlkPXRoaXMubGF5b3V0Lml0ZW1HVUlEKyssbi5jYWxsKHRoaXMpLHRoaXMuc29ydERhdGE9e319LGkudXBkYXRlU29ydERhdGE9ZnVuY3Rpb24oKXtpZighdGhpcy5pc0lnbm9yZWQpe3RoaXMuc29ydERhdGEuaWQ9dGhpcy5pZCx0aGlzLnNvcnREYXRhW1wib3JpZ2luYWwtb3JkZXJcIl09dGhpcy5pZCx0aGlzLnNvcnREYXRhLnJhbmRvbT1NYXRoLnJhbmRvbSgpO3ZhciB0PXRoaXMubGF5b3V0Lm9wdGlvbnMuZ2V0U29ydERhdGEsZT10aGlzLmxheW91dC5fc29ydGVycztmb3IodmFyIGkgaW4gdCl7dmFyIG49ZVtpXTt0aGlzLnNvcnREYXRhW2ldPW4odGhpcy5lbGVtZW50LHRoaXMpfX19O3ZhciBvPWkuZGVzdHJveTtyZXR1cm4gaS5kZXN0cm95PWZ1bmN0aW9uKCl7by5hcHBseSh0aGlzLGFyZ3VtZW50cyksdGhpcy5jc3Moe2Rpc3BsYXk6XCJcIn0pfSxlfSksZnVuY3Rpb24odCxlKXtcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQ/ZGVmaW5lKFwiaXNvdG9wZS9qcy9sYXlvdXQtbW9kZVwiLFtcImdldC1zaXplL2dldC1zaXplXCIsXCJvdXRsYXllci9vdXRsYXllclwiXSxlKTpcIm9iamVjdFwiPT10eXBlb2YgbW9kdWxlJiZtb2R1bGUuZXhwb3J0cz9tb2R1bGUuZXhwb3J0cz1lKHJlcXVpcmUoXCJnZXQtc2l6ZVwiKSxyZXF1aXJlKFwib3V0bGF5ZXJcIikpOih0Lklzb3RvcGU9dC5Jc290b3BlfHx7fSx0Lklzb3RvcGUuTGF5b3V0TW9kZT1lKHQuZ2V0U2l6ZSx0Lk91dGxheWVyKSl9KHdpbmRvdyxmdW5jdGlvbih0LGUpe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIGkodCl7dGhpcy5pc290b3BlPXQsdCYmKHRoaXMub3B0aW9ucz10Lm9wdGlvbnNbdGhpcy5uYW1lc3BhY2VdLHRoaXMuZWxlbWVudD10LmVsZW1lbnQsdGhpcy5pdGVtcz10LmZpbHRlcmVkSXRlbXMsdGhpcy5zaXplPXQuc2l6ZSl9dmFyIG49aS5wcm90b3R5cGUsbz1bXCJfcmVzZXRMYXlvdXRcIixcIl9nZXRJdGVtTGF5b3V0UG9zaXRpb25cIixcIl9tYW5hZ2VTdGFtcFwiLFwiX2dldENvbnRhaW5lclNpemVcIixcIl9nZXRFbGVtZW50T2Zmc2V0XCIsXCJuZWVkc1Jlc2l6ZUxheW91dFwiLFwiX2dldE9wdGlvblwiXTtyZXR1cm4gby5mb3JFYWNoKGZ1bmN0aW9uKHQpe25bdF09ZnVuY3Rpb24oKXtyZXR1cm4gZS5wcm90b3R5cGVbdF0uYXBwbHkodGhpcy5pc290b3BlLGFyZ3VtZW50cyl9fSksbi5uZWVkc1ZlcnRpY2FsUmVzaXplTGF5b3V0PWZ1bmN0aW9uKCl7dmFyIGU9dCh0aGlzLmlzb3RvcGUuZWxlbWVudCksaT10aGlzLmlzb3RvcGUuc2l6ZSYmZTtyZXR1cm4gaSYmZS5pbm5lckhlaWdodCE9dGhpcy5pc290b3BlLnNpemUuaW5uZXJIZWlnaHR9LG4uX2dldE1lYXN1cmVtZW50PWZ1bmN0aW9uKCl7dGhpcy5pc290b3BlLl9nZXRNZWFzdXJlbWVudC5hcHBseSh0aGlzLGFyZ3VtZW50cyl9LG4uZ2V0Q29sdW1uV2lkdGg9ZnVuY3Rpb24oKXt0aGlzLmdldFNlZ21lbnRTaXplKFwiY29sdW1uXCIsXCJXaWR0aFwiKX0sbi5nZXRSb3dIZWlnaHQ9ZnVuY3Rpb24oKXt0aGlzLmdldFNlZ21lbnRTaXplKFwicm93XCIsXCJIZWlnaHRcIil9LG4uZ2V0U2VnbWVudFNpemU9ZnVuY3Rpb24odCxlKXt2YXIgaT10K2Usbj1cIm91dGVyXCIrZTtpZih0aGlzLl9nZXRNZWFzdXJlbWVudChpLG4pLCF0aGlzW2ldKXt2YXIgbz10aGlzLmdldEZpcnN0SXRlbVNpemUoKTt0aGlzW2ldPW8mJm9bbl18fHRoaXMuaXNvdG9wZS5zaXplW1wiaW5uZXJcIitlXX19LG4uZ2V0Rmlyc3RJdGVtU2l6ZT1mdW5jdGlvbigpe3ZhciBlPXRoaXMuaXNvdG9wZS5maWx0ZXJlZEl0ZW1zWzBdO3JldHVybiBlJiZlLmVsZW1lbnQmJnQoZS5lbGVtZW50KX0sbi5sYXlvdXQ9ZnVuY3Rpb24oKXt0aGlzLmlzb3RvcGUubGF5b3V0LmFwcGx5KHRoaXMuaXNvdG9wZSxhcmd1bWVudHMpfSxuLmdldFNpemU9ZnVuY3Rpb24oKXt0aGlzLmlzb3RvcGUuZ2V0U2l6ZSgpLHRoaXMuc2l6ZT10aGlzLmlzb3RvcGUuc2l6ZX0saS5tb2Rlcz17fSxpLmNyZWF0ZT1mdW5jdGlvbih0LGUpe2Z1bmN0aW9uIG8oKXtpLmFwcGx5KHRoaXMsYXJndW1lbnRzKX1yZXR1cm4gby5wcm90b3R5cGU9T2JqZWN0LmNyZWF0ZShuKSxvLnByb3RvdHlwZS5jb25zdHJ1Y3Rvcj1vLGUmJihvLm9wdGlvbnM9ZSksby5wcm90b3R5cGUubmFtZXNwYWNlPXQsaS5tb2Rlc1t0XT1vLG99LGl9KSxmdW5jdGlvbih0LGUpe1wiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZD9kZWZpbmUoXCJtYXNvbnJ5L21hc29ucnlcIixbXCJvdXRsYXllci9vdXRsYXllclwiLFwiZ2V0LXNpemUvZ2V0LXNpemVcIl0sZSk6XCJvYmplY3RcIj09dHlwZW9mIG1vZHVsZSYmbW9kdWxlLmV4cG9ydHM/bW9kdWxlLmV4cG9ydHM9ZShyZXF1aXJlKFwib3V0bGF5ZXJcIikscmVxdWlyZShcImdldC1zaXplXCIpKTp0Lk1hc29ucnk9ZSh0Lk91dGxheWVyLHQuZ2V0U2l6ZSl9KHdpbmRvdyxmdW5jdGlvbih0LGUpe3ZhciBpPXQuY3JlYXRlKFwibWFzb25yeVwiKTtyZXR1cm4gaS5jb21wYXRPcHRpb25zLmZpdFdpZHRoPVwiaXNGaXRXaWR0aFwiLGkucHJvdG90eXBlLl9yZXNldExheW91dD1mdW5jdGlvbigpe3RoaXMuZ2V0U2l6ZSgpLHRoaXMuX2dldE1lYXN1cmVtZW50KFwiY29sdW1uV2lkdGhcIixcIm91dGVyV2lkdGhcIiksdGhpcy5fZ2V0TWVhc3VyZW1lbnQoXCJndXR0ZXJcIixcIm91dGVyV2lkdGhcIiksdGhpcy5tZWFzdXJlQ29sdW1ucygpLHRoaXMuY29sWXM9W107Zm9yKHZhciB0PTA7dDx0aGlzLmNvbHM7dCsrKXRoaXMuY29sWXMucHVzaCgwKTt0aGlzLm1heFk9MH0saS5wcm90b3R5cGUubWVhc3VyZUNvbHVtbnM9ZnVuY3Rpb24oKXtpZih0aGlzLmdldENvbnRhaW5lcldpZHRoKCksIXRoaXMuY29sdW1uV2lkdGgpe3ZhciB0PXRoaXMuaXRlbXNbMF0saT10JiZ0LmVsZW1lbnQ7dGhpcy5jb2x1bW5XaWR0aD1pJiZlKGkpLm91dGVyV2lkdGh8fHRoaXMuY29udGFpbmVyV2lkdGh9dmFyIG49dGhpcy5jb2x1bW5XaWR0aCs9dGhpcy5ndXR0ZXIsbz10aGlzLmNvbnRhaW5lcldpZHRoK3RoaXMuZ3V0dGVyLHM9by9uLHI9bi1vJW4sYT1yJiYxPnI/XCJyb3VuZFwiOlwiZmxvb3JcIjtzPU1hdGhbYV0ocyksdGhpcy5jb2xzPU1hdGgubWF4KHMsMSl9LGkucHJvdG90eXBlLmdldENvbnRhaW5lcldpZHRoPWZ1bmN0aW9uKCl7dmFyIHQ9dGhpcy5fZ2V0T3B0aW9uKFwiZml0V2lkdGhcIiksaT10P3RoaXMuZWxlbWVudC5wYXJlbnROb2RlOnRoaXMuZWxlbWVudCxuPWUoaSk7dGhpcy5jb250YWluZXJXaWR0aD1uJiZuLmlubmVyV2lkdGh9LGkucHJvdG90eXBlLl9nZXRJdGVtTGF5b3V0UG9zaXRpb249ZnVuY3Rpb24odCl7dC5nZXRTaXplKCk7dmFyIGU9dC5zaXplLm91dGVyV2lkdGgldGhpcy5jb2x1bW5XaWR0aCxpPWUmJjE+ZT9cInJvdW5kXCI6XCJjZWlsXCIsbj1NYXRoW2ldKHQuc2l6ZS5vdXRlcldpZHRoL3RoaXMuY29sdW1uV2lkdGgpO249TWF0aC5taW4obix0aGlzLmNvbHMpO2Zvcih2YXIgbz10aGlzLl9nZXRDb2xHcm91cChuKSxzPU1hdGgubWluLmFwcGx5KE1hdGgsbykscj1vLmluZGV4T2YocyksYT17eDp0aGlzLmNvbHVtbldpZHRoKnIseTpzfSx1PXMrdC5zaXplLm91dGVySGVpZ2h0LGg9dGhpcy5jb2xzKzEtby5sZW5ndGgsZD0wO2g+ZDtkKyspdGhpcy5jb2xZc1tyK2RdPXU7cmV0dXJuIGF9LGkucHJvdG90eXBlLl9nZXRDb2xHcm91cD1mdW5jdGlvbih0KXtpZigyPnQpcmV0dXJuIHRoaXMuY29sWXM7Zm9yKHZhciBlPVtdLGk9dGhpcy5jb2xzKzEtdCxuPTA7aT5uO24rKyl7dmFyIG89dGhpcy5jb2xZcy5zbGljZShuLG4rdCk7ZVtuXT1NYXRoLm1heC5hcHBseShNYXRoLG8pfXJldHVybiBlfSxpLnByb3RvdHlwZS5fbWFuYWdlU3RhbXA9ZnVuY3Rpb24odCl7dmFyIGk9ZSh0KSxuPXRoaXMuX2dldEVsZW1lbnRPZmZzZXQodCksbz10aGlzLl9nZXRPcHRpb24oXCJvcmlnaW5MZWZ0XCIpLHM9bz9uLmxlZnQ6bi5yaWdodCxyPXMraS5vdXRlcldpZHRoLGE9TWF0aC5mbG9vcihzL3RoaXMuY29sdW1uV2lkdGgpO2E9TWF0aC5tYXgoMCxhKTt2YXIgdT1NYXRoLmZsb29yKHIvdGhpcy5jb2x1bW5XaWR0aCk7dS09ciV0aGlzLmNvbHVtbldpZHRoPzA6MSx1PU1hdGgubWluKHRoaXMuY29scy0xLHUpO2Zvcih2YXIgaD10aGlzLl9nZXRPcHRpb24oXCJvcmlnaW5Ub3BcIiksZD0oaD9uLnRvcDpuLmJvdHRvbSkraS5vdXRlckhlaWdodCxsPWE7dT49bDtsKyspdGhpcy5jb2xZc1tsXT1NYXRoLm1heChkLHRoaXMuY29sWXNbbF0pfSxpLnByb3RvdHlwZS5fZ2V0Q29udGFpbmVyU2l6ZT1mdW5jdGlvbigpe3RoaXMubWF4WT1NYXRoLm1heC5hcHBseShNYXRoLHRoaXMuY29sWXMpO3ZhciB0PXtoZWlnaHQ6dGhpcy5tYXhZfTtyZXR1cm4gdGhpcy5fZ2V0T3B0aW9uKFwiZml0V2lkdGhcIikmJih0LndpZHRoPXRoaXMuX2dldENvbnRhaW5lckZpdFdpZHRoKCkpLHR9LGkucHJvdG90eXBlLl9nZXRDb250YWluZXJGaXRXaWR0aD1mdW5jdGlvbigpe2Zvcih2YXIgdD0wLGU9dGhpcy5jb2xzOy0tZSYmMD09PXRoaXMuY29sWXNbZV07KXQrKztyZXR1cm4odGhpcy5jb2xzLXQpKnRoaXMuY29sdW1uV2lkdGgtdGhpcy5ndXR0ZXJ9LGkucHJvdG90eXBlLm5lZWRzUmVzaXplTGF5b3V0PWZ1bmN0aW9uKCl7dmFyIHQ9dGhpcy5jb250YWluZXJXaWR0aDtyZXR1cm4gdGhpcy5nZXRDb250YWluZXJXaWR0aCgpLHQhPXRoaXMuY29udGFpbmVyV2lkdGh9LGl9KSxmdW5jdGlvbih0LGUpe1wiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZD9kZWZpbmUoXCJpc290b3BlL2pzL2xheW91dC1tb2Rlcy9tYXNvbnJ5XCIsW1wiLi4vbGF5b3V0LW1vZGVcIixcIm1hc29ucnkvbWFzb25yeVwiXSxlKTpcIm9iamVjdFwiPT10eXBlb2YgbW9kdWxlJiZtb2R1bGUuZXhwb3J0cz9tb2R1bGUuZXhwb3J0cz1lKHJlcXVpcmUoXCIuLi9sYXlvdXQtbW9kZVwiKSxyZXF1aXJlKFwibWFzb25yeS1sYXlvdXRcIikpOmUodC5Jc290b3BlLkxheW91dE1vZGUsdC5NYXNvbnJ5KX0od2luZG93LGZ1bmN0aW9uKHQsZSl7XCJ1c2Ugc3RyaWN0XCI7dmFyIGk9dC5jcmVhdGUoXCJtYXNvbnJ5XCIpLG49aS5wcm90b3R5cGUsbz17X2dldEVsZW1lbnRPZmZzZXQ6ITAsbGF5b3V0OiEwLF9nZXRNZWFzdXJlbWVudDohMH07Zm9yKHZhciBzIGluIGUucHJvdG90eXBlKW9bc118fChuW3NdPWUucHJvdG90eXBlW3NdKTt2YXIgcj1uLm1lYXN1cmVDb2x1bW5zO24ubWVhc3VyZUNvbHVtbnM9ZnVuY3Rpb24oKXt0aGlzLml0ZW1zPXRoaXMuaXNvdG9wZS5maWx0ZXJlZEl0ZW1zLHIuY2FsbCh0aGlzKX07dmFyIGE9bi5fZ2V0T3B0aW9uO3JldHVybiBuLl9nZXRPcHRpb249ZnVuY3Rpb24odCl7cmV0dXJuXCJmaXRXaWR0aFwiPT10P3ZvaWQgMCE9PXRoaXMub3B0aW9ucy5pc0ZpdFdpZHRoP3RoaXMub3B0aW9ucy5pc0ZpdFdpZHRoOnRoaXMub3B0aW9ucy5maXRXaWR0aDphLmFwcGx5KHRoaXMuaXNvdG9wZSxhcmd1bWVudHMpfSxpfSksZnVuY3Rpb24odCxlKXtcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQ/ZGVmaW5lKFwiaXNvdG9wZS9qcy9sYXlvdXQtbW9kZXMvZml0LXJvd3NcIixbXCIuLi9sYXlvdXQtbW9kZVwiXSxlKTpcIm9iamVjdFwiPT10eXBlb2YgZXhwb3J0cz9tb2R1bGUuZXhwb3J0cz1lKHJlcXVpcmUoXCIuLi9sYXlvdXQtbW9kZVwiKSk6ZSh0Lklzb3RvcGUuTGF5b3V0TW9kZSl9KHdpbmRvdyxmdW5jdGlvbih0KXtcInVzZSBzdHJpY3RcIjt2YXIgZT10LmNyZWF0ZShcImZpdFJvd3NcIiksaT1lLnByb3RvdHlwZTtyZXR1cm4gaS5fcmVzZXRMYXlvdXQ9ZnVuY3Rpb24oKXt0aGlzLng9MCx0aGlzLnk9MCx0aGlzLm1heFk9MCx0aGlzLl9nZXRNZWFzdXJlbWVudChcImd1dHRlclwiLFwib3V0ZXJXaWR0aFwiKX0saS5fZ2V0SXRlbUxheW91dFBvc2l0aW9uPWZ1bmN0aW9uKHQpe3QuZ2V0U2l6ZSgpO3ZhciBlPXQuc2l6ZS5vdXRlcldpZHRoK3RoaXMuZ3V0dGVyLGk9dGhpcy5pc290b3BlLnNpemUuaW5uZXJXaWR0aCt0aGlzLmd1dHRlcjswIT09dGhpcy54JiZlK3RoaXMueD5pJiYodGhpcy54PTAsdGhpcy55PXRoaXMubWF4WSk7dmFyIG49e3g6dGhpcy54LHk6dGhpcy55fTtyZXR1cm4gdGhpcy5tYXhZPU1hdGgubWF4KHRoaXMubWF4WSx0aGlzLnkrdC5zaXplLm91dGVySGVpZ2h0KSx0aGlzLngrPWUsbn0saS5fZ2V0Q29udGFpbmVyU2l6ZT1mdW5jdGlvbigpe3JldHVybntoZWlnaHQ6dGhpcy5tYXhZfX0sZX0pLGZ1bmN0aW9uKHQsZSl7XCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kP2RlZmluZShcImlzb3RvcGUvanMvbGF5b3V0LW1vZGVzL3ZlcnRpY2FsXCIsW1wiLi4vbGF5b3V0LW1vZGVcIl0sZSk6XCJvYmplY3RcIj09dHlwZW9mIG1vZHVsZSYmbW9kdWxlLmV4cG9ydHM/bW9kdWxlLmV4cG9ydHM9ZShyZXF1aXJlKFwiLi4vbGF5b3V0LW1vZGVcIikpOmUodC5Jc290b3BlLkxheW91dE1vZGUpfSh3aW5kb3csZnVuY3Rpb24odCl7XCJ1c2Ugc3RyaWN0XCI7dmFyIGU9dC5jcmVhdGUoXCJ2ZXJ0aWNhbFwiLHtob3Jpem9udGFsQWxpZ25tZW50OjB9KSxpPWUucHJvdG90eXBlO3JldHVybiBpLl9yZXNldExheW91dD1mdW5jdGlvbigpe3RoaXMueT0wfSxpLl9nZXRJdGVtTGF5b3V0UG9zaXRpb249ZnVuY3Rpb24odCl7dC5nZXRTaXplKCk7dmFyIGU9KHRoaXMuaXNvdG9wZS5zaXplLmlubmVyV2lkdGgtdC5zaXplLm91dGVyV2lkdGgpKnRoaXMub3B0aW9ucy5ob3Jpem9udGFsQWxpZ25tZW50LGk9dGhpcy55O3JldHVybiB0aGlzLnkrPXQuc2l6ZS5vdXRlckhlaWdodCx7eDplLHk6aX19LGkuX2dldENvbnRhaW5lclNpemU9ZnVuY3Rpb24oKXtyZXR1cm57aGVpZ2h0OnRoaXMueX19LGV9KSxmdW5jdGlvbih0LGUpe1wiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZD9kZWZpbmUoW1wib3V0bGF5ZXIvb3V0bGF5ZXJcIixcImdldC1zaXplL2dldC1zaXplXCIsXCJkZXNhbmRyby1tYXRjaGVzLXNlbGVjdG9yL21hdGNoZXMtc2VsZWN0b3JcIixcImZpenp5LXVpLXV0aWxzL3V0aWxzXCIsXCJpc290b3BlL2pzL2l0ZW1cIixcImlzb3RvcGUvanMvbGF5b3V0LW1vZGVcIixcImlzb3RvcGUvanMvbGF5b3V0LW1vZGVzL21hc29ucnlcIixcImlzb3RvcGUvanMvbGF5b3V0LW1vZGVzL2ZpdC1yb3dzXCIsXCJpc290b3BlL2pzL2xheW91dC1tb2Rlcy92ZXJ0aWNhbFwiXSxmdW5jdGlvbihpLG4sbyxzLHIsYSl7cmV0dXJuIGUodCxpLG4sbyxzLHIsYSl9KTpcIm9iamVjdFwiPT10eXBlb2YgbW9kdWxlJiZtb2R1bGUuZXhwb3J0cz9tb2R1bGUuZXhwb3J0cz1lKHQscmVxdWlyZShcIm91dGxheWVyXCIpLHJlcXVpcmUoXCJnZXQtc2l6ZVwiKSxyZXF1aXJlKFwiZGVzYW5kcm8tbWF0Y2hlcy1zZWxlY3RvclwiKSxyZXF1aXJlKFwiZml6enktdWktdXRpbHNcIikscmVxdWlyZShcImlzb3RvcGUvanMvaXRlbVwiKSxyZXF1aXJlKFwiaXNvdG9wZS9qcy9sYXlvdXQtbW9kZVwiKSxyZXF1aXJlKFwiaXNvdG9wZS9qcy9sYXlvdXQtbW9kZXMvbWFzb25yeVwiKSxyZXF1aXJlKFwiaXNvdG9wZS9qcy9sYXlvdXQtbW9kZXMvZml0LXJvd3NcIikscmVxdWlyZShcImlzb3RvcGUvanMvbGF5b3V0LW1vZGVzL3ZlcnRpY2FsXCIpKTp0Lklzb3RvcGU9ZSh0LHQuT3V0bGF5ZXIsdC5nZXRTaXplLHQubWF0Y2hlc1NlbGVjdG9yLHQuZml6enlVSVV0aWxzLHQuSXNvdG9wZS5JdGVtLHQuSXNvdG9wZS5MYXlvdXRNb2RlKX0od2luZG93LGZ1bmN0aW9uKHQsZSxpLG4sbyxzLHIpe2Z1bmN0aW9uIGEodCxlKXtyZXR1cm4gZnVuY3Rpb24oaSxuKXtmb3IodmFyIG89MDtvPHQubGVuZ3RoO28rKyl7dmFyIHM9dFtvXSxyPWkuc29ydERhdGFbc10sYT1uLnNvcnREYXRhW3NdO2lmKHI+YXx8YT5yKXt2YXIgdT12b2lkIDAhPT1lW3NdP2Vbc106ZSxoPXU/MTotMTtyZXR1cm4ocj5hPzE6LTEpKmh9fXJldHVybiAwfX12YXIgdT10LmpRdWVyeSxoPVN0cmluZy5wcm90b3R5cGUudHJpbT9mdW5jdGlvbih0KXtyZXR1cm4gdC50cmltKCl9OmZ1bmN0aW9uKHQpe3JldHVybiB0LnJlcGxhY2UoL15cXHMrfFxccyskL2csXCJcIil9LGQ9ZS5jcmVhdGUoXCJpc290b3BlXCIse2xheW91dE1vZGU6XCJtYXNvbnJ5XCIsaXNKUXVlcnlGaWx0ZXJpbmc6ITAsc29ydEFzY2VuZGluZzohMH0pO2QuSXRlbT1zLGQuTGF5b3V0TW9kZT1yO3ZhciBsPWQucHJvdG90eXBlO2wuX2NyZWF0ZT1mdW5jdGlvbigpe3RoaXMuaXRlbUdVSUQ9MCx0aGlzLl9zb3J0ZXJzPXt9LHRoaXMuX2dldFNvcnRlcnMoKSxlLnByb3RvdHlwZS5fY3JlYXRlLmNhbGwodGhpcyksdGhpcy5tb2Rlcz17fSx0aGlzLmZpbHRlcmVkSXRlbXM9dGhpcy5pdGVtcyx0aGlzLnNvcnRIaXN0b3J5PVtcIm9yaWdpbmFsLW9yZGVyXCJdO2Zvcih2YXIgdCBpbiByLm1vZGVzKXRoaXMuX2luaXRMYXlvdXRNb2RlKHQpfSxsLnJlbG9hZEl0ZW1zPWZ1bmN0aW9uKCl7dGhpcy5pdGVtR1VJRD0wLGUucHJvdG90eXBlLnJlbG9hZEl0ZW1zLmNhbGwodGhpcyl9LGwuX2l0ZW1pemU9ZnVuY3Rpb24oKXtmb3IodmFyIHQ9ZS5wcm90b3R5cGUuX2l0ZW1pemUuYXBwbHkodGhpcyxhcmd1bWVudHMpLGk9MDtpPHQubGVuZ3RoO2krKyl7dmFyIG49dFtpXTtuLmlkPXRoaXMuaXRlbUdVSUQrK31yZXR1cm4gdGhpcy5fdXBkYXRlSXRlbXNTb3J0RGF0YSh0KSx0fSxsLl9pbml0TGF5b3V0TW9kZT1mdW5jdGlvbih0KXt2YXIgZT1yLm1vZGVzW3RdLGk9dGhpcy5vcHRpb25zW3RdfHx7fTt0aGlzLm9wdGlvbnNbdF09ZS5vcHRpb25zP28uZXh0ZW5kKGUub3B0aW9ucyxpKTppLHRoaXMubW9kZXNbdF09bmV3IGUodGhpcyl9LGwubGF5b3V0PWZ1bmN0aW9uKCl7cmV0dXJuIXRoaXMuX2lzTGF5b3V0SW5pdGVkJiZ0aGlzLl9nZXRPcHRpb24oXCJpbml0TGF5b3V0XCIpP3ZvaWQgdGhpcy5hcnJhbmdlKCk6dm9pZCB0aGlzLl9sYXlvdXQoKX0sbC5fbGF5b3V0PWZ1bmN0aW9uKCl7dmFyIHQ9dGhpcy5fZ2V0SXNJbnN0YW50KCk7dGhpcy5fcmVzZXRMYXlvdXQoKSx0aGlzLl9tYW5hZ2VTdGFtcHMoKSx0aGlzLmxheW91dEl0ZW1zKHRoaXMuZmlsdGVyZWRJdGVtcyx0KSx0aGlzLl9pc0xheW91dEluaXRlZD0hMH0sbC5hcnJhbmdlPWZ1bmN0aW9uKHQpe3RoaXMub3B0aW9uKHQpLHRoaXMuX2dldElzSW5zdGFudCgpO3ZhciBlPXRoaXMuX2ZpbHRlcih0aGlzLml0ZW1zKTt0aGlzLmZpbHRlcmVkSXRlbXM9ZS5tYXRjaGVzLHRoaXMuX2JpbmRBcnJhbmdlQ29tcGxldGUoKSx0aGlzLl9pc0luc3RhbnQ/dGhpcy5fbm9UcmFuc2l0aW9uKHRoaXMuX2hpZGVSZXZlYWwsW2VdKTp0aGlzLl9oaWRlUmV2ZWFsKGUpLHRoaXMuX3NvcnQoKSx0aGlzLl9sYXlvdXQoKX0sbC5faW5pdD1sLmFycmFuZ2UsbC5faGlkZVJldmVhbD1mdW5jdGlvbih0KXt0aGlzLnJldmVhbCh0Lm5lZWRSZXZlYWwpLHRoaXMuaGlkZSh0Lm5lZWRIaWRlKX0sbC5fZ2V0SXNJbnN0YW50PWZ1bmN0aW9uKCl7dmFyIHQ9dGhpcy5fZ2V0T3B0aW9uKFwibGF5b3V0SW5zdGFudFwiKSxlPXZvaWQgMCE9PXQ/dDohdGhpcy5faXNMYXlvdXRJbml0ZWQ7cmV0dXJuIHRoaXMuX2lzSW5zdGFudD1lLGV9LGwuX2JpbmRBcnJhbmdlQ29tcGxldGU9ZnVuY3Rpb24oKXtmdW5jdGlvbiB0KCl7ZSYmaSYmbiYmby5kaXNwYXRjaEV2ZW50KFwiYXJyYW5nZUNvbXBsZXRlXCIsbnVsbCxbby5maWx0ZXJlZEl0ZW1zXSl9dmFyIGUsaSxuLG89dGhpczt0aGlzLm9uY2UoXCJsYXlvdXRDb21wbGV0ZVwiLGZ1bmN0aW9uKCl7ZT0hMCx0KCl9KSx0aGlzLm9uY2UoXCJoaWRlQ29tcGxldGVcIixmdW5jdGlvbigpe2k9ITAsdCgpfSksdGhpcy5vbmNlKFwicmV2ZWFsQ29tcGxldGVcIixmdW5jdGlvbigpe249ITAsdCgpfSl9LGwuX2ZpbHRlcj1mdW5jdGlvbih0KXt2YXIgZT10aGlzLm9wdGlvbnMuZmlsdGVyO2U9ZXx8XCIqXCI7Zm9yKHZhciBpPVtdLG49W10sbz1bXSxzPXRoaXMuX2dldEZpbHRlclRlc3QoZSkscj0wO3I8dC5sZW5ndGg7cisrKXt2YXIgYT10W3JdO2lmKCFhLmlzSWdub3JlZCl7dmFyIHU9cyhhKTt1JiZpLnB1c2goYSksdSYmYS5pc0hpZGRlbj9uLnB1c2goYSk6dXx8YS5pc0hpZGRlbnx8by5wdXNoKGEpfX1yZXR1cm57bWF0Y2hlczppLG5lZWRSZXZlYWw6bixuZWVkSGlkZTpvfX0sbC5fZ2V0RmlsdGVyVGVzdD1mdW5jdGlvbih0KXtyZXR1cm4gdSYmdGhpcy5vcHRpb25zLmlzSlF1ZXJ5RmlsdGVyaW5nP2Z1bmN0aW9uKGUpe3JldHVybiB1KGUuZWxlbWVudCkuaXModCl9OlwiZnVuY3Rpb25cIj09dHlwZW9mIHQ/ZnVuY3Rpb24oZSl7cmV0dXJuIHQoZS5lbGVtZW50KX06ZnVuY3Rpb24oZSl7cmV0dXJuIG4oZS5lbGVtZW50LHQpfX0sbC51cGRhdGVTb3J0RGF0YT1mdW5jdGlvbih0KXt2YXIgZTt0Pyh0PW8ubWFrZUFycmF5KHQpLGU9dGhpcy5nZXRJdGVtcyh0KSk6ZT10aGlzLml0ZW1zLHRoaXMuX2dldFNvcnRlcnMoKSx0aGlzLl91cGRhdGVJdGVtc1NvcnREYXRhKGUpfSxsLl9nZXRTb3J0ZXJzPWZ1bmN0aW9uKCl7dmFyIHQ9dGhpcy5vcHRpb25zLmdldFNvcnREYXRhO2Zvcih2YXIgZSBpbiB0KXt2YXIgaT10W2VdO3RoaXMuX3NvcnRlcnNbZV09ZihpKX19LGwuX3VwZGF0ZUl0ZW1zU29ydERhdGE9ZnVuY3Rpb24odCl7Zm9yKHZhciBlPXQmJnQubGVuZ3RoLGk9MDtlJiZlPmk7aSsrKXt2YXIgbj10W2ldO24udXBkYXRlU29ydERhdGEoKX19O3ZhciBmPWZ1bmN0aW9uKCl7ZnVuY3Rpb24gdCh0KXtpZihcInN0cmluZ1wiIT10eXBlb2YgdClyZXR1cm4gdDt2YXIgaT1oKHQpLnNwbGl0KFwiIFwiKSxuPWlbMF0sbz1uLm1hdGNoKC9eXFxbKC4rKVxcXSQvKSxzPW8mJm9bMV0scj1lKHMsbiksYT1kLnNvcnREYXRhUGFyc2Vyc1tpWzFdXTtcbnJldHVybiB0PWE/ZnVuY3Rpb24odCl7cmV0dXJuIHQmJmEocih0KSl9OmZ1bmN0aW9uKHQpe3JldHVybiB0JiZyKHQpfX1mdW5jdGlvbiBlKHQsZSl7cmV0dXJuIHQ/ZnVuY3Rpb24oZSl7cmV0dXJuIGUuZ2V0QXR0cmlidXRlKHQpfTpmdW5jdGlvbih0KXt2YXIgaT10LnF1ZXJ5U2VsZWN0b3IoZSk7cmV0dXJuIGkmJmkudGV4dENvbnRlbnR9fXJldHVybiB0fSgpO2Quc29ydERhdGFQYXJzZXJzPXtwYXJzZUludDpmdW5jdGlvbih0KXtyZXR1cm4gcGFyc2VJbnQodCwxMCl9LHBhcnNlRmxvYXQ6ZnVuY3Rpb24odCl7cmV0dXJuIHBhcnNlRmxvYXQodCl9fSxsLl9zb3J0PWZ1bmN0aW9uKCl7dmFyIHQ9dGhpcy5vcHRpb25zLnNvcnRCeTtpZih0KXt2YXIgZT1bXS5jb25jYXQuYXBwbHkodCx0aGlzLnNvcnRIaXN0b3J5KSxpPWEoZSx0aGlzLm9wdGlvbnMuc29ydEFzY2VuZGluZyk7dGhpcy5maWx0ZXJlZEl0ZW1zLnNvcnQoaSksdCE9dGhpcy5zb3J0SGlzdG9yeVswXSYmdGhpcy5zb3J0SGlzdG9yeS51bnNoaWZ0KHQpfX0sbC5fbW9kZT1mdW5jdGlvbigpe3ZhciB0PXRoaXMub3B0aW9ucy5sYXlvdXRNb2RlLGU9dGhpcy5tb2Rlc1t0XTtpZighZSl0aHJvdyBuZXcgRXJyb3IoXCJObyBsYXlvdXQgbW9kZTogXCIrdCk7cmV0dXJuIGUub3B0aW9ucz10aGlzLm9wdGlvbnNbdF0sZX0sbC5fcmVzZXRMYXlvdXQ9ZnVuY3Rpb24oKXtlLnByb3RvdHlwZS5fcmVzZXRMYXlvdXQuY2FsbCh0aGlzKSx0aGlzLl9tb2RlKCkuX3Jlc2V0TGF5b3V0KCl9LGwuX2dldEl0ZW1MYXlvdXRQb3NpdGlvbj1mdW5jdGlvbih0KXtyZXR1cm4gdGhpcy5fbW9kZSgpLl9nZXRJdGVtTGF5b3V0UG9zaXRpb24odCl9LGwuX21hbmFnZVN0YW1wPWZ1bmN0aW9uKHQpe3RoaXMuX21vZGUoKS5fbWFuYWdlU3RhbXAodCl9LGwuX2dldENvbnRhaW5lclNpemU9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5fbW9kZSgpLl9nZXRDb250YWluZXJTaXplKCl9LGwubmVlZHNSZXNpemVMYXlvdXQ9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5fbW9kZSgpLm5lZWRzUmVzaXplTGF5b3V0KCl9LGwuYXBwZW5kZWQ9ZnVuY3Rpb24odCl7dmFyIGU9dGhpcy5hZGRJdGVtcyh0KTtpZihlLmxlbmd0aCl7dmFyIGk9dGhpcy5fZmlsdGVyUmV2ZWFsQWRkZWQoZSk7dGhpcy5maWx0ZXJlZEl0ZW1zPXRoaXMuZmlsdGVyZWRJdGVtcy5jb25jYXQoaSl9fSxsLnByZXBlbmRlZD1mdW5jdGlvbih0KXt2YXIgZT10aGlzLl9pdGVtaXplKHQpO2lmKGUubGVuZ3RoKXt0aGlzLl9yZXNldExheW91dCgpLHRoaXMuX21hbmFnZVN0YW1wcygpO3ZhciBpPXRoaXMuX2ZpbHRlclJldmVhbEFkZGVkKGUpO3RoaXMubGF5b3V0SXRlbXModGhpcy5maWx0ZXJlZEl0ZW1zKSx0aGlzLmZpbHRlcmVkSXRlbXM9aS5jb25jYXQodGhpcy5maWx0ZXJlZEl0ZW1zKSx0aGlzLml0ZW1zPWUuY29uY2F0KHRoaXMuaXRlbXMpfX0sbC5fZmlsdGVyUmV2ZWFsQWRkZWQ9ZnVuY3Rpb24odCl7dmFyIGU9dGhpcy5fZmlsdGVyKHQpO3JldHVybiB0aGlzLmhpZGUoZS5uZWVkSGlkZSksdGhpcy5yZXZlYWwoZS5tYXRjaGVzKSx0aGlzLmxheW91dEl0ZW1zKGUubWF0Y2hlcywhMCksZS5tYXRjaGVzfSxsLmluc2VydD1mdW5jdGlvbih0KXt2YXIgZT10aGlzLmFkZEl0ZW1zKHQpO2lmKGUubGVuZ3RoKXt2YXIgaSxuLG89ZS5sZW5ndGg7Zm9yKGk9MDtvPmk7aSsrKW49ZVtpXSx0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQobi5lbGVtZW50KTt2YXIgcz10aGlzLl9maWx0ZXIoZSkubWF0Y2hlcztmb3IoaT0wO28+aTtpKyspZVtpXS5pc0xheW91dEluc3RhbnQ9ITA7Zm9yKHRoaXMuYXJyYW5nZSgpLGk9MDtvPmk7aSsrKWRlbGV0ZSBlW2ldLmlzTGF5b3V0SW5zdGFudDt0aGlzLnJldmVhbChzKX19O3ZhciBjPWwucmVtb3ZlO3JldHVybiBsLnJlbW92ZT1mdW5jdGlvbih0KXt0PW8ubWFrZUFycmF5KHQpO3ZhciBlPXRoaXMuZ2V0SXRlbXModCk7Yy5jYWxsKHRoaXMsdCk7Zm9yKHZhciBpPWUmJmUubGVuZ3RoLG49MDtpJiZpPm47bisrKXt2YXIgcz1lW25dO28ucmVtb3ZlRnJvbSh0aGlzLmZpbHRlcmVkSXRlbXMscyl9fSxsLnNodWZmbGU9ZnVuY3Rpb24oKXtmb3IodmFyIHQ9MDt0PHRoaXMuaXRlbXMubGVuZ3RoO3QrKyl7dmFyIGU9dGhpcy5pdGVtc1t0XTtlLnNvcnREYXRhLnJhbmRvbT1NYXRoLnJhbmRvbSgpfXRoaXMub3B0aW9ucy5zb3J0Qnk9XCJyYW5kb21cIix0aGlzLl9zb3J0KCksdGhpcy5fbGF5b3V0KCl9LGwuX25vVHJhbnNpdGlvbj1mdW5jdGlvbih0LGUpe3ZhciBpPXRoaXMub3B0aW9ucy50cmFuc2l0aW9uRHVyYXRpb247dGhpcy5vcHRpb25zLnRyYW5zaXRpb25EdXJhdGlvbj0wO3ZhciBuPXQuYXBwbHkodGhpcyxlKTtyZXR1cm4gdGhpcy5vcHRpb25zLnRyYW5zaXRpb25EdXJhdGlvbj1pLG59LGwuZ2V0RmlsdGVyZWRJdGVtRWxlbWVudHM9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5maWx0ZXJlZEl0ZW1zLm1hcChmdW5jdGlvbih0KXtyZXR1cm4gdC5lbGVtZW50fSl9LGR9KTsiLCIvKipcbiAqIExvZGFzaCAoQ3VzdG9tIEJ1aWxkKVxuICpcbiAqIEBsaWNlbnNlXG4gKiBsb2Rhc2guY29tL2xpY2Vuc2UgfCBVbmRlcnNjb3JlLmpzIDEuOC4zIHVuZGVyc2NvcmVqcy5vcmcvTElDRU5TRVxuICogQnVpbGQ6IGBsb2Rhc2ggY29yZSAtbyAuL2Rpc3QvbG9kYXNoLmNvcmUuanNgXG4gKlxuICovXG47KGZ1bmN0aW9uKCl7ZnVuY3Rpb24gbihuKXtyZXR1cm4gSyhuKSYmcG4uY2FsbChuLFwiY2FsbGVlXCIpJiYhYm4uY2FsbChuLFwiY2FsbGVlXCIpfWZ1bmN0aW9uIHQobix0KXtyZXR1cm4gbi5wdXNoLmFwcGx5KG4sdCksbn1mdW5jdGlvbiByKG4pe3JldHVybiBmdW5jdGlvbih0KXtyZXR1cm4gbnVsbD09dD9ubjp0W25dfX1mdW5jdGlvbiBlKG4sdCxyLGUsdSl7cmV0dXJuIHUobixmdW5jdGlvbihuLHUsbyl7cj1lPyhlPWZhbHNlLG4pOnQocixuLHUsbyl9KSxyfWZ1bmN0aW9uIHUobix0KXtyZXR1cm4gZCh0LGZ1bmN0aW9uKHQpe3JldHVybiBuW3RdfSl9ZnVuY3Rpb24gbyhuKXtyZXR1cm4gbiBpbnN0YW5jZW9mIGk/bjpuZXcgaShuKX1mdW5jdGlvbiBpKG4sdCl7dGhpcy5fX3dyYXBwZWRfXz1uLHRoaXMuX19hY3Rpb25zX189W10sdGhpcy5fX2NoYWluX189ISF0fWZ1bmN0aW9uIGMobix0LHIsZSl7cmV0dXJuIG49PT1ubnx8TShuLGxuW3JdKSYmIXBuLmNhbGwoZSxyKT90Om59ZnVuY3Rpb24gZihuLHQscil7XG5pZih0eXBlb2YgbiE9XCJmdW5jdGlvblwiKXRocm93IG5ldyBUeXBlRXJyb3IoXCJFeHBlY3RlZCBhIGZ1bmN0aW9uXCIpO3JldHVybiBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7bi5hcHBseShubixyKX0sdCl9ZnVuY3Rpb24gYShuLHQpe3ZhciByPXRydWU7cmV0dXJuIG1uKG4sZnVuY3Rpb24obixlLHUpe3JldHVybiByPSEhdChuLGUsdSl9KSxyfWZ1bmN0aW9uIGwobix0LHIpe2Zvcih2YXIgZT0tMSx1PW4ubGVuZ3RoOysrZTx1Oyl7dmFyIG89bltlXSxpPXQobyk7aWYobnVsbCE9aSYmKGM9PT1ubj9pPT09aTpyKGksYykpKXZhciBjPWksZj1vfXJldHVybiBmfWZ1bmN0aW9uIHAobix0KXt2YXIgcj1bXTtyZXR1cm4gbW4obixmdW5jdGlvbihuLGUsdSl7dChuLGUsdSkmJnIucHVzaChuKX0pLHJ9ZnVuY3Rpb24gcyhuLHIsZSx1LG8pe3ZhciBpPS0xLGM9bi5sZW5ndGg7Zm9yKGV8fChlPUQpLG98fChvPVtdKTsrK2k8Yzspe3ZhciBmPW5baV07MDxyJiZlKGYpPzE8cj9zKGYsci0xLGUsdSxvKTp0KG8sZik6dXx8KG9bby5sZW5ndGhdPWYpO1xufXJldHVybiBvfWZ1bmN0aW9uIGgobix0KXtyZXR1cm4gbiYmT24obix0LEluKX1mdW5jdGlvbiB2KG4sdCl7cmV0dXJuIHAodCxmdW5jdGlvbih0KXtyZXR1cm4gVihuW3RdKX0pfWZ1bmN0aW9uIHkobix0KXtyZXR1cm4gbj50fWZ1bmN0aW9uIGIobix0LHIsZSx1KXtyZXR1cm4gbj09PXR8fChudWxsPT1ufHxudWxsPT10fHwhSChuKSYmIUsodCk/biE9PW4mJnQhPT10Omcobix0LHIsZSxiLHUpKX1mdW5jdGlvbiBnKG4sdCxyLGUsdSxvKXt2YXIgaT1ObihuKSxjPU5uKHQpLGY9XCJbb2JqZWN0IEFycmF5XVwiLGE9XCJbb2JqZWN0IEFycmF5XVwiO2l8fChmPWhuLmNhbGwobiksZj1cIltvYmplY3QgQXJndW1lbnRzXVwiPT1mP1wiW29iamVjdCBPYmplY3RdXCI6ZiksY3x8KGE9aG4uY2FsbCh0KSxhPVwiW29iamVjdCBBcmd1bWVudHNdXCI9PWE/XCJbb2JqZWN0IE9iamVjdF1cIjphKTt2YXIgbD1cIltvYmplY3QgT2JqZWN0XVwiPT1mLGM9XCJbb2JqZWN0IE9iamVjdF1cIj09YSxhPWY9PWE7b3x8KG89W10pO1xudmFyIHA9QW4obyxmdW5jdGlvbih0KXtyZXR1cm4gdFswXT09bn0pLHM9QW4obyxmdW5jdGlvbihuKXtyZXR1cm4gblswXT09dH0pO2lmKHAmJnMpcmV0dXJuIHBbMV09PXQ7aWYoby5wdXNoKFtuLHRdKSxvLnB1c2goW3Qsbl0pLGEmJiFsKXtpZihpKXI9QihuLHQscixlLHUsbyk7ZWxzZSBuOntzd2l0Y2goZil7Y2FzZVwiW29iamVjdCBCb29sZWFuXVwiOmNhc2VcIltvYmplY3QgRGF0ZV1cIjpjYXNlXCJbb2JqZWN0IE51bWJlcl1cIjpyPU0oK24sK3QpO2JyZWFrIG47Y2FzZVwiW29iamVjdCBFcnJvcl1cIjpyPW4ubmFtZT09dC5uYW1lJiZuLm1lc3NhZ2U9PXQubWVzc2FnZTticmVhayBuO2Nhc2VcIltvYmplY3QgUmVnRXhwXVwiOmNhc2VcIltvYmplY3QgU3RyaW5nXVwiOnI9bj09dCtcIlwiO2JyZWFrIG59cj1mYWxzZX1yZXR1cm4gby5wb3AoKSxyfXJldHVybiAxJnJ8fChpPWwmJnBuLmNhbGwobixcIl9fd3JhcHBlZF9fXCIpLGY9YyYmcG4uY2FsbCh0LFwiX193cmFwcGVkX19cIiksIWkmJiFmKT8hIWEmJihyPVIobix0LHIsZSx1LG8pLFxuby5wb3AoKSxyKTooaT1pP24udmFsdWUoKTpuLGY9Zj90LnZhbHVlKCk6dCxyPXUoaSxmLHIsZSxvKSxvLnBvcCgpLHIpfWZ1bmN0aW9uIF8obil7cmV0dXJuIHR5cGVvZiBuPT1cImZ1bmN0aW9uXCI/bjpudWxsPT1uP1k6KHR5cGVvZiBuPT1cIm9iamVjdFwiP206cikobil9ZnVuY3Rpb24gaihuLHQpe3JldHVybiBuPHR9ZnVuY3Rpb24gZChuLHQpe3ZhciByPS0xLGU9VShuKT9BcnJheShuLmxlbmd0aCk6W107cmV0dXJuIG1uKG4sZnVuY3Rpb24obix1LG8pe2VbKytyXT10KG4sdSxvKX0pLGV9ZnVuY3Rpb24gbShuKXt2YXIgdD1fbihuKTtyZXR1cm4gZnVuY3Rpb24ocil7dmFyIGU9dC5sZW5ndGg7aWYobnVsbD09cilyZXR1cm4hZTtmb3Iocj1PYmplY3Qocik7ZS0tOyl7dmFyIHU9dFtlXTtpZighKHUgaW4gciYmYihuW3VdLHJbdV0sMykpKXJldHVybiBmYWxzZX1yZXR1cm4gdHJ1ZX19ZnVuY3Rpb24gTyhuLHQpe3JldHVybiBuPU9iamVjdChuKSxHKHQsZnVuY3Rpb24odCxyKXtyZXR1cm4gciBpbiBuJiYodFtyXT1uW3JdKSxcbnR9LHt9KX1mdW5jdGlvbiB4KG4pe3JldHVybiB4bihxKG4sdm9pZCAwLFkpLG4rXCJcIil9ZnVuY3Rpb24gQShuLHQscil7dmFyIGU9LTEsdT1uLmxlbmd0aDtmb3IoMD50JiYodD0tdD51PzA6dSt0KSxyPXI+dT91OnIsMD5yJiYocis9dSksdT10PnI/MDpyLXQ+Pj4wLHQ+Pj49MCxyPUFycmF5KHUpOysrZTx1OylyW2VdPW5bZSt0XTtyZXR1cm4gcn1mdW5jdGlvbiBFKG4pe3JldHVybiBBKG4sMCxuLmxlbmd0aCl9ZnVuY3Rpb24gdyhuLHQpe3ZhciByO3JldHVybiBtbihuLGZ1bmN0aW9uKG4sZSx1KXtyZXR1cm4gcj10KG4sZSx1KSwhcn0pLCEhcn1mdW5jdGlvbiBrKG4scil7cmV0dXJuIEcocixmdW5jdGlvbihuLHIpe3JldHVybiByLmZ1bmMuYXBwbHkoci50aGlzQXJnLHQoW25dLHIuYXJncykpfSxuKX1mdW5jdGlvbiBOKG4sdCxyLGUpe3ZhciB1PSFyO3J8fChyPXt9KTtmb3IodmFyIG89LTEsaT10Lmxlbmd0aDsrK288aTspe3ZhciBjPXRbb10sZj1lP2UocltjXSxuW2NdLGMscixuKTpubjtcbmlmKGY9PT1ubiYmKGY9bltjXSksdSlyW2NdPWY7ZWxzZXt2YXIgYT1yLGw9YVtjXTtwbi5jYWxsKGEsYykmJk0obCxmKSYmKGYhPT1ubnx8YyBpbiBhKXx8KGFbY109Zil9fXJldHVybiByfWZ1bmN0aW9uIEYobil7cmV0dXJuIHgoZnVuY3Rpb24odCxyKXt2YXIgZT0tMSx1PXIubGVuZ3RoLG89MTx1P3JbdS0xXTpubixvPTM8bi5sZW5ndGgmJnR5cGVvZiBvPT1cImZ1bmN0aW9uXCI/KHUtLSxvKTpubjtmb3IodD1PYmplY3QodCk7KytlPHU7KXt2YXIgaT1yW2VdO2kmJm4odCxpLGUsbyl9cmV0dXJuIHR9KX1mdW5jdGlvbiBTKG4pe3JldHVybiBmdW5jdGlvbigpe3ZhciB0PWFyZ3VtZW50cyxyPWRuKG4ucHJvdG90eXBlKSx0PW4uYXBwbHkocix0KTtyZXR1cm4gSCh0KT90OnJ9fWZ1bmN0aW9uIFQobix0LHIpe2Z1bmN0aW9uIGUoKXtmb3IodmFyIG89LTEsaT1hcmd1bWVudHMubGVuZ3RoLGM9LTEsZj1yLmxlbmd0aCxhPUFycmF5KGYraSksbD10aGlzJiZ0aGlzIT09b24mJnRoaXMgaW5zdGFuY2VvZiBlP3U6bjsrK2M8ZjspYVtjXT1yW2NdO1xuZm9yKDtpLS07KWFbYysrXT1hcmd1bWVudHNbKytvXTtyZXR1cm4gbC5hcHBseSh0LGEpfWlmKHR5cGVvZiBuIT1cImZ1bmN0aW9uXCIpdGhyb3cgbmV3IFR5cGVFcnJvcihcIkV4cGVjdGVkIGEgZnVuY3Rpb25cIik7dmFyIHU9UyhuKTtyZXR1cm4gZX1mdW5jdGlvbiBCKG4sdCxyLGUsdSxvKXt2YXIgaT1uLmxlbmd0aCxjPXQubGVuZ3RoO2lmKGkhPWMmJiEoMSZyJiZjPmkpKXJldHVybiBmYWxzZTtmb3IodmFyIGM9LTEsZj10cnVlLGE9MiZyP1tdOm5uOysrYzxpOyl7dmFyIGw9bltjXSxwPXRbY107aWYodm9pZCAwIT09bm4pe2Y9ZmFsc2U7YnJlYWt9aWYoYSl7aWYoIXcodCxmdW5jdGlvbihuLHQpe2lmKCF6KGEsdCkmJihsPT09bnx8dShsLG4scixlLG8pKSlyZXR1cm4gYS5wdXNoKHQpfSkpe2Y9ZmFsc2U7YnJlYWt9fWVsc2UgaWYobCE9PXAmJiF1KGwscCxyLGUsbykpe2Y9ZmFsc2U7YnJlYWt9fXJldHVybiBmfWZ1bmN0aW9uIFIobix0LHIsZSx1LG8pe3ZhciBpPTEmcixjPUluKG4pLGY9Yy5sZW5ndGgsYT1Jbih0KS5sZW5ndGg7XG5pZihmIT1hJiYhaSlyZXR1cm4gZmFsc2U7Zm9yKHZhciBsPWY7bC0tOyl7dmFyIHA9Y1tsXTtpZighKGk/cCBpbiB0OnBuLmNhbGwodCxwKSkpcmV0dXJuIGZhbHNlfWZvcihhPXRydWU7KytsPGY7KXt2YXIgcD1jW2xdLHM9bltwXSxoPXRbcF07aWYodm9pZCAwIT09bm58fHMhPT1oJiYhdShzLGgscixlLG8pKXthPWZhbHNlO2JyZWFrfWl8fChpPVwiY29uc3RydWN0b3JcIj09cCl9cmV0dXJuIGEmJiFpJiYocj1uLmNvbnN0cnVjdG9yLGU9dC5jb25zdHJ1Y3RvcixyIT1lJiZcImNvbnN0cnVjdG9yXCJpbiBuJiZcImNvbnN0cnVjdG9yXCJpbiB0JiYhKHR5cGVvZiByPT1cImZ1bmN0aW9uXCImJnIgaW5zdGFuY2VvZiByJiZ0eXBlb2YgZT09XCJmdW5jdGlvblwiJiZlIGluc3RhbmNlb2YgZSkmJihhPWZhbHNlKSksYX1mdW5jdGlvbiBEKHQpe3JldHVybiBObih0KXx8bih0KX1mdW5jdGlvbiBJKG4pe3ZhciB0PVtdO2lmKG51bGwhPW4pZm9yKHZhciByIGluIE9iamVjdChuKSl0LnB1c2gocik7cmV0dXJuIHR9ZnVuY3Rpb24gcShuLHQscil7XG5yZXR1cm4gdD1qbih0PT09bm4/bi5sZW5ndGgtMTp0LDApLGZ1bmN0aW9uKCl7Zm9yKHZhciBlPWFyZ3VtZW50cyx1PS0xLG89am4oZS5sZW5ndGgtdCwwKSxpPUFycmF5KG8pOysrdTxvOylpW3VdPWVbdCt1XTtmb3IodT0tMSxvPUFycmF5KHQrMSk7Kyt1PHQ7KW9bdV09ZVt1XTtyZXR1cm4gb1t0XT1yKGkpLG4uYXBwbHkodGhpcyxvKX19ZnVuY3Rpb24gJChuKXtyZXR1cm4obnVsbD09bj8wOm4ubGVuZ3RoKT9zKG4sMSk6W119ZnVuY3Rpb24gUChuKXtyZXR1cm4gbiYmbi5sZW5ndGg/blswXTpubn1mdW5jdGlvbiB6KG4sdCxyKXt2YXIgZT1udWxsPT1uPzA6bi5sZW5ndGg7cj10eXBlb2Ygcj09XCJudW1iZXJcIj8wPnI/am4oZStyLDApOnI6MCxyPShyfHwwKS0xO2Zvcih2YXIgdT10PT09dDsrK3I8ZTspe3ZhciBvPW5bcl07aWYodT9vPT09dDpvIT09bylyZXR1cm4gcn1yZXR1cm4tMX1mdW5jdGlvbiBDKG4sdCl7cmV0dXJuIG1uKG4sXyh0KSl9ZnVuY3Rpb24gRyhuLHQscil7cmV0dXJuIGUobixfKHQpLHIsMz5hcmd1bWVudHMubGVuZ3RoLG1uKTtcbn1mdW5jdGlvbiBKKG4sdCl7dmFyIHI7aWYodHlwZW9mIHQhPVwiZnVuY3Rpb25cIil0aHJvdyBuZXcgVHlwZUVycm9yKFwiRXhwZWN0ZWQgYSBmdW5jdGlvblwiKTtyZXR1cm4gbj1GbihuKSxmdW5jdGlvbigpe3JldHVybiAwPC0tbiYmKHI9dC5hcHBseSh0aGlzLGFyZ3VtZW50cykpLDE+PW4mJih0PW5uKSxyfX1mdW5jdGlvbiBNKG4sdCl7cmV0dXJuIG49PT10fHxuIT09biYmdCE9PXR9ZnVuY3Rpb24gVShuKXt2YXIgdDtyZXR1cm4odD1udWxsIT1uKSYmKHQ9bi5sZW5ndGgsdD10eXBlb2YgdD09XCJudW1iZXJcIiYmLTE8dCYmMD09dCUxJiY5MDA3MTk5MjU0NzQwOTkxPj10KSx0JiYhVihuKX1mdW5jdGlvbiBWKG4pe3JldHVybiEhSChuKSYmKG49aG4uY2FsbChuKSxcIltvYmplY3QgRnVuY3Rpb25dXCI9PW58fFwiW29iamVjdCBHZW5lcmF0b3JGdW5jdGlvbl1cIj09bnx8XCJbb2JqZWN0IEFzeW5jRnVuY3Rpb25dXCI9PW58fFwiW29iamVjdCBQcm94eV1cIj09bil9ZnVuY3Rpb24gSChuKXt2YXIgdD10eXBlb2YgbjtcbnJldHVybiBudWxsIT1uJiYoXCJvYmplY3RcIj09dHx8XCJmdW5jdGlvblwiPT10KX1mdW5jdGlvbiBLKG4pe3JldHVybiBudWxsIT1uJiZ0eXBlb2Ygbj09XCJvYmplY3RcIn1mdW5jdGlvbiBMKG4pe3JldHVybiB0eXBlb2Ygbj09XCJudW1iZXJcInx8SyhuKSYmXCJbb2JqZWN0IE51bWJlcl1cIj09aG4uY2FsbChuKX1mdW5jdGlvbiBRKG4pe3JldHVybiB0eXBlb2Ygbj09XCJzdHJpbmdcInx8IU5uKG4pJiZLKG4pJiZcIltvYmplY3QgU3RyaW5nXVwiPT1obi5jYWxsKG4pfWZ1bmN0aW9uIFcobil7cmV0dXJuIHR5cGVvZiBuPT1cInN0cmluZ1wiP246bnVsbD09bj9cIlwiOm4rXCJcIn1mdW5jdGlvbiBYKG4pe3JldHVybiBudWxsPT1uP1tdOnUobixJbihuKSl9ZnVuY3Rpb24gWShuKXtyZXR1cm4gbn1mdW5jdGlvbiBaKG4scixlKXt2YXIgdT1JbihyKSxvPXYocix1KTtudWxsIT1lfHxIKHIpJiYoby5sZW5ndGh8fCF1Lmxlbmd0aCl8fChlPXIscj1uLG49dGhpcyxvPXYocixJbihyKSkpO3ZhciBpPSEoSChlKSYmXCJjaGFpblwiaW4gZSYmIWUuY2hhaW4pLGM9VihuKTtcbnJldHVybiBtbihvLGZ1bmN0aW9uKGUpe3ZhciB1PXJbZV07bltlXT11LGMmJihuLnByb3RvdHlwZVtlXT1mdW5jdGlvbigpe3ZhciByPXRoaXMuX19jaGFpbl9fO2lmKGl8fHIpe3ZhciBlPW4odGhpcy5fX3dyYXBwZWRfXyk7cmV0dXJuKGUuX19hY3Rpb25zX189RSh0aGlzLl9fYWN0aW9uc19fKSkucHVzaCh7ZnVuYzp1LGFyZ3M6YXJndW1lbnRzLHRoaXNBcmc6bn0pLGUuX19jaGFpbl9fPXIsZX1yZXR1cm4gdS5hcHBseShuLHQoW3RoaXMudmFsdWUoKV0sYXJndW1lbnRzKSl9KX0pLG59dmFyIG5uLHRuPTEvMCxybj0vWyY8PlwiJ10vZyxlbj1SZWdFeHAocm4uc291cmNlKSx1bj10eXBlb2Ygc2VsZj09XCJvYmplY3RcIiYmc2VsZiYmc2VsZi5PYmplY3Q9PT1PYmplY3QmJnNlbGYsb249dHlwZW9mIGdsb2JhbD09XCJvYmplY3RcIiYmZ2xvYmFsJiZnbG9iYWwuT2JqZWN0PT09T2JqZWN0JiZnbG9iYWx8fHVufHxGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCksY249KHVuPXR5cGVvZiBleHBvcnRzPT1cIm9iamVjdFwiJiZleHBvcnRzJiYhZXhwb3J0cy5ub2RlVHlwZSYmZXhwb3J0cykmJnR5cGVvZiBtb2R1bGU9PVwib2JqZWN0XCImJm1vZHVsZSYmIW1vZHVsZS5ub2RlVHlwZSYmbW9kdWxlLGZuPWZ1bmN0aW9uKG4pe1xucmV0dXJuIGZ1bmN0aW9uKHQpe3JldHVybiBudWxsPT1uP25uOm5bdF19fSh7XCImXCI6XCImYW1wO1wiLFwiPFwiOlwiJmx0O1wiLFwiPlwiOlwiJmd0O1wiLCdcIic6XCImcXVvdDtcIixcIidcIjpcIiYjMzk7XCJ9KSxhbj1BcnJheS5wcm90b3R5cGUsbG49T2JqZWN0LnByb3RvdHlwZSxwbj1sbi5oYXNPd25Qcm9wZXJ0eSxzbj0wLGhuPWxuLnRvU3RyaW5nLHZuPW9uLl8seW49T2JqZWN0LmNyZWF0ZSxibj1sbi5wcm9wZXJ0eUlzRW51bWVyYWJsZSxnbj1vbi5pc0Zpbml0ZSxfbj1mdW5jdGlvbihuLHQpe3JldHVybiBmdW5jdGlvbihyKXtyZXR1cm4gbih0KHIpKX19KE9iamVjdC5rZXlzLE9iamVjdCksam49TWF0aC5tYXgsZG49ZnVuY3Rpb24oKXtmdW5jdGlvbiBuKCl7fXJldHVybiBmdW5jdGlvbih0KXtyZXR1cm4gSCh0KT95bj95bih0KToobi5wcm90b3R5cGU9dCx0PW5ldyBuLG4ucHJvdG90eXBlPW5uLHQpOnt9fX0oKTtpLnByb3RvdHlwZT1kbihvLnByb3RvdHlwZSksaS5wcm90b3R5cGUuY29uc3RydWN0b3I9aTtcbnZhciBtbj1mdW5jdGlvbihuLHQpe3JldHVybiBmdW5jdGlvbihyLGUpe2lmKG51bGw9PXIpcmV0dXJuIHI7aWYoIVUocikpcmV0dXJuIG4ocixlKTtmb3IodmFyIHU9ci5sZW5ndGgsbz10P3U6LTEsaT1PYmplY3Qocik7KHQ/by0tOisrbzx1KSYmZmFsc2UhPT1lKGlbb10sbyxpKTspO3JldHVybiByfX0oaCksT249ZnVuY3Rpb24obil7cmV0dXJuIGZ1bmN0aW9uKHQscixlKXt2YXIgdT0tMSxvPU9iamVjdCh0KTtlPWUodCk7Zm9yKHZhciBpPWUubGVuZ3RoO2ktLTspe3ZhciBjPWVbbj9pOisrdV07aWYoZmFsc2U9PT1yKG9bY10sYyxvKSlicmVha31yZXR1cm4gdH19KCkseG49WSxBbj1mdW5jdGlvbihuKXtyZXR1cm4gZnVuY3Rpb24odCxyLGUpe3ZhciB1PU9iamVjdCh0KTtpZighVSh0KSl7dmFyIG89XyhyKTt0PUluKHQpLHI9ZnVuY3Rpb24obil7cmV0dXJuIG8odVtuXSxuLHUpfX1yZXR1cm4gcj1uKHQscixlKSwtMTxyP3Vbbz90W3JdOnJdOm5ufX0oZnVuY3Rpb24obix0LHIpe3ZhciBlPW51bGw9PW4/MDpuLmxlbmd0aDtcbmlmKCFlKXJldHVybi0xO3I9bnVsbD09cj8wOkZuKHIpLDA+ciYmKHI9am4oZStyLDApKTtuOntmb3IodD1fKHQpLGU9bi5sZW5ndGgscis9LTE7KytyPGU7KWlmKHQobltyXSxyLG4pKXtuPXI7YnJlYWsgbn1uPS0xfXJldHVybiBufSksRW49eChmdW5jdGlvbihuLHQscil7cmV0dXJuIFQobix0LHIpfSksd249eChmdW5jdGlvbihuLHQpe3JldHVybiBmKG4sMSx0KX0pLGtuPXgoZnVuY3Rpb24obix0LHIpe3JldHVybiBmKG4sU24odCl8fDAscil9KSxObj1BcnJheS5pc0FycmF5LEZuPU51bWJlcixTbj1OdW1iZXIsVG49RihmdW5jdGlvbihuLHQpe04odCxfbih0KSxuKX0pLEJuPUYoZnVuY3Rpb24obix0KXtOKHQsSSh0KSxuKX0pLFJuPUYoZnVuY3Rpb24obix0LHIsZSl7Tih0LHFuKHQpLG4sZSl9KSxEbj14KGZ1bmN0aW9uKG4pe3JldHVybiBuLnB1c2gobm4sYyksUm4uYXBwbHkobm4sbil9KSxJbj1fbixxbj1JLCRuPWZ1bmN0aW9uKG4pe3JldHVybiB4bihxKG4sbm4sJCksbitcIlwiKTtcbn0oZnVuY3Rpb24obix0KXtyZXR1cm4gbnVsbD09bj97fTpPKG4sdCl9KTtvLmFzc2lnbkluPUJuLG8uYmVmb3JlPUosby5iaW5kPUVuLG8uY2hhaW49ZnVuY3Rpb24obil7cmV0dXJuIG49byhuKSxuLl9fY2hhaW5fXz10cnVlLG59LG8uY29tcGFjdD1mdW5jdGlvbihuKXtyZXR1cm4gcChuLEJvb2xlYW4pfSxvLmNvbmNhdD1mdW5jdGlvbigpe3ZhciBuPWFyZ3VtZW50cy5sZW5ndGg7aWYoIW4pcmV0dXJuW107Zm9yKHZhciByPUFycmF5KG4tMSksZT1hcmd1bWVudHNbMF07bi0tOylyW24tMV09YXJndW1lbnRzW25dO3JldHVybiB0KE5uKGUpP0UoZSk6W2VdLHMociwxKSl9LG8uY3JlYXRlPWZ1bmN0aW9uKG4sdCl7dmFyIHI9ZG4obik7cmV0dXJuIG51bGw9PXQ/cjpUbihyLHQpfSxvLmRlZmF1bHRzPURuLG8uZGVmZXI9d24sby5kZWxheT1rbixvLmZpbHRlcj1mdW5jdGlvbihuLHQpe3JldHVybiBwKG4sXyh0KSl9LG8uZmxhdHRlbj0kLG8uZmxhdHRlbkRlZXA9ZnVuY3Rpb24obil7XG5yZXR1cm4obnVsbD09bj8wOm4ubGVuZ3RoKT9zKG4sdG4pOltdfSxvLml0ZXJhdGVlPV8sby5rZXlzPUluLG8ubWFwPWZ1bmN0aW9uKG4sdCl7cmV0dXJuIGQobixfKHQpKX0sby5tYXRjaGVzPWZ1bmN0aW9uKG4pe3JldHVybiBtKFRuKHt9LG4pKX0sby5taXhpbj1aLG8ubmVnYXRlPWZ1bmN0aW9uKG4pe2lmKHR5cGVvZiBuIT1cImZ1bmN0aW9uXCIpdGhyb3cgbmV3IFR5cGVFcnJvcihcIkV4cGVjdGVkIGEgZnVuY3Rpb25cIik7cmV0dXJuIGZ1bmN0aW9uKCl7cmV0dXJuIW4uYXBwbHkodGhpcyxhcmd1bWVudHMpfX0sby5vbmNlPWZ1bmN0aW9uKG4pe3JldHVybiBKKDIsbil9LG8ucGljaz0kbixvLnNsaWNlPWZ1bmN0aW9uKG4sdCxyKXt2YXIgZT1udWxsPT1uPzA6bi5sZW5ndGg7cmV0dXJuIHI9cj09PW5uP2U6K3IsZT9BKG4sbnVsbD09dD8wOit0LHIpOltdfSxvLnNvcnRCeT1mdW5jdGlvbihuLHQpe3ZhciBlPTA7cmV0dXJuIHQ9Xyh0KSxkKGQobixmdW5jdGlvbihuLHIsdSl7cmV0dXJue1xudmFsdWU6bixpbmRleDplKyssY3JpdGVyaWE6dChuLHIsdSl9fSkuc29ydChmdW5jdGlvbihuLHQpe3ZhciByO246e3I9bi5jcml0ZXJpYTt2YXIgZT10LmNyaXRlcmlhO2lmKHIhPT1lKXt2YXIgdT1yIT09bm4sbz1udWxsPT09cixpPXI9PT1yLGM9ZSE9PW5uLGY9bnVsbD09PWUsYT1lPT09ZTtpZighZiYmcj5lfHxvJiZjJiZhfHwhdSYmYXx8IWkpe3I9MTticmVhayBufWlmKCFvJiZyPGV8fGYmJnUmJml8fCFjJiZpfHwhYSl7cj0tMTticmVhayBufX1yPTB9cmV0dXJuIHJ8fG4uaW5kZXgtdC5pbmRleH0pLHIoXCJ2YWx1ZVwiKSl9LG8udGFwPWZ1bmN0aW9uKG4sdCl7cmV0dXJuIHQobiksbn0sby50aHJ1PWZ1bmN0aW9uKG4sdCl7cmV0dXJuIHQobil9LG8udG9BcnJheT1mdW5jdGlvbihuKXtyZXR1cm4gVShuKT9uLmxlbmd0aD9FKG4pOltdOlgobil9LG8udmFsdWVzPVgsby5leHRlbmQ9Qm4sWihvLG8pLG8uY2xvbmU9ZnVuY3Rpb24obil7cmV0dXJuIEgobik/Tm4obik/RShuKTpOKG4sX24obikpOm47XG59LG8uZXNjYXBlPWZ1bmN0aW9uKG4pe3JldHVybihuPVcobikpJiZlbi50ZXN0KG4pP24ucmVwbGFjZShybixmbik6bn0sby5ldmVyeT1mdW5jdGlvbihuLHQscil7cmV0dXJuIHQ9cj9ubjp0LGEobixfKHQpKX0sby5maW5kPUFuLG8uZm9yRWFjaD1DLG8uaGFzPWZ1bmN0aW9uKG4sdCl7cmV0dXJuIG51bGwhPW4mJnBuLmNhbGwobix0KX0sby5oZWFkPVAsby5pZGVudGl0eT1ZLG8uaW5kZXhPZj16LG8uaXNBcmd1bWVudHM9bixvLmlzQXJyYXk9Tm4sby5pc0Jvb2xlYW49ZnVuY3Rpb24obil7cmV0dXJuIHRydWU9PT1ufHxmYWxzZT09PW58fEsobikmJlwiW29iamVjdCBCb29sZWFuXVwiPT1obi5jYWxsKG4pfSxvLmlzRGF0ZT1mdW5jdGlvbihuKXtyZXR1cm4gSyhuKSYmXCJbb2JqZWN0IERhdGVdXCI9PWhuLmNhbGwobil9LG8uaXNFbXB0eT1mdW5jdGlvbih0KXtyZXR1cm4gVSh0KSYmKE5uKHQpfHxRKHQpfHxWKHQuc3BsaWNlKXx8bih0KSk/IXQubGVuZ3RoOiFfbih0KS5sZW5ndGh9LG8uaXNFcXVhbD1mdW5jdGlvbihuLHQpe1xucmV0dXJuIGIobix0KX0sby5pc0Zpbml0ZT1mdW5jdGlvbihuKXtyZXR1cm4gdHlwZW9mIG49PVwibnVtYmVyXCImJmduKG4pfSxvLmlzRnVuY3Rpb249VixvLmlzTmFOPWZ1bmN0aW9uKG4pe3JldHVybiBMKG4pJiZuIT0rbn0sby5pc051bGw9ZnVuY3Rpb24obil7cmV0dXJuIG51bGw9PT1ufSxvLmlzTnVtYmVyPUwsby5pc09iamVjdD1ILG8uaXNSZWdFeHA9ZnVuY3Rpb24obil7cmV0dXJuIEsobikmJlwiW29iamVjdCBSZWdFeHBdXCI9PWhuLmNhbGwobil9LG8uaXNTdHJpbmc9USxvLmlzVW5kZWZpbmVkPWZ1bmN0aW9uKG4pe3JldHVybiBuPT09bm59LG8ubGFzdD1mdW5jdGlvbihuKXt2YXIgdD1udWxsPT1uPzA6bi5sZW5ndGg7cmV0dXJuIHQ/blt0LTFdOm5ufSxvLm1heD1mdW5jdGlvbihuKXtyZXR1cm4gbiYmbi5sZW5ndGg/bChuLFkseSk6bm59LG8ubWluPWZ1bmN0aW9uKG4pe3JldHVybiBuJiZuLmxlbmd0aD9sKG4sWSxqKTpubn0sby5ub0NvbmZsaWN0PWZ1bmN0aW9uKCl7cmV0dXJuIG9uLl89PT10aGlzJiYob24uXz12biksXG50aGlzfSxvLm5vb3A9ZnVuY3Rpb24oKXt9LG8ucmVkdWNlPUcsby5yZXN1bHQ9ZnVuY3Rpb24obix0LHIpe3JldHVybiB0PW51bGw9PW4/bm46blt0XSx0PT09bm4mJih0PXIpLFYodCk/dC5jYWxsKG4pOnR9LG8uc2l6ZT1mdW5jdGlvbihuKXtyZXR1cm4gbnVsbD09bj8wOihuPVUobik/bjpfbihuKSxuLmxlbmd0aCl9LG8uc29tZT1mdW5jdGlvbihuLHQscil7cmV0dXJuIHQ9cj9ubjp0LHcobixfKHQpKX0sby51bmlxdWVJZD1mdW5jdGlvbihuKXt2YXIgdD0rK3NuO3JldHVybiBXKG4pK3R9LG8uZWFjaD1DLG8uZmlyc3Q9UCxaKG8sZnVuY3Rpb24oKXt2YXIgbj17fTtyZXR1cm4gaChvLGZ1bmN0aW9uKHQscil7cG4uY2FsbChvLnByb3RvdHlwZSxyKXx8KG5bcl09dCl9KSxufSgpLHtjaGFpbjpmYWxzZX0pLG8uVkVSU0lPTj1cIjQuMTcuMlwiLG1uKFwicG9wIGpvaW4gcmVwbGFjZSByZXZlcnNlIHNwbGl0IHB1c2ggc2hpZnQgc29ydCBzcGxpY2UgdW5zaGlmdFwiLnNwbGl0KFwiIFwiKSxmdW5jdGlvbihuKXtcbnZhciB0PSgvXig/OnJlcGxhY2V8c3BsaXQpJC8udGVzdChuKT9TdHJpbmcucHJvdG90eXBlOmFuKVtuXSxyPS9eKD86cHVzaHxzb3J0fHVuc2hpZnQpJC8udGVzdChuKT9cInRhcFwiOlwidGhydVwiLGU9L14oPzpwb3B8am9pbnxyZXBsYWNlfHNoaWZ0KSQvLnRlc3Qobik7by5wcm90b3R5cGVbbl09ZnVuY3Rpb24oKXt2YXIgbj1hcmd1bWVudHM7aWYoZSYmIXRoaXMuX19jaGFpbl9fKXt2YXIgdT10aGlzLnZhbHVlKCk7cmV0dXJuIHQuYXBwbHkoTm4odSk/dTpbXSxuKX1yZXR1cm4gdGhpc1tyXShmdW5jdGlvbihyKXtyZXR1cm4gdC5hcHBseShObihyKT9yOltdLG4pfSl9fSksby5wcm90b3R5cGUudG9KU09OPW8ucHJvdG90eXBlLnZhbHVlT2Y9by5wcm90b3R5cGUudmFsdWU9ZnVuY3Rpb24oKXtyZXR1cm4gayh0aGlzLl9fd3JhcHBlZF9fLHRoaXMuX19hY3Rpb25zX18pfSx0eXBlb2YgZGVmaW5lPT1cImZ1bmN0aW9uXCImJnR5cGVvZiBkZWZpbmUuYW1kPT1cIm9iamVjdFwiJiZkZWZpbmUuYW1kPyhvbi5fPW8sXG5kZWZpbmUoZnVuY3Rpb24oKXtyZXR1cm4gb30pKTpjbj8oKGNuLmV4cG9ydHM9bykuXz1vLHVuLl89byk6b24uXz1vfSkuY2FsbCh0aGlzKTtcbiIsIi8qXG4gKiBTd2lwZSAyLjBcbiAqXG4gKiBCcmFkIEJpcmRzYWxsXG4gKiBDb3B5cmlnaHQgMjAxMywgTUlUIExpY2Vuc2VcbiAqXG4qL1xuXG5mdW5jdGlvbiBTd2lwZShjb250YWluZXIsIG9wdGlvbnMpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgLy8gdXRpbGl0aWVzXG4gIHZhciBub29wID0gZnVuY3Rpb24oKSB7fTsgLy8gc2ltcGxlIG5vIG9wZXJhdGlvbiBmdW5jdGlvblxuICB2YXIgb2ZmbG9hZEZuID0gZnVuY3Rpb24oZm4pIHsgc2V0VGltZW91dChmbiB8fCBub29wLCAwKTsgfTsgLy8gb2ZmbG9hZCBhIGZ1bmN0aW9ucyBleGVjdXRpb25cblxuICAvLyBjaGVjayBicm93c2VyIGNhcGFiaWxpdGllc1xuICB2YXIgYnJvd3NlciA9IHtcbiAgICBhZGRFdmVudExpc3RlbmVyOiAhIXdpbmRvdy5hZGRFdmVudExpc3RlbmVyLFxuICAgIHRvdWNoOiAoJ29udG91Y2hzdGFydCcgaW4gd2luZG93KSB8fCB3aW5kb3cuRG9jdW1lbnRUb3VjaCAmJiBkb2N1bWVudCBpbnN0YW5jZW9mIERvY3VtZW50VG91Y2gsXG4gICAgdHJhbnNpdGlvbnM6IChmdW5jdGlvbih0ZW1wKSB7XG4gICAgICB2YXIgcHJvcHMgPSBbJ3RyYW5zaXRpb25Qcm9wZXJ0eScsICdXZWJraXRUcmFuc2l0aW9uJywgJ01velRyYW5zaXRpb24nLCAnT1RyYW5zaXRpb24nLCAnbXNUcmFuc2l0aW9uJ107XG4gICAgICBmb3IgKCB2YXIgaSBpbiBwcm9wcyApIGlmICh0ZW1wLnN0eWxlWyBwcm9wc1tpXSBdICE9PSB1bmRlZmluZWQpIHJldHVybiB0cnVlO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N3aXBlJykpXG4gIH07XG5cbiAgLy8gcXVpdCBpZiBubyByb290IGVsZW1lbnRcbiAgaWYgKCFjb250YWluZXIpIHJldHVybjtcbiAgdmFyIGVsZW1lbnQgPSBjb250YWluZXIuY2hpbGRyZW5bMF07XG4gIHZhciBzbGlkZXMsIHNsaWRlUG9zLCB3aWR0aCwgbGVuZ3RoO1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgdmFyIGluZGV4ID0gcGFyc2VJbnQob3B0aW9ucy5zdGFydFNsaWRlLCAxMCkgfHwgMDtcbiAgdmFyIHNwZWVkID0gb3B0aW9ucy5zcGVlZCB8fCAzMDA7XG4gIG9wdGlvbnMuY29udGludW91cyA9IG9wdGlvbnMuY29udGludW91cyAhPT0gdW5kZWZpbmVkID8gb3B0aW9ucy5jb250aW51b3VzIDogdHJ1ZTtcblxuICBmdW5jdGlvbiBzZXR1cCgpIHtcblxuICAgIC8vIGNhY2hlIHNsaWRlc1xuICAgIHNsaWRlcyA9IGVsZW1lbnQuY2hpbGRyZW47XG4gICAgbGVuZ3RoID0gc2xpZGVzLmxlbmd0aDtcblxuICAgIC8vIHNldCBjb250aW51b3VzIHRvIGZhbHNlIGlmIG9ubHkgb25lIHNsaWRlXG4gICAgaWYgKHNsaWRlcy5sZW5ndGggPCAyKSBvcHRpb25zLmNvbnRpbnVvdXMgPSBmYWxzZTtcblxuICAgIC8vc3BlY2lhbCBjYXNlIGlmIHR3byBzbGlkZXNcbiAgICBpZiAoYnJvd3Nlci50cmFuc2l0aW9ucyAmJiBvcHRpb25zLmNvbnRpbnVvdXMgJiYgc2xpZGVzLmxlbmd0aCA8IDMpIHtcbiAgICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQoc2xpZGVzWzBdLmNsb25lTm9kZSh0cnVlKSk7XG4gICAgICBlbGVtZW50LmFwcGVuZENoaWxkKGVsZW1lbnQuY2hpbGRyZW5bMV0uY2xvbmVOb2RlKHRydWUpKTtcbiAgICAgIHNsaWRlcyA9IGVsZW1lbnQuY2hpbGRyZW47XG4gICAgfVxuXG4gICAgLy8gY3JlYXRlIGFuIGFycmF5IHRvIHN0b3JlIGN1cnJlbnQgcG9zaXRpb25zIG9mIGVhY2ggc2xpZGVcbiAgICBzbGlkZVBvcyA9IG5ldyBBcnJheShzbGlkZXMubGVuZ3RoKTtcblxuICAgIC8vIGRldGVybWluZSB3aWR0aCBvZiBlYWNoIHNsaWRlXG4gICAgd2lkdGggPSBjb250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGggfHwgY29udGFpbmVyLm9mZnNldFdpZHRoO1xuXG4gICAgZWxlbWVudC5zdHlsZS53aWR0aCA9IChzbGlkZXMubGVuZ3RoICogd2lkdGgpICsgJ3B4JztcblxuICAgIC8vIHN0YWNrIGVsZW1lbnRzXG4gICAgdmFyIHBvcyA9IHNsaWRlcy5sZW5ndGg7XG4gICAgd2hpbGUocG9zLS0pIHtcblxuICAgICAgdmFyIHNsaWRlID0gc2xpZGVzW3Bvc107XG5cbiAgICAgIHNsaWRlLnN0eWxlLndpZHRoID0gd2lkdGggKyAncHgnO1xuICAgICAgc2xpZGUuc2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JywgcG9zKTtcblxuICAgICAgaWYgKGJyb3dzZXIudHJhbnNpdGlvbnMpIHtcbiAgICAgICAgc2xpZGUuc3R5bGUubGVmdCA9IChwb3MgKiAtd2lkdGgpICsgJ3B4JztcbiAgICAgICAgbW92ZShwb3MsIGluZGV4ID4gcG9zID8gLXdpZHRoIDogKGluZGV4IDwgcG9zID8gd2lkdGggOiAwKSwgMCk7XG4gICAgICB9XG5cbiAgICB9XG5cbiAgICAvLyByZXBvc2l0aW9uIGVsZW1lbnRzIGJlZm9yZSBhbmQgYWZ0ZXIgaW5kZXhcbiAgICBpZiAob3B0aW9ucy5jb250aW51b3VzICYmIGJyb3dzZXIudHJhbnNpdGlvbnMpIHtcbiAgICAgIG1vdmUoY2lyY2xlKGluZGV4LTEpLCAtd2lkdGgsIDApO1xuICAgICAgbW92ZShjaXJjbGUoaW5kZXgrMSksIHdpZHRoLCAwKTtcbiAgICB9XG5cbiAgICBpZiAoIWJyb3dzZXIudHJhbnNpdGlvbnMpIGVsZW1lbnQuc3R5bGUubGVmdCA9IChpbmRleCAqIC13aWR0aCkgKyAncHgnO1xuXG4gICAgY29udGFpbmVyLnN0eWxlLnZpc2liaWxpdHkgPSAndmlzaWJsZSc7XG5cbiAgfVxuXG4gIGZ1bmN0aW9uIHByZXYoKSB7XG5cbiAgICBpZiAob3B0aW9ucy5jb250aW51b3VzKSBzbGlkZShpbmRleC0xKTtcbiAgICBlbHNlIGlmIChpbmRleCkgc2xpZGUoaW5kZXgtMSk7XG5cbiAgfVxuXG4gIGZ1bmN0aW9uIG5leHQoKSB7XG5cbiAgICBpZiAob3B0aW9ucy5jb250aW51b3VzKSBzbGlkZShpbmRleCsxKTtcbiAgICBlbHNlIGlmIChpbmRleCA8IHNsaWRlcy5sZW5ndGggLSAxKSBzbGlkZShpbmRleCsxKTtcblxuICB9XG5cbiAgZnVuY3Rpb24gY2lyY2xlKGluZGV4KSB7XG5cbiAgICAvLyBhIHNpbXBsZSBwb3NpdGl2ZSBtb2R1bG8gdXNpbmcgc2xpZGVzLmxlbmd0aFxuICAgIHJldHVybiAoc2xpZGVzLmxlbmd0aCArIChpbmRleCAlIHNsaWRlcy5sZW5ndGgpKSAlIHNsaWRlcy5sZW5ndGg7XG5cbiAgfVxuXG4gIGZ1bmN0aW9uIHNsaWRlKHRvLCBzbGlkZVNwZWVkKSB7XG5cbiAgICAvLyBkbyBub3RoaW5nIGlmIGFscmVhZHkgb24gcmVxdWVzdGVkIHNsaWRlXG4gICAgaWYgKGluZGV4ID09IHRvKSByZXR1cm47XG5cbiAgICBpZiAoYnJvd3Nlci50cmFuc2l0aW9ucykge1xuXG4gICAgICB2YXIgZGlyZWN0aW9uID0gTWF0aC5hYnMoaW5kZXgtdG8pIC8gKGluZGV4LXRvKTsgLy8gMTogYmFja3dhcmQsIC0xOiBmb3J3YXJkXG5cbiAgICAgIC8vIGdldCB0aGUgYWN0dWFsIHBvc2l0aW9uIG9mIHRoZSBzbGlkZVxuICAgICAgaWYgKG9wdGlvbnMuY29udGludW91cykge1xuICAgICAgICB2YXIgbmF0dXJhbF9kaXJlY3Rpb24gPSBkaXJlY3Rpb247XG4gICAgICAgIGRpcmVjdGlvbiA9IC1zbGlkZVBvc1tjaXJjbGUodG8pXSAvIHdpZHRoO1xuXG4gICAgICAgIC8vIGlmIGdvaW5nIGZvcndhcmQgYnV0IHRvIDwgaW5kZXgsIHVzZSB0byA9IHNsaWRlcy5sZW5ndGggKyB0b1xuICAgICAgICAvLyBpZiBnb2luZyBiYWNrd2FyZCBidXQgdG8gPiBpbmRleCwgdXNlIHRvID0gLXNsaWRlcy5sZW5ndGggKyB0b1xuICAgICAgICBpZiAoZGlyZWN0aW9uICE9PSBuYXR1cmFsX2RpcmVjdGlvbikgdG8gPSAgLWRpcmVjdGlvbiAqIHNsaWRlcy5sZW5ndGggKyB0bztcblxuICAgICAgfVxuXG4gICAgICB2YXIgZGlmZiA9IE1hdGguYWJzKGluZGV4LXRvKSAtIDE7XG5cbiAgICAgIC8vIG1vdmUgYWxsIHRoZSBzbGlkZXMgYmV0d2VlbiBpbmRleCBhbmQgdG8gaW4gdGhlIHJpZ2h0IGRpcmVjdGlvblxuICAgICAgd2hpbGUgKGRpZmYtLSkgbW92ZSggY2lyY2xlKCh0byA+IGluZGV4ID8gdG8gOiBpbmRleCkgLSBkaWZmIC0gMSksIHdpZHRoICogZGlyZWN0aW9uLCAwKTtcblxuICAgICAgdG8gPSBjaXJjbGUodG8pO1xuXG4gICAgICBtb3ZlKGluZGV4LCB3aWR0aCAqIGRpcmVjdGlvbiwgc2xpZGVTcGVlZCB8fCBzcGVlZCk7XG4gICAgICBtb3ZlKHRvLCAwLCBzbGlkZVNwZWVkIHx8IHNwZWVkKTtcblxuICAgICAgaWYgKG9wdGlvbnMuY29udGludW91cykgbW92ZShjaXJjbGUodG8gLSBkaXJlY3Rpb24pLCAtKHdpZHRoICogZGlyZWN0aW9uKSwgMCk7IC8vIHdlIG5lZWQgdG8gZ2V0IHRoZSBuZXh0IGluIHBsYWNlXG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICB0byA9IGNpcmNsZSh0byk7XG4gICAgICBhbmltYXRlKGluZGV4ICogLXdpZHRoLCB0byAqIC13aWR0aCwgc2xpZGVTcGVlZCB8fCBzcGVlZCk7XG4gICAgICAvL25vIGZhbGxiYWNrIGZvciBhIGNpcmN1bGFyIGNvbnRpbnVvdXMgaWYgdGhlIGJyb3dzZXIgZG9lcyBub3QgYWNjZXB0IHRyYW5zaXRpb25zXG4gICAgfVxuXG4gICAgaW5kZXggPSB0bztcbiAgICBvZmZsb2FkRm4ob3B0aW9ucy5jYWxsYmFjayAmJiBvcHRpb25zLmNhbGxiYWNrKGluZGV4LCBzbGlkZXNbaW5kZXhdKSk7XG4gIH1cblxuICBmdW5jdGlvbiBtb3ZlKGluZGV4LCBkaXN0LCBzcGVlZCkge1xuXG4gICAgdHJhbnNsYXRlKGluZGV4LCBkaXN0LCBzcGVlZCk7XG4gICAgc2xpZGVQb3NbaW5kZXhdID0gZGlzdDtcblxuICB9XG5cbiAgZnVuY3Rpb24gdHJhbnNsYXRlKGluZGV4LCBkaXN0LCBzcGVlZCkge1xuXG4gICAgdmFyIHNsaWRlID0gc2xpZGVzW2luZGV4XTtcbiAgICB2YXIgc3R5bGUgPSBzbGlkZSAmJiBzbGlkZS5zdHlsZTtcblxuICAgIGlmICghc3R5bGUpIHJldHVybjtcblxuICAgIHN0eWxlLndlYmtpdFRyYW5zaXRpb25EdXJhdGlvbiA9XG4gICAgc3R5bGUuTW96VHJhbnNpdGlvbkR1cmF0aW9uID1cbiAgICBzdHlsZS5tc1RyYW5zaXRpb25EdXJhdGlvbiA9XG4gICAgc3R5bGUuT1RyYW5zaXRpb25EdXJhdGlvbiA9XG4gICAgc3R5bGUudHJhbnNpdGlvbkR1cmF0aW9uID0gc3BlZWQgKyAnbXMnO1xuXG4gICAgc3R5bGUud2Via2l0VHJhbnNmb3JtID0gJ3RyYW5zbGF0ZSgnICsgZGlzdCArICdweCwwKScgKyAndHJhbnNsYXRlWigwKSc7XG4gICAgc3R5bGUubXNUcmFuc2Zvcm0gPVxuICAgIHN0eWxlLk1velRyYW5zZm9ybSA9XG4gICAgc3R5bGUuT1RyYW5zZm9ybSA9ICd0cmFuc2xhdGVYKCcgKyBkaXN0ICsgJ3B4KSc7XG5cbiAgfVxuXG4gIGZ1bmN0aW9uIGFuaW1hdGUoZnJvbSwgdG8sIHNwZWVkKSB7XG5cbiAgICAvLyBpZiBub3QgYW4gYW5pbWF0aW9uLCBqdXN0IHJlcG9zaXRpb25cbiAgICBpZiAoIXNwZWVkKSB7XG5cbiAgICAgIGVsZW1lbnQuc3R5bGUubGVmdCA9IHRvICsgJ3B4JztcbiAgICAgIHJldHVybjtcblxuICAgIH1cblxuICAgIHZhciBzdGFydCA9ICtuZXcgRGF0ZTtcblxuICAgIHZhciB0aW1lciA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xuXG4gICAgICB2YXIgdGltZUVsYXAgPSArbmV3IERhdGUgLSBzdGFydDtcblxuICAgICAgaWYgKHRpbWVFbGFwID4gc3BlZWQpIHtcblxuICAgICAgICBlbGVtZW50LnN0eWxlLmxlZnQgPSB0byArICdweCc7XG5cbiAgICAgICAgaWYgKGRlbGF5KSBiZWdpbigpO1xuXG4gICAgICAgIG9wdGlvbnMudHJhbnNpdGlvbkVuZCAmJiBvcHRpb25zLnRyYW5zaXRpb25FbmQuY2FsbChldmVudCwgaW5kZXgsIHNsaWRlc1tpbmRleF0pO1xuXG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGltZXIpO1xuICAgICAgICByZXR1cm47XG5cbiAgICAgIH1cblxuICAgICAgZWxlbWVudC5zdHlsZS5sZWZ0ID0gKCggKHRvIC0gZnJvbSkgKiAoTWF0aC5mbG9vcigodGltZUVsYXAgLyBzcGVlZCkgKiAxMDApIC8gMTAwKSApICsgZnJvbSkgKyAncHgnO1xuXG4gICAgfSwgNCk7XG5cbiAgfVxuXG4gIC8vIHNldHVwIGF1dG8gc2xpZGVzaG93XG4gIHZhciBkZWxheSA9IG9wdGlvbnMuYXV0byB8fCAwO1xuICB2YXIgaW50ZXJ2YWw7XG5cbiAgZnVuY3Rpb24gYmVnaW4oKSB7XG5cbiAgICBpbnRlcnZhbCA9IHNldFRpbWVvdXQobmV4dCwgZGVsYXkpO1xuXG4gIH1cblxuICBmdW5jdGlvbiBzdG9wKCkge1xuXG4gICAgZGVsYXkgPSAwO1xuICAgIGNsZWFyVGltZW91dChpbnRlcnZhbCk7XG5cbiAgfVxuXG5cbiAgLy8gc2V0dXAgaW5pdGlhbCB2YXJzXG4gIHZhciBzdGFydCA9IHt9O1xuICB2YXIgZGVsdGEgPSB7fTtcbiAgdmFyIGlzU2Nyb2xsaW5nO1xuXG4gIC8vIHNldHVwIGV2ZW50IGNhcHR1cmluZ1xuICB2YXIgZXZlbnRzID0ge1xuXG4gICAgaGFuZGxlRXZlbnQ6IGZ1bmN0aW9uKGV2ZW50KSB7XG5cbiAgICAgIHN3aXRjaCAoZXZlbnQudHlwZSkge1xuICAgICAgICBjYXNlICd0b3VjaHN0YXJ0JzogdGhpcy5zdGFydChldmVudCk7IGJyZWFrO1xuICAgICAgICBjYXNlICd0b3VjaG1vdmUnOiB0aGlzLm1vdmUoZXZlbnQpOyBicmVhaztcbiAgICAgICAgY2FzZSAndG91Y2hlbmQnOiBvZmZsb2FkRm4odGhpcy5lbmQoZXZlbnQpKTsgYnJlYWs7XG4gICAgICAgIGNhc2UgJ3dlYmtpdFRyYW5zaXRpb25FbmQnOlxuICAgICAgICBjYXNlICdtc1RyYW5zaXRpb25FbmQnOlxuICAgICAgICBjYXNlICdvVHJhbnNpdGlvbkVuZCc6XG4gICAgICAgIGNhc2UgJ290cmFuc2l0aW9uZW5kJzpcbiAgICAgICAgY2FzZSAndHJhbnNpdGlvbmVuZCc6IG9mZmxvYWRGbih0aGlzLnRyYW5zaXRpb25FbmQoZXZlbnQpKTsgYnJlYWs7XG4gICAgICAgIGNhc2UgJ3Jlc2l6ZSc6IG9mZmxvYWRGbihzZXR1cCk7IGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBpZiAob3B0aW9ucy5zdG9wUHJvcGFnYXRpb24pIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgfSxcbiAgICBzdGFydDogZnVuY3Rpb24oZXZlbnQpIHtcblxuICAgICAgdmFyIHRvdWNoZXMgPSBldmVudC50b3VjaGVzWzBdO1xuXG4gICAgICAvLyBtZWFzdXJlIHN0YXJ0IHZhbHVlc1xuICAgICAgc3RhcnQgPSB7XG5cbiAgICAgICAgLy8gZ2V0IGluaXRpYWwgdG91Y2ggY29vcmRzXG4gICAgICAgIHg6IHRvdWNoZXMucGFnZVgsXG4gICAgICAgIHk6IHRvdWNoZXMucGFnZVksXG5cbiAgICAgICAgLy8gc3RvcmUgdGltZSB0byBkZXRlcm1pbmUgdG91Y2ggZHVyYXRpb25cbiAgICAgICAgdGltZTogK25ldyBEYXRlXG5cbiAgICAgIH07XG5cbiAgICAgIC8vIHVzZWQgZm9yIHRlc3RpbmcgZmlyc3QgbW92ZSBldmVudFxuICAgICAgaXNTY3JvbGxpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICAgIC8vIHJlc2V0IGRlbHRhIGFuZCBlbmQgbWVhc3VyZW1lbnRzXG4gICAgICBkZWx0YSA9IHt9O1xuXG4gICAgICAvLyBhdHRhY2ggdG91Y2htb3ZlIGFuZCB0b3VjaGVuZCBsaXN0ZW5lcnNcbiAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcywgZmFsc2UpO1xuICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRoaXMsIGZhbHNlKTtcblxuICAgIH0sXG4gICAgbW92ZTogZnVuY3Rpb24oZXZlbnQpIHtcblxuICAgICAgLy8gZW5zdXJlIHN3aXBpbmcgd2l0aCBvbmUgdG91Y2ggYW5kIG5vdCBwaW5jaGluZ1xuICAgICAgaWYgKCBldmVudC50b3VjaGVzLmxlbmd0aCA+IDEgfHwgZXZlbnQuc2NhbGUgJiYgZXZlbnQuc2NhbGUgIT09IDEpIHJldHVyblxuXG4gICAgICBpZiAob3B0aW9ucy5kaXNhYmxlU2Nyb2xsKSBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICB2YXIgdG91Y2hlcyA9IGV2ZW50LnRvdWNoZXNbMF07XG5cbiAgICAgIC8vIG1lYXN1cmUgY2hhbmdlIGluIHggYW5kIHlcbiAgICAgIGRlbHRhID0ge1xuICAgICAgICB4OiB0b3VjaGVzLnBhZ2VYIC0gc3RhcnQueCxcbiAgICAgICAgeTogdG91Y2hlcy5wYWdlWSAtIHN0YXJ0LnlcbiAgICAgIH1cblxuICAgICAgLy8gZGV0ZXJtaW5lIGlmIHNjcm9sbGluZyB0ZXN0IGhhcyBydW4gLSBvbmUgdGltZSB0ZXN0XG4gICAgICBpZiAoIHR5cGVvZiBpc1Njcm9sbGluZyA9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBpc1Njcm9sbGluZyA9ICEhKCBpc1Njcm9sbGluZyB8fCBNYXRoLmFicyhkZWx0YS54KSA8IE1hdGguYWJzKGRlbHRhLnkpICk7XG4gICAgICB9XG5cbiAgICAgIC8vIGlmIHVzZXIgaXMgbm90IHRyeWluZyB0byBzY3JvbGwgdmVydGljYWxseVxuICAgICAgaWYgKCFpc1Njcm9sbGluZykge1xuXG4gICAgICAgIC8vIHByZXZlbnQgbmF0aXZlIHNjcm9sbGluZ1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIC8vIHN0b3Agc2xpZGVzaG93XG4gICAgICAgIHN0b3AoKTtcblxuICAgICAgICAvLyBpbmNyZWFzZSByZXNpc3RhbmNlIGlmIGZpcnN0IG9yIGxhc3Qgc2xpZGVcbiAgICAgICAgaWYgKG9wdGlvbnMuY29udGludW91cykgeyAvLyB3ZSBkb24ndCBhZGQgcmVzaXN0YW5jZSBhdCB0aGUgZW5kXG5cbiAgICAgICAgICB0cmFuc2xhdGUoY2lyY2xlKGluZGV4LTEpLCBkZWx0YS54ICsgc2xpZGVQb3NbY2lyY2xlKGluZGV4LTEpXSwgMCk7XG4gICAgICAgICAgdHJhbnNsYXRlKGluZGV4LCBkZWx0YS54ICsgc2xpZGVQb3NbaW5kZXhdLCAwKTtcbiAgICAgICAgICB0cmFuc2xhdGUoY2lyY2xlKGluZGV4KzEpLCBkZWx0YS54ICsgc2xpZGVQb3NbY2lyY2xlKGluZGV4KzEpXSwgMCk7XG5cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgIGRlbHRhLnggPVxuICAgICAgICAgICAgZGVsdGEueCAvXG4gICAgICAgICAgICAgICggKCFpbmRleCAmJiBkZWx0YS54ID4gMCAgICAgICAgICAgICAgIC8vIGlmIGZpcnN0IHNsaWRlIGFuZCBzbGlkaW5nIGxlZnRcbiAgICAgICAgICAgICAgICB8fCBpbmRleCA9PSBzbGlkZXMubGVuZ3RoIC0gMSAgICAgICAgLy8gb3IgaWYgbGFzdCBzbGlkZSBhbmQgc2xpZGluZyByaWdodFxuICAgICAgICAgICAgICAgICYmIGRlbHRhLnggPCAwICAgICAgICAgICAgICAgICAgICAgICAvLyBhbmQgaWYgc2xpZGluZyBhdCBhbGxcbiAgICAgICAgICAgICAgKSA/XG4gICAgICAgICAgICAgICggTWF0aC5hYnMoZGVsdGEueCkgLyB3aWR0aCArIDEgKSAgICAgIC8vIGRldGVybWluZSByZXNpc3RhbmNlIGxldmVsXG4gICAgICAgICAgICAgIDogMSApOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5vIHJlc2lzdGFuY2UgaWYgZmFsc2VcblxuICAgICAgICAgIC8vIHRyYW5zbGF0ZSAxOjFcbiAgICAgICAgICB0cmFuc2xhdGUoaW5kZXgtMSwgZGVsdGEueCArIHNsaWRlUG9zW2luZGV4LTFdLCAwKTtcbiAgICAgICAgICB0cmFuc2xhdGUoaW5kZXgsIGRlbHRhLnggKyBzbGlkZVBvc1tpbmRleF0sIDApO1xuICAgICAgICAgIHRyYW5zbGF0ZShpbmRleCsxLCBkZWx0YS54ICsgc2xpZGVQb3NbaW5kZXgrMV0sIDApO1xuICAgICAgICB9XG5cbiAgICAgIH1cblxuICAgIH0sXG4gICAgZW5kOiBmdW5jdGlvbihldmVudCkge1xuXG4gICAgICAvLyBtZWFzdXJlIGR1cmF0aW9uXG4gICAgICB2YXIgZHVyYXRpb24gPSArbmV3IERhdGUgLSBzdGFydC50aW1lO1xuXG4gICAgICAvLyBkZXRlcm1pbmUgaWYgc2xpZGUgYXR0ZW1wdCB0cmlnZ2VycyBuZXh0L3ByZXYgc2xpZGVcbiAgICAgIHZhciBpc1ZhbGlkU2xpZGUgPVxuICAgICAgICAgICAgTnVtYmVyKGR1cmF0aW9uKSA8IDI1MCAgICAgICAgICAgICAgIC8vIGlmIHNsaWRlIGR1cmF0aW9uIGlzIGxlc3MgdGhhbiAyNTBtc1xuICAgICAgICAgICAgJiYgTWF0aC5hYnMoZGVsdGEueCkgPiAyMCAgICAgICAgICAgIC8vIGFuZCBpZiBzbGlkZSBhbXQgaXMgZ3JlYXRlciB0aGFuIDIwcHhcbiAgICAgICAgICAgIHx8IE1hdGguYWJzKGRlbHRhLngpID4gd2lkdGgvMjsgICAgICAvLyBvciBpZiBzbGlkZSBhbXQgaXMgZ3JlYXRlciB0aGFuIGhhbGYgdGhlIHdpZHRoXG5cbiAgICAgIC8vIGRldGVybWluZSBpZiBzbGlkZSBhdHRlbXB0IGlzIHBhc3Qgc3RhcnQgYW5kIGVuZFxuICAgICAgdmFyIGlzUGFzdEJvdW5kcyA9XG4gICAgICAgICAgICAhaW5kZXggJiYgZGVsdGEueCA+IDAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgZmlyc3Qgc2xpZGUgYW5kIHNsaWRlIGFtdCBpcyBncmVhdGVyIHRoYW4gMFxuICAgICAgICAgICAgfHwgaW5kZXggPT0gc2xpZGVzLmxlbmd0aCAtIDEgJiYgZGVsdGEueCA8IDA7ICAgIC8vIG9yIGlmIGxhc3Qgc2xpZGUgYW5kIHNsaWRlIGFtdCBpcyBsZXNzIHRoYW4gMFxuXG4gICAgICBpZiAob3B0aW9ucy5jb250aW51b3VzKSBpc1Bhc3RCb3VuZHMgPSBmYWxzZTtcblxuICAgICAgLy8gZGV0ZXJtaW5lIGRpcmVjdGlvbiBvZiBzd2lwZSAodHJ1ZTpyaWdodCwgZmFsc2U6bGVmdClcbiAgICAgIHZhciBkaXJlY3Rpb24gPSBkZWx0YS54IDwgMDtcblxuICAgICAgLy8gaWYgbm90IHNjcm9sbGluZyB2ZXJ0aWNhbGx5XG4gICAgICBpZiAoIWlzU2Nyb2xsaW5nKSB7XG5cbiAgICAgICAgaWYgKGlzVmFsaWRTbGlkZSAmJiAhaXNQYXN0Qm91bmRzKSB7XG5cbiAgICAgICAgICBpZiAoZGlyZWN0aW9uKSB7XG5cbiAgICAgICAgICAgIGlmIChvcHRpb25zLmNvbnRpbnVvdXMpIHsgLy8gd2UgbmVlZCB0byBnZXQgdGhlIG5leHQgaW4gdGhpcyBkaXJlY3Rpb24gaW4gcGxhY2VcblxuICAgICAgICAgICAgICBtb3ZlKGNpcmNsZShpbmRleC0xKSwgLXdpZHRoLCAwKTtcbiAgICAgICAgICAgICAgbW92ZShjaXJjbGUoaW5kZXgrMiksIHdpZHRoLCAwKTtcblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgbW92ZShpbmRleC0xLCAtd2lkdGgsIDApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBtb3ZlKGluZGV4LCBzbGlkZVBvc1tpbmRleF0td2lkdGgsIHNwZWVkKTtcbiAgICAgICAgICAgIG1vdmUoY2lyY2xlKGluZGV4KzEpLCBzbGlkZVBvc1tjaXJjbGUoaW5kZXgrMSldLXdpZHRoLCBzcGVlZCk7XG4gICAgICAgICAgICBpbmRleCA9IGNpcmNsZShpbmRleCsxKTtcblxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAob3B0aW9ucy5jb250aW51b3VzKSB7IC8vIHdlIG5lZWQgdG8gZ2V0IHRoZSBuZXh0IGluIHRoaXMgZGlyZWN0aW9uIGluIHBsYWNlXG5cbiAgICAgICAgICAgICAgbW92ZShjaXJjbGUoaW5kZXgrMSksIHdpZHRoLCAwKTtcbiAgICAgICAgICAgICAgbW92ZShjaXJjbGUoaW5kZXgtMiksIC13aWR0aCwgMCk7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIG1vdmUoaW5kZXgrMSwgd2lkdGgsIDApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBtb3ZlKGluZGV4LCBzbGlkZVBvc1tpbmRleF0rd2lkdGgsIHNwZWVkKTtcbiAgICAgICAgICAgIG1vdmUoY2lyY2xlKGluZGV4LTEpLCBzbGlkZVBvc1tjaXJjbGUoaW5kZXgtMSldK3dpZHRoLCBzcGVlZCk7XG4gICAgICAgICAgICBpbmRleCA9IGNpcmNsZShpbmRleC0xKTtcblxuICAgICAgICAgIH1cblxuICAgICAgICAgIG9wdGlvbnMuY2FsbGJhY2sgJiYgb3B0aW9ucy5jYWxsYmFjayhpbmRleCwgc2xpZGVzW2luZGV4XSk7XG5cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgIGlmIChvcHRpb25zLmNvbnRpbnVvdXMpIHtcblxuICAgICAgICAgICAgbW92ZShjaXJjbGUoaW5kZXgtMSksIC13aWR0aCwgc3BlZWQpO1xuICAgICAgICAgICAgbW92ZShpbmRleCwgMCwgc3BlZWQpO1xuICAgICAgICAgICAgbW92ZShjaXJjbGUoaW5kZXgrMSksIHdpZHRoLCBzcGVlZCk7XG5cbiAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICBtb3ZlKGluZGV4LTEsIC13aWR0aCwgc3BlZWQpO1xuICAgICAgICAgICAgbW92ZShpbmRleCwgMCwgc3BlZWQpO1xuICAgICAgICAgICAgbW92ZShpbmRleCsxLCB3aWR0aCwgc3BlZWQpO1xuICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgIH1cblxuICAgICAgLy8ga2lsbCB0b3VjaG1vdmUgYW5kIHRvdWNoZW5kIGV2ZW50IGxpc3RlbmVycyB1bnRpbCB0b3VjaHN0YXJ0IGNhbGxlZCBhZ2FpblxuICAgICAgZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCBldmVudHMsIGZhbHNlKVxuICAgICAgZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIGV2ZW50cywgZmFsc2UpXG5cbiAgICB9LFxuICAgIHRyYW5zaXRpb25FbmQ6IGZ1bmN0aW9uKGV2ZW50KSB7XG5cbiAgICAgIGlmIChwYXJzZUludChldmVudC50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JyksIDEwKSA9PSBpbmRleCkge1xuXG4gICAgICAgIGlmIChkZWxheSkgYmVnaW4oKTtcblxuICAgICAgICBvcHRpb25zLnRyYW5zaXRpb25FbmQgJiYgb3B0aW9ucy50cmFuc2l0aW9uRW5kLmNhbGwoZXZlbnQsIGluZGV4LCBzbGlkZXNbaW5kZXhdKTtcblxuICAgICAgfVxuXG4gICAgfVxuXG4gIH1cblxuICAvLyB0cmlnZ2VyIHNldHVwXG4gIHNldHVwKCk7XG5cbiAgLy8gc3RhcnQgYXV0byBzbGlkZXNob3cgaWYgYXBwbGljYWJsZVxuICBpZiAoZGVsYXkpIGJlZ2luKCk7XG5cblxuICAvLyBhZGQgZXZlbnQgbGlzdGVuZXJzXG4gIGlmIChicm93c2VyLmFkZEV2ZW50TGlzdGVuZXIpIHtcblxuICAgIC8vIHNldCB0b3VjaHN0YXJ0IGV2ZW50IG9uIGVsZW1lbnRcbiAgICBpZiAoYnJvd3Nlci50b3VjaCkgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgZXZlbnRzLCBmYWxzZSk7XG5cbiAgICBpZiAoYnJvd3Nlci50cmFuc2l0aW9ucykge1xuICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCd3ZWJraXRUcmFuc2l0aW9uRW5kJywgZXZlbnRzLCBmYWxzZSk7XG4gICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21zVHJhbnNpdGlvbkVuZCcsIGV2ZW50cywgZmFsc2UpO1xuICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdvVHJhbnNpdGlvbkVuZCcsIGV2ZW50cywgZmFsc2UpO1xuICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdvdHJhbnNpdGlvbmVuZCcsIGV2ZW50cywgZmFsc2UpO1xuICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgZXZlbnRzLCBmYWxzZSk7XG4gICAgfVxuXG4gICAgLy8gc2V0IHJlc2l6ZSBldmVudCBvbiB3aW5kb3dcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgZXZlbnRzLCBmYWxzZSk7XG5cbiAgfSBlbHNlIHtcblxuICAgIC8vIC93aW5kb3cub25yZXNpemUgPSBmdW5jdGlvbiAoKSB7IHNldHVwKCkgfTsgLy8gdG8gcGxheSBuaWNlIHdpdGggb2xkIElFXG5cbiAgfVxuXG4gIC8vIGV4cG9zZSB0aGUgU3dpcGUgQVBJXG4gIHJldHVybiB7XG4gICAgc2V0dXA6IGZ1bmN0aW9uKCkge1xuXG4gICAgICBzZXR1cCgpO1xuXG4gICAgfSxcbiAgICBzbGlkZTogZnVuY3Rpb24odG8sIHNwZWVkKSB7XG5cbiAgICAgIC8vIGNhbmNlbCBzbGlkZXNob3dcbiAgICAgIHN0b3AoKTtcblxuICAgICAgc2xpZGUodG8sIHNwZWVkKTtcblxuICAgIH0sXG4gICAgcHJldjogZnVuY3Rpb24oKSB7XG5cbiAgICAgIC8vIGNhbmNlbCBzbGlkZXNob3dcbiAgICAgIHN0b3AoKTtcblxuICAgICAgcHJldigpO1xuXG4gICAgfSxcbiAgICBuZXh0OiBmdW5jdGlvbigpIHtcblxuICAgICAgLy8gY2FuY2VsIHNsaWRlc2hvd1xuICAgICAgc3RvcCgpO1xuXG4gICAgICBuZXh0KCk7XG5cbiAgICB9LFxuICAgIHN0b3A6IGZ1bmN0aW9uKCkge1xuXG4gICAgICAvLyBjYW5jZWwgc2xpZGVzaG93XG4gICAgICBzdG9wKCk7XG5cbiAgICB9LFxuICAgIGdldFBvczogZnVuY3Rpb24oKSB7XG5cbiAgICAgIC8vIHJldHVybiBjdXJyZW50IGluZGV4IHBvc2l0aW9uXG4gICAgICByZXR1cm4gaW5kZXg7XG5cbiAgICB9LFxuICAgIGdldE51bVNsaWRlczogZnVuY3Rpb24oKSB7XG5cbiAgICAgIC8vIHJldHVybiB0b3RhbCBudW1iZXIgb2Ygc2xpZGVzXG4gICAgICByZXR1cm4gbGVuZ3RoO1xuICAgIH0sXG4gICAga2lsbDogZnVuY3Rpb24oKSB7XG5cbiAgICAgIC8vIGNhbmNlbCBzbGlkZXNob3dcbiAgICAgIHN0b3AoKTtcblxuICAgICAgLy8gcmVzZXQgZWxlbWVudFxuICAgICAgZWxlbWVudC5zdHlsZS53aWR0aCA9ICcnO1xuICAgICAgZWxlbWVudC5zdHlsZS5sZWZ0ID0gJyc7XG5cbiAgICAgIC8vIHJlc2V0IHNsaWRlc1xuICAgICAgdmFyIHBvcyA9IHNsaWRlcy5sZW5ndGg7XG4gICAgICB3aGlsZShwb3MtLSkge1xuXG4gICAgICAgIHZhciBzbGlkZSA9IHNsaWRlc1twb3NdO1xuICAgICAgICBzbGlkZS5zdHlsZS53aWR0aCA9ICcnO1xuICAgICAgICBzbGlkZS5zdHlsZS5sZWZ0ID0gJyc7XG5cbiAgICAgICAgaWYgKGJyb3dzZXIudHJhbnNpdGlvbnMpIHRyYW5zbGF0ZShwb3MsIDAsIDApO1xuXG4gICAgICB9XG5cbiAgICAgIC8vIHJlbW92ZWQgZXZlbnQgbGlzdGVuZXJzXG4gICAgICBpZiAoYnJvd3Nlci5hZGRFdmVudExpc3RlbmVyKSB7XG5cbiAgICAgICAgLy8gcmVtb3ZlIGN1cnJlbnQgZXZlbnQgbGlzdGVuZXJzXG4gICAgICAgIGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIGV2ZW50cywgZmFsc2UpO1xuICAgICAgICBlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3dlYmtpdFRyYW5zaXRpb25FbmQnLCBldmVudHMsIGZhbHNlKTtcbiAgICAgICAgZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtc1RyYW5zaXRpb25FbmQnLCBldmVudHMsIGZhbHNlKTtcbiAgICAgICAgZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdvVHJhbnNpdGlvbkVuZCcsIGV2ZW50cywgZmFsc2UpO1xuICAgICAgICBlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ290cmFuc2l0aW9uZW5kJywgZXZlbnRzLCBmYWxzZSk7XG4gICAgICAgIGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsIGV2ZW50cywgZmFsc2UpO1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgZXZlbnRzLCBmYWxzZSk7XG5cbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuXG4gICAgICAgIHdpbmRvdy5vbnJlc2l6ZSA9IG51bGw7XG5cbiAgICAgIH1cblxuICAgIH1cbiAgfVxuXG59XG5cblxuaWYgKCB3aW5kb3cualF1ZXJ5IHx8IHdpbmRvdy5aZXB0byApIHtcbiAgKGZ1bmN0aW9uKCQpIHtcbiAgICAkLmZuLlN3aXBlID0gZnVuY3Rpb24ocGFyYW1zKSB7XG4gICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAkKHRoaXMpLmRhdGEoJ1N3aXBlJywgbmV3IFN3aXBlKCQodGhpcylbMF0sIHBhcmFtcykpO1xuICAgICAgfSk7XG4gICAgfVxufSkoIHdpbmRvdy5qUXVlcnkgfHwgd2luZG93LlplcHRvICk7XG59XG4iLCJmdW5jdGlvbiBzZXRUaHVtYnNQZXJQYWdlKCl7XG4gICAgLy9TaG93IGFzIG1hbnkgdGh1bWJzIGFzIHdpbGwgZml0IG9uIHRoZSBzY3JlZW5cbiAgICB2YXIgaXRlbXNJblBhZ2UgPSB2aWV3V2lkdGggLyBqUXVlcnkoIFwiLmRyYWdlbmQtdGh1bWJcIikud2lkdGgoKTtcbiAgICBqUXVlcnkoXCIjdGh1bWJzQ29udGFpbmVyXCIpLmRyYWdlbmQoe1xuICAgICAgICBpdGVtc0luUGFnZTogaXRlbXNJblBhZ2UsXG4gICAgICAgIG9uU3dpcGVFbmQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgLy9zdG9wVGh1bWJzT3ZlcnNjcm9sbCgpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5cbi8vUHJldmVudCBzY3JvbGxpbmcgaW50byB3aGl0ZXNwYWNlIGFmdGVyIHRoZSBsYXN0IHRodW1ibmFpbFxuZnVuY3Rpb24gc3RvcFRodW1ic092ZXJzY3JvbGwoKXtcbiAgICB2YXIgbGFzdFRodW1iID0galF1ZXJ5KCcjdGh1bWJzQ29udGFpbmVyIC5kcmFnZW5kLXRodW1iOmxhc3QtY2hpbGQnKTtcbiAgICB2YXIgbGFzdFRodW1iV2lkdGggPSB3aWR0aChsYXN0VGh1bWIpO1xuICAgIHZhciBsYXN0VGh1bWJPZmZzZXRMZWZ0ID0gbGFzdFRodW1iLnBvc2l0aW9uKCkubGVmdDtcbiAgICB2YXIgbGFzdFRodW1iT2Zmc2V0UmlnaHQgPSBsYXN0VGh1bWIucG9zaXRpb24oKS5sZWZ0ICsgbGFzdFRodW1iV2lkdGg7XG4gICAgdmFyIHRodW1ic0NvbnRhaW5lciA9IGpRdWVyeShcIiN0aHVtYnNDb250YWluZXIgZGl2OmZpcnN0LWNoaWxkXCIpO1xuICAgIHZhciB0aHVtYnNDb250YWluZXJXaWR0aCA9IHdpZHRoKHRodW1ic0NvbnRhaW5lcik7XG4gICAgdmFyIHRodW1ic0NvbnRhaW5lckJpZ2dlckJ5ID0gIHRodW1ic0NvbnRhaW5lcldpZHRoIC0gdmlld1dpZHRoO1xuICAgIGlmICggdGh1bWJzQ29udGFpbmVyV2lkdGggPiB2aWV3V2lkdGgpe1xuICAgICAgICBpZiggbGFzdFRodW1iT2Zmc2V0UmlnaHQgPCB2aWV3V2lkdGgpe1xuICAgICAgICAgICAgdGh1bWJzQ29udGFpbmVyLmNzcygndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZVgoLScgKyB0aHVtYnNDb250YWluZXJCaWdnZXJCeSArICdweCknKTtcbiAgICAgICAgfVxuICAgICAgICBpZiggdGh1bWJzQ29udGFpbmVyLnBvc2l0aW9uKCkubGVmdCA+IDApe1xuICAgICAgICAgICAgdGh1bWJzQ29udGFpbmVyLmNzcygndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZVgoMHB4KScpO1xuICAgICAgICB9XG4gICAgfVxuXG59XG4iLCIvKlxuICAgIGpRdWVyeS53aGVuKFxuICAgICAgICBtYXRjaEhlaWdodCh0YXJnZXQsIHRhcmdldEhlaWdodClcbiAgICApXG4gICAgLnRoZW4oXG4gICAgICAgIG1heFNpemVCeUFzcCh0YXJnZXQsIGFzcFJhbmdlKVxuICAgICk7XG4gKi9cbiIsIi8qKlxuICogZ2V0IEpTT04gZnJvbSBVUkwuICBQcmltYXJ5IHVzYWdlIFdvcmRQcmVzcyBSRVNUIEVuZHBvaW50cy5cbiAqL1xuZnVuY3Rpb24gZ2V0SnNvbih1cmwpIHtcblx0Ly9GSVg6IE1vdmUgdG8gZGlmZmVyZW50IGluY2x1ZGUgZmlsZVxuXHRjb25zb2xlLmxvZyhcImdldEpzb24oKSByZXF1ZXN0IGZvcjogXCIgKyB1cmwpO1xuXG5cdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihzdWNjZXNzSGFuZGxlciwgZXJyb3JIYW5kbGVyKSB7XG5cdHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblx0eGhyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuXHRcdGlmICh4aHIuc3RhdHVzID49IDIwMCAmJiB4aHIuc3RhdHVzIDwgNDAwKSB7XG5cdFx0XHQvLyBTdWNjZXNzIVxuXHRcdFx0dmFyIGRhdGEgPSBKU09OLnBhcnNlKHhoci5yZXNwb25zZVRleHQpO1xuXHRcdFx0Ly9jb25zb2xlLmxvZyhcImpzb24gZGF0YTogXCIgKyBKU09OLnN0cmluZ2lmeShkYXRhKSApO1xuXHRcdFx0c3VjY2Vzc0hhbmRsZXIoZGF0YSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vIEVycm9yICFcblx0XHRcdGVycm9ySGFuZGxlcih7XG5cdFx0XHQgIHN0YXR1czogdGhpcy5zdGF0dXMsXG5cdFx0XHQgIHN0YXR1c1RleHQ6IHhoci5zdGF0dXNUZXh0XG5cdFx0XHR9KTtcblx0XHR9XG5cdH07XG5cdHhoci5vbmVycm9yID0gZnVuY3Rpb24gKCkge1xuXHRcdGVycm9ySGFuZGxlcih7XG5cdFx0XHRzdGF0dXM6IHRoaXMuc3RhdHVzLFxuXHRcdFx0c3RhdHVzVGV4dDogeGhyLnN0YXR1c1RleHRcblx0XHR9KTtcblx0fTtcblx0eGhyLm9wZW4oJ0dFVCcsIHVybCk7XG5cdHhoci5zZW5kKCk7XG5cdH0pO1xuXG59XG5cbi8qKlxuICogQ2hlY2sgaWYgRE9NIGVsZW1lbnQgZXhpc3RzIHx8ICdoYXMgbG9hZGVkJ1xuICogVXNlIGZvciBkeW5hbWljIGNvbnRlbnQgcmVxdWlyZWQgYmVmb3JlIGRvYy5yZWFkeSgpXG4gKiBSZXF1aXJlcyBjYWxsYmFjaygpIC0gJ3doYXQgaGFwcGVucyBvbmNlIHRoZSBlbGVtZW50IGlzIHJlYWR5J1xuICovXG5mdW5jdGlvbiBlbGVtZW50UmVhZHkoIGVsZW1lbnQsIGNhbGxiYWNrICl7XG5cdChmdW5jdGlvbiBjaGVja0ZvckVsZW1lbnQoKXtcblx0ICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcblx0XHRcdGlmKCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtZW50KSApe1xuXHRcdFx0XHRjb25zb2xlLmxvZyhlbGVtZW50ICsgXCIgbG9hZGVkLlwiKTtcblx0ICAgICAgICBcdGNhbGxiYWNrKCk7XG5cdCAgICAgICAgfWVsc2V7XG5cdCAgICAgICAgXHRjaGVja0ZvckVsZW1lbnQoZWxlbWVudCk7XG5cdCAgICAgICAgfVxuXHQgICAgfSwxNTApO1xuXHQgfSkoKVxufTtcblxuXG4vKipcbiAqIEluc2VydCBIVE1MIFRlbXBsYXRlIGZvciBjb250ZW50OiBcImltYWdlc1wiXG4gKi9cbi8vKioqKioqKioqKioqKioqKioqKioqKioqIFJFTU9WRSBKUVVFUlkgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuZnVuY3Rpb24gY3JlYXRlRHJhZ2VuZFNsaWRlcyhwYXJlbnRDb250YWluZXIsIHNsaWRlc0NvbnRlbnQsIHNsaWRlVHlwZSl7XG5cdC8vY29uc29sZS5sb2coXCJjcmVhdGVEcmFnZW5kU2xpZGVzKCkgLSBwYXJlbnRDb250YWluZXI6IFwiICsgcGFyZW50Q29udGFpbmVyKTtcblx0dmFyIHRoaXNQYXJlbnRDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChwYXJlbnRDb250YWluZXIpO1xuXHR2YXIgdGhpc1NsaWRlc0NvbnRhaW5lciA9IHRoaXNQYXJlbnRDb250YWluZXIucXVlcnlTZWxlY3RvcignLmltYWdlLWdhbGxlcnknKTtcblxuXHRfLmZvckVhY2goc2xpZGVzQ29udGVudCwgZnVuY3Rpb24odGhpc1NsaWRlQ29udGVudCkge1xuXHRcdHZhciB0aGlzU2xpZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0XHR0aGlzU2xpZGUuY2xhc3NMaXN0LmFkZCgnZHJhZ2VuZC1wYWdlJyk7XG5cblx0XHRpZiAoIHNsaWRlVHlwZSA9PSAnYmFja2dyb3VuZC1pbWFnZScgKXtcblx0XHRcdC8vY29uc29sZS5sb2coXCJzbGlkZVR5cGU6IGJhY2tncm91bmQtaW1hZ2VcIik7XG5cdFx0XHQvL2NvbnNvbGUubG9nKFwidGhpc1NsaWRlOiBcIiArIHRoaXNTbGlkZSk7XG5cdFx0XHQvL2NvbnNvbGUubG9nKFwidGhpc1NsaWRlQ29udGVudDogXCIgKyB0eXBlb2YgdGhpc1NsaWRlQ29udGVudCk7XG5cdFx0XHRzZXRCZ0ltZyh0aGlzU2xpZGUsIHRoaXNTbGlkZUNvbnRlbnQpO1xuXHRcdH1cblx0XHQvL0ZJWDogQWRkIHN1cHBvcnQgZm9yIG90aGVyIGVsZW1lbnQgdHlwZXNcblxuXHRcdHRoaXNQYXJlbnRDb250YWluZXIuYXBwZW5kQ2hpbGQodGhpc1NsaWRlKTtcblx0fSk7XG59XG5cdC8qKlxuXHQgKiBBY2NlcHRzIHRhcmdldCBlbGVtZW50IGFuZCBkYXRhIG9iamVjdCB7dXJsLCBvcmlnaW5hbCBpbWFnZSBoZWlnaHQsIG9yaWdpbmFsIGltYWdlIHdpZHRofVxuXHQgKi9cblxuXHRmdW5jdGlvbiBzZXRCZ0ltZyh0YXJnZXQsIGltYWdlRGF0YSl7XG5cdFx0dGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2JhY2tncm91bmRJbWFnZScpO1xuXG5cdFx0dmFyIHRoaXNJbWdVcmwgXHRcdD0gaW1hZ2VEYXRhWzBdO1xuXHRcdHZhciB0aGlzSW1nSGVpZ2h0IFx0PSBpbWFnZURhdGFbMV07XG5cdFx0dmFyIHRoaXNJbWdXaWR0aCBcdD0gaW1hZ2VEYXRhWzJdO1xuXG5cdFx0dGFyZ2V0LnN0eWxlLmJhY2tncm91bmRJbWFnZSA9ICd1cmwoJyArIHRoaXNJbWdVcmwgKyAnKSc7XG5cblx0XHQvL2lmIG9yaWdpbmFsIGltYWdlIEhFSUdIVCBwYXNzZWQgaW4gYXJyYXlcblx0XHRpZih0aGlzSW1nSGVpZ2h0KXtcblx0XHRcdHRhcmdldC5zZXRBdHRyaWJ1dGUoJ2RhdGEtaGVpZ2h0JywgdGhpc0ltZ0hlaWdodCk7XG5cdFx0fVxuXG5cdFx0Ly9pZiBvcmlnaW5hbCBpbWFnZSBXSURUSCBwYXNzZWQgaW4gYXJyYXlcblx0XHRpZih0aGlzSW1nV2lkdGgpe1xuXHRcdFx0dGFyZ2V0LnNldEF0dHJpYnV0ZSgnZGF0YS13aWR0aCcsICB0aGlzSW1nV2lkdGgpO1xuXHRcdH1cblxuXHR9XG5cbmZ1bmN0aW9uIGdldEltYWdlc0J5U2NyZWVuU2l6ZShpbWFnZXNBcnJheSwgZmlyc3RCcmVhaywgc2Vjb25kQnJlYWspe1xuICAgIC8vc2VsZWN0IHRoZSBsYXJnZXIgb2Ygdmlld3BvcnQgaGVpZ2h0IC0gd2lkdGggKGRldmljZSBjYW4gcm90YXRlIGFmdGVyIGxvYWRpbmcgaW1hZ2VzKVxuICAgIHZhciB3aW5kb3dNYXhTaXplID0gTWF0aC5tYXgodmlld0hlaWdodCwgdmlld1dpZHRoKTtcblxuICAgIGlmICggd2luZG93TWF4U2l6ZSA8PSBmaXJzdEJyZWFrICl7XG4gICAgICAgIHJldHVybiBpbWFnZXNBcnJheVsxXTsvL21lZGl1bTtcbiAgICB9XG4gICAgZWxzZSBpZiggd2luZG93TWF4U2l6ZSA+PSBmaXJzdEJyZWFrICYmIHdpbmRvd01heFNpemUgPD0gc2Vjb25kQnJlYWspIHtcbiAgICAgICAgcmV0dXJuIGltYWdlc0FycmF5WzJdOy8vbGFyZ2U7XG4gICAgfVxuICAgIGVsc2V7XG4gICAgICAgIHJldHVybiBpbWFnZXNBcnJheVszXTsvLzE5MjAgbWF4O1xuICAgIH1cbn1cbiIsImZ1bmN0aW9uIG1lbnVIZWlnaHQoZG9jSGVpZ2h0KXtcbiAgICAvKlxuICAgIHZhciBuYXYgPSBnZXQoJ25hdicpO1xuICAgIGhlaWdodChuYXYsIFwiYXV0b1wiKTtcbiAgICBpZiAoaGFzQ2xhc3MoYm9keSwgJ21vYmlsZU1lbnVPcGVuJykgKXtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIm1lbnVIZWlnaHQgLSBkb2NIOiBcIiArIGRvY0hlaWdodCk7XG4gICAgICAgIGhlaWdodChuYXYsIGRvY0hlaWdodCk7XG4gICAgICAgIG1pbkhlaWdodChuYXYsIHZpZXdIZWlnaHQpO1xuICAgIH1cbiAgICAqL1xufVxuXG4vL0ZpeCBGb290ZXIgcG9zaXRpb24gZm9yIHNob3J0IHBhZ2VzIC0gdHJpZ2dlcmVkIG9uIC5yZXNpemVcbi8vTk9URSAtIEZJWCBQT1NJVElPTiBBQlNPTFVURSBGUk9NICdhYnNvbHV0ZUFmdGVyJyBvbiByZXNpemVcbmZ1bmN0aW9uIGZpeFRvQm90dG9tKHRhcmdldCl7XG4gICAgLy9yZXNldCBhbnkgY2xhc3NlcyBmcm9tIHByZXZpb3VzIGZ1bmN0aW9uIGNhbGxcbiAgICBpZiAoIGhhc0NsYXNzKHRhcmdldCwgJ2FwcGVuZFRvVmlld3BvcnQnKSApe1xuICAgICAgICByZW1vdmVDbGFzcyh0YXJnZXQsICdhcHBlbmRUb1ZpZXdwb3J0Jyk7XG4gICAgfVxuICAgIGlmICggaGFzQ2xhc3ModGFyZ2V0LCAnbW92ZWRBZnRlclByZXYnKSApe1xuICAgICAgICByZW1vdmVDbGFzcyh0YXJnZXQsICdtb3ZlZEFmdGVyUHJldicpO1xuICAgICAgICBzZXRTdHlsZSh0YXJnZXQsIHtcbiAgICAgICAgICAgICd0b3AnIDogJ2F1dG8nXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vZ2V0IG5ldyB2YWx1ZXNcbiAgICB2YXIgdGFyZ2V0Qm90dG9tID0gZ2V0T2Zmc2V0Qm90dG9tKHRhcmdldCk7XG4gICAgLy9pZiB0aGUgdGFyZ2V0IGlzbid0IGFscmVhZHkgYXQgdGhlIGJvdHRvbVxuICAgIC8vY29uc29sZS5sb2codGFyZ2V0Qm90dG9tKTtcbiAgICBpZih0YXJnZXRCb3R0b20gPCB2aWV3SGVpZ2h0KSB7XG4gICAgICAgIC8vY2hlY2sgaWYgdGhlcmUgaXMgZW5vdWdoIHNwYWNlIHRvIGZpdCB0aGUgdGFyZ2V0XG4gICAgICAgIC8vZ2V0IHByZXZpb3VzIHNpYmxpbmcgcG9zaXRpb25cbiAgICAgICAgdmFyIGVsZUFib3ZlID0gZ2V0RmFtaWx5KHRhcmdldCwgJ3ByZXYnKTtcbiAgICAgICAgdmFyIGVsZUFib3ZlQm90dG9tID0gZ2V0T2Zmc2V0KGVsZUFib3ZlKS5ib3R0b207XG4gICAgICAgIHZhciBhdmFpbGFibGVTcGFjZSA9IHZpZXdIZWlnaHQgLSBlbGVBYm92ZUJvdHRvbTtcbiAgICAgICAgdmFyIHRhcmdldEhlaWdodCA9IGdldEhlaWdodCh0YXJnZXQpO1xuICAgICAgICBpZiAoIGF2YWlsYWJsZVNwYWNlID4gdGFyZ2V0SGVpZ2h0ICl7XG4gICAgICAgICAgICBhZGRDbGFzcyh0YXJnZXQsICdhcHBlbmRUb1ZpZXdwb3J0Jyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHZhciBlbGVBYm92ZVBvc2l0aW9uID0gZ2V0UG9zaXRpb24oZWxlQWJvdmUpO1xuICAgICAgICAgICAgLy9zZWUgaWYgcHJldmlvdXMgY29udGVudCBpcyBpbiB0aGUgZG9jdW1lbnQgZmxvdyBwb3NpdGlvbiBhdCBib3R0b20gb2YgcHJldiBzaWJsaW5nXG4gICAgICAgICAgICBpZihlbGVBYm92ZVBvc2l0aW9uID09PSBcImFic29sdXRlXCIpe1xuICAgICAgICAgICAgICAgIC8vRklYOiByZW5hbWUgcG9zaXRpb25BZnRlcigpO1xuICAgICAgICAgICAgICAgIG1vdmVBZnRlcih0YXJnZXQsIGVsZUFib3ZlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gbmF2Q2xhc3NlcygpIHtcblx0aWYgKG1vYmlsZU5hdk9ubHkgPT09IGZhbHNlKXtcblx0XHRpZiAodmlld1dpZHRoID49IDEwMjQpe1xuXHRcdFx0YWRkQ2xhc3MoaHRtbCwgJ2Rlc2t0b3BNZW51Jyk7XG5cdFx0XHRyZW1vdmVDbGFzcyhodG1sLCAnbW9iaWxlTWVudScpO1xuXHRcdH1cblx0XHRlbHNle1xuXHRcdFx0cmVtb3ZlQ2xhc3MoaHRtbCwgJ2Rlc2t0b3BNZW51Jyk7XG5cdFx0XHRhZGRDbGFzcyhodG1sLCdtb2JpbGVNZW51Jyk7XG5cdFx0fVxuXHR9XG59XG5cbi8qQWRkIG1vYmlsZU1lbnUgY2xhc3MgdG8gaHRtbCAqL1xuZnVuY3Rpb24gYWRkTWVudU9wZW5DbGFzcygpe1xuICAgIHJlbW92ZUNsYXNzKGh0bWwsICdkZXNrdG9wTWVudScpO1xuXHRyZW1vdmVDbGFzcyhodG1sLCAnbW9iaWxlTWVudUNsb3NlZCcpO1xuXHRhZGRDbGFzcyhodG1sLCAnbW9iaWxlTWVudU9wZW4nKTtcbiAgICBtZW51SGVpZ2h0KCk7XG59XG5cbi8qUmVtb3ZlIG1vYmlsZU1lbnUgY2xhc3MgZnJvbSBib2R5ICovXG5mdW5jdGlvbiByZW1vdmVNZW51T3BlbkNsYXNzKCl7XG5cdHJlbW92ZUNsYXNzKGh0bWwsICdtb2JpbGVNZW51T3BlbicpO1xuXHRhZGRDbGFzcyhodG1sLCAnbW9iaWxlTWVudUNsb3NlZCcpO1xuICAgIG5hdkNsYXNzZXMoKTsvL2NoZWNrIGlmIHdlIG5lZWQgdG8gcHV0IGJhY2sgJ2Rlc2t0b3BNZW51JyBvciAnbW9iaWxlTWVudSdcbiAgICBtZW51SGVpZ2h0KCk7XG59XG5cbi8vc2V0IHBvcnRyYWl0IC8gbGFuZHNjYXBlIGNsYXNzXG5mdW5jdGlvbiBnZXRPcmllbnRhdGlvbkNsYXNzKCl7XG5cdGlmICh2aWV3SGVpZ2h0ID4gdmlld1dpZHRoKSB7XG5cdFx0YWRkQ2xhc3MoaHRtbCwgJ3BvcnRyYWl0Jyk7XG5cdFx0cmVtb3ZlQ2xhc3MoaHRtbCwgJ2xhbmRzY2FwZScpO1xuXHRcdHJldHVybiBcInBvcnRyYWl0XCI7XG5cdH1cblx0ZWxzZXtcblx0XHRhZGRDbGFzcyhodG1sLCAnbGFuZHNjYXBlJyk7XG5cdFx0cmVtb3ZlQ2xhc3MoaHRtbCwgJ3BvcnRyYWl0Jyk7XG5cdFx0cmV0dXJuIFwibGFuZHNjYXBlXCI7XG5cdH1cbn1cblxuZnVuY3Rpb24gc2V0RGltZW5zaW9ucyh0YXJnZXQsIHRhcmdldEhlaWdodCwgYXNwUmFuZ2Upe1xuICAgIGpRdWVyeS53aGVuKFxuICAgICAgICBtYXRjaEhlaWdodCh0YXJnZXQsIHRhcmdldEhlaWdodClcbiAgICApXG4gICAgLnRoZW4oXG4gICAgICAgIG1heFNpemVCeUFzcCh0YXJnZXQsIGFzcFJhbmdlKVxuICAgICk7XG59XG5cbmZ1bmN0aW9uIG1vdmVPbk9yaWVudGF0aW9uKHRhcmdldCwgZGVzdGluYXRpb24sIGxhbmRzY2FwZSwgcG9ydHJhaXQpe1xuXHQvL0xBTkRTQ0FQRVxuXHRpZih2aWV3V2lkdGg+dmlld0hlaWdodCl7XG5cdFx0aWYobGFuZHNjYXBlID09IFwicHJlcGVuZFwiKXtcblx0XHRcdGpRdWVyeSh0YXJnZXQpLnByZXBlbmRUbyhkZXN0aW5hdGlvbik7XG5cdFx0fVxuXHRcdGlmKGxhbmRzY2FwZSA9PSBcImFwcGVuZFwiKXtcblx0XHRcdGpRdWVyeSh0YXJnZXQpLmFwcGVuZFRvKGRlc3RpbmF0aW9uKTtcblx0XHR9XG5cdFx0aWYobGFuZHNjYXBlID09IFwiYWZ0ZXJcIil7XG5cdFx0XHRqUXVlcnkodGFyZ2V0KS5pbnNlcnRBZnRlcihkZXN0aW5hdGlvbik7XG5cdFx0fVxuXHRcdGlmKGxhbmRzY2FwZSA9PSBcImJlZm9yZVwiKXtcblx0XHRcdGpRdWVyeSh0YXJnZXQpLmluc2VydEJlZm9yZShkZXN0aW5hdGlvbik7XG5cdFx0fVxuXHR9XG5cdC8vUE9SVFJBSVRcblx0ZWxzZXtcblx0XHRpZihwb3J0cmFpdCA9PSBcInByZXBlbmRcIikge1xuXHRcdFx0alF1ZXJ5KHRhcmdldCkucHJlcGVuZFRvKGRlc3RpbmF0aW9uKTtcblx0XHR9XG5cdFx0aWYocG9ydHJhaXQgPT0gXCJhcHBlbmRcIil7XG5cdFx0XHRqUXVlcnkodGFyZ2V0KS5hcHBlbmRUbyhkZXN0aW5hdGlvbik7XG5cdFx0fVxuXHRcdGlmKHBvcnRyYWl0ID09IFwiYWZ0ZXJcIil7XG5cdFx0XHRqUXVlcnkodGFyZ2V0KS5pbnNlcnRBZnRlcihkZXN0aW5hdGlvbik7XG5cdFx0fVxuXHRcdGlmKHBvcnRyYWl0ID09IFwiYmVmb3JlXCIpe1xuXHRcdFx0alF1ZXJ5KHRhcmdldCkuaW5zZXJ0QmVmb3JlKGRlc3RpbmF0aW9uKTtcblx0XHR9XG5cdH1cbn1cbiIsIi8qIGZ1bmN0aW9uIGdldEpzb24odXJsKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihzdWNjZXNzSGFuZGxlciwgZXJyb3JIYW5kbGVyKSB7XG5cdHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblx0eGhyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuXHRcdGlmICh4aHIuc3RhdHVzID49IDIwMCAmJiB4aHIuc3RhdHVzIDwgNDAwKSB7XG5cdFx0XHQvLyBTdWNjZXNzIVxuXHRcdFx0dmFyIGRhdGEgPSBKU09OLnBhcnNlKHhoci5yZXNwb25zZVRleHQpO1xuXHRcdFx0Ly9jb25zb2xlLmxvZyhcImpzb24gZGF0YTogXCIgKyBKU09OLnN0cmluZ2lmeShkYXRhKSApO1xuXHRcdFx0c3VjY2Vzc0hhbmRsZXIoZGF0YSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vIEVycm9yICFcblx0XHRcdGVycm9ySGFuZGxlcih7XG5cdFx0XHQgIHN0YXR1czogdGhpcy5zdGF0dXMsXG5cdFx0XHQgIHN0YXR1c1RleHQ6IHhoci5zdGF0dXNUZXh0XG5cdFx0XHR9KTtcblx0XHR9XG5cdH07XG5cdHhoci5vbmVycm9yID0gZnVuY3Rpb24gKCkge1xuXHRcdGVycm9ySGFuZGxlcih7XG5cdFx0XHRzdGF0dXM6IHRoaXMuc3RhdHVzLFxuXHRcdFx0c3RhdHVzVGV4dDogeGhyLnN0YXR1c1RleHRcblx0XHR9KTtcblx0fTtcblx0eGhyLm9wZW4oJ0dFVCcsIHVybCk7XG5cdHhoci5zZW5kKCk7XG4gIH0pO1xufVxuKi9cblxuLypcblVTQUdFOiAqKndpdGggcGhwIFVSTFxuXG5cdGdldEpzb24oJyA8P3BocCBlY2hvICgkanNvbl91cmwpOyA/PiAnKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuXHRcdC8vIENvZGUgZGVwZW5kaW5nIG9uIHJlc3VsdFxuXG5cdH0pLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcblx0XHRjb25zb2xlLmVycm9yKCdBdWdoLCB0aGVyZSB3YXMgYW4gZXJyb3IhJywgZXJyLnN0YXR1c1RleHQpO1xuXHR9KTtcblxuICovIiwiZnVuY3Rpb24gaGFzQ2xhc3MoZWxlLGNscykge1xuXHRyZXR1cm4gZWxlLmNsYXNzTmFtZS5tYXRjaChuZXcgUmVnRXhwKCcoXFxcXHN8XiknK2NscysnKFxcXFxzfGpRdWVyeSknKSk7XG59XG5cbmZ1bmN0aW9uIGFkZENsYXNzKGVsZSxjbHMpIHtcblx0aWYgKCFoYXNDbGFzcyhlbGUsY2xzKSkge2VsZS5jbGFzc05hbWUgKz0gXCIgXCIrY2xzO31cbn1cblxuZnVuY3Rpb24gcmVtb3ZlQ2xhc3MoZWxlLGNscykge1xuXHRpZiAoaGFzQ2xhc3MoZWxlLGNscykpIHtcblx0XHR2YXIgcmVnID0gbmV3IFJlZ0V4cCgnKFxcXFxzfF4pJytjbHMrJyhcXFxcc3xqUXVlcnkpJyk7XG5cdFx0ZWxlLmNsYXNzTmFtZT1lbGUuY2xhc3NOYW1lLnJlcGxhY2UocmVnLCcgJyk7XG5cdH1cbn1cblxuZnVuY3Rpb24gbWF4SCh0YXJnZXQsIHZhbHVlKXtcblx0alF1ZXJ5KHRhcmdldCkuY3NzKCdtYXgtaGVpZ2h0JywgdmFsdWUpO1xufVxuXG5mdW5jdGlvbiBtYXhXKHRhcmdldCwgdmFsdWUpe1xuXHRqUXVlcnkodGFyZ2V0KS5jc3MoJ21heC13aWR0aCcsIHZhbHVlKTtcbn1cblxuZnVuY3Rpb24gbWluSCh0YXJnZXQsIHZhbHVlKXtcblx0alF1ZXJ5KHRhcmdldCkuY3NzKCdtaW4taGVpZ2h0JywgdmFsdWUpO1xufVxuXG5mdW5jdGlvbiBtaW5XKHRhcmdldCwgdmFsdWUpe1xuXHRqUXVlcnkodGFyZ2V0KS5jc3MoJ21pbi13aWR0aCcsIHZhbHVlKTtcbn1cblxuZnVuY3Rpb24gbWF0Y2hIZWlnaHQodGFyZ2V0LCB0YXJnZXRIZWlnaHQpe1xuICAgIC8vY29uc29sZS5sb2coJ21hdGNoSGVpZ2h0KCkgLSB2aWV3SGVpZ2h0ICcgKyB3aW5kb3cuaW5uZXJIZWlnaHQpO1xuICAgIHRhcmdldEhlaWdodCA9IHRhcmdldEhlaWdodCA/IHRhcmdldEhlaWdodCA6IHdpbmRvdy5pbm5lckhlaWdodDtcblx0cmV0dXJuIGpRdWVyeSh0YXJnZXQpLmhlaWdodCh0YXJnZXRIZWlnaHQpO1xufVxuXG5mdW5jdGlvbiBtYXhTaXplQnlBc3AodGFyZ2V0LCBtaW5Bc3AsIG1heEFzcCl7XG4gICAgbWluQXNwID0gbWluQXNwID8gbWluQXNwIDogMS42O1xuICAgIG1heEFzcCA9IG1heEFzcCA/IG1heEFzcCA6IDIuMTtcblxuXHRqUXVlcnkodGFyZ2V0KS5jc3MoJ21heC1oZWlnaHQnLCAnbm9uZScpO1xuXHRqUXVlcnkodGFyZ2V0KS5jc3MoJ21pbi1oZWlnaHQnLCAwKTtcblxuICAgIHZhciB2aWV3V2lkdGggPSBqUXVlcnkod2luZG93KS53aWR0aCgpO1xuICAgIHZhciB2aWV3SGVpZ2h0ID0galF1ZXJ5KHdpbmRvdykuaGVpZ2h0KCk7XG5cdHZhciB0YXJnZXRBc3AgPSB2aWV3V2lkdGggLyB2aWV3SGVpZ2h0O1xuXG4gICAgLy9pZiBXSURFIC8gU0hPUlRcblx0aWYgKHRhcmdldEFzcCA+IG1heEFzcCl7XG5cdFx0bWluSCh0YXJnZXQsIHZpZXdXaWR0aCAvIG1heEFzcCk7XG5cdH1cblxuXHQvL2lmIFRBTEwgLyBTS0lOTllcblx0aWYgKHRhcmdldEFzcCA8IG1pbkFzcCl7XG5cdFx0bWF4SCh0YXJnZXQsIHZpZXdXaWR0aCAvIG1pbkFzcCApO1xuXHR9XG59XG5cbmZ1bmN0aW9uIGFzcExhYmVsKHdpZHRoLCBoZWlnaHQpe1xuXHRpZiAoIHdpZHRoIC8gaGVpZ2h0ID4gMS43NSApe1xuXHRcdHJldHVybiBcImxhbmRzY2FwZSBzaG9ydFdpZGVcIjtcblx0fVxuXG5cdGVsc2UgaWYgKCB3aWR0aCA+IGhlaWdodCApe1xuXHRcdHJldHVybiBcImxhbmRzY2FwZVwiO1xuXHR9XG5cblx0ZWxzZSBpZiAoIHdpZHRoIC8gaGVpZ2h0IDwgMC43NSApe1xuXHRcdHJldHVybiBcInBvcnRyYWl0IHRhbGxTa2lubnlcIjtcblx0fVxuXG5cdGVsc2UgaWYgKCB3aWR0aCA8IGhlaWdodCApe1xuXHRcdHJldHVybiBcInBvcnRyYWl0XCI7XG5cdH1cblxuXHRlbHNle1xuXHRcdHJldHVybiBcInNxdWFyZVwiO1xuXHR9XG59XG5cbi8vRklYOiB3aHkgYW0gSSB1c2luZyB0aGlzP1xuLypcbmZ1bmN0aW9uIHdpZGVyVGhhbihtaW4sIG1heCwgdGFyZ2V0KXtcbiAgICB2YXIgaXNXaWRlcjtcbiAgICBpZighdGFyZ2V0KXtcblx0XHR0YXJnZXQgPSBqUXVlcnkod2luZG93KTtcblx0fVxuXG5cdGlmIChtYXgpe1xuXHRcdGlmKCAobWF4ID4gd2lkdGgodGFyZ2V0KSApICYmICggbWluIDwgd2lkdGgodGFyZ2V0KSApICl7XG5cdFx0XHRpc1dpZGVyID0gdHJ1ZTtcblx0XHR9XG5cdH1cblx0ZWxzZSBpZiggbWluIDwgd2lkdGgodGFyZ2V0KSApe1xuXHRcdGlzV2lkZXIgPSB0cnVlO1xuXHR9XG5cdGVsc2V7XG5cdFx0aXNXaWRlciA9ICBmYWxzZTtcblx0fVxuICAgIHJldHVybiBpc1dpZGVyO1xufSovXG4iLCIndXNlIHN0cmljdCc7XG4vKmpzaGludCAtVzExNyAqL1xuXG4vL0NvbWJpbmUgMiBhcnJheXNcbi8vUmV0dXJucyBhIG5vbi1kZXN0cnVjdGl2ZSByZXN1bHQgY29udGFpbmluZyBib3RoIGFycmF5c1xuZnVuY3Rpb24gam9pbkFycmF5cyhmaXJzdEFycmF5LCBzZWNvbmRBcnJheSl7XG4gICAgdmFyIG1lcmdlZEFycmF5ID0gZmlyc3RBcnJheS5jb25jYXQoc2Vjb25kQXJyYXkpO1xuICAgIHJldHVybiBtZXJnZWRBcnJheTtcbn1cblxuLy9GaW5kIHRoZSBudW1iZXIgb2YgZWxlbWVudHMgaW4gdGhpcyBhcnJheVxuZnVuY3Rpb24gZ2V0QXJyYXlMZW5ndGgodGhpc0FycmF5KXtcbiAgICByZXR1cm4gdGhpc0FycmF5Lmxlbmd0aDtcbn1cblxuXG4vL0ZpbmQgdGhlIGluZGV4IHBvc2l0aW9uIG9mIGFuIGl0ZW0gaW4gYW4gYXJyYXlcbmZ1bmN0aW9uIGdldEFycmF5UG9zaXRpb24odGhpc0FycmF5LCB0aGlzSXRlbSl7XG4gICAgcmV0dXJuIHRoaXNBcnJheS5pbmRleE9mKHRoaXNJdGVtKTtcbn1cblxuXG4vL1BvcCwgUHVzaCwgU2hpZnQsIGFuZCBVbnNoaWZ0XG5mdW5jdGlvbiByZW1vdmVGcm9tQXJyYXkodGhpc0FycmF5LCB0aGlzUG9zaXRpb24pe1xuICAgIHN3aXRjaCAodGhpc1Bvc2l0aW9uKSB7XG4gICAgICAgIGNhc2UgXCJsYXN0XCI6XG4gICAgICAgICAgICAvL3JlbW92ZSBmcm9tIGVuZCBvZiBhcnJheVxuICAgICAgICAgICAgcmV0dXJuIHRoaXNBcnJheS5wb3A7XG4gICAgICAgIGNhc2UgXCJmaXJzdFwiOlxuICAgICAgICAgICAgLy9yZW1vdmUgZnJvbSBzdGFydCBvZiBhcnJheVxuICAgICAgICAgICAgcmV0dXJuIHRoaXNBcnJheS5zaGlmdDtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIC8vcmVtb3ZlIHNwZWNpZmljIGluZGV4XG4gICAgICAgICAgICByZXR1cm4gZGVsZXRlIGFycmF5W3RoaXNQb3NpdGlvbl07XG4gICAgfVxufVxuXG5mdW5jdGlvbiBhZGRUb0FycmF5KCB0aGlzQXJyYXksIHRoaXNQb3NpdGlvbiwgdGhpc1ZhbHVlICl7XG4gICAgc3dpdGNoICh0aGlzUG9zaXRpb24pIHtcbiAgICAgICAgY2FzZSBcImxhc3RcIjpcbiAgICAgICAgICAgIC8vYWRkIHRvIGVuZCBvZiBhcnJheVxuICAgICAgICAgICAgcmV0dXJuIHRoaXNBcnJheS5wdXNoKHRoaXNWYWx1ZSk7XG4gICAgICAgIGNhc2UgXCJmaXJzdFwiOlxuICAgICAgICAgICAgLy9hZGQgdG8gc3RhcnQgb2YgYXJyYXlcbiAgICAgICAgICAgIHJldHVybiB0aGlzQXJyYXkudW5zaGlmdCh0aGlzUG9zaXRpb24pO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgLy9hZGQgdmFsdWUgdG8gaW5kZXggcG9zaXRpb25cbiAgICAgICAgICAgIHRoaXNBcnJheVt0aGlzUG9zaXRpb25dID0gdGhpc1ZhbHVlO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXNBcnJheTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGNvbnZlcnRBcnJheVRvU3RyaW5nKHRoaXNBcnJheSwgc2VwYXJhdG9yKXtcbiAgICByZXR1cm4gdGhpc0FycmF5LmpvaW4oc2VwYXJhdG9yKTtcbn0iLCIvL2JveCgpIGlzIGEgY29udmVuaWVudCByZWZlcmVuY2UgZnVuY3Rpb24gZm9yIGdldHRpbmcgaW50IHZhbHVlcyBmb3IgYm94TW9kZWwgcHJvcGVydGllc1xuZnVuY3Rpb24gYm94KGVsZW1lbnQpe1xuICAgIHZhciB0aGlzSGVpZ2h0ICAgICAgPSBnZXRIZWlnaHQoZWxlbWVudCk7XG4gICAgLy9jb25zb2xlLmxvZyhcImJveCgpIC0gdGhpc0hlaWdodDogXCIgKyB0aGlzSGVpZ2h0KTtcbiAgICB2YXIgdGhpc1dpZHRoICAgICAgID0gZ2V0V2lkdGgoZWxlbWVudCk7XG4gICAgdmFyIHRoaXNNYXJnaW4gICAgICA9IGdldE1hcmdpbihlbGVtZW50KTtcbiAgICB2YXIgdGhpc1BhZGRpbmcgICAgID0gZ2V0UGFkZGluZyhlbGVtZW50KTtcbiAgICB2YXIgdGhpc1Bvc2l0aW9uICAgID0gZ2V0UG9zaXRpb24oZWxlbWVudCk7XG4gICAgdmFyIHRoaXNPdXRlckhlaWdodCA9IGdldE91dGVySGVpZ2h0KGVsZW1lbnQsIHRoaXNIZWlnaHQsIHRoaXNNYXJnaW4sIHRoaXNQYWRkaW5nKTtcbiAgICB2YXIgdGhpc091dGVyV2lkdGggID0gZ2V0T3V0ZXJXaWR0aChlbGVtZW50LCB0aGlzV2lkdGgsIHRoaXNNYXJnaW4sIHRoaXNQYWRkaW5nKTtcbiAgICB2YXIgdGhpc09mZnNldCAgICAgID0gZ2V0T2Zmc2V0KGVsZW1lbnQsIHRoaXNPdXRlckhlaWdodCwgdGhpc091dGVyV2lkdGgpO1xuICAgIC8vY29uc29sZS5sb2coXCJib3goKSAtIHRoaXNPdXRlckhlaWdodDogXCIgKyB0aGlzT3V0ZXJIZWlnaHQpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgaGVpZ2h0OiB0aGlzSGVpZ2h0LFxuICAgICAgICB3aWR0aDogdGhpc1dpZHRoLFxuICAgICAgICBtYXJnaW46IHtcbiAgICAgICAgICAgICd0b3AnICAgOiB0aGlzTWFyZ2luLnRvcCxcbiAgICAgICAgICAgICdyaWdodCcgOiB0aGlzTWFyZ2luLnJpZ2h0LFxuICAgICAgICAgICAgJ2JvdHRvbSc6IHRoaXNNYXJnaW4uYm90dG9tLFxuICAgICAgICAgICAgJ2xlZnQnICA6IHRoaXNNYXJnaW4ubGVmdFxuICAgICAgICB9LFxuICAgICAgICBwYWRkaW5nOiB7XG4gICAgICAgICAgICAndG9wJyAgIDogdGhpc1BhZGRpbmcudG9wLFxuICAgICAgICAgICAgJ3JpZ2h0JyA6IHRoaXNQYWRkaW5nLnJpZ2h0LFxuICAgICAgICAgICAgJ2JvdHRvbSc6IHRoaXNQYWRkaW5nLmJvdHRvbSxcbiAgICAgICAgICAgICdsZWZ0JyAgOiB0aGlzUGFkZGluZy5sZWZ0XG4gICAgICAgIH0sXG4gICAgICAgIHBvc2l0aW9uOiB0aGlzUG9zaXRpb24sXG4gICAgICAgIG9mZnNldDp7XG4gICAgICAgICAgICAndG9wJyAgIDogdGhpc09mZnNldC50b3AsXG4gICAgICAgICAgICAncmlnaHQnIDogdGhpc09mZnNldC5yaWdodCxcbiAgICAgICAgICAgICdib3R0b20nOiB0aGlzT2Zmc2V0LmJvdHRvbSxcbiAgICAgICAgICAgICdsZWZ0JyAgOiB0aGlzT2Zmc2V0LmxlZnRcbiAgICAgICAgfSxcbiAgICAgICAgb3V0ZXJIZWlnaHQ6IHRoaXNPdXRlckhlaWdodCxcbiAgICAgICAgb3V0ZXJXaWR0aDogdGhpc091dGVyV2lkdGhcbiAgICB9O1xufVxuXG5mdW5jdGlvbiBoZWlnaHQoZWxlbWVudCwgaGVpZ2h0KXtcbiAgICBpZiAoaGVpZ2h0KXtcbiAgICAgICAgc2V0SGVpZ2h0KGVsZW1lbnQsIGhlaWdodCk7XG4gICAgfVxuICAgIGVsc2V7XG4gICAgICAgIGdldEhlaWdodChlbGVtZW50KTtcbiAgICB9XG59XG5cbiAgICAvL2dldCB0aGUgY29tcHV0ZWQgc3R5bGUgaGVpZ2h0XG4gICAgZnVuY3Rpb24gZ2V0SGVpZ2h0KGVsZW1lbnQpe1xuICAgICAgICB2YXIgdGhpc0hlaWdodCA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpLmdldFByb3BlcnR5VmFsdWUoXCJoZWlnaHRcIik7XG4gICAgICAgIHJldHVybiB0b0ludCh0aGlzSGVpZ2h0KTtcbiAgICB9XG5cbiAgICAvL3NldCBoZWlnaHQgYXMgc3RyaW5nIHB4IHZhbHVlLFxuICAgIGZ1bmN0aW9uIHNldEhlaWdodChlbGVtZW50LCBoZWlnaHQpe1xuICAgICAgICB2YXIgdGhpc0hlaWdodCA9IHRvUGl4KGhlaWdodCk7XG4gICAgICAgIC8vY29uc29sZS5sb2coXCJzZXRIZWlnaHQgLSBcIiArIGVsZW1lbnQuaWQgKyBcIiAtIFwiICsgaGVpZ2h0KTtcbiAgICAgICAgZWxlbWVudC5zdHlsZS5oZWlnaHQgPSB0aGlzSGVpZ2h0O1xuICAgIH1cblxuLy9zZXQgd2lkdGggdG8gdGhpc1dpZHRoIGFzIHN0cmluZyBweCB2YWx1ZSwgb3IgZ2V0IHRoZSBjb21wdXRlZCBzdHlsZSB3aWR0aFxuZnVuY3Rpb24gd2lkdGgoZWxlbWVudCwgd2lkdGgpe1xuICAgIGlmICh3aWR0aCl7XG4gICAgICAgIHNldFdpZHRoKGVsZW1lbnQsIHdpZHRoKTtcbiAgICB9XG4gICAgZWxzZXtcbiAgICAgICAgZ2V0V2lkdGgoZWxlbWVudCk7XG4gICAgfVxufVxuXG4gICAgLy9nZXQgdGhlIGNvbXB1dGVkIHN0eWxlIHdpZHRoXG4gICAgZnVuY3Rpb24gZ2V0V2lkdGgoZWxlbWVudCl7XG4gICAgICAgIHZhciB0aGlzV2lkdGggPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KS5nZXRQcm9wZXJ0eVZhbHVlKFwid2lkdGhcIik7XG4gICAgICAgIC8vY29uc29sZS5sb2coXCJnZXRXaWR0aCAtIFwiICsgZWxlbWVudC5pZCk7XG4gICAgICAgIHJldHVybiB0b0ludCh0aGlzV2lkdGgpO1xuICAgIH1cblxuICAgIC8vc2V0IHdpZHRoIGFzIHN0cmluZyBweCB2YWx1ZSxcbiAgICBmdW5jdGlvbiBzZXRXaWR0aChlbGVtZW50LCB3aWR0aCl7XG4gICAgICAgIHZhciB0aGlzV2lkdGggPSB0b1BpeCh3aWR0aCk7XG4gICAgICAgIC8vY29uc29sZS5sb2coXCJzZXRXaWR0aCAtIFwiICsgZWxlbWVudC5pZCArIFwiIC0gXCIgKyB0aGlzV2lkdGgpO1xuICAgICAgICBlbGVtZW50LnN0eWxlLndpZHRoID0gdGhpc1dpZHRoO1xuICAgIH1cblxuXG4vL01JTiBIRUlHSFRcbmZ1bmN0aW9uIG1pbkhlaWdodChlbGVtZW50LCBtaW5IZWlnaHQpe1xuICAgIGlmIChtaW5IZWlnaHQpe1xuICAgICAgICBzZXRNaW5IZWlnaHQoZWxlbWVudCwgbWluSGVpZ2h0KTtcbiAgICB9XG4gICAgZWxzZXtcbiAgICAgICAgZ2V0TWluSGVpZ2h0KGVsZW1lbnQpO1xuICAgIH1cbn1cbiAgICAvL2dldCB0aGUgY29tcHV0ZWQgc3R5bGUgb2YgbWluLWhlaWdodFxuICAgIGZ1bmN0aW9uIGdldE1pbkhlaWdodChlbGVtZW50KXtcbiAgICAgICAgdmFyIHRoaXNNaW5IZWlnaHQgPSBnZXRTdHlsZShlbGVtZW50LCBcIm1pbkhlaWdodFwiKTtcbiAgICAgICAgcmV0dXJuIHRvSW50KHRoaXNNaW5IZWlnaHQpO1xuICAgIH1cblxuICAgIC8vc2V0IG1pbkhlaWdodCBhcyBweCB2YWx1ZSxcbiAgICBmdW5jdGlvbiBzZXRNaW5IZWlnaHQoZWxlbWVudCwgbWluSGVpZ2h0KXtcbiAgICAgICAgdmFyIHRoaXNNaW5IZWlnaHQgPSB0b1BpeChtaW5IZWlnaHQpO1xuICAgICAgICBzZXRTdHlsZShlbGVtZW50LCB7XCJtaW5IZWlnaHRcIiAgOiB0aGlzTWluSGVpZ2h0fSk7XG4gICAgfVxuXG4gICAgLy9zZXQgd2lkdGggYXMgcHggdmFsdWUsIG9yIGdldCB0aGUgY29tcHV0ZWQgc3R5bGUgd2lkdGhcbiAgICBmdW5jdGlvbiBtaW5XaWR0aChlbGVtZW50LCBtaW5XaWR0aCl7XG4gICAgICAgIGlmIChtaW5XaWR0aCl7XG4gICAgICAgICAgICBzZXRNaW5XaWR0aChlbGVtZW50LCBtaW5XaWR0aCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIGdldE1pbldpZHRoKGVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgfVxuICAgICAgICAvL2dldCBtaW4td2lkdGggZnJvbSB0aGUgY29tcHV0ZWQgc3R5bGVcbiAgICAgICAgZnVuY3Rpb24gZ2V0TWluV2lkdGgoZWxlbWVudCl7XG4gICAgICAgICAgICB2YXIgdGhpc01pbldpZHRoID0gZ2V0U3R5bGUoZWxlbWVudCwgXCJtaW5XaWR0aFwiKTtcbiAgICAgICAgICAgIHJldHVybiB0b0ludCh0aGlzTWluV2lkdGgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9zZXQgbWluLXdpZHRoIGFzIHN0cmluZyBweCB2YWx1ZSxcbiAgICAgICAgZnVuY3Rpb24gc2V0TWluV2lkdGgoZWxlbWVudCwgbWluV2lkdGgpe1xuICAgICAgICAgICAgdmFyIHRoaXNNaW5XaWR0aCA9IHRvUGl4KHRoaXNNaW5XaWR0aCk7XG4gICAgICAgICAgICByZXR1cm4gc2V0U3R5bGUoZWxlbWVudCwge1wibWluV2lkdGhcIiAgOiB0aGlzTWluV2lkdGh9KTtcbiAgICAgICAgfVxuXG5mdW5jdGlvbiBnZXRNYXJnaW4oZWxlbWVudCl7XG4gICAgdmFyIHRoaXNNYXJnaW5Ub3AgPSAgICAgdG9JbnQoIGdldFN0eWxlKGVsZW1lbnQsIFwibWFyZ2luVG9wXCIpICk7XG4gICAgdmFyIHRoaXNNYXJnaW5SaWdodCA9ICAgdG9JbnQoIGdldFN0eWxlKGVsZW1lbnQsIFwibWFyZ2luUmlnaHRcIikgKTtcbiAgICB2YXIgdGhpc01hcmdpbkJvdHRvbSA9ICB0b0ludCggZ2V0U3R5bGUoZWxlbWVudCwgXCJtYXJnaW5Cb3R0b21cIikgKTtcbiAgICB2YXIgdGhpc01hcmdpbkxlZnQgPSAgICB0b0ludCggZ2V0U3R5bGUoZWxlbWVudCwgXCJtYXJnaW5MZWZ0XCIpICk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICB0b3A6IHRoaXNNYXJnaW5Ub3AsXG4gICAgICAgIHJpZ2h0OiB0aGlzTWFyZ2luUmlnaHQsXG4gICAgICAgIGJvdHRvbTogdGhpc01hcmdpbkJvdHRvbSxcbiAgICAgICAgbGVmdDogdGhpc01hcmdpbkxlZnRcbiAgICB9O1xufVxuXG5mdW5jdGlvbiBnZXRQYWRkaW5nKGVsZW1lbnQpe1xuICAgIC8vY29uc29sZS5sb2coXCJnZXRQYWRkaW5nIGZvcjogXCIgKyBlbGVtZW50LmlkKTtcbiAgICB2YXIgdGhpc1BhZGRpbmdUb3AgPSAgICB0b0ludCggZ2V0U3R5bGUoZWxlbWVudCwgXCJwYWRkaW5nVG9wXCIpICk7XG4gICAgdmFyIHRoaXNQYWRkaW5nUmlnaHQgPSAgdG9JbnQoIGdldFN0eWxlKGVsZW1lbnQsIFwicGFkZGluZ1JpZ2h0XCIpICk7XG4gICAgdmFyIHRoaXNQYWRkaW5nQm90dG9tID0gdG9JbnQoIGdldFN0eWxlKGVsZW1lbnQsIFwicGFkZGluZ0JvdHRvbVwiKSApO1xuICAgIHZhciB0aGlzUGFkZGluZ0xlZnQgPSAgIHRvSW50KCBnZXRTdHlsZShlbGVtZW50LCBcInBhZGRpbmdMZWZ0XCIpICk7XG4gICAgLy9jb25zb2xlLmxvZyhcImdldFBhZGRpbmcoKSAtIHRvcDogXCIgKyB0aGlzUGFkZGluZ1RvcCk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICB0b3A6IHRoaXNQYWRkaW5nVG9wLFxuICAgICAgICByaWdodDogdGhpc1BhZGRpbmdSaWdodCxcbiAgICAgICAgYm90dG9tOiB0aGlzUGFkZGluZ0JvdHRvbSxcbiAgICAgICAgbGVmdDogdGhpc1BhZGRpbmdMZWZ0XG4gICAgfTtcbn1cblxuZnVuY3Rpb24gZ2V0UG9zaXRpb24oZWxlbWVudCkge1xuICAgIHZhciB0aGlzUG9zaXRpb24gPSBnZXRTdHlsZShlbGVtZW50LCBcInBvc2l0aW9uXCIpO1xuICAgIC8vY29uc29sZS5sb2coXCJnZXRQb3NpdGlvbigpIGZvciBcIiArIGVsZW1lbnQuaWQgKyBcIiA6IFwiICsgdGhpc1Bvc2l0aW9uKTtcbiAgICByZXR1cm4gdGhpc1Bvc2l0aW9uO1xufVxuXG5mdW5jdGlvbiBnZXRPZmZzZXQoZWxlbWVudCwgb3V0ZXJIZWlnaHQsIG91dGVyV2lkdGgpe1xuICAgIC8vY29uc29sZS5sb2coXCJnZXRPZmZzZXQoKSAtIG91dGVySGVpZ2h0OiBcIiArIG91dGVySGVpZ2h0ICk7XG4gICAgb3V0ZXJIZWlnaHQgPSBvdXRlckhlaWdodCA/IG91dGVySGVpZ2h0IDogZ2V0T3V0ZXJIZWlnaHQoZWxlbWVudCk7XG4gICAgb3V0ZXJXaWR0aCAgPSBvdXRlcldpZHRoICA/IG91dGVyV2lkdGggIDogZ2V0T3V0ZXJXaWR0aChlbGVtZW50KTtcbiAgICB2YXIgdGhpc1RvcCA9IGdldE9mZnNldFRvcChlbGVtZW50KTtcbiAgICB2YXIgdGhpc1JpZ2h0ID0gZ2V0T2Zmc2V0UmlnaHQoZWxlbWVudCwgb3V0ZXJXaWR0aCk7XG4gICAgdmFyIHRoaXNCb3R0b20gPSBnZXRPZmZzZXRCb3R0b20oZWxlbWVudCwgb3V0ZXJIZWlnaHQpO1xuICAgIHZhciB0aGlzTGVmdCA9IGdldE9mZnNldExlZnQoZWxlbWVudCk7XG5cbiAgICB2YXIgdGhlc2VPZmZzZXRzID0ge1xuICAgICAgICB0b3A6IHRoaXNUb3AsXG4gICAgICAgIHJpZ2h0OiB0aGlzUmlnaHQsXG4gICAgICAgIGJvdHRvbTogdGhpc0JvdHRvbSxcbiAgICAgICAgbGVmdDogdGhpc0xlZnRcbiAgICB9O1xuICAgIC8vY29uc29sZS5sb2coXCJnZXRPZmZzZXQoKSA6IFwiICsgdGhlc2VPZmZzZXRzKTtcbiAgICByZXR1cm4gdGhlc2VPZmZzZXRzO1xufVxuXG5mdW5jdGlvbiBnZXRPZmZzZXRUb3AoZWxlbWVudCl7XG4gICAgdmFyIHRoaXNUb3AgPSAwO1xuICAgIHdoaWxlKGVsZW1lbnQpe1xuICAgICAgICB0aGlzVG9wICs9IChlbGVtZW50Lm9mZnNldFRvcCAtIGVsZW1lbnQuc2Nyb2xsVG9wICsgZWxlbWVudC5jbGllbnRUb3ApO1xuICAgICAgICBlbGVtZW50ID0gZWxlbWVudC5vZmZzZXRQYXJlbnQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXNUb3A7XG59XG5cbmZ1bmN0aW9uIGdldE9mZnNldEJvdHRvbShlbGVtZW50LCBvdXRlckhlaWdodCl7XG4gICAgb3V0ZXJIZWlnaHQgPSBvdXRlckhlaWdodCA/IG91dGVySGVpZ2h0IDogZ2V0T3V0ZXJIZWlnaHQoZWxlbWVudCk7XG4gICAgdmFyIHRoaXNFbGVtZW50VG9wID0gZ2V0T2Zmc2V0VG9wKGVsZW1lbnQpO1xuXG4gICAgLy9jb25zb2xlLmxvZyhcImdldE9mZnNldEJvdHRvbSgpIC0gZWxlbWVudFRvcDogXCIgKyB0aGlzRWxlbWVudFRvcCApO1xuICAgIC8vY29uc29sZS5sb2coXCJnZXRPZmZzZXRCb3R0b20oKSAtIG91dGVySGVpZ2h0OiBcIiArIG91dGVySGVpZ2h0ICk7XG5cbiAgICB2YXIgdGhpc09mZnNldEJvdHRvbSA9IHRoaXNFbGVtZW50VG9wICsgb3V0ZXJIZWlnaHQ7XG5cbiAgICByZXR1cm4gdGhpc09mZnNldEJvdHRvbTtcbn1cblxuZnVuY3Rpb24gZ2V0T2Zmc2V0TGVmdChlbGVtZW50KXtcbiAgICB2YXIgdGhpc0xlZnQgPSAwO1xuICAgIHdoaWxlKGVsZW1lbnQpIHtcbiAgICAgICAgdGhpc0xlZnQgKz0gKGVsZW1lbnQub2Zmc2V0VG9wIC0gZWxlbWVudC5zY3JvbGxUb3AgKyBlbGVtZW50LmNsaWVudFRvcCk7XG4gICAgICAgIGVsZW1lbnQgPSBlbGVtZW50Lm9mZnNldFBhcmVudDtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpc0xlZnQ7XG59XG5cbmZ1bmN0aW9uIGdldE9mZnNldFJpZ2h0KGVsZW1lbnQsIG91dGVyV2lkdGgpe1xuICAgIG91dGVyV2lkdGggPSBvdXRlcldpZHRoID8gb3V0ZXJXaWR0aCA6IGdldE91dGVyV2lkdGgoZWxlbWVudCk7XG4gICAgdmFyIHRoaXNPZmZzZXRMZWZ0ID0gZ2V0T2Zmc2V0TGVmdChlbGVtZW50KTtcbiAgICB2YXIgdGhpc09mZnNldEJvdHRvbSA9IHRoaXNPZmZzZXRMZWZ0ICsgb3V0ZXJXaWR0aDtcblxuICAgIHJldHVybiB0aGlzT2Zmc2V0Qm90dG9tO1xufVxuXG5cbi8vb3V0ZXJIZWlnaHQgKyBvdXRlcldpZHRoIGNhbGN1bGF0aW9uc1xuZnVuY3Rpb24gZ2V0T3V0ZXJIZWlnaHQoZWxlbWVudCwgaGVpZ2h0LCBtYXJnaW4sIHBhZGRpbmcpe1xuICAgICBoZWlnaHQgPSBoZWlnaHQgPyBoZWlnaHQgOiBnZXRIZWlnaHQoZWxlbWVudCk7XG4gICAgIG1hcmdpbiA9IG1hcmdpbiA/IG1hcmdpbiA6IGdldE1hcmdpbihlbGVtZW50KTtcbiAgICAgcGFkZGluZyA9IHBhZGRpbmcgPyBwYWRkaW5nIDogZ2V0UGFkZGluZyhlbGVtZW50KTtcbiAgICAvL2NvbnNvbGUubG9nKHBhZGRpbmcpO1xuXG4gICAgLy9nZXQvYWRkIHZlcnRpY2FsIG1hcmdpbiBhbmQgcGFkZGluZyB2YWx1ZXMgdG8gaGVpZ2h0XG4gICAgdmFyIHRoaXNWZXJ0TWFyZ2luID0gbWFyZ2luLnRvcCArIG1hcmdpbi5ib3R0b207XG4gICAgdmFyIHRoaXNWZXJ0UGFkZGluZyA9IHBhZGRpbmcudG9wICsgcGFkZGluZy5ib3R0b207XG4gICAgdmFyIHRoaXNPdXRlckhlaWdodCA9IGhlaWdodCArIHRoaXNWZXJ0TWFyZ2luICsgdGhpc1ZlcnRQYWRkaW5nO1xuXG4gICAgcmV0dXJuIHRoaXNPdXRlckhlaWdodDtcbn1cblxuZnVuY3Rpb24gZ2V0T3V0ZXJXaWR0aChlbGVtZW50LCB3aWR0aCwgbWFyZ2luLCBwYWRkaW5nKXtcbiAgICB3aWR0aCA9IHdpZHRoID8gd2lkdGggOiBnZXRXaWR0aChlbGVtZW50KTtcbiAgICBtYXJnaW4gPSBtYXJnaW4gPyBtYXJnaW4gOiBnZXRNYXJnaW4oZWxlbWVudCk7XG4gICAgcGFkZGluZyA9IHBhZGRpbmcgPyBwYWRkaW5nIDogZ2V0UGFkZGluZyhlbGVtZW50KTtcblxuICAgIC8vZ2V0L2FkZCBob3Jpem9udGFsIG1hcmdpbiBhbmQgcGFkZGluZyB2YWx1ZXMgdG8gd2lkdGhcbiAgICB2YXIgdGhpc0hvcnpNYXJnaW4gPSBtYXJnaW4ubGVmdCArIG1hcmdpbi5yaWdodDtcbiAgICB2YXIgdGhpc0hvcnpQYWRkaW5nID0gcGFkZGluZy5sZWZ0ICsgcGFkZGluZy5yaWdodDtcbiAgICB2YXIgdGhpc091dGVyV2lkdGggPSB3aWR0aCArIHRoaXNIb3J6TWFyZ2luICsgdGhpc0hvcnpQYWRkaW5nO1xuXG4gICAgcmV0dXJuIHRoaXNPdXRlcldpZHRoO1xufVxuIiwiLy8gZ2V0IGVsZW1lbnQgYnkgSWQgPiBjbGFzcyA+IHNlbGVjdG9yXG5mdW5jdGlvbiBnZXQoc2VsZWN0b3IsIGZhbWlseSl7XG4gICAgdmFyIHRoaXNUYXJnZXQ7IC8vY29udGFpbnMgcmVzdWx0aW5nIGVsZW1lbnQocykgZnJvbSBnZXQoKVxuXG4gICAgaWYgKGZhbWlseSl7XG4gICAgICAgIHRoaXNUYXJnZXQgPSBnZXRGYW1pbHkoc2VsZWN0b3IsIGZhbWlseSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBpZiggZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoc2VsZWN0b3IpICl7XG4gICAgICAgICAgICB0aGlzVGFyZ2V0ID0gIGdldEJ5SWQoc2VsZWN0b3IpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoc2VsZWN0b3IpKXtcbiAgICAgICAgICAgIHRoaXNUYXJnZXQgPSAgZ2V0QnlDbGFzcyhzZWxlY3Rvcik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHRoaXNUYXJnZXQgPSBnZXRCeVNlbGVjdG9yKHNlbGVjdG9yKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvL2NvbnNvbGUubG9nKFwiZ2V0KCkgY2FsbGVkIG9uOiBcIiArIHNlbGVjdG9yICsgXCIgcmV0dXJuZWQ6IFwiICsgdGhpc1RhcmdldCk7XG4gICAgcmV0dXJuIHRoaXNUYXJnZXQ7XG59XG5cbiAgICBmdW5jdGlvbiBnZXRCeUlkKGlkKXtcbiAgICAgICAgdmFyIHRoaXNUYXJnZXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7XG4gICAgICAgIHJldHVybiB0aGlzVGFyZ2V0O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldEJ5Q2xhc3MoY2xhc3NOYW1lKXtcbiAgICAgICAgdmFyIHRoaXNUYXJnZXQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGNsYXNzTmFtZSk7XG4gICAgICAgIHJldHVybiB0aGlzVGFyZ2V0O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldEJ5U2VsZWN0b3Ioc2VsZWN0b3Ipe1xuICAgICAgICB2YXIgdGhpc1RhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwodGhpc1NlbGVjdG9yKTtcbiAgICAgICAgcmV0dXJuIHRoaXNUYXJnZXQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0RmFtaWx5KGVsZW1lbnQsIGZhbWlseSl7XG4gICAgICAgIHZhciB0aGlzRmFtaWx5O1xuICAgICAgICBzd2l0Y2ggKGZhbWlseSl7XG4gICAgICAgICAgICBjYXNlIFwicHJldlwiOlxuICAgICAgICAgICAgICAgIHRoaXNGYW1pbHkgPSBnZXRQcmV2KGVsZW1lbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIm5leHRcIjpcbiAgICAgICAgICAgICAgICB0aGlzRmFtaWx5ID0gZ2V0TmV4dChlbGVtZW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJwYXJlbnRcIjpcbiAgICAgICAgICAgICAgICB0aGlzRmFtaWx5ID0gZ2V0UGFyZW50KGVsZW1lbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgLyogRklYOiBBZGQgY2hpbGQgYW5kIGNoaWxkcmVuXG4gICAgICAgICAgICBjYXNlIFwiY2hpbGRcIjpcbiAgICAgICAgICAgICAgICB2YXIgdGhpc1RhcmdldCA9IGdldE5leHQoZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiY2hpbGRyZW5cIjpcbiAgICAgICAgICAgICAgICB2YXIgdGhpc1RhcmdldCA9IGdldE5leHQoZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAqL1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzRmFtaWx5O1xuICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBnZXRQcmV2KGVsZW1lbnQpe1xuICAgICAgICAgICAgdmFyIHRoaXNTaWJsaW5nID0gZWxlbWVudC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXNTaWJsaW5nO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gZ2V0TmV4dChlbGVtZW50KXtcbiAgICAgICAgICAgIHZhciB0aGlzU2libGluZyA9IGVsZW1lbnQubmV4dEVsZW1lbnRTaWJsaW5nO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXNTaWJsaW5nO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gZ2V0UGFyZW50KGVsZW1lbnQpe1xuICAgICAgICAgICAgdmFyIHRoaXNQYXJlbnQgPSBlbGVtZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiZ2V0UGFyZW50IC0gXCIgKyBlbGVtZW50LmlkICsgXCIgLSBcIiArIHRoaXNQYXJlbnQpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXNQYXJlbnQ7XG4gICAgICAgIH1cblxuZnVuY3Rpb24gbW92ZUFmdGVyKGVsZW1lbnQsIHRhcmdldCl7XG4gICAgdmFyIHRoaXNUb3AgPSBnZXRPZmZzZXRCb3R0b20odGFyZ2V0KTtcbiAgICBhZGRDbGFzcyh0YXJnZXQsIFwibW92ZWRBZnRlclwiKTtcbiAgICBzdHlsZShlbGVtZW50LCB7XG4gICAgICAgIC8vJ3Bvc2l0aW9uJzonYWJzb2x1dGUnLCAvL3NldCB3aXRoIGNzcyBjbGFzc1xuICAgICAgICAndG9wJzogdG9QaXgodGhpc1RvcClcbiAgICAgICAgfVxuICAgICk7XG59XG4iLCIndXNlIHN0cmljdCc7XG4vKmpzaGludCAtVzExNyAqL1xuLypcbmZ1bmN0aW9uIGFkZEV2ZW50KHRoaXNUYXJnZXQsIGV2ZW50VHlwZSwgZnVjbnRpb24pe1xuICAgIGdldCh0aGlzVGFyZ2V0KTtcbiAgICBpZihkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKXtcbiAgICAgICAgdGhpc1RhcmdldC5hZGRFdmVudExpc3RlbmVyKGV2ZW50VHlwZSwgZnVjbnRpb24sIGZhbHNlKTtcbiAgICB9IGVsc2UgaWYoZG9jdW1lbnQuYXR0YWNoRXZlbnQpe1xuICAgICAgICB0aGlzVGFyZ2V0LmF0dGFjaEV2ZW50KCdvbicrZXZlbnRUeXBlLCBmdWNudGlvbik7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGhpc1RhcmdldFsnb24nK2V2ZW50VHlwZV0gPSBmdWNudGlvbjtcbiAgICB9XG59XG5cbiovXG4vKlxuXG4vL1NhbXBsZSBVc2FnZVxuXG5hZGRFdmVudCh3aW5kb3csICdsb2FkJywgZnVuY3Rpb24oKXtcbiAgICAvL2FsbCBvdXIgY29kZSB0aGF0IHJ1bnMgYWZ0ZXIgdGhlIHBhZ2UgaXMgcmVhZHkgZ29lcyBoZXJlXG59KTtcblxuYWRkRXZlbnQob3VyRm9ybSwgJ3N1Ym1pdCcsIGNoZWNrRm9ybSk7XG5cbi8vICovXG4iLCJmdW5jdGlvbiBnZXREb2NIZWlnaHQoKXtcbiAgICAvL1N0YW5kYXJkaXplIGhlaWdodCB0byBoZWlnaGVzdCB2YWx1ZVxuICAgIHZhciBkb2NIZWlnaHQgPSBNYXRoLm1heCggYm9keS5zY3JvbGxIZWlnaHQsIGJvZHkub2Zmc2V0SGVpZ2h0LCBodG1sLmNsaWVudEhlaWdodCwgaHRtbC5zY3JvbGxIZWlnaHQsIGh0bWwub2Zmc2V0SGVpZ2h0ICk7XG4gICAgcmV0dXJuIGRvY0hlaWdodDtcbn1cblxuLy8gZ2V0IGVsZW1lbnQgYnkgSWQgPiBjbGFzcyA+IHNlbGVjdG9yXG5mdW5jdGlvbiBnZXQoc2VsZWN0b3IsIGZhbWlseSl7XG4gICAgdmFyIHRoaXNUYXJnZXQ7IC8vY29udGFpbnMgcmVzdWx0aW5nIGVsZW1lbnQocykgZnJvbSBnZXQoKVxuXG4gICAgaWYgKGZhbWlseSl7XG4gICAgICAgIHRoaXNUYXJnZXQgPSBnZXRGYW1pbHkoc2VsZWN0b3IsIGZhbWlseSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBpZiggZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoc2VsZWN0b3IpICl7XG4gICAgICAgICAgICB0aGlzVGFyZ2V0ID0gIGdldEJ5SWQoc2VsZWN0b3IpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKCBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKHNlbGVjdG9yKSApe1xuICAgICAgICAgICAgdGhpc1RhcmdldCA9ICBnZXRCeUNsYXNzKHNlbGVjdG9yKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgdGhpc1RhcmdldCA9IGdldEJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vY29uc29sZS5sb2coXCJnZXQoKSBjYWxsZWQgb246IFwiICsgc2VsZWN0b3IgKyBcIiByZXR1cm5lZDogXCIgKyB0aGlzVGFyZ2V0KTtcbiAgICByZXR1cm4gdGhpc1RhcmdldDtcbn1cblxuICAgIGZ1bmN0aW9uIGdldEJ5SWQoaWQpe1xuICAgICAgICB2YXIgdGhpc1RhcmdldCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcbiAgICAgICAgcmV0dXJuIHRoaXNUYXJnZXQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0QnlDbGFzcyhjbGFzc05hbWUpe1xuICAgICAgICB2YXIgdGhpc1RhcmdldCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoY2xhc3NOYW1lKTtcbiAgICAgICAgcmV0dXJuIHRoaXNUYXJnZXQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0QnlTZWxlY3RvcihzZWxlY3Rvcil7XG4gICAgICAgIHZhciB0aGlzVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCh0aGlzU2VsZWN0b3IpO1xuICAgICAgICByZXR1cm4gdGhpc1RhcmdldDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRGYW1pbHkoZWxlbWVudCwgZmFtaWx5KXtcbiAgICAgICAgdmFyIHRoaXNGYW1pbHk7XG4gICAgICAgIHN3aXRjaCAoZmFtaWx5KXtcbiAgICAgICAgICAgIGNhc2UgXCJwcmV2XCI6XG4gICAgICAgICAgICAgICAgdGhpc0ZhbWlseSA9IGdldFByZXYoZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwibmV4dFwiOlxuICAgICAgICAgICAgICAgIHRoaXNGYW1pbHkgPSBnZXROZXh0KGVsZW1lbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcInBhcmVudFwiOlxuICAgICAgICAgICAgICAgIHRoaXNGYW1pbHkgPSBnZXRQYXJlbnQoZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAvKiBGSVg6IEFkZCBjaGlsZCBhbmQgY2hpbGRyZW5cbiAgICAgICAgICAgIGNhc2UgXCJjaGlsZFwiOlxuICAgICAgICAgICAgICAgIHZhciB0aGlzVGFyZ2V0ID0gZ2V0TmV4dChlbGVtZW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJjaGlsZHJlblwiOlxuICAgICAgICAgICAgICAgIHZhciB0aGlzVGFyZ2V0ID0gZ2V0TmV4dChlbGVtZW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICovXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXNGYW1pbHk7XG4gICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGdldFByZXYoZWxlbWVudCl7XG4gICAgICAgICAgICB2YXIgdGhpc1NpYmxpbmcgPSBlbGVtZW50LnByZXZpb3VzRWxlbWVudFNpYmxpbmc7XG4gICAgICAgICAgICByZXR1cm4gdGhpc1NpYmxpbmc7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBnZXROZXh0KGVsZW1lbnQpe1xuICAgICAgICAgICAgdmFyIHRoaXNTaWJsaW5nID0gZWxlbWVudC5uZXh0RWxlbWVudFNpYmxpbmc7XG4gICAgICAgICAgICByZXR1cm4gdGhpc1NpYmxpbmc7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBnZXRQYXJlbnQoZWxlbWVudCl7XG4gICAgICAgICAgICB2YXIgdGhpc1BhcmVudCA9IGVsZW1lbnQucGFyZW50RWxlbWVudDtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJnZXRQYXJlbnQgLSBcIiArIGVsZW1lbnQuaWQgKyBcIiAtIFwiICsgdGhpc1BhcmVudCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpc1BhcmVudDtcbiAgICAgICAgfVxuXG5mdW5jdGlvbiBnZXRTdHlsZShlbGVtZW50LCBwcm9wZXJ0eSl7XG4gICAgdmFyIHRoaXNTdHlsZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpLmdldFByb3BlcnR5VmFsdWUocHJvcGVydHkpO1xuICAgIHJldHVybiB0aGlzU3R5bGU7XG59XG5cbmZ1bmN0aW9uIHNldFN0eWxlKGVsZW1lbnQsIHN0eWxlcyl7XG4gICAgdmFyIHByb3BlcnR5LCB2YWx1ZTtcbiAgICBmb3IgKCBwcm9wZXJ0eSBpbiBzdHlsZXMgKSB7XG4gICAgICAgIHZhbHVlID0gc3R5bGVzW3Byb3BlcnR5XTtcbiAgICAgICAgZWxlbWVudC5zdHlsZVtwcm9wZXJ0eV0gPSB2YWx1ZTtcbiAgICB9XG59XG5cbi8vRklYOiBjaGVjayBmb3Igb3RoZXIgc3RyaW5nIHZhbHVlc1xuZnVuY3Rpb24gdG9QaXgodGhpc1ZhbHVlKXtcbiAgICBpZih0aGlzVmFsdWUpe1xuICAgICAgICBpZiAoIHR5cGVvZih0aGlzVmFsdWUpID09PSBcInN0cmluZ1wiICl7XG4gICAgICAgICAgICAvL3BhcnNlIHRvIGJhc2UgMTAgKyBhbHNvIHJlbW92aW5nIHRyYWlsaW5nIFwicHhcIlxuICAgICAgICAgICAgdGhpc1ZhbHVlID0gcGFyc2VJbnQodGhpc1ZhbHVlLCAxMCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy90aGlzIGlzIHVuZGVmaW5lZCwgbnVsbCwgJycgKGVtcHR5IHN0cmluZyksIDAgb3IgTmFOXG4gICAgZWxzZXtcbiAgICAgICAgdGhpc1ZhbHVlID0gMDtcbiAgICB9XG5cbiAgICB0aGlzVmFsdWUgPSB0aGlzVmFsdWUgKz0gXCJweFwiO1xuICAgIHJldHVybiB0aGlzVmFsdWU7XG59XG5cbmZ1bmN0aW9uIHRvSW50KHRoaXNWYWx1ZSl7IC8vY2hlY2sgZm9yICdub25lJywgJ2luaGVyaXQnIGV0Yy5cbiAgICAvL2NoZWNrIGZvciB2YWxpZCB2YWx1ZVxuICAgIGlmKHRoaXNWYWx1ZSl7XG4gICAgICAgIGlmICggdHlwZW9mKHRoaXNWYWx1ZSkgPT09IFwic3RyaW5nXCIgKXtcbiAgICAgICAgICAgIC8vcGFyc2UgdG8gYmFzZSAxMCArIGFsc28gcmVtb3ZpbmcgdHJhaWxpbmcgXCJweFwiXG4gICAgICAgICAgICB0aGlzVmFsdWUgPSBwYXJzZUludCh0aGlzVmFsdWUsIDEwKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvL3RoaXMgaXMgdW5kZWZpbmVkLCBudWxsLCAnJyAoZW1wdHkgc3RyaW5nKSwgMCBvciBOYU5cbiAgICBlbHNle1xuICAgICAgICB0aGlzVmFsdWUgPSAwO1xuICAgIH1cbiAgICByZXR1cm4gdGhpc1ZhbHVlO1xufVxuXG5mdW5jdGlvbiBhZGRDbGFzcyhlbGVtZW50LCB0aGlzQ2xhc3Mpe1xuICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCh0aGlzQ2xhc3MpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVDbGFzcyhlbGVtZW50LCB0aGlzQ2xhc3Mpe1xuICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSh0aGlzQ2xhc3MpO1xufVxuXG5mdW5jdGlvbiB0b2dnbGVDbGFzcyhlbGVtZW50LCB0aGlzQ2xhc3Mpe1xuICAgIGVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZSh0aGlzQ2xhc3MpO1xufVxuXG5mdW5jdGlvbiBoYXNDbGFzcyhlbGVtZW50LCB0aGlzQ2xhc3Mpe1xuICAgIHZhciBoYXNDbGFzcyA9IGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKHRoaXNDbGFzcyk7XG4gICAgcmV0dXJuIGhhc0NsYXNzO1xufVxuXG5mdW5jdGlvbiBnZXRTY3JvbGxWYWx1ZShlbGVtZW50KXtcbiAgICBpZiAoZWxlbWVudCl7XG4gICAgICAgIHZhciB0aGlzRWxlbWVudCA9IGdldChlbGVtZW50KTtcbiAgICAgICAgdmFyIHRoaXNTY3JvbGxUb3AgPSB0aGlzRWxlbWVudC5zY3JvbGxZO1xuICAgICAgICAvL2NvbnNvbGUubG9nKHRoaXNTY3JvbGxUb3ApO1xuICAgICAgICByZXR1cm4gdGhpc1Njcm9sbFRvcDtcbiAgICB9XG4gICAgZWxzZXtcbiAgICAgICAgdmFyIHdpbmRvd1Njcm9sbFRvcCA9IHdpbmRvdy5zY3JvbGxZO1xuICAgICAgICByZXR1cm4gd2luZG93U2Nyb2xsVG9wO1xuICAgIH1cbn1cblxuLy9nZXQgYXR0cmlidXRlIC0gaWUuIGhyZWYsIGNsYXNzLCBjaGFyc2V0IGV0Yy5cbmZ1bmN0aW9uIGdldEF0dHJpYnV0ZSh0aGlzVGFyZ2V0LCB0aGlzQXR0cmlidXRlKXtcbiAgICB0aGlzVGFyZ2V0ID0gZ2V0KHRoaXNUYXJnZXQpO1xuICAgIHZhciB0aGlzVmFsdWUgPSB0aGlzVGFyZ2V0LmdldEF0dHJpYnV0ZSh0aGlzQXR0cmlidXRlKTtcbiAgICByZXR1cm4gdGhpc1ZhbHVlO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuLypqc2hpbnQgLVcxMTcgKi9cblxuZnVuY3Rpb24ganNvblRvSnModGhpc0pzb24pe1xuICAgIHJldHVybiBKU09OLnBhcnNlKHRoaXNKc29uKTtcbn1cblxuZnVuY3Rpb24ganNUb0pzb24odGhpc0pzT2JqZWN0KXtcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodGhpc0pzT2JqZWN0KTtcbn1cbiIsIi8vU3RyaW5nIE1hbmlwdWxhdGlvblxuZnVuY3Rpb24gZ2V0Q2hhckF0KHRoaXNUYXJnZXQsIHRoaXNQb3NpdGlvbil7XG4gICAgcmV0dXJuIHRoaXNUYXJnZXQuY2hhckF0KHRoaXNQb3NpdGlvbik7XG59XG5cbmZ1bmN0aW9uIGdldENoYXJJbmRleCh0aGlzVGFyZ2V0LCB0aGlzQ2hhcmFjdGVyKXtcbiAgICByZXR1cm4gdGhpc1RhcmdldC5pbmRleE9mKHRoaXNDaGFyYWN0ZXIpO1xufVxuXG5mdW5jdGlvbiB0cmltVGhpcyh0aGlzVGFyZ2V0KXtcbiAgICByZXR1cm4gdGhpc1RhcmdldC50cmltKCk7XG59IiwiZnVuY3Rpb24gc3R5bGVzKCBlbGVtZW50LCBzdHlsZXMgKSB7XG4gICAgaWYoc3R5bGVzKXtcbiAgICAgICAgc2V0U3R5bGUoZWxlbWVudCwgc3R5bGVzKTtcbiAgICB9XG4gICAgZWxzZXtcbiAgICAgICAgZ2V0U3R5bGUoZWxlbWVudCk7XG4gICAgfX1cblxuICAgIGZ1bmN0aW9uIGdldFN0eWxlKGVsZW1lbnQsIHByb3BlcnR5KXtcbiAgICAgICAgdmFyIHRoaXNTdHlsZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpLmdldFByb3BlcnR5VmFsdWUocHJvcGVydHkpO1xuICAgICAgICAvL2NvbnNvbGUubG9nKFwiZ2V0U3R5bGVzKCkgLSBcIiArIHByb3BlcnkgKyBcIiBmb3I6IFwiICsgZWxlbWVudC5pZCArIFwiIHJldHVybmVkOiBcIiArIHRoaXNTdHlsZSk7XG4gICAgICAgIHJldHVybiB0aGlzU3R5bGU7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2V0U3R5bGUoZWxlbWVudCwgc3R5bGVzKXtcbiAgICAgICAgdmFyIHByb3BlcnR5LCB2YWx1ZTtcbiAgICAgICAgZm9yICggcHJvcGVydHkgaW4gc3R5bGVzICkge1xuICAgICAgICAgICAgdmFsdWUgPSBzdHlsZXNbcHJvcGVydHldO1xuICAgICAgICAgICAgZWxlbWVudC5zdHlsZVtwcm9wZXJ0eV0gPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZWxlbWVudDtcbiAgICB9IiwialF1ZXJ5KCcjd2luZG93U2l6ZScpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgIGpRdWVyeSgnI3dpbmRvd1NpemUnKS5mYWRlT3V0KCdtZWRpdW0nKTtcbn0pO1xuXG5mdW5jdGlvbiB0ZXN0UGFuZWwoKSB7XG4gICAgalF1ZXJ5KCcjd2luZG93U2l6ZScpLmNzcygnZGlzcGxheScsJ2Jsb2NrJyk7XG4gICAgalF1ZXJ5KCcjd2luZG93U2l6ZScpLmVtcHR5KCk7XG5cbiAgICBqUXVlcnkoJyN3aW5kb3dTaXplJykuYXBwZW5kKFwiPGRpdj5XOiBcIiAgICAgKyB2aWV3V2lkdGggICAgICsgXCJweCA8L2Rpdj5cIik7XG4gICAgalF1ZXJ5KCcjd2luZG93U2l6ZScpLmFwcGVuZChcIjxkaXY+SDogXCIgICAgICsgdmlld0hlaWdodCAgICArIFwicHggPC9kaXY+XCIpO1xuICAgIGpRdWVyeSgnI3dpbmRvd1NpemUnKS5hcHBlbmQoXCI8ZGl2PlwiICAgICAgICArIGFzcFRleHQgICAgICAgKyBcIjwvZGl2PlwiKTtcbiAgICBqUXVlcnkoJyN3aW5kb3dTaXplJykuYXBwZW5kKFwiPGRpdj5CcDogXCIgICAgKyBicmVha1BvaW50ICAgICsgXCI8L2Rpdj5cIik7XG4gICAgalF1ZXJ5KCcjd2luZG93U2l6ZScpLmFwcGVuZChcIjxkaXY+RGV2aWNlOlwiICsgZGV2aWNlVHlwZSAgICArIFwiPC9kaXY+XCIpO1xuXG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICBqUXVlcnkoXCIjd2luZG93U2l6ZVwiKS5mYWRlT3V0KDQwMCk7XG4gICAgfSwgMzUwMCk7XG59XG4iLCJmdW5jdGlvbiBuZXdTd2lwZVRodW1icyh0YXJnZXQsIHNsaWRlU3BlZWQpe1xuICAgIHdpbmRvdy5teVN3aXBlID0gbmV3IFN3aXBlKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRhcmdldCksIHtcbiAgICAgICAgc3RhcnRTbGlkZTogMCxcbiAgICAgICAgc3BlZWQ6IDMwMCxcbiAgICAgICAgYXV0bzogc2xpZGVTcGVlZCxcbiAgICAgICAgY29udGludW91czogdHJ1ZVxuICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gdGh1bWJDbGljaygpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ3RodW1iQ2xpY2tlZCcpO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIHRodW1iSW5kZXggPSBqUXVlcnkoJy5zd2lwZS10aHVtYicpLmluZGV4KCB0aGlzICk7XG4gICAgICAgIC8vY29uc29sZS5sb2coJ3RodW1iQ2xpY2tlZCAtIHRoaXM6ICcgKyB0aHVtYkluZGV4KTtcblxuICAgICAgICB3aW5kb3cubXlTd2lwZS5zbGlkZSh0aHVtYkluZGV4KTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHZhciB0aHVtYnNDb250YWluZXIgPSBqUXVlcnkoJy5zd2lwZS10aHVtYnMtd3JhcCcpO1xuXG4gICAgLy9HZXQgdGhlIHRodW1ibmFpbHNcbiAgICB2YXIgdGh1bWJzID0gdGh1bWJzQ29udGFpbmVyLmZpbmQoJy5zd2lwZS10aHVtYicpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGh1bWJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRodW1ic1tpXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRodW1iQ2xpY2spO1xuICAgIH1cblxuICAgIC8vYWZ0ZXIgdGhlIGdhbGxlcnkgaXMgcmVhZHksIHNldCB0aGUgZGltZW5zaW9uc1xuICAgIHNldERpbWVuc2lvbnMoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGFyZ2V0KSk7XG59XG5cbmZ1bmN0aW9uIG5ld1N3aXBlQmFzaWModGFyZ2V0LCBzbGlkZVNwZWVkKXtcbiAgICB3aW5kb3dbdGFyZ2V0XSA9IG5ldyBTd2lwZShkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0YXJnZXQpLCB7XG4gICAgICAgIHN0YXJ0U2xpZGU6IDAsXG4gICAgICAgIGF1dG86IHNsaWRlU3BlZWQsXG4gICAgICAgIGNvbnRpbnVvdXM6IHRydWVcbiAgICB9KTtcbiAgICBzZXREaW1lbnNpb25zKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRhcmdldCkpO1xuICAgIGNvbnNvbGUubG9nKFwibmV3U3dpcGVCYXNpYzogXCIgKyB3aW5kb3dbdGFyZ2V0XSk7XG5cbn1cbiIsIi8qKlxuICogT3BlbiAmJiBDbG9zZSBTbGlkZSBQYW5lbHNcbiAqXG4gKiBGSVg6IEFkZCBjb21tZW50c1xuICovXG5cbmZ1bmN0aW9uIG9wZW5TbGlkZXIoc2xpZGVQYW5lbCwgc2xpZGVEaXJlY3Rpb24pe1xuICAgIHNsaWRlRGlyZWN0aW9uID0gc2xpZGVEaXJlY3Rpb24gPyBzbGlkZURpcmVjdGlvbiA6IFwibGVmdFwiO1xuXG4gICAgdmFyIHNsaWRlRGlzdGFuY2UgPSBzbGlkZVBhbmVsLndpZHRoKCk7XG4gICAgaWYoc2xpZGVEaXJlY3Rpb24gPT09IFwicmlnaHRcIil7XG4gICAgICAgIHNsaWRlRGlzdGFuY2UgPSBzbGlkZURpc3RhbmNlICogKC0xKTtcbiAgICB9XG5cbiAgICB2YXIgZnJpZW5kcyA9IHNsaWRlUGFuZWwuZGF0YSgnYWxzby1zbGlkZScpLnNwbGl0KFwiIFwiKTtcbiAgICBqUXVlcnkuZWFjaCggZnJpZW5kcywgZnVuY3Rpb24oIGluZGV4LCBmcmllbmQgKSB7XG4gICAgICAgIGpRdWVyeShmcmllbmQpLmFuaW1hdGUoe1wibGVmdFwiIDogc2xpZGVEaXN0YW5jZX0sIDM1MCk7XG4gICAgfSk7XG5cbiAgICB2YXIgc2xpZGVyQW5pbWF0aW9uID0ge307XG4gICAgc2xpZGVyQW5pbWF0aW9uW3NsaWRlRGlyZWN0aW9uXSA9IDA7XG4gICAgc2xpZGVQYW5lbC5hbmltYXRlKHNsaWRlckFuaW1hdGlvbiwgMzUwKTtcbn1cblxuZnVuY3Rpb24gY2xvc2VTbGlkZXIoc2xpZGVQYW5lbCwgc2xpZGVEaXJlY3Rpb24pe1xuICAgIHNsaWRlRGlyZWN0aW9uID0gc2xpZGVEaXJlY3Rpb24gPyBzbGlkZURpcmVjdGlvbiA6IFwibGVmdFwiO1xuXG4gICAgdmFyIHNsaWRlRGlzdGFuY2UgPSBzbGlkZVBhbmVsLndpZHRoKCk7XG4gICAgaWYoc2xpZGVEaXJlY3Rpb24gPT09IFwicmlnaHRcIil7XG4gICAgICAgIHNsaWRlRGlzdGFuY2UgPSBzbGlkZURpc3RhbmNlICogKC0xKTtcbiAgICB9XG5cbiAgICB2YXIgZnJpZW5kcyA9IHNsaWRlUGFuZWwuZGF0YSgnYWxzby1zbGlkZScpLnNwbGl0KFwiIFwiKTtcbiAgICBqUXVlcnkuZWFjaCggZnJpZW5kcywgZnVuY3Rpb24oIGluZGV4LCBmcmllbmQgKSB7XG4gICAgICAgIGpRdWVyeShmcmllbmQpLmFuaW1hdGUoe1wibGVmdFwiIDogMCB9LCAzNTApO1xuICAgIH0pO1xuXG4gICAgaWYoc2xpZGVEaXJlY3Rpb24gPT09IFwicmlnaHRcIil7XG4gICAgICAgIHNsaWRlUGFuZWwuYW5pbWF0ZSh7XCJyaWdodFwiIDogc2xpZGVEaXN0YW5jZX0sIDM1MCk7XG4gICAgfWVsc2V7XG4gICAgICAgIHNsaWRlRGlzdGFuY2UgPSBzbGlkZURpc3RhbmNlICogKC0xKTtcbiAgICAgICAgc2xpZGVQYW5lbC5hbmltYXRlKHtcImxlZnRcIiA6IHNsaWRlRGlzdGFuY2V9LCAzNTApO1xuICAgIH1cbn1cbiIsImZ1bmN0aW9uIG1vdmVUaHVtYnNDb250YWluZXIoKXtcbiAgICAvL3Jlc2V0IGZ1bmN0aW9uIHNwZWNpZmljIHN0eWxlc1xuICAgIGpRdWVyeSgnLnN3aXBlLXRodW1iJykuY3NzKCdtYXgtd2lkdGgnLCBcIlwiKTtcbiAgICBqUXVlcnkoJy5zd2lwZS10aHVtYicpLmNzcygnbWF4LWhlaWdodCcsIFwiXCIpO1xuICAgIGpRdWVyeSgnLmhvclNjcm9sbENvbnRlbnQnKS5yZW1vdmVBdHRyKCdzdHlsZScpO1xuICAgIGpRdWVyeSgnLnN3aXBlLXRodW1icy13cmFwJykucmVtb3ZlQXR0cignc3R5bGUnKTtcblxuICAgIGdhbGxlcnlIZWlnaHQgPSBqUXVlcnkoJy5pbWFnZS1nYWxsZXJ5JykuaGVpZ2h0KCk7XG4gICAgZ2FsbGVyeVdpZHRoID0galF1ZXJ5KCcuaW1hZ2UtZ2FsbGVyeScpLndpZHRoKCk7XG5cbiAgICB0aHVtYnNDb3VudCA9ICBqUXVlcnkoJy5zd2lwZS10aHVtYicpLmxlbmd0aDtcbiAgICBjb25zb2xlLmxvZyhcInRodW1ic0NvdW50OiBcIiArIHRodW1ic0NvdW50KTtcblxuICAgIHRodW1iV2lkdGggPSBqUXVlcnkoJy5zd2lwZS10aHVtYicpLndpZHRoKCk7XG4gICAgY29uc29sZS5sb2coXCJlYWNoVGh1bWJXaWR0aDogXCIgKyB0aHVtYldpZHRoKTtcblxuICAgIHRodW1ic1dyYXBXaWR0aCA9IHRodW1ic0NvdW50ICogdGh1bWJXaWR0aDtcblxuICAgIC8vQVBQRU5EIFRIVU1CUyBPTiBMQU5EU0NBUEVcbiAgICBpZiggZ2FsbGVyeUhlaWdodCA+PSB2aWV3SGVpZ2h0IC0gdGh1bWJXaWR0aCApe1xuICAgICAgICAvL2lmIChqUXVlcnkod2luZG93KS53aWR0aCgpID4gdGFibGV0TGFuZHNjYXBlKXtcbiAgICAgICAgICAgIGlmKCBqUXVlcnkoaHRtbCkuaGFzQ2xhc3MoJ2xhbmRzY2FwZScpICl7XG4gICAgICAgICAgICAgICAgalF1ZXJ5KCcuc3dpcGUtdGh1bWJzLXdyYXAnKS5hcHBlbmRUbygnLnN3aXBlJyk7XG4gICAgICAgICAgICAgICAgalF1ZXJ5KCcuc3dpcGUtdGh1bWJzLXdyYXAnKS5jc3MoJ3Bvc2l0aW9uJywgJ2Fic29sdXRlJyk7XG4gICAgICAgICAgICAgICAgalF1ZXJ5KCcuc3dpcGUtdGh1bWJzLXdyYXAnKS5jc3MoJ2JvdHRvbScsIDApO1xuICAgICAgICAgICAgfVxuICAgICAgICAvL31cbiAgICB9XG4gICAgZWxzZXtcbiAgICAgICAgalF1ZXJ5KCcuc3dpcGUtdGh1bWJzLXdyYXAnKS5pbnNlcnRBZnRlcignLnN3aXBlJyk7XG4gICAgICAgIGpRdWVyeSgnLnN3aXBlLXRodW1icy13cmFwJykuY3NzKCdwb3NpdGlvbicsICdzdGF0aWMnKTtcbiAgICAgICAgalF1ZXJ5KCcuc3dpcGUtdGh1bWJzLXdyYXAnKS5jc3MoJ2JvdHRvbScsIFwiYXV0b1wiKTtcbiAgICB9XG5cbiAgICAvL0NFTlRFUiBUSFVNQlMgQ09OVEFJTkVSXG4gICAgY29uc29sZS5sb2coXCJ0aHVtYnNXcmFwV2lkdGg6IFwiICsgdGh1bWJzV3JhcFdpZHRoKTtcbiAgICBjb25zb2xlLmxvZyhcImdhbGxlcldpZHRoOiBcIiArIGdhbGxlcnlXaWR0aCk7XG5cbiAgICBpZiAodGh1bWJzV3JhcFdpZHRoIDwgZ2FsbGVyeVdpZHRoKXtcbiAgICAgICAgdGh1bWJzV3JhcE1hcmdpbiA9IChnYWxsZXJ5V2lkdGggLSB0aHVtYnNXcmFwV2lkdGgpIC8gMjtcbiAgICAgICAgalF1ZXJ5KCcuc3dpcGUtdGh1bWJzLXdyYXAnKS5jc3MoJ21hcmdpbi1sZWZ0JywgdGh1bWJzV3JhcE1hcmdpbik7XG4gICAgfVxuXG4gICAgaWYgKHRodW1ic1dyYXBXaWR0aCA+IGdhbGxlcnlXaWR0aCl7XG4gICAgICAgIGpRdWVyeSgnLnN3aXBlLXRodW1icy13cmFwJykuYWRkQ2xhc3MoJ2hvclNjcm9sbFdyYXAnKTtcbiAgICAgICAgalF1ZXJ5KCcuaG9yU2Nyb2xsQ29udGVudCcpLndpZHRoKHRodW1ic1dyYXBXaWR0aCk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwidGh1bWJzIGJpZ2dlclwiKTtcbiAgICAgICAgLy90aHVtYk1heFdpZHRoID0gZ2FsbGVyeVdpZHRoIC8gdGh1bWJzQ291bnQ7XG4gICAgICAgIC8valF1ZXJ5KCcuc3dpcGUtdGh1bWInKS5jc3MoJ21heC13aWR0aCcsIHRodW1iTWF4V2lkdGgpO1xuICAgICAgICAvL2pRdWVyeSgnLnN3aXBlLXRodW1iJykuY3NzKCdtYXgtaGVpZ2h0JywgdGh1bWJNYXhXaWR0aCk7XG4gICAgICAgIC8valF1ZXJ5KCcuc3dpcGUtdGh1bWJzLWNvbnRhaW5lcicpLmNzcygnbWF4LWhlaWdodCcsIHRodW1iTWF4V2lkdGgpO1xuICAgIH1cbn1cbiIsIi8vcmV0dXJucyB0aGUgY2FsbGVyIGZ1bmN0aW9uIG5hbWVcbi8qXG4gICAgdmFyIGNhbGxlck5hbWU7XG4gICAgdHJ5IHsgdGhyb3cgbmV3IEVycm9yKCk7IH1cbiAgICBjYXRjaCAoZSkge1xuICAgICAgICB2YXIgcmUgPSAvKFxcdyspQHxhdCAoXFx3KykgXFwoL2csIHN0ID0gZS5zdGFjaywgbTtcbiAgICAgICAgcmUuZXhlYyhzdCksIG0gPSByZS5leGVjKHN0KTtcbiAgICAgICAgY2FsbGVyTmFtZSA9IG1bMV0gfHwgbVsyXTtcbiAgICB9XG4gICAgY29uc29sZS5sb2coXCJmdW5jdGlvbigpIGNhbGxlZCBieTogXCIgKyBjYWxsZXJOYW1lKTtcbiovXG5cbi8vIEpTT04uc3RyaW5naWZ5KCkgdHVybnMgYSBKYXZhc2NyaXB0IG9iamVjdCBpbnRvIEpTT04gdGV4dCBhbmQgc3RvcmVzIHRoYXQgSlNPTiB0ZXh0IGluIGEgc3RyaW5nLlxuLy8gSlNPTi5wYXJzZSgpIHR1cm5zIGEgc3RyaW5nIG9mIEpTT04gdGV4dCBpbnRvIGEgSmF2YXNjcmlwdCBvYmplY3QuXG5cblxuZnVuY3Rpb24gZHVtcENvbXB1dGVkU3R5bGVzKGVsZW0scHJvcCkge1xuXG4gIHZhciBjcyA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsZW0sbnVsbCk7XG4gIGlmIChwcm9wKSB7XG4gICAgY29uc29sZS5sb2cocHJvcCtcIiA6IFwiK2NzLmdldFByb3BlcnR5VmFsdWUocHJvcCkpO1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgbGVuID0gY3MubGVuZ3RoO1xuICBmb3IgKHZhciBpPTA7aTxsZW47aSsrKSB7XG5cbiAgICB2YXIgc3R5bGUgPSBjc1tpXTtcbiAgICBjb25zb2xlLmxvZyhzdHlsZStcIiA6IFwiK2NzLmdldFByb3BlcnR5VmFsdWUoc3R5bGUpKTtcbiAgfVxuXG59XG4iLCJmdW5jdGlvbiBhcHBseUlzbygpe1xuICAgIHZhciBwcm9qZWN0c0lzbyA9IGpRdWVyeSgnLmlzby1ncmlkJykuaXNvdG9wZSh7XG4gICAgICAgIGl0ZW1TZWxlY3RvcjogJy5pc28tZ3JpZC1pdGVtJyxcbiAgICAgICAgcmVzaXphYmxlOiBmYWxzZSwgLy8gZGlzYWJsZSBub3JtYWwgcmVzaXppbmdcbiAgICAgICAgcGVyY2VudFBvc2l0aW9uOiB0cnVlLFxuICAgICAgICBhbmltYXRpb25FbmdpbmU6ICdiZXN0LWF2YWlsYWJsZScsXG4gICAgICAgIGFuaW1hdGlvbk9wdGlvbnM6IHtcbiAgICAgICAgICAgIGR1cmF0aW9uOiAzMDAwLFxuICAgICAgICAgICAgZWFzaW5nOiAnbGluZWFyJyxcbiAgICAgICAgICAgIHF1ZXVlOiBmYWxzZVxuICAgICAgICB9LFxuICAgICAgICBsYXlvdXRNb2RlOiAnZml0Um93cycsXG4gICAgICAgIG1hc29ucnk6e1xuICAgICAgICAgICAgY29sdW1uV2lkdGg6ICAgICdpc28tZ3JpZC1pdGVtJyxcbiAgICAgICAgICAgIGlzQW5pbWF0ZWQ6ICAgICB0cnVlXG4gICAgICAgICAgICAvL2lzRml0V2lkdGg6ICAgdHJ1ZVxuICAgICAgICB9XG4gICAgfSk7XG59XG4iLCIvKipcbiAqIGdldEJyZWFrcG9pbnQoKVxuICpcbiAqIERldGVybWluZXMgc3RyaW5nIHZhbHVlIG9mIGJyZWFrcG9pbnQgYmFzZWQgb24gdGhlIGN1cnJlbnQgdmlld3BvcnQgc2l6ZS5cbiAqXG4gKiBAZ2xvYmFsIHZpZXdXaWR0aCAoaW50KSBpcyBjYWxjdWxhdGVkIG9uIGRvYy5yZWFkeSBhbmQgZWFjaCBkb2MucmVzaXplXG4gKlxuICogQGdsb2JhbCBtb2JpbGVQb3J0cmFpdCAoaW50KSxcbiAqIEBnbG9iYWwgbW9iaWxlTGFuZHNjYXBlIChpbnQpLFxuICogQGdsb2JhbCB0YWJsZXRMYW5kc2NhcGUgKGludCkgc2V0dGluZ3MgYXJlIGRlZmluZWQgaW4gdmVsY3JvL2NvcmVGcmFtZXdvcmsuanNcbiAqXG4gKiBAcmV0dXJuIHRoaXNCcmVha3BvaW50IChzdHJpbmcpXG4gKi9cblxuZnVuY3Rpb24gZ2V0QnJlYWtwb2ludChzbWFsbEJwLCBsYXJnZUJwKXtcbiAgICB2YXIgdGhpc0JwTGFiZWw7XG4gICAgaWYoIHZpZXdXaWR0aCA8PSBzbWFsbEJwICl7XG4gICAgICAgIHRoaXNCcExhYmVsID0gXCJzbWFsbFwiO1xuICAgIH1cbiAgICBlbHNlIGlmICggdmlld1dpZHRoID4gc21hbGxCcCAmJiB2aWV3V2lkdGggPCBsYXJnZUJwICl7XG4gICAgICAgIHRoaXNCcExhYmVsID0gXCJtZWRpdW1cIjtcbiAgICB9XG4gICAgZWxzZXtcbiAgICAgICAgdGhpc0JwTGFiZWwgPSBcImxhcmdlXCI7XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKFwiQnJlYWtwb2ludDogXCIgKyB0aGlzQnBMYWJlbCk7XG4gICAgcmV0dXJuIHRoaXNCcExhYmVsO1xufVxuIiwiLyoqXG4gKiBmaWx0ZXJCeVZpZXdwb3J0KGFsbFZpZXdwb3J0c0NvbnRlbnQsIGZpcnN0QnJlYWssIHNlY29uZEJyZWFrKTtcbiAqXG4gKiBGaWx0ZXJzIGFsbCBhdmFpbGFibGUgY29udGVudCBieSBjdXJyZW50IHZpZXdwb3J0IHNpemUuICBSZXR1cm5zIG1lZGl1bSwgbGFyZ2Ugb3IgeGxhcmdlIGFycmF5LlxuICpcbiAqIEBhbGxWaWV3cG9ydHNDb250ZW50IChhcnJheSkgc3RydWN0dXJlZCBieSBzaXplOlxuICAgICogIGFsbFZpZXdwb3J0c0NvbnRlbnRbMF06IHNtYWxsIG9yIHRodW1ibmFpbCBzcGVjaWZpYyBjb250ZW50XG4gICAgKiAgYWxsVmlld3BvcnRzQ29udGVudFsxXTogbWVkaXVtIHNwZWNpZmljIGNvbnRlbnRcbiAgICAqICBhbGxWaWV3cG9ydHNDb250ZW50WzJdOiBsYXJnZSBzcGVjaWZpYyBjb250ZW50XG4gICAgKiAgYWxsVmlld3BvcnRzQ29udGVudFszXTogeGxhcmdlIHNwZWNpZmljIGNvbnRlbnRcbiAgICAqXG4qIEBmaXJzdEJyZWFrIChpbnQpLFxuKiBAc2Vjb25kQnJlYWsgKGludCkgc2V0IGluIC92ZWxjcm8vY29yZUZyYW1ld29yay5qc1xuKlxuKiBAdGhpc1ZpZXdwb3J0U2l6ZSBjb25zaWRlcmVkIHRoZSBsYXJnZXIgb2Ygdmlld0hlaWdodCBvciB2aWV3V2lkdGgsIGFzIHRoZSB1c2VyIG1heSB0dXJuIHRoZSBkZXZpY2UuXG4qXG4qIEByZXR1cm4gdGhpc1ZpZXdwb3J0Q29udGVudCAoYXJyYXkpXG4qXG4qL1xuXG4vL0ZJWDogQWRkIGNvbmRpdGlvbiBjaGVjazogYWxsVmlld3BvcnRzQ29udGVudCBmb3IgY29ycmVjdCBkYXRhIHN0cnVjdHVyZVxuZnVuY3Rpb24gZmlsdGVyQnlWaWV3cG9ydChhbGxWaWV3cG9ydHNDb250ZW50LCBmaXJzdEJyZWFrLCBzZWNvbmRCcmVhayl7XG5cbiAgICAvL3NlbGVjdCB0aGUgbGFyZ2VyIG9mIHZpZXdwb3J0IGhlaWdodCAtIHdpZHRoIChkZXZpY2UgY2FuIHJvdGF0ZSBhZnRlciBsb2FkaW5nIGNvbnRlbnQpXG4gICAgdmFyIHRoaXNWaWV3cG9ydFNpemUgPSBNYXRoLm1heCh2aWV3SGVpZ2h0LCB2aWV3V2lkdGgpO1xuICAgIHZhciB0aGlzVmlld3BvcnRDb250ZW50O1xuXG4gICAgLy9tZWRpdW07XG4gICAgaWYgKCB0aGlzVmlld3BvcnRTaXplIDw9IGZpcnN0QnJlYWsgKXtcbiAgICAgICAgdGhpc1ZpZXdwb3J0Q29udGVudCA9IGFsbFZpZXdwb3J0c0NvbnRlbnRbMV07XG4gICAgfVxuXG4gICAgLy9sYXJnZTtcbiAgICBlbHNlIGlmKCB0aGlzVmlld3BvcnRTaXplID49IGZpcnN0QnJlYWsgJiYgdGhpc1ZpZXdwb3J0U2l6ZSA8PSBzZWNvbmRCcmVhaykge1xuICAgICAgICB0aGlzVmlld3BvcnRDb250ZW50ID0gYWxsVmlld3BvcnRzQ29udGVudFsyXTtcbiAgICB9XG5cbiAgICAvL3hsYXJnZVxuICAgIGVsc2V7XG4gICAgICAgIHRoaXNWaWV3cG9ydENvbnRlbnQgPSBhbGxWaWV3cG9ydHNDb250ZW50WzNdO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzVmlld3BvcnRDb250ZW50O1xufVxuIiwiZnVuY3Rpb24gYXBwbHlJc28oKXtcclxuICAgIHZhciBwcm9qZWN0c0lzbyA9IGpRdWVyeSgnLmlzby1ncmlkJykuaXNvdG9wZSh7XHJcbiAgICAgICAgaXRlbVNlbGVjdG9yOiAnLmlzby1ncmlkLWl0ZW0nLFxyXG4gICAgICAgIHJlc2l6YWJsZTogdHJ1ZSwgLy8gZGlzYWJsZSBub3JtYWwgcmVzaXppbmdcclxuICAgICAgICBwZXJjZW50UG9zaXRpb246IHRydWUsXHJcblxyXG4gICAgICAgIGFuaW1hdGlvbkVuZ2luZTogJ2Jlc3QtYXZhaWxhYmxlJyxcclxuICAgICAgICBhbmltYXRpb25PcHRpb25zOiB7XHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiAzMDAwLFxyXG4gICAgICAgICAgICBlYXNpbmc6ICdsaW5lYXInLFxyXG4gICAgICAgICAgICBxdWV1ZTogZmFsc2VcclxuICAgICAgICB9LFxyXG4gICAgICAgIGxheW91dE1vZGU6ICdmaXRSb3dzJyxcclxuICAgICAgICBtYXNvbnJ5OntcclxuICAgICAgICAgICAgY29sdW1uV2lkdGg6ICAgICdpc28tZ3JpZC1pdGVtJyxcclxuICAgICAgICAgICAgaXNBbmltYXRlZDogICAgIHRydWVcclxuICAgICAgICAgICAgLy9pc0ZpdFdpZHRoOiAgICAgdHJ1ZVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcbiIsIlxuZnVuY3Rpb24gbGF6eUxvYWRSZXNvdXJjZShmaWxlLCB0eXBlKXtcblx0dmFyIGNiID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGxpbms7XG4gICAgaWYgKHR5cGUgPT09IFwiY3NzXCIpe1xuXHRcdGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaW5rJyk7IGxpbmsucmVsID0gJ3N0eWxlc2hlZXQnO1xuXHR9XG5cdGVsc2UgaWYgKHR5cGUgPT09IFwianNcIil7XG5cdFx0bGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpOyBsaW5rLnR5cGUgPSAndGV4dC9qYXZhc2NyaXB0Jztcblx0fVxuXG5cdGxpbmsuaHJlZiA9IGZpbGU7XG5cdHZhciBoID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXTsgaC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShsLCBoKTtcblx0fTtcblx0dmFyIHJhZiA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSB8fCBtb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcblx0d2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8IG1zUmVxdWVzdEFuaW1hdGlvbkZyYW1lO1xuXHRpZiAocmFmKSByYWYoY2IpO1xuXHRlbHNlIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgY2IpO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuLypqc2hpbnQgLVcxMTcgKi9cblxuZnVuY3Rpb24gbG9hZCh3aGVyZSwgd2hhdCwgY2FsbGJhY2spe1xuXHRjb25zb2xlLmxvZyhcIkxvYWRlZDogXCIgKyB3aGF0ICsgXCIgSU5UTyBcIiArIHdoZXJlKTtcblx0alF1ZXJ5KCB3aGVyZSApLmxvYWQoIHdoYXQsIGZ1bmN0aW9uKCkge1xuXHQgIGpRdWVyeSh3aW5kb3cpLnJlc2l6ZSgpO1xuXHQgIHdpbmRvdy5zY3JvbGxUbygwLDApO1xuICAgICAgY2FsbGJhY2soKTtcblx0fSk7XG59XG4iLCJcclxuZnVuY3Rpb24gZG9SZWN1cnNpdmVseSh0aGlzRm4sIGludGVydmFsLCB0aW1lb3V0KSB7XHJcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcblx0ICAgIGludGVydmFsID0gaW50ZXJ2YWwgfHwgIDMwMDA7XHJcblx0ICAgIHRpbWVvdXQgPSAgdGltZW91dCAgfHwgMzAwMDA7XHJcblx0ICAgIHZhciBzdGFydFRpbWUgPSAobmV3IERhdGUoKSkuZ2V0VGltZSgpO1xyXG5cclxuXHJcblx0ICAgIChmdW5jdGlvbiByaW5jZVJlcGVhdCgpIHtcclxuXHQgICAgICAgIHZhciB0aGlzRm5SZXN1bHQgPSB0aGlzRm4oKTtcclxuXHJcblx0ICAgICAgICBpZiAoIChEYXRlLm5vdygpIC0gc3RhcnRUaW1lICkgPD0gdGltZW91dCApICB7XHJcblx0ICAgICAgICAgICAgc2V0VGltZW91dChyaW5jZVJlcGVhdCwgaW50ZXJ2YWwsIHRoaXNGblJlc3VsdCk7XHJcblx0ICAgICAgICB9XHJcblx0ICAgIH0pKCk7XHJcblxyXG4gICAgfSwgaW50ZXJ2YWwgKiAwLjc1KTtcclxufVxyXG4iLCJmdW5jdGlvbiByZXNldEhlaWdodHModGFyZ2V0KXtcclxuICAgIGpRdWVyeSh0YXJnZXQpLmNzcygnbWluLWhlaWdodCcsICdub25lJyk7XHJcbiAgICBqUXVlcnkodGFyZ2V0KS5jc3MoJ21heC1oZWlnaHQnLCAnbm9uZScpO1xyXG4gICAgalF1ZXJ5KHRhcmdldCkuY3NzKCdoZWlnaHQnLCAnYXV0bycpO1xyXG59XHJcblxyXG5mdW5jdGlvbiByZXNldFdpZHRocyh0YXJnZXQpe1xyXG4gICAgalF1ZXJ5KHRhcmdldCkuY3NzKCdtaW4td2lkdGgnLCAnbm9uZScpO1xyXG4gICAgalF1ZXJ5KHRhcmdldCkuY3NzKCdtYXgtd2lkdGgnLCAnbm9uZScpO1xyXG4gICAgalF1ZXJ5KHRhcmdldCkuY3NzKCd3aWR0aCcsICdhdXRvJyk7XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
