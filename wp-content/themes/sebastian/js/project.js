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
