<?php get_header(); ?>
	<div id="content" class="content contentPadding floatfix">

		<h2 class="pageTitle"><?php echo (the_parent_slug()); ?></h2>
		<?php
	        $page = $post->ID;
	        $page_articleDate = get_page($page);
	        $content = apply_filters('the_content', $page_articleDate->post_content);
	        echo $content;
	    ?>

	</div>
<?php get_footer(); ?>
<!-- Velcro: Root Index Template -->
