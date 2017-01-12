<?php
// devEnv represents development environment - dev : prod
global $devEnv;
global $post;

$devEnv = "dev";

include_once( get_stylesheet_directory().'/inc/child-enqueue.php' );// ENQUEUE Child Styles & Scripts

?>
