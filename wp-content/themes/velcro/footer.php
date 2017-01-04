<?php
/**
 * The default footer for the Velcro theme
 *
 * Included in all full page templates.
 *
 * See documentation on footer.php
 *
 * @package velcro
 *
*/
?>
    </main><?php //#content ?>

    <footer id="footer" class="floatfix">

        <?php
        /**
        * Footer Template controls project specific footer content.
        *
        * Load an existing template or overwrite with child theme.
        *
        * @param None
        */
        velcro_get_template_part('content/footer.php');
        ?>

    </footer><?php //#footer ?>

</div><?php //#wrapper ?>

<?php wp_footer(); ?>
</body>
</html>
