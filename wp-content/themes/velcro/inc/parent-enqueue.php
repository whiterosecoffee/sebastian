<?php

//STYLES & SCRIPTS
function parent_styles() {

	//**NOTE: Parent SCSS @import + gulp compiled to 'child-theme/style.css'
}
	add_action( 'wp_enqueue_scripts', 'parent_styles', 1);

function parent_scripts() {

    //**NOTE: Parent JS gulp compiled to 'child-theme/project.js'

	wp_deregister_script('jquery');
    wp_register_script('jquery', 'http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js', true, '1.9.1');
}
	add_action( 'wp_enqueue_scripts', 'parent_scripts', 0 );

?>