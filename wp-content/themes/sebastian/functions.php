<?php
// devEnv represents development environment - dev : prod
global $devEnv;
global $post;

$devEnv = "dev";

include_once( get_stylesheet_directory().'/inc/child-enqueue.php' );// ENQUEUE Child Styles & Scripts

//Rename Featued Image Box for Sebastian
add_action('do_meta_boxes', 'replace_featured_image_box');
function replace_featured_image_box()  {
    remove_meta_box( 'postimagediv', 'page', 'side' );
    add_meta_box('postimagediv', __('Page Background Image'), 'post_thumbnail_meta_box', 'page', 'side', 'low');
}

?>
