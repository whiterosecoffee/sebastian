<?php
// devEnv represents development environment - dev : prod
global $devEnv;
global $post;

$devEnv = "dev";

include_once( get_stylesheet_directory().'/inc/child-enqueue.php' );// ENQUEUE Child Styles & Scripts

function vueQuotes() {
    if (is_page('contact')){
	    //wp_enqueue_script( 'vueQuotes', get_stylesheet_directory_uri().'/vue-quotes/app.js', array('project'), '', true );
    }
}

add_action( 'wp_enqueue_scripts', 'vueQuotes', 99);


require_once('rest-endpoints/home-gallery-endpoint.php');
require_once('rest-endpoints/projects-gallery-endpoint.php');
?>