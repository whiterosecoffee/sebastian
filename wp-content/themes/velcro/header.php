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
<?php include(velcro_component('document', 'html')); ?>
<?php include(velcro_component('document', 'head')); ?>
<?php include(velcro_component('document', 'body')); ?>
<?php include(velcro_component('modals')); ?>
<?php include(velcro_component('header')); ?>
