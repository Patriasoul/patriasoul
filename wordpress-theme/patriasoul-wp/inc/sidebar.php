<?php
if (!defined('ABSPATH')) exit;

function ps_portal_sidebar($current_id = 0) {
    $current_id = absint($current_id);
    ?>
    <aside class="ps-portal-sidebar" aria-label="Bočna traka">
        <?php ps_portal_author_box(); ?>

        <section class="ps-sidebar-widget">
            <div class="eyebrow">PatriaSoul</div>
            <h2>Najnovije</h2>
            <?php
            $q = ps_portal_latest_query(6, array($current_id));
            if ($q->have_posts()) :
                while ($q->have_posts()) : $q->the_post();
                    ?>
                    <a class="ps-sidebar-post" href="<?php the_permalink(); ?>">
                        <span><?php echo esc_html(get_the_date()); ?></span>
                        <strong><?php the_title(); ?></strong>
                    </a>
                    <?php
                endwhile;
            else :
                echo '<p class="ps-sidebar-empty">Trenutno nema novijih objava.</p>';
            endif;
            wp_reset_postdata();
            ?>
        </section>

        <section class="ps-sidebar-widget ps-sidebar-widget--popular">
            <div class="eyebrow">Čitatelji</div>
            <h2>Najčitanije</h2>
            <?php
            $popular = ps_portal_popular_query(5, array($current_id));
            if ($popular->have_posts()) :
                while ($popular->have_posts()) : $popular->the_post();
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
