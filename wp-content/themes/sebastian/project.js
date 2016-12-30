'use strict';
/*jshint -W117 */
/*jshint -W082 */

jQuery(document).ready(function(){
	console.log("doc.ready");
	//Call the core functions on every page
	coreReady();

	//Control resize/scroll debouncing in one place
	//FIX: reintegrate 'debounce style' promises
	jQuery(window).on('scroll',	scrollMenu(35));
	jQuery(window).on('ready', 	coreResize());
	jQuery(window).on('resize',	coreResize());

	//PAGE SPECIFIC JS

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
        if(jQuery.fn.core_iso_sort){ jQuery('.iso-grid').avia_iso_sort(); }
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
/*jshint -W117 */

//Init Project Variables
var mobileNavOnly 		= true;
var pageLoader 			= true;
var devTesting 			= true;
var baseFontSize 		= parseInt(jQuery('html').css('font-size'));
var mobilePortrait 		= 414;
var mobileLandscape 	= 767;
var tabletLandscape 	= 1024;

var console		= window.console;
var alert 		= window.alert;
var html 		= document.documentElement;
var body 		= document.body;
var wrapper 	= get('wrapper');
var docWidth 	= html.clientWidth;
var docHeight 	= getDocHeight();
var viewAsp 	= (window.innerWidth/window.innerHeight).toFixed(2);

var breakPoint  = getBreakpoint(mobilePortrait, mobileLandscape);
var aspText 	= getOrientationClass();
var deviceType 	= jQuery('html').data('device');



function coreReady(){
    //Get elements for future reference
    var navOpenBtn = get('navOpenBtn');
    var navCloseBtn = get('navCloseBtn');
    var pageLoader = get('pageLoader');

    pageLoader.style = ("visibility: hidden");
    removeClass(html, "no-js");
    coreResize();
}

function coreResize(){
    //Reset base values
	docWidth 	= html.clientWidth;
    docHeight 	= getDocHeight();
	viewWidth 	= window.innerWidth;
	viewHeight 	= window.innerHeight; //console.log(viewHeight);
	viewAsp		= ( viewWidth / viewHeight ).toFixed(2);
    breakPoint 	= getBreakpoint(mobilePortrait, mobileLandscape, tabletLandscape);
	aspText 	= getOrientationClass();

    //Check if the menu class should change
    navClasses();

    //Set Wrapper height to the viewportSize
    minHeight(wrapper, viewHeight);
    var wrapHeight = getHeight(wrapper);
    height(html, wrapHeight);
    height(body, wrapHeight);

    //Set height of mobile menu
    menuHeight(docHeight);

    //Adjust footer possition on mismatched screen / document sizes
    footerPosition();

    //If devTesting TRUE init testPanel
    if (devTesting === true){
		testPanel();
	}

	//Log current device info
	console.log('coreFramework.js/coreResize dH:'+ docHeight + ' - vH:'+ viewHeight +  ' x vW:' + viewWidth +' Asp:' + viewAsp +' ' + aspText +' ' + deviceType);

}// coreResize

function menuHeight(docHeight){
    var nav = get('nav');
    height(nav, "auto");
    if (hasClass(body, 'mobileMenuOpen') ){
        //console.log("menuHeight - docH: " + docHeight);
        height(nav, docHeight);
        minHeight(nav, viewHeight);
    }
}

//Fix Footer position for short pages - triggered on .resize
//NOTE - FIX POSITION ABSOLUTE FROM 'absoluteAfter' on resize
function footerPosition(){
    //reset any values from previous function call
    var footerWrapper = get('footerWrapper');
    removeClass(footerWrapper, 'appendToViewport');
    setStyle(footerWrapper, {
        'position' : 'static',
        'top' : 'auto'
    });

    //get new values
    var footerBox = box(footerWrapper);
    var footerBottom = footerBox.offset.bottom;

    //if the footer isn't already at the bottom
    if(footerBottom < viewHeight) {
        //see if previous content is in the document flow ~ TRUE: position at bottom of prev sibling
        var eleAbove = get(footerWrapper, 'prev');
            //get previous sibling values
            var eleAboveBox = box(eleAbove);
            var eleAboveBottom = eleAboveBox.offset.bottom;
            var eleAbovePosition = eleAboveBox.position;

        if(eleAbovePosition === "absolute"){
            moveAfter(footerWrapper, eleAbove);
        }

        //check if there is enough space to fit the footer
        var availableSpace = viewHeight - eleAboveBottom;
        var footerHeight = footerBox.height;
        /*console.log("viewHeight: " + viewHeight);
        console.log("eleAbove: " + JSON.stringify(eleAboveBox, null, 4));
        console.log("footerHeight: " + footerHeight);
        console.log("availableSpace: " + availableSpace);*/

        //and only if the page content is shorter by the height of the footer
        if ( availableSpace > footerHeight ){
            addClass(footerWrapper, 'appendToViewport');
        }
    }

}

function navClasses() {
	if (mobileNavOnly === false){
		if (viewWidth >= 1024){
			addClass(body, 'desktopMenu');
			removeClass(body, 'mobileMenu');
		}
		else{
			removeClass(body, 'desktopMenu');
			addClass(body,'mobileMenu');
		}
	}
}

/*Add mobileMenu class to body */
function addMenuOpenClass(){
    removeClass(body, 'desktopMenu');
	removeClass(body, 'mobileMenuClosed');
	addClass(body, 'mobileMenuOpen');
    menuHeight();
}

/*Remove mobileMenu class from body */
function removeMenuOpenClass(){
	removeClass(body, 'mobileMenuOpen');
	addClass(body, 'mobileMenuClosed');
    navClasses();
    menuHeight();
}

//set 'scroll' class when Xpx distance from top
function scrollMenu(distance, element){
    distance = distance || 25;

    var thisScrollValue = getScrollValue(element);
    if ( thisScrollValue > distance) {
	    addClass(body, 'scrollMenu');
	}
	else{
        removeClass(body, 'scrollMenu');
	}
}

//set portrait / landscape class
function getOrientationClass(){
	if (viewHeight > viewWidth) {
		addClass(body, 'portrait');
		removeClass(body, 'landscape');
		return "portrait";
	}
	else{
		addClass(body, 'landscape');
		removeClass(body, 'portrait');
		return "landscape";
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
'use strict';
/*jshint -W117 */

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



function clearHeight(target){
    jQuery(target).css('min-height', 'none');
    jQuery(target).css('max-height', 'none');
    jQuery(target).css('height', 'auto');
}

function getBreakpoint(mobilePortrait, mobileLandscape, tabletLandscape){

    if( viewWidth < mobileLandscape ){
        return "small";
    }
    else if( (viewWidth > mobileLandscape) && (viewWidth < tabletLandscape ) ){
        return "medium";
    }
    else if( viewWidth >= tabletLandscape ){
        return "large";
    }
}

function matchHeight(ele, targetHeight){
    var eleHeight;
    if (!targetHeight){
		eleHeight = viewHeight;
	}
	else {
		eleHeight = targetHeight;
	}
	return jQuery(ele).height(eleHeight);
}

function widerThan(min, max, target){

	if(!target){
		target = jQuery(window);
	}

	if (max){

		if( (max > width(target) ) && ( min < width(target) ) ){
			return true;
		}
	}
	else if( min < width(target) ){
		return true;
	}
	else{
		return false;
	}
}

function maxSizeByAsp(target, minAsp, maxAsp){
	jQuery(target).css('max-height', 'none');
	jQuery(target).css('min-height', 0);


	var targetAsp = jQuery(target).width() / jQuery(target).height();

	//if WIDE / SHORT SLIDE
	if (targetAsp > maxAsp){
		minH(target, viewWidth / maxAsp);
	}

	// if TALL / SKINNY SLIDE
	if (targetAsp < minAsp){
		maxH(target, viewWidth / minAsp );
	}
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

/*
function buttomOffset(element, includeMargin){
    var thisOffsetTop = jQuery(element).offset().top;
    var thisHeight = jQuery(element).outerHeight(includeMargin);
    var thisOffsetBottom = thisOffsetTop + thisHeight;
    return thisOffsetBottom;
}*/

function rightOffset(element, includeMargin){
    var thisOffsetLeft = jQuery(element).offset().left;
    var thisWidth = jQuery(element).outerWidth(includeMargin);
    var thisOffsetRight = thisOffsetLeft + thisWidth;
    return thisOffsetRight;
}



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
    var thisOuterHeight = getOuterHeight(element, 200, thisMargin, thisPadding);
    var thisOuterWidth  = getOuterWidth(element, thisWidth, thisMargin, thisPadding);
    var thisOffset      = getOffset(element, 300, thisOuterWidth);

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
        getHeight(element)
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
        getMinHeight(element)
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
    var thisPaddingTop =    toInt( getStyle(element, "paddingTop") );
    var thisPaddingRight =  toInt( getStyle(element, "paddingRight") );
    var thisPaddingBottom = toInt( getStyle(element, "paddingBottom") );
    var thisPaddingLeft =   toInt( getStyle(element, "paddingLeft") );

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
    outerHeight ? outerHeight : outerHeight = getOuterHeight(element);
    outerWidth  ? outerWidth  : outerWidth  = getOuterWidth(element);
    var thisTop = getOffsetTop(element);
    var thisRight = getOffsetRight(element, outerWidth);
    var thisBottom = getOffsetBottom(element, outerHeight);
    var thisLeft = getOffsetLeft(element);

    var theseOffsets = {
        top: thisTop,
        right: thisRight,
        bottom: thisBottom,
        left: thisLeft
    }
    //console.log("getOffset() : " + theseOffsets);
    return theseOffsets;
}

function getOffsetTop(element){
    var thisTop = 0;
    while(element){
        thisTop += (element.offsetLeft - element.scrollLeft + element.clientLeft);
        element = element.offsetParent;
    }

    return thisTop;
}

function getOffsetBottom(element, outerHeight){
    outerHeight ? outerHeight = outerHeight : outerHeight = getOuterHeight(element);
    var thisElementTop = getOffsetTop(element);
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
    outerWidth ? outerWidth : outerWidth = getOuterWidth(element);
    var thisOffsetLeft = getOffsetLeft(element);
    var thisOffsetBottom = thisOffsetLeft + outerWidth;

    return thisOffsetBottom;
}


//outerHeight + outerWidth calculations
function getOuterHeight(element, height, margin, padding){
/*
    console.log("getOuterHeight() $$$$$$$$$$$$");
    console.log("element: " + element.id);
    console.log("height: " + height);
    var callerName;
    try { throw new Error(); }
    catch (e) {
        var re = /(\w+)@|at (\w+) \(/g, st = e.stack, m;
        re.exec(st), m = re.exec(st);
        callerName = m[1] || m[2];
    }
    console.log("getOuterHeight() called on " + element.id + " by: " + callerName);
    */
    height ? height : height = getHeight(element);
    margin ? margin = margin : margin = getMargin(element);
    padding ? padding = padding : padding = getPadding(element);

    //get/add vertical margin and padding values to height
    var thisVertMargin = margin.top + margin.bottom;
    var thisVertPadding = padding.top + padding.bottom;
    var thisOuterHeight = height + thisVertMargin + thisVertPadding;

    return thisOuterHeight;
}

function getOuterWidth(element, width, margin, padding){
    width ? width : width = getWidth(element);
    margin ? margin = margin : margin = getMargin(element);
    padding ? padding = padding : padding = getPadding(element);

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
        thisTarget = getFamily(selector, family)
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
    style(element, {
        'position':'absolute',
        'top': toPix(thisTop)
        }
    )
}
'use strict';
/*jshint -W117 */
//EVENT LISTENERS - FIX: use addEvent()
navOpenBtn.addEventListener('click', addMenuOpenClass );
navCloseBtn.addEventListener('click', removeMenuOpenClass );

var mouseDown = false;
document.addEventListener('mousedown', function() {
    mouseDown = true;
});

document.addEventListener('mouseup', function() {
    mouseDown = false;
});

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

/*

//Sample Usage

addEvent(window, 'load', function(){
    //all our code that runs after the page is ready goes here
});

addEvent(ourForm, 'submit', checkForm);

// */
'use strict';
/*jshint -W117 */
//debugger; //creates breakpoint and automatically stops script and opens dev tools

function getDocHeight(){
    //Standardize height to heighest value
    var docHeight = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );
    return docHeight;
}

// get element by Id > class > selector
function get(selector, family){
    var thisTarget; //contains resulting element(s) from get()

    if (family){
        thisTarget = getFamily(selector, family)
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

    if ( typeof(thisValue) === "string" ){
        //parse to base 10 + also removing trailing "px"
        thisValue = parseInt(thisValue, 10);
    }
    thisValue = thisValue += "px";
    return thisValue;
}

function toInt(thisValue){ //check for 'none', 'inherit' etc.
    if ( typeof(thisValue) === "string" ){
        //parse to base 10 + also removing trailing "px"
        thisValue = parseInt(thisValue, 10);
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
function initDragendGallery(galleryContainer , viewHeight){
	var slidesContainer = jQuery( galleryContainer + ' .image-gallery' );
	//console.log(slidesContainer);
	updateDragendSlides(
		slidesContainer, // parent GalleryContainer
		viewHeight        // slides size
	 );

	//init Dragend
 	jQuery(slidesContainer).dragend({});
	/*
	if (thumbsType){
		jQuery('#thumbsScroll').fadeIn();
	}
	else{
		jQuery('#thumbsScroll').hide();
	}



	//AutoPlay Slides
	doRecursively( function(){ autoPlaySlides(slidesContainer) }, 4000, 40000);

	//Adjust Slides on resize
	jQuery(window).resize(_.debounce(function(){
		updateDragendSlides(slidesContainer, viewHeight);
	}, 50));

	//FIX: move to external function
	//Set Next and Previous Links
	//Using WordPress next_post_link and previous_post_link for href, and replacing for custom text, classes and data-overlay-slug
	var nextLinkHref= jQuery(".hide a[rel='next']").attr('href');
	var prevLinkHref= jQuery(".hide a[rel='prev']").attr('href');

	if (nextLinkHref){
		jQuery("#nextProject").attr("href", nextLinkHref );
	}
	else{
		jQuery("#nextProject").css("display", "none" );
	}

	if (prevLinkHref){
		jQuery("#prevProject").attr("href", prevLinkHref );
	}
	else{
		jQuery("#prevProject").css("display", "none" );
	}
*/
}//createGallery()
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

'use strict';
/*jshint -W117 */

function updateDragendSlides(slidesContainer, slidesHeight){
	console.log(slidesContainer);

	//find each page in slider
    slidesContainer.find(".dragend-page").each(function(index, thisSlide){

        //reset height
        clearHeight(this);
        jQuery(this).height(slidesHeight);

        //reset max-height
        jQuery(this).css("max-height", "auto");
        maxSizeByAsp(this, 1.6, 2.2);

    });
	/*
	//FIX: pass thumbsContent
	if( thumbsContent ){
		centerThumbs( thumbsContent );
	}
	*/

}//updateSlider

//THUMBNAILS
function createThumbs(slidesContainer, thumbsContainer, thumbsContent, thumbsType){
	jQuery.each( thumbsContent, function( index, thumb ){
		var thisThumb = jQuery('<div class="dragend-thumb" data-page="' + (index + 1) + '"></div>');
		thisThumb.appendTo(jQuery(thumbsContainer));

		if(thumbsType == "thumbnails"){
			setBgImg(thisThumb, thumb[0], "square");
		}
		else if(thumbsType == "buttons"){
			//add button support
		}
	});
    centerThumbs( thumbsContent );
	initThumbs( slidesContainer, thumbsContainer );
}

	function initThumbs(slidesContainer, thumbsContainer){
        jQuery(document).on("click", thumbsContainer, function(event){
			var page = jQuery(event.target).data("page");
			jQuery(slidesContainer).dragend({
				scrollToPage: page
			});
		});
	}


	function centerThumbs(thumbsContent){
        jQuery(thumbsContainer).width( thumbsContent.length * jQuery('.dragend-thumb').width() );
        var thumbsWidth = jQuery(thumbsContainer).width();

		jQuery('#thumbsContainer').css('margin-left', 0);

	    if (viewWidth > thumbsWidth ){
            var thumbOffset = ( viewWidth - thumbsWidth ) / 2;
            jQuery('#thumbsContainer').css('margin-left', thumbOffset);
        }
	}

//General Functions
function autoPlaySlides(thisDragend){
	jQuery(thisDragend).dragend("left");
}


'use strict';
/*jshint -W117 */

//OVERLAY - Shadowbox style popup box
//CSS defaults set in core/scss/partials/_overlay.scss
//Customize css for #OverlayContent.slug in your theme
function createOverlay(slug){

    var overlayWrapper = get('overlayWrapper');
    var overlayContent = get('overlayContent');
    styles(
        overlayWrapper,{
            'display':'block'
        }
    );

    overlayContent.className = slug; //will overwrite any existing class

    //overlayContent used by load() 'where' parameter
	return overlayContent;
}

// Setup click handlers
jQuery(document).on("click", ".overlay", function(event){
    jQuery('#overlayContent').empty(); //remove any pre-existing content
    var slug	= jQuery(this).data('overlay-slug');
    var what 	= jQuery(this).attr('href');
    var where 	= createOverlay(slug);
    load(where, what);
    return false;
});

jQuery('body').on('click', '#overlayCloseBtn', function() {
    jQuery('#overlayContent').empty();
    jQuery('#overlayWrapper').hide();
});
'use strict';
/*jshint -W117 */

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

/*Go To Top Function*/
var goToTop = document.getElementById('btn-to-top');

goToTop.onclick = function () {
    window.scrollTo(0, 0);

	smoothScrollTo(0, 500);
};

window.smoothScrollTo = (function () {
  var timer, start, factor;

  return function (target, duration) {
    var offset = window.pageYOffset,
        delta  = target - window.pageYOffset; /* Y-offset difference*/
    duration = duration || 1000;              /* default 1 sec animation*/
    start = Date.now();                      /* get start time*/
    factor = 0;

    if( timer ) {
      clearInterval(timer); // stop any running animations
   }

    function step() {
      var y;
      factor = (Date.now() - start) / duration; // get interpolation factor
      if( factor >= 1 ) {
        clearInterval(timer); // stop animation
        factor = 1;           // clip to max 1.0
     }
      y = factor * delta + offset;
      window.scrollBy(0, y - window.pageYOffset);
   }

    timer = setInterval(step, 20);
    return timer;
 };
}());
'use strict';
/*jshint -W117 */

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
    }, 3000)
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

'use strict';
/*jshint -W117 */

// MOVED TO <HEAD> scripts

/*
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
*/
'use strict';
/*jshint -W117 */

function load(where, what){
	console.log("Loaded: " + what + " INTO " + where);
	jQuery( where ).load( what, function() {
	  jQuery(window).resize();
	  window.scrollTo(0,0);
	});
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2plY3QuanMiLCJjb3JlRnJhbWV3b3JrLmpzIiwiY29yZUdldEpzb24uanMiLCJjb3JlSGVscGVycy5qcyIsImNvcmVWYW5pbGxhQXJyYXlzLmpzIiwiY29yZVZhbmlsbGFCb3hNb2RlbC5qcyIsImNvcmVWYW5pbGxhRG9tLmpzIiwiY29yZVZhbmlsbGFFdmVudHMuanMiLCJjb3JlVmFuaWxsYUhlbHBlcnMuanMiLCJjb3JlVmFuaWxsYUpzb24uanMiLCJjb3JlVmFuaWxsYVNlbGVjdG9ycy5qcyIsImNvcmVWYW5pbGxhU3RyaW5ncy5qcyIsImNvcmVWYW5pbGxhU3R5bGVzLmpzIiwiZHJhZ2VuZENyZWF0ZUdhbGxlcnkuanMiLCJkcmFnZW5kRXh0cmEuanMiLCJkcmFnZW5kSGVscGVycy5qcyIsIm1vZGFsc092ZXJsYXkuanMiLCJtb2RhbHNTY3JvbGxUb3AuanMiLCJtb2RhbHNUZXN0aW5nLmpzIiwidHJvdWJsZXNob290aW5nRXhhbXBsZXMuanMiLCJ2ZWxjcm9HZXRJbWFnZXMuanMiLCJ2ZWxjcm9Mb2FkLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDM0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdkxBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMzT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN0REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDalFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDVkE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2hEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN2RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQy9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoicHJvamVjdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0Jztcbi8qanNoaW50IC1XMTE3ICovXG4vKmpzaGludCAtVzA4MiAqL1xuXG5qUXVlcnkoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCl7XG5cdGNvbnNvbGUubG9nKFwiZG9jLnJlYWR5XCIpO1xuXHQvL0NhbGwgdGhlIGNvcmUgZnVuY3Rpb25zIG9uIGV2ZXJ5IHBhZ2Vcblx0Y29yZVJlYWR5KCk7XG5cblx0Ly9Db250cm9sIHJlc2l6ZS9zY3JvbGwgZGVib3VuY2luZyBpbiBvbmUgcGxhY2Vcblx0Ly9GSVg6IHJlaW50ZWdyYXRlICdkZWJvdW5jZSBzdHlsZScgcHJvbWlzZXNcblx0alF1ZXJ5KHdpbmRvdykub24oJ3Njcm9sbCcsXHRzY3JvbGxNZW51KDM1KSk7XG5cdGpRdWVyeSh3aW5kb3cpLm9uKCdyZWFkeScsIFx0Y29yZVJlc2l6ZSgpKTtcblx0alF1ZXJ5KHdpbmRvdykub24oJ3Jlc2l6ZScsXHRjb3JlUmVzaXplKCkpO1xuXG5cdC8vUEFHRSBTUEVDSUZJQyBKU1xuXG5cdC8vSE9NRSBQQUdFIC0gRHJhZ2VuZCBJbWFnZSBHYWxsZXJ5XG5cdGlmICggalF1ZXJ5KCdodG1sJykuZGF0YSgncGFnZS1zbHVnJykgPT0gJ2hvbWUnICl7XG5cbiAgICAgICAgalF1ZXJ5KHdpbmRvdykub24oJ3Jlc2l6ZScsIGhvbWVSZXNpemUoKSk7XG5cblx0XHRmdW5jdGlvbiBob21lUmVzaXplKCl7XG5cdCAgICAgICAgY29uc29sZS5sb2coXCJwcm9qZWN0LmpzL2hvbWU6cmVzaXplIEg6IFwiICsgdmlld0hlaWdodCArIFwiIFc6IFwiICsgdmlld1dpZHRoKTtcblxuXHRcdH1cblxuXHR9Ly9ob21lIHBhZ2VcblxuXHQvL1BST0pFQ1RTIFBBR0UgLSBEcmFnZW5kIEltYWdlIEdhbGxlcnlcblx0aWYgKCBqUXVlcnkoJ2h0bWwnKS5kYXRhKCdwYWdlLXNsdWcnKSA9PSAncHJvamVjdHMnIHx8IGpRdWVyeSgnaHRtbCcpLmRhdGEoJ3BhZ2Utc2x1ZycpID09ICdwb3J0Zm9saW8nKXtcblx0XHRqUXVlcnkod2luZG93KS5vbigncmVzaXplJywgcHJvamVjdHNSZXNpemUoKSApO1xuXHRcdGpRdWVyeSh3aW5kb3cpLm9uKCdyZXNpemUnLCBhcHBseUlzbygpICk7XG5cblx0XHRmdW5jdGlvbiBwcm9qZWN0c1Jlc2l6ZSgpe1xuXHRcdFx0Y29uc29sZS5sb2coXCJwcm9qZWN0LmpzL3Byb2plY3RzOnJlc2l6ZSBIOiBcIiArIHZpZXdIZWlnaHQgKyBcIiBXOiBcIiArIHZpZXdXaWR0aCk7XG5cblx0XHR9XG5cbiAgICAgICAgLy8gUG9ydGZvbGlvIE1hc29uYXJ5XG4gICAgICAgIGlmKGpRdWVyeS5mbi5jb3JlX2lzb19zb3J0KXsgalF1ZXJ5KCcuaXNvLWdyaWQnKS5hdmlhX2lzb19zb3J0KCk7IH1cblx0XHRmdW5jdGlvbiBhcHBseUlzbygpe1xuXHRcdFx0dmFyIHByb2plY3RzSXNvID0galF1ZXJ5KCcuaXNvLWdyaWQnKS5pc290b3BlKHtcblx0XHRcdFx0aXRlbVNlbGVjdG9yOiAnLmlzby1ncmlkLWl0ZW0nLFxuXHRcdFx0XHRyZXNpemFibGU6IGZhbHNlLCAvLyBkaXNhYmxlIG5vcm1hbCByZXNpemluZ1xuXHRcdFx0XHRwZXJjZW50UG9zaXRpb246IHRydWUsXG5cdFx0XHRcdGFuaW1hdGlvbkVuZ2luZTogJ2Jlc3QtYXZhaWxhYmxlJyxcblx0XHRcdFx0YW5pbWF0aW9uT3B0aW9uczoge1xuXHRcdFx0ICAgIFx0ZHVyYXRpb246IDMwMDAsXG5cdFx0XHQgICAgXHRlYXNpbmc6ICdsaW5lYXInLFxuXHRcdFx0ICAgIFx0cXVldWU6IGZhbHNlXG5cdFx0XHQgICAgfSxcblx0XHRcdFx0bGF5b3V0TW9kZTogJ2ZpdFJvd3MnLFxuXHRcdFx0XHRtYXNvbnJ5Ontcblx0ICAgICAgICAgICAgICAgIGNvbHVtbldpZHRoOiAgICAnaXNvLWdyaWQtaXRlbScsXG5cdCAgICAgICAgICAgICAgICBpc0FuaW1hdGVkOiAgICAgdHJ1ZVxuXHQgICAgICAgICAgICAgICAgLy9pc0ZpdFdpZHRoOiAgIHRydWVcblx0ICAgICAgICAgICAgfVxuXHRcdFx0fSk7XG5cdFx0fVxuXHR9Ly9wcm9qZWN0cyBwYWdlXG5cbiAgICAvL0NPTlRBQ1QgUEFHRSAtXG4gICAgaWYgKCBqUXVlcnkoJ2h0bWwnKS5kYXRhKCdwYWdlLXNsdWcnKSA9PSAnY29udGFjdCcpe1xuICAgICAgICAvL05ldyBEcmFnZW5kIENsYXNzXG5cdFx0alF1ZXJ5KFwiI3F1b3RlUm90YXRvclwiKS5kcmFnZW5kKHt9KTtcblxuICAgICAgICAvL0F1dG9QbGF5IFF1b3Rlc1xuICAgICAgICBkb1JlY3Vyc2l2ZWx5KCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgaWYgKG1vdXNlRG93biA9PT0gZmFsc2Upe1xuICAgICAgICAgICAgICAgIGF1dG9QbGF5U2xpZGVzKFwiI3F1b3RlUm90YXRvclwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgMjc1MCwgMzMwMDApO1xuICAgIH0vL2NvbnRhY3QgcGFnZVxufSk7XG4iLCIndXNlIHN0cmljdCc7XG4vKmpzaGludCAtVzExNyAqL1xuXG4vL0luaXQgUHJvamVjdCBWYXJpYWJsZXNcbnZhciBtb2JpbGVOYXZPbmx5IFx0XHQ9IHRydWU7XG52YXIgcGFnZUxvYWRlciBcdFx0XHQ9IHRydWU7XG52YXIgZGV2VGVzdGluZyBcdFx0XHQ9IHRydWU7XG52YXIgYmFzZUZvbnRTaXplIFx0XHQ9IHBhcnNlSW50KGpRdWVyeSgnaHRtbCcpLmNzcygnZm9udC1zaXplJykpO1xudmFyIG1vYmlsZVBvcnRyYWl0IFx0XHQ9IDQxNDtcbnZhciBtb2JpbGVMYW5kc2NhcGUgXHQ9IDc2NztcbnZhciB0YWJsZXRMYW5kc2NhcGUgXHQ9IDEwMjQ7XG5cbnZhciBjb25zb2xlXHRcdD0gd2luZG93LmNvbnNvbGU7XG52YXIgYWxlcnQgXHRcdD0gd2luZG93LmFsZXJ0O1xudmFyIGh0bWwgXHRcdD0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xudmFyIGJvZHkgXHRcdD0gZG9jdW1lbnQuYm9keTtcbnZhciB3cmFwcGVyIFx0PSBnZXQoJ3dyYXBwZXInKTtcbnZhciBkb2NXaWR0aCBcdD0gaHRtbC5jbGllbnRXaWR0aDtcbnZhciBkb2NIZWlnaHQgXHQ9IGdldERvY0hlaWdodCgpO1xudmFyIHZpZXdBc3AgXHQ9ICh3aW5kb3cuaW5uZXJXaWR0aC93aW5kb3cuaW5uZXJIZWlnaHQpLnRvRml4ZWQoMik7XG5cbnZhciBicmVha1BvaW50ICA9IGdldEJyZWFrcG9pbnQobW9iaWxlUG9ydHJhaXQsIG1vYmlsZUxhbmRzY2FwZSk7XG52YXIgYXNwVGV4dCBcdD0gZ2V0T3JpZW50YXRpb25DbGFzcygpO1xudmFyIGRldmljZVR5cGUgXHQ9IGpRdWVyeSgnaHRtbCcpLmRhdGEoJ2RldmljZScpO1xuXG5cblxuZnVuY3Rpb24gY29yZVJlYWR5KCl7XG4gICAgLy9HZXQgZWxlbWVudHMgZm9yIGZ1dHVyZSByZWZlcmVuY2VcbiAgICB2YXIgbmF2T3BlbkJ0biA9IGdldCgnbmF2T3BlbkJ0bicpO1xuICAgIHZhciBuYXZDbG9zZUJ0biA9IGdldCgnbmF2Q2xvc2VCdG4nKTtcbiAgICB2YXIgcGFnZUxvYWRlciA9IGdldCgncGFnZUxvYWRlcicpO1xuXG4gICAgcGFnZUxvYWRlci5zdHlsZSA9IChcInZpc2liaWxpdHk6IGhpZGRlblwiKTtcbiAgICByZW1vdmVDbGFzcyhodG1sLCBcIm5vLWpzXCIpO1xuICAgIGNvcmVSZXNpemUoKTtcbn1cblxuZnVuY3Rpb24gY29yZVJlc2l6ZSgpe1xuICAgIC8vUmVzZXQgYmFzZSB2YWx1ZXNcblx0ZG9jV2lkdGggXHQ9IGh0bWwuY2xpZW50V2lkdGg7XG4gICAgZG9jSGVpZ2h0IFx0PSBnZXREb2NIZWlnaHQoKTtcblx0dmlld1dpZHRoIFx0PSB3aW5kb3cuaW5uZXJXaWR0aDtcblx0dmlld0hlaWdodCBcdD0gd2luZG93LmlubmVySGVpZ2h0OyAvL2NvbnNvbGUubG9nKHZpZXdIZWlnaHQpO1xuXHR2aWV3QXNwXHRcdD0gKCB2aWV3V2lkdGggLyB2aWV3SGVpZ2h0ICkudG9GaXhlZCgyKTtcbiAgICBicmVha1BvaW50IFx0PSBnZXRCcmVha3BvaW50KG1vYmlsZVBvcnRyYWl0LCBtb2JpbGVMYW5kc2NhcGUsIHRhYmxldExhbmRzY2FwZSk7XG5cdGFzcFRleHQgXHQ9IGdldE9yaWVudGF0aW9uQ2xhc3MoKTtcblxuICAgIC8vQ2hlY2sgaWYgdGhlIG1lbnUgY2xhc3Mgc2hvdWxkIGNoYW5nZVxuICAgIG5hdkNsYXNzZXMoKTtcblxuICAgIC8vU2V0IFdyYXBwZXIgaGVpZ2h0IHRvIHRoZSB2aWV3cG9ydFNpemVcbiAgICBtaW5IZWlnaHQod3JhcHBlciwgdmlld0hlaWdodCk7XG4gICAgdmFyIHdyYXBIZWlnaHQgPSBnZXRIZWlnaHQod3JhcHBlcik7XG4gICAgaGVpZ2h0KGh0bWwsIHdyYXBIZWlnaHQpO1xuICAgIGhlaWdodChib2R5LCB3cmFwSGVpZ2h0KTtcblxuICAgIC8vU2V0IGhlaWdodCBvZiBtb2JpbGUgbWVudVxuICAgIG1lbnVIZWlnaHQoZG9jSGVpZ2h0KTtcblxuICAgIC8vQWRqdXN0IGZvb3RlciBwb3NzaXRpb24gb24gbWlzbWF0Y2hlZCBzY3JlZW4gLyBkb2N1bWVudCBzaXplc1xuICAgIGZvb3RlclBvc2l0aW9uKCk7XG5cbiAgICAvL0lmIGRldlRlc3RpbmcgVFJVRSBpbml0IHRlc3RQYW5lbFxuICAgIGlmIChkZXZUZXN0aW5nID09PSB0cnVlKXtcblx0XHR0ZXN0UGFuZWwoKTtcblx0fVxuXG5cdC8vTG9nIGN1cnJlbnQgZGV2aWNlIGluZm9cblx0Y29uc29sZS5sb2coJ2NvcmVGcmFtZXdvcmsuanMvY29yZVJlc2l6ZSBkSDonKyBkb2NIZWlnaHQgKyAnIC0gdkg6Jysgdmlld0hlaWdodCArICAnIHggdlc6JyArIHZpZXdXaWR0aCArJyBBc3A6JyArIHZpZXdBc3AgKycgJyArIGFzcFRleHQgKycgJyArIGRldmljZVR5cGUpO1xuXG59Ly8gY29yZVJlc2l6ZVxuXG5mdW5jdGlvbiBtZW51SGVpZ2h0KGRvY0hlaWdodCl7XG4gICAgdmFyIG5hdiA9IGdldCgnbmF2Jyk7XG4gICAgaGVpZ2h0KG5hdiwgXCJhdXRvXCIpO1xuICAgIGlmIChoYXNDbGFzcyhib2R5LCAnbW9iaWxlTWVudU9wZW4nKSApe1xuICAgICAgICAvL2NvbnNvbGUubG9nKFwibWVudUhlaWdodCAtIGRvY0g6IFwiICsgZG9jSGVpZ2h0KTtcbiAgICAgICAgaGVpZ2h0KG5hdiwgZG9jSGVpZ2h0KTtcbiAgICAgICAgbWluSGVpZ2h0KG5hdiwgdmlld0hlaWdodCk7XG4gICAgfVxufVxuXG4vL0ZpeCBGb290ZXIgcG9zaXRpb24gZm9yIHNob3J0IHBhZ2VzIC0gdHJpZ2dlcmVkIG9uIC5yZXNpemVcbi8vTk9URSAtIEZJWCBQT1NJVElPTiBBQlNPTFVURSBGUk9NICdhYnNvbHV0ZUFmdGVyJyBvbiByZXNpemVcbmZ1bmN0aW9uIGZvb3RlclBvc2l0aW9uKCl7XG4gICAgLy9yZXNldCBhbnkgdmFsdWVzIGZyb20gcHJldmlvdXMgZnVuY3Rpb24gY2FsbFxuICAgIHZhciBmb290ZXJXcmFwcGVyID0gZ2V0KCdmb290ZXJXcmFwcGVyJyk7XG4gICAgcmVtb3ZlQ2xhc3MoZm9vdGVyV3JhcHBlciwgJ2FwcGVuZFRvVmlld3BvcnQnKTtcbiAgICBzZXRTdHlsZShmb290ZXJXcmFwcGVyLCB7XG4gICAgICAgICdwb3NpdGlvbicgOiAnc3RhdGljJyxcbiAgICAgICAgJ3RvcCcgOiAnYXV0bydcbiAgICB9KTtcblxuICAgIC8vZ2V0IG5ldyB2YWx1ZXNcbiAgICB2YXIgZm9vdGVyQm94ID0gYm94KGZvb3RlcldyYXBwZXIpO1xuICAgIHZhciBmb290ZXJCb3R0b20gPSBmb290ZXJCb3gub2Zmc2V0LmJvdHRvbTtcblxuICAgIC8vaWYgdGhlIGZvb3RlciBpc24ndCBhbHJlYWR5IGF0IHRoZSBib3R0b21cbiAgICBpZihmb290ZXJCb3R0b20gPCB2aWV3SGVpZ2h0KSB7XG4gICAgICAgIC8vc2VlIGlmIHByZXZpb3VzIGNvbnRlbnQgaXMgaW4gdGhlIGRvY3VtZW50IGZsb3cgfiBUUlVFOiBwb3NpdGlvbiBhdCBib3R0b20gb2YgcHJldiBzaWJsaW5nXG4gICAgICAgIHZhciBlbGVBYm92ZSA9IGdldChmb290ZXJXcmFwcGVyLCAncHJldicpO1xuICAgICAgICAgICAgLy9nZXQgcHJldmlvdXMgc2libGluZyB2YWx1ZXNcbiAgICAgICAgICAgIHZhciBlbGVBYm92ZUJveCA9IGJveChlbGVBYm92ZSk7XG4gICAgICAgICAgICB2YXIgZWxlQWJvdmVCb3R0b20gPSBlbGVBYm92ZUJveC5vZmZzZXQuYm90dG9tO1xuICAgICAgICAgICAgdmFyIGVsZUFib3ZlUG9zaXRpb24gPSBlbGVBYm92ZUJveC5wb3NpdGlvbjtcblxuICAgICAgICBpZihlbGVBYm92ZVBvc2l0aW9uID09PSBcImFic29sdXRlXCIpe1xuICAgICAgICAgICAgbW92ZUFmdGVyKGZvb3RlcldyYXBwZXIsIGVsZUFib3ZlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vY2hlY2sgaWYgdGhlcmUgaXMgZW5vdWdoIHNwYWNlIHRvIGZpdCB0aGUgZm9vdGVyXG4gICAgICAgIHZhciBhdmFpbGFibGVTcGFjZSA9IHZpZXdIZWlnaHQgLSBlbGVBYm92ZUJvdHRvbTtcbiAgICAgICAgdmFyIGZvb3RlckhlaWdodCA9IGZvb3RlckJveC5oZWlnaHQ7XG4gICAgICAgIC8qY29uc29sZS5sb2coXCJ2aWV3SGVpZ2h0OiBcIiArIHZpZXdIZWlnaHQpO1xuICAgICAgICBjb25zb2xlLmxvZyhcImVsZUFib3ZlOiBcIiArIEpTT04uc3RyaW5naWZ5KGVsZUFib3ZlQm94LCBudWxsLCA0KSk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiZm9vdGVySGVpZ2h0OiBcIiArIGZvb3RlckhlaWdodCk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiYXZhaWxhYmxlU3BhY2U6IFwiICsgYXZhaWxhYmxlU3BhY2UpOyovXG5cbiAgICAgICAgLy9hbmQgb25seSBpZiB0aGUgcGFnZSBjb250ZW50IGlzIHNob3J0ZXIgYnkgdGhlIGhlaWdodCBvZiB0aGUgZm9vdGVyXG4gICAgICAgIGlmICggYXZhaWxhYmxlU3BhY2UgPiBmb290ZXJIZWlnaHQgKXtcbiAgICAgICAgICAgIGFkZENsYXNzKGZvb3RlcldyYXBwZXIsICdhcHBlbmRUb1ZpZXdwb3J0Jyk7XG4gICAgICAgIH1cbiAgICB9XG5cbn1cblxuZnVuY3Rpb24gbmF2Q2xhc3NlcygpIHtcblx0aWYgKG1vYmlsZU5hdk9ubHkgPT09IGZhbHNlKXtcblx0XHRpZiAodmlld1dpZHRoID49IDEwMjQpe1xuXHRcdFx0YWRkQ2xhc3MoYm9keSwgJ2Rlc2t0b3BNZW51Jyk7XG5cdFx0XHRyZW1vdmVDbGFzcyhib2R5LCAnbW9iaWxlTWVudScpO1xuXHRcdH1cblx0XHRlbHNle1xuXHRcdFx0cmVtb3ZlQ2xhc3MoYm9keSwgJ2Rlc2t0b3BNZW51Jyk7XG5cdFx0XHRhZGRDbGFzcyhib2R5LCdtb2JpbGVNZW51Jyk7XG5cdFx0fVxuXHR9XG59XG5cbi8qQWRkIG1vYmlsZU1lbnUgY2xhc3MgdG8gYm9keSAqL1xuZnVuY3Rpb24gYWRkTWVudU9wZW5DbGFzcygpe1xuICAgIHJlbW92ZUNsYXNzKGJvZHksICdkZXNrdG9wTWVudScpO1xuXHRyZW1vdmVDbGFzcyhib2R5LCAnbW9iaWxlTWVudUNsb3NlZCcpO1xuXHRhZGRDbGFzcyhib2R5LCAnbW9iaWxlTWVudU9wZW4nKTtcbiAgICBtZW51SGVpZ2h0KCk7XG59XG5cbi8qUmVtb3ZlIG1vYmlsZU1lbnUgY2xhc3MgZnJvbSBib2R5ICovXG5mdW5jdGlvbiByZW1vdmVNZW51T3BlbkNsYXNzKCl7XG5cdHJlbW92ZUNsYXNzKGJvZHksICdtb2JpbGVNZW51T3BlbicpO1xuXHRhZGRDbGFzcyhib2R5LCAnbW9iaWxlTWVudUNsb3NlZCcpO1xuICAgIG5hdkNsYXNzZXMoKTtcbiAgICBtZW51SGVpZ2h0KCk7XG59XG5cbi8vc2V0ICdzY3JvbGwnIGNsYXNzIHdoZW4gWHB4IGRpc3RhbmNlIGZyb20gdG9wXG5mdW5jdGlvbiBzY3JvbGxNZW51KGRpc3RhbmNlLCBlbGVtZW50KXtcbiAgICBkaXN0YW5jZSA9IGRpc3RhbmNlIHx8IDI1O1xuXG4gICAgdmFyIHRoaXNTY3JvbGxWYWx1ZSA9IGdldFNjcm9sbFZhbHVlKGVsZW1lbnQpO1xuICAgIGlmICggdGhpc1Njcm9sbFZhbHVlID4gZGlzdGFuY2UpIHtcblx0ICAgIGFkZENsYXNzKGJvZHksICdzY3JvbGxNZW51Jyk7XG5cdH1cblx0ZWxzZXtcbiAgICAgICAgcmVtb3ZlQ2xhc3MoYm9keSwgJ3Njcm9sbE1lbnUnKTtcblx0fVxufVxuXG4vL3NldCBwb3J0cmFpdCAvIGxhbmRzY2FwZSBjbGFzc1xuZnVuY3Rpb24gZ2V0T3JpZW50YXRpb25DbGFzcygpe1xuXHRpZiAodmlld0hlaWdodCA+IHZpZXdXaWR0aCkge1xuXHRcdGFkZENsYXNzKGJvZHksICdwb3J0cmFpdCcpO1xuXHRcdHJlbW92ZUNsYXNzKGJvZHksICdsYW5kc2NhcGUnKTtcblx0XHRyZXR1cm4gXCJwb3J0cmFpdFwiO1xuXHR9XG5cdGVsc2V7XG5cdFx0YWRkQ2xhc3MoYm9keSwgJ2xhbmRzY2FwZScpO1xuXHRcdHJlbW92ZUNsYXNzKGJvZHksICdwb3J0cmFpdCcpO1xuXHRcdHJldHVybiBcImxhbmRzY2FwZVwiO1xuXHR9XG59XG5cbiIsIi8qIGZ1bmN0aW9uIGdldEpzb24odXJsKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihzdWNjZXNzSGFuZGxlciwgZXJyb3JIYW5kbGVyKSB7XG5cdHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblx0eGhyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuXHRcdGlmICh4aHIuc3RhdHVzID49IDIwMCAmJiB4aHIuc3RhdHVzIDwgNDAwKSB7XG5cdFx0XHQvLyBTdWNjZXNzIVxuXHRcdFx0dmFyIGRhdGEgPSBKU09OLnBhcnNlKHhoci5yZXNwb25zZVRleHQpO1xuXHRcdFx0Ly9jb25zb2xlLmxvZyhcImpzb24gZGF0YTogXCIgKyBKU09OLnN0cmluZ2lmeShkYXRhKSApO1xuXHRcdFx0c3VjY2Vzc0hhbmRsZXIoZGF0YSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vIEVycm9yICFcblx0XHRcdGVycm9ySGFuZGxlcih7XG5cdFx0XHQgIHN0YXR1czogdGhpcy5zdGF0dXMsXG5cdFx0XHQgIHN0YXR1c1RleHQ6IHhoci5zdGF0dXNUZXh0XG5cdFx0XHR9KTtcblx0XHR9XG5cdH07XG5cdHhoci5vbmVycm9yID0gZnVuY3Rpb24gKCkge1xuXHRcdGVycm9ySGFuZGxlcih7XG5cdFx0XHRzdGF0dXM6IHRoaXMuc3RhdHVzLFxuXHRcdFx0c3RhdHVzVGV4dDogeGhyLnN0YXR1c1RleHRcblx0XHR9KTtcblx0fTtcblx0eGhyLm9wZW4oJ0dFVCcsIHVybCk7XG5cdHhoci5zZW5kKCk7XG4gIH0pO1xufVxuKi9cblxuLypcblVTQUdFOiAqKndpdGggcGhwIFVSTFxuXG5cdGdldEpzb24oJyA8P3BocCBlY2hvICgkanNvbl91cmwpOyA/PiAnKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuXHRcdC8vIENvZGUgZGVwZW5kaW5nIG9uIHJlc3VsdFxuXG5cdH0pLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcblx0XHRjb25zb2xlLmVycm9yKCdBdWdoLCB0aGVyZSB3YXMgYW4gZXJyb3IhJywgZXJyLnN0YXR1c1RleHQpO1xuXHR9KTtcblxuICovIiwiJ3VzZSBzdHJpY3QnO1xuLypqc2hpbnQgLVcxMTcgKi9cblxuZnVuY3Rpb24gaGFzQ2xhc3MoZWxlLGNscykge1xuXHRyZXR1cm4gZWxlLmNsYXNzTmFtZS5tYXRjaChuZXcgUmVnRXhwKCcoXFxcXHN8XiknK2NscysnKFxcXFxzfGpRdWVyeSknKSk7XG59XG5cbmZ1bmN0aW9uIGFkZENsYXNzKGVsZSxjbHMpIHtcblx0aWYgKCFoYXNDbGFzcyhlbGUsY2xzKSkge2VsZS5jbGFzc05hbWUgKz0gXCIgXCIrY2xzO31cbn1cblxuZnVuY3Rpb24gcmVtb3ZlQ2xhc3MoZWxlLGNscykge1xuXHRpZiAoaGFzQ2xhc3MoZWxlLGNscykpIHtcblx0XHR2YXIgcmVnID0gbmV3IFJlZ0V4cCgnKFxcXFxzfF4pJytjbHMrJyhcXFxcc3xqUXVlcnkpJyk7XG5cdFx0ZWxlLmNsYXNzTmFtZT1lbGUuY2xhc3NOYW1lLnJlcGxhY2UocmVnLCcgJyk7XG5cdH1cbn1cblxuZnVuY3Rpb24gbWF4SCh0YXJnZXQsIHZhbHVlKXtcblx0alF1ZXJ5KHRhcmdldCkuY3NzKCdtYXgtaGVpZ2h0JywgdmFsdWUpO1xufVxuXG5mdW5jdGlvbiBtYXhXKHRhcmdldCwgdmFsdWUpe1xuXHRqUXVlcnkodGFyZ2V0KS5jc3MoJ21heC13aWR0aCcsIHZhbHVlKTtcbn1cblxuZnVuY3Rpb24gbWluSCh0YXJnZXQsIHZhbHVlKXtcblx0alF1ZXJ5KHRhcmdldCkuY3NzKCdtaW4taGVpZ2h0JywgdmFsdWUpO1xufVxuXG5mdW5jdGlvbiBtaW5XKHRhcmdldCwgdmFsdWUpe1xuXHRqUXVlcnkodGFyZ2V0KS5jc3MoJ21pbi13aWR0aCcsIHZhbHVlKTtcbn1cblxuXG5cbmZ1bmN0aW9uIGNsZWFySGVpZ2h0KHRhcmdldCl7XG4gICAgalF1ZXJ5KHRhcmdldCkuY3NzKCdtaW4taGVpZ2h0JywgJ25vbmUnKTtcbiAgICBqUXVlcnkodGFyZ2V0KS5jc3MoJ21heC1oZWlnaHQnLCAnbm9uZScpO1xuICAgIGpRdWVyeSh0YXJnZXQpLmNzcygnaGVpZ2h0JywgJ2F1dG8nKTtcbn1cblxuZnVuY3Rpb24gZ2V0QnJlYWtwb2ludChtb2JpbGVQb3J0cmFpdCwgbW9iaWxlTGFuZHNjYXBlLCB0YWJsZXRMYW5kc2NhcGUpe1xuXG4gICAgaWYoIHZpZXdXaWR0aCA8IG1vYmlsZUxhbmRzY2FwZSApe1xuICAgICAgICByZXR1cm4gXCJzbWFsbFwiO1xuICAgIH1cbiAgICBlbHNlIGlmKCAodmlld1dpZHRoID4gbW9iaWxlTGFuZHNjYXBlKSAmJiAodmlld1dpZHRoIDwgdGFibGV0TGFuZHNjYXBlICkgKXtcbiAgICAgICAgcmV0dXJuIFwibWVkaXVtXCI7XG4gICAgfVxuICAgIGVsc2UgaWYoIHZpZXdXaWR0aCA+PSB0YWJsZXRMYW5kc2NhcGUgKXtcbiAgICAgICAgcmV0dXJuIFwibGFyZ2VcIjtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIG1hdGNoSGVpZ2h0KGVsZSwgdGFyZ2V0SGVpZ2h0KXtcbiAgICB2YXIgZWxlSGVpZ2h0O1xuICAgIGlmICghdGFyZ2V0SGVpZ2h0KXtcblx0XHRlbGVIZWlnaHQgPSB2aWV3SGVpZ2h0O1xuXHR9XG5cdGVsc2Uge1xuXHRcdGVsZUhlaWdodCA9IHRhcmdldEhlaWdodDtcblx0fVxuXHRyZXR1cm4galF1ZXJ5KGVsZSkuaGVpZ2h0KGVsZUhlaWdodCk7XG59XG5cbmZ1bmN0aW9uIHdpZGVyVGhhbihtaW4sIG1heCwgdGFyZ2V0KXtcblxuXHRpZighdGFyZ2V0KXtcblx0XHR0YXJnZXQgPSBqUXVlcnkod2luZG93KTtcblx0fVxuXG5cdGlmIChtYXgpe1xuXG5cdFx0aWYoIChtYXggPiB3aWR0aCh0YXJnZXQpICkgJiYgKCBtaW4gPCB3aWR0aCh0YXJnZXQpICkgKXtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblx0fVxuXHRlbHNlIGlmKCBtaW4gPCB3aWR0aCh0YXJnZXQpICl7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cblx0ZWxzZXtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cbn1cblxuZnVuY3Rpb24gbWF4U2l6ZUJ5QXNwKHRhcmdldCwgbWluQXNwLCBtYXhBc3Ape1xuXHRqUXVlcnkodGFyZ2V0KS5jc3MoJ21heC1oZWlnaHQnLCAnbm9uZScpO1xuXHRqUXVlcnkodGFyZ2V0KS5jc3MoJ21pbi1oZWlnaHQnLCAwKTtcblxuXG5cdHZhciB0YXJnZXRBc3AgPSBqUXVlcnkodGFyZ2V0KS53aWR0aCgpIC8galF1ZXJ5KHRhcmdldCkuaGVpZ2h0KCk7XG5cblx0Ly9pZiBXSURFIC8gU0hPUlQgU0xJREVcblx0aWYgKHRhcmdldEFzcCA+IG1heEFzcCl7XG5cdFx0bWluSCh0YXJnZXQsIHZpZXdXaWR0aCAvIG1heEFzcCk7XG5cdH1cblxuXHQvLyBpZiBUQUxMIC8gU0tJTk5ZIFNMSURFXG5cdGlmICh0YXJnZXRBc3AgPCBtaW5Bc3Ape1xuXHRcdG1heEgodGFyZ2V0LCB2aWV3V2lkdGggLyBtaW5Bc3AgKTtcblx0fVxufVxuXG5mdW5jdGlvbiBtb3ZlT25PcmllbnRhdGlvbih0YXJnZXQsIGRlc3RpbmF0aW9uLCBsYW5kc2NhcGUsIHBvcnRyYWl0KXtcblx0Ly9MQU5EU0NBUEVcblx0aWYodmlld1dpZHRoPnZpZXdIZWlnaHQpe1xuXHRcdGlmKGxhbmRzY2FwZSA9PSBcInByZXBlbmRcIil7XG5cdFx0XHRqUXVlcnkodGFyZ2V0KS5wcmVwZW5kVG8oZGVzdGluYXRpb24pO1xuXHRcdH1cblx0XHRpZihsYW5kc2NhcGUgPT0gXCJhcHBlbmRcIil7XG5cdFx0XHRqUXVlcnkodGFyZ2V0KS5hcHBlbmRUbyhkZXN0aW5hdGlvbik7XG5cdFx0fVxuXHRcdGlmKGxhbmRzY2FwZSA9PSBcImFmdGVyXCIpe1xuXHRcdFx0alF1ZXJ5KHRhcmdldCkuaW5zZXJ0QWZ0ZXIoZGVzdGluYXRpb24pO1xuXHRcdH1cblx0XHRpZihsYW5kc2NhcGUgPT0gXCJiZWZvcmVcIil7XG5cdFx0XHRqUXVlcnkodGFyZ2V0KS5pbnNlcnRCZWZvcmUoZGVzdGluYXRpb24pO1xuXHRcdH1cblx0fVxuXHQvL1BPUlRSQUlUXG5cdGVsc2V7XG5cdFx0aWYocG9ydHJhaXQgPT0gXCJwcmVwZW5kXCIpIHtcblx0XHRcdGpRdWVyeSh0YXJnZXQpLnByZXBlbmRUbyhkZXN0aW5hdGlvbik7XG5cdFx0fVxuXHRcdGlmKHBvcnRyYWl0ID09IFwiYXBwZW5kXCIpe1xuXHRcdFx0alF1ZXJ5KHRhcmdldCkuYXBwZW5kVG8oZGVzdGluYXRpb24pO1xuXHRcdH1cblx0XHRpZihwb3J0cmFpdCA9PSBcImFmdGVyXCIpe1xuXHRcdFx0alF1ZXJ5KHRhcmdldCkuaW5zZXJ0QWZ0ZXIoZGVzdGluYXRpb24pO1xuXHRcdH1cblx0XHRpZihwb3J0cmFpdCA9PSBcImJlZm9yZVwiKXtcblx0XHRcdGpRdWVyeSh0YXJnZXQpLmluc2VydEJlZm9yZShkZXN0aW5hdGlvbik7XG5cdFx0fVxuXHR9XG59XG5cblxuZnVuY3Rpb24gYXNwTGFiZWwod2lkdGgsIGhlaWdodCl7XG5cblx0XHRpZiAoIHdpZHRoIC8gaGVpZ2h0ID4gMS43NSApe1xuXHRcdFx0cmV0dXJuIFwibGFuZHNjYXBlIHNob3J0V2lkZVwiO1xuXHRcdH1cblxuXHRcdGVsc2UgaWYgKCB3aWR0aCA+IGhlaWdodCApe1xuXHRcdFx0cmV0dXJuIFwibGFuZHNjYXBlXCI7XG5cdFx0fVxuXG5cdFx0ZWxzZSBpZiAoIHdpZHRoIC8gaGVpZ2h0IDwgMC43NSApe1xuXHRcdFx0cmV0dXJuIFwicG9ydHJhaXQgdGFsbFNraW5ueVwiO1xuXHRcdH1cblxuXHRcdGVsc2UgaWYgKCB3aWR0aCA8IGhlaWdodCApe1xuXHRcdFx0cmV0dXJuIFwicG9ydHJhaXRcIjtcblx0XHR9XG5cblx0XHRlbHNle1xuXHRcdFx0cmV0dXJuIFwic3F1YXJlXCI7XG5cdFx0fVxufVxuXG5mdW5jdGlvbiBsYXp5TG9hZFJlc291cmNlKGZpbGUsIHR5cGUpe1xuXHR2YXIgY2IgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgbGluaztcbiAgICBpZiAodHlwZSA9PT0gXCJjc3NcIil7XG5cdFx0bGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpbmsnKTsgbGluay5yZWwgPSAnc3R5bGVzaGVldCc7XG5cdH1cblx0ZWxzZSBpZiAodHlwZSA9PT0gXCJqc1wiKXtcblx0XHRsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7IGxpbmsudHlwZSA9ICd0ZXh0L2phdmFzY3JpcHQnO1xuXHR9XG5cblx0bGluay5ocmVmID0gZmlsZTtcblx0dmFyIGggPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdOyBoLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGwsIGgpO1xuXHR9O1xuXHR2YXIgcmFmID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8IG1velJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuXHR3ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHwgbXNSZXF1ZXN0QW5pbWF0aW9uRnJhbWU7XG5cdGlmIChyYWYpIHJhZihjYik7XG5cdGVsc2Ugd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBjYik7XG59XG5cbmZ1bmN0aW9uIGRvUmVjdXJzaXZlbHkodGhpc0ZuLCBpbnRlcnZhbCwgdGltZW91dCkge1xuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcblx0ICAgIGludGVydmFsID0gaW50ZXJ2YWwgfHwgIDMwMDA7XG5cdCAgICB0aW1lb3V0ID0gIHRpbWVvdXQgIHx8IDMwMDAwO1xuXHQgICAgdmFyIHN0YXJ0VGltZSA9IChuZXcgRGF0ZSgpKS5nZXRUaW1lKCk7XG5cblxuXHQgICAgKGZ1bmN0aW9uIHJpbmNlUmVwZWF0KCkge1xuXHQgICAgICAgIHZhciB0aGlzRm5SZXN1bHQgPSB0aGlzRm4oKTtcblxuXHQgICAgICAgIGlmICggKERhdGUubm93KCkgLSBzdGFydFRpbWUgKSA8PSB0aW1lb3V0ICkgIHtcblx0ICAgICAgICAgICAgc2V0VGltZW91dChyaW5jZVJlcGVhdCwgaW50ZXJ2YWwsIHRoaXNGblJlc3VsdCk7XG5cdCAgICAgICAgfVxuXHQgICAgfSkoKTtcblxuICAgIH0sIGludGVydmFsICogMC43NSk7XG59XG5cbmZ1bmN0aW9uIGFwcGx5SXNvKCl7XG4gICAgdmFyIHByb2plY3RzSXNvID0galF1ZXJ5KCcuaXNvLWdyaWQnKS5pc290b3BlKHtcbiAgICAgICAgaXRlbVNlbGVjdG9yOiAnLmlzby1ncmlkLWl0ZW0nLFxuICAgICAgICByZXNpemFibGU6IHRydWUsIC8vIGRpc2FibGUgbm9ybWFsIHJlc2l6aW5nXG4gICAgICAgIHBlcmNlbnRQb3NpdGlvbjogdHJ1ZSxcblxuICAgICAgICBhbmltYXRpb25FbmdpbmU6ICdiZXN0LWF2YWlsYWJsZScsXG4gICAgICAgIGFuaW1hdGlvbk9wdGlvbnM6IHtcbiAgICAgICAgICAgIGR1cmF0aW9uOiAzMDAwLFxuICAgICAgICAgICAgZWFzaW5nOiAnbGluZWFyJyxcbiAgICAgICAgICAgIHF1ZXVlOiBmYWxzZVxuICAgICAgICB9LFxuICAgICAgICBsYXlvdXRNb2RlOiAnZml0Um93cycsXG4gICAgICAgIG1hc29ucnk6e1xuICAgICAgICAgICAgY29sdW1uV2lkdGg6ICAgICdpc28tZ3JpZC1pdGVtJyxcbiAgICAgICAgICAgIGlzQW5pbWF0ZWQ6ICAgICB0cnVlXG4gICAgICAgICAgICAvL2lzRml0V2lkdGg6ICAgICB0cnVlXG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuLypcbmZ1bmN0aW9uIGJ1dHRvbU9mZnNldChlbGVtZW50LCBpbmNsdWRlTWFyZ2luKXtcbiAgICB2YXIgdGhpc09mZnNldFRvcCA9IGpRdWVyeShlbGVtZW50KS5vZmZzZXQoKS50b3A7XG4gICAgdmFyIHRoaXNIZWlnaHQgPSBqUXVlcnkoZWxlbWVudCkub3V0ZXJIZWlnaHQoaW5jbHVkZU1hcmdpbik7XG4gICAgdmFyIHRoaXNPZmZzZXRCb3R0b20gPSB0aGlzT2Zmc2V0VG9wICsgdGhpc0hlaWdodDtcbiAgICByZXR1cm4gdGhpc09mZnNldEJvdHRvbTtcbn0qL1xuXG5mdW5jdGlvbiByaWdodE9mZnNldChlbGVtZW50LCBpbmNsdWRlTWFyZ2luKXtcbiAgICB2YXIgdGhpc09mZnNldExlZnQgPSBqUXVlcnkoZWxlbWVudCkub2Zmc2V0KCkubGVmdDtcbiAgICB2YXIgdGhpc1dpZHRoID0galF1ZXJ5KGVsZW1lbnQpLm91dGVyV2lkdGgoaW5jbHVkZU1hcmdpbik7XG4gICAgdmFyIHRoaXNPZmZzZXRSaWdodCA9IHRoaXNPZmZzZXRMZWZ0ICsgdGhpc1dpZHRoO1xuICAgIHJldHVybiB0aGlzT2Zmc2V0UmlnaHQ7XG59XG5cblxuIiwiJ3VzZSBzdHJpY3QnO1xuLypqc2hpbnQgLVcxMTcgKi9cblxuLy9Db21iaW5lIDIgYXJyYXlzXG4vL1JldHVybnMgYSBub24tZGVzdHJ1Y3RpdmUgcmVzdWx0IGNvbnRhaW5pbmcgYm90aCBhcnJheXNcbmZ1bmN0aW9uIGpvaW5BcnJheXMoZmlyc3RBcnJheSwgc2Vjb25kQXJyYXkpe1xuICAgIHZhciBtZXJnZWRBcnJheSA9IGZpcnN0QXJyYXkuY29uY2F0KHNlY29uZEFycmF5KTtcbiAgICByZXR1cm4gbWVyZ2VkQXJyYXk7XG59XG5cbi8vRmluZCB0aGUgbnVtYmVyIG9mIGVsZW1lbnRzIGluIHRoaXMgYXJyYXlcbmZ1bmN0aW9uIGdldEFycmF5TGVuZ3RoKHRoaXNBcnJheSl7XG4gICAgcmV0dXJuIHRoaXNBcnJheS5sZW5ndGg7XG59XG5cblxuLy9GaW5kIHRoZSBpbmRleCBwb3NpdGlvbiBvZiBhbiBpdGVtIGluIGFuIGFycmF5XG5mdW5jdGlvbiBnZXRBcnJheVBvc2l0aW9uKHRoaXNBcnJheSwgdGhpc0l0ZW0pe1xuICAgIHJldHVybiB0aGlzQXJyYXkuaW5kZXhPZih0aGlzSXRlbSk7XG59XG5cblxuLy9Qb3AsIFB1c2gsIFNoaWZ0LCBhbmQgVW5zaGlmdFxuZnVuY3Rpb24gcmVtb3ZlRnJvbUFycmF5KHRoaXNBcnJheSwgdGhpc1Bvc2l0aW9uKXtcbiAgICBzd2l0Y2ggKHRoaXNQb3NpdGlvbikge1xuICAgICAgICBjYXNlIFwibGFzdFwiOlxuICAgICAgICAgICAgLy9yZW1vdmUgZnJvbSBlbmQgb2YgYXJyYXlcbiAgICAgICAgICAgIHJldHVybiB0aGlzQXJyYXkucG9wO1xuICAgICAgICBjYXNlIFwiZmlyc3RcIjpcbiAgICAgICAgICAgIC8vcmVtb3ZlIGZyb20gc3RhcnQgb2YgYXJyYXlcbiAgICAgICAgICAgIHJldHVybiB0aGlzQXJyYXkuc2hpZnQ7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAvL3JlbW92ZSBzcGVjaWZpYyBpbmRleFxuICAgICAgICAgICAgcmV0dXJuIGRlbGV0ZSBhcnJheVt0aGlzUG9zaXRpb25dO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gYWRkVG9BcnJheSggdGhpc0FycmF5LCB0aGlzUG9zaXRpb24sIHRoaXNWYWx1ZSApe1xuICAgIHN3aXRjaCAodGhpc1Bvc2l0aW9uKSB7XG4gICAgICAgIGNhc2UgXCJsYXN0XCI6XG4gICAgICAgICAgICAvL2FkZCB0byBlbmQgb2YgYXJyYXlcbiAgICAgICAgICAgIHJldHVybiB0aGlzQXJyYXkucHVzaCh0aGlzVmFsdWUpO1xuICAgICAgICBjYXNlIFwiZmlyc3RcIjpcbiAgICAgICAgICAgIC8vYWRkIHRvIHN0YXJ0IG9mIGFycmF5XG4gICAgICAgICAgICByZXR1cm4gdGhpc0FycmF5LnVuc2hpZnQodGhpc1Bvc2l0aW9uKTtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIC8vYWRkIHZhbHVlIHRvIGluZGV4IHBvc2l0aW9uXG4gICAgICAgICAgICB0aGlzQXJyYXlbdGhpc1Bvc2l0aW9uXSA9IHRoaXNWYWx1ZTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzQXJyYXk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBjb252ZXJ0QXJyYXlUb1N0cmluZyh0aGlzQXJyYXksIHNlcGFyYXRvcil7XG4gICAgcmV0dXJuIHRoaXNBcnJheS5qb2luKHNlcGFyYXRvcik7XG59IiwiLy9ib3goKSBpcyBhIGNvbnZlbmllbnQgcmVmZXJlbmNlIGZ1bmN0aW9uIGZvciBnZXR0aW5nIGludCB2YWx1ZXMgZm9yIGJveE1vZGVsIHByb3BlcnRpZXNcbmZ1bmN0aW9uIGJveChlbGVtZW50KXtcbiAgICB2YXIgdGhpc0hlaWdodCAgICAgID0gZ2V0SGVpZ2h0KGVsZW1lbnQpO1xuICAgIC8vY29uc29sZS5sb2coXCJib3goKSAtIHRoaXNIZWlnaHQ6IFwiICsgdGhpc0hlaWdodCk7XG4gICAgdmFyIHRoaXNXaWR0aCAgICAgICA9IGdldFdpZHRoKGVsZW1lbnQpO1xuICAgIHZhciB0aGlzTWFyZ2luICAgICAgPSBnZXRNYXJnaW4oZWxlbWVudCk7XG4gICAgdmFyIHRoaXNQYWRkaW5nICAgICA9IGdldFBhZGRpbmcoZWxlbWVudCk7XG4gICAgdmFyIHRoaXNQb3NpdGlvbiAgICA9IGdldFBvc2l0aW9uKGVsZW1lbnQpO1xuICAgIHZhciB0aGlzT3V0ZXJIZWlnaHQgPSBnZXRPdXRlckhlaWdodChlbGVtZW50LCAyMDAsIHRoaXNNYXJnaW4sIHRoaXNQYWRkaW5nKTtcbiAgICB2YXIgdGhpc091dGVyV2lkdGggID0gZ2V0T3V0ZXJXaWR0aChlbGVtZW50LCB0aGlzV2lkdGgsIHRoaXNNYXJnaW4sIHRoaXNQYWRkaW5nKTtcbiAgICB2YXIgdGhpc09mZnNldCAgICAgID0gZ2V0T2Zmc2V0KGVsZW1lbnQsIDMwMCwgdGhpc091dGVyV2lkdGgpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgaGVpZ2h0OiB0aGlzSGVpZ2h0LFxuICAgICAgICB3aWR0aDogdGhpc1dpZHRoLFxuICAgICAgICBtYXJnaW46IHtcbiAgICAgICAgICAgICd0b3AnICAgOiB0aGlzTWFyZ2luLnRvcCxcbiAgICAgICAgICAgICdyaWdodCcgOiB0aGlzTWFyZ2luLnJpZ2h0LFxuICAgICAgICAgICAgJ2JvdHRvbSc6IHRoaXNNYXJnaW4uYm90dG9tLFxuICAgICAgICAgICAgJ2xlZnQnICA6IHRoaXNNYXJnaW4ubGVmdFxuICAgICAgICB9LFxuICAgICAgICBwYWRkaW5nOiB7XG4gICAgICAgICAgICAndG9wJyAgIDogdGhpc1BhZGRpbmcudG9wLFxuICAgICAgICAgICAgJ3JpZ2h0JyA6IHRoaXNQYWRkaW5nLnJpZ2h0LFxuICAgICAgICAgICAgJ2JvdHRvbSc6IHRoaXNQYWRkaW5nLmJvdHRvbSxcbiAgICAgICAgICAgICdsZWZ0JyAgOiB0aGlzUGFkZGluZy5sZWZ0XG4gICAgICAgIH0sXG4gICAgICAgIHBvc2l0aW9uOiB0aGlzUG9zaXRpb24sXG4gICAgICAgIG9mZnNldDp7XG4gICAgICAgICAgICAndG9wJyAgIDogdGhpc09mZnNldC50b3AsXG4gICAgICAgICAgICAncmlnaHQnIDogdGhpc09mZnNldC5yaWdodCxcbiAgICAgICAgICAgICdib3R0b20nOiB0aGlzT2Zmc2V0LmJvdHRvbSxcbiAgICAgICAgICAgICdsZWZ0JyAgOiB0aGlzT2Zmc2V0LmxlZnRcbiAgICAgICAgfSxcbiAgICAgICAgb3V0ZXJIZWlnaHQ6IHRoaXNPdXRlckhlaWdodCxcbiAgICAgICAgb3V0ZXJXaWR0aDogdGhpc091dGVyV2lkdGhcbiAgICB9O1xufVxuXG5mdW5jdGlvbiBoZWlnaHQoZWxlbWVudCwgaGVpZ2h0KXtcbiAgICBpZiAoaGVpZ2h0KXtcbiAgICAgICAgc2V0SGVpZ2h0KGVsZW1lbnQsIGhlaWdodCk7XG4gICAgfVxuICAgIGVsc2V7XG4gICAgICAgIGdldEhlaWdodChlbGVtZW50KVxuICAgIH1cbn1cblxuICAgIC8vZ2V0IHRoZSBjb21wdXRlZCBzdHlsZSBoZWlnaHRcbiAgICBmdW5jdGlvbiBnZXRIZWlnaHQoZWxlbWVudCl7XG4gICAgICAgIHZhciB0aGlzSGVpZ2h0ID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWxlbWVudCkuZ2V0UHJvcGVydHlWYWx1ZShcImhlaWdodFwiKTtcbiAgICAgICAgcmV0dXJuIHRvSW50KHRoaXNIZWlnaHQpO1xuICAgIH1cblxuICAgIC8vc2V0IGhlaWdodCBhcyBzdHJpbmcgcHggdmFsdWUsXG4gICAgZnVuY3Rpb24gc2V0SGVpZ2h0KGVsZW1lbnQsIGhlaWdodCl7XG4gICAgICAgIHZhciB0aGlzSGVpZ2h0ID0gdG9QaXgoaGVpZ2h0KTtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcInNldEhlaWdodCAtIFwiICsgZWxlbWVudC5pZCArIFwiIC0gXCIgKyBoZWlnaHQpO1xuICAgICAgICBlbGVtZW50LnN0eWxlLmhlaWdodCA9IHRoaXNIZWlnaHQ7XG4gICAgfVxuXG4vL3NldCB3aWR0aCB0byB0aGlzV2lkdGggYXMgc3RyaW5nIHB4IHZhbHVlLCBvciBnZXQgdGhlIGNvbXB1dGVkIHN0eWxlIHdpZHRoXG5mdW5jdGlvbiB3aWR0aChlbGVtZW50LCB3aWR0aCl7XG4gICAgaWYgKHdpZHRoKXtcbiAgICAgICAgc2V0V2lkdGgoZWxlbWVudCwgd2lkdGgpO1xuICAgIH1cbiAgICBlbHNle1xuICAgICAgICBnZXRXaWR0aChlbGVtZW50KTtcbiAgICB9XG59XG5cbiAgICAvL2dldCB0aGUgY29tcHV0ZWQgc3R5bGUgd2lkdGhcbiAgICBmdW5jdGlvbiBnZXRXaWR0aChlbGVtZW50KXtcbiAgICAgICAgdmFyIHRoaXNXaWR0aCA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpLmdldFByb3BlcnR5VmFsdWUoXCJ3aWR0aFwiKTtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcImdldFdpZHRoIC0gXCIgKyBlbGVtZW50LmlkKTtcbiAgICAgICAgcmV0dXJuIHRvSW50KHRoaXNXaWR0aCk7XG4gICAgfVxuXG4gICAgLy9zZXQgd2lkdGggYXMgc3RyaW5nIHB4IHZhbHVlLFxuICAgIGZ1bmN0aW9uIHNldFdpZHRoKGVsZW1lbnQsIHdpZHRoKXtcbiAgICAgICAgdmFyIHRoaXNXaWR0aCA9IHRvUGl4KHdpZHRoKTtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcInNldFdpZHRoIC0gXCIgKyBlbGVtZW50LmlkICsgXCIgLSBcIiArIHRoaXNXaWR0aCk7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUud2lkdGggPSB0aGlzV2lkdGg7XG4gICAgfVxuXG5cbi8vTUlOIEhFSUdIVFxuZnVuY3Rpb24gbWluSGVpZ2h0KGVsZW1lbnQsIG1pbkhlaWdodCl7XG4gICAgaWYgKG1pbkhlaWdodCl7XG4gICAgICAgIHNldE1pbkhlaWdodChlbGVtZW50LCBtaW5IZWlnaHQpO1xuICAgIH1cbiAgICBlbHNle1xuICAgICAgICBnZXRNaW5IZWlnaHQoZWxlbWVudClcbiAgICB9XG59XG4gICAgLy9nZXQgdGhlIGNvbXB1dGVkIHN0eWxlIG9mIG1pbi1oZWlnaHRcbiAgICBmdW5jdGlvbiBnZXRNaW5IZWlnaHQoZWxlbWVudCl7XG4gICAgICAgIHZhciB0aGlzTWluSGVpZ2h0ID0gZ2V0U3R5bGUoZWxlbWVudCwgXCJtaW5IZWlnaHRcIik7XG4gICAgICAgIHJldHVybiB0b0ludCh0aGlzTWluSGVpZ2h0KTtcbiAgICB9XG5cbiAgICAvL3NldCBtaW5IZWlnaHQgYXMgcHggdmFsdWUsXG4gICAgZnVuY3Rpb24gc2V0TWluSGVpZ2h0KGVsZW1lbnQsIG1pbkhlaWdodCl7XG4gICAgICAgIHZhciB0aGlzTWluSGVpZ2h0ID0gdG9QaXgobWluSGVpZ2h0KTtcbiAgICAgICAgc2V0U3R5bGUoZWxlbWVudCwge1wibWluSGVpZ2h0XCIgIDogdGhpc01pbkhlaWdodH0pO1xuICAgIH1cblxuICAgIC8vc2V0IHdpZHRoIGFzIHB4IHZhbHVlLCBvciBnZXQgdGhlIGNvbXB1dGVkIHN0eWxlIHdpZHRoXG4gICAgZnVuY3Rpb24gbWluV2lkdGgoZWxlbWVudCwgbWluV2lkdGgpe1xuICAgICAgICBpZiAobWluV2lkdGgpe1xuICAgICAgICAgICAgc2V0TWluV2lkdGgoZWxlbWVudCwgbWluV2lkdGgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBnZXRNaW5XaWR0aChlbGVtZW50KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAgICAgLy9nZXQgbWluLXdpZHRoIGZyb20gdGhlIGNvbXB1dGVkIHN0eWxlXG4gICAgICAgIGZ1bmN0aW9uIGdldE1pbldpZHRoKGVsZW1lbnQpe1xuICAgICAgICAgICAgdmFyIHRoaXNNaW5XaWR0aCA9IGdldFN0eWxlKGVsZW1lbnQsIFwibWluV2lkdGhcIik7XG4gICAgICAgICAgICByZXR1cm4gdG9JbnQodGhpc01pbldpZHRoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vc2V0IG1pbi13aWR0aCBhcyBzdHJpbmcgcHggdmFsdWUsXG4gICAgICAgIGZ1bmN0aW9uIHNldE1pbldpZHRoKGVsZW1lbnQsIG1pbldpZHRoKXtcbiAgICAgICAgICAgIHZhciB0aGlzTWluV2lkdGggPSB0b1BpeCh0aGlzTWluV2lkdGgpO1xuICAgICAgICAgICAgcmV0dXJuIHNldFN0eWxlKGVsZW1lbnQsIHtcIm1pbldpZHRoXCIgIDogdGhpc01pbldpZHRofSk7XG4gICAgICAgIH1cblxuZnVuY3Rpb24gZ2V0TWFyZ2luKGVsZW1lbnQpe1xuICAgIHZhciB0aGlzTWFyZ2luVG9wID0gICAgIHRvSW50KCBnZXRTdHlsZShlbGVtZW50LCBcIm1hcmdpblRvcFwiKSApO1xuICAgIHZhciB0aGlzTWFyZ2luUmlnaHQgPSAgIHRvSW50KCBnZXRTdHlsZShlbGVtZW50LCBcIm1hcmdpblJpZ2h0XCIpICk7XG4gICAgdmFyIHRoaXNNYXJnaW5Cb3R0b20gPSAgdG9JbnQoIGdldFN0eWxlKGVsZW1lbnQsIFwibWFyZ2luQm90dG9tXCIpICk7XG4gICAgdmFyIHRoaXNNYXJnaW5MZWZ0ID0gICAgdG9JbnQoIGdldFN0eWxlKGVsZW1lbnQsIFwibWFyZ2luTGVmdFwiKSApO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgdG9wOiB0aGlzTWFyZ2luVG9wLFxuICAgICAgICByaWdodDogdGhpc01hcmdpblJpZ2h0LFxuICAgICAgICBib3R0b206IHRoaXNNYXJnaW5Cb3R0b20sXG4gICAgICAgIGxlZnQ6IHRoaXNNYXJnaW5MZWZ0XG4gICAgfTtcbn1cblxuZnVuY3Rpb24gZ2V0UGFkZGluZyhlbGVtZW50KXtcbiAgICB2YXIgdGhpc1BhZGRpbmdUb3AgPSAgICB0b0ludCggZ2V0U3R5bGUoZWxlbWVudCwgXCJwYWRkaW5nVG9wXCIpICk7XG4gICAgdmFyIHRoaXNQYWRkaW5nUmlnaHQgPSAgdG9JbnQoIGdldFN0eWxlKGVsZW1lbnQsIFwicGFkZGluZ1JpZ2h0XCIpICk7XG4gICAgdmFyIHRoaXNQYWRkaW5nQm90dG9tID0gdG9JbnQoIGdldFN0eWxlKGVsZW1lbnQsIFwicGFkZGluZ0JvdHRvbVwiKSApO1xuICAgIHZhciB0aGlzUGFkZGluZ0xlZnQgPSAgIHRvSW50KCBnZXRTdHlsZShlbGVtZW50LCBcInBhZGRpbmdMZWZ0XCIpICk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICB0b3A6IHRoaXNQYWRkaW5nVG9wLFxuICAgICAgICByaWdodDogdGhpc1BhZGRpbmdSaWdodCxcbiAgICAgICAgYm90dG9tOiB0aGlzUGFkZGluZ0JvdHRvbSxcbiAgICAgICAgbGVmdDogdGhpc1BhZGRpbmdMZWZ0XG4gICAgfTtcbn1cblxuZnVuY3Rpb24gZ2V0UG9zaXRpb24oZWxlbWVudCkge1xuICAgIHZhciB0aGlzUG9zaXRpb24gPSBnZXRTdHlsZShlbGVtZW50LCBcInBvc2l0aW9uXCIpO1xuICAgIC8vY29uc29sZS5sb2coXCJnZXRQb3NpdGlvbigpIGZvciBcIiArIGVsZW1lbnQuaWQgKyBcIiA6IFwiICsgdGhpc1Bvc2l0aW9uKTtcbiAgICByZXR1cm4gdGhpc1Bvc2l0aW9uO1xufVxuXG5mdW5jdGlvbiBnZXRPZmZzZXQoZWxlbWVudCwgb3V0ZXJIZWlnaHQsIG91dGVyV2lkdGgpe1xuICAgIC8vY29uc29sZS5sb2coXCJnZXRPZmZzZXQoKSAtIG91dGVySGVpZ2h0OiBcIiArIG91dGVySGVpZ2h0ICk7XG4gICAgb3V0ZXJIZWlnaHQgPyBvdXRlckhlaWdodCA6IG91dGVySGVpZ2h0ID0gZ2V0T3V0ZXJIZWlnaHQoZWxlbWVudCk7XG4gICAgb3V0ZXJXaWR0aCAgPyBvdXRlcldpZHRoICA6IG91dGVyV2lkdGggID0gZ2V0T3V0ZXJXaWR0aChlbGVtZW50KTtcbiAgICB2YXIgdGhpc1RvcCA9IGdldE9mZnNldFRvcChlbGVtZW50KTtcbiAgICB2YXIgdGhpc1JpZ2h0ID0gZ2V0T2Zmc2V0UmlnaHQoZWxlbWVudCwgb3V0ZXJXaWR0aCk7XG4gICAgdmFyIHRoaXNCb3R0b20gPSBnZXRPZmZzZXRCb3R0b20oZWxlbWVudCwgb3V0ZXJIZWlnaHQpO1xuICAgIHZhciB0aGlzTGVmdCA9IGdldE9mZnNldExlZnQoZWxlbWVudCk7XG5cbiAgICB2YXIgdGhlc2VPZmZzZXRzID0ge1xuICAgICAgICB0b3A6IHRoaXNUb3AsXG4gICAgICAgIHJpZ2h0OiB0aGlzUmlnaHQsXG4gICAgICAgIGJvdHRvbTogdGhpc0JvdHRvbSxcbiAgICAgICAgbGVmdDogdGhpc0xlZnRcbiAgICB9XG4gICAgLy9jb25zb2xlLmxvZyhcImdldE9mZnNldCgpIDogXCIgKyB0aGVzZU9mZnNldHMpO1xuICAgIHJldHVybiB0aGVzZU9mZnNldHM7XG59XG5cbmZ1bmN0aW9uIGdldE9mZnNldFRvcChlbGVtZW50KXtcbiAgICB2YXIgdGhpc1RvcCA9IDA7XG4gICAgd2hpbGUoZWxlbWVudCl7XG4gICAgICAgIHRoaXNUb3AgKz0gKGVsZW1lbnQub2Zmc2V0TGVmdCAtIGVsZW1lbnQuc2Nyb2xsTGVmdCArIGVsZW1lbnQuY2xpZW50TGVmdCk7XG4gICAgICAgIGVsZW1lbnQgPSBlbGVtZW50Lm9mZnNldFBhcmVudDtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpc1RvcDtcbn1cblxuZnVuY3Rpb24gZ2V0T2Zmc2V0Qm90dG9tKGVsZW1lbnQsIG91dGVySGVpZ2h0KXtcbiAgICBvdXRlckhlaWdodCA/IG91dGVySGVpZ2h0ID0gb3V0ZXJIZWlnaHQgOiBvdXRlckhlaWdodCA9IGdldE91dGVySGVpZ2h0KGVsZW1lbnQpO1xuICAgIHZhciB0aGlzRWxlbWVudFRvcCA9IGdldE9mZnNldFRvcChlbGVtZW50KTtcbiAgICB2YXIgdGhpc09mZnNldEJvdHRvbSA9IHRoaXNFbGVtZW50VG9wICsgb3V0ZXJIZWlnaHQ7XG5cbiAgICByZXR1cm4gdGhpc09mZnNldEJvdHRvbTtcbn1cblxuZnVuY3Rpb24gZ2V0T2Zmc2V0TGVmdChlbGVtZW50KXtcbiAgICB2YXIgdGhpc0xlZnQgPSAwO1xuICAgIHdoaWxlKGVsZW1lbnQpIHtcbiAgICAgICAgdGhpc0xlZnQgKz0gKGVsZW1lbnQub2Zmc2V0VG9wIC0gZWxlbWVudC5zY3JvbGxUb3AgKyBlbGVtZW50LmNsaWVudFRvcCk7XG4gICAgICAgIGVsZW1lbnQgPSBlbGVtZW50Lm9mZnNldFBhcmVudDtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpc0xlZnQ7XG59XG5cbmZ1bmN0aW9uIGdldE9mZnNldFJpZ2h0KGVsZW1lbnQsIG91dGVyV2lkdGgpe1xuICAgIG91dGVyV2lkdGggPyBvdXRlcldpZHRoIDogb3V0ZXJXaWR0aCA9IGdldE91dGVyV2lkdGgoZWxlbWVudCk7XG4gICAgdmFyIHRoaXNPZmZzZXRMZWZ0ID0gZ2V0T2Zmc2V0TGVmdChlbGVtZW50KTtcbiAgICB2YXIgdGhpc09mZnNldEJvdHRvbSA9IHRoaXNPZmZzZXRMZWZ0ICsgb3V0ZXJXaWR0aDtcblxuICAgIHJldHVybiB0aGlzT2Zmc2V0Qm90dG9tO1xufVxuXG5cbi8vb3V0ZXJIZWlnaHQgKyBvdXRlcldpZHRoIGNhbGN1bGF0aW9uc1xuZnVuY3Rpb24gZ2V0T3V0ZXJIZWlnaHQoZWxlbWVudCwgaGVpZ2h0LCBtYXJnaW4sIHBhZGRpbmcpe1xuLypcbiAgICBjb25zb2xlLmxvZyhcImdldE91dGVySGVpZ2h0KCkgJCQkJCQkJCQkJCQkXCIpO1xuICAgIGNvbnNvbGUubG9nKFwiZWxlbWVudDogXCIgKyBlbGVtZW50LmlkKTtcbiAgICBjb25zb2xlLmxvZyhcImhlaWdodDogXCIgKyBoZWlnaHQpO1xuICAgIHZhciBjYWxsZXJOYW1lO1xuICAgIHRyeSB7IHRocm93IG5ldyBFcnJvcigpOyB9XG4gICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgdmFyIHJlID0gLyhcXHcrKUB8YXQgKFxcdyspIFxcKC9nLCBzdCA9IGUuc3RhY2ssIG07XG4gICAgICAgIHJlLmV4ZWMoc3QpLCBtID0gcmUuZXhlYyhzdCk7XG4gICAgICAgIGNhbGxlck5hbWUgPSBtWzFdIHx8IG1bMl07XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKFwiZ2V0T3V0ZXJIZWlnaHQoKSBjYWxsZWQgb24gXCIgKyBlbGVtZW50LmlkICsgXCIgYnk6IFwiICsgY2FsbGVyTmFtZSk7XG4gICAgKi9cbiAgICBoZWlnaHQgPyBoZWlnaHQgOiBoZWlnaHQgPSBnZXRIZWlnaHQoZWxlbWVudCk7XG4gICAgbWFyZ2luID8gbWFyZ2luID0gbWFyZ2luIDogbWFyZ2luID0gZ2V0TWFyZ2luKGVsZW1lbnQpO1xuICAgIHBhZGRpbmcgPyBwYWRkaW5nID0gcGFkZGluZyA6IHBhZGRpbmcgPSBnZXRQYWRkaW5nKGVsZW1lbnQpO1xuXG4gICAgLy9nZXQvYWRkIHZlcnRpY2FsIG1hcmdpbiBhbmQgcGFkZGluZyB2YWx1ZXMgdG8gaGVpZ2h0XG4gICAgdmFyIHRoaXNWZXJ0TWFyZ2luID0gbWFyZ2luLnRvcCArIG1hcmdpbi5ib3R0b207XG4gICAgdmFyIHRoaXNWZXJ0UGFkZGluZyA9IHBhZGRpbmcudG9wICsgcGFkZGluZy5ib3R0b207XG4gICAgdmFyIHRoaXNPdXRlckhlaWdodCA9IGhlaWdodCArIHRoaXNWZXJ0TWFyZ2luICsgdGhpc1ZlcnRQYWRkaW5nO1xuXG4gICAgcmV0dXJuIHRoaXNPdXRlckhlaWdodDtcbn1cblxuZnVuY3Rpb24gZ2V0T3V0ZXJXaWR0aChlbGVtZW50LCB3aWR0aCwgbWFyZ2luLCBwYWRkaW5nKXtcbiAgICB3aWR0aCA/IHdpZHRoIDogd2lkdGggPSBnZXRXaWR0aChlbGVtZW50KTtcbiAgICBtYXJnaW4gPyBtYXJnaW4gPSBtYXJnaW4gOiBtYXJnaW4gPSBnZXRNYXJnaW4oZWxlbWVudCk7XG4gICAgcGFkZGluZyA/IHBhZGRpbmcgPSBwYWRkaW5nIDogcGFkZGluZyA9IGdldFBhZGRpbmcoZWxlbWVudCk7XG5cbiAgICAvL2dldC9hZGQgaG9yaXpvbnRhbCBtYXJnaW4gYW5kIHBhZGRpbmcgdmFsdWVzIHRvIHdpZHRoXG4gICAgdmFyIHRoaXNIb3J6TWFyZ2luID0gbWFyZ2luLmxlZnQgKyBtYXJnaW4ucmlnaHQ7XG4gICAgdmFyIHRoaXNIb3J6UGFkZGluZyA9IHBhZGRpbmcubGVmdCArIHBhZGRpbmcucmlnaHQ7XG4gICAgdmFyIHRoaXNPdXRlcldpZHRoID0gd2lkdGggKyB0aGlzSG9yek1hcmdpbiArIHRoaXNIb3J6UGFkZGluZztcblxuICAgIHJldHVybiB0aGlzT3V0ZXJXaWR0aDtcbn1cbiIsIi8vIGdldCBlbGVtZW50IGJ5IElkID4gY2xhc3MgPiBzZWxlY3RvclxuZnVuY3Rpb24gZ2V0KHNlbGVjdG9yLCBmYW1pbHkpe1xuICAgIHZhciB0aGlzVGFyZ2V0OyAvL2NvbnRhaW5zIHJlc3VsdGluZyBlbGVtZW50KHMpIGZyb20gZ2V0KClcblxuICAgIGlmIChmYW1pbHkpe1xuICAgICAgICB0aGlzVGFyZ2V0ID0gZ2V0RmFtaWx5KHNlbGVjdG9yLCBmYW1pbHkpXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBpZiggZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoc2VsZWN0b3IpICl7XG4gICAgICAgICAgICB0aGlzVGFyZ2V0ID0gIGdldEJ5SWQoc2VsZWN0b3IpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoc2VsZWN0b3IpKXtcbiAgICAgICAgICAgIHRoaXNUYXJnZXQgPSAgZ2V0QnlDbGFzcyhzZWxlY3Rvcik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHRoaXNUYXJnZXQgPSBnZXRCeVNlbGVjdG9yKHNlbGVjdG9yKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvL2NvbnNvbGUubG9nKFwiZ2V0KCkgY2FsbGVkIG9uOiBcIiArIHNlbGVjdG9yICsgXCIgcmV0dXJuZWQ6IFwiICsgdGhpc1RhcmdldCk7XG4gICAgcmV0dXJuIHRoaXNUYXJnZXQ7XG59XG5cbiAgICBmdW5jdGlvbiBnZXRCeUlkKGlkKXtcbiAgICAgICAgdmFyIHRoaXNUYXJnZXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7XG4gICAgICAgIHJldHVybiB0aGlzVGFyZ2V0O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldEJ5Q2xhc3MoY2xhc3NOYW1lKXtcbiAgICAgICAgdmFyIHRoaXNUYXJnZXQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGNsYXNzTmFtZSk7XG4gICAgICAgIHJldHVybiB0aGlzVGFyZ2V0O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldEJ5U2VsZWN0b3Ioc2VsZWN0b3Ipe1xuICAgICAgICB2YXIgdGhpc1RhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwodGhpc1NlbGVjdG9yKTtcbiAgICAgICAgcmV0dXJuIHRoaXNUYXJnZXQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0RmFtaWx5KGVsZW1lbnQsIGZhbWlseSl7XG4gICAgICAgIHZhciB0aGlzRmFtaWx5O1xuICAgICAgICBzd2l0Y2ggKGZhbWlseSl7XG4gICAgICAgICAgICBjYXNlIFwicHJldlwiOlxuICAgICAgICAgICAgICAgIHRoaXNGYW1pbHkgPSBnZXRQcmV2KGVsZW1lbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIm5leHRcIjpcbiAgICAgICAgICAgICAgICB0aGlzRmFtaWx5ID0gZ2V0TmV4dChlbGVtZW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJwYXJlbnRcIjpcbiAgICAgICAgICAgICAgICB0aGlzRmFtaWx5ID0gZ2V0UGFyZW50KGVsZW1lbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgLyogRklYOiBBZGQgY2hpbGQgYW5kIGNoaWxkcmVuXG4gICAgICAgICAgICBjYXNlIFwiY2hpbGRcIjpcbiAgICAgICAgICAgICAgICB2YXIgdGhpc1RhcmdldCA9IGdldE5leHQoZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiY2hpbGRyZW5cIjpcbiAgICAgICAgICAgICAgICB2YXIgdGhpc1RhcmdldCA9IGdldE5leHQoZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAqL1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzRmFtaWx5O1xuICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBnZXRQcmV2KGVsZW1lbnQpe1xuICAgICAgICAgICAgdmFyIHRoaXNTaWJsaW5nID0gZWxlbWVudC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXNTaWJsaW5nO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gZ2V0TmV4dChlbGVtZW50KXtcbiAgICAgICAgICAgIHZhciB0aGlzU2libGluZyA9IGVsZW1lbnQubmV4dEVsZW1lbnRTaWJsaW5nO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXNTaWJsaW5nO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gZ2V0UGFyZW50KGVsZW1lbnQpe1xuICAgICAgICAgICAgdmFyIHRoaXNQYXJlbnQgPSBlbGVtZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiZ2V0UGFyZW50IC0gXCIgKyBlbGVtZW50LmlkICsgXCIgLSBcIiArIHRoaXNQYXJlbnQpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXNQYXJlbnQ7XG4gICAgICAgIH1cblxuZnVuY3Rpb24gbW92ZUFmdGVyKGVsZW1lbnQsIHRhcmdldCl7XG4gICAgdmFyIHRoaXNUb3AgPSBnZXRPZmZzZXRCb3R0b20odGFyZ2V0KTtcbiAgICBzdHlsZShlbGVtZW50LCB7XG4gICAgICAgICdwb3NpdGlvbic6J2Fic29sdXRlJyxcbiAgICAgICAgJ3RvcCc6IHRvUGl4KHRoaXNUb3ApXG4gICAgICAgIH1cbiAgICApXG59IiwiJ3VzZSBzdHJpY3QnO1xuLypqc2hpbnQgLVcxMTcgKi9cbi8vRVZFTlQgTElTVEVORVJTIC0gRklYOiB1c2UgYWRkRXZlbnQoKVxubmF2T3BlbkJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFkZE1lbnVPcGVuQ2xhc3MgKTtcbm5hdkNsb3NlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcmVtb3ZlTWVudU9wZW5DbGFzcyApO1xuXG52YXIgbW91c2VEb3duID0gZmFsc2U7XG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBmdW5jdGlvbigpIHtcbiAgICBtb3VzZURvd24gPSB0cnVlO1xufSk7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBmdW5jdGlvbigpIHtcbiAgICBtb3VzZURvd24gPSBmYWxzZTtcbn0pO1xuXG5mdW5jdGlvbiBhZGRFdmVudCh0aGlzVGFyZ2V0LCBldmVudFR5cGUsIGZ1Y250aW9uKXtcbiAgICBnZXQodGhpc1RhcmdldCk7XG4gICAgaWYoZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcil7XG4gICAgICAgIHRoaXNUYXJnZXQuYWRkRXZlbnRMaXN0ZW5lcihldmVudFR5cGUsIGZ1Y250aW9uLCBmYWxzZSk7XG4gICAgfSBlbHNlIGlmKGRvY3VtZW50LmF0dGFjaEV2ZW50KXtcbiAgICAgICAgdGhpc1RhcmdldC5hdHRhY2hFdmVudCgnb24nK2V2ZW50VHlwZSwgZnVjbnRpb24pO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXNUYXJnZXRbJ29uJytldmVudFR5cGVdID0gZnVjbnRpb247XG4gICAgfVxufVxuXG4vKlxuXG4vL1NhbXBsZSBVc2FnZVxuXG5hZGRFdmVudCh3aW5kb3csICdsb2FkJywgZnVuY3Rpb24oKXtcbiAgICAvL2FsbCBvdXIgY29kZSB0aGF0IHJ1bnMgYWZ0ZXIgdGhlIHBhZ2UgaXMgcmVhZHkgZ29lcyBoZXJlXG59KTtcblxuYWRkRXZlbnQob3VyRm9ybSwgJ3N1Ym1pdCcsIGNoZWNrRm9ybSk7XG5cbi8vICovIiwiJ3VzZSBzdHJpY3QnO1xuLypqc2hpbnQgLVcxMTcgKi9cbi8vZGVidWdnZXI7IC8vY3JlYXRlcyBicmVha3BvaW50IGFuZCBhdXRvbWF0aWNhbGx5IHN0b3BzIHNjcmlwdCBhbmQgb3BlbnMgZGV2IHRvb2xzXG5cbmZ1bmN0aW9uIGdldERvY0hlaWdodCgpe1xuICAgIC8vU3RhbmRhcmRpemUgaGVpZ2h0IHRvIGhlaWdoZXN0IHZhbHVlXG4gICAgdmFyIGRvY0hlaWdodCA9IE1hdGgubWF4KCBib2R5LnNjcm9sbEhlaWdodCwgYm9keS5vZmZzZXRIZWlnaHQsIGh0bWwuY2xpZW50SGVpZ2h0LCBodG1sLnNjcm9sbEhlaWdodCwgaHRtbC5vZmZzZXRIZWlnaHQgKTtcbiAgICByZXR1cm4gZG9jSGVpZ2h0O1xufVxuXG4vLyBnZXQgZWxlbWVudCBieSBJZCA+IGNsYXNzID4gc2VsZWN0b3JcbmZ1bmN0aW9uIGdldChzZWxlY3RvciwgZmFtaWx5KXtcbiAgICB2YXIgdGhpc1RhcmdldDsgLy9jb250YWlucyByZXN1bHRpbmcgZWxlbWVudChzKSBmcm9tIGdldCgpXG5cbiAgICBpZiAoZmFtaWx5KXtcbiAgICAgICAgdGhpc1RhcmdldCA9IGdldEZhbWlseShzZWxlY3RvciwgZmFtaWx5KVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgaWYoIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHNlbGVjdG9yKSApe1xuICAgICAgICAgICAgdGhpc1RhcmdldCA9ICBnZXRCeUlkKHNlbGVjdG9yKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICggZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShzZWxlY3RvcikgKXtcbiAgICAgICAgICAgIHRoaXNUYXJnZXQgPSAgZ2V0QnlDbGFzcyhzZWxlY3Rvcik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHRoaXNUYXJnZXQgPSBnZXRCeVNlbGVjdG9yKHNlbGVjdG9yKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvL2NvbnNvbGUubG9nKFwiZ2V0KCkgY2FsbGVkIG9uOiBcIiArIHNlbGVjdG9yICsgXCIgcmV0dXJuZWQ6IFwiICsgdGhpc1RhcmdldCk7XG4gICAgcmV0dXJuIHRoaXNUYXJnZXQ7XG59XG5cbiAgICBmdW5jdGlvbiBnZXRCeUlkKGlkKXtcbiAgICAgICAgdmFyIHRoaXNUYXJnZXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7XG4gICAgICAgIHJldHVybiB0aGlzVGFyZ2V0O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldEJ5Q2xhc3MoY2xhc3NOYW1lKXtcbiAgICAgICAgdmFyIHRoaXNUYXJnZXQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGNsYXNzTmFtZSk7XG4gICAgICAgIHJldHVybiB0aGlzVGFyZ2V0O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldEJ5U2VsZWN0b3Ioc2VsZWN0b3Ipe1xuICAgICAgICB2YXIgdGhpc1RhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwodGhpc1NlbGVjdG9yKTtcbiAgICAgICAgcmV0dXJuIHRoaXNUYXJnZXQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0RmFtaWx5KGVsZW1lbnQsIGZhbWlseSl7XG4gICAgICAgIHZhciB0aGlzRmFtaWx5O1xuICAgICAgICBzd2l0Y2ggKGZhbWlseSl7XG4gICAgICAgICAgICBjYXNlIFwicHJldlwiOlxuICAgICAgICAgICAgICAgIHRoaXNGYW1pbHkgPSBnZXRQcmV2KGVsZW1lbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIm5leHRcIjpcbiAgICAgICAgICAgICAgICB0aGlzRmFtaWx5ID0gZ2V0TmV4dChlbGVtZW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJwYXJlbnRcIjpcbiAgICAgICAgICAgICAgICB0aGlzRmFtaWx5ID0gZ2V0UGFyZW50KGVsZW1lbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgLyogRklYOiBBZGQgY2hpbGQgYW5kIGNoaWxkcmVuXG4gICAgICAgICAgICBjYXNlIFwiY2hpbGRcIjpcbiAgICAgICAgICAgICAgICB2YXIgdGhpc1RhcmdldCA9IGdldE5leHQoZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiY2hpbGRyZW5cIjpcbiAgICAgICAgICAgICAgICB2YXIgdGhpc1RhcmdldCA9IGdldE5leHQoZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAqL1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzRmFtaWx5O1xuICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBnZXRQcmV2KGVsZW1lbnQpe1xuICAgICAgICAgICAgdmFyIHRoaXNTaWJsaW5nID0gZWxlbWVudC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXNTaWJsaW5nO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gZ2V0TmV4dChlbGVtZW50KXtcbiAgICAgICAgICAgIHZhciB0aGlzU2libGluZyA9IGVsZW1lbnQubmV4dEVsZW1lbnRTaWJsaW5nO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXNTaWJsaW5nO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gZ2V0UGFyZW50KGVsZW1lbnQpe1xuICAgICAgICAgICAgdmFyIHRoaXNQYXJlbnQgPSBlbGVtZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiZ2V0UGFyZW50IC0gXCIgKyBlbGVtZW50LmlkICsgXCIgLSBcIiArIHRoaXNQYXJlbnQpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXNQYXJlbnQ7XG4gICAgICAgIH1cblxuZnVuY3Rpb24gZ2V0U3R5bGUoZWxlbWVudCwgcHJvcGVydHkpe1xuICAgIHZhciB0aGlzU3R5bGUgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KS5nZXRQcm9wZXJ0eVZhbHVlKHByb3BlcnR5KTtcbiAgICByZXR1cm4gdGhpc1N0eWxlO1xufVxuXG5mdW5jdGlvbiBzZXRTdHlsZShlbGVtZW50LCBzdHlsZXMpe1xuICAgIHZhciBwcm9wZXJ0eSwgdmFsdWU7XG4gICAgZm9yICggcHJvcGVydHkgaW4gc3R5bGVzICkge1xuICAgICAgICB2YWx1ZSA9IHN0eWxlc1twcm9wZXJ0eV07XG4gICAgICAgIGVsZW1lbnQuc3R5bGVbcHJvcGVydHldID0gdmFsdWU7XG4gICAgfVxufVxuXG4vL0ZJWDogY2hlY2sgZm9yIG90aGVyIHN0cmluZyB2YWx1ZXNcbmZ1bmN0aW9uIHRvUGl4KHRoaXNWYWx1ZSl7XG5cbiAgICBpZiAoIHR5cGVvZih0aGlzVmFsdWUpID09PSBcInN0cmluZ1wiICl7XG4gICAgICAgIC8vcGFyc2UgdG8gYmFzZSAxMCArIGFsc28gcmVtb3ZpbmcgdHJhaWxpbmcgXCJweFwiXG4gICAgICAgIHRoaXNWYWx1ZSA9IHBhcnNlSW50KHRoaXNWYWx1ZSwgMTApO1xuICAgIH1cbiAgICB0aGlzVmFsdWUgPSB0aGlzVmFsdWUgKz0gXCJweFwiO1xuICAgIHJldHVybiB0aGlzVmFsdWU7XG59XG5cbmZ1bmN0aW9uIHRvSW50KHRoaXNWYWx1ZSl7IC8vY2hlY2sgZm9yICdub25lJywgJ2luaGVyaXQnIGV0Yy5cbiAgICBpZiAoIHR5cGVvZih0aGlzVmFsdWUpID09PSBcInN0cmluZ1wiICl7XG4gICAgICAgIC8vcGFyc2UgdG8gYmFzZSAxMCArIGFsc28gcmVtb3ZpbmcgdHJhaWxpbmcgXCJweFwiXG4gICAgICAgIHRoaXNWYWx1ZSA9IHBhcnNlSW50KHRoaXNWYWx1ZSwgMTApO1xuICAgIH1cbiAgICByZXR1cm4gdGhpc1ZhbHVlO1xufVxuXG5mdW5jdGlvbiBhZGRDbGFzcyhlbGVtZW50LCB0aGlzQ2xhc3Mpe1xuICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCh0aGlzQ2xhc3MpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVDbGFzcyhlbGVtZW50LCB0aGlzQ2xhc3Mpe1xuICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSh0aGlzQ2xhc3MpO1xufVxuXG5mdW5jdGlvbiB0b2dnbGVDbGFzcyhlbGVtZW50LCB0aGlzQ2xhc3Mpe1xuICAgIGVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZSh0aGlzQ2xhc3MpO1xufVxuXG5mdW5jdGlvbiBoYXNDbGFzcyhlbGVtZW50LCB0aGlzQ2xhc3Mpe1xuICAgIHZhciBoYXNDbGFzcyA9IGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKHRoaXNDbGFzcyk7XG4gICAgcmV0dXJuIGhhc0NsYXNzO1xufVxuXG5mdW5jdGlvbiBnZXRTY3JvbGxWYWx1ZShlbGVtZW50KXtcbiAgICBpZiAoZWxlbWVudCl7XG4gICAgICAgIHZhciB0aGlzRWxlbWVudCA9IGdldChlbGVtZW50KTtcbiAgICAgICAgdmFyIHRoaXNTY3JvbGxUb3AgPSB0aGlzRWxlbWVudC5zY3JvbGxZO1xuICAgICAgICAvL2NvbnNvbGUubG9nKHRoaXNTY3JvbGxUb3ApO1xuICAgICAgICByZXR1cm4gdGhpc1Njcm9sbFRvcDtcbiAgICB9XG4gICAgZWxzZXtcbiAgICAgICAgdmFyIHdpbmRvd1Njcm9sbFRvcCA9IHdpbmRvdy5zY3JvbGxZO1xuICAgICAgICByZXR1cm4gd2luZG93U2Nyb2xsVG9wO1xuICAgIH1cbn1cblxuLy9nZXQgYXR0cmlidXRlIC0gaWUuIGhyZWYsIGNsYXNzLCBjaGFyc2V0IGV0Yy5cbmZ1bmN0aW9uIGdldEF0dHJpYnV0ZSh0aGlzVGFyZ2V0LCB0aGlzQXR0cmlidXRlKXtcbiAgICB0aGlzVGFyZ2V0ID0gZ2V0KHRoaXNUYXJnZXQpO1xuICAgIHZhciB0aGlzVmFsdWUgPSB0aGlzVGFyZ2V0LmdldEF0dHJpYnV0ZSh0aGlzQXR0cmlidXRlKTtcbiAgICByZXR1cm4gdGhpc1ZhbHVlO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuLypqc2hpbnQgLVcxMTcgKi9cblxuZnVuY3Rpb24ganNvblRvSnModGhpc0pzb24pe1xuICAgIHJldHVybiBKU09OLnBhcnNlKHRoaXNKc29uKTtcbn1cblxuZnVuY3Rpb24ganNUb0pzb24odGhpc0pzT2JqZWN0KXtcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodGhpc0pzT2JqZWN0KTtcbn1cbiIsIiIsIi8vU3RyaW5nIE1hbmlwdWxhdGlvblxuZnVuY3Rpb24gZ2V0Q2hhckF0KHRoaXNUYXJnZXQsIHRoaXNQb3NpdGlvbil7XG4gICAgcmV0dXJuIHRoaXNUYXJnZXQuY2hhckF0KHRoaXNQb3NpdGlvbik7XG59XG5cbmZ1bmN0aW9uIGdldENoYXJJbmRleCh0aGlzVGFyZ2V0LCB0aGlzQ2hhcmFjdGVyKXtcbiAgICByZXR1cm4gdGhpc1RhcmdldC5pbmRleE9mKHRoaXNDaGFyYWN0ZXIpO1xufVxuXG5mdW5jdGlvbiB0cmltVGhpcyh0aGlzVGFyZ2V0KXtcbiAgICByZXR1cm4gdGhpc1RhcmdldC50cmltKCk7XG59IiwiZnVuY3Rpb24gc3R5bGVzKCBlbGVtZW50LCBzdHlsZXMgKSB7XG4gICAgaWYoc3R5bGVzKXtcbiAgICAgICAgc2V0U3R5bGUoZWxlbWVudCwgc3R5bGVzKTtcbiAgICB9XG4gICAgZWxzZXtcbiAgICAgICAgZ2V0U3R5bGUoZWxlbWVudCk7XG4gICAgfX1cblxuICAgIGZ1bmN0aW9uIGdldFN0eWxlKGVsZW1lbnQsIHByb3BlcnR5KXtcbiAgICAgICAgdmFyIHRoaXNTdHlsZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpLmdldFByb3BlcnR5VmFsdWUocHJvcGVydHkpO1xuICAgICAgICAvL2NvbnNvbGUubG9nKFwiZ2V0U3R5bGVzKCkgLSBcIiArIHByb3BlcnkgKyBcIiBmb3I6IFwiICsgZWxlbWVudC5pZCArIFwiIHJldHVybmVkOiBcIiArIHRoaXNTdHlsZSk7XG4gICAgICAgIHJldHVybiB0aGlzU3R5bGU7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2V0U3R5bGUoZWxlbWVudCwgc3R5bGVzKXtcbiAgICAgICAgdmFyIHByb3BlcnR5LCB2YWx1ZTtcbiAgICAgICAgZm9yICggcHJvcGVydHkgaW4gc3R5bGVzICkge1xuICAgICAgICAgICAgdmFsdWUgPSBzdHlsZXNbcHJvcGVydHldO1xuICAgICAgICAgICAgZWxlbWVudC5zdHlsZVtwcm9wZXJ0eV0gPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZWxlbWVudDtcbiAgICB9IiwiZnVuY3Rpb24gaW5pdERyYWdlbmRHYWxsZXJ5KGdhbGxlcnlDb250YWluZXIgLCB2aWV3SGVpZ2h0KXtcblx0dmFyIHNsaWRlc0NvbnRhaW5lciA9IGpRdWVyeSggZ2FsbGVyeUNvbnRhaW5lciArICcgLmltYWdlLWdhbGxlcnknICk7XG5cdC8vY29uc29sZS5sb2coc2xpZGVzQ29udGFpbmVyKTtcblx0dXBkYXRlRHJhZ2VuZFNsaWRlcyhcblx0XHRzbGlkZXNDb250YWluZXIsIC8vIHBhcmVudCBHYWxsZXJ5Q29udGFpbmVyXG5cdFx0dmlld0hlaWdodCAgICAgICAgLy8gc2xpZGVzIHNpemVcblx0ICk7XG5cblx0Ly9pbml0IERyYWdlbmRcbiBcdGpRdWVyeShzbGlkZXNDb250YWluZXIpLmRyYWdlbmQoe30pO1xuXHQvKlxuXHRpZiAodGh1bWJzVHlwZSl7XG5cdFx0alF1ZXJ5KCcjdGh1bWJzU2Nyb2xsJykuZmFkZUluKCk7XG5cdH1cblx0ZWxzZXtcblx0XHRqUXVlcnkoJyN0aHVtYnNTY3JvbGwnKS5oaWRlKCk7XG5cdH1cblxuXG5cblx0Ly9BdXRvUGxheSBTbGlkZXNcblx0ZG9SZWN1cnNpdmVseSggZnVuY3Rpb24oKXsgYXV0b1BsYXlTbGlkZXMoc2xpZGVzQ29udGFpbmVyKSB9LCA0MDAwLCA0MDAwMCk7XG5cblx0Ly9BZGp1c3QgU2xpZGVzIG9uIHJlc2l6ZVxuXHRqUXVlcnkod2luZG93KS5yZXNpemUoXy5kZWJvdW5jZShmdW5jdGlvbigpe1xuXHRcdHVwZGF0ZURyYWdlbmRTbGlkZXMoc2xpZGVzQ29udGFpbmVyLCB2aWV3SGVpZ2h0KTtcblx0fSwgNTApKTtcblxuXHQvL0ZJWDogbW92ZSB0byBleHRlcm5hbCBmdW5jdGlvblxuXHQvL1NldCBOZXh0IGFuZCBQcmV2aW91cyBMaW5rc1xuXHQvL1VzaW5nIFdvcmRQcmVzcyBuZXh0X3Bvc3RfbGluayBhbmQgcHJldmlvdXNfcG9zdF9saW5rIGZvciBocmVmLCBhbmQgcmVwbGFjaW5nIGZvciBjdXN0b20gdGV4dCwgY2xhc3NlcyBhbmQgZGF0YS1vdmVybGF5LXNsdWdcblx0dmFyIG5leHRMaW5rSHJlZj0galF1ZXJ5KFwiLmhpZGUgYVtyZWw9J25leHQnXVwiKS5hdHRyKCdocmVmJyk7XG5cdHZhciBwcmV2TGlua0hyZWY9IGpRdWVyeShcIi5oaWRlIGFbcmVsPSdwcmV2J11cIikuYXR0cignaHJlZicpO1xuXG5cdGlmIChuZXh0TGlua0hyZWYpe1xuXHRcdGpRdWVyeShcIiNuZXh0UHJvamVjdFwiKS5hdHRyKFwiaHJlZlwiLCBuZXh0TGlua0hyZWYgKTtcblx0fVxuXHRlbHNle1xuXHRcdGpRdWVyeShcIiNuZXh0UHJvamVjdFwiKS5jc3MoXCJkaXNwbGF5XCIsIFwibm9uZVwiICk7XG5cdH1cblxuXHRpZiAocHJldkxpbmtIcmVmKXtcblx0XHRqUXVlcnkoXCIjcHJldlByb2plY3RcIikuYXR0cihcImhyZWZcIiwgcHJldkxpbmtIcmVmICk7XG5cdH1cblx0ZWxzZXtcblx0XHRqUXVlcnkoXCIjcHJldlByb2plY3RcIikuY3NzKFwiZGlzcGxheVwiLCBcIm5vbmVcIiApO1xuXHR9XG4qL1xufS8vY3JlYXRlR2FsbGVyeSgpIiwiZnVuY3Rpb24gc2V0VGh1bWJzUGVyUGFnZSgpe1xuICAgIC8vU2hvdyBhcyBtYW55IHRodW1icyBhcyB3aWxsIGZpdCBvbiB0aGUgc2NyZWVuXG4gICAgdmFyIGl0ZW1zSW5QYWdlID0gdmlld1dpZHRoIC8galF1ZXJ5KCBcIi5kcmFnZW5kLXRodW1iXCIpLndpZHRoKCk7XG4gICAgalF1ZXJ5KFwiI3RodW1ic0NvbnRhaW5lclwiKS5kcmFnZW5kKHtcbiAgICAgICAgaXRlbXNJblBhZ2U6IGl0ZW1zSW5QYWdlLFxuICAgICAgICBvblN3aXBlRW5kOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIC8vc3RvcFRodW1ic092ZXJzY3JvbGwoKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG4vL1ByZXZlbnQgc2Nyb2xsaW5nIGludG8gd2hpdGVzcGFjZSBhZnRlciB0aGUgbGFzdCB0aHVtYm5haWxcbmZ1bmN0aW9uIHN0b3BUaHVtYnNPdmVyc2Nyb2xsKCl7XG4gICAgdmFyIGxhc3RUaHVtYiA9IGpRdWVyeSgnI3RodW1ic0NvbnRhaW5lciAuZHJhZ2VuZC10aHVtYjpsYXN0LWNoaWxkJyk7XG4gICAgdmFyIGxhc3RUaHVtYldpZHRoID0gd2lkdGgobGFzdFRodW1iKTtcbiAgICB2YXIgbGFzdFRodW1iT2Zmc2V0TGVmdCA9IGxhc3RUaHVtYi5wb3NpdGlvbigpLmxlZnQ7XG4gICAgdmFyIGxhc3RUaHVtYk9mZnNldFJpZ2h0ID0gbGFzdFRodW1iLnBvc2l0aW9uKCkubGVmdCArIGxhc3RUaHVtYldpZHRoO1xuICAgIHZhciB0aHVtYnNDb250YWluZXIgPSBqUXVlcnkoXCIjdGh1bWJzQ29udGFpbmVyIGRpdjpmaXJzdC1jaGlsZFwiKTtcbiAgICB2YXIgdGh1bWJzQ29udGFpbmVyV2lkdGggPSB3aWR0aCh0aHVtYnNDb250YWluZXIpO1xuICAgIHZhciB0aHVtYnNDb250YWluZXJCaWdnZXJCeSA9ICB0aHVtYnNDb250YWluZXJXaWR0aCAtIHZpZXdXaWR0aDtcbiAgICBpZiAoIHRodW1ic0NvbnRhaW5lcldpZHRoID4gdmlld1dpZHRoKXtcbiAgICAgICAgaWYoIGxhc3RUaHVtYk9mZnNldFJpZ2h0IDwgdmlld1dpZHRoKXtcbiAgICAgICAgICAgIHRodW1ic0NvbnRhaW5lci5jc3MoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGVYKC0nICsgdGh1bWJzQ29udGFpbmVyQmlnZ2VyQnkgKyAncHgpJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYoIHRodW1ic0NvbnRhaW5lci5wb3NpdGlvbigpLmxlZnQgPiAwKXtcbiAgICAgICAgICAgIHRodW1ic0NvbnRhaW5lci5jc3MoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGVYKDBweCknKTtcbiAgICAgICAgfVxuICAgIH1cblxufVxuIiwiJ3VzZSBzdHJpY3QnO1xuLypqc2hpbnQgLVcxMTcgKi9cblxuZnVuY3Rpb24gdXBkYXRlRHJhZ2VuZFNsaWRlcyhzbGlkZXNDb250YWluZXIsIHNsaWRlc0hlaWdodCl7XG5cdGNvbnNvbGUubG9nKHNsaWRlc0NvbnRhaW5lcik7XG5cblx0Ly9maW5kIGVhY2ggcGFnZSBpbiBzbGlkZXJcbiAgICBzbGlkZXNDb250YWluZXIuZmluZChcIi5kcmFnZW5kLXBhZ2VcIikuZWFjaChmdW5jdGlvbihpbmRleCwgdGhpc1NsaWRlKXtcblxuICAgICAgICAvL3Jlc2V0IGhlaWdodFxuICAgICAgICBjbGVhckhlaWdodCh0aGlzKTtcbiAgICAgICAgalF1ZXJ5KHRoaXMpLmhlaWdodChzbGlkZXNIZWlnaHQpO1xuXG4gICAgICAgIC8vcmVzZXQgbWF4LWhlaWdodFxuICAgICAgICBqUXVlcnkodGhpcykuY3NzKFwibWF4LWhlaWdodFwiLCBcImF1dG9cIik7XG4gICAgICAgIG1heFNpemVCeUFzcCh0aGlzLCAxLjYsIDIuMik7XG5cbiAgICB9KTtcblx0Lypcblx0Ly9GSVg6IHBhc3MgdGh1bWJzQ29udGVudFxuXHRpZiggdGh1bWJzQ29udGVudCApe1xuXHRcdGNlbnRlclRodW1icyggdGh1bWJzQ29udGVudCApO1xuXHR9XG5cdCovXG5cbn0vL3VwZGF0ZVNsaWRlclxuXG4vL1RIVU1CTkFJTFNcbmZ1bmN0aW9uIGNyZWF0ZVRodW1icyhzbGlkZXNDb250YWluZXIsIHRodW1ic0NvbnRhaW5lciwgdGh1bWJzQ29udGVudCwgdGh1bWJzVHlwZSl7XG5cdGpRdWVyeS5lYWNoKCB0aHVtYnNDb250ZW50LCBmdW5jdGlvbiggaW5kZXgsIHRodW1iICl7XG5cdFx0dmFyIHRoaXNUaHVtYiA9IGpRdWVyeSgnPGRpdiBjbGFzcz1cImRyYWdlbmQtdGh1bWJcIiBkYXRhLXBhZ2U9XCInICsgKGluZGV4ICsgMSkgKyAnXCI+PC9kaXY+Jyk7XG5cdFx0dGhpc1RodW1iLmFwcGVuZFRvKGpRdWVyeSh0aHVtYnNDb250YWluZXIpKTtcblxuXHRcdGlmKHRodW1ic1R5cGUgPT0gXCJ0aHVtYm5haWxzXCIpe1xuXHRcdFx0c2V0QmdJbWcodGhpc1RodW1iLCB0aHVtYlswXSwgXCJzcXVhcmVcIik7XG5cdFx0fVxuXHRcdGVsc2UgaWYodGh1bWJzVHlwZSA9PSBcImJ1dHRvbnNcIil7XG5cdFx0XHQvL2FkZCBidXR0b24gc3VwcG9ydFxuXHRcdH1cblx0fSk7XG4gICAgY2VudGVyVGh1bWJzKCB0aHVtYnNDb250ZW50ICk7XG5cdGluaXRUaHVtYnMoIHNsaWRlc0NvbnRhaW5lciwgdGh1bWJzQ29udGFpbmVyICk7XG59XG5cblx0ZnVuY3Rpb24gaW5pdFRodW1icyhzbGlkZXNDb250YWluZXIsIHRodW1ic0NvbnRhaW5lcil7XG4gICAgICAgIGpRdWVyeShkb2N1bWVudCkub24oXCJjbGlja1wiLCB0aHVtYnNDb250YWluZXIsIGZ1bmN0aW9uKGV2ZW50KXtcblx0XHRcdHZhciBwYWdlID0galF1ZXJ5KGV2ZW50LnRhcmdldCkuZGF0YShcInBhZ2VcIik7XG5cdFx0XHRqUXVlcnkoc2xpZGVzQ29udGFpbmVyKS5kcmFnZW5kKHtcblx0XHRcdFx0c2Nyb2xsVG9QYWdlOiBwYWdlXG5cdFx0XHR9KTtcblx0XHR9KTtcblx0fVxuXG5cblx0ZnVuY3Rpb24gY2VudGVyVGh1bWJzKHRodW1ic0NvbnRlbnQpe1xuICAgICAgICBqUXVlcnkodGh1bWJzQ29udGFpbmVyKS53aWR0aCggdGh1bWJzQ29udGVudC5sZW5ndGggKiBqUXVlcnkoJy5kcmFnZW5kLXRodW1iJykud2lkdGgoKSApO1xuICAgICAgICB2YXIgdGh1bWJzV2lkdGggPSBqUXVlcnkodGh1bWJzQ29udGFpbmVyKS53aWR0aCgpO1xuXG5cdFx0alF1ZXJ5KCcjdGh1bWJzQ29udGFpbmVyJykuY3NzKCdtYXJnaW4tbGVmdCcsIDApO1xuXG5cdCAgICBpZiAodmlld1dpZHRoID4gdGh1bWJzV2lkdGggKXtcbiAgICAgICAgICAgIHZhciB0aHVtYk9mZnNldCA9ICggdmlld1dpZHRoIC0gdGh1bWJzV2lkdGggKSAvIDI7XG4gICAgICAgICAgICBqUXVlcnkoJyN0aHVtYnNDb250YWluZXInKS5jc3MoJ21hcmdpbi1sZWZ0JywgdGh1bWJPZmZzZXQpO1xuICAgICAgICB9XG5cdH1cblxuLy9HZW5lcmFsIEZ1bmN0aW9uc1xuZnVuY3Rpb24gYXV0b1BsYXlTbGlkZXModGhpc0RyYWdlbmQpe1xuXHRqUXVlcnkodGhpc0RyYWdlbmQpLmRyYWdlbmQoXCJsZWZ0XCIpO1xufVxuXG4iLCIndXNlIHN0cmljdCc7XG4vKmpzaGludCAtVzExNyAqL1xuXG4vL09WRVJMQVkgLSBTaGFkb3dib3ggc3R5bGUgcG9wdXAgYm94XG4vL0NTUyBkZWZhdWx0cyBzZXQgaW4gY29yZS9zY3NzL3BhcnRpYWxzL19vdmVybGF5LnNjc3Ncbi8vQ3VzdG9taXplIGNzcyBmb3IgI092ZXJsYXlDb250ZW50LnNsdWcgaW4geW91ciB0aGVtZVxuZnVuY3Rpb24gY3JlYXRlT3ZlcmxheShzbHVnKXtcblxuICAgIHZhciBvdmVybGF5V3JhcHBlciA9IGdldCgnb3ZlcmxheVdyYXBwZXInKTtcbiAgICB2YXIgb3ZlcmxheUNvbnRlbnQgPSBnZXQoJ292ZXJsYXlDb250ZW50Jyk7XG4gICAgc3R5bGVzKFxuICAgICAgICBvdmVybGF5V3JhcHBlcix7XG4gICAgICAgICAgICAnZGlzcGxheSc6J2Jsb2NrJ1xuICAgICAgICB9XG4gICAgKTtcblxuICAgIG92ZXJsYXlDb250ZW50LmNsYXNzTmFtZSA9IHNsdWc7IC8vd2lsbCBvdmVyd3JpdGUgYW55IGV4aXN0aW5nIGNsYXNzXG5cbiAgICAvL292ZXJsYXlDb250ZW50IHVzZWQgYnkgbG9hZCgpICd3aGVyZScgcGFyYW1ldGVyXG5cdHJldHVybiBvdmVybGF5Q29udGVudDtcbn1cblxuLy8gU2V0dXAgY2xpY2sgaGFuZGxlcnNcbmpRdWVyeShkb2N1bWVudCkub24oXCJjbGlja1wiLCBcIi5vdmVybGF5XCIsIGZ1bmN0aW9uKGV2ZW50KXtcbiAgICBqUXVlcnkoJyNvdmVybGF5Q29udGVudCcpLmVtcHR5KCk7IC8vcmVtb3ZlIGFueSBwcmUtZXhpc3RpbmcgY29udGVudFxuICAgIHZhciBzbHVnXHQ9IGpRdWVyeSh0aGlzKS5kYXRhKCdvdmVybGF5LXNsdWcnKTtcbiAgICB2YXIgd2hhdCBcdD0galF1ZXJ5KHRoaXMpLmF0dHIoJ2hyZWYnKTtcbiAgICB2YXIgd2hlcmUgXHQ9IGNyZWF0ZU92ZXJsYXkoc2x1Zyk7XG4gICAgbG9hZCh3aGVyZSwgd2hhdCk7XG4gICAgcmV0dXJuIGZhbHNlO1xufSk7XG5cbmpRdWVyeSgnYm9keScpLm9uKCdjbGljaycsICcjb3ZlcmxheUNsb3NlQnRuJywgZnVuY3Rpb24oKSB7XG4gICAgalF1ZXJ5KCcjb3ZlcmxheUNvbnRlbnQnKS5lbXB0eSgpO1xuICAgIGpRdWVyeSgnI292ZXJsYXlXcmFwcGVyJykuaGlkZSgpO1xufSk7IiwiJ3VzZSBzdHJpY3QnO1xuLypqc2hpbnQgLVcxMTcgKi9cblxuZnVuY3Rpb24gZ2V0U2Nyb2xsVmFsdWUoZWxlbWVudCl7XG4gICAgaWYgKGVsZW1lbnQpe1xuICAgICAgICB2YXIgdGhpc0VsZW1lbnQgPSBnZXQoZWxlbWVudCk7XG4gICAgICAgIHZhciB0aGlzU2Nyb2xsVG9wID0gdGhpc0VsZW1lbnQuc2Nyb2xsWTtcbiAgICAgICAgLy9jb25zb2xlLmxvZyh0aGlzU2Nyb2xsVG9wKTtcbiAgICAgICAgcmV0dXJuIHRoaXNTY3JvbGxUb3A7XG4gICAgfVxuICAgIGVsc2V7XG4gICAgICAgIHZhciB3aW5kb3dTY3JvbGxUb3AgPSB3aW5kb3cuc2Nyb2xsWTtcbiAgICAgICAgcmV0dXJuIHdpbmRvd1Njcm9sbFRvcDtcbiAgICB9XG59XG5cbi8qR28gVG8gVG9wIEZ1bmN0aW9uKi9cbnZhciBnb1RvVG9wID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2J0bi10by10b3AnKTtcblxuZ29Ub1RvcC5vbmNsaWNrID0gZnVuY3Rpb24gKCkge1xuICAgIHdpbmRvdy5zY3JvbGxUbygwLCAwKTtcblxuXHRzbW9vdGhTY3JvbGxUbygwLCA1MDApO1xufTtcblxud2luZG93LnNtb290aFNjcm9sbFRvID0gKGZ1bmN0aW9uICgpIHtcbiAgdmFyIHRpbWVyLCBzdGFydCwgZmFjdG9yO1xuXG4gIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBkdXJhdGlvbikge1xuICAgIHZhciBvZmZzZXQgPSB3aW5kb3cucGFnZVlPZmZzZXQsXG4gICAgICAgIGRlbHRhICA9IHRhcmdldCAtIHdpbmRvdy5wYWdlWU9mZnNldDsgLyogWS1vZmZzZXQgZGlmZmVyZW5jZSovXG4gICAgZHVyYXRpb24gPSBkdXJhdGlvbiB8fCAxMDAwOyAgICAgICAgICAgICAgLyogZGVmYXVsdCAxIHNlYyBhbmltYXRpb24qL1xuICAgIHN0YXJ0ID0gRGF0ZS5ub3coKTsgICAgICAgICAgICAgICAgICAgICAgLyogZ2V0IHN0YXJ0IHRpbWUqL1xuICAgIGZhY3RvciA9IDA7XG5cbiAgICBpZiggdGltZXIgKSB7XG4gICAgICBjbGVhckludGVydmFsKHRpbWVyKTsgLy8gc3RvcCBhbnkgcnVubmluZyBhbmltYXRpb25zXG4gICB9XG5cbiAgICBmdW5jdGlvbiBzdGVwKCkge1xuICAgICAgdmFyIHk7XG4gICAgICBmYWN0b3IgPSAoRGF0ZS5ub3coKSAtIHN0YXJ0KSAvIGR1cmF0aW9uOyAvLyBnZXQgaW50ZXJwb2xhdGlvbiBmYWN0b3JcbiAgICAgIGlmKCBmYWN0b3IgPj0gMSApIHtcbiAgICAgICAgY2xlYXJJbnRlcnZhbCh0aW1lcik7IC8vIHN0b3AgYW5pbWF0aW9uXG4gICAgICAgIGZhY3RvciA9IDE7ICAgICAgICAgICAvLyBjbGlwIHRvIG1heCAxLjBcbiAgICAgfVxuICAgICAgeSA9IGZhY3RvciAqIGRlbHRhICsgb2Zmc2V0O1xuICAgICAgd2luZG93LnNjcm9sbEJ5KDAsIHkgLSB3aW5kb3cucGFnZVlPZmZzZXQpO1xuICAgfVxuXG4gICAgdGltZXIgPSBzZXRJbnRlcnZhbChzdGVwLCAyMCk7XG4gICAgcmV0dXJuIHRpbWVyO1xuIH07XG59KCkpOyIsIid1c2Ugc3RyaWN0Jztcbi8qanNoaW50IC1XMTE3ICovXG5cbmpRdWVyeSgnI3dpbmRvd1NpemUnKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICBqUXVlcnkoJyN3aW5kb3dTaXplJykuZmFkZU91dCgnbWVkaXVtJyk7XG59KTtcblxuZnVuY3Rpb24gdGVzdFBhbmVsKCkge1xuICAgIGpRdWVyeSgnI3dpbmRvd1NpemUnKS5jc3MoJ2Rpc3BsYXknLCdibG9jaycpO1xuICAgIGpRdWVyeSgnI3dpbmRvd1NpemUnKS5lbXB0eSgpO1xuXG4gICAgalF1ZXJ5KCcjd2luZG93U2l6ZScpLmFwcGVuZChcIjxkaXY+VzogXCIgICAgICsgdmlld1dpZHRoICAgICArIFwicHggPC9kaXY+XCIpO1xuICAgIGpRdWVyeSgnI3dpbmRvd1NpemUnKS5hcHBlbmQoXCI8ZGl2Pkg6IFwiICAgICArIHZpZXdIZWlnaHQgICAgKyBcInB4IDwvZGl2PlwiKTtcbiAgICBqUXVlcnkoJyN3aW5kb3dTaXplJykuYXBwZW5kKFwiPGRpdj5cIiAgICAgICAgKyBhc3BUZXh0ICAgICAgICsgXCI8L2Rpdj5cIik7XG4gICAgalF1ZXJ5KCcjd2luZG93U2l6ZScpLmFwcGVuZChcIjxkaXY+QnA6IFwiICAgICsgYnJlYWtQb2ludCAgICArIFwiPC9kaXY+XCIpO1xuICAgIGpRdWVyeSgnI3dpbmRvd1NpemUnKS5hcHBlbmQoXCI8ZGl2PkRldmljZTpcIiArIGRldmljZVR5cGUgICAgKyBcIjwvZGl2PlwiKTtcblxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgalF1ZXJ5KFwiI3dpbmRvd1NpemVcIikuZmFkZU91dCg0MDApO1xuICAgIH0sIDMwMDApXG59XG5cblxuIiwiLy9yZXR1cm5zIHRoZSBjYWxsZXIgZnVuY3Rpb24gbmFtZVxuLypcbiAgICB2YXIgY2FsbGVyTmFtZTtcbiAgICB0cnkgeyB0aHJvdyBuZXcgRXJyb3IoKTsgfVxuICAgIGNhdGNoIChlKSB7XG4gICAgICAgIHZhciByZSA9IC8oXFx3KylAfGF0IChcXHcrKSBcXCgvZywgc3QgPSBlLnN0YWNrLCBtO1xuICAgICAgICByZS5leGVjKHN0KSwgbSA9IHJlLmV4ZWMoc3QpO1xuICAgICAgICBjYWxsZXJOYW1lID0gbVsxXSB8fCBtWzJdO1xuICAgIH1cbiAgICBjb25zb2xlLmxvZyhcImZ1bmN0aW9uKCkgY2FsbGVkIGJ5OiBcIiArIGNhbGxlck5hbWUpO1xuKi9cblxuLy8gSlNPTi5zdHJpbmdpZnkoKSB0dXJucyBhIEphdmFzY3JpcHQgb2JqZWN0IGludG8gSlNPTiB0ZXh0IGFuZCBzdG9yZXMgdGhhdCBKU09OIHRleHQgaW4gYSBzdHJpbmcuXG4vLyBKU09OLnBhcnNlKCkgdHVybnMgYSBzdHJpbmcgb2YgSlNPTiB0ZXh0IGludG8gYSBKYXZhc2NyaXB0IG9iamVjdC5cblxuXG5mdW5jdGlvbiBkdW1wQ29tcHV0ZWRTdHlsZXMoZWxlbSxwcm9wKSB7XG5cbiAgdmFyIGNzID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWxlbSxudWxsKTtcbiAgaWYgKHByb3ApIHtcbiAgICBjb25zb2xlLmxvZyhwcm9wK1wiIDogXCIrY3MuZ2V0UHJvcGVydHlWYWx1ZShwcm9wKSk7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciBsZW4gPSBjcy5sZW5ndGg7XG4gIGZvciAodmFyIGk9MDtpPGxlbjtpKyspIHtcblxuICAgIHZhciBzdHlsZSA9IGNzW2ldO1xuICAgIGNvbnNvbGUubG9nKHN0eWxlK1wiIDogXCIrY3MuZ2V0UHJvcGVydHlWYWx1ZShzdHlsZSkpO1xuICB9XG5cbn1cbiIsIid1c2Ugc3RyaWN0Jztcbi8qanNoaW50IC1XMTE3ICovXG5cbi8vIE1PVkVEIFRPIDxIRUFEPiBzY3JpcHRzXG5cbi8qXG5mdW5jdGlvbiBnZXRJbWFnZXNCeVNjcmVlblNpemUoaW1hZ2VzQXJyYXksIGZpcnN0QnJlYWssIHNlY29uZEJyZWFrKXtcbiAgICAvL3NlbGVjdCB0aGUgbGFyZ2VyIG9mIHZpZXdwb3J0IGhlaWdodCAtIHdpZHRoIChkZXZpY2UgY2FuIHJvdGF0ZSBhZnRlciBsb2FkaW5nIGltYWdlcylcbiAgICB2YXIgd2luZG93TWF4U2l6ZSA9IE1hdGgubWF4KHZpZXdIZWlnaHQsIHZpZXdXaWR0aCk7XG5cbiAgICBpZiAoIHdpbmRvd01heFNpemUgPD0gZmlyc3RCcmVhayApe1xuICAgICAgICByZXR1cm4gaW1hZ2VzQXJyYXlbMV07Ly9tZWRpdW07XG4gICAgfVxuICAgIGVsc2UgaWYoIHdpbmRvd01heFNpemUgPj0gZmlyc3RCcmVhayAmJiB3aW5kb3dNYXhTaXplIDw9IHNlY29uZEJyZWFrKSB7XG4gICAgICAgIHJldHVybiBpbWFnZXNBcnJheVsyXTsvL2xhcmdlO1xuICAgIH1cbiAgICBlbHNle1xuICAgICAgICByZXR1cm4gaW1hZ2VzQXJyYXlbM107Ly8xOTIwIG1heDtcbiAgICB9XG59XG4qLyIsIid1c2Ugc3RyaWN0Jztcbi8qanNoaW50IC1XMTE3ICovXG5cbmZ1bmN0aW9uIGxvYWQod2hlcmUsIHdoYXQpe1xuXHRjb25zb2xlLmxvZyhcIkxvYWRlZDogXCIgKyB3aGF0ICsgXCIgSU5UTyBcIiArIHdoZXJlKTtcblx0alF1ZXJ5KCB3aGVyZSApLmxvYWQoIHdoYXQsIGZ1bmN0aW9uKCkge1xuXHQgIGpRdWVyeSh3aW5kb3cpLnJlc2l6ZSgpO1xuXHQgIHdpbmRvdy5zY3JvbGxUbygwLDApO1xuXHR9KTtcbn0iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
