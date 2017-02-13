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
