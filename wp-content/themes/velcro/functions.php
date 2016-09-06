<?php
global $wpdb;			//$wpdb is a class of functions for easy database manipulations
						//$wpdb->get_results( "query" );
						//$wpdb->query('query'); etc.


//ENQUEUE Styles & scripts
include_once(get_template_directory().'/inc/parent-enqueue.php');

//Plugins
include_once(get_template_directory().'/plugins/customPostTypes/customPostTypes.php');
include_once(get_template_directory().'/plugins/galleryMetabox/galleryMetabox.php');
include_once(get_template_directory().'/inc/mobile-detect.php'); // http://mobiledetect.net/


//Parent Theme Custimizations
include_once(get_template_directory().'/inc/coreFunctions.php');
include_once(get_template_directory().'/inc/cleanWpHead.php');
include_once(get_template_directory().'/inc/excerpt.php');


//WP Rest API Custom Endpoints
//$epBaseCpt = "velcro/v1/cpts/";
include_once(get_template_directory().'/rest-endpoints/testimonials-endpoint.php');
include_once(get_template_directory().'/rest-endpoints/quotes-endpoint.php');


//Angular Libraries
// NOTE: Make conditional on Child theme switch.
include_once(get_template_directory().'/ng/enqueue-angular.php');


//Image Sizes
add_image_size( 'coreLarge', '1920', '1920', false );


//Menus
add_theme_support('main'); //initiates the menu section under the appearances panel in dashboard
register_nav_menu('main','Main Site Navigation');
register_nav_menu('scroll','Scroll Navigation');


//THUMNAILS
if ( function_exists( 'add_theme_support' ) ) {
	add_theme_support( 'post-thumbnails' );
        set_post_thumbnail_size( 50, 50 ); // default Post Thumbnail dimensions
}

add_filter( 'auto_update_plugin', '__return_true' );

?>