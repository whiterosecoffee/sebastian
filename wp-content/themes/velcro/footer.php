<?php
/**
 * The default footer for the Velcro theme
 *
 * Included in all full page templates.
 *
 * See documentation on footer.php
 *
 * @package velcro
 * @since 1.0
 * @param None
*/
?>
    <!--#content -->
    </main>

    <footer id="footer" class="fullWidth floatfix">

        <?php
        /**
        * Load a template or overwrite with child theme /content/footer.php.
        */
        include(velcro_component('footer'));
        ?>

    </footer>
<!--#wrapper -->
</div>

<?php wp_footer(); ?>
</body>
</html>
