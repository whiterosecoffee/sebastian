<?php
/**
 * The default footer for the Velcro theme
 *
 * Included in all full page templates.
 *
 * See documentation on root footer.php
 *
 * @package velcro
 *
*/
?>
    </main><?php //#content ?>

    <footer id="footer" class="scrollTopStop floatfix">

        <?php
        /**
        * Default contains theme specific footer content.
        * Can be overwritten by child theme
        */
        velcro_get_template_part('templates/footer-template.php');
        ?>

    </footer><?php //#footer ?>

</div><?php //#wrapper ?>

<?php wp_footer(); ?>
</body>
</html>
