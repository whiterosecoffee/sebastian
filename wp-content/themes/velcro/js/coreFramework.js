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
