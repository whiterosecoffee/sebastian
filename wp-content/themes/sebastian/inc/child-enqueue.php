<?php

//Register and enqueue ** FRONT END ** styles & scripts.
function childStyles() {
	wp_enqueue_style( 'childStyle', get_stylesheet_directory_uri() . '/style.css' );
}

function childScripts() {
	wp_enqueue_script( 'project', get_stylesheet_directory_uri().'/project.js', array('jquery'), '1.0.0', true );
}

add_action( 'wp_enqueue_scripts', 'childScripts', 99);
add_action( 'wp_enqueue_scripts', 'childStyles' , 98);


//Register and enqueue ** ADMIN ** styles & scripts.
function child_enqueue_custom_admin_style() {
        wp_register_style( 'child_wp_admin_css', get_stylesheet_directory_uri() . '/inc/css/child-admin.css', '1.0.0', false );
        wp_enqueue_style( 'child_wp_admin_css' );
}

function child_enqueue_custom_admin_script() {
        wp_register_script( 'child_wp_admin_js', get_stylesheet_directory_uri() . '/inc/js/child-admin.js', '1.0.0' , false);
        wp_enqueue_script( 'child_wp_admin_js' );
}

add_action( 'admin_enqueue_scripts', 'child_enqueue_custom_admin_style' );
add_action( 'admin_enqueue_scripts', 'child_enqueue_custom_admin_script' );

?>