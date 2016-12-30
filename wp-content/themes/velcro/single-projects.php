<!-- velcro/ Single Projects Template -->

<?php include_once(get_template_directory().'/plugins/image-gallery/gallery-json.php'); //RETURNS allSizes image array for $post->ID ?>
<script>

 jQuery(document).ready(function() {

    //New Dragend Class
	var slidesContainer 	= '#projectsGallery';
	var slidesContent 		= getImagesByScreenSize(allSizes); //replace allSizes with Json Rest Endpoint
    var thumbsContent 		= allSizes[0];

     createSlides(
         slidesContainer,   // where
         slidesContent,     // slides content array
         viewHeight,        // slides size
         "images",          // slides type
         thumbsContent,     // which thumbnails
         "thumbnails"       // thumbs type
     );

    //init Dragend
	jQuery(slidesContainer).dragend({});

    //AutoPlay Slides
    doRecursively( function(){ autoPlaySlides(slidesContainer) }, 4000, 40000);

    //Adjust Slides on resize
	jQuery(window).resize(_.debounce(function(){
		updateSlides( slidesContainer, viewHeight, thumbsContent );
	}, 50));


    //Set Next and Previous Links
    var nextLinkHref= jQuery(".hide a[rel='next']").attr('href');
	var prevLinkHref= jQuery(".hide a[rel='prev']").attr('href');

    if (nextLinkHref){
		jQuery("#nextProject").attr("href", nextLinkHref );
    }
    else{
        jQuery("#nextProject").css("display", "none" );
    }

    if (prevLinkHref){
		jQuery("#prevProject").attr("href", prevLinkHref );
    }
    else{
        jQuery("#prevProject").css("display", "none" );
    }

});//doc ready

</script>

<div id="projectsGallery" class="dragend-container">
		<!-- slides created dynamically -->
</div>

<div id="thumbsScroll">
    <!-- horizontal scroll container -->
    <div id="thumbsContainer">
        <!-- thumbs created dynamically -->
    </div>
</div>

<div id="projectControls" class="clearfix">
    <!-- Use WP function to output hrefs && replace with custom overlay links -->
    <div class="hide">
        <?php next_post_link('%link'); ?>
        <?php previous_post_link('%link'); ?>
    </div>
    <a href="" id="prevProject" class="overlay projectControl" data-overlay-slug="projects">Prev Project</a>
    <a href="" id="nextProject" class="overlay projectControl" data-overlay-slug="projects">Next Project</a>
</div>

<div id="projectsContent" class="contentWidth floatfix">

	<h2>Project Details</h2>
	<?php
        $page = $post->ID;
        $page_articleDate = get_page($page);
        $content = apply_filters('the_content', $page_articleDate->post_content);
        echo $content;
    ?>
      <a href="#" id="btn-to-top" class="scrollToTop icon-circle-up"></a>

      <!-- remove second scroll bar if overlay is tall -->
      <style> html{overflow:hidden!important;} </style>
</div>
