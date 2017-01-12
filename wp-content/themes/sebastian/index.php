<?php get_header(); ?>

<div id="content" class="content contentPadding floatfix">

    <?php get_template_part('views/page-title.php'); ?>
	<?php
        $page = $post->ID;
        $page_articleDate = get_page($page);
        $content = apply_filters('the_content', $page_articleDate->post_content);
        echo $content;
    ?>
    <?php get_template_part("sections/" . the_parent_slug() . "-content"); ?>

</div>

<?php get_footer(); ?>
<!-- Sebastian Theme Index Template -->
