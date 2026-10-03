<?php
if (!defined('ABSPATH')) exit;

function ps_portal_sidebar($current_id = 0) {
    $current_id = absint($current_id);
    ?>
    <aside class="ps-portal-sidebar" aria-label="Bočna traka PatriaSoul">

        <?php ps_portal_author_box(); ?>

        <section class="ps-sidebar-widget">
            <div class="ps-sidebar-widget__head">
                <div>
                    <span class="eyebrow">Svježe objave</span>
                    <h2>Najnovije</h2>
                </div>
                <a href="<?php echo esc_url(home_url('/')); ?>" aria-label="Početna">→</a>
            </div>

            <?php
            $q = ps_portal_latest_query(6, array($current_id));
            if ($q->have_posts()) :
                $n = 0;
                while ($q->have_posts()) : $q->the_post();
                    $n++;
                    ?>
                    <a class="ps-sidebar-post ps-sidebar-post--latest" href="<?php the_permalink(); ?>">
                        <span class="ps-sidebar-post__number"><?php echo esc_html(str_pad((string) $n, 2, '0', STR_PAD_LEFT)); ?></span>
                        <span class="ps-sidebar-post__content">
                            <small><?php echo esc_html(get_the_date()); ?></small>
                            <strong><?php the_title(); ?></strong>
                        </span>
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
            <div class="ps-sidebar-widget__head">
                <div>
                    <span class="eyebrow">Najviše interesa</span>
                    <h2>Najčitanije</h2>
                </div>
            </div>

            <?php
            $popular = ps_portal_popular_query(5, array($current_id));
            if ($popular->have_posts()) :
                $n = 0;
                while ($popular->have_posts()) : $popular->the_post();
                    $n++;
                    ?>
                    <a class="ps-sidebar-post" href="<?php the_permalink(); ?>">
                        <span class="ps-sidebar-post__number"><?php echo esc_html($n); ?></span>
                        <span class="ps-sidebar-post__content">
                            <small><?php echo esc_html(get_the_date()); ?></small>
                            <strong><?php the_title(); ?></strong>
                        </span>
                    </a>
                    <?php
                endwhile;
            else :
                echo '<p class="ps-sidebar-empty">Najčitanije objave bit će prikazane nakon prikupljanja podataka.</p>';
            endif;
            wp_reset_postdata();
            ?>
        </section>

        <section class="ps-sidebar-cta">
            <span class="eyebrow">PatriaSoul</span>
            <h2>Čuvaj nasljeđe.</h2>
            <p>Priče koje poznajemo možemo sačuvati. Podijelite sadržaj koji ne smije biti zaboravljen.</p>
            <a href="<?php echo esc_url(home_url('/kontakt/')); ?>">Javi nam se <span>→</span></a>
        </section>

    </aside>
    <?php
}
