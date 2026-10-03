<?php get_header(); ?>
<main class="ps-404-wrap">
<div class="ps-wrap">
<section class="ps-404">
    <div class="ps-404-mark">404</div>
    <div class="eyebrow">PatriaSoul</div>
    <h1>Ova stranica nije pronađena.</h1>
    <p>Izgleda da je sadržaj premješten, uklonjen ili je poveznica pogrešna. Istražite najnovije priče ili se vratite na početnu stranicu.</p>
    <div class="ps-actions">
        <a class="ps-btn ps-btn-primary" href="<?php echo esc_url(home_url('/')); ?>">← Početna</a>
        <a class="ps-btn ps-btn-ghost" href="<?php echo esc_url(home_url('/kontakt/')); ?>">Javi nam ako nešto nedostaje</a>
    </div>
</section>

<section class="ps-404-latest">
    <div class="ps-portal-section__head">
        <div><span class="eyebrow">Svježi sadržaj</span><h2>Najnovije iz PatriaSoula</h2></div>
    </div>
    <?php $q=ps_portal_latest_query(4); if($q->have_posts()): ?>
    <div class="ps-portal-grid ps-portal-grid--standard">
        <?php while($q->have_posts()):$q->the_post(); ps_portal_render_card(get_the_ID(),'standard'); endwhile; ?>
    </div>
    <?php endif; wp_reset_postdata(); ?>
</section>
</div>
</main>
<?php get_footer(); ?>