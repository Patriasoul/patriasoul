<?php
if (!defined('ABSPATH')) exit;

function ps_portal_sidebar() {
    ?>
    <aside class="ps-portal-sidebar" aria-label="Bočna traka">
        <?php ps_portal_author_box(); ?>

        <section class="ps-sidebar-widget">
            <h2>Najnovije</h2>
            <?php
            $q = ps_portal_latest_query(5);
            if ($q->have_posts()) :
                while ($q->have_posts()) : $q->the_post();
                    ?>
                    <a class="ps-sidebar-post" href="<?php the_permalink(); ?>">
                        <span><?php echo esc_html(get_the_date()); ?></span>
                        <strong><?php the_title(); ?></strong>
                    </a>
                    <?php
                endwhile;
            endif;
            wp_reset_postdata();
            ?>
        </section>
    </aside>
    <?php
}
