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
