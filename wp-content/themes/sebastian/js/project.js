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
