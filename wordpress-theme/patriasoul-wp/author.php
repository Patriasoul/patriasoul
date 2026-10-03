<?php get_header(); ?>
<main class="ps-archive-wrap">
<div class="ps-wrap">
<header class="ps-author-archive">
    <?php ps_portal_author_box(get_the_author_meta('ID')); ?>
</header>

<div class="ps-archive-header ps-author-archive-header">
    <div class="eyebrow">PatriaSoul</div>
    <h1>Članci autora</h1>
    <p class="ps-archive-description">Priče, svjedočanstva, povijest, vjera i hrvatsko nasljeđe koje potpisuju Čuvari nasljeđa.</p>
</div>

<?php if(have_posts()): ?>
<div class="ps-archive-grid">
<?php while(have_posts()):the_post(); ps_portal_render_card(get_the_ID(),'standard'); endwhile; ?>
</div>
<?php the_posts_pagination(array('mid_size'=>1,'prev_text'=>'← Prethodno','next_text'=>'Sljedeće →')); ?>
<?php else: ?>
<div class="ps-empty-note">Trenutno nema objava u ovoj arhivi autora.</div>
<?php endif; ?>
</div>
</main>
<?php get_footer(); ?>