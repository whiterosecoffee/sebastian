<?php
/**
 * The header for the Velcro theme
 *
 * Included in all full page templates.  The <headerContent> optionally loads child theme head content.
 *
 * @global $deviceType contains string result from $detect in /inc/coreFunction.php
 * @link http://mobiledetect.net/
 *
 * @global $menuType contains string result var definition in /inc/coreFunction.php
 *
 * @package velcro
 *
 * FIX: Add description to each include
*/
?>
<!DOCTYPE html>
<?php velcro_get_template_part('content/document/html.php'); ?>
<?php velcro_get_template_part('content/document/head.php'); ?>
<?php velcro_get_template_part('content/document/body.php'); ?>
<?php velcro_get_template_part('content/modals.php'); ?>
<?php velcro_get_template_part('content/header.php'); ?>
