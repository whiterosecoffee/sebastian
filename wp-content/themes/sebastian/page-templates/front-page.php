<?php //Template Name: Home Page - Gallery ?>
<?php get_header(); ?>
<?php $thisJsonURL = home_url() . '/wp-json/velcro/v1/home-gallery/'; ?>

<script>

	getJson('<?php echo $thisJsonURL; ?>').then(function(result) {
		// Code depending on result
		slidesContent = getImagesByScreenSize(result, 640, 1024);
		elementReady("homeGallery", function(){
			createDragendSlides(
				'homeGallery',  //parentContainer
				slidesContent, 		//slidesContent
				'background-image' 	//slideType
			);
		});
	});//getJson()

	jQuery(document).ready(function(){
		initDragendGallery(
			'#homeGallery',  	//parentContainer
			viewHeight			//galleryHeight
		);
	});

</script>

<div id="contentWrapper" class="wrapper">
	<div id="homeGallery">
		<?php get_template_part('sections/image-gallery'); ?>
	</div>
    <?php get_template_part('views/page-title'); ?>
    <?php get_template_part('sections/concept'); ?>

</div><!-- #contentWrapper -->

<?php get_footer(); ?>
