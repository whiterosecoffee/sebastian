<?php //Template Name: Home Page - Gallery ?>
<?php get_header(); ?>

    <?php //Load Gallery Plugin.  Init JS in project.js ?>
    <?php include_once(get_template_directory().'/plugins/galleryMetabox/jsonReturnGallery.php'); ?>

    <div id="homeGallery" class="galleryContainer dragend-container">
    	<!-- slides created dynamically -->
    </div>

    <?php include_once(get_stylesheet_directory().'/views/pageTitle.php'); ?>

<?php get_footer(); ?>
<!-- Core Single Projects Template -->
