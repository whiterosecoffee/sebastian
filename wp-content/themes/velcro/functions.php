<?php
/**
 * A minimalist framemwork for rapid deployment of child theme projects.
 *
 * Velcro provides light weight framwork functionality 'straplessly' by avoiding dependencies on Bootstrap, jQuery etc.
 *
 * Theme Authors: Nathan Bowman
 *
 * This program is free software; you can redistribute it and/or modify it under the terms of the GNU
 * General Public License as published by the Free Software Foundation; either version 2 of the License,
 * or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without
 * even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 *
 * You should have received a copy of the GNU General Public License along with this program; if not, write
 * to the Free Software Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA 02110-1301 USA
 *
 * @package    Velcro
 * @version    1.0.0
 * @author     Nathan Bowman <nathan@discoverwebdev.ca>
 * @copyright  Copyright (c) 2016, Nathan Bowman
 * @link       http://discoverwebdev.ca/themes
 * @license    http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
 */

// Load the Velcro Core framework and theme files.
require_once( get_template_directory() . '/velcro/velcro.php' );
//require_once( $velcro_base_dir . 'inc/custom-background.php' );
//require_once( $velcro_base_dir . 'inc/custom-header.php'     );
//require_once( $velcro_base_dir . 'inc/theme.php'             );


// Launch the Velcro Framework.
new Velcro();

// Do theme setup on the 'after_setup_theme' hook.
add_action( 'after_setup_theme', 'velcro_theme_setup', 5 );

/**
 * Theme setup function.
 *
 * Adds support for features and defines actions and filters.
 *
 * @since  1.0.0
 * @access public
 * @return void
 */
function velcro_theme_setup(){
/*
	// Theme layouts.
	add_theme_support( 'theme-layouts', array( 'default' => is_rtl() ? '2c-r' :'2c-l' ) );

	// Enable custom template hierarchy.
	add_theme_support( 'hybrid-core-template-hierarchy' );

	// The best thumbnail/image script ever.
	add_theme_support( 'get-the-image' );

	// Breadcrumbs. Yay!
	add_theme_support( 'breadcrumb-trail' );

	// Nicer [gallery] shortcode implementation.
	add_theme_support( 'cleaner-gallery' );

	// Automatically add feed links to <head>.
	add_theme_support( 'automatic-feed-links' );

	// Post formats.
	add_theme_support(
		'post-formats',
		array( 'aside', 'audio', 'chat', 'image', 'gallery', 'link', 'quote', 'status', 'video' )
	);

	// Handle content width for embeds and images.
	hybrid_set_content_width( 1280 );
*/
}


?>
